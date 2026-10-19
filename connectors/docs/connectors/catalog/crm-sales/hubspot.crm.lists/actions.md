---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.lists` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages HubSpot CRM lists, memberships, folders, search, and legacy ID mapping. |

---

## Client

Manages HubSpot CRM lists, memberships, folders, search, and legacy ID mapping.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | OAuth 2.0 refresh token config, bearer token, or private app API key config. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `validation` | <code>boolean</code> | `true` | Enable or disable constraint validation. |
| `laxDataBinding` | <code>boolean</code> | `true` | Enable or disable lax data binding. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.lists as hslists;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hslists:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};

final hslists:Client hubspotClient = check new ({auth});
```

### Operations

#### List CRUD

<details>
<summary>Create a new list</summary>

Signature: `post /`

Creates a new list. The list can be MANUAL, DYNAMIC (filter-based), or SNAPSHOT.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ListCreateRequest</code> | Yes | List creation payload including `objectTypeId`, `processingType`, `name`, and optional `filterBranch`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListCreateResponse|error`

Sample code:

```ballerina
hslists:ListCreateResponse response = check hubspotClient->/.post({
    objectTypeId: "0-1",
    processingType: "MANUAL",
    name: "New Leads"
});
```

Sample response:

```ballerina
{
  "list": {
    "listId": "123456",
    "name": "New Leads",
    "objectTypeId": "0-1",
    "processingType": "MANUAL",
    "processingStatus": "COMPLETE",
    "listVersion": 1,
    "size": 0,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

</details>

<details>
<summary>Fetch a list by ID</summary>

Signature: `get /[string listId]`

Fetches a list by its ILS ID. Optionally includes filter definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list to fetch. |
| `queries` | <code>GetListIdGetByIdQueries</code> | No | Query parameters. `includeFilters` (default `false`): whether to include filter branch details. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListFetchResponse|error`

Sample code:

```ballerina
hslists:ListFetchResponse response = check hubspotClient->/["123456"].get();
```

Sample response:

```ballerina
{
  "list": {
    "listId": "123456",
    "name": "New Leads",
    "objectTypeId": "0-1",
    "processingType": "MANUAL",
    "processingStatus": "COMPLETE",
    "listVersion": 1,
    "size": 42,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-16T08:15:00.000Z"
  }
}
```

</details>

<details>
<summary>Fetch a list by name and object type</summary>

Signature: `get /object-type-id/[string objectTypeId]/name/[string listName]`

Fetches a list by its name and object type ID. The name match is not case sensitive.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectTypeId` | <code>string</code> | Yes | Object type ID (e.g., `"0-1"` for contacts, `"0-5"` for tickets). |
| `listName` | <code>string</code> | Yes | The name of the list to fetch. |
| `queries` | <code>GetObjectTypeIdObjectTypeIdNameListNameGetByNameQueries</code> | No | Query parameters. `includeFilters` (default `false`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListFetchResponse|error`

Sample code:

```ballerina
hslists:ListFetchResponse response = check hubspotClient->/"object-type-id"/["0-5"]/name/["High priority tickets"].get();
```

Sample response:

```ballerina
{
  "list": {
    "listId": "789012",
    "name": "High priority tickets",
    "objectTypeId": "0-5",
    "processingType": "DYNAMIC",
    "processingStatus": "COMPLETE",
    "listVersion": 3,
    "size": 15,
    "createdAt": "2025-01-10T09:00:00.000Z",
    "updatedAt": "2025-01-17T12:00:00.000Z"
  }
}
```

</details>

<details>
<summary>Fetch multiple lists by IDs</summary>

Signature: `get /`

Fetches multiple lists by their ILS IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | <code>GetGetAllQueries</code> | No | Query parameters. `listIds`: array of list IDs to fetch. `includeFilters` (default `false`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListsByIdResponse|error`

Sample code:

```ballerina
hslists:ListsByIdResponse response = check hubspotClient->/.get(queries = {listIds: ["123456", "789012"]});
```

Sample response:

```ballerina
{
  "lists": [
    {"listId": "123456", "name": "New Leads", "objectTypeId": "0-1", "processingType": "MANUAL", "processingStatus": "COMPLETE", "listVersion": 1, "size": 42},
    {"listId": "789012", "name": "High priority tickets", "objectTypeId": "0-5", "processingType": "DYNAMIC", "processingStatus": "COMPLETE", "listVersion": 3, "size": 15}
  ]
}
```

</details>

<details>
<summary>Search lists</summary>

Signature: `post /search`

Searches for lists by name query, processing types, or list IDs with pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ListSearchRequest</code> | Yes | Search parameters including `query`, `processingTypes`, `listIds`, `offset`, `count`, and `sort`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListSearchResponse|error`

Sample code:

```ballerina
hslists:ListSearchResponse response = check hubspotClient->/search.post({
    query: "Leads",
    count: 10,
    offset: 0
});
```

Sample response:

```ballerina
{
  "total": 2,
  "offset": 0,
  "hasMore": false,
  "lists": [
    {"listId": "123456", "name": "New Leads", "objectTypeId": "0-1", "processingType": "MANUAL", "size": 42},
    {"listId": "123457", "name": "Open Leads", "objectTypeId": "0-1", "processingType": "MANUAL", "size": 18}
  ]
}
```

</details>

<details>
<summary>Update a list name</summary>

Signature: `put /[string listId]/update-list-name`

Updates the name of an existing list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list to update. |
| `queries` | <code>PutListIdUpdateListNameUpdateNameQueries</code> | No | Query parameters. `listName`: the new name. `includeFilters` (default `false`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListUpdateResponse|error`

Sample code:

```ballerina
hslists:ListUpdateResponse response = check hubspotClient->/["123456"]/"update-list-name".put(queries = {listName: "Qualified Leads"});
```

Sample response:

```ballerina
{
  "updatedList": {
    "listId": "123456",
    "name": "Qualified Leads",
    "objectTypeId": "0-1",
    "processingType": "MANUAL",
    "processingStatus": "COMPLETE",
    "listVersion": 2,
    "size": 42
  }
}
```

</details>

<details>
<summary>Update list filter definition</summary>

Signature: `put /[string listId]/update-list-filters`

Updates the filter definition of a DYNAMIC list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list to update. |
| `payload` | <code>ListFilterUpdateRequest</code> | Yes | The new filter branch definition. |
| `queries` | <code>PutListIdUpdateListFiltersUpdateListFiltersQueries</code> | No | Query parameters. `enrollObjectsInWorkflows` (default `false`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListUpdateResponse|error`

Sample code:

```ballerina
hslists:ListFilterUpdateRequest payload = {
    filterBranch: {
        filterBranchType: "OR",
        filterBranchOperator: "OR",
        filterBranches: [{
            filterBranchType: "AND",
            filterBranchOperator: "AND",
            filterBranches: [],
            filters: [{
                filterType: "PROPERTY",
                property: "hs_ticket_priority",
                operation: {
                    operationType: "ENUMERATION",
                    operator: "IS_ANY_OF",
                    values: ["HIGH"],
                    includeObjectsWithNoValueSet: false
                }
            }]
        }],
        filters: []
    }
};
hslists:ListUpdateResponse response = check hubspotClient->/["789012"]/"update-list-filters".put(payload);
```

Sample response:

```ballerina
{
  "updatedList": {
    "listId": "789012",
    "name": "High priority tickets",
    "objectTypeId": "0-5",
    "processingType": "DYNAMIC",
    "processingStatus": "REFRESHING",
    "listVersion": 4,
    "size": 15
  }
}
```

</details>

<details>
<summary>Delete a list</summary>

Signature: `delete /[string listId]`

Deletes a list by its ILS ID. The list can be restored later.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["123456"].delete();
```

</details>

<details>
<summary>Restore a deleted list</summary>

Signature: `put /[string listId]/restore`

Restores a previously deleted list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list to restore. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["123456"]/restore.put();
```

</details>

#### Membership management

<details>
<summary>Add records to a list</summary>

Signature: `put /[string listId]/memberships/add`

Adds records to a MANUAL or SNAPSHOT list by record IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the MANUAL or SNAPSHOT list. |
| `payload` | <code>string[]</code> | Yes | Array of record IDs to add. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `MembershipsUpdateResponse|error`

Sample code:

```ballerina
hslists:MembershipsUpdateResponse response = check hubspotClient->/["123456"]/memberships/add.put(["85187972687", "85187972688", "85187972689"]);
```

Sample response:

```ballerina
{
  "recordsIdsAdded": ["85187972687", "85187972688", "85187972689"],
  "recordIdsMissing": []
}
```

</details>

<details>
<summary>Remove records from a list</summary>

Signature: `put /[string listId]/memberships/remove`

Removes records from a MANUAL or SNAPSHOT list by record IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the MANUAL or SNAPSHOT list. |
| `payload` | <code>string[]</code> | Yes | Array of record IDs to remove. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `MembershipsUpdateResponse|error`

Sample code:

```ballerina
hslists:MembershipsUpdateResponse response = check hubspotClient->/["123456"]/memberships/remove.put(["85187972687"]);
```

Sample response:

```ballerina
{
  "recordIdsRemoved": ["85187972687"],
  "recordIdsMissing": []
}
```

</details>

<details>
<summary>Add and remove records from a list</summary>

Signature: `put /[string listId]/memberships/add-and-remove`

Adds and/or removes records from a MANUAL or SNAPSHOT list in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the MANUAL or SNAPSHOT list. |
| `payload` | <code>MembershipChangeRequest</code> | Yes | Object with `recordIdsToAdd` and `recordIdsToRemove` arrays. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `MembershipsUpdateResponse|error`

Sample code:

```ballerina
hslists:MembershipsUpdateResponse response = check hubspotClient->/["123456"]/memberships/"add-and-remove".put({
    recordIdsToAdd: ["85187972690", "85187972691"],
    recordIdsToRemove: ["85187972687"]
});
```

Sample response:

```ballerina
{
  "recordsIdsAdded": ["85187972690", "85187972691"],
  "recordIdsRemoved": ["85187972687"],
  "recordIdsMissing": []
}
```

</details>

<details>
<summary>Add all records from another list</summary>

Signature: `put /[string listId]/memberships/add-from/[string sourceListId]`

Adds all records from a source list to a destination MANUAL or SNAPSHOT list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the destination list. |
| `sourceListId` | <code>string</code> | Yes | The ILS ID of the source list. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["123456"]/memberships/"add-from"/["789012"].put();
```

</details>

<details>
<summary>Remove all records from a list</summary>

Signature: `delete /[string listId]/memberships`

Removes all records from a MANUAL or SNAPSHOT list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the MANUAL or SNAPSHOT list. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["123456"]/memberships.delete();
```

</details>

<details>
<summary>Fetch list memberships</summary>

Signature: `get /[string listId]/memberships`

Fetches list memberships ordered by record ID, with cursor-based pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list. |
| `queries` | <code>GetListIdMembershipsGetPageQueries</code> | No | Query parameters. `limit` (default `100`), `before`, `after` for cursor pagination. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ApiCollectionResponseJoinTimeAndRecordId|error`

Sample code:

```ballerina
hslists:ApiCollectionResponseJoinTimeAndRecordId response = check hubspotClient->/["123456"]/memberships.get(queries = {'limit: 50});
```

Sample response:

```ballerina
{
  "total": 3,
  "results": [
    {"recordId": "85187972687", "addedAt": "2025-01-15T10:30:00.000Z"},
    {"recordId": "85187972688", "addedAt": "2025-01-15T10:31:00.000Z"},
    {"recordId": "85187972689", "addedAt": "2025-01-15T10:32:00.000Z"}
  ]
}
```

</details>

<details>
<summary>Fetch list memberships ordered by added date</summary>

Signature: `get /[string listId]/memberships/join-order`

Fetches list memberships ordered by the date each record was added to the list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | <code>string</code> | Yes | The ILS ID of the list. |
| `queries` | <code>GetListIdMembershipsJoinOrderGetPageOrderedByAddedToListDateQueries</code> | No | Query parameters. `limit` (default `100`), `before`, `after` for cursor pagination. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ApiCollectionResponseJoinTimeAndRecordId|error`

Sample code:

```ballerina
hslists:ApiCollectionResponseJoinTimeAndRecordId response = check hubspotClient->/["789012"]/memberships/"join-order".get();
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {"recordId": "85187972687", "addedAt": "2025-01-15T10:30:00.000Z"},
    {"recordId": "85187972688", "addedAt": "2025-01-16T14:20:00.000Z"}
  ]
}
```

</details>

<details>
<summary>Get lists for a record</summary>

Signature: `get /records/[string objectTypeId]/[string recordId]/memberships`

Gets all lists that a specific record is a member of.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectTypeId` | <code>string</code> | Yes | Object type ID of the record (e.g., `"0-1"` for contacts). |
| `recordId` | <code>string</code> | Yes | The ID of the record. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ApiCollectionResponseRecordListMembershipNoPaging|error`

Sample code:

```ballerina
hslists:ApiCollectionResponseRecordListMembershipNoPaging response = check hubspotClient->/records/["0-1"]/["85187972687"]/memberships.get();
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {"listId": "123456", "recordId": "85187972687", "listVersion": 1},
    {"listId": "123457", "recordId": "85187972687", "listVersion": 3}
  ]
}
```

</details>

#### Folder operations

<details>
<summary>Create a folder</summary>

Signature: `post /folders`

Creates a new folder to organize lists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ListFolderCreateRequest</code> | Yes | Folder creation payload with `name` and optional `parentFolderId`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListFolderCreateResponse|error`

Sample code:

```ballerina
hslists:ListFolderCreateResponse response = check hubspotClient->/folders.post({
    name: "Customer Support Tickets"
});
```

Sample response:

```ballerina
{
  "folder": {
    "id": 456,
    "name": "Customer Support Tickets",
    "parentFolderId": 0
  }
}
```

</details>

<details>
<summary>Retrieve folder contents</summary>

Signature: `get /folders`

Retrieves a folder and its contents by folder ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | <code>GetFoldersGetAllQueries</code> | No | Query parameters. `folderId` (default `"0"`: root folder). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListFolderFetchResponse|error`

Sample code:

```ballerina
hslists:ListFolderFetchResponse response = check hubspotClient->/folders.get(queries = {folderId: "456"});
```

Sample response:

```ballerina
{
  "folder": {
    "id": 456,
    "name": "Customer Support Tickets",
    "parentFolderId": 0
  }
}
```

</details>

<details>
<summary>Rename a folder</summary>

Signature: `put /folders/[string folderId]/rename`

Renames an existing folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The ID of the folder to rename. |
| `queries` | <code>PutFoldersFolderIdRenameRenameQueries</code> | No | Query parameters. `newFolderName`: the new name. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListFolderFetchResponse|error`

Sample code:

```ballerina
hslists:ListFolderFetchResponse response = check hubspotClient->/folders/["456"]/rename.put(queries = {newFolderName: "Support Tickets Archive"});
```

Sample response:

```ballerina
{
  "folder": {
    "id": 456,
    "name": "Support Tickets Archive",
    "parentFolderId": 0
  }
}
```

</details>

<details>
<summary>Move a folder</summary>

Signature: `put /folders/[string folderId]/move/[string newParentFolderId]`

Moves a folder to a new parent folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The ID of the folder to move. |
| `newParentFolderId` | <code>string</code> | Yes | The ID of the new parent folder. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `ListFolderFetchResponse|error`

Sample code:

```ballerina
hslists:ListFolderFetchResponse response = check hubspotClient->/folders/["456"]/move/["789"].put();
```

Sample response:

```ballerina
{
  "folder": {
    "id": 456,
    "name": "Customer Support Tickets",
    "parentFolderId": 789
  }
}
```

</details>

<details>
<summary>Move a list to a folder</summary>

Signature: `put /folders/move-list`

Moves a list to a specified folder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ListMoveRequest</code> | Yes | Object with `listId` and `newFolderId`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/folders/"move-list".put({
    listId: "123456",
    newFolderId: "456"
});
```

</details>

<details>
<summary>Delete a folder</summary>

Signature: `delete /folders/[string folderId]`

Deletes a folder by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The ID of the folder to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/folders/["456"].delete();
```

</details>

#### Legacy ID mapping

<details>
<summary>Translate a legacy list ID</summary>

Signature: `get /idmapping`

Translates a single legacy list ID to the modern ILS list ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | <code>GetIdmappingTranslateLegacyListIdToListIdQueries</code> | No | Query parameters. `legacyListId`: the legacy list ID to translate. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `PublicMigrationMapping|error`

Sample code:

```ballerina
hslists:PublicMigrationMapping response = check hubspotClient->/idmapping.get(queries = {legacyListId: "100"});
```

Sample response:

```ballerina
{
  "listId": "123456",
  "legacyListId": "100"
}
```

</details>

<details>
<summary>Translate legacy list IDs in batch</summary>

Signature: `post /idmapping`

Translates multiple legacy list IDs to modern ILS list IDs in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>string[]</code> | Yes | Array of legacy list IDs to translate. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Custom headers. |

Returns: `PublicBatchMigrationMapping|error`

Sample code:

```ballerina
hslists:PublicBatchMigrationMapping response = check hubspotClient->/idmapping.post(["100", "200", "300"]);
```

Sample response:

```ballerina
{
  "legacyListIdsToIdsMapping": [
    {"listId": "123456", "legacyListId": "100"},
    {"listId": "789012", "legacyListId": "200"}
  ],
  "missingLegacyListIds": ["300"]
}
```

</details>
