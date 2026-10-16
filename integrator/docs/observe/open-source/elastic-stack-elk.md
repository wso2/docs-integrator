---
title: Elastic Stack (ELK)
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

## Step 1 -- configure Ballerina logging

Enable structured JSON logging to a file in `Config.toml`:

```toml
[ballerina.log]
level = "INFO"
format = "json"

[[ballerina.log.destinations]]
type = "file"
path = "/var/log/integrations/app.log"
```

Emit structured log entries in your code:

```ballerina
import ballerina/http;
import ballerina/log;

service /api on new http:Listener(9090) {
    resource function post orders(http:Request req) returns json|error {
        json payload = check req.getJsonPayload();
        string orderId = check payload.orderId;

        log:printInfo("Order received",
            orderId = orderId,
            channel = "api",
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

function processOrder(json payload) returns json|error {
    return {status: "created"};
}
```

## Step 2 -- install and configure filebeat

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

setup.template.name: "ballerina-integrations"
setup.template.pattern: "ballerina-integrations-*"

setup.kibana:
  host: "http://kibana:5601"
```

Start Filebeat:

```bash
./filebeat -e
```

## Step 3 -- configure Logstash (Optional)

For advanced log processing, use Logstash between Filebeat and Elasticsearch. Save this pipeline as `logstash.conf`:

```ruby
input {
  beats {
    port => 5044
  }
}

filter {
  date {
    match => ["time", "ISO8601"]
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
    action => "create"
  }
}
```

Then replace the `output.elasticsearch` section of `filebeat.yml` with:

```yaml
output.logstash:
  hosts: ["logstash:5044"]
```

When you use the Docker Compose setup below, add a Logstash service to it:

```yaml
  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch
```

## Step 4 -- create Kibana dashboards

### Data view

1. Open Kibana and navigate to **Stack Management** > **Data Views**.
2. Create a data view with the index pattern `ballerina-integrations-*`.
3. Select `@timestamp` as the timestamp field.

### Useful visualizations

| Visualization | Type | Description |
|---------------|------|-------------|
| Log Volume | Area chart | Log entries over time by level |
| Error Logs | Data table | Recent ERROR-level log entries |
| Service Map | Pie chart | Log distribution by service |
| Response Times | Line chart | Average response duration over time |

### Sample KQL queries

| Query | Purpose |
|-------|---------|
| `level: "ERROR"` | Find all error logs |
| `fields.service: "order-service" AND orderId: "ORD-123"` | Trace a specific order |
| `level: "ERROR" AND NOT message: "timeout"` | Errors excluding timeouts |

## Docker compose setup

```yaml
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
    command: filebeat -e -strict.perms=false
    volumes:
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /var/log/integrations:/var/log/integrations:ro
    depends_on:
      - elasticsearch

volumes:
  es-data:
```

## What's next

- [ELK Stack: Complete Log Analytics](../recipes/elk-stack.md) — A full Docker Compose setup with dashboards, queries, and tuning
- [OpenSearch](opensearch.md) -- Alternative open-source search and analytics
- [Logging overview](../logging.md) -- Configure Ballerina logging
- [Observability Overview](../observe.md) -- Full observability architecture
