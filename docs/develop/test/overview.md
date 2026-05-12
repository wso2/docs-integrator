---
title: Test
---

# Test

WSO2 Integrator provides a full testing toolkit built into the IDE. You do not need any external testing tool. Interactive verification, automated test authoring, AI-assisted generation, and coverage reporting are all available without leaving your development environment.

## Testing approaches

| Approach | What it does | When to use |
|---|---|---|
| **[Try-It tool](built-in-try-it-tool.md)** | Sends live requests to a running integration and shows the response instantly. No test code required. Supports HTTP services, GraphQL services, chat agents, and MCP servers. | While building. Verify behavior after every change before writing formal tests. |
| **[Test Explorer](test-explorer.md)** | Runs automated test cases written with the Ballerina test framework. Provides a visual view of pass/fail results, lets you re-run failures, and generates HTML and coverage reports. | When a feature is stable. Write repeatable tests that run in CI and catch regressions. |
| **[Generate tests with AI](ai-generated-cases.md)** | Uses Copilot to analyze your integration code and generate Ballerina test functions automatically, including mocks and edge cases. | When you need test coverage fast. Generate a first draft of the test suite and refine from there. |

## Choosing the right approach

Start with the **Try-It tool** during active development. Once the feature behaves correctly, use **Generate tests with AI** to produce an initial test suite quickly, then review and extend those tests manually. Use **Test Explorer** to run the full suite, check coverage, and integrate with your CI pipeline.

The three approaches complement each other. Most integrations use all three at different points in the development lifecycle.

## What automated tests cover

The Ballerina test framework supports the full range of test patterns you need for integration code:

- **[Unit tests](unit-testing.md)**: Write test functions with assertions to verify logic in isolation.
- **[Test lifecycle](configure-tests.md)**: Run setup and teardown logic at the suite, group, or per-test level.
- **[Data-driven tests](data-driven-tests.md)**: Run one test function across many input combinations using data providers.
- **[Test groups](groups.md)**: Tag tests with labels and run or skip subsets from the command line.
- **[Mocking](mocking.md)**: Replace HTTP clients, external services, and module functions with lightweight stubs.
- **[Service and client tests](services-clients.md)**: Start a real service in the test process and send requests against it.
- **[Code coverage and reports](code-coverage-and-reports.md)**: Measure line coverage, enforce thresholds, and export JaCoCo XML for CI dashboards.

## What's next

- [Try-It tool](built-in-try-it-tool.md) — verify behavior interactively without writing test code
- [Write unit tests](unit-testing.md) — test functions, assertions, and directory structure
- [Generate tests with AI](ai-generated-cases.md) — use Copilot to produce a test suite from your integration code
- [Execute tests](execute-tests.md) — CLI options for filtering, rerunning, and parallelizing test runs
- [Code coverage and reports](code-coverage-and-reports.md) — measure coverage and enforce thresholds in CI
