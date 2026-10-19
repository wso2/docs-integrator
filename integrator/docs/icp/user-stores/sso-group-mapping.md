---
title: SSO Group Mapping
---

# SSO Group Mapping

By default, users who sign in through SSO are created in ICP with no access, and an
administrator assigns their groups by hand. SSO group mapping removes that step: you
map a group or role value from your identity provider to an ICP group, and every user
carrying that claim is placed in the group automatically on each login.

ICP remains the source of what a group can do. The identity provider decides **which
groups a user belongs to**; the role-to-group mappings you already manage in
[Access Control](../access-control.md) decide **what those groups grant** and at which
scope. Mapping a claim to a group never widens the group's own permissions.

:::info Prerequisites

1. SSO is already configured and working. See [SSO Configuration](sso-configuration.md).
2. Your identity provider issues a group or role claim in the **ID token**, as an array
   of strings — for example `"groups": ["platform-admins", "developers"]`.
3. The scope that carries the claim is requested in `ssoScopes`. Most providers need
   `groups` added:
   ```toml
   ssoScopes = ["openid", "email", "profile", "groups"]
   ```
4. You know the exact claim values your provider sends. Decode a token locally, or
   check the claim configuration in your identity provider, rather than assuming —
   values are case-sensitive and must match exactly. An ID token carries identity and
   group claims and may still be valid, so do not paste one into a third-party decoder.

## Upgrading an existing deployment

This feature adds tables and views to the ICP database. **Fresh installations need nothing
— the schema is already complete.** If you upgraded an ICP instance that was installed
before this release, apply the SSO group mapping update once against the main ICP
database:

| Engine | Script |
|--------|--------|
| H2 | `add_sso_group_mapping_tables_h2.sql` |
| MySQL / MariaDB | `add_sso_group_mapping_tables_mysql.sql` |
| PostgreSQL | `add_sso_group_mapping_tables_postgresql.sql` |
| Microsoft SQL Server | `add_sso_group_mapping_tables_mssql.sql` |
| Oracle (19c+) | `add_sso_group_mapping_tables_oracle.sql` |

The scripts ship under `resources/db/migration-scripts` in the ICP component directory and
are safe to re-run. Restart ICP afterwards.

:::warning Required for SSO even if you never create a mapping
Every SSO login reads these tables to work out which memberships to add or remove, so an
empty mapping list still needs them to exist. Until the update is applied, SSO login fails
with:

> This update adds new SSO capabilities that need a one-time update to the ICP database.
> Update the database and restart ICP to continue using SSO.

Local username/password login is unaffected, so an administrator can still sign in that way
to apply the fix — provided `passwordLoginDisabled` is not set.

## Step 1: Bootstrap a super administrator

Before mappings exist, someone has to be able to sign in and create them. ICP grants
Super Admin to any SSO user whose token contains a configured claim value.

Add the following to `conf/deployment.toml` alongside your existing SSO settings:

```toml
ssoAdminClaim = "groups"
ssoAdminValues = ["icp-platform-admins"]
```

Restart the ICP server. When a user whose token contains `icp-platform-admins` signs in,
they are added to the built-in **Super Admins** group.

:::warning The super admin grant is permanent
This grant is written as a local membership and is deliberately **not** removed if the
user later loses the claim. It is the recovery path for an SSO-only deployment, so it
can only be revoked by another Super Admin removing the membership in ICP.

## Step 2: Create the ICP groups and roles

Mappings target groups that already exist. For each group of users you want to manage
from the identity provider:

1. Go to **Access Control → Roles** and create a role with the permissions you need, or
   reuse a default role.
2. Go to **Access Control → Groups** and create the group.
3. Open the group and assign the role, choosing the scope it applies to —
   organization, a project, or a single integration.

This is ordinary access control, unchanged by this feature. See
[Access Control](../access-control.md) for the model and worked examples.

:::tip Scope belongs to the role assignment
If a team should only reach one project, scope the **role-to-group mapping** to that
project. The SSO mapping you create in the next step does not narrow access on its own.

## Step 3: Map identity provider claims to ICP groups

The **SSO Mappings** tab appears under Access Control whenever SSO is enabled.

1. Go to **Access Control → SSO Mappings** and click **Create Mapping**.
2. Complete the dialog:

   | Field | Description |
   |-------|-------------|
   | **Issuer** | Pre-filled from your SSO configuration. Must match the `iss` claim in the ID token exactly. |
   | **Claim name** | The claim carrying group membership. Defaults to `groups`. |
   | **IdP group or role value** | The value as your provider sends it, for example `developers`. Case-sensitive. |
   | **ICP group** | The group to place matching users in. |

3. Click **Create**.

The mapping applies on each user's next sign-in. Existing sessions are not affected
until the user signs in again.

### Example

An identity provider sends `"groups": ["france-eng"]` for the France engineering team,
and they should get the `Engineers` role on the `France` project only:

1. Create the role `Engineers` with the permissions the team needs.
2. Create the group `France Engineers` and assign `Engineers` to it, **scoped to the
   France project**.
3. Create an SSO mapping: claim name `groups`, value `france-eng`, ICP group
   `France Engineers`.

Members of `france-eng` now receive access to the France project, and nothing else.

### Nested claims

Claim names support dotted paths, for providers that nest group information:

| Provider style | Claim name to enter |
|----------------|---------------------|
| Flat array | `groups` |
| Keycloak realm roles | `realm_access.roles` |
| Keycloak client roles | `resource_access.<client-id>.roles` |

A claim that is a single string rather than an array is accepted and treated as one
value.

## How memberships are kept in sync

Each time a user signs in through SSO, ICP reconciles their mapped memberships:

- A claim value that matches a mapping **adds** the user to the mapped group.
- A claim value that is no longer present **removes** the membership it created.
- Claim values with no matching mapping are ignored.
- Memberships an administrator added by hand are never touched.

Because reconciliation happens at login, removing a claim in the identity provider takes
effect the next time that user signs in. Deleting a mapping in ICP revokes the
memberships it created immediately.

### Membership badges

Group membership lists show where each membership came from:

| Badge | Meaning |
|-------|---------|
| **Local** | Added by an administrator in ICP |
| **SSO** | Created by a mapping. Read-only — remove the mapping or the claim to revoke it. |
| **Local + SSO** | Both. Removing the local membership leaves the SSO one in place. |

### Mappings are immutable

A mapping is created and deleted, never edited — the same as role-to-group mappings.
To change an issuer, claim, value, or target group, delete the mapping and create a new
one. There is no enable/disable toggle; a mapping either exists and applies, or it does
not.

## Managing mappings at project and integration level

The SSO Mappings tab is also available under a project's or an integration's
**Settings → Access Control**, so teams that administer their own project can manage the
mappings relevant to them without organization-wide permissions.

Every tab lists **all** mappings with the scope each was created at, but create and
delete controls are offered only for mappings belonging to the current level.

:::warning A mapping's scope is administrative
The level a mapping is created at records **where it is administered**. It does not
limit the access the mapping grants — that comes entirely from the target group's
role assignments. A mapping created inside a project, pointing at a group whose role is
assigned organization-wide, grants organization-wide access.

To limit a team to one project, scope the **role-to-group mapping** (Step 2), not the
SSO mapping.

Groups and roles remain organization-level objects, so the shortcut for creating a new
group from the mapping dialog appears at organization level only. The group dropdown
always lists every group in the organization.

## Optional: hand all membership to the identity provider

In the default setup, SSO mappings and manual group assignment coexist: an administrator
can still add users to groups in ICP. To make the identity provider the only source of
group membership, enable federated access control:

```toml
passwordLoginDisabled = true
federatedAccessControlEnabled = true
```

`federatedAccessControlEnabled` requires `passwordLoginDisabled = true`. Combining
federated access control with local password login is not supported, and the server
refuses to start in that combination.

The three supported states are:

| `passwordLoginDisabled` | `federatedAccessControlEnabled` | Behaviour |
|---|---|---|
| `false` | `false` | Password and SSO login. Administrators assign groups; SSO mappings also apply if any exist. |
| `true` | `false` | SSO login only. Administrators assign groups; SSO mappings also apply if any exist. |
| `true` | `true` | SSO login only. Group membership comes from the identity provider, and a user with no mapped access cannot sign in. |

When federated access control is enabled:

- **A user whose claims grant no access cannot sign in.** Because the identity provider
  is the only source of membership, having no mapped group means having no reason to
  hold a session. The user authenticates against the identity provider, then ICP refuses
  the login with a message telling them to contact their administrator. Their ICP user
  record is still created, so an administrator can see them under
  **Access Control → Users** and map their claims.
- Adding a user to a group by hand is blocked, in the UI and through the API.
- **Removing** a membership by hand is still allowed, so a stale Super Admin can be
  revoked and pre-existing local memberships cleaned up.
- Creating an ICP user by hand is blocked; users are provisioned by signing in.
- Creating groups, roles, and role assignments is unchanged. ICP stays the source of
  permissions.
- The Super Admin bootstrap from Step 1 still works — it is exempt from the guard, which
  is what lets the first administrator in before any mapping exists.

A user placed in a group that has no role assignments is refused for the same reason: a
membership that grants nothing is not access.

:::warning Turning the flag off does not disable mappings
`federatedAccessControlEnabled` controls who may assign membership; it does not switch
mappings off. Existing mappings keep applying at login in every mode. To stop a mapping
applying, delete it.

## Configuration parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `ssoAdminClaim` | Claim used to identify super administrators. Supports dotted paths. | `""` |
| `ssoAdminValues` | Claim values that grant Super Admin on login. | `[]` |
| `passwordLoginDisabled` | Disable local username/password login. | `false` |
| `federatedAccessControlEnabled` | Manage group membership from claims only. Requires both `ssoEnabled` and `passwordLoginDisabled` to be `true`. | `false` |

ICP validates these at startup and refuses to start with a clear error if the
combination is invalid — for example `passwordLoginDisabled = true` without
`ssoEnabled`, or without a non-empty `ssoAdminClaim` and at least one `ssoAdminValues`
entry.

## Security notes

- **Check what a group grants before mapping to it.** A mapping hands every user with
  that claim whatever the group's roles allow. Review the group's role assignments
  first, especially before mapping onto `Super Admins`.
- **Keep the issuer exact.** A mapping only applies when its issuer matches the `iss`
  claim in the validated token, which prevents a mapping being satisfied by a different
  provider.
- **Revocation happens at login.** Removing a user's claim in the identity provider does
  not end an active ICP session. To cut off access immediately, delete the mapping,
  which revokes the memberships it created.
- **Keep a recovery path before enabling SSO-only mode.** Confirm that at least one
  administrator can sign in through SSO and holds Super Admin before setting
  `passwordLoginDisabled = true`. With `federatedAccessControlEnabled = true` this is
  essential: users with no mapped access are refused, so if nobody carries a value from
  `ssoAdminValues` and no mapping grants an administrative group, nobody can get in.

  To recover from a lockout, edit `conf/deployment.toml` to set
  `federatedAccessControlEnabled = false` (and `passwordLoginDisabled = false` if
  required), restart ICP, sign in, correct the configuration or mappings, then re-enable
  the flags.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| SSO login fails with "This update adds new SSO capabilities that need a one-time update to the ICP database" | ICP was upgraded without applying the SSO database update | Apply the SSO group mapping migration script for your database engine and restart ICP. See [below](#upgrading-an-existing-deployment). |
| SSO Mappings tab is not visible | SSO is not enabled | Set `ssoEnabled = true` in `conf/deployment.toml` and restart ICP. |
| User signs in but gets no group | The claim value does not match the mapping | Inspect the ID token and compare the value character for character. Matching is case-sensitive. |
| User signs in but gets no group, value looks right | The claim is not in the ID token | Add the scope carrying the claim to `ssoScopes` and confirm the provider releases it to this application. |
| Mapping exists but never applies | The mapping's issuer differs from the token's `iss` | Delete the mapping and create it with the issuer exactly as it appears in the token. |
| Membership is not removed after removing the claim | The user has not signed in again, or the membership is **Local** | Have the user sign in again. If the badge shows **Local**, remove it in ICP. |
| Super Admin not granted | `ssoAdminClaim` / `ssoAdminValues` do not match the token | Verify both against a real ID token and confirm the built-in **Super Admins** group exists. |
| User is refused with "not authorized to access this instance" | Federated access control is enabled and no mapping matches the user's claims, or the mapped group has no role assigned | Create a mapping for one of the user's claim values, and confirm the target group has a role assigned. The user record already exists under **Access Control → Users**. |
| Everyone is refused after enabling federated access control | No mappings exist yet, and the administrator's access came from a local membership rather than the admin claim | Sign in as a user carrying `ssoAdminValues`. If nobody qualifies, follow the lockout recovery steps under [Security notes](#security-notes). |
| Cannot add a user to a group | Federated access control is enabled | Membership comes from the identity provider. Add the user to the mapped group there, or create a mapping. |
| Server does not start after config change | Invalid flag combination | Read the startup error — it names the offending key. `federatedAccessControlEnabled` requires `passwordLoginDisabled = true`. |

## Frequently asked questions

**Does this map identity provider roles to ICP roles?**
No. Claims map to ICP **groups**. Roles and their permissions stay in ICP, and the
group's role assignments determine what a mapped user can do.

**What happens to a user whose claims match no mapping?**
It depends on the mode. Without federated access control they sign in successfully but
hold no permissions and see no resources, which is what lets an administrator find them
under **Access Control → Users** and assign a group by hand. With
`federatedAccessControlEnabled = true` the login is refused, because there is no manual
assignment step to fall back on. Either way the ICP user record is created on first
sign-in.

**Can one claim value map to several groups?**
Yes. Create one mapping per target group. The user is placed in all of them.

**Can several claim values map to the same group?**
Yes. Any one of them places the user in the group.

**Can I map a claim to `Super Admins`?**
Technically yes, but prefer `ssoAdminClaim` / `ssoAdminValues` for administrators. That
grant is deliberate and permanent, whereas a mapping is revoked as soon as the claim or
mapping goes away — which can lock you out of an SSO-only deployment.

**Do I need to recreate mappings when a user joins the team?**
No. Mappings are per claim value, not per user. Adding the user to the group in your
identity provider is enough.

**Are existing manual memberships affected when I enable this?**
No. SSO sync only manages the memberships it created. Memberships added in ICP keep
their **Local** badge and are never removed by sync.
