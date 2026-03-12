---
sidebar_position: 4
title: Import External Integrations
description: Import integration projects from WSO2 MI, OpenAPI specifications, AsyncAPI documents, and other external sources.
---

# Import External Integrations

Bring existing integrations into WSO2 Integrator from external sources. Import from OpenAPI specifications, AsyncAPI documents, Protocol Buffer definitions, database schemas, or migrate from WSO2 Micro Integrator (MI) projects.

## Import from OpenAPI Specification

Generate an HTTP service skeleton from an OpenAPI (Swagger) definition:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Select **WSO2 Integrator: Import from OpenAPI**.
3. Provide the path to the OpenAPI file (YAML or JSON) or a URL.
4. Choose the target directory for the generated project.

<!-- TODO: Screenshot of the OpenAPI import wizard -->

The importer generates a complete Ballerina service with typed resources for each API operation:

```ballerina
// Generated from petstore.yaml
import ballerina/http;

type Pet record {|
    int id;
    string name;
    string status;
|};

service /v1 on new http:Listener(8090) {

    resource function get pets(string? status) returns Pet[]|error {
        // TODO: Implement - List all pets, optionally filtered by status
        return [];
    }

    resource function get pets/[int petId]() returns Pet|http:NotFound|error {
        // TODO: Implement - Find pet by ID
        return http:NOT_FOUND;
    }

    resource function post pets(Pet pet) returns http:Created|http:BadRequest|error {
        // TODO: Implement - Create a new pet
        return http:CREATED;
    }
}
```

### CLI Alternative

```bash
# Generate a Ballerina service from an OpenAPI spec
bal openapi -i petstore.yaml --mode service -o petstore-service
```

## Import from AsyncAPI Document

Generate event handler stubs from an AsyncAPI specification:

1. Open the Command Palette.
2. Select **WSO2 Integrator: Import from AsyncAPI**.
3. Provide the AsyncAPI document path or URL.

The importer creates listener services for each channel defined in the document, with typed message payloads.

## Import from Protocol Buffers (gRPC)

Generate a gRPC service from `.proto` files:

```bash
# Generate Ballerina stubs from a proto file
bal grpc --input order_service.proto --output order-grpc-service
```

This produces:

- A service skeleton with all RPC methods stubbed out
- Message types as Ballerina records
- A client stub for testing

```ballerina
// Generated gRPC service skeleton
import ballerina/grpc;

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on new grpc:Listener(9090) {

    remote function createOrder(Order request) returns OrderResponse|error {
        // TODO: Implement order creation
        return {orderId: "", status: "PENDING"};
    }

    remote function getOrder(OrderRequest request) returns Order|error {
        // TODO: Implement order retrieval
        return error("Not implemented");
    }
}
```

## Import from Database Schema

Generate a data service from an existing database schema:

1. Open the Command Palette.
2. Select **WSO2 Integrator: Import from Database**.
3. Enter database connection details (host, port, credentials, database name).
4. Select the tables to include.

The importer introspects the schema and generates:

- Ballerina record types matching table structures
- A CRUD HTTP service with endpoints for each selected table
- Connection configuration in `Config.toml`

## Migrate from WSO2 Micro Integrator

If you have existing WSO2 MI integration projects (Synapse XML), you can migrate them to WSO2 Integrator:

1. Open the Command Palette.
2. Select **WSO2 Integrator: Migrate from MI**.
3. Select the MI project directory or CAR file.
4. Review the migration report.

<!-- TODO: Screenshot of the migration wizard showing artifact mapping -->

### What Gets Migrated

| MI Artifact | WSO2 Integrator Equivalent |
|---|---|
| API / Proxy Service | HTTP Service |
| Inbound Endpoint (Kafka/RabbitMQ) | Event Handler |
| Scheduled Task | Automation |
| Sequences / Mediators | Functions and Flow Logic |
| Data Services | Database Service with `bal persist` |
| Message Stores / Processors | Connector-based patterns |

:::info Migration Notes
Some MI-specific mediators may require manual conversion. The migration tool generates `// TODO: Manual migration required` comments for any artifacts it cannot automatically convert. Review the migration report for details.
:::

## Import from Ballerina Central

Pull an existing integration package from Ballerina Central and use it as a starting point:

```bash
# Search for packages
bal search healthcare

# Pull a package to inspect it
bal pull wso2/healthcare_integration
```

## Supported Import Formats

| Format | Extension | Import Type |
|---|---|---|
| OpenAPI 3.x | `.yaml`, `.json` | HTTP Service |
| AsyncAPI 2.x | `.yaml`, `.json` | Event Handler |
| Protocol Buffers | `.proto` | gRPC Service |
| GraphQL Schema | `.graphql` | GraphQL Service |
| WSDL | `.wsdl` | SOAP-compatible Service |
| WSO2 MI Project | directory / `.car` | Full Migration |

## What's Next

- [Integration Artifacts](/docs/develop/integration-artifacts) -- Understand the artifact types in your imported project
- [Design Logic](/docs/develop/design-logic) -- Build the integration logic for your imported stubs
