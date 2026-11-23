---
sidebar_position: 2
title: Create an Environment
description: Learn how to create a new environment in your Choreo Integration organization to support additional stages in your deployment pipeline.
keywords: [choreo cloud, create environment, production environment]
slug: /manage/environments/create
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Create an Environment

Choreo Integration provides **Development** and **Production** environments by default. You can create additional environments, such as a staging or regional environment, to match your release pipeline.

:::info
Free-tier organizations can have a maximum of three environments.
:::

## Prerequisites

- You must have organization administrator privileges to create environments.

## Create an environment

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. In the top navigation menu, click the **Organization** list and select your organization. This opens the organization home page.
3. In the left navigation menu under **Admin**, click **Environments**.
4. Click **+ Create**. This opens the environment creation page.

    <ThemedImage
        alt="Create environment page"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/create-environment/create-environment-page.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/create-environment/create-environment-page.png'),
        }}
    />

5. Configure the environment using the following fields:

    | Field | Description |
    |---|---|
    | **Environment Name** | A display name for the environment. For example, `Staging` or `US East Production`. |
    | **Data Plane** | The data plane on which this environment runs. Select from the available data planes configured for your organization. |
    | **DNS Prefix** | A prefix used to construct endpoint URLs for integrations in this environment. |
    | **Mark as Production** | Select this checkbox if the environment should be treated as a production environment. |

    :::tip
    You can mark multiple environments as production. This is useful for multi-region deployments where you maintain independent production environments in different regions.
    :::

6. Click **+ Create**.

    <ThemedImage
        alt="Environment creating"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/create-environment/environment-creating.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/create-environment/environment-creating.png'),
        }}
    />

The new environment is created and available for use across projects in your organization.

## What's next

- [Configure promotion pipelines](./configure-promotion-pipelines.md) — Define the promotion flow of integrations across environments in your organization
- [Promote an integration](./promotion.md) — Move an integration from one environment to the next in your pipeline
