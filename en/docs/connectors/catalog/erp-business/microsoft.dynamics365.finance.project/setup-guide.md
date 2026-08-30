---
title: Setup Guide
---
# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to your Microsoft Dynamics 365 Finance and Operations environment, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox).
- A Microsoft Entra ID tenant with permissions to register applications (or an administrator who can do so on your behalf).
- Global administrator or application administrator access to grant admin consent for API permissions.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.

2. Give the application a name (e.g., `d365-fo-project-integration`), select the appropriate supported account type, and select **Register**.

3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID** — you will need both to build the OAuth2 token URL and to configure the connector.

4. Go to **Certificates & secrets → Client secrets → New client secret**. Add a description and expiry, then select **Add**.

:::tip
Copy the client secret **value** immediately after creation — it is shown only once and cannot be retrieved later. Store it securely; it is used as the `clientSecret` field when initializing the connector client.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.

2. Search for and select **Dynamics ERP** (this represents your Dynamics 365 Finance and Operations environment).

3. Select **Application permissions**, then select the `user_impersonation` permission (or the equivalent application-level scope exposed by your environment).

4. Select **Add permissions**.

5. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Application permissions require admin consent before they take effect. If you don't have administrator rights, ask your Microsoft Entra ID administrator to grant consent for the permission you added.
:::

## Step 3: Add the application as a Dynamics 365 user

The Entra ID app registration also needs a corresponding user record inside the Finance and Operations environment, with security roles that authorize access to project data.

1. Sign in to your Dynamics 365 Finance and Operations environment and go to **System administration → Users → New**.

2. Set the **User name** and **User ID** for the application user.

3. In the **Identity provider object ID** (or **Azure Active Directory object ID**) field, paste the **Application (client) ID** noted in Step 1.

4. Save the user record, then select **Assign roles** and assign a security role that grants access to project management data (for example, a project management or project accountant role, or a custom role scoped to the entities you need).

:::note
Without an assigned security role, calls made with a valid OAuth2 token will still be rejected with an authorization error by the Finance and Operations environment.
:::

## Step 4: Locate the service URL

The connector's `serviceUrl` is the OData root of your Finance and Operations environment.

1. Sign in to your Dynamics 365 Finance and Operations environment.

2. Note the base URL shown in the browser address bar, typically in the form `https://<your-org>.operations.dynamics.com`.

3. Append `/data` to obtain the OData root, for example:

   ```
   https://<your-org>.operations.dynamics.com/data
   ```

This value is passed as the `serviceUrl` parameter when initializing the connector client. The token URL follows the pattern `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token`, built from the **Directory (tenant) ID** noted in Step 1.

## What's next

- [Action reference](actions.md): Available operations
