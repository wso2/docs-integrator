---
title: Overview
---

# Overview

Mistral AI is a generative AI platform offering large language models for chat completions, code generation, embeddings, moderation, and more. The Ballerina `ballerinax/mistral` connector (v1.0.1) provides programmatic access to the full Mistral REST API, enabling you to integrate chat completions, fill-in-the-middle code generation, OCR, embeddings, fine-tuning, batch processing, and model management into your Ballerina integration flows.

## Key features

- Chat completions with tool use, JSON mode, and configurable sampling parameters
- Fill-in-the-middle (FIM) code completion for code generation tasks
- Text embedding generation for semantic search and similarity applications
- OCR (optical character recognition) for extracting text from documents and images
- Content moderation and classification for text and chat inputs
- Fine-tuning job management: create, monitor, cancel, and start training jobs
- Batch job processing for large-scale asynchronous API requests
- Model and file management: list, retrieve, upload, download, and delete resources

## Actions

Actions are operations you invoke on Mistral AI from your integration: generating chat completions, creating embeddings, managing models, running fine-tuning jobs, and more. The Mistral connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Chat completions, FIM, embeddings, OCR, moderation, agents, models, files, fine-tuning, batch jobs |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Mistral AI account and obtaining the API key required to use the Mistral connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Mistral** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Mistral Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-mistral)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
