---
title: GraphQL Tool
---

# GraphQL Tool

The `bal graphql` tool generates Ballerina service skeletons and client code from GraphQL Schema Definition Language (SDL) files. It creates type-safe resolver stubs, input/output types, and client operations that match your GraphQL schema, letting you focus on implementing business logic rather than writing boilerplate.

## Generating a service from a GraphQL schema

1. Click the **+** **Add Artifacts** button in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **GraphQL Service** under **Integration as API**.
3. Select **Import From GraphQL Schema** under **Service Contract**.

   <ThemedImage
       alt="Import GraphQL schema"
       sources={{
           light: useBaseUrl('/img/develop/tools/graphql-tool/step-import-schema.png'),
           dark: useBaseUrl('/img/develop/tools/graphql-tool/step-import-schema.png'),
       }}
   />

4. Browse or enter the path to your GraphQL SDL file.
5. Configure the **Service Base Path** and listener settings.
6. Click **Create**.
7. WSO2 Integrator generates the service with resolver stubs and types matching your GraphQL schema.

### Basic service generation

```bash
# Generate a Ballerina GraphQL service from an SDL file
bal graphql -i schema.graphql --mode service

# Specify output directory
bal graphql -i schema.graphql --mode service -o generated/

# Generate record types instead of service classes for object types where possible
bal graphql -i schema.graphql --mode service --use-records-for-objects
```

### Command usage for service generation

```bash
 bal graphql [-i | --input] <graphql-schema-file-path>
              [-o | --output] <output-location>
              [-m | --mode] service
              [-r | --use-records-for-objects]
```

### Command options for service generation

| Command option      | Description | Mandatory/Optional |
|----------------|-------------|--------------------|
| `-i, --input`     | The `input` command option specifies the path of the GraphQL schema file (for example, `schema.graphql`). | Mandatory          |
| `-o, --output`   | The `output` command option specifies the output location of the generated files. If this command option is not specified, the Ballerina files will be generated at the same location in which the `bal graphql` command is executed. | Optional           |
| `-m, --mode`   | The `mode` parameter specifies the operation mode. It indicates the way to process the schema file. If the `mode` flag is not specified, the `graphql` tool will infer the mode from the `input` file extension. The mode should be `service` for the service generation. | Optional           |
| `-r, --use-records-for-objects`   | The `use-records-for-objects` flag generates record types instead of service classes for GraphQL object types where possible. This flag can only be used with the `service` mode. | Optional           |

### Example schema

Given the following `schema.graphql`:

```graphql
type Query {
    customer(id: ID!): Customer
    orders(customerId: ID!, first: Int = 10): [Order!]!
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

The tool generates two files: `types.bal` and `service.bal`.

`types.bal` contains a service object type named after the schema file, and the types used in the schema. By default, GraphQL object types are generated as service classes:

```ballerina
import ballerina/graphql;

type schema service object {
    *graphql:Service;
    resource function get customer(@graphql:ID string id) returns Customer?;
    resource function get orders(@graphql:ID string customerId, int? first = 10) returns Order[];
    remote function createOrder(OrderInput input) returns Order;
    remote function updateOrderStatus(@graphql:ID string orderId, OrderStatus status) returns Order;
};

public type OrderInput record {|
    @graphql:ID
    string customerId;
    LineItemInput[] items;
|};

public type LineItemInput record {|
    @graphql:ID
    string productId;
    int quantity;
|};

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}

public distinct service class Customer {
    resource function get id() returns @graphql:ID string {
    }

    resource function get name() returns string {
    }

    resource function get email() returns string {
    }

    resource function get orders() returns Order[] {
    }
}

public distinct service class Order {
    resource function get id() returns @graphql:ID string {
    }

    resource function get customerId() returns @graphql:ID string {
    }

    resource function get items() returns LineItem[] {
    }

    resource function get total() returns float {
    }

    resource function get status() returns OrderStatus {
    }
}

public distinct service class LineItem {
    resource function get productId() returns @graphql:ID string {
    }

    resource function get quantity() returns int {
    }

    resource function get unitPrice() returns float {
    }
}
```

`service.bal` contains the service that implements the service object type, with a resolver stub for each `Query` and `Mutation` field:

```ballerina
import ballerina/graphql;

configurable int port = 9090;

service schema on new graphql:Listener(port) {
    resource function get customer(@graphql:ID string id) returns Customer? {
    }

    resource function get orders(@graphql:ID string customerId, int? first = 10) returns Order[] {
    }

    remote function createOrder(OrderInput input) returns Order {
    }

    remote function updateOrderStatus(@graphql:ID string orderId, OrderStatus status) returns Order {
    }
}
```

## Exporting a GraphQL schema from an existing GraphQL service

Schema generation from GraphQL service is currently supported only through the Ballerina CLI (pro-code). Visual Designer support for GraphQL schema generation is not yet available.

Generate a GraphQL SDL file from an existing Ballerina GraphQL service:

```bash
 # Export SDL from a Ballerina service
 bal graphql -i service.bal --mode schema

 # Export to a specific directory
 bal graphql -i service.bal --mode schema -o schema/
```

### Command usage for schema generation

```bash
 bal graphql [-i | --input] <ballerina-graphql-service-file-path>
              [-o | --output] <output-location>
              [-s | --service] <service-base-path>
```

### Command options for schema generation

| Command option      | Description                                                                                                                                                                                                                                                                                                                                                                     | Mandatory/Optional |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `-i, --input`     | The `input` command option specifies the path of the Ballerina GraphQL service file (for example, `service.bal`).                                                                                                                                                                                                    | Mandatory          |
| `-o, --output`   | The `output` command option specifies the output location of the generated GraphQL schema files. If this command option is not specified, the schema files will be generated at the same location in which the `bal graphql` command is executed.                                                                                                                                                                                                                   | Optional           |
| `-m, --mode`   | The `mode` parameter specifies the operation mode. It indicates the way to process the schema file. If the `mode` flag is not specified, the `graphql` tool will infer the mode from the `input` file extension. The mode should be `schema` for the schema generation.                                                                                                                                                                                                                | Optional           |
| `-s, --service`   | The `service` command option specifies the base path of the Ballerina GraphQL service of which the schema needs to be generated. If this command option is not specified, schemas will be generated for each of the GraphQL services in the given file.                                                                                                                                                                                                                  | Optional           |

## Generating a client from a GraphQL schema (experimental)

Client generation from GraphQL schemas is currently supported only through the Ballerina CLI (pro-code). Visual Designer support for GraphQL client generation is not yet available.

- Create a `queries.graphql` file with the operations your client needs.

```graphql
 query GetCustomer($id: ID!) {
     customer(id: $id) {
         id
         name
         email
     }
 }

 query GetOrders($customerId: ID!, $first: Int) {
     orders(customerId: $customerId, first: $first) {
         id
         total
         status
     }
 }

```

- Create a `graphql.config.yaml` configuration file that specifies the schema and query documents as follows.

```yaml
 schema: schema.graphql
 documents:
   - queries.graphql
```

- Generate the client by running the following command.

```bash
 bal graphql -i graphql.config.yaml
```

### Command usage for client generation

```bash
 bal graphql [-i | --input] <graphql-configuration-file-path>
              [-o | --output] <output-location>
```

### Command options for client generation

| Command option      | Description                                                                                                                                                                                                                                                                                                                                                                     | Mandatory/Optional |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `-i, --input`     | The `input` command option specifies the path of the GraphQL config file (for example, `graphql.config.yaml`) configured with GraphQL schemas specified by the Schema Definition Language and GraphQL documents.                                                                                                                                                                                                   | Mandatory          |
| `-o, --output`   | The `output` command option specifies the path of the output location of the generated files. If this command option is not specified, the Ballerina files will be generated at the same location in which the `bal graphql` command is executed.                                                                                                                                                                                                                   | Optional           |
| `-m, --mode`   | The `mode` parameter specifies the operation mode. It indicates the way to process the schema file. If the `mode` flag is not specified, the `graphql` tool will infer the mode from the `input` file extension. The mode should be `client` for the client generation.                                                                                                                                                                                                               | Optional           |

## What's next

- [AsyncAPI Tool](asyncapi-tool.md) — Generate event-driven services from AsyncAPI specs
- [OpenAPI Tool](openapi-tool.md) — Generate REST services and clients
- [Flow Diagram Editor](../../../editor/canvases/flow-canvas/flow-canvas.md) — Switch to pro-code to write advanced GraphQL resolver logic
