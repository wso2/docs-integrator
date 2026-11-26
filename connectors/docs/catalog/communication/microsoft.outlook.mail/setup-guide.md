---
title: Setup Guide
---

# Setup Guide

To use the Microsoft Outlook Mail connector, you need a Microsoft account and an application registered in Microsoft Entra ID (formerly Azure Active Directory) with the appropriate OAuth 2.0 credentials.

## Prerequisites

- A Microsoft account (personal, work, or school)
- Access to the [Azure Portal](https://portal.azure.com)

## Step 1: Sign in to Azure Portal

1. If you don't have a Microsoft Azure account, create one for free at [https://azure.microsoft.com](https://azure.microsoft.com).
2. Go to the [Azure Portal](https://portal.azure.com) and sign in with your Microsoft account. From the home page, go to **Entra**.

   <ThemedImage
       alt="Azure Portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-1.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-1.png'),
       }}
   />

## Step 2: Register an application

1. In the Microsoft Entra admin center, go to **App registrations** from the left sidebar.

   <ThemedImage
       alt="Entra main page"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-2.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-2.png'),
       }}
   />

2. Select **New registration** in the top menu.
3. Fill in the application details.
   - **Name**: A name for your app (for example, `Ballerina Outlook Connector App`).
   - **Supported account types**: Select **Any Entra ID Tenant + Personal Microsoft Accounts**.
   - **Redirect URI**: Select **Web** and enter your redirect URI (for example, `http://localhost` for local testing).

   <ThemedImage
       alt="Register application"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-3.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-3.png'),
       }}
   />

4. Select **Register**.

## Step 3: Add API permissions

1. In your registered application, go to **API permissions** from the left sidebar.
2. Select **Add a permission** > **Microsoft Graph** > **Delegated permissions**.

   <ThemedImage
       alt="Add API permissions"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-4.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-4.png'),
       }}
   />

3. Add the following permissions.
   - `Mail.Read`
   - `Mail.ReadWrite`
   - `Mail.Send`
   - `MailboxSettings.Read`
   - `MailboxSettings.ReadWrite`
   - `offline_access`
4. Select **Add permissions**.
5. When prompted to grant consent, select **Accept** to allow the app access to the requested permissions.

   <ThemedImage
       alt="Allow permission"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-5.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-5.png'),
       }}
   />

## Step 4: Get the client ID and client secret

1. Go to **Overview** in your registered application. Copy the **Application (client) ID** and save it as your `clientId`.
2. Go to **Certificates & secrets** > **Client secrets** > **New client secret**.

   <ThemedImage
       alt="Add client secret"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-6.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/microsoft.outlook.mail/setup/setup-guide-6.png'),
       }}
   />

3. Enter a description, choose an expiry duration, and select **Add**.
4. Copy the generated **Value** of the secret and save it as your `clientSecret`.

Once you have the credentials, use the **client credentials grant type** for APIs that operate on behalf of a specific user (the `users/{userIdentifier}/...` APIs such as `sendMailFromUser`, `listMessagesFromUser` and `getMailFolderFromUser`), and the **refresh token grant type** (authorization code flow) for all `/me/...` APIs.

APIs under `users/{userIdentifier}/...` require **Application** permissions (for example, `Mail.Send`, `Mail.Read` and `Mail.ReadWrite`) in Microsoft Entra ID with admin consent granted. Delegated permissions are not sufficient. To use the client credentials grant type, configure your application with `clientId`, `clientSecret`, `tokenUrl` and `scope`. Refer to [this guide](https://central.ballerina.io/ballerinax/microsoft.sharepoint.sites/latest#step-2-register-an-application-and-generate-credentials) for more information.

## Step 5: Set up the authentication flow

Before using the connector, obtain a refresh token using the OAuth 2.0 authorization code flow.

1. Construct an authorization URL in the format below, replacing `<CLIENT_ID>`, `<REDIRECT_URI>` and `` with your values.

   ```text
   https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=<REDIRECT_URI>&scope=&response_mode=query
   ```

   Example value for ``: `Mail.Read Mail.ReadWrite Mail.Send User.Read offline_access`
2. Open the URL in a browser, sign in with your Microsoft account, and grant the requested permissions.
3. After authorization, you're redirected to your redirect URI with a `code` parameter in the URL. Copy this code.
4. Exchange the authorization code for tokens by running the following `curl` command, replacing the placeholders with your values. For ``, you can use `Mail.Read Mail.ReadWrite Mail.Send User.Read offline_access`.

   ```bash
   curl --location 'https://login.microsoftonline.com/common/oauth2/v2.0/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'grant_type=authorization_code' \
   --data-urlencode 'code=' \
   --data-urlencode 'redirect_uri=<REDIRECT_URI>' \
   --data-urlencode 'client_id=<CLIENT_ID>' \
   --data-urlencode 'client_secret=<CLIENT_SECRET>' \
   --data-urlencode 'scope='
   ```

   The response contains your access token and refresh token.

   ```json
   {
       "token_type": "Bearer",
       "scope": "",
       "refresh_token": "<REFRESH_TOKEN>",
       "access_token": "<ACCESS_TOKEN>",
       "expires_in": 3600
   }
   ```

5. Store the `refresh_token` securely for use in your application.
6. Use `https://login.microsoftonline.com/common/oauth2/v2.0/token` as the refresh URL.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
