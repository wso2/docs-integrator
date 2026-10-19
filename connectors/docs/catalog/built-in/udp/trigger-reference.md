# Triggers

The `ballerina/udp` connector supports event-driven UDP communication through a `udp:Listener`. When datagrams arrive on the bound port, the listener invokes your service callbacks automatically, enabling real-time data processing without polling.

Three components work together:

| Component | Role |
|-----------|------|
| `udp:Listener` | Binds to a local UDP port and dispatches incoming data to the attached service. |
| `udp:Service` | Defines the `onBytes`, `onDatagram`, and `onError` callbacks invoked when data arrives or errors occur. |
| `udp:Caller` | Passed to callbacks to allow sending responses back to the remote sender. |
| `udp:Datagram` | The datagram payload containing remote host info and data, passed to the `onDatagram` callback. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `udp:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the UDP listener, including optional remote host filtering and local interface binding. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `localPort` | <code>int</code> | Required | The local port number to bind the listener to (passed as a constructor argument). |
| `remoteHost` | <code>string</code> | `()` | If set, the listener only accepts datagrams from this remote host. |
| `remotePort` | <code>int</code> | `()` | If set, the listener only accepts datagrams from this remote port. |
| `localHost` | <code>string</code> | `()` | The local network interface to bind the listener to. |

### Initializing the listener

**Basic listener on a local port:**

```ballerina
import ballerina/udp;

listener udp:Listener udpListener = new (8080);
```

**Listener with remote host filtering:**

```ballerina
import ballerina/udp;

listener udp:Listener udpListener = new (8080, remoteHost = "192.168.1.10", remotePort = 9090);
```

---

## Service

A `udp:Service` is a Ballerina service attached to a `udp:Listener`. It implements callbacks that are invoked when UDP data arrives on the listener port. You can implement either `onBytes` for raw byte handling or `onDatagram` for datagram-level handling with sender metadata.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onBytes` | <code>remote function onBytes(readonly &amp; byte[] data, udp:Caller caller) returns byte[]&#124;udp:Datagram&#124;udp:Error?</code> | Invoked when raw bytes are received. Use this when you only need the payload data. |
| `onDatagram` | <code>remote function onDatagram(readonly &amp; udp:Datagram datagram, udp:Caller caller) returns byte[]&#124;udp:Datagram&#124;udp:Error?</code> | Invoked when a datagram is received. Use this when you need the sender's host and port information along with the data. |
| `onError` | <code>remote function onError(udp:Error err) returns udp:Error?</code> | Invoked when an error occurs during data reception. |

You do not need to implement all three callbacks. Only implement the event types relevant to your use case. Typically you choose either `onBytes` or `onDatagram`, not both.

### Full usage example

```ballerina
import ballerina/io;
import ballerina/udp;

listener udp:Listener udpListener = new (8080);

service on udpListener {
    remote function onDatagram(readonly & udp:Datagram datagram, udp:Caller caller) returns udp:Datagram|udp:Error? {
        io:println("Received from ", datagram.remoteHost, ":", datagram.remotePort);
        io:println("Data: ", string:fromBytes(datagram.data));

        // Echo the data back to the sender
        return {
            remoteHost: datagram.remoteHost,
            remotePort: datagram.remotePort,
            data: "ACK".toBytes()
        };
    }

    remote function onError(udp:Error err) returns udp:Error? {
        io:println("Error: ", err.message());
    }
}
```

Returning a `byte[]` or `Datagram` value from `onBytes` or `onDatagram` automatically sends a response back to the remote sender. Return `()` or `error` if no response is needed.

---

## Supporting types

### `Datagram`

| Field | Type | Description |
|-------|------|-------------|
| `remoteHost` | <code>string</code> | The hostname or IP address of the remote host. |
| `remotePort` | <code>int</code> | The port number of the remote host. |
| `data` | <code>byte[]</code> | The byte content of the datagram. |

### `Caller`

| Field | Type | Description |
|-------|------|-------------|
| `remoteHost` | <code>string?</code> | The hostname or IP address of the remote sender. |
| `remotePort` | <code>int?</code> | The port number of the remote sender. |
