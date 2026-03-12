---
sidebar_position: 5
title: Deploy & Operate
description: "How do I ship, run, and secure this? Everything after code leaves your machine."
---

# Deploy & Operate

Everything after code leaves your laptop. Deployment, CI/CD, environments, observability, and security.

:::info Boundary Rule
This section covers everything after code leaves your machine. For building, transforming, and testing → [Develop](/docs/develop).
:::

## Deploy

Ship your integrations to any target environment.

- [Run Locally](deploy/local.md)
- [Docker & Kubernetes](deploy/docker-kubernetes.md)
- [Deploy to Devant (WSO2 iPaaS)](deploy/devant.md)
- [Deploy to AWS / Azure / GCP](deploy/cloud-providers.md)
- [Environments (Dev → Test → Prod)](deploy/environments.md)
- [Scaling & High Availability](deploy/scaling-ha.md)

## CI/CD

Automate your build, test, and deployment pipeline.

- [GitHub Actions](cicd/github-actions.md)
- [Jenkins](cicd/jenkins.md)
- [GitLab CI/CD](cicd/gitlab.md)
- [Azure DevOps](cicd/azure-devops.md)

## Observe

Monitor, trace, and troubleshoot running integrations.

- [Integration Control Plane (ICP)](observe/icp.md)
- [Logging & Structured Logs](observe/logging.md)
- [Metrics (Prometheus, Grafana)](observe/metrics.md)
- [Distributed Tracing (OpenTelemetry, Jaeger)](observe/tracing.md)
- [Datadog / New Relic / Splunk](observe/third-party.md)

## Secure

Protect your integrations in production.

- [Authentication (OAuth 2.0, JWT, mTLS)](secure/authentication.md)
- [API Security & Rate Limiting](secure/api-security.md)
- [IP Whitelisting](secure/ip-whitelisting.md)
- [Secrets & Encryption](secure/secrets-encryption.md)
- [Compliance Considerations](secure/compliance.md)
