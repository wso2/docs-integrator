---
sidebar_position: 9
title: GraalVM Native Images
description: Compile Ballerina integrations to GraalVM native binaries for instant startup and reduced memory.
---

# GraalVM Native Images

GraalVM native image compilation transforms your Ballerina integration into a platform-specific binary that starts in milliseconds and uses significantly less memory than JVM-based deployments. This is ideal for serverless, CLI tools, and resource-constrained environments.

## JVM vs native image

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
| GraalVM JDK | GraalVM for JDK 21 (Community or Enterprise Edition) |
| Native Image | `gu install native-image` (included in newer distributions) |
| OS Tools | `gcc`, `zlib` headers (Linux), Xcode Command Line Tools (macOS) |
| Memory | 8 GB+ RAM recommended for compilation |
| Docker | 8 GB+ memory allocated to Docker (for container builds) |

### Install GraalVM

```bash
# Using SDKMAN (recommended)
sdk install java 21.0.2-graalce

# Verify installation
java -version
native-image --version
```

Set the `GRAALVM_HOME` environment variable:

**Linux/macOS:**
```bash
export GRAALVM_HOME=$HOME/.sdkman/candidates/java/current
```

**Windows:**
```cmd
set GRAALVM_HOME=C:\path\to\graalvm
```

If using SDKMAN, you can alternatively use `JAVA_HOME` instead of `GRAALVM_HOME`.

### Platform-specific requirements

**Windows:**
- Install Visual Studio with Microsoft Visual C++ (MSVC)
- Initialize the **x64 Native Tools Command Prompt** before running `bal build --graalvm`

For more details, see [Prerequisites for Native Image on Windows](https://www.graalvm.org/latest/getting-started/windows/#prerequisites-for-native-image-on-windows).

**macOS (Apple Silicon):**
- GraalVM native-image support for Apple M1/M2 (darwin-aarch64) is experimental
- Most features work, but some edge cases may have compatibility issues

For more details, see [GraalVM on macOS](https://www.graalvm.org/latest/getting-started/macos/).

**Linux:**

For distribution-specific requirements, see [GraalVM on Linux](https://www.graalvm.org/latest/getting-started/linux/).

## Building a native image

### Basic build

```bash
bal build --graalvm
```

This produces a native binary in the `target/bin/` directory:

```
target/
  bin/
    my_integration    # Native executable (no JVM required to run)
```

### Run the native binary

```bash
./target/bin/my_integration
```

### Test native compatibility

Test your integration with GraalVM to verify runtime compatibility of dependencies:

```bash
bal test --graalvm
```

:::note
Code coverage and runtime debugging features are not supported with GraalVM native image testing.
:::

### Build with Docker isolation

Build inside a Docker container for consistent, reproducible builds:

```bash
bal build --graalvm --cloud=docker
```

This generates a minimal Docker image containing only the native binary.

## Configuration for native image

### Reflection configuration

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

### Build options

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

## What's next

- [Serverless Deployment](serverless-deployment.md) -- Deploy native images as Lambda functions
- [VM Deployment](../../deploy/self-hosted/vm-deployment.md) -- Run native binaries on virtual machines
- [Containerized Deployment](../../deploy/self-hosted/containerized-deployment.md) -- Build minimal container images for Docker, Kubernetes, and OpenShift
