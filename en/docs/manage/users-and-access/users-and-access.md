---
sidebar_position: 0
sidebar_label: Access Control
title: "Access Control"
description: "Manage access for your organization's own members, and publish integrations to external users through the User Portal."
keywords: [choreo cloud, users, access control, roles, groups, user portal]
slug: /manage/users-and-access
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Access Control

Choreo Integration separates two audiences, each with its own access model: the members of your own organization who build and manage integrations, APIs, and AI agents, and the external users who only interact with what you've already published.

| | Target audience | Interface | Core capabilities |
|---|---|---|---|
| **[Member Access](./access-control.md)** | Members of your organization | Choreo Cloud console | Build, deploy, and manage integrations, APIs, environments, and AI agents. |
| **[User Portal](./user-portal/user-portal.md)** | External end users | User Portal | Sign in through Choreo Identity to chat with published AI agents and run automations. |

<ThemedImage
    alt="Member Access flows from Members to Groups and roles to the Choreo Cloud console; User Portal flows from External users to Sign in to the User Portal, with no Choreo Cloud console access"
    sources={{
        light: useBaseUrl('/img/manage/cloud/access-control/member-access-vs-user-portal.png'),
        dark: useBaseUrl('/img/manage/cloud/access-control/member-access-vs-user-portal.png'),
    }}
/>

## Member Access

Members, groups, and roles control what someone can see and do in the Choreo Cloud console — deploy integrations, manage environments, publish APIs, and more. See [Member Access](./access-control.md).

## User Portal

The User Portal is a separate portal that exposes your integrations to external users: after you enable it, you can publish AI agents and automations to it, and users sign in through your Choreo Identity organization to chat with agents or run automations, without access to the Choreo Cloud console. See [User Portal](./user-portal/user-portal.md).
