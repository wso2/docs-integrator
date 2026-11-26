---
connector: true
connector_name: "docusign.dsadmin"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The DocuSign Admin connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage organizations, users, permissions, groups, DSGroups, product permission profiles, bulk user imports, account settings exports and imports, and asset groups through the DocuSign Admin API. |

---

## Client

The `Client` connects to the DocuSign Admin API (`https://api.docusign.net/Management`). It exposes 58 operations as resource functions; each is listed by its HTTP method and resource path.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/docusign.dsadmin;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

final dsadmin:Client dsadminClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl
    }
});
```

### Operations

#### Organizations

<details>
<summary>List organizations</summary>

<div>

Returns a list of organizations that the authenticated user belongs to.

**Resource:** `get v2/organizations`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `mode` | <code>string</code> | No | Specifies how to select the organizations. Valid values: - `org_admin`: Returns organizations for which the authenticated user is an admin. - `account_membership`: Returns organizations that contain an account of which the authenticated user is a member Default value: `org_admin`. |

**Returns:** `OrganizationsResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationsResponse result = check dsadminClient->/v2/organizations.get();
```

**Sample response:**

```json
{
  "organizations": [
    {
      "last_modified_on": "string",
      "description": "Sample description",
      "default_account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

#### Data redaction

<details>
<summary>Redact a user's account membership data</summary>

<div>

Deletes membership data for a user on an account.

**Resource:** `post v2/data_redaction/accounts/[accountId]/user`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountId` | <code>string</code> | Yes | The ID of the account from which to delete the user's data. |
| `payload` | <code>IndividualMembershipDataRedactionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IndividualUserDataRedactionResponse|error`

**Sample code:**

```ballerina
dsadmin:IndividualUserDataRedactionResponse result = check dsadminClient->/v2/data_redaction/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/user.post({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "membership_results": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "unknown"
    }
  ],
  "status": "unknown"
}
```

</div>
</details>

<details>
<summary>Redact a user's organization membership data</summary>

<div>

Deletes data for one or more of a user's account memberships.

**Resource:** `post v2/data_redaction/organizations/[organizationId]/user`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>IndividualUserDataRedactionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IndividualUserDataRedactionResponse|error`

**Sample code:**

```ballerina
dsadmin:IndividualUserDataRedactionResponse result = check dsadminClient->/v2/data_redaction/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/user.post({
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    memberships: [{
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "membership_results": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "unknown"
    }
  ],
  "status": "unknown"
}
```

</div>
</details>

#### Permissions

<details>
<summary>List account permission profiles</summary>

<div>

Returns the list of permission profiles in an account.

**Resource:** `get v2/organizations/[organizationId]/accounts/[accountId]/permissions`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `accountId` | <code>string</code> | Yes | The account ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PermissionsResponse|error`

**Sample code:**

```ballerina
dsadmin:PermissionsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/permissions.get();
```

**Sample response:**

```json
{
  "permissions": [
    {
      "name": "Sample name",
      "id": 1
    }
  ]
}
```

</div>
</details>

#### Groups

<details>
<summary>List account groups</summary>

<div>

Returns the list of groups in an account.

**Resource:** `get v2/organizations/[organizationId]/accounts/[accountId]/groups`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `accountId` | <code>string</code> | Yes | The account ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `take` | <code>int:Signed32</code> | No | Page size of the response. The default value is 20. |
| `'start` | <code>int:Signed32</code> | No | Index of first item to include in the response. The default value is 0. |
| `end` | <code>int:Signed32</code> | No | Index of the last item to include in the response. Ignored if `take` parameter is specified. |

**Returns:** `MemberGroupsResponse|error`

**Sample code:**

```ballerina
dsadmin:MemberGroupsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/groups.get();
```

**Sample response:**

```json
{
  "groups": [
    {
      "name": "Sample name",
      "id": 1,
      "type": "string"
    }
  ],
  "paging": {
    "result_set_start_position": 1,
    "next": "string",
    "previous": "string"
  }
}
```

</div>
</details>

#### Exports

<details>
<summary>List user list export requests</summary>

<div>

Returns a list of pending and completed export requests.

**Resource:** `get v2/organizations/[organizationId]/exports/user_list`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationExportsResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationExportsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/user_list.get();
```

**Sample response:**

```json
{
  "exports": [
    {
      "expires": "string",
      "size_bytes": 1,
      "metadata_url": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Create a user list export request</summary>

<div>

Creates a user list export request.

**Resource:** `post v2/organizations/[organizationId]/exports/user_list`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>OrganizationExportRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationExportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationExportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/user_list.post({
    domains: [{
        domain: "string"
    }],
    accounts: [{
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    'type: "string"
});
```

**Sample response:**

```json
{
  "expires": "string",
  "size_bytes": 1,
  "metadata_url": "https://example.com/resource",
  "created": "string",
  "completed": "string",
  "type": "string"
}
```

</div>
</details>

<details>
<summary>List account settings export requests</summary>

<div>

Returns a list of pending and completed account settings export request.

**Resource:** `get v2/organizations/[organizationId]/exports/account_settings`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationExportsResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationExportsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/account_settings.get();
```

**Sample response:**

```json
{
  "exports": [
    {
      "expires": "string",
      "size_bytes": 1,
      "metadata_url": "https://example.com/resource"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Create an account settings export request</summary>

<div>

Creates a new account settings export request.

**Resource:** `post v2/organizations/[organizationId]/exports/account_settings`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>OrganizationAccountsRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationExportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationExportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/account_settings.post({
    accounts: [{
        accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "expires": "string",
  "size_bytes": 1,
  "metadata_url": "https://example.com/resource",
  "created": "string",
  "completed": "string",
  "type": "string"
}
```

</div>
</details>

<details>
<summary>Get a user list export request</summary>

<div>

Returns the results for single user list export request.

**Resource:** `get v2/organizations/[organizationId]/exports/user_list/[exportId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `exportId` | <code>string</code> | Yes | The export ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationExportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationExportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/user_list/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].get();
```

**Sample response:**

```json
{
  "expires": "string",
  "size_bytes": 1,
  "metadata_url": "https://example.com/resource",
  "created": "string",
  "completed": "string",
  "type": "string"
}
```

</div>
</details>

<details>
<summary>Delete a user list export request</summary>

<div>

Deletes a single user list export request.

**Resource:** `delete v2/organizations/[organizationId]/exports/user_list/[exportId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `exportId` | <code>string</code> | Yes | The export ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `record {}|error`

**Sample code:**

```ballerina
record {} result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/user_list/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].delete();
```

**Sample response:**

The raw response content as `record {}`.

</div>
</details>

<details>
<summary>Get an account settings export request</summary>

<div>

Returns the results for a single account settings export request.

**Resource:** `get v2/organizations/[organizationId]/exports/account_settings/[exportId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `exportId` | <code>string</code> | Yes | The export ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationExportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationExportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/account_settings/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].get();
```

**Sample response:**

```json
{
  "expires": "string",
  "size_bytes": 1,
  "metadata_url": "https://example.com/resource",
  "created": "string",
  "completed": "string",
  "type": "string"
}
```

</div>
</details>

<details>
<summary>Delete an account settings export request</summary>

<div>

Deletes a single account settings export request.

**Resource:** `delete v2/organizations/[organizationId]/exports/account_settings/[exportId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `exportId` | <code>string</code> | Yes | The export ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `record {}|error`

**Sample code:**

```ballerina
record {} result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/exports/account_settings/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].delete();
```

**Sample response:**

The raw response content as `record {}`.

</div>
</details>

#### Imports

<details>
<summary>List account settings import requests</summary>

<div>

Returns the details and metadata for Bulk Account Settings Import requests in the organization.

**Resource:** `get v2/organizations/[organizationId]/imports/account_settings`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationAccountSettingsImportResponse[]|error`

**Sample code:**

```ballerina
dsadmin:OrganizationAccountSettingsImportResponse[] result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/account_settings.get();
```

**Sample response:**

The raw response content as `OrganizationAccountSettingsImportResponse[]`.

</div>
</details>

<details>
<summary>Create an account settings import request</summary>

<div>

Creates a new account settings import request.

**Resource:** `post v2/organizations/[organizationId]/imports/account_settings`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID GUID. |
| `payload` | <code>ImportsAccountSettingsBody</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationAccountSettingsImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationAccountSettingsImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/account_settings.post({
    fileCsv: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "expires": "string",
  "created": "string",
  "completed": "string",
  "type": "string",
  "number_unprocessed_accounts": 1,
  "requestor": {
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>Get an account settings import request</summary>

<div>

Returns the details/metadata for a Bulk Account Settings Import request.

**Resource:** `get v2/organizations/[organizationId]/imports/account_settings/[importId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `importId` | <code>string</code> | Yes | The import ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationAccountSettingsImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationAccountSettingsImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/account_settings/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].get();
```

**Sample response:**

```json
{
  "expires": "string",
  "created": "string",
  "completed": "string",
  "type": "string",
  "number_unprocessed_accounts": 1,
  "requestor": {
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>Delete an account settings import request</summary>

<div>

Deletes a Bulk Account Settings Import request.

**Resource:** `delete v2/organizations/[organizationId]/imports/account_settings/[importId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `importId` | <code>string</code> | Yes | The import ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `record {}|error`

**Sample code:**

```ballerina
record {} result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/account_settings/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].delete();
```

**Sample response:**

The raw response content as `record {}`.

</div>
</details>

<details>
<summary>Import new users</summary>

<div>

Creates a request to import new users into an account.

**Resource:** `post v2/organizations/[organizationId]/imports/bulk_users/add`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>BulkUsersAddBody</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/add.post({
    fileCsv: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>Import new users into an account</summary>

<div>

Import request for adding a user to a single account within the organization.

**Resource:** `post v2/organizations/[organizationId]/accounts/[accountId]/imports/bulk_users/add`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `accountId` | <code>string</code> | Yes | The account ID Guid. |
| `payload` | <code>BulkUsersAddBody1</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/add.post({
    fileCsv: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>Import user updates</summary>

<div>

Bulk updates information for existing users.

**Resource:** `post v2/organizations/[organizationId]/imports/bulk_users/update`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>BulkUsersUpdateBody</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/update.post({
    fileCsv: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>Import user updates for an account</summary>

<div>

Import request for updating users for a single account within the organization.

**Resource:** `post v2/organizations/[organizationId]/accounts/[accountId]/imports/bulk_users/update`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `accountId` | <code>string</code> | Yes | The account ID Guid. |
| `payload` | <code>BulkUsersUpdateBody1</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/update.post({
    fileCsv: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>Import user closures</summary>

<div>

Creates a request to close the accounts of existing users.

**Resource:** `post v2/organizations/[organizationId]/imports/bulk_users/close`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>BulkUsersCloseBody</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/close.post({
    fileCsv: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>Import external membership closures</summary>

<div>

Closes external memberships.

**Resource:** `post v2/organizations/[organizationId]/imports/bulk_users/close_external`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/close_external.post();
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>List user import requests</summary>

<div>

Gets a list of all of the user import requests.

**Resource:** `get v2/organizations/[organizationId]/imports/bulk_users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportsResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users.get();
```

**Sample response:**

```json
{
  "imports": [
    {
      "type": "string",
      "error_count": 1,
      "imports_timed_out_for_accounts": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Get a user import request</summary>

<div>

Returns the details of a single user import request.

**Resource:** `get v2/organizations/[organizationId]/imports/bulk_users/[importId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `importId` | <code>string</code> | Yes | The import ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationImportResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationImportResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].get();
```

**Sample response:**

```json
{
  "type": "string",
  "error_count": 1,
  "user_level_warning_rollups": [
    {
      "count": 1,
      "warning_type": "string"
    }
  ],
  "imports_timed_out_for_accounts": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_level_error_rollups": [
    {
      "error_type": "string",
      "count": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>Delete a user import request</summary>

<div>

Deletes a specific user import request.

**Resource:** `delete v2/organizations/[organizationId]/imports/bulk_users/[importId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `importId` | <code>string</code> | Yes | The import ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `record {}|error`

**Sample code:**

```ballerina
record {} result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].delete();
```

**Sample response:**

The raw response content as `record {}`.

</div>
</details>

<details>
<summary>Get the CSV of a user import request</summary>

<div>

Given the ID of a user import request, return the CSV file that was imported.

**Resource:** `get v2/organizations/[organizationId]/imports/bulk_users/[importId]/results_csv`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `importId` | <code>string</code> | Yes | The import ID GUID for the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/imports/bulk_users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/results_csv.get();
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

#### Identity providers

<details>
<summary>List identity providers</summary>

<div>

Returns the list of identity providers for an organization.

**Resource:** `get v2/organizations/[organizationId]/identity_providers`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityProvidersResponse|error`

**Sample code:**

```ballerina
dsadmin:IdentityProvidersResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/identity_providers.get();
```

**Sample response:**

```json
{
  "identity_providers": [
    {
      "friendly_name": "Sample name",
      "auto_provision_users": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

#### Reserved domains

<details>
<summary>List reserved domains</summary>

<div>

Returns the list of reserved domains for the organization.

**Resource:** `get v2/organizations/[organizationId]/reserved_domains`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DomainsResponse|error`

**Sample code:**

```ballerina
dsadmin:DomainsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/reserved_domains.get();
```

**Sample response:**

```json
{
  "reserved_domains": [
    {
      "identity_provider_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "host_name": "Sample name"
    }
  ]
}
```

</div>
</details>

#### Users

<details>
<summary>Update user profiles</summary>

<div>

Updates a user's information.

**Resource:** `post v2/organizations/[organizationId]/users/profiles`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>UpdateUsersRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UsersUpdateResponse|error`

**Sample code:**

```ballerina
dsadmin:UsersUpdateResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/profiles.post({
    users: [{
        siteId: 1,
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "success": false,
  "users": [
    {
      "site_id": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "user@example.com"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Update user email addresses</summary>

<div>

Updates a user's email address.

**Resource:** `post v2/organizations/[organizationId]/users/email_addresses`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>UpdateUsersEmailRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UsersUpdateResponse|error`

**Sample code:**

```ballerina
dsadmin:UsersUpdateResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/email_addresses.post({
    users: [{
        siteId: 1,
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        email: "user@example.com"
    }]
});
```

**Sample response:**

```json
{
  "success": false,
  "users": [
    {
      "site_id": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "user@example.com"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Close a user's account memberships</summary>

<div>

Closes a user's memberships.

**Resource:** `delete v2/organizations/[organizationId]/users/[userId]/accounts`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `userId` | <code>string</code> | Yes | The user ID Guid. |
| `payload` | <code>DeleteMembershipsRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeleteMembershipsResponse|error`

**Sample code:**

```ballerina
dsadmin:DeleteMembershipsResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts.delete({
    accounts: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "success": false,
  "accounts": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>List organization users</summary>

<div>

Returns information about the users in an organization.

**Resource:** `get v2/organizations/[organizationId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `take` | <code>int:Signed32</code> | No | Page size of the response. The default value is 20. |
| `accountId` | <code>string</code> | No | Select users that are members of the specified account. At least one of `email`, `account_id` or `organization_reserved_domain_id` must be specified. |
| `organizationReservedDomainId` | <code>string</code> | No | Select users that are in the specified domain. At least one of `email`, `account_id` or `organization_reserved_domain_id` must be specified. |
| `lastModifiedSince` | <code>string</code> | No | Select users whose data have been modified since the date specified. `account_id` or `organization_reserved_domain_id` must be specified. |
| `emailUserNameLike` | <code>string</code> | No | Selects users by pattern matching on the user's email address. |
| `'start` | <code>int:Signed32</code> | No | Index of first item to include in the response. The default value is 0. |
| `end` | <code>int:Signed32</code> | No | Index of the last item to include in the response. Ignored if `take` parameter is specified. |
| `email` | <code>string</code> | No | Email address of the desired user. At least one of `email`, `account_id` or `organization_reserved_domain_id` must be specified. |
| `membershipStatus` | <code>string</code> | No | The user's membership status. One of: - `activation_required` - `activation_sent` - `active` - `closed` - `disabled`. |
| `status` | <code>string</code> | No | Status. |

**Returns:** `OrganizationUsersResponse|error`

**Sample code:**

```ballerina
dsadmin:OrganizationUsersResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.get();
```

**Sample response:**

```json
{
  "paging": {
    "result_set_start_position": 1,
    "next": "string",
    "previous": "string"
  },
  "users": [
    {
      "user_status": "string",
      "created_on": "string",
      "membership_created_on": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Create a user</summary>

<div>

Creates a new user.

**Resource:** `post v2/organizations/[organizationId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `payload` | <code>NewUserRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `NewUserResponse|error`

**Sample code:**

```ballerina
dsadmin:NewUserResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.post({
    accounts: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        companyName: "Sample name",
        groups: [{
            id: 1
        }]
    }],
    email: "user@example.com",
    userName: "Sample name",
    accessCode: "200"
});
```

**Sample response:**

```json
{
  "user_name": "Sample name",
  "site_id": 1,
  "last_name": "Sample name",
  "language_culture": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "accounts": [
    {
      "company_name": "Sample name",
      "site_id": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Activate a user membership</summary>

<div>

Activates user memberships.

**Resource:** `post v2/organizations/[organizationId]/users/[userId]/memberships/[membershipId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `userId` | <code>string</code> | Yes | The user ID Guid. |
| `membershipId` | <code>string</code> | Yes | The membership ID GUID. |
| `payload` | <code>ForceActivateMembershipRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UpdateResponse|error`

**Sample code:**

```ballerina
dsadmin:UpdateResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/memberships/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].post({
    siteId: 1
});
```

**Sample response:**

```json
{
  "status": "string"
}
```

</div>
</details>

<details>
<summary>Get user profiles by email address</summary>

<div>

Returns historical information about users with a specific email address.

**Resource:** `get v2/organizations/[organizationId]/users/profile`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `email` | <code>string</code> | No | The email address associated with the users you want to retrieve. **Note:** This property is required. |

**Returns:** `UsersDrilldownResponse|error`

**Sample code:**

```ballerina
dsadmin:UsersDrilldownResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/profile.get();
```

**Sample response:**

```json
{
  "users": [
    {
      "user_status": "string",
      "user_name": "Sample name",
      "last_login": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Delete user identities</summary>

<div>

Deletes user identities.

**Resource:** `delete v2/organizations/[organizationId]/users/[userId]/identities`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `userId` | <code>string</code> | Yes | The user ID Guid. |
| `payload` | <code>DeleteUserIdentityRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeleteResponse|error`

**Sample code:**

```ballerina
dsadmin:DeleteResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/identities.delete({
    identities: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "identities": [
    {
      "immutable_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "provider_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "success": false
}
```

</div>
</details>

<details>
<summary>Add users to an account</summary>

<div>

Adds users to an account.

**Resource:** `post v2/organizations/[organizationId]/accounts/[accountId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization ID Guid. |
| `accountId` | <code>string</code> | Yes | The account ID Guid. |
| `payload` | <code>NewAccountUserRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `NewUserResponse|error`

**Sample code:**

```ballerina
dsadmin:NewUserResponse result = check dsadminClient->/v2/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.post({
    email: "user@example.com",
    userName: "Sample name",
    accessCode: "200",
    groups: [{
        id: 1,
        name: "Sample name",
        'type: "string"
    }]
});
```

**Sample response:**

```json
{
  "user_name": "Sample name",
  "site_id": 1,
  "last_name": "Sample name",
  "language_culture": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "accounts": [
    {
      "company_name": "Sample name",
      "site_id": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Create or update a multi-product user</summary>

<div>

Creates and updates a multi-product user.

**Resource:** `post v2.1/organizations/[organizationId]/accounts/[accountId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `payload` | <code>NewMultiProductUserAddRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddUserResponse|error`

**Sample code:**

```ballerina
dsadmin:AddUserResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.post({
    productPermissionProfiles: [{
        permissionProfileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    email: "user@example.com",
    dsGroups: [{
        dsGroupId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    userName: "Sample name"
});
```

**Sample response:**

```json
{
  "user_name": "Sample name",
  "site_id": 1,
  "last_name": "Sample name",
  "language_culture": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "accounts": [
    {
      "company_name": "Sample name",
      "site_id": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Get a user's DS profile by email address</summary>

<div>

Retrieves the DS profile for a user specified by email address.

**Resource:** `get v2.1/organizations/[organizationId]/users/dsprofile`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `sort` | <code>boolean</code> | No | When **true,** sorts the results in ascending order by account name. |
| `email` | <code>string</code> | No | The email address of the user. **Note:** This property is required. |

**Returns:** `UsersDrilldownResponse|error`

**Sample code:**

```ballerina
dsadmin:UsersDrilldownResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/dsprofile.get();
```

**Sample response:**

```json
{
  "users": [
    {
      "user_status": "string",
      "user_name": "Sample name",
      "last_login": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Get a user's DS profile by user ID</summary>

<div>

Retrieves the DS profile for a user specified by ID.

**Resource:** `get v2.1/organizations/[organizationId]/users/[userId]/dsprofile`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `userId` | <code>string</code> | Yes | The user ID GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `sort` | <code>boolean</code> | No | When **true,** sorts the results in ascending order by account name. |

**Returns:** `UsersDrilldownResponse|error`

**Sample code:**

```ballerina
dsadmin:UsersDrilldownResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsprofile.get();
```

**Sample response:**

```json
{
  "users": [
    {
      "user_status": "string",
      "user_name": "Sample name",
      "last_login": "string"
    }
  ]
}
```

</div>
</details>

#### DSGroups

<details>
<summary>List DSGroups</summary>

<div>

Returns a list of DSGroups.

**Resource:** `get v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `page` | <code>int:Signed32</code> | No | Start page of DSGroups. |
| `pageSize` | <code>int:Signed32</code> | No | Page size of DSGroups. |

**Returns:** `DSGroupListResponse|error`

**Sample code:**

```ballerina
dsadmin:DSGroupListResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups.get();
```

**Sample response:**

```json
{
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "ds_groups": [
    {
      "is_admin": false,
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "last_modified_on": "string"
    }
  ],
  "total_count": 1,
  "page": 1,
  "page_size": 1
}
```

</div>
</details>

<details>
<summary>Create a DSGroup</summary>

<div>

Creates a new DSGroup.

**Resource:** `post v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `payload` | <code>DSGroupAddRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DSGroupResponse|error`

**Sample code:**

```ballerina
dsadmin:DSGroupResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups.post({
    groupName: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "is_admin": false,
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "last_modified_on": "string",
  "user_count": 1,
  "external_account_id": 1,
  "group_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>Get a DSGroup</summary>

<div>

Returns details about a single DSGroup.

**Resource:** `get v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `dsGroupId` | <code>string</code> | Yes | The DSGroup's ID GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DSGroupResponse|error`

**Sample code:**

```ballerina
dsadmin:DSGroupResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].get();
```

**Sample response:**

```json
{
  "is_admin": false,
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "last_modified_on": "string",
  "user_count": 1,
  "external_account_id": 1,
  "group_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>Delete a DSGroup</summary>

<div>

Deletes a DSGroup.

**Resource:** `delete v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `dsGroupId` | <code>string</code> | Yes | The DSGroup's GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].delete();
```

</div>
</details>

<details>
<summary>List DSGroup users</summary>

<div>

Gets a list of users in a DSGroup.

**Resource:** `get v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `dsGroupId` | <code>string</code> | Yes | The DSGroup's GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `page` | <code>int:Signed32</code> | No | Start page of DSGroups. |
| `pageSize` | <code>int:Signed32</code> | No | Page size of DSGroups. |

**Returns:** `DSGroupAndUsersResponse|error`

**Sample code:**

```ballerina
dsadmin:DSGroupAndUsersResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.get();
```

**Sample response:**

```json
{
  "group_users": {
    "total_count": 1,
    "page": 1,
    "page_size": 1
  },
  "group": {
    "is_admin": false,
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "last_modified_on": "string"
  }
}
```

</div>
</details>

<details>
<summary>Add users to a DSGroup</summary>

<div>

Adds a list of users to a DSGroup.

**Resource:** `post v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `dsGroupId` | <code>string</code> | Yes | The DSGroup's GUID. |
| `payload` | <code>DSGroupUsersAddRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddDSGroupAndUsersResponse|error`

**Sample code:**

```ballerina
dsadmin:AddDSGroupAndUsersResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.post({
    userIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

**Sample response:**

```json
{
  "group_users": {
    "TotalCount": 1,
    "is_success": false
  },
  "group": {
    "is_admin": false,
    "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "last_modified_on": "string"
  }
}
```

</div>
</details>

<details>
<summary>Remove users from a DSGroup</summary>

<div>

Removes a list of users from a DSGroup.

**Resource:** `delete v2.1/organizations/[organizationId]/accounts/[accountId]/dsgroups/[dsGroupId]/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `dsGroupId` | <code>string</code> | Yes | The DSGroup's GUID. |
| `payload` | <code>DSGroupUsersRemoveRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RemoveDSGroupUsersResponse|error`

**Sample code:**

```ballerina
dsadmin:RemoveDSGroupUsersResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/dsgroups/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/users.delete({
    userIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    userEmails: ["user@example.com"]
});
```

**Sample response:**

```json
{
  "failed_users": [
    {
      "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_name": "Sample name"
    }
  ],
  "is_success": false
}
```

</div>
</details>

#### Products

<details>
<summary>List product permission profiles</summary>

<div>

Gets products associated with the account and the available permission profiles.

**Resource:** `get v2.1/organizations/[organizationId]/accounts/[accountId]/products/permission_profiles`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProductPermissionProfilesResponse|error`

**Sample code:**

```ballerina
dsadmin:ProductPermissionProfilesResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/products/permission_profiles.get();
```

**Sample response:**

```json
{
  "product_permission_profiles": [
    {
      "error_message": "string",
      "product_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product_name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Get a user's product permission profiles by user ID</summary>

<div>

Retrieves a user's product permission profiles by user ID.

**Resource:** `get v2.1/organizations/[organizationId]/accounts/[accountId]/products/users/[userId]/permission_profiles`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `userId` | <code>string</code> | Yes | The user ID GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProductPermissionProfilesResponse|error`

**Sample code:**

```ballerina
dsadmin:ProductPermissionProfilesResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/products/users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/permission_profiles.get();
```

**Sample response:**

```json
{
  "product_permission_profiles": [
    {
      "error_message": "string",
      "product_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product_name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Assign product permission profiles by user ID</summary>

<div>

Assigns permission profiles for a user by user ID.

**Resource:** `post v2.1/organizations/[organizationId]/accounts/[accountId]/products/users/[userId]/permission_profiles`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `userId` | <code>string</code> | Yes | The user ID GUID. |
| `payload` | <code>ProductPermissionProfilesRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserProductPermissionProfilesResponse|error`

**Sample code:**

```ballerina
dsadmin:UserProductPermissionProfilesResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/products/users/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/permission_profiles.post({
    productPermissionProfiles: [{
        permissionProfileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "product_permission_profiles": [
    {
      "error_message": "string",
      "product_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product_name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Revoke a user's product access</summary>

<div>

Revokes a user's access to one or more products.

**Resource:** `delete v2.1/organizations/[organizationId]/accounts/[accountId]/products/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `payload` | <code>UserProductProfileDeleteRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RemoveUserProductsResponse|error`

**Sample code:**

```ballerina
dsadmin:RemoveUserProductsResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/products/users.delete({
    productIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    userEmail: "user@example.com",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "user_product_results": {},
  "is_success": false,
  "user_email": "user@example.com",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>Get a user's product permission profiles by email address</summary>

<div>

Retrieves a user's product permission profiles by email address.

**Resource:** `get v2.1/organizations/[organizationId]/accounts/[accountId]/products/permission_profiles/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `email` | <code>string</code> | No | The email address of the user. **Note:** This property is required. |

**Returns:** `UserProductPermissionProfilesResponse|error`

**Sample code:**

```ballerina
dsadmin:UserProductPermissionProfilesResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/products/permission_profiles/users.get();
```

**Sample response:**

```json
{
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "product_permission_profiles": [
    {
      "error_message": "string",
      "product_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product_name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Assign product permission profiles by email address</summary>

<div>

Assigns permission profiles for a user by email address.

**Resource:** `post v2.1/organizations/[organizationId]/accounts/[accountId]/products/permission_profiles/users`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `accountId` | <code>string</code> | Yes | The account ID GUID. |
| `payload` | <code>UserProductPermissionProfilesRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserProductPermissionProfilesResponse|error`

**Sample code:**

```ballerina
dsadmin:UserProductPermissionProfilesResponse result = check dsadminClient->/v2\.1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accounts/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/products/permission_profiles/users.post({
    productPermissionProfiles: [{
        permissionProfileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    email: "user@example.com"
});
```

**Sample response:**

```json
{
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "product_permission_profiles": [
    {
      "error_message": "string",
      "product_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product_name": "Sample name"
    }
  ]
}
```

</div>
</details>

#### Asset Groups

<details>
<summary>List asset group accounts</summary>

<div>

Get asset group accounts for an organization.

**Resource:** `get v1/organizations/[organizationId]/assetGroups/accounts`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `compliant` | <code>boolean</code> | No | When **true,** only compliant accounts are returned and account responses do not include the `compliant` field. The default value is **false.**. |

**Returns:** `AssetGroupAccountsResponse|error`

**Sample code:**

```ballerina
dsadmin:AssetGroupAccountsResponse result = check dsadminClient->/v1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/assetGroups/accounts.get();
```

**Sample response:**

```json
{
  "assetGroupAccounts": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "externalAccountId": 1,
      "assetGroupName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Clone an account</summary>

<div>

Clone an existing DocuSign account.

**Resource:** `post v1/organizations/[organizationId]/assetGroups/accountClone`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `payload` | <code>AssetGroupAccountClone</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AssetGroupAccountClone|error`

**Sample code:**

```ballerina
dsadmin:AssetGroupAccountClone result = check dsadminClient->/v1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/assetGroups/accountClone.post({
    sourceAccount: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        site: "string",
        externalAccountId: 1
    },
    targetAccount: {
        countryCode: "200",
        name: "Sample name",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    createdByName: "Sample name",
    orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "sourceAccount": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "site": "string",
    "externalAccountId": 1
  },
  "targetAccount": {
    "site": "string",
    "countryCode": "200",
    "name": "Sample name"
  },
  "createdByName": "Sample name",
  "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "cloneProcessingFailureDetails": {
    "errorDescription": "Sample description",
    "isSystemError": false,
    "error": "string"
  },
  "message": "string"
}
```

</div>
</details>

<details>
<summary>List account clones</summary>

<div>

Gets all asset group account clones for an organization.

**Resource:** `get v1/organizations/[organizationId]/assetGroups/accountClones`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `sinceUpdatedDate` | <code>string</code> | No | Use this parameter to retrieve only account clones that were created on or after a specified date. |
| `includeDetails` | <code>boolean</code> | No | When **true,** include additional details for the asset group account clones. The default value is **false.**. |

**Returns:** `AssetGroupAccountClones|error`

**Sample code:**

```ballerina
dsadmin:AssetGroupAccountClones result = check dsadminClient->/v1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/assetGroups/accountClones.get();
```

**Sample response:**

```json
{
  "assetGroupWorks": [
    {
      "sourceAccount": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      },
      "targetAccount": {},
      "createdByName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>Get an account clone</summary>

<div>

Gets information about a single cloned account.

**Resource:** `get v1/organizations/[organizationId]/assetGroups/[assetGroupId]/accountClones/[assetGroupWorkId]`

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The organization's GUID. |
| `assetGroupId` | <code>string</code> | Yes | The ID of the asset group. |
| `assetGroupWorkId` | <code>string</code> | Yes | The ID of the asset group account clone request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `includeDetails` | <code>boolean</code> | No | When **true,** include additional details about the cloned account. The default value is **false.**. |

**Returns:** `AssetGroupAccountClone|error`

**Sample code:**

```ballerina
dsadmin:AssetGroupAccountClone result = check dsadminClient->/v1/organizations/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/assetGroups/["3fa85f64-5717-4562-b3fc-2c963f66afa6"]/accountClones/["3fa85f64-5717-4562-b3fc-2c963f66afa6"].get();
```

**Sample response:**

```json
{
  "sourceAccount": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "site": "string",
    "externalAccountId": 1
  },
  "targetAccount": {
    "site": "string",
    "countryCode": "200",
    "name": "Sample name"
  },
  "createdByName": "Sample name",
  "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "cloneProcessingFailureDetails": {
    "errorDescription": "Sample description",
    "isSystemError": false,
    "error": "string"
  },
  "message": "string"
}
```

</div>
</details>
