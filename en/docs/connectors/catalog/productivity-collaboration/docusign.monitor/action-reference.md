---
connector: true
connector_name: "docusign.monitor"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The DocuSign Monitor connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Read the event stream of a Docusign organization and page through it with a cursor. |

---

## Client

The `Client` connects to the DocuSign Monitor API (`https://api.docusign.com`). It exposes 1 operation.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/docusign.monitor;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

final monitor:Client monitorClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken
    }
});
```

### Operations

#### Stream

<details>
<summary>getStream</summary>

<div>

Get the monitoring event stream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The unique identifier of the organization whose events are retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `cursor` | <code>string</code> | No | A location in the DataSet that continues querying data. |
| `'limit` | <code>int:Signed32</code> | No | Maximum number of results to return. |

**Returns:** `StreamResponse|error`

**Sample code:**

```ballerina
monitor:StreamResponse result = check monitorClient->getStream("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "resultData": [
    {
      "proxyStatus": "string",
      "country": "string",
      "city": "string"
    }
  ],
  "endCursor": "string"
}
```

</div>
</details>
