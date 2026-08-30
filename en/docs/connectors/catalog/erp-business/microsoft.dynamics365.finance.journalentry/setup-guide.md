---
title: Setup Guide
---
# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 API permissions, adding it as a Dynamics 365 Finance user, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox) with the General ledger module enabled.
- A Microsoft Entra ID (Azure AD) tenant with permissions to register applications and grant admin consent.
- Sufficient privileges in the Dynamics 365 Finance environment to add application users and assign security roles.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.
2. Give the application a name (e.g., `journalentry-integration`), select the appropriate supported account type, and select **Register**.
3. On the app's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**.
4. Under **Certificates & secrets**, select **New client secret**, add a description and expiry, and select **Add**. Copy the generated secret **value** immediately — it is only shown once.

:::tip
Store the Application (client) ID, Directory (tenant) ID, and client secret value securely. They map directly to the `clientId` and `clientSecret` used when initializing the connector client, and to the `tokenUrl` you construct from the tenant ID: `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token`. The connector's `OAuth2ClientCredentialsGrantConfig` accepts `tokenUrl`, `clientId`, `clientSecret`, and `scopes` — there is no separate `tenantId` field; the tenant ID is only ever used to build the `tokenUrl`.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.
2. Search for the Microsoft Entra ID application that represents your Dynamics 365 Finance and Operations environment (commonly listed as **Dynamics ERP** or by your environment's own app registration name), select **Application permissions**, and choose the Dynamics ERP application role appropriate for the journal entry data you plan to access (do not select `user_impersonation` — that scope is delegated and only applies to interactive, signed-in-user flows).
3. Select **Grant admin consent for `<your tenant>`** to approve the permission for the whole tenant.

:::note
The exact Dynamics ERP application role you grant depends on how your organization has configured Dynamics 365 Finance and Operations access. Confirm the correct entry with your Dynamics 365 administrator before proceeding.
:::

## Step 3: Register the application in Dynamics 365 Finance

1. Sign in to your Dynamics 365 Finance environment and create a service account: go to **System administration → Users → New**, enter a **User name** and **User ID**, set the user's status to **Enabled**, and assign the security roles required to access journal entry data — for example, a role that includes duties covering the general ledger, journal, and ledger transaction settlement entities you plan to call. Select **Save**.
2. Go to **System administration → Setup → Microsoft Entra applications** and select **New**. Enter the Application (client) ID noted in Step 1 as the **Client Id**, give the entry a descriptive **Name**, and map it to the **User ID** created above. Do not paste the client ID into the user's **Azure Active Directory object ID** field — that does not establish the required Finance application registration mapping.

:::tip
Application users authenticate with client credentials rather than an interactive sign-in, but the assigned security roles still govern which OData entities and operations (list, create, update, delete) the application is allowed to perform.
:::

## Step 4: Locate the service URL and configure scopes

1. The OData root of your Dynamics 365 Finance and Operations environment is its base URL with `/data` appended, for example `https://<your-org>.operations.dynamics.com/data`.
2. Confirm the exact host by signing in to the environment and checking the browser address bar, or by asking your Dynamics 365 administrator for the environment URL.
3. This value is passed as the `serviceUrl` parameter when initializing the connector client.
4. For the OAuth2 client credentials grant, set `scopes` to the base environment URL followed by `/.default`, for example `https://<your-org>.operations.dynamics.com/.default`. This is requested at token time and is unrelated to the API permissions granted in Step 2.

## What's next

- [Action reference](actions.md): Available operations
