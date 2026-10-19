# Actions

The `ballerina/websub` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Subscription Client`](#subscription-client) | Sends subscription and unsubscription requests to a WebSub hub. |
| [`Discovery Service`](#discovery-service) | Discovers WebSub hub and topic URLs from a resource URL via HTTP Link headers. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Subscription client

Sends subscription and unsubscription requests to a WebSub hub.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version to use. |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | `{}` | HTTP/1.x specific settings. |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | `{}` | HTTP/2 specific settings. |
| `timeout` | <code>decimal</code> | `60` | Maximum wait time for a response in seconds. |
| `followRedirects` | <code>http:FollowRedirects</code> | `()` | Redirect handling configuration. |
| `poolConfig` | <code>http:PoolConfiguration</code> | `()` | Connection pooling configuration. |
| `auth` | <code>http:ClientAuthConfig</code> | `()` | Client authentication configuration. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | `{}` | Response size limit configuration. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration for fault tolerance. |

### Initializing the client

```ballerina
import ballerina/websub;

configurable string hubUrl = ?;

websub:SubscriptionClient subscriptionClient = check new (hubUrl);
```

### Operations

#### Subscription management

<details>
<summary>subscribe</summary>

Sends a subscription request to the WebSub hub for the specified topic.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionRequest` | <code>SubscriptionChangeRequest</code> | Yes | The subscription request containing the topic URL, callback URL, and optional parameters such as `secret` and `leaseSeconds`. |

**Returns:** `SubscriptionChangeResponse|SubscriptionInitiationError`

**Sample code:**

```ballerina
websub:SubscriptionChangeResponse response = check subscriptionClient->subscribe({
    topic: "https://example.com/feed",
    callback: "https://my-app.example.com/websub"
});
```

**Sample response:**

```ballerina
{"hub": "https://hub.example.com", "topic": "https://example.com/feed", "response": "<http:Response>"}
```

</details>

<details>
<summary>unsubscribe</summary>

Sends an unsubscription request to the WebSub hub for the specified topic.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unsubscriptionRequest` | <code>SubscriptionChangeRequest</code> | Yes | The unsubscription request containing the topic URL and callback URL. |

**Returns:** `SubscriptionChangeResponse|SubscriptionInitiationError`

**Sample code:**

```ballerina
websub:SubscriptionChangeResponse response = check subscriptionClient->unsubscribe({
    topic: "https://example.com/feed",
    callback: "https://my-app.example.com/websub"
});
```

**Sample response:**

```ballerina
{"hub": "https://hub.example.com", "topic": "https://example.com/feed", "response": "<http:Response>"}
```

</details>

---

## Discovery service

Discovers WebSub hub and topic URLs from a resource URL via HTTP Link headers.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version to use. |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | `{}` | HTTP/1.x specific settings. |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | `{}` | HTTP/2 specific settings. |
| `timeout` | <code>decimal</code> | `60` | Maximum wait time for a response in seconds. |
| `followRedirects` | <code>http:FollowRedirects</code> | `()` | Redirect handling configuration. |
| `poolConfig` | <code>http:PoolConfiguration</code> | `()` | Connection pooling configuration. |
| `auth` | <code>http:ClientAuthConfig</code> | `()` | Client authentication configuration. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | `{}` | Response size limit configuration. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration for fault tolerance. |

### Initializing the client

```ballerina
import ballerina/websub;

configurable string resourceUrl = ?;

websub:DiscoveryService discoveryClient = check new (resourceUrl);
```

### Operations

#### Resource discovery

<details>
<summary>discoverResourceUrls</summary>

Discovers the WebSub hub URL and topic URL from the resource URL by parsing HTTP Link headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `expectedMediaTypes` | <code>string?&#124;string[]</code> | No | Expected media types for the resource (used in the `Accept` header). |
| `expectedLanguageTypes` | <code>string?&#124;string[]</code> | No | Expected language types for the resource (used in the `Accept-Language` header). |

**Returns:** `[string, string]|ResourceDiscoveryFailedError`

**Sample code:**

```ballerina
[string hubUrl, string topicUrl] = check discoveryClient->discoverResourceUrls();
```

**Sample response:**

```ballerina
["https://hub.example.com", "https://example.com/feed"]
```

</details>
