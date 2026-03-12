---
sidebar_position: 3
title: bal openapi CLI
description: Reference for the bal openapi CLI tool — generate Ballerina services and clients from OpenAPI specifications, and export OpenAPI specs from Ballerina services.
---

# bal openapi CLI

The `bal openapi` tool generates Ballerina source code from OpenAPI specifications and exports OpenAPI specifications from existing Ballerina services. It supports OpenAPI 2.0 (Swagger) and OpenAPI 3.0.x/3.1.x specifications in JSON and YAML formats.

## Commands Overview

| Command | Description |
|---------|-------------|
| `bal openapi` | Generate Ballerina source from an OpenAPI spec (default behavior) |
| `bal openapi -i <spec>` | Generate Ballerina client and/or service from an OpenAPI spec |
| `bal openapi export <module>` | Export an OpenAPI spec from a Ballerina service |

## Generate Command

Generates Ballerina source code (service stubs, client connectors, or both) from an OpenAPI specification file.

### Syntax

```bash
bal openapi -i <openapi-spec-path> [options]
```

### Flags

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
| `--with-service-type` | — | No | `false` | Generate a service type (interface) for service validation |
| `--license` | — | No | — | Path to a license header file to include in generated files |
| `--status-code-binding` | — | No | `false` | Generate status-code-specific return types |
| `--single-file` | — | No | `false` | Generate all types and client/service in a single file |

### Examples

```bash
# Generate both client and service from a spec
bal openapi -i petstore.yaml

# Generate only the client connector
bal openapi -i petstore.yaml --mode client

# Generate only the service stub
bal openapi -i petstore.yaml --mode service

# Generate with specific tags
bal openapi -i petstore.yaml --tags pets,store

# Generate with specific operations
bal openapi -i petstore.yaml --operations listPets,createPet

# Generate to a specific output directory
bal openapi -i petstore.yaml -o generated/

# Generate client with remote methods instead of resource methods
bal openapi -i petstore.yaml --mode client --client-methods remote

# Generate with test skeletons
bal openapi -i petstore.yaml --mode client --with-tests

# Generate with service type for compile-time validation
bal openapi -i petstore.yaml --mode service --with-service-type

# Generate with status-code-specific return types
bal openapi -i petstore.yaml --mode client --status-code-binding
```

### Generated Files (Client Mode)

```
client.bal                # HTTP client connector with typed methods
types.bal                 # Ballerina record types from OpenAPI schemas
utils.bal                 # Utility functions for serialization
client_test.bal           # Test skeletons (if --with-tests is used)
```

### Generated Files (Service Mode)

```
service.bal               # Service stub with resource functions
types.bal                 # Ballerina record types from OpenAPI schemas
service_type.bal          # Service type definition (if --with-service-type)
service_test.bal          # Test skeletons (if --with-tests is used)
```

### Generated Client Example

```ballerina
// Auto-generated client from petstore.yaml
import ballerina/http;

public isolated client class Client {
    final http:Client clientEp;

    public isolated function init(string serviceUrl, http:ClientConfiguration config = {}) returns error? {
        self.clientEp = check new (serviceUrl, config);
    }

    // List all pets
    resource function get pets(int? 'limit) returns Pet[]|error {
        string resourcePath = "/pets";
        map<anydata> queryParam = {"limit": 'limit};
        resourcePath = resourcePath + check getPathForQueryParam(queryParam);
        return self.clientEp->get(resourcePath);
    }

    // Create a pet
    resource function post pets(Pet payload) returns http:Created|error {
        return self.clientEp->post("/pets", payload);
    }
}
```

## Export Command

Exports an OpenAPI specification from an existing Ballerina HTTP service.

### Syntax

```bash
bal openapi export <ballerina-file> [options]
```

### Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `-s`, `--service` | No | All services | Base path of the service to export |
| `-o`, `--output` | No | Current directory | Output directory for the specification file |
| `--json` | No | `false` | Export in JSON format (default is YAML) |

### Examples

```bash
# Export OpenAPI spec from a Ballerina service
bal openapi export service.bal

# Export a specific service by base path
bal openapi export service.bal -s /api/v1

# Export in JSON format
bal openapi export service.bal --json

# Export to a specific directory
bal openapi export service.bal -o specs/
```

### Service Annotations for Export

Add annotations to your Ballerina service to enrich the exported OpenAPI spec:

```ballerina
@http:ServiceConfig {
    mediaTypeSubtypePrefix: "vnd.myapp"
}
@openapi:ServiceInfo {
    title: "Pet Store API",
    'version: "1.0.0",
    description: "A sample API for managing pets"
}
service /api/v1 on new http:Listener(8080) {

    @openapi:ResourceInfo {
        summary: "List all pets",
        tags: ["pets"],
        operationId: "listPets"
    }
    resource function get pets() returns Pet[] {
        // ...
    }
}
```

## OpenAPI to Ballerina Type Mapping

| OpenAPI Type | OpenAPI Format | Ballerina Type |
|-------------|---------------|----------------|
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
| `allOf` | — | Intersection type |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Services Guide](/develop/build/services.md) -- Building HTTP services
- [Ballerina by Example](/reference/by-example.md) -- Runnable examples
