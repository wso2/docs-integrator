---
sidebar_position: 0
sidebar_label: Overview
title: User Portal
description: "Enable the User Portal in Choreo Integration so that external users can sign in and use the AI agents and automations that your organization publishes."
keywords: [choreo cloud, user portal, external users, ai agents, automations, identity platform]
slug: /manage/users-and-access/user-portal
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# User Portal

{/* TODO(v3): this page still describes the User Portal working through the Developer Portal, which is not in v3. Confirm the replacement mechanism and rewrite the prerequisites and resources table. */}

The User Portal is a separate portal that exposes your integrations to external users. These users are the people your organization serves, not the developers who build integrations. In the User Portal, they can:

- Chat with the AI agents that you publish.
- Run the automations that you publish, with or without runtime arguments.

Users sign in to the User Portal through your organization in Choreo Identity & Access Management, which is the user store for the User Portal. Users do not need access to the Choreo Cloud console. You create users and roles, and assign permissions to roles, from the Choreo Cloud console. The roles of a user control which integrations the user can see and what the user can do with them. See [Manage users in the User Portal](manage-users.md).

You enable the User Portal for each environment. After that, you choose which integrations to show in it. See [Publish an integration to the User Portal](publish-to-user-portal.md).

## Prerequisites

Before you enable the User Portal, make sure of the following:

- **You have the required permission.** Your role must include the **Manage Organization** permission under **Organization Management**, assigned at the organization level. For more information about roles and permissions, see [Access Control](../access-control.md).
- **Your Choreo Identity organization validates usernames as email addresses.** The platform adds members of your Choreo Cloud organization to Choreo Identity with their email address as the username. You must change this setting yourself. See [Resolve blockers](check-and-repair.md#resolve-blockers).
- **The Developer Portal uses your Choreo Identity organization as its key manager.** The User Portal calls your AI agents through the Developer Portal. It works only when the Developer Portal trusts the Choreo Identity organization that belongs to your Choreo Cloud organization as its key manager. Choreo Identity then issues the keys and tokens, and the Developer Portal accepts them. If this is not the case, the **User Portal** page shows a blocker. You can fix most key manager blockers from that page. See [Resolve blockers](check-and-repair.md#resolve-blockers).
- **No other resources use the names that the User Portal needs.** If a resource with the same name already exists in Choreo Identity or in the Developer Portal, and the User Portal did not create it, the **User Portal** page shows a blocker. You must rename or remove that resource before you continue.

:::info
When you create an organization in Choreo Cloud, the platform creates an organization with the same name in Choreo Identity. The User Portal uses that organization.
:::

## What the platform provisions for you

When you enable the User Portal, the platform creates the following resources on your behalf. You do not need to create them manually.

| Resource | Name | Where it is created | Purpose |
|---|---|---|---|
| **Trusted token issuer** | `Integration Platform STS` | Your Choreo Identity organization | Lets Choreo Identity trust tokens that the Integration Platform issues. |
| **User Portal application** | `User Portal` | Your Choreo Identity organization | The application that users sign in to. |
| **User Portal API resource** | `User Portal APIs` | Your Choreo Identity organization | Defines the scopes that control what a user can do in the User Portal. See [Scopes](manage-users.md#scopes). |
| **API authorization** | `User Portal APIs` | Your Choreo Identity organization | Authorizes the User Portal application for every scope of the User Portal API resource. |
| **Developer Portal application** | `User Portal` | The Developer Portal | Subscribes to the APIs of the AI agents that you publish, so that the User Portal can call them. |

If the Developer Portal has no key manager, you can also let the platform configure your Choreo Identity organization as its key manager. The platform does this only after you confirm it. See [Resolve blockers](check-and-repair.md#resolve-blockers).

## Enable the User Portal

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. In the top navigation, click the organization list and select your organization.
3. Click the app menu at the top left, then under **Categories**, click **Integration**.
4. In the left navigation menu, click **Configure**.
5. Click the **User Portal** tab.

    <ThemedImage
        alt="User Portal tab with the Enable User Portal button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/enable-ready.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/enable-ready.png'),
        }}
    />

6. Click **Enable User Portal**.
7. In the **Enable User Portal** dialog, select an **Environment**.

    <ThemedImage
        alt="Enable User Portal dialog with the Environment list"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/enable-confirm.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/enable-confirm.png'),
        }}
    />

8. Click **Enable**.

The **User Portal** tab shows a card for the environment. While the platform sets up the User Portal, the card shows **Setting up**. When the platform finishes, the card shows **Active**.

<ThemedImage
    alt="User Portal tab with an Active User Portal card for the Development environment and the Open portal button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/enabled-healthy.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/enabled-healthy.png'),
    }}
/>

To open the User Portal of the environment in a new tab, click **Open portal** on its card.

You can now [add users](manage-users.md) and [publish integrations to the User Portal](publish-to-user-portal.md).

## What's next

- [Publish an integration to the User Portal](publish-to-user-portal.md)
- [Manage users in the User Portal](manage-users.md)
- [Sign in to the User Portal](sign-in-to-user-portal.md)
- [Use the User Portal](use-user-portal.md)
- [Check and repair the User Portal](check-and-repair.md)
