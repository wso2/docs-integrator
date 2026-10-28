---
title: Manage Users in the User Portal
---

# Manage Users in the User Portal

External users sign in to the User Portal with an account in your WSO2 Identity Platform organization. That organization is the user store for the User Portal, so you add and manage User Portal users there, not in the WSO2 Cloud console.

Members of your WSO2 Cloud organization do not need a separate account. They can sign in with **Sign in with Integration Platform**. See [Sign-in options](sign-in-to-user-portal.md#sign-in-options).

## Add a user

To let an external user sign in to the User Portal, add the user to your WSO2 Identity Platform organization.

The following steps cover the basics. For a detailed guide, see [WSO2 Identity Platform documentation: Onboard users](https://wso2.com/identity-platform/docs/guides/users/onboard-users/).

1. Sign in to [WSO2 Identity Platform](https://asgardeo.io/).
2. In the organization list, select the organization that has the same name as your WSO2 Cloud organization.
3. In the WSO2 Identity Platform Console left navigation menu, click **User Management** > **Users**.
4. Click **Add User**, then select **Single User**.
5. Enter the user's email address, first name, and last name.
6. Select how the user sets a password:

    - **Invite the user to set their own password**: WSO2 Identity Platform sends the user an email with a link to set a password.
    - **Set a password for the user**: Enter a password, then share it with the user securely.

7. Click **Next**, then click **Finish**.

The user can now sign in to the User Portal with **Sign In**. If you invited the user to set their own password, the user must first open the invitation email and set a password. Share the User Portal link for your organization, or the organization name, with the user. See [Sign in to the User Portal](sign-in-to-user-portal.md).

## Create a role and assign it to a user

Workflows can assign human tasks to a role. In the User Portal, only users who hold that role can see and act on those tasks. To let a user act on a task, create the role in your WSO2 Identity Platform organization and assign it to the user.

The role name must match the role that the workflow assigns the task to.

The following steps cover the basics. For a detailed guide, see [WSO2 Identity Platform documentation: Manage roles](https://wso2.com/identity-platform/docs/guides/users/manage-roles/).

### Create a role

1. Sign in to [WSO2 Identity Platform](https://asgardeo.io/).
2. In the organization list, select the organization that has the same name as your WSO2 Cloud organization.
3. In the WSO2 Identity Platform Console left navigation menu, click **User Management** > **Roles**.
4. Click **New Role**.
5. Enter a name for the role.
6. Under **Role Audience**, select **Application**, then select the User Portal application. The platform creates this application in your WSO2 Identity Platform organization when you enable the User Portal. See [What the platform provisions for you](user-portal.md#what-the-platform-provisions-for-you).

7. Click **Next**. Optionally, select the permissions for the role.
8. Click **Finish**.

### Assign the role to a user

1. In the WSO2 Identity Platform Console left navigation menu, click **User Management** > **Roles**.
2. Click the role that you created.
3. Click the **Users** tab.
4. Select the users to assign the role to, then click **Update**.
