---
title: VM Deployment
description: Deploy WSO2 Integrator projects as standalone JAR files on virtual machines for self-hosted production deployments.
keywords: [wso2 integrator, bal run, vm deployment, jar deployment, ballerina cli]
slug: /deploy-and-run/self-hosted/vm-deployment
sidebar_position: 2
---

# VM Deployment

This page explains how to run WSO2 Integrator projects as standalone JAR files on virtual machines for self-hosted production deployments.

:::info Prerequisites
- [Ballerina installed](https://ballerina.io/downloads/) on any machine where you want to run the project
- A WSO2 Integrator project based on Ballerina
- For production VM deployments: Java Runtime (JDK 21 or later)
:::

## Deploy with executable JAR

For production VM deployments, WSO2 Integrator projects compile to executable JAR files that run on any JVM. This approach gives you full control over the runtime environment and is ideal for traditional VM-based infrastructure.

### Prerequisites for JAR deployment

| Requirement | Details |
|-------------|---------|
| Java Runtime | JDK 21 or later |
| Operating System | Linux (recommended), macOS, or Windows |
| Memory | Minimum 512 MB, recommended 1 GB+ per instance |
| Ballerina | Distribution installed on the build machine |

### Build the executable JAR

Use the `bal build` command to produce a standalone executable JAR.

```bash
bal build
```

This generates a fat JAR in the `target/bin/` directory:

```bash
target/
  bin/
    my_integration.jar
```

Run it directly:

```bash
java -jar target/bin/my_integration.jar
```

### Build options

| Flag | Description |
|------|-------------|
| `--cloud=docker` | Also generate Docker artifacts |
| `--graalvm` | Build a GraalVM native image |
| `--observability-included` | Bundle observability dependencies |
| `-DskipTests` | Skip test execution during build |

### Transfer the JAR to your VM

```bash
scp target/bin/my_integration.jar user@production-vm:/opt/integrations/
```

### Configure the runtime

Create a `Config.toml` in the same directory as the JAR (or set the `BAL_CONFIG_FILES` environment variable):

```toml
[myIntegration.http]
port = 9090

[myIntegration.db]
host = "db.internal.example.com"
port = 5432
username = "svc_user"
password = "encrypted:xxxxx"
```

### Start the integration

```bash
java -jar my_integration.jar
```

For production deployments with JVM tuning:

```bash
java \
  -Xms512m \
  -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/var/log/integrations/ \
  -Dballerina.observability.enabled=true \
  -jar my_integration.jar
```

### Verify the deployment

```bash
curl http://localhost:9090/health
```

## Run on a VM from source

To run the project on a remote virtual machine, install the Ballerina distribution on the VM and run the project directly from source using `bal run`.

### Step 1: Push the project to a remote Git repository

From your local machine, push the project to a remote Git repository such as GitHub, GitLab, or Bitbucket.

```bash
git add .
git commit -m "Initial integration project"
git push origin main
```

### Step 2: Clone the repository on the VM

SSH into the target VM and clone the repository.

```bash
git clone https://github.com/your-org/my-integration.git
cd my-integration
```

### Step 3: Start the integration

Run the project using the Ballerina CLI.

```bash
bal run
```

The runtime starts and the integration begins serving traffic on the configured port.

:::note
Ballerina must be installed on the VM. Download it from [ballerina.io](https://ballerina.io/downloads/). The version on the VM should match the version used during development.
:::

## Consolidated package deployment

For organizations running multiple integrations, a consolidated deployment bundles several integration packages into a single runtime.

### Creating a consolidated package

1. Create a consolidation project:

```bash
bal new consolidated_deploy -t lib
```

2. Add each integration as a dependency in `Ballerina.toml`:

```toml
[package]
org = "myorg"
name = "consolidated_deploy"
version = "1.0.0"

[[dependency]]
org = "myorg"
name = "order_service"
version = "1.2.0"

[[dependency]]
org = "myorg"
name = "inventory_sync"
version = "1.0.3"

[[dependency]]
org = "myorg"
name = "notification_handler"
version = "2.1.0"
```

3. Build the consolidated JAR:

```bash
bal build
```

### Running the consolidated package

```bash
java -jar target/bin/consolidated_deploy.jar
```

All services start within the same JVM process, sharing resources.

### Consolidated Config.toml

Provide configuration for all included integrations in a single file:

```toml
# Order Service configuration
[order_service.http]
port = 9091

[order_service.db]
host = "db.internal.example.com"

# Inventory Sync configuration
[inventory_sync.schedule]
cronExpression = "0 */5 * * * ?"

[inventory_sync.endpoint]
url = "https://erp.example.com/api"

# Notification Handler configuration
[notification_handler.email]
smtpHost = "smtp.example.com"
smtpPort = 587
```

## JVM tuning for production

Recommended JVM flags for production deployments:

```bash
java \
  -Xms512m \
  -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/var/log/integrations/ \
  -Dballerina.observability.enabled=true \
  -jar my_integration.jar
```

| JVM Flag | Purpose |
|----------|---------|
| `-Xms` / `-Xmx` | Initial and maximum heap size |
| `-XX:+UseG1GC` | Use the G1 garbage collector (recommended) |
| `-XX:MaxGCPauseMillis` | Target max GC pause time |
| `-XX:+HeapDumpOnOutOfMemoryError` | Generate heap dump on OOM |

## Log management

Configure logging in `Config.toml`:

```toml
[ballerina.log]
level = "INFO"

[[ballerina.log.destinations]]
path = "./logs/app.log"
```

## Health checks and monitoring

Expose a health endpoint for load balancers and monitoring systems:

```ballerina
import ballerina/http;

service /health on new http:Listener(9091) {
    resource function get .() returns http:Ok {
        return http:OK;
    }
}
```

## Run on Amazon EC2

If the integration uses AWS connectors, don't copy access keys to the instance. Attach an **instance profile** that contains an IAM role with the permissions the connectors need, and configure the connectors with `auth:DEFAULT_CREDENTIALS`:

```bash
aws ec2 associate-iam-instance-profile \
  --instance-id <instance-id> \
  --iam-instance-profile Name=my-integration-profile
```

The connectors then read temporary credentials from the instance metadata service and refresh them automatically. See [Access AWS Services Securely](../secure/aws-access.md).

:::note
If the integration runs in a container on the instance and IMDSv2 is enforced, set the metadata hop limit to `2`. Otherwise the container cannot reach the metadata service:

```bash
aws ec2 modify-instance-metadata-options \
  --instance-id <instance-id> \
  --http-put-response-hop-limit 2 \
  --http-tokens required
```
:::

:::warning
The instance profile is shared by everything on the instance. With the hop limit at `2`, any container that can reach the metadata service, not just the integration, can get the role's credentials. Run the integration on an instance dedicated to it. If other containers must share the instance, run them on Amazon ECS with a separate task role for each, and block their access to the metadata service. For strict isolation, use AWS Fargate. See the [Amazon EC2 instance configuration for ECS task roles](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#task-iam-role-considerations) in the AWS documentation.
:::

## What's next

- [Containerized Deployment](containerized-deployment.md) — Deploy your project to Docker, Kubernetes, or Red Hat OpenShift using Code to Cloud
- [Managing Configurations](../managing-configurations.md) — Per-environment configuration strategies
- [Scaling & High Availability](../scaling-high-availability.md) — Run multiple instances behind a load balancer
- [GraalVM Native Images](graalvm-native-images.md) — Compile to native binaries for faster startup
- [WSO2 Integrator on AWS](../../aws.md) — Everything WSO2 Integrator offers on AWS
