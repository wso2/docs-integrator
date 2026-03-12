---
sidebar_position: 3
title: Consuming MCP Tools
description: Connect to external MCP servers and use their tools within your Ballerina agents and integrations.
---

# Consuming MCP Tools

WSO2 Integrator can act as an MCP client, connecting to external MCP servers and incorporating their tools into your agents. This lets you leverage community MCP servers (GitHub, Slack, file systems) or internal MCP servers built by other teams.

Instead of writing custom connectors for every external service, you connect to its MCP server and let your agent discover and call its tools through the standardized protocol.

## Connecting to an MCP Server

### stdio Connection

Connect to a locally running MCP server that communicates over standard I/O.

```ballerina
import ballerinax/mcp;

// Connect to a community MCP server via stdio
final mcp:Client githubMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken}
});
```

### SSE Connection

Connect to a remote MCP server running over SSE (Server-Sent Events).

```ballerina
final mcp:Client remoteMcp = check new ({
    transport: new mcp:SseClientTransport("http://internal-service:8090/sse")
});
```

### Streamable HTTP Connection

Connect to an MCP server using the Streamable HTTP transport.

```ballerina
final mcp:Client streamableMcp = check new ({
    transport: new mcp:StreamableHttpClientTransport("http://internal-service:8090/mcp")
});
```

## Using MCP Tools in Agents

The most common pattern is to pass MCP tools directly to an agent so the LLM can discover and call them during reasoning.

### Single MCP Server

```ballerina
import ballerinax/ai.agent;
import ballerinax/mcp;

final mcp:Client githubMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken}
});

// Pass MCP tools directly to the agent
final agent:ChatAgent devAgent = check new (
    model: llmClient,
    systemPrompt: "You are a development assistant. Help with GitHub issues, PRs, and repository management.",
    tools: check githubMcp.getTools()
);
```

### Multiple MCP Servers

Combine tools from several MCP servers into a single agent.

```ballerina
final mcp:Client githubMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken}
});

final mcp:Client slackMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-slack"],
    env: {"SLACK_BOT_TOKEN": slackToken}
});

final mcp:Client filesMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-filesystem"],
    env: {"ALLOWED_DIRS": "/data/reports"}
});

// Merge tools from all MCP servers
agent:Tool[] allTools = [
    ...check githubMcp.getTools(),
    ...check slackMcp.getTools(),
    ...check filesMcp.getTools()
];

final agent:ChatAgent multiToolAgent = check new (
    model: llmClient,
    systemPrompt: "You are a project assistant with access to GitHub, Slack, and shared files.",
    tools: allTools
);
```

### Mixing MCP Tools with Local Tools

Combine external MCP tools with locally defined agent tools.

```ballerina
// Local tools
@agent:Tool {
    name: "getCustomerDetails",
    description: "Look up customer details from the internal CRM by customer ID."
}
isolated function getCustomerDetails(string customerId) returns json|error {
    return check crmClient->get(string `/customers/${customerId}`);
}

@agent:Tool {
    name: "createSupportTicket",
    description: "Create a new support ticket in the internal ticketing system."
}
isolated function createSupportTicket(string subject, string description) returns json|error {
    return check ticketApi->post("/tickets", {subject, description});
}

// Combine local and MCP tools
final agent:ChatAgent hybridAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant with access to the CRM, ticketing system, and Slack.",
    tools: [
        getCustomerDetails,
        createSupportTicket,
        ...check slackMcp.getTools()
    ]
);
```

## Listing Available Tools

Before passing tools to an agent, you can inspect what an MCP server provides.

```ballerina
// List all tools available from the MCP server
mcp:ToolInfo[] tools = check githubMcp.listTools();

foreach mcp:ToolInfo tool in tools {
    io:println(string `Tool: ${tool.name}`);
    io:println(string `  Description: ${tool.description}`);
    io:println(string `  Parameters: ${tool.inputSchema.toString()}`);
}
```

## Calling MCP Tools Directly

If you need to call an MCP tool outside of an agent context, use the `callTool` method directly.

```ballerina
// Call a specific MCP tool with parameters
json result = check githubMcp.callTool("list_issues", {
    "owner": "wso2",
    "repo": "ballerina-lang",
    "state": "open",
    "labels": "bug"
});

io:println("Open bugs: ", result);
```

## Reading MCP Resources

Access read-only data exposed by an MCP server.

```ballerina
// List available resources
mcp:ResourceInfo[] resources = check remoteMcp.listResources();

// Read a specific resource
json configData = check remoteMcp.readResource("config://app-settings");
```

## Connection Lifecycle

### Initialization

The MCP client connects to the server, performs protocol negotiation, and discovers available capabilities.

```ballerina
final mcp:Client mcpClient = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken},
    initializationTimeout: 30  // seconds to wait for server startup
});
```

### Graceful Shutdown

Close the MCP connection when your service shuts down.

```ballerina
public function main() returns error? {
    // ... use the MCP client ...

    // Clean up
    check mcpClient.close();
}
```

### Connection Error Handling

Handle connection failures gracefully, especially for remote MCP servers.

```ballerina
function connectWithRetry(mcp:ClientConfig config, int maxRetries) returns mcp:Client|error {
    int attempt = 0;
    while attempt < maxRetries {
        mcp:Client|error client = new (config);
        if client is mcp:Client {
            return client;
        }
        attempt += 1;
        runtime:sleep(attempt * 2);  // Exponential backoff
    }
    return error("Failed to connect to MCP server after retries");
}
```

## Filtering and Selecting Tools

When an MCP server exposes many tools, you may want to pass only a subset to your agent.

```ballerina
// Get all tools and filter to only read-only operations
agent:Tool[] allTools = check githubMcp.getTools();
agent:Tool[] readOnlyTools = from agent:Tool tool in allTools
    where tool.name.startsWith("get_") || tool.name.startsWith("list_") || tool.name.startsWith("search_")
    select tool;

final agent:ChatAgent readOnlyAgent = check new (
    model: llmClient,
    systemPrompt: "You can look up information in GitHub but cannot make changes.",
    tools: readOnlyTools
);
```

## What's Next

- [Exposing MCP Servers](exposing-mcp-servers.md) -- Build your own MCP server
- [MCP Security](mcp-security.md) -- Authenticate MCP connections
- [Tool Binding](/docs/genai/agents/tool-binding) -- Advanced tool patterns for agents
- [Multi-Agent Orchestration](/docs/genai/agents/multi-agent-orchestration) -- Compose MCP tools across agents
