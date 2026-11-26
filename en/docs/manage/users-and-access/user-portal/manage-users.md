---
sidebar_position: 2
title: Manage Users
description: "Create User Portal users and roles, assign permissions to roles, and assign roles to users from the Choreo Integration console."
keywords: [choreo cloud, user portal, users, roles, permissions, scopes, external users, identity and access management]
slug: /manage/users-and-access/user-portal/manage-users
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Manage Users

When you [enable the User Portal](user-portal.md#enable-the-user-portal), the platform creates a project named **Integration User Portal** in **Identity & Access Management**. Users sign in to the User Portal with an account in that project. You create users and roles, and assign permissions to roles, in that project. Changes take effect in an environment after you [deploy them](#deploy-your-changes).

The roles of a user decide what the user can do in the User Portal. Each role holds a set of permissions, which are the scopes that are added to the user's token. The User Portal shows an integration only if the user has the view scope for its type. See [Scopes](#scopes).

:::info
To manage User Portal users and roles in the Choreo Cloud console, your role must include the **Manage Organization** permission under **Organization Management**, assigned at the organization level. For more information about roles and permissions, see [Member Access](../access-control.md).
:::

## How access works

### Scopes

When you [enable the User Portal](user-portal.md#enable-the-user-portal), the platform adds the **User Portal API** to the **Integration User Portal** project. It defines the following scopes. To see them, [open the project](#open-the-integration-user-portal-project), click **Roles**, click a role, then click **Permissions**.

| Scope | What it allows | View scope |
|---|---|---|
| `automation:view` | View automations in the organization. | Yes |
| `automation:trigger` | Run automations in the organization. | No |
| `aiagent:view` | View AI agents in the organization. | Yes |
| `aiagent:invoke` | Chat with AI agents in the organization. | No |

The User Portal uses these scopes as follows:

- **To see an integration, a user needs the view scope for its type.** A user needs `automation:view` to see automations and `aiagent:view` to see AI agents. If a user has none of these scopes, the User Portal shows no integrations.
- **To run an automation, a user needs `automation:trigger`.** Without this scope, the user can see the automation but cannot run it.

:::note
By default, an AI agent does not check the `aiagent:invoke` scope, so any user who can see the agent can chat with it. To make the agent require this scope, change the security settings of the agent's chat endpoint: select the **OAuth2** security scheme, then assign the `aiagent:invoke` scope as a permission to the `/chat` resource. See [Configure security for an integration as an API](../../integrations/api-management/api-security.md#configure-security-for-an-integration-as-an-api).
:::

You can also give users scopes that you define. See [Add scopes from your own APIs](#add-scopes-from-your-own-apis).

### Roles

The platform does not assign a role to users that you create. After you [create a user](#create-a-user), [assign the roles that the user needs](#assign-roles-to-a-user). A user without a role cannot see any integrations in the User Portal.

:::note
Changes to the permissions of a role can take up to 10 minutes to appear in User Portal tokens. When you assign a role to a user or remove a role from a user, the change takes effect the next time the user signs in.
:::

## Open the Integration User Portal project

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. In the top navigation, click the organization list and select your organization.
3. Click the app menu at the top left, then under **Categories**, click **Identity & Access Management**.
4. Click the **Integration User Portal** project.

## Give a user access to the User Portal

To let a new user sign in to the User Portal and use your integrations, do the following in the **Integration User Portal** project:

1. [Create a role](#create-a-role) with the permissions that the user needs, or use an existing role.
2. [Create the user](#create-a-user).
3. [Assign the role to the user](#assign-roles-to-a-user).
4. [Deploy your changes](#deploy-your-changes).

The user can then [sign in](sign-in-to-user-portal.md) with their username and password.

## Manage users

In the **Integration User Portal** project, click **Users** in the left navigation menu. The **Users** page lists the users that you added. For each user, it shows the name, user ID, status, and organization unit.

<ThemedImage
    alt="Users page of the Integration User Portal project with a user and the Add promotable user button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/users-list.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/users-list.png'),
    }}
/>

The status of a user is one of the following:

| Status | Meaning |
|---|---|
| **Active** | The user can sign in. |
| **Invited** | The user has not yet set a password from the invitation email. |
| **Locked** | The account is locked, so the user cannot sign in. Unlock the account in your Choreo Identity organization. |

### Create a user

1. In the **Integration User Portal** project, click **Users** in the left navigation menu.
2. Click **Add promotable user**.

    <ThemedImage
        alt="Users page of the Integration User Portal project with the Add promotable user button highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/add-user-button.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/add-user-button.png'),
        }}
    />

3. Enter a **Username** and an **Email**. Optionally, enter the user's first name, last name, mobile number, and password.

    <ThemedImage
        alt="Add user page with the username, first name, last name, email, mobile number, and password fields"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/create-user.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/create-user.png'),
        }}
    />

4. Click **Create user**.

The user has no roles yet. [Assign roles to the user](#assign-roles-to-a-user), then [deploy your changes](#deploy-your-changes). The user can then sign in to the User Portal with their username and password. See [Sign In](sign-in-to-user-portal.md).

### Assign roles to a user

You assign a role to a user from the role.

1. In the **Integration User Portal** project, click **Roles** in the left navigation menu.
2. Click the role.
3. Click **Assignments**.
4. Click **Add**.

    <ThemedImage
        alt="Assignments tab of the Finance role with the Add button highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/role-assignments.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/role-assignments.png'),
        }}
    />

5. On the **Users** tab of the **Add assignment** dialog, select the user.
6. Click **Add selected**.

    <ThemedImage
        alt="Add assignment dialog with a user selected and the Add selected button highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/add-assignment.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/add-assignment.png'),
        }}
    />

The user appears on the **Users** tab of **Assignments**.

<ThemedImage
    alt="Assignments tab of the Finance role with an assigned user"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/role-users.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/role-users.png'),
    }}
/>

### Remove a role from a user

1. In the **Integration User Portal** project, click **Roles** in the left navigation menu.
2. Click the role.
3. Click **Assignments**.
4. Next to the user, click the delete icon.

    <ThemedImage
        alt="Assignments tab of the Finance role with the delete icon next to an assigned user highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/remove-role-assignment.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/remove-role-assignment.png'),
        }}
    />

### Edit or delete a user

1. In the **Integration User Portal** project, click **Users** in the left navigation menu.
2. Next to the user, click the edit icon to edit the user, or the delete icon to delete the user.

    <ThemedImage
        alt="Users page with the edit and delete icons next to a user highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/edit-delete-user.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/edit-delete-user.png'),
        }}
    />

## Manage roles

In the **Integration User Portal** project, click **Roles** in the left navigation menu. The **Roles** page lists the roles in the project, with the description and organization unit of each role.

<ThemedImage
    alt="Roles page of the Integration User Portal project with the Finance role and the Add role button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/roles-list.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/roles-list.png'),
    }}
/>

### Create a role

1. In the **Integration User Portal** project, click **Roles** in the left navigation menu.
2. Click **Add role**.
3. In **Role name**, enter a name for the role, then click **Continue**.
4. Under **Assign permissions**, select the permissions for the role. The scopes of the User Portal are under **User Portal API**. See [Scopes](#scopes).

    To select all the permissions in a group, select the check box of the group.

    <ThemedImage
        alt="Assign permissions step with all the User Portal API scopes selected"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/create-role.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/create-role.png'),
        }}
    />

5. Click **Continue**.

### Change the permissions of a role

1. In the **Integration User Portal** project, click **Roles** in the left navigation menu.
2. Click the role.
3. Click **Permissions**.

    <ThemedImage
        alt="Permissions tab of the Finance role with the User Portal API scopes"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/role-permissions.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/role-permissions.png'),
        }}
    />

4. Select or clear permissions. To undo your changes, click **Reset**.
5. Click **Save changes**.

### Rename a role

1. In the **Integration User Portal** project, click **Roles** in the left navigation menu.
2. Click the role.
3. Click the edit icon next to the role name, then enter the new name.

### Delete a role

1. In the **Integration User Portal** project, click **Roles** in the left navigation menu.
2. Next to the role, click the delete icon.

    <ThemedImage
        alt="Roles page with the delete icon next to the Finance role highlighted"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/delete-role.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/delete-role.png'),
        }}
    />

## Deploy your changes

Users, roles, and role assignments take effect in an environment only after you deploy them. Until then, the **Integration User Portal** project shows **You have changes that aren't in Development yet**.

1. In the **Integration User Portal** project, click **Deploy to Development**.
2. In the **Deploy through pipeline** panel, review the changes. Clear the check box of any change that you do not want to deploy.

    <ThemedImage
        alt="Deploy through pipeline panel with the project changes, the changes they need, and shared resources"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/deploy-changes.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/deploy-changes.png'),
        }}
    />

3. Click **Deploy changes to Development**.

To see the deployed version of each environment, click **Deployment pipeline** in the left navigation menu.

## Add scopes from your own APIs

You can give User Portal users the scopes of your own APIs. To do this:

1. In your Choreo Identity Platform organization, create an API resource with the scopes, and authorize the User Portal application for those scopes. See [Choreo Identity Platform documentation: API authorization](https://wso2.com/identity-platform/docs/guides/authorization/api-authorization/api-authorization/).
2. In the **Integration User Portal** project, [create a role](#create-a-role) or [change the permissions of a role](#change-the-permissions-of-a-role), and select the scopes under the **Custom API** group.
3. [Assign the role to users](#assign-roles-to-a-user).

