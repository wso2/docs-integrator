---
sidebar_position: 10
title: Deploying to Red Hat OpenShift
description: Deploy Ballerina integrations to Red Hat OpenShift with build configs, routes, and operator support.
---

# Deploying to Red Hat OpenShift

Red Hat OpenShift provides an enterprise Kubernetes platform with built-in CI/CD, image streams, and routing. WSO2 Integrator projects can be deployed using OpenShift-native features such as BuildConfigs, DeploymentConfigs, and Routes.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| OpenShift CLI | `oc` CLI 4.12 or later |
| Cluster Access | Access to an OpenShift cluster with project permissions |
| Ballerina | Distribution installed locally |
| Registry | Access to the internal OpenShift registry or an external registry |

## Step 1 -- Build the Container Image

Build the Ballerina project with Docker support:

```bash
bal build --cloud=docker
```

This generates a `Dockerfile` and the application JAR in the `target/` directory.

## Step 2 -- Create an OpenShift Project

```bash
oc new-project wso2-integrations
```

## Step 3 -- Deploy Using Source-to-Image (S2I)

OpenShift S2I builds the container image directly from source:

```bash
oc new-app java:17~https://github.com/myorg/my-integration.git \
  --name=order-service \
  --context-dir=.
```

Alternatively, deploy from a pre-built image:

```bash
# Push to OpenShift internal registry
docker tag my-integration:latest \
  default-route-openshift-image-registry.apps.cluster.example.com/wso2-integrations/order-service:latest

docker push \
  default-route-openshift-image-registry.apps.cluster.example.com/wso2-integrations/order-service:latest

# Create the application
oc new-app wso2-integrations/order-service:latest --name=order-service
```

## Step 4 -- Configure with ConfigMaps and Secrets

Create a ConfigMap for `Config.toml`:

```bash
oc create configmap order-service-config \
  --from-file=Config.toml=config/prod/Config.toml
```

Create a Secret for sensitive values:

```bash
oc create secret generic order-service-secrets \
  --from-literal=DB_PASSWORD='s3cur3p@ss' \
  --from-literal=API_KEY='ak_xxxxxxxxxxxxx'
```

Mount them in the DeploymentConfig:

```yaml
apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata:
  name: order-service
spec:
  replicas: 2
  template:
    spec:
      containers:
        - name: order-service
          image: order-service:latest
          ports:
            - containerPort: 9090
          env:
            - name: BAL_CONFIG_FILES
              value: /config/Config.toml
          envFrom:
            - secretRef:
                name: order-service-secrets
          volumeMounts:
            - name: config-volume
              mountPath: /config
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          readinessProbe:
            httpGet:
              path: /health
              port: 9090
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /health
              port: 9090
            initialDelaySeconds: 30
            periodSeconds: 10
      volumes:
        - name: config-volume
          configMap:
            name: order-service-config
```

Apply it:

```bash
oc apply -f deploymentconfig.yaml
```

## Step 5 -- Expose a Route

Create an OpenShift Route to expose the service externally:

```bash
oc expose service order-service
```

For TLS termination:

```bash
oc create route edge order-service-tls \
  --service=order-service \
  --hostname=order-service.apps.cluster.example.com \
  --cert=tls.crt \
  --key=tls.key
```

Verify the route:

```bash
oc get routes
curl https://order-service.apps.cluster.example.com/health
```

## OpenShift BuildConfig (CI/CD)

Set up automatic builds on code push:

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: order-service-build
spec:
  source:
    type: Git
    git:
      uri: https://github.com/myorg/my-integration.git
      ref: main
  strategy:
    type: Docker
    dockerStrategy:
      dockerfilePath: target/docker/Dockerfile
  output:
    to:
      kind: ImageStreamTag
      name: order-service:latest
  triggers:
    - type: GitHub
      github:
        secret: webhook-secret
    - type: ConfigChange
```

```bash
oc apply -f buildconfig.yaml
```

## Scaling and Auto-Scaling

### Manual Scaling

```bash
oc scale dc/order-service --replicas=3
```

### Horizontal Pod Autoscaler

```bash
oc autoscale dc/order-service --min=2 --max=10 --cpu-percent=70
```

## Network Policies

Restrict traffic between integration services:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: order-service-policy
spec:
  podSelector:
    matchLabels:
      app: order-service
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - protocol: TCP
          port: 9090
```

## What's Next

- [Docker & Kubernetes](docker-kubernetes.md) -- General Kubernetes deployment guide
- [Scaling & High Availability](scaling-ha.md) -- Multi-replica and HA patterns
- [Managing Configurations](managing-configurations.md) -- Per-environment configuration strategies
