---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to the Dynamics 365 Finance and Operations Ledger APIs, and obtaining the service URL and credentials required by the connector.

## Prerequisites

- An active Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox).
- Access to the [Azure portal](https://portal.azure.com/) with permission to register applications in Microsoft Entra ID (or an administrator who can do this for you).
- A user account in Dynamics 365 Finance & Operations with System administration privileges to create application users and assign security roles.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.

2. Enter a name for the application, select the appropriate **Supported account types** (typically **Accounts in this organizational directory only**), and select **Register**. No redirect URI is required since the connector uses the OAuth2 client credentials grant.

3. From the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**. You will need both to configure the connector.

## Step 2: Create a client secret

1. In the registered application, navigate to **Certificates & secrets → Client secrets → New client secret**.

2. Add a description and select an expiry period, then select **Add**.

3. Copy the generated secret **Value** immediately — it is only shown once and cannot be retrieved later.

:::tip
Store the client secret in a secure secret store. If it expires or is lost, you must create a new one and update your configuration — the value cannot be viewed again from the Azure portal.
:::

## Step 3: Grant Dynamics 365 Finance and Operations API permissions

1. In the application registration, go to **API permissions → Add a permission → APIs my organization uses**.

2. Search for **Dynamics ERP** (this represents the Dynamics 365 Finance and Operations API surface) and select it.

3. Choose **Application permissions** and select the Dynamics ERP application role appropriate for the ledger data you plan to access (do not select `user_impersonation` — that is a delegated scope for interactive, signed-in-user flows; `.default` is not selected here either, since it is the token-request scope used in Step 5).

4. Select **Add permissions**, then select **Grant admin consent for &lt;your tenant&gt;** and confirm.

:::note
Application permissions require a tenant administrator to grant consent. If you don't have administrator rights, ask your Microsoft Entra ID administrator to complete this step.
:::

## Step 4: Register the application in Dynamics 365 Finance

1. Sign in to your Dynamics 365 Finance & Operations environment and create a service account: navigate to **System administration → Users → New**, set the **User name** and **User ID**, and assign the security roles the application needs in order to work with ledger data — for example, roles that grant access to the General ledger module (such as **Accountant** or **General ledger clerk**), or a custom role scoped to the entities you plan to use. Save the user record and confirm it is **Enabled**.

2. Go to **System administration → Setup → Microsoft Entra applications** and select **New**. Enter the **Application (client) ID** you noted in Step 1 as the **Client Id**, give the entry a descriptive **Name** (such as **Connector.FullAccess** or a name reflecting the service-level access granted), and map it to the **User ID** created above. Do not paste the client ID directly into a user record's identity field — that does not establish the required Finance application registration mapping.

## Step 5: Obtain the environment's service URL and token scope

1. The `serviceUrl` required by the connector is the OData root of your Dynamics 365 Finance and Operations environment. It follows the pattern:
   ```
   https://<your-org>.operations.dynamics.com/data
   ```

2. You can find your environment's base URL from the address bar when you sign in to Dynamics 365 Finance & Operations, or from **Lifecycle Services (LCS)** for the environment. Append `/data` to the base URL to form the `serviceUrl`.

3. Optionally, verify the endpoint is reachable by browsing to `<serviceUrl>/$metadata` while signed in — this returns the OData metadata document for the environment.

4. The `scopes` value required by the connector's `OAuth2ClientCredentialsGrantConfig` is the base environment URL — **not** the `/data`-suffixed OData root used for `serviceUrl` — followed by `/.default`:
   ```
   https://<your-org>.operations.dynamics.com/.default
   ```

## What's next

- [Action reference](actions.md): Available operations
