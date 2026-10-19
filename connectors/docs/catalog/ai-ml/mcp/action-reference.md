# Actions

The `ballerina/mcp` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Streamable Http Client`](#streamable-http-client) | Connects to an MCP server over Streamable HTTP transport to discover and invoke tools. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Streamable HTTP client

Connects to an MCP server over Streamable HTTP transport to discover and invoke tools.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serverUrl` | <code>string</code> | Required | The URL of the MCP server endpoint (e.g., `http://localhost:9090/mcp`). |
| `sessionId` | <code>string</code> | `()` | Optional session ID for resuming a previous session. |
| `timeout` | <code>decimal</code> | `60` | HTTP request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed HTTP requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerina/mcp;

configurable string serverUrl = ?;

mcp:StreamableHttpClient mcpClient = check new (serverUrl);
```

### Operations

#### Connection management

<details>
<summary>initialize</summary>

Initializes the MCP connection by performing the protocol handshake and capability exchange with the server.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `clientInfo` | <code>Implementation</code> | No | Client name and version information. Defaults to `{name: "MCP Client", version: "1.0.0"}`. |
| `capabilities` | <code>ClientCapabilities</code> | No | Client capabilities to advertise to the server. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers for the initialization request. |

**Returns:** `ClientError?`

**Sample code:**

```ballerina
check mcpClient->initialize(
    {name: "Weather Client", version: "1.0.0"}
);
```

</details>

<details>
<summary>close</summary>

Closes the MCP session and disconnects from the server.

**Returns:** `ClientError?`

**Sample code:**

```ballerina
check mcpClient->close();
```

</details>

#### Tool discovery

<details>
<summary>listTools</summary>

Retrieves the list of available tools from the MCP server, including their names, descriptions, and input schemas.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers for the request. |

**Returns:** `ListToolsResult|ClientError`

**Sample code:**

```ballerina
mcp:ListToolsResult toolsResult = check mcpClient->listTools();
```

**Sample response:**

```ballerina
{
  "tools": [
    {
      "name": "getCurrentWeather",
      "description": "Get the current weather for a given city",
      "inputSchema": {
        "type": "object",
        "properties": {
          "city": {
            "type": "string",
            "description": "The city name"
          }
        },
        "required": ["city"]
      }
    },
    {
      "name": "getWeatherForecast",
      "description": "Get weather forecast for a location",
      "inputSchema": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The location name"
          },
          "days": {
            "type": "integer",
            "description": "Number of forecast days"
          }
        },
        "required": ["location", "days"]
      }
    }
  ]
}
```

</details>

#### Tool invocation

<details>
<summary>callTool</summary>

Executes a specific tool on the MCP server with the given parameters and returns the result.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `params` | <code>CallToolParams</code> | Yes | The tool call parameters including the tool `name` and `arguments` map. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers for the request. |

**Returns:** `CallToolResult|ClientError`

**Sample code:**

```ballerina
mcp:CallToolResult result = check mcpClient->callTool({
    name: "getCurrentWeather",
    arguments: {"city": "London"}
});
```

**Sample response:**

```ballerina
{
  "content": [
    {
      "type": "text",
      "text": "Current weather in London: 15°C, Partly Cloudy, Humidity: 72%, Wind: 12 km/h SW"
    }
  ],
  "isError": false
}
```

</details>

#### Streaming

<details>
<summary>subscribeToServerMessages</summary>

Opens a Server-Sent Events (SSE) stream for receiving asynchronous server-to-client messages such as notifications and progress updates.

**Returns:** `stream<JsonRpcMessage, StreamError?>|ClientError`

**Sample code:**

```ballerina
stream<mcp:JsonRpcMessage, mcp:StreamError?> messageStream =
    check mcpClient->subscribeToServerMessages();

check from mcp:JsonRpcMessage message in messageStream
    do {
        // Process each server message
    };
```

**Sample response:**

```ballerina
{"jsonrpc": "2.0", "method": "notifications/tools/list_changed"}
```

</details>
