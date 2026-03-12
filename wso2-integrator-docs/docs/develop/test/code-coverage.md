---
sidebar_position: 10
title: Code Coverage
description: Measure test coverage, generate reports, and enforce coverage thresholds.
---

# Code Coverage

Measure how much of your integration code is exercised by tests. Code coverage reports highlight untested paths, helping you focus testing effort where it matters most and enforce quality gates in CI/CD pipelines.

## Generating Coverage Reports

Add the `--code-coverage` flag to generate coverage data alongside test results.

```bash
# Run tests with code coverage
bal test --code-coverage

# Combine with test report for a complete view
bal test --code-coverage --test-report
```

Coverage results are generated at:
```
target/report/test_results.html    # HTML report with coverage
target/report/coverage/            # Raw coverage data
```

<!-- TODO: Screenshot of coverage report in browser -->

## Understanding Coverage Metrics

The coverage report tracks several metrics:

| Metric | Description |
|--------|-------------|
| **Line coverage** | Percentage of executable lines that were run during tests |
| **Branch coverage** | Percentage of conditional branches (if/else, match) that were taken |
| **Function coverage** | Percentage of functions that were called at least once |

### Reading the HTML Report

The HTML coverage report provides:
- **Package-level summary** -- overall coverage percentage for each module
- **File-level detail** -- coverage breakdown per source file
- **Line-level highlighting** -- green (covered), red (not covered), yellow (partially covered)

<!-- TODO: Screenshot of line-level coverage highlighting -->

## Coverage for Integration Services

When testing HTTP services, coverage tracks which resource functions and code paths your tests exercise.

```ballerina
import ballerina/http;

service /api on new http:Listener(9090) {

    // Covered if a test sends GET /api/orders
    resource function get orders() returns json[] {
        return [{"id": "ORD-001"}];
    }

    // Covered if a test sends POST /api/orders with valid payload
    resource function post orders(json payload) returns http:Created|http:BadRequest {
        // Line covered ✓
        if payload == () {
            return http:BAD_REQUEST;  // Only covered if test sends empty payload
        }
        return http:CREATED;  // Only covered if test sends valid payload
    }

    // Not covered if no test calls DELETE
    resource function delete orders/[string id]() returns http:NoContent {
        return http:NO_CONTENT;
    }
}
```

To achieve full coverage of this service, you need tests that:
1. Send a GET request to `/api/orders`
2. Send a POST with a valid payload
3. Send a POST with an empty/null payload
4. Send a DELETE request

## Improving Coverage

### Identifying Gaps

Use the HTML report to find uncovered code, then write targeted tests.

```ballerina
import ballerina/test;
import ballerina/http;

http:Client testClient = check new ("http://localhost:9090");

// Test the happy path
@test:Config {groups: ["coverage"]}
function testCreateOrderSuccess() returns error? {
    json payload = {"item": "Widget", "quantity": 5};
    http:Response resp = check testClient->/api/orders.post(payload);
    test:assertEquals(resp.statusCode, 201);
}

// Test the error path to cover the BadRequest branch
@test:Config {groups: ["coverage"]}
function testCreateOrderBadRequest() returns error? {
    http:Response resp = check testClient->/api/orders.post(());
    test:assertEquals(resp.statusCode, 400);
}

// Cover the DELETE endpoint
@test:Config {groups: ["coverage"]}
function testDeleteOrder() returns error? {
    http:Response resp = check testClient->/api/orders/["ORD-001"].delete;
    test:assertEquals(resp.statusCode, 204);
}
```

### Covering Error Handling Paths

Error handling code is commonly under-tested. Write tests that trigger error conditions.

```ballerina
import ballerina/test;

function processPayment(decimal amount) returns string|error {
    if amount <= 0 {
        return error("Invalid amount: must be positive");
    }
    if amount > 10000 {
        return error("Amount exceeds single transaction limit");
    }
    return "approved";
}

@test:Config {}
function testPaymentSuccess() returns error? {
    string result = check processPayment(150.00);
    test:assertEquals(result, "approved");
}

@test:Config {}
function testPaymentNegativeAmount() {
    string|error result = processPayment(-50.00);
    test:assertTrue(result is error);
    if result is error {
        test:assertTrue(result.message().includes("must be positive"));
    }
}

@test:Config {}
function testPaymentExceedsLimit() {
    string|error result = processPayment(15000.00);
    test:assertTrue(result is error);
    if result is error {
        test:assertTrue(result.message().includes("exceeds single transaction limit"));
    }
}
```

## Excluding Code from Coverage

Some code does not need test coverage, such as generated code or test utilities. Use the `tests/` directory convention -- test files are automatically excluded from coverage calculations.

For main source code that should be excluded, restructure to separate testable logic from infrastructure code:

```ballerina
// main.bal -- infrastructure (harder to test, lower coverage expectation)
public function main() returns error? {
    // Start listeners, configure runtime
}

// order_logic.bal -- business logic (high coverage expected)
public function validateOrder(json order) returns boolean|error {
    // Pure logic, easily testable
    string? item = check order.item;
    return item is string && item.length() > 0;
}
```

## Enforcing Coverage Thresholds

### In CI/CD Pipelines

Parse the coverage output to enforce minimum thresholds.

```bash
#!/bin/bash
# Run tests with coverage
bal test --code-coverage --test-report

# Check exit code
if [ $? -ne 0 ]; then
    echo "Tests failed!"
    exit 1
fi

# Parse coverage from results (example script)
COVERAGE=$(grep -oP 'Line Coverage: \K[0-9.]+' target/report/coverage/summary.txt)
THRESHOLD=80

if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
    echo "Coverage ${COVERAGE}% is below threshold ${THRESHOLD}%"
    exit 1
fi

echo "Coverage ${COVERAGE}% meets threshold ${THRESHOLD}%"
```

### GitHub Actions Example

```yaml
- name: Run tests with coverage
  run: bal test --code-coverage --test-report

- name: Upload coverage report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: target/report/
```

## Coverage Report Formats

Ballerina generates coverage data that can be used with external tools.

```bash
# Generate coverage with Jacoco-compatible output
bal test --code-coverage

# Coverage data directory
ls target/report/coverage/
# summary.txt
# modules/
```

## Best Practices

- **Aim for meaningful coverage, not 100%** -- focus on business logic, error paths, and conditional branches
- **Track coverage trends** -- falling coverage on a PR indicates untested new code
- **Cover both success and error paths** -- error handling branches are where many production bugs hide
- **Use coverage to find gaps, not as a goal** -- high coverage with weak assertions provides false confidence
- **Review coverage on every PR** -- integrate coverage reports into code review workflow
- **Exclude generated code** -- do not chase coverage in auto-generated code or boilerplate

## What's Next

- [Execute Tests](execute-tests.md) -- Test execution options and CI integration
- [Unit Testing](unit-testing.md) -- Write effective unit tests
- [Test Services & Clients](test-services-clients.md) -- Integration testing patterns
