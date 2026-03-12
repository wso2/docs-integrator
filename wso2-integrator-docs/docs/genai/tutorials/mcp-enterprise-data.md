---
sidebar_position: 4
title: "Tutorial: MCP Server for Enterprise Data"
description: Build an MCP server that exposes enterprise databases and APIs to AI assistants like Claude Desktop.
---

# Tutorial: MCP Server for Enterprise Data

**Time:** 25 minutes | **Level:** Intermediate | **What you'll build:** An MCP server that exposes customer records, product inventory, and sales analytics as tools that AI assistants can use.

In this tutorial, you build a Model Context Protocol (MCP) server that connects Claude Desktop, GitHub Copilot, or any MCP-compatible AI assistant to your enterprise data. Once configured, the AI assistant can search customers, check inventory, and pull sales reports through natural conversation.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- A database with sample enterprise data (MySQL or PostgreSQL)
- An MCP-compatible client (Claude Desktop, or your own agent)

## Architecture

```
┌────────────────────┐        ┌─────────────────────────────┐
│   MCP Client       │        │    MCP Server               │
│                    │        │    (WSO2 Integrator)         │
│  Claude Desktop    │◄──────►│                             │
│  GitHub Copilot    │  MCP   │  ┌─────────────────────┐    │
│  Custom Agent      │ Proto  │  │ search_customers    │    │
│                    │  col   │  │ check_inventory     │    │
│                    │        │  │ get_sales_report    │    │
│                    │        │  │ get_customer_orders │    │
└────────────────────┘        │  └──────────┬──────────┘    │
                              │             │               │
                              │     ┌───────┴───────┐       │
                              │     │   Enterprise  │       │
                              │     │   Database    │       │
                              │     └───────────────┘       │
                              └─────────────────────────────┘
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "enterprise_mcp_server"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "mcp"

[[dependency]]
org = "ballerinax"
name = "mysql"
```

```toml
# Config.toml
dbHost = "localhost"
dbPort = 3306
dbUser = "root"
dbPassword = "password"
dbName = "enterprise_db"
```

## Step 2: Set Up the Database Client

```ballerina
// db.bal
import ballerinax/mysql;

configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client db = check new ({
    host: dbHost, port: dbPort,
    user: dbUser, password: dbPassword,
    database: dbName
});
```

## Step 3: Define MCP Tools

```ballerina
// tools.bal
import ballerinax/mcp;

@mcp:Tool {
    name: "search_customers",
    description: "Search for customers by name, email, or company. Returns up to 10 matching customers with their account details."
}
isolated function searchCustomers(
    @mcp:Param {description: "Search query — can be a name, email address, or company name"} string query
) returns json|error {
    return check db->queryRows(
        `SELECT customer_id, name, email, company, tier, created_at
         FROM customers
         WHERE name LIKE ${"%" + query + "%"}
            OR email LIKE ${"%" + query + "%"}
            OR company LIKE ${"%" + query + "%"}
         LIMIT 10`
    );
}

@mcp:Tool {
    name: "check_inventory",
    description: "Check product inventory levels by product name or SKU. Returns current stock, warehouse location, and reorder status."
}
isolated function checkInventory(
    @mcp:Param {description: "Product name or SKU to search for"} string productQuery
) returns json|error {
    return check db->queryRows(
        `SELECT sku, name, category, quantity_on_hand, warehouse,
                reorder_point, quantity_on_hand <= reorder_point AS needs_reorder
         FROM inventory
         WHERE name LIKE ${"%" + productQuery + "%"} OR sku = ${productQuery}
         LIMIT 10`
    );
}

@mcp:Tool {
    name: "get_sales_report",
    description: "Get a sales summary for a date range. Returns daily totals including order count, revenue, and average order value. Dates must be in YYYY-MM-DD format."
}
isolated function getSalesReport(
    @mcp:Param {description: "Start date in YYYY-MM-DD format"} string startDate,
    @mcp:Param {description: "End date in YYYY-MM-DD format"} string endDate
) returns json|error {
    return check db->queryRows(
        `SELECT
            DATE(order_date) AS date,
            COUNT(*) AS order_count,
            ROUND(SUM(total), 2) AS revenue,
            ROUND(AVG(total), 2) AS avg_order_value
         FROM orders
         WHERE order_date BETWEEN ${startDate} AND ${endDate}
         GROUP BY DATE(order_date)
         ORDER BY date`
    );
}

@mcp:Tool {
    name: "get_customer_orders",
    description: "Retrieve recent orders for a specific customer. Returns up to 10 most recent orders with status and totals."
}
isolated function getCustomerOrders(
    @mcp:Param {description: "Customer ID"} string customerId
) returns json|error {
    return check db->queryRows(
        `SELECT order_id, order_date, status, total, item_count
         FROM orders
         WHERE customer_id = ${customerId}
         ORDER BY order_date DESC
         LIMIT 10`
    );
}

@mcp:Tool {
    name: "get_top_products",
    description: "Get the top-selling products for a given time period. Returns product name, units sold, and total revenue."
}
isolated function getTopProducts(
    @mcp:Param {description: "Number of days to look back (e.g., 30 for last month)"} int days,
    @mcp:Param {description: "Number of top products to return"} int 'limit = 10
) returns json|error {
    return check db->queryRows(
        `SELECT p.name, p.category,
                SUM(oi.quantity) AS units_sold,
                ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
         FROM order_items oi
         JOIN products p ON oi.product_id = p.product_id
         JOIN orders o ON oi.order_id = o.order_id
         WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
         GROUP BY p.product_id, p.name, p.category
         ORDER BY revenue DESC
         LIMIT ${'limit}`
    );
}
```

## Step 4: Create the MCP Server

### Option A: stdio Transport (for Claude Desktop)

```ballerina
// main.bal
import ballerinax/mcp;

@mcp:ServiceConfig {
    name: "enterprise-data",
    version: "1.0.0"
}
service on new mcp:Listener() {
    // Tools are automatically registered from the @mcp:Tool annotations
}
```

### Option B: SSE Transport (for remote clients)

```ballerina
// main.bal
import ballerinax/mcp;

@mcp:ServiceConfig {
    name: "enterprise-data",
    version: "1.0.0"
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

## Step 5: Configure Claude Desktop

### For stdio Transport

Add the following to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "enterprise-data": {
      "command": "bal",
      "args": ["run", "/path/to/enterprise_mcp_server"],
      "env": {
        "BAL_CONFIG_FILES": "/path/to/Config.toml"
      }
    }
  }
}
```

### For SSE Transport

```json
{
  "mcpServers": {
    "enterprise-data": {
      "url": "http://localhost:8090/sse"
    }
  }
}
```

## Step 6: Test

1. Build and run the server:
   ```bash
   bal run
   ```

2. If using Claude Desktop, restart Claude Desktop to pick up the new MCP server configuration.

3. In Claude Desktop, try these queries:
   - "Search for customers from Acme Corp"
   - "What's the inventory level for wireless headphones?"
   - "Show me the sales report for last week"
   - "What are the top 5 selling products this month?"

4. If using SSE transport, test with curl:
   ```bash
   # The SSE endpoint is available at http://localhost:8090/sse
   # Connect with an MCP client library
   ```

## Step 7: Add Security

Add API key authentication for production deployments.

```ballerina
@mcp:ServiceConfig {
    name: "enterprise-data",
    version: "1.0.0",
    auth: {
        apiKey: {
            headerName: "X-API-Key",
            validator: validateApiKey
        }
    }
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}

configurable string[] validApiKeys = ?;

isolated function validateApiKey(string apiKey) returns boolean|error {
    return validApiKeys.indexOf(apiKey) != ();
}
```

## What You Built

You now have an MCP server that:
- Exposes enterprise data through 5 tools with clear descriptions
- Works with Claude Desktop, GitHub Copilot, and custom MCP clients
- Supports both stdio (local) and SSE (remote) transports
- Limits query results to prevent context window overflow
- Can be secured with API key authentication

## What's Next

- [Exposing MCP Servers](/docs/genai/mcp/exposing-mcp-servers) -- Advanced MCP server patterns
- [MCP Security](/docs/genai/mcp/mcp-security) -- OAuth, mTLS, and authorization
- [Consuming MCP Tools](/docs/genai/mcp/consuming-mcp-tools) -- Use this server from your own agents
- [AI Customer Support Agent](ai-customer-support.md) -- Build an agent that uses MCP tools
