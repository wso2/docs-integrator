---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.associations.schema` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage association definitions and configurations between HubSpot CRM object types. |

---

## Client

Manage association definitions and configurations between HubSpot CRM object types.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | OAuth 2.0 refresh token config, bearer token, or API key config. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>http:Compression</code> | `COMPRESSION_AUTO` | Compression configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration. |
| `cache` | <code>http:CacheConfig</code> | `{}` | HTTP cache configuration. |
| `validation` | <code>boolean</code> | `true` | Enable/disable payload validation. |
| `laxDataBinding` | <code>boolean</code> | `true` | Enable/disable lax data binding. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.associations.schema as hsschema;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsschema:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};

final hsschema:Client hubspot = check new ({auth});
```

### Operations

#### Association definitions (labels)

<details>
<summary>Read association definitions between two object types</summary>

Signature: `get [string fromObjectType]/[string toObjectType]/labels`

Retrieves all association definitions (labels) between two specified CRM object types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type (e.g., `"contacts"`, `"companies"`). |
| `toObjectType` | <code>string</code> | Yes | The target object type (e.g., `"deals"`, `"companies"`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `CollectionResponseAssociationSpecWithLabelNoPaging|error`

Sample code:

```ballerina
hsschema:CollectionResponseAssociationSpecWithLabelNoPaging associations =
    check hubspot->/["contacts"]/["deals"]/labels;
```

Sample response:

```ballerina
{
  "results": [
    {
      "typeId": 3,
      "label": null,
      "category": "HUBSPOT_DEFINED"
    },
    {
      "typeId": 4,
      "label": null,
      "category": "HUBSPOT_DEFINED"
    }
  ]
}
```

</details>

<details>
<summary>Create a user-defined association definition</summary>

Signature: `post [string fromObjectType]/[string toObjectType]/labels`

Creates a new user-defined association definition with a label and optional inverse label between two CRM object types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `payload` | <code>PublicAssociationDefinitionCreateRequest</code> | Yes | The association definition to create, including `name`, optional `label`, and optional `inverseLabel`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `CollectionResponseAssociationSpecWithLabelNoPaging|error`

Sample code:

```ballerina
hsschema:PublicAssociationDefinitionCreateRequest payload = {
    name: "Headquarters_Franchise",
    label: "Franchise company",
    inverseLabel: "Headquarters company"
};

hsschema:CollectionResponseAssociationSpecWithLabelNoPaging result =
    check hubspot->/["companies"]/["companies"]/labels.post(payload);
```

Sample response:

```ballerina
{
  "results": [
    {
      "typeId": 35,
      "label": "Franchise company",
      "category": "USER_DEFINED"
    },
    {
      "typeId": 36,
      "label": "Headquarters company",
      "category": "USER_DEFINED"
    }
  ]
}
```

</details>

<details>
<summary>Update a user-defined association definition</summary>

Signature: `put [string fromObjectType]/[string toObjectType]/labels`

Updates the label and inverse label of an existing user-defined association definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `payload` | <code>PublicAssociationDefinitionUpdateRequest</code> | Yes | The update payload including `associationTypeId`, `label`, and optional `inverseLabel`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
hsschema:PublicAssociationDefinitionUpdateRequest payload = {
    associationTypeId: 35,
    label: "Franchise company updated",
    inverseLabel: "Headquarters company updated"
};

check hubspot->/["companies"]/["companies"]/labels.put(payload);
```

</details>

<details>
<summary>Delete an association definition</summary>

Signature: `delete [string fromObjectType]/[string toObjectType]/labels/[int:Signed32 associationTypeId]`

Deletes a user-defined association definition by its type ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `associationTypeId` | <code>int:Signed32</code> | Yes | The ID of the association type to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspot->/["companies"]/["companies"]/labels/[35].delete();
```

</details>

#### Association configurations

<details>
<summary>Retrieve all association configurations</summary>

Signature: `get definitions/configurations/all`

Retrieves all association definition configurations across all object types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `CollectionResponsePublicAssociationDefinitionUserConfigurationNoPaging|error`

Sample code:

```ballerina
hsschema:CollectionResponsePublicAssociationDefinitionUserConfigurationNoPaging configs =
    check hubspot->/definitions/configurations/all;
```

Sample response:

```ballerina
{
  "results": [
    {
      "typeId": 3,
      "category": "HUBSPOT_DEFINED",
      "label": null,
      "userEnforcedMaxToObjectIds": 1
    },
    {
      "typeId": 449,
      "category": "HUBSPOT_DEFINED",
      "label": null,
      "userEnforcedMaxToObjectIds": 5
    }
  ]
}
```

</details>

<details>
<summary>Retrieve configurations between two object types</summary>

Signature: `get definitions/configurations/[string fromObjectType]/[string toObjectType]`

Retrieves association configurations between two specified CRM object types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `CollectionResponsePublicAssociationDefinitionUserConfigurationNoPaging|error`

Sample code:

```ballerina
hsschema:CollectionResponsePublicAssociationDefinitionUserConfigurationNoPaging configs =
    check hubspot->/definitions/configurations/["contacts"]/["contacts"];
```

Sample response:

```ballerina
{
  "results": [
    {
      "typeId": 449,
      "category": "HUBSPOT_DEFINED",
      "label": null,
      "userEnforcedMaxToObjectIds": 2
    }
  ]
}
```

</details>

<details>
<summary>Batch create association configurations</summary>

Signature: `post definitions/configurations/[string fromObjectType]/[string toObjectType]/batch/create`

Creates multiple association configurations in a single batch request, setting cardinality constraints.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `payload` | <code>BatchInputPublicAssociationDefinitionConfigurationCreateRequest</code> | Yes | Batch of configuration create requests, each with `typeId`, `category`, and `maxToObjectIds`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `BatchResponsePublicAssociationDefinitionUserConfiguration|BatchResponsePublicAssociationDefinitionUserConfigurationWithErrors|error`

Sample code:

```ballerina
hsschema:BatchInputPublicAssociationDefinitionConfigurationCreateRequest payload = {
    inputs: [
        {
            typeId: 449,
            category: "HUBSPOT_DEFINED",
            maxToObjectIds: 5
        }
    ]
};

hsschema:BatchResponsePublicAssociationDefinitionUserConfiguration|
    hsschema:BatchResponsePublicAssociationDefinitionUserConfigurationWithErrors result =
    check hubspot->/definitions/configurations/["contacts"]/["contacts"]/batch/create(payload);
```

Sample response:

```ballerina
{
  "completedAt": "2025-01-15T10:30:00.000Z",
  "startedAt": "2025-01-15T10:29:59.000Z",
  "results": [
    {
      "typeId": 449,
      "category": "HUBSPOT_DEFINED",
      "userEnforcedMaxToObjectIds": 5
    }
  ],
  "status": "COMPLETE"
}
```

</details>

<details>
<summary>Batch update association configurations</summary>

Signature: `post definitions/configurations/[string fromObjectType]/[string toObjectType]/batch/update`

Updates multiple association configurations in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `payload` | <code>BatchInputPublicAssociationDefinitionConfigurationUpdateRequest</code> | Yes | Batch of configuration update requests, each with `typeId`, `category`, and `maxToObjectIds`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `BatchResponsePublicAssociationDefinitionConfigurationUpdateResult|BatchResponsePublicAssociationDefinitionConfigurationUpdateResultWithErrors|error`

Sample code:

```ballerina
hsschema:BatchInputPublicAssociationDefinitionConfigurationUpdateRequest payload = {
    inputs: [
        {
            typeId: 449,
            category: "HUBSPOT_DEFINED",
            maxToObjectIds: 10
        }
    ]
};

hsschema:BatchResponsePublicAssociationDefinitionConfigurationUpdateResult|
    hsschema:BatchResponsePublicAssociationDefinitionConfigurationUpdateResultWithErrors result =
    check hubspot->/definitions/configurations/["contacts"]/["contacts"]/batch/update(payload);
```

Sample response:

```ballerina
{
  "completedAt": "2025-01-15T11:00:00.000Z",
  "startedAt": "2025-01-15T10:59:59.000Z",
  "results": [
    {
      "typeId": 449,
      "category": "HUBSPOT_DEFINED",
      "userEnforcedMaxToObjectIds": 10
    }
  ],
  "status": "COMPLETE"
}
```

</details>

<details>
<summary>Batch delete association configurations</summary>

Signature: `post definitions/configurations/[string fromObjectType]/[string toObjectType]/batch/purge`

Deletes multiple association configurations in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | <code>string</code> | Yes | The source object type. |
| `toObjectType` | <code>string</code> | Yes | The target object type. |
| `payload` | <code>BatchInputPublicAssociationSpec</code> | Yes | Batch of association specs to delete, each with `typeId` and `category`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
hsschema:BatchInputPublicAssociationSpec payload = {
    inputs: [
        {
            typeId: 449,
            category: "HUBSPOT_DEFINED"
        }
    ]
};

check hubspot->/definitions/configurations/["contacts"]/["contacts"]/batch/purge(payload);
```

</details>
