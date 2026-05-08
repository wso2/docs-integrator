---
title: AI
---

The Ballerina AI module provides APIs for building AI-powered applications and agents using Large Language Models (LLMs). It includes capabilities for direct LLM interaction (chat and structured output generation), intelligent AI agents with tool use and memory, and Retrieval-Augmented Generation (RAG) with document ingestion, chunking, embedding, and vector-based retrieval. The `ballerina/ai` connector (v1.10.0) serves as a unified abstraction layer that works with provider-specific modules such as `ballerinax/ai.openai` and `ballerinax/ai.anthropic`.

## Key features

- AI Agent framework with configurable system prompts, tool use, memory, and iterative reasoning (function-call agent pattern)
- Direct LLM interaction via `ModelProvider` abstraction — multi-turn `chat` and single-turn `generate` with structured output mapping to Ballerina types
- RAG pipeline with `VectorKnowledgeBase` for document ingestion, chunking, embedding, retrieval, and query augmentation
- Built-in document chunkers for plain text, Markdown, and HTML with recursive splitting strategies and configurable overlap
- Data loaders for PDF, DOCX, PPTX, Markdown, and HTML file formats via `TextDataLoader`
- MCP (Model Context Protocol) toolkit integration for connecting agents to external MCP servers
- HTTP service toolkit for exposing REST APIs as agent tools via OpenAPI specifications
- Short-term memory with pluggable stores, overflow handling (trim or model-assisted summarization), and session-based conversation management

## Actions

The AI module provides several client and class abstractions for building AI-powered applications. Actions span direct LLM calls, agent execution, RAG operations, and chat service communication.

| Client | Actions |
|--------|---------|
| `Model Provider` | Multi-turn chat, single-turn structured output generation |
| `Agent` | Autonomous agent execution with tools, memory, and iterative reasoning |
| `Chat Client` | HTTP client for communicating with an ai:Listener-based chat service |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

The AI module provides a `Listener` and `ChatService` type for exposing an AI-powered chat endpoint as an HTTP service. The listener handles incoming chat requests and routes them to the service implementation.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Chat message received | `post chat` | Fired when a client sends a chat request message to the service. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this module, please create a pull request in the following repository.

* [AI Module GitHub repository](https://github.com/ballerina-platform/module-ballerina-ai)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
