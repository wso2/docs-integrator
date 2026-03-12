---
sidebar_position: 7
title: Data-Driven Tests
description: Run parameterized tests with multiple data sets using Ballerina data providers.
---

# Data-Driven Tests

Eliminate repetitive test functions by running the same test logic against multiple input-output combinations. Ballerina's data provider feature feeds different data sets into a single test function, improving coverage while keeping your test code concise.

## Data Providers Overview

A data provider is a function that returns a set of test data. You attach it to a test function using the `dataProvider` field in the `@test:Config` annotation. The test framework runs the test function once for each data entry.

```ballerina
import ballerina/test;

// Data provider function returns a 2D array of arguments
function statusCodeData() returns string[][] {
    return [
        ["completed", "green"],
        ["pending", "yellow"],
        ["cancelled", "red"],
        ["failed", "red"]
    ];
}

@test:Config {
    dataProvider: statusCodeData
}
function testStatusToColor(string status, string expectedColor) {
    string result = getStatusColor(status);
    test:assertEquals(result, expectedColor);
}

function getStatusColor(string status) returns string {
    match status {
        "completed" => { return "green"; }
        "pending" => { return "yellow"; }
        _ => { return "red"; }
    }
}
```

## Map-Based Data Providers

Use a map-based data provider for named test cases, making failures easier to identify.

```ballerina
import ballerina/test;

function emailValidationData() returns map<[string, boolean]> {
    return {
        "valid_simple": ["user@example.com", true],
        "valid_subdomain": ["user@mail.example.com", true],
        "missing_at_sign": ["userexample.com", false],
        "missing_domain": ["user@", false],
        "empty_string": ["", false],
        "valid_with_plus": ["user+tag@example.com", true]
    };
}

@test:Config {
    dataProvider: emailValidationData
}
function testEmailValidation(string email, boolean expected) {
    boolean result = isValidEmail(email);
    test:assertEquals(result, expected,
        msg = string `Email "${email}" validation failed`);
}

function isValidEmail(string email) returns boolean {
    // Simplified validation logic
    return email.includes("@") && email.length() > 3;
}
```

When a map-based test case fails, the test report shows the case name (e.g., `testEmailValidation[missing_at_sign]`), making it clear which scenario broke.

## Record-Based Data Providers

For complex test data, use records to keep data organized and self-documenting.

```ballerina
import ballerina/test;

type OrderTestCase record {|
    string description;
    decimal subtotal;
    decimal taxRate;
    decimal discount;
    decimal expectedTotal;
|};

function orderCalculationData() returns map<[OrderTestCase]> {
    return {
        "basic_order": [{
            description: "Basic order with tax, no discount",
            subtotal: 100.00,
            taxRate: 0.08,
            discount: 0.00,
            expectedTotal: 108.00
        }],
        "discounted_order": [{
            description: "Order with 10% discount",
            subtotal: 200.00,
            taxRate: 0.08,
            discount: 20.00,
            expectedTotal: 194.40
        }],
        "zero_tax": [{
            description: "Tax-exempt order",
            subtotal: 50.00,
            taxRate: 0.00,
            discount: 0.00,
            expectedTotal: 50.00
        }]
    };
}

@test:Config {
    dataProvider: orderCalculationData
}
function testOrderTotalCalculation(OrderTestCase tc) returns error? {
    decimal result = calculateTotal(tc.subtotal, tc.taxRate, tc.discount);
    test:assertEquals(result, tc.expectedTotal,
        msg = tc.description);
}

function calculateTotal(decimal subtotal, decimal taxRate, decimal discount)
        returns decimal {
    decimal afterDiscount = subtotal - discount;
    return afterDiscount + (afterDiscount * taxRate);
}
```

## Testing HTTP Endpoints with Data Providers

Combine data providers with service tests to validate multiple request-response scenarios.

```ballerina
import ballerina/http;
import ballerina/test;

http:Client testClient = check new ("http://localhost:9090");

function endpointTestData() returns map<[string, string, int]> {
    return {
        "valid_user": ["/api/users/U001", "GET", 200],
        "missing_user": ["/api/users/INVALID", "GET", 404],
        "health_check": ["/api/health", "GET", 200],
        "invalid_path": ["/api/nonexistent", "GET", 404]
    };
}

@test:Config {
    dataProvider: endpointTestData
}
function testEndpointStatusCodes(string path, string method, int expectedStatus)
        returns error? {
    http:Response response = check testClient->execute(method, path, ());
    test:assertEquals(response.statusCode, expectedStatus,
        msg = string `${method} ${path} returned unexpected status`);
}
```

## Data Providers with External Files

Load test data from JSON files for large or frequently updated test datasets.

```ballerina
import ballerina/io;
import ballerina/test;

type TransformTestCase record {|
    string name;
    json input;
    json expectedOutput;
|};

function transformTestData() returns map<[TransformTestCase]>|error {
    json rawData = check io:fileReadJson("tests/resources/transform-cases.json");
    TransformTestCase[] cases = check rawData.fromJsonWithType();

    map<[TransformTestCase]> dataMap = {};
    foreach TransformTestCase tc in cases {
        dataMap[tc.name] = [tc];
    }
    return dataMap;
}

@test:Config {
    dataProvider: transformTestData
}
function testDataTransformation(TransformTestCase tc) returns error? {
    json result = check transformPayload(tc.input);
    test:assertEquals(result, tc.expectedOutput, msg = tc.name);
}

function transformPayload(json input) returns json|error {
    // Transformation logic under test
    return input;
}
```

## Combining Data Providers with Test Groups

Tag data-driven tests with groups for selective execution.

```ballerina
import ballerina/test;

function criticalPathData() returns string[][] {
    return [
        ["create", "201"],
        ["read", "200"],
        ["update", "200"],
        ["delete", "204"]
    ];
}

@test:Config {
    dataProvider: criticalPathData,
    groups: ["critical", "crud"]
}
function testCrudOperations(string operation, string expectedCode) {
    // Test CRUD operations
    test:assertTrue(true);
}
```

## Best Practices

- **Use map-based providers** over array-based when possible -- named test cases produce clearer failure messages
- **Keep data providers focused** -- each provider should serve a single test concern
- **Extract large datasets to files** -- JSON or CSV resource files are easier to maintain than inline arrays
- **Add descriptive names** to each test case so failures are immediately understandable
- **Combine with test groups** to run subsets of data-driven tests during development

## What's Next

- [Test Groups & Selective Execution](test-groups.md) -- Organize and filter tests
- [Test Services & Clients](test-services-clients.md) -- End-to-end service testing
- [Execute Tests](execute-tests.md) -- Run tests from CLI and IDE
