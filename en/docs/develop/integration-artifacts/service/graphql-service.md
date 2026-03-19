---
title: GraphQL Service
description: Build GraphQL APIs with queries, mutations, and subscriptions. (Beta)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# GraphQL Service

GraphQL services let you build flexible APIs where clients request exactly the data they need. WSO2 Integrator automatically generates the GraphQL schema from your Ballerina types and supports queries, mutations, and real-time subscriptions.

:::note Beta
GraphQL service support is currently in beta.
:::

## Creating a GraphQL service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the **WSO2 Integrator** sidebar in VS Code.
2. Click **+** next to **Services**.
3. Select **GraphQL Service** from the artifact type list.
4. In the creation form, fill in:
   - **Name** — a name for the service.
   - **Port** — the listener port (default: `9090`).
   - **Base Path** — the GraphQL endpoint path (e.g., `/graphql`).
5. Click **Create**.

<!-- TODO: add screenshot — GraphQL service creation form -->

6. WSO2 Integrator opens the service in the **flow designer**. The canvas displays separate nodes for queries, mutations, and subscriptions.
7. Click **+ Add Query** to add a query resource, **+ Add Mutation** for mutations, or **+ Add Subscription** for subscriptions.
8. For each operation, define the return type and any input arguments.
9. Use the action palette to add data-fetching logic inside each operation.

<!-- TODO: add screenshot — Flow designer showing GraphQL service with query and mutation nodes -->

10. WSO2 Integrator generates the schema automatically from the Ballerina type definitions. Click **View Schema** to preview the generated SDL.

<!-- TODO: add screenshot — Generated GraphQL schema view -->

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {

    // Query: { products(category: "electronics") { id name price } }
    resource function get products(string? category) returns Product[]|error {
        return getProducts(category);
    }

    // Query: { product(id: "123") { id name price } }
    resource function get product(string id) returns Product|error {
        return getProduct(id);
    }

    // Mutation: mutation { addProduct(input: {...}) { id name } }
    remote function addProduct(ProductInput input) returns Product|error {
        return createProduct(input);
    }

    // Subscription: subscription { onProductCreated { id name } }
    resource function subscribe onProductCreated() returns stream<Product, error?> {
        return getProductStream();
    }
}
```

</TabItem>
</Tabs>

## GraphQL operation types

| Operation | Keyword | Description |
|---|---|---|
| **Query** | `resource function get` | Read data — analogous to HTTP GET |
| **Mutation** | `remote function` | Write data — analogous to HTTP POST/PUT/DELETE |
| **Subscription** | `resource function subscribe` | Real-time updates via WebSocket |

## Schema generation

Ballerina generates the GraphQL schema from your record types and function signatures automatically. No separate SDL file is needed.

```ballerina
type Product record {|
    string id;
    string name;
    decimal price;
    string category;
|};

type ProductInput record {|
    string name;
    decimal price;
    string category;
|};
```

The above types map to the following GraphQL schema:

```graphql
type Product {
  id: String!
  name: String!
  price: Decimal!
  category: String!
}

input ProductInput {
  name: String!
  price: Decimal!
  category: String!
}
```

## GraphQL Playground

Use the built-in GraphQL Playground for interactive testing. Navigate to `http://localhost:9090/graphql` in your browser after starting the service.

## What's next

- [HTTP Service](http-service.md) — expose integration logic over REST
- [Types](../supporting/types.md) — define shared record types for schema generation
- [Connections](../supporting/connections.md) — configure data source connections
