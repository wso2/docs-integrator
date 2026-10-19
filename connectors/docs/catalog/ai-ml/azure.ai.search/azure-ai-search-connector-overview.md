---
title: Overview
---

# Overview

Azure AI Search (formerly Azure Cognitive Search) is a cloud-based search platform that provides full-text search, vector search, and AI-powered enrichment for building intelligent search applications. The Ballerina `ballerinax/azure.ai.search` connector (v1.0.1) provides programmatic access to the Azure AI Search REST API, enabling you to manage indexes, indexers, data sources, skillsets, and synonym maps directly from your Ballerina integration flows.

## Key features

- Full index lifecycle management: create, update, retrieve, delete, and analyze search indexes with rich field types
- Indexer management with scheduling, on-demand execution, reset, and detailed status monitoring
- Data source connectivity for Azure Blob Storage, Azure SQL, Cosmos DB, and other supported sources
- AI enrichment pipeline management via skillsets that apply cognitive skills (OCR, language detection, entity recognition, key phrase extraction) during indexing
- Synonym map management to expand search queries with domain-specific related terms
- Vector search support with configurable algorithms, profiles, and compression settings for semantic similarity search
- Index-level statistics (document count, storage size, vector index size) and service-level statistics for capacity planning

## Actions

Actions are operations you invoke on Azure AI Search from your integration: creating indexes, running indexers, managing data sources, and more. All actions are exposed through a single `Client`:

| Client | Actions |
|--------|---------|
| `Client` | Index management, indexer lifecycle, data source configuration, skillset management, synonym maps, service statistics |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Azure AI Search service and obtaining the service URL and admin API key required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Azure AI Search** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Azure AI Search Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-azure.ai.search)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
