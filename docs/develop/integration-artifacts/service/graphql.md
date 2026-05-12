---
title: GraphQL Service
---

# GraphQL Service

GraphQL services let you build flexible APIs where clients request exactly the data they need. WSO2 Integrator supports designing a GraphQL service from scratch or importing an existing GraphQL schema file, and provides a visual canvas to model your schema and implement resolver logic.

:::note Beta
GraphQL service support is currently in beta.

## Creating a GraphQL service

You can create a GraphQL service by designing it from scratch or by importing an existing GraphQL schema file.

**Design from scratch**

1. Open the **WSO2 Integrator** sidebar in VS Code.
2. Click **+** next to **Entry Points**.
3. Select **GraphQL Service**.
4. Select **Design From Scratch**.
5. Fill in the required fields:

   | Field | Description | Default |
   |---|---|---|
   | **Base Path** | Endpoint path for the service | `/graphql` |
   | **Port** | Listener port | `8080` |

6. Optionally expand **Advanced Configurations** and set the **Listener Name** (default: `graphqlListener`).
7. Click **Create**.

![GraphQL service creation form — Design From Scratch](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-creation-form.png)

**Import from schema**

1. Select **Import GraphQL Schema** on the creation form.
2. Click **Select File** and choose your `.graphql` schema file.
3. Optionally expand **Advanced Configurations** and set the **Listener Name**.
4. Click **Create**.

![GraphQL service creation form — Import GraphQL Schema](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-creation-form-import.png)

```ballerina
import ballerina/graphql;

configurable int port = 8080;

listener graphql:Listener graphqlListener = new (port);

service /graphql on graphqlListener {
    // Add query, mutation, and subscription fields
}
```

## GraphQL diagram

After creating the service, WSO2 Integrator opens the **GraphQL diagram** — a canvas that visualizes your service structure, including all operation types (Query, Mutation, Subscription) and the GraphQL types they reference.

![GraphQL diagram canvas](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-graphql-diagram.png)

Use the **Configure** button in the top right to open the service configuration view.

## Service configuration

The **GraphQL Service Configuration** view is opened via the **Configure** button on the GraphQL diagram. It has two sections in the left navigation: **GraphQL Service** and the attached listener (for example, **graphqlListener**).

### GraphQL service settings

| Field | Description |
|---|---|
| **Service Base Path** | The base endpoint path for the GraphQL service (for example, `/graphql`) |
| **Service Configuration** | Service-level settings such as maximum query depth (JSON record) |

The **Configuration for graphqlListener** section on the same panel shows:

| Field | Description |
|---|---|
| **Name** | Name of the attached listener |
| **Listen To** | An `http:Listener` or a port number to listen to the GraphQL service endpoint |
| **Host** | The host name or IP address of the endpoint |

### Listener configuration

Select the listener (for example, **graphqlListener**) in the left navigation to configure its HTTP settings:

| Field | Description | Type |
|---|---|---|
| **HTTP1 Settings** | Configurations related to HTTP/1.x protocol | Record |
| **Secure Socket** | SSL/TLS configurations for the service endpoint — required for HTTPS | Record |
| **HTTP Version** | Highest HTTP version supported by the endpoint | Select |
| **Timeout** | Time in seconds a connection waits for a read/write operation; use `0` to disable | Number |
| **Server** | Server name to appear as a response header | Text |
| **Request Limits** | Configurations associated with inbound request size limits | Record |
| **Graceful Stop Timeout** | Grace period in seconds for a graceful listener stop | Number |
| **Socket Config** | Server socket configuration settings | Record |
| **HTTP2 Initial Window Size** | Initial window size for HTTP/2 connections | Number |
| **Min Idle Time In Stale State** | Minimum time in seconds to keep an HTTP/2 connection open after receiving a GOAWAY; set to `-1` to close after all in-flight streams complete | Number |
| **Time Between Stale Eviction** | Interval in seconds between HTTP/2 stale connection eviction runs | Number |

Click **Save Changes** to apply the configuration. Use **+ Attach Listener** at the bottom of the listener panel to attach an additional listener to the service.

## Creating operations

1. In the GraphQL diagram, click **+ Create Operations** on the service card.
2. The **GraphQL Operations** panel opens on the right, showing **Query**, **Mutation**, and **Subscription** sections.
3. Click **+** next to the relevant operation type to add a field to it.

![GraphQL Operations panel](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-create-operations.png)

Once fields are added, they appear as rows in the panel. Click a field row (for example, `query1` or `mutation1`) to open the **flow designer view** for that operation, where you can define the resolver logic using the visual designer. Use the pencil icon to edit the field definition, or the trash icon to delete it.

```ballerina
service /graphql on graphqlListener {

    // Query
    resource function get product(string id) returns Product|error {
        return getProduct(id);
    }

    // Mutation
    remote function createProduct(ProductInput input) returns Product|error {
        return addProduct(input);
    }

    // Subscription
    resource function subscribe onProductCreated() returns stream<Product, error?> {
        return getProductStream();
    }
}
```

### Operation types

| Operation | Ballerina keyword | Description |
|---|---|---|
| **Query** | `resource function get` | Read data — analogous to HTTP GET |
| **Mutation** | `remote function` | Write data — analogous to HTTP POST/PUT/DELETE |
| **Subscription** | `resource function subscribe` | Real-time updates via WebSocket |

## Adding fields to an operation

After clicking **+** next to an operation type, the **Add Field** panel opens on the right.

| Field | Description |
|---|---|
| **Field Name** | Name of the field (required) |
| **Description** | Optional description shown in the schema |
| **Arguments** | Input arguments — click **+ Add Argument** to add each one |
| **Field Type** | Return type of the field (required) |
| **Field Configuration** | Field-level settings such as cache configuration (JSON) |
| **Request Context** | Pass meta-information of a request among GraphQL resolvers |
| **Field Metadata** | Access meta-information of a field in a GraphQL document |

Click **Save** to add the field.

![Add Field panel](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-add-field.png)

```ballerina
service /graphql on graphqlListener {

    resource function get product(string id) returns Product|error {
        return getProduct(id);
    }
}
```

## Field types

### Scalar types

For basic scalar types (`int`, `decimal`, `float`, `string`), the field type editor displays an **ID Type** checkbox to mark the field as a GraphQL ID type. All field types support a **Nullable** option to allow null values.

### Complex types

When setting a field type, the type picker shows a dropdown of available types grouped by:

- **Within Project** — types defined in the current integration
- **Scalar Types** — built-in scalar types (`int`, `string`, etc.)
- **+ Create New Type** — create a new type inline
- **↗ Open Type Browser** — browse all available types

:::note Type constraints
For **output field types**, WSO2 Integrator supports Object, Enum, and Union types. For **argument types**, only Input Object and Enum types are supported.

When you click **+ Create New Type**, a dialog opens where you can select a **Kind**, provide a **Name**, define fields, and configure advanced options such as **Allow Additional Fields**, **Is Readonly Type**, and **Accessible by Other Integrations**.

![Create new type dialog](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-create-new-type.png)

## Type canvas

As you add fields with complex return types, the canvas displays a type diagram showing the nested structure of your GraphQL types. Each type appears as a node with its fields and their types listed, with connector lines showing relationships between them.

![GraphQL type diagram canvas](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-canvas-with-types.png)

## Implementing service logic

WSO2 Integrator provides two levels at which you can implement resolver logic for a GraphQL service:

| Level | Entry point | Use case |
|---|---|---|
| **Operation level** | Click a field row in the GraphQL Operations panel | Implement the top-level resolver for a query, mutation, or subscription — the logic that runs when a client calls that operation |
| **Service class level** | Edit Type → **Implement** in the canvas | Implement field-level resolvers for a complex return type — the logic that resolves individual fields of an object type |

### Operation-level logic

To implement logic for a root query, mutation, or subscription, click the field row in the **GraphQL Operations** panel (for example, `query1` or `mutation1`). This opens the **flow designer view** directly for that operation, where you can define the integration logic — such as calling a database, invoking an API, or transforming data — that produces the operation's response.

### Service class designer

When a field returns a complex object type, you can implement field-level resolvers through the **Service Class Designer**. To access it:

1. In the canvas, click the three-dot menu (**⋮**) on a type node to open the **Edit Type** panel.
2. Click **Implement** to open the **Service Class Designer**.

![Edit Type panel](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-edit-type.png)

The Service Class Designer lets you:

- Manage **class variables** using **+ Variable**
- View the resolver methods generated for each field of the type — displayed as **GET** methods
- Add additional methods using **+ Method**

![Service Class Designer](../../../../static/img/develop/integration-artifacts/service/graphql-service/step-service-class-designer.png)

Click any resolver method (for example, `GET name1`) to open the **flow diagram view** for that field resolver, where you can define the logic for resolving that specific field of the object type.
