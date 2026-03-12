---
sidebar_position: 2
title: Adding Tools to an Agent
description: Define and register tools that let AI agents call your integration functions, APIs, and databases.
---

# Adding Tools to an Agent

Tools are Ballerina functions that an AI agent can call during its reasoning loop. They connect your agent to the real world -- APIs, databases, services, and business rules. The LLM sees the tool's name, description, and parameter schema, then decides whether and how to call it.

## Defining Tools

Tools are Ballerina functions annotated with `@agent:Tool`.

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
    return check ticketingApi->post("/tickets", {customerId, subject, description, priority});
}
```

### Connector-Based Tools

Wrap existing WSO2 Integrator connectors as agent tools.

```ballerina
import ballerinax/salesforce;

@agent:Tool {
    name: "getSalesforceAccount",
    description: "Look up a Salesforce account by account ID or name."
}
isolated function getSalesforceAccount(
    @agent:Param {description: "Salesforce account ID or account name"} string identifier
) returns json|error {
    string soql = string `SELECT Id, Name, Industry, AnnualRevenue, Phone
                          FROM Account
                          WHERE Id = '${identifier}' OR Name = '${identifier}'
                          LIMIT 1`;
    return check sfClient->query(soql);
}
```

## Registering Tools with Agents

### Static Registration

```ballerina
final agent:ChatAgent myAgent = check new (
    model: llmClient,
    systemPrompt: "You are a customer support assistant.",
    tools: [getCustomerDetails, searchOrders, createSupportTicket, checkInventory]
);
```

### Grouped Registration

```ballerina
agent:Tool[] readTools = [getCustomerDetails, searchOrders, checkInventory];
agent:Tool[] writeTools = [createSupportTicket, updateOrder, sendNotification];

// Full-access agent
final agent:ChatAgent fullAgent = check new (
    model: llmClient,
    systemPrompt: "You are a full-featured support assistant.",
    tools: [...readTools, ...writeTools]
);

// Read-only agent
final agent:ChatAgent readOnlyAgent = check new (
    model: llmClient,
    systemPrompt: "You can look up information but cannot make changes.",
    tools: readTools
);
```

## Tool Design Best Practices

1. **Clear descriptions** -- The description is the most important factor in whether the LLM uses the tool correctly
2. **Typed parameters** -- Use `@agent:Param` annotations to describe each parameter
3. **Informative errors** -- Return descriptive error messages so the LLM can reason about failures
4. **Limited output** -- Trim large responses to prevent exceeding context window limits

### Informative Error Example

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

### Confirmation-Required Tools

For sensitive actions, instruct the agent to confirm with the user before executing.

```ballerina
@agent:Tool {
    name: "cancelOrder",
    description: "Cancel a customer order. IMPORTANT: Always confirm with the customer before calling this tool. This action cannot be undone."
}
isolated function cancelOrder(string orderId, string reason) returns json|error {
    return check orderApi->post(string `/orders/${orderId}/cancel`, {reason});
}
```

## What's Next

- [Creating an AI Agent](/docs/genai/develop/agents/creating-agent) -- Build your first agent
- [Adding Memory](/docs/genai/develop/agents/adding-memory) -- Configure conversation history
- [Advanced Configuration](/docs/genai/develop/agents/advanced-config) -- Multi-agent orchestration
