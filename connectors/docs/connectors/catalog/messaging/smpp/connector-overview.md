---
title: Overview
---

# Overview

The SMPP connector provides native Ballerina access to an SMSC (Short Message Service Centre) over **SMPP** (Short Message Peer-to-Peer), the protocol an ESME (External Short Messaging Entity) uses to exchange SMS traffic with a carrier or aggregator. It wraps the Java library [`org.jsmpp:jsmpp`](https://jsmpp.org/) through Ballerina's Java interoperability.

## Key features

- Send text or pre-encoded binary messages (`submit_sm`), to a single destination or to several at once (`submit_multi`)
- Send via the alternative `data_sm` transfer PDU for binary/WAP-push payloads
- Query, cancel, and replace a previously submitted, not-yet-delivered message (`query_sm`, `cancel_sm`, `replace_sm`)
- Receive mobile-originated messages and delivery receipts (`deliver_sm`/`data_sm`) via a listener and service model
- Reply on the same session a message was received on, through a `Caller` injected into a transceiver-bound service
- TLS for both the client and the listener, including mutual TLS
- A single typed error carrying a failure mode so retry logic can branch on *why* an operation failed, and whether a retry can duplicate the message

## Actions

The connector provides a single client for outbound communication with an SMSC.

| Client | Actions |
|--------|---------|
| `Client` | `submit_sm`, `submit_multi`, `data_sm`, `query_sm`, `cancel_sm`, `replace_sm`, connection lifecycle |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

The connector supports event-driven integration by binding to the SMSC as a receiver or transceiver, enabling the SMSC to push mobile-originated messages and delivery receipts to the Ballerina service.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Message received | `onDeliverSm` | Invoked when a `deliver_sm` PDU arrives: a mobile-originated message or a delivery receipt |
| Data message received | `onDataSm` | Invoked when a `data_sm` PDU arrives, the alternative inbound transfer PDU some SMSCs use |
| Framework error | `onError` | Invoked when an unexpected session drop occurs |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining SMPP access from an SMSC, carrier, or aggregator and collecting the connection details the connector needs.

* **[Action Reference](action-reference.md)**: Full reference for the `Client`: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the `Listener`, `Service`, and `Caller` model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SMPP** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SMPP Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-smpp)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
