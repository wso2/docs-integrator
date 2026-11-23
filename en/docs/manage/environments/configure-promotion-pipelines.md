---
sidebar_position: 3
title: Configure Promotion Pipelines
description: Learn how to create and manage promotion pipelines in Choreo Integration to control how integrations move across environments.
keywords: [choreo cloud, deployment pipeline, promotion pipeline, cd pipeline, promotion, environments]
slug: /manage/environments/configure-promotion-pipelines
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Configure Promotion Pipelines

A promotion pipeline defines the ordered sequence of environments through which an integration is promoted. Choreo Integration provides a default pipeline and lets you create additional pipelines to match different promotion strategies across your projects.

## Default pipeline

Every organization starts with a **default** pipeline containing the environments available to your plan. The default pipeline cannot be deleted.

## Manage pipelines at the organization level

To view and manage promotion pipelines, navigate to the organization level.

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com/).
2. In the top navigation menu, click the organization name and select your organization.
3. Open **Settings**, then under **Infrastructure** click **Deployment Pipelines**.

This page lists all existing pipelines in your organization.

<ThemedImage
    alt="Deployment Pipelines page listing the organization's pipelines"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/deployment-pipelines.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/deployment-pipelines.png'),
    }}
/>

### Create a pipeline

1. On the **Deployment Pipelines** page, click **+ Create Pipeline**.
2. In the pipeline creation page, configure the following:

    | Field | Description |
    |---|---|
    | **Name** | A display name for the pipeline. |
    | **Promotion flow** | The ordered sequence of environments deployments move through. Add at least one environment. If you need a new environment, [create one first](./create.md) before configuring the pipeline. |

    <ThemedImage
        alt="Pipeline editor showing the Name field and the Promotion flow environment list"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/configure-pipeline.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/configure-pipeline.png'),
        }}
    />

3. Click **Create**.

The new pipeline is added to the list on the **Deployment Pipelines** page.

### Edit a pipeline

On the **Deployment Pipelines** page, click the edit icon on the pipeline you want to modify. Update the promotion flow and click **Save Changes**. A pipeline's name cannot be changed after creation.

### Delete a pipeline

On the **Deployment Pipelines** page, click the delete icon on the pipeline you want to remove.

## Assign a pipeline to a project

Once you create a pipeline, you can assign it to one or more projects. Multiple pipelines can be active in the same project at the same time.

1. In the top navigation menu, click the **Project** list and select the project you want to configure.
2. From the project home, click **Settings**.
3. Select the pipeline from the **Deployment pipeline** list, then click **Save changes**.

## Select a pipeline for an integration

When multiple pipelines are assigned to a project, you can choose which pipeline to use for a specific integration.

1. Open the integration and go to its **Deploy** page.
2. Switch the active pipeline using the pipeline selector on the **Deploy** page.

<ThemedImage
    alt="Switch pipeline"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/deploy-page-integration.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/deploy-page-integration.png'),
    }}
/>

## What's next

- [Environments overview](./environments.md) — Understand how environments work and how integrations are isolated across them.
- [Promote an integration](./promotion.md) — Move an integration from one environment to the next in your pipeline.
