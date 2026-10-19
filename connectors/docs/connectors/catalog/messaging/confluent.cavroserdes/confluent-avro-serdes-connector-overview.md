---
title: Overview
---

# Overview

The Confluent Avro SerDes connector for Ballerina provides Avro serialization and deserialization using the Confluent Schema Registry wire format. It integrates with the `ballerinax/confluent.cregistry` client to automatically register schemas during serialization and retrieve them by ID during deserialization, enabling seamless Avro-encoded data exchange over Apache Kafka and other messaging systems.

## Key features

- Serialize any Ballerina value (records, primitives, arrays) to Avro-encoded bytes using a provided Avro schema
- Automatically register Avro schemas in the Confluent Schema Registry under a specified subject during serialization
- Deserialize Avro-encoded byte payloads back to typed Ballerina values using schema ID lookup from the registry
- Implements the Confluent wire format: magic byte prefix + 4-byte schema ID + Avro payload
- Type-safe deserialization via Ballerina's `typedesc` inference; no manual casting required
- GraalVM native image compatible for high-performance, low-latency deployments
- Works seamlessly with `ballerinax/kafka` for end-to-end Avro-encoded Kafka message pipelines

## Actions

Actions are module-level functions you call to serialize data to Avro bytes or deserialize Avro bytes back to typed Ballerina values. Both functions require an initialized `cregistry:Client` from `ballerinax/confluent.cregistry` to interact with the Confluent Schema Registry.

| Client | Actions |
|--------|---------|
| `Avro SerDes Functions` | Avro serialization with schema registration, Avro deserialization with schema retrieval |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through enabling the Confluent Schema Registry on Confluent Cloud and obtaining the credentials required to use the Confluent Avro SerDes connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Confluent Avro SerDes Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-confluent.cavroserdes)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
