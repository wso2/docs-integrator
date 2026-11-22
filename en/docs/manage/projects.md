---
sidebar_position: 1
title: "Manage Projects"
description: "View, edit, and delete projects on Choreo Integration."
keywords: [choreo integrator, choreo cloud, project, edit project, delete project, project lifecycle]
slug: /manage/projects
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Manage Projects

A project is the top-level container for your integrations on Choreo Integration. This page explains how to view your projects, edit their details, and remove them when they are no longer needed. To create a project, see [Create a project](../develop-and-test/create-workspace/create-a-project.md). To bring one in from a Git repository, see [Import a project](../develop-and-test/create-workspace/import-a-project.md).

## View projects

Click the organization name in the top navigation to open the organization overview. The overview lists all projects in your organization. By default a project named **Default Project** is automatically created on first sign-up.

## Edit a project

1. From the project home, click **Settings**.
2. Update **Project name** or **Description (optional)** as needed.

    <ThemedImage
        alt="Project settings page showing the Project details card"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/manage-project.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/manage-project.png'),
        }}
    />

3. Click **Save changes**.

## Remove a project

:::warning
A project cannot be deleted without deleting all its integrations first.
:::

:::danger
Removing a project is permanent. All history within the project is deleted and cannot be recovered.
:::

1. From the project home, click **Settings**.
2. Scroll to the **Delete project** card and click **Delete project**.

    <ThemedImage
        alt="Delete project card on the project settings page"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/delete-project-button.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/delete-project-button.png'),
        }}
    />

3. Enter the project name to confirm, then confirm the deletion.

    {/* TODO(v3): confirmation dialog not re-captured - opening it risks deleting the project. Verify the button label and re-shoot. */}

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
- [Import a project](../develop-and-test/create-workspace/import-a-project.md) — Bring an existing Choreo Integrator project from a Git repository into Choreo Cloud.
- [Access control](./users-and-access/access-control.md) — Manage roles and permissions for members of your project.
