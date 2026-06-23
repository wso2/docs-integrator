---
title: Streaming Capabilities
---

# Streaming Capabilities

WSO2 Integrator provides a range of streaming capabilities for building event-driven integrations, processing large datasets efficiently, and implementing real-time communication patterns. These capabilities enable integrations to continuously consume, process, transform, and deliver data as it becomes available, making them suitable for use cases such as event-driven architectures, change data capture (CDC), messaging systems, large-file processing, and streaming APIs.

Unlike traditional request-response integrations that operate on complete datasets or messages, streaming integrations process data incrementally. This approach helps reduce memory consumption, improve responsiveness, and handle continuous or high-volume data flows more efficiently. Whether consuming events from a message broker, processing large database query results, transferring large files, or maintaining long-lived protocol connections, WSO2 Integrator provides a consistent programming model for building streaming-based integrations.

This guide covers the streaming capabilities of the **WSO2 Integrator: Default profile**. Advanced stream analytics features are provided by the [WSO2 Integrator: SI profile](https://si.docs.wso2.com/latest/).

## When do you need the SI profile?

The default profile handles most streaming integration needs. You may need the [WSO2 Integrator: SI profile](https://si.docs.wso2.com/latest/) if your use case involves any of the following.

* **Event windowing** — computing a metric over a rolling or fixed time window on a live stream, updated continuously as events arrive
  * Computing the total number of orders in the last 5 minutes
  * Computing an average sensor reading per session
* **Stream joins** — correlating events from two separate live event streams based on a shared key and time window
  * Matching a shipment scan with its corresponding order event when both must arrive within a short time window
* **Complex Event Processing (CEP)** — detecting when a specific sequence of events occurs, or when an expected event does not arrive within a time limit
  * Triggering a fraud alert when a login is followed by a large transfer within 2 minutes
  * Raising an alert if a machine heartbeat stops for 2 minutes
* **Pattern detection** — identifying recurring patterns or trends across a sequence of consecutive events
  * Alerting when three consecutive production-batch outputs are declining
  * Alerting when a sensor reading exceeds a threshold, for five readings in a row
* **Incremental aggregations** — automatically maintaining pre-computed summaries at multiple time granularities simultaneously, so they can be queried later
  * Maintaining per-minute, per-hour, and per-day sales totals so a dashboard can query any resolution without reprocessing raw events

## Building blocks of stream processing

This section outlines the foundational components used to implement streaming integrations within the WSO2 Integrator: Default profile.

### Streams {#streams}

The `stream<T, E?>` type is the unifying primitive that the other in-process streaming capabilities (database query results, data-format parsers, file I/O) rely on. A stream is a lazy, ordered sequence of values of type T that may either complete normally or terminate with an error of type E. Streams can be bounded (e.g., a file's lines) or unbounded (e.g., a generator that produces values on demand). They are pulled one element at a time, so the full sequence is never materialized in memory.

```ballerina
import ballerina/io;

// From an array
int[] numbers = [1, 2, 3, 4, 5];
stream<int> intStream = numbers.toStream();

// From a file as a block stream (each block is a byte[])
stream<io:Block, io:Error?> blockStream =
    check io:fileReadBlocksAsStream("large-input.bin");

// From a CSV file as records
type Order record {| string id; decimal amount; |};
stream<Order, io:Error?> orders =
    check io:fileReadCsvAsStream("orders.csv");
```

### Transforming with query expressions

Query expressions (from … where … select) work directly on streams, producing a new stream without buffering the input.

```ballerina
stream<Order, io:Error?> highValue = from Order o in orders
                                     where o.amount > 1000.0d
                                     select o;
```

### Aggregating with collect

```ballerina
decimal total = check from var {amount} in orders
                    collect sum(amount);
```

### Side effects with query actions

Use `do { … }` instead of `select` to run actions per element:

```ballerina
check from Order o in orders
     where o.amount > 1000.0d
     do {
         check publishHighValueOrder(o);
     };
```

### Closing streams and error handling

For streams that hold external resources (database cursors, file handles, sockets), call `close()` when finished. The `E?` parameter on `stream<T, E?>` propagates errors that occur during iteration.

```ballerina
stream<Order, io:Error?> orders = check io:fileReadCsvAsStream("orders.csv");
do {
    check from Order o in orders do {
        check processOrder(o);
    };
} on fail error e {
    log:printError("stream terminated", 'error = e);
}
check orders.close();
```

For the full query clause reference, see [Query Expressions](language/query-expressions.md).

### Service/listener model {#service-listener-model}

Event-driven integrations are built around two building blocks: **listeners** that own the protocol concerns (connection, subscription, acknowledgement, retries, partition rebalance) and **services** that hold the business logic. This separation means streaming concerns like backpressure and delivery guarantees are handled by the listener — the service just receives events.

```ballerina
import ballerinax/kafka;

listener kafka:Listener orderListener = check new (kafka:DEFAULT_URL, {
    groupId: "order-processors",
    topics: ["orders"]
});

service "OrderConsumer" on orderListener {
    remote function onConsumerRecord(Order[] orders) returns error? {
        foreach Order o in orders {
            check processOrder(o);
        }
    }
}
```

Listeners exist for every broker, every event source, and every streaming network protocol covered below. See the [Build an Event-Driven Integration](../get-started/build-event-driven-integration.md) quick start for a complete walkthrough.

## Streaming capability categories

| Category | What it covers | Connector |
| ----- | ----- | ----- |
| [Database query streaming](#database-query-streaming-sql) | Result sets returned as lazy streams of records | [MySQL](../connectors/catalog/database/mysql/connector-overview.md), [PostgreSQL](../connectors/catalog/database/postgresql/connector-overview.md), [Microsoft SQL Server (MSSQL)](../connectors/catalog/database/mssql/connector-overview.md), [OracleDB](../connectors/catalog/database/oracledb/oracle-db-connector-overview.md), [Snowflake](../connectors/catalog/database/snowflake/connector-overview.md), [JDBC](../connectors/catalog/database/java.jdbc/java-jdbc-connector-overview.md) |
| [CSV streaming](#csv-streaming) | Streaming CSV parser that yields one record at a time | [CSV](../develop/transform/csv-flat-file.md#processing-large-files) |
| [Message brokers](#message-brokers) | Distributed event streaming and messaging | [Kafka](../connectors/catalog/messaging/kafka/connector-overview.md), [RabbitMQ](../connectors/catalog/messaging/rabbitmq/connector-overview.md), [MQTT](../connectors/catalog/built-in/mqtt/mqtt.md), [NATS](../connectors/catalog/messaging/nats/connector-overview.md), [JMS](../connectors/catalog/messaging/java.jms/jms-connector-overview.md), [ASB](../connectors/catalog/messaging/asb/azure-service-bus-connector-overview.md), [Solace](../connectors/catalog/messaging/solace/connector-overview.md), [AWS SQS](../connectors/catalog/messaging/aws.sqs/aws-sqs-connector-overview.md), [AWS SNS](../connectors/catalog/communication/aws.sns/aws-sns-connector-overview.md) |
| [Change Data Capture and SaaS event sources](#change-data-capture-and-saas-event-sources) | Database change events, cloud/SaaS events | [CDC](../connectors/catalog/database/cdc/connector-overview.md), [Salesforce](../connectors/catalog/crm-sales/salesforce/connector-overview.md), [Email](../connectors/catalog/built-in/email/email.md), [DynamoDB Streams](https://central.ballerina.io/ballerinax/aws.dynamodbstreams/latest), [GitHub Trigger](https://central.ballerina.io/ballerinax/trigger.github/latest) |
| [File / object transfer streaming](#file-object-transfer-streaming) | Memory-efficient streaming over file transfer protocols | [I/O](https://central.ballerina.io/ballerina/io/latest), [FTP](../connectors/catalog/built-in/ftp/ftp.md), [SMB](https://central.ballerina.io/ballerina/smb/latest) |
| [Streaming network protocols](#streaming-network-protocols) | Long-lived bidirectional / server-streamed connections | [WebSocket](../connectors/catalog/built-in/websocket/websocket.md), [gRPC](../connectors/catalog/built-in/grpc/grpc.md), [HTTP](../connectors/catalog/built-in/http/overview.md) (SSE), [GraphQL](../connectors/catalog/built-in/graphql/graphql.md) (subscriptions), [UDP](../connectors/catalog/built-in/udp/udp.md) |

## Database query streaming (SQL) {#database-query-streaming-sql}

Database-specific connectors return result sets as `stream<record {}, sql:Error?>` from the `query()` method. This lets you process arbitrarily large result sets without loading them into memory.

### Iterating a query stream

```ballerina
import ballerina/sql;
import ballerinax/mysql;

type Customer record {| int id; string name; string email; |};

mysql:Client db = check new ("localhost", "user", "pass", "shop", 3306);

public function main() returns error? {
    stream<Customer, sql:Error?> customers =
        db->query(`SELECT id, name, email FROM customers`);

    check from Customer c in customers
        do {
            check sendWelcomeEmail(c);
        };
}
```

### Composing with query expressions

A SQL result stream is just a `stream<...>`, so it composes naturally with the language-level query syntax:

```ballerina
stream<Order, sql:Error?> orderStream =
    db->query(`SELECT id, amount, status FROM orders WHERE created_at > ${cutoff}`);

decimal totalRevenue = check from var {status, amount} in orderStream
    where status == "paid"
    collect sum(amount);
```

### `query()` vs. `queryRow()`

Use `query()` (returns a stream) for result sets that may have many rows. Use `queryRow()` (returns a single record) when you expect exactly one row — for example, a primary-key lookup.

For per-database actions and configuration, see the connector docs: [MySQL](../connectors/catalog/database/mysql/actions.md), [PostgreSQL](../connectors/catalog/database/postgresql/actions.md), [MSSQL](../connectors/catalog/database/mssql/actions.md), [Oracle Database](../connectors/catalog/database/oracledb/actions.md).

## CSV streaming {#csv-streaming}

For very large CSV files, [CSV connector](../develop/transform/csv-flat-file.md#processing-large-files) exposes `parseToStream`, which incrementally parses a byte block stream and yields one record at a time. This keeps memory usage bounded regardless of file size, and the resulting record stream composes naturally with query expressions.

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Order record {| string id; decimal amount; string currency; |};

public function main() returns error? {
    stream<byte[], io:Error?> csvBytes = check io:fileReadBlocksAsStream("orders.csv");

    stream<Order, csv:Error?> orders = check csv:parseToStream(csvBytes);

    check from Order o in orders
        where o.currency == "USD"
        do {
            check processOrder(o);
        };
}
```

`csv:parseStream` (without the `To`) consumes a byte block stream too, but returns the full result as an array — it is not memory-efficient for large files. Use `parseToStream` when you need true record-level streaming. See [CSV](data-formats/csv.md) for the format reference.

## Message brokers {#message-brokers}

Each broker has a producer/client and a listener. The listener-driven services described in [Service/listener model](#service-listener-model) apply uniformly.

| Connector | Broker | Delivery semantics | Capabilities |
| ----- | ----- | ----- | ----- |
| [Kafka](../connectors/catalog/messaging/kafka/connector-overview.md) | Apache Kafka | At-least-once, exactly-once (transactions) | Consumer groups, SASL/SSL, Avro, GraalVM-compatible |
| [RabbitMQ](../connectors/catalog/messaging/rabbitmq/connector-overview.md) | RabbitMQ (AMQP 0-9-1) | At-least-once | Direct/Fanout/Topic/Headers exchanges, client ack |
| [MQTT](../connectors/catalog/built-in/mqtt/mqtt.md) | MQTT brokers | QoS 0/1/2 | Last-will, retained messages, IoT-oriented |
| [NATS](../connectors/catalog/messaging/nats/connector-overview.md) | NATS / JetStream | At-most-once (core) / at-least-once (JetStream) | Publish-subscribe, request-reply, and load-balanced queues, JetStream for persistent messaging |
| [JMS](../connectors/catalog/messaging/java.jms/jms-connector-overview.md) | JMS providers (ActiveMQ, Artemis) | At-least-once | Queues, topics, durable subscribers |
| [ASB](../connectors/catalog/messaging/asb/azure-service-bus-connector-overview.md) | Azure Service Bus | At-least-once | Sessions, dead-lettering, batch operations |
| [Solace](../connectors/catalog/messaging/solace/connector-overview.md) | Solace PubSub+ | At-least-once | Pub/Sub, request/reply, queuing modes |
| [AWS SQS](../connectors/catalog/messaging/aws.sqs/aws-sqs-connector-overview.md) | Amazon SQS | At-least-once (FIFO: exactly-once) | Standard and FIFO queues |
| [AWS SNS](../connectors/catalog/communication/aws.sns/aws-sns-connector-overview.md) | Amazon SNS | Topic fan-out | Pub/sub with topic subscriptions |

### Kafka example

```ballerina
import ballerinax/kafka;

public function main() returns error? {
    // Producer
    kafka:Producer producer = check new (kafka:DEFAULT_URL);
    check producer->send({ topic: "orders", value: { id: "O-1", amount: 99.99 }});
}

// Consumer
listener kafka:Listener kafkaListener = check new (kafka:DEFAULT_URL, {
    groupId: "order-processors",
    topics: ["orders"]
});

service "Orders" on kafkaListener {
    remote function onConsumerRecord(Order[] records) returns error? {
        foreach Order o in records {
            check processOrder(o);
        }
    }
}
```

### RabbitMQ example

```ballerina
import ballerinax/rabbitmq;

public function main() returns error? {
    // Producer
    rabbitmq:Client rmqClient = check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);
    check rmqClient->publishMessage({
        routingKey: "order.created",
        exchange: "orders-exchange",
        content: { id: "O-1", amount: 99.99 }
    });
}

// Consumer
listener rabbitmq:Listener rmqListener = check new (rabbitmq:DEFAULT_HOST, rabbitmq:DEFAULT_PORT);

service "orders" on rmqListener {
    remote function onMessage(Order o) returns error? {
        check processOrder(o);
    }
}
```

For per-broker artifact pages with the full creation workflow, see the [Event-Driven Integration](../develop/integration-artifacts/integration-artifacts.md) section.

## Change Data Capture and SaaS event sources {#change-data-capture-and-saas-event-sources}

Beyond message brokers, the default profile exposes streams of events from databases and SaaS systems as first-class listeners.

| Connector | Source | What it emits |
| ----- | ----- | ----- |
| [CDC](../connectors/catalog/database/cdc/connector-overview.md), [Microsoft SQL Server (MSSQL)](../connectors/catalog/database/mssql/connector-overview.md) | MSSQL CDC | INSERT/UPDATE/DELETE events from a SQL Server table |
| [CDC](../connectors/catalog/database/cdc/connector-overview.md), [PostgreSQL](../connectors/catalog/database/postgresql/connector-overview.md) | PostgreSQL CDC | Logical replication change events |
| [CDC](../connectors/catalog/database/cdc/connector-overview.md), [MySQL](../connectors/catalog/database/mysql/connector-overview.md) | MySQL CDC | Binlog-based change events |
| [DynamoDB Streams](https://central.ballerina.io/ballerinax/aws.dynamodbstreams/latest) | AWS DynamoDB Streams | Item-level changes from a DynamoDB table |
| [Salesforce](../connectors/catalog/crm-sales/salesforce/connector-overview.md) | Salesforce events | Platform events, change data capture events |
| [GitHub Trigger](https://central.ballerina.io/ballerinax/trigger.github/latest) | GitHub Webhooks | Repository, PR, issue events |
| [Email](../connectors/catalog/built-in/email/email.md) | POP3 / IMAP4 | New email messages |
| [Twilio Trigger](https://central.ballerina.io/ballerinax/twilio/latest) | Twilio | SMS, voice events |

### CDC example (PostgreSQL)

```ballerina
import ballerinax/cdc;
import ballerinax/postgresql;
import ballerinax/postgresql.cdc.driver as _;

listener postgresql:CdcListener postgresqlCdcListener = new (database = {
    hostname: "localhost",
    port: 5432,
    username: "sa",
    password: "password",
    databaseName: "shop"
});

@cdc:ServiceConfig {
    tables: "shop.dbo.orders"
}
service cdc:Service on postgresqlCdcListener {
    remote function onCreate(Order afterEntry, string tableName) returns error? {
    }

    remote function onUpdate(DatabaseEntrySchema beforeEntry, DatabaseEntrySchema afterEntry, string tableName) returns error? {
    }

    remote function onDelete(Order beforeEntry, string tableName) returns error? {
    }
}
```

For per-source guides, see the artifact pages: [CDC for PostgreSQL](../develop/integration-artifacts/event/cdc-postgresql.md), [CDC for MSSQL](../develop/integration-artifacts/event/cdc-mssql.md), [Salesforce events](../develop/integration-artifacts/event/salesforce-events.md), [GitHub webhooks](../develop/integration-artifacts/event/github-webhooks.md), [POP3/IMAP4](../develop/integration-artifacts/event/pop3imap4.md).

## File / object transfer streaming {#file-object-transfer-streaming}

For workflows involving large files, the default profile exposes file contents as streams of byte blocks (or typed records) so files can be read, transformed, and written without buffering in memory.

| Connector | Streaming surface |
| ----- | ----- |
| [I/O](https://central.ballerina.io/ballerina/io/latest) | `fileReadBlocksAsStream`, `fileReadCsvAsStream`, `fileWriteBlocksFromStream` for local files |
| [FTP](../connectors/catalog/built-in/ftp/ftp.md) | `ftp:Client->getBytesAsStream` / `put` over FTP and SFTP; `ftp:Listener` for file-arrival events |
| [SMB](https://central.ballerina.io/ballerina/smb/latest) | `smb:Client->getBytesAsStream` / `put` over SMB; `smb:Listener` for file-arrival events |

### Download from FTP as a byte stream

`ftp:Client->getBytesAsStream` reads a remote file as a `stream<byte[], io:Error?>`, letting you process the file block by block.

```ballerina
import ballerina/ftp;

ftp:Client ftpClient = check new ({
    host: "ftp.example.com",
    auth: { credentials: { username: "user", password: "***" } }
});

public function main() returns error? {
    stream<byte[], error?> byteStream = check ftpClient->getBytesAsStream("/exports/orders.csv");
    record {| byte[] value; |}? nextBytes = check byteStream.next();
    while nextBytes is record {| byte[] value; |} {
        check processBlock(nextBytes.value);
        nextBytes = check byteStream.next();
    }
    check byteStream.close();
}
```

### Download from an SMB share as a byte stream

SMB connector mirrors the FTP client surface: `smb:Client->getBytesAsStream` returns a byte block stream from a remote SMB share.

```ballerina
import ballerina/smb;

smb:Client smbClient = check new ({
    host: "fileserver.local",
    auth: { credentials: { username: "user", password: "***" } },
    share: "Shared"
});

public function main() returns error? {
    stream<byte[], error?> byteStream = check smbClient->getBytesAsStream("/share/exports/orders.csv");
    record {| byte[] value; |}? nextBytes = check byteStream.next();
    while nextBytes is record {| byte[] value; |} {
        check processBlock(nextBytes.value);
        nextBytes = check byteStream.next();
    }
    check byteStream.close();
}
```

For file-arrival events, both modules also expose a Listener. For the file-streaming deep dive, see [Streaming Large Files](../develop/integration-artifacts/file/streaming-large-files.md) and [FTP / SFTP](../develop/integration-artifacts/file/ftp-sftp.md).

## Streaming network protocols {#streaming-network-protocols}

Some protocols are inherently streaming: the connection itself is long-lived, and data flows as a continuous sequence of frames or messages.

| Module | Protocol | Streaming model |
| ----- | ----- | ----- |
| [WebSocket](../connectors/catalog/built-in/websocket/websocket.md) | WebSocket | Full-duplex text/binary frames over a single connection |
| [gRPC](../connectors/catalog/built-in/grpc/grpc.md) | gRPC | Unary, server-streaming, client-streaming, and bidirectional streaming RPCs |
| [HTTP](../connectors/catalog/built-in/http/overview.md) (SSE) | HTTP (SSE) | Server-to-client push as a `stream<http:SseEvent, error?>` over a long-lived HTTP connection |
| [GraphQL](../connectors/catalog/built-in/graphql/graphql.md) | GraphQL subscriptions | A `subscribe` resolver returns a `stream<T, error?>`, typically carried over WebSocket |
| [UDP](../connectors/catalog/built-in/udp/udp.md) | UDP | Connectionless datagram send/receive for high-throughput unordered streams |

WebSocket and gRPC use a listener/frame model, while HTTP SSE and GraphQL subscriptions surface a literal `stream<...>` value, tying directly back to [streams](#streams).

### WebSocket example

```ballerina
import ballerina/websocket;

service /chat on new websocket:Listener(9090) {
    resource function get .() returns websocket:Service {
        return new ChatService();
    }
}

service class ChatService {
    *websocket:Service;
    remote function onTextMessage(websocket:Caller caller, string msg) returns error? {
        check caller->writeTextMessage("echo: " + msg);
    }
}
```

### gRPC server-streaming example

```ballerina
import ballerina/grpc;

@grpc:Descriptor {
    value: GRPC_SERVER_STREAMING_DESC
}
service "HelloWorld" on new grpc:Listener(9090) {
    remote function lotsOfReplies(string name) returns stream<string, error?> {
        string[] greets = ["Hi", "Hey", "GM"];
        int i = 0;
        foreach string greet in greets {
            greets[i] = greet + " " + name;
            i += 1;
        }
        return greets.toStream();
    }
}
```

### HTTP server-sent events (SSE) example

A resource function returns a `stream<http:SseEvent, error?>`, and the client consumes the same type — pushing events to the client without polling.

```ballerina
import ballerina/http;

// Service: push a stream of events to the client
service /stocks on new http:Listener(9090) {
    resource function get .() returns stream<http:SseEvent, error?> {
        return new stream<http:SseEvent, error?>(new StockPriceGenerator());
    }
}
```

```ballerina
import ballerina/http;
import ballerina/io;

// Client: consume the event stream
http:Client stocksClient = check new ("http://localhost:9090");

public function main() returns error? {
    stream<http:SseEvent, error?> eventStream = check stocksClient->/stocks;
    check from http:SseEvent event in eventStream
        do {
            io:println("Stock price: ", event.data);
        };
}
```

### GraphQL subscription example

A `subscribe` resolver returns a `stream<T, error?>`; each value the stream yields is delivered to subscribed clients (over WebSocket).

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9000) {
    resource function subscribe names() returns stream<string, error?> {
        return ["Walter", "Skyler", "Jesse"].toStream();
    }
}
```

See [Supported Protocols](supported-protocols.md) for the full protocol matrix.

## See also

* [Query Expressions](language/query-expressions.md) — full clause reference
* [CSV](data-formats/csv.md) — CSV format reference
* [Streaming Large Files](../develop/integration-artifacts/file/streaming-large-files.md) — deep dive on file streaming
* [Build an Event-Driven Integration](../get-started/build-event-driven-integration.md) — quick start
* Event-driven artifact pages: [Kafka](../develop/integration-artifacts/event/kafka.md), [RabbitMQ](../develop/integration-artifacts/event/rabbitmq.md), [MQTT](../develop/integration-artifacts/event/mqtt.md), [Azure Service Bus](../develop/integration-artifacts/event/azure-service-bus.md), [Solace](../develop/integration-artifacts/event/solace.md)
* [Supported Protocols](supported-protocols.md) — complete protocol matrix
