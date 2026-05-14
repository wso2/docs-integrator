---
title: Access Control
---

# Access Control

Access control in ICP determines who can view, edit, and manage resources across organizations, projects, and integrations. Roles define what actions are allowed, groups collect users, and mappings bind roles to groups at a specific scope. This page explains the access control model and guides you through common tasks such as granting team access, scoping permissions to environments, and creating custom roles.

## How it works

### Roles and permissions

A **role** is a named set of permissions. ICP ships with five built-in roles (see [Default roles](#default-roles)). You can also create custom roles tailored to your team's needs.

Permissions cover five areas: environment management, integration management, observability, project management, and user management. Each area contains two to five granular permissions (see [Permissions](#permissions)).

Roles and their permissions are defined at the organization level only. Lower levels (project, integration) can use roles in mappings but cannot change what a role is allowed to do.

### Groups and users

A **group** is a named collection of users that makes it easy to grant permissions to many people at once. Instead of assigning roles to individuals, you assign roles to groups and manage team membership separately. Groups and users are created at the organization level. One user can belong to multiple groups.

### Role-to-group mappings

A **mapping** binds a role to a group, granting every user in that group the role's permissions. A mapping has two dimensions:

- **Mapping level**: the level where the mapping was created (Organization, Project, or Integration). This controls the effective scope:

  | Mapping level | Effective scope |
  |---------------|-----------------|
  | Organization | All projects and integrations |
  | Project | All integrations within that project |
  | Integration | That single integration only |

- **Applicable environments**: either **All Environments** or a set of named environments (e.g. only *dev*). When scoped to selected environments, the mapping only takes effect for runtimes in those environments.

Mappings created at a higher level are visible at lower levels but can only be removed at the level where they were created.

### Where things live

Users, roles, groups, and their permissions are all managed at the organization level. Project and integration levels exist solely to create and remove mappings, narrowing who has what access and where.

| Capability | Organization | Project | Integration |
|------------|-------------|---------|-------------|
| Create / delete users | Yes | No | No |
| Create / delete roles | Yes | No | No |
| Edit role permissions | Yes | No | No |
| Create / delete groups | Yes | No | No |
| Add / remove users from groups | Yes | No | No |
| Map roles to groups | Yes | Yes | Yes |
| Scope mappings to environments | Yes | Yes | Yes |

## Common tasks

The following examples cover the most common access control scenarios. Each scenario builds on the model above — choose the mapping level that matches the scope you want.

### Give a team access to everything

Use an organization-level mapping with **All Environments**.

1. Go to **Access control** in the organization sidebar.
2. Open the **Groups** tab and click **+ Create Group**. Enter a name (e.g. `Platform Team`) and click **Create**.
3. Open the new group. In the **Users** tab, click **+ Add Users** and select the team members.
4. Switch to the **Roles** tab and click **+ Add Roles**.
5. Select the desired role (e.g. *Admin*), leave **All Environments** selected, and click **Add**.

Every user in that group now has the Admin role across all projects, integrations, and environments.

### Give a team access to one project only

Create the mapping at the project level so it is scoped to that project.

1. Navigate to the project and open **Access control** in the project sidebar.
2. Open the **Roles** tab and click the role you want to assign (e.g. *Developer*).
3. On the **Manage Role** page, click **+ Add Group**.
4. Select the group, leave **All Environments** selected, and click **Assign**.

The mapping level is recorded as **Project**. Members of that group have the Developer role within this project only. Other projects are unaffected.

ICP automatically creates a `<Project Name> Admins` group with the *Project Admin* role whenever you create a project. You can add users to this group instead of creating a new mapping.

### Give a team read-only access to production

Combine a restrictive role with environment scoping.

1. Go to the organization **Access control** and open the **Roles** tab.
2. Click the *Viewer* role (or create a custom read-only role).
3. In the **Groups** tab, click **+ Add Groups**.
4. Select the group, choose **Selected Environments**, pick **prod**, and click **Assign**.

Members of that group can view resources in the *prod* environment but have no access in *dev* or other environments unless granted separately.

### Grant a developer access to a single integration

Create the mapping at the integration level.

1. Navigate to the integration and open **Access control** in the integration sidebar.
2. Open the **Roles** tab and click the target role (e.g. *Developer*).
3. Click **+ Add Group**, select the group, choose environments, and click **Assign**.

The mapping level is **Integration**. The group's users have that role only for this integration.

### Create a custom role

1. Go to the organization **Access control** and open the **Roles** tab.
2. Click **+ Create Role**.
3. Enter a **Role Name** and an optional **Description**.
4. Expand the permission categories and check the permissions you need (see [Permissions](#permissions) for the full list).
5. Click **Create**.

To edit permissions later, click the role to open **Manage Role**, make changes in the **Permissions** tab, and click **Save Permissions**.

### Revoke access

**Remove a mapping**

Navigate to the level where the mapping was created (check the **Mapping Level** badge on the mapping row). Open the role or group detail and click the **Delete** icon.

**Remove a user from a group**

Go to the organization **Access control** and open the **Groups** tab. Open the group, find the user in the **Users** tab, and click the **Delete** icon. The user loses any permissions granted through that group.

**Delete a user**

Go to the organization **Access control** and open the **Users** tab. Click the **Delete** icon on the user row. This action is disabled for super admin accounts.

**Delete a role or group**

Go to the organization **Access control** and open the **Roles** or **Groups** tab. Click the **Delete** icon next to the item you want to remove. A role cannot be deleted while it is still mapped to a group. Remove all mappings for that role first.

### Reset a password or unlock an account

Go to the organization **Access control** and open the **Users** tab. Each user row has the following action icons:

| Action | Notes |
|--------|-------|
| **Reset password** | Opens a dialog to set a new password |
| **Unlock account** | Re-enables a locked account |
| **Revoke sessions** | Terminates all active sessions (disabled for your own account) |

## Reference

### Default roles

| Role | Description |
|------|-------------|
| Admin | Administrative access to projects and integrations |
| Developer | Development access with limited permissions |
| Project Admin | Administrative access to a specific project |
| Super Admin | Full access to all resources and permissions |
| Viewer | Read-only access across all resources |

### Default groups

| Group | Description |
|-------|-------------|
| Super Admins | Super administrators with full system access |
| Administrators | Organization administrators |
| Developers | Development team members |

Each new project also auto-creates a `<Project Name> Admins` group mapped to the *Project Admin* role at the project level.

### Permissions

#### Environment management

| Permission | Description |
|------------|-------------|
| `environment_mgt:manage` | Create, edit, and delete all environments |
| `environment_mgt:manage_nonprod` | Create, edit, and delete non-critical environments only |

#### Integration management

| Permission | Description |
|------------|-------------|
| `integration_mgt:edit` | Edit integration settings |
| `integration_mgt:manage` | Create and delete integrations |
| `integration_mgt:view` | View integration details |

#### Observability management

| Permission | Description |
|------------|-------------|
| `observability_mgt:view_insights` | View metrics and performance dashboards |
| `observability_mgt:view_logs` | View runtime logs |

#### Project management

| Permission | Description |
|------------|-------------|
| `project_mgt:edit` | Edit project settings |
| `project_mgt:manage` | Create and delete projects |
| `project_mgt:view` | View project details |

#### User management

| Permission | Description |
|------------|-------------|
| `user_mgt:manage_groups` | Create and delete groups |
| `user_mgt:manage_roles` | Create and delete roles |
| `user_mgt:manage_users` | Create and delete users |
| `user_mgt:update_group_roles` | Assign and remove roles from groups |
| `user_mgt:update_users` | Edit user profile and properties |

## What's next

- [Manage projects](manage-projects.md) — apply project-level role mappings to scope access per project
- [Manage integrations](manage-integrations.md) — apply integration-level mappings to restrict access to individual integrations
- [Manage environments](manage-environments.md) — create environments to use as scopes in role mappings
