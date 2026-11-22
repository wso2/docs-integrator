---
sidebar_position: 5
title: Connect a Git Provider
description: Learn how to connect a GitHub repository to WSO2 Cloud - Integration Platform to build and deploy from your own source.
keywords: [wso2 cloud, git, github, repository, CI/CD]
slug: /deploy-and-run/deploy-to-wso2-cloud/connect-git-provider
---

# Connect a Git Provider

WSO2 Cloud - Integration Platform lets you develop integrations by connecting your GitHub repository. You can connect an existing repository or start with an empty repository and commit your source code later. Connecting a repository lets you build and deploy straight from your own source, with no manual upload step.

GitHub repositories are connected through OAuth authorization.

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

## What's next

- [Import a project](../../develop-and-test/create-workspace/import-a-project.md) or [Import an integration](../../develop-and-test/create-workspace/import-an-integration.md) — Bring the connected repository into WSO2 Cloud.
- [Configure promotion pipelines](../../manage/environments/configure-promotion-pipelines.md) — Define the ordered sequence of environments a commit is promoted through.
- [Configurations overview](../../manage/configurations/configurations.md) — Manage runtime values and build settings for deployed integrations.
- [Environments overview](../../manage/environments/environments.md) — Control how integrations are promoted across environments.
