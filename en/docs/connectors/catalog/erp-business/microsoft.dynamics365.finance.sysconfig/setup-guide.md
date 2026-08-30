---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID, granting it access to the Dynamics 365 Finance and Operations OData API, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox), with System administration access.
- Access to the [Microsoft Entra admin center](https://entra.microsoft.com/) for the same tenant as the environment, with permission to register applications.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) and navigate to **Identity > Applications > App registrations > New registration**.
2. Enter a display name for the application, select the appropriate **Supported account types**, and select **Register**.
3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**. Both values are required to initialize the connector.

## Step 2: Create a client secret

1. In the application's left navigation, select **Certificates & secrets > Client secrets**, then select **New client secret**.
2. Add a description, choose an expiration period, and select **Add**.
3. Copy and store the secret's **Value** immediately.

:::warning
The client secret value is shown only once. Store it securely and never commit it to source control. Supply it to your integration at runtime through a configuration mechanism such as a `Config.toml` file.
:::

## Step 3: Grant Dynamics 365 API permissions

1. In the application, select **API permissions > Add a permission > APIs my organization uses**.
2. Search for **Dynamics ERP** (this covers Dynamics 365 Finance and Operations environments) and select it.
3. Choose **Application permissions**, select the `.default` scope, and select **Add permissions**.
4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Because this connector uses the OAuth 2.0 client credentials grant, the application must be granted **application permissions**, not delegated permissions, and those permissions must be consented to by a tenant administrator before the connector can obtain an access token.
:::

## Step 4: Add the application as a Dynamics 365 Finance user

1. In your Dynamics 365 Finance & Operations environment, go to **System administration > Users > New**.
2. Set a **User name** and **User ID**, then in the **Identity provider object ID** field, paste the **Application (client) ID** from Step 1.
3. Assign the security roles the integration needs to work with system configuration data (for example, roles that grant access to the **System administration** duties covering reason codes, product types, registrations, rooms, work calendars, and web service configuration) and save the record.

:::tip
Grant only the roles required for the specific entity sets your integration uses. System configuration entities such as `WebServices` and `TableMappings` are typically restricted to administrative roles — avoid assigning broader access than the integration needs.
:::

## Step 5: Locate the service URL

1. While signed in to your Dynamics 365 Finance & Operations environment, note the base URL shown in the browser address bar, for example `https://<your-org>.operations.dynamics.com`.
2. Append `/data` to this URL to form the OData root that the connector uses as its `serviceUrl`:

   ```
   https://<your-org>.operations.dynamics.com/data
   ```

With the tenant ID, client ID, client secret, and service URL collected, you have everything the connector needs to authenticate and connect.

## What's next

- [Action reference](actions.md): Available operations
