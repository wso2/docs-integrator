---
sidebar_position: 2
title: Integration View
description: Work with the Integration View to build and manage individual integration packages.
---

# Integration View

The Integration View is the primary development interface in WSO2 Integrator. It shows all the components of a single integration package and provides quick access to the visual designer, code editor, and testing tools.

## Project Explorer Components

The left sidebar in Integration View organizes your project into these sections:

| Component | Description |
|---|---|
| **Entry Points** | HTTP services, event listeners, automations, file watchers |
| **Listeners** | Protocol-specific listener configurations |
| **Connections** | Configured connections to external systems (databases, APIs, brokers) |
| **Types** | Custom record types and data definitions |
| **Functions** | Reusable logic blocks and utility functions |
| **Data Mappers** | Visual data transformation mappings |
| **Configurations** | Configurable variables (from `Config.toml`) |
| **Local Connectors** | Project-specific connector packages |

## Working with Entry Points

Click on any entry point to open it in the visual designer. Each entry point shows:

- The service or trigger configuration
- Resource functions or event handlers
- Connected dependencies and data flow

## Adding Artifacts

Click the **+** button next to any section to add a new artifact. The available artifact types depend on the section:

- **Entry Points**: HTTP Service, GraphQL Service, Kafka Listener, RabbitMQ Listener, etc.
- **Connections**: HTTP Client, Database, Message Broker, etc.
- **Types**: Record, Enum, Type Alias
- **Functions**: Regular, Isolated, Remote

## Design and Code Views

Toggle between views using the toolbar:

- **Design View** -- Visual flow diagram with interactive nodes
- **Sequence View** -- Sequence diagram showing service interactions
- **Source View** (`</>` icon) -- Direct Ballerina code editing

All views stay synchronized in real time.

## What's Next

- [Design Integration Logic](/docs/develop/design-logic) -- Build logic using the flow designer
- [Integration Artifacts](/docs/develop/integration-artifacts) -- Understand artifact types
