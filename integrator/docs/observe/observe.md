---
title: Observe
---

# Observe

Observability is how you understand an integration's runtime behavior, using metrics, logs, and traces. WSO2 Integrator emits all three, and you choose where they go.

Two distinct activities sit under this heading, and it is worth keeping them apart:

- **Monitoring** answers *"is it behaving as expected?"* It watches known indicators and alerts when they fall outside expected ranges. Useful for problems you anticipated.
- **Diagnosis** answers *"why is it behaving this way?"* It uses logs, metrics, and traces to explain what is actually happening. Useful for problems you did not anticipate.

:::info Observability follows your deployment
Like [managing](../manage/manage.md) integrations, how you observe them depends on where they run:

- **Deployed to WSO2 Cloud:** observability is built in, with nothing to set up. See <CloudDocsLink to="/observe">Observe on WSO2 Cloud.
- **Running on your own infrastructure:** the [Integration Control Plane](../icp/index.md) surfaces health, metrics, and logs, and you can send the same telemetry to the open-source or commercial tools below.

## The three pillars of observability

| Pillar | Purpose | Key Metrics | Built-in Support |
|--------|---------|-------------|-----------------|
| **Metrics** | Quantitative measurements of system behavior | Request counts, latency, error rates, throughput | Prometheus-compatible endpoint |
| **Logging** | Structured event records for debugging and auditing | Log entries with context, error details, request tracing | Ballerina `log` module with configurable levels |
| **Distributed Tracing** | End-to-end request flow across services | Span duration, service dependencies, bottlenecks | OpenTelemetry-based tracing |

## Architecture

```mermaid
flowchart LR
    subgraph Runtime["Ballerina Runtime"]
        Metrics["Metrics Agent"]
        Tracing["Tracing Agent"]
        Logging["Log Agent"]
    end

    Prometheus[Prometheus]
    Grafana[Grafana]
    Jaeger[Jaeger / Zipkin]
    ELK[ELK / OpenSearch / Loki]

    Metrics ----> Prometheus ----> Grafana
    Tracing ----> Jaeger
    Logging ----> ELK
```

## Instrument your integration

<PaletteCard icon="logging" href="/observe/logging">
  <h3 class="palette-card-title">Logging</h3>
  <ul class="palette-card-list">
    <li>Structured logging and log levels</li>
    <li>Log aggregation approaches</li>
  </ul>

<PaletteCard icon="metrics" href="/observe/metrics">
  <h3 class="palette-card-title">Metrics</h3>
  <ul class="palette-card-list">
    <li>Prometheus metrics endpoint</li>
    <li>Built-in and custom metrics</li>
  </ul>

<PaletteCard icon="event" href="/observe/tracing">
  <h3 class="palette-card-title">Distributed Tracing</h3>
  <ul class="palette-card-list">
    <li>Enable tracing and sampling</li>
    <li>Choose a tracing backend</li>
  </ul>

## Monitor with the Integration Control Plane

<PaletteCard icon="manage-observe" href="/observe/icp-observability">
  <h3 class="palette-card-title">ICP Observability Setup</h3>
  <ul class="palette-card-list">
    <li>View logs and metrics in the ICP console</li>
    <li>Fluent Bit and OpenSearch setup</li>
  </ul>

## Send telemetry to your own stack

<PaletteCard icon="external">
  <h3 class="palette-card-title">Open Source</h3>
  <p class="palette-card-desc">Deploy and manage your own observability stack.</p>

    <PaletteChip href="/observe/open-source/prometheus-grafana">Prometheus and Grafana
    <PaletteChip href="/observe/open-source/jaeger">Jaeger
    <PaletteChip href="/observe/open-source/zipkin">Zipkin
    <PaletteChip href="/observe/open-source/elastic-stack-elk">Elastic Stack (ELK)
    <PaletteChip href="/observe/open-source/opensearch">OpenSearch
    <PaletteChip href="/observe/open-source/opentelemetry">OpenTelemetry


<PaletteCard icon="cloud">
  <h3 class="palette-card-title">Commercial Platforms</h3>
  <p class="palette-card-desc">Send telemetry to a managed observability platform.</p>

    <PaletteChip href="/observe/commercial/datadog">Datadog
    <PaletteChip href="/observe/commercial/new-relic">New Relic
    <PaletteChip href="/observe/commercial/moesif">Moesif


<PaletteCard icon="template">
  <h3 class="palette-card-title">Recipes</h3>
  <p class="palette-card-desc">Step-by-step setups for a complete stack.</p>

    <PaletteChip href="/observe/recipes/local-development-stack">Local development
    <PaletteChip href="/observe/recipes/kubernetes-production-stack">Kubernetes production
    <PaletteChip href="/observe/recipes/elk-stack">ELK stack
    <PaletteChip href="/observe/recipes/opensearch-log-analytics">OpenSearch
    <PaletteChip href="/observe/recipes/datadog-setup">Datadog
