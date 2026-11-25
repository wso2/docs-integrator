---
title: Deploy Your Integration
description: Get integrations onto Choreo Cloud, then keep them configured and running once they're live.
sidebar_position: 0
sidebar_label: Ways to Deploy
slug: /deploy-and-run/deploy-to-wso2-cloud
---

# Deploy Your Integration

Choreo Cloud is a fully managed platform that builds and runs your integrations from a Git repository. There are three ways to get your integrations onto Choreo Cloud, depending on where your work lives.

## Deploy

- **[Deploy from the editor](deploy-from-editor.md)** — Push a single integration or a whole project from the Choreo Integrator editor.
- **[Deploy from the cloud editor](deploy-from-cloud-editor.md)** — Build and deploy directly in the browser-based cloud editor, without installing anything locally.

You can also [import a project](../../develop-and-test/create-workspace/import-a-project.md) or [import an integration](../../develop-and-test/create-workspace/import-an-integration.md) from an existing repository. Importing connects it to a GitHub or Azure DevOps repository, so you can build and deploy from your own source with no manual upload step. See [Connect a Git provider](connect-git-provider.md).

## Once you're deployed

- **[Runtime configurations](../../manage/configurations/runtime-configurations.md)** — Set the configurable values an integration reads, per environment, and store sensitive ones as secrets.
- **[Troubleshoot deployment](troubleshoot-deployment.md)** — Diagnose issues that only appear once an integration is running on Choreo Cloud.
