# Triggers

The `ballerina/tcp` connector supports event-driven TCP server functionality through a `tcp:Listener` that accepts inbound connections and dispatches events to your service callbacks. The two-tier service model separates connection-level events (`onConnect`) from data-level events (`onBytes`, `onError`, `onClose`).

Three components work together:

| Component | Role |
|-----------|------|
| `tcp:Listener` | Listens on a local port and accepts inbound TCP connections. |
| `tcp:Service` | Handles the `onConnect` callback when a new client connects, returning a `ConnectionService`. |
| `tcp:ConnectionService` | Handles per-connection callbacks: `onBytes`, `onError`, and `onClose`. |
| `tcp:Caller` | Represents the connected client within callbacks, providing metadata and the ability to write bytes or close the connection. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `tcp:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the TCP listener, including the local host binding and optional SSL/TLS settings. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `localHost` | <code>string</code> | `()` | The hostname or IP address to bind the listener to. |
| `secureSocket` | <code>ListenerSecureSocket</code> | `()` | SSL/TLS configuration for secure inbound connections. |

### Initializing the listener

**Basic TCP listener:**

```ballerina
import ballerina/tcp;

listener tcp:Listener tcpListener = new (3000);
```

**TCP listener with SSL/TLS:**

```ballerina
import ballerina/tcp;

listener tcp:Listener tcpListener = new (3000, secureSocket = {
    key: {
        certFile: "/path/to/server.crt",
        keyFile: "/path/to/server.key"
    }
});
```

:::tip Generating certificates
For instructions on generating certificates using `keytool`, see [Keystores and Truststores](../../../../deploy-operate/secure/keystore-truststore.md).

---

## Service

A `tcp:Service` is attached to a `tcp:Listener` and handles the initial `onConnect` event. It returns a `tcp:ConnectionService` that handles the per-connection lifecycle: receiving bytes, handling errors, and reacting to connection closure.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onConnect` | <code>remote function onConnect(tcp:Caller caller) returns tcp:ConnectionService&#124;tcp:Error?</code> | Invoked when a new TCP client connects. Returns a `ConnectionService` to handle the connection lifecycle. |
| `onBytes` | <code>remote function onBytes(readonly &amp; byte[] data) returns byte[]&#124;tcp:Error?</code> | Invoked when data is received from the client. Optionally accepts a `tcp:Caller` as the first parameter. Return bytes to echo data back. |
| `onError` | <code>remote function onError(tcp:Error err) returns tcp:Error?</code> | Invoked when an error occurs on the connection. |
| `onClose` | <code>remote function onClose() returns tcp:Error?</code> | Invoked when the client closes the connection. |

The `onBytes` callback is required on every `ConnectionService`. The `onError` and `onClose` callbacks are optional: implement only the events you need.

### Full usage example

```ballerina
import ballerina/io;
import ballerina/tcp;

listener tcp:Listener tcpListener = new (3000);

service on tcpListener {
    remote function onConnect(tcp:Caller caller) returns tcp:ConnectionService {
        io:println("Client connected: ", caller.remoteHost, ":", caller.remotePort);
        return new ChatConnectionService();
    }
}

service class ChatConnectionService {
    *tcp:ConnectionService;

    remote function onBytes(tcp:Caller caller, readonly & byte[] data) returns byte[]|tcp:Error? {
        string message = check string:fromBytes(data);
        io:println("Received: ", message);
        // Echo the message back to the client
        return data;
    }

    remote function onError(tcp:Error err) returns tcp:Error? {
        io:println("Error: ", err.message());
    }

    remote function onClose() returns tcp:Error? {
        io:println("Client disconnected");
    }
}
```

Returning a `byte[]` from `onBytes` automatically sends those bytes back to the client. This is convenient for echo-style servers. For more control, accept a `tcp:Caller` as the first parameter and use `caller->writeBytes()` to send responses explicitly.

---

## Supporting types

### `Caller`

| Field | Type | Description |
|-------|------|-------------|
| `remoteHost` | <code>string</code> | The hostname or IP address of the connected remote client. |
| `remotePort` | <code>int</code> | The port number of the connected remote client. |
| `localHost` | <code>string</code> | The local hostname the listener is bound to. |
| `localPort` | <code>int</code> | The local port the listener is bound to. |
| `id` | <code>string</code> | A unique identifier for the connection. |

### `ClientSecureSocket`

| Field | Type | Description |
|-------|------|-------------|
| `enable` | <code>boolean</code> | Enable or disable SSL. Defaults to `true`. |
| `cert` | <code>crypto:TrustStore&#124;string</code> | Trust store configuration or path to the certificate file. |
| `protocol` | <code>record &#123;&#124;Protocol name; string[] versions;&#124;&#125;</code> | SSL/TLS protocol configuration. |
| `ciphers` | <code>string[]</code> | List of cipher suites to use. |
| `handshakeTimeout` | <code>decimal</code> | SSL handshake timeout in seconds. |
| `sessionTimeout` | <code>decimal</code> | SSL session timeout in seconds. |

### `ListenerSecureSocket`

| Field | Type | Description |
|-------|------|-------------|
| `key` | <code>crypto:KeyStore&#124;CertKey</code> | Server key store or certificate and key file paths. Required for SSL/TLS. |
| `protocol` | <code>record &#123;&#124;Protocol name; string[] versions;&#124;&#125;</code> | SSL/TLS protocol configuration. |
| `ciphers` | <code>string[]</code> | List of cipher suites to use. Defaults to `[]`. |
| `handshakeTimeout` | <code>decimal</code> | SSL handshake timeout in seconds. |
| `sessionTimeout` | <code>decimal</code> | SSL session timeout in seconds. |

### `CertKey`

| Field | Type | Description |
|-------|------|-------------|
| `certFile` | <code>string</code> | Path to the certificate file. |
| `keyFile` | <code>string</code> | Path to the private key file in PKCS8 format. |
| `keyPassword` | <code>string</code> | Password for the encrypted private key, if applicable. |
