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

The User Portal is a separate portal that exposes your integrations to external users. These users are the people your organization serves, not the developers who build integrations. In the User Portal, they can:

- Chat with the AI agents that you publish.
- Run the automations that you publish, with or without runtime arguments.

Users sign in to the User Portal through your organization in Choreo Identity & Access Management, which is the user store for the User Portal. Users do not need access to the Choreo Cloud console. You create users and roles, and assign permissions to roles, from the Choreo Cloud console. The roles of a user control which integrations the user can see and what the user can do with them. See [Manage Users](manage-users.md).

You enable the User Portal once per environment, for the whole organization. After that, you choose which integrations to show in it, on each integration's own overview page. See [Publish an Integration](publish-to-user-portal.md).

## Prerequisites

- **You have the required permission.** Your role must include the **Manage Organization** permission under **Organization Management**, assigned at the organization level. For more information about roles and permissions, see [Member Access](../access-control.md).
- **The project is on the organization's default deployment pipeline.** Only integrations in a project that uses the **default** promotion pipeline can be published to the User Portal. If your project uses a different pipeline, [switch it from the project's **Settings**](../../environments/configure-promotion-pipelines.md#assign-a-pipeline-to-a-project) first.

{/* TODO(v3): the v2 prerequisites around Choreo Identity username validation, Developer Portal key manager trust, and resource-name collisions were tied to a Developer Portal-based mechanism that no longer exists. Re-verify whether any equivalent blocker still applies to the v3 flow below before restoring that content. */}

## Enable the User Portal

The User Portal is enabled per environment (for example, Development), for the whole organization — not per integration. Every integration in that environment can then be individually published to it. Enabling it requires the **Manage Organization** permission, so this is an organization administrator's task.

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. In the left navigation menu of the Integration app, click **Configure**.
3. Click the **User Portal** tab.
4. Click **Enable User Portal**, select the **Environment**, then click **Enable**.

    <ThemedImage
        alt="Enable User Portal dialog with an Environment dropdown set to Production"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/enable-confirm.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/enable-confirm.png'),
        }}
    />

The **User Portal** page shows a card for the environment. While the platform sets up the User Portal, the card shows **Setting up**. When the platform finishes, the card shows **Active** with an **Open portal** button.

<ThemedImage
    alt="Configure > User Portal page with a card for the Development environment showing Active status and an Open portal button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/user-portal-status.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/user-portal-status.png'),
    }}
/>

{/* TODO(v3): didn't observe a Setting up card live this pass - only confirmed the eventual Active state. */}

### Enable it from an integration instead

If you have an unpublished integration open, you can reach the same **Configure** > **User Portal** page from there instead of navigating to **Configure** directly:

1. Open the integration and wait until its environment card shows **Active**.
2. On that card, click **Share with your users**.
3. In the **About the User Portal** dialog, click **Enable User Portal**. This takes you to **Configure** > **User Portal**, scoped to that integration's environment. Continue from step 4 above.

    <ThemedImage
        alt="About the User Portal dialog with an Enable User Portal button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/about-user-portal-dialog.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/about-user-portal-dialog.png'),
        }}
    />

You can now [add users](manage-users.md) and [publish integrations](publish-to-user-portal.md).

## What the platform provisions for you

Enabling the User Portal for an environment creates an **Integration User Portal** project in Identity & Access Management, with a **User Portal API** resource server already defining the scopes that control what a user can do in the User Portal. See [Scopes](manage-users.md#scopes).

<ThemedImage
    alt="Integration User Portal project in Choreo Identity & Access Management"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/integration-user-portal-project.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/integration-user-portal-project.png'),
    }}
/>

## What's next

- [Publish an Integration](publish-to-user-portal.md) — Choose which AI agents and automations appear in the User Portal.
- [Manage Users](manage-users.md) — Create users and roles, and assign permissions to roles.
- [Sign In](sign-in-to-user-portal.md) — Sign in with a User Portal account to use the integrations published to you.
- [Run Available Integrations](use-user-portal.md) — Chat with AI agents and run automations.
- [Check Status](check-and-repair.md) — Check whether the User Portal is active for an environment.
