---
title: Config.toml Reference
---

# Config.toml Reference

`Config.toml` provides runtime values for `configurable` variables declared in Ballerina source code. Place this file in the working directory where you run `bal run`, or specify one or more config files via the `BAL_CONFIG_FILES` environment variable. Ballerina uses a TOML v0.4-compatible syntax with module-qualified keys to map configuration values to their corresponding `configurable` declarations.

## How configurable variables work

Declare a variable with the `configurable` keyword in Ballerina source code. Variables with a default value are optional; variables with `?` are required and the program will not start if no value is supplied.

```ballerina
configurable int port = 8080;        // optional — has a default
configurable string hostname = "localhost";
configurable string dbUrl = ?;       // required — must be set in Config.toml
```

Supply values in `Config.toml` using the same variable names:

```toml
port = 9090
hostname = "api.example.com"
dbUrl = "jdbc:mysql://db.example.com:3306/orders"
```

## Module-qualified names

When configurable variables are in non-root modules or external packages, use TOML table headers to specify the module context.

### Root module

Variables in the root module of the current package need no qualifier. They map directly to top-level TOML keys.

```ballerina
// main.bal — root module
configurable int port = 8080;
configurable string hostname = "localhost";
configurable boolean enableSSL = false;
```

```toml
port = 9090
hostname = "api.example.com"
enableSSL = true
```

### Non-root module (same package)

Variables in a sub-module use the module name as the TOML table header.

```ballerina
// modules/db/db.bal — module mypackage.db
configurable string dbHost = ?;
configurable int dbPort = 3306;
```

```toml
[mypackage.db]
dbHost = "db.example.com"
dbPort = 5432
```

### External package

Variables declared as `configurable` in a dependency use the `org-name.package-name` (or `org-name.package-name.module-name`) qualifier.

```toml
[ballerinax.mysql]
host = "db.example.com"
port = 3306
user = "admin"
```

For ICP runtime bridge configuration (the `wso2/icp.runtime.bridge` package used when connecting to ICP):

```toml
[wso2.icp.runtime.bridge]
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime     = "my-integration-1"
secret      = "<generated-secret>"
```

## Supported types

Each subsection below shows the Ballerina `configurable` declaration followed by the corresponding `Config.toml` entry.

### Primitive types

Ballerina primitive types map directly to TOML scalar values.

```ballerina
configurable boolean enableSSL = false;
configurable int port = 8080;
configurable byte maxRetries = 3;
configurable float timeout = 30.5;
configurable decimal taxRate = 0.08d;
configurable string hostname = "localhost";
configurable xml template = xml `<greeting>Hello</greeting>`;
```

```toml
enableSSL  = true
port       = 9090
maxRetries = 5
timeout    = 60.0
taxRate    = 0.15
hostname   = "api.example.com"
template   = "<greeting>Hello</greeting>"
```

### Enum types

Define the enum as a union of string literals in Ballerina. The TOML value must exactly match one of the members.

```ballerina
type LogLevel "DEBUG"|"INFO"|"WARN"|"ERROR";
type Environment "dev"|"staging"|"prod";

configurable LogLevel logLevel = "INFO";
configurable Environment environment = "dev";
```

```toml
logLevel    = "WARN"
environment = "prod"
```

### Arrays

Configurable arrays of primitives use TOML inline arrays.

```ballerina
configurable string[] allowedOrigins = [];
configurable int[] retryIntervals = [];
configurable boolean[] featureFlags = [];
```

```toml
allowedOrigins = ["https://app.example.com", "https://admin.example.com"]
retryIntervals = [1, 2, 5, 10]
featureFlags   = [true, false, true]
```

### Records

Configurable `record` types map to TOML tables.

```ballerina
type DatabaseConfig record {|
    string host;
    int port;
    string user;
    string password;
    string database;
|};

configurable DatabaseConfig dbConfig = ?;
```

```toml
[dbConfig]
host     = "db.example.com"
port     = 3306
user     = "admin"
password = "secret"
database = "orders"
```

### Nested records

Nested records use dot-separated TOML table headers.

```ballerina
type SSLConfig record {|
    string certPath;
    string keyPath;
|};

type ServerConfig record {|
    int port;
    SSLConfig ssl;
|};

configurable ServerConfig server = ?;
```

```toml
[server]
port = 443

[server.ssl]
certPath = "/certs/server.crt"
keyPath  = "/certs/server.key"
```

### Array of records

Configurable arrays of records use TOML array-of-tables syntax (`[[...]]`).

```ballerina
type Endpoint record {|
    string name;
    string url;
    int timeout;
|};

configurable Endpoint[] endpoints = ?;
```

```toml
[[endpoints]]
name    = "orders"
url     = "https://orders.example.com"
timeout = 30

[[endpoints]]
name    = "inventory"
url     = "https://inventory.example.com"
timeout = 15
```

### Maps

Configurable `map` types use TOML tables where each key-value pair becomes a map entry.

```ballerina
configurable map<string> headers = ?;
```

```toml
[headers]
"Content-Type" = "application/json"
"X-API-Key"    = "abc123"
Authorization  = "Bearer token"
```

### Tables

Configurable `table` types use TOML array-of-tables. Each `[[...]]` entry becomes one row, with the key field acting as the primary key.

```ballerina
type Employee record {|
    readonly int id;
    string name;
    string department;
|};

configurable table key(id) employees = ?;
```

```toml
[[employees]]
id         = 1
name       = "Alice"
department = "Engineering"

[[employees]]
id         = 2
name       = "Bob"
department = "Marketing"
```

## Precedence rules

When the same configurable variable is set through multiple sources, the following order applies. Priority 1 wins over priority 6.

| Priority | Source | Example |
|----------|--------|---------|
| 1 (highest) | `BAL_CONFIG_VAR_*` variables | `BAL_CONFIG_VAR_PORT=9090` |
| 2 | Command-line arguments | `bal run -- -Cport=9090` |
| 3 | `BAL_CONFIG_DATA` | `BAL_CONFIG_DATA='port=9090'` |
| 4 | Config files via `BAL_CONFIG_FILES` | `/app/Config.toml` |
| 5 | Default `Config.toml` in working directory | `./Config.toml` |
| 6 (lowest) | Default values in source code | `configurable int port = 8080;` |

## Sensitive data

Avoid placing secrets (passwords, API keys, tokens) in `Config.toml` files that are committed to version control. Instead, use a separate TOML file for secrets and prioritize it via `BAL_CONFIG_FILES`:

```bash
export BAL_CONFIG_FILES="/run/secrets/secret-config.toml:/app/Config.toml"
```

In Kubernetes, mount secrets as files and reference them through the `BAL_CONFIG_FILES` variable or `Cloud.toml`'s `[[cloud.config.secrets]]` section.

## Complete example

```toml
# Root module variables
port      = 9090
hostname  = "api.example.com"
enableSSL = true

# Sub-module configuration
[myapp.db]
host     = "db.example.com"
port     = 5432
user     = "app_user"
password = "secure_password"
database = "orders_db"

# External package configuration
[ballerinax.mysql]
host = "db.example.com"
port = 3306

# Array of endpoint records
[[endpoints]]
name    = "orders"
url     = "https://orders.example.com"
timeout = 30

[[endpoints]]
name    = "payments"
url     = "https://payments.example.com"
timeout = 60

# Custom headers map
[headers]
"Content-Type" = "application/json"
"X-Request-ID" = "auto"
```

## What's next

- [Ballerina.toml reference](ballerinatoml-reference.md) — configure package metadata, build options, and dependencies
- [Cloud.toml reference](cloudtoml-reference.md) — configure Kubernetes and Docker deployment descriptors
- [Environment variables](environment-variables.md) — set configuration values and override Config.toml at runtime
