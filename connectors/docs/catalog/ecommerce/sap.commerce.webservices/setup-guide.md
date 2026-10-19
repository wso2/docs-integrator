---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring your SAP Commerce Cloud instance and obtaining the OAuth 2.0 credentials required to use the connector.

## Prerequisites

- An active SAP Commerce Cloud instance (on-premise or cloud-hosted). If you do not have one, contact your SAP administrator or [request a trial](https://www.sap.com/products/crm/commerce-cloud.html).
- Administrator access to the SAP Commerce Administration Console (HAC) or Backoffice.

## Step 1: Enable the OCC v2 API

1. Log in to the SAP Commerce Administration Console (HAC).
2. Verify that the **commercewebservices** extension is included in your `localextensions.xml`.
3. Confirm the OCC v2 endpoint is accessible at:

    ```
    https://<your-commerce-host>/occ/v2
    ```

4. If the endpoint is not available, rebuild and restart your SAP Commerce instance after adding the extension.

On SAP Commerce Cloud (CCv2), the OCC API is enabled by default. These steps apply primarily to on-premise installations.

## Step 2: Register an OAuth client

1. Open the **Backoffice Administration Cockpit** and navigate to **System > OAuth > OAuth Clients**.
2. Select **Create** to register a new OAuth client.
3. Fill in the following fields:
    - **Client ID**: Enter a unique identifier (e.g., `ballerina_connector`).
    - **Client Secret**: Enter a strong secret value.
    - **Authorities**: Add `ROLE_TRUSTED_CLIENT` (and `ROLE_CUSTOMERMANAGERGROUP` if managing customers).
    - **Authorized Grant Types**: Select `client_credentials` (for server-to-server) and/or `password` (for user-context flows).
    - **Scopes**: Add `basic` and `extended` (or the scopes required for your use case).
4. Save the OAuth client configuration.

Store the Client ID and Client Secret securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Obtain the token URL

The token URL for SAP Commerce Cloud follows this pattern:

```
https://<your-commerce-host>/authorizationserver/oauth/token
```

For the OCC v2 context, some deployments use:

```
https://<your-commerce-host>/occ/v2/authorizationserver/oauth/token
```

Verify which URL is active by testing a token request with your client credentials.

## Step 4: Identify your base site ID

1. In Backoffice, navigate to **WCMS > Website** or **Base Commerce > Base Sites**.
2. Note the **Site ID** for the storefront you want to integrate with (e.g., `electronics`, `powertools`, `apparel-uk`).
3. This value is passed as `baseSiteId` in most API calls.

You can also retrieve available base sites programmatically using the `getBaseSites` operation.

## What's next

- [Action reference](actions.md): Available operations
