---
connector: true
connector_name: "microsoft.sharepoint.pages"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/microsoft.sharepoint.pages connector."
---

# Setup Guide

To use the Microsoft SharePoint Pages connector, you must register an application in Microsoft Entra ID and obtain OAuth 2.0 client credentials.

## Prerequisites

- A [Microsoft Azure](https://portal.azure.com/) developer account
- A Microsoft 365 Business Basic, Business Standard, Business Premium, or Enterprise (E1, E3, or E5) plan with SharePoint Online enabled

## Create a Microsoft Account and Set Up SharePoint Access

1. Navigate to the [Microsoft 365 website](https://www.microsoft.com/en-us/microsoft-365) and sign up for an account or log in if you already have one.

2. Ensure your plan includes SharePoint Online and its API capabilities. SharePoint Pages API features may require Microsoft 365 E3 or higher for full functionality.

## Register an Application and Generate Credentials

1. Log in to the [Microsoft Azure Portal](https://portal.azure.com/) using your Microsoft 365 account credentials.

2. In the left-hand navigation menu, select **Microsoft Entra ID** in the top search bar.

3. In the left panel, navigate to **App registrations** and click **New registration**.

   ![New application registration](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/new-application-registration.png)

4. Enter a name for your application, select the appropriate **Supported account types** (e.g., "Single tenant only"), and click **Register**.

   ![Application registration details](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/application-registration-details.png)

5. Once the application is registered, note down the **Application (client) ID** and **Directory (tenant) ID** from the Overview page.

   ![Client ID and Tenant ID](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/client-id-and-tenant-id.png)

6. Navigate to **Certificates & secrets** in the left panel, click **New client secret**, provide a description and expiry period, then click **Add**. Copy the generated **client secret value** immediately.

   ![Create client secret](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/create-client-secret.png)

7. Navigate to **API permissions** in the left panel and click **Add a permission**.

   ![Add API permission](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/add-api-permission.png)

8. Select **Microsoft Graph** from the available API options.

   ![Microsoft Graph API permission](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/microsoft-graph-api-permission.png)

9. Select **Application permissions**, then search for and add the following permissions depending on your use case, then click **Add permissions**.

   | Permission | Operations covered |
   |---|---|
   | `Sites.Read.All` | Read sites, lists, columns, content types, drives, analytics |
   | `Sites.ReadWrite.All` | Create and update lists, list items, drives, and content |
   | `Sites.Manage.All` | Update site properties, create/delete columns and content types |
   | `Sites.FullControl.All` | Manage site permissions |

   ![API site permissions](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/api-site-permissions.png)

:::tip
Grant only the permissions your application actually requires. For read-only use cases, `Sites.Read.All` is sufficient. For full connector coverage, add all four.
:::

10. Click **Grant admin consent** to approve the permissions for your organization.

    ![Grant admin consent](/img/connectors/catalog/storage-file/microsoft.sharepoint.pages/grant-admin-consent.png)

11. Construct the `tokenUrl` using the **Directory (tenant) ID** obtained earlier:

```text
https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token
```

:::note
This is the OAuth 2.0 token endpoint the connector uses to exchange your `clientId` and `clientSecret` for an access token with the `https://graph.microsoft.com/.default` scope.
:::

## Next steps

- [Action Reference](action-reference.md) - Available operations
