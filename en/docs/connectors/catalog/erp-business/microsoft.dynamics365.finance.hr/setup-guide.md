---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox) with the Human resources module enabled.
- A Microsoft Entra ID (Azure AD) tenant, and permission to register applications in it (or an administrator who can register one on your behalf).
- A Dynamics 365 user account with **System administration** access, to create the application user and assign security roles.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.

2. Give the application a name (e.g., `d365-finance-hr-connector`), select the appropriate supported account type, and select **Register**.

3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**.

4. Go to **Certificates & secrets → Client secrets → New client secret**, add a description and expiry, and select **Add**. Copy the secret **Value** immediately — it is only shown once.

:::tip
The **Application (client) ID**, **Directory (tenant) ID**, and client secret map directly to the `clientId`, `tokenUrl`, and `clientSecret` fields of the connector's `auth` configuration. The tenant ID is embedded in the token URL: `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.

2. Search for the API that represents your Dynamics 365 Finance and Operations environment (this may appear as **Dynamics ERP**, **Microsoft Dynamics ERP**, or the name of your environment), and select it.

3. Select **Application permissions**, choose the Dynamics ERP application role that matches the access the connector needs (do not select `user_impersonation` — that scope is delegated and only applies to interactive, signed-in-user flows), and select **Add permissions**.

4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Because this connector authenticates using the OAuth2 client credentials grant (an app-only, non-interactive token), the access token is not tied to a signed-in user. Authorization within Dynamics 365 is instead enforced through the application user and security roles configured in Step 3. The `.default` value used later in Step 4 is not an application permission you select here — it is the scope you append to the resource URL when requesting the token.
:::

## Step 3: Register the application in Dynamics 365

1. Sign in to your Dynamics 365 Finance and Operations environment.

2. Create a dedicated service account: go to **System administration → Users**, select **New**, and enter a **User name** and **User ID** for the application (e.g., `HR-APP`).

3. Assign one or more **Security roles** that grant the access the connector needs — for example, a role with read/write access to **Human resources → Workers**, employment records, and the absence and holiday setup areas you plan to integrate with. Set the user's status to **Enabled** and save.

4. Go to **System administration → Setup → Microsoft Entra applications** (this may be labeled **Microsoft Entra ID applications** depending on your version) and select **New**. Enter the **Application (client) ID** from Step 1 as the **Client Id**, give the entry a descriptive **Name**, and set the **User ID** to the service account you created in step 2. Do not paste the client ID into the user's **Identity provider object ID** or **Azure AD object ID** field for this — that field serves a different, interactive sign-in purpose.

## Step 4: Locate the service URL

1. Note the base URL you use to sign in to your Dynamics 365 Finance and Operations environment, for example `https://<your-org>.operations.dynamics.com`. If you are unsure of this URL, it is listed on your environment's details page in [Lifecycle Services (LCS)](https://lcs.dynamics.com/), or your Dynamics 365 administrator can provide it.

2. Append `/data` to that base URL to form the OData root — this is the `serviceUrl` value the connector expects, for example:

   ```
   https://<your-org>.operations.dynamics.com/data
   ```

:::tip
The same base URL is also used to derive the OAuth2 `scopes` value for the client credentials grant, typically `<base-url>/.default` (e.g., `https://<your-org>.operations.dynamics.com/.default`).
:::

## What's next

- [Action reference](actions.md): Available operations
