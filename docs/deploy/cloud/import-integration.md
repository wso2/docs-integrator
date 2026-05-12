---
title: Import an integration to WSO2 Cloud
---

# Import an integration

If your integration is already in a Git repository, you can import it directly into WSO2 Cloud without going through the WSO2 Integrator IDE. WSO2 Cloud automatically builds and deploys the integration to the Development environment once the import is complete.

:::info Prerequisites
- An integration created with WSO2 Integrator IDE pushed to a remote Git repository (GitHub, GitLab, Bitbucket, or Azure DevOps).
- A WSO2 Cloud account. Sign up at [WSO2 Cloud](https://console.devant.dev) if you don't have one.

## Connect your Git provider

1. Sign in to [WSO2 Cloud](https://console.devant.dev).

   When you sign up for the first time, WSO2 Cloud creates a default project for you. You land on the project home page.

2. On the project home page, click **Import an Integration** and select your Git provider. Alternatively, click your Git provider's icon directly on the home page to authorize it with WSO2 Cloud.

    ![Project Home in WSO2 Cloud](/img/deploy/cloud/import-integration/project-home.png)

3. Complete the authorization flow in the browser and return to WSO2 Cloud.

## Import the integration

1. Select the organization that owns the repository.
2. Select the repository and the branch.
3. Set the path to the folder where your integration lives within the repository.
4. Optionally, add a description.
5. Select the integration type. WSO2 Cloud detects the technology automatically.
6. Click **Create**.

    ![Import Integration](/img/deploy/cloud/import-integration/import-integration.png)

WSO2 Cloud starts the build immediately. Once the build completes, the integration is automatically deployed to the **Development** environment.

## What's next

- [View integrations](/docs/manage/cloud/integrations/viewing-deployed.md) — Inspect build status, deployment status, and configuration for your deployed integrations.
- [Runtime configurations](/docs/manage/cloud/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](/docs/manage/cloud/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](/docs/manage/cloud/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
