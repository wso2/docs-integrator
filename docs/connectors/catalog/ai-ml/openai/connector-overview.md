---
title: Overview
---

# Overview

OpenAI is an AI research and deployment company providing powerful language models, image generation, audio processing, and more through its REST API. The Ballerina `ballerinax/openai` connector (v1.0.1) provides comprehensive programmatic access to the OpenAI API, covering chat completions, image generation, audio, embeddings, assistants, fine-tuning, vector stores, file management, and more: enabling you to integrate AI capabilities into your Ballerina integration flows.

## Key features

- Chat completions with GPT models including streaming support and structured outputs
- Image generation, editing, and variations using DALL·E models
- Audio speech synthesis, transcription, and translation via Whisper and TTS models
- Text embeddings for semantic search and similarity tasks
- Assistants API with threads, messages, runs, and tool use for conversational AI agents
- Vector store management for retrieval-augmented generation (RAG) workflows
- Fine-tuning job management for customizing models on your own data
- File, batch, and model management operations

## Actions

Actions are operations you invoke on the OpenAI API from your integration: generating chat completions, creating images, managing assistants, and more. The OpenAI connector exposes all actions through a single comprehensive client:

| Client | Actions |
|--------|---------|
| `Client` | Chat completions, images, audio, embeddings, assistants, threads, runs, vector stores, files, fine-tuning, batches, models, moderations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an OpenAI account and obtaining the API key required to use the OpenAI connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **OpenAI** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [OpenAI Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-openai)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
