---
title: Managing Configurations
---

# Managing Configurations

WSO2 Integrator uses Ballerina's configuration system to externalize runtime settings. This page covers strategies for managing configurations across development, testing, staging, and production environments.

## Configuration sources

Ballerina resolves configuration values from multiple sources, with the following precedence (highest first):

| Priority | Source | Example |
|----------|--------|---------|
| 1 | Command-line arguments | `--myModule.port=9090` |
| 2 | Environment variables | `BAL_MY_MODULE_PORT=9090` |
| 3 | `Config.toml` file(s) | `[myModule] port = 9090` |
| 4 | Default values in code | `configurable int port = 8080;` |

## Defining configurable values

Declare configurable variables in your Ballerina code:

```ballerina
configurable int port = 8080;
configurable string dbHost = "localhost";
configurable string dbName = "orders";
configurable string dbUser = ?;     // Required -- no default
configurable string dbPassword = ?; // Required -- no default
```

## Per-Environment config files

### Directory structure

Organize configuration files by environment:

```
my-integration/
  src/
    main.bal
  Ballerina.toml
  Config.toml           # Default / local development
  config/
    dev/
      Config.toml       # Development environment
    test/
      Config.toml       # Test environment
    staging/
      Config.toml       # Staging environment
    prod/
      Config.toml       # Production environment
```

### Development config

`config/dev/Config.toml`:

```toml
port = 9090

[db]
host = "dev-db.internal.example.com"
name = "orders_dev"
user = "dev_user"
password = "dev_password"

[logging]
level = "DEBUG"
```

### Production config

`config/prod/Config.toml`:

```toml
port = 9090

[db]
host = "prod-db.internal.example.com"
name = "orders"
user = "svc_orders"
password = "encrypted:xxxxxx"

[logging]
level = "INFO"
```

### Selecting the config file at runtime

Use the `BAL_CONFIG_FILES` environment variable:

```bash
# Use dev config
BAL_CONFIG_FILES=config/dev/Config.toml bal run

# Use production config
BAL_CONFIG_FILES=config/prod/Config.toml java -jar my_integration.jar
```

Supply multiple config files (merged in order, later files override earlier):

```bash
BAL_CONFIG_FILES=config/base/Config.toml:config/prod/Config.toml java -jar my_integration.jar
```

## Environment variable overrides

Override any configurable value using environment variables. The naming convention is:

```
BAL__ (all uppercase, dots replaced with underscores)
```

```bash
export BAL_DB_HOST="prod-db.internal.example.com"
export BAL_DB_PASSWORD="s3cur3p@ss"
java -jar my_integration.jar
```

This is useful for container orchestrators and CI/CD pipelines.

## Kubernetes ConfigMaps and secrets

### ConfigMap for Non-Sensitive values

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: integration-config
data:
  Config.toml: |
    port = 9090

    [db]
    host = "db.internal.svc.cluster.local"
    name = "orders"
    user = "svc_orders"

    [logging]
    level = "INFO"
```

### Secret for sensitive values

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: integration-secrets
type: Opaque
stringData:
  BAL_DB_PASSWORD: "s3cur3p@ss"
  BAL_API_KEY: "ak_xxxxxxxxxxxxx"
```

### Mount in deployment

```yaml
containers:
  - name: integration
    image: myorg/my-integration:1.0.0
    env:
      - name: BAL_CONFIG_FILES
        value: /config/Config.toml
    envFrom:
      - secretRef:
          name: integration-secrets
    volumeMounts:
      - name: config-volume
        mountPath: /config
volumes:
  - name: config-volume
    configMap:
      name: integration-config
```

## Consolidated Multi-Service configuration

When running multiple integrations in a consolidated package, namespace each service's config:

```toml
# Shared settings
[http]
maxConnections = 100

# Order Service
[order_service.db]
host = "db.internal.example.com"
name = "orders"

[order_service.http]
port = 9091

# Inventory Service
[inventory_service.db]
host = "db.internal.example.com"
name = "inventory"

[inventory_service.http]
port = 9092

# Notification Service
[notification_service.smtp]
host = "smtp.example.com"
port = 587
```

## Configuration encryption

Encrypt sensitive values in `Config.toml`:

```bash
bal encrypt
Enter value: <type the secret>
Enter secret: <type the encryption key>
Encrypted value: encrypted:aBcDeFgHiJkLmNoPqRsTuV==
```

Use the encrypted value in `Config.toml`:

```toml
[db]
password = "encrypted:aBcDeFgHiJkLmNoPqRsTuV=="
```

At runtime, provide the decryption key:

```bash
BAL_CONFIG_SECRET_KEY=my-secret-key java -jar my_integration.jar
```

## Configuration validation

Ballerina validates configurations at startup. If a required configurable has no value, the application fails to start with a clear error:

```
error: value not provided for required configurable variable 'dbPassword'
```

Use constrained types to enforce valid values:

```ballerina
configurable int port = 8080;    // Must be an integer
configurable string dbHost = ?;  // Required string
configurable "DEBUG"|"INFO"|"WARN"|"ERROR" logLevel = "INFO"; // Enum constraint
```

## Best practices

| Practice | Description |
|----------|-------------|
| Never commit secrets | Keep `Config.toml` with secrets out of version control |
| Use `.gitignore` | Add `config/prod/Config.toml` to `.gitignore` |
| Validate early | Use required configurables (`= ?`) for mandatory settings |
| Layer configs | Use base + environment-specific files for DRY configuration |
| Prefer env vars for secrets | Use environment variables for passwords and API keys in CI/CD |

## What's next

- [Environments](environments.md) -- Manage Dev, Test, and Prod promotion workflows
- [Secrets & Encryption](../secure/secrets-encryption.md) -- Advanced secrets management with Vault
- [Docker](../../deploy/self-hosted/docker.md) and [Kubernetes](../../deploy/self-hosted/kubernetes.md) -- ConfigMap and Secret patterns for Kubernetes
