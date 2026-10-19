# Actions

The `ballerina/udp` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Sends and receives UDP datagrams without a fixed remote host connection. |
| [`Connect Client`](#connect-client) | Sends and receives UDP data to/from a fixed remote host and port. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Sends and receives UDP datagrams without a fixed remote host connection.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `timeout` | <code>decimal</code> | `300` | Socket read timeout in seconds. |
| `localHost` | <code>string</code> | `()` | Local network interface to bind the socket to. |

### Initializing the client

```ballerina
import ballerina/udp;

udp:Client udpClient = check new ();
```

### Operations

#### Datagram operations

<details>
<summary>sendDatagram</summary>

Sends a datagram to a specified remote host and port.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datagram` | <code>Datagram</code> | Yes | The datagram containing `remoteHost`, `remotePort`, and `data` fields. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check udpClient->sendDatagram({
    remoteHost: "localhost",
    remotePort: 8080,
    data: "Hello from UDP client".toBytes()
});
```

</details>

<details>
<summary>receiveDatagram</summary>

Receives a datagram from any remote host. Blocks until data arrives or the timeout is reached.

**Returns:** `readonly & Datagram|Error`

**Sample code:**

```ballerina
udp:Datagram datagram = check udpClient->receiveDatagram();
```

**Sample response:**

```ballerina
{"remoteHost": "localhost", "remotePort": 8080, "data": [72, 101, 108, 108, 111]}
```

</details>

<details>
<summary>close</summary>

Closes the UDP client socket and frees the associated resources.

**Returns:** `Error?`

**Sample code:**

```ballerina
check udpClient->close();
```

</details>

---

## Connect client

Sends and receives UDP data to/from a fixed remote host and port.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `timeout` | <code>decimal</code> | `300` | Socket read timeout in seconds. |
| `localHost` | <code>string</code> | `()` | Local network interface to bind the socket to. |

### Initializing the client

```ballerina
import ballerina/udp;

udp:ConnectClient udpConnectClient = check new ("localhost", 8080);
```

### Operations

#### Byte operations

<details>
<summary>writeBytes</summary>

Sends bytes to the connected remote host. If the data exceeds the maximum datagram size, it is sent across multiple datagrams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>byte[]</code> | Yes | The byte array to send. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check udpConnectClient->writeBytes("Hello from connected client".toBytes());
```

</details>

<details>
<summary>readBytes</summary>

Reads bytes from the connected remote host. Blocks until data arrives or the timeout is reached.

**Returns:** `readonly & byte[]|Error`

**Sample code:**

```ballerina
byte[] received = check udpConnectClient->readBytes();
```

**Sample response:**

```ballerina
[72, 101, 108, 108, 111]
```

</details>

<details>
<summary>close</summary>

Closes the connected UDP client socket and frees the associated resources.

**Returns:** `Error?`

**Sample code:**

```ballerina
check udpConnectClient->close();
```

</details>
