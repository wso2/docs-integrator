---
sidebar_position: 2
title: Develop
description: "How do I build, transform, and test my integration?"
---

# Develop

Everything about making your integration work on your machine. This is the working developer's handbook.

:::info Boundary Rule
This section covers everything while code is on your machine. For deployment, CI/CD, observability, and security in production → [Deploy & Operate](/docs/deploy-operate).
:::

## Build

Create integration artifacts — services, event handlers, automations, file processors, AI agents, and more.

- [Services (HTTP, GraphQL, gRPC, WebSocket, TCP)](build/services.md)
- [Event Handlers (Kafka, RabbitMQ, NATS, MQTT)](build/event-handlers.md)
- [Automations (Scheduled, Manual Triggers)](build/automations.md)
- [File Processing (FTP, SFTP, Batch, Polling)](build/file-processing.md)
- [AI Agents & Natural Functions](build/ai-agents.md)
- [RAG Applications](build/rag-applications.md)
- [Control Flow](build/control-flow.md)
- [Error Handling & Retry Patterns](build/error-handling.md)
- [Configuration Management](build/configuration-management.md)
- [Working with Ballerina Pro-Code](build/ballerina-pro-code.md)

## Transform

Map, convert, and reshape data between systems and formats.

- [Visual Data Mapper](transform/data-mapper.md)
- [JSON Processing](transform/json.md)
- [XML Processing](transform/xml.md)
- [CSV & Flat File Processing](transform/csv-flat-file.md)
- [EDI Processing](transform/edi.md)
- [Type System & Records](transform/type-system.md)
- [Expressions & Functions](transform/expressions-functions.md)
- [AI-Assisted Data Mapping](transform/ai-assisted-mapping.md)

## Test

Validate your integrations before they leave your machine.

- [Built-in Try-It Tool](test/try-it.md)
- [Unit Testing](test/unit-testing.md)
- [Mocking External Services](test/mocking.md)
- [AI-Generated Test Cases](test/ai-test-generation.md)
- [Debugging in VS Code](test/debugging.md)
