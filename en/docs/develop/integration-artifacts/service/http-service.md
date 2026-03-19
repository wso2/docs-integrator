---
title: HTTP Service
description: Build REST APIs, webhooks, and data services with HTTP.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTTP Service

HTTP services are the foundation for REST APIs, webhooks, and data services in WSO2 Integrator. Use them to expose integration logic over HTTP with full support for path and query parameters, typed request/response payloads, CORS, interceptors, and TLS.

## Creating an HTTP service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click the **+** **Add Artifacts** button in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **HTTP Service** under **Integration as API**.

   ![Artifacts panel showing HTTP Service under Integration as API](/img/develop/integration-artifacts/service/http-service/step-2.png)

3. In the creation form, fill in the following fields:

   ![HTTP Service creation form](/img/develop/integration-artifacts/service/http-service/step-creation-form.png)

   **Service Contract**

   | Option | Description |
   |---|---|
   | **Design From Scratch** | Creates a new service with empty resources. Default selection. |
   | **Import From OpenAPI Specification** | Generates service stubs from an existing OpenAPI (Swagger) file or URL. |

   **Service Base Path**

   | Field | Description |
   |---|---|
   | **Service Base Path** | URL base path for the service (e.g., `/api`). Must not end with `/` unless it is the bare root path `/`. |

   **Advanced Configurations**

   Expand **Advanced Configurations** to choose the HTTP listener:

   | Option | Description |
   |---|---|
   | **Shared Listener (Port 9090)** | Attaches the service to the project's shared HTTP listener on port 9090. Use this when multiple services share one listener. |
   | **Custom Listener** | Creates a dedicated listener. Enter the port number in the **Listener Port** field that appears. |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The header shows the attached listener pill, the base path, and the list of resource functions.

   ![Service Designer showing the HTTP service canvas](/img/develop/integration-artifacts/service/http-service/step-3.png)

6. Click **+ Resource** to add a new HTTP resource, then select its HTTP method and path.
7. Click the resource row to open it in the **flow designer**.

   ![Flow designer showing the resource canvas](/img/develop/integration-artifacts/service/http-service/step-4.png)

8. Use the flow canvas to add integration steps — HTTP calls, database queries, and transformations.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/http;

configurable int port = 8090;

service /api on new http:Listener(port) {

    resource function get greeting() returns string {
        return "Hello from WSO2 Integrator!";
    }
}
```

</TabItem>
</Tabs>

## Service configuration

Service configuration controls the base path and advanced service-level settings such as CORS policy, authentication, and payload validation.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click **Configure** in the service header to open the **HTTP Service Configuration** panel.

| Field | Description |
|---|---|
| **Base Path** | URL base path for the service (e.g., `/api`). Required. |
| **Service Configuration** | Advanced service-level settings (CORS, auth, compression, etc.). Enter a `@http:ServiceConfig` record expression. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Service-level settings map to the `@http:ServiceConfig` annotation placed before the `service` declaration:

```ballerina
@http:ServiceConfig {
    cors: {
        allowOrigins: ["https://app.example.com"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
        maxAge: 3600
    }
}
service /api on new http:Listener(8090) {
    // Resources inherit CORS configuration.
}
```

All `@http:ServiceConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `host` | `string` | `"b7a.default"` | Virtual host name |
| `compression` | `CompressionConfig` | `{}` | Response compression settings |
| `chunking` | `Chunking` | `CHUNKING_AUTO` | Chunked transfer encoding mode |
| `cors` | `CorsConfig` | `{}` | CORS policy for all resources |
| `auth` | `ListenerAuthConfig[]` | — | Service-level authentication |
| `mediaTypeSubtypePrefix` | `string` | — | Custom media type subtype prefix |
| `treatNilableAsOptional` | `boolean` | `true` | Treat nilable parameters as optional |
| `validation` | `boolean` | `true` | Enable inbound payload validation |

**CORS configuration** (`CorsConfig`):

| Field | Type | Default | Description |
|---|---|---|---|
| `allowOrigins` | `string[]` | `[]` | Permitted origins |
| `allowMethods` | `string[]` | `[]` | Permitted HTTP methods |
| `allowHeaders` | `string[]` | `[]` | Permitted request headers |
| `exposeHeaders` | `string[]` | `[]` | Response headers accessible to the browser |
| `allowCredentials` | `boolean` | `false` | Allow cookies and credentials |
| `maxAge` | `decimal` | `-1` | Preflight cache duration in seconds |

**Interceptors:**

```ballerina
service class LoggingInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
        http:RequestContext ctx,
        http:Request req
    ) returns http:NextService|error? {
        log:printInfo("Request received", method = req.method, path = req.rawPath);
        return ctx.next();
    }
}

@http:ServiceConfig {
    interceptors: [new LoggingInterceptor()]
}
service /api on new http:Listener(8090) {
    resource function get data() returns json {
        return {message: "protected"};
    }
}
```

</TabItem>
</Tabs>

## Listener configuration

The listener binds to a port and handles incoming HTTP connections. When you create an HTTP service, WSO2 Integrator automatically creates an inline listener. You can also declare a named listener and attach multiple services to it.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **HTTP Service Configuration** panel, select **Http Listener** under **Attached Listeners** to configure the listener.

| Field | Description | Default |
|---|---|---|
| **Port** | Listening port of the HTTP service listener. Required. | `8090` |
| **Host** | Host name or IP address the listener binds to. | `0.0.0.0` |
| **HTTP1 Settings** | HTTP/1.x protocol settings (keep-alive, max pipelined requests). | `{}` |
| **Secure Socket** | TLS/SSL configuration. Configure this to enable HTTPS. | `()` |
| **HTTP Version** | Highest HTTP version the endpoint supports. | HTTP/2.0 |
| **Timeout** | Read/write timeout in seconds. Set to `0` to disable. | `60` |
| **Server** | Value for the `Server` response header. | `()` |
| **Request Limits** | Inbound size limits for URI, headers, and request body. | `{}` |
| **Graceful Stop Timeout** | Grace period in seconds before the listener force-stops. | `0` |
| **Socket Config** | Server socket settings (e.g., `soBackLog` queue length). | `{}` |
| **HTTP2 Initial Window Size** | Initial HTTP/2 flow-control window size in bytes. | `65535` |
| **Min Idle Time In Stale State** | Minimum seconds to hold an HTTP/2 connection open after `GOAWAY`. Set to `-1` to close after all in-flight streams finish. | `300` |
| **Time Between Stale Eviction** | Interval in seconds between HTTP/2 stale connection eviction runs. | `30` |

Click **+ Attach Listener** at the bottom of the panel to attach an additional listener or to select an existing named listener.

</TabItem>
<TabItem value="code" label="Ballerina Code">

**Inline listener** (created together with the service):

```ballerina
configurable int port = 8090;

service /api on new http:Listener(port) {
    resource function get greeting() returns string {
        return "Hello!";
    }
}
```

**Using a named listener** — declare the listener at module level and attach multiple services to it. This corresponds to the "select existing listener" option in the creation form.

```ballerina
listener http:Listener httpListener = new (8090, {
    host: "0.0.0.0",
    httpVersion: http:HTTP_2_0,
    timeout: 60,
    secureSocket: {
        key: {
            certFile: "/path/to/cert.pem",
            keyFile: "/path/to/key.pem"
        }
    }
});

service /api on httpListener {
    resource function get greeting() returns string {
        return "Hello!";
    }
}

service /health on httpListener {
    resource function get .() returns json {
        return {status: "ok"};
    }
}
```

All `http:ListenerConfiguration` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `host` | `string` | `"0.0.0.0"` | Bind address |
| `http1Settings` | `ListenerHttp1Settings` | `{}` | HTTP/1.x keep-alive and pipelining |
| `secureSocket` | `ListenerSecureSocket?` | `()` | TLS/SSL configuration |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | Highest supported HTTP version |
| `timeout` | `decimal` | `60` | Read/write timeout in seconds |
| `server` | `string?` | `()` | `Server` response header value |
| `requestLimits` | `RequestLimitConfigs` | `{}` | URI, header, and body size limits |
| `gracefulStopTimeout` | `decimal` | `0` | Grace period for `gracefulStop` in seconds |
| `socketConfig` | `ServerSocketConfig` | `{}` | Server socket settings |
| `http2InitialWindowSize` | `int` | `65535` | HTTP/2 initial flow-control window size |
| `minIdleTimeInStaleState` | `decimal` | `300` | Min seconds to keep a `GOAWAY` connection open |
| `timeBetweenStaleEviction` | `decimal` | `30` | HTTP/2 stale connection eviction interval |

</TabItem>
</Tabs>

## Resource configuration

Resources define the individual HTTP endpoints exposed by a service. Each resource maps to an HTTP method and a path.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the settings icon (⚙) on a resource row to open the **Resource Configuration** panel. You see the same panel when you click **+ Resource** to add a new resource.

**Method and path:**

| Field | Description |
|---|---|
| **HTTP Method** | HTTP verb. Options: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`. |
| **Resource Path** | Path segment appended to the service base path. Use `{paramName}` notation to define path parameters inline. |
| **+ Path Param** | Add a typed path parameter. Appears as `[type name]` in the resource function signature. |
| **+ Query Parameter** | Add a typed query parameter. Appears as a named parameter in the function signature. |
| **+ Header** | Add a named header parameter annotated with `@http:Header`. |

**Advanced Parameters** (expand to reveal):

| Parameter | Description |
|---|---|
| **Request** | Inject the full `http:Request` object, giving access to the request body, all headers, and metadata. |
| **Headers** | Inject `http:Headers` to access all HTTP headers sent by the client. |
| **Caller** | Inject `http:Caller` for fine-grained response control and caller identity information. |

**Responses:**

Add one or more response definitions. Each entry specifies an HTTP status code and a return type (e.g., `200` → `string`). Use **+ Response** to add additional status codes.

**Advanced Configurations** (expand to reveal): resource-level `@http:ResourceConfig` settings including per-resource CORS overrides, authentication, linked resources, and accepted/produced media types.

</TabItem>
<TabItem value="code" label="Ballerina Code">

**Resource function signature:**

```ballerina
resource function <method> <path>/<[type param]>(
    ParamType paramName,          // query parameter (named)
    @http:Payload PayloadType p,  // request body
    @http:Header string headerName, // named header
    http:Request req,             // full request object
    http:Caller caller            // caller object
) returns ResponseType {
}
```

**Path parameters:**

```ballerina
// GET /api/users/42
resource function get users/[int userId]() returns User|error {
    return getUser(userId);
}

// GET /api/files/docs/report.pdf  (rest parameter)
resource function get files/[string... path]() returns File|error {
    return getFile(path);
}
```

**Query parameters:**

```ballerina
// GET /api/products?category=electronics&limit=10
resource function get products(string? category, int limit = 20) returns Product[]|error {
    return searchProducts(category, limit);
}
```

**Request body:**

```ballerina
resource function post orders(@http:Payload Order order) returns Order|http:BadRequest|error {
    return createOrder(order);
}
```

**Named headers:**

```ballerina
resource function get data(@http:Header string authorization) returns json|http:Unauthorized {
    // Use the Authorization header value.
}
```

**CRUD pattern:**

```ballerina
service /orders on new http:Listener(8090) {

    resource function get .() returns Order[]|error {
        return getOrders();
    }

    resource function get [string id]() returns Order|http:NotFound {
        Order? order = getOrder(id);
        return order ?: http:NOT_FOUND;
    }

    resource function post .(Order order) returns Order|http:BadRequest|error {
        return createOrder(order);
    }

    resource function put [string id](Order order) returns Order|http:NotFound|error {
        return updateOrder(id, order);
    }

    resource function delete [string id]() returns http:NoContent|http:NotFound {
        boolean deleted = deleteOrder(id);
        return deleted ? http:NO_CONTENT : http:NOT_FOUND;
    }
}
```

**HTTP status code return types:**

| Return type | HTTP status |
|---|---|
| `string`, `json`, `record`, `byte[]` | 200 OK |
| `http:Created` | 201 Created |
| `http:Accepted` | 202 Accepted |
| `http:NoContent` | 204 No Content |
| `http:BadRequest` | 400 Bad Request |
| `http:Unauthorized` | 401 Unauthorized |
| `http:Forbidden` | 403 Forbidden |
| `http:NotFound` | 404 Not Found |
| `http:InternalServerError` | 500 Internal Server Error |
| `error` | 500 Internal Server Error |

</TabItem>
</Tabs>

<!-- ## Common patterns

### Typed request and response payloads

Define typed records for payloads. Ballerina validates and deserializes incoming JSON automatically.

```ballerina
type OrderRequest record {|
    string customerId;
    LineItem[] items;
    string? shippingAddress;
|};

type OrderResponse record {|
    string orderId;
    string status;
    decimal totalAmount;
    string createdAt;
|};

resource function post orders(OrderRequest request) returns OrderResponse|http:BadRequest|error {
    OrderResponse response = check processOrder(request);
    return response;
}
```

### Error responses

```ballerina
resource function get orders/[string id]() returns Order|http:NotFound {
    Order? order = getOrder(id);
    if order is () {
        http:NotFound notFound = {body: {code: "NOT_FOUND", message: "Order not found"}};
        return notFound;
    }
    return order;
}
``` -->

## What's next

- [gRPC Service](grpc-service.md) — define services using Protocol Buffers
- [Connections](../supporting/connections.md) — configure HTTP client connections to call external services
- [Data Mapper](../supporting/data-mapper.md) — transform request/response payloads between formats
