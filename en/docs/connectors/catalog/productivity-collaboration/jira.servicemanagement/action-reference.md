---
connector: true
connector_name: "jira.servicemanagement"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Jira Servicemanagement connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage service desks, customer requests, request types, queues, customers, organizations, knowledge base articles, approvals, SLAs and Assets workspaces through the Jira Service Management Cloud REST API. |

---

## Client

The `Client` connects to the Jira Service Management Cloud REST API at your site URL (for example `https://your-domain.atlassian.net`). It exposes 75 operations.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;http:CredentialsConfig</code> | Required | Configurations related to client authentication |
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
import ballerinax/jira.servicemanagement;

configurable string serviceUrl = ?;
configurable string email = ?;
configurable string apiToken = ?;

final servicemanagement:Client servicemanagementClient = check new ({auth: {username: email, password: apiToken}}, serviceUrl);
```

### Operations

#### Assets workspaces

<details>
<summary>getAssetsWorkspaces</summary>

<div>

Get assets workspaces.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned workspace IDs. Base index: 0 See the [Pagination](#pagination) section for more details. Defaults to `0`. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of workspace IDs to return per page. Default: 50 See the [Pagination](#pagination) section for more details. Defaults to `50`. |

**Returns:** `PagedDTOAssetsWorkspaceDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOAssetsWorkspaceDTO result = check servicemanagementClient->getAssetsWorkspaces();
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "workspaceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

#### Customers

<details>
<summary>createCustomer</summary>

<div>

Create customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CustomerCreateDTO</code> | Yes | Email address and display name of the customer to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `strictConflictStatusCode` | <code>boolean</code> | No | Optional boolean flag to return 409 Conflict status code for duplicate customer creation request. |

**Returns:** `UserDTO|error`

**Sample code:**

```ballerina
servicemanagement:UserDTO result = check servicemanagementClient->createCustomer({
    displayName: "Sample name",
    fullName: "Sample name",
    email: "user@example.com"
});
```

**Sample response:**

```json
{
  "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": "user@example.com",
  "_links": {
    "jiraRest": "string",
    "self": "string"
  },
  "displayName": "Sample name",
  "name": "Sample name",
  "active": false
}
```

</div>
</details>

<details>
<summary>createCustomerSkipPermissionCheck</summary>

<div>

Create customer without permission check.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CustomerCreateDTO</code> | Yes | JSON body containing the email address and display name of the customer to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `strictConflictStatusCode` | <code>boolean</code> | No | Optional boolean flag; when \&#123;@code true\&#125;, returns 409 Conflict for duplicate email instead of the default 400. |

**Returns:** `UserDTO|error`

**Sample code:**

```ballerina
servicemanagement:UserDTO result = check servicemanagementClient->createCustomerSkipPermissionCheck({
    displayName: "Sample name",
    fullName: "Sample name",
    email: "user@example.com"
});
```

**Sample response:**

```json
{
  "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": "user@example.com",
  "_links": {
    "jiraRest": "string",
    "self": "string"
  },
  "displayName": "Sample name",
  "name": "Sample name",
  "active": false
}
```

</div>
</details>

<details>
<summary>revokePortalOnlyAccessForUser</summary>

<div>

Revoke portal only access for user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountId` | <code>string</code> | Yes | The account ID of the user, which uniquely identifies the portal-only account. For example, *qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b*. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->revokePortalOnlyAccessForUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Service information

<details>
<summary>getInfo</summary>

<div>

Get Jira Service Management instance info.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SoftwareInfoDTO|error`

**Sample code:**

```ballerina
servicemanagement:SoftwareInfoDTO result = check servicemanagementClient->getInfo();
```

**Sample response:**

```json
{
  "_links": {
    "self": "string"
  },
  "buildChangeSet": "string",
  "isLicensedForUse": false,
  "platformVersion": "string",
  "buildDate": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  },
  "version": "string"
}
```

</div>
</details>

#### Insight workspaces

<details>
<summary>getInsightWorkspaces</summary>

<div>

Get insight workspaces.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. Defaults to `0`. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of objects to return per page. Defaults to `50`. |

**Returns:** `PagedDTOInsightWorkspaceDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOInsightWorkspaceDTO result = check servicemanagementClient->getInsightWorkspaces();
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "workspaceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

#### Knowledge base

<details>
<summary>getArticles</summary>

<div>

Get articles.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `cursor` | <code>string</code> | No | Pointer to a set of search results, returned as part of the next or prev URL from the previous search call. |
| `highlight` | <code>boolean</code> | No | If set to true matching query term in the title and excerpt will be highlighted using the `@@@hl@@@term@@@endhl@@@` syntax. Default: false. Defaults to `false`. |
| `query` | <code>string</code> | Yes | The string used to filter the articles (required). |
| `prev` | <code>boolean</code> | No | Should navigate to the previous page. Defaulted to false. Set to true as part of prev URL from the previous search call. Defaults to `false`. |
| `'start` | <code>int:Signed32</code> | No | (Deprecated) The starting index of the returned objects. Base index: 0. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. |

**Returns:** `PagedDTOArticleDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOArticleDTO result = check servicemanagementClient->getArticles(query = "string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "excerpt": "string",
      "title": "string"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>viewArticle</summary>

<div>

View knowledge base article.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pageId` | <code>int</code> | Yes | The ID of the knowledge base article page. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check servicemanagementClient->viewArticle(1);
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

#### Organizations

<details>
<summary>getOrganizations</summary>

<div>

Get organizations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `accountId` | <code>string</code> | No | The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of organizations to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOOrganizationDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOOrganizationDTO result = check servicemanagementClient->getOrganizations();
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "scimManaged": false
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>createOrganization</summary>

<div>

Create organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>OrganizationCreateDTO</code> | Yes | Name of the organization to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationDTO|error`

**Sample code:**

```ballerina
servicemanagement:OrganizationDTO result = check servicemanagementClient->createOrganization({
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "_links": {
    "self": "string"
  },
  "created": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scimManaged": false,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getOrganization</summary>

<div>

Get organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>int:Signed32</code> | Yes | The ID of the organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `OrganizationDTO|error`

**Sample code:**

```ballerina
servicemanagement:OrganizationDTO result = check servicemanagementClient->getOrganization(1);
```

**Sample response:**

```json
{
  "_links": {
    "self": "string"
  },
  "created": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scimManaged": false,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteOrganization</summary>

<div>

Delete organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>int:Signed32</code> | Yes | The ID of the organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->deleteOrganization(1);
```

</div>
</details>

<details>
<summary>getPropertiesKeys</summary>

<div>

Get organization property keys.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The ID of the organization from which keys will be returned. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PropertyKeys|error`

**Sample code:**

```ballerina
servicemanagement:PropertyKeys result = check servicemanagementClient->getPropertiesKeys("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "keys": [
    {
      "self": "string",
      "key": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getProperty</summary>

<div>

Get organization property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The ID of the organization from which the property will be returned. |
| `propertyKey` | <code>string</code> | Yes | The key of the property to return. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EntityProperty|error`

**Sample code:**

```ballerina
servicemanagement:EntityProperty result = check servicemanagementClient->getProperty("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "value": "string",
  "key": "string"
}
```

</div>
</details>

<details>
<summary>setProperty</summary>

<div>

Set organization property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The ID of the organization on which the property will be set. |
| `propertyKey` | <code>string</code> | Yes | The key of the organization's property. The maximum length of the key is 255 bytes. |
| `payload` | <code>json</code> | Yes | The value of the property. The value has to be a valid, non-empty [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the property value is 32768 bytes. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `json|error`

**Sample code:**

```ballerina
json result = check servicemanagementClient->setProperty("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

**Sample response:**

The raw response content as `json`.

</div>
</details>

<details>
<summary>deleteProperty</summary>

<div>

Delete organization property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>string</code> | Yes | The ID of the organization from which the property will be removed. |
| `propertyKey` | <code>string</code> | Yes | The key of the property to remove. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->deleteProperty("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>getUsersInOrganization</summary>

<div>

Get users in organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>int:Signed32</code> | Yes | The ID of the organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of users to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOUserDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOUserDTO result = check servicemanagementClient->getUsersInOrganization(1);
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com",
      "displayName": "Sample name"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>addUsersToOrganization</summary>

<div>

Add users to organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>int:Signed32</code> | Yes | The ID of the organization. |
| `payload` | <code>UsersOrganizationUpdateDTO</code> | Yes | Account IDs of the users to add to the organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->addUsersToOrganization(1, {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    organizationId: 1,
    usernames: ["string"]
});
```

</div>
</details>

<details>
<summary>removeUsersFromOrganization</summary>

<div>

Remove users from organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | <code>int:Signed32</code> | Yes | The ID of the organization. |
| `payload` | <code>UsersOrganizationUpdateDTO</code> | Yes | Account IDs of the users to remove from the organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->removeUsersFromOrganization(1, {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    organizationId: 1,
    usernames: ["string"]
});
```

</div>
</details>

#### Customer requests

<details>
<summary>getCustomerRequests</summary>

<div>

Get customer requests.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `approvalStatus` | <code>string</code> | No | Filters results to customer requests based on their approval status: * `MY_PENDING_APPROVAL` returns customer requests pending the user's approval. * `MY_HISTORY_APPROVAL` returns customer requests where the user was an approver. **Note**: Valid only when used with requestOwnership=APPROVER. |
| `organizationId` | <code>int:Signed32</code> | No | Filters customer requests that belong to a specific organization (note that the user must be a member of that organization). **Note**: Valid only when used with requestOwnership=ORGANIZATION. |
| `expand` | <code>string[]</code> | No | A multi-value parameter indicating which properties of the customer request to expand, where: * `serviceDesk` returns additional details for each service desk. * `requestType` returns additional details for each request type. * `participant` returns the participant details, if any, for each customer request. * `sla` returns the SLA information on each customer request. * `status` returns the status transitions, in chronological order, for each customer request. * `attachment` returns the attachments for the customer request. * `action` returns the actions that the user can or cannot perform on this customer request. * `comment` returns the comments, if any, for each customer request. * `comment.attachment` returns the attachment details, if any, for each comment. * `comment.renderedBody` (Experimental) returns the rendered body in HTML format (in addition to the raw body) for each comment. |
| `searchTerm` | <code>string</code> | No | Filters customer requests where the request summary matches the `searchTerm`. [Wildcards](https://confluence.atlassian.com/display/JIRACORECLOUD/Search+syntax+for+text+fields) can be used in the `searchTerm` parameter. |
| `requestOwnership` | <code>string[]</code> | No | Filters customer requests using the following values: * `OWNED_REQUESTS` returns customer requests where the user is the creator. * `PARTICIPATED_REQUESTS` returns customer requests where the user is a participant. * `ORGANIZATION` returns customer requests for an organization of which the user is a member when used in conjunction with `organizationId`. * `ALL_ORGANIZATIONS` returns customer requests that belong to all organizations of which the user is a member. * `APPROVER` returns customer requests where the user is an approver. Can be used in conjunction with `approvalStatus` to filter pending or complete approvals. * `ALL_REQUESTS` returns all customer requests. **Deprecated and will be removed, as the returned requests may change if more values are added in the future. Instead, explicitly list the desired filtering strategies.** Multiple values of the query parameter are supported. For example, `requestOwnership=OWNED_REQUESTS&requestOwnership=PARTICIPATED_REQUESTS` will only return customer requests where the user is the creator or a participant. If not specified, filtering defaults to `OWNED_REQUESTS`, `PARTICIPATED_REQUESTS`, and `ALL_ORGANIZATIONS`. |
| `serviceDeskId` | <code>int:Signed32</code> | No | Filters customer requests by service desk. |
| `requestTypeId` | <code>int:Signed32</code> | No | Filters customer requests by request type. Note that the `serviceDeskId` must be specified for the service desk in which the request type belongs. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |
| `requestStatus` | <code>string</code> | No | Filters customer requests where the request is closed, open, or either of the two where: * `CLOSED_REQUESTS` returns customer requests that are closed. * `OPEN_REQUESTS` returns customer requests that are open. * `ALL_REQUESTS` returns all customer requests. |

**Returns:** `PagedDTOCustomerRequestDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOCustomerRequestDTO result = check servicemanagementClient->getCustomerRequests();
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "summary": "string",
      "issueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "issueKey": "string"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>createCustomerRequest</summary>

<div>

Create customer request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>RequestCreateDTO</code> | Yes | Service desk, request type and field values of the customer request to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerRequestDTO|error`

**Sample code:**

```ballerina
servicemanagement:CustomerRequestDTO result = check servicemanagementClient->createCustomerRequest({
    requestParticipants: ["string"],
    raiseOnBehalfOf: "string",
    serviceDeskId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    requestTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "summary": "string",
  "issueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "attachments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "comments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "issueKey": "string",
  "requestType": {
    "practice": "string",
    "helpText": "string",
    "serviceDeskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

</div>
</details>

<details>
<summary>validateCustomerRequest</summary>

<div>

Validate customer request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>RequestCreateDTO</code> | Yes | Service desk, request type and field values of the customer request to validate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RequestValidationResultDTO|error`

**Sample code:**

```ballerina
servicemanagement:RequestValidationResultDTO result = check servicemanagementClient->validateCustomerRequest({
    requestParticipants: ["string"],
    raiseOnBehalfOf: "string",
    serviceDeskId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    requestTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "valid": false,
  "errorMessages": [
    "string"
  ],
  "reasonKey": "string",
  "fieldErrors": [
    {
      "field": "string",
      "message": "string"
    }
  ],
  "errorMessage": "string",
  "formErrors": [
    {
      "code": "200",
      "detail": "string",
      "title": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCustomerRequestByIdOrKey</summary>

<div>

Get customer request by id or key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or Key of the customer request to be returned. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | A multi-value parameter indicating which properties of the customer request to expand, where: * `serviceDesk` returns additional service desk details. * `requestType` returns additional customer request type details. * `participant` returns the participant details. * `sla` returns the SLA information. * `status` returns the status transitions, in chronological order. * `attachment` returns the attachments. * `action` returns the actions that the user can or cannot perform. * `comment` returns the comments. * `comment.attachment` returns the attachment details for each comment. * `comment.renderedBody` (Experimental) return the rendered body in HTML format (in addition to the raw body) for each comment. |

**Returns:** `CustomerRequestDTO|error`

**Sample code:**

```ballerina
servicemanagement:CustomerRequestDTO result = check servicemanagementClient->getCustomerRequestByIdOrKey("string");
```

**Sample response:**

```json
{
  "summary": "string",
  "issueId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "attachments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "comments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "issueKey": "string",
  "requestType": {
    "practice": "string",
    "helpText": "string",
    "serviceDeskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

</div>
</details>

<details>
<summary>getApprovals</summary>

<div>

Get approvals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be queried for its approvals. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of approvals to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOApprovalDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOApprovalDTO result = check servicemanagementClient->getApprovals("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "canAnswerApproval": false,
      "name": "Sample name",
      "finalDecision": "approved"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getApprovalById</summary>

<div>

Get approval by id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request the approval is on. |
| `approvalId` | <code>int:Signed32</code> | Yes | The ID of the approval to be returned. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApprovalDTO|error`

**Sample code:**

```ballerina
servicemanagement:ApprovalDTO result = check servicemanagementClient->getApprovalById("string", 1);
```

**Sample response:**

```json
{
  "createdDate": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  },
  "_links": {
    "self": "string"
  },
  "canAnswerApproval": false,
  "name": "Sample name",
  "approvers": [
    {
      "approverDecision": "approved"
    }
  ],
  "finalDecision": "approved"
}
```

</div>
</details>

<details>
<summary>answerApproval</summary>

<div>

Answer approval.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be updated. |
| `approvalId` | <code>int:Signed32</code> | Yes | The ID of the approval to be updated. |
| `payload` | <code>ApprovalDecisionRequestDTO</code> | Yes | Approve or decline decision to record on the approval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApprovalDTO|error`

**Sample code:**

```ballerina
servicemanagement:ApprovalDTO result = check servicemanagementClient->answerApproval("string", 1, {
    decision: "approve"
});
```

**Sample response:**

```json
{
  "createdDate": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  },
  "_links": {
    "self": "string"
  },
  "canAnswerApproval": false,
  "name": "Sample name",
  "approvers": [
    {
      "approverDecision": "approved"
    }
  ],
  "finalDecision": "approved"
}
```

</div>
</details>

<details>
<summary>getAttachmentsForRequest</summary>

<div>

Get attachments for request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request from which the attachments will be listed. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned attachment. Base index: 0. See the [Pagination](#pagination) section for more details. Defaults to `0`. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of comments to return per page. Default: 50. See the [Pagination](#pagination) section for more details. Defaults to `50`. |

**Returns:** `PagedDTOAttachmentDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOAttachmentDTO result = check servicemanagementClient->getAttachmentsForRequest("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "filename": "import.csv",
      "size": 1,
      "mimeType": "string"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>createAttachment</summary>

<div>

Create comment with attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to which the attachment will be added. |
| `payload` | <code>AttachmentCreateDTO</code> | Yes | Temporary attachment IDs to attach, their visibility and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AttachmentCreateResultDTO|error`

**Sample code:**

```ballerina
servicemanagement:AttachmentCreateResultDTO result = check servicemanagementClient->createAttachment("string", {
    temporaryAttachmentIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    'public: false,
    additionalComment: {
        body: "string"
    }
});
```

**Sample response:**

```json
{
  "attachments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "comment": {
    "public": false,
    "_expands": [
      "string"
    ],
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

</div>
</details>

<details>
<summary>getAttachmentContent</summary>

<div>

Get attachment content.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key for the customer request the attachment is associated with. |
| `attachmentId` | <code>int</code> | Yes | The ID for the attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error?`

**Sample code:**

```ballerina
byte[]? result = check servicemanagementClient->getAttachmentContent("string", 1);
```

**Sample response:**

The raw response content as `byte[]?`.

</div>
</details>

<details>
<summary>getAttachmentThumbnail</summary>

<div>

Get attachment thumbnail.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key for the customer request the attachment is associated with. |
| `attachmentId` | <code>int</code> | Yes | The ID of the attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error?`

**Sample code:**

```ballerina
byte[]? result = check servicemanagementClient->getAttachmentThumbnail("string", 1);
```

**Sample response:**

The raw response content as `byte[]?`.

</div>
</details>

<details>
<summary>getRequestComments</summary>

<div>

Get request comments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request whose comments will be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `internal` | <code>boolean</code> | No | Specifies whether to return internal comments or not. Default: true. |
| `expand` | <code>string[]</code> | No | A multi-value parameter indicating which properties of the comment to expand: * `attachment` returns the attachment details, if any, for each comment. (If you want to get all attachments for a request, use [servicedeskapi/request/\&#123;issueIdOrKey\&#125;/attachment](#api-request-issueIdOrKey-attachment-get).) * `renderedBody` (Experimental) returns the rendered body in HTML format (in addition to the raw body) for each comment. |
| `'public` | <code>boolean</code> | No | Specifies whether to return public comments or not. Default: true. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned comments. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of comments to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOCommentDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOCommentDTO result = check servicemanagementClient->getRequestComments("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "public": false,
      "_expands": [
        "string"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>createRequestComment</summary>

<div>

Create request comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to which the comment will be added. |
| `payload` | <code>CommentCreateDTO</code> | Yes | Body and visibility of the comment to add to the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CommentDTO|error`

**Sample code:**

```ballerina
servicemanagement:CommentDTO result = check servicemanagementClient->createRequestComment("string", {
    'public: false,
    body: "string"
});
```

**Sample response:**

```json
{
  "renderedBody": {
    "html": "string"
  },
  "attachments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "public": false,
  "_links": {
    "self": "string"
  },
  "author": {
    "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "emailAddress": "user@example.com",
    "displayName": "Sample name"
  },
  "created": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  }
}
```

</div>
</details>

<details>
<summary>getRequestCommentById</summary>

<div>

Get request comment by id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request that contains the comment. |
| `commentId` | <code>int</code> | Yes | The ID of the comment to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | A multi-value parameter indicating which properties of the comment to expand: * `attachment` returns the attachment details, if any, for the comment. (If you want to get all attachments for a request, use [servicedeskapi/request/\&#123;issueIdOrKey\&#125;/attachment](#api-request-issueIdOrKey-attachment-get).) * `renderedBody` (Experimental) returns the rendered body in HTML format (in addition to the raw body) of the comment. |

**Returns:** `CommentDTO|error`

**Sample code:**

```ballerina
servicemanagement:CommentDTO result = check servicemanagementClient->getRequestCommentById("string", 1);
```

**Sample response:**

```json
{
  "renderedBody": {
    "html": "string"
  },
  "attachments": {
    "size": 1,
    "isLastPage": false,
    "_expands": [
      "string"
    ]
  },
  "public": false,
  "_links": {
    "self": "string"
  },
  "author": {
    "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "emailAddress": "user@example.com",
    "displayName": "Sample name"
  },
  "created": {
    "friendly": "string",
    "iso8601": "string",
    "epochMillis": 1
  }
}
```

</div>
</details>

<details>
<summary>getCommentAttachments</summary>

<div>

Get comment attachments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request that contains the comment. |
| `commentId` | <code>int</code> | Yes | The ID of the comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned comments. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of comments to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOAttachmentDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOAttachmentDTO result = check servicemanagementClient->getCommentAttachments("string", 1);
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "filename": "import.csv",
      "size": 1,
      "mimeType": "string"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getSubscriptionStatus</summary>

<div>

Get subscription status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be queried for subscription status. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RequestNotificationSubscriptionDTO|error`

**Sample code:**

```ballerina
servicemanagement:RequestNotificationSubscriptionDTO result = check servicemanagementClient->getSubscriptionStatus("string");
```

**Sample response:**

```json
{
  "subscribed": false
}
```

</div>
</details>

<details>
<summary>subscribe</summary>

<div>

Subscribe to request notifications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be subscribed to. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->subscribe("string");
```

</div>
</details>

<details>
<summary>unsubscribe</summary>

<div>

Unsubscribe.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be unsubscribed from. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->unsubscribe("string");
```

</div>
</details>

<details>
<summary>getRequestParticipants</summary>

<div>

Get request participants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be queried for its participants. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of request types to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOUserDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOUserDTO result = check servicemanagementClient->getRequestParticipants("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com",
      "displayName": "Sample name"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>addRequestParticipants</summary>

<div>

Add request participants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to have participants added. |
| `payload` | <code>RequestParticipantUpdateDTO</code> | Yes | Account IDs of the users to add as request participants. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PagedDTOUserDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOUserDTO result = check servicemanagementClient->addRequestParticipants("string", {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    usernames: ["string"]
});
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com",
      "displayName": "Sample name"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>removeRequestParticipants</summary>

<div>

Remove request participants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to have participants removed. |
| `payload` | <code>RequestParticipantUpdateDTO</code> | Yes | Account IDs of the users to remove as request participants. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PagedDTOUserDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOUserDTO result = check servicemanagementClient->removeRequestParticipants("string", {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    usernames: ["string"]
});
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com",
      "displayName": "Sample name"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getSlaInformation</summary>

<div>

Get sla information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request whose SLAs will be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of request types to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOSlaInformationDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOSlaInformationDTO result = check servicemanagementClient->getSlaInformation("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "slaDisplayFormat": "string",
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getSlaInformationById</summary>

<div>

Get sla information by id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request whose SLAs will be retrieved. |
| `slaMetricId` | <code>int</code> | Yes | The ID or key of the SLAs metric to be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SlaInformationDTO|error`

**Sample code:**

```ballerina
servicemanagement:SlaInformationDTO result = check servicemanagementClient->getSlaInformationById("string", 1);
```

**Sample response:**

```json
{
  "slaDisplayFormat": "string",
  "ongoingCycle": {
    "paused": false,
    "breached": false,
    "withinCalendarHours": false
  },
  "_links": {
    "self": "string"
  },
  "completedCycles": [
    {
      "breached": false
    }
  ],
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getCustomerRequestStatus</summary>

<div>

Get customer request status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request to be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOCustomerRequestStatusDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOCustomerRequestStatusDTO result = check servicemanagementClient->getCustomerRequestStatus("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "statusCategory": "UNDEFINED",
      "status": "string"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getCustomerTransitions</summary>

<div>

Get customer transitions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | The ID or key of the customer request whose transitions will be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOCustomerTransitionDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOCustomerTransitionDTO result = check servicemanagementClient->getCustomerTransitions("string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>performCustomerTransition</summary>

<div>

Perform customer transition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | <code>string</code> | Yes | ID or key of the issue to transition. |
| `payload` | <code>CustomerTransitionExecutionDTO</code> | Yes | ID of the transition to perform and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->performCustomerTransition("string", {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    additionalComment: {
        body: "string"
    }
});
```

</div>
</details>

<details>
<summary>getFeedback</summary>

<div>

Get feedback.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requestIdOrKey` | <code>string</code> | Yes | The id or the key of the request to post the feedback on. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CSATFeedbackFullDTO|error`

**Sample code:**

```ballerina
servicemanagement:CSATFeedbackFullDTO result = check servicemanagementClient->getFeedback("string");
```

**Sample response:**

```json
{
  "rating": 1,
  "comment": {
    "body": "string"
  },
  "type": "string"
}
```

</div>
</details>

<details>
<summary>postFeedback</summary>

<div>

Post feedback.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requestIdOrKey` | <code>string</code> | Yes | The id or the key of the request to post the feedback on. |
| `payload` | <code>CSATFeedbackFullDTO</code> | Yes | The feedback to be added on the request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CSATFeedbackFullDTO|error`

**Sample code:**

```ballerina
servicemanagement:CSATFeedbackFullDTO result = check servicemanagementClient->postFeedback("string", {
    rating: 1,
    comment: {
        body: "string"
    },
    'type: "string"
});
```

**Sample response:**

```json
{
  "rating": 1,
  "comment": {
    "body": "string"
  },
  "type": "string"
}
```

</div>
</details>

<details>
<summary>deleteFeedback</summary>

<div>

Delete feedback.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requestIdOrKey` | <code>string</code> | Yes | The id or the key of the request to post the feedback on. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->deleteFeedback("string");
```

</div>
</details>

#### Request types

<details>
<summary>getAllRequestTypes</summary>

<div>

Get all request types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Comma-separated list of entities to expand in the response. |
| `serviceDeskId` | <code>int:Signed32[]</code> | No | Filter the request types by service desk Ids provided. Multiple values of the query parameter are supported. For example, `serviceDeskId=1&serviceDeskId=2` will return request types only for service desks 1 and 2. |
| `searchQuery` | <code>string</code> | No | String to be used to filter the results. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |
| `includeHiddenRequestTypesInSearch` | <code>boolean</code> | No | Whether to include hidden request types when searching with `searchQuery`. Defaults to `false`. |
| `restrictionStatus` | <code>string</code> | No | Request type restriction status (`open` or `restricted`) used to filter the results. |

**Returns:** `PagedDTORequestTypeDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTORequestTypeDTO result = check servicemanagementClient->getAllRequestTypes();
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "practice": "string",
      "helpText": "string",
      "serviceDeskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

#### Service desks

<details>
<summary>getServiceDesks</summary>

<div>

Get service desks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOServiceDeskDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOServiceDeskDTO result = check servicemanagementClient->getServiceDesks();
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "projectKey": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "projectName": "Sample name"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getServiceDeskById</summary>

<div>

Get service desk by id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk to return. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ServiceDeskDTO|error`

**Sample code:**

```ballerina
servicemanagement:ServiceDeskDTO result = check servicemanagementClient->getServiceDeskById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "projectKey": "string",
  "_links": {
    "self": "string"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "projectName": "Sample name",
  "projectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "projectTypeKey": "string"
}
```

</div>
</details>

<details>
<summary>attachTemporaryFile</summary>

<div>

Attach temporary file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the Service Desk to which the file will be attached. This can alternatively be a [project identifier.](#project-identifiers). |
| `payload` | <code>AttachTemporaryFileRequest</code> | Yes | Files to upload as temporary attachments, as multipart form data. |
| `headers` | <code>AttachTemporaryFileHeaders</code> | No | Request headers. Optional fields: `xAtlassianToken`. Defaults to `{}`. |

**Returns:** `TemporaryAttachments|error`

**Sample code:**

```ballerina
servicemanagement:TemporaryAttachments result = check servicemanagementClient->attachTemporaryFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "temporaryAttachments": [
    {
      "fileName": "import.csv",
      "temporaryAttachmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCustomers</summary>

<div>

Get customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk the customer list should be returned from. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `query` | <code>string</code> | No | The string used to filter the customer list. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of users to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOUserDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOUserDTO result = check servicemanagementClient->getCustomers("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com",
      "displayName": "Sample name"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>addCustomers</summary>

<div>

Add customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk the customer list should be returned from. This can alternatively be a [project identifier.](#project-identifiers). |
| `payload` | <code>ServiceDeskCustomerDTO</code> | Yes | Account IDs of the customers to add to the service desk. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->addCustomers("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    usernames: ["string"]
});
```

</div>
</details>

<details>
<summary>removeCustomers</summary>

<div>

Remove customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk the customers should be removed from. This can alternatively be a [project identifier.](#project-identifiers). |
| `payload` | <code>ServiceDeskCustomerDTO</code> | Yes | Account IDs of the customers to remove from the service desk. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->removeCustomers("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    usernames: ["string"]
});
```

</div>
</details>

<details>
<summary>inviteCustomer</summary>

<div>

Invite customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk to which the newly created customer should be added. |
| `payload` | <code>ServiceDeskCustomerInviteDTO</code> | Yes | Email address and display name of the customer to invite. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `strictConflictStatusCode` | <code>boolean</code> | No | Optional boolean flag to return 409 Conflict status code when a customer with the same email already exists. |

**Returns:** `json|error`

**Sample code:**

```ballerina
json result = check servicemanagementClient->inviteCustomer("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    displayName: "Sample name",
    email: "user@example.com"
});
```

**Sample response:**

The raw response content as `json`.

</div>
</details>

<details>
<summary>addCustomersSkipPermissionCheck</summary>

<div>

Add customers without permission check.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk to add customers to. This can alternatively be a project identifier. |
| `payload` | <code>ServiceDeskCustomerDTO</code> | Yes | JSON body containing the account IDs of customers to add. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->addCustomersSkipPermissionCheck("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    usernames: ["string"]
});
```

</div>
</details>

<details>
<summary>getArticlesByServiceDeskId</summary>

<div>

Get articles of a service desk.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `cursor` | <code>string</code> | No | Pointer to a set of search results, returned as part of the next or prev URL from the previous search call. |
| `highlight` | <code>boolean</code> | No | If set to true matching query term in the title and excerpt will be highlighted using the `@@@hl@@@term@@@endhl@@@` syntax. Default: false. Defaults to `false`. |
| `query` | <code>string</code> | Yes | The string used to filter the articles (required). |
| `prev` | <code>boolean</code> | No | Should navigate to the previous page. Defaulted to false. Set to true as part of prev URL from the previous search call. Defaults to `false`. |
| `'start` | <code>int:Signed32</code> | No | (Deprecated) The starting index of the returned objects. Base index: 0. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the section for more details. |

**Returns:** `PagedDTOArticleDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOArticleDTO result = check servicemanagementClient->getArticlesByServiceDeskId("3fa85f64-5717-4562-b3fc-2c963f66afa6", query = "string");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "excerpt": "string",
      "title": "string"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getOrganizationsByServiceDeskId</summary>

<div>

Get organizations of a service desk.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk from which the organization list will be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `accountId` | <code>string</code> | No | The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOOrganizationDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOOrganizationDTO result = check servicemanagementClient->getOrganizationsByServiceDeskId("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "scimManaged": false
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>addOrganization</summary>

<div>

Add organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk to which the organization will be added. This can alternatively be a [project identifier.](#project-identifiers). |
| `payload` | <code>OrganizationServiceDeskUpdateDTO</code> | Yes | ID of the organization to add to the service desk. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->addOrganization("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    organizationId: 1,
    serviceDeskId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>removeOrganization</summary>

<div>

Remove organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk from which the organization will be removed. This can alternatively be a [project identifier.](#project-identifiers). |
| `payload` | <code>OrganizationServiceDeskUpdateDTO</code> | Yes | ID of the organization to remove from the service desk. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->removeOrganization("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    organizationId: 1,
    serviceDeskId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>getQueues</summary>

<div>

Get queues.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | ID of the service desk whose queues will be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |
| `includeCount` | <code>boolean</code> | No | Specifies whether to include each queue's customer request (issue) count in the response. Defaults to `false`. |

**Returns:** `PagedDTOQueueDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOQueueDTO result = check servicemanagementClient->getQueues("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "jql": "string",
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getQueue</summary>

<div>

Get a service desk queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | ID of the service desk whose queues will be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `queueId` | <code>int</code> | Yes | ID of the required queue. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `includeCount` | <code>boolean</code> | No | Specifies whether to include each queue's customer request (issue) count in the response. Defaults to `false`. |

**Returns:** `QueueDTO|error`

**Sample code:**

```ballerina
servicemanagement:QueueDTO result = check servicemanagementClient->getQueue("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "jql": "string",
  "_links": {
    "self": "string"
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fields": [
    "string"
  ],
  "issueCount": 1
}
```

</div>
</details>

<details>
<summary>getIssuesInQueue</summary>

<div>

Get issues in queue.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk containing the queue to be queried. This can alternatively be a [project identifier.](#project-identifiers). |
| `queueId` | <code>int</code> | Yes | The ID of the queue whose customer requests will be returned. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTOIssueBean|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTOIssueBean result = check servicemanagementClient->getIssuesInQueue("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "expand": "string",
      "self": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getRequestTypes</summary>

<div>

Get request types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk whose customer request types are to be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Comma-separated list of entities to expand in the response. |
| `groupId` | <code>int:Signed32</code> | No | Filters results to those in a customer request type group. |
| `searchQuery` | <code>string</code> | No | The string to be used to filter the results. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |
| `includeHiddenRequestTypesInSearch` | <code>boolean</code> | No | Whether to include hidden request types when searching with `searchQuery`. Defaults to `false`. |
| `restrictionStatus` | <code>string</code> | No | Request type restriction status (`open` or `restricted`) used to filter the results. |

**Returns:** `PagedDTORequestTypeDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTORequestTypeDTO result = check servicemanagementClient->getRequestTypes("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "practice": "string",
      "helpText": "string",
      "serviceDeskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>createRequestType</summary>

<div>

Create request type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk where the customer request type is to be created. This can alternatively be a [project identifier.](#project-identifiers). |
| `payload` | <code>RequestTypeCreateDTO</code> | Yes | Issue type, name and help text of the request type to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RequestTypeDTO|error`

**Sample code:**

```ballerina
servicemanagement:RequestTypeDTO result = check servicemanagementClient->createRequestType("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    issueTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    helpText: "string",
    name: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "practice": "string",
  "helpText": "string",
  "serviceDeskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_links": {
    "self": "string"
  },
  "icon": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>checkRequestTypePermissions</summary>

<div>

Check request type permissions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk. |
| `payload` | <code>RequestTypePermissionCheckRequestDTO</code> | Yes | Details of the permissions to check. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RequestTypePermissionCheckResponse|error`

**Sample code:**

```ballerina
servicemanagement:RequestTypePermissionCheckResponse result = check servicemanagementClient->checkRequestTypePermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    permissions: ["canCreateRequest"],
    requestTypeIds: [1]
});
```

**Sample response:**

```json
{
  "canAdminister": [
    1
  ],
  "canCreateRequest": [
    1
  ]
}
```

</div>
</details>

<details>
<summary>getRequestTypeById</summary>

<div>

Get request type by id.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk whose customer request type is to be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `requestTypeId` | <code>string</code> | Yes | The ID of the customer request type to be returned. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Comma-separated list of entities to expand in the response. |

**Returns:** `RequestTypeDTO|error`

**Sample code:**

```ballerina
servicemanagement:RequestTypeDTO result = check servicemanagementClient->getRequestTypeById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "practice": "string",
  "helpText": "string",
  "serviceDeskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_links": {
    "self": "string"
  },
  "icon": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteRequestType</summary>

<div>

Delete request type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID or [project identifier](#project-identifiers) of the service desk. |
| `requestTypeId` | <code>int:Signed32</code> | Yes | The ID of the request type. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->deleteRequestType("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

</div>
</details>

<details>
<summary>getRequestTypeFields</summary>

<div>

Get request type fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk containing the request types whose fields are to be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `requestTypeId` | <code>int:Signed32</code> | Yes | The ID of the request types whose fields are to be returned. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Use [expand](#expansion) to include additional information in the response. This parameter accepts `hiddenFields` that returns hidden fields associated with the request type. |

**Returns:** `CustomerRequestCreateMetaDTO|error`

**Sample code:**

```ballerina
servicemanagement:CustomerRequestCreateMetaDTO result = check servicemanagementClient->getRequestTypeFields("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "canRaiseOnBehalfOf": false,
  "canAddRequestParticipants": false,
  "requestTypeFields": [
    {
      "visible": false,
      "name": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPropertiesKeysByServiceDeskId</summary>

<div>

Get request type property keys.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requestTypeId` | <code>int:Signed32</code> | Yes | The ID of the request type for which keys will be retrieved. |
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk which contains the request type. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PropertyKeys|error`

**Sample code:**

```ballerina
servicemanagement:PropertyKeys result = check servicemanagementClient->getPropertiesKeysByServiceDeskId(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "keys": [
    {
      "self": "string",
      "key": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPropertyByServiceDeskId</summary>

<div>

Get request type property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk which contains the request type. This can alternatively be a [project identifier.](#project-identifiers). |
| `requestTypeId` | <code>int:Signed32</code> | Yes | The ID of the request type from which the property will be retrieved. |
| `propertyKey` | <code>string</code> | Yes | The key of the property to return. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EntityProperty|error`

**Sample code:**

```ballerina
servicemanagement:EntityProperty result = check servicemanagementClient->getPropertyByServiceDeskId("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, "string");
```

**Sample response:**

```json
{
  "value": "string",
  "key": "string"
}
```

</div>
</details>

<details>
<summary>setPropertyByServiceDeskId</summary>

<div>

Set request type property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk which contains the request type. This can alternatively be a [project identifier.](#project-identifiers). |
| `requestTypeId` | <code>int:Signed32</code> | Yes | The ID of the request type on which the property will be set. |
| `propertyKey` | <code>string</code> | Yes | The key of the request type property. The maximum length of the key is 255 bytes. |
| `payload` | <code>json</code> | Yes | The value of the request type property. The value has to be a valid, non-empty [JSON](https://tools.ietf.org/html/rfc4627) value. The maximum length of the property value is 32768 bytes. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `json|error`

**Sample code:**

```ballerina
json result = check servicemanagementClient->setPropertyByServiceDeskId("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, "string", "string");
```

**Sample response:**

The raw response content as `json`.

</div>
</details>

<details>
<summary>deletePropertyByServiceDeskId</summary>

<div>

Delete request type property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk which contains the request type. This can alternatively be a [project identifier.](#project-identifiers). |
| `requestTypeId` | <code>int:Signed32</code> | Yes | The ID of the request type for which the property will be removed. |
| `propertyKey` | <code>string</code> | Yes | The key of the property to remove. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check servicemanagementClient->deletePropertyByServiceDeskId("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, "string");
```

</div>
</details>

<details>
<summary>getRequestTypeGroups</summary>

<div>

Get request type groups.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceDeskId` | <code>string</code> | Yes | The ID of the service desk whose customer request type groups are to be returned. This can alternatively be a [project identifier.](#project-identifiers). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'start` | <code>int:Signed32</code> | No | The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. |
| `'limit` | <code>int:Signed32</code> | No | The maximum number of items to return per page. Default: 50. See the [Pagination](#pagination) section for more details. |

**Returns:** `PagedDTORequestTypeGroupDTO|error`

**Sample code:**

```ballerina
servicemanagement:PagedDTORequestTypeGroupDTO result = check servicemanagementClient->getRequestTypeGroups("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "size": 1,
  "_links": {
    "next": "string",
    "prev": "string",
    "context": "string"
  },
  "isLastPage": false,
  "values": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "_expands": [
    "string"
  ],
  "limit": 1
}
```

</div>
</details>
