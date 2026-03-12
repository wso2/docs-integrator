---
sidebar_position: 2
title: Exposing MCP Servers
description: Turn your Ballerina integrations into MCP servers that AI assistants can discover and use.
---

# Exposing MCP Servers

WSO2 Integrator lets you expose your existing integrations, APIs, and databases as MCP (Model Context Protocol) servers. Once exposed, any MCP-compatible client — Claude Desktop, GitHub Copilot, custom agents — can discover your tools and call them.

This page covers how to annotate services, define tools, resources, and prompts, choose a transport, and handle requests in a production MCP server.

## Creating an MCP Server

### Minimal Server

The simplest MCP server registers one or more tools and starts listening for connections.

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

By default, the server uses `stdio` transport, making it compatible with local MCP clients like Claude Desktop.

### Server with SSE Transport

For remote clients or web-based AI assistants, use the SSE (Server-Sent Events) transport.

```ballerina
import ballerinax/mcp;

@mcp:ServiceConfig {
    name: "inventory-service",
    version: "1.0.0"
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

### Server with Streamable HTTP Transport

The Streamable HTTP transport is a newer option that uses standard HTTP with streaming support.

```ballerina
@mcp:ServiceConfig {
    name: "analytics-service",
    version: "1.0.0"
}
service on new mcp:Listener(new mcp:StreamableHttpTransport(8090)) {
}
```

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

For tools that modify data, include clear descriptions about side effects.

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

Prompts are reusable prompt templates that AI assistants can use for common tasks.

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

## Handling Errors

Return informative error messages so AI assistants can reason about failures and suggest alternatives to the user.

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

To use your MCP server with Claude Desktop, add it to the Claude Desktop configuration file.

### stdio Transport

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

- [Consuming MCP Tools](consuming-mcp-tools.md) -- Use external MCP tools in your agents
- [MCP Security](mcp-security.md) -- Secure your MCP endpoints with authentication
- [MCP Overview](overview.md) -- Understand the protocol and transport options
- [MCP Server for Enterprise Data](/docs/genai/tutorials/mcp-enterprise-data) -- End-to-end tutorial
