---
title: Manage Runtimes
---

# Manage Runtimes

Runtimes are BI (or MI) processes that connect to ICP via heartbeats. The
Runtimes page is available at every level — organization, project, and
integration — each scoped accordingly.

## Runtimes Page

Runtimes are grouped by environment. Each environment section shows:

- **Environment name** and a runtime count badge (e.g. *1 runtime*).
- **Manage Secrets** button — opens the secrets panel for that environment.
- **+ Add Runtime** button — opens the secret generation dialog.
- **Refresh** icon.
- A **Search runtimes…** bar.

### Runtime Table

| Column            | Description                                           |
| ----------------- | ----------------------------------------------------- |
| Runtime Name      | Display name (`-` if not configured)                  |
| Runtime ID        | UUID assigned on first heartbeat                      |
| Type              | BI or MI                                              |
| Component         | Integration name this runtime belongs to              |
| Status            | **RUNNING** (green badge), OFFLINE, etc.              |
| Version           | Runtime version (or `—` if not reported)              |
| Platform          | e.g. *Ballerina 2201.13.2 (Swan Lake Update 13)*     |
| OS                | e.g. *Mac OS X 26.1*                                 |
| Registration Time | Timestamp of first connection                         |
| Last Heartbeat    | Timestamp of most recent heartbeat                    |
| Actions           | **Delete** (trash icon)                                           |

At the **organization level**, the table includes a **Component** column showing
which integration the runtime belongs to. At the **integration level**, this column
is omitted since the scope is already a single integration.

## Add a Runtime

Click **+ Add Runtime** on an environment section to generate a secret and
get a `Config.toml` snippet. See [Connect an Integration to ICP](connect-runtime.md)
for the full procedure.

## Manage Secrets

1. Click **Manage Secrets** on any environment section.
2. A slide-out panel opens: **Secrets: \<env\> environment**.
3. The panel lists unbound secrets (those not yet used by any runtime).
   - If all secrets are bound: *"No unbound secrets for this environment."*
4. From this panel you can revoke unused secrets.

## Scope Differences

| Level        | Shows                                    | Add Runtime | Manage Secrets |
| ------------ | ---------------------------------------- | ----------- | -------------- |
| Organization | All runtimes across all projects         | Yes         | Yes            |
| Project      | Runtimes in integrations of this project | No          | No             |
| Integration  | Runtimes for this integration only       | Yes         | Yes            |

At the **project level**, the Runtimes page is read-only — use the organization or
integration level to add runtimes and manage secrets.
