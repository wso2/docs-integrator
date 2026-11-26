---
title: Setup Guide
---

# Setup Guide

To use the Business Central connector, you need a Business Central environment, a user account with access to it, and an application registered in Microsoft Entra ID.

## Prerequisites

- A Business Central environment and a work or school user account with access to it
- An account that can register applications in [Microsoft Entra ID](https://entra.microsoft.com/)

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com) with an account that can register applications, and open **Entra** from the Microsoft Cloud menu. You can also go straight to the [Microsoft Entra admin center](https://entra.microsoft.com/).

   <ThemedImage
       alt="Azure Portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/azure-portal.png'),
           dark: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/azure-portal.png'),
       }}
   />

2. Select **App registrations** from the left sidebar, then select **New registration**.

   <ThemedImage
       alt="Entra main page"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/entra-main-page.png'),
           dark: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/entra-main-page.png'),
       }}
   />

3. Enter a name, choose **Accounts in this organizational directory only**, add `https://jwt.ms` as a **Web** redirect URI, and select **Register**. Business Central is reached with a work or school account in the tenant that owns the environment, so personal Microsoft accounts cannot be used.

   <ThemedImage
       alt="Register an application"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/register-application.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/register-application.jpeg'),
       }}
   />

4. On the application's **Overview** page, note the **Application (client) ID** and the **Directory (tenant) ID**.

   <ThemedImage
       alt="Application overview"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/application-overview.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/application-overview.jpeg'),
       }}
   />

## Step 2: Grant the Business Central API permissions

1. Go to **API permissions** > **Add a permission** > **Dynamics 365 Business Central**.
2. Select the delegated **Financials.ReadWrite.All** permission, which covers the operations in this connector, and select **Add permissions**.
3. Grant admin consent if your tenant requires it.

## Step 3: Create a client secret

1. Go to **Certificates & secrets** > **Client secrets** > **New client secret**.

   <ThemedImage
       alt="Add client secret"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/add-client-secret.png'),
           dark: useBaseUrl('/img/connectors/catalog/erp-business/microsoft.dynamics365.bc/setup/add-client-secret.png'),
       }}
   />

2. Add a description and an expiry, select **Add**, and copy the secret's **Value**. The value is shown only once.

## Step 4: Obtain a refresh token

The connector authenticates with an OAuth 2.0 refresh token from Microsoft Entra ID and renews its access token automatically.

1. Open the following URL in a browser, with your tenant ID and client ID, and sign in with a user account that has access to the Business Central environment:

    ```text
    https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/authorize?client_id=<client-id>&response_type=code&redirect_uri=https%3A%2F%2Fjwt.ms&response_mode=query&scope=https%3A%2F%2Fapi.businesscentral.dynamics.com%2FFinancials.ReadWrite.All%20offline_access
    ```

2. Accept the consent prompt. The browser opens `https://jwt.ms/?code=<authorization-code>`. Copy the `code` value, which is single-use and expires within minutes.
3. Exchange the code for a refresh token:

    ```bash
    curl -X POST "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token" \
      --data-urlencode "client_id=<client-id>" \
      --data-urlencode "client_secret=<client-secret>" \
      --data-urlencode "scope=https://api.businesscentral.dynamics.com/Financials.ReadWrite.All offline_access" \
      --data-urlencode "code=<authorization-code>" \
      --data-urlencode "redirect_uri=https://jwt.ms" \
      --data-urlencode "grant_type=authorization_code"
    ```

4. Copy the `refresh_token` value from the JSON response.

## Step 5: Find the environment and company

1. Note the name of the Business Central environment. The service URL carries it, as in `https://api.businesscentral.dynamics.com/v2.0/{environment}/api/v1.0`, where `{environment}` is `production` by default or the name of a sandbox. The client defaults to the production environment; pass a different service URL to `init` to target a sandbox.
2. Call `listCompanies` to obtain the identifier of the company the integration works in.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
