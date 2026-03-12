---
sidebar_position: 4
title: "Build a Change Data Capture Service"
description: "End-to-end walkthrough: Build a Change Data Capture (CDC) service that detects database changes and propagates them to downstream systems in real time."
---

# Build a Change Data Capture Service

Build a service that captures inserts, updates, and deletes from a database and propagates those changes to downstream systems in near real time. Change Data Capture (CDC) is essential for keeping multiple systems in sync without tight coupling.

## What You'll Build

A CDC pipeline that monitors a MySQL orders table for changes and pushes those changes to both an Elasticsearch search index and a Kafka topic for downstream consumers. The service uses polling-based CDC with timestamp tracking.

## What You'll Learn

- Polling-based Change Data Capture with Ballerina
- Tracking change cursors using timestamps
- Propagating changes to multiple downstream systems
- Handling different change types (insert, update, delete)
- Building resilient CDC with error recovery

## Prerequisites

- WSO2 Integrator VS Code extension installed
- MySQL 8.0+ with a sample database
- Apache Kafka (optional, for event streaming)
- Basic understanding of SQL and database triggers

**Time estimate:** 45 minutes

## Architecture

```
┌──────────────┐    ┌───────────────────┐    ┌──────────────┐
│              │    │                   ├───►│ Elasticsearch│
│   MySQL DB   ├───►│   CDC Service     │    │ (Search)     │
│  (orders)    │    │                   │    └──────────────┘
│              │    │  - Poll changes   │
│  updated_at  │    │  - Track cursor   │    ┌──────────────┐
│  is_deleted  │    │  - Fan-out        ├───►│ Kafka Topic  │
│              │    │                   │    │ (Events)     │
└──────────────┘    └───────────────────┘    └──────────────┘
```

## Step 1: Create the Project

```bash
bal new cdc_service
cd cdc_service
```

Add the MySQL dependency to `Ballerina.toml`:

```toml
[package]
org = "myorg"
name = "cdc_service"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "mysql"
version = "1.13.0"

[[dependency]]
org = "ballerinax"
name = "mysql.driver"
version = "1.6.0"

[[dependency]]
org = "ballerinax"
name = "kafka"
version = "4.2.0"
```

## Step 2: Prepare the Database

Ensure your orders table has the necessary CDC columns:

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50) NOT NULL,
    product VARCHAR(200) NOT NULL,
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Index for efficient CDC polling
CREATE INDEX idx_orders_updated_at ON orders(updated_at);
```

## Step 3: Define the Data Types

```ballerina
// types.bal
import ballerina/time;

type Order record {|
    int id;
    string customer_id;
    string product;
    int quantity;
    decimal total_amount;
    string status;
    time:Civil created_at;
    time:Civil updated_at;
    boolean is_deleted;
|};

type ChangeEvent record {|
    string changeType;     // "INSERT", "UPDATE", "DELETE"
    string tableName;
    string timestamp;
    Order currentRecord;
    json previousRecord?;
|};

type CdcCursor record {|
    string tableName;
    string lastPolledAt;
    int lastProcessedId;
|};
```

## Step 4: Build the Change Detector

```ballerina
// change_detector.bal
import ballerina/log;
import ballerina/sql;
import ballerinax/mysql;

configurable string dbHost = "localhost";
configurable int dbPort = 3306;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client dbClient = check new (
    host = dbHost,
    port = dbPort,
    user = dbUser,
    password = dbPassword,
    database = dbName
);

// In-memory cursor tracking (use a persistent store in production)
string lastPolledTimestamp = "2000-01-01 00:00:00";

function detectChanges() returns ChangeEvent[]|error {
    ChangeEvent[] changes = [];

    // Query for all rows modified since the last poll
    sql:ParameterizedQuery query = `
        SELECT id, customer_id, product, quantity, total_amount, status,
               created_at, updated_at, is_deleted
        FROM orders
        WHERE updated_at > ${lastPolledTimestamp}
        ORDER BY updated_at ASC
    `;

    stream<Order, sql:Error?> resultStream = dbClient->query(query);

    check from Order 'order in resultStream
        do {
            string changeType = determineChangeType('order);
            changes.push({
                changeType: changeType,
                tableName: "orders",
                timestamp: time:utcToString(time:utcNow()),
                currentRecord: 'order
            });
        };

    // Update the cursor
    if changes.length() > 0 {
        Order lastRecord = changes[changes.length() - 1].currentRecord;
        lastPolledTimestamp = time:civilToString(lastRecord.updated_at);
        log:printInfo("CDC poll complete",
            changesDetected = changes.length(),
            newCursor = lastPolledTimestamp
        );
    }

    return changes;
}

function determineChangeType(Order 'order) returns string {
    if 'order.is_deleted {
        return "DELETE";
    }
    if 'order.created_at == 'order.updated_at {
        return "INSERT";
    }
    return "UPDATE";
}
```

## Step 5: Build the Change Propagators

```ballerina
// propagators.bal
import ballerina/http;
import ballerina/log;
import ballerinax/kafka;

configurable string elasticsearchUrl = "http://localhost:9200";
configurable string kafkaBrokers = "localhost:9092";
configurable string kafkaTopic = "order-changes";

final http:Client esClient = check new (elasticsearchUrl);

final kafka:Producer kafkaProducer = check new ({
    bootstrapServers: kafkaBrokers
});

// Propagate to Elasticsearch
function syncToElasticsearch(ChangeEvent event) returns error? {
    Order 'order = event.currentRecord;
    string indexId = 'order.id.toString();

    match event.changeType {
        "INSERT"|"UPDATE" => {
            _ = check esClient->put(
                string `/orders/_doc/${indexId}`,
                'order.toJson()
            );
            log:printInfo("Elasticsearch synced",
                changeType = event.changeType,
                orderId = indexId
            );
        }
        "DELETE" => {
            _ = check esClient->delete(string `/orders/_doc/${indexId}`);
            log:printInfo("Elasticsearch deleted", orderId = indexId);
        }
    }
}

// Propagate to Kafka
function publishToKafka(ChangeEvent event) returns error? {
    check kafkaProducer->send({
        topic: kafkaTopic,
        key: event.currentRecord.id.toString(),
        value: event.toJson()
    });
    log:printInfo("Kafka event published",
        changeType = event.changeType,
        orderId = event.currentRecord.id
    );
}
```

## Step 6: Wire the CDC Loop

```ballerina
// main.bal
import ballerina/http;
import ballerina/log;
import ballerina/task;

configurable int pollingIntervalSeconds = 5;

// Scheduled CDC polling task
function init() returns error? {
    // Start the CDC polling loop
    _ = check task:scheduleJobRecurByFrequency(new CdcJob(), pollingIntervalSeconds);
    log:printInfo("CDC service started", pollingInterval = pollingIntervalSeconds);
}

class CdcJob {
    *task:Job;

    public function execute() {
        ChangeEvent[]|error changes = detectChanges();
        if changes is error {
            log:printError("CDC poll failed", 'error = changes);
            return;
        }

        foreach ChangeEvent event in changes {
            // Propagate to Elasticsearch
            error? esResult = syncToElasticsearch(event);
            if esResult is error {
                log:printError("Elasticsearch sync failed",
                    orderId = event.currentRecord.id,
                    'error = esResult
                );
            }

            // Propagate to Kafka
            error? kafkaResult = publishToKafka(event);
            if kafkaResult is error {
                log:printError("Kafka publish failed",
                    orderId = event.currentRecord.id,
                    'error = kafkaResult
                );
            }
        }
    }
}

// Health check and manual trigger API
service /cdc on new http:Listener(8090) {

    resource function get health() returns json {
        return {
            status: "running",
            lastPolled: lastPolledTimestamp,
            pollingInterval: pollingIntervalSeconds
        };
    }

    resource function post trigger() returns json|error {
        ChangeEvent[] changes = check detectChanges();
        return {
            message: "Manual CDC triggered",
            changesProcessed: changes.length()
        };
    }
}
```

## Step 7: Test the CDC Service

Run the service:

```bash
bal run
```

Insert a record in MySQL and watch the CDC service detect it:

```sql
INSERT INTO orders (customer_id, product, quantity, total_amount, status)
VALUES ('CUST-100', 'Laptop', 1, 999.99, 'pending');
```

Check the health endpoint:

```bash
curl http://localhost:8090/cdc/health
```

Manually trigger a CDC cycle:

```bash
curl -X POST http://localhost:8090/cdc/trigger
```

Update a record and verify propagation:

```sql
UPDATE orders SET status = 'shipped' WHERE id = 1;
```

## Extend It

- **Use database log-based CDC** -- Replace polling with MySQL binlog for lower latency
- **Add schema evolution handling** -- Detect and handle column additions gracefully
- **Add exactly-once delivery** -- Use Kafka transactions for exactly-once semantics
- **Add a dead letter table** -- Store failed change events for manual reprocessing

## What's Next

- [Event Handlers](../../develop/build/event-handlers.md) -- Event-driven development patterns
- [Databases Connectors](../../connectors/databases.md) -- Database connector reference
- [Messaging Connectors](../../connectors/messaging.md) -- Kafka, RabbitMQ, and more
- [Kafka Event Processing Pipeline](../kafka-event-pipeline.md) -- Full Kafka tutorial
