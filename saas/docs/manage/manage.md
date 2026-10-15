---
title: WSO2 Cloud - Integration Platform
---

# WSO2 Cloud - Integration Platform

WSO2 Cloud - Integration Platform is a managed cloud environment for running integrations developed with WSO2 Integrator. Once you push an integration to the cloud, the console gives you full control over how it runs: you can track build and deployment status, promote integrations across environments, configure runtime values and security, monitor logs and metrics, and control who has access, all without managing infrastructure.

## Manage your integrations

<PaletteCard icon="automation" href="/manage/integrations">
  <h3 class="palette-card-title">Manage Integrations</h3>
  <ul class="palette-card-list">
    <li>Track build and deployment status</li>
    <li>Redeploy, schedule, or stop integrations</li>
    <li>API Management for integrations exposed as APIs</li>
  </ul>

<PaletteCard icon="book" href="/manage/projects">
  <h3 class="palette-card-title">Manage Projects</h3>
  <ul class="palette-card-list">
    <li>Create, view, edit, and remove projects</li>
  </ul>

<PaletteCard icon="server" href="/manage/environments">
  <h3 class="palette-card-title">Manage Environments</h3>
  <ul class="palette-card-list">
    <li>Configure promotion pipelines</li>
    <li>Promote with optional approval gates</li>
    <li>Override configuration per environment</li>
  </ul>

<PaletteCard icon="tools" href="/manage/configurations">
  <h3 class="palette-card-title">Manage Configurations</h3>
  <ul class="palette-card-list">
    <li>Runtime values and secrets</li>
    <li>Endpoint visibility and security</li>
    <li>Build behavior and autoscaling</li>
  </ul>

<PaletteCard icon="security" href="/manage/users-and-access">
  <h3 class="palette-card-title">Manage Access</h3>
  <ul class="palette-card-list">
    <li>User groups and roles</li>
    <li>Organization- or project-level access</li>
    <li>Enterprise login with an external identity provider</li>
  </ul>

## Managed platform services

Managed backing services and resources your integrations can use.

<PaletteCard icon="persist" href="/manage/managed-databases-and-caches">
  <h3 class="palette-card-title">Managed Databases and Caches</h3>
  <ul class="palette-card-list">
    <li>PostgreSQL, MySQL, and cache services</li>
    <li>Connect to your integrations</li>
    <li>Plan for high availability</li>
  </ul>

<PaletteCard icon="connections" href="/manage/managed-message-brokers">
  <h3 class="palette-card-title">Managed Message Brokers</h3>
  <ul class="palette-card-list">
    <li>Managed Kafka services</li>
    <li>Use them from your integrations</li>
  </ul>

<PaletteCard icon="rag" href="/manage/rag-ingestion">
  <h3 class="palette-card-title">RAG Ingestion</h3>
  <ul class="palette-card-list">
    <li>Load documents into managed vector databases</li>
    <li>Query them</li>
    <li>Deploy the AI agents that consume them</li>
  </ul>

<PaletteCard icon="agents" href="/manage/voice-agents">
  <h3 class="palette-card-title">Voice Agents (Preview)</h3>
  <ul class="palette-card-list">
    <li>Add voice to a deployed AI agent</li>
    <li>Choose speech-to-text and text-to-speech providers</li>
    <li>Test it live in the Voice Tester</li>
  </ul>

## Organization and billing

Organization-level governance, separate from day-to-day integration work.

<PaletteCard icon="billing" href="/manage/billing">
  <h3 class="palette-card-title">Billing</h3>
  <ul class="palette-card-list">
    <li>Analyze usage across your organization</li>
    <li>Pricing and plans for platform services</li>
  </ul>

<PaletteCard icon="audit" href="/manage/audit">
  <h3 class="palette-card-title">Audit</h3>
  <ul class="palette-card-list">
    <li>Organization-level audit logs</li>
    <li>Data residency and compliance handling</li>
  </ul>

Once an integration is live, see [Observe](../observe/observe.md) to monitor request throughput and resource usage, search runtime logs, and configure anomaly detection alerts. To run on dedicated infrastructure instead of the shared WSO2 Cloud data plane, see [Deploy on a Private Data Plane](../deploy-and-run/deploy-on-private-data-plane/deploy-on-private-data-plane.md).
