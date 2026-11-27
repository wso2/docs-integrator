---
connector: true
connector_name: "docusign.monitor"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/docusign.monitor connector."
---

# Setup Guide

To use the DocuSign Monitor connector, you need a Docusign organization with DocuSign Monitor enabled and an app that is authorized to call the Monitor API using OAuth 2.0.

## Prerequisites

- A Docusign organization with DocuSign Monitor enabled, and an app that is authorized to call the Monitor API using OAuth 2.0.

## Step 1: Create an integration key

1. Sign in to the [Docusign Developer Console](https://developers.docusign.com/) and open your apps and keys page.
2. Create an app and note down its **Integration Key**, which is the client ID.
3. Add a **secret key** to the app and note it down, which is the client secret.
4. Add the redirect URI that your application uses.

## Step 2: Obtain a refresh token

1. Direct the user to the Docusign authorization endpoint, replacing `CLIENT_ID` and `REDIRECT_URI`. Use `account-d.docusign.com` instead of `account.docusign.com` for the demo environment.

   ```text
   https://account.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation%20extended&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI
   ```
2. After the user grants consent, Docusign redirects to your redirect URI with an authorization code.
3. Exchange the authorization code for tokens.

   ```bash
   curl -X POST https://account.docusign.com/oauth/token \
     -H "Authorization: Basic $(echo -n 'CLIENT_ID:CLIENT_SECRET' | base64)" \
     -d "grant_type=authorization_code&code=AUTHORIZATION_CODE"
   ```
4. The response contains both an `access_token` and a `refresh_token`. If your application authenticates with the JWT grant instead, pass the resulting access token as a bearer token.

## Step 3: Find your organization ID

1. Open the Docusign Admin console of your organization.
2. Copy the **Organization ID** shown in the organization details. It identifies the organization whose events you read.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
