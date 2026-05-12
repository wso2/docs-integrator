---
title: Overview
---

# Overview

Confluent Schema Registry is a centralized schema management service for Apache Kafka that provides schema storage, versioning, and compatibility enforcement for Avro, JSON Schema, and Protobuf formats. The Ballerina `ballerinax/confluent.cregistry` connector (v0.4.3) enables you to register schemas and retrieve them by ID from a Confluent Schema Registry instance, supporting integration with Kafka-based data pipelines.

## Key features

- Register Avro schemas to Confluent Schema Registry under a given subject
- Retrieve schemas by their unique schema ID
- Configurable identity map capacity for subject-level schema caching
- Support for basic authentication via API key and secret credentials
- Custom HTTP headers support for advanced request configuration
- SSL/TLS truststore configuration for secure connections
- GraalVM native image compatible for cloud-native deployments

## Actions

Actions let you interact with Confluent Schema Registry from your Ballerina integration: registering schemas and retrieving them by ID. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Schema registration and retrieval by ID |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a Confluent Schema Registry instance and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Confluent Schema Registry** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Confluent Schema Registry Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-confluent.cregistry)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
