---
sidebar_position: 3
title: Import an Integration
description: Import an integration from a Git repository into Choreo Cloud and deploy it to the Development environment.
keywords: [choreo integrator, choreo cloud, import, git, github, azure devops, deploy]
slug: /develop-and-test/create-workspace/import-an-integration
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Import an Integration

If your integration is already in a Git repository, you can import it directly into Choreo Cloud without going through the Choreo Integrator editor. Choreo Cloud builds it as soon as the import completes, and you deploy it to the **Development** environment from the integration's overview page.

:::info Prerequisites
- An integration created with Choreo Integrator editor pushed to a remote GitHub or Azure DevOps repository.
- A Choreo Cloud account. Sign up at [Choreo Cloud](https://console.cloud.choreolabs.com) if you don't have one.
:::

## Connect your Git provider

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).

   When you sign up for the first time, Choreo Cloud creates a default project for you. You land on the project home page.

2. Open the project you want to import into. On the **Create Integration** page, find **Import a repository from** and click your Git provider's icon. Complete the authorization flow in the browser, then return to Choreo Cloud.

    <ThemedImage
        alt="Create Integration page with the Git provider icons in the Import a repository from row highlighted"
        sources={{
            light: useBaseUrl('/img/import-project/import-integration.png'),
            dark: useBaseUrl('/img/import-project/import-integration.png'),
        }}
    />

    :::note
    One-click OAuth2 authorization is only available for GitHub. To use Azure DevOps, you must first add your credentials at the organization level. See [Connect a Git provider](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md) for instructions.
    :::

## Import the integration

1. Select the **Organization** that owns the repository, then the **Repository** and the **Branch**.
2. If the integration doesn't live at the root of the repository, set **Repository sub path**.
3. Enter an **Integration name**. The **Integration ID** is generated from it, and a **Description** is optional.
4. Under **Technology**, select the technology the integration is built with.
5. Under **Integration type**, select how the integration runs: **Automation**, **AI Agent**, **Integration as API**, **MCP Server**, **Event Integration**, or **File Integration**.
6. Click **Import integration**.

    <ThemedImage
        alt="Import an integration form with the repository, integration details, technology, and integration type filled in"
        sources={{
            light: useBaseUrl('/img/import-project/import-integration-saas-form-new.png'),
            dark: useBaseUrl('/img/import-project/import-integration-saas-form-new.png'),
        }}
    />

    :::tip
    If your integration depends on private packages, select **Add a Ballerina Central token** on the form before you import.
    :::

## Build and deploy

Choreo Cloud opens the integration's overview page and starts the build immediately. Select **View logs** to follow it as it runs.

<ThemedImage
    alt="Integration overview page with the first build in progress and its live logs showing"
    sources={{
        light: useBaseUrl('/img/import-project/import-integration-saas-build.png'),
        dark: useBaseUrl('/img/import-project/import-integration-saas-build.png'),
    }}
/>

When the build reaches **Completed**, select **Deploy** on the **Development** environment. An imported integration isn't deployed automatically.

<ThemedImage
    alt="Integration overview page with a completed build and the Deploy button on the Development environment highlighted"
    sources={{
        light: useBaseUrl('/img/import-project/build-completed.png'),
        dark: useBaseUrl('/img/import-project/build-completed.png'),
    }}
/>

Once the deployment is **Active**, the overview page shows the endpoint URL, the exposed resources, and the security scheme. Select **Test** to call it, or **Generate API key** if it's secured with an API key.

<ThemedImage
    alt="Integration overview page with an active deployment, its endpoint URL, and the API keys panel"
    sources={{
        light: useBaseUrl('/img/import-project/import-integration-saas-deployed.png'),
        dark: useBaseUrl('/img/import-project/import-integration-saas-deployed.png'),
    }}
/>

To keep working on the integration, select **Open in Cloud Editor** at the top right.

## What's next

- [Import a project](import-a-project.md) — Bring a whole project, with several integrations, into Choreo Cloud at once.

- [View and manage integrations](../../manage/integrations/integrations.md) — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- [Runtime configurations](../../manage/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](../../manage/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](../../manage/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.