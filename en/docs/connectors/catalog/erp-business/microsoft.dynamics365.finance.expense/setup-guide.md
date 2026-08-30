---
title: Setup Guide
---
# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID, granting it Dynamics 365 Finance and Operations API permissions, and adding it as a user in your Dynamics 365 Finance environment to obtain the credentials needed for the Microsoft Dynamics 365 Finance Expense connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted, sandbox, or trial), with System administrator access.
- Access to the Microsoft Entra ID (Azure AD) tenant associated with that environment, with permissions to register applications and grant admin consent.

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.
2. Give the application a name (e.g., `d365-expense-integration`), select the account type appropriate for your organization, and select **Register**.
3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**: both values are required by the connector.

:::tip
Use a dedicated application registration for each integration so that credentials can be rotated and audited independently of other integrations.
:::

## Step 2: Create a client secret

1. In the registered application, go to **Certificates & secrets → Client secrets → New client secret**.
2. Add a description and choose an expiry period.
3. Select **Add**, then immediately copy the secret **Value** (not the Secret ID).

:::note
The client secret value is shown only once. If you lose it, you must create a new client secret.
:::

## Step 3: Grant Dynamics 365 Finance and Operations API permissions

1. In the registered application, go to **API permissions → Add a permission → APIs my organization uses**.
2. Search for **Dynamics ERP** (the Microsoft Dynamics 365 Finance and Operations API) and select it.
3. Choose **Application permissions**, select the `.default` scope, and select **Add permissions**.
4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Granting admin consent requires Global Administrator or Privileged Role Administrator permissions in the tenant. If you do not have these permissions, ask your tenant administrator to complete this step.
:::

## Step 4: Add the application as a Dynamics 365 Finance user

1. Sign in to your Dynamics 365 Finance environment and open **System administration → Users → New**.
2. Choose to create the user from Microsoft Entra ID, and paste the **Application (client) ID** from Step 1 into the associated Microsoft Entra application field.
3. Assign the security roles required for expense operations (for example, a role scoped to Expense reports, Expense policies, Per diem, and Mileage rate entities, or a custom role covering the entities you intend to use), then select **Save**.

:::tip
Assign only the security roles that the integration actually needs. This limits the entities and operations the application's access token can be used against.
:::

## Step 5: Locate your service URL

The `serviceUrl` required by the connector is the OData data root of your Dynamics 365 Finance and Operations environment:

```
https://<your-org>.operations.dynamics.com/data
```

You can find the base environment URL in the [Microsoft Dynamics Lifecycle Services (LCS)](https://lcs.dynamics.com/) portal, or from your browser's address bar when signed in to the environment. Append `/data` to the base environment URL to form the `serviceUrl`.

The `tokenUrl` follows the standard Microsoft Entra ID v2.0 token endpoint format, using the **Directory (tenant) ID** from Step 1:

```
https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token
```

:::tip
Store the tenant ID, client ID, client secret, and service URL as configurable values (for example, in a `Config.toml` file) rather than hard-coding them in source files.
:::

## What's next

- [Action reference](actions.md): Available operations
