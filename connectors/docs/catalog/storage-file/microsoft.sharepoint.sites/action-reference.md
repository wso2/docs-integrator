# Actions

The `ballerinax/microsoft.sharepoint.sites` package exposes the following client:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage SharePoint sites, lists, content types, columns, drives, items, permissions, analytics, long-running operations, and term stores through the Microsoft Graph v1.0 API |

---

## Client

Provides operations to manage SharePoint sites, lists, content types, columns, drives, items, permissions, analytics, long-running operations, and term stores through the Microsoft Graph v1.0 API.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2ClientCredentialsGrantConfig&#124;http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | — | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | — | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | — | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | — | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | — | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | — | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | — | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side |

**OAuth2ClientCredentialsGrantConfig** (extends `http:OAuth2ClientCredentialsGrantConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tokenUrl` | <code>string</code> | `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token` | The token endpoint URL for OAuth2 client credentials grant |

### Initializing the client

```ballerina
import ballerinax/microsoft.sharepoint.sites;

sites:ConnectionConfig config = {
    auth: {
        clientId: "<clientId>",
        clientSecret: "<clientSecret>",
        tokenUrl: "https://login.microsoftonline.com/<tenantId>/oauth2/v2.0/token",
        scopes: ["https://graph.microsoft.com/.default"]
    }
};
sites:Client sharepointClient = check new (config);
```

### Operations

#### Site

<details>
<summary>listSite</summary>

Lists SharePoint sites accessible to the application across the tenant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListSiteQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `SiteCollectionResponse|error`

**Sample code:**

```ballerina
sites:SiteCollectionResponse result = check client->listSite();
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
  "value": [
    {
      "id": "contoso.sharepoint.com,site-id",
      "name": "Marketing",
      "displayName": "Marketing Team Site",
      "webUrl": "https://contoso.sharepoint.com/sites/marketing",
      "createdDateTime": "2024-01-15T10:00:00Z",
      "lastModifiedDateTime": "2024-06-01T08:30:00Z"
    }
  ]
}
```

</details>

<details>
<summary>getSite</summary>

Retrieves the metadata of a SharePoint site by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSiteQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Site|error`

**Sample code:**

```ballerina
sites:Site result = check client->getSite("site-id");
```

**Sample response:**

```json
{
  "id": "contoso.sharepoint.com,site-id",
  "name": "Marketing",
  "displayName": "Marketing Team Site",
  "webUrl": "https://contoso.sharepoint.com/sites/marketing",
  "createdDateTime": "2024-01-15T10:00:00Z",
  "lastModifiedDateTime": "2024-06-01T08:30:00Z"
}
```

</details>

<details>
<summary>updateSite</summary>

Updates a SharePoint site with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>Site</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:Site payload = {displayName: "Updated Marketing Site"};
check client->updateSite("site-id", payload);
```

</details>

#### Analytics

<details>
<summary>getAnalytics</summary>

Retrieves the item analytics resource for a site, summarizing access and activity statistics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetAnalyticsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ItemAnalytics|error`

**Sample code:**

```ballerina
sites:ItemAnalytics result = check client->getAnalytics("site-id");
```

**Sample response:**

```json
{
  "id": "analytics-id",
  "allTime": {
    "access": { "actionCount": 120, "actorCount": 25 }
  },
  "lastSevenDays": {
    "access": { "actionCount": 18, "actorCount": 6 }
  }
}
```

</details>

<details>
<summary>deleteAnalytics</summary>

Deletes the item analytics navigation property of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>DeleteAnalyticsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAnalytics("site-id");
```

</details>

<details>
<summary>updateAnalytics</summary>

Updates the item analytics navigation property of a site with new values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>ItemAnalytics</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ItemAnalytics payload = {};
check client->updateAnalytics("site-id", payload);
```

</details>

<details>
<summary>analyticsGetAllTime</summary>

Retrieves the all-time aggregated activity statistics for a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsGetAllTimeQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ItemActivityStat|error`

**Sample code:**

```ballerina
sites:ItemActivityStat result = check client->analyticsGetAllTime("site-id");
```

**Sample response:**

```json
{
  "id": "allTime",
  "startDateTime": "2018-01-01T00:00:00Z",
  "endDateTime": "2024-06-01T00:00:00Z",
  "access": { "actionCount": 120, "actorCount": 25 }
}
```

</details>

<details>
<summary>analyticsListItemActivityStats</summary>

Lists the item activity statistics for a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsListItemActivityStatsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ItemActivityStatCollectionResponse|error`

**Sample code:**

```ballerina
sites:ItemActivityStatCollectionResponse result = check client->analyticsListItemActivityStats("site-id");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('site-id')/analytics/itemActivityStats",
  "value": [
    {
      "id": "stat-id-1",
      "startDateTime": "2024-06-01T00:00:00Z",
      "endDateTime": "2024-06-02T00:00:00Z",
      "access": { "actionCount": 10, "actorCount": 3 }
    }
  ]
}
```

</details>

<details>
<summary>analyticsCreateItemActivityStats</summary>

Creates a new item activity stat under a site's analytics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>ItemActivityStat</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ItemActivityStat|error`

**Sample code:**

```ballerina
sites:ItemActivityStat payload = {
    startDateTime: "2024-06-01T00:00:00Z",
    endDateTime: "2024-06-02T00:00:00Z"
};
sites:ItemActivityStat result = check client->analyticsCreateItemActivityStats("site-id", payload);
```

**Sample response:**

```json
{
  "id": "stat-id-new",
  "startDateTime": "2024-06-01T00:00:00Z",
  "endDateTime": "2024-06-02T00:00:00Z"
}
```

</details>

<details>
<summary>analyticsGetItemActivityStats</summary>

Retrieves a single item activity stat by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsGetItemActivityStatsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ItemActivityStat|error`

**Sample code:**

```ballerina
sites:ItemActivityStat result = check client->analyticsGetItemActivityStats("site-id", "stat-id");
```

**Sample response:**

```json
{
  "id": "stat-id",
  "startDateTime": "2024-06-01T00:00:00Z",
  "endDateTime": "2024-06-02T00:00:00Z",
  "access": { "actionCount": 10, "actorCount": 3 }
}
```

</details>

<details>
<summary>analyticsDeleteItemActivityStats</summary>

Deletes an item activity stat from a site's analytics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `headers` | <code>AnalyticsDeleteItemActivityStatsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->analyticsDeleteItemActivityStats("site-id", "stat-id");
```

</details>

<details>
<summary>analyticsUpdateItemActivityStats</summary>

Updates an item activity stat with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `payload` | <code>ItemActivityStat</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ItemActivityStat payload = {};
check client->analyticsUpdateItemActivityStats("site-id", "stat-id", payload);
```

</details>

<details>
<summary>analyticsItemActivityStatsListActivities</summary>

Lists the item activities recorded under a specific item activity stat.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsItemActivityStatsListActivitiesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ItemActivityCollectionResponse|error`

**Sample code:**

```ballerina
sites:ItemActivityCollectionResponse result = check client->analyticsItemActivityStatsListActivities("site-id", "stat-id");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('site-id')/analytics/itemActivityStats('stat-id')/activities",
  "value": [
    {
      "id": "activity-id-1",
      "action": { "view": {} },
      "actor": { "user": { "displayName": "Adele Vance" } }
    }
  ]
}
```

</details>

<details>
<summary>analyticsItemActivityStatsCreateActivities</summary>

Creates a new item activity under an item activity stat.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `payload` | <code>ItemActivity</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ItemActivity|error`

**Sample code:**

```ballerina
sites:ItemActivity payload = {};
sites:ItemActivity result = check client->analyticsItemActivityStatsCreateActivities("site-id", "stat-id", payload);
```

**Sample response:**

```json
{
  "id": "activity-id-new",
  "action": { "edit": {} }
}
```

</details>

<details>
<summary>analyticsItemActivityStatsGetActivities</summary>

Retrieves a specific item activity by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `itemActivityId` | <code>string</code> | Yes | The unique identifier of the itemActivity |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsItemActivityStatsGetActivitiesQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ItemActivity|error`

**Sample code:**

```ballerina
sites:ItemActivity result = check client->analyticsItemActivityStatsGetActivities("site-id", "stat-id", "activity-id");
```

**Sample response:**

```json
{
  "id": "activity-id",
  "action": { "view": {} },
  "actor": { "user": { "displayName": "Adele Vance" } }
}
```

</details>

<details>
<summary>analyticsItemActivityStatsDeleteActivities</summary>

Deletes an item activity from an item activity stat.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `itemActivityId` | <code>string</code> | Yes | The unique identifier of the itemActivity |
| `headers` | <code>AnalyticsItemActivityStatsDeleteActivitiesHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->analyticsItemActivityStatsDeleteActivities("site-id", "stat-id", "activity-id");
```

</details>

<details>
<summary>analyticsItemActivityStatsUpdateActivities</summary>

Updates an item activity with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `itemActivityId` | <code>string</code> | Yes | The unique identifier of the itemActivity |
| `payload` | <code>ItemActivity</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ItemActivity payload = {};
check client->analyticsItemActivityStatsUpdateActivities("site-id", "stat-id", "activity-id", payload);
```

</details>

<details>
<summary>analyticsItemActivityStatsActivitiesGetDriveItem</summary>

Retrieves the drive item associated with an item activity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `itemActivityId` | <code>string</code> | Yes | The unique identifier of the itemActivity |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsItemActivityStatsActivitiesGetDriveItemQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `DriveItem|error`

**Sample code:**

```ballerina
sites:DriveItem result = check client->analyticsItemActivityStatsActivitiesGetDriveItem("site-id", "stat-id", "activity-id");
```

**Sample response:**

```json
{
  "id": "drive-item-id",
  "name": "Report.docx",
  "size": 24576,
  "webUrl": "https://contoso.sharepoint.com/sites/marketing/Documents/Report.docx"
}
```

</details>

<details>
<summary>analyticsItemActivityStatsActivitiesGetDriveItemContent</summary>

Retrieves the binary content of the drive item associated with an item activity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `itemActivityId` | <code>string</code> | Yes | The unique identifier of the itemActivity |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsItemActivityStatsActivitiesGetDriveItemContentQueries</code> | No | OData query parameters (`$format`) |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check client->analyticsItemActivityStatsActivitiesGetDriveItemContent("site-id", "stat-id", "activity-id");
```

</details>

<details>
<summary>analyticsItemActivityStatsActivitiesUpdateDriveItemContent</summary>

Updates the binary content of the drive item associated with an item activity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `itemActivityId` | <code>string</code> | Yes | The unique identifier of the itemActivity |
| `payload` | <code>byte[]</code> | Yes | New binary content |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
byte[] payload = [];
check client->analyticsItemActivityStatsActivitiesUpdateDriveItemContent("site-id", "stat-id", "activity-id", payload);
```

</details>

<details>
<summary>analyticsItemActivityStatsActivitiesGetCount972d</summary>

Gets the total count of activities under an item activity stat.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `itemActivityStatId` | <code>string</code> | Yes | The unique identifier of the itemActivityStat |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsItemActivityStatsActivitiesGetCount972dQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->analyticsItemActivityStatsActivitiesGetCount972d("site-id", "stat-id");
```

**Sample response:**

```json
"12"
```

</details>

<details>
<summary>analyticsItemActivityStatsGetCountC4ac</summary>

Gets the total count of item activity stats under a site's analytics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsItemActivityStatsGetCountC4acQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->analyticsItemActivityStatsGetCountC4ac("site-id");
```

**Sample response:**

```json
"7"
```

</details>

<details>
<summary>analyticsGetLastSevenDays</summary>

Retrieves the aggregated activity statistics for the last seven days for a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*AnalyticsGetLastSevenDaysQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ItemActivityStat|error`

**Sample code:**

```ballerina
sites:ItemActivityStat result = check client->analyticsGetLastSevenDays("site-id");
```

**Sample response:**

```json
{
  "id": "lastSevenDays",
  "startDateTime": "2024-06-05T00:00:00Z",
  "endDateTime": "2024-06-12T00:00:00Z",
  "access": { "actionCount": 18, "actorCount": 6 }
}
```

</details>

<details>
<summary>getActivitiesByInterval96b0</summary>

Invokes the `getActivitiesByInterval` function on a site to return activity statistics aggregated using the default interval.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetActivitiesByInterval96b0Queries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfItemActivityStat|error`

**Sample code:**

```ballerina
sites:CollectionOfItemActivityStat result = check client->getActivitiesByInterval96b0("site-id");
```

**Sample response:**

```json
{
  "value": [
    {
      "startDateTime": "2024-06-01T00:00:00Z",
      "endDateTime": "2024-06-02T00:00:00Z",
      "access": { "actionCount": 10, "actorCount": 3 }
    }
  ]
}
```

</details>

<details>
<summary>getActivitiesByInterval9468</summary>

Invokes the `getActivitiesByInterval` function on a site with explicit `startDateTime`, `endDateTime`, and `interval` parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `startDateTime` | <code>string?</code> | Yes | The start date and time of the interval (`startDateTime='{startDateTime}'`) |
| `endDateTime` | <code>string?</code> | Yes | The end date and time of the interval (`endDateTime='{endDateTime}'`) |
| `interval` | <code>string?</code> | Yes | The aggregation interval (`interval='{interval}'`) |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetActivitiesByInterval9468Queries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfItemActivityStat|error`

**Sample code:**

```ballerina
sites:CollectionOfItemActivityStat result = check client->getActivitiesByInterval9468(
    "site-id", "2024-06-01", "2024-06-08", "day");
```

**Sample response:**

```json
{
  "value": [
    {
      "startDateTime": "2024-06-01T00:00:00Z",
      "endDateTime": "2024-06-02T00:00:00Z",
      "access": { "actionCount": 4, "actorCount": 2 }
    }
  ]
}
```

</details>

#### Columns

<details>
<summary>listColumns</summary>

Lists the column definitions of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListColumnsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnDefinitionCollectionResponse result = check client->listColumns("site-id");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('site-id')/columns",
  "value": [
    {
      "id": "column-id-1",
      "name": "Title",
      "displayName": "Title",
      "required": true,
      "text": { "maxLength": 255 }
    }
  ]
}
```

</details>

<details>
<summary>createColumns</summary>

Creates a new column definition on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>ColumnDefinition</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition payload = {
    name: "Department",
    displayName: "Department",
    text: {}
};
sites:ColumnDefinition result = check client->createColumns("site-id", payload);
```

**Sample response:**

```json
{
  "id": "column-id-new",
  "name": "Department",
  "displayName": "Department",
  "text": {}
}
```

</details>

<details>
<summary>getColumns</summary>

Retrieves a column definition by its identifier from a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetColumnsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition result = check client->getColumns("site-id", "column-id");
```

**Sample response:**

```json
{
  "id": "column-id",
  "name": "Title",
  "displayName": "Title",
  "required": true,
  "text": { "maxLength": 255 }
}
```

</details>

<details>
<summary>deleteColumns</summary>

Deletes a column definition from a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>DeleteColumnsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteColumns("site-id", "column-id");
```

</details>

<details>
<summary>updateColumns</summary>

Updates a column definition with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `payload` | <code>ColumnDefinition</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ColumnDefinition payload = {displayName: "Renamed Column"};
check client->updateColumns("site-id", "column-id", payload);
```

</details>

<details>
<summary>columnsGetSourceColumn</summary>

Retrieves the source column from which a derived column inherits its definition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ColumnsGetSourceColumnQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition result = check client->columnsGetSourceColumn("site-id", "column-id");
```

**Sample response:**

```json
{
  "id": "source-column-id",
  "name": "Title",
  "displayName": "Title"
}
```

</details>

<details>
<summary>columnsGetCountA8bb</summary>

Gets the total count of column definitions on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ColumnsGetCountA8bbQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->columnsGetCountA8bb("site-id");
```

**Sample response:**

```json
"8"
```

</details>

#### Content Types

<details>
<summary>listContentTypes</summary>

Lists the content types defined on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListContentTypesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ContentTypeCollectionResponse|error`

**Sample code:**

```ballerina
sites:ContentTypeCollectionResponse result = check client->listContentTypes("site-id");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('site-id')/contentTypes",
  "value": [
    {
      "id": "0x0101",
      "name": "Document",
      "description": "Create a new document.",
      "group": "Document Content Types"
    }
  ]
}
```

</details>

<details>
<summary>createContentTypes</summary>

Creates a new content type on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>ContentType</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ContentType|error`

**Sample code:**

```ballerina
sites:ContentType payload = {
    name: "Press Release",
    description: "Press release content type",
    group: "Marketing"
};
sites:ContentType result = check client->createContentTypes("site-id", payload);
```

**Sample response:**

```json
{
  "id": "0x0101009A",
  "name": "Press Release",
  "description": "Press release content type",
  "group": "Marketing"
}
```

</details>

<details>
<summary>getContentTypes</summary>

Retrieves a content type by its identifier from a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetContentTypesQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ContentType|error`

**Sample code:**

```ballerina
sites:ContentType result = check client->getContentTypes("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "id": "0x0101",
  "name": "Document",
  "description": "Create a new document.",
  "group": "Document Content Types"
}
```

</details>

<details>
<summary>deleteContentTypes</summary>

Deletes a content type from a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>DeleteContentTypesHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteContentTypes("site-id", "content-type-id");
```

</details>

<details>
<summary>updateContentTypes</summary>

Updates a content type with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `payload` | <code>ContentType</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ContentType payload = {description: "Updated description"};
check client->updateContentTypes("site-id", "content-type-id", payload);
```

</details>

<details>
<summary>contentTypesGetBase</summary>

Retrieves the parent (base) content type of a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetBaseQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ContentType|error`

**Sample code:**

```ballerina
sites:ContentType result = check client->contentTypesGetBase("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "id": "0x0101",
  "name": "Document",
  "group": "Document Content Types"
}
```

</details>

<details>
<summary>contentTypesListBaseTypes</summary>

Lists the ancestor (base) content types of a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesListBaseTypesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ContentTypeCollectionResponse|error`

**Sample code:**

```ballerina
sites:ContentTypeCollectionResponse result = check client->contentTypesListBaseTypes("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "0x01", "name": "Item" },
    { "id": "0x0101", "name": "Document" }
  ]
}
```

</details>

<details>
<summary>contentTypesGetBaseTypes</summary>

Retrieves a specific ancestor content type of a content type by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `contentTypeId1` | <code>string</code> | Yes | The unique identifier of the base contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetBaseTypesQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ContentType|error`

**Sample code:**

```ballerina
sites:ContentType result = check client->contentTypesGetBaseTypes("site-id", "content-type-id", "base-content-type-id");
```

**Sample response:**

```json
{
  "id": "0x01",
  "name": "Item"
}
```

</details>

<details>
<summary>contentTypesBaseTypesGetCount6b07</summary>

Gets the total count of ancestor content types of a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesBaseTypesGetCount6b07Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->contentTypesBaseTypesGetCount6b07("site-id", "content-type-id");
```

**Sample response:**

```json
"3"
```

</details>

<details>
<summary>contentTypesListColumnLinks</summary>

Lists the column links of a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesListColumnLinksQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnLinkCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnLinkCollectionResponse result = check client->contentTypesListColumnLinks("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "column-link-1", "name": "Title" }
  ]
}
```

</details>

<details>
<summary>contentTypesCreateColumnLinks</summary>

Creates a new column link on a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `payload` | <code>ColumnLink</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ColumnLink|error`

**Sample code:**

```ballerina
sites:ColumnLink payload = {name: "Department"};
sites:ColumnLink result = check client->contentTypesCreateColumnLinks("site-id", "content-type-id", payload);
```

**Sample response:**

```json
{
  "id": "column-link-new",
  "name": "Department"
}
```

</details>

<details>
<summary>contentTypesGetColumnLinks</summary>

Retrieves a column link of a content type by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnLinkId` | <code>string</code> | Yes | The unique identifier of the columnLink |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetColumnLinksQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnLink|error`

**Sample code:**

```ballerina
sites:ColumnLink result = check client->contentTypesGetColumnLinks("site-id", "content-type-id", "column-link-id");
```

**Sample response:**

```json
{
  "id": "column-link-id",
  "name": "Title"
}
```

</details>

<details>
<summary>contentTypesDeleteColumnLinks</summary>

Deletes a column link from a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnLinkId` | <code>string</code> | Yes | The unique identifier of the columnLink |
| `headers` | <code>ContentTypesDeleteColumnLinksHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->contentTypesDeleteColumnLinks("site-id", "content-type-id", "column-link-id");
```

</details>

<details>
<summary>contentTypesUpdateColumnLinks</summary>

Updates a column link of a content type with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnLinkId` | <code>string</code> | Yes | The unique identifier of the columnLink |
| `payload` | <code>ColumnLink</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ColumnLink payload = {name: "RenamedColumn"};
check client->contentTypesUpdateColumnLinks("site-id", "content-type-id", "column-link-id", payload);
```

</details>

<details>
<summary>contentTypesColumnLinksGetCount7bc1</summary>

Gets the total count of column links on a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesColumnLinksGetCount7bc1Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->contentTypesColumnLinksGetCount7bc1("site-id", "content-type-id");
```

**Sample response:**

```json
"5"
```

</details>

<details>
<summary>contentTypesListColumnPositions</summary>

Lists the column definitions in the order they appear on a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesListColumnPositionsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnDefinitionCollectionResponse result = check client->contentTypesListColumnPositions("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "column-id-1", "name": "Title" },
    { "id": "column-id-2", "name": "Department" }
  ]
}
```

</details>

<details>
<summary>contentTypesGetColumnPositions</summary>

Retrieves a column at a specific position on a content type by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetColumnPositionsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition result = check client->contentTypesGetColumnPositions("site-id", "content-type-id", "column-id");
```

**Sample response:**

```json
{
  "id": "column-id",
  "name": "Title",
  "displayName": "Title"
}
```

</details>

<details>
<summary>contentTypesColumnPositionsGetCountDea9</summary>

Gets the total count of column positions on a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesColumnPositionsGetCountDea9Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->contentTypesColumnPositionsGetCountDea9("site-id", "content-type-id");
```

**Sample response:**

```json
"4"
```

</details>

<details>
<summary>contentTypesListColumns</summary>

Lists the columns of a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesListColumnsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnDefinitionCollectionResponse result = check client->contentTypesListColumns("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "column-id-1", "name": "Title", "displayName": "Title" }
  ]
}
```

</details>

<details>
<summary>contentTypesCreateColumns</summary>

Creates a new column on a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `payload` | <code>ColumnDefinition</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition payload = {name: "Owner", displayName: "Owner", text: {}};
sites:ColumnDefinition result = check client->contentTypesCreateColumns("site-id", "content-type-id", payload);
```

**Sample response:**

```json
{
  "id": "column-id-new",
  "name": "Owner",
  "displayName": "Owner"
}
```

</details>

<details>
<summary>contentTypesGetColumns</summary>

Retrieves a column of a content type by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetColumnsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition result = check client->contentTypesGetColumns("site-id", "content-type-id", "column-id");
```

**Sample response:**

```json
{
  "id": "column-id",
  "name": "Title",
  "displayName": "Title"
}
```

</details>

<details>
<summary>contentTypesDeleteColumns</summary>

Deletes a column from a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>ContentTypesDeleteColumnsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->contentTypesDeleteColumns("site-id", "content-type-id", "column-id");
```

</details>

<details>
<summary>contentTypesUpdateColumns</summary>

Updates a column of a content type with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `payload` | <code>ColumnDefinition</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ColumnDefinition payload = {displayName: "Renamed"};
check client->contentTypesUpdateColumns("site-id", "content-type-id", "column-id", payload);
```

</details>

<details>
<summary>contentTypesColumnsGetSourceColumn</summary>

Retrieves the source column from which a content type's column inherits its definition.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesColumnsGetSourceColumnQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition result = check client->contentTypesColumnsGetSourceColumn("site-id", "content-type-id", "column-id");
```

**Sample response:**

```json
{
  "id": "source-column-id",
  "name": "Title",
  "displayName": "Title"
}
```

</details>

<details>
<summary>contentTypesColumnsGetCount896b</summary>

Gets the total count of columns on a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesColumnsGetCount896bQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->contentTypesColumnsGetCount896b("site-id", "content-type-id");
```

**Sample response:**

```json
"6"
```

</details>

<details>
<summary>contentTypesContentTypeAssociateWithHubSites</summary>

Associates a content type with a list of hub sites, optionally propagating it to lists that already use it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `payload` | <code>ContentTypeIdAssociateWithHubSitesBody</code> | Yes | List of hub site URLs and propagation flag |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ContentTypeIdAssociateWithHubSitesBody payload = {
    hubSiteUrls: ["https://contoso.sharepoint.com/sites/hub"],
    propagateToExistingLists: true
};
check client->contentTypesContentTypeAssociateWithHubSites("site-id", "content-type-id", payload);
```

</details>

<details>
<summary>contentTypesContentTypeCopyToDefaultContentLocation</summary>

Copies a file to the default content location for a content type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `payload` | <code>ContentTypeIdCopyToDefaultContentLocationBody</code> | Yes | Source file reference and target destination file name |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ContentTypeIdCopyToDefaultContentLocationBody payload = {
    sourceFile: {driveId: "drive-id", id: "item-id"},
    destinationFileName: "Template.docx"
};
check client->contentTypesContentTypeCopyToDefaultContentLocation("site-id", "content-type-id", payload);
```

</details>

<details>
<summary>contentTypesContentTypeIsPublished</summary>

Indicates whether a content type is published to the content type hub.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `BooleanValueResponse|error`

**Sample code:**

```ballerina
sites:BooleanValueResponse result = check client->contentTypesContentTypeIsPublished("site-id", "content-type-id");
```

**Sample response:**

```json
{
  "value": true
}
```

</details>

<details>
<summary>contentTypesContentTypePublish</summary>

Publishes a content type from the content type hub so it is available across sites.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->contentTypesContentTypePublish("site-id", "content-type-id");
```

</details>

<details>
<summary>contentTypesContentTypeUnpublish</summary>

Unpublishes a content type from the content type hub.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `contentTypeId` | <code>string</code> | Yes | The unique identifier of the contentType |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->contentTypesContentTypeUnpublish("site-id", "content-type-id");
```

</details>

<details>
<summary>contentTypesGetCount50aa</summary>

Gets the total count of content types on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetCount50aaQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->contentTypesGetCount50aa("site-id");
```

**Sample response:**

```json
"15"
```

</details>

<details>
<summary>contentTypesAddCopy</summary>

Adds a copy of a content type from another location on the site collection to a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>ContentTypesAddCopyBody</code> | Yes | URL or identifier of the content type to copy |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ContentTypeOrNullResponse|error`

**Sample code:**

```ballerina
sites:ContentTypesAddCopyBody payload = {contentType: "https://contoso.sharepoint.com/_cts/Document"};
sites:ContentTypeOrNullResponse result = check client->contentTypesAddCopy("site-id", payload);
```

**Sample response:**

```json
{
  "id": "0x0101009A",
  "name": "Document",
  "group": "Document Content Types"
}
```

</details>

<details>
<summary>contentTypesAddCopyFromContentTypeHub</summary>

Adds a copy of a content type from the content type hub to a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>ContentTypesAddCopyFromContentTypeHubBody</code> | Yes | Identifier of the hub content type to copy |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ContentTypeOrNullResponse|error`

**Sample code:**

```ballerina
sites:ContentTypesAddCopyFromContentTypeHubBody payload = {contentTypeId: "0x0101009A"};
sites:ContentTypeOrNullResponse result = check client->contentTypesAddCopyFromContentTypeHub("site-id", payload);
```

**Sample response:**

```json
{
  "id": "0x0101009A",
  "name": "Press Release",
  "group": "Marketing"
}
```

</details>

<details>
<summary>contentTypesGetCompatibleHubContentTypes</summary>

Lists the content types from the content type hub that are compatible with a site and can be added to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ContentTypesGetCompatibleHubContentTypesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfContentType|error`

**Sample code:**

```ballerina
sites:CollectionOfContentType result = check client->contentTypesGetCompatibleHubContentTypes("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "0x0101009A", "name": "Press Release" }
  ]
}
```

</details>

#### Created By User

<details>
<summary>getCreatedByUser</summary>

Retrieves the user who created the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetCreatedByUserQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
sites:User result = check client->getCreatedByUser("site-id");
```

**Sample response:**

```json
{
  "id": "user-id",
  "displayName": "Adele Vance",
  "userPrincipalName": "adele@contoso.com"
}
```

</details>

<details>
<summary>createdByUserGetMailboxSettings</summary>

Retrieves the mailbox settings of the user who created the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*CreatedByUserGetMailboxSettingsQueries</code> | No | OData query parameters (`$select`) |

**Returns:** `MailboxSettings|error`

**Sample code:**

```ballerina
sites:MailboxSettings result = check client->createdByUserGetMailboxSettings("site-id");
```

**Sample response:**

```json
{
  "timeZone": "Pacific Standard Time",
  "language": { "locale": "en-US" }
}
```

</details>

<details>
<summary>createdByUserUpdateMailboxSettings</summary>

Updates the mailbox settings of the user who created the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>MailboxSettings</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:MailboxSettings payload = {timeZone: "Eastern Standard Time"};
check client->createdByUserUpdateMailboxSettings("site-id", payload);
```

</details>

<details>
<summary>createdByUserListServiceProvisioningErrors</summary>

Lists the service provisioning errors for the user who created the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*CreatedByUserListServiceProvisioningErrorsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$count`) |

**Returns:** `ServiceProvisioningErrorCollectionResponse|error`

**Sample code:**

```ballerina
sites:ServiceProvisioningErrorCollectionResponse result = check client->createdByUserListServiceProvisioningErrors("site-id");
```

**Sample response:**

```json
{
  "value": []
}
```

</details>

<details>
<summary>createdByUserServiceProvisioningErrorsGetCountC398</summary>

Gets the total count of service provisioning errors for the user who created the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*CreatedByUserServiceProvisioningErrorsGetCountC398Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->createdByUserServiceProvisioningErrorsGetCountC398("site-id");
```

**Sample response:**

```json
"0"
```

</details>

#### Drives

<details>
<summary>getDrive</summary>

Retrieves the default document library (drive) for a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetDriveQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Drive|error`

**Sample code:**

```ballerina
sites:Drive result = check client->getDrive("site-id");
```

**Sample response:**

```json
{
  "id": "drive-id",
  "name": "Documents",
  "driveType": "documentLibrary",
  "webUrl": "https://contoso.sharepoint.com/sites/marketing/Shared%20Documents"
}
```

</details>

<details>
<summary>listDrives</summary>

Lists all document libraries (drives) available on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListDrivesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `DriveCollectionResponse|error`

**Sample code:**

```ballerina
sites:DriveCollectionResponse result = check client->listDrives("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "drive-id-1", "name": "Documents", "driveType": "documentLibrary" }
  ]
}
```

</details>

<details>
<summary>getDrives</summary>

Retrieves a specific document library (drive) of a site by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `driveId` | <code>string</code> | Yes | The unique identifier of the drive |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetDrivesQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Drive|error`

**Sample code:**

```ballerina
sites:Drive result = check client->getDrives("site-id", "drive-id");
```

**Sample response:**

```json
{
  "id": "drive-id",
  "name": "Documents",
  "driveType": "documentLibrary"
}
```

</details>

<details>
<summary>drivesGetCount5071</summary>

Gets the total count of drives on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*DrivesGetCount5071Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->drivesGetCount5071("site-id");
```

**Sample response:**

```json
"2"
```

</details>

#### External Columns

<details>
<summary>listExternalColumns</summary>

Lists the externally provisioned column definitions of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListExternalColumnsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnDefinitionCollectionResponse result = check client->listExternalColumns("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "external-column-id-1", "name": "ExternalRef", "displayName": "External Reference" }
  ]
}
```

</details>

<details>
<summary>getExternalColumns</summary>

Retrieves an externally provisioned column definition by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `columnDefinitionId` | <code>string</code> | Yes | The unique identifier of the columnDefinition |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetExternalColumnsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition result = check client->getExternalColumns("site-id", "column-id");
```

**Sample response:**

```json
{
  "id": "column-id",
  "name": "ExternalRef",
  "displayName": "External Reference"
}
```

</details>

<details>
<summary>externalColumnsGetCount3855</summary>

Gets the total count of external column definitions on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ExternalColumnsGetCount3855Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->externalColumnsGetCount3855("site-id");
```

**Sample response:**

```json
"1"
```

</details>

#### Items

<details>
<summary>listItems</summary>

Lists the base items of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListItemsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `BaseItemCollectionResponse|error`

**Sample code:**

```ballerina
sites:BaseItemCollectionResponse result = check client->listItems("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "item-id-1", "name": "Document1", "webUrl": "https://contoso.sharepoint.com/sites/marketing/Document1" }
  ]
}
```

</details>

<details>
<summary>getItems</summary>

Retrieves a base item from a site by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseItemId` | <code>string</code> | Yes | The unique identifier of the baseItem |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetItemsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `BaseItem|error`

**Sample code:**

```ballerina
sites:BaseItem result = check client->getItems("site-id", "item-id");
```

**Sample response:**

```json
{
  "id": "item-id",
  "name": "Document1",
  "webUrl": "https://contoso.sharepoint.com/sites/marketing/Document1"
}
```

</details>

<details>
<summary>itemsGetCount1b67</summary>

Gets the total count of base items on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ItemsGetCount1b67Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->itemsGetCount1b67("site-id");
```

**Sample response:**

```json
"23"
```

</details>

#### Last Modified By User

<details>
<summary>getLastModifiedByUser</summary>

Retrieves the user who last modified the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetLastModifiedByUserQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
sites:User result = check client->getLastModifiedByUser("site-id");
```

**Sample response:**

```json
{
  "id": "user-id",
  "displayName": "Megan Bowen",
  "userPrincipalName": "megan@contoso.com"
}
```

</details>

<details>
<summary>lastModifiedByUserGetMailboxSettings</summary>

Retrieves the mailbox settings of the user who last modified the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*LastModifiedByUserGetMailboxSettingsQueries</code> | No | OData query parameters (`$select`) |

**Returns:** `MailboxSettings|error`

**Sample code:**

```ballerina
sites:MailboxSettings result = check client->lastModifiedByUserGetMailboxSettings("site-id");
```

**Sample response:**

```json
{
  "timeZone": "Pacific Standard Time",
  "language": { "locale": "en-US" }
}
```

</details>

<details>
<summary>lastModifiedByUserUpdateMailboxSettings</summary>

Updates the mailbox settings of the user who last modified the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>MailboxSettings</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:MailboxSettings payload = {timeZone: "UTC"};
check client->lastModifiedByUserUpdateMailboxSettings("site-id", payload);
```

</details>

<details>
<summary>lastModifiedByUserListServiceProvisioningErrors</summary>

Lists the service provisioning errors for the user who last modified the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*LastModifiedByUserListServiceProvisioningErrorsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$count`) |

**Returns:** `ServiceProvisioningErrorCollectionResponse|error`

**Sample code:**

```ballerina
sites:ServiceProvisioningErrorCollectionResponse result = check client->lastModifiedByUserListServiceProvisioningErrors("site-id");
```

**Sample response:**

```json
{
  "value": []
}
```

</details>

<details>
<summary>lastModifiedByUserServiceProvisioningErrorsGetCount4573</summary>

Gets the total count of service provisioning errors for the user who last modified the site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*LastModifiedByUserServiceProvisioningErrorsGetCount4573Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->lastModifiedByUserServiceProvisioningErrorsGetCount4573("site-id");
```

**Sample response:**

```json
"0"
```

</details>

#### Applicable Content Types For List

<details>
<summary>getApplicableContentTypesForList</summary>

Invokes the `getApplicableContentTypesForList` function to return the content types that are applicable to a specific list on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `listId` | <code>string</code> | Yes | The unique identifier of the list (`listId='{listId}'`) |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetApplicableContentTypesForListQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfContentType|error`

**Sample code:**

```ballerina
sites:CollectionOfContentType result = check client->getApplicableContentTypesForList("site-id", "list-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "0x0101", "name": "Document", "group": "Document Content Types" }
  ]
}
```

</details>

#### Site By Path

<details>
<summary>getByPath</summary>

Resolves a SharePoint site by its server-relative path under a site collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site (`path='{path}'`) |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `SiteOrNullResponse|error`

**Sample code:**

```ballerina
sites:SiteOrNullResponse result = check client->getByPath("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "contoso.sharepoint.com,collection-id,site-id",
  "name": "Marketing",
  "webUrl": "https://contoso.sharepoint.com/sites/marketing"
}
```

</details>

<details>
<summary>getByPathGetAnalytics</summary>

Retrieves the item analytics resource of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetAnalyticsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `ItemAnalytics|error`

**Sample code:**

```ballerina
sites:ItemAnalytics result = check client->getByPathGetAnalytics("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "analytics-id",
  "allTime": { "access": { "actionCount": 120, "actorCount": 25 } }
}
```

</details>

<details>
<summary>getByPathDeleteAnalytics</summary>

Deletes the item analytics navigation property of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>GetByPathDeleteAnalyticsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->getByPathDeleteAnalytics("site-id", "/sites/marketing");
```

</details>

<details>
<summary>getByPathUpdateAnalytics</summary>

Updates the item analytics navigation property of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>ItemAnalytics</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:ItemAnalytics payload = {};
check client->getByPathUpdateAnalytics("site-id", "/sites/marketing", payload);
```

</details>

<details>
<summary>getByPathListColumns</summary>

Lists the column definitions of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListColumnsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnDefinitionCollectionResponse result = check client->getByPathListColumns("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "column-id-1", "name": "Title", "displayName": "Title" }
  ]
}
```

</details>

<details>
<summary>getByPathCreateColumns</summary>

Creates a new column definition on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>ColumnDefinition</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ColumnDefinition|error`

**Sample code:**

```ballerina
sites:ColumnDefinition payload = {name: "Department", displayName: "Department", text: {}};
sites:ColumnDefinition result = check client->getByPathCreateColumns("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "column-id-new",
  "name": "Department",
  "displayName": "Department"
}
```

</details>

<details>
<summary>getByPathListContentTypes</summary>

Lists the content types of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListContentTypesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ContentTypeCollectionResponse|error`

**Sample code:**

```ballerina
sites:ContentTypeCollectionResponse result = check client->getByPathListContentTypes("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "0x0101", "name": "Document" }
  ]
}
```

</details>

<details>
<summary>getByPathCreateContentTypes</summary>

Creates a content type on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>ContentType</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `ContentType|error`

**Sample code:**

```ballerina
sites:ContentType payload = {name: "Press Release", group: "Marketing"};
sites:ContentType result = check client->getByPathCreateContentTypes("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "0x0101009A",
  "name": "Press Release",
  "group": "Marketing"
}
```

</details>

<details>
<summary>getByPathGetCreatedByUser</summary>

Retrieves the user who created a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetCreatedByUserQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
sites:User result = check client->getByPathGetCreatedByUser("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "user-id",
  "displayName": "Adele Vance"
}
```

</details>

<details>
<summary>getByPathGetDrive</summary>

Retrieves the default document library (drive) of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetDriveQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Drive|error`

**Sample code:**

```ballerina
sites:Drive result = check client->getByPathGetDrive("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "drive-id",
  "name": "Documents",
  "driveType": "documentLibrary"
}
```

</details>

<details>
<summary>getByPathListDrives</summary>

Lists the document libraries (drives) of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListDrivesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `DriveCollectionResponse|error`

**Sample code:**

```ballerina
sites:DriveCollectionResponse result = check client->getByPathListDrives("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "drive-id-1", "name": "Documents" }
  ]
}
```

</details>

<details>
<summary>getByPathListExternalColumns</summary>

Lists the externally provisioned column definitions of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListExternalColumnsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ColumnDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
sites:ColumnDefinitionCollectionResponse result = check client->getByPathListExternalColumns("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": []
}
```

</details>

<details>
<summary>getByPathListItems</summary>

Lists the base items of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListItemsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `BaseItemCollectionResponse|error`

**Sample code:**

```ballerina
sites:BaseItemCollectionResponse result = check client->getByPathListItems("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "item-id-1", "name": "Document1" }
  ]
}
```

</details>

<details>
<summary>getByPathGetLastModifiedByUser</summary>

Retrieves the user who last modified a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetLastModifiedByUserQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
sites:User result = check client->getByPathGetLastModifiedByUser("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "user-id",
  "displayName": "Megan Bowen"
}
```

</details>

<details>
<summary>getByPathListLists</summary>

Lists the SharePoint lists on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListListsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `ListCollectionResponse|error`

**Sample code:**

```ballerina
sites:ListCollectionResponse result = check client->getByPathListLists("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "list-id-1", "displayName": "Documents", "name": "Shared Documents" }
  ]
}
```

</details>

<details>
<summary>getByPathCreateLists</summary>

Creates a SharePoint list on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>List</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `List|error`

**Sample code:**

```ballerina
sites:List payload = {displayName: "Announcements", list: {template: "announcements"}};
sites:List result = check client->getByPathCreateLists("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "list-id-new",
  "displayName": "Announcements",
  "name": "Announcements"
}
```

</details>

<details>
<summary>getByPathGetActivitiesByInterval96b0</summary>

Invokes the `getActivitiesByInterval` function on a site resolved by path using the default interval.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetActivitiesByInterval96b0Queries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfItemActivityStat|error`

**Sample code:**

```ballerina
sites:CollectionOfItemActivityStat result = check client->getByPathGetActivitiesByInterval96b0("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    {
      "startDateTime": "2024-06-01T00:00:00Z",
      "endDateTime": "2024-06-02T00:00:00Z",
      "access": { "actionCount": 10, "actorCount": 3 }
    }
  ]
}
```

</details>

<details>
<summary>getByPathGetActivitiesByInterval9468</summary>

Invokes the `getActivitiesByInterval` function on a site resolved by path with explicit `startDateTime`, `endDateTime`, and `interval` parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `startDateTime` | <code>string?</code> | Yes | The start date and time of the interval |
| `endDateTime` | <code>string?</code> | Yes | The end date and time of the interval |
| `interval` | <code>string?</code> | Yes | The aggregation interval |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetActivitiesByInterval9468Queries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfItemActivityStat|error`

**Sample code:**

```ballerina
sites:CollectionOfItemActivityStat result = check client->getByPathGetActivitiesByInterval9468(
    "site-id", "/sites/marketing", "2024-06-01", "2024-06-08", "day");
```

**Sample response:**

```json
{
  "value": [
    {
      "startDateTime": "2024-06-01T00:00:00Z",
      "endDateTime": "2024-06-02T00:00:00Z",
      "access": { "actionCount": 4, "actorCount": 2 }
    }
  ]
}
```

</details>

<details>
<summary>getByPathGetApplicableContentTypesForList</summary>

Invokes the `getApplicableContentTypesForList` function on a site resolved by path, returning the content types applicable to a specific list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `listId` | <code>string</code> | Yes | The unique identifier of the list |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetApplicableContentTypesForListQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfContentType|error`

**Sample code:**

```ballerina
sites:CollectionOfContentType result = check client->getByPathGetApplicableContentTypesForList(
    "site-id", "/sites/marketing", "list-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "0x0101", "name": "Document" }
  ]
}
```

</details>

<details>
<summary>getByPathGetOnenote</summary>

Retrieves the OneNote notebook resource attached to a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetOnenoteQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Onenote|error`

**Sample code:**

```ballerina
sites:Onenote result = check client->getByPathGetOnenote("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "onenote-id"
}
```

</details>

<details>
<summary>getByPathDeleteOnenote</summary>

Deletes the OneNote navigation property of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>GetByPathDeleteOnenoteHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->getByPathDeleteOnenote("site-id", "/sites/marketing");
```

</details>

<details>
<summary>getByPathUpdateOnenote</summary>

Updates the OneNote navigation property of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>Onenote</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:Onenote payload = {};
check client->getByPathUpdateOnenote("site-id", "/sites/marketing", payload);
```

</details>

<details>
<summary>getByPathListOperations</summary>

Lists the long-running operations of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListOperationsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `RichLongRunningOperationCollectionResponse|error`

**Sample code:**

```ballerina
sites:RichLongRunningOperationCollectionResponse result = check client->getByPathListOperations("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "operation-id-1", "status": "completed", "percentageComplete": 100 }
  ]
}
```

</details>

<details>
<summary>getByPathCreateOperations</summary>

Creates a long-running operation on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>RichLongRunningOperation</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `RichLongRunningOperation|error`

**Sample code:**

```ballerina
sites:RichLongRunningOperation payload = {};
sites:RichLongRunningOperation result = check client->getByPathCreateOperations("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "operation-id-new",
  "status": "notStarted"
}
```

</details>

<details>
<summary>getByPathListPages</summary>

Lists the site pages of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListPagesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `BaseSitePageCollectionResponse|error`

**Sample code:**

```ballerina
sites:BaseSitePageCollectionResponse result = check client->getByPathListPages("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "page-id-1", "name": "home.aspx", "title": "Home" }
  ]
}
```

</details>

<details>
<summary>getByPathCreatePages</summary>

Creates a site page on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>BaseSitePage</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `BaseSitePage|error`

**Sample code:**

```ballerina
sites:BaseSitePage payload = {name: "new-page.aspx", title: "New Page"};
sites:BaseSitePage result = check client->getByPathCreatePages("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "page-id-new",
  "name": "new-page.aspx",
  "title": "New Page"
}
```

</details>

<details>
<summary>getByPathListPermissions</summary>

Lists the permissions granted on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListPermissionsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `PermissionCollectionResponse|error`

**Sample code:**

```ballerina
sites:PermissionCollectionResponse result = check client->getByPathListPermissions("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "permission-id-1", "roles": ["read"] }
  ]
}
```

</details>

<details>
<summary>getByPathCreatePermissions</summary>

Creates a permission on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>Permission</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `Permission|error`

**Sample code:**

```ballerina
sites:Permission payload = {roles: ["read"]};
sites:Permission result = check client->getByPathCreatePermissions("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "permission-id-new",
  "roles": ["read"]
}
```

</details>

<details>
<summary>getByPathListSites</summary>

Lists the subsites of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListSitesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `SiteCollectionResponse|error`

**Sample code:**

```ballerina
sites:SiteCollectionResponse result = check client->getByPathListSites("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "subsite-id-1", "name": "Events", "webUrl": "https://contoso.sharepoint.com/sites/marketing/events" }
  ]
}
```

</details>

<details>
<summary>getByPathGetTermStore</summary>

Retrieves the default term store of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathGetTermStoreQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `TermStoreStore|error`

**Sample code:**

```ballerina
sites:TermStoreStore result = check client->getByPathGetTermStore("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "id": "term-store-id",
  "defaultLanguageTag": "en-US"
}
```

</details>

<details>
<summary>getByPathDeleteTermStore</summary>

Deletes the default term store of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>GetByPathDeleteTermStoreHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->getByPathDeleteTermStore("site-id", "/sites/marketing");
```

</details>

<details>
<summary>getByPathUpdateTermStore</summary>

Updates the default term store of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>TermStoreStore</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:TermStoreStore payload = {defaultLanguageTag: "en-US"};
check client->getByPathUpdateTermStore("site-id", "/sites/marketing", payload);
```

</details>

<details>
<summary>getByPathListTermStores</summary>

Lists the term stores of a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetByPathListTermStoresQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `TermStoreStoreCollectionResponse|error`

**Sample code:**

```ballerina
sites:TermStoreStoreCollectionResponse result = check client->getByPathListTermStores("site-id", "/sites/marketing");
```

**Sample response:**

```json
{
  "value": [
    { "id": "term-store-id-1", "defaultLanguageTag": "en-US" }
  ]
}
```

</details>

<details>
<summary>getByPathCreateTermStores</summary>

Creates a term store on a site resolved by path.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site collection |
| `path` | <code>string?</code> | Yes | The server-relative path of the site |
| `payload` | <code>TermStoreStore</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `TermStoreStore|error`

**Sample code:**

```ballerina
sites:TermStoreStore payload = {defaultLanguageTag: "en-US"};
sites:TermStoreStore result = check client->getByPathCreateTermStores("site-id", "/sites/marketing", payload);
```

**Sample response:**

```json
{
  "id": "term-store-id-new",
  "defaultLanguageTag": "en-US"
}
```

</details>

#### Operations

<details>
<summary>listOperations</summary>

Lists the long-running operations on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListOperationsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `RichLongRunningOperationCollectionResponse|error`

**Sample code:**

```ballerina
sites:RichLongRunningOperationCollectionResponse result = check client->listOperations("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "operation-id-1", "status": "completed", "percentageComplete": 100 }
  ]
}
```

</details>

<details>
<summary>createOperations</summary>

Creates a long-running operation on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>RichLongRunningOperation</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `RichLongRunningOperation|error`

**Sample code:**

```ballerina
sites:RichLongRunningOperation payload = {};
sites:RichLongRunningOperation result = check client->createOperations("site-id", payload);
```

**Sample response:**

```json
{
  "id": "operation-id-new",
  "status": "notStarted"
}
```

</details>

<details>
<summary>getOperations</summary>

Retrieves a long-running operation on a site by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `richLongRunningOperationId` | <code>string</code> | Yes | The unique identifier of the richLongRunningOperation |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetOperationsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `RichLongRunningOperation|error`

**Sample code:**

```ballerina
sites:RichLongRunningOperation result = check client->getOperations("site-id", "operation-id");
```

**Sample response:**

```json
{
  "id": "operation-id",
  "status": "running",
  "percentageComplete": 50
}
```

</details>

<details>
<summary>deleteOperations</summary>

Deletes a long-running operation from a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `richLongRunningOperationId` | <code>string</code> | Yes | The unique identifier of the richLongRunningOperation |
| `headers` | <code>DeleteOperationsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteOperations("site-id", "operation-id");
```

</details>

<details>
<summary>updateOperations</summary>

Updates a long-running operation on a site with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `richLongRunningOperationId` | <code>string</code> | Yes | The unique identifier of the richLongRunningOperation |
| `payload` | <code>RichLongRunningOperation</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:RichLongRunningOperation payload = {status: "completed"};
check client->updateOperations("site-id", "operation-id", payload);
```

</details>

<details>
<summary>operationsGetCount71b0</summary>

Gets the total count of long-running operations on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*OperationsGetCount71b0Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->operationsGetCount71b0("site-id");
```

**Sample response:**

```json
"3"
```

</details>

#### Permissions

<details>
<summary>listPermissions</summary>

Lists the permissions granted on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListPermissionsQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `PermissionCollectionResponse|error`

**Sample code:**

```ballerina
sites:PermissionCollectionResponse result = check client->listPermissions("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "permission-id-1", "roles": ["read"] }
  ]
}
```

</details>

<details>
<summary>createPermissions</summary>

Creates a permission on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>Permission</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `Permission|error`

**Sample code:**

```ballerina
sites:Permission payload = {roles: ["write"]};
sites:Permission result = check client->createPermissions("site-id", payload);
```

**Sample response:**

```json
{
  "id": "permission-id-new",
  "roles": ["write"]
}
```

</details>

<details>
<summary>getPermissions</summary>

Retrieves a permission on a site by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `permissionId` | <code>string</code> | Yes | The unique identifier of the permission |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPermissionsQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Permission|error`

**Sample code:**

```ballerina
sites:Permission result = check client->getPermissions("site-id", "permission-id");
```

**Sample response:**

```json
{
  "id": "permission-id",
  "roles": ["read"]
}
```

</details>

<details>
<summary>deletePermissions</summary>

Deletes a permission from a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `permissionId` | <code>string</code> | Yes | The unique identifier of the permission |
| `headers` | <code>DeletePermissionsHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePermissions("site-id", "permission-id");
```

</details>

<details>
<summary>updatePermissions</summary>

Updates a permission on a site with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `permissionId` | <code>string</code> | Yes | The unique identifier of the permission |
| `payload` | <code>Permission</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
sites:Permission payload = {roles: ["write"]};
check client->updatePermissions("site-id", "permission-id", payload);
```

</details>

<details>
<summary>permissionsPermissionGrant</summary>

Grants an existing permission to additional drive recipients and roles.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `permissionId` | <code>string</code> | Yes | The unique identifier of the permission |
| `payload` | <code>PermissionIdGrantBody</code> | Yes | Recipients and roles to grant the permission to |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `CollectionOfPermission|error`

**Sample code:**

```ballerina
sites:PermissionIdGrantBody payload = {
    recipients: [{email: "user@contoso.com"}],
    roles: ["read"]
};
sites:CollectionOfPermission result = check client->permissionsPermissionGrant("site-id", "permission-id", payload);
```

**Sample response:**

```json
{
  "value": [
    { "id": "permission-granted-id", "roles": ["read"] }
  ]
}
```

</details>

<details>
<summary>permissionsGetCount511e</summary>

Gets the total count of permissions on a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*PermissionsGetCount511eQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->permissionsGetCount511e("site-id");
```

**Sample response:**

```json
"4"
```

</details>

#### Subsites

<details>
<summary>listSites</summary>

Lists the subsites of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListSitesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `SiteCollectionResponse|error`

**Sample code:**

```ballerina
sites:SiteCollectionResponse result = check client->listSites("site-id");
```

**Sample response:**

```json
{
  "value": [
    { "id": "subsite-id-1", "name": "Events" }
  ]
}
```

</details>

<details>
<summary>getSites</summary>

Retrieves a specific subsite of a site by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site |
| `id1` | <code>string</code> | Yes | The unique identifier of the subsite |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitesQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `Site|error`

**Sample code:**

```ballerina
sites:Site result = check client->getSites("site-id", "subsite-id");
```

**Sample response:**

```json
{
  "id": "subsite-id",
  "name": "Events",
  "webUrl": "https://contoso.sharepoint.com/sites/marketing/events"
}
```

</details>

<details>
<summary>getCountF499</summary>

Gets the total count of subsites under a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the parent site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetCountF499Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getCountF499("site-id");
```

**Sample response:**

```json
"2"
```

</details>

<details>
<summary>getCount6254</summary>

Gets the total count of sites accessible to the application across the tenant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetCount6254Queries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getCount6254();
```

**Sample response:**

```json
"42"
```

</details>

<details>
<summary>getAllSites</summary>

Invokes the `getAllSites` function to return all sites in the tenant, including subsites.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetAllSitesQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`) |

**Returns:** `CollectionOfSite|error`

**Sample code:**

```ballerina
sites:CollectionOfSite result = check client->getAllSites();
```

**Sample response:**

```json
{
  "value": [
    { "id": "site-id-1", "name": "Marketing" },
    { "id": "site-id-2", "name": "Sales" }
  ]
}
```

</details>

#### Add / Delta / Remove

<details>
<summary>add</summary>

Adds (follows) a collection of sites to the application's site collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddBody</code> | Yes | Array of SharePoint sites to be added |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `CollectionOfSite|error`

**Sample code:**

```ballerina
sites:AddBody payload = {
    value: [{id: "site-id-1"}, {id: "site-id-2"}]
};
sites:CollectionOfSite result = check client->add(payload);
```

**Sample response:**

```json
{
  "value": [
    { "id": "site-id-1", "name": "Marketing" }
  ]
}
```

</details>

<details>
<summary>delta</summary>

Invokes the `delta` function to track changes to sites in the tenant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*DeltaQueries</code> | No | OData query parameters (`$top`, `$skip`, `$filter`, `$search`, `$orderby`, `$select`, `$expand`, `$count`, `$deltaToken`, `$skipToken`) |

**Returns:** `CollectionOfSite1|error`

**Sample code:**

```ballerina
sites:CollectionOfSite1 result = check client->delta();
```

**Sample response:**

```json
{
  "@odata.deltaLink": "https://graph.microsoft.com/v1.0/sites/delta?token=abc",
  "value": [
    { "id": "site-id-1", "name": "Marketing" }
  ]
}
```

</details>

<details>
<summary>remove</summary>

Removes (unfollows) a collection of sites from the application's site collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddBody</code> | Yes | Array of SharePoint sites to be removed |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `CollectionOfSite|error`

**Sample code:**

```ballerina
sites:AddBody payload = {
    value: [{id: "site-id-1"}]
};
sites:CollectionOfSite result = check client->remove(payload);
```

**Sample response:**

```json
{
  "value": [
    { "id": "site-id-1", "name": "Marketing" }
  ]
}
```

</details>
