# Triggers

The `ballerina/grpc` connector enables you to expose Ballerina services as gRPC servers. A `grpc:Listener` listens on a TCP port for incoming gRPC requests, and a `grpc:Service` defines the remote functions that implement the RPC methods declared in your `.proto` file. The auto-generated stub code from `bal grpc` creates typed Caller objects used within service callbacks to send responses back to clients.

Three components work together:

| Component | Role |
|-----------|------|
| `grpc:Listener` | Listens on a specified port for incoming gRPC requests over HTTP/2 and dispatches them to attached services. |
| `grpc:Service` | Defines remote functions that implement the RPC methods. Attached to a `grpc:Listener` to handle incoming calls. |
| `grpc:Caller` | Provided inside service callbacks for streaming and bidirectional RPCs to send responses, errors, and complete the stream back to the client. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `grpc:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration record for the gRPC server listener. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"0.0.0.0"` | The hostname the server binds to. |
| `secureSocket` | <code>ListenerSecureSocket?</code> | `()` | SSL/TLS configuration for the server endpoint. Set this to enable TLS or mutual TLS. |
| `timeout` | <code>decimal</code> | `120` | Period of time in seconds that a connection waits for a read/write operation. Use 0 to disable. |
| `maxInboundMessageSize` | <code>int</code> | `4194304` | The maximum permitted inbound message size in bytes. Default is 4 MB. |
| `maxHeaderSize` | <code>int</code> | `8192` | The maximum permitted header size in bytes. Default is 8 KB. |
| `reflectionEnabled` | <code>boolean</code> | `false` | Enable gRPC server reflection support. |

### Initializing the listener

**Basic listener on a port:**

```ballerina
import ballerina/grpc;

listener grpc:Listener grpcListener = new (9090);
```

**Listener with TLS:**

```ballerina
import ballerina/grpc;

listener grpc:Listener grpcListener = new (9090,
    secureSocket = {
        key: {
            certFile: "/path/to/server.crt",
            keyFile: "/path/to/server.key"
        }
    }
);
```

:::tip Generating certificates
For instructions on generating certificates using `keytool`, see [Keystores and Truststores](../../../../deploy-operate/secure/keystore-truststore.md).

**Listener with mutual TLS:**

```ballerina
import ballerina/grpc;

listener grpc:Listener grpcListener = new (9090,
    secureSocket = {
        key: {
            certFile: "/path/to/server.crt",
            keyFile: "/path/to/server.key"
        },
        mutualSsl: {
            verifyClient: grpc:REQUIRE,
            cert: "/path/to/ca.crt"
        }
    }
);
```

---

## Service

A `grpc:Service` is a Ballerina service attached to a `grpc:Listener`. Each remote function in the service corresponds to an RPC method defined in the `.proto` file. The function signature varies by communication pattern: unary methods accept and return messages directly, server streaming methods return a stream, client streaming methods accept a stream, and bidirectional streaming methods accept both a Caller and a stream.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `Unary RPC` | <code>remote function &lt;MethodName&gt;(MessageType request) returns ResponseType&#124;error</code> | Handles a simple request-response RPC. Accepts a single message and returns a single response. |
| `Server Streaming RPC` | <code>remote function &lt;MethodName&gt;(MessageType request) returns stream&lt;ResponseType, grpc:Error?&gt;&#124;error</code> | Handles a server streaming RPC. Accepts a single request and returns a stream of responses. |
| `Client Streaming RPC` | <code>remote function &lt;MethodName&gt;(stream&lt;MessageType, grpc:Error?&gt; clientStream) returns ResponseType&#124;error</code> | Handles a client streaming RPC. Accepts a stream of client messages and returns a single response. |
| `Bidirectional Streaming RPC` | <code>remote function &lt;MethodName&gt;(TypedCaller caller, stream&lt;MessageType, grpc:Error?&gt; clientStream) returns error?</code> | Handles a bidirectional streaming RPC. Receives a typed Caller for sending responses and a stream of client messages. |

The service name (e.g., `"RouteGuide"`) and remote function names (e.g., `GetFeature`) must match the service and RPC method names in your `.proto` file. The `@grpc:ServiceDescriptor` annotation binds the service to the auto-generated proto descriptor.

### Full usage example

```ballerina
import ballerina/grpc;
import ballerina/io;
import ballerina/time;

listener grpc:Listener ep = new (9090);

@grpc:ServiceDescriptor {descriptor: ROOT_DESCRIPTOR, descMap: getDescriptorMap()}
service "RouteGuide" on ep {

    // Unary RPC: returns a single Feature for a given Point
    isolated remote function GetFeature(Point point) returns Feature|error {
        foreach Feature feature in FEATURES {
            if feature.location == point {
                return feature;
            }
        }
        return {location: point, name: ""};
    }

    // Server streaming RPC: returns a stream of Features within a Rectangle
    remote function ListFeatures(Rectangle rectangle) returns stream<Feature, grpc:Error?>|error {
        int left = int:min(rectangle.lo.longitude, rectangle.hi.longitude);
        int right = int:max(rectangle.lo.longitude, rectangle.hi.longitude);
        int top = int:max(rectangle.lo.latitude, rectangle.hi.latitude);
        int bottom = int:min(rectangle.lo.latitude, rectangle.hi.latitude);

        Feature[] selectedFeatures = from var feature in FEATURES
            where feature.name != ""
            where feature.location.longitude >= left
            where feature.location.longitude <= right
            where feature.location.latitude >= bottom
            where feature.location.latitude <= top
            select feature;

        return selectedFeatures.toStream();
    }

    // Client streaming RPC: receives a stream of Points, returns a RouteSummary
    remote function RecordRoute(stream<Point, grpc:Error?> clientStream) returns RouteSummary|error {
        Point? lastPoint = ();
        int pointCount = 0;
        int featureCount = 0;
        int distance = 0;

        decimal startTime = time:monotonicNow();
        check clientStream.forEach(function(Point p) {
            pointCount += 1;
            if lastPoint is Point {
                distance += calculateDistance(lastPoint, p);
            }
            lastPoint = p;
        });
        decimal endTime = time:monotonicNow();
        int elapsedTime = <int>(endTime - startTime);
        return {point_count: pointCount, feature_count: featureCount, distance: distance, elapsed_time: elapsedTime};
    }

    // Bidirectional streaming RPC: receives and sends RouteNote streams
    remote function RouteChat(RouteGuideRouteNoteCaller caller, stream<RouteNote, grpc:Error?> clientStream) returns error? {
        check clientStream.forEach(function(RouteNote note) {
            grpc:Error? err = caller->sendRouteNote(note);
        });
    }
}
```

For bidirectional and client streaming RPCs, the typed Caller (e.g., `RouteGuideRouteNoteCaller`) is auto-generated from the `.proto` file. It wraps the base `grpc:Caller` and provides typed `send` methods for the specific response message type.

---

## Supporting types

### `ListenerSecureSocket`

| Field | Type | Description |
|-------|------|-------------|
| `key` | <code>crypto:KeyStore&#124;CertKey</code> | The server's certificate and private key configuration. |
| `mutualSsl` | `MutualSslConfig?` | Mutual SSL configuration. Set `verifyClient` to `REQUIRE` or `OPTIONAL`. |
| `protocol` | `ProtocolConfig?` | SSL/TLS protocol version configuration. |
| `ciphers` | <code>string[]</code> | List of cipher suites to use for TLS. |
| `handshakeTimeout` | <code>decimal?</code> | SSL handshake timeout in seconds. |
| `sessionTimeout` | <code>decimal?</code> | SSL session timeout in seconds. |

### `CertKey`

| Field | Type | Description |
|-------|------|-------------|
| `certFile` | <code>string</code> | Path to the certificate file. |
| `keyFile` | <code>string</code> | Path to the private key file. |
| `keyPassword` | <code>string?</code> | Password for the private key if it is encrypted. |

### `RetryConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `retryCount` | <code>int</code> | Maximum number of retry attempts in a failure scenario. |
| `interval` | <code>decimal</code> | Initial interval (in seconds) between retry attempts. |
| `maxInterval` | <code>decimal</code> | Maximum interval (in seconds) between two retry attempts. |
| `backoffFactor` | <code>decimal</code> | Multiplier applied to the retry interval between attempts. |
| `errorTypes` | <code>ErrorType[]</code> | Error types that trigger a retry. Defaults to `[InternalError]`. |

### `PoolConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `maxActiveConnections` | <code>int</code> | Max active connections per route (host:port). Default is `-1` (unlimited). |
| `maxIdleConnections` | <code>int</code> | Maximum number of idle connections allowed per pool. Default is `1000`. |
| `waitTime` | <code>decimal</code> | Maximum time (in seconds) to wait for an idle connection. Default is `60`. |
| `maxActiveStreamsPerConnection` | <code>int</code> | Maximum active HTTP/2 streams per connection. Default is `50`. |
