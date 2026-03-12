---
sidebar_position: 5
title: Tool Binding
description: Connect AI agents to integration functions, APIs, and databases through tool binding and function calling.
---

# Tool Binding

Tool binding connects your AI agent to the real world. By defining tools, you give the LLM the ability to call your integration functions, query databases, invoke APIs, and perform actions based on its reasoning.

Tools are the mechanism that transforms an LLM from a text generator into an integration-capable agent that can look up data, trigger workflows, and interact with enterprise systems.

## Defining Tools

Tools are Ballerina functions annotated with `@agent:Tool`. The annotation provides metadata that the LLM uses to decide when and how to call the tool.

### Basic Tool Definition

```ballerina
import ballerinax/ai.agent;

@agent:Tool {
    name: "getCustomerDetails",
    description: "Retrieve customer details including name, email, account status, and subscription tier by customer ID."
}
isolated function getCustomerDetails(string customerId) returns json|error {
    return check crmClient->get(string `/customers/${customerId}`);
}
```

### Parameter Descriptions

Add descriptions to parameters so the LLM understands what values to provide.

```ballerina
@agent:Tool {
    name: "searchOrders",
    description: "Search for customer orders by various criteria. Returns a list of matching orders with status and totals."
}
isolated function searchOrders(
    @agent:Param {description: "Customer ID to search orders for"} string customerId,
    @agent:Param {description: "Order status filter: 'pending', 'shipped', 'delivered', or 'all'"} string status = "all",
    @agent:Param {description: "Maximum number of results to return (1-50)"} int 'limit = 10
) returns json|error {
    map<string> params = {"customerId": customerId, "status": status, "limit": 'limit.toString()};
    return check orderApi->get("/orders", params);
}
```

### Typed Return Values

Tools can return typed records for structured, predictable output.

```ballerina
type InventoryResult record {|
    string productId;
    string productName;
    int quantityAvailable;
    string warehouseLocation;
    boolean lowStockAlert;
|};

@agent:Tool {
    name: "checkInventory",
    description: "Check current inventory levels for a product across all warehouses."
}
isolated function checkInventory(string productId) returns InventoryResult|error {
    return check inventoryDb->queryRow(
        `SELECT product_id, product_name, quantity_available,
                warehouse_location, quantity_available < 10 AS low_stock_alert
         FROM inventory WHERE product_id = ${productId}`
    );
}
```

## Tool Categories

### Data Retrieval Tools

Read-only tools that fetch information from external systems.

```ballerina
@agent:Tool {
    name: "getWeather",
    description: "Get current weather conditions for a city. Returns temperature, humidity, and conditions."
}
isolated function getWeather(
    @agent:Param {description: "City name, e.g., 'San Francisco, CA'"} string city
) returns json|error {
    return check weatherApi->get(string `/current?q=${city}`);
}

@agent:Tool {
    name: "queryDatabase",
    description: "Run a read-only SQL query against the analytics database. Only SELECT queries are allowed."
}
isolated function queryDatabase(
    @agent:Param {description: "SQL SELECT query to execute"} string query
) returns json|error {
    if !query.toLowerAscii().startsWith("select") {
        return error("Only SELECT queries are allowed");
    }
    return check analyticsDb->queryRows(query);
}
```

### Action Tools

Tools that perform write operations or trigger workflows.

```ballerina
@agent:Tool {
    name: "createSupportTicket",
    description: "Create a new support ticket in the ticketing system. Returns the new ticket ID."
}
isolated function createSupportTicket(
    @agent:Param {description: "Customer ID who owns the ticket"} string customerId,
    @agent:Param {description: "Brief subject line for the ticket"} string subject,
    @agent:Param {description: "Detailed description of the issue"} string description,
    @agent:Param {description: "Priority: 'low', 'medium', 'high', or 'critical'"} string priority = "medium"
) returns json|error {
    return check ticketingApi->post("/tickets", {
        customerId, subject, description, priority
    });
}

@agent:Tool {
    name: "sendNotification",
    description: "Send an email notification to a customer. Use only when the customer explicitly requests it."
}
isolated function sendNotification(
    @agent:Param {description: "Customer email address"} string email,
    @agent:Param {description: "Email subject line"} string subject,
    @agent:Param {description: "Email body content"} string body
) returns json|error {
    return check emailService->sendEmail(email, subject, body);
}
```

### Connector-Based Tools

Wrap existing WSO2 Integrator connectors as agent tools.

```ballerina
import ballerinax/salesforce;

final salesforce:Client sfClient = check new ({
    baseUrl: sfBaseUrl,
    auth: {token: sfAccessToken}
});

@agent:Tool {
    name: "getSalesforceAccount",
    description: "Look up a Salesforce account by account ID or name. Returns account details including industry, revenue, and contacts."
}
isolated function getSalesforceAccount(
    @agent:Param {description: "Salesforce account ID (e.g., '001xx000003DIloAAG') or account name"} string identifier
) returns json|error {
    string soql = string `SELECT Id, Name, Industry, AnnualRevenue, Phone
                          FROM Account
                          WHERE Id = '${identifier}' OR Name = '${identifier}'
                          LIMIT 1`;
    return check sfClient->query(soql);
}
```

## Registering Tools with Agents

### Static Tool Registration

Define tools at agent creation time.

```ballerina
final agent:ChatAgent myAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [
        getCustomerDetails,
        searchOrders,
        createSupportTicket,
        checkInventory
    ]
);
```

### Grouped Tool Registration

Organize tools into logical groups for clarity.

```ballerina
// Define tool groups
agent:Tool[] readTools = [getCustomerDetails, searchOrders, checkInventory];
agent:Tool[] writeTools = [createSupportTicket, updateOrder, sendNotification];
agent:Tool[] analyticsTools = [queryDatabase, generateReport];

// Register all groups with the agent
final agent:ChatAgent fullAgent = check new (
    model: llmClient,
    systemPrompt: "You are a full-featured support assistant.",
    tools: [...readTools, ...writeTools, ...analyticsTools]
);

// Or create a read-only agent
final agent:ChatAgent readOnlyAgent = check new (
    model: llmClient,
    systemPrompt: "You can look up information but cannot make changes.",
    tools: readTools
);
```

## Tool Design Best Practices

### Write Clear Descriptions

The tool description is the most important factor in whether the LLM uses the tool correctly.

```ballerina
// Poor: vague, no guidance on when to use
@agent:Tool {
    name: "getData",
    description: "Gets data"
}

// Good: specific, explains inputs, outputs, and when to use
@agent:Tool {
    name: "getOrderStatus",
    description: "Look up the current status of a customer order by order ID (format: ORD-XXXXX). Returns status (pending/shipped/delivered), estimated delivery date, and tracking number if available. Use this when customers ask about their order."
}
```

### Return Informative Errors

Help the LLM recover gracefully by returning descriptive error information.

```ballerina
@agent:Tool {
    name: "getCustomer",
    description: "Look up customer by ID. If not found, suggests alternative search methods."
}
isolated function getCustomer(string customerId) returns json|error {
    json|error result = crmClient->get(string `/customers/${customerId}`);
    if result is error {
        return {
            "found": false,
            "message": string `No customer found with ID '${customerId}'.`,
            "suggestion": "Try using the searchCustomerByEmail tool to search by email address instead."
        };
    }
    return result;
}
```

### Limit Tool Output Size

Trim large responses to prevent exceeding context window limits.

```ballerina
@agent:Tool {
    name: "searchProducts",
    description: "Search the product catalog. Returns up to 5 matching products."
}
isolated function searchProducts(string query) returns json|error {
    json[] allResults = check catalogApi->search(query);
    // Limit to 5 results to avoid context window overflow
    json[] trimmed = allResults.length() > 5 ? allResults.slice(0, 5) : allResults;
    return {
        "results": trimmed,
        "totalCount": allResults.length(),
        "showing": trimmed.length()
    };
}
```

## Advanced: Confirmation-Required Tools

For tools that perform sensitive actions, require the agent to confirm with the user before executing.

```ballerina
@agent:Tool {
    name: "cancelOrder",
    description: "Cancel a customer order. IMPORTANT: Always confirm with the customer before calling this tool. This action cannot be undone."
}
isolated function cancelOrder(
    @agent:Param {description: "Order ID to cancel"} string orderId,
    @agent:Param {description: "Cancellation reason"} string reason
) returns json|error {
    return check orderApi->post(string `/orders/${orderId}/cancel`, {reason});
}
```

The agent will naturally ask for confirmation because the description instructs it to do so.

## What's Next

- [Natural Functions](natural-functions.md) — Use LLMs as typed function calls
- [Multi-Agent Orchestration](multi-agent-orchestration.md) — Agents that call other agents
- [Agent Architecture & Concepts](architecture-concepts.md) — Understand the agent reasoning loop
- [Input/Output Guardrails](/docs/genai/guardrails/input-output-guardrails) — Validate tool inputs and outputs
