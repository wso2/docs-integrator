# Triggers

The `ballerina/websocket` connector supports building WebSocket servers using a `websocket:Listener` and `websocket:Service` combination. The listener accepts incoming WebSocket connections via an HTTP upgrade handshake, and the service defines callbacks for handling messages, connection lifecycle events, and control frames.

Three components work together:

| Component | Role |
|-----------|------|
| `websocket:Listener` | Listens on a port for incoming HTTP upgrade requests and establishes WebSocket connections. |
| `websocket:UpgradeService` | Handles the initial HTTP upgrade request and returns a `websocket:Service` to handle the WebSocket connection. |
| `websocket:Service` | Defines callbacks (`onOpen`, `onMessage`, `onClose`, etc.) invoked for each WebSocket connection event. |
| `websocket:Caller` | Represents the remote WebSocket client within service callbacks, used to send messages back and manage the connection. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `websocket:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the WebSocket listener endpoint. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"0.0.0.0"` | The host name or IP address of the listener endpoint. |
| `secureSocket` | <code>ListenerSecureSocket</code> | `()` | SSL/TLS configuration for secure WebSocket (WSS) server. |
| `timeout` | <code>decimal</code> | `120` | Period of time in seconds that a connection waits for a read/write operation during the initial upgrade request. Use `0` to disable. |
| `server` | <code>string?</code> | `()` | The server name to appear in the response header. |
| `webSocketCompressionEnabled` | <code>boolean</code> | `true` | Enable support for compression in WebSocket. |
| `http1Settings` | <code>ListenerHttp1Settings</code> | `{}` | Configurations related to HTTP/1.x protocol. |
| `requestLimits` | <code>RequestLimitConfigs</code> | `{}` | Configurations for inbound request size limits. |

### Initializing the listener

**Using a port number:**

```ballerina
import ballerina/websocket;

listener websocket:Listener wsListener = new (9090);
```

**Using a port number with configuration:**

```ballerina
import ballerina/websocket;

listener websocket:Listener wsListener = new (9090, {
    secureSocket: {
        key: {
            certFile: "/path/to/cert.pem",
            keyFile: "/path/to/key.pem"
        }
    }
});
```

**Using an existing HTTP listener:**

```ballerina
import ballerina/http;
import ballerina/websocket;

listener http:Listener httpListener = new (9090);
listener websocket:Listener wsListener = new (httpListener);
```

---

## Service

A `websocket:Service` is a Ballerina service class that implements callbacks for WebSocket connection events. It is returned by the `websocket:UpgradeService` resource function during the HTTP-to-WebSocket upgrade handshake. Each client connection gets its own service instance.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onOpen` | <code>remote function onOpen(websocket:Caller caller) returns error?</code> | Invoked when a new WebSocket connection is established. |
| `onTextMessage` | <code>remote function onTextMessage(websocket:Caller caller, string text) returns error?</code> | Invoked when a text message is received from the client. |
| `onBinaryMessage` | <code>remote function onBinaryMessage(websocket:Caller caller, byte[] data) returns error?</code> | Invoked when a binary message is received from the client. |
| `onMessage` | <code>remote function onMessage(websocket:Caller caller, anydata data) returns error?</code> | Invoked when any message is received. Use this instead of `onTextMessage`/`onBinaryMessage` for generic or typed message handling. |
| `onPing` | <code>remote function onPing(websocket:Caller caller, byte[] data) returns error?</code> | Invoked when a ping frame is received from the client. |
| `onPong` | <code>remote function onPong(websocket:Caller caller, byte[] data) returns error?</code> | Invoked when a pong frame is received from the client. |
| `onIdleTimeout` | <code>remote function onIdleTimeout(websocket:Caller caller) returns error?</code> | Invoked when the connection remains idle beyond the configured `idleTimeout`. |
| `onClose` | <code>remote function onClose(websocket:Caller caller, int statusCode, string reason) returns error?</code> | Invoked when the client closes the connection. |
| `onError` | <code>remote function onError(websocket:Caller caller, error err) returns error?</code> | Invoked when an error occurs during the connection. |

You do not need to implement all callbacks. Only implement the event types relevant to your use case. For example, a simple chat server may only need `onOpen`, `onMessage`, and `onClose`.

### Full usage example

```ballerina
import ballerina/io;
import ballerina/websocket;

map<websocket:Caller> connectionsMap = {};

service /chat on new websocket:Listener(9090) {
    resource function get [string username]() returns websocket:Service|websocket:UpgradeError {
        return new ChatServer(username);
    }
}

service class ChatServer {
    *websocket:Service;

    string username;

    public function init(string username) {
        self.username = username;
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        string welcomeMsg = "Hi " + self.username + "! You have successfully connected to the chat";
        check caller->writeMessage(welcomeMsg);
        string msg = self.username + " connected to chat";
        check broadcast(msg);
        lock {
            connectionsMap[caller.getConnectionId()] = caller;
        }
    }

    remote function onMessage(websocket:Caller caller, string text) returns error? {
        string msg = self.username + ": " + text;
        io:println(msg);
        check broadcast(msg);
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) returns error? {
        lock {
            _ = connectionsMap.remove(caller.getConnectionId());
        }
        string msg = self.username + " left the chat";
        check broadcast(msg);
    }
}

function broadcast(string text) returns error? {
    foreach websocket:Caller con in connectionsMap {
        check con->writeMessage(text);
    }
}
```

The `websocket:UpgradeService` resource function `get` handles the HTTP-to-WebSocket upgrade. The resource path segments become part of the URL pattern (e.g., `service /chat on wsListener` listens at `/chat`). Path parameters in the resource function (e.g., `get [string username]()`) allow extracting values from the URL.

---

## Supporting types

### `WSServiceConfig`

| Field | Type | Description |
|-------|------|-------------|
| `subProtocols` | <code>string[]</code> | Negotiable sub-protocols for the service. |
| `idleTimeout` | <code>decimal</code> | Idle timeout in seconds for client connections. Triggers `onIdleTimeout` callback on expiry. Default is `0` (disabled). |
| `maxFrameSize` | <code>int</code> | Maximum payload size of a WebSocket frame in bytes. Default is `65536`. |
| `auth` | <code>ListenerAuthConfig[]</code> | Listener authentication configurations (Basic Auth, JWT, OAuth2 introspection). |
| `validation` | <code>boolean</code> | Enable or disable constraint validation. Default is `true`. |
| `dispatcherKey` | <code>string</code> | The JSON key used for dispatching messages to custom remote functions. |
| `dispatcherStreamId` | <code>string</code> | Identifier used to distinguish between requests and responses in multiplexing scenarios. |
| `connectionClosureTimeout` | <code>decimal</code> | Time in seconds to wait for the close frame from the remote endpoint. Default is `60`. |

### `WebSocketRetryConfig`

| Field | Type | Description |
|-------|------|-------------|
| `maxCount` | <code>int</code> | Maximum number of retry attempts. `0` means retry indefinitely. |
| `interval` | <code>decimal</code> | Delay in seconds before attempting to reconnect. Default is `1`. |
| `backOffFactor` | <code>float</code> | Rate of increase of the reconnect delay. Default is `1.0`. |
| `maxWaitInterval` | <code>decimal</code> | Maximum retry interval in seconds. Default is `30`. |

### `CloseFrame`

| Field | Type | Description |
|-------|------|-------------|
| `status` | <code>int</code> | The WebSocket close status code (e.g., `1000` for normal closure, `1001` for going away). |
| `reason` | <code>string?</code> | Optional reason string for the closure. |
