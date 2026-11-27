---
sidebar_position: 2
title: "Pricing and Plans"
description: "How Choreo Cloud bills your subscription, what each plan includes, and how to upgrade."
keywords: [choreo integrator, choreo cloud, billing, pricing, subscription plan, upgrade]
slug: /manage/billing/pricing-and-plans
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Pricing and Plans

Choreo Cloud bills the resources you use as part of your existing subscription. The cost depends on your subscription plan and the usage of each resource.

## Billing information

- **Metered billing**: Choreo Integration bills Transactions, Automation Core Minutes, and AI Agent Actions. Other resources, such as the number of integrations, AI agents, connectors, environments, projects, and developers, are tracked but not themselves billed.
- **Fixed pricing**: Pricing is based on the selected plan. Choreo Cloud does not charge extra for network bandwidth usage.
- **Plan limits**: Each subscription plan has its own quotas for builds, deployments, infrastructure, logs, and other resources. See [Acceptable Usage Policy](./acceptable-usage-policy.md) for the full per-plan breakdown.

### View your usage

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. Open the apps grid at the top left, then under **Manage**, click **Settings**.
3. In the left navigation menu, click **Billing**, then click the **Usage** tab.

<ThemedImage
    alt="Billing Usage tab for Choreo Integration showing Transactions, Automation Core Minutes, AI Agent Actions, and shared resource counts"
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/billing-usage.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/billing-usage.png'),
    }}
/>

{/* TODO(v3): the Usage tab has a product selector (set to Choreo Integration here) - didn't check what the other Choreo Cloud products (AI & Agent Management, API Management, Identity & Access Management) show under it, since this docs site covers Choreo Integration only. */}

## Upgrade a plan

In **Settings** > **Billing**, the **Subscriptions** tab lists your organization's subscriptions, including Choreo Integration.

<ThemedImage
    alt="Billing Subscriptions tab listing Choreo AI & Agent Management, Choreo API Management, Choreo Identity & Access Management, and Choreo Integration, each with a Change plan button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/billing-subscriptions.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/billing-subscriptions.png'),
    }}
/>

Choreo Integration's plan is managed by Choreo Cloud: its **Change plan** button is disabled, and hovering it explains why.

<ThemedImage
    alt="Disabled Change plan button for Choreo Integration with a tooltip: This plan is managed by Choreo Cloud. Contact support to make changes."
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/change-plan-managed-tooltip.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/change-plan-managed-tooltip.png'),
    }}
/>

To upgrade your subscription plan, contact [Choreo Cloud support](https://choreolabs.com/contact/).

{/* TODO(v3): the other three subscriptions on this org's Billing page (AI & Agent Management, API Management, Identity & Access Management - separate Choreo Cloud products, out of scope for these Integration docs) DO have a working self-service Change plan dialog, but while on a 30-Day Free Trial it only offers "Extend my trial" (free, request-based, approved within 1 business day) or "Enterprise" (custom annual contract, a Choreo Cloud representative contacts you within 1 business day) - no instantly-selectable "Growth" plan appeared anywhere, despite the Acceptable Usage Policy documenting a 3-tier Free Trial/Growth/Enterprise structure. Didn't check what the dialog looks like from an active Growth or Enterprise plan, or whether Growth is only ever assigned by a sales conversation rather than chosen in this dialog. */}

## What's next

- [Acceptable Usage Policy](./acceptable-usage-policy.md) — Entitlements and usage limits for the Free Trial, Growth, and Enterprise plans.
- [Choreo Cloud overview](../manage.md) — How Choreo Cloud manages your deployed integrations end to end.
