---
title: Moesif
---

# Moesif

Users can observe service integrations with [Moesif](https://www.moesif.com/), which is a powerful API analytics and monetization platform that helps businesses understand, debug, and monetize their API usage. It provides comprehensive API observability with real-time monitoring, behavioral analytics, and AI-powered insights to track customer API adoption and usage patterns.

Follow the steps given below to view integration metrics, traces and logs in Moesif.

## Step 1: Create a Moesif Account and Get an Application ID

After you log into Moesif Portal, get your `Moesif Application ID` during the onboarding steps.
`Application ID` can be accessed by following the below steps from Moesif Portal after logging in.

> Go to Account -> Settings -> API keys -> Collector Application ID.

## Step 2: Set Up a Service Integration

1. In your integration, Navigate to file explorer.
2. Open the `main.bal` file in the Ballerina package and add the following imports.

   ```ballerina
   import ballerinax/moesif as _;
   ```

   If you don't have an integration yet, you can use the following sample shop service, which listens on port `8090`. The requests in **Step 5** call this service.

   ```ballerina
   import ballerina/http;
   import ballerinax/moesif as _;

   type Product record {|
       int id;
       string name;
       decimal price;
   |};

   type OrderRequest record {|
       int productId;
       int quantity;
   |};

   type Order record {|
       int id;
       *OrderRequest;
   |};

   map products = {
       "1": {id: 1, name: "Laptop", price: 1200.00},
       "2": {id: 2, name: "Mouse", price: 25.00},
       "3": {id: 3, name: "Keyboard", price: 45.00}
   };
   Order[] orders = [];

   service /shop on new http:Listener(8090) {

       resource function get products() returns Product[] {
           return products.toArray();
       }

       resource function post product(Product product) returns Product {
           products[product.id.toString()] = product;
           return product;
       }

       resource function post 'order(OrderRequest request) returns Order|http:NotFound {
           if !products.hasKey(request.productId.toString()) {
               return http:NOT_FOUND;
           }
           Order newOrder = {id: orders.length(), ...request};
           orders.push(newOrder);
           return newOrder;
       }

       resource function get 'order/[int id]() returns Order|http:NotFound {
           if id < 0 || id >= orders.length() {
               return http:NOT_FOUND;
           }
           return orders[id];
       }
   }
   ```

3. Create the `Config.toml` file in the package directory to set the runtime configurations.
4. To enable the extension and publish traces and metrics to Moesif, add the following to the `Config.toml`. To publish only traces, leave out `metricsEnabled` and `metricsReporter`. To publish only metrics, leave out `tracingEnabled` and `tracingProvider`.

   ```toml
   [ballerina.observe]
   tracingEnabled=true
   tracingProvider="moesif"
   metricsEnabled=true
   metricsReporter="moesif"

   [ballerinax.moesif]
   applicationId = "<MOESIF_APPLICATION_ID>"    # Mandatory Configuration.
   reporterBaseUrl = "https://api.moesif.net"   # Optional Configuration. Default value is 'https://api.moesif.net'
   tracingReporterFlushInterval = 1000          # Optional Configuration. Default value is 1000
   tracingReporterBufferSize = 10000            # Optional Configuration. Default value is 10000
   metricsReporterFlushInterval = 15000         # Optional Configuration. Default value is 15000
   metricsReporterClientTimeout = 10000         # Optional Configuration. Default value is 10000
   isTraceLoggingEnabled = false                # Optional Configuration. Default value is false
   isPayloadLoggingEnabled = false              # Optional Configuration. Default value is false
   idleTimePublishingEnabled = false            # Optional Configuration. Default value is false

   # Additional attributes for metrics
   [ballerinax.moesif.additionalAttributes]
   key1 = "value1"
   key2 = "value2"
   ```
5. Replace `<MOESIF_APPLICATION_ID>` with the application ID obtained in **Step 1**.

The table below provides the descriptions of each configuration option and possible values that can be assigned.

| Configuration key                              | Description                                                                 | Default value | Possible values                      |
|------------------------------------------------|-----------------------------------------------------------------------------|-------------------------|--------------------------------------|
| ballerina.observe.tracingEnabled               | Enables or disables the collection of trace data.                           | `false`       | `true` or `false`                    |
| ballerina.observe.tracingProvider              | Specifies Moesif as the tracing provider.                                   | `none`        | `"moesif"`                           |
| ballerina.observe.metricsEnabled               | Enables or disables the collection of metrics data.                         | `false`       | `true` or `false`                    |
| ballerina.observe.metricsReporter              | Specifies Moesif as the metrics reporter.                                   | `none`        | `"moesif"`                           |
| ballerinax.moesif.applicationId                | Moesif application ID used for authentication. **Mandatory configuration.** | `none`        | A valid Moesif application ID string |
| ballerinax.moesif.reporterBaseUrl              | The base URL of the Moesif API.                                             | `https://api.moesif.net` | Any valid Moesif API endpoint URL    |
| ballerinax.moesif.tracingReporterFlushInterval | Interval (in milliseconds) for flushing trace data to Moesif.               | `1000`        | Any positive integer value           |
| ballerinax.moesif.tracingReporterBufferSize    | Maximum buffer size for trace data before sending to Moesif.                | `10000`       | Any positive integer value           |
| ballerinax.moesif.metricsReporterFlushInterval | Interval (in milliseconds) for flushing metrics data to Moesif.             | `15000`       | Any positive integer value           |
| ballerinax.moesif.metricsReporterClientTimeout | Timeout (in milliseconds) for the metrics reporter client requests.         | `10000`       | Any positive integer value           |
| ballerinax.moesif.isTraceLoggingEnabled        | Enables or disables trace logging for debugging purposes.                   | `false`       | `true` or `false`                    |
| ballerinax.moesif.isPayloadLoggingEnabled      | Enables or disables payload logging for debugging purposes.                 | `false`       | `true` or `false`                    |
| ballerinax.moesif.idleTimePublishingEnabled    | Enables or disables publishing metrics in idle time.                        | `false`       | `true` or `false`                    |
| ballerinax.moesif.additionalAttributes         | Additional key-value attributes to include with metrics reporting.          | `none`        | Any valid set of key-value pairs.<br/>e.g., `key1="value1", key2="value2"` |

These configurations enable traces and metrics publishing for the Ballerina application and configure the Moesif exporter.

## Step 3: Publish Integration Logs to Moesif

The integration writes its logs to a file in JSON format. A Fluent Bit sidecar reads that file, converts each entry to an OpenTelemetry log record, and sends it straight to Moesif's OTLP logs endpoint (`/v1/logs`) over HTTPS.

> Integration → Fluent Bit → Moesif

1. Add the following to the integration's `Config.toml` so that it writes JSON logs to a file:

   ```toml
   [ballerina.log]
   format = "json"

   [[ballerina.log.destinations]]
   path = "/absolute/path/to/integration/logs/app.log"
   ```

   Replace the path with your log file location.

2. Create a local directory with the following files:

   ```bash
   moesif-fluent-bit-logs/
   ├── .env
   ├── docker-compose.yaml
   └── fluent-bit.yaml
   ```

   * **.env** – Values specific to your setup, such as the Moesif application ID and the log directory.
   * **docker-compose.yaml** – Runs the Fluent Bit container.
   * **fluent-bit.yaml** – Reads the integration's logs, maps them to OpenTelemetry logs, and sends them to Moesif.

   **.env**

   ```dotenv
   MOESIF_APPLICATION_ID=<MOESIF_APPLICATION_ID>
   BALLERINA_LOG_DIR=/absolute/path/to/integration/logs
   LOG_FILE_PATH=/app/logs/app.log
   MOESIF_HOST=api.moesif.net
   OTEL_SERVICE_NAME=<SERVICE_NAME>
   DEPLOYMENT_ENVIRONMENT=<ENVIRONMENT_NAME>
   FLUENT_BIT_HTTP_PORT=2020
   ```

   - Replace `<MOESIF_APPLICATION_ID>` with the application ID you got in **Step 1**.
   - `BALLERINA_LOG_DIR` is the **host directory** that contains the `app.log` file you configured above. Docker mounts it at `/app/logs` inside the container.
   - `LOG_FILE_PATH` is the path of the log file **inside the container**. Change it if your log file has a different name.
   - Set `OTEL_SERVICE_NAME` to your integration's service name and `DEPLOYMENT_ENVIRONMENT` to the environment name, such as `dev` or `prod`.
   - If another process already uses port `2020`, change `FLUENT_BIT_HTTP_PORT`.
   - On Windows, use a Windows-style host path and allow access to the drive in Docker Desktop's file sharing settings.

   **docker-compose.yaml**

   ```yaml
   services:
     fluent-bit:
       image: fluent/fluent-bit:4.2.2
       volumes:
         - ${BALLERINA_LOG_DIR}:/app/logs:ro
         - ./fluent-bit.yaml:/fluent-bit/etc/fluent-bit.yaml:ro
         - fluent-bit-db:/var/log
       command: ["/fluent-bit/bin/fluent-bit", "-c", "/fluent-bit/etc/fluent-bit.yaml"]
       environment:
         - MOESIF_APPLICATION_ID=${MOESIF_APPLICATION_ID}
         - LOG_FILE_PATH=${LOG_FILE_PATH:-/app/logs/app.log}
         - MOESIF_HOST=${MOESIF_HOST:-api.moesif.net}
         - OTEL_SERVICE_NAME=${OTEL_SERVICE_NAME:-ballerina-service}
         - DEPLOYMENT_ENVIRONMENT=${DEPLOYMENT_ENVIRONMENT:-prod}
       ports:
         - "${FLUENT_BIT_HTTP_PORT:-2020}:2020"
       restart: unless-stopped

   volumes:
     fluent-bit-db:
   ```

   **fluent-bit.yaml**

   ```yaml
   service:
     flush: 5
     log_level: info
     http_server: on
     http_listen: 0.0.0.0
     http_port: 2020

   pipeline:
     inputs:
       - name: tail
         path: ${LOG_FILE_PATH}
         tag: ballerina.logs
         read_from_head: false
         refresh_interval: 5
         buffer_max_size: 64KB
         skip_long_lines: on
         skip_empty_lines: on
         mem_buf_limit: 10MB
         inotify_watcher: false
         db: /var/log/fluent-bit.db   # Tracks the read offset across restarts

         processors:
           logs:
             # Parse each JSON log line so that its fields, such as "level", are available
             - name: parser
               key_name: log
               parser: ballerina_json
               reserve_data: true

             # Map the "level" field to the OpenTelemetry severity number (defaults to INFO)
             - name: lua
               call: set_severity
               code: |
                 function set_severity(tag, timestamp, record)
                     local map = { TRACE = 1, DEBUG = 5, INFO = 9, WARN = 13, ERROR = 17, FATAL = 21 }
                     local num = map[record["level"]]
                     if num == nil then
                         num = 9
                         record["level"] = "INFO"
                     end
                     record["severity_number"] = num
                     return 2, timestamp, record
                 end

             # Wrap records in the OpenTelemetry log schema
             - name: opentelemetry_envelope

             # Add resource attributes
             - name: content_modifier
               action: upsert
               context: otel_resource_attributes
               key: service.name
               value: ${OTEL_SERVICE_NAME}

             - name: content_modifier
               action: upsert
               context: otel_resource_attributes
               key: deployment.environment
               value: ${DEPLOYMENT_ENVIRONMENT}

             # "time" is already used as the log timestamp, so remove it from the body
             - name: content_modifier
               action: delete
               context: body
               key: time

     outputs:
       - name: opentelemetry
         match: ballerina.logs
         host: ${MOESIF_HOST}
         port: 443
         tls: true
         tls.verify: on
         tls.verify_hostname: on
         logs_uri: /v1/logs
         logs_severity_text_message_key: level
         logs_severity_number_message_key: severity_number
         logs_body_key_attributes: on   # Make parsed JSON fields queryable as log attributes
         header:
           - X-Moesif-Application-Id ${MOESIF_APPLICATION_ID}
         log_response_payload: on
         workers: 2
         retry_limit: 3

   parsers:
     - name: ballerina_json
       format: json
       time_key: time
       time_format: "%Y-%m-%dT%H:%M:%S.%L%z"
       time_keep: on
   ```

3. From the `moesif-fluent-bit-logs` directory, start Fluent Bit:

   ```bash
   docker compose up -d
   ```

4. To check that Fluent Bit is running and sending logs, view its output:

   ```bash
   docker compose logs -f fluent-bit
   ```

Fluent Bit starts reading at the **end** of the log file the first time it runs, so it only sends log entries written after it starts. After that, it remembers its position in the file across restarts.

The `.env` file contains your Moesif application ID, so treat it as a secret and don't commit it to source control.

## Step 4: Run the Integration

When observability is enabled, the runtime collects metrics, logs, and traces.

## Step 5: Send Requests

Send requests as below to the service.

Example cURL commands:

```bash
curl -X GET http://localhost:8090/shop/products
```

```bash
curl -X POST http://localhost:8090/shop/product \
-H "Content-Type: application/json" \
-d '{
    "id": 4,
    "name": "Laptop Charger",
    "price": 50.00
}'
```

```bash
curl -X POST http://localhost:8090/shop/order \
-H "Content-Type: application/json" \
-d '{
    "productId": 1,
    "quantity": 1
}'
```

```bash
curl -X GET http://localhost:8090/shop/order/0
```

## Step 6: Visualize Observability Data in Moesif Dashboards

Traces, metrics, and logs are published to Moesif as events and can be explored in the Live Event Log for real-time monitoring.
Moesif provides a set of pre-built dashboards that help visualize and analyze this data effectively.
In addition, custom dashboards can be created to gain deeper, domain-specific insights.

## What's next

- [New Relic](new-relic.md) — Alternative full-stack observability platform
- [Datadog](../recipes/datadog-setup.md) — Full-stack observability with Datadog
- [Overview](../observe.md) — Full observability architecture
