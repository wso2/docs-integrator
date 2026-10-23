---
sidebar_position: 3
title: Sign In to the User Portal
description: "Sign in to the User Portal of a WSO2 Cloud - Integration Platform organization with the account that your organization gave you or with an Integration Platform account."
keywords: [wso2 cloud, user portal, sign in, single sign-on, external users, identity platform, ai agents, automations, workflows]
slug: /manage/users-and-access/user-portal/sign-in
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Sign In to the User Portal

The User Portal shows the integrations that an organization [publishes to it](publish-to-user-portal.md). To use them, you sign in to the User Portal of that organization.

## Sign-in options

The User Portal has two sign-in options:

| Option | Who uses it | Credentials |
|---|---|---|
| **Sign In** | Anyone the organization gives User Portal access to, such as its customers, partners, or employees. | The User Portal account that the organization gave you. |
| **Sign in with Integration Platform** | Members of the WSO2 Cloud organization, such as developers and administrators. | The account that you use to sign in to the WSO2 Cloud console. |

:::info
To sign in with **Sign In**, you need a User Portal account from the organization. If you do not have one, or you cannot sign in, contact the organization's administrator. To give someone an account, administrators can follow [Add a user](manage-users.md#add-a-user).
:::

## Sign in to the User Portal

1. Open the User Portal.

    - If you have a link to the organization's User Portal, open it. The link has the format `https://userportal.devant.dev/org/<organization-handle>`. Go to step 3.
    - Otherwise, open the [User Portal sign-in page](https://userportal.devant.dev).

2. Enter the organization name in **Organization Name**, then click **Continue**.

    <ThemedImage
        alt="User Portal page to enter the organization name"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/org-entry.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/org-entry.png'),
        }}
    />

    Organization names use lowercase letters, numbers, and hyphens. If the User Portal cannot find the organization, check the name with your organization administrator. The organization might not have enabled the User Portal yet.

3. On the **Sign in to continue** page, check that the organization is correct. To choose a different organization, click the change organization icon next to the organization name.

    <ThemedImage
        alt="User Portal Sign in to continue page with the Sign In and Sign in with Integration Platform options"
        sources={{
            light: useBaseUrl('/img/manage/cloud/user-portal/org-sign-in.png'),
            dark: useBaseUrl('/img/manage/cloud/user-portal/org-sign-in.png'),
        }}
    />

4. Select a sign-in option:

    - If your organization gave you an account for the User Portal, click **Sign In**, then sign in with that account.
    - If you are a member of the WSO2 Cloud organization, click **Sign in with Integration Platform**, then sign in with your WSO2 Cloud account.

After you sign in, the User Portal lists the integrations that the organization published.

## Automatic sign-in from the console

When you click the **User Portal** button on a published integration's overview page in the WSO2 Cloud console, the User Portal opens in a new tab and signs you in with your Integration Platform account. If it cannot sign you in automatically, it shows the **Sign in to continue** page, where you can select a sign-in option.

## What's next

- [Use the User Portal](use-user-portal.md) to chat with AI agents, run automations, and work with workflows.
