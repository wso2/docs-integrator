---
title: FAQ
---

# FAQ

### What is a connector?

A connector is a pre-built integration component that exposes an external service's API as ready-to-use operations. Instead of constructing HTTP requests and parsing responses by hand, you select an action from the connector's list and configure its inputs. See [Overview](../overview.md) for the full set of concepts.

### What's the difference between a connector and a library?

A connector talks to an external service. A library doesn't — it adds integration capabilities that don't need a client or connection at all, such as PDF generation, string manipulation, I/O, or invoking a cloud function (AWS Lambda, Azure Functions). Both live in the same catalog, but you use a library directly in your integration logic like any other Ballerina library, with no connection to set up first.

### What's the difference between a connection and an action?

A connection is a named, reusable configuration holding the credentials and endpoint settings for an external service (API keys, OAuth tokens, hostnames) — you define it once, and every action in your integration uses it by name. An action is a specific operation invoked through that connection, such as "send SMS" or "create contact." See [Using Connectors](../using-connectors.md) for the practical walkthrough.

### What's the difference between an action and a trigger? Do all connectors support triggers?

Actions are outbound: your integration calls the external service. Triggers are inbound: the external service pushes an event into your integration. No — most connectors are action-only. Trigger support is concentrated in a smaller set of connectors, primarily databases, messaging systems, and file storage.

### How many connectors are in the catalog, and how are they organized?

Around 165 connector families, browsable and filterable by category (AI & ML, Database, CRM & Sales, Messaging, Storage & Files, and more) and by vendor in the [Connector Catalog](../catalog/index.mdx).

### What are "Built-in" connectors, and how are they different from the rest of the catalog?

Built-in connectors (HTTP, FTP, gRPC, GraphQL, MQTT, MCP, WebSocket, WebSub, Email, AI, and similar protocol-level modules) ship with the platform itself, rather than integrating with a specific third-party vendor's API like Salesforce, SAP, or HubSpot do. Several of them have no Setup Guide for exactly this reason — there's no external account or credentials to configure.

### What if there's no connector for the service I need?

Build one yourself — either by generating it automatically from an OpenAPI specification, or by writing it from scratch in Ballerina for full control over authentication and data transformation. See [Build a Connector](../build-your-own/build-own.md) to compare the two approaches.

### If I publish a connector to Ballerina Central, does it automatically appear in this catalog?

Not yet. The catalog currently lists WSO2's own pre-built connectors; support for listing community-published connectors is planned. Publishing to Ballerina Central still makes your connector installable and shareable with your team or the broader Ballerina community in the meantime — see [Publish Connector](../build-your-own/publish-connector.md).

### How do I request a connector that's missing from the catalog?

Open a request on [GitHub](https://github.com/wso2/product-integrator/issues/new/choose), or generate one yourself from an OpenAPI spec if the target API has one — both options are linked directly from the [Connector Catalog](../catalog/index.mdx)'s filter sidebar.

### Do I need to know Ballerina to use connectors?

No — using a pre-built connector is visual: search the catalog, add a connection, and drag its actions onto your flow in the node palette, as covered in [Using Connectors](../using-connectors.md). Ballerina knowledge is only needed if you're building a custom connector from scratch yourself.

### Where do "Vendor" and "Area" on a connector's card come from?

See [Glossary](glossary.md) for what these classification terms mean, and [Publish Connector](../build-your-own/publish-connector.md) for how a connector gets tagged with them.
