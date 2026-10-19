---
title: OpenSearch
---

# OpenSearch

OpenSearch is an open-source search and analytics suite derived from Elasticsearch. It provides log aggregation, full-text search, and visualization through OpenSearch Dashboards. WSO2 Integrator logs can be shipped to OpenSearch using Fluent Bit or Data Prepper.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| OpenSearch | Version 2.x or later |
| OpenSearch Dashboards | Same version as OpenSearch |
| Log Shipper | Fluent Bit or Data Prepper |

## Step 1 -- deploy OpenSearch

### Docker compose

```yaml
version: "3.8"
services:
  opensearch:
    image: opensearchproject/opensearch:3.5.0
    environment:
      - discovery.type=single-node
      - DISABLE_SECURITY_PLUGIN=true
      - OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
    volumes:
      - opensearch-data:/usr/share/opensearch/data

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:3.5.0
    ports:
      - "5601:5601"
    environment:
      - OPENSEARCH_HOSTS=["http://opensearch:9200"]
      - DISABLE_SECURITY_DASHBOARDS_PLUGIN=true
    depends_on:
      - opensearch

volumes:
  opensearch-data:
```

## Step 2 -- configure log shipping

By default, Ballerina writes logs to stderr in logfmt. Configure the integration's `Config.toml` to write JSON logs to a file that the log shipper reads:

```toml
[ballerina.log]
format = "json"

[[ballerina.log.destinations]]
path = "/var/log/integrations/app.log"
```

### Using fluent bit (Recommended)

Add a Fluent Bit service to the Docker Compose file:

```yaml
  fluent-bit:
    image: fluent/fluent-bit:4.2.2
    volumes:
      - ./fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf
      - ./parsers.conf:/fluent-bit/etc/parsers.conf
      - /var/log/integrations:/var/log/integrations:ro
    depends_on:
      - opensearch
```

Create `parsers.conf` so that Fluent Bit reads the timestamp from Ballerina's `time` field:

```ini
[PARSER]
    Name        json
    Format      json
    Time_Key    time
    Time_Format %Y-%m-%dT%H:%M:%S.%L%z
```

Create `fluent-bit.conf`:

```ini
[SERVICE]
    Flush        1
    Log_Level    info
    Parsers_File parsers.conf

[INPUT]
    Name         tail
    Path         /var/log/integrations/*.log
    Parser       json
    Tag          ballerina.*
    Refresh_Interval 5

[FILTER]
    Name         modify
    Match        ballerina.*
    Add          service order-service
    Add          environment production

[OUTPUT]
    Name         opensearch
    Match        *
    Host         opensearch
    Port         9200
    Logstash_Format On
    Logstash_Prefix ballerina-integrations
    Type         _doc
    Suppress_Type_Name On
```

### Using data prepper

Data Prepper is OpenSearch's native data collection tool. Create `pipelines.yaml`:

```yaml
log-pipeline:
  source:
    file:
      path: /var/log/integrations/app.log
      format: json
      record_type: event
  processor:
    - date:
        match:
          - key: time
            patterns: ["yyyy-MM-dd'T'HH:mm:ss.SSSXXX"]
  sink:
    - opensearch:
        hosts: ["http://opensearch:9200"]
        index: "ballerina-integrations-%{yyyy.MM.dd}"
```

Add a Data Prepper service to the Docker Compose file:

```yaml
  data-prepper:
    image: opensearchproject/data-prepper:2.16.0
    ports:
      - "21890:21890"
    volumes:
      - ./pipelines.yaml:/usr/share/data-prepper/pipelines/pipelines.yaml
      - /var/log/integrations:/var/log/integrations:ro
    depends_on:
      - opensearch
```

The `file` source reads the log file once when Data Prepper starts and does not pick up lines written later. Use Fluent Bit to ship logs continuously.

### Filebeat

Filebeat can't ship logs to OpenSearch 3.x. Filebeat 8.x only connects to Elasticsearch, and Filebeat OSS 7.x sends a `_type` parameter that OpenSearch 3.x rejects. Use Fluent Bit or Data Prepper instead.

## Step 3 -- create an index pattern

1. Open OpenSearch Dashboards at `http://localhost:5601`.
2. Navigate to **Dashboards Management** > **Index patterns**.
3. Create a pattern: `ballerina-integrations-*`.
4. Set `@timestamp` as the time field.

## Step 4 -- build dashboards

### Useful visualizations

| Visualization | Type | Purpose |
|---------------|------|---------|
| Log Timeline | Area chart | Log volume over time by level |
| Error Table | Data table | Recent error log entries |
| Service Breakdown | Pie chart | Logs per service |
| Top Error Messages | Tag cloud | Most frequent error messages |

### DQL queries

| Query | Purpose |
|-------|---------|
| `level: "ERROR"` | All error logs |
| `service: "order-service" AND orderId.keyword: "ORD-123"` | Trace a specific order |
| `level: "WARN" OR level: "ERROR"` | Warnings and errors |

## Trace analytics with data prepper

OpenSearch also supports distributed trace analytics via Data Prepper:

```yaml
otel-trace-pipeline:
  source:
    otel_trace_source:
      port: 21890
      ssl: false
  processor:
    - otel_traces:
  sink:
    - opensearch:
        hosts: ["http://opensearch:9200"]
        index_type: trace-analytics-raw
```

Configure Ballerina to send traces to Data Prepper's OpenTelemetry receiver. Add `import ballerinax/jaeger as _;` to the integration, set `observabilityIncluded = true` under `[build-options]` in `Ballerina.toml`, rebuild, and add the following to `Config.toml` (set `agentHostname` to the host where Data Prepper runs):

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "localhost"
agentPort = 21890
samplerType = "const"
samplerParam = 1.0
```

Spans are stored in the `otel-v1-apm-span-*` indices. Visualize traces in OpenSearch Dashboards under **Trace Analytics**.

## What's next

- [OpenSearch Log Analytics](../recipes/opensearch-log-analytics.md) — A full Docker Compose setup with Fluent Bit and OpenSearch Dashboards
- [Elastic Stack](elastic-stack-elk.md) -- Alternative with Elasticsearch
- [Logging overview](../logging.md) -- Configure Ballerina logging
- [Observability Overview](../observe.md) -- Full observability architecture
