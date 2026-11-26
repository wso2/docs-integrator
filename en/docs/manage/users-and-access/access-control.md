---
sidebar_position: 2
title: Members and Access Control
description: Learn how to manage organization members, groups, roles, and assignments in Choreo Integration.
keywords: [choreo cloud, access control, roles, groups, permissions, members, invitations, assignments]
slug: /manage/users-and-access/access-control
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Members and Access Control

The Choreo Integration lets you manage access to your organization and control the actions that members can perform. The platform uses **roles** and **groups** to control access:

- **Role**: A collection of permissions. The platform ships with a predefined set of roles.
- **Group**: A collection of members. A group grants one or more roles to every member in it.

Authorization works by assigning a role to a group; a member gets that role's permissions by belonging to the group.

Members and access control are managed from your organization's **Settings**. Open the apps grid next to the Choreo Cloud logo, then click **Settings** under **Manage**.

<ThemedImage
    alt="Apps grid menu open with Settings highlighted under Manage"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/navigate-to-settings.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/navigate-to-settings.png'),
    }}
/>

## Members

**Settings** > **Members** lists everyone in your organization, their email, and the group they belong to.

<ThemedImage
    alt="Members tab listing organization members with their email and group"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/members-list.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/members-list.png'),
    }}
/>

### Invite a member

1. Click **Invite user**.
2. Enter one or more email addresses (up to 10, separated by a comma, space, or Enter).
3. Select the **Group** the invitees will join.
4. Click **Send invitation**.

<ThemedImage
    alt="Invite users dialog with email addresses and a Group dropdown"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/invite-user-form.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/invite-user-form.png'),
    }}
/>

Each recipient must sign in with the exact email address they were invited with. Inviting an address that already has a pending invitation replaces it.

### Pending invitations

The **Pending invitations** tab lists invitations that haven't been accepted yet, with the group offered, who sent it, when it was sent, and when it expires. An invitation past its expiry shows **Expired** instead of a countdown. Each invitation's **Actions** column has two icons: one to resend the invitation email, and one to delete the invitation.

<ThemedImage
    alt="Pending invitations tab listing invited emails with their group, inviter, and expiry status, including both still-pending and expired invitations"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/pending-invitations.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/pending-invitations.png'),
    }}
/>

## Access control

**Settings** > **Access control** has three tabs: **Groups**, **Roles**, and **Assignments**.

### Groups

Each group grants one or more roles. The platform ships with five predefined groups: **Admin**, **Platform Engineer**, **Developer**, **Viewer**, and **API Publisher**. Invite members into a group from **Members**.

<ThemedImage
    alt="Groups tab listing the predefined groups, the role each grants, and its member count"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/groups.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/groups.png'),
    }}
/>

Click a group to see its granted role, a summary of what it permits, and its members.

<ThemedImage
    alt="Admin group detail page showing its role, permission summary, and list of members"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/group-member-list.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/group-member-list.png'),
    }}
/>

### Roles

The **Roles** tab lists what each role allows, broken down by product area, and which group currently grants it.

<ThemedImage
    alt="Roles tab listing each role's permission count by product area and the group it's granted to"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/roles.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/roles.png'),
    }}
/>

Click a role to see its exact permissions, grouped by product area (Choreo Cloud, API Management, Integration, AI & Agent Management, Identity & Access Management). Hover a permission to see the exact platform check it performs.

<ThemedImage
    alt="Admin role detail page with its permissions expanded under the Integration product area"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/role-permissions.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/role-permissions.png'),
    }}
/>

### Assignments

Assignments say which group gets which role, and where it applies. Filter the list by **Organization level** or **Resource level**.

<ThemedImage
    alt="Assignments tab with the Organization level / Resource level filter dropdown open"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/assignment-scope-levels.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/assignment-scope-levels.png'),
    }}
/>

Click **New assignment** to grant a group an additional role. Pick the **Group** and **Role**, then choose where it applies: **The whole organization**, or **A specific resource** for a single resource instance.

:::warning
Only add a member to the groups they actually need. A member inherits every permission carried by the roles assigned to each group they belong to.
:::

<ThemedImage
    alt="New assignment dialog with Group and Role dropdowns and a choice between the whole organization or a specific resource"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/new-assignment-form.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/new-assignment-form.png'),
    }}
/>
