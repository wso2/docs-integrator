---
title: Develop
---

# Develop

This section is the handbook for building integrations on your local machine with WSO2 Integrator. Use the visual designer or write Ballerina pro-code — the two stay in sync — and look up the specific task you need: create a service, transform a payload, run a test, profile a hot path.

:::tip Where Develop ends
If your code still lives on your machine, you're in **Develop**. Once you push it somewhere else, move to [Deploy and operate](../deploy-operate/deploy-and-operate.md).

:::info AI split
Tools that help **you** code faster (Copilot, AI test generation, AI-assisted data mapping) live here. Building **AI-powered** integrations (agents, RAG, MCP) belongs in [GenAI](../genai/overview).

## Create and organize

| | |
|---|---|
| **[Create integrations](create-integrations/create-a-new-integration.md)** | Start new projects from the WSO2 Integrator IDE or `bal new`, explore samples, build libraries, or migrate from MuleSoft, TIBCO, and WSO2 MI |
| **[Understand the IDE](understand-ide/understand-ide.md)** | Get to know the Integrator app, its views, and its editors |

## Build

| | |
|---|---|
| **[Integration artifacts](integration-artifacts/integration-artifacts.md)** | Automations, services (HTTP, GraphQL, gRPC, TCP, WebSub), event handlers (Kafka, RabbitMQ, MQTT, Salesforce, GitHub), file handlers, and supporting artifacts |
| **[Design integration logic](design-logic/design-logic.md)** | Visual designer, connections, control flow, error handling, expressions, query expressions, and Ballerina pro-code |
| **[Transform](transform/data-mapper.md)** | Visual Data Mapper together with JSON, XML, CSV, EDI, and YAML/TOML processing |

## Try, test, and debug

| | |
|---|---|
| **[Try and test](test/built-in-try-it-tool.md)** | Built-in Try-It tool, unit testing, data-driven tests, mocking, code coverage, and AI-generated test cases |
| **[Debugging and troubleshooting](debugging/troubleshooting.md)** | Editor debugging, remote debugging, strand dumps, and performance profiling |

## Tools

| | |
|---|---|
| **[Integration tools](tools/integration-tools/openapi-tool.md)** | OpenAPI, GraphQL, AsyncAPI, gRPC, WSDL, XSD, EDI, and Health tools |
| **[Persist tool](tools/integration-tools/persist-tool.md)** | `bal persist` — type-safe CRUD for MySQL, PostgreSQL, MSSQL, and more |
| **[Migration tools](tools/migration-tools/migration-tools.md)** | Migrate from WSO2 MI, MuleSoft, TIBCO, or Azure Logic Apps |
| **[Scan tool](tools/other/scan-tool.md)** | Static analysis rules for code quality |

## What's next

- [Create a new integration](create-integrations/create-a-new-integration.md) — Start a project in the WSO2 Integrator IDE or from the CLI
- [Design integration logic](design-logic/design-logic.md) — Wire up the flow between request and response
- [Deploy and operate](../deploy-operate/deploy-and-operate.md) — Ship your integration once it's ready
