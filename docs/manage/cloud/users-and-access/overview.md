---
title: Users and Access
---

# Users and Access

WSO2 Cloud - Integration Platform gives you centralized control over who can access your organization and projects, what actions they can perform, and how they authenticate. You can define granular permissions using roles and groups, enforce organization-wide policies, and connect your existing enterprise identity provider so users sign in with familiar credentials.

## Access control

The platform uses three building blocks to control access:

| Concept | Description |
|---|---|
| **Role** | A collection of permissions. The platform ships with a predefined set of roles. |
| **Group** | A collection of users. Assign one or more roles to a group so its members inherit the corresponding permissions. |
| **Mapping level** | The scope at which a role-group mapping applies. Mappings can be set at the **Organization** level (applies across all projects) or at the **Project** level (applies to one project only). |

Authorization works by assigning a role to a group at a chosen mapping level. Organization-level permissions take precedence over project-level permissions.

## Enterprise login

If your organization uses an external identity provider (IdP), you can configure enterprise login so that users sign in to WSO2 Cloud with their existing corporate credentials. Once enterprise login is active, you can also configure role-based access control (RBAC) to map IdP groups to platform groups, ensuring users receive the right permissions automatically on sign-in.

## Configure external IdPs to authorize API access

When you secure an integration's endpoints with OAuth2, the platform needs to know which identity providers are trusted to issue access tokens. By connecting an external IdP, API consumers can obtain tokens from their own identity system (Asgardeo, Azure AD, or another OIDC-compatible provider) and use them to consume Integration as APIs running on WSO2 Cloud.

The platform validates the incoming token against the registered IdP's well-known endpoint, then checks whether the token carries the required scopes before granting access to a resource. You can restrict a registered IdP to specific environments if you need different providers in development and production.

## In this section

| Page | What it covers |
|---|---|
| [Control access](./access-control.md) | Create groups, assign roles at organization or project scope, and invite users. |
| [Configure enterprise login](./configure-enterprise-login.md) | Enable enterprise login for your organization and set up RBAC for external IdP users. |
| [Access APIs with an External IdP](./api-external-idp/overview.md) | Use external IdPs to access Integration as APIs with OAuth2. |
