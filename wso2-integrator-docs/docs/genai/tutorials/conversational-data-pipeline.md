---
sidebar_position: 5
title: "Tutorial: Conversational Data Pipeline"
description: Build a natural language interface for querying and transforming data in a processing pipeline.
---

# Tutorial: Conversational Data Pipeline

**Time:** 35 minutes | **Level:** Intermediate | **What you'll build:** A chat interface that lets users query, filter, aggregate, and export data using natural language instead of writing SQL.

In this tutorial, you build a conversational interface over an analytics database. Users describe what they want in natural language, the agent translates it to SQL, executes the query safely, and returns formatted results. The agent also supports exporting results as CSV or JSON and can explain the generated queries.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key
- A database with sample analytics data (orders, customers, products)

## Architecture

```
                    ┌─────────────────────┐
User: "Show me     │    Data Agent       │
 top customers     │                     │
 by revenue" ─────►│  1. Understand      │
                   │  2. Generate SQL    │
                   │  3. Validate SQL    │
                   │  4. Execute         │
                   │  5. Format results  │
                   └──────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Analytics         │
                    │  Database          │
                    └────────────────────┘
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "conversational_pipeline"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "mysql"
```

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
dbHost = "localhost"
dbPort = 3306
dbUser = "root"
dbPassword = "password"
dbName = "analytics_db"
```

## Step 2: Define the Database Schema Description

Give the agent knowledge of the database structure so it can generate accurate SQL.

```ballerina
// schema.bal
final string databaseSchema = string `
Tables:
- customers (customer_id VARCHAR, name VARCHAR, email VARCHAR, company VARCHAR, tier VARCHAR, created_at DATE)
- orders (order_id VARCHAR, customer_id VARCHAR, order_date DATE, status VARCHAR, total DECIMAL, item_count INT)
- order_items (item_id VARCHAR, order_id VARCHAR, product_id VARCHAR, quantity INT, unit_price DECIMAL)
- products (product_id VARCHAR, name VARCHAR, category VARCHAR, price DECIMAL, description VARCHAR)

Relationships:
- orders.customer_id -> customers.customer_id
- order_items.order_id -> orders.order_id
- order_items.product_id -> products.product_id

Notes:
- order status values: 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
- customer tier values: 'free', 'basic', 'premium', 'enterprise'
- All monetary values are in USD
`;
```

## Step 3: Create the Agent Tools

```ballerina
// tools.bal
import ballerinax/ai.agent;
import ballerinax/mysql;
import ballerina/log;

configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

final mysql:Client analyticsDb = check new ({
    host: dbHost, port: dbPort,
    user: dbUser, password: dbPassword,
    database: dbName
});

@agent:Tool {
    name: "runQuery",
    description: "Execute a read-only SQL SELECT query against the analytics database. Only SELECT queries are allowed. The query must follow the database schema. Returns up to 50 rows. Use this to answer data questions from the user."
}
isolated function runQuery(
    @agent:Param {description: "SQL SELECT query to execute. Only SELECT statements are allowed."} string query
) returns json|error {
    // Validate: only SELECT queries
    string trimmed = query.trim().toLowerAscii();
    if !trimmed.startsWith("select") {
        return error("Only SELECT queries are allowed. Please rewrite as a SELECT statement.");
    }

    // Block dangerous keywords
    string[] blocked = ["insert", "update", "delete", "drop", "alter", "truncate", "create", "grant", "--", ";"];
    foreach string keyword in blocked {
        if trimmed.includes(keyword) && keyword != "create" {
            return error(string `Query contains a blocked keyword: '${keyword}'. Only read-only queries are allowed.`);
        }
    }

    // Execute with row limit
    string limitedQuery = query;
    if !trimmed.includes("limit") {
        limitedQuery = query + " LIMIT 50";
    }

    json[] rows = check analyticsDb->queryRows(limitedQuery);

    return {
        "rowCount": rows.length(),
        "data": rows,
        "query": limitedQuery,
        "truncated": rows.length() >= 50
    };
}

@agent:Tool {
    name: "getTableInfo",
    description: "Get the column names and types for a specific table. Use this when you need to verify column names before writing a query."
}
isolated function getTableInfo(
    @agent:Param {description: "Table name to describe"} string tableName
) returns json|error {
    // Validate table name to prevent injection
    string[] validTables = ["customers", "orders", "order_items", "products"];
    if validTables.indexOf(tableName) is () {
        return error(string `Unknown table: '${tableName}'. Valid tables: ${validTables.toString()}`);
    }

    return check analyticsDb->queryRows(
        `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = ${dbName} AND TABLE_NAME = ${tableName}
         ORDER BY ORDINAL_POSITION`
    );
}

@agent:Tool {
    name: "exportResults",
    description: "Export query results as a formatted string in CSV or JSON format. Use this when the user asks to export or download data."
}
isolated function exportResults(
    @agent:Param {description: "SQL SELECT query to export"} string query,
    @agent:Param {description: "Export format: 'csv' or 'json'"} string format = "csv"
) returns json|error {
    // Same validation as runQuery
    string trimmed = query.trim().toLowerAscii();
    if !trimmed.startsWith("select") {
        return error("Only SELECT queries can be exported.");
    }

    json[] rows = check analyticsDb->queryRows(query + " LIMIT 500");

    if format == "csv" {
        string csv = convertToCSV(rows);
        return {
            "format": "csv",
            "rowCount": rows.length(),
            "content": csv
        };
    }

    return {
        "format": "json",
        "rowCount": rows.length(),
        "content": rows
    };
}

function convertToCSV(json[] rows) returns string {
    if rows.length() == 0 {
        return "";
    }

    // Extract headers from first row
    map<json> firstRow = <map<json>>rows[0];
    string[] headers = firstRow.keys();
    string csv = string:'join(",", ...headers) + "\n";

    // Add data rows
    foreach json row in rows {
        map<json> rowMap = <map<json>>row;
        string[] values = from string header in headers
            select (rowMap[header] ?: "").toString();
        csv += string:'join(",", ...values) + "\n";
    }

    return csv;
}
```

## Step 4: Create the Data Agent

```ballerina
// agent.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;

configurable string openaiKey = ?;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o",
    temperature: 0.1  // Low temperature for consistent SQL generation
});

final agent:ChatAgent dataAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a data analysis assistant. Help users explore and understand their business data through natural language.

Database Schema:
${databaseSchema}

How to Respond:
1. When users ask a data question, use the runQuery tool with a SQL SELECT query.
2. Present results in a clear, readable format (tables, bullet points, or summaries).
3. If you are unsure about column names, use getTableInfo first.
4. When users ask to export, use the exportResults tool.
5. Explain the SQL query you generated if the user asks.

Rules:
- Generate only SELECT queries. Never attempt to modify data.
- Add reasonable LIMIT clauses to prevent large result sets.
- Use proper JOINs when querying across tables.
- Round monetary values to 2 decimal places.
- When asked about "last month" or "this week," use relative date functions.
- If a query fails, explain the error and suggest a corrected query.`,
    tools: [runQuery, getTableInfo, exportResults],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20)
);
```

## Step 5: Build the HTTP Service

```ballerina
// service.bal
import ballerina/http;
import ballerina/uuid;

type ChatRequest record {|
    string message;
    string? sessionId;
|};

type ChatResponse record {|
    string message;
    string sessionId;
|};

service /data on new http:Listener(8090) {

    resource function post chat(@http:Payload ChatRequest request) returns ChatResponse|error {
        string sessionId = request.sessionId ?: uuid:createType1().toString();
        string response = check dataAgent.chat(request.message, sessionId);
        return {message: response, sessionId};
    }
}
```

## Step 6: Run and Test

1. Start the service:
   ```bash
   bal run
   ```

2. Try natural language data queries:
   ```bash
   # Simple aggregation
   curl -X POST http://localhost:8090/data/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "How many orders did we receive last month?"}'

   # Top-N analysis
   curl -X POST http://localhost:8090/data/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Show me the top 5 customers by total revenue", "sessionId": "<session-id>"}'

   # Filtering and conditions
   curl -X POST http://localhost:8090/data/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Which products in the electronics category have less than 10 units in stock?", "sessionId": "<session-id>"}'

   # Cross-table analysis
   curl -X POST http://localhost:8090/data/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What is the average order value by customer tier?", "sessionId": "<session-id>"}'

   # Export
   curl -X POST http://localhost:8090/data/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Export all orders from this month as CSV", "sessionId": "<session-id>"}'

   # Explain the query
   curl -X POST http://localhost:8090/data/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Can you explain the SQL query you used for the last question?", "sessionId": "<session-id>"}'
   ```

## Step 7: Add Guardrails

Protect against SQL injection and excessive queries.

```ballerina
import ballerinax/ai.guardrails;

// Rate limit to prevent excessive database queries
final guardrails:SpendingLimit queryLimit = new ({
    maxRequestsPerUser: 50,
    resetInterval: "hourly",
    onExceed: "reject",
    rejectMessage: "You have reached the hourly query limit. Please try again later."
});

final agent:ChatAgent guardedDataAgent = check new (
    model: llmClient,
    systemPrompt: dataAgentSystemPrompt,
    tools: [runQuery, getTableInfo, exportResults],
    memory: new agent:MessageWindowChatMemory(maxMessages: 20),
    inputGuardrails: [queryLimit]
);
```

## What You Built

You now have a conversational data pipeline that:
- Translates natural language questions into SQL queries
- Validates queries to prevent data modification
- Limits result sizes to prevent context overflow
- Supports CSV and JSON export
- Maintains conversation context for follow-up questions
- Protects against SQL injection through validation

## What's Next

- [Prompt Engineering](/docs/genai/llm-connectivity/prompt-engineering) -- Improve query generation accuracy
- [Input/Output Guardrails](/docs/genai/guardrails/input-output-guardrails) -- Advanced input validation
- [Token & Cost Management](/docs/genai/guardrails/token-cost-management) -- Control LLM costs
- [Streaming Responses](/docs/genai/llm-connectivity/streaming-responses) -- Stream results in real time
