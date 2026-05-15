---
title: Integration Artifacts
---

# Integration Artifacts

Integration artifacts are the building blocks of every integration. Each type is designed for a specific trigger and communication pattern: receiving HTTP requests, reacting to messages, processing files, running on a schedule, or serving AI agent tools. Choosing the right artifact for the job keeps your integration logic focused and your project easy to navigate.

## Artifact categories

### Automation

Run integration logic on a schedule or manually, without a network listener.

| Artifact | Description |
|---|---|
| [Automation](automation.md) | Runs on a cron schedule or manually. Use for data sync, report generation, and routine maintenance jobs. |

### AI integrations

Build AI-powered integrations that use large language models to reason, respond, and act.

| Artifact | Description |
|---|---|
| AI Chat Agent | An LLM-backed agent accessible via a chat interface or API. Covered in the [AI Integrations](../../genai/overview.md) section. |
| MCP Service | Exposes integration capabilities as tools via the Model Context Protocol for use by AI assistants. Covered in the [AI Integrations](../../genai/overview.md) section. |

### Integration as API

Expose your integration logic as a callable endpoint. Clients send a request and receive a response.

| Artifact | Description |
|---|---|
| [HTTP service](service/http.md) | Exposes integrations as REST APIs. Use for CRUD operations, webhooks, and any HTTP request/response pattern. |
| [GraphQL service](service/graphql.md) | Exposes integrations as a GraphQL API. Use when clients need to query exactly the fields they want. |
| [gRPC service](service/grpc.md) | Contract-first service using protocol buffers. Use for high-performance communication between internal services. |
| [WebSocket service](service/websocket.md) | Full-duplex service over a persistent connection. Use for real-time, bidirectional communication. |
| [TCP service](service/tcp.md) | Raw TCP socket service. Use for custom binary or text-based protocol implementations. |
| [WebSub hub](service/websub-hub.md) | Publish/subscribe hub using the WebSub protocol. Use to distribute content updates to registered subscribers. |

### Event integration

React to messages or events produced by external systems. The integration runs when something happens, not when a client calls it.

| Artifact | Description |
|---|---|
| [Kafka](event/kafka.md) | Consumes messages from Apache Kafka topics. |
| [RabbitMQ](event/rabbitmq.md) | Consumes messages from RabbitMQ queues or exchanges. |
| [MQTT](event/mqtt.md) | Subscribes to MQTT topics. Use for IoT devices and lightweight pub/sub messaging. |
| [Azure Service Bus](event/azure-service-bus.md) | Consumes messages from Azure Service Bus queues or topics. |
| [Salesforce events](event/salesforce-events.md) | Reacts to Salesforce Platform Events, Change Data Capture, and Push Topics. |
| [GitHub webhooks](event/github-webhooks.md) | Handles GitHub push, pull request, and issue webhook events. |
| [POP3/IMAP4](event/pop3imap4.md) | Polls a mailbox for incoming emails. |
| [Solace](event/solace.md) | Subscribes to Solace PubSub+ topics with guaranteed messaging. |
| [CDC — MSSQL](event/cdc-mssql.md) | Captures row-level INSERT, UPDATE, and DELETE changes from SQL Server. |
| [CDC — PostgreSQL](event/cdc-postgresql.md) | Captures row-level changes from PostgreSQL using logical replication. |
| [Twilio](event/twilio.md) | Handles incoming SMS, calls, and status callbacks from Twilio. |

### File integration

Trigger an integration when files appear on a remote server or local directory.

| Artifact | Description |
|---|---|
| [FTP/SFTP](file/ftp-sftp.md) | Watches an FTP, FTPS, or SFTP server for new or modified files. |
| [Local files](file/local-files.md) | Watches a local directory for file arrivals and changes. |

### Other artifacts

Reusable building blocks shared across multiple integrations in the same project.

| Artifact | Description |
|---|---|
| [Functions](supporting/functions.md) | Reusable function definitions extracted from integration logic. |
| [Data Mapper](supporting/data-mapper/data-mapper.md) | Visual tool for field mapping and format transformation between data models. |
| [Types](supporting/types.md) | Custom record types and type definitions shared across the project. |
| [Connections](supporting/connections.md) | Named, reusable credential and endpoint configurations for external services. |
| [Configurations](supporting/configurations.md) | Configurable variables and environment-specific settings managed via `Config.toml`. |

## What's next

- [Automation](automation.md) — run scheduled or on-demand integration jobs
- [HTTP service](service/http.md) — the most common starting point for integration APIs
- [Kafka](event/kafka.md) — consume and process messages from Apache Kafka
- [FTP/SFTP](file/ftp-sftp.md) — process files from remote file servers
- [Connections](supporting/connections.md) — connect to external systems once and reuse across your integration
