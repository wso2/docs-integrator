---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.properties` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage CRM object properties and property groups via the HubSpot Properties API. |

---

## Client

Manage CRM object properties and property groups via the HubSpot Properties API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token grant, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | The maximum time to wait (in seconds) for a response before closing the connection. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>http:Compression</code> | `http:COMPRESSION_AUTO` | Specifies the way of handling compression (`accept-encoding`) header. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration for fault tolerance. |
| `validation` | <code>boolean</code> | `true` | Enables inbound payload validation via the constraint package. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.properties as hsproperties;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsproperties:OAuth2RefreshTokenGrantConfig auth = {
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};
final hsproperties:Client hubSpotProperties = check new ({auth});
```

### Operations

#### Property CRUD

<details>
<summary>Read all properties</summary>

Signature: `get /[string objectType]`

Read all existing properties for the specified object type. Returns a list of all properties, including default and custom properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`, `"Company"`, `"Deal"`). |
| `queries` | <code>GetCrmV3PropertiesObjectTypeGetAllQueries</code> | No | Query parameters: `archived` (default `false`) and `properties` (comma-separated field list). |

Returns: `CollectionResponsePropertyNoPaging|error`

Sample code:

```ballerina
hsproperties:CollectionResponsePropertyNoPaging result = check hubSpotProperties->/Contact;
```

Sample response:

```ballerina
{
  "results": [
    {
      "name": "email",
      "label": "Email",
      "type": "string",
      "fieldType": "text",
      "description": "Contact's email address",
      "groupName": "contactinformation",
      "options": [],
      "archived": false
    }
  ]
}
```

</details>

<details>
<summary>Create a property</summary>

Signature: `post /[string objectType]`

Create a new property for the specified object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `payload` | <code>PropertyCreate</code> | Yes | Property definition including name, label, type, fieldType, groupName, and options. |

Returns: `Property|error`

Sample code:

```ballerina
hsproperties:PropertyCreate newProperty = {
    name: "purchase_frequency",
    label: "Purchase Frequency",
    groupName: "customer_behavior",
    'type: "enumeration",
    fieldType: "select",
    description: "How often the customer makes purchases",
    options: [
        {label: "Daily", value: "daily", hidden: false, displayOrder: 1},
        {label: "Weekly", value: "weekly", hidden: false, displayOrder: 2},
        {label: "Monthly", value: "monthly", hidden: false, displayOrder: 3}
    ],
    hidden: false,
    formField: true,
    displayOrder: 1
};
hsproperties:Property result = check hubSpotProperties->/Contact.post(payload = newProperty);
```

Sample response:

```ballerina
{
  "name": "purchase_frequency",
  "label": "Purchase Frequency",
  "type": "enumeration",
  "fieldType": "select",
  "groupName": "customer_behavior",
  "description": "How often the customer makes purchases",
  "options": [
    {"label": "Daily", "value": "daily", "hidden": false, "displayOrder": 1},
    {"label": "Weekly", "value": "weekly", "hidden": false, "displayOrder": 2},
    {"label": "Monthly", "value": "monthly", "hidden": false, "displayOrder": 3}
  ],
  "hidden": false,
  "formField": true,
  "displayOrder": 1,
  "hasUniqueValue": false,
  "archived": false,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

</details>

<details>
<summary>Read a property</summary>

Signature: `get /[string objectType]/[string propertyName]`

Read a property identified by its name for the specified object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `propertyName` | <code>string</code> | Yes | The internal name of the property to read. |
| `queries` | <code>GetCrmV3PropertiesObjectTypePropertyNameGetByNameQueries</code> | No | Query parameters: `archived` (default `false`) and `properties` (comma-separated field list). |

Returns: `Property|error`

Sample code:

```ballerina
hsproperties:Property result = check hubSpotProperties->/Contact/purchase_frequency;
```

Sample response:

```ballerina
{
  "name": "purchase_frequency",
  "label": "Purchase Frequency",
  "type": "enumeration",
  "fieldType": "select",
  "groupName": "customer_behavior",
  "description": "How often the customer makes purchases",
  "options": [
    {"label": "Daily", "value": "daily", "hidden": false, "displayOrder": 1},
    {"label": "Weekly", "value": "weekly", "hidden": false, "displayOrder": 2},
    {"label": "Monthly", "value": "monthly", "hidden": false, "displayOrder": 3}
  ],
  "hidden": false,
  "formField": true,
  "displayOrder": 1,
  "hasUniqueValue": false,
  "archived": false
}
```

</details>

<details>
<summary>Update a property</summary>

Signature: `patch /[string objectType]/[string propertyName]`

Update an existing property identified by its name. Only the fields provided in the payload will be updated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `propertyName` | <code>string</code> | Yes | The internal name of the property to update. |
| `payload` | <code>PropertyUpdate</code> | Yes | Fields to update: label, type, fieldType, groupName, description, options, etc. |

Returns: `Property|error`

Sample code:

```ballerina
hsproperties:PropertyUpdate update = {
    options: [
        {label: "Daily", value: "daily", displayOrder: 1, hidden: false},
        {label: "Weekly", value: "weekly", displayOrder: 2, hidden: false},
        {label: "Monthly", value: "monthly", displayOrder: 3, hidden: false},
        {label: "Quarterly", value: "quarterly", displayOrder: 4, hidden: false}
    ]
};
hsproperties:Property result = check hubSpotProperties->/Contact/purchase_frequency.patch(payload = update);
```

Sample response:

```ballerina
{
  "name": "purchase_frequency",
  "label": "Purchase Frequency",
  "type": "enumeration",
  "fieldType": "select",
  "groupName": "customer_behavior",
  "options": [
    {"label": "Daily", "value": "daily", "hidden": false, "displayOrder": 1},
    {"label": "Weekly", "value": "weekly", "hidden": false, "displayOrder": 2},
    {"label": "Monthly", "value": "monthly", "hidden": false, "displayOrder": 3},
    {"label": "Quarterly", "value": "quarterly", "hidden": false, "displayOrder": 4}
  ],
  "hidden": false,
  "formField": true,
  "displayOrder": 1,
  "archived": false,
  "updatedAt": "2025-01-15T11:00:00.000Z"
}
```

</details>

<details>
<summary>Archive a property</summary>

Signature: `delete /[string objectType]/[string propertyName]`

Archive a property identified by its name. Archived properties are hidden from the HubSpot UI but can still be read with the `archived` query parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `propertyName` | <code>string</code> | Yes | The internal name of the property to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotProperties->/Contact/purchase_frequency.delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of properties</summary>

Signature: `post /[string objectType]/batch/create`

Create multiple properties for the specified object type in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `payload` | <code>BatchInputPropertyCreate</code> | Yes | An object containing an `inputs` array of `PropertyCreate` records. |

Returns: `BatchResponseProperty|BatchResponsePropertyWithErrors|error`

Sample code:

```ballerina
hsproperties:BatchInputPropertyCreate batchInput = {
    inputs: [
        {
            name: "email_subscription",
            label: "Email Subscription",
            groupName: "marketing_preference",
            'type: "enumeration",
            fieldType: "checkbox",
            description: "Track email subscription status",
            options: [
                {label: "Subscribed", value: "subscribed", hidden: false, displayOrder: 1},
                {label: "Unsubscribed", value: "unsubscribed", hidden: false, displayOrder: 2}
            ],
            hidden: false,
            formField: true,
            displayOrder: 1
        },
        {
            name: "sms_subscription",
            label: "SMS Subscription",
            groupName: "marketing_preference",
            'type: "enumeration",
            fieldType: "checkbox",
            description: "Track SMS subscription status",
            options: [
                {label: "Subscribed", value: "subscribed", hidden: false, displayOrder: 1},
                {label: "Unsubscribed", value: "unsubscribed", hidden: false, displayOrder: 2}
            ],
            hidden: false,
            formField: true,
            displayOrder: 2
        }
    ]
};
hsproperties:BatchResponseProperty result = check hubSpotProperties->/Contact/batch/create.post(payload = batchInput);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "name": "email_subscription",
      "label": "Email Subscription",
      "type": "enumeration",
      "fieldType": "checkbox",
      "groupName": "marketing_preference",
      "options": [
        {"label": "Subscribed", "value": "subscribed", "hidden": false, "displayOrder": 1},
        {"label": "Unsubscribed", "value": "unsubscribed", "hidden": false, "displayOrder": 2}
      ],
      "archived": false
    },
    {
      "name": "sms_subscription",
      "label": "SMS Subscription",
      "type": "enumeration",
      "fieldType": "checkbox",
      "groupName": "marketing_preference",
      "options": [
        {"label": "Subscribed", "value": "subscribed", "hidden": false, "displayOrder": 1},
        {"label": "Unsubscribed", "value": "unsubscribed", "hidden": false, "displayOrder": 2}
      ],
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:30:00.000Z",
  "completedAt": "2025-01-15T10:30:01.000Z"
}
```

</details>

<details>
<summary>Read a batch of properties</summary>

Signature: `post /[string objectType]/batch/read`

Read multiple properties by name for the specified object type in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `payload` | <code>BatchReadInputPropertyName</code> | Yes | An object containing an `inputs` array of `PropertyName` records and an `archived` boolean. |

Returns: `BatchResponseProperty|BatchResponsePropertyWithErrors|error`

Sample code:

```ballerina
hsproperties:BatchReadInputPropertyName batchReadInput = {
    inputs: [
        {name: "email_subscription"},
        {name: "sms_subscription"}
    ],
    archived: false
};
hsproperties:BatchResponseProperty result = check hubSpotProperties->/Contact/batch/read.post(payload = batchReadInput);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "name": "email_subscription",
      "label": "Email Subscription",
      "type": "enumeration",
      "fieldType": "checkbox",
      "groupName": "marketing_preference",
      "options": [
        {"label": "Subscribed", "value": "subscribed", "hidden": false, "displayOrder": 1},
        {"label": "Unsubscribed", "value": "unsubscribed", "hidden": false, "displayOrder": 2}
      ],
      "archived": false
    },
    {
      "name": "sms_subscription",
      "label": "SMS Subscription",
      "type": "enumeration",
      "fieldType": "checkbox",
      "groupName": "marketing_preference",
      "options": [
        {"label": "Subscribed", "value": "subscribed", "hidden": false, "displayOrder": 1},
        {"label": "Unsubscribed", "value": "unsubscribed", "hidden": false, "displayOrder": 2}
      ],
      "archived": false
    }
  ],
  "startedAt": "2025-01-15T10:31:00.000Z",
  "completedAt": "2025-01-15T10:31:01.000Z"
}
```

</details>

<details>
<summary>Archive a batch of properties</summary>

Signature: `post /[string objectType]/batch/archive`

Archive multiple properties by name for the specified object type in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `payload` | <code>BatchInputPropertyName</code> | Yes | An object containing an `inputs` array of `PropertyName` records to archive. |

Returns: `error?`

Sample code:

```ballerina
hsproperties:BatchInputPropertyName batchArchiveInput = {
    inputs: [
        {name: "email_subscription"},
        {name: "sms_subscription"}
    ]
};
check hubSpotProperties->/Contact/batch/archive.post(payload = batchArchiveInput);
```

</details>

#### Property group management

<details>
<summary>Create a property group</summary>

Signature: `post /[string objectType]/groups`

Create a new property group for organizing related properties under the specified object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `payload` | <code>PropertyGroupCreate</code> | Yes | Property group definition including name, label, and optional displayOrder. |

Returns: `PropertyGroup|error`

Sample code:

```ballerina
hsproperties:PropertyGroupCreate groupInput = {
    name: "marketing_preference",
    label: "Marketing Preferences",
    displayOrder: 1
};
hsproperties:PropertyGroup result = check hubSpotProperties->/Contact/groups.post(payload = groupInput);
```

Sample response:

```ballerina
{
  "name": "marketing_preference",
  "label": "Marketing Preferences",
  "displayOrder": 1,
  "archived": false
}
```

</details>

<details>
<summary>Read a property group</summary>

Signature: `get /[string objectType]/groups/[string groupName]`

Read a property group identified by its name for the specified object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `groupName` | <code>string</code> | Yes | The internal name of the property group to read. |

Returns: `PropertyGroup|error`

Sample code:

```ballerina
hsproperties:PropertyGroup result = check hubSpotProperties->/Contact/groups/marketing_preference;
```

Sample response:

```ballerina
{
  "name": "marketing_preference",
  "label": "Marketing Preferences",
  "displayOrder": 1,
  "archived": false
}
```

</details>

<details>
<summary>Update a property group</summary>

Signature: `patch /[string objectType]/groups/[string groupName]`

Update an existing property group identified by its name. Only the fields provided in the payload will be updated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `groupName` | <code>string</code> | Yes | The internal name of the property group to update. |
| `payload` | <code>PropertyGroupUpdate</code> | Yes | Fields to update: `label` and/or `displayOrder`. |

Returns: `PropertyGroup|error`

Sample code:

```ballerina
hsproperties:PropertyGroupUpdate groupUpdate = {
    label: "Customer Marketing Preferences",
    displayOrder: 2
};
hsproperties:PropertyGroup result = check hubSpotProperties->/Contact/groups/marketing_preference.patch(payload = groupUpdate);
```

Sample response:

```ballerina
{
  "name": "marketing_preference",
  "label": "Customer Marketing Preferences",
  "displayOrder": 2,
  "archived": false
}
```

</details>

<details>
<summary>Archive a property group</summary>

Signature: `delete /[string objectType]/groups/[string groupName]`

Archive a property group identified by its name. Properties within the group are not deleted but become ungrouped.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"Contact"`). |
| `groupName` | <code>string</code> | Yes | The internal name of the property group to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotProperties->/Contact/groups/marketing_preference.delete();
```

</details>
