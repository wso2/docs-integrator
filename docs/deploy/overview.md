---
title: Deploy Overview
---

{/* TODO: Work in progress */}

# Deploy and operate

Once your integration is ready, this section covers everything you need to ship it, keep it running, and operate it in production.

## Deployment options

WSO2 Integrator supports multiple deployment targets. Choose the one that fits your infrastructure:

- **[WSO2 Cloud](./cloud/overview.md)** — Push your project directly from the IDE or the cloud editor to the managed WSO2 Integration Platform. No infrastructure setup required.
- **[Run locally](./run-locally.md)** — Run your integration on your local machine for development or testing.
- **[VM-based deployment](./vm-based-deployment.md)** — Deploy to a virtual machine or bare-metal server.
- **[Docker and Kubernetes](./docker-kubernetes.md)** — Package your integration as a container and deploy it to a Kubernetes cluster.
- **[Red Hat OpenShift](./red-hat-openshift.md)** — Deploy on OpenShift using standard Kubernetes tooling.
- **[Serverless deployment](./serverless-deployment.md)** — Run integrations as serverless functions.
- **[AWS, Azure, and GCP](./aws-azure-gcp.md)** — Deploy to major cloud providers using native services.
- **[GraalVM native images](./graalvm-native-images.md)** — Compile your integration to a native binary for faster startup and lower memory usage.

## Configuration and scaling

- **[Environments](./environments.md)** — Manage dev, staging, and production environment configurations.
- **[Managing configurations](./managing-configurations.md)** — Externalize and manage runtime configuration values.
- **[Scaling and high availability](./scaling-high-availability.md)** — Design your deployment for resilience and scale.
- **[Capacity planning](../deploy-operate/capacity-planning/overview.md)** — Estimate resource requirements and plan deployment sizing.

## CI/CD

Automate your deployment pipeline using your preferred CI/CD platform:

- [GitHub Actions](./cicd/github-actions.md)
- [Jenkins](./cicd/jenkins.md)
- [GitLab](./cicd/gitlab.md)
- [Azure DevOps](./cicd/azure-devops.md)

## Observability

Monitor your integrations in production with logs, metrics, and traces:

- **[Observability overview](./observe/observability-overview.md)** — Understand the observability model.
- **[Structured logs](./observe/logging-structured-logs.md)** — Capture and query structured log output.
- **[Custom metrics](./observe/custom-metrics.md)** — Emit application-level metrics.
- **[Prometheus and Grafana](./observe/prometheus-grafana.md)** — Scrape metrics and build dashboards.
- **[Jaeger and Zipkin tracing](./observe/jaeger-zipkin-tracing.md)** — Distributed request tracing.
- **[Datadog](./observe/datadog-integration.md)**, **[New Relic](./observe/new-relic-integration.md)**, **[Elastic Stack (ELK)](./observe/elastic-stack-elk.md)**, **[OpenSearch](./observe/opensearch-integration.md)**, **[Moesif](./observe/moesif-api-analytics.md)** — Third-party observability platforms.

## Security

Protect your integrations and the data they process:

- **[Runtime security](./secure/runtime-security.md)** — Harden the runtime environment.
- **[Authentication](./secure/authentication.md)** — Secure service endpoints.
- **[API security and rate limiting](./secure/api-security-rate-limiting.md)** — Enforce access policies.
- **[Secrets and encryption](./secure/secrets-encryption.md)** — Manage sensitive credentials safely.
- **[Compliance considerations](./secure/compliance-considerations.md)** — Meet regulatory and audit requirements.
