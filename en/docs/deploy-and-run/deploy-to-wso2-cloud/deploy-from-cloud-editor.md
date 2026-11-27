---
sidebar_position: 1
title: Deploy from the Cloud Editor
description: Deploy an integration to Choreo Cloud directly from the browser-based cloud editor.
keywords: [choreo integrator, choreo cloud, cloud editor, deploy, browser, development environment]
slug: /deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Deploy from the Cloud Editor

Choreo Cloud includes a browser-based editor where you can develop integrations without installing anything locally. Once your integration is ready, you can deploy it to Choreo Cloud directly from the editor.

:::info Prerequisites
- A Choreo Cloud account, a project, and an integration open in the cloud editor. See [Create a Project](../../develop-and-test/create-workspace/create-a-project.md).
:::

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

3. In the **Create Integration in Choreo Cloud** form, select the Git provider, the organization, and the repository where the integration will be saved. When you pick the repository, if it is not empty, make sure you provide an empty path.

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

Choreo Cloud pushes the integration to the repository, builds it, and deploys it to the **Development** environment. The integration now appears in the project's integration listing.

<ThemedImage
    alt="Project overview listing the deployed Integration as API alongside the integration count by type"
    sources={{
        light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/integration-listing.png'),
        dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/integration-listing.png'),
    }}
/>

{/* TODO(v3): didn't verify live whether this Create Integration in Choreo Cloud form appears only the first time you deploy an integration that isn't yet connected to a repository, or every time you click Save and Deploy. Also didn't verify "Connect More Repositories" is the exact live wording (previously documented as "Connect Newly Created Repository"). */}

## What's next

- [View and manage integrations](../../manage/integrations/integrations.md) — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- [Runtime configurations](../../manage/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](../../manage/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](../../manage/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
