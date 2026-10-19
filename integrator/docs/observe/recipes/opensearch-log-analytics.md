---
title: OpenSearch Log Analytics
---

# OpenSearch Log Analytics

Complete log aggregation and analytics using OpenSearch (open-source Elasticsearch alternative) with Fluent Bit log shipper and OpenSearch Dashboards. A fully open-source alternative to the ELK Stack.

## Architecture

```bash
WSO2 Integrator
├── Logs (file) ───▶ Fluent Bit ──▶ OpenSearch ──▶ OpenSearch Dashboards
│                                       (indexing)        (UI)
│
└─ Metrics (9797) ──▶ Prometheus ──▶ Grafana (optional)
```

## Prerequisites

- Docker & Docker Compose
- Ballerina (to build the integration as an executable JAR)
- 4GB RAM minimum (8GB recommended)
- 20GB disk space for OpenSearch data

## Prepare the integration

The `integrator` service runs your integration's executable JAR from the `./integrations` directory.

1. Add the Prometheus extension import to your integration (for example, in `main.bal`):

   ```ballerina
   import ballerinax/prometheus as _;
   ```

2. Enable observability in `Ballerina.toml`:

   ```toml
   [build-options]
   observabilityIncluded = true
   ```

3. Build the integration and copy the JAR into `./integrations`:

   ```bash
   bal build
   mkdir -p integrations
   cp target/bin/<integration-name>.jar integrations/
   ```

4. Create `integrations/Config.toml` to enable metrics and write JSON logs to the shared log volume:

   ```toml
   [ballerina.observe]
   metricsEnabled = true
   metricsReporter = "prometheus"

   [ballerinax.prometheus]
   port = 9797
   host = "0.0.0.0"

   [ballerina.log]
   level = "INFO"
   format = "json"

   [[ballerina.log.destinations]]
   path = "/var/log/integrator/app.log"
   ```

## Docker Compose Setup

Create `docker-compose.yml`:

```yaml
services:
  # OpenSearch (Log Storage & Search)
  opensearch:
    image: opensearchproject/opensearch:3.5.0
    environment:
      - cluster.name=opensearch-cluster
      - discovery.type=single-node
      - DISABLE_SECURITY_PLUGIN=true
      - OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
      - "9600:9600"
    volumes:
      - opensearch-data:/usr/share/opensearch/data
    networks:
      - opensearch

  # OpenSearch Dashboards (Visualization)
  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:3.5.0
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
    image: fluent/fluent-bit:4.2.2
    volumes:
      - ./fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf
      - ./parsers.conf:/fluent-bit/etc/parsers.conf
      - integrator-logs:/var/log/integrator:ro
    depends_on:
      - opensearch
    networks:
      - opensearch

  # WSO2 Integrator
  integrator:
    image: eclipse-temurin:21-jre
    # Replace <integration-name> with the name of your JAR
    command: ["java", "-jar", "/app/<integration-name>.jar"]
    ports:
      - "8090:9090"
      - "9797:9797"
    environment:
      - BAL_CONFIG_FILES=/app/Config.toml
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

# Modify logs to add metadata
[FILTER]
    Name         modify
    Match        ballerina.*
    Add          service wso2-integrator
    Add          environment production
    Add          source log-file

# Output to OpenSearch
[OUTPUT]
    Name         opensearch
    Match        *
    Host         opensearch
    Port         9200
    HTTP_User    admin
    HTTP_Passwd  admin
    Logstash_Format On
    Logstash_Prefix logs-ballerina
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
2. Go to **Dashboards Management** > **Index patterns**
3. Click **Create index pattern**
4. Pattern name: `logs-ballerina-*`
5. Time field: `@timestamp`
6. Click **Create index pattern**

### Step 2: Create Visualizations

#### Log Volume Over Time

1. Go to **Visualize** > **Create**
2. Select **Area** visualization
3. Index: `logs-ballerina-*`
4. X-axis: **Date Histogram** on `@timestamp`
5. Y-axis: **Count**
6. Split series by: **Terms** on `level.keyword`
7. Save as "Log Volume by Level"

#### Error Count Table

1. Create **Data Table** visualization
2. Index: `logs-ballerina-*`
3. Bucket: **Terms** on `level.keyword`
4. Add filter: `level: ERROR`
5. Metric: **Count**
6. Save as "Recent Errors"

#### Service Breakdown

1. Create **Pie** visualization
2. Index: `logs-ballerina-*`
3. Bucket: **Terms** on `service.keyword`
4. Metric: **Count**
5. Save as "Logs by Service"

#### Log Message Breakdown

1. Create **Data Table** visualization
2. Index: `logs-ballerina-*`
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
| `level: "ERROR" AND NOT message: "timeout"` | Errors excluding timeouts |
| `service:*` | Logs with service field |
| `@timestamp >= "2024-01-01" AND @timestamp <= "2024-01-31"` | Date range |

## Advanced: Data Prepper for Trace Analytics

OpenSearch supports distributed trace analytics via Data Prepper:

```yaml
# docker-compose addition
data-prepper:
  image: opensearchproject/data-prepper:2.16.0
  volumes:
    - ./pipelines.yaml:/usr/share/data-prepper/pipelines/pipelines.yaml
  ports:
    - "21890:21890"  # OTEL receiver
  depends_on:
    - opensearch
  networks:
    - opensearch
```

Create `pipelines.yaml`:

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

Configure Ballerina to send traces to Data Prepper. Add `import ballerinax/jaeger as _;` to the integration, rebuild it, and update `integrations/Config.toml`:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.jaeger]
agentHostname = "data-prepper"
agentPort = 21890
samplerType = "const"
samplerParam = 1.0
```

Spans are stored in the `otel-v1-apm-span-*` indices.

## Performance Optimization

### OpenSearch Heap Configuration

```yaml
environment:
  - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"
```

### Index state management (ISM)

Fluent Bit already writes one index per day. Configure automatic deletion of indices older than 30 days:

```bash
curl -X PUT "localhost:9200/_plugins/_ism/policies/logs-policy" -H 'Content-Type: application/json' -d'
{
  "policy": {
    "description": "Delete WSO2 Integrator log indices after 30 days",
    "default_state": "hot",
    "states": [
      {
        "name": "hot",
        "actions": [],
        "transitions": [
          { "state_name": "delete", "conditions": { "min_index_age": "30d" } }
        ]
      },
      {
        "name": "delete",
        "actions": [ { "delete": {} } ],
        "transitions": []
      }
    ],
    "ism_template": {
      "index_patterns": ["logs-ballerina-*"],
      "priority": 100
    }
  }
}
'
```

The policy applies to `logs-ballerina-*` indices created after it is added.

### Fluent Bit Buffer Configuration

```ini
[OUTPUT]
    Name         opensearch
    Buffer_Size  False
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
docker-compose exec integrator ls -la /var/log/integrator/
```

**OpenSearch disk space issues:**
```bash
# Check disk usage
curl http://localhost:9200/_cat/allocation?v

# Delete old indices
curl -X DELETE "localhost:9200/logs-ballerina-2024.01.*"
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

OpenSearch only accepts file system repositories under a path listed in `path.repo`. Add it to the `opensearch` service environment and recreate the container with `docker-compose up -d opensearch`:

```yaml
      - path.repo=/usr/share/opensearch/data/snapshots
```

This path is inside the `opensearch-data` volume, so copy the snapshots elsewhere if you need off-host backups.

```bash
curl -X PUT "localhost:9200/_snapshot/my_backup" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "/usr/share/opensearch/data/snapshots"
  }
}
'
```

### Create Snapshot

```bash
curl -X PUT "localhost:9200/_snapshot/my_backup/snapshot_1?wait_for_completion=true"
```

### Restore Snapshot

An index can't be restored while an open index with the same name exists, so delete (or close) the log indices first and restore only those:

```bash
curl -X DELETE "localhost:9200/logs-ballerina-*"

curl -X POST "localhost:9200/_snapshot/my_backup/snapshot_1/_restore" -H 'Content-Type: application/json' -d'
{
  "indices": "logs-ballerina-*"
}
'
```

## Cleanup

```bash
# Stop all services
docker-compose down

# Remove all data
docker-compose down -v
```

## What's Next

- [OpenSearch](../open-source/opensearch.md) — The focused integration guide for this platform
- **[OpenSearch Integration Details](../open-source/opensearch.md)** – Advanced features
- **[ELK Stack](elk-stack.md)** – Elasticsearch-based alternative
- **[Logging Overview](../logging.md)** – Learn more about logging
- **[Kubernetes Production Stack](kubernetes-production-stack.md)** – Scale to Kubernetes
