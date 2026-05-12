# Example

## What you'll build

This integration demonstrates how to connect to a Redis data store using the `ballerinax/redis` connector and perform a `set` operation to write a key-value pair. The workflow uses an Automation trigger to execute the Redis write on a scheduled basis, making it suitable for scenarios such as cache warming, periodic state updates, or scheduled data seeding. The complete flow runs from the Automation trigger through the Redis connector's `set` operation to the Redis data store.

**Operations used:**
- **`set`**: writes a string value at the specified key in the Redis data store, creating or overwriting the entry

## Architecture

```mermaid
flowchart LR
    A[Automation Trigger] --> B[Redis Connector]
    B --> C[set Operation]
    C --> D[Redis Data Store]
```

## Prerequisites

- A running Redis server accessible at the configured host and port.
- Redis server credentials if authentication is enabled (used for the `redisConnectionUri` configurable).

## Setting up the Redis integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](../../../../develop/create-integrations/create-a-new-integration.md) guide to set up your project first, then return here to add the connector.

## Adding the Redis connector

### Step 1: Open the connector palette and select the Redis connector

1. In the left sidebar, click **+ Add Connection** to open the connector palette.
2. Type **"redis"** in the search field to filter the connector list, or scroll down in the **Pre-built Connectors** section to find Redis.
3. Click the **Redis** (`ballerinax/redis`) connector card to open its connection configuration form.

![Redis connector palette open showing search field and connector list](/img/connectors/catalog/database/redis/redis_screenshot_01_palette.png)

## Configuring the Redis connection

### Step 2: Bind Redis connection parameters to configurable variables

This example uses the **Connection URI** approach to configure the Redis client in a single URI string. The connector also accepts separate `host`, `port`, `username`, and `password` fields via the `ConnectionParams` form. See the [Action Reference](actions.md#connectionparams) for both forms.

Click **Expand** under "Advanced Configurations" to reveal all connection parameters. For each parameter listed below:

1. Open the helper panel beside the field and go to the **Configurables** tab.
2. Select an existing configurable or click **+ New Configurable**.
3. Supply a descriptive camelCase name and the appropriate type, then click **Save**. The configurable is injected into the field.

- **`connection`**: the full Redis connection URI; configures the host, port, and authentication in a single URI string
- **`connectionPooling`**: whether to enable connection pooling for the Redis client
- **`isClusterConnection`**: whether this connection targets a Redis cluster rather than a single standalone node

If your Redis server requires TLS, expand the **secureSocket** field as well. See the [Action Reference](actions.md#securesocket) for its sub-fields.

![Redis connection form showing all parameters bound to Configurable variables before saving](/img/connectors/catalog/database/redis/redis_screenshot_02_connection_form.png)

### Step 3: Save the Redis connection

Click **Save Connection** to persist the Redis connection configuration. The Redis connector entry (`redisClient`) appears on the design canvas, confirming the connection was successfully created.

![Redis connector visible on the canvas after saving](/img/connectors/catalog/database/redis/redis_screenshot_03_connections_list.png)

### Step 4: Set actual values for your configurables

1. In the left panel, click **Configurations**.
2. Set a value for each configurable listed below.

- **`redisConnectionUri`** (string): the full Redis connection URI for your server, e.g. `redis://localhost:6379` (or `rediss://user:password@host:port` for TLS)
- **`redisConnectionPooling`** (boolean): set to `true` to enable connection pooling, or `false` to disable it
- **`redisIsClusterConnection`** (boolean): set to `true` if connecting to a Redis cluster, or `false` for a standalone server

## Configuring the Redis set operation

### Step 5: Add an automation trigger

1. In the left sidebar, hover over **Entry Points** and click the **Add Entry Point** button (**+** icon).
2. In the artifact picker, click **Automation** to add a new Automation entry point.
3. In the Automation creation form, click **Create** to confirm with default settings. The Automation is added to the canvas and its flow view opens automatically.

### Step 6: Select the `set` operation and configure its parameters

1. Inside the Automation flow canvas, click the **+** add-step button (the dashed placeholder node labelled "Select node from node panel") to open the step-addition panel on the right.
2. In the right-side panel under **Connections**, locate the **redisClient** entry and click it to expand the full list of available Redis operations.

![Redis connection node expanded showing all available operations before selection](/img/connectors/catalog/database/redis/redis_screenshot_04_operations_panel.png)

3. Scroll down in the operations list and click **Set** to open its configuration panel.
4. Fill in the operation fields.

- **`key`**: the Redis key to write; identifies the entry in the data store
- **`value`**: the string value to store at the specified key
- **`result`**: variable that holds the operation's return value (for example, `setResult`)

![Redis set operation configuration panel showing key and value fields filled](/img/connectors/catalog/database/redis/redis_screenshot_05_operation_filled.png)

5. Click **Save** to confirm the `set` operation configuration.

### Step 7: Verify the completed canvas flow

After saving the `set` operation, the Automation canvas displays the complete integration flow: **Start → redis : set (setResult) → redisClient → Error Handler → End**. Confirm all nodes are connected with no error indicators before running the integration.

![Completed canvas showing the full Automation Trigger to Redis set operation flow](/img/connectors/catalog/database/redis/redis_screenshot_06_completed_flow.png)

## Try it yourself

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/redis-connector-sample)

## More code examples

The Redis connector provides practical examples illustrating usage in various scenarios.
Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-redis/tree/master/examples/) covering common Redis operations.

1. [Cache management](https://github.com/ballerina-platform/module-ballerinax-redis/tree/master/examples/cache-management) - Implement caching using Redis to improve application performance.

2. [Session management](https://github.com/ballerina-platform/module-ballerinax-redis/tree/master/examples/session-management) - Use Redis to manage user sessions efficiently.

3. [Rate limiting](https://github.com/ballerina-platform/module-ballerinax-redis/tree/master/examples/rate-limiting) - Implement rate limiting for API endpoints using Redis.
