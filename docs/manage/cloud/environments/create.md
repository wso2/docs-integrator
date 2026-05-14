---
title: Create an Environment
---

# Create an Environment

WSO2 Cloud - Integration Platform provides **Development** and **Production** environments by default. You can create additional environments, such as a staging or regional environment, to match your release pipeline.

Free-tier organizations can have a maximum of three environments.

## Prerequisites

- You must have organization administrator privileges to create environments.

## Create an environment

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. In the top navigation menu, click the **Organization** list and select your organization. This opens the organization home page.
3. In the left navigation menu under **Admin**, click **Environments**.
4. Click **+ Create**. This opens the environment creation page.

    ![Create environment page](/img/manage/cloud/environments/create-environment/create-environment-page.png)

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

    ![Environment creating](/img/manage/cloud/environments/create-environment/environment-creating.png)

The new environment is created and available for use across projects in your organization.

## What's next

- [Promote an integration](./promotion.md) — Move an integration from one environment to the next in your pipeline
- [Promotion approvals](./promotion-approval.md) — Require approvals before an integration is promoted to a protected environment
- [Manage deployment pipelines](../cicd/deployment-pipelines.md) — Define the promotion flow of integrations across environments in your organization
