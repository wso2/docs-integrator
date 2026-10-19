---
title: Actions
---

# Actions

The HubSpot Events Completions connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Send single or batched custom behavioral event occurrences to HubSpot. |

---

## Client

Sends single and batched custom behavioral event occurrences to HubSpot for existing event definitions.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>ClientHttp1Settings</code> | — | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | — | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>60</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `poolConfig` | <code>http:PoolConfiguration</code> | — | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | — | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | — | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | — | Configurations associated with retrying |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | — | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | — | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | — | Proxy server related options |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side; `nil` values are treated as optional and absent fields are handled as nilable types |

### Initializing the client

```ballerina
import ballerina/http;
import ballerinax/hubspot.events.completions;

completions:ConnectionConfig config = {
    auth: {token: "<bearer-token>"}
};
completions:Client client = check new (config);
```

### Operations

#### Event reporting

<details>
<summary>sendEvent</summary>

Send a single custom behavioral event occurrence to HubSpot. The event must reference an existing event definition by its fully qualified internal name, and can be associated with a CRM contact via email address, visitor user token, or object ID. Arbitrary custom properties defined for the event can be attached to the occurrence, and a past timestamp can be supplied in `occurredAt` to back-fill historical data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>EventOccurrence</code> | Yes | Event name, contact identifier, timestamp, and custom properties for one event occurrence |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
completions:EventOccurrence payload = {
    eventName: "pe<hubId>_<eventName>",
    email: "customer@example.com",
    occurredAt: "2026-08-07T10:00:00Z",
    properties: {
        "amount": "149.99",
        "product": "annual_subscription"
    }
};
http:Response response = check client->sendEvent(payload);
```

**Sample response:**

```bash
HTTP/1.1 204 No Content
```

</details>

<details>
<summary>sendEventBatch</summary>

Send a batch of up to 500 custom behavioral event occurrences to HubSpot in a single API call. Each occurrence in the batch may target a different event definition, CRM contact, and set of custom properties, making this operation efficient for reporting a burst of activity accumulated over a session or time window.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchEventOccurrence</code> | Yes | A list of individual event completion requests to submit together as one batch |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
completions:BatchEventOccurrence payload = {
    inputs: [
        {
            eventName: "pe<hubId>_<eventName>",
            email: "customer@example.com",
            occurredAt: "2026-08-07T09:45:00Z",
            properties: {"page": "/pricing"}
        },
        {
            eventName: "pe<hubId>_<eventName>",
            email: "customer@example.com",
            occurredAt: "2026-08-07T09:50:00Z",
            properties: {"page": "/checkout"}
        }
    ]
};
http:Response response = check client->sendEventBatch(payload);
```

**Sample response:**

```bash
HTTP/1.1 204 No Content
```

</details>
