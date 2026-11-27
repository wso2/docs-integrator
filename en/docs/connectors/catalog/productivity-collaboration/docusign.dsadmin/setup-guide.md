---
connector: true
connector_name: "docusign.dsadmin"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/docusign.dsadmin connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

To use the DocuSign Admin connector, you need a DocuSign account, an app with an integration key and a secret key, and an OAuth 2.0 refresh token.

## Prerequisites

- A DocuSign developer account with organization administration access

## Step 1: Create a DocuSign account

1. [Create an account](https://go.docusign.com/o/sandbox/) for free at the [Developer Center](https://developers.docusign.com/).

   <ThemedImage
       alt="Create DocuSign account"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/create-account.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/create-account.png'),
       }}
   />

## Step 2: Create an integration key and a secret key

1. Open the [Apps and Keys](https://admindemo.docusign.com/apps-and-keys) page in DocuSign.
2. Select **Add App and Integration Key**, enter a name for the app and select **Create App**. DocuSign generates an **Integration Key**.

   <ThemedImage
       alt="Create integration key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/app-and-integration-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/app-and-integration-key.png'),
       }}
   />

3. Under **Authentication**, select **Add Secret Key**.
4. Copy and save both the **Integration Key** and the **Secret Key**.

   <ThemedImage
       alt="Add secret key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/add-secret-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/add-secret-key.png'),
       }}
   />

## Step 3: Generate a refresh token

1. Select **Add URI** and enter your redirect URI, for example `http://www.example.com/callback`.

   <ThemedImage
       alt="Add redirect URI"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/add-redirect-uri.png'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/docusign.dsadmin/setup/add-redirect-uri.png'),
       }}
   />

2. Generate the encoded key, the base64 encoding of `IntegrationKey:SecretKey`. For example, run `btoa('IntegrationKey:SecretKey')` in your browser's console.
3. Open the following URL in a browser, replacing `{iKey}` with your integration key and `{redirectUri}` with your redirect URI. DocuSign redirects to the redirect URI with a `code` query parameter, the authorization code.

   ```text
   https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20organization_read%20group_read%20account_read%20permission_read%20user_read%20user_write&client_id={iKey}&redirect_uri={redirectUri}
   ```

4. Exchange the authorization code for tokens, replacing `{encodedKey}` with your encoded key and `{codeFromUrl}` with the authorization code.

   ```bash
   curl --location 'https://account-d.docusign.com/oauth/token' \
   --header 'Authorization: Basic {encodedKey}' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'code={codeFromUrl}' \
   --data-urlencode 'grant_type=authorization_code'
   ```

5. Copy the refresh token from the response. Use `https://account-d.docusign.com/oauth/token` as the refresh URL.

:::note
These steps use the DocuSign Admin API in developer mode. When your app is ready to go live, follow the [go-live guidelines](https://developers.docusign.com/docs/admin-api/go-live/).
:::

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
