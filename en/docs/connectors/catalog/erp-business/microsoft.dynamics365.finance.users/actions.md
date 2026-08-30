---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.users` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides CRUD access to Microsoft Dynamics 365 Finance user, security, and access-control entities via the Users OData API. |

---

## Client

Provides CRUD access to Microsoft Dynamics 365 Finance user, security, and access-control entities via the Users OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration — `tokenUrl`, `clientId`, `clientSecret`, and optional `scopes`. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.users;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

users:Client usersClient = check new (
    {
        auth: {
            tokenUrl,
            clientId,
            clientSecret
        }
    },
    serviceUrl
);
```

### Operations

#### Channel Users

<details>
<summary>listChannelUsers</summary>

Lists channel users, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListChannelUsersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:ChannelUsersCollection|error`

Sample code:

```ballerina
users:ChannelUsersCollection result = check usersClient->listChannelUsers(
    queries = {filter: "dataAreaId eq 'USMF'", top: 20}
);
```

</details>

<details>
<summary>createChannelUsers</summary>

Creates a channel user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:ChannelUser` | Yes | The channel user to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:ChannelUser|error`

Sample code:

```ballerina
users:ChannelUser created = check usersClient->createChannelUsers({
    dataAreaId: "USMF",
    operatingUnitNumber: "001",
    user: "alice.nguyen"
});
```

</details>

<details>
<summary>getChannelUsers</summary>

Reads a specific channel user by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `user` | `string` | Yes | The user key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetChannelUsersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:ChannelUser|error`

Sample code:

```ballerina
users:ChannelUser channelUser = check usersClient->getChannelUsers("USMF", "001", "alice.nguyen");
```

</details>

<details>
<summary>deleteChannelUsers</summary>

Deletes a specific channel user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `user` | `string` | Yes | The user key field. |
| `headers` | `DeleteChannelUsersHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteChannelUsers("USMF", "001", "alice.nguyen", {ifMatch: eTag});
```

</details>

<details>
<summary>updateChannelUsers</summary>

Updates a specific channel user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `user` | `string` | Yes | The user key field. |
| `payload` | `users:ChannelUser` | Yes | Fields to update. |
| `headers` | `UpdateChannelUsersHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:ChannelUser|error`

Sample code:

```ballerina
users:ChannelUser updated = check usersClient->updateChannelUsers(
    "USMF", "001", "alice.nguyen",
    {operatingUnitNumber: "002"},
    {ifMatch: eTag}
);
```

</details>

#### External Roles

<details>
<summary>listExternalRoles</summary>

Lists external role mappings, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListExternalRolesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:ExternalRolesCollection|error`

Sample code:

```ballerina
users:ExternalRolesCollection result = check usersClient->listExternalRoles(
    queries = {filter: "Type eq 'Customer'"}
);
```

</details>

<details>
<summary>createExternalRoles</summary>

Creates an external role mapping for a customer, vendor, or other external party.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:ExternalRole` | Yes | The external role to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:ExternalRole|error`

Sample code:

```ballerina
users:ExternalRole created = check usersClient->createExternalRoles({
    role: "CUST-EXT-001",
    'type: "Customer"
});
```

</details>

<details>
<summary>getExternalRoles</summary>

Reads a specific external role mapping by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `role` | `string` | Yes | The role key field. |
| `'type` | `string` | Yes | The entity type identifier — one of `Customer`, `Vendor`, `BusinessRelation`, `ProspectiveVendor`, `Worker`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetExternalRolesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:ExternalRole|error`

Sample code:

```ballerina
users:ExternalRole role = check usersClient->getExternalRoles("CUST-EXT-001", "Customer");
```

</details>

<details>
<summary>deleteExternalRoles</summary>

Deletes a specific external role mapping.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `role` | `string` | Yes | The role key field. |
| `'type` | `string` | Yes | The entity type identifier. |
| `headers` | `DeleteExternalRolesHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteExternalRoles("CUST-EXT-001", "Customer", {ifMatch: eTag});
```

</details>

<details>
<summary>updateExternalRoles</summary>

Updates a specific external role mapping.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `role` | `string` | Yes | The role key field. |
| `'type` | `string` | Yes | The entity type identifier. |
| `payload` | `users:ExternalRole` | Yes | Fields to update. |
| `headers` | `UpdateExternalRolesHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:ExternalRole|error`

:::note
`ExternalRole` has only two fields — `role` and `'type` — and both together form the entity's key. OData entities reject updates that change key fields, so `updateExternalRoles` cannot be used to remap a role from one type to another (for example, from `"Customer"` to `"Vendor"`). To change the mapping, delete the existing external role and create a new one with the desired `role`/`'type` combination instead.
:::

Sample code:

```ballerina
// updateExternalRoles cannot change the role/type mapping itself (both are key fields).
// To remap "CUST-EXT-001" from "Customer" to "Vendor", delete and recreate the record:
check usersClient->deleteExternalRoles("CUST-EXT-001", "Customer", {ifMatch: eTag});

users:ExternalRole created = check usersClient->createExternalRoles({
    role: "CUST-EXT-001",
    'type: "Vendor"
});
```

</details>

#### Groups

<details>
<summary>listGroups</summary>

Lists deferrals groups, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:GroupsCollection|error`

Sample code:

```ballerina
users:GroupsCollection result = check usersClient->listGroups(
    queries = {filter: "dataAreaId eq 'USMF'"}
);
```

</details>

<details>
<summary>createGroups</summary>

Creates a deferrals group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:Group` | Yes | The group to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:Group|error`

Sample code:

```ballerina
users:Group created = check usersClient->createGroups({
    dataAreaId: "USMF",
    deferralsGroup: "DEF-STD",
    name: "Standard deferrals",
    postingProfile: "DEF"
});
```

</details>

<details>
<summary>getGroups</summary>

Reads a specific deferrals group by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `deferralsGroup` | `string` | Yes | The deferrals group key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:Group|error`

Sample code:

```ballerina
users:Group group = check usersClient->getGroups("USMF", "DEF-STD");
```

</details>

<details>
<summary>deleteGroups</summary>

Deletes a specific deferrals group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `deferralsGroup` | `string` | Yes | The deferrals group key field. |
| `headers` | `DeleteGroupsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteGroups("USMF", "DEF-STD", {ifMatch: eTag});
```

</details>

<details>
<summary>updateGroups</summary>

Updates a specific deferrals group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `deferralsGroup` | `string` | Yes | The deferrals group key field. |
| `payload` | `users:Group` | Yes | Fields to update. |
| `headers` | `UpdateGroupsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:Group|error`

Sample code:

```ballerina
users:Group updated = check usersClient->updateGroups(
    "USMF", "DEF-STD",
    {name: "Updated standard deferrals group"},
    {ifMatch: eTag}
);
```

</details>

#### Security Roles

<details>
<summary>listSecurityRoles</summary>

Lists security roles, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSecurityRolesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:SecurityRolesCollection|error`

Sample code:

```ballerina
users:SecurityRolesCollection result = check usersClient->listSecurityRoles(
    queries = {filter: "UserLicenseType eq 'Functional'"}
);
```

</details>

<details>
<summary>createSecurityRoles</summary>

Creates a security role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:SecurityRole` | Yes | The security role to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:SecurityRole|error`

Sample code:

```ballerina
users:SecurityRole created = check usersClient->createSecurityRoles({
    securityRoleIdentifier: "SR-AP-CLERK",
    securityRoleName: "Accounts payable clerk",
    description: "Manages vendor invoices",
    userLicenseType: "Functional",
    accessToSensitiveData: false
});
```

</details>

<details>
<summary>getSecurityRoles</summary>

Reads a specific security role by its identifier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `securityRoleIdentifier` | `string` | Yes | The security role identifier key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSecurityRolesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:SecurityRole|error`

Sample code:

```ballerina
users:SecurityRole role = check usersClient->getSecurityRoles("SR-AP-CLERK");
```

</details>

<details>
<summary>deleteSecurityRoles</summary>

Deletes a specific security role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `securityRoleIdentifier` | `string` | Yes | The security role identifier key field. |
| `headers` | `DeleteSecurityRolesHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteSecurityRoles("SR-AP-CLERK", {ifMatch: eTag});
```

</details>

<details>
<summary>updateSecurityRoles</summary>

Updates a specific security role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `securityRoleIdentifier` | `string` | Yes | The security role identifier key field. |
| `payload` | `users:SecurityRole` | Yes | Fields to update. |
| `headers` | `UpdateSecurityRolesHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:SecurityRole|error`

Sample code:

```ballerina
users:SecurityRole updated = check usersClient->updateSecurityRoles(
    "SR-AP-CLERK",
    {accessToSensitiveData: true},
    {ifMatch: eTag}
);
```

</details>

#### Source Systems

<details>
<summary>listSourceSystems</summary>

Lists source systems, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSourceSystemsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:SourceSystemsCollection|error`

Sample code:

```ballerina
users:SourceSystemsCollection result = check usersClient->listSourceSystems();
```

</details>

<details>
<summary>createSourceSystems</summary>

Creates a source system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:SourceSystem` | Yes | The source system to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:SourceSystem|error`

Sample code:

```ballerina
users:SourceSystem created = check usersClient->createSourceSystems({
    name: "CRM-EXT-01",
    description: "External CRM integration source"
});
```

</details>

<details>
<summary>getSourceSystems</summary>

Reads a specific source system by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSourceSystemsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:SourceSystem|error`

Sample code:

```ballerina
users:SourceSystem sourceSystem = check usersClient->getSourceSystems("CRM-EXT-01");
```

</details>

<details>
<summary>deleteSourceSystems</summary>

Deletes a specific source system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteSourceSystemsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteSourceSystems("CRM-EXT-01", {ifMatch: eTag});
```

</details>

<details>
<summary>updateSourceSystems</summary>

Updates a specific source system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `payload` | `users:SourceSystem` | Yes | Fields to update. |
| `headers` | `UpdateSourceSystemsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:SourceSystem|error`

Sample code:

```ballerina
users:SourceSystem updated = check usersClient->updateSourceSystems(
    "CRM-EXT-01",
    {description: "Updated external CRM integration source"},
    {ifMatch: eTag}
);
```

</details>

#### Source Types

<details>
<summary>listSourceTypes</summary>

Lists source types, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSourceTypesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:SourceTypesCollection|error`

Sample code:

```ballerina
users:SourceTypesCollection result = check usersClient->listSourceTypes(
    queries = {filter: "Direction eq 'In'"}
);
```

</details>

<details>
<summary>createSourceTypes</summary>

Creates a source type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:SourceType` | Yes | The source type to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:SourceType|error`

Sample code:

```ballerina
users:SourceType created = check usersClient->createSourceTypes({
    dataAreaId: "USMF",
    sourceTypeId: "INV-IN",
    description: "Inbound invoice source",
    direction: "In"
});
```

</details>

<details>
<summary>getSourceTypes</summary>

Reads a specific source type by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sourceTypeId` | `string` | Yes | The source type id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSourceTypesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:SourceType|error`

Sample code:

```ballerina
users:SourceType sourceType = check usersClient->getSourceTypes("USMF", "INV-IN");
```

</details>

<details>
<summary>deleteSourceTypes</summary>

Deletes a specific source type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sourceTypeId` | `string` | Yes | The source type id key field. |
| `headers` | `DeleteSourceTypesHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteSourceTypes("USMF", "INV-IN", {ifMatch: eTag});
```

</details>

<details>
<summary>updateSourceTypes</summary>

Updates a specific source type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sourceTypeId` | `string` | Yes | The source type id key field. |
| `payload` | `users:SourceType` | Yes | Fields to update. |
| `headers` | `UpdateSourceTypesHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:SourceType|error`

Sample code:

```ballerina
users:SourceType updated = check usersClient->updateSourceTypes(
    "USMF", "INV-IN",
    {description: "Updated inbound invoice source"},
    {ifMatch: eTag}
);
```

</details>

#### Sys AAD Clients

<details>
<summary>listSysAADClients</summary>

Lists Azure AD client registrations, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSysAADClientsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:SysAADClientsCollection|error`

Sample code:

```ballerina
users:SysAADClientsCollection result = check usersClient->listSysAADClients(
    queries = {filter: "UserId eq 'svc-integration-user'"}
);
```

</details>

<details>
<summary>createSysAADClients</summary>

Creates an Azure AD client registration linked to a Dynamics 365 user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:SysAADClient` | Yes | The client registration to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:SysAADClient|error`

Sample code:

```ballerina
users:SysAADClient created = check usersClient->createSysAADClients({
    userId: "svc-integration-user",
    aADClientId: "3f2b1c4a-1234-4a5b-9c6d-abcdef123456",
    name: "Integration service principal"
});
```

</details>

<details>
<summary>getSysAADClients</summary>

Reads a specific Azure AD client registration by its client ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `aADClientId` | `string` | Yes | The Azure AD client ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSysAADClientsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:SysAADClient|error`

Sample code:

```ballerina
users:SysAADClient client = check usersClient->getSysAADClients("3f2b1c4a-1234-4a5b-9c6d-abcdef123456");
```

</details>

<details>
<summary>deleteSysAADClients</summary>

Deletes a specific Azure AD client registration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `aADClientId` | `string` | Yes | The Azure AD client ID key field. |
| `headers` | `DeleteSysAADClientsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteSysAADClients("3f2b1c4a-1234-4a5b-9c6d-abcdef123456", {ifMatch: eTag});
```

</details>

<details>
<summary>updateSysAADClients</summary>

Updates a specific Azure AD client registration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `aADClientId` | `string` | Yes | The Azure AD client ID key field. |
| `payload` | `users:SysAADClient` | Yes | Fields to update. |
| `headers` | `UpdateSysAADClientsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:SysAADClient|error`

Sample code:

```ballerina
users:SysAADClient updated = check usersClient->updateSysAADClients(
    "3f2b1c4a-1234-4a5b-9c6d-abcdef123456",
    {name: "Updated integration service principal"},
    {ifMatch: eTag}
);
```

</details>

#### Sys Mon Datas

<details>
<summary>listSysMonDatas</summary>

Lists system monitoring data entries, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSysMonDatasQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:SysMonDatasCollection|error`

Sample code:

```ballerina
users:SysMonDatasCollection result = check usersClient->listSysMonDatas();
```

</details>

<details>
<summary>createSysMonDatas</summary>

Creates a system monitoring data entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:SysMonData` | Yes | The monitoring data entry to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:SysMonData|error`

Sample code:

```ballerina
users:SysMonData created = check usersClient->createSysMonDatas({
    description: "Nightly batch monitoring rule"
});
```

</details>

<details>
<summary>getSysMonDatas</summary>

Reads a specific system monitoring data entry by its description.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `description` | `string` | Yes | The description key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSysMonDatasQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:SysMonData|error`

Sample code:

```ballerina
users:SysMonData monitoringData = check usersClient->getSysMonDatas("Nightly batch monitoring rule");
```

</details>

<details>
<summary>deleteSysMonDatas</summary>

Deletes a specific system monitoring data entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `description` | `string` | Yes | The description key field. |
| `headers` | `DeleteSysMonDatasHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteSysMonDatas("Nightly batch monitoring rule", {ifMatch: eTag});
```

</details>

<details>
<summary>updateSysMonDatas</summary>

Updates a specific system monitoring data entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `description` | `string` | Yes | The description key field. |
| `payload` | `users:SysMonData` | Yes | Fields to update. |
| `headers` | `UpdateSysMonDatasHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:SysMonData|error`

Sample code:

```ballerina
users:SysMonData updated = check usersClient->updateSysMonDatas(
    "Nightly batch monitoring rule",
    {description: "Nightly batch monitoring rule - updated"},
    {ifMatch: eTag}
);
```

</details>

#### System Users

<details>
<summary>listSystemUsers</summary>

Lists system users, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSystemUsersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:SystemUsersCollection|error`

Sample code:

```ballerina
users:SystemUsersCollection result = check usersClient->listSystemUsers(
    queries = {filter: "Enabled eq true", top: 25, 'select: "UserID,UserName,Email,Enabled"}
);
```

</details>

<details>
<summary>createSystemUsers</summary>

Creates a system user account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:SystemUser` | Yes | The system user to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:SystemUser|error`

Sample code:

```ballerina
users:SystemUser created = check usersClient->createSystemUsers({
    userID: "jsmith",
    userName: "J. Smith",
    personName: "John Smith",
    email: "jsmith@contoso.com",
    company: "USMF",
    enabled: true,
    accountType: "ADUser",
    language: "en-us",
    preferredTimeZone: "GMTMINUS0800PACIFICTIME"
});
```

</details>

<details>
<summary>getSystemUsers</summary>

Reads a specific system user by their user ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userID` | `string` | Yes | The user id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSystemUsersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:SystemUser|error`

Sample code:

```ballerina
users:SystemUser systemUser = check usersClient->getSystemUsers("jsmith");
```

</details>

<details>
<summary>deleteSystemUsers</summary>

Deletes a specific system user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userID` | `string` | Yes | The user id key field. |
| `headers` | `DeleteSystemUsersHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteSystemUsers("jsmith", {ifMatch: eTag});
```

</details>

<details>
<summary>updateSystemUsers</summary>

Updates a specific system user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userID` | `string` | Yes | The user id key field. |
| `payload` | `users:SystemUser` | Yes | Fields to update. |
| `headers` | `UpdateSystemUsersHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:SystemUser|error`

Sample code:

```ballerina
users:SystemUser updated = check usersClient->updateSystemUsers(
    "jsmith",
    {enabled: false},
    {ifMatch: eTag}
);
```

</details>

#### User Groups

<details>
<summary>listUserGroups</summary>

Lists user groups, optionally filtered with OData query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListUserGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `users:UserGroupsCollection|error`

Sample code:

```ballerina
users:UserGroupsCollection result = check usersClient->listUserGroups();
```

</details>

<details>
<summary>createUserGroups</summary>

Creates a user group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `users:UserGroup` | Yes | The user group to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `users:UserGroup|error`

Sample code:

```ballerina
users:UserGroup created = check usersClient->createUserGroups({
    groupId: "AP-CLERKS",
    name: "Accounts payable clerks"
});
```

</details>

<details>
<summary>getUserGroups</summary>

Reads a specific user group by its group ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The group id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetUserGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `users:UserGroup|error`

Sample code:

```ballerina
users:UserGroup userGroup = check usersClient->getUserGroups("AP-CLERKS");
```

</details>

<details>
<summary>deleteUserGroups</summary>

Deletes a specific user group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The group id key field. |
| `headers` | `DeleteUserGroupsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check usersClient->deleteUserGroups("AP-CLERKS", {ifMatch: eTag});
```

</details>

<details>
<summary>updateUserGroups</summary>

Updates a specific user group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The group id key field. |
| `payload` | `users:UserGroup` | Yes | Fields to update. |
| `headers` | `UpdateUserGroupsHeaders` | No | Optional `ifMatch` ETag mapped to the `If-Match` header. |

Returns: `users:UserGroup|error`

Sample code:

```ballerina
users:UserGroup updated = check usersClient->updateUserGroups(
    "AP-CLERKS",
    {name: "Accounts payable clerks (updated)"},
    {ifMatch: eTag}
);
```

</details>
