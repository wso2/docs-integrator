---
title: Manage Runtimes
---

# Manage Runtimes

Runtimes are default profile (Ballerina) or MI processes that connect to ICP by sending periodic heartbeats. The **Runtimes** page is available at the organization, project, and integration level, with each level scoped to show only the runtimes relevant to that context. This page guides you through viewing runtimes, generating connection secrets, and managing runtime connections.

## Runtimes page

Runtimes are grouped by environment. Each environment section shows:

- Environment name and a runtime count badge (e.g. *1 runtime*).
- **Manage Secrets** button to open the secrets panel for that environment.
- **+ Add Runtime** button to open the secret generation dialog.
- **Refresh** icon to reload runtime status.
- A **Search runtimes** bar to filter by name.

### Runtime table

| Column | Description |
|--------|-------------|
| **Runtime Name** | Display name assigned when connecting the runtime |
| **Runtime ID** | UUID assigned on first heartbeat |
| **Type** | **WSO2 Integrator** (default profile) or **WSO2 Integrator: MI** |
| **Component** | Integration this runtime belongs to (organization level only) |
| **Status** | **RUNNING** or **OFFLINE** |
| **Version** | Runtime version, or "-" if unavailable |
| **Platform** | Ballerina runtime version (e.g. `Ballerina 2201.13.4 (Swan Lake Update 13)`) |
| **OS** | Operating system of the host machine |
| **Registration time** | Timestamp of first connection to ICP |
| **Last heartbeat** | Timestamp of most recent heartbeat received |
| **Actions** | **Delete** icon to remove the runtime, available only when the runtime is OFFLINE. The delete dialog can also revoke the runtime's secret if no other runtime uses it. MI runtimes also have a **View Logs** icon. |

At the organization level, the table includes a **Component** column showing which integration each runtime belongs to. The project and integration levels omit this column.

ICP marks a runtime **OFFLINE** when it has not received a heartbeat for `heartbeatTimeoutSeconds` (default `30`) seconds. The check runs every `schedulerIntervalSeconds` (default `60`) seconds, so the status can take up to about 90 seconds to change.

## Add a runtime

Click **+ Add Runtime** on an environment section to generate a secret and get a `Config.toml` snippet. See [Connect an integration to ICP](connect-runtime.md) for the full procedure.

## Manage secrets

1. Navigate to the **Runtimes** section at the integration level, then click **Manage Secrets** on any environment section.
2. The secrets panel opens showing all secrets for that environment - both bound (claimed by a runtime) and unbound (not yet claimed by any runtime).
3. If there are no secrets, the panel shows: *"No secrets for this integration in this environment."*
4. Click the delete icon next to a secret to revoke it.

At the organization level, the secrets panel lists only the unbound secrets for the environment.

## Scope differences

The **Runtimes** page behaves differently depending on which level you access it from:

| Level | Shows | Add runtime | Manage secrets |
|-------|-------|-------------|----------------|
| Organization | All runtimes across all projects | Yes | Yes |
| Project | Runtimes in integrations of this project | No | No |
| Integration | Runtimes for this integration only | Yes | Yes |

At the project level, you cannot add runtimes or manage secrets, but you can still delete offline runtimes. Use the organization or integration level to add runtimes and manage secrets.

## What's next

- [Connect an integration to ICP](connect-runtime.md) — generate a secret and configure the runtime bridge
- [Observability setup](observability-setup/index.md) — enable centralized logs and metrics for connected runtimes
- [Access control](access-control.md) — control who can add and remove runtimes
