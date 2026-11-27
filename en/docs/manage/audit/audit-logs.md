---
sidebar_position: 2
title: "Audit Logs"
description: "View organization-level audit logs in Choreo Cloud, and control who can see them."
keywords: [choreo integrator, choreo cloud, audit logs, security, compliance, access control, role, group]
slug: /manage/audit/audit-logs
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Audit Logs

Audit logs, also called audit trails, enhance security, ensure compliance, provide operational insights, and help manage risks.

In Choreo Cloud, an audit log records organization-level operations performed through the console, across products such as the Integration platform and Agent Manager. Each entry shows the product, the user who performed the action, the action itself, its status, and the time it occurred.

Only members of the **Admin** group can view audit logs. For more information about groups and roles, see [Member Access](../users-and-access/access-control.md).

## View audit logs

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. Open the apps grid at the top left, then under **Manage**, click **Settings**.
3. In the left navigation menu, click **Audit logs**.

The page lists events for the selected time range, newest or oldest first.

<ThemedImage
    alt="Audit Logs page listing events with their time, status, product, user, and action"
    sources={{
        light: useBaseUrl('/img/manage/cloud/audit/audit-logs-list.png'),
        dark: useBaseUrl('/img/manage/cloud/audit/audit-logs-list.png'),
    }}
/>

- **Time range**: Choose **Last hour**, **Last 24 hours**, **Last 7 days**, **Last 30 days**, or a **Custom** range.
- **Search**: Filter events by text.
- **UTC** / **Local**: Switch the displayed timestamps between UTC and your browser's local time zone.
- Click a row to expand its full detail, including the record ID, the user's name, email, and user ID, the exact resource acted on, and a JSON `info` object with action-specific fields.

    <ThemedImage
        alt="Expanded audit log entry showing recordId, user details, action, status, resource, info, and eventId"
        sources={{
            light: useBaseUrl('/img/manage/cloud/audit/audit-log-detail.png'),
            dark: useBaseUrl('/img/manage/cloud/audit/audit-log-detail.png'),
        }}
    />

- Click the download icon to export the currently loaded events. Older entries outside what's loaded are not included.
- Click **Load older logs in this range** to fetch more events within the selected time range.

{/* TODO(v3): didn't verify what "Product" values other than Integration Platform and Agent Manager can appear, or whether every org-level operation is captured - only confirmed the entries this org already had (endpoint test key issuance, API key issuance, and git integration changes). */}

## Audit log retention

Audit log retention depends on your subscription plan. See [Acceptable Usage Policy](../billing/acceptable-usage-policy.md#security).

## Give a member access to audit logs

Viewing audit logs requires the **Admin** role, which the platform grants only to the **Admin** group. There is no way to grant audit log access on its own without granting every other Admin permission - the predefined groups and roles are fixed, and the console does not support creating a custom role.

To give a member access to audit logs, add them to the **Admin** group:

1. In **Settings**, click **Members**.
2. Invite the member, or edit an existing member, and select the **Admin** group.

For more information, see [Member Access](../users-and-access/access-control.md).

{/* TODO(v3): didn't verify the exact Members page invite/edit steps live this pass - confirmed only that access-control.md's own Groups tab says "Invite members into a group from Members," and that Admin is the only one of the 5 predefined groups whose role includes the Audit log: View permission (checked Admin and Platform Engineer; Developer, Viewer, and API Publisher are smaller supersets of neither, so almost certainly also lack it, but not individually confirmed). */}

## What's next

- [Member Access](../users-and-access/access-control.md) — Manage organization members, groups, roles, and assignments.
- [Runtime logs](../../observe/runtime-logs.md) — Search, filter, and analyze runtime log output for your integrations.
- [Choreo Cloud overview](../manage.md) — How Choreo Cloud manages your deployed integrations end to end.
