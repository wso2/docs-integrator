---
sidebar_position: 13
title: Elastic Stack (ELK)
description: Integrate Ballerina integrations with Elasticsearch, Logstash, and Kibana for log aggregation and analysis.
---

# Elastic Stack (ELK)

The Elastic Stack (Elasticsearch, Logstash, Kibana) provides powerful log aggregation, search, and visualization for your Ballerina integrations. Use it to centralize logs, analyze request patterns, and create operational dashboards.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Elasticsearch | Version 8.x or later |
| Logstash | Version 8.x (optional, Filebeat can replace it) |
| Kibana | Version 8.x |
| Filebeat | Version 8.x (recommended for log shipping) |

## Architecture

```
Ballerina Integration ──▶ Log Files ──▶ Filebeat ──▶ Elasticsearch ──▶ Kibana
                                                  ▲
                         (optional) ──▶ Logstash ─┘
```

## Step 1 -- Configure Ballerina Logging

Enable structured JSON logging in `Config.toml`:

```toml
[ballerina.log]
level = "INFO"
```

Emit structured log entries in your code:

```ballerina
import ballerina/log;

service /api on new http:Listener(9090) {
    resource function post orders(http:Request req) returns json|error {
        json payload = check req.getJsonPayload();
        string orderId = check payload.orderId;

        log:printInfo("Order received",
            orderId = orderId,
            source = "api",
            action = "create"
        );

        // Process order...
        json result = check processOrder(payload);

        log:printInfo("Order processed",
            orderId = orderId,
            status = "success"
        );

        return result;
    }
}
```

## Step 2 -- Install and Configure Filebeat

Install Filebeat to ship logs to Elasticsearch:

```bash
# Install Filebeat
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.11.0-linux-x86_64.tar.gz
tar xzvf filebeat-8.11.0-linux-x86_64.tar.gz
```

Configure `filebeat.yml`:

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/integrations/*.log
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      service: order-service
      environment: production

output.elasticsearch:
  hosts: ["http://elasticsearch:9200"]
  index: "ballerina-integrations-%{+yyyy.MM.dd}"

setup.kibana:
  host: "http://kibana:5601"
```

Start Filebeat:

```bash
./filebeat -e
```

## Step 3 -- Configure Logstash (Optional)

For advanced log processing, use Logstash between Filebeat and Elasticsearch:

```ruby
input {
  beats {
    port => 5044
  }
}

filter {
  json {
    source => "message"
  }
  date {
    match => ["timestamp", "ISO8601"]
    target => "@timestamp"
  }
  mutate {
    add_field => { "pipeline" => "ballerina-integration" }
  }
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "ballerina-integrations-%{+yyyy.MM.dd}"
  }
}
```

## Step 4 -- Create Kibana Dashboards

### Index Pattern

1. Open Kibana and navigate to **Stack Management** > **Index Patterns**.
2. Create a pattern: `ballerina-integrations-*`.
3. Select `@timestamp` as the time field.

### Useful Visualizations

| Visualization | Type | Description |
|---------------|------|-------------|
| Log Volume | Area chart | Log entries over time by level |
| Error Logs | Data table | Recent ERROR-level log entries |
| Service Map | Pie chart | Log distribution by service |
| Response Times | Line chart | Average response duration over time |

### Sample KQL Queries

| Query | Purpose |
|-------|---------|
| `level: "ERROR"` | Find all error logs |
| `service: "order-service" AND orderId: "ORD-123"` | Trace a specific order |
| `level: "ERROR" AND NOT message: "timeout"` | Errors excluding timeouts |

## Docker Compose Setup

```yaml
version: "3.8"
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - es-data:/usr/share/elasticsearch/data

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

  filebeat:
    image: docker.elastic.co/beats/filebeat:8.11.0
    volumes:
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /var/log/integrations:/var/log/integrations:ro
    depends_on:
      - elasticsearch

volumes:
  es-data:
```

## What's Next

- [OpenSearch](opensearch.md) -- Alternative open-source search and analytics
- [Logging & Structured Logs](logging.md) -- Configure Ballerina logging
- [Observability Overview](index.md) -- Full observability architecture
