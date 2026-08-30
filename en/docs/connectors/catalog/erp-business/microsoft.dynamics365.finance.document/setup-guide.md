---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to Microsoft Dynamics 365 Finance and Operations, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted, sandbox, or on-premises) with the Document management, Global address book, and Electronic reporting parameters enabled that correspond to the entities you intend to use (document types and documents, contact media, print layouts, and ED parameters).
- A Microsoft Entra ID (Azure AD) tenant, and permission to register applications in it (or an administrator who can register one on your behalf).
- A Dynamics 365 user account with **System administration** access, to create the application user and assign security roles.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.

2. Give the application a name (e.g., `d365-finance-document-connector`), select the appropriate supported account type, and select **Register**.

3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**.

4. Go to **Certificates & secrets → Client secrets → New client secret**, add a description and expiry, and select **Add**. Copy the secret **Value** immediately — it is only shown once.

:::tip
The **Application (client) ID**, **Directory (tenant) ID**, and client secret map directly to the `clientId`, `tokenUrl`, and `clientSecret` fields of the connector's `auth` configuration. The tenant ID is embedded in the token URL: `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.

2. Search for the API that represents your Dynamics 365 Finance and Operations environment (this may appear as **Dynamics ERP**, **Microsoft Dynamics ERP**, or the name of your environment), and select it.

3. Select **Application permissions**, choose the scope exposed by that API (commonly `user_impersonation`), and select **Add permissions**.

4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Because this connector authenticates using the OAuth2 client credentials grant (an app-only, non-interactive token), the access token is not tied to a signed-in user. Authorization within Dynamics 365 is instead enforced through the application user and security roles configured in Step 3.
:::

## Step 3: Add the application as a Dynamics 365 user

1. Sign in to your Dynamics 365 Finance and Operations environment.

2. Go to **System administration → Users**, and select **New**.

3. Enter a **User name** and **User ID** for the application (e.g., `DOCUMENT-APP`).

4. In the user's **Identification** details, paste the **Application (client) ID** from Step 1 into the field used to associate the user record with a Microsoft Entra ID application (labeled **Microsoft Entra app ID** or **AAD object ID** depending on your environment's version). This tells Dynamics 365 to treat API calls made with that application's access token as calls made by this user.

5. Assign one or more **Security roles** that grant the access the connector needs — for example, a role with read/write access to document management (attachments and document types), the global address book (contact media), electronic reporting configuration (ED parameters), and print management (print layouts).

6. Set the user's status to **Enabled** and save.

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
