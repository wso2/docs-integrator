# Actions

The `ballerinax/sap.businessone.fixedassets` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage fixed asset objects of the SAP Business One Service Layer — asset master data, capitalization, retirement, transfers, revaluations, and depreciation configuration. |

---

## Client

The `Client` provides access to every fixed asset object exposed by the SAP Business One Service Layer — asset capitalization, capitalization credit memos, manual depreciation, retirement, transfer, revaluation, master data (asset classes, asset groups, depreciation groups), depreciation configuration (depreciation types, type pools, areas), FA account determinations, and fixed asset item balances.

### Configuration

#### SessionConfig

SAP Business One Service Layer session credentials, passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|--------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database to log in to |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer user password |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Service Layer HTTP endpoint. Passed as the optional second argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|--------------|
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

The client also accepts a `serviceUrl` string parameter — the base URL of the target Service Layer instance — which defaults to `https://localhost:50000/b1s/v1`.

### Initializing the client

```ballerina
import ballerinax/sap.businessone;
import ballerinax/sap.businessone.fixedassets;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

fixedassets:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations

#### Asset Capitalization

<details>
<summary>listAssetCapitalization</summary>

Query the AssetCapitalization collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetCapitalizationHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` to control server-side paging |
| `queries` | <code>ListAssetCapitalizationQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetCapitalizationCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetCapitalizationCollectionResponse response = check client->listAssetCapitalization(
    queries = {dollarTop: 20, dollarOrderby: "DocEntry desc"}
);
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetCapitalization",
  "value": [
    {
      "DocEntry": 191,
      "DocNum": 191,
      "Series": 3,
      "PostingDate": "2026-07-01",
      "Status": "adsPosted",
      "DocumentType": "adtOrdinaryDepreciation",
      "DepreciationArea": "10"
    }
  ],
  "odata.nextLink": "AssetCapitalization?$skip=20"
}
```

</details>

<details>
<summary>createAssetCapitalization</summary>

Create a new AssetDocument in the AssetCapitalization collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetDocument</code> | Yes | The asset capitalization document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument created = check client->createAssetCapitalization({
    PostingDate: "2026-07-01",
    DocumentDate: "2026-07-01",
    Remarks: "Capitalization of new forklift",
    DepreciationArea: "10",
    AssetDocumentLineCollection: [
        {AssetNumber: "100002", Quantity: 1, TotalLC: 18500.00, DepreciationArea: "10"}
    ]
});
```

**Sample response:**

```json
{
  "DocEntry": 191,
  "DocNum": 191,
  "Series": 3,
  "PostingDate": "2026-07-01",
  "DocumentDate": "2026-07-01",
  "Status": "adsPosted",
  "Remarks": "Capitalization of new forklift",
  "DepreciationArea": "10",
  "AssetDocumentLineCollection": [
    {"DocEntry": 191, "LineNumber": 0, "AssetNumber": "100002", "Quantity": 1, "TotalLC": 18500.00, "DepreciationArea": "10"}
  ]
}
```

</details>

<details>
<summary>getAssetCapitalization</summary>

Get a single AssetDocument in the AssetCapitalization collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetCapitalizationQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument doc = check client->getAssetCapitalization(191);
```

**Sample response:**

```json
{
  "DocEntry": 191,
  "DocNum": 191,
  "Series": 3,
  "PostingDate": "2026-07-01",
  "DocumentDate": "2026-07-01",
  "Status": "adsPosted",
  "Remarks": "Capitalization of new forklift",
  "DepreciationArea": "10",
  "AssetDocumentLineCollection": [
    {"DocEntry": 191, "LineNumber": 0, "AssetNumber": "100002", "Quantity": 1, "TotalLC": 18500.00, "DepreciationArea": "10"}
  ]
}
```

</details>

<details>
<summary>deleteAssetCapitalization</summary>

Delete an AssetDocument from the AssetCapitalization collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetCapitalization(191);
```

</details>

<details>
<summary>updateAssetCapitalization</summary>

Partially update an AssetDocument in the AssetCapitalization collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>AssetDocument</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetCapitalization(191, {Remarks: "Updated remarks"});
```

</details>

<details>
<summary>assetCapitalizationServiceCancel</summary>

Cancel an asset capitalization document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetCapitalizationService_Cancel_body</code> | Yes | Cancellation parameters wrapping an `AssetDocumentParams` object |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->assetCapitalizationServiceCancel({
    assetDocumentParams: {docEntry: 191, cancellationOption: "coByCurrentSystemDate"}
});
```

</details>

<details>
<summary>assetCapitalizationServiceGetList</summary>

Get the list of asset capitalization document parameters available for cancellation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1&#124;error`

**Sample code:**

```ballerina
inline_response_200_1 list = check client->assetCapitalizationServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetCapitalizationService_GetList",
  "value": [
    {"DocEntry": 191, "CancellationOption": "coByCurrentSystemDate"}
  ]
}
```

</details>

#### Asset Capitalization Credit Memos

<details>
<summary>listAssetCapitalizationCreditMemo</summary>

Query the AssetCapitalizationCreditMemo collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetCapitalizationCreditMemoHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetCapitalizationCreditMemoQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetCapitalizationCreditMemoCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetCapitalizationCreditMemoCollectionResponse response =
    check client->listAssetCapitalizationCreditMemo(queries = {dollarTop: 20});
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetCapitalizationCreditMemo",
  "value": [
    {
      "DocEntry": 44,
      "DocNum": 44,
      "PostingDate": "2026-06-15",
      "Status": "adsPosted",
      "DocumentType": "adtOrdinaryDepreciation",
      "DepreciationArea": "10"
    }
  ]
}
```

</details>

<details>
<summary>createAssetCapitalizationCreditMemo</summary>

Create a new AssetDocument in the AssetCapitalizationCreditMemo collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetDocument</code> | Yes | The capitalization credit memo document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument created = check client->createAssetCapitalizationCreditMemo({
    PostingDate: "2026-06-15",
    DocumentDate: "2026-06-15",
    Remarks: "Correction for over-capitalized forklift",
    DepreciationArea: "10",
    AssetDocumentLineCollection: [
        {AssetNumber: "100002", Quantity: 1, TotalLC: -500.00, DepreciationArea: "10"}
    ]
});
```

**Sample response:**

```json
{
  "DocEntry": 44,
  "DocNum": 44,
  "PostingDate": "2026-06-15",
  "DocumentDate": "2026-06-15",
  "Status": "adsPosted",
  "Remarks": "Correction for over-capitalized forklift",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>getAssetCapitalizationCreditMemo</summary>

Get a single AssetDocument in the AssetCapitalizationCreditMemo collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetCapitalizationCreditMemoQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument doc = check client->getAssetCapitalizationCreditMemo(44);
```

**Sample response:**

```json
{
  "DocEntry": 44,
  "DocNum": 44,
  "PostingDate": "2026-06-15",
  "Status": "adsPosted",
  "Remarks": "Correction for over-capitalized forklift",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>deleteAssetCapitalizationCreditMemo</summary>

Delete an AssetDocument from the AssetCapitalizationCreditMemo collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetCapitalizationCreditMemo(44);
```

</details>

<details>
<summary>updateAssetCapitalizationCreditMemo</summary>

Partially update an AssetDocument in the AssetCapitalizationCreditMemo collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>AssetDocument</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetCapitalizationCreditMemo(44, {Remarks: "Revised remarks"});
```

</details>

<details>
<summary>assetCapitalizationCreditMemoServiceCancel</summary>

Cancel an asset capitalization credit memo document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetCapitalizationCreditMemoService_Cancel_body</code> | Yes | Cancellation parameters wrapping an `AssetDocumentParams` object |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->assetCapitalizationCreditMemoServiceCancel({
    assetDocumentParams: {docEntry: 44, cancellationOption: "coByCurrentSystemDate"}
});
```

</details>

<details>
<summary>assetCapitalizationCreditMemoServiceGetList</summary>

Get the list of asset capitalization credit memo document parameters available for cancellation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200&#124;error`

**Sample code:**

```ballerina
inline_response_200 list = check client->assetCapitalizationCreditMemoServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetCapitalizationCreditMemoService_GetList",
  "value": [
    {"DocEntry": 44, "CancellationOption": "coByCurrentSystemDate"}
  ]
}
```

</details>

#### Asset Classes

<details>
<summary>listAssetClasses</summary>

Query the AssetClasses collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetClassesHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetClassesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetClassesCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetClassesCollectionResponse response = check client->listAssetClasses();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetClasses",
  "value": [
    {"Code": "VEHICLES", "Description": "Company Vehicles", "AssetType": "atAssetTypeGeneral"}
  ]
}
```

</details>

<details>
<summary>createAssetClasses</summary>

Create a new AssetClass.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetClass</code> | Yes | The asset class to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetClass&#124;error`

**Sample code:**

```ballerina
AssetClass created = check client->createAssetClasses({
    Code: "VEHICLES",
    Description: "Company Vehicles",
    AssetType: "atAssetTypeGeneral",
    AssetClassCollection: [
        {DepreciationAreaID: "10", DepreciationTypeID: "STR-5Y", UseLife: 60, ActiveStatus: "tYES"}
    ]
});
```

**Sample response:**

```json
{
  "Code": "VEHICLES",
  "Description": "Company Vehicles",
  "AssetType": "atAssetTypeGeneral",
  "AssetClassCollection": [
    {"Code": "VEHICLES", "LineNumber": 0, "DepreciationAreaID": "10", "DepreciationTypeID": "STR-5Y", "UseLife": 60, "ActiveStatus": "tYES"}
  ]
}
```

</details>

<details>
<summary>getAssetClasses</summary>

Get a single AssetClass by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetClassesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetClass&#124;error`

**Sample code:**

```ballerina
AssetClass assetClass = check client->getAssetClasses("VEHICLES");
```

**Sample response:**

```json
{
  "Code": "VEHICLES",
  "Description": "Company Vehicles",
  "AssetType": "atAssetTypeGeneral"
}
```

</details>

<details>
<summary>deleteAssetClasses</summary>

Delete an AssetClass.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetClasses("VEHICLES");
```

</details>

<details>
<summary>updateAssetClasses</summary>

Partially update an AssetClass (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>AssetClass</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetClasses("VEHICLES", {Description: "Fleet Vehicles"});
```

</details>

<details>
<summary>assetClassesServiceGetList</summary>

Get the list of asset class parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2&#124;error`

**Sample code:**

```ballerina
inline_response_200_2 list = check client->assetClassesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetClassesService_GetList",
  "value": [
    {"Code": "VEHICLES", "Description": "Company Vehicles"}
  ]
}
```

</details>

#### Asset Depreciation Groups

<details>
<summary>listAssetDepreciationGroups</summary>

Query the AssetDepreciationGroups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetDepreciationGroupsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetDepreciationGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetDepreciationGroupsCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetDepreciationGroupsCollectionResponse response = check client->listAssetDepreciationGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetDepreciationGroups",
  "value": [
    {"Code": "MACHINERY", "Group": "10", "Description": "Machinery and Equipment"}
  ]
}
```

</details>

<details>
<summary>createAssetDepreciationGroups</summary>

Create a new AssetDepreciationGroup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetDepreciationGroup</code> | Yes | The asset depreciation group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetDepreciationGroup&#124;error`

**Sample code:**

```ballerina
AssetDepreciationGroup created = check client->createAssetDepreciationGroups({
    code: "MACHINERY",
    group: "10",
    description: "Machinery and Equipment"
});
```

**Sample response:**

```json
{
  "Code": "MACHINERY",
  "Group": "10",
  "Description": "Machinery and Equipment"
}
```

</details>

<details>
<summary>getAssetDepreciationGroups</summary>

Get a single AssetDepreciationGroup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetDepreciationGroupsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetDepreciationGroup&#124;error`

**Sample code:**

```ballerina
AssetDepreciationGroup group = check client->getAssetDepreciationGroups("MACHINERY");
```

**Sample response:**

```json
{
  "Code": "MACHINERY",
  "Group": "10",
  "Description": "Machinery and Equipment"
}
```

</details>

<details>
<summary>deleteAssetDepreciationGroups</summary>

Delete an AssetDepreciationGroup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetDepreciationGroups("MACHINERY");
```

</details>

<details>
<summary>updateAssetDepreciationGroups</summary>

Partially update an AssetDepreciationGroup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>AssetDepreciationGroup</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetDepreciationGroups("MACHINERY", {description: "Heavy Machinery"});
```

</details>

<details>
<summary>assetDepreciationGroupsServiceGetList</summary>

Get the list of asset depreciation group parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3&#124;error`

**Sample code:**

```ballerina
inline_response_200_3 list = check client->assetDepreciationGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetDepreciationGroupsService_GetList",
  "value": [
    {"Code": "MACHINERY", "Description": "Machinery and Equipment"}
  ]
}
```

</details>

#### Asset Groups

<details>
<summary>listAssetGroups</summary>

Query the AssetGroups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetGroupsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetGroupsCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetGroupsCollectionResponse response = check client->listAssetGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetGroups",
  "value": [
    {"Code": "OFFICE", "Description": "Office Equipment"}
  ]
}
```

</details>

<details>
<summary>createAssetGroups</summary>

Create a new AssetGroup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetGroup</code> | Yes | The asset group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetGroup&#124;error`

**Sample code:**

```ballerina
AssetGroup created = check client->createAssetGroups({code: "OFFICE", description: "Office Equipment"});
```

**Sample response:**

```json
{
  "Code": "OFFICE",
  "Description": "Office Equipment"
}
```

</details>

<details>
<summary>getAssetGroups</summary>

Get a single AssetGroup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetGroupsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetGroup&#124;error`

**Sample code:**

```ballerina
AssetGroup group = check client->getAssetGroups("OFFICE");
```

**Sample response:**

```json
{
  "Code": "OFFICE",
  "Description": "Office Equipment"
}
```

</details>

<details>
<summary>deleteAssetGroups</summary>

Delete an AssetGroup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetGroups("OFFICE");
```

</details>

<details>
<summary>updateAssetGroups</summary>

Partially update an AssetGroup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>AssetGroup</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetGroups("OFFICE", {description: "Office & IT Equipment"});
```

</details>

<details>
<summary>assetGroupsServiceGetList</summary>

Get the list of asset group parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4&#124;error`

**Sample code:**

```ballerina
inline_response_200_4 list = check client->assetGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetGroupsService_GetList",
  "value": [
    {"Code": "OFFICE", "Description": "Office Equipment"}
  ]
}
```

</details>

#### Asset Manual Depreciation

<details>
<summary>listAssetManualDepreciation</summary>

Query the AssetManualDepreciation collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetManualDepreciationHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetManualDepreciationQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetManualDepreciationCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetManualDepreciationCollectionResponse response = check client->listAssetManualDepreciation();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetManualDepreciation",
  "value": [
    {
      "DocEntry": 77,
      "DocNum": 77,
      "PostingDate": "2026-06-30",
      "Status": "adsPosted",
      "ManualDepreciationType": "Special",
      "DepreciationArea": "10"
    }
  ]
}
```

</details>

<details>
<summary>createAssetManualDepreciation</summary>

Create a new AssetDocument in the AssetManualDepreciation collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetDocument</code> | Yes | The manual depreciation document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument created = check client->createAssetManualDepreciation({
    PostingDate: "2026-06-30",
    DocumentDate: "2026-06-30",
    ManualDepreciationType: "Special",
    DepreciationArea: "10",
    AssetDocumentLineCollection: [
        {AssetNumber: "100002", TotalLC: 500.00, DepreciationArea: "10"}
    ]
});
```

**Sample response:**

```json
{
  "DocEntry": 77,
  "DocNum": 77,
  "PostingDate": "2026-06-30",
  "Status": "adsPosted",
  "ManualDepreciationType": "Special",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>getAssetManualDepreciation</summary>

Get a single AssetDocument in the AssetManualDepreciation collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetManualDepreciationQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument doc = check client->getAssetManualDepreciation(77);
```

**Sample response:**

```json
{
  "DocEntry": 77,
  "DocNum": 77,
  "PostingDate": "2026-06-30",
  "Status": "adsPosted",
  "ManualDepreciationType": "Special",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>deleteAssetManualDepreciation</summary>

Delete an AssetDocument from the AssetManualDepreciation collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetManualDepreciation(77);
```

</details>

<details>
<summary>updateAssetManualDepreciation</summary>

Partially update an AssetDocument in the AssetManualDepreciation collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>AssetDocument</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetManualDepreciation(77, {Remarks: "Adjusted"});
```

</details>

<details>
<summary>assetManualDepreciationServiceCancel</summary>

Cancel an asset manual depreciation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetManualDepreciationService_Cancel_body</code> | Yes | Cancellation parameters wrapping an `AssetDocumentParams` object |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->assetManualDepreciationServiceCancel({
    assetDocumentParams: {docEntry: 77, cancellationOption: "coByCurrentSystemDate"}
});
```

</details>

<details>
<summary>assetManualDepreciationServiceGetList</summary>

Get the list of asset manual depreciation document parameters available for cancellation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5&#124;error`

**Sample code:**

```ballerina
inline_response_200_5 list = check client->assetManualDepreciationServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetManualDepreciationService_GetList",
  "value": [
    {"DocEntry": 77, "CancellationOption": "coByCurrentSystemDate"}
  ]
}
```

</details>

#### Asset Retirement

<details>
<summary>listAssetRetirement</summary>

Query the AssetRetirement collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetRetirementHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetRetirementQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetRetirementCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetRetirementCollectionResponse response = check client->listAssetRetirement();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetRetirement",
  "value": [
    {
      "DocEntry": 12,
      "DocNum": 12,
      "PostingDate": "2026-05-20",
      "Status": "adsPosted",
      "DocumentType": "adtSales",
      "DepreciationArea": "10"
    }
  ]
}
```

</details>

<details>
<summary>createAssetRetirement</summary>

Create a new AssetDocument in the AssetRetirement collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetDocument</code> | Yes | The asset retirement document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument created = check client->createAssetRetirement({
    PostingDate: "2026-05-20",
    DocumentDate: "2026-05-20",
    DocumentType: "adtSales",
    DepreciationArea: "10",
    AssetDocumentLineCollection: [
        {AssetNumber: "100002", Quantity: 1, TotalLC: 12000.00, DepreciationArea: "10"}
    ]
});
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "PostingDate": "2026-05-20",
  "Status": "adsPosted",
  "DocumentType": "adtSales",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>getAssetRetirement</summary>

Get a single AssetDocument in the AssetRetirement collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetRetirementQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument doc = check client->getAssetRetirement(12);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "PostingDate": "2026-05-20",
  "Status": "adsPosted",
  "DocumentType": "adtSales",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>deleteAssetRetirement</summary>

Delete an AssetDocument from the AssetRetirement collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetRetirement(12);
```

</details>

<details>
<summary>updateAssetRetirement</summary>

Partially update an AssetDocument in the AssetRetirement collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>AssetDocument</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetRetirement(12, {Remarks: "Sold to third party"});
```

</details>

<details>
<summary>assetRetirementServiceCancel</summary>

Cancel an asset retirement document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetRetirementService_Cancel_body</code> | Yes | Cancellation parameters wrapping an `AssetDocumentParams` object |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->assetRetirementServiceCancel({
    assetDocumentParams: {docEntry: 12, cancellationOption: "coByCurrentSystemDate"}
});
```

</details>

<details>
<summary>assetRetirementServiceGetList</summary>

Get the list of asset retirement document parameters available for cancellation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6&#124;error`

**Sample code:**

```ballerina
inline_response_200_6 list = check client->assetRetirementServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetRetirementService_GetList",
  "value": [
    {"DocEntry": 12, "CancellationOption": "coByCurrentSystemDate"}
  ]
}
```

</details>

#### Asset Revaluations

<details>
<summary>assetRevaluationServiceGetList</summary>

Get the list of asset revaluation document parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7&#124;error`

**Sample code:**

```ballerina
inline_response_200_7 list = check client->assetRevaluationServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetRevaluationService_GetList",
  "value": [
    {"DocEntry": 25}
  ]
}
```

</details>

<details>
<summary>listAssetRevaluations</summary>

Query the AssetRevaluations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetRevaluationsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetRevaluationsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetRevaluationsCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetRevaluationsCollectionResponse response = check client->listAssetRevaluations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetRevaluations",
  "value": [
    {
      "DocEntry": 25,
      "DocNum": 25,
      "PostingDate": "2026-06-30",
      "Reference": "REVAL-2026-Q2",
      "DepreciationArea": "10"
    }
  ]
}
```

</details>

<details>
<summary>createAssetRevaluations</summary>

Create a new AssetRevaluation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetRevaluation</code> | Yes | The asset revaluation document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetRevaluation&#124;error`

**Sample code:**

```ballerina
AssetRevaluation created = check client->createAssetRevaluations({
    postingDate: "2026-06-30",
    documentDate: "2026-06-30",
    reference: "REVAL-2026-Q2",
    depreciationArea: "10",
    assetRevaluationLineCollection: [
        {assetNumber: "100002", currentNBV: 15000.00, newNBV: 16200.00, revaluationPercent: 8}
    ]
});
```

**Sample response:**

```json
{
  "DocEntry": 25,
  "DocNum": 25,
  "PostingDate": "2026-06-30",
  "Reference": "REVAL-2026-Q2",
  "DepreciationArea": "10",
  "AssetRevaluationLineCollection": [
    {"DocEntry": 25, "LineNumber": 0, "AssetNumber": "100002", "CurrentNBV": 15000.00, "NewNBV": 16200.00, "RevaluationPercent": 8}
  ]
}
```

</details>

<details>
<summary>getAssetRevaluations</summary>

Get a single AssetRevaluation by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetRevaluationsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetRevaluation&#124;error`

**Sample code:**

```ballerina
AssetRevaluation revaluation = check client->getAssetRevaluations(25);
```

**Sample response:**

```json
{
  "DocEntry": 25,
  "DocNum": 25,
  "PostingDate": "2026-06-30",
  "Reference": "REVAL-2026-Q2",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>deleteAssetRevaluations</summary>

Delete an AssetRevaluation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetRevaluations(25);
```

</details>

<details>
<summary>updateAssetRevaluations</summary>

Partially update an AssetRevaluation (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>AssetRevaluation</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetRevaluations(25, {remarks: "Reviewed by controller"});
```

</details>

#### Asset Transfer

<details>
<summary>listAssetTransfer</summary>

Query the AssetTransfer collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAssetTransferHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListAssetTransferQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `AssetTransferCollectionResponse&#124;error`

**Sample code:**

```ballerina
AssetTransferCollectionResponse response = check client->listAssetTransfer();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetTransfer",
  "value": [
    {
      "DocEntry": 33,
      "DocNum": 33,
      "PostingDate": "2026-04-10",
      "Status": "adsPosted",
      "DocumentType": "adtAssetTransfer",
      "DepreciationArea": "10"
    }
  ]
}
```

</details>

<details>
<summary>createAssetTransfer</summary>

Create a new AssetDocument in the AssetTransfer collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetDocument</code> | Yes | The asset transfer document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument created = check client->createAssetTransfer({
    PostingDate: "2026-04-10",
    DocumentDate: "2026-04-10",
    DocumentType: "adtAssetTransfer",
    DepreciationArea: "10",
    AssetDocumentNewLocCollection: [
        {AssetNumber: "100002", CurLocation: 1, NewLocation: 2, Quantity: 1}
    ]
});
```

**Sample response:**

```json
{
  "DocEntry": 33,
  "DocNum": 33,
  "PostingDate": "2026-04-10",
  "Status": "adsPosted",
  "DocumentType": "adtAssetTransfer",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>getAssetTransfer</summary>

Get a single AssetDocument in the AssetTransfer collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAssetTransferQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `AssetDocument&#124;error`

**Sample code:**

```ballerina
AssetDocument doc = check client->getAssetTransfer(33);
```

**Sample response:**

```json
{
  "DocEntry": 33,
  "DocNum": 33,
  "PostingDate": "2026-04-10",
  "Status": "adsPosted",
  "DocumentType": "adtAssetTransfer",
  "DepreciationArea": "10"
}
```

</details>

<details>
<summary>deleteAssetTransfer</summary>

Delete an AssetDocument from the AssetTransfer collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAssetTransfer(33);
```

</details>

<details>
<summary>updateAssetTransfer</summary>

Partially update an AssetDocument in the AssetTransfer collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>AssetDocument</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAssetTransfer(33, {Remarks: "Relocated to warehouse 2"});
```

</details>

<details>
<summary>assetTransferServiceCancel</summary>

Cancel an asset transfer document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AssetTransferService_Cancel_body</code> | Yes | Cancellation parameters wrapping an `AssetDocumentParams` object |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->assetTransferServiceCancel({
    assetDocumentParams: {docEntry: 33, cancellationOption: "coByCurrentSystemDate"}
});
```

</details>

<details>
<summary>assetTransferServiceGetList</summary>

Get the list of asset transfer document parameters available for cancellation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_8&#124;error`

**Sample code:**

```ballerina
inline_response_200_8 list = check client->assetTransferServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#AssetTransferService_GetList",
  "value": [
    {"DocEntry": 33, "CancellationOption": "coByCurrentSystemDate"}
  ]
}
```

</details>

#### Depreciation Areas

<details>
<summary>listDepreciationAreas</summary>

Query the DepreciationAreas collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDepreciationAreasHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListDepreciationAreasQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DepreciationAreasCollectionResponse&#124;error`

**Sample code:**

```ballerina
DepreciationAreasCollectionResponse response = check client->listDepreciationAreas();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#DepreciationAreas",
  "value": [
    {
      "Code": "10",
      "Description": "Book Depreciation Area",
      "AreaType": "atPostingtoGL",
      "MainBookingArea": "tYES",
      "PostingOfDepreciation": "podDirectPosting"
    }
  ]
}
```

</details>

<details>
<summary>createDepreciationAreas</summary>

Create a new DepreciationArea.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DepreciationArea</code> | Yes | The depreciation area to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DepreciationArea&#124;error`

**Sample code:**

```ballerina
DepreciationArea created = check client->createDepreciationAreas({
    code: "10",
    description: "Book Depreciation Area",
    areaType: "atPostingtoGL",
    mainBookingArea: "tYES",
    postingOfDepreciation: "podDirectPosting"
});
```

**Sample response:**

```json
{
  "Code": "10",
  "Description": "Book Depreciation Area",
  "AreaType": "atPostingtoGL",
  "MainBookingArea": "tYES",
  "PostingOfDepreciation": "podDirectPosting"
}
```

</details>

<details>
<summary>getDepreciationAreas</summary>

Get a single DepreciationArea by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDepreciationAreasQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `DepreciationArea&#124;error`

**Sample code:**

```ballerina
DepreciationArea area = check client->getDepreciationAreas("10");
```

**Sample response:**

```json
{
  "Code": "10",
  "Description": "Book Depreciation Area",
  "AreaType": "atPostingtoGL",
  "MainBookingArea": "tYES"
}
```

</details>

<details>
<summary>deleteDepreciationAreas</summary>

Delete a DepreciationArea.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDepreciationAreas("10");
```

</details>

<details>
<summary>updateDepreciationAreas</summary>

Partially update a DepreciationArea (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>DepreciationArea</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDepreciationAreas("10", {description: "Statutory Book Area"});
```

</details>

<details>
<summary>depreciationAreasServiceGetList</summary>

Get the list of depreciation area parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_9&#124;error`

**Sample code:**

```ballerina
inline_response_200_9 list = check client->depreciationAreasServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#DepreciationAreasService_GetList",
  "value": [
    {"Code": "10", "Description": "Book Depreciation Area"}
  ]
}
```

</details>

#### Depreciation Type Pools

<details>
<summary>listDepreciationTypePools</summary>

Query the DepreciationTypePools collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDepreciationTypePoolsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListDepreciationTypePoolsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DepreciationTypePoolsCollectionResponse&#124;error`

**Sample code:**

```ballerina
DepreciationTypePoolsCollectionResponse response = check client->listDepreciationTypePools();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#DepreciationTypePools",
  "value": [
    {"Code": "POOL-5Y", "Description": "5-Year Straight Line Pool"}
  ]
}
```

</details>

<details>
<summary>createDepreciationTypePools</summary>

Create a new DepreciationTypePool.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DepreciationTypePool</code> | Yes | The depreciation type pool to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DepreciationTypePool&#124;error`

**Sample code:**

```ballerina
DepreciationTypePool created = check client->createDepreciationTypePools({
    code: "POOL-5Y",
    description: "5-Year Straight Line Pool"
});
```

**Sample response:**

```json
{
  "Code": "POOL-5Y",
  "Description": "5-Year Straight Line Pool"
}
```

</details>

<details>
<summary>getDepreciationTypePools</summary>

Get a single DepreciationTypePool by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDepreciationTypePoolsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `DepreciationTypePool&#124;error`

**Sample code:**

```ballerina
DepreciationTypePool pool = check client->getDepreciationTypePools("POOL-5Y");
```

**Sample response:**

```json
{
  "Code": "POOL-5Y",
  "Description": "5-Year Straight Line Pool",
  "DepreciationTypes": [
    {"Code": "STR-5Y", "Description": "Straight Line 5 Years"}
  ]
}
```

</details>

<details>
<summary>deleteDepreciationTypePools</summary>

Delete a DepreciationTypePool.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDepreciationTypePools("POOL-5Y");
```

</details>

<details>
<summary>updateDepreciationTypePools</summary>

Partially update a DepreciationTypePool (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>DepreciationTypePool</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDepreciationTypePools("POOL-5Y", {description: "5-Year SL Pool (Revised)"});
```

</details>

<details>
<summary>depreciationTypePoolsServiceGetList</summary>

Get the list of depreciation type pool parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10&#124;error`

**Sample code:**

```ballerina
inline_response_200_10 list = check client->depreciationTypePoolsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#DepreciationTypePoolsService_GetList",
  "value": [
    {"Code": "POOL-5Y", "Description": "5-Year Straight Line Pool"}
  ]
}
```

</details>

#### Depreciation Types

<details>
<summary>listDepreciationTypes</summary>

Query the DepreciationTypes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDepreciationTypesHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListDepreciationTypesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DepreciationTypesCollectionResponse&#124;error`

**Sample code:**

```ballerina
DepreciationTypesCollectionResponse response = check client->listDepreciationTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#DepreciationTypes",
  "value": [
    {
      "Code": "STR-5Y",
      "Description": "Straight Line 5 Years",
      "DepreciationMethod": "dmStraightLine",
      "StraightLinePercentage": 20,
      "CalculationBase": "cbYearly"
    }
  ]
}
```

</details>

<details>
<summary>createDepreciationTypes</summary>

Create a new DepreciationType.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DepreciationType</code> | Yes | The depreciation type to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DepreciationType&#124;error`

**Sample code:**

```ballerina
DepreciationType created = check client->createDepreciationTypes({
    code: "STR-5Y",
    description: "Straight Line 5 Years",
    depreciationMethod: "dmStraightLine",
    straightLinePercentage: 20,
    calculationBase: "cbYearly",
    depreciationTypePool: "POOL-5Y"
});
```

**Sample response:**

```json
{
  "Code": "STR-5Y",
  "Description": "Straight Line 5 Years",
  "DepreciationMethod": "dmStraightLine",
  "StraightLinePercentage": 20,
  "CalculationBase": "cbYearly",
  "DepreciationTypePool": "POOL-5Y"
}
```

</details>

<details>
<summary>getDepreciationTypes</summary>

Get a single DepreciationType by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDepreciationTypesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `DepreciationType&#124;error`

**Sample code:**

```ballerina
DepreciationType depreciationType = check client->getDepreciationTypes("STR-5Y");
```

**Sample response:**

```json
{
  "Code": "STR-5Y",
  "Description": "Straight Line 5 Years",
  "DepreciationMethod": "dmStraightLine",
  "StraightLinePercentage": 20,
  "CalculationBase": "cbYearly",
  "ValidFrom": "2020-01-01"
}
```

</details>

<details>
<summary>deleteDepreciationTypes</summary>

Delete a DepreciationType.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDepreciationTypes("STR-5Y");
```

</details>

<details>
<summary>updateDepreciationTypes</summary>

Partially update a DepreciationType (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>DepreciationType</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDepreciationTypes("STR-5Y", {straightLinePercentage: 25});
```

</details>

<details>
<summary>depreciationTypesServiceGetList</summary>

Get the list of depreciation type parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_11&#124;error`

**Sample code:**

```ballerina
inline_response_200_11 list = check client->depreciationTypesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#DepreciationTypesService_GetList",
  "value": [
    {"Code": "STR-5Y", "Description": "Straight Line 5 Years"}
  ]
}
```

</details>

#### FA Account Determinations

<details>
<summary>listFAAccountDeterminations</summary>

Query the FAAccountDeterminations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListFAAccountDeterminationsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListFAAccountDeterminationsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `FAAccountDeterminationsCollectionResponse&#124;error`

**Sample code:**

```ballerina
FAAccountDeterminationsCollectionResponse response = check client->listFAAccountDeterminations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#FAAccountDeterminations",
  "value": [
    {
      "Code": "DEFAULT",
      "Description": "Default FA Account Determination",
      "AssetBalanceSheetAccount": "_SYS00000000273",
      "OrdinaryDepreciation": "_SYS00000000275"
    }
  ]
}
```

</details>

<details>
<summary>createFAAccountDeterminations</summary>

Create a new FAAccountDetermination.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FAAccountDetermination</code> | Yes | The FA account determination to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `FAAccountDetermination&#124;error`

**Sample code:**

```ballerina
FAAccountDetermination created = check client->createFAAccountDeterminations({
    code: "DEFAULT",
    description: "Default FA Account Determination",
    assetBalanceSheetAccount: "_SYS00000000273",
    ordinaryDepreciation: "_SYS00000000275"
});
```

**Sample response:**

```json
{
  "Code": "DEFAULT",
  "Description": "Default FA Account Determination",
  "AssetBalanceSheetAccount": "_SYS00000000273",
  "OrdinaryDepreciation": "_SYS00000000275"
}
```

</details>

<details>
<summary>getFAAccountDeterminations</summary>

Get a single FAAccountDetermination by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFAAccountDeterminationsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `FAAccountDetermination&#124;error`

**Sample code:**

```ballerina
FAAccountDetermination determination = check client->getFAAccountDeterminations("DEFAULT");
```

**Sample response:**

```json
{
  "Code": "DEFAULT",
  "Description": "Default FA Account Determination",
  "AssetBalanceSheetAccount": "_SYS00000000273",
  "OrdinaryDepreciation": "_SYS00000000275"
}
```

</details>

<details>
<summary>deleteFAAccountDeterminations</summary>

Delete an FAAccountDetermination.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFAAccountDeterminations("DEFAULT");
```

</details>

<details>
<summary>updateFAAccountDeterminations</summary>

Partially update an FAAccountDetermination (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>FAAccountDetermination</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFAAccountDeterminations("DEFAULT", {description: "Default FA Accounts (Revised)"});
```

</details>

<details>
<summary>fAAccountDeterminationsServiceGetList</summary>

Get the list of FA account determination parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_12&#124;error`

**Sample code:**

```ballerina
inline_response_200_12 list = check client->fAAccountDeterminationsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#FAAccountDeterminationsService_GetList",
  "value": [
    {"Code": "DEFAULT", "Description": "Default FA Account Determination"}
  ]
}
```

</details>

#### Fixed Asset Items

<details>
<summary>fixedAssetItemsServiceGetAssetEndBalance</summary>

Get the end balance (net book value, accumulated depreciation, etc.) of a fixed asset item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FixedAssetItemsService_GetAssetEndBalance_body</code> | Yes | Wraps a `FixedAssetValuesParams` object identifying the item, fiscal year, and depreciation area |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `FixedAssetEndBalance&#124;error`

**Sample code:**

```ballerina
FixedAssetEndBalance balance = check client->fixedAssetItemsServiceGetAssetEndBalance({
    fixedAssetValuesParams: {itemCode: "100002", fiscalYear: "2026", depreciationArea: "10"}
});
```

**Sample response:**

```json
{
  "AcquisitionCost": 18500.00,
  "NetBookValue": 12300.00,
  "OrdinaryDepreciationValue": 6200.00,
  "SpecialDepreciationValue": 0,
  "SalvageValue": 0,
  "Quantity": 1
}
```

</details>

<details>
<summary>fixedAssetItemsServiceGetAssetValuesList</summary>

Get the list of asset transaction values (acquisitions, depreciation, appreciation, etc.) for a fixed asset item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FixedAssetItemsService_GetAssetValuesList_body</code> | Yes | Wraps a `FixedAssetValuesParams` object identifying the item, fiscal year, and depreciation area |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_13&#124;error`

**Sample code:**

```ballerina
inline_response_200_13 valuesList = check client->fixedAssetItemsServiceGetAssetValuesList({
    fixedAssetValuesParams: {itemCode: "100002", fiscalYear: "2026", depreciationArea: "10"}
});
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#FixedAssetItemsService_GetAssetValuesList",
  "value": [
    {
      "TransactionType": "att_Acquistion",
      "AcquisitionCost": 18500.00,
      "NetBookValue": 18500.00,
      "DepreciationValue": 0
    },
    {
      "TransactionType": "att_OrdinaryDepreciation",
      "AcquisitionCost": 18500.00,
      "NetBookValue": 12300.00,
      "OrdinaryDepreciationValue": 6200.00
    }
  ]
}
```

</details>

<details>
<summary>fixedAssetItemsServiceUpdateAssetEndBalance</summary>

Update the end balance of a fixed asset item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FixedAssetItemsService_UpdateAssetEndBalance_body</code> | Yes | Wraps a `FixedAssetEndBalance` object and a `FixedAssetValuesParams` object identifying the item, fiscal year, and depreciation area |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->fixedAssetItemsServiceUpdateAssetEndBalance({
    fixedAssetEndBalance: {netBookValue: 12300.00, ordinaryDepreciationValue: 6200.00},
    fixedAssetValuesParams: {itemCode: "100002", fiscalYear: "2026", depreciationArea: "10"}
});
```

</details>

#### Session

<details>
<summary>logout</summary>

Ends the active SAP Business One Service Layer session.

**Parameters:**

_None_

**Returns:** `error?`

**Sample code:**

```ballerina
check client->logout();
```

</details>
