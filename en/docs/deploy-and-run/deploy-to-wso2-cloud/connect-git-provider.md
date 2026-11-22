---
sidebar_position: 5
title: Connect a Git Provider
description: Learn how to connect a GitHub or Azure DevOps repository to Choreo Integration to build and deploy from your own source.
keywords: [choreo cloud, git, github, azure devops, repository, CI/CD]
slug: /deploy-and-run/deploy-to-wso2-cloud/connect-git-provider
---

# Connect a Git Provider

Choreo Integration lets you develop integrations by connecting your GitHub or Azure DevOps repository. You can connect an existing repository or start with an empty repository and commit your source code later. Connecting a repository lets you build and deploy straight from your own source, with no manual upload step.

The following authorization methods are supported for each Git provider:

| Git provider | Authorization method |
|---|---|
| GitHub | OAuth authorization |
| Azure DevOps | Personal access token (PAT) |

## Connect a GitHub repository

1. Sign in to [Choreo Cloud](https://console.devant.dev/).
2. When creating a new project or integration, select **Authorize with GitHub**.
3. Follow the on-screen prompts to authorize the [Choreo Cloud App](https://github.com/marketplace/choreo-apps) with your GitHub account.

Authorizing the Choreo Cloud App grants the following permissions to perform actions on your behalf within the repository:

| Permission | Read | Write | Description |
|---|---|---|---|
| Issues | Y | N | Read integration ID labels to filter pull requests |
| Metadata | Y | N | List repositories |
| Contents | Y | Y | List branches and create a branch to commit sample code |
| Pull Request | Y | Y | Create a pull request when you start with a Choreo Integrator sample |
| Webhooks | Y | Y | Trigger automatic deployments and configuration generation |

## Connect an Azure DevOps repository

1. Sign in to [Choreo Cloud](https://console.devant.dev/).
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

- [Import a project](../../develop-and-test/create-workspace/import-a-project.md) or [Import an integration](../../develop-and-test/create-workspace/import-an-integration.md) — Bring the connected repository into Choreo Cloud.
- [Configure promotion pipelines](../../manage/environments/configure-promotion-pipelines.md) — Define the ordered sequence of environments a commit is promoted through.
- [Configurations overview](../../manage/configurations/configurations.md) — Manage runtime values and build settings for deployed integrations.
- [Environments overview](../../manage/environments/environments.md) — Control how integrations are promoted across environments.
