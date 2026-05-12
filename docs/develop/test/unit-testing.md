---
title: Write unit tests
---

# Write unit tests

WSO2 Integrator uses the Ballerina test framework for automated testing. Test functions are placed in a dedicated `tests/` folder inside your module and discovered automatically when you run `bal test`. This page covers how to structure the test directory, how to use assertions to verify behavior, and how to supply test-only configuration values.

## Test directory structure

Create a `tests/` subfolder inside the module you want to test. Every `.bal` file in that folder belongs to the same test suite for that module.

```
HelloWorldAPI/
    Ballerina.toml
    main.bal
    tests/
        main_test.bal       ← test functions live here
        Config.toml         ← test-only configurable values (optional)
        resources/          ← test data files (optional)
```

Two scoping rules apply:

- Everything defined in the module (`main.bal` and any helper files) is visible inside the test files. You do not need to re-import or duplicate production code.
- Symbols defined inside `tests/` are invisible to the module itself, so test helpers stay isolated and do not affect the production build.

## Assertions

Assertions compare what your code produced against what you expected. When they do not match, the test fails with a descriptive message pointing to the exact difference. The optional `message` parameter appears in the failure output — use it to explain the intent of the assertion so failures are easy to diagnose.

| Function | What it checks |
|---|---|
| `test:assertTrue(expr, message?)` | The expression evaluates to `true`. |
| `test:assertFalse(expr, message?)` | The expression evaluates to `false`. |
| `test:assertEquals(actual, expected, message?)` | The two values are equal by value. |
| `test:assertNotEquals(actual, expected, message?)` | The two values are not equal by value. |
| `test:assertExactEquals(actual, expected, message?)` | The two references point to the same object in memory. |
| `test:assertNotExactEquals(actual, expected, message?)` | The two references do not point to the same object in memory. |
| `test:assertFail(message)` | Immediately fails the test. Use it inside a conditional block when reaching that point is itself the error. |

### Usage examples

```ballerina
import ballerina/http;
import ballerina/test;

http:Client testClient = check new ("http://localhost:9090/orders");

type Order record {
    int orderId;
    string status;
};

@test:Config
function testGetOrderReturnsOk() returns error? {
    http:Response response = check testClient->/[42].get();
    test:assertEquals(response.statusCode, 200, msg = "Expected 200 OK for a valid order ID");
}

@test:Config
function testOrderStatusIsPending() returns error? {
    Order order = check (check testClient->/[42].get()).getJsonPayload().cloneWithType();
    test:assertEquals(order.status, "pending", msg = "Newly created order should have pending status");
    test:assertTrue(order.orderId > 0, msg = "Order ID must be positive");
}

@test:Config
function testInvalidOrderIdReturns404() returns error? {
    http:Response response = check testClient->/[-1].get();
    test:assertEquals(response.statusCode, 404, msg = "Negative order ID should return 404");
    test:assertNotEquals(response.statusCode, 200);
}

@test:Config
function testOrderCreationFails() returns error? {
    json|error result = testClient->/[0].get();
    if result is json {
        test:assertFail(msg = "Expected an error for order ID zero, but got a successful response");
    }
}
```

### Assertion failure output

The framework formats failure output based on the types being compared. Understanding the format makes it faster to locate exactly what went wrong without reading through the full test output.

#### Type mismatch

When the actual and expected values have different types, both the value and its type are shown. This makes it immediately clear when a string-versus-integer confusion is the cause of the failure.

```ballerina
import ballerina/test;

@test:Config
function testAssertStringAndInt() {
    test:assertEquals(1, "1");
}
```

Output:

```
[fail] testAssertStringAndInt:

    Assertion Failed!

        expected: <string> '1'
        actual  : <int> '1'
```

#### String mismatch

For multiline strings, a unified diff highlights exactly which lines differ using `+` and `-`.

```ballerina
import ballerina/test;

@test:Config
function testAssertString() {
    test:assertEquals("hello Ballerina user\nWelcome to Ballerina",
        "hello user\nWelcome to Ballerina");
}
```

Output:

```
[fail] testAssertString:

    Assertion Failed!

        Diff    :

        --- actual
        +++ expected

        @@ -1,2 +1,2 @@

        -hello Ballerina user
        +hello user
         Welcome to Ballerina
```

#### Record, map, or JSON mismatch

Key mismatches are listed under `expected keys` and `actual keys`. Value mismatches are then reported per key, so you do not have to parse the entire structure to find the problem.

```ballerina
import ballerina/test;

@test:Config
function testAssertJson() {
    json j1 = {
        name: "Anne",
        age: "21",
        marks: {maths: 99, english: 90}
    };
    json j2 = {
        name2: "Amie",
        age: 21,
        marks: {maths: 35, english: 90}
    };
    test:assertEquals(j1, j2);
}
```

Output:

```
[fail] testAssertJson:

    Assertion Failed!

        expected keys   : name2
        actual keys     : name

        key: age
        expected value  : <int> 21
        actual value    : <string> 21

        key: marks.maths
        expected value  : 35
        actual value    : 99
```

#### Tuple or other anydata mismatch

For tuples and other `anydata` types, the expected and actual values are shown directly.

```ballerina
import ballerina/test;

@test:Config
function testAssertTuples() {
    [int, string] a = [10, "John"];
    [int, string] b = [12, "John"];
    test:assertEquals(a, b);
}
```

Output:

```
[fail] testAssertTuples:

    Assertion Failed!

        expected: '[12,"John"]'
        actual  : '[10,"John"]'
```

## Configuration values

If your integration uses configurable variables, the tests need values for those variables to run. Create a `Config.toml` file inside the `tests/` directory and add the values there. The framework loads this file automatically when you run `bal test`, and it does not affect the module's production configuration.

```toml
# tests/Config.toml
dbHost = "localhost"
dbPort = 5432
serviceUrl = "http://localhost:9090"
```

The `Config.toml` inside `tests/` takes precedence over the module-level `Config.toml` during test execution, so you can safely override production values such as database hosts, ports, or external service URLs with test-safe alternatives.

You can also pass configuration values directly from the command line when running tests in different environments:

```
bal test -CdbHost=ci-db.internal -CdbPort=5432
```

## What's next

- [Configure test lifecycle](configure-tests.md) — set up and tear down state at the suite, group, and per-test level
- [Data-driven tests](data-driven-tests.md) — run one test function across many input combinations
- [Mocking](mocking.md) — replace external dependencies with controlled stubs
- [Execute tests](execute-tests.md) — CLI options for filtering, rerunning, and parallelizing tests
