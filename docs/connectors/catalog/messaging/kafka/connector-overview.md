---
title: Overview
---

# Overview

Apache Kafka is a distributed event streaming platform used for building real-time data pipelines and streaming applications. The Ballerina `ballerinax/kafka` connector (v4.6.5) provides a Producer client for publishing messages, a Consumer client for polling messages, and a Listener for event-driven consumption, enabling seamless Kafka integration in Ballerina workflows.

## Key features

- Produce messages to Kafka topics with configurable acknowledgments, compression, and partitioning
- Consume messages by polling with type-safe deserialization via `typedesc` generics
- Event-driven message consumption through a Kafka Listener and Service with automatic polling
- Manual and automatic offset management for at-least-once and at-most-once delivery semantics
- SSL/TLS and SASL (PLAIN, SCRAM-SHA-256, SCRAM-SHA-512) authentication support
- Avro serialization and deserialization with Confluent Schema Registry integration
- Transactional producer support for exactly-once delivery with `enableIdempotence` and `transactionalId`

## Actions

Actions are operations you invoke from your integration to produce or consume messages on Kafka topics. The Kafka connector exposes two clients:

| Client | Actions |
|--------|---------|
| `Producer` | Send messages, flush buffered records, retrieve topic partitions |
| `Consumer` | Subscribe, poll, seek, commit offsets, manage partition assignments |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Triggers

Triggers allow your integration to react to Kafka messages in real time without manual polling. The `kafka:Listener` continuously polls a Kafka topic and dispatches batches of records to your `kafka:Service` callback automatically.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Records received | `onConsumerRecord` | Fired when one or more records are consumed from the subscribed Kafka topic(s). |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the `BytesConsumerRecord` payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an Apache Kafka cluster and obtaining the connection details required to use the Kafka connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Kafka** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Kafka Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-kafka)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
