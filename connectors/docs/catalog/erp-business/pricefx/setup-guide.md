---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting the details the connector needs to authenticate and communicate with your Pricefx partition.

## Choose an authentication method

The connector supports several ways to authenticate with Pricefx. Provide exactly one of the following credential combinations.

### 1. Basic Authentication

The most common setup, and the one to reach for first.

Your user name, password, and partition are provisioned when your Pricefx account is created - ask your Pricefx administrator if you don't already have them. The partition name also appears in your instance's login URL, in the form `https://<your-node>.pricefx.com/pricefx/<your-partition>`.

You only pay for a Basic authenticated request once: the connector uses your username, password, and partition to bootstrap a session token when the client is created, then reuses that token for every request afterward instead of sending your credentials again.

### 2. JWT Token Authentication

Provide `jwt` on its own - no username, password, or partition needed.

If you already have a non-expiring Pricefx JWT, you can use it directly by setting it as `jwt`.

### 3. OAuth 2.0 Authentication

Provide `clientId`, `refreshToken`, and optionally `clientSecret`.

#### Registering an OAuth client

On the Pricefx side, go to **Administration > Configuration > System Configuration > Advanced Configuration Options** and add a per-partition configuration named `oauthConfiguration` with a value shaped like this:

```json
{
  "knownClients": {
    "<yourClientName>": {
      "redirect_uri": "<the redirect URI your integration listens on>",
      "client_secret": "<a secret of your choosing>",
      "client_description": "A short label shown on the consent screen"
    }
  }
}
```

- The key you choose under `knownClients` (`<yourClientName>` above) is the value you set as `clientId`.
- `client_secret`, if you set one, is the value you set as `clientSecret`.
- `redirect_uri` must match wherever your integration is set up to receive the sign-in redirect.

#### Getting a refresh token

`refreshToken` comes from signing in once through Pricefx's OAuth 2.0 consent screen for the client you just registered, and approving access. That sign-in step is interactive (it happens in a browser) and can't be automated by this connector, but it's a one-time setup step - the consent screen hands back a refresh token as part of the exchange, and that's the value you configure here.

Once you have a refresh token, the connector fetches and refreshes access tokens automatically - you never need to repeat that step.

### 4. External JWT Authentication

You can use a third-party JSON Web Token for authentication (for example, with Salesforce as the signer). As with SAML, no hard-coded per-user credentials are needed - instead, a system-to-system trust relationship is established using signed tokens.

#### Configuring the trust relationship

On the Pricefx side, go to **Administration > Configuration > System Configuration > Advanced Configuration Options** and add a per-partition configuration named `externalJWTConfiguration` with a value shaped like this:

```json
{
  "entries": {
    "<externalSystemName>": {
      "publicKey": "<public key used by the external system for signing, in PEM format>",
      "permissions": "<null, or a JSON list of permission-name strings>"
    }
  }
}
```

- **`externalSystemName`** - a JSON-safe name for the external system (letters, digits only - no whitespace). This is the same name you pass as `systemName` to the connector. You can register as many external systems as you like, each under its own name.
- **`publicKey`** - the external system's public key, as a PEM-formatted string. Pricefx only supports RSA keys.
- **`permissions`** - leave `null` (or omit it) to not further restrict permissions beyond what the authenticated user already has. If you provide a list of permission-name strings instead, a token issued under this configuration can only call endpoints whose required permission is in that list.

  :::caution
  The `permissions` list is only an additional filter, on top of the authenticated user's own permissions - it can't grant a user something they couldn't otherwise do. Use it to restrict a given trust relationship to a narrower set of API calls than the user would normally have access to.
  :::

Once the trust relationship is configured, give the connector two values: `systemName`, set to the name you registered above, and `jwt`, set to a JWT signed by that external system.

The connector automatically re-authenticates and retries once whenever a request comes back unauthenticated, so a long-lived client instance keeps working without manual re-initialization.

## Note your service URL

The connector connects to `https://<your-node>.pricefx.com/pricefx/<your-partition>` by default. Confirm your node and partition name with your Pricefx administrator if you're not sure.

## Next steps

- [Actions](action-reference.md) - Available operations
