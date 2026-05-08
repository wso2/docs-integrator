---
title: Anomaly Detection and Alerts
---

# Anomaly detection and alerts

Alerts let you proactively monitor your integrations and respond before issues affect users. You can configure rules that trigger email notifications when latency, traffic, resource usage, or log activity crosses a defined threshold.

Alerts are configured at the integration level.

## Alert types

WSO2 Cloud supports the following alert types:

- [Latency alerts](#latency-alerts)
- [Traffic alerts](#traffic-alerts)
- [Resource alerts](#resource-alerts)
- [Log alerts](#log-alerts)
- [Build failure alerts](#build-failure-alerts)

### Latency alerts

Triggers when the response latency of an integration exceeds a threshold for a sustained period. Useful for integrations with SLA requirements or for proactively identifying slow integrations.

| Parameter | Description |
|---|---|
| **Metric** | The latency percentile to monitor: 99th, 95th, 90th, or 50th. |
| **Threshold** | Latency in milliseconds (for example, `1800`). |
| **Period** | Duration the threshold must be continuously exceeded (for example, 5 minutes). |

### Traffic alerts

Triggers when the request count exceeds a threshold. Useful for integrations with backend traffic limits or monetized backends that need proactive scaling.

| Parameter | Description |
|---|---|
| **Threshold** | Requests per minute (for example, `200`). |
| **Period** | Monitoring window (for example, 5 minutes). |

### Resource alerts

Triggers when CPU or memory usage exceeds a threshold. Use this to adjust resource allocations before performance degrades or downtime occurs.

| Parameter | Description |
|---|---|
| **Metric** | `CPU` or `Memory`. |
| **Threshold** | In mCPU for CPU, or MiB for memory (for example, `1000`). |
| **Period** | Duration the threshold must be continuously exceeded (for example, 5 minutes). |

- **CPU**: mCPU (milliCPU) measures CPU usage in fractions of a core, where 1000 mCPU = 1 full core.
- **Memory**: MiB (mebibyte) measures memory in binary units, where 1 MiB = 2<sup>20</sup> bytes.

### Log alerts

Triggers when a specified phrase appears a minimum number of times in your integration logs within a defined time window. Useful for detecting recurring errors or critical events quickly.

| Parameter | Description |
|---|---|
| **Search Phrase** | Keyword or phrase to monitor (for example, `failed`). |
| **Count** | Minimum number of occurrences to trigger the alert (for example, `10`). |
| **Interval** | Time window for counting occurrences (for example, 5 minutes). |

### Build failure alerts

Triggers whenever a build failure occurs for your integration. Keeps your team informed so issues in the development workflow are caught early.

## Configure an alert

You need **DevOps** or **Platform Engineer** permission to create alert rules.

1. Open the integration you want to monitor.
2. In the left navigation under **Observability**, click **Alerts**.
3. Click **Create Alert Rule**.
4. Select the **Alert Type**.
5. Select the **Environment** to monitor.
6. Select the **Deployment Track** or **Version** as required.
7. Configure the parameters specific to the selected alert type.
8. In the **Emails** field, enter the email addresses to notify when the alert triggers.

    :::note
    - Press **Enter** after typing each email address to add it.
    - You can add a maximum of 5 email addresses per alert.
    :::

9. Expand **Advanced Configurations** to set additional parameters if needed. Available options vary by alert type.
10. Review the **Explanation** callout to confirm the alert is configured as intended.
11. Click **Create** to save and activate the alert rule.

    :::info
    You can configure a maximum of 10 alerts per integration.
    :::

The alert appears in the **Configure Alerts** pane. From this pane you can edit, disable, enable, or remove any alert rule.

When editing an alert, **Alert Type**, **Environment**, and **Deployment Track** cannot be changed.

## Alerts history and notifications

### View alerts history

The **Alerts History** pane shows a record of alerts that have triggered for the integration. Filter by **Alert Type**, **Environment**, **Deployment Track**, **Version**, or **Time Range** to narrow the results. Click an alert entry to expand it and see full details.

### Email notifications

When an alert triggers, all configured recipients receive an email with the alert details and a link to view it in WSO2 Cloud.
