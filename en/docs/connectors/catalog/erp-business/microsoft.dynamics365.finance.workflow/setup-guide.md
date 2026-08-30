---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to the Dynamics 365 Finance and Operations Workflow APIs, and obtaining the service URL and credentials required by the connector.

## Prerequisites

- An active Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox) with the Workflow (System administration) module enabled.
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

3. Choose **Application permissions** and select the `user_impersonation` permission (or the `.default` scope, depending on how your tenant exposes the API).

4. Select **Add permissions**, then select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Application permissions require a tenant administrator to grant consent. If you don't have administrator rights, ask your Microsoft Entra ID administrator to complete this step.
:::

## Step 4: Add the application as a Dynamics 365 Finance user

1. Sign in to your Dynamics 365 Finance & Operations environment and navigate to **System administration → Users → New**.

2. Set the **User name**, and for the identity/authentication type select the option for a Microsoft Entra ID application. Paste the **Application (client) ID** you noted in Step 1 into the corresponding client identifier field.

3. Assign the security roles the application needs in order to work with workflow configuration data — for example, the **System administrator** role, or a custom role scoped to the workflow entities (action classes, actions, approval users, policies, process stages) you plan to use — via **System administration → Security → Assign users to roles**.

4. Save the user record and confirm it is **Enabled**.

## Step 5: Obtain the environment's service URL

1. The `serviceUrl` required by the connector is the OData root of your Dynamics 365 Finance and Operations environment. It follows the pattern:
   ```
   https://<your-org>.operations.dynamics.com/data
   ```

2. You can find your environment's base URL from the address bar when you sign in to Dynamics 365 Finance & Operations, or from **Lifecycle Services (LCS)** for the environment. Append `/data` to the base URL to form the `serviceUrl`.

3. Optionally, verify the endpoint is reachable by browsing to `<serviceUrl>/$metadata` while signed in — this returns the OData metadata document for the environment, including the `Workflows`, `ActionClasses`, `Actions`, and `ApprovalUsers` entity sets.

## What's next

- [Action reference](actions.md): Available operations
