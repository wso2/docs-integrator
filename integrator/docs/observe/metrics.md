---
title: Metrics
---

# Metrics

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

When the application starts, a Prometheus-compatible metrics endpoint is available at `http://localhost:9797/metrics`.

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
docker run -p 9090:9090 -v <path_to_prometheus.yml>:/etc/prometheus/prometheus.yml prom/prometheus
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

| Metric | Type | Description |
|--------|------|-------------|
| `requests_total_value` | Counter | Total number of requests |
| `response_errors_total_value` | Counter | Total number of failed requests (for example, 5xx responses) |
| `inprogress_requests_value` | Gauge | Number of requests currently being processed |
| `response_time_seconds` | Summary | Response time quantiles (`quantile` label) over time windows of 10, 60 and 300 seconds (`timeWindow` label: `10000`, `60000`, `300000`) |
| `response_time_seconds_value` | Gauge | Response time of the latest request |
| `response_time_seconds_mean`, `_max`, `_min`, `_stdDev` | Gauge | Response time statistics over the same time windows |
| `response_time_nanoseconds_total_value` | Counter | Total response time in nanoseconds |

The same metrics cover both HTTP services and HTTP clients. Labels identify the source, for example:

- Services: `entrypoint_service_name`, `src_resource_path`, `http_url`, `http_method`, and `http_status_code_group` (`2xx`, `4xx`, `5xx`)
- Clients: `src_client_remote="true"`, `http_base_url` or `peer_address`, `http_method`, and `http_status_code_group`
- All metrics: `src_module` and `entrypoint_function_name`. Failed requests also carry `error="true"`

## Custom Metrics

Create application-specific metrics to track business KPIs and integration-specific measurements beyond the built-in metrics.

### When to use custom metrics

- Track business metrics (orders processed, messages transformed, records synced)
- Monitor SLA compliance (response times, error rates per partner)
- Measure integration throughput and queue depths
- Create domain-specific dashboards

### Counter (Monotonically increasing)

Use counters for metrics that only increase. A metric is exported only after you register it:

```ballerina
import ballerina/observe;

final observe:Counter ordersProcessed = new ("orders_processed_total",
    desc = "Total number of orders processed"
);

function init() returns error? {
    // Register the metric so that it's exported
    check ordersProcessed.register();
}

// Call from your service logic
function recordOrder() {
    ordersProcessed.increment();
}
```

The exported name gets a `_value` suffix, so this counter appears as `orders_processed_total_value`.

### Gauge (Value that goes up and down)

Use gauges for metrics that can increase or decrease:

```ballerina
import ballerina/observe;

final observe:Gauge activeConnections = new ("active_connections",
    desc = "Number of active connections"
);

function init() returns error? {
    check activeConnections.register();
}

function onConnect() {
    activeConnections.increment();
}

function onDisconnect() {
    activeConnections.decrement();
}
```

This gauge is exported as `active_connections_value`, along with statistics over a time window: `active_connections` (quantiles) and `active_connections_mean`, `_max`, `_min` and `_stdDev`.

### Tags and statistics

Custom metrics can carry tags, which are exported as Prometheus labels. There is no histogram type. To record a distribution such as processing time, set each value on a gauge and use its statistics:

```ballerina
import ballerina/http;
import ballerina/observe;
import ballerina/time;

// Each distinct set of tags is a separate series of the same metric
final observe:Counter ordersSucceeded = new ("orders_processed_total",
    desc = "Total number of orders processed",
    tags = {"status": "success", "region": "us_east"}
);

final observe:Counter ordersFailed = new ("orders_processed_total",
    desc = "Total number of orders processed",
    tags = {"status": "failure", "region": "us_east"}
);

final observe:Gauge activeOrders = new ("orders_active",
    desc = "Number of orders currently being processed",
    tags = {"region": "us_east"}
);

final observe:Gauge orderProcessingTime = new ("order_processing_duration_seconds",
    desc = "Time taken to process an order"
);

function init() returns error? {
    check ordersSucceeded.register();
    check ordersFailed.register();
    check activeOrders.register();
    check orderProcessingTime.register();
}

service /orders on new http:Listener(8080) {
    resource function post .(@http:Payload json payload) returns json|error {
        decimal startTime = time:monotonicNow();
        activeOrders.increment();

        json|error result = processOrder(payload);

        activeOrders.decrement();
        orderProcessingTime.setValue(<float>(time:monotonicNow() - startTime));
        if result is error {
            ordersFailed.increment();
            return result;
        }
        ordersSucceeded.increment();
        return result;
    }
}

function processOrder(json payload) returns json|error {
    // Process order...
    return {status: "accepted"};
}
```

## Send metrics to Amazon Managed Service for Prometheus

On AWS, have an [AWS Distro for OpenTelemetry](https://aws-otel.github.io/) collector or the CloudWatch agent scrape the integration's metrics endpoint (port `9797`), and remote-write the metrics to Amazon Managed Service for Prometheus or publish them to CloudWatch. Use the same scrape settings as in [Setting up Prometheus](#setting-up-prometheus).

The endpoint exists only when Prometheus metrics are enabled in `Config.toml`, as shown in [Configure integration for Prometheus](#configure-integration-for-prometheus). In a container, where `Config.toml` isn't part of the image, set the same values as environment variables: `BAL_CONFIG_VAR_BALLERINA_OBSERVE_METRICSENABLED=true`, `BAL_CONFIG_VAR_BALLERINA_OBSERVE_METRICSREPORTER=prometheus`, and, to change the defaults, `BAL_CONFIG_VAR_BALLERINAX_PROMETHEUS_HOST` and `BAL_CONFIG_VAR_BALLERINAX_PROMETHEUS_PORT`.

## What's next

- [Prometheus and Grafana](open-source/prometheus-grafana.md) — Scrape configuration, Kubernetes, and Grafana dashboards
- [Distributed tracing](tracing.md) — Trace requests across services with Jaeger or Zipkin
- [OpenTelemetry](open-source/opentelemetry.md) — Push metrics over OTLP to an OpenTelemetry Collector or other backend
- [Logging](logging.md) — Configure structured logging
- [Integration Control Plane](../icp/index.md) — Centralized monitoring dashboard
- [Overview](observe.md) — Full observability architecture
