---
sidebar_position: 5
title: Check and Repair the User Portal
description: "Check the health of the User Portal in Choreo Integration, repair missing resources, and resolve the blockers that prevent you from enabling or repairing it."
keywords: [choreo cloud, user portal, health check, repair, blockers, identity platform]
slug: /manage/users-and-access/user-portal/check-and-repair
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Check and Repair the User Portal

After you enable the User Portal, the **User Portal** page works as a health check. Each time you open the page, it checks every resource that the User Portal needs.

## Check the status of the User Portal

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. In the top navigation, click the **Organization** list and select your organization.
3. In the left navigation menu, click **Settings** under **Admin**.
4. Click the **User Portal** tab.

The page shows one of the following:

- **Enabled, with everything in place**: The User Portal is working. You do not need to do anything.
- **Enabled, with items no longer in place**: One or more resources are missing or changed. See [Repair the User Portal](#repair-the-user-portal).

To check the status again without reloading the page, click the **Refresh** icon next to the status message.

## Repair the User Portal

If a resource is missing or changed, the page shows that the User Portal is enabled but that some items are no longer in place. For example, someone deleted the resource in Choreo Identity, or removed scopes from the User Portal API resource, its authorization, or one of the default roles. To fix this:

1. In your organization, go to **Admin** > **Settings** > **User Portal**.
2. Fix any blockers that need a manual change. See [Resolve blockers](#resolve-blockers).
3. Click **Repair User Portal**.

    <ThemedImage
        alt="User Portal Overview tab showing a missing application, API authorization, and default roles, with the Repair User Portal button"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/repair.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/repair.png'),
        }}
    />

The platform recreates the missing resources and adds the scopes that are missing. It does not remove scopes that you added.

To enable or repair the User Portal, your role must include the **Manage Organization** permission under **Organization Management**.

## Resolve blockers

The **User Portal** page shows blockers in two cases: before you enable the User Portal, when something prevents the platform from setting it up, and after you enable it, when a resource needs a manual change before you can repair it.

To see the blockers, go to **Admin** > **Settings** > **User Portal** in your organization. Each blocker shows the item that the User Portal needs, the current problem, and how to fix it. Fix the blockers, then click the **Refresh** icon to refresh the status.

The following table lists the blockers that the page can show:

| Blocker | Common causes | How to fix |
|---|---|---|
| **Username Validation** | Your Choreo Identity organization does not validate usernames as email addresses. The platform does not change this setting, because the change can affect existing users whose usernames are not email addresses. | In Choreo Identity, go to **Login & Registration** > **Username Validation** and set usernames to be email addresses. Then click the **Refresh** icon. |
| **Trusted Token Issuer**, **User Portal Application**, or **User Portal API Resource** | A resource with the same name already exists in Choreo Identity, and the User Portal did not create it. | Rename or remove the resource in Choreo Identity, then click the **Refresh** icon. |
| **User Portal API Authorization**, **WSO2 Cloud Admin Role**, or **WSO2 Cloud Reader Role** | The resource is missing, or it lacks some of the scopes that the User Portal needs. | Click **Repair User Portal**. |
