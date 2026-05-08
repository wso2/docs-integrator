---
title: Cloud.toml Reference
---

# Cloud.toml Reference

## Overview

`Cloud.toml` configures cloud deployment settings for a Ballerina package, including Docker container images, Kubernetes resource limits, autoscaling, health probes, and configuration file mounting. This file is placed in the package root alongside `Ballerina.toml`.

The `Cloud.toml` file is entirely optional. The Ballerina compiler applies sensible defaults for any unspecified values. Only override properties that differ from the defaults.

To enable cloud artifact generation, set the build option in `Ballerina.toml` or pass it as a CLI flag:

```bash
# Via Ballerina.toml
[build-options]
cloud = "k8s"    # Generates Docker + Kubernetes artifacts

# Via CLI
bal build --cloud=k8s
bal build --cloud=docker
```

## `[container.image]`

Configures the Docker container image that is built during `bal build`.

```toml
[container.image]
repository = "wso2inc"
name = "order-service"
tag = "v1.2.0"
base = "ballerina/jvm-runtime:3.1"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `repository` | string | `""` | Docker registry or repository prefix (e.g., `"docker.io/wso2inc"`, `"ghcr.io/myorg"`). |
| `name` | string | Package name | Container image name. Defaults to the Ballerina package name. |
| `tag` | string | `"latest"` | Image version tag. |
| `base` | string | `"ballerina/jvm-runtime:3.1"` | Base image for the Dockerfile. Override to use a custom JVM runtime image. |
| `entrypoint` | string | Ballerina default | Custom container entrypoint command. |

## `[[container.copy.files]]`

Copies additional files into the container image at build time.

```toml
[[container.copy.files]]
sourceFile = "./resources/config.xml"
target = "/home/ballerina/config.xml"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sourceFile` | string | Yes | Path to the local file to copy into the image. |
| `target` | string | Yes | Absolute path inside the container where the file is placed. |

## `[cloud.deployment]`

Defines Kubernetes deployment resource requests and limits.

```toml
[cloud.deployment]
replicas = 1
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu = "200m"
max_cpu = "1000m"
internal_domain_name = "order-service.internal"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `replicas` | int | `1` | Fixed number of pod replicas. When set, autoscaling is still applied on top of this baseline. |
| `min_memory` | string | `"100Mi"` | Minimum memory allocation (Kubernetes resource request). |
| `max_memory` | string | `"512Mi"` | Maximum memory limit (Kubernetes resource limit). |
| `min_cpu` | string | `"200m"` | Minimum CPU allocation in millicores (Kubernetes resource request). |
| `max_cpu` | string | `"500m"` | Maximum CPU limit in millicores (Kubernetes resource limit). |
| `internal_domain_name` | string | `""` | Internal cluster DNS name for service-to-service communication. |

## `[cloud.deployment.autoscaling]`

Configures horizontal pod autoscaling for Kubernetes deployments. HPA is enabled by default unless `enable = false` is set.

```toml
[cloud.deployment.autoscaling]
enable = true
min_replicas = 2
max_replicas = 5
cpu = 60
memory = 80
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enable` | bool | `true` | Set to `false` to disable HPA generation entirely. |
| `min_replicas` | int | Deployment replicas | Minimum number of pod replicas. |
| `max_replicas` | int | Deployment replicas + 1 | Maximum number of pod replicas. |
| `cpu` | int | `50` | Target CPU utilization percentage that triggers scaling. |
| `memory` | int | `0` | Target memory utilization percentage that triggers scaling. `0` disables memory-based scaling. |

## `[cloud.deployment.probes.liveness]`

Configures the Kubernetes liveness probe. The liveness probe determines if the container is still running and should be restarted if it fails.

> **Note:** `initialDelaySeconds` is hardcoded to `30` seconds by the compiler and cannot be overridden from `Cloud.toml`.

```toml
[cloud.deployment.probes.liveness]
port = 9091
path = "/probes/healthz"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | int | Service port | Port the liveness probe hits. |
| `path` | string | `"/probes/healthz"` | HTTP path for the liveness check endpoint. |

## `[cloud.deployment.probes.readiness]`

Configures the Kubernetes readiness probe. The readiness probe determines if the container is ready to accept traffic.

> **Note:** `initialDelaySeconds` is hardcoded to `30` seconds by the compiler and cannot be overridden from `Cloud.toml`.

```toml
[cloud.deployment.probes.readiness]
port = 9091
path = "/probes/readyz"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | int | Service port | Port the readiness probe hits. |
| `path` | string | `"/probes/readyz"` | HTTP path for the readiness check endpoint. |

## `[[cloud.config.files]]`

Mounts local configuration files into the container as Kubernetes ConfigMaps. Use this for Ballerina `Config.toml` files.

```toml
[[cloud.config.files]]
file = "./Config.toml"

[[cloud.config.files]]
file = "./resources/datasource.toml"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Path to the local configuration file to mount into the container. |

## `[[cloud.config.secrets]]`

Mounts sensitive configuration as Kubernetes Secrets rather than ConfigMaps.

```toml
[[cloud.config.secrets]]
file = "./Secret.toml"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Path to the local secret configuration file. |

## `[[cloud.config.maps]]`

Mounts arbitrary local files or directories as Kubernetes ConfigMaps at a custom container path.

```toml
[[cloud.config.maps]]
file = "./resources/log4j2.xml"
mount_dir = "/home/ballerina/conf"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Path to the local file or directory to mount. |
| `mount_dir` | string | Yes | Container directory where the file is mounted. Relative paths are resolved under the Ballerina home directory. |

## `[[cloud.secret.files]]`

Mounts arbitrary local files or directories as Kubernetes Secrets at a custom container path.

```toml
[[cloud.secret.files]]
file = "./resources/keystore.p12"
mount_dir = "/home/ballerina/security"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | string | Yes | Path to the local file or directory to mount as a secret. |
| `mount_dir` | string | No | Container directory where the secret is mounted. Defaults to the Ballerina secrets mount path. |

## `[[cloud.config.envs]]`

Injects environment variables from existing Kubernetes ConfigMap keys.

```toml
[[cloud.config.envs]]
name = "DB_URL"
key_ref = "database_url"
config_name = "app-config"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Name of the environment variable in the container. Defaults to the value of `key_ref`. |
| `key_ref` | string | Yes | Key inside the referenced ConfigMap. |
| `config_name` | string | Yes | Name of the Kubernetes ConfigMap to read from. |

## `[[cloud.secret.envs]]`

Injects environment variables from existing Kubernetes Secret keys.

```toml
[[cloud.secret.envs]]
name = "DB_PASSWORD"
key_ref = "database_password"
secret_name = "app-secrets"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Name of the environment variable in the container. Defaults to the value of `key_ref`. |
| `key_ref` | string | Yes | Key inside the referenced Secret. |
| `secret_name` | string | Yes | Name of the Kubernetes Secret to read from. |

## `[[cloud.deployment.storage.volumes]]`

Declares persistent volume claims for stateful workloads.

```toml
[[cloud.deployment.storage.volumes]]
name = "data-volume"
local_path = "/home/ballerina/data"
size = "5Gi"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Name of the persistent volume claim. |
| `local_path` | string | Yes | Absolute container path where the volume is mounted. |
| `size` | string | No | Requested storage size (e.g., `"1Gi"`, `"500Mi"`). |

## `[settings]`

Controls build-level behaviour for artifact generation.

```toml
[settings]
singleYAML = true
buildImage = true
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `singleYAML` | bool | `true` | When `true`, all Kubernetes resources are written into a single YAML file. |
| `buildImage` | bool | `true` | When `false`, skips Docker image build and only generates Kubernetes YAML artifacts. |

## `[graalvm.builder]`

Customises the GraalVM native-image build stage. Only relevant when building with `--cloud=k8s` and a GraalVM toolchain.

```toml
[graalvm.builder]
base = "ghcr.io/graalvm/native-image-community:21-muslib-ol9"
buildCmd = "native-image -jar app.jar -o app --no-fallback"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `base` | string | `"ghcr.io/graalvm/native-image-community:21-ol9"` | Builder image used for the native compilation stage. |
| `buildCmd` | string | Generated | Full native-image command. Override only when the generated command needs custom flags not expressible via `graalvm.buildArgs`. |

## Complete example

```toml
[container.image]
repository = "ghcr.io/wso2"
name = "order-service"
tag = "v1.2.0"

[cloud.deployment]
replicas = 1
min_memory = "256Mi"
max_memory = "512Mi"
min_cpu = "200m"
max_cpu = "1000m"

[cloud.deployment.autoscaling]
enable = true
min_replicas = 2
max_replicas = 10
cpu = 60
memory = 80

[cloud.deployment.probes.liveness]
port = 9091
path = "/probes/healthz"

[cloud.deployment.probes.readiness]
port = 9091
path = "/probes/readyz"

[[cloud.config.files]]
file = "./Config.toml"

[[cloud.config.secrets]]
file = "./Secret.toml"

[[cloud.deployment.storage.volumes]]
name = "data-volume"
local_path = "/home/ballerina/data"
size = "5Gi"

[settings]
singleYAML = true
buildImage = true
```
