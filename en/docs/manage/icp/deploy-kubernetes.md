---
title: Deploy ICP on Kubernetes
description: Deploy WSO2 Integration Control Plane (ICP) 2.0.0 on Kubernetes using the official Helm chart.
keywords: [wso2 integrator, integration control plane, icp, kubernetes, helm, deploy, eks, aks]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy ICP on Kubernetes

The ICP Helm chart deploys the WSO2 Integration Control Plane (ICP) 2.0.0 on any Kubernetes cluster. This page walks you through installing the chart, choosing a traffic routing option, and configuring ICP for production use.

:::info Prerequisites

- [Helm](https://helm.sh/docs/intro/install/) 3.x
- [kubectl](https://kubernetes.io/docs/tasks/tools/) configured against your cluster
- A running Kubernetes cluster (AKS, EKS, or any compatible cluster)
- The WSO2 ICP container image. The community image is available on Docker Hub at [`wso2/wso2-integration-control-plane:2.0.0`](https://hub.docker.com/r/wso2/wso2-integration-control-plane) and requires no login. For U2-updated images with patches and fixes, use `docker.wso2.com/wso2-integration-control-plane:2.0.0` — this requires a WSO2 subscription and `docker login docker.wso2.com` first. Refer to the [U2 documentation](https://updates.docs.wso2.com/en/latest/updates/how-to-use-docker-images-to-receive-updates/) for details.

:::

## Install the chart

Clone the Helm chart repository and install from the `icp/` directory:

```bash
git clone https://github.com/wso2/helm-mi.git
cd helm-mi
```

Install into a namespace (create it first if it does not exist):

```bash
kubectl create namespace icp
helm install icp icp/ -n icp --values icp/values.yaml
```

To upgrade an existing release:

```bash
helm upgrade icp icp/ -n icp --values icp/values.yaml
```

## Choose a traffic routing option

ICP supports two routing options. Gateway API is the recommended default; Ingress is available for clusters without a Gateway controller.

<Tabs>
<TabItem value="gateway-api" label="Gateway API (Recommended)" default>

[Gateway API](https://gateway-api.sigs.k8s.io/) is the successor to Ingress and the Kubernetes-recommended standard for traffic management.

**Step 1: Install Envoy Gateway**

The chart defaults to Envoy Gateway. Envoy Gateway installs the Gateway API CRDs automatically — do **not** pre-install them separately, as that creates a CRD ownership conflict with Helm.

```bash
helm install eg oci://docker.io/envoyproxy/gateway-helm \
  --version v1.2.1 -n envoy-gateway-system --create-namespace
```

**Step 2: Create the GatewayClass**

Envoy Gateway does not create a GatewayClass automatically. Create one after the controller is running:

```bash
kubectl apply -f - <<EOF
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: envoy
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
EOF
```

**Step 3: Create a TLS secret**

The chart requires a TLS secret in the **same namespace** as the release (e.g. `icp`). For production, use a cert-manager managed secret. For local development, [mkcert](https://github.com/FiloSottile/mkcert) generates a browser-trusted certificate:

```bash
mkcert -install
mkcert icp.example.com
kubectl create secret tls icp-tls-secret \
  --cert=icp.example.com.pem \
  --key=icp.example.com-key.pem \
  -n icp
```

**Step 4: Configure your values file**

```yaml
wso2:
  deployment:
    hostname: "icp.example.com"
  config:
    frontendJwtHMACSecret: "<random-string-min-32-chars>"
  ingress:
    enabled: false
  gatewayAPI:
    enabled: true
    gatewayClassName: "envoy"
    gatewayNamespace: "icp"       # must match the release namespace so the TLS secret is co-located
    tlsSecret: "icp-tls-secret"
    backendTLS:
      enabled: true               # ICP always serves HTTPS on the backend
```

:::warning
`frontendJwtHMACSecret` must be set to a random string of at least 32 characters. Login fails with a JWT error if this is left empty. Generate one with: `openssl rand -base64 32`
:::

:::tip
If `tlsSecret` is left empty, the chart generates a self-signed certificate automatically. This is convenient for development and local clusters. For production, provide a [cert-manager](https://cert-manager.io/) managed secret via `tlsSecret`.
:::

:::note
Gateway API rate limiting (`wso2.gatewayAPI.ratelimit.*`) and cookie-based session affinity are **only supported with Envoy Gateway** (`gatewayClassName: "envoy"`). For other controllers, configure rate limiting and sticky sessions at the controller level.
:::

</TabItem>
<TabItem value="ingress" label="Ingress">

Use Ingress when a Gateway API controller is not available in your cluster.

**Prerequisite:** Install the [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) or another Ingress controller.

```yaml
wso2:
  deployment:
    hostname: "icp.example.com"
  ingress:
    enabled: true
    ingressClassName: "nginx"
    annotations:
      nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
    tlsSecret: "icp-tls-secret"
  gatewayAPI:
    enabled: false
```

</TabItem>
</Tabs>

## Verify the deployment

```bash
# Check pod status
kubectl get pods -n icp

# Check services and gateway resources
kubectl get svc,gateway,httproute -n icp
```

Once the pod is `Running`, open `https://icp.example.com` and sign in with the default credentials.

### Local access (Rancher Desktop / Minikube)

On local clusters, the Gateway LoadBalancer IP is not reachable from the host. Use one of these options:

**Option 1 — Direct port-forward (simplest):**

```bash
kubectl port-forward svc/cloud-icp 9446:9446 -n icp
```

Open `https://localhost:9446`. Accept the self-signed certificate warning.

**Option 2 — Through the Gateway (full path):**

```bash
# Add a hosts entry
echo "127.0.0.1 icp.example.com" | sudo tee -a /etc/hosts

# Find the Envoy proxy service and port-forward port 443
ENVOY_SVC=$(kubectl get svc -n envoy-gateway-system -o name | grep "envoy-icp")
kubectl port-forward $ENVOY_SVC 8443:443 -n envoy-gateway-system
```

Open `https://icp.example.com:8443`. No certificate warning if you used mkcert.

- **Username:** `admin`
- **Password:** `admin`

:::warning
Change the default `admin` password before using ICP in any non-evaluation environment. Go to **Access control** > **Users**, select the `admin` user, and click **Reset Password**.
:::

## Configure for production

### Database

ICP defaults to an embedded H2 database. For production, switch to PostgreSQL, MySQL, or MSSQL using the `wso2.config.storage` and `wso2.config.credentialsDb` keys.

```yaml
wso2:
  config:
    storage:
      dbType: "postgresql"
      dbHost: "postgres.example.com"
      dbPort: 5432
      dbName: "icp_database"
      dbUser: "icp_user"
      dbPassword: "changeme"
    credentialsDb:
      dbType: "postgresql"
      dbHost: "postgres.example.com"
      dbPort: 5432
      dbName: "credentials_db"
      dbUser: "icp_user"
      dbPassword: "changeme"
```

See [Database Configuration](../../reference/icp/database-configuration.md) for the full field reference.

### TLS and JKS keystore

To supply a custom Java keystore instead of the bundled self-signed certificate, create a Kubernetes secret containing your JKS files and reference it:

```yaml
wso2:
  deployment:
    JKSSecretName: "icp-jks-secret"
```

### Secure vault

To avoid storing secrets in the values file, enable the WSO2 secure vault. Provide base64-encoded ciphertext produced by the WSO2 cipher tool:

```yaml
wso2:
  config:
    secureVault:
      enabled: true
      secrets:
        secretJWTsecret: "<encrypted-jwt-secret>"
        secDbPassword: "<encrypted-storage-db-password>"
```

### SSO (OIDC)

To enable single sign-on with an OIDC provider such as Asgardeo:

```yaml
wso2:
  config:
    sso:
      enabled: true
      issuer: "https://api.asgardeo.io/t/{org}/oauth2/token"
      authorizationEndpoint: "https://api.asgardeo.io/t/{org}/oauth2/authorize"
      tokenEndpoint: "https://api.asgardeo.io/t/{org}/oauth2/token"
      logoutEndpoint: "https://api.asgardeo.io/t/{org}/oidc/logout"
      jwksUrl: "https://api.asgardeo.io/t/{org}/oauth2/jwks"
      clientId: "your-client-id"
      clientSecret: "your-client-secret"
      redirectUri: "https://icp.example.com/auth/callback"
      usernameClaim: "email"
      scopes:
        - openid
        - email
        - profile
```

See [Authentication Configuration](../../reference/icp/authentication-config.md) for the full reference.

### Scaling and session affinity

ICP is a management dashboard and a single replica is usually sufficient. When you do scale beyond one replica, enable cookie-based session affinity (Envoy Gateway only):

```yaml
wso2:
  deployment:
    replicas: 2
  gatewayAPI:
    enabled: true
    gatewayClassName: "envoy"
    sessionAffinity:
      cookieName: "ICP_AFFINITY"
      cookieTTL: "3600s"
```

Session affinity is automatically applied when `replicas > 1` with Envoy Gateway.

## Cloud provider configurations

<Tabs>
<TabItem value="eks" label="Amazon EKS" default>

Set `provider: "aws"` and configure the AWS Secret Manager integration for secure keystore access:

```yaml
provider: "aws"
aws:
  serviceAccountName: "<service-account-name>"
  region: "us-east-1"
  secretManager:
    secretProviderClass: "<secret-provider-class-name>"
    secretIdentifiers:
      internalKeystorePassword:
        secretName: "<secret-name>"
        secretKey: "<secret-key>"
```

To use the [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller) as the Ingress controller:

:::info
- Create a TLS certificate in [AWS Certificate Manager (ACM)](https://aws.amazon.com/certificate-manager/) and replace `<CERT_ARN>` with the certificate ARN.
- Ensure the AWS Load Balancer Controller is installed. See the [installation guide](https://github.com/kubernetes-sigs/aws-load-balancer-controller/blob/main/docs/deploy/installation.md).
:::

```yaml
wso2:
  ingress:
    enabled: true
    ingressClassName: "alb"
    annotations:
      alb.ingress.kubernetes.io/group.name: icp-dev-alb
      alb.ingress.kubernetes.io/scheme: internet-facing
      alb.ingress.kubernetes.io/target-type: ip
      alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
      alb.ingress.kubernetes.io/certificate-arn: <CERT_ARN>
      alb.ingress.kubernetes.io/backend-protocol: HTTPS
      alb.ingress.kubernetes.io/healthcheck-protocol: HTTPS
      alb.ingress.kubernetes.io/healthcheck-port: "9446"
      alb.ingress.kubernetes.io/healthcheck-path: /dashboard/api/healthz
```

</TabItem>
<TabItem value="aks" label="Azure AKS">

Set `provider: "azure"` and configure Azure Key Vault for secure keystore access:

```yaml
provider: "azure"
azure:
  keyVault:
    name: "<key-vault-name>"
    secretProviderClass: "<secret-provider-class-name>"
    secretIdentifiers:
      internalKeystorePassword: "<secret-name>"
    activeDirectory:
      servicePrincipal:
        appId: "<app-id>"
        clientSecret: "<client-secret>"
      tenantId: "<tenant-id>"
    resourceManager:
      subscriptionId: "<subscription-id>"
      resourceGroup: "<resource-group>"
```

</TabItem>
</Tabs>

## Configuration reference

| Key | Default | Description |
| --- | --- | --- |
| `wso2.deployment.hostname` | `icp.wso2.com` | Hostname exposed by the Gateway or Ingress |
| `wso2.deployment.image.tag` | `2.0.0` | ICP container image tag |
| `wso2.config.serverPort` | `9446` | HTTPS port for the ICP console and API |
| `wso2.config.runtimePort` | `9445` | Port that runtimes use to register with ICP and send heartbeats |
| `wso2.config.schedulerIntervalSeconds` | `30` | How often ICP polls runtimes for status |
| `wso2.config.logLevel` | `INFO` | Log verbosity: `DEBUG`, `INFO`, `WARN`, `ERROR` |
| `wso2.config.frontendJwtHMACSecret` | — | JWT signing secret (min 32 chars). Change before production. |
| `wso2.deployment.replicas` | `1` | Number of ICP pod replicas |
| `wso2.gatewayAPI.enabled` | `true` | Enable Gateway API resources |
| `wso2.ingress.enabled` | `false` | Enable Ingress (disable when using Gateway API) |

For the complete parameter list, see the [values_full.yaml](https://github.com/wso2/helm-mi/blob/main/icp/values_full.yaml) file or run:

```bash
helm show values icp/
```

## What's next

- [Connect a runtime to ICP](./connect-runtime.md) — register a Ballerina runtime with heartbeats
- [Access control](./access-control.md) — manage users, roles, and groups
- [Observability setup](./observability-setup.md) — add centralized logs and metrics
- [Encrypt secrets](./encrypt-secrets.md) — use the WSO2 secure vault for sensitive values
