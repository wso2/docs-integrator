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

Every organization starts with a single default environment, named **development**. You can create additional environments, such as a staging or production environment, to match your release pipeline.

:::info
Creating additional environments requires the **Growth** or **Enterprise** plan.
:::

## Prerequisites

- You must have organization administrator privileges to create environments.

## Create an environment

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. Open the 9-dot app switcher and click **Settings** under **Manage**.
3. In the left navigation under **Infrastructure**, click **Environments**.
4. Click **+ Create Environment**.

    <ThemedImage
        alt="Environments page with the Create Environment button highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/create-environment/environments-list.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/create-environment/environments-list.png'),
        }}
    />

5. Configure the environment using the following fields:

    | Field | Description |
    |---|---|
    | **Name** | A unique identifier for the environment. Cannot be changed after creation. |
    | **Display name** | The name shown in the console. |
    | **Description** | Optional. A short description of the environment's purpose. |
    | **Critical environment** | Turn this on if the environment is used for production-grade deployments and requires greater care. |

    <ThemedImage
        alt="Create Environment form filled in for a new Staging environment"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/create-environment/create-environment-form.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/create-environment/create-environment-form.png'),
        }}
    />

    :::tip
    You can mark multiple environments as critical. This is useful for multi-region deployments where you maintain independent production environments in different regions.
    :::

6. Click **Create**.

The new environment is created and available for use across projects in your organization.

<ThemedImage
    alt="Staging environment overview page immediately after creation"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/create-environment/environment-created.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/create-environment/environment-created.png'),
    }}
/>

## What's next

- [Configure promotion pipelines](./configure-promotion-pipelines.md) — Define the promotion flow of integrations across environments in your organization
- [Promote an integration](./promotion.md) — Move an integration from one environment to the next in your pipeline
