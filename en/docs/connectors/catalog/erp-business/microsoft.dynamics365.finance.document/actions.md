---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.document` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance document types and documents, agents and agent feeds, demo data posts, ED parameters, guides, media, message items/status/logs, and print layouts via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance document types and documents, agents and agent feeds, demo data posts, ED parameters, guides, media, message items/status/logs, and print layouts via the Dynamics 365 Finance and Operations OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID (Azure AD): `tokenUrl`, `clientId`, `clientSecret`, and optional `scopes`. |
| `httpVersion` | `http:HttpVersion` | `2.0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.document;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

document:Client fo = check new (
    {
        auth: {
            tokenUrl,
            clientId,
            clientSecret
        }
    },
    serviceUrl
);
```

### Operations

#### Agent Feeds

<details>
<summary>listAgentFeeds</summary>

Reads all agent feed items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAgentFeedsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:AgentFeedsCollection|error`

Sample code:

```ballerina
document:AgentFeedsCollection feeds = check fo->listAgentFeeds(
    queries = {
        filter: "Status eq 'InProgress'",
        top: 20
    }
);
```

</details>

<details>
<summary>createAgentFeeds</summary>

Creates an agent feed item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AgentFeed` | Yes | The agent feed item to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:AgentFeed|error`

Sample code:

```ballerina
document:AgentFeed feed = check fo->createAgentFeeds({
    feedItemId: "FI-0001",
    correlationId: "CORR-0001",
    title: "Invoice approval pending",
    summary: "Vendor invoice VI-1002 is awaiting approval",
    status: "NotStarted",
    dueDate: "2026-08-10"
});
```

</details>

<details>
<summary>getAgentFeeds</summary>

Reads a specific agent feed item by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `feedItemId` | `string` | Yes | The feed item id key field. |
| `correlationId` | `string` | Yes | The correlation id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAgentFeedsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:AgentFeed|error`

Sample code:

```ballerina
document:AgentFeed feed = check fo->getAgentFeeds(
    "FI-0001",
    "CORR-0001"
);
```

</details>

<details>
<summary>deleteAgentFeeds</summary>

Deletes a specific agent feed item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `feedItemId` | `string` | Yes | The feed item id key field. |
| `correlationId` | `string` | Yes | The correlation id key field. |
| `headers` | `DeleteAgentFeedsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAgentFeeds(
    "FI-0001",
    "CORR-0001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAgentFeeds</summary>

Updates a specific agent feed item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `feedItemId` | `string` | Yes | The feed item id key field. |
| `correlationId` | `string` | Yes | The correlation id key field. |
| `payload` | `AgentFeed` | Yes | The fields to update. |
| `headers` | `UpdateAgentFeedsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:AgentFeed|error`

Sample code:

```ballerina
document:AgentFeed updated = check fo->updateAgentFeeds(
    "FI-0001",
    "CORR-0001",
    {status: "Completed"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Agents

<details>
<summary>listAgents</summary>

Reads all agent master records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAgentsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:AgentsCollection|error`

Sample code:

```ballerina
document:AgentsCollection agents = check fo->listAgents(
    queries = {
        filter: "TaxRegNum ne ''",
        top: 20
    }
);
```

</details>

<details>
<summary>createAgents</summary>

Creates an agent master record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Agent` | Yes | The agent to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:Agent|error`

Sample code:

```ballerina
document:Agent agent = check fo->createAgents({
    dataAreaId: "USMF",
    agentId: "AGT-001",
    name: "Contoso Freight Agent",
    partyNumber: "PARTY-2201",
    taxRegNum: "12-3456789"
});
```

</details>

<details>
<summary>getAgents</summary>

Reads a specific agent by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `agentId` | `string` | Yes | The agent id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAgentsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:Agent|error`

Sample code:

```ballerina
document:Agent agent = check fo->getAgents(
    "USMF",
    "AGT-001"
);
```

</details>

<details>
<summary>deleteAgents</summary>

Deletes a specific agent.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `agentId` | `string` | Yes | The agent id key field. |
| `headers` | `DeleteAgentsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAgents(
    "USMF",
    "AGT-001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAgents</summary>

Updates a specific agent.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `agentId` | `string` | Yes | The agent id key field. |
| `payload` | `Agent` | Yes | The fields to update. |
| `headers` | `UpdateAgentsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:Agent|error`

Sample code:

```ballerina
document:Agent updated = check fo->updateAgents(
    "USMF",
    "AGT-001",
    {taxRegNum: "98-7654321"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Demo Data Posts

<details>
<summary>listDemoDataPosts</summary>

Reads all demo data posting jobs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDemoDataPostsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:DemoDataPostsCollection|error`

Sample code:

```ballerina
document:DemoDataPostsCollection posts = check fo->listDemoDataPosts(
    queries = {
        filter: "DemoDataJobStatus eq 'Ready'",
        top: 20
    }
);
```

</details>

<details>
<summary>createDemoDataPosts</summary>

Creates a demo data posting job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DemoDataPost` | Yes | The demo data post to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:DemoDataPost|error`

Sample code:

```ballerina
document:DemoDataPost post = check fo->createDemoDataPosts({
    dataAreaId: "USMF",
    demoDataJob: "JOB-100",
    lineNum: 1,
    document: "SalesOrder",
    documentTarget: "Post",
    demoDataJobStatus: "Open"
});
```

</details>

<details>
<summary>getDemoDataPosts</summary>

Reads a specific demo data posting job by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `demoDataJob` | `string` | Yes | The demo data job key field. |
| `lineNum` | `decimal` | Yes | The line num key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDemoDataPostsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:DemoDataPost|error`

Sample code:

```ballerina
document:DemoDataPost post = check fo->getDemoDataPosts(
    "USMF",
    "JOB-100",
    1
);
```

</details>

<details>
<summary>deleteDemoDataPosts</summary>

Deletes a specific demo data posting job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `demoDataJob` | `string` | Yes | The demo data job key field. |
| `lineNum` | `decimal` | Yes | The line num key field. |
| `headers` | `DeleteDemoDataPostsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDemoDataPosts(
    "USMF",
    "JOB-100",
    1,
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateDemoDataPosts</summary>

Updates a specific demo data posting job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `demoDataJob` | `string` | Yes | The demo data job key field. |
| `lineNum` | `decimal` | Yes | The line num key field. |
| `payload` | `DemoDataPost` | Yes | The fields to update. |
| `headers` | `UpdateDemoDataPostsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:DemoDataPost|error`

Sample code:

```ballerina
document:DemoDataPost updated = check fo->updateDemoDataPosts(
    "USMF",
    "JOB-100",
    1,
    {demoDataJobStatus: "Successful"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Document Types

<details>
<summary>listDocumentTypes</summary>

Reads all document type definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDocumentTypesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:DocumentTypesCollection|error`

Sample code:

```ballerina
document:DocumentTypesCollection types = check fo->listDocumentTypes(
    queries = {
        filter: "TypeGroup eq 'File'",
        top: 20
    }
);
```

</details>

<details>
<summary>createDocumentTypes</summary>

Creates a document type definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DocumentType` | Yes | The document type to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:DocumentType|error`

Sample code:

```ballerina
document:DocumentType docType = check fo->createDocumentTypes({
    dataAreaId: "USMF",
    iD: "BOL",
    name: "Bill of lading",
    typeGroup: "File",
    filePlace: "Database",
    removeOption: "DocumentAndFile"
});
```

</details>

<details>
<summary>getDocumentTypes</summary>

Reads a specific document type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `iD` | `string` | Yes | The i d key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDocumentTypesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:DocumentType|error`

Sample code:

```ballerina
document:DocumentType docType = check fo->getDocumentTypes(
    "USMF",
    "BOL"
);
```

</details>

<details>
<summary>deleteDocumentTypes</summary>

Deletes a specific document type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `iD` | `string` | Yes | The i d key field. |
| `headers` | `DeleteDocumentTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDocumentTypes(
    "USMF",
    "BOL",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateDocumentTypes</summary>

Updates a specific document type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `iD` | `string` | Yes | The i d key field. |
| `payload` | `DocumentType` | Yes | The fields to update. |
| `headers` | `UpdateDocumentTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:DocumentType|error`

Sample code:

```ballerina
document:DocumentType updated = check fo->updateDocumentTypes(
    "USMF",
    "BOL",
    {name: "Bill of lading (revised)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Documents

<details>
<summary>listDocuments</summary>

Reads all transportation/shipping documents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDocumentsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:DocumentsCollection|error`

Sample code:

```ballerina
document:DocumentsCollection docs = check fo->listDocuments(
    queries = {
        filter: "Carrier eq 'CARRIER-01'",
        top: 20
    }
);
```

</details>

<details>
<summary>createDocuments</summary>

Creates a transportation/shipping document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Document` | Yes | The document to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:Document|error`

Sample code:

```ballerina
document:Document doc = check fo->createDocuments({
    dataAreaId: "USMF",
    lineId: "LINE-001",
    carrier: "CARRIER-01",
    carrierType: "Vendor",
    registrationNumber: "TRK-4521",
    driverName: "Alex Morgan",
    loadingCity: "Chicago",
    unloadingCity: "Dallas"
});
```

</details>

<details>
<summary>getDocuments</summary>

Reads a specific document by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineId` | `string` | Yes | The line id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDocumentsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:Document|error`

Sample code:

```ballerina
document:Document doc = check fo->getDocuments(
    "USMF",
    "LINE-001"
);
```

</details>

<details>
<summary>deleteDocuments</summary>

Deletes a specific document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineId` | `string` | Yes | The line id key field. |
| `headers` | `DeleteDocumentsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDocuments(
    "USMF",
    "LINE-001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateDocuments</summary>

Updates a specific document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `lineId` | `string` | Yes | The line id key field. |
| `payload` | `Document` | Yes | The fields to update. |
| `headers` | `UpdateDocumentsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:Document|error`

Sample code:

```ballerina
document:Document updated = check fo->updateDocuments(
    "USMF",
    "LINE-001",
    {unloadingCity: "Houston"},
    headers = {ifMatch: eTag}
);
```

</details>

#### ED Parameters

<details>
<summary>listEDParameters</summary>

Reads all electronic document (ED) parameter records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListEDParametersQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:EDParametersCollection|error`

Sample code:

```ballerina
document:EDParametersCollection params = check fo->listEDParameters(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        top: 20
    }
);
```

</details>

<details>
<summary>createEDParameters</summary>

Creates an electronic document (ED) parameter record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EDParameter` | Yes | The ED parameter record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:EDParameter|error`

Sample code:

```ballerina
document:EDParameter params = check fo->createEDParameters({
    dataAreaId: "USMF",
    key: 1,
    custSingleInvoice: "Yes",
    vendSingleInvoice: "Yes",
    custFillInvoiceNum: "No"
});
```

</details>

<details>
<summary>getEDParameters</summary>

Reads a specific ED parameter record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `'key` | `int` | Yes | The entity key value. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetEDParametersQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:EDParameter|error`

Sample code:

```ballerina
document:EDParameter params = check fo->getEDParameters(
    "USMF",
    1
);
```

</details>

<details>
<summary>deleteEDParameters</summary>

Deletes a specific ED parameter record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `'key` | `int` | Yes | The entity key value. |
| `headers` | `DeleteEDParametersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteEDParameters(
    "USMF",
    1,
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateEDParameters</summary>

Updates a specific ED parameter record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `'key` | `int` | Yes | The entity key value. |
| `payload` | `EDParameter` | Yes | The fields to update. |
| `headers` | `UpdateEDParametersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:EDParameter|error`

Sample code:

```ballerina
document:EDParameter updated = check fo->updateEDParameters(
    "USMF",
    1,
    {custFillInvoiceNum: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Guides

<details>
<summary>listGuides</summary>

Reads all task guide metadata records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListGuidesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:GuidesCollection|error`

Sample code:

```ballerina
document:GuidesCollection guides = check fo->listGuides(
    queries = {
        filter: "GuideID eq 'GDE-001'"
    }
);
```

</details>

<details>
<summary>createGuides</summary>

Creates a task guide metadata record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Guide` | Yes | The guide to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:Guide|error`

Sample code:

```ballerina
document:Guide guide = check fo->createGuides({
    integrationKey: "GDE-001-KEY",
    guideID: "GDE-001",
    name: "Create a sales order",
    schemaVersion: 1
});
```

</details>

<details>
<summary>getGuides</summary>

Reads a specific guide by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationKey` | `string` | Yes | The integration key key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetGuidesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:Guide|error`

Sample code:

```ballerina
document:Guide guide = check fo->getGuides("GDE-001-KEY");
```

</details>

<details>
<summary>deleteGuides</summary>

Deletes a specific guide.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationKey` | `string` | Yes | The integration key key field. |
| `headers` | `DeleteGuidesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteGuides(
    "GDE-001-KEY",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateGuides</summary>

Updates a specific guide.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationKey` | `string` | Yes | The integration key key field. |
| `payload` | `Guide` | Yes | The fields to update. |
| `headers` | `UpdateGuidesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:Guide|error`

Sample code:

```ballerina
document:Guide updated = check fo->updateGuides(
    "GDE-001-KEY",
    {name: "Create and confirm a sales order"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Media

<details>
<summary>listMedia</summary>

Reads all contact media records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMediaQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:MediaCollection|error`

Sample code:

```ballerina
document:MediaCollection media = check fo->listMedia(
    queries = {
        filter: "vendAccount eq 'VEND-1001'",
        top: 20
    }
);
```

</details>

<details>
<summary>createMedia</summary>

Creates a contact media record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Media` | Yes | The media record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:Media|error`

Sample code:

```ballerina
document:Media media = check fo->createMedia({
    dataAreaId: "USMF",
    media: "MED-001",
    mediaType: "Email",
    vendAccount: "VEND-1001",
    email: "ap@contoso-supplier.com"
});
```

</details>

<details>
<summary>getMedia</summary>

Reads a specific media record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `media` | `string` | Yes | The media key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMediaQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:Media|error`

Sample code:

```ballerina
document:Media media = check fo->getMedia(
    "USMF",
    "MED-001"
);
```

</details>

<details>
<summary>deleteMedia</summary>

Deletes a specific media record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `media` | `string` | Yes | The media key field. |
| `headers` | `DeleteMediaHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMedia(
    "USMF",
    "MED-001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMedia</summary>

Updates a specific media record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `media` | `string` | Yes | The media key field. |
| `payload` | `Media` | Yes | The fields to update. |
| `headers` | `UpdateMediaHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:Media|error`

Sample code:

```ballerina
document:Media updated = check fo->updateMedia(
    "USMF",
    "MED-001",
    {email: "accounts.payable@contoso-supplier.com"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Media Types

<details>
<summary>listMediaTypes</summary>

Reads all media type definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMediaTypesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:MediaTypesCollection|error`

Sample code:

```ballerina
document:MediaTypesCollection types = check fo->listMediaTypes(
    queries = {
        top: 20
    }
);
```

</details>

<details>
<summary>createMediaTypes</summary>

Creates a media type definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MediaType` | Yes | The media type to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:MediaType|error`

Sample code:

```ballerina
document:MediaType mediaType = check fo->createMediaTypes({
    dataAreaId: "USMF",
    mediaTypeId: "EMAIL",
    description: "Email address"
});
```

</details>

<details>
<summary>getMediaTypes</summary>

Reads a specific media type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `mediaTypeId` | `string` | Yes | The media type id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMediaTypesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:MediaType|error`

Sample code:

```ballerina
document:MediaType mediaType = check fo->getMediaTypes(
    "USMF",
    "EMAIL"
);
```

</details>

<details>
<summary>deleteMediaTypes</summary>

Deletes a specific media type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `mediaTypeId` | `string` | Yes | The media type id key field. |
| `headers` | `DeleteMediaTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMediaTypes(
    "USMF",
    "EMAIL",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMediaTypes</summary>

Updates a specific media type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `mediaTypeId` | `string` | Yes | The media type id key field. |
| `payload` | `MediaType` | Yes | The fields to update. |
| `headers` | `UpdateMediaTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:MediaType|error`

Sample code:

```ballerina
document:MediaType updated = check fo->updateMediaTypes(
    "USMF",
    "EMAIL",
    {description: "Primary email address"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Message Items

<details>
<summary>listMessageItems</summary>

Reads all message processing items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMessageItemsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:MessageItemsCollection|error`

Sample code:

```ballerina
document:MessageItemsCollection items = check fo->listMessageItems(
    queries = {
        filter: "ItemStatus eq 'Error'",
        top: 20
    }
);
```

</details>

<details>
<summary>createMessageItems</summary>

Creates a message processing item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessageItems` | Yes | The message item to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:MessageItems|error`

Sample code:

```ballerina
document:MessageItems item = check fo->createMessageItems({
    dataAreaId: "USMF",
    messageId: "MSG-001",
    itemId: "ITEM-001",
    itemType: "Invoice",
    processingId: "PROC-001",
    itemStatus: "Pending"
});
```

</details>

<details>
<summary>getMessageItems</summary>

Reads a specific message item by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemId` | `string` | Yes | The item id key field. |
| `itemType` | `string` | Yes | The item type key field. |
| `processingId` | `string` | Yes | The processing id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMessageItemsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:MessageItems|error`

Sample code:

```ballerina
document:MessageItems item = check fo->getMessageItems(
    "USMF",
    "ITEM-001",
    "Invoice",
    "PROC-001"
);
```

</details>

<details>
<summary>deleteMessageItems</summary>

Deletes a specific message item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemId` | `string` | Yes | The item id key field. |
| `itemType` | `string` | Yes | The item type key field. |
| `processingId` | `string` | Yes | The processing id key field. |
| `headers` | `DeleteMessageItemsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMessageItems(
    "USMF",
    "ITEM-001",
    "Invoice",
    "PROC-001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMessageItems</summary>

Updates a specific message item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemId` | `string` | Yes | The item id key field. |
| `itemType` | `string` | Yes | The item type key field. |
| `processingId` | `string` | Yes | The processing id key field. |
| `payload` | `MessageItems` | Yes | The fields to update. |
| `headers` | `UpdateMessageItemsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:MessageItems|error`

Sample code:

```ballerina
document:MessageItems updated = check fo->updateMessageItems(
    "USMF",
    "ITEM-001",
    "Invoice",
    "PROC-001",
    {itemStatus: "Processed"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Message Status

<details>
<summary>listMessageStatus</summary>

Reads all message status definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMessageStatusQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:MessageStatusCollection|error`

Sample code:

```ballerina
document:MessageStatusCollection statuses = check fo->listMessageStatus(
    queries = {
        top: 20
    }
);
```

</details>

<details>
<summary>createMessageStatus</summary>

Creates a message status definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessageStatus` | Yes | The message status to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:MessageStatus|error`

Sample code:

```ballerina
document:MessageStatus status = check fo->createMessageStatus({
    dataAreaId: "USMF",
    messageStatus: "PENDING",
    description: "Pending processing",
    allowDelete: "No",
    responseType: "None"
});
```

</details>

<details>
<summary>getMessageStatus</summary>

Reads a specific message status by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `messageStatus` | `string` | Yes | The message status key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMessageStatusQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:MessageStatus|error`

Sample code:

```ballerina
document:MessageStatus status = check fo->getMessageStatus(
    "USMF",
    "PENDING"
);
```

</details>

<details>
<summary>deleteMessageStatus</summary>

Deletes a specific message status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `messageStatus` | `string` | Yes | The message status key field. |
| `headers` | `DeleteMessageStatusHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMessageStatus(
    "USMF",
    "PENDING",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMessageStatus</summary>

Updates a specific message status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `messageStatus` | `string` | Yes | The message status key field. |
| `payload` | `MessageStatus` | Yes | The fields to update. |
| `headers` | `UpdateMessageStatusHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:MessageStatus|error`

Sample code:

```ballerina
document:MessageStatus updated = check fo->updateMessageStatus(
    "USMF",
    "PENDING",
    {description: "Awaiting downstream processing"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Messages Logs

<details>
<summary>listMessagesLogs</summary>

Reads all message processing log entries.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListMessagesLogsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:MessagesLogsCollection|error`

Sample code:

```ballerina
document:MessagesLogsCollection logs = check fo->listMessagesLogs(
    queries = {
        filter: "MessageId eq 'MSG-001'",
        top: 20
    }
);
```

</details>

<details>
<summary>createMessagesLogs</summary>

Creates a message processing log entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesLog` | Yes | The log entry to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:MessagesLog|error`

Sample code:

```ballerina
document:MessagesLog log = check fo->createMessagesLogs({
    dataAreaId: "USMF",
    messageId: "MSG-001",
    actionId: "ACT-001",
    messageStatusIdFrom: "PENDING",
    messageStatusIdTo: "PROCESSED",
    processingDescription: "Processed successfully"
});
```

</details>

<details>
<summary>getMessagesLogs</summary>

Reads a specific message log entry by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `messageId` | `string` | Yes | The message id key field. |
| `actionId` | `string` | Yes | The action id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetMessagesLogsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:MessagesLog|error`

Sample code:

```ballerina
document:MessagesLog log = check fo->getMessagesLogs(
    "USMF",
    "MSG-001",
    "ACT-001"
);
```

</details>

<details>
<summary>deleteMessagesLogs</summary>

Deletes a specific message log entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `messageId` | `string` | Yes | The message id key field. |
| `actionId` | `string` | Yes | The action id key field. |
| `headers` | `DeleteMessagesLogsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteMessagesLogs(
    "USMF",
    "MSG-001",
    "ACT-001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateMessagesLogs</summary>

Updates a specific message log entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `messageId` | `string` | Yes | The message id key field. |
| `actionId` | `string` | Yes | The action id key field. |
| `payload` | `MessagesLog` | Yes | The fields to update. |
| `headers` | `UpdateMessagesLogsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:MessagesLog|error`

Sample code:

```ballerina
document:MessagesLog updated = check fo->updateMessagesLogs(
    "USMF",
    "MSG-001",
    "ACT-001",
    {processingDescription: "Reprocessed after retry"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Print Layouts

<details>
<summary>listPrintLayouts</summary>

Reads all print layout definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListPrintLayoutsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `document:PrintLayoutsCollection|error`

Sample code:

```ballerina
document:PrintLayoutsCollection layouts = check fo->listPrintLayouts(
    queries = {
        top: 20
    }
);
```

</details>

<details>
<summary>createPrintLayouts</summary>

Creates a print layout definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PrintLayout` | Yes | The print layout to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `document:PrintLayout|error`

Sample code:

```ballerina
document:PrintLayout layout = check fo->createPrintLayouts({
    dataAreaId: "USMF",
    printLayoutGroup: "VOUCHERS",
    printLayoutCode: "TR101",
    groupDescription: "General ledger vouchers",
    codeDescription: "Transfer voucher layout"
});
```

</details>

<details>
<summary>getPrintLayouts</summary>

Reads a specific print layout by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `printLayoutGroup` | `string` | Yes | The print layout group key field. |
| `printLayoutCode` | `string` | Yes | The print layout code key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetPrintLayoutsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `document:PrintLayout|error`

Sample code:

```ballerina
document:PrintLayout layout = check fo->getPrintLayouts(
    "USMF",
    "VOUCHERS",
    "TR101"
);
```

</details>

<details>
<summary>deletePrintLayouts</summary>

Deletes a specific print layout.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `printLayoutGroup` | `string` | Yes | The print layout group key field. |
| `printLayoutCode` | `string` | Yes | The print layout code key field. |
| `headers` | `DeletePrintLayoutsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePrintLayouts(
    "USMF",
    "VOUCHERS",
    "TR101",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updatePrintLayouts</summary>

Updates a specific print layout.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `printLayoutGroup` | `string` | Yes | The print layout group key field. |
| `printLayoutCode` | `string` | Yes | The print layout code key field. |
| `payload` | `PrintLayout` | Yes | The fields to update. |
| `headers` | `UpdatePrintLayoutsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `document:PrintLayout|error`

Sample code:

```ballerina
document:PrintLayout updated = check fo->updatePrintLayouts(
    "USMF",
    "VOUCHERS",
    "TR101",
    {codeDescription: "Updated transfer voucher layout"},
    headers = {ifMatch: eTag}
);
```

</details>
