---
sidebar_position: 3
title: Distributed Tracing
description: Enable distributed tracing in WSO2 Integrator to follow a request across services, find latency bottlenecks, and debug failures, and choose where to send the traces.
slug: /observe/tracing
---

# Distributed Tracing

Distributed tracing follows a single request end to end as it passes through your integration and the services it calls. Each step is recorded as a **span** with its duration and details, and the spans of one request are grouped into a **trace**. Use traces to see where time is spent, identify latency bottlenecks across service boundaries, and debug request failures.

WSO2 Integrator produces traces using OpenTelemetry. You choose the backend that receives and displays them.

## Enable tracing with Jaeger or Zipkin

:::note Using OpenTelemetry?
The OpenTelemetry extension is set up differently and uses its own sampler options. Follow the [OpenTelemetry](open-source/opentelemetry.md) guide instead.
:::

Tracing needs three things: observability included in the build, the extension for your tracing backend, and the tracing configuration.

### 1. Include observability in the build

Open `Ballerina.toml` and add:

```toml
[build-options]
observabilityIncluded = true
```

### 2. Import the tracing extension

In your entry point file (typically `main.bal`), import the extension for the backend you use. Use one of:

```ballerina
import ballerinax/jaeger as _;
```

```ballerina
import ballerinax/zipkin as _;
```

### 3. Turn tracing on

In `Config.toml`, enable tracing and name the provider (`"jaeger"` or `"zipkin"`):

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"
```

Each backend also takes its own connection settings (agent host and port, sampler, and buffering) under `[ballerinax.jaeger]` or `[ballerinax.zipkin]`. Those are covered on the backend's page.

## Sampling with Jaeger and Zipkin

Sampling controls how many requests are traced. Both Jaeger and Zipkin support the same three strategies, set with `samplerType` and `samplerParam`:

| Strategy | Parameter | Description |
|----------|-----------|-------------|
| `const` | `1.0` (on) or `0.0` (off) | Sample all or none |
| `probabilistic` | `0.0` to `1.0` | Probability of sampling each trace |
| `ratelimiting` | traces per second | Fixed rate of traces per second |

Sampling every request is fine for development. In production, use `probabilistic` or `ratelimiting` to reduce overhead while keeping visibility into your system.

## Choose a tracing backend

| Backend | Best for | Guide |
|---------|----------|-------|
| **Jaeger** | Production-grade distributed tracing | [Jaeger](open-source/jaeger.md) |
| **Zipkin** | A lightweight tracing alternative | [Zipkin](open-source/zipkin.md) |
| **OpenTelemetry** | Any OTLP backend, such as an OpenTelemetry Collector, with traces and metrics from one extension | [OpenTelemetry](open-source/opentelemetry.md) |

You can also send traces to a managed platform: [Datadog](commercial/datadog.md) and [New Relic](commercial/new-relic.md) both accept traces, and [Moesif](commercial/moesif.md) supports traces alongside metrics and logs. For a complete stack that includes tracing, see the [Local Development Stack](recipes/local-development-stack.md) and [Kubernetes Production Stack](recipes/kubernetes-production-stack.md) recipes.

## What's next

- [Jaeger](open-source/jaeger.md) — Set up Jaeger and view traces
- [Zipkin](open-source/zipkin.md) — Set up Zipkin and view traces
- [OpenTelemetry](open-source/opentelemetry.md) — Export traces over OTLP to any compatible backend
- [Metrics](metrics.md) — Collect and monitor metrics alongside traces
- [Logging](logging.md) — Configure structured logging
