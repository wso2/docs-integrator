# Triggers

The `ballerina/websub` connector supports event-driven integration as a WebSub subscriber. The `websub:Listener` exposes an HTTP endpoint that handles hub intent verification automatically and delivers content distribution notifications to your service callbacks.

Three components work together:

| Component | Role |
|-----------|------|
| `websub:Listener` | Exposes an HTTP endpoint for the WebSub hub to send intent verification and content distribution requests. |
| `websub:SubscriberService` | Defines callback methods invoked when subscription events or content distribution notifications are received. |
| `websub:ContentDistributionMessage` | The payload delivered to the onEventNotification callback, containing headers, content type, and the distributed content. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `websub:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the WebSub subscriber listener. Extends the standard HTTP listener configuration with a graceful shutdown period. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"0.0.0.0"` | The listener bind address. |
| `http1Settings` | <code>http:ListenerHttp1Settings</code> | `{}` | HTTP/1.x specific settings. |
| `secureSocket` | <code>http:ListenerSecureSocket</code> | `()` | SSL/TLS configuration for the listener. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `120` | Request idle timeout in seconds. |
| `gracefulShutdownPeriod` | <code>decimal</code> | `20` | Time in seconds to wait for unsubscription verification before shutting down. |

### Initializing the listener

**Using a port number:**

```ballerina
import ballerina/websub;

listener websub:Listener websubListener = new (9090);
```

**Using a port number with custom configuration:**

```ballerina
import ballerina/websub;

listener websub:Listener websubListener = new (9090,
    gracefulShutdownPeriod = 30
);
```

**Using an existing HTTP listener:**

```ballerina
import ballerina/http;
import ballerina/websub;

listener http:Listener httpListener = new (9090);
listener websub:Listener websubListener = new (httpListener);
```

---

## Service

A `websub:SubscriberService` is a Ballerina service attached to a `websub:Listener`. It uses the `@websub:SubscriberServiceConfig` annotation to specify the target hub/topic for subscription and implements callbacks to handle subscription lifecycle events and content distribution notifications.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onSubscriptionValidationDenied` | <code>remote function onSubscriptionValidationDenied(websub:SubscriptionDeniedError msg) returns websub:Acknowledgement&#124;error?</code> | Invoked when the hub denies the subscription request. Receives the denial reason. |
| `onSubscriptionVerification` | <code>remote function onSubscriptionVerification(websub:SubscriptionVerification msg) returns websub:SubscriptionVerificationSuccess&#124;websub:SubscriptionVerificationError&#124;error</code> | Invoked when the hub sends a subscription intent verification challenge. Return success to confirm or error to reject. |
| `onUnsubscriptionVerification` | <code>remote function onUnsubscriptionVerification(websub:UnsubscriptionVerification msg) returns websub:UnsubscriptionVerificationSuccess&#124;websub:UnsubscriptionVerificationError&#124;error</code> | Invoked when the hub sends an unsubscription intent verification challenge. Return success to confirm or error to reject. |
| `onEventNotification` | <code>remote function onEventNotification(websub:ContentDistributionMessage event) returns websub:Acknowledgement&#124;websub:SubscriptionDeletedError&#124;error?</code> | Invoked when the hub distributes new content. Receives the content payload with headers and body. |

You do not need to implement all callbacks. Only implement the ones relevant to your use case. At minimum, implement `onEventNotification` to receive content updates.

### Full usage example

```ballerina
import ballerina/log;
import ballerina/websub;

configurable string hubUrl = ?;
configurable string topicUrl = ?;

listener websub:Listener websubListener = new (9090);

@websub:SubscriberServiceConfig {
    target: [hubUrl, topicUrl],
    secret: "my-secret-key",
    unsubscribeOnShutdown: true
}
service /websub on websubListener {

    remote function onSubscriptionValidationDenied(
            websub:SubscriptionDeniedError msg) returns websub:Acknowledgement? {
        log:printError("Subscription denied: " + msg.message());
        return websub:ACKNOWLEDGEMENT;
    }

    remote function onSubscriptionVerification(
            websub:SubscriptionVerification msg)
            returns websub:SubscriptionVerificationSuccess|websub:SubscriptionVerificationError {
        log:printInfo("Subscription verification received for topic: " + msg.hubTopic);
        if msg.hubTopic == topicUrl {
            return websub:SUBSCRIPTION_VERIFICATION_SUCCESS;
        }
        return websub:SUBSCRIPTION_VERIFICATION_ERROR;
    }

    remote function onEventNotification(
            websub:ContentDistributionMessage event)
            returns websub:Acknowledgement|error? {
        log:printInfo("Event received", contentType = event.contentType);
        json|error content = event.content.ensureType();
        if content is json {
            log:printInfo("Content: " + content.toJsonString());
        }
        return websub:ACKNOWLEDGEMENT;
    }
}
```

The `target` field in `@websub:SubscriberServiceConfig` can be either a resource URL string (the connector discovers the hub and topic automatically) or a `[hubUrl, topicUrl]` tuple for direct configuration. When `unsubscribeOnShutdown` is `true`, the connector sends an unsubscription request when the service stops.

---

## Supporting types

### `ContentDistributionMessage`

| Field | Type | Description |
|-------|------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;?</code> | HTTP headers from the content distribution request. |
| `contentType` | <code>string?</code> | The content type of the distributed content (e.g., `"application/json"`). |
| `content` | <code>map&lt;string&#124;string[]&gt;&#124;json&#124;xml&#124;string&#124;byte[]</code> | The distributed content payload. |

### `SubscriptionVerification`

| Field | Type | Description |
|-------|------|-------------|
| `hubMode` | <code>string</code> | The hub mode (`subscribe`). |
| `hubTopic` | <code>string</code> | The topic URL being verified. |
| `hubChallenge` | <code>string</code> | The challenge string that must be echoed back to confirm the subscription. |
| `hubLeaseSeconds` | <code>string?</code> | The lease duration in seconds for the subscription. |

### `UnsubscriptionVerification`

| Field | Type | Description |
|-------|------|-------------|
| `hubMode` | <code>string</code> | The hub mode (`unsubscribe`). |
| `hubTopic` | <code>string</code> | The topic URL being verified. |
| `hubChallenge` | <code>string</code> | The challenge string that must be echoed back to confirm the unsubscription. |
| `hubLeaseSeconds` | <code>string?</code> | The lease duration (may be present in the verification request). |

### `SubscriptionChangeRequest`

| Field | Type | Description |
|-------|------|-------------|
| `topic` | <code>string</code> | The topic URL to subscribe to or unsubscribe from. |
| `callback` | <code>string</code> | The callback URL for the hub to send notifications to. |
| `leaseSeconds` | <code>int</code> | The requested lease period in seconds (default `0`). |
| `secret` | <code>string</code> | The secret for HMAC-based content verification (default empty). |
| `customParams` | <code>map&lt;string&gt;?</code> | Additional custom parameters to include in the subscription request. |
| `customHeaders` | <code>map&lt;string&gt;?</code> | Additional custom HTTP headers to include in the subscription request. |

### `SubscriptionChangeResponse`

| Field | Type | Description |
|-------|------|-------------|
| `hub` | <code>string</code> | The hub URL. |
| `topic` | <code>string</code> | The topic URL. |
| `response` | <code>http:Response</code> | The HTTP response from the hub. |

### `SubscriberServiceConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `target` | <code>string&#124;[string, string]</code> | Resource URL for auto-discovery, or a `[hubUrl, topicUrl]` tuple for direct configuration. |
| `leaseSeconds` | <code>int?</code> | Requested subscription lease period in seconds. |
| `callback` | <code>string?</code> | Explicit callback URL (overrides auto-generated URL). |
| `secret` | <code>string?</code> | Secret for HMAC-based authenticated content distribution. |
| `appendServicePath` | <code>boolean</code> | Whether to append the service path to the callback URL (default `false`). |
| `unsubscribeOnShutdown` | <code>boolean</code> | Whether to send an unsubscription request when the service shuts down (default `false`). |
| `customParams` | <code>map&lt;string&gt;?</code> | Additional custom parameters for the subscription request. |
| `customHeaders` | <code>map&lt;string&gt;?</code> | Additional custom HTTP headers for the subscription request. |
