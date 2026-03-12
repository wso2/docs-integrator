---
sidebar_position: 2
title: Managing Connections
description: Configure, test, and manage connections to databases, APIs, message brokers, and cloud services.
---

# Managing Connections

Connections define how your integration communicates with external systems -- databases, HTTP APIs, message brokers, cloud services, and SaaS applications. WSO2 Integrator provides a centralized connection management experience that lets you configure connections once and reuse them across all your integration artifacts.

## Creating a Connection

### From the Visual Designer

1. Open the **Connections** panel in the WSO2 Integrator sidebar.
2. Click **+ New Connection**.
3. Select the connector type (e.g., MySQL, HTTP, Kafka).
4. Fill in the connection parameters.
5. Click **Test Connection** to verify.
6. Click **Save**.

<!-- TODO: Screenshot of the connection creation dialog -->

### From Code

Define connections as module-level client declarations with `configurable` parameters:

```ballerina
import ballerinax/mysql;
import ballerina/http;
import ballerinax/kafka;

// Database connection
configurable string dbHost = ?;
configurable int dbPort = 3306;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client orderDb = check new (
    host = dbHost,
    port = dbPort,
    user = dbUser,
    password = dbPassword,
    database = dbName,
    options = {
        connectTimeout: 10,
        socketTimeout: 30
    },
    connectionPool = {
        maxOpenConnections: 10,
        minIdleConnections: 2,
        maxConnectionLifeTime: 1800
    }
);

// HTTP API connection with OAuth2
configurable string crmBaseUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string tokenUrl = ?;

final http:Client crmClient = check new (crmBaseUrl, {
    auth: {
        tokenUrl: tokenUrl,
        clientId: clientId,
        clientSecret: clientSecret,
        scopes: ["read", "write"]
    },
    timeout: 30,
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0,
        maxWaitInterval: 30
    },
    circuitBreaker: {
        rollingWindow: {timeWindow: 60, bucketSize: 10},
        failureThreshold: 0.5,
        resetTime: 30
    }
});
```

## Connection Types

### Database Connections

```ballerina
import ballerinax/mysql;
import ballerinax/postgresql;
import ballerinax/mssql;

// MySQL
final mysql:Client mysqlDb = check new (
    host = "localhost", port = 3306,
    user = "root", password = "secret",
    database = "mydb"
);

// PostgreSQL
final postgresql:Client postgresDb = check new (
    host = "localhost", port = 5432,
    username = "postgres", password = "secret",
    database = "mydb"
);

// Microsoft SQL Server
final mssql:Client mssqlDb = check new (
    host = "localhost", port = 1433,
    user = "sa", password = "secret",
    database = "mydb"
);
```

### HTTP/REST Connections

```ballerina
import ballerina/http;

// Basic auth
final http:Client basicClient = check new ("https://api.example.com", {
    auth: {
        username: "user",
        password: "pass"
    }
});

// API key via header
final http:Client apiKeyClient = check new ("https://api.example.com", {
    httpVersion: http:HTTP_1_1,
    customHeaders: {"X-API-Key": apiKey}
});

// Bearer token
final http:Client bearerClient = check new ("https://api.example.com", {
    auth: {token: bearerToken}
});

// Mutual TLS (mTLS)
final http:Client mtlsClient = check new ("https://secure.example.com", {
    secureSocket: {
        key: {
            certFile: "/certs/client.crt",
            keyFile: "/certs/client.key"
        },
        cert: "/certs/ca.crt"
    }
});
```

### Message Broker Connections

```ballerina
import ballerinax/kafka;
import ballerinax/rabbitmq;

// Kafka producer
final kafka:Producer kafkaProducer = check new ({
    bootstrapServers: "broker1:9092,broker2:9092",
    acks: kafka:ACKS_ALL,
    retryCount: 3,
    securityProtocol: kafka:PROTOCOL_SASL_SSL,
    auth: kafka:AUTH_SASL_PLAIN,
    username: "kafka-user",
    password: "kafka-pass"
});

// RabbitMQ client
final rabbitmq:Client rmqClient = check new ("localhost", 5672, {
    username: "guest",
    password: "guest"
});
```

## Connection Pooling

For database connections, configure the connection pool to optimize resource usage:

```ballerina
final mysql:Client db = check new (
    host = dbHost, user = dbUser, password = dbPassword, database = dbName,
    connectionPool = {
        maxOpenConnections: 25,       // Max concurrent connections
        minIdleConnections: 5,        // Keep-alive connections
        maxConnectionLifeTime: 1800   // Recycle after 30 minutes (seconds)
    }
);
```

| Parameter | Description | Default |
|---|---|---|
| `maxOpenConnections` | Maximum number of open connections | `15` |
| `minIdleConnections` | Minimum idle connections in the pool | `0` |
| `maxConnectionLifeTime` | Max lifetime of a connection (seconds) | `1800` |

## Testing Connections

### From the Visual Designer

Click the **Test Connection** button in the connection configuration dialog. The test verifies connectivity, authentication, and basic operations.

### From Code

Write a simple test function:

```ballerina
function testDbConnection() returns error? {
    // Test database connectivity
    _ = check orderDb->queryRow(`SELECT 1`);
    log:printInfo("Database connection successful");
}

function testApiConnection() returns error? {
    // Test API connectivity
    http:Response response = check crmClient->get("/health");
    if response.statusCode == 200 {
        log:printInfo("API connection successful");
    }
}
```

## Resilience Configuration

### Retry

```ballerina
final http:Client resilientClient = check new ("https://api.example.com", {
    retryConfig: {
        count: 3,               // Retry up to 3 times
        interval: 2,            // Wait 2 seconds between retries
        backOffFactor: 2.0,     // Double the wait each retry
        maxWaitInterval: 30,    // Cap wait at 30 seconds
        statusCodes: [500, 502, 503]  // Retry on these status codes
    }
});
```

### Circuit Breaker

```ballerina
final http:Client protectedClient = check new ("https://api.example.com", {
    circuitBreaker: {
        rollingWindow: {
            timeWindow: 60,     // 60-second rolling window
            bucketSize: 10      // 10 buckets for granularity
        },
        failureThreshold: 0.5, // Open circuit at 50% failure rate
        resetTime: 30           // Try again after 30 seconds
    }
});
```

## Environment-Specific Configuration

Use `Config.toml` to vary connection details per environment:

```toml
# Config.toml (development)
dbHost = "localhost"
dbPort = 3306
dbUser = "root"
dbPassword = "dev-password"
dbName = "orders_dev"
crmBaseUrl = "https://sandbox.crm.example.com"
```

```toml
# Config.toml (production)
dbHost = "db.prod.internal"
dbPort = 3306
dbUser = "app_user"
dbPassword = "prod-encrypted-password"
dbName = "orders"
crmBaseUrl = "https://api.crm.example.com"
```

## What's Next

- [Control Flow](control-flow.md) -- Use connections in branching and looping logic
- [Error Handling](error-handling.md) -- Handle connection failures gracefully
- [Configuration Management](configuration-management.md) -- Manage connection settings per environment
