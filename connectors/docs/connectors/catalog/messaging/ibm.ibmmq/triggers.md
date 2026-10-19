---
title: Triggers
---

# Triggers

The `ballerinax/ibm.ibmmq` connector supports event-driven message consumption through an `ibmmq:Listener`. The listener connects to an IBM MQ queue manager, polls for messages on a configured queue or topic subscription, and invokes your service's `onMessage` callback for each message received.

Three components work together:

| Component | Role |
|-----------|------|
| `ibmmq:Listener` | Connects to an IBM MQ queue manager and polls for messages on configured queues or topic subscriptions. |
| `ibmmq:Service` | Defines the `onMessage` callback invoked when a message is received. |
| `ibmmq:Caller` | Provides transaction control (commit/rollback) and message acknowledgement within the service callback. |
| `ibmmq:Message` | The message payload and metadata passed to the `onMessage` callback. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `ibm.ibmmq:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `QueueManagerConfiguration` | Connection configuration for the IBM MQ queue manager. Uses the same configuration as `QueueManager`. |

`QueueManagerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | Required | Name of the IBM MQ queue manager. |
| `host` | `string` | Required | Hostname of the IBM MQ server. |
| `port` | `int` | `1414` | Port number of the IBM MQ server. |
| `channel` | `string` | Required | Server connection channel name. |
| `userID` | `string` | `()` | User ID for authentication. |
| `password` | `string` | `()` | Password for authentication. |
| `sslCipherSuite` | `SslCipherSuite` | `()` | SSL cipher suite for secure connections. |
| `secureSocket` | `SecureSocket` | `()` | SSL/TLS trust store and key store configuration. |

### Initializing the listener

**Basic listener initialization:**

```ballerina
import ballerinax/ibm.ibmmq;

configurable string queueManagerName = ?;
configurable string host = ?;
configurable int port = ?;
configurable string channel = ?;
configurable string userID = ?;
configurable string password = ?;

listener ibmmq:Listener ibmmqListener = new (
    name = queueManagerName,
    host = host,
    port = port,
    channel = channel,
    userID = userID,
    password = password
);
```

---

## Service

An `ibmmq:Service` is a Ballerina service attached to an `ibmmq:Listener`. It is annotated with `@ibmmq:ServiceConfig` to specify the queue or topic to consume from, and implements the `onMessage` callback to process incoming messages.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(ibmmq:Message message) returns error?` | Invoked when a message is received from the configured queue or topic. Optionally accepts an `ibmmq:Caller` parameter for transaction control. |

The `@ibmmq:ServiceConfig` annotation accepts either a `QueueConfig` (with `queueName`) or a `TopicConfig` (with `topicName`) to specify the message source.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/ibm.ibmmq;

configurable string queueManagerName = ?;
configurable string host = ?;
configurable int port = ?;
configurable string channel = ?;
configurable string userID = ?;
configurable string password = ?;

listener ibmmq:Listener ibmmqListener = new (
    name = queueManagerName,
    host = host,
    port = port,
    channel = channel,
    userID = userID,
    password = password
);

@ibmmq:ServiceConfig {
    queueName: "DEV.QUEUE.1",
    pollingInterval: 10
}
service on ibmmqListener {
    remote function onMessage(ibmmq:Message message) returns error? {
        log:printInfo("Received message",
            payload = check string:fromBytes(message.payload)
        );
    }
}
```

For transactional processing, set `sessionAckMode: ibmmq:SESSION_TRANSACTED` in the service config and add an `ibmmq:Caller` parameter to the `onMessage` callback. Use `caller->'commit()` to commit or `caller->'rollback()` to roll back the transaction.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `byte[]` | The message body as a byte array. |
| `properties` | `map` | Custom message properties as key-value pairs. |
| `messageId` | `byte[]` | Unique message identifier assigned by the queue manager. |
| `correlationId` | `byte[]` | Correlation identifier for linking related messages. |
| `expiry` | `int` | Message lifetime (tenths of a second). `-1` means unlimited. |
| `priority` | `int` | Message priority (0–9). |
| `persistence` | `int` | Message persistence (0 = not persistent, 1 = persistent). |
| `messageType` | `int` | Message type (e.g., datagram, request, reply). |
| `format` | `string` | Format name associated with the message data (e.g., `"MQSTR"`). |
| `replyToQueueName` | `string` | Name of the reply-to queue. |
| `replyToQueueManagerName` | `string` | Name of the reply-to queue manager. |
| `headers` | `Header[]` | Message headers (MQRFH2, MQRFH, MQCIH, or MQIIH). |

### `QueueConfig`

| Field | Type | Description |
|-------|------|-------------|
| `queueName` | `string` | Name of the queue to consume messages from. |
| `sessionAckMode` | `AcknowledgementMode` | Session acknowledgement mode (default: `AUTO_ACKNOWLEDGE`). Set to `SESSION_TRANSACTED` for transactional processing. |
| `pollingInterval` | `decimal` | Interval in seconds between polling attempts (default: `10`). |
| `receiveTimeout` | `decimal` | Maximum time in seconds to wait for a message during each poll (default: `5`). |

### `TopicConfig`

| Field | Type | Description |
|-------|------|-------------|
| `topicName` | `string` | Name of the topic to subscribe to. |
| `noLocal` | `boolean` | If `true`, messages published by the same connection are not delivered (default: `false`). |
| `consumerType` | `ConsumerType` | Type of consumer: `DEFAULT`, `DURABLE`, `SHARED`, or `SHARED_DURABLE`. |
| `subscriberName` | `string` | Subscription identifier name (required for durable subscriptions). |
| `sessionAckMode` | `AcknowledgementMode` | Session acknowledgement mode (default: `AUTO_ACKNOWLEDGE`). |
| `pollingInterval` | `decimal` | Interval in seconds between polling attempts (default: `10`). |
| `receiveTimeout` | `decimal` | Maximum time in seconds to wait for a message during each poll (default: `5`). |

### `Caller`

| Field | Type | Description |
|-------|------|-------------|
| `acknowledge` | `function` | Acknowledges the received message (remote function). |
| `'commit` | `function` | Commits the current transaction (remote function). |
| `'rollback` | `function` | Rolls back the current transaction (remote function). |
