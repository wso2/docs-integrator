---
title: WSO2 Integration Control Plane (ICP)
description: Reference overview of the ICP components, integration profiles, ports, and API endpoints.
keywords: [wso2 integrator, integration control plane, icp, reference, components, ports]
---

# WSO2 Integration Control Plane (ICP)

The Integration Control Plane (ICP) is a centralized monitoring and management server for WSO2 Integrator deployments. It provides a web dashboard and APIs for real-time visibility into running integrations. This page describes the ICP components, integration profiles, ports, and API endpoints.

## Components

| Component | Description |
|-----------|-------------|
| **ICP Server** | Ballerina-based backend that hosts the GraphQL API, auth service, and observability endpoints |
| **ICP Dashboard** | React and TypeScript web UI served at port `9446`, bundled into the distribution |
| **Database** | Persistent store for integration metadata. Supports MySQL, PostgreSQL, MSSQL, and H2. |

## Integration profiles

ICP supports two integration profiles that determine the type of runtime that connects to an integration:

| Profile | Runtime | Description |
|---------|---------|-------------|
| **Default profile** | Ballerina | A Ballerina-based integration. This is the default for all new integrations created in ICP. |
| **MI profile** | Micro Integrator | A WSO2 Micro Integrator-based integration for connecting existing MI deployments. |

The profile is set when the integration is created and cannot be changed later. Runtimes connect to ICP using the bridge library that corresponds to their profile type.

## Default ports

| Port | Protocol | Description |
|------|----------|-------------|
| `9446` | HTTPS | All ICP Server endpoints: GraphQL, auth, and observability |
| `9445` | HTTPS | Runtime communication. Integration runtimes connect here to register and send heartbeats. |

## Endpoints

| Path | Description |
|------|-------------|
| `https://<host>:9446/graphql` | GraphQL API |
| `https://<host>:9446/auth` | Authentication API for login and token refresh |
| `https://<host>:9446/icp/observability` | Observability REST API |

See [ICP API](../../reference/api/icp.md) for the full REST endpoint reference.

## What's next

- [Install ICP](install-icp.md) — download and configure ICP for your environment
- [Get started with ICP](quick-start.md) — connect a runtime and enable observability end to end
- [ICP console overview](icp-console-overview.md) — understand the console layout and navigation
