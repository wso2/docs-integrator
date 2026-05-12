---
title: Zipkin Tracing
---

# Zipkin Tracing

Zipkin is an open-source distributed tracing platform that helps troubleshoot latency problems in service architectures. WSO2 Integrator provides built-in Zipkin support, publishing tracing data in OpenTelemetry format.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Zipkin | Version 2.24 or later |
| Network | Integration must reach the Zipkin agent endpoint |

## Step 1 -- start Zipkin

Run Zipkin using Docker:

```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```

The Zipkin UI is available at `http://localhost:9411`.

There are many possible ways to deploy Zipkin. For more information, see [Zipkin Quickstart](https://zipkin.io/pages/quickstart).

## Step 2 -- import the Zipkin extension

To include the Zipkin extension in the executable, import the `ballerinax/zipkin` module in your project's `main.bal` file.

1. In the **Explorer** pane, navigate to your project root and open `main.bal`.
2. Add the following import at the top of the file:

```ballerina
import ballerinax/zipkin as _;
```

The Zipkin extension includes a **Zipkin Span Exporter** that pushes tracing data as batches to the Zipkin server endpoint (default: `http://localhost:9411`) in Zipkin format.

## Step 3 -- configure Ballerina for Zipkin

Open `Ballerina.toml` by navigating file explorer and edit as follows

```toml
[build-options]
observabilityIncluded = true

```

Configure `Config.toml`:

1. In the **Explorer** pane, navigate to your project root and open `Config.toml`. If the file does not exist, create it at the project root.
2. Add or update the following configuration:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "zipkin"

[ballerinax.zipkin]
agentHostname = "localhost"
agentPort = 9411
samplerType = "const"
samplerParam = 1.0
reporterFlushInterval = 1000
reporterBufferSize = 10000
```

### Configuration options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `agentHostname` | string | `"localhost"` | Hostname of the Zipkin agent. Use `localhost` if running on the same node as Ballerina. |
| `agentPort` | int | `9411` | Port on which the Zipkin agent is listening. |
| `samplerType` | string | `"const"` | Sampling strategy: `const`, `probabilistic`, or `ratelimiting`. |
| `samplerParam` | float | `1.0` | For `const`: `0` (no sampling) or `1` (sample all). For `probabilistic`: `0.0`–`1.0`. For `ratelimiting`: positive integer (rate per second). |
| `reporterFlushInterval` | int | `1000` | Interval (ms) at which the client sends spans to the agent. |
| `reporterBufferSize` | int | `10000` | Queue size of the Zipkin client. |

## Step 4 -- send requests

Run the service and send requests to your service to generate trace data. Example cURL commands:

```bash
curl -X GET http://localhost:8090/shop/products
```

```bash
curl -X POST http://localhost:8090/shop/product \
  -H "Content-Type: application/json" \
  -d '{"id": 4, "name": "Laptop Charger", "price": 50.00}'
```

```bash
curl -X POST http://localhost:8090/shop/order \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 1}'
```

## Step 5 -- view traces

1. Open the Zipkin UI at `http://localhost:9411`.
2. Select the service for which you need tracing information.
3. Click **Run Query** to find recent traces.
4. Click a trace to view the span timeline.

### Trace visualization

Zipkin displays traces as a timeline of spans:

- **Service Name**: The Ballerina service that generated the span
- **Span Name**: The HTTP method and resource path
- **Duration**: Time taken for the operation
- **Annotations**: Client send/receive, server send/receive timestamps

## What's next

- [Jaeger](jaeger-distributed-tracing.md) -- Alternative distributed tracing with Jaeger
- [Elastic Stack](elastic-stack-elk.md) -- Use Elasticsearch for trace storage and log aggregation
- [Observability Overview](observability-overview.md) -- Full observability architecture
