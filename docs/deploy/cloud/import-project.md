---
title: Import a project to WSO2 Cloud
---

# Import a project

If you have an existing project created with the WSO2 Integrator IDE in a Git repository, you can import it directly into WSO2 Cloud. During import, you configure each integration in the project and WSO2 Cloud creates them all at once.

:::info Prerequisites
- A project created with the WSO2 Integrator IDE and pushed to a remote Git repository (GitHub, GitLab, Bitbucket, or Azure DevOps).
- A WSO2 Cloud account. Sign up at [WSO2 Cloud](https://console.devant.dev) if you don't have one.

## Connect your Git provider

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. Navigate to the organization overview page by clicking on the organization name at the top. The organization overview lists all your projects.
    ![Organization Overview](/img/deploy/cloud/import-project/organization-overview.png)
3. Click **Import** to import an existing WSO2 Integrator project.
4. Select your Git provider and complete the authorization flow in the browser, then return to WSO2 Cloud.

## Configure and import the project

1. Select the organization that owns the repository.
2. Select the repository and the branch.
3. Set the path to the folder where your project lives within the repository.
4. Optionally, give the project a name.
5. Add the integrations you want to import. For each integration, click **+** next to each integration to add it individually, or click **+** next to the project name to add all integrations in the project at once.
    ![Import Project](/img/deploy/cloud/import-project/import-project.png)
6. For each integration, set the integration name, an optional description, and the integration type.
7. Click **Save** for each integration once configured.
    ![Configure Integration](/img/deploy/cloud/import-project/configure-integration.png)
8. After configuring all integrations, click **Import**.

WSO2 Cloud creates all the integrations and navigates you to the newly created project home.

![Project Home](/img/deploy/cloud/import-project/project-home.png)

## What's next

- [View integrations](/docs/manage/cloud/integrations/viewing-deployed.md) — Inspect build status, deployment status, and configuration for your deployed integrations.
- [Runtime configurations](/docs/manage/cloud/configurations/runtime-configurations.md) — Set configurable values per environment and manage reusable configuration groups.
- [Security configurations](/docs/manage/cloud/configurations/security-configurations.md) — Secure your integration endpoints with API Key or OAuth2 authentication.
- [Endpoint configurations](/docs/manage/cloud/configurations/endpoint-configurations.md) — Control endpoint visibility levels for integrations deployed as Integration as APIs.
