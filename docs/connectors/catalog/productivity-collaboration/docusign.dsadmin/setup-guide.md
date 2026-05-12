---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a DocuSign developer account and obtaining the OAuth 2.0 credentials required to use the DocuSign Admin connector.

## Prerequisites

- A DocuSign developer account. If you do not have one, [sign up for free](https://go.docusign.com/o/sandbox/) at the [DocuSign Developer Center](https://developers.docusign.com/).
- Organization Admin privileges in your DocuSign account to access the Admin API.

## Step 1: Create an integration key and secret key

1. Log in to the DocuSign Developer portal.
2. Navigate to the [Apps and Keys](https://admindemo.docusign.com/apps-and-keys) page.
3. Click **Add App and Integration Key** and provide a name for the app.
4. Click **Create App**. This generates an **Integration Key** (your `clientId`).
5. Under the **Authentication** section, click **Add Secret Key**. Copy and save the generated **Secret Key** (your `clientSecret`).

Store the Integration Key and Secret Key securely. Do not commit them to source control.

## Step 2: Add a redirect URI

1. On the same app configuration page, under **Additional settings**, click **Add URI**.
2. Enter your redirect URI (e.g., `http://www.example.com/callback`).
3. Save the changes.

## Step 3: Generate a refresh token

1. Generate the **Encoded Key** by Base64-encoding your Integration Key and Secret Key in the format `IntegrationKey:SecretKey`. You can use a browser console: `btoa('IntegrationKey:SecretKey')`.

2. Open the following URL in your browser, replacing `{iKey}` with your Integration Key and `{redirectUri}` with your redirect URI:

    ```
    https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20organization_read%20group_read%20account_read%20permission_read%20user_read%20user_write&client_id={iKey}&redirect_uri={redirectUri}
    ```

3. Log in and authorize the application. You will be redirected to your redirect URI with a `code` query parameter; this is your **authorization code**.

4. Exchange the authorization code for a refresh token using the following `curl` command:

    ```
    curl --location 'https://account-d.docusign.com/oauth/token' \
    --header 'Authorization: Basic {encodedKey}' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code={codeFromUrl}' \
    --data-urlencode 'grant_type=authorization_code'
    ```

5. The response contains your `refresh_token`. Use `https://account-d.docusign.com/oauth/token` as the refresh URL.

Use a tool like Postman or curl to perform the token exchange.

The scopes requested above (organization_read, group_read, account_read, permission_read, user_read, user_write) cover Admin API operations. Adjust scopes based on your use case.

## Step 4: Prepare for production (Go live)

The steps above use the DocuSign developer (demo) environment. When your application is
ready for production, follow the [DocuSign Go Live](https://developers.docusign.com/docs/admin-api/go-live/)
guidelines to transition to the production environment. The production base URL is
`https://api.docusign.net/Management` and the OAuth endpoints change from `account-d.docusign.com`
to `account.docusign.com`.
