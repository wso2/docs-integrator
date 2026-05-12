---
title: Recipe - ELK Stack (Complete Log Analytics)
---

# Recipe: ELK Stack (Complete Log Analytics)

Complete log aggregation, full-text search, and visualization using the Elastic Stack. Perfect for organizations requiring advanced log analytics, compliance auditing, and long-term log retention.

## Architecture

```bash
WSO2 Integrator
├── Logs (stdout) ──▶ Filebeat ──▶ Logstash ──▶ Elasticsearch ──▶ Kibana
│                                   (optional)      (indexing)       (UI)
│
└─ Metrics (9797) ──▶ Prometheus ──▶ Grafana (optional, for metrics)
```

## Prerequisites

- Docker & Docker Compose
- 4GB RAM minimum (8GB recommended)
- 20GB disk space for Elasticsearch data

## Docker Compose Setup

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  # Elasticsearch (Log Storage & Search)
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - xpack.security.enrollment.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    networks:
      - elk

  # Kibana (Visualization)
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch
    networks:
      - elk

  # Logstash (Log Processing)
  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    environment:
      - xpack.monitoring.enabled=false
    depends_on:
      - elasticsearch
    networks:
      - elk

  # Filebeat (Log Shipper)
  filebeat:
    image: docker.elastic.co/beats/filebeat:8.11.0
    user: root
    command: filebeat -e -strict.perms=false
    volumes:
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      - logstash
    networks:
      - elk

  # WSO2 Integrator
  integrator:
    image: ballerina:latest
    ports:
      - "8090:9090"
      - "9797:9797"
    environment:
      - BALLERINA_OBSERVE_METRICS_ENABLED=true
      - BALLERINAX_PROMETHEUS_PORT=9797
      - BALLERINA_LOG_LEVEL=INFO
    volumes:
      - ./integrations:/app
      - integrator-logs:/var/log/integrator
    networks:
      - elk

  # Prometheus (Optional, for metrics)
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    networks:
      - elk

  # Grafana (Optional, for metrics visualization)
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana-datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
    depends_on:
      - prometheus
    networks:
      - elk

volumes:
  elasticsearch-data:
  prometheus-data:
  grafana-data:
  integrator-logs:

networks:
  elk:
    driver: bridge
```

## Configuration Files

### Filebeat Configuration (`filebeat.yml`)

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/integrator/*.log
      - /var/lib/docker/containers/*/*.log
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      service: wso2-integrator
      environment: production

processors:
  - add_kubernetes_metadata:
      in_cluster: true

output.logstash:
  hosts: ["logstash:5044"]

logging.level: info
```

### Logstash Configuration (`logstash.conf`)

```ruby
input {
  beats {
    port => 5044
  }
}

filter {
  if [type] == "json" {
    json {
      source => "message"
    }
  }

  # Parse timestamp
  if [time] {
    date {
      match => ["time", "ISO8601"]
      target => "@timestamp"
    }
  }

  # Add service metadata
  mutate {
    add_field => {
      "log_source" => "ballerina-integration"
      "processing_timestamp" => "%{@timestamp}"
    }

    # Remove empty fields
    remove_field => ["beat.name", "beat.timezone", "input.type"]
  }

  # Extract orderId if present
  if [orderId] {
    mutate {
      add_field => { "trace_id" => "%{orderId}" }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "ballerina-integrations-%{+yyyy.MM.dd}"
    document_type => "_doc"
  }

  # Optional: Forward to stdout for debugging
  # stdout {
  #   codec => rubydebug
  # }
}
```

### Prometheus Configuration (`prometheus.yml`)

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "wso2-integrator"
    static_configs:
      - targets: ["integrator:9797"]
```

### Grafana Datasources (`grafana-datasources.yml`)

```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
```

## Running the Stack

```bash
# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f
```

## Accessing the Services

- **Kibana:** http://localhost:5601
- **Elasticsearch:** http://localhost:9200
- **Grafana (metrics):** http://localhost:3000
- **Prometheus:** http://localhost:9090

## Setting Up Kibana Index Pattern

1. Open Kibana at http://localhost:5601
2. Go to **Stack Management** > **Index Patterns**
3. Click **Create Index Pattern**
4. Pattern name: `ballerina-integrations-*`
5. Time field: `@timestamp`
6. Click **Create Index Pattern**

## Creating Kibana Visualizations

### 1. Log Volume Over Time

1. Go to **Visualize** > **Create Visualization**
2. Select **Area** chart type
3. Elasticsearch index: `ballerina-integrations-*`
4. X-axis: **Date Histogram** on `@timestamp`
5. Y-axis: **Count**
6. Add filter: `level: "ERROR"` (optional)

### 2. Error Rate Table

1. Create **Data Table** visualization
2. Elasticsearch index: `ballerina-integrations-*`
3. Bucket aggregation: **Terms** on `level.keyword`
4. Metric: **Count**
5. Filter: `level: "ERROR"`

### 3. Service Breakdown Pie Chart

1. Create **Pie** visualization
2. Elasticsearch index: `ballerina-integrations-*`
3. Bucket: **Terms** on `module.keyword`
4. Metric: **Count**

### 4. Custom Kibana Dashboard

1. Go to **Dashboards** > **Create Dashboard**
2. Add your visualizations
3. Search by orderId: `orderId: "ORD-12345"`
4. Search by log level: `level: "ERROR" OR level: "WARN"`
5. Search by service: `module: "myorg/order_service"`

## Useful KQL Queries

| Query | Purpose |
|-------|---------|
| `level: "ERROR"` | Find all error logs |
| `service: "wso2-integrator" AND orderId: "ORD-123"` | Trace a specific order |
| `level: "ERROR" AND NOT message: "timeout"` | Errors excluding timeouts |
| `message: "Payment failed"` | Search error messages |
| `orderId: exists` | Logs with orderId field |
| `level: "WARN" OR level: "ERROR"` | Warnings and errors |

## Advanced: Logstash Parsing Examples

### Extract Order Information

```ruby
filter {
  if [message] =~ /Order received/ {
    grok {
      match => {
        "message" => "Order received.*orderId=%{DATA:orderId}.*customerId=%{DATA:customerId}"
      }
    }
  }
}
```

### Extract API Response Times

```ruby
filter {
  if [message] =~ /response_time/ {
    grok {
      match => {
        "message" => "API call.*response_time=%{NUMBER:response_time:float}ms"
      }
    }
    mutate {
      convert => { "response_time" => "float" }
    }
  }
}
```

## Performance Tuning

### Elasticsearch JVM Heap

```bash
# Edit docker-compose.yml
environment:
  - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
```

### Index Retention Policy

```bash
# Delete old indices (via Elasticsearch API)
curl -X DELETE "localhost:9200/ballerina-integrations-2024.01.*"
```

### Logstash Pipeline Config

```ruby
# Optimize batch settings
output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    bulk_size => 500
    idle_flush_time => 1
  }
}
```

## Troubleshooting

**No logs appearing in Kibana:**
```bash
# Check Filebeat is running
docker-compose logs filebeat

# Check Logstash is receiving beats
docker-compose logs logstash | grep "beats"

# Check Elasticsearch has data
curl http://localhost:9200/_cat/indices
```

**Index pattern not found:**
```bash
# Verify index exists
curl http://localhost:9200/_cat/indices?v

# Wait for data to arrive (can take 30 seconds)
docker-compose logs integrator | tail -20
```

**High disk usage:**
- Reduce log retention: `index => "ballerina-integrations-%{+yyyy.MM}"`
- Delete old indices regularly
- Increase Elasticsearch volume size

## Cleanup

```bash
# Stop all services
docker-compose down

# Remove all data
docker-compose down -v
```

## What's Next

- **[Elastic Stack (ELK) Details](elastic-stack-elk.md)** – Advanced configuration and deployment
- **[OpenSearch Setup](recipe-opensearch-setup.md)** – Open-source alternative
- **[Logging Overview](logging-overview.md)** – Learn more about logging
- **[Metrics Overview](metrics-overview.md)** – Add metrics collection
