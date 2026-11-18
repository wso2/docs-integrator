---
title: Acceptable Usage Policy
---

# Acceptable Usage Policy

Subscriber's use of the Integration Platform SaaS is governed by the acceptable usage stated below.

The tables on this page list what each subscription plan includes. A checkmark (✓) means the capability is included without a stated limit; a dash (—) means it is not available on that plan.

## Developer and operational

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [Connect your Git repo](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md) (GitHub, Bitbucket, GitLab) | ✓ | ✓ | ✓ |
| [Continuous integration (CI) with build pipelines](../configurations/build-configurations.md) | 100 builds per month | 500 builds per month | Unlimited |
| Continuous delivery (CD) | 100 deployments per month | 500 deployments per month | Unlimited |
| Deployments to cloud platforms | WSO2 Integration Platform Cloud | WSO2 Integration Platform Cloud, Azure, AWS, GCP, OpenShift, VMware Tanzu, and any Kubernetes cluster | WSO2 Integration Platform Cloud, Azure, AWS, GCP, OpenShift, VMware Tanzu, and any Kubernetes cluster |
| Deployment tracks | 2 | 5 | Unlimited |
| [Auto scaling](../configurations/scaling-resource-limits.md) | Automatically scales down to zero and can scale up to 1 pod | Automatic or configurable scale down to zero and can scale up to 2 pods | ✓ |
| Health checks | ✓ | ✓ | ✓ |
| Infrastructure quota (for all resources) | CPU — 5<br />RAM — 16 GB<br />Storage — 100 GB<br />Network — 100 GB | CPU — 25<br />RAM — 128 GB<br />Storage — 500 GB<br />Network — 500 GB | Unlimited |

## Integration

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| Event handlers | ✓ | ✓ | ✓ |
| Scheduled jobs | ✓ | ✓ | ✓ |
| Webhooks | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | ✓ |

## AI-assisted

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| API testing with natural language | 50 tests | 250 tests | Unlimited |
| [Anomaly detection](../../observe/anomaly-detection-alerts.md) | ✓ | ✓ | ✓ |

## API management

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [API developer portal](../integrations/api-management/api-management.md) | ✓ | ✓ | ✓ |
| [API analytics and insights](./usage-dashboards.md) | Data retention of up to 7 days | ✓ | ✓ |

## Monitoring and observability

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [Monitoring dashboard](../../observe/metrics.md) | ✓ | ✓ | ✓ |
| [Logs](../../observe/runtime-logs.md) | 50 MB per day and logs are retained up to 7 days | 500 MB per day and logs are retained up to 30 days | Unlimited |
| Traces | Data retention of up to 7 days | Data retention of up to 30 days | ✓ |
| [Alerting](../../observe/anomaly-detection-alerts.md) | 25 configurable alerts | 100 configurable alerts | Unlimited |
| Third-party extensions | — | Only when using a [private data plane](../../deploy-and-run/deploy-on-private-data-plane/deploy-on-private-data-plane.md) | ✓ |

## Security

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| SSO for API developer portal | ✓ | ✓ | ✓ |
| [Enterprise login](../users-and-access/configure-enterprise-login.md) | — | ✓ | ✓ |
| Container manifest scanning | ✓ | ✓ | ✓ |
| Container static scanning | ✓ | ✓ | ✓ |
| Run-time container security | ✓ | ✓ | ✓ |
| [Role-based access control](../users-and-access/access-control.md) | ✓ | ✓ | ✓ |
| [Third-party identity provider (IdP)](../users-and-access/api-external-idp/api-external-idp.md) | — | ✓ | ✓ |
| [Secrets and config management](../configurations/runtime-configurations.md) | 100 secrets/configs (up to 1 GB in storage) | 1,000 secrets/configs (up to 5 GB in storage) | Unlimited |
| [Audit logs](../audit/audit-logs.md) | 30 day retention | 1 year retention | Unlimited |

## Platform services

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [MySQL](../managed-databases-and-caches.md) | Minimum size instance for a 7-day period | Select a plan that suits you | Select a plan that suits you |
| [PostgreSQL](../managed-databases-and-caches.md) | Minimum size instance for a 7-day period | Select a plan that suits you | Select a plan that suits you |
| [Redis](../managed-databases-and-caches.md) | Minimum size instance for a 7-day period | Select a plan that suits you | Select a plan that suits you |
| [Scale to zero](../configurations/scaling-resource-limits.md#scale-to-zero) | ✓ | ✓ | ✓ |

The MySQL, PostgreSQL, and Redis Platform Services are optional services made available to the Customer as an add-on to the Customer's WSO2 Integration Platform subscription.

## Utility services

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [Custom domain mapping](../configurations/custom-domain.md) | — | ✓ | ✓ |
| Creating new user roles | Only default roles allowed | ✓ | ✓ |
| [Number of environments](../environments/environments.md) | 1 | 2 | Unlimited |

## What's next

- [Pricing and plans](./pricing-and-plans.md) — How WSO2 Cloud bills platform services, and how to upgrade a service plan.
- [Usage dashboards](./usage-dashboards.md) — Analyze usage across your organization.
- [Integration Runtime Updates and Upgrades](../../reference/runtime-updates-and-upgrades.md) — Runtime availability, optional upgrades, and supported runtime versions.
- [FAQ: Billing and support](../../reference/faq.md) — Answers to common subscription and billing questions.
