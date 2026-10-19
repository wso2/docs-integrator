---
title: Observability Setup
---

# Observability Setup

ICP supports two observability providers for viewing integration logs and metrics in the ICP console. Choose a provider and open its setup guide below.

This guide covers **default profile** runtimes. To set up observability for a **WSO2 Integrator: MI** runtime connected to ICP, see [Adding observability for ICP](https://mi.docs.wso2.com/en/latest/install-and-setup/install/adding-observability-for-icp/) in the MI documentation.

:::info Prerequisites

- ICP installed and running. See [Install ICP](../install-icp.md).
- Integration connected to ICP with heartbeats working. See [Connect an integration to ICP](../connect-runtime.md).

| Provider | Metrics collection | Application log collection | Setup |
|----------|--------------------|----------------------------|-------|
| **Moesif** | The runtime publishes metrics directly to Moesif. | Fluent Bit forwards JSON logs to Moesif. | [Set up Moesif](moesif.md). |
| **OpenSearch** | Fluent Bit forwards per-request metrics logs to OpenSearch. | Fluent Bit forwards structured application logs to OpenSearch. | [Set up OpenSearch](opensearch.md). |

Choose **Moesif** for a hosted service that requires a Moesif account. Choose **OpenSearch** to keep logs and metrics on infrastructure you run yourself.

## What's next

- [Manage integrations](../manage-integrations.md) — create integrations and navigate the integration overview in the ICP console
- [Manage runtimes](../manage-runtimes.md) — monitor runtime health and status alongside observability data
- [Access control](../access-control.md) — control who can view logs and metrics in the ICP console
