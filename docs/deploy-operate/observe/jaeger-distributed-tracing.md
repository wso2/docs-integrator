---
title: Jaeger Distributed Tracing
---

# Jaeger Distributed Tracing

Jaeger is an open-source distributed tracing platform that helps you monitor and troubleshoot request flows across your integration services. WSO2 Integrator provides built-in Jaeger support through the OpenTelemetry protocol.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Jaeger | Version 1.45 or later (all-in-one or production deployment) |
| Ballerina | Built with `--observability-included` |
| Network | Integration must reach the Jaeger agent or collector |

## Step 1 -- start Jaeger

Run the Jaeger OpenTelemetry all-in-one image for development and testing:

```bash
docker run -d --name jaeger \
  -p 13133:13133 \
  -p 16686:16686 \
  -p 4317:4317 \
  jaegertracing/opentelemetry-all-in-one:latest
```

| Port | Protocol | Purpose |
|------|----------|---------|
| 4317 | gRPC | OpenTelemetry collector (OTLP) |
| 13133 | HTTP | Health check endpoint |
| 16686 | HTTP | Jaeger UI |

For production deployments with higher throughput, use the dedicated Jaeger collector and agent components.

## Step 2 -- configure Ballerina for Jaeger

### Import the Jaeger extension

Navigate to your entry point file in the file explorer (typically `main.bal` in the project root) and add the following import statement at the top:

**File path:** `main.bal` (or your entry point)

```ballerina
import ballerinax/jaeger as _;
```

This enables Jaeger tracing capabilities in your Ballerina application.

### Enable tracing in configuration

Open `Ballerina.toml` by navigating file explorer and edit as follows

```toml
[build-options]
observabilityIncluded = true

```

Open the `Config.toml` file in your project root and add the following sections:

**File path:** `Config.toml`

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 4317
samplerType = "const"
samplerParam = 1.0
reporterFlushInterval = 2000
reporterBufferSize = 1000
```

If `Config.toml` doesn't exist, create it in your project root directory.

### Configuration options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `agentHostname` | string | `"localhost"` | Jaeger agent hostname |
| `agentPort` | int | `4317` | Jaeger OpenTelemetry receiver port (gRPC) |
| `samplerType` | string | `"const"` | Sampling strategy: `const`, `probabilistic`, `ratelimiting` |
| `samplerParam` | float | `1.0` | Sampler parameter (1.0 = sample all) |
| `reporterFlushInterval` | int | `2000` | Flush interval in milliseconds |
| `reporterBufferSize` | int | `1000` | Maximum spans buffered |

### Sampling strategies

| Strategy | Parameter | Description |
|----------|-----------|-------------|
| `const` | `1.0` (on) or `0.0` (off) | Sample all or none |
| `probabilistic` | `0.0` to `1.0` | Probability of sampling each trace |
| `ratelimiting` | traces/second | Fixed rate of traces per second |

For production, use `probabilistic` or `ratelimiting` to reduce overhead.

Edit `Config.toml` to modify the sampler configuration:

**File path:** `Config.toml`

```toml
[ballerinax.jaeger]
samplerType = "probabilistic"
samplerParam = 0.1   # Sample 10% of traces
```

This configuration samples 10% of traces in production to reduce overhead while maintaining visibility into your system.

## Step 3 -- view traces

Run the service and Open the Jaeger UI at `http://localhost:16686`:

1. Select your service from the **Service** dropdown.
2. Click **Find Traces**.
3. Click a trace to view the span details.

## What's next

- [Zipkin](zipkin-tracing.md) -- Alternative distributed tracing with Zipkin
- [Metrics Overview](metrics-overview.md) -- Collect and monitor metrics alongside traces
- [Observability Overview](observability-overview.md) -- Full observability architecture
