---
sidebar_position: 2
title: Building AI Agents with MCP Servers
description: Connect AI agents to MCP servers for extended capabilities through standardized tool discovery and invocation.
---

# Building AI Agents with MCP Servers

MCP (Model Context Protocol) servers expose tools through a standardized interface that any compatible client can discover and call. By connecting your AI agents to MCP servers, you can extend agent capabilities without writing custom connector code for each service.

This page covers how to connect agents to MCP servers, discover tools, combine MCP tools with local tools, and manage MCP connections in production.

## Connecting to an MCP Server

### stdio Connection

Connect to a locally running MCP server that communicates over standard I/O. This is the most common setup for development and desktop-based workflows.

```ballerina
import ballerinax/mcp;

final mcp:Client githubMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken}
});
```

### SSE Connection

Connect to a remote MCP server running over Server-Sent Events.

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

The most common pattern is to pass MCP tools directly to an agent. The LLM discovers the available tools through their names and descriptions and calls them as needed during reasoning.

### Single MCP Server

```ballerina
import ballerinax/ai.agent;
import ballerinax/mcp;

configurable string githubToken = ?;

final mcp:Client githubMcp = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken}
});

final agent:ChatAgent devAgent = check new (
    model: llmClient,
    systemPrompt: "You are a development assistant. Help with GitHub issues, PRs, and repository management.",
    tools: check githubMcp.getTools()
);
```

### Multiple MCP Servers

Combine tools from several MCP servers into a single agent for broader capabilities.

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

Combine external MCP tools with locally defined agent tools for a hybrid approach.

```ballerina
// Local tools defined in your codebase
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

## Tool Discovery

Before passing tools to an agent, you can inspect what an MCP server provides.

### Listing Available Tools

```ballerina
mcp:ToolInfo[] tools = check githubMcp.listTools();

foreach mcp:ToolInfo tool in tools {
    io:println(string `Tool: ${tool.name}`);
    io:println(string `  Description: ${tool.description}`);
    io:println(string `  Parameters: ${tool.inputSchema.toString()}`);
}
```

### Filtering Tools

When an MCP server exposes many tools, pass only a relevant subset to your agent. Fewer tools means clearer tool selection by the LLM.

```ballerina
agent:Tool[] allTools = check githubMcp.getTools();

// Only include read-only tools
agent:Tool[] readOnlyTools = from agent:Tool tool in allTools
    where tool.name.startsWith("get_") || tool.name.startsWith("list_") || tool.name.startsWith("search_")
    select tool;

final agent:ChatAgent readOnlyAgent = check new (
    model: llmClient,
    systemPrompt: "You can look up information in GitHub but cannot make changes.",
    tools: readOnlyTools
);
```

## Calling MCP Tools Directly

If you need to call an MCP tool outside of an agent context, use the `callTool` method.

```ballerina
json result = check githubMcp.callTool("list_issues", {
    "owner": "wso2",
    "repo": "ballerina-lang",
    "state": "open",
    "labels": "bug"
});
```

This is useful for one-off integrations, scripts, or pipelines where you do not need an agent's reasoning loop.

## Reading MCP Resources

Access read-only data exposed by an MCP server.

```ballerina
// List available resources
mcp:ResourceInfo[] resources = check remoteMcp.listResources();

// Read a specific resource
json configData = check remoteMcp.readResource("config://app-settings");
```

## Connection Lifecycle

### Initialization and Timeout

```ballerina
final mcp:Client mcpClient = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"],
    env: {"GITHUB_TOKEN": githubToken},
    initializationTimeout: 30   // Seconds to wait for server startup
});
```

### Graceful Shutdown

Close the MCP connection when your service shuts down.

```ballerina
public function main() returns error? {
    // ... use the MCP client ...

    check mcpClient.close();
}
```

### Connection Error Handling

Handle connection failures gracefully, especially for remote MCP servers that may be temporarily unavailable.

```ballerina
function connectWithRetry(mcp:ClientConfig config, int maxRetries) returns mcp:Client|error {
    int attempt = 0;
    while attempt < maxRetries {
        mcp:Client|error client = new (config);
        if client is mcp:Client {
            return client;
        }
        attempt += 1;
        runtime:sleep(attempt * 2);
    }
    return error("Failed to connect to MCP server after retries");
}
```

## Connecting to Your Own MCP Servers

Connect your agents to MCP servers you built with WSO2 Integrator.

```ballerina
// Your custom MCP server running on SSE transport
final mcp:Client inventoryMcp = check new ({
    transport: new mcp:SseClientTransport("http://localhost:8091/sse")
});

// Your custom MCP server running on Streamable HTTP
final mcp:Client analyticsMcp = check new ({
    transport: new mcp:StreamableHttpClientTransport("http://localhost:8092/mcp")
});

// Agent with tools from both custom servers
final agent:ChatAgent internalAgent = check new (
    model: llmClient,
    systemPrompt: "You are an internal operations assistant with access to inventory and analytics.",
    tools: [
        ...check inventoryMcp.getTools(),
        ...check analyticsMcp.getTools()
    ]
);
```

## Agent with MCP as an HTTP Service

Expose your MCP-powered agent as a REST API.

```ballerina
import ballerina/http;

service /api on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string response = check multiToolAgent.chat(request.message, request.sessionId);
        return {message: response};
    }

    resource function get tools() returns json|error {
        mcp:ToolInfo[] tools = check githubMcp.listTools();
        return tools.toJson();
    }
}

type ChatRequest record {|
    string message;
    string sessionId;
|};

type ChatResponse record {|
    string message;
|};
```

## What's Next

- [Creating an MCP Server](/docs/genai/develop/mcp/creating-mcp-server) -- Build your own MCP server
- [Consuming MCP Tools](/docs/genai/mcp/consuming-mcp-tools) -- Detailed MCP client patterns
- [MCP Security](/docs/genai/mcp/mcp-security) -- Secure MCP connections
- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Build agents from scratch
