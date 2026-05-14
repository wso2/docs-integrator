---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a DocuSign developer account and obtaining the OAuth 2.0 credentials required to use the DocuSign Admin connector.

## Prerequisites

- A DocuSign developer account. If you do not have one, [sign up for free](https://go.docusign.com/o/sandbox/) at the [DocuSign Developer Center](https://developers.docusign.com/).
- Organization Admin privileges in your DocuSign account to access the Admin API.

## Step 1: Create a DocuSign developer account

If you do not already have a developer account, [sign up for free](https://go.docusign.com/o/sandbox/).

![Create a DocuSign developer account](/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/create-account.png)

## Step 2: Create an integration key and secret key

1. Log in to the [DocuSign Developer Portal](https://admindemo.docusign.com/apps-and-keys) and navigate to **Apps and Keys**.
2. Select **Add App and Integration Key**, enter a name, and select **Create App**. This generates an **Integration Key** (your `clientId`).

   ![Apps and integration key](/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/app-and-integration-key.png)

3. Under **Authentication**, select **Add Secret Key**. Copy and save the generated **Secret Key** (your `clientSecret`).

   ![Add secret key](/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/add-secret-key.png)

Store the Integration Key and Secret Key securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Add a redirect URI

1. On the same app configuration page, under **Additional settings**, select **Add URI**.
2. Enter your redirect URI (for example, `http://www.example.com/callback`).

   ![Add redirect URI](/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/add-redirect-uri.png)

3. Save the changes.

## Step 4: Get the refresh token

1. Generate the **encoded key** by base64-encoding your Integration Key and Secret Key in the format `IntegrationKey:SecretKey`. You can use a browser console:

   ```
   btoa('IntegrationKey:SecretKey')
   ```

2. Open the following authorization URL in your browser, replacing `{iKey}` with your Integration Key and `{redirectUri}` with your redirect URI:

   ```
   https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20organization_read%20group_read%20account_read%20permission_read%20user_read%20user_write&client_id={iKey}&redirect_uri={redirectUri}
   ```

3. Log in and authorize the application. You are redirected to your redirect URI with a `code` query parameter — this is your **authorization code**.

4. Exchange the authorization code for a refresh token:

   ```bash
   curl --location 'https://account-d.docusign.com/oauth/token' \
     --header 'Authorization: Basic {encodedKey}' \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --data-urlencode 'code={codeFromUrl}' \
     --data-urlencode 'grant_type=authorization_code'
   ```

5. Copy the `refresh_token` from the response. Use `https://account-d.docusign.com/oauth/token` as the refresh URL.

The scopes above (`organization_read`, `group_read`, `account_read`, `permission_read`, `user_read`, `user_write`) cover Admin API operations. Adjust scopes based on your use case.

## Step 5: Prepare for production

The steps above use the DocuSign developer (demo) environment. When your application is ready for production, follow the [DocuSign Go Live](https://developers.docusign.com/docs/admin-api/go-live/) guidelines to transition to the production environment. The production base URL is `https://api.docusign.net/Management` and the OAuth endpoints change from `account-d.docusign.com` to `account.docusign.com`.

## What's next

- [Action reference](actions.md): Available operations
