---
title: Overview
---

# Overview

Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. The Ballerina `ballerinax/redis` connector (v3.2.1) provides programmatic access to Redis servers and clusters, enabling you to perform string, list, set, sorted set, hash, and key management operations from your Ballerina integration flows.

## Key features

- Full string operations including get, set, append, increment/decrement, and bit manipulation
- List operations for queue and stack patterns with blocking pop support
- Set and sorted set operations for membership tracking, scoring, and ranking
- Hash operations for storing and retrieving field-value pairs within a key
- Key management including expiration, TTL, rename, and type inspection
- Redis cluster support for distributed deployments
- Connection pooling and SSL/TLS encryption for secure, high-performance connectivity

## Actions

Actions are operations you invoke on a Redis server from your integration; reading and writing strings, managing lists, working with sets and sorted sets, and more. The Redis connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | String operations, list operations, set operations, sorted set operations, hash operations, key management, connection management, cluster info |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a Redis server and obtaining the connection details required to use the Redis connector.

* **[Action Reference](actions.md)**: Full reference for all clients; operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Redis** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Redis Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-redis)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
