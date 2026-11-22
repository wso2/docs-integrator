---
sidebar_position: 1
title: Publish an Integration to the User Portal
description: "Publish AI agents, automations, and workflows from WSO2 Cloud - Integration Platform to the User Portal so that external users can use them."
keywords: [wso2 cloud, user portal, publish, ai agents, automations, workflows]
slug: /manage/users-and-access/user-portal/publish-integrations
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

- The User Portal is enabled for your organization. See [Enable the User Portal](user-portal.md#enable-the-user-portal). Until then, the integration's overview page shows a **Publish to User Portal** button instead of the toggle. Click it, then click **Enable in Settings** to go to the **User Portal** page. If you do not have the permissions to enable the User Portal, ask an organization administrator to enable it.
- The integration is deployed to the production environment. Until then, **Publish to User Portal** is disabled. See [Promote an integration](../../environments/promotion.md).
- Your role includes the **Manage Organization** permission. Without it, **Publish to User Portal** is disabled. You need the same permission to choose the chat endpoints of an AI agent and to unpublish an integration.

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

When you confirm, the platform publishes the integration to the User Portal and makes the endpoints the User Portal needs available automatically:

- **AI agents**: The endpoints that have a `/chat` resource.
- **Workflows**: The management endpoint. WSO2 Cloud adds this endpoint to every workflow when it deploys the workflow.
- **Automations**: No endpoint is required.

{/* TODO(v3): confirm how the User Portal reaches an integration's endpoints now that the Developer Portal is gone, and document the new mechanism here. */}

Publishing an integration does not give users access to it. To see the integration in the User Portal, a user needs a role with the view scope for the integration's type. See [Scopes](manage-users.md#scopes).

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

## Choose the chat endpoints of an AI agent

If a published AI agent has more than one endpoint with a chat resource, you can choose which endpoints are available in the User Portal. By default, all of them are available.

1. Open the AI agent.
2. In the left navigation menu, click **Overview**.
3. On the production environment card, next to each chat endpoint, turn the **User Portal** toggle on or off.

When you turn on the toggle for an endpoint, the platform makes it available in the User Portal.

## Unpublish an integration

1. Open the integration.
2. In the left navigation menu, click **Overview**.
3. Turn off the **Publish to User Portal** toggle.
4. In the confirmation dialog, click **Unpublish**.

The integration no longer appears in the User Portal.

## What's next

- [Manage users and roles](manage-users.md) so that users can sign in to the User Portal and see the integrations.
- [Sign in to the User Portal](sign-in-to-user-portal.md).
- [Use the User Portal](use-user-portal.md) to chat with AI agents, run automations, and work with workflows.
