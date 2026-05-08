---
title: Lifecycle
---

# Integration lifecycle

Lifecycle management options depend on the type of integration. You can manage each integration's lifecycle from its overview page in WSO2 Cloud.

## Automation

From the integration overview page, you can manage the schedule for each environment independently:

- **Schedule**: Set a schedule to run the automation. You can either use a cron expression or select from predefined options like hourly, daily, or weekly.
- **Edit schedule**: Modify the existing schedule.
- **Stop schedule**: Disable the schedule without deleting the integration. You can run the integration manually.

## Integration as API

The deployment status for each environment is visible from the overview page. Because scale to zero is enabled by default, you cannot manually stop a deployment.

To manually stop or start a deployment:

1. In the console, go to **Admin** > **Scaling**.
2. Disable **Scale to zero** for the relevant environment.
3. Return to the integration overview page. You can now stop and start the deployment for each environment.

## AI agent

Lifecycle management works the same as [Integration as API](#integration-as-api). Scale to zero is enabled by default, and you must disable it from **Admin** > **Scaling** before you can manually stop or start a deployment.

## Event integration

From the integration overview page, you can restart the deployment for each environment independently.

## File integration

Lifecycle management works the same as [Event integration](#event-integration). Use the overview page to restart deployments for each environment.

## What's next

- [Configure your integration](../configurations/overview) - Configure integration settings, runtime configurations, build configurations, and scaling options.
