# Actions

The `ballerina/http` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Standard HTTP client for outbound requests with full protocol support, resilience, and auth. |
| [`StatusCodeClient`](#statuscodeclient) | HTTP client with status-code-based typed response binding. |
| [`FailoverClient`](#failoverclient) | Attempts subsequent endpoints on failure for high availability. |
| [`LoadBalanceClient`](#loadbalanceclient) | Round-robin load balancing across multiple endpoints. |

---

## Client

Standard HTTP client for making outbound requests to HTTP and HTTP2 endpoints. Supports connection pooling, circuit breaking, retry, caching, compression, and authentication.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version (`HTTP_1_0`, `HTTP_1_1`, `HTTP_2_0`). |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x specific settings (keep-alive, chunking, proxy). |
| `http2Settings` | `ClientHttp2Settings` | `{}` | HTTP/2 specific settings (prior knowledge, window size). |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `poolConfig` | `PoolConfiguration` | `()` | Connection pool configuration (max active/idle connections, wait time). |
| `auth` | `ClientAuthConfig` | `()` | Authentication configuration (Basic, Bearer, JWT, OAuth2). |
| `retryConfig` | `RetryConfig` | `()` | Retry policy (max retries, interval, backoff factor). |
| `circuitBreaker` | `CircuitBreakerConfig` | `()` | Circuit breaker configuration (failure threshold, wait duration). |
| `cache` | `CacheConfig` | `{}` | HTTP response caching configuration. |
| `compression` | `Compression` | `COMPRESSION_AUTO` | Compression behavior (`COMPRESSION_AUTO`, `COMPRESSION_ALWAYS`, `COMPRESSION_NEVER`). |
| `followRedirects` | `FollowRedirects` | `()` | Redirect following configuration (enabled, max count). |
| `cookieConfig` | `CookieConfig` | `()` | Cookie handling configuration. |
| `responseLimits` | `ResponseLimitConfigs` | `{}` | Response size limits (max header size, max body size). |
| `secureSocket` | `ClientSecureSocket` | `()` | TLS/SSL configuration (certificates, protocol, validation). |
| `proxy` | `ProxyConfig` | `()` | HTTP proxy configuration (host, port, credentials). |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |
| `laxDataBinding` | `boolean` | `false` | Enable lenient data binding for response payloads. |

### Initializing the client

```ballerina
import ballerina/http;

http:Client httpClient = check new ("https://api.example.com");
```

With retry and circuit breaker:

```ballerina
import ballerina/http;

http:Client httpClient = check new ("https://api.example.com", {
    timeout: 30,
    retryConfig: {
        count: 3,
        interval: 1,
        backOffFactor: 2.0,
        maxWaitInterval: 20
    },
    circuitBreaker: {
        rollingWindow: {timeWindow: 60, bucketSize: 10},
        failureThreshold: 0.5,
        resetTime: 30
    }
});
```

### Operations

#### HTTP requests

<details>
<summary>get</summary>

Sends an HTTP GET request to the specified path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | No | Optional request message (headers, etc.). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
// Get raw response
http:Response response = check httpClient->get("/api/users");

// Get with payload binding
json users = check httpClient->get("/api/users");

// Get with headers
map<string> headers = {"Accept": "application/json"};
json users = check httpClient->get("/api/users", headers = headers);
```

</details>

<details>
<summary>post</summary>

Sends an HTTP POST request with a payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | Yes | Request payload (JSON, XML, text, binary, or `Request`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `mediaType` | `string` | No | Content type of the payload. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
json payload = {name: "John", email: "john@example.com"};
json response = check httpClient->post("/api/users", payload);
```

</details>

<details>
<summary>put</summary>

Sends an HTTP PUT request with a payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | Yes | Request payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `mediaType` | `string` | No | Content type of the payload. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
json payload = {name: "John Updated", email: "john.updated@example.com"};
json response = check httpClient->put("/api/users/123", payload);
```

</details>

<details>
<summary>patch</summary>

Sends an HTTP PATCH request with a partial payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | Yes | Request payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `mediaType` | `string` | No | Content type of the payload. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
json payload = {email: "newemail@example.com"};
json response = check httpClient->patch("/api/users/123", payload);
```

</details>

<details>
<summary>delete</summary>

Sends an HTTP DELETE request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | No | Optional request payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
http:Response response = check httpClient->delete("/api/users/123");
```

</details>

<details>
<summary>head</summary>

Sends an HTTP HEAD request. Returns only response headers without a body.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

**Returns:** `Response|ClientError`

**Sample code:**

```ballerina
http:Response response = check httpClient->head("/api/users");
string? contentType = response.getHeader("Content-Type");
```

</details>

<details>
<summary>options</summary>

Sends an HTTP OPTIONS request to discover supported methods.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Request path. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
http:Response response = check httpClient->options("/api/users");
string? allowedMethods = response.getHeader("Allow");
```

</details>

<details>
<summary>execute</summary>

Sends an HTTP request with a dynamically specified method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `httpMethod` | `string` | Yes | HTTP method (e.g., `"GET"`, `"POST"`). |
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | No | Request payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `mediaType` | `string` | No | Content type of the payload. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
http:Response response = check httpClient->execute("GET", "/api/users");
```

</details>

<details>
<summary>forward</summary>

Forwards an incoming HTTP request to another endpoint, preserving the original request headers and payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Target path. |
| `request` | `Request` | Yes | The original HTTP request to forward. |
| `targetType` | `TargetType` | No | Response payload type for data binding. Defaults to `http:Response`. |

**Returns:** `Response|anydata|ClientError`

**Sample code:**

```ballerina
// Inside a service resource
resource function get proxy(http:Request req) returns http:Response|error {
    return check httpClient->forward("/backend/api", req);
}
```

</details>

#### Asynchronous requests

<details>
<summary>submit</summary>

Submits an asynchronous HTTP request and returns an `HttpFuture` for later retrieval.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `httpMethod` | `string` | Yes | HTTP method. |
| `path` | `string` | Yes | Request path. |
| `message` | `RequestMessage` | Yes | Request payload. |

**Returns:** `HttpFuture|ClientError`

**Sample code:**

```ballerina
http:HttpFuture future = check httpClient->submit("GET", "/api/long-running-task", ());
// ... do other work ...
http:Response response = check httpClient->getResponse(future);
```

</details>

<details>
<summary>getResponse</summary>

Retrieves the response for a previously submitted asynchronous request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `httpFuture` | `HttpFuture` | Yes | The future returned by `submit`. |

**Returns:** `Response|ClientError`

**Sample code:**

```ballerina
http:HttpFuture future = check httpClient->submit("GET", "/api/data", ());
http:Response response = check httpClient->getResponse(future);
```

</details>

#### Resource methods

The HTTP client also supports resource method syntax for a cleaner API style. Path segments are provided as part of the method call:

```ballerina
// GET /api/users/123
json user = check httpClient->/api/users/["123"];

// POST /api/users with JSON payload
json newUser = check httpClient->/api/users.post({name: "John", email: "john@example.com"});

// DELETE /api/users/123
http:Response res = check httpClient->/api/users/["123"].delete();
```

#### Utility methods

<details>
<summary>getCookieStore</summary>

Returns the cookie store associated with this client.

**Returns:** `CookieStore`

**Sample code:**

```ballerina
http:CookieStore store = httpClient.getCookieStore();
```

</details>

<details>
<summary>circuitBreakerForceClose</summary>

Forces the circuit breaker to the closed state.

**Sample code:**

```ballerina
httpClient.circuitBreakerForceClose();
```

</details>

<details>
<summary>circuitBreakerForceOpen</summary>

Forces the circuit breaker to the open state.

**Sample code:**

```ballerina
httpClient.circuitBreakerForceOpen();
```

</details>

<details>
<summary>getCircuitBreakerCurrentState</summary>

Returns the current state of the circuit breaker.

**Returns:** `CircuitState|ClientError`

**Sample code:**

```ballerina
http:CircuitState state = check httpClient.getCircuitBreakerCurrentState();
```

</details>

---

## StatusCodeClient

Identical to `Client` but provides status-code-based response binding. Returns typed responses for different HTTP status codes, enabling compile-time checks for response handling.

### Configuration

Same as [`Client` configuration](#configuration).

### Initializing the client

```ballerina
import ballerina/http;

http:StatusCodeClient scClient = check new ("https://api.example.com");
```

### Operations

The `StatusCodeClient` has the same remote methods as `Client` (`get`, `post`, `put`, `patch`, `delete`, `head`, `options`, `execute`, `forward`, `submit`, `getResponse`).

The key difference is that response types are bound to HTTP status codes:

```ballerina
type UserResponse record {|
    *http:Ok;
    record {|string name; string email;|} body;
|};

type UserNotFound record {|
    *http:NotFound;
    record {|string message;|} body;
|};

UserResponse|UserNotFound|error response = scClient->get("/api/users/123");

if response is UserResponse {
    // Handle 200 OK
} else if response is UserNotFound {
    // Handle 404 Not Found
}
```

---

## FailoverClient

Attempts subsequent endpoints on failure. If a request to the first endpoint fails, it automatically tries the next endpoint in the list.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `targets` | `TargetService[]` | Required | Array of target endpoints. |
| `failoverCodes` | `int[]` | `[501, 502, 503]` | HTTP status codes that trigger failover. |
| `intervalInMillis` | `int` | `0` | Failover interval in milliseconds. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `auth` | `ClientAuthConfig` | `()` | Authentication configuration. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration. |
| `secureSocket` | `ClientSecureSocket` | `()` | TLS/SSL configuration. |

### Initializing the client

```ballerina
import ballerina/http;

http:FailoverClient foClient = check new ({
    targets: [
        {url: "https://primary.example.com"},
        {url: "https://secondary.example.com"},
        {url: "https://tertiary.example.com"}
    ],
    failoverCodes: [500, 502, 503]
});
```

### Operations

Same remote methods as `Client`. Additionally:

<details>
<summary>getSucceededEndpointIndex</summary>

Returns the index of the endpoint that successfully processed the last request.

**Returns:** `int`

**Sample code:**

```ballerina
http:Response response = check foClient->get("/api/data");
int succeededIdx = foClient.getSucceededEndpointIndex();
```

</details>

---

## LoadBalanceClient

Distributes requests across multiple endpoints using round-robin load balancing.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `targets` | `TargetService[]` | Required | Array of target endpoints. |
| `lbRule` | `LoadBalancerRule` | Round-robin | Load balancing strategy. |
| `failover` | `boolean` | `true` | Enable failover when an endpoint fails. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `auth` | `ClientAuthConfig` | `()` | Authentication configuration. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration. |
| `secureSocket` | `ClientSecureSocket` | `()` | TLS/SSL configuration. |

### Initializing the client

```ballerina
import ballerina/http;

http:LoadBalanceClient lbClient = check new ({
    targets: [
        {url: "https://server1.example.com"},
        {url: "https://server2.example.com"},
        {url: "https://server3.example.com"}
    ]
});
```

### Operations

Same remote methods as `Client` (`get`, `post`, `put`, `patch`, `delete`, `head`, `options`, `execute`, `forward`, `submit`, `getResponse`).

```ballerina
// Requests are distributed across the three targets
json response = check lbClient->get("/api/data");
```
