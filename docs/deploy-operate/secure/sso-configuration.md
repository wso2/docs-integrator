---
title: SSO Configuration
---

# Single Sign-On (SSO) Configuration

ICP supports Single Sign-On via OpenID Connect (OIDC), allowing users to authenticate through your organization's identity provider. SSO coexists with local username/password authentication — users can use either method.

## Prerequisites

Before configuring SSO in ICP, complete the following in your identity provider:

1. Register a new OIDC application (also called a "client" or "app registration").
2. Note the **Client ID** and **Client Secret** issued for the application.
3. Add the following **Redirect URI** to the allowed list:
   - Local/on-prem (distribution pack): `http://localhost:9446/auth/callback`
   - Production: `https://<your-icp-domain>/auth/callback`
4. Ensure the identity provider includes the following claims in the ID token:
   - `sub` — required
   - `email` or `preferred_username` — at least one is required
   - `name` — recommended (used for display names)

## Configuration

### Step 1: Collect OIDC Endpoints

Gather the following endpoint URLs from your identity provider. Most providers publish these under the [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html) document at `/.well-known/openid-configuration`.

| Endpoint | Description |
|----------|-------------|
| Issuer URL | Unique identifier for the authorization server |
| Authorization endpoint | Where ICP sends users to authenticate |
| Token endpoint | Where ICP exchanges the authorization code for tokens |
| End-session endpoint | Where ICP sends users to log out |

### Step 2: Update `Deployment.toml`

Locate `conf/Deployment.toml` under your WSO2 Integrator installation and add the following block, replacing the placeholder values with your identity provider's details.

The file is located at `<wso2_integrator_installation_path>/Contents/components/icp/conf/deployment.toml`

Default: `/Applications/WSO2 Integrator.app/Contents/components/icp/conf/deployment.toml`

The file is located at `<wso2_integrator_installation_path>\components\icp\conf\deployment.toml`

Default: `%USERPROFILE%\AppData\Wso2\Integrator\components\icp\conf\deployment.toml`

The file is located at `<wso2_integrator_installation_path>/components/icp/conf/deployment.toml`

Default: `/usr/share/wso2-integrator/components/icp/conf/deployment.toml`

Add the following SSO configuration to the file:

```toml
ssoEnabled = true
ssoIssuer = "https://your-provider.com"
ssoAuthorizationEndpoint = "https://your-provider.com/oauth2/authorize"
ssoTokenEndpoint = "https://your-provider.com/oauth2/token"
ssoLogoutEndpoint = "https://your-provider.com/oauth2/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

For production deployments, replace the redirect URI with your public domain (e.g. `https://icp.example.com/auth/callback`).

Restart the ICP server after saving changes.

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `ssoEnabled` | Set to `true` to activate SSO |
| `ssoIssuer` | Issuer URL from your identity provider |
| `ssoAuthorizationEndpoint` | Authorization endpoint URL |
| `ssoTokenEndpoint` | Token endpoint URL |
| `ssoLogoutEndpoint` | End-session endpoint URL |
| `ssoClientId` | Client ID from your identity provider |
| `ssoClientSecret` | Client secret from your identity provider |
| `ssoRedirectUri` | Redirect URI registered with your identity provider |
| `ssoUsernameClaim` | Claim to use as the ICP username: `email` or `preferred_username` |
| `ssoScopes` | OIDC scopes to request — `openid` is required |

## Provider-Specific Examples

### Asgardeo

```toml
ssoEnabled = true
ssoIssuer = "https://api.asgardeo.io/t/<org>/oauth2/token"
ssoAuthorizationEndpoint = "https://api.asgardeo.io/t/<org>/oauth2/authorize"
ssoTokenEndpoint = "https://api.asgardeo.io/t/<org>/oauth2/token"
ssoLogoutEndpoint = "https://api.asgardeo.io/t/<org>/oidc/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Okta

```toml
ssoEnabled = true
ssoIssuer = "https://<domain>.okta.com/oauth2/default"
ssoAuthorizationEndpoint = "https://<domain>.okta.com/oauth2/default/v1/authorize"
ssoTokenEndpoint = "https://<domain>.okta.com/oauth2/default/v1/token"
ssoLogoutEndpoint = "https://<domain>.okta.com/oauth2/default/v1/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Auth0

```toml
ssoEnabled = true
ssoIssuer = "https://<domain>.auth0.com/"
ssoAuthorizationEndpoint = "https://<domain>.auth0.com/authorize"
ssoTokenEndpoint = "https://<domain>.auth0.com/oauth/token"
ssoLogoutEndpoint = "https://<domain>.auth0.com/v2/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Microsoft Entra ID (Azure AD)

```toml
ssoEnabled = true
ssoIssuer = "https://login.microsoftonline.com/<tenant-id>/v2.0"
ssoAuthorizationEndpoint = "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/authorize"
ssoTokenEndpoint = "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token"
ssoLogoutEndpoint = "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Keycloak

```toml
ssoEnabled = true
ssoIssuer = "https://<keycloak-domain>/realms/<realm>"
ssoAuthorizationEndpoint = "https://<keycloak-domain>/realms/<realm>/protocol/openid-connect/auth"
ssoTokenEndpoint = "https://<keycloak-domain>/realms/<realm>/protocol/openid-connect/token"
ssoLogoutEndpoint = "https://<keycloak-domain>/realms/<realm>/protocol/openid-connect/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "http://localhost:9446/auth/callback"
ssoUsernameClaim = "preferred_username"
ssoScopes = ["openid", "email", "profile"]
```

## User Provisioning

When a user authenticates via SSO for the first time, ICP automatically creates a local account. The account username is taken from the claim specified in `ssoUsernameClaim`. The display name is resolved in the following order:

1. `name` claim
2. Local part of the `email` claim (before `@`)
3. `preferred_username` claim

After the account is created, an administrator must assign the appropriate roles and permissions before the user can access ICP resources.

## Security Considerations

**Protect the client secret** — do not commit it to version control. Use environment variables or a secrets manager and inject the value at deployment time.

**Use HTTPS in production** — `ssoRedirectUri` must use `https://` for production deployments. `http://localhost` is an accepted exception in OIDC for local testing, but plain HTTP should never be used with a public hostname.

**Redirect URI must match exactly** — the URI in `conf/Deployment.toml` must match the one registered with your identity provider character for character, including protocol, hostname, port (if non-standard), and path.

## Troubleshooting

### SSO button does not appear on the login page

Verify `ssoEnabled = true` in `conf/Deployment.toml` and that the server was restarted after the change. Check startup logs for configuration validation errors.

### `invalid_client` or `invalid_grant` error

The client ID or client secret is incorrect, or the identity provider application is inactive. Verify both values and confirm the application is enabled.

### Redirect URI mismatch error

The `ssoRedirectUri` in `conf/Deployment.toml` does not exactly match the redirect URI registered in your identity provider. Check for differences in protocol, hostname, port, and trailing slashes.

### User is missing required claims

The identity provider is not including `sub` and either `email` or `preferred_username` in the ID token. Configure your identity provider's application to include these claims, and verify `ssoUsernameClaim` matches a claim your provider returns.

### User authenticated successfully but has no access

The user account was created but has no assigned roles. An administrator must grant roles to the account in ICP before the user can access any resources.

## Frequently Asked Questions

**Can a user authenticate with both SSO and a local password?**
SSO and local password authentication are independent. If the same email address is used for both, they are treated as separate accounts. Users should use one method consistently.

**What happens if the identity provider is unavailable?**
SSO login will fail during an outage. Local password authentication (if enabled) remains unaffected.

**Can I enforce SSO-only login?**
Yes. Disable the local authentication backend to require all users to authenticate through the identity provider. Ensure at least one SSO-authenticated administrator account is in place before doing so.

**Can I configure more than one identity provider?**
ICP currently supports one OIDC provider per deployment.

**How do I rotate the client secret?**
Generate a new secret in your identity provider, update `ssoClientSecret` in `conf/Deployment.toml`, and restart the ICP server. Active user sessions are not affected.
