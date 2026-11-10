---
sidebar_position: 0
sidebar_label: Test Toolkit
title: Test Toolkit
description: Verify your work in WSO2 Agent Builder with the built-in Try-It tool, agent evaluations, and automated Ballerina tests.
keywords: [wso2 agent builder, testing, try-it, agent evaluation, evalset, test explorer, code coverage]
slug: /develop-and-test/test
---

# Test Toolkit

WSO2 Agent Builder provides a full testing toolkit built into the editor. You do not need any external testing tool. Interactive verification, agent evaluation, automated test authoring, and coverage reporting are all available without leaving your development environment.

## Testing approaches

| Approach | What it does | When to use |
|---|---|---|
| **[Try-It tool](try-it-tool/try-it-tool.md)** | Sends live requests to a running integration and shows the response instantly. No test code required. Supports chat agents, HTTP services, and MCP servers. | While building. Verify behavior after every change before writing formal tests. |
| **[Agent evaluations](../test/evaluations/evaluations.md)** | Capture agent session traces into evalsets, then score agent responses against expected behavior with LLM-as-judge and regression checks. | When testing AI agents. Validate response quality and tool use, and catch regressions over time. |
| **[Test Explorer](test-explorer/test-explorer.md)** | Runs automated test cases written with the Ballerina test framework. Provides a visual view of pass/fail results, lets you re-run failures, and generates HTML and coverage reports. | When a feature is stable. Write repeatable tests that run in CI and catch regressions. |
| **[Generate integration tests](../../editor/copilot/capabilities.md#generate-integration-tests)** | WSO2 Agent Builder Copilot writes Ballerina tests for your integration, such as tests for an agent's tools, and runs them with the built-in test runner. | When you want test coverage fast. Generate a first draft, then review and extend. |

## Choosing the right approach

Start with the **Try-It tool** during active development to verify behavior after every change. For AI agents, use **Agent evaluations** to score response quality and catch regressions as you iterate. Use **Test Explorer** to run Ballerina unit tests, check coverage, and integrate with your CI pipeline. To bootstrap a suite quickly, let [WSO2 Agent Builder Copilot generate integration tests](../../editor/copilot/capabilities.md#generate-integration-tests) and run them with the built-in test runner, then review and extend.

The approaches complement each other. Most projects use several of them at different points in the development lifecycle.

## What automated tests cover

The Ballerina test framework supports the full range of test patterns you need for integration code:

- **[Unit tests](test-explorer/unit-testing.md)**: Write test functions with assertions to verify logic in isolation.
- **[Test lifecycle](test-explorer/configure-tests.md)**: Run setup and teardown logic at the suite, group, or per-test level.
- **[Data-driven tests](test-explorer/data-driven-tests.md)**: Run one test function across many input combinations using data providers.
- **[Test groups](test-explorer/groups.md)**: Tag tests with labels and run or skip subsets from the command line.
- **[Mocking](test-explorer/mocking.md)**: Replace HTTP clients, external services, and module functions with lightweight stubs.
- **[Service and client tests](test-explorer/services-clients.md)**: Start a real service in the test process and send requests against it.
- **[Code coverage and reports](test-explorer/code-coverage-and-reports.md)**: Measure line coverage, enforce thresholds, and export JaCoCo XML for CI dashboards.

## What's next

- [Try-It tool](try-it-tool/try-it-tool.md) — verify behavior interactively without writing test code
- [Evaluate agent behavior](../test/evaluations/evaluations.md) — score agent responses with evalsets and LLM-as-judge
- [Write unit tests](test-explorer/unit-testing.md) — test functions, assertions, and directory structure
- [Generate integration tests with Copilot](../../editor/copilot/capabilities.md#generate-integration-tests) — let Copilot write and run tests for your agent tools
- [Execute tests](test-explorer/execute-tests.md) — CLI options for filtering, rerunning, and parallelizing test runs
- [Code coverage and reports](test-explorer/code-coverage-and-reports.md) — measure coverage and enforce thresholds in CI
