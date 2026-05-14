---
title: OpenSearch Integration
---

# OpenSearch Integration

OpenSearch is an open-source search and analytics suite derived from Elasticsearch. It provides log aggregation, full-text search, and visualization through OpenSearch Dashboards. WSO2 Integrator logs can be shipped to OpenSearch using Fluent Bit, Data Prepper, or Filebeat.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| OpenSearch | Version 2.x or later |
| OpenSearch Dashboards | Version 2.x |
| Log Shipper | Fluent Bit, Data Prepper, or Filebeat |

## Step 1 -- deploy OpenSearch

### Docker compose

```yaml
version: "3.8"
services:
  opensearch:
    image: opensearchproject/opensearch:latest
    environment:
      - discovery.type=single-node
      - DISABLE_SECURITY_PLUGIN=true
    ports:
      - "9200:9200"
    volumes:
      - opensearch-data:/usr/share/opensearch/data

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:latest
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

### Using fluent bit (Recommended)

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
    Index        ballerina-integrations
    Type         _doc
    Suppress_Type_Name On
```

### Using data prepper

Data Prepper is OpenSearch's native data collection tool:

```yaml
# data-prepper-config.yaml
source:
  file:
    path: /var/log/integrations/
    include_file_name: true

processor:
  - grok:
      match:
        log:
          - "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:message}"

sink:
  - opensearch:
      hosts: ["http://opensearch:9200"]
      index: "ballerina-integrations"
```

### Using filebeat with OpenSearch output

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/integrations/*.log
    json.keys_under_root: true

output.elasticsearch:
  hosts: ["http://opensearch:9200"]
  index: "ballerina-integrations-%{+yyyy.MM.dd}"
  protocol: "http"
```

## Step 3 -- create an index pattern

1. Open OpenSearch Dashboards at `http://localhost:5601`.
2. Navigate to **Stack Management** > **Index Patterns**.
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
source:
  otel_trace_source:
    port: 21890

sink:
  - opensearch:
      hosts: ["http://opensearch:9200"]
      index_type: trace-analytics-raw
```

Configure Ballerina to send traces to Data Prepper's OpenTelemetry receiver, then visualize traces in OpenSearch Dashboards under **Trace Analytics**.

## What's next

- [Elastic Stack](elastic-stack-elk.md) -- Alternative with Elasticsearch
- [Logging overview](logging-overview.md) -- Configure Ballerina logging
- [Observability Overview](observability-overview.md) -- Full observability architecture
