---
title: Actions
---

# Actions

The `ballerinax/solace.jms` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Message Producer`](#message-producer) | Publishes messages to Solace queues and topics with optional session-transacted support. |
| [`Message Consumer`](#message-consumer) | Consumes messages from Solace queues and topics with blocking/non-blocking receive and data binding. |

For event-driven integration, see the [Trigger Reference](triggers.md).

> **Important:** Session-transacted messaging requires `directTransport: false`. Set `directTransport: false` together with `transacted: true` on the producer, or `ackMode: SESSION_TRANSACTED` on the consumer — Solace rejects session-transacted and flow-controlled sessions over direct transport.

---

## Message producer

Publishes messages to Solace queues and topics with optional session-transacted support. The destination can be fixed at connection time, overridden per `send` call, or both.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `messageVpn` | `string` | `"default"` | Solace message VPN name. |
| `auth` | `BasicAuthConfiguration\|KerberosConfiguration\|OAuth2Configuration` | Required | Authentication configuration. See [Supporting types](triggers.md#supporting-types). |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |
| `clientName` | `string` | `()` | Client identifier reported to the broker. A unique name is generated when omitted. |
| `clientDescription` | `string` | `"Ballerina Solace JMS Connector"` | A description for the application client. |
| `enableDynamicDurables` | `boolean` | `false` | Automatically provision durable destinations that don't already exist on the broker. |
| `directTransport` | `boolean` | `true` | Publish over direct (at-most-once) transport. Set to `false` for session-transacted messaging. |
| `directOptimized` | `boolean` | `true` | Optimize the session for direct messaging throughput. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0-9, where 0 is no compression). |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfiguration` | `()` | Reconnection retry configuration. |
| `transacted` | `boolean` | `false` | Enable a session-transacted producer for `commit`/`rollback` control over sent messages. |
| `destination` | `jms:Destination` | `()` | Default `Topic` or `Queue` to publish to. Can be overridden per `send` call. An error is raised if neither is set. |

### Initializing the client

```ballerina
import ballerinax/solace.jms;

configurable string solaceJmsUrl = ?;
configurable string solaceJmsUsername = ?;
configurable string solaceJmsPassword = ?;

final jms:MessageProducer solaceJmsProducer = check new (
    solaceJmsUrl,
    auth = {username: solaceJmsUsername, password: solaceJmsPassword}
);
```

### Operations

#### Messaging

<details>
<summary>send</summary>

Publishes a message to a destination (queue or topic). Uses the per-call `destination` when given, otherwise falls back to the `destination` configured on the producer. Payload conversion: `string`, `map`, and `byte[]` values pass through as-is; `xml` converts to a string; `int`, `boolean`, `float`, and `decimal` convert with `.toString().toBytes()`; other `anydata` values convert to JSON bytes. The connector sets Solace's `JMS_Solace_isXML` message property based on the payload shape.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `jms:Message` | Yes | The message to send, containing the payload and optional properties. |
| `destination` | `jms:Destination` | No | The target `Topic` or `Queue` to publish to. Overrides the producer's configured `destination` for this call only. |

Returns: `jms:Error?`

Sample code:

```ballerina
check solaceJmsProducer->send(
    {payload: "Hello from Solace!", correlationId: "order-123"},
    {topicName: "orders/created"}
);
```

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all messages sent since the last commit or rollback in the current session-transacted producer. Requires `transacted = true` and `directTransport = false` on the producer configuration.

Returns: `jms:Error?`

Sample code:

```ballerina
check solaceJmsProducer->send({payload: "message-1"}, {queueName: "orders"});
check solaceJmsProducer->send({payload: "message-2"}, {queueName: "orders"});
check solaceJmsProducer->'commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back all messages sent since the last commit or rollback in the current session-transacted producer. Requires `transacted = true` and `directTransport = false` on the producer configuration.

Returns: `jms:Error?`

Sample code:

```ballerina
check solaceJmsProducer->'rollback();
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the producer and releases the underlying broker session.

Returns: `jms:Error?`

Sample code:

```ballerina
check solaceJmsProducer->close();
```

</details>

---

## Message consumer

Consumes messages from a single Solace queue or topic, chosen at connection time, with blocking or non-blocking receive and data binding.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subscriptionConfig` | `QueueConfiguration\|TopicConfiguration` | Required | The queue or topic to consume from. |
| `messageVpn` | `string` | `"default"` | Solace message VPN name. |
| `auth` | `BasicAuthConfiguration\|KerberosConfiguration\|OAuth2Configuration` | Required | Authentication configuration. See [Supporting types](triggers.md#supporting-types). |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |
| `clientName` | `string` | `()` | Client identifier reported to the broker. A unique name is generated when omitted. |
| `clientDescription` | `string` | `"Ballerina Solace JMS Connector"` | A description for the application client. |
| `enableDynamicDurables` | `boolean` | `false` | Automatically provision durable destinations that don't already exist on the broker. |
| `directTransport` | `boolean` | `true` | Consume over direct (at-most-once) transport. Set to `false` for session-transacted consumption or flow-control tuning. |
| `directOptimized` | `boolean` | `true` | Optimize the session for direct messaging throughput. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0-9, where 0 is no compression). |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfiguration` | `()` | Reconnection retry configuration. |
| `transportWindowSize` | `int` | `()` | Maximum number of guaranteed messages the broker can have in flight, unacknowledged (1-255). Only applies when `directTransport` is `false`. |
| `ackThreshold` | `int` | `60` | Percentage of `transportWindowSize` consumed before an automatic acknowledgement is sent (1-75). Only applies when `directTransport` is `false`. |
| `ackTimer` | `decimal` | `()` | Maximum time in seconds to hold an unacknowledged message before sending an automatic acknowledgement (0.02-1.5). Only applies when `directTransport` is `false`. |

`QueueConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `queueName` | `string` | `()` | The name of the durable queue to consume from. Must already exist on the broker unless `enableDynamicDurables` is `true`. Required when `durability` is `DURABLE`; not allowed when `durability` is `TEMPORARY`. |
| `durability` | `Durability` | `DURABLE` | `DURABLE` for a named, broker-provisioned queue, or `TEMPORARY` for a broker-generated temporary queue. |
| `ackMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | The JMS session acknowledgement mode. See [Acknowledgement modes](setup-guide.md#acknowledgement-modes). |
| `messageSelector` | `string` | `()` | JMS SQL-92 message selector expression. Only matching messages are delivered. |

`TopicConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `topicName` | `string` | Required | The name of the topic to subscribe to. |
| `durability` | `Durability` | `TEMPORARY` | `TEMPORARY` for a non-durable subscription, or `DURABLE` for a durable topic subscription. |
| `subscriberName` | `string` | `()` | The durable subscription name. Required when `durability` is `DURABLE`. |
| `ackMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | The JMS session acknowledgement mode. See [Acknowledgement modes](setup-guide.md#acknowledgement-modes). |
| `messageSelector` | `string` | `()` | JMS SQL-92 message selector expression. Not supported on a direct (non-`directTransport: false`) topic subscription. |

### Initializing the client

```ballerina
import ballerinax/solace.jms;

configurable string solaceJmsUrl = ?;
configurable string solaceJmsUsername = ?;
configurable string solaceJmsPassword = ?;

final jms:MessageConsumer solaceJmsConsumer = check new (
    solaceJmsUrl,
    auth = {username: solaceJmsUsername, password: solaceJmsPassword},
    subscriptionConfig = {queueName: "orders"}
);
```

### Operations

#### Receiving messages

<details>
<summary>receive</summary>

Blocking receive that waits up to the given timeout for a message. Returns `()` if no message arrives within the timeout period. A nil or `0` timeout blocks indefinitely. Supports data binding through the type parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `decimal` | No | Maximum time in seconds to wait for a message. Waits indefinitely when omitted or `0`. |
| `T` | `typedesc<jms:Message>` | No | Expected message type for data binding. |

Returns: `T|jms:Error?`

Sample code:

```ballerina
jms:Message|() message = check solaceJmsConsumer->receive(5.0);
```

Sample response:

```ballerina
{"payload":"Hello from Solace!","correlationId":"order-123","messageId":"ID:client/1234","destination":{"queueName":"orders"},"redelivered":false}
```

</details>

<details>
<summary>receiveNoWait</summary>

Non-blocking receive that returns immediately. Returns `()` if no message is currently available. Supports data binding through the type parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `T` | `typedesc<jms:Message>` | No | Expected message type for data binding. |

Returns: `T|jms:Error?`

Sample code:

```ballerina
jms:Message|() message = check solaceJmsConsumer->receiveNoWait();
```

</details>

#### Acknowledgement

<details>
<summary>ack</summary>

Acknowledges a received message. Required when `ackMode` is `CLIENT_ACKNOWLEDGE`; has no effect under other acknowledgement modes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `jms:Message` | Yes | The message to acknowledge. |

Returns: `jms:Error?`

Sample code:

```ballerina
jms:Message|() message = check solaceJmsConsumer->receive(5.0);
if message is jms:Message {
    check solaceJmsConsumer->ack(message);
}
```

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all messages received since the last commit or rollback in the current session-transacted consumer. Requires `ackMode = SESSION_TRANSACTED` and `directTransport = false` on the subscription configuration.

Returns: `jms:Error?`

Sample code:

```ballerina
jms:Message|() msg1 = check solaceJmsConsumer->receive(5.0);
jms:Message|() msg2 = check solaceJmsConsumer->receive(5.0);
check solaceJmsConsumer->'commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back the current session-transacted consumer. Every message received since the last commit or rollback is redelivered. Requires `ackMode = SESSION_TRANSACTED` and `directTransport = false` on the subscription configuration.

Returns: `jms:Error?`

Sample code:

```ballerina
check solaceJmsConsumer->'rollback();
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the consumer and releases the underlying broker session.

Returns: `jms:Error?`

Sample code:

```ballerina
check solaceJmsConsumer->close();
```

</details>

<details>
<summary>destinationName</summary>

Returns the resolved name of the subscribed destination. Useful for reading a broker-generated temporary queue name, for example, to publish it as a `replyTo` destination.

Returns: `string`

Sample code:

```ballerina
string destination = solaceJmsConsumer->destinationName();
```

</details>
