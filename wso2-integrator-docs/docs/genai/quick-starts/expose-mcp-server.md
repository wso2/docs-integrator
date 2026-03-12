---
sidebar_position: 3
title: "Quick Start: Expose Integrations as an MCP Server"
description: Turn your existing integrations into an MCP server that AI assistants can use.
---

# Expose Integrations as an MCP Server

**Time:** Under 15 minutes. **What you'll build:** An MCP (Model Context Protocol) server that exposes your existing integration functions as tools that any MCP-compatible AI assistant can discover and call.

The Model Context Protocol is an open standard that lets AI assistants interact with external systems. By wrapping your integrations as an MCP server, you make them accessible to tools like Claude Desktop, GitHub Copilot, and other MCP clients.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An existing integration or API you want to expose (this guide creates a simple one)

## What You'll Build

An MCP server that exposes:
- A tool to query customer data from a database
- A tool to create support tickets
- A resource for retrieving company policies

## Step 1: Set Up Dependencies

```ballerina
// Ballerina.toml
[package]
org = "myorg"
name = "enterprise_mcp_server"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "mcp"
version = "1.0.0"
```

## Step 2: Define MCP Tools

Annotate your integration functions as MCP tools with descriptions that help AI assistants understand when to use them.

```ballerina
import ballerinax/mcp;

@mcp:Tool {
    name: "lookupCustomer",
    description: "Look up customer details by customer ID or email address. Returns name, email, account status, and recent orders."
}
isolated function lookupCustomer(string customerId) returns json|error {
    // In production, this queries your CRM or customer database
    return {
        id: customerId,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "active",
        recentOrders: [
            {"orderId": "ORD-501", "date": "2025-03-01", "total": 129.99},
            {"orderId": "ORD-498", "date": "2025-02-15", "total": 49.99}
        ]
    };
}

@mcp:Tool {
    name: "createSupportTicket",
    description: "Create a new customer support ticket. Requires a customer ID, subject, and description. Returns the ticket ID."
}
isolated function createSupportTicket(
    string customerId,
    string subject,
    string description,
    string priority = "medium"
) returns json|error {
    // In production, this creates a ticket in your ticketing system
    return {
        ticketId: "TKT-1234",
        status: "created",
        customerId: customerId,
        subject: subject,
        priority: priority
    };
}

@mcp:Tool {
    name: "searchKnowledgeBase",
    description: "Search the internal knowledge base for articles matching a query. Returns relevant articles with titles and summaries."
}
isolated function searchKnowledgeBase(string query) returns json|error {
    return [
        {
            "title": "Return Policy",
            "summary": "Items can be returned within 30 days of purchase with original receipt.",
            "articleId": "KB-101"
        },
        {
            "title": "Shipping Times",
            "summary": "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.",
            "articleId": "KB-205"
        }
    ];
}
```

## Step 3: Define MCP Resources

Resources provide read-only data that AI assistants can access for context.

```ballerina
@mcp:Resource {
    uri: "company://policies/return-policy",
    name: "Return Policy",
    description: "The company's current return and refund policy"
}
isolated function getReturnPolicy() returns string|error {
    return string `
        Return Policy (Effective January 2025):
        - Items may be returned within 30 days of delivery
        - Items must be in original packaging and unused condition
        - Refunds are processed within 5-7 business days
        - Digital products are non-refundable after download
        - Shipping costs for returns are covered for defective items
    `;
}
```

## Step 4: Start the MCP Server

Create the MCP server and register all tools and resources.

```ballerina
public function main() returns error? {
    mcp:Server mcpServer = check new ({
        name: "Enterprise Support Tools",
        version: "1.0.0"
    });

    // Register tools
    check mcpServer.registerTool(lookupCustomer);
    check mcpServer.registerTool(createSupportTicket);
    check mcpServer.registerTool(searchKnowledgeBase);

    // Register resources
    check mcpServer.registerResource(getReturnPolicy);

    // Start the server (stdio transport for local MCP clients)
    check mcpServer.start();
}
```

## Step 5: Configure for an MCP Client

Build the project and configure it for use with an MCP client like Claude Desktop.

```bash
bal build
```

Add the server to your MCP client configuration. For Claude Desktop, edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "enterprise-support": {
      "command": "bal",
      "args": ["run", "/path/to/enterprise_mcp_server"],
      "env": {
        "DB_CONNECTION_STRING": "your-connection-string"
      }
    }
  }
}
```

## Step 6: Test the MCP Server

Once configured, your MCP client can discover and use the tools. In Claude Desktop, you can ask:

- "Look up customer C-123 and tell me their recent orders"
- "Create a support ticket for customer C-123 about a delayed shipment"
- "What's the company's return policy?"

The AI assistant will call your MCP tools to retrieve real data and perform actions through your existing integrations.

### Test with SSE Transport

For remote or web-based MCP clients, you can also expose the server over HTTP with Server-Sent Events:

```ballerina
public function main() returns error? {
    mcp:Server mcpServer = check new ({
        name: "Enterprise Support Tools",
        version: "1.0.0",
        transport: new mcp:SseTransport(8090)
    });

    check mcpServer.registerTool(lookupCustomer);
    check mcpServer.registerTool(createSupportTicket);
    check mcpServer.registerTool(searchKnowledgeBase);
    check mcpServer.registerResource(getReturnPolicy);

    check mcpServer.start();
}
```

## How It Works

The MCP server acts as a bridge between AI assistants and your enterprise systems:

1. **Discovery** — The AI assistant connects and queries the server for available tools and resources
2. **Invocation** — When the assistant decides it needs data, it calls a tool with structured parameters
3. **Execution** — Your integration code runs (database queries, API calls, etc.) and returns results
4. **Response** — The assistant incorporates the real data into its response to the user

## What's Next

- [MCP Overview](/docs/genai/mcp/overview) — Deep dive into the Model Context Protocol
- [MCP Security](/docs/genai/mcp/mcp-security) — Add authentication and authorization
- [Consuming MCP Tools](/docs/genai/mcp/consuming-mcp-tools) — Call external MCP servers from your integrations
- [Build a Conversational Agent](build-conversational-agent.md) — Create an agent that uses MCP tools internally
