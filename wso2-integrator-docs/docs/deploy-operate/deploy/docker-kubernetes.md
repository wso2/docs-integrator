---
sidebar_position: 2
title: Docker & Kubernetes
description: Build Docker images and deploy integrations to Kubernetes clusters.
---

# Docker & Kubernetes

WSO2 Integrator provides built-in support for containerized deployments. You can generate Docker images and Kubernetes manifests directly from the IDE or the command line.

## Docker Deployment

### Using the Visual Designer

1. Open your integration in the VS Code design view.
2. Select **Deploy with Docker** from the Visualizer view.
3. Click **Create Docker Image** -- this builds and stores the image in your local registry.
4. The generated Dockerfile is in `target/docker/<integration-name>/`.

### Using the CLI

```bash
bal build --cloud=docker
```

This generates a Docker image and a Dockerfile in the `target` directory.

### Running the Docker Image

```bash
docker run -d \
  -v /path/to/Config.toml:/home/ballerina/Config.toml \
  -p 8090:8090 \
  <image-name>:latest
```

Mount your `Config.toml` to inject environment-specific configuration at runtime.

## Kubernetes Deployment

### Step 1: Enable Kubernetes in the Build

Add the cloud target to your `Ballerina.toml`:

```toml
[build-options]
cloud = "k8s"
```

### Step 2: Configure the Container

Create a `Cloud.toml` in your project root:

```toml
[container.image]
repository = "myregistry.azurecr.io"
name = "my-integration"
tag = "1.0.0"
```

### Step 3: Build and Generate Manifests

```bash
bal build
```

This generates Kubernetes manifests in `target/kubernetes/<name>/`, including:

- **Deployment** -- Pod specification with your container
- **Service** -- ClusterIP service for internal access
- **ConfigMap** -- Non-sensitive configuration
- **Secret** -- Sensitive configuration values
- **HPA** -- Horizontal Pod Autoscaler (if configured)

### Step 4: Push and Deploy

```bash
# Push the image to your container registry
docker push myregistry.azurecr.io/my-integration:1.0.0

# Apply the generated manifests
kubectl apply -f target/kubernetes/my-integration/
```

### Step 5: Verify

```bash
kubectl get pods
kubectl get services
kubectl logs -f deployment/my-integration
```

## Resource Limits and Health Probes

Configure resource limits in `Cloud.toml`:

```toml
[cloud.deployment]
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu = "200m"
max_cpu = "500m"

[cloud.deployment.probes.liveness]
port = 8090
path = "/health"

[cloud.deployment.probes.readiness]
port = 8090
path = "/ready"
```

## Hot Deployment with Load Balancing

For zero-downtime deployments, use rolling updates with a load balancer:

### Active-Active (NGINX)

All instances serve traffic simultaneously with round-robin routing:

```nginx
upstream integration_backend {
    server instance1:8090 max_fails=3 fail_timeout=30s;
    server instance2:8090 max_fails=3 fail_timeout=30s;
}
```

### Active-Passive

A primary instance handles traffic while a backup activates on failure:

```nginx
upstream integration_backend {
    server primary:8090;
    server backup:8090 backup;
}
```

## What's Next

- [VM-Based Deployment](vm-based.md) -- Deploy as executable JARs
- [Managing Configurations](managing-configurations.md) -- Environment-specific config management
- [GraalVM Native Image](graalvm.md) -- Compile to native executables
