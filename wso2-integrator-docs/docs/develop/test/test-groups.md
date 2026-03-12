---
sidebar_position: 8
title: Test Groups & Selective Execution
description: Organize tests into groups and selectively run subsets during development and CI/CD.
---

# Test Groups & Selective Execution

Organize your tests into logical groups and run only the tests you need. Test groups let you separate fast unit tests from slow integration tests, tag tests by feature area, and build efficient CI/CD pipelines that run the right tests at the right time.

## Defining Test Groups

Assign one or more groups to a test using the `groups` field in `@test:Config`.

```ballerina
import ballerina/test;

@test:Config {
    groups: ["unit", "transform"]
}
function testJsonToXmlConversion() {
    // Fast unit test for data transformation
    test:assertTrue(true);
}

@test:Config {
    groups: ["integration", "database"]
}
function testDatabaseInsert() returns error? {
    // Slower test that requires a database connection
    test:assertTrue(true);
}

@test:Config {
    groups: ["integration", "http"]
}
function testExternalApiCall() returns error? {
    // Test that calls an external service
    test:assertTrue(true);
}

@test:Config {
    groups: ["unit", "validation"]
}
function testInputValidation() {
    // Fast validation logic test
    test:assertTrue(true);
}
```

## Running Specific Groups

Use the `--groups` flag with `bal test` to run only tests matching specific groups.

```bash
# Run only unit tests
bal test --groups unit

# Run only integration tests
bal test --groups integration

# Run tests in multiple groups (OR logic: tests in either group)
bal test --groups unit,transform

# Run database-related integration tests
bal test --groups database
```

## Excluding Groups

Skip specific groups using the `--disable-groups` flag.

```bash
# Run all tests except integration tests
bal test --disable-groups integration

# Skip slow and flaky tests during development
bal test --disable-groups slow,flaky

# Run everything except database tests (when DB is unavailable)
bal test --disable-groups database
```

## Common Group Strategies

### By Test Speed

```ballerina
@test:Config { groups: ["fast"] }
function testPureFunction() {
    // Milliseconds — no I/O
    test:assertTrue(true);
}

@test:Config { groups: ["medium"] }
function testWithMockService() returns error? {
    // Seconds — local mock service
    test:assertTrue(true);
}

@test:Config { groups: ["slow"] }
function testEndToEndFlow() returns error? {
    // Minutes — full integration flow
    test:assertTrue(true);
}
```

### By Feature Area

```ballerina
@test:Config { groups: ["orders"] }
function testOrderCreation() { test:assertTrue(true); }

@test:Config { groups: ["orders"] }
function testOrderCancellation() { test:assertTrue(true); }

@test:Config { groups: ["payments"] }
function testPaymentProcessing() { test:assertTrue(true); }

@test:Config { groups: ["notifications"] }
function testEmailNotification() { test:assertTrue(true); }
```

### By Environment Dependency

```ballerina
@test:Config { groups: ["no-deps"] }
function testPureLogic() {
    // No external dependencies
    test:assertTrue(true);
}

@test:Config { groups: ["requires-db"] }
function testDatabaseQuery() returns error? {
    // Needs PostgreSQL
    test:assertTrue(true);
}

@test:Config { groups: ["requires-kafka"] }
function testEventPublishing() returns error? {
    // Needs Kafka broker
    test:assertTrue(true);
}
```

## Test Execution Order

Control the order of test execution using `dependsOn` to ensure prerequisites run first.

```ballerina
import ballerina/test;

@test:Config {
    groups: ["crud"]
}
function testCreateRecord() returns error? {
    // Step 1: Create
    test:assertTrue(true);
}

@test:Config {
    groups: ["crud"],
    dependsOn: [testCreateRecord]
}
function testReadRecord() returns error? {
    // Step 2: Read (depends on create)
    test:assertTrue(true);
}

@test:Config {
    groups: ["crud"],
    dependsOn: [testReadRecord]
}
function testUpdateRecord() returns error? {
    // Step 3: Update (depends on read)
    test:assertTrue(true);
}

@test:Config {
    groups: ["crud"],
    dependsOn: [testUpdateRecord]
}
function testDeleteRecord() returns error? {
    // Step 4: Delete (depends on update)
    test:assertTrue(true);
}
```

## Enabling and Disabling Tests

Temporarily disable a test without removing it using the `enable` field.

```ballerina
@test:Config {
    enable: false,
    groups: ["integration"]
}
function testFlakyExternalService() returns error? {
    // Temporarily disabled while upstream is unstable
    test:assertTrue(true);
}
```

## Before/After Hooks for Groups

Use `@test:BeforeGroups` and `@test:AfterGroups` to set up and tear down resources for specific groups.

```ballerina
import ballerina/test;
import ballerina/io;

@test:BeforeGroups {
    value: ["database"]
}
function setupDatabase() {
    io:println("Initializing test database...");
    // Create tables, seed test data
}

@test:AfterGroups {
    value: ["database"]
}
function cleanupDatabase() {
    io:println("Dropping test tables...");
    // Clean up database state
}

@test:BeforeGroups {
    value: ["http"]
}
function startMockServer() {
    io:println("Starting mock HTTP server...");
}

@test:AfterGroups {
    value: ["http"]
}
function stopMockServer() {
    io:println("Stopping mock HTTP server...");
}
```

## CI/CD Pipeline Integration

Structure your test groups for efficient CI/CD pipelines.

```yaml
# Example GitHub Actions workflow
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run unit tests
        run: bal test --groups unit,fast

  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    services:
      postgres:
        image: postgres:15
      kafka:
        image: confluentinc/cp-kafka:7.5.0
    steps:
      - uses: actions/checkout@v4
      - name: Run integration tests
        run: bal test --groups integration
```

## Best Practices

- **Every test should have at least one group** -- ungrouped tests always run and cannot be filtered
- **Use consistent naming conventions** -- agree on group names across teams (e.g., `unit`, `integration`, `e2e`)
- **Keep `unit` tests fast** -- unit group tests should complete in seconds with no external dependencies
- **Use `dependsOn` sparingly** -- excessive dependencies create fragile test chains
- **Disable rather than delete** flaky tests -- set `enable: false` and track the issue

## What's Next

- [Execute Tests](execute-tests.md) -- Running tests from CLI, parallel execution
- [Code Coverage](code-coverage.md) -- Measure and report test coverage
- [Data-Driven Tests](data-driven-tests.md) -- Parameterized testing patterns
