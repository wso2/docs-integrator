---
title: SSO Configuration
---

# SSO Configuration

ICP supports Single Sign-On via OpenID Connect (OIDC), allowing users to authenticate through your organization's identity provider. SSO coexists with local username/password authentication. Users can use either method.

:::info Prerequisites
Before configuring SSO in ICP, complete the following in your identity provider:

1. Register a new OIDC application (also called a "client" or "app registration").
2. Note the **Client ID** and **Client Secret** issued for the application.
3. Add the following **Redirect URI** to the allowed list:
   - Local/on-prem (distribution pack): `https://localhost:9446/sso/callback`
   - Production: `https://<your-icp-domain>/sso/callback`
4. Add the ICP login page as an allowed **post-logout redirect URI** (some providers call this a sign-out redirect URI or an allowed logout URL):
   - Local/on-prem (distribution pack): `https://localhost:9446/login`
   - Production: `https://<your-icp-domain>/login`
5. Ensure the identity provider includes the following claims in the ID token:
   - `sub` (required)
   - `email` or `preferred_username` (at least one required)
   - `name` (recommended, used for display names)

## Step 1: Collect OIDC Endpoints

Gather the following endpoint URLs from your identity provider. Most providers publish these under the [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html) document at `/.well-known/openid-configuration`.

| Endpoint | Description |
|----------|-------------|
| Issuer URL | Unique identifier for the authorization server |
| Authorization endpoint | Where ICP sends users to authenticate |
| Token endpoint | Where ICP exchanges the authorization code for tokens |
| End-session endpoint | Where ICP sends users on sign out to end their identity provider session |

## Step 2: Update `deployment.toml`

Locate `conf/deployment.toml` under your WSO2 Integrator installation:

| OS | Default path |
|----|-------------|
| macOS | `/Applications/WSO2 Integrator.app/Contents/components/icp/conf/deployment.toml` |
| Windows | `%USERPROFILE%\AppData\Local\Programs\WSO2\Integrator\components\icp\conf\deployment.toml` |
| Linux | `/usr/share/wso2-integrator/components/icp/conf/deployment.toml` |

Add the following SSO configuration to the file, replacing the placeholder values with your identity provider's details:

```toml
ssoEnabled = true
ssoIssuer = "https://your-provider.com"
ssoAuthorizationEndpoint = "https://your-provider.com/oauth2/authorize"
ssoTokenEndpoint = "https://your-provider.com/oauth2/token"
ssoLogoutEndpoint = "https://your-provider.com/oauth2/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "https://localhost:9446/sso/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

For production deployments, replace the redirect URI with your public domain (e.g. `https://icp.example.com/sso/callback`).

Restart the ICP server after saving changes.

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `ssoEnabled` | Set to `true` to activate SSO |
| `ssoIssuer` | Issuer URL from your identity provider |
| `ssoAuthorizationEndpoint` | Authorization endpoint URL |
| `ssoTokenEndpoint` | Token endpoint URL |
| `ssoLogoutEndpoint` | End-session endpoint URL. Required when SSO is enabled. ICP uses it to end the identity provider session when a user signs out. See [Sign out](#sign-out). |
| `ssoClientId` | Client ID from your identity provider |
| `ssoClientSecret` | Client secret from your identity provider |
| `ssoRedirectUri` | Redirect URI registered with your identity provider |
| `ssoUsernameClaim` | Claim to use as the ICP username: `email` or `preferred_username` |
| `ssoScopes` | OIDC scopes to request. `openid` is required. |

## Provider-specific examples

### Asgardeo

```toml
ssoEnabled = true
ssoIssuer = "https://api.asgardeo.io/t/<org>/oauth2/token"
ssoAuthorizationEndpoint = "https://api.asgardeo.io/t/<org>/oauth2/authorize"
ssoTokenEndpoint = "https://api.asgardeo.io/t/<org>/oauth2/token"
ssoLogoutEndpoint = "https://api.asgardeo.io/t/<org>/oidc/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "https://localhost:9446/sso/callback"
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
ssoRedirectUri = "https://localhost:9446/sso/callback"
ssoUsernameClaim = "email"
ssoScopes = ["openid", "email", "profile"]
```

### Auth0

```toml
ssoEnabled = true
ssoIssuer = "https://<domain>.auth0.com/"
ssoAuthorizationEndpoint = "https://<domain>.auth0.com/authorize"
ssoTokenEndpoint = "https://<domain>.auth0.com/oauth/token"
ssoLogoutEndpoint = "https://<domain>.auth0.com/oidc/logout"
ssoClientId = "your-client-id"
ssoClientSecret = "your-client-secret"
ssoRedirectUri = "https://localhost:9446/sso/callback"
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
ssoRedirectUri = "https://localhost:9446/sso/callback"
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
ssoRedirectUri = "https://localhost:9446/sso/callback"
ssoUsernameClaim = "preferred_username"
ssoScopes = ["openid", "email", "profile"]
```

## User provisioning

When a user authenticates via SSO for the first time, ICP automatically creates a local account. The account username is taken from the claim specified in `ssoUsernameClaim`. The display name is resolved in the following order:

1. `name` claim
2. Local part of the `email` claim (before `@`)
3. `preferred_username` claim

After the account is created, an administrator must assign the appropriate roles and permissions before the user can access ICP resources. See [Access Control](../access-control.md).

To assign groups automatically from your identity provider instead of by hand, see [SSO Group Mapping](sso-group-mapping.md).

## Sign out

When a user who signed in with SSO signs out, ICP ends both the ICP session and the identity provider session, using [OpenID Connect RP-initiated logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html):

1. ICP revokes the user's ICP session.
2. The browser is redirected to `ssoLogoutEndpoint` with the `id_token_hint`, `client_id`, and `post_logout_redirect_uri` parameters.
3. The identity provider ends its session and redirects the browser back to the ICP login page.

The next **Sign in with SSO** then prompts for credentials again, instead of silently resuming the previous identity provider session. This matters on shared machines, and especially when password login is disabled and SSO is the only way in.

ICP derives the post-logout redirect URI from the origin of `ssoRedirectUri`, followed by `/login`. For example, `ssoRedirectUri = "https://icp.example.com/sso/callback"` results in `https://icp.example.com/login`. No extra configuration is needed in ICP, but the identity provider must allow this URI, as described in the prerequisites at the top of this page.

Users who sign in with a local password are not affected. Signing out revokes their ICP session and returns them to the login page, as before.

## Security notes

- **Protect the client secret** — do not commit it to version control. Use environment variables or a secrets manager and inject the value at deployment time.
- **Use HTTPS** — ICP serves the console over HTTPS by default, so `ssoRedirectUri` uses `https://` for local installations as well as production. If you have explicitly disabled TLS, `http://localhost` is an accepted exception in OIDC for local testing, but plain HTTP should never be used with a public hostname.
- **Redirect URI must match exactly** — the URI in `conf/deployment.toml` must match the one registered with your identity provider character for character, including protocol, hostname, port (if non-standard), and path.
- **Post-logout redirect is fixed** — ICP builds the post-logout redirect URI from the origin of `ssoRedirectUri` and never from request input, so it cannot be used as an open redirect.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| SSO button does not appear on the login page | `ssoEnabled` is not `true`, or the server was not restarted | Set `ssoEnabled = true` in `conf/deployment.toml` and restart ICP. Check startup logs for configuration errors. |
| `invalid_client` or `invalid_grant` error | Incorrect client ID or secret, or the IdP application is inactive | Verify both values and confirm the application is enabled in your identity provider. |
| Redirect URI mismatch error | `ssoRedirectUri` does not exactly match the URI registered in the identity provider | Check for differences in protocol, hostname, port, and trailing slashes. |
| User is missing required claims | The identity provider is not including `sub` and `email` or `preferred_username` in the ID token | Configure your identity provider to include these claims. Verify `ssoUsernameClaim` matches a claim your provider returns. |
| ICP fails to start with `SSO is enabled but 'ssoLogoutEndpoint' is not configured` | `ssoEnabled` is `true` but `ssoLogoutEndpoint` is empty | Set `ssoLogoutEndpoint` to your identity provider's end-session endpoint and restart ICP. |
| The identity provider shows an error such as an invalid or unregistered post-logout redirect URI after signing out | The ICP login page is not registered as an allowed post-logout redirect URI | Register `<origin of ssoRedirectUri>/login` (for example, `https://localhost:9446/login`) in your identity provider. |
| After signing out, **Sign in with SSO** goes straight into ICP without asking for credentials | The identity provider session was not ended. Either the end-session endpoint could not be reached, in which case ICP clears its own session and returns to the login page, or `ssoLogoutEndpoint` does not point to the provider's OIDC end-session endpoint | Confirm that `ssoLogoutEndpoint` matches the `end_session_endpoint` value in your provider's `/.well-known/openid-configuration` document, and that the provider is reachable from the browser. |
| User authenticated successfully but has no access | User account was created but has no assigned roles | An administrator must grant roles to the account in ICP. See [Access Control](../access-control.md). |

## Frequently asked questions

**Can a user authenticate with both SSO and a local password?**
SSO and local password authentication are independent. If the same email address is used for both, they are treated as separate accounts. Users should use one method consistently.

**What happens if the identity provider is unavailable?**
SSO login will fail during an outage. Local password authentication (if enabled) remains unaffected.

**Can I enforce SSO-only login?**
Yes. Set `passwordLoginDisabled = true` to require all users to authenticate through the identity provider. This also requires `ssoAdminClaim` and at least one `ssoAdminValues` entry, so that an administrator can still sign in. See [SSO Group Mapping](sso-group-mapping.md).

**Does signing out of ICP also sign me out of the identity provider?**
Yes, for users who signed in with SSO. ICP ends the identity provider session through `ssoLogoutEndpoint`, so the next SSO sign-in asks for credentials again. Other applications that share the same identity provider session may also be signed out, depending on how your provider handles sessions. See [Sign out](#sign-out).

**Can I configure more than one identity provider?**
ICP currently supports one OIDC provider per deployment.

**How do I rotate the client secret?**
Generate a new secret in your identity provider, update `ssoClientSecret` in `conf/deployment.toml`, and restart the ICP server. Active user sessions are not affected.
