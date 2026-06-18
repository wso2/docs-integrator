---
title: ICP Authentication API
description: REST API for authentication, token management, and RBAC (users, groups, roles) in the Integration Control Plane.
---

# ICP Authentication API

The ICP server exposes a REST authentication service at:

```bash
https://<icp-host>:9446/auth
```

Use these endpoints to obtain a JWT access token before calling the [Management API](management.md).

---

## Obtain a Token

### `POST /auth/login`

Authenticates a user with username and password. Returns a short-lived JWT access token and a long-lived refresh token.

**Request body:**

```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response `200 OK`:**

```json
{
  "userId": "usr-001",
  "token": "<jwt-access-token>",
  "expiresIn": 3600,
  "refreshToken": "<refresh-token>",
  "refreshTokenExpiresIn": 86400,
  "username": "admin",
  "displayName": "Administrator",
  "permissions": ["integration_mgt:view", "integration_mgt:manage"],
  "isOidcUser": false,
  "requirePasswordChange": false
}
```

| Field | Description |
|-------|-------------|
| `token` | JWT access token — include as `Authorization: Bearer <token>` on all API calls |
| `expiresIn` | Access token lifetime in seconds (default: `3600`) |
| `refreshToken` | Opaque token used to obtain a new access token without re-logging in |
| `refreshTokenExpiresIn` | Refresh token lifetime in seconds (default: `86400`) |
| `requirePasswordChange` | If `true`, the user must call `/auth/force-change-password` before doing other operations |

**Error responses:**

| Status | Meaning |
|--------|---------|
| `401` | Invalid credentials |
| `429` | Account locked out — check `Retry-After` header for seconds remaining |
| `500` | Authentication backend unavailable |

---

### `POST /auth/refresh-token`

Exchanges a refresh token for a new access token. Does **not** require an `Authorization` header.

**Request body:**

```json
{
  "refreshToken": "<refresh-token>"
}
```

**Response `200 OK`:**

```json
{
  "token": "<new-jwt-access-token>",
  "expiresIn": 3600,
  "refreshToken": "<new-or-same-refresh-token>",
  "refreshTokenExpiresIn": 86400,
  "username": "admin",
  "displayName": "Administrator",
  "permissions": ["integration_mgt:view", "integration_mgt:manage"]
}
```

When refresh token rotation is enabled (default), the old refresh token is revoked and a new one is returned.

---

### `POST /auth/login/oidc`

Exchanges an OIDC authorization code for an ICP access token. SSO must be configured and enabled.

**Request body:**

```json
{
  "code": "<oidc-authorization-code>"
}
```

**Response `200 OK`:** Same structure as `/auth/login`, with `"isOidcUser": true`. The `requirePasswordChange` field is omitted for OIDC users.

---

### `GET /auth/oidc/authorize-url`

Returns the OIDC authorization URL to redirect the user to for SSO login.

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | string | Optional CSRF state value to include in the redirect |

**Response `200 OK`:**

```json
{
  "authorizationUrl": "https://sso.example.com/authorize?client_id=...&state=..."
}
```

---

## Using the Token

Include the access token returned by `/auth/login` or `/auth/refresh-token` in all protected GraphQL and Auth API requests (unauthenticated endpoints such as `/auth/login`, `/auth/refresh-token`, and OIDC bootstrap calls do not require this header):

```bash
Authorization: Bearer <jwt-access-token>
```

The token is signed with HMAC-SHA256 and validated against:

- **Issuer**: `icp-frontend-jwt-issuer`
- **Audience**: `icp-server`

---

## Token & Password Management

All endpoints below require a valid `Authorization: Bearer <token>` header.

### `GET /auth/capabilities`

Returns the user management operations supported by the active user store (local vs LDAP).

**Response `200 OK`:**

```json
{
  "capabilities": ["authenticate", "password_change", "password_reset", "unlock_account", "create"]
}
```

LDAP-backed deployments return only `["authenticate"]`.

---

### `POST /auth/change-password`

Changes the authenticated user's password.

**Request body:**

```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

**Response `200 OK`:** `{ "message": "Password changed successfully" }`

---

### `POST /auth/force-change-password`

Sets a new password without supplying the current password. Only available when `requirePasswordChange` is `true` on the user account (set after an admin password reset).

**Request body:**

```json
{
  "newPassword": "new-password"
}
```

**Response `200 OK`:** `{ "message": "Password changed successfully" }`

---

### `POST /auth/revoke-token`

Revokes a specific refresh token (targeted logout) or all refresh tokens for the current user (logout from all devices).

**Request body (revoke a specific token):**

```json
{
  "refreshToken": "<refresh-token-to-revoke>"
}
```

**Request body (revoke all — omit `refreshToken`):**

```json
{}
```

**Response `200 OK`:** `{ "message": "Refresh token revoked successfully" }` or `{ "message": "All refresh tokens revoked successfully. You have been logged out from all devices." }`

---

## User Management

All endpoints require `Authorization: Bearer <token>`. Path parameter `{orgHandle}` is the organization's URL-safe identifier.

### `GET /auth/orgs/{orgHandle}/users`

Lists all users with their group memberships. Requires `user_mgt:manage_users` or `user_mgt:update_users` permission.

**Response `200 OK`:**

```json
{
  "users": [
    { "userId": "usr-001", "username": "admin", "displayName": "Administrator", "groups": [] }
  ],
  "count": 1
}
```

### `GET /auth/orgs/{orgHandle}/users/{userId}`

Returns details for the specified user. Users may only fetch their own details.

### `POST /auth/orgs/{orgHandle}/users`

Creates a new user. Requires `user_mgt:manage_users` permission.

**Request body:**

```json
{
  "username": "jdoe",
  "password": "initial-password",
  "displayName": "Jane Doe",
  "groupIds": ["grp-001"]
}
```

Username must match `^[a-zA-Z0-9_.]+$`.

**Response `201 Created`:** Created user object.

### `DELETE /auth/orgs/{orgHandle}/users/{userId}`

Deletes a user. Cannot delete the system administrator or your own account. Requires `user_mgt:manage_users`.

**Response `204 No Content`.**

### `POST /auth/orgs/{orgHandle}/users/{userId}/reset-password`

Admin-initiated password reset. Generates a new temporary password, sets `requirePasswordChange = true`, and revokes all existing sessions. Requires `user_mgt:manage_users`.

**Response `200 OK`:** Returns the generated temporary password — shown once.

### `POST /auth/orgs/{orgHandle}/users/{userId}/revoke-tokens`

Revokes all active sessions for a user (admin action). Cannot be used on your own account. Requires `user_mgt:manage_users`.

**Response `200 OK`:** `{ "message": "All sessions revoked successfully" }`

### `POST /auth/orgs/{orgHandle}/users/{userId}/unlock-account`

Unlocks an account locked by failed login attempts. Requires `user_mgt:manage_users`.

**Response `200 OK`:** `{ "message": "Account unlocked successfully" }`

### `GET /auth/orgs/{orgHandle}/users/{userId}/permissions`

Returns the effective permissions for a user at a given scope. Users may fetch their own; admins may fetch any user.

**Query parameters:** `projectId`, `integrationId`, `environmentId` (all optional, narrow the scope).

**Response `200 OK`:**

```json
{
  "userId": "usr-001",
  "scope": { "orgUuid": "org-uuid-001", "projectUuid": "proj-abc" },
  "permissions": [],
  "permissionNames": ["integration_mgt:view", "integration_mgt:manage"]
}
```

`orgUuid` is a string UUID.

### `PUT /auth/orgs/{orgHandle}/users/{userId}/groups`

Replaces the user's group memberships with the provided list (adds missing, removes extra). Requires `user_mgt:manage_groups`, `user_mgt:update_users`, or `user_mgt:manage_users`.

**Request body:**

```json
{ "groupIds": ["grp-001", "grp-002"] }
```

---

## Group Management

### `GET /auth/orgs/{orgHandle}/groups`

Lists all groups with member and role counts.

**Query parameters:** `projectId`, `integrationId` (optional scope filters).

### `POST /auth/orgs/{orgHandle}/groups`

Creates a new group. Requires `user_mgt:manage_groups`.

**Request body:**

```json
{
  "groupName": "Dev Team",
  "description": "Development team members"
}
```

**Response `201 Created`:** Created group object. Returns `409 Conflict` if the name already exists.

### `GET /auth/orgs/{orgHandle}/groups/{groupId}`

Returns details for a specific group.

### `PUT /auth/orgs/{orgHandle}/groups/{groupId}`

Updates a group's name or description. Requires `user_mgt:manage_groups`.

### `DELETE /auth/orgs/{orgHandle}/groups/{groupId}`

Deletes a group. Fails with `409 Conflict` if the group has role mappings; fails with `403 Forbidden` for the built-in Super Admins group. Requires `user_mgt:manage_groups`.

### `POST /auth/orgs/{orgHandle}/groups/{groupId}/users`

Adds users to a group. Requires `user_mgt:manage_groups`, `user_mgt:update_users`, or `user_mgt:manage_users`.

**Request body:**

```json
{ "userIds": ["usr-001", "usr-002"] }
```

### `GET /auth/orgs/{orgHandle}/groups/{groupId}/users`

Returns the list of users in a group.

### `DELETE /auth/orgs/{orgHandle}/groups/{groupId}/users/{userId}`

Removes a single user from a group.

### `POST /auth/orgs/{orgHandle}/groups/{groupId}/roles`

Assigns one or more roles to a group at a specified scope. Requires appropriate permissions at the target scope level.

**Request body:**

```json
{
  "roleIds": ["role-001"],
  "orgUuid": "org-uuid-001",
  "projectUuid": "proj-abc",
  "envUuid": "env-001",
  "integrationUuid": "comp-xyz"
}
```

Omit `projectUuid`, `envUuid`, and `integrationUuid` for org-level assignments.

### `GET /auth/orgs/{orgHandle}/groups/{groupId}/roles`

Lists all role assignments for a group, enriched with role names and scope details.

**Query parameters:** `projectId`, `integrationId` (optional scope filters).

### `DELETE /auth/orgs/{orgHandle}/groups/{groupId}/roles/{mappingId}`

Removes a role mapping from a group. The org-level Super Admin role cannot be removed from the Super Admins group. Requires appropriate permissions at the mapping's scope.

---

## Role Management

### `GET /auth/orgs/{orgHandle}/roles`

Lists all roles with group-assignment counts. Requires role management or integration/project management permissions.

**Query parameters:** `projectId`, `integrationId` (optional scope filters).

### `POST /auth/orgs/{orgHandle}/roles`

Creates a new role with optional permission assignments. Requires `user_mgt:manage_roles`.

**Request body:**

```json
{
  "roleName": "Deployment Manager",
  "description": "Can deploy integrations",
  "permissionIds": ["perm-001", "perm-002"]
}
```

**Response `201 Created`:** Created role object.

### `GET /auth/orgs/{orgHandle}/roles/{roleId}`

Returns role details including the full list of assigned permissions.

### `PUT /auth/orgs/{orgHandle}/roles/{roleId}`

Updates a role's name, description, and permission set. Providing `permissionIds` performs a full replace (adds missing, removes extras). Requires `user_mgt:manage_roles`.

### `DELETE /auth/orgs/{orgHandle}/roles/{roleId}`

Deletes a role. Fails with `409 Conflict` if the role is still assigned to any group. Requires `user_mgt:manage_roles`.

### `GET /auth/orgs/{orgHandle}/roles/{roleId}/groups`

Lists all groups that have this role assigned, enriched with scope and group metadata.

---

## Permissions

### `GET /auth/permissions`

Returns all available system permissions grouped by domain. Accessible to any authenticated user.

**Response `200 OK`:**

```json
{
  "permissions": [
    { "permissionId": "perm-001", "permissionName": "integration_mgt:view", "permissionDomain": "integration_mgt" }
  ],
  "groupedByDomain": {
    "integration_mgt": [],
    "environment_mgt": [],
    "project_mgt": [],
    "user_mgt": []
  }
}
```
