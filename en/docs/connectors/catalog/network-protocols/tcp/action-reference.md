---
connector: true
connector_name: "tcp"
toc_max_heading_level: 4
---

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
| `secureSocket` | <code>ClientSecureSocket</code> | Optional | SSL/TLS configuration for secure connections. |

### Initializing the client

```ballerina
import ballerina/tcp;

tcp:Client tcpClient = check new ("localhost", 3000);
```

### Operations

#### Data transfer

<details>
<summary>writeBytes</summary>

<div>

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

</div>

</details>

<details>
<summary>readBytes</summary>

<div>

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

</div>

</details>

#### Connection management

<details>
<summary>close</summary>

<div>

Closes the TCP connection to the remote host.


**Returns:** `error?`

**Sample code:**

```ballerina
check tcpClient->close();
```

</div>

</details>
