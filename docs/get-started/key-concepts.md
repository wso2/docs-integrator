---
title: Key Concepts
---

# Key Concepts

This page introduces every major product component in 2–3 sentences. Think of it as your vocabulary guide—it gives you the map. The [Develop](/docs/develop/integration-artifacts/overview) section is the territory.

## Project

A workspace that contains your integration code, dependencies, configuration, and deployment artifacts. Each project is self-contained with its own `Ballerina.toml` file. For more information, see [Project structure](/docs/develop/understand-ide/views/project-view).

## Integration

A reusable piece of business logic that connects systems, transforms data, or orchestrates workflows. Integrations are the core building blocks in WSO2 Integrator—you compose them from [Automations](#automations), [AI agents](#ai-agents), [Services](#services), [Event handlers](#event-handlers), and [File processors](#file-processors).

## Library

A shareable collection of reusable components, functions, and connectors packaged for distribution. Libraries let you build once and use across multiple projects or share with your team.

## Services and listeners

A **listener** is a Ballerina construct that manages a connection to an external I/O source — an HTTP port, a message broker, a remote file server, or a local directory. It handles protocol details, authentication, and event detection (such as polling for new files or consuming messages).

A **service** is a Ballerina construct that defines the application logic for handling incoming events. A service attaches to a listener using the `on` keyword. The listener delivers events to the service, and the service processes them.

Multiple services can attach to the same listener. For example, two services can share one FTP listener to monitor different directories on the same server, or share one HTTP listener to serve different API paths on the same port.

This listener/service pattern is the foundation for all inbound integration types: [API services](#integration-as-api), [event integrations](#event-integrations), and [file integrations](#file-integrations).

## Integration as API

Expose your integrations over HTTP, GraphQL, gRPC, WebSocket, or TCP. The listener binds to a network port and the service defines the API endpoints that external systems call. This is the most common integration artifact.

## Automations

Scheduled or manually triggered integrations that run without an external request. Use automations for periodic data synchronization, cleanup tasks, or report generation.

## AI agents

Intelligent artifacts backed by large language models (LLMs). Agents can reason, use tools, maintain conversation memory, and orchestrate multi-step workflows.

## Services

Expose your integrations over HTTP, GraphQL, gRPC, WebSocket, or TCP. Services are the most common artifact—they define endpoints that external systems call.

## Event integrations

Reactive integrations where the listener connects to a message broker — Kafka, RabbitMQ, NATS, MQTT, Azure Service Bus, or Solace — and the service processes messages as they arrive. Use event integrations for real-time streaming data and event-driven architectures.

## File integrations

Integrations where the listener connects to a remote file server (FTP, SFTP, FTPS) or monitors a local directory, polling for new files. The service defines which directory to watch, which files to match, and how to process incoming content — as CSV, JSON, XML, text, or binary. For more information, see [Remote Servers (FTP/SFTP)](/docs/develop/integration-artifacts/file/ftp-sftp) and [Local Files](/docs/develop/integration-artifacts/file/local-files).

## Connectors

Pre-built modules for connecting to external systems—Salesforce, databases, Kafka, OpenAI, and 200+ more. Each connector handles authentication, serialization, and error handling. For more information, see [Connectors](/docs/connectors/overview).

## Data mapper

A visual data transformation tool in the WSO2 Integrator design view. Map fields between source and target schemas using the design interface, with AI-assisted suggestions. For more information, see [Data mapper](/docs/develop/integration-artifacts/supporting/data-mapper/data-mapper).

## Natural functions

LLM calls treated as typed function calls in your integration code. Define an input type and output type, and the platform handles the prompt, API call, and response parsing.

## Config.toml

The file where you define environment-specific configuration—database URLs, API keys, and feature flags. Different environments (dev, test, prod) have different `Config.toml` files.

## Integration control plane (ICP)

A dashboard for monitoring, managing, and troubleshooting running integrations in production. View logs, metrics, and trace requests across services. For more information, see [Integration control plane](/docs/deploy-operate/observe/icp).

## Ballerina

The programming language that powers the platform. You do not need prior experience to use the WSO2 Integrator design view, but understanding the basics of [Ballerina](https://ballerina.io/) enables advanced, code-driven capabilities.

## Low-code and pro-code

Seamless switching between the design view and the code editor in WSO2 Integrator. Changes in one view instantly appear in the other. This is not a code generation tool, and it provides bidirectional synchronization.
