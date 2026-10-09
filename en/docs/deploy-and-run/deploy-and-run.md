---
sidebar_position: 0
sidebar_label: Overview
title: Deploy and Run
description: Learn about the different deployment options for your WSO2 Integrator projects, and how to run them in production.
keywords: [wso2 integrator, deployment, wso2 cloud, docker, kubernetes, vm-based deployment, integration control plane]
slug: /deploy-and-run
hide_table_of_contents: true
wide_layout: true
---

# Deploy and Run

Once your integration is ready, this section covers how to ship it and how to run it in production.

## Deploy

Choose where your integrations run. Where you deploy also decides how you [manage](../manage.md) and [observe](../observe/observe.md) them.

<PaletteGrid>

<PaletteCard icon="cloud" href="/deploy-and-run/deploy-to-wso2-cloud">
  <h3 class="palette-card-title">Deploy to WSO2 Cloud</h3>
  <ul class="palette-card-list">
    <li>Deploy from the editor or the cloud editor</li>
    <li>Import a project or integration from Git</li>
    <li>Connect a Git provider</li>
  </ul>
</PaletteCard>

<PaletteCard icon="server">
  <h3 class="palette-card-title">Self-Hosted Deployment</h3>
  <p class="palette-card-desc">Run integrations on infrastructure you manage.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/deploy-and-run/self-hosted/containerized-deployment">Containers</PaletteChip>
    <PaletteChip href="/deploy-and-run/self-hosted/vm-deployment">Virtual machines</PaletteChip>
    <PaletteChip href="/deploy-and-run/self-hosted/serverless-deployment">Serverless</PaletteChip>
    <PaletteChip href="/deploy-and-run/self-hosted/graalvm-native-images">GraalVM native images</PaletteChip>
    <PaletteChip href="/aws">AWS</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="deploy-run">
  <h3 class="palette-card-title">CI/CD</h3>
  <p class="palette-card-desc">Automate your deployment pipeline.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/deploy-and-run/cicd/github-actions">GitHub Actions</PaletteChip>
    <PaletteChip href="/deploy-and-run/cicd/jenkins">Jenkins</PaletteChip>
    <PaletteChip href="/deploy-and-run/cicd/gitlab">GitLab</PaletteChip>
    <PaletteChip href="/deploy-and-run/cicd/azure-devops">Azure DevOps</PaletteChip>
  </div>
</PaletteCard>

</PaletteGrid>

## Run in production

<PaletteGrid>

<PaletteCard icon="tools" href="/deploy-and-run/managing-configurations">
  <h3 class="palette-card-title">Managing Configurations</h3>
  <ul class="palette-card-list">
    <li>Externalize runtime configuration values</li>
    <li>Per-environment files and variables</li>
  </ul>
</PaletteCard>

<PaletteCard icon="server" href="/deploy-and-run/scaling-high-availability">
  <h3 class="palette-card-title">Scaling and High Availability</h3>
  <ul class="palette-card-list">
    <li>Design for resilience and scale</li>
  </ul>
</PaletteCard>

<PaletteCard icon="metrics" href="/deploy-and-run/capacity-planning">
  <h3 class="palette-card-title">Capacity Planning</h3>
  <ul class="palette-card-list">
    <li>Sizing guidelines</li>
    <li>Performance benchmarks</li>
  </ul>
</PaletteCard>

<PaletteCard icon="security">
  <h3 class="palette-card-title">Secure Integrations</h3>
  <div class="palette-chip-row">
    <PaletteChip href="/deploy-and-run/secure/runtime-security">Runtime security</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/authentication">Authentication</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/api-security-rate-limiting">API security</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/secrets-encryption">Secrets and encryption</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/compliance-considerations">Compliance</PaletteChip>
    <PaletteChip href="/deploy-and-run/secure/aws-access">AWS access</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="manage-observe" href="/observe">
  <h3 class="palette-card-title">Observe</h3>
  <ul class="palette-card-list">
    <li>Metrics, logs, and traces</li>
    <li>Open source and commercial tools</li>
  </ul>
</PaletteCard>

</PaletteGrid>
