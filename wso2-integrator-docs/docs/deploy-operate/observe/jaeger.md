---
sidebar_position: 9
title: Jaeger Distributed Tracing
description: Set up Jaeger for distributed tracing of Ballerina integrations.
---

# Jaeger Distributed Tracing

Jaeger is an open-source distributed tracing platform that helps you monitor and troubleshoot request flows across your integration services. WSO2 Integrator provides built-in Jaeger support through the OpenTelemetry protocol.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Jaeger | Version 1.45 or later (all-in-one or production deployment) |
| Ballerina | Built with `--observability-included` |
| Network | Integration must reach the Jaeger agent or collector |

## Step 1 -- Start Jaeger

Run the Jaeger all-in-one image for development:

```bash
docker run -d --name jaeger \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 4317:4317 \
  -p 4318:4318 \
  jaegertracing/all-in-one:latest
```

| Port | Protocol | Purpose |
|------|----------|---------|
| 6831 | UDP | Jaeger agent (compact Thrift) |
| 6832 | UDP | Jaeger agent (binary Thrift) |
| 16686 | HTTP | Jaeger UI |
| 14268 | HTTP | Jaeger collector |
| 4317 | gRPC | OpenTelemetry collector (OTLP) |
| 4318 | HTTP | OpenTelemetry collector (OTLP) |

## Step 2 -- Configure Ballerina for Jaeger

Build with observability:

```bash
bal build --observability-included
```

Configure `Config.toml`:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 6831
samplerType = "const"
samplerParam = 1.0
reporterFlushInterval = 1000
reporterBufferSize = 100
```

### Configuration Options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `agentHostname` | string | `"localhost"` | Jaeger agent hostname |
| `agentPort` | int | `6831` | Jaeger agent UDP port |
| `samplerType` | string | `"const"` | Sampling strategy: `const`, `probabilistic`, `ratelimiting` |
| `samplerParam` | float | `1.0` | Sampler parameter (1.0 = sample all) |
| `reporterFlushInterval` | int | `1000` | Flush interval in milliseconds |
| `reporterBufferSize` | int | `100` | Maximum spans buffered |

### Sampling Strategies

| Strategy | Parameter | Description |
|----------|-----------|-------------|
| `const` | `1.0` (on) or `0.0` (off) | Sample all or none |
| `probabilistic` | `0.0` to `1.0` | Probability of sampling each trace |
| `ratelimiting` | traces/second | Fixed rate of traces per second |

For production, use `probabilistic` or `ratelimiting` to reduce overhead:

```toml
[ballerinax.jaeger]
samplerType = "probabilistic"
samplerParam = 0.1   # Sample 10% of traces
```

## Step 3 -- View Traces

Open the Jaeger UI at `http://localhost:16686`:

1. Select your service from the **Service** dropdown.
2. Click **Find Traces**.
3. Click a trace to view the span details.

### Trace Structure

A typical integration trace includes:

```
order-service: POST /api/orders (120ms)
  ├── inventory-service: GET /api/stock (45ms)
  ├── payment-service: POST /api/charge (60ms)
  └── notification-service: POST /api/notify (10ms)
```

Each span captures:
- **Operation name** (HTTP method + resource path)
- **Duration** (time spent in the operation)
- **Tags** (HTTP status, error, component)
- **Logs** (events within the span)

## Adding Custom Spans

Instrument specific operations in your Ballerina code:

```ballerina
import ballerina/observe;

function processOrder(json order) returns json|error {
    int spanId = check observe:startSpan("processOrder");

    // Validate the order
    int validateSpanId = check observe:startSpan("validateOrder");
    check validateOrder(order);
    check observe:finishSpan(validateSpanId);

    // Process payment
    int paymentSpanId = check observe:startSpan("processPayment");
    json paymentResult = check processPayment(order);
    check observe:finishSpan(paymentSpanId);

    check observe:finishSpan(spanId);
    return paymentResult;
}
```

### Adding Tags to Spans

```ballerina
import ballerina/observe;

function processOrder(json order) returns json|error {
    int spanId = check observe:startSpan("processOrder");
    check observe:addTagToSpan(spanId, "order.id", check order.orderId);
    check observe:addTagToSpan(spanId, "order.amount", check order.totalAmount);

    // Process...

    check observe:finishSpan(spanId);
    return result;
}
```

## Kubernetes Deployment

Deploy Jaeger as a sidecar or a centralized collector in Kubernetes:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: integration-with-jaeger
spec:
  template:
    spec:
      containers:
        - name: integration
          image: myorg/order-service:latest
          env:
            - name: BALLERINAX_JAEGER_AGENT_HOSTNAME
              value: "localhost"
        - name: jaeger-agent
          image: jaegertracing/jaeger-agent:latest
          args: ["--reporter.grpc.host-port=jaeger-collector:14250"]
          ports:
            - containerPort: 6831
              protocol: UDP
```

## What's Next

- [Zipkin](zipkin.md) -- Alternative distributed tracing with Zipkin
- [Grafana](grafana.md) -- Visualize trace data alongside metrics
- [Observability Overview](index.md) -- Full observability architecture
