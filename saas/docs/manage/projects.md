---
title: Manage Projects
---

# Manage Projects

A project is the top-level container for your integrations on WSO2 Cloud - Integration Platform. This page explains how to view your projects, edit their details, and remove them when they are no longer needed. To create a project, see [Create a project](../develop-and-test/create-workspace/create-a-project.md). To bring one in from a Git repository, see [Import a project](../develop-and-test/create-workspace/import-a-project.md).

## View projects

Click **Organization** in the top navigation to open the organization overview. The overview lists all projects in your organization. By default a project named **Default** is automatically created on first sign-up.

## Edit a project

1. From the project home, go to **Admin** > **Settings**.
2. Update the **Name** or **Description** as needed by clicking the respective fields.

    <ThemedImage
        alt="Project Overview"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/manage-project.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/manage-project.png'),
        }}
    />

3. Save your changes.

## Remove a project

A project cannot be deleted without deleting all its integrations first.

Removing a project is permanent. All history within the project is deleted and cannot be recovered.

1. From the project home, go to **Admin** > **Settings**.
2. Click **Remove Project** on the right side of the page.

    <ThemedImage
        alt="Remove Project button on the project settings page"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/delete-project-button.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/delete-project-button.png'),
        }}
    />

3. Enter the project name to confirm, then click **Delete**.

    <ThemedImage
        alt="Confirmation dialog for removing a project"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/delete-project-confirm.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/delete-project-confirm.png'),
        }}
    />

The project and all its contents are permanently deleted.

## What's next

- [Create a project](../develop-and-test/create-workspace/create-a-project.md) — Create a new project.
- [Import a project](../develop-and-test/create-workspace/import-a-project.md) — Bring an existing WSO2 Integrator project from a Git repository into WSO2 Cloud.
- [Access control](./users-and-access/access-control.md) — Manage roles and permissions for members of your project.
