---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/java.jms` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Connection`](#connection) | Establishes a connection to the JMS broker and creates sessions. |
| [`Session`](#session) | Manages transactions and creates message producers and consumers. |
| [`Message Producer`](#message-producer) | Sends messages to JMS queues and topics. |
| [`Message Consumer`](#message-consumer) | Receives and acknowledges messages from JMS queues and topics. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Connection

Establishes a connection to the JMS broker and creates sessions.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `initialContextFactory` | `string` | Required | JNDI initial context factory class (e.g., `org.apache.activemq.jndi.ActiveMQInitialContextFactory`). |
| `providerUrl` | `string` | Required | JMS provider URL (e.g., `tcp://localhost:61616`). |
| `connectionFactoryName` | `string` | `"ConnectionFactory"` | JNDI name of the connection factory. |
| `username` | `string` | Optional | Username for broker authentication. |
| `password` | `string` | Optional | Password for broker authentication. |
| `properties` | `map<string>` | `{}` | Additional JNDI properties. |

### Initializing the client

```ballerina
import ballerinax/java.jms;

configurable string providerUrl = ?;

jms:Connection connection = check new ({
    initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl: providerUrl
});
```

### Operations

#### Connection lifecycle

<details>
<summary>createSession</summary>

<div>

Creates a new JMS session with the specified acknowledgement mode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ackMode` | `AcknowledgementMode` | No | Session acknowledgement mode. One of `AUTO_ACKNOWLEDGE`, `CLIENT_ACKNOWLEDGE`, `SESSION_TRANSACTED`, or `DUPS_OK_ACKNOWLEDGE`. |

Returns: `jms:Session|jms:Error`

Sample code:

```ballerina
jms:Session session = check connection->createSession(jms:AUTO_ACKNOWLEDGE);
```

Sample response:

```ballerina
jms:Session object
```

</div>

</details>

<details>
<summary>start</summary>

<div>

Starts the connection, enabling message delivery.


Returns: `jms:Error?`

Sample code:

```ballerina
check connection->'start();
```

</div>

</details>

<details>
<summary>stop</summary>

<div>

Temporarily stops message delivery on the connection.


Returns: `jms:Error?`

Sample code:

```ballerina
check connection->stop();
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Closes the connection and releases all resources.


Returns: `jms:Error?`

Sample code:

```ballerina
check connection->close();
```

</div>

</details>

---

## Session

Manages transactions and creates message producers and consumers.

### Configuration

A `Session` has no public constructor. Create it with `connection->createSession(ackMode)`:

| Parameter | Type | Default | Description |
|-------|------|---------|-------------|
| `ackMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | Session acknowledgement mode: `AUTO_ACKNOWLEDGE`, `CLIENT_ACKNOWLEDGE`, `SESSION_TRANSACTED`, or `DUPS_OK_ACKNOWLEDGE`. |

### Initializing the client

```ballerina
import ballerinax/java.jms;

// Sessions are typically created from a Connection:
jms:Session session = check connection->createSession(jms:AUTO_ACKNOWLEDGE);
```

### Operations

#### Producer and consumer creation

<details>
<summary>createProducer</summary>

<div>

Creates a message producer, optionally bound to a default destination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `Destination?` | No | Default destination for the producer. If omitted, a destination must be specified per message. |

Returns: `jms:MessageProducer|jms:Error`

Sample code:

```ballerina
jms:MessageProducer producer = check session.createProducer();
```

Sample response:

```ballerina
jms:MessageProducer object
```

</div>

</details>

<details>
<summary>createConsumer</summary>

<div>

Creates a message consumer for the specified destination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `Destination` | Yes | The queue or topic to consume from. |
| `type` | `ConsumerType` | No | Consumer type: `DEFAULT`, `DURABLE`, `SHARED`, or `SHARED_DURABLE`. |
| `messageSelector` | `string` | No | JMS message selector expression to filter messages. |
| `noLocal` | `boolean` | No | If true, messages published by this connection's producers are not delivered. |
| `subscriberName` | `string` | No | Subscription name, required for durable and shared-durable consumers. |

Returns: `jms:MessageConsumer|jms:Error`

Sample code:

```ballerina
jms:MessageConsumer consumer = check session.createConsumer(
    destination = {'type: jms:QUEUE, name: "orders"}
);
```

Sample response:

```ballerina
jms:MessageConsumer object
```

</div>

</details>

#### Transaction control

<details>
<summary>commit</summary>

<div>

Commits all messages sent or received in the current transaction.


Returns: `jms:Error?`

Sample code:

```ballerina
check session->'commit();
```

</div>

</details>

<details>
<summary>rollback</summary>

<div>

Rolls back all messages sent or received in the current transaction.


Returns: `jms:Error?`

Sample code:

```ballerina
check session->'rollback();
```

</div>

</details>

#### Subscription management

<details>
<summary>unsubscribe</summary>

<div>

Removes a durable subscription by its subscription identifier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionId` | `string` | Yes | The name of the durable subscription to remove. |

Returns: `jms:Error?`

Sample code:

```ballerina
check session->unsubscribe("my-durable-sub");
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Closes the session and releases resources.


Returns: `jms:Error?`

Sample code:

```ballerina
check session->close();
```

</div>

</details>

---

## Message producer

Sends messages to JMS queues and topics.

### Configuration

A `MessageProducer` has no public constructor. Create it with `session.createProducer(destination)`:

| Parameter | Type | Default | Description |
|-------|------|---------|-------------|
| `destination` | `Destination?` | `()` | Default destination. If set, `send` uses this destination. |

### Initializing the client

```ballerina
import ballerinax/java.jms;

// Producers are typically created from a Session:
jms:MessageProducer producer = check session.createProducer();
```

### Operations

#### Send operations

<details>
<summary>send</summary>

<div>

Sends a message to the producer's default destination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `Message` | Yes | The JMS message to send: a `jms:TextMessage` (`string` content), `jms:MapMessage` (`map<anydata>` content), or `jms:BytesMessage` (`byte[]` content). |

Returns: `jms:Error?`

Sample code:

```ballerina
jms:TextMessage message = {
    content: "Hello from Ballerina!"
};
check producer->send(message);
```

</div>

</details>

<details>
<summary>sendTo</summary>

<div>

Sends a message to a specified destination, overriding the default.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `Destination` | Yes | The target queue or topic. |
| `message` | `Message` | Yes | The JMS message to send. |

Returns: `jms:Error?`

Sample code:

```ballerina
jms:BytesMessage message = {
    content: orderPayload.toJsonString().toBytes()
};
check producer->sendTo({'type: jms:QUEUE, name: "orders"}, message);
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Closes the producer and releases resources.


Returns: `jms:Error?`

Sample code:

```ballerina
check producer->close();
```

</div>

</details>

---

## Message consumer

Receives and acknowledges messages from JMS queues and topics.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `destination` | `Destination` | Required | The queue or topic to consume from. |
| `type` | `ConsumerType` | `DEFAULT` | Consumer type: `DEFAULT`, `DURABLE`, `SHARED`, or `SHARED_DURABLE`. |
| `messageSelector` | `string` | `""` | JMS message selector expression to filter messages. |
| `noLocal` | `boolean` | `false` | If true, excludes messages published by this connection's own producers. |
| `subscriberName` | `string` | Optional | Subscription name, required for `DURABLE` and `SHARED_DURABLE` types. |

### Initializing the client

```ballerina
import ballerinax/java.jms;

// Consumers are typically created from a Session:
jms:MessageConsumer consumer = check session.createConsumer(
    destination = {'type: jms:QUEUE, name: "orders"}
);
```

### Operations

#### Receive operations

<details>
<summary>receive</summary>

<div>

Receives the next message from the destination, blocking until a message arrives or the timeout expires.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeoutMillis` | `int` | No | Maximum time to wait in milliseconds. Defaults to `10000`. |

Returns: `jms:Message|jms:Error?`

Sample code:

```ballerina
jms:Message? message = check consumer->receive(5000);
```

Sample response:

```ballerina
{"messageId": "ID:localhost-12345-1234567890", "timestamp": 1710600000000, "content": "Hello from Ballerina!", "priority": 4, "redelivered": false}
```

</div>

</details>

<details>
<summary>receiveNoWait</summary>

<div>

Receives the next available message without blocking. Returns `()` if no message is available.


Returns: `jms:Message|jms:Error?`

Sample code:

```ballerina
jms:Message? message = check consumer->receiveNoWait();
```

Sample response:

```ballerina
{"messageId": "ID:localhost-12345-1234567891", "timestamp": 1710600001000, "content": {"orderId": "ORD-001", "item": "Pizza"}, "priority": 4}
```

</div>

</details>

#### Acknowledgement

<details>
<summary>acknowledge</summary>

<div>

Acknowledges a received message. Used when the session is in `CLIENT_ACKNOWLEDGE` mode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `Message` | Yes | The message to acknowledge. |

Returns: `jms:Error?`

Sample code:

```ballerina
check consumer->acknowledge(message);
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Closes the consumer and releases resources.


Returns: `jms:Error?`

Sample code:

```ballerina
check consumer->close();
```

</div>

</details>
