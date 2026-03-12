---
sidebar_position: 7
title: Configuration Management
description: Externalize integration settings with configurable variables and Config.toml for environment-specific deployments.
---

# Configuration Management

Integration projects typically run in multiple environments -- development, staging, and production -- each with different database endpoints, API keys, and feature flags. WSO2 Integrator uses Ballerina's built-in configuration system to separate settings from code. You declare configurable variables in your source, provide values in a `Config.toml` file (or environment variables), and the runtime injects them at startup.

## Configurable Variables

Declare a configurable variable with the `configurable` keyword at the module level. The runtime resolves each variable from configuration sources before your code executes.

```ballerina
import ballerina/http;
import ballerina/log;

// Required -- no default, must be supplied via Config.toml or env var
configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

// Optional -- has a default value
configurable int dbPort = 3306;
configurable int maxRetries = 3;
configurable decimal requestTimeoutSeconds = 30.0d;
configurable boolean enableCaching = true;
```

If a required variable (one initialized with `?`) is missing at startup, the program exits with a clear error message.

### Supported Types

Configurable variables support the following types:

| Type | Example |
|---|---|
| `int` | `configurable int port = 8080;` |
| `float` | `configurable float threshold = 0.75;` |
| `decimal` | `configurable decimal taxRate = 0.08d;` |
| `string` | `configurable string apiKey = ?;` |
| `boolean` | `configurable boolean debug = false;` |
| `int[]`, `string[]` | `configurable string[] allowedOrigins = ["*"];` |
| `map<string>` | `configurable map<string> headers = {};` |
| Records | `configurable DatabaseConfig dbConfig = ?;` |
| Tables | `configurable table<Employee> key(id) employees = table [];` |

### Record-Typed Configuration

Group related settings into a record type for cleaner organization:

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

Provide values in `Config.toml`:

```toml
[orderDb]
host = "db.dev.internal"
port = 3306
username = "app"
password = "dev-secret"
database = "orders_dev"
maxConnections = 5

[crmApi]
baseUrl = "https://sandbox.crm.example.com"
apiKey = "dev-key-123"
timeoutSeconds = 15.0
```

## Config.toml

`Config.toml` is the primary configuration file. Place it in the project root directory (alongside `Ballerina.toml`). The runtime reads it automatically at startup.

### Basic Structure

```toml
# Simple key-value pairs
dbHost = "localhost"
dbPort = 3306
dbUser = "root"
dbPassword = "dev-password"
enableCaching = true
maxRetries = 3

# Array values
allowedOrigins = ["https://app.example.com", "https://admin.example.com"]

# Record (table) values
[orderDb]
host = "localhost"
port = 3306
username = "root"
password = "dev-password"
database = "orders_dev"
```

### Module-Qualified Keys

For multi-module projects, prefix keys with the module name:

```toml
# Root module variables
apiPort = 8090

# Variables in the 'billing' module
[myorg.myproject.billing]
taxRate = 0.08
currency = "USD"

# Variables in the 'notifications' module
[myorg.myproject.notifications]
smtpHost = "smtp.example.com"
smtpPort = 587
```

### Table-Typed Configuration

```ballerina
type Endpoint record {|
    readonly string name;
    string url;
    int timeoutSeconds;
|};

configurable table<Endpoint> key(name) endpoints = table [];
```

```toml
[[endpoints]]
name = "crm"
url = "https://crm.example.com/api"
timeoutSeconds = 30

[[endpoints]]
name = "erp"
url = "https://erp.example.com/api"
timeoutSeconds = 60
```

## Environment Variables

Override any configurable variable with an environment variable. Ballerina maps variable names using the pattern `BAL_CONFIG_VAR_<name>`:

```bash
# Override simple variables
export BAL_CONFIG_VAR_dbHost=db.prod.internal
export BAL_CONFIG_VAR_dbPassword=prod-encrypted-password

# Run the integration
bal run
```

You can also point to an alternative Config.toml file:

```bash
# Use a different config file
BAL_CONFIG_FILES=/etc/myapp/config.toml bal run
```

### Priority Order

When the same variable is defined in multiple sources, the following precedence applies (highest to lowest):

1. **Command-line arguments** -- `-Ckey=value`
2. **Environment variables** -- `BAL_CONFIG_VAR_<name>`
3. **Config.toml** -- file-based values
4. **Default values** -- declared in code

## Per-Environment Configuration

Maintain separate Config.toml files for each environment and select the appropriate one at deployment time.

### Project Structure

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

### Development Configuration

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

### Production Configuration

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

### Selecting a Configuration at Runtime

```bash
# Development
BAL_CONFIG_FILES=config/dev.toml bal run

# Staging
BAL_CONFIG_FILES=config/staging.toml bal run

# Production
BAL_CONFIG_FILES=config/prod.toml bal run
```

## Secrets Management

Never store secrets in plain text in `Config.toml` files committed to version control. Instead, use one of these approaches:

### Environment Variables for Secrets

```ballerina
// Declare as required with no default
configurable string dbPassword = ?;
configurable string apiSecret = ?;
```

```bash
# Inject secrets at runtime
export BAL_CONFIG_VAR_dbPassword="$(vault read -field=password secret/db)"
export BAL_CONFIG_VAR_apiSecret="$(vault read -field=key secret/api)"
bal run
```

### Separate Secrets File

Keep secrets in a file excluded from version control:

```
my-integration/
├── Config.toml          # Non-sensitive config (committed)
├── secrets.toml         # Sensitive config (gitignored)
└── .gitignore           # Contains: secrets.toml
```

```bash
# Load both files
BAL_CONFIG_FILES=Config.toml:secrets.toml bal run
```

## Complete Example

Here is a full integration that uses configurable variables for all external dependencies:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerinax/mysql;

// -- Configuration --
configurable string dbHost = ?;
configurable int dbPort = 3306;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

configurable string crmBaseUrl = ?;
configurable string crmApiKey = ?;

configurable int servicePort = 8090;
configurable boolean enableRequestLogging = false;

// -- Connections (use configurable values) --
final mysql:Client orderDb = check new (
    host = dbHost, port = dbPort,
    user = dbUser, password = dbPassword,
    database = dbName
);

final http:Client crmClient = check new (crmBaseUrl, {
    httpVersion: http:HTTP_1_1,
    customHeaders: {"X-API-Key": crmApiKey}
});

// -- Service --
service /api on new http:Listener(servicePort) {

    resource function get orders() returns json|error {
        if enableRequestLogging {
            log:printInfo("GET /api/orders");
        }
        stream<record {}, error?> resultStream = orderDb->query(`SELECT * FROM orders`);
        return resultStream.toArray();
    }
}
```

## What's Next

- [Functions](functions.md) -- Organize configurable logic into reusable functions
- [Connections](connections.md) -- Use configurable variables to parameterize connections
- [Error Handling](error-handling.md) -- Handle missing or invalid configuration gracefully
