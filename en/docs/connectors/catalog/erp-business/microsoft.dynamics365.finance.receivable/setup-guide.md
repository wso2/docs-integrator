---
title: Setup Guide
---
# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it API permissions for Dynamics 365, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Receivable connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox), with the Accounts receivable module configured.
- A Microsoft Entra ID tenant with permissions to create app registrations, and a user with System administrator access to the Dynamics 365 Finance environment.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.
2. Give the application a name (e.g., `d365-receivable-integration`), select the account type appropriate for your organization, and select **Register**.
3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**: both values are required by the connector.
4. Go to **Certificates & secrets → Client secrets → New client secret**, add a description and expiry, and select **Add**.
5. Copy the generated secret **Value** immediately: it is shown only once and is required by the connector as `clientSecret`.

:::tip
Use a dedicated app registration for each integration to make credential rotation and audit tracking easier. Avoid reusing an application that is also used for interactive user sign-in.
:::

## Step 2: Grant Dynamics 365 API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.
2. Search for **Dynamics ERP** (this is the service principal that represents your Dynamics 365 Finance & Operations environment) and select it.
3. Choose **Application permissions**, then select the `user_impersonation` permission (or the equivalent scope exposed by your environment), and select **Add permissions**.
4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
If **Dynamics ERP** does not appear in the list of APIs, an administrator must first consent to the Dynamics 365 service principal being present in the tenant. This typically happens automatically the first time a user signs in to the Dynamics 365 Finance environment.
:::

## Step 3: Add the application as a Dynamics 365 Finance user

1. In your Dynamics 365 Finance environment, go to **System administration → Users → New**.
2. Set the **User ID** and **User name**, then in the **Identity provider object ID** (or **Azure AD object ID**) field, paste the **Application (client) ID** noted in Step 1. This links the app registration to a D365 user identity.
3. Assign the security roles required for the receivable entities you plan to work with (for example, **Accounts receivable clerk**, **Accounts receivable manager**, or **Credit and collections manager**) and save.

## Step 4: Locate your service URL

The connector connects to the OData root of your Dynamics 365 Finance and Operations environment. This URL has the form:

```
https://<your-org>.operations.dynamics.com/data
```

You can find `<your-org>` in the address bar when you are signed in to your Dynamics 365 Finance environment, or by asking your Dynamics 365 administrator. Use this full URL, including the `/data` suffix, as the `serviceUrl` value when initializing the connector.

:::tip
Store your tenant ID, client ID, client secret, and service URL securely using `configurable` variables in a `Config.toml` file. Never hard-code credentials in source files.
:::

## What's next

- [Action reference](actions.md): Available operations
