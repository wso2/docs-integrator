---
title: Copilot Capabilities
---

# Copilot Capabilities

WSO2 Integrator Copilot builds integrations from natural language prompts. It produces ready-to-use artifacts in your project. Iterate through follow-up prompts to refine logic, add features, or modify behavior.

![WSO2 Integrator Copilot panel open alongside an integration project in the IDE.](/img/develop/copilot/copilot-overview.png)

## Modes

Copilot has two modes: plan and edit. Switch between them using the toggle in the Copilot input bar.

- **Edit Mode**: Copilot starts generating immediately and applies the changes to your integration. Best for quick edits.
- **Plan Mode**: Copilot first proposes a high-level plan with a step-by-step task breakdown. Review or revise the plan, then approve it to begin generation.

  ![Plan mode showing a structured step-by-step breakdown of execution tasks.](/img/develop/copilot/plan-mode.png)

## Generating connectors

Copilot can generate a custom connector when a pre-built one is not available. During integration generation, if no pre-built connector exists, Copilot prompts the user for an OpenAPI specification. The user can also directly request to generate a custom connector. Once generated, the connector is available for Copilot to use in the flow.

![Copilot generating custom connector code from an OpenAPI specification.](/img/develop/copilot/connector-generator.png)

## Using web tools

Copilot can search the internet for external context or up-to-date documentation. It asks for permission before each search unless you enable the web tools toggle in the input bar.

![Web tools permission prompt in the Copilot input bar.](/img/develop/copilot/web-tool.png)

## Clarifying requirements

During the planning or generation phase, Copilot may identify missing information that is critical to the integration. If a requirement is ambiguous, it pauses and presents a list of suggested options. Select one, or select **Other** to type your own answer.

![Clarifying requirements prompt showing selection options.](/img/develop/copilot/clarifying-requirements.png)

## Reviewing

After generation completes, you can inspect exactly what was built or changed before finalizing the changes. Review the generated artifacts as the flow diagram or as source code with a diff view.

![Review mode showing the generated integration diagram.](/img/develop/copilot/review-mode.png)

## Configuring

When you run or test the integration, Copilot identifies the required configurables and prompts you to enter them.

![Configuration collection prompt showing required fields for the integration.](/img/develop/copilot/config-collection.png)

## Testing

Copilot generates tests for your integration and runs them with the built-in test runner, allowing you to verify the generated artifacts immediately.

![Test runner showing generated tests and results.](/img/develop/copilot/running-tests.png)

## Trying your services

Once your integration is running, you can send test requests to your services from Copilot. Describe what you want to test in plain language, and Copilot calls your service and returns the response.

![Copilot calling a running service and showing the response.](/img/develop/copilot/try-it.png)

## Debugging

Copilot can run your integrations and read the runtime logs to debug issues as they occur.

![Copilot debugging an integration by reproducing the failing request, inspecting the HTTP response and service logs, and identifying a case-sensitivity bug in the team filter.](/img/develop/copilot/debugging-using-service-logs.png)

## Slash commands

Type `/` in the Copilot input bar to invoke a command for a specific task.

| Command | Description |
|---|---|
| `/ask` | Ask questions about Ballerina to be answered based on the documentation. |
| `/doc` | Generate documentation for your integration. |
| `/openapi` | Import OpenAPI specifications. |
| `/typecreator` | Create custom types. |
| `/datamap` | [Generate data mappings](../integration-artifacts/supporting/data-mapper/ai-mapping.md). |
| `/natural-programming` | Experimental. Generate code from requirements and check for drift. |

`/ask` answers only from the Ballerina documentation and does not use your codebase context. For questions about your code or any other topic, message Copilot directly without a command.

## See also

- [Getting started](getting-started.md) — Sign in to WSO2 Integrator Copilot.
- [Generate tests with AI](../test/ai-generated-cases.md) — Use Copilot to generate test cases.
- [AI data mapper](../integration-artifacts/supporting/data-mapper/ai-mapping.md) — Generate data mappings using AI.
- [Try-It tool](../test/built-in-try-it-tool.md) — Test services without leaving the IDE.
- [AI usage and data handling guidelines](../../reference/ai-usage-and-data-handling-guidelines.md) — How Copilot handles your data.
