---
title: Connect a Git Repository
---

# Connect a Git Repository to WSO2 Cloud

WSO2 Cloud - Integration Platform lets you develop integrations by connecting your GitHub, Bitbucket, GitLab, or Azure DevOps repository. You can connect an existing repository or start with an empty repository and commit your source code later. Connecting a repository enables automatic deployments and workflow automation directly within WSO2 Cloud - Integration Platform.

The following authorization methods are supported for each Git provider:

| Git provider | Authorization method |
|---|---|
| GitHub | OAuth authorization |
| Bitbucket | App password |
| GitLab | Personal access token (PAT) |
| Azure DevOps | Personal access token (PAT) |

WSO2 Cloud - Integration Platform supports both Bitbucket Cloud and Bitbucket Server. The supported Bitbucket Server version is 8.9.2.

## Connect a GitHub repository

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. When creating a new project or integration, select **Authorize with GitHub**.
3. Follow the on-screen prompts to authorize the [WSO2 Cloud App](https://github.com/marketplace/choreo-apps) with your GitHub account.

Authorizing the WSO2 Cloud App grants the following permissions to perform actions on your behalf within the repository:

| Permission | Read | Write | Description |
|---|---|---|---|
| Issues | Y | N | Read integration ID labels to filter pull requests |
| Metadata | Y | N | List repositories |
| Contents | Y | Y | List branches and create a branch to commit sample code |
| Pull Request | Y | Y | Create a pull request when you start with a WSO2 Integrator sample |
| Webhooks | Y | Y | Trigger automatic deployments and configuration generation |

## Connect a Bitbucket repository

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the console header, click the **Organization** list and select your organization.
3. In the left navigation menu under **Admin**, click **Settings**. This opens the organization-level settings page.
4. Click the **Credentials** tab.
5. Click **+ Add Git Credentials**.
6. Enter a **Credential Name** and select **Bitbucket** as the Git provider.
7. Enter your Bitbucket **Username**.
8. Enter the **App Password** obtained from Bitbucket.

    :::tip
    See the [Atlassian documentation](https://support.atlassian.com/bitbucket-cloud/docs/create-an-app-password/) for instructions on creating an app password in Bitbucket.
    :::

9. Click **Save**.

Authorizing with a Bitbucket app password grants the following permissions:

| Permission | Read | Write | Description |
|---|---|---|---|
| Account | Y | N | Get user information and workspace details |
| Repositories | Y | Y | List branches and create a branch to commit sample code |
| Pull Requests | Y | Y | Create a pull request when you start with a WSO2 Integrator sample |
| Webhooks | Y | Y | Trigger automatic deployments and configuration generation |

## Connect a GitLab repository

WSO2 Cloud supports only self-managed GitLab instances.

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the console header, click the **Organization** list and select your organization.
3. In the left navigation menu under **Admin**, click **Settings**. This opens the organization-level settings page.
4. Click the **Credentials** tab.
5. Click **+ Add Git Credentials**.
6. Enter a **Credential Name** and select **GitLab** as the Git provider.
7. Enter the **Server URL** of your GitLab self-managed instance.
8. Enter the **Access Token** obtained from GitLab.

    :::tip
    See the [GitLab documentation](https://docs.gitlab.com/user/profile/personal_access_tokens/#create-a-personal-access-token) for instructions on creating a personal access token in GitLab.
    :::

9. Click **Save**.

Authorizing with a GitLab personal access token grants the following permissions:

| Permission | Description |
|---|---|
| API | Grants full read/write access to the API, covering all groups and projects, as well as read/write access to the repository |

## Connect an Azure DevOps repository

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the console header, click the **Organization** list and select your organization.
3. In the left navigation menu under **Admin**, click **Settings**. This opens the organization-level settings page.
4. Click the **Credentials** tab.
5. Click **+ Add Git Credentials**.
6. Enter a **Credential Name** and select **Azure DevOps** as the Git provider.
7. Enter your Azure DevOps **Organization Name**.
8. Enter the **Access Token** obtained from Azure DevOps.

    :::tip
    See the [Azure DevOps documentation](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows) for instructions on creating a personal access token in Azure DevOps.
    :::

9. Click **Save**.

Authorizing with an Azure DevOps personal access token grants the following permissions:

| Permission | Read | Write | Description |
|---|---|---|---|
| Code | Y | N | View and clone repositories, branches, commits, and pull requests |
| Project and Team | Y | N | Read project-level information, including team details, project settings, and configurations |

## What's next

- [Manage deployment pipelines](./deployment-pipelines.md) — Define the promotion flow of integrations across environments in your organization
- [Configurations overview](../configurations/overview.md) — Manage runtime values and build settings for deployed integrations
- [Environments overview](../environments/overview.md) — Control how integrations are promoted across environments
