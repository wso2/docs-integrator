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

Your organization's members and its groups are managed in two separate places in the console:

- **Members**: the people who belong to your organization. Add or remove members here.
- **Access Control**: the groups and roles that control what a member can do. Create a group, assign one or more roles to it, then add members to the group so they inherit its permissions.

{/* TODO(v3): the exact navigation path and step-by-step flow for both the Members
    section and the Access Control section (create group / assign role / add member)
    need to be re-verified live against the current v3 console before publishing a
    numbered walkthrough here. The previous version of this page described a
    project-scoped role-mapping scenario that doesn't match v3's model - removed
    rather than left inaccurate. */}

:::tip
Only add a member to the groups they actually need. A member inherits every permission carried by the roles assigned to each group they belong to.
:::
