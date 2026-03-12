---
sidebar_position: 3
title: GraphQL Tool
description: Generate Ballerina GraphQL services and clients from GraphQL SDL schemas.
---

# GraphQL Tool

The `bal graphql` tool generates Ballerina service skeletons and client code from GraphQL Schema Definition Language (SDL) files. It creates type-safe resolver stubs, input/output types, and client operations that match your GraphQL schema, letting you focus on implementing business logic rather than writing boilerplate.

## Prerequisites

The GraphQL tool is included with the Ballerina distribution:

```bash
bal graphql --help
```

## Generating a Service from a GraphQL Schema

### Basic Service Generation

```bash
# Generate a Ballerina GraphQL service from an SDL file
bal graphql -i schema.graphql --mode service

# Specify output directory
bal graphql -i schema.graphql --mode service -o generated/
```

### Example Schema

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

### Generated Service Code

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

## Generating a Client from a GraphQL Schema

Generate a type-safe client for consuming a GraphQL API:

```bash
# Generate a GraphQL client
bal graphql -i schema.graphql --mode client

# Generate client with specific queries document
bal graphql -i schema.graphql --mode client -q queries.graphql
```

### Defining Client Queries

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

### Using the Generated Client

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

## Exporting a GraphQL Schema from Ballerina

Generate a GraphQL SDL file from an existing Ballerina GraphQL service:

```bash
# Export SDL from a Ballerina service
bal graphql -i service.bal --mode export

# Export to a specific file
bal graphql -i service.bal --mode export -o schema/
```

## Command Reference

| Command | Description |
|---|---|
| `bal graphql -i <schema.graphql> --mode service` | Generate service from SDL |
| `bal graphql -i <schema.graphql> --mode client` | Generate client from SDL |
| `bal graphql -i <service.bal> --mode export` | Export SDL from service |
| `-o <dir>` | Output directory |
| `-q <queries.graphql>` | Queries document for client generation |

## Implementing Resolvers

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

## What's Next

- [AsyncAPI Tool](asyncapi-tool.md) -- Generate event-driven services from AsyncAPI specs
- [OpenAPI Tool](openapi-tool.md) -- Generate REST services and clients
- [Ballerina Pro-Code](/docs/develop/design-logic/ballerina-pro-code) -- Write advanced GraphQL resolver logic
