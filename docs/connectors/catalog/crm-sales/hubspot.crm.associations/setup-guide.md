---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a HubSpot app and obtaining the OAuth 2.0 credentials required to authenticate with the HubSpot CRM Associations API.

## Prerequisites

- A HubSpot account. If you do not have one, [sign up for a free account](https://app.hubspot.com/signup).
- A HubSpot Developer account. If you do not have one, [create a developer account](https://developers.hubspot.com/).

## Create a HubSpot app

1. Log in to your [HubSpot Developer Portal](https://app.hubspot.com/developer/).
2. In the top navigation, click **Apps**.
3. Click **Create app** in the top-right corner.
4. Under **App Info**, provide:
    - **Public app name**: Enter a name (e.g., `Ballerina CRM Associations`).
    - **Description** (optional): Describe your integration.
5. Click **Create app**.

## Configure OAuth scopes

1. Open your newly created app and navigate to the **Auth** tab.
2. Under **Scopes**, click **Add new scope** and add the following scopes:
    - `crm.associations.read`: required to read associations between CRM objects.
    - `crm.associations.write`: required to create, update, and delete associations.
3. Set the **Redirect URL** to your application's callback URL (e.g., `https://your-app.com/oauth/callback`).
4. Click **Save**.

Depending on the CRM object types you intend to link, you may also need object-specific scopes such as `crm.objects.contacts.read`, `crm.objects.deals.read`, and `crm.objects.companies.read`.

## Obtain the client ID and client secret

1. In your app's **Auth** tab, locate the **App credentials** section.
2. Copy the **Client ID**; this is your `clientId`.
3. Click **Show** next to **Client secret** and copy the value: this is your `clientSecret`.

Store the Client ID and Client Secret securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Install the app on a HubSpot account

1. Still on the **Auth** tab, scroll to **Install URL (OAuth)**.
2. Click **Copy full URL** to get the OAuth authorization URL for your app.
3. Open the URL in a browser while logged into the HubSpot account you want to connect.
4. Review the requested permissions and click **Connect app**.
5. After authorization, HubSpot redirects to your callback URL with a `code` query parameter. Copy this `code` value.

The authorization code expires after 10 minutes. Exchange it for tokens promptly.

## Exchange the authorization code for a refresh token

Send a POST request to HubSpot's token endpoint to exchange the authorization code for
an access token and refresh token:

```
POST https://api.hubapi.com/oauth/v1/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=<AUTHORIZATION_CODE>
&client_id=<YOUR_CLIENT_ID>
&client_secret=<YOUR_CLIENT_SECRET>
&redirect_uri=<YOUR_REDIRECT_URI>
```

The response contains `access_token`, `refresh_token`, and `expires_in`. Copy the
`refresh_token`: you will use this in your connector configuration.

Use a tool like [Postman](https://www.postman.com/) or `curl` to perform the token exchange.

## Installation

### Using the visual designer

1. Open the **Visual Designer** in VS Code.
2. Add a new **Connection** node.
3. Search for **HubSpot CRM Associations** in the connector list.
4. Follow the connection wizard to enter your credentials.

### Using code

Add the import to your Ballerina file:

```ballerina
import ballerinax/hubspot.crm.associations;
```

Add the dependency to `Ballerina.toml`:

```toml
[[dependency]]
org = "ballerinax"
name = "hubspot.crm.associations"
version = "2.0.0"
```

## Next steps

- [Actions Reference](actions.md): Available operations
