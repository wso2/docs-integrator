---
title: Configuration management
---

# Configuration management

Integration projects typically run across multiple environments — development, staging, and production — each with different endpoints, credentials, and feature flags. WSO2 Integrator uses Ballerina's built-in configuration system to keep these settings out of source code and supply them at runtime.

This guide is the deeper reference for the configuration model. For the fundamentals of using configurable variables, see [Configurations](../integration-artifacts/supporting/configurations.md).

## Configurable variables

A configurable variable is a module-level binding declared with Ballerina's `configurable` keyword. The runtime resolves its value at startup from one of the [configuration value sources](#configuration-value-sources), and the resolved value is accessible across all flows and nodes in your integration project.

In the Visual Designer, configurable variables appear under **Configurations** in the project sidebar. Use the **Add Configurable Variable** panel to declare a new variable — set the name and type, and either provide a default value (optional) or leave it empty (required).

![Configurable Variables panel in WSO2 Integrator showing dbHost, dbPassword, dbPort, requestTimeoutSeconds, and enableCaching variables with their types and current values](/img/develop/design-logic/configurations/configurable-variables-panel.png)

Declare configurables at the module level using the `configurable` keyword. The `?` placeholder marks a variable as required; provide a literal default to make it optional.

```ballerina
// Required -- must be supplied at runtime
configurable string dbHost = ?;
configurable string dbPassword = ?;

// Optional -- uses the declared default if no value is supplied
configurable int dbPort = 3306;
configurable decimal requestTimeoutSeconds = 30.0d;
configurable boolean enableCaching = true;
```

### Supported types

A configurable variable's type must describe plain-data values that the runtime can parse from a configuration source and hold safely for the lifetime of the program.

This covers Ballerina's basic types (nil, boolean, int, float, decimal, string, xml) and structured types built from them (arrays, maps, records, tables). Common examples are shown below.

| Type | Example |
|---|---|
| `int` | `configurable int port = 8080;` |
| `float` | `configurable float threshold = 0.75;` |
| `decimal` | `configurable decimal taxRate = 0.08d;` |
| `string` | `configurable string apiKey = ?;` |
| `boolean` | `configurable boolean debug = false;` |
| Arrays | `configurable string[] allowedOrigins = ["*"];` |
| Maps | `configurable map<string> headers = {};` |
| Records | `configurable DatabaseConfig dbConfig = ?;` |
| Tables | `configurable table key(id) employees = table [];` |

### Structured configuration

When you have many related settings — for example, the host, port, credentials, and pool size for a single database — declaring each one as a separate configurable variable becomes hard to read and easy to mis-wire. Group them into a record type instead, and declare a single configurable variable of that type.

Use the Visual Designer's type creator to define a new record type (or the type picker to select an existing one), then add a configurable variable of that record type the same way as any primitive.

![Configurable Variables panel in WSO2 Integrator showing record-typed configurables orderDb (DatabaseConfig) and crmApi (ApiConfig) expanded into their nested fields](/img/develop/design-logic/configurations/structured-configurable-panel.png)

Define the record type at the module level, then declare a configurable of that type:

```ballerina
type DatabaseConfig record {|
    string host;
    int port = 3306;
    string username;
    string password;
    string database;
    int maxConnections = 10;
|};

type ApiConfig record {|
    string baseUrl;
    string apiKey;
    decimal timeoutSeconds = 30.0d;
    int maxRetries = 3;
|};

configurable DatabaseConfig orderDb = ?;
configurable ApiConfig crmApi = ?;
```

## Configuration value sources

Configurable values can be supplied from several sources. When the same variable is set in more than one place, the runtime resolves it using the first source from the table below (top → bottom, highest to lowest precedence):

| Source | Example | Typical use |
|---|---|---|
| Command-line arguments | `bal run -- -CdbHost=localhost` | One-off overrides, local testing |
| Individual env vars (`BAL_CONFIG_VAR_*`) | `BAL_CONFIG_VAR_DBHOST=localhost` | CI/CD pipelines, containers, secrets |
| Inline TOML (`BAL_CONFIG_DATA`) | `BAL_CONFIG_DATA='dbHost="localhost"'` | Containerized runs without a config file |
| TOML files (`Config.toml` / `BAL_CONFIG_FILES`) | `dbHost = "localhost"` | Per-environment configuration |
| Code defaults | `configurable string dbHost = "localhost";` | Development fallback |

### Config.toml

`Config.toml` is the primary configuration file. Place it in the project root directory (alongside `Ballerina.toml`). The runtime reads it automatically at startup. Values you enter through the Visual Designer's Config Editor are written to this same file.

```toml
# Comments start with #
dbHost = "localhost"
dbPort = 3306
enableCaching = true
maxRetries = 3

# Arrays use square brackets
allowedOrigins = ["https://app.example.com", "https://admin.example.com"]
```

Record-typed configurables map to a `[section]` table, with each record field becoming a key under the section:

```toml
[dbConfig]
host = "db.dev.internal"
port = 3306
username = "app"
password = "dev-secret"
```

For multi-module projects, prefix keys with the fully-qualified module name (`org.package.module`):

```toml
apiPort = 8090

[myorg.myproject.billing]
taxRate = 0.08
currency = "USD"

[myorg.myproject.notifications]
smtpHost = "smtp.example.com"
smtpPort = 587
```

### Environment variables

Override any configurable variable with an environment variable using the pattern `BAL_CONFIG_VAR_`, where `` is the variable name in uppercase:

```bash
export BAL_CONFIG_VAR_DBHOST=db.prod.internal
export BAL_CONFIG_VAR_DBPASSWORD=prod-encrypted-password
bal run
```

`BAL_CONFIG_FILES` plays a different role: instead of supplying a value for a single variable, it tells the runtime which TOML file (or files) to load as the configuration source.

```bash
BAL_CONFIG_FILES=/etc/myapp/config.toml bal run
```

## Per-environment configuration

Most integration projects need different values for development, staging, and production — different hosts, credentials, and feature flags. The recommended pattern is to keep a separate TOML file per environment and select the right one at runtime with `BAL_CONFIG_FILES`. A common layout keeps a default `Config.toml` at the project root for local work, with environment-specific files under a `config/` subdirectory.

```
my-integration/
├── Ballerina.toml
├── Config.toml              # Default / development
├── config/
│   ├── dev.toml
│   ├── staging.toml
│   └── prod.toml
└── main.bal
```

```toml
# config/dev.toml
dbHost = "localhost"
dbPort = 3306
dbUser = "root"
dbPassword = "dev-password"
dbName = "orders_dev"
crmBaseUrl = "https://sandbox.crm.example.com"
enableCaching = false
logLevel = "DEBUG"
```

```toml
# config/prod.toml
dbHost = "db.prod.internal"
dbPort = 3306
dbUser = "app_user"
dbPassword = "prod-encrypted-password"
dbName = "orders"
crmBaseUrl = "https://api.crm.example.com"
enableCaching = true
logLevel = "WARN"
```

```bash
BAL_CONFIG_FILES=config/dev.toml bal run
BAL_CONFIG_FILES=config/prod.toml bal run
```

Never commit secret-bearing configuration files to version control. For production credential handling, secret managers, and TLS configuration, see [Secrets and encryption](../../deploy-operate/secure/secrets-encryption.md).

## What's next

- [Configurations](../integration-artifacts/supporting/configurations.md) — Declare configurable variables and supply values through the visual designer.
- [Secrets and encryption](../../deploy-operate/secure/secrets-encryption.md) — Securely supply credentials and protect data in transit and at rest.
- [Connections](managing-connections.md) — Use configurable variables to parameterize connections.
