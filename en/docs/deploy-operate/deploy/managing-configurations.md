---
sidebar_position: 11
title: Managing Configurations
description: Manage configurations across environments with per-environment files, environment variables, and consolidated config.
---

# Managing Configurations

WSO2 Integrator uses Ballerina's configuration system to externalize runtime settings. This page covers strategies for managing configurations across development, testing, staging, and production environments.

## Configuration sources

Ballerina resolves configuration values from multiple sources, with the following precedence (highest first):

| Priority | Source | Example |
|----------|--------|---------|
| 1 | Environment variables | `BAL_CONFIG_VAR_PORT=9090` |
| 2 | Command-line arguments | `-Cport=9090` |
| 3 | `BAL_CONFIG_FILES` | `BAL_CONFIG_FILES=prod.toml` |
| 4 | `BAL_CONFIG_DATA` | `BAL_CONFIG_DATA='port=9090'` |
| 5 | `Config.toml` (default file) | `port = 9090` |
| 6 | Default values in code | `configurable int port = 8080;` |

When both `BAL_CONFIG_FILES` and `BAL_CONFIG_DATA` are set, `BAL_CONFIG_FILES` takes precedence. The default `Config.toml` in the current directory is only used when neither `BAL_CONFIG_FILES` nor `BAL_CONFIG_DATA` is specified.

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

Use the `BAL_CONFIG_FILES` environment variable to specify one or more configuration files:

**Linux/macOS (colon-separated):**
```bash
# Single config file
export BAL_CONFIG_FILES=config/prod/Config.toml
bal run

# Multiple config files (merged in order, later files override earlier)
export BAL_CONFIG_FILES=config/base/Config.toml:config/prod/Config.toml
java -jar my_integration.jar
```

**Windows (semicolon-separated):**
```cmd
REM Single config file
set BAL_CONFIG_FILES=config\prod\Config.toml
bal run

REM Multiple config files
set BAL_CONFIG_FILES=config\base\Config.toml;config\prod\Config.toml
java -jar my_integration.jar
```

:::note
Once `BAL_CONFIG_FILES` is set, the default `Config.toml` in the current directory is ignored unless explicitly included in the path.
:::

### Using BAL_CONFIG_DATA

Provide TOML configuration directly as an environment variable:

```bash
export BAL_CONFIG_DATA='port=9090
dbHost="prod-db.example.com"
[logging]
level="INFO"'

java -jar my_integration.jar
```

This is useful in containerized environments where mounting config files is not convenient.

## Command-line arguments

Override specific configuration values using the `-C` flag:

```bash
# Single value
bal run -- -Cport=9090

# Multiple values
bal run -- -Cport=9090 -CdbHost=localhost -CdbName=orders

# For JAR files
java -jar my_integration.jar -Cport=9090 -CdbPassword=secret
```

Command-line arguments have higher priority than TOML files but lower priority than environment variables.

## Environment variable overrides

Override any configurable value using environment variables with the naming convention:

```
BAL_CONFIG_VAR_<VARIABLE_NAME>
```

**Key rules:**
- All characters must be **UPPERCASE**
- Variable names from code are uppercased (e.g., `port` → `PORT`, `dbHost` → `DBHOST`)
- Underscores in variable names are preserved (e.g., `db_host` → `DB_HOST`)

### Platform-specific syntax

**Linux/macOS:**
```bash
export BAL_CONFIG_VAR_PORT=9090
bal run
```

**Windows:**
```cmd
set BAL_CONFIG_VAR_PORT=9090
bal run
```

### Examples by data type

```ballerina
configurable int port = 8080;
configurable boolean isAdmin = false;
configurable float maxPayload = 1.0;
configurable string dbPassword = ?;
```

```bash
export BAL_CONFIG_VAR_PORT=9090
export BAL_CONFIG_VAR_ISADMIN=true
export BAL_CONFIG_VAR_MAXPAYLOAD=2.5
export BAL_CONFIG_VAR_DBPASSWORD="s3cur3p@ss"
java -jar my_integration.jar
```

### Module-level configurables

For configurables defined in separate modules, the environment variable includes the full module path. Given a project structure:

```
my_integration/
  ├── main.bal
  └── modules/
      └── database/
          └── database.bal
```

If `modules/database/database.bal` contains:

```ballerina
configurable string db_host = "localhost";
configurable int db_port = 5432;
```

And your `Config.toml` organizes them as:

```toml
[my_integration.database]
db_host = "prod-db.example.com"
db_port = 3306
```

The environment variables are:

```bash
export BAL_CONFIG_VAR_MY_INTEGRATION_DATABASE_DB_HOST="env-db.example.com"
export BAL_CONFIG_VAR_MY_INTEGRATION_DATABASE_DB_PORT=5432
java -jar my_integration.jar
```

**Pattern:** `BAL_CONFIG_VAR_<PACKAGE>_<MODULE>_<VARIABLE>` with all dots converted to underscores and all characters uppercase.

### Supported types and limitations

:::note
**Supported types for environment variables:**
- Simple types: `int`, `byte`, `float`, `boolean`, `string`, `decimal`, `enum`, `xml`
- Values must be in the `toString()` representation of the type

**Not supported:**
- Record types
- Array types
- Map types
- Complex structured data

For structured configuration using TOML sections with record types, use `BAL_CONFIG_FILES` or `BAL_CONFIG_DATA` instead of individual environment variables.
:::

### Configuration precedence in practice

Example demonstrating the complete precedence order:

```ballerina
configurable int port = 8080;  // Priority 6: Default value
```

```toml
# Config.toml (Priority 5: Default file)
port = 9090
```

```bash
# Priority 4: BAL_CONFIG_DATA
export BAL_CONFIG_DATA='port=7777'

# Priority 3: BAL_CONFIG_FILES (overrides BAL_CONFIG_DATA)
export BAL_CONFIG_FILES=custom.toml  # contains port=6666

# Priority 2: Command-line (overrides BAL_CONFIG_FILES)
java -jar app.jar -Cport=5555

# Priority 1: Environment variable (HIGHEST - overrides everything)
export BAL_CONFIG_VAR_PORT=4444
```

**Result:** `port = 4444` (environment variable wins)

**Precedence cascade:**
- If `BAL_CONFIG_VAR_PORT` not set → uses command-line value `5555`
- If no command-line → uses `BAL_CONFIG_FILES` value `6666`
- If no `BAL_CONFIG_FILES` → uses `BAL_CONFIG_DATA` value `7777`
- If no `BAL_CONFIG_DATA` → uses `Config.toml` value `9090`
- If no `Config.toml` → uses default value `8080`

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
  BAL_CONFIG_VAR_DBPASSWORD: "s3cur3p@ss"
  BAL_CONFIG_VAR_APIKEY: "ak_xxxxxxxxxxxxx"
```

For module-level variables like `[database].password`, use the full path:

```yaml
stringData:
  BAL_CONFIG_VAR_MY_INTEGRATION_DATABASE_PASSWORD: "s3cur3p@ss"
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

- [Secrets & Encryption](../secure/secrets-encryption.md) -- Advanced secrets management with Vault
- [Containerized Deployment](../../deploy/self-hosted/containerized-deployment.md) -- ConfigMap and Secret patterns for Docker, Kubernetes, and OpenShift
