---
sidebar_position: 1
title: Model Context Protocol Overview
description: Understand the Model Context Protocol (MCP) and how it connects AI assistants to your enterprise integrations.
---

# Model Context Protocol Overview

The Model Context Protocol (MCP) is an open standard that defines how AI assistants discover and interact with external tools, data sources, and services. WSO2 Integrator lets you both expose your integrations as MCP servers and consume external MCP tools within your agents.

Think of MCP as a universal adapter between AI and enterprise systems. Instead of building custom integrations for each AI assistant, you publish an MCP server once and any MCP-compatible client can use it.

## What Is MCP?

MCP defines a protocol for three types of capabilities:

| Capability | Description | Direction |
|------------|-------------|-----------|
| **Tools** | Functions the AI can call with parameters and receive results | AI calls your code |
| **Resources** | Read-only data the AI can access for context | AI reads your data |
| **Prompts** | Pre-defined prompt templates the AI can use | AI uses your templates |

### How MCP Works

```
┌──────────────────┐         ┌──────────────────┐
│   MCP Client     │         │   MCP Server     │
│  (AI Assistant)  │◄───────►│  (Your Service)  │
│                  │   MCP   │                  │
│  Claude Desktop  │ Protocol│  WSO2 Integrator │
│  GitHub Copilot  │         │  Functions, APIs  │
│  Custom Agent    │         │  Databases, etc.  │
└──────────────────┘         └──────────────────┘
```

1. **Discovery** — The client connects and asks the server what tools, resources, and prompts are available
2. **Invocation** — The client calls a tool or reads a resource with structured parameters
3. **Response** — The server executes the request and returns results
4. **Context** — The AI assistant incorporates the results into its reasoning

## MCP in WSO2 Integrator

WSO2 Integrator supports MCP in two directions:

### As an MCP Server

Expose your existing integrations, APIs, and databases as MCP tools that AI assistants can use.

```ballerina
import ballerinax/mcp;

@mcp:Tool {
    name: "getOrderStatus",
    description: "Look up the status of a customer order by order ID"
}
isolated function getOrderStatus(string orderId) returns json|error {
    return check orderApi->get(string `/orders/${orderId}/status`);
}
```

**Use cases:**
- Let AI assistants query your CRM, ERP, or databases
- Expose internal APIs to AI-powered workflows
- Give AI assistants access to real-time business data

### As an MCP Client

Consume external MCP tools from within your agents and integrations.

```ballerina
import ballerinax/mcp;

final mcp:Client externalTools = check new ({
    serverCommand: "npx",
    serverArgs: ["-y", "@modelcontextprotocol/server-github"]
});

// Use MCP tools as agent tools
final agent:ChatAgent myAgent = check new (
    model: llmClient,
    systemPrompt: "You are a development assistant.",
    tools: check externalTools.getTools()
);
```

**Use cases:**
- Use community MCP servers (GitHub, Slack, file systems) in your agents
- Compose multiple MCP servers into a single agent
- Access external data sources through standardized MCP interfaces

## Transport Options

MCP supports multiple transport mechanisms for different deployment scenarios.

### stdio (Standard I/O)

The server communicates over standard input/output. Used for local MCP clients like Claude Desktop.

```ballerina
mcp:Server server = check new ({
    name: "My MCP Server",
    version: "1.0.0"
    // stdio is the default transport
});
```

### SSE (Server-Sent Events)

The server runs as an HTTP service with SSE for real-time communication. Used for remote or web-based clients.

```ballerina
mcp:Server server = check new ({
    name: "My MCP Server",
    version: "1.0.0",
    transport: new mcp:SseTransport(8090)
});
```

### Streamable HTTP

A newer transport option that uses standard HTTP with streaming support.

```ballerina
mcp:Server server = check new ({
    name: "My MCP Server",
    version: "1.0.0",
    transport: new mcp:StreamableHttpTransport(8090)
});
```

## When to Use MCP

| Scenario | MCP Server | MCP Client |
|----------|-----------|-----------|
| Let Claude Desktop access your database | Yes | |
| Let GitHub Copilot use your internal APIs | Yes | |
| Build an agent that uses community MCP tools | | Yes |
| Connect your agent to external SaaS via MCP | | Yes |
| Create a universal API layer for AI assistants | Yes | |
| Compose multiple tool providers into one agent | | Yes |

## MCP vs. Direct Tool Binding

| Feature | MCP Tools | Direct Agent Tools |
|---------|-----------|-------------------|
| **Discoverability** | AI clients auto-discover available tools | Tools defined at compile time |
| **Protocol** | Standardized open protocol | Ballerina function calls |
| **External access** | Any MCP client can connect | Only your agent |
| **Latency** | Slightly higher (protocol overhead) | Lower (direct function calls) |
| **Best for** | Exposing to external AI clients | Internal agent-to-tool binding |

Use MCP when you want external AI assistants to access your systems. Use direct tool binding when building internal agents where tools are tightly coupled.

## What's Next

- [Exposing MCP Servers](exposing-mcp-servers.md) — Build MCP servers with WSO2 Integrator
- [Consuming MCP Tools](consuming-mcp-tools.md) — Use external MCP tools in your agents
- [MCP Security](mcp-security.md) — Secure your MCP endpoints
- [Quick Start: Expose as MCP Server](/docs/genai/quick-starts/expose-mcp-server) — Hands-on MCP server tutorial
