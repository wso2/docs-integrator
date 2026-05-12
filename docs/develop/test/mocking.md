---
title: Mocking
---

# Mocking

Integration code rarely runs in isolation. It calls databases, payment gateways, notification services, and third-party APIs. Testing against real dependencies makes tests slow, environment-sensitive, and potentially costly. Mocking replaces those dependencies with lightweight stubs that return exactly what the test needs, making your test suite fast, deterministic, and safe to run offline.

The `ballerina/test` module supports two categories: **object mocking** (replacing a client object) and **function mocking** (replacing a module-level function).

## Mock objects

### Write a test double

A test double is a custom class you write to mimic a real client. It implements only the methods the code under test actually calls, returning whatever the test scenario requires.

```ballerina
import ballerina/http;
import ballerina/test;

http:Client inventoryClient = check new ("https://inventory.example.com");

type StockLevel readonly & record {
    string sku;
    int quantity;
};

function getStockLevel(string sku) returns StockLevel|error {
    return check inventoryClient->get("/stock/" + sku);
}

// Test double — only implements `get`, which is the only method called above.
public client class MockInventoryClient {
    remote function get(string path, map<string|string[]>? headers = (),
                        http:TargetType targetType = http:Response)
            returns http:Response|anydata|http:ClientError {
        return {sku: "SKU-001", quantity: 42};
    }
}

@test:Config
public function testGetStockLevel() {
    inventoryClient = test:mock(http:Client, new MockInventoryClient());
    StockLevel|error result = getStockLevel("SKU-001");
    test:assertEquals(result, {sku: "SKU-001", quantity: 42});
}
```

Test doubles give you complete control over the response but require you to write and maintain the class. For simpler cases, use `test:prepare` to stub individual methods without writing a class.

### Stub a return value

Create a default mock with `test:mock` and configure its behavior with `test:prepare`. You can stub all calls to a method, or scope the stub to a specific argument.

```ballerina
import ballerina/http;
import ballerina/test;

@test:Config
public function testGetStockLevel() {
    inventoryClient = test:mock(http:Client);

    // Return a fixed value for every call to `get`.
    test:prepare(inventoryClient).when("get").thenReturn(getDefaultStock());

    // Override with a specific response when called with a particular path.
    test:prepare(inventoryClient).when("get")
        .withArguments("/stock/OUT-OF-STOCK").thenReturn({sku: "OUT-OF-STOCK", quantity: 0});

    StockLevel|error result = getStockLevel("SKU-001");
    test:assertEquals(result, {sku: "SKU-001", quantity: 42});
}

function getDefaultStock() returns StockLevel {
    return {sku: "SKU-001", quantity: 42};
}
```

### Return a sequence of values

When your code calls the same method multiple times in one operation, stub successive calls to return different values using `thenReturnSequence`. A common use case is polling an endpoint until a job completes. The first call returns the first argument, the second call returns the second, and so on.

```ballerina
import ballerina/http;
import ballerina/test;

type JobStatus readonly & record {string state;};

@test:Config
public function testJobPolling() {
    inventoryClient = test:mock(http:Client);

    JobStatus pending = {state: "pending"};
    JobStatus complete = {state: "complete"};

    // Simulates polling: first check returns pending, second returns complete.
    test:prepare(inventoryClient).when("get")
        .thenReturnSequence(pending, complete);

    JobStatus|error first = check inventoryClient->get("/jobs/42");
    test:assertEquals(first, pending);

    JobStatus|error second = check inventoryClient->get("/jobs/42");
    test:assertEquals(second, complete);
}
```

`withArguments` is not supported with `thenReturnSequence`.

### Stub a void method

When a method returns `()`, stub it with `doNothing` to verify the call was made without triggering side effects. This is typical for fire-and-forget operations like sending a notification or writing an audit log.

```ballerina
import ballerina/email;
import ballerina/test;

email:SmtpClient smtpClient = check new ("localhost", "admin", "admin");

function sendAlertEmail(string[] recipients) returns error? {
    email:Message msg = {
        'from: "alerts@example.com",
        subject: "System Alert",
        to: recipients,
        body: "Check the dashboard."
    };
    return check smtpClient->sendMessage(msg);
}

@test:Config
function testSendAlertEmail() {
    smtpClient = test:mock(email:SmtpClient);
    test:prepare(smtpClient).when("sendMessage").doNothing();

    // Verify the function completes without error and does not actually send email.
    test:assertEquals(sendAlertEmail(["oncall@example.com"]), ());
}
```

### Stub a resource method

Client resources use path parameters rather than method arguments. Use `whenResource` to target a specific resource path. Use `:` to indicate a path parameter and `::` to indicate a rest parameter.

Consider the following client with two resources:

```ballerina
public type Employee record {|
    readonly string id;
    string firstName;
    string lastName;
|};

EmpClient empClient = new ();

public client class EmpClient {
    map employees = {};

    resource function get employee/[string id]() returns Employee? {
        return self.employees[id];
    }

    resource function get employee/welcome/[string id](string firstName, string lastName) returns string {
        return "Welcome " + firstName + " " + lastName + ". Your ID is " + id;
    }
}
```

#### Return a specific value

You can stub a resource in four ways. When a call matches multiple stubs, the most specific one wins.

1. **General stub**: applies to all calls regardless of path parameters or arguments.
2. **Path-parameter stub**: applies when the path parameter matches.
3. **Arguments stub**: applies when the method arguments match.
4. **Path and arguments stub**: the most specific; applies only when both path parameter and arguments match.

```ballerina
import ballerina/test;

@test:Config
function testWelcomeEmployee() {
    empClient = test:mock(EmpClient);

    // 1. General stub — matches any call.
    test:prepare(empClient)
        .whenResource("employee/welcome/:id")
        .onMethod("get")
        .thenReturn("Welcome — general");

    // 2. Path-specific stub — matches calls with id "emp014".
    test:prepare(empClient)
        .whenResource("employee/welcome/:id")
        .onMethod("get").withPathParameters({id: "emp014"})
        .thenReturn("Welcome — path matched");

    // 3. Arguments-specific stub — matches calls with firstName "Alice" and lastName "Smith".
    test:prepare(empClient)
        .whenResource("employee/welcome/:id")
        .onMethod("get").withArguments("Alice", "Smith")
        .thenReturn("Welcome — args matched");

    // 4. Path and arguments stub — most specific; matches only when both match.
    test:prepare(empClient)
        .whenResource("employee/welcome/:id")
        .onMethod("get")
        .withPathParameters({id: "emp014"})
        .withArguments("Alice", "Smith")
        .thenReturn("Welcome — exact match");

    // Both path and args match stub 4 — most specific wins.
    string result = empClient->/employee/welcome/["emp014"].get(firstName = "Alice", lastName = "Smith");
    test:assertEquals(result, "Welcome — exact match");

    // Args match stub 3, path does not match stub 2 or 4.
    result = empClient->/employee/welcome/["emp001"].get(firstName = "Alice", lastName = "Smith");
    test:assertEquals(result, "Welcome — args matched");

    // Path matches stub 2, args do not match stub 3 or 4.
    result = empClient->/employee/welcome/["emp014"].get(firstName = "John", lastName = "Doe");
    test:assertEquals(result, "Welcome — path matched");

    // Neither path nor args match any specific stub — falls back to stub 1.
    result = empClient->/employee/welcome/["emp001"].get(firstName = "John", lastName = "Doe");
    test:assertEquals(result, "Welcome — general");
}
```

#### Return a sequence of values

Stub successive calls to return different values in order. The first call returns the first value, the second call returns the second, and so on.

`withArguments` and `withPathParameters` are not supported with `thenReturnSequence`.

```ballerina
import ballerina/test;

@test:Config
function testGetEmployeesSequentially() {
    empClient = test:mock(EmpClient);

    Employee emp1 = {id: "emp001", firstName: "Jane", lastName: "Doe"};
    Employee emp2 = {id: "emp002", firstName: "John", lastName: "Smith"};
    Employee emp3 = {id: "emp003", firstName: "Alice", lastName: "Brown"};

    test:prepare(empClient).whenResource("employee/:id")
        .onMethod("get").thenReturnSequence(emp1, emp2, emp3);

    test:assertEquals(empClient->/employee/["emp001"].get(), emp1);
    test:assertEquals(empClient->/employee/["emp002"].get(), emp2);
    test:assertEquals(empClient->/employee/["emp003"].get(), emp3);
}
```

#### Do nothing

If a resource has no return type or an optional return type, stub it with `doNothing`.

```ballerina
import ballerina/test;

@test:Config
function testGetEmployeeDoNothing() {
    empClient = test:mock(EmpClient);
    test:prepare(empClient).whenResource("employee/:id").doNothing();

    Employee? result = empClient->/employee/["emp001"].get();
    test:assertEquals(result, ());
}
```

### Stub a member variable

When production code reads a public field on a client object, such as a configuration value or a cached identifier, stub that field directly rather than rerouting through a method call.

```ballerina
import ballerina/test;

public client class ShippingClient {
    public int warehouseId;
    public function init(int warehouseId) {
        self.warehouseId = warehouseId;
    }
}

ShippingClient shippingClient = new (1);

@test:Config
function testWarehouseId() {
    shippingClient = test:mock(ShippingClient);

    // Stub the field so the test sees warehouse 99 without initializing a real client.
    test:prepare(shippingClient).getMember("warehouseId").thenReturn(99);

    test:assertEquals(shippingClient.warehouseId, 99);
}
```

## Mock functions

Object mocking targets client variables. Function mocking targets module-level functions, including functions in external modules, by replacing them at the annotation level. Declare a `test:MockFunction` with `@test:Mock`, then configure its behavior using `test:when`.

### Stub a function in the same module

```ballerina
import ballerina/test;

// Production code.
public function applyTax(decimal amount) returns decimal {
    return roundToTwoDecimals(amount * 1.1d);
}

public function roundToTwoDecimals(decimal value) returns decimal {
    return <decimal>(<int>(value * 100.0d)) / 100.0d;
}

// Test file — replace `roundToTwoDecimals` with a stub that always returns a fixed value.
@test:Mock {functionName: "roundToTwoDecimals"}
test:MockFunction roundMockFn = new ();

@test:Config
function testApplyTax() {
    // Return a fixed value regardless of input.
    test:when(roundMockFn).thenReturn(11.00d);

    // Return a specific value when called with a specific argument.
    test:when(roundMockFn).withArguments(0.0d).thenReturn(0.0d);

    test:assertEquals(applyTax(10.0d), 11.00d);
    test:assertEquals(applyTax(0.0d), 0.0d);
}
```

### Replace with a custom implementation

When a stub return value is not enough and you need to run alternative logic, use `call` to substitute the real function with a mock implementation for the duration of the test.

```ballerina
import ballerina/test;

@test:Mock {functionName: "roundToTwoDecimals"}
test:MockFunction roundMockFn = new ();

@test:Config
function testWithCustomRounding() {
    // Use a truncation strategy instead of the production rounding logic.
    test:when(roundMockFn).call("truncateToTwoDecimals");

    test:assertEquals(applyTax(10.555d), 11.61d);
}

public function truncateToTwoDecimals(decimal value) returns decimal {
    return <decimal>(<int>(value * 100.0d)) / 100.0d;
}
```

### Stub a function from an imported module

Specify `moduleName` to intercept a function from an external module. This is useful for verifying interaction counts or suppressing side effects from logging and I/O calls.

```ballerina
import ballerina/io;
import ballerina/test;

@test:Mock {
    moduleName: "ballerina/io",
    functionName: "println"
}
test:MockFunction printlnMockFn = new ();

int logCallCount = 0;

public function mockPrint(any|error... val) {
    logCallCount = logCallCount + 1;
}

@test:Config
function testAuditLogging() {
    test:when(printlnMockFn).call("mockPrint");

    io:println("Order created");
    io:println("Payment received");
    io:println("Fulfillment started");

    // Verify the audit path logged exactly three events.
    test:assertEquals(logCallCount, 3);
}
```

### Restore the original function

After substituting a function, call `callOriginal` to restore the real implementation within the same test. This lets you verify behavior both with and without the stub in a single test run.

```ballerina
import ballerina/test;

@test:Mock {functionName: "roundToTwoDecimals"}
test:MockFunction roundMockFn = new ();

@test:Config
function testStubThenRestore() {
    // First assertion uses the stub.
    test:when(roundMockFn).thenReturn(99.99d);
    test:assertEquals(applyTax(10.0d), 99.99d);

    // Restore the original and verify real behavior.
    test:when(roundMockFn).callOriginal();
    test:assertEquals(applyTax(10.0d), 11.0d);
}
```

## What's next

- [Test services and clients](services-clients.md) — mock HTTP clients directly in service integration tests
- [Write unit tests](unit-testing.md) — assertions and `@test:Config` reference
