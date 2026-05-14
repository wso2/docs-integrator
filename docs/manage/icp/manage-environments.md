---
title: Manage Environments
---

# Manage Environments

Environments represent the deployment targets where integration runtimes run, such as development and production. They are managed at the organization level and apply globally, meaning every environment appears as a card on every integration across all projects. This page guides you through creating, editing, and deleting environments in the ICP console.

ICP ships with two default environments:

| Name | Handler | Type | Description |
|------|---------|------|-------------|
| `dev` | `dev` | Non-Critical | Development environment |
| `prod` | `prod` | Critical | Production environment |

## View environments

Navigate to **Environments** in the organization sidebar.

The environments page shows a table with the following columns:

| Column | Description |
|--------|-------------|
| **Name** | Display name with initial avatar |
| **Handler** | URL-safe slug used to identify the environment in configurations |
| **Description** | Free-text description |
| **Type** | **Critical** or **Non-Critical** |
| **Created** | Relative timestamp (e.g. *31 days ago*) |
| **Actions** | **Edit** (pencil) and **Delete** (trash) icons |

Use the search bar to filter environments by name. Pagination controls appear at the bottom when the list exceeds one page.

## Create an environment

1. On the environments page, click **+ Create**.
2. Fill in the **Create Environment** form:

   | Field | Required | Description |
   |-------|----------|-------------|
   | **Name** | Yes | Display name shown in the console (e.g. `Staging Environment`) |
   | **Handler** | Auto | URL-safe slug derived from the name (e.g. `staging`). Click the edit icon to override. |
   | **Description** | No | Optional free-text description |
   | **Mark as critical environment** | No | When checked, sets the environment type to **Critical** |

3. Click **Create**.

A success message confirms the environment was created. ICP returns to the environments list and the new environment immediately appears on every integration across all projects.

## Edit an environment

1. On the environments page, click the **Edit** icon on an environment row.
2. Update **Name**, **Description**, or the **Mark as critical environment** setting. The **Handler** is read-only after creation.
3. Click **Save**.

## Delete an environment

1. On the environments page, click the **Delete** icon on an environment row.
2. Type the environment name in the confirmation dialog to confirm.
3. Click **Delete**.

Deleting an environment removes it from all integrations across all projects, including any associated runtimes and configuration. This action cannot be undone.

## Environments in project scope

Environments also appear under **Environments** in the project sidebar. This is a read-only view scoped to the project. Creating and editing environments is only available at the organization level.

## What's next

- [Manage projects](manage-projects.md) — organize integrations into projects that use these environments
- [Connect an integration to ICP](connect-runtime.md) — register a runtime against a specific environment
- [Access control](access-control.md) — control who can create and manage environments
