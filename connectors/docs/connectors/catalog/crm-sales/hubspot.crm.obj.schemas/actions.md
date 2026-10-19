---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.obj.schemas` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot custom object schemas, their properties, and inter-object associations. |

---

## Client

Manage HubSpot custom object schemas, their properties, and inter-object associations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: Bearer token (Private App), OAuth 2.0 refresh token, or legacy API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `validation` | <code>boolean</code> | `true` | Enables inbound payload validation via the constraint package. |
| `laxDataBinding` | <code>boolean</code> | `true` | When enabled, nil values are treated as optional and absent fields as nilable types. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.obj.schemas as schemas;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

schemas:Client hubSpotClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Schema operations

<details>
<summary>Get all schemas</summary>

Signature: `get /`

Retrieves all custom object schemas defined in the HubSpot portal. Pass `archived=true` to include archived schemas.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | <code>GetCrmObjectSchemasV3SchemasGetAllQueries</code> | No | Optional query parameters. Set `archived` to `true` to include archived schemas (default: `false`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `CollectionResponseObjectSchemaNoPaging|error`

Sample code:

```ballerina
schemas:CollectionResponseObjectSchemaNoPaging allSchemas = check hubSpotClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "2-3456789",
      "name": "author",
      "labels": {"singular": "Author", "plural": "Authors"},
      "primaryDisplayProperty": "author_name",
      "requiredProperties": ["author_name", "author_id"],
      "searchableProperties": [],
      "properties": [],
      "associations": [],
      "fullyQualifiedName": "p123456_author",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z",
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Create a new schema</summary>

Signature: `post /`

Creates a new custom object schema in HubSpot with the provided properties, labels, and association configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ObjectSchemaEgg</code> | Yes | The object schema definition including name, labels, properties, required fields, and associated objects. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `ObjectSchema|error`

Sample code:

```ballerina
schemas:ObjectSchemaEgg authorSchemaPayload = {
    name: "author",
    labels: {
        singular: "Author",
        plural: "Authors"
    },
    primaryDisplayProperty: "author_name",
    requiredProperties: ["author_name", "author_id"],
    properties: [
        {name: "author_id", label: "Author ID", "type": "string", fieldType: "text"},
        {name: "author_name", label: "Author Name", "type": "string", fieldType: "text"},
        {name: "location", label: "Location", "type": "string", fieldType: "text"}
    ],
    associatedObjects: []
};

schemas:ObjectSchema authorSchemaResponse = check hubSpotClient->/.post(authorSchemaPayload);
```

Sample response:

```ballerina
{
  "id": "2-3456789",
  "name": "author",
  "labels": {"singular": "Author", "plural": "Authors"},
  "primaryDisplayProperty": "author_name",
  "requiredProperties": ["author_name", "author_id"],
  "searchableProperties": [],
  "objectTypeId": "2-3456789",
  "fullyQualifiedName": "p123456_author",
  "properties": [
    {"name": "author_id", "label": "Author ID", "type": "string", "fieldType": "text", "groupName": "author_information", "options": [], "description": "", "hidden": false, "displayOrder": -1, "hasUniqueValue": false, "formField": false},
    {"name": "author_name", "label": "Author Name", "type": "string", "fieldType": "text", "groupName": "author_information", "options": [], "description": "", "hidden": false, "displayOrder": -1, "hasUniqueValue": false, "formField": false}
  ],
  "associations": [],
  "createdAt": "2024-06-01T09:00:00.000Z",
  "updatedAt": "2024-06-01T09:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Get an existing schema</summary>

Signature: `get /[objectType]`

Retrieves a specific custom object schema by its fully qualified name or object type ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The fully qualified name (e.g., `p123456_author`) or object type ID (e.g., `2-3456789`) of the schema. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `ObjectSchema|error`

Sample code:

```ballerina
schemas:ObjectSchema productSchema = check hubSpotClient->/["test123"].get();
```

Sample response:

```ballerina
{
  "id": "2-3456789",
  "name": "author",
  "labels": {"singular": "Author", "plural": "Authors"},
  "primaryDisplayProperty": "author_name",
  "requiredProperties": ["author_name", "author_id"],
  "searchableProperties": [],
  "objectTypeId": "2-3456789",
  "fullyQualifiedName": "p123456_author",
  "properties": [
    {"name": "author_name", "label": "Author Name", "type": "string", "fieldType": "text", "groupName": "author_information", "options": [], "description": "", "hidden": false, "displayOrder": -1, "hasUniqueValue": false, "formField": false}
  ],
  "associations": [],
  "portalId": 123456,
  "createdAt": "2024-06-01T09:00:00.000Z",
  "updatedAt": "2024-06-01T09:00:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Update a schema</summary>

Signature: `patch /[objectType]`

Updates attributes of an existing custom object schema such as labels, primary/secondary display properties, required fields, and searchability.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The fully qualified name or object type ID of the schema to update. |
| `payload` | <code>ObjectTypeDefinitionPatch</code> | Yes | The attributes to update on the schema definition. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `ObjectTypeDefinition|error`

Sample code:

```ballerina
schemas:ObjectTypeDefinitionPatch productSchemaPayload = {
    labels: {
        singular: "Product",
        plural: "Products"
    },
    primaryDisplayProperty: "product_name",
    requiredProperties: ["product_name", "product_id"]
};

schemas:ObjectTypeDefinition updatedSchema = check hubSpotClient->/["test123"].patch(productSchemaPayload);
```

Sample response:

```ballerina
{
  "id": "2-3456790",
  "name": "product",
  "labels": {"singular": "Product", "plural": "Products"},
  "primaryDisplayProperty": "product_name",
  "requiredProperties": ["product_name", "product_id"],
  "searchableProperties": [],
  "objectTypeId": "2-3456790",
  "fullyQualifiedName": "p123456_product",
  "portalId": 123456,
  "createdAt": "2024-05-01T08:00:00.000Z",
  "updatedAt": "2024-06-15T12:30:00.000Z",
  "archived": false
}
```

</details>

<details>
<summary>Delete a schema</summary>

Signature: `delete /[objectType]`

Archives (soft-deletes) a custom object schema. Pass `archived=true` in the query to hard-delete a previously archived schema.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The fully qualified name or object type ID of the schema to delete. |
| `queries` | <code>DeleteCrmObjectSchemasV3SchemasObjectTypeArchiveQueries</code> | No | Query parameters. Set `archived` to `true` to permanently delete an already-archived schema. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotClient->/["author"].delete();
```

</details>

#### Association operations

<details>
<summary>Create an association</summary>

Signature: `post /[objectType]/associations`

Creates a new association definition between two custom object types, linking a source object type to a target object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The fully qualified name or object type ID of the source schema. |
| `payload` | <code>AssociationDefinitionEgg</code> | Yes | Association definition including the from/to object type IDs and an optional name. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `AssociationDefinition|error`

Sample code:

```ballerina
schemas:AssociationDefinitionEgg associationPayload = {
    fromObjectTypeId: "2-3456790",
    name: "book_to_author",
    toObjectTypeId: "2-3456789"
};

schemas:AssociationDefinition association = check hubSpotClient->/book/associations.post(associationPayload);
```

Sample response:

```ballerina
{
  "id": "101",
  "fromObjectTypeId": "2-3456790",
  "toObjectTypeId": "2-3456789",
  "name": "book_to_author",
  "createdAt": "2024-06-01T09:05:00.000Z",
  "updatedAt": "2024-06-01T09:05:00.000Z"
}
```

</details>

<details>
<summary>Remove an association</summary>

Signature: `delete /[objectType]/associations/[associationIdentifier]`

Removes a specific association definition from a custom object schema by its association ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The fully qualified name or object type ID of the schema from which the association is removed. |
| `associationIdentifier` | <code>string</code> | Yes | The unique ID of the association definition to remove. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Additional HTTP headers to send with the request. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotClient->/["author"]/associations/["book_to_author"].delete();
```

</details>
