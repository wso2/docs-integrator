---
title: Publish an Integration to the User Portal
---

# Publish an Integration to the User Portal

After you [enable the User Portal](user-portal.md), you choose which integrations appear in it. An integration appears in the User Portal only after you publish it there. You can unpublish it at any time.

## Supported integration types

The User Portal supports the following integration types:

| Integration type | What users can do in the User Portal |
|---|---|
| **AI agent** | Chat with the agent. |
| **Automation** | Run the automation. If the automation has runtime arguments, users first enter values in a form that the User Portal builds from those arguments. |
| **Workflow** | Run and manage workflows, and act on assigned human tasks. |

For each automation, users can also see when it last ran and, if it is scheduled, when it runs next.

## Prerequisites

- The User Portal is enabled for your organization. See [Enable the User Portal](user-portal.md#enable-the-user-portal).
- The integration is deployed to the production environment. Until then, **Publish to User Portal** is disabled. See [Promote an integration](../../environments/promotion.md).

## Publish an integration

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. Select the project that contains the integration.
3. In the **Integrations** pane, click the integration that you want to publish.
4. On the integration's overview page, turn on the **Publish to User Portal** toggle.

    <ThemedImage
        alt="Publish to User Portal toggle on the integration overview page"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/publish-toggle.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/publish-toggle.png'),
        }}
    />

5. In the confirmation dialog, click **Publish**.

    <ThemedImage
        alt="Publish this agent confirmation dialog"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/publish-confirm.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/publish-confirm.png'),
        }}
    />

When you confirm, the platform publishes the integration to the User Portal. For AI agents and workflows, the User Portal calls the integration through the Developer Portal, so the platform also does the following automatically:

1. Publishes the endpoints that the User Portal uses to the Developer Portal, by moving them to the `PUBLISHED` lifecycle state. The platform skips any endpoint that is already in that state.

    - **AI agents**: The endpoints that have a `/chat` resource.
    - **Workflows**: The management endpoint. WSO2 Cloud adds this endpoint to every workflow when it deploys the workflow.

2. Subscribes the User Portal's Developer Portal application to those endpoints.

Automations are not called through the Developer Portal, so the platform skips these steps for them.

After the integration is published, the platform shows a confirmation message, and a **User Portal** button appears on the overview page. Click it to open the User Portal for your organization in a new tab. The User Portal tries to sign you in automatically. See [Automatic sign-in from the console](sign-in-to-user-portal.md#automatic-sign-in-from-the-console).

<ThemedImage
    alt="User Portal button on the integration overview page after publishing"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/user-portal-button.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/user-portal-button.png'),
    }}
/>

### If publishing fails

If the platform cannot publish the integration, it shows an error message. The following are common causes:

- **The AI agent has no endpoint with a `/chat` resource in production.** Deploy an endpoint with a `/chat` resource to production, then try again.
- **The platform cannot publish an endpoint to the Developer Portal.** This can happen when another API in the Developer Portal already uses the same name. To fix this, publish the endpoint to the Developer Portal manually from the integration's **Lifecycle** page. See [Lifecycle Management](../../integrations/api-management/lifecycle-management.md). Then return to the overview page and publish the integration to the User Portal again.

## Choose the chat endpoints of an AI agent

If a published AI agent has more than one endpoint with a chat resource, you can choose which endpoints are available in the User Portal. By default, all of them are available.

1. On the AI agent's overview page, go to the production environment card.
2. Next to each chat endpoint, turn the **User Portal** toggle on or off.

When you turn on the toggle for an endpoint, the platform publishes that endpoint to the Developer Portal if needed, then makes it available in the User Portal.

## Unpublish an integration

1. On the integration's overview page, turn off the **Publish to User Portal** toggle.
2. In the confirmation dialog, click **Unpublish**.

The integration no longer appears in the User Portal. For AI agents and workflows, the platform removes the User Portal's Developer Portal subscriptions to the endpoints.

Unpublishing from the User Portal does not change the lifecycle state of the endpoints in the Developer Portal. The endpoints stay in the `PUBLISHED` state. To change their state, see [Lifecycle Management](../../integrations/api-management/lifecycle-management.md).

## What's next

- [Add users](manage-users.md) so that external users can sign in to the User Portal.
- [Sign in to the User Portal](sign-in-to-user-portal.md).
- [Use the User Portal](use-user-portal.md) to chat with AI agents, run automations, and work with workflows.
