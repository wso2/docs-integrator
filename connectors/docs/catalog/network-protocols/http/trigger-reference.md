---
title: Triggers
---

# Triggers

The `ballerina/http` module supports inbound HTTP request handling through its listener and service model. When HTTP requests arrive, the `http:Listener` dispatches them to matching service resource methods automatically: your service reacts to each request by HTTP method and path.

Three components work together:

| Component | Role |
|-----------|------|
| `http:Listener` | Binds to a network port and accepts incoming HTTP connections. |
| `http:Service` | Defines resource methods that handle requests by HTTP method and URL path. |
| `http:Caller` | Represents the client connection, used to send responses back. |

For outbound HTTP operations, see the [Action Reference](action-reference.md).

---

## Listener

The `http:Listener` binds to a port and dispatches incoming HTTP requests to attached services.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | `"0.0.0.0"` | Network interface to bind to. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version (`HTTP_1_0`, `HTTP_1_1`, `HTTP_2_0`). |
| `http1Settings` | `ListenerHttp1Settings` | `{}` | HTTP/1.x specific settings. |
| `secureSocket` | `ListenerSecureSocket` | `()` | TLS/SSL configuration (certificate, key, protocol). |
| `timeout` | `decimal` | `60` | Period of time in seconds that a connection waits for a read/write operation. Use `0` to disable timeout. |
| `server` | `string` | `()` | Server header value. |
| `requestLimits` | `RequestLimitConfigs` | `{}` | Request size limits (max URI length, header size, body size). |
| `http2InitialWindowSize` | `int` | `65535` | HTTP/2 flow control window size. |
| `minIdleTimeInStaleState` | `decimal` | `300` | **HTTP/2 only.** Time in seconds a connection that has received a GOAWAY is kept open. Set to `-1` to close the connection only after all in-flight streams complete. |
| `timeBetweenStaleEviction` | `decimal` | `30` | **HTTP/2 only.** Interval in seconds between runs that evict GOAWAY-marked stale connections. |

### Initializing the listener

**Basic listener on a port:**

```ballerina
import ballerina/http;

listener http:Listener httpListener = new (9090);
```

**With host binding and request limits:**

```ballerina
import ballerina/http;

listener http:Listener httpListener = new (9090, {
    host: "0.0.0.0",
    requestLimits: {
        maxUriLength: 4096,
        maxHeaderSize: 8192,
        maxEntityBodySize: 10485760
    }
});
```

**With TLS/SSL:**

```ballerina
import ballerina/http;

listener http:Listener secureListener = new (9443, {
    secureSocket: {
        key: {
            certFile: "/path/to/cert.pem",
            keyFile: "/path/to/key.pem"
        }
    }
});
```

**Attaching a service to multiple listeners:**

```ballerina
import ballerina/http;

listener http:Listener httpListener = new (9090);
listener http:Listener httpsListener = new (9443, {
    secureSocket: {key: {certFile: "server.crt", keyFile: "server.key"}}
});

service /api on httpListener, httpsListener {
    // service handles both HTTP and HTTPS traffic
}
```

---

## Service

An `http:Service` is a Ballerina service attached to an `http:Listener`. It defines resource methods that handle incoming HTTP requests based on the HTTP method and URL path.

### Resource method signatures

| HTTP Method | Resource Accessor | Signature |
|-------------|-------------------|-----------|
| GET | `get` | `resource function get path() returns ResponseType` |
| POST | `post` | `resource function post path(@http:Payload PayloadType payload) returns ResponseType` |
| PUT | `put` | `resource function put path(@http:Payload PayloadType payload) returns ResponseType` |
| PATCH | `patch` | `resource function patch path(@http:Payload PayloadType payload) returns ResponseType` |
| DELETE | `delete` | `resource function delete path() returns ResponseType` |
| HEAD | `head` | `resource function head path() returns ResponseType` |
| OPTIONS | `options` | `resource function options path() returns ResponseType` |
| Any | `default` | `resource function default path() returns ResponseType` |

You only need to implement the HTTP methods your service supports. Unhandled methods automatically return `405 Method Not Allowed`.

### Parameter binding

Resource methods can accept the following parameter types:

| Annotation | Type | Description |
|------------|------|-------------|
| (path segment) | `string`, `int`, `float`, `decimal`, `boolean` (and their array forms) | Path parameters extracted from the URL. Use `[string... path]` to capture remaining segments as a rest parameter. |
| `@http:Payload` | `json`, `xml`, `string`, `byte[]`, `map<json>`, `table<map<json>>`, `record`, plus arrays and `readonly` variants of the above | Request body payload. If the parameter type is a structural type, the annotation is optional. |
| `@http:Header` | `string`, `int`, `float`, `decimal`, `boolean`, their array forms, and the nilable variants of all of these. Also a `record` type whose fields follow the same rules. | Specific request header values. |
| `@http:Query` | `string`, `int`, `float`, `decimal`, `boolean`, their array forms, and the nilable variants of all of these. | Query parameter values. |
| N/A | `http:Caller` | Client connection for sending responses manually. |
| N/A | `http:Request` | Full request object for advanced access. |
| N/A | `http:Headers` | Request header accessor. |
| N/A | `http:RequestContext` | Per-request context used to pass values between interceptors and resources. |

### Return types

Resource methods can return any of the following types to send a response:

| Return Type | Description |
|-------------|-------------|
| `string`, `json`, `xml`, `byte[]` | Payload sent with the default status code (`201 CREATED` for POST resources and `200 OK` for others) and appropriate content type. |
| `record` | Serialized as JSON with the default status code (`201 CREATED` for POST resources and `200 OK` for others). |
| `http:Ok`, `http:Created`, `http:Accepted`, ... | Status-code-specific response records with optional body and headers. |
| `http:Response` | Full control over status code, headers, and body. |
| `error` | Returns `500 Internal Server Error`. |
| `http:StatusCodeResponse` | Union of all status code response records. |

### Full usage example

```ballerina
import ballerina/http;

type User record {|
    string name;
    string email;
|};

listener http:Listener httpListener = new (9090);

service /api on httpListener {

    // GET /api/greeting?name=John
    resource function get greeting(string name = "World") returns string {
        return "Hello, " + name + "!";
    }

    // GET /api/users/123
    resource function get users/[int id]() returns User|http:NotFound {
        // Look up user by ID
        if id == 123 {
            return {name: "John", email: "john@example.com"};
        }
        return http:NOT_FOUND;
    }

    // POST /api/users
    resource function post users(User user) returns http:Created|error {
        // Create the user
        return {body: {message: "User created", name: user.name}};
    }

    // DELETE /api/users/123
    resource function delete users/[int id]() returns http:NoContent {
        // Delete the user
        return http:NO_CONTENT;
    }
}
```

---

## Interceptors

Interceptors process requests and responses before and after resource execution, enabling cross-cutting concerns like logging, authentication, and header manipulation.

| Type | Description |
|------|-------------|
| `RequestInterceptor` | Processes incoming requests before the resource method is invoked. |
| `ResponseInterceptor` | Processes outgoing responses after the resource method completes. |
| `RequestErrorInterceptor` | Handles errors during request processing. |
| `ResponseErrorInterceptor` | Handles errors during response processing. |

Define an interceptor as a `service class` that includes one of the four interceptor types:

```ballerina
import ballerina/http;
import ballerina/log;

service class LoggingInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](http:RequestContext ctx, http:Request req)
            returns http:NextService|error? {
        log:printInfo("Request received", method = req.method, path = req.rawPath);
        return ctx.next();
    }
}
```

Engage the interceptor by declaring the target service as `http:InterceptableService` and returning interceptor instances from `createInterceptors()`:

```ballerina
service http:InterceptableService /api on httpListener {

    public function createInterceptors() returns LoggingInterceptor {
        return new LoggingInterceptor();
    }

    resource function get greeting() returns string {
        return "Hello!";
    }
}
```

`createInterceptors()` may return a single interceptor or an array; the elements run in order on the request side and in reverse order on the response side.

---

## Supporting types

### `RequestLimitConfigs`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `maxUriLength` | `int` | `4096` | Maximum URI length in bytes. |
| `maxHeaderSize` | `int` | `8192` | Maximum total header size in bytes. |
| `maxEntityBodySize` | `int` | `-1` | Maximum request body size in bytes (`-1` for unlimited). |

### `ListenerSecureSocket`

| Field | Type | Description |
|-------|------|-------------|
| `key` | `CertKey` | Server certificate and private key. |
| `mutualSsl` | `record` | Mutual SSL configuration (client certificate validation). |
| `protocol` | `record` | TLS protocol version constraints. |
| `certValidation` | `record` | Certificate validation type (OCSP, CRL). |
| `handshakeTimeout` | `decimal` | TLS handshake timeout in seconds. |
| `sessionTimeout` | `decimal` | TLS session timeout in seconds. |

### `CorsConfig`

| Field | Type | Description |
|-------|------|-------------|
| `allowOrigins` | `string[]` | Permitted origin domains. |
| `allowMethods` | `string[]` | Permitted HTTP methods. |
| `allowHeaders` | `string[]` | Permitted request headers. |
| `exposeHeaders` | `string[]` | Headers exposed to the client. |
| `allowCredentials` | `boolean` | Whether to allow credentials. |
| `maxAge` | `int` | Pre-flight response cache duration in seconds. |
