---
sidebar_position: 3
title: Sign In
description: "Sign in to the User Portal of a Choreo Integration organization with the username and password that your organization gave you."
keywords: [choreo cloud, user portal, sign in, external users, ai agents, automations]
slug: /manage/users-and-access/user-portal/sign-in
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Sign In

The User Portal shows the integrations that an organization [publishes to it](publish-to-user-portal.md). To use them, you sign in to the User Portal of that organization.

Each environment that has the User Portal enabled has its own User Portal. You sign in with the username and password of a User Portal account that the organization gave you.

:::info
If you do not have a User Portal account, or you cannot sign in, contact the organization's administrator. To give someone an account, administrators can follow [Create a user](manage-users.md#create-a-user).
:::

What you can see and do after you sign in depends on your roles in the organization. See [Scopes](manage-users.md#scopes).

## Sign in

1. Open the User Portal link that your organization gave you.

    Administrators can open the User Portal from the Choreo Cloud console. See [Open the User Portal from the console](#open-the-user-portal-from-the-console).

2. Enter your **Username** and **Password**, then click **SIGN IN**.

    <ThemedImage
        alt="User Portal sign-in page with the username and password fields"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/org-sign-in.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/org-sign-in.png'),
        }}
    />

After you sign in, the User Portal opens on the **Overview** page. It lists the integrations that the organization published and that your roles let you see. See [Run Available Integrations](use-user-portal.md).

## Open the User Portal from the console

In the Choreo Cloud console, you can open the User Portal in a new tab in either of the following ways:

- On the overview page of a published integration, click **Open User Portal**.
- Under **Integration** > **Configure** > **User Portal**, click **Open portal** on the card of the environment.
