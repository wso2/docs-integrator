---
title: Deployment Pipelines
---

# Manage Deployment Pipelines

A deployment pipeline defines the ordered sequence of environments through which an integration is promoted. WSO2 Cloud - Integration Platform provides a default pipeline and lets you create additional pipelines to match different promotion strategies across your projects.

## Default pipeline

Every organization starts with a **Default** pipeline containing two environments: **Development** and **Production**. The default pipeline cannot be deleted.

## Manage pipelines at the organization level

To view and manage deployment pipelines, navigate to the organization level.

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the top navigation menu, click the **Organization** list and select your organization.
3. In the left navigation menu under **Admin**, click **CD Pipelines**.

This page lists all existing pipelines in your organization.

![Deployment pipelines](/img/manage/cloud/cicd/pipeline-configuration/deployment-pipelines.png)

### Create a pipeline

1. On the **CD Pipelines** page, click **+ Create Pipeline**.
2. In the pipeline creation page, configure the following:

    | Field | Description |
    |---|---|
    | **Name** | A display name for the pipeline. |
    | **Promotion hierarchy** | The ordered sequence of environments through which integrations are promoted. Add environments and arrange them to define the promotion flow. If you need a new environment, [create one first](../environments/create.md) before configuring the pipeline. |

    ![Configure pipeline](/img/manage/cloud/cicd/pipeline-configuration/configure-pipeline.png)

3. Click **Create**.

The new pipeline is added to the list on the **CD Pipelines** page.

### Edit a pipeline

On the **CD Pipelines** page, click the edit icon on the pipeline you want to modify. Update the name or promotion hierarchy and save your changes.

### Delete a pipeline

On the **CD Pipelines** page, click the delete icon on the pipeline you want to remove.

## Assign a pipeline to a project

Once you create a pipeline, you can assign it to one or more projects. Multiple pipelines can be active in the same project at the same time.

1. In the top navigation menu, click the **Project** list and select the project you want to configure.
2. In the left navigation menu under **Admin**, click **CD Pipelines**.
3. Add the pipeline to the project from the list of available pipelines.

## Select a pipeline for an integration

When multiple pipelines are assigned to a project, you can choose which pipeline to use for a specific integration.

1. Open the integration and go to its **Deploy** page.
2. Switch the active pipeline using the pipeline selector on the **Deploy** page.

![Switch pipeline](/img/manage/cloud/cicd/pipeline-configuration/deploy-page-integration.png)

## What's next

- [Environments overview](../environments/overview.md) — Understand how environments work and how integrations are isolated across them
- [Promote an integration](../environments/promotion.md) — Move an integration from one environment to the next in your pipeline
