---
connector: true
connector_name: "power.bi"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Power Bi connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage Power BI workspaces, datasets, reports, dashboards, dataflows, apps, capacities, gateways, pipelines and tenant administration through the Power BI REST API. |

---

## Client

The `Client` connects to the Power BI REST API (`https://api.powerbi.com/v1.0/myorg`). It exposes 287 operations. Operations without a workspace ID act on the signed-in user's My workspace.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig</code> | Required | Configurations related to client authentication |
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
import ballerinax/power.bi;

configurable string token = ?;

final bi:Client biClient = check new ({
    auth: {
        token
    }
});
```

### Operations

#### Datasets

<details>
<summary>getDatasets</summary>

<div>

Returns a list of datasets from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasets|error`

**Sample code:**

```ballerina
bi:Datasets result = check biClient->getDatasets();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDataset</summary>

<div>

Creates a new dataset on **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateDatasetRequest</code> | Yes | Dataset definition to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `defaultRetentionPolicy` | <code>"None"&#124;"basicFIFO"</code> | No | The default retention policy. |

**Returns:** `Dataset|error`

**Sample code:**

```ballerina
bi:Dataset result = check biClient->createDataset({
    tables: [{
        columns: [{
            dataType: "string",
            name: "Sample name"
        }],
        name: "Sample name",
        measures: [{
            expression: "string",
            name: "Sample name"
        }]
    }],
    name: "Sample name",
    relationships: [{
        name: "Sample name",
        fromColumn: "string",
        toTable: "string",
        toColumn: "string",
        fromTable: "string"
    }],
    datasources: [{
        connectionString: "string",
        datasourceType: "string",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "createdDate": "2026-01-15T00:00:00",
  "name": "Sample name",
  "ContentProviderType": "string",
  "upstreamDataflows": [
    {
      "targetDataflowId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getDatasetById</summary>

<div>

Returns the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dataset|error`

**Sample code:**

```ballerina
bi:Dataset result = check biClient->getDatasetById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "createdDate": "2026-01-15T00:00:00",
  "name": "Sample name",
  "ContentProviderType": "string",
  "upstreamDataflows": [
    {
      "targetDataflowId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteDataset</summary>

<div>

Deletes the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDataset("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDataset</summary>

<div>

Updates the properties for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>UpdateDatasetRequest</code> | Yes | Update dataset request parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDataset("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    targetStorageMode: "string"
});
```

</div>
</details>

<details>
<summary>executeQueries</summary>

<div>

Executes Data Analysis Expressions (DAX) queries against the provided dataset. The dataset must reside in **My workspace** or another workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DatasetExecuteQueriesRequest</code> | Yes | The request message. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetExecuteQueriesResponse|error`

**Sample code:**

```ballerina
bi:DatasetExecuteQueriesResponse result = check biClient->executeQueries("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    queries: [{
        query: "string"
    }],
    impersonatedUserName: "Sample name",
    serializerSettings: {
        includeNulls: false
    }
});
```

**Sample response:**

```json
{
  "informationProtectionLabel": {
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "error": {
    "code": "200",
    "message": "string"
  }
}
```

</div>
</details>

<details>
<summary>getTables</summary>

<div>

Returns a list of tables within the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tables|error`

**Sample code:**

```ballerina
bi:Tables result = check biClient->getTables("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "columns": [
        {
          "dataType": "string",
          "name": "Sample name"
        }
      ],
      "name": "Sample name",
      "measures": [
        {
          "expression": "string",
          "name": "Sample name"
        }
      ]
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateTable</summary>

<div>

Updates the metadata and schema for the specified table within the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `tableName` | <code>string</code> | Yes | The table name. |
| `payload` | <code>Table</code> | Yes | Table name and columns to update existing table. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Table|error`

**Sample code:**

```ballerina
bi:Table result = check biClient->updateTable("3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name", {
    columns: [{
        dataType: "string",
        name: "Sample name",
        formatString: "string"
    }],
    name: "Sample name",
    measures: [{
        expression: "string",
        name: "Sample name",
        formatString: "string"
    }],
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "columns": [
    {
      "dataType": "string",
      "name": "Sample name",
      "formatString": "string"
    }
  ],
  "name": "Sample name",
  "measures": [
    {
      "expression": "string",
      "name": "Sample name",
      "formatString": "string"
    }
  ],
  "description": "Sample description",
  "source": [
    {
      "expression": "string"
    }
  ],
  "rows": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addRows</summary>

<div>

Adds new data rows to the specified table within the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `tableName` | <code>string</code> | Yes | The table name. |
| `payload` | <code>PostRowsRequest</code> | Yes | The request message. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addRows("3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name", {});
```

</div>
</details>

<details>
<summary>deleteRows</summary>

<div>

Deletes all rows from the specified table within the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `tableName` | <code>string</code> | Yes | The table name. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteRows("3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name");
```

</div>
</details>

<details>
<summary>getRefreshHistory</summary>

<div>

Returns the refresh history for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `top` | <code>int</code> | No | The requested number of entries in the refresh history. If not provided, the default is the last available 60 entries. |

**Returns:** `Refreshes|error`

**Sample code:**

```ballerina
bi:Refreshes result = check biClient->getRefreshHistory("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "serviceExceptionJson": "string",
      "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "refreshType": "Scheduled"
    }
  ]
}
```

</div>
</details>

<details>
<summary>refreshDataset</summary>

<div>

Triggers a refresh for the specified dataset from **My workspace**. An [enhanced refresh](/power-bi/connect-data/asynchronous-refresh) is triggered only if a request payload other than `notifyOption` is set.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DatasetRefreshRequest</code> | Yes | Refresh options: notification option and, for an enhanced refresh, the objects and refresh type. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->refreshDataset("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    notifyOption: "NoNotification",
    commitMode: "Transactional",
    retryCount: 1,
    maxParallelism: 1
});
```

</div>
</details>

<details>
<summary>getRefreshExecutionDetails</summary>

<div>

Returns execution details of a refresh operation for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `refreshId` | <code>string</code> | Yes | The refresh ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetRefreshDetail|error`

**Sample code:**

```ballerina
bi:DatasetRefreshDetail result = check biClient->getRefreshExecutionDetails("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "currentRefreshType": "Full",
  "serviceExceptionJson": "string",
  "objects": [
    {
      "partition": "string",
      "table": "string"
    }
  ],
  "type": "Full",
  "extendedStatus": "Unknown",
  "commitMode": "Transactional"
}
```

</div>
</details>

<details>
<summary>cancelRefresh</summary>

<div>

Cancels the specified refresh operation for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `refreshId` | <code>string</code> | Yes | The refresh ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->cancelRefresh("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getRefreshSchedule</summary>

<div>

Returns the refresh schedule for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RefreshSchedule|error`

**Sample code:**

```ballerina
bi:RefreshSchedule result = check biClient->getRefreshSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "times": [
    "string"
  ],
  "days": [
    "Monday"
  ],
  "localTimeZoneId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "enabled": false,
  "notifyOption": "NoNotification"
}
```

</div>
</details>

<details>
<summary>updateRefreshSchedule</summary>

<div>

Updates the refresh schedule for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>RefreshScheduleRequest</code> | Yes | Update Refresh Schedule parameters, by specifying all or some of the parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateRefreshSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    value: {
        times: ["string"],
        days: ["Monday"],
        localTimeZoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

</div>
</details>

<details>
<summary>getDirectQueryRefreshSchedule</summary>

<div>

Returns the refresh schedule for a specified [DirectQuery](/power-bi/connect-data/desktop-directquery-about) or [LiveConnection](/power-bi/connect-data/desktop-directquery-about#live-connections) dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DirectQueryRefreshSchedule|error`

**Sample code:**

```ballerina
bi:DirectQueryRefreshSchedule result = check biClient->getDirectQueryRefreshSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "times": [
    "string"
  ],
  "days": [
    "Monday"
  ],
  "localTimeZoneId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "frequency": 1
}
```

</div>
</details>

<details>
<summary>updateDirectQueryRefreshSchedule</summary>

<div>

Updates the refresh schedule for a specified [DirectQuery](/power-bi/connect-data/desktop-directquery-about) or [LiveConnection](/power-bi/connect-data/desktop-directquery-about#live-connections) dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DirectQueryRefreshScheduleRequest</code> | Yes | Patch DirectQuery or LiveConnection Refresh Schedule parameters, by specifying all or some of the parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDirectQueryRefreshSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    value: {
        times: ["string"],
        days: ["Monday"],
        localTimeZoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

</div>
</details>

<details>
<summary>getParameters</summary>

<div>

Returns a list of parameters for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MashupParameters|error`

**Sample code:**

```ballerina
bi:MashupParameters result = check biClient->getParameters("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "isRequired": false,
      "name": "Sample name",
      "type": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateParameters</summary>

<div>

Updates the parameters values for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>UpdateMashupParametersRequest</code> | Yes | The list of dataset parameters and the new values to set. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateParameters("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    updateDetails: [{
        name: "Sample name",
        newValue: "string"
    }]
});
```

</div>
</details>

<details>
<summary>getDatasources</summary>

<div>

Returns a list of data sources for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getDatasources("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateDatasources</summary>

<div>

Updates the data sources of the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>UpdateDatasourcesRequest</code> | Yes | The data source connection updates to apply to the dataset. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDatasources("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    updateDetails: [{
        connectionDetails: {}
    }]
});
```

</div>
</details>

<details>
<summary>setAllDatasetConnections</summary>

<div>

**Deprecated.** Updates all connections for the specified dataset from **My workspace**. This API call only supports SQL DirectQuery datasets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>ConnectionDetails</code> | Yes | The request payload for the operation that updates all connections for the specified dataset from My workspace. This API call only supports SQL DirectQuery datasets. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->setAllDatasetConnections("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    connectionString: "string"
});
```

</div>
</details>

<details>
<summary>bindToGateway</summary>

<div>

Binds the specified dataset from **My workspace** to the specified gateway, optionally with a given set of data source IDs. If you don't supply a specific data source ID, the dataset will be bound to the first matching data source in the gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>BindToGatewayRequest</code> | Yes | The bind to gateway request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->bindToGateway("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    gatewayObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    datasourceObjectIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

</div>
</details>

<details>
<summary>getGatewayDatasources</summary>

<div>

Returns a list of gateway data sources for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GatewayDatasources|error`

**Sample code:**

```ballerina
bi:GatewayDatasources result = check biClient->getGatewayDatasources("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "credentialType": "Basic",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "gatewayId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>discoverGateways</summary>

<div>

Returns a list of gateways that the specified dataset from **My workspace** can be bound to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Gateways|error`

**Sample code:**

```ballerina
bi:Gateways result = check biClient->discoverGateways("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "type": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getQueryScaleOutSyncStatus</summary>

<div>

Returns the query scale-out sync status for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetQueryScaleOutSyncStatus|error`

**Sample code:**

```ballerina
bi:DatasetQueryScaleOutSyncStatus result = check biClient->getQueryScaleOutSyncStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "syncStartTime": "string",
  "targetSyncTimestamp": "string",
  "minActiveReadVersion": 1,
  "syncEndTime": "string",
  "triggerReason": "explicit",
  "targetSyncVersion": 1
}
```

</div>
</details>

<details>
<summary>triggerQueryScaleOutSync</summary>

<div>

Triggers a query scale-out sync of read-only replicas for the specified dataset from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetQueryScaleOutSyncStatus|error`

**Sample code:**

```ballerina
bi:DatasetQueryScaleOutSyncStatus result = check biClient->triggerQueryScaleOutSync("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "syncStartTime": "string",
  "targetSyncTimestamp": "string",
  "minActiveReadVersion": 1,
  "syncEndTime": "string",
  "triggerReason": "explicit",
  "targetSyncVersion": 1
}
```

</div>
</details>

<details>
<summary>getDatasetUsers</summary>

<div>

Returns a list of principals that have access to the specified dataset in My workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetUsersAccess|error`

**Sample code:**

```ballerina
bi:DatasetUsersAccess result = check biClient->getDatasetUsers("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "datasetUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateDatasetUser</summary>

<div>

Updates the existing dataset permissions of the specified user to the specified permissions in My workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DatasetUserAccess</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDatasetUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    datasetUserAccessRight: "None"
});
```

</div>
</details>

<details>
<summary>addDatasetUser</summary>

<div>

Grants the specified user's permissions to the specified dataset in My workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>PostDatasetUserAccess</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addDatasetUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    datasetUserAccessRight: "Read"
});
```

</div>
</details>

#### Groups

<details>
<summary>getDatasetUsersInGroup</summary>

<div>

Returns a list of principals that have access to the specified dataset in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetUsersAccess|error`

**Sample code:**

```ballerina
bi:DatasetUsersAccess result = check biClient->getDatasetUsersInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "datasetUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateDatasetUserInGroup</summary>

<div>

Updates the existing dataset permissions of the specified user to the specified permissions in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DatasetUserAccess</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDatasetUserInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    datasetUserAccessRight: "None"
});
```

</div>
</details>

<details>
<summary>addDatasetUserInGroup</summary>

<div>

Grants the specified user's permissions to the specified dataset in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>PostDatasetUserAccess</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addDatasetUserInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    datasetUserAccessRight: "Read"
});
```

</div>
</details>

<details>
<summary>getDatasetsInGroup</summary>

<div>

Returns a list of datasets from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasets|error`

**Sample code:**

```ballerina
bi:Datasets result = check biClient->getDatasetsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDatasetInGroup</summary>

<div>

Creates a new dataset in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>CreateDatasetRequest</code> | Yes | Create dataset parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `defaultRetentionPolicy` | <code>"None"&#124;"basicFIFO"</code> | No | The default retention policy. |

**Returns:** `Dataset|error`

**Sample code:**

```ballerina
bi:Dataset result = check biClient->createDatasetInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    tables: [{
        columns: [{
            dataType: "string",
            name: "Sample name"
        }],
        name: "Sample name",
        measures: [{
            expression: "string",
            name: "Sample name"
        }]
    }],
    name: "Sample name",
    relationships: [{
        name: "Sample name",
        fromColumn: "string",
        toTable: "string",
        toColumn: "string",
        fromTable: "string"
    }],
    datasources: [{
        connectionString: "string",
        datasourceType: "string",
        name: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "createdDate": "2026-01-15T00:00:00",
  "name": "Sample name",
  "ContentProviderType": "string",
  "upstreamDataflows": [
    {
      "targetDataflowId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getDatasetToDataflowsLinksInGroup</summary>

<div>

Returns a list of upstream dataflows for datasets from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetToDataflowLinksResponse|error`

**Sample code:**

```ballerina
bi:DatasetToDataflowLinksResponse result = check biClient->getDatasetToDataflowsLinksInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "workspaceObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "datasetObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dataflowObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDatasetByIdInGroup</summary>

<div>

Returns the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dataset|error`

**Sample code:**

```ballerina
bi:Dataset result = check biClient->getDatasetByIdInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "createdDate": "2026-01-15T00:00:00",
  "name": "Sample name",
  "ContentProviderType": "string",
  "upstreamDataflows": [
    {
      "targetDataflowId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteDatasetInGroup</summary>

<div>

Deletes the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDatasetInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDatasetInGroup</summary>

<div>

Updates the properties for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>UpdateDatasetRequest</code> | Yes | Update dataset request parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDatasetInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    targetStorageMode: "string"
});
```

</div>
</details>

<details>
<summary>getTablesInGroup</summary>

<div>

Returns a list of tables within the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tables|error`

**Sample code:**

```ballerina
bi:Tables result = check biClient->getTablesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "columns": [
        {
          "dataType": "string",
          "name": "Sample name"
        }
      ],
      "name": "Sample name",
      "measures": [
        {
          "expression": "string",
          "name": "Sample name"
        }
      ]
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateTableInGroup</summary>

<div>

Updates the metadata and schema for the specified table within the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `tableName` | <code>string</code> | Yes | The table name. |
| `payload` | <code>Table</code> | Yes | The request message. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Table|error`

**Sample code:**

```ballerina
bi:Table result = check biClient->updateTableInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name", {
    columns: [{
        dataType: "string",
        name: "Sample name",
        formatString: "string"
    }],
    name: "Sample name",
    measures: [{
        expression: "string",
        name: "Sample name",
        formatString: "string"
    }],
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "columns": [
    {
      "dataType": "string",
      "name": "Sample name",
      "formatString": "string"
    }
  ],
  "name": "Sample name",
  "measures": [
    {
      "expression": "string",
      "name": "Sample name",
      "formatString": "string"
    }
  ],
  "description": "Sample description",
  "source": [
    {
      "expression": "string"
    }
  ],
  "rows": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addRowsInGroup</summary>

<div>

Adds new data rows to the specified table within the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `tableName` | <code>string</code> | Yes | The table name. |
| `payload` | <code>PostRowsRequest</code> | Yes | The request message. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addRowsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name", {});
```

</div>
</details>

<details>
<summary>deleteRowsInGroup</summary>

<div>

Deletes all rows from the specified table within the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `tableName` | <code>string</code> | Yes | The table name. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteRowsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name");
```

</div>
</details>

<details>
<summary>getRefreshHistoryInGroup</summary>

<div>

Returns the refresh history for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `top` | <code>int</code> | No | The requested number of entries in the refresh history. If not provided, the default is the last available 60 entries. |

**Returns:** `Refreshes|error`

**Sample code:**

```ballerina
bi:Refreshes result = check biClient->getRefreshHistoryInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "serviceExceptionJson": "string",
      "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "refreshType": "Scheduled"
    }
  ]
}
```

</div>
</details>

<details>
<summary>refreshDatasetInGroup</summary>

<div>

Triggers a refresh for the specified dataset from the specified workspace. An [enhanced refresh](/power-bi/connect-data/asynchronous-refresh) is triggered only if a request payload other than `notifyOption` is set.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DatasetRefreshRequest</code> | Yes | Refresh options: notification option and, for an enhanced refresh, the objects and refresh type. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->refreshDatasetInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    notifyOption: "NoNotification",
    commitMode: "Transactional",
    retryCount: 1,
    maxParallelism: 1
});
```

</div>
</details>

<details>
<summary>getRefreshExecutionDetailsInGroup</summary>

<div>

Returns execution details of a refresh operation for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `refreshId` | <code>string</code> | Yes | The refresh ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetRefreshDetail|error`

**Sample code:**

```ballerina
bi:DatasetRefreshDetail result = check biClient->getRefreshExecutionDetailsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "currentRefreshType": "Full",
  "serviceExceptionJson": "string",
  "objects": [
    {
      "partition": "string",
      "table": "string"
    }
  ],
  "type": "Full",
  "extendedStatus": "Unknown",
  "commitMode": "Transactional"
}
```

</div>
</details>

<details>
<summary>cancelRefreshInGroup</summary>

<div>

Cancels the specified refresh operation for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `refreshId` | <code>string</code> | Yes | The refresh ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->cancelRefreshInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getRefreshScheduleInGroup</summary>

<div>

Returns the refresh schedule for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RefreshSchedule|error`

**Sample code:**

```ballerina
bi:RefreshSchedule result = check biClient->getRefreshScheduleInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "times": [
    "string"
  ],
  "days": [
    "Monday"
  ],
  "localTimeZoneId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "enabled": false,
  "notifyOption": "NoNotification"
}
```

</div>
</details>

<details>
<summary>updateRefreshScheduleInGroup</summary>

<div>

Updates the refresh schedule for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>RefreshScheduleRequest</code> | Yes | Update Refresh Schedule parameters, by specifying all or some of the parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateRefreshScheduleInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    value: {
        times: ["string"],
        days: ["Monday"],
        localTimeZoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

</div>
</details>

<details>
<summary>getDirectQueryRefreshScheduleInGroup</summary>

<div>

Returns the refresh schedule for a specified [DirectQuery](/power-bi/connect-data/desktop-directquery-about) or [LiveConnection](/power-bi/connect-data/desktop-directquery-about#live-connections) dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DirectQueryRefreshSchedule|error`

**Sample code:**

```ballerina
bi:DirectQueryRefreshSchedule result = check biClient->getDirectQueryRefreshScheduleInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "times": [
    "string"
  ],
  "days": [
    "Monday"
  ],
  "localTimeZoneId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "frequency": 1
}
```

</div>
</details>

<details>
<summary>updateDirectQueryRefreshScheduleInGroup</summary>

<div>

Updates the refresh schedule for a specified [DirectQuery](/power-bi/connect-data/desktop-directquery-about) or [LiveConnection](/power-bi/connect-data/desktop-directquery-about#live-connections) dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DirectQueryRefreshScheduleRequest</code> | Yes | Patch DirectQuery or LiveConnection Refresh Schedule parameters, by specifying all or some of the parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDirectQueryRefreshScheduleInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    value: {
        times: ["string"],
        days: ["Monday"],
        localTimeZoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

</div>
</details>

<details>
<summary>getParametersInGroup</summary>

<div>

Returns a list of parameters for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MashupParameters|error`

**Sample code:**

```ballerina
bi:MashupParameters result = check biClient->getParametersInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "isRequired": false,
      "name": "Sample name",
      "type": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateParametersInGroup</summary>

<div>

Updates the parameters values for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>UpdateMashupParametersRequest</code> | Yes | The list of dataset parameters and the new values to set. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateParametersInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    updateDetails: [{
        name: "Sample name",
        newValue: "string"
    }]
});
```

</div>
</details>

<details>
<summary>getDatasourcesInGroup</summary>

<div>

Returns a list of data sources for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getDatasourcesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateDatasourcesInGroup</summary>

<div>

Updates the data sources of the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>UpdateDatasourcesRequest</code> | Yes | The data source connection updates to apply to the dataset. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDatasourcesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    updateDetails: [{
        connectionDetails: {}
    }]
});
```

</div>
</details>

<details>
<summary>setAllDatasetConnectionsInGroup</summary>

<div>

**Deprecated.** Updates all connections for the specified dataset from the specified workspace. This API call only supports SQL DirectQuery datasets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>ConnectionDetails</code> | Yes | The request payload for the operation that updates all connections for the specified dataset from the specified workspace. This API call only supports SQL DirectQuery datasets. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->setAllDatasetConnectionsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    connectionString: "string"
});
```

</div>
</details>

<details>
<summary>bindToGatewayInGroup</summary>

<div>

Binds the specified dataset from the specified workspace to the specified gateway, optionally with a given set of data source IDs. If you don't supply a specific data source ID, the dataset will be bound to the first matching data source in the gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>BindToGatewayRequest</code> | Yes | The bind to gateway request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->bindToGatewayInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    gatewayObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    datasourceObjectIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

</div>
</details>

<details>
<summary>getGatewayDatasourcesInGroup</summary>

<div>

Returns a list of gateway data sources for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GatewayDatasources|error`

**Sample code:**

```ballerina
bi:GatewayDatasources result = check biClient->getGatewayDatasourcesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "credentialType": "Basic",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "gatewayId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>discoverGatewaysInGroup</summary>

<div>

Returns a list of gateways that the specified dataset from the specified workspace can be bound to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Gateways|error`

**Sample code:**

```ballerina
bi:Gateways result = check biClient->discoverGatewaysInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "type": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>takeOverInGroup</summary>

<div>

Transfers ownership over the specified dataset to the current authorized user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->takeOverInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>executeQueriesInGroup</summary>

<div>

Executes Data Analysis Expressions (DAX) queries against the provided dataset.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>DatasetExecuteQueriesRequest</code> | Yes | The request message. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetExecuteQueriesResponse|error`

**Sample code:**

```ballerina
bi:DatasetExecuteQueriesResponse result = check biClient->executeQueriesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    queries: [{
        query: "string"
    }],
    impersonatedUserName: "Sample name",
    serializerSettings: {
        includeNulls: false
    }
});
```

**Sample response:**

```json
{
  "informationProtectionLabel": {
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "error": {
    "code": "200",
    "message": "string"
  }
}
```

</div>
</details>

<details>
<summary>getQueryScaleOutSyncStatusInGroup</summary>

<div>

Returns the query scale-out sync status for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetQueryScaleOutSyncStatus|error`

**Sample code:**

```ballerina
bi:DatasetQueryScaleOutSyncStatus result = check biClient->getQueryScaleOutSyncStatusInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "syncStartTime": "string",
  "targetSyncTimestamp": "string",
  "minActiveReadVersion": 1,
  "syncEndTime": "string",
  "triggerReason": "explicit",
  "targetSyncVersion": 1
}
```

</div>
</details>

<details>
<summary>triggerQueryScaleOutSyncInGroup</summary>

<div>

Triggers a query scale-out sync of read-only replicas for the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetQueryScaleOutSyncStatus|error`

**Sample code:**

```ballerina
bi:DatasetQueryScaleOutSyncStatus result = check biClient->triggerQueryScaleOutSyncInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "syncStartTime": "string",
  "targetSyncTimestamp": "string",
  "minActiveReadVersion": 1,
  "syncEndTime": "string",
  "triggerReason": "explicit",
  "targetSyncVersion": 1
}
```

</div>
</details>

<details>
<summary>getImportsInGroup</summary>

<div>

Returns a list of imports from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Imports|error`

**Sample code:**

```ballerina
bi:Imports result = check biClient->getImportsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reports": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ],
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createImportInGroup</summary>

<div>

Creates new content in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>ImportInfo</code> | Yes | The import to post. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `overrideModelLabel` | <code>boolean</code> | No | Determines whether to override the existing label on a model when republishing a Power BI .pbix file. The service default value is `true`. |
| `nameConflict` | <code>"Ignore"&#124;"Abort"&#124;"Overwrite"&#124;"CreateOrOverwrite"&#124;"GenerateUniqueName"</code> | No | Specifies what to do if a dataset with the same name already exists. The default value is `Ignore`. For RDL files, `Abort` and `Overwrite` are the only supported options and not others.. For dataflow model.json files, `Abort` and `GenerateUniqueName` are the only supported options. |
| `subfolderObjectId` | <code>string</code> | No | The subfolder ID to import the file to subfolder. |
| `overrideReportLabel` | <code>boolean</code> | No | Whether to override the existing label on a report when republishing a Power BI .pbix file. The service default value is `true`. |
| `datasetDisplayName` | <code>string</code> | Yes | The display name of the dataset should include file extension. Not supported when importing from OneDrive for Business. For importing or creating dataflows, this parameter should be hardcoded to model.json. |
| `skipReport` | <code>boolean</code> | No | Whether to skip report import. If specified, the value must be `true`. Only supported for Power BI .pbix files. |

**Returns:** `Import|error`

**Sample code:**

```ballerina
bi:Import result = check biClient->createImportInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    filePath: "string",
    fileUrl: "https://example.com/resource",
    connectionType: "import"
}, datasetDisplayName = "Sample name");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "name": "Sample name",
  "importState": "Publishing",
  "createdDateTime": "2026-01-15T00:00:00",
  "datasets": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getImportByIdInGroup</summary>

<div>

Returns the specified import from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `importId` | <code>string</code> | Yes | The import ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Import|error`

**Sample code:**

```ballerina
bi:Import result = check biClient->getImportByIdInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "name": "Sample name",
  "importState": "Publishing",
  "createdDateTime": "2026-01-15T00:00:00",
  "datasets": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTemporaryUploadLocationInGroup</summary>

<div>

Creates a temporary blob storage upload location for importing large Power BI .pbix files that are between 1 GB and 10 GB in size in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TemporaryUploadLocation|error`

**Sample code:**

```ballerina
bi:TemporaryUploadLocation result = check biClient->createTemporaryUploadLocationInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "expirationTime": "string",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>getReportsInGroup</summary>

<div>

Returns a list of reports from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Reports|error`

**Sample code:**

```ballerina
bi:Reports result = check biClient->getReportsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportByIdInGroup</summary>

<div>

Returns the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->getReportByIdInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>deleteReportInGroup</summary>

<div>

Deletes the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteReportInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>cloneReportInGroup</summary>

<div>

Clones the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>CloneReportRequest</code> | Yes | Clone report parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->cloneReportInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    targetModelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>exportReportInGroup</summary>

<div>

Exports the specified report from the specified workspace to a Power BI .pbix or .rdl file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `downloadType` | <code>"IncludeModel"&#124;"LiveConnect"</code> | No | The type of download. Valid values are LiveConnect and IncludeModel. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check biClient->exportReportInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>updateReportContentInGroup</summary>

<div>

Updates the content of the specified report from the specified workspace with the content of a specified source report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>UpdateReportContentRequest</code> | Yes | UpdateReportContent parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->updateReportContentInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sourceReport: {
        sourceReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        sourceWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    sourceType: "ExistingReport"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>rebindReportInGroup</summary>

<div>

Rebinds the specified report from the specified workspace to the specified dataset.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>RebindReportRequest</code> | Yes | Rebind report parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->rebindReportInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    datasetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>getPagesInGroup</summary>

<div>

Returns a list of pages within the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pages|error`

**Sample code:**

```ballerina
bi:Pages result = check biClient->getPagesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "displayName": "Sample name",
      "name": "Sample name",
      "order": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPageByNameInGroup</summary>

<div>

Returns the specified page within the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `pageName` | <code>string</code> | Yes | The page name. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Page|error`

**Sample code:**

```ballerina
bi:Page result = check biClient->getPageByNameInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name");
```

**Sample response:**

```json
{
  "displayName": "Sample name",
  "name": "Sample name",
  "order": 1
}
```

</div>
</details>

<details>
<summary>getReportDatasourcesInGroup</summary>

<div>

Returns a list of data sources for the specified paginated report (RDL) from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getReportDatasourcesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateReportDatasourcesInGroup</summary>

<div>

Updates the data sources of the specified paginated report (RDL) from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>UpdateRdlDatasourcesRequest</code> | Yes | The data source connection updates to apply to the paginated report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateReportDatasourcesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    updateDetails: [{
        connectionDetails: {},
        datasourceName: "Sample name"
    }]
});
```

</div>
</details>

<details>
<summary>exportToFileInGroup</summary>

<div>

Exports the specified report from the specified workspace to the requested [file format](/rest/api/power-bi/reports/export-to-file-in-group#fileformat).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>ExportReportRequest</code> | Yes | Export to file request parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Export|error`

**Sample code:**

```ballerina
bi:Export result = check biClient->exportToFileInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    format: "PPTX",
    paginatedReportConfiguration: {
        locale: "string"
    },
    powerBIReportConfiguration: {
        pages: [{
            pageName: "Sample name"
        }],
        datasetToBind: "string"
    }
});
```

**Sample response:**

```json
{
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportName": "Sample name",
  "expirationTime": "string",
  "createdDateTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "percentComplete": 1
}
```

</div>
</details>

<details>
<summary>getExportToFileStatusInGroup</summary>

<div>

Returns the current status of the [Export to File In Group](/rest/api/power-bi/reports/export-to-file-in-group) job for the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `exportId` | <code>string</code> | Yes | The export ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Export|error`

**Sample code:**

```ballerina
bi:Export result = check biClient->getExportToFileStatusInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportName": "Sample name",
  "expirationTime": "string",
  "createdDateTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "percentComplete": 1
}
```

</div>
</details>

<details>
<summary>getFileOfExportToFileInGroup</summary>

<div>

Returns the file from the [Export to File In Group](/rest/api/power-bi/reports/export-to-file-in-group) job for the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `exportId` | <code>string</code> | Yes | The export ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check biClient->getFileOfExportToFileInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getDashboardsInGroup</summary>

<div>

Returns a list of dashboards from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboards|error`

**Sample code:**

```ballerina
bi:Dashboards result = check biClient->getDashboardsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isReadOnly": false,
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addDashboardInGroup</summary>

<div>

Creates a new empty dashboard in the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>AddDashboardRequest</code> | Yes | Add dashboard parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboard|error`

**Sample code:**

```ballerina
bi:Dashboard result = check biClient->addDashboardInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isReadOnly": false,
  "displayName": "Sample name",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "embedUrl": "https://example.com/resource",
  "webUrl": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>getDashboardByIdInGroup</summary>

<div>

Returns the specified dashboard from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboard|error`

**Sample code:**

```ballerina
bi:Dashboard result = check biClient->getDashboardByIdInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isReadOnly": false,
  "displayName": "Sample name",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "embedUrl": "https://example.com/resource",
  "webUrl": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>deleteDashboardInGroup</summary>

<div>

Deletes the specified dashboard from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDashboardInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getTilesInGroup</summary>

<div>

Returns a list of tiles within the specified dashboard from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tiles|error`

**Sample code:**

```ballerina
bi:Tiles result = check biClient->getTilesInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTileByIdInGroup</summary>

<div>

Returns the specified tile within the specified dashboard from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `tileId` | <code>string</code> | Yes | The tile ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tile|error`

**Sample code:**

```ballerina
bi:Tile result = check biClient->getTileByIdInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "rowSpan": 1,
  "colSpan": 1
}
```

</div>
</details>

<details>
<summary>cloneTileInGroup</summary>

<div>

Clones the specified tile from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `tileId` | <code>string</code> | Yes | The tile ID. |
| `payload` | <code>CloneTileRequest</code> | Yes | Clone tile parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tile|error`

**Sample code:**

```ballerina
bi:Tile result = check biClient->cloneTileInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    targetDashboardId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetModelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "rowSpan": 1,
  "colSpan": 1
}
```

</div>
</details>

<details>
<summary>generateTokenForCreateInGroup</summary>

<div>

Generates an embed token to allow report creation in the specified workspace based on the specified dataset.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>GenerateTokenRequest</code> | Yes | Generate token parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmbedToken|error`

**Sample code:**

```ballerina
bi:EmbedToken result = check biClient->generateTokenForCreateInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    allowSaveAs: false,
    identities: [{
        reports: ["string"],
        roles: ["string"],
        customData: "string"
    }],
    accessLevel: "View",
    lifetimeInMinutes: 1
});
```

**Sample response:**

```json
{
  "tokenId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string",
  "token": "string"
}
```

</div>
</details>

<details>
<summary>generateReportTokenInGroup</summary>

<div>

Generates an embed token to view or edit the specified report from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>GenerateTokenRequest</code> | Yes | Generate token parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmbedToken|error`

**Sample code:**

```ballerina
bi:EmbedToken result = check biClient->generateReportTokenInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    allowSaveAs: false,
    identities: [{
        reports: ["string"],
        roles: ["string"],
        customData: "string"
    }],
    accessLevel: "View",
    lifetimeInMinutes: 1
});
```

**Sample response:**

```json
{
  "tokenId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string",
  "token": "string"
}
```

</div>
</details>

<details>
<summary>generateTokenInGroup</summary>

<div>

Generates an embed token based on the specified dataset from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `payload` | <code>GenerateTokenRequest</code> | Yes | Generate token parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmbedToken|error`

**Sample code:**

```ballerina
bi:EmbedToken result = check biClient->generateTokenInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    allowSaveAs: false,
    identities: [{
        reports: ["string"],
        roles: ["string"],
        customData: "string"
    }],
    accessLevel: "View",
    lifetimeInMinutes: 1
});
```

**Sample response:**

```json
{
  "tokenId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string",
  "token": "string"
}
```

</div>
</details>

<details>
<summary>generateDashboardTokenInGroup</summary>

<div>

Generates an embed token to view the specified dashboard from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `payload` | <code>GenerateTokenRequest</code> | Yes | Generate token parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmbedToken|error`

**Sample code:**

```ballerina
bi:EmbedToken result = check biClient->generateDashboardTokenInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    allowSaveAs: false,
    identities: [{
        reports: ["string"],
        roles: ["string"],
        customData: "string"
    }],
    accessLevel: "View",
    lifetimeInMinutes: 1
});
```

**Sample response:**

```json
{
  "tokenId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string",
  "token": "string"
}
```

</div>
</details>

<details>
<summary>generateTileTokenInGroup</summary>

<div>

Generates an embed token to view the specified tile from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `tileId` | <code>string</code> | Yes | The tile ID. |
| `payload` | <code>GenerateTokenRequest</code> | Yes | Generate token parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmbedToken|error`

**Sample code:**

```ballerina
bi:EmbedToken result = check biClient->generateTileTokenInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    allowSaveAs: false,
    identities: [{
        reports: ["string"],
        roles: ["string"],
        customData: "string"
    }],
    accessLevel: "View",
    lifetimeInMinutes: 1
});
```

**Sample response:**

```json
{
  "tokenId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string",
  "token": "string"
}
```

</div>
</details>

<details>
<summary>bindReportToGatewayInGroup</summary>

<div>

Binds the specified data source of the paginated report from the specified workspace to the specified gateway, optionally with a given data source ID. If you don't supply a specific data source ID, the data source will be bound to the first matching data source in the gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>RdlBindToGatewayRequest</code> | Yes | The bind to gateway request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->bindReportToGatewayInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    gatewayObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    bindDetails: [{
        dataSourceName: "Sample name",
        dataSourceObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

</div>
</details>

<details>
<summary>saveDataflowGenOneAsDataflowGenTwo</summary>

<div>

Save Dataflow Gen1 As Dataflow Gen2 (CI/CD) (Preview).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace (group) ID of the gen1 dataflow. |
| `gen1DataflowId` | <code>string</code> | Yes | The object ID of the Gen1 dataflow to save as a native artifact. |
| `payload` | <code>SaveAsNativeDataflowRequest</code> | Yes | Patch dataflow properties, capabilities and settings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SaveAsNativeDataflowResponse|error`

**Sample code:**

```ballerina
bi:SaveAsNativeDataflowResponse result = check biClient->saveDataflowGenOneAsDataflowGenTwo("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    includeSchedule: false,
    displayName: "Sample name",
    targetWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "artifactMetadata": {
    "folderObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "artifactType": "string",
    "displayName": "Sample name",
    "provisionState": "InProgress",
    "lastUpdatedDate": "2026-01-15T00:00:00",
    "createdDate": "2026-01-15T00:00:00",
    "objectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "errors": [
    "FailedToCopySchedule"
  ]
}
```

</div>
</details>

<details>
<summary>getDataflowById</summary>

<div>

Exports the specified dataflow definition to a JSON file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check biClient->getDataflowById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>deleteDataflow</summary>

<div>

Deletes a dataflow from Power BI data prep storage, including its definition file and model.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDataflow("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDataflow</summary>

<div>

Updates dataflow properties, capabilities and settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `payload` | <code>DataflowUpdateRequestMessage</code> | Yes | Patch dataflow properties, capabilities and settings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDataflow("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    computeEngineBehavior: "computeOptimized",
    name: "Sample name",
    description: "Sample description",
    allowNativeQueries: false
});
```

</div>
</details>

<details>
<summary>refreshDataflow</summary>

<div>

Triggers a refresh for the specified dataflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `payload` | <code>RefreshRequest</code> | Yes | The dataflow refresh notification option. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `processType` | <code>"default"&#124;"processFull"</code> | No | Type of refresh process to use. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->refreshDataflow("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    notifyOption: "NoNotification"
});
```

</div>
</details>

<details>
<summary>getDataflowDatasources</summary>

<div>

Returns a list of data sources for the specified dataflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getDataflowDatasources("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDataflows</summary>

<div>

Returns a list of all dataflows from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dataflows|error`

**Sample code:**

```ballerina
bi:Dataflows result = check biClient->getDataflows("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "objectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getUpstreamDataflowsInGroup</summary>

<div>

Returns a list of upstream dataflows for the specified dataflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DependentDataflows|error`

**Sample code:**

```ballerina
bi:DependentDataflows result = check biClient->getUpstreamDataflowsInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "targetDataflowId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateDataflowRefreshSchedule</summary>

<div>

Creates or updates the refresh schedule for a specified dataflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `payload` | <code>RefreshScheduleRequest</code> | Yes | The dataflow refresh schedule to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDataflowRefreshSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    value: {
        times: ["string"],
        days: ["Monday"],
        localTimeZoneId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

</div>
</details>

<details>
<summary>getDataflowTransactions</summary>

<div>

Returns a list of transactions for the specified dataflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DataflowTransactions|error`

**Sample code:**

```ballerina
bi:DataflowTransactions result = check biClient->getDataflowTransactions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "refreshType": "string",
      "startTime": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>cancelDataflowTransaction</summary>

<div>

Attempts to cancel the specified transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `transactionId` | <code>string</code> | Yes | The transaction ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DataflowTransactionStatus|error`

**Sample code:**

```ballerina
bi:DataflowTransactionStatus result = check biClient->cancelDataflowTransaction("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "transactionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "invalid"
}
```

</div>
</details>

<details>
<summary>getGroups</summary>

<div>

Returns a list of workspaces the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `Groups|error`

**Sample code:**

```ballerina
bi:Groups result = check biClient->getGroups();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "isReadOnly": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroup</summary>

<div>

Creates a new workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>GroupCreationRequest</code> | Yes | Create group request parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `workspaceV2` | <code>boolean</code> | No | (Preview feature) Whether to create a workspace. The only supported value is `true`. |

**Returns:** `Group|error`

**Sample code:**

```ballerina
bi:Group result = check biClient->createGroup({
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "isReadOnly": false,
  "logAnalyticsWorkspace": {
    "resourceGroup": "string",
    "resourceName": "Sample name",
    "subscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "capacityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dataflowStorageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getGroupById</summary>

<div>

Returns a specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Group|error`

**Sample code:**

```ballerina
bi:Group result = check biClient->getGroupById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "isReadOnly": false,
  "logAnalyticsWorkspace": {
    "resourceGroup": "string",
    "resourceName": "Sample name",
    "subscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "capacityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dataflowStorageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteGroup</summary>

<div>

Deletes the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGroup</summary>

<div>

Updates a specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>UpdateGroupRequest</code> | Yes | The properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    defaultDatasetStorageFormat: "Small"
});
```

</div>
</details>

<details>
<summary>getGroupUsers</summary>

<div>

Returns a list of users that have access to the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |

**Returns:** `GroupUsers|error`

**Sample code:**

```ballerina
bi:GroupUsers result = check biClient->getGroupUsers("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "groupUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateGroupUser</summary>

<div>

Updates the specified user permissions to the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>GroupUser</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateGroupUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    groupUserAccessRight: "None",
    emailAddress: "user@example.com"
});
```

</div>
</details>

<details>
<summary>addGroupUser</summary>

<div>

Grants the specified user the specified permissions to the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>GroupUser</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addGroupUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    groupUserAccessRight: "None",
    emailAddress: "user@example.com"
});
```

</div>
</details>

<details>
<summary>deleteGroupUser</summary>

<div>

Deletes the specified user permissions from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `user` | <code>string</code> | Yes | The email address of the user or object ID of the service principal to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `profileId` | <code>string</code> | No | The service principal profile ID to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGroupUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>assignToCapacity</summary>

<div>

Assigns the specified workspace to the specified capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>AssignToCapacityRequest</code> | Yes | Assign to capacity parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->assignToCapacity("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    capacityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>getCapacityAssignmentStatus</summary>

<div>

Gets the status of the assignment-to-capacity operation for the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WorkspaceCapacityAssignmentStatus|error`

**Sample code:**

```ballerina
bi:WorkspaceCapacityAssignmentStatus result = check biClient->getCapacityAssignmentStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "status": "Pending",
  "activityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "capacityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "startTime": "string",
  "endTime": "string"
}
```

</div>
</details>

<details>
<summary>assignToDataflowStorage</summary>

<div>

Assigns the specified workspace to the specified dataflow storage account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>AssignToDataflowStorageRequest</code> | Yes | Assign to Power BI dataflow storage account parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->assignToDataflowStorage("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    dataflowStorageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>takeOverReportInGroup</summary>

<div>

Transfers ownership of the data sources for the specified paginated report (RDL) to the current authorized user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->takeOverReportInGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getScorecards</summary>

<div>

Returns a list of scorecards from a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |

**Returns:** `Scorecards|error`

**Sample code:**

```ballerina
bi:Scorecards result = check biClient->getScorecards("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "@odata.context": "string",
  "value": [
    {
      "lastModifiedTime": "string",
      "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "provisioningStatus": "Initialized"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createScorecard</summary>

<div>

Creates a new scorecard.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `payload` | <code>ScorecardCreateRequest</code> | Yes | The new scorecard properties. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Scorecard|error`

**Sample code:**

```ballerina
bi:Scorecard result = check biClient->createScorecard("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    description: "Sample description",
    sensitivityLabelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "provisioningStatus": "Initialized",
  "permissions": "None",
  "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getScorecardById</summary>

<div>

Returns a scorecard with ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `goals`, `goalValues`, `aggregations`, and `notes`. |

**Returns:** `Scorecard|error`

**Sample code:**

```ballerina
bi:Scorecard result = check biClient->getScorecardById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "provisioningStatus": "Initialized",
  "permissions": "None",
  "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteScorecard</summary>

<div>

Deletes a scorecard by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteScorecard("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateScorecard</summary>

<div>

Updates a scorecard by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `payload` | <code>Scorecard</code> | Yes | The scorecard properties to patch. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Scorecard|error`

**Sample code:**

```ballerina
bi:Scorecard result = check biClient->updateScorecard("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lastModifiedTime: "string",
    reportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    provisioningStatus: "Initialized",
    permissions: "None"
});
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "provisioningStatus": "Initialized",
  "permissions": "None",
  "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getGoals</summary>

<div>

Returns a list of goals from a scorecard.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `goalValues` and `aggregations`. |
| `'select` | <code>string</code> | No | Allows the clients to select specific properties from the server. |

**Returns:** `Goals|error`

**Sample code:**

```ballerina
bi:Goals result = check biClient->getGoals("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "lastModifiedTime": "string",
      "level": 1,
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGoal</summary>

<div>

Adds a new goal to a scorecard.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `payload` | <code>GoalCreateRequest</code> | Yes | The properties of the new goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Goal|error`

**Sample code:**

```ballerina
bi:Goal result = check biClient->createGoal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    valuesFormatString: "string",
    datesFormatString: "2026-01-15T00:00:00",
    completionDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "goalValues": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "trend": 1
    }
  ],
  "level": 1,
  "description": "Sample description",
  "hasStatusRules": false,
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getGoalById</summary>

<div>

Returns a goal by ID from a scorecard.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Description. |

**Returns:** `Goal|error`

**Sample code:**

```ballerina
bi:Goal result = check biClient->getGoalById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "goalValues": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "trend": 1
    }
  ],
  "level": 1,
  "description": "Sample description",
  "hasStatusRules": false,
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteGoal</summary>

<div>

Deletes a goal from a scorecard by goal ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGoal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGoal</summary>

<div>

Updates a goal by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `payload` | <code>Goal</code> | Yes | The goal properties to patch. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Goal|error`

**Sample code:**

```ballerina
bi:Goal result = check biClient->updateGoal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    lastModifiedTime: "string",
    goalValues: [{
        goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: "string",
        trend: 1
    }],
    level: 1,
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "goalValues": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "trend": 1
    }
  ],
  "level": 1,
  "description": "Sample description",
  "hasStatusRules": false,
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getGoalStatusRules</summary>

<div>

Returns status rules of a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalsRulesGoalStatusRules|error`

**Sample code:**

```ballerina
bi:GoalsRulesGoalStatusRules result = check biClient->getGoalStatusRules("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "defaultOutput": 1,
  "scorecardObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "goalObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "rules": [
    {
      "output": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGoalStatusRules</summary>

<div>

Creates or updates status rules of a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `payload` | <code>GoalsRulesGoalStatusRulesUpdateRequest</code> | Yes | The status rules definition. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalsRulesGoalStatusRules|error`

**Sample code:**

```ballerina
bi:GoalsRulesGoalStatusRules result = check biClient->createGoalStatusRules("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    defaultOutput: 1,
    rules: [{
        output: 1
    }]
});
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "defaultOutput": 1,
  "scorecardObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "goalObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "rules": [
    {
      "output": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteGoalStatusRules</summary>

<div>

Removes status rule definitions from a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGoalStatusRules("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getGoalValues</summary>

<div>

Reads goal value check-ins.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `notes`. |

**Returns:** `GoalValues|error`

**Sample code:**

```ballerina
bi:GoalValues result = check biClient->getGoalValues("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "trend": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGoalValue</summary>

<div>

Creates a new goal value check-in.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `payload` | <code>GoalValueCreateRequest</code> | Yes | Goal value content. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalValue|error`

**Sample code:**

```ballerina
bi:GoalValue result = check biClient->createGoalValue("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    timestamp: "string",
    trend: 1,
    forecast: 100.00,
    value: 100.00
});
```

**Sample response:**

```json
{
  "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedTime": "string",
  "notes": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "valueTimestamp": "string"
    }
  ],
  "trend": 1,
  "targetDisplayString": "string",
  "forecast": 100.00
}
```

</div>
</details>

<details>
<summary>getGoalValueByTimestamp</summary>

<div>

Reads a goal value check-in by a UTC date timestamp.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `timestamp` | <code>string</code> | Yes | The timestamp for the value of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `notes`. |

**Returns:** `GoalValue|error`

**Sample code:**

```ballerina
bi:GoalValue result = check biClient->getGoalValueByTimestamp("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedTime": "string",
  "notes": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "valueTimestamp": "string"
    }
  ],
  "trend": 1,
  "targetDisplayString": "string",
  "forecast": 100.00
}
```

</div>
</details>

<details>
<summary>deleteGoalValue</summary>

<div>

Deletes a goal value check-in by a UTC day timestamp.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `timestamp` | <code>string</code> | Yes | The timestamp for the value of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGoalValue("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>updateGoalValue</summary>

<div>

Updates a goal value check-in by a UTC date timestamp.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `timestamp` | <code>string</code> | Yes | The timestamp for the value of the goal. |
| `payload` | <code>GoalValue</code> | Yes | The updated content of goal value check-in. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalValue|error`

**Sample code:**

```ballerina
bi:GoalValue result = check biClient->updateGoalValue("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    lastModifiedTime: "string",
    notes: [{
        goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModifiedTime: "string",
        valueTimestamp: "string"
    }],
    trend: 1
});
```

**Sample response:**

```json
{
  "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedTime": "string",
  "notes": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "valueTimestamp": "string"
    }
  ],
  "trend": 1,
  "targetDisplayString": "string",
  "forecast": 100.00
}
```

</div>
</details>

<details>
<summary>createGoalNote</summary>

<div>

Adds a new note to a goal value check-in.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `timestamp` | <code>string</code> | Yes | The timestamp for the value of the goal. |
| `payload` | <code>GoalNoteRequest</code> | Yes | The goal check-in note. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalNote|error`

**Sample code:**

```ballerina
bi:GoalNote result = check biClient->createGoalNote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    body: "string"
});
```

**Sample response:**

```json
{
  "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedTime": "string",
  "valueTimestamp": "string",
  "createdTime": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scorecardId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteGoalNote</summary>

<div>

Deletes a goal value check-in note by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `timestamp` | <code>string</code> | Yes | The timestamp for the value of the goal. |
| `noteId` | <code>string</code> | Yes | The unique identifier of the goal check-in note. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGoalNote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGoalNote</summary>

<div>

Updates a goal value check-in note by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `timestamp` | <code>string</code> | Yes | The timestamp for the value of the goal. |
| `noteId` | <code>string</code> | Yes | The unique identifier of the goal check-in note. |
| `payload` | <code>GoalNoteRequest</code> | Yes | The note content to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalNote|error`

**Sample code:**

```ballerina
bi:GoalNote result = check biClient->updateGoalNote("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    body: "string"
});
```

**Sample response:**

```json
{
  "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedTime": "string",
  "valueTimestamp": "string",
  "createdTime": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "scorecardId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getScorecardByReportId</summary>

<div>

Reads a scorecard associated with an internal report ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `reportId` | <code>string</code> | Yes | The ID of the internal report associated with the scorecard. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `goals`, `goalValues`, and `aggregations`. |

**Returns:** `Scorecard|error`

**Sample code:**

```ballerina
bi:Scorecard result = check biClient->getScorecardByReportId("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "provisioningStatus": "Initialized",
  "permissions": "None",
  "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>moveGoals</summary>

<div>

Moves goals within the scorecard. Changes their ranks and parents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `payload` | <code>GoalsMoveRequest</code> | Yes | The request describing the move operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->moveGoals("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    goalToMove: {
        goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currentParentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    newParent: {
        goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currentParentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    newPrevious: {
        goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currentParentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    newNext: {
        goalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        currentParentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

</div>
</details>

<details>
<summary>getGoalRefreshHistory</summary>

<div>

Reads refresh history of a connected goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GoalRefreshHistories|error`

**Sample code:**

```ballerina
bi:GoalRefreshHistories result = check biClient->getGoalRefreshHistory("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "rootActivityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "message": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteGoalCurrentValueConnection</summary>

<div>

Disconnects the current value of a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Goal|error`

**Sample code:**

```ballerina
bi:Goal result = check biClient->deleteGoalCurrentValueConnection("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "goalValues": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "trend": 1
    }
  ],
  "level": 1,
  "description": "Sample description",
  "hasStatusRules": false,
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteGoalTargetValueConnection</summary>

<div>

Disconnects the target value of a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Goal|error`

**Sample code:**

```ballerina
bi:Goal result = check biClient->deleteGoalTargetValueConnection("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastModifiedTime": "string",
  "goalValues": [
    {
      "goalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedTime": "string",
      "trend": 1
    }
  ],
  "level": 1,
  "description": "Sample description",
  "hasStatusRules": false,
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>refreshGoalCurrentValue</summary>

<div>

Schedules a refresh of the connected value of a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->refreshGoalCurrentValue("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>refreshGoalTargetValue</summary>

<div>

Schedules a refresh of the target value of a goal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The unique identifier of the workspace. |
| `scorecardId` | <code>string</code> | Yes | The unique identifier of the scorecard. |
| `goalId` | <code>string</code> | Yes | The unique identifier of the goal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->refreshGoalTargetValue("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Refresh User Permissions

<details>
<summary>refreshUserPermissions</summary>

<div>

Refreshes user permissions in Power BI.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->refreshUserPermissions();
```

</div>
</details>

#### Imports

<details>
<summary>getImports</summary>

<div>

Returns a list of imports from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Imports|error`

**Sample code:**

```ballerina
bi:Imports result = check biClient->getImports();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reports": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ],
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createImport</summary>

<div>

Creates new content in **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ImportInfo</code> | Yes | The import to post. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `overrideModelLabel` | <code>boolean</code> | No | Whether to override the existing label on a model when republishing a Power BI .pbix file. The service default value is `true`. |
| `nameConflict` | <code>"Ignore"&#124;"Abort"&#124;"Overwrite"&#124;"CreateOrOverwrite"&#124;"GenerateUniqueName"</code> | No | Specifies what to do if a dataset with the same name already exists. The default value is `Ignore`. For RDL files, `Abort` and `Overwrite` are the only supported options and not others. |
| `subfolderObjectId` | <code>string</code> | No | The subfolder ID to import the file to subfolder. |
| `overrideReportLabel` | <code>boolean</code> | No | Whether to override the existing report label when republishing a Power BI .pbix file. The service default value is `true`. |
| `datasetDisplayName` | <code>string</code> | Yes | The display name of the dataset, should include file extension. Not supported when importing from OneDrive for Business. |
| `skipReport` | <code>boolean</code> | No | Whether to skip report import. If specified, the value must be `true`. Only supported for Power BI .pbix files. |

**Returns:** `Import|error`

**Sample code:**

```ballerina
bi:Import result = check biClient->createImport({
    filePath: "string",
    fileUrl: "https://example.com/resource",
    connectionType: "import"
}, datasetDisplayName = "Sample name");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "name": "Sample name",
  "importState": "Publishing",
  "createdDateTime": "2026-01-15T00:00:00",
  "datasets": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getImportById</summary>

<div>

Returns the specified import from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `importId` | <code>string</code> | Yes | The import ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Import|error`

**Sample code:**

```ballerina
bi:Import result = check biClient->getImportById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "name": "Sample name",
  "importState": "Publishing",
  "createdDateTime": "2026-01-15T00:00:00",
  "datasets": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTemporaryUploadLocation</summary>

<div>

Creates a temporary blob storage upload location for importing large Power BI .pbix files that are between 1 GB and 10 GB in size in My workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TemporaryUploadLocation|error`

**Sample code:**

```ballerina
bi:TemporaryUploadLocation result = check biClient->createTemporaryUploadLocation();
```

**Sample response:**

```json
{
  "expirationTime": "string",
  "url": "https://example.com/resource"
}
```

</div>
</details>

#### Reports

<details>
<summary>getReports</summary>

<div>

Returns a list of reports from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Reports|error`

**Sample code:**

```ballerina
bi:Reports result = check biClient->getReports();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportById</summary>

<div>

Returns the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->getReportById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>deleteReport</summary>

<div>

Deletes the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>cloneReport</summary>

<div>

Clones the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>CloneReportRequest</code> | Yes | Clone report parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->cloneReport("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    targetModelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>exportReport</summary>

<div>

Exports the specified report from **My workspace** to a Power BI .pbix or .rdl file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check biClient->exportReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>updateReportContent</summary>

<div>

Updates the content of the specified report from **My workspace** with the content of a specified source report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>UpdateReportContentRequest</code> | Yes | UpdateReportContent parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->updateReportContent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sourceReport: {
        sourceReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        sourceWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    sourceType: "ExistingReport"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>rebindReport</summary>

<div>

Rebinds the specified report from **My workspace** to the specified dataset.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>RebindReportRequest</code> | Yes | Rebind report parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->rebindReport("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    datasetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>getPages</summary>

<div>

Returns a list of pages within the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pages|error`

**Sample code:**

```ballerina
bi:Pages result = check biClient->getPages("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "displayName": "Sample name",
      "name": "Sample name",
      "order": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPageByName</summary>

<div>

Returns the specified page within the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `pageName` | <code>string</code> | Yes | The page name. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Page|error`

**Sample code:**

```ballerina
bi:Page result = check biClient->getPageByName("3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name");
```

**Sample response:**

```json
{
  "displayName": "Sample name",
  "name": "Sample name",
  "order": 1
}
```

</div>
</details>

<details>
<summary>getReportDatasources</summary>

<div>

Returns a list of data sources for the specified paginated report (RDL) from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getReportDatasources("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateReportDatasources</summary>

<div>

Updates the data sources of the specified paginated report (RDL) from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>UpdateRdlDatasourcesRequest</code> | Yes | The data source connection updates to apply to the paginated report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateReportDatasources("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    updateDetails: [{
        connectionDetails: {},
        datasourceName: "Sample name"
    }]
});
```

</div>
</details>

<details>
<summary>exportToFile</summary>

<div>

Exports the specified report from **My workspace** to the requested [file format](/rest/api/power-bi/reports/export-to-file#fileformat).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>ExportReportRequest</code> | Yes | Export to file request parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Export|error`

**Sample code:**

```ballerina
bi:Export result = check biClient->exportToFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    format: "PPTX",
    paginatedReportConfiguration: {
        locale: "string"
    },
    powerBIReportConfiguration: {
        pages: [{
            pageName: "Sample name"
        }],
        datasetToBind: "string"
    }
});
```

**Sample response:**

```json
{
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportName": "Sample name",
  "expirationTime": "string",
  "createdDateTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "percentComplete": 1
}
```

</div>
</details>

<details>
<summary>getExportToFileStatus</summary>

<div>

Returns the current status of the [Export to File](/rest/api/power-bi/reports/export-to-file) job for the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `exportId` | <code>string</code> | Yes | The export ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Export|error`

**Sample code:**

```ballerina
bi:Export result = check biClient->getExportToFileStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportName": "Sample name",
  "expirationTime": "string",
  "createdDateTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "percentComplete": 1
}
```

</div>
</details>

<details>
<summary>getFileOfExportToFile</summary>

<div>

Returns the file from the [Export to File](/rest/api/power-bi/reports/export-to-file) job for the specified report from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `exportId` | <code>string</code> | Yes | The export ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check biClient->getFileOfExportToFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>bindReportToGateway</summary>

<div>

Binds the specified data source of the paginated report from **My workspace** to the specified gateway, optionally with a given data source ID. If you don't supply a specific data source ID, the data source will be bound to the first matching data source in the gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `payload` | <code>RdlBindToGatewayRequest</code> | Yes | The bind to gateway request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->bindReportToGateway("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    gatewayObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    bindDetails: [{
        dataSourceName: "Sample name",
        dataSourceObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

</div>
</details>

#### Dashboards

<details>
<summary>getDashboards</summary>

<div>

Returns a list of dashboards from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboards|error`

**Sample code:**

```ballerina
bi:Dashboards result = check biClient->getDashboards();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isReadOnly": false,
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addDashboard</summary>

<div>

Creates a new empty dashboard in **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddDashboardRequest</code> | Yes | Add dashboard parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboard|error`

**Sample code:**

```ballerina
bi:Dashboard result = check biClient->addDashboard({
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isReadOnly": false,
  "displayName": "Sample name",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "embedUrl": "https://example.com/resource",
  "webUrl": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>getDashboardById</summary>

<div>

Returns the specified dashboard from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboard|error`

**Sample code:**

```ballerina
bi:Dashboard result = check biClient->getDashboardById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isReadOnly": false,
  "displayName": "Sample name",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "embedUrl": "https://example.com/resource",
  "webUrl": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>deleteDashboard</summary>

<div>

Deletes the specified dashboard from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDashboard("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getTiles</summary>

<div>

Returns a list of tiles within the specified dashboard from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tiles|error`

**Sample code:**

```ballerina
bi:Tiles result = check biClient->getTiles("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTileById</summary>

<div>

Returns the specified tile within the specified dashboard from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `tileId` | <code>string</code> | Yes | The tile ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tile|error`

**Sample code:**

```ballerina
bi:Tile result = check biClient->getTileById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "rowSpan": 1,
  "colSpan": 1
}
```

</div>
</details>

<details>
<summary>cloneTile</summary>

<div>

Clones the specified tile from **My workspace**.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `tileId` | <code>string</code> | Yes | The tile ID. |
| `payload` | <code>CloneTileRequest</code> | Yes | Clone tile parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tile|error`

**Sample code:**

```ballerina
bi:Tile result = check biClient->cloneTile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    targetDashboardId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetReportId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetModelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    targetWorkspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "rowSpan": 1,
  "colSpan": 1
}
```

</div>
</details>

#### Apps

<details>
<summary>getApps</summary>

<div>

Returns a list of installed apps.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Apps|error`

**Sample code:**

```ballerina
bi:Apps result = check biClient->getApps();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "publishedBy": "string",
      "lastUpdate": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAppById</summary>

<div>

Returns the specified installed app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `App|error`

**Sample code:**

```ballerina
bi:App result = check biClient->getAppById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "publishedBy": "string",
  "lastUpdate": "2026-01-15T00:00:00",
  "name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getAppReports</summary>

<div>

Returns a list of reports from the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Reports|error`

**Sample code:**

```ballerina
bi:Reports result = check biClient->getAppReports("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAppReportById</summary>

<div>

Returns the specified report from the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bi:Report result = check biClient->getAppReportById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportType": "PaginatedReport",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isOwnedByMe": false,
  "name": "Sample name",
  "format": "string"
}
```

</div>
</details>

<details>
<summary>getAppDashboards</summary>

<div>

Returns a list of dashboards from the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboards|error`

**Sample code:**

```ballerina
bi:Dashboards result = check biClient->getAppDashboards("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isReadOnly": false,
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAppDashboardById</summary>

<div>

Returns the specified dashboard from the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dashboard|error`

**Sample code:**

```ballerina
bi:Dashboard result = check biClient->getAppDashboardById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "isReadOnly": false,
  "displayName": "Sample name",
  "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "embedUrl": "https://example.com/resource",
  "webUrl": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>getAppTiles</summary>

<div>

Returns a list of tiles within the specified dashboard from the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tiles|error`

**Sample code:**

```ballerina
bi:Tiles result = check biClient->getAppTiles("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAppTileById</summary>

<div>

Returns the specified tile within the specified dashboard from the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `tileId` | <code>string</code> | Yes | The tile ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tile|error`

**Sample code:**

```ballerina
bi:Tile result = check biClient->getAppTileById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "rowSpan": 1,
  "colSpan": 1
}
```

</div>
</details>

#### Gateways

<details>
<summary>getGateways</summary>

<div>

Returns a list of gateways for which the user is an admin.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Gateways|error`

**Sample code:**

```ballerina
bi:Gateways result = check biClient->getGateways();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "type": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getGatewayById</summary>

<div>

Returns the specified gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Gateway|error`

**Sample code:**

```ballerina
bi:Gateway result = check biClient->getGatewayById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "publicKey": {
    "modulus": "string",
    "exponent": "string"
  },
  "type": "string",
  "gatewayStatus": "string",
  "gatewayAnnotation": "string"
}
```

</div>
</details>

<details>
<summary>getDatasourcesInGateway</summary>

<div>

Returns a list of data sources from the specified gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GatewayDatasources|error`

**Sample code:**

```ballerina
bi:GatewayDatasources result = check biClient->getDatasourcesInGateway("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "credentialType": "Basic",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "gatewayId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDatasource</summary>

<div>

Creates a new data source on the specified on-premises gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `payload` | <code>PublishDatasourceToGatewayRequest</code> | Yes | A request to create a new data source on a gateway. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GatewayDatasource|error`

**Sample code:**

```ballerina
bi:GatewayDatasource result = check biClient->createDatasource("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    credentialDetails: {
        credentialType: "Basic",
        privacyLevel: "None",
        credentials: "string",
        encryptionAlgorithm: "None",
        encryptedConnection: "Encrypted"
    },
    connectionDetails: "string",
    dataSourceType: "string",
    dataSourceName: "Sample name"
});
```

**Sample response:**

```json
{
  "credentialType": "Basic",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "gatewayId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasourceType": "string",
  "credentialDetails": {
    "useEndUserOAuth2Credentials": false
  },
  "datasourceName": "Sample name"
}
```

</div>
</details>

<details>
<summary>getDatasourceInGateway</summary>

<div>

Returns the specified data source from the specified gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GatewayDatasource|error`

**Sample code:**

```ballerina
bi:GatewayDatasource result = check biClient->getDatasourceInGateway("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "credentialType": "Basic",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "gatewayId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "datasourceType": "string",
  "credentialDetails": {
    "useEndUserOAuth2Credentials": false
  },
  "datasourceName": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteDatasource</summary>

<div>

Deletes the specified data source from the specified gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDatasource("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDatasourceInGateway</summary>

<div>

Updates the credentials of the specified data source from the specified gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `payload` | <code>UpdateDatasourceRequest</code> | Yes | The update data source request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateDatasourceInGateway("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    credentialDetails: {
        credentialType: "Basic",
        privacyLevel: "None",
        credentials: "string",
        encryptionAlgorithm: "None",
        encryptedConnection: "Encrypted"
    }
});
```

</div>
</details>

<details>
<summary>getDatasourceStatus</summary>

<div>

Checks the connectivity status of the specified data source from the specified gateway.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->getDatasourceStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getDatasourceUsers</summary>

<div>

Returns a list of users who have access to the specified data source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasourceUsers|error`

**Sample code:**

```ballerina
bi:DatasourceUsers result = check biClient->getDatasourceUsers("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "datasourceAccessRight": "None",
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addDatasourceUser</summary>

<div>

Grants or updates the permissions required to use the specified data source for the specified user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `payload` | <code>DatasourceUser</code> | Yes | The add user to data source request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addDatasourceUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    datasourceAccessRight: "None",
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    emailAddress: "user@example.com",
    displayName: "Sample name"
});
```

</div>
</details>

<details>
<summary>deleteDatasourceUser</summary>

<div>

Removes the specified user from the specified data source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gatewayId` | <code>string</code> | Yes | The gateway ID. When using a gateway cluster, the gateway ID refers to the primary (first) gateway in the cluster. In such cases, gateway ID is similar to gateway cluster ID. |
| `datasourceId` | <code>string</code> | Yes | The data source ID. |
| `emailAdress` | <code>string</code> | Yes | The user's email address or the object ID of the service principal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `profileId` | <code>string</code> | No | The service principal profile ID to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteDatasourceUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "user@example.com");
```

</div>
</details>

#### Capacities

<details>
<summary>getCapacities</summary>

<div>

Returns a list of capacities that the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Capacities|error`

**Sample code:**

```ballerina
bi:Capacities result = check biClient->getCapacities();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "capacityUserAccessRight": "None",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "state": "NotActivated"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getWorkloads</summary>

<div>

Returns the current state of the specified capacity workloads. If a workload is enabled, the percentage of maximum memory that the workload can consume is also returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Workloads|error`

**Sample code:**

```ballerina
bi:Workloads result = check biClient->getWorkloads("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "state": "Disabled",
      "name": "Sample name",
      "maxMemoryPercentageSetByUser": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getWorkloadByName</summary>

<div>

Returns the current state of a workload. If the workload is enabled, the percentage of maximum memory that the workload can consume is also returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `workloadName` | <code>string</code> | Yes | The name of the workload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Workload|error`

**Sample code:**

```ballerina
bi:Workload result = check biClient->getWorkloadByName("3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name");
```

**Sample response:**

```json
{
  "state": "Disabled",
  "name": "Sample name",
  "maxMemoryPercentageSetByUser": 1
}
```

</div>
</details>

<details>
<summary>updateWorkload</summary>

<div>

Changes the state of a specific workload to *Enabled* or *Disabled*. When enabling a workload, specify the percentage of maximum memory that the workload can consume.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `workloadName` | <code>string</code> | Yes | The name of the workload. |
| `payload` | <code>PatchWorkloadRequest</code> | Yes | Patch workload parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateWorkload("3fa85f64-5717-4562-b3fc-2c963f66afa6", "Sample name", {
    state: "Disabled",
    maxMemoryPercentageSetByUser: 1
});
```

</div>
</details>

<details>
<summary>getRefreshables</summary>

<div>

Returns a list of refreshables for all capacities that the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 1000. |
| `top` | <code>int:Signed32</code> | Yes | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `capacity` and `group`. |

**Returns:** `Refreshables|error`

**Sample code:**

```ballerina
bi:Refreshables result = check biClient->getRefreshables(top = 1);
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "kind": "Dataset",
      "refreshCount": 1,
      "refreshFailures": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRefreshablesForCapacity</summary>

<div>

Returns a list of refreshables for the specified capacity that the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 1000. |
| `top` | <code>int:Signed32</code> | Yes | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `capacities` and `groups`. |

**Returns:** `Refreshables|error`

**Sample code:**

```ballerina
bi:Refreshables result = check biClient->getRefreshablesForCapacity("3fa85f64-5717-4562-b3fc-2c963f66afa6", top = 1);
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "kind": "Dataset",
      "refreshCount": 1,
      "refreshFailures": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRefreshableByIdForCapacity</summary>

<div>

Returns the specified refreshable for the specified capacity that the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `refreshableId` | <code>string</code> | Yes | The refreshable ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `capacities` and `groups`. |

**Returns:** `Refreshables|error`

**Sample code:**

```ballerina
bi:Refreshables result = check biClient->getRefreshableByIdForCapacity("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "kind": "Dataset",
      "refreshCount": 1,
      "refreshFailures": 1
    }
  ]
}
```

</div>
</details>

#### Assign To Capacity

<details>
<summary>assignMyWorkspaceToCapacity</summary>

<div>

Assigns **My workspace** to the specified capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignToCapacityRequest</code> | Yes | Assign to capacity parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->assignMyWorkspaceToCapacity({
    capacityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

#### Capacity Assignment Status

<details>
<summary>getCapacityAssignmentStatusMyWorkspace</summary>

<div>

Gets the status of the **My workspace** assignment-to-capacity operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WorkspaceCapacityAssignmentStatus|error`

**Sample code:**

```ballerina
bi:WorkspaceCapacityAssignmentStatus result = check biClient->getCapacityAssignmentStatusMyWorkspace();
```

**Sample response:**

```json
{
  "status": "Pending",
  "activityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "capacityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "startTime": "string",
  "endTime": "string"
}
```

</div>
</details>

#### Available Features

<details>
<summary>getAvailableFeatures</summary>

<div>

Returns a list of available features for the user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AvailableFeatures|error`

**Sample code:**

```ballerina
bi:AvailableFeatures result = check biClient->getAvailableFeatures();
```

**Sample response:**

```json
{
  "features": [
    {
      "name": "Sample name",
      "extendedState": "Enabled",
      "state": "Enabled"
    }
  ],
  "@odata.context": "string"
}
```

</div>
</details>

<details>
<summary>getAvailableFeatureByName</summary>

<div>

Returns the specified available feature for the user by name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `featureName` | <code>string</code> | Yes | The feature name. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AvailableFeature|error`

**Sample code:**

```ballerina
bi:AvailableFeature result = check biClient->getAvailableFeatureByName("Sample name");
```

**Sample response:**

```json
{
  "name": "Sample name",
  "extendedState": "Enabled",
  "state": "Enabled",
  "additionalInfo": {
    "Usage": 1
  }
}
```

</div>
</details>

#### Pipelines

<details>
<summary>getPipelines</summary>

<div>

Returns a list of deployment pipelines that the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pipelines|error`

**Sample code:**

```ballerina
bi:Pipelines result = check biClient->getPipelines();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "displayName": "Sample name",
      "stages": [
        {
          "order": 1
        }
      ]
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPipeline</summary>

<div>

Creates a new deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePipelineRequest</code> | Yes | The create pipeline request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pipeline|error`

**Sample code:**

```ballerina
bi:Pipeline result = check biClient->createPipeline({
    displayName: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

The raw response content as `Pipeline`.

</div>
</details>

<details>
<summary>getPipelineById</summary>

<div>

Returns the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `stages`. Defaults to `"stages"`. |

**Returns:** `Pipeline|error`

**Sample code:**

```ballerina
bi:Pipeline result = check biClient->getPipelineById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `Pipeline`.

</div>
</details>

<details>
<summary>deletePipeline</summary>

<div>

Deletes the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deletePipeline("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updatePipeline</summary>

<div>

Updates the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `payload` | <code>UpdatePipelineRequest</code> | Yes | The update pipeline request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pipeline|error`

**Sample code:**

```ballerina
bi:Pipeline result = check biClient->updatePipeline("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    displayName: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

The raw response content as `Pipeline`.

</div>
</details>

<details>
<summary>getPipelineUsers</summary>

<div>

Returns a list of users that have access to the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineUsers|error`

**Sample code:**

```ballerina
bi:PipelineUsers result = check biClient->getPipelineUsers("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "accessRight": "Admin"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addPipelineUser</summary>

<div>

Grants user permissions to the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `payload` | <code>PipelineUser</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addPipelineUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    accessRight: "Admin"
});
```

</div>
</details>

<details>
<summary>deletePipelineUser</summary>

<div>

Removes user permissions from the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `identifier` | <code>string</code> | Yes | To delete user pipeline permissions, provide the user principal name (UPN) of the user. To delete a service principal or a security group's pipeline permissions, provide the Object ID of the service principal or security group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deletePipelineUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getPipelineStages</summary>

<div>

Returns the stages of the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineStages|error`

**Sample code:**

```ballerina
bi:PipelineStages result = check biClient->getPipelineStages("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "order": 1,
      "workspaceName": "Sample name",
      "workspaceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>assignWorkspace</summary>

<div>

Assigns the specified workspace to the specified deployment pipeline stage.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `stageOrder` | <code>int:Signed32</code> | Yes | The deployment pipeline stage order. Development (0), Test (1), Production (2). |
| `payload` | <code>AssignWorkspaceRequest</code> | Yes | The assign workspace request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->assignWorkspace("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1, {
    workspaceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>unassignWorkspace</summary>

<div>

Unassigns the workspace from the specified stage in the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `stageOrder` | <code>int:Signed32</code> | Yes | The deployment pipeline stage order. Development (0), Test (1), Production (2). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->unassignWorkspace("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

</div>
</details>

<details>
<summary>getPipelineStageArtifacts</summary>

<div>

Returns the supported items from the workspace assigned to the specified stage of the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `stageOrder` | <code>int:Signed32</code> | Yes | The deployment pipeline stage order. Development (0), Test (1), Production (2). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineStageArtifacts|error`

**Sample code:**

```ballerina
bi:PipelineStageArtifacts result = check biClient->getPipelineStageArtifacts("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "reports": [
    {
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactDisplayName": "Sample name",
      "targetArtifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "datamarts": [
    {
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactDisplayName": "Sample name",
      "targetArtifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "datasets": [
    {
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactDisplayName": "Sample name",
      "targetArtifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "dashboards": [
    {
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactDisplayName": "Sample name",
      "targetArtifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "dataflows": [
    {
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactDisplayName": "Sample name",
      "targetArtifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPipelineOperations</summary>

<div>

Returns a list of the up-to-20 most recent deploy operations performed on the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineOperations|error`

**Sample code:**

```ballerina
bi:PipelineOperations result = check biClient->getPipelineOperations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "lastUpdatedTime": "2026-01-15T00:00:00",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "NotStarted"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPipelineOperationById</summary>

<div>

Returns the details of the specified deploy operation performed on the specified deployment pipeline, including the deployment execution plan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `operationId` | <code>string</code> | Yes | The operation ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineOperation|error`

**Sample code:**

```ballerina
bi:PipelineOperation result = check biClient->getPipelineOperationById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastUpdatedTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "NotStarted",
  "sourceStageOrder": 1,
  "note": {
    "isTruncated": false,
    "content": "string"
  },
  "executionPlan": {
    "steps": [
      {
        "index": 1,
        "type": "DatasetDeployment",
        "status": "NotStarted"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>deployAll</summary>

<div>

Deploys all supported items from the source stage of the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `payload` | <code>DeployAllRequest</code> | Yes | The deploy request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineOperation|error`

**Sample code:**

```ballerina
bi:PipelineOperation result = check biClient->deployAll("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sourceStageOrder: 1,
    note: "string",
    isBackwardDeployment: false
});
```

**Sample response:**

```json
{
  "lastUpdatedTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "NotStarted",
  "sourceStageOrder": 1,
  "note": {
    "isTruncated": false,
    "content": "string"
  },
  "executionPlan": {
    "steps": [
      {
        "index": 1,
        "type": "DatasetDeployment",
        "status": "NotStarted"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>selectiveDeploy</summary>

<div>

Deploys the specified items from the source stage of the specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `payload` | <code>SelectiveDeployRequest</code> | Yes | The selective deploy request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineOperation|error`

**Sample code:**

```ballerina
bi:PipelineOperation result = check biClient->selectiveDeploy("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sourceStageOrder: 1,
    note: "string",
    updateAppSettings: {
        updateAppInTargetWorkspace: false
    },
    newWorkspace: {
        capacityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "lastUpdatedTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "NotStarted",
  "sourceStageOrder": 1,
  "note": {
    "isTruncated": false,
    "content": "string"
  },
  "executionPlan": {
    "steps": [
      {
        "index": 1,
        "type": "DatasetDeployment",
        "status": "NotStarted"
      }
    ]
  }
}
```

</div>
</details>

#### Dataflow Storage Accounts

<details>
<summary>getDataflowStorageAccounts</summary>

<div>

Returns a list of dataflow storage accounts that the user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DataflowStorageAccounts|error`

**Sample code:**

```ballerina
bi:DataflowStorageAccounts result = check biClient->getDataflowStorageAccounts();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "isEnabled": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

#### Admin

<details>
<summary>requestWorkspaceInfo</summary>

<div>

Initiates a call to receive metadata for the requested list of workspaces.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>RequiredWorkspaces</code> | Yes | Required workspace IDs to get info for. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `lineage` | <code>boolean</code> | No | Whether to return lineage info (upstream dataflows, tiles, data source IDs). |
| `datasetExpressions` | <code>boolean</code> | No | Whether to return dataset expressions (DAX and Mashup queries). If you set this parameter to `true`, you must fully enable metadata scanning in order for data to be returned. For more information, see [Enable tenant settings for metadata scanning](/power-bi/admin/service-admin-metadata-scanning-setup#enable-tenant-settings-for-metadata-scanning). |
| `getArtifactUsers` | <code>boolean</code> | No | Whether to return user details for a Power BI item (such as a report or a dashboard). |
| `datasetSchema` | <code>boolean</code> | No | Whether to return dataset schema (tables, columns and measures). If you set this parameter to `true`, you must fully enable metadata scanning in order for data to be returned. For more information, see [Enable tenant settings for metadata scanning](/power-bi/admin/service-admin-metadata-scanning-setup#enable-tenant-settings-for-metadata-scanning). |
| `datasourceDetails` | <code>boolean</code> | No | Whether to return data source details. |

**Returns:** `ScanRequest|error`

**Sample code:**

```ballerina
bi:ScanRequest result = check biClient->requestWorkspaceInfo({
    workspaces: ["string"]
});
```

**Sample response:**

```json
{
  "createdDateTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "error": {
    "code": "200",
    "message": "string",
    "target": "string"
  },
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getScanStatus</summary>

<div>

Gets the scan status for the specified scan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scanId` | <code>string</code> | Yes | The scan ID, which is included in the response from the workspaces or the [Admin - WorkspaceInfo PostWorkspaceInfo](/rest/api/power-bi/admin/workspace-info-post-workspace-info) API call that triggered the scan. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScanRequest|error`

**Sample code:**

```ballerina
bi:ScanRequest result = check biClient->getScanStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "createdDateTime": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "error": {
    "code": "200",
    "message": "string",
    "target": "string"
  },
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getScanResult</summary>

<div>

Gets the scan result for the specified scan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scanId` | <code>string</code> | Yes | The scan ID, which is included in the response from the workspaces or the [Admin - WorkspaceInfo PostWorkspaceInfo](/rest/api/power-bi/admin/workspace-info-post-workspace-info) API call that triggered the scan. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WorkspaceInfoResponse|error`

**Sample code:**

```ballerina
bi:WorkspaceInfoResponse result = check biClient->getScanResult("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "workspaces": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reports": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ],
      "dataRetrievalState": "string"
    }
  ],
  "datasourceInstances": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ],
  "misconfiguredDatasourceInstances": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getModifiedWorkspaces</summary>

<div>

Gets a list of workspace IDs in the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `modifiedSince` | <code>string</code> | No | Last modified date (must be in ISO 8601 compliant UTC format). |
| `excludeInActiveWorkspaces` | <code>boolean</code> | No | Whether to exclude inactive workspaces. |
| `excludePersonalWorkspaces` | <code>boolean</code> | No | Whether to exclude personal workspaces. |

**Returns:** `ModifiedWorkspace[]|error`

**Sample code:**

```ballerina
bi:ModifiedWorkspace[] result = check biClient->getModifiedWorkspaces();
```

**Sample response:**

The raw response content as `ModifiedWorkspace[]`.

</div>
</details>

<details>
<summary>assignWorkspacesToCapacity</summary>

<div>

Assigns the specified workspaces to the specified Premium capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignWorkspacesToCapacityRequest</code> | Yes | Admin assign workspaces capacity parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->assignWorkspacesToCapacity({
    capacityMigrationAssignments: [{
        workspacesToAssign: ["string"],
        targetCapacityObjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

</div>
</details>

<details>
<summary>unassignWorkspacesFromCapacity</summary>

<div>

Unassigns the specified workspaces from capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UnassignWorkspacesCapacityRequest</code> | Yes | Admin assign workspaces to shared capacity parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->unassignWorkspacesFromCapacity({
    workspacesToUnassign: ["string"]
});
```

</div>
</details>

<details>
<summary>getDatasetsAsAdmin</summary>

<div>

Returns a list of datasets for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `AdminDatasets|error`

**Sample code:**

```ballerina
bi:AdminDatasets result = check biClient->getDatasetsAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDatasourcesAsAdmin</summary>

<div>

Returns a list of data sources for the specified dataset.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getDatasourcesAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDatasetUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified dataset.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `datasetId` | <code>string</code> | Yes | The dataset ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetUsers|error`

**Sample code:**

```ballerina
bi:DatasetUsers result = check biClient->getDatasetUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "datasetUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getGroupsAsAdmin</summary>

<div>

Returns a list of workspaces for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 5000. |
| `top` | <code>int:Signed32</code> | Yes | Returns only the first n results. This parameter is mandatory and must be in the range of 1-5000. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `users`, `reports`, `dashboards`, `datasets`, `dataflows`, and `workbooks`. |

**Returns:** `AdminGroups|error`

**Sample code:**

```ballerina
bi:AdminGroups result = check biClient->getGroupsAsAdmin(top = 1);
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "isReadOnly": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>getGroupByIdAsAdmin</summary>

<div>

Returns a workspace for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `users`, `reports`, `dashboards`, `datasets`, `dataflows`, and `workbooks`. |

**Returns:** `AdminGroup|error`

**Sample code:**

```ballerina
bi:AdminGroup result = check biClient->getGroupByIdAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "isReadOnly": false,
  "logAnalyticsWorkspace": {
    "resourceGroup": "string",
    "resourceName": "Sample name",
    "subscriptionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "capacityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dataflowStorageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateGroupAsAdmin</summary>

<div>

Updates the properties of the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>AdminGroup</code> | Yes | The properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Sample name",
    logAnalyticsWorkspace: {
        resourceGroup: "string",
        resourceName: "Sample name",
        subscriptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    capacityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>getGroupUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified workspace (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GroupUsers|error`

**Sample code:**

```ballerina
bi:GroupUsers result = check biClient->getGroupUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "groupUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addGroupUserAsAdmin</summary>

<div>

Grants user permissions to the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>GroupUser</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addGroupUserAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    groupUserAccessRight: "None",
    emailAddress: "user@example.com"
});
```

</div>
</details>

<details>
<summary>deleteGroupUserAsAdmin</summary>

<div>

Removes user permissions from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `user` | <code>string</code> | Yes | The user principal name (UPN) of the user or group object Id of the group or app object Id of the service principal to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `profileId` | <code>string</code> | No | The service principal profile ID to delete. |
| `isGroup` | <code>boolean</code> | No | Whether a given user is a group or not. This parameter is required when user to delete is group. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteGroupUserAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>restoreDeletedGroupAsAdmin</summary>

<div>

Restores a deleted workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `payload` | <code>GroupRestoreRequest</code> | Yes | Details of the group restore request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->restoreDeletedGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    emailAddress: "user@example.com",
    name: "Sample name"
});
```

</div>
</details>

<details>
<summary>getUpstreamDataflowsInGroupAsAdmin</summary>

<div>

Returns a list of upstream dataflows for the specified dataflow (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DependentDataflows|error`

**Sample code:**

```ballerina
bi:DependentDataflows result = check biClient->getUpstreamDataflowsInGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "targetDataflowId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "groupId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDashboardsInGroupAsAdmin</summary>

<div>

Returns a list of dashboards from the specified workspace (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `AdminDashboards|error`

**Sample code:**

```ballerina
bi:AdminDashboards result = check biClient->getDashboardsInGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isReadOnly": false,
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportsInGroupAsAdmin</summary>

<div>

Returns a list of reports from the specified workspace (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `AdminReports|error`

**Sample code:**

```ballerina
bi:AdminReports result = check biClient->getReportsInGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDatasetsInGroupAsAdmin</summary>

<div>

Returns a list of datasets from the specified workspace (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Expands related entities inline. |

**Returns:** `AdminDatasets|error`

**Sample code:**

```ballerina
bi:AdminDatasets result = check biClient->getDatasetsInGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdDate": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDatasetToDataflowsLinksInGroupAsAdmin</summary>

<div>

Returns a list of upstream dataflows for datasets from the specified workspace (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DatasetToDataflowLinksResponse|error`

**Sample code:**

```ballerina
bi:DatasetToDataflowLinksResponse result = check biClient->getDatasetToDataflowsLinksInGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "workspaceObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "datasetObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dataflowObjectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDataflowsInGroupAsAdmin</summary>

<div>

Returns a list of dataflows from the specified workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `Dataflows|error`

**Sample code:**

```ballerina
bi:Dataflows result = check biClient->getDataflowsInGroupAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "objectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getUnusedArtifactsAsAdmin</summary>

<div>

Returns a list of datasets, reports, and dashboards that have not been used within 30 days for the specified workspace. This is a preview API call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The workspace ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `continuationToken` | <code>string</code> | No | Token required to get the next chunk of the result set. |

**Returns:** `UnusedArtifactsResponse|error`

**Sample code:**

```ballerina
bi:UnusedArtifactsResponse result = check biClient->getUnusedArtifactsAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "continuationUri": "string",
  "unusedArtifactEntities": [
    {
      "artifactType": "string",
      "displayName": "Sample name",
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "continuationToken": "string"
}
```

</div>
</details>

<details>
<summary>getReportsAsAdmin</summary>

<div>

Returns a list of reports for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `AdminReports|error`

**Sample code:**

```ballerina
bi:AdminReports result = check biClient->getReportsAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportType": "PaginatedReport",
      "appId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ReportUsers|error`

**Sample code:**

```ballerina
bi:ReportUsers result = check biClient->getReportUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "reportUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getReportSubscriptionsAsAdmin</summary>

<div>

Returns a list of report subscriptions along with subscriber details. This is a preview API call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The report ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscriptions|error`

**Sample code:**

```ballerina
bi:Subscriptions result = check biClient->getReportSubscriptionsAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactType": "string",
      "endDate": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDashboardsAsAdmin</summary>

<div>

Returns a list of dashboards for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `tiles`. |

**Returns:** `AdminDashboards|error`

**Sample code:**

```ballerina
bi:AdminDashboards result = check biClient->getDashboardsAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isReadOnly": false,
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTilesAsAdmin</summary>

<div>

Returns a list of tiles within the specified dashboard.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AdminTiles|error`

**Sample code:**

```ballerina
bi:AdminTiles result = check biClient->getTilesAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "datasetId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDashboardUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified dashboard.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DashboardUsers|error`

**Sample code:**

```ballerina
bi:DashboardUsers result = check biClient->getDashboardUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "dashboardUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDashboardSubscriptionsAsAdmin</summary>

<div>

Returns a list of dashboard subscriptions along with subscriber details. This is a preview API call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dashboardId` | <code>string</code> | Yes | The dashboard ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscriptions|error`

**Sample code:**

```ballerina
bi:Subscriptions result = check biClient->getDashboardSubscriptionsAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactType": "string",
      "endDate": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getLinksSharedToWholeOrganizationAsAdmin</summary>

<div>

Returns a list of Power BI reports that are shared with the whole organization through links.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `continuationToken` | <code>string</code> | No | Token required to get the next chunk of the result set. |

**Returns:** `ArtifactAccessResponse|error`

**Sample code:**

```ballerina
bi:ArtifactAccessResponse result = check biClient->getLinksSharedToWholeOrganizationAsAdmin();
```

**Sample response:**

```json
{
  "continuationUri": "string",
  "artifactAccessEntities": [
    {
      "artifactType": "Report",
      "accessRight": "string",
      "displayName": "Sample name",
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "@odata.context": "string",
  "continuationToken": "string"
}
```

</div>
</details>

<details>
<summary>getPublishedToWebAsAdmin</summary>

<div>

Returns a list of Power BI items (such as reports or dashboards) that are published to the web.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `continuationToken` | <code>string</code> | No | Token required to get the next chunk of the result set. |

**Returns:** `ArtifactAccessResponse|error`

**Sample code:**

```ballerina
bi:ArtifactAccessResponse result = check biClient->getPublishedToWebAsAdmin();
```

**Sample response:**

```json
{
  "continuationUri": "string",
  "artifactAccessEntities": [
    {
      "artifactType": "Report",
      "accessRight": "string",
      "displayName": "Sample name",
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "@odata.context": "string",
  "continuationToken": "string"
}
```

</div>
</details>

<details>
<summary>getImportsAsAdmin</summary>

<div>

Returns a list of imports for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Expands related entities inline. |

**Returns:** `Imports|error`

**Sample code:**

```ballerina
bi:Imports result = check biClient->getImportsAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reports": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ],
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPowerBIEncryptionKeys</summary>

<div>

Returns the encryption keys for the tenant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TenantKeys|error`

**Sample code:**

```ballerina
bi:TenantKeys result = check biClient->getPowerBIEncryptionKeys();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "createdAt": "string",
      "isDefault": false,
      "keyVaultKeyIdentifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addPowerBIEncryptionKey</summary>

<div>

Adds an encryption key for Power BI workspaces assigned to a capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TenantKeyCreationRequest</code> | Yes | Tenant key information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TenantKey|error`

**Sample code:**

```ballerina
bi:TenantKey result = check biClient->addPowerBIEncryptionKey({
    isDefault: false,
    keyVaultKeyIdentifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Sample name",
    activate: false
});
```

**Sample response:**

```json
{
  "createdAt": "string",
  "isDefault": false,
  "keyVaultKeyIdentifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updatedAt": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>rotatePowerBIEncryptionKey</summary>

<div>

Rotate the encryption key for Power BI workspaces assigned to a capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tenantKeyId` | <code>string</code> | Yes | The tenant key ID. |
| `payload` | <code>TenantKeyRotationRequest</code> | Yes | Tenant key information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TenantKey|error`

**Sample code:**

```ballerina
bi:TenantKey result = check biClient->rotatePowerBIEncryptionKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    keyVaultKeyIdentifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "createdAt": "string",
  "isDefault": false,
  "keyVaultKeyIdentifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updatedAt": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getCapacitiesAsAdmin</summary>

<div>

Returns a list of capacities for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Expands related entities inline. |

**Returns:** `Capacities|error`

**Sample code:**

```ballerina
bi:Capacities result = check biClient->getCapacitiesAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "capacityUserAccessRight": "None",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "state": "NotActivated"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateCapacityAsAdmin</summary>

<div>

Changes specific capacity information. Currently, this API call only supports changing the capacity's encryption key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `payload` | <code>CapacityPatchRequest</code> | Yes | Patch capacity information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->updateCapacityAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    tenantKeyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

</div>
</details>

<details>
<summary>getCapacityUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CapacityUsers|error`

**Sample code:**

```ballerina
bi:CapacityUsers result = check biClient->getCapacityUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "capacityUserAccessRight": "None"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRefreshablesAsAdmin</summary>

<div>

Returns a list of refreshables for the organization within a capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 1000. |
| `top` | <code>int:Signed32</code> | Yes | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `capacities` and `groups`. |

**Returns:** `Refreshables|error`

**Sample code:**

```ballerina
bi:Refreshables result = check biClient->getRefreshablesAsAdmin(top = 1);
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "kind": "Dataset",
      "refreshCount": 1,
      "refreshFailures": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRefreshablesForCapacityAsAdmin</summary>

<div>

Returns a list of refreshables for the specified capacity that the user has access to (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 1000. |
| `top` | <code>int:Signed32</code> | Yes | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `capacities` and `groups`. |

**Returns:** `Refreshables|error`

**Sample code:**

```ballerina
bi:Refreshables result = check biClient->getRefreshablesForCapacityAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", top = 1);
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "kind": "Dataset",
      "refreshCount": 1,
      "refreshFailures": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRefreshableByIdForCapacityAsAdmin</summary>

<div>

Returns the specified refreshable for the specified capacity that the user has access to (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `capacityId` | <code>string</code> | Yes | The capacity ID. |
| `refreshableId` | <code>string</code> | Yes | The refreshable ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `capacities` and `groups`. |

**Returns:** `Refreshables|error`

**Sample code:**

```ballerina
bi:Refreshables result = check biClient->getRefreshableByIdForCapacityAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "kind": "Dataset",
      "refreshCount": 1,
      "refreshFailures": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDataflowsAsAdmin</summary>

<div>

Returns a list of dataflows for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Returns a subset of a results based on [Odata](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_SystemQueryOptions) filter query parameter condition. |

**Returns:** `AdminDataflows|error`

**Sample code:**

```ballerina
bi:AdminDataflows result = check biClient->getDataflowsAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "objectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>exportDataflowAsAdmin</summary>

<div>

Exports the definition for the specified dataflow to a JSON file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check biClient->exportDataflowAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getDataflowDatasourcesAsAdmin</summary>

<div>

Returns a list of data sources for the specified dataflow (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Datasources|error`

**Sample code:**

```ballerina
bi:Datasources result = check biClient->getDataflowDatasourcesAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "connectionString": "string",
      "datasourceType": "string",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getDataflowUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified dataflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataflowId` | <code>string</code> | Yes | The dataflow ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DataflowUsers|error`

**Sample code:**

```ballerina
bi:DataflowUsers result = check biClient->getDataflowUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "emailAddress": "user@example.com"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAppsAsAdmin</summary>

<div>

Returns a list of apps in the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | The number entries to be skipped. |
| `top` | <code>int</code> | Yes | The requested number of apps. |

**Returns:** `AdminApps|error`

**Sample code:**

```ballerina
bi:AdminApps result = check biClient->getAppsAsAdmin(top = 1);
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "publishedBy": "string",
      "lastUpdate": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getAppUsersAsAdmin</summary>

<div>

Returns a list of users that have access to the specified app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>string</code> | Yes | The app ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AppUsers|error`

**Sample code:**

```ballerina
bi:AppUsers result = check biClient->getAppUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "appUserAccessRight": "None",
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "emailAddress": "user@example.com"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getUserArtifactAccessAsAdmin</summary>

<div>

Returns a list of Power BI items (such as reports or dashboards) that the specified user has access to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The graph ID or user principal name (UPN) of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `artifactTypes` | <code>string</code> | No | Comma separated list of artifact types. |
| `continuationToken` | <code>string</code> | No | Token required to get the next chunk of the result set. |

**Returns:** `ArtifactAccessResponse|error`

**Sample code:**

```ballerina
bi:ArtifactAccessResponse result = check biClient->getUserArtifactAccessAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "continuationUri": "string",
  "artifactAccessEntities": [
    {
      "artifactType": "Report",
      "accessRight": "string",
      "displayName": "Sample name",
      "artifactId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "@odata.context": "string",
  "continuationToken": "string"
}
```

</div>
</details>

<details>
<summary>getUserSubscriptionsAsAdmin</summary>

<div>

Returns a list of subscriptions for the specified user. This is a preview API call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The graph ID or user principal name (UPN) of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `continuationToken` | <code>string</code> | No | Token required to get the next chunk of the result set. |

**Returns:** `SubscriptionsByUserResponse|error`

**Sample code:**

```ballerina
bi:SubscriptionsByUserResponse result = check biClient->getUserSubscriptionsAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "continuationUri": "string",
  "subscriptionEntities": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "artifactType": "string",
      "endDate": "2026-01-15T00:00:00"
    }
  ],
  "@odata.context": "string",
  "continuationToken": "string"
}
```

</div>
</details>

<details>
<summary>getActivityEvents</summary>

<div>

Returns a list of audit activity events for a tenant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `startDateTime` | <code>string</code> | No | Start date and time of the window for audit event results. Must be in ISO 8601 compliant UTC format. |
| `filter` | <code>string</code> | No | Filters the results based on a boolean condition, using 'Activity', 'UserId', or both properties. Supports only 'eq' and 'and' operators. |
| `endDateTime` | <code>string</code> | No | End date and time of the window for audit event results. Must be in ISO 8601 compliant UTC format. |
| `continuationToken` | <code>string</code> | No | Token required to get the next chunk of the result set. |

**Returns:** `ActivityEventResponse|error`

**Sample code:**

```ballerina
bi:ActivityEventResponse result = check biClient->getActivityEvents();
```

**Sample response:**

```json
{
  "continuationUri": "string",
  "continuationToken": "string"
}
```

</div>
</details>

<details>
<summary>removeLabelsAsAdmin</summary>

<div>

Remove sensitivity labels from Power BI items (such as reports or dashboards) by item ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InformationProtectionArtifactsChangeLabel</code> | Yes | A composite of artifact ID lists for each type. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InformationProtectionChangeLabelResponse|error`

**Sample code:**

```ballerina
bi:InformationProtectionChangeLabelResponse result = check biClient->removeLabelsAsAdmin({
    reports: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    datasets: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    dashboards: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    dataflows: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ],
  "datasets": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ],
  "dashboards": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ],
  "dataflows": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ]
}
```

</div>
</details>

<details>
<summary>setLabelsAsAdmin</summary>

<div>

Set sensitivity labels on Power BI items (such as reports or dashboards) by item ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>InformationProtectionChangeLabelDetails</code> | Yes | Set label details. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InformationProtectionChangeLabelResponse|error`

**Sample code:**

```ballerina
bi:InformationProtectionChangeLabelResponse result = check biClient->setLabelsAsAdmin({
    labelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    artifacts: {
        reports: [{
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }],
        datasets: [{
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }],
        dashboards: [{
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }]
    },
    delegatedUser: {
        emailAddress: "user@example.com"
    },
    assignmentMethod: "Standard"
});
```

**Sample response:**

```json
{
  "reports": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ],
  "datasets": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ],
  "dashboards": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ],
  "dataflows": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "Failed"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPipelinesAsAdmin</summary>

<div>

Returns a list of deployment pipelines for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 5000. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. This parameter must be in the range of 1-5000. |
| `filter` | <code>string</code> | No | Filters the results based on a boolean condition. This API only supports filtering for [orphaned deployment pipelines](#get-orphaned-deployment-pipelines-example). Unsupported filters will return unfiltered results. |
| `expand` | <code>string</code> | No | Accepts a comma-separated list of data types, which will be expanded inline in the response. Supports `users` and `stages`. |

**Returns:** `AdminPipelines|error`

**Sample code:**

```ballerina
bi:AdminPipelines result = check biClient->getPipelinesAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "displayName": "Sample name",
      "stages": [
        {
          "order": 1
        }
      ]
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPipelineUsersAsAdmin</summary>

<div>

Returns a list of users that have access to a specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineUsers|error`

**Sample code:**

```ballerina
bi:PipelineUsers result = check biClient->getPipelineUsersAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "principalType": "None",
      "accessRight": "Admin"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addPipelineUserAsAdmin</summary>

<div>

Grants user permissions to a specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `payload` | <code>PipelineUser</code> | Yes | Details of user access right. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->addPipelineUserAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    principalType: "None",
    accessRight: "Admin"
});
```

</div>
</details>

<details>
<summary>deletePipelineUserAsAdmin</summary>

<div>

Removes user permissions from a specified deployment pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipelineId` | <code>string</code> | Yes | The deployment pipeline ID. |
| `identifier` | <code>string</code> | Yes | For the principal type `User`, provide the user principal name (UPN). Otherwise, provide the [Object ID](/power-bi/developer/embedded/embedded-troubleshoot#what-is-the-difference-between-application-object-id-and-principal-object-id) of the principal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deletePipelineUserAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getProfilesAsAdmin</summary>

<div>

Returns a list of service principal profiles for the organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. Use with top to fetch results beyond the first 5000. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. This parameter must be in the range of 1-5000. |
| `filter` | <code>string</code> | No | Filters the results based on a boolean condition, using 'id', 'displayName', or 'servicePrincipalId'. Supports only 'eq' operator. |

**Returns:** `AdminServicePrincipalProfiles|error`

**Sample code:**

```ballerina
bi:AdminServicePrincipalProfiles result = check biClient->getProfilesAsAdmin();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "displayName": "Sample name",
      "servicePrincipalId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteProfileAsAdmin</summary>

<div>

Deletes the specified service principal profile (as an administrator).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | <code>string</code> | Yes | The service principal profile ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteProfileAsAdmin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Generate Token

<details>
<summary>generateToken</summary>

<div>

Generates an embed token for multiple reports, datasets, and target workspaces.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>GenerateTokenRequestV2</code> | Yes | Generate token parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmbedToken|error`

**Sample code:**

```ballerina
bi:EmbedToken result = check biClient->generateToken({
    reports: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        allowEdit: false
    }],
    identities: [{
        reports: ["string"],
        roles: ["string"],
        customData: "string"
    }],
    lifetimeInMinutes: 1,
    targetWorkspaces: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "tokenId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "expiration": "string",
  "token": "string"
}
```

</div>
</details>

#### Create Template App Install Ticket

<details>
<summary>createInstallTicket</summary>

<div>

Generates an installation ticket for the [automated install flow](/power-bi/connect-data/template-apps-auto-install) of the specified template app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateInstallTicketRequest</code> | Yes | Create Install Ticket parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InstallTicket|error`

**Sample code:**

```ballerina
bi:InstallTicket result = check biClient->createInstallTicket({
    installDetails: [{
        packageKey: "string",
        appId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        ownerTenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "ticket": "string",
  "expiration": "string",
  "ticketId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Profiles

<details>
<summary>getProfiles</summary>

<div>

Returns a list of service principal profiles.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int:Signed32</code> | No | Skips the first n results. |
| `top` | <code>int:Signed32</code> | No | Returns only the first n results. |
| `filter` | <code>string</code> | No | Get a profile by DisplayName. |

**Returns:** `ServicePrincipalProfiles|error`

**Sample code:**

```ballerina
bi:ServicePrincipalProfiles result = check biClient->getProfiles();
```

**Sample response:**

```json
{
  "@odata.context": "string",
  "value": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "displayName": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createProfile</summary>

<div>

Creates a new service principal profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateOrUpdateProfileRequest</code> | Yes | The create profile request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ServicePrincipalProfile|error`

**Sample code:**

```ballerina
bi:ServicePrincipalProfile result = check biClient->createProfile({
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "displayName": "Sample name"
}
```

</div>
</details>

<details>
<summary>getProfileById</summary>

<div>

Returns the specified service principal profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | <code>string</code> | Yes | The service principal profile ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ServicePrincipalProfile|error`

**Sample code:**

```ballerina
bi:ServicePrincipalProfile result = check biClient->getProfileById("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "displayName": "Sample name"
}
```

</div>
</details>

<details>
<summary>updateProfile</summary>

<div>

Updates the specified service principal profile name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | <code>string</code> | Yes | The service principal profile ID. |
| `payload` | <code>CreateOrUpdateProfileRequest</code> | Yes | The update profile request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ServicePrincipalProfile|error`

**Sample code:**

```ballerina
bi:ServicePrincipalProfile result = check biClient->updateProfile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "displayName": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteProfile</summary>

<div>

Deletes the specified service principal profile.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | <code>string</code> | Yes | The service principal profile ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check biClient->deleteProfile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>
