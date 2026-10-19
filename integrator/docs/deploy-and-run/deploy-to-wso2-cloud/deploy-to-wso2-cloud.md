---
title: Deploy from WSO2 Integrator
---

# Deploy from WSO2 Integrator

You can deploy your integrations to WSO2 Cloud directly from the WSO2 Integrator editor. You can deploy the entire project at once or deploy a single integration individually.

:::info Prerequisites
- An integration or project with integration(s) created in the WSO2 Integrator editor.

## Deploy the whole project

1. In the WSO2 Integrator editor, open the project overview canvas.

    <ThemedImage
        alt="Project Overview"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/deploy-from-editor/project-overview.png'),
            dark: useBaseUrl('/img/deploy/cloud/deploy-from-editor/project-overview.png'),
        }}
    />

2. Under **Deployment Options** in the right column, locate the **Deploy to WSO2 Cloud** box and click **Deploy**.
3. If you are not already signed in to WSO2 Cloud, the editor prompts you to sign in. Click **Sign In** and complete the authentication in the browser, then return to the editor.
4. When prompted, select the organization on WSO2 Cloud. You can select an existing project or click **Create New** to create one.

   A new tab opens showing your project's integrations. By default, all integrations are selected for deployment.

    <ThemedImage
        alt="Deploying Integrations to WSO2 Cloud - Set up a Repository"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/deploy-from-editor/deploy-tab.png'),
            dark: useBaseUrl('/img/deploy/cloud/deploy-from-editor/deploy-tab.png'),
        }}
    />

5. If your project is not yet connected to a remote repository, you will see a warning as shown below. You will need to set one up before continuing. If it is already connected, skip to step 6.

    <ThemedImage
        alt="Deploying Integrations to WSO2 Cloud"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/deploy-from-editor/deploy-tab-setup-repository.png'),
            dark: useBaseUrl('/img/deploy/cloud/deploy-from-editor/deploy-tab-setup-repository.png'),
        }}
    />

    a. In the WSO2 Integrator editor, click **Source Control** in the left sidebar.

    b. Click **Initialize Repository**. This creates a local Git repository inside your project folder.

    c. In the **Source Control** sidebar, type a commit message and click **Commit**. When prompted, click **Yes** to stage and commit all files.

    d. Click **Publish**. If you are not signed in to GitHub, the editor prompts you to authorize access. Complete the sign-in in the browser and return to the editor.

    e. When prompted, select a repository name and visibility (**Public** or **Private**). The editor creates the repository on GitHub and pushes your code to it.

6. If WSO2 Cloud does not have access to your remote repository, a warning appears. Click the link to grant access on GitHub, complete the authorization, then return to the editor and click **Refresh** to validate access.
7. Click **Deploy All**.

   WSO2 Cloud creates the integrations. Once the deployment is complete, click **View in Console**.

A browser opens showing your project on WSO2 Cloud.

<ThemedImage
    alt="WSO2 Cloud Project Home"
    sources={{
        light: useBaseUrl('/img/deploy/cloud/deploy-from-editor/project-page-wso2-cloud.png'),
        dark: useBaseUrl('/img/deploy/cloud/deploy-from-editor/project-page-wso2-cloud.png'),
    }}
/>

## Deploy a single integration

1. In the WSO2 Integrator editor, open the integration overview canvas for the integration you want to deploy.
2. Under **Deployment Options** in the right column, locate the **Deploy to WSO2 Cloud** box and click **Deploy**.
3. Follow the same steps as the whole-project flow, and click **Deploy**.

   Once the deployment is complete, click **View in Console**.

A browser opens showing the deployed integration directly on WSO2 Cloud.

## Other ways to deploy

- **[Import a project](import-project.md)** — Import a whole WSO2 Integrator project and configure all its integrations at once.
- **[Import an integration](import-integration.md)** — Import a single integration from an existing repository.
- **[Deploy from the cloud editor](deploy-from-cloud-editor.md)** — Build and deploy directly in the browser-based cloud editor, without installing anything locally.

Importing a project or integration connects it to a Git repository. From then on, every commit to the configured branch builds and deploys automatically. GitHub connects with one click; for Bitbucket, GitLab, or Azure DevOps, see [Connect a Git provider](connect-git-provider.md) first.

## What's next

- <CloudDocsLink to="/manage/integrations">View and manage integrations — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- <CloudDocsLink to="/manage/configurations/runtime-configurations">Runtime configurations — Set configurable values per environment and manage reusable configuration groups.
- <CloudDocsLink to="/manage/configurations/security-configurations">Security configurations — Secure your integration endpoints with API Key or OAuth2 authentication.
- <CloudDocsLink to="/manage/configurations/endpoint-configurations">Endpoint configurations — Control endpoint visibility levels for integrations deployed as Integration as APIs.
- [Managing configurations](../managing-configurations.md) — Externalize and manage runtime configuration values across environments.
