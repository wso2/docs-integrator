---
sidebar_position: 4
title: bal graphql CLI
description: Reference for the bal graphql CLI tool — generate Ballerina service skeletons and client code from GraphQL SDL schemas.
---

# bal graphql CLI

The `bal graphql` tool generates Ballerina source code from GraphQL Schema Definition Language (SDL) files. It can produce service skeletons for implementing a GraphQL API or generate client code for consuming an existing GraphQL endpoint.

## Commands Overview

| Command | Description |
|---------|-------------|
| `bal graphql -i <schema>` | Generate Ballerina source from a GraphQL SDL schema or a GraphQL endpoint |

## Syntax

```bash
bal graphql -i <schema-file-or-url> [options]
```

## Flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the GraphQL SDL file (`.graphql`) or a GraphQL endpoint URL |
| `--mode` | — | No | `service` | Generation mode: `service`, `client`, or `schema` |
| `-o`, `--output` | No | — | Current directory | Output directory for generated files |
| `-s`, `--service` | No | — | — | Service base path for service generation |
| `--use-records-for-objects` | — | No | `false` | Generate Ballerina records instead of service classes for object types |

### Client Mode Additional Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `-d`, `--documents` | Yes (client mode) | — | Path to a file containing GraphQL queries and mutations |

## Generate a GraphQL Service

Generate a Ballerina service skeleton from a GraphQL SDL schema file.

### Example SDL Schema

```graphql
# schema.graphql
type Query {
    book(id: ID!): Book
    books(author: String): [Book!]!
}

type Mutation {
    addBook(input: BookInput!): Book!
}

type Book {
    id: ID!
    title: String!
    author: String!
    year: Int
}

input BookInput {
    title: String!
    author: String!
    year: Int
}
```

### Generate Service

```bash
# Generate service skeleton from SDL
bal graphql -i schema.graphql --mode service

# Generate to a specific directory
bal graphql -i schema.graphql --mode service -o src/

# Generate with a custom service base path
bal graphql -i schema.graphql --mode service -s /api
```

### Generated Service Output

```
service.bal           # Service skeleton with resolver stubs
types.bal             # Ballerina types from the schema
```

### Generated Service Example

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {

    resource function get book(graphql:Field 'field, string id) returns Book? {
        // TODO: Implement resolver
    }

    resource function get books(graphql:Field 'field, string? author) returns Book[] {
        // TODO: Implement resolver
    }

    remote function addBook(BookInput input) returns Book {
        // TODO: Implement mutation
    }
}
```

## Generate a GraphQL Client

Generate a type-safe Ballerina client from a GraphQL schema and a set of query/mutation documents.

### Example Query Document

```graphql
# queries.graphql
query GetBook($id: ID!) {
    book(id: $id) {
        id
        title
        author
    }
}

query ListBooks($author: String) {
    books(author: $author) {
        id
        title
    }
}

mutation AddBook($input: BookInput!) {
    addBook(input: $input) {
        id
        title
    }
}
```

### Generate Client

```bash
# Generate client from schema and query documents
bal graphql -i schema.graphql --mode client -d queries.graphql

# Generate client from a live GraphQL endpoint
bal graphql -i http://localhost:9090/graphql --mode client -d queries.graphql
```

### Generated Client Output

```
client.bal            # GraphQL client with typed operations
types.bal             # Response and input types
utils.bal             # Utility functions
config_types.bal      # Client configuration types
```

### Generated Client Usage

```ballerina
import myapp.graphql_client;

public function main() returns error? {
    graphql_client:Client cl = check new ("http://localhost:9090/graphql");

    // Execute a query
    graphql_client:GetBookResponse bookResp = check cl->getBook(id = "1");
    string? title = bookResp?.book?.title;

    // Execute a mutation
    graphql_client:BookInput input = {
        title: "New Book",
        author: "Author Name",
        year: 2024
    };
    graphql_client:AddBookResponse addResp = check cl->addBook(input);
}
```

## Export Schema from Service

Generate a GraphQL SDL schema file from an existing Ballerina GraphQL service.

```bash
# Export SDL from a Ballerina service
bal graphql -i service.bal --mode schema

# Export to a specific output directory
bal graphql -i service.bal --mode schema -o specs/
```

## GraphQL to Ballerina Type Mapping

| GraphQL Type | Ballerina Type |
|-------------|----------------|
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

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Services Guide](/develop/build/services.md) -- Building services
- [Ballerina by Example](/reference/by-example.md) -- Runnable examples
