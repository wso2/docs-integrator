---
sidebar_position: 3
title: Library Troubleshooting
description: Diagnose runtime errors from Ballerina standard libraries and connectors (HTTP, SQL, GraphQL, Kafka, RabbitMQ, NATS, JMS, gRPC, WebSocket).
keywords: [ballerina, http, sql, graphql, kafka, rabbitmq, nats, jms, grpc, websocket, troubleshooting, errors]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Library Troubleshooting

Runtime errors from Ballerina standard libraries and connectors. Each section covers diagnostic tools, error hierarchies, and common symptom-to-fix recipes for one library or connector family.

For general error reading (the `{org/module}ErrorType message` format and core runtime errors), see [Errors and Stack Traces](errors-and-stack-traces.md). For connection pool tuning under load, see [Performance Profiling](performance-profiling.md).

## HTTP

HTTP is the most common source of runtime issues. Enable trace logs first; they reveal the full request/response that's actually on the wire.

### HTTP trace logs

HTTP trace logs capture the complete request and response: headers, body, and timing. This is the first thing to enable for any HTTP-related issue.

```bash
# Single .bal file
bal run my_program.bal -Cballerina.http.traceLogConsole=true

# Package project (run from the package root)
bal run -- -Cballerina.http.traceLogConsole=true
```

Sample output:

```bash
[2024-03-15 10:30:01,234] TRACE {http.tracelog.downstream} - [id: 0x04eed4c9] REGISTERED
[2024-03-15 10:30:01,240] TRACE {http.tracelog.downstream} - [id: 0x04eed4c9, host:/127.0.0.1:9090 - remote:/127.0.0.1:54362] INBOUND: DefaultHttpRequest
  GET /api/users HTTP/1.1
  Host: localhost:9090
[2024-03-15 10:30:01,242] TRACE {http.tracelog.downstream} - [id: 0x04eed4c9] OUTBOUND: DefaultHttpResponse
  HTTP/1.1 200 OK
```

Two channels appear in the output:

| Channel | Meaning |
|---|---|
| `http.tracelog.downstream` | Traffic between an external client and the Ballerina listener/service |
| `http.tracelog.upstream` | Traffic between the Ballerina client and an upstream backend service |

If you see downstream logs but no upstream logs, the request is reaching the service but the service is not calling the backend. If you see neither, the service may not be starting.

:::caution
Trace logs include headers and bodies. Avoid enabling them in production; they expose sensitive data such as auth tokens and request payloads.
:::

### HTTP access logs

Access logs record summarized request/response metadata (method, path, status, timing), similar to Nginx/Apache access logs. Less verbose than trace logs, safe for production.

```toml
# Config.toml
[ballerina.http.accessLogConfig]
console = true          # print to console (stderr)
path = "access.log"     # also write to a file (optional)
```

Sample output:

```bash
192.168.1.10 - - [15/Mar/2024:10:30:01 +0000] "GET /api/users HTTP/1.1" 200 1234
10.0.0.5 - - [15/Mar/2024:10:30:05 +0000] "GET /api/users/999 HTTP/1.1" 404 89
```

| Log type | Use when | Production-safe? |
|---|---|---|
| Access logs | Tracking error rate patterns (5xx spikes), traffic volume, slow endpoints | Yes |
| Trace logs | Debugging a specific request/response issue | No (verbose; exposes sensitive headers/bodies) |

### HTTP client errors

HTTP client errors occur when your code makes an outbound HTTP request.

**Error hierarchy:**

```bash
http:ClientError
├── http:ApplicationResponseError       (any 4xx or 5xx HTTP response)
│   ├── http:ClientRequestError         (4xx responses)
│   └── http:RemoteServerError          (5xx responses)
├── http:ResiliencyError
│   ├── http:IdleTimeoutError
│   ├── http:AllRetryAttemptsFailed
│   ├── http:FailoverAllEndpointsFailedError
│   ├── http:UpstreamServiceUnavailableError
│   └── http:AllLoadBalanceEndpointsFailedError
├── http:GenericClientError
│   ├── http:MaximumWaitTimeExceededError   (connection pool exhausted)
│   └── http:UnsupportedActionError
├── http:Http2ClientError
├── http:SslError
├── http:ClientConnectorError
├── http:PayloadBindingError
├── http:HeaderBindingError
└── http:StatusCodeResponseBindingError
```

:::important
In Ballerina, HTTP 4xx and 5xx responses are **not automatically errors** when you bind to `http:Response`. They only become errors when you bind the response to a specific target type.
:::

How responses are returned:

```ballerina
// Pattern 1: Raw response. 4xx/5xx do NOT become errors.
http:Response response = check httpClient->get("/users/1");
// You must check response.statusCode yourself.

// Pattern 2: Bind to a type. 4xx/5xx BECOME errors.
User|error result = httpClient->get("/users/1");
// check automatically converts non-2xx to http:ClientRequestError or http:RemoteServerError.
```

Accessing error details from 4xx/5xx errors:

```ballerina
User|http:ClientRequestError|http:RemoteServerError result = httpClient->get("/users/1");
if result is http:ClientRequestError {
    int status = result.detail().statusCode;     // e.g., 404
    anydata body = result.detail().body;         // response body
    map<string[]> headers = result.detail().headers;
}
```

**Common HTTP client error patterns:**

| Error or symptom | Likely cause | Diagnosis | Fix |
|---|---|---|---|
| `Connection refused: host/IP:port` | Target service not running or wrong port | Verify the target URL and port | Correct the URL in the `http:Client` init |
| `Connection timed out` | Target is slow, firewall dropping packets, or network latency | Check connectivity with `curl`; enable trace logs | Increase `timeout` in `http:ClientConfiguration` |
| `idle connection timed out` | Connection was idle longer than the server's keep-alive timeout | Check trace logs for connection reuse | Reduce `maxIdleConnections` or reduce connection pool size |
| `SSL/TLS handshake failure` | Certificate mismatch, expired cert, missing trust store | Check cert validity: `openssl s_client -connect host:port` | Configure `secureSocket` (see [TLS/SSL](#tlsssl-and-certificates) below) |
| `All retry attempts failed` | Retry policy configured but all attempts failed | Check why individual attempts fail | Investigate the upstream service or adjust the retry policy |
| `Maximum wait time exceeded` | HTTP connection pool exhausted; requests queue up | Enable DEBUG logs; look for pool exhaustion messages | Increase `maxActiveConnections` in `poolConfig` (see [Performance Profiling](performance-profiling.md#http-connection-pool)) |

### Configuring resiliency on a client

Add timeout and retry settings to prevent slow upstream services from blocking the caller.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Select the connector node in the flow diagram.
2. Click **Advanced Settings** in the node properties panel.
3. Set the **Timeout** value (for example, `30` seconds).
4. Enable **Retry** and configure the retry count and interval.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/http;

http:Client backendClient = check new ("https://api.example.com", {
    timeout: 30,                    // request timeout (seconds)
    httpVersion: http:HTTP_1_1,
    poolConfig: {
        maxActiveConnections: 50,
        maxIdleConnections: 25,
        waitTime: 30
    },
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0
    }
});
```

</TabItem>
</Tabs>

### HTTP listener and service errors

These occur when your code is running an HTTP service.

**Listener error hierarchy:**

```bash
http:ListenerError
├── http:GenericListenerError
├── http:InterceptorReturnError
├── http:ListenerAuthError
│   ├── http:ListenerAuthnError                 (authentication failed → 401)
│   └── http:ListenerAuthzError                 (authorization failed → 403)
├── http:InboundRequestError
│   ├── http:InitializingInboundRequestError
│   ├── http:ReadingInboundRequestHeadersError
│   └── http:ReadingInboundRequestBodyError
├── http:OutboundResponseError
└── http:RequestDispatchingError
    ├── http:ServiceDispatchingError
    │   ├── http:ServiceNotFoundError           (404)
    │   └── http:BadMatrixParamError            (400)
    └── http:ResourceDispatchingError
        ├── http:ResourceNotFoundError          (404)
        ├── http:ResourceMethodNotAllowedError  (405)
        ├── http:UnsupportedRequestMediaTypeError (415)
        ├── http:RequestNotAcceptableError      (406)
        └── http:ResourceDispatchingServerError (500)
```

Listener-level binding errors that produce `400 Bad Request`:

- `http:QueryParameterBindingError` / `http:QueryParameterValidationError`
- `http:PathParameterBindingError`
- `http:PayloadBindingError` / `http:PayloadValidationError`
- `http:HeaderBindingError` / `http:HeaderValidationError`
- `http:MediaTypeBindingError`

**Common service issues:**

| Symptom | Likely cause | Diagnosis | Fix |
|---|---|---|---|
| Port already in use; listener fails to start | Another process on the port | `lsof -i :<port>` or `netstat -an \| grep <port>` | Change port, or stop the conflicting process |
| Service starts but no requests received | Listener binding to `localhost` but called externally | Check the `host` in listener config | Change to `"0.0.0.0"` for external access |
| `401 Unauthorized` returned | Auth handler configured but request lacks credentials | Check trace logs for the `Authorization` header | Verify authentication configuration |
| `500 Internal Server Error` | Unhandled error or panic in a resource function | Check application logs; enable DEBUG; look for stack traces in stderr | Fix the error in the resource handler |
| CORS errors in browser | CORS not configured or misconfigured | Check response headers in trace log | Configure `http:CorsConfig` on the service |

**Diagnosing a 500:** look in **stderr** for a stack trace with `at myorg/...` frames. That's where the panic or unhandled error occurred.

### HTTP configuration reference

Commonly adjusted HTTP client configuration:

```ballerina
http:Client cl = check new ("http://api.example.com", {
    timeout: 30,                    // request timeout in seconds (default: 60)
    followRedirects: {
        enabled: true,
        maxCount: 5
    },
    retryConfig: {
        count: 3,
        interval: 0.5,              // seconds between retries
        backOffFactor: 2.0,
        maxWaitInterval: 20.0
    },
    poolConfig: {
        maxActiveConnections: 100,  // default: -1 (unlimited)
        maxIdleConnections: 100,
        waitTime: 30
    },
    secureSocket: {
        cert: "/path/to/cert.pem"
    }
});
```

## SQL and database

### Connection issues

**Error example:**

```bash
error: {ballerina/sql}DatabaseError Communications link failure: ...
```

Checklist:

1. Verify the database host, port, username, and password.
2. Check connectivity from the machine running Ballerina: `telnet <host> <port>`.
3. **Confirm the driver package is imported.** This is the most common cause of confusing init failures:

   ```ballerina
   import ballerinax/mysql.driver as _;       // MySQL
   import ballerinax/mssql.driver as _;       // MSSQL
   import ballerinax/postgresql.driver as _;  // PostgreSQL
   ```

   Without this import, you may see `No suitable driver found for jdbc:...` or a generic initialization failure.
4. Check if the connection pool is exhausted (see [Performance Profiling](performance-profiling.md#sql-connection-pool)).

### Query errors

**Error hierarchy:**

```bash
sql:Error
├── sql:DatabaseError       (DB operation failed; has errorCode and sqlState)
├── sql:NoRowsError         (queryRow() matched no rows)
├── sql:BatchExecuteError   (one or more batch commands failed)
└── sql:ApplicationError
    └── sql:DataError
        ├── sql:TypeMismatchError
        ├── sql:ConversionError
        ├── sql:FieldMismatchError
        └── sql:UnsupportedTypeError
```

Accessing database error details:

```ballerina
User|sql:Error result = dbClient->queryRow(`SELECT * FROM users WHERE id = ${userId}`);
if result is sql:NoRowsError {
    // No row found. Handle gracefully.
} else if result is sql:DatabaseError {
    string sqlState = result.detail().sqlState ?: "";
    int errorCode = result.detail().errorCode ?: 0;
}
```

**Common SQL error patterns:**

| Error | SQL state | Likely cause | Fix |
|---|---|---|---|
| `{ballerina/sql}NoRowsError` | _none_ | `queryRow()` matched no rows | Handle `NoRowsError` as a valid case |
| `Duplicate entry` | `23000` | Unique constraint violation on insert | Check for duplicates before insert, or use `ON DUPLICATE KEY UPDATE` |
| `Table doesn't exist` | `42S02` | Wrong table name, or database not migrated | Check schema; run migrations |
| `Access denied` | `28000` | Wrong username or password | Verify credentials |
| `Communications link failure` | _none_ | Network issue or DB server down | Check connectivity |
| `Connection pool exhausted` | _none_ | All connections in use | Increase `maxOpenConnections` or find connection leaks |
| `No suitable driver found` | _none_ | Driver not imported | Add `import ballerinax/mysql.driver as _;` |

### Transactions

Ballerina supports transactions with the `transaction` block:

```ballerina
transaction {
    check dbClient->execute(`INSERT INTO orders VALUES (${id}, ${amount})`);
    check dbClient->execute(`UPDATE inventory SET stock = stock - 1 WHERE id = ${itemId}`);
    check commit;
} on fail var e {
    // transaction rolled back automatically
}
```

Common transaction problems:

- **Transaction not committed:** Code returns or errors before reaching `check commit`.
- **Implicit rollback:** An error inside the transaction block causes automatic rollback. Check the `on fail` clause.
- **Cross-database transactions:** Ballerina transactions are single-datasource by default; cross-database transactions require explicit coordination.

## GraphQL

GraphQL in Ballerina runs on top of `ballerina/http`. Both HTTP trace logs and GraphQL-specific diagnostics are useful.

### Error types

**Server-side (`graphql:Error`, listener lifecycle):**

```bash
graphql:Error
├── graphql:AuthnError    (authentication failed)
└── graphql:AuthzError    (authorization failed)
```

**Client-side (`graphql:ClientError`):**

```bash
graphql:ClientError
├── graphql:RequestError
│   ├── graphql:HttpError              (network error)
│   └── graphql:InvalidDocumentError   (query fails schema validation)
├── graphql:PayloadBindingError        (response cannot be bound to expected type)
└── graphql:ServerError                (deprecated, old executeWithType() API)
```

### Service-side resolver errors

Any Ballerina `error` returned from a resource or remote method (resolver) is automatically converted to a GraphQL `errors` array entry in the response. The service does not crash. The client sees:

```json
{
  "data": null,
  "errors": [{ "message": "Something went wrong", "locations": [...], "path": [...] }]
}
```

To diagnose, enable DEBUG logging to see the error before it is serialized, and enable HTTP trace logs to see the full GraphQL request/response JSON.

### Common GraphQL issues

| Symptom | Likely cause | Fix |
|---|---|---|
| Compile error: "must have at least one resource function" | Service has no `resource function get ...` | Add at least one query resolver |
| Compile error on return type | Resource function returns `error` or `error?` alone | Change to return `T\|error` where T is the actual data type |
| Subscription not working | Resource function returns `T` instead of `stream<T>` | Change return type to `stream<T, error?>` |
| `graphql:InvalidDocumentError` on client | Query does not match the schema | Validate the query document against the published schema |
| `graphql:PayloadBindingError` | Client type does not match the GraphQL response structure | Check the target record type against the schema |
| Auth error on subscription | WebSocket upgrade is missing auth headers | Pass auth tokens in the connection init params |
| Union type compile error | Union member service class is not `distinct` | Declare each union member as `distinct service class` |

### Context and DataLoader

`graphql:Context` allows passing request-scoped data through the resolver chain:

```ballerina
resource function get user(graphql:Context ctx) returns User|error {
    string token = check ctx.get("auth_token").ensureType();
    // ...
}
```

The most common pitfall is calling `ctx.get("key")` when the key was never set; this raises a `{ballerina}KeyNotFound` panic. Ensure interceptors call `ctx.set("key", value)` before resolvers that depend on those keys run.

DataLoader batches and caches data fetches to solve the N+1 query problem. Common DataLoader issues:

| Issue | Symptom | Fix |
|---|---|---|
| N+1 queries not resolved | Excessive database calls visible in trace logs | Ensure a DataLoader is registered and used in resolvers |
| Batch function error | An `error` from the batch function propagates to all waiting resolvers | Handle errors per-key in the batch function where possible |
| Stale cached data | Resolver returns outdated data | DataLoader cache is per-request by default; don't share instances across requests |

## Messaging connectors

### Kafka

| Error or symptom | Likely cause | Fix |
|---|---|---|
| `Connection refused` to broker | Kafka broker not running or wrong address | Verify broker address in `kafka:ProducerConfiguration` / `kafka:ConsumerConfiguration` |
| `Leader not available` | Topic doesn't exist or broker is in election | Create the topic first; wait for leader election |
| `SASL authentication failure` | Wrong credentials or wrong SASL mechanism | Verify `securityProtocol` and SASL config |
| Consumer not receiving messages | Wrong `groupId` or `autoOffsetReset` | Ensure `groupId` is unique per consumer group; set `autoOffsetReset = "earliest"` for testing |
| Messages published but not consumed | Consumer running but service not dispatching | Check `pollTimeout` and `concurrentConsumers` settings |

Reference consumer configuration:

```ballerina
kafka:ConsumerConfiguration consumerConfig = {
    groupId: "my-group",          // must be unique per consumer group
    topics: ["my-topic"],
    pollingInterval: 1,
    autoOffsetReset: "earliest",  // start from beginning for new groups
    autoCommit: false             // manual commit recommended for reliability
};
```

### RabbitMQ

| Error or symptom | Likely cause | Fix |
|---|---|---|
| `Connection refused` | RabbitMQ not running or wrong host/port (default 5672) | Verify host/port; check RabbitMQ management UI |
| `ACCESS_REFUSED` | Wrong username/password or missing virtual host permissions | Check credentials and vhost configuration |
| `NOT_FOUND` on queue/exchange | Queue or exchange doesn't exist | Declare the queue with `queueDeclare()` before consuming, or create it via the management UI |
| Messages not delivered | Wrong routing key or exchange type | Verify exchange type and routing key match between producer and consumer |
| Messages published but not consumed | Exchange/queue binding mismatch | Ensure `queueBind()` uses the exact same exchange name, routing key, and arguments as the exchange declaration |

:::important
In Ballerina's RabbitMQ client, queues must be declared before consuming. Use `channel->queueDeclare({queueName: "my-queue"})` or ensure the queue already exists on the broker. Consuming from a non-existent queue results in a `NOT_FOUND` channel error that closes the channel.
:::

### NATS

| Error or symptom | Likely cause | Fix |
|---|---|---|
| `Connection refused` to port 4222 | NATS server not running or wrong address | Verify the URL (default: `nats://localhost:4222`) |
| Messages not received | Subject mismatch between publisher and subscriber | NATS subjects are case-sensitive; check for typos |
| Subscriber receives no messages despite correct subject | Queue group misconfiguration | If using queue groups, ensure the `queueName` is intentional. Without a queue group, all subscribers receive all messages |
| `Authorization Violation` | Auth credentials missing or incorrect | Configure `auth` in `nats:ConnectionConfiguration` (token, user/password, or NKey) |
| Messages lost | No persistence (core NATS is fire-and-forget) | Use NATS JetStream (`ballerinax/nats.jetstream`) for at-least-once delivery |

NATS subject wildcards:

| Pattern | Meaning | Example |
|---|---|---|
| `*` | Matches a single token | `orders.*` matches `orders.new` but not `orders.us.new` |
| `>` | Matches one or more tokens (must be last) | `orders.>` matches `orders.new` and `orders.us.new` |

### JMS

| Error or symptom | Likely cause | Fix |
|---|---|---|
| `Connection refused` | JMS broker not running or wrong connection URL | Verify `initialContextFactory` and `providerUrl` in connection config |
| Messages not consumed | `connection.start()` not called (JMS connections start in stopped mode) | Call `start()` on the JMS connection before consuming |
| `Queue not found` / `Destination not found` | Queue/topic does not exist on the broker | Create the destination on the broker first, or configure auto-creation if supported |
| `Authentication failed` | Wrong credentials | Verify username/password in `jms:ConnectionConfiguration` |
| `ClassNotFoundException` for provider | Provider JAR not on classpath | Add the JMS provider JAR (e.g., ActiveMQ client) to `Ballerina.toml` platform dependencies |

Provider notes:

- **ActiveMQ:** `initialContextFactory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"` and `providerUrl = "tcp://localhost:61616"`. Requires the ActiveMQ client JAR.
- **IBM MQ:** Use the IBM MQ JMS client JAR. Connection factory setup may require JNDI or direct configuration with `MQQueueConnectionFactory`.

JMS provider JARs must be declared in `Ballerina.toml` under `[[platform.java17.dependency]]` (or the appropriate Java version).

## gRPC

| gRPC status | What it means | Ballerina side |
|---|---|---|
| `UNAVAILABLE` | Server not running or unreachable | Check server address in stub init |
| `UNAUTHENTICATED` | Missing or invalid credentials | Configure TLS/auth in `grpc:ClientConfiguration` |
| `UNIMPLEMENTED` | Method exists in proto but not in server | Regenerate stubs; verify proto file alignment |
| `DEADLINE_EXCEEDED` | Call took longer than client deadline | Increase `timeout` in call options |
| `INVALID_ARGUMENT` | Message validation failed | Check request message fields |

Regenerate stubs:

```bash
bal grpc --input service.proto --output ./generated --mode client
bal grpc --input service.proto --output ./generated --mode service
```

## WebSocket

| Symptom | Likely cause | Fix |
|---|---|---|
| Upgrade request rejected | Server not configured as WebSocket endpoint | Verify the service uses `websocket:Service` or `http:WebSocketService` |
| Connection closes unexpectedly | Idle timeout or ping/pong failure | Configure `pingPongHandler` and increase `idleTimeoutInSeconds` |
| Messages not received | Frame size limit exceeded | Check `maxFrameSize` in listener config |
| `101 Switching Protocols` not received | Proxy or load balancer stripping the `Upgrade` header | Configure the proxy to allow WebSocket upgrades |

## General connector error patterns

For any `ballerinax/*` connector (Salesforce, GitHub, ServiceNow, Twilio, etc.), errors typically follow this pattern:

```bash
error: {ballerinax/<connector>}Error <message from upstream API>
```

Or the error wraps an HTTP error:

```bash
error: Error occurred while getting the HTTP response. status: 401, reason: Unauthorized
```

Diagnosis checklist:

1. Enable HTTP trace logs. Connector calls go over HTTP; trace logs show the raw request/response.
2. Verify API credentials (key, token, OAuth) in `Config.toml`.
3. Check the upstream API's status page for outages.
4. Verify the API endpoint URL and version.
5. Check whether the connector version supports the API version being used.

## Data binding (jsondata and xmldata)

The `ballerina/data.jsondata` and `ballerina/data.xmldata` modules handle conversion between Ballerina types and JSON/XML. They are used implicitly by HTTP payload binding and explicitly via `jsondata:parseString()`, `jsondata:parseAsType()`, etc.

For common binding errors (missing fields, incompatible types, extra fields), see the data binding section in [Errors and Stack Traces](errors-and-stack-traces.md#data-binding-errors).

### Controlling binding behavior

```ballerina
import ballerina/data.jsondata;

// Allow absent optional fields (default behavior)
type User record {
    string name;
    string? email;       // optional; absent key maps to nil
    int age = 0;         // default value; absent key uses default
};

// Strict binding: reject unknown fields
type StrictUser record {|
    string name;
    int age;
|};

// Parse with options
User user = check jsondata:parseString(jsonStr, {
    nilAsOptionalField: true,    // treat null JSON values as absent optional fields
    allowDataProjection: true    // ignore extra fields (default: true for open records)
});
```

Diagnosis approach:

1. Enable HTTP trace logs to see the actual JSON/XML payload.
2. Compare the payload structure against the target Ballerina record type. Check for field name mismatches, missing fields, and type mismatches.
3. For complex nested types, try binding to `json` or `xml` first to confirm the raw payload is valid, then narrow to the specific record type.

## TLS/SSL and certificates

### Common TLS errors

| Error or symptom | Likely cause | Fix |
|---|---|---|
| `PKIX path building failed` | Server certificate not trusted by the JVM trust store | Import the CA certificate into the Ballerina JRE trust store, or configure `secureSocket` on the client |
| `SSL/TLS handshake failure` | Certificate mismatch, expired cert, or protocol version mismatch | Check cert validity: `openssl s_client -connect host:port`; verify TLS version compatibility |
| `unable to find valid certification path to requested target` | Self-signed certificate or missing intermediate CA | Add the full certificate chain to the trust store or `secureSocket.cert` |
| Client certificate rejected by server (mTLS) | Client cert not configured or not trusted by server | Configure `secureSocket.key` on the client; ensure the server's trust store includes the client CA |

### Configuring TLS on an HTTP client

```ballerina
// One-way TLS (client verifies server)
http:Client secureClient = check new ("https://api.example.com", {
    secureSocket: {
        cert: "/path/to/server-cert.pem"   // trust store: server's CA cert
    }
});

// Mutual TLS (mTLS; both sides verify)
http:Client mtlsClient = check new ("https://api.example.com", {
    secureSocket: {
        cert: "/path/to/server-cert.pem",
        key: {
            certFile: "/path/to/client-cert.pem",
            keyFile: "/path/to/client-key.pem"
        }
    }
});
```

### Configuring TLS on an HTTP listener

```ballerina
listener http:Listener secureListener = new (9443, {
    secureSocket: {
        key: {
            certFile: "/path/to/server-cert.pem",
            keyFile: "/path/to/server-key.pem"
        },
        mutualSsl: {
            cert: "/path/to/client-truststore.pem"  // trust store for client certs
        }
    }
});
```

### Using JKS or PKCS12 files

Common in enterprise environments:

```ballerina
http:Client client = check new ("https://api.example.com", {
    secureSocket: {
        cert: {
            path: "/path/to/truststore.p12",
            password: "truststorePassword"
        },
        key: {
            path: "/path/to/keystore.p12",
            password: "keystorePassword"
        }
    }
});
```

:::tip
When troubleshooting TLS issues, use `openssl s_client -connect host:port -showcerts` to inspect the certificate chain presented by the server. Compare it against what the client is configured to trust.
:::

## OAuth2 and JWT

### Common auth errors

| Error or symptom | Likely cause | Fix |
|---|---|---|
| `401 Unauthorized` from upstream API | OAuth2 token expired or invalid | Check token expiry; verify the client credentials grant is configured correctly |
| `403 Forbidden` from upstream API | Token valid but missing required scopes | Check the `scopes` configuration in the OAuth2 client config |
| JWT validation failure on service side | Token signature invalid, expired, or wrong issuer | Verify `issuer`, `audience`, and `signatureConfig` in `http:JwtValidatorConfig` |
| Token refresh failing silently | Refresh token expired or revoked | Check refresh token validity; re-authenticate |

### OAuth2 client credentials grant (machine-to-machine)

```ballerina
http:Client apiClient = check new ("https://api.example.com", {
    auth: {
        tokenUrl: "https://auth.example.com/oauth2/token",
        clientId: "my-client-id",
        clientSecret: "my-client-secret",
        scopes: ["read", "write"]
    }
});
```

### JWT authentication on a service

```ballerina
listener http:Listener secureListener = new (9090, {
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "https://auth.example.com",
                audience: "my-api",
                signatureConfig: {
                    jwksConfig: {
                        url: "https://auth.example.com/.well-known/jwks.json"
                    }
                }
            },
            scopes: ["admin"]
        }
    ]
});
```

### Diagnosing auth failures

1. Enable [HTTP trace logs](#http-trace-logs). Check if the `Authorization` header is being sent and what value it contains.
2. Decode the JWT token (use `jwt.io` or similar). Check `exp` (expiry), `iss` (issuer), `aud` (audience), and `scope` claims.
3. For OAuth2 client credentials, verify the token endpoint is reachable and the credentials are correct:

   ```bash
   curl -X POST https://auth.example.com/oauth2/token \
     -d "grant_type=client_credentials&client_id=ID&client_secret=SECRET&scope=read"
   ```

## See also

- [Errors and Stack Traces](errors-and-stack-traces.md): Error format, stack traces, and core runtime errors
- [Performance Profiling](performance-profiling.md): Connection pool and JVM memory tuning
