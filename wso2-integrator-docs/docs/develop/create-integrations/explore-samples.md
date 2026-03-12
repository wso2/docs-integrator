---
sidebar_position: 3
title: Explore Sample Integrations
description: Browse, run, and learn from built-in sample integrations that demonstrate common patterns and use cases.
---

# Explore Sample Integrations

WSO2 Integrator ships with a curated library of sample integrations that demonstrate common patterns, connector usage, and best practices. Use these samples as learning resources or as starting points for your own projects.

## Accessing the Sample Gallery

Open the sample gallery from VS Code:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Select **WSO2 Integrator: Explore Samples**.
3. Browse samples by category, or use the search bar to find a specific scenario.

<!-- TODO: Screenshot of the sample gallery showing categories and search -->

Alternatively, click the **Explore Samples** link on the WSO2 Integrator Welcome tab.

## Sample Categories

### Services

| Sample | Description |
|---|---|
| **REST API with CRUD** | HTTP service backed by a database with full create, read, update, and delete operations |
| **GraphQL API** | GraphQL service with queries, mutations, and subscriptions |
| **gRPC Service** | Protocol Buffers-based service with unary and streaming RPCs |
| **WebSocket Chat** | Real-time bidirectional messaging with WebSocket |
| **WebSub Hub** | Publish/subscribe hub for webhook-style event distribution |

### Event-Driven

| Sample | Description |
|---|---|
| **Kafka Order Pipeline** | Consume orders from Kafka, transform, and write to a database |
| **RabbitMQ Notification Router** | Route messages from RabbitMQ to different handlers based on content |
| **MQTT IoT Data Collector** | Collect sensor data from MQTT topics and aggregate results |

### Data Integration

| Sample | Description |
|---|---|
| **Database-to-Database Sync** | Periodically sync records between two databases |
| **CSV File Import** | Read CSV files from SFTP, validate, and insert into a database |
| **EDI Processing** | Parse and generate EDI documents for B2B integration |

### AI-Powered

| Sample | Description |
|---|---|
| **Customer Support Agent** | AI agent that queries a knowledge base and creates support tickets |
| **Document Summarizer** | RAG application that summarizes uploaded documents |

## Running a Sample

### Step 1: Open the Sample

Click on a sample in the gallery to view its description, architecture diagram, and required configuration. Click **Open Sample** to create a copy in your workspace.

<!-- TODO: Screenshot of a sample detail page with architecture diagram -->

### Step 2: Configure

Most samples require configuration such as database credentials or API keys. The sample's `Config.toml` file contains placeholders:

```toml
# Config.toml - Kafka Order Pipeline sample
[kafkaConfig]
bootstrapServers = "localhost:9092"
topic = "orders"
groupId = "order-processor"

[databaseConfig]
host = "localhost"
port = 3306
user = "root"
password = ""
database = "orders_db"
```

Update the values to match your environment.

### Step 3: Run and Test

Run the sample using the built-in Try-It tool:

```bash
# Run from the terminal
bal run

# Or use the Run button in VS Code
```

The Try-It panel provides request builders for HTTP services, message producers for event handlers, and execution triggers for automations.

## Learning from Samples

Each sample demonstrates specific integration techniques. Here is an example from the **REST API with CRUD** sample:

```ballerina
import ballerina/http;
import ballerinax/mysql;
import ballerina/sql;

configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

type Product record {|
    int id?;
    string name;
    string category;
    decimal price;
|};

final mysql:Client dbClient = check new (
    host = dbHost, port = dbPort,
    user = dbUser, password = dbPassword,
    database = dbName
);

service /products on new http:Listener(8090) {

    resource function get .() returns Product[]|error {
        stream<Product, sql:Error?> productStream =
            dbClient->query(`SELECT * FROM products`);
        return from Product product in productStream
            select product;
    }

    resource function get [int id]() returns Product|http:NotFound|error {
        Product|sql:Error result =
            dbClient->queryRow(`SELECT * FROM products WHERE id = ${id}`);
        if result is sql:NoRowsError {
            return http:NOT_FOUND;
        }
        return result;
    }

    resource function post .(Product product) returns Product|error {
        sql:ExecutionResult result =
            check dbClient->execute(`
                INSERT INTO products (name, category, price)
                VALUES (${product.name}, ${product.category}, ${product.price})
            `);
        product.id = <int>result.lastInsertId;
        return product;
    }
}
```

Study the code structure, error handling patterns, and connector usage to apply similar techniques in your own integrations.

## Contributing Samples

If you build an integration that could benefit others, consider contributing it to the sample gallery. See the [WSO2 Integrator community guidelines](https://github.com/wso2/docs-integrator) for contribution instructions.

## What's Next

- [Import External Integrations](import-external.md) -- Bring in integrations from other tools
- [Integration Artifacts](/docs/develop/integration-artifacts) -- Understand the building blocks of an integration
