---
title: Test services and clients
---

# Test services and clients

Integration tests for services work differently from unit tests: instead of calling a function directly, you spin up the service and send real HTTP requests to it. The Ballerina test framework handles the service lifecycle for you — services defined in a module start automatically when its tests run and stop when they finish. You focus on writing the requests and asserting the responses.

## Test a service

Create an HTTP client in your test file that targets the service's port. Call the resources as you would from any other client, then use assertions to verify the responses cover both the happy path and error cases.

```ballerina
import ballerina/http;
import ballerina/test;

// This service starts automatically when the tests in this module run.
service http:Service /orders on new http:Listener(9090) {

    resource function get [int id]() returns http:Ok|http:NotFound {
        if id <= 0 {
            return <http:NotFound>{body: "Order not found"};
        }
        return <http:Ok>{body: {orderId: id, status: "pending"}};
    }
}

http:Client testClient = check new ("http://localhost:9090/orders");

@test:Config
function testGetOrder() returns error? {
    // Happy path — valid order ID returns 200.
    http:Response response = check testClient->/[42].get();
    test:assertEquals(response.statusCode, http:STATUS_OK);

    // Error path — invalid ID returns 404.
    response = check testClient->/[-1].get();
    test:assertEquals(response.statusCode, http:STATUS_NOT_FOUND);
    test:assertEquals(response.getTextPayload(), "Order not found");
}
```

The service starts automatically only when the test module is the same module where the service is defined.

## Mock an external client

When your integration calls an external API, you should not make real network calls during testing — the external service may be unavailable, slow, or charge per request. Object mocking lets you intercept those calls and return the exact response the test needs, making your tests fast, deterministic, and offline-capable.

```ballerina
import ballerina/http;
import ballerina/test;

http:Client paymentGateway = check new ("https://payments.example.com");

type PaymentResult readonly & record {
    string status;
    string transactionId;
};

function chargeCard(decimal amount) returns PaymentResult|error {
    return check paymentGateway->post("/charge", {amount: amount});
}

@test:Config
function testSuccessfulCharge() {
    // Replace the real gateway client with a mock before the test runs.
    paymentGateway = test:mock(http:Client);

    // Define what the mock returns when `post` is called.
    PaymentResult mockResult = {status: "approved", transactionId: "TXN-001"};
    test:prepare(paymentGateway).when("post").thenReturn(mockResult);

    PaymentResult|error result = chargeCard(49.99d);
    test:assertEquals(result, mockResult);
}
```

### Return different responses per call

When a test calls the same method multiple times and expects different results each time — for example, the first call succeeds and the second simulates a retry — use `thenReturnSequence`.

```ballerina
import ballerina/http;
import ballerina/test;

@test:Config
function testRetryBehaviour() {
    paymentGateway = test:mock(http:Client);

    PaymentResult failure = {status: "declined", transactionId: ""};
    PaymentResult success = {status: "approved", transactionId: "TXN-002"};

    // First call returns failure, second call returns success.
    test:prepare(paymentGateway).when("post").thenReturnSequence(failure, success);

    // First attempt.
    PaymentResult|error first = chargeCard(49.99d);
    test:assertEquals(first, failure);

    // Retry attempt.
    PaymentResult|error second = chargeCard(49.99d);
    test:assertEquals(second, success);
}
```

## Mock a `final` client

Variables declared as `final` cannot be reassigned, which makes them impossible to replace with a mock directly. The solution is to initialize the client inside a separate function and mock that initialization function instead.

```ballerina
import ballerina/http;

// Production code — initialize through a function so the test can intercept it.
final http:Client paymentGateway = check initPaymentClient();

function initPaymentClient() returns http:Client|error {
    return new ("https://payments.example.com");
}
```

```ballerina
import ballerina/http;
import ballerina/test;

// Test file — mock the initialization function so the final variable gets the mock.
@test:Mock {functionName: "initPaymentClient"}
function getMockPaymentClient() returns http:Client|error {
    return test:mock(http:Client);
}
```

## Use separate configuration for tests

Hard-coding hostnames and ports in tests makes them brittle when infrastructure changes. Declare them as configurable variables and override the values in a `tests/Config.toml` file. This way the production and test configuration stay independent.

```ballerina
import ballerina/http;

configurable int servicePort = 9090;
configurable string serviceHost = "http://localhost:9090";

service http:Service /orders on new http:Listener(servicePort) {
    resource function get .() returns json {
        return {status: "ok"};
    }
}
```

```ballerina
import ballerina/http;
import ballerina/test;

configurable string serviceHost = "http://localhost:9090";

http:Client testClient = check new (serviceHost);

@test:Config
function testOrdersEndpoint() returns error? {
    http:Response response = check testClient->get("/orders");
    test:assertEquals(response.statusCode, http:STATUS_OK);
}
```

```toml
# tests/Config.toml — only loaded when running bal test
servicePort = 9091
serviceHost = "http://localhost:9091"
```

## What's next

- [Mocking](mocking.md) — stub resources, member variables, and module functions in detail
- [Write unit tests](unit-testing.md) — `@test:Config` attributes and assertions reference
