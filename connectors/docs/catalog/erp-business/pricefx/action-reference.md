---
title: Actions
---

# Actions

The `ballerinax/pricefx` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the Pricefx Backend API for managing products, customers, sellers, price lists, calculation grids, quotes, contracts, rebate agreements, sales compensations, attachments, and more. |

---

## Client

### Configuration

#### PricefxCredentials

`PricefxCredentials` is a union of four records - `BasicCredentials`, `JwtCredentials`, `OAuth2Credentials`, or `ExternalJwtCredentials`. Pick the one matching the credentials you hold and pass it as the `auth` field of `ConnectionConfig`.

**BasicCredentials**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `username` | <code>string</code> | Required | Your Pricefx username |
| `password` | <code>string</code> | Required | Your Pricefx password |
| `partition` | <code>string</code> | Required | Your Pricefx partition name |

**JwtCredentials**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `jwt` | <code>string</code> | Required | A Pricefx-issued JWT you already hold, sent directly as the `X-PriceFx-jwt` header, with no exchange. Intended for the non-expiring integration tokens produced by `generateJwtToken` (or the time-limited ones from `generateTimedJwtToken`). Cannot be refreshed by the connector - a rejected token surfaces as an error rather than being retried, so avoid pasting in a short-lived session token here |

**OAuth2Credentials**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `clientId` | <code>string</code> | Required | The client identifier, as registered in Pricefx's `oauthConfiguration` |
| `clientSecret` | <code>string</code> | Optional | The client secret, if one was configured for this client |
| `refreshToken` | <code>string</code> | Required | A refresh token from a completed Authorization Code Grant flow |

**ExternalJwtCredentials**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `systemName` | <code>string</code> | Required | The external system's name, as configured in `externalJWTConfiguration` |
| `jwt` | <code>string</code> | Required | A JWT signed by that system |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Pricefx API.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>PricefxCredentials</code> | Required | How to authenticate - one of the four `PricefxCredentials` records above |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>oas:ClientHttp1Settings</code> | Optional | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | Optional | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>60</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | Optional | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | Optional | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side, treating `nil` values and absent fields as optional |

### Initializing the client

```ballerina
import ballerinax/pricefx;
import ballerinax/pricefx.oas;

configurable string username = ?;
configurable string password = ?;
configurable string partition = ?;
configurable string serviceUrl = ?;

pricefx:Client pricefxClient = check new ({auth: {username, password, partition}}, serviceUrl);
```

### Operations

#### User Admin

<details>
<summary>addUser</summary>

Add a User

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddUserRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UserResponse|error`

**Sample code:**

```ballerina
oas:UserResponse result = check pricefxClient->addUser(payload);
```

</details>

<details>
<summary>assignBusinessRole</summary>

Assign a Business Role

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AssignBusinessRoleRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignBusinessRoleResponse|error`

**Sample code:**

```ballerina
oas:AssignBusinessRoleResponse result = check pricefxClient->assignBusinessRole(payload);
```

</details>

<details>
<summary>assignBusinessRoleToUser</summary>

Assign a Business Role to a User

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | The ID of the user you want to assign a role to. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `payload` | <code>oas:AssignBusinessRoleToUserRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignBusinessRoleToUserResponse|error`

**Sample code:**

```ballerina
oas:AssignBusinessRoleToUserResponse result = check pricefxClient->assignBusinessRoleToUser(userId, payload);
```

</details>

<details>
<summary>assignGroupToBusinessRole</summary>

Assign a Group to a Business Role

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AssignGroupToBusinessRoleRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignGroupToBusinessRoleResponse|error`

**Sample code:**

```ballerina
oas:AssignGroupToBusinessRoleResponse result = check pricefxClient->assignGroupToBusinessRole(payload);
```

</details>

<details>
<summary>assignRoleToBusinessRole</summary>

Assign a Role to a Business Role

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AssignRoleToBusinessRoleRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignRoleToBusinessRoleResponse|error`

**Sample code:**

```ballerina
oas:AssignRoleToBusinessRoleResponse result = check pricefxClient->assignRoleToBusinessRole(payload);
```

</details>

<details>
<summary>assignRoleToUser</summary>

Assign a Role to a User

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | The ID of the user you want to assign a role to. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `payload` | <code>oas:AssignRoleToUserRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignRoleToUserResponse|error`

**Sample code:**

```ballerina
oas:AssignRoleToUserResponse result = check pricefxClient->assignRoleToUser(userId, payload);
```

</details>

<details>
<summary>assignRoleToUsers</summary>

Assign a Role to Users

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AssignRoleToUsersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignRoleToUsersResponse|error`

**Sample code:**

```ballerina
oas:AssignRoleToUsersResponse result = check pricefxClient->assignRoleToUsers(payload);
```

</details>

<details>
<summary>assignUserGroupToUsers</summary>

Assign a User Group to Users

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AssignUserGroupToUsersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignUserGroupToUsersResponse|error`

**Sample code:**

```ballerina
oas:AssignUserGroupToUsersResponse result = check pricefxClient->assignUserGroupToUsers(payload);
```

</details>

<details>
<summary>assignUserToUserGroup</summary>

Assign a User to a User Group

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | The ID of the user you want to add to the group. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `payload` | <code>oas:AssignUserToUserGroupRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignUserToUserGroupResponse|error`

**Sample code:**

```ballerina
oas:AssignUserToUserGroupResponse result = check pricefxClient->assignUserToUserGroup(userId, payload);
```

</details>

<details>
<summary>changeCurrentUserPassword</summary>

Change a Current User Password

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ChangeCurrentUserPasswordRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ChangeCurrentUserPasswordResponse|error`

**Sample code:**

```ballerina
oas:ChangeCurrentUserPasswordResponse result = check pricefxClient->changeCurrentUserPassword(payload);
```

</details>

<details>
<summary>changeUserPassword</summary>

Change a User Password

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | Enter the ID of the user whose password you want to change. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `payload` | <code>oas:ChangeUserPasswordRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ChangeUserPasswordResponse|error`

**Sample code:**

```ballerina
oas:ChangeUserPasswordResponse result = check pricefxClient->changeUserPassword(userId, payload);
```

</details>

<details>
<summary>copyRoles</summary>

Copy Roles + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CopyRolesRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CopyRolesResponse|error`

**Sample code:**

```ballerina
oas:CopyRolesResponse result = check pricefxClient->copyRoles(payload);
```

</details>

<details>
<summary>copyUser</summary>

Copy a User

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userid` | <code>string</code> | Yes | The ID of the user you want to copy. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CopyUserResponse|error`

**Sample code:**

```ballerina
oas:CopyUserResponse result = check pricefxClient->copyUser(userid);
```

</details>

<details>
<summary>deleteBusinessRole</summary>

Delete a Business Role

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteBusinessRoleRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteBusinessRoleResponse|error`

**Sample code:**

```ballerina
oas:DeleteBusinessRoleResponse result = check pricefxClient->deleteBusinessRole(payload);
```

</details>

<details>
<summary>deleteUser</summary>

Delete a User

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteUserRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UserResponse|error`

**Sample code:**

```ballerina
oas:UserResponse result = check pricefxClient->deleteUser(payload);
```

</details>

<details>
<summary>deleteUserGroup</summary>

Delete a User Group

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteUserGroupRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteUserGroupResponse|error`

**Sample code:**

```ballerina
oas:DeleteUserGroupResponse result = check pricefxClient->deleteUserGroup(payload);
```

</details>

<details>
<summary>generateJwtToken</summary>

Generate a JWT Token

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:GenerateJWTTokenRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenerateJWTTokenResponse|error`

**Sample code:**

```ballerina
oas:GenerateJWTTokenResponse result = check pricefxClient->generateJwtToken(payload);
```

</details>

<details>
<summary>generateTimedJwtToken</summary>

Generate a JWT Token (time limited)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `minutes` | <code>string</code> | Yes | The number of minutes in which the token expires |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenerateJWTTokenTimeLimitedResponse|error`

**Sample code:**

```ballerina
oas:GenerateJWTTokenTimeLimitedResponse result = check pricefxClient->generateTimedJwtToken(minutes);
```

</details>

<details>
<summary>getOneTimeToken</summary>

Get a One Time Token

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetOneTimeTokenResponse|error`

**Sample code:**

```ballerina
oas:GetOneTimeTokenResponse result = check pricefxClient->getOneTimeToken();
```

</details>

<details>
<summary>getUserAuditReport</summary>

Get a User Audit Report

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"R"&#124;"UG"&#124;"BR"</code> | Yes | Specify whether you want to retrieve a report based on user roles (`R`), user groups (`UG`), or business roles (`BR`) |
| `id` | <code>string</code> | Yes | Specify the `id`of the user role, user group, or business role for which you want to retrieve users. Call the `/fetch/R`, `/fetch/UG`, or `/fetch/BR` endpoint to retrieve a list with corresponding user roles, user groups, or business roles |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UserAuditReportEnvelope|error`

**Sample code:**

```ballerina
oas:UserAuditReportEnvelope result = check pricefxClient->getUserAuditReport(typeCode, id, payload);
```

</details>

<details>
<summary>listGroupsOfBusinessRole</summary>

List Groups of the Business Role

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `businessroleId` | <code>string</code> | Yes | The ID of the business role you want to retrieve user roles for. The `businessroleId` is the `typedId` without the `BR` suffix. For example, `businessroleId` of the **53.BR** is **53** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListGroupsOfBusinessRoleResponse|error`

**Sample code:**

```ballerina
oas:ListGroupsOfBusinessRoleResponse result = check pricefxClient->listGroupsOfBusinessRole(businessroleId);
```

</details>

<details>
<summary>listRolesOfBusinessRole</summary>

List Roles of the Business Role

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `businessroleId` | <code>string</code> | Yes | The ID of the business role you want to retrieve user roles for. The `businessroleId` is the `typedId` without the `BR` suffix. For example, `businessroleId` of the **53.BR** is **53** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListRolesOfBusinessRoleResponse|error`

**Sample code:**

```ballerina
oas:ListRolesOfBusinessRoleResponse result = check pricefxClient->listRolesOfBusinessRole(businessroleId);
```

</details>

<details>
<summary>listUserSBusinessRoles</summary>

List User's Business Roles

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | The ID of the user you want to retrieve business roles for. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListUserBusinessRolesResponse|error`

**Sample code:**

```ballerina
oas:ListUserBusinessRolesResponse result = check pricefxClient->listUserSBusinessRoles(userId);
```

</details>

<details>
<summary>listUserSRoles</summary>

List User's Roles

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | The ID of the user you want to retrieve roles for. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListUserRolesResponse|error`

**Sample code:**

```ballerina
oas:ListUserRolesResponse result = check pricefxClient->listUserSRoles(userId);
```

</details>

<details>
<summary>listUserSUserGroups</summary>

List User's User Groups

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | The ID of the user you want to retrieve groups for. The `userId` is the `typedId` without the `U` suffix. For example, `userId` of the **2147490806.U** is **2147490806** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListUsersUserGroupsResponse|error`

**Sample code:**

```ballerina
oas:ListUsersUserGroupsResponse result = check pricefxClient->listUserSUserGroups(userId);
```

</details>

<details>
<summary>listUsers</summary>

List Users

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListUsersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListUsersResponse|error`

**Sample code:**

```ballerina
oas:ListUsersResponse result = check pricefxClient->listUsers(payload);
```

</details>

<details>
<summary>updateUser</summary>

Update a User

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateUserRequest</code> | Yes | Specify the user by `typedId` and define the new value of the field you want to update in the `data` object |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UserResponse|error`

**Sample code:**

```ballerina
oas:UserResponse result = check pricefxClient->updateUser(payload);
```

</details>

#### Products

<details>
<summary>addProduct</summary>

Add a Product

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddProductRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->addProduct(payload);
```

</details>

<details>
<summary>bulkInsertProducts</summary>

Insert Bulk Products

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:InsertBulkProductsRequest</code> | Yes | Specify product field names in the `header` object and fields values in the `data` object.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LoadDataResponse|error`

**Sample code:**

```ballerina
oas:LoadDataResponse result = check pricefxClient->bulkInsertProducts(payload);
```

</details>

<details>
<summary>deleteProduct</summary>

Delete a Product

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteProductRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteProductResponse|error`

**Sample code:**

```ballerina
oas:DeleteProductResponse result = check pricefxClient->deleteProduct(payload);
```

</details>

<details>
<summary>getProductBomTree</summary>

List BoM for a Product

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sku` | <code>string</code> | Yes | The `sku` of the product you want to retrieve the Bill of Materials for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListBoMForProductResponse|error`

**Sample code:**

```ballerina
oas:ListBoMForProductResponse result = check pricefxClient->getProductBomTree(sku);
```

</details>

<details>
<summary>listProducts</summary>

List Products

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListProductsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->listProducts(payload);
```

</details>

<details>
<summary>listRecommendations</summary>

List Recommendations

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListRecommendationsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListRecommendationsEnvelope|error`

**Sample code:**

```ballerina
oas:ListRecommendationsEnvelope result = check pricefxClient->listRecommendations(payload);
```

</details>

<details>
<summary>searchProducts</summary>

Search a Product

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SearchProductRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SearchProductResponse|error`

**Sample code:**

```ballerina
oas:SearchProductResponse result = check pricefxClient->searchProducts(payload);
```

</details>

<details>
<summary>searchProductsByQuery</summary>

Search a Product (URL)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `query` | <code>string</code> | Yes | The query to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SearchProductURLResponse|error`

**Sample code:**

```ballerina
oas:SearchProductURLResponse result = check pricefxClient->searchProductsByQuery(query);
```

</details>

<details>
<summary>updateProduct</summary>

Update a Product

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateProductRequest</code> | Yes | Updates specified fields of the record. Only one record can be updated per request (unless batched).&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->updateProduct(payload);
```

</details>

<details>
<summary>upsertProduct</summary>

Upsert a Product

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertProductRequest</code> | Yes | Either `sku` or `typedId` must be specified in order to *update* an existing product |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->upsertProduct(payload);
```

</details>

#### Product Extensions

<details>
<summary>deleteProductExtension</summary>

Delete a Product Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteProductExtensionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteProductExtensionResponse|error`

**Sample code:**

```ballerina
oas:DeleteProductExtensionResponse result = check pricefxClient->deleteProductExtension(payload);
```

</details>

<details>
<summary>getProductAttributeMeta</summary>

Get Product Attribute Meta

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductAttributeMetaEnvelope|error`

**Sample code:**

```ballerina
oas:ProductAttributeMetaEnvelope result = check pricefxClient->getProductAttributeMeta(payload);
```

</details>

<details>
<summary>insertBulkProductExtensions</summary>

Insert Bulk Product Extensions

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:InsertBulkProductExtensionsRequest</code> | Yes | Specify product extension field names in the `header` object and field values in the `data` object |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->insertBulkProductExtensions(payload);
```

</details>

<details>
<summary>listProductExtensionObjects</summary>

List Product Extension Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `productMasterExtensionName` | <code>string</code> | Yes | Enter the name of Product Extension you want to retrieve objects from. You can find the name in **Administration** &gt; **Configuration** &gt; **Master Data** &gt; **Product Master Extension** or using the **/configurationmanager.get/productextension** endpoint |
| `payload` | <code>oas:ListProductExtensionObjectsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListProductExtensionObjectsQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ProductExtensionResponse|error`

**Sample code:**

```ballerina
oas:ProductExtensionResponse result = check pricefxClient->listProductExtensionObjects(productMasterExtensionName, payload, queries);
```

</details>

<details>
<summary>upsertProductExtension</summary>

Upsert a Product Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertProductExtensionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->upsertProductExtension(payload);
```

</details>

#### Product Image

<details>
<summary>deleteUploadSlotViaGet</summary>

3. Delete an Upload Slot

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `slotId` | <code>string</code> | Yes | Enter the ID of the slot you want to delete |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteUploadSlotResponse|error`

**Sample code:**

```ballerina
oas:DeleteUploadSlotResponse result = check pricefxClient->deleteUploadSlotViaGet(slotId);
```

</details>

<details>
<summary>getNewUploadSlot</summary>

1. Create an Upload Slot

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CreateUploadSlotResponse|error`

**Sample code:**

```ballerina
oas:CreateUploadSlotResponse result = check pricefxClient->getNewUploadSlot();
```

</details>

<details>
<summary>uploadProductImage</summary>

2. Upload a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `slotId` | <code>string</code> | Yes | Enter the ID of the slot you want to use for the upload |
| `sku` | <code>string</code> | Yes | Enter the `sku` of the product you want to add the product image to |
| `payload` | <code>oas:TypedIdslotIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->uploadProductImage(slotId, sku, payload);
```

</details>

#### Competition Data

<details>
<summary>getProductCompetition</summary>

Get Competition Data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:GetCompetitionDataRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetCompetitionDataResponse|error`

**Sample code:**

```ballerina
oas:GetCompetitionDataResponse result = check pricefxClient->getProductCompetition(payload);
```

</details>

<details>
<summary>getProductSetCompetition</summary>

Get a Product Set

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `label` | <code>string</code> | Yes | Enter the name of the product set you want to retrieve |
| `payload` | <code>oas:GetProductSetRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetProductSetResponse|error`

**Sample code:**

```ballerina
oas:GetProductSetResponse result = check pricefxClient->getProductSetCompetition(label, payload);
```

</details>

<details>
<summary>importProductCompetition</summary>

Import Competition Data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ImportCompetitionDataRequest</code> | Yes | The competition product details |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ImportCompetitionDataResponse|error`

**Sample code:**

```ballerina
oas:ImportCompetitionDataResponse result = check pricefxClient->importProductCompetition(payload);
```

</details>

<details>
<summary>listProductSets</summary>

List Product Sets

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListProductSetsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListProductSetsResponse|error`

**Sample code:**

```ballerina
oas:ListProductSetsResponse result = check pricefxClient->listProductSets(payload);
```

</details>

#### Customers

<details>
<summary>addCustomer</summary>

Add a Customer

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCustomerRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomerResponse|error`

**Sample code:**

```ballerina
oas:CustomerResponse result = check pricefxClient->addCustomer(payload);
```

</details>

<details>
<summary>assignCustomers</summary>

Assign Customers

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AssignCustomersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignmentResponse|error`

**Sample code:**

```ballerina
oas:AssignmentResponse result = check pricefxClient->assignCustomers(payload);
```

</details>

<details>
<summary>bulkInsertCustomers</summary>

Insert Bulk Customers

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:InsertBulkCustomersRequest</code> | Yes | Specify customer field names in the `header` object and fields values in the `data` object.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LoadDataResponse|error`

**Sample code:**

```ballerina
oas:LoadDataResponse result = check pricefxClient->bulkInsertCustomers(payload);
```

</details>

<details>
<summary>deleteCustomer</summary>

Delete a Customer

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCustomerRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCustomerResponse|error`

**Sample code:**

```ballerina
oas:DeleteCustomerResponse result = check pricefxClient->deleteCustomer(payload);
```

</details>

<details>
<summary>getCustomer</summary>

Get a Customer

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Customer you want to retrieve details for. The `id` is the `typedId` without the **C** suffix. For example, the `id` parameter of the item with `typedId` = **2147492200.C**  is **2147492200** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomerResponse|error`

**Sample code:**

```ballerina
oas:CustomerResponse result = check pricefxClient->getCustomer(id);
```

</details>

<details>
<summary>listCustomerAssignments</summary>

List Customer Assignments

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the entity you want to retrieve assignments for |
| `payload` | <code>oas:ListCustomerAssignmentsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AssignmentResponse|error`

**Sample code:**

```ballerina
oas:AssignmentResponse result = check pricefxClient->listCustomerAssignments(typedId, payload);
```

</details>

<details>
<summary>listCustomers</summary>

List Customers

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListCustomersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomerResponse|error`

**Sample code:**

```ballerina
oas:CustomerResponse result = check pricefxClient->listCustomers(payload);
```

</details>

<details>
<summary>updateCustomer</summary>

Update a Customer + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCustomerRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomerResponse|error`

**Sample code:**

```ballerina
oas:CustomerResponse result = check pricefxClient->updateCustomer(payload);
```

</details>

<details>
<summary>upsertCustomer</summary>

Upsert a Customer

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertCustomerRequest</code> | Yes | If the customer does not exist yet, at least the `customerId` must be specified in the payload.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomerResponse|error`

**Sample code:**

```ballerina
oas:CustomerResponse result = check pricefxClient->upsertCustomer(payload);
```

</details>

#### Customer Extensions

<details>
<summary>deleteCustomerExtension</summary>

Delete a Customer Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCustomerExtensionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCustomerExtensionResponse|error`

**Sample code:**

```ballerina
oas:DeleteCustomerExtensionResponse result = check pricefxClient->deleteCustomerExtension(payload);
```

</details>

<details>
<summary>insertBulkCustomerExtensions</summary>

Insert Bulk Customer Extensions

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:InsertBulkCustomerExtensionsRequest</code> | Yes | Specify customer extension field names in the `header` object and field values in the `data` object.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LoadDataResponse|error`

**Sample code:**

```ballerina
oas:LoadDataResponse result = check pricefxClient->insertBulkCustomerExtensions(payload);
```

</details>

<details>
<summary>listCustomerExtensionObjects</summary>

List Customer Extension Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `customerMasterExtensionName` | <code>string</code> | Yes | Enter the name of Customer Extension you want to retrieve objects from. You can find the name in **Administration** &gt; **Configuration** &gt; **Master Data** &gt; **Customer Master Extension** or using the **/configurationmanager.get/customerextension** endpoint |
| `payload` | <code>oas:ListCustomerExtensionObjectsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListCustomerExtensionObjectsQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ListCustomerExtensionObjectsResponse|error`

**Sample code:**

```ballerina
oas:ListCustomerExtensionObjectsResponse result = check pricefxClient->listCustomerExtensionObjects(customerMasterExtensionName, payload, queries);
```

</details>

<details>
<summary>uploadFileToPxCxSx</summary>

Upload a File to PX/CX/SX

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"PX"&#124;"CX"&#124;"SX"</code> | Yes | Type code of the table you want to upload the file to |
| `target` | <code>string</code> | Yes | The name of the PX/CX/SX table |
| `uploadSlotId` | <code>string</code> | Yes | `id` of the upload slot. Use the **uploadslotmanager.newuploadslot** endpoint to retrieve the `id` |
| `payload` | <code>oas:TargetuploadSlotIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:UploadFileToPxCxSxQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->uploadFileToPxCxSx(typeCode, target, uploadSlotId, payload, queries);
```

</details>

<details>
<summary>upsertCustomerExtension</summary>

Upsert a Customer Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertCustomerExtensionRequest</code> | Yes | **Please note**: The data sent in your request might be different from our sample request schema. Custom fields (`attribute1`..`attribute30`) can be retrieved using the **`/fetch/CXAM`** operation |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpsertCustomerExtensionResponse|error`

**Sample code:**

```ballerina
oas:UpsertCustomerExtensionResponse result = check pricefxClient->upsertCustomerExtension(payload);
```

</details>

#### Sellers

<details>
<summary>addSeller</summary>

Add a Seller

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddSellerRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddSellerEnvelope|error`

**Sample code:**

```ballerina
oas:AddSellerEnvelope result = check pricefxClient->addSeller(payload);
```

</details>

<details>
<summary>deleteSeller</summary>

Delete a Seller

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteSellerRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteSellerEnvelope|error`

**Sample code:**

```ballerina
oas:DeleteSellerEnvelope result = check pricefxClient->deleteSeller(payload);
```

</details>

<details>
<summary>listSellers</summary>

List Sellers

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListSellersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListSellersEnvelope|error`

**Sample code:**

```ballerina
oas:ListSellersEnvelope result = check pricefxClient->listSellers(payload);
```

</details>

<details>
<summary>updateSeller</summary>

Update a Seller

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateSellerRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateSellerEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateSellerEnvelope result = check pricefxClient->updateSeller(payload);
```

</details>

#### Seller Extensions

<details>
<summary>addSellerExtension</summary>

Add a Seller Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddSellerExtensionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddSellerExtensionResponse|error`

**Sample code:**

```ballerina
oas:AddSellerExtensionResponse result = check pricefxClient->addSellerExtension(payload);
```

</details>

<details>
<summary>deleteSellerExtension</summary>

Delete a Seller Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteSellerExtensionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteSellerExtensionResponse|error`

**Sample code:**

```ballerina
oas:DeleteSellerExtensionResponse result = check pricefxClient->deleteSellerExtension(payload);
```

</details>

<details>
<summary>getSellerExtension</summary>

Get a Seller Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sellerId` | <code>string</code> | Yes | The `SellerId` of the seller in the Seller Extension table you want to retrieve details for |
| `sXCategory` | <code>string</code> | Yes | The Seller Extension category (the `Name` from the *Seller Master Extension* table) |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SellerExtensionEnvelope|error`

**Sample code:**

```ballerina
oas:SellerExtensionEnvelope result = check pricefxClient->getSellerExtension(sellerId, sXCategory);
```

</details>

<details>
<summary>importSellerExtensionFile</summary>

Import a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sXCategory` | <code>string</code> | Yes | The Seller Extension category (the `Name` from the *Seller Master Extension* table) |
| `slotId` | <code>string</code> | Yes | The ID that is returned by the **/uploadmanager.newuploadslot** (Create an Upload Slot) endpoint |
| `payload` | <code>oas:ImportSXFileRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ImportSellerExtensionFileQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->importSellerExtensionFile(sXCategory, slotId, payload, queries);
```

</details>

<details>
<summary>insertBulkSellerExtensions</summary>

Insert Bulk Seller Extensions

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:InsertBulkProductExtensionsRequest1</code> | Yes | Specify seller extension field names in the `header` object and field values in the `data` object |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->insertBulkSellerExtensions(payload);
```

</details>

<details>
<summary>listSellerExtensions</summary>

List Seller Extensions

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sXCategory` | <code>string</code> | Yes | The Seller Extension category (the `Name` from the *Seller Master Extension* table) |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SellerExtensionEnvelope|error`

**Sample code:**

```ballerina
oas:SellerExtensionEnvelope result = check pricefxClient->listSellerExtensions(sXCategory);
```

</details>

<details>
<summary>updateSellerExtension</summary>

Update a Seller Extension

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateSXBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateSellerExtensionEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateSellerExtensionEnvelope result = check pricefxClient->updateSellerExtension(payload);
```

</details>

#### Condition Records

<details>
<summary>addConditionRecordItemMeta</summary>

Add a Condition Record Item Attribute Meta

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCRCIMBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordItemMetaOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordItemMetaOperationEnvelope result = check pricefxClient->addConditionRecordItemMeta(payload);
```

</details>

<details>
<summary>addConditionRecordSet</summary>

Add a Condition Record Set

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCRCSBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordSetOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordSetOperationEnvelope result = check pricefxClient->addConditionRecordSet(payload);
```

</details>

<details>
<summary>deleteConditionRecordItemMeta</summary>

Delete a Condition Record Item Attribute Meta

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCRCIMBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordItemMetaOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordItemMetaOperationEnvelope result = check pricefxClient->deleteConditionRecordItemMeta(payload);
```

</details>

<details>
<summary>deleteConditionRecordSet</summary>

Delete a Condition Records Set

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DcrmanagerDeletemassopidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordSetOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordSetOperationEnvelope result = check pricefxClient->deleteConditionRecordSet(payload);
```

</details>

<details>
<summary>getConditionRecordItem</summary>

Get a Condition Record Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordItemEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordItemEnvelope result = check pricefxClient->getConditionRecordItem(payload);
```

</details>

<details>
<summary>getConditionRecordItemMeta</summary>

Get a Condition Record Item Attribute Meta

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:FetchCRCIMBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordItemMetaEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordItemMetaEnvelope result = check pricefxClient->getConditionRecordItemMeta(payload);
```

</details>

<details>
<summary>getConditionRecordSetItems</summary>

Get Condition Record Set Items With Set Id Validation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ConditionrecordsetFetchCRCI3Body</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordSetItemsEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordSetItemsEnvelope result = check pricefxClient->getConditionRecordSetItems(payload);
```

</details>

<details>
<summary>listConditionRecordSets</summary>

List Condition Record Sets

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListConditionRecordSetsEnvelope|error`

**Sample code:**

```ballerina
oas:ListConditionRecordSetsEnvelope result = check pricefxClient->listConditionRecordSets(payload);
```

</details>

<details>
<summary>updateConditionRecordItemMeta</summary>

Update a Condition Record Item Attribute Meta + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCRCIMBody</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateConditionRecordItemMetaEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateConditionRecordItemMetaEnvelope result = check pricefxClient->updateConditionRecordItemMeta(payload);
```

</details>

<details>
<summary>updateConditionRecordSet</summary>

Update a Condition Record Set

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the ConditionRecordSet object you want to update |
| `payload` | <code>oas:ConditionrecordsetUpdateidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConditionRecordSetOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConditionRecordSetOperationEnvelope result = check pricefxClient->updateConditionRecordSet(id, payload);
```

</details>

#### Price Lists

<details>
<summary>addPriceListType</summary>

Add a Price List Type + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddPLTTBody</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListTypeOperationEnvelope|error`

**Sample code:**

```ballerina
oas:PriceListTypeOperationEnvelope result = check pricefxClient->addPriceListType(payload);
```

</details>

<details>
<summary>calculatePriceList</summary>

Calculate a Pricelist

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price List you want to calculate. The `id` is the `typedId` without the suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `payload` | <code>oas:PricelistmanagerCalculateidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculatePricelistResponse|error`

**Sample code:**

```ballerina
oas:CalculatePricelistResponse result = check pricefxClient->calculatePriceList(id, payload);
```

</details>

<details>
<summary>createPriceList</summary>

Create a Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CreatePriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CreatePriceListResponse|error`

**Sample code:**

```ballerina
oas:CreatePriceListResponse result = check pricefxClient->createPriceList(payload);
```

</details>

<details>
<summary>createPriceListRevision</summary>

Create a Revision

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price List you want to create a revision for. The `id` is the `typedId` without the suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `payload` | <code>oas:CreateRevisionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListItemResponse|error`

**Sample code:**

```ballerina
oas:PriceListItemResponse result = check pricefxClient->createPriceListRevision(id, payload);
```

</details>

<details>
<summary>deletePriceList</summary>

Delete a Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeletePriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeletePriceListResponse|error`

**Sample code:**

```ballerina
oas:DeletePriceListResponse result = check pricefxClient->deletePriceList(payload);
```

</details>

<details>
<summary>deletePriceListItems</summary>

Delete a Price List Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | Enter the ID of the Price List where you want to delete an item from |
| `payload` | <code>oas:DeletePriceListItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeletePriceListItemResponse|error`

**Sample code:**

```ballerina
oas:DeletePriceListItemResponse result = check pricefxClient->deletePriceListItems(id, payload);
```

</details>

<details>
<summary>deletePriceListType</summary>

Delete a Price List Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeletePLTTBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListTypeOperationEnvelope|error`

**Sample code:**

```ballerina
oas:PriceListTypeOperationEnvelope result = check pricefxClient->deletePriceListType(payload);
```

</details>

<details>
<summary>getPriceList</summary>

Get a Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price List you want to retrieve details for. The `id` is the `typedId` without the suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetPriceListResponse|error`

**Sample code:**

```ballerina
oas:GetPriceListResponse result = check pricefxClient->getPriceList(id);
```

</details>

<details>
<summary>listPriceListItems</summary>

List Price List Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price List you want to retrieve items for. The `id` is the `typedId` without the suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `payload` | <code>oas:ListPriceListItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListItemResponse|error`

**Sample code:**

```ballerina
oas:PriceListItemResponse result = check pricefxClient->listPriceListItems(id, payload);
```

</details>

<details>
<summary>listPriceListTypes</summary>

List Price List Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListPriceListTypesEnvelope|error`

**Sample code:**

```ballerina
oas:ListPriceListTypesEnvelope result = check pricefxClient->listPriceListTypes();
```

</details>

<details>
<summary>listPriceLists</summary>

List Price Lists

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListPriceListsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListPriceListsResponse|error`

**Sample code:**

```ballerina
oas:ListPriceListsResponse result = check pricefxClient->listPriceLists(payload);
```

</details>

<details>
<summary>revokePriceList</summary>

Revoke a Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The id to be sent with the request |
| `payload` | <code>oas:PricelistmanagerSubmitidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListItemResponse|error`

**Sample code:**

```ballerina
oas:PriceListItemResponse result = check pricefxClient->revokePriceList(id, payload);
```

</details>

<details>
<summary>submitPriceList</summary>

Submit a Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price List you want to submit. The `id` is the `typedId` without the suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `payload` | <code>oas:PricelistmanagerSubmitidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListItemResponse|error`

**Sample code:**

```ballerina
oas:PriceListItemResponse result = check pricefxClient->submitPriceList(id, payload);
```

</details>

<details>
<summary>updatePriceListDetail</summary>

Update a Pricelist Detail

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price List whose Item you want to update. The `id` is the `typedId` without the suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `payload` | <code>oas:UpdatePricelistDetailRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdatePricelistDetailResponse|error`

**Sample code:**

```ballerina
oas:UpdatePricelistDetailResponse result = check pricefxClient->updatePriceListDetail(id, payload);
```

</details>

<details>
<summary>updatePriceListType</summary>

Update a Price List Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdatePLTTBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceListTypeOperationEnvelope|error`

**Sample code:**

```ballerina
oas:PriceListTypeOperationEnvelope result = check pricefxClient->updatePriceListType(payload);
```

</details>

#### Manual Price Lists

<details>
<summary>addManualPriceListProducts</summary>

Add Products to a Manual Pricelist

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List where you want to add products to |
| `payload` | <code>oas:AddProductsToManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->addManualPriceListProducts(id, payload);
```

</details>

<details>
<summary>addManualPriceListProductsNoRecalc</summary>

Add Products to a Manual Price List (No Recalculation)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List where you want to add products to |
| `payload` | <code>oas:AddProductsToManualPriceListNoRecalcRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddProductsToManualPriceListNoRecalcResponse|error`

**Sample code:**

```ballerina
oas:AddProductsToManualPriceListNoRecalcResponse result = check pricefxClient->addManualPriceListProductsNoRecalc(id, payload);
```

</details>

<details>
<summary>calculateManualPriceList</summary>

Calculate a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List you want to start the calculation for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculateManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:CalculateManualPriceListResponse result = check pricefxClient->calculateManualPriceList(id);
```

</details>

<details>
<summary>copyManualPriceList</summary>

Copy a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List you want to copy |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:ManualPriceListResponse result = check pricefxClient->copyManualPriceList(id);
```

</details>

<details>
<summary>createManualPriceList</summary>

Create a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CreateManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:ManualPriceListResponse result = check pricefxClient->createManualPriceList(payload);
```

</details>

<details>
<summary>deleteManualPriceList</summary>

Delete a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:ManualPriceListResponse result = check pricefxClient->deleteManualPriceList(payload);
```

</details>

<details>
<summary>deleteManualPriceListProduct</summary>

Delete a Product from a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List whose product you want to delete |
| `payload` | <code>oas:DeleteProductFromManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->deleteManualPriceListProduct(id, payload);
```

</details>

<details>
<summary>deleteManualPriceListProducts</summary>

Delete Products from a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List whose products you want to delete |
| `payload` | <code>oas:DeleteProductsFromManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteProductsFromManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:DeleteProductsFromManualPriceListResponse result = check pricefxClient->deleteManualPriceListProducts(id, payload);
```

</details>

<details>
<summary>listManualPriceListProducts</summary>

List Products From a Manual Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List you want to retrieve products from |
| `payload` | <code>oas:ListProductsFromManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListProductsFromManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:ListProductsFromManualPriceListResponse result = check pricefxClient->listManualPriceListProducts(id, payload);
```

</details>

<details>
<summary>listManualPriceLists</summary>

List Manual Price Lists

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListManualPriceListsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:ManualPriceListResponse result = check pricefxClient->listManualPriceLists(payload);
```

</details>

<details>
<summary>massEditManualPriceListItems</summary>

Mass Edit a Manual Price List Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List whose products you want to update |
| `payload` | <code>oas:MassEditMPLRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassEditManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:MassEditManualPriceListResponse result = check pricefxClient->massEditManualPriceListItems(id, payload);
```

</details>

<details>
<summary>updateManualPriceListItem</summary>

Update a Manual Price List Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List whose item you want to update |
| `payload` | <code>oas:UpdateManualPriceListRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateManualPriceListResponse|error`

**Sample code:**

```ballerina
oas:UpdateManualPriceListResponse result = check pricefxClient->updateManualPriceListItem(id, payload);
```

</details>

<details>
<summary>upsertManualPriceListProduct</summary>

Upsert a Product in a Manual Price List + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Manual Price List whose product you want to create or update |
| `payload` | <code>oas:UpsertProductManualPriceListRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->upsertManualPriceListProduct(id, payload);
```

</details>

#### Calculation Grids

<details>
<summary>acceptCalculationGridItem</summary>

Submit a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Calculation Grid you want to submit items for. You can retrieve the `id` of the CG, for example, by calling the `/fetch/CG` endpoint |
| `payload` | <code>oas:SubmitCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:SubmitCalculationGridItemResponse result = check pricefxClient->acceptCalculationGridItem(id, payload);
```

</details>

<details>
<summary>addCalculationGrid</summary>

Add a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:AddCalculationGridResponse result = check pricefxClient->addCalculationGrid(payload);
```

</details>

<details>
<summary>addCalculationGridItem</summary>

Add a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `payload` | <code>oas:AddCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:AddCalculationGridItemResponse result = check pricefxClient->addCalculationGridItem(keyNumber, payload);
```

</details>

<details>
<summary>calculateCalculationGrid</summary>

Calculate a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Calculation Grid you want to calculate |
| `payload` | <code>oas:CalculateCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculateCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:CalculateCalculationGridResponse result = check pricefxClient->calculateCalculationGrid(id, payload);
```

</details>

<details>
<summary>deleteCalculationGrid</summary>

Delete a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:DeleteCalculationGridResponse result = check pricefxClient->deleteCalculationGrid(payload);
```

</details>

<details>
<summary>deleteCalculationGridItem</summary>

Delete a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `payload` | <code>oas:DeleteCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:DeleteCalculationGridItemResponse result = check pricefxClient->deleteCalculationGridItem(keyNumber, payload);
```

</details>

<details>
<summary>getCalculationGrid</summary>

Get a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | ID of the Calculation Grid you want to retrieve |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:GetCalculationGridResponse result = check pricefxClient->getCalculationGrid(id, payload);
```

</details>

<details>
<summary>getCalculationGridItem</summary>

Get a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `id` | <code>string</code> | Yes | `id` of the Calculation Grid Item you want to fetch |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:GetCalculationGridItemResponse result = check pricefxClient->getCalculationGridItem(keyNumber, id, payload);
```

</details>

<details>
<summary>listCalculationGridItems</summary>

List Calculation Grid Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `payload` | <code>oas:ListCalculationGridItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCalculationGridItemsResponse|error`

**Sample code:**

```ballerina
oas:ListCalculationGridItemsResponse result = check pricefxClient->listCalculationGridItems(keyNumber, payload);
```

</details>

<details>
<summary>listCalculationGrids</summary>

List Calculation Grids

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCalculationGridsResponse|error`

**Sample code:**

```ballerina
oas:ListCalculationGridsResponse result = check pricefxClient->listCalculationGrids(payload);
```

</details>

<details>
<summary>rejectCalculationGridItem</summary>

Deny a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Calculation Grid you want to deny items for. You can retrieve the `id` of the CG, for example, by calling the `/fetch/CG` endpoint |
| `payload` | <code>oas:DenyCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DenyCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:DenyCalculationGridItemResponse result = check pricefxClient->rejectCalculationGridItem(id, payload);
```

</details>

<details>
<summary>updateCalculationGrid</summary>

Update a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:UpdateCalculationGridResponse result = check pricefxClient->updateCalculationGrid(payload);
```

</details>

<details>
<summary>updateCalculationGridItem</summary>

Update a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Calculation Grid Item you want to update |
| `payload` | <code>oas:UpdateCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:UpdateCalculationGridItemResponse result = check pricefxClient->updateCalculationGridItem(id, payload);
```

</details>

#### Calculated Field Sets

<details>
<summary>calculateCfs</summary>

Calculate a CFS

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` is the `typedId` without the type suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculateCFSResponse|error`

**Sample code:**

```ballerina
oas:CalculateCFSResponse result = check pricefxClient->calculateCfs(id);
```

</details>

<details>
<summary>cancelCfsCalculation</summary>

Cancel a CFS Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` is the `typedId` without the type suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.PL**  is **2147484837** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->cancelCfsCalculation(id);
```

</details>

<details>
<summary>deleteCalculatedFieldSet</summary>

Delete a Calculated Field Set

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCalculatedFieldSetRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->deleteCalculatedFieldSet(payload);
```

</details>

<details>
<summary>listCalculatedFieldSets</summary>

List Calculated Field Sets

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCalculatedFieldSetsResponse|error`

**Sample code:**

```ballerina
oas:ListCalculatedFieldSetsResponse result = check pricefxClient->listCalculatedFieldSets();
```

</details>

#### Live Price Grids

<details>
<summary>addLivePriceGridType</summary>

Add a Live Price Grid Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddPGTTBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LivePriceGridTypeOperationEnvelope|error`

**Sample code:**

```ballerina
oas:LivePriceGridTypeOperationEnvelope result = check pricefxClient->addLivePriceGridType(payload);
```

</details>

<details>
<summary>addPriceGridItemsToPriceGrid</summary>

Add Price Grid Items to a Price Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Live Price Grid where you want to add Price Grid Items to. `id`  is the `typedId` without **PG** suffix. For example, the `id` attribute of the item with `typedId` = **649.PG** is **649**. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `payload` | <code>oas:AddPriceGridItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddPriceGridItemsToPriceGridResponse|error`

**Sample code:**

```ballerina
oas:AddPriceGridItemsToPriceGridResponse result = check pricefxClient->addPriceGridItemsToPriceGrid(id, payload);
```

</details>

<details>
<summary>calculatePriceGrid</summary>

Calculate a Price Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The id to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculatePriceGridResponse|error`

**Sample code:**

```ballerina
oas:CalculatePriceGridResponse result = check pricefxClient->calculatePriceGrid(id);
```

</details>

<details>
<summary>cancelPriceGridCalculation</summary>

Cancel a Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Live Price Grid whose running calculation should be cancelled |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CancelCalculationResponse|error`

**Sample code:**

```ballerina
oas:CancelCalculationResponse result = check pricefxClient->cancelPriceGridCalculation(id);
```

</details>

<details>
<summary>convertToPriceList</summary>

Convert to Price List

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The id to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConvertPriceListResponse|error`

**Sample code:**

```ballerina
oas:ConvertPriceListResponse result = check pricefxClient->convertToPriceList(id);
```

</details>

<details>
<summary>copyPriceGrid</summary>

Copy a Price Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Live Price Grid you want to copy. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CopyPriceGridResponse|error`

**Sample code:**

```ballerina
oas:CopyPriceGridResponse result = check pricefxClient->copyPriceGrid(id);
```

</details>

<details>
<summary>countMassActionItems</summary>

Count Mass Action Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The id to be sent with the request |
| `payload` | <code>oas:CountMassActionItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CountMassActionItemsResponse|error`

**Sample code:**

```ballerina
oas:CountMassActionItemsResponse result = check pricefxClient->countMassActionItems(id, payload);
```

</details>

<details>
<summary>deleteLivePriceGrid</summary>

Delete a Live Price Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteLivePriceGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteLivePriceGridResponse|error`

**Sample code:**

```ballerina
oas:DeleteLivePriceGridResponse result = check pricefxClient->deleteLivePriceGrid(payload);
```

</details>

<details>
<summary>deleteLivePriceGridType</summary>

Delete a Live Price Grid Type + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeletePLTTBody</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LivePriceGridTypeOperationEnvelope|error`

**Sample code:**

```ballerina
oas:LivePriceGridTypeOperationEnvelope result = check pricefxClient->deleteLivePriceGridType(payload);
```

</details>

<details>
<summary>deletePriceGridItem</summary>

Delete a Price Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price Grid you want to delete the Price Grid Item from |
| `payload` | <code>oas:DeletePriceGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceGridItemResponse|error`

**Sample code:**

```ballerina
oas:PriceGridItemResponse result = check pricefxClient->deletePriceGridItem(id, payload);
```

</details>

<details>
<summary>deletePriceGridItemFilter</summary>

Delete a Price Grid Item (Filter) + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price Grid that contains Price Grid Items you want to delete |
| `payload` | <code>oas:DeletePriceGridItemFilterRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->deletePriceGridItemFilter(id, payload);
```

</details>

<details>
<summary>denyLivePriceGridItem</summary>

Deny a Live Price Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price Grid that contains the Price Grid Item you want to deny |
| `payload` | <code>oas:DenyLivePriceGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceGridItemResponse|error`

**Sample code:**

```ballerina
oas:PriceGridItemResponse result = check pricefxClient->denyLivePriceGridItem(id, payload);
```

</details>

<details>
<summary>downloadLivePriceGridExcelFile</summary>

Download a Live Price Grid Excel File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id1` | <code>string</code> | Yes | The id1 to be sent with the request |
| `id2` | <code>string</code> | Yes | The id2 to be sent with the request |
| `id3` | <code>string</code> | Yes | The id3 to be sent with the request |
| `id4` | <code>string</code> | Yes | The id4 to be sent with the request |
| `id5` | <code>string</code> | Yes | The id5 to be sent with the request |
| `id6` | <code>string</code> | Yes | The id6 to be sent with the request |
| `id7` | <code>string</code> | Yes | The id7 to be sent with the request |
| `id8` | <code>string</code> | Yes | The id8 to be sent with the request |
| `id9` | <code>string</code> | Yes | The id9 to be sent with the request |
| `id10` | <code>string</code> | Yes | The id10 to be sent with the request |
| `id11` | <code>string</code> | Yes | The id11 to be sent with the request |
| `id12` | <code>string</code> | Yes | The id12 to be sent with the request |
| `id13` | <code>string</code> | Yes | IDs of the Price Grids you want to download |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:DownloadLivePriceGridExcelFileQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->downloadLivePriceGridExcelFile(id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, id11, id12, id13, queries);
```

</details>

<details>
<summary>getLivePriceGrid</summary>

Get a Live Price Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Live Price Grid you want to retrieve details for. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetLivePriceGridResponse|error`

**Sample code:**

```ballerina
oas:GetLivePriceGridResponse result = check pricefxClient->getLivePriceGrid(id);
```

</details>

<details>
<summary>listLivePriceGridItems</summary>

List Live Price Grid Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Live Price Grid you want to retrieve items for. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `payload` | <code>oas:ListLivePriceGridItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLivePriceGridItemsResponse|error`

**Sample code:**

```ballerina
oas:ListLivePriceGridItemsResponse result = check pricefxClient->listLivePriceGridItems(id, payload);
```

</details>

<details>
<summary>listLivePriceGridTypes</summary>

List Live Price Grid Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLivePriceGridTypesEnvelope|error`

**Sample code:**

```ballerina
oas:ListLivePriceGridTypesEnvelope result = check pricefxClient->listLivePriceGridTypes();
```

</details>

<details>
<summary>listLivePriceGrids</summary>

List Live Price Grids

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListLivePriceGridsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLivePriceGridsResponse|error`

**Sample code:**

```ballerina
oas:ListLivePriceGridsResponse result = check pricefxClient->listLivePriceGrids(payload);
```

</details>

<details>
<summary>massEditPriceGridItems</summary>

Mass Edit Price Grid Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Live Price Grid whose items you want to edit. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `payload` | <code>oas:MassEditPriceGridItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassEditPriceGridItemsResponse|error`

**Sample code:**

```ballerina
oas:MassEditPriceGridItemsResponse result = check pricefxClient->massEditPriceGridItems(id, payload);
```

</details>

<details>
<summary>performMassAction</summary>

Perform a Mass Action

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price Grid that contains items you want to apply workflow actions to |
| `payload` | <code>oas:PerformMassActionRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PerformMassActionResponse|error`

**Sample code:**

```ballerina
oas:PerformMassActionResponse result = check pricefxClient->performMassAction(id, payload);
```

</details>

<details>
<summary>submitProducts</summary>

Submit Products

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Live Price Grid you want to submit items for. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `payload` | <code>oas:SubmitProductsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitProductsResponse|error`

**Sample code:**

```ballerina
oas:SubmitProductsResponse result = check pricefxClient->submitProducts(id, payload);
```

</details>

<details>
<summary>updateLivePriceGridItem</summary>

Update a Live Price Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price Grid whose item you want to update. `id`  is the `typedId` without **PG** suffix. For example, the `id` attribute of the item with `typedId` = **649.PG** is **649**. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `payload` | <code>oas:UpdateLivePriceGridItemRequest</code> | Yes | We have performed an update action on the `comments` field in our request sample &gt;&gt;&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceGridItemResponse|error`

**Sample code:**

```ballerina
oas:PriceGridItemResponse result = check pricefxClient->updateLivePriceGridItem(id, payload);
```

</details>

<details>
<summary>updateLivePriceGridItemNo</summary>

Update a Live Price Grid Item (No Recalculation)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the Price Grid whose item you want to update. `id`  is the `typedId` without **PG** suffix. For example, the `id` attribute of the item with `typedId` = **649.PG** is **649**. You can retrieve the `id` of the LPG, for example, by calling the `/fetch/PG` endpoint |
| `payload` | <code>oas:UpdateLivePriceGridItemNoRecalcRequest</code> | Yes | We have performed an update action on the `comments` field in our request sample &gt;&gt;&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PriceGridItemResponse|error`

**Sample code:**

```ballerina
oas:PriceGridItemResponse result = check pricefxClient->updateLivePriceGridItemNo(id, payload);
```

</details>

<details>
<summary>updateLivePriceGridType</summary>

Update a Live Price Grid Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdatePGTTBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LivePriceGridTypeOperationEnvelope|error`

**Sample code:**

```ballerina
oas:LivePriceGridTypeOperationEnvelope result = check pricefxClient->updateLivePriceGridType(payload);
```

</details>

#### Quotes

<details>
<summary>addQuoteProducts</summary>

Add Products to a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddProductsToQuoteRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->addQuoteProducts(payload);
```

</details>

<details>
<summary>convertQuoteToDeal</summary>

Convert to a Deal

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `identifier` | <code>string</code> | Yes | Can be either the `uniqueName` or the `typedId` |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->convertQuoteToDeal(identifier);
```

</details>

<details>
<summary>copyQuote</summary>

Copy a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CopyQuoteEnvelope|error`

**Sample code:**

```ballerina
oas:CopyQuoteEnvelope result = check pricefxClient->copyQuote(typedId, payload);
```

</details>

<details>
<summary>createClic</summary>

Create a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"Q"&#124;"QTMP"</code> | Yes | Enter the type code of the entity you want to create |
| `payload` | <code>oas:ClicmanagerCreateTypeCodeBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ClicOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ClicOperationEnvelope result = check pricefxClient->createClic(typeCode, payload);
```

</details>

<details>
<summary>createQuoteRevision</summary>

Create a New Revision

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `identifier` | <code>string</code> | Yes | Can be either the `uniqueName` or the `typedId` |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->createQuoteRevision(identifier);
```

</details>

<details>
<summary>exportQuoteDocx</summary>

Export a DOCX File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | Specify the `uniqueName` of the quote you want to download |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExportQuoteDocxQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->exportQuoteDocx(uniqueName, queries);
```

</details>

<details>
<summary>exportQuoteExcel</summary>

Export an Excel File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | Specify the `uniqueName` of the quote you want to download |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExportQuoteExcelQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->exportQuoteExcel(uniqueName, queries);
```

</details>

<details>
<summary>exportQuotePdf</summary>

Export a PDF File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | Specify the `uniqueName` of the quote you want to download |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExportQuotePdfQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `record`

**Sample code:**

```ballerina
record result = check pricefxClient->exportQuotePdf(uniqueName, queries);
```

</details>

<details>
<summary>getClicDraftHeader</summary>

Get a Temporary Data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Quote you want to retrieve the temporary data from |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ClicDraftHeaderEnvelope|error`

**Sample code:**

```ballerina
oas:ClicDraftHeaderEnvelope result = check pricefxClient->getClicDraftHeader(typedId, payload);
```

</details>

<details>
<summary>getClicFolderStats</summary>

Get Folder Statistics

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typedId of the document whose folder statistics you want to fetch |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:GetClicFolderStatsQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ClicFolderStatsEnvelope|error`

**Sample code:**

```ballerina
oas:ClicFolderStatsEnvelope result = check pricefxClient->getClicFolderStats(typedId, queries);
```

</details>

<details>
<summary>getQuote</summary>

Get a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedID` | <code>string</code> | Yes | Enter the quote typed ID. You get the `typedId` in the response when fetching all quotes using the `/quotemanager.fetchlist` endpoint |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->getQuote(typedID);
```

</details>

<details>
<summary>listQuoteProducts</summary>

List Products

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListProductsRequest1</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->listQuoteProducts(payload);
```

</details>

<details>
<summary>listQuotes</summary>

List Quotes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListQuotesRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListQuotesResponse|error`

**Sample code:**

```ballerina
oas:ListQuotesResponse result = check pricefxClient->listQuotes(payload);
```

</details>

<details>
<summary>markQuoteLost</summary>

Mark an Offer as Lost

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `identifier` | <code>string</code> | Yes | Can be either the `uniqueName` or the `typedId` |
| `payload` | <code>oas:MarkOfferAsLostRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->markQuoteLost(identifier, payload);
```

</details>

<details>
<summary>recalculateQuote</summary>

Recalculate a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:RecalculateQuoteRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->recalculateQuote(payload);
```

</details>

<details>
<summary>revokeQuote</summary>

Revoke a Deal

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `identifier` | <code>string</code> | Yes | Can be either the `uniqueName` or the `typedId` |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RevokeDealResponse|error`

**Sample code:**

```ballerina
oas:RevokeDealResponse result = check pricefxClient->revokeQuote(identifier);
```

</details>

<details>
<summary>saveClicDraft</summary>

Save a Temporary Data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Temporary Quote you want to save |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ClicOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ClicOperationEnvelope result = check pricefxClient->saveClicDraft(typedId, payload);
```

</details>

<details>
<summary>submitQuote</summary>

Submit a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SubmitQuoteRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->submitQuote(payload);
```

</details>

<details>
<summary>undoRevokeQuote</summary>

Undo Quote Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoRevokeQuote(typedId);
```

</details>

<details>
<summary>upsertQuote</summary>

Upsert a Quote

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertQuoteRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QuoteResponse|error`

**Sample code:**

```ballerina
oas:QuoteResponse result = check pricefxClient->upsertQuote(payload);
```

</details>

#### Contracts (Agreements & Promotions)

<details>
<summary>addContractLineItems</summary>

Add Contract Line Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddContractLineItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ContractModelResponse|error`

**Sample code:**

```ballerina
oas:ContractModelResponse result = check pricefxClient->addContractLineItems(payload);
```

</details>

<details>
<summary>exportContractPdf</summary>

Export a PDF File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | Specify the `uniqueName` of the A&P you want to download |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->exportContractPdf(uniqueName);
```

</details>

<details>
<summary>getContract</summary>

Get a Contract

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | `uniqueName` of the Contract you want to retrieve details for. Alternatively, `typedId` can be also used |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ContractModelResponse|error`

**Sample code:**

```ballerina
oas:ContractModelResponse result = check pricefxClient->getContract(uniqueName);
```

</details>

<details>
<summary>listContractCalculations</summary>

List Contract Calculations

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListContractCalculationsEnvelope|error`

**Sample code:**

```ballerina
oas:ListContractCalculationsEnvelope result = check pricefxClient->listContractCalculations(payload);
```

</details>

<details>
<summary>listContractPriceRecords</summary>

List Contract Price Records

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:FetchCPRBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListContractPriceRecords|error`

**Sample code:**

```ballerina
oas:ListContractPriceRecords result = check pricefxClient->listContractPriceRecords(payload);
```

</details>

<details>
<summary>listContracts</summary>

List Contracts

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListContractsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ContractResponse|error`

**Sample code:**

```ballerina
oas:ContractResponse result = check pricefxClient->listContracts(payload);
```

</details>

<details>
<summary>submitContract</summary>

Submit a Contract

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SubmitContractRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ContractModelResponse|error`

**Sample code:**

```ballerina
oas:ContractModelResponse result = check pricefxClient->submitContract(payload);
```

</details>

<details>
<summary>undoRevokeContract</summary>

Undo Agreement & Promotion Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoRevokeContract(typedId);
```

</details>

<details>
<summary>upsertContract</summary>

Upsert a Contract

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertContractRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ContractModelResponse|error`

**Sample code:**

```ballerina
oas:ContractModelResponse result = check pricefxClient->upsertContract(payload);
```

</details>

#### Rebate Agreements

<details>
<summary>addRebateAgreementItems</summary>

Add Rebate Agreement Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:GetCustomerRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RebateAgreementResponse|error`

**Sample code:**

```ballerina
oas:RebateAgreementResponse result = check pricefxClient->addRebateAgreementItems(payload);
```

</details>

<details>
<summary>deleteRebateAgreement</summary>

Delete a Rebate Agreement

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteRebateAgreementRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RebateAgreementResponse|error`

**Sample code:**

```ballerina
oas:RebateAgreementResponse result = check pricefxClient->deleteRebateAgreement(payload);
```

</details>

<details>
<summary>getRebateAgreement</summary>

Get a Rebate Agreement

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The `uniqueName` of the Rebate Agreement you want to retrieve details for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RebateAgreementResponse|error`

**Sample code:**

```ballerina
oas:RebateAgreementResponse result = check pricefxClient->getRebateAgreement(uniqueName);
```

</details>

<details>
<summary>listRebateAgreementItems</summary>

List Rebate Agreement Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListRebateAgreementItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListRebateAgreementItemsResponse|error`

**Sample code:**

```ballerina
oas:ListRebateAgreementItemsResponse result = check pricefxClient->listRebateAgreementItems(payload);
```

</details>

<details>
<summary>listRebateAgreements</summary>

List Rebate Agreements

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListRebateAgreementsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListRebateAgreementsResponse|error`

**Sample code:**

```ballerina
oas:ListRebateAgreementsResponse result = check pricefxClient->listRebateAgreements(payload);
```

</details>

<details>
<summary>undoRebateAgreementRevocation</summary>

Undo Rebate Agreement Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoRebateAgreementRevocation(typedId);
```

</details>

<details>
<summary>undoRebateRecordRevocation</summary>

Undo Rebate Record Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoRebateRecordRevocation(typedId);
```

</details>

<details>
<summary>upsertRebateAgreement</summary>

Upsert a Rebate Agreement

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertRebateAgreementRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RebateAgreementResponse|error`

**Sample code:**

```ballerina
oas:RebateAgreementResponse result = check pricefxClient->upsertRebateAgreement(payload);
```

</details>

#### Rebate Calculations

<details>
<summary>addRebateCalculation</summary>

Add a Rebate Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddRRSCBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddRebateCalculationResponse|error`

**Sample code:**

```ballerina
oas:AddRebateCalculationResponse result = check pricefxClient->addRebateCalculation(payload);
```

</details>

<details>
<summary>deleteRebateCalculation</summary>

Delete a Rebate Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteRebateCalculationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteRebateCalculationResponse|error`

**Sample code:**

```ballerina
oas:DeleteRebateCalculationResponse result = check pricefxClient->deleteRebateCalculation(payload);
```

</details>

<details>
<summary>listRebateCalculations</summary>

List Rebate Calculations

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:FetchRRSCBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListRebateCalculationsResponse|error`

**Sample code:**

```ballerina
oas:ListRebateCalculationsResponse result = check pricefxClient->listRebateCalculations(payload);
```

</details>

<details>
<summary>runRebateCalculation</summary>

Run a Rebate Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:RebaterecordCalculatesetBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RunRebateCalculationResponse|error`

**Sample code:**

```ballerina
oas:RunRebateCalculationResponse result = check pricefxClient->runRebateCalculation(payload);
```

</details>

<details>
<summary>saveRebateCalculation</summary>

Save a Rebate Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SaveRebateCalculationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SaveRebateCalculationResponse|error`

**Sample code:**

```ballerina
oas:SaveRebateCalculationResponse result = check pricefxClient->saveRebateCalculation(payload);
```

</details>

#### Rebate Record Group

<details>
<summary>calculateRebateRecordGroup</summary>

Calculate a Rebate Record Group

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Rebate Record Group you want to calculate |
| `payload` | <code>oas:RebaterecordgroupCalculatetypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculateRebateRecordGroupEnvelope|error`

**Sample code:**

```ballerina
oas:CalculateRebateRecordGroupEnvelope result = check pricefxClient->calculateRebateRecordGroup(typedId, payload);
```

</details>

<details>
<summary>getRebateRecordGroup</summary>

Get a Rebate Record Group

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->getRebateRecordGroup(payload);
```

</details>

<details>
<summary>massSubmitRebateRecordGroupItems</summary>

Mass Submit Rebate Record Groups

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>oas:RebaterecordgroupMasssubmittypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassSubmitRRGResponse|error`

**Sample code:**

```ballerina
oas:MassSubmitRRGResponse result = check pricefxClient->massSubmitRebateRecordGroupItems(typedId, payload);
```

</details>

<details>
<summary>massSubmitRebateRecordGroups</summary>

Mass Submit Rebate Record Groups

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:RebaterecordgroupMasssubmittypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassSubmitRebateRecordGroupsEnvelope|error`

**Sample code:**

```ballerina
oas:MassSubmitRebateRecordGroupsEnvelope result = check pricefxClient->massSubmitRebateRecordGroups(payload);
```

</details>

<details>
<summary>previewRebateRecordGroupWorkflow</summary>

Preview a Rebate Record Group Workflow

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>oas:RebaterecordgroupPreviewtypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RebateRecordGroupWorkflowEnvelope|error`

**Sample code:**

```ballerina
oas:RebateRecordGroupWorkflowEnvelope result = check pricefxClient->previewRebateRecordGroupWorkflow(typedId, payload);
```

</details>

<details>
<summary>revokeRebateRecordGroup</summary>

Revoke a Rebate Record Group

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Rebate Record Group you want to revoke |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RevokeRebateRecordGroupEnvelope|error`

**Sample code:**

```ballerina
oas:RevokeRebateRecordGroupEnvelope result = check pricefxClient->revokeRebateRecordGroup(typedId);
```

</details>

<details>
<summary>shouldSubmitRrgAsynchronously</summary>

Should Submit a RRG Asynchronously

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Rebate Record Group you want to return the async threshold boolean for |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CheckFileExistsEnvelope|error`

**Sample code:**

```ballerina
oas:CheckFileExistsEnvelope result = check pricefxClient->shouldSubmitRrgAsynchronously(typedId, payload);
```

</details>

<details>
<summary>submitRebateRecordGroup</summary>

Submit a Rebate Record Group

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Rebate Record Group you want to submit |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitRebateRecordGroup|error`

**Sample code:**

```ballerina
oas:SubmitRebateRecordGroup result = check pricefxClient->submitRebateRecordGroup(typedId, payload);
```

</details>

<details>
<summary>undoRebateRecordGroupRevocation</summary>

Undo Rebate Record Group Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoRebateRecordGroupRevocation(typedId);
```

</details>

#### Sales Compensations

<details>
<summary>addCalculation</summary>

Add a Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCalculationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddCalculationResponse|error`

**Sample code:**

```ballerina
oas:AddCalculationResponse result = check pricefxClient->addCalculation(payload);
```

</details>

<details>
<summary>addCompensationType</summary>

Add a Compensation Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCompensationTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddCompensationTypeEnvelope|error`

**Sample code:**

```ballerina
oas:AddCompensationTypeEnvelope result = check pricefxClient->addCompensationType(payload);
```

</details>

<details>
<summary>addConditionType</summary>

Add a Condition Type + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddConditionTypeRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddConditionTypeEnvelope|error`

**Sample code:**

```ballerina
oas:AddConditionTypeEnvelope result = check pricefxClient->addConditionType(payload);
```

</details>

<details>
<summary>deleteCalculation</summary>

Delete a Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCalculationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCalculationResponse|error`

**Sample code:**

```ballerina
oas:DeleteCalculationResponse result = check pricefxClient->deleteCalculation(payload);
```

</details>

<details>
<summary>deleteCompensationPlan</summary>

Delete a Compensation Plan

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCompensationPlanRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCompensationPlanResponse|error`

**Sample code:**

```ballerina
oas:DeleteCompensationPlanResponse result = check pricefxClient->deleteCompensationPlan(payload);
```

</details>

<details>
<summary>deleteCompensationType</summary>

Delete a Compensation Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCOHTBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCompensationTypeEnvelope|error`

**Sample code:**

```ballerina
oas:DeleteCompensationTypeEnvelope result = check pricefxClient->deleteCompensationType(payload);
```

</details>

<details>
<summary>deleteConditionType</summary>

Delete a Condition Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteConditionTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteConditionTypeEnvelope|error`

**Sample code:**

```ballerina
oas:DeleteConditionTypeEnvelope result = check pricefxClient->deleteConditionType(payload);
```

</details>

<details>
<summary>duplicateCompensationPlan</summary>

Duplicate a Compensation Plan

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Compensation Plan you want to duplicate |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DuplicateCompensationPlanEnvelope|error`

**Sample code:**

```ballerina
oas:DuplicateCompensationPlanEnvelope result = check pricefxClient->duplicateCompensationPlan(typedId);
```

</details>

<details>
<summary>getSignatureStatus</summary>

Get a Signature Status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Compensation document you want to retrieve the signature status for |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetSignatureStatusResponse|error`

**Sample code:**

```ballerina
oas:GetSignatureStatusResponse result = check pricefxClient->getSignatureStatus(typedId, payload);
```

</details>

<details>
<summary>getSignedDocument</summary>

Get a Signed Document

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | A `uniqueName` of the Compensation Plan you want to download a signed file for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->getSignedDocument(uniqueName);
```

</details>

<details>
<summary>listAccrualRecords</summary>

List Accrual Records

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListAccrualRecordsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListAccrualRecordsResponse|error`

**Sample code:**

```ballerina
oas:ListAccrualRecordsResponse result = check pricefxClient->listAccrualRecords(payload);
```

</details>

<details>
<summary>listCalculations</summary>

List Calculations

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListCalculationsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCalculationsResponse|error`

**Sample code:**

```ballerina
oas:ListCalculationsResponse result = check pricefxClient->listCalculations(payload);
```

</details>

<details>
<summary>listCompensationPlans</summary>

List Compensation Plans

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListCompensationPlansRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCompensationPlansResponse|error`

**Sample code:**

```ballerina
oas:ListCompensationPlansResponse result = check pricefxClient->listCompensationPlans(payload);
```

</details>

<details>
<summary>listCompensationRecords</summary>

List Compensation Records

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `compensationRecordSetId` | <code>string</code> | Yes | ID of the CompensationRecordSet into which this Compensation Record belongs. By default it belongs to "Default" CompensationRecordSet, but you can change it when you create the Compensation Record. This can be useful if you create different "kinds" of Compensation Records which will be used to calculate different results at different times |
| `payload` | <code>oas:ListCompensationRecordsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCompensationRecordsResponse|error`

**Sample code:**

```ballerina
oas:ListCompensationRecordsResponse result = check pricefxClient->listCompensationRecords(compensationRecordSetId, payload);
```

</details>

<details>
<summary>listCompensationTypes</summary>

List Compensation Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListCompensationTypesRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCompensationTypesEnvelope|error`

**Sample code:**

```ballerina
oas:ListCompensationTypesEnvelope result = check pricefxClient->listCompensationTypes(payload);
```

</details>

<details>
<summary>listConditionTypes</summary>

List Condition Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListConditionTypesRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListConditionTypesEnvelope|error`

**Sample code:**

```ballerina
oas:ListConditionTypesEnvelope result = check pricefxClient->listConditionTypes(payload);
```

</details>

<details>
<summary>recalculateQuoteContractRebate</summary>

Recalculate a Quote/Contract/Rebate Agreement/Compensation Plan

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the document you want to calculate |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:RecalculateQuoteContractRebateQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:RecalculateClicEnvelope|error`

**Sample code:**

```ballerina
oas:RecalculateClicEnvelope result = check pricefxClient->recalculateQuoteContractRebate(typedId, queries);
```

</details>

<details>
<summary>revokeCompensationRecord</summary>

Revoke a Compensation Record

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Compensation Record you want to revoke |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->revokeCompensationRecord(typedId);
```

</details>

<details>
<summary>runCalculation</summary>

Run a Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:RunCalculationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RunCalculationResponse|error`

**Sample code:**

```ballerina
oas:RunCalculationResponse result = check pricefxClient->runCalculation(payload);
```

</details>

<details>
<summary>saveCalculation</summary>

Save Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SaveCalculationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SaveCalculationResponse|error`

**Sample code:**

```ballerina
oas:SaveCalculationResponse result = check pricefxClient->saveCalculation(payload);
```

</details>

<details>
<summary>saveCompensationRecord</summary>

Save a Compensation Record

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SaveCompensationRecordRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SaveCompensationRecordResponse|error`

**Sample code:**

```ballerina
oas:SaveCompensationRecordResponse result = check pricefxClient->saveCompensationRecord(payload);
```

</details>

<details>
<summary>sendDocumentToSign</summary>

Send a Document to Sign

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Compensation whose data you want to send via the e-signature system |
| `payload` | <code>oas:CreateSignatureRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CreateSignatureResponse|error`

**Sample code:**

```ballerina
oas:CreateSignatureResponse result = check pricefxClient->sendDocumentToSign(typedId, payload);
```

</details>

<details>
<summary>undoCompensationPlanRevocation</summary>

Undo Compensation Plan Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoCompensationPlanRevocation(typedId);
```

</details>

<details>
<summary>undoCompensationRecordRevocation</summary>

Undo Compensation Record Revocation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->undoCompensationRecordRevocation(typedId);
```

</details>

<details>
<summary>updateCompensationRecord</summary>

Update a Compensation Record

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCompensationRecordRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCompensationRecordResponse|error`

**Sample code:**

```ballerina
oas:UpdateCompensationRecordResponse result = check pricefxClient->updateCompensationRecord(payload);
```

</details>

<details>
<summary>updateCompensationType</summary>

Update a Compensation Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCompensationTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCompensationTypeEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateCompensationTypeEnvelope result = check pricefxClient->updateCompensationType(payload);
```

</details>

<details>
<summary>updateConditionType</summary>

Update a Condition Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateConditionTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateConditionTypeEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateConditionTypeEnvelope result = check pricefxClient->updateConditionType(payload);
```

</details>

<details>
<summary>updateQuoteContractRebateAgreement</summary>

Update a Quote/Contract/Rebate Agreement/Compensation Plan

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Compensation Plan you want to update |
| `payload` | <code>oas:ClicmanagerUpdatetypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateClicEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateClicEnvelope result = check pricefxClient->updateQuoteContractRebateAgreement(typedId, payload);
```

</details>

<details>
<summary>upsertCompensationPlan</summary>

Upsert a Compensation Plan

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpsertCompensationPlanRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpsertCompensationPlanResponse|error`

**Sample code:**

```ballerina
oas:UpsertCompensationPlanResponse result = check pricefxClient->upsertCompensationPlan(payload);
```

</details>

#### Claims

<details>
<summary>addClaim</summary>

Add a Claim

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddClaimRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddClaimResponse|error`

**Sample code:**

```ballerina
oas:AddClaimResponse result = check pricefxClient->addClaim(payload);
```

</details>

<details>
<summary>calculateClaim</summary>

Calculate a Claim

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the claim whose items you want to calculate |
| `payload` | <code>oas:CalculateClaimRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculateClaimResponse|error`

**Sample code:**

```ballerina
oas:CalculateClaimResponse result = check pricefxClient->calculateClaim(typedId, payload);
```

</details>

<details>
<summary>cancelClaimCalculation</summary>

Cancel a Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the claim whose item calculation you want to cancel |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CancelClaimCalculationResponse|error`

**Sample code:**

```ballerina
oas:CancelClaimCalculationResponse result = check pricefxClient->cancelClaimCalculation(typedId, payload);
```

</details>

<details>
<summary>getSummary</summary>

Get a Summary

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetClaimItemsSummaryResponse|error`

**Sample code:**

```ballerina
oas:GetClaimItemsSummaryResponse result = check pricefxClient->getSummary(typedId, payload);
```

</details>

<details>
<summary>listClaims</summary>

List Claims + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListClaimsRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListClaimsResponse|error`

**Sample code:**

```ballerina
oas:ListClaimsResponse result = check pricefxClient->listClaims(payload);
```

</details>

<details>
<summary>listItems</summary>

List Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListClaimItemsResponse|error`

**Sample code:**

```ballerina
oas:ListClaimItemsResponse result = check pricefxClient->listItems(typedId, payload);
```

</details>

<details>
<summary>rejectItems</summary>

Reject Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Claim whose items you want to reject |
| `payload` | <code>oas:RejectClaimItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RejectClaimItemsResponse|error`

**Sample code:**

```ballerina
oas:RejectClaimItemsResponse result = check pricefxClient->rejectItems(typedId, payload);
```

</details>

<details>
<summary>removeItems</summary>

Remove Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Claim whose items you want to remove |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RemoveClaimItemsResponse|error`

**Sample code:**

```ballerina
oas:RemoveClaimItemsResponse result = check pricefxClient->removeItems(typedId, payload);
```

</details>

<details>
<summary>submitClaim</summary>

Submit a Claim

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Claim you want to submit |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitClaimResponse|error`

**Sample code:**

```ballerina
oas:SubmitClaimResponse result = check pricefxClient->submitClaim(typedId, payload);
```

</details>

<details>
<summary>updateClaim</summary>

Update a Claim + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateClaimRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateClaimResponse|error`

**Sample code:**

```ballerina
oas:UpdateClaimResponse result = check pricefxClient->updateClaim(payload);
```

</details>

<details>
<summary>validateItems</summary>

Validate Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Claim whose items you want to validate |
| `payload` | <code>oas:ValidateClaimItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ValidateClaimItemsResponse|error`

**Sample code:**

```ballerina
oas:ValidateClaimItemsResponse result = check pricefxClient->validateItems(typedId, payload);
```

</details>

#### Claim Types

<details>
<summary>addClaimType</summary>

Add a Claim Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddClaimTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddClaimTypeResponse|error`

**Sample code:**

```ballerina
oas:AddClaimTypeResponse result = check pricefxClient->addClaimType(payload);
```

</details>

<details>
<summary>deleteClaimType</summary>

Delete a Claim Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteClaimTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteClaimTypeResponse|error`

**Sample code:**

```ballerina
oas:DeleteClaimTypeResponse result = check pricefxClient->deleteClaimType(payload);
```

</details>

<details>
<summary>listClaimTypes</summary>

List Claim Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListClaimTypesRequest</code> | Yes | The example of the request body contains the filter. The call returns Claim Types whose `name` equals to "claimType" |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListClaimTypesResponse|error`

**Sample code:**

```ballerina
oas:ListClaimTypesResponse result = check pricefxClient->listClaimTypes(payload);
```

</details>

<details>
<summary>updateClaimType</summary>

Update a Claim Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateClaimTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateClaimTypeResponse|error`

**Sample code:**

```ballerina
oas:UpdateClaimTypeResponse result = check pricefxClient->updateClaimType(payload);
```

</details>

#### Attachments

<details>
<summary>checkFileExists</summary>

Check a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `binaryDataId` | <code>string</code> | Yes | If the `typedId` is, for example, 1145.BD then the binaryDataId is **1145** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CheckFileExistsEnvelope|error`

**Sample code:**

```ballerina
oas:CheckFileExistsEnvelope result = check pricefxClient->checkFileExists(binaryDataId);
```

</details>

<details>
<summary>createUploadSlot</summary>

1. Create an Upload Slot

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:CreateUploadSlotQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:CreateUploadSlotEnvelope|error`

**Sample code:**

```ballerina
oas:CreateUploadSlotEnvelope result = check pricefxClient->createUploadSlot(queries);
```

</details>

<details>
<summary>deleteFile</summary>

Delete a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the document whose attachment you want to delete |
| `binaryDataId` | <code>string</code> | Yes | If the `typedId` is, for example, 1145.BD then the binaryDataId is **1145** |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->deleteFile(typedId, binaryDataId, payload);
```

</details>

<details>
<summary>deleteUploadSlot</summary>

3. Delete an Upload Slot

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `slotId` | <code>string</code> | Yes | Enter the ID of the slot you want to delete |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UploadSlotOperationEnvelope|error`

**Sample code:**

```ballerina
oas:UploadSlotOperationEnvelope result = check pricefxClient->deleteUploadSlot(slotId);
```

</details>

<details>
<summary>downloadAttachmentData</summary>

Download an Attachment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `binaryDataId` | <code>string</code> | Yes | If the typedId is, for example, 1146.BD then the binaryDataId is **1146** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:DownloadAttachmentDataQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check pricefxClient->downloadAttachmentData(binaryDataId, queries);
```

</details>

<details>
<summary>downloadFile</summary>

Download a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the document you want to download the attachment from |
| `binaryDataId` | <code>string</code> | Yes | If the `typedId` is, for example, 1145.BD then the binaryDataId is **1145** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:DownloadFileQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:FileDownloadEnvelope|error`

**Sample code:**

```ballerina
oas:FileDownloadEnvelope result = check pricefxClient->downloadFile(typedId, binaryDataId, queries);
```

</details>

<details>
<summary>downloadFileViaPost</summary>

Download a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the document you want to download the attachment from |
| `binaryDataId` | <code>string</code> | Yes | If the `typedId` is, for example, 1145.BD then the binaryDataId is **1145** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:DownloadFileViaPostQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->downloadFileViaPost(typedId, binaryDataId, queries);
```

</details>

<details>
<summary>editAttachment</summary>

2. Upload a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ownerTypedId` | <code>string</code> | Yes | The `TypedId` of the document owning the attachment |
| `binaryDataId` | <code>string</code> | Yes | The `binaryDataId` of the attachment to replace |
| `slotId` | <code>string</code> | Yes | The upload `slot_id` containing the new file |
| `payload` | <code>oas:BinaryDataIdslotIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:FileDownloadEnvelope|error`

**Sample code:**

```ballerina
oas:FileDownloadEnvelope result = check pricefxClient->editAttachment(ownerTypedId, binaryDataId, slotId, payload);
```

</details>

<details>
<summary>getUploadProgress</summary>

Get Upload Progress

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uploadslot` | <code>string</code> | Yes | Upload Slot Id |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UploadSlotOperationEnvelope|error`

**Sample code:**

```ballerina
oas:UploadSlotOperationEnvelope result = check pricefxClient->getUploadProgress(uploadslot);
```

</details>

<details>
<summary>listFiles</summary>

List Files

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the document you want to list attachments for |
| `payload` | <code>oas:BdmanagerListtypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListFilesEnvelope|error`

**Sample code:**

```ballerina
oas:ListFilesEnvelope result = check pricefxClient->listFiles(typedId, payload);
```

</details>

<details>
<summary>updateFile</summary>

Update a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the document whose attachment's metadata you want to update |
| `payload` | <code>oas:BdmanagerUpdatetypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateFileEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateFileEnvelope result = check pricefxClient->updateFile(typedId, payload);
```

</details>

<details>
<summary>uploadFile</summary>

2. Upload a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the document you want to attach the file to |
| `slotId` | <code>string</code> | Yes | The ID of the slot you want to use for the upload. retrieve the slot ID using the `/uploadmanager.newuploadslot` (Create an Upload Slot) endpoint |
| `payload` | <code>oas:TypedIdslotIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:FileOperationEnvelope|error`

**Sample code:**

```ballerina
oas:FileOperationEnvelope result = check pricefxClient->uploadFile(typedId, slotId, payload);
```

</details>

#### Comments

<details>
<summary>addComment</summary>

Add a Comment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CommentmanagerAddBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CommentOperationEnvelope|error`

**Sample code:**

```ballerina
oas:CommentOperationEnvelope result = check pricefxClient->addComment(payload);
```

</details>

<details>
<summary>deleteComment</summary>

Delete a Comment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | Comment or CommentThread typedId |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCommentEnvelope|error`

**Sample code:**

```ballerina
oas:DeleteCommentEnvelope result = check pricefxClient->deleteComment(typedId);
```

</details>

<details>
<summary>editComment</summary>

Edit a Comment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typedId of the comment you want to edit |
| `payload` | <code>oas:CommentmanagerEdittypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CommentOperationEnvelope|error`

**Sample code:**

```ballerina
oas:CommentOperationEnvelope result = check pricefxClient->editComment(typedId, payload);
```

</details>

<details>
<summary>listCommentThreads</summary>

List Comment Threads

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typedId of the object you want to fetch comments for |
| `payload` | <code>oas:CommentmanagerFetchthreadstypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListCommentThreadsQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ListCommentThreadsEnvelope|error`

**Sample code:**

```ballerina
oas:ListCommentThreadsEnvelope result = check pricefxClient->listCommentThreads(typedId, payload, queries);
```

</details>

<details>
<summary>replyToComment</summary>

Reply To a Comment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CommentmanagerReplyBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CommentOperationEnvelope|error`

**Sample code:**

```ballerina
oas:CommentOperationEnvelope result = check pricefxClient->replyToComment(payload);
```

</details>

<details>
<summary>resolveComment</summary>

Resolve a Comment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId of the comment thread |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ResolveCommentEnvelope|error`

**Sample code:**

```ballerina
oas:ResolveCommentEnvelope result = check pricefxClient->resolveComment(typedId, payload);
```

</details>

<details>
<summary>unresolveComment</summary>

Unresolve a Comment

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId of the comment thread |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ResolveCommentEnvelope|error`

**Sample code:**

```ballerina
oas:ResolveCommentEnvelope result = check pricefxClient->unresolveComment(typedId, payload);
```

</details>

#### Custom Forms

<details>
<summary>changeCustomFormStatus</summary>

Change a Custom Form Status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Custom Form whose status you want to change |
| `payload` | <code>oas:ChangeCustomFormStatusRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ChangeCustomFormStatusResponse|error`

**Sample code:**

```ballerina
oas:ChangeCustomFormStatusResponse result = check pricefxClient->changeCustomFormStatus(typedId, payload);
```

</details>

<details>
<summary>createCustomForm</summary>

Create a Custom Form + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CreateCustomFormRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CreateCustomFormEnvelope|error`

**Sample code:**

```ballerina
oas:CreateCustomFormEnvelope result = check pricefxClient->createCustomForm(payload);
```

</details>

<details>
<summary>createCustomFormRevision</summary>

Create a Custom Form Revision

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Custom Form you want to create a revision from |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomFormRevisionEnvelope|error`

**Sample code:**

```ballerina
oas:CustomFormRevisionEnvelope result = check pricefxClient->createCustomFormRevision(typedId, payload);
```

</details>

<details>
<summary>createCustomFormType</summary>

Create a Custom Form Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CreateCustomFormTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CreateCustomFormTypeResponse|error`

**Sample code:**

```ballerina
oas:CreateCustomFormTypeResponse result = check pricefxClient->createCustomFormType(payload);
```

</details>

<details>
<summary>deleteCustomForm</summary>

Delete a Custom Form

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCustomFormRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->deleteCustomForm(payload);
```

</details>

<details>
<summary>deleteCustomFormType</summary>

Delete a Custom Form Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCFOTBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCustomFormTypeEnvelope|error`

**Sample code:**

```ballerina
oas:DeleteCustomFormTypeEnvelope result = check pricefxClient->deleteCustomFormType(payload);
```

</details>

<details>
<summary>duplicateCustomForm</summary>

Duplicate a Custom Form

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Custom Form you want to duplicate |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CustomFormRevisionEnvelope|error`

**Sample code:**

```ballerina
oas:CustomFormRevisionEnvelope result = check pricefxClient->duplicateCustomForm(typedId, payload);
```

</details>

<details>
<summary>getCustomForm</summary>

Get a Custom Form

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Custom Form you want to retrieve details for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetCustomFormResponse|error`

**Sample code:**

```ballerina
oas:GetCustomFormResponse result = check pricefxClient->getCustomForm(typedId);
```

</details>

<details>
<summary>listCustomFormTypes</summary>

List Custom Form Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListCustomFormTypesRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCustomFormTypesResponse|error`

**Sample code:**

```ballerina
oas:ListCustomFormTypesResponse result = check pricefxClient->listCustomFormTypes(payload);
```

</details>

<details>
<summary>listCustomForms</summary>

List Custom Forms

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListCustomFormsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCustomFormsEnvelope|error`

**Sample code:**

```ballerina
oas:ListCustomFormsEnvelope result = check pricefxClient->listCustomForms(payload);
```

</details>

<details>
<summary>previewCustomFormWorkflow</summary>

Preview a Custom Form Workflow

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:PreviewCustomFormWorkflowResponse|error`

**Sample code:**

```ballerina
oas:PreviewCustomFormWorkflowResponse result = check pricefxClient->previewCustomFormWorkflow(payload);
```

</details>

<details>
<summary>updateCustomForm</summary>

Update a Custom Form

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCustomFormRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCustomFormEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateCustomFormEnvelope result = check pricefxClient->updateCustomForm(payload);
```

</details>

<details>
<summary>updateCustomFormType</summary>

Update a Custom Form Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCustomFormTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCustomFormTypeResponse|error`

**Sample code:**

```ballerina
oas:UpdateCustomFormTypeResponse result = check pricefxClient->updateCustomFormType(payload);
```

</details>

#### Data Change Requests

<details>
<summary>addDataChangeRequest</summary>

Add a Data Change Request

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddDCRRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddDCRResponse|error`

**Sample code:**

```ballerina
oas:AddDCRResponse result = check pricefxClient->addDataChangeRequest(payload);
```

</details>

<details>
<summary>addDataChangeRequestItem</summary>

Add a Data Change Request Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request you want to add the Data Change Request Item to |
| `payload` | <code>oas:AddDCRIRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddDCRIResponse|error`

**Sample code:**

```ballerina
oas:AddDCRIResponse result = check pricefxClient->addDataChangeRequestItem(id, payload);
```

</details>

<details>
<summary>deleteDataChangeRequestItem</summary>

Delete a Data Change Request Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request whose item you want to delete |
| `payload` | <code>oas:DeleteDCRIRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteDCRIResponse|error`

**Sample code:**

```ballerina
oas:DeleteDCRIResponse result = check pricefxClient->deleteDataChangeRequestItem(id, payload);
```

</details>

<details>
<summary>deleteDataChangeRequestMassChange</summary>

Delete a Data Change Request Mass Change

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request |
| `payload` | <code>oas:DcrmanagerDeletemassopidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DataChangeRequestMassChangeEnvelope|error`

**Sample code:**

```ballerina
oas:DataChangeRequestMassChangeEnvelope result = check pricefxClient->deleteDataChangeRequestMassChange(id, payload);
```

</details>

<details>
<summary>getDataChangeRequest</summary>

Get a Data Change Request

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request you want to retrieve |
| `payload` | <code>oas:GetDCRRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetDCRResponse|error`

**Sample code:**

```ballerina
oas:GetDCRResponse result = check pricefxClient->getDataChangeRequest(id, payload);
```

</details>

<details>
<summary>getDataChangeRequestChanges</summary>

Get a Data Change Request (changes only)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request you want to retrieve changed items for |
| `payload` | <code>oas:GetDCRRequestChangeOnly</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetDCRResponseChangeOnly|error`

**Sample code:**

```ballerina
oas:GetDCRResponseChangeOnly result = check pricefxClient->getDataChangeRequestChanges(id, payload);
```

</details>

<details>
<summary>getDataChangeRequestMassChanges</summary>

Get Data Change Request Mass Changes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request |
| `payload` | <code>oas:DcrmanagerFetchmassopidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DataChangeRequestMassChangeEnvelope|error`

**Sample code:**

```ballerina
oas:DataChangeRequestMassChangeEnvelope result = check pricefxClient->getDataChangeRequestMassChanges(id, payload);
```

</details>

<details>
<summary>massEditDataChangeRequestItems</summary>

Mass Edit Data Change Request Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request |
| `payload` | <code>oas:DcrmanagerAddmassopidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DataChangeRequestMassChangeEnvelope|error`

**Sample code:**

```ballerina
oas:DataChangeRequestMassChangeEnvelope result = check pricefxClient->massEditDataChangeRequestItems(id, payload);
```

</details>

<details>
<summary>submitDataChangeRequest</summary>

Submit a Data Change Request

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the DCR to be submitted |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitDCRResponse|error`

**Sample code:**

```ballerina
oas:SubmitDCRResponse result = check pricefxClient->submitDataChangeRequest(id, payload);
```

</details>

<details>
<summary>submitDataChangeRequestAsync</summary>

Submit a Data Change Request (async)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the DCR to be submitted |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitDCRAsyncResponse|error`

**Sample code:**

```ballerina
oas:SubmitDCRAsyncResponse result = check pricefxClient->submitDataChangeRequestAsync(id, payload);
```

</details>

<details>
<summary>updateDataChangeRequestItem</summary>

Update a Data Change Request Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request whose item you want to update |
| `payload` | <code>oas:UpdateDCRIRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateDCRIResponse|error`

**Sample code:**

```ballerina
oas:UpdateDCRIResponse result = check pricefxClient->updateDataChangeRequestItem(id, payload);
```

</details>

<details>
<summary>updateDataChangeRequestMassChanges</summary>

Update Data Change Request Mass Changes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Data Change Request |
| `payload` | <code>oas:DcrmanagerUpdatemassopidBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DataChangeRequestMassChangeEnvelope|error`

**Sample code:**

```ballerina
oas:DataChangeRequestMassChangeEnvelope result = check pricefxClient->updateDataChangeRequestMassChanges(id, payload);
```

</details>

#### Data Manager

<details>
<summary>createDMFieldCollection</summary>

Create a DMFieldCollection

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `fcType` | <code>"DMDS"&#124;"DMT"</code> | Yes | The type of FC (FieldCollection) you want to create |
| `payload` | <code>oas:DatamartCreatefcfcTypeBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->createDMFieldCollection(fcType, payload);
```

</details>

<details>
<summary>createDataManagerEntity</summary>

Create a Data Manager Entity

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"DMF"&#124;"DM"&#124;"DMDS"</code> | Yes | The type code of the **Field Collection** you want to update |
| `payload` | <code>oas:CreateDataManagerEntityRequest</code> | Yes | Either `uniqueName` or `typedId` must be provided in the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DmObjectResponse|error`

**Sample code:**

```ballerina
oas:DmObjectResponse result = check pricefxClient->createDataManagerEntity(typeCode, payload);
```

</details>

<details>
<summary>deleteDataManagerEntity</summary>

Delete a Data Manager Entity

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"DM"&#124;"DMF"&#124;"DMDS"</code> | Yes | The type code of the **Field Collection** you want to delete |
| `payload` | <code>oas:DeleteDataManagerEntityRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteDataManagerEntityResponse|error`

**Sample code:**

```ballerina
oas:DeleteDataManagerEntityResponse result = check pricefxClient->deleteDataManagerEntity(typeCode, payload);
```

</details>

<details>
<summary>deleteDatamartOrphanObjects</summary>

Delete Datamart Orphan Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DatamartOrphanObjectsEnvelope|error`

**Sample code:**

```ballerina
oas:DatamartOrphanObjectsEnvelope result = check pricefxClient->deleteDatamartOrphanObjects();
```

</details>

<details>
<summary>executeDataLoadLogic</summary>

Execute a Data Load Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Data Load you want to evaluate |
| `logicName` | <code>string</code> | Yes | The name of the logic you want to execute |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteDataLoadLogicResponse|error`

**Sample code:**

```ballerina
oas:ExecuteDataLoadLogicResponse result = check pricefxClient->executeDataLoadLogic(typedId, logicName);
```

</details>

<details>
<summary>exportCsvFile</summary>

Export a CSV File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ExportCSVFileRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExportCsvFileQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->exportCsvFile(payload, queries);
```

</details>

<details>
<summary>exportDatamart</summary>

Export Datamart

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `fcTypedIdOrSourceName` | <code>string</code> | Yes | Restricts the export to a specific source, identified by either the 'typedId' or 'sourceName'. |
| `payload` | <code>oas:ExportDatamartRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExportDatamartQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ExportDatamartResponse|error`

**Sample code:**

```ballerina
oas:ExportDatamartResponse result = check pricefxClient->exportDatamart(fcTypedIdOrSourceName, payload, queries);
```

</details>

<details>
<summary>exportExcelFileXlsx</summary>

Export an Excel File (XLSX)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ExportExcelFileRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExportExcelFileXlsxQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->exportExcelFileXlsx(payload, queries);
```

</details>

<details>
<summary>fetchDataMartObject</summary>

Get a DM Object - **typedUniquename** – Format: "*&lt;typeCode&gt;.&lt;uniqueName&gt;*" (e.g., DMDS.SalesTransactions) - **typedId** – Format: "*&lt;dbId&gt;.&lt;typeCode&gt;*" (e.g., 123456.DMDS)' - **"*"** (asterisk) – Asterisk can be used when you are providing a **source$query** in `data` within the request body

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectId` | <code>string</code> | Yes | Use one of the following object identifiers: |
| `payload` | <code>oas:GetDMObjectRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:FetchDataMartObjectQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:GetDMObjectResponse|error`

**Sample code:**

```ballerina
oas:GetDMObjectResponse result = check pricefxClient->fetchDataMartObject(objectId, payload, queries);
```

</details>

<details>
<summary>getActionStatus</summary>

Get Action Status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `actionUUID` | <code>string</code> | Yes | The actionUUID to be sent with the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetActionStatusResponse|error`

**Sample code:**

```ballerina
oas:GetActionStatusResponse result = check pricefxClient->getActionStatus(actionUUID);
```

</details>

<details>
<summary>getDataMartObject</summary>

Get a DM Object - **typedUniquename** – Format: "*&lt;typeCode&gt;.&lt;uniqueName&gt;*" (e.g., DMDS.SalesTransactions) - **typedId** – Format: "*&lt;dbId&gt;.&lt;typeCode&gt;*" (e.g., 123456.DMDS)' - **"*"** (asterisk) – Asterisk can be used when you are providing a **source$query** in `data` within the request body

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectId` | <code>string</code> | Yes | Use one of the following object identifiers: |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:GetDataMartObjectQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:DataMartObjectEnvelope|error`

**Sample code:**

```ballerina
oas:DataMartObjectEnvelope result = check pricefxClient->getDataMartObject(objectId, queries);
```

</details>

<details>
<summary>getDmExportFile</summary>

Get a DM Export File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `fileName` | <code>string</code> | Yes | The name of the file previously created by a `datamart.export` request. The filename needs to be an exact match - no wildcards allowed, hence only one file at the time can be fetched |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->getDmExportFile(fileName);
```

</details>

<details>
<summary>getDmObjectNo</summary>

Get a DM Object (no count) - **typedUniquename** – Format: "*&lt;typeCode&gt;.&lt;uniqueName&gt;*" (e.g., DMDS.SalesTransactions) - **typedId** – Format: "*&lt;dbId&gt;.&lt;typeCode&gt;*" (e.g., 123456.DMDS) - **"*"** (asterisk) – Asterisk can be used when you are providing a **source$query** in `data` within the request body

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectId` | <code>string</code> | Yes | Use one of the following object identifiers: |
| `payload` | <code>oas:GetDMObjectNoCountRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetDMObjectNoCountResponse|error`

**Sample code:**

```ballerina
oas:GetDMObjectNoCountResponse result = check pricefxClient->getDmObjectNo(objectId, payload);
```

</details>

<details>
<summary>importDataLoad</summary>

Import a Data Load

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ImportDataLoadRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->importDataLoad(payload);
```

</details>

<details>
<summary>importDataMartFile</summary>

Import a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `slotId` | <code>string</code> | Yes | The `id` of the slot. Create the slot and retrieve the `id` using the **/uploadmanager.newuploadslot** endpoint |
| `typedId` | <code>string</code> | Yes | The `typedId` of the Data Manager entity |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->importDataMartFile(slotId, typedId);
```

</details>

<details>
<summary>listCharts</summary>

List Charts

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListChartsResponse|error`

**Sample code:**

```ballerina
oas:ListChartsResponse result = check pricefxClient->listCharts();
```

</details>

<details>
<summary>listDataLoads</summary>

List Data Loads

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListDataLoadsResponse|error`

**Sample code:**

```ballerina
oas:ListDataLoadsResponse result = check pricefxClient->listDataLoads();
```

</details>

<details>
<summary>listDataLoadsWith</summary>

List Data Loads (with validation and schedules)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListDataLoadsWithValidationResponse|error`

**Sample code:**

```ballerina
oas:ListDataLoadsWithValidationResponse result = check pricefxClient->listDataLoadsWith();
```

</details>

<details>
<summary>listDataManagerEntities</summary>

List Data Manager Entities

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"DM"&#124;"DMDS"&#124;"DMF"&#124;"DMT"</code> | Yes | The type code of the **Field Collection** |
| `payload` | <code>oas:ListDataManagerEntitiesRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DmObjectResponse|error`

**Sample code:**

```ballerina
oas:DmObjectResponse result = check pricefxClient->listDataManagerEntities(typeCode, payload);
```

</details>

<details>
<summary>listDatamartOrphanObjects</summary>

List Datamart Orphan Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DatamartOrphanObjectsEnvelope|error`

**Sample code:**

```ballerina
oas:DatamartOrphanObjectsEnvelope result = check pricefxClient->listDatamartOrphanObjects();
```

</details>

<details>
<summary>listRollups</summary>

List Rollups

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListRollupsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListRollupsResponse|error`

**Sample code:**

```ballerina
oas:ListRollupsResponse result = check pricefxClient->listRollups(payload);
```

</details>

<details>
<summary>massEditDataMartObject</summary>

Mass Edit

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the object you want to perform the mass edit action for |
| `payload` | <code>oas:MassEditRequest1</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassEditDatamartResponse|error`

**Sample code:**

```ballerina
oas:MassEditDatamartResponse result = check pricefxClient->massEditDataMartObject(typedId, payload);
```

</details>

<details>
<summary>queryDataManagerObject</summary>

Query a Data Manager Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:QueryDataManagerObjectRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:QueryDataManagerObjectQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:QueryDataManagerObjectResponse|error`

**Sample code:**

```ballerina
oas:QueryDataManagerObjectResponse result = check pricefxClient->queryDataManagerObject(payload, queries);
```

</details>

<details>
<summary>restoreDefaultDataSources</summary>

Restore Default Data Sources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dataSourceName` | <code>"Product"&#124;"Customer"&#124;"uom"&#124;"ccy"&#124;"cal"</code> | Yes | The name of the Data Source you want to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RestoreDefaultDataSourcesResponse|error`

**Sample code:**

```ballerina
oas:RestoreDefaultDataSourcesResponse result = check pricefxClient->restoreDefaultDataSources(dataSourceName);
```

</details>

<details>
<summary>runDataLoad</summary>

Run a Data Load

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:RunDataLoadRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RunDataLoadResponse|error`

**Sample code:**

```ballerina
oas:RunDataLoadResponse result = check pricefxClient->runDataLoad(payload);
```

</details>

<details>
<summary>saveDataLoad</summary>

Save a Data Load

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DatamartUpdatedataloadBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DataLoadEnvelope|error`

**Sample code:**

```ballerina
oas:DataLoadEnvelope result = check pricefxClient->saveDataLoad(payload);
```

</details>

<details>
<summary>sqlQueryDataManagerObject</summary>

SQL Query a Data Manager Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DatamartSqlqueryBody</code> | Yes | `sources` that SQL can use are query definitions. The sources become CTEs (Common Table Expression) in the final SQL. These are then used as a reference in the main query instead of referring to the actual tables directly. The request example compares the volume by month 2019 to 2020 |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:SqlQueryDataManagerObjectQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:QueryDataManagerObjectResponse|error`

**Sample code:**

```ballerina
oas:QueryDataManagerObjectResponse result = check pricefxClient->sqlQueryDataManagerObject(payload, queries);
```

</details>

<details>
<summary>updateDataManagerEntity</summary>

Update a Data Manager Entity

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"DMF"&#124;"DM"&#124;"DMDS"</code> | Yes | The type code of the **Field Collection** you want to update |
| `payload` | <code>oas:UpdateDataManagerEntityRequest</code> | Yes | Either `uniqueName` or `typedId` must be provided in the request |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DmObjectResponse|error`

**Sample code:**

```ballerina
oas:DmObjectResponse result = check pricefxClient->updateDataManagerEntity(typeCode, payload);
```

</details>

<details>
<summary>uploadBulkDataToDataSource</summary>

Upload a Bulk Data to Data Source

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `datasourceUniqueName` | <code>string</code> | Yes | The unique name of the Data Source where you want to upload the data to. You can also use `typedId` or the source name |
| `payload` | <code>oas:UploadBulkDataToDataSourceRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:BulkDataUploadEnvelope|error`

**Sample code:**

```ballerina
oas:BulkDataUploadEnvelope result = check pricefxClient->uploadBulkDataToDataSource(datasourceUniqueName, payload);
```

</details>

#### Imports

<details>
<summary>deleteImportChanges</summary>

Delete Import Changes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ImportmanagerDeletechangesBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->deleteImportChanges(payload);
```

</details>

<details>
<summary>listImportManagerChanges</summary>

List ImportManager Changes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The uniqueName to be sent with the request |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListImportManagerChangesEnvelope|error`

**Sample code:**

```ballerina
oas:ListImportManagerChangesEnvelope result = check pricefxClient->listImportManagerChanges(uniqueName, payload);
```

</details>

<details>
<summary>massDeleteImports</summary>

Mass Delete Imports

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>oas:ImportmanagerMassdeletetypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassDeleteImportsEnvelope|error`

**Sample code:**

```ballerina
oas:MassDeleteImportsEnvelope result = check pricefxClient->massDeleteImports(typedId, payload);
```

</details>

<details>
<summary>massEditImports</summary>

Mass Edit Imports

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>oas:ImportmanagerMassedittypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassEditImportsEnvelope|error`

**Sample code:**

```ballerina
oas:MassEditImportsEnvelope result = check pricefxClient->massEditImports(typedId, payload);
```

</details>

<details>
<summary>saveImportChange</summary>

Save Import Change

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SaveImportChangeEnvelope|error`

**Sample code:**

```ballerina
oas:SaveImportChangeEnvelope result = check pricefxClient->saveImportChange(payload);
```

</details>

<details>
<summary>submitChanges</summary>

Submit Changes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typedId of the import |
| `payload` | <code>oas:ImportmanagerSubmittypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ImportManagerUploadEnvelope|error`

**Sample code:**

```ballerina
oas:ImportManagerUploadEnvelope result = check pricefxClient->submitChanges(typedId, payload);
```

</details>

<details>
<summary>uploadExcelToImportManager</summary>

Upload Excel to Import Manager

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"P"&#124;"PX"</code> | Yes | Target object type code |
| `target` | <code>string</code> | Yes | Provides additional details about the target object, such as specifying a PX name if required |
| `slotId` | <code>string</code> | Yes | ID of the Upload Slot |
| `payload` | <code>oas:TypeCodetargetBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:UploadExcelToImportManagerQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ImportManagerUploadEnvelope|error`

**Sample code:**

```ballerina
oas:ImportManagerUploadEnvelope result = check pricefxClient->uploadExcelToImportManager(typeCode, target, slotId, payload, queries);
```

</details>

#### Lookup Tables / Company Parameters

<details>
<summary>addLookupTable</summary>

Add a Lookup Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddLookupTableRequest</code> | Yes | The request must contain all fields that are part of the business key for that object and all non-nullable fields |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddLookupTableResponse|error`

**Sample code:**

```ballerina
oas:AddLookupTableResponse result = check pricefxClient->addLookupTable(payload);
```

</details>

<details>
<summary>addLookupTableValue</summary>

Add a Lookup Table Value

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `payload` | <code>oas:AddLookupTableValueRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddLookupTableValueResponse|error`

**Sample code:**

```ballerina
oas:AddLookupTableValueResponse result = check pricefxClient->addLookupTableValue(tableId, payload);
```

</details>

<details>
<summary>copyLookupTable</summary>

Copy a Lookup Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table you want to copy |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CopyLookupTableResponse|error`

**Sample code:**

```ballerina
oas:CopyLookupTableResponse result = check pricefxClient->copyLookupTable(tableId);
```

</details>

<details>
<summary>deleteColumnValuesMatrix</summary>

Delete Column Values (Matrix only)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `columnName` | <code>string</code> | Yes | Enter the name of the column you want to delete values from |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->deleteColumnValuesMatrix(tableId, columnName);
```

</details>

<details>
<summary>deleteLookupTable</summary>

Delete a Lookup Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteLookupTableRequest</code> | Yes | Specify the `typedId` of the Lookup Table (Company Parameters) you want to delete |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteLookupTableResponse|error`

**Sample code:**

```ballerina
oas:DeleteLookupTableResponse result = check pricefxClient->deleteLookupTable(payload);
```

</details>

<details>
<summary>deleteLookupTableValue</summary>

Delete a Lookup Table Value + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `payload` | <code>oas:DeleteLookupTableValueRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteLookupTableValueResponse|error`

**Sample code:**

```ballerina
oas:DeleteLookupTableValueResponse result = check pricefxClient->deleteLookupTableValue(tableId, payload);
```

</details>

<details>
<summary>getLogicReferences</summary>

Get Logic References

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table you want to retrieve logic references for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetLogicReferencesResponse|error`

**Sample code:**

```ballerina
oas:GetLogicReferencesResponse result = check pricefxClient->getLogicReferences(tableId);
```

</details>

<details>
<summary>insertBulkDataToLookupTable</summary>

Insert Bulk Data to Lookup Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"JLTV"&#124;"JLTVM"&#124;"LT"&#124;"LTT"&#124;"LTV"&#124;"MLTV"&#124;"MLTV2"&#124;"MLTV3"&#124;"MLTV4"&#124;"MLTV5"&#124;"MLTV6"&#124;"MLTVM"</code> | Yes | Enter the type code of the Lookup Table entity you want to insert a data to |
| `payload` | <code>oas:InsertBulkDataToLookupTableRequest</code> | Yes | We used `/lookuptablemanager.loaddata/MLTV` in the request example to insert bulk data to Matrix Lookup Table. Notice that the `lookupTable` is used in the `header` section and then ID of the Lookup Table in the `data` section |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:InsertBulkDataLookupTableResponse|error`

**Sample code:**

```ballerina
oas:InsertBulkDataLookupTableResponse result = check pricefxClient->insertBulkDataToLookupTable(typeCode, payload);
```

</details>

<details>
<summary>listAllLookupTableValues</summary>

List All Lookup Table Values

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `payload` | <code>oas:ListAllLookupTableValuesRequest</code> | Yes | You can specify the start and end row to limit the number of retrieved records |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListAllLookupTableValuesQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ListAllLookupTableValuesResponse|error`

**Sample code:**

```ballerina
oas:ListAllLookupTableValuesResponse result = check pricefxClient->listAllLookupTableValues(tableId, payload, queries);
```

</details>

<details>
<summary>listAllLookupTables</summary>

List All Lookup Tables

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListAllLookupTablesRequest</code> | Yes | You can specify the start and end row to limit the number of retrieved Lookup Tables / Company Parameters |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListAllLookupTablesResponse|error`

**Sample code:**

```ballerina
oas:ListAllLookupTablesResponse result = check pricefxClient->listAllLookupTables(payload);
```

</details>

<details>
<summary>massDeleteLookupTableValues</summary>

Mass Delete Lookup Table Values + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `payload` | <code>oas:TableIdBatchBody</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:MassDeleteLookupTableValuesQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:DeleteLookupTableValueResponse1|error`

**Sample code:**

```ballerina
oas:DeleteLookupTableValueResponse1 result = check pricefxClient->massDeleteLookupTableValues(tableId, payload, queries);
```

</details>

<details>
<summary>massEditLookupTable</summary>

Mass Edit

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | The ID of the Lookup Table whose values you want to update |
| `payload` | <code>oas:MassEditRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassEditResponse|error`

**Sample code:**

```ballerina
oas:MassEditResponse result = check pricefxClient->massEditLookupTable(tableId, payload);
```

</details>

<details>
<summary>updateLookupTable</summary>

Update a Lookup Table + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateLookupTableRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateLookupTableResponse|error`

**Sample code:**

```ballerina
oas:UpdateLookupTableResponse result = check pricefxClient->updateLookupTable(payload);
```

</details>

<details>
<summary>updateLookupTableValue</summary>

Update a Lookup Table Value

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `payload` | <code>oas:UpdateLookupTableValueRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateLookupTableValueResponse|error`

**Sample code:**

```ballerina
oas:UpdateLookupTableValueResponse result = check pricefxClient->updateLookupTableValue(tableId, payload);
```

</details>

<details>
<summary>upsertLookupTableValue</summary>

Upsert a Lookup Table Value

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableId` | <code>string</code> | Yes | Enter the ID of the table. The ID can be retrieved using the `/lookuptablemanager.fetch` method |
| `payload` | <code>oas:UpsertLookupTableValueRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpsertLookupTableValueResponse|error`

**Sample code:**

```ballerina
oas:UpsertLookupTableValueResponse result = check pricefxClient->upsertLookupTableValue(tableId, payload);
```

</details>

#### Key-Value Store

<details>
<summary>countKeys</summary>

Count Keys

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | The table to count keys from |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->countKeys(tableName);
```

</details>

<details>
<summary>createKvTable</summary>

Create a KV Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want create. Only lower case letters, numbers and underscores are allowed. Do not use special characters |
| `payload` | <code>oas:CreateKVTableRequest</code> | Yes | The sample request creates a table with four columns: sku, customer, record and payload (TEXT).&lt;br&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->createKvTable(tableName, payload);
```

</details>

<details>
<summary>deleteKey</summary>

Delete a Key

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | The tableName to be sent with the request |
| `payload` | <code>oas:DeleteKVKeyRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->deleteKey(tableName, payload);
```

</details>

<details>
<summary>dropKvTable</summary>

Drop a KV Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want drop. Only lower case letters, numbers and underscores are allowed. Do not use special characters |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `record`

**Sample code:**

```ballerina
record result = check pricefxClient->dropKvTable(tableName, payload);
```

</details>

<details>
<summary>getKey</summary>

Get a Key

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want to retrieve the "payload" from |
| `payload` | <code>oas:GetKVKeyRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->getKey(tableName, payload);
```

</details>

<details>
<summary>getTableInfo</summary>

Get a Table Info

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want to retrieve information about |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetKVTableInfoResponse|error`

**Sample code:**

```ballerina
oas:GetKVTableInfoResponse result = check pricefxClient->getTableInfo(tableName);
```

</details>

<details>
<summary>insertBulkKvData</summary>

Insert Bulk KV Data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want upload data to |
| `payload` | <code>oas:InsertBulkKVDataRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->insertBulkKvData(tableName, payload);
```

</details>

<details>
<summary>listKvTables</summary>

List KV Tables

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListKVTablesResponse|error`

**Sample code:**

```ballerina
oas:ListKVTablesResponse result = check pricefxClient->listKvTables();
```

</details>

<details>
<summary>searchKvTable</summary>

Search a KV Table + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want to search the pattern for |
| `payload` | <code>oas:SearchKVTableRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SearchKvTableEnvelope[]|error`

**Sample code:**

```ballerina
oas:SearchKvTableEnvelope[] result = check pricefxClient->searchKvTable(tableName, payload);
```

</details>

<details>
<summary>truncateTable</summary>

Truncate a Table

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | The table you want to remove the keys from |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:TruncateKVTableResponse|error`

**Sample code:**

```ballerina
oas:TruncateKVTableResponse result = check pricefxClient->truncateTable(tableName);
```

</details>

<details>
<summary>upsertKey</summary>

Upsert a Key + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | A name of the table you want to upsert the key into |
| `payload` | <code>oas:UpsertKVKeyRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpsertKVKeyResponse|error`

**Sample code:**

```ballerina
oas:UpsertKVKeyResponse result = check pricefxClient->upsertKey(tableName, payload);
```

</details>

#### Logics

<details>
<summary>copyLogic</summary>

Copy a Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the logic. you want to copy. The `id` is the `typedId` without the **F** suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.F**  is **2147484837** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CopyLogicResponse|error`

**Sample code:**

```ballerina
oas:CopyLogicResponse result = check pricefxClient->copyLogic(id);
```

</details>

<details>
<summary>deleteLogic</summary>

Delete a Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the logic you want to delete. `id`  is the `typedId` without **F** suffix. For example, the `id` attribute of the item with `typedId` = **2147484835.F** is **2147484835** |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteLogicResponse|error`

**Sample code:**

```ballerina
oas:DeleteLogicResponse result = check pricefxClient->deleteLogic(id);
```

</details>

<details>
<summary>executeLibraryFunction</summary>

Execute Library Function

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formulaName` | <code>string</code> | Yes | Name of the formula library containing the function |
| `elementName` | <code>string</code> | Yes | Name of the library element containing the function |
| `functionName` | <code>string</code> | Yes | Name of the function to execute |
| `payload` | <code>oas:ElementNamefunctionNameBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->executeLibraryFunction(formulaName, elementName, functionName, payload);
```

</details>

<details>
<summary>executeLogicInService</summary>

Execute a Logic Without a Context in a Service + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to execute |
| `payload` | <code>record &#123;record &#123;&#125; data?;&#125;</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LogicResponse|error`

**Sample code:**

```ballerina
oas:LogicResponse result = check pricefxClient->executeLogicInService(uniqueName, payload);
```

</details>

<details>
<summary>executeLogicInServiceReadOnly</summary>

Execute a Logic Without a Context in a Service (Read-Only)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to execute |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteLogicReadOnlyResponse|error`

**Sample code:**

```ballerina
oas:ExecuteLogicReadOnlyResponse result = check pricefxClient->executeLogicInServiceReadOnly(uniqueName);
```

</details>

<details>
<summary>executeLogicRead</summary>

Execute a Logic (Read-Only)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to execute |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteLogicReadOnlyResponse|error`

**Sample code:**

```ballerina
oas:ExecuteLogicReadOnlyResponse result = check pricefxClient->executeLogicRead(uniqueName);
```

</details>

<details>
<summary>executeLogicWithout</summary>

Execute a Logic (Without a Context) + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to execute |
| `payload` | <code>record &#123;record &#123;&#125; data?;&#125;</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ExecuteLogicWithoutQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ExecuteLogicWithoutProductContextResponse|error`

**Sample code:**

```ballerina
oas:ExecuteLogicWithoutProductContextResponse result = check pricefxClient->executeLogicWithout(uniqueName, payload, queries);
```

</details>

<details>
<summary>executeNamedProductLogic</summary>

Execute a Logic + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sku` | <code>string</code> | Yes | The `sku` or `typedId` of the product you want to execute the assigned logic for |
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to execute |
| `payload` | <code>record &#123;record &#123;&#125; data?;&#125;</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteLogicResponse|error`

**Sample code:**

```ballerina
oas:ExecuteLogicResponse result = check pricefxClient->executeNamedProductLogic(sku, uniqueName, payload);
```

</details>

<details>
<summary>executeProductLogic</summary>

Execute an Assigned Logic + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sku` | <code>string</code> | Yes | The `sku` or `typedId` of the product you want to execute the logic for |
| `payload` | <code>record &#123;record &#123;&#125; data?;&#125;</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteAssignedLogicResponse|error`

**Sample code:**

```ballerina
oas:ExecuteAssignedLogicResponse result = check pricefxClient->executeProductLogic(sku, payload);
```

</details>

<details>
<summary>generateParameters</summary>

Generate Parameters

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:GenerateParametersRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenerateParametersResponse|error`

**Sample code:**

```ballerina
oas:GenerateParametersResponse result = check pricefxClient->generateParameters(payload);
```

</details>

<details>
<summary>getDefaultPricingLogicName</summary>

Get a Default Pricing Logic Name

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetDefaultPricingLogicNameResponse|error`

**Sample code:**

```ballerina
oas:GetDefaultPricingLogicNameResponse result = check pricefxClient->getDefaultPricingLogicName();
```

</details>

<details>
<summary>getLogic</summary>

Get a Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the logic you want to retrieve details for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetLogicResponse|error`

**Sample code:**

```ballerina
oas:GetLogicResponse result = check pricefxClient->getLogic(id);
```

</details>

<details>
<summary>listElements</summary>

List Elements

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to list elements for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListElementsResponse|error`

**Sample code:**

```ballerina
oas:ListElementsResponse result = check pricefxClient->listElements(uniqueName);
```

</details>

<details>
<summary>listFunctions</summary>

List Functions

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListFunctionsResponse|error`

**Sample code:**

```ballerina
oas:ListFunctionsResponse result = check pricefxClient->listFunctions();
```

</details>

<details>
<summary>listLibraries</summary>

List Libraries

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLibrariesResponse|error`

**Sample code:**

```ballerina
oas:ListLibrariesResponse result = check pricefxClient->listLibraries();
```

</details>

<details>
<summary>listLogicParametersInput</summary>

List Logic Parameters (Input Fields)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic you want to list parameters for. If omitted, the logic as specified in the product’s master is used, otherwise the passed logic is used |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLogicInputFieldsResponse|error`

**Sample code:**

```ballerina
oas:ListLogicInputFieldsResponse result = check pricefxClient->listLogicParametersInput(uniqueName);
```

</details>

<details>
<summary>listLogics</summary>

List Logics

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLogicsResponse|error`

**Sample code:**

```ballerina
oas:ListLogicsResponse result = check pricefxClient->listLogics();
```

</details>

<details>
<summary>setDefaultPricingLogic</summary>

Set a Default Pricing Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `uniqueName` | <code>string</code> | Yes | The name (`uniqueName`) of the logic that will be set as default. Leave blank to clear the default pricing logic |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SetDefaultPricingLogicResponse|error`

**Sample code:**

```ballerina
oas:SetDefaultPricingLogicResponse result = check pricefxClient->setDefaultPricingLogic(uniqueName);
```

</details>

<details>
<summary>syntaxCheck</summary>

Syntax Check

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SyntaxCheckRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->syntaxCheck(payload);
```

</details>

<details>
<summary>testLogic</summary>

Test a Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:TestLogicRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:TestLogicEnvelope|error`

**Sample code:**

```ballerina
oas:TestLogicEnvelope result = check pricefxClient->testLogic(payload);
```

</details>

<details>
<summary>updateLogic</summary>

Update a Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the logic. The `id` is the `typedId` without the **F** suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.F**  is **2147484837** |
| `payload` | <code>record &#123;record &#123;decimal version?; string typedId?; string uniqueName?; string label?; string validAfter?; string status?; anydata simulationSet?; anydata userGroupEdit?; anydata userGroupViewDetails?; anydata formulaNature?; string lastUpdateByName?; record &#123;decimal version?; string typedId?; string elementName?; string elementLabel?; anydata elementDescription?; string[] elementGroups?; anydata conditionElementName?; boolean hideWarnings?; boolean excludeFromExport?; boolean protectedExpression?; decimal elementTimeout?; decimal displayOptions?; string? formatType?; anydata elementSuffix?; boolean allowOverride?; boolean summarize?; boolean hideOnNull?; anydata userGroup?; anydata cssProperties?; anydata resultGroup?; string combinationType?; boolean storeInAttributeExtension?; anydata criticalAlert?; anydata redAlert?; anydata yellowAlert?; anydata labelTranslations?; string createDate?; decimal createdBy?; string lastUpdateDate?; decimal lastUpdateBy?; string formulaExpression?;&#125;[] elements?; record &#123;&#125;[] inputDescriptors?; string formulaType?; anydata createdByName?; string createDate?; decimal createdBy?; string lastUpdateDate?; decimal lastUpdateBy?;&#125; data?;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LogicResponse|error`

**Sample code:**

```ballerina
oas:LogicResponse result = check pricefxClient->updateLogic(id, payload);
```

</details>

<details>
<summary>updateLogicNo</summary>

Update a Logic (No syntax check)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the logic. The `id` is the `typedId` without the **F** suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.F**  is **2147484837** |
| `payload` | <code>record &#123;record &#123;decimal version?; string typedId?; string uniqueName?; string label?; string validAfter?; string status?; anydata simulationSet?; anydata userGroupEdit?; anydata userGroupViewDetails?; anydata formulaNature?; string lastUpdateByName?; record &#123;decimal version?; string typedId?; string elementName?; string elementLabel?; anydata elementDescription?; string[] elementGroups?; anydata conditionElementName?; boolean hideWarnings?; boolean excludeFromExport?; boolean protectedExpression?; decimal elementTimeout?; decimal displayOptions?; string? formatType?; anydata elementSuffix?; boolean allowOverride?; boolean summarize?; boolean hideOnNull?; anydata userGroup?; anydata cssProperties?; anydata resultGroup?; string combinationType?; boolean storeInAttributeExtension?; anydata criticalAlert?; anydata redAlert?; anydata yellowAlert?; anydata labelTranslations?; string createDate?; decimal createdBy?; string lastUpdateDate?; decimal lastUpdateBy?; string formulaExpression?;&#125;[] elements?; record &#123;&#125;[] inputDescriptors?; string formulaType?; anydata createdByName?; string createDate?; decimal createdBy?; string lastUpdateDate?; decimal lastUpdateBy?;&#125; data?;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LogicResponse|error`

**Sample code:**

```ballerina
oas:LogicResponse result = check pricefxClient->updateLogicNo(id, payload);
```

</details>

<details>
<summary>updateLogicPartial</summary>

Update a Logic (Partial)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the logic. The `id` is the `typedId` without the **F** suffix. For example, the `id` attribute of the item with `typedId` = **2147484837.F**  is **2147484837** |
| `payload` | <code>record &#123;record &#123;decimal version?; string typedId?; string uniqueName?; string label?; string validAfter?; string status?; anydata simulationSet?; anydata userGroupEdit?; anydata userGroupViewDetails?; anydata formulaNature?; string lastUpdateByName?; record &#123;decimal version?; string typedId?; string elementName?; string elementLabel?; anydata elementDescription?; string[] elementGroups?; anydata conditionElementName?; boolean hideWarnings?; boolean excludeFromExport?; boolean protectedExpression?; decimal elementTimeout?; decimal displayOptions?; string? formatType?; anydata elementSuffix?; boolean allowOverride?; boolean summarize?; boolean hideOnNull?; anydata userGroup?; anydata cssProperties?; anydata resultGroup?; string combinationType?; boolean storeInAttributeExtension?; anydata criticalAlert?; anydata redAlert?; anydata yellowAlert?; anydata labelTranslations?; string createDate?; decimal createdBy?; string lastUpdateDate?; decimal lastUpdateBy?; string formulaExpression?;&#125;[] elements?; record &#123;&#125;[] inputDescriptors?; string formulaType?; anydata createdByName?; string createDate?; decimal createdBy?; string lastUpdateDate?; decimal lastUpdateBy?;&#125; data?;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LogicResponse|error`

**Sample code:**

```ballerina
oas:LogicResponse result = check pricefxClient->updateLogicPartial(id, payload);
```

</details>

#### Calculation Grids

<details>
<summary>acceptCalculationGridItem</summary>

Submit a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Calculation Grid you want to submit items for. You can retrieve the `id` of the CG, for example, by calling the `/fetch/CG` endpoint |
| `payload` | <code>oas:SubmitCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:SubmitCalculationGridItemResponse result = check pricefxClient->acceptCalculationGridItem(id, payload);
```

</details>

<details>
<summary>addCalculationGrid</summary>

Add a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:AddCalculationGridResponse result = check pricefxClient->addCalculationGrid(payload);
```

</details>

<details>
<summary>addCalculationGridItem</summary>

Add a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `payload` | <code>oas:AddCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:AddCalculationGridItemResponse result = check pricefxClient->addCalculationGridItem(keyNumber, payload);
```

</details>

<details>
<summary>calculateCalculationGrid</summary>

Calculate a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Calculation Grid you want to calculate |
| `payload` | <code>oas:CalculateCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CalculateCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:CalculateCalculationGridResponse result = check pricefxClient->calculateCalculationGrid(id, payload);
```

</details>

<details>
<summary>deleteCalculationGrid</summary>

Delete a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:DeleteCalculationGridResponse result = check pricefxClient->deleteCalculationGrid(payload);
```

</details>

<details>
<summary>deleteCalculationGridItem</summary>

Delete a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `payload` | <code>oas:DeleteCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:DeleteCalculationGridItemResponse result = check pricefxClient->deleteCalculationGridItem(keyNumber, payload);
```

</details>

<details>
<summary>getCalculationGrid</summary>

Get a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | ID of the Calculation Grid you want to retrieve |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:GetCalculationGridResponse result = check pricefxClient->getCalculationGrid(id, payload);
```

</details>

<details>
<summary>getCalculationGridItem</summary>

Get a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `id` | <code>string</code> | Yes | `id` of the Calculation Grid Item you want to fetch |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:GetCalculationGridItemResponse result = check pricefxClient->getCalculationGridItem(keyNumber, id, payload);
```

</details>

<details>
<summary>listCalculationGridItems</summary>

List Calculation Grid Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `keyNumber` | <code>"1"&#124;"2"&#124;"3"&#124;"4"&#124;"5"&#124;"6"</code> | Yes | Use CGI1..CGI6 in the path, where numbers from 1 to 6 refer to Calculation Grid Item keys |
| `payload` | <code>oas:ListCalculationGridItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCalculationGridItemsResponse|error`

**Sample code:**

```ballerina
oas:ListCalculationGridItemsResponse result = check pricefxClient->listCalculationGridItems(keyNumber, payload);
```

</details>

<details>
<summary>listCalculationGrids</summary>

List Calculation Grids

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListCalculationGridsResponse|error`

**Sample code:**

```ballerina
oas:ListCalculationGridsResponse result = check pricefxClient->listCalculationGrids(payload);
```

</details>

<details>
<summary>rejectCalculationGridItem</summary>

Deny a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The `id` of the Calculation Grid you want to deny items for. You can retrieve the `id` of the CG, for example, by calling the `/fetch/CG` endpoint |
| `payload` | <code>oas:DenyCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DenyCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:DenyCalculationGridItemResponse result = check pricefxClient->rejectCalculationGridItem(id, payload);
```

</details>

<details>
<summary>updateCalculationGrid</summary>

Update a Calculation Grid

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateCalculationGridRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCalculationGridResponse|error`

**Sample code:**

```ballerina
oas:UpdateCalculationGridResponse result = check pricefxClient->updateCalculationGrid(payload);
```

</details>

<details>
<summary>updateCalculationGridItem</summary>

Update a Calculation Grid Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Calculation Grid Item you want to update |
| `payload` | <code>oas:UpdateCalculationGridItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateCalculationGridItemResponse|error`

**Sample code:**

```ballerina
oas:UpdateCalculationGridItemResponse result = check pricefxClient->updateCalculationGridItem(id, payload);
```

</details>

#### Action Types

<details>
<summary>addActionType</summary>

Add an Action Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddActionTypeRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddActionTypeResponse|error`

**Sample code:**

```ballerina
oas:AddActionTypeResponse result = check pricefxClient->addActionType(payload);
```

</details>

<details>
<summary>deleteActionItemType</summary>

Delete an Action Item Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;record &#123;string typedId;&#125; data;&#125;</code> | Yes | The general delete request. Deletes the object specified by `typedId` in the request body |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteActionItemTypeResponse|error`

**Sample code:**

```ballerina
oas:DeleteActionItemTypeResponse result = check pricefxClient->deleteActionItemType(payload);
```

</details>

<details>
<summary>listActionTypes</summary>

List Action Types

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;int endRow?; record &#123;&#125;? oldValues?; string operationType?; int startRow?; string textMatchStyle?; record &#123;string _constructor?; string operator?; record &#123;string fieldName?; string operator?; string value?;&#125;[] criteria?;&#125; data?;&#125;</code> | Yes | A general fetch request. A filter can be applied |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListActionTypesResponse|error`

**Sample code:**

```ballerina
oas:ListActionTypesResponse result = check pricefxClient->listActionTypes(payload);
```

</details>

<details>
<summary>updateActionType</summary>

Update an Action Type

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateAITBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateActionTypeResponse|error`

**Sample code:**

```ballerina
oas:UpdateActionTypeResponse result = check pricefxClient->updateActionType(payload);
```

</details>

#### Actions

<details>
<summary>createActionItem</summary>

Create an Action Item + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddActionItemRequest</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddActionItemResponse|error`

**Sample code:**

```ballerina
oas:AddActionItemResponse result = check pricefxClient->createActionItem(payload);
```

</details>

<details>
<summary>deleteActionItem</summary>

Delete an Action Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteActionItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteActionItemResponse|error`

**Sample code:**

```ballerina
oas:DeleteActionItemResponse result = check pricefxClient->deleteActionItem(payload);
```

</details>

<details>
<summary>executeLogic</summary>

Execute a Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The `typeCode` of the Action Item you want to execute the calculation for |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteActionItemLogicResponse|error`

**Sample code:**

```ballerina
oas:ExecuteActionItemLogicResponse result = check pricefxClient->executeLogic(typeCode, payload);
```

</details>

<details>
<summary>listActionItems</summary>

List Action Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:FetchAIBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListActionItemsResponse|error`

**Sample code:**

```ballerina
oas:ListActionItemsResponse result = check pricefxClient->listActionItems(payload);
```

</details>

<details>
<summary>updateActionItem</summary>

Update an Action Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateActionItemRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateActionItemResponse|error`

**Sample code:**

```ballerina
oas:UpdateActionItemResponse result = check pricefxClient->updateActionItem(payload);
```

</details>

#### Jobs & Tasks

<details>
<summary>cancelJob</summary>

Cancel a Job

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` if the job you want to cancel |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->cancelJob(id, payload);
```

</details>

<details>
<summary>listJobs</summary>

List Jobs

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;int endRow?; record &#123;&#125;? oldValues?; string operationType?; int startRow?; string textMatchStyle?; record &#123;string _constructor?; string operator?; record &#123;string fieldName?; string operator?; string value?;&#125;[] criteria?;&#125; data?;&#125;</code> | Yes | A general fetch request. A filter can be applied |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListJSTResponse|error`

**Sample code:**

```ballerina
oas:ListJSTResponse result = check pricefxClient->listJobs(payload);
```

</details>

#### Workflow

<details>
<summary>addApproverStep</summary>

Add an Approver Step

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `currentStepId` | <code>string</code> | Yes | The ID of the workflow step. It can be retrieved using the `/workflowsmanager.fetch/active` (**List Pending Approvals**) endpoint |
| `payload` | <code>oas:AddApproverStepRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddApproverStepResponse|error`

**Sample code:**

```ballerina
oas:AddApproverStepResponse result = check pricefxClient->addApproverStep(currentStepId, payload);
```

</details>

<details>
<summary>addWatcherStep</summary>

Add a Watcher Step

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `currentStepId` | <code>string</code> | Yes | The ID of the workflow step. It can be retrieved using the `/workflowsmanager.fetch/active` (**List Pending Approvals**) endpoint |
| `payload` | <code>oas:AddWatcherStepRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddWatcherStepResponse|error`

**Sample code:**

```ballerina
oas:AddWatcherStepResponse result = check pricefxClient->addWatcherStep(currentStepId, payload);
```

</details>

<details>
<summary>approveDocument</summary>

Approve a Document

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `currentStepId` | <code>string</code> | Yes | The ID of the workflow step. It can be retrieved using the `/workflowsmanager.fetch/active` (**List Pending Approvals**) endpoint |
| `payload` | <code>oas:ApproveDocumentRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ApproveDocumentResponse|error`

**Sample code:**

```ballerina
oas:ApproveDocumentResponse result = check pricefxClient->approveDocument(currentStepId, payload);
```

</details>

<details>
<summary>denyDocument</summary>

Deny a Document

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `currentStepId` | <code>string</code> | Yes | The ID of the workflow step. It can be retrieved using the `/workflowsmanager.fetch/active` (**List Pending Approvals**) endpoint |
| `payload` | <code>oas:DenyDocumentRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DenyDocumentResponse|error`

**Sample code:**

```ballerina
oas:DenyDocumentResponse result = check pricefxClient->denyDocument(currentStepId, payload);
```

</details>

<details>
<summary>fetchPendingReviews</summary>

Fetch Pending Reviews

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:FetchPendingReviewsEnvelope|error`

**Sample code:**

```ballerina
oas:FetchPendingReviewsEnvelope result = check pricefxClient->fetchPendingReviews();
```

</details>

<details>
<summary>getWorkflowDocument</summary>

Get a Workflow Document

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the approvable object you want to retrieve workflow details for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetWorkflowDocumentResponse|error`

**Sample code:**

```ballerina
oas:GetWorkflowDocumentResponse result = check pricefxClient->getWorkflowDocument(typedId);
```

</details>

<details>
<summary>listPendingApprovals</summary>

List Pending Approvals

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListPendingApprovalsResponse|error`

**Sample code:**

```ballerina
oas:ListPendingApprovalsResponse result = check pricefxClient->listPendingApprovals();
```

</details>

<details>
<summary>listUserSPendingApprovals</summary>

List User's Pending Approvals

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `loginName` | <code>string</code> | Yes | The login name of the user you want to retrieve Pending Workflows for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListUserPendingApprovalsResponse|error`

**Sample code:**

```ballerina
oas:ListUserPendingApprovalsResponse result = check pricefxClient->listUserSPendingApprovals(loginName);
```

</details>

<details>
<summary>listWorkflows</summary>

List Workflows

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListWorkflowsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListWorkflowsResponse|error`

**Sample code:**

```ballerina
oas:ListWorkflowsResponse result = check pricefxClient->listWorkflows(payload);
```

</details>

<details>
<summary>setReviewAsDone</summary>

Set a Review as Done

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typedId of the object to mark as reviewed |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->setReviewAsDone(typedId, payload);
```

</details>

<details>
<summary>updateReviewStatus</summary>

Update a Review Status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typedId of the object to update |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->updateReviewStatus(typedId, payload);
```

</details>

<details>
<summary>withdrawDocument</summary>

Withdraw a Document

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `currentStepId` | <code>string</code> | Yes | The ID of the workflow step. It can be retrieved using the `/workflowsmanager.fetch/active` (**List Pending Approvals**) endpoint |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:WithdrawDocumentResponse|error`

**Sample code:**

```ballerina
oas:WithdrawDocumentResponse result = check pricefxClient->withdrawDocument(currentStepId);
```

</details>

#### Workflow Delegation

<details>
<summary>createWorkflowDelegation</summary>

Create a Workflow Delegation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:CreateWorkflowDelegationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:CreateWorkflowDelegationResponse|error`

**Sample code:**

```ballerina
oas:CreateWorkflowDelegationResponse result = check pricefxClient->createWorkflowDelegation(payload);
```

</details>

<details>
<summary>deactivateWorkflowDelegation</summary>

Deactivate a Workflow Delegation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeactivateWorkflowDelegationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeactivateWorkflowDelegationResponse|error`

**Sample code:**

```ballerina
oas:DeactivateWorkflowDelegationResponse result = check pricefxClient->deactivateWorkflowDelegation(payload);
```

</details>

<details>
<summary>deleteWorkflowDelegation</summary>

Delete a Workflow Delegation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:DeleteWorkflowDelegationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteWorkflowDelegationResponse|error`

**Sample code:**

```ballerina
oas:DeleteWorkflowDelegationResponse result = check pricefxClient->deleteWorkflowDelegation(payload);
```

</details>

<details>
<summary>listDelegatedWorkflows</summary>

List Delegated Workflows

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListDelegatedWorkflowsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListDelegatedWorkflowsResponse|error`

**Sample code:**

```ballerina
oas:ListDelegatedWorkflowsResponse result = check pricefxClient->listDelegatedWorkflows(payload);
```

</details>

<details>
<summary>updateWorkflowDelegation</summary>

Update a Workflow Delegation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateWorkflowDelegationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateWorkflowDelegationResponse|error`

**Sample code:**

```ballerina
oas:UpdateWorkflowDelegationResponse result = check pricefxClient->updateWorkflowDelegation(payload);
```

</details>

<details>
<summary>validateWorkflowDelegation</summary>

Validate a Workflow Delegation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ValidateWorkflowDelegationRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ValidateWorkflowDelegationResponse|error`

**Sample code:**

```ballerina
oas:ValidateWorkflowDelegationResponse result = check pricefxClient->validateWorkflowDelegation(payload);
```

</details>

#### Notifications

<details>
<summary>deleteNotification</summary>

Delete a Notification

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:NotificationSetreadBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteNotificationEnvelope|error`

**Sample code:**

```ballerina
oas:DeleteNotificationEnvelope result = check pricefxClient->deleteNotification(payload);
```

</details>

<details>
<summary>listNotifications</summary>

List Notifications

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:NotificationListBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListNotificationsEnvelope|error`

**Sample code:**

```ballerina
oas:ListNotificationsEnvelope result = check pricefxClient->listNotifications(payload);
```

</details>

<details>
<summary>markAsRead</summary>

Mark as Read

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->markAsRead(payload);
```

</details>

<details>
<summary>sendValidationMessage</summary>

Send a Validation Message

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:NotificationSendBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->sendValidationMessage(payload);
```

</details>

#### Internationalization

<details>
<summary>addNewInternationalizationMessage</summary>

Add a New Internationalization Message + payload -

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:I18nmanagerPutBody</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AddInternationalizationMessageEnvelope|error`

**Sample code:**

```ballerina
oas:AddInternationalizationMessageEnvelope result = check pricefxClient->addNewInternationalizationMessage(payload);
```

</details>

<details>
<summary>deleteInternationalizationMessages</summary>

Delete Internationalization Messages

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:I18nmanagerDeleteKeysBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->deleteInternationalizationMessages(payload);
```

</details>

<details>
<summary>listInternationalizationMessages</summary>

List Internationalization Messages

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:I18nmanagerFetchWithExtraDataBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListInternationalizationMessagesEnvelope|error`

**Sample code:**

```ballerina
oas:ListInternationalizationMessagesEnvelope result = check pricefxClient->listInternationalizationMessages(payload);
```

</details>

#### Clicmanager

<details>
<summary>addLineItems</summary>

Add Line Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | typed ID of the target CLIC document |
| `payload` | <code>oas:ClicmanagerAdditemstypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `record`

**Sample code:**

```ballerina
record result = check pricefxClient->addLineItems(typedId, payload);
```

</details>

<details>
<summary>fetchActivities</summary>

Fetch Activities

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ActivitylogFetchBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `record`

**Sample code:**

```ballerina
record result = check pricefxClient->fetchActivities(payload);
```

</details>

<details>
<summary>getClicHeader</summary>

Get a Quote/Contract/Rebate Agreement/Compensation Plan Header

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Contract, Quote, or Rebate Agreement you want to return details for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetQuoteContractRebateAgreementResponse|error`

**Sample code:**

```ballerina
oas:GetQuoteContractRebateAgreementResponse result = check pricefxClient->getClicHeader(typedId);
```

</details>

<details>
<summary>importClicLineItems</summary>

Import Line Items (w/o Input Types)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>oas:ClicmanagerImportlineitemstypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ClicOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ClicOperationEnvelope result = check pricefxClient->importClicLineItems(typedId, payload);
```

</details>

<details>
<summary>listClicObjects</summary>

List CLIC Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Quote/Contract/Rebate Agreement/Compensation Plan you want to retrieve line items for |
| `payload` | <code>oas:GetCLICrequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListClicObjectsQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:GetCLICresponse|error`

**Sample code:**

```ballerina
oas:GetCLICresponse result = check pricefxClient->listClicObjects(typedId, payload, queries);
```

</details>

<details>
<summary>listUniqueClicItems</summary>

List Unique CLIC Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListUniqueCLICItemsResponse|error`

**Sample code:**

```ballerina
oas:ListUniqueCLICItemsResponse result = check pricefxClient->listUniqueClicItems(typedId, payload);
```

</details>

<details>
<summary>removeAllClicLineItems</summary>

Delete All Line Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the object you want to remove all line items from |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ClicOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ClicOperationEnvelope result = check pricefxClient->removeAllClicLineItems(typedId, payload);
```

</details>

<details>
<summary>sendEmail</summary>

Send an Email

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:SendEmailRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->sendEmail(payload);
```

</details>

<details>
<summary>setClicLostReason</summary>

Mark an Offer as Lost (with reason)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the Quote you want set as lost |
| `payload` | <code>oas:MarkOfferLostWithReasonRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SetClicLostReasonEnvelope|error`

**Sample code:**

```ballerina
oas:SetClicLostReasonEnvelope result = check pricefxClient->setClicLostReason(typedId, payload);
```

</details>

<details>
<summary>submitClic</summary>

Submit a Quote/Contract/Rebate Agreement

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Contract, Quote, or Rebate Agreement you want to submit |
| `payload` | <code>oas:SubmitQuoteContractRebateAgreementRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SubmitQuoteContractRebateAgreementResponse|error`

**Sample code:**

```ballerina
oas:SubmitQuoteContractRebateAgreementResponse result = check pricefxClient->submitClic(typedId, payload);
```

</details>

<details>
<summary>updateClicLineItems</summary>

Update CLIC Line Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the CLIC object (e.g., a Quote) you want to update line items for |
| `payload` | <code>oas:UpdateCLICLineItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpdateClicLineItemsEnvelope|error`

**Sample code:**

```ballerina
oas:UpdateClicLineItemsEnvelope result = check pricefxClient->updateClicLineItems(typedId, payload);
```

</details>

#### Advanced Configuration Options

<details>
<summary>getAdvancedConfigurationProperty</summary>

Get Advanced Configuration Property

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `propertyname` | <code>string</code> | Yes | Name of the configuration property to retrieve |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:AdvancedConfigPropertyEnvelope|error`

**Sample code:**

```ballerina
oas:AdvancedConfigPropertyEnvelope result = check pricefxClient->getAdvancedConfigurationProperty(propertyname);
```

</details>

#### Admin Tools

<details>
<summary>changeTermsOfUse</summary>

changeTermsOfUse

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AccountmanagerChangetermsofuseBody</code> | Yes |  |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No |  |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->changeTermsOfUse(payload);
```

</details>

<details>
<summary>pingWithout</summary>

Ping (without authentication)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->pingWithout();
```

</details>

#### Configuration

<details>
<summary>getExternalApplicationProperties</summary>

Get External Application Properties

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetexternalapppropertiesResponse|error`

**Sample code:**

```ballerina
oas:GetexternalapppropertiesResponse result = check pricefxClient->getExternalApplicationProperties();
```

</details>

#### Visual Configuration

<details>
<summary>addConfigurationStorage</summary>

Add a Configuration Storage

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:AddJCSBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConfigurationStorageOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConfigurationStorageOperationEnvelope result = check pricefxClient->addConfigurationStorage(payload);
```

</details>

<details>
<summary>deleteConfigurationStorage</summary>

Delete a Configuration Storage

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConfigurationStorageOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConfigurationStorageOperationEnvelope result = check pricefxClient->deleteConfigurationStorage(payload);
```

</details>

<details>
<summary>deployConfigurationStorage</summary>

Deploy a Configuration Storage

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:JcsmanagerDeployBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConfigurationStorageOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConfigurationStorageOperationEnvelope result = check pricefxClient->deployConfigurationStorage(payload);
```

</details>

<details>
<summary>getConfigurationStorage</summary>

Get a Configuration Storage

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:FetchJCSBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetConfigurationStorageEnvelope|error`

**Sample code:**

```ballerina
oas:GetConfigurationStorageEnvelope result = check pricefxClient->getConfigurationStorage(payload);
```

</details>

<details>
<summary>updateConfigurationStorage</summary>

Update a Configuration Storage

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:UpdateJCSBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ConfigurationStorageOperationEnvelope|error`

**Sample code:**

```ballerina
oas:ConfigurationStorageOperationEnvelope result = check pricefxClient->updateConfigurationStorage(payload);
```

</details>

#### Metadata

<details>
<summary>listAttributeFieldsMetadata</summary>

List Attribute Fields' Metadata

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"ACTT"&#124;"AI"&#124;"AP"&#124;"APIK"&#124;"BD"&#124;"BPT"&#124;"BR"&#124;"C"&#124;"CA"&#124;"CAM"&#124;"CDESC"&#124;"CF"&#124;"CFS"&#124;"CFT"&#124;"CH"&#124;"CL"&#124;"CLLI"&#124;"CLLIAM"&#124;"CLR"&#124;"CLT"&#124;"CN"&#124;"CO"&#124;"COAM"&#124;"COCT"&#124;"COCTAM"&#124;"COHT"&#124;"COHTAM"&#124;"COLI"&#124;"COR"&#124;"CORAM"&#124;"COROLI"&#124;"CORS"&#124;"CORSC"&#124;"COT"&#124;"CS"&#124;"CT"&#124;"CTAM"&#124;"CTLI"&#124;"CTMU"&#124;"CTMUI"&#124;"CTT"&#124;"CTTAM"&#124;"CTTREE"&#124;"CW"&#124;"CX10"&#124;"CX20"&#124;"CX3"&#124;"CX30"&#124;"CX50"&#124;"CX6"&#124;"CX8"&#124;"CXAM"&#124;"DA"&#124;"DB"&#124;"DCR"&#124;"DCRAM"&#124;"DCRI"&#124;"DCRL"&#124;"DCRMC"&#124;"DCRT"&#124;"DE"&#124;"DI"&#124;"DM"&#124;"DMDC"&#124;"DMDL"&#124;"DMDS"&#124;"DMF"&#124;"DMM"&#124;"DMR"&#124;"DMT"&#124;"DP"&#124;"DPR"&#124;"DPT"&#124;"DREF"&#124;"DREG"&#124;"EDL"&#124;"ET"&#124;"EVT"&#124;"F"&#124;"FE"&#124;"FN"&#124;"HEVT"&#124;"HRT"&#124;"HRTAM"&#124;"IDC"&#124;"IE"&#124;"ISH"&#124;"JLTV"&#124;"JLTV2"&#124;"JLTVM"&#124;"JST"&#124;"LAT"&#124;"LT"&#124;"LTT"&#124;"LTV"&#124;"M"&#124;"MC"&#124;"MLTV"&#124;"MLTV2"&#124;"MLTV3"&#124;"MLTV4"&#124;"MLTV5"&#124;"MLTV6"&#124;"MLTVM"&#124;"MN"&#124;"MO"&#124;"MPL"&#124;"MPLAM"&#124;"MPLI"&#124;"MPLIT"&#124;"MPLT"&#124;"MR"&#124;"MRAM"&#124;"MT"&#124;"NT"&#124;"P"&#124;"PAM"&#124;"PBOME"&#124;"PCOMP"&#124;"PCOMPCO"&#124;"PCW"&#124;"PDESC"&#124;"PG"&#124;"PGI"&#124;"PGIM"&#124;"PGT"&#124;"PH"&#124;"PL"&#124;"PLI"&#124;"PLIM"&#124;"PLPGTT"&#124;"PLT"&#124;"PR"&#124;"PRAM"&#124;"PREF"&#124;"PT"&#124;"PWH"&#124;"PX10"&#124;"PX20"&#124;"PX3"&#124;"PX30"&#124;"PX50"&#124;"PX6"&#124;"PX8"&#124;"PXAM"&#124;"PXREF"&#124;"PYR"&#124;"PYRAM"&#124;"Q"&#124;"QAM"&#124;"QLI"&#124;"QMU"&#124;"QMUI"&#124;"QT"&#124;"QTT"&#124;"QTTAM"&#124;"R"&#124;"RAT"&#124;"RATM"&#124;"RBA"&#124;"RBAAM"&#124;"RBALI"&#124;"RBAROLI"&#124;"RBAT"&#124;"RBT"&#124;"RBTAM"&#124;"RR"&#124;"RRAM"&#124;"RRS"&#124;"RRSC"&#124;"RT"&#124;"SAT"&#124;"SC"&#124;"SCN"&#124;"SCNAM"&#124;"SCT"&#124;"SIAM"&#124;"SIM"&#124;"SIMI"&#124;"SL"&#124;"SLAM"&#124;"SX10"&#124;"SX20"&#124;"SX3"&#124;"SX30"&#124;"SX50"&#124;"SX6"&#124;"SX8"&#124;"SXAM"&#124;"TFA"&#124;"TODO"&#124;"U"&#124;"UG"&#124;"US"&#124;"W"&#124;"WD"&#124;"WF"&#124;"WFE"&#124;"XPGI"&#124;"XPLI"&#124;"XSIMI"</code> | Yes | Enter the type code of the entity you want to retrieve information for. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListAttributeFieldsMetadataQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ListAttributeFieldsMetadata|error`

**Sample code:**

```ballerina
oas:ListAttributeFieldsMetadata result = check pricefxClient->listAttributeFieldsMetadata(typeCode, queries);
```

</details>

<details>
<summary>listEntityFields</summary>

List Entity Fields

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"ACTT"&#124;"AI"&#124;"AP"&#124;"APIK"&#124;"BD"&#124;"BPT"&#124;"BR"&#124;"C"&#124;"CA"&#124;"CAM"&#124;"CDESC"&#124;"CF"&#124;"CFS"&#124;"CFT"&#124;"CH"&#124;"CL"&#124;"CLLI"&#124;"CLLIAM"&#124;"CLR"&#124;"CLT"&#124;"CN"&#124;"CO"&#124;"COAM"&#124;"COCT"&#124;"COCTAM"&#124;"COHT"&#124;"COHTAM"&#124;"COLI"&#124;"COR"&#124;"CORAM"&#124;"COROLI"&#124;"CORS"&#124;"CORSC"&#124;"COT"&#124;"CS"&#124;"CT"&#124;"CTAM"&#124;"CTLI"&#124;"CTMU"&#124;"CTMUI"&#124;"CTT"&#124;"CTTAM"&#124;"CTTREE"&#124;"CW"&#124;"CX10"&#124;"CX20"&#124;"CX3"&#124;"CX30"&#124;"CX50"&#124;"CX6"&#124;"CX8"&#124;"CXAM"&#124;"DA"&#124;"DB"&#124;"DCR"&#124;"DCRAM"&#124;"DCRI"&#124;"DCRL"&#124;"DCRMC"&#124;"DCRT"&#124;"DE"&#124;"DI"&#124;"DM"&#124;"DMDC"&#124;"DMDL"&#124;"DMDS"&#124;"DMF"&#124;"DMM"&#124;"DMR"&#124;"DMT"&#124;"DP"&#124;"DPR"&#124;"DPT"&#124;"DREF"&#124;"DREG"&#124;"EDL"&#124;"ET"&#124;"EVT"&#124;"F"&#124;"FE"&#124;"FN"&#124;"HEVT"&#124;"HRT"&#124;"HRTAM"&#124;"IDC"&#124;"IE"&#124;"ISH"&#124;"JLTV"&#124;"JLTV2"&#124;"JLTVM"&#124;"JST"&#124;"LAT"&#124;"LT"&#124;"LTT"&#124;"LTV"&#124;"M"&#124;"MC"&#124;"MLTV"&#124;"MLTV2"&#124;"MLTV3"&#124;"MLTV4"&#124;"MLTV5"&#124;"MLTV6"&#124;"MLTVM"&#124;"MN"&#124;"MO"&#124;"MPL"&#124;"MPLAM"&#124;"MPLI"&#124;"MPLIT"&#124;"MPLT"&#124;"MR"&#124;"MRAM"&#124;"MT"&#124;"NT"&#124;"P"&#124;"PAM"&#124;"PBOME"&#124;"PCOMP"&#124;"PCOMPCO"&#124;"PCW"&#124;"PDESC"&#124;"PG"&#124;"PGI"&#124;"PGIM"&#124;"PGT"&#124;"PH"&#124;"PL"&#124;"PLI"&#124;"PLIM"&#124;"PLPGTT"&#124;"PLT"&#124;"PR"&#124;"PRAM"&#124;"PREF"&#124;"PT"&#124;"PWH"&#124;"PX10"&#124;"PX20"&#124;"PX3"&#124;"PX30"&#124;"PX50"&#124;"PX6"&#124;"PX8"&#124;"PXAM"&#124;"PXREF"&#124;"PYR"&#124;"PYRAM"&#124;"Q"&#124;"QAM"&#124;"QLI"&#124;"QMU"&#124;"QMUI"&#124;"QT"&#124;"QTT"&#124;"QTTAM"&#124;"R"&#124;"RAT"&#124;"RATM"&#124;"RBA"&#124;"RBAAM"&#124;"RBALI"&#124;"RBAROLI"&#124;"RBAT"&#124;"RBT"&#124;"RBTAM"&#124;"RR"&#124;"RRAM"&#124;"RRS"&#124;"RRSC"&#124;"RT"&#124;"SAT"&#124;"SC"&#124;"SCN"&#124;"SCNAM"&#124;"SCT"&#124;"SIAM"&#124;"SIM"&#124;"SIMI"&#124;"SL"&#124;"SLAM"&#124;"SX10"&#124;"SX20"&#124;"SX3"&#124;"SX30"&#124;"SX50"&#124;"SX6"&#124;"SX8"&#124;"SXAM"&#124;"TFA"&#124;"TODO"&#124;"U"&#124;"UG"&#124;"US"&#124;"W"&#124;"WD"&#124;"WF"&#124;"WFE"&#124;"XPGI"&#124;"XPLI"&#124;"XSIMI"</code> | Yes | Enter the type code of the entity you want to retrieve information for. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:ListEntityFieldsQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ListEntityFieldsResponse|error`

**Sample code:**

```ballerina
oas:ListEntityFieldsResponse result = check pricefxClient->listEntityFields(typeCode, queries);
```

</details>

#### General

<details>
<summary>createObject</summary>

Create an Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `payload` | <code>oas:CreateObjectRequest_1</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->createObject(typeCode, payload);
```

</details>

<details>
<summary>deleteColumnValues</summary>

Delete Column Values

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `columnName` | <code>string</code> | Yes | The name of the column/attribute you want to remove values from |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteColumnValuesResponse|error`

**Sample code:**

```ballerina
oas:DeleteColumnValuesResponse result = check pricefxClient->deleteColumnValues(typeCode, columnName);
```

</details>

<details>
<summary>deleteObject</summary>

Delete an Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"ACTT"&#124;"AP"&#124;"APIK"&#124;"BD"&#124;"BPT"&#124;"BR"&#124;"C"&#124;"CA"&#124;"CAM"&#124;"CDESC"&#124;"CF"&#124;"CFS"&#124;"CFT"&#124;"CH"&#124;"CLLI"&#124;"CN"&#124;"CS"&#124;"CT"&#124;"CTAM"&#124;"CTLI"&#124;"CTMU"&#124;"CTMUI"&#124;"CTT"&#124;"CTTAM"&#124;"CTTREE"&#124;"CW"&#124;"CX"&#124;"CXAM"&#124;"DA"&#124;"DB"&#124;"DCR"&#124;"DCRAM"&#124;"DCRI"&#124;"DCRL"&#124;"DCRMC"&#124;"DCRT"&#124;"DE"&#124;"DI"&#124;"DM"&#124;"DMDC"&#124;"DMDL"&#124;"DMDS"&#124;"DMF"&#124;"DMM"&#124;"DMR"&#124;"DMT"&#124;"DREG"&#124;"DWT"&#124;"ET"&#124;"EVT"&#124;"F"&#124;"FE"&#124;"FN"&#124;"IDC"&#124;"IE"&#124;"ISH"&#124;"JST"&#124;"JLTV"&#124;"JLTVM"&#124;"LAT"&#124;"LT"&#124;"LTT"&#124;"LTV"&#124;"M"&#124;"MLTV"&#124;"MLTV2"&#124;"MLTV3"&#124;"MLTV4"&#124;"MLTV5"&#124;"MLTV6"&#124;"MLTVM"&#124;"MPL"&#124;"MPLAM"&#124;"MPLI"&#124;"MPLIT"&#124;"MPLT"&#124;"MR"&#124;"MRAM"&#124;"MT"&#124;"P"&#124;"PAM"&#124;"PAPIJ"&#124;"PBOME"&#124;"PCOMP"&#124;"PCW"&#124;"PDESC"&#124;"PG"&#124;"PGI"&#124;"PGIM"&#124;"PGT"&#124;"PH"&#124;"PL"&#124;"PLI"&#124;"PLIM"&#124;"PLT"&#124;"PR"&#124;"PRAM"&#124;"PREF"&#124;"PT"&#124;"PWH"&#124;"PX"&#124;"PXAM"&#124;"PXREF"&#124;"PYR"&#124;"PYRAM"&#124;"Q"&#124;"QAM"&#124;"QLI"&#124;"QMU"&#124;"QMUI"&#124;"QT"&#124;"QTT"&#124;"QTTAM"&#124;"R"&#124;"RAT"&#124;"RATM"&#124;"RBA"&#124;"RBAAM"&#124;"RBALI"&#124;"RBAT"&#124;"RBT"&#124;"RBTAM"&#124;"RR"&#124;"RRAM"&#124;"RRS"&#124;"RRSC"&#124;"RT"&#124;"SAT"&#124;"SC"&#124;"SCN"&#124;"SCNAM"&#124;"SCT"&#124;"SIAM"&#124;"SIM"&#124;"SIMI"&#124;"TFA"&#124;"TODO"&#124;"U"&#124;"UG"&#124;"US"&#124;"W"&#124;"WD"&#124;"WF"&#124;"WFE"&#124;"XPGI"&#124;"XPLI"&#124;"XSIMI"</code> | Yes | Enter the type code of the entity you want to delete the object from. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article |
| `payload` | <code>oas:DeleteObjectRequest_1</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteObjectResponse_1|error`

**Sample code:**

```ballerina
oas:DeleteObjectResponse_1 result = check pricefxClient->deleteObject(typeCode, payload);
```

</details>

<details>
<summary>deleteObjects</summary>

Delete Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `payload` | <code>oas:DeleteObjectsForceFilterRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:DeleteObjectsResponse|error`

**Sample code:**

```ballerina
oas:DeleteObjectsResponse result = check pricefxClient->deleteObjects(typeCode, payload);
```

</details>

<details>
<summary>getObject</summary>

Get an Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `id` | <code>string</code> | Yes | The ID of the object you want to retrieve details for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetObjectResponse_1|error`

**Sample code:**

```ballerina
oas:GetObjectResponse_1 result = check pricefxClient->getObject(typeCode, id);
```

</details>

<details>
<summary>getQueryApiMetadata</summary>

Get Query API Metadata

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:QueryapiExecuteBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:QueryApiMetadataEnvelope|error`

**Sample code:**

```ballerina
oas:QueryApiMetadataEnvelope result = check pricefxClient->getQueryApiMetadata(payload);
```

</details>

<details>
<summary>insertBulkData</summary>

Insert Bulk Data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>oas:TypeCodeEnum</code> | Yes | Specify the type code for the entity you want to work with. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article.' |
| `payload` | <code>oas:InsertBulkDataRequest</code> | Yes | The **`/loaddata/P`** endpoint (Insert Bulk Products) is used in our example.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:LoadDataResponse|error`

**Sample code:**

```ballerina
oas:LoadDataResponse result = check pricefxClient->insertBulkData(typeCode, payload);
```

</details>

<details>
<summary>insertBulkDataFromFile</summary>

Insert Bulk Data From a File

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"C"&#124;"CDESC"&#124;"CX"&#124;"JLTV"&#124;"LTV"&#124;"MLTV"&#124;"P"&#124;"PBOME"&#124;"PCOMP"&#124;"PDESC"&#124;"PR"&#124;"PX"&#124;"PXREF"&#124;"SL"&#124;"SX"&#124;"TODO"&#124;"UG"</code> | Yes | Enter the type code of the entity you want to insert a data to. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article |
| `payload` | <code>oas:InsertBulkDataFromFileRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:InsertBulkDataFromFileQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:InsertBulkDataFromFileResponse|error`

**Sample code:**

```ballerina
oas:InsertBulkDataFromFileResponse result = check pricefxClient->insertBulkDataFromFile(typeCode, payload, queries);
```

</details>

<details>
<summary>insertBulkDataFromFileAsync</summary>

Insert Bulk Data From a File (async)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"C"&#124;"CDESC"&#124;"CX"&#124;"JLTV"&#124;"LTV"&#124;"MLTV"&#124;"P"&#124;"PBOME"&#124;"PCOMP"&#124;"PDESC"&#124;"PR"&#124;"PX"&#124;"PXREF"&#124;"SL"&#124;"SX"&#124;"TODO"&#124;"UG"</code> | Yes | Enter the type code of the entity you want to insert a data to. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article |
| `payload` | <code>oas:InsertBulkDataFromFileAsyncRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:InsertBulkDataFromFileAsyncQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:InsertBulkDataFromFileAsyncResponse|error`

**Sample code:**

```ballerina
oas:InsertBulkDataFromFileAsyncResponse result = check pricefxClient->insertBulkDataFromFileAsync(typeCode, payload, queries);
```

</details>

<details>
<summary>listObjects</summary>

List Objects

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `payload` | <code>oas:ListObjectsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->listObjects(typeCode, payload);
```

</details>

<details>
<summary>listTypeCodes</summary>

List Type Codes

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:TypeCodesResponse|error?`

**Sample code:**

```ballerina
oas:TypeCodesResponse|error? result = check pricefxClient->listTypeCodes();
```

</details>

<details>
<summary>massUpdate</summary>

Mass Update

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `payload` | <code>oas:MassUpdateRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:MassUpdateResponse|error`

**Sample code:**

```ballerina
oas:MassUpdateResponse result = check pricefxClient->massUpdate(typeCode, payload);
```

</details>

<details>
<summary>queryApiExecute</summary>

Query API Execute

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:QueryapiExecuteBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:QueryApiExecuteQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:QueryApiExecuteEnvelope|error`

**Sample code:**

```ballerina
oas:QueryApiExecuteEnvelope result = check pricefxClient->queryApiExecute(payload, queries);
```

</details>

<details>
<summary>updateObject</summary>

Update an Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `payload` | <code>oas:UpdateObjectRequest</code> | Yes | &lt;!-- theme: warning --&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->updateObject(typeCode, payload);
```

</details>

<details>
<summary>updateObjectReturningOldData</summary>

Update an Object (and return old data)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | The object's type code. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) |
| `payload` | <code>oas:UpdateObjectReturnOldDataRequest</code> | Yes | &lt;!-- theme: warning --&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check pricefxClient->updateObjectReturningOldData(typeCode, payload);
```

</details>

<details>
<summary>upsertObject</summary>

Upsert an Object

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>"ACTT"&#124;"AP"&#124;"APIK"&#124;"BD"&#124;"BPT"&#124;"BR"&#124;"C"&#124;"CA"&#124;"CAM"&#124;"CDESC"&#124;"CF"&#124;"CFS"&#124;"CFT"&#124;"CH"&#124;"CLLI"&#124;"CN"&#124;"CS"&#124;"CT"&#124;"CTAM"&#124;"CTLI"&#124;"CTMU"&#124;"CTMUI"&#124;"CTT"&#124;"CTTAM"&#124;"CTTREE"&#124;"CW"&#124;"CX"&#124;"CXAM"&#124;"DA"&#124;"DB"&#124;"DCR"&#124;"DCRAM"&#124;"DCRI"&#124;"DCRL"&#124;"DCRMC"&#124;"DCRT"&#124;"DE"&#124;"DI"&#124;"DM"&#124;"DMDC"&#124;"DMDL"&#124;"DMDS"&#124;"DMF"&#124;"DMM"&#124;"DMR"&#124;"DMT"&#124;"DREG"&#124;"DWT"&#124;"ET"&#124;"EVT"&#124;"F"&#124;"FE"&#124;"FN"&#124;"IDC"&#124;"IE"&#124;"ISH"&#124;"JST"&#124;"JLTV"&#124;"JLTVM"&#124;"LAT"&#124;"LT"&#124;"LTT"&#124;"LTV"&#124;"M"&#124;"MLTV"&#124;"MLTV2"&#124;"MLTV3"&#124;"MLTV4"&#124;"MLTV5"&#124;"MLTV6"&#124;"MLTVM"&#124;"MPL"&#124;"MPLAM"&#124;"MPLI"&#124;"MPLIT"&#124;"MPLT"&#124;"MR"&#124;"MRAM"&#124;"MT"&#124;"P"&#124;"PAM"&#124;"PAPIJ"&#124;"PBOME"&#124;"PCOMP"&#124;"PCW"&#124;"PDESC"&#124;"PG"&#124;"PGI"&#124;"PGIM"&#124;"PGT"&#124;"PH"&#124;"PL"&#124;"PLI"&#124;"PLIM"&#124;"PLT"&#124;"PR"&#124;"PRAM"&#124;"PREF"&#124;"PT"&#124;"PWH"&#124;"PX"&#124;"PXAM"&#124;"PXREF"&#124;"PYR"&#124;"PYRAM"&#124;"Q"&#124;"QAM"&#124;"QLI"&#124;"QMU"&#124;"QMUI"&#124;"QT"&#124;"QTT"&#124;"QTTAM"&#124;"R"&#124;"RAT"&#124;"RATM"&#124;"RBA"&#124;"RBAAM"&#124;"RBALI"&#124;"RBAT"&#124;"RBT"&#124;"RBTAM"&#124;"RR"&#124;"RRAM"&#124;"RRS"&#124;"RRSC"&#124;"RT"&#124;"SAT"&#124;"SC"&#124;"SCN"&#124;"SCNAM"&#124;"SCT"&#124;"SIAM"&#124;"SIM"&#124;"SIMI"&#124;"TFA"&#124;"TODO"&#124;"U"&#124;"UG"&#124;"US"&#124;"W"&#124;"WD"&#124;"WF"&#124;"WFE"&#124;"XPGI"&#124;"XPLI"&#124;"XSIMI"</code> | Yes | Enter the Type code of the entity you want to insert a data to. See [the list of Type codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article |
| `payload` | <code>oas:UpsertObjectRequest</code> | Yes | The **`/integrate/P`** endpoint (Upsert a Product) is used in our example.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ProductResponse|error`

**Sample code:**

```ballerina
oas:ProductResponse result = check pricefxClient->upsertObject(typeCode, payload);
```

</details>

<details>
<summary>upsertObjectReturningOldData</summary>

Upsert an Object (and return old data)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>oas:TypeCodeEnum</code> | Yes | Specify the type code for the entity you want to work with. See [the list of Type Codes](https://pricefx.atlassian.net/wiki/spaces/KB/pages/99570616/Type+Codes) in the Pricefx Knowledge Base article.' |
| `payload` | <code>oas:UpsertObjectReturnOldDataRequest</code> | Yes | The **`/integrate/P/returnolddata`** endpoint (upserts a product) is used in our example.&lt;p&gt; |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:UpsertObjectReturnOldDataResponse|error`

**Sample code:**

```ballerina
oas:UpsertObjectReturnOldDataResponse result = check pricefxClient->upsertObjectReturningOldData(typeCode, payload);
```

</details>

#### Optimization

<details>
<summary>calculateModelObjectStep</summary>

Calculate a Model Object Step

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to recalculate the step for |
| `stepName` | <code>"definition"&#124;"configuration"&#124;"results"&#124;"projections"&#124;"parallel"</code> | Yes | Enter the name of the step you want to calculate |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:CalculateModelObjectStepQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:ModelCalculationStepEnvelope|error`

**Sample code:**

```ballerina
oas:ModelCalculationStepEnvelope result = check pricefxClient->calculateModelObjectStep(typedId, stepName, queries);
```

</details>

<details>
<summary>cancelCalculationStep</summary>

Cancel a Calculation Step

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to cancel the calculation step for |
| `stepName` | <code>string</code> | Yes | The name of the step you want to cancel |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:JobStatusTrackerResponse|error`

**Sample code:**

```ballerina
oas:JobStatusTrackerResponse result = check pricefxClient->cancelCalculationStep(typedId, stepName);
```

</details>

<details>
<summary>duplicateModel</summary>

Duplicate a Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The typedId to be sent with the request |
| `payload` | <code>oas:OptimizationModelduplicatetypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ModelDuplicationEnvelope|error`

**Sample code:**

```ballerina
oas:ModelDuplicationEnvelope result = check pricefxClient->duplicateModel(typedId, payload);
```

</details>

<details>
<summary>executeModelLogic</summary>

Execute a Model Logic

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to execute the logic for |
| `stepName` | <code>string</code> | Yes | The name of the step you want to execute the logic for |
| `formulaName` | <code>string</code> | Yes | The name of the logic you want to execute |
| `payload` | <code>oas:ExecuteModelLogicRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ExecuteModelLogicResponse|error`

**Sample code:**

```ballerina
oas:ExecuteModelLogicResponse result = check pricefxClient->executeModelLogic(typedId, stepName, formulaName, payload);
```

</details>

<details>
<summary>exportModels</summary>

Export Models

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:OptimizationModelexportBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->exportModels(payload);
```

</details>

<details>
<summary>getCalculationStatus</summary>

Get a Calculation Status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to retrieve the calculation status for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:JobStatusTrackerResponse|error`

**Sample code:**

```ballerina
oas:JobStatusTrackerResponse result = check pricefxClient->getCalculationStatus(typedId);
```

</details>

<details>
<summary>getParallelCalculationItem</summary>

Get a Parallel Calculation Item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | `id` of the Parallel Calculation Item (PCI) you want to retrieve |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GetParallelCalculationItemResponse|error`

**Sample code:**

```ballerina
oas:GetParallelCalculationItemResponse result = check pricefxClient->getParallelCalculationItem(id, payload);
```

</details>

<details>
<summary>getStepCalculationStatus</summary>

Get a Step Calculation Status

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to retrieve the calculation status for |
| `stepName` | <code>string</code> | Yes | The name of the step you want to calculate |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:JobStatusTrackerResponse|error`

**Sample code:**

```ballerina
oas:JobStatusTrackerResponse result = check pricefxClient->getStepCalculationStatus(typedId, stepName);
```

</details>

<details>
<summary>importModels</summary>

Import Models

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:OptimizationModelimportBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ModelDuplicationEnvelope|error`

**Sample code:**

```ballerina
oas:ModelDuplicationEnvelope result = check pricefxClient->importModels(payload);
```

</details>

<details>
<summary>listModelLogicParameters</summary>

List Model Logic Parameters

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to retrieve logic parameters for |
| `stepName` | <code>string</code> | Yes | The name of the step you want to list logic parameters for |
| `formulaName` | <code>string</code> | Yes | The name of the logic you want to get parameters for |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListModelLogicParametersResponse|error`

**Sample code:**

```ballerina
oas:ListModelLogicParametersResponse result = check pricefxClient->listModelLogicParameters(typedId, stepName, formulaName);
```

</details>

<details>
<summary>listParallelCalculationItems</summary>

List Parallel Calculation Items

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:ListParallelCalculationItemsRequest</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListParallelCalculationItemsResponse|error`

**Sample code:**

```ballerina
oas:ListParallelCalculationItemsResponse result = check pricefxClient->listParallelCalculationItems(payload);
```

</details>

<details>
<summary>loadDataIntoFieldCollection</summary>

Load Data Into FieldCollection

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | Specifies the typedId (format: `&#123;id&#125;.&#123;type&#125;`) of the FieldCollection to load data into. Type must be either `DMDS` or `DMT` |
| `payload` | <code>oas:DatamartLoadfctypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check pricefxClient->loadDataIntoFieldCollection(typedId, payload);
```

</details>

<details>
<summary>recalculateCalculationOfStep</summary>

Recalculate a Calculation of a Step

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to recalculate the step for |
| `stepName` | <code>"definition"&#124;"configuration"&#124;"results"&#124;"projections"&#124;"parallel"</code> | Yes | Enter the name of the step you want to calculate |
| `calcName` | <code>string</code> | Yes | The name of the calculation you want to recalculate |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RecalculateCalculationOfStepResponse|error`

**Sample code:**

```ballerina
oas:RecalculateCalculationOfStepResponse result = check pricefxClient->recalculateCalculationOfStep(typedId, stepName, calcName, payload);
```

</details>

<details>
<summary>recalculateItemsOfParallelCalculation</summary>

Recalculate Items of a Parallel Calculation

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to recalculate the step for |
| `stepName` | <code>"definition"&#124;"configuration"&#124;"results"&#124;"projections"&#124;"parallel"</code> | Yes | Enter the name of the step you want to calculate |
| `calcName` | <code>string</code> | Yes | The name of the calculation you want to recalculate |
| `payload` | <code>oas:CalcNameItemBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ParallelCalculationEnvelope|error`

**Sample code:**

```ballerina
oas:ParallelCalculationEnvelope result = check pricefxClient->recalculateItemsOfParallelCalculation(typedId, stepName, calcName, payload);
```

</details>

<details>
<summary>revokeModel</summary>

Revoke a Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | `typedId` of the model you want to revoke |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:RevokeModelResponse|error`

**Sample code:**

```ballerina
oas:RevokeModelResponse result = check pricefxClient->revokeModel(typedId, payload);
```

</details>

<details>
<summary>saveModel</summary>

Save a Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to save |
| `stepName` | <code>"definition"&#124;"configuration"&#124;"results"&#124;"projections"</code> | Yes | Enter the name of the step you want to save. Steps are defined in the Model Class that is associated to the Model Object |
| `payload` | <code>oas:SaveModelRequest</code> | Yes | The `data` property can only contain the `state` field, all the rest fields will be ignored (and cannot be updated even with update/MO endpoint) |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SaveModelResponse|error`

**Sample code:**

```ballerina
oas:SaveModelResponse result = check pricefxClient->saveModel(typedId, stepName, payload);
```

</details>

<details>
<summary>submitModel</summary>

Submit a Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typedId` | <code>string</code> | Yes | The `typedId` of the Model Object you want to submit |
| `payload` | <code>record &#123;&#125;</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:SaveModelResponse|error`

**Sample code:**

```ballerina
oas:SaveModelResponse result = check pricefxClient->submitModel(typedId, payload);
```

</details>

<details>
<summary>updateJobStatusTrackerEntry</summary>

Update Job Status Tracker Entry

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:OptimizationUpdatejstBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:JobStatusTrackerUpdateEnvelope|error`

**Sample code:**

```ballerina
oas:JobStatusTrackerUpdateEnvelope result = check pricefxClient->updateJobStatusTrackerEntry(payload);
```

</details>

#### Logs

<details>
<summary>getLokiLog</summary>

Get a Loki Log

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `queries` | <code>*oas:GetLokiLogQueries</code> | Yes | Queries to be sent with the request |

**Returns:** `oas:LokiLogEnvelope|error`

**Sample code:**

```ballerina
oas:LokiLogEnvelope result = check pricefxClient->getLokiLog(queries);
```

</details>

<details>
<summary>listEmailTasks</summary>

List Email Tasks

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:NotificationListBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListEmailTasksEnvelope|error`

**Sample code:**

```ballerina
oas:ListEmailTasksEnvelope result = check pricefxClient->listEmailTasks(payload);
```

</details>

<details>
<summary>listEventTasks</summary>

List Event Tasks

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:NotificationListBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListEventTasksEnvelope|error`

**Sample code:**

```ballerina
oas:ListEventTasksEnvelope result = check pricefxClient->listEventTasks(payload);
```

</details>

<details>
<summary>listLogins</summary>

List Logins

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:BdmanagerListtypedIdBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListLoginsEnvelope|error`

**Sample code:**

```ballerina
oas:ListLoginsEnvelope result = check pricefxClient->listLogins(payload);
```

</details>

<details>
<summary>listSecurityConfigurationEvents</summary>

List Security & Configuration Events

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>oas:NotificationListBody</code> | Yes | Request payload |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:ListSecurityConfigEventsEnvelope|error`

**Sample code:**

```ballerina
oas:ListSecurityConfigEventsEnvelope result = check pricefxClient->listSecurityConfigurationEvents(payload);
```

</details>

#### Heartbeat

<details>
<summary>listTasks</summary>

List Tasks

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:GenericDataResponse|error`

**Sample code:**

```ballerina
oas:GenericDataResponse result = check pricefxClient->listTasks();
```

</details>

#### MCP

<details>
<summary>getMcpRoles</summary>

Get MCP Roles

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:McpRolesEnvelope|error`

**Sample code:**

```ballerina
oas:McpRolesEnvelope result = check pricefxClient->getMcpRoles();
```

</details>

<details>
<summary>getMcpTools</summary>

Get MCP Tools

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `oas:McpToolsEnvelope|error`

**Sample code:**

```ballerina
oas:McpToolsEnvelope result = check pricefxClient->getMcpTools();
```

</details>
