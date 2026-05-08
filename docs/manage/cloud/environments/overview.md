---
title: Environments
---

# Environments Overview

The WSO2 Integration Platform runs integrations in isolated environments within a data plane. Environments let you develop and test integrations safely before exposing them to production.

## How environments work

The WSO2 Cloud data plane provides two environments by default: **Development** and **Production**. Your organization can add more environments, such as a staging environment, if your release process requires additional stages.

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

Promotion changes take effect after the integration restarts in the target environment. Runtime configurations set in the source environment are not automatically carried over. You must explicitly set any environment-specific values before applying.

## What's next

- [Promote an integration](./promotion.md) — Step-by-step instructions for promoting an integration across environments.
- [Promotion approvals](./promotion-approval.md) — Require approvals before an integration is promoted to a protected environment.
