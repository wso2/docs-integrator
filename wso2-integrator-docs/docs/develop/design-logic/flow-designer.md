---
sidebar_position: 1
title: Visual Flow Designer
description: Build integration logic visually with the drag-and-drop flow designer in VS Code.
---

# Visual Flow Designer

The visual flow designer lets you build integration logic by composing nodes on a canvas rather than writing code. Each node represents a step in your integration -- calling an API, transforming data, making a decision, or handling an error. The designer generates valid Ballerina code, and changes sync bidirectionally between the visual and code views.

## Design View Components

The design view consists of three main areas:

| Component | Location | Purpose |
|---|---|---|
| **Project Explorer** | Left sidebar | Browse Entry Points (HTTP services, events), Listeners, Connections, Types, Functions, Data Mappers, Configurations, and Local Connectors |
| **Canvas** | Central panel | Visual representation of the integration flow with interactive nodes |
| **Toolbar** | Top | AI-assisted generation and artifact insertion |

### Two Logic View Modes

1. **Flow Diagram Mode** -- High-level graphical layout showing the vertical execution path with service calls, conditionals, and error handlers. Hover over nodes to access AI assistance, comments, and artifact insertion. Click the three dots on a node for edit, delete, breakpoint, and source view actions.

2. **Sequence Mode** -- Displays the invocation flow between services, clients, and functions as structured sequence diagrams. Useful for understanding how your integration communicates with external systems.

Switch between views using the toggle at the top of the canvas. Switch to source code view with the **&lt;/&gt;** icon for direct Ballerina code editing. The design view and source code view stay synchronized in real time.

## Opening the Flow Designer

The flow designer activates automatically when you open a `.bal` file that contains a service or function definition:

1. Open any `.bal` file in your integration project.
2. The visual flow appears in the editor alongside the code view.
3. Use the toggle in the editor toolbar to switch between **Visual**, **Code**, and **Split** modes.

## Node Types

The flow designer provides the following node categories:

### Trigger Nodes

Trigger nodes define how your integration is activated. They appear at the top of the flow.

| Node | Description |
|---|---|
| **HTTP Trigger** | Incoming HTTP request (GET, POST, PUT, DELETE) |
| **Event Trigger** | Message from Kafka, RabbitMQ, MQTT, etc. |
| **Schedule Trigger** | Cron-based or interval-based trigger |
| **File Trigger** | File arrival on FTP/SFTP/local directory |

### Action Nodes

Action nodes perform operations on data or call external systems.

| Node | Description |
|---|---|
| **Call Endpoint** | Make an HTTP/gRPC/GraphQL call to an external service |
| **Database Query** | Execute a SQL query against a database connection |
| **Send Message** | Publish a message to Kafka, RabbitMQ, MQTT, etc. |
| **Send Email** | Send an email via SMTP |
| **Log** | Write a log message |
| **Assign** | Set a variable value |
| **Transform** | Open the data mapper for complex transformations |

### Control Nodes

Control nodes manage the execution flow.

| Node | Description |
|---|---|
| **If/Else** | Conditional branching |
| **Match** | Pattern matching (like switch/case) |
| **Foreach** | Iterate over a collection |
| **While** | Loop with a condition |
| **Parallel** | Execute branches concurrently |

### Error Handling Nodes

| Node | Description |
|---|---|
| **Try/Catch** | Wrap nodes in error handling |
| **Retry** | Retry a block on failure |
| **Respond Error** | Return an error response |

## Building a Flow

### Step 1: Add a Trigger

Every flow starts with a trigger. Drag a trigger node from the palette onto the canvas, or click the **+** button on an existing trigger to modify it.

<!-- TODO: Screenshot of dragging an HTTP trigger onto the canvas -->

### Step 2: Add Action Nodes

Click the **+** button below the trigger to add action nodes. The palette shows context-aware suggestions based on your project's connections and types.

```
[HTTP POST /orders]
        │
        ▼
[Validate Request]
        │
        ▼
[Call CRM API]
        │
        ▼
[Insert to Database]
        │
        ▼
[Return Response]
```

### Step 3: Configure Each Node

Click on a node to open its configuration panel. For example, configuring a **Call Endpoint** node:

- **Connection**: Select from your configured connections
- **Method**: GET, POST, PUT, DELETE
- **Path**: The endpoint path (supports expressions)
- **Headers**: Key-value pairs
- **Body**: Select a variable or type an expression
- **Response Variable**: Name for the response variable

<!-- TODO: Screenshot of the node configuration panel -->

### Step 4: Add Control Flow

Insert branching and looping nodes to handle different scenarios:

```
[HTTP POST /orders]
        │
        ▼
[Validate Request]
        │
    ┌───┴───┐
    │ Valid? │
    └───┬───┘
   Yes  │  No
    │       │
    ▼       ▼
[Process] [Return 400]
    │
    ▼
[Return 201]
```

### Step 5: Add Error Handling

Wrap nodes in a Try/Catch block by selecting them and clicking **Wrap in Try/Catch** from the context menu.

## Generated Code

The flow designer generates clean, readable Ballerina code. For example, the order processing flow above generates:

```ballerina
resource function post orders(OrderRequest req)
        returns OrderResponse|http:BadRequest|error {
    // Validate Request
    string[] errors = validateOrderRequest(req);
    if errors.length() > 0 {
        return <http:BadRequest>{body: {errors: errors}};
    }

    // Call CRM API
    json crmResponse = check crmClient->post("/customers/" + req.customerId, {});

    // Insert to Database
    sql:ExecutionResult result = check orderDb->execute(
        `INSERT INTO orders (customer_id, total) VALUES (${req.customerId}, ${req.total})`
    );

    // Return Response
    return {
        orderId: result.lastInsertId.toString(),
        status: "CREATED"
    };
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Shift+V` / `Cmd+Shift+V` | Toggle visual/code view |
| `Delete` / `Backspace` | Delete selected node |
| `Ctrl+Z` / `Cmd+Z` | Undo |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo |
| `Ctrl+D` / `Cmd+D` | Duplicate selected node |
| `Ctrl+G` / `Cmd+G` | Group selected nodes |

## Bidirectional Sync

Changes in the visual designer immediately update the code, and vice versa. This bidirectional sync means:

- Edit code and see the flow update in real time
- Rearrange nodes visually and see the code reorder
- Add code constructs not available in the designer, and they appear as code blocks in the flow

:::info Unsupported Constructs
Some advanced Ballerina constructs (such as worker message passing or lock statements) do not have visual representations. They appear as collapsed code blocks in the flow designer that you can expand and edit inline.
:::

## What's Next

- [Connections](connections.md) -- Configure the connections used in your flow
- [Control Flow](control-flow.md) -- Detailed guide to branching and looping nodes
- [Error Handling](error-handling.md) -- Error handling patterns in the designer
