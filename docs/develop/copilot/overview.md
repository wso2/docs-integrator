---
title: Copilot capabilities
---

# Copilot capabilities

WSO2 Integrator Copilot builds integrations from natural language prompts. It produces ready-to-use artifacts that drop straight into your project. Iterate through follow-up prompts to refine logic, add features, or modify behavior.

## Planning

**Edit Mode** (the default) applies changes directly to your flow for quick adjustments, bug fixes, or tweaks, while **Plan Mode** is for building new features or complex integrations from scratch. Switch between the two as needed using the toggle in the Copilot input bar.

In **Plan Mode**, Copilot does not generate code immediately. Instead, it analyzes your request and provides a structured, step-by-step breakdown of the execution tasks. This gives you the opportunity to review the logic, add missing steps, or iterate on the plan before any artifacts are created.

![Plan mode showing a structured step-by-step breakdown of execution tasks.](/img/develop/copilot/plan-mode.png)

## Generating connectors

If you need to integrate with a service that does not have a pre-built connector, provide an OpenAPI specification and Copilot generates the custom connector code required to bridge the gap.

![Connector Generator generating custom connector code from an OpenAPI specification.](/img/develop/copilot/connector-generator.png)

## Web tools

If Copilot needs external context or up-to-date documentation, it can trigger web tools to search the internet. Copilot always asks for permission before performing a search. You can enable or disable this via the toggle in the input bar.

![Web tools permission prompt in the Copilot input bar.](/img/develop/copilot/web-tool.png)

## Clarifying requirements

During the planning or generation phase, Copilot may identify missing information that is critical to the integration. If a requirement is ambiguous, it pauses and asks you to provide these details in the form of a selection.

![Clarifying requirements prompt showing selection options.](/img/develop/copilot/clarifying-requirements.png)

## Review

Once the generation process is complete, you can inspect exactly what was built before finalizing the changes. You can review the generated artifacts as a diagram or as source code with a diff view.

![Review mode showing the generated integration diagram.](/img/develop/copilot/review-mode.png)

## Configuring

When you are ready to run or test the integration, Copilot identifies configurations required to execute the flow and prompts you to enter the necessary configurables.

![Configuration collection prompt showing required fields for the integration.](/img/develop/copilot/config-collection.png)

## Testing

Copilot automates testing by generating tests for your integration and executing them using the built-in test runner, allowing you to immediately verify the functionality of the generated artifacts.

![Test runner showing generated tests and results.](/img/develop/copilot/running-tests.png)

## Try your services

Once your integration is running, you can try out your services directly through Copilot. Describe what you want to test in plain language, and Copilot runs the appropriate curl commands against your service and returns the results.

![Copilot running curl commands against a running service.](/img/develop/copilot/try-it.png)

## Debugging

Copilot can run your integrations and read the runtime logs to debug issues as they occur.

![Copilot debugging an integration by reproducing the failing request, inspecting the HTTP response and service logs, and identifying a case-sensitivity bug in the team filter.](/img/develop/copilot/debuging-using-service-logs.png)
