---
title: Guides
sidebar_label: Overview
sidebar_position: 0
slug: /guides/overview
description: "Show me a complete, real example."
hide_table_of_contents: true
wide_layout: true
---

# Guides

Complete, end-to-end examples you can follow from start to finish. There are three types:

- **How to guides:** task-focused walkthroughs that demonstrate one integration capability or pattern, independent of any business function.
- **Business use cases:** end-to-end walkthroughs that solve a concrete problem for a specific team or function, such as HR, IT support, or procurement.
- **Tutorials:** long-form builds that teach the product by creating one complete, realistic system step by step.

:::info Guides vs. Develop
**Develop** pages are handbook lookups. **Guides** are narrative walkthroughs. Different modes, different content.
:::

<GuidesCatalog />

## Event-driven integration

Six patterns for building event-driven integrations across Kafka, RabbitMQ, Solace, and Azure Service Bus:

- **[Pub/Sub](event-integration/pub-sub.md)** — Decouple producers and consumers using Kafka topics
- **[CQRS](event-integration/cqrs.md)** — Separate read and write models using Kafka events and a PostgreSQL read store
- **[Transactional Outbox with CDC](event-integration/outbox-cdc.md)** — Guarantee at-least-once event delivery using PostgreSQL CDC and RabbitMQ
- **[Competing Consumers](event-integration/competing-consumers.md)** — Scale throughput by distributing work across multiple consumer instances using RabbitMQ
- **[Saga (Choreography)](event-integration/saga.md)** — Coordinate multi-step distributed transactions and compensation using Solace
- **[DLQ + Retry](event-integration/dlq-retry.md)** — Handle transient and permanent message failures using Azure Service Bus dead-letter queues
