---
title: Access Control
---

# Access Control

The WSO2 Cloud - Integration Platform lets you manage access to projects and control the actions that users can perform within them. Administrators can restrict project access to specific user groups. This is useful when you need certain user groups to have access to particular projects or a set of projects.

The platform uses **roles**, **groups**, and a **mapping level** to control access:

- **Role**: A role is a collection of permissions. The platform provides a predefined set of roles with permissions assigned to them.
- **Group**: A group is a collection of users. A user group requires one or more roles to be assigned to it so that the users in those groups inherit the relevant permissions via the assigned roles.
- **Mapping level**: A mapping level defines the extent at which a role-group mapping applies. The platform has two resource levels:
    - **Organization**: You can assign a role to a group within the organization. This ensures that all users in the group inherit the permissions granted by that role across all organizational resources. For example, if a user has the `Project Management` permission at the organization mapping level, that user can edit all projects in the organization.
    - **Project**: You can assign a role to a group within a specific project. This ensures that users in the group inherit the permissions granted by that role only within the context of that project. For example, if a user has the `Project Management` permission at the project mapping level, that user can only edit the specified project.

Authorization works by assigning a role to a group at a specified level. The level at which you assign the role determines the extent of permissions granted to users.

Avoid assigning multiple roles to a single user across different projects or levels (organization and project). Such assignments can grant users unintended access to some projects, allowing them to perform tasks they should not have access to. Assign only one role to a user across projects or levels to ensure proper access control.

Organization-level permissions take precedence over project-level permissions.

## Sample scenario

This section walks through a sample scenario for managing access within a project.

Assume you are overseeing the Engineering Project within your organization and you need to grant development access to specific users solely within this project.

### Step 1: Create a project

1. Sign in to [WSO2 Cloud](https://console.devant.dev).
2. In the top navigation, click the **Organization**.
3. On the organization overview page, click **+ Create Project**.
4. Enter a display name, unique name, and description for the project. Use the following values:

    :::info
    The **Name** field must uniquely identify your project in various contexts. The value is editable only at the time you create the project. You cannot change the name after creating the project.
    :::

    | Field | Value |
    |---|---|
    | **Project Display Name** | `Engineering Project` |
    | **Name** | `engineering-project` |
    | **Project Description** | `My sample project` |

4. Click **Create**. This creates the project and opens the project home page.

### Step 2: Create a group

Follow these steps to create a group named `Engineering Project Developer`:

1. In the console, go to the top navigation menu, click the **Organization**.
2. In the left navigation menu, click **Settings** under **Admin**.
3. Click the **Access Control** tab and then click the **Groups** tab.
4. Click **+ Create Group**.
5. Enter a group name and description. Use the following values:

    | Field | Value |
    |---|---|
    | **Group Name** | `Engineering Project Developer` |
    | **Group Description** | `Users with development access within the engineering project` |

6. Click **Create**.

### Step 3: Assign roles to the group

Follow these steps to assign the **Developer** role to the **Engineering Project Developer** group you created:

1. In the console, go to the top navigation menu, click the **Project** list, and select the **Engineering Project** you created.
2. In the left navigation menu, click **Settings** under **Admin**.
3. Click the **Access Control** tab and then click the **Groups** tab.
4. On the **Groups** tab, search for the **Engineering Project Developer** group and click the corresponding edit icon.
5. Click **+Add Roles**.
6. In the **Add Roles to Group in Project** dialog, click the **Roles** list and select **Developer**.
7. Click **Add**. This assigns the **Developer** role to the group. The mapping level appears as **Project (Engineering Project)**, indicating the scope of the mapping.

This grants developer access to members of the Engineering Project Developer group, limited to the Engineering Project.

### Step 4: Add users to the group

You can add users to the group using one of the following approaches.

#### Add a new user as a project developer

1. In the console, go to the top navigation menu, click the **Organization** list, and select the organization where you created your project.
2. In the left navigation menu, click **Settings** under **Admin**.
3. Click the **Access Control** tab and then click the **Users** tab.
4. Click **+Invite Users**.
5. In the **Invite Users** dialog:
   1. Specify the email addresses of the users in the **Emails** field.
   2. Click the **Groups** list and select **Engineering Project Developer**.
6. Click **Invite**.

#### Add an existing user as a project developer

1. In the console, go to the top navigation menu, click the **Organization** list, and select the organization where you created your project.
2. In the left navigation menu, click **Settings** under **Admin**.
3. Click the **Access Control** tab and then click the **Users** tab.
4. Search for the existing user you want to add to the **Engineering Project Developer** group.
5. Click the edit icon corresponding to the user.
6. Click **+Assign Groups**.
7. In the **Add Groups to User** dialog, click the **Groups** list and select **Engineering Project Developer**.
8. Click **Add**.

Remove the user from any other groups to avoid granting organization-level access unintentionally.

- Existing groups are already mapped to similar roles at the organization level. Adding users to those groups, or keeping users in them, grants organization-level access.
- When users are added to the **Engineering Project Developer** group, they only have developer access to the **Engineering Project**.
- You can invite new users or add existing users to new groups within the Engineering Project and assign roles such as Developer or API Publisher based on their requirements.

You have successfully set up access control within your project.

## What's next

- [Configure enterprise login](./configure-enterprise-login.md) - Configure enterprise login to your organization
- [Access APIs with an External IdP](./api-external-idp/overview.md) - Use external IdPs to access Integration as APIs with OAuth2.
