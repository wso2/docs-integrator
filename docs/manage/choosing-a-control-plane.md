---
title: Choosing a control plane
---

# Choosing a control plane

WSO2 Integrator supports two control planes for managing deployed integrations: **WSO2 Cloud - Integration Platform** and the **Integration Control Plane (ICP)**. Both let you organize integrations into projects and environments, monitor runtime state, and manage access. However, they differ in where they run, how much infrastructure you manage, and what runtime types they support.

## WSO2 Cloud - Integration Platform

WSO2 Cloud is a fully managed SaaS offering. WSO2 operates the control plane and data plane infrastructure, so you deploy your integrations without provisioning or maintaining servers.

**Choose WSO2 Cloud when you want to:**

- Get started immediately without any infrastructure setup.
- Use built-in autoscaling and scale-to-zero for HTTP-triggered integrations.
- Secure endpoints with API Key or OAuth2 without configuring an external identity provider.
- Use managed promotion workflows, including approval gates, to move integrations across environments.
- Store sensitive configuration values in a managed secret vault.

## Integration Control Plane (ICP)

ICP is a self-hosted management server you install on your own infrastructure. It connects to your WSO2 Integrator runtimes over a dedicated registration port and provides a centralized dashboard, GraphQL API, and observability endpoints.

**Choose ICP when you want to:**

- Run the control plane on your own infrastructure: on-premises, in your private cloud, or air-gapped.
- Keep all runtime metadata in a database you control (PostgreSQL, MySQL, or MSSQL).

## Comparison

| Capability | WSO2 Cloud | ICP |
|---|---|---|
| **Hosting** | Fully managed by WSO2 | Self-hosted |
| **Setup required** | None | Install server, configure database |
| **Autoscaling** | Built-in | Managed by your infrastructure |
| **Endpoint security** | API Key and OAuth2, built-in | Managed by your infrastructure |
| **Secret management** | Managed secret vault | Managed by your infrastructure |
| **Observability** | Built-in logs and metrics | Requires OpenSearch integration |
| **Data residency** | WSO2 Cloud data plane or private data plane | Fully under your control |

## What's next

- [WSO2 Cloud overview](./cloud/overview.md)
- [Integration Control Plane (ICP)](./icp/integration-control-plane.md)
