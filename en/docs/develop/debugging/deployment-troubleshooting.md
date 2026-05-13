---
sidebar_position: 4
title: Deployment Troubleshooting
description: Diagnose issues when running Ballerina services in Docker, Kubernetes, GraalVM native images, and Choreo.
keywords: [ballerina, docker, kubernetes, graalvm, choreo, deployment, troubleshooting, cloud.toml]
---

# Deployment Troubleshooting

Diagnose issues that appear only when a service is packaged and deployed: Docker containers, Kubernetes pods, GraalVM native images, and Choreo. Most deployment issues fall into one of three buckets: the image fails to build, the container starts but the service is unreachable, or configuration values are missing at runtime.

For runtime configuration mechanics (the `BAL_CONFIG_*` environment variables and their priority), see [Runtime configuration in deployed environments](#runtime-configuration-in-deployed-environments) at the end of this page.

## Docker

Ballerina supports Code-to-Cloud (C2C) Docker generation via `cloud = "docker"` in `Ballerina.toml`. The generated Dockerfile uses the `ballerina/jvm-runtime` base image (Debian-based). If you use a custom base image (e.g., Alpine), native library compatibility issues may arise, particularly with DNS resolution and TLS libraries.

### Build and run

```bash
# In Ballerina.toml: [build-options] cloud = "docker"
bal build

# Docker artifacts are generated under: target/docker/<package-name>/
docker build -t myapp:latest target/docker/myapp/
docker run -p 9090:9090 myapp:latest
```

### Build failures

When `bal build --cloud=docker` fails before an image is produced:

| Cause | Solution |
|---|---|
| Docker not running | Start the Docker daemon |
| Insufficient disk space | Clean unused images: `docker system prune` |
| Missing `Cloud.toml` | Create a `Cloud.toml` with container configuration |
| Build context too large | Add a `.dockerignore` file to exclude unnecessary files |

### Common runtime issues

When the container builds but the service misbehaves at runtime:

| Symptom | Cause | Fix |
|---|---|---|
| Container starts but service unreachable | Port not exposed or bound to wrong interface | Expose the port in the Dockerfile or `Cloud.toml`; bind the listener to `0.0.0.0` |
| `Config.toml` not found in container | Config file not mounted | Mount via a Docker volume, or use `BAL_CONFIG_DATA` env var |
| `OutOfMemoryError` in container | Container memory limit too low for the JVM | Increase the container memory limit; set `-Xmx` via `JAVA_OPTS` |
| "File not found" for resources | Relative paths not valid in the container | Use paths relative to the working directory (`/home/ballerina`) |
| TLS certificate errors | Certificate not available in the container | Mount cert files and update `Config.toml` paths accordingly |

### Passing configuration to Docker

```bash
# Option 1: Environment variable (preferred for secrets)
docker run -e BAL_CONFIG_DATA='[myorg.myapp]
port = 8080
apiKey = "secret"
' myapp:latest

# Option 2: Mount Config.toml as a volume
docker run -v /path/to/Config.toml:/home/ballerina/Config.toml myapp:latest
```

For more options, see [Runtime configuration in deployed environments](#runtime-configuration-in-deployed-environments) below.

## Kubernetes

Use `cloud = "k8s"` in `Ballerina.toml`. Kubernetes artifacts are generated in `target/kubernetes/`.

### Common Kubernetes issues

| Symptom | Cause | Fix |
|---|---|---|
| Pod in `CrashLoopBackOff` | Application panicking on startup, OOM, or missing config | `kubectl logs <pod>`. Look for the error in stdout/stderr |
| Pod in `Pending` | Insufficient cluster resources | `kubectl describe pod <pod>` for resource constraints |
| Service unreachable externally | Missing `Ingress` or `LoadBalancer` service | Check `Cloud.toml` `external_accessible` setting |
| Configuration not loaded | `Config.toml` not mounted as a ConfigMap/Secret | See [Cloud.toml example](#cloudtoml-example) below |
| `ImagePullBackOff` | Image not pushed to registry, or wrong registry URL | Push the image; check `container.image.repository` in `Cloud.toml` |
| Health check failing | Liveness/readiness probe endpoints not configured | Add probe config to `Cloud.toml` |

### Cloud.toml example

A representative `Cloud.toml` for a Kubernetes deployment:

```toml
[container.image]
repository = "myregistry.io/myorg"
name = "myservice"
tag = "v1.0.0"

[cloud.deployment]
min_memory = "256Mi"           # default: "100Mi"
max_memory = "512Mi"           # default: "256Mi"
min_cpu = "250m"               # default: "1000m"
max_cpu = "1500m"              # default: "1500m"
external_accessible = true

[cloud.deployment.autoscaling]
min_replicas = 2               # default: 2
max_replicas = 5               # default: 3
cpu = 50                       # CPU threshold %
memory = 80                    # Memory threshold %

[cloud.deployment.probes.readiness]
port = 9090
path = "/health/ready"

[cloud.deployment.probes.liveness]
port = 9090
path = "/health/live"

# Environment variables from secrets
[[cloud.secret.envs]]
key_ref = "DB_PASSWORD"
name = "DB_PASSWORD"
secret_name = "db-secret"

# Config files mounted as ConfigMaps
[[cloud.config.files]]
file = "Config.toml"

# Secret files mounted to a directory
[[cloud.secret.files]]
file = "secrets.toml"
mount_dir = "/home/ballerina/secrets"
```

Full `Cloud.toml` specification: [code-to-cloud-spec.md](https://github.com/ballerina-platform/ballerina-spec/blob/master/c2c/code-to-cloud-spec.md).

## GraalVM native image

Ballerina supports building GraalVM native executables for faster startup and lower memory footprint.

### Build command

```bash
bal build --graalvm
```

### Prerequisites

- GraalVM JDK installed and `GRAALVM_HOME` set (or `native-image` on `PATH`).
- In `Ballerina.toml`:

  ```toml
  [build-options]
  graalvm = true                         # alternative to the --graalvm CLI flag
  graalvmBuildOptions = "--no-fallback"  # optional: additional native-image flags
  ```

### Key debugging strategy

If the native image fails at runtime, **always verify the issue reproduces in JVM mode first** (`bal run` without `--graalvm`). If it works in JVM mode but fails as a native image, the issue is GraalVM-specific.

### Common build failures

| Error or symptom | Cause | Fix |
|---|---|---|
| `native-image` command not found | GraalVM not installed or not on `PATH` | Install GraalVM and set `GRAALVM_HOME`; run `gu install native-image` |
| Reflection error at runtime | Class accessed via reflection not registered | Add `reflect-config.json` under `resources/META-INF/native-image/` |
| Build fails with "unsupported feature" | Library uses a JVM feature not supported by GraalVM | Check whether the library has GraalVM support; some `ballerinax` connectors may not be compatible |
| Native image crashes at runtime | Runtime behavior differs from JVM mode | Test with JVM mode first. If JVM mode works, file a GraalVM compatibility issue |
| Build takes very long or runs out of memory | Native image compilation is resource-intensive | Increase build memory: `graalvmBuildOptions = "-J-Xmx8g"` |

### Memory note

`JAVA_OPTS` (e.g., `-Xmx`) does **not** apply to native images. Native images manage their own memory. To control native image heap size, use `-R:MaxHeapSize=512m` in `graalvmBuildOptions` or at runtime.

For JVM-mode memory tuning, see [Performance Profiling](performance-profiling.md#jvm-memory-tuning).

## Choreo

[Choreo](https://wso2.com/choreo/) is WSO2's integration platform that natively supports Ballerina. When an issue surfaces only on Choreo, the first triage question is:

**Does `bal build && bal run` work locally?**

- **Yes**: likely a Choreo environment issue. The Ballerina code itself is correct; the issue is in the Choreo build pipeline, configuration injection, or runtime environment. Check Choreo's component logs and configuration panel.
- **No**: this is a Ballerina issue. Use this page and [Errors and Stack Traces](errors-and-stack-traces.md) to diagnose and fix locally before redeploying.

### Common Choreo-specific issues

| Issue | Symptom | Fix |
|---|---|---|
| Configurable values not loaded | Service uses default values instead of Choreo-configured values | Verify the configurable keys match the `[org.package.module]` format in Choreo's config panel |
| Build fails in the Choreo pipeline | Build succeeds locally but fails in Choreo | Check whether the Choreo build uses a different Ballerina version; verify all dependencies are available from Ballerina Central (no local-only dependencies) |
| Service health check failing | Pod restarts in Choreo | Configure the health check endpoint path in Choreo to match the service's actual health endpoint |
| Cannot access logs | No visibility into runtime errors | Check Choreo's Monitoring and Insights section. Log availability may vary by Choreo plan and component type; consult Choreo documentation for current capabilities |
| Environment variables not available | `os:getEnv()` returns empty | Configure environment variables in Choreo's component settings, not in code |

## Runtime configuration in deployed environments

Ballerina resolves configurable values from multiple sources. When the same value is set in more than one place, the highest-priority source wins.

### Priority order

1. `BAL_CONFIG_VAR_<VARIABLE_NAME>` environment variables (per-variable override; highest priority)
2. `BAL_CONFIG_DATA` environment variable (inline TOML)
3. Files listed in `BAL_CONFIG_FILES` (colon-separated on Linux/macOS, semicolon on Windows)
4. `Config.toml` in the working directory (lowest priority)

### BAL_CONFIG_VAR_ for individual values

Best for secrets, as it avoids writing values to disk in the container:

```bash
# Format: BAL_CONFIG_VAR_<VARIABLE_NAME>=<value>
# Variable names are converted to uppercase
export BAL_CONFIG_VAR_DBHOST="db.internal"
export BAL_CONFIG_VAR_DBPORT=3306
export BAL_CONFIG_VAR_APIKEY="secret-key"
bal run
```

`BAL_CONFIG_VAR_` supports `int`, `byte`, `float`, `boolean`, `string`, `decimal`, `enum`, and `xml` types. The value must be the `toString()` representation of the intended value. This approach works for simple top-level configurable variables.

### BAL_CONFIG_DATA for inline TOML

Useful for structured configuration with multiple keys:

```bash
export BAL_CONFIG_DATA='[myorg.myapp]
dbHost = "db.internal"
dbPort = 3306
features = ["auth", "metrics"]'
bal run
```

### BAL_CONFIG_FILES for multiple files

Point to one or more config files (colon-separated on Linux/macOS, semicolon on Windows):

```bash
export BAL_CONFIG_FILES="/config/app.toml:/secrets/db.toml"
bal run
```

### Kubernetes pattern: separate ConfigMap and Secret

```yaml
# Non-sensitive config in a ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  config.toml: |
    [myorg.myapp]
    port = 8080
    dbHost = "postgres.internal"
---
# Secrets separately
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secrets
data:
  secrets.toml: <base64-encoded TOML with passwords>
```

```yaml
# In the pod spec
env:
  - name: BAL_CONFIG_FILES
    value: "/config/config.toml:/secrets/secrets.toml"
volumeMounts:
  - name: config-vol
    mountPath: /config
  - name: secrets-vol
    mountPath: /secrets
```

### Debugging config issues in deployed environments

```bash
# Verify the pod can see the config
kubectl exec -it <pod-name> -- env | grep BAL_CONFIG
kubectl exec -it <pod-name> -- cat /config/config.toml
```

For local config troubleshooting (`Ballerina.toml` vs `Config.toml`, key path mismatches), see [Top configuration mistakes](troubleshooting.md#top-configuration-mistakes).

## See also

- [Library Troubleshooting](library-troubleshooting.md): Connector errors that surface only after deploy
- [Performance Profiling](performance-profiling.md): Pool and JVM memory tuning (JVM mode only)
