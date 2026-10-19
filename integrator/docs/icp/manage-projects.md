---
title: Manage Projects
---

# Manage Projects

Projects group related integrations under a shared context. Every integration belongs to exactly one project, and access control, logs, and metrics are all scoped to the project level. This page guides you through creating, editing, and navigating projects in the ICP console.

## View projects

After signing in, the **All Projects** page is the default landing view. Projects display as cards in a grid layout. Use the icons at the top right to switch between grid and list views.

<ThemedImage
    alt="All Projects page showing three project cards — Order Service, Payment Service, and Shipping Service — in a grid layout with a Create Project button at the top right."
    sources={{
        light: useBaseUrl('/img/manage/icp/all-projects-light-v5.1.png'),
        dark: useBaseUrl('/img/manage/icp/all-projects-light-v5.1.png'),
    }}
/>

Each project card shows:

- Project initial and display name
- Last-updated timestamp
- **Edit** (pencil) and **Delete** (trash) icons

Use the search bar to filter projects by name.

## Create a project

1. On the **All Projects** page, click **+ Create Project**.
2. Fill in the **Create a Project** form:

   | Field | Required | Description |
   |-------|----------|-------------|
   | **Display Name** | Yes | Human-readable name shown in the console (e.g. `Order Service`) |
   | **Name** | Auto | URL-safe slug derived from the display name. Click the edit icon to override. |
   | **Description** | No | Optional free-text description of the project |

3. Click **Create**.

ICP redirects to the new project's home page and updates the breadcrumb to `Organizations > Default Organization > Projects > <project>`.

## Edit a project

1. On the **All Projects** page, click the **Edit** icon on a project card.
2. Update the **Name** (the display name) or **Description**. The **Handler** (the URL-safe name set at creation) is read-only.
3. Click **Save**.

## Delete a project

1. On the **All Projects** page, click the **Delete** icon on a project card.
2. Read the confirmation dialog and type the project's display name exactly to confirm.
3. Click **Delete Project**.

You can only delete a project that has no integrations. Delete each integration in the project first; otherwise the deletion fails with "Cannot delete project. Project contains components that must be deleted first." This action cannot be undone.

## Project home

Clicking a project card opens the project home. It shows all integrations belonging to the project.

<ThemedImage
    alt="Order Service project home showing the integrations list with Order Create and Order Process entries, a Create Integration button, and an Integration Types summary card on the right."
    sources={{
        light: useBaseUrl('/img/manage/icp/project-integrations-light-v5.1.png'),
        dark: useBaseUrl('/img/manage/icp/project-integrations-light-v5.1.png'),
    }}
/>

The page includes:

- Project avatar, display name, and description at the top.
- An **Integrations** table with **Name**, **Description**, **Type** (the integration type, such as Integration as API or Automation; blank if not set), **Technology** (WSO2 Integrator or WSO2 Integrator: MI), **Last Updated** and **Actions** (Edit and Delete) columns.
- A **+ Create Integration** button to add a new integration to the project.
- An **Integration Types** summary card on the right showing the number of integrations of each integration type (such as Integration as API or Automation), plus the **Total**. Integrations without an integration type are counted only in the total.

If no integrations exist yet, the table shows a prompt to create the first integration.

### Project sidebar

The sidebar changes to project scope when you navigate into a project:

| Item | Description |
|------|-------------|
| **Overview** | Integrations list and integration type breakdown |
| **Runtimes** | Runtimes across all integrations in the project |
| **Workflows** | Durable workflows and their executions. See [Manage workflows](manage-workflows/manage-workflows.md). |
| **Human Tasks** | Human tasks that workflows are waiting on. See [Complete human tasks](manage-workflows/complete-human-tasks.md). |
| **Logs** | Aggregated logs for all runtimes in the project |
| **Metrics** | Project-level performance metrics |
| **Environments** | Organization-level environments, which users with permission can also manage from here |
| **Access control** | Role assignments scoped to this project |

## What's next

- [Manage integrations](manage-integrations.md) — view and manage integrations within a project
- [Manage runtimes](manage-runtimes.md) — monitor runtime status across the project
- [Access control](access-control.md) — assign roles and permissions at the project level
