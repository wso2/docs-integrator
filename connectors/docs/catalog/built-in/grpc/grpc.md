---
title: gRPC
---

gRPC is an inter-process communication technology built on HTTP/2 and Protocol Buffers for efficient, strongly-typed remote procedure calls. The Ballerina `ballerina/grpc` connector (v1.14.4) provides a complete framework for building gRPC servers and clients, supporting all four communication patterns: unary, server streaming, client streaming, and bidirectional streaming, with built-in authentication, TLS, deadline propagation, compression, and retry capabilities.

## Key features

- All four gRPC communication patterns: unary (simple RPC), server streaming, client streaming, and bidirectional streaming
- Auto-generated type-safe client stubs and server skeletons from Protocol Buffer (`.proto`) definitions using the built-in `bal grpc` tool
- Mutual TLS (mTLS) and one-way TLS support for secure communication on both client and server sides
- Client authentication via Basic Auth, Bearer Token, JWT, and OAuth2 (client credentials, password, refresh token, JWT bearer grant)
- Server-side listener authentication with file-based user store, LDAP, JWT validation, and OAuth2 introspection
- Deadline propagation for setting and checking RPC timeouts across service boundaries
- Message compression support (gzip) to reduce payload sizes on the wire
- Configurable retry logic with exponential backoff for resilient unary RPC calls

## Actions

Actions are operations you invoke as a gRPC client to communicate with a remote gRPC server. The connector provides two base client types: `grpc:Client` for initiating RPCs across all four patterns, and `grpc:StreamingClient` for sending messages and receiving responses in streaming scenarios (client streaming and bidirectional streaming).

| Client | Actions |
|--------|---------|
| `Client` | Unary RPC, server streaming, client streaming, bidirectional streaming initiation, stub initialization |
| `Streaming Client` | Send messages, receive responses, complete streams, send errors in streaming RPCs |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers let your Ballerina program act as a gRPC server. A `grpc:Listener` listens for incoming gRPC requests on a specified port, and a `grpc:Service` defines the remote functions that handle each RPC method, covering unary, server streaming, client streaming, and bidirectional streaming patterns.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Unary RPC call | `remote function ` | Fired when a client sends a single request expecting a single response. |
| Server streaming RPC call | `remote function ` | Fired when a client sends a single request expecting a stream of responses. |
| Client streaming RPC call | `remote function ` | Fired when a client opens a stream of messages and expects a single response. |
| Bidirectional streaming RPC call | `remote function ` | Fired when a client opens a bidirectional stream for concurrent send and receive. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **gRPC** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this module, please create a pull request in the following repository.

* [gRPC Module GitHub repository](https://github.com/ballerina-platform/module-ballerina-grpc)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
