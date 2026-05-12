---
title: Actions
---

# Actions

The `ballerinax/nats` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Connects to a NATS server to publish messages and perform request-reply exchanges. |
| [`JetStreamClient`](#jetstreamclient) | Manages JetStream streams and publishes or pull-consumes persistent messages. |

---

## Client

Connects to a NATS server to publish messages and perform request-reply exchanges.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | `string|string[]` | Required | NATS server URL (e.g., `"nats://localhost:4222"`) or a list of URLs for clustering. Use the constant `nats:DEFAULT_URL` for the default local server. |
| `connectionName` | `string` | `"ballerina-nats"` | A human-readable name for this connection, useful for server-side monitoring. |
| `auth` | `Credentials|Tokens|()` | `()` | Authentication configuration. Use `nats:Credentials` for username/password or `nats:Tokens` for token-based auth. |
| `retryConfig` | `RetryConfig?` | `()` | Reconnection retry settings including `maxReconnect`, `reconnectWait`, and `connectionTimeout`. |
| `ping` | `Ping?` | `()` | Ping interval configuration with `pingInterval` (seconds) and `maxPingsOut` fields. |
| `secureSocket` | `SecureSocket?` | `()` | TLS/SSL configuration with CA certificate, client certificate, and key paths. |
| `inboxPrefix` | `string` | `"_INBOX."` | Prefix used for reply-to subjects in request/reply messaging. |
| `noEcho` | `boolean` | `false` | When true, the server will not echo messages back to the connection that published them. |
| `validation` | `boolean` | `true` | Enables payload validation on message receive. |

### Initializing the client

```ballerina
import ballerinax/nats;

configurable string natsUrl = "nats://localhost:4222";
configurable string username = ?;
configurable string password = ?;

nats:Client natsClient = check new (natsUrl,
    auth = {
        username: username,
        password: password
    },
    connectionName = "my-ballerina-client"
);
```

### Operations

#### Publish

<details>
<summary>publishMessage</summary>

Publishes a message to a NATS subject. This is a fire-and-forget operation; no acknowledgement is returned by the broker.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `AnydataMessage` | Yes | The message to publish. Must include a `subject` and `content` (any Ballerina `anydata` value). Optionally set `replyTo` to specify a reply subject. |

Returns: `Error?`

Sample code:

```ballerina
import ballerina/io;
import ballerinax/nats;

public function main() returns error? {
    nats:Client natsClient = check new (nats:DEFAULT_URL);

    check natsClient->publishMessage({
        content: "Hello, NATS!".toBytes(),
        subject: "demo.greet"
    });

    io:println("Message published successfully.");
    check natsClient->close();
}
```

</details>

#### Request-Reply

<details>
<summary>requestMessage</summary>

Sends a request message to a subject and waits for a single reply, implementing the request-reply messaging pattern. The caller blocks until a reply is received or the timeout expires.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `AnydataMessage` | Yes | The request message with a `subject` and `content`. The `replyTo` field is automatically set by the client. |
| `duration` | `decimal?` | No | Timeout in seconds to wait for a reply. If `()`, waits indefinitely. |
| `T` | `typedesc` | No | The expected type of the returned message. Defaults to `nats:AnydataMessage`. |

Returns: `T|Error`

Sample code:

```ballerina
import ballerina/io;
import ballerinax/nats;

public function main() returns error? {
    nats:Client natsClient = check new (nats:DEFAULT_URL);

    nats:AnydataMessage reply = check natsClient->requestMessage(
        {content: "ping".toBytes(), subject: "demo.echo"},
        5.0  // timeout: 5 seconds
    );

    string replyContent = check string:fromBytes(<byte[]>reply.content);
    io:println("Reply received: ", replyContent);
    check natsClient->close();
}
```

Sample response:

```ballerina
{"content": [112, 111, 110, 103], "subject": "_INBOX.abc123", "replyTo": ()}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the connection to the NATS server and releases all associated resources.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `Error?`

Sample code:

```ballerina
check natsClient->close();
```

</details>

---

## JetStreamClient

Manages JetStream streams and publishes or pull-consumes persistent messages.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `natsClient` | `nats:Client` | Required | An already-initialized `nats:Client` instance. The JetStream client reuses the underlying NATS connection. |
| `name` | `string?` | `()` | Stream name. Must be unique within the JetStream account. |
| `subjects` | `string|string[]?` | `()` | Subject(s) the stream captures. Supports wildcards (e.g., `"orders.*"`). |
| `storageType` | `StorageType?` | `FILE` | Storage backend: `FILE` for disk persistence or `MEMORY` for in-memory storage. |
| `retentionPolicy` | `RetentionPolicy?` | `LIMITS` | Retention policy: `LIMITS` (size/age-based), `INTEREST` (consumer-based), or `WORKQUEUE` (consume-once). |
| `maxMsgs` | `float?` | `()` | Maximum number of messages retained in the stream. |
| `maxBytes` | `float?` | `()` | Maximum total bytes retained in the stream. |
| `maxAge` | `decimal?` | `()` | Maximum age of messages in nanoseconds before they are removed. |
| `replicas` | `int?` | `1` | Number of replicas for the stream in a clustered deployment. |

### Initializing the client

```ballerina
import ballerinax/nats;

configurable string natsUrl = "nats://localhost:4222";

// First create the core NATS client
nats:Client natsClient = check new (natsUrl);

// Then create the JetStream client from the core client
nats:JetStreamClient jsClient = check new (natsClient);

// Create a stream before publishing
check jsClient->addStream({
    name: "ORDERS",
    subjects: "orders.*",
    storageType: nats:FILE,
    retentionPolicy: nats:LIMITS
});
```

### Operations

#### Stream management

<details>
<summary>addStream</summary>

Creates a new JetStream stream with the specified configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `streamConfig` | `StreamConfiguration` | Yes | Configuration for the new stream including name, subjects, storage type, and retention policy. |

Returns: `Error?`

Sample code:

```ballerina
check jsClient->addStream({
    name: "EVENTS",
    subjects: ["events.>"],
    storageType: nats:FILE,
    maxMsgs: 1000000.0,
    maxAge: 86400000000000.0  // 24 hours in nanoseconds
});
```

</details>

<details>
<summary>updateStream</summary>

Updates the configuration of an existing JetStream stream.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `streamConfig` | `StreamConfiguration` | Yes | Updated stream configuration. The `name` field must match an existing stream. |

Returns: `Error?`

Sample code:

```ballerina
check jsClient->updateStream({
    name: "ORDERS",
    subjects: "orders.*",
    maxMsgs: 500000.0
});
```

</details>

<details>
<summary>deleteStream</summary>

Permanently deletes a JetStream stream and all its messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `streamName` | `string` | Yes | The name of the stream to delete. |

Returns: `Error?`

Sample code:

```ballerina
check jsClient->deleteStream("ORDERS");
```

</details>

<details>
<summary>purgeStream</summary>

Removes all messages from a JetStream stream without deleting the stream itself.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `streamName` | `string` | Yes | The name of the stream to purge. |

Returns: `Error?`

Sample code:

```ballerina
check jsClient->purgeStream("ORDERS");
```

</details>

#### Persistent messaging

<details>
<summary>publishMessage</summary>

Publishes a message to a JetStream subject. The message is persisted according to the stream's retention policy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `JetStreamMessage` | Yes | The message to publish, with `subject` and `content` (byte array) fields. |

Returns: `Error?`

Sample code:

```ballerina
import ballerinax/nats;

public function main() returns error? {
    nats:Client natsClient = check new (nats:DEFAULT_URL);
    nats:JetStreamClient jsClient = check new (natsClient);

    check jsClient->publishMessage({
        subject: "orders.new",
        content: "{\"orderId\": \"ORD-001\", \"amount\": 99.99}".toBytes()
    });
}
```

</details>

<details>
<summary>consumeMessage</summary>

Pull-fetches a single message from a JetStream subject. Blocks until a message is available or the timeout expires.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subject` | `string` | Yes | The JetStream subject to consume from. |
| `timeout` | `decimal` | Yes | Maximum time in seconds to wait for a message. |

Returns: `JetStreamMessage|Error`

Sample code:

```ballerina
nats:JetStreamMessage msg = check jsClient->consumeMessage("orders.new", 5.0);
string payload = check string:fromBytes(msg.content);
io:println("Consumed order: ", payload);

// Acknowledge the message
jsClient->ack(msg);
```

Sample response:

```ballerina
{"subject": "orders.new", "content": [123, 34, 111, 114, 100, 101, 114, 73, 100, 34, 58, 32, 34, 79, 82, 68, 45, 48, 48, 49, 34, 125]}
```

</details>

#### Message acknowledgement

<details>
<summary>ack</summary>

Acknowledges a JetStream message, signalling that it has been successfully processed. The server will not redeliver it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `JetStreamMessage` | Yes | The message to acknowledge. |

Returns: `()`

Sample code:

```ballerina
nats:JetStreamMessage msg = check jsClient->consumeMessage("orders.new", 5.0);
// Process the message...
jsClient->ack(msg);
```

</details>

<details>
<summary>nak</summary>

Negatively acknowledges a JetStream message, indicating processing failure. The server will redeliver the message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `JetStreamMessage` | Yes | The message to negatively acknowledge. |

Returns: `()`

Sample code:

```ballerina
nats:JetStreamMessage msg = check jsClient->consumeMessage("orders.new", 5.0);
// Processing failed: redeliver
jsClient->nak(msg);
```

</details>

<details>
<summary>inProgress</summary>

Informs the server that the message is still being processed, resetting the redelivery timer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `JetStreamMessage` | Yes | The message currently being processed. |

Returns: `()`

Sample code:

```ballerina
nats:JetStreamMessage msg = check jsClient->consumeMessage("orders.new", 30.0);
// Signal work in progress before a slow operation
jsClient->inProgress(msg);
// ... long-running processing ...
jsClient->ack(msg);
```

</details>
