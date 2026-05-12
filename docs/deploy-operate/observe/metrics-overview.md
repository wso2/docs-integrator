---
title: Metrics (Prometheus)
---

# Metrics (Prometheus)

Monitor the health and performance of your WSO2 Integrator services using Prometheus metrics. WSO2 Integrator provides built-in support for exposing metrics in Prometheus format, enabling you to collect quantitative data on request counts, latency, error rates, and custom business metrics.

## What are metrics?

Metrics are numerical measurements of your application's behavior and health. They help you understand:
- **Request volume** – How many requests your service is processing
- **Performance** – Request latency and response times
- **Reliability** – Error rates and failure patterns
- **Resource usage** – JVM memory, garbage collection, active connections
- **Business KPIs** – Orders processed, messages transformed, SLA compliance

Prometheus collects metrics using a **pull model** – your application exposes metrics at an HTTP endpoint, and Prometheus periodically scrapes (pulls) the data for storage and analysis.

## Enabling Prometheus Metrics in your integration

### Prerequisites

| Requirement | Details |
|-------------|---------|
| Prometheus | Version 2.40 or later |
| Network | Prometheus must be able to reach the metrics endpoint |

### Configure integration for Prometheus

Navigate to the file explorer of the WSO2 Integrator and add the following to the `main.bal` file.

```ballerina
import ballerinax/prometheus as _;
```

Edit `Config.toml` to enable Prometheus metrics:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"

[ballerinax.prometheus]
port = 9797
host = "0.0.0.0"
```

Add the Prometheus dependency to `Ballerina.toml`:

```toml
[build-options]
observabilityIncluded = true

[[dependency]]
org = "ballerinax"
name = "prometheus"
version = "1.0.0"
```

## Setting up Prometheus

Once you've enabled metrics in your integration, you need to configure Prometheus to scrape the metrics endpoint.

### Create Prometheus Configuration

Create a `prometheus.yml` file with the following configuration:

```yaml
global:
  scrape_interval:     15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'ballerina'
    static_configs:
      - targets: ['localhost:9797']
```

Replace `localhost:9797` with your service's host and port. The metrics endpoint runs on port 9797 by default (as configured in `Config.toml`).

### Run Prometheus

You can run Prometheus using Docker:

```bash
docker run -p 9090:9090 -v <path_to_prometheus.yml>:/etc/prometheus/ prom/prometheus
```

**Note:** If running Ballerina on localhost and Prometheus in Docker, use `host.docker.internal:9797` as your target instead to allow Docker to access the host machine:

```yaml
scrape_configs:
  - job_name: 'ballerina'
    static_configs:
      - targets: ['host.docker.internal:9797']
```

Access Prometheus at `http://localhost:9090` to view metrics and create dashboards.

### Other Installation Methods

There are many other ways to install Prometheus besides Docker. Visit the [official Prometheus documentation](https://prometheus.io/docs/prometheus/latest/installation/) for downloadable binaries and other installation options.

## Default Metrics Exposed

Ballerina automatically collects and exposes the following metrics without any additional code:

### HTTP Service Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `http_requests_total` | Counter | Total number of HTTP requests received |
| `http_request_duration_seconds` | Histogram | Request processing duration |
| `http_requests_in_flight` | Gauge | Number of requests currently being processed |
| `http_response_status_total` | Counter | Response count by HTTP status code |

### HTTP Client Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `http_client_requests_total` | Counter | Total outbound HTTP requests |
| `http_client_request_duration_seconds` | Histogram | Outbound request duration |
| `http_client_response_status_total` | Counter | Outbound response count by status code |

### JVM Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `jvm_memory_bytes_used` | Gauge | JVM memory usage |
| `jvm_threads_current` | Gauge | Current number of JVM threads |
| `jvm_gc_collection_seconds_total` | Counter | Time spent in garbage collection |

### Database Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `ballerina_sql_query_duration_seconds` | Histogram | Database query latency |
| `ballerina_sql_active_connections` | Gauge | Active DB connections |

## Custom Metrics

Create application-specific metrics to track business KPIs and integration-specific measurements beyond the built-in metrics.

### When to use custom metrics

- Track business metrics (orders processed, messages transformed, records synced)
- Monitor SLA compliance (response times, error rates per partner)
- Measure integration throughput and queue depths
- Create domain-specific dashboards

### Counter (Monotonically increasing)

Use counters for metrics that only increase:

```ballerina
import ballerina/observe;

final observe:Counter ordersProcessed = new ("orders_processed_total",
    description = "Total number of orders processed",
    tags = {}
);

// Increment in your service logic
ordersProcessed.increment(amount = 1);
```

### Gauge (Value that goes up and down)

Use gauges for metrics that can increase or decrease:

```ballerina
final observe:Gauge activeConnections = new ("active_connections",
    description = "Number of active connections",
    tags = {}
);

// Adjust the value
activeConnections.increment(amount = 1);
activeConnections.decrement(amount = 1);
```

## What's Next

- **[Distributed Tracing](jaeger-distributed-tracing.md)** – Trace requests across services
- **[Logging](logging-overview.md)** – Configure structured logging
- **[Integration Control Plane](integration-control-plane-icp.md)** – Centralized monitoring dashboard
- **[Datadog Integration](datadog-integration.md)** – Forward Prometheus metrics to Datadog
- **[Observability Overview](observability-overview.md)** – Full observability architecture
