---
title: Triggers
---

# Triggers

The `ballerinax/solace.jms` connector supports event-driven integration through a `jms:Listener`. When a message arrives on a subscribed queue or topic, the listener dispatches it to your service's `onMessage` callback automatically; no manual receive loop is required.

Three components work together:

| Component | Role |
|-----------|------|
| `jms:Listener` | Connects to the Solace broker and dispatches messages to the services attached to it. |
| `jms:Service` | Defines the `onMessage` and `onError` callbacks invoked when a message arrives or an error occurs. |
| `jms:Caller` | Injected into `onMessage` callbacks for manual acknowledgement and session-transacted control. |

For action-based operations, see the [Action Reference](actions.md).

---

## Listener

The `jms:Listener` establishes the broker connection. Each attached service subscribes to its own queue or topic through the `@jms:ServiceConfig` annotation.

### Configuration

`ListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `messageVpn` | `string` | `"default"` | Solace message VPN name. |
| `auth` | `BasicAuthConfiguration\|KerberosConfiguration\|OAuth2Configuration` | Required | Authentication configuration. See [Supporting types](#supporting-types). |
| `secureSocket` | `SecureSocket` | `()` | TLS/SSL configuration. |
| `clientName` | `string` | `()` | Client identifier reported to the broker. A unique name is generated when omitted. |
| `clientDescription` | `string` | `"Ballerina Solace JMS Connector"` | A description for the application client. |
| `enableDynamicDurables` | `boolean` | `false` | Automatically provision durable destinations that don't already exist on the broker. |
| `directTransport` | `boolean` | `true` | Consume over direct (at-most-once) transport. Set to `false` for session-transacted services or flow-control tuning. |
| `directOptimized` | `boolean` | `true` | Optimize the session for direct messaging throughput. |
| `compressionLevel` | `int` | `0` | ZLIB compression level (0-9, where 0 is no compression). |
| `localhost` | `string` | `()` | Local interface IP address to bind for outbound connections. |
| `connectTimeout` | `decimal` | `30.0` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | `10.0` | Read timeout in seconds. |
| `retryConfig` | `RetryConfiguration` | `()` | Reconnection retry configuration. |
| `transportWindowSize` | `int` | `()` | Maximum number of guaranteed messages the broker can have in flight, unacknowledged (1-255). Only applies when `directTransport` is `false`. |
| `ackThreshold` | `int` | `60` | Percentage of `transportWindowSize` consumed before an automatic acknowledgement is sent (1-75). Only applies when `directTransport` is `false`. |
| `ackTimer` | `decimal` | `()` | Maximum time in seconds to hold an unacknowledged message before sending an automatic acknowledgement (0.02-1.5). Only applies when `directTransport` is `false`. |

> **Important:** Session-transacted messaging (`ackMode: SESSION_TRANSACTED`) requires `directTransport: false`. A session-transacted commit or rollback is local to a single listener or client session — it can't span multiple client instances, for example a separate producer and consumer used together.

### Initializing the listener

**Basic listener with username/password authentication:**

```ballerina
import ballerinax/solace.jms;

configurable string solaceJmsUrl = ?;
configurable string solaceJmsUsername = ?;
configurable string solaceJmsPassword = ?;

listener jms:Listener solaceJmsListener = check new (
    solaceJmsUrl,
    messageVpn = "default",
    auth = {username: solaceJmsUsername, password: solaceJmsPassword}
);
```

**Listener with OAuth 2.0 authentication:**

```ballerina
import ballerinax/solace.jms;

configurable string solaceJmsUrl = ?;
configurable string solaceJmsIssuer = ?;
configurable string solaceJmsAccessToken = ?;

listener jms:Listener solaceJmsListener = check new (
    solaceJmsUrl,
    messageVpn = "default",
    auth = {issuer: solaceJmsIssuer, accessToken: solaceJmsAccessToken}
);
```

---

## Service

A `jms:Service` is a Ballerina service attached to a `jms:Listener`. The `@jms:ServiceConfig` annotation specifies which queue or topic to subscribe to, along with acknowledgement and message-selector settings. A compiler plugin validates every `jms:Service` at compile time: it must declare exactly one `onMessage` remote function and at most one `onError` remote function, neither may be declared as a resource function, and the queue/topic durability fields must be literal-consistent (for example, `queueName` is required when `durability` is `DURABLE` and not allowed when `TEMPORARY`; `subscriberName` is required for a `DURABLE` topic). Diagnostics `SOLACE_JMS_101`-`109` cover service shape; `SOLACE_JMS_201`-`203` cover durability consistency.

### `@jms:ServiceConfig`

The annotation accepts either a `QueueServiceConfiguration` or a `TopicServiceConfiguration`, matching the `QueueConfiguration` and `TopicConfiguration` fields described in the [Action Reference](actions.md#message-consumer).

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(record {\|*jms:Message; T payload;\|} message, jms:Caller? caller) returns jms:Error?` | Invoked when a message is received on the subscribed queue or topic. Narrow `T` to a specific type to trigger data binding. |
| `onError` | `remote function onError(jms:Error err) returns jms:Error?` | Optional. Invoked when an error occurs during message receipt or data binding. |

> **Note:** The `caller` parameter of `onMessage` is optional. Omit it when the service relies on `AUTO_ACKNOWLEDGE` or `DUPS_OK_ACKNOWLEDGE`; include a `jms:Caller` parameter to acknowledge a message or control a session-transacted service manually.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/solace.jms;

configurable string solaceJmsUrl = ?;
configurable string solaceJmsUsername = ?;
configurable string solaceJmsPassword = ?;
configurable string solaceJmsQueueName = ?;

listener jms:Listener solaceJmsListener = new (
    solaceJmsUrl,
    messageVpn = "default",
    auth = {username: solaceJmsUsername, password: solaceJmsPassword}
);

type OrderMessage record {|
    string orderId;
|};

type Message record {|
    *jms:Message;
    OrderMessage payload;
|};

@jms:ServiceConfig {
    queueName: solaceJmsQueueName,
    ackMode: jms:CLIENT_ACKNOWLEDGE
}
service jms:Service on solaceJmsListener {

    remote function onMessage(Message message, jms:Caller caller) returns jms:Error? {
        do {
            log:printInfo("Received order", orderId = message.payload.orderId);
            check caller->ack(message);
        } on fail error e {
            return error("unhandled error", e);
        }
    }

    remote function onError(jms:Error err) returns jms:Error? {
        log:printError("Error receiving message", 'error = err);
    }
}
```

---

## Caller

The `jms:Caller` is injected into `onMessage` when the callback declares it as a second parameter. It provides manual control over acknowledgement and session-transacted services.

| Function | Signature | Description |
|----------|-----------|-------------|
| `ack` | `remote function ack(jms:Message message) returns jms:Error?` | Acknowledges a message. Required when `ackMode` is `CLIENT_ACKNOWLEDGE`. |
| `commit` | `remote function commit() returns jms:Error?` | Commits the listener's session-transacted service. Requires `ackMode: SESSION_TRANSACTED` on the service configuration. |
| `rollback` | `remote function rollback() returns jms:Error?` | Rolls back the session-transacted service; every message received since the last commit or rollback is redelivered. |

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `anydata` | Message payload. |
| `deliveryMode` | `DeliveryMode` | `NON_PERSISTENT` (at-most-once) or `PERSISTENT` (guaranteed, the default). |
| `priority` | `int?` | Message priority (0-9). |
| `timeToLive` | `decimal?` | Time, in seconds, after which an unconsumed persistent message expires. |
| `messageType` | `string?` | Application-defined message type label. |
| `correlationId` | `string?` | Correlation identifier for request/reply patterns. |
| `replyTo` | `Destination?` | Destination the receiver should reply to. |
| `senderId` | `string?` | Identifier of the sending client. A Solace extension with no standard JMS equivalent. |
| `properties` | `map<anydata>?` | User-defined message properties. |
| `messageId` | `string?` | Receive-only. Broker-assigned message identifier. |
| `timestamp` | `int?` | Receive-only. Broker-side send timestamp in milliseconds. |
| `redelivered` | `boolean?` | Receive-only. Whether this delivery is a redelivery. |
| `destination` | `Destination?` | Receive-only. The destination the message was received on. |
| `deliveryCount` | `int?` | Receive-only. Number of times this message has been delivered. |
| `expiration` | `int?` | Receive-only. Message expiration time in milliseconds. |

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
| `AcknowledgementMode` | `SESSION_TRANSACTED`, `AUTO_ACKNOWLEDGE`, `CLIENT_ACKNOWLEDGE`, `DUPS_OK_ACKNOWLEDGE` | The JMS session acknowledgement mode. |
| `DeliveryMode` | `NON_PERSISTENT`, `PERSISTENT` | At-most-once versus guaranteed delivery. `PERSISTENT` is the default. |
| `Durability` | `DURABLE`, `TEMPORARY` | Whether a subscription is broker-provisioned and named, or created and destroyed with the connection. |
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
| `Error` | The single, flat error type (`distinct error`) raised by every client, listener, and caller operation. The connector has no error sub-hierarchy. |
