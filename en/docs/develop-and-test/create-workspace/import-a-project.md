---
sidebar_position: 2
title: Import a Project
description: Import an existing Choreo Integrator project from a Git repository into Choreo Cloud.
keywords: [choreo integrator, choreo cloud, import, project, git, github, azure devops, deploy]
slug: /develop-and-test/create-workspace/import-a-project
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Import a Project

If you already have a project created with the Choreo Integrator editor in a Git repository, import it into Choreo Cloud to continue working on it. During import, you configure each integration in the project and Choreo Cloud creates them all at once.

:::tip
If you don't have an existing project and would like to get started on a new project, see [Create a project](create-a-project.md).
:::

:::info Prerequisites
- A project created with the Choreo Integrator editor and pushed to a remote GitHub or Azure DevOps repository.
- A Choreo Cloud account. Sign up at [Choreo Cloud](https://console.cloud.choreolabs.com) if you don't have one.
:::

## Connect your Git provider

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. Click the organization name at the top to open the organization overview, then click **All projects**. You can also select **Projects** in the left navigation.

    <ThemedImage
        alt="Organization overview with the All projects link highlighted below the list of projects"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-all-projects.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-all-projects.png'),
        }}
    />

3. On the **All projects** page, click **Import project**.

    <ThemedImage
        alt="All projects page with the Import project button highlighted"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-button.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-button.png'),
        }}
    />

4. Choose how to reach your repository:

    - **Connect a public GitHub repository** — Use a public repository without authorizing anything.
    - **Authorize with GitHub** — Authorize Choreo Cloud with GitHub to reach your private repositories. Complete the flow in the browser, then return to Choreo Cloud.
    - **Authorize with Azure DevOps** — Available once you add Azure DevOps credentials at the organization level. See [Connect a Git provider](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md).

    <ThemedImage
        alt="Import a project page showing the options to connect a public GitHub repository or authorize with a Git provider"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-providers.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-providers.png'),
        }}
    />

    :::note
    Import currently supports **Choreo Integrator: Default** projects only. Bitbucket and GitLab appear in the list but aren't available yet.
    :::

5. If you authorize with GitHub and the Choreo GitHub App isn't installed on the account that owns your repository, click **Install GitHub App**, install it on that account or organization, and authorize again.

    <ThemedImage
        alt="Prompt to install the GitHub App before the organization and repository can be selected"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-install-github-app.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-install-github-app.png'),
        }}
    />

## Configure and import the project

1. Select the **Organization** that owns the repository, then the **Repository** and the **Branch**.
2. If the project doesn't live at the root of the repository, set **Repository sub path**. Choreo Cloud confirms the workspace it finds below the field.
3. Under **Project details**, enter a **Project name**. The **Project ID** is generated from it and can be edited, and a **Description** is optional.
4. Under **Configure integrations**, add the integrations you want to import from the **Workspace directories** tree. Click **+** next to a directory to add it on its own, or **+** next to the workspace root to add every integration at once.

    <ThemedImage
        alt="Import a project form with the repository selected and the plus button on the workspace root highlighted"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-form.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-form.png'),
        }}
    />

5. Each integration you add appears under **Configured integrations**. Edit its display name, check the detected **Integration type**, and remove any you don't want. The path each one was found at is shown beside it.
6. Click **Import project**.

    <ThemedImage
        alt="Configured integrations table with display names and integration types set, and the Import project button active"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-integration-config.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-integration-config.png'),
        }}
    />

Choreo Cloud creates all the integrations and opens the new project's overview, which lists them alongside the repository it imported them from.

<ThemedImage
    alt="Overview of the imported project listing its integrations and linking to the source repository"
    sources={{
        light: useBaseUrl('/img/import-project/import-project-saas-project-home.png'),
        dark: useBaseUrl('/img/import-project/import-project-saas-project-home.png'),
    }}
/>

## Continue developing the project

To carry on working on the imported project, click **Open in Cloud Editor** on the project overview. The project opens in the browser-based cloud editor, where you can edit it in low-code or pro-code view and push your changes back to the repository.

<ThemedImage
    alt="Imported project overview with the Open in Cloud Editor button highlighted"
    sources={{
        light: useBaseUrl('/img/import-project/import-project-saas-cloud-editor.png'),
        dark: useBaseUrl('/img/import-project/import-project-saas-cloud-editor.png'),
    }}
/>

## What's next

- [Import an integration](import-an-integration.md) — Add a single integration from a Git repository to a project.
- [View and manage integrations](../../manage/integrations/integrations.md) — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- [Manage projects](../../manage/projects.md) — View, edit, and delete projects on Choreo Cloud.
- [Runtime configurations](../../manage/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](../../manage/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](../../manage/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
