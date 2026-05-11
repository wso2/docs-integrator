---
title: Connectors overview
---

# Connectors overview

Send a Slack notification when an order ships. Read customer records from Salesforce. Write results to a Google Sheet. Query a database and return the data in an API response.

Connectors make these integrations possible without writing low-level HTTP or protocol code. WSO2 Integrator includes 400+ pre-built connectors for the services your business already uses.

## How connectors fit into your integration

Most integrations follow a similar pattern:

```mermaid
flowchart LR
    A([Trigger])

    A --> B

    B["Transform & route
    (map, filter, branch)"]

    B --> C

    subgraph connector["Connector"]
        C["Connector action
        (call external service)"]
    end

    C --> D

    D["Handle response
    (error handling, retry)"]

    D --> E([Output])

    style A fill:#EEEDFE,stroke:#534AB7,color:#3C3489
    style B fill:#F1EFE8,stroke:#5F5E5A,color:#444441
    style C fill:#FAECE7,stroke:#993C1D,color:#712B13
    style D fill:#F1EFE8,stroke:#5F5E5A,color:#444441
    style E fill:#E1F5EE,stroke:#0F6E56,color:#085041
    style connector fill:#fafafa,stroke:#cbd5e1,stroke-dasharray:5 5,color:#64748b
```

The connector action is where WSO2 Integrator communicates with the external service.

## Key concepts

### Connector

A connector is a pre-built integration component that exposes an external service's API as ready-to-use operations. Instead of constructing HTTP requests and parsing responses by hand, you select an action from the connector's list and configure its inputs.

### Connection

A connection is a named, reusable configuration that holds the credentials and endpoint settings for an external service, such as API keys, OAuth tokens, and hostnames. You define it once; every action in your integration uses it by name.

For details on creating and managing connections, see [Connections](../develop/integration-artifacts/supporting/connections.md).

### Action

An action is a specific operation you invoke through a connection, such as "send SMS", "create contact", or "execute query". Each connector exposes a list of available actions. Actions are outbound: your integration calls the external service.

### Trigger

Some connectors also support triggers, which are inbound events the external service pushes into your integration. A database trigger fires when a row changes. A messaging trigger fires when a new message arrives.

| | Actions | Triggers |
|---|---|---|
| Direction | Your integration calls the service | The service calls your integration |
| Example | Send an SMS, create a Salesforce record | New database row, incoming webhook |

Most connectors are action-only. Trigger support is available for select connectors, primarily databases (MySQL, PostgreSQL, MSSQL), messaging systems (Kafka, RabbitMQ), and file storage. See each connector's documentation for what's available.

## Libraries without client connectors

Not everything in the connector catalog is a client connector. Some packages are libraries that provide integration capabilities without a client, such as PDF generation, string manipulation, I/O, and cloud function invocation (AWS Lambda and Azure Functions). Use them inside your integration logic the same way you would any other Ballerina library.

## What's next

- [Connector catalog](catalog/index.mdx): Browse all available connectors
- [Connection configuration](connection-configuration.md): Configure credentials and endpoint settings
- [Connections](../develop/integration-artifacts/supporting/connections.md): Create and manage connections in your integration
- [Error handling](error-handling-per.md): Handle failures and retries in connector calls
- [Build your own connector](build-your-own/build-own.md): Create a custom connector for a service not in the catalog
