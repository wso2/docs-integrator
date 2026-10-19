---
title: Actions
---

# Actions

The `ballerinax/scim` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | SCIM 2.0 RESTful API client for user, group, bulk operations, service provider configuration, and resource type management. |

---

## Client

SCIM 2.0 RESTful API client for user, group, bulk operations, service provider configuration, and resource type management.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials grant configuration including `tokenUrl`, `clientId`, `clientSecret`, and `scopes`. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | The maximum time to wait (in seconds) for a response before closing the connection. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enables the inbound payload validation functionality provided by the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional. |

### Initializing the client

```ballerina
import ballerinax/scim;

configurable string orgName = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

scim:Client scimClient = check new (
    serviceUrl = string `https://api.asgardeo.io/t/${orgName}/scim2`,
    config = {
        auth: {
            tokenUrl: string `https://api.asgardeo.io/t/${orgName}/oauth2/token`,
            clientId: clientId,
            clientSecret: clientSecret,
            scopes: ["internal_user_mgt_list", "internal_user_mgt_view",
                     "internal_user_mgt_create", "internal_user_mgt_update",
                     "internal_user_mgt_delete", "internal_group_mgt_view",
                     "internal_group_mgt_create", "internal_group_mgt_update",
                     "internal_group_mgt_delete"]
        }
    }
);
```

### Operations

#### User operations

<details>
<summary>Filter Users</summary>

Retrieves a list of users, optionally filtered by a SCIM filter expression.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetUserQueries` | No | Query parameters including `filter`, `startIndex`, `count`, `domain`, `attributes`, and `excludedAttributes`. |

Returns: `UserObjectListResponseObject|error`

Sample code:

```ballerina
scim:UserObjectListResponseObject userList = check scimClient->/Users();
```

Sample response:

```ballerina
{
  "totalResults": 2,
  "startIndex": 1,
  "itemsPerPage": 2,
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "Resources": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "username": "john@example.com",
      "name": {"givenName": "John", "familyName": "Doe"},
      "meta": {"created": "2024-01-15T10:30:00Z", "lastModified": "2024-03-10T14:20:00Z", "resourceType": "User"}
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "username": "jane@example.com",
      "name": {"givenName": "Jane", "familyName": "Smith"},
      "meta": {"created": "2024-02-20T08:15:00Z", "lastModified": "2024-03-12T09:45:00Z", "resourceType": "User"}
    }
  ]
}
```

</details>

<details>
<summary>Create User</summary>

Creates a new user in the identity store.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Users_body` | Yes | The user object containing user details such as `userName`, `password`, `name`, `emails`, and schema information. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateUserQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `UserResponseObject|error`

Sample code:

```ballerina
scim:UserObject newUser = {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    userName: "alex@example.com",
    password: "SecureP@ss123",
    name: {
        givenName: "Alex",
        familyName: "Johnson"
    },
    emails: [{"value": "alex@example.com", "primary": true}]
};
scim:UserResponseObject createdUser = check scimClient->/Users.post(newUser);
```

Sample response:

```ballerina
{
  "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "username": "alex@example.com",
  "name": {"givenName": "Alex", "familyName": "Johnson"},
  "emails": [{"value": "alex@example.com"}],
  "meta": {"created": "2024-03-15T12:00:00Z", "lastModified": "2024-03-15T12:00:00Z", "resourceType": "User"}
}
```

</details>

<details>
<summary>Search Users</summary>

Searches for users using a SCIM search request body with filter, attributes, and pagination parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UserSearchRequestObject` | Yes | Search request with `schemas`, `filter`, `attributes`, `startIndex`, `count`, and `domain`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `UserObjectListResponseObject|error`

Sample code:

```ballerina
scim:UserSearchRequestObject searchReq = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],
    filter: "userName eq alex@example.com",
    startIndex: 1,
    count: 10
};
scim:UserObjectListResponseObject searchResult = check scimClient->/Users/\.search.post(searchReq);
```

Sample response:

```ballerina
{
  "totalResults": 1,
  "startIndex": 1,
  "itemsPerPage": 1,
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "Resources": [
    {
      "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
      "username": "alex@example.com",
      "name": {"givenName": "Alex", "familyName": "Johnson"},
      "meta": {"created": "2024-03-15T12:00:00Z", "lastModified": "2024-03-15T12:00:00Z", "resourceType": "User"}
    }
  ]
}
```

</details>

<details>
<summary>Get User by ID</summary>

Retrieves a specific user by their SCIM resource ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the user. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetUserByIdQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `UserResponseObject|error`

Sample code:

```ballerina
scim:UserResponseObject user = check scimClient->/Users/["c3d4e5f6-a7b8-9012-cdef-123456789012"];
```

Sample response:

```ballerina
{
  "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "username": "alex@example.com",
  "name": {"givenName": "Alex", "familyName": "Johnson"},
  "emails": [{"value": "alex@example.com"}],
  "meta": {"created": "2024-03-15T12:00:00Z", "lastModified": "2024-03-15T12:00:00Z", "resourceType": "User"}
}
```

</details>

<details>
<summary>Update User - PUT</summary>

Replaces all attributes of an existing user with the provided values (full update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the user. |
| `payload` | `UserUpdateObject` | Yes | The complete user object with updated field values. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateUserQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `UserResponseObject|error`

Sample code:

```ballerina
scim:UserUpdateObject updatedUser = {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
    userName: "alex@example.com",
    name: {
        givenName: "Alexander",
        familyName: "Johnson"
    },
    emails: [{"value": "alex@example.com", "primary": true}]
};
scim:UserResponseObject result = check scimClient->/Users/["c3d4e5f6-a7b8-9012-cdef-123456789012"].put(updatedUser);
```

Sample response:

```ballerina
{
  "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "username": "alex@example.com",
  "name": {"givenName": "Alexander", "familyName": "Johnson"},
  "emails": [{"value": "alex@example.com"}],
  "meta": {"created": "2024-03-15T12:00:00Z", "lastModified": "2024-03-16T09:30:00Z", "resourceType": "User"}
}
```

</details>

<details>
<summary>Update User - PATCH</summary>

Partially updates an existing user with the specified patch operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the user. |
| `payload` | `PatchOperationInput` | Yes | Patch operation input containing `schemas` and `Operations` array with `op` (add/remove/replace) and `value`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `PatchUserQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `UserResponseObject|error`

Sample code:

```ballerina
scim:PatchOperationInput patchOp = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    Operations: [
        {op: "replace", value: {nickName: "Alex J"}}
    ]
};
scim:UserResponseObject patchedUser = check scimClient->/Users/["c3d4e5f6-a7b8-9012-cdef-123456789012"].patch(patchOp);
```

Sample response:

```ballerina
{
  "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "username": "alex@example.com",
  "name": {"givenName": "Alexander", "familyName": "Johnson"},
  "meta": {"created": "2024-03-15T12:00:00Z", "lastModified": "2024-03-16T10:00:00Z", "resourceType": "User"}
}
```

</details>

<details>
<summary>Delete User by ID</summary>

Deletes a user from the identity store by their SCIM resource ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the user to delete. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check scimClient->/Users/["c3d4e5f6-a7b8-9012-cdef-123456789012"].delete();
```

</details>

#### Group operations

<details>
<summary>Filter Groups</summary>

Retrieves a list of groups, optionally filtered by a SCIM filter expression.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetGroupQueries` | No | Query parameters including `filter`, `startIndex`, `count`, `domain`, `attributes`, and `excludedAttributes`. |

Returns: `GroupsListResponseObject|error`

Sample code:

```ballerina
scim:GroupsListResponseObject groupList = check scimClient->/Groups();
```

Sample response:

```ballerina
{
  "totalResults": 2,
  "startIndex": 1,
  "itemsPerPage": 2,
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "Resources": [
    {
      "id": "d4e5f6a7-b8c9-0123-defg-234567890123",
      "displayName": "Engineering",
      "meta": {"created": "2024-01-10T08:00:00Z", "lastModified": "2024-03-01T10:00:00Z"}
    },
    {
      "id": "e5f6a7b8-c9d0-1234-efgh-345678901234",
      "displayName": "Marketing",
      "meta": {"created": "2024-01-12T09:30:00Z", "lastModified": "2024-02-28T15:00:00Z"}
    }
  ]
}
```

</details>

<details>
<summary>Create Group</summary>

Creates a new group in the identity store.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GroupRequestObject` | Yes | The group object containing `schemas`, `displayName`, and optional `members`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateGroupQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `GroupResponseObject|error`

Sample code:

```ballerina
scim:GroupRequestObject newGroup = {
    schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    displayName: "DevOps",
    members: [
        {"value": "c3d4e5f6-a7b8-9012-cdef-123456789012", "display": "alex@example.com"}
    ]
};
scim:GroupResponseObject createdGroup = check scimClient->/Groups.post(newGroup);
```

Sample response:

```ballerina
{
  "id": "f6a7b8c9-d0e1-2345-fghi-456789012345",
  "displayName": "DevOps",
  "members": [{"value": "c3d4e5f6-a7b8-9012-cdef-123456789012", "display": "alex@example.com"}],
  "meta": {"created": "2024-03-16T11:00:00Z", "lastModified": "2024-03-16T11:00:00Z", "resourceType": "Group"}
}
```

</details>

<details>
<summary>Search Groups</summary>

Searches for groups using a SCIM search request body with filter and pagination parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GroupSearchRequestObject` | Yes | Search request with `schemas`, `filter`, and `startIndex`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `GroupSearchResponseObject|error`

Sample code:

```ballerina
scim:GroupSearchRequestObject groupSearch = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:SearchRequest"],
    filter: "displayName eq DevOps"
};
scim:GroupSearchResponseObject groupSearchResult = check scimClient->/Groups/\.search.post(groupSearch);
```

Sample response:

```ballerina
{
  "totalResults": 1,
  "startIndex": 1,
  "itemsPerPage": 1,
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "Resources": [
    {
      "id": "f6a7b8c9-d0e1-2345-fghi-456789012345",
      "displayName": "DevOps",
      "meta": {"created": "2024-03-16T11:00:00Z", "lastModified": "2024-03-16T11:00:00Z"}
    }
  ]
}
```

</details>

<details>
<summary>Get Group by ID</summary>

Retrieves a specific group by its SCIM resource ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the group. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetGroupByIdQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `GroupResponseObject|error`

Sample code:

```ballerina
scim:GroupResponseObject group = check scimClient->/Groups/["f6a7b8c9-d0e1-2345-fghi-456789012345"];
```

Sample response:

```ballerina
{
  "id": "f6a7b8c9-d0e1-2345-fghi-456789012345",
  "displayName": "DevOps",
  "members": [{"value": "c3d4e5f6-a7b8-9012-cdef-123456789012", "display": "alex@example.com"}],
  "meta": {"created": "2024-03-16T11:00:00Z", "lastModified": "2024-03-16T11:00:00Z", "resourceType": "Group"}
}
```

</details>

<details>
<summary>Update Group - PUT</summary>

Replaces all attributes of an existing group with the provided values (full update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the group. |
| `payload` | `GroupPutRequestObject` | Yes | The complete group object with updated `displayName` and `members`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateGroupQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `GroupPutResponseObject|error`

Sample code:

```ballerina
scim:GroupPutRequestObject updatedGroup = {
    displayName: "DevOps Team",
    members: [
        {"value": "c3d4e5f6-a7b8-9012-cdef-123456789012", "display": "alex@example.com"},
        {"value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "display": "john@example.com"}
    ]
};
scim:GroupPutResponseObject updatedResult = check scimClient->/Groups/["f6a7b8c9-d0e1-2345-fghi-456789012345"].put(updatedGroup);
```

Sample response:

```ballerina
{
  "id": "f6a7b8c9-d0e1-2345-fghi-456789012345",
  "displayName": "DevOps Team",
  "members": [
    {"value": "c3d4e5f6-a7b8-9012-cdef-123456789012", "display": "alex@example.com"},
    {"value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "display": "john@example.com"}
  ],
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "meta": {"created": "2024-03-16T11:00:00Z", "lastModified": "2024-03-17T08:30:00Z"}
}
```

</details>

<details>
<summary>Update Group - PATCH</summary>

Partially updates an existing group with the specified patch operations (e.g., add/remove members).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the group. |
| `payload` | `PatchGroupOperationRequestObject` | Yes | Patch operation input containing `schemas` and `Operations` array with `op` (add/remove/replace) and `value`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `PatchGroupQueries` | No | Query parameters including `attributes` and `excludedAttributes`. |

Returns: `PatchGroupOperationResponseObject|error`

Sample code:

```ballerina
scim:PatchGroupOperationRequestObject groupPatch = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    Operations: [
        {
            op: "add",
            value: {
                members: [{"value": "b2c3d4e5-f6a7-8901-bcde-f12345678901", "display": "jane@example.com"}]
            }
        }
    ]
};
scim:PatchGroupOperationResponseObject patchedGroup = check scimClient->/Groups/["f6a7b8c9-d0e1-2345-fghi-456789012345"].patch(groupPatch);
```

Sample response:

```ballerina
{
  "id": "f6a7b8c9-d0e1-2345-fghi-456789012345",
  "displayName": "DevOps Team",
  "members": [
    {"value": "c3d4e5f6-a7b8-9012-cdef-123456789012", "display": "alex@example.com"},
    {"value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "display": "john@example.com"},
    {"value": "b2c3d4e5-f6a7-8901-bcde-f12345678901", "display": "jane@example.com"}
  ],
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"]
}
```

</details>

<details>
<summary>Delete Group</summary>

Deletes a group from the identity store by its SCIM resource ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The SCIM resource ID of the group to delete. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check scimClient->/Groups/["f6a7b8c9-d0e1-2345-fghi-456789012345"].delete();
```

</details>

#### Bulk operations

<details>
<summary>Bulk Create/Update/Replace/Delete Resources</summary>

Performs bulk create, update, replace, or delete operations on SCIM resources (users and/or groups) in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Bulk_body` | Yes | A bulk request object (one of `BulkUserCreateObject`, `BulkUserUpdateObject`, `BulkUserReplaceObject`, `BulkUserDeleteObject`, `BulkGroupCreateObject`, `BulkGroupUpdateObject`, `BulkGroupReplaceObject`, or `BulkGroupDeleteObject`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `BulkUserResponseObject|error`

Sample code:

```ballerina
scim:BulkUserCreateObject bulkReq = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
    failOnErrors: 1,
    Operations: [
        {
            method: "POST",
            path: "/Users",
            bulkId: "user1",
            data: {
                schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
                userName: "bulk.user1@example.com",
                password: "BulkP@ss1"
            }
        },
        {
            method: "POST",
            path: "/Users",
            bulkId: "user2",
            data: {
                schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
                userName: "bulk.user2@example.com",
                password: "BulkP@ss2"
            }
        }
    ]
};
scim:BulkUserResponseObject bulkResult = check scimClient->/Bulk.post(bulkReq);
```

Sample response:

```ballerina
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:BulkResponse"],
  "Operations": [
    {"bulkId": "user1", "method": "POST", "location": "/Users/aaa-bbb-ccc", "status": {"code": 201}},
    {"bulkId": "user2", "method": "POST", "location": "/Users/ddd-eee-fff", "status": {"code": 201}}
  ]
}
```

</details>

#### Discovery operations

<details>
<summary>Get Service Provider Config</summary>

Retrieves the SCIM Service Provider configuration, which describes the SCIM specification features available.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `SPConfigResponse|error`

Sample code:

```ballerina
scim:SPConfigResponse spConfig = check scimClient->/ServiceProviderConfig();
```

Sample response:

```ballerina
{
  "patch": {"supported": true},
  "bulk": {"supported": true, "maxOperations": 1000, "maxPayloadSize": 1048576},
  "filter": {"supported": true, "maxResults": 200},
  "changePassword": {"supported": true},
  "sort": {"supported": false},
  "etag": {"supported": false},
  "authenticationSchemes": [{"type": "oauthbearertoken", "name": "OAuth Bearer Token"}]
}
```

</details>

<details>
<summary>Get Resource Types</summary>

Retrieves the resource types supported by the SCIM service provider (e.g., User, Group).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `ResourceTypeResponse|error`

Sample code:

```ballerina
scim:ResourceTypeResponse resourceTypes = check scimClient->/ResourceTypes();
```

Sample response:

```ballerina
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
  "resourceType": [
    {
      "schema": "urn:ietf:params:scim:schemas:core:2.0:User",
      "endpoint": "/Users",
      "name": "User",
      "id": "User",
      "meta": {"location": "/ResourceTypes/User", "resourceType": "ResourceType"}
    },
    {
      "schema": "urn:ietf:params:scim:schemas:core:2.0:Group",
      "endpoint": "/Groups",
      "name": "Group",
      "id": "Group",
      "meta": {"location": "/ResourceTypes/Group", "resourceType": "ResourceType"}
    }
  ]
}
```

</details>
