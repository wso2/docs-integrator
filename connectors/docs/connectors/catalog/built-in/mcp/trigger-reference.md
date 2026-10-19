# Triggers

The `ballerina/mcp` connector supports building MCP servers that expose tools to AI agents and LLM applications. When a client sends a request to discover or invoke tools, the listener routes the JSON-RPC message to your service callbacks automatically. Two service patterns are supported: a basic pattern with automatic tool discovery and an advanced pattern with manual control.

Three components work together:

| Component | Role |
|-----------|------|
| `mcp:Listener` | Accepts HTTP connections and handles JSON-RPC 2.0 message routing for MCP protocol communication. |
| `mcp:Service` | Basic service type: remote functions annotated with `@mcp:Tool` are automatically discovered and exposed as MCP tools. |
| `mcp:AdvancedService` | Advanced service type: implements `onListTools` and `onCallTool` callbacks for manual control over tool listing and invocation. |
| `mcp:Session` | Session state container available in stateful mode, allowing tools to persist data across multiple calls from the same client. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `mcp:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the MCP listener. Extends the standard HTTP listener configuration. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpListener` | <code>int&#124;http:Listener</code> | Required | The port number or an existing `http:Listener` instance to bind to. |
| `host` | <code>string</code> | `"0.0.0.0"` | The hostname or IP address to bind the listener to. |
| `secureSocket` | <code>http:ListenerSecureSocket</code> | `()` | SSL/TLS configuration for secure connections. |
| `timeout` | <code>decimal</code> | `120` | Connection idle timeout in seconds. |

### Initializing the listener

**Using a port number:**

```ballerina
import ballerina/mcp;

listener mcp:Listener mcpListener = new (9090);
```

**Using an existing HTTP listener:**

```ballerina
import ballerina/http;
import ballerina/mcp;

http:Listener httpListener = check new (9090);
listener mcp:Listener mcpListener = new (httpListener);
```

---

## Service

An MCP service is a Ballerina service attached to an `mcp:Listener`. In the basic pattern (`mcp:Service`), remote functions annotated with `@mcp:Tool` are automatically discovered and exposed as tools. In the advanced pattern (`mcp:AdvancedService`), you implement `onListTools` and `onCallTool` callbacks for full control.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `Tool function (basic pattern)` | <code>remote function myTool(string param1, int param2) returns string&#124;error</code> | Any remote function on an `mcp:Service` annotated with `@mcp:Tool` is automatically exposed as an MCP tool. Parameters and return types are inferred from the function signature. |
| `onListTools (advanced pattern)` | <code>remote isolated function onListTools() returns mcp:ListToolsResult&#124;mcp:ServerError</code> | Invoked when a client requests the list of available tools. Returns tool definitions manually. |
| `onCallTool (advanced pattern)` | <code>remote isolated function onCallTool(mcp:CallToolParams params, mcp:Session? session = ()) returns mcp:CallToolResult&#124;mcp:ServerError</code> | Invoked when a client calls a specific tool. Receives the tool name and arguments, and returns the tool result. |

In the basic pattern, annotate remote functions with `@mcp:Tool` to expose them. The function name becomes the tool name, and parameters are automatically mapped to the tool's input schema.

### Full usage example

```ballerina
import ballerina/mcp;

configurable int port = 9090;

listener mcp:Listener mcpListener = new (port);

@mcp:ServiceConfig {
    info: {
        name: "Weather Server",
        version: "1.0.0"
    }
}
service /mcp on mcpListener {

    // This function is automatically exposed as an MCP tool
    @mcp:Tool
    remote function getCurrentWeather(string city) returns string|error {
        // Implement weather lookup logic
        return string `Current weather in ${city}: 15°C, Partly Cloudy`;
    }

    // Another tool with multiple parameters
    @mcp:Tool {
        description: "Get weather forecast for a location"
    }
    remote function getWeatherForecast(string location, int days) returns string|error {
        return string `${days}-day forecast for ${location}: Sunny, 20-25°C`;
    }
}
```

For stateful services, add `mcp:Session` as the first parameter of your tool functions and set `sessionMode: mcp:STATEFUL` in the service configuration. The session object allows you to store and retrieve data across multiple tool calls from the same client.

---

## Supporting types

### `ServiceConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `info` | <code>Implementation</code> | Server name and version information advertised to clients during initialization. |
| `options` | <code>ServerOptions?</code> | Optional server capabilities, instructions, and strict capability enforcement settings. |
| `sessionMode` | <code>SessionMode</code> | Session management mode: `STATEFUL`, `STATELESS`, or `AUTO` (default). In `AUTO` mode, stateful behavior is enabled if any tool function accepts a `Session` parameter. |
| `httpConfig` | <code>http:HttpServiceConfig</code> | HTTP service configuration options such as CORS settings. |

### `Implementation`

| Field | Type | Description |
|-------|------|-------------|
| `name` | <code>string</code> | The name of the server or client implementation. |
| `version` | <code>string</code> | The version of the server or client implementation. |

### `CallToolParams`

| Field | Type | Description |
|-------|------|-------------|
| `name` | <code>string</code> | The name of the tool to invoke. |
| `arguments` | `map<json>?` | A map of argument names to values to pass to the tool. |
| `_meta` | `MetaInfo?` | Optional metadata including a progress token for tracking long-running operations. |

### `CallToolResult`

| Field | Type | Description |
|-------|------|-------------|
| `content` | <code>(TextContent&#124;ImageContent&#124;AudioContent&#124;EmbeddedResource)[]</code> | Array of content items returned by the tool. Each item has a `type` field (`text`, `image`, `audio`, or `resource`). |
| `isError` | <code>boolean?</code> | If `true`, indicates the tool execution encountered an error. |

### `ListToolsResult`

| Field | Type | Description |
|-------|------|-------------|
| `tools` | <code>ToolDefinition[]</code> | Array of tool definitions available on the server. |
| `nextCursor` | <code>Cursor?</code> | Pagination cursor for retrieving additional tools, if available. |

### `Session`

| Field | Type | Description |
|-------|------|-------------|
| `getSessionId()` | <code>function () returns string</code> | Returns the unique session identifier. |
| `set(string key, SessionEntry value)` | <code>function</code> | Stores a value in the session by key. |
| `get(string key)` | <code>function () returns SessionEntry</code> | Retrieves a value from the session by key. |
| `hasKey(string key)` | <code>function () returns boolean</code> | Checks whether a key exists in the session. |
| `remove(string key)` | <code>function</code> | Removes an entry from the session by key. |
