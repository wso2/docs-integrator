---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID and obtaining the OAuth 2.0 credentials required to use the Microsoft OneDrive connector.

## Prerequisites

- A Microsoft account with OneDrive access. If you do not have one, [sign up for a free Microsoft account](https://signup.live.com/).
- Access to the [Microsoft Entra admin center](https://entra.microsoft.com/).

## Step 1: Register the application

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Navigate to **App registrations** and select **New registration**.

   ![App registrations](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/1-App-registrations.png)

3. Enter a display name for your application.

   ![Register application](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/2-Register-application.png)

4. Under **Supported account types**, select the appropriate option for your use case.
5. Leave **Redirect URI** blank for now.
6. Select **Register**.
7. After registration, copy the **Application (client) ID** from the Overview pane.

   ![Application overview](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/3-Application-details.png)

## Step 2: Configure platform settings

1. Under **Manage**, select **Authentication**.
2. Under **Platform configurations**, select **Add a platform** and select the **Web** tile.
3. Set the **Redirect URI** to `http://localhost`.

   ![Configure web platform](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/4-Configure-web.png)

4. Select **Configure** to save.

## Step 3: Add a client secret

1. Navigate to **Certificates & secrets > Client secrets** and select **New client secret**.

   ![Add secret](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/5-Add-secret.png)

2. Add a description for your client secret.

   ![Add description](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/6-Give-description.png)

3. Select an expiration period and select **Add**.
4. Copy and save the **Value** of the secret immediately — it will not be shown again.

   ![Save secret value](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/7-Note-down-secret.png)

The client secret value is shown only once. Store it securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 4: Get the refresh token

1. Construct the authorization URL, replacing `<client-id>` with your Application (client) ID:

   ```
   https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=<client-id>&scope=offline_access%20files.read%20files.read.all%20files.readwrite%20files.readwrite.all&response_type=code&redirect_uri=http://localhost
   ```

   | Parameter | Description |
   |---|---|
   | `client_id` | Your Application (client) ID |
   | `scope` | `offline_access` (refresh token), `files.read`, `files.read.all`, `files.readwrite`, `files.readwrite.all` |
   | `response_type` | `code` |
   | `redirect_uri` | Must match the URI configured in Step 2 |

2. Open the URL in a browser, sign in, and select **Accept** to grant access.

   ![Grant access](/img/connectors/catalog/storage-file/microsoft.onedrive/setup/8-Give-access.png)

3. After authorization, you are redirected to a URL like:

   ```
   http://localhost/?code=<auth-code>
   ```

   Copy the `code` value from the URL.

4. Exchange the code for tokens:

   ```bash
   curl -X POST https://login.microsoftonline.com/common/oauth2/v2.0/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "client_id=<client-id>&client_secret=<client-secret>&redirect_uri=http://localhost&code=<auth-code>&grant_type=authorization_code"
   ```

5. Copy the `refresh_token` from the response.

## What's next

- [Action reference](actions.md): Available operations
