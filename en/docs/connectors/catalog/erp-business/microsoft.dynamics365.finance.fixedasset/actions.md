---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.fixedasset` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance fixed assets, fixed asset value models, asset lendings, asset sortings, leasing groups, parent leases, and depreciation/ledger/asset-use reference data via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance fixed assets, fixed asset value models, asset lendings, asset sortings, leasing groups, parent leases, and depreciation/ledger/asset-use reference data via the Dynamics 365 Finance and Operations OData API.

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
import ballerinax/microsoft.dynamics365.finance.fixedasset;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

fixedasset:Client fo = check new (
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

#### Asset lendings

<details>
<summary>listAssetLendings</summary>

Reads all asset lending records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAssetLendingsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:AssetLendingsCollection|error`

Sample code:

```ballerina
fixedasset:AssetLendingsCollection lendings = check fo->listAssetLendings(
    queries = {
        filter: "dataAreaId eq 'USMF' and Leaseholder eq 'Contoso Logistics'",
        top: 20
    }
);
```

</details>

<details>
<summary>createAssetLendings</summary>

Creates an asset lending record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AssetLending` | Yes | The asset lending record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:AssetLending|error`

Sample code:

```ballerina
fixedasset:AssetLending lending = check fo->createAssetLendings({
    dataAreaId: "USMF",
    fAInventoryNumber: "FA-001028",
    dateOfLease: "2026-01-15",
    leaseholder: "Contoso Logistics",
    expectedReturnDate: "2026-04-15",
    location: "Warehouse 4"
});
```

</details>

<details>
<summary>getAssetLendings</summary>

Reads a specific asset lending record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `dateOfLease` | `string` | Yes | The date of lease key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAssetLendingsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:AssetLending|error`

Sample code:

```ballerina
fixedasset:AssetLending lending = check fo->getAssetLendings(
    "USMF",
    "FA-001028",
    "2026-01-15"
);
```

</details>

<details>
<summary>deleteAssetLendings</summary>

Deletes a specific asset lending record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `dateOfLease` | `string` | Yes | The date of lease key field. |
| `headers` | `DeleteAssetLendingsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAssetLendings(
    "USMF",
    "FA-001028",
    "2026-01-15",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAssetLendings</summary>

Updates a specific asset lending record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `dateOfLease` | `string` | Yes | The date of lease key field. |
| `payload` | `AssetLending` | Yes | The fields to update. |
| `headers` | `UpdateAssetLendingsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:AssetLending|error`

Sample code:

```ballerina
fixedasset:AssetLending updated = check fo->updateAssetLendings(
    "USMF",
    "FA-001028",
    "2026-01-15",
    {actualReturnDate: "2026-04-10"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Asset sortings

<details>
<summary>listAssetSortings</summary>

Reads all asset sorting fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAssetSortingsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:AssetSortingsCollection|error`

Sample code:

```ballerina
fixedasset:AssetSortingsCollection sortings = check fo->listAssetSortings(
    queries = {
        filter: "dataAreaId eq 'USMF' and Sorting eq 'Sorting1'"
    }
);
```

</details>

<details>
<summary>createAssetSortings</summary>

Creates an asset sorting field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AssetSorting` | Yes | The asset sorting field to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:AssetSorting|error`

Sample code:

```ballerina
fixedasset:AssetSorting sorting = check fo->createAssetSortings({
    dataAreaId: "USMF",
    sorting: "Sorting1",
    identification: "WHSE-A",
    description: "Warehouse A racking"
});
```

</details>

<details>
<summary>getAssetSortings</summary>

Reads a specific asset sorting field by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sorting` | `string` | Yes | The sorting key field. |
| `identification` | `string` | Yes | The identification key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAssetSortingsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:AssetSorting|error`

Sample code:

```ballerina
fixedasset:AssetSorting sorting = check fo->getAssetSortings(
    "USMF",
    "Sorting1",
    "WHSE-A"
);
```

</details>

<details>
<summary>deleteAssetSortings</summary>

Deletes a specific asset sorting field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sorting` | `string` | Yes | The sorting key field. |
| `identification` | `string` | Yes | The identification key field. |
| `headers` | `DeleteAssetSortingsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAssetSortings(
    "USMF",
    "Sorting1",
    "WHSE-A",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAssetSortings</summary>

Updates a specific asset sorting field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `sorting` | `string` | Yes | The sorting key field. |
| `identification` | `string` | Yes | The identification key field. |
| `payload` | `AssetSorting` | Yes | The fields to update. |
| `headers` | `UpdateAssetSortingsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:AssetSorting|error`

Sample code:

```ballerina
fixedasset:AssetSorting updated = check fo->updateAssetSortings(
    "USMF",
    "Sorting1",
    "WHSE-A",
    {description: "Warehouse A - Zone 1 racking"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Fixed asset value models

<details>
<summary>listFixedAssetValueModels</summary>

Reads all fixed asset value models.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListFixedAssetValueModelsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:FixedAssetValueModelsCollection|error`

Sample code:

```ballerina
fixedasset:FixedAssetValueModelsCollection models = check fo->listFixedAssetValueModels(
    queries = {
        filter: "dataAreaId eq 'USMF' and Status eq 'Open'",
        top: 25
    }
);
```

</details>

<details>
<summary>createFixedAssetValueModels</summary>

Creates a fixed asset value model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FixedAssetValueModel` | Yes | The value model to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:FixedAssetValueModel|error`

Sample code:

```ballerina
fixedasset:FixedAssetValueModel model = check fo->createFixedAssetValueModels({
    dataAreaId: "USMF",
    fixedAssetNumber: "FA-001028",
    valueModelId: "DEPR",
    depreciationProfileId: "SL-5YR",
    acquisitionPrice: 25000.00,
    serviceLifeYears: 5,
    status: "Open"
});
```

</details>

<details>
<summary>getFixedAssetValueModels</summary>

Reads a specific fixed asset value model by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `valueModelId` | `string` | Yes | The value model id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetFixedAssetValueModelsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:FixedAssetValueModel|error`

Sample code:

```ballerina
fixedasset:FixedAssetValueModel model = check fo->getFixedAssetValueModels(
    "USMF",
    "FA-001028",
    "DEPR"
);
```

</details>

<details>
<summary>deleteFixedAssetValueModels</summary>

Deletes a specific fixed asset value model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `valueModelId` | `string` | Yes | The value model id key field. |
| `headers` | `DeleteFixedAssetValueModelsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFixedAssetValueModels(
    "USMF",
    "FA-001028",
    "DEPR",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateFixedAssetValueModels</summary>

Updates a specific fixed asset value model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `valueModelId` | `string` | Yes | The value model id key field. |
| `payload` | `FixedAssetValueModel` | Yes | The fields to update. |
| `headers` | `UpdateFixedAssetValueModelsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:FixedAssetValueModel|error`

Sample code:

```ballerina
fixedasset:FixedAssetValueModel updated = check fo->updateFixedAssetValueModels(
    "USMF",
    "FA-001028",
    "DEPR",
    {status: "Closed"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Fixed assets

<details>
<summary>listFixedAssets</summary>

Reads all fixed asset master records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListFixedAssetsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:FixedAssetsCollection|error`

Sample code:

```ballerina
fixedasset:FixedAssetsCollection assets = check fo->listFixedAssets(
    queries = {
        filter: "dataAreaId eq 'USMF' and FixedAssetGroupId eq 'VEHICLES'",
        top: 20,
        'select: "FixedAssetNumber,Name,Type,AcquisitionDate"
    }
);
```

</details>

<details>
<summary>createFixedAssets</summary>

Creates a fixed asset master record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FixedAsset` | Yes | The fixed asset to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:FixedAsset|error`

Sample code:

```ballerina
fixedasset:FixedAsset asset = check fo->createFixedAssets({
    dataAreaId: "USMF",
    fixedAssetNumber: "FA-001028",
    name: "Forklift - Warehouse 4",
    fixedAssetGroupId: "VEHICLES",
    'type: "Tangible",
    acquisitionDate: "2026-01-10",
    acquisitionPrice: 25000.00
});
```

</details>

<details>
<summary>getFixedAssets</summary>

Reads a specific fixed asset master record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetFixedAssetsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:FixedAsset|error`

Sample code:

```ballerina
fixedasset:FixedAsset asset = check fo->getFixedAssets(
    "USMF",
    "FA-001028"
);
```

</details>

<details>
<summary>deleteFixedAssets</summary>

Deletes a specific fixed asset master record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `headers` | `DeleteFixedAssetsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFixedAssets(
    "USMF",
    "FA-001028",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateFixedAssets</summary>

Updates a specific fixed asset master record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `payload` | `FixedAsset` | Yes | The fields to update. |
| `headers` | `UpdateFixedAssetsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:FixedAsset|error`

Sample code:

```ballerina
fixedasset:FixedAsset updated = check fo->updateFixedAssets(
    "USMF",
    "FA-001028",
    {name: "Forklift - Warehouse 4 (relocated)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Fixed assets V2

<details>
<summary>listFixedAssetsV2</summary>

Reads all fixed asset master records (V2 entity, exposing an extended field set).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListFixedAssetsV2Queries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:FixedAssetsV2Collection|error`

Sample code:

```ballerina
fixedasset:FixedAssetsV2Collection assets = check fo->listFixedAssetsV2(
    queries = {
        filter: "dataAreaId eq 'USMF' and Type eq 'Tangible'",
        top: 20
    }
);
```

</details>

<details>
<summary>createFixedAssetsV2</summary>

Creates a fixed asset master record (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FixedAssetV2Entity` | Yes | The fixed asset to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:FixedAssetV2Entity|error`

Sample code:

```ballerina
fixedasset:FixedAssetV2Entity asset = check fo->createFixedAssetsV2({
    dataAreaId: "USMF",
    fixedAssetNumber: "FA-002044",
    name: "Company vehicle - Sedan",
    'type: "Tangible",
    acquisitionDate: "2026-02-01",
    acquisitionPrice: 32000.00
});
```

</details>

<details>
<summary>getFixedAssetsV2</summary>

Reads a specific fixed asset master record by key (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetFixedAssetsV2Queries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:FixedAssetV2Entity|error`

Sample code:

```ballerina
fixedasset:FixedAssetV2Entity asset = check fo->getFixedAssetsV2(
    "USMF",
    "FA-002044"
);
```

</details>

<details>
<summary>deleteFixedAssetsV2</summary>

Deletes a specific fixed asset master record (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `headers` | `DeleteFixedAssetsV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteFixedAssetsV2(
    "USMF",
    "FA-002044",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateFixedAssetsV2</summary>

Updates a specific fixed asset master record (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fixedAssetNumber` | `string` | Yes | The fixed asset number key field. |
| `payload` | `FixedAssetV2Entity` | Yes | The fields to update. |
| `headers` | `UpdateFixedAssetsV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:FixedAssetV2Entity|error`

Sample code:

```ballerina
fixedasset:FixedAssetV2Entity updated = check fo->updateFixedAssetsV2(
    "USMF",
    "FA-002044",
    {name: "Company vehicle - Sedan (fleet 2)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Leasing groups

<details>
<summary>listLeasingGroups</summary>

Reads all leasing groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListLeasingGroupsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:LeasingGroupsCollection|error`

Sample code:

```ballerina
fixedasset:LeasingGroupsCollection groups = check fo->listLeasingGroups(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createLeasingGroups</summary>

Creates a leasing group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LeasingGroup` | Yes | The leasing group to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:LeasingGroup|error`

Sample code:

```ballerina
fixedasset:LeasingGroup group = check fo->createLeasingGroups({
    dataAreaId: "USMF",
    leaseGroup: "OFFICE",
    company: "USMF",
    description: "Office equipment leases"
});
```

</details>

<details>
<summary>getLeasingGroups</summary>

Reads a specific leasing group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseGroup` | `string` | Yes | The lease group key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetLeasingGroupsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:LeasingGroup|error`

Sample code:

```ballerina
fixedasset:LeasingGroup group = check fo->getLeasingGroups(
    "USMF",
    "OFFICE"
);
```

</details>

<details>
<summary>deleteLeasingGroups</summary>

Deletes a specific leasing group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseGroup` | `string` | Yes | The lease group key field. |
| `headers` | `DeleteLeasingGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLeasingGroups(
    "USMF",
    "OFFICE",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLeasingGroups</summary>

Updates a specific leasing group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseGroup` | `string` | Yes | The lease group key field. |
| `payload` | `LeasingGroup` | Yes | The fields to update. |
| `headers` | `UpdateLeasingGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:LeasingGroup|error`

Sample code:

```ballerina
fixedasset:LeasingGroup updated = check fo->updateLeasingGroups(
    "USMF",
    "OFFICE",
    {description: "Office and IT equipment leases"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Parent leases

<details>
<summary>listParentLeases</summary>

Reads all parent lease records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListParentLeasesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:ParentLeasesCollection|error`

Sample code:

```ballerina
fixedasset:ParentLeasesCollection leases = check fo->listParentLeases(
    queries = {
        filter: "dataAreaId eq 'USMF' and VendorAccount eq 'V-2050'",
        top: 20
    }
);
```

</details>

<details>
<summary>createParentLeases</summary>

Creates a parent lease record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ParentLease` | Yes | The parent lease to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:ParentLease|error`

Sample code:

```ballerina
fixedasset:ParentLease lease = check fo->createParentLeases({
    dataAreaId: "USMF",
    leaseId: "LEASE-0077",
    company: "USMF",
    leaseDescription: "Delivery van lease",
    leaseStartDate: "2026-01-01",
    currency: "USD",
    vendorAccount: "V-2050",
    annuityType: "OrdinaryAnnuity"
});
```

</details>

<details>
<summary>getParentLeases</summary>

Reads a specific parent lease record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseId` | `string` | Yes | The lease id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetParentLeasesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:ParentLease|error`

Sample code:

```ballerina
fixedasset:ParentLease lease = check fo->getParentLeases(
    "USMF",
    "LEASE-0077"
);
```

</details>

<details>
<summary>deleteParentLeases</summary>

Deletes a specific parent lease record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseId` | `string` | Yes | The lease id key field. |
| `headers` | `DeleteParentLeasesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteParentLeases(
    "USMF",
    "LEASE-0077",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateParentLeases</summary>

Updates a specific parent lease record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `leaseId` | `string` | Yes | The lease id key field. |
| `payload` | `ParentLease` | Yes | The fields to update. |
| `headers` | `UpdateParentLeasesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:ParentLease|error`

Sample code:

```ballerina
fixedasset:ParentLease updated = check fo->updateParentLeases(
    "USMF",
    "LEASE-0077",
    {leaseDescription: "Delivery van lease - renewed"},
    headers = {ifMatch: eTag}
);
```

</details>

#### R asset groups

<details>
<summary>listRAssetGroups</summary>

Reads all depreciation asset groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListRAssetGroupsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:RAssetGroupsCollection|error`

Sample code:

```ballerina
fixedasset:RAssetGroupsCollection groups = check fo->listRAssetGroups(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createRAssetGroups</summary>

Creates a depreciation asset group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RAssetGroup` | Yes | The depreciation asset group to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:RAssetGroup|error`

Sample code:

```ballerina
fixedasset:RAssetGroup group = check fo->createRAssetGroups({
    dataAreaId: "USMF",
    depreciationGroup: "OFFICEEQ",
    name: "Office equipment",
    valueModel: "DEPR",
    lifetime: 5,
    yearRate: 20.0,
    depreciationStartDate: "AcquisitionDate"
});
```

</details>

<details>
<summary>getRAssetGroups</summary>

Reads a specific depreciation asset group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `depreciationGroup` | `string` | Yes | The depreciation group key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetRAssetGroupsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:RAssetGroup|error`

Sample code:

```ballerina
fixedasset:RAssetGroup group = check fo->getRAssetGroups(
    "USMF",
    "OFFICEEQ"
);
```

</details>

<details>
<summary>deleteRAssetGroups</summary>

Deletes a specific depreciation asset group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `depreciationGroup` | `string` | Yes | The depreciation group key field. |
| `headers` | `DeleteRAssetGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRAssetGroups(
    "USMF",
    "OFFICEEQ",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateRAssetGroups</summary>

Updates a specific depreciation asset group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `depreciationGroup` | `string` | Yes | The depreciation group key field. |
| `payload` | `RAssetGroup` | Yes | The fields to update. |
| `headers` | `UpdateRAssetGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:RAssetGroup|error`

Sample code:

```ballerina
fixedasset:RAssetGroup updated = check fo->updateRAssetGroups(
    "USMF",
    "OFFICEEQ",
    {yearRate: 25.0},
    headers = {ifMatch: eTag}
);
```

</details>

#### R asset ledgers

<details>
<summary>listRAssetLedgers</summary>

Reads all legacy asset ledger posting profiles.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListRAssetLedgersQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:RAssetLedgersCollection|error`

Sample code:

```ballerina
fixedasset:RAssetLedgersCollection ledgers = check fo->listRAssetLedgers(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createRAssetLedgers</summary>

Creates a legacy asset ledger posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RAssetLedger` | Yes | The asset ledger posting profile to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:RAssetLedger|error`

Sample code:

```ballerina
fixedasset:RAssetLedger ledger = check fo->createRAssetLedgers({
    dataAreaId: "USMF",
    postingProfile: "FAPOST01",
    description: "Standard fixed asset posting profile"
});
```

</details>

<details>
<summary>getRAssetLedgers</summary>

Reads a specific legacy asset ledger posting profile by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetRAssetLedgersQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:RAssetLedger|error`

Sample code:

```ballerina
fixedasset:RAssetLedger ledger = check fo->getRAssetLedgers(
    "USMF",
    "FAPOST01"
);
```

</details>

<details>
<summary>deleteRAssetLedgers</summary>

Deletes a specific legacy asset ledger posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `headers` | `DeleteRAssetLedgersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRAssetLedgers(
    "USMF",
    "FAPOST01",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateRAssetLedgers</summary>

Updates a specific legacy asset ledger posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `payload` | `RAssetLedger` | Yes | The fields to update. |
| `headers` | `UpdateRAssetLedgersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:RAssetLedger|error`

Sample code:

```ballerina
fixedasset:RAssetLedger updated = check fo->updateRAssetLedgers(
    "USMF",
    "FAPOST01",
    {description: "Standard fixed asset posting profile - revised"},
    headers = {ifMatch: eTag}
);
```

</details>

#### R asset tables

<details>
<summary>listRAssetTables</summary>

Reads all legacy asset ledger tables.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListRAssetTablesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:RAssetTablesCollection|error`

Sample code:

```ballerina
fixedasset:RAssetTablesCollection tables = check fo->listRAssetTables(
    queries = {
        filter: "dataAreaId eq 'USMF' and AssetType eq 'Vehicle'",
        top: 20
    }
);
```

</details>

<details>
<summary>createRAssetTables</summary>

Creates a legacy asset ledger table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RAssetTable` | Yes | The legacy asset record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:RAssetTable|error`

Sample code:

```ballerina
fixedasset:RAssetTable legacyAsset = check fo->createRAssetTables({
    dataAreaId: "USMF",
    fAInventoryNumber: "FA-LEG-0091",
    name: "Delivery truck",
    assetType: "Vehicle",
    acquisitionDate: "2020-05-01",
    acquisitionCost: 45000.00,
    serialNumber: "SN-88421"
});
```

</details>

<details>
<summary>getRAssetTables</summary>

Reads a specific legacy asset ledger table entry by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetRAssetTablesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:RAssetTable|error`

Sample code:

```ballerina
fixedasset:RAssetTable legacyAsset = check fo->getRAssetTables(
    "USMF",
    "FA-LEG-0091"
);
```

</details>

<details>
<summary>deleteRAssetTables</summary>

Deletes a specific legacy asset ledger table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `headers` | `DeleteRAssetTablesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRAssetTables(
    "USMF",
    "FA-LEG-0091",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateRAssetTables</summary>

Updates a specific legacy asset ledger table entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `payload` | `RAssetTable` | Yes | The fields to update. |
| `headers` | `UpdateRAssetTablesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:RAssetTable|error`

Sample code:

```ballerina
fixedasset:RAssetTable updated = check fo->updateRAssetTables(
    "USMF",
    "FA-LEG-0091",
    {name: "Delivery truck - fleet 2"},
    headers = {ifMatch: eTag}
);
```

</details>

#### R asset uses

<details>
<summary>listRAssetUses</summary>

Reads all legacy asset usage records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListRAssetUsesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `fixedasset:RAssetUsesCollection|error`

Sample code:

```ballerina
fixedasset:RAssetUsesCollection uses = check fo->listRAssetUses(
    queries = {
        filter: "dataAreaId eq 'USMF' and FAInventoryNumber eq 'FA-LEG-0091'"
    }
);
```

</details>

<details>
<summary>createRAssetUses</summary>

Creates a legacy asset usage record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RAssetUse` | Yes | The asset usage record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `fixedasset:RAssetUse|error`

Sample code:

```ballerina
fixedasset:RAssetUse use = check fo->createRAssetUses({
    dataAreaId: "USMF",
    fAInventoryNumber: "FA-LEG-0091",
    period: "2026-01",
    outputMileage: 1250.5
});
```

</details>

<details>
<summary>getRAssetUses</summary>

Reads a specific legacy asset usage record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `period` | `string` | Yes | The period key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetRAssetUsesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `fixedasset:RAssetUse|error`

Sample code:

```ballerina
fixedasset:RAssetUse use = check fo->getRAssetUses(
    "USMF",
    "FA-LEG-0091",
    "2026-01"
);
```

</details>

<details>
<summary>deleteRAssetUses</summary>

Deletes a specific legacy asset usage record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `period` | `string` | Yes | The period key field. |
| `headers` | `DeleteRAssetUsesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRAssetUses(
    "USMF",
    "FA-LEG-0091",
    "2026-01",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateRAssetUses</summary>

Updates a specific legacy asset usage record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `fAInventoryNumber` | `string` | Yes | The fixed asset inventory number key field. |
| `period` | `string` | Yes | The period key field. |
| `payload` | `RAssetUse` | Yes | The fields to update. |
| `headers` | `UpdateRAssetUsesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `fixedasset:RAssetUse|error`

Sample code:

```ballerina
fixedasset:RAssetUse updated = check fo->updateRAssetUses(
    "USMF",
    "FA-LEG-0091",
    "2026-01",
    {outputMileage: 1400.0},
    headers = {ifMatch: eTag}
);
```

</details>
