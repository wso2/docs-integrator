---
title: Triggers
---

# Triggers

The `ballerinax/nats` connector supports event-driven message consumption through two listener types. A `nats:Listener` subscribes to core NATS subjects and dispatches incoming messages to a `nats:Service`, supporting both one-way consumption and request-reply patterns. A `nats:JetStreamListener` subscribes to JetStream subjects and pushes persisted messages to a `nats:JetStreamService`.

The following components work together:

| Component | Role |
|-----------|------|
| `nats:Listener` | Connects to the NATS server, subscribes to subjects (optionally as part of a queue group), and dispatches incoming messages to attached services. |
| `nats:Service` | Defines `onMessage` or `onRequest` callbacks, plus an optional `onError` callback, invoked when messages arrive on the configured subject. |
| `nats:JetStreamListener` | Wraps an existing `nats:Client` connection and creates push-based JetStream subscriptions for attached services. |
| `nats:JetStreamService` | Defines the `onMessage` callback invoked when a JetStream message arrives on the configured subject. |
| `nats:JetStreamCaller` | Provided to the JetStream `onMessage` callback to acknowledge (`ack`), negatively acknowledge (`nak`), or extend (`inProgress`) a message. |
| `nats:AnydataMessage` | The message passed to `nats:Service` callbacks, containing the content, subject, and optional `replyTo` subject. |
| `nats:JetStreamMessage` | The message passed to `nats:JetStreamService` callbacks, containing the subject and byte array content. |

For action-based operations, see the [Action Reference](actions.md).

---

## Listener

The `nats:Listener` establishes the connection to the NATS server and manages subject subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ConnectionConfiguration` | Connection settings for the NATS listener, including authentication, reconnection, ping, and TLS. |

`ConnectionConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | `string\|string[]` | Required | NATS server URL (constructor parameter), or a list of URLs for a cluster. Use `nats:DEFAULT_URL` (`"nats://localhost:4222"`) for a local server. |
| `connectionName` | `string` | `"ballerina-nats"` | The name of the connection, useful for server-side monitoring. |
| `retryConfig` | `RetryConfig` | `()` | Reconnection settings: `maxReconnect`, `reconnectWait` (seconds), and `connectionTimeout` (seconds). |
| `ping` | `Ping` | `()` | Ping settings: `pingInterval` (seconds) and `maxPingsOut`. |
| `auth` | `Credentials\|Tokens` | `()` | Authentication configuration. Use `nats:Credentials` for username/password or `nats:Tokens` for token-based auth. |
| `inboxPrefix` | `string` | `"_INBOX."` | The connection's inbox prefix, which all inboxes start with. |
| `noEcho` | `boolean` | `false` | If `true`, the server does not echo messages back to this connection when it has subscriptions on the subject being published to. |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration. |
| `validation` | `boolean` | `true` | Enables constraint validation of the bound payload. |

### Initializing the listener

**Basic listener with default settings:**

```ballerina
import ballerinax/nats;

listener nats:Listener natsListener = new (nats:DEFAULT_URL);
```

**Listener with credentials and reconnection settings:**

```ballerina
import ballerinax/nats;

configurable string natsUrl = ?;
configurable string username = ?;
configurable string password = ?;

listener nats:Listener natsListener = new (natsUrl,
    auth = {
        username: username,
        password: password
    },
    retryConfig = {
        maxReconnect: 10,
        reconnectWait: 5
    }
);
```

**Listener with TLS:**

```ballerina
import ballerinax/nats;

listener nats:Listener natsListener = new ("nats://nats.example.com:4222",
    secureSocket = {
        cert: "/path/to/ca_certificate.pem",
        key: {
            certFile: "/path/to/client_certificate.pem",
            keyFile: "/path/to/client_key.pem"
        }
    }
);
```

---

## Service

A `nats:Service` is a Ballerina service attached to a `nats:Listener`. It is annotated with `@nats:ServiceConfig` to specify the subject to subscribe to and, optionally, a queue group and pending limits. Alternatively, you can use a string literal as the service name (for example, `service "orders.created" on natsListener`), in which case it is used as the subject.

Implement `onMessage` for one-way consumption or `onRequest` for request-reply patterns, and optionally `onError` to handle payload binding or validation failures.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(nats:AnydataMessage message) returns error?` | Invoked when a message arrives on the subject. Use for one-way message consumption. |
| `onRequest` | `remote function onRequest(nats:AnydataMessage message) returns anydata\|error` | Invoked when a message with a `replyTo` subject arrives. The return value is sent back to the `replyTo` subject as the reply. |
| `onError` | `remote function onError(nats:AnydataMessage message, nats:Error err) returns error?` | Optional. Invoked when the incoming message cannot be bound to the declared parameter types (for example, a payload binding or constraint validation failure). |

A service must implement either `onMessage` or `onRequest`, not both. Instead of `nats:AnydataMessage`, the first parameter can be a subtype of it (for example, `nats:BytesMessage` or a custom record with `content`, `subject`, and `replyTo` fields). You can also bind the payload directly by declaring an `anydata` parameter (for example, a record type) either as the only parameter or as a second parameter after the message. Use the `@nats:Payload` annotation to mark the payload parameter explicitly.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/nats;

configurable string natsUrl = nats:DEFAULT_URL;

type Order record {|
    string orderId;
    decimal amount;
|};

listener nats:Listener natsListener = new (natsUrl);

@nats:ServiceConfig {
    subject: "orders.created",
    queueName: "order-processors"
}
service nats:Service on natsListener {

    remote function onMessage(nats:AnydataMessage message, @nats:Payload Order orderData) returns error? {
        log:printInfo("Received order", subject = message.subject, orderId = orderData.orderId);
    }

    remote function onError(nats:AnydataMessage message, nats:Error err) returns error? {
        log:printError("Failed to process message", err, subject = message.subject);
    }
}

@nats:ServiceConfig {
    subject: "orders.status"
}
service nats:Service on natsListener {

    // The returned value is sent to the requester's replyTo subject
    remote function onRequest(nats:AnydataMessage message) returns string|error {
        string orderId = check string:fromBytes(check message.content.ensureType());
        return string `Order ${orderId} is being processed`;
    }
}
```

When a `queueName` is set, each message is delivered to only one of the services subscribed with the same queue group, enabling load-balanced consumption. Subjects support the `*` (single token) and `>` (multiple tokens) wildcards.

---

## JetStream listener

The `nats:JetStreamListener` consumes persisted messages from JetStream streams using push-based subscriptions. It is initialized with an existing `nats:Client`, whose connection it reuses. A stream that captures the subscribed subject must already exist (see `addStream` in the [Action Reference](actions.md)). For pull-based consumption, use `JetStreamClient->consumeMessage` instead.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `natsClient` | `nats:Client` | Required | An initialized `nats:Client` instance (constructor parameter). The JetStream listener reuses its connection. |

### Initializing the listener

```ballerina
import ballerinax/nats;

configurable string natsUrl = nats:DEFAULT_URL;

nats:Client natsClient = check new (natsUrl);

listener nats:JetStreamListener jsListener = new (natsClient);
```

### Service

A `nats:JetStreamService` is attached to a `nats:JetStreamListener` and annotated with `@nats:StreamServiceConfig` to specify the subject, an optional queue group, and the `autoAck` flag.

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(nats:JetStreamMessage message, nats:JetStreamCaller caller) returns error?` | Invoked when a JetStream message arrives on the subject. The `caller` parameter is optional; use it to acknowledge the message. |

In v3.3.2, the compiler plugin rejects the two-parameter form (`nats:JetStreamMessage` and `nats:JetStreamCaller`) in a `service ... on` declaration. A service declaration must use the single-parameter form `onMessage(nats:JetStreamMessage message)`. To use `nats:JetStreamCaller`, define the service as a `nats:JetStreamService` service object and attach it to the listener programmatically, as shown in the example below.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/nats;

configurable string natsUrl = nats:DEFAULT_URL;

nats:Client natsClient = check new (natsUrl);

listener nats:JetStreamListener jsListener = new (natsClient);

// Service declaration: receives the message only
@nats:StreamServiceConfig {
    subject: "orders.*",
    queueName: "order-processors"
}
service nats:JetStreamService on jsListener {

    remote function onMessage(nats:JetStreamMessage message) returns error? {
        string payload = check string:fromBytes(message.content);
        log:printInfo("Received order", subject = message.subject, payload = payload);
    }
}

// Service object: receives the message and a JetStreamCaller for manual acknowledgement
nats:JetStreamService paymentService =
@nats:StreamServiceConfig {
    subject: "payments.*",
    autoAck: false
}
service object {

    remote function onMessage(nats:JetStreamMessage message, nats:JetStreamCaller caller) returns error? {
        string|error payload = string:fromBytes(message.content);
        if payload is error {
            // Ask the server to redeliver the message
            caller->nak();
            return payload;
        }
        log:printInfo("Processing payment", payload = payload);
        caller->ack();
    }
};

function init() returns error? {
    check jsListener.attach(paymentService);
}
```

---

## JetStreamCaller

The `nats:JetStreamCaller` is passed to the JetStream `onMessage` callback and acknowledges the message being processed. None of its methods return a value.

| Method | Signature | Description |
|--------|-----------|-------------|
| `ack` | `remote function ack()` | Acknowledges the message, indicating it should not be redelivered. |
| `nak` | `remote function nak()` | Negatively acknowledges the message, indicating it was not processed and should be redelivered. |
| `inProgress` | `remote function inProgress()` | Indicates the message is still being processed and resets the server's redelivery timer. |

---

## Supporting types

### `AnydataMessage`

| Field | Type | Description |
|-------|------|-------------|
| `content` | `anydata` | The message content. |
| `subject` | `string` | The subject the message was sent to. |
| `replyTo` | `string` | Optional. The `replyTo` subject of the message (present on request messages). |

### `JetStreamMessage`

| Field | Type | Description |
|-------|------|-------------|
| `subject` | `string` | The subject of the message. |
| `content` | `byte[]` | The message payload. |

### `ServiceConfigData`

Used by the `@nats:ServiceConfig` annotation.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subject` | `string` | Required | The subject to subscribe to. Supports `*` and `>` wildcards. |
| `queueName` | `string` | `()` | The queue group name. Messages are distributed across subscribers in the same queue group. |
| `pendingLimits` | `PendingLimits` | `()` | Limits on the number and size of pending messages held by the subscription. |

### `PendingLimits`

| Field | Type | Description |
|-------|------|-------------|
| `maxMessages` | `int` | Maximum number of pending messages held by the consumer service (NATS default: 65536). A value of 0 or less disables the check. |
| `maxBytes` | `int` | Maximum total size of pending messages in bytes (NATS default: 67108864). A value of 0 or less disables the check. |

### `JetStreamServiceConfigData`

Used by the `@nats:StreamServiceConfig` annotation.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subject` | `string` | Required | The JetStream subject to subscribe to. |
| `queueName` | `string` | `()` | The queue group name. |
| `autoAck` | `boolean` | `true` | Acknowledges the message automatically. |

### `RetryConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `maxReconnect` | `int` | `60` | Maximum number of reconnect attempts. Use `0` to disable and `-1` for infinite reconnects. |
| `reconnectWait` | `decimal` | `2` | Time in seconds to wait between reconnect attempts to the same server. |
| `connectionTimeout` | `decimal` | `2` | Timeout in seconds for connection attempts. |

### `Ping`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pingInterval` | `decimal` | `120` | Interval in seconds between pings to the server. |
| `maxPingsOut` | `int` | `2` | Maximum number of pings the client can have in flight. |

### `Credentials` and `Tokens`

| Type | Field | Type | Description |
|------|-------|------|-------------|
| `Credentials` | `username` | `string` | Username for basic authentication. |
| `Credentials` | `password` | `string` | Password for basic authentication. |
| `Tokens` | `token` | `string` | Token for token-based authentication. |

### `SecureSocket`

| Field | Type | Description |
|-------|------|-------------|
| `cert` | `crypto:TrustStore\|string` | The trust store or a certificate file the client trusts. |
| `key` | `crypto:KeyStore\|CertKey` | Optional. The key store, or a certificate file and private key (`certFile`, `keyFile`, `keyPassword`) of the client. |
| `protocol` | `record {\| Protocol name; \|}` | Optional. The SSL/TLS protocol (`SSL`, `TLS`, or `DTLS`). |
