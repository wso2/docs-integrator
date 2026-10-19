---
title: Triggers
---

# Triggers

The `ballerinax/java.jms` connector supports event-driven message consumption through a `jms:Listener`. When messages arrive on the queue or topic configured for the listener, the listener dispatches them to your service's `onMessage` callback automatically; no polling loop required.

Three components work together:

| Component | Role |
|-----------|------|
| `jms:Listener` | Connects to the JMS broker and listens for incoming messages on a single queue or topic. |
| `jms:Service` | Defines the `onMessage` callback invoked for each received message. |
| `jms:Caller` | Provides message acknowledgement and transaction control within service callbacks. |
| `jms:Message` | The message payload passed to the `onMessage` callback. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `java.jms:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener is initialized with `MessageListenerConfigurations`, passed as named arguments to `new`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionConfig` | `ConnectionConfiguration` | Required | Configures the JMS broker connection for the listener. |
| `acknowledgementMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | Session acknowledgement mode: `AUTO_ACKNOWLEDGE`, `CLIENT_ACKNOWLEDGE`, `SESSION_TRANSACTED`, or `DUPS_OK_ACKNOWLEDGE`. |
| `consumerOptions` | `ConsumerOptions` | Required | The queue or topic to consume from, plus the underlying consumer options. |

`ConnectionConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `initialContextFactory` | `string` | Required | JNDI initial context factory class (e.g., `org.apache.activemq.jndi.ActiveMQInitialContextFactory`). |
| `providerUrl` | `string` | Required | JMS provider URL (e.g., `tcp://localhost:61616`). |
| `connectionFactoryName` | `string` | `"ConnectionFactory"` | JNDI name of the connection factory. |
| `username` | `string` | `()` | Username for broker authentication. |
| `password` | `string` | `()` | Password for broker authentication. |
| `properties` | `map<string>` | `{}` | Additional JNDI properties. |

`ConsumerOptions` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `destination` | `Destination` | Required | The queue or topic to consume from. |
| `type` | `ConsumerType` | `DEFAULT` | Consumer type: `DEFAULT`, `DURABLE`, `SHARED`, or `SHARED_DURABLE`. Non-default types require a `TOPIC` destination. |
| `messageSelector` | `string` | `""` | JMS message selector expression to filter messages. |
| `noLocal` | `boolean` | `false` | If true, excludes messages published by this connection. |
| `subscriberName` | `string` | `()` | Subscription name, required for `DURABLE`, `SHARED`, and `SHARED_DURABLE` types. |

### Initializing the listener

**Basic listener with ActiveMQ:**

```ballerina
import ballerinax/java.jms;

configurable string providerUrl = ?;

listener jms:Listener jmsListener = check new (
    connectionConfig = {
        initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
        providerUrl: providerUrl
    },
    consumerOptions = {
        destination: {
            'type: jms:QUEUE,
            name: "orders"
        }
    }
);
```

**Listener with authentication:**

```ballerina
import ballerinax/java.jms;

configurable string providerUrl = ?;
configurable string username = ?;
configurable string password = ?;

listener jms:Listener jmsListener = check new (
    connectionConfig = {
        initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
        providerUrl: providerUrl,
        username: username,
        password: password
    },
    consumerOptions = {
        destination: {
            'type: jms:QUEUE,
            name: "orders"
        }
    }
);
```

---

## Service

A `jms:Service` is a Ballerina service attached to a `jms:Listener`. The queue or topic to consume from, the session acknowledgement mode, and optional message selectors are configured on the listener (`consumerOptions` and `acknowledgementMode`), so each listener consumes from a single destination.

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

listener jms:Listener jmsListener = check new (
    connectionConfig = {
        initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
        providerUrl: providerUrl
    },
    acknowledgementMode = jms:CLIENT_ACKNOWLEDGE,
    consumerOptions = {
        destination: {
            'type: jms:QUEUE,
            name: "orders"
        }
    }
);

service "order-processor" on jmsListener {
    remote function onMessage(jms:Message message, jms:Caller caller) returns error? {
        if message is jms:BytesMessage {
            string textContent = check string:fromBytes(message.content);
            log:printInfo("Received order", content = textContent);
        } else if message is jms:TextMessage {
            log:printInfo("Received text message", content = message.content);
        } else if message is jms:MapMessage {
            log:printInfo("Received map message", content = message.content.toString());
        }
        check caller->acknowledge(message);
    }
}
```

Set `consumerOptions.destination` to `{'type: jms:QUEUE, name: ...}` for queue consumption or `{'type: jms:TOPIC, name: ...}` for topic subscription. For durable topic subscriptions, also set `'type: jms:DURABLE` in `consumerOptions` and provide a `subscriberName`.

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
| `properties` | `map<anydata>?` | Application-defined message properties. |

`Message` has no body field. Received messages are one of the following subtypes, each of which includes all `Message` fields plus a `content` field:

| Type | `content` type | Description |
|------|----------------|-------------|
| `TextMessage` | `string` | Text message body. |
| `MapMessage` | `map<anydata>` | Map message body. |
| `BytesMessage` | `byte[]` | Binary message body. |

### `Destination`

| Field | Type | Description |
|-------|------|-------------|
| `type` | `DestinationType` | Destination type: `QUEUE`, `TEMPORARY_QUEUE`, `TOPIC`, or `TEMPORARY_TOPIC`. |
| `name` | `string?` | The destination name (not required for temporary destinations). |
