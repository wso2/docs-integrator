---
sidebar_position: 1
title: Integration Artifacts
description: "Understand the different types of integration artifacts: services, event handlers, file handlers, automations, AI agents, MCP services, and more."
---

# Integration Artifacts

Integration artifacts are the building blocks of your integrations. Each artifact type serves a specific purpose -- exposing an endpoint, reacting to events, processing files, running scheduled tasks, or powering AI agents. Understanding these types helps you choose the right approach for each integration scenario.

## Artifact Overview

WSO2 Integrator supports the following artifact types:

| Category | Artifact | Description |
|---|---|---|
| **Automation** | Automation | Runs manually or on a schedule -- data sync, reports, maintenance jobs |
| **AI Integration** | AI Chat Agent | LLM-backed agents accessible via chat or API |
| **AI Integration** | MCP Service | Exposes capabilities via Model Context Protocol for AI assistants |
| **Integration as API** | HTTP Service | Expose integrations as REST APIs |
| **Integration as API** | GraphQL Service | Expose integrations as GraphQL APIs |
| **Integration as API** | TCP Service | Raw TCP socket-based services |
| **Event Integration** | Kafka Service | React to Apache Kafka messages |
| **Event Integration** | RabbitMQ Service | React to RabbitMQ messages |
| **Event Integration** | MQTT Service | React to MQTT messages |
| **Event Integration** | Azure Service Bus | React to Azure Service Bus messages |
| **Event Integration** | Salesforce Trigger | React to Salesforce events |
| **Event Integration** | GitHub Trigger | React to GitHub webhook events |
| **File Integration** | FTP Service | Process files from FTP/FTPS/SFTP servers |
| **File Integration** | Directory Service | Watch local directories for file arrivals |
| **Other** | Functions | Reusable code blocks |
| **Other** | Data Mapper | Visual format transformation |
| **Other** | Type | Custom data type definitions |
| **Other** | Connection | Reusable configurations for external systems |
| **Other** | Configuration | Environment-specific settings |

## Five Primary Integration Types

| Type | Purpose | Trigger |
|---|---|---|
| **Automation** | Sync data, generate reports, run routine jobs | Timer/schedule or manual |
| **AI Agent** | Reason and act using GenAI models, respond to input, access tools | User input / dynamic |
| **Integration as API** | Expose integration as a real-time API | Incoming HTTP/GraphQL/TCP requests |
| **Event Integration** | Reactive workflows from message sources | Kafka, RabbitMQ, MQTT messages |
| **File Integration** | Batch uploads, scheduled file processing | Files appearing in folder/FTP |

## How Artifacts Relate

A typical integration combines multiple artifact types. For example, an order processing system might include:

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  HTTP Service    │────▶│  Event Handler   │────▶│  Data Persistence│
│  (receive order) │     │  (process order)  │     │  (store order)   │
└─────────────────┘     └──────────────────┘     └──────────────────┘
        │                        │
        ▼                        ▼
┌─────────────────┐     ┌──────────────────┐
│  Email           │     │  Automation       │
│  (confirmation)  │     │  (daily report)   │
└─────────────────┘     └──────────────────┘
```

## Creating Artifacts

You can create artifacts in two ways:

### Visual Designer

1. Open the WSO2 Integrator sidebar in VS Code.
2. Click the **+** button next to the artifact category.
3. Select the artifact type and configure its properties.

### Code

Create a new `.bal` file and write the artifact definition directly:

```ballerina
// A simple HTTP service artifact
import ballerina/http;

service /api on new http:Listener(8090) {
    resource function get health() returns string {
        return "OK";
    }
}
```

## Artifact Lifecycle

Every artifact follows the same lifecycle:

1. **Create** -- Define the artifact using the visual designer or code
2. **Configure** -- Set connection details, parameters, and behavior
3. **Implement** -- Add the integration logic (flow designer or pro-code)
4. **Test** -- Validate with Try-It, unit tests, or mocks
5. **Deploy** -- Package and deploy to a runtime environment

## What's Next

- [Services](services.md) -- Build HTTP, GraphQL, gRPC, WebSocket, TCP, and WebSub services
- [Event Handlers](event-handlers.md) -- React to messages from brokers and external systems
- [Design Logic](/docs/develop/design-logic) -- Build the logic inside your artifacts
