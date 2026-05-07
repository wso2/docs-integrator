---
title: ICP Console Overview
---

# ICP Console Overview

## Scope Levels

ICP organizes resources in three nested levels:

**Organization > Project > Integration (Component)**

Each level has its own sidebar, its own access-control scope, and its own
Runtimes view. Deeper levels inherit the environments and roles defined at the
organization level.

## Breadcrumb Bar

The bar at the top tracks the current scope:

```
Organizations > Default Organization > Projects > <project> > Integrations > <integration>
```

- Click any segment to navigate directly to that level.
- The **x** on a segment clears that scope and returns to the parent.
- The **v** dropdown on a segment switches between items at that level (e.g.
  switch projects without going back to the org home).

## Organization Sidebar

The organization home doubles as the **All Projects** page. Its sidebar:

| Item           | Section        | Description                        |
| -------------- | -------------- | ---------------------------------- |
| Overview       | —              | All Projects listing               |
| Runtimes       | —              | All runtimes across the org        |
| Environments   | Infrastructure | Create and manage environments     |
| Access-control | Management     | Org-level users, roles, and groups |

Deeper sidebars (project, integration) are documented in
[Manage Projects](manage-projects.md) and
[Manage Integrations](manage-integrations.md).

## Quick Start

A condensed end-to-end path from install to a connected runtime.

### 1. Create an Environment (optional)

The default **dev** and **prod** environments are usually sufficient to start.
To add another (e.g. *staging*), see
[Manage Environments](manage-environments.md).

### 2. Create a Project

1. On the organization home, click **+ Create**.
2. Enter a **Display Name** (the Name slug is auto-generated).
3. Click **Create**.

Full details: [Manage Projects](manage-projects.md).

### 3. Create a BI Integration

1. Inside the project, click **+ Create**.
2. Enter a **Display Name**. Integration Type defaults to **BI**.
3. Click **Create**.

Full details: [Manage Integrations](manage-integrations.md).

### 4. Connect a Runtime

1. Generate a secret and configure your BI runtime — see [Connect an Integration to ICP](connect-runtime.md).
2. Start the runtime. It appears in the Runtimes table with status **RUNNING**.

Full details: [Manage Runtimes](manage-runtimes.md).
