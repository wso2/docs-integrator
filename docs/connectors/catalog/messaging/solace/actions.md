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

Publishes messages to Solace queues and topics with optional transacted session support.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `destination` | `Topic\|Queue` | Required | Target destination: either a queue config or a topic config. |
| `messageVpn` | `string` | `"default"` | Solace Message VPN name. |
| `auth` | `BasicAuthConfig\|KerberosConfig\|OAuth2Config` | `()` | Authentication configuration. |
| `transacted` | `boolean` | `false` | Enable transacted session for commit/rollback control. When `true`, `directTransport` must also be set to `false`. |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |
| `clientId` | `string` | `()` | Optional client identifier. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0–9, where 0 is no compression). |
| `retryConfig` | `RetryConfig` | `()` | Reconnection retry configuration. |
| `enableDynamicDurables` | `boolean` | `false` | Allow automatic creation of durable queues and topic endpoints on the broker. |
| `directTransport` | `boolean` | `true` | Use direct (at-most-once) delivery when `true`. Set to `false` for guaranteed (persistent) delivery and when using transacted sessions. |
| `directOptimized` | `boolean` | `true` | Optimize message delivery in direct transport mode by reducing protocol overhead. Only effective when `directTransport` is `true`. |
| `clientDescription` | `string` | `"JNDI"` | A description for the application client. |
| `allowDuplicateClientId` | `boolean` | `false` | Allow the same client ID to be used across multiple connections simultaneously. |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |

### Initializing the client

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string username = ?;
configurable string password = ?;

solace:MessageProducer producer = check new (
    url = solaceUrl,
    destination = {queueName: "my-queue"},
    messageVpn = "default",
    auth = {username: username, password: password}
);
```

### Operations

#### Messaging

<details>
<summary>send</summary>

Publishes a message to the configured destination (queue or topic).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `solace:Message` | Yes | The message to send, containing payload and optional properties. |

Returns: `error?`

Sample code:

```ballerina
check producer->send({
    payload: "Hello from Ballerina!",
    correlationId: "order-123"
});
```

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all pending messages in the current transacted session.

Returns: `error?`

Sample code:

```ballerina
check producer->send({payload: "message-1"});
check producer->send({payload: "message-2"});
check producer->'commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back all pending messages in the current transacted session.

Returns: `error?`

Sample code:

```ballerina
check producer->'rollback();
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the producer and releases all associated resources.

Returns: `error?`

Sample code:

```ballerina
check producer->close();
```

</details>

---

## Message consumer

Consumes messages from Solace queues and topics with blocking/non-blocking receive and data binding.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subscriptionConfig` | `QueueConfig\|TopicConfig` | Required | Subscription target: either a queue config or a topic config. |
| `messageVpn` | `string` | `"default"` | Solace Message VPN name. |
| `auth` | `BasicAuthConfig\|KerberosConfig\|OAuth2Config` | `()` | Authentication configuration. |
| `transacted` | `boolean` | `false` | Enable transacted session for commit/rollback control. When `true`, `directTransport` must also be set to `false`. |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |
| `clientId` | `string` | `()` | Optional client identifier. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0–9, where 0 is no compression). |
| `retryConfig` | `RetryConfig` | `()` | Reconnection retry configuration. |
| `enableDynamicDurables` | `boolean` | `false` | Allow automatic creation of durable queues and topic endpoints on the broker. |
| `directTransport` | `boolean` | `true` | Use direct (at-most-once) delivery when `true`. Set to `false` for guaranteed (persistent) delivery and when using transacted sessions. |
| `directOptimized` | `boolean` | `true` | Optimize message delivery in direct transport mode by reducing protocol overhead. Only effective when `directTransport` is `true`. |
| `clientDescription` | `string` | `"JNDI"` | A description for the application client. |
| `allowDuplicateClientId` | `boolean` | `false` | Allow the same client ID to be used across multiple connections simultaneously. |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |

`QueueConfig` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `queueName` | `string` | Required | The name of the queue to consume messages from. |
| `sessionAckMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | Controls how received messages are acknowledged. Use `CLIENT_ACKNOWLEDGE` for manual acknowledgement via `consumer->acknowledge(message)`, or `SESSION_TRANSACTED` for transacted sessions. |
| `messageSelector` | `string` | `()` | JMS message selector expression. Only messages matching this expression are delivered (e.g., `"priority = 'high'"`). |

`TopicConfig` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `topicName` | `string` | Required | The name of the topic to subscribe to. |
| `consumerType` | `ConsumerType` | `DEFAULT` | Consumer type: `DEFAULT` for a standard subscriber, `DURABLE` for a durable subscriber. |
| `subscriberName` | `string` | `()` | Name used to identify a durable subscription. Required when `consumerType` is `DURABLE`. |
| `noLocal` | `boolean` | `false` | When `true`, messages published on this session's connection are not delivered to this subscriber. |
| `sessionAckMode` | `AcknowledgementMode` | `AUTO_ACKNOWLEDGE` | Controls how received messages are acknowledged. Use `CLIENT_ACKNOWLEDGE` for manual acknowledgement via `consumer->acknowledge(message)`, or `SESSION_TRANSACTED` for transacted sessions. |
| `messageSelector` | `string` | `()` | JMS message selector expression. Only messages matching this expression are delivered. |

### Initializing the client

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string username = ?;
configurable string password = ?;

solace:MessageConsumer consumer = check new (
    url = solaceUrl,
    subscriptionConfig = {queueName: "my-queue"},
    messageVpn = "default",
    auth = {username: username, password: password}
);
```

### Operations

#### Receiving messages

<details>
<summary>receive</summary>

Blocking receive that waits up to the specified timeout for a message. Returns `()` if no message is available within the timeout period. Supports data binding via the type parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `decimal` | No | Maximum time in seconds to wait for a message. Defaults to `10.0`. |
| `T` | `typedesc` | No | Expected message type for data binding. |

Returns: `T|error?`

Sample code:

```ballerina
solace:Message? message = check consumer->receive(5.0);
```

Sample response:

```ballerina
{"payload": "Hello from Ballerina!", "correlationId": "order-123", "messageId": "ID:fe80::1%lo0164b8c7e4ce800001", "timestamp": 1710590400000, "destination": {"queueName": "my-queue"}, "redelivered": false}
```

</details>

<details>
<summary>receiveNoWait</summary>

Non-blocking receive that returns immediately. Returns `()` if no message is currently available. Supports data binding via the type parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `T` | `typedesc` | No | Expected message type for data binding. |

Returns: `T|error?`

Sample code:

```ballerina
solace:Message? message = check consumer->receiveNoWait();
```

Sample response:

```ballerina
{"payload": "Quick message", "destination": {"queueName": "my-queue"}, "redelivered": false}
```

</details>

#### Acknowledgement

<details>
<summary>acknowledge</summary>

Explicitly acknowledges a message. Required when using `CLIENT_ACKNOWLEDGE` mode. Configure `CLIENT_ACKNOWLEDGE` by setting `sessionAckMode = CLIENT_ACKNOWLEDGE` in the `subscriptionConfig` (`QueueConfig` or `TopicConfig`) passed to the consumer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `solace:Message` | Yes | The message to acknowledge. |

Returns: `error?`

Sample code:

```ballerina
solace:Message? message = check consumer->receive(5.0);
if message is solace:Message {
    check consumer->acknowledge(message);
}
```

</details>

#### Transaction control

<details>
<summary>commit</summary>

Commits all received messages in the current transacted session.

Returns: `error?`

Sample code:

```ballerina
solace:Message? msg1 = check consumer->receive(5.0);
solace:Message? msg2 = check consumer->receive(5.0);
check consumer->'commit();
```

</details>

<details>
<summary>rollback</summary>

Rolls back the current transacted session. All uncommitted messages will be redelivered.

Returns: `error?`

Sample code:

```ballerina
check consumer->'rollback();
```

</details>

#### Lifecycle

<details>
<summary>close</summary>

Closes the consumer and releases all associated resources.

Returns: `error?`

Sample code:

```ballerina
check consumer->close();
```

</details>
