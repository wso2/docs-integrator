# Actions

The GraphQL connector spans 3 packages:
- `ballerina/graphql`
- `ballerina/graphql.dataloader`
- `ballerina/graphql.subgraph`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Sends GraphQL queries and mutations to a remote GraphQL endpoint and returns type-safe responses. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Sends GraphQL queries and mutations to a remote GraphQL endpoint and returns type-safe responses.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>ClientAuthConfig?</code> | `()` | Authentication configuration. Supports `CredentialsConfig`, `BearerTokenConfig`, `JwtIssuerConfig`, `OAuth2ClientCredentialsGrantConfig`, `OAuth2PasswordGrantConfig`, `OAuth2RefreshTokenGrantConfig`, or `OAuth2JwtBearerGrantConfig`. |
| `timeout` | <code>decimal</code> | `60` | Request timeout in seconds. |
| `retryConfig` | <code>RetryConfig?</code> | `()` | Retry configuration for failed requests. |
| `circuitBreaker` | <code>CircuitBreakerConfig?</code> | `()` | Circuit breaker configuration for fault tolerance. |
| `cache` | <code>CacheConfig</code> | `{}` | HTTP response cache configuration. |
| `compression` | <code>Compression</code> | `COMPRESSION_AUTO` | Compression setting for requests. |
| `secureSocket` | <code>ClientSecureSocket?</code> | `()` | SSL/TLS configuration for HTTPS endpoints. |
| `proxy` | <code>ProxyConfig?</code> | `()` | Proxy server configuration. |
| `validation` | <code>boolean</code> | `true` | Enable or disable client-side GraphQL document validation. |
| `followRedirects` | <code>FollowRedirects?</code> | `()` | HTTP redirect following configuration. |
| `cookieConfig` | <code>CookieConfig?</code> | `()` | Cookie management configuration. |
| `responseLimits` | <code>ResponseLimitConfigs</code> | `{}` | Response size limit configuration. |
| `http1Settings` | <code>ClientHttp1Settings</code> | `{}` | HTTP/1.1-specific client settings. |
| `poolConfig` | <code>PoolConfiguration?</code> | `()` | Connection pool configuration. |
| `forwarded` | <code>string</code> | `"disable"` | Forwarded header handling mode. |

### Initializing the client

```ballerina
import ballerina/graphql;

configurable string serviceUrl = ?;

graphql:Client graphqlClient = check new (serviceUrl);
```

### Operations

#### Query and mutation execution

<details>
<summary>execute</summary>

Sends a GraphQL document (query or mutation) to the remote endpoint and returns the response. Supports variables, operation name selection, custom headers, and type-safe response binding.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `document` | <code>string</code> | Yes | The GraphQL query or mutation document string. |
| `variables` | <code>map&lt;anydata&gt;?</code> | No | A map of variable names to values for parameterized queries. |
| `operationName` | <code>string?</code> | No | The name of the operation to execute when the document contains multiple operations. |
| `headers` | <code>map&lt;string&#124;string[]&gt;?</code> | No | Additional HTTP headers to include in the request. |
| `targetType` | <code>typedesc&lt;GenericResponseWithErrors&#124;record &#123;&#125;&#124;json&gt;</code> | No | The expected response type for type-safe binding. |

**Returns:** `targetType|ClientError`

**Sample code:**

```ballerina
json response = check graphqlClient->execute(
    string `query { allLifts { id name status } }`
);
```

**Sample response:**

```ballerina
{
  "data": {
    "allLifts": [
      {"id": "astra-express", "name": "Astra Express", "status": "OPEN"},
      {"id": "jazz-cat", "name": "Jazz Cat", "status": "OPEN"},
      {"id": "jolly-roger", "name": "Jolly Roger", "status": "CLOSED"}
    ]
  }
}
```

</details>
