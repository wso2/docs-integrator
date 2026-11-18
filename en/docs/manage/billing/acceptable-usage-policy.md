---
sidebar_position: 4
title: "Acceptable Usage Policy"
description: "Entitlements, quotas, and limits for each WSO2 Integration Platform SaaS subscription plan - Free Trial, Growth, and Enterprise."
keywords: [wso2 integrator, wso2 cloud, acceptable usage policy, subscription plans, free trial, growth, enterprise, quotas, limits, entitlements]
slug: /manage/billing/acceptable-usage-policy
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
| Deployments to cloud platforms | <span class="cell-prose">WSO2 Integration Platform Cloud</span> | <span class="cell-prose">WSO2 Integration Platform Cloud, Azure, AWS, GCP, OpenShift, VMware Tanzu, and any Kubernetes cluster</span> | <span class="cell-prose">WSO2 Integration Platform Cloud, Azure, AWS, GCP, OpenShift, VMware Tanzu, and any Kubernetes cluster</span> |
| Deployment tracks | 2 | 5 | Unlimited |
| [Auto scaling](../configurations/scaling-resource-limits.md) | <span class="cell-prose">Automatically scales down to zero and can scale up to 1 pod</span> | <span class="cell-prose">Automatic or configurable scale down to zero and can scale up to 2 pods</span> | ✓ |
| Health checks | ✓ | ✓ | ✓ |
| Infrastructure quota (for all resources) | <span class="cell-prose">CPU — 5<br />RAM — 16 GB<br />Storage — 100 GB<br />Network — 100 GB</span> | <span class="cell-prose">CPU — 25<br />RAM — 128 GB<br />Storage — 500 GB<br />Network — 500 GB</span> | Unlimited |

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
| [API analytics and insights](./usage-dashboards.md) | <span class="cell-prose">Data retention of up to 7 days</span> | ✓ | ✓ |

## Monitoring and observability

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [Monitoring dashboard](../../observe/metrics.md) | ✓ | ✓ | ✓ |
| [Logs](../../observe/runtime-logs.md) | <span class="cell-prose">50 MB per day and logs are retained up to 7 days</span> | <span class="cell-prose">500 MB per day and logs are retained up to 30 days</span> | Unlimited |
| Traces | <span class="cell-prose">Data retention of up to 7 days</span> | <span class="cell-prose">Data retention of up to 30 days</span> | ✓ |
| [Alerting](../../observe/anomaly-detection-alerts.md) | 25 configurable alerts | 100 configurable alerts | Unlimited |
| Third-party extensions | — | <span class="cell-prose">Only when using a [private data plane](../../deploy-and-run/deploy-on-private-data-plane/deploy-on-private-data-plane.md)</span> | ✓ |

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
| [Secrets and config management](../configurations/runtime-configurations.md) | <span class="cell-prose">100 secrets/configs (up to 1 GB in storage)</span> | <span class="cell-prose">1,000 secrets/configs (up to 5 GB in storage)</span> | Unlimited |
| [Audit logs](../audit/audit-logs.md) | 30 day retention | 1 year retention | Unlimited |

## Platform services

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [MySQL](../managed-databases-and-caches.md) | <span class="cell-prose">Minimum size instance for a 7-day period</span> | <span class="cell-prose">Select a plan that suits you</span> | <span class="cell-prose">Select a plan that suits you</span> |
| [PostgreSQL](../managed-databases-and-caches.md) | <span class="cell-prose">Minimum size instance for a 7-day period</span> | <span class="cell-prose">Select a plan that suits you</span> | <span class="cell-prose">Select a plan that suits you</span> |
| [Redis](../managed-databases-and-caches.md) | <span class="cell-prose">Minimum size instance for a 7-day period</span> | <span class="cell-prose">Select a plan that suits you</span> | <span class="cell-prose">Select a plan that suits you</span> |
| [Scale to zero](../configurations/scaling-resource-limits.md#scale-to-zero) | ✓ | ✓ | ✓ |

:::note
The MySQL, PostgreSQL, and Redis Platform Services are optional services made available to the Customer as an add-on to the Customer's WSO2 Integration Platform subscription.
:::

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
