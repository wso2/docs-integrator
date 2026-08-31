---
title: Configure Azure Active Directory as an External IdP
---

# Configure Azure Active Directory as an External IdP

Organizations that use Microsoft Azure Active Directory (Azure AD) for identity and access management can integrate it with WSO2 Cloud - Integration Platform to enable API access control. This uses API scopes to restrict API access to designated user groups.

This guide walks you through the steps to configure Azure AD as your external IdP in WSO2 Cloud.

## Prerequisites

Before you proceed, make sure you have the following:

- **An Azure Active Directory account.** If you do not have one, set up an Azure Active Directory account at [https://azure.microsoft.com](https://azure.microsoft.com/en-gb/).
- **Administrator rights to your WSO2 Cloud organization.** You need this to configure the Azure AD account in your organization.

## Add Azure Active Directory as an external IdP

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the top navigation, click your **Organization**.
3. In the left navigation menu under **Admin**, click **Settings**.
4. Click the **Application Security** tab, click **Identity Providers**, and then click **+ Identity Provider**.
5. Select **Microsoft Entra ID (Azure AD)** as the identity provider.
6. Enter a name and a description for the IdP.
7. To obtain the well-known URL of your Azure AD instance, go to your Azure account, navigate to **Azure Active Directory**, click **App registrations**, and then click **Endpoints**. Copy the URI listed under **OpenID Connect metadata document**.

    :::info
    Azure provides two versions of access tokens. By default, IdP applications use the v1 access token.

    - **For v1 tokens:** When entering the well-known URL, omit the `v2.0` path segment. For example, convert `https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration` to `https://login.microsoftonline.com/<tenant-id>/.well-known/openid-configuration`.
    - **For v2.0 tokens:** Update the IdP application manifest as described in the [Azure access tokens documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/access-tokens#token-formats).

    The version you choose determines the `iss` (issuer) claim in the tokens Azure issues: v1 tokens use `https://sts.windows.net/<tenant-id>/`, while v2.0 tokens use `https://login.microsoftonline.com/<tenant-id>/v2.0`. The well-known URL you enter here must correspond to the version your application actually issues. If it does not, the gateway cannot match the token to this IdP and API invocations fail with `401 Unauthorized`.
    :::

8. Leave the **Apply to all environments** checkbox selected. This allows tokens generated via this IdP to invoke APIs across all environments.

    :::note
    To restrict token use to specific environments, clear the **Apply to all environments** checkbox and select the required environments from the **Environments** list. Tokens issued by this IdP are only accepted in the environments you select here.
    :::

9. Click **Next**. The server endpoints are displayed. You can use these to implement and configure authentication for your application. Make a note of the **Issuer** value — you will need it to verify your configuration.
10. Click **Add**.

The IdP now appears in the **External Identity Providers** list.

## Enable the identity provider

Adding an IdP registers it, but the gateway only validates tokens against providers that are enabled.

1. On the **Identity Providers** page, find your new Azure AD provider in the **External Identity Providers** list.
2. Switch on the toggle in the **Status** column.

    :::caution
    The built-in identity provider is enabled by default. If you want API access to be governed solely by Azure AD, switch off the built-in provider as well, so that Azure AD is the only provider with an enabled status.
    :::

You have successfully configured Azure Active Directory as an external IdP in WSO2 Cloud.

## Verify the configuration

Follow these steps to confirm that tokens issued by Azure AD are accepted by the gateway.

### Step 1: Check the application credentials

1. In the Developer Portal, open the application you use to consume the API and go to **Manage Keys**.
2. Generate credentials for the relevant environment.
3. Under **Identity Provider Connection Data**, confirm that the **Token Endpoint** and **Authorize Endpoint** point to `login.microsoftonline.com` rather than the built-in provider. If they do not, the credentials were generated against a different IdP — regenerate them after enabling Azure AD.

### Step 2: Request an access token

The parameters for the client credentials grant differ depending on the token version you configured.

**For v1 tokens** (the Azure default), use the `resource` parameter:

```bash
curl -X POST "https://login.microsoftonline.com/<tenant-id>/oauth2/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=<consumer-key>" \
  -d "client_secret=<consumer-secret>" \
  -d "resource=api://<client-id>"
```

**For v2.0 tokens**, use the `scope` parameter with the `/.default` suffix:

```bash
curl -X POST "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=<consumer-key>" \
  -d "client_secret=<consumer-secret>" \
  -d "scope=api://<client-id>/.default"
```

In both cases, the resource is the Application ID URI of the app registration that exposes your API — not a Microsoft resource such as Microsoft Graph. Tokens issued for Microsoft resources cannot be validated by the gateway.

The token endpoint shown in the Developer Portal under **Identity Provider Connection Data** reflects the well-known URL you registered. Use that endpoint, and match the parameter style above to its version.

### Step 3: Inspect the token

Decode the resulting token and check that the `iss` claim matches the **Issuer** value shown when you added the IdP. A mismatch here is the most common cause of validation failures.

Also confirm that the `aud` claim is your own Application ID URI or client ID, rather than a Microsoft resource.

### Step 4: Invoke the API

```bash
curl -H "Authorization: Bearer <access-token>" "<api-endpoint>"
```

A successful response confirms that the gateway is validating tokens against your Azure AD configuration.

## Troubleshooting

### API invocations return 401 Unauthorized

The access token is issued successfully by Azure AD, but the gateway rejects it. The gateway validates the token by matching its `iss` claim against the issuer configured on the identity provider, and by verifying the signature against the Azure AD JWKS endpoint. Work through the following checks:

| Check | What to look for |
| --- | --- |
| **IdP status** | The Azure AD provider must have its **Status** toggle switched on. A registered but disabled provider is not used for validation. |
| **Issuer match** | Decode the token and compare its `iss` claim to the **Issuer** shown for the IdP. If you registered the v2.0 well-known URL but your app registration issues v1 tokens (the default), the issuers will not match. Either remove the `v2.0` segment from the well-known URL, or set `accessTokenAcceptedVersion` to `2` in the Azure application manifest. |
| **Audience** | The `aud` claim must be your own resource. If you requested a Microsoft resource such as `https://graph.microsoft.com/.default`, Azure issues a token intended for that resource, and its signature cannot be verified by the gateway. Expose an API on your app registration and request that Application ID URI instead. |
| **Environment scope** | If **Apply to all environments** was cleared, confirm that the environment you are invoking is among those selected for the IdP. |
| **Credential origin** | Credentials generated before the Azure AD IdP was enabled remain bound to the previous provider. Confirm the **Token Endpoint** under **Identity Provider Connection Data** points to Azure, and regenerate the credentials if it does not. |
| **Signing key** | Confirm that the `kid` in the token header appears in the JWKS document published at the IdP's JWKS endpoint. |

To narrow the problem down, invoke the same endpoint using an API key instead of the bearer token, keeping the request otherwise identical. If the API key call succeeds, the API deployment, subscription, and routing are all correct, and the issue is isolated to external IdP token validation. If the API key call also fails, the cause lies outside the identity configuration.

### API invocations return 403 Forbidden

The token is valid, but it does not carry the scopes required by the API. Confirm that the scopes are exposed on the Azure application registration, that they are requested when the token is issued, and that they are mapped to the API operations.

## What's next

- [Configure Asgardeo for API Access Control](./asgardeo.md) — Configure Asgardeo as an external IdP to consume APIs on WSO2 Cloud
