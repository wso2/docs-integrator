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
        alt="Environments page with the Create Environment button showing the plan-upgrade tooltip"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/create-environment/create-environment-gated.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/create-environment/create-environment-gated.png'),
        }}
    />

5. Configure the environment using the following fields:

    | Field | Description |
    |---|---|
    | **Name** | A unique identifier for the environment. Cannot be changed after creation. |
    | **Display name** | The name shown in the console. |
    | **Description** | Optional. A short description of the environment's purpose. |
    | **Critical environment** | Turn this on if the environment is used for production-grade deployments and requires greater care. |

    The following screenshot shows these fields on the **Edit Environment** form; the creation form uses the same fields.

    <ThemedImage
        alt="Edit Environment form showing the Name, Display name, Description, and Critical environment fields"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/create-environment/environment-fields.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/create-environment/environment-fields.png'),
        }}
    />

    :::tip
    You can mark multiple environments as critical. This is useful for multi-region deployments where you maintain independent production environments in different regions.
    :::

6. Click **Create**.

The new environment is created and available for use across projects in your organization.

{/* TODO(v3): the actual Create Environment form (field order, validation, and the
    post-create confirmation) is unverified — the trial org used for these docs is
    gated behind the Growth/Enterprise plan and can't create a second environment.
    Re-shoot the creation flow itself once verified against an org on that plan. */}

## What's next

- [Configure promotion pipelines](./configure-promotion-pipelines.md) — Define the promotion flow of integrations across environments in your organization
- [Promote an integration](./promotion.md) — Move an integration from one environment to the next in your pipeline
