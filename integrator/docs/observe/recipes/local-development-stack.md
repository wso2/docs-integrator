---
title: Local Development Stack
---

# Local Development Stack

A complete observability setup for development using Docker Compose. Includes metrics collection (Prometheus), visualization (Grafana), distributed tracing (Jaeger), and log aggregation (Loki).

## Architecture

```bash
WSO2 Integrator
├── Metrics (9797) ──▶ Prometheus
│                          ▲
│                          │
└─ Logs (stderr) ──▶ Promtail ──▶ Loki
│
└─ Traces (4317) ──▶ Jaeger (all-in-one)
                          ▲
                          │
                    Jaeger UI (16686)

Grafana (3000) ◀── Prometheus, Loki
```

## Docker Compose Setup

Create `docker-compose.yml`. The `integrator` service runs the executable JAR built from your integration project (placed in an `integration` directory next to this file) and reads its `Config.toml` from that directory:

```yaml
services:
  # WSO2 Integrator
  integrator:
    image: eclipse-temurin:21-jre
    working_dir: /app
    command: sh -c "java -jar target/bin/*.jar"
    ports:
      - "8090:9090"  # API
      - "9797:9797"  # Metrics
    volumes:
      - ./integration:/app
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
    depends_on:
      - prometheus
      - loki
    networks:
      - observability

  # Jaeger (Distributed Tracing)
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "4317:4317"     # OTLP gRPC receiver
      - "16686:16686"   # Jaeger UI
    networks:
      - observability

  # Loki (Log Aggregation)
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml
      - loki-data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    networks:
      - observability

  # Promtail (Log Shipper)
  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
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

server:
  http_listen_port: 3100
  log_level: info

common:
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-01-01
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

limits_config:
  reject_old_samples: true
  reject_old_samples_max_age: 168h
```

### Promtail Configuration (`promtail-config.yml`)

Promtail discovers the `integrator` container through the Docker socket and reads its output:

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: integrator
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
        filters:
          - name: label
            values: ["com.docker.compose.service=integrator"]
    relabel_configs:
      - target_label: job
        replacement: integrator
```

## Ballerina Integration Configuration

Enable observability in the integration's `Ballerina.toml`:

```toml
[build-options]
observabilityIncluded = true
```

Import the Prometheus and Jaeger extensions in one of the integration's `.bal` files:

```ballerina
import ballerinax/prometheus as _;
import ballerinax/jaeger as _;
```

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
agentPort = 4317
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
   # Copy all configuration files here, and your integration project into an `integration` directory
   ```

2. **Build the integration:**
   ```bash
   cd integration
   bal build
   cd ..
   ```

3. **Start all services:**
   ```bash
   docker compose up -d
   ```

4. **Verify services are running:**
   ```bash
   docker compose ps
   ```

## Accessing the Services

- **Grafana Dashboard:** http://localhost:3000 (username: admin, password: admin)
- **Prometheus:** http://localhost:9090
- **Jaeger UI:** http://localhost:16686

## Creating Dashboards

### Grafana Dashboard for Metrics

1. Open Grafana (http://localhost:3000)
2. Click **+** → **New dashboard**
3. Add panels with these PromQL queries:

**Request Rate:**
```promql
sum(rate(requests_total_value[5m]))
```

**Error Rate:**
```promql
sum(rate(requests_total_value{http_status_code_group="5xx"}[5m])) / sum(rate(requests_total_value[5m]))
```

**P95 Latency:**
```promql
response_time_seconds{quantile="0.95", timeWindow="300000"}
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
{job="integrator"} | logfmt | level="ERROR"
```

## Troubleshooting

**Metrics not appearing in Prometheus:**
- Check that integrator is running: `docker compose logs integrator`
- Verify metrics endpoint: `curl http://localhost:9797/metrics`
- Check Prometheus targets: http://localhost:9090/targets

**No traces in Jaeger:**
- Verify Jaeger is running: `docker compose logs jaeger`
- Check that integrator is sending traces to `jaeger:4317`

**No logs in Loki:**
- Check Promtail is running: `docker compose logs promtail`
- Verify that Promtail can read the Docker socket (`/var/run/docker.sock`)
- Check Loki is receiving data: `docker compose logs loki`

## Cleaning Up

```bash
# Stop all services
docker compose down

# Remove all data volumes
docker compose down -v
```

## What's Next

- **[Kubernetes Production Stack](kubernetes-production-stack.md)** – Scale to Kubernetes
- **[ELK Stack](elk-stack.md)** – Advanced log aggregation
- **[Metrics Overview](../metrics.md)** – Learn more about metrics
- **[Jaeger distributed tracing](../open-source/jaeger.md)** – Learn more about tracing
