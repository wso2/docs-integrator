---
title: Overview
---

# Overview

Milvus is an open-source, high-performance vector database designed for scalable similarity search and AI applications. The Ballerina `ballerinax/milvus` connector (v1.1.0) provides programmatic access to Milvus through the Java SDK, enabling you to manage collections, index vector data, and perform similarity searches directly from your Ballerina integration flows.

## Key features

- Collection management: list, create, and load collections
- Automatic index creation on vector fields for efficient similarity search
- Upsert operations for inserting or updating vector data with associated properties
- Batch and filtered deletion of vectors by IDs or filter expressions
- Top-K similarity search with optional metadata filtering and output field selection
- Flexible query operations using filter expressions to retrieve stored vectors and metadata
- Support for token-based authentication and username/password credentials
- Configurable connection settings including TLS/SSL, proxy, keep-alive, and timeouts

## Actions

Actions are operations you invoke on Milvus from your integration: managing collections, upserting vectors, and performing similarity searches. The Milvus connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Collection management, index creation, vector upsert/delete, similarity search, query |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a Milvus instance and obtaining the connection details required to use the Milvus connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Milvus** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Milvus Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-milvus)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
