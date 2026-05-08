---
title: Deploy from the cloud editor
---

# Deploy from the cloud editor

WSO2 Cloud includes a browser-based editor where you can create and develop integrations without installing anything locally. Once your integration is ready, you can deploy it to WSO2 Cloud directly from the editor.

:::info Prerequisites
- A WSO2 Cloud account and a project. Sign up at [WSO2 Cloud](https://console.devant.dev) if you don't have one.

## Open the cloud editor

1. Sign in to [WSO2 Cloud](https://console.devant.dev) and open your project.
2. On the project home page, click **Create on Cloud**.

   ![WSO2 Cloud project home showing the Create on Cloud option](/img/deploy/cloud/deploy-from-cloud-editor/project-home.png)

   The cloud editor opens in a new browser tab.

## Develop your integration

Develop your integration in the cloud editor as you would in the WSO2 Integrator IDE. You can add artifacts, configure connections, define data mappers, and more.

## Save and deploy

1. In the cloud editor, open the integration overview for the integration you want to deploy.
2. In the **Deploy to WSO2 Cloud** panel on the right, click **Save and Deploy**.

   ![Integration overview in the cloud editor with the Save and Deploy button](/img/deploy/cloud/deploy-from-cloud-editor/integration-overview.png)

   A **Deploy Integration** tab opens within WSO2 Integrator.

3. Select the Git provider, then the organization, and then the repository where the integration will be saved. When you pick the repository, if it is not empty, make sure you provide an empty path.

   If you don't have a repository ready, click **Create New Repository** to create one.

   If WSO2 Cloud does not have access to the repository, click **Connect Newly Created Repository** and grant access. This is required only if you have not already authorized WSO2 Cloud to access all repositories in your organization.

   ![Deploy Integration tab showing repository configuration](/img/deploy/cloud/deploy-from-cloud-editor/adding-source-control.png)

4. Click **Deploy**.

WSO2 Cloud pushes the integration to the repository, builds it, and deploys it to the **Development** environment.

## What's next

- [View integrations](/docs/manage/cloud/integrations/viewing-deployed.md) — Inspect build status, deployment status, and configuration for your deployed integrations.
- [Runtime configurations](/docs/manage/cloud/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](/docs/manage/cloud/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](/docs/manage/cloud/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
