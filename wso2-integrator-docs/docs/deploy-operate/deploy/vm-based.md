---
sidebar_position: 7
title: VM-Based Deployment
description: Deploy integrations as standalone JAR files or centralized consolidated packages on virtual machines.
---

# VM-Based Deployment

WSO2 Integrator projects compile to executable JAR files that run on any JVM, making virtual machines a straightforward deployment target. You can deploy as standalone JARs for individual services or use consolidated packages to run multiple integrations from a single runtime.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Java Runtime | JDK 17 or later |
| Operating System | Linux (recommended), macOS, or Windows |
| Memory | Minimum 512 MB, recommended 1 GB+ per instance |
| Ballerina | Distribution installed on the build machine |

## Building the Executable JAR

Use the `bal build` command to produce a standalone executable JAR.

```bash
bal build
```

This generates a fat JAR in the `target/bin/` directory:

```
target/
  bin/
    my_integration.jar
```

Run it directly:

```bash
java -jar target/bin/my_integration.jar
```

### Build Options

| Flag | Description |
|------|-------------|
| `--cloud=docker` | Also generate Docker artifacts |
| `--graalvm` | Build a GraalVM native image |
| `--observability-included` | Bundle observability dependencies |
| `-DskipTests` | Skip test execution during build |

## Standalone JAR Deployment

The simplest approach is to copy the JAR to the target VM and run it.

### Step 1 -- Transfer the JAR

```bash
scp target/bin/my_integration.jar user@production-vm:/opt/integrations/
```

### Step 2 -- Configure the Runtime

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

### Step 3 -- Run as a systemd Service

Create a systemd unit file at `/etc/systemd/system/my-integration.service`:

```ini
[Unit]
Description=WSO2 Integration Service
After=network.target

[Service]
Type=simple
User=ballerina
Group=ballerina
WorkingDirectory=/opt/integrations
ExecStart=/usr/bin/java -Xms256m -Xmx512m -jar my_integration.jar
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal
Environment=BAL_CONFIG_FILES=/opt/integrations/Config.toml

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable my-integration
sudo systemctl start my-integration
sudo systemctl status my-integration
```

### Step 4 -- Verify the Deployment

```bash
curl http://localhost:9090/health
```

## Consolidated Package Deployment

For organizations running multiple integrations, a consolidated deployment bundles several integration packages into a single runtime.

### Creating a Consolidated Package

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

### Running the Consolidated Package

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

## JVM Tuning for Production

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

## Log Management

Direct logs to files with rotation:

```bash
java -jar my_integration.jar 2>&1 | tee -a /var/log/integrations/my_integration.log
```

Or configure logging in `Config.toml`:

```toml
[ballerina.log]
level = "INFO"
```

## Health Checks and Monitoring

Expose a health endpoint for load balancers and monitoring systems:

```ballerina
import ballerina/http;

service /health on new http:Listener(9091) {
    resource function get .() returns http:Ok {
        return http:OK;
    }
}
```

## What's Next

- [Managing Configurations](managing-configurations.md) -- Per-environment configuration strategies
- [Scaling & High Availability](scaling-ha.md) -- Run multiple instances behind a load balancer
- [GraalVM Native Images](graalvm.md) -- Compile to native binaries for faster startup
