---
sidebar_position: 10
title: Zipkin Tracing
description: Set up Zipkin for distributed tracing of Ballerina integrations.
---

# Zipkin Tracing

Zipkin is a distributed tracing system that helps gather timing data for troubleshooting latency problems in service architectures. WSO2 Integrator provides built-in Zipkin support as an alternative to Jaeger for distributed tracing.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Zipkin | Version 2.24 or later |
| Ballerina | Built with `--observability-included` |
| Network | Integration must reach the Zipkin collector endpoint |

## Step 1 -- Start Zipkin

Run Zipkin using Docker:

```bash
docker run -d --name zipkin \
  -p 9411:9411 \
  openzipkin/zipkin:latest
```

The Zipkin UI is available at `http://localhost:9411`.

## Step 2 -- Configure Ballerina for Zipkin

Build with observability:

```bash
bal build --observability-included
```

Configure `Config.toml`:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "zipkin"

[ballerinax.zipkin]
reporterHostname = "localhost"
reporterPort = 9411
```

### Configuration Options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `reporterHostname` | string | `"localhost"` | Zipkin collector hostname |
| `reporterPort` | int | `9411` | Zipkin collector port |
| `samplerType` | string | `"const"` | Sampling strategy |
| `samplerParam` | float | `1.0` | Sampler parameter |

## Step 3 -- View Traces

1. Open the Zipkin UI at `http://localhost:9411`.
2. Click **Run Query** to find recent traces.
3. Click a trace to view the span timeline.

### Trace Visualization

Zipkin displays traces as a timeline of spans:

- **Service Name**: The Ballerina service that generated the span
- **Span Name**: The HTTP method and resource path
- **Duration**: Time taken for the operation
- **Annotations**: Client send/receive, server send/receive timestamps

## Adding Custom Spans

Use the Ballerina observe module to create custom spans:

```ballerina
import ballerina/observe;

function enrichOrder(json order) returns json|error {
    int spanId = check observe:startSpan("enrichOrder");

    // Call external enrichment service
    json enriched = check callEnrichmentAPI(order);

    check observe:addTagToSpan(spanId, "enrichment.source", "crm-api");
    check observe:finishSpan(spanId);

    return enriched;
}
```

## Docker Compose Setup

Run your integration with Zipkin in a single compose file:

```yaml
version: "3.8"
services:
  zipkin:
    image: openzipkin/zipkin:latest
    ports:
      - "9411:9411"

  integration:
    image: myorg/order-service:latest
    ports:
      - "9090:9090"
    environment:
      - BALLERINAX_ZIPKIN_REPORTER_HOSTNAME=zipkin
      - BALLERINAX_ZIPKIN_REPORTER_PORT=9411
    depends_on:
      - zipkin
```

## Zipkin with Elasticsearch Storage

For production, use Elasticsearch as the Zipkin storage backend:

```bash
docker run -d --name zipkin \
  -p 9411:9411 \
  -e STORAGE_TYPE=elasticsearch \
  -e ES_HOSTS=http://elasticsearch:9200 \
  openzipkin/zipkin:latest
```

## What's Next

- [Jaeger](jaeger.md) -- Alternative distributed tracing with Jaeger
- [Elastic Stack](elastic.md) -- Use Elasticsearch for trace storage and log aggregation
- [Observability Overview](index.md) -- Full observability architecture
