---
title: Configure User Stores
---

# Configure User Stores

ICP supports three user store options:

| Option | When to use |
| ------ | ----------- |
| [**Built-in credentials database**](default-user-store.md) | Default. Users and hashed passwords managed locally by ICP. Supports H2 (embedded), PostgreSQL, MySQL, and MSSQL. |
| [**LDAP**](ldap-user-store.md) | Authenticate against an existing Active Directory or OpenLDAP directory. |
| [**SSO / OIDC**](sso-configuration.md) | Delegate authentication to an external identity provider (Asgardeo, Okta, Auth0, Azure AD, Keycloak, etc.). |
