---
title: Triggers
---

# Triggers

The `ballerinax/solace` connector supports event-driven integration through a `solace:Listener`. When a message arrives on a subscribed queue or topic, the listener dispatches it to your service's `onMessage` callback automatically; no manual receive loop is required.

Three components work together:

| Component | Role |
|-----------|------|
| `solace:Listener` | Connects to the Solace broker and dispatches messages to the services attached to it. |
| `solace:Service` | Defines the `onMessage` and `onError` callbacks invoked when a message arrives or an error occurs. |
| `solace:Caller` | Injected into `onMessage` callbacks for manual acknowledgement and transaction control. |

For action-based operations, see the [Action Reference](actions.md).

---

## Listener

The `solace:Listener` establishes the broker connection. Each attached service subscribes to its own queue or topic through the `@solace:ServiceConfig` annotation.

### Configuration

`ListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `messageVpn` | `string` | `"default"` | Solace message VPN name. |
| `auth` | `BasicAuthConfiguration\|KerberosConfiguration\|OAuth2Configuration` | Required | Authentication configuration. See [Supporting types](#supporting-types). |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration. |
| `clientName` | `string` | `()` | Client identifier reported to the broker. A unique name is generated when omitted. |
| `clientDescription` | `string` | `"Ballerina Solace Connector"` | A description for the application client. |
| `transacted` | `boolean` | `false` | Enable a transacted session shared by every service attached to this listener. See the note below. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0-9, where 0 is no compression). |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfiguration` | `()` | Reconnection retry configuration. |
| `generateReceiveTimestamps` | `boolean` | `false` | Populate `receiveTimestamp` on every message delivered to a service. |
| `calculateMessageExpiration` | `boolean` | `false` | Populate `expiration` on every message delivered to a service. |

> **Important:** When `transacted` is `true`, every service attached to that listener instance shares one transacted session — a `commit` or `rollback` from any one service's `solace:Caller` applies to messages received by all of them. Use a separate listener per service when services need independent transactions. A transacted listener doesn't support `AUTO_ACK`; set `ackMode: CLIENT_ACK` on each service and commit or roll back explicitly.

### Initializing the listener

**Basic listener with username/password authentication:**

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string solaceUsername = ?;
configurable string solacePassword = ?;

listener solace:Listener solaceListener = check new (
    solaceUrl,
    messageVpn = "default",
    auth = {username: solaceUsername, password: solacePassword}
);
```

**Listener with OAuth 2.0 authentication:**

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string solaceIssuer = ?;
configurable string solaceAccessToken = ?;

listener solace:Listener solaceListener = check new (
    solaceUrl,
    messageVpn = "default",
    auth = {issuer: solaceIssuer, accessToken: solaceAccessToken}
);
```

---

## Service

A `solace:Service` is a Ballerina service attached to a `solace:Listener`. The `@solace:ServiceConfig` annotation specifies which queue or topic to subscribe to, along with acknowledgement and reconnection settings. A compiler plugin validates every `solace:Service` at compile time: it must declare exactly one `onMessage` remote function and at most one `onError` remote function, and neither may be declared as a resource function.

### `@solace:ServiceConfig`

The annotation accepts either a `QueueServiceConfiguration` or a `TopicServiceConfiguration`, matching the `QueueConfiguration` and `TopicConfiguration` fields described in the [Action Reference](actions.md#message-consumer).

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(record {\|*solace:Message; T payload;\|} message, solace:Caller? caller) returns solace:Error?` | Invoked when a message is received on the subscribed queue or topic. Narrow `T` to a specific type to trigger data binding. |
| `onError` | `remote function onError(solace:Error err) returns solace:Error?` | Optional. Invoked when an error occurs during message receipt or data binding. |

> **Note:** The `caller` parameter of `onMessage` is optional. Omit it when the service relies on `AUTO_ACK`; include a `solace:Caller` parameter to acknowledge, negatively acknowledge, or control a transacted session manually.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string solaceUsername = ?;
configurable string solacePassword = ?;

listener solace:Listener solaceListener = new (
    solaceUrl,
    messageVpn = "default",
    auth = {username: solaceUsername, password: solacePassword}
);

type OrderMessage record {|
    string orderId;
|};

type Message record {|
    *solace:Message;
    OrderMessage payload;
|};

@solace:ServiceConfig {
    queueName: "orders",
    ackMode: "CLIENT_ACK"
}
service solace:Service on solaceListener {

    remote function onMessage(Message message, solace:Caller caller) returns solace:Error? {
        do {
            log:printInfo("Received order", orderId = message.payload.orderId);
            check caller->ack(message);
        } on fail error e {
            log:printError("Failed to process order", 'error = e);
            check caller->nack(message, requeue = true);
        }
    }

    remote function onError(solace:Error err) returns solace:Error? {
        log:printError("Error receiving message", 'error = err);
    }
}
```

---

## Caller

The `solace:Caller` is injected into `onMessage` when the callback declares it as a second parameter. It provides manual control over acknowledgement and transacted sessions.

| Function | Signature | Description |
|----------|-----------|-------------|
| `ack` | `remote function ack(solace:Message message) returns solace:Error?` | Acknowledges a message. Required when `ackMode` is `CLIENT_ACK` on a non-transacted service. |
| `nack` | `remote function nack(solace:Message message, boolean requeue = true) returns solace:Error?` | Negatively acknowledges a message. With `requeue: true` (the default), the broker redelivers it; with `requeue: false`, the broker routes it to the dead message queue. |
| `commit` | `remote function commit() returns solace:Error?` | Commits the listener's transacted session. Requires `transacted = true` on the listener configuration. |
| `rollback` | `remote function rollback() returns solace:Error?` | Rolls back the listener's transacted session; every message received since the last commit or rollback is redelivered. |

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `anydata` | Message payload. |
| `deliveryMode` | `DeliveryMode` | `DIRECT` (at-most-once, the default) or `PERSISTENT` (guaranteed). |
| `priority` | `int?` | Message priority (0-9). |
| `timeToLive` | `decimal?` | Time, in seconds, after which an unconsumed persistent message expires. |
| `messageId` | `string?` | Application-assigned message identifier. |
| `messageType` | `string?` | Application-defined message type label. |
| `correlationId` | `string?` | Correlation identifier for request/reply patterns. |
| `replyTo` | `Destination?` | Destination the receiver should reply to. |
| `senderId` | `string?` | Identifier of the sending client. |
| `senderTimestamp` | `int?` | Sender-side timestamp in milliseconds. |
| `sequenceNumber` | `int?` | Application-assigned or auto-generated sequence number. |
| `properties` | `map<anydata>?` | User-defined message properties. |
| `userData` | `byte[]?` | Up to 36 bytes of application-defined binary data. |
| `receiveTimestamp` | `int?` | Receive-only. Broker-side receive timestamp in milliseconds. Populated when `generateReceiveTimestamps` is `true`. |
| `redelivered` | `boolean?` | Receive-only. Whether this delivery is a redelivery. |
| `destination` | `Destination?` | Receive-only. The destination the message was received on. |
| `deliveryCount` | `int?` | Receive-only. Number of times this message has been delivered. |
| `expiration` | `int?` | Receive-only. Message expiration time in milliseconds. Populated when `calculateMessageExpiration` is `true`. |

### `Destination`

```ballerina
public type Destination Topic|Queue;
```

| Type | Fields | Description |
|------|--------|-------------|
| `Topic` | `topicName: string` | A Solace topic destination. |
| `Queue` | `queueName: string` | A Solace queue destination. |

### Enumerations

| Enum | Members | Description |
|------|---------|-------------|
| `AcknowledgementMode` | `AUTO_ACK`, `CLIENT_ACK` | Whether the connector acknowledges automatically on receipt, or the application acknowledges explicitly. |
| `DeliveryMode` | `DIRECT`, `PERSISTENT` | At-most-once versus guaranteed delivery. |
| `Durability` | `DURABLE`, `TEMPORARY` | Whether a subscription endpoint is broker-provisioned and named, or created and destroyed with the connection. |
| `Protocol` | `TLSV1_1`, `TLSV1_2`, `TLSV1_3` | TLS protocol versions accepted by `SecureSocket`. |

### Authentication

| Type | Fields | Description |
|------|--------|-------------|
| `BasicAuthConfiguration` | `username: string`, `password: string?` | Username/password authentication. `username` is limited to 189 characters and `password` to 128 characters. |
| `KerberosConfiguration` | `serviceName: string = "solace"`, `jaasLoginContext: string = "SolaceGSS"`, `mutualAuthentication: boolean = false`, `jaasConfigFileReloadEnabled: boolean = false` | Kerberos (GSS) authentication. |
| `OAuth2AccessTokenAuth` | `issuer: string`, `accessToken: string` | OAuth 2.0 authentication with a pre-obtained access token. |
| `OidcIdTokenAuth` | `issuer: string`, `oidcToken: string` | OpenID Connect authentication with an ID token. |

`OAuth2Configuration` is a union of `OAuth2AccessTokenAuth` and `OidcIdTokenAuth`.

### `SecureSocket`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trustStore` | `TrustStore` | `()` | Truststore used to validate the broker's certificate. |
| `keyStore` | `KeyStore` | `()` | Keystore used for mutual TLS. |
| `trustedCommonNames` | `string[]` | `()` | Up to 16 common names accepted in the broker's certificate. |
| `excludedProtocols` | `Protocol[]` | `[]` | TLS protocol versions to exclude. |
| `cipherSuites` | `string[]` | `()` | Allowed cipher suites. |
| `validation` | `record {\|boolean enabled = true; boolean validateDate = true; boolean validateHostname = true;\|}` | all `true` | Certificate validation controls. |

`TrustStore` fields: `location: string`, `password: string`, `format: JKS|PKCS12 = JKS`. `KeyStore` adds `keyPassword?: string` and `keyAlias?: string`.

### `RetryConfiguration`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectRetries` | `int` | `0` | Number of times to retry the initial connection attempt. |
| `connectRetriesPerHost` | `int` | `0` | Number of retries per host when multiple hosts are configured. |
| `reconnectRetries` | `int` | `3` | Number of times to retry reconnecting after the session goes down. |
| `reconnectRetryWait` | `decimal` | `3.0` | Delay in seconds between reconnection attempts. |

### Errors

| Type | Description |
|------|-------------|
| `Error` | Base error type raised by every client, listener, and caller operation. |
| `InactiveFlowError` | Raised by `receive`/`receiveNoWait` when the underlying flow has been shut down by the broker. |
| `FlowDownError` | Raised by `receive`/`receiveNoWait` when the underlying flow is temporarily unavailable, for example, during reconnection. |
