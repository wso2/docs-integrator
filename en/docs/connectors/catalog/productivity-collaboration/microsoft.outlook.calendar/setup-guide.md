---
connector: true
connector_name: "microsoft.outlook.calendar"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/microsoft.outlook.calendar connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

To use the Microsoft Outlook Calendar connector, you need a Microsoft 365 or Outlook.com account and an application registered in Microsoft Entra ID with OAuth 2.0 credentials.

## Prerequisites

- A Microsoft 365 or Outlook.com account whose calendar the connector will use
- Access to the [Azure portal](https://portal.azure.com) to register an application in Microsoft Entra ID

## Step 1: Sign in to the Azure portal

1. If you don't have a Microsoft Azure account, you can create one for free at [https://azure.microsoft.com](https://azure.microsoft.com).

2. Go to the [Azure portal](https://portal.azure.com) and sign in. From the home page, navigate to **Microsoft Entra ID**.

   <ThemedImage
       alt="Azure portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.outlook.calendar/setup/azure-portal.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.outlook.calendar/setup/azure-portal.png'),
       }}
   />

## Step 2: Register an application

1. In the Microsoft Entra admin center, navigate to **App registrations** from the left sidebar.

   <ThemedImage
       alt="Entra main page"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.outlook.calendar/setup/entra-main-page.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.outlook.calendar/setup/entra-main-page.png'),
       }}
   />

2. Click **New registration**.

3. Enter a name for the application, for example `Ballerina Outlook Calendar Connector`. Under **Supported account types**, choose the accounts that will sign in: accounts in your organization only, or any organization and personal Microsoft accounts if Outlook.com users must be able to sign in.

4. Under **Redirect URI**, select **Web** and enter the URI that receives the authorization code, for example `http://localhost`. Then click **Register**.

## Step 3: Add API permissions

1. In the registered application, navigate to **API permissions** and click **Add a permission**.

2. Select **Microsoft Graph**, then **Delegated permissions**, and add the following permissions:

   - `Calendars.ReadWrite` to read and write the signed-in user's calendars
   - `Calendars.ReadWrite.Shared` to read and write calendars that other users have shared with, or delegated to, the signed-in user (needed for the operations under `users/{userId}`)
   - `offline_access` so that the token response includes a refresh token

3. Click **Add permissions**. If your organization requires it, ask an administrator to grant consent.

## Step 4: Create a client secret

1. Navigate to **Overview** in the registered application and copy the **Application (client) ID**. This is your `clientId`.

2. Navigate to **Certificates & secrets**, then **Client secrets**, then **New client secret**.

   <ThemedImage
       alt="Add client secret"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.outlook.calendar/setup/add-client-secret.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.outlook.calendar/setup/add-client-secret.png'),
       }}
   />

3. Enter a description, choose an expiry period and click **Add**. Copy the secret **Value** immediately. This is your `clientSecret`.

## Step 5: Obtain a refresh token

1. Open the following URL in a browser, replacing `<CLIENT_ID>` and `<REDIRECT_URI>` with your values, and sign in with the account whose calendar the connector will use:

   ```text
   https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=<REDIRECT_URI>&response_mode=query&scope=Calendars.ReadWrite%20Calendars.ReadWrite.Shared%20offline_access
   ```

2. After you grant consent, the browser is redirected to your redirect URI with a `code` query parameter. Copy its value.

3. Exchange the code for tokens:

   ```bash
   curl --location 'https://login.microsoftonline.com/common/oauth2/v2.0/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'grant_type=authorization_code' \
   --data-urlencode 'code=<CODE>' \
   --data-urlencode 'redirect_uri=<REDIRECT_URI>' \
   --data-urlencode 'client_id=<CLIENT_ID>' \
   --data-urlencode 'client_secret=<CLIENT_SECRET>' \
   --data-urlencode 'scope=Calendars.ReadWrite Calendars.ReadWrite.Shared offline_access'
   ```

4. Store the `refresh_token` from the response securely. Use `https://login.microsoftonline.com/common/oauth2/v2.0/token` as the refresh URL. If the application is registered for your organization only, replace `common` with your tenant ID in both URLs.

To call the `/users/{userId}` operations as the application instead, without a signed-in user, add the **Calendars.ReadWrite** permission under **Application permissions**, grant admin consent, and use the client credentials grant with your tenant's token URL. The `/me` operations always need a signed-in user.

```ballerina
final calendar:Client appClient = check new ({
    auth: {
        clientId,
        clientSecret,
        tokenUrl: "https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token",
        scopes: ["https://graph.microsoft.com/.default"]
    }
});
```

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
