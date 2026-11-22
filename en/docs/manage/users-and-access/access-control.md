---
sidebar_position: 2
title: Access Control
description: Learn how to manage access to projects and resources in the Choreo Integration using roles and groups.
keywords: [choreo cloud, access control, roles, groups, permissions]
slug: /manage/users-and-access/access-control
---

# Access Control

The Choreo Integration lets you manage access to projects and control the actions that users can perform within them. Administrators can restrict project access to specific user groups. This is useful when you need certain user groups to have access to particular projects or a set of projects.

The platform uses **roles** and **groups** to control access:

- **Role**: A role is a collection of permissions. The platform provides a predefined set of roles with permissions assigned to them.
- **Group**: A group is a collection of users. A user group requires one or more roles to be assigned to it so that the users in those groups inherit the relevant permissions via the assigned roles.

Authorization works by assigning one or more roles to a group.

{/* TODO(v3): org- and project-level role mapping is not in v3, so the sample scenario
    below (project-scoped developer access) needs re-authoring against v3's actual
    role/group model. The steps are kept here only as a starting point. */}

## Sample scenario

This section walks through a sample scenario for managing access within a project.

Assume you are overseeing the Engineering Project within your organization and you need to grant development access to specific users solely within this project.

### Step 1: Create a project

1. Sign in to [Choreo Cloud](https://console.devant.dev).
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
7. Click **Add**. This assigns the **Developer** role to the group.

This grants developer access to members of the Engineering Project Developer group, limited to the Engineering Project.

### Step 4: Add users to the group

Follow these steps to add an existing user to the group:

1. In the console, go to the top navigation menu, click the **Organization** list, and select the organization where you created your project.
2. In the left navigation menu, click **Settings** under **Admin**.
3. Click the **Access Control** tab and then click the **Users** tab.
4. Search for the existing user you want to add to the **Engineering Project Developer** group.
5. Click the edit icon corresponding to the user.
6. Click **+Assign Groups**.
7. In the **Add Groups to User** dialog, click the **Groups** list and select **Engineering Project Developer**.
8. Click **Add**.

:::tip
Remove the user from any other groups to avoid granting organization-level access unintentionally.
:::

:::note
- Adding users to an existing group grants them every permission the group's roles carry.
- You can add existing users to new groups and assign roles such as Developer or API Publisher based on their requirements.
:::

You have successfully set up access control within your project.
