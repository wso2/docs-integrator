---
title: WSO2 Integration Control Plane (ICP)
---

# WSO2 Integration Control Plane (ICP)

The Integration Control Plane (ICP) is a centralized monitoring and management server for WSO2 Integrator deployments. It exposes a GraphQL API, a REST observability API, and an authentication API, and serves a web dashboard for real-time visibility into running integrations.

## Components

| Component         | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| **ICP Server**    | Ballerina-based backend — GraphQL API, auth service, and observability endpoints |
| **ICP Dashboard** | React + TypeScript web UI served at port `9446` bundled into the distribution    |
| **Database**      | Persistent store for integration metadata — MySQL, PostgreSQL, MSSQL, or H2      |

## Default Ports

| Port   | Protocol | Description                                                                                         |
| ------ | -------- | --------------------------------------------------------------------------------------------------- |
| `9446` | HTTPS    | All ICP Server endpoints (GraphQL, auth, observability)                                             |
| `9445` | HTTPS    | Runtime communication — integration runtimes connect to this port to register and report heartbeats |

## Endpoints

| Path                                    | Description                               |
| --------------------------------------- | ----------------------------------------- |
| `https://<host>:9446/graphql`           | GraphQL API                               |
| `https://<host>:9446/auth`              | Authentication API (login, token refresh) |
| `https://<host>:9446/icp/observability` | Observability REST API                    |
| `https://<host>:9446/api/v1`            | REST management API (legacy)              |

See [ICP API](../api/icp.md) for the full REST endpoint reference.
