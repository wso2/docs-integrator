---
title: Overview
---

# Overview

OpenAI Fine-Tunes provides APIs for customizing OpenAI models with your own training data. The Ballerina `ballerinax/openai.finetunes` connector (v2.0.0) offers programmatic access to OpenAI's fine-tuning, files, and models endpoints, enabling you to upload training datasets, create and manage fine-tuning jobs, and work with models from your Ballerina integration flows.

## Key features

- Create, monitor, and cancel fine-tuning jobs for OpenAI models such as GPT-3.5 Turbo
- Upload, list, retrieve, and delete training and validation files
- Configure hyperparameters (epochs, batch size, learning rate) for fine-tuning jobs
- Retrieve fine-tuning job events for real-time training progress monitoring
- List and inspect fine-tuning job checkpoints with training metrics
- List, retrieve, and delete OpenAI models including fine-tuned models
- Support for Weights & Biases (W&B) integration for experiment tracking

## Actions

Actions are operations you invoke on OpenAI from your integration: uploading training files, creating fine-tuning jobs, monitoring training progress, and managing models. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | File uploads, fine-tuning job lifecycle, model management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an OpenAI account and obtaining the API key required to use the OpenAI Fine-Tunes connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **OpenAI Fine-Tunes** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [OpenAI Fine-Tunes Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-openai.finetunes)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
