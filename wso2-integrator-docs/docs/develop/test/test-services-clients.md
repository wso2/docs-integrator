---
sidebar_position: 6
title: Test Services & Clients
description: Write integration tests for HTTP services, clients, and listener-based components.
---

# Test Services & Clients

Validate your integration endpoints end-to-end by testing HTTP services, clients, and listener-based components. Ballerina's test framework lets you start services within tests and send real requests against them, giving you confidence that your integration behaves correctly at the network boundary.

## Testing HTTP Services

Start your service in a test and send requests using an HTTP test client.

```ballerina
import ballerina/http;
import ballerina/test;

// The service under test
service /api on new http:Listener(9090) {

    resource function get greeting(string name) returns string {
        return "Hello, " + name + "!";
    }

    resource function post orders(http:Request req) returns http:Created|error {
        json payload = check req.getJsonPayload();
        // Process order...
        return http:CREATED;
    }
}

// Test client targeting the service
http:Client testClient = check new ("http://localhost:9090");

@test:Config {}
function testGreetingEndpoint() returns error? {
    string response = check testClient->/api/greeting(name = "Alice");
    test:assertEquals(response, "Hello, Alice!");
}

@test:Config {}
function testCreateOrder() returns error? {
    json orderPayload = {
        "item": "Widget",
        "quantity": 5
    };

    http:Response response = check testClient->/api/orders.post(orderPayload);
    test:assertEquals(response.statusCode, 201);
}
```

## Testing Response Status Codes and Headers

Verify HTTP response details beyond the body.

```ballerina
import ballerina/http;
import ballerina/test;

http:Client testClient = check new ("http://localhost:9090");

@test:Config {}
function testNotFoundResponse() returns error? {
    http:Response response = check testClient->/api/orders/["INVALID-ID"];
    test:assertEquals(response.statusCode, 404);

    json body = check response.getJsonPayload();
    test:assertEquals(body.message, "Order not found");
}

@test:Config {}
function testResponseHeaders() returns error? {
    http:Response response = check testClient->/api/greeting(name = "Bob");

    string contentType = check response.getHeader("Content-Type");
    test:assertTrue(contentType.startsWith("text/plain"));
}
```

## Testing with Mock Backend Services

When your service calls an upstream API, create a mock backend for deterministic tests.

```ballerina
import ballerina/http;
import ballerina/test;

// Mock backend service that simulates an external API
service /mock\-api on new http:Listener(9095) {

    resource function get users/[string id]() returns json {
        return {
            "id": id,
            "name": "Test User",
            "email": "test@example.com"
        };
    }
}

// Configure the service under test to point to the mock
@test:Config {}
function testServiceWithMockBackend() returns error? {
    // Service under test calls localhost:9095 instead of the real upstream
    http:Client client = check new ("http://localhost:9090");

    json response = check client->/api/enriched\-users/["U123"];
    test:assertEquals(response.name, "Test User");
}
```

## Testing WebSocket Services

Test bidirectional WebSocket communication.

```ballerina
import ballerina/websocket;
import ballerina/test;
import ballerina/lang.runtime;

@test:Config {}
function testWebSocketEcho() returns error? {
    websocket:Client wsClient = check new ("ws://localhost:9090/ws/echo");

    // Send a message
    check wsClient->writeMessage("Hello WebSocket");

    // Read the echoed response
    string response = check wsClient->readMessage();
    test:assertEquals(response, "Hello WebSocket");

    // Clean up
    check wsClient->close();
}
```

## Testing Client Connectors

Test outbound client calls by verifying request construction and response handling.

```ballerina
import ballerina/http;
import ballerina/test;

// Client wrapper under test
public function getOrderStatus(http:Client client, string orderId)
        returns string|error {
    json response = check client->/orders/[orderId]/status;
    return check response.status;
}

// Mock service for the client test
service /orders on new http:Listener(9096) {

    resource function get [string orderId]/status() returns json {
        return {"status": "shipped", "trackingId": "TRK-12345"};
    }
}

@test:Config {}
function testGetOrderStatus() returns error? {
    http:Client mockClient = check new ("http://localhost:9096");
    string status = check getOrderStatus(mockClient, "ORD-001");
    test:assertEquals(status, "shipped");
}
```

## Testing Error Scenarios

Validate that your services handle errors correctly.

```ballerina
import ballerina/http;
import ballerina/test;

@test:Config {}
function testBadRequestHandling() returns error? {
    http:Client client = check new ("http://localhost:9090");

    // Send malformed payload
    http:Response response = check client->/api/orders.post("not-valid-json");
    test:assertEquals(response.statusCode, 400);
}

@test:Config {}
function testTimeoutHandling() returns error? {
    // Configure a client with a short timeout
    http:Client client = check new ("http://localhost:9090",
        timeout = 1
    );

    // Call an endpoint that takes too long
    json|error response = client->/api/slow\-endpoint;
    test:assertTrue(response is error);
}
```

## Setup and Teardown for Service Tests

Use before/after suite functions to manage test infrastructure.

```ballerina
import ballerina/test;
import ballerina/io;

@test:BeforeSuite
function setupTestEnvironment() {
    io:println("Setting up test database...");
    // Initialize test data, seed database, etc.
}

@test:AfterSuite
function teardownTestEnvironment() {
    io:println("Cleaning up test data...");
    // Remove test data, close connections, etc.
}
```

## Best Practices

- **Use unique ports** for mock services to avoid conflicts with the service under test
- **Test the full request-response cycle** -- verify status codes, headers, and body content
- **Test error paths** as thoroughly as success paths -- validate 4xx and 5xx responses
- **Clean up resources** in `@test:AfterSuite` to prevent port conflicts between test runs
- **Use configurable URLs** in your services so tests can point to mock backends without code changes

## What's Next

- [Data-Driven Tests](data-driven-tests.md) -- Run the same test with multiple input sets
- [Mocking External Services](mocking.md) -- Isolate tests with mock objects and function stubs
- [Unit Testing](unit-testing.md) -- Test individual functions and logic
