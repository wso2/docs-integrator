---
title: GraphQL Tool
---

# GraphQL tool

The `bal graphql` tool generates Ballerina service skeletons and client code from GraphQL Schema Definition Language (SDL) files. It creates type-safe resolver stubs, input/output types, and client operations that match your GraphQL schema, letting you focus on implementing business logic rather than writing boilerplate.

## Prerequisites

The GraphQL tool is included with the Ballerina distribution:

```bash
bal graphql --help
```

## Generating a service from a GraphQL schema

1. Click the **+** **Add Artifacts** button in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **GraphQL Service** under **Integration as API**.
3. Select **Import From GraphQL Schema** under **Service Contract**.

   ![Import GraphQL schema](/img/develop/tools/graphql-tool/step-import-schema.png)

4. Browse or enter the path to your GraphQL SDL file.
5. Configure the **Service Base Path** and listener settings.
6. Click **Create**.
7. WSO2 Integrator generates the service with resolver stubs and record types matching your GraphQL schema.

### Basic service generation

```bash
# Generate a Ballerina GraphQL service from an SDL file
bal graphql -i schema.graphql --mode service

# Specify output directory
bal graphql -i schema.graphql --mode service -o generated/
```

### Example schema

Given the following `schema.graphql`:

```graphql
type Query {
    customer(id: ID!): Customer
    orders(customerId: ID!, limit: Int = 10): [Order!]!
}

type Mutation {
    createOrder(input: OrderInput!): Order!
    updateOrderStatus(orderId: ID!, status: OrderStatus!): Order!
}

type Customer {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]!
}

type Order {
    id: ID!
    customerId: ID!
    items: [LineItem!]!
    total: Float!
    status: OrderStatus!
}

type LineItem {
    productId: ID!
    quantity: Int!
    unitPrice: Float!
}

input OrderInput {
    customerId: ID!
    items: [LineItemInput!]!
}

input LineItemInput {
    productId: ID!
    quantity: Int!
}

enum OrderStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
    CANCELLED
}
```

### Generated service code

The tool generates a Ballerina service with resolver stubs:

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {

    // Query resolvers
    resource function get customer(string id) returns Customer?|error {
        // TODO: Implement resolver
    }

    resource function get orders(string customerId, int 'limit = 10)
            returns Order[]|error {
        // TODO: Implement resolver
    }

    // Mutation resolvers
    remote function createOrder(OrderInput input) returns Order|error {
        // TODO: Implement resolver
    }

    remote function updateOrderStatus(string orderId, OrderStatus status)
            returns Order|error {
        // TODO: Implement resolver
    }
}
```

And corresponding record types:

```ballerina
// Auto-generated from GraphQL schema
type Customer record {|
    string id;
    string name;
    string email;
    Order[] orders;
|};

type Order record {|
    string id;
    string customerId;
    LineItem[] items;
    float total;
    OrderStatus status;
|};

type LineItem record {|
    string productId;
    int quantity;
    float unitPrice;
|};

type OrderInput record {|
    string customerId;
    LineItemInput[] items;
|};

type LineItemInput record {|
    string productId;
    int quantity;
|};

enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
```

## Generating a client from a GraphQL schema

Client generation from GraphQL schemas is currently supported only through the Ballerina CLI (pro-code). Visual Designer support for GraphQL client generation is not yet available.

Client generation requires a `graphql.config.yaml` configuration file that specifies the schema and query documents:

```yaml
schema: schema.graphql
documents:
  - queries.graphql
```

Then run:

```bash
bal graphql -i graphql.config.yaml
```

### Defining client queries

Create a `queries.graphql` file with the operations your client needs:

```graphql
query GetCustomer($id: ID!) {
    customer(id: $id) {
        id
        name
        email
    }
}

query GetOrders($customerId: ID!, $limit: Int) {
    orders(customerId: $customerId, limit: $limit) {
        id
        total
        status
    }
}

mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
        id
        total
        status
    }
}
```

### Using the generated client

```ballerina
import generated_client as gql;

configurable string graphqlEndpoint = ?;

final gql:GraphqlClient orderApi = check new (graphqlEndpoint);

function getCustomer(string id) returns gql:GetCustomerResponse|error {
    return check orderApi->getCustomer(id);
}

function createOrder(string customerId, gql:LineItemInput[] items)
        returns gql:CreateOrderResponse|error {
    gql:OrderInput input = {customerId, items};
    return check orderApi->createOrder(input);
}
```

## Exporting a GraphQL schema from Ballerina

Generate a GraphQL SDL file from an existing Ballerina GraphQL service:

```bash
# Export SDL from a Ballerina service
bal graphql -i service.bal --mode schema

# Export to a specific directory
bal graphql -i service.bal --mode schema -o schema/
```

## Command reference

```bash
bal graphql -i <schema-file-or-url> [options]
```

### Generate flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the GraphQL SDL file (`.graphql`) or a GraphQL endpoint URL |
| `--mode` | — | No | `service` | Generation mode: `service`, `client`, or `schema` |
| `-o`, `--output` | — | No | Current directory | Output directory for generated files |
| `-s`, `--service` | — | No | — | Service base path for service generation |
| `--use-records-for-objects` | — | No | `false` | Generate Ballerina records instead of service classes for object types |

## Implementing resolvers

After generating the service skeleton, implement each resolver with your integration logic:

```ballerina
import ballerina/graphql;
import ballerinax/mysql;

configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

final mysql:Client db = check new (host = dbHost, user = dbUser,
    password = dbPassword, database = "orders");

service /graphql on new graphql:Listener(9090) {

    resource function get customer(string id) returns Customer?|error {
        return db->queryRow(
            `SELECT id, name, email FROM customers WHERE id = ${id}`
        );
    }

    resource function get orders(string customerId, int 'limit = 10)
            returns Order[]|error {
        stream<Order, error?> orderStream = db->query(
            `SELECT * FROM orders WHERE customer_id = ${customerId}
             LIMIT ${'limit}`
        );
        return from Order o in orderStream select o;
    }

    remote function createOrder(OrderInput input) returns Order|error {
        // Business logic to create order
        string orderId = check insertOrder(input);
        return check fetchOrder(orderId);
    }
}
```

## GraphQL to Ballerina type mapping

| GraphQL type | Ballerina type |
|---|---|
| `String` | `string` |
| `Int` | `int` |
| `Float` | `float` |
| `Boolean` | `boolean` |
| `ID` | `string` |
| `[T]` | `T[]` |
| `T!` | `T` (non-optional) |
| `T` (nullable) | `T?` |
| `enum` | `enum` |
| `input` | `record {}` |
| `type` | `service class` or `record {}` |
| `union` | Union type |
| `interface` | `distinct service class` |

## What's next

- [AsyncAPI Tool](asyncapi-tool.md) — Generate event-driven services from AsyncAPI specs
- [OpenAPI Tool](openapi-tool.md) — Generate REST services and clients
- [Ballerina pro-code](/docs/develop/design-logic/ballerina-pro-code) — Write advanced GraphQL resolver logic
