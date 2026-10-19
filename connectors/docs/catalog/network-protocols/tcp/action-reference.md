# Actions

The `ballerina/tcp` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Connects to a remote TCP host to send and receive raw byte data. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Connects to a remote TCP host to send and receive raw byte data.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `localHost` | <code>string</code> | `()` | Local interface address to bind the client socket to. |
| `timeout` | <code>decimal</code> | `300` | Socket read timeout in seconds. |
| `writeTimeout` | <code>decimal</code> | `300` | Socket write timeout in seconds. |
| `secureSocket` | <code>ClientSecureSocket</code> | `()` | SSL/TLS configuration for secure connections. |

### Initializing the client

```ballerina
import ballerina/tcp;

tcp:Client tcpClient = check new ("localhost", 3000);
```

### Operations

#### Data transfer

<details>
<summary>writeBytes</summary>

Sends byte array data to the connected remote host.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>byte[]</code> | Yes | The byte array to send to the remote host. |

**Returns:** `error?`

**Sample code:**

```ballerina
check tcpClient->writeBytes("Hello, server!".toBytes());
```

</details>

<details>
<summary>readBytes</summary>

Reads byte array data received from the remote host.

**Returns:** `readonly & byte[]|error`

**Sample code:**

```ballerina
readonly & byte[] response = check tcpClient->readBytes();
```

**Sample response:**

```ballerina
[72, 101, 108, 108, 111]
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the TCP connection to the remote host.

**Returns:** `error?`

**Sample code:**

```ballerina
check tcpClient->close();
```

</details>
