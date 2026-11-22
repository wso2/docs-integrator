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
| [Connect your Git repo](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md) | ✓ | ✓ | ✓ |
| [Continuous integration (CI) with build pipelines](../configurations/build-configurations.md) | 100 builds per month | 500 builds per month | Unlimited |
| Continuous delivery (CD) | 100 deployments per month | 500 deployments per month | Unlimited |
| Deployments to cloud platforms | <span class="cell-prose">WSO2 Integration Platform Cloud</span> | <span class="cell-prose">WSO2 Integration Platform Cloud, Azure, AWS, GCP, OpenShift, VMware Tanzu, and any Kubernetes cluster</span> | <span class="cell-prose">WSO2 Integration Platform Cloud, Azure, AWS, GCP, OpenShift, VMware Tanzu, and any Kubernetes cluster</span> |
| Deployment tracks | 2 | 5 | Unlimited |
| [Auto scaling](../configurations/scaling-resource-limits.md) | <span class="cell-prose">Scales up to 1 pod</span> | <span class="cell-prose">Scales up to 2 pods</span> | ✓ |
| Health checks | ✓ | ✓ | ✓ |
| Infrastructure quota (for all resources) | <span class="cell-prose">CPU — 5<br />RAM — 16 GB<br />Storage — 100 GB<br />Network — 100 GB</span> | <span class="cell-prose">CPU — 25<br />RAM — 128 GB<br />Storage — 500 GB<br />Network — 500 GB</span> | Unlimited |

## Integration

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| Event handlers | ✓ | ✓ | ✓ |
| Scheduled jobs | ✓ | ✓ | ✓ |
| Webhooks | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | ✓ |

## API management

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [API analytics and insights](./usage-dashboards.md) | <span class="cell-prose">Data retention of up to 7 days</span> | ✓ | ✓ |

## Monitoring and observability

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| [Logs](../../observe/runtime-logs.md) | <span class="cell-prose">50 MB per day and logs are retained up to 7 days</span> | <span class="cell-prose">500 MB per day and logs are retained up to 30 days</span> | Unlimited |
| Traces | <span class="cell-prose">Data retention of up to 7 days</span> | <span class="cell-prose">Data retention of up to 30 days</span> | ✓ |

## Security

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| Container manifest scanning | ✓ | ✓ | ✓ |
| Container static scanning | ✓ | ✓ | ✓ |
| Run-time container security | ✓ | ✓ | ✓ |
| [Role-based access control](../users-and-access/access-control.md) | ✓ | ✓ | ✓ |
| [Secrets and config management](../configurations/runtime-configurations.md) | <span class="cell-prose">100 secrets/configs (up to 1 GB in storage)</span> | <span class="cell-prose">1,000 secrets/configs (up to 5 GB in storage)</span> | Unlimited |
| [Audit logs](../audit/audit-logs.md) | 30 day retention | 1 year retention | Unlimited |

## Utility services

| Capability | Free Trial | Growth | Enterprise |
|---|---|---|---|
| Creating new user roles | Only default roles allowed | ✓ | ✓ |
| [Number of environments](../environments/environments.md) | 1 | 2 | Unlimited |

## What's next

- [Pricing and plans](./pricing-and-plans.md) — How WSO2 Cloud bills platform services, and how to upgrade a service plan.
- [Usage dashboards](./usage-dashboards.md) — Analyze usage across your organization.
- [Integration Runtime Updates and Upgrades](../../reference/runtime-updates-and-upgrades.md) — Runtime availability, optional upgrades, and supported runtime versions.
- [FAQ: Billing and support](../../reference/faq.md) — Answers to common subscription and billing questions.
