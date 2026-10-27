---
connector: true
connector_name: "salesforce.datacloud"
title: "Actions"
description: "Reference for the WSO2 Salesforce Data 360 (Data Cloud) Connector client: configuration, initialization, and every operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/salesforce.datacloud` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Ingests records into Salesforce Data 360 (Data Cloud), reads unified profiles and calculated insights, runs SQL queries, and starts identity resolution and calculated insight runs. |

---

## Client

Ingests records into Salesforce Data 360 (Data Cloud), reads unified profiles and calculated insights, runs SQL queries, and starts identity resolution and calculated insight runs.

Data 360 serves its APIs from two hosts. The identity resolution and calculated insight runs go to your Salesforce org with the org's access token. Every other operation goes to the Data 360 tenant endpoint with a Data 360 token. The client takes your org credentials only: it exchanges the org's access token for a Data 360 token, discovers the tenant endpoint, and exchanges again before the token expires.

### Configuration

The client is initialized with a `ConnectionConfig` record and the URL of your Salesforce org (its My Domain, for example, `https://acme.my.salesforce.com`), not the Data 360 tenant endpoint.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig\|OAuth2RefreshTokenGrantConfig\|OAuth2PasswordGrantConfig\|OAuth2JwtBearerGrantConfig\|http:BearerTokenConfig` | Required | Credentials of your Salesforce org. Token requests go to `<serviceUrl>/services/oauth2/token` unless you set `tokenUrl` (or `refreshUrl` for the refresh token grant). |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `30` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | Optional | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | Optional | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | Optional | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | Optional | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | Optional | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | Optional | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | Optional | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

The client also takes these initialization parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `serviceUrl` | `string` | Required | URL of your Salesforce org (its My Domain), for example, `https://acme.my.salesforce.com`. |
| `apiVersion` | `string` | `"v62.0"` | Salesforce REST API version for the identity resolution and calculated insight runs. Needs v57.0 or later. |
| `dataspace` | `string?` | `()` | Data space to scope the Data 360 token to. Omit it to use the default data space. |

### Initializing the client

```ballerina
import ballerinax/salesforce.datacloud;

configurable string orgUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

datacloud:Client datacloudClient = check new (
    {
        auth: {
            clientId,
            clientSecret
        }
    },
    orgUrl
);
```

### Operations

#### Streaming ingestion

Streaming ingestion writes to an object of an Ingestion API connector in Data 360. `sourceName` is the name of the Ingestion API connector as shown in Data 360 setup, and `objectName` is an object from the schema uploaded to it. Every field defined in the object's schema must be present in every record (send a blank value when there's no data), an update replaces the whole record, and date-times need fractional seconds, for example, `2026-10-24T10:15:30.000Z`. Data 360 processes streamed records asynchronously, about every 3 minutes.

<details>
<summary>upsertRecords</summary>

<div>

Queues records for an asynchronous upsert. A request can be up to 200 KB.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceName` | `string` | Yes | Name of the Ingestion API connector as shown in Data 360 setup. |
| `objectName` | `string` | Yes | Object name from the connector's schema. |
| `payload` | `IngestRecords` | Yes | The records to upsert, in `data`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AcceptedResponse|error`

Sample code:

```ballerina
datacloud:AcceptedResponse response = check datacloudClient->upsertRecords("CustomerOrders", "customers", {
    data: [
        {
            "customer_id": "100000001",
            "email": "alex@example.com",
            "first_name": "Alex",
            "last_name": "Perera",
            "created_at": "2026-10-24T10:15:30.000Z"
        }
    ]
});
```

Sample response:

```ballerina
{"accepted": true}
```

</div>

</details>

<details>
<summary>deleteRecords</summary>

<div>

Queues the deletion of up to 200 records by primary key. To delete more, use a bulk job with the `delete` operation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceName` | `string` | Yes | Name of the Ingestion API connector as shown in Data 360 setup. |
| `objectName` | `string` | Yes | Object name from the connector's schema. |
| `payload` | `DeleteRecordsRequest` | Yes | The primary keys of the records to delete, in `ids` (up to 200). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AcceptedResponse|error`

Sample code:

```ballerina
datacloud:AcceptedResponse response = check datacloudClient->deleteRecords("CustomerOrders", "customers", {
    ids: ["100000001", "100000002"]
});
```

Sample response:

```ballerina
{"accepted": true}
```

</div>

</details>

<details>
<summary>validateRecords</summary>

<div>

Validates records against the object's schema without ingesting them. Use it during development to catch schema mismatches.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceName` | `string` | Yes | Name of the Ingestion API connector as shown in Data 360 setup. |
| `objectName` | `string` | Yes | Object name from the connector's schema. |
| `payload` | `IngestRecords` | Yes | The records to validate, in `data`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AcceptedResponse|error`

When a record doesn't match the schema, the operation returns an `http:ClientRequestError` with status `400`. Its `body` detail holds a `validationReport` that lists each failing record and why.

Sample code:

```ballerina
datacloud:AcceptedResponse response = check datacloudClient->validateRecords("CustomerOrders", "customers", {
    data: [
        {
            "customer_id": "100000001",
            "email": "alex@example.com",
            "first_name": "Alex",
            "last_name": "Perera",
            "created_at": "2026-10-24T10:15:30.000Z"
        }
    ]
});
```

Sample response:

```ballerina
{"accepted": true}
```

</div>

</details>

#### Bulk ingestion

Bulk ingestion loads CSV files into an object of an Ingestion API connector. A job moves through the states `Open`, `UploadComplete`, `InProgress` and `JobComplete` (or `Failed`), or `Aborted`. Data 360 allows one open job per object, 5 concurrent jobs and 20 jobs per hour.

<details>
<summary>createBulkJob</summary>

<div>

Creates a bulk ingestion job in the `Open` state.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateBulkJobRequest` | Yes | The job: `objectName`, `sourceName` and `operation` (`upsert` or `delete`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `BulkJob|error`

Sample code:

```ballerina
datacloud:BulkJob job = check datacloudClient->createBulkJob({
    objectName: "customers",
    sourceName: "CustomerOrders",
    operation: "upsert"
});
```

Sample response:

```ballerina
{
  "id": "9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6",
  "objectName": "customers",
  "sourceName": "CustomerOrders",
  "operation": "upsert",
  "state": "Open",
  "contentType": "CSV",
  "apiVersion": "v1",
  "contentUrl": "/api/v1/ingest/jobs/9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6/batches",
  "createdDate": "2026-10-26T01:58:10.123456Z",
  "systemModstamp": ""
}
```

</div>

</details>

<details>
<summary>listBulkJobs</summary>

<div>

Lists bulk ingestion jobs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListBulkJobsQueries` | No | `limit` (default `20`, maximum `100`), `offset`, `orderBy` and `states` (job states to return). |

Returns: `BulkJobList|error`

Sample code:

```ballerina
datacloud:BulkJobList jobs = check datacloudClient->listBulkJobs(states = ["Open", "InProgress"], 'limit = 50);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6",
      "objectName": "customers",
      "sourceName": "CustomerOrders",
      "operation": "upsert",
      "state": "InProgress",
      "contentType": "CSV",
      "createdDate": "2026-10-26T01:58:10.123456Z"
    }
  ]
}
```

</div>

</details>

<details>
<summary>getBulkJob</summary>

<div>

Retrieves a bulk ingestion job, including its current state.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | ID of the bulk job. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `BulkJob|error`

Sample code:

```ballerina
datacloud:BulkJob job = check datacloudClient->getBulkJob("9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6");
```

Sample response:

```ballerina
{
  "id": "9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6",
  "objectName": "customers",
  "sourceName": "CustomerOrders",
  "operation": "upsert",
  "state": "JobComplete",
  "contentType": "CSV",
  "contentUrl": null,
  "createdDate": "2026-10-26T01:58:10.123456Z"
}
```

</div>

</details>

<details>
<summary>uploadBulkJobData</summary>

<div>

Uploads one CSV file (up to 150 MB) to an open job. A job takes up to 100 files. Upsert jobs need a header row with the object's field names. Delete jobs have no header row and the primary key in the first column.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | ID of the bulk job. |
| `payload` | `string` | Yes | The CSV content (UTF-8, comma-delimited). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AcceptedResponse|error`

Sample code:

```ballerina
string csv = string `customer_id,email,first_name,last_name,created_at
100000001,alex@example.com,Alex,Perera,2026-10-24T10:15:30.000Z
100000002,sam@example.com,Sam,Fernando,2026-10-24T10:16:02.000Z
`;
datacloud:AcceptedResponse response = check datacloudClient->uploadBulkJobData("9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6", csv);
```

Sample response:

```ballerina
{"accepted": true}
```

</div>

</details>

<details>
<summary>updateBulkJobState</summary>

<div>

Closes a job so that Data 360 processes the uploaded data (`UploadComplete`), or aborts it and discards the data (`Aborted`). No more data can be added afterwards.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | ID of the bulk job. |
| `payload` | `UpdateBulkJobStateRequest` | Yes | The new `state`: `UploadComplete` or `Aborted`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `BulkJob|error`

Sample code:

```ballerina
datacloud:BulkJob job = check datacloudClient->updateBulkJobState("9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6", {
    state: "UploadComplete"
});
```

Sample response:

```ballerina
{
  "id": "9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6",
  "objectName": "customers",
  "sourceName": "CustomerOrders",
  "operation": "upsert",
  "state": "UploadComplete",
  "contentType": "CSV",
  "contentUrl": null
}
```

</div>

</details>

<details>
<summary>deleteBulkJob</summary>

<div>

Deletes a bulk job and its data. The job must be in the `UploadComplete`, `JobComplete`, `Aborted` or `Failed` state. Records already ingested stay in Data 360.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | ID of the bulk job. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `error?`

Sample code:

```ballerina
check datacloudClient->deleteBulkJob("9f8e7d6c-5b4a-3c2d-1e0f-a1b2c3d4e5f6");
```

</div>

</details>

#### Profiles

The profile operations read profile-category data model objects (DMOs), such as `ssot__Individual__dlm`, `UnifiedIndividual__dlm` and `ssot__ContactPointEmail__dlm`. Rows come back in `data`, keyed by field API name.

<details>
<summary>listProfileMetadata</summary>

<div>

Retrieves the metadata of all profile data model objects: fields, data types, indexes and relationships.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `MetadataResponse|error`

Sample code:

```ballerina
datacloud:MetadataResponse metadata = check datacloudClient->listProfileMetadata();
```

Sample response:

```ballerina
{
  "metadata": [
    {
      "name": "ssot__Individual__dlm",
      "displayName": "Individual",
      "category": "Profile",
      "fields": [
        {"name": "ssot__Id__c", "displayName": "Individual Id", "dataType": "STRING"},
        {"name": "ssot__BirthDate__c", "displayName": "Birth Date", "dataType": "DATE_TIME"},
        {"name": "ssot__FirstName__c", "displayName": "First Name", "dataType": "STRING"}
      ],
      "primaryKeys": [{"name": "ssot__Id__c", "displayName": "Individual Id", "indexOrder": "1"}]
    }
  ]
}
```

</div>

</details>

<details>
<summary>getProfileMetadata</summary>

<div>

Retrieves the metadata of one profile data model object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataModelName` | `string` | Yes | API name of the profile data model object, for example, `ssot__Individual__dlm`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `MetadataResponse|error`

Sample code:

```ballerina
datacloud:MetadataResponse metadata = check datacloudClient->getProfileMetadata("ssot__Individual__dlm");
```

Sample response:

```ballerina
{
  "metadata": [
    {
      "name": "ssot__Individual__dlm",
      "displayName": "Individual",
      "category": "Profile",
      "fields": [
        {"name": "ssot__Id__c", "displayName": "Individual Id", "dataType": "STRING"},
        {"name": "ssot__FirstName__c", "displayName": "First Name", "dataType": "STRING"}
      ],
      "relationships": [
        {
          "fromEntity": "ssot__Individual__dlm",
          "toEntity": "ssot__ContactPointEmail__dlm",
          "fromEntityAttribute": "ssot__Id__c",
          "toEntityAttribute": "ssot__PartyId__c",
          "cardinality": "ONETOMANY"
        }
      ]
    }
  ]
}
```

</div>

</details>

<details>
<summary>queryProfiles</summary>

<div>

Queries the records of a profile data model object with equality filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataModelName` | `string` | Yes | API name of the profile data model object. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `QueryProfilesQueries` | Yes | `filters` (required, for example, `[ssot__FirstName__c=Alex]`), `fields` (up to 50, the first 10 fields when omitted), `limit` (up to 49,999), `offset` and `orderBy`. |

Returns: `QueryResponse|error`

Sample code:

```ballerina
datacloud:QueryResponse profiles = check datacloudClient->queryProfiles("ssot__ContactPointEmail__dlm",
    filters = "[ssot__EmailAddress__c=alex@example.com]", fields = ["ssot__Id__c", "ssot__PartyId__c"]);
```

Sample response:

```ballerina
{
  "data": [
    {"ssot__Id__c": "c8f4b2e0-0001", "ssot__PartyId__c": "a1b2c3d4-0000-0000-0000-000000000001"}
  ],
  "done": true,
  "metadata": {
    "ssot__Id__c": {"type": "VARCHAR", "placeInOrder": 0},
    "ssot__PartyId__c": {"type": "VARCHAR", "placeInOrder": 1}
  }
}
```

</div>

</details>

<details>
<summary>getProfile</summary>

<div>

Retrieves a profile record by its primary key, or by another indexed field named in `searchKey`. Returns an empty `data` list when no record matches.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataModelName` | `string` | Yes | API name of the profile data model object. |
| `recordId` | `string` | Yes | Record ID, or the value of the field named in `searchKey`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProfileQueries` | No | `searchKey`, `fields`, `filters`, `limit`, `offset` and `orderBy`. |

Returns: `QueryResponse|error`

Sample code:

```ballerina
datacloud:QueryResponse profile = check datacloudClient->getProfile("ssot__Individual__dlm",
    "a1b2c3d4-0000-0000-0000-000000000001", fields = ["ssot__Id__c", "ssot__FirstName__c", "ssot__LastName__c"]);
```

Sample response:

```ballerina
{
  "data": [
    {
      "ssot__Id__c": "a1b2c3d4-0000-0000-0000-000000000001",
      "ssot__FirstName__c": "Alex",
      "ssot__LastName__c": "Perera"
    }
  ],
  "done": true
}
```

</div>

</details>

<details>
<summary>getProfileChildRecords</summary>

<div>

Retrieves a profile record with its related child records, such as its email addresses. Each row is the parent record, with the child record nested under a key named after the child object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataModelName` | `string` | Yes | API name of the parent profile data model object. |
| `recordId` | `string` | Yes | Record ID, or the value of the field named in `searchKey`. |
| `childDataModelName` | `string` | Yes | API name of the related child data model object, for example, `ssot__ContactPointEmail__dlm`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProfileChildRecordsQueries` | No | `searchKey`, `fields`, `filters` (on the parent object), `limit`, `offset` and `orderBy`. |

Returns: `QueryResponse|error`

Sample code:

```ballerina
datacloud:QueryResponse emails = check datacloudClient->getProfileChildRecords("ssot__Individual__dlm",
    "a1b2c3d4-0000-0000-0000-000000000001", "ssot__ContactPointEmail__dlm");
```

Sample response:

```ballerina
{
  "data": [
    {
      "ssot__FirstName__c": "Alex",
      "ssot__ContactPointEmail__dlm": {
        "ssot__EmailAddress__c": "alex@example.com",
        "ssot__Id__c": "c8f4b2e0-0001"
      }
    }
  ],
  "done": true
}
```

</div>

</details>

<details>
<summary>getProfileCalculatedInsight</summary>

<div>

Retrieves a calculated insight's values for one profile. Each row is the parent record, with the insight's values nested under a key named after the insight.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataModelName` | `string` | Yes | API name of the profile data model object. |
| `recordId` | `string` | Yes | Record ID, or the value of the field named in `searchKey`. |
| `insightName` | `string` | Yes | API name of the calculated insight, for example, `IndividualSpend__cio`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProfileCalculatedInsightQueries` | No | `dimensions`, `measures`, `filters`, `searchKey`, `timeGranularity`, `limit`, `offset` and `orderBy`. |

Returns: `QueryResponse|error`

Sample code:

```ballerina
datacloud:QueryResponse insight = check datacloudClient->getProfileCalculatedInsight("ssot__Individual__dlm",
    "a1b2c3d4-0000-0000-0000-000000000001", "IndividualSpend__cio");
```

Sample response:

```ballerina
{
  "data": [
    {
      "ssot__FirstName__c": "Alex",
      "IndividualSpend__cio": {
        "individual_id__c": "a1b2c3d4-0000-0000-0000-000000000001",
        "total_spend__c": 1250.5
      }
    }
  ],
  "done": true
}
```

</div>

</details>

#### Calculated insights

<details>
<summary>listCalculatedInsightMetadata</summary>

<div>

Retrieves the metadata of all calculated insights: their dimensions, measures and processing times.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `MetadataResponse|error`

Sample code:

```ballerina
datacloud:MetadataResponse insights = check datacloudClient->listCalculatedInsightMetadata();
```

Sample response:

```ballerina
{
  "metadata": [
    {
      "name": "IndividualSpend__cio",
      "displayName": "Individual Spend",
      "dimensions": [{"name": "individual_id__c", "displayName": "Individual Id", "dataType": "STRING"}],
      "measures": [{"name": "total_spend__c", "displayName": "Total Spend", "dataType": "NUMBER", "rollupable": true}],
      "latestProcessTime": "2026-10-26T09:00:00.00000Z",
      "latestSuccessfulProcessTime": "2026-10-26T09:00:00.00000Z"
    }
  ]
}
```

</div>

</details>

<details>
<summary>getCalculatedInsightMetadata</summary>

<div>

Retrieves the metadata of one calculated insight.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `insightName` | `string` | Yes | API name of the calculated insight, for example, `IndividualSpend__cio`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `MetadataResponse|error`

Sample code:

```ballerina
datacloud:MetadataResponse insight = check datacloudClient->getCalculatedInsightMetadata("IndividualSpend__cio");
```

Sample response:

```ballerina
{
  "metadata": [
    {
      "name": "IndividualSpend__cio",
      "displayName": "Individual Spend",
      "dimensions": [{"name": "individual_id__c", "displayName": "Individual Id", "dataType": "STRING"}],
      "measures": [{"name": "total_spend__c", "displayName": "Total Spend", "dataType": "NUMBER", "rollupable": true}]
    }
  ]
}
```

</div>

</details>

<details>
<summary>queryCalculatedInsight</summary>

<div>

Queries the rows of a calculated insight, up to 4,999 rows per call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `insightName` | `string` | Yes | API name of the calculated insight. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `QueryCalculatedInsightQueries` | No | `dimensions`, `measures`, `filters`, `timeGranularity` (`HOUR`, `DAY`, `MONTH`, `QUARTER` or `YEAR`), `limit`, `offset` and `orderBy`. |

Returns: `QueryResponse|error`

Sample code:

```ballerina
datacloud:QueryResponse rows = check datacloudClient->queryCalculatedInsight("IndividualSpend__cio",
    dimensions = ["individual_id__c"], measures = ["total_spend__c"], 'limit = 100);
```

Sample response:

```ballerina
{
  "data": [
    {"individual_id__c": "a1b2c3d4-0000-0000-0000-000000000001", "total_spend__c": 1250.5}
  ],
  "done": true,
  "metadata": {
    "individual_id__c": {"type": "VARCHAR", "placeInOrder": 0},
    "total_spend__c": {"type": "DECIMAL", "placeInOrder": 1}
  }
}
```

</div>

</details>

#### SQL queries

<details>
<summary>querySql</summary>

<div>

Runs an ANSI SQL query over data lake objects, data model objects and calculated insights. Rows come back as arrays of column values, ordered by each column's `placeInOrder` in `metadata`. When `done` is `false`, get the remaining rows with `getNextSqlQueryBatch`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SqlQueryRequest` | Yes | The query, in `sql`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SqlQueryResponse|error`

Sample code:

```ballerina
datacloud:SqlQueryResponse result = check datacloudClient->querySql({
    sql: "SELECT ssot__Id__c, ssot__FirstName__c FROM ssot__Individual__dlm LIMIT 10"
});
```

Sample response:

```ballerina
{
  "data": [
    ["a1b2c3d4-0000-0000-0000-000000000001", "Alex"],
    ["a1b2c3d4-0000-0000-0000-000000000002", "Sam"]
  ],
  "metadata": {
    "ssot__Id__c": {"dataType": "VARCHAR", "placeInOrder": 0, "typeCode": 12},
    "ssot__FirstName__c": {"dataType": "VARCHAR", "placeInOrder": 1, "typeCode": 12}
  },
  "rowCount": 2,
  "done": true,
  "nextBatchId": null,
  "queryId": "e3b0c442-98fc-4c14-9afb-f4c8996fb924",
  "startTime": "2026-10-26T03:11:59.118575744Z",
  "endTime": "2026-10-26T03:11:59.567247587Z"
}
```

</div>

</details>

<details>
<summary>getNextSqlQueryBatch</summary>

<div>

Retrieves the next batch of a SQL query's results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nextBatchId` | `string` | Yes | The `nextBatchId` of the previous batch. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SqlQueryResponse|error`

Sample code:

```ballerina
datacloud:SqlQueryResponse firstBatch = check datacloudClient->querySql({
    sql: "SELECT ssot__Id__c FROM ssot__Individual__dlm"
});
string? nextBatchId = firstBatch?.nextBatchId;
if nextBatchId is string {
    datacloud:SqlQueryResponse nextBatch = check datacloudClient->getNextSqlQueryBatch(nextBatchId);
}
```

Sample response:

```ballerina
{
  "data": [
    ["a1b2c3d4-0000-0000-0000-000000004001"],
    ["a1b2c3d4-0000-0000-0000-000000004002"]
  ],
  "metadata": {
    "ssot__Id__c": {"dataType": "VARCHAR", "placeInOrder": 0, "typeCode": 12}
  },
  "rowCount": 2,
  "done": true,
  "nextBatchId": null
}
```

</div>

</details>

#### Runs

The run operations go to your Salesforce org with the org's access token, through the Connect REST API.

<details>
<summary>listIdentityResolutionRulesets</summary>

<div>

Lists the identity resolution rulesets of the org.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `IdentityResolutionRulesetList|error`

Sample code:

```ballerina
datacloud:IdentityResolutionRulesetList rulesets = check datacloudClient->listIdentityResolutionRulesets();
```

Sample response:

```ballerina
{
  "rulesets": [
    {
      "id": "1irXX0000000001AAA",
      "label": "Individual Ruleset",
      "developerName": null,
      "configurationType": "individual",
      "objectApiName": "Individual",
      "dataSpaceName": "default",
      "doesRunAutomatically": true,
      "lastJobStatus": "SUCCESS"
    }
  ]
}
```

</div>

</details>

<details>
<summary>runIdentityResolutionRuleset</summary>

<div>

Starts an identity resolution ruleset now instead of waiting for its schedule. `resultCode` tells whether it started, for example, `IdentityResolutionJobIsAlreadyRunning` while a run is in progress.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rulesetId` | `string` | Yes | ID or developer name of the identity resolution ruleset. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `RunResult|error`

Sample code:

```ballerina
datacloud:RunResult run = check datacloudClient->runIdentityResolutionRuleset("1irXX0000000001AAA");
```

Sample response:

```ballerina
{"resultCode": "SuccessfullySubmittedIdentityResolutionJobRunRequest"}
```

</div>

</details>

<details>
<summary>runCalculatedInsight</summary>

<div>

Starts a calculated insight run now. While a run is in progress, the operation returns an `http:ClientRequestError` with status `409` (`ALREADY_IN_PROCESS`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `insightName` | `string` | Yes | API name of the calculated insight, for example, `IndividualSpend__cio`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `RunResult|error`

Sample code:

```ballerina
datacloud:RunResult run = check datacloudClient->runCalculatedInsight("IndividualSpend__cio");
```

Sample response:

```ballerina
{"success": true, "errors": []}
```

</div>

</details>
