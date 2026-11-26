---
connector: true
connector_name: "microsoft.excel"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/microsoft.excel connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

To use the Microsoft Excel connector, you need access to a Microsoft 365 business account and an application registered in Microsoft Entra ID. The Excel REST API supports only workbooks stored on the business platform (OneDrive for Business or SharePoint), not workbooks on the OneDrive consumer platform.

:::note
The screenshots in this guide are for illustration only. The Microsoft Entra admin center changes over time, so treat them as a visual reference rather than an exact match. Follow the described actions and choose the values (application name, redirect URI, permissions and so on) that fit your own scenario.
:::

## Prerequisites

- A Microsoft 365 business account with access to OneDrive for Business or SharePoint
- Permission to register applications in your organization's Microsoft Entra ID

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com).
2. Go to **Entra ID** > **App registrations** and select **New registration**.

   <ThemedImage
       alt="App registrations"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-1.jpg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-1.jpg'),
       }}
   />

3. Enter a name of your choice and select the account types appropriate for your organization.
4. Add a **Redirect URI** under the **Web** platform. This is where the sign-in flow returns the authorization code, and a Microsoft-hosted page such as `https://jwt.ms` is a convenient choice for Step 4. The **Web** platform is required because the connector redeems the code with a client secret, and the public "Mobile and desktop applications" platform doesn't accept one.
5. Select **Register**.

   <ThemedImage
       alt="Register an application"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-2.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-2.jpeg'),
       }}
   />

6. On the application's **Overview** page, note the **Application (client) ID** and the **Directory (tenant) ID**. You need the client ID for the connection, and the tenant ID to build the token endpoint in Step 4.

   <ThemedImage
       alt="Overview of application"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-3.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-3.jpeg'),
       }}
   />

## Step 2: Add Microsoft Graph permissions

:::note
The Excel API is delegated-only. It supports no application (app-only) permissions, so every call acts on behalf of a signed-in user.
:::

1. In the registered application, go to **API permissions** > **Add a permission** > **Microsoft Graph**.

   <ThemedImage
       alt="Select Microsoft Graph"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-5.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-5.jpeg'),
       }}
   />

2. Choose **Delegated permissions** and add the scopes your integration needs:

   | Permission | Purpose |
   |---|---|
   | `Files.Read` | Read the signed-in user's files, which is enough for read-only integrations |
   | `Files.ReadWrite` | Read and write the signed-in user's files |
   | `offline_access` | Return a refresh token along with the access token |

   `Files.ReadWrite` is the least-privileged permission Microsoft documents for the Excel API, and there is no higher-privileged alternative. Request only what your integration needs.

3. Select **Add permissions**.

   <ThemedImage
       alt="Request API permissions"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-4.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-4.jpeg'),
       }}
   />

4. Back on the **API permissions** page, select **Grant admin consent for \<your tenant\>** and confirm with **Yes**. Each permission then shows **Granted for \<your tenant\>** in the **Status** column.

   <ThemedImage
       alt="Grant admin consent"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-6.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-6.jpeg'),
       }}
   />

## Step 3: Create a client secret

1. Go to **Certificates & secrets** > **New client secret**, add a description and an expiry, and select **Add**.

   <ThemedImage
       alt="Add a client secret"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-8.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-8.jpeg'),
       }}
   />

2. Copy the secret **Value** immediately, because it's shown only once. The **Secret ID** next to it is only a label, not a credential.

   <ThemedImage
       alt="Certificates and secrets"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-7.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/productivity-collaboration/microsoft.excel/setup/setup-guide-7.jpeg'),
       }}
   />

## Step 4: Obtain a refresh token

In the following commands, replace `<TENANT_ID>`, `<CLIENT_ID>` and `<CLIENT_SECRET>` with the values from Steps 1 and 3. Use your directory (tenant) ID for a single-tenant application, or `common` for a multi-tenant one.

1. Open the following URL in a browser. This step is an interactive sign-in and consent, so it can't be done with curl:

    ```text
    https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=https%3A%2F%2Fjwt.ms&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2FFiles.ReadWrite%20offline_access&state=12345
    ```

2. Sign in and accept the consent prompt. The browser opens `https://jwt.ms/?code=<AUTH_CODE>&state=12345`. Copy the `code` value, which is single-use and expires within minutes.
3. Exchange the code for a refresh token:
    - On macOS or Linux:

        ```bash
        curl -X POST "https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token" \
          --data-urlencode "client_id=<CLIENT_ID>" \
          --data-urlencode "client_secret=<CLIENT_SECRET>" \
          --data-urlencode "scope=https://graph.microsoft.com/Files.ReadWrite offline_access" \
          --data-urlencode "code=<AUTH_CODE>" \
          --data-urlencode "redirect_uri=https://jwt.ms" \
          --data-urlencode "grant_type=authorization_code"
        ```

    - On Windows, in PowerShell, call `curl.exe` explicitly, because plain `curl` is an alias of `Invoke-WebRequest` and takes different flags:

        ```powershell
        curl.exe -X POST "https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token" `
          --data-urlencode "client_id=<CLIENT_ID>" `
          --data-urlencode "client_secret=<CLIENT_SECRET>" `
          --data-urlencode "scope=https://graph.microsoft.com/Files.ReadWrite offline_access" `
          --data-urlencode "code=<AUTH_CODE>" `
          --data-urlencode "redirect_uri=https://jwt.ms" `
          --data-urlencode "grant_type=authorization_code"
        ```

4. Copy the `refresh_token` value from the JSON response. This is the connection's `refreshToken`.
5. Note the token endpoint you called, `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token`. This is the connection's `refreshUrl`.

:::note
The `access_token` in the same response is short-lived (about an hour) and isn't used directly. The connector uses the refresh token to obtain new access tokens automatically.
:::

## Next steps

- [Action Reference](action-reference.md) - Available operations
