---
title: SAP JCo
---

The `ballerinax/sap.jco` connector provides native Ballerina access to SAP systems through the SAP Java Connector (JCo) framework. It enables calling RFC-enabled function modules, sending and receiving IDocs, and handling inbound RFC calls from SAP, all using type-safe Ballerina constructs.

## Key features

- Execute RFC-enabled function modules on SAP systems with typed import, export, and table parameters
- Send IDocs to SAP over tRFC and qRFC transports with automatic TID management
- Receive inbound IDocs pushed from SAP via a listener and service model
- Handle inbound RFC calls from SAP, acting as a registered server program
- Support for both simple destination configuration and advanced raw JCo property maps
- Typed error hierarchy covering connection, logon, ABAP application, and IDoc errors
- Built-in support for IDoc protocol versions including qRFC queue-based delivery

## Actions

The connector provides a single client for outbound communication with SAP systems.

| Client | Actions |
|--------|---------|
| `Client` | RFC execution, IDoc sending, connection lifecycle |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

The connector supports event-driven integration by registering as a JCo server with the SAP gateway, enabling SAP to push IDocs and invoke RFC function modules on the Ballerina service.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| IDoc received | `onReceive` | Invoked when an IDoc is pushed from the SAP system |
| RFC call received | `onCall` | Invoked when SAP calls a function module registered on this server |
| Framework error | `onError` | Invoked when a JCo gateway or server error occurs asynchronously |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to configure SAP system prerequisites such as RFC destinations and program IDs for the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP JCo Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.jco)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
