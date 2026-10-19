# Actions

The `ballerinax/ardoq` package exposes the following client:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages Ardoq components, references, workspaces, reports, attachments, and batch operations over the Ardoq Public API (bearer-token authenticated). |

---

## Client

The `Client` provides access to the Ardoq Public API — components and references that model your business and IT landscape, workspaces and their type definitions, report definitions and results, attachments, and transactional batch operations.

### Configuration

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Ardoq API. Passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig</code> | Required | The Ardoq API token used to authenticate every request |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>{}</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>{}</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>{}</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>{}</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side, treating `nil` values and absent fields as optional |

The client initializer also accepts two string parameters:

| Parameter | Default | Description |
|-----------|---------|--------------|
| `serviceUrl` | <code>"https://app.ardoq.com/api/v2"</code> | The base URL of the Ardoq API. Override it if your organization uses a dedicated Ardoq subdomain (for example, `https://your-org.ardoq.com/api/v2`) |
| `orgLabel` | <code>()</code> | Your Ardoq organization label. Required when using the shared `app.ardoq.com` host, since that host isn't scoped to a single organization — the connector attaches it as an `X-org` header on every request. Not needed on a dedicated subdomain |

### Initializing the client

```ballerina
import ballerinax/ardoq;

configurable string token = ?;
configurable string orgLabel = ?;

ardoq:Client ardoqClient = check new ({auth: {token: token}}, orgLabel = orgLabel);
```

### Operations

#### User

<details>
<summary>getMe</summary>

Get current user and organization info.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserInfo|error`

**Sample code:**

```ballerina
UserInfo result = check ardoqClient->getMe();
```

**Sample response:**

```json
{
  "user": { "email": "jane@example.com" },
  "org": { "name": "acme-corp", "label": "Acme Corp" }
}
```

</details>

#### Workspaces

<details>
<summary>listWorkspaces</summary>

List Workspaces.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `queries` | <code>ListWorkspacesQueries</code> | No | Filter by `componentModel` (the Ardoq identifier of the workspace's model) or `name` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedWorkspaceResponse|error`

**Sample code:**

```ballerina
PaginatedWorkspaceResponse result = check ardoqClient->listWorkspaces();
```

**Sample response:**

```json
{
  "_links": {},
  "values": [
    {
      "_id": "5f3e1a2b4c1d2e3f4a5b6c01",
      "_version": 5,
      "name": "Application Portfolio",
      "description": "Tracks all business applications and their dependencies.",
      "workspaceKey": "app-portfolio",
      "startView": "dependency map",
      "views": ["dependency map", "relationships 360"]
    }
  ]
}
```

</details>

<details>
<summary>getWorkspace</summary>

Get a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Workspace|error`

**Sample code:**

```ballerina
Workspace result = check ardoqClient->getWorkspace(id);
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c01",
  "_version": 5,
  "name": "Application Portfolio",
  "description": "Tracks all business applications and their dependencies.",
  "workspaceKey": "app-portfolio",
  "startView": "dependency map",
  "views": ["dependency map", "relationships 360"]
}
```

</details>

<details>
<summary>getWorkspaceContext</summary>

Workspace Context — an overview of the component types, reference types, custom fields, and tags used by the workspace's model.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WorkspaceContext|error`

**Sample code:**

```ballerina
WorkspaceContext result = check ardoqClient->getWorkspaceContext(id);
```

**Sample response:**

```json
{
  "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
  "componentTypes": [
    {
      "name": "Application",
      "typeId": "5f3e1a2b4c1d2e3f4a5b6c00",
      "color": "#6c5ce7",
      "customFields": ["owner", "criticality"]
    }
  ],
  "referenceTypes": [
    { "type": 2, "name": "Depends on", "customFields": [] }
  ],
  "customFields": [
    {
      "apiKey": "owner",
      "label": "Owner",
      "type": "text",
      "defaultValue": null,
      "description": "The team that owns this component.",
      "readOnly": false,
      "calculated": false
    }
  ],
  "tags": [
    { "name": "critical" }
  ]
}
```

</details>

#### Components

<details>
<summary>listComponents</summary>

List Components.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `queries` | <code>ListComponentsQueries</code> | No | Filter by `parent`, `name`, `rootWorkspace`, `typeId`, or `componentKey` (the "Ardoq ID" shown in the app) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedComponentResponse|error`

**Sample code:**

```ballerina
PaginatedComponentResponse result = check ardoqClient->listComponents(queries = {rootWorkspace: workspaceId});
```

**Sample response:**

```json
{
  "_links": {},
  "values": [
    {
      "_id": "5f3e1a2b4c1d2e3f4a5b6c7d",
      "_version": 3,
      "name": "Payment Service",
      "typeId": "5f3e1a2b4c1d2e3f4a5b6c00",
      "type": "Application",
      "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
      "description": "Handles payment processing for the checkout flow.",
      "componentKey": "payment-service",
      "color": "#6c5ce7",
      "customFields": { "owner": "platform-team" }
    }
  ]
}
```

</details>

<details>
<summary>getComponent</summary>

Get a component.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Component|error`

**Sample code:**

```ballerina
Component result = check ardoqClient->getComponent(id);
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c7d",
  "_version": 3,
  "name": "Payment Service",
  "typeId": "5f3e1a2b4c1d2e3f4a5b6c00",
  "type": "Application",
  "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
  "description": "Handles payment processing for the checkout flow.",
  "componentKey": "payment-service",
  "color": "#6c5ce7",
  "customFields": { "owner": "platform-team" }
}
```

</details>

<details>
<summary>createComponent</summary>

Create a component.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreateComponentRequest</code> | Yes | New component definition — `name` and `typeId` (both `anydata`, since Ardoq allows either string or numeric identifiers here) and `rootWorkspace` are required; `image`, `parent`, `shape`, `color`, `customFields`, `icon`, and `description` are optional |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Component|error`

**Sample code:**

```ballerina
Component result = check ardoqClient->createComponent({
    name: "Payment Service",
    rootWorkspace: workspaceId,
    typeId: applicationTypeId
});
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c7d",
  "_version": 1,
  "name": "Payment Service",
  "typeId": "5f3e1a2b4c1d2e3f4a5b6c00",
  "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
  "customFields": {}
}
```

</details>

<details>
<summary>updateComponent</summary>

Update a component.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `payload` | <code>UpdateComponentRequest</code> | Yes | Fields to update — `image`, `parent`, `color`, `shape`, `customFields`, `name`, `icon`, `description` are all optional |
| `queries` | <code>UpdateComponentQueries</code> | Yes | `ifVersionMatch` (required) — the expected version, either a positive integer or `"latest"`, used for concurrency control |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Component|error`

**Sample code:**

```ballerina
Component result = check ardoqClient->updateComponent(id, {description: "Handles payment processing and refunds."}, queries = {ifVersionMatch: "latest"});
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c7d",
  "_version": 4,
  "name": "Payment Service",
  "typeId": "5f3e1a2b4c1d2e3f4a5b6c00",
  "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
  "description": "Handles payment processing and refunds.",
  "customFields": { "owner": "platform-team" }
}
```

</details>

<details>
<summary>deleteComponent</summary>

Delete a component.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check ardoqClient->deleteComponent(id);
```

</details>

#### References

<details>
<summary>listReferences</summary>

List References.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `queries` | <code>ListReferencesQueries</code> | No | Filter by `displayText`, `targetWorkspace`, `rootWorkspace`, `source`, `type`, or `target` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedReferenceResponse|error`

**Sample code:**

```ballerina
PaginatedReferenceResponse result = check ardoqClient->listReferences(queries = {rootWorkspace: workspaceId});
```

**Sample response:**

```json
{
  "_links": {},
  "values": [
    {
      "_id": "5f3e1a2b4c1d2e3f4a5b6c10",
      "_version": 1,
      "source": "5f3e1a2b4c1d2e3f4a5b6c7d",
      "target": "5f3e1a2b4c1d2e3f4a5b6c7e",
      "type": 2,
      "displayText": "depends on",
      "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
      "customFields": {}
    }
  ]
}
```

</details>

<details>
<summary>getReference</summary>

Get a reference.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Reference|error`

**Sample code:**

```ballerina
Reference result = check ardoqClient->getReference(id);
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c10",
  "_version": 1,
  "source": "5f3e1a2b4c1d2e3f4a5b6c7d",
  "target": "5f3e1a2b4c1d2e3f4a5b6c7e",
  "type": 2,
  "displayText": "depends on",
  "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
  "customFields": {}
}
```

</details>

<details>
<summary>createReference</summary>

Create a Reference.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreateReferenceRequest</code> | Yes | New reference definition — `source`, `target`, and `type` (the reference type ID defined by the root workspace's model) are required; `displayText`, `customFields`, and `description` are optional |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Reference|error`

**Sample code:**

```ballerina
Reference result = check ardoqClient->createReference({
    'source: paymentServiceId,
    target: ledgerServiceId,
    'type: dependsOnTypeId
});
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c10",
  "_version": 1,
  "source": "5f3e1a2b4c1d2e3f4a5b6c7d",
  "target": "5f3e1a2b4c1d2e3f4a5b6c7e",
  "type": 2,
  "customFields": {}
}
```

</details>

<details>
<summary>updateReference</summary>

Update a Reference.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `payload` | <code>UpdateReferenceRequest</code> | Yes | Fields to update — `displayText`, `customFields`, `description`, `source`, `target` are all optional |
| `queries` | <code>UpdateReferenceQueries</code> | Yes | `ifVersionMatch` (required) — the expected version, either a positive integer or `"latest"`, used for concurrency control |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Reference|error`

**Sample code:**

```ballerina
Reference result = check ardoqClient->updateReference(id, {displayText: "depends on (critical path)"}, queries = {ifVersionMatch: "latest"});
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c10",
  "_version": 2,
  "source": "5f3e1a2b4c1d2e3f4a5b6c7d",
  "target": "5f3e1a2b4c1d2e3f4a5b6c7e",
  "type": 2,
  "displayText": "depends on (critical path)",
  "customFields": {}
}
```

</details>

<details>
<summary>deleteReference</summary>

Delete a reference.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check ardoqClient->deleteReference(id);
```

</details>

#### Reports

<details>
<summary>listReports</summary>

List Report definitions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `queries` | <code>ListReportsQueries</code> | No | Filter by `name` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedReportResponse|error`

**Sample code:**

```ballerina
PaginatedReportResponse result = check ardoqClient->listReports(queries = {name: "Application Criticality Report"});
```

**Sample response:**

```json
{
  "_links": {},
  "values": [
    {
      "_id": "5f3e1a2b4c1d2e3f4a5b6c20",
      "_version": 2,
      "name": "Application Criticality Report",
      "description": "Lists all applications with their criticality rating.",
      "datasource": "graphSearch",
      "columns": [
        { "label": "Name", "key": "name" },
        { "label": "Criticality", "key": "cf_criticality" }
      ]
    }
  ]
}
```

</details>

<details>
<summary>getReport</summary>

Report definition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ReportOverview|error`

**Sample code:**

```ballerina
ReportOverview result = check ardoqClient->getReport(id);
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c20",
  "_version": 2,
  "name": "Application Criticality Report",
  "description": "Lists all applications with their criticality rating.",
  "datasource": "graphSearch",
  "columns": [
    { "label": "Name", "key": "name" },
    { "label": "Criticality", "key": "cf_criticality" }
  ]
}
```

</details>

<details>
<summary>runReportObjects</summary>

Run Report (Objects).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `queries` | <code>RunReportObjectsQueries</code> | No | `keyFormat` — `"label"` (default) or `"key"`, controlling whether result object keys are column labels or API keys |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedReportObjectResponse|error`

**Sample code:**

```ballerina
PaginatedReportObjectResponse result = check ardoqClient->runReportObjects(id);
```

**Sample response:**

```json
{
  "_links": {},
  "values": [
    { "name": "Payment Service", "cf_criticality": "High" },
    { "name": "Ledger Service", "cf_criticality": "Medium" }
  ]
}
```

</details>

<details>
<summary>runReportTabular</summary>

Run Report (Tabular).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedReportTabularResponse|error`

**Sample code:**

```ballerina
PaginatedReportTabularResponse result = check ardoqClient->runReportTabular(id);
```

**Sample response:**

```json
{
  "_links": {},
  "_meta": {
    "name": "Application Criticality Report",
    "columns": [
      { "label": "Name", "key": "name" },
      { "label": "Criticality", "key": "cf_criticality" }
    ]
  },
  "values": [
    ["Payment Service", "High"],
    ["Ledger Service", "Medium"]
  ]
}
```

</details>

#### Attachments

<details>
<summary>listAttachments</summary>

List attachments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `queries` | <code>ListAttachmentsQueries</code> | No | Filter by `filename` or `folder` (the `id` of the folder the attachment is in) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaginatedAttachmentResponse|error`

**Sample code:**

```ballerina
PaginatedAttachmentResponse result = check ardoqClient->listAttachments();
```

**Sample response:**

```json
{
  "_links": {},
  "values": [
    {
      "_id": "5f3e1a2b4c1d2e3f4a5b6c30",
      "_version": 1,
      "filename": "architecture-diagram.png",
      "folder": null,
      "resource-type": "workspace",
      "resource-id": "5f3e1a2b4c1d2e3f4a5b6c01"
    }
  ]
}
```

</details>

<details>
<summary>getAttachment</summary>

Get an attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | An Ardoq identifier (OID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
Attachment result = check ardoqClient->getAttachment(id);
```

**Sample response:**

```json
{
  "_id": "5f3e1a2b4c1d2e3f4a5b6c30",
  "_version": 1,
  "filename": "architecture-diagram.png",
  "folder": null,
  "resource-type": "workspace",
  "resource-id": "5f3e1a2b4c1d2e3f4a5b6c01"
}
```

</details>

#### Batch Operations

<details>
<summary>executeBatch</summary>

Execute a batch request — create, update, or delete many components and references in a single transactional call. Use the `aliases` block to reference components/references being created in the same request before they have a real Ardoq identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BatchRequest</code> | Yes | `components` and/or `references` operations (each with `create`, `upsert`, `update`, `delete` lists), an optional `aliases` block for cross-referencing entities created in the same batch, and optional `options` (e.g. `respondWithEntities` to include full entity bodies in the response) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BatchResponse|error`

**Sample code:**

```ballerina
BatchResponse result = check ardoqClient->executeBatch({
    components: {
        create: [
            {batchId: "new-payment-service", body: {name: "Payment Service", rootWorkspace: workspaceId, typeId: applicationTypeId}},
            {batchId: "new-ledger-service", body: {name: "Ledger Service", rootWorkspace: workspaceId, typeId: applicationTypeId}}
        ]
    },
    references: {
        create: [
            {batchId: "dependency-1", body: {'source: "new-payment-service", target: "new-ledger-service", 'type: dependsOnTypeId}}
        ]
    }
});
```

**Sample response:**

```json
{
  "components": {
    "created": [
      { "batchId": "new-payment-service", "id": "5f3e1a2b4c1d2e3f4a5b6c7d" },
      { "batchId": "new-ledger-service", "id": "5f3e1a2b4c1d2e3f4a5b6c7e" }
    ]
  },
  "references": {
    "created": [
      { "batchId": "dependency-1", "id": "5f3e1a2b4c1d2e3f4a5b6c10" }
    ]
  }
}
```

</details>

<details>
<summary>expandBatch</summary>

Expand Batch — resolves aliases and batch-local references in a batch request body without executing it, useful for previewing what a subsequent `executeBatch` call would do.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BatchRequest</code> | Yes | Same shape as the `executeBatch` payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BatchRequest|error`

**Sample code:**

```ballerina
BatchRequest result = check ardoqClient->expandBatch({
    components: {
        create: [
            {batchId: "new-payment-service", body: {name: "Payment Service", rootWorkspace: workspaceId, typeId: applicationTypeId}}
        ]
    }
});
```

**Sample response:**

```json
{
  "components": {
    "create": [
      {
        "batchId": "new-payment-service",
        "body": {
          "name": "Payment Service",
          "rootWorkspace": "5f3e1a2b4c1d2e3f4a5b6c01",
          "typeId": "5f3e1a2b4c1d2e3f4a5b6c00"
        }
      }
    ]
  }
}
```

</details>
