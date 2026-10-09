---
sidebar_position: 1
title: Moesif
description: Set up Moesif metrics, application logs, and embedded dashboards for ICP.
slug: /icp/observability-setup/moesif
---

# Moesif

With Moesif, the runtime publishes metrics to the Moesif collector, and a Fluent Bit sidecar forwards application logs to the same Moesif application. ICP embeds dashboards that filter this data by the runtime IDs associated with the selected integration and environment.

:::tip
This guide covers **default profile** runtimes. To set up observability for a **WSO2 Integrator: MI** runtime connected to ICP, see [Adding observability for ICP](https://mi.docs.wso2.com/en/latest/install-and-setup/install/adding-observability-for-icp/) in the MI documentation.
:::

## Prerequisites

- ICP installed and running. See [Install ICP](../install-icp.md).
- Integration connected to ICP with heartbeats working. See [Connect an integration to ICP](../connect-runtime.md).
- A [Moesif account](https://www.moesif.com/wrap/basic).
- Docker with Docker Compose available on the host that can access the integration's log files, for the Fluent Bit sidecar.
- Permission to **edit** or **manage** the integration in ICP to link its dashboards.
- Network access from the runtime and Fluent Bit to `https://api.moesif.net`, from the ICP server to `https://api.moesif.com`, and from your browser to `https://www.moesif.com` for the embedded dashboards.

## 1. Prepare Moesif

1. Sign in to Moesif and create **one application for each ICP environment** you want to observe.
2. Open **Account > Settings > API keys** and copy the application's **Collector Application ID**.

Use the same Moesif application for metrics and logs in an ICP environment. ICP stores the dashboard configuration per environment, so integrations in that environment share the configuration. Repeat the setup for each additional environment.

You will use two different credentials:

| Credential | Where to use it | Purpose |
|------------|-----------------|---------|
| **Collector Application ID** | The integration's `Config.toml` and the Fluent Bit bundle's `.env`. | Publishes metrics and logs to Moesif. |
| **Management API Key** | The **Management API Key** field on either the **Metrics** or **Logs** page in ICP. | Allows ICP to load both embedded dashboards for the environment. |

## 2. Publish metrics from the integration

The integration publishes metrics to Moesif only while it is running and handling requests. Moesif and ICP show no metrics until the integration receives requests.

Keep the runtime connection settings from [Connect an integration to ICP](../connect-runtime.md), and follow these steps in your integration project.

1. In `Ballerina.toml`, enable observability alongside remote management:

   ```toml
   [build-options]
   remoteManagement = true
   observabilityIncluded = true
   ```

2. In `main.bal`, add the Moesif import and keep the ICP runtime bridge import:

   ```ballerina
   import ballerinax/moesif as _;
   import wso2/icp.runtime.bridge as _;
   ```

   The integration must expose a service, such as an HTTP service, to receive requests. A program with only a `main` function exits after it runs and does not generate metrics. If your integration does not have a service yet, you can use the following example. It exposes a `GET /hello` endpoint on port `9090` and writes a log entry for each request:

   ```ballerina
   import ballerina/http;
   import ballerina/log;
   import ballerinax/moesif as _;
   import wso2/icp.runtime.bridge as _;

   service /hello on new http:Listener(9090) {
       resource function get .() returns string {
           log:printInfo("Received a request");
           return "Hello";
       }
   }
   ```

3. In `Config.toml`, add the following settings. If a section already exists, merge these keys into it instead of duplicating the section.

   ```toml
   [ballerina.observe]
   metricsEnabled = true
   metricsReporter = "moesif"

   [ballerinax.moesif]
   applicationId = "<MOESIF_COLLECTOR_APPLICATION_ID>"
   ```

   Replace `<MOESIF_COLLECTOR_APPLICATION_ID>` with the value copied in step 1.

4. Start or restart the integration from the project directory:

   ```bash
   bal run
   ```

   Keep the integration running. Its logs show `Full heartbeat acknowledged by ICP server` when it is connected to ICP.

5. In a separate terminal, send requests to the integration's service endpoint. For the example service, run:

   ```bash
   for i in $(seq 1 20); do curl http://localhost:9090/hello; done
   ```

   On Windows PowerShell, run:

   ```powershell
   1..20 | ForEach-Object { curl.exe http://localhost:9090/hello }
   ```

   Each request generates metrics that the integration publishes to Moesif.

6. In Moesif, open the application created in step 1 and confirm that events from the integration appear. It can take a few minutes for the first events to appear.

## 3. Publish application logs

Add the following to the integration's `Config.toml` to write JSON logs to a file:

```toml
[ballerina.log]
format = "json"

[[ballerina.log.destinations]]
path = "/absolute/path/to/integration/logs/app.log"
```

Replace the path with your log file location, then restart the integration. The Fluent Bit bundle sets the OpenTelemetry resource attribute `icp.runtimeId` from the `ICP_RUNTIME_ID` value in its `.env` file. ICP filters logs using `resource.icp.runtimeId` in Moesif. An `icp.runtimeId` field in the JSON log alone does not satisfy this filter.

The downloaded configuration handles one runtime per Fluent Bit sidecar. To collect logs from multiple runtimes with one Fluent Bit instance, configure a separate input, log path, offset database, and `icp.runtimeId` resource attribute for each runtime.

1. In the ICP console, navigate to **Projects > your project > Integrations > your integration**.
2. Open **Runtimes** and copy the **Runtime ID** of the runtime whose logs you want to collect from the target environment's table.
3. Open **Logs** and select that environment. If its Moesif dashboard is already linked, select **Moesif** if the provider selector is shown, then click **View Configurations**.
4. In the Moesif setup flow, expand **Step 02: Publish logs from your runtime** and click **Download Fluent Bit config**.
5. Extract `moesif-fluent-bit-logs.zip`. The extracted `moesif-fluent-bit-logs` directory contains `docker-compose.yaml`, `fluent-bit.yaml`, and `.env`.
6. Edit `.env` with the values for your runtime:

   ```dotenv
   MOESIF_APPLICATION_ID=<MOESIF_COLLECTOR_APPLICATION_ID>
   BALLERINA_LOG_DIR=/absolute/path/to/integration/logs
   LOG_FILE_PATH=/app/logs/app.log
   MOESIF_HOST=api.moesif.net
   OTEL_SERVICE_NAME=<SERVICE_NAME>
   ICP_RUNTIME_ID=<RUNTIME_ID>
   DEPLOYMENT_ENVIRONMENT=<ENVIRONMENT_NAME>
   FLUENT_BIT_HTTP_PORT=2020
   ```

   - `BALLERINA_LOG_DIR` is the **host directory** containing the `app.log` configured above. Docker mounts it at `/app/logs` inside the container.
   - `LOG_FILE_PATH` is the path **inside the container**. Change it if your log filename differs.
   - Replace `<RUNTIME_ID>` with the **Runtime ID** copied from ICP, not the runtime's display name. It must identify the runtime that writes the mounted log file.
   - Set `OTEL_SERVICE_NAME` to your integration's service name and `DEPLOYMENT_ENVIRONMENT` to the environment name.
   - Change `FLUENT_BIT_HTTP_PORT` if another process or sidecar already uses port `2020`.
   - On Windows, use a Windows-style host path and allow access to the drive in Docker Desktop file sharing.

7. From the extracted directory, start Fluent Bit:

   ```bash
   docker compose up -d
   ```

8. Check the sidecar output:

   ```bash
   docker compose logs -f fluent-bit
   ```

The bundle sends logs directly to Moesif's `/v1/logs` endpoint over HTTPS. It starts tailing at the end of the file on its first run, so generate **new log entries after starting Fluent Bit** to verify ingestion.

## 4. Load the dashboards in ICP

Once data is flowing, create a **Management API Key** in Moesif for the same application used in steps 2 and 3. Give it the **access_tokens: create** and **events: read** scopes.

ICP stores one Management API Key per environment. Linking either dashboard configures both dashboards for every integration in that environment.

1. Open either the integration's **Metrics** or **Logs** page, select the environment, and expand **Step 03: Load the dashboard** in the Moesif setup flow.
2. Paste the key into **Management API Key** and click **Link canvas**.
3. Open the other observability page for the same environment and confirm that its dashboard loads without asking for the key again.

ICP derives the Moesif organization and application from the key and generates short-lived tokens to load the embedded dashboards. Use **View Configurations** on either dashboard to review the publishing settings or update the shared credentials.

:::note
Treat the Management API Key and the Fluent Bit `.env` as secrets. Updating the key from either dashboard changes the shared credentials for the entire environment.
:::

## 5. Verify Moesif observability

1. Send requests to an endpoint exposed by your integration and generate an application log entry.
2. Confirm that metrics and logs arrive in the Moesif application associated with the environment.
3. Open **Metrics** and **Logs** in ICP, select the corresponding environment and runtimes, and choose a time range that includes the requests.
4. Confirm that the embedded dashboards show the new data.

## Troubleshoot Moesif

| Symptom | What to check |
|---------|---------------|
| The dashboard loads but metrics are empty. | Confirm `observabilityIncluded = true`, the Moesif import, `metricsEnabled = true`, and `metricsReporter = "moesif"`. Restart the runtime and send requests. Check that the Collector Application ID belongs to the environment's Moesif application. |
| Logs are empty. | Confirm the integration writes JSON to the mounted `app.log`, the sidecar is running, and new entries were written after it started. Check `docker compose logs fluent-bit` for ingestion errors. |
| Data exists in Moesif but is missing in ICP. | Check the selected environment, runtimes, and time range. For logs, verify that the sidecar's `ICP_RUNTIME_ID` matches the **Runtime ID** in ICP and that the ingested logs have the matching `resource.icp.runtimeId` attribute. Recreate the sidecar after changing `.env` with `docker compose up -d`, then generate new log entries. |
| Linking the dashboard fails. | Use a Management API Key with both required scopes, issued for the same application as the Collector Application ID. Check that ICP can reach the Moesif Management API and that you have edit or manage permission for the integration. |
| Moesif setup is not shown. | Check that Moesif is enabled in both the server and console. For an already-linked dashboard, select **Moesif** if the provider selector is shown, then click **View Configurations**. |

## What's next

- [Manage integrations](../manage-integrations.md) — create integrations and navigate the integration overview in the ICP console
- [Manage runtimes](../manage-runtimes.md) — monitor runtime health and status alongside observability data
- [Access control](../access-control.md) — control who can view logs and metrics in the ICP console
