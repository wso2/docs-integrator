---
title: Recipe - OpenSearch Log Analytics
---

# Recipe: OpenSearch Log Analytics

Complete log aggregation and analytics using OpenSearch (open-source Elasticsearch alternative) with Fluent Bit log shipper and OpenSearch Dashboards. A fully open-source alternative to the ELK Stack.

## Architecture

```bash
WSO2 Integrator
├── Logs (stdout) ──▶ Fluent Bit ──▶ OpenSearch ──▶ OpenSearch Dashboards
│                                       (indexing)        (UI)
│
└─ Metrics (9797) ──▶ Prometheus ──▶ Grafana (optional)
```

## Prerequisites

- Docker & Docker Compose
- 4GB RAM minimum (8GB recommended)
- 20GB disk space for OpenSearch data

## Docker Compose Setup

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  # OpenSearch (Log Storage & Search)
  opensearch:
    image: opensearchproject/opensearch:latest
    environment:
      - cluster.name=opensearch-cluster
      - discovery.type=single-node
      - DISABLE_SECURITY_PLUGIN=true
      - JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
      - "9600:9600"
    volumes:
      - opensearch-data:/usr/share/opensearch/data
    networks:
      - opensearch

  # OpenSearch Dashboards (Visualization)
  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:latest
    ports:
      - "5601:5601"
    environment:
      - OPENSEARCH_HOSTS=["http://opensearch:9200"]
      - DISABLE_SECURITY_DASHBOARDS_PLUGIN=true
    depends_on:
      - opensearch
    networks:
      - opensearch

  # Fluent Bit (Log Shipper)
  fluent-bit:
    image: fluent/fluent-bit:latest
    volumes:
      - ./fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf
      - ./parsers.conf:/fluent-bit/etc/parsers.conf
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      - opensearch
    networks:
      - opensearch

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
      - opensearch

  # Prometheus (Optional, for metrics)
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    networks:
      - opensearch

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
      - opensearch

volumes:
  opensearch-data:
  prometheus-data:
  grafana-data:
  integrator-logs:

networks:
  opensearch:
    driver: bridge
```

## Configuration Files

### Fluent Bit Configuration (`fluent-bit.conf`)

```ini
[SERVICE]
    Flush        1
    Log_Level    info
    Parsers_File parsers.conf

# Monitor local log files
[INPUT]
    Name         tail
    Path         /var/log/integrator/*.log
    Parser       json
    Tag          ballerina.*
    Refresh_Interval 5
    DB           /tmp/fluent-bit-state.db
    DB.Locking   true

# Monitor Docker logs
[INPUT]
    Name         docker
    Tag          docker.*
    Path         /var/lib/docker/containers
    Parser       docker
    Refresh_Interval 30

# Modify logs to add metadata
[FILTER]
    Name         modify
    Match        ballerina.*
    Add          service wso2-integrator
    Add          environment production
    Add          source log-file

[FILTER]
    Name         modify
    Match        docker.*
    Add          environment production

# Output to OpenSearch
[OUTPUT]
    Name         opensearch
    Match        *
    Host         opensearch
    Port         9200
    HTTP_User    admin
    HTTP_Passwd  admin
    Index        logs-${TAG}-%Y.%m.%d
    Type         _doc
    Suppress_Type_Name On
    Retry_Limit  3
    Trace_Output off
```

### Parsers Configuration (`parsers.conf`)

```ini
[PARSER]
    Name        json
    Format      json
    Time_Key    time
    Time_Format %Y-%m-%dT%H:%M:%S.%L%z
    Decode_Field_As escaped message

[PARSER]
    Name        docker
    Format      json
    Time_Key    time
    Time_Format %Y-%m-%dT%H:%M:%S.%L%z
    Decode_Field_As escaped log

[PARSER]
    Name        syslog
    Format      regex
    Regex       ^\<(?<pri>[0-9]+)\>(?<time>[^ ]* {1,2}[^ ]* [^ ]*) (?<host>[^ ]*) (?<ident>[a-zA-Z0-9_\/\.\-]*)(?:\[(?<pid>[0-9]+)\])?(?:[^\:]*\:)? *(?<message>.*)$
    Time_Key    time
    Time_Format %b %d %H:%M:%S
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
docker-compose logs -f fluent-bit
```

## Accessing the Services

- **OpenSearch Dashboards:** http://localhost:5601
- **OpenSearch API:** http://localhost:9200
- **Prometheus:** http://localhost:9090
- **Grafana:** http://localhost:3000

## Setting Up OpenSearch Dashboards

### Step 1: Create Index Pattern

1. Open OpenSearch Dashboards at http://localhost:5601
2. Go to **Stack Management** > **Index Patterns**
3. Click **Create Index Pattern**
4. Pattern name: `logs-ballerina.*`
5. Time field: `@timestamp`
6. Click **Create Index Pattern**

### Step 2: Create Visualizations

#### Log Volume Over Time

1. Go to **Visualize** > **Create**
2. Select **Area** visualization
3. Index: `logs-ballerina.*`
4. X-axis: **Date Histogram** on `@timestamp`
5. Y-axis: **Count**
6. Split series by: `level`
7. Save as "Log Volume by Level"

#### Error Count Table

1. Create **Table** visualization
2. Index: `logs-ballerina.*`
3. Bucket: **Terms** on `level.keyword`
4. Add filter: `level: ERROR`
5. Metric: **Count**
6. Save as "Recent Errors"

#### Service Breakdown

1. Create **Pie** visualization
2. Index: `logs-ballerina.*`
3. Bucket: **Terms** on `service.keyword`
4. Metric: **Count**
5. Save as "Logs by Service"

#### Log Message Breakdown

1. Create **Data Table** visualization
2. Index: `logs-ballerina.*`
3. Bucket: **Terms** on `message.keyword` (top 10)
4. Metric: **Count**
5. Save as "Top Log Messages"

### Step 3: Create Dashboard

1. Go to **Dashboards** > **Create**
2. Add all visualizations created above
3. Arrange panels
4. Save as "WSO2 Integrator Overview"

## Useful DQL (OpenSearch Query Language) Queries

| Query | Purpose |
|-------|---------|
| `level: "ERROR"` | Find all error logs |
| `service: "wso2-integrator" AND level: "ERROR"` | Errors from integrator |
| `level: ("ERROR" OR "WARN")` | Warnings and errors |
| `orderId.keyword: "ORD-12345"` | Trace specific order |
| `message: "Payment failed"` | Search error messages |
| `level: "ERROR" NOT message: "timeout"` | Errors excluding timeouts |
| `service: exists` | Logs with service field |
| `@timestamp: ["2024-01-01" TO "2024-01-31"]` | Date range |

## Advanced: Data Prepper for Trace Analytics

OpenSearch supports distributed trace analytics via Data Prepper:

```yaml
# docker-compose addition
data-prepper:
  image: opensearchproject/data-prepper:latest
  volumes:
    - ./data-prepper-config.yml:/etc/data-prepper/config.yaml
  ports:
    - "21890:21890"  # OTEL receiver
  depends_on:
    - opensearch
```

Configure Ballerina to send traces to Data Prepper:

```toml
[ballerinax.jaeger]
reporterEndpoint = "http://data-prepper:21890/api/traces"
```

## Performance Optimization

### OpenSearch Heap Configuration

```yaml
environment:
  - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"
```

### Index Lifecycle Management (ILM)

Configure automatic index rollover:

```bash
curl -X PUT "localhost:9200/_ilm/policy/logs-policy" -H 'Content-Type: application/json' -d'
{
  "policy": "logs-policy",
  "phases": {
    "hot": {
      "min_age": "0d",
      "actions": {
        "rollover": {
          "max_primary_shard_size": "50gb",
          "max_age": "1d"
        }
      }
    },
    "delete": {
      "min_age": "30d",
      "actions": {
        "delete": {}
      }
    }
  }
}
'
```

### Fluent Bit Buffer Configuration

```ini
[OUTPUT]
    Name         opensearch
    Buffer_Limit false
    Retry_Limit  3
```

## Troubleshooting

**No logs appearing:**
```bash
# Check Fluent Bit is running
docker-compose logs fluent-bit

# Check OpenSearch is receiving data
curl http://localhost:9200/_cat/indices?v

# Check log files exist
docker-compose exec fluent-bit ls -la /var/log/integrator/
```

**OpenSearch disk space issues:**
```bash
# Check disk usage
curl http://localhost:9200/_cat/allocation?v

# Delete old indices
curl -X DELETE "localhost:9200/logs-ballerina-*-2024.01.*"
```

**Query performance issues:**
```bash
# Check index stats
curl http://localhost:9200/_cat/shards?v

# Optimize index
curl -X POST "localhost:9200/logs-ballerina*/_forcemerge?max_num_segments=1"
```

## Backup & Restore

### Create Snapshot Repository

```bash
curl -X PUT "localhost:9200/_snapshot/my_backup" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "/mnt/backup"
  }
}
'
```

### Create Snapshot

```bash
curl -X PUT "localhost:9200/_snapshot/my_backup/snapshot_1?wait_for_completion=true"
```

### Restore Snapshot

```bash
curl -X POST "localhost:9200/_snapshot/my_backup/snapshot_1/_restore"
```

## Cleanup

```bash
# Stop all services
docker-compose down

# Remove all data
docker-compose down -v
```

## What's Next

- **[OpenSearch Integration Details](opensearch-integration.md)** – Advanced features
- **[ELK Stack](recipe-elk-stack.md)** – Elasticsearch-based alternative
- **[Logging Overview](logging-overview.md)** – Learn more about logging
- **[Kubernetes Production Stack](recipe-kubernetes-production.md)** – Scale to Kubernetes
