---
sidebar_position: 0
sidebar_label: Environment Management
title: Environment Management
description: "Learn how environments work in the Choreo Integration and how to use them."
keywords: [choreo integrator, environments, promotion, development, production, choreo cloud]
slug: /manage/environments
---

# Environment Management

The Choreo Integration runs integrations in isolated environments within a data plane. Environments let you develop and test integrations safely before exposing them to production.

## How environments work

Every organization starts with a single default environment, **development**. [Create additional environments](./create.md), such as staging or production, if your release process requires more stages; this requires the Growth or Enterprise plan. Each environment can optionally be marked **critical**, for one used for production-grade deployments.

Each project in your organization is associated with a subset of the available environments. For example:

- Project A may use Development, Staging, and Production.
- Project B may use only Development and Production.

Integrations are deployed independently per environment. An integration running in Development has no effect on Production until you explicitly promote it.

## Promoting integrations

Promotion moves an integration from one environment to the next in your pipeline. When you promote, you can override configuration values to supply environment-specific settings, such as different database URLs, credentials, or endpoint targets.

The following sequence describes the typical promotion flow:

1. Deploy and test the integration in Development.
2. Promote to the next environment (for example, Staging).
3. Run acceptance tests in Staging.
4. Promote to Production.

Each environment maintains its own runtime state, endpoint URLs, and configuration values independently.

:::info
Promotion changes take effect after the integration restarts in the target environment. Runtime configurations set in the source environment are not automatically carried over. You must explicitly set any environment-specific values before applying.
:::

## What's next

- [Create an environment](./create.md) — Add a new environment to support additional stages in your deployment pipeline.
- [Configure promotion pipelines](./configure-promotion-pipelines.md) — Define the ordered sequence of environments a commit is promoted through.
- [Promote an integration](./promotion.md) — Step-by-step instructions for promoting an integration across environments.
