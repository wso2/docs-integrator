---
sidebar_position: 0
sidebar_label: Configuration Management
title: Configuration Management
description: "Manage runtime values, build settings, endpoints, scaling, and security for integrations deployed on Choreo Integration."
keywords: [choreo integrator, choreo cloud, configuration, runtime, build, endpoints, scaling, security]
slug: /manage/configurations
---

# Configuration Management

Choreo Integration provides configuration options across several dimensions of your integration lifecycle, from how integrations are built and what values they read at runtime, to how they scale, expose endpoints, and enforce security.

All configuration options are available per environment, so you can use different settings in development and production without changing your integration code.

## Configuration areas

| Area | Description |
|---|---|
| [Runtime](./runtime-configurations.md) | Set configurable values an integration reads at runtime, and mark sensitive values as secrets. |
| [Build](./build-configurations.md) | Control how an integration is built, including whether unit tests run and whether Git submodules are pulled on each build. |
| [Endpoints](./endpoint-configurations.md) | Set the visibility level for each endpoint: project-only, organization-wide, or public. |
| [Security](./security-configurations.md) | Secure Integration as API and AI Agent endpoints with API Key authentication or OAuth2. |

For managing a deployed integration's runtime — pod status, container resources, configs and secrets, health checks, scaling, and deployment tracks — see [Operate Integration Runtime](../integrations/operate/operate.md).
