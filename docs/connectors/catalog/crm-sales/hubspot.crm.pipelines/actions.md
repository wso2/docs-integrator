---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.pipelines` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot CRM pipelines and pipeline stages via the Pipelines REST API. |

---

## Client

Manage HubSpot CRM pipelines and pipeline stages via the Pipelines REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 bearer token, refresh token grant, or API key. |
| `httpVersion` | <code>HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>ProxyConfig</code> | `()` | Proxy server configuration. |
| `validation` | <code>boolean</code> | `true` | Enable or disable payload validation. |
| `laxDataBinding` | <code>boolean</code> | `true` | Use lax data binding for response payloads. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.pipelines as hspipelines;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

final hspipelines:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};

final hspipelines:Client hubSpotPipelines = check new ({auth});
```

### Operations

#### Pipeline operations

<details>
<summary>List all pipelines</summary>

Signature: `get /[string objectType]`

Returns all pipelines for the specified object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"deals"`, `"tickets"`, `"orders"`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponsePipelineNoPaging|error`

Sample code:

```ballerina
hspipelines:CollectionResponsePipelineNoPaging pipelines = check hubSpotPipelines->/orders;
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "67890",
      "label": "Orders Pipeline",
      "displayOrder": 0,
      "archived": false,
      "stages": [
        {
          "id": "11111",
          "label": "Order Received",
          "displayOrder": 0,
          "archived": false,
          "metadata": {"probability": "0.1"},
          "createdAt": "2025-01-15T10:00:00.000Z",
          "updatedAt": "2025-01-15T10:00:00.000Z"
        }
      ],
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

</details>

<details>
<summary>Create a pipeline</summary>

Signature: `post /[string objectType]`

Creates a new pipeline for the specified object type with the given stages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type (e.g., `"deals"`, `"tickets"`, `"orders"`). |
| `payload` | <code>PipelineInput</code> | Yes | Pipeline definition including label, display order, and stages. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `Pipeline|error`

Sample code:

```ballerina
hspipelines:Pipeline pipeline = check hubSpotPipelines->/orders.post({
    label: "Orders Pipeline",
    displayOrder: 0,
    stages: [
        {label: "Order Received", displayOrder: 0, metadata: {"probability": "0.1"}},
        {label: "Processing", displayOrder: 1, metadata: {"probability": "0.3"}},
        {label: "Ready for Shipment", displayOrder: 2, metadata: {"probability": "0.5"}},
        {label: "Shipped", displayOrder: 3, metadata: {"probability": "0.8"}},
        {label: "Delivered", displayOrder: 4, metadata: {"probability": "1.0"}}
    ]
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "label": "Orders Pipeline",
  "displayOrder": 0,
  "archived": false,
  "stages": [
    {"id": "11111", "label": "Order Received", "displayOrder": 0, "archived": false, "metadata": {"probability": "0.1"}, "createdAt": "2025-01-15T10:00:00.000Z", "updatedAt": "2025-01-15T10:00:00.000Z"},
    {"id": "22222", "label": "Processing", "displayOrder": 1, "archived": false, "metadata": {"probability": "0.3"}, "createdAt": "2025-01-15T10:00:00.000Z", "updatedAt": "2025-01-15T10:00:00.000Z"},
    {"id": "33333", "label": "Ready for Shipment", "displayOrder": 2, "archived": false, "metadata": {"probability": "0.5"}, "createdAt": "2025-01-15T10:00:00.000Z", "updatedAt": "2025-01-15T10:00:00.000Z"},
    {"id": "44444", "label": "Shipped", "displayOrder": 3, "archived": false, "metadata": {"probability": "0.8"}, "createdAt": "2025-01-15T10:00:00.000Z", "updatedAt": "2025-01-15T10:00:00.000Z"},
    {"id": "55555", "label": "Delivered", "displayOrder": 4, "archived": false, "metadata": {"probability": "1.0"}, "createdAt": "2025-01-15T10:00:00.000Z", "updatedAt": "2025-01-15T10:00:00.000Z"}
  ],
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

</details>

<details>
<summary>Get a pipeline</summary>

Signature: `get /[string objectType]/[string pipelineId]`

Retrieves a single pipeline by its ID for the specified object type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `Pipeline|error`

Sample code:

```ballerina
hspipelines:Pipeline pipeline = check hubSpotPipelines->/orders/["67890"];
```

Sample response:

```ballerina
{
  "id": "67890",
  "label": "Orders Pipeline",
  "displayOrder": 0,
  "archived": false,
  "stages": [
    {"id": "11111", "label": "Order Received", "displayOrder": 0, "archived": false, "metadata": {"probability": "0.1"}, "createdAt": "2025-01-15T10:00:00.000Z", "updatedAt": "2025-01-15T10:00:00.000Z"}
  ],
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

</details>

<details>
<summary>Replace a pipeline</summary>

Signature: `put /[string objectType]/[string pipelineId]`

Replaces a pipeline entirely with the provided definition. Use this to overwrite all fields and stages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline to replace. |
| `payload` | <code>PipelineInput</code> | Yes | Complete pipeline definition to replace the existing one. |
| `queries` | <code>PutCrmV3PipelinesObjectTypePipelineIdReplaceQueries</code> | No | Optional query parameters for validation before deletion. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `Pipeline|error`

Sample code:

```ballerina
hspipelines:Pipeline updated = check hubSpotPipelines->/orders/["67890"].put({
    label: "Updated Orders Pipeline",
    displayOrder: 0,
    stages: [
        {label: "New Order", displayOrder: 0, metadata: {"probability": "0.2"}},
        {label: "Fulfilled", displayOrder: 1, metadata: {"probability": "1.0"}}
    ]
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "label": "Updated Orders Pipeline",
  "displayOrder": 0,
  "archived": false,
  "stages": [
    {"id": "66666", "label": "New Order", "displayOrder": 0, "archived": false, "metadata": {"probability": "0.2"}, "createdAt": "2025-01-15T12:00:00.000Z", "updatedAt": "2025-01-15T12:00:00.000Z"},
    {"id": "77777", "label": "Fulfilled", "displayOrder": 1, "archived": false, "metadata": {"probability": "1.0"}, "createdAt": "2025-01-15T12:00:00.000Z", "updatedAt": "2025-01-15T12:00:00.000Z"}
  ],
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T12:00:00.000Z"
}
```

</details>

<details>
<summary>Update a pipeline</summary>

Signature: `patch /[string objectType]/[string pipelineId]`

Partially updates a pipeline's properties (label, display order, archived status).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline to update. |
| `payload` | <code>PipelinePatchInput</code> | Yes | Fields to update (label, displayOrder, archived). |
| `queries` | <code>PatchCrmV3PipelinesObjectTypePipelineIdUpdateQueries</code> | No | Optional query parameters for validation before deletion. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `Pipeline|error`

Sample code:

```ballerina
hspipelines:Pipeline patched = check hubSpotPipelines->/orders/["67890"].patch({
    label: "Renamed Orders Pipeline"
});
```

Sample response:

```ballerina
{
  "id": "67890",
  "label": "Renamed Orders Pipeline",
  "displayOrder": 0,
  "archived": false,
  "stages": [],
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T14:00:00.000Z"
}
```

</details>

<details>
<summary>Delete a pipeline</summary>

Signature: `delete /[string objectType]/[string pipelineId]`

Archives (deletes) a pipeline by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline to delete. |
| `queries` | <code>DeleteCrmV3PipelinesObjectTypePipelineIdArchiveQueries</code> | No | Optional query parameters for validation before deletion. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotPipelines->/orders/["67890"].delete();
```

</details>

<details>
<summary>Get pipeline audit log</summary>

Signature: `get /[string objectType]/[string pipelineId]/audit`

Returns the audit history for a pipeline, showing changes made over time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline to audit. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponsePublicAuditInfoNoPaging|error`

Sample code:

```ballerina
hspipelines:CollectionResponsePublicAuditInfoNoPaging auditLog =
    check hubSpotPipelines->/orders/["67890"]/audit;
```

Sample response:

```ballerina
{
  "results": [
    {
      "identifier": "67890",
      "action": "PIPELINE_CREATE",
      "timestamp": "2025-01-15T10:00:00.000Z",
      "portalId": 12345678,
      "fromUserId": 98765
    },
    {
      "identifier": "67890",
      "action": "PIPELINE_UPDATE",
      "timestamp": "2025-01-15T14:00:00.000Z",
      "portalId": 12345678,
      "fromUserId": 98765,
      "message": "Label changed"
    }
  ]
}
```

</details>

#### Pipeline stage operations

<details>
<summary>List all stages in a pipeline</summary>

Signature: `get /[string objectType]/[string pipelineId]/stages`

Returns all stages for a specific pipeline.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponsePipelineStageNoPaging|error`

Sample code:

```ballerina
hspipelines:CollectionResponsePipelineStageNoPaging stages =
    check hubSpotPipelines->/tickets/["67890"]/stages;
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "11111",
      "label": "New Ticket",
      "displayOrder": 0,
      "archived": false,
      "metadata": {"ticketStatus": "OPEN"},
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    },
    {
      "id": "22222",
      "label": "Resolved",
      "displayOrder": 1,
      "archived": false,
      "metadata": {"ticketStatus": "CLOSED"},
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

</details>

<details>
<summary>Create a pipeline stage</summary>

Signature: `post /[string objectType]/[string pipelineId]/stages`

Creates a new stage within a pipeline.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline to add the stage to. |
| `payload` | <code>PipelineStageInput</code> | Yes | Stage definition including label, display order, and optional metadata. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PipelineStage|error`

Sample code:

```ballerina
hspipelines:PipelineStage stage = check hubSpotPipelines->/tickets/["67890"]/stages.post({
    label: "Waiting on Customer",
    displayOrder: 2,
    metadata: {"ticketStatus": "OPEN", "priority": "HIGH"}
});
```

Sample response:

```ballerina
{
  "id": "33333",
  "label": "Waiting on Customer",
  "displayOrder": 2,
  "archived": false,
  "metadata": {"ticketStatus": "OPEN", "priority": "HIGH"},
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z"
}
```

</details>

<details>
<summary>Get a pipeline stage</summary>

Signature: `get /[string objectType]/[string pipelineId]/stages/[string stageId]`

Retrieves a single stage by its ID within a pipeline.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline. |
| `stageId` | <code>string</code> | Yes | The ID of the stage to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PipelineStage|error`

Sample code:

```ballerina
hspipelines:PipelineStage stage =
    check hubSpotPipelines->/tickets/["67890"]/stages/["33333"];
```

Sample response:

```ballerina
{
  "id": "33333",
  "label": "Waiting on Customer",
  "displayOrder": 2,
  "archived": false,
  "metadata": {"ticketStatus": "OPEN", "priority": "HIGH"},
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T11:00:00.000Z"
}
```

</details>

<details>
<summary>Replace a pipeline stage</summary>

Signature: `put /[string objectType]/[string pipelineId]/stages/[string stageId]`

Replaces a pipeline stage entirely with the provided definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline. |
| `stageId` | <code>string</code> | Yes | The ID of the stage to replace. |
| `payload` | <code>PipelineStageInput</code> | Yes | Complete stage definition to replace the existing one. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PipelineStage|error`

Sample code:

```ballerina
hspipelines:PipelineStage replaced =
    check hubSpotPipelines->/tickets/["67890"]/stages/["33333"].put({
        label: "Escalated",
        displayOrder: 2,
        metadata: {"ticketStatus": "OPEN", "priority": "CRITICAL"}
    });
```

Sample response:

```ballerina
{
  "id": "33333",
  "label": "Escalated",
  "displayOrder": 2,
  "archived": false,
  "metadata": {"ticketStatus": "OPEN", "priority": "CRITICAL"},
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T15:00:00.000Z"
}
```

</details>

<details>
<summary>Update a pipeline stage</summary>

Signature: `patch /[string objectType]/[string pipelineId]/stages/[string stageId]`

Partially updates a pipeline stage's properties (label, display order, metadata, archived status).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline. |
| `stageId` | <code>string</code> | Yes | The ID of the stage to update. |
| `payload` | <code>PipelineStagePatchInput</code> | Yes | Fields to update (label, displayOrder, metadata, archived). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PipelineStage|error`

Sample code:

```ballerina
hspipelines:PipelineStage patched =
    check hubSpotPipelines->/tickets/["67890"]/stages/["33333"].patch({
        label: "Awaiting Response"
    });
```

Sample response:

```ballerina
{
  "id": "33333",
  "label": "Awaiting Response",
  "displayOrder": 2,
  "archived": false,
  "metadata": {"ticketStatus": "OPEN", "priority": "HIGH"},
  "createdAt": "2025-01-15T11:00:00.000Z",
  "updatedAt": "2025-01-15T16:00:00.000Z"
}
```

</details>

<details>
<summary>Delete a pipeline stage</summary>

Signature: `delete /[string objectType]/[string pipelineId]/stages/[string stageId]`

Archives (deletes) a stage from a pipeline.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline. |
| `stageId` | <code>string</code> | Yes | The ID of the stage to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubSpotPipelines->/tickets/["67890"]/stages/["33333"].delete();
```

</details>

<details>
<summary>Get pipeline stage audit log</summary>

Signature: `get /[string objectType]/[string pipelineId]/stages/[string stageId]/audit`

Returns the audit history for a specific pipeline stage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | <code>string</code> | Yes | The CRM object type. |
| `pipelineId` | <code>string</code> | Yes | The ID of the pipeline. |
| `stageId` | <code>string</code> | Yes | The ID of the stage to audit. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponsePublicAuditInfoNoPaging|error`

Sample code:

```ballerina
hspipelines:CollectionResponsePublicAuditInfoNoPaging stageAudit =
    check hubSpotPipelines->/tickets/["67890"]/stages/["33333"]/audit;
```

Sample response:

```ballerina
{
  "results": [
    {
      "identifier": "33333",
      "action": "STAGE_CREATE",
      "timestamp": "2025-01-15T11:00:00.000Z",
      "portalId": 12345678,
      "fromUserId": 98765
    }
  ]
}
```

</details>
