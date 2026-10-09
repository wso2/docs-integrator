---
sidebar_position: 8
title: Code Coverage and Reports
description: Generate test reports, measure code coverage, enforce coverage thresholds, and export JaCoCo XML in WSO2 Integrator.
keywords: [wso2 integrator, code coverage, test report, jacoco, coverage threshold]
slug: /develop-and-test/test/test-explorer/code-coverage-and-reports
---

# Code Coverage and Reports

Passing tests tell you that the scenarios you wrote work correctly. Code coverage tells you which parts of your integration were never reached by any test, the blind spots where bugs can hide undetected. Use reports and coverage data to share results with teammates, catch gaps before they reach production, and enforce standards automatically in CI.

## Generate a test report

Pass `--test-report` to produce an HTML report after the run. The path to the file is printed in the console output.

```
bal test --test-report
```

<!-- TODO: add test report screenshot — /img/develop/test/code-coverage/test-report.gif -->

The report shows:

- Total passing, failing, and skipped counts for the whole package
- Per-module breakdown
- Individual test function results with status and failure messages

## Measure code coverage

Pass `--code-coverage` to track which lines of your source files were executed during the test run. Combine it with `--test-report` to include coverage data in the HTML report alongside the test results.

```
bal test --test-report --code-coverage
```

<!-- TODO: add code coverage report screenshot — /img/develop/test/code-coverage/code-coverage-report.gif -->

The extended report adds:

- Package-level average coverage percentage
- Module-level average coverage
- Per-source-file line coverage with highlighted covered and uncovered lines

Coverage measurement only includes Ballerina source files in the package. Files inside the `tests/` directory are excluded because they are test infrastructure, not production code.

## Enforce a minimum coverage threshold

Use `--min-coverage` to make the test run fail if coverage falls below a percentage you specify. This is the standard way to prevent coverage from silently eroding in CI. The pipeline fails early and visibly when new code is added without corresponding tests.

```
bal test --code-coverage --min-coverage=80
```

The command exits with a non-zero status if coverage is below 80%, which causes most CI systems to mark the job as failed and block the merge.

Set the threshold to match your team's quality bar. A common starting point is 70–80% for integration code where some branches are intentionally defensive.

## Export JaCoCo XML

Pass `--coverage-format=xml` to produce a JaCoCo XML report alongside the console output. You can upload this file to CI/CD tools such as Codecov to display coverage information for both the Ballerina sources and the native Java sources used within the package.

```
bal test --code-coverage --coverage-format=xml
```

Combine with `--test-report` to generate both the HTML report and the XML export in one pass:

```
bal test --test-report --code-coverage --coverage-format=xml
```

## Exclude files from coverage

Generated code, scaffold files, or vendor modules often inflate or skew coverage numbers without providing useful signal. Use `--excludes` to omit specific files, directories, or patterns. The flag accepts a comma-separated list, and the glob wildcards `*` and `**` are supported.

| Pattern | What it excludes |
|---|---|
| `./` or `./**` | All source files in the package |
| `./*` | All source files in the default module |
| `./generated/**` | All files under the `generated/` directory |
| `./modules/**` | All files under the `modules/` directory |
| `*.bal` | All Ballerina source files matched by name |
| `/absolute/path/main.bal` | A specific file by absolute path |

For example, to exclude generated OpenAPI stubs from coverage while still measuring everything else:

```
bal test --test-report --code-coverage --coverage-format=xml --excludes='./generated'
```

## What's next

- [Execute tests](execute-tests.md) — CLI options for running, filtering, and parallel test execution
- [Test Explorer](test-explorer.md) — run tests and view results from the IDE without the command line
- [Write unit tests](unit-testing.md) — assertions, directory structure, and configuration values
- [Test groups](groups.md) — partition tests into named groups to target coverage runs
