---
title: Configure User Stores
---

# Configure User Stores

ICP supports three user store options:

| Option | When to use |
| ------ | ----------- |
| [**Built-in credentials database**](default-user-store.md) | Default. Users and hashed passwords managed locally by ICP. Supports H2 (embedded), PostgreSQL, MySQL, MSSQL, and Oracle. |
| [**LDAP**](ldap-user-store.md) | Authenticate against an existing Active Directory or OpenLDAP directory. Replaces the built-in credentials database, so local users (including `admin`) can no longer sign in. |
| [**SSO / OIDC**](sso-configuration.md) | Delegate authentication to an external identity provider (Asgardeo, Okta, Auth0, Azure AD, Keycloak, etc.). |

With SSO configured, you can also delegate *authorization* by mapping identity provider
group and role claims to ICP groups. See [SSO Group Mapping](sso-group-mapping.md).
