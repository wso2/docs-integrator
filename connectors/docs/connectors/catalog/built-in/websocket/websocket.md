---
title: WebSocket
---

WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. The Ballerina `ballerina/websocket` connector (v2.15.1) provides both a synchronous client for connecting to WebSocket servers and a listener for building WebSocket servers, enabling real-time bidirectional communication in your Ballerina integration flows.

## Key features

- Synchronous WebSocket client with blocking read and write operations
- Full-duplex bidirectional messaging with text, binary, and typed data support
- WebSocket server (listener) with upgrade service pattern for accepting client connections
- Custom message dispatching using dispatcher keys for routing messages to specific remote functions
- Automatic retry support with configurable back-off for client reconnections
- Built-in ping/pong frame handling with custom ping/pong service support
- SSL/TLS support for secure WebSocket (WSS) connections on both client and listener
- Authentication support including Basic Auth, Bearer Token, JWT, and OAuth2 for both client and listener

## Actions

Actions are operations you invoke using the WebSocket client to communicate with a WebSocket server: sending messages, reading responses, and managing the connection lifecycle.

| Client | Actions |
|--------|---------|
| `Client` | Text/binary messaging, typed read/write, ping/pong, connection management |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to act as a WebSocket server, accepting incoming client connections and reacting to messages, connection events, and control frames in real time through service callbacks.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Connection opened | `onOpen` | Fired when a new WebSocket client connection is established. |
| Text message received | `onTextMessage` | Fired when a text message is received from a client. |
| Binary message received | `onBinaryMessage` | Fired when a binary message is received from a client. |
| Message received | `onMessage` | Fired when any message (text, binary, or typed) is received from a client. |
| Connection closed | `onClose` | Fired when a client connection is closed. |
| Error occurred | `onError` | Fired when an error occurs during the connection. |
| Idle timeout | `onIdleTimeout` | Fired when a connection remains idle beyond the configured timeout. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **WebSocket** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [WebSocket Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-websocket)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
