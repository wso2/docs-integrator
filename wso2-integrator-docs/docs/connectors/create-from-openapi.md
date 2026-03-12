---
sidebar_position: 10
title: "Create a Connector from OpenAPI"
description: "Generate a type-safe WSO2 Integrator connector from any OpenAPI specification."
---

# Create a Connector from OpenAPI

Generate a fully typed Ballerina connector from any OpenAPI (Swagger) specification. This lets you integrate with any REST API that publishes an OpenAPI definition, with complete type safety and IDE auto-completion.

## When to Use This Approach

- The target API publishes an OpenAPI 3.x or Swagger 2.0 specification
- No pre-built connector exists on [Ballerina Central](https://central.ballerina.io)
- You want type-safe request/response handling without writing boilerplate HTTP calls

## Prerequisites

- WSO2 Integrator VS Code extension installed
- An OpenAPI specification file (`.yaml` or `.json`) or a URL to one
- Ballerina Swan Lake installed

## Step 1: Obtain the OpenAPI Specification

Download or locate the OpenAPI spec for your target API. Most modern APIs publish their spec at a well-known URL:

```bash
# Download an OpenAPI spec
curl -o petstore.yaml https://petstore3.swagger.io/api/v3/openapi.json
```

## Step 2: Generate the Client

Use the Ballerina OpenAPI tool to generate a type-safe client from the specification:

```bash
# Generate a client from a local file
bal openapi -i petstore.yaml --mode client -o generated/

# Generate from a URL
bal openapi -i https://petstore3.swagger.io/api/v3/openapi.json --mode client -o generated/
```

This creates:

- `client.bal` -- The client with all API operations as methods
- `types.bal` -- Ballerina record types for all request/response schemas
- `utils.bal` -- Helper utilities for serialization and validation

## Step 3: Review the Generated Code

The generated client includes typed methods for every API endpoint:

```ballerina
// Generated types (types.bal)
public type Pet record {|
    int id?;
    string name;
    string status?;
|};

public type PetResponse record {|
    int id;
    string name;
    string status;
    Category category?;
|};

// Generated client (client.bal)
public isolated client class Client {
    final http:Client clientEp;

    public isolated function init(string serviceUrl, http:ClientConfiguration config = {}) returns error? {
        self.clientEp = check new (serviceUrl, config);
    }

    remote isolated function getPetById(int petId) returns PetResponse|error {
        return self.clientEp->get(string `/pet/${petId}`);
    }

    remote isolated function addPet(Pet payload) returns PetResponse|error {
        return self.clientEp->post("/pet", payload);
    }
}
```

## Step 4: Use the Generated Client

Import and use the generated client in your integration:

```ballerina
import ballerina/http;

// Import the generated client module
import myproject/generated as petstore;

configurable string petstoreUrl = ?;

final petstore:Client petstoreClient = check new (petstoreUrl);

service /api on new http:Listener(8090) {
    resource function get pets/[int id]() returns petstore:PetResponse|error {
        return petstoreClient->getPetById(id);
    }

    resource function post pets(petstore:Pet pet) returns petstore:PetResponse|error {
        return petstoreClient->addPet(pet);
    }
}
```

## Step 5: Customize the Connector

### Add Authentication

```ballerina
// API Key authentication
final petstore:Client petstoreClient = check new (petstoreUrl, {
    auth: {
        token: apiKey
    }
});

// OAuth 2.0 authentication
final petstore:Client petstoreClient = check new (petstoreUrl, {
    auth: {
        tokenUrl: "https://auth.example.com/oauth2/token",
        clientId: clientId,
        clientSecret: clientSecret
    }
});
```

### Add Error Handling

```ballerina
function getPetSafely(int petId) returns petstore:PetResponse|error {
    petstore:PetResponse|error result = petstoreClient->getPetById(petId);
    if result is http:ClientRequestError {
        log:printError("Pet not found", petId = petId, statusCode = result.detail().statusCode);
        return error("Pet not found");
    }
    return result;
}
```

### Add Retry and Timeout Configuration

```ballerina
final petstore:Client petstoreClient = check new (petstoreUrl, {
    timeout: 30,
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0,
        maxWaitInterval: 20
    }
});
```

## Advanced: Generate a Full Connector Package

To create a reusable connector package that others can import:

```bash
# Create a new Ballerina package
bal new petstore_connector -t lib

# Generate into the package
bal openapi -i petstore.yaml --mode client -o petstore_connector/

# Build and test
cd petstore_connector
bal build
bal test
```

Then publish to Ballerina Central:

```bash
bal push
```

## Supported OpenAPI Features

| Feature | Support |
|---------|---------|
| OpenAPI 3.0 / 3.1 | Full |
| Swagger 2.0 | Full (auto-converted) |
| JSON / YAML format | Both supported |
| All HTTP methods | GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS |
| Path / Query / Header parameters | Full |
| Request / Response bodies | JSON, XML, form-data |
| Authentication schemes | API Key, Bearer, OAuth 2.0, Basic |
| Nested object schemas | Full |
| Array types | Full |
| Enum types | Full |
| oneOf / anyOf / allOf | Partial (mapped to union types) |

## What's Next

- [Custom Connector Development](custom-development.md) -- Build connectors from scratch
- [Using Ballerina Libraries](ballerina-libraries.md) -- Import packages from Central
- [Publish to Ballerina Central](publish-to-central.md) -- Share your connector
- [Authentication Methods](authentication.md) -- Configure auth for generated clients
