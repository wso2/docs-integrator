---
title: Actions
---

# Actions

The `ballerinax/hubspot.automation.actions` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages HubSpot custom workflow extension definitions, functions, revisions, and callback completions. |

---

## Client

Manages HubSpot custom workflow extension definitions, functions, revisions, and callback completions.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration. Use OAuth 2.0 or bearer token for callback endpoints, or `ApiKeysConfig` with a developer API key for definition/function/revision endpoints. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.automation.actions as hubspotAutomation;

configurable string apiKey = ?;

hubspotAutomation:Client hubspotClient = check new ({
    auth: {
        hapikey: apiKey,
        privateAppLegacy: ""
    }
});
```

### Operations

#### Extension definitions

<details>
<summary>Get paged extension definitions</summary>

Retrieves a paginated list of extension definitions for the specified app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `limit` | `int` | No | Maximum number of results per page. |
| `after` | `string` | No | Cursor token for the next page of results. |
| `archived` | `boolean` | No | Whether to include archived definitions. Defaults to `false`. |

Returns: `CollectionResponsePublicActionDefinitionForwardPaging|error`

Sample code:

```ballerina
CollectionResponsePublicActionDefinitionForwardPaging response =
    check hubspotClient->/[appId].get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "revisionId": "1",
      "actionUrl": "https://example.com/action",
      "published": true,
      "labels": {
        "actionName": "My Custom Action",
        "actionDescription": "Performs a custom operation"
      },
      "inputFields": [],
      "functions": [],
      "objectTypes": ["CONTACT"]
    }
  ],
  "paging": {
    "next": {
      "after": "abc123"
    }
  }
}
```

</details>

<details>
<summary>Create a new extension definition</summary>

Creates a new custom workflow extension definition for the specified app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `payload` | `PublicActionDefinitionEgg` | Yes | The extension definition to create, including labels, input fields, functions, and object types. |

Returns: `PublicActionDefinition|error`

Sample code:

```ballerina
hubspotAutomation:FieldTypeDefinition fieldType = {
    name: "staticInput",
    'type: "string",
    fieldType: "text",
    label: "Static Input",
    description: "A simple text input",
    options: [],
    externalOptions: false
};

hubspotAutomation:InputFieldDefinition inputField = {
    isRequired: true,
    automationFieldType: "test_automation_field",
    typeDefinition: fieldType,
    supportedValueTypes: ["STATIC_VALUE"]
};

hubspotAutomation:PublicActionFunction actionFunction = {
    functionSource: "exports.main = (event, callback) => { callback({ outputFields: {} }); }",
    functionType: "PRE_ACTION_EXECUTION"
};

hubspotAutomation:PublicActionDefinitionEgg extensionDef = {
    actionUrl: "https://example.com/action",
    published: false,
    objectTypes: ["CONTACT"],
    labels: {},
    inputFields: [inputField],
    functions: [actionFunction]
};

hubspotAutomation:PublicActionDefinition result =
    check hubspotClient->/[appId].post(extensionDef);
```

Sample response:

```ballerina
{
  "id": "67890",
  "revisionId": "1",
  "actionUrl": "https://example.com/action",
  "published": false,
  "labels": {},
  "inputFields": [
    {
      "isRequired": true,
      "automationFieldType": "test_automation_field",
      "typeDefinition": {
        "name": "staticInput",
        "type": "string",
        "fieldType": "text",
        "label": "Static Input",
        "options": [],
        "externalOptions": false
      },
      "supportedValueTypes": ["STATIC_VALUE"]
    }
  ],
  "functions": [
    {
      "functionType": "PRE_ACTION_EXECUTION",
      "id": "func_001"
    }
  ],
  "objectTypes": ["CONTACT"]
}
```

</details>

<details>
<summary>Get extension definition by ID</summary>

Retrieves a single extension definition by its app ID and definition ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `archived` | `boolean` | No | Whether to return archived definitions. Defaults to `false`. |

Returns: `PublicActionDefinition|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionDefinition definition =
    check hubspotClient->/[appId]/[definitionId].get();
```

Sample response:

```ballerina
{
  "id": "67890",
  "revisionId": "1",
  "actionUrl": "https://example.com/action",
  "published": false,
  "labels": {
    "actionName": "My Custom Action"
  },
  "inputFields": [],
  "functions": [],
  "objectTypes": ["CONTACT"]
}
```

</details>

<details>
<summary>Patch an existing extension definition</summary>

Partially updates an existing extension definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `payload` | `PublicActionDefinitionPatch` | Yes | Fields to update on the extension definition. |

Returns: `PublicActionDefinition|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionDefinition updated =
    check hubspotClient->/[appId]/[definitionId].patch({
        actionUrl: "https://example.com/updated-action",
        labels: {
            actionName: "Updated Action Name"
        }
    });
```

Sample response:

```ballerina
{
  "id": "67890",
  "revisionId": "2",
  "actionUrl": "https://example.com/updated-action",
  "published": false,
  "labels": {
    "actionName": "Updated Action Name"
  },
  "inputFields": [],
  "functions": [],
  "objectTypes": ["CONTACT"]
}
```

</details>

<details>
<summary>Archive an extension definition</summary>

Archives (soft-deletes) an extension definition by its app ID and definition ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/[appId]/[definitionId].delete();
```

</details>

#### Custom functions

<details>
<summary>Get all functions for a definition</summary>

Retrieves all custom functions associated with an extension definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |

Returns: `CollectionResponsePublicActionFunctionIdentifierNoPaging|error`

Sample code:

```ballerina
CollectionResponsePublicActionFunctionIdentifierNoPaging functions =
    check hubspotClient->/[appId]/[definitionId]/functions.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "functionType": "PRE_ACTION_EXECUTION",
      "id": "func_001"
    },
    {
      "functionType": "POST_ACTION_EXECUTION",
      "id": "func_002"
    }
  ]
}
```

</details>

<details>
<summary>Get function by type</summary>

Retrieves a function by its type for the specified extension definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `functionType` | `"PRE_ACTION_EXECUTION"\|"PRE_FETCH_OPTIONS"\|"POST_FETCH_OPTIONS"\|"POST_ACTION_EXECUTION"` | Yes | The function type to retrieve. |

Returns: `PublicActionFunction|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionFunction fn =
    check hubspotClient->/[appId]/[definitionId]/functions/["PRE_ACTION_EXECUTION"].get();
```

Sample response:

```ballerina
{
  "functionSource": "exports.main = (event, callback) => { callback({ outputFields: {} }); }",
  "functionType": "PRE_ACTION_EXECUTION",
  "id": "func_001"
}
```

</details>

<details>
<summary>Insert or replace a function by type</summary>

Inserts a new function or replaces an existing one for the given type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `functionType` | `"PRE_ACTION_EXECUTION"\|"PRE_FETCH_OPTIONS"\|"POST_FETCH_OPTIONS"\|"POST_ACTION_EXECUTION"` | Yes | The function type to set. |
| `payload` | `string` | Yes | The function source code as plain text. |

Returns: `PublicActionFunctionIdentifier|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionFunctionIdentifier result =
    check hubspotClient->/[appId]/[definitionId]/functions/["PRE_ACTION_EXECUTION"]
        .put("exports.main = (event, callback) => { callback({ outputFields: {} }); }");
```

Sample response:

```ballerina
{
  "functionType": "PRE_ACTION_EXECUTION",
  "id": "func_001"
}
```

</details>

<details>
<summary>Delete a function by type</summary>

Archives a function by its type for the specified extension definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `functionType` | `"PRE_ACTION_EXECUTION"\|"PRE_FETCH_OPTIONS"\|"POST_FETCH_OPTIONS"\|"POST_ACTION_EXECUTION"` | Yes | The function type to delete. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/[appId]/[definitionId]/functions/["PRE_ACTION_EXECUTION"].delete();
```

</details>

<details>
<summary>Get a specific function by type and ID</summary>

Retrieves a specific function by its type and unique function ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `functionType` | `"PRE_ACTION_EXECUTION"\|"PRE_FETCH_OPTIONS"\|"POST_FETCH_OPTIONS"\|"POST_ACTION_EXECUTION"` | Yes | The function type. |
| `functionId` | `string` | Yes | The unique function ID. |

Returns: `PublicActionFunction|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionFunction fn =
    check hubspotClient->/[appId]/[definitionId]/functions/["PRE_ACTION_EXECUTION"]/[functionId].get();
```

Sample response:

```ballerina
{
  "functionSource": "exports.main = (event, callback) => { callback({ outputFields: {} }); }",
  "functionType": "PRE_ACTION_EXECUTION",
  "id": "func_001"
}
```

</details>

<details>
<summary>Insert or replace a specific function by type and ID</summary>

Inserts a new function or replaces an existing one identified by type and function ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `functionType` | `"PRE_ACTION_EXECUTION"\|"PRE_FETCH_OPTIONS"\|"POST_FETCH_OPTIONS"\|"POST_ACTION_EXECUTION"` | Yes | The function type. |
| `functionId` | `string` | Yes | The unique function ID. |
| `payload` | `string` | Yes | The function source code as plain text. |

Returns: `PublicActionFunctionIdentifier|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionFunctionIdentifier result =
    check hubspotClient->/[appId]/[definitionId]/functions/["POST_ACTION_EXECUTION"]/[functionId]
        .put("exports.main = (event, callback) => { callback({ outputFields: { status: 'done' } }); }");
```

Sample response:

```ballerina
{
  "functionType": "POST_ACTION_EXECUTION",
  "id": "func_003"
}
```

</details>

<details>
<summary>Delete a specific function by type and ID</summary>

Archives a specific function identified by its type and function ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `functionType` | `"PRE_ACTION_EXECUTION"\|"PRE_FETCH_OPTIONS"\|"POST_FETCH_OPTIONS"\|"POST_ACTION_EXECUTION"` | Yes | The function type. |
| `functionId` | `string` | Yes | The unique function ID. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/[appId]/[definitionId]/functions/["POST_ACTION_EXECUTION"]/[functionId].delete();
```

</details>

#### Revisions

<details>
<summary>Get all revisions for a definition</summary>

Retrieves a paginated list of all revisions for an extension definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `limit` | `int` | No | Maximum number of results per page. |
| `after` | `string` | No | Cursor token for the next page of results. |

Returns: `CollectionResponsePublicActionRevisionForwardPaging|error`

Sample code:

```ballerina
CollectionResponsePublicActionRevisionForwardPaging revisions =
    check hubspotClient->/[appId]/[definitionId]/revisions.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "revisionId": "2",
      "createdAt": "2025-01-15T10:30:00Z",
      "id": "rev_002",
      "definition": {
        "id": "67890",
        "revisionId": "2",
        "actionUrl": "https://example.com/updated-action",
        "published": true,
        "labels": {"actionName": "My Action"},
        "inputFields": [],
        "functions": [],
        "objectTypes": ["CONTACT"]
      }
    }
  ],
  "paging": {}
}
```

</details>

<details>
<summary>Get a specific revision by ID</summary>

Retrieves a specific revision of an extension definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `definitionId` | `string` | Yes | The extension definition ID. |
| `revisionId` | `string` | Yes | The revision ID. |

Returns: `PublicActionRevision|error`

Sample code:

```ballerina
hubspotAutomation:PublicActionRevision revision =
    check hubspotClient->/[appId]/[definitionId]/revisions/[revisionId].get();
```

Sample response:

```ballerina
{
  "revisionId": "1",
  "createdAt": "2025-01-10T08:00:00Z",
  "id": "rev_001",
  "definition": {
    "id": "67890",
    "revisionId": "1",
    "actionUrl": "https://example.com/action",
    "published": false,
    "labels": {"actionName": "My Action"},
    "inputFields": [],
    "functions": [],
    "objectTypes": ["CONTACT"]
  }
}
```

</details>

#### Callbacks

<details>
<summary>Complete a single callback</summary>

Completes a single workflow callback, returning output fields to the HubSpot workflow.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `callbackId` | `string` | Yes | The callback ID provided by HubSpot when the workflow action is triggered. |
| `payload` | `CallbackCompletionRequest` | Yes | The completion request containing output field values. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/callbacks/[callbackId]/complete.post({
    outputFields: {
        "status": "completed",
        "result": "success"
    }
});
```

</details>

<details>
<summary>Complete a batch of callbacks</summary>

Completes multiple workflow callbacks in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputCallbackCompletionBatchRequest` | Yes | Batch request containing an array of callback completion entries, each with a `callbackId` and `outputFields`. |

Returns: `error?`

Sample code:

```ballerina
hubspotAutomation:BatchInputCallbackCompletionBatchRequest batchRequest = {
    inputs: [
        {
            callbackId: "callback_001",
            outputFields: {"status": "completed"}
        },
        {
            callbackId: "callback_002",
            outputFields: {"status": "completed"}
        }
    ]
};

check hubspotClient->/callbacks/complete.post(batchRequest);
```

</details>
