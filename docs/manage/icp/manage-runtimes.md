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
| **Type** | Profile type: default profile or MI |
| **Component** | Integration name this runtime belongs to |
| **Status** | Current state: **RUNNING**, OFFLINE, or similar |
| **Version** | Runtime version, or "Not reported" if unavailable |
| **Platform** | Ballerina runtime version (e.g. `Ballerina 2201.13.2`) |
| **OS** | Operating system of the host machine |
| **Registration time** | Timestamp of first connection to ICP |
| **Last heartbeat** | Timestamp of most recent heartbeat received |
| **Actions** | **Delete** icon to remove the runtime |

At the organization level, the table includes a **Component** column showing which integration each runtime belongs to. At the integration level, this column is omitted since the scope is already a single integration.

## Add a runtime

Click **+ Add Runtime** on an environment section to generate a secret and get a `Config.toml` snippet. See [Connect an integration to ICP](connect-runtime.md) for the full procedure.

## Manage secrets

1. Navigate to the **Runtimes** section at the integration level, then click **Manage Secrets** on any environment section.
2. The secrets panel opens showing unbound secrets for that environment. Unbound secrets are those not yet claimed by any runtime.
3. If all secrets are already in use, the panel shows: *"No unbound secrets for this environment."*
4. Click the delete icon next to a secret to revoke it.

## Scope differences

The **Runtimes** page behaves differently depending on which level you access it from:

| Level | Shows | Add runtime | Manage secrets |
|-------|-------|-------------|----------------|
| Organization | All runtimes across all projects | Yes | Yes |
| Project | Runtimes in integrations of this project | No | No |
| Integration | Runtimes for this integration only | Yes | Yes |

At the project level, the runtimes page is read-only. Use the organization or integration level to add runtimes and manage secrets.

## What's next

- [Connect an integration to ICP](connect-runtime.md) — generate a secret and configure the runtime bridge
- [Observability setup](observability-setup.md) — enable centralized logs and metrics for connected runtimes
- [Access control](access-control.md) — control who can add and remove runtimes
