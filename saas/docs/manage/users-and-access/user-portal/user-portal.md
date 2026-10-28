---
title: User Portal
---

# User Portal

The User Portal is a separate portal that exposes your integrations to external users. These users are the people your organization serves, not the developers who build integrations. In the User Portal, they can:

- Chat with the AI agents that you publish.
- Run the automations that you publish, with or without runtime arguments.
- Run the workflows that you publish.

Users sign in to the User Portal through your organization in WSO2 Identity Platform. Your WSO2 Identity Platform organization manages this user store, so you manage User Portal users in WSO2 Identity Platform. Users do not need access to the WSO2 Cloud console.

You enable the User Portal once for each organization. After that, you choose which integrations to show in it. See [Publish an integration to the User Portal](publish-to-user-portal.md).

## Prerequisites

Before you enable the User Portal, make sure of the following:

- **You have the required permission.** Your role must include the **Manage Organization** permission under **Organization Management**, assigned at the organization level. For more information about roles and permissions, see [Access Control](../access-control.md).
- **The Developer Portal uses your WSO2 Identity Platform organization as its key manager.** The User Portal calls your AI agents and workflows through the Developer Portal. It works only when the Developer Portal trusts the WSO2 Identity Platform organization that belongs to your WSO2 Cloud organization as its key manager. WSO2 Identity Platform then issues the keys and tokens, and the Developer Portal accepts them. If this is not the case, the **User Portal** page shows a blocker. You can fix most key manager blockers from that page. See [Resolve blockers](check-and-repair.md#resolve-blockers).
- **No other resources use the names that the User Portal needs.** If a resource with the same name already exists in WSO2 Identity Platform or in the Developer Portal, and the User Portal did not create it, the **User Portal** page shows a blocker. You must rename or remove that resource before you continue.

When you create an organization in WSO2 Cloud, the platform creates an organization with the same name in WSO2 Identity Platform. The User Portal uses that organization.

## What the platform provisions for you

When you enable the User Portal, the platform creates the following resources on your behalf. You do not need to create them manually.

| Resource | Where it is created | Purpose |
|---|---|---|
| **Trusted token issuer** | Your WSO2 Identity Platform organization | Lets WSO2 Identity Platform trust tokens that the Integration Platform issues. |
| **User Portal application** | Your WSO2 Identity Platform organization | The application that users sign in to. |
| **User Portal API resource** | Your WSO2 Identity Platform organization | Defines the scopes that control what the User Portal can do on behalf of a user. |
| **Developer Portal application** | The Developer Portal | Subscribes to the APIs of the AI agents and workflows that you publish, so that the User Portal can call them. |

If the Developer Portal has no key manager, you can also let the platform configure your WSO2 Identity Platform organization as its key manager. The platform does this only after you confirm it. See [Resolve blockers](check-and-repair.md#resolve-blockers).

## Enable the User Portal

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. In the top navigation, click the **Organization** list and select your organization.
3. In the left navigation menu, click **Settings** under **Admin**.
4. Click the **User Portal** tab.

    The page checks what the User Portal needs and shows one of the following:

    - **Ready to enable**: Everything is in place or the platform will create it for you.
    - **Blockers**: One or more items must be fixed before you can enable the User Portal. See [Resolve blockers](check-and-repair.md#resolve-blockers).

    <ThemedImage
        alt="User Portal tab ready to enable, with the Enable User Portal button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/enable-ready.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/enable-ready.png'),
        }}
    />

5. Click **Enable User Portal**.

<ThemedImage
    alt="User Portal tab showing that the User Portal is enabled and everything it needs is in place"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/enabled-healthy.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/enabled-healthy.png'),
    }}
/>

When the platform finishes, the page shows that the User Portal is enabled for the organization and that everything it needs is in place. You can now [publish integrations to the User Portal](publish-to-user-portal.md) and [add users](manage-users.md).

After you enable the User Portal, the **User Portal** tab also works as a health check. See [Check and repair the User Portal](check-and-repair.md).

## What's next

- [Publish an integration to the User Portal](publish-to-user-portal.md)
- [Manage users in the User Portal](manage-users.md)
- [Sign in to the User Portal](sign-in-to-user-portal.md)
- [Use the User Portal](use-user-portal.md)
- [Check and repair the User Portal](check-and-repair.md)
