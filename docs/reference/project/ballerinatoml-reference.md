---
title: Ballerina.toml Reference
---

# Ballerina.toml Reference

The `Ballerina.toml` file is the project manifest for a Ballerina package. It defines package metadata, build options, dependencies, platform-specific libraries, and code generation tool configurations. This file must reside in the root directory of every Ballerina package.

## `[package]`

Defines the core metadata for the package.

```toml
[package]
org = "wso2"
name = "healthcare_integration"
version = "1.2.0"
distribution = "2201.13.3"
visibility = "private"
readme = "README.md"
icon = "icon.png"
license = ["Apache-2.0"]
authors = ["WSO2 Inc."]
keywords = ["healthcare", "integration", "hl7"]
repository = "https://github.com/wso2/healthcare-integration"
include = ["resources/**", "data/*.json"]
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `org` | string | Yes | Organization name registered on Ballerina Central. Must be lowercase alphanumeric with underscores. |
| `name` | string | Yes | Package name. Defaults to the directory name if omitted. Must be lowercase alphanumeric with underscores. |
| `version` | string | Yes | Semantic version of the package (e.g., `"1.0.0"`). Defaults to `"0.1.0"`. |
| `distribution` | string | No | Minimum Ballerina distribution version required to build the package. |
| `visibility` | string | No | Set to `"private"` to restrict package access to organization members only on Ballerina Central. |
| `readme` | string | No | Path to a custom README markdown file used in generated documentation. |
| `icon` | string | No | Path to a PNG icon file (max 128x128 pixels) for package documentation. |
| `license` | string[] | No | Array of SPDX license identifiers (e.g., `["Apache-2.0"]`). |
| `authors` | string[] | No | Array of author names. |
| `keywords` | string[] | No | Array of searchable keywords describing the package. |
| `repository` | string | No | URL of the source code repository. |
| `include` | string[] | No | Glob patterns for additional files/directories to include in the `.bala` archive. |

## `[build-options]`

Configures build-time behavior. These options can also be passed as CLI flags to `bal build`.

```toml
[build-options]
observabilityIncluded = true
offline = false
skipTests = false
testReport = true
codeCoverage = true
cloud = "k8s"
graalvm = false
graalvmBuildOptions = "--no-fallback -H:+ReportExceptionStackTraces"
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `observabilityIncluded` | boolean | `false` | Include the observability module in the build to enable metrics and tracing. |
| `offline` | boolean | `false` | Build without downloading dependencies from Ballerina Central. |
| `skipTests` | boolean | `false` | Skip test execution during the build. |
| `testReport` | boolean | `false` | Generate an HTML test report after running tests. |
| `codeCoverage` | boolean | `false` | Enable code coverage analysis and generate a coverage report. |
| `cloud` | string | `""` | Cloud deployment target. Use `"k8s"` for Kubernetes, `"docker"` for Docker, or `"choreo"` for WSO2 Integration Platform. |
| `graalvm` | boolean | `false` | Build a GraalVM native executable instead of a JAR file. |
| `graalvmBuildOptions` | string | `""` | Additional arguments passed to the GraalVM `native-image` tool. |

## `[[dependency]]`

Declares explicit package dependencies. In most cases, dependencies are automatically resolved and recorded in `Dependencies.toml`. Use this section only when you need to pin a version or use a local repository.

```toml
[[dependency]]
org = "ballerinax"
name = "mysql"
version = "1.13.0"

[[dependency]]
org = "myorg"
name = "shared_utils"
version = "2.0.0"
repository = "local"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `org` | string | Yes | Organization name of the dependency package. |
| `name` | string | Yes | Package name of the dependency. |
| `version` | string | Yes | Minimum required semantic version. |
| `repository` | string | No | Set to `"local"` to resolve from the local repository (`~/.ballerina/repositories/local`). |

## `[[platform.java21.dependency]]`

Declares Java platform dependencies (JAR files) required by the package at compile time or runtime. Use Maven coordinates or a direct file path.

```toml
# Maven dependency
[[platform.java21.dependency]]
groupId = "com.mysql"
artifactId = "mysql-connector-j"
version = "8.3.0"

# Local JAR file
[[platform.java21.dependency]]
path = "./libs/custom-codec-1.0.jar"
modules = ["healthcare_integration"]
scope = "provided"
graalvmCompatible = true

# Test-only dependency
[[platform.java21.dependency]]
groupId = "org.mockito"
artifactId = "mockito-core"
version = "5.11.0"
scope = "testOnly"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `groupId` | string | Yes* | Maven group ID. Required when using Maven coordinates. |
| `artifactId` | string | Yes* | Maven artifact ID. Required when using Maven coordinates. |
| `version` | string | Yes* | Maven version. Required when using Maven coordinates. |
| `path` | string | Yes* | Absolute or relative path to a JAR file. Required when not using Maven coordinates. |
| `modules` | string[] | No | Restrict JAR visibility to specific modules within the package. |
| `scope` | string | No | Dependency scope: `"testOnly"` (tests only) or `"provided"` (compile-time only, not packaged). |
| `graalvmCompatible` | boolean | No | Mark this JAR as compatible with GraalVM native compilation. |

Use `platform.java17.dependency` or `platform.java21.dependency` depending on the target Java platform version.

## `[[platform.java21.repository]]`

Configures custom Maven repositories for resolving platform dependencies.

```toml
[[platform.java21.repository]]
id = "wso2-nexus"
url = "https://maven.wso2.org/nexus/content/repositories/releases/"
username = "user"
password = "pass"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | A unique identifier for the repository. |
| `url` | string | Yes | The Maven repository URL. |
| `username` | string | No | Authentication username. |
| `password` | string | No | Authentication password. |

## `[platform.java21]`

Package-level platform settings.

```toml
[platform.java21]
graalvmCompatible = true
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `graalvmCompatible` | boolean | `false` | Indicates whether the entire package is compatible with GraalVM native compilation. |

## `[[tool.<command>]]`

Configures code generation tools (such as the OpenAPI, GraphQL, or gRPC tools) that run automatically during the build.

```toml
[[tool.openapi]]
id = "petstore"
filePath = "./openapi/petstore.yaml"
targetModule = "petstore_client"
options.mode = "client"
options.nullable = true

[[tool.grpc]]
id = "order_service"
filePath = "./proto/order.proto"
targetModule = "order_grpc"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the tool invocation. |
| `filePath` | string | Yes | Path to the specification file (OpenAPI YAML, proto file, etc.). |
| `targetModule` | string | No | Destination module for the generated code. |
| `options` | table | No | Tool-specific configuration options. |

## Complete example

```toml
[package]
org = "wso2"
name = "order_management"
version = "1.0.0"
distribution = "2201.12.0"
license = ["Apache-2.0"]
authors = ["WSO2 Inc."]
keywords = ["orders", "integration"]
repository = "https://github.com/wso2/order-management"

[build-options]
observabilityIncluded = true
cloud = "k8s"
testReport = true
codeCoverage = true

[[dependency]]
org = "ballerinax"
name = "mysql"
version = "1.13.0"

[[platform.java21.dependency]]
groupId = "com.mysql"
artifactId = "mysql-connector-j"
version = "8.3.0"

[[tool.openapi]]
id = "inventory_api"
filePath = "./openapi/inventory.yaml"
targetModule = "inventory_client"
options.mode = "client"
```

## What's next

- [VM Deployment](../../deploy/self-hosted/vm-deployment.md) — build and run the package you just configured.
- [Cloud.toml reference](./cloudtoml-reference.md) — add Kubernetes and Docker deployment descriptors when you deploy.
- [Configuration management](../config/configuration-management.md) — supply runtime values, override via environment variables, and target per-environment configuration.
