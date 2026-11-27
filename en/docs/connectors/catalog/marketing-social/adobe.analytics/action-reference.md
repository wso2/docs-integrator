---
connector: true
connector_name: "adobe.analytics"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Adobe Analytics connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Run reports and manage segments, calculated metrics, projects, date ranges, annotations, tags and shares in Adobe Analytics, browse dimensions and metrics, and read users and usage audit logs through the Adobe Analytics 2.0 API. |

---

## Client

The `Client` connects to the Adobe Analytics 2.0 API (`https://analytics.adobe.io/api`). It exposes 56 operations. Every operation takes the global company ID as its first argument.

### Configuration

**ApiKeysConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authorization` | <code>string</code> | Required | The access token from the Adobe Analytics API client integration, prefixed with "Bearer ". |
| `xApiKey` | <code>string</code> | Required | The API key (client ID) copied from the Adobe Analytics API client integration. |

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
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
import ballerinax/adobe.analytics;

configurable string accessToken = ?;
configurable string apiKey = ?;
configurable string companyId = ?;

final analytics:Client analyticsClient = check new ({
    authorization: "Bearer " + accessToken,
    xApiKey: apiKey
});
```

### Operations

#### Annotations

<details>
<summary>listAnnotations</summary>

<div>

Retrieve all annotations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `sortDirection` | <code>int</code> | No | Sort direction (ASC or DESC. |
| `includeType` | <code>("all"&#124;"shared")[]</code> | No | Include additional annotations not owned by user. The "all" option takes precedence over "shared". |
| `filterByIds` | <code>string</code> | No | Query parameter. |
| `filterByModifiedAfter` | <code>string</code> | No | Filter list to only include annotations modified since this date (ISO8601 format). |
| `sortProperty` | <code>string</code> | No | Property to sort by (name, modified_date, id is currently allowed). Defaults to `"id"`. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `filterByDateRange` | <code>string</code> | No | Filter list to only include annotations in the specified date range with format yyyy-MM-dd'T'HH:mm:ss/yyyy-MM-dd'T'hh:MM:ss. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("name"&#124;"description"&#124;"dateRange"&#124;"color"&#124;"applyToAllReports"&#124;"scope"&#124;"createdDate"&#124;"modifiedDate"&#124;"modifiedById"&#124;"owner"&#124;"companyId"&#124;"rsid"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"sharesFullName"&#124;"tags"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore"&#124;"ownerFullName"&#124;"reportSuiteName")[]</code> | No | Comma-delimited list of additional annotation metadata fields to include on response. |

**Returns:** `ResponsePageAnalyticsAnnotation|error`

**Sample code:**

```ballerina
analytics:ResponsePageAnalyticsAnnotation result = check analyticsClient->listAnnotations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": 1,
  "lastPage": false,
  "numberOfElements": 1,
  "firstPage": false,
  "size": 1,
  "totalPages": 1
}
```

</div>
</details>

<details>
<summary>createAnnotation</summary>

<div>

Create new annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `request` | <code>http:Request</code> | Yes | JSON-formatted Object containing date range keys/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("name"&#124;"description"&#124;"dateRange"&#124;"color"&#124;"applyToAllReports"&#124;"scope"&#124;"createdDate"&#124;"modifiedDate"&#124;"modifiedById"&#124;"owner"&#124;"companyId"&#124;"rsid"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"sharesFullName"&#124;"tags"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore"&#124;"ownerFullName"&#124;"reportSuiteName")[]</code> | No | Comma-delimited list of additional annotation metadata fields to include on response. |

**Returns:** `AnalyticsAnnotation|error`

**Sample code:**

```ballerina
http:Request request = new;
request.setJsonPayload({"name": "Product launch", "description": "Spring campaign launch", "rsid": "examplersid", "dateRange": "2026-04-01T00:00:00/2026-04-07T23:59:59"});
analytics:AnalyticsAnnotation result = check analyticsClient->createAnnotation("3fa85f64-5717-4562-b3fc-2c963f66afa6", request);
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "color": "STANDARD1",
  "dateRange": "2026-01-15T00:00:00",
  "systemUserOwned": false,
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getAnnotation</summary>

<div>

Get existing annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | Annotation ID to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("name"&#124;"description"&#124;"dateRange"&#124;"color"&#124;"applyToAllReports"&#124;"scope"&#124;"createdDate"&#124;"modifiedDate"&#124;"modifiedById"&#124;"owner"&#124;"companyId"&#124;"rsid"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"sharesFullName"&#124;"tags"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore"&#124;"ownerFullName"&#124;"reportSuiteName")[]</code> | No | Comma-delimited list of additional annotation metadata fields to include on response. |

**Returns:** `AnalyticsAnnotation|error`

**Sample code:**

```ballerina
analytics:AnalyticsAnnotation result = check analyticsClient->getAnnotation("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "color": "STANDARD1",
  "dateRange": "2026-01-15T00:00:00",
  "systemUserOwned": false,
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateAnnotation</summary>

<div>

Update existing annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | Annotation ID to update. |
| `request` | <code>http:Request</code> | Yes | JSON-formatted Object containing date range keys/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("name"&#124;"description"&#124;"dateRange"&#124;"color"&#124;"applyToAllReports"&#124;"scope"&#124;"createdDate"&#124;"modifiedDate"&#124;"modifiedById"&#124;"owner"&#124;"companyId"&#124;"rsid"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"sharesFullName"&#124;"tags"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore"&#124;"ownerFullName"&#124;"reportSuiteName")[]</code> | No | Comma-delimited list of additional annotation metadata fields to include on response. |

**Returns:** `AnalyticsAnnotation|error`

**Sample code:**

```ballerina
http:Request request = new;
request.setJsonPayload({"name": "Product launch", "description": "Updated description"});
analytics:AnalyticsAnnotation result = check analyticsClient->updateAnnotation("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", request);
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "color": "STANDARD1",
  "dateRange": "2026-01-15T00:00:00",
  "systemUserOwned": false,
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteAnnotation</summary>

<div>

Delete existing annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | Annotation ID to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `DeleteResponse|error`

**Sample code:**

```ballerina
analytics:DeleteResponse result = check analyticsClient->deleteAnnotation("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "result": "string",
  "message": "string"
}
```

</div>
</details>

#### Calculated metrics

<details>
<summary>findCalculatedMetrics</summary>

<div>

Retrieve multiple calculated metrics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `includeType` | <code>("all"&#124;"shared"&#124;"templates")[]</code> | No | Include additional calculated metrics not owned by user. The "all" option takes precedence over "shared". |
| `sortProperty` | <code>string</code> | No | Property to sort by (name, modified_date, id is currently allowed). Defaults to `"id"`. |
| `rsids` | <code>string</code> | No | Filter list to only include calculated metrics tied to specified RSID list (comma-delimited). |
| `ownerId` | <code>int:Signed32</code> | No | Filter list to only include calculated metrics owned by the specified loginId. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `tagNames` | <code>string</code> | No | Filter list to only include calculated metrics that contains one of the tags. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"definition"&#124;"compatibility"&#124;"categories")[]</code> | No | Comma-delimited list of additional calculated metric metadata fields to include on response. |
| `approved` | <code>boolean</code> | No | Filter list to only include calculated metrics that are approved. |
| `sortDirection` | <code>string</code> | No | Sort direction (ASC or DESC). Defaults to `"ASC"`. |
| `filterByIds` | <code>string</code> | No | Filter list to only include calculated metrics in the specified list (comma-delimited list of IDs) (this is the same as calculatedMetricFilter, and is overwritten by calculatedMetricFilter. |
| `name` | <code>string</code> | No | Filter list to only include calculated metrics that contains the Name. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `favorite` | <code>boolean</code> | No | Filter list to only include calculated metrics that are favorites. |
| `toBeUsedInRsid` | <code>string</code> | No | The report suite where the calculated metric intended to be used. This report suite will be used to determine things like compatibility and permissions. If it is not specified then the permissions will be calculated based on the union of all metrics authorized in all groups the user belongs to. If the compatibility expansion is specified and toBeUsedInRsid is not then the compatibility returned is based off the compatibility from the last time the calculated metric was saved. |

**Returns:** `AnalyticsCalculatedMetric[]|error`

**Sample code:**

```ballerina
analytics:AnalyticsCalculatedMetric[] result = check analyticsClient->findCalculatedMetrics("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `AnalyticsCalculatedMetric[]`.

</div>
</details>

<details>
<summary>createCalculatedMetric</summary>

<div>

Create a new calculated metric.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>AnalyticsCalculatedMetric</code> | Yes | JSON-formatted Object containing key/value pairs for calculated metric creation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"definition"&#124;"compatibility"&#124;"categories")[]</code> | No | Comma-delimited list of additional calculated metric metadata fields to include on response. |

**Returns:** `AnalyticsCalculatedMetric|error`

**Sample code:**

```ballerina
analytics:AnalyticsCalculatedMetric result = check analyticsClient->createCalculatedMetric("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    definition: {},
    owner: {
        id: 1,
        name: "Sample name",
        login: "string"
    },
    created: "string",
    precision: 1
});
```

**Sample response:**

```json
{
  "definition": {},
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "precision": 1,
  "siteTitle": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getCalculatedMetricFunctions</summary>

<div>

Retrieve calculated metric functions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `CalcMetricFunction[]|error`

**Sample code:**

```ballerina
analytics:CalcMetricFunction[] result = check analyticsClient->getCalculatedMetricFunctions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `CalcMetricFunction[]`.

</div>
</details>

<details>
<summary>getCalculatedMetricFunction</summary>

<div>

Retrieve a calculated metric function by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The function ID to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `CalcMetricFunction|error`

**Sample code:**

```ballerina
analytics:CalcMetricFunction result = check analyticsClient->getCalculatedMetricFunction("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "exampleKey": "string",
  "name": "Sample name",
  "namespace": "string",
  "description": "Sample description",
  "persistable": false,
  "definition": {
    "func": "string",
    "version": [
      1
    ]
  }
}
```

</div>
</details>

<details>
<summary>validateCalculatedMetric</summary>

<div>

Validate a calculated metric definition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>AnalyticsCalculatedMetric</code> | Yes | JSON-formatted Object containing key/value pairs for calculated metric validation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `migrating` | <code>boolean</code> | No | Include migration functions in validation. Defaults to `false`. |

**Returns:** `AnalyticsCalculatedMetric|error`

**Sample code:**

```ballerina
analytics:AnalyticsCalculatedMetric result = check analyticsClient->validateCalculatedMetric("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    definition: {},
    owner: {
        id: 1,
        name: "Sample name",
        login: "string"
    },
    created: "string",
    precision: 1
});
```

**Sample response:**

```json
{
  "definition": {},
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "precision": 1,
  "siteTitle": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>findOneCalculatedMetric</summary>

<div>

Retrieve a single calculated metric by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The calculated metric ID to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"definition"&#124;"compatibility"&#124;"categories")[]</code> | No | Comma-delimited list of additional calculated metric metadata fields to include on response. |

**Returns:** `AnalyticsCalculatedMetric|error`

**Sample code:**

```ballerina
analytics:AnalyticsCalculatedMetric result = check analyticsClient->findOneCalculatedMetric("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "definition": {},
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "precision": 1,
  "siteTitle": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>updateCalculatedMetric</summary>

<div>

Update an existing calculated metric.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | Calculated Metric ID to be updated. |
| `payload` | <code>AnalyticsCalculatedMetric</code> | Yes | JSON-formatted Object containing key/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"definition"&#124;"compatibility"&#124;"categories")[]</code> | No | Comma-delimited list of additional calculated metric metadata fields to include on response. |

**Returns:** `AnalyticsCalculatedMetric|error`

**Sample code:**

```ballerina
analytics:AnalyticsCalculatedMetric result = check analyticsClient->updateCalculatedMetric("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    definition: {},
    owner: {
        id: 1,
        name: "Sample name",
        login: "string"
    },
    created: "string",
    precision: 1
});
```

**Sample response:**

```json
{
  "definition": {},
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "precision": 1,
  "siteTitle": "string",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteCalculatedMetric</summary>

<div>

Delete calculated metrics by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The calculated metric ID to be deleted. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `DeleteResponse|error`

**Sample code:**

```ballerina
analytics:DeleteResponse result = check analyticsClient->deleteCalculatedMetric("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "result": "string",
  "message": "string"
}
```

</div>
</details>

#### Component metadata (shares and tags)

<details>
<summary>findAllSharesForCompany</summary>

<div>

Retrieve components shared by user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `includeType` | <code>("sharedTo")[]</code> | No | Include additional shares not owned by the user. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `userid` | <code>int:Signed32</code> | No | The user ID to return details for. Only admins may use this option. |

**Returns:** `Share[]|error`

**Sample code:**

```ballerina
analytics:Share[] result = check analyticsClient->findAllSharesForCompany("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `Share[]`.

</div>
</details>

<details>
<summary>updateSharesForComponents</summary>

<div>

Update shared components with users.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>SharedComponent[]</code> | Yes | JSON-formatted ARRAY of objects containing key-value pairs that conform to the schema. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `useCache` | <code>boolean</code> | No | Use caching for faster requests. Defaults to `true`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `SharedComponent|error`

**Sample code:**

```ballerina
analytics:SharedComponent result = check analyticsClient->updateSharesForComponents("3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    componentType: "string",
    componentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}]);
```

**Sample response:**

```json
{
  "shares": [
    {
      "shareToId": 1,
      "shareToType": "string",
      "accessLevel": "string"
    }
  ],
  "componentType": "string",
  "componentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>saveShareMyCompany</summary>

<div>

Share component with user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>Share</code> | Yes | JSON-formatted Share object containing key-value pairs that conform to the Share schema. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `Share|error`

**Sample code:**

```ballerina
analytics:Share result = check analyticsClient->saveShareMyCompany("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    shareToId: 1,
    componentType: "string",
    shareToType: "string",
    componentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "shareToId": 1,
  "componentType": "string",
  "shareToType": "string",
  "componentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareToDisplayName": "Sample name",
  "shareFromImsId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>searchComponentShares</summary>

<div>

Create search for shared components.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>ComponentSearch</code> | Yes | Items to search for. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("sharesFullName")[]</code> | No | Comma-delimited list of additional project metadata fields to include on response. |

**Returns:** `SavedSharedComponent|error`

**Sample code:**

```ballerina
analytics:SavedSharedComponent result = check analyticsClient->searchComponentShares("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    componentType: "string",
    componentIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

**Sample response:**

```json
{
  "shares": [
    {
      "shareToId": 1,
      "componentType": "string",
      "shareToType": "string"
    }
  ],
  "componentType": "string",
  "componentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getShareById</summary>

<div>

Retrieve details of share by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The share ID to return details for. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Share|error`

**Sample code:**

```ballerina
analytics:Share result = check analyticsClient->getShareById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "shareToId": 1,
  "componentType": "string",
  "shareToType": "string",
  "componentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "shareToDisplayName": "Sample name",
  "shareFromImsId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteShare</summary>

<div>

Delete share by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The shareId to be deleted. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `record {|record {}...;|}|error`

**Sample code:**

```ballerina
record {|record {}...;|} result = check analyticsClient->deleteShare("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `record {|record {}...;|}`.

</div>
</details>

<details>
<summary>getComponentsSharedToMe</summary>

<div>

Retrieve component IDs shared with user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `componentType` | <code>string</code> | Yes | ComponentType to return. |

**Returns:** `string[]|error`

**Sample code:**

```ballerina
string[] result = check analyticsClient->getComponentsSharedToMe("3fa85f64-5717-4562-b3fc-2c963f66afa6", componentType = "string");
```

**Sample response:**

The raw response content as `string[]`.

</div>
</details>

<details>
<summary>searchComponentTags</summary>

<div>

Create search for component tags.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>ComponentSearch</code> | Yes | Items to search for. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |

**Returns:** `TaggedComponent|error`

**Sample code:**

```ballerina
analytics:TaggedComponent result = check analyticsClient->searchComponentTags("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    componentType: "string",
    componentIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

**Sample response:**

```json
{
  "componentType": "string",
  "componentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tags": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>findAllTagsForCompany</summary>

<div>

Retrieve tags for current user company.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |

**Returns:** `Tag[]|error`

**Sample code:**

```ballerina
analytics:Tag[] result = check analyticsClient->findAllTagsForCompany("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `Tag[]`.

</div>
</details>

<details>
<summary>saveTagListForCompany</summary>

<div>

Create tags for current user company.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>Tag[]</code> | Yes | JSON-formatted array of Tag objects containing key-value pairs. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tag[]|error`

**Sample code:**

```ballerina
analytics:Tag[] result = check analyticsClient->saveTagListForCompany("3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    name: "Sample name",
    description: "Sample description",
    id: 1
}]);
```

**Sample response:**

The raw response content as `Tag[]`.

</div>
</details>

<details>
<summary>deleteTagItemsFromComponents</summary>

<div>

Delete tags from components.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `componentType` | <code>"segment"&#124;"dashboard"&#124;"bookmark"&#124;"calculatedMetric"&#124;"project"&#124;"dateRange"&#124;"metric"&#124;"dimension"&#124;"virtualReportSuite"&#124;"scheduledJob"&#124;"alert"&#124;"classificationSet"</code> | Yes | The component type to operate on. |
| `componentIds` | <code>string</code> | Yes | Comma-separated list of componentIds to operate on. |

**Returns:** `record {|record {}...;|}[]|error`

**Sample code:**

```ballerina
record {|record {}...;|}[] result = check analyticsClient->deleteTagItemsFromComponents("3fa85f64-5717-4562-b3fc-2c963f66afa6", componentType = "segment", componentIds = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `record {|record {}...;|}[]`.

</div>
</details>

<details>
<summary>getTagListByComponentIdAndComponentType</summary>

<div>

Retrieve component tags by component ID and component type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `componentType` | <code>"segment"&#124;"dashboard"&#124;"bookmark"&#124;"calculatedMetric"&#124;"project"&#124;"dateRange"&#124;"metric"&#124;"dimension"&#124;"virtualReportSuite"&#124;"scheduledJob"&#124;"alert"&#124;"classificationSet"</code> | Yes | The component type to operate on. |
| `componentId` | <code>string</code> | Yes | The componentId to operate on. Currently this is just the segmentId. |

**Returns:** `Tag[]|error`

**Sample code:**

```ballerina
analytics:Tag[] result = check analyticsClient->getTagListByComponentIdAndComponentType("3fa85f64-5717-4562-b3fc-2c963f66afa6", componentType = "segment", componentId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `Tag[]`.

</div>
</details>

<details>
<summary>saveTagComponentList</summary>

<div>

Update tags for component.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>TaggedComponent[]</code> | Yes | JSON-formatted object containing key-value pairs that conform to the schema. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaggedComponent[]|error`

**Sample code:**

```ballerina
analytics:TaggedComponent[] result = check analyticsClient->saveTagComponentList("3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    componentType: "string",
    componentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    tags: ["string"]
}]);
```

**Sample response:**

The raw response content as `TaggedComponent[]`.

</div>
</details>

<details>
<summary>getTagById</summary>

<div>

Retrieve tag by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>int:Signed32</code> | Yes | Tag ID to be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tag|error`

**Sample code:**

```ballerina
analytics:Tag result = check analyticsClient->getTagById("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

```json
{
  "components": [
    {
      "componentType": "string",
      "componentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "tags": [
        "string"
      ]
    }
  ],
  "name": "Sample name",
  "description": "Sample description",
  "id": 1
}
```

</div>
</details>

<details>
<summary>deleteTag</summary>

<div>

Delete tag from component.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>int:Signed32</code> | Yes | The tagId to be deleted. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `record {|record {}...;|}[]|error`

**Sample code:**

```ballerina
record {|record {}...;|}[] result = check analyticsClient->deleteTag("3fa85f64-5717-4562-b3fc-2c963f66afa6", 1);
```

**Sample response:**

The raw response content as `record {|record {}...;|}[]`.

</div>
</details>

<details>
<summary>getComponentsByTagName</summary>

<div>

Retrieve component IDs associated with tag names.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `componentType` | <code>"segment"&#124;"dashboard"&#124;"bookmark"&#124;"calculatedMetric"&#124;"project"&#124;"dateRange"&#124;"metric"&#124;"dimension"&#124;"virtualReportSuite"&#124;"scheduledJob"&#124;"alert"&#124;"classificationSet"</code> | Yes | The component type to operate on. |
| `tagNames` | <code>string</code> | Yes | Comma separated list of tag names. |

**Returns:** `string[]|error`

**Sample code:**

```ballerina
string[] result = check analyticsClient->getComponentsByTagName("3fa85f64-5717-4562-b3fc-2c963f66afa6", componentType = "segment", tagNames = "string");
```

**Sample response:**

The raw response content as `string[]`.

</div>
</details>

#### Date ranges

<details>
<summary>getDateRange</summary>

<div>

Retrieve configuration for a date range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The DateRange id for which to retrieve information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `newDefinition` | <code>boolean</code> | No | Use the new JSON def. Defaults to `false`. |
| `expansion` | <code>("definition"&#124;"ownerFullName"&#124;"modified"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"tags"&#124;"sharesFullName"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore")[]</code> | No | Comma-delimited list of additional date range metadata fields to include on response. |

**Returns:** `ExpandedDateRange|error`

**Sample code:**

```ballerina
analytics:ExpandedDateRange result = check analyticsClient->getDateRange("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "template": false,
  "systemUserOwned": false,
  "disabledDate": "2026-01-15T00:00:00",
  "description": "Sample description",
  "companyId": 1,
  "approved": false
}
```

</div>
</details>

<details>
<summary>updateDateRange</summary>

<div>

Update configuration for a date range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The DateRange id for which to retrieve information. |
| `request` | <code>http:Request</code> | Yes | JSON-formatted Object containing date range keys/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `newDefinition` | <code>boolean</code> | No | Use the new JSON def. Defaults to `false`. |
| `expansion` | <code>("definition"&#124;"ownerFullName"&#124;"modified"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"tags"&#124;"sharesFullName"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore")[]</code> | No | Comma-delimited list of additional date range metadata fields to include on response. |

**Returns:** `ExpandedDateRange|error`

**Sample code:**

```ballerina
http:Request request = new;
request.setJsonPayload({"name": "Renamed date range"});
analytics:ExpandedDateRange result = check analyticsClient->updateDateRange("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", request);
```

**Sample response:**

```json
{
  "template": false,
  "systemUserOwned": false,
  "disabledDate": "2026-01-15T00:00:00",
  "description": "Sample description",
  "companyId": 1,
  "approved": false
}
```

</div>
</details>

<details>
<summary>deleteDateRange</summary>

<div>

Delete a date range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The DateRange id for which to retrieve information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `DeleteResponse|error`

**Sample code:**

```ballerina
analytics:DeleteResponse result = check analyticsClient->deleteDateRange("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "result": "string",
  "message": "string"
}
```

</div>
</details>

<details>
<summary>getDateRangesForUser</summary>

<div>

Retrieve user's date ranges.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `includeType` | <code>("all"&#124;"shared"&#124;"templates"&#124;"curatedItem")[]</code> | No | Include additional dateranges not owned by user. The "all" option takes precedence over "shared". |
| `filterByIds` | <code>string</code> | No | Filter list to only include date ranges in the specified list (comma-delimited list of IDs). |
| `filterByModifiedAfter` | <code>string</code> | No | Filter list to only include date ranges modified since this date (ISO8601 format). |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `newDefinition` | <code>boolean</code> | No | Use the new JSON def. Defaults to `false`. |
| `expansion` | <code>("definition"&#124;"ownerFullName"&#124;"modified"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"tags"&#124;"sharesFullName"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore")[]</code> | No | Comma-delimited list of additional date range metadata fields to include on response. |
| `curatedRsid` | <code>string</code> | No | Include the curatedItem status for given Rsid. |

**Returns:** `ResponsePageExpandedDateRange|error`

**Sample code:**

```ballerina
analytics:ResponsePageExpandedDateRange result = check analyticsClient->getDateRangesForUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": 1,
  "lastPage": false,
  "numberOfElements": 1,
  "firstPage": false,
  "size": 1,
  "totalPages": 1
}
```

</div>
</details>

<details>
<summary>createDateRange</summary>

<div>

Create a date range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `request` | <code>http:Request</code> | Yes | JSON-formatted Object containing date range keys/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `newDefinition` | <code>boolean</code> | No | Use the new JSON def. Defaults to `false`. |
| `expansion` | <code>("definition"&#124;"ownerFullName"&#124;"modified"&#124;"approved"&#124;"favorite"&#124;"shares"&#124;"tags"&#124;"sharesFullName"&#124;"usageSummary"&#124;"usageSummaryWithRelevancyScore")[]</code> | No | Comma-delimited list of additional date range metadata fields to include on response. |

**Returns:** `ExpandedDateRange|error`

**Sample code:**

```ballerina
http:Request request = new;
request.setJsonPayload({"name": "Last quarter", "definition": "2026-01-01T00:00:00/2026-04-01T00:00:00"});
analytics:ExpandedDateRange result = check analyticsClient->createDateRange("3fa85f64-5717-4562-b3fc-2c963f66afa6", request);
```

**Sample response:**

```json
{
  "template": false,
  "systemUserOwned": false,
  "disabledDate": "2026-01-15T00:00:00",
  "description": "Sample description",
  "companyId": 1,
  "approved": false
}
```

</div>
</details>

#### Dimensions

<details>
<summary>getDimensionsForReportSuite</summary>

<div>

Retrieve dimensions for a report suite.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `segmentable` | <code>true</code> | No | Only include dimensions that are valid within a segment. |
| `classifiable` | <code>boolean</code> | No | Only include classifiable dimensions. Defaults to `false`. |
| `rsid` | <code>string</code> | Yes | A report suite ID. |
| `reportable` | <code>true</code> | No | Only include dimensions that are valid within a report. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("tags"&#124;"allowedForReporting"&#124;"attributionModel"&#124;"categories"&#124;"allocationType"&#124;"expirationType"&#124;"expirationCustomDays"&#124;"dataType"&#124;"bindingEvents"&#124;"merchandisingSyntax")[]</code> | No | Add extra metadata to items (comma-delimited list). |

**Returns:** `AnalyticsDimension[]|error`

**Sample code:**

```ballerina
analytics:AnalyticsDimension[] result = check analyticsClient->getDimensionsForReportSuite("3fa85f64-5717-4562-b3fc-2c963f66afa6", rsid = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `AnalyticsDimension[]`.

</div>
</details>

<details>
<summary>getDimensionForReportSuite</summary>

<div>

Retrieve a dimension by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The dimension ID. For example a valid id is a value like 'evar1'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `rsid` | <code>string</code> | Yes | The report suite ID. |
| `locale` | <code>string</code> | No | The locale to use for returning system named dimensions. Defaults to `"en_US"`. |
| `expansion` | <code>("tags"&#124;"allowedForReporting"&#124;"attributionModel"&#124;"categories"&#124;"allocationType"&#124;"expirationType"&#124;"expirationCustomDays"&#124;"dataType"&#124;"bindingEvents"&#124;"merchandisingSyntax")[]</code> | No | Add extra metadata to items (comma-delimited list). |

**Returns:** `AnalyticsDimension|error`

**Sample code:**

```ballerina
analytics:AnalyticsDimension result = check analyticsClient->getDimensionForReportSuite("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", rsid = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "extraTitleInfo": "string",
  "parent": "string",
  "expirationType": "visit",
  "bindingEvents": [
    "string"
  ],
  "pathable": false,
  "dataType": "text"
}
```

</div>
</details>

#### Metrics

<details>
<summary>getMetricsForReportSuite</summary>

<div>

Retrieve metrics for a report suite.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `segmentable` | <code>boolean</code> | No | Filter the metrics by if they are valid in a segment. Defaults to `false`. |
| `rsid` | <code>string</code> | Yes | ID of desired report suite. |
| `locale` | <code>string</code> | No | Locale that system named metrics should be returned in. Defaults to `"en_US"`. |
| `expansion` | <code>("tags"&#124;"allowedForReporting"&#124;"categories")[]</code> | No | Add extra metadata to items (comma-delimited list). |

**Returns:** `AnalyticsMetric[]|error`

**Sample code:**

```ballerina
analytics:AnalyticsMetric[] result = check analyticsClient->getMetricsForReportSuite("3fa85f64-5717-4562-b3fc-2c963f66afa6", rsid = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `AnalyticsMetric[]`.

</div>
</details>

<details>
<summary>getMetricForReportSuite</summary>

<div>

Retrieve a metric by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The id of the metric for which to retrieve info. Note ids are values like pageviews, not metrics/pageviews. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `rsid` | <code>string</code> | Yes | ID of desired report suite. |
| `locale` | <code>string</code> | No | Locale that system named metrics should be returned in. Defaults to `"en_US"`. |
| `expansion` | <code>("tags"&#124;"allowedForReporting"&#124;"categories")[]</code> | No | Add extra metadata to items (comma-delimited list). |

**Returns:** `AnalyticsMetric|error`

**Sample code:**

```ballerina
analytics:AnalyticsMetric result = check analyticsClient->getMetricForReportSuite("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", rsid = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "extraTitleInfo": "string",
  "allocation": false,
  "precision": 1,
  "description": "Sample description",
  "allowedForReporting": false,
  "title": "string"
}
```

</div>
</details>

#### Projects

<details>
<summary>getProjectConfiguration</summary>

<div>

Retrieve project configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The Project id for which to retrieve information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"shares"&#124;"tags"&#124;"accessLevel"&#124;"modified"&#124;"externalReferences"&#124;"definition")[]</code> | No | Comma-delimited list of additional project metadata fields to include on response. |

**Returns:** `AnalyticsProject|error`

**Sample code:**

```ballerina
analytics:AnalyticsProject result = check analyticsClient->getProjectConfiguration("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "template": false,
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "accessLevel": "string",
  "migratedIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "created": "string",
  "siteTitle": "string"
}
```

</div>
</details>

<details>
<summary>updateProjectConfiguration</summary>

<div>

Update a project configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The Project id for which to retrieve information. |
| `request` | <code>http:Request</code> | Yes | JSON-formatted Object containing project keys/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"shares"&#124;"tags"&#124;"accessLevel"&#124;"modified"&#124;"externalReferences"&#124;"definition")[]</code> | No | Comma-delimited list of additional project metadata fields to include on response. |

**Returns:** `AnalyticsProject|error`

**Sample code:**

```ballerina
http:Request request = new;
request.setJsonPayload({"name": "Weekly traffic (updated)"});
analytics:AnalyticsProject result = check analyticsClient->updateProjectConfiguration("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", request);
```

**Sample response:**

```json
{
  "template": false,
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "accessLevel": "string",
  "migratedIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "created": "string",
  "siteTitle": "string"
}
```

</div>
</details>

<details>
<summary>deleteProject</summary>

<div>

Delete a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The Project id for which to retrieve information. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `DeleteResponse|error`

**Sample code:**

```ballerina
analytics:DeleteResponse result = check analyticsClient->deleteProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "result": "string",
  "message": "string"
}
```

</div>
</details>

<details>
<summary>validateProjectDefinition</summary>

<div>

Creates a valid project definition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>AnalyticsProject</code> | Yes | JSON-formatted Object containing key/value pairs for Project validation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |

**Returns:** `ProjectCompatibility|error`

**Sample code:**

```ballerina
analytics:ProjectCompatibility result = check analyticsClient->validateProjectDefinition("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    template: false,
    owner: {
        id: 1,
        name: "Sample name",
        login: "string"
    },
    accessLevel: "string",
    migratedIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

**Sample response:**

```json
{
  "valid": false,
  "validatorVersion": "string",
  "message": "string"
}
```

</div>
</details>

<details>
<summary>getProjectsOfUser</summary>

<div>

Retrieve user's projects.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pagination` | <code>"true"&#124;"false"</code> | No | Return paginated results. Defaults to `"false"`. |
| `includeType` | <code>("all"&#124;"shared")[]</code> | No | Include additional projects not owned by user. The "all" option takes precedence over "shared". If neither guided, or project is included, both types are returned. |
| `filterByIds` | <code>string</code> | No | Filter list to only include projects in the specified list (comma-delimited list of IDs). |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `ownerId` | <code>int:Signed32</code> | No | Filter list to only include projects owned by the specified loginId. |
| `expansion` | <code>("reportSuiteName"&#124;"shares"&#124;"tags"&#124;"accessLevel"&#124;"modified"&#124;"externalReferences"&#124;"definition")[]</code> | No | Comma-delimited list of additional project metadata fields to include on response. |

**Returns:** `AnalyticsProject[]|error`

**Sample code:**

```ballerina
analytics:AnalyticsProject[] result = check analyticsClient->getProjectsOfUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `AnalyticsProject[]`.

</div>
</details>

<details>
<summary>createProject</summary>

<div>

Create a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `request` | <code>http:Request</code> | Yes | JSON-formatted Object containing project keys/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"shares"&#124;"tags"&#124;"accessLevel"&#124;"modified"&#124;"externalReferences"&#124;"definition")[]</code> | No | Comma-delimited list of additional project metadata fields to include on response. |

**Returns:** `AnalyticsProject|error`

**Sample code:**

```ballerina
http:Request request = new;
request.setJsonPayload({"name": "Weekly traffic", "description": "Weekly traffic overview", "rsid": "examplersid"});
analytics:AnalyticsProject result = check analyticsClient->createProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", request);
```

**Sample response:**

```json
{
  "template": false,
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "accessLevel": "string",
  "migratedIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "created": "string",
  "siteTitle": "string"
}
```

</div>
</details>

#### Reports

<details>
<summary>runReport</summary>

<div>

Create a report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>RankedRequest</code> | Yes | Report request with dimension, metrics, filters and date range. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RankedReportData|error`

**Sample code:**

```ballerina
analytics:RankedReportData result = check analyticsClient->runReport("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    settings: {
        includeAnomalyDetection: false,
        countRepeatInstances: false,
        dimensionSort: "string"
    },
    search: {
        clause: "string",
        includeSearchTotal: false,
        itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    rsid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    anchorDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "number": 1,
  "request": {
    "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "anchorDate": "2026-01-15T00:00:00",
    "dimension": "string"
  },
  "firstPage": false,
  "lastPage": false,
  "numberOfElements": 1,
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>runRealtimeReport</summary>

<div>

Create a realtime report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>RankedRequest</code> | Yes | Realtime report request with dimension, metrics and filters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RankedReportData|error`

**Sample code:**

```ballerina
analytics:RankedReportData result = check analyticsClient->runRealtimeReport("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    settings: {
        includeAnomalyDetection: false,
        countRepeatInstances: false,
        dimensionSort: "string"
    },
    search: {
        clause: "string",
        includeSearchTotal: false,
        itemIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    },
    rsid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    anchorDate: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "number": 1,
  "request": {
    "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "anchorDate": "2026-01-15T00:00:00",
    "dimension": "string"
  },
  "firstPage": false,
  "lastPage": false,
  "numberOfElements": 1,
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>runTopItemReport</summary>

<div>

Retrieve top items report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `dateRange` | <code>string</code> | No | Format: YYYY-MM-DD/YYYY-MM-DD. |
| `endDate` | <code>string</code> | No | Format: YYYY-MM-DD. |
| `searchPhrase` | <code>string</code> | No | A full search phrase that will be searched for. |
| `rsid` | <code>string</code> | Yes | ID of desired report suite ie. myrsid. |
| `locale` | <code>string</code> | No | Locale that system named metrics should be returned in. Defaults to `"en_US"`. |
| `searchClause` | <code>string</code> | No | General search string; wrap with single quotes. Example: 'PageABC'. |
| `searchAnd` | <code>string</code> | No | Search terms that will be AND-ed together. Space delimited. |
| `lookupNoneValues` | <code>boolean</code> | No | Controls None values to be included. Defaults to `true`. |
| `searchNot` | <code>string</code> | No | Search terms that will be treated as NOT including. Space delimited. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `searchOr` | <code>string</code> | No | Search terms that will be OR-ed together. Space delimited. |
| `dimension` | <code>string</code> | Yes | Dimension to run the report against. Example: 'variables/page'. |
| `startDate` | <code>string</code> | No | Format: YYYY-MM-DD. |

**Returns:** `UnhashReportData|error`

**Sample code:**

```ballerina
analytics:UnhashReportData result = check analyticsClient->runTopItemReport("3fa85f64-5717-4562-b3fc-2c963f66afa6", rsid = "3fa85f64-5717-4562-b3fc-2c963f66afa6", dimension = "string");
```

**Sample response:**

```json
{
  "lastPage": false,
  "reportId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "searchPhrase": "string",
  "message": "string",
  "rows": [
    {
      "itemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "oberonRequestXML": "string"
}
```

</div>
</details>

#### Segments

<details>
<summary>getAllSegments</summary>

<div>

Retrieve all segments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `sortDirection` | <code>string</code> | No | Sort direction (ASC or DESC. Defaults to `"ASC"`. |
| `includeType` | <code>("shared"&#124;"all"&#124;"templates")[]</code> | No | Include additional segments not owned by user. The "all" option takes precedence over "shared". |
| `sortProperty` | <code>string</code> | No | Property to sort by (name, modified_date, id is currently allowed). Defaults to `"id"`. |
| `segmentFilter` | <code>string</code> | No | Filter list to only include segments in the specified list (comma-delimited list of IDs). |
| `name` | <code>string</code> | No | Filter list to only include segments that contains the Name. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `rsids` | <code>string</code> | No | Filter list to only include segments tied to specified RSID list (comma-delimited). |
| `filterByPublishedSegments` | <code>"all"&#124;"true"&#124;"false"</code> | No | Filter list to only include segments where the published field is set to one of the allowable values (all, true, false). Defaults to `"all"`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `locale` | <code>string</code> | No | Locale. Defaults to `"en_US"`. |
| `tagNames` | <code>string</code> | No | Filter list to only include segments that contains one of the tags. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"compatibility"&#124;"definition"&#124;"publishingStatus"&#124;"definitionLastModified"&#124;"categories")[]</code> | No | Comma-delimited list of additional segment metadata fields to include on response. |

**Returns:** `AnalyticsSegmentResponseItem|error`

**Sample code:**

```ballerina
analytics:AnalyticsSegmentResponseItem result = check analyticsClient->getAllSegments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "siteTitle": "string",
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tags": [
    {
      "name": "Sample name",
      "description": "Sample description",
      "id": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSegment</summary>

<div>

Create a segment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>AnalyticsSegment</code> | Yes | JSON-formatted Object containing key/value pairs for segment creation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Valid values include 'en_US', 'fr_FR', 'ja_JP', 'de_DE', 'es_ES', 'ko_KR', 'pt_BR', 'zh_CN', and 'zh_TW'. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"compatibility"&#124;"definition"&#124;"publishingStatus"&#124;"definitionLastModified"&#124;"categories")[]</code> | No | Comma-delimited list of additional segment metadata fields to include on response. |

**Returns:** `AnalyticsSegmentResponseItem|error`

**Sample code:**

```ballerina
analytics:AnalyticsSegmentResponseItem result = check analyticsClient->createSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    owner: {
        id: 1,
        name: "Sample name",
        login: "string"
    },
    created: "string",
    siteTitle: "string",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "siteTitle": "string",
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tags": [
    {
      "name": "Sample name",
      "description": "Sample description",
      "id": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>validateSegment</summary>

<div>

Create validation for segment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `payload` | <code>AnalyticsSegmentDefinition</code> | Yes | Segment definition. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `rsid` | <code>string</code> | Yes | RSID to run the report against. |

**Returns:** `SegmentCompatibility|error`

**Sample code:**

```ballerina
analytics:SegmentCompatibility result = check analyticsClient->validateSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    container: {
        func: "string",
        context: "string"
    },
    func: "string",
    version: [1]
}, rsid = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "valid": false,
  "validator_version": "string",
  "supported_schema": [
    "string"
  ],
  "supported_features": [
    "string"
  ],
  "message": "string",
  "supported_products": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getSegment</summary>

<div>

Retrieve a segment by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The segment ID to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Valid values include 'en_US', 'fr_FR', 'ja_JP', 'de_DE', 'es_ES', 'ko_KR', 'pt_BR', 'zh_CN', and 'zh_TW'. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"compatibility"&#124;"definition"&#124;"publishingStatus"&#124;"definitionLastModified"&#124;"categories")[]</code> | No | Comma-delimited list of additional segment metadata fields to include on response. |

**Returns:** `AnalyticsSegmentResponseItem|error`

**Sample code:**

```ballerina
analytics:AnalyticsSegmentResponseItem result = check analyticsClient->getSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "siteTitle": "string",
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tags": [
    {
      "name": "Sample name",
      "description": "Sample description",
      "id": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateSegment</summary>

<div>

Update a segment by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | Segment ID to be updated. |
| `payload` | <code>record &#123;&#124;record &#123;&#125;...;&#124;&#125;</code> | Yes | JSON-formatted Object containing key/value pairs to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Valid values include 'en_US', 'fr_FR', 'ja_JP', 'de_DE', 'es_ES', 'ko_KR', 'pt_BR', 'zh_CN', and 'zh_TW'. Defaults to `"en_US"`. |
| `expansion` | <code>("reportSuiteName"&#124;"ownerFullName"&#124;"modified"&#124;"tags"&#124;"compatibility"&#124;"definition"&#124;"publishingStatus"&#124;"definitionLastModified"&#124;"categories")[]</code> | No | Comma-delimited list of additional segment metadata fields to include on response. |

**Returns:** `AnalyticsSegmentResponseItem|error`

**Sample code:**

```ballerina
analytics:AnalyticsSegmentResponseItem result = check analyticsClient->updateSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {});
```

**Sample response:**

```json
{
  "owner": {
    "id": 1,
    "name": "Sample name",
    "login": "string"
  },
  "created": "string",
  "siteTitle": "string",
  "description": "Sample description",
  "rsid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tags": [
    {
      "name": "Sample name",
      "description": "Sample description",
      "id": 1
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteSegment</summary>

<div>

Delete a segment by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `id` | <code>string</code> | Yes | The segment ID to be deleted. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `locale` | <code>string</code> | No | Locale. Valid values include 'en_US', 'fr_FR', 'ja_JP', 'de_DE', 'es_ES', 'ko_KR', 'pt_BR', 'zh_CN', and 'zh_TW'. Defaults to `"en_US"`. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check analyticsClient->deleteSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

#### Users

<details>
<summary>listAllUsersForCompany</summary>

<div>

Retrieve users for current company.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'limit` | <code>int</code> | No | Number of results per page. Defaults to `10`. |
| `page` | <code>int</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |

**Returns:** `AnalyticsUser[]|error`

**Sample code:**

```ballerina
analytics:AnalyticsUser[] result = check analyticsClient->listAllUsersForCompany("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `AnalyticsUser[]`.

</div>
</details>

<details>
<summary>getCurrentUser</summary>

<div>

Retrieve current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AnalyticsUser|error`

**Sample code:**

```ballerina
analytics:AnalyticsUser result = check analyticsClient->getCurrentUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "lastName": "Sample name",
  "loginId": 1,
  "fullName": "Sample name",
  "lastAccess": "string",
  "login": "string",
  "title": "string"
}
```

</div>
</details>

#### Audit logs

<details>
<summary>getUsageAccessLogs</summary>

<div>

Retrieve logs for provided search criteria.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `globalCompanyId` | <code>string</code> | Yes | The Global Company ID for the Adobe Analytics organization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endDate` | <code>string</code> | No | End date for the maximum of a 3 month period. Defaults to `"2021-01-02T14:32:33-07"`. |
| `ip` | <code>string</code> | No | The IP address you want to filter logs by. |
| `'limit` | <code>int:Signed32</code> | No | Number of results per page. Defaults to `10`. |
| `rsid` | <code>string</code> | No | The report suite ID you want to filter logs by. |
| `eventType` | <code>string</code> | No | The numeric id for the event type you want to filter logs by. |
| `page` | <code>int:Signed32</code> | No | Page number (base 0 - first page is "0"). Defaults to `0`. |
| `login` | <code>string</code> | No | The login value of the user you want to filter logs by. |
| `event` | <code>string</code> | No | The event description you want to filter logs by. No wildcards permitted. |
| `startDate` | <code>string</code> | No | Start date for the maximum of a 3 month period. Defaults to `"2021-01-01T00:00:00-07"`. |

**Returns:** `ResponsePageUsageLogDto|error`

**Sample code:**

```ballerina
analytics:ResponsePageUsageLogDto result = check analyticsClient->getUsageAccessLogs("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "number": 1,
  "lastPage": false,
  "numberOfElements": 1,
  "firstPage": false,
  "size": 1,
  "totalPages": 1
}
```

</div>
</details>
