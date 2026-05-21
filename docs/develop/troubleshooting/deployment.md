---
title: Deployment
---

# Deployment

This page covers issues that surface only after an integration leaves your machine: Docker containers, Kubernetes clusters, GraalVM native images, Choreo, and configuration injected at runtime.

Before you start digging into the deployment layer, confirm the integration runs locally with `bal build && bal run`. If it fails locally, fix the integration first using the other pages in this section. If it works locally but breaks once deployed, the issue is in the deployment environment, and the sections below help you isolate it.

## Docker deployments

WSO2 Integrator supports Code-to-Cloud (C2C) Docker generation through `cloud = "docker"` in `Ballerina.toml`. The generated Dockerfile uses the `ballerina/jvm-runtime` base image, which is Debian-based. A custom base image (for example, Alpine) can introduce native library compatibility issues, particularly around DNS resolution and TLS.

Build the image:

```bash
# In Ballerina.toml: [build-options] cloud = "docker"
bal build

# Docker artifacts in: target/docker/<package-name>/
docker build -t myapp:latest target/docker/myapp/
docker run -p 9090:9090 myapp:latest
```

### Common Docker issues

| Symptom                                  | Cause                                        | Fix                                                                 |
| :--------------------------------------- | :------------------------------------------- | :------------------------------------------------------------------ |
| Container starts but service unreachable | Port not exposed or bound to wrong interface | Expose the port in the Dockerfile or `Cloud.toml`; verify the binding is on `0.0.0.0` |
| `Config.toml` not found in the container | Config file not mounted                      | Mount the file as a Docker volume or use the `BAL_CONFIG_DATA` environment variable |
| `OutOfMemoryError` in the container      | Container memory limit too low for the JVM   | Increase the container memory limit; set `-Xmx` through `JAVA_OPTS` |
| "File not found" for resources           | Relative paths don't resolve inside the container | Use paths relative to the working directory (`/home/ballerina`) |
| TLS certificate errors                   | Certificates not available in the container  | Mount certificate files and update the `Config.toml` paths to match |

### Pass configuration to a container

```bash
# Option 1: Environment variable (preferred for secrets)
docker run -e BAL_CONFIG_DATA='[myorg.myapp]
port = 8080
apiKey = "secret"
' myapp:latest

# Option 2: Mount Config.toml
docker run -v /path/to/Config.toml:/home/ballerina/Config.toml myapp:latest
```

## Kubernetes deployments

Use `cloud = "k8s"` in `Ballerina.toml`. Kubernetes artifacts are generated in `target/kubernetes/`.

### Common Kubernetes issues

| Symptom                        | Cause                                                    | Fix                                                            |
| :----------------------------- | :------------------------------------------------------- | :------------------------------------------------------------- |
| Pod in `CrashLoopBackOff`      | The integration panics on startup, runs out of memory, or can't find its configuration | Inspect `kubectl logs <pod>` and look for the error on stdout or stderr |
| Pod in `Pending`               | The cluster doesn't have enough resources                | Run `kubectl describe pod <pod>` and check the resource constraints |
| Service unreachable externally | Missing `Ingress` or `LoadBalancer`                      | Check the `external_accessible` setting in `Cloud.toml`        |
| Configuration not loaded       | `Config.toml` not mounted as a ConfigMap or Secret       | See the `Cloud.toml` example below                             |
| `ImagePullBackOff`             | Image not pushed to the registry, or the registry URL is wrong | Push the image; check `container.image.repository` in `Cloud.toml` |
| Health check failing           | Liveness or readiness probe endpoints not configured     | Add probe configuration to `Cloud.toml`                        |

### `Cloud.toml` for Kubernetes

```toml
[container.image]
repository = "myregistry.io/myorg"
name = "myservice"
tag = "v1.0.0"

[cloud.deployment]
min_memory = "256Mi"      # default: "100Mi"
max_memory = "512Mi"      # default: "256Mi"
min_cpu = "250m"          # default: "1000m"
max_cpu = "1500m"         # default: "1500m"
external_accessible = true

[cloud.deployment.autoscaling]
min_replicas = 2          # default: 2
max_replicas = 5          # default: 3
cpu = 50                  # CPU threshold percentage; default: 50
memory = 80               # memory threshold percentage; default: 80

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

For the full `Cloud.toml` reference, see the [Code-to-Cloud specification](https://github.com/ballerina-platform/ballerina-spec/blob/master/c2c/code-to-cloud-spec.md).

## GraalVM native image

WSO2 Integrator supports GraalVM native executables for faster startup and a lower memory footprint.

Build with:

```bash
bal build --graalvm
```

### Prerequisites

- GraalVM JDK installed, with `GRAALVM_HOME` set or `native-image` on the `PATH`.
- The following block in `Ballerina.toml` (alternative to the `--graalvm` CLI flag):

```toml
[build-options]
graalvm = true
graalvmBuildOptions = "--no-fallback"   # optional: additional native-image flags
```

### Verify in JVM mode first

If a native image fails at runtime, reproduce the issue with `bal run` (without `--graalvm`) first. If JVM mode works but the native image doesn't, the problem is GraalVM-specific. This single check saves time on most native-image investigations.

### Common build failures

| Error or symptom                           | Cause                                               | Fix                                                                                          |
| :----------------------------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `native-image` command not found           | GraalVM not installed or not on the `PATH`          | Install GraalVM, set `GRAALVM_HOME`, and run `gu install native-image`                       |
| Reflection error at runtime                | A class accessed through reflection isn't registered | Add a `reflect-config.json` file to `resources/META-INF/native-image/` in the project        |
| Build fails with "unsupported feature"     | A library uses a JVM feature that GraalVM doesn't support | Check whether the library has GraalVM support; some `ballerinax` connectors may not be compatible |
| Native image crashes at runtime            | Runtime behavior differs from JVM mode              | Test in JVM mode first. If JVM mode works, file a GraalVM compatibility issue.               |
| Build takes very long or runs out of memory | Native image compilation is resource-intensive     | Increase the build memory: `graalvmBuildOptions = "-J-Xmx8g"`                                |

`JAVA_OPTS` (for example, `-Xmx`) does **not** apply to native images. Native images manage their own memory. To control native image heap size, use `-R:MaxHeapSize=512m` in `graalvmBuildOptions` or at runtime.

## Choreo deployments

[Choreo](https://wso2.com/choreo/) is WSO2's integration platform, and it natively supports WSO2 Integrator services. When a service misbehaves on Choreo, start with one diagnostic question:

**Does `bal build && bal run` work locally?**

- **Yes.** The code is correct, and the issue is in the Choreo build pipeline, configuration injection, or runtime environment. Raise it with the Choreo team.
- **No.** Fix the integration locally first using the other pages in this section, then redeploy.

### Common Choreo issues

| Issue                               | Symptom                                                         | Fix                                                                                                                                                                                                                  |
| :---------------------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configurable values not loaded      | The service uses default values instead of the values set in Choreo | Verify the configurable keys match the `[org.package.module]` format in Choreo's configuration panel                                                                                                             |
| Build fails in the Choreo pipeline  | Build succeeds locally but fails in Choreo                      | Check whether the Choreo build uses a different runtime version; verify all dependencies are available from Ballerina Central (no local-only dependencies)                                                           |
| Service health check failing        | Pod restarts in Choreo                                          | Configure the health check endpoint in Choreo to match the service's actual health endpoint                                                                                                                          |
| Cannot access logs                  | No visibility into runtime errors                               | Check Choreo's **Monitoring** and **Insights** sections. Log availability varies by Choreo plan and component type. Consult the Choreo documentation or the Choreo team for current capabilities.                  |
| Environment variables not available | `os:getEnv()` returns empty                                     | Configure environment variables in Choreo's component settings, not in source code                                                                                                                                   |

## Configuration in deployed environments

Configurable values are resolved in this priority order (highest to lowest):

1. `BAL_CONFIG_VAR_<VARIABLE_NAME>` environment variables (per-variable override; highest priority).
2. The `BAL_CONFIG_DATA` environment variable (inline TOML).
3. Files listed in `BAL_CONFIG_FILES` (colon-separated on Linux and macOS, semicolon-separated on Windows).
4. `Config.toml` in the working directory.

For sensitive values such as API keys and passwords, prefer injecting each value through a `BAL_CONFIG_VAR_<VARIABLE_NAME>=<value>` environment variable instead of mounting a file. This keeps secrets off disk inside the container.

### Kubernetes: separate ConfigMap and Secret

```yaml
# Store non-sensitive config in a ConfigMap
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
# Store secrets separately
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

### Debug configuration inside a pod

```bash
# Verify the pod can see the configuration
kubectl exec -it <pod-name> -- env | grep BAL_CONFIG
kubectl exec -it <pod-name> -- cat /config/config.toml

# Confirm the configurable values are actually read
# Add a debug log in the service init that prints the resolved value
```

## What's next

- [Logging](logging.md) - add log statements to trace what the deployed integration is doing.
- [Errors and stack traces](errors-and-stack-traces.md) - read the error output captured from a deployed pod or container.
- [Profiling](profiling.md) - investigate performance issues that only appear under deployed load.
