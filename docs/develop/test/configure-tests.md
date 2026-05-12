---
title: Configure test lifecycle
---

# Configure test lifecycle

Most tests need some state set up before they run and cleaned up after they finish. The Ballerina test framework provides a set of lifecycle annotations that let you attach setup and teardown logic at four distinct scopes: the whole suite, a named group, every test, and an individual test. Choosing the right scope avoids duplicating setup code and keeps tests independent of each other.

## Suite level

Suite-level functions run exactly once — before the first test in the module starts, or after the last one finishes. Use them for heavyweight resources that are too expensive to create and destroy per test, such as a database connection pool or an embedded server.

### `@test:BeforeSuite`

```ballerina
import ballerina/io;
import ballerina/test;

@test:BeforeSuite
function startEmbeddedServer() {
    // Runs once. All tests in this module share the server instance.
    io:println("Embedded server started");
}

@test:Config
function testHealthEndpoint() {
    test:assertTrue(true);
}

@test:Config
function testMetricsEndpoint() {
    test:assertTrue(true);
}
```

### `@test:AfterSuite`

```ballerina
import ballerina/io;
import ballerina/test;

@test:Config
function testHealthEndpoint() {
    test:assertTrue(true);
}

@test:AfterSuite
function stopEmbeddedServer() {
    // Runs once after every test in the suite has finished.
    io:println("Embedded server stopped");
}
```

## Group level

Group-level functions run once per group — before the first test in the group, or after the last one. Use them when a subset of tests shares a resource that other tests do not need, such as a seeded table in a database or a specific mock server.

### `@test:BeforeGroups`

```ballerina
import ballerina/io;
import ballerina/test;

@test:BeforeGroups {value: ["payments"]}
function seedPaymentFixtures() {
    // Only runs before tests in the "payments" group.
    io:println("Payment test fixtures loaded");
}

@test:BeforeGroups {value: ["payments", "orders"]}
function startBroker() {
    // Runs before tests in either "payments" or "orders".
    io:println("Message broker started");
}

@test:Config {groups: ["payments"]}
function testChargeCard() {
    test:assertTrue(true);
}
```

### `@test:AfterGroups`

```ballerina
import ballerina/io;
import ballerina/test;

@test:Config {groups: ["payments"]}
function testRefund() {
    test:assertTrue(true);
}

@test:AfterGroups {value: ["payments"]}
function cleanPaymentFixtures() {
    io:println("Payment fixtures removed");
}
```

Set `alwaysRun: true` on `@test:AfterGroups` to guarantee the cleanup runs even if tests in the group failed.

## Every-test level

Every-test functions run before or after each individual test in the module. Use them to reset shared mutable state — for example, clearing a cache, resetting a counter, or restoring a mock — so each test starts from a known baseline regardless of what the previous test did.

### `@test:BeforeEach`

```ballerina
import ballerina/test;

int requestCount = 0;

@test:BeforeEach
function resetRequestCount() {
    // Resets the counter before every test so tests do not interfere.
    requestCount = 0;
}

@test:Config
function testFirstRequest() {
    requestCount += 1;
    test:assertEquals(requestCount, 1);
}

@test:Config
function testSecondRequest() {
    requestCount += 1;
    test:assertEquals(requestCount, 1); // Still 1 because the counter was reset.
}
```

### `@test:AfterEach`

```ballerina
import ballerina/io;
import ballerina/test;

@test:AfterEach
function logTestCompletion() {
    io:println("Test finished — clearing temporary files");
}

@test:Config
function testFileUpload() {
    test:assertTrue(true);
}

@test:Config
function testFileDownload() {
    test:assertTrue(true);
}
```

## Individual-test level

The `before` and `after` fields in `@test:Config` attach a function to a single test. These are the right choice when the setup is specific to one test and would be wasteful or incorrect to run for others.

```ballerina
import ballerina/io;
import ballerina/test;

function createOrderFixture() {
    io:println("Creating order row in test database");
}

function deleteOrderFixture() {
    io:println("Deleting order row from test database");
}

@test:Config {
    before: createOrderFixture,
    after: deleteOrderFixture
}
function testFulfillOrder() {
    // The order fixture exists only for the duration of this test.
    test:assertTrue(true);
}
```

## Control execution order

By default, the framework does not guarantee the order in which test functions run. When one test relies on a side effect produced by another — for example, a record created in `testCreateOrder` that `testFulfillOrder` reads — use `dependsOn` to declare the dependency explicitly.

```ballerina
import ballerina/test;

@test:Config
function testCreateOrder() {
    // Creates the order. testFulfillOrder will read it.
    test:assertTrue(true);
}

@test:Config {dependsOn: [testCreateOrder]}
function testFulfillOrder() {
    // Guaranteed to run after testCreateOrder.
    test:assertTrue(true);
}

@test:Config {dependsOn: [testFulfillOrder]}
function testArchiveOrder() {
    // Guaranteed to run after testFulfillOrder.
    test:assertTrue(true);
}
```

The order within the `dependsOn` array has no effect. For a strict chain, declare each test dependent on the previous one, as shown above.

## Failure behaviour

Understanding what happens when a lifecycle function fails helps you design resilient test suites.

| Failure in | What gets skipped |
|---|---|
| `@test:BeforeSuite` | Everything — no tests or teardown functions run except `@test:AfterSuite` with `alwaysRun: true`. |
| `@test:BeforeGroups` | All tests in that group and their teardown. `@test:AfterGroups` is skipped unless `alwaysRun: true`. |
| `@test:BeforeEach` | All remaining test functions. `@test:AfterSuite` still runs. |
| `before` attribute function | The test itself and its `after` function are both skipped. |
| Test function | Nothing else is skipped. Other tests continue normally. |
| `@test:AfterEach` | All subsequent `@test:BeforeEach`, `@test:AfterEach`, and test functions are skipped. |

## What's next

- [Write unit tests](unit-testing.md) — `@test:Config` attributes and assertions reference
- [Test groups](groups.md) — run or exclude groups selectively from the command line
- [Execute tests](execute-tests.md) — CLI options and parallel execution
