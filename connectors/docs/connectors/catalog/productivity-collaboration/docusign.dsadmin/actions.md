---
title: Actions
---

# Actions

The `ballerinax/docusign.dsadmin` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | DocuSign Admin API: organization, user, permission, group, export/import, and asset group management. |

---

## Client

DocuSign Admin API: organization, user, permission, group, export/import, and asset group management.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | OAuth 2.0 refresh token grant config or bearer token config for authentication. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | The maximum time to wait (in seconds) for a response before closing the connection. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS-related options. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enables inbound payload validation provided by the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding: nil values are treated as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/docusign.dsadmin;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

dsadmin:Client docuSignClient = check new (
    {
        auth: {
            clientId,
            clientSecret,
            refreshToken,
            refreshUrl
        }
    }
);
```

### Operations

#### Organization operations

<details>
<summary>Returns a list of organizations that the authenticated user belongs to</summary>

Retrieves the list of organizations the authenticated user is a member of.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional headers to be sent with the request. |
| `queries` | `OrganizationOrganizationGetListV2Queries` | No | Query parameters including optional `mode` filter. |

Returns: `OrganizationsResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationsResponse orgResponse = check docuSignClient->/v2/organizations();
```

Sample response:

```ballerina
{
  "organizations": [
    {
      "id": "8a311a1e-xxxx-xxxx-xxxx-aabbccddeeff",
      "name": "My Organization",
      "description": "Main org account",
      "default_account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
      "created_on": "2023-01-15T10:30:00.000Z"
    }
  ]
}
```

</details>

#### User management

<details>
<summary>Returns information about the users in an organization</summary>

Retrieves a list of users in the specified organization, with optional filters for email, account, status, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `queries` | `OrganizationUserOrganizationUsersGetV2Queries` | No | Query parameters including `email`, `accountId`, `status`, `start`, `take`, `membershipStatus`, etc. |

Returns: `OrganizationUsersResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationUsersResponse userInfo = check docuSignClient->/v2/organizations/[organizationId]/users(accountId = accountId, email = "user@example.com");
```

Sample response:

```ballerina
{
  "users": [
    {
      "id": "aaaa-bbbb-cccc-dddd",
      "user_name": "John Doe",
      "first_name": "John",
      "last_name": "Doe",
      "email": "user@example.com",
      "user_status": "active",
      "membership_status": "active"
    }
  ],
  "paging": {
    "result_set_size": 1,
    "result_set_start_position": 0,
    "total_set_size": 1
  }
}
```

</details>

<details>
<summary>Creates a new user</summary>

Creates a new user in the specified organization with the provided user details and account memberships.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `NewUserRequest` | Yes | The new user's details including userName, firstName, email, and account assignments. |

Returns: `NewUserResponse|error`

Sample code:

```ballerina
dsadmin:NewUserRequest newUserReq = {
    userName: "user1",
    firstName: "Jane",
    email: "jane@docusignmail.com",
    accounts: [
        {
            id: accountId,
            companyName: "Acme Corp"
        }
    ]
};
dsadmin:NewUserResponse newUser = check docuSignClient->/v2/organizations/[organizationId]/users.post(newUserReq);
```

Sample response:

```ballerina
{
  "id": "eeee-ffff-0000-1111",
  "user_name": "user1",
  "first_name": "Jane",
  "email": "jane@docusignmail.com",
  "language_culture": "en",
  "federated_status": "RemoveStatus",
  "accounts": [
    {
      "id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
      "company_name": "Acme Corp"
    }
  ]
}
```

</details>

<details>
<summary>Adds users to an account</summary>

Adds a user to a specific account within the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `NewAccountUserRequest` | Yes | The new account user request with user details. |

Returns: `NewUserResponse|error`

Sample code:

```ballerina
dsadmin:NewAccountUserRequest userReq = {
    userName: "user2",
    firstName: "Bob",
    email: "bob@docusignmail.com"
};
dsadmin:NewUserResponse addedUser = check docuSignClient->/v2/organizations/[organizationId]/accounts/[accountId]/users.post(userReq);
```

Sample response:

```ballerina
{
  "id": "2222-3333-4444-5555",
  "user_name": "user2",
  "first_name": "Bob",
  "email": "bob@docusignmail.com",
  "accounts": [
    {
      "id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
      "company_name": "Acme Corp"
    }
  ]
}
```

</details>

<details>
<summary>Updates a user's information</summary>

Updates profile information for one or more users in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `UpdateUsersRequest` | Yes | The update request containing a list of user updates. |

Returns: `UsersUpdateResponse|error`

Sample code:

```ballerina
dsadmin:UpdateUsersRequest updateReq = {
    users: [
        {
            id: userId,
            siteId: 1,
            userName: "Updated Name",
            firstName: "Updated",
            lastName: "User"
        }
    ]
};
dsadmin:UsersUpdateResponse updateResp = check docuSignClient->/v2/organizations/[organizationId]/users/profiles.post(updateReq);
```

Sample response:

```ballerina
{
  "success": true,
  "users": [
    {
      "id": "eeee-ffff-0000-1111",
      "status": "updated",
      "user_name": "Updated Name"
    }
  ]
}
```

</details>

<details>
<summary>Updates a user's email address</summary>

Changes the email address for one or more users in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `UpdateUsersEmailRequest` | Yes | The email update request containing a list of user email changes. |

Returns: `UsersUpdateResponse|error`

Sample code:

```ballerina
dsadmin:UpdateUsersEmailRequest emailReq = {
    users: [
        {
            id: userId,
            siteId: 1,
            newEmail: "newemail@example.com"
        }
    ]
};
dsadmin:UsersUpdateResponse emailResp = check docuSignClient->/v2/organizations/[organizationId]/users/email_addresses.post(emailReq);
```

Sample response:

```ballerina
{
  "success": true,
  "users": [
    {
      "id": "eeee-ffff-0000-1111",
      "status": "updated"
    }
  ]
}
```

</details>

<details>
<summary>Closes a user's memberships</summary>

Closes one or more of a user's account memberships in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `userId` | `string` | Yes | The user ID GUID. |
| `payload` | `DeleteMembershipsRequest` | Yes | The request specifying which account memberships to close. |

Returns: `DeleteMembershipsResponse|error`

Sample code:

```ballerina
dsadmin:DeleteMembershipsRequest deleteReq = {
    accounts: [
        {id: accountId}
    ]
};
dsadmin:DeleteMembershipsResponse deleteResp = check docuSignClient->/v2/organizations/[organizationId]/users/[userId]/accounts.delete(deleteReq);
```

Sample response:

```ballerina
{
  "success": true,
  "accounts": [
    {
      "id": "abcd1234-xxxx-xxxx-xxxx-000000000001"
    }
  ]
}
```

</details>

<details>
<summary>Activates user memberships</summary>

Force-activates a user's membership in the specified account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `userId` | `string` | Yes | The user ID GUID. |
| `membershipId` | `string` | Yes | The membership ID GUID. |
| `payload` | `ForceActivateMembershipRequest` | Yes | The activation request with site ID. |

Returns: `UpdateResponse|error`

Sample code:

```ballerina
dsadmin:ForceActivateMembershipRequest activateReq = {
    siteId: 1
};
dsadmin:UpdateResponse activateResp = check docuSignClient->/v2/organizations/[organizationId]/users/[userId]/memberships/[membershipId].post(activateReq);
```

Sample response:

```ballerina
{
  "status": "activated"
}
```

</details>

<details>
<summary>Returns historical information about users with a specific email address</summary>

Retrieves profile details for a user identified by email address within the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `queries` | `OrganizationUserOrganizationUsersGetProfileV2Queries` | No | Query parameters including `email`. |

Returns: `UsersDrilldownResponse|error`

Sample code:

```ballerina
dsadmin:UsersDrilldownResponse profile = check docuSignClient->/v2/organizations/[organizationId]/users/profile(email = "user@example.com");
```

Sample response:

```ballerina
{
  "users": [
    {
      "id": "eeee-ffff-0000-1111",
      "user_name": "John Doe",
      "user_status": "active",
      "first_name": "John",
      "last_name": "Doe",
      "email": "user@example.com",
      "default_account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001"
    }
  ]
}
```

</details>

<details>
<summary>Deletes user identities</summary>

Deletes one or more identities for a user in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `userId` | `string` | Yes | The user ID GUID. |
| `payload` | `DeleteUserIdentityRequest` | Yes | The identity deletion request specifying identities to remove. |

Returns: `DeleteResponse|error`

Sample code:

```ballerina
dsadmin:DeleteUserIdentityRequest identityReq = {
    identities: [
        {id: "identity-id-guid"}
    ]
};
dsadmin:DeleteResponse identityResp = check docuSignClient->/v2/organizations/[organizationId]/users/[userId]/identities.delete(identityReq);
```

Sample response:

```ballerina
{
  "success": true,
  "identities": [
    {
      "id": "identity-id-guid"
    }
  ]
}
```

</details>

#### Permissions & groups

<details>
<summary>Returns the list of permission profiles in an account</summary>

Retrieves all permission profiles available for the specified account in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |

Returns: `PermissionsResponse|error`

Sample code:

```ballerina
dsadmin:PermissionsResponse permissions = check docuSignClient->/v2/organizations/[organizationId]/accounts/[accountId]/permissions();
```

Sample response:

```ballerina
{
  "permissions": [
    {
      "permission_profile_id": "12345",
      "permission_profile_name": "DocuSign Sender"
    },
    {
      "permission_profile_id": "12346",
      "permission_profile_name": "Account Administrator"
    }
  ]
}
```

</details>

<details>
<summary>Returns the list of groups in an account</summary>

Retrieves the list of groups for a given account within the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `queries` | `AccountAccountsGetGroupsV2Queries` | No | Pagination parameters: `start`, `take`, `end`. |

Returns: `MemberGroupsResponse|error`

Sample code:

```ballerina
dsadmin:MemberGroupsResponse groups = check docuSignClient->/v2/organizations/[organizationId]/accounts/[accountId]/groups();
```

Sample response:

```ballerina
{
  "groups": [
    {
      "id": 101,
      "name": "Everyone",
      "type": "everyone_group"
    },
    {
      "id": 102,
      "name": "Managers",
      "type": "custom_group"
    }
  ]
}
```

</details>

#### User list export

<details>
<summary>Returns a list of pending and completed export requests</summary>

Retrieves all user list export requests for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `OrganizationExportsResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationExportsResponse exports = check docuSignClient->/v2/organizations/[organizationId]/exports/user_list();
```

Sample response:

```ballerina
{
  "exports": [
    {
      "id": "export-001-guid",
      "type": "organization_memberships_export",
      "status": "completed",
      "percent_completed": 100,
      "number_rows": 250,
      "created": "2024-01-15T10:30:00.000Z",
      "completed": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

</details>

<details>
<summary>Creates a user list export request</summary>

Creates a new export request to generate a list of users in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `OrganizationExportRequest` | Yes | The export request specifying the type and scope of the export. |

Returns: `OrganizationExportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationExportRequest exportReq = {
    'type: "organization_memberships_export"
};
dsadmin:OrganizationExportResponse exportResp = check docuSignClient->/v2/organizations/[organizationId]/exports/user_list.post(exportReq);
```

Sample response:

```ballerina
{
  "id": "export-002-guid",
  "type": "organization_memberships_export",
  "status": "queued",
  "percent_completed": 0,
  "created": "2024-03-01T08:00:00.000Z"
}
```

</details>

<details>
<summary>Returns the results for single user list export request</summary>

Retrieves the details and status of a specific user list export request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `exportId` | `string` | Yes | The export ID GUID. |

Returns: `OrganizationExportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationExportResponse exportDetail = check docuSignClient->/v2/organizations/[organizationId]/exports/user_list/[exportId]();
```

Sample response:

```ballerina
{
  "id": "export-001-guid",
  "type": "organization_memberships_export",
  "status": "completed",
  "percent_completed": 100,
  "number_rows": 250,
  "created": "2024-01-15T10:30:00.000Z",
  "completed": "2024-01-15T10:35:00.000Z",
  "success": true
}
```

</details>

<details>
<summary>Deletes a single user list export request</summary>

Deletes a specific user list export request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `exportId` | `string` | Yes | The export ID GUID. |

Returns: `record {}|error`

Sample code:

```ballerina
record {} deleteResult = check docuSignClient->/v2/organizations/[organizationId]/exports/user_list/[exportId].delete();
```

Sample response:

```ballerina
{}
```

</details>

#### Account settings export & import

<details>
<summary>Returns a list of pending and completed account settings export request</summary>

Retrieves all account settings export requests for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `OrganizationExportsResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationExportsResponse settingsExports = check docuSignClient->/v2/organizations/[organizationId]/exports/account_settings();
```

Sample response:

```ballerina
{
  "exports": [
    {
      "id": "settings-export-001",
      "type": "organization_account_settings_export",
      "status": "completed",
      "percent_completed": 100
    }
  ]
}
```

</details>

<details>
<summary>Creates a new account settings export request</summary>

Creates an export request for account settings across the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `OrganizationAccountsRequest` | Yes | The export request specifying accounts to export. |

Returns: `OrganizationExportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationAccountsRequest settingsExportReq = {
    accounts: [{accountId: accountId}]
};
dsadmin:OrganizationExportResponse settingsExportResp = check docuSignClient->/v2/organizations/[organizationId]/exports/account_settings.post(settingsExportReq);
```

Sample response:

```ballerina
{
  "id": "settings-export-002",
  "type": "organization_account_settings_export",
  "status": "queued",
  "percent_completed": 0,
  "created": "2024-03-01T08:00:00.000Z"
}
```

</details>

<details>
<summary>Returns the results for a single account settings export request</summary>

Retrieves details of a specific account settings export request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `exportId` | `string` | Yes | The export ID GUID. |

Returns: `OrganizationExportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationExportResponse settingsDetail = check docuSignClient->/v2/organizations/[organizationId]/exports/account_settings/[exportId]();
```

Sample response:

```ballerina
{
  "id": "settings-export-001",
  "type": "organization_account_settings_export",
  "status": "completed",
  "percent_completed": 100,
  "success": true
}
```

</details>

<details>
<summary>Deletes a single account settings export request</summary>

Deletes a specific account settings export request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `exportId` | `string` | Yes | The export ID GUID. |

Returns: `record {}|error`

Sample code:

```ballerina
record {} deleteSettingsExport = check docuSignClient->/v2/organizations/[organizationId]/exports/account_settings/[exportId].delete();
```

Sample response:

```ballerina
{}
```

</details>

<details>
<summary>Returns the details and metadata for Bulk Account Settings Import requests in the organization</summary>

Retrieves all account settings import requests for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `OrganizationAccountSettingsImportResponse[]|error`

Sample code:

```ballerina
dsadmin:OrganizationAccountSettingsImportResponse[] settingsImports = check docuSignClient->/v2/organizations/[organizationId]/imports/account_settings();
```

Sample response:

```ballerina
[
  {
    "id": "settings-import-001",
    "status": "completed",
    "number_processed_accounts": 5,
    "number_unprocessed_accounts": 0
  }
]
```

</details>

<details>
<summary>Creates a new account settings import request</summary>

Creates a new import request to apply account settings from a CSV file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `ImportsAccountSettingsBody` | Yes | Multipart body containing the CSV file with account settings. |

Returns: `OrganizationAccountSettingsImportResponse|error`

Sample code:

```ballerina
dsadmin:ImportsAccountSettingsBody importBody = {
    fileCsv: {fileContent: csvBytes, fileName: "settings.csv"}
};
dsadmin:OrganizationAccountSettingsImportResponse importResp = check docuSignClient->/v2/organizations/[organizationId]/imports/account_settings.post(importBody);
```

Sample response:

```ballerina
{
  "id": "settings-import-002",
  "status": "queued"
}
```

</details>

<details>
<summary>Returns the details/metadata for a Bulk Account Settings Import request</summary>

Retrieves the status and details of a specific account settings import request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `importId` | `string` | Yes | The import ID GUID. |

Returns: `OrganizationAccountSettingsImportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationAccountSettingsImportResponse importDetail = check docuSignClient->/v2/organizations/[organizationId]/imports/account_settings/[importId]();
```

Sample response:

```ballerina
{
  "id": "settings-import-001",
  "status": "completed",
  "number_processed_accounts": 5,
  "number_unprocessed_accounts": 0
}
```

</details>

<details>
<summary>Deletes a Bulk Account Settings Import request</summary>

Deletes a specific account settings import request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `importId` | `string` | Yes | The import ID GUID. |

Returns: `record {}|error`

Sample code:

```ballerina
record {} deleteImport = check docuSignClient->/v2/organizations/[organizationId]/imports/account_settings/[importId].delete();
```

Sample response:

```ballerina
{}
```

</details>

#### Bulk user import

<details>
<summary>Creates a request to import new users into an account</summary>

Creates a bulk user import request to add new users across the organization using a CSV file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `BulkUsersAddBody` | Yes | Multipart body with a CSV file containing user details. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:BulkUsersAddBody addBody = {
    fileCsv: {fileContent: csvBytes, fileName: "new_users.csv"}
};
dsadmin:OrganizationImportResponse bulkAddResp = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/add.post(addBody);
```

Sample response:

```ballerina
{
  "id": "import-001-guid",
  "type": "add_users",
  "status": "queued",
  "user_count": 50,
  "added_user_count": 0,
  "created": "2024-03-01T08:00:00.000Z"
}
```

</details>

<details>
<summary>Import request for adding a user to a single account within the organization</summary>

Creates a bulk import to add users to a specific account using a CSV file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `BulkUsersAddBody1` | Yes | Multipart body with a CSV file. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:BulkUsersAddBody1 addBody = {
    fileCsv: {fileContent: csvBytes, fileName: "account_users.csv"}
};
dsadmin:OrganizationImportResponse acctAddResp = check docuSignClient->/v2/organizations/[organizationId]/accounts/[accountId]/imports/bulk_users/add.post(addBody);
```

Sample response:

```ballerina
{
  "id": "import-002-guid",
  "type": "add_users",
  "status": "queued",
  "user_count": 25
}
```

</details>

<details>
<summary>Bulk updates information for existing users</summary>

Creates a bulk import request to update existing users across the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `BulkUsersUpdateBody` | Yes | Multipart body with a CSV file containing user updates. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:BulkUsersUpdateBody updateBody = {
    fileCsv: {fileContent: csvBytes, fileName: "update_users.csv"}
};
dsadmin:OrganizationImportResponse bulkUpdateResp = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/update.post(updateBody);
```

Sample response:

```ballerina
{
  "id": "import-003-guid",
  "type": "update_users",
  "status": "queued",
  "user_count": 30
}
```

</details>

<details>
<summary>Import request for updating users for a single account within the organization</summary>

Creates a bulk import to update users for a specific account using a CSV file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `BulkUsersUpdateBody1` | Yes | Multipart body with a CSV file. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:BulkUsersUpdateBody1 updateBody = {
    fileCsv: {fileContent: csvBytes, fileName: "account_updates.csv"}
};
dsadmin:OrganizationImportResponse acctUpdateResp = check docuSignClient->/v2/organizations/[organizationId]/accounts/[accountId]/imports/bulk_users/update.post(updateBody);
```

Sample response:

```ballerina
{
  "id": "import-004-guid",
  "type": "update_users",
  "status": "queued",
  "user_count": 15
}
```

</details>

<details>
<summary>Creates a request to close the accounts of existing users</summary>

Creates a bulk import request to close user accounts across the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `BulkUsersCloseBody` | Yes | Multipart body with a CSV file specifying users to close. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:BulkUsersCloseBody closeBody = {
    fileCsv: {fileContent: csvBytes, fileName: "close_users.csv"}
};
dsadmin:OrganizationImportResponse bulkCloseResp = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/close.post(closeBody);
```

Sample response:

```ballerina
{
  "id": "import-005-guid",
  "type": "close_users",
  "status": "queued",
  "user_count": 10
}
```

</details>

<details>
<summary>Closes external memberships</summary>

Closes memberships for users whose email domain is external to the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationImportResponse closeExtResp = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/close_external.post();
```

Sample response:

```ballerina
{
  "id": "import-006-guid",
  "type": "close_external",
  "status": "queued"
}
```

</details>

<details>
<summary>Gets a list of all of the user import requests</summary>

Retrieves all bulk user import requests for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `OrganizationImportsResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationImportsResponse imports = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users();
```

Sample response:

```ballerina
{
  "imports": [
    {
      "id": "import-001-guid",
      "type": "add_users",
      "status": "completed",
      "user_count": 50,
      "added_user_count": 48,
      "error_count": 2
    }
  ]
}
```

</details>

<details>
<summary>Returns the details of a single user import request</summary>

Retrieves details and status of a specific bulk user import request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `importId` | `string` | Yes | The import ID GUID. |

Returns: `OrganizationImportResponse|error`

Sample code:

```ballerina
dsadmin:OrganizationImportResponse importDetail = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/[importId]();
```

Sample response:

```ballerina
{
  "id": "import-001-guid",
  "type": "add_users",
  "status": "completed",
  "user_count": 50,
  "added_user_count": 48,
  "error_count": 2,
  "has_csv_results": true
}
```

</details>

<details>
<summary>Deletes a specific user import request</summary>

Deletes a specific bulk user import request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `importId` | `string` | Yes | The import ID GUID. |

Returns: `record {}|error`

Sample code:

```ballerina
record {} deleteImport = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/[importId].delete();
```

Sample response:

```ballerina
{}
```

</details>

<details>
<summary>Given the ID of a user import request, return the CSV file that was imported</summary>

Downloads the CSV results file for a completed bulk user import request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `importId` | `string` | Yes | The import ID GUID. |

Returns: `string|error`

Sample code:

```ballerina
string csvResults = check docuSignClient->/v2/organizations/[organizationId]/imports/bulk_users/[importId]/results_csv();
```

Sample response:

```ballerina
"email,user_name,status\njane@example.com,Jane Doe,added\nbob@example.com,Bob Smith,error"
```

</details>

#### Identity providers & domains

<details>
<summary>Returns the list of identity providers for an organization</summary>

Retrieves all identity providers configured for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `IdentityProvidersResponse|error`

Sample code:

```ballerina
dsadmin:IdentityProvidersResponse idpResponse = check docuSignClient->/v2/organizations/[organizationId]/identity_providers();
```

Sample response:

```ballerina
{
  "identity_providers": [
    {
      "id": "idp-001-guid",
      "friendly_name": "Corporate SSO",
      "auto_provision_users": true
    }
  ]
}
```

</details>

<details>
<summary>Returns the list of reserved domains for the organization</summary>

Retrieves all reserved (claimed) domains for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |

Returns: `DomainsResponse|error`

Sample code:

```ballerina
dsadmin:DomainsResponse domains = check docuSignClient->/v2/organizations/[organizationId]/reserved_domains();
```

Sample response:

```ballerina
{
  "reserved_domains": [
    {
      "id": "domain-001-guid",
      "status": "active",
      "host_name": "example.com"
    }
  ]
}
```

</details>

#### Data redaction

<details>
<summary>Deletes membership data for a user on an account</summary>

Redacts (deletes) a user's membership data from a specific account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountId` | `string` | Yes | The account ID from which to delete the user's data. |
| `payload` | `IndividualMembershipDataRedactionRequest` | Yes | The redaction request specifying the user ID. |

Returns: `IndividualUserDataRedactionResponse|error`

Sample code:

```ballerina
dsadmin:IndividualMembershipDataRedactionRequest redactReq = {
    userId: userId
};
dsadmin:IndividualUserDataRedactionResponse redactResp = check docuSignClient->/v2/data_redaction/accounts/[accountId]/user.post(redactReq);
```

Sample response:

```ballerina
{
  "user_id": "eeee-ffff-0000-1111",
  "status": "success",
  "membership_results": [
    {
      "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
      "status": "success"
    }
  ]
}
```

</details>

<details>
<summary>Deletes data for one or more of a user's account memberships</summary>

Redacts (deletes) a user's data across one or more account memberships in the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization ID GUID. |
| `payload` | `IndividualUserDataRedactionRequest` | Yes | The redaction request specifying the user and memberships. |

Returns: `IndividualUserDataRedactionResponse|error`

Sample code:

```ballerina
dsadmin:IndividualUserDataRedactionRequest orgRedactReq = {
    userId: userId
};
dsadmin:IndividualUserDataRedactionResponse orgRedactResp = check docuSignClient->/v2/data_redaction/organizations/[organizationId]/user.post(orgRedactReq);
```

Sample response:

```ballerina
{
  "user_id": "eeee-ffff-0000-1111",
  "status": "success",
  "membership_results": [
    {
      "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
      "status": "success"
    }
  ]
}
```

</details>

#### DSGroup management (v2.1)

<details>
<summary>Returns a list of DSGroups</summary>

Retrieves all DSGroups for a specific account within the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `queries` | `DocuSignGroupsv21GetDSGroupsV21Queries` | No | Pagination parameters: `page`, `pageSize`. |

Returns: `DSGroupListResponse|error`

Sample code:

```ballerina
dsadmin:DSGroupListResponse dsGroups = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups();
```

Sample response:

```ballerina
{
  "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
  "ds_groups": [
    {
      "group_id": "dsgroup-001-guid",
      "group_name": "Engineering Team",
      "user_count": 15,
      "is_admin": false
    }
  ],
  "total_count": 1,
  "page": 1,
  "page_size": 20
}
```

</details>

<details>
<summary>Creates a new DSGroup</summary>

Creates a new DSGroup for the specified account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `DSGroupAddRequest` | Yes | The group creation request with group name and optional description. |

Returns: `DSGroupResponse|error`

Sample code:

```ballerina
dsadmin:DSGroupAddRequest groupReq = {
    groupName: "Sales Team",
    description: "Sales department group"
};
dsadmin:DSGroupResponse newGroup = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups.post(groupReq);
```

Sample response:

```ballerina
{
  "group_id": "dsgroup-002-guid",
  "group_name": "Sales Team",
  "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
  "is_admin": false,
  "user_count": 0
}
```

</details>

<details>
<summary>Returns details about a single DSGroup</summary>

Retrieves detailed information about a specific DSGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `dsGroupId` | `string` | Yes | The DSGroup's ID GUID. |

Returns: `DSGroupResponse|error`

Sample code:

```ballerina
dsadmin:DSGroupResponse groupDetail = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]();
```

Sample response:

```ballerina
{
  "group_id": "dsgroup-001-guid",
  "group_name": "Engineering Team",
  "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
  "is_admin": false,
  "user_count": 15
}
```

</details>

<details>
<summary>Deletes a DSGroup</summary>

Deletes a DSGroup from the specified account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `dsGroupId` | `string` | Yes | The DSGroup's GUID. |

Returns: `error?`

Sample code:

```ballerina
check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId].delete();
```

</details>

<details>
<summary>Gets a list of users in a DSGroup</summary>

Retrieves all users belonging to a specific DSGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `dsGroupId` | `string` | Yes | The DSGroup's GUID. |
| `queries` | `DocuSignGroupsv21GetDSGroupUsersV21Queries` | No | Pagination parameters: `page`, `pageSize`. |

Returns: `DSGroupAndUsersResponse|error`

Sample code:

```ballerina
dsadmin:DSGroupAndUsersResponse groupUsers = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]/users();
```

Sample response:

```ballerina
{
  "group": {
    "group_id": "dsgroup-001-guid",
    "group_name": "Engineering Team"
  },
  "group_users": {
    "users": [
      {
        "user_id": "eeee-ffff-0000-1111",
        "user_name": "John Doe",
        "email": "john@example.com"
      }
    ],
    "total_count": 1
  }
}
```

</details>

<details>
<summary>Adds a list of users to a DSGroup</summary>

Adds one or more users to a specific DSGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `dsGroupId` | `string` | Yes | The DSGroup's GUID. |
| `payload` | `DSGroupUsersAddRequest` | Yes | The request containing user IDs to add. |

Returns: `AddDSGroupAndUsersResponse|error`

Sample code:

```ballerina
dsadmin:DSGroupUsersAddRequest addUsersReq = {
    userIds: [userId]
};
dsadmin:AddDSGroupAndUsersResponse addResult = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]/users.post(addUsersReq);
```

Sample response:

```ballerina
{
  "TotalCount": 1,
  "is_success": true
}
```

</details>

<details>
<summary>Removes a list of users from a DSGroup</summary>

Removes one or more users from a specific DSGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `dsGroupId` | `string` | Yes | The DSGroup's GUID. |
| `payload` | `DSGroupUsersRemoveRequest` | Yes | The request containing user IDs to remove. |

Returns: `RemoveDSGroupUsersResponse|error`

Sample code:

```ballerina
dsadmin:DSGroupUsersRemoveRequest removeReq = {
    userIds: [userId]
};
dsadmin:RemoveDSGroupUsersResponse removeResult = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]/users.delete(removeReq);
```

Sample response:

```ballerina
{
  "is_success": true
}
```

</details>

#### Product permission profiles (v2.1)

<details>
<summary>Gets products associated with the account and the available permission profiles</summary>

Retrieves products and their available permission profiles for the specified account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |

Returns: `ProductPermissionProfilesResponse|error`

Sample code:

```ballerina
dsadmin:ProductPermissionProfilesResponse prodPerms = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/products/permission_profiles();
```

Sample response:

```ballerina
{
  "product_permission_profiles": [
    {
      "product_id": "prod-001",
      "product_name": "eSignature",
      "permission_profiles": [
        {
          "permission_profile_id": "12345",
          "permission_profile_name": "DocuSign Sender"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>Retrieves a user's product permission profiles by email address</summary>

Retrieves the product permission profiles assigned to a user identified by email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `queries` | `OrganizationProductPermissionProfileGetUserProductPermissionProfilesByEmailQueries` | No | Query parameters including `email`. |

Returns: `UserProductPermissionProfilesResponse|error`

Sample code:

```ballerina
dsadmin:UserProductPermissionProfilesResponse userPerms = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/products/permission_profiles/users(email = "user@example.com");
```

Sample response:

```ballerina
{
  "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
  "user_id": "eeee-ffff-0000-1111",
  "product_permission_profiles": [
    {
      "product_id": "prod-001",
      "product_name": "eSignature",
      "permission_profile_id": "12345",
      "permission_profile_name": "DocuSign Sender"
    }
  ]
}
```

</details>

<details>
<summary>Assigns permission profiles for a user by email address</summary>

Assigns product permission profiles to a user identified by email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `UserProductPermissionProfilesRequest` | Yes | The request with email and product permission profiles to assign. |

Returns: `UserProductPermissionProfilesResponse|error`

Sample code:

```ballerina
dsadmin:UserProductPermissionProfilesRequest assignReq = {
    email: "user@example.com",
    productPermissionProfiles: [
        {
            productId: "prod-001",
            permissionProfileId: "12345"
        }
    ]
};
dsadmin:UserProductPermissionProfilesResponse assignResp = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/products/permission_profiles/users.post(assignReq);
```

Sample response:

```ballerina
{
  "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
  "user_id": "eeee-ffff-0000-1111",
  "product_permission_profiles": [
    {
      "product_id": "prod-001",
      "permission_profile_id": "12345",
      "permission_profile_name": "DocuSign Sender"
    }
  ]
}
```

</details>

<details>
<summary>Retrieves a user's product permission profiles by user ID</summary>

Retrieves the product permission profiles assigned to a user identified by user ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `userId` | `string` | Yes | The user ID GUID. |

Returns: `ProductPermissionProfilesResponse|error`

Sample code:

```ballerina
dsadmin:ProductPermissionProfilesResponse userProdPerms = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/products/users/[userId]/permission_profiles();
```

Sample response:

```ballerina
{
  "product_permission_profiles": [
    {
      "product_id": "prod-001",
      "product_name": "eSignature",
      "permission_profiles": [
        {
          "permission_profile_id": "12345",
          "permission_profile_name": "DocuSign Sender"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>Assigns permission profiles for a user by user ID</summary>

Assigns product permission profiles to a user identified by user ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `userId` | `string` | Yes | The user ID GUID. |
| `payload` | `ProductPermissionProfilesRequest` | Yes | The request with product permission profiles to assign. |

Returns: `UserProductPermissionProfilesResponse|error`

Sample code:

```ballerina
dsadmin:ProductPermissionProfilesRequest assignByIdReq = {
    productPermissionProfiles: [
        {
            productId: "prod-001",
            permissionProfileId: "12345"
        }
    ]
};
dsadmin:UserProductPermissionProfilesResponse assignByIdResp = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/products/users/[userId]/permission_profiles.post(assignByIdReq);
```

Sample response:

```ballerina
{
  "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
  "user_id": "eeee-ffff-0000-1111",
  "product_permission_profiles": [
    {
      "product_id": "prod-001",
      "permission_profile_id": "12345",
      "permission_profile_name": "DocuSign Sender"
    }
  ]
}
```

</details>

<details>
<summary>Revokes a user's access to one or more products</summary>

Revokes a user's access to one or more products in the specified account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `UserProductProfileDeleteRequest` | Yes | The request specifying the user and products to revoke. |

Returns: `RemoveUserProductsResponse|error`

Sample code:

```ballerina
dsadmin:UserProductProfileDeleteRequest revokeReq = {
    userEmail: "user@example.com",
    productIds: ["prod-001"]
};
dsadmin:RemoveUserProductsResponse revokeResp = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/products/users.delete(revokeReq);
```

Sample response:

```ballerina
{
  "user_email": "user@example.com",
  "user_id": "eeee-ffff-0000-1111",
  "is_success": true
}
```

</details>

#### Multi-Product user management (v2.1)

<details>
<summary>Creates and updates a multi-product user</summary>

Creates a new user or updates an existing user with multi-product access.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `accountId` | `string` | Yes | The account ID GUID. |
| `payload` | `NewMultiProductUserAddRequest` | Yes | The multi-product user creation request. |

Returns: `AddUserResponse|error`

Sample code:

```ballerina
dsadmin:NewMultiProductUserAddRequest multiUserReq = {
    email: "multiuser@example.com",
    userFirstName: "Alice",
    userLastName: "Smith",
    productPermissionProfiles: [
        {
            productId: "prod-001",
            permissionProfileId: "12345"
        }
    ]
};
dsadmin:AddUserResponse multiUserResp = check docuSignClient->/v2\.1/organizations/[organizationId]/accounts/[accountId]/users.post(multiUserReq);
```

Sample response:

```ballerina
{
  "id": "new-user-guid",
  "user_name": "Alice Smith",
  "first_name": "Alice",
  "last_name": "Smith",
  "email": "multiuser@example.com"
}
```

</details>

<details>
<summary>Retrieves the DS profile for a user specified by email address</summary>

Retrieves the DocuSign profile for a user identified by email address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `queries` | `OrganizationUserOrganizationUsersGetDSProfilesQueries` | No | Query parameters including `email` and `sort`. |

Returns: `UsersDrilldownResponse|error`

Sample code:

```ballerina
dsadmin:UsersDrilldownResponse dsProfile = check docuSignClient->/v2\.1/organizations/[organizationId]/users/dsprofile(email = "user@example.com");
```

Sample response:

```ballerina
{
  "users": [
    {
      "id": "eeee-ffff-0000-1111",
      "user_name": "John Doe",
      "user_status": "active",
      "email": "user@example.com",
      "default_account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001"
    }
  ]
}
```

</details>

<details>
<summary>Retrieves the DS profile for a user specified by ID</summary>

Retrieves the DocuSign profile for a user identified by user ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `userId` | `string` | Yes | The user ID GUID. |
| `queries` | `OrganizationUserOrganizationUsersGetDSProfileByUserIdQueries` | No | Query parameter: `sort`. |

Returns: `UsersDrilldownResponse|error`

Sample code:

```ballerina
dsadmin:UsersDrilldownResponse dsProfileById = check docuSignClient->/v2\.1/organizations/[organizationId]/users/[userId]/dsprofile();
```

Sample response:

```ballerina
{
  "users": [
    {
      "id": "eeee-ffff-0000-1111",
      "user_name": "John Doe",
      "user_status": "active",
      "email": "john@example.com",
      "default_account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001"
    }
  ]
}
```

</details>

#### Asset group operations

<details>
<summary>Get asset group accounts for an organization</summary>

Retrieves asset group accounts for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `queries` | `OrganizationProvisionAssetGroupGetAssetGroupAccountsByOrgQueries` | No | Query parameters for filtering and pagination. |

Returns: `AssetGroupAccountsResponse|error`

Sample code:

```ballerina
dsadmin:AssetGroupAccountsResponse assetAccounts = check docuSignClient->/v1/organizations/[organizationId]/assetGroups/accounts();
```

Sample response:

```ballerina
{
  "asset_group_accounts": [
    {
      "account_id": "abcd1234-xxxx-xxxx-xxxx-000000000001",
      "account_name": "Main Account",
      "site_id": 1
    }
  ]
}
```

</details>

<details>
<summary>Clone an existing DocuSign account</summary>

Creates a clone of an existing DocuSign account within the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `payload` | `AssetGroupAccountClone` | Yes | The account clone request specifying source account and target details. |

Returns: `AssetGroupAccountClone|error`

Sample code:

```ballerina
dsadmin:AssetGroupAccountClone cloneReq = {
    sourceAccount: {
        id: "source-account-guid"
    },
    targetAccount: {
        name: "Cloned Account"
    }
};
dsadmin:AssetGroupAccountClone cloneResp = check docuSignClient->/v1/organizations/[organizationId]/assetGroups/accountClone.post(cloneReq);
```

Sample response:

```ballerina
{
  "assetGroupWorkId": "clone-work-001",
  "sourceAccount": {
    "id": "source-account-guid"
  },
  "targetAccount": {
    "name": "Cloned Account"
  },
  "status": "queued"
}
```

</details>

<details>
<summary>Gets all asset group account clones for an organization</summary>

Retrieves all account clone requests for the organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `queries` | `OrganizationProvisionAssetGroupGetAssetGroupAccountClonesByOrgIdQueries` | No | Query parameters for filtering and pagination. |

Returns: `AssetGroupAccountClones|error`

Sample code:

```ballerina
dsadmin:AssetGroupAccountClones clones = check docuSignClient->/v1/organizations/[organizationId]/assetGroups/accountClones();
```

Sample response:

```ballerina
{
  "assetGroupWorks": [
    {
      "assetGroupWorkId": "clone-work-001",
      "status": "completed"
    }
  ]
}
```

</details>

<details>
<summary>Gets information about a single cloned account</summary>

Retrieves the status and details of a specific account clone request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | The organization's GUID. |
| `assetGroupId` | `string` | Yes | The ID of the asset group. |
| `assetGroupWorkId` | `string` | Yes | The ID of the asset group account clone request. |

Returns: `AssetGroupAccountClone|error`

Sample code:

```ballerina
dsadmin:AssetGroupAccountClone cloneDetail = check docuSignClient->/v1/organizations/[organizationId]/assetGroups/[assetGroupId]/accountClones/[assetGroupWorkId]();
```

Sample response:

```ballerina
{
  "assetGroupWorkId": "clone-work-001",
  "sourceAccount": {
    "id": "source-account-guid"
  },
  "targetAccount": {
    "id": "target-account-guid",
    "name": "Cloned Account"
  },
  "status": "completed"
}
```

</details>
