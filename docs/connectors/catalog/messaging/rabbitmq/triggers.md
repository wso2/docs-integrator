---
title: Triggers
---

# Triggers

The `ballerinax/rabbitmq` connector supports event-driven message consumption through a `rabbitmq:Listener` and `rabbitmq:Service`. When messages arrive on a subscribed queue, the listener dispatches them to your service callbacks automatically, supporting both one-way message processing and request-reply patterns.

Three components work together:

| Component | Role |
|-----------|------|
| `rabbitmq:Listener` | Connects to the RabbitMQ broker, subscribes to queues, and dispatches incoming messages to attached services. |
| `rabbitmq:Service` | Defines `onMessage` and/or `onRequest` callbacks invoked when messages arrive on the configured queue. |
| `rabbitmq:Caller` | Provided to callbacks for manual message acknowledgement or rejection when `autoAck` is `false`. |
| `rabbitmq:AnydataMessage` | The message payload passed to each callback, containing content, routing key, exchange, delivery tag, and properties. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `rabbitmq:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ConnectionConfiguration` | Connection settings for the RabbitMQ listener, including authentication, virtual host, timeouts, and TLS. |

`ConnectionConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | Required | RabbitMQ server hostname (constructor parameter). |
| `port` | `int` | Required | RabbitMQ server AMQP port (constructor parameter). |
| `qosSettings` | `QosSettings?` | `()` | Quality of Service prefetch settings (constructor parameter). |
| `auth` | `Credentials` | `()` | Username and password credentials. |
| `virtualHost` | `string` | `()` | The virtual host to connect to. |
| `connectionTimeout` | `decimal` | `()` | Connection timeout in seconds. |
| `handshakeTimeout` | `decimal` | `()` | TLS handshake timeout in seconds. |
| `shutdownTimeout` | `decimal` | `()` | Shutdown timeout in seconds. |
| `heartbeat` | `decimal` | `()` | Heartbeat interval in seconds. |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |

### Initializing the listener

**Basic listener with default settings:**

```ballerina
import ballerinax/rabbitmq;

listener rabbitmq:Listener channelListener = new ("localhost", 5672);
```

**Listener with credentials and QoS prefetch:**

```ballerina
import ballerinax/rabbitmq;

configurable string host = ?;
configurable int port = ?;
configurable string username = ?;
configurable string password = ?;

listener rabbitmq:Listener channelListener = new (host, port,
    qosSettings = { prefetchCount: 10 },
    auth = { username: username, password: password }
);
```

**Listener with TLS:**

```ballerina
import ballerinax/rabbitmq;

listener rabbitmq:Listener channelListener = new ("rabbitmq.example.com", 5671,
    auth = { username: "myuser", password: "mypass" },
    secureSocket = {
        cert: "/path/to/ca_certificate.pem",
        key: {
            certFile: "/path/to/client_certificate.pem",
            keyFile: "/path/to/client_key.pem"
        }
    }
);
```

---

## Service

A `rabbitmq:Service` is a Ballerina service attached to a `rabbitmq:Listener`. It is annotated with `@rabbitmq:ServiceConfig` to specify the queue to consume from and acknowledgement mode. Implement `onMessage` for one-way consumption or `onRequest` for request-reply patterns.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(rabbitmq:AnydataMessage message, rabbitmq:Caller caller?) returns error?` | Invoked when a message arrives on the queue. Use for one-way message consumption. |
| `onRequest` | `remote function onRequest(rabbitmq:AnydataMessage message, rabbitmq:Caller caller?) returns anydata` | Invoked when a message arrives and a reply is expected. The return value is sent back as the response. |

You can implement either `onMessage` or `onRequest`, not both in the same service. Use `onMessage` for fire-and-forget consumption and `onRequest` when the publisher expects a reply.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/rabbitmq;

configurable string host = "localhost";
configurable int port = 5672;

listener rabbitmq:Listener channelListener = new (host, port);

@rabbitmq:ServiceConfig {
    queueName: "OrderQueue",
    autoAck: false
}
service rabbitmq:Service on channelListener {

    remote function onMessage(rabbitmq:AnydataMessage message, rabbitmq:Caller caller) returns error? {
        string|error content = string:fromBytes(check message.content.ensureType());
        if content is string {
            log:printInfo("Received order", payload = content, routingKey = message.routingKey);
        }
        // Acknowledge the message after successful processing
        check caller->basicAck();
    }
}
```

When `autoAck` is set to `true` (the default), messages are acknowledged automatically before the callback executes. Set `autoAck: false` and use `rabbitmq:Caller` for manual acknowledgement when you need to ensure messages are only acknowledged after successful processing.

---

## Supporting types

### `AnydataMessage`

| Field | Type | Description |
|-------|------|-------------|
| `content` | `anydata` | The message payload content. |
| `routingKey` | `string` | The routing key the message was published with. |
| `exchange` | `string` | The exchange the message was published to (empty string for default exchange). |
| `deliveryTag` | `int?` | The delivery tag assigned by the broker (present on consumed messages). |
| `properties` | `BasicProperties?` | Optional message properties (replyTo, contentType, contentEncoding, correlationId, headers). |

### `BasicProperties`

| Field | Type | Description |
|-------|------|-------------|
| `replyTo` | `string?` | The queue name for reply messages in request-reply patterns. |
| `contentType` | `string?` | MIME type of the message content. |
| `contentEncoding` | `string?` | Encoding of the message content. |
| `correlationId` | `string?` | Correlation identifier for matching requests with replies. |
| `headers` | `map<anydata>?` | Custom headers as key-value pairs. |

### `QosSettings`

| Field | Type | Description |
|-------|------|-------------|
| `prefetchCount` | `int` | Maximum number of unacknowledged messages the server will deliver to the consumer. |
| `prefetchSize` | `int?` | Maximum total size (in bytes) of unacknowledged messages. |
| `global` | `boolean` | If `true`, QoS settings apply to the entire channel; otherwise per-consumer. |

### `RabbitMQServiceConfig`

| Field | Type | Description |
|-------|------|-------------|
| `queueName` | `string` | The name of the queue to consume messages from. |
| `config` | `QueueConfig?` | Optional queue configuration; the queue is declared if it does not exist. |
| `autoAck` | `boolean` | If `true` (default), messages are automatically acknowledged before the callback. |
