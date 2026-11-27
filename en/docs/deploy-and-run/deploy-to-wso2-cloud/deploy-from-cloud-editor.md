---
sidebar_position: 1
title: Deploy from the Cloud Editor
description: Create and deploy an integration directly in the browser using the Choreo Cloud editor, without installing the Choreo Integrator editor locally.
keywords: [choreo integrator, choreo cloud, cloud editor, deploy, browser, development environment]
slug: /deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Deploy from the Cloud Editor

Choreo Cloud includes a browser-based editor where you can create and develop integrations without installing anything locally. Once your integration is ready, you can deploy it to Choreo Cloud directly from the editor.

:::info Prerequisites
- A Choreo Cloud account and a project. Sign up at [Choreo Cloud](https://console.cloud.choreolabs.com) if you don't have one.
:::

## Create and open the cloud editor

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com) and open your project.
2. On the project home page, click **New integration**.

   <ThemedImage
       alt="Choreo Cloud project home showing the New integration option"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
       }}
   />

3. Select the integration type, then select the Git provider, the organization, and the repository where the integration will be saved. When you pick the repository, if it is not empty, make sure you provide an empty path.

   If you don't have a repository ready, click **Create New Repository** to create one.

   If Choreo Cloud does not have access to the repository, click **Connect More Repositories** and grant access. This is required only if you have not already authorized Choreo Cloud to access all repositories in your organization.

   <ThemedImage
       alt="Create Integration in Choreo Cloud form with Git provider, organization, repository, branch, and path fields"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/adding-source-control.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/adding-source-control.png'),
       }}
   />

4. Click **Create**.

   The cloud editor opens in a new browser tab, with your integration ready to develop.

## Develop your integration

Develop your integration in the cloud editor as you would in the Choreo Integrator editor. You can add artifacts, configure connections, define data mappers, and more.

## Save and deploy

1. In the cloud editor, open the integration overview for the integration you want to deploy.
2. In the **Deploy to Choreo Cloud** panel on the right, click **Save and Deploy**.

   <ThemedImage
       alt="Integration overview in the cloud editor with the Save and Deploy button"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/integration-overview.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/integration-overview.png'),
       }}
   />

Choreo Cloud pushes the integration to the repository you configured when you created it, builds it, and deploys it to the **Development** environment.

{/* TODO(v3): this section was reordered based on 3 screenshots provided this pass (project home with "New integration" instead of the old "Create on Cloud" beta card, a "Create Integration in Choreo Cloud" form asking for Git provider/org/repo/branch/path up front, and the same Save and Deploy panel as before) - not independently re-walked live end to end this session. Worth confirming there's no way to skip repository selection at creation time and defer it to deploy time instead, and whether "Connect More Repositories" is the exact live wording (previously documented as "Connect Newly Created Repository"). */}

## What's next

- [View and manage integrations](../../manage/integrations/integrations.md) — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- [Runtime configurations](../../manage/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](../../manage/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](../../manage/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
