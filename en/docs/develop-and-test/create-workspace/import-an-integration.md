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

If your integration is already in a Git repository, you can import it directly into Choreo Cloud without going through the Choreo Integrator editor. Choreo Cloud automatically builds and deploys the integration to the Development environment once the import is complete.

:::info Prerequisites
- An integration created with Choreo Integrator editor pushed to a remote GitHub or Azure DevOps repository.
- A Choreo Cloud account. Sign up at [Choreo Cloud](https://console.cloud.choreolabs.com) if you don't have one.
:::

## Connect your Git provider

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).

   When you sign up for the first time, Choreo Cloud creates a default project for you. You land on the project home page.

2. On the project home page, click **Import an Integration** and select your Git provider. Alternatively, click your Git provider's icon directly on the home page to authorize it with Choreo Cloud.

    <ThemedImage
        alt="Project Home in Choreo Cloud"
        sources={{
            light: useBaseUrl('/img/create-project/create-project-saas-landing.png'),
            dark: useBaseUrl('/img/create-project/create-project-saas-landing.png'),
        }}
    />

    <ThemedImage
        alt="Click Import Integration"
        sources={{
            light: useBaseUrl('/img/import-project/import-integration.png'),
            dark: useBaseUrl('/img/import-project/import-integration.png'),
        }}
    />

3. Select your Git provider and complete the authorization flow in the browser, then return to Choreo Cloud.

    :::note
    One-click OAuth2 authorization is only available for GitHub. To use Azure DevOps, you must first add your credentials at the organization level. See [Connect a Git provider](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md) for instructions.
    :::

## Import the integration

1. Select the organization that owns the repository.
2. Select the repository and the branch.
3. Set the path to the folder where your integration lives within the repository.
4. Optionally, add a description.
5. Select the integration type. Choreo Cloud detects the technology automatically.
6. Click **Create**.

    <ThemedImage
        alt="Import Integration"
        sources={{
            light: useBaseUrl('/img/import-project/import-integration-saas-form-new.png'),
            dark: useBaseUrl('/img/import-project/import-integration-saas-form-new.png'),
        }}
    />

    <ThemedImage
        alt="Build Integration"
        sources={{
            light: useBaseUrl('/img/import-project/build-completed.png'),
            dark: useBaseUrl('/img/import-project/build-completed.png'),
        }}
    />

Choreo Cloud starts the build immediately. Once the build completes, the integration is automatically deployed to the **Development** environment.

## What's next

- [Import a project](import-a-project.md) — Bring a whole project, with several integrations, into Choreo Cloud at once.

- [View and manage integrations](../../manage/integrations/integrations.md) — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- [Runtime configurations](../../manage/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](../../manage/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](../../manage/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.