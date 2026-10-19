---
title: Choosing a Control Plane
---

# Choosing a Control Plane

Once your integrations are deployed, you need a control plane to organize them into projects and environments, monitor their runtime state, manage their lifecycle, and control access. WSO2 Integrator has two: **WSO2 Cloud - Integration Platform** and the **Integration Control Plane (ICP)**.

:::info The control plane follows your deployment choice
You do not pick a control plane independently of how you deploy. Where your integrations run decides how you manage them:

- Integrations you [deploy to WSO2 Cloud](deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) are managed in WSO2 Cloud.
- Integrations you run on your own infrastructure (VMs, containers, Kubernetes, on-premises, private cloud, or air-gapped environments) are managed with the self-hosted [Integration Control Plane](icp/index.md).

Decide where to run first, in [Deploy and Run](deploy-and-run/deploy-and-run.md). The control plane follows from that.

## Manage on WSO2 Cloud

WSO2 Cloud is a fully managed SaaS offering. WSO2 operates the control plane and data plane infrastructure, so you deploy your integrations without provisioning or maintaining servers.

**This is what you use when you:**

- Get started immediately without any infrastructure setup.
- Use built-in autoscaling and scale-to-zero for HTTP-triggered integrations.
- Secure endpoints with API Key or OAuth2 without configuring an external identity provider.
- Use managed promotion workflows, including approval gates, to move integrations across environments.
- Store sensitive configuration values in a managed secret vault.

Managing integrations on WSO2 Cloud is covered in the WSO2 Cloud documentation: <CloudDocsLink to="/manage">Manage on WSO2 Cloud.

## Manage with the Integration Control Plane (ICP)

ICP is a self-hosted management server you install on your own infrastructure. It connects to your WSO2 Integrator runtimes over a dedicated registration port and provides a centralized dashboard, GraphQL API, and observability endpoints.

**This is what you use when you:**

- Run the control plane on your own infrastructure: on-premises, in your private cloud, or air-gapped.
- Keep all runtime metadata in a database you control (PostgreSQL, MySQL, or MSSQL).

ICP is documented in its own section, starting with [Integration Control Plane](icp/index.md).

## Comparison

| Capability | WSO2 Cloud | ICP |
|---|---|---|
| **Used when you deploy** | To WSO2 Cloud | On your own infrastructure |
| **Hosting** | Fully managed by WSO2 | Self-hosted |
| **Setup required** | None | Install server, configure database |
| **Autoscaling** | Built-in | Managed by your infrastructure |
| **Endpoint security** | API Key and OAuth2, built-in | Managed by your infrastructure |
| **Secret management** | Managed secret vault | Managed by your infrastructure |
| **Observability** | Built-in logs and metrics | Requires OpenSearch integration |
| **Data residency** | WSO2 Cloud data plane or private data plane | Fully under your control |

## What's next

- [Deploy and Run](deploy-and-run/deploy-and-run.md) — choose where your integrations run
- <CloudDocsLink to="/manage">Manage on WSO2 Cloud — manage integrations deployed to WSO2 Cloud
- [Install ICP](icp/install-icp.md) — set up the self-hosted Integration Control Plane
