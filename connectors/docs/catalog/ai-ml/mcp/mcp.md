---
title: MCP
---

Model Context Protocol (MCP) is an open standard that enables seamless integration between Large Language Models (LLMs) and external data sources through structured JSON-RPC 2.0 communication over HTTP transport. The Ballerina `ballerina/mcp` connector (v1.0.3) allows you to build both MCP clients that consume tools from remote servers and MCP servers that expose tools to AI agents, enabling powerful AI-driven integration flows.

## Key features

- MCP client support for connecting to any MCP-compatible server and invoking tools remotely
- MCP server support with automatic tool discovery from annotated Ballerina remote functions
- Advanced server mode with manual control over tool listing and invocation
- Stateful session management for maintaining context across multiple tool calls
- Streamable HTTP transport with Server-Sent Events (SSE) for real-time server-to-client messaging
- Support for multiple MCP protocol versions (2025-03-26, 2024-11-05, 2024-10-07)
- Rich content types including text, image, audio, and embedded resources in tool responses

## Actions

Actions are operations you invoke from your integration to interact with MCP servers: initializing connections, discovering available tools, and calling tools with parameters. The MCP connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Streamable Http Client` | Connection management, tool discovery, tool invocation, SSE streaming |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your Ballerina service to act as an MCP server, exposing tools that AI agents and LLM applications can discover and invoke. The connector uses an HTTP-based listener that handles JSON-RPC 2.0 communication and automatically discovers tools from your service's remote functions.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Tool listing requested | `onListTools` | Fired when a client requests the list of available tools from the server. |
| Tool call requested | `onCallTool` | Fired when a client invokes a specific tool on the server. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this module, please create a pull request in the following repository.

* [MCP Module GitHub repository](https://github.com/ballerina-platform/module-ballerina-mcp)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
