---
sidebar_position: 1
title: "Runtime Logs"
description: "View and filter runtime logs for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, runtime logs, observability, logs]
slug: /observe/runtime-logs
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Runtime Logs

Runtime logs provide insights into application and gateway activity for integrations deployed on Choreo Integration. They centralize diverse log sources to streamline debugging and troubleshooting across environments.

:::note
All personally identifiable information (PII) is resolved at the frontend service level. Only relevant UUIDs are stored in logs.
:::

## Access runtime logs

The path is **Observe** > **Runtime Logs** in the left navigation, available at two levels:

- **Project level** — Open your project, then go to **Observe** > **Runtime Logs**. This shows log entries from every integration in the project combined. Use the **All integrations** list at the top to narrow the view to a single integration.

    <ThemedImage
        alt="Project-level Runtime logs page with the All integrations selector"
        sources={{
            light: useBaseUrl('/img/observe/cloud/runtime-logs/runtime-logs-project.png'),
            dark: useBaseUrl('/img/observe/cloud/runtime-logs/runtime-logs-project.png'),
        }}
    />

- **Integration level** — Open your integration, then go to **Observe** > **Runtime Logs**. This shows only that integration's log entries, across all of its environments.

    <ThemedImage
        alt="Integration-level Runtime logs page showing application and gateway log entries across all environments"
        sources={{
            light: useBaseUrl('/img/observe/cloud/runtime-logs/runtime-logs-integration.png'),
            dark: useBaseUrl('/img/observe/cloud/runtime-logs/runtime-logs-integration.png'),
        }}
    />

Both views support the same filtering and search described below.

Depending on the integration type, you can also access runtime logs from the Integration Overview page:

<ThemedImage
    alt="Integration Overview page with the View logs button highlighted on the Development environment card"
    sources={{
        light: useBaseUrl('/img/observe/cloud/runtime-logs/overview-view-logs.png'),
        dark: useBaseUrl('/img/observe/cloud/runtime-logs/overview-view-logs.png'),
    }}
/>

- **Automations** — Each execution in the environment card has a **View Logs** button that opens logs scoped to that specific run.
- **Event and file integrations** — Latest logs are visible directly on the environment card without navigating to the Observability section.
- **Integration as APIs and AI Agents** - Each environment card has a **View Logs** button that opens logs filtered to that specific environment and integration version.

Clicking **View logs** opens the same log viewer in a side panel, already scoped to that environment:

<ThemedImage
    alt="Runtime logs side panel opened from the Development environment card, scoped to that environment"
    sources={{
        light: useBaseUrl('/img/observe/cloud/runtime-logs/view-logs-panel.png'),
        dark: useBaseUrl('/img/observe/cloud/runtime-logs/view-logs-panel.png'),
    }}
/>

Each log line shows its timestamp, level, environment, and a one-line summary; gateway log lines also carry a **GATEWAY** badge, the HTTP status, and the request duration. Click a line to expand it and see its full set of fields.

<ThemedImage
    alt="Expanded gateway log entry showing Method, Path, Status, Duration, Environment, Caller, Host, Pod, Container, and the raw log line"
    sources={{
        light: useBaseUrl('/img/observe/cloud/runtime-logs/log-entry-expanded.png'),
        dark: useBaseUrl('/img/observe/cloud/runtime-logs/log-entry-expanded.png'),
    }}
/>

## Understand runtime logs

Each log entry is either an application log or a gateway log.

### Application logs

| Field | Description |
|---|---|
| **Timestamp** | The time when the log entry was created. |
| **Level** | The log level: `INFO`, `WARN`, `ERROR`, or `DEBUG`. |
| **Environment** | The environment in which the integration is running (for example, Development). |
| **Integration** | The integration that produced the log entry. |
| **Pod** / **Container** | The Kubernetes pod and container the log line came from. |
| **Raw line** | The original, unparsed log message. |

### Gateway logs

Gateway logs capture inbound and outbound request details from the gateway's perspective.

| Field | Description |
|---|---|
| **Method** | The HTTP method of the request. |
| **Path** | The request path. |
| **Status** | The HTTP status code returned to the client. |
| **Duration** | How long the request took to complete. |
| **Environment** | The environment the request was served from. |
| **Caller** | The client's `User-Agent` string. |
| **Host** / **Pod** / **Container** | The backend service, pod, and container (`gateway-runtime`) that handled the request. |
| **Raw line** | The full gateway access log entry as JSON, including internal fields such as `respCd` (response code) and `respCdDtl` (response code detail, for example `via_upstream` for a normal backend response). |

## Filter runtime logs

Click **Filters** to narrow log entries:

| Filter | Description |
|---|---|
| **Level** | Filter by log level: `INFO`, `WARN`, `ERROR`, or `DEBUG`. |
| **Environment** | Filter by the environment in which the integration is running. |
| **Auto refresh** | Toggle whether the log view keeps polling for new entries (on by default, refreshing every 10 seconds). |

<ThemedImage
    alt="Filters panel with Level and Environment checkboxes and the Auto refresh toggle"
    sources={{
        light: useBaseUrl('/img/observe/cloud/runtime-logs/filters-panel.png'),
        dark: useBaseUrl('/img/observe/cloud/runtime-logs/filters-panel.png'),
    }}
/>

Outside the Filters panel, you can also:

- Type a search query in the **Search logs** bar and press **Enter** to filter by keyword.
- Choose a **Time Range** (Past 10 minutes up to Past 30 days, or a custom range).
- Choose a log type: **All logs**, **Application logs**, or **Gateway logs**.
- Click the download icon to export the current log view.

{/* TODO(v3): the previous "Regex Search" / Lucene syntax claim and the gateway
    codes reference table (BACKEND_RESPONSE, CORS_RESPONSE, AUTH_FAILURE, etc.)
    are unverified against v3 - the search bar's exact query syntax wasn't
    confirmed, and the named gateway codes aren't surfaced as a labeled field
    in the UI (only respCdDtl inside the raw JSON line, which showed
    "via_upstream" for a normal response). Re-verify both before restoring. */}

