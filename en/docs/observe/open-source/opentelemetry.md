---
sidebar_position: 6
title: OpenTelemetry
description: Export traces and metrics from WSO2 Integrator to any OpenTelemetry-compatible backend over OTLP using the built-in OpenTelemetry extension.
keywords: [wso2 integrator, observability, opentelemetry, otel, otlp, tracing, metrics, opentelemetry collector]
slug: /observe/open-source/opentelemetry
---

# OpenTelemetry

[OpenTelemetry](https://opentelemetry.io/) (OTel) is a vendor-neutral standard for collecting telemetry. The OpenTelemetry extension (`ballerina/otel`) exports traces and metrics from your integration using the OpenTelemetry Protocol (OTLP). Any OTLP-compatible backend can receive them, including the OpenTelemetry Collector, Jaeger, Prometheus, Grafana Tempo, and most commercial observability platforms.

Use OpenTelemetry when you want one exporter for both traces and metrics, or when you want to route telemetry through an OpenTelemetry Collector rather than tie your integration to a single backend.

:::info Bundled with Ballerina 2201.14.0 and later
From Ballerina 2201.14.0 (Swan Lake Update 14), version 1.0.0 of the extension ships with the distribution. You don't need to import it or add a dependency. Turn it on in `Ballerina.toml` and `Config.toml`, as shown below.
:::

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Ballerina | 2201.14.0 or later |
| OTLP backend | An OpenTelemetry Collector or any backend that accepts OTLP over gRPC or HTTP |
| Network | The integration must be able to reach the OTLP endpoint |

## Step 1: Start an OpenTelemetry Collector

For local testing, run an OpenTelemetry Collector that prints the telemetry it receives. Create `otel-collector-config.yaml`:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

exporters:
  debug:
    verbosity: detailed

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [debug]
    metrics:
      receivers: [otlp]
      exporters: [debug]
```

Start the Collector:

```bash
docker run --rm --name otel-collector \
  -p 4317:4317 \
  -p 4318:4318 \
  -v "$(pwd)/otel-collector-config.yaml:/etc/otelcol-contrib/config.yaml:ro" \
  otel/opentelemetry-collector-contrib:latest
```

Received spans and metrics appear in the Collector's console output.

## Step 2: Enable observability in the build

Open `Ballerina.toml` and add:

```toml
[build-options]
observabilityIncluded = true
```

This packs the observability runtime, including the OpenTelemetry extension, into your integration.

## Step 3: Configure traces and metrics

Open `Config.toml` in your project root (create it if it doesn't exist) and select `otel` as the tracing provider, the metrics reporter, or both:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "otel"
metricsEnabled = true
metricsReporter = "otel"

[ballerina.otel]
tracesEndpoint = "http://localhost:4317"
metricsEndpoint = "http://localhost:4317"
metricsServiceName = "order-service"

[ballerina.otel.tracesResourceAttributes]
"deployment.environment" = "production"
```

With these settings, the integration exports traces and metrics over OTLP/gRPC to the OTLP receiver on `localhost:4317`, such as a local OpenTelemetry Collector. To send them somewhere else, see [Send to other backends](#send-to-other-backends). Every setting under `[ballerina.otel]` is optional. If you leave one out, the default from the tables below applies.

:::tip Trace only, or metrics only
Each signal is controlled by its own setting. To export only traces, set `tracingProvider = "otel"` and leave `metricsEnabled` off, or point `metricsReporter` at a different reporter such as `"prometheus"`.
:::

### Use OTLP over HTTP

Both signals default to OTLP/gRPC. To use OTLP/HTTP with protobuf encoding, set the protocol and give the **full signal URL**, including the `/v1/traces` or `/v1/metrics` path:

```toml
[ballerina.otel]
tracesProtocol = "http/protobuf"
tracesEndpoint = "http://localhost:4318/v1/traces"
metricsProtocol = "http/protobuf"
metricsEndpoint = "http://localhost:4318/v1/metrics"
```

### Trace configuration

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `tracesEndpoint` | string | `"http://localhost:4317"` | OTLP endpoint for traces. Must start with `http://` or `https://`. For `http/protobuf`, use the full URL ending in `/v1/traces`. |
| `tracesProtocol` | string | `"grpc"` | Export protocol: `grpc` or `http/protobuf`. |
| `tracesSampler` | string | `"parentbased_always_on"` | Sampling strategy. See [Sampling](#sampling). |
| `tracesSamplerArg` | decimal | `1` | Sampler argument: a probability from `0.0` to `1.0` for the ratio samplers, or traces per second for `ratelimiting`. Other samplers ignore it. |
| `tracesExporterTimeoutMillis` | int | `10000` | Maximum time to wait for each export, in milliseconds. |
| `tracesMaxExportBatchSize` | int | `512` | Maximum number of spans sent in one export. |
| `tracesExporterHeaders` | string | `""` | Headers sent with each export. See [Authenticate with headers](#authenticate-with-headers). |
| `tracesLogConsole` | boolean | `false` | Log export activity to the console. See [Troubleshoot exports](#troubleshoot-exports). |
| `tracesLogFile` | string | `""` | Path of a file to log export activity to. |
| `tracesLogLevel` | string | `"info"` | Export log level: `debug`, `info`, `warn`, or `error`. |

Set resource attributes for traces in the `[ballerina.otel.tracesResourceAttributes]` table.

### Metrics configuration

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `metricsEndpoint` | string | `"http://localhost:4317"` | OTLP endpoint for metrics. Must start with `http://` or `https://`. For `http/protobuf`, use the full URL ending in `/v1/metrics`. |
| `metricsProtocol` | string | `"grpc"` | Export protocol: `grpc` or `http/protobuf`. |
| `metricsServiceName` | string | `""` | Value of the `service.name` resource attribute for metrics. |
| `metricsExportIntervalMillis` | int | `60000` | How often metrics are exported, in milliseconds. Must be greater than `0`. |
| `metricsExporterTimeoutMillis` | int | `10000` | Maximum time to wait for each export, in milliseconds. |
| `metricsPrefix` | string | `""` | Prefix added to every metric name, joined with `_`. For example, `myapp` turns `requests_total` into `myapp_requests_total`. |
| `metricsExporterHeaders` | string | `""` | Headers sent with each export. See [Authenticate with headers](#authenticate-with-headers). |

Set resource attributes for metrics in the `[ballerina.otel.metricsResourceAttributes]` table.

### Resource attributes and service name

Resource attributes describe the source of the telemetry, such as the service name, version, or environment. Traces and metrics have separate tables, so set both if you want the same attributes on both signals:

```toml
[ballerina.otel.tracesResourceAttributes]
"service.name" = "order-service"
"service.version" = "1.2.0"
"deployment.environment" = "production"

[ballerina.otel.metricsResourceAttributes]
"service.name" = "order-service"
"service.version" = "1.2.0"
"deployment.environment" = "production"
```

Quote the keys, because attribute names contain dots.

`service.name` works differently for each signal:

- **Traces:** each Ballerina service reports its own name as `service.name` by default. Set `service.name` in `tracesResourceAttributes` to replace it with a single name for every service.
- **Metrics:** `service.name` comes from `metricsServiceName` and is empty by default. Set `metricsServiceName`, or set `service.name` in `metricsResourceAttributes`. The resource attribute wins if you set both.

## Sampling

Sampling controls which requests produce traces. Set the strategy with `tracesSampler` and its argument with `tracesSamplerArg`.

| Sampler | `tracesSamplerArg` | Description |
|---------|--------------------|-------------|
| `always_on` | Ignored | Sample every trace. |
| `always_off` | Ignored | Sample nothing. |
| `traceidratio` | `0.0` to `1.0` | Sample this fraction of traces, based on the trace ID. |
| `parentbased_always_on` | Ignored | Follow the caller's sampling decision. Sample root spans. **Default.** |
| `parentbased_always_off` | Ignored | Follow the caller's sampling decision. Don't sample root spans. |
| `parentbased_traceidratio` | `0.0` to `1.0` | Follow the caller's sampling decision. Sample this fraction of root spans. |
| `ratelimiting` | Traces per second | Sample at most this many traces per second. |

The `parentbased_*` samplers respect the decision of an upstream service, which keeps traces complete across service boundaries. In production, use `parentbased_traceidratio` or `ratelimiting` to reduce overhead. For example, to sample 10% of new traces:

```toml
[ballerina.otel]
tracesSampler = "parentbased_traceidratio"
tracesSamplerArg = 0.1
```

## Authenticate with headers

Most hosted backends require an API key or token in a request header. Set `tracesExporterHeaders` and `metricsExporterHeaders` as comma-separated `key=value` pairs. This is the same format as the standard `OTEL_EXPORTER_OTLP_TRACES_HEADERS` and `OTEL_EXPORTER_OTLP_METRICS_HEADERS` environment variables:

```toml
[ballerina.otel]
tracesEndpoint = "https://otlp.example.com:4317"
tracesExporterHeaders = "api-key=<your-api-key>,x-tenant=orders"
metricsEndpoint = "https://otlp.example.com:4317"
metricsExporterHeaders = "api-key=<your-api-key>,x-tenant=orders"
```

Values can be percent-encoded. For example, write a space as `%20` and a comma as `%2C`. A `+` stays a literal plus, so Base64 values work as they are. Use an `https://` endpoint to send headers over TLS.

:::caution
Don't commit API keys in `Config.toml`. Supply them at deployment time, for example from a Kubernetes secret mounted as the `Config.toml` file, or through the `BAL_CONFIG_DATA` environment variable.
:::

## Send to other backends

Point the extension at a backend directly, or keep it pointed at a Collector and change only the Collector's exporters.

### Jaeger

Jaeger accepts OTLP natively. Start it with OTLP enabled:

```bash
docker run -d --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 16686:16686 \
  jaegertracing/all-in-one:latest
```

Keep the default `tracesEndpoint = "http://localhost:4317"`. Open the Jaeger UI at `http://localhost:16686` and select your service to view traces. Jaeger stores traces only, so send metrics elsewhere.

### Prometheus

Prometheus 3.0 and later can receive OTLP metrics directly when started with the `--web.enable-otlp-receiver` flag. The receiver accepts OTLP/HTTP only:

```bash
docker run -d --name prometheus \
  -p 9090:9090 \
  prom/prometheus:latest \
  --config.file=/etc/prometheus/prometheus.yml \
  --web.enable-otlp-receiver
```

```toml
[ballerina.otel]
metricsProtocol = "http/protobuf"
metricsEndpoint = "http://localhost:9090/api/v1/otlp/v1/metrics"
metricsServiceName = "order-service"
```

To scrape a Prometheus endpoint on the integration instead of pushing metrics, see [Prometheus and Grafana](prometheus-grafana.md).

### Through the Collector

To fan out to several backends, send telemetry to an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) and configure an exporter for each backend. This Collector configuration receives OTLP on the default ports and sends traces to Jaeger and metrics to Prometheus:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:

exporters:
  otlp/jaeger:
    endpoint: jaeger:4317
    tls:
      insecure: true
  otlphttp/prometheus:
    endpoint: http://prometheus:9090/api/v1/otlp

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp/jaeger]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp/prometheus]
```

Point `tracesEndpoint` and `metricsEndpoint` at the Collector. To add or change backends later, change only the Collector's exporters. The integration's configuration stays the same.

## Troubleshoot exports

At startup, the integration prints the endpoint and protocol each signal exports to. If nothing reaches your backend, turn on export logging to check whether exports succeed:

```toml
[ballerina.otel]
tracesLogConsole = true
tracesLogFile = "/var/log/integrations/otel-export.log"
tracesLogLevel = "info"
```

At `info`, each export logs the number of spans and the result. At `debug`, it also logs the full span payload.

:::caution
Span payloads can contain sensitive data from your integration. Use `debug` only while troubleshooting, and remove it afterwards.
:::

Common issues:

| Symptom | Likely cause |
|---------|--------------|
| The integration fails to start with an `invalid Otel configuration` error | A value isn't one of the allowed options, such as a misspelled sampler or protocol, or an endpoint without `http://` or `https://`. The error names the setting. |
| Traces export over HTTP but nothing arrives | `tracesEndpoint` is missing the `/v1/traces` path. The same applies to `/v1/metrics` for metrics. |
| Metrics appear without a service name | Set `metricsServiceName` or `service.name` in `metricsResourceAttributes`. |
| Metrics arrive late | Metrics export once per `metricsExportIntervalMillis` (60 seconds by default). Lower it for development. |
| Telemetry goes to another local agent | Another agent, such as a Datadog Agent, is already listening on port 4317 or 4318. Stop it, or map the Collector to different host ports. |

## What's next

- [Distributed tracing](../tracing.md) -- Tracing concepts and sampling
- [Metrics](../metrics.md) -- Built-in and custom metrics
- [Jaeger](jaeger.md) -- Set up Jaeger with the Jaeger extension
- [Prometheus and Grafana](prometheus-grafana.md) -- Scrape metrics and build dashboards
- [Observability Overview](../observe.md) -- Full observability architecture
