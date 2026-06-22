---
sidebar_position: 1
title: "Order Management Automation"
description: Build a scheduled automation that finds newly placed orders in a database and advances them to processing, designed visually with a database connection and control flow.
keywords: [wso2 integrator, automation, database, mysql, order management, persistence, scheduled job, use case, low-code]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Order Management Automation

**Time:** About 20 minutes | **What you'll build:** A scheduled automation that finds newly placed orders in your database and advances them to processing, with nothing to trigger it and no code to write.

Orders pile up the moment customers start placing them, and something has to move each one from "placed" to "processing" before the warehouse can act on it. Doing that by hand does not scale, and a human checking the database every few minutes is exactly the kind of work software should own. In this guide you build an automation that wakes on a schedule, finds every order still waiting in your database, advances it to processing, and logs what it did. You design the whole thing on the canvas in the Visual Designer, and WSO2 Integrator writes the Ballerina for you.

:::info What you will build

An **automation** that, on each run, connects to a MySQL `orders_db`, reads every order whose status is still `PLACED`, updates each one to `PROCESSING`, and prints a short summary to the log. Run it once and the two waiting orders move forward; run it again with nothing left to do and it exits cleanly after a single log line.

:::

## How it works

This integration has no listener and no inbound request to respond to. A scheduler invokes its entry point on a recurring basis, and each run walks through the same short flow:

1. Read the `orders` table for rows whose status is still `PLACED`.
2. If nothing is waiting, log a note and stop.
3. Otherwise, loop over the waiting orders and update each one to `PROCESSING`.
4. Log a one-line summary of how much work the run did.

You assemble that flow from a handful of visual building blocks:

| Building block | Role in the flow |
| --- | --- |
| **Connection** (`ordersDB`) | Reaches the MySQL database and exposes typed read and update operations |
| **Automation** | The scheduled entry point that runs the logic with no inbound request |
| **Get rows** | Reads the orders still waiting to be processed |
| **If** + **Return** | Exits the run early when there is nothing to do |
| **Foreach** + **Update row** | Iterates the waiting orders and advances each one |
| **Log Info** | Records progress and a final summary |

## Before you begin

:::info Prerequisites

- A working WSO2 Integrator environment. Choose the path that fits how you want to work:
    - [Cloud setup](../../get-started/setup/cloud-setup.md) to launch WSO2 Integrator in a browser-based cloud editor.
    - [Local setup](../../get-started/setup/local-setup.md) to install and launch the WSO2 Integrator IDE on your machine.
- MySQL Server 8.0 or later running on `localhost:3306`. If you need to install or configure it, follow the [MySQL connector setup guide](../../connectors/catalog/database/mysql/setup-guide.md).
- The sample `orders_db` database, seeded with the data below.

:::

### Set up the sample database

Run the following against your MySQL server to create the database, a dedicated user, the tables, and the seed data. Two orders start in `PLACED` status (the work this automation will pick up) and two are already `PROCESSING`.

```sql
-- Create the database and a dedicated user
CREATE DATABASE IF NOT EXISTS orders_db;
CREATE USER IF NOT EXISTS 'orders_user'@'localhost' IDENTIFIED BY 'orders_pass';
GRANT SELECT, UPDATE ON orders_db.* TO 'orders_user'@'localhost';
FLUSH PRIVILEGES;

USE orders_db;

-- Tables
CREATE TABLE customers (
    customer_id VARCHAR(20) PRIMARY KEY,
    name        VARCHAR(100),
    email       VARCHAR(100),
    address     VARCHAR(255)
);

CREATE TABLE products (
    product_id   VARCHAR(20) PRIMARY KEY,
    product_name VARCHAR(100),
    category     VARCHAR(50),
    price        DECIMAL(10,2)
);

CREATE TABLE orders (
    order_id    VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20),
    product_id  VARCHAR(20),
    amount      DECIMAL(10,2),
    status      VARCHAR(20) DEFAULT 'PLACED',
    placed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id)  REFERENCES products(product_id)
);

-- Seed data
INSERT INTO customers VALUES
    ('CUST-001', 'Ada Lovelace',   'ada@example.com',   '10 Analytical Way'),
    ('CUST-002', 'Alan Turing',    'alan@example.com',  '24 Enigma Street'),
    ('CUST-003', 'Grace Hopper',   'grace@example.com', '7 Compiler Lane'),
    ('CUST-004', 'Edsger Dijkstra','ed@example.com',    '3 Shortest Path');

INSERT INTO products VALUES
    ('PROD-001', 'Mechanical Keyboard', 'Peripherals', 79.99),
    ('PROD-002', 'USB-C Hub',           'Accessories', 34.50),
    ('PROD-003', 'Standing Desk',       'Furniture',   129.00),
    ('PROD-004', 'Desk Lamp',           'Lighting',    49.99);

INSERT INTO orders (order_id, customer_id, product_id, amount, status) VALUES
    ('ORD-001', 'CUST-001', 'PROD-001', 79.99,  'PLACED'),
    ('ORD-002', 'CUST-002', 'PROD-002', 34.50,  'PLACED'),
    ('ORD-003', 'CUST-003', 'PROD-003', 129.00, 'PROCESSING'),
    ('ORD-004', 'CUST-004', 'PROD-004', 49.99,  'PROCESSING');
```

The user needs `SELECT` so the automation can find waiting orders and `UPDATE` so it can advance them. For the full schema and a seed-data reference you can copy, see [Data persistence: set up the database](../../develop/integration-artifacts/supporting/data-persistence.md#set-up-the-database).

## Step 1: Create the automation

The job runs on a schedule with no inbound request, so the artifact you reach for is an [**automation**](../../develop/integration-artifacts/automation.md#creating-an-automation).

1. Open WSO2 Integrator and select the **Create New Integration** card.
2. Set **Integration Name** to `OrderProcessingAutomation` and **Project Name** to `order-management-automation`, then select **Create Integration**.

<ThemedImage
    alt="Create New Integration form with Integration Name set to OrderProcessingAutomation and Project Name set to order-management-automation"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/create-integration.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/create-integration.png'),
    }}
/>

3. From the project overview, open the integration and select **+ Add Artifact**. Under **Automation**, select **Automation**, then **Create**.

<ThemedImage
    alt="Add Artifact panel showing the Automation, AI, Integration as API, Event, and File categories with Automation selected"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/add-automation-artifact.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/add-automation-artifact.png'),
    }}
/>

You land in the [flow editor](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md) with a single **Start** node. That is the entry point the scheduler will call.

> **Capability: Automation.** You created a scheduled entry point that runs your logic without any inbound request. See [Automation](../../develop/integration-artifacts/automation.md).

## Step 2: Connect to the order database

The automation needs to reach the orders. Rather than hand-writing a connection string and a data model, you add a [**connection**](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) and let WSO2 Integrator [introspect the database](../../develop/tools/integration-tools/persist-tool.md#connect-to-a-database) for you.

1. In the flow editor, select **+** below the **Start** node to open the node panel, then select **Add Connection**.
2. Under **Create New Connector**, choose **Connect to a Database**, then select **MySQL**.
3. On the **Database Credentials** step, enter the connection details, then select **Connect & Introspect Database**:

    | Field | Value |
    | --- | --- |
    | Host | `localhost` |
    | Port | `3306` |
    | Database | `orders_db` |
    | Username | `orders_user` |
    | Password | `orders_pass` |

<ThemedImage
    alt="Database Credentials step of the connection wizard filled in for the MySQL orders_db database"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/db-connection-credentials.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/db-connection-credentials.png'),
    }}
/>

4. On the **Select Tables** step, choose **Select All**. The `customers`, `products`, and `orders` tables come in together because their relationships are detected for you. Select **Continue to Connection Details**.

<ThemedImage
    alt="Select Tables step with the customers, orders, and products tables all selected"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/db-select-tables.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/db-select-tables.png'),
    }}
/>

5. Set **Connection Name** to `ordersDB` and select **Save Connection**.

<ThemedImage
    alt="Flow editor showing the ordersDB connection available after the wizard completes"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/db-connection-saved.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/db-connection-saved.png'),
    }}
/>

WSO2 Integrator reads the schema and generates a [typed data-access client](../../develop/tools/integration-tools/persist-tool.md#use-the-generated-client) along with [record types](../../develop/integration-artifacts/supporting/types.md#adding-a-type) such as `PlacedOrdersType`. You never write a query string or model a table by hand.

:::info Note

The whole connection is generated as configurable values, not just the password, so you can repoint the integration at a different database per environment without editing the design. The host, port, user, and database take the values you entered as defaults, while the password has no default (`= ?`), so you supply it at run time:

```ballerina
configurable string ordersDBHost = "localhost";
configurable int ordersDBPort = 3306;
configurable string ordersDBUser = "orders_user";
configurable string ordersDBPassword = ?;
configurable string ordersDBDatabase = "orders_db";
```

:::

> **Capability: Database connection.** A single visual step gives you typed, generated access to every table. See [Data persistence: create the MySQL connection](../../develop/integration-artifacts/supporting/data-persistence.md#step-1-create-the-mysql-connection) for a step-by-step reference, [Connections](../../develop/integration-artifacts/supporting/connections.md) for connection management, and the [Persist tool](../../develop/tools/integration-tools/persist-tool.md) for how introspection generates the data layer.

## Step 3: Read the orders waiting to be processed

The first thing each run needs is the list of orders still sitting in `PLACED`. The generated client already has a read operation for the `orders` table; you just point it at the rows you care about.

1. Select **+** below the **Start** node, choose the **ordersDB** connection, and select **Get rows from orders table.**
2. Set **Result** to `placedOrders` and check **Select All Fields**.
3. Expand **Advanced Configurations** and, in the **Where Clause** field, enter `status = ${"PLACED"}` so the operation returns only the waiting orders.
4. Select **Save**.

:::info Note

You type just the condition. WSO2 Integrator turns it into a safe parameterized query for you, so values are never concatenated into raw SQL.

:::

<ThemedImage
    alt="Get rows operation configured with Result placedOrders, Select All Fields, and a Where Clause filtering on status PLACED"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/get-rows-config.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/get-rows-config.png'),
    }}
/>

`placedOrders` is now a typed list of the orders this run should act on.

> **Capability: Typed data access.** You query the database through a generated, strongly typed operation instead of raw SQL. See [Data persistence: get newly placed orders](../../develop/integration-artifacts/supporting/data-persistence.md#step-21-get-newly-placed-orders).

## Step 4: Skip the run when nothing is waiting

If no orders are waiting, the automation should do nothing and stop. You close that case before doing any work, so an empty run stays cheap and quiet.

1. Select **+** below the **get** node, open the node panel, and under **Control** select **If**.
2. Set the **Condition** to `placedOrders.length() == 0` and select **Save**.

<ThemedImage
    alt="If control node with the condition placedOrders.length() equals 0"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/if-empty-check.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/if-empty-check.png'),
    }}
/>

3. Inside the **If** branch, add a [**Log Info**](../../develop/understand-ide/editors/flow-diagram-editor/logging.md#log-info) node (under **Logging**), set **Msg** to `"No new orders to process."`, and select **Save**.
4. After the log node, add a **Return** node with no value to end the run.

Your flow now branches: when no orders are waiting it logs a message and returns; otherwise it falls through to the work you add next.

<ThemedImage
    alt="Flow with the If branch built: when placedOrders is empty it logs No new orders to process and returns"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/if-return-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/if-return-flow.png'),
    }}
/>

> **Capability: Control flow.** A visual [**If**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) and [**Return**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#return) let the automation branch and exit without a line of hand-written logic. For this exact early-exit pattern, see [Data persistence: handle the case where no orders need processing](../../develop/integration-artifacts/supporting/data-persistence.md#step-22-handle-the-case-where-no-orders-need-processing).

## Step 5: Advance each order to processing

Now for the real work: walk the waiting orders and move each one forward. A **Foreach** node loops the list, and the generated update operation writes the new status back to the database.

1. Select **+** below the **If** node, open the node panel, and under **Control** select [**Foreach**](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach). Set **Collection** to `placedOrders` and **Variable Name** to `placedOrder` (the **Variable Type** `PlacedOrdersType` is filled in for you). Select **Save**.

<ThemedImage
    alt="Foreach node configured to loop over placedOrders with item variable placedOrder of type PlacedOrdersType"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/foreach-config.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/foreach-config.png'),
    }}
/>

2. Select **+** *inside* the **Foreach** body, choose the **ordersDB** connection, and select **Update row in orders table.** Configure it:
    - **orderId**: `placedOrder.orderId`
    - **Value**: `{status: "PROCESSING"}`
    - **Result**: `updatedOrder`

    Then select **Save**. The update now runs once for every order the loop visits.

<ThemedImage
    alt="Update row operation added inside the Foreach loop, setting status to PROCESSING for the current order"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/foreach-update.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/foreach-update.png'),
    }}
/>

3. Still inside the **Foreach**, add a **Log Info** node so each advanced order leaves a trail. Set **Msg** to:

    ```
    string `Order advanced to PROCESSING: ${updatedOrder.orderId}`
    ```

    Then select **Save**.

The loop body is now complete: for each waiting order it updates the row and logs the advance.

<ThemedImage
    alt="Foreach loop containing the Update row operation and a Log Info node that records each advanced order"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/foreach-complete.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/foreach-complete.png'),
    }}
/>

> **Capability: Iteration and persistence.** A **Foreach** loop and a generated **Update row** operation advance every waiting order, all designed on the canvas. See [Data persistence: loop and update each order](../../develop/integration-artifacts/supporting/data-persistence.md#step-23-loop-and-update-each-order).

## Step 6: Log a summary

After the loop finishes, one line tells you how much the run accomplished.

1. After the **Foreach** node, add a **Log Info** node.
2. Set **Msg** to the following, then select **Save**:

    ```
    string `Done - processed ${placedOrders.length()} orders`
    ```

Your flow is complete. It reads the waiting orders, exits early when there are none, advances each one, and reports a summary.

<ThemedImage
    alt="Complete automation flow: Start, get placed orders, If empty branch with log and return, then Foreach with update and log"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/full-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/full-flow.png'),
    }}
/>

> **Capability: Logging.** Built-in log nodes give every run an audit trail with no logging boilerplate. See [Logging](../../develop/understand-ide/editors/flow-diagram-editor/logging.md) for every log level, and [Data persistence: log the summary](../../develop/integration-artifacts/supporting/data-persistence.md#step-24-log-the-summary).

## Run and verify

1. Select **Run** on the integration overview. The first run needs the database password. When prompted, create the `Config.toml` and add:

    ```toml
    ordersDBPassword = "orders_pass"
    ```

2. Watch the terminal. Each waiting order advances, and a final line reports the count:

    ```
    time=2026-06-19T16:05:21.917+05:30 level=INFO module=.../orderprocessingautomation message="Order advanced to PROCESSING: ORD-001"
    time=2026-06-19T16:05:21.928+05:30 level=INFO module=.../orderprocessingautomation message="Order advanced to PROCESSING: ORD-002"
    time=2026-06-19T16:05:21.929+05:30 level=INFO module=.../orderprocessingautomation message="Done - processed 2 orders"
    ```

<ThemedImage
    alt="Integration overview with the terminal showing two orders advanced to PROCESSING and a processed-2-orders summary"
    sources={{
        light: useBaseUrl('/img/guides/usecases/order-management-automation/run-terminal-output.png'),
        dark: useBaseUrl('/img/guides/usecases/order-management-automation/run-terminal-output.png'),
    }}
/>

3. Confirm the change landed in the database:

    ```sql
    SELECT order_id, status FROM orders_db.orders WHERE order_id IN ('ORD-001', 'ORD-002');
    ```

    Both rows now read `PROCESSING`.

4. Run the automation a second time. Nothing is waiting, so the early exit kicks in and the terminal shows a single line:

    ```
    message="No new orders to process."
    ```

:::tip Reset to a clean state

To run the walkthrough again from the start, move the two sample orders back to `PLACED`:

```sql
UPDATE orders_db.orders SET status = 'PLACED' WHERE order_id IN ('ORD-001', 'ORD-002');
```
:::

## The generated integration

You designed every step on the canvas. Here is the Ballerina that the Visual Designer generated for you, shown only so you can see there is nothing hidden. You did not write any of it.

<Tabs>
<TabItem value="automation" label="automation.bal" default>

```ballerina
import orderprocessingautomation.ordersdb;

import ballerina/log;
import ballerina/persist;
import ballerina/sql;

public function main() returns error? {
    do {
        PlacedOrdersType[] placedOrders = check ordersDB->/orders.get(whereClause = `status = ${"PLACED"}`);
        if placedOrders.length() == 0 {
            log:printInfo("No new orders to process.");
            return;
        }
        foreach PlacedOrdersType placedOrder in placedOrders {
            ordersdb:Order updatedOrder = check ordersDB->/orders/[placedOrder.orderId].put({status: "PROCESSING"});
            log:printInfo(string `Order advanced to PROCESSING: ${updatedOrder.orderId}`);
        }
        log:printInfo(string `Done - processed ${placedOrders.length()} orders`);
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</TabItem>
</Tabs>

The connection, the typed [`PlacedOrdersType` record](../../develop/integration-artifacts/supporting/types.md), and the [data-access client](../../develop/tools/integration-tools/persist-tool.md#use-the-generated-client) were all generated when you introspected the database; the flow logic was generated as you built the canvas.

## What's next

Now that the automation works, you can take it further:

- **Deploy and schedule it.** Ship the automation to wherever it should run: [WSO2 Cloud](../../deploy/cloud/overview.md), a [container on Docker or Kubernetes](../../deploy/self-hosted/containerized-deployment.md), or a [virtual machine](../../deploy/self-hosted/vm-deployment.md). Once it is deployed, configure periodic invocation in that environment: a `cron` entry on a Unix or Linux host, a Kubernetes `CronJob`, a host scheduler such as Windows Task Scheduler or `systemd` timers, or the schedule settings in the WSO2 Integration Platform.
- **Notify a downstream system.** Add a [connector](../../connectors/overview.md) inside the loop to post each advanced order to a fulfillment service, a message broker, or a chat channel.
- **Handle more of the lifecycle.** Extend the same pattern to move orders from `PROCESSING` to `SHIPPED`, or to flag orders that have been waiting too long. To shape the data you pass on, define your own [types](../../develop/integration-artifacts/supporting/types.md#adding-a-type) or transform between them with the [Data Mapper](../../develop/integration-artifacts/supporting/data-mapper/data-mapper.md).
