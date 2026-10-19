---
title: Glossary
---

# Glossary

### Action

A specific operation you invoke through a connection, such as "send SMS" or "create contact." Actions are outbound: your integration calls the external service. See [Overview](../overview.md).

### Area

The functional category a connector is classified under in the catalog (for example, Database, Messaging, Storage & Files) — set via the connector package's `Area/` keyword. See [Publish Connector](../build-your-own/publish-connector.md).

### Built-in connector

A connector that ships with the platform itself (HTTP, FTP, gRPC, GraphQL, MQTT, MCP, WebSocket, WebSub, Email, AI, and similar protocol-level modules), rather than integrating with a specific third-party vendor's API. Built-in connectors often have no Setup Guide, since there's no external account or credentials to configure.

### Connection

A named, reusable configuration that holds the credentials and endpoint settings for an external service (API keys, OAuth tokens, hostnames). You define a connection once; every action in your integration uses it by name. See [Using Connectors](../using-connectors.md).

### Connector

A pre-built integration component that exposes an external service's API as ready-to-use operations, so you select an action and configure its inputs instead of constructing HTTP requests by hand. See [Overview](../overview.md).

### Library

A catalog package that adds integration capabilities without needing a client or connection at all, such as PDF generation, string manipulation, I/O, or invoking a cloud function. Used directly in your integration logic, the same way you'd use any other Ballerina library.

### Trigger

An inbound event that an external service pushes into your integration, such as a new database row or an incoming message. Most connectors are action-only; trigger support is concentrated in databases, messaging systems, and file storage. See [Overview](../overview.md).

### Vendor

The company or service a connector targets (for example, Salesforce, SAP, Amazon) — set via the connector package's `Vendor/` keyword, and shown as a tag on its catalog card. See [Publish Connector](../build-your-own/publish-connector.md).
