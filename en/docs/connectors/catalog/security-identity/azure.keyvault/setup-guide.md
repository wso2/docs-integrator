---
connector: true
connector_name: "azure.keyvault"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/azure.keyvault connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

To use the Azure Keyvault connector, you need a key vault, permission to use it, and an application registered in Microsoft Entra ID.

## Prerequisites

- An active Microsoft Azure subscription
- Sufficient Azure permissions to create resources and assign roles

## Step 1: Sign in to the Azure portal

1. Go to the [Azure portal](https://portal.azure.com/).
2. Sign in with an account that has an active subscription.

## Step 2: Create a key vault

1. Search for **Key vaults** and select **Create**.
2. Choose a subscription, resource group, region and a globally unique vault name.
3. Create the vault.
4. Note the **Vault URI** on the vault's **Overview** page, for example `https://<vault-name>.vault.azure.net`. The connector sends every request to this URI.

## Step 3: Grant data-plane access

1. On a vault that uses Azure role-based access control, open the vault's **Access control (IAM)** page.
2. Assign the roles the program needs to the user account that will sign in during Step 4, for example:
   - **Key Vault Secrets Officer** to manage secrets
   - **Key Vault Crypto Officer** to manage keys and use them for cryptographic operations
   - **Key Vault Certificates Officer** to manage certificates

:::note
On a vault that uses access policies, add an access policy with the matching key, secret and certificate permissions instead.
:::

## Step 4: Obtain a refresh token

The connector authenticates with an OAuth 2.0 refresh token from Microsoft Entra ID and renews its access token automatically.

1. In the Azure portal, open the app launcher and select **Entra**.

   <ThemedImage
       alt="Open Microsoft Entra from the Azure portal"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/security-identity/azure.keyvault/setup/setup-guide-1.png'),
           dark: useBaseUrl('/img/connectors/catalog/security-identity/azure.keyvault/setup/setup-guide-1.png'),
       }}
   />

2. Go to **App registrations** > **New registration**. Enter a name, choose the supported account types, add `https://jwt.ms` as a **Web** redirect URI, and select **Register**.

   <ThemedImage
       alt="Open App registrations in Microsoft Entra"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/security-identity/azure.keyvault/setup/setup-guide-2.png'),
           dark: useBaseUrl('/img/connectors/catalog/security-identity/azure.keyvault/setup/setup-guide-2.png'),
       }}
   />

3. On the application's **Overview** page, note the **Application (client) ID** and the **Directory (tenant) ID**.
4. Go to **Certificates & secrets** > **New client secret**, add a secret, and copy its **Value**. The value is shown only once.

   <ThemedImage
       alt="Create a client secret"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/security-identity/azure.keyvault/setup/setup-guide-3.png'),
           dark: useBaseUrl('/img/connectors/catalog/security-identity/azure.keyvault/setup/setup-guide-3.png'),
       }}
   />

5. Go to **API permissions** > **Add a permission** > **Azure Key Vault**, select the delegated **user_impersonation** permission, and select **Add permissions**. Grant admin consent if your tenant requires it.
6. Open the following URL in a browser, with your tenant ID and client ID, and sign in with the user account that has the role from Step 3:

   ```text
   https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/authorize?client_id=<client-id>&response_type=code&redirect_uri=https%3A%2F%2Fjwt.ms&response_mode=query&scope=https%3A%2F%2Fvault.azure.net%2Fuser_impersonation%20offline_access
   ```

7. Accept the consent prompt. The browser opens `https://jwt.ms/?code=<authorization-code>`. Copy the `code` value, which is single-use and expires within minutes.
8. Exchange the code for a refresh token:

   ```bash
   curl -X POST "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token" \
     --data-urlencode "client_id=<client-id>" \
     --data-urlencode "client_secret=<client-secret>" \
     --data-urlencode "scope=https://vault.azure.net/user_impersonation offline_access" \
     --data-urlencode "code=<authorization-code>" \
     --data-urlencode "redirect_uri=https://jwt.ms" \
     --data-urlencode "grant_type=authorization_code"
   ```

9. Copy the `refresh_token` value from the JSON response.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
