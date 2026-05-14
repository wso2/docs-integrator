---
title: Deploy Overview
---

{/* TODO: Work in progress */}

# Deploy and Operate

Once your integration is ready, this section covers everything you need to ship it, keep it running, and operate it in production.

## Deployment options

WSO2 Integrator supports multiple deployment targets. Choose the one that fits your infrastructure:

- **[WSO2 Cloud](./cloud/overview.md)** — Push your project directly from the IDE or the cloud editor to the managed WSO2 Integration Platform. No infrastructure setup required.
- **[Run locally](./self-hosted/run-locally.md)** — Run your integration on your local machine for development or testing.
- **[VM-based deployment](../deploy-operate/deploy/vm-based-deployment.md)** — Deploy to a virtual machine or bare-metal server.
- **[Docker](./self-hosted/docker.md)** and **[Kubernetes](./self-hosted/kubernetes.md)** — Package your integration as a container and deploy it to a Kubernetes cluster.
- **[Red Hat OpenShift](./self-hosted/openshift.md)** — Deploy on OpenShift using standard Kubernetes tooling.
- **[Serverless deployment](../deploy-operate/deploy/serverless-deployment.md)** — Run integrations as serverless functions.
- **[AWS, Azure, and GCP](../deploy-operate/deploy/aws-azure-gcp.md)** — Deploy to major cloud providers using native services.
- **[GraalVM native images](../deploy-operate/deploy/graalvm-native-images.md)** — Compile your integration to a native binary for faster startup and lower memory usage.

## Configuration and scaling

- **[Environments](../deploy-operate/deploy/environments.md)** — Manage dev, staging, and production environment configurations.
- **[Managing configurations](../deploy-operate/deploy/managing-configurations.md)** — Externalize and manage runtime configuration values.
- **[Scaling and high availability](../deploy-operate/deploy/scaling-high-availability.md)** — Design your deployment for resilience and scale.
- **[Capacity planning](../deploy-operate/capacity-planning/overview.md)** — Estimate resource requirements and plan deployment sizing.

## CI/CD

Automate your deployment pipeline using your preferred CI/CD platform:

- [GitHub Actions](../deploy-operate/cicd/github-actions.md)
- [Jenkins](../deploy-operate/cicd/jenkins.md)
- [GitLab](../deploy-operate/cicd/gitlab.md)
- [Azure DevOps](../deploy-operate/cicd/azure-devops.md)

## Observability

Monitor your integrations in production with logs, metrics, and traces:

- **[Observability overview](../deploy-operate/observe/observability-overview.md)** — Understand the observability model.
- **[Logging overview](../deploy-operate/observe/logging-overview.md)** — Capture and query structured log output.
- **[Metrics overview](../deploy-operate/observe/metrics-overview.md)** — Emit application-level metrics.
- **[Prometheus and Grafana](../deploy-operate/observe/metrics-prometheus-grafana.md)** — Scrape metrics and build dashboards.
- **[Jaeger](../deploy-operate/observe/jaeger-distributed-tracing.md)** and **[Zipkin](../deploy-operate/observe/zipkin-tracing.md)** tracing — Distributed request tracing.
- **[Datadog](../deploy-operate/observe/datadog-integration.md)**, **[New Relic](../deploy-operate/observe/new-relic-integration.md)**, **[Elastic Stack (ELK)](../deploy-operate/observe/elastic-stack-elk.md)**, **[OpenSearch](../deploy-operate/observe/opensearch-integration.md)**, **[Moesif](../deploy-operate/observe/moesif-api-analytics.md)** — Third-party observability platforms.

## Security

Protect your integrations and the data they process:

- **[Runtime security](../deploy-operate/secure/runtime-security.md)** — Harden the runtime environment.
- **[Authentication](../deploy-operate/secure/authentication.md)** — Secure service endpoints.
- **[API security and rate limiting](../deploy-operate/secure/api-security-rate-limiting.md)** — Enforce access policies.
- **[Secrets and encryption](../deploy-operate/secure/secrets-encryption.md)** — Manage sensitive credentials safely.
- **[Compliance considerations](../deploy-operate/secure/compliance-considerations.md)** — Meet regulatory and audit requirements.
