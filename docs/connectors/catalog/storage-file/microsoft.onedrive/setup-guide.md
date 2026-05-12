---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD) and obtaining the OAuth 2.0 credentials required to use the Microsoft OneDrive connector.

## Prerequisites

- A Microsoft account with OneDrive access. If you do not have one, [sign up for a free Microsoft account](https://signup.live.com/).
- Access to the [Microsoft Entra admin center](https://entra.microsoft.com/) (Azure portal) to register an application.

## Step 1: Register an application in Microsoft entra ID

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Navigate to **Identity** > **Applications** > **App registrations**.
3. Click **New registration**.
4. Enter a name for your application (e.g., `Ballerina OneDrive Connector`).
5. Under **Supported account types**, select the appropriate option for your use case (e.g., **Accounts in any organizational directory and personal Microsoft accounts**).
6. Under **Redirect URI**, select **Web** and enter `https://login.microsoftonline.com/common/oauth2/nativeclient` (or your own redirect URI).
7. Click **Register**.

## Step 2: Get the client ID

1. After registration, you are taken to the application's Overview page.
2. Copy the **Application (client) ID**; this is your `clientId`.

## Step 3: Create a client secret

1. In the left menu, click **Certificates & secrets**.
2. Under **Client secrets**, click **New client secret**.
3. Enter a description (e.g., `Ballerina connector secret`) and select an expiration period.
4. Click **Add**.
5. Copy the **Value** of the newly created secret; this is your `clientSecret`.

The client secret value is shown only once. Copy it immediately and store it securely. You cannot retrieve it later.

## Step 4: Configure API permissions

1. In the left menu, click **API permissions**.
2. Click **Add a permission** > **Microsoft Graph** > **Delegated permissions**.
3. Add the following permissions:
   - `Files.Read`
   - `Files.Read.All`
   - `Files.ReadWrite`
   - `Files.ReadWrite.All`
   - `offline_access`
4. Click **Add permissions**.
5. If required by your organization, click **Grant admin consent** and confirm.

The `offline_access` scope is required to obtain a refresh token for long-lived access.

## Step 5: Generate a refresh token

Use the OAuth 2.0 Authorization Code flow to obtain a refresh token:

1. Construct the following URL, replacing `<CLIENT_ID>` and `<REDIRECT_URI>`:

    ```
    https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=Files.Read%20Files.Read.All%20Files.ReadWrite%20Files.ReadWrite.All%20offline_access
    ```

2. Open the URL in a browser and sign in with your Microsoft account.
3. Grant the requested permissions when prompted.
4. After authorization, you are redirected to your redirect URI with a `code` query parameter. Copy the `code` value.
5. Exchange the code for tokens using a POST request:

    ```
    POST https://login.microsoftonline.com/common/oauth2/v2.0/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<CLIENT_ID>
    &client_secret=<CLIENT_SECRET>
    &redirect_uri=<REDIRECT_URI>
    &scope=Files.Read Files.Read.All Files.ReadWrite Files.ReadWrite.All offline_access
    ```

6. The response contains `access_token` and `refresh_token`. Copy the `refresh_token`.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange in step 5.
