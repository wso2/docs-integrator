---
sidebar_position: 0
sidebar_label: Integration Management
title: Integration Management
description: "View and manage the lifecycle of integrations deployed to Choreo Integration, including scheduling, stopping, scaling, editing, and deleting."
keywords: [choreo integrator, choreo cloud, deployed integrations, view integrations, integration lifecycle]
slug: /manage/integrations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Integration Management

After pushing your integrations to Choreo Integration, you can view and manage them from the console. Each integration shows its build status, deployment status, and configuration options from its overview page. If you haven't created an integration on Choreo Cloud yet, see the [Deploy](../../deploy-and-run/deploy-and-run.md) section.

If your integration is exposed as an API, see [API Management](api-management/api-management.md) for security and analytics.

## View integrations

1. Log in to [Choreo Cloud](https://console.cloud.choreolabs.com). The default project opens automatically.
2. On the project home, all integrations within the project are listed.
    <ThemedImage
        alt="Project home page listing its integrations with their type and last-updated time"
        sources={{
            light: useBaseUrl('/img/deploy/cloud/deploy-from-editor/project-page-wso2-cloud.png'),
            dark: useBaseUrl('/img/deploy/cloud/deploy-from-editor/project-page-wso2-cloud.png'),
        }}
    />
3. Click an integration to open its overview page, where you can view its build status, deployment status, and configuration options.
    <ThemedImage
        alt="Integration overview page showing its latest build, Development environment, endpoint, and security"
        sources={{
            light: useBaseUrl('/img/manage/cloud/integrations/integration-overview.png'),
            dark: useBaseUrl('/img/manage/cloud/integrations/integration-overview.png'),
        }}
    />

To work with a different project, use the project navigator at the top of the console to switch between projects.

## Manage deployment lifecycle

Deployment lifecycle management options depend on the integration type.

### Automation

From the integration overview page, you can manage the schedule for each environment independently:

- **Schedule**: Click **Schedule** on an environment card to set when the automation runs. Choose **By interval** (a number and a unit — minute, hour, day, week, or month) or **By cron** (a raw cron expression), then click **Update**.
- **Edit schedule**: Modify the existing schedule.
- **Stop schedule**: Disable the schedule without deleting the integration. You can still run the integration manually.

{/* TODO(v3): the Edit schedule / Stop schedule controls are not verified against v3 - the
    test organization's automation has no active schedule to inspect. Set one, confirm the
    button labels, and re-shoot if they differ. */}

### Integration as API

Each environment card shows its status as **Active** or **Suspended**. Click **Stop** to suspend the deployment, or **Start** to bring a suspended one back. The status briefly shows **In progress** while the change applies.

### AI agent

Lifecycle management works the same as [Integration as API](#integration-as-api).

### Event integration

From the integration overview page, you can restart the deployment for each environment independently.

### File integration

Lifecycle management works the same as [Event integration](#event-integration). Use the overview page to restart deployments for each environment.

## Edit an integration

From the integration overview page, you can update the integration's name, description, and labels inline.

- **Name**: Click the integration name to edit it in place.
- **Description**: Click the description text to edit it in place.

    <ThemedImage
        alt="Integration overview page with the description field open for inline editing"
        sources={{
            light: useBaseUrl('/img/manage/cloud/integrations/edit-description.png'),
            dark: useBaseUrl('/img/manage/cloud/integrations/edit-description.png'),
        }}
    />

- **Labels**: Click **Add labels**, enter a label, and press Enter to add it. Click **Save** to apply your changes.

## Delete an integration

:::danger
Deleting an integration is permanent. All deployment history and configuration for the integration are removed and cannot be recovered.
:::

1. Click the project name in the top navigation to go to the project view.
2. In the list of integrations, hover over the integration you want to delete. A **Delete** button appears.

    <ThemedImage
        alt="Delete button shown when hovering over an integration in the project overview"
        sources={{
            light: useBaseUrl('/img/manage/cloud/integrations/delete-integration-hover.png'),
            dark: useBaseUrl('/img/manage/cloud/integrations/delete-integration-hover.png'),
        }}
    />

3. Click **Delete**, then enter the integration name to confirm and click **Delete**.

    <ThemedImage
        alt="Confirmation dialog for removing an integration"
        sources={{
            light: useBaseUrl('/img/manage/cloud/integrations/delete-integration-confirm.png'),
            dark: useBaseUrl('/img/manage/cloud/integrations/delete-integration-confirm.png'),
        }}
    />

The integration is permanently deleted.

## What's next

- [API Management](api-management/api-management.md) — Secure, monitor, and govern integrations exposed as APIs.
- [Configuration Management](../configurations/configurations.md) — Configure integration settings, runtime configurations, build configurations, and scaling options.
- [Manage Projects](../projects.md) — Create, edit, and remove projects in your organization.
