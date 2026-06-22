---
connector: true
connector_name: "microsoft.sharepoint.sites"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/microsoft.sharepoint.sites connector."
---

# Setup Guide

This guide walks you through provisioning a Microsoft 365 tenant, registering an Azure AD application, and obtaining the OAuth 2.0 credentials needed to call the SharePoint Sites APIs.

## Prerequisites

- An active Microsoft account with access to the [Microsoft 365 admin portal](https://www.microsoft.com/en-us/microsoft-365)
- A Microsoft 365 Business Basic, Business Standard, Business Premium, or Enterprise (E1, E3, or E5) subscription — SharePoint Online and its Graph API surface are restricted to these plans
- Access to the [Microsoft Azure Portal](https://portal.azure.com/) with permission to register applications in Microsoft Entra ID
- Administrator privileges to grant tenant-wide consent for Microsoft Graph application permissions

## Create a Microsoft account and set up SharePoint access

1. Navigate to the [Microsoft 365 website](https://www.microsoft.com/en-us/microsoft-365) and sign up for an account, or log in if you already have one.

2. Ensure your subscription includes SharePoint Online. SharePoint and its API capabilities are available on Microsoft 365 Business Basic, Business Standard, Business Premium, and Enterprise (E1, E3, or E5) plans.

## Register an application and generate credentials

1. Log in to the [Microsoft Azure Portal](https://portal.azure.com/) using your Microsoft 365 account credentials.

2. In the top search bar, select **Microsoft Entra ID**.

3. In the left panel, navigate to **App registrations** and click **New registration**.

   ![New application registration](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/new-application-registration.png)

4. Enter a name for your application, select the appropriate **Supported account types** (e.g., "Single tenant only"), and click **Register**.

   ![Application registration details](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/application-registration-details.png)

5. Once the application is registered, copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview page.

   ![Client ID and Tenant ID](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/client-id-and-tenant-id.png)

6. Navigate to **Certificates & secrets** in the left panel, click **New client secret**, provide a description and expiry period, then click **Add**. Copy the generated **client secret value** immediately — it cannot be retrieved later.

   ![Create client secret](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/create-client-secret.png)

## Configure API permissions

1. Navigate to **API permissions** in the left panel and click **Add a permission**.

   ![Add API permission](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/add-api-permission.png)

2. Select **Microsoft Graph** from the available API options.

   ![Microsoft Graph API permission](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/microsoft-graph-api-permission.png)

3. Choose **Application permissions**, then search for and add the permissions that match your use case before clicking **Add permissions**.

   | Permission              | Operations covered                                              |
   | ----------------------- | --------------------------------------------------------------- |
   | `Sites.Read.All`        | Read sites, lists, columns, content types, drives, analytics    |
   | `Sites.ReadWrite.All`   | Create and update lists, list items, drives, and content        |
   | `Sites.Manage.All`      | Update site properties, create/delete columns and content types |
   | `Sites.FullControl.All` | Manage site permissions                                         |

   ![API site permissions](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/api-site-permissions.png)

   :::tip
   Grant only the permissions your application actually requires. For read-only use cases, `Sites.Read.All` is sufficient. For full connector coverage, add all four.
   :::

4. Click **Grant admin consent** to approve the permissions for your organization.

   ![Grant admin consent](/img/connectors/catalog/storage-file/microsoft.sharepoint.sites/grant-admin-consent.png)

## Construct the token URL

Build the OAuth 2.0 `tokenUrl` from the **Directory (tenant) ID** captured earlier:

```text
https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token
```

:::note
Use the scope `https://graph.microsoft.com/.default` when requesting tokens. This scope returns the union of all application permissions that were granted admin consent on the registered app.
:::

## Next steps

- [Action Reference](action-reference.md) - Available operations