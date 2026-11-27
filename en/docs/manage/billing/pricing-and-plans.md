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
    alt="Billing Usage tab for Choreo Integration showing Transactions, Automation Core Minutes, AI Agent Actions, Integrations, AI Agents, Connectors, and shared resource counts with their quotas and percentage used"
    sources={{
        light: useBaseUrl('/img/manage/cloud/billing/billing-usage.png'),
        dark: useBaseUrl('/img/manage/cloud/billing/billing-usage.png'),
    }}
/>

Each metric shows how much of your plan's quota you've used, and when it resets. A metric with no stated quota, like **Connectors** here, is unlimited on the current plan.

{/* TODO(v3): the Usage tab has a product selector (set to Choreo Integration here) - didn't check what the other Choreo Cloud products (AI & Agent Management, API Management, Identity & Access Management) show under it, since this docs site covers Choreo Integration only. The quotas shown (Transactions 1,000,000, Automation Core Minutes 500, AI Agent Actions 1,000, Integrations 5, AI Agents 5, Developers 5) are from a Free Trial organization - the Acceptable Usage Policy doesn't currently list these as rows (only Integrations is implied, via the FAQ's "up to five free integrations"). Worth reconciling with the AUP in a follow-up pass. */}

## Upgrade a plan

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. Open the apps grid at the top left, then under **Manage**, click **Settings**.
3. In the left navigation menu, click **Billing**. The **Subscriptions** tab lists your organization's subscriptions, including Choreo Integration.

    <ThemedImage
        alt="Billing Subscriptions tab listing Choreo AI & Agent Management, Choreo API Management, Choreo Identity & Access Management, and Choreo Integration, each on a 30-Day Free Trial with a Change plan button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/billing-subscriptions.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/billing-subscriptions.png'),
        }}
    />

4. Next to Choreo Integration, click **Change plan**. The dialog shows your current plan and the available options.

    <ThemedImage
        alt="Change plan dialog showing the current 30-Day Free Trial plan and the Extend my trial and Enterprise options, with neither selected yet"
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/change-plan-choose.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/change-plan-choose.png'),
        }}
    />

5. Select **Enterprise**, then click **Continue to contact details**.

    <ThemedImage
        alt="Change plan dialog with the Enterprise plan selected and a Continue to contact details button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/change-plan-enterprise-selected.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/change-plan-enterprise-selected.png'),
        }}
    />

6. Fill in your contact details, then click **Send request to sales**.

    <ThemedImage
        alt="Contact details step of the Change plan dialog with name, work email, phone, job role, company, and country fields, and a summary of the Enterprise plan being requested"
        sources={{
            light: useBaseUrl('/img/manage/cloud/billing/change-plan-contact-details.png'),
            dark: useBaseUrl('/img/manage/cloud/billing/change-plan-contact-details.png'),
        }}
    />

A Choreo Cloud representative reviews your request and contacts you within 1 business day. Your trial continues as usual until it ends. You can also reach out directly to [Choreo Cloud support](https://choreolabs.com/contact/).

Once your organization is on a plan that Choreo Cloud manages directly, **Change plan** may become disabled; contact support to make further changes.

{/* TODO(v3): on the Choose a plan step, a Free Trial subscription only ever offered "Extend my trial" (free, request-based, approved within 1 business day) or "Enterprise" (the annual-contract request flow documented above) - no instantly-selectable "Growth" plan appeared anywhere, despite the Acceptable Usage Policy documenting a 3-tier Free Trial/Growth/Enterprise structure. Didn't check what the dialog looks like from an active Growth or Enterprise plan, or whether Growth is only ever assigned by a sales conversation rather than chosen in this dialog. Also didn't check the other three subscriptions' (AI & Agent Management, API Management, Identity & Access Management) own upgrade flows beyond this same Choose a plan step, since they're separate Choreo Cloud products out of scope for these Integration docs. */}

## What's next

- [Acceptable Usage Policy](./acceptable-usage-policy.md) — Entitlements and usage limits for the Free Trial, Growth, and Enterprise plans.
- [Choreo Cloud overview](../manage.md) — How Choreo Cloud manages your deployed integrations end to end.
