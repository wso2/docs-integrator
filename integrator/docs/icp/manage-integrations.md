---
title: Manage Integrations
---

# Manage Integrations

An integration in ICP represents a deployable Ballerina or MI application that runs in one or more environments. Each integration belongs to a project and is the primary unit for viewing logs, metrics, and runtime status in the ICP console. This page guides you through creating integrations and navigating the integration home.

## Create an integration

1. Navigate to a project's home page.
2. Click **+ Create Integration**. The **Create New Integration** form opens.

   | Field | Required | Description |
   |-------|----------|-------------|
   | **Display Name** | Yes | Human-readable name shown in the console (e.g. `Order Create`) |
   | **Name** | Auto | URL-safe slug derived from the display name. Click the edit icon to override. |
   | **Description** | No | Optional free-text description of the integration |
   | **Technology** | Yes | **WSO2 Integrator** (default profile, Ballerina) or **WSO2 Integrator: MI** (Micro Integrator). Defaults to **WSO2 Integrator**. |
   | **Integration Type** | No | What the integration does: **Integration as API**, **Automation**, **Workflow**, **File Integration**, **Event Integration**, **AI Agent**, or **MCP Server**. **Workflow** is available only for **WSO2 Integrator**. |

3. Click **Create**.

ICP opens the new integration's overview.

## Edit an integration

1. On the project home, click the **Edit** icon on the integration's row.
2. Update the **Display Name**, **Integration Type**, or **Description**. The **Name** and **Technology** cannot be changed.
3. Click **Save**.

## Delete an integration

1. On the project home, click the **Delete** icon on the integration's row.
2. Type the integration's display name to confirm, then click **Delete**.

You can only delete an integration that has no registered runtimes. Delete its runtimes first (see [Manage runtimes](manage-runtimes.md)). This action cannot be undone.

## Integration home

The integration overview shows one environment card per environment. Each card displays:

- Environment name and a badge showing how many runtimes are active (e.g. *1/1 Active* or *0/1 Active*).
- **View Runtimes**, a refresh icon to reload runtime status, and a **Settings** icon.
- An **Endpoint** selector listing the services and automations exposed by the integration. For a selected service, the card shows its resources and the listeners it is attached to.
- For MI integrations, **Entry Points** and **Supporting Artifacts** tabs.
- **+ Add Runtime** link when no runtimes are registered yet.

When no runtimes are connected, the card shows: *"No entry points found for this integration. Add runtime to get started."*

### Integration sidebar

The sidebar changes to integration scope when you navigate into an integration:

| Item | Description |
|------|-------------|
| **Overview** | Environment cards with entry points and runtime status |
| **Test** | Send test requests to the integration's services. Not shown for workflow integrations. |
| **Runtimes** | Runtime instances connected to this integration |
| **Workflows** | Workflows and executions for this integration. Shown only for workflow integrations. |
| **Human Tasks** | Human tasks for this integration's workflows. Shown only for workflow integrations. |
| **Logs** | Integration-specific logs from connected runtimes |
| **Loggers** | Configure log levels per runtime |
| **Metrics** | Per-integration request metrics and latency data |
| **Access control** | Role assignments scoped to this integration |

### Runtimes

The **Runtimes** page groups runtime instances by environment. Each environment section shows a search bar, a refresh icon, and a runtime table:

| Column | Description |
|--------|-------------|
| **Runtime Name** | Display name assigned when connecting the runtime |
| **Runtime ID** | Unique identifier (UUID) |
| **Type** | **WSO2 Integrator** (default profile) or **WSO2 Integrator: MI** |
| **Status** | **RUNNING** or **OFFLINE** |
| **Version** | Runtime version |
| **Platform** | Ballerina runtime version (e.g. `Ballerina 2201.13.4 (Swan Lake Update 13)`) |
| **OS** | Operating system of the host machine |
| **Registration time** | When the runtime first connected to ICP |
| **Last heartbeat** | Timestamp of the most recent heartbeat received |
| **Actions** | Delete icon to remove the runtime, available only when the runtime is OFFLINE |

### Logs

The **Logs** page shows runtime log entries when both a connected runtime and an observability provider are configured. See [Observability setup](observability-setup/index.md) to enable this.

When operational, the page provides:

- **Filtering**: Environment, log level (INFO, WARN, ERROR, DEBUG), time range, and a keyword search bar
- **Display controls**: Sort order (Newest first / Oldest first), auto-fetch toggle for automatic reload, and an entry count showing how many entries are loaded
- **Actions**: Refresh button for manual reload and a download button to export log entries
- **Log entries**: Each entry shows a timestamp, level, and message

### Loggers

The **Loggers** page lets you change the log level of a running Ballerina integration without restarting it. Loggers are grouped by environment, and each row is a logger reported by the connected runtimes, such as the `root` logger, with its current log level.

| Column | Description |
|---|---|
| **Component Name** | Name of the logger (e.g. `root`) |
| **Log Level** | Current log level: `DEBUG`, `INFO`, `WARN`, or `ERROR` |

#### Change the log level

1. Navigate to **Loggers** in the integration sidebar.
2. Find the environment section for the environment you want to update.
3. In the **Log Level** column, click the dropdown next to the component and select a new level.

The change is applied immediately to all runtimes connected to that integration in the selected environment. A spinner appears next to the dropdown while the update propagates. Once the runtimes acknowledge the new level, the spinner clears.

The available log levels for Ballerina integrations are:

| Level | When to use |
|---|---|
| `DEBUG` | Verbose output for troubleshooting; logs all detail including internal state |
| `INFO` | Standard operational messages; recommended for normal production use |
| `WARN` | Potentially harmful situations that do not cause a failure |
| `ERROR` | Error events that may still allow the integration to continue running |

Click **View Runtimes** on any logger row to see which runtime IDs are receiving log level commands for that component.

### Metrics

The **Metrics** page shows request performance data when both a connected runtime and an observability provider are configured. See [Observability setup](observability-setup/index.md) to enable this.

When operational, the page provides:

- **Summary cards**: Total Requests, Error Count, Error Percentage, and P95 Latency
- **Overview charts**: Requests Per Minute and Request Latency (average, P50, P95, P99)
- **Most Used APIs**: Table with per-endpoint request counts, error counts, and average response times
- **Statistics of APIs**: Section with an API filter dropdown, showing Requests Per Minute, Average Request Latency, Successful Requests by API, and Failed Requests by API charts

### Listeners

Ballerina listeners (HTTP, TCP, and other transport listeners) appear on the integration **Overview**, under the service they are attached to. Each listener row shows its name, protocol, host and port, and its state (**Enabled** or **Disabled**). You can start or stop individual listeners directly from the console, which sends a control command to all runtimes running that listener in the selected environment.

<ThemedImage
    alt="Listener row with View Details and Disable buttons, and the disable confirmation dialog"
    sources={{
        light: useBaseUrl('/img/manage/icp/listener-control-light-v5.1.png'),
        dark: useBaseUrl('/img/manage/icp/listener-control-light-v5.1.png'),
    }}
/>

#### Start or stop a listener

1. Open the integration and go to **Overview**.
2. In the environment card, select the service in the **Endpoint** selector.
3. On the listener row, click **Disable** or **Enable**. To see the listener's details, click **View Details**.
4. A confirmation dialog appears. Click **Disable** or **Enable** to confirm.

ICP sends a `START` or `STOP` command to every runtime associated with the listener. The listener state updates to **Enabled** or **Disabled** once the runtimes acknowledge the command.

| Detail field | Description |
|---|---|
| **Package** | Module that provides the listener (e.g. `ballerina/http:2`) |
| **Protocol** | Transport protocol (e.g. `HTTP`, `TCP`) |
| **Host** | Hostname the listener is bound to |
| **Port** | Port the listener is bound to |

## What's next

- [Connect an integration to ICP](connect-runtime.md) — register a runtime to start sending heartbeats and status updates
- [Observability setup](observability-setup/index.md) — enable centralized logs and metrics for connected runtimes
- [Manage runtimes](manage-runtimes.md) — view and manage runtime instances across integrations
