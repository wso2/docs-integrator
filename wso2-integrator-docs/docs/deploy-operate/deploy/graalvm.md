---
sidebar_position: 9
title: GraalVM Native Images
description: Compile Ballerina integrations to GraalVM native binaries for instant startup and reduced memory.
---

# GraalVM Native Images

GraalVM native image compilation transforms your Ballerina integration into a platform-specific binary that starts in milliseconds and uses significantly less memory than JVM-based deployments. This is ideal for serverless, CLI tools, and resource-constrained environments.

## Benefits

| Metric | JVM (JAR) | GraalVM Native |
|--------|-----------|----------------|
| Startup Time | 2-5 seconds | 20-100 ms |
| Memory Footprint | 150-300 MB | 30-80 MB |
| Package Size | 20-50 MB | 40-80 MB |
| Peak Throughput | Higher | Slightly lower |
| Build Time | Seconds | 2-5 minutes |

## Prerequisites

| Requirement | Details |
|-------------|---------|
| GraalVM JDK | GraalVM for JDK 17 or later (Community or Enterprise) |
| Native Image | `gu install native-image` (included in newer distributions) |
| OS Tools | `gcc`, `zlib` headers (Linux), Xcode Command Line Tools (macOS) |
| Memory | 8 GB+ RAM recommended for compilation |

### Install GraalVM

```bash
# Using SDKMAN (recommended)
sdk install java 17.0.9-graal

# Verify installation
java -version
native-image --version
```

## Building a Native Image

### Basic Build

```bash
bal build --graalvm
```

This produces a native binary in the `target/bin/` directory:

```
target/
  bin/
    my_integration    # Native executable (no JVM required to run)
```

### Run the Native Binary

```bash
./target/bin/my_integration
```

### Build with Docker Isolation

Build inside a Docker container for consistent, reproducible builds:

```bash
bal build --graalvm --cloud=docker
```

This generates a minimal Docker image containing only the native binary.

## Configuration for Native Image

### Reflection Configuration

Some libraries require reflection metadata. Add a `reflect-config.json` in your project:

```json
[
  {
    "name": "com.example.MyClass",
    "allDeclaredConstructors": true,
    "allPublicMethods": true
  }
]
```

Reference it in `Ballerina.toml`:

```toml
[package]
org = "myorg"
name = "my_integration"
version = "1.0.0"

[build-options]
graalvmBuildOptions = "-H:ReflectionConfigurationFiles=reflect-config.json"
```

### Build Options

| Option | Description |
|--------|-------------|
| `--no-fallback` | Fail the build if native compilation is incomplete |
| `--initialize-at-build-time` | Initialize classes during build for faster startup |
| `-H:+ReportExceptionStackTraces` | Include full stack traces in errors |
| `--enable-url-protocols=https` | Enable HTTPS support in the native image |
| `-march=native` | Optimize for the current CPU architecture |

Set additional options in `Ballerina.toml`:

```toml
[build-options]
graalvmBuildOptions = "--no-fallback --initialize-at-build-time -march=native"
```

## Deploying Native Images

### Standalone Binary on VM

Copy the binary directly -- no JVM installation needed:

```bash
scp target/bin/my_integration user@production-vm:/opt/integrations/
ssh user@production-vm "chmod +x /opt/integrations/my_integration"
```

Create a systemd service:

```ini
[Unit]
Description=WSO2 Integration (Native)
After=network.target

[Service]
Type=simple
User=ballerina
ExecStart=/opt/integrations/my_integration
Restart=on-failure
RestartSec=5
Environment=BAL_CONFIG_FILES=/opt/integrations/Config.toml

[Install]
WantedBy=multi-user.target
```

### Minimal Docker Image

Use a `distroless` or `scratch` base image for the smallest possible container:

```dockerfile
FROM gcr.io/distroless/base-debian12
COPY target/bin/my_integration /app/my_integration
COPY Config.toml /app/Config.toml
WORKDIR /app
EXPOSE 9090
ENTRYPOINT ["./my_integration"]
```

Build and run:

```bash
docker build -t my-integration:native .
docker run -p 9090:9090 my-integration:native
```

### AWS Lambda with Native Image

```bash
bal build --graalvm --cloud=aws_lambda
```

Deploy the generated ZIP -- cold start drops from seconds to under 100ms.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails with "missing reflection metadata" | Add classes to `reflect-config.json` |
| Build runs out of memory | Increase build machine RAM or set `-J-Xmx8g` |
| Runtime `ClassNotFoundException` | Ensure all dynamic classes are registered in reflection config |
| HTTPS connections fail | Add `--enable-url-protocols=https` to build options |
| Slow build times | Use build caching, increase CPU cores available to the build |

## Limitations

- **Dynamic class loading** is not supported; all classes must be known at build time.
- **Reflection** must be explicitly configured for libraries that use it.
- **Build time** is significantly longer than JVM builds (minutes vs. seconds).
- **Debugging** is more limited compared to JVM-based execution.
- Some Ballerina libraries may not yet have full GraalVM compatibility -- check the [Ballerina library documentation](https://lib.ballerina.io) for native image support status.

## What's Next

- [Serverless Deployment](serverless.md) -- Deploy native images as Lambda functions
- [VM-Based Deployment](vm-based.md) -- Run native binaries on virtual machines
- [Docker & Kubernetes](docker-kubernetes.md) -- Build minimal container images
