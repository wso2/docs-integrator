---
title: UDP
---

UDP (User Datagram Protocol) is a lightweight, connectionless transport protocol commonly used for low-latency communication such as streaming, DNS lookups, and IoT messaging. The Ballerina `ballerina/udp` connector (v1.13.3) provides both connectionless and connection-oriented UDP clients for sending and receiving datagrams, as well as a listener for building event-driven UDP services.

## Key features

- Connectionless UDP communication via `udp:Client` for sending and receiving datagrams to/from any remote host
- Connection-oriented UDP communication via `udp:ConnectClient` for persistent host-to-host byte transfer
- Automatic datagram segmentation when data exceeds the maximum datagram size in `ConnectClient`
- Event-driven UDP server via `udp:Listener` with `onBytes` and `onDatagram` callbacks
- Caller-based response mechanism allowing services to reply directly to the sender
- Configurable socket read timeouts and local interface binding

## Actions

Actions are operations you invoke from your integration to send and receive UDP data. The UDP connector exposes actions across two clients:

| Client | Actions |
|--------|---------|
| `Client` | Connectionless datagram send and receive |
| `Connect Client` | Connection-oriented byte send and receive to a fixed remote host |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to incoming UDP data in real time. The `udp:Listener` binds to a local port and invokes your service callbacks whenever datagrams or raw bytes arrive: no polling required.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Bytes received | `onBytes` | Fired when raw bytes are received on the listener port. |
| Datagram received | `onDatagram` | Fired when a datagram (with sender address metadata) is received on the listener port. |
| Error occurred | `onError` | Fired when a socket error occurs during data reception. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **UDP** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [UDP Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-udp)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
