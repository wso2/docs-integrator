---
title: Deploy and Run
---

# Deploy and Run

Once your agent works in WSO2 Agent Builder, this section covers how to ship it and how to run it in production.

You deploy from the **Deploy** panel on an agentic integration's overview, or from the **Deploy** menu on the project overview.

## Deploy

Choose where your agents run. Where you deploy also decides how you [manage](../manage/manage.md) and [observe](../observe/observe.md) them.

<PaletteCard icon="agents" href="/deploy-and-run/deploy-to-agent-manager">
  <h3 class="palette-card-title">Deploy to WSO2 Agent Manager</h3>
  <ul class="palette-card-list">
    <li>Run and manage your organization's agents in one place</li>
    <li>Connect to your Agent Manager instance</li>
    <li>Builds from your GitHub repository</li>
  </ul>

<PaletteCard icon="cloud" href="/deploy-and-run/deploy-to-wso2-cloud">
  <h3 class="palette-card-title">Deploy to WSO2 Cloud</h3>
  <ul class="palette-card-list">
    <li>Fully managed, with no infrastructure to set up</li>
    <li>Deploy one agentic integration or a whole project</li>
    <li>Builds from your Git repository</li>
  </ul>

<PaletteCard icon="server">
  <h3 class="palette-card-title">Self-Hosted Deployment</h3>
  <p class="palette-card-desc">Run integrations on infrastructure you manage.</p>

    <PaletteChip href="/deploy-and-run/self-hosted/containerized-deployment">Containers
    <PaletteChip href="/deploy-and-run/self-hosted/vm-deployment">Virtual machines
    <PaletteChip href="/deploy-and-run/self-hosted/serverless-deployment">Serverless
    <PaletteChip href="/deploy-and-run/self-hosted/graalvm-native-images">GraalVM native images


<PaletteCard icon="deploy-run">
  <h3 class="palette-card-title">CI/CD</h3>
  <p class="palette-card-desc">Automate your deployment pipeline.</p>

    <PaletteChip href="/deploy-and-run/cicd/github-actions">GitHub Actions
    <PaletteChip href="/deploy-and-run/cicd/jenkins">Jenkins
    <PaletteChip href="/deploy-and-run/cicd/gitlab">GitLab
    <PaletteChip href="/deploy-and-run/cicd/azure-devops">Azure DevOps


## Run in production

<PaletteCard icon="tools" href="/deploy-and-run/managing-configurations">
  <h3 class="palette-card-title">Managing Configurations</h3>
  <ul class="palette-card-list">
    <li>Externalize runtime configuration values</li>
    <li>Per-environment files and variables</li>
  </ul>

<PaletteCard icon="security">
  <h3 class="palette-card-title">Secure Integrations</h3>

    <PaletteChip href="/deploy-and-run/secure/runtime-security">Runtime security
    <PaletteChip href="/deploy-and-run/secure/authentication">Authentication
    <PaletteChip href="/deploy-and-run/secure/api-security-rate-limiting">API security
    <PaletteChip href="/deploy-and-run/secure/secrets-encryption">Secrets and encryption
    <PaletteChip href="/deploy-and-run/secure/compliance-considerations">Compliance
    <PaletteChip href="/deploy-and-run/secure/aws-access">AWS access


<PaletteCard icon="manage-observe" href="/manage">
  <h3 class="palette-card-title">Manage</h3>
  <ul class="palette-card-list">
    <li>Configuration and lifecycle of deployed agents</li>
    <li>Integration Control Plane</li>
  </ul>

<PaletteCard icon="metrics" href="/observe">
  <h3 class="palette-card-title">Observe</h3>
  <ul class="palette-card-list">
    <li>Logs, metrics, and traces</li>
  </ul>

## What's next

- [Deploy to WSO2 Agent Manager](deploy-to-agent-manager/deploy-to-agent-manager.md) — Deploy your agent to your Agent Manager instance.
- [Deploy to WSO2 Cloud](deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) — Deploy your agent to the fully managed WSO2 Cloud.
- [Containerized Deployment](self-hosted/containerized-deployment.md) — Run your agent on Docker, Kubernetes, or Red Hat OpenShift.
- [Concepts](../get-started/concepts/concepts.mdx) — Deployment options, environments, and promotion.
