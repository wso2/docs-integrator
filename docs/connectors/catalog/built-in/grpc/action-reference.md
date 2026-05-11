# Actions

The gRPC module spans 6 packages:
- `ballerina/grpc`
- `ballerina/grpc.types.duration`
- `ballerina/grpc.types.struct`
- `ballerina/grpc.types.timestamp`
- `ballerina/grpc.types.wrappers`
- `ballerina/grpc.types.any`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Base client for initiating all four gRPC communication patterns with a remote gRPC server. |
| [`Streaming Client`](#streaming-client) | Used in client streaming and bidirectional streaming RPCs to send messages, receive responses, and manage stream lifecycle. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Base client for initiating all four gRPC communication patterns with a remote gRPC server.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `timeout` | <code>decimal</code> | `60` | The maximum time to wait (in seconds) for a response before closing the connection. |
| `poolConfig` | <code>PoolConfiguration?</code> | `()` | Connection pool configuration for managing HTTP/2 connections. |
| `secureSocket` | <code>ClientSecureSocket?</code> | `()` | SSL/TLS configuration for secure communication. |
| `compression` | <code>Compression</code> | `COMPRESSION_AUTO` | Specifies how to handle compression (`COMPRESSION_AUTO`, `COMPRESSION_ALWAYS`, `COMPRESSION_NEVER`). |
| `retryConfiguration` | <code>RetryConfiguration?</code> | `()` | Retry configuration with backoff for failed unary RPC calls. |
| `auth` | <code>ClientAuthConfig?</code> | `()` | Client authentication configuration (Basic Auth, Bearer Token, JWT, or OAuth2). |
| `maxInboundMessageSize` | <code>int</code> | `4194304` | The maximum permitted inbound message size in bytes. Default is 4 MB. |

### Initializing the client

```ballerina
import ballerina/grpc;

// In practice, users instantiate the auto-generated typed client (e.g., HelloWorldClient)
// which internally creates a grpc:Client. Direct usage of grpc:Client is shown here
// for reference.

grpc:Client grpcClient = check new ("http://localhost:9090");
```

### Operations

#### Unary RPC

<details>
<summary>executeSimpleRPC</summary>

Executes a unary (simple) gRPC call: sends a single request and receives a single response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `methodID` | <code>string</code> | Yes | The fully qualified remote service method ID (e.g., `"routeguide.RouteGuide/GetFeature"`). |
| `payload` | <code>anydata</code> | Yes | The request message payload. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional metadata headers to send with the request. |

**Returns:** `[anydata, map<string|string[]>]|error`

**Sample code:**

```ballerina
[anydata, map<string|string[]>] [result, responseHeaders] = check grpcClient->executeSimpleRPC(
    "routeguide.RouteGuide/GetFeature",
    {latitude: 406109563, longitude: -742186778}
);
```

**Sample response:**

```ballerina
[{"name": "Berkshire Valley Management Area Trail, Jefferson, NJ, USA", "location": {"latitude": 406109563, "longitude": -742186778}}, {"content-type": "application/grpc"}]
```

</details>

#### Server streaming RPC

<details>
<summary>executeServerStreaming</summary>

Executes a server streaming gRPC call: sends a single request and receives a stream of responses.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `methodID` | <code>string</code> | Yes | The fully qualified remote service method ID. |
| `payload` | <code>anydata</code> | Yes | The request message payload. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional metadata headers to send with the request. |

**Returns:** `[stream<anydata, grpc:Error?>, map<string|string[]>]|grpc:Error`

**Sample code:**

```ballerina
[stream<anydata, grpc:Error?>, map<string|string[]>] [resultStream, responseHeaders] = check grpcClient->executeServerStreaming(
    "routeguide.RouteGuide/ListFeatures",
    {lo: {latitude: 400000000, longitude: -750000000}, hi: {latitude: 420000000, longitude: -730000000}}
);
```

**Sample response:**

```ballerina
[<stream of Feature records>, {"content-type": "application/grpc"}]
```

</details>

#### Client streaming RPC

<details>
<summary>executeClientStreaming</summary>

Initiates a client streaming gRPC call: returns a `StreamingClient` for sending a stream of messages to the server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `methodID` | <code>string</code> | Yes | The fully qualified remote service method ID. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional metadata headers to send with the request. |

**Returns:** `grpc:StreamingClient|grpc:Error`

**Sample code:**

```ballerina
grpc:StreamingClient streamingClient = check grpcClient->executeClientStreaming(
    "routeguide.RouteGuide/RecordRoute"
);
```

</details>

#### Bidirectional streaming RPC

<details>
<summary>executeBidirectionalStreaming</summary>

Initiates a bidirectional streaming gRPC call: returns a `StreamingClient` for sending and receiving concurrent streams of messages.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `methodID` | <code>string</code> | Yes | The fully qualified remote service method ID. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional metadata headers to send with the request. |

**Returns:** `grpc:StreamingClient|grpc:Error`

**Sample code:**

```ballerina
grpc:StreamingClient streamingClient = check grpcClient->executeBidirectionalStreaming(
    "routeguide.RouteGuide/RouteChat"
);
```

</details>

#### Stub initialization

<details>
<summary>initStub</summary>

Initializes the client stub with proto descriptor data. Called internally by auto-generated client code to bind the typed client to its proto service definition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `clientEndpoint` | <code>AbstractClientEndpoint</code> | Yes | The auto-generated client endpoint instance. |
| `descriptorKey` | <code>string</code> | Yes | Key of the proto descriptor. |
| `descriptorMap` | <code>map&lt;any&gt;</code> | No | Proto descriptor map with all dependent descriptors. |

**Returns:** `grpc:Error?`

**Sample code:**

```ballerina
// Typically called inside auto-generated client init:
check self.grpcClient.initStub(self, ROOT_DESCRIPTOR, getDescriptorMap());
```

</details>

---

## Streaming client

Used in client streaming and bidirectional streaming RPCs to send messages, receive responses, and manage stream lifecycle.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|

### Initializing the client

```ballerina
import ballerina/grpc;

// StreamingClient is obtained from executeClientStreaming or executeBidirectionalStreaming.
// It is not instantiated directly by the user.

grpc:StreamingClient streamingClient = check grpcClient->executeClientStreaming(
    "routeguide.RouteGuide/RecordRoute"
);
```

### Operations

#### Message operations

<details>
<summary>send</summary>

Sends a request message to the server through the streaming connection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `res` | <code>anydata</code> | Yes | The message payload to send. |

**Returns:** `grpc:Error?`

**Sample code:**

```ballerina
check streamingClient->send({latitude: 406109563, longitude: -742186778});
```

</details>

<details>
<summary>receive</summary>

Receives a response message from the server. In client streaming, this returns the final response after `complete()`. In bidirectional streaming, this returns each streamed message.

**Returns:** `[anydata, map<string|string[]>]|grpc:Error?`

**Sample code:**

```ballerina
[anydata, map<string|string[]>]? response = check streamingClient->receive();
```

**Sample response:**

```ballerina
[{"point_count": 3, "feature_count": 2, "distance": 48730, "elapsed_time": 1}, {"content-type": "application/grpc"}]
```

</details>

#### Stream lifecycle

<details>
<summary>complete</summary>

Informs the server that the client has finished sending all messages. Must be called to close the client-side stream.

**Returns:** `grpc:Error?`

**Sample code:**

```ballerina
check streamingClient->complete();
```

</details>

<details>
<summary>sendError</summary>

Sends an error message to the server, signaling an abnormal termination of the stream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `err` | <code>grpc:Error</code> | Yes | The error instance to send. |

**Returns:** `grpc:Error?`

**Sample code:**

```ballerina
check streamingClient->sendError(error grpc:AbortedError("Operation aborted"));
```

</details>
