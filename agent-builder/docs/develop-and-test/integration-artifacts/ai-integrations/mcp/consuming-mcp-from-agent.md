---
title: Consuming MCP from an Agent
---

# Consuming MCP from an Agent

An [AI agent](../agents/agents.md) in WSO2 Agent Builder can use any MCP server as a tool source. Add the server once, and the agent picks up every tool the server advertises (or only the ones you select) and treats them exactly like local function tools.

## Adding an MCP server to an agent

On the agent canvas, select **Add Tool** at the bottom-right corner of the **AI Agent** node, then select **Use MCP Server**. In the **Add Tool - Use MCP Server** panel, select **Connect Manually** to enter a server URL. To use an MCP server that your organization added to WSO2 Agent Manager, select **WSO2 Agent Manager** instead. The manual connection form opens:

<ThemedImage
    alt="The agent canvas with the Add Tool - Use MCP Server panel open, showing Server Url (http://localhost:8080/mcp), a Requires Authentication checkbox, Tools to Include set to Selected, the Available Tools list (3 of 3 selected: getTextStatistics, getReadabilityScore, and analyzeStructure, each with a Read more link) with a Deselect All button, a collapsed Advanced Configurations section, and Result (default aiMcpbasetoolkit)."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/consuming-mcp-from-agent/01-add-mcp-server-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/consuming-mcp-from-agent/01-add-mcp-server-v1.0.png'),
    }}
/>

| Field | What it does |
|---|---|
| **Server Url** | The MCP endpoint, for example `http://localhost:8080/mcp`. |
| **Requires Authentication** | Select this if the server requires authentication. The panel then shows the authentication fields. |
| **Tools to Include** | `All` to expose every tool the server advertises, or `Selected` to expose only some. |
| **Available Tools** (shown when **Selected**) | Lists every tool the server advertises, with its description and a **Read more** link. Select the tools the agent can use. **Select All** and **Deselect All** change every tool at once. |
| **Advanced Configurations** > **Info** | The client name and version sent to the server. |
| **Advanced Configurations** > **HTTP Version** | The HTTP version the client uses to connect (`HTTP/2_0` or `HTTP/1_1`). |
| **Advanced Configurations** > **HTTP1 / HTTP2 Settings** | Protocol tuning such as keep-alive, header sizes, and frame sizes. |
| **Advanced Configurations** > **Timeout** | Per-call timeout. Defaults to 30 seconds. Increase it for slow tools. |
| **Advanced Configurations** > **Forwarded** | Whether to add `Forwarded` or `X-Forwarded-For` headers when the agent runs behind a proxy. |
| **Result** | The variable name for the generated toolkit instance (for example, `aiMcpbasetoolkit`). |

After you select **Save**, the toolkit appears on the canvas, connected to the **AI Agent** node by a dashed line. The agent's LLM sees the selected MCP tools the same way it sees any other tool.

Saving the **Add Tool - Use MCP Server** panel generates a toolkit class named `McpToolKit` that implements `ai:McpBaseToolKit`, plus a module-level instance that connects at startup. The agent receives the toolkit through its `tools` list.

In `agents.bal`, WSO2 Agent Builder generates the toolkit class and the agent declaration:

```ballerina
import ballerina/ai;
import ballerina/mcp;

final ai:Agent aiAgent = check new (
    systemPrompt = {role: string `AI Agent`, instructions: string ``},
    model = check ai:getDefaultModelProvider(),
    tools = [aiMcpbasetoolkit]
);

isolated class McpToolKit {
    *ai:McpBaseToolKit;
    private final mcp:StreamableHttpClient mcpClient;
    private final readonly & ai:ToolConfig[] tools;

    public isolated function init(string serverUrl, mcp:Implementation info = {name: "MCP", version: "1.0.0"},
            *mcp:StreamableHttpClientTransportConfig config) returns ai:Error? {
        do {
            self.mcpClient = check new mcp:StreamableHttpClient(serverUrl, config);
            self.tools = check ai:getPermittedMcpToolConfigs(self.mcpClient, info, self.callTool).cloneReadOnly();
        } on fail error e {
            return error ai:Error("Failed to initialize MCP toolkit", e);
        }
    }

    public isolated function getTools() returns ai:ToolConfig[] => self.tools;

    @ai:AgentTool
    public isolated function callTool(mcp:CallToolParams params) returns mcp:CallToolResult|error {
        return self.mcpClient->callTool(params);
    }
}
```

In `connections.bal`, it instantiates the toolkit with the server URL from the panel:

```ballerina
final McpToolKit aiMcpbasetoolkit = check new ("http://localhost:8080/mcp");
```

The panel settings map to the generated code as follows:

- **Server Url** is the first argument in `connections.bal`.
- **Info** maps to the `info` parameter.
- **Tools to Include** sets the third argument of `ai:getPermittedMcpToolConfigs`. See [Filtering tools](#filtering-tools).
- The **Advanced Configurations** settings (**HTTP Version**, **HTTP1 / HTTP2 Settings**, **Timeout**, and **Forwarded**) are passed through `mcp:StreamableHttpClientTransportConfig`.

## Filtering tools

When an MCP server exposes many tools, include only the ones the agent needs.

In the **Edit MCP Server** panel, set **Tools to Include** to **Selected** and select the tools the agent can use. The panel queries the server and lists every tool it advertises under **Available Tools**, with a **Select All** / **Deselect All** shortcut and a running count (for example, "1 of 3 selected").

<ThemedImage
    alt="The Edit MCP Server panel with Tools to Include set to Selected, showing the Available Tools list (1 of 3 selected) with getTextStatistics checked and getReadabilityScore and analyzeStructure unchecked, each with a Read more link. On the canvas, aiMcpbasetoolkit connects to the AI Agent node with a dashed line."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents-v5.1/consuming-mcp-from-agent/02-mcp-filter-tools-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents-v5.1/consuming-mcp-from-agent/02-mcp-filter-tools-v1.0.png'),
    }}
/>

When you select tools in the panel, WSO2 Agent Builder adds one `@ai:AgentTool` function per selected tool to the toolkit class and registers them in a `map<ai:FunctionTool>`. The map is then passed to `ai:getPermittedMcpToolConfigs`, which filters the server's tool list to those keys.

```ballerina
public isolated function init(string serverUrl, mcp:Implementation info = {name: "MCP", version: "1.0.0"},
        *mcp:StreamableHttpClientTransportConfig config) returns ai:Error? {
    final map<ai:FunctionTool> permittedTools = {
        "submitReturnRequest": self.submitreturnrequest,
        "searchProducts": self.searchproducts
    };

    do {
        self.mcpClient = check new mcp:StreamableHttpClient(serverUrl, config);
        self.tools = check ai:getPermittedMcpToolConfigs(self.mcpClient, info, permittedTools).cloneReadOnly();
    } on fail error e {
        return error ai:Error("Failed to initialize MCP toolkit", e);
    }
}

@ai:AgentTool
public isolated function submitreturnrequest(mcp:CallToolParams params) returns mcp:CallToolResult|error {
    return self.mcpClient->callTool(params);
}

@ai:AgentTool
public isolated function searchproducts(mcp:CallToolParams params) returns mcp:CallToolResult|error {
    return self.mcpClient->callTool(params);
}
```

If you write the toolkit by hand using the generic `ai:McpToolKit` class instead of the generated per-server class, the equivalent is a single `string[]` of permitted tool names passed to the constructor:

```ballerina
final ai:McpToolKit minimal = check new (
    "http://localhost:9090/mcp",
    ["searchProducts", "submitReturnRequest"]
);
```

Why it matters:

- **Tool selection accuracy.** LLMs choose better with fewer options.
- **Prompt size.** Every tool's name, description, and parameter schema is sent on every call. Filtering trims the prompt.
- **Cost.** Smaller prompts cost less.
- **Security.** Don't give the agent tools that change data unless you designed for it.

## Combining MCP servers, local tools, and toolkits

The agent's `tools` array accepts any combination of:

- **Function tools** marked `@ai:AgentTool`.
- **Custom toolkit classes** (your own `*ai:BaseToolKit` implementations).
- **`ai:McpToolKit` instances** for one or more remote MCP servers.

```ballerina
final ai:McpToolKit slackMcp = check new ("http://localhost:9092/mcp");
final ai:McpToolKit calendarMcp = check new ("http://localhost:9093/mcp");

final ai:Agent supportAgent = check new (
    systemPrompt = {
        role: "Support Assistant",
        instructions: "Use CRM tools for customer info, Slack for notifications, " +
            "and Calendar for scheduling follow-ups."
    },
    tools = [
        getCustomerDetails,            // local function tool
        createSupportTicket,           // local function tool
        slackMcp,                      // MCP toolkit
        calendarMcp                    // another MCP toolkit
    ],
    model = check ai:getDefaultModelProvider()
);
```

Local tools and MCP tools are completely interchangeable from the agent's perspective. The LLM sees one unified tool list.

## Production tips

- **Make endpoints configurable.** Hard-coding MCP URLs makes environments harder to manage. Expose the URL as a `configurable` variable (listed under **Configurations** in the project sidebar) so it can be set per environment without changing source code.

- **Run MCP servers close to the agent.** The agent waits for every MCP call before it responds, so network latency between the agent and the server adds directly to the response time users see.

- **Authenticate the connection.** If the MCP server is yours, put authentication in front of it. If it's external, follow the vendor's authentication scheme. Most use OAuth or bearer tokens passed in headers.

- **Watch token costs.** Every tool the toolkit advertises is included in every reasoning step's prompt. A 50-tool MCP server, unfiltered, is a real prompt-token cost.

## What's next

- **[Exposing a service as MCP](exposing-as-mcp.md)** — the other side of MCP.
- **[Tools (in AI agents)](../agents/tools.md)** — every option in the **Add Tool** panel.
- **[Creating an agent](../agents/create-an-agent.md)** — create the agent that uses the MCP tools.
