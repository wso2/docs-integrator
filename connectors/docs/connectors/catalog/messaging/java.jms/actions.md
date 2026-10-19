---
title: Actions
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
| `username` | `string` | `()` | Username for broker authentication. |
| `password` | `string` | `()` | Password for broker authentication. |
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

</details>

<details>
<summary>start</summary>

Starts the connection, enabling message delivery.

Returns: `jms:Error?`

Sample code:

```ballerina
check connection->start();
```

</details>

<details>
<summary>stop</summary>

Temporarily stops message delivery on the connection.

Returns: `jms:Error?`

Sample code:

```ballerina
check connection->stop();
```

</details>

<details>
<summary>close</summary>

Closes the connection and releases all resources.

Returns: `jms:Error?`

Sample code:

```ballerina
check connection->close();
```

</details>

---

## Session

Manages transactions and creates message producers and consumers.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connection` | `jms:Connection` | Required | The JMS connection to create the session from. |
| `ackMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | Session acknowledgement mode. |

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

</details>

<details>
<summary>createConsumer</summary>

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

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all messages sent or received in the current transaction.

Returns: `jms:Error?`

Sample code:

```ballerina
check session->commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back all messages sent or received in the current transaction.

Returns: `jms:Error?`

Sample code:

```ballerina
check session->rollback();
```

</details>

#### Subscription management

<details>
<summary>unsubscribe</summary>

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

</details>

<details>
<summary>close</summary>

Closes the session and releases resources.

Returns: `jms:Error?`

Sample code:

```ballerina
check session->close();
```

</details>

---

## Message producer

Sends messages to JMS queues and topics.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `session` | `jms:Session` | Required | The JMS session used to create this producer. |
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

Sends a message to the producer's default destination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `Message` | Yes | The JMS message to send. Content can be `string`, `map`, or `byte[]`. |

Returns: `jms:Error?`

Sample code:

```ballerina
check producer->send({
    content: "Hello from Ballerina!"
});
```

</details>

<details>
<summary>sendTo</summary>

Sends a message to a specified destination, overriding the default.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `destination` | `Destination` | Yes | The target queue or topic. |
| `message` | `Message` | Yes | The JMS message to send. |

Returns: `jms:Error?`

Sample code:

```ballerina
check producer->sendTo(
    {'type: jms:QUEUE, name: "orders"},
    {content: orderPayload.toJsonString().toBytes()}
);
```

</details>

<details>
<summary>close</summary>

Closes the producer and releases resources.

Returns: `jms:Error?`

Sample code:

```ballerina
check producer->close();
```

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
| `subscriberName` | `string` | `()` | Subscription name, required for `DURABLE` and `SHARED_DURABLE` types. |

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

</details>

<details>
<summary>receiveNoWait</summary>

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

</details>

#### Acknowledgement

<details>
<summary>acknowledge</summary>

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

</details>

<details>
<summary>close</summary>

Closes the consumer and releases resources.

Returns: `jms:Error?`

Sample code:

```ballerina
check consumer->close();
```

</details>
