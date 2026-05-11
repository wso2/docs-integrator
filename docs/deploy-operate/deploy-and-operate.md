---
title: Deploy and Operate
---

# Deploy and Operate

Everything from pushing your first build to production to monitoring it at scale. This section covers all deployment targets and integration types, including GenAI agents.

:::tip Where does Develop end?
If your code is still on your machine, you're in [Develop](../develop/develop.md). Once you're pushing it somewhere else, you're here.

## Deploy

Get your integration running in any environment:

| Target | Description |
|---|---|
| **[Run Locally](deploy/run-locally.md)** | Test on your machine before deploying |
| **[VM-Based](deploy/vm-based-deployment.md)** | Standalone and centralized (consolidated packages) |
| **[Docker and Kubernetes](deploy/docker-kubernetes.md)** | Containerized deployments with orchestration |
| **[OpenShift](deploy/red-hat-openshift.md)** | Red Hat OpenShift deployments |
| **[Serverless](deploy/serverless-deployment.md)** | AWS Lambda, Azure Functions |
| **[Push to Cloud](deploy/devant-ipaas.md)** | One-click deploy from WSO2 Integrator IDE |
| **[Cloud Providers](deploy/aws-azure-gcp.md)** | Deploy to AWS, Azure, or GCP |
| **[GraalVM Native](deploy/graalvm-native-images.md)** | Ahead-of-time compiled binaries for fast startup |

**Environment management:** [Environments](deploy/environments.md) | [Managing configurations](deploy/managing-configurations.md) | [Scaling and high availability](deploy/scaling-high-availability.md)

## CI/CD

Automate your build and deploy pipeline:

- **[GitHub Actions](cicd/github-actions.md)** — Workflows for build, test, and deploy
- **[Jenkins](cicd/jenkins.md)** — Pipeline configuration
- **[GitLab CI](cicd/gitlab.md)** — `.gitlab-ci.yml` setup
- **[Azure DevOps](cicd/azure-devops.md)** — Azure Pipelines integration

## Observe

Monitor, trace, and debug in production:

| | |
|---|---|
| **[Observability Overview](observe/observability-overview.md)** | Logging, metrics, and tracing concepts |
| **[Integration Control Plane](observe/integration-control-plane-icp.md)** | Centralized management dashboard |
| **[WSO2 Integration Platform](observe/observability-devant.md)** | Cloud-native observability |
| **[Prometheus and Grafana](observe/prometheus-metrics.md)** | Metrics collection and dashboards |
| **[Jaeger and Zipkin](observe/jaeger-distributed-tracing.md)** | Distributed tracing |
| **[Custom Metrics](observe/custom-metrics.md)** | Application-specific counters and gauges |

**Third-party integrations:** [Datadog](observe/datadog-integration.md) | [New Relic](observe/new-relic-integration.md) | [Elastic Stack](observe/elastic-stack-elk.md) | [OpenSearch](observe/opensearch-integration.md)

## Secure

Harden your integrations for production:

- **[Keystores and Truststores](secure/keystore-truststore.md)** — Create and configure keystores, truststores, and TLS certificates
- **[Runtime Security](secure/runtime-security.md)** — JVM security, non-root execution, network policies
- **[Authentication](secure/authentication.md)** — OAuth 2.0, JWT, mTLS
- **[API security and rate limiting](secure/api-security-rate-limiting.md)** — Protect your endpoints
- **[Secrets and encryption](secure/secrets-encryption.md)** — Environment variables, vault integration
- **[Compliance](secure/compliance-considerations.md)** — Compliance considerations

## Capacity planning

- **[Overview and sizing guidelines](capacity-planning/overview.md)** — Right-size your deployment
- **[Performance reports](capacity-planning/performance-reports.md)** — Benchmarks per scenario
