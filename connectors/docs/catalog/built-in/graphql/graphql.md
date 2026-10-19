---
title: GraphQL
---

GraphQL is a query language and server-side runtime for APIs that lets clients request exactly the data they need. The Ballerina `ballerina/graphql` module (v1.17.0) provides both a full-featured GraphQL server framework with automatic schema generation from Ballerina service definitions, and a GraphQL client for sending queries and mutations to external GraphQL endpoints.

## Key features

- Automatic GraphQL schema generation from Ballerina service definitions: no separate SDL required
- Support for all three GraphQL operation types: queries, mutations, and subscriptions (over WebSocket)
- GraphQL client with type-safe response binding, circuit breaker, retry, and caching support
- Built-in authentication and authorization: Basic Auth (file/LDAP), JWT, and OAuth2 for both server and client
- Global and field-level interceptors for cross-cutting concerns like logging, validation, and authorization
- DataLoader support via the `graphql.dataloader` sub-module for batching and caching to solve the N+1 problem
- Apollo Federation subgraph support via the `graphql.subgraph` sub-module for building federated GraphQL architectures
- Built-in GraphiQL interface, server-side caching, query complexity analysis, and file upload support

## Actions

Actions are outbound operations you invoke from your integration to send GraphQL queries and mutations to an external GraphQL endpoint. The GraphQL connector exposes a single client for this purpose:

| Client | Actions |
|--------|---------|
| `Client` | Execute GraphQL queries and mutations against a remote endpoint with type-safe response binding |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to expose a GraphQL API that receives and processes incoming queries, mutations, and subscriptions. The `graphql:Listener` serves the API over HTTP/WebSocket, and your Ballerina service definitions are automatically converted into a GraphQL schema.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Query received | `resource function get` | Invoked when a client sends a GraphQL query for a specific field. |
| Mutation received | `remote function` | Invoked when a client sends a GraphQL mutation. |
| Subscription started | `resource function subscribe` | Invoked when a client subscribes to real-time updates over WebSocket. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **GraphQL** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [GraphQL Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-graphql)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
