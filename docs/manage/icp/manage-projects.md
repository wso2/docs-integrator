---
title: Manage Projects
---

# Manage Projects

Projects group related integrations. Every integration belongs to exactly one project.

## View Projects

After signing in, the **All Projects** page is the default landing view. Projects display as cards in a grid layout, toggled to a list view with the icons at top-right.

Each card shows:

- Project initial and display name
- Last-updated timestamp
- **Edit** (pencil) and **Delete** (trash) icons

A search bar filters projects by name. A **+ Create** button sits at top-right.

URL pattern: `https://<host>:9446/organizations/default`

## Create a Project

1. On the **All Projects** page, click **+ Create**.
2. The **Create a Project** form appears with three fields in a single row:

| Field            | Required | Description                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------- |
| Display Name     | Yes      | Human-readable name (e.g. `My BI Project`)                                  |
| Name             | Auto     | URL-safe slug derived from the display name (e.g. `my-bi-project`). Click the edit icon to override. |
| Description      | No       | Free-text description (placeholder: *Enter Description here*)               |

3. The **Create** button enables once Display Name is filled.
4. Click **Create**.

On success, ICP redirects to the new project's home page. The breadcrumb updates to show `Organizations › Default Organization › Projects › <project>`.

## Edit a Project

1. On the **All Projects** page, click the **Edit** icon on a project card.
2. The project home page loads with editable fields.
3. Change **Display Name** or **Description**. The **Name** (slug) is read-only after creation.
4. Save changes.

## Delete a Project

1. On the **All Projects** page, click the **Delete** icon on a project card.
2. A confirmation dialog appears:

   > Are you sure you want to delete the project "\<name\>"? This action cannot be undone and will remove all associated data.

3. Type the project's **Display Name** exactly to enable the **Delete Project** button.
4. Click **Delete Project**.

## Project Home

Clicking a project card navigates to the project home. The page shows:

- Project avatar, display name, and description at the top.
- An **Integrations** section with a searchable table and a **+ Create** button.
- An **Integration Types** summary card on the right showing the count of integrations (Total, BI, MI).
- If no integrations exist: *"No integrations found — Create your first integration to get started."*

### Project Sidebar

| Item           | Section        | Description                            |
| -------------- | -------------- | -------------------------------------- |
| Overview       | —              | Integrations list + type breakdown     |
| Runtimes       | —              | Runtimes across all integrations       |
| Logs           | Observability  | Aggregated logs for the project        |
| Metrics        | Observability  | Project-level metrics                  |
| Environments   | Infrastructure | Environments (read-only; managed at org level) |
| Access-control | Management     | Project-level role assignments         |
