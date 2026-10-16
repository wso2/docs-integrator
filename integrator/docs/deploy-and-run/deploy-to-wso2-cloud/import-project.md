---
title: Import a Project to WSO2 Cloud
---

# Import a Project

If you have an existing project created with the WSO2 Integrator in a Git repository, you can import it directly into WSO2 Cloud. During import, you configure each integration in the project and WSO2 Cloud creates them all at once.

If you don't have an existing project and would like to get started on a new project, see <CloudDocsLink to="/manage/projects">Managing projects on WSO2 Cloud.

:::info Prerequisites
- A project created with the WSO2 Integrator and pushed to a remote Git repository (GitHub, GitLab, Bitbucket, or Azure DevOps).
- A WSO2 Cloud account. Sign up at [WSO2 Cloud](https://console.devant.dev) if you don't have one.

## Connect your Git provider

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. Navigate to the organization overview page by clicking on the organization name at the top. The organization overview lists all your projects.
    <ThemedImage
        alt="Organization Overview"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/import-project/organization-overview.png'),
            dark: useBaseUrl('/img/deploy/cloud/import-project/organization-overview.png'),
        }}
    />
3. Click **Import** to import an existing WSO2 Integrator project.
4. Select your Git provider and complete the authorization flow in the browser, then return to WSO2 Cloud.

    :::warning
    One-click OAuth2 authorization is only available for GitHub. To use Bitbucket, GitLab, or Azure DevOps, you must first add your credentials at the organization level. See [Connect a Git repository](connect-git-provider.md) for instructions.
    :::

## Configure and import the project

1. Select the organization that owns the repository.
2. Select the repository and the branch.
3. Set the path to the folder where your project lives within the repository.
4. Optionally, give the project a name.
5. Add the integrations you want to import. For each integration, click **+** next to each integration to add it individually, or click **+** next to the project name to add all integrations in the project at once.
    <ThemedImage
        alt="Import Project"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/import-project/import-project.png'),
            dark: useBaseUrl('/img/deploy/cloud/import-project/import-project.png'),
        }}
    />
6. For each integration, set the integration name, an optional description, and the integration type.
7. Click **Save** for each integration once configured.
    <ThemedImage
        alt="Configure Integration"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/import-project/configure-integration.png'),
            dark: useBaseUrl('/img/deploy/cloud/import-project/configure-integration.png'),
        }}
    />
8. After configuring all integrations, click **Import**.

WSO2 Cloud creates all the integrations and navigates you to the newly created project home.

<ThemedImage
    alt="Project Home"
    sources={{
        light: useBaseUrl('/img/deploy/cloud/import-project/project-home.png'),
        dark: useBaseUrl('/img/deploy/cloud/import-project/project-home.png'),
    }}
/>

## What's next

- <CloudDocsLink to="/manage/integrations">View and manage integrations — Inspect build status, deployment status, and manage the lifecycle of your deployed integrations.
- <CloudDocsLink to="/manage/projects">View and manage projects — Create, view, edit, and delete projects on WSO2 Cloud.
- <CloudDocsLink to="/manage/configurations/runtime-configurations">Runtime configurations — Set configurable values per environment and manage reusable configuration groups.
- <CloudDocsLink to="/manage/configurations/security-configurations">Security configurations — Secure your integration endpoints with API Key or OAuth2 authentication.
- <CloudDocsLink to="/manage/configurations/endpoint-configurations">Endpoint configurations — Control endpoint visibility levels for integrations deployed as Integration as APIs.
