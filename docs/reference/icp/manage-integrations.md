---
title: Manage Integrations
---

# Manage Integrations

Integrations (also called *components*) represent a deployable unit — a Ballerina
application in the case of BI. Each integration belongs to a project and runs in
one or more environments.

## Create an Integration

1. Navigate to a project's home page.
2. Click **+ Create**. The **Create New Integration** form opens.

| Field            | Required | Description                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------- |
| Organization     | Auto     | Pre-filled with the current organization (read-only when navigating from a project). |
| Project          | Auto     | Pre-filled with the current project. Can be changed via dropdown.            |
| Display Name     | Yes      | Human-readable name (placeholder: *Enter display name here*).               |
| Name             | Auto     | Slug from Display Name. Click the edit icon to override.                                |
| Integration Type | Yes      | Dropdown: **BI** (Ballerina Integrator) or **MI** (Micro Integrator). Defaults to BI. |
| Description      | No       | Multi-line text area (placeholder: *Enter description here*).               |

3. Click **Create**.

On success, the integration appears in the project's integration table.

A **← Back to Project Home** link at the top returns to the project without creating.

## Integration Home

The integration overview shows one **environment card** per environment. Each card
displays:

- Environment name and runtime count badge (e.g. *"0 runtimes"* or *"1/1 Online"*).
- Refresh icon.
- For BI integrations: **Entry Points** tab listing services/APIs, and a
  **Supporting Artifacts** tab (when artifacts are present).
- **+ Add Runtime** link when no runtimes are registered.

When no runtimes are connected, the card shows:
*"No runtimes registered for this environment."*

### Integration Sidebar

| Item           | Section       | Description                                  |
| -------------- | ------------- | -------------------------------------------- |
| Overview       | —             | Environment cards with entry points/artifacts |
| Runtimes       | —             | Runtime instances for this integration        |
| Logs           | Observability | Integration-specific logs                     |
| Loggers        | Observability | Logger configuration (runtime log levels)     |
| Metrics        | Observability | Per-integration metrics                       |
| Access-control | Management    | Integration-level role assignments            |

### Integration Runtimes

The Runtimes page groups runtimes by environment. Each environment section shows:

- Environment name and runtime count badge.
- A search bar to filter runtimes.
- A refresh icon.
- *"No runtimes registered for this environment."* when empty.

When runtimes are present, a table shows:

| Column            | Description                         |
| ----------------- | ----------------------------------- |
| Runtime Name      | Display name (or `-` if unset)      |
| Runtime ID        | UUID                                |
| Type              | BI                                  |
| Status            | RUNNING, OFFLINE, etc.              |
| Version           | Runtime version                     |
| Platform          | e.g. *Ballerina 2201.13.2 (Swan Lake Update 13)* |
| OS                | e.g. *Mac OS X 26.1*               |
| Registration Time | When the runtime first connected    |
| Last Heartbeat    | Most recent heartbeat timestamp     |
| Actions           | Delete icon                         |

### Logs Page

Requires both a connected runtime and OpenSearch observability. Without
integrations, the page shows: *"No components — Add a component to view runtime logs."*

When operational, the Logs page provides:

- Environment filter
- Log level filter (INFO, WARN, ERROR, DEBUG)
- Time range selector
- Log entries with timestamps, levels, and messages

### Metrics Page

Shows request metrics when both runtime and observability are configured:

- Summary cards: Total Requests, Error Count, Error Percentage, P95 Latency
- Requests Per Minute chart
- Request Latency chart (average, P50, P95, P99)
- Most Used APIs table

Requires `observabilityIncluded = true` and the metrics module. See
[Observability Setup](observability-setup.md).
