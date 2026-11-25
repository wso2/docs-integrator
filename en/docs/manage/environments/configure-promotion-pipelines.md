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
    | **Name** | A unique identifier for the pipeline, using lowercase letters, numbers, and hyphens. Cannot be changed after creation. |
    | **Promotion flow** | The ordered sequence of environments deployments move through. Click **Add Environment** to add the first environment, then use the **+** after it to add the next. Add at least one. If you need a new environment, [create one first](./create.md) before configuring the pipeline. |

    <ThemedImage
        alt="Create Pipeline form with a three-stage promotion flow: development, staging, production"
        sources={{
            light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/configure-pipeline.png'),
            dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/configure-pipeline.png'),
        }}
    />

3. Click **Create**.

The new pipeline is added to the list on the **Deployment Pipelines** page.

### Edit a pipeline

On the **Deployment Pipelines** page, click the edit icon on the pipeline you want to modify.

<ThemedImage
    alt="Deployment Pipelines page with the edit icon highlighted on the dev-staging-prod pipeline"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/edit-pipeline-button.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/edit-pipeline-button.png'),
    }}
/>

Update the promotion flow and click **Save Changes**. A pipeline's name cannot be changed after creation.

<ThemedImage
    alt="Edit Pipeline form showing the Name field disabled and the three-stage promotion flow"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/edit-pipeline-form.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/edit-pipeline-form.png'),
    }}
/>

### Delete a pipeline

A pipeline can only be deleted once **no** project uses it — even a single project assigned to it is enough to block deletion. The delete icon is disabled in that case, with a tooltip explaining why; reassign every project using the pipeline to a different one first.

<ThemedImage
    alt="Deployment Pipelines page with a disabled delete icon and a tooltip explaining the pipeline can't be deleted because a project is using it"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/delete-pipeline-blocked.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/delete-pipeline-blocked.png'),
    }}
/>

Once a pipeline is unused, click its delete icon.

<ThemedImage
    alt="Deployment Pipelines page with the delete icon highlighted on an unused pipeline"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/delete-pipeline-button.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/delete-pipeline-button.png'),
    }}
/>

Type the pipeline's name to confirm, then click **Delete**. This is permanent.

<ThemedImage
    alt="Delete pipeline confirmation dialog with the pipeline name typed in to enable the Delete button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/delete-pipeline-confirm.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/delete-pipeline-confirm.png'),
    }}
/>

## Assign a pipeline to a project

Each project uses exactly one pipeline at a time, shared by every integration in that project.

1. In the top navigation menu, click the **Project** list and select the project you want to configure.
2. From the project home, click **Settings**.
3. Select the pipeline from the **Deployment pipeline** list, then click **Save changes**.

<ThemedImage
    alt="Project settings page with the Deployment pipeline field set to a three-stage pipeline"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/assign-pipeline.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/assign-pipeline.png'),
    }}
/>

Every integration in the project now deploys through this pipeline's environments, in order.

<ThemedImage
    alt="Deploy page for an integration showing Development, Staging, and Production environment cards with Promote buttons between them"
    sources={{
        light: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/deploy-page-pipeline.png'),
        dark: useBaseUrl('/img/manage/cloud/environments/pipeline-configuration/deploy-page-pipeline.png'),
    }}
/>

## What's next

- [Environments overview](./environments.md) — Understand how environments work and how integrations are isolated across them.
- [Promote an integration](../integrations/operate/promotion.md) — Move an integration from one environment to the next in your pipeline.
