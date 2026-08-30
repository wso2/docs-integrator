---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to the Dynamics 365 Finance and Operations Vendor Extended APIs, and obtaining the service URL and credentials required by the connector.

## Prerequisites

- An active Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox) with the Accounts payable module enabled.
- Access to the [Azure portal](https://portal.azure.com/) with permission to register applications in Microsoft Entra ID (or an administrator who can do this for you).
- A user account in Dynamics 365 Finance & Operations with System administration privileges to create application users and assign security roles.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.

2. Give the application a name (e.g., `d365-finance-vendorextended-connector`), select the appropriate **Supported account types** (typically **Accounts in this organizational directory only**), and select **Register**. No redirect URI is required since the connector uses the OAuth2 client credentials grant.

3. From the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**. You will need both to configure the connector.

## Step 2: Create a client secret

1. In the registered application, navigate to **Certificates & secrets → Client secrets → New client secret**.

2. Add a description and select an expiry period, then select **Add**.

3. Copy the generated secret **Value** immediately — it is only shown once and cannot be retrieved later.

:::tip
Store the client secret in a secure secret store. If it expires or is lost, you must create a new one and update your configuration — the value cannot be viewed again from the Azure portal.
:::

## Step 3: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.

2. Search for the API that represents your Dynamics 365 Finance and Operations environment (this may appear as **Dynamics ERP**, **Microsoft Dynamics ERP**, or the name of your environment), and select it.

3. Select **Application permissions**, choose the Dynamics ERP application role that matches the access the connector needs (do not select `user_impersonation` — that scope is delegated and only applies to interactive, signed-in-user flows), and select **Add permissions**.

4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Because this connector authenticates using the OAuth2 client credentials grant (an app-only, non-interactive token), the access token is not tied to a signed-in user. Authorization within Dynamics 365 is instead enforced through the application user and security roles configured in Step 4. The `.default` value used later in Step 5 is not an application permission you select here — it is the scope you append to the resource URL when requesting the token.
:::

## Step 4: Register the application in Dynamics 365

1. Sign in to your Dynamics 365 Finance and Operations environment and navigate to **System administration → Users → New** to create a dedicated service account. Enter a **User name** and **User ID** for the application (e.g., `VENDOREXT-APP`).

2. Assign the security roles the application needs in order to work with vendor data — for example, roles that grant access to the Accounts payable module (such as **Accounts payable clerk**, **Accounts payable manager**, or **Vendor**), or a custom role scoped to the `VendorsV2` and `VendorsV3` entities you plan to use. Save the user record and confirm it is **Enabled**.

3. Go to **System administration → Setup → Microsoft Entra applications** (this may be labeled **Microsoft Entra ID applications** depending on your version) and select **New**. Enter the **Application (client) ID** you noted in Step 1 as the **Client Id**, give the entry a descriptive **Name**, and set the **User ID** to the service account you created above. Do not paste the client ID into a user record's identity field for this — that is a different mechanism and does not establish the required Finance application registration mapping.

## Step 5: Locate the service URL

1. The `serviceUrl` required by the connector is the OData root of your Dynamics 365 Finance and Operations environment. It follows the pattern:

   ```
   https://<your-org>.operations.dynamics.com/data
   ```

2. You can find your environment's base URL from the address bar when you sign in to Dynamics 365 Finance & Operations, or from **Lifecycle Services (LCS)** for the environment. Append `/data` to the base URL to form the `serviceUrl`.

3. Optionally, verify the endpoint is reachable by browsing to `<serviceUrl>/$metadata` while signed in — this returns the OData metadata document for the environment.

:::tip
The same base URL is also used to derive the OAuth2 `scopes` value for the client credentials grant, typically `<base-url>/.default` (e.g., `https://<your-org>.operations.dynamics.com/.default`).
:::

## What's next

- [Action reference](actions.md): Available operations
