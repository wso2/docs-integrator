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
3. Choose **Application permissions**, select the Dynamics ERP application role appropriate for this connector (do not select `user_impersonation` — that scope is delegated and applies only to interactive, signed-in-user flows), and select **Add permissions**.
4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Because this connector uses the OAuth 2.0 client credentials grant, the application must be granted **application permissions**, not delegated permissions, and those permissions must be consented to by a tenant administrator before the connector can obtain an access token. `.default` is not selected here as an application permission — it is the value appended to the resource URL when the connector requests a token (see Step 5).
:::

## Step 4: Register the application in Dynamics 365 Finance

1. In your Dynamics 365 Finance & Operations environment, create a service account: go to **System administration > Users > New**, set a **User name** and **User ID**, assign the security roles the integration needs (for example, roles that grant access to customer maintenance duties), and save the record.
2. Go to **System administration > Setup > Microsoft Entra applications** (labeled **Microsoft Entra ID applications** on some versions) and select **New**. Enter the **Application (client) ID** from Step 1 as the **Client Id**, give the entry a descriptive **Name**, and set the **User ID** to the service account created above. Do not paste the **Application (client) ID** into a user record's **Identity provider object ID** field — that is a different mechanism and does not establish the required application registration mapping.

## Step 5: Locate the service URL and token scope

1. While signed in to your Dynamics 365 Finance & Operations environment, note the base URL shown in the browser address bar, for example `https://<your-org>.operations.dynamics.com`.
2. Append `/data` to this URL to form the OData root that the connector uses as its `serviceUrl`:

   ```
   https://<your-org>.operations.dynamics.com/data
   ```

3. Set the connector's `scopes` value — a field on the `OAuth2ClientCredentialsGrantConfig` alongside `tokenUrl`, `clientId`, and `clientSecret` — to the base environment URL (without the `/data` suffix) followed by `/.default`:

   ```
   https://<your-org>.operations.dynamics.com/.default
   ```

With the tenant ID, client ID, client secret, service URL, and scopes collected, you have everything the connector needs to authenticate and connect.

## What's next

- [Action reference](actions.md): Available operations
