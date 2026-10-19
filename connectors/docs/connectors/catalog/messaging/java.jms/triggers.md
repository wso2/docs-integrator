---
title: Triggers
---

# Triggers

The `ballerinax/java.jms` connector supports event-driven message consumption through a `jms:Listener`. When messages arrive on a configured queue or topic, the listener dispatches them to your service's `onMessage` callback automatically; no polling loop required.

Three components work together:

| Component | Role |
|-----------|------|
| `jms:Listener` | Connects to the JMS broker and listens for incoming messages on queues or topics. |
| `jms:Service` | Defines the `onMessage` callback invoked for each received message. |
| `jms:Caller` | Provides message acknowledgement and transaction control within service callbacks. |
| `jms:Message` | The message payload passed to the `onMessage` callback. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `java.jms:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ConnectionConfiguration` | Configures the JMS broker connection for the listener. |

`ConnectionConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `initialContextFactory` | `string` | Required | JNDI initial context factory class (e.g., `org.apache.activemq.jndi.ActiveMQInitialContextFactory`). |
| `providerUrl` | `string` | Required | JMS provider URL (e.g., `tcp://localhost:61616`). |
| `connectionFactoryName` | `string` | `"ConnectionFactory"` | JNDI name of the connection factory. |
| `username` | `string` | `()` | Username for broker authentication. |
| `password` | `string` | `()` | Password for broker authentication. |
| `properties` | `map<string>` | `{}` | Additional JNDI properties. |

### Initializing the listener

**Basic listener with ActiveMQ:**

```ballerina
import ballerinax/java.jms;

configurable string providerUrl = ?;

listener jms:Listener jmsListener = check new ({
    initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl: providerUrl
});
```

**Listener with authentication:**

```ballerina
import ballerinax/java.jms;

configurable string providerUrl = ?;
configurable string username = ?;
configurable string password = ?;

listener jms:Listener jmsListener = check new ({
    initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl: providerUrl,
    username: username,
    password: password
});
```

---

## Service

A `jms:Service` is a Ballerina service attached to a `jms:Listener`. It is annotated with `@jms:ServiceConfig` to specify the queue or topic to consume from, along with session acknowledgement mode and optional message selectors.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(jms:Message message) returns error?` | Invoked when a message arrives on the configured queue or topic. |
| `onMessage (with Caller)` | `remote function onMessage(jms:Message message, jms:Caller caller) returns error?` | Invoked with a Caller for manual acknowledgement or transaction control. |

The `jms:Caller` parameter is optional. Include it when you need manual acknowledgement (`CLIENT_ACKNOWLEDGE` mode) or transaction control (`SESSION_TRANSACTED` mode).

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/java.jms;

configurable string providerUrl = ?;

listener jms:Listener jmsListener = check new ({
    initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl: providerUrl
});

@jms:ServiceConfig {
    queueName: "orders"
}
service "order-processor" on jmsListener {
    remote function onMessage(jms:Message message, jms:Caller caller) returns error? {
        match message.content {
            var content if content is byte[] => {
                string textContent = check string:fromBytes(content);
                log:printInfo("Received order", content = textContent);
            }
            var content if content is string => {
                log:printInfo("Received text message", content = content);
            }
            var content if content is map<jms:Value> => {
                log:printInfo("Received map message", content = content.toString());
            }
        }
        check caller->acknowledge(message);
    }
}
```

Use `@jms:ServiceConfig` with `queueName` for queue consumption or `topicName` for topic subscription. For durable topic subscriptions, set `consumerType: jms:DURABLE` and provide a `subscriberName`.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | `string?` | Unique identifier assigned by the JMS provider. |
| `timestamp` | `int?` | The time the message was handed off to the provider for sending. |
| `correlationId` | `string?` | Correlation ID for linking messages (e.g., request-reply). |
| `replyTo` | `Destination?` | The destination to which replies should be sent. |
| `destination` | `Destination?` | The destination this message was sent to. |
| `deliveryMode` | `int?` | Delivery mode (1 = non-persistent, 2 = persistent). |
| `redelivered` | `boolean?` | Whether this message is being redelivered. |
| `jmsType` | `string?` | The JMS type header value. |
| `expiration` | `int?` | Expiration time in milliseconds (0 = no expiration). |
| `deliveredTime` | `int?` | The earliest time the message can be delivered. |
| `priority` | `int?` | Message priority (0-9, default 4). |
| `properties` | `map?` | Application-defined message properties. |
| `content` | `string\|map\|byte[]` | The message body: text, map, or binary content. |

### `Destination`

| Field | Type | Description |
|-------|------|-------------|
| `type` | `DestinationType` | Destination type: `QUEUE`, `TEMPORARY_QUEUE`, `TOPIC`, or `TEMPORARY_TOPIC`. |
| `name` | `string?` | The destination name (not required for temporary destinations). |

### `QueueConfig`

| Field | Type | Description |
|-------|------|-------------|
| `sessionAckMode` | `AcknowledgementMode` | Session acknowledgement mode. Defaults to `AUTO_ACKNOWLEDGE`. |
| `queueName` | `string` | The name of the queue to consume from. |
| `messageSelector` | `string?` | Optional JMS message selector expression. |

### `TopicConfig`

| Field | Type | Description |
|-------|------|-------------|
| `sessionAckMode` | `AcknowledgementMode` | Session acknowledgement mode. Defaults to `AUTO_ACKNOWLEDGE`. |
| `topicName` | `string` | The name of the topic to subscribe to. |
| `messageSelector` | `string?` | Optional JMS message selector expression. |
| `noLocal` | `boolean` | If true, excludes messages published by this connection. Defaults to `false`. |
| `consumerType` | `ConsumerType` | Consumer type: `DEFAULT`, `DURABLE`, `SHARED`, or `SHARED_DURABLE`. |
| `subscriberName` | `string?` | Subscription name, required for `DURABLE` and `SHARED_DURABLE` types. |
