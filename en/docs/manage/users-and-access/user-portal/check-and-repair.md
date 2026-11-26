---
sidebar_position: 3
sidebar_custom_props:
  separatorBefore: "Set Up"
title: Check Status
description: "Check whether the User Portal is enabled and active for an environment in Choreo Integration, and deprovision it if you no longer need it."
keywords: [choreo cloud, user portal, status, deprovision, identity platform]
slug: /manage/users-and-access/user-portal/check-status
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Check Status

The **Configure** > **User Portal** page shows the status of the User Portal for each environment in your organization.

## Check the status of the User Portal

1. Sign in to [Choreo Cloud](https://console.cloud.choreolabs.com).
2. In the left navigation menu of the Integration app, click **Configure**.
3. Click the **User Portal** tab.

The page shows a card for each environment that has the User Portal enabled:

- **Setting up** — the platform is still provisioning the User Portal for that environment.
- **Active**, with an **Open portal** button — the User Portal is ready to use.

<ThemedImage
    alt="Configure > User Portal page with a card for the Development environment showing Active status, Open portal button, and the kebab menu"
    sources={{
        light: useBaseUrl('/img/manage/cloud/user-portal/user-portal-status.png'),
        dark: useBaseUrl('/img/manage/cloud/user-portal/user-portal-status.png'),
    }}
/>

{/* TODO(v3): didn't observe a Setting up card or a failure/blocker state live this pass - only confirmed Active. Don't know whether a failed setup shows an error message or how to resolve one. */}

## Deprovision the User Portal

Deprovisioning removes the User Portal for an environment, for the whole organization.

1. On the environment's card, click the **⋮** menu, then click **Deprovision**.
2. Confirm the action.

{/* TODO(v3): didn't trigger this live - don't know whether a confirmation dialog appears, what happens to integrations already published to that environment's User Portal, or whether existing User Portal users and their access are removed. */}

{/* TODO(v3): the v2 version of this page described a "Repair User Portal" button and a table of blockers (Username Validation, Trusted Token Issuer, WSO2 Cloud Admin Role, and others) for fixing a User Portal whose resources had drifted. The live Configure > User Portal page's kebab menu has only Copy portal link and Deprovision - no Repair action or blocker list. That v2 mechanism appears to no longer exist in v3; re-check with the product team before assuming the User Portal has no equivalent recovery path. */}
