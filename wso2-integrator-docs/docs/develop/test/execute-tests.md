---
sidebar_position: 9
title: Execute Tests
description: Run Ballerina tests from CLI and IDE, configure parallel execution, and manage test output.
---

# Execute Tests

Run your integration tests using the Ballerina CLI or directly from VS Code. This page covers all the ways to execute tests, control parallelism, filter test runs, and interpret results.

## Running Tests from the CLI

Use the `bal test` command to execute tests in your project.

```bash
# Run all tests in the current package
bal test

# Run tests for a specific module
bal test --module transforms

# Run tests in a specific file (by providing the package path)
bal test mypackage
```

## Running Tests from VS Code

The WSO2 Integrator extension for VS Code provides integrated test execution.

<!-- TODO: Screenshot of VS Code test runner panel -->

1. **Run a single test** -- Click the green play button next to any `@test:Config` function
2. **Run all tests in a file** -- Click the play button at the top of a test file
3. **Run all tests** -- Use the Testing panel in the sidebar, or press `Ctrl+Shift+P` and search for "Ballerina: Run All Tests"
4. **Debug a test** -- Click the debug icon next to a test function to run it with breakpoints enabled

## Filtering Tests

### By Group

```bash
# Run only tests tagged with specific groups
bal test --groups unit

# Run tests in multiple groups
bal test --groups unit,transform

# Exclude specific groups
bal test --disable-groups slow,flaky
```

### By Test Name

```bash
# Run tests matching a pattern
bal test --tests testOrderCreation

# Run multiple specific tests
bal test --tests testOrderCreation,testOrderCancellation
```

## Parallel Test Execution

By default, Ballerina runs tests sequentially within a module. Enable parallel execution for faster test runs when tests are independent.

```bash
# Enable parallel test execution
bal test --parallel
```

:::caution When to avoid parallel execution
Avoid parallel execution when tests share mutable state, use the same database tables, or bind to the same network ports. Use sequential execution or test groups to isolate conflicting tests.
:::

### Controlling Parallelism

```bash
# Run with a specific number of parallel workers
bal test --parallel --workers 4
```

### Designing Tests for Parallel Execution

```ballerina
import ballerina/test;
import ballerina/uuid;

// Good: Each test uses unique identifiers to avoid conflicts
@test:Config {
    groups: ["parallel-safe"]
}
function testCreateUniqueOrder() returns error? {
    string orderId = uuid:createRandomUuid();
    // Each test run creates a unique order -- no conflicts
    test:assertTrue(orderId.length() > 0);
}

// Bad: Tests that share a fixed resource can conflict in parallel
// @test:Config {}
// function testUpdateSharedRecord() {
//     // Modifies the same record as another test -- not parallel-safe
// }
```

## Test Output and Reports

### Console Output

By default, test results appear in the console.

```
Compiling source
    myorg/mypackage:0.1.0

Running Tests

    mypackage

        [pass] testOrderCreation
        [pass] testOrderValidation
        [pass] testOrderCancellation
        [fail] testPaymentProcessing

                Error: assertEqual failed
                    expected: "approved"
                    actual:   "declined"
                at mypackage:tests/payment_test.bal:45

        4 passing
        1 failing
        0 skipped
```

### Test Report Generation

Generate an HTML test report for detailed results.

```bash
# Generate a test report
bal test --test-report

# The report is generated at:
# target/report/test_results.html
```

<!-- TODO: Screenshot of HTML test report -->

The HTML report includes:
- Summary of passed, failed, and skipped tests
- Execution time per test
- Failure details with stack traces
- Group-level aggregation

## Rerunning Failed Tests

During development, focus on fixing failures without rerunning the entire suite.

```bash
# Run only previously failed tests
bal test --rerun-failed
```

## Test Configuration

### Environment-Specific Test Config

Create a `Config.toml` file in the `tests/` directory to provide test-specific configuration values.

```toml
# tests/Config.toml
[mypackage]
backendUrl = "http://localhost:9095/mock"
dbHost = "localhost"
dbPort = 5432
maxRetries = 1
```

```ballerina
import ballerina/test;

configurable string backendUrl = ?;
configurable int maxRetries = ?;

@test:Config {}
function testWithConfig() {
    // Uses values from tests/Config.toml
    test:assertEquals(maxRetries, 1);
}
```

### Ballerina.toml Test Settings

Configure test behavior in `Ballerina.toml`.

```toml
[build-options]
observabilityIncluded = false
graalvm = false

[test-options]
parallel = true
```

## Continuous Integration

### Running Tests in CI/CD

```bash
# CI-friendly command with report generation
bal test --test-report --code-coverage

# Exit code reflects test results:
# 0 = all passed
# 1 = one or more failures
echo $?
```

### Failing the Build on Test Failures

The `bal test` command returns a non-zero exit code when any test fails, which naturally fails CI pipelines.

```yaml
# GitHub Actions example
- name: Run tests
  run: bal test --test-report --code-coverage

- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: target/report/
```

## Troubleshooting Test Execution

| Issue | Solution |
|-------|----------|
| Port already in use | Use unique ports per service or add `@test:AfterSuite` cleanup |
| Tests pass locally, fail in CI | Check for environment-dependent configs in `tests/Config.toml` |
| Timeout errors | Increase client timeout values in test configurations |
| Random test failures | Check for shared mutable state; disable parallel execution |
| Tests not discovered | Verify test files are in the `tests/` directory and functions have `@test:Config` |

## Best Practices

- **Run `bal test --groups unit` frequently** during development for fast feedback
- **Reserve full test suites** (`bal test`) for pre-commit or CI runs
- **Always generate test reports in CI** using `--test-report` for visibility
- **Use `--rerun-failed`** to iterate quickly on failures
- **Design tests to be parallel-safe** by using unique identifiers and isolated resources

## What's Next

- [Code Coverage](code-coverage.md) -- Measure and improve test coverage
- [Test Groups & Selective Execution](test-groups.md) -- Organize tests with groups
- [Debugging in VS Code](/docs/develop/debugging/editor-debugging) -- Debug failing tests step-by-step
