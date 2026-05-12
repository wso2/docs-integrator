---
title: Actions
---

# Actions

The `ballerinax/hubspot.marketing.campaigns` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot marketing campaigns: CRUD, batch operations, asset associations, metrics, revenue, contacts, and budget. |

---

## Client

Manage HubSpot marketing campaigns: CRUD, batch operations, asset associations, metrics, revenue, contacts, and budget.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or private app API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Maximum wait time for a response in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration for fault tolerance. |
| `validation` | <code>boolean</code> | `true` | Enable or disable constraint validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.marketing.campaigns;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

campaigns:Client campaignsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Campaign CRUD

<details>
<summary>Campaign search</summary>

Signature: `get .`

Searches for campaigns with optional filtering by name, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>GetMarketingV3CampaignsQueries</code> | No | Query parameters: `limit` (default 50), `name`, `sort` (default `hs_name`), `after`, `properties`. |

Returns: `CollectionResponseWithTotalPublicCampaignForwardPaging|error`

Sample code:

```ballerina
campaigns:CollectionResponseWithTotalPublicCampaignForwardPaging results =
    check campaignsClient->/.();
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "512",
      "properties": {
        "hs_name": "Spring Product Launch",
        "hs_goal": "Generate leads for new product line"
      },
      "createdAt": "2025-01-15T10:30:00Z",
      "updatedAt": "2025-02-01T14:00:00Z"
    },
    {
      "id": "513",
      "properties": {
        "hs_name": "Summer Webinar Series",
        "hs_goal": "Increase brand awareness"
      },
      "createdAt": "2025-03-01T08:00:00Z",
      "updatedAt": "2025-03-10T12:00:00Z"
    }
  ],
  "paging": {
    "next": {
      "after": "513"
    }
  }
}
```

</details>

<details>
<summary>Create a campaign</summary>

Signature: `post .`

Creates a new marketing campaign with the specified properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PublicCampaignInput</code> | Yes | Campaign properties (e.g., `hs_name`, `hs_goal`, `hs_start_date`, `hs_end_date`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `PublicCampaign|error`

Sample code:

```ballerina
campaigns:PublicCampaign campaign = check campaignsClient->/.post({
    properties: {
        "hs_name": "Spring Product Launch",
        "hs_goal": "Generate leads for new product line",
        "hs_start_date": "2025-04-01",
        "hs_end_date": "2025-06-30"
    }
});
```

Sample response:

```ballerina
{
  "id": "512",
  "properties": {
    "hs_name": "Spring Product Launch",
    "hs_goal": "Generate leads for new product line",
    "hs_start_date": "2025-04-01",
    "hs_end_date": "2025-06-30"
  },
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

</details>

<details>
<summary>Read a campaign</summary>

Signature: `get [string campaignGuid]`

Retrieves a single campaign by its GUID, optionally including associated assets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>GetMarketingV3CampaignsCampaignGuidQueries</code> | No | Query parameters: `startDate`, `endDate`, `properties`. |

Returns: `PublicCampaignWithAssets|error`

Sample code:

```ballerina
campaigns:PublicCampaignWithAssets campaign =
    check campaignsClient->/["campaignGuid"];
```

Sample response:

```ballerina
{
  "id": "512",
  "properties": {
    "hs_name": "Spring Product Launch",
    "hs_goal": "Generate leads for new product line"
  },
  "assets": {},
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-02-01T14:00:00Z"
}
```

</details>

<details>
<summary>Update campaign</summary>

Signature: `patch [string campaignGuid]`

Updates an existing campaign's properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign to update. |
| `payload` | <code>PublicCampaignInput</code> | Yes | Updated campaign properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `PublicCampaign|error`

Sample code:

```ballerina
campaigns:PublicCampaign updated = check campaignsClient->/["campaignGuid"].patch({
    properties: {
        "hs_name": "Spring Product Launch 2025 (Updated)"
    }
});
```

Sample response:

```ballerina
{
  "id": "512",
  "properties": {
    "hs_name": "Spring Product Launch 2025 (Updated)",
    "hs_goal": "Generate leads for new product line"
  },
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-03-18T09:00:00Z"
}
```

</details>

<details>
<summary>Delete campaign</summary>

Signature: `delete [string campaignGuid]`

Deletes a campaign by its GUID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check campaignsClient->/["campaignGuid"].delete();
```

</details>

#### Batch operations

<details>
<summary>Create a batch of campaigns</summary>

Signature: `post batch/create`

Creates multiple campaigns in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputPublicCampaignInput</code> | Yes | Array of campaign inputs to create. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `BatchResponsePublicCampaign|BatchResponsePublicCampaignWithErrors|error`

Sample code:

```ballerina
campaigns:BatchResponsePublicCampaign|campaigns:BatchResponsePublicCampaignWithErrors result =
    check campaignsClient->/batch/create.post({
        inputs: [
            { properties: { "hs_name": "Campaign A" } },
            { properties: { "hs_name": "Campaign B" } }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "514",
      "properties": { "hs_name": "Campaign A" },
      "createdAt": "2025-03-18T10:00:00Z",
      "updatedAt": "2025-03-18T10:00:00Z"
    },
    {
      "id": "515",
      "properties": { "hs_name": "Campaign B" },
      "createdAt": "2025-03-18T10:00:00Z",
      "updatedAt": "2025-03-18T10:00:00Z"
    }
  ],
  "startedAt": "2025-03-18T10:00:00Z",
  "completedAt": "2025-03-18T10:00:01Z"
}
```

</details>

<details>
<summary>Read a batch of campaigns</summary>

Signature: `post batch/read`

Reads multiple campaigns by their IDs in a single request, optionally including assets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputPublicCampaignReadInput</code> | Yes | Array of campaign IDs to read. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>PostMarketingV3CampaignsBatchReadQueries</code> | No | Query parameters: `startDate`, `endDate`, `properties`. |

Returns: `BatchResponsePublicCampaignWithAssets|BatchResponsePublicCampaignWithAssetsWithErrors|error`

Sample code:

```ballerina
campaigns:BatchResponsePublicCampaignWithAssets|campaigns:BatchResponsePublicCampaignWithAssetsWithErrors result =
    check campaignsClient->/batch/read.post({
        inputs: [
            { id: "514" },
            { id: "515" }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "514",
      "properties": { "hs_name": "Campaign A" },
      "assets": {},
      "createdAt": "2025-03-18T10:00:00Z",
      "updatedAt": "2025-03-18T10:00:00Z"
    },
    {
      "id": "515",
      "properties": { "hs_name": "Campaign B" },
      "assets": {},
      "createdAt": "2025-03-18T10:00:00Z",
      "updatedAt": "2025-03-18T10:00:00Z"
    }
  ],
  "startedAt": "2025-03-18T10:00:00Z",
  "completedAt": "2025-03-18T10:00:01Z"
}
```

</details>

<details>
<summary>Update a batch of campaigns</summary>

Signature: `post batch/update`

Updates multiple campaigns in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputPublicCampaignBatchUpdateItem</code> | Yes | Array of campaign update items with IDs and updated properties. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `BatchResponsePublicCampaign|BatchResponsePublicCampaignWithErrors|error`

Sample code:

```ballerina
campaigns:BatchResponsePublicCampaign|campaigns:BatchResponsePublicCampaignWithErrors result =
    check campaignsClient->/batch/update.post({
        inputs: [
            { id: "514", properties: { "hs_name": "Campaign A (Renamed)" } },
            { id: "515", properties: { "hs_goal": "Updated goal" } }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "514",
      "properties": { "hs_name": "Campaign A (Renamed)" },
      "createdAt": "2025-03-18T10:00:00Z",
      "updatedAt": "2025-03-18T11:00:00Z"
    },
    {
      "id": "515",
      "properties": { "hs_name": "Campaign B", "hs_goal": "Updated goal" },
      "createdAt": "2025-03-18T10:00:00Z",
      "updatedAt": "2025-03-18T11:00:00Z"
    }
  ],
  "startedAt": "2025-03-18T11:00:00Z",
  "completedAt": "2025-03-18T11:00:01Z"
}
```

</details>

<details>
<summary>Delete a batch of campaigns</summary>

Signature: `post batch/archive`

Deletes multiple campaigns in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputPublicCampaignDeleteInput</code> | Yes | Array of campaign IDs to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check campaignsClient->/batch/archive.post({
    inputs: [
        { id: "514" },
        { id: "515" }
    ]
});
```

</details>

#### Asset management

<details>
<summary>List assets</summary>

Signature: `get [string campaignGuid]/assets/[string assetType]`

Lists assets of a specific type associated with a campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `assetType` | <code>string</code> | Yes | The type of asset to list (e.g., `FORM`, `OBJECT_LIST`, `EXTERNAL_WEB_URL`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>GetMarketingV3CampaignsCampaignGuidAssetsAssetTypeQueries</code> | No | Query parameters: `startDate`, `endDate`, `limit` (default 10), `after`. |

Returns: `CollectionResponsePublicCampaignAssetForwardPaging|error`

Sample code:

```ballerina
campaigns:CollectionResponsePublicCampaignAssetForwardPaging assets =
    check campaignsClient->/[campaignGuid]/assets/["EXTERNAL_WEB_URL"];
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "https://example.com/landing-page",
      "name": "Spring Launch Landing Page"
    }
  ],
  "paging": null
}
```

</details>

<details>
<summary>Add asset association</summary>

Signature: `put [string campaignGuid]/assets/[string assetType]/[string assetId]`

Associates an asset with a campaign. Only supports FORM, OBJECT_LIST, and EXTERNAL_WEB_URL asset types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `assetType` | <code>string</code> | Yes | The type of asset: `FORM`, `OBJECT_LIST`, or `EXTERNAL_WEB_URL`. |
| `assetId` | <code>string</code> | Yes | The ID of the asset to associate (or a URL for `EXTERNAL_WEB_URL`). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check campaignsClient->/[campaignGuid]/assets/["EXTERNAL_WEB_URL"]/["https://example.com/landing-page"].put();
```

</details>

<details>
<summary>Remove asset association</summary>

Signature: `delete [string campaignGuid]/assets/[string assetType]/[string assetId]`

Removes the association between an asset and a campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `assetType` | <code>string</code> | Yes | The type of asset: `FORM`, `OBJECT_LIST`, or `EXTERNAL_WEB_URL`. |
| `assetId` | <code>string</code> | Yes | The ID of the asset to disassociate. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check campaignsClient->/[campaignGuid]/assets/["EXTERNAL_WEB_URL"]/["https://example.com/landing-page"].delete();
```

</details>

#### Reports

<details>
<summary>Get Campaign Metrics</summary>

Signature: `get [string campaignGuid]/reports/metrics`

Retrieves aggregated metrics for a campaign including sessions, new contacts, and influenced contacts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>GetMarketingV3CampaignsCampaignGuidReportsMetricsQueries</code> | No | Query parameters: `startDate` (default `2006-01-01`), `endDate` (default current date). |

Returns: `MetricsCounters|error`

Sample code:

```ballerina
campaigns:MetricsCounters metrics =
    check campaignsClient->/[campaignGuid]/reports/metrics;
```

Sample response:

```ballerina
{
  "sessions": 1245,
  "newContactsFirstTouch": 42,
  "newContactsLastTouch": 38,
  "influencedContacts": 156
}
```

</details>

<details>
<summary>Fetch revenue</summary>

Signature: `get [string campaignGuid]/reports/revenue`

Retrieves revenue attribution data for a campaign with a configurable attribution model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>GetMarketingV3CampaignsCampaignGuidReportsRevenueQueries</code> | No | Query parameters: `attributionModel` (default `LINEAR`, options: `FIRST_INTERACTION`, `LAST_INTERACTION`, `FULL_PATH`, `U_SHAPED`, `W_SHAPED`, `TIME_DECAY`, `J_SHAPED`, `INVERSE_J_SHAPED`), `startDate`, `endDate`. |

Returns: `RevenueAttributionAggregate|error`

Sample code:

```ballerina
campaigns:RevenueAttributionAggregate revenue =
    check campaignsClient->/[campaignGuid]/reports/revenue(
        queries = { attributionModel: "U_SHAPED" }
    );
```

Sample response:

```ballerina
{
  "contactsNumber": 25,
  "dealsNumber": 8,
  "dealAmount": 45000.00,
  "revenueAmount": 45000.00,
  "currencyCode": "USD"
}
```

</details>

<details>
<summary>Fetch contact IDs</summary>

Signature: `get [string campaignGuid]/reports/contacts/[string contactType]`

Retrieves contact IDs associated with a campaign by attribution type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `contactType` | <code>string</code> | Yes | Attribution type: `contactFirstTouch`, `contactLastTouch`, or `influencedContacts`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |
| `queries` | <code>GetMarketingV3CampaignsCampaignGuidReportsContactsContactTypeQueries</code> | No | Query parameters: `startDate`, `endDate`, `limit` (default 100), `after`. |

Returns: `CollectionResponseContactReferenceForwardPaging|error`

Sample code:

```ballerina
campaigns:CollectionResponseContactReferenceForwardPaging contacts =
    check campaignsClient->/[campaignGuid]/reports/contacts/["influencedContacts"];
```

Sample response:

```ballerina
{
  "results": [
    { "id": "101" },
    { "id": "102" },
    { "id": "103" }
  ],
  "paging": {
    "next": {
      "after": "103"
    }
  }
}
```

</details>

<details>
<summary>Read budget</summary>

Signature: `get [string campaignGuid]/budget/totals`

Retrieves the budget totals for a campaign including total budget, spend, and remaining budget.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignGuid` | <code>string</code> | Yes | The UUID of the campaign. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional request headers. |

Returns: `PublicBudgetTotals|error`

Sample code:

```ballerina
campaigns:PublicBudgetTotals budget =
    check campaignsClient->/[campaignGuid]/budget/totals;
```

Sample response:

```ballerina
{
  "budgetTotal": 50000.00,
  "spendTotal": 32000.00,
  "remainingBudget": 18000.00,
  "currencyCode": "USD",
  "budgetItems": [
    {
      "id": "1",
      "name": "Q1 Budget",
      "amount": 25000.00,
      "order": 0,
      "createdAt": 1705300200,
      "updatedAt": 1705300200
    },
    {
      "id": "2",
      "name": "Q2 Budget",
      "amount": 25000.00,
      "order": 1,
      "createdAt": 1713162600,
      "updatedAt": 1713162600
    }
  ],
  "spendItems": [
    {
      "id": "10",
      "name": "Ad Spend: Google",
      "description": "Google Ads campaign spend",
      "amount": 20000.00,
      "order": 0,
      "createdAt": 1706509800,
      "updatedAt": 1709188200
    },
    {
      "id": "11",
      "name": "Ad Spend: LinkedIn",
      "amount": 12000.00,
      "order": 1,
      "createdAt": 1706509800,
      "updatedAt": 1709188200
    }
  ]
}
```

</details>
