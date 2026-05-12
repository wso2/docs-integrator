---
title: Recipe - Local Development Stack
---

# Recipe: Local Development Stack

A complete observability setup for development using Docker Compose. Includes metrics collection (Prometheus), visualization (Grafana), distributed tracing (Jaeger), and log aggregation (Loki).

## Architecture

```bash
WSO2 Integrator
├── Metrics (9797) ──▶ Prometheus
│                          ▲
│                          │
└─ Logs (stdout) ──▶ Promtail ──▶ Loki
│
└─ Traces (6831) ──▶ Jaeger (all-in-one)
                          ▲
                          │
                    Jaeger UI (16686)

Grafana (3000) ◀── Prometheus, Loki
```

## Docker Compose Setup

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  # WSO2 Integrator
  integrator:
    image: ballerina:latest
    ports:
      - "8090:9090"  # API
      - "9797:9797"  # Metrics
    environment:
      - BALLERINA_OBSERVE_METRICS_ENABLED=true
      - BALLERINAX_PROMETHEUS_PORT=9797
      - BALLERINA_OBSERVE_TRACING_ENABLED=true
      - BALLERINAX_JAEGER_AGENT_HOSTNAME=jaeger
      - BALLERINAX_JAEGER_AGENT_PORT=6831
    volumes:
      - ./integrations:/app
    depends_on:
      - prometheus
      - jaeger
      - loki
    networks:
      - observability

  # Prometheus (Metrics)
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
    networks:
      - observability

  # Grafana (Visualization)
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana-datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
      - ./grafana-dashboards.yml:/etc/grafana/provisioning/dashboards/dashboards.yml
    depends_on:
      - prometheus
      - loki
    networks:
      - observability

  # Jaeger (Distributed Tracing)
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "6831:6831/udp"   # Jaeger agent
      - "14268:14268"     # Jaeger collector
      - "16686:16686"     # Jaeger UI
    environment:
      - COLLECTOR_ZIPKIN_HOST_PORT=:9411
    networks:
      - observability

  # Loki (Log Aggregation)
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml
      - loki-data:/tmp/loki
    command: -config.file=/etc/loki/local-config.yaml
    networks:
      - observability

  # Promtail (Log Shipper)
  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml
    depends_on:
      - loki
    networks:
      - observability

volumes:
  prometheus-data:
  grafana-data:
  loki-data:

networks:
  observability:
    driver: bridge
```

## Configuration Files

### Prometheus Configuration (`prometheus.yml`)

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

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

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
```

### Loki Configuration (`loki-config.yml`)

```yaml
auth_enabled: false

ingester:
  chunk_idle_period: 3m
  chunk_retain_period: 1m
  max_chunk_age: 1h
  chunk_encoding: json

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

schema_config:
  configs:
    - from: 2021-06-01
      store: boltdb-shipper
      object_store: filesystem
      schema:
        version: v11
        index:
          prefix: index_
          period: 24h

server:
  http_listen_port: 3100
  log_level: info

storage_config:
  boltdb_shipper:
    active_index_directory: /tmp/loki/boltdb-shipper-active
    cache_location: /tmp/loki/boltdb-shipper-cache
    shared_store: filesystem
  filesystem:
    directory: /tmp/loki/chunks

chunk_store_config:
  max_look_back_period: 0s
```

### Promtail Configuration (`promtail-config.yml`)

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: integrator
          __path__: /var/log/*log
```

## Ballerina Integration Configuration

Create `Config.toml` in your integration:

```toml
[ballerina.observe]
metricsEnabled = true
metricsReporter = "prometheus"
tracingEnabled = true
tracingProvider = "jaeger"

[ballerinax.prometheus]
port = 9797
host = "0.0.0.0"

[ballerinax.jaeger]
agentHostname = "jaeger"
agentPort = 6831
samplerType = "const"
samplerParam = 1.0

[ballerina.log]
level = "INFO"
```

## Running the Stack

1. **Create directory structure:**
   ```bash
   mkdir observability-stack
   cd observability-stack
   # Copy all configuration files here
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Verify services are running:**
   ```bash
   docker-compose ps
   ```

## Accessing the Services

- **Grafana Dashboard:** http://localhost:3000 (username: admin, password: admin)
- **Prometheus:** http://localhost:9090
- **Jaeger UI:** http://localhost:16686
- **Loki UI:** http://localhost:3100

## Creating Dashboards

### Grafana Dashboard for Metrics

1. Open Grafana (http://localhost:3000)
2. Click **+** → **Dashboard** → **Create Dashboard**
3. Add panels with these PromQL queries:

**Request Rate:**
```promql
rate(http_requests_total[5m])
```

**Error Rate:**
```promql
rate(http_response_status_total{status_code=~"5.."}[5m]) / rate(http_requests_total[5m])
```

**P95 Latency:**
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### Grafana Dashboard for Logs

1. Create a new panel in Grafana
2. Select **Loki** as datasource
3. Use these LogQL queries:

**All logs:**
```
{job="integrator"}
```

**Error logs:**
```
{job="integrator"} |= "ERROR"
```

**By level:**
```
{job="integrator"} | json | level="ERROR"
```

## Troubleshooting

**Metrics not appearing in Prometheus:**
- Check that integrator is running: `docker-compose logs integrator`
- Verify metrics endpoint: `curl http://localhost:9797/metrics`
- Check Prometheus targets: http://localhost:9090/targets

**No traces in Jaeger:**
- Verify Jaeger is running: `docker-compose logs jaeger`
- Check that integrator is sending traces to `jaeger:6831`

**No logs in Loki:**
- Check Promtail is running: `docker-compose logs promtail`
- Verify log file paths in `promtail-config.yml`
- Check Loki is receiving data: `docker-compose logs loki`

## Cleaning Up

```bash
# Stop all services
docker-compose down

# Remove all data volumes
docker-compose down -v
```

## What's Next

- **[Kubernetes Production Stack](recipe-kubernetes-production.md)** – Scale to Kubernetes
- **[ELK Stack](recipe-elk-stack.md)** – Advanced log aggregation
- **[Metrics Overview](metrics-overview.md)** – Learn more about metrics
- **[Distributed Tracing Overview](distributed-tracing-overview.md)** – Learn more about tracing
