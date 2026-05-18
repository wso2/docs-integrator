---
title: Supported Protocols
---

# Supported Protocols

WSO2 Integrator, powered by Ballerina, provides native support for a wide range of communication protocols used in integration scenarios. Each protocol is implemented as a Ballerina module with type-safe clients, listeners, and services.

## HTTP and web protocols

| Protocol | Module | Description | Key Features |
|----------|--------|-------------|--------------|
| HTTP/1.1 | `ballerina/http` | Standard HTTP protocol | REST APIs, content negotiation, compression, caching |
| HTTP/2 | `ballerina/http` | Multiplexed HTTP protocol | Server push, stream prioritization, header compression |
| WebSocket | `ballerina/websocket` | Full-duplex communication over TCP | Real-time messaging, binary and text frames, ping/pong |
| WebSub | `ballerina/websub`, `ballerina/websubhub` | W3C WebSub pub/sub protocol | Content distribution, webhook-based subscriptions |
| GraphQL | `ballerina/graphql` | GraphQL query language protocol | Queries, mutations, subscriptions, schema introspection |
| gRPC | `ballerina/grpc` | Google Remote Procedure Call | Unary, server streaming, client streaming, bidirectional streaming |

### HTTP example

```ballerina
import ballerina/http;

// HTTP/1.1 service
service /api on new http:Listener(8080) {
    resource function get greeting() returns string {
        return "Hello, World!";
    }
}

// HTTP/2 client
http:Client http2Client = check new ("https://api.example.com", {
    httpVersion: http:HTTP_2_0
});
```

## Messaging protocols

| Protocol | Module | Description | Key Features |
|----------|--------|-------------|--------------|
| Apache Kafka | `ballerinax/kafka` | Distributed event streaming | Producer, consumer, consumer groups, topic management |
| RabbitMQ | `ballerinax/rabbitmq` | AMQP messaging broker | Exchanges, queues, bindings, message acknowledgment |
| MQTT | `ballerinax/mqtt` | Lightweight IoT messaging | QoS levels, retained messages, last will, topic wildcards |
| NATS | `ballerinax/nats` | Cloud-native messaging | Pub/sub, request/reply, queue groups |
| NATS Streaming | `ballerinax/stan` | Streaming extension for NATS | Durable subscriptions, message replay, at-least-once delivery |
| JMS | `ballerinax/java.jms` | Java Message Service | Queues, topics, durable subscribers, message selectors |
| Azure Service Bus | `ballerinax/asb` | Azure cloud messaging | Queues, topics, sessions, dead-letter queues |

### Kafka example

```ballerina
import ballerinax/kafka;

kafka:Producer producer = check new ("localhost:9092");

check producer->send({
    topic: "orders",
    value: {orderId: "ORD-001", amount: 99.99}
});

// Consumer
kafka:Consumer consumer = check new ("localhost:9092", {
    groupId: "order-processors",
    topics: ["orders"]
});

kafka:ConsumerRecord[] records = check consumer->poll(1);
```

## Transport protocols

| Protocol | Module | Description | Key Features |
|----------|--------|-------------|--------------|
| TCP | `ballerina/tcp` | Transmission Control Protocol | Raw socket communication, byte-level I/O |
| UDP | `ballerina/udp` | User Datagram Protocol | Connectionless communication, broadcast/multicast |

### TCP example

```ballerina
import ballerina/tcp;

// TCP listener
service on new tcp:Listener(9090) {
    remote function onConnect(tcp:Caller caller) returns tcp:ConnectionService {
        return new EchoService();
    }
}

service class EchoService {
    *tcp:ConnectionService;

    remote function onBytes(tcp:Caller caller, readonly & byte[] data) returns byte[]|tcp:Error? {
        return data; // Echo back
    }
}
```

## File transfer protocols

| Protocol | Module | Description | Key Features |
|----------|--------|-------------|--------------|
| FTP | `ballerina/ftp` | File Transfer Protocol | Upload, download, list, directory operations |
| SFTP | `ballerina/ftp` | SSH File Transfer Protocol | Encrypted file transfer, key-based authentication |

### FTP example

```ballerina
import ballerina/ftp;

// FTP client
ftp:Client ftpClient = check new ({
    host: "ftp.example.com",
    port: 21,
    auth: {
        credentials: {username: "user", password: "pass"}
    }
});

// Upload a file
stream<io:Block, io:Error?> fileStream = check io:fileReadBlocksAsStream("data.csv");
check ftpClient->put("/uploads/data.csv", fileStream);

// FTP listener for file events
listener ftp:Listener ftpListener = check new ({
    host: "ftp.example.com",
    auth: {credentials: {username: "user", password: "pass"}},
    path: "/incoming",
    pollingInterval: 30
});

service on ftpListener {
    remote function onFileChange(ftp:WatchEvent & readonly event) {
        foreach ftp:FileInfo file in event.addedFiles {
            io:println("New file: ", file.name);
        }
    }
}
```

## Email protocols

| Protocol | Module | Description | Key Features |
|----------|--------|-------------|--------------|
| SMTP | `ballerina/email` | Simple Mail Transfer Protocol | Send emails with attachments, HTML content |
| POP3 | `ballerina/email` | Post Office Protocol v3 | Receive and download emails |
| IMAP4 | `ballerina/email` | Internet Message Access Protocol | Read, search, and manage emails on server |

### Email example

```ballerina
import ballerina/email;

// Send email via SMTP
email:SmtpClient smtp = check new ("smtp.example.com", "user@example.com", "password");

check smtp->sendMessage({
    to: "recipient@example.com",
    subject: "Order Confirmation",
    body: "Your order has been processed.",
    contentType: "text/plain"
});

// Listen for emails via IMAP
listener email:ImapListener imapListener = check new ({
    host: "imap.example.com",
    username: "user@example.com",
    password: "password",
    pollingInterval: 60
});

service "emailObserver" on imapListener {
    remote function onMessage(email:Message message) {
        io:println("From: ", message.sender);
        io:println("Subject: ", message.'from);
    }
}
```

## Protocol comparison

| Protocol | Pattern | Delivery Guarantee | Ordering | Use Case |
|----------|---------|-------------------|----------|----------|
| HTTP | Request/Response | At-most-once | N/A | REST APIs, webhooks |
| gRPC | Request/Response, Streaming | At-most-once | Per stream | Microservice-to-microservice |
| GraphQL | Request/Response | At-most-once | N/A | Flexible API queries |
| WebSocket | Bidirectional streaming | At-most-once | Per connection | Real-time updates |
| Kafka | Pub/Sub | At-least-once, Exactly-once | Per partition | Event streaming, log aggregation |
| RabbitMQ | Pub/Sub, Queue | At-least-once | Per queue | Task distribution, async processing |
| NATS | Pub/Sub, Request/Reply | At-most-once | None | Lightweight cloud messaging |
| MQTT | Pub/Sub | QoS 0/1/2 | Per topic | IoT, edge devices |
| JMS | Pub/Sub, Queue | At-least-once | Per queue | Enterprise messaging |
| TCP | Stream | Reliable, ordered | Yes | Custom binary protocols |
| UDP | Datagram | Unreliable | None | Discovery, broadcast |

## See also

- [Ballerina API Documentation](api/ballerina-documentation.md) -- Full API docs for all modules
- [Connectors Catalog](../connectors/catalog/index.mdx) -- Protocol connector guides
- [Data Formats](data-formats/supported-data-formats.md) -- Supported data formats
