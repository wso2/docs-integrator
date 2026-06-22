---
title: Cloud.toml Reference
description: Complete reference for Cloud.toml cloud deployment configuration for Ballerina packages.
keywords: [wso2 integrator, ballerina, cloud.toml, kubernetes, docker, deployment, reference]
---

# Cloud.toml Reference

`Cloud.toml` configures cloud deployment settings for a Ballerina package, including Docker container images, Kubernetes resource limits, autoscaling, health probes, and configuration file mounting. Place this file in the package root alongside `Ballerina.toml`. All fields are optional; the compiler applies sensible defaults for any unspecified values.

## Enable cloud artifact generation

Set the `cloud` build option in `Ballerina.toml` to activate Cloud.toml processing:

```toml
[build-options]
cloud = "k8s"     # Kubernetes + Docker artifacts
```

Alternatively, pass it as a CLI flag without modifying `Ballerina.toml`:

```bash
bal build --cloud=k8s     # Kubernetes + Docker
bal build --cloud=docker  # Docker only
```

## `[container.image]`

Configures the Docker container image built during `bal build`.

```toml
[container.image]
repository = "wso2inc"
name       = "order-service"
tag        = "v1.2.0"
base       = "ballerina/jvm-runtime:2.0"
user       = { run_as = "ballerina" }
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `repository` | string | `""` | Docker registry or repository prefix (e.g., `"docker.io/wso2inc"`, `"ghcr.io/myorg"`). |
| `name` | string | Package name | Container image name. Defaults to the Ballerina package name. |
| `tag` | string | `"latest"` | Image version tag. |
| `base` | string | Ballerina default | Base image for the Dockerfile. Override to use a custom JVM runtime image. |
| `user.run_as` | string | `"ballerina"` | Non-root user the container process runs as. |

## `[cloud.deployment]`

Defines Kubernetes deployment resource requests and limits.

```toml
[cloud.deployment]
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu    = "200m"
max_cpu    = "1000m"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min_memory` | string | `"100Mi"` | Minimum memory allocation (Kubernetes resource request). |
| `max_memory` | string | `"256Mi"` | Maximum memory limit (Kubernetes resource limit). |
| `min_cpu` | string | `"500m"` | Minimum CPU allocation in millicores (Kubernetes resource request). |
| `max_cpu` | string | `"500m"` | Maximum CPU limit in millicores (Kubernetes resource limit). |

### `[cloud.deployment.autoscaling]`

Configures horizontal pod autoscaling.

```toml
[cloud.deployment.autoscaling]
min_replicas = 2
max_replicas = 5
cpu          = 60
memory       = 80
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min_replicas` | int | `1` | Minimum number of pod replicas. |
| `max_replicas` | int | `2` | Maximum number of pod replicas. |
| `cpu` | int | `50` | Target CPU utilization percentage that triggers scaling. |
| `memory` | int | `80` | Target memory utilization percentage that triggers scaling. |

### `[cloud.deployment.probes.liveness]`

Configures the Kubernetes liveness probe. The liveness probe restarts the container when it stops responding.

```toml
[cloud.deployment.probes.liveness]
port                = 9091
path                = "/probes/healthz"
initialDelaySeconds = 30
periodSeconds       = 10
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | int | Service port | Port the liveness probe hits. |
| `path` | string | `"/probes/healthz"` | HTTP path for the liveness check endpoint. |
| `initialDelaySeconds` | int | `10` | Seconds to wait before the first probe after container start. |
| `periodSeconds` | int | `10` | How often in seconds the probe is performed. |

### `[cloud.deployment.probes.readiness]`

Configures the Kubernetes readiness probe. The readiness probe gates traffic to the container until it is ready to serve requests.

```toml
[cloud.deployment.probes.readiness]
port                = 9091
path                = "/probes/readyz"
initialDelaySeconds = 15
periodSeconds       = 5
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | int | Service port | Port the readiness probe hits. |
| `path` | string | `"/probes/readyz"` | HTTP path for the readiness check endpoint. |
| `initialDelaySeconds` | int | `10` | Seconds to wait before the first probe after container start. |
| `periodSeconds` | int | `10` | How often in seconds the probe is performed. |

### `[[cloud.deployment.storage.volumes]]`

Declares persistent volume claims for stateful workloads.

```toml
[[cloud.deployment.storage.volumes]]
name      = "data-volume"
mountPath = "/data"
readOnly  = false
size      = "5Gi"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Name of the persistent volume claim. |
| `mountPath` | string | Yes | Container path where the volume is mounted. |
| `readOnly` | boolean | No | Whether the volume is mounted as read-only. Defaults to `false`. |
| `size` | string | No | Requested storage size (e.g., `"1Gi"`, `"500Mi"`). |

## `[cloud.config]`

Controls how configuration files and secrets are injected into the container at runtime.

### `[[cloud.config.files]]`

Mounts local configuration files into the container as Kubernetes ConfigMaps.

```toml
[[cloud.config.files]]
file = "./Config.toml"

[[cloud.config.files]]
file = "./resources/datasource.toml"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Path to the local configuration file to mount into the container. |

### `[[cloud.config.secrets]]`

Mounts sensitive configuration as Kubernetes Secrets rather than ConfigMaps. Use this for files containing passwords, tokens, and API keys.

```toml
[[cloud.config.secrets]]
file = "./Secret.toml"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Path to the local secret configuration file. |

## Complete example

```toml
[container.image]
repository = "ghcr.io/wso2"
name       = "order-service"
tag        = "v1.2.0"

[cloud.deployment]
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu    = "200m"
max_cpu    = "1000m"

[cloud.deployment.autoscaling]
min_replicas = 2
max_replicas = 10
cpu          = 60

[cloud.deployment.probes.liveness]
port                = 9091
path                = "/probes/healthz"
initialDelaySeconds = 30
periodSeconds       = 10

[cloud.deployment.probes.readiness]
port                = 9091
path                = "/probes/readyz"
initialDelaySeconds = 15
periodSeconds       = 5

[[cloud.config.files]]
file = "./Config.toml"

[[cloud.config.secrets]]
file = "./Secret.toml"
```

## What's next

- [Containerized Deployment](../../deploy/self-hosted/containerized-deployment.md) — deploy to Docker, Kubernetes, or OpenShift using the artifacts produced from Cloud.toml.
- [Config.toml reference](../config/configtoml-reference.md) — define the runtime values you mount via `[[cloud.config.files]]`.
