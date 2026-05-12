---
title: Test groups
---

# Test groups

As an integration grows, so does its test suite. Running the entire suite on every change is wasteful when you only care about a specific area — for example, running payment tests after touching the billing module. Test groups let you tag tests with labels and control which labels run from the command line, without touching the test code itself.

Assign a test to one or more groups using the `groups` attribute in `@test:Config`.

## Assign tests to groups

A test can belong to multiple groups. When you target a group at the command line, all tests tagged with that label run, regardless of how many other groups they also belong to.

```ballerina
import ballerina/io;
import ballerina/test;

@test:Config {groups: ["g1"]}
function testFunction1() {
    io:println("I'm a test belonging to group g1!");
    test:assertTrue(true, msg = "Failed!");
}

@test:Config {groups: ["g1", "g2"]}
function testFunction2() {
    io:println("I'm a test belonging to groups g1 and g2!");
    test:assertTrue(true, msg = "Failed!");
}

@test:Config {groups: ["g2"]}
function testFunction3() {
    io:println("I'm a test belonging to group g2!");
    test:assertTrue(true, msg = "Failed!");
}
```

A common pattern is to tag a small set of critical tests as `smoke` and run those on every commit, while the full group suite runs only in CI or before a release.

## Discover available groups

Before running or excluding a group, confirm which groups are defined in the package:

```
bal test --list-groups
```

## Run specific groups

Run only the tests that belong to a group. Tests outside that group are skipped:

```
bal test --groups g1
```

Output:

```
Running Tests

    Testing
I'm a test belonging to group g1!
I'm a test belonging to groups g1 and g2!

        2 passing
        0 failing
        0 skipped
```

Target multiple groups in a single run by separating them with a comma. A test is included if it belongs to any of the specified groups:

```
bal test --groups g1,g2
```

Output:

```
Running Tests

    Testing
I'm a test belonging to group g1!
I'm a test belonging to groups g1 and g2!
I'm a test belonging to group g2!

        3 passing
        0 failing
        0 skipped
```

## Exclude groups

Run the entire suite except for tests in a specific group. This is useful when a group is known to be broken and you do not want it to block the rest:

```
bal test --disable-groups g2
```

Output:

```
Running Tests

    Testing
I'm a test belonging to group g1!

        1 passing
        0 failing
        0 skipped
```

## Group-level setup and teardown

Groups often share setup state — a seeded database table or a mock server — that should start once before the group and stop once after. Use `@test:BeforeGroups` and `@test:AfterGroups` to attach that logic to the group rather than duplicating it inside each test.

```ballerina
import ballerina/io;
import ballerina/test;

@test:BeforeGroups {value: ["orders"]}
function setupOrderTests() {
    // Seeds the test database with order fixtures before any test in "orders" runs.
    io:println("Order test fixtures loaded");
}

@test:Config {groups: ["orders"]}
function testCreateOrder() {
    test:assertTrue(true);
}

@test:Config {groups: ["orders"]}
function testCancelOrder() {
    test:assertTrue(true);
}

@test:AfterGroups {value: ["orders"]}
function teardownOrderTests() {
    // Removes the fixtures once all "orders" tests have finished.
    io:println("Order test fixtures removed");
}
```

Set `alwaysRun: true` on `@test:AfterGroups` to guarantee cleanup runs even when a test in the group fails. See [Configure test lifecycle](configure-tests.md) for the full suite, group, and per-test lifecycle reference.

## What's next

- [Configure test lifecycle](configure-tests.md) — suite-level and group-level setup and teardown annotations
- [Execute tests](execute-tests.md) — full CLI reference including group flags
