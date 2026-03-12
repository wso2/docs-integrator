---
sidebar_position: 2
title: "Building a Customer Care Agent with MCP"
description: Build a customer care agent that uses MCP servers to access CRM and order management data in real time.
---

# Building a Customer Care Agent with MCP

**Time:** 45 minutes | **Level:** Intermediate | **What you'll build:** A customer care agent that connects to CRM and order management systems through MCP (Model Context Protocol) servers, enabling natural language access to customer and order data.

In this tutorial, you build a customer care agent that uses MCP to bridge the gap between an LLM and your enterprise systems. Instead of writing custom tool functions for each data source, you create MCP servers that expose your CRM and order management APIs as standardized tools. The agent then connects to these MCP servers and uses them to answer customer inquiries, check order statuses, and manage support cases.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key (or another supported LLM provider)
- Familiarity with the [MCP overview](/docs/genai/mcp/overview)

## Architecture

```
                          ┌──────────────────┐
                          │  Customer Care   │
                          │     Agent        │
Customer ────────────────►│                  │
                          │  LLM (GPT-4o)   │
                          │  + MCP Client   │
                          └────────┬─────────┘
                                   │ MCP Protocol
                      ┌────────────┼────────────┐
                      ▼                         ▼
              ┌──────────────┐          ┌──────────────┐
              │  Order MCP   │          │  CRM MCP     │
              │   Server     │          │   Server     │
              │              │          │              │
              │ - getOrder   │          │ - getCustomer│
              │ - listOrders │          │ - updateCase │
              │ - trackShip  │          │ - createCase │
              └──────┬───────┘          └──────┬───────┘
                     ▼                         ▼
              ┌──────────┐              ┌──────────┐
              │  Order   │              │   CRM    │
              │ Database │              │ Database │
              └──────────┘              └──────────┘
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "customer_care_mcp"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "mcp"

[[dependency]]
org = "ballerinax"
name = "mysql"
```

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
orderDbHost = "localhost"
orderDbPort = 3306
orderDbUser = "root"
orderDbPassword = "password"
orderDbName = "orders_db"
crmDbHost = "localhost"
crmDbPort = 3306
crmDbUser = "root"
crmDbPassword = "password"
crmDbName = "crm_db"
```

## Step 2: Define Data Types

```ballerina
// types.bal
type Customer record {|
    string customerId;
    string name;
    string email;
    string phone;
    string tier;           // "standard", "premium", "enterprise"
    string accountStatus;  // "active", "suspended", "closed"
|};

type Order record {|
    string orderId;
    string customerId;
    string status;
    string orderDate;
    decimal total;
    string? trackingNumber;
    string? estimatedDelivery;
    OrderItem[] items;
|};

type OrderItem record {|
    string productId;
    string productName;
    int quantity;
    decimal unitPrice;
|};

type SupportCase record {|
    string caseId;
    string customerId;
    string subject;
    string description;
    string priority;       // "low", "medium", "high", "critical"
    string status;         // "open", "in_progress", "resolved", "closed"
    string? assignedTo;
    string createdAt;
|};

type ShipmentTracking record {|
    string trackingNumber;
    string carrier;
    string status;
    string lastLocation;
    string? estimatedDelivery;
    TrackingEvent[] events;
|};

type TrackingEvent record {|
    string timestamp;
    string location;
    string description;
|};
```

## Step 3: Create the Order MCP Server

The order MCP server exposes order management capabilities as MCP tools.

```ballerina
// order_mcp_server.bal
import ballerinax/mcp;
import ballerinax/mysql;
import ballerina/http;

configurable string orderDbHost = ?;
configurable int orderDbPort = ?;
configurable string orderDbUser = ?;
configurable string orderDbPassword = ?;
configurable string orderDbName = ?;

final mysql:Client orderDb = check new ({
    host: orderDbHost, port: orderDbPort,
    user: orderDbUser, password: orderDbPassword,
    database: orderDbName
});

final http:Client shippingApi = check new ("https://api.shipping-provider.com");

@mcp:Server {
    name: "order-management",
    version: "1.0.0"
}
service on new mcp:Listener(3001) {

    @mcp:Tool {
        description: "Retrieve order details by order ID. Returns order status, items, total, and tracking information."
    }
    remote function getOrder(string orderId) returns Order|error {
        Order? order = check orderDb->queryRow(
            `SELECT * FROM orders WHERE order_id = ${orderId}`
        );
        if order is () {
            return error(string `Order '${orderId}' not found`);
        }
        OrderItem[] items = check from OrderItem item in orderDb->query(
            `SELECT * FROM order_items WHERE order_id = ${orderId}`
        ) select item;
        order.items = items;
        return order;
    }

    @mcp:Tool {
        description: "List all orders for a customer, sorted by most recent first. Optionally filter by status."
    }
    remote function listOrders(string customerId, string? status = ()) returns Order[]|error {
        if status is string {
            return check from Order order in orderDb->query(
                `SELECT * FROM orders WHERE customer_id = ${customerId} AND status = ${status}
                 ORDER BY order_date DESC LIMIT 10`
            ) select order;
        }
        return check from Order order in orderDb->query(
            `SELECT * FROM orders WHERE customer_id = ${customerId}
             ORDER BY order_date DESC LIMIT 10`
        ) select order;
    }

    @mcp:Tool {
        description: "Track a shipment using the tracking number. Returns carrier, current status, location history, and estimated delivery."
    }
    remote function trackShipment(string trackingNumber) returns ShipmentTracking|error {
        return check shippingApi->get(string `/track/${trackingNumber}`);
    }

    @mcp:Tool {
        description: "Cancel an order if it has not yet been shipped. Returns success or failure with reason."
    }
    remote function cancelOrder(string orderId, string reason) returns json|error {
        Order order = check self.getOrder(orderId);
        if order.status == "shipped" || order.status == "delivered" {
            return {
                "success": false,
                "message": string `Cannot cancel order '${orderId}' because it has already been ${order.status}.`
            };
        }
        _ = check orderDb->execute(
            `UPDATE orders SET status = 'cancelled', cancel_reason = ${reason} WHERE order_id = ${orderId}`
        );
        return {"success": true, "message": string `Order '${orderId}' has been cancelled.`};
    }
}
```

## Step 4: Create the CRM MCP Server

The CRM MCP server exposes customer relationship management capabilities.

```ballerina
// crm_mcp_server.bal
import ballerinax/mcp;
import ballerinax/mysql;
import ballerina/uuid;
import ballerina/time;

configurable string crmDbHost = ?;
configurable int crmDbPort = ?;
configurable string crmDbUser = ?;
configurable string crmDbPassword = ?;
configurable string crmDbName = ?;

final mysql:Client crmDb = check new ({
    host: crmDbHost, port: crmDbPort,
    user: crmDbUser, password: crmDbPassword,
    database: crmDbName
});

@mcp:Server {
    name: "crm",
    version: "1.0.0"
}
service on new mcp:Listener(3002) {

    @mcp:Tool {
        description: "Look up customer details by customer ID, email, or phone number. Returns profile, account tier, and status."
    }
    remote function getCustomer(string query) returns Customer|error {
        Customer? customer = check crmDb->queryRow(
            `SELECT * FROM customers
             WHERE customer_id = ${query} OR email = ${query} OR phone = ${query}`
        );
        if customer is () {
            return error(string `No customer found for '${query}'`);
        }
        return customer;
    }

    @mcp:Tool {
        description: "Retrieve all support cases for a customer, optionally filtered by status. Returns case history sorted by most recent."
    }
    remote function listCases(string customerId, string? status = ()) returns SupportCase[]|error {
        if status is string {
            return check from SupportCase c in crmDb->query(
                `SELECT * FROM support_cases
                 WHERE customer_id = ${customerId} AND status = ${status}
                 ORDER BY created_at DESC LIMIT 10`
            ) select c;
        }
        return check from SupportCase c in crmDb->query(
            `SELECT * FROM support_cases
             WHERE customer_id = ${customerId}
             ORDER BY created_at DESC LIMIT 10`
        ) select c;
    }

    @mcp:Tool {
        description: "Create a new support case for a customer. Returns the new case ID. Use this when an issue needs to be tracked or escalated."
    }
    remote function createCase(
        string customerId,
        string subject,
        string description,
        string priority = "medium"
    ) returns json|error {
        string caseId = string `CASE-${uuid:createType1().toString().substring(0, 8)}`;
        string now = time:utcToString(time:utcNow());

        _ = check crmDb->execute(
            `INSERT INTO support_cases (case_id, customer_id, subject, description, priority, status, created_at)
             VALUES (${caseId}, ${customerId}, ${subject}, ${description}, ${priority}, 'open', ${now})`
        );
        return {"caseId": caseId, "status": "open", "message": "Support case created successfully."};
    }

    @mcp:Tool {
        description: "Update the status or details of an existing support case."
    }
    remote function updateCase(
        string caseId,
        string? status = (),
        string? note = (),
        string? assignedTo = ()
    ) returns json|error {
        if status is string {
            _ = check crmDb->execute(
                `UPDATE support_cases SET status = ${status} WHERE case_id = ${caseId}`
            );
        }
        if assignedTo is string {
            _ = check crmDb->execute(
                `UPDATE support_cases SET assigned_to = ${assignedTo} WHERE case_id = ${caseId}`
            );
        }
        if note is string {
            _ = check crmDb->execute(
                `INSERT INTO case_notes (case_id, note, created_at)
                 VALUES (${caseId}, ${note}, ${time:utcToString(time:utcNow())})`
            );
        }
        return {"caseId": caseId, "message": "Case updated successfully."};
    }
}
```

## Step 5: Build the Agent with MCP Clients

Now build the agent that connects to both MCP servers and uses their tools to serve customers.

```ballerina
// agent.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;
import ballerinax/mcp;

configurable string openaiKey = ?;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});

// Connect to the MCP servers
final mcp:Client orderMcpClient = check new ({
    serverUrl: "http://localhost:3001"
});

final mcp:Client crmMcpClient = check new ({
    serverUrl: "http://localhost:3002"
});

// Retrieve tools from both MCP servers
final agent:McpTools orderTools = check new (orderMcpClient);
final agent:McpTools crmTools = check new (crmMcpClient);

final agent:ChatAgent customerCareAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a Customer Care Agent for Acme Commerce.

Role:
- Help customers with order inquiries, shipment tracking, account questions, and issue resolution.
- Provide professional, empathetic, and efficient support.

Available Capabilities (via MCP):
- Order Management: Look up orders, track shipments, list order history, cancel orders.
- CRM: Look up customer profiles, view and create support cases, update case statuses.

Guidelines:
- Always verify the customer's identity before sharing account details.
- Use order tools to check order status — never guess or assume.
- Create a support case for any issue that cannot be resolved immediately.
- For premium and enterprise customers, acknowledge their tier and provide priority service.
- Escalate critical issues (data breach, fraud) by creating a high-priority case.
- Keep responses concise but thorough. Always include relevant IDs (order, case, tracking).
- If you cannot resolve an issue, clearly explain the next steps and expected timeline.`,
    tools: [...check orderTools.getTools(), ...check crmTools.getTools()],
    memory: new agent:MessageWindowChatMemory(maxMessages: 30)
);
```

## Step 6: Expose as an HTTP Chat Service

```ballerina
// service.bal
import ballerina/http;
import ballerina/uuid;

type ChatRequest record {|
    string message;
    string? sessionId;
    string? customerId;
|};

type ChatResponse record {|
    string message;
    string sessionId;
|};

service /care on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string sessionId = request.sessionId ?: uuid:createType1().toString();

        string message = request.message;
        if request.customerId is string {
            message = string `[Customer ID: ${<string>request.customerId}] ${message}`;
        }

        string response = check customerCareAgent.chat(message, sessionId);
        return {message: response, sessionId};
    }
}
```

## Step 7: Run and Test

1. Start the MCP servers and the agent service:
   ```bash
   # Terminal 1: Start the order MCP server
   bal run order_mcp_server.bal

   # Terminal 2: Start the CRM MCP server
   bal run crm_mcp_server.bal

   # Terminal 3: Start the agent service
   bal run service.bal
   ```

2. Test with curl:
   ```bash
   # Look up an order
   curl -X POST http://localhost:8090/care/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What is the status of order ORD-98765?", "customerId": "CUST-001"}'

   # Track a shipment (use sessionId from previous response)
   curl -X POST http://localhost:8090/care/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Can you track my shipment? The tracking number is TRK-123456.", "sessionId": "<session-id>"}'

   # Report an issue and create a support case
   curl -X POST http://localhost:8090/care/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I received the wrong item in my order ORD-98765. I ordered a blue jacket but received a red one.", "sessionId": "<session-id>", "customerId": "CUST-001"}'

   # Cancel an order
   curl -X POST http://localhost:8090/care/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I want to cancel order ORD-11111 because I found a better price elsewhere.", "sessionId": "<session-id>", "customerId": "CUST-001"}'
   ```

## What You Built

You now have a customer care agent that:
- Connects to order management and CRM systems through MCP servers
- Looks up orders, tracks shipments, and manages order cancellations
- Retrieves customer profiles and manages support cases
- Maintains conversation context across multiple interactions
- Uses standardized MCP protocol for clean separation between the agent and backend systems

## What's Next

- [MCP Overview](/docs/genai/mcp/overview) -- Learn more about the Model Context Protocol
- [Exposing MCP Servers](/docs/genai/mcp/exposing-mcp-servers) -- Build more MCP servers for other systems
- [MCP Security](/docs/genai/mcp/mcp-security) -- Secure your MCP server connections
- [Agent Tracing](/docs/genai/agent-observability/agent-tracing) -- Add observability to your agent
