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

    <ThemedImage
        alt="Project home page with the Settings button highlighted in the top right"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/project-home-settings.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/project-home-settings.png'),
        }}
    />

    The **Project settings** page opens with the project's details, which are shared across every Choreo Labs platform.
2. Update any of the editable fields:

    | Field | Description |
    |---|---|
    | **Project name** | The display name shown in the console. |
    | **Description (optional)** | A short summary of the project's purpose. |
    | **Deployment pipeline** | The pipeline the project's integrations are promoted through. See [Configure promotion pipelines](./environments/configure-promotion-pipelines.md). |

    The **Project handle** and the **Created** date are shown for reference and cannot be changed.

    <ThemedImage
        alt="Project settings page showing the Project details card after saving an updated description, with a confirmation banner"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/manage-project.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/manage-project.png'),
        }}
    />

3. Click **Save changes**. To abandon your edits, click **Discard changes**.

## Remove a project

:::warning
A project must be empty before it can be deleted. Remove every item it holds first, including integrations and any APIs they exposed.
:::

:::danger
Removing a project is permanent. All history within the project is deleted and cannot be recovered.
:::

1. From the project home, click **Settings**.
2. Scroll to the **Delete project** card and click **Delete project**.

    <ThemedImage
        alt="Delete project card at the bottom of the project settings page"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/delete-project-button.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/delete-project-button.png'),
        }}
    />

3. If the project still holds anything, Choreo Cloud lists what remains and blocks the deletion. Close the dialog, remove each item listed, and start again.

    <ThemedImage
        alt="Delete project dialog listing the integrations and APIs that must be removed before the project can be deleted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/projects/delete-project-confirm.png'),
            dark: useBaseUrl('/img/manage/cloud/projects/delete-project-confirm.png'),
        }}
    />

    {/* TODO(v3): the confirmation step for an empty project is not captured - every
        project in the test organization still holds items, and emptying one to reach
        that dialog would destroy real integrations. Verify whether it asks for the
        project name and re-shoot. */}

4. Once the project is empty, confirm the deletion.

The project and all its contents are permanently deleted.

## What's next

- [Create a project](../develop-and-test/create-workspace/create-a-project.md) — Create a new project.
- [Import a project](../develop-and-test/create-workspace/import-a-project.md) — Bring an existing Choreo Integrator project from a Git repository into Choreo Cloud.
- [Access control](./users-and-access/access-control.md) — Manage roles and permissions for members of your project.
