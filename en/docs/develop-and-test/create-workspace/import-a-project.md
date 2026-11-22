---
sidebar_position: 2
title: Import a Project
description: Import an existing WSO2 Integrator project from a Git repository into WSO2 Cloud.
keywords: [wso2 integrator, wso2 cloud, import, project, git, github, deploy]
slug: /develop-and-test/create-workspace/import-a-project
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Import a Project

If you already have a project created with the WSO2 Integrator editor in a Git repository, import it into WSO2 Cloud to continue working on it. During import, you configure each integration in the project and WSO2 Cloud creates them all at once.

:::tip
If you don't have an existing project and would like to get started on a new project, see [Create a project](create-a-project.md).
:::

:::info Prerequisites
- A project created with the WSO2 Integrator editor and pushed to a remote GitHub repository.
- A WSO2 Cloud account. Sign up at [WSO2 Cloud](https://console.devant.dev) if you don't have one.
:::

## Connect your Git provider

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. Navigate to the organization overview page by clicking the organization name at the top. The organization overview lists all your projects.
3. Click **Import** to import an existing WSO2 Integrator project.

    <ThemedImage
        alt="Import button on the organization overview page"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-button.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-button.png'),
        }}
    />

4. Complete the GitHub authorization flow in the browser, then return to WSO2 Cloud.

## Configure and import the project

1. Select the organization that owns the repository.
2. Select the repository and the branch.
3. Set the path to the folder where your project lives within the repository.
4. Optionally, give the project a name.
5. Add the integrations you want to import. For each integration, click **+** next to each integration to add it individually, or click **+** next to the project name to add all integrations in the project at once.
    <ThemedImage
        alt="Import Project"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-form.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-form.png'),
        }}
    />
6. For each integration, set the integration name, an optional description, and the integration type.
7. Click **Save** for each integration once configured.
    <ThemedImage
        alt="Configure Integration"
        sources={{
            light: useBaseUrl('/img/import-project/import-project-saas-integration-config.png'),
            dark: useBaseUrl('/img/import-project/import-project-saas-integration-config.png'),
        }}
    />
8. After configuring all integrations, click **Import**.

WSO2 Cloud creates all the integrations and navigates you to the newly created project home.

<ThemedImage
    alt="Project Home"
    sources={{
        light: useBaseUrl('/img/import-project/import-project-saas-project-home.png'),
        dark: useBaseUrl('/img/import-project/import-project-saas-project-home.png'),
    }}
/>

## What's next

- [Import an integration](import-an-integration.md) — Add a single integration from a Git repository to a project.
- [View and manage integrations](../../manage/integrations/integrations.md) — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- [Manage projects](../../manage/projects.md) — View, edit, and delete projects on WSO2 Cloud.
- [Runtime configurations](../../manage/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](../../manage/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](../../manage/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
