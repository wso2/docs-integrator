---
title: Configurations Overview
---

# Configurations overview

WSO2 Cloud - Integration Platform provides configuration options across several dimensions of your integration lifecycle, from how integrations are built and what values they read at runtime, to how they scale, expose endpoints, and enforce security.

All configuration options are available per environment, so you can use different settings in development and production without changing your integration code.

## Configuration areas

| Area | Description |
|---|---|
| [Runtime](./runtime-configurations.md) | Set configurable values an integration reads at runtime. Manage reusable configuration groups at the organization level and mark sensitive values as secrets. |
| [Build](./build-configurations.md) | Control how an integration is built, including whether unit tests run and whether Git submodules are pulled on each build. |
| [Endpoints](./endpoint-configurations.md) | Set the visibility level for each endpoint: project-only, organization-wide, or public. |
| [Scaling](./scaling-resource-limits.md) | Configure autoscaling based on CPU and memory thresholds, and enable or disable scale-to-zero for HTTP-triggered integrations. |
| [Security](./security-configurations.md) | Secure Integration as API and AI Agent endpoints with API Key authentication, OAuth2, or both. |
