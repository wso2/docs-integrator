---
title: Observability Setup
---

# Observability Setup

ICP provides centralized observability for BI runtimes. Logs and metrics are collected via Fluent Bit, stored in OpenSearch, and displayed in the ICP Console.

For MI runtimes, see [MI Observability Setup](mi-profile/observability-setup-mi.md).

## Architecture

```mermaid
flowchart LR
    BI["BI Runtime"] -- "app.log" --> FB["Fluent Bit"]
    BI -- "metrics.log" --> FB
    FB -- "HTTP" --> OS["OpenSearch"]
    BI -- "heartbeat" --> ICP["ICP Server"]
    OS -- "query" --> ICP
    Console["ICP Console\n(Browser)"] -- "GraphQL / REST" --> ICP
```

1. The BI runtime writes structured logs to two separate files: application logs and metrics logs.
2. Fluent Bit tails both files and ships each to its own OpenSearch index.
3. ICP Server queries OpenSearch when a user opens the Logs or Metrics page in the Console.

## Prerequisites

| Component | Prerequisite |
|-----------|-------------|
| ICP Server | Running, with OpenSearch connection configured in `deployment.toml` (see [Install ICP — OpenSearch](install-icp.md#opensearch-observability)) |
| Integration | Connected to ICP with heartbeats working (see [Connect an Integration to ICP](connect-runtime.md)) |
| OpenSearch | Deployed and reachable from ICP Server and Fluent Bit |
| Fluent Bit | Installed on the machine running the BI runtime |

## Step 1: Deploy OpenSearch

Any single-node or clustered OpenSearch deployment works. ICP needs HTTP(S) access to the OpenSearch REST API.

Note the host, port, and credentials — you will configure them in Fluent Bit (and in ICP Server's `deployment.toml` if not already done).

### Evaluation setup

For a quick single-node setup, download and extract the [OpenSearch distribution](https://opensearch.org/downloads.html). Run the **demo security configuration** installer that ships with OpenSearch:

```bash
# Set a strong admin password (required since OpenSearch 2.12)
export OPENSEARCH_INITIAL_ADMIN_PASSWORD="YourStrong@Pass2026!"
export OPENSEARCH_HOME="/path/to/opensearch-2.19.1"

# Linux / macOS
cd $OPENSEARCH_HOME/plugins/opensearch-security/tools
./install_demo_configuration.sh -y

# Windows (PowerShell)
$env:OPENSEARCH_INITIAL_ADMIN_PASSWORD = "YourStrong@Pass2026!"
$env:OPENSEARCH_HOME = "C:\opensearch\opensearch-2.19.1"
cd $env:OPENSEARCH_HOME\plugins\opensearch-security\tools
cmd /c install_demo_configuration.bat -y
```

Then add single-node discovery and auto-initialization to `config/opensearch.yml`:

```yaml
# config/opensearch.yml — append:
discovery.type: single-node
plugins.security.allow_default_init_securityindex: true
```

Start OpenSearch:

```bash
# Linux / macOS
./bin/opensearch

# Windows
.\bin\opensearch.bat
```

Verify (note HTTPS and `-k` for the self-signed demo certificate):

```bash
curl -sk -u admin:YourStrong@Pass2026! https://localhost:9200
```

The demo security configuration keeps the security plugin **enabled** with self-signed TLS certificates and basic authentication. Set `tls On` and `tls.verify Off` in Fluent Bit, and use `https://` in the ICP Server config.

The demo configuration is for evaluation only. In production, use properly signed certificates and strong credentials. See the [OpenSearch security documentation](https://opensearch.org/docs/latest/security/) for details.

## Step 2: Create Index Templates

Index templates ensure OpenSearch maps fields with the correct types before any data arrives. Apply them once per cluster.

### Application logs template

```bash
curl -X PUT 'http://<opensearch-host>:9200/_index_template/wso2_integration_application_log_template' \
  -H 'Content-Type: application/json' \
  -d '{
    "index_patterns": ["ballerina-application-logs-*"],
    "template": {
      "mappings": {
        "properties": {
          "time":           { "type": "date", "format": "yyyy-MM-dd'\''T'\''HH:mm:ss.SSS'\''Z'\''||strict_date_optional_time||epoch_millis" },
          "message":        { "type": "text" },
          "icp_runtimeId":  { "type": "keyword" }
        }
      }
    }
  }'
```

If your OpenSearch requires authentication, add `-u admin:<password>`. For HTTPS with self-signed certs, add `-k`.

### Metrics logs template

A separate template ensures correct numeric types for latency fields:

```bash
curl -X PUT 'http://<opensearch-host>:9200/_index_template/wso2_integration_metrics_log_template' \
  -H 'Content-Type: application/json' \
  -d '{
    "index_patterns": ["ballerina-metrics-logs-*"],
    "template": {
      "mappings": {
        "properties": {
          "time":                   { "type": "date", "format": "yyyy-MM-dd'\''T'\''HH:mm:ss.SSS'\''Z'\''||strict_date_optional_time||epoch_millis" },
          "message":                { "type": "text" },
          "response_time_seconds":  { "type": "float" },
          "response_time":          { "type": "long" }
        }
      }
    }
  }'
```

## Step 3: Enable Observability in the Integration

These changes are additive — they build on the base configuration from [Connect an Integration to ICP](connect-runtime.md).

### Ballerina.toml

Add `observabilityIncluded` alongside the existing `remoteManagement`:

```toml
[build-options]
remoteManagement = true
observabilityIncluded = true
```

`observabilityIncluded = true` is required for metrics collection. Without it, the `ballerinax/metrics.logs` module cannot emit per-request metrics.

### main.bal

Add the metrics logger import alongside the existing bridge import:

```ballerina
import wso2/icp.runtime.bridge as _;
import ballerinax/metrics.logs as _;
```

Both are blank imports (`as _`) — they activate automatically at startup.

### Config.toml

Add logging and metrics settings alongside the existing `[wso2.icp.runtime.bridge]` section:

```toml
[ballerina.observe]
metricsLogsEnabled = true

[ballerina.log]
format = "logfmt"

[[ballerina.log.destinations]]
path = "./logs/app.log"

[ballerinax.metrics.logs]
logFilePath = "./logs/metrics.log"
```

This produces two separate log files:

| File | Content | OpenSearch index |
|------|---------|------------------|
| `logs/app.log` | Application logs (startup, errors, user log statements) | `ballerina-application-logs-*` |
| `logs/metrics.log` | Per-request metrics (response times, status codes, endpoints) | `ballerina-metrics-logs-*` |

| Setting | Purpose |
|---------|---------|
| `metricsLogsEnabled = true` | Enables the Ballerina runtime to emit per-request metrics |
| `format = "logfmt"` | Structured log output that Fluent Bit's `bal_logfmt_parser` can parse |
| `path = "./logs/app.log"` | Application log destination |
| `logFilePath = "./logs/metrics.log"` | Metrics log destination (separate file via `ballerinax/metrics.logs`) |

The log file paths must match the Fluent Bit input `Path` patterns. Adjust both sides if you change the directory layout.

## Step 4: Configure Fluent Bit

Fluent Bit tails the BI log files and ships them to OpenSearch.

You need three config files side by side:

- **`fluent-bit.conf`** — pipeline (inputs, filters, outputs)
- **`parsers.conf`** — log format parser
- **`scripts/scripts.lua`** — Lua enrichment scripts (adds fields required by ICP's Metrics page)

### Inputs and outputs

Since the integration writes app logs and metrics to separate files, Fluent Bit uses two independent inputs — no tag-rewriting or filtering needed to separate them:

| Input `Path` | Tag | Parser | Output index prefix | Content |
|-------------|-----|--------|---------------------|---------|
| `<bi-logs>/app.log` | `ballerina_app_logs` | `bal_logfmt_parser` | `ballerina-application-logs-` | Application logs |
| `<bi-logs>/metrics.log` | `ballerina_metrics` | `bal_logfmt_parser` | `ballerina-metrics-logs-` | Per-request metrics |

### Parser definition

Ballerina logfmt logs use ISO 8601 timestamps (`2026-04-30T07:09:27.966Z`). Define the parser in `parsers.conf`:

```ini
# parsers.conf

[PARSER]
    Name        bal_logfmt_parser
    Format      logfmt
    Time_Key    time
    Time_Format %Y-%m-%dT%H:%M:%S.%LZ
    Time_Keep   On
```

### Lua enrichment scripts

The Lua scripts enrich log records with fields that the ICP Metrics page requires (e.g. `response_time` in milliseconds, `status`, `integration`). They also generate hash-based document IDs for deduplication.

Download [`scripts.lua`](https://github.com/wso2/integration-control-plane/blob/main/icp_server/resources/observability/opensearch-observability-dashboard/config/fluent-bit/scripts/scripts.lua) and place it in a `scripts/` subdirectory next to your `fluent-bit.conf`:

```
fluent-bit/
├── fluent-bit.conf
├── parsers.conf
└── scripts/
    └── scripts.lua
```

The key Lua functions used in the pipeline:

| Function | Purpose |
|----------|---------|
| `extract_app_from_path` | Derives `app_name` from the log file path |
| `enrich_bal_logs` | Adds `product` and `app_module` fields |
| `construct_bal_app_name` | Builds the `app` and `deployment` fields |
| `extract_bal_metrics_data` | Parses metrics-specific fields (response time in ms, status, method, URL) |
| `generate_document_id` | Creates a hash-based `doc_id` for deduplication |

The Lua enrichment is **required** for the ICP Metrics page to display data. Without `extract_bal_metrics_data`, the ICP server cannot categorize inbound vs. outbound metrics, and the Metrics page shows "No metrics data" even when the underlying OpenSearch index contains records.

### fluent-bit.conf

Replace `<bi-logs>` with the actual path to your BI application's `logs/` directory. Use forward slashes on all platforms.

```ini
[SERVICE]
    Flush        1
    Parsers_File parsers.conf
    Log_Level    info

# ── App logs ──
[INPUT]
    Name         tail
    Path         <bi-logs>/app.log
    Parser       bal_logfmt_parser
    Tag          ballerina_app_logs
    Read_from_Head On
    Path_Key     log_file_path

# ── Metrics logs ──
[INPUT]
    Name         tail
    Path         <bi-logs>/metrics.log
    Parser       bal_logfmt_parser
    Tag          ballerina_metrics
    Read_from_Head On
    Path_Key     log_file_path

# ── Enrich app logs ──
[FILTER]
    Name    lua
    Match   ballerina_app_logs
    Script  scripts/scripts.lua
    Call    extract_app_from_path

[FILTER]
    Name    lua
    Match   ballerina_app_logs
    Script  scripts/scripts.lua
    Call    enrich_bal_logs

[FILTER]
    Name    lua
    Match   ballerina_app_logs
    Script  scripts/scripts.lua
    Call    construct_bal_app_name

# ── Enrich metrics logs ──
[FILTER]
    Name    lua
    Match   ballerina_metrics
    Script  scripts/scripts.lua
    Call    extract_app_from_path

[FILTER]
    Name    lua
    Match   ballerina_metrics
    Script  scripts/scripts.lua
    Call    enrich_bal_logs

[FILTER]
    Name    lua
    Match   ballerina_metrics
    Script  scripts/scripts.lua
    Call    construct_bal_app_name

[FILTER]
    Name    lua
    Match   ballerina_metrics
    Script  scripts/scripts.lua
    Call    extract_bal_metrics_data

# ── Document IDs (deduplication) ──
[FILTER]
    Name    lua
    Match   ballerina_app_logs
    Script  scripts/scripts.lua
    Call    generate_document_id
    time_as_table true

[FILTER]
    Name    lua
    Match   ballerina_metrics
    Script  scripts/scripts.lua
    Call    generate_document_id
    time_as_table true

# ── Outputs ──
[OUTPUT]
    Name            opensearch
    Match           ballerina_app_logs
    Host            localhost
    Port            9200
    Logstash_Format On
    Logstash_Prefix ballerina-application-logs
    Replace_Dots    On
    Suppress_Type_Name On
    Id_Key          doc_id
    tls             On
    tls.verify      Off
    HTTP_User       admin
    HTTP_Passwd     <password>

[OUTPUT]
    Name            opensearch
    Match           ballerina_metrics
    Host            localhost
    Port            9200
    Logstash_Format On
    Logstash_Prefix ballerina-metrics-logs
    Replace_Dots    On
    Suppress_Type_Name On
    Id_Key          doc_id
    tls             On
    tls.verify      Off
    HTTP_User       admin
    HTTP_Passwd     <password>
```

**TLS**: The config above assumes OpenSearch with the demo security configuration (HTTPS with self-signed certs). Set `tls Off` if OpenSearch runs plain HTTP.

**Auth**: `HTTP_User` / `HTTP_Passwd` are the OpenSearch credentials configured during setup.

**Id_Key**: `doc_id` enables deduplication — if Fluent Bit restarts and re-reads the same log lines, OpenSearch overwrites instead of creating duplicates.

`Replace_Dots On` is important — Ballerina logfmt fields contain dots (e.g. `src.module`, `http.method`) which OpenSearch rejects as field names. This setting converts them to underscores.

## Verification

### Check OpenSearch indices

After the BI runtime has been running for a minute or two:

```bash
curl -sk -u admin:<password> https://localhost:9200/_cat/indices/ballerina-*?v
```

You should see:

```
ballerina-application-logs-2026.04.30
ballerina-metrics-logs-2026.04.30
```

For plain HTTP OpenSearch (no TLS), use `http://` and drop `-k`.

### Check ICP Console

1. Log into the ICP Console at `https://<icp-host>:9446`.
2. Navigate to **Projects → \<project\> → Components → \<component\>**.
3. The component overview shows the service endpoints and environment cards with runtime status.
4. Click the **Logs** icon in the sidebar (📋) — you should see runtime log entries with timestamps, log levels, and messages. Use the environment, level, and time range filters to narrow results.
5. Click the **Metrics** icon in the sidebar (📊) — you should see:
   - Summary cards: Total Requests, Error Count, Error Percentage, 95th Percentile latency
   - **Requests Per Minute** chart (success vs. failed)
   - **Request Latency** chart (average, P50, P95, P99)
   - **Most Used APIs** table showing each endpoint with request count, error count, and average response time

Metrics are generated per inbound HTTP request. If the Metrics page shows "No metrics data", send some traffic to your integration first:
```bash
curl http://localhost:8090/<your-endpoint>
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Metrics page shows "No metrics data" | BI runtime has no inbound HTTP requests | Metrics are generated per-request — send traffic first |
| Metrics page shows "No metrics data" | `metricsLogsEnabled` not set | Add `metricsLogsEnabled = true` to `[ballerina.observe]` in `Config.toml` |
| Metrics page shows "No metrics data" | Metrics log file not configured | Set `logFilePath` in `[ballerinax.metrics.logs]` |
| Metrics page shows "No metrics data" | Lua enrichment scripts missing from Fluent Bit config | Add the Lua `[FILTER]` blocks (especially `extract_bal_metrics_data`) — see Step 4 |
| Logs page shows "Observability service is unavailable" | ICP Server can't reach OpenSearch | Verify `opensearchUrl` in ICP Server's `deployment.toml` |
| OpenSearch rejects documents with "total fields [1000] exceeded" | Deeply nested JSON in log messages | Increase limit: `curl -X PUT '.../_settings' -d '{"index.mapping.total_fields.limit": 2000}'` or add to the index template |

## Index Lifecycle

Indices are created daily with a date suffix (e.g. `ballerina-metrics-logs-2026-04-28`). To manage disk usage:

- Use [OpenSearch Index State Management (ISM)](https://opensearch.org/docs/latest/im-plugin/ism/index/) policies to automatically delete or roll over old indices.
- A typical retention policy keeps 30 days of logs and 90 days of metrics.

## Security Notes

- In production, enable TLS on OpenSearch and set `tls.verify On` in Fluent Bit.
- Use dedicated OpenSearch credentials for Fluent Bit (write-only) and ICP Server (read-only).
- The ICP Server generates short-lived JWTs (2 min) for internal communication between its observability service and its OpenSearch adapter — no user configuration needed.
