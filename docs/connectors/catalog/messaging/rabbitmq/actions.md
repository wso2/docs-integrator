---
title: Actions
---

# Actions

The `ballerinax/rabbitmq` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Publish messages, consume messages, and manage queues and exchanges on a RabbitMQ broker. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Client

Publish messages, consume messages, and manage queues and exchanges on a RabbitMQ broker.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | Required | RabbitMQ server hostname (constructor parameter). |
| `port` | `int` | Required | RabbitMQ server AMQP port (constructor parameter). |
| `auth` | `Credentials` | `()` | Username and password credentials for authentication. |
| `virtualHost` | `string` | `()` | The virtual host to connect to. |
| `connectionTimeout` | `decimal` | `()` | Connection timeout in seconds. |
| `handshakeTimeout` | `decimal` | `()` | TLS handshake timeout in seconds. |
| `shutdownTimeout` | `decimal` | `()` | Shutdown timeout in seconds. |
| `heartbeat` | `decimal` | `()` | Heartbeat interval in seconds. |
| `validation` | `boolean` | `true` | Enable constraint validation for messages. |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration for secure connections. |

### Initializing the client

```ballerina
import ballerinax/rabbitmq;

configurable string host = "localhost";
configurable int port = 5672;

rabbitmq:Client rabbitmqClient = check new (host, port);
```

### Operations

#### Queue management

<details>
<summary>queueDeclare</summary>

Declares a queue on the RabbitMQ server. Creates the queue if it does not exist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name of the queue to declare. |
| `config` | `QueueConfig?` | No | Queue configuration. Defaults: `durable: true`, `exclusive: false`, `autoDelete: false`. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->queueDeclare("OrderQueue");
```

</details>

<details>
<summary>queueAutoGenerate</summary>

Declares a queue with a server-generated unique name and returns the name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `string|error`

Sample code:

```ballerina
string generatedQueueName = check rabbitmqClient->queueAutoGenerate();
```

Sample response:

```ballerina
"amq.gen-Xa2Kh5Q7F3mR1s0T"
```

</details>

<details>
<summary>queueDelete</summary>

Deletes a queue from the RabbitMQ server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue to delete. |
| `ifUnused` | `boolean` | No | Delete only if the queue has no consumers. |
| `ifEmpty` | `boolean` | No | Delete only if the queue is empty. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->queueDelete("OrderQueue");
```

</details>

<details>
<summary>queuePurge</summary>

Removes all messages from a queue without deleting the queue itself.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue to purge. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->queuePurge("OrderQueue");
```

</details>

#### Exchange management

<details>
<summary>exchangeDeclare</summary>

Declares an exchange on the RabbitMQ server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name of the exchange to declare. |
| `exchangeType` | `ExchangeType` | No | The exchange type: `DIRECT_EXCHANGE`, `FANOUT_EXCHANGE`, `TOPIC_EXCHANGE`, or `HEADERS_EXCHANGE`. |
| `config` | `ExchangeConfig?` | No | Exchange configuration. Defaults: `durable: true`, `autoDelete: false`. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->exchangeDeclare("OrderExchange", rabbitmq:TOPIC_EXCHANGE);
```

</details>

<details>
<summary>exchangeDelete</summary>

Deletes an exchange from the RabbitMQ server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `exchangeName` | `string` | Yes | The name of the exchange to delete. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->exchangeDelete("OrderExchange");
```

</details>

<details>
<summary>queueBind</summary>

Binds a queue to an exchange with a routing/binding key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue to bind. |
| `exchangeName` | `string` | Yes | The name of the exchange to bind to. |
| `bindingKey` | `string` | Yes | The binding key for the queue-exchange binding. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->queueBind("OrderQueue", "OrderExchange", "orders.#");
```

</details>

#### Publish

<details>
<summary>publishMessage</summary>

Publishes a message to a queue or exchange with the specified routing key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `AnydataMessage` | Yes | The message to publish, containing `content`, `routingKey`, and optionally `exchange` and `properties`. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->publishMessage({
    content: "Hello from Ballerina",
    routingKey: "OrderQueue"
});
```

</details>

#### Consume

<details>
<summary>consumeMessage</summary>

Synchronously retrieves a single message from a queue, including metadata.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The queue to consume from. |
| `autoAck` | `boolean` | No | If `true`, the message is automatically acknowledged. |
| `T` | `typedesc` | No | Expected message type for data binding. |

Returns: `AnydataMessage|error`

Sample code:

```ballerina
rabbitmq:AnydataMessage message = check rabbitmqClient->consumeMessage("OrderQueue");
```

Sample response:

```ballerina
{"content": "Hello from Ballerina", "routingKey": "OrderQueue", "exchange": "", "deliveryTag": 1}
```

</details>

<details>
<summary>consumePayload</summary>

Synchronously retrieves only the payload content from a queue message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The queue to consume from. |
| `autoAck` | `boolean` | No | If `true`, the message is automatically acknowledged. |
| `T` | `typedesc<anydata>` | No | Expected payload type for data binding. |

Returns: `anydata|error`

Sample code:

```ballerina
string payload = check rabbitmqClient->consumePayload("OrderQueue");
```

Sample response:

```ballerina
"Hello from Ballerina"
```

</details>

#### Acknowledgement

<details>
<summary>basicAck</summary>

Acknowledges one or more received messages by delivery tag or message reference.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ackTarget` | `AnydataMessage|int` | Yes | The message or delivery tag to acknowledge. |
| `multiple` | `boolean` | No | If `true`, acknowledges all messages up to and including the given delivery tag. |

Returns: `Error?`

Sample code:

```ballerina
rabbitmq:AnydataMessage message = check rabbitmqClient->consumeMessage("OrderQueue", autoAck = false);
check rabbitmqClient->basicAck(message);
```

</details>

<details>
<summary>basicNack</summary>

Rejects one or more received messages, optionally requeuing them.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ackTarget` | `AnydataMessage|int` | Yes | The message or delivery tag to reject. |
| `multiple` | `boolean` | No | If `true`, rejects all messages up to and including the given delivery tag. |
| `requeue` | `boolean` | No | If `true`, rejected messages are requeued rather than discarded. |

Returns: `Error?`

Sample code:

```ballerina
rabbitmq:AnydataMessage message = check rabbitmqClient->consumeMessage("OrderQueue", autoAck = false);
check rabbitmqClient->basicNack(message, requeue = true);
```

</details>

#### Connection lifecycle

<details>
<summary>close</summary>

Closes the RabbitMQ client channel and connection gracefully.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `closeCode` | `int?` | No | The close code to send to the server. |
| `closeMessage` | `string?` | No | The close message to send to the server. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->close();
```

</details>

<details>
<summary>abort</summary>

Force-closes the client connection, discarding any pending operations or exceptions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `closeCode` | `int?` | No | The close code. |
| `closeMessage` | `string?` | No | The close message. |

Returns: `Error?`

Sample code:

```ballerina
check rabbitmqClient->'abort();
```

</details>
