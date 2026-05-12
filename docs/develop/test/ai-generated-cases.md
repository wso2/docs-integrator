---
title: Generate tests with AI
---

# Generate tests with AI

Writing test cases with WSO2 Integrator Copilot works the same way as writing them manually through the visual designer or in Ballerina code. Instead of building each test yourself, you describe what you want in the Copilot chat and it generates the code for you. Copilot generates `@test:Config` functions, data providers, mocks, and lifecycle hooks that slot directly into your existing `tests/` directory and run with `bal test`.

## Generate tests with WSO2 Integrator Copilot

Open the Copilot panel and describe the test you want. You can ask for a specific function, a whole service, or a particular scenario. Copilot reads your source code and generates matching Ballerina test code.

Example prompts to get started:

- "Write tests for the `GET /orders/{id}` resource covering both a valid ID and a missing ID."
- "Generate a data-driven test for the `calculateDiscount` function with at least five input combinations."
- "Add mock stubs for the payment gateway client and write a test for a failed charge."

Copilot places the generated code in the `tests/` folder of your module. Review each function before running it. Generated tests are a starting point, not a finished product.

## Best practices

### Plan your test scenarios first

Before prompting Copilot, decide what you want to verify. A vague prompt produces generic tests. A specific prompt produces useful ones.

Instead of asking "generate tests for my service," describe the scenarios:

- Which resources or functions need coverage?
- What is the expected behavior on the happy path?
- What should happen when inputs are invalid or missing?

Sharing this context in your prompt gives Copilot enough information to generate assertions that reflect your actual business logic rather than inferred defaults.

### Ask about edge cases

Copilot can help you discover edge cases you might not have considered. After generating a first set of tests, follow up with prompts like:

- "What edge cases am I missing for this endpoint?"
- "Are there boundary conditions in the `calculateShipping` function I should test?"
- "What would cause this data transformation to fail?"

Use the answers to add targeted tests for the gaps Copilot identifies.

### Ask Copilot to improve existing tests

If you already have tests, Copilot can review them and suggest improvements. Share your test file and ask:

- "Are the assertions in these tests strong enough to catch real bugs?"
- "Can you add negative test cases to the existing suite?"
- "Refactor these tests to use a data provider instead of duplicating the function body."

This is particularly useful for tests written quickly under time pressure that could benefit from better coverage or cleaner structure.

### Review before committing

Generated tests reflect what Copilot inferred from your code. Always check that:

- Assertions match your actual expected values, not just plausible-looking ones.
- Mock return values use realistic data that represents what the real dependency returns.
- Test function names describe the specific scenario, not just the function being called.

## What's next

- [Write unit tests](unit-testing.md) — test function structure, assertions, and `@test:Config` reference
- [Mocking](mocking.md) — review and adjust the mock stubs Copilot generates
- [Code coverage and reports](code-coverage-and-reports.md) — measure how much of your code the generated tests exercise
- [Test Explorer](test-explorer.md) — run and review test results from the IDE
