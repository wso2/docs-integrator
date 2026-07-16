# Actions

The `ballerinax/sap.businessone.inventory` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One inventory objects — items, item groups & properties; goods receipts, goods issues & inventory postings; stock transfers, transfer requests & drafts; inventory countings, opening balances & cycle counts; price lists, special prices & discount groups; batches, serials & bar codes; warehouses, locations & bin locations; units of measurement, measures & packages types; pick lists & material revaluations — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the inventory objects exposed by the SAP Business One Service Layer — item master data, item groups, properties, and images; goods receipts, goods issues, stock transfers, transfer requests, and their drafts; inventory countings, opening balances, and cycle count determinations; price lists, special prices, and enhanced discount groups; batch and serial number details; bar codes; warehouses, warehouse locations, sublevel codes, and bin locations (fields and attributes); units of measurement, weight/length measures, and packages types; and pick lists and material revaluations.

### Configuration

#### SessionConfig

SAP Business One Service Layer session credentials, passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database to log in to |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer user password |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Service Layer HTTP endpoint. Passed as the optional second argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
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
import ballerinax/sap.businessone.inventory;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

inventory:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### BatchNumberDetails

<details>
<summary>listBatchNumberDetails</summary>

Queries the BatchNumberDetails collection, returning a page of batch number detail entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBatchNumberDetailsHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListBatchNumberDetailsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `BatchNumberDetailsCollectionResponse|error`

**Sample code:**

```ballerina
BatchNumberDetailsCollectionResponse result = check client->listBatchNumberDetails();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BatchNumberDetails",
  "value": [
    {
      "DocEntry": 12,
      "ItemCode": "A00001",
      "ItemDescription": "Sample Item",
      "Status": "bdsStatus_Released",
      "Batch": "BATCH-001",
      "AdmissionDate": "2026-01-15",
      "ExpirationDate": "2027-01-15",
      "SystemNumber": 1
    }
  ],
  "odata.nextLink": "BatchNumberDetails?$skip=20"
}
```

</details>

<details>
<summary>createBatchNumberDetails</summary>

Creates a new BatchNumberDetail entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BatchNumberDetail</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `BatchNumberDetail|error`

**Sample code:**

```ballerina
BatchNumberDetail result = check client->createBatchNumberDetails(payload);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "ItemCode": "A00001",
  "ItemDescription": "Sample Item",
  "Status": "bdsStatus_Released",
  "Batch": "BATCH-001",
  "BatchAttribute1": "Grade A",
  "AdmissionDate": "2026-01-15",
  "ManufacturingDate": "2026-01-10",
  "ExpirationDate": "2027-01-15",
  "Details": "Initial batch",
  "SystemNumber": 1
}
```

</details>

<details>
<summary>getBatchNumberDetails</summary>

Retrieves a single BatchNumberDetail entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetBatchNumberDetailsQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `BatchNumberDetail|error`

**Sample code:**

```ballerina
BatchNumberDetail result = check client->getBatchNumberDetails(12);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "ItemCode": "A00001",
  "ItemDescription": "Sample Item",
  "Status": "bdsStatus_Released",
  "Batch": "BATCH-001",
  "BatchAttribute1": "Grade A",
  "AdmissionDate": "2026-01-15",
  "ManufacturingDate": "2026-01-10",
  "ExpirationDate": "2027-01-15",
  "Details": "Initial batch",
  "SystemNumber": 1
}
```

</details>

<details>
<summary>deleteBatchNumberDetails</summary>

Deletes a BatchNumberDetail entity identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBatchNumberDetails(12);
```

</details>

<details>
<summary>updateBatchNumberDetails</summary>

Partially updates a BatchNumberDetail entity identified by its `DocEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `payload` | <code>BatchNumberDetail</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBatchNumberDetails(12, payload);
```

</details>

#### BinLocationAttributes

<details>
<summary>listBinLocationAttributes</summary>

Queries the BinLocationAttributes collection, returning a page of bin location attribute entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBinLocationAttributesHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListBinLocationAttributesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `BinLocationAttributesCollectionResponse|error`

**Sample code:**

```ballerina
BinLocationAttributesCollectionResponse result = check client->listBinLocationAttributes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BinLocationAttributes",
  "value": [
    {
      "AbsEntry": 5,
      "Code": "BULK",
      "Attribute": 2
    }
  ],
  "odata.nextLink": "BinLocationAttributes?$skip=20"
}
```

</details>

<details>
<summary>createBinLocationAttributes</summary>

Creates a new BinLocationAttribute entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BinLocationAttribute</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `BinLocationAttribute|error`

**Sample code:**

```ballerina
BinLocationAttribute result = check client->createBinLocationAttributes(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 5,
  "Code": "BULK",
  "Attribute": 2,
  "BinLocationField": {
    "AbsEntry": 1,
    "FieldNumber": 10,
    "DefaultFieldName": "Aisle",
    "FieldType": "blftBinLocationAttribute"
  }
}
```

</details>

<details>
<summary>getBinLocationAttributes</summary>

Retrieves a single BinLocationAttribute entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetBinLocationAttributesQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `BinLocationAttribute|error`

**Sample code:**

```ballerina
BinLocationAttribute result = check client->getBinLocationAttributes(5);
```

**Sample response:**

```json
{
  "AbsEntry": 5,
  "Code": "BULK",
  "Attribute": 2,
  "BinLocationField": {
    "AbsEntry": 1,
    "FieldNumber": 10,
    "DefaultFieldName": "Aisle",
    "FieldType": "blftBinLocationAttribute"
  }
}
```

</details>

<details>
<summary>deleteBinLocationAttributes</summary>

Deletes a BinLocationAttribute entity identified by its `AbsEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBinLocationAttributes(5);
```

</details>

<details>
<summary>updateBinLocationAttributes</summary>

Partially updates a BinLocationAttribute entity identified by its `AbsEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>BinLocationAttribute</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBinLocationAttributes(5, payload);
```

</details>

<details>
<summary>binLocationAttributesServiceGetList</summary>

Calls the BinLocationAttributesService_GetList function import to retrieve a lightweight list of bin location attribute parameters (`AbsEntry`, `Attribute`, `Code`).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check client->binLocationAttributesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BinLocationAttributesService_GetList",
  "value": [
    {
      "AbsEntry": 5,
      "Attribute": 2,
      "Code": "BULK"
    }
  ]
}
```

</details>

#### EnhancedDiscountGroups

<details>
<summary>listEnhancedDiscountGroups</summary>

Queries the EnhancedDiscountGroups collection, returning a page of enhanced discount group entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEnhancedDiscountGroupsHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListEnhancedDiscountGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `EnhancedDiscountGroupsCollectionResponse|error`

**Sample code:**

```ballerina
EnhancedDiscountGroupsCollectionResponse result = check client->listEnhancedDiscountGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#EnhancedDiscountGroups",
  "value": [
    {
      "AbsEntry": 3,
      "Type": "dgt_CustomerGroup",
      "Active": "tYES",
      "DiscountRelations": "dgrHighestDiscount",
      "ValidFrom": "2026-01-01",
      "ValidTo": "2026-12-31",
      "ObjectCode": "112"
    }
  ],
  "odata.nextLink": "EnhancedDiscountGroups?$skip=20"
}
```

</details>

<details>
<summary>createEnhancedDiscountGroups</summary>

Creates a new EnhancedDiscountGroup entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EnhancedDiscountGroup</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EnhancedDiscountGroup|error`

**Sample code:**

```ballerina
EnhancedDiscountGroup result = check client->createEnhancedDiscountGroups(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 3,
  "Type": "dgt_CustomerGroup",
  "Active": "tYES",
  "DiscountRelations": "dgrHighestDiscount",
  "ValidFrom": "2026-01-01",
  "ValidTo": "2026-12-31",
  "DiscountGroupLineCollection": [],
  "ObjectCode": "112"
}
```

</details>

<details>
<summary>getEnhancedDiscountGroups</summary>

Retrieves a single EnhancedDiscountGroup entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetEnhancedDiscountGroupsQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `EnhancedDiscountGroup|error`

**Sample code:**

```ballerina
EnhancedDiscountGroup result = check client->getEnhancedDiscountGroups(3);
```

**Sample response:**

```json
{
  "AbsEntry": 3,
  "Type": "dgt_CustomerGroup",
  "Active": "tYES",
  "DiscountRelations": "dgrHighestDiscount",
  "ValidFrom": "2026-01-01",
  "ValidTo": "2026-12-31",
  "DiscountGroupLineCollection": [],
  "ObjectCode": "112"
}
```

</details>

<details>
<summary>deleteEnhancedDiscountGroups</summary>

Deletes an EnhancedDiscountGroup entity identified by its `AbsEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEnhancedDiscountGroups(3);
```

</details>

<details>
<summary>updateEnhancedDiscountGroups</summary>

Partially updates an EnhancedDiscountGroup entity identified by its `AbsEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>EnhancedDiscountGroup</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEnhancedDiscountGroups(3, payload);
```

</details>

<details>
<summary>enhancedDiscountGroupsServiceGetList</summary>

Calls the EnhancedDiscountGroupsService_GetList function import to retrieve a lightweight list of enhanced discount group parameters (`Type`, `AbsEntry`, `ObjectCode`).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_6|error`

**Sample code:**

```ballerina
inline_response_200_6 result = check client->enhancedDiscountGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#EnhancedDiscountGroupsService_GetList",
  "value": [
    {
      "Type": "dgt_CustomerGroup",
      "AbsEntry": 3,
      "ObjectCode": "112"
    }
  ]
}
```

</details>

#### InventoryGenEntries

<details>
<summary>listInventoryGenEntries</summary>

Queries the InventoryGenEntries collection, returning a page of goods receipt/inventory entry documents that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryGenEntriesHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListInventoryGenEntriesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `InventoryGenEntriesCollectionResponse|error`

**Sample code:**

```ballerina
InventoryGenEntriesCollectionResponse result = check client->listInventoryGenEntries();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryGenEntries",
  "value": [
    {
      "DocEntry": 145,
      "DocNum": 90045,
      "DocType": "dDocument_Items",
      "DocDate": "2026-07-10",
      "CardCode": "",
      "Comments": "Manual inventory increase",
      "DocTotal": 1500.00
    }
  ],
  "odata.nextLink": "InventoryGenEntries?$skip=20"
}
```

</details>

<details>
<summary>createInventoryGenEntries</summary>

Creates a new inventory goods receipt Document in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createInventoryGenEntries(payload);
```

**Sample response:**

```json
{
  "DocEntry": 145,
  "DocNum": 90045,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-10",
  "DocDueDate": "2026-07-10",
  "Comments": "Manual inventory increase",
  "DocTotal": 1500.00,
  "Series": 1
}
```

</details>

<details>
<summary>getInventoryGenEntries</summary>

Retrieves a single inventory goods receipt Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetInventoryGenEntriesQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getInventoryGenEntries(145);
```

**Sample response:**

```json
{
  "DocEntry": 145,
  "DocNum": 90045,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-10",
  "DocDueDate": "2026-07-10",
  "Comments": "Manual inventory increase",
  "DocTotal": 1500.00,
  "Series": 1
}
```

</details>

<details>
<summary>deleteInventoryGenEntries</summary>

Deletes an inventory goods receipt Document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryGenEntries(145);
```

</details>

<details>
<summary>updateInventoryGenEntries</summary>

Partially updates an inventory goods receipt Document identified by its `DocEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `payload` | <code>Document</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryGenEntries(145, payload);
```

</details>

<details>
<summary>inventoryGenEntriesCancel</summary>

Invokes the bound action `Cancel` on the InventoryGenEntries document identified by `DocEntry`, cancelling the document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntriesCancel(145);
```

</details>

<details>
<summary>inventoryGenEntriesClose</summary>

Invokes the bound action `Close` on the InventoryGenEntries document identified by `DocEntry`, closing the document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntriesClose(145);
```

</details>

<details>
<summary>inventoryGenEntriesCreateCancellationDocument</summary>

Invokes the bound action `CreateCancellationDocument` on the InventoryGenEntries document identified by `DocEntry`, generating and returning the resulting cancellation Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->inventoryGenEntriesCreateCancellationDocument(145);
```

**Sample response:**

```json
{
  "DocEntry": 146,
  "DocNum": 90046,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-10",
  "Comments": "Cancellation of 90045"
}
```

</details>

<details>
<summary>inventoryGenEntriesReopen</summary>

Invokes the bound action `Reopen` on the InventoryGenEntries document identified by `DocEntry`, reopening a previously closed document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntriesReopen(145);
```

</details>

<details>
<summary>inventoryGenEntryServiceApproveAndAdd</summary>

Calls the InventoryGenEntryService_ApproveAndAdd function import to approve and add a new inventory goods receipt Document in one step; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenEntryService_ApproveAndAdd_body</code> | Yes | Request payload containing the `Document` to approve and add. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntryServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>inventoryGenEntryServiceApproveAndUpdate</summary>

Calls the InventoryGenEntryService_ApproveAndUpdate function import to approve and update an existing inventory goods receipt Document in one step; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenEntryService_ApproveAndUpdate_body</code> | Yes | Request payload containing the `Document` to approve and update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntryServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>inventoryGenEntryServiceCloseByDate</summary>

Calls the InventoryGenEntryService_CloseByDate function import to close inventory goods receipt documents up to a specified date; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenEntryService_CloseByDate_body</code> | Yes | Request payload containing the `DocumentCloseParams`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntryServiceCloseByDate(payload);
```

</details>

<details>
<summary>inventoryGenEntryServiceExportEWayBill</summary>

Calls the InventoryGenEntryService_ExportEWayBill function import to export the E-Way bill information for an inventory goods receipt Document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenEntryService_ExportEWayBill_body</code> | Yes | Request payload containing the `Document`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntryServiceExportEWayBill(payload);
```

</details>

<details>
<summary>inventoryGenEntryServiceGetApprovalTemplates</summary>

Calls the InventoryGenEntryService_GetApprovalTemplates function import to retrieve the approval templates applicable to a given inventory goods receipt Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenEntryService_GetApprovalTemplates_body</code> | Yes | Request payload containing the `Document`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->inventoryGenEntryServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 145,
  "DocNum": 90045,
  "DocType": "dDocument_Items"
}
```

</details>

<details>
<summary>inventoryGenEntryServiceHandleApprovalRequest</summary>

Calls the InventoryGenEntryService_HandleApprovalRequest function import to process a pending approval request for an inventory goods receipt document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenEntryServiceHandleApprovalRequest();
```

</details>

<details>
<summary>inventoryGenEntryServiceInitData</summary>

Calls the InventoryGenEntryService_InitData function import to obtain an initialized Document template with default values for a new inventory goods receipt.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->inventoryGenEntryServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-10",
  "Series": 1
}
```

</details>

#### InventoryOpeningBalanceDrafts

<details>
<summary>listInventoryOpeningBalanceDrafts</summary>

Queries the InventoryOpeningBalanceDrafts collection, returning a page of draft inventory opening balance documents that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryOpeningBalanceDraftsHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListInventoryOpeningBalanceDraftsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `InventoryOpeningBalanceDraftsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryOpeningBalanceDraftsCollectionResponse result = check client->listInventoryOpeningBalanceDrafts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryOpeningBalanceDrafts",
  "value": [
    {
      "DocumentEntry": 8,
      "DocumentNumber": 2001,
      "Series": 1
    }
  ],
  "odata.nextLink": "InventoryOpeningBalanceDrafts?$skip=20"
}
```

</details>

<details>
<summary>createInventoryOpeningBalanceDrafts</summary>

Creates a new InventoryOpeningBalanceDraft entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryOpeningBalanceDraft</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `InventoryOpeningBalanceDraft|error`

**Sample code:**

```ballerina
InventoryOpeningBalanceDraft result = check client->createInventoryOpeningBalanceDrafts(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 8,
  "DocumentNumber": 2001,
  "Series": 1
}
```

</details>

<details>
<summary>getInventoryOpeningBalanceDrafts</summary>

Retrieves a single InventoryOpeningBalanceDraft entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetInventoryOpeningBalanceDraftsQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `InventoryOpeningBalanceDraft|error`

**Sample code:**

```ballerina
InventoryOpeningBalanceDraft result = check client->getInventoryOpeningBalanceDrafts(8);
```

**Sample response:**

```json
{
  "DocumentEntry": 8,
  "DocumentNumber": 2001,
  "Series": 1
}
```

</details>

<details>
<summary>deleteInventoryOpeningBalanceDrafts</summary>

Deletes an InventoryOpeningBalanceDraft entity identified by its `DocumentEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryOpeningBalanceDrafts(8);
```

</details>

<details>
<summary>updateInventoryOpeningBalanceDrafts</summary>

Partially updates an InventoryOpeningBalanceDraft entity identified by its `DocumentEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32). |
| `payload` | <code>InventoryOpeningBalanceDraft</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryOpeningBalanceDrafts(8, payload);
```

</details>

#### Items

<details>
<summary>listItems</summary>

Queries the Items collection, returning a page of item master data entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListItemsHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListItemsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `ItemsCollectionResponse|error`

**Sample code:**

```ballerina
ItemsCollectionResponse result = check client->listItems();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Items",
  "value": [
    {
      "ItemCode": "A00001",
      "ItemName": "Sample Item",
      "ItemsGroupCode": 100,
      "BarCode": "1234567890123",
      "InventoryItem": "tYES",
      "QuantityOnStock": 250
    }
  ],
  "odata.nextLink": "Items?$skip=20"
}
```

</details>

<details>
<summary>createItems</summary>

Creates a new Item entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Item</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Item|error`

**Sample code:**

```ballerina
Item result = check client->createItems(payload);
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "ItemName": "Sample Item",
  "ItemsGroupCode": 100,
  "BarCode": "1234567890123",
  "VatLiable": "tYES",
  "PurchaseItem": "tYES",
  "SalesItem": "tYES",
  "InventoryItem": "tYES",
  "QuantityOnStock": 0
}
```

</details>

<details>
<summary>getItems</summary>

Retrieves a single Item entity identified by its `ItemCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetItemsQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `Item|error`

**Sample code:**

```ballerina
Item result = check client->getItems("A00001");
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "ItemName": "Sample Item",
  "ItemsGroupCode": 100,
  "BarCode": "1234567890123",
  "InventoryItem": "tYES",
  "QuantityOnStock": 250
}
```

</details>

<details>
<summary>deleteItems</summary>

Deletes an Item entity identified by its `ItemCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteItems("A00001");
```

</details>

<details>
<summary>updateItems</summary>

Partially updates an Item entity identified by its `ItemCode` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `payload` | <code>Item</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateItems("A00001", payload);
```

</details>

<details>
<summary>itemsCancel</summary>

Invokes the bound action `Cancel` on the Items entity identified by `ItemCode`; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->itemsCancel("A00001");
```

</details>

<details>
<summary>itemsServiceInitData</summary>

Calls the ItemsService_InitData function import to obtain an initialized Item template with default values for a new item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Item|error`

**Sample code:**

```ballerina
Item result = check client->itemsServiceInitData();
```

**Sample response:**

```json
{
  "ItemCode": "",
  "ItemName": "",
  "InventoryItem": "tYES",
  "QuantityOnStock": 0
}
```

</details>

#### LengthMeasures

<details>
<summary>listLengthMeasures</summary>

Queries the LengthMeasures collection, returning a page of length unit-of-measure entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListLengthMeasuresHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListLengthMeasuresQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `LengthMeasuresCollectionResponse|error`

**Sample code:**

```ballerina
LengthMeasuresCollectionResponse result = check client->listLengthMeasures();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#LengthMeasures",
  "value": [
    {
      "UnitCode": 2,
      "UnitName": "Meter",
      "UnitDisplay": "m",
      "UnitLengthinmm": 1000
    }
  ],
  "odata.nextLink": "LengthMeasures?$skip=20"
}
```

</details>

<details>
<summary>createLengthMeasures</summary>

Creates a new LengthMeasure entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LengthMeasure</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `LengthMeasure|error`

**Sample code:**

```ballerina
LengthMeasure result = check client->createLengthMeasures(payload);
```

**Sample response:**

```json
{
  "UnitCode": 2,
  "UnitName": "Meter",
  "UnitDisplay": "m",
  "UnitCodeforQuantityDisplay": "m",
  "UnitLengthinmm": 1000
}
```

</details>

<details>
<summary>getLengthMeasures</summary>

Retrieves a single LengthMeasure entity identified by its `UnitCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `unitCode` | <code>int:Signed32</code> | Yes | Key property 'UnitCode' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetLengthMeasuresQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `LengthMeasure|error`

**Sample code:**

```ballerina
LengthMeasure result = check client->getLengthMeasures(2);
```

**Sample response:**

```json
{
  "UnitCode": 2,
  "UnitName": "Meter",
  "UnitDisplay": "m",
  "UnitCodeforQuantityDisplay": "m",
  "UnitLengthinmm": 1000
}
```

</details>

<details>
<summary>deleteLengthMeasures</summary>

Deletes a LengthMeasure entity identified by its `UnitCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `unitCode` | <code>int:Signed32</code> | Yes | Key property 'UnitCode' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLengthMeasures(2);
```

</details>

<details>
<summary>updateLengthMeasures</summary>

Partially updates a LengthMeasure entity identified by its `UnitCode` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `unitCode` | <code>int:Signed32</code> | Yes | Key property 'UnitCode' (Edm.Int32). |
| `payload` | <code>LengthMeasure</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLengthMeasures(2, payload);
```

</details>

#### SerialNumberDetails

<details>
<summary>listSerialNumberDetails</summary>

Queries the SerialNumberDetails collection, returning a page of serial number detail entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSerialNumberDetailsHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListSerialNumberDetailsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `SerialNumberDetailsCollectionResponse|error`

**Sample code:**

```ballerina
SerialNumberDetailsCollectionResponse result = check client->listSerialNumberDetails();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#SerialNumberDetails",
  "value": [
    {
      "DocEntry": 21,
      "ItemCode": "A00001",
      "ItemDescription": "Sample Item",
      "SerialNumber": "SN-0001",
      "SystemNumber": 1,
      "Location": "Main Warehouse"
    }
  ],
  "odata.nextLink": "SerialNumberDetails?$skip=20"
}
```

</details>

<details>
<summary>createSerialNumberDetails</summary>

Creates a new SerialNumberDetail entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SerialNumberDetail</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `SerialNumberDetail|error`

**Sample code:**

```ballerina
SerialNumberDetail result = check client->createSerialNumberDetails(payload);
```

**Sample response:**

```json
{
  "DocEntry": 21,
  "ItemCode": "A00001",
  "ItemDescription": "Sample Item",
  "MfrSerialNo": "MFR-SN-0001",
  "SerialNumber": "SN-0001",
  "SystemNumber": 1,
  "AdmissionDate": "2026-07-01",
  "Location": "Main Warehouse"
}
```

</details>

<details>
<summary>getSerialNumberDetails</summary>

Retrieves a single SerialNumberDetail entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetSerialNumberDetailsQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `SerialNumberDetail|error`

**Sample code:**

```ballerina
SerialNumberDetail result = check client->getSerialNumberDetails(21);
```

**Sample response:**

```json
{
  "DocEntry": 21,
  "ItemCode": "A00001",
  "ItemDescription": "Sample Item",
  "MfrSerialNo": "MFR-SN-0001",
  "SerialNumber": "SN-0001",
  "SystemNumber": 1,
  "AdmissionDate": "2026-07-01",
  "Location": "Main Warehouse"
}
```

</details>

<details>
<summary>deleteSerialNumberDetails</summary>

Deletes a SerialNumberDetail entity identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSerialNumberDetails(21);
```

</details>

<details>
<summary>updateSerialNumberDetails</summary>

Partially updates a SerialNumberDetail entity identified by its `DocEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `payload` | <code>SerialNumberDetail</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSerialNumberDetails(21, payload);
```

</details>

#### UnitOfMeasurementGroups

<details>
<summary>listUnitOfMeasurementGroups</summary>

Queries the UnitOfMeasurementGroups collection, returning a page of unit-of-measurement group entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUnitOfMeasurementGroupsHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListUnitOfMeasurementGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `UnitOfMeasurementGroupsCollectionResponse|error`

**Sample code:**

```ballerina
UnitOfMeasurementGroupsCollectionResponse result = check client->listUnitOfMeasurementGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#UnitOfMeasurementGroups",
  "value": [
    {
      "AbsEntry": 4,
      "Code": "UOMG1",
      "Name": "Packaging Group",
      "BaseUoM": 1
    }
  ],
  "odata.nextLink": "UnitOfMeasurementGroups?$skip=20"
}
```

</details>

<details>
<summary>createUnitOfMeasurementGroups</summary>

Creates a new UnitOfMeasurementGroup entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UnitOfMeasurementGroup</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `UnitOfMeasurementGroup|error`

**Sample code:**

```ballerina
UnitOfMeasurementGroup result = check client->createUnitOfMeasurementGroups(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 4,
  "Code": "UOMG1",
  "Name": "Packaging Group",
  "BaseUoM": 1,
  "UoMGroupDefinitionCollection": []
}
```

</details>

<details>
<summary>getUnitOfMeasurementGroups</summary>

Retrieves a single UnitOfMeasurementGroup entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetUnitOfMeasurementGroupsQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `UnitOfMeasurementGroup|error`

**Sample code:**

```ballerina
UnitOfMeasurementGroup result = check client->getUnitOfMeasurementGroups(4);
```

**Sample response:**

```json
{
  "AbsEntry": 4,
  "Code": "UOMG1",
  "Name": "Packaging Group",
  "BaseUoM": 1,
  "UoMGroupDefinitionCollection": []
}
```

</details>

<details>
<summary>deleteUnitOfMeasurementGroups</summary>

Deletes a UnitOfMeasurementGroup entity identified by its `AbsEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUnitOfMeasurementGroups(4);
```

</details>

<details>
<summary>updateUnitOfMeasurementGroups</summary>

Partially updates a UnitOfMeasurementGroup entity identified by its `AbsEntry` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>UnitOfMeasurementGroup</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUnitOfMeasurementGroups(4, payload);
```

</details>

<details>
<summary>unitOfMeasurementGroupsServiceGetList</summary>

Calls the UnitOfMeasurementGroupsService_GetList function import to retrieve a lightweight list of unit-of-measurement group parameters (`AbsEntry`, `Code`).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_12|error`

**Sample code:**

```ballerina
inline_response_200_12 result = check client->unitOfMeasurementGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#UnitOfMeasurementGroupsService_GetList",
  "value": [
    {
      "AbsEntry": 4,
      "Code": "UOMG1"
    }
  ]
}
```

</details>

#### Warehouses

<details>
<summary>listWarehouses</summary>

Queries the Warehouses collection, returning a page of warehouse master data entities that can be filtered, sorted, and expanded using OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWarehousesHeaders</code> | No | Headers to be sent with the request; supports `Prefer` for Service Layer paging control (e.g. `odata.maxpagesize=100`). |
| `queries` | <code>ListWarehousesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `WarehousesCollectionResponse|error`

**Sample code:**

```ballerina
WarehousesCollectionResponse result = check client->listWarehouses();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Warehouses",
  "value": [
    {
      "WarehouseCode": "01",
      "WarehouseName": "Main Warehouse",
      "City": "Colombo",
      "Country": "LK"
    }
  ],
  "odata.nextLink": "Warehouses?$skip=20"
}
```

</details>

<details>
<summary>createWarehouses</summary>

Creates a new Warehouse entity in the SAP Business One Service Layer and returns the created record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Warehouse</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `Warehouse|error`

**Sample code:**

```ballerina
Warehouse result = check client->createWarehouses(payload);
```

**Sample response:**

```json
{
  "WarehouseCode": "01",
  "WarehouseName": "Main Warehouse",
  "Street": "123 Main St",
  "City": "Colombo",
  "Country": "LK",
  "ZipCode": "00100"
}
```

</details>

<details>
<summary>getWarehouses</summary>

Retrieves a single Warehouse entity identified by its `WarehouseCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `warehouseCode` | <code>string</code> | Yes | Key property 'WarehouseCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetWarehousesQueries</code> | No | OData query options: `$expand`, `$select`. |

**Returns:** `Warehouse|error`

**Sample code:**

```ballerina
Warehouse result = check client->getWarehouses("01");
```

**Sample response:**

```json
{
  "WarehouseCode": "01",
  "WarehouseName": "Main Warehouse",
  "Street": "123 Main St",
  "City": "Colombo",
  "Country": "LK",
  "ZipCode": "00100"
}
```

</details>

<details>
<summary>deleteWarehouses</summary>

Deletes a Warehouse entity identified by its `WarehouseCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `warehouseCode` | <code>string</code> | Yes | Key property 'WarehouseCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWarehouses("01");
```

</details>

<details>
<summary>updateWarehouses</summary>

Partially updates a Warehouse entity identified by its `WarehouseCode` key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `warehouseCode` | <code>string</code> | Yes | Key property 'WarehouseCode' (Edm.String). |
| `payload` | <code>Warehouse</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWarehouses("01", payload);
```

</details>

#### InventoryTransferRequests

<details>
<summary>listInventoryTransferRequests</summary>

Retrieves a page of entities from the InventoryTransferRequests collection (bound to the StockTransfer entity type).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryTransferRequestsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryTransferRequestsQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `InventoryTransferRequestsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryTransferRequestsCollectionResponse result = check client->listInventoryTransferRequests();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryTransferRequests",
  "value": [
    {
      "DocEntry": 501,
      "DocNum": 501,
      "DocDate": "2026-07-01",
      "CardCode": "C00001",
      "FromWarehouse": "01",
      "ToWarehouse": "02",
      "DocumentStatus": "bost_Open"
    }
  ]
}
```

</details>

<details>
<summary>createInventoryTransferRequests</summary>

Creates a new StockTransfer document under the InventoryTransferRequests collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>StockTransfer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->createInventoryTransferRequests({
    CardCode: "C00001",
    FromWarehouse: "01",
    ToWarehouse: "02",
    StockTransferLines: []
});
```

**Sample response:**

```json
{
  "DocEntry": 501,
  "DocNum": 501,
  "DocDate": "2026-07-01",
  "CardCode": "C00001",
  "FromWarehouse": "01",
  "ToWarehouse": "02",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>getInventoryTransferRequests</summary>

Retrieves a single StockTransfer document from the InventoryTransferRequests collection identified by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryTransferRequestsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->getInventoryTransferRequests(501);
```

**Sample response:**

```json
{
  "DocEntry": 501,
  "DocNum": 501,
  "DocDate": "2026-07-01",
  "CardCode": "C00001",
  "FromWarehouse": "01",
  "ToWarehouse": "02",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>deleteInventoryTransferRequests</summary>

Deletes a StockTransfer document from the InventoryTransferRequests collection identified by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryTransferRequests(501);
```

</details>

<details>
<summary>updateInventoryTransferRequests</summary>

Partially updates a StockTransfer document in the InventoryTransferRequests collection using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>StockTransfer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryTransferRequests(501, {
    Comments: "Updated transfer request"
});
```

</details>

<details>
<summary>inventoryTransferRequestsCancel</summary>

Invokes the bound action 'Cancel' on an InventoryTransferRequests document (binding type StockTransfer).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryTransferRequestsCancel(501);
```

</details>

<details>
<summary>inventoryTransferRequestsClose</summary>

Invokes the bound action 'Close' on an InventoryTransferRequests document (binding type StockTransfer).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryTransferRequestsClose(501);
```

</details>

<details>
<summary>inventoryTransferRequestsSaveDraftToDocument</summary>

Invokes the bound action 'SaveDraftToDocument' on an InventoryTransferRequests document (binding type StockTransfer) to convert a draft into a full document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryTransferRequestsSaveDraftToDocument(501);
```

</details>

<details>
<summary>inventoryTransferRequestsServiceGetApprovalTemplates</summary>

Calls the InventoryTransferRequestsService_GetApprovalTemplates unbound function to retrieve the approval templates applicable to a given stock transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryTransferRequestsService_GetApprovalTemplates_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->inventoryTransferRequestsServiceGetApprovalTemplates({
    stockTransfer: {
        CardCode: "C00001",
        FromWarehouse: "01",
        ToWarehouse: "02"
    }
});
```

**Sample response:**

```json
{
  "DocEntry": 501,
  "CardCode": "C00001",
  "FromWarehouse": "01",
  "ToWarehouse": "02",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>inventoryTransferRequestsServiceHandleApprovalRequest</summary>

Calls the InventoryTransferRequestsService_HandleApprovalRequest unbound function to process a pending approval request for a transfer request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryTransferRequestsServiceHandleApprovalRequest();
```

</details>

#### AlternateCatNum

<details>
<summary>listAlternateCatNum</summary>

Retrieves a page of entities from the AlternateCatNum collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAlternateCatNumHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAlternateCatNumQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `AlternateCatNumCollectionResponse|error`

**Sample code:**

```ballerina
AlternateCatNumCollectionResponse result = check client->listAlternateCatNum();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#AlternateCatNum",
  "value": [
    {
      "ItemCode": "A00001",
      "CardCode": "C00001",
      "Substitute": "ALT-001",
      "DisplayBPCatalogNumber": "tYES",
      "IsDefault": "tYES",
      "Description": "Preferred vendor alternate catalog number"
    }
  ]
}
```

</details>

<details>
<summary>createAlternateCatNum</summary>

Creates a new AlternateCatNum record under the collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AlternateCatNum</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AlternateCatNum|error`

**Sample code:**

```ballerina
AlternateCatNum result = check client->createAlternateCatNum({
    ItemCode: "A00001",
    CardCode: "C00001",
    Substitute: "ALT-001"
});
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "CardCode": "C00001",
  "Substitute": "ALT-001",
  "DisplayBPCatalogNumber": "tNO",
  "IsDefault": "tNO",
  "Description": "Preferred vendor alternate catalog number"
}
```

</details>

<details>
<summary>getAlternateCatNum</summary>

Retrieves a single AlternateCatNum record identified by its composite key (ItemCode, CardCode, Substitute).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String) |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String) |
| `substitute` | <code>string</code> | Yes | Composite key part 'Substitute' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAlternateCatNumQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `AlternateCatNum|error`

**Sample code:**

```ballerina
AlternateCatNum result = check client->getAlternateCatNum("A00001", "C00001", "ALT-001");
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "CardCode": "C00001",
  "Substitute": "ALT-001",
  "DisplayBPCatalogNumber": "tNO",
  "IsDefault": "tNO",
  "Description": "Preferred vendor alternate catalog number"
}
```

</details>

<details>
<summary>deleteAlternateCatNum</summary>

Deletes an AlternateCatNum record identified by its composite key (ItemCode, CardCode, Substitute).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String) |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String) |
| `substitute` | <code>string</code> | Yes | Composite key part 'Substitute' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAlternateCatNum("A00001", "C00001", "ALT-001");
```

</details>

<details>
<summary>updateAlternateCatNum</summary>

Partially updates an AlternateCatNum record (PATCH/MERGE semantics) identified by its composite key (ItemCode, CardCode, Substitute).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String) |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String) |
| `substitute` | <code>string</code> | Yes | Composite key part 'Substitute' (Edm.String) |
| `payload` | <code>AlternateCatNum</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAlternateCatNum("A00001", "C00001", "ALT-001", {
    Description: "Updated alternate catalog number"
});
```

</details>

#### InventoryCountings

<details>
<summary>listInventoryCountings</summary>

Retrieves a page of entities from the InventoryCountings collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryCountingsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryCountingsQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `InventoryCountingsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryCountingsCollectionResponse result = check client->listInventoryCountings();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryCountings",
  "value": [
    {
      "DocumentEntry": 301,
      "DocumentNumber": 301,
      "CountDate": "2026-07-01",
      "SingleCounterType": "ctUser",
      "DocumentStatus": "cdsOpen",
      "CountingType": "ctSingleCounter"
    }
  ]
}
```

</details>

<details>
<summary>createInventoryCountings</summary>

Creates a new InventoryCounting document under the InventoryCountings collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryCounting</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InventoryCounting|error`

**Sample code:**

```ballerina
InventoryCounting result = check client->createInventoryCountings({
    CountDate: "2026-07-01",
    CountingType: "ctSingleCounter",
    InventoryCountingLines: []
});
```

**Sample response:**

```json
{
  "DocumentEntry": 301,
  "DocumentNumber": 301,
  "CountDate": "2026-07-01",
  "SingleCounterType": "ctUser",
  "DocumentStatus": "cdsOpen",
  "CountingType": "ctSingleCounter"
}
```

</details>

<details>
<summary>getInventoryCountings</summary>

Retrieves a single InventoryCounting document from the InventoryCountings collection identified by its DocumentEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryCountingsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `InventoryCounting|error`

**Sample code:**

```ballerina
InventoryCounting result = check client->getInventoryCountings(301);
```

**Sample response:**

```json
{
  "DocumentEntry": 301,
  "DocumentNumber": 301,
  "CountDate": "2026-07-01",
  "SingleCounterType": "ctUser",
  "DocumentStatus": "cdsOpen",
  "CountingType": "ctSingleCounter"
}
```

</details>

<details>
<summary>deleteInventoryCountings</summary>

Deletes an InventoryCounting document from the InventoryCountings collection identified by its DocumentEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryCountings(301);
```

</details>

<details>
<summary>updateInventoryCountings</summary>

Partially updates an InventoryCounting document (PATCH/MERGE semantics) identified by its DocumentEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>InventoryCounting</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryCountings(301, {
    Remarks: "Recount required"
});
```

</details>

<details>
<summary>inventoryCountingsClose</summary>

Invokes the bound action 'Close' on an InventoryCountings document (binding type InventoryCounting).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryCountingsClose(301);
```

</details>

<details>
<summary>inventoryCountingsServiceGetList</summary>

Calls the InventoryCountingsService_GetList unbound function to retrieve a list of inventory counting parameter values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7|error`

**Sample code:**

```ballerina
inline_response_200_7 result = check client->inventoryCountingsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryCountingsService_GetList",
  "value": [
    {
      "ParamName": "CounterType",
      "ParamValue": "ctUser"
    }
  ]
}
```

</details>

#### StockTakings

<details>
<summary>listStockTakings</summary>

Retrieves a page of entities from the StockTakings collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListStockTakingsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListStockTakingsQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `StockTakingsCollectionResponse|error`

**Sample code:**

```ballerina
StockTakingsCollectionResponse result = check client->listStockTakings();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#StockTakings",
  "value": [
    {
      "ItemCode": "A00001",
      "WarehouseCode": "01",
      "Counted": 125.5
    }
  ]
}
```

</details>

<details>
<summary>createStockTakings</summary>

Creates a new StockTaking record under the StockTakings collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>StockTaking</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `StockTaking|error`

**Sample code:**

```ballerina
StockTaking result = check client->createStockTakings({
    ItemCode: "A00001",
    WarehouseCode: "01",
    Counted: 125.5
});
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "WarehouseCode": "01",
  "Counted": 125.5
}
```

</details>

<details>
<summary>getStockTakings</summary>

Retrieves a single StockTaking record identified by its composite key (ItemCode, WarehouseCode).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String) |
| `warehouseCode` | <code>string</code> | Yes | Composite key part 'WarehouseCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetStockTakingsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `StockTaking|error`

**Sample code:**

```ballerina
StockTaking result = check client->getStockTakings("A00001", "01");
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "WarehouseCode": "01",
  "Counted": 125.5
}
```

</details>

<details>
<summary>deleteStockTakings</summary>

Deletes a StockTaking record identified by its composite key (ItemCode, WarehouseCode).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String) |
| `warehouseCode` | <code>string</code> | Yes | Composite key part 'WarehouseCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteStockTakings("A00001", "01");
```

</details>

<details>
<summary>updateStockTakings</summary>

Partially updates a StockTaking record (PATCH/MERGE semantics) identified by its composite key (ItemCode, WarehouseCode).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String) |
| `warehouseCode` | <code>string</code> | Yes | Composite key part 'WarehouseCode' (Edm.String) |
| `payload` | <code>StockTaking</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateStockTakings("A00001", "01", {
    Counted: 130
});
```

</details>

#### CycleCountDeterminations

<details>
<summary>listCycleCountDeterminations</summary>

Retrieves a page of entities from the CycleCountDeterminations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCycleCountDeterminationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCycleCountDeterminationsQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `CycleCountDeterminationsCollectionResponse|error`

**Sample code:**

```ballerina
CycleCountDeterminationsCollectionResponse result = check client->listCycleCountDeterminations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CycleCountDeterminations",
  "value": [
    {
      "CycleBy": "ccdcbItemGroup",
      "WarehouseCode": "01",
      "CycleCountDeterminationSetupCollection": [
        {
          "Entry": 1,
          "CycleCode": 10,
          "NextCountingDate": "2026-08-01"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>createCycleCountDeterminations</summary>

Creates a new CycleCountDetermination record under the CycleCountDeterminations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CycleCountDetermination</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CycleCountDetermination|error`

**Sample code:**

```ballerina
CycleCountDetermination result = check client->createCycleCountDeterminations({
    cycleBy: "ccdcbItemGroup",
    warehouseCode: "01"
});
```

**Sample response:**

```json
{
  "CycleBy": "ccdcbItemGroup",
  "WarehouseCode": "01",
  "CycleCountDeterminationSetupCollection": []
}
```

</details>

<details>
<summary>getCycleCountDeterminations</summary>

Retrieves a single CycleCountDetermination record from the CycleCountDeterminations collection identified by its WarehouseCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `warehouseCode` | <code>string</code> | Yes | Key property 'WarehouseCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCycleCountDeterminationsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `CycleCountDetermination|error`

**Sample code:**

```ballerina
CycleCountDetermination result = check client->getCycleCountDeterminations("01");
```

**Sample response:**

```json
{
  "CycleBy": "ccdcbItemGroup",
  "WarehouseCode": "01",
  "CycleCountDeterminationSetupCollection": []
}
```

</details>

<details>
<summary>deleteCycleCountDeterminations</summary>

Deletes a CycleCountDetermination record from the CycleCountDeterminations collection identified by its WarehouseCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `warehouseCode` | <code>string</code> | Yes | Key property 'WarehouseCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCycleCountDeterminations("01");
```

</details>

<details>
<summary>updateCycleCountDeterminations</summary>

Partially updates a CycleCountDetermination record (PATCH/MERGE semantics) identified by its WarehouseCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `warehouseCode` | <code>string</code> | Yes | Key property 'WarehouseCode' (Edm.String) |
| `payload` | <code>CycleCountDetermination</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCycleCountDeterminations("01", {
    cycleBy: "ccdcbWarehouseSublevel1"
});
```

</details>

<details>
<summary>cycleCountDeterminationsServiceGetList</summary>

Calls the CycleCountDeterminationsService_GetList unbound function to retrieve a list of cycle count determination parameter values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
inline_response_200_5 result = check client->cycleCountDeterminationsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CycleCountDeterminationsService_GetList",
  "value": [
    {
      "ParamName": "CycleBy",
      "ParamValue": "ccdcbItemGroup"
    }
  ]
}
```

</details>

#### TrackingNotes

<details>
<summary>listTrackingNotes</summary>

Retrieves a page of entities from the TrackingNotes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTrackingNotesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrackingNotesQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `TrackingNotesCollectionResponse|error`

**Sample code:**

```ballerina
TrackingNotesCollectionResponse result = check client->listTrackingNotes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#TrackingNotes",
  "value": [
    {
      "TrackingNoteNumber": 701,
      "CCDNumber": "CCD-701",
      "IsDirectImport": "tYES",
      "CountryOfOrigin": "US",
      "CustomsTerminal": "Terminal 1",
      "Date": "2026-07-01"
    }
  ]
}
```

</details>

<details>
<summary>createTrackingNotes</summary>

Creates a new TrackingNote record under the TrackingNotes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrackingNote</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TrackingNote|error`

**Sample code:**

```ballerina
TrackingNote result = check client->createTrackingNotes({
    cCDNumber: "CCD-701",
    isDirectImport: "tYES",
    countryOfOrigin: "US"
});
```

**Sample response:**

```json
{
  "TrackingNoteNumber": 701,
  "CCDNumber": "CCD-701",
  "IsDirectImport": "tYES",
  "CountryOfOrigin": "US"
}
```

</details>

<details>
<summary>getTrackingNotes</summary>

Retrieves a single TrackingNote record from the TrackingNotes collection identified by its TrackingNoteNumber key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `trackingNoteNumber` | <code>int:Signed32</code> | Yes | Key property 'TrackingNoteNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrackingNotesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `TrackingNote|error`

**Sample code:**

```ballerina
TrackingNote result = check client->getTrackingNotes(701);
```

**Sample response:**

```json
{
  "TrackingNoteNumber": 701,
  "CCDNumber": "CCD-701",
  "IsDirectImport": "tYES",
  "CountryOfOrigin": "US"
}
```

</details>

<details>
<summary>deleteTrackingNotes</summary>

Deletes a TrackingNote record from the TrackingNotes collection identified by its TrackingNoteNumber key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `trackingNoteNumber` | <code>int:Signed32</code> | Yes | Key property 'TrackingNoteNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrackingNotes(701);
```

</details>

<details>
<summary>updateTrackingNotes</summary>

Partially updates a TrackingNote record (PATCH/MERGE semantics) identified by its TrackingNoteNumber key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `trackingNoteNumber` | <code>int:Signed32</code> | Yes | Key property 'TrackingNoteNumber' (Edm.Int32) |
| `payload` | <code>TrackingNote</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrackingNotes(701, {
    customsTerminal: "Terminal 2"
});
```

</details>

<details>
<summary>trackingNotesServiceGetList</summary>

Calls the TrackingNotesService_GetList unbound function to retrieve a list of tracking note parameter values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_11|error`

**Sample code:**

```ballerina
inline_response_200_11 result = check client->trackingNotesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#TrackingNotesService_GetList",
  "value": [
    {
      "ParamName": "CountryOfOrigin",
      "ParamValue": "US"
    }
  ]
}
```

</details>

#### WeightMeasures

<details>
<summary>listWeightMeasures</summary>

Retrieves a page of entities from the WeightMeasures collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWeightMeasuresHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWeightMeasuresQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `WeightMeasuresCollectionResponse|error`

**Sample code:**

```ballerina
WeightMeasuresCollectionResponse result = check client->listWeightMeasures();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WeightMeasures",
  "value": [
    {
      "UnitCode": 1,
      "UnitDisplay": "kg",
      "UnitName": "Kilogram",
      "UnitWeightinmg": 1000000
    }
  ]
}
```

</details>

<details>
<summary>createWeightMeasures</summary>

Creates a new WeightMeasure record under the WeightMeasures collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WeightMeasure</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WeightMeasure|error`

**Sample code:**

```ballerina
WeightMeasure result = check client->createWeightMeasures({
    UnitDisplay: "kg",
    UnitName: "Kilogram",
    UnitWeightinmg: 1000000
});
```

**Sample response:**

```json
{
  "UnitCode": 1,
  "UnitDisplay": "kg",
  "UnitName": "Kilogram",
  "UnitWeightinmg": 1000000
}
```

</details>

<details>
<summary>getWeightMeasures</summary>

Retrieves a single WeightMeasure record from the WeightMeasures collection identified by its UnitCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `unitCode` | <code>int:Signed32</code> | Yes | Key property 'UnitCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWeightMeasuresQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `WeightMeasure|error`

**Sample code:**

```ballerina
WeightMeasure result = check client->getWeightMeasures(1);
```

**Sample response:**

```json
{
  "UnitCode": 1,
  "UnitDisplay": "kg",
  "UnitName": "Kilogram",
  "UnitWeightinmg": 1000000
}
```

</details>

<details>
<summary>deleteWeightMeasures</summary>

Deletes a WeightMeasure record from the WeightMeasures collection identified by its UnitCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `unitCode` | <code>int:Signed32</code> | Yes | Key property 'UnitCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWeightMeasures(1);
```

</details>

<details>
<summary>updateWeightMeasures</summary>

Partially updates a WeightMeasure record (PATCH/MERGE semantics) identified by its UnitCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `unitCode` | <code>int:Signed32</code> | Yes | Key property 'UnitCode' (Edm.Int32) |
| `payload` | <code>WeightMeasure</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWeightMeasures(1, {
    UnitName: "Kilogram (metric)"
});
```

</details>

#### InventoryCycles

<details>
<summary>listInventoryCycles</summary>

Retrieves a page of entities from the InventoryCycles collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryCyclesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryCyclesQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `InventoryCyclesCollectionResponse|error`

**Sample code:**

```ballerina
InventoryCyclesCollectionResponse result = check client->listInventoryCycles();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryCycles",
  "value": [
    {
      "CycleCode": 10,
      "CycleName": "Monthly Cycle",
      "Frequency": "bof_Monthly",
      "Interval": 1,
      "NextCountingDate": "2026-08-01"
    }
  ]
}
```

</details>

<details>
<summary>createInventoryCycles</summary>

Creates a new InventoryCycles record under the InventoryCycles collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryCycles</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InventoryCycles|error`

**Sample code:**

```ballerina
InventoryCycles result = check client->createInventoryCycles({
    CycleName: "Monthly Cycle",
    Frequency: "bof_Monthly",
    Interval: 1
});
```

**Sample response:**

```json
{
  "CycleCode": 10,
  "CycleName": "Monthly Cycle",
  "Frequency": "bof_Monthly",
  "Interval": 1,
  "NextCountingDate": "2026-08-01"
}
```

</details>

<details>
<summary>getInventoryCycles</summary>

Retrieves a single InventoryCycles record from the InventoryCycles collection identified by its CycleCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cycleCode` | <code>int:Signed32</code> | Yes | Key property 'CycleCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryCyclesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `InventoryCycles|error`

**Sample code:**

```ballerina
InventoryCycles result = check client->getInventoryCycles(10);
```

**Sample response:**

```json
{
  "CycleCode": 10,
  "CycleName": "Monthly Cycle",
  "Frequency": "bof_Monthly",
  "Interval": 1,
  "NextCountingDate": "2026-08-01"
}
```

</details>

<details>
<summary>deleteInventoryCycles</summary>

Deletes an InventoryCycles record from the InventoryCycles collection identified by its CycleCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cycleCode` | <code>int:Signed32</code> | Yes | Key property 'CycleCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryCycles(10);
```

</details>

<details>
<summary>updateInventoryCycles</summary>

Partially updates an InventoryCycles record (PATCH/MERGE semantics) identified by its CycleCode key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cycleCode` | <code>int:Signed32</code> | Yes | Key property 'CycleCode' (Edm.Int32) |
| `payload` | <code>InventoryCycles</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryCycles(10, {
    Interval: 2
});
```

</details>

#### ItemProperties

<details>
<summary>listItemProperties</summary>

Retrieves a page of entities from the ItemProperties collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListItemPropertiesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListItemPropertiesQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ItemPropertiesCollectionResponse|error`

**Sample code:**

```ballerina
ItemPropertiesCollectionResponse result = check client->listItemProperties();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ItemProperties",
  "value": [
    {
      "Number": 1,
      "PropertyName": "Fragile"
    }
  ]
}
```

</details>

<details>
<summary>createItemProperties</summary>

Creates a new ItemProperty record under the ItemProperties collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ItemProperty</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ItemProperty|error`

**Sample code:**

```ballerina
ItemProperty result = check client->createItemProperties({
    PropertyName: "Fragile"
});
```

**Sample response:**

```json
{
  "Number": 1,
  "PropertyName": "Fragile"
}
```

</details>

<details>
<summary>getItemProperties</summary>

Retrieves a single ItemProperty record from the ItemProperties collection identified by its Number key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `number` | <code>int:Signed32</code> | Yes | Key property 'Number' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetItemPropertiesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `ItemProperty|error`

**Sample code:**

```ballerina
ItemProperty result = check client->getItemProperties(1);
```

**Sample response:**

```json
{
  "Number": 1,
  "PropertyName": "Fragile"
}
```

</details>

<details>
<summary>deleteItemProperties</summary>

Deletes an ItemProperty record from the ItemProperties collection identified by its Number key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `number` | <code>int:Signed32</code> | Yes | Key property 'Number' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteItemProperties(1);
```

</details>

<details>
<summary>updateItemProperties</summary>

Partially updates an ItemProperty record (PATCH/MERGE semantics) identified by its Number key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `number` | <code>int:Signed32</code> | Yes | Key property 'Number' (Edm.Int32) |
| `payload` | <code>ItemProperty</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateItemProperties(1, {
    PropertyName: "Fragile - Handle with Care"
});
```

</details>

#### PriceLists

<details>
<summary>listPriceLists</summary>

Retrieves a page of entities from the PriceLists collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPriceListsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPriceListsQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `PriceListsCollectionResponse|error`

**Sample code:**

```ballerina
PriceListsCollectionResponse result = check client->listPriceLists();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PriceLists",
  "value": [
    {
      "PriceListNo": 1,
      "PriceListName": "Retail Price List",
      "IsGrossPrice": "tNO",
      "Active": "tYES",
      "Factor": 1.0
    }
  ]
}
```

</details>

<details>
<summary>createPriceLists</summary>

Creates a new PriceList record under the PriceLists collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PriceList</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PriceList|error`

**Sample code:**

```ballerina
PriceList result = check client->createPriceLists({
    PriceListName: "Retail Price List",
    Factor: 1.0,
    Active: "tYES"
});
```

**Sample response:**

```json
{
  "PriceListNo": 1,
  "PriceListName": "Retail Price List",
  "IsGrossPrice": "tNO",
  "Active": "tYES",
  "Factor": 1.0
}
```

</details>

<details>
<summary>getPriceLists</summary>

Retrieves a single PriceList record from the PriceLists collection identified by its PriceListNo key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `priceListNo` | <code>int:Signed32</code> | Yes | Key property 'PriceListNo' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPriceListsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `PriceList|error`

**Sample code:**

```ballerina
PriceList result = check client->getPriceLists(1);
```

**Sample response:**

```json
{
  "PriceListNo": 1,
  "PriceListName": "Retail Price List",
  "IsGrossPrice": "tNO",
  "Active": "tYES",
  "Factor": 1.0
}
```

</details>

<details>
<summary>deletePriceLists</summary>

Deletes a PriceList record from the PriceLists collection identified by its PriceListNo key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `priceListNo` | <code>int:Signed32</code> | Yes | Key property 'PriceListNo' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePriceLists(1);
```

</details>

<details>
<summary>updatePriceLists</summary>

Partially updates a PriceList record (PATCH/MERGE semantics) identified by its PriceListNo key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `priceListNo` | <code>int:Signed32</code> | Yes | Key property 'PriceListNo' (Edm.Int32) |
| `payload` | <code>PriceList</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePriceLists(1, {
    Active: "tNO"
});
```

</details>

#### WarehouseLocations

<details>
<summary>listWarehouseLocations</summary>

Retrieves a page of entities from the WarehouseLocations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWarehouseLocationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWarehouseLocationsQueries</code> | No | Queries to be sent with the request ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `WarehouseLocationsCollectionResponse|error`

**Sample code:**

```ballerina
WarehouseLocationsCollectionResponse result = check client->listWarehouseLocations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WarehouseLocations",
  "value": [
    {
      "Code": 1,
      "Name": "Main Distribution Center",
      "City": "Austin",
      "Country": "US",
      "ZipCode": "78701"
    }
  ]
}
```

</details>

<details>
<summary>createWarehouseLocations</summary>

Creates a new WarehouseLocation record under the WarehouseLocations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WarehouseLocation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WarehouseLocation|error`

**Sample code:**

```ballerina
WarehouseLocation result = check client->createWarehouseLocations({
    Name: "Main Distribution Center",
    City: "Austin",
    Country: "US"
});
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Main Distribution Center",
  "City": "Austin",
  "Country": "US",
  "ZipCode": "78701"
}
```

</details>

<details>
<summary>getWarehouseLocations</summary>

Retrieves a single WarehouseLocation record from the WarehouseLocations collection identified by its Code key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWarehouseLocationsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `WarehouseLocation|error`

**Sample code:**

```ballerina
WarehouseLocation result = check client->getWarehouseLocations(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Main Distribution Center",
  "City": "Austin",
  "Country": "US",
  "ZipCode": "78701"
}
```

</details>

<details>
<summary>deleteWarehouseLocations</summary>

Deletes a WarehouseLocation record from the WarehouseLocations collection identified by its Code key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWarehouseLocations(1);
```

</details>

<details>
<summary>updateWarehouseLocations</summary>

Partially updates a WarehouseLocation record (PATCH/MERGE semantics) identified by its Code key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>WarehouseLocation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWarehouseLocations(1, {
    Name: "Main Distribution Center - East Wing"
});
```

</details>
#### AttributeGroups

<details>
<summary>listAttributeGroups</summary>

Queries the AttributeGroups collection and returns a page of AttributeGroup entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAttributeGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAttributeGroupsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `AttributeGroupsCollectionResponse|error`

**Sample code:**

```ballerina
AttributeGroupsCollectionResponse result = check client->listAttributeGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#AttributeGroups",
  "value": [
    {
      "Code": 1,
      "Name": "Color Group",
      "Locked": "tNO",
      "AttributeGroupCollection": []
    }
  ]
}
```

</details>

<details>
<summary>createAttributeGroups</summary>

Creates a new AttributeGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AttributeGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AttributeGroup|error`

**Sample code:**

```ballerina
AttributeGroup result = check client->createAttributeGroups(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Color Group",
  "Locked": "tNO",
  "AttributeGroupCollection": []
}
```

</details>

<details>
<summary>getAttributeGroups</summary>

Retrieves a single AttributeGroup entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAttributeGroupsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `AttributeGroup|error`

**Sample code:**

```ballerina
AttributeGroup result = check client->getAttributeGroups(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Color Group",
  "Locked": "tNO"
}
```

</details>

<details>
<summary>deleteAttributeGroups</summary>

Deletes the AttributeGroup entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAttributeGroups(1);
```

</details>

<details>
<summary>updateAttributeGroups</summary>

Partially updates the AttributeGroup entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>AttributeGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAttributeGroups(1, payload);
```

</details>

<details>
<summary>attributeGroupsServiceGetList</summary>

Calls the AttributeGroupsService_GetList function to retrieve a list of AttributeGroupParams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 result = check client->attributeGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#AttributeGroupsService_GetList",
  "value": [
    {
      "Code": 1,
      "Name": "Color Group"
    }
  ]
}
```

</details>

#### BinLocationFields

<details>
<summary>listBinLocationFields</summary>

Queries the BinLocationFields collection and returns a page of BinLocationField entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBinLocationFieldsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBinLocationFieldsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `BinLocationFieldsCollectionResponse|error`

**Sample code:**

```ballerina
BinLocationFieldsCollectionResponse result = check client->listBinLocationFields();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BinLocationFields",
  "value": [
    {
      "AbsEntry": 1,
      "Name": "Rack",
      "FieldType": "blftWarehouseSublevel",
      "Activated": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createBinLocationFields</summary>

Creates a new BinLocationField entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BinLocationField</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BinLocationField|error`

**Sample code:**

```ballerina
BinLocationField result = check client->createBinLocationFields(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Name": "Rack",
  "FieldType": "blftWarehouseSublevel",
  "Activated": "tYES"
}
```

</details>

<details>
<summary>getBinLocationFields</summary>

Retrieves a single BinLocationField entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBinLocationFieldsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `BinLocationField|error`

**Sample code:**

```ballerina
BinLocationField result = check client->getBinLocationFields(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Name": "Rack",
  "FieldType": "blftWarehouseSublevel"
}
```

</details>

<details>
<summary>deleteBinLocationFields</summary>

Deletes the BinLocationField entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBinLocationFields(1);
```

</details>

<details>
<summary>updateBinLocationFields</summary>

Partially updates the BinLocationField entity identified by its `AbsEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>BinLocationField</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBinLocationFields(1, payload);
```

</details>

<details>
<summary>binLocationFieldsServiceGetList</summary>

Calls the BinLocationFieldsService_GetList function to retrieve a list of BinLocationFieldParams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
inline_response_200_3 result = check client->binLocationFieldsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BinLocationFieldsService_GetList",
  "value": [
    {
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### CustomsGroups

<details>
<summary>listCustomsGroups</summary>

Queries the CustomsGroups collection and returns a page of CustomsGroup entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCustomsGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCustomsGroupsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `CustomsGroupsCollectionResponse|error`

**Sample code:**

```ballerina
CustomsGroupsCollectionResponse result = check client->listCustomsGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CustomsGroups",
  "value": [
    {
      "Code": 1,
      "Name": "Import Duty",
      "Number": "1001",
      "Customs": 5.5,
      "Total": 5.5,
      "Locked": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createCustomsGroups</summary>

Creates a new CustomsGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CustomsGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CustomsGroup|error`

**Sample code:**

```ballerina
CustomsGroup result = check client->createCustomsGroups(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Import Duty",
  "Number": "1001",
  "Customs": 5.5,
  "Total": 5.5
}
```

</details>

<details>
<summary>getCustomsGroups</summary>

Retrieves a single CustomsGroup entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCustomsGroupsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `CustomsGroup|error`

**Sample code:**

```ballerina
CustomsGroup result = check client->getCustomsGroups(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Import Duty",
  "Number": "1001",
  "Customs": 5.5
}
```

</details>

<details>
<summary>deleteCustomsGroups</summary>

Deletes the CustomsGroup entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCustomsGroups(1);
```

</details>

<details>
<summary>updateCustomsGroups</summary>

Partially updates the CustomsGroup entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>CustomsGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCustomsGroups(1, payload);
```

</details>

#### InventoryGenExits

<details>
<summary>inventoryGenExitServiceApproveAndAdd</summary>

Approves and adds an InventoryGenExit document via the InventoryGenExitService_ApproveAndAdd function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenExitService_ApproveAndAdd_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>inventoryGenExitServiceApproveAndUpdate</summary>

Approves and updates an InventoryGenExit document via the InventoryGenExitService_ApproveAndUpdate function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenExitService_ApproveAndUpdate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>inventoryGenExitServiceCloseByDate</summary>

Closes InventoryGenExit documents up to a specified date via the InventoryGenExitService_CloseByDate function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenExitService_CloseByDate_body</code> | Yes | Request payload containing the document closing parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitServiceCloseByDate(payload);
```

</details>

<details>
<summary>inventoryGenExitServiceExportEWayBill</summary>

Exports the E-Way bill for an InventoryGenExit document via the InventoryGenExitService_ExportEWayBill function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenExitService_ExportEWayBill_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitServiceExportEWayBill(payload);
```

</details>

<details>
<summary>inventoryGenExitServiceGetApprovalTemplates</summary>

Retrieves the applicable approval templates for an InventoryGenExit document via the InventoryGenExitService_GetApprovalTemplates function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryGenExitService_GetApprovalTemplates_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->inventoryGenExitServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1,
  "CardCode": "V10000",
  "DocDate": "2024-01-01",
  "DocTotal": 100.0
}
```

</details>

<details>
<summary>inventoryGenExitServiceHandleApprovalRequest</summary>

Handles an incoming approval request for an InventoryGenExit document via the InventoryGenExitService_HandleApprovalRequest function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitServiceHandleApprovalRequest();
```

</details>

<details>
<summary>inventoryGenExitServiceInitData</summary>

Initializes default data for a new InventoryGenExit document via the InventoryGenExitService_InitData function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->inventoryGenExitServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocDate": "2024-01-01",
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>listInventoryGenExits</summary>

Queries the InventoryGenExits collection and returns a page of Document entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryGenExitsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryGenExitsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `InventoryGenExitsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryGenExitsCollectionResponse result = check client->listInventoryGenExits();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#InventoryGenExits",
  "value": [
    {
      "DocEntry": 1,
      "DocNum": 1,
      "CardCode": "V10000",
      "DocDate": "2024-01-01",
      "DocTotal": 100.0
    }
  ]
}
```

</details>

<details>
<summary>createInventoryGenExits</summary>

Creates a new InventoryGenExits Document entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createInventoryGenExits(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1,
  "CardCode": "V10000",
  "DocDate": "2024-01-01",
  "DocTotal": 100.0
}
```

</details>

<details>
<summary>getInventoryGenExits</summary>

Retrieves a single InventoryGenExits Document entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryGenExitsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getInventoryGenExits(1);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1,
  "CardCode": "V10000",
  "DocDate": "2024-01-01",
  "DocTotal": 100.0
}
```

</details>

<details>
<summary>deleteInventoryGenExits</summary>

Deletes the InventoryGenExits Document entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryGenExits(1);
```

</details>

<details>
<summary>updateInventoryGenExits</summary>

Partially updates the InventoryGenExits Document entity identified by its `DocEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryGenExits(1, payload);
```

</details>

<details>
<summary>inventoryGenExitsCancel</summary>

Invokes the bound action `Cancel` on an InventoryGenExits Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitsCancel(1);
```

</details>

<details>
<summary>inventoryGenExitsClose</summary>

Invokes the bound action `Close` on an InventoryGenExits Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitsClose(1);
```

</details>

<details>
<summary>inventoryGenExitsCreateCancellationDocument</summary>

Invokes the bound action `CreateCancellationDocument` on an InventoryGenExits Document identified by its `DocEntry` key, returning the newly created cancellation Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->inventoryGenExitsCreateCancellationDocument(1);
```

**Sample response:**

```json
{
  "DocEntry": 2,
  "DocNum": 2,
  "CardCode": "V10000",
  "DocDate": "2024-01-02",
  "DocTotal": 100.0
}
```

</details>

<details>
<summary>inventoryGenExitsReopen</summary>

Invokes the bound action `Reopen` on an InventoryGenExits Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryGenExitsReopen(1);
```

</details>

#### InventoryOpeningBalances

<details>
<summary>listInventoryOpeningBalances</summary>

Queries the InventoryOpeningBalances collection and returns a page of InventoryOpeningBalance entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryOpeningBalancesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryOpeningBalancesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `InventoryOpeningBalancesCollectionResponse|error`

**Sample code:**

```ballerina
InventoryOpeningBalancesCollectionResponse result = check client->listInventoryOpeningBalances();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#InventoryOpeningBalances",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 1,
      "PostingDate": "2024-01-01",
      "DocumentDate": "2024-01-01",
      "Series": 0
    }
  ]
}
```

</details>

<details>
<summary>createInventoryOpeningBalances</summary>

Creates a new InventoryOpeningBalance entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryOpeningBalance</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InventoryOpeningBalance|error`

**Sample code:**

```ballerina
InventoryOpeningBalance result = check client->createInventoryOpeningBalances(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1,
  "PostingDate": "2024-01-01",
  "DocumentDate": "2024-01-01",
  "Series": 0
}
```

</details>

<details>
<summary>getInventoryOpeningBalances</summary>

Retrieves a single InventoryOpeningBalance entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryOpeningBalancesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `InventoryOpeningBalance|error`

**Sample code:**

```ballerina
InventoryOpeningBalance result = check client->getInventoryOpeningBalances(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1,
  "PostingDate": "2024-01-01",
  "DocumentDate": "2024-01-01"
}
```

</details>

<details>
<summary>deleteInventoryOpeningBalances</summary>

Deletes the InventoryOpeningBalance entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryOpeningBalances(1);
```

</details>

<details>
<summary>updateInventoryOpeningBalances</summary>

Partially updates the InventoryOpeningBalance entity identified by its `DocumentEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>InventoryOpeningBalance</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryOpeningBalances(1, payload);
```

</details>

<details>
<summary>inventoryOpeningBalancesServiceGetList</summary>

Calls the InventoryOpeningBalancesService_GetList function to retrieve a list of InventoryOpeningBalanceParams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_8|error`

**Sample code:**

```ballerina
inline_response_200_8 result = check client->inventoryOpeningBalancesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#InventoryOpeningBalancesService_GetList",
  "value": [
    {
      "DocumentEntry": 1
    }
  ]
}
```

</details>

#### InventoryPostingDrafts

<details>
<summary>listInventoryPostingDrafts</summary>

Queries the InventoryPostingDrafts collection and returns a page of InventoryPostingDraft entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryPostingDraftsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryPostingDraftsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `InventoryPostingDraftsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryPostingDraftsCollectionResponse result = check client->listInventoryPostingDrafts();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#InventoryPostingDrafts",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 1,
      "Series": 0,
      "PostingDate": "2024-01-01",
      "Comments": "Cycle count posting draft"
    }
  ]
}
```

</details>

<details>
<summary>createInventoryPostingDrafts</summary>

Creates a new InventoryPostingDraft entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryPostingDraft</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InventoryPostingDraft|error`

**Sample code:**

```ballerina
InventoryPostingDraft result = check client->createInventoryPostingDrafts(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1,
  "Series": 0,
  "PostingDate": "2024-01-01",
  "Comments": "Cycle count posting draft"
}
```

</details>

<details>
<summary>getInventoryPostingDrafts</summary>

Retrieves a single InventoryPostingDraft entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryPostingDraftsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `InventoryPostingDraft|error`

**Sample code:**

```ballerina
InventoryPostingDraft result = check client->getInventoryPostingDrafts(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1,
  "Series": 0,
  "PostingDate": "2024-01-01"
}
```

</details>

<details>
<summary>deleteInventoryPostingDrafts</summary>

Deletes the InventoryPostingDraft entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryPostingDrafts(1);
```

</details>

<details>
<summary>updateInventoryPostingDrafts</summary>

Partially updates the InventoryPostingDraft entity identified by its `DocumentEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>InventoryPostingDraft</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryPostingDrafts(1, payload);
```

</details>

#### InventoryPostings

<details>
<summary>listInventoryPostings</summary>

Queries the InventoryPostings collection and returns a page of InventoryPosting entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryPostingsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInventoryPostingsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `InventoryPostingsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryPostingsCollectionResponse result = check client->listInventoryPostings();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#InventoryPostings",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 1,
      "Series": 0,
      "PostingDate": "2024-01-01",
      "Remarks": "Physical count posting"
    }
  ]
}
```

</details>

<details>
<summary>createInventoryPostings</summary>

Creates a new InventoryPosting entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryPosting</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InventoryPosting|error`

**Sample code:**

```ballerina
InventoryPosting result = check client->createInventoryPostings(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1,
  "Series": 0,
  "PostingDate": "2024-01-01",
  "Remarks": "Physical count posting"
}
```

</details>

<details>
<summary>getInventoryPostings</summary>

Retrieves a single InventoryPosting entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInventoryPostingsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `InventoryPosting|error`

**Sample code:**

```ballerina
InventoryPosting result = check client->getInventoryPostings(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1,
  "Series": 0,
  "PostingDate": "2024-01-01"
}
```

</details>

<details>
<summary>deleteInventoryPostings</summary>

Deletes the InventoryPosting entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInventoryPostings(1);
```

</details>

<details>
<summary>updateInventoryPostings</summary>

Partially updates the InventoryPosting entity identified by its `DocumentEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>InventoryPosting</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInventoryPostings(1, payload);
```

</details>

<details>
<summary>inventoryPostingsServiceGetList</summary>

Calls the InventoryPostingsService_GetList function to retrieve a list of InventoryPostingParams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_9|error`

**Sample code:**

```ballerina
inline_response_200_9 result = check client->inventoryPostingsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#InventoryPostingsService_GetList",
  "value": [
    {
      "DocumentEntry": 1
    }
  ]
}
```

</details>

<details>
<summary>inventoryPostingsServiceSetCopyOption</summary>

Sets the copy option (e.g. counted quantity source) to apply when generating an InventoryPosting from a base document, via the InventoryPostingsService_SetCopyOption function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryPostingsService_SetCopyOption_body</code> | Yes | Request payload containing the InventoryPostingCopyOption |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->inventoryPostingsServiceSetCopyOption(payload);
```

</details>

#### Manufacturers

<details>
<summary>listManufacturers</summary>

Queries the Manufacturers collection and returns a page of Manufacturer entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListManufacturersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListManufacturersQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ManufacturersCollectionResponse|error`

**Sample code:**

```ballerina
ManufacturersCollectionResponse result = check client->listManufacturers();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Manufacturers",
  "value": [
    {
      "Code": 1,
      "ManufacturerName": "Acme Corp"
    }
  ]
}
```

</details>

<details>
<summary>createManufacturers</summary>

Creates a new Manufacturer entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Manufacturer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Manufacturer|error`

**Sample code:**

```ballerina
Manufacturer result = check client->createManufacturers(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "ManufacturerName": "Acme Corp"
}
```

</details>

<details>
<summary>getManufacturers</summary>

Retrieves a single Manufacturer entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetManufacturersQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Manufacturer|error`

**Sample code:**

```ballerina
Manufacturer result = check client->getManufacturers(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "ManufacturerName": "Acme Corp"
}
```

</details>

<details>
<summary>deleteManufacturers</summary>

Deletes the Manufacturer entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteManufacturers(1);
```

</details>

<details>
<summary>updateManufacturers</summary>

Partially updates the Manufacturer entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>Manufacturer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateManufacturers(1, payload);
```

</details>

#### MaterialRevaluation

<details>
<summary>listMaterialRevaluation</summary>

Queries the MaterialRevaluation collection and returns a page of MaterialRevaluation entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListMaterialRevaluationHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListMaterialRevaluationQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `MaterialRevaluationCollectionResponse|error`

**Sample code:**

```ballerina
MaterialRevaluationCollectionResponse result = check client->listMaterialRevaluation();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MaterialRevaluation",
  "value": [
    {
      "DocEntry": 1,
      "DocNum": 1,
      "DocDate": "2024-01-01",
      "CardCode": "V10000",
      "RevalType": "R"
    }
  ]
}
```

</details>

<details>
<summary>createMaterialRevaluation</summary>

Creates a new MaterialRevaluation entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MaterialRevaluation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MaterialRevaluation|error`

**Sample code:**

```ballerina
MaterialRevaluation result = check client->createMaterialRevaluation(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1,
  "DocDate": "2024-01-01",
  "CardCode": "V10000",
  "RevalType": "R"
}
```

</details>

<details>
<summary>getMaterialRevaluation</summary>

Retrieves a single MaterialRevaluation entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetMaterialRevaluationQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `MaterialRevaluation|error`

**Sample code:**

```ballerina
MaterialRevaluation result = check client->getMaterialRevaluation(1);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1,
  "DocDate": "2024-01-01",
  "CardCode": "V10000"
}
```

</details>

<details>
<summary>deleteMaterialRevaluation</summary>

Deletes the MaterialRevaluation entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteMaterialRevaluation(1);
```

</details>

<details>
<summary>updateMaterialRevaluation</summary>

Partially updates the MaterialRevaluation entity identified by its `DocEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>MaterialRevaluation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateMaterialRevaluation(1, payload);
```

</details>

<details>
<summary>materialRevaluationCancel</summary>

Invokes the bound action `Cancel` on a MaterialRevaluation document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->materialRevaluationCancel(1);
```

</details>

<details>
<summary>materialRevaluationClose</summary>

Invokes the bound action `Close` on a MaterialRevaluation document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->materialRevaluationClose(1);
```

</details>

<details>
<summary>materialRevaluationFIFOServiceGetMaterialRevaluationFIFO</summary>

Retrieves the FIFO cost layers for an item via the MaterialRevaluationFIFOService_GetMaterialRevaluationFIFO function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MaterialRevaluationFIFOService_GetMaterialRevaluationFIFO_body</code> | Yes | Request payload containing the MaterialRevaluationFIFOParams |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MaterialRevaluationFIFO|error`

**Sample code:**

```ballerina
MaterialRevaluationFIFO result = check client->materialRevaluationFIFOServiceGetMaterialRevaluationFIFO(payload);
```

**Sample response:**

```json
{
  "Layers": []
}
```

</details>

<details>
<summary>materialRevaluationSNBServiceAdd</summary>

Adds a serial/batch number revaluation parameter set via the MaterialRevaluationSNBService_Add function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MaterialRevaluationSNBService_Add_body</code> | Yes | Request payload containing the MaterialRevaluationSNBParam |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MaterialRevaluationSNBParams|error`

**Sample code:**

```ballerina
MaterialRevaluationSNBParams result = check client->materialRevaluationSNBServiceAdd(payload);
```

**Sample response:**

```json
{
  "SnbAbsEntry": 1,
  "SystemNumber": 1,
  "NewCost": 12.5,
  "LotNumber": "LOT-001"
}
```

</details>

<details>
<summary>materialRevaluationSNBServiceGetList</summary>

Retrieves a list of serial/batch number revaluation parameters via the MaterialRevaluationSNBService_GetList function.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MaterialRevaluationSNBService_GetList_body</code> | Yes | Request payload containing the MaterialRevaluationSNBParam |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10|error`

**Sample code:**

```ballerina
inline_response_200_10 result = check client->materialRevaluationSNBServiceGetList(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MaterialRevaluationSNBService_GetList",
  "value": [
    {
      "SnbAbsEntry": 1,
      "SystemNumber": 1,
      "NewCost": 12.5,
      "LotNumber": "LOT-001"
    }
  ]
}
```

</details>

#### ShippingTypes

<details>
<summary>listShippingTypes</summary>

Queries the ShippingTypes collection and returns a page of ShippingType entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListShippingTypesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListShippingTypesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ShippingTypesCollectionResponse|error`

**Sample code:**

```ballerina
ShippingTypesCollectionResponse result = check client->listShippingTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ShippingTypes",
  "value": [
    {
      "Code": 1,
      "Name": "Standard Shipping",
      "Website": "https://carrier.example.com"
    }
  ]
}
```

</details>

<details>
<summary>createShippingTypes</summary>

Creates a new ShippingType entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ShippingType</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ShippingType|error`

**Sample code:**

```ballerina
ShippingType result = check client->createShippingTypes(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Standard Shipping",
  "Website": "https://carrier.example.com"
}
```

</details>

<details>
<summary>getShippingTypes</summary>

Retrieves a single ShippingType entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetShippingTypesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ShippingType|error`

**Sample code:**

```ballerina
ShippingType result = check client->getShippingTypes(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Standard Shipping",
  "Website": "https://carrier.example.com"
}
```

</details>

<details>
<summary>deleteShippingTypes</summary>

Deletes the ShippingType entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteShippingTypes(1);
```

</details>

<details>
<summary>updateShippingTypes</summary>

Partially updates the ShippingType entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ShippingType</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateShippingTypes(1, payload);
```

</details>

#### UnitOfMeasurements

<details>
<summary>listUnitOfMeasurements</summary>

Queries the UnitOfMeasurements collection and returns a page of UnitOfMeasurement entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUnitOfMeasurementsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListUnitOfMeasurementsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `UnitOfMeasurementsCollectionResponse|error`

**Sample code:**

```ballerina
UnitOfMeasurementsCollectionResponse result = check client->listUnitOfMeasurements();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UnitOfMeasurements",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "KG",
      "Name": "Kilogram"
    }
  ]
}
```

</details>

<details>
<summary>createUnitOfMeasurements</summary>

Creates a new UnitOfMeasurement entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UnitOfMeasurement</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UnitOfMeasurement|error`

**Sample code:**

```ballerina
UnitOfMeasurement result = check client->createUnitOfMeasurements(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "KG",
  "Name": "Kilogram"
}
```

</details>

<details>
<summary>getUnitOfMeasurements</summary>

Retrieves a single UnitOfMeasurement entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUnitOfMeasurementsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `UnitOfMeasurement|error`

**Sample code:**

```ballerina
UnitOfMeasurement result = check client->getUnitOfMeasurements(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "KG",
  "Name": "Kilogram"
}
```

</details>

<details>
<summary>deleteUnitOfMeasurements</summary>

Deletes the UnitOfMeasurement entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUnitOfMeasurements(1);
```

</details>

<details>
<summary>updateUnitOfMeasurements</summary>

Partially updates the UnitOfMeasurement entity identified by its `AbsEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>UnitOfMeasurement</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUnitOfMeasurements(1, payload);
```

</details>

<details>
<summary>unitOfMeasurementsServiceGetList</summary>

Calls the UnitOfMeasurementsService_GetList function to retrieve a list of UnitOfMeasurementParams.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_13|error`

**Sample code:**

```ballerina
inline_response_200_13 result = check client->unitOfMeasurementsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UnitOfMeasurementsService_GetList",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "KG"
    }
  ]
}
```

</details>

#### BarCodes

<details>
<summary>listBarCodes</summary>

Queries the BarCodes collection and returns a page of BarCode entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBarCodesHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListBarCodesQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `BarCodesCollectionResponse|error`

**Sample code:**

```ballerina
BarCodesCollectionResponse result = check client->listBarCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BarCodes",
  "value": [
    { "AbsEntry": 1, "ItemNo": "A00001", "Barcode": "8901030123456", "UoMEntry": 1 }
  ],
  "odata.nextLink": "BarCodes?$skip=20"
}
```

</details>

<details>
<summary>createBarCodes</summary>

Creates a new BarCode entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BarCode</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `BarCode|error`

**Sample code:**

```ballerina
BarCode result = check client->createBarCodes(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ItemNo": "A00001",
  "Barcode": "8901030123456",
  "UoMEntry": 1,
  "FreeText": "Retail carton barcode"
}
```

</details>

<details>
<summary>getBarCodes</summary>

Retrieves a single BarCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Composite key part 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetBarCodesQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `BarCode|error`

**Sample code:**

```ballerina
BarCode result = check client->getBarCodes(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ItemNo": "A00001",
  "Barcode": "8901030123456",
  "UoMEntry": 1
}
```

</details>

<details>
<summary>deleteBarCodes</summary>

Deletes the BarCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBarCodes(1);
```

</details>

<details>
<summary>updateBarCodes</summary>

Partially updates a BarCode entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>BarCode</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBarCodes(1, payload);
```

</details>

<details>
<summary>barCodesServiceGetList</summary>

Calls the `BarCodesService_GetList` bound function, returning a lightweight list of barcode identifiers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 result = check client->barCodesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BarCodesService_GetList",
  "value": [
    { "AbsEntry": 1, "ItemNo": "A00001", "Barcode": "8901030123456", "UoMEntry": 1 }
  ]
}
```

</details>

#### BinLocations

<details>
<summary>listBinLocations</summary>

Queries the BinLocations collection and returns a page of BinLocation entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBinLocationsHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListBinLocationsQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `BinLocationsCollectionResponse|error`

**Sample code:**

```ballerina
BinLocationsCollectionResponse result = check client->listBinLocations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BinLocations",
  "value": [
    { "AbsEntry": 10, "Warehouse": "01", "Sublevel1": "A", "BinCode": "01-A-01-01", "Description": "Main warehouse rack A" }
  ],
  "odata.nextLink": "BinLocations?$skip=20"
}
```

</details>

<details>
<summary>createBinLocations</summary>

Creates a new BinLocation entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BinLocation</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `BinLocation|error`

**Sample code:**

```ballerina
BinLocation result = check client->createBinLocations(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 10,
  "Warehouse": "01",
  "Sublevel1": "A",
  "Sublevel2": "01",
  "BinCode": "01-A-01-01",
  "Description": "Main warehouse rack A",
  "Inactive": "tNO"
}
```

</details>

<details>
<summary>getBinLocations</summary>

Retrieves a single BinLocation entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetBinLocationsQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `BinLocation|error`

**Sample code:**

```ballerina
BinLocation result = check client->getBinLocations(10);
```

**Sample response:**

```json
{
  "AbsEntry": 10,
  "Warehouse": "01",
  "BinCode": "01-A-01-01",
  "Description": "Main warehouse rack A"
}
```

</details>

<details>
<summary>deleteBinLocations</summary>

Deletes the BinLocation entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBinLocations(10);
```

</details>

<details>
<summary>updateBinLocations</summary>

Partially updates a BinLocation entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>BinLocation</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBinLocations(10, payload);
```

</details>

<details>
<summary>binLocationsServiceGetList</summary>

Calls the `BinLocationsService_GetList` bound function, returning a lightweight list of bin location identifiers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_4|error`

**Sample code:**

```ballerina
inline_response_200_4 result = check client->binLocationsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BinLocationsService_GetList",
  "value": [
    { "BinCode": "01-A-01-01", "AbsEntry": 10 }
  ]
}
```

</details>

#### ItemGroups

<details>
<summary>listItemGroups</summary>

Queries the ItemGroups collection and returns a page of ItemGroups entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListItemGroupsHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListItemGroupsQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `ItemGroupsCollectionResponse|error`

**Sample code:**

```ballerina
ItemGroupsCollectionResponse result = check client->listItemGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ItemGroups",
  "value": [
    { "Number": 100, "InventoryAccount": "_SYS00000001103", "LeadTime": 5, "MinimumOrderQuantity": 10 }
  ],
  "odata.nextLink": "ItemGroups?$skip=20"
}
```

</details>

<details>
<summary>createItemGroups</summary>

Creates a new ItemGroups entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ItemGroups</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `ItemGroups|error`

**Sample code:**

```ballerina
ItemGroups result = check client->createItemGroups(payload);
```

**Sample response:**

```json
{
  "Number": 100,
  "InventoryAccount": "_SYS00000001103",
  "PurchaseAccount": "_SYS00000001104",
  "LeadTime": 5,
  "MinimumOrderQuantity": 10,
  "Alert": "tNO"
}
```

</details>

<details>
<summary>getItemGroups</summary>

Retrieves a single ItemGroups entity identified by its `Number` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `number` | <code>int:Signed32</code> | Yes | Key property 'Number' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetItemGroupsQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `ItemGroups|error`

**Sample code:**

```ballerina
ItemGroups result = check client->getItemGroups(100);
```

**Sample response:**

```json
{
  "Number": 100,
  "InventoryAccount": "_SYS00000001103",
  "LeadTime": 5
}
```

</details>

<details>
<summary>deleteItemGroups</summary>

Deletes the ItemGroups entity identified by its `Number` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `number` | <code>int:Signed32</code> | Yes | Key property 'Number' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteItemGroups(100);
```

</details>

<details>
<summary>updateItemGroups</summary>

Partially updates an ItemGroups entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `number` | <code>int:Signed32</code> | Yes | Key property 'Number' (Edm.Int32). |
| `payload` | <code>ItemGroups</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateItemGroups(100, payload);
```

</details>

<details>
<summary>itemGroupsServiceUpdateWithOITMs</summary>

Calls the `ItemGroupsService_UpdateWithOITMs` bound function to update an item group and cascade the change to its member items (OITM rows).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ItemGroupsService_UpdateWithOITMs_body</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->itemGroupsServiceUpdateWithOITMs(payload);
```

</details>

#### ItemImages

<details>
<summary>listItemImages</summary>

Queries the ItemImages collection and returns a page of ItemImage entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListItemImagesHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListItemImagesQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `ItemImagesCollectionResponse|error`

**Sample code:**

```ballerina
ItemImagesCollectionResponse result = check client->listItemImages();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ItemImages",
  "value": [
    { "ItemCode": "A00001", "Picture": "iVBORw0KGgoAAAANSUhEUgAA..." }
  ],
  "odata.nextLink": "ItemImages?$skip=20"
}
```

</details>

<details>
<summary>createItemImages</summary>

Creates a new ItemImage entity (uploads an image and associates it with an item) in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ItemImage</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `ItemImage|error`

**Sample code:**

```ballerina
ItemImage result = check client->createItemImages(payload);
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "Picture": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

</details>

<details>
<summary>getItemImages</summary>

Retrieves a single ItemImage entity identified by its `ItemCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetItemImagesQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `ItemImage|error`

**Sample code:**

```ballerina
ItemImage result = check client->getItemImages("A00001");
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "Picture": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

</details>

<details>
<summary>deleteItemImages</summary>

Deletes the ItemImage entity identified by its `ItemCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteItemImages("A00001");
```

</details>

<details>
<summary>updateItemImages</summary>

Partially updates an ItemImage entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Key property 'ItemCode' (Edm.String). |
| `payload` | <code>ItemImage</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateItemImages("A00001", payload);
```

</details>

#### PackagesTypes

<details>
<summary>listPackagesTypes</summary>

Queries the PackagesTypes collection and returns a page of PackagesType entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPackagesTypesHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListPackagesTypesQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `PackagesTypesCollectionResponse|error`

**Sample code:**

```ballerina
PackagesTypesCollectionResponse result = check client->listPackagesTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PackagesTypes",
  "value": [
    { "Code": 1, "Type": "Carton", "Length1": 40, "Width1": 30, "Height1": 25, "Weight1": 5.5 }
  ],
  "odata.nextLink": "PackagesTypes?$skip=20"
}
```

</details>

<details>
<summary>createPackagesTypes</summary>

Creates a new PackagesType entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PackagesType</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `PackagesType|error`

**Sample code:**

```ballerina
PackagesType result = check client->createPackagesTypes(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Type": "Carton",
  "Length1": 40,
  "Width1": 30,
  "Height1": 25,
  "Volume": 30000,
  "Weight1": 5.5
}
```

</details>

<details>
<summary>getPackagesTypes</summary>

Retrieves a single PackagesType entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetPackagesTypesQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `PackagesType|error`

**Sample code:**

```ballerina
PackagesType result = check client->getPackagesTypes(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Type": "Carton",
  "Weight1": 5.5
}
```

</details>

<details>
<summary>deletePackagesTypes</summary>

Deletes the PackagesType entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deletePackagesTypes(1);
```

</details>

<details>
<summary>updatePackagesTypes</summary>

Partially updates a PackagesType entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32). |
| `payload` | <code>PackagesType</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updatePackagesTypes(1, payload);
```

</details>

#### PickLists

<details>
<summary>listPickLists</summary>

Queries the PickLists collection and returns a page of PickList entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPickListsHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListPickListsQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `PickListsCollectionResponse|error`

**Sample code:**

```ballerina
PickListsCollectionResponse result = check client->listPickLists();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PickLists",
  "value": [
    { "Absoluteentry": 1, "Name": "Pick List 1", "OwnerCode": 1, "PickDate": "2026-07-10", "Status": "ps_Open" }
  ],
  "odata.nextLink": "PickLists?$skip=20"
}
```

</details>

<details>
<summary>createPickLists</summary>

Creates a new PickList entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PickList</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `PickList|error`

**Sample code:**

```ballerina
PickList result = check client->createPickLists(payload);
```

**Sample response:**

```json
{
  "Absoluteentry": 1,
  "Name": "Pick List 1",
  "OwnerCode": 1,
  "PickDate": "2026-07-10",
  "Status": "ps_Open",
  "PickListsLines": [
    { "OrderEntry": 100, "OrderRowID": 0, "PickedQuantity": 5 }
  ]
}
```

</details>

<details>
<summary>getPickLists</summary>

Retrieves a single PickList entity identified by its `Absoluteentry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteentry` | <code>int:Signed32</code> | Yes | Key property 'Absoluteentry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetPickListsQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `PickList|error`

**Sample code:**

```ballerina
PickList result = check client->getPickLists(1);
```

**Sample response:**

```json
{
  "Absoluteentry": 1,
  "Name": "Pick List 1",
  "Status": "ps_Open"
}
```

</details>

<details>
<summary>deletePickLists</summary>

Deletes the PickList entity identified by its `Absoluteentry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteentry` | <code>int:Signed32</code> | Yes | Key property 'Absoluteentry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deletePickLists(1);
```

</details>

<details>
<summary>updatePickLists</summary>

Partially updates a PickList entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteentry` | <code>int:Signed32</code> | Yes | Key property 'Absoluteentry' (Edm.Int32). |
| `payload` | <code>PickList</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updatePickLists(1, payload);
```

</details>

<details>
<summary>pickListsGetReleasedAllocation</summary>

Invokes the bound action `GetReleasedAllocation` on a PickList to retrieve its currently released stock allocation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteentry` | <code>int:Signed32</code> | Yes | Key property 'Absoluteentry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `PickList|error`

**Sample code:**

```ballerina
PickList result = check client->pickListsGetReleasedAllocation(1);
```

**Sample response:**

```json
{
  "Absoluteentry": 1,
  "PickListsLines": [
    { "OrderEntry": 100, "OrderRowID": 0, "ReleasedQuantity": 5 }
  ]
}
```

</details>

<details>
<summary>pickListsServiceClose</summary>

Calls the `PickListsService_Close` bound function to close a pick list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PickListsService_Close_body</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->pickListsServiceClose(payload);
```

</details>

<details>
<summary>pickListsServiceUpdateReleasedAllocation</summary>

Calls the `PickListsService_UpdateReleasedAllocation` bound function to update the released allocation quantities on a pick list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PickListsService_UpdateReleasedAllocation_body</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->pickListsServiceUpdateReleasedAllocation(payload);
```

</details>

#### SpecialPrices

<details>
<summary>listSpecialPrices</summary>

Queries the SpecialPrices collection and returns a page of SpecialPrice entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSpecialPricesHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListSpecialPricesQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `SpecialPricesCollectionResponse|error`

**Sample code:**

```ballerina
SpecialPricesCollectionResponse result = check client->listSpecialPrices();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#SpecialPrices",
  "value": [
    { "ItemCode": "A00001", "CardCode": "C00001", "Price": 95.5, "Currency": "USD", "DiscountPercent": 5 }
  ],
  "odata.nextLink": "SpecialPrices?$skip=20"
}
```

</details>

<details>
<summary>createSpecialPrices</summary>

Creates a new SpecialPrice entity (a customer- and item-specific price override) in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SpecialPrice</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `SpecialPrice|error`

**Sample code:**

```ballerina
SpecialPrice result = check client->createSpecialPrices(payload);
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "CardCode": "C00001",
  "Price": 95.5,
  "Currency": "USD",
  "DiscountPercent": 5,
  "PriceListNum": 1,
  "Valid": "tYES"
}
```

</details>

<details>
<summary>getSpecialPrices</summary>

Retrieves a single SpecialPrice entity identified by its composite `ItemCode`/`CardCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String). |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetSpecialPricesQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `SpecialPrice|error`

**Sample code:**

```ballerina
SpecialPrice result = check client->getSpecialPrices("A00001", "C00001");
```

**Sample response:**

```json
{
  "ItemCode": "A00001",
  "CardCode": "C00001",
  "Price": 95.5
}
```

</details>

<details>
<summary>deleteSpecialPrices</summary>

Deletes the SpecialPrice entity identified by its composite `ItemCode`/`CardCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String). |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteSpecialPrices("A00001", "C00001");
```

</details>

<details>
<summary>updateSpecialPrices</summary>

Partially updates a SpecialPrice entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `itemCode` | <code>string</code> | Yes | Composite key part 'ItemCode' (Edm.String). |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String). |
| `payload` | <code>SpecialPrice</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateSpecialPrices("A00001", "C00001", payload);
```

</details>

#### StockTransferDrafts

<details>
<summary>stockTransferDraftServiceGetApprovalTemplates</summary>

Calls the `StockTransferDraftService_GetApprovalTemplates` bound function to retrieve the approval templates applicable to a draft stock transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>StockTransferDraftService_GetApprovalTemplates_body</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->stockTransferDraftServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1000,
  "FromWarehouse": "01",
  "ToWarehouse": "02"
}
```

</details>

<details>
<summary>stockTransferDraftServiceHandleApprovalRequest</summary>

Calls the `StockTransferDraftService_HandleApprovalRequest` bound function to process an approval decision for a draft stock transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransferDraftServiceHandleApprovalRequest();
```

</details>

<details>
<summary>listStockTransferDrafts</summary>

Queries the StockTransferDrafts collection and returns a page of draft StockTransfer entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListStockTransferDraftsHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListStockTransferDraftsQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `StockTransferDraftsCollectionResponse|error`

**Sample code:**

```ballerina
StockTransferDraftsCollectionResponse result = check client->listStockTransferDrafts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#StockTransferDrafts",
  "value": [
    { "DocEntry": 1000, "DocNum": 1000, "FromWarehouse": "01", "ToWarehouse": "02", "DocDate": "2026-07-10" }
  ],
  "odata.nextLink": "StockTransferDrafts?$skip=20"
}
```

</details>

<details>
<summary>createStockTransferDrafts</summary>

Creates a new draft StockTransfer document in the StockTransferDrafts collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>StockTransfer</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->createStockTransferDrafts(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1000,
  "DocNum": 1000,
  "DocDate": "2026-07-10",
  "FromWarehouse": "01",
  "ToWarehouse": "02",
  "Comments": "Monthly stock rebalancing"
}
```

</details>

<details>
<summary>getStockTransferDrafts</summary>

Retrieves a single draft StockTransfer entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetStockTransferDraftsQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->getStockTransferDrafts(1000);
```

**Sample response:**

```json
{
  "DocEntry": 1000,
  "FromWarehouse": "01",
  "ToWarehouse": "02"
}
```

</details>

<details>
<summary>deleteStockTransferDrafts</summary>

Deletes the draft StockTransfer entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteStockTransferDrafts(1000);
```

</details>

<details>
<summary>updateStockTransferDrafts</summary>

Partially updates a draft StockTransfer entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `payload` | <code>StockTransfer</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateStockTransferDrafts(1000, payload);
```

</details>

<details>
<summary>stockTransferDraftsCancel</summary>

Invokes the bound action `Cancel` on a StockTransferDrafts entry to cancel the draft.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransferDraftsCancel(1000);
```

</details>

<details>
<summary>stockTransferDraftsClose</summary>

Invokes the bound action `Close` on a StockTransferDrafts entry to close the draft.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransferDraftsClose(1000);
```

</details>

<details>
<summary>stockTransferDraftsSaveDraftToDocument</summary>

Invokes the bound action `SaveDraftToDocument` on a StockTransferDrafts entry to convert the draft into a regular StockTransfer document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransferDraftsSaveDraftToDocument(1000);
```

</details>

#### StockTransfers

<details>
<summary>stockTransferServiceGetApprovalTemplates</summary>

Calls the `StockTransferService_GetApprovalTemplates` bound function to retrieve the approval templates applicable to a stock transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>StockTransferService_GetApprovalTemplates_body</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->stockTransferServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 2000,
  "FromWarehouse": "01",
  "ToWarehouse": "02"
}
```

</details>

<details>
<summary>stockTransferServiceHandleApprovalRequest</summary>

Calls the `StockTransferService_HandleApprovalRequest` bound function to process an approval decision for a stock transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransferServiceHandleApprovalRequest();
```

</details>

<details>
<summary>listStockTransfers</summary>

Queries the StockTransfers collection and returns a page of StockTransfer entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListStockTransfersHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListStockTransfersQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `StockTransfersCollectionResponse|error`

**Sample code:**

```ballerina
StockTransfersCollectionResponse result = check client->listStockTransfers();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#StockTransfers",
  "value": [
    { "DocEntry": 2000, "DocNum": 2000, "FromWarehouse": "01", "ToWarehouse": "02", "DocDate": "2026-07-10" }
  ],
  "odata.nextLink": "StockTransfers?$skip=20"
}
```

</details>

<details>
<summary>createStockTransfers</summary>

Creates a new StockTransfer document in the StockTransfers collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>StockTransfer</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->createStockTransfers(payload);
```

**Sample response:**

```json
{
  "DocEntry": 2000,
  "DocNum": 2000,
  "DocDate": "2026-07-10",
  "FromWarehouse": "01",
  "ToWarehouse": "02",
  "Comments": "Monthly stock rebalancing"
}
```

</details>

<details>
<summary>getStockTransfers</summary>

Retrieves a single StockTransfer entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetStockTransfersQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `StockTransfer|error`

**Sample code:**

```ballerina
StockTransfer result = check client->getStockTransfers(2000);
```

**Sample response:**

```json
{
  "DocEntry": 2000,
  "FromWarehouse": "01",
  "ToWarehouse": "02"
}
```

</details>

<details>
<summary>deleteStockTransfers</summary>

Deletes the StockTransfer entity identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteStockTransfers(2000);
```

</details>

<details>
<summary>updateStockTransfers</summary>

Partially updates a StockTransfer entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `payload` | <code>StockTransfer</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateStockTransfers(2000, payload);
```

</details>

<details>
<summary>stockTransfersCancel</summary>

Invokes the bound action `Cancel` on a StockTransfers document to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransfersCancel(2000);
```

</details>

<details>
<summary>stockTransfersClose</summary>

Invokes the bound action `Close` on a StockTransfers document to close it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransfersClose(2000);
```

</details>

<details>
<summary>stockTransfersSaveDraftToDocument</summary>

Invokes the bound action `SaveDraftToDocument` on a StockTransfers document to persist a linked draft as a final document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->stockTransfersSaveDraftToDocument(2000);
```

</details>

#### WarehouseSublevelCodes

<details>
<summary>listWarehouseSublevelCodes</summary>

Queries the WarehouseSublevelCodes collection and returns a page of WarehouseSublevelCode entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWarehouseSublevelCodesHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListWarehouseSublevelCodesQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `WarehouseSublevelCodesCollectionResponse|error`

**Sample code:**

```ballerina
WarehouseSublevelCodesCollectionResponse result = check client->listWarehouseSublevelCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WarehouseSublevelCodes",
  "value": [
    { "Code": "A", "AbsEntry": 1, "WarehouseSublevel": 1, "Description": "Aisle level" }
  ],
  "odata.nextLink": "WarehouseSublevelCodes?$skip=20"
}
```

</details>

<details>
<summary>createWarehouseSublevelCodes</summary>

Creates a new WarehouseSublevelCode entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WarehouseSublevelCode</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `WarehouseSublevelCode|error`

**Sample code:**

```ballerina
WarehouseSublevelCode result = check client->createWarehouseSublevelCodes(payload);
```

**Sample response:**

```json
{
  "Code": "A",
  "AbsEntry": 1,
  "WarehouseSublevel": 1,
  "Description": "Aisle level"
}
```

</details>

<details>
<summary>getWarehouseSublevelCodes</summary>

Retrieves a single WarehouseSublevelCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetWarehouseSublevelCodesQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `WarehouseSublevelCode|error`

**Sample code:**

```ballerina
WarehouseSublevelCode result = check client->getWarehouseSublevelCodes(1);
```

**Sample response:**

```json
{
  "Code": "A",
  "AbsEntry": 1,
  "WarehouseSublevel": 1
}
```

</details>

<details>
<summary>deleteWarehouseSublevelCodes</summary>

Deletes the WarehouseSublevelCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteWarehouseSublevelCodes(1);
```

</details>

<details>
<summary>updateWarehouseSublevelCodes</summary>

Partially updates a WarehouseSublevelCode entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>WarehouseSublevelCode</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateWarehouseSublevelCodes(1, payload);
```

</details>

<details>
<summary>warehouseSublevelCodesServiceGetList</summary>

Calls the `WarehouseSublevelCodesService_GetList` bound function, returning a lightweight list of warehouse sublevel code identifiers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_14|error`

**Sample code:**

```ballerina
inline_response_200_14 result = check client->warehouseSublevelCodesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WarehouseSublevelCodesService_GetList",
  "value": [
    { "Code": "A", "AbsEntry": 1, "WarehouseSublevel": 1 }
  ]
}
```

</details>

#### InventoryCountingDrafts

<details>
<summary>listInventoryCountingDrafts</summary>

Queries the InventoryCountingDrafts collection and returns a page of InventoryCountingDraft entities, with optional OData paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInventoryCountingDraftsHeaders</code> | No | Headers to be sent with the request (supports the `Prefer` header for server-side paging control). |
| `queries` | <code>ListInventoryCountingDraftsQueries</code> | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

**Returns:** `InventoryCountingDraftsCollectionResponse|error`

**Sample code:**

```ballerina
InventoryCountingDraftsCollectionResponse result = check client->listInventoryCountingDrafts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InventoryCountingDrafts",
  "value": [
    { "DocumentEntry": 501, "DocumentNumber": 501, "Series": 1, "CountDate": "2026-07-01", "DocumentStatus": "cdsOpen" }
  ],
  "odata.nextLink": "InventoryCountingDrafts?$skip=20"
}
```

</details>

<details>
<summary>createInventoryCountingDrafts</summary>

Creates a new InventoryCountingDraft entity in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InventoryCountingDraft</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `InventoryCountingDraft|error`

**Sample code:**

```ballerina
InventoryCountingDraft result = check client->createInventoryCountingDrafts(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 501,
  "DocumentNumber": 501,
  "Series": 1,
  "CountDate": "2026-07-01",
  "CountTime": "14:30:00",
  "DocumentStatus": "cdsOpen",
  "Remarks": "Monthly cycle count draft"
}
```

</details>

<details>
<summary>getInventoryCountingDrafts</summary>

Retrieves a single InventoryCountingDraft entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetInventoryCountingDraftsQueries</code> | No | OData query parameters: `$expand`, `$select`. |

**Returns:** `InventoryCountingDraft|error`

**Sample code:**

```ballerina
InventoryCountingDraft result = check client->getInventoryCountingDrafts(501);
```

**Sample response:**

```json
{
  "DocumentEntry": 501,
  "CountDate": "2026-07-01",
  "DocumentStatus": "cdsOpen"
}
```

</details>

<details>
<summary>deleteInventoryCountingDrafts</summary>

Deletes the InventoryCountingDraft entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteInventoryCountingDrafts(501);
```

</details>

<details>
<summary>updateInventoryCountingDrafts</summary>

Partially updates an InventoryCountingDraft entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32). |
| `payload` | <code>InventoryCountingDraft</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateInventoryCountingDrafts(501, payload);
```

</details>
