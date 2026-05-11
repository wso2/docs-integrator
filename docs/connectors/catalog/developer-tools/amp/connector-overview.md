---
title: Overview
---

# Overview

The WSO2 AI Agent Management Platform (AMP) is an observability solution for AI agents that provides distributed tracing through the OpenTelemetry standard. The Ballerina `ballerinax/amp` extension (v1.1.0) integrates with Ballerina's built-in observability infrastructure, automatically capturing and exporting OpenTelemetry trace spans from your programs to the AMP/OpenChoreo platform — no explicit API calls or client instantiation required.

## Key features

- Automatic distributed trace capture using Ballerina's built-in OpenTelemetry instrumentation — activated with a single side-effect import
- OTLP HTTP span export to WSO2 AI Agent Management Platform (AMP) or any compatible OpenTelemetry endpoint
- API key authentication via the `x-amp-api-key` header for secure trace delivery
- Three configurable sampling strategies: constant (always-on/always-off), probabilistic (ratio-based), and rate-limiting (leaky-bucket)
- Automatic resource attribute tagging with OpenChoreo org, project, component, and environment UIDs for fine-grained observability
- W3C Trace Context propagation for end-to-end distributed tracing across services
- Configurable batch span export with adjustable flush intervals and buffer sizes

## Actions

The `ballerinax/amp` module is an observability extension — it does not expose a traditional client type or remote functions. You activate it via a side-effect import and configure it entirely through `Config.toml`. Once enabled, it automatically hooks into Ballerina's tracing infrastructure, captures spans, and exports them to the configured AMP endpoint.

| Client | Actions |
|--------|---------|
| `AMP Tracer Provider` | Distributed trace capture, OTLP HTTP span export, configurable sampling, OpenChoreo resource attribute tagging |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up a WSO2 OpenChoreo component and obtaining the credentials and identifiers required to send traces to the AMP platform.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AMP Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-amp)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
