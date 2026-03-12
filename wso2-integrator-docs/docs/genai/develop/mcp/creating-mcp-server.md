---
sidebar_position: 1
title: Creating an MCP Server
description: Create Model Context Protocol servers to expose your integrations as tools, resources, and prompts for AI assistants.
---

# Creating an MCP Server

The Model Context Protocol (MCP) is an open standard that lets AI assistants discover and call your integration functions through a unified interface. By creating an MCP server in WSO2 Integrator, you expose your APIs, databases, and services as tools that any MCP-compatible client -- Claude Desktop, GitHub Copilot, or custom agents -- can use.

This page covers how to create an MCP server, define tools, expose resources, configure transports, and set up the server for production use.

## Minimal MCP Server

The simplest MCP server declares a service configuration and registers one or more tools.

```ballerina
import ballerinax/mcp;

@mcp:ServiceConfig {
    name: "order-service",
    version: "1.0.0"
}
service on new mcp:Listener() {
}

@mcp:Tool {
    name: "getOrderStatus",
    description: "Look up the current status of a customer order by order ID (format: ORD-XXXXX)."
}
isolated function getOrderStatus(string orderId) returns json|error {
    return check orderApi->get(string `/orders/${orderId}/status`);
}
```

By default, the server uses `stdio` transport, which is compatible with local MCP clients like Claude Desktop.

### The @mcp:ServiceConfig Annotation

The `@mcp:ServiceConfig` annotation defines server-level metadata that MCP clients use during capability negotiation.

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | A unique identifier for this MCP server |
| `version` | Yes | Semantic version string |
| `description` | No | Human-readable description of the server's purpose |
| `capabilities` | No | Explicitly declared capabilities (tools, resources, prompts) |

```ballerina
@mcp:ServiceConfig {
    name: "enterprise-data-service",
    version: "2.1.0",
    description: "Provides access to customer, order, and inventory data for AI assistants."
}
service on new mcp:Listener() {
}
```

## Choosing a Transport

### stdio Transport

The default transport. The MCP client launches the server as a subprocess and communicates over standard I/O. Best for local development and desktop AI clients.

```ballerina
service on new mcp:Listener() {
}
```

### SSE Transport

Server-Sent Events transport for remote clients. The server runs as an HTTP service that clients connect to via SSE.

```ballerina
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

### Streamable HTTP Transport

A newer transport that uses standard HTTP with streaming support. Suitable for web-based AI assistants and cloud deployments.

```ballerina
service on new mcp:Listener(new mcp:StreamableHttpTransport(8090)) {
}
```

| Transport | Best For | Client Examples |
|-----------|----------|-----------------|
| **stdio** | Local development, desktop clients | Claude Desktop, local agents |
| **SSE** | Remote clients, web apps | Web-based AI assistants |
| **Streamable HTTP** | Cloud deployments, modern clients | Cloud-hosted agents |

## Defining Tools

Tools are functions that AI assistants can call with parameters and receive structured results.

### Basic Tool

```ballerina
@mcp:Tool {
    name: "getCustomer",
    description: "Retrieve customer details by ID. Returns name, email, account status, and subscription tier."
}
isolated function getCustomer(string customerId) returns json|error {
    return check crmClient->get(string `/customers/${customerId}`);
}
```

### Tool with Annotated Parameters

Add descriptions to each parameter so AI assistants understand what values to provide.

```ballerina
@mcp:Tool {
    name: "searchProducts",
    description: "Search the product catalog by keyword, category, or price range. Returns up to 10 matching products."
}
isolated function searchProducts(
    @mcp:Param {description: "Search keyword or product name"} string query,
    @mcp:Param {description: "Category filter: 'electronics', 'clothing', 'home', or 'all'"} string category = "all",
    @mcp:Param {description: "Maximum price in USD"} decimal? maxPrice = (),
    @mcp:Param {description: "Number of results to return (1-50)"} int 'limit = 10
) returns json|error {
    map<string> params = {"q": query, "category": category, "limit": 'limit.toString()};
    if maxPrice is decimal {
        params["maxPrice"] = maxPrice.toString();
    }
    return check catalogApi->get("/products/search", params);
}
```

### Tool with Typed Return Values

Return Ballerina records for structured, schema-aware output.

```ballerina
type OrderStatus record {|
    string orderId;
    string status;
    string estimatedDelivery;
    string? trackingNumber;
    OrderItem[] items;
|};

type OrderItem record {|
    string productName;
    int quantity;
    decimal price;
|};

@mcp:Tool {
    name: "getOrderDetails",
    description: "Retrieve full details of an order including items, status, and tracking information."
}
isolated function getOrderDetails(string orderId) returns OrderStatus|error {
    return check orderDb->queryRow(
        `SELECT * FROM orders WHERE order_id = ${orderId}`
    );
}
```

### Write-Action Tools

For tools that modify data, include clear descriptions about side effects so AI assistants can inform users before executing.

```ballerina
@mcp:Tool {
    name: "createSupportTicket",
    description: "Create a new support ticket. Returns the ticket ID. This action creates a real ticket in the ticketing system."
}
isolated function createSupportTicket(
    @mcp:Param {description: "Customer ID"} string customerId,
    @mcp:Param {description: "Ticket subject line"} string subject,
    @mcp:Param {description: "Detailed issue description"} string description,
    @mcp:Param {description: "Priority: 'low', 'medium', 'high', or 'critical'"} string priority = "medium"
) returns json|error {
    return check ticketApi->post("/tickets", {customerId, subject, description, priority});
}
```

## Defining Resources

Resources expose read-only data that AI assistants can access for context without calling a tool.

### Static Resource

```ballerina
@mcp:Resource {
    uri: "config://product-categories",
    name: "Product Categories",
    description: "List of all product categories and their descriptions",
    mimeType: "application/json"
}
isolated function getProductCategories() returns json|error {
    return check catalogApi->get("/categories");
}
```

### Dynamic Resource with URI Template

```ballerina
@mcp:Resource {
    uri: "data://customers/{customerId}/profile",
    name: "Customer Profile",
    description: "Full profile data for a specific customer",
    mimeType: "application/json"
}
isolated function getCustomerProfile(string customerId) returns json|error {
    return check crmClient->get(string `/customers/${customerId}/profile`);
}
```

## Defining Prompts

Prompts are reusable prompt templates that AI assistants can offer to users for common tasks.

```ballerina
@mcp:Prompt {
    name: "analyze-order-issue",
    description: "Analyze a customer order issue and suggest resolution steps"
}
isolated function analyzeOrderIssuePrompt(
    @mcp:Param {description: "The order ID with the issue"} string orderId,
    @mcp:Param {description: "Customer's description of the problem"} string issueDescription
) returns string {
    return string `Analyze the following customer order issue and provide a structured resolution plan.

Order ID: ${orderId}
Customer Description: ${issueDescription}

Please:
1. Identify the likely root cause
2. List 2-3 resolution options ranked by likelihood of success
3. Recommend the best course of action
4. Draft a customer-facing response`;
}
```

## Error Handling

Return informative error messages so AI assistants can reason about failures and suggest alternatives.

```ballerina
@mcp:Tool {
    name: "getInvoice",
    description: "Retrieve an invoice by ID. Returns an error with suggestions if the invoice is not found."
}
isolated function getInvoice(string invoiceId) returns json|error {
    json|error result = billingApi->get(string `/invoices/${invoiceId}`);
    if result is error {
        return {
            "found": false,
            "message": string `Invoice '${invoiceId}' not found.`,
            "suggestion": "Verify the invoice ID format (INV-XXXXX) or try searching by customer ID using the searchInvoices tool."
        };
    }
    return result;
}
```

## Limiting Output Size

Trim large responses to prevent exceeding context window limits on the client side.

```ballerina
@mcp:Tool {
    name: "queryAnalytics",
    description: "Run a read-only analytics query. Returns up to 20 rows to stay within context limits."
}
isolated function queryAnalytics(string sqlQuery) returns json|error {
    if !sqlQuery.toLowerAscii().startsWith("select") {
        return error("Only SELECT queries are allowed.");
    }
    json[] rows = check analyticsDb->queryRows(sqlQuery);
    json[] trimmed = rows.length() > 20 ? rows.slice(0, 20) : rows;
    return {
        "results": trimmed,
        "totalRows": rows.length(),
        "showing": trimmed.length(),
        "truncated": rows.length() > 20
    };
}
```

## Configuring for Claude Desktop

### stdio Transport

Add the server to your Claude Desktop configuration file.

```json
{
  "mcpServers": {
    "order-service": {
      "command": "bal",
      "args": ["run", "/path/to/your/project"]
    }
  }
}
```

### SSE Transport

```json
{
  "mcpServers": {
    "order-service": {
      "url": "http://localhost:8090/sse"
    }
  }
}
```

## What's Next

- [Building AI Agents with MCP Servers](/docs/genai/develop/mcp/agents-with-mcp) -- Connect agents to MCP tools
- [Exposing MCP Servers](/docs/genai/mcp/exposing-mcp-servers) -- Detailed server patterns
- [MCP Security](/docs/genai/mcp/mcp-security) -- Secure your MCP endpoints
- [MCP Overview](/docs/genai/mcp/overview) -- Protocol concepts and architecture
