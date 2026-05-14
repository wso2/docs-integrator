---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Twitter developer project and obtaining the OAuth 2.0 credentials required to use the Twitter connector.

## Prerequisites

- A Twitter developer account. If you do not have one, [apply for access at the X Developer Portal](https://developer.x.com/).

## Step 1: Create a Twitter developer project

1. Open the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).
2. Select the **Projects & Apps** tab and select an existing project or create a new one.

   ![Twitter Developer Portal](/img/connectors/catalog/marketing-social/twitter/setup/twitter-developer-portal.png)

## Step 2: Set up user authentication

1. In your project or app settings, select **Set up** to configure user authentication.

   ![Set up user authentication](/img/connectors/catalog/marketing-social/twitter/setup/set-up.png)

2. Complete the user authentication setup by filling in the required fields (app permissions, callback URI, website URL).

## Step 3: Get the client ID and client secret

After completing authentication setup, copy the **Client ID** and **Client Secret**.

![Get client ID and client secret](/img/connectors/catalog/marketing-social/twitter/setup/get-keys.png)

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Get an access token (OAuth 2.0 PKCE flow)

Twitter uses OAuth 2.0 with PKCE. You need a **code verifier** (a random string) and a **code challenge** (derived from the verifier).

1. Construct the authorization URL:

   ```text
   https://twitter.com/i/oauth2/authorize?response_type=code&client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=tweet.read%20tweet.write%20users.read%20follows.read&state=state&code_challenge=<YOUR_CODE_CHALLENGE>&code_challenge_method=S256
   ```

   Replace `<YOUR_CLIENT_ID>`, `<YOUR_REDIRECT_URI>`, and `<YOUR_CODE_CHALLENGE>` with your values. Adjust the `scope` parameter as needed.

   :::note
   Two code challenge methods are available: `S256` (SHA256 hash of the code verifier, recommended) and `plain` (the verifier string itself).
   :::

2. Open the URL in a browser and authorize the app when prompted.

   ![Twitter authorization page](/img/connectors/catalog/marketing-social/twitter/setup/authorize.png)

3. After authorization, you are redirected to your callback URI with an authorization `code` in the URL. Copy the code.

   :::warning
   The authorization code expires quickly — use it immediately.
   :::

4. Exchange the code for tokens:

   ```bash
   curl --location "https://api.twitter.com/2/oauth2/token" \
     --header "Content-Type: application/x-www-form-urlencoded" \
     --data-urlencode "code=<YOUR_AUTHORIZATION_CODE>" \
     --data-urlencode "grant_type=authorization_code" \
     --data-urlencode "client_id=<YOUR_CLIENT_ID>" \
     --data-urlencode "redirect_uri=<YOUR_REDIRECT_URI>" \
     --data-urlencode "code_verifier=<YOUR_CODE_VERIFIER>"
   ```

5. Copy the `access_token` from the response.

   :::note
   By default, access tokens obtained through this flow are valid for two hours. To obtain a long-lived token, add `offline.access` to your scopes — see the [Twitter documentation](https://developer.x.com/en/docs/authentication/oauth-2-0/user-access-token) for details.
   :::

## What's next

- [Action reference](actions.md): Available operations
