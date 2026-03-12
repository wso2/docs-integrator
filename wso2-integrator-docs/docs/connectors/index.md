---
sidebar_position: 3
title: Connectors
description: "Can I connect to Y? Searchable catalog and reference for all connectors."
---

# Connectors

Browse the full catalog of pre-built connectors for SaaS applications, databases, messaging systems, cloud services, AI/LLM providers, and protocols.

## Supported Protocols

WSO2 Integrator supports 17 protocols out of the box:

| Protocol | Package | Use Case |
|---|---|---|
| **HTTP** | `ballerina/http` | REST APIs, webhooks, web services |
| **gRPC** | `ballerina/grpc` | High-performance RPC |
| **WebSocket** | `ballerina/websocket` | Real-time bidirectional communication |
| **WebSub** | `ballerina/websub` | Event subscriptions (webhook consumer) |
| **WebSubHub** | `ballerina/websubhub` | Event distribution (webhook publisher) |
| **GraphQL** | `ballerina/graphql` | GraphQL APIs |
| **TCP** | `ballerina/tcp` | Raw TCP socket communication |
| **FTP / SFTP** | `ballerina/ftp` | File transfer over FTP/SFTP |
| **SMTP** | `ballerina/email` | Sending email |
| **POP3** | `ballerina/email` | Receiving email |
| **IMAP4** | `ballerina/email` | Receiving email |
| **JMS** | `ballerinax/java.jms` | Java Message Service |
| **AMQP (RabbitMQ)** | `ballerinax/rabbitmq` | Advanced message queuing |
| **AWS SQS** | `ballerinax/aws.sqs` | Amazon Simple Queue Service |
| **MQTT** | `ballerinax/mqtt` | IoT messaging |
| **SOAP** | `ballerina/soap` | Legacy SOAP/XML services |

## Connector Catalog

Browse connectors by category:

| Category | Examples | Page |
|---|---|---|
| **SaaS Applications** | Salesforce, SAP, Workday, ServiceNow, HubSpot, Twilio, Stripe, GitHub | [SaaS](saas.md) |
| **Databases** | MySQL, PostgreSQL, MongoDB, Oracle, MS SQL Server, Redis | [Databases](databases.md) |
| **Messaging** | Apache Kafka, RabbitMQ, NATS, MQTT, JMS | [Messaging](messaging.md) |
| **Cloud Services** | AWS S3, Azure Blob, GCP, Gmail, Google Calendar | [Cloud Services](cloud-services.md) |
| **AI & LLMs** | OpenAI Chat, Anthropic Claude, Google Vertex, Azure AI, Pinecone | [AI & LLMs](ai-llms.md) |
| **Protocols** | HTTP, GraphQL, gRPC, WebSocket, SMTP, FTP | [Protocols](protocols.md) |
| **File & Storage** | S3, Azure Blob, Google Drive, FTP, SFTP | [File & Storage](file-storage.md) |

## Using Connectors

Add a connector from the left panel in the design view, configure authentication, and invoke it via drag-and-drop or inline code.

- [Connection Configuration](configuration.md) -- Create and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API Key, JWT, mTLS
- [Error Handling per Connector](error-handling.md) -- Handle connector-specific errors

## Build Your Own

- [Custom Connector Development](custom-development.md) -- Build a custom connector
- [Using Ballerina Libraries](ballerina-libraries.md) -- Import packages from Central
- [Publish to Ballerina Central](publish-to-central.md) -- Share your connector
