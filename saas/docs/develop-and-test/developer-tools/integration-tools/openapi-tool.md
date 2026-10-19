---
title: OpenAPI Tool
---

# OpenAPI Tool

The `bal openapi` tool bridges OpenAPI specifications and Ballerina code. It generates type-safe Ballerina service stubs and client connectors from OpenAPI (Swagger) YAML or JSON files, and can also export an OpenAPI specification from an existing Ballerina service. This keeps your integrations aligned with the API contract and removes the need to write boilerplate code.

## Generating a Ballerina service from OpenAPI

Create a service skeleton that matches an OpenAPI specification. The generated code includes resource functions, request/response types, and validation constraints.

1. In the canvas, click **+ Add Artifact** (or **Add Artifact manually** if the integration has no artifacts yet), or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **HTTP Service** under **Integration as API**.
3. Select **Import From OpenAPI Specification** under **Service Contract**.

   <ThemedImage
       alt="Select Import From OpenAPI Specification"
       sources={{
           light: useBaseUrl('/img/develop/tools/openapi-tool/step-import-spec.png'),
           dark: useBaseUrl('/img/develop/tools/openapi-tool/step-import-spec.png'),
       }}
   />

4. Click **Select File** and choose your OpenAPI specification file (YAML or JSON).
5. Enter a **Service Type Name**. Optionally, expand **Advanced Configurations** to choose between the **Shared Listener (Port 9090)** and a **Custom Listener**.
6. Click **Create**.
7. WSO2 Integrator generates the service with resource function stubs, request/response types, and validation constraints matching your OpenAPI specification.

### Basic service generation

```bash
# Generate a service stub from an OpenAPI spec
bal openapi -i openapi.yaml --mode service

# Generate a service contract type from an OpenAPI spec
bal openapi -i openapi.yaml --mode service --with-service-contract
```

### Generated service structure

For an OpenAPI spec defining a `/orders` resource, the tool generates:

```
project/
├── service_contract.bal    # Service contract type with resource function definitions
├── types.bal               # Request/response record types
```

The generated service contract file contains a service type with resource functions that match each OpenAPI operation:

```ballerina
import ballerina/http;

@http:ServiceConfig {basePath: "/api"}
type OASServiceType service object {
    *http:ServiceContract;

    // GET /orders
    resource function get orders(string? status, int 'limit = 20)
            returns Order[]|http:InternalServerError;

    // POST /orders
    resource function post orders(OrderRequest payload)
            returns http:Created|http:BadRequest;

    // GET /orders/{orderId}
    resource function get orders/[string orderId]()
            returns Order|http:NotFound;
};
```

The generated types file includes record definitions derived from the OpenAPI schemas:

```ballerina
// Auto-generated from OpenAPI schema definitions
type Order record {|
    string id;
    string customerId;
    LineItem[] items;
    decimal total;
    "PENDING"|"CONFIRMED"|"SHIPPED" status;
|};

type OrderRequest record {|
    string customerId;
    LineItem[] items;
|};

type LineItem record {|
    string productId;
    int quantity;
    decimal unitPrice;
|};
```

To implement the service, attach the generated service contract type to an HTTP listener and implement each resource function:

```ballerina
import ballerina/http;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service OASServiceType on httpDefaultListener {

    // GET /orders
    resource function get orders(string? status, int 'limit = 20)
            returns Order[]|http:InternalServerError {
        // TODO: Implement logic
    }

    // POST /orders
    resource function post orders(OrderRequest payload)
            returns http:Created|http:BadRequest {
        // TODO: Implement logic
    }

    // GET /orders/{orderId}
    resource function get orders/[string orderId]()
            returns Order|http:NotFound {
        // TODO: Implement logic
    }
}
```

## Generating a Ballerina client from OpenAPI

Create a type-safe HTTP client that wraps all API operations defined in the spec.

1. In the canvas, click **+ Add Artifact** (or **Add Artifact manually** if the integration has no artifacts yet).
2. In the **Artifacts** panel, select **Connection** under **Other Artifacts**.
3. Select **Connect via API Specification**. In the **Import API Specification** step, keep **Specification Type** as **OpenAPI**, enter a **Connector Name**, choose your OpenAPI specification file under **Import Specification File**, and click **Save Connector**.

   <ThemedImage
       alt="Client generation from OpenAPI"
       sources={{
           light: useBaseUrl('/img/develop/tools/openapi-tool/step-client-generation.png'),
           dark: useBaseUrl('/img/develop/tools/openapi-tool/step-client-generation.png'),
       }}
   />

4. In the **Create Connection** step, configure the optional connection settings:

   - **Config**: The configurations to use when initializing the connector.
   - **Service Url**: URL of the target service.

   <ThemedImage
       alt="Connection details configuration"
       sources={{
           light: useBaseUrl('/img/develop/tools/openapi-tool/step-connection-details.png'),
           dark: useBaseUrl('/img/develop/tools/openapi-tool/step-connection-details.png'),
       }}
   />

5. Enter a **Connection Name** for the generated client (for example, `openapiClient`).
6. Click **Save Connection**.
7. WSO2 Integrator generates a type-safe client connector with methods matching each API operation.

### Basic client generation

```bash
# Generate a client connector
bal openapi -i openapi.yaml --mode client

# Generate client with remote methods
bal openapi -i openapi.yaml --mode client --client-methods remote
```

### Using the generated client

```ballerina
import ballerina/http;

configurable string apiUrl = ?;
configurable string apiKey = ?;

final Client orderClient = check new (apiUrl, {
    httpVersion: http:HTTP_1_1,
    customHeaders: {"X-API-Key": apiKey}
});

function getOrders(string? status) returns Order[]|error {
    // The client method name matches the operationId from the spec
    return orderClient->getOrders(status = status);
}

function createOrder(OrderRequest req) returns Order|error {
    return orderClient->createOrder(req);
}
```

## Generating both service and client

```bash
# Generate service and client together
bal openapi -i openapi.yaml

# This creates both:
#   openapi_service.bal  -- Service stub
#   client.bal           -- Client connector
#   types.bal            -- Shared types
```

## Exporting OpenAPI from a Ballerina service

Generate an OpenAPI specification from an existing Ballerina HTTP service:

1. Open the HTTP service in the **Service Designer**.
2. Click the **⋮** (more options) icon in the service header.
3. Select **Export OpenAPI Spec**.

   <ThemedImage
       alt="Export OpenAPI from service"
       sources={{
           light: useBaseUrl('/img/develop/tools/openapi-tool/step-export.png'),
           dark: useBaseUrl('/img/develop/tools/openapi-tool/step-export.png'),
       }}
   />

4. Choose the folder to save the specification in, and click **Select OAS Save Location**.

```bash
# Export OpenAPI spec from a Ballerina project
bal openapi -i service.bal

# Export as a JSON file
bal openapi -i service.bal --json

# Export to a specific file
bal openapi -i service.bal -o api-spec/
```

Given this service:

```ballerina
service /api on new http:Listener(8090) {
    resource function get orders() returns Order[]|error { ... }
    resource function post orders(OrderRequest req) returns Order|http:BadRequest|error { ... }
    resource function get orders/[string id]() returns Order|http:NotFound|error { ... }
}
```

The tool produces an OpenAPI YAML describing the paths, request/response schemas, and status codes.

## Command reference

### Generate flags

```bash
bal openapi -i <openapi-spec-path> [options]
```

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-i`, `--input` | — | Yes | — | Path to the OpenAPI specification file (YAML or JSON) |
| `--mode` | — | No | Both | Generation mode: `client`, `service`, or omit for both |
| `-o`, `--output` | — | No | Current directory | Output directory for generated files |
| `--tags` | — | No | All tags | Comma-separated list of tags to include |
| `--operations` | — | No | All operations | Comma-separated list of operation IDs to include |
| `--nullable` | — | No | `false` | Generate nullable types for optional fields |
| `--client-methods` | — | No | `resource` | Client method type: `resource` or `remote` |
| `--with-tests` | — | No | `false` | Generate test skeletons for the client or service |
| `--with-service-contract` | — | No | `false` | Generate a service contract type for compile-time service validation |
| `--license` | — | No | — | Path to a license header file to include in generated files |
| `--status-code-binding` | — | No | `false` | Generate status-code-specific return types |
| `--single-file` | — | No | `false` | Generate all types and client/service in a single file |

### Export flags

```bash
bal openapi -i <ballerina-service-file> [options]
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `-s`, `--service` | No | All services | Base path of the service to export |
| `-o`, `--output` | No | Current directory | Output directory for the specification file |
| `--json` | No | `false` | Export in JSON format (default is YAML) |

## Customizing generated code

### Filtering by tags or operations

```bash
# Generate only order-related operations
bal openapi -i openapi.yaml --mode service --tags orders

# Generate specific operations
bal openapi -i openapi.yaml --mode client --operations getOrders,createOrder
```

### Handling nullable fields

```bash
# Treat all optional fields as nullable
bal openapi -i openapi.yaml --nullable
```

## Workflow examples

**Connecting to an external API**

If the API provider supplies an OpenAPI spec, generate a type-safe client from it. The tool derives the endpoints, operations, and request/response types from the spec, so you don't have to define them manually as you would with a generic HTTP connector.

1. Obtain the OpenAPI spec from the API provider.
2. Generate the client: `bal openapi -i partner-api.yaml --mode client`
3. Use the generated client and types in your integration logic.

**Contract-first service design**

Design your API as an OpenAPI spec first, then generate service stubs from it. The generated service contract type is validated at compile time, so your implementation can't drift from the agreed contract.

1. Author your OpenAPI spec.
2. Generate service stubs: `bal openapi -i my-api.yaml --mode service --with-service-contract`
3. Implement the generated resource functions.

**Publishing your API**

Once your service is built, export its OpenAPI specification and share it with consumers. They can then use it to generate their own type-safe clients, just as you would when connecting to an external API.

1. Export the spec from your service: `bal openapi -i service.bal`
2. Share the generated spec with your API consumers.

## OpenAPI to Ballerina type mapping

| OpenAPI type | OpenAPI format | Ballerina type |
|---|---|---|
| `string` | — | `string` |
| `string` | `date` | `string` |
| `string` | `date-time` | `string` |
| `string` | `byte` | `byte[]` |
| `string` | `binary` | `byte[]` |
| `integer` | `int32` | `int` |
| `integer` | `int64` | `int` |
| `number` | `float` | `float` |
| `number` | `double` | `decimal` |
| `boolean` | — | `boolean` |
| `array` | — | `T[]` |
| `object` | — | `record {}` |
| `oneOf` | — | Union type |
| `allOf` | — | Type inclusion |

## What's next

- [GraphQL Tool](graphql-tool.md) — Generate GraphQL services from SDL schemas
- [gRPC Tool](grpc-tool.md) — Generate gRPC services from Protocol Buffer definitions
- [Flow Diagram editor](../../../editor/canvases/flow-canvas/flow-canvas.md) — Build logic visually on top of generated stubs
