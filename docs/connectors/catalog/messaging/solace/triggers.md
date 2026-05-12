---
title: Triggers
---

# Triggers

The `ballerinax/solace` connector supports event-driven integration through a polling-based listener. When messages arrive on a subscribed queue or topic, the listener dispatches them to your service's `onMessage` callback automatically; no manual receive loop required.

Three components work together:

| Component | Role |
|-----------|------|
| `solace:Listener` | Connects to the Solace broker and polls for messages, dispatching them to attached services. |
| `solace:Service` | Defines the `onMessage` and `onError` callbacks invoked when messages arrive or errors occur. |
| `solace:Caller` | Injected into `onMessage` callbacks for manual acknowledgement and transaction control. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `solace:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Connection configuration for the Solace listener. Subscription details are specified on each service via the `@ServiceConfig` annotation. |

`ListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `messageVpn` | `string` | `"default"` | Solace Message VPN name. |
| `auth` | `BasicAuthConfig\|KerberosConfig\|OAuth2Config` | `()` | Authentication configuration. |
| `transacted` | `boolean` | `false` | Enable transacted session for commit/rollback in service callbacks. When `true`, `directTransport` must also be set to `false`. |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration. |
| `clientId` | `string` | `()` | Optional client identifier. |
| `enableDynamicDurables` | `boolean` | `false` | Allow dynamic creation of durable endpoints. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Reconnection retry configuration. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0–9, where 0 is no compression). |
| `directTransport` | `boolean` | `true` | Use direct (at-most-once) delivery when `true`. Set to `false` for guaranteed (persistent) delivery and when using transacted sessions. |
| `directOptimized` | `boolean` | `true` | Optimize message delivery in direct transport mode. Only effective when `directTransport` is `true`. |
| `clientDescription` | `string` | `"JNDI"` | A description for the application client. |
| `allowDuplicateClientId` | `boolean` | `false` | Allow the same client ID to be used across multiple connections simultaneously. |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |

### Initializing the listener

**Basic listener with username/password authentication:**

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string username = ?;
configurable string password = ?;

listener solace:Listener solaceListener = check new (
    url = solaceUrl,
    messageVpn = "default",
    auth = {username: username, password: password}
);
```

**Listener with OAuth 2.0 authentication:**

```ballerina
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string issuer = ?;
configurable string accessToken = ?;

listener solace:Listener solaceListener = check new (
    url = solaceUrl,
    messageVpn = "default",
    auth = {issuer: issuer, accessToken: accessToken}
);
```

---

## Service

A `solace:Service` is a Ballerina service attached to a `solace:Listener`. It uses the `@solace:ServiceConfig` annotation to specify which queue or topic to subscribe to, along with polling and acknowledgement settings. The service implements `onMessage` and optionally `onError` callbacks.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(solace:Message message) returns error?` | Invoked when a message is received on the subscribed queue or topic. Optionally accepts a `solace:Caller` as a second parameter for manual acknowledgement or transaction control. |
| `onError` | `remote function onError(solace:Error err) returns error?` | Invoked when an error occurs during message receipt or data binding. |

The `onMessage` callback can optionally accept a `solace:Caller` as a second parameter (e.g., `remote function onMessage(solace:Message message, solace:Caller caller)`) for manual acknowledgement in `CLIENT_ACKNOWLEDGE` mode or transaction control in `SESSION_TRANSACTED` mode.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/solace;

configurable string solaceUrl = ?;
configurable string username = ?;
configurable string password = ?;

listener solace:Listener solaceListener = new (
    url = solaceUrl,
    messageVpn = "default",
    auth = {username: username, password: password}
);

@solace:ServiceConfig {
    queueName: "my-queue",
    pollingInterval: 2,
    receiveTimeout: 1
}
service on solaceListener {
    remote function onMessage(solace:Message message) returns error? {
        log:printInfo("Received message", payload = message.payload.toString());
    }

    remote function onError(solace:Error err) returns error? {
        log:printError("Error receiving message", 'error = err);
    }
}
```

The `@solace:ServiceConfig` annotation accepts either queue-based (`queueName`) or topic-based (`topicName`, `consumerType`, `subscriberName`) subscription configurations, along with `pollingInterval`, `receiveTimeout`, `sessionAckMode`, `messageSelector`, and `noLocal` fields.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `anydata` | Message payload; supports string, byte[], xml, json, record, and map types. |
| `correlationId` | `string?` | Optional correlation identifier for request/reply patterns. |
| `replyTo` | `Destination?` | Optional reply-to destination (Topic or Queue). |
| `properties` | `map?` | Optional user-defined properties (boolean, int, byte, float, or string values). |
| `messageId` | `string?` | Unique message identifier. |
| `timestamp` | `int?` | Message timestamp in milliseconds. |
| `destination` | `Destination?` | The destination this message was sent to or received from. |
| `deliveryMode` | `int?` | JMS delivery mode value. |
| `redelivered` | `boolean?` | Whether this message is a redelivery. |
| `jmsType` | `string?` | JMS type header value. |
| `expiration` | `int?` | Message expiration time in milliseconds. |
| `priority` | `int?` | Message priority (0–9). |

### `Caller`

| Field | Type | Description |
|-------|------|-------------|
| `acknowledge` | `remote function` | Acknowledges a received message (for `CLIENT_ACKNOWLEDGE` mode). |
| `commit` | `remote function` | Commits the current transacted session. |
| `rollback` | `remote function` | Rolls back the current transacted session; messages will be redelivered. |
