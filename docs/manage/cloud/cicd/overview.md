---
title: CI/CD Overview
---

# CI/CD Overview

WSO2 Cloud - Integration Platform supports a continuous deployment model built around two concepts: Git-triggered deployments and deployment pipelines. Together, these let you automate how integrations move from development to production.

## Git-triggered deployments

You connect your Git repository (GitHub, Bitbucket, GitLab, or Azure DevOps) to WSO2 Cloud once. After that, every commit to the configured branch automatically triggers a build and deployment to the target environment. There is no manual upload step.

WSO2 Cloud uses webhooks to detect pushes and pull request events, so deployments are initiated as part of your normal development workflow.

## Deployment pipelines

A deployment pipeline defines the ordered sequence of environments an integration passes through before reaching production. The default pipeline moves integrations from **Development** to **Production**. You can create additional pipelines to model more complex release processes, such as adding a staging environment or maintaining separate pipelines for different teams or regions.

Pipelines are configured at the organization level and assigned to individual projects. A project can have more than one pipeline active at a time.

## What's next

- [Connect a Git repository](./connect-git-repository.md) — Connect your GitHub, Bitbucket, GitLab, or Azure DevOps repository to enable Git-triggered deployments
- [Manage deployment pipelines](./deployment-pipelines.md) — Create and configure pipelines to control the promotion flow of your integrations
