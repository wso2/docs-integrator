---
title: Actions
---

# Actions

The `ballerinax/solace` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Message Producer`](#message-producer) | Publishes messages to Solace queues and topics with optional transacted session support. |
| [`Message Consumer`](#message-consumer) | Consumes messages from Solace queues and topics with blocking/non-blocking receive and data binding. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Message producer

Publishes messages to Solace queues and topics with optional transacted session support. Unlike the consumer and listener, the destination isn't fixed at connection time — you supply it on every `send` call.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `messageVpn` | `string` | `"default"` | Solace message VPN name. |
| `auth` | `BasicAuthConfiguration\|KerberosConfiguration\|OAuth2Configuration` | Required | Authentication configuration. See [Supporting types](triggers.md#supporting-types). |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |
| `clientName` | `string` | `()` | Client identifier reported to the broker. A unique name is generated when omitted. |
| `clientDescription` | `string` | `"Ballerina Solace Connector"` | A description for the application client. |
| `transacted` | `boolean` | `false` | Enable a transacted session for `commit`/`rollback` control over sent messages. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0-9, where 0 is no compression). |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfiguration` | `()` | Reconnection retry configuration. |
| `generateSendTimestamps` | `boolean` | `false` | Attach a broker-visible send timestamp to every outgoing message. |
| `generateSequenceNumbers` | `boolean` | `false` | Attach an auto-incrementing sequence number to every outgoing message. |

### Initializing the client

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string solaceUsername = ?;
configurable string solacePassword = ?;

final solace:MessageProducer solaceProducer = check new (
    solaceUrl,
    auth = {username: solaceUsername, password: solacePassword}
);
```

### Operations

#### Messaging

<details>
<summary>send</summary>

Publishes a message to the given destination (queue or topic).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `solace:Message` | Yes | The message to send, containing the payload and optional properties. |
| `destination` | `solace:Destination` | Yes | The target `Topic` or `Queue` to publish to. |

Returns: `solace:Error?`

Sample code:

```ballerina
check solaceProducer->send(
    {payload: "Hello from Solace!", correlationId: "order-123"},
    {topicName: "orders/created"}
);
```

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all messages sent since the last commit or rollback in the current transacted session. Requires `transacted = true` on the producer configuration.

Returns: `solace:Error?`

Sample code:

```ballerina
check solaceProducer->send({payload: "message-1"}, {queueName: "orders"});
check solaceProducer->send({payload: "message-2"}, {queueName: "orders"});
check solaceProducer->'commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back all messages sent since the last commit or rollback in the current transacted session. Requires `transacted = true` on the producer configuration.

Returns: `solace:Error?`

Sample code:

```ballerina
check solaceProducer->'rollback();
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the producer and releases the underlying broker session.

Returns: `solace:Error?`

Sample code:

```ballerina
check solaceProducer->close();
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
| `clientDescription` | `string` | `"Ballerina Solace Connector"` | A description for the application client. |
| `transacted` | `boolean` | `false` | Enable a transacted session for `commit`/`rollback` control over received messages. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0-9, where 0 is no compression). |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfiguration` | `()` | Reconnection retry configuration. |
| `generateReceiveTimestamps` | `boolean` | `false` | Populate `receiveTimestamp` on every received message. |
| `calculateMessageExpiration` | `boolean` | `false` | Populate `expiration` on every received message. |

`QueueConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `queueName` | `string` | `()` | The name of the durable queue to consume from. Must already exist on the broker. |
| `durability` | `Durability` | `DURABLE` | `DURABLE` for a named, broker-provisioned queue, or `TEMPORARY` for a broker-generated temporary queue. |
| `ackMode` | `AcknowledgementMode` | `AUTO_ACK` | `AUTO_ACK` acknowledges automatically on receive; `CLIENT_ACK` requires an explicit `ack` call. |
| `messageSelector` | `string` | `()` | SQL-92 message selector expression. Only matching messages are delivered. |
| `transportWindowSize` | `int` | `255` | Maximum number of guaranteed messages the broker can have in flight, unacknowledged. |
| `ackThreshold` | `int` | `60` | Percentage of `transportWindowSize` consumed before an automatic acknowledgement is sent. |
| `ackTimer` | `decimal` | `()` | Maximum time to hold an unacknowledged message before sending an automatic acknowledgement. |
| `reconnectTries` | `int` | `-1` | Number of reconnection attempts after a flow failure. `-1` retries indefinitely. |
| `reconnectRetryInterval` | `decimal` | `3.0` | Delay in seconds between reconnection attempts. |

`TopicConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `topicName` | `string` | Required | The name of the topic to subscribe to. |
| `durability` | `Durability` | `TEMPORARY` | `TEMPORARY` for a direct, at-most-once subscription, or `DURABLE` for a durable topic endpoint. |
| `endpointName` | `string` | `()` | The durable topic endpoint name. Required when `durability` is `DURABLE`. |
| `ackMode` | `AcknowledgementMode` | `AUTO_ACK` | `AUTO_ACK` acknowledges automatically on receive; `CLIENT_ACK` requires an explicit `ack` call. |
| `messageSelector` | `string` | `()` | SQL-92 message selector expression. Not supported on a `TEMPORARY` (direct) topic subscription. |
| `transportWindowSize` | `int` | `255` | Maximum number of guaranteed messages the broker can have in flight, unacknowledged. |
| `ackThreshold` | `int` | `60` | Percentage of `transportWindowSize` consumed before an automatic acknowledgement is sent. |
| `ackTimer` | `decimal` | `()` | Maximum time to hold an unacknowledged message before sending an automatic acknowledgement. |
| `reconnectTries` | `int` | `-1` | Number of reconnection attempts after a flow failure. `-1` retries indefinitely. |
| `reconnectRetryInterval` | `decimal` | `3.0` | Delay in seconds between reconnection attempts. |

### Initializing the client

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string solaceUsername = ?;
configurable string solacePassword = ?;

final solace:MessageConsumer solaceConsumer = check new (
    solaceUrl,
    auth = {username: solaceUsername, password: solacePassword},
    subscriptionConfig = {queueName: "orders"}
);
```

### Operations

#### Receiving messages

<details>
<summary>receive</summary>

Blocking receive that waits up to the given timeout for a message. Returns `()` if no message arrives within the timeout period. Supports data binding through the type parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `decimal` | No | Maximum time in seconds to wait for a message. Waits indefinitely when omitted. |
| `T` | `typedesc<solace:Message>` | No | Expected message type for data binding. |

Returns: `T|solace:Error?`

Sample code:

```ballerina
solace:Message|() message = check solaceConsumer->receive(5.0);
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
| `T` | `typedesc<solace:Message>` | No | Expected message type for data binding. |

Returns: `T|solace:Error?`

Sample code:

```ballerina
solace:Message|() message = check solaceConsumer->receiveNoWait();
```

</details>

#### Acknowledgement

<details>
<summary>ack</summary>

Acknowledges a received message. Required when `ackMode` is `CLIENT_ACK`; has no effect on a transacted session.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `solace:Message` | Yes | The message to acknowledge. |

Returns: `solace:Error?`

Sample code:

```ballerina
solace:Message|() message = check solaceConsumer->receive(5.0);
if message is solace:Message {
    check solaceConsumer->ack(message);
}
```

</details>

<details>
<summary>nack</summary>

Negatively acknowledges a received message. Requires `ackMode` to be `CLIENT_ACK`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `solace:Message` | Yes | The message to negatively acknowledge. |
| `requeue` | `boolean` | No | When `true` (the default), the broker redelivers the message. When `false`, the broker routes it to the dead message queue. |

Returns: `solace:Error?`

Sample code:

```ballerina
solace:Message|() message = check solaceConsumer->receive(5.0);
if message is solace:Message {
    check solaceConsumer->nack(message, requeue = false);
}
```

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all messages received since the last commit or rollback in the current transacted session. Requires `transacted = true` on the consumer configuration.

Returns: `solace:Error?`

Sample code:

```ballerina
solace:Message|() msg1 = check solaceConsumer->receive(5.0);
solace:Message|() msg2 = check solaceConsumer->receive(5.0);
check solaceConsumer->'commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back the current transacted session. Every message received since the last commit or rollback is redelivered. Requires `transacted = true` on the consumer configuration.

Returns: `solace:Error?`

Sample code:

```ballerina
check solaceConsumer->'rollback();
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the consumer and releases the underlying broker session.

Returns: `solace:Error?`

Sample code:

```ballerina
check solaceConsumer->close();
```

</details>

<details>
<summary>destinationName</summary>

Returns the resolved name of the subscribed destination. Useful for reading a broker-generated temporary queue name, for example, to publish it as a `replyTo` destination.

Returns: `string`

Sample code:

```ballerina
string destination = solaceConsumer->destinationName();
```

</details>
