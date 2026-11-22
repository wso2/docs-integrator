---
sidebar_position: 1
title: Create a Project
description: Create a project on Choreo Cloud to organize your integrations.
slug: /develop-and-test/create-workspace/create-a-project
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Create a Project

A project is the top-level container for your integrations on Choreo Cloud. Use projects to group related integrations and manage them together. Choreo Cloud creates a project named **Default** when you first sign up, and you can create more at any time.

:::tip
If your project already exists in a Git repository, import it instead. See [Import a project](import-a-project.md).
:::

## Create the project

1. Sign in to [Choreo Cloud](https://cloud-console-development.gateway.dev.cloud.wso2.com) and click the organization name in the top navigation to open the organization overview. It lists the projects in your organization.
2. Click **+ Create project**.

    <ThemedImage
        alt="Organization overview with the Create project button"
        sources={{
            light: useBaseUrl('/img/create-project/create-project-saas-button.png'),
            dark: useBaseUrl('/img/create-project/create-project-saas-button.png'),
        }}
    />

3. In the **Create a project** form, enter the project details:

    | Field | Description |
    |---|---|
    | **Name** | A human-readable label shown in the console. |
    | **Project ID** | A unique identifier for the project. It is generated from the name, and you can edit it. It must be unique within the organization. It cannot be changed later. |
    | **Description (Optional)** | A short summary of the project's purpose. |

    <ThemedImage
        alt="Create a project form with Name, Project ID, and Description fields"
        sources={{
            light: useBaseUrl('/img/create-project/create-project-saas-form.png'),
            dark: useBaseUrl('/img/create-project/create-project-saas-form.png'),
        }}
    />

4. Click **Create**.

Choreo Cloud creates the project and opens the project home. To link a Git repository to the project, click **Link a repository** on the project home. See [Connect a Git provider](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md).

## Add integrations to the project

The project overview, which a new project opens on, offers several ways to add your first integration:

<ThemedImage
    alt="Project overview with Create an integration on Cloud, Import your own integration, and the Start quickly panel"
    sources={{
        light: useBaseUrl('/img/create-project/create-project-saas-landing.png'),
        dark: useBaseUrl('/img/create-project/create-project-saas-landing.png'),
    }}
/>

- **Open Cloud Editor** — Build an integration in the browser-based cloud editor, without installing anything locally. See [Deploy from the cloud editor](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md).
- **Import a repository from** — Connect a Git provider and bring in an existing integration. See [Import an integration](import-an-integration.md).
- **Start quickly** — Start from a prebuilt integration or a sample. See [Pre-built integrations](../../get-started/prebuilt-integrations.md) and [Start with sample integrations](start-with-sample-integrations.md).

## What's next

- [Import a project](import-a-project.md) — Bring an existing project from a Git repository
- [Import an integration](import-an-integration.md) — Bring a single integration from a Git repository
- [Manage projects](../../manage/projects.md) — View, edit, and delete projects
