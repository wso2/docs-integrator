---
title: TCP
---

TCP (Transmission Control Protocol) is a foundational transport-layer protocol that provides reliable, ordered, and error-checked byte-stream delivery between applications. The Ballerina `ballerina/tcp` connector (v1.13.3) enables you to create TCP clients for sending and receiving raw bytes over persistent connections, as well as TCP listeners that accept inbound connections and process data through event-driven service callbacks.

## Key features

- Send and receive raw byte data over TCP connections using a simple client API
- Accept inbound TCP connections with an event-driven listener and service model
- Configurable read and write timeouts for client connections
- SSL/TLS support for both client and listener with certificate and key store configuration
- Connection-level callbacks for handling incoming bytes, errors, and connection closure
- Echo-back support by returning bytes directly from the `onBytes` callback
- Access to caller metadata (remote host, port, connection ID) within service callbacks

## Actions

Actions are operations you invoke from your integration to communicate over TCP: connecting to a remote host, sending bytes, reading responses, and closing connections.

| Client | Actions |
|--------|---------|
| `Client` | Connect to a remote TCP host, send bytes, read bytes, close connection |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to accept and react to inbound TCP connections. The `tcp:Listener` listens on a specified port and invokes your service callbacks when clients connect, send data, encounter errors, or disconnect.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Client connected | `onConnect` | Fired when a new TCP client connects to the listener. |
| Bytes received | `onBytes` | Fired when data bytes are received from a connected client. |
| Error occurred | `onError` | Fired when a socket error occurs on the connection. |
| Connection closed | `onClose` | Fired when a client connection is closed. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **TCP** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [TCP Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-tcp)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
