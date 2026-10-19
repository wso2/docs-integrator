# Actions

The `ballerina/websocket` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Synchronous WebSocket client for connecting to WebSocket servers and exchanging messages. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Synchronous WebSocket client for connecting to WebSocket servers and exchanging messages.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subProtocols` | <code>string[]</code> | `[]` | Negotiable sub-protocols of the client. |
| `customHeaders` | <code>map&lt;string&gt;</code> | `{}` | Custom headers to send during the WebSocket handshake. |
| `readTimeout` | <code>decimal</code> | `-1` | Read timeout in seconds. `-1` means no timeout. |
| `writeTimeout` | <code>decimal</code> | `-1` | Write timeout in seconds. `-1` means no timeout. |
| `secureSocket` | <code>ClientSecureSocket</code> | `()` | SSL/TLS configuration for secure WebSocket (WSS) connections. |
| `maxFrameSize` | <code>int</code> | `65536` | Maximum payload size of a WebSocket frame in bytes. |
| `webSocketCompressionEnabled` | <code>boolean</code> | `true` | Enable support for compression in the WebSocket connection. |
| `handShakeTimeout` | <code>decimal</code> | `300` | Time in seconds to wait for the WebSocket handshake response. |
| `auth` | <code>CredentialsConfig&#124;BearerTokenConfig&#124;JwtIssuerConfig&#124;OAuth2GrantConfig</code> | `()` | Authentication configuration for the client handshake. |
| `retryConfig` | <code>WebSocketRetryConfig</code> | `()` | Retry configuration for automatic reconnection on connection failure. |
| `validation` | <code>boolean</code> | `true` | Enable or disable constraint validation. |

### Initializing the client

```ballerina
import ballerina/websocket;

websocket:Client wsClient = check new ("ws://localhost:9090/ws");
```

### Operations

#### Send messages

<details>
<summary>writeTextMessage</summary>

Writes a text message to the WebSocket connection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>string</code> | Yes | Text data to be sent. |

**Returns:** `error?`

**Sample code:**

```ballerina
check wsClient->writeTextMessage("Hello, WebSocket!");
```

</details>

<details>
<summary>writeBinaryMessage</summary>

Writes binary data to the WebSocket connection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>byte[]</code> | Yes | Binary data to be sent. |

**Returns:** `error?`

**Sample code:**

```ballerina
byte[] binaryData = "Binary message".toBytes();
check wsClient->writeBinaryMessage(binaryData);
```

</details>

<details>
<summary>writeMessage</summary>

Writes any data to the WebSocket connection. Strings and byte arrays are sent as-is; other types are serialized to JSON.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>anydata</code> | Yes | Data to be sent. Strings are sent as text frames, byte arrays as binary frames, and other types are JSON-serialized. |

**Returns:** `error?`

**Sample code:**

```ballerina
json payload = {event: "greeting", message: "Hello!"};
check wsClient->writeMessage(payload);
```

</details>

#### Read messages

<details>
<summary>readTextMessage</summary>

Reads a text message from the WebSocket connection in a synchronous (blocking) manner.

**Returns:** `string|error`

**Sample code:**

```ballerina
string textResp = check wsClient->readTextMessage();
```

**Sample response:**

```ballerina
"Hello from server!"
```

</details>

<details>
<summary>readBinaryMessage</summary>

Reads binary data from the WebSocket connection in a synchronous (blocking) manner.

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] binaryResp = check wsClient->readBinaryMessage();
```

**Sample response:**

```ballerina
[72, 101, 108, 108, 111]
```

</details>

<details>
<summary>readMessage</summary>

Reads data from the WebSocket connection with automatic data binding to the specified target type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetType` | <code>typedesc&lt;anydata&gt;</code> | No | The expected payload type for data binding. |

**Returns:** `targetType|error`

**Sample code:**

```ballerina
json response = check wsClient->readMessage();
```

**Sample response:**

```ballerina
{"event": "reply", "message": "Message received"}
```

</details>

#### Control frames

<details>
<summary>ping</summary>

Sends a ping frame to the WebSocket server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>byte[]</code> | Yes | Binary data to include in the ping frame. |

**Returns:** `error?`

**Sample code:**

```ballerina
check wsClient->ping("ping".toBytes());
```

</details>

<details>
<summary>pong</summary>

Sends a pong frame to the WebSocket server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>byte[]</code> | Yes | Binary data to include in the pong frame. |

**Returns:** `error?`

**Sample code:**

```ballerina
check wsClient->pong("pong".toBytes());
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the WebSocket connection with an optional status code and reason.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusCode` | <code>int?</code> | No | Status code for closing the connection (default `1000` for normal closure). |
| `reason` | <code>string?</code> | No | Reason string for the closure. |
| `timeout` | <code>decimal</code> | No | Time in seconds to wait for the close frame from the remote endpoint. Default is `60`. Use `-1` to wait indefinitely. |

**Returns:** `error?`

**Sample code:**

```ballerina
check wsClient->close();
```

</details>
