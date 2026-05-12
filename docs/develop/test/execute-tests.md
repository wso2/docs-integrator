---
title: Execute tests
---

# Execute tests

The `bal test` command discovers and runs all tests in the current package. Filtering by group, function name, or data case lets you focus on what matters during development, while CI runs the full suite before merge.

## How tests execute

The framework runs lifecycle functions in a fixed order for each test. Knowing this sequence helps you reason about where setup state is available and what gets skipped when something fails.

1. `@test:BeforeSuite`
2. `@test:BeforeGroups` (for each group the test belongs to)
3. `@test:BeforeEach`
4. `before` function (per-test attribute)
5. Test function
6. `after` function (per-test attribute)
7. `@test:AfterEach`
8. `@test:AfterGroups` (for each group)
9. `@test:AfterSuite`

### Failure behavior

| Failure in | What gets skipped |
|---|---|
| `@test:BeforeSuite` | All following functions are skipped. `@test:AfterSuite` with `alwaysRun: true` still runs. |
| `@test:BeforeGroups` | Tests in that group are skipped along with their per-test setup and teardown. `@test:AfterGroups` is skipped unless `alwaysRun: true`. Other groups are not affected. |
| `@test:BeforeEach` | All test functions are skipped. `@test:AfterSuite` still runs. `@test:AfterGroups` does not run unless `alwaysRun: true`. |
| `before` attribute function | That test and its `after` function are both skipped. |
| Test function | Nothing else is skipped. Other tests continue normally. |
| `@test:AfterEach` | All subsequent `@test:BeforeEach`, `@test:AfterEach`, and test functions are skipped. |

If `alwaysRun: true` is set on `@test:AfterGroups` or `@test:AfterSuite`, those functions run regardless of the status of other functions.

## Run all tests

```
bal test
```

## Filter by group

List all groups defined in the package before targeting one:

```
bal test --list-groups
```

Run only tests that belong to one or more groups:

```
bal test --groups <group_1>,<group_2>
```

Run everything except tests in a specific group:

```
bal test --disable-groups <group_1>
```

See [Test groups](groups.md) for how to assign tests to groups and set up group-level lifecycle hooks.

## Filter by test function

Run a single test function by name:

```
bal test --tests <test_function>
```

Run a function in a specific module when multiple modules define functions with the same name:

```
bal test --tests PackageName:<test_function>
```

Run all test functions in a module using the `*` wildcard:

```
bal test --tests PackageName.<module_name>:*
```

## Run a specific data-driven case

Data-driven tests generate one execution per input set. Target a single case by appending `#` and the case identifier to the function name. Use this when debugging one failing scenario without waiting for the full data set.

For map data providers, use the key in double quotes:

```
bal test --tests testDiscountCalculation#"half-price"
```

For list data providers, use the zero-based index:

```
bal test --tests testAddition#1
```

See [Data-driven tests](data-driven-tests.md) for the full wildcard syntax.

## Rerun only failed tests

After a partial failure, skip the tests that already passed and rerun only what failed. This shortens the feedback loop when fixing a test suite incrementally:

```
bal test --rerun-failed
```

## Generate reports during a run

Append report flags to any test run. They do not affect which tests execute.

Generate an HTML summary report:

```
bal test --test-report
```

Collect coverage data only, without the HTML report:

```
bal test --code-coverage
```

Generate an HTML report with line coverage data included:

```
bal test --test-report --code-coverage
```

Export a JaCoCo XML file for upload to Codecov or SonarQube:

```
bal test --code-coverage --coverage-format=xml
```

Generate both the HTML report and the JaCoCo XML file in one run:

```
bal test --test-report --code-coverage --coverage-format=xml
```

Exclude files or directories from the coverage report using `--excludes`. The flag accepts a comma-separated list of paths and supports `*` and `**` glob patterns.

| Pattern | What it excludes |
|---|---|
| `./` or `./**` | All source files in the package |
| `./*` | All source files in the default module |
| `./generated/**` | All files under the `generated/` directory |
| `./modules/**` | All files under the `modules/` directory |
| `./modules/*/util.bal` | All `util.bal` files under the `modules/` directory |
| `*.bal` | All Ballerina source files by name |
| `/absolute/path/main.bal` | A specific file by absolute path |

```
bal test --test-report --code-coverage --coverage-format=xml --excludes='./generated'
```

See [Code coverage and reports](code-coverage-and-reports.md) for threshold enforcement with `--min-coverage`.

## Run tests in parallel

Tests run serially by default to avoid interference when they share mutable state. Enable parallel execution to cut total test time for large suites where most tests are independent:

```
bal test --parallel
```

The framework evaluates each test against the concurrency safety rules before running it in parallel. Tests that do not qualify run serially, and the output explains why.

### Make a test parallel-safe

A test qualifies for parallel execution when all of the following are true:

1. The test function is `isolated`.
2. For data-driven tests: the data provider is also `isolated`, and all parameter types are subtypes of `readonly`.
3. All lifecycle functions attached to the test (`before`, `after`, `@test:BeforeEach`, `@test:AfterEach`, `@test:BeforeGroups`, `@test:AfterGroups`) are `isolated`.

```ballerina
import ballerina/lang.runtime;
import ballerina/test;

isolated int processedCount = 0;

@test:Config {
    dataProvider: orderDataProvider
}
isolated function testOrderProcessing(string orderId, decimal amount, string expectedStatus) returns error? {
    test:assertEquals(amount > 0.0d, true);
    runtime:sleep(0.05);
    lock {
        processedCount += 1;
    }
}

isolated function orderDataProvider() returns map<[string, decimal, string]>|error {
    return {
        "standard":  ["ORD-001", 99.99d,  "approved"],
        "large":     ["ORD-002", 999.99d, "review"],
        "zero":      ["ORD-003", 0.0d,    "rejected"]
    };
}
```

The `lock` block serializes writes to `processedCount` so parallel executions do not race on that value.

### Force a test to run serially

Some tests legitimately depend on exclusive access to a shared resource such as a port, a file, or a stateful mock. Mark them with `serialExecution: true` to guarantee they run one at a time even when `--parallel` is active:

```ballerina
import ballerina/test;

@test:Config {serialExecution: true}
function testDatabaseMigration() {
    // Holds an exclusive write lock on the test database.
    // Running this concurrently with other DB tests would corrupt state.
    test:assertTrue(true);
}
```

## All options

For the full list of available flags, run:

```
bal test --help
```

## What's next

- [Code coverage and reports](code-coverage-and-reports.md) — generate HTML reports, enforce coverage thresholds, and export JaCoCo XML
- [Test groups](groups.md) — assign and filter tests by group label
