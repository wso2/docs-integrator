---
title: Manage Environments
---

# Manage Environments

Environments are managed at the **organization level** and apply globally — every
environment appears as a card on every integration in every project. ICP ships
with two defaults:

| Name | Handler | Type         | Description              |
| ---- | ------- | ------------ | ------------------------ |
| dev  | dev     | Non-Critical | Development environment  |
| prod | prod    | Critical     | Production environment   |

## View Environments

Navigate to **Environments** in the organization sidebar.

The Environments page shows a table with columns:

| Column      | Description                              |
| ----------- | ---------------------------------------- |
| Name        | Display name with initial avatar         |
| Handler     | URL-safe slug                            |
| Description | Free-text description                    |
| Type        | **Critical** or **Non-Critical**         |
| Created     | Relative timestamp (e.g. *31 days ago*)  |
| Action      | **Edit** (pencil) and **Delete** (trash) icons          |

A search bar and **+ Create** button appear at the top. Pagination controls sit
at the bottom.

URL pattern: `https://<host>:9445/organizations/default/environments`

## Create an Environment

1. On the Environments page, click **+ Create**.
2. The **Create Environment** form opens with:

| Field                        | Required | Description                                                      |
| ---------------------------- | -------- | ---------------------------------------------------------------- |
| Name                         | Yes      | Display name (placeholder: *e.g., Staging Environment*).         |
| Handler                      | Auto     | Slug derived from Name (placeholder: *e.g., staging*). Click the edit icon to override. |
| Description                  | No       | Free text.                                                       |
| Mark as Critical Environment | No       | Checkbox. Sets the environment type to **Critical**.              |

3. Click **Create**.

A success toast confirms: *"Environment '\<name\>' created successfully."* ICP
redirects to the Environments list. The new environment immediately appears on
every integration.

A **← Back to Environments** link at the top returns to the list without creating.

## Edit an Environment

1. On the Environments page, click the **Edit** icon on an environment row.
2. The **Edit Environment** form opens with the same fields as Create.
   - **Name**, **Description**, and **Mark as Critical Environment** are editable.
   - **Handler** is read-only after creation.
3. Click **Save**.

## Delete an Environment

1. On the Environments page, click the **Delete** icon on an environment row.
2. A confirmation dialog requires typing the environment name.
3. Click **Delete**.

Deleting an environment removes it from all integrations across all projects,
including any associated runtimes and secrets.

## Environments at Other Levels

Environments also appear in the **project sidebar** under Infrastructure →
Environments. This is a **read-only** view scoped to the project — creation and
editing are only available at the organization level.
