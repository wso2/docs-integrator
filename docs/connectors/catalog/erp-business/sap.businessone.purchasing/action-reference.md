# Actions

The `ballerinax/sap.businessone.purchasing` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One purchasing (A/P) documents — purchase requests & quotations, purchase orders & delivery notes, A/P invoices, credit notes & down payments, purchase returns & goods return requests, correction purchase invoices & reversals, landed costs & landed cost codes, and purchase tax invoices — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the purchasing (A/P) documents exposed by the SAP Business One Service Layer — purchase requests, quotations, orders, delivery notes, invoices, credit notes, down payments, returns, goods return requests, correction invoices and their reversals, landed costs, landed cost codes, and purchase tax invoices.

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
import ballerinax/sap.businessone.purchasing;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

purchasing:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### CorrectionPurchaseInvoiceReversal

<details>
<summary>listCorrectionPurchaseInvoiceReversal</summary>

Queries the CorrectionPurchaseInvoiceReversal collection and returns a page of documents, supporting OData query options for paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCorrectionPurchaseInvoiceReversalHeaders</code> | No | Headers to be sent with the request; supports the Prefer header for Service Layer paging control (e.g. odata.maxpagesize=100) |
| `queries` | <code>ListCorrectionPurchaseInvoiceReversalQueries</code> | No | OData query options: $skip, $top, $filter, $orderby, $expand, $inlinecount, and $select |

**Returns:** `CorrectionPurchaseInvoiceReversalCollectionResponse|error`

**Sample code:**

```ballerina
CorrectionPurchaseInvoiceReversalCollectionResponse result = check client->listCorrectionPurchaseInvoiceReversal();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CorrectionPurchaseInvoiceReversal",
  "value": [
    {
      "DocEntry": 12,
      "DocNum": 12,
      "DocType": "dDocument_Items",
      "DocDate": "2026-07-01"
    }
  ],
  "odata.nextLink": "CorrectionPurchaseInvoiceReversal?$skip=20"
}
```

</details>

<details>
<summary>createCorrectionPurchaseInvoiceReversal</summary>

Creates a new correction purchase invoice reversal document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The document entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createCorrectionPurchaseInvoiceReversal(payload);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>getCorrectionPurchaseInvoiceReversal</summary>

Retrieves a single correction purchase invoice reversal document by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCorrectionPurchaseInvoiceReversalQueries</code> | No | OData query options: $expand and $select |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getCorrectionPurchaseInvoiceReversal(12);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>deleteCorrectionPurchaseInvoiceReversal</summary>

Deletes the correction purchase invoice reversal document identified by the given DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCorrectionPurchaseInvoiceReversal(12);
```

</details>

<details>
<summary>updateCorrectionPurchaseInvoiceReversal</summary>

Partially updates the correction purchase invoice reversal document identified by DocEntry using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCorrectionPurchaseInvoiceReversal(12, payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalCancel</summary>

Invokes the bound action 'Cancel' on the CorrectionPurchaseInvoiceReversal document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalCancel(12);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalClose</summary>

Invokes the bound action 'Close' on the CorrectionPurchaseInvoiceReversal document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalClose(12);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on the CorrectionPurchaseInvoiceReversal document identified by DocEntry and returns the resulting cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionPurchaseInvoiceReversalCreateCancellationDocument(12);
```

**Sample response:**

```json
{
  "DocEntry": 13,
  "DocNum": 13,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalReopen</summary>

Invokes the bound action 'Reopen' on the CorrectionPurchaseInvoiceReversal document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalReopen(12);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceApproveAndAdd</summary>

Approves and adds a correction purchase invoice reversal document via the CorrectionPurchaseInvoiceReversalService_ApproveAndAdd service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceReversalService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the Document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceApproveAndUpdate</summary>

Approves and updates a correction purchase invoice reversal document via the CorrectionPurchaseInvoiceReversalService_ApproveAndUpdate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceReversalService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the Document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceCloseByDate</summary>

Closes a correction purchase invoice reversal document by date via the CorrectionPurchaseInvoiceReversalService_CloseByDate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceReversalService_CloseByDate_body</code> | Yes | Request payload wrapping DocumentCloseParams (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalServiceCloseByDate(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceExportEWayBill</summary>

Exports an E-Way bill for a correction purchase invoice reversal document via the CorrectionPurchaseInvoiceReversalService_ExportEWayBill service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceReversalService_ExportEWayBill_body</code> | Yes | Request payload wrapping the Document for which to export the E-Way bill |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalServiceExportEWayBill(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to a correction purchase invoice reversal document via the CorrectionPurchaseInvoiceReversalService_GetApprovalTemplates service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceReversalService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the Document to evaluate for approval templates |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionPurchaseInvoiceReversalServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceHandleApprovalRequest</summary>

Handles an approval request for correction purchase invoice reversals via the CorrectionPurchaseInvoiceReversalService_HandleApprovalRequest service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReversalServiceHandleApprovalRequest();
```

</details>

<details>
<summary>correctionPurchaseInvoiceReversalServiceInitData</summary>

Initializes document data via the CorrectionPurchaseInvoiceReversalService_InitData service operation and returns the initialized document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionPurchaseInvoiceReversalServiceInitData();
```

**Sample response:**

```json
{
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

#### PurchaseDownPayments

<details>
<summary>listPurchaseDownPayments</summary>

Queries the PurchaseDownPayments collection and returns a page of documents, supporting OData query options for paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseDownPaymentsHeaders</code> | No | Headers to be sent with the request; supports the Prefer header for Service Layer paging control (e.g. odata.maxpagesize=100) |
| `queries` | <code>ListPurchaseDownPaymentsQueries</code> | No | OData query options: $skip, $top, $filter, $orderby, $expand, $inlinecount, and $select |

**Returns:** `PurchaseDownPaymentsCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseDownPaymentsCollectionResponse result = check client->listPurchaseDownPayments();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PurchaseDownPayments",
  "value": [
    {
      "DocEntry": 8,
      "DocNum": 8,
      "DocType": "dDocument_Items",
      "DocDate": "2026-07-01"
    }
  ],
  "odata.nextLink": "PurchaseDownPayments?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseDownPayments</summary>

Creates a new purchase down payment document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The document entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createPurchaseDownPayments(payload);
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>getPurchaseDownPayments</summary>

Retrieves a single purchase down payment document by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseDownPaymentsQueries</code> | No | OData query options: $expand and $select |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getPurchaseDownPayments(8);
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>deletePurchaseDownPayments</summary>

Deletes the purchase down payment document identified by the given DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseDownPayments(8);
```

</details>

<details>
<summary>updatePurchaseDownPayments</summary>

Partially updates the purchase down payment document identified by DocEntry using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseDownPayments(8, payload);
```

</details>

<details>
<summary>purchaseDownPaymentsCancel</summary>

Invokes the bound action 'Cancel' on the PurchaseDownPayments document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsCancel(8);
```

</details>

<details>
<summary>purchaseDownPaymentsClose</summary>

Invokes the bound action 'Close' on the PurchaseDownPayments document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsClose(8);
```

</details>

<details>
<summary>purchaseDownPaymentsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on the PurchaseDownPayments document identified by DocEntry and returns the resulting cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseDownPaymentsCreateCancellationDocument(8);
```

**Sample response:**

```json
{
  "DocEntry": 9,
  "DocNum": 9,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseDownPaymentsReopen</summary>

Invokes the bound action 'Reopen' on the PurchaseDownPayments document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsReopen(8);
```

</details>

<details>
<summary>purchaseDownPaymentsServiceApproveAndAdd</summary>

Approves and adds a purchase down payment document via the PurchaseDownPaymentsService_ApproveAndAdd service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDownPaymentsService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the Document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>purchaseDownPaymentsServiceApproveAndUpdate</summary>

Approves and updates a purchase down payment document via the PurchaseDownPaymentsService_ApproveAndUpdate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDownPaymentsService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the Document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>purchaseDownPaymentsServiceCloseByDate</summary>

Closes a purchase down payment document by date via the PurchaseDownPaymentsService_CloseByDate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDownPaymentsService_CloseByDate_body</code> | Yes | Request payload wrapping DocumentCloseParams (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsServiceCloseByDate(payload);
```

</details>

<details>
<summary>purchaseDownPaymentsServiceExportEWayBill</summary>

Exports an E-Way bill for a purchase down payment document via the PurchaseDownPaymentsService_ExportEWayBill service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDownPaymentsService_ExportEWayBill_body</code> | Yes | Request payload wrapping the Document for which to export the E-Way bill |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsServiceExportEWayBill(payload);
```

</details>

<details>
<summary>purchaseDownPaymentsServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to a purchase down payment document via the PurchaseDownPaymentsService_GetApprovalTemplates service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDownPaymentsService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the Document to evaluate for approval templates |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseDownPaymentsServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseDownPaymentsServiceHandleApprovalRequest</summary>

Handles an approval request for purchase down payments via the PurchaseDownPaymentsService_HandleApprovalRequest service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDownPaymentsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseDownPaymentsServiceInitData</summary>

Initializes document data via the PurchaseDownPaymentsService_InitData service operation and returns the initialized document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseDownPaymentsServiceInitData();
```

**Sample response:**

```json
{
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

#### PurchaseInvoices

<details>
<summary>listPurchaseInvoices</summary>

Queries the PurchaseInvoices collection and returns a page of documents, supporting OData query options for paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseInvoicesHeaders</code> | No | Headers to be sent with the request; supports the Prefer header for Service Layer paging control (e.g. odata.maxpagesize=100) |
| `queries` | <code>ListPurchaseInvoicesQueries</code> | No | OData query options: $skip, $top, $filter, $orderby, $expand, $inlinecount, and $select |

**Returns:** `PurchaseInvoicesCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseInvoicesCollectionResponse result = check client->listPurchaseInvoices();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PurchaseInvoices",
  "value": [
    {
      "DocEntry": 17,
      "DocNum": 17,
      "DocType": "dDocument_Items",
      "DocDate": "2026-07-01"
    }
  ],
  "odata.nextLink": "PurchaseInvoices?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseInvoices</summary>

Creates a new purchase invoice document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The document entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createPurchaseInvoices(payload);
```

**Sample response:**

```json
{
  "DocEntry": 17,
  "DocNum": 17,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>getPurchaseInvoices</summary>

Retrieves a single purchase invoice document by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseInvoicesQueries</code> | No | OData query options: $expand and $select |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getPurchaseInvoices(17);
```

**Sample response:**

```json
{
  "DocEntry": 17,
  "DocNum": 17,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>deletePurchaseInvoices</summary>

Deletes the purchase invoice document identified by the given DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseInvoices(17);
```

</details>

<details>
<summary>updatePurchaseInvoices</summary>

Partially updates the purchase invoice document identified by DocEntry using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseInvoices(17, payload);
```

</details>

<details>
<summary>purchaseInvoicesCancel</summary>

Invokes the bound action 'Cancel' on the PurchaseInvoices document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesCancel(17);
```

</details>

<details>
<summary>purchaseInvoicesClose</summary>

Invokes the bound action 'Close' on the PurchaseInvoices document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesClose(17);
```

</details>

<details>
<summary>purchaseInvoicesCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on the PurchaseInvoices document identified by DocEntry and returns the resulting cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseInvoicesCreateCancellationDocument(17);
```

**Sample response:**

```json
{
  "DocEntry": 18,
  "DocNum": 18,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseInvoicesReopen</summary>

Invokes the bound action 'Reopen' on the PurchaseInvoices document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesReopen(17);
```

</details>

<details>
<summary>purchaseInvoicesServiceApproveAndAdd</summary>

Approves and adds a purchase invoice document via the PurchaseInvoicesService_ApproveAndAdd service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseInvoicesService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the Document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>purchaseInvoicesServiceApproveAndUpdate</summary>

Approves and updates a purchase invoice document via the PurchaseInvoicesService_ApproveAndUpdate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseInvoicesService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the Document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>purchaseInvoicesServiceCancel2</summary>

Cancels a purchase invoice via the PurchaseInvoicesService_Cancel2 service operation, passing the document in the request payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseInvoicesService_Cancel2_body</code> | Yes | Request payload wrapping the Document to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesServiceCancel2(payload);
```

</details>

<details>
<summary>purchaseInvoicesServiceCloseByDate</summary>

Closes a purchase invoice document by date via the PurchaseInvoicesService_CloseByDate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseInvoicesService_CloseByDate_body</code> | Yes | Request payload wrapping DocumentCloseParams (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesServiceCloseByDate(payload);
```

</details>

<details>
<summary>purchaseInvoicesServiceExportEWayBill</summary>

Exports an E-Way bill for a purchase invoice document via the PurchaseInvoicesService_ExportEWayBill service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseInvoicesService_ExportEWayBill_body</code> | Yes | Request payload wrapping the Document for which to export the E-Way bill |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesServiceExportEWayBill(payload);
```

</details>

<details>
<summary>purchaseInvoicesServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to a purchase invoice document via the PurchaseInvoicesService_GetApprovalTemplates service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseInvoicesService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the Document to evaluate for approval templates |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseInvoicesServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 17,
  "DocNum": 17,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseInvoicesServiceHandleApprovalRequest</summary>

Handles an approval request for purchase invoices via the PurchaseInvoicesService_HandleApprovalRequest service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseInvoicesServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseInvoicesServiceInitData</summary>

Initializes document data via the PurchaseInvoicesService_InitData service operation and returns the initialized document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseInvoicesServiceInitData();
```

**Sample response:**

```json
{
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

#### PurchaseRequests

<details>
<summary>purchaseRequestServiceApproveAndAdd</summary>

Approves and adds a purchase request document via the PurchaseRequestService_ApproveAndAdd service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseRequestService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the Document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>purchaseRequestServiceApproveAndUpdate</summary>

Approves and updates a purchase request document via the PurchaseRequestService_ApproveAndUpdate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseRequestService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the Document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>purchaseRequestServiceCloseByDate</summary>

Closes a purchase request document by date via the PurchaseRequestService_CloseByDate service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseRequestService_CloseByDate_body</code> | Yes | Request payload wrapping DocumentCloseParams (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestServiceCloseByDate(payload);
```

</details>

<details>
<summary>purchaseRequestServiceExportEWayBill</summary>

Exports an E-Way bill for a purchase request document via the PurchaseRequestService_ExportEWayBill service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseRequestService_ExportEWayBill_body</code> | Yes | Request payload wrapping the Document for which to export the E-Way bill |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestServiceExportEWayBill(payload);
```

</details>

<details>
<summary>purchaseRequestServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to a purchase request document via the PurchaseRequestService_GetApprovalTemplates service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseRequestService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the Document to evaluate for approval templates |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseRequestServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "DocNum": 5,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseRequestServiceHandleApprovalRequest</summary>

Handles an approval request for purchase requests via the PurchaseRequestService_HandleApprovalRequest service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseRequestServiceInitData</summary>

Initializes document data via the PurchaseRequestService_InitData service operation and returns the initialized document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseRequestServiceInitData();
```

**Sample response:**

```json
{
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>listPurchaseRequests</summary>

Queries the PurchaseRequests collection and returns a page of documents, supporting OData query options for paging, filtering, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseRequestsHeaders</code> | No | Headers to be sent with the request; supports the Prefer header for Service Layer paging control (e.g. odata.maxpagesize=100) |
| `queries` | <code>ListPurchaseRequestsQueries</code> | No | OData query options: $skip, $top, $filter, $orderby, $expand, $inlinecount, and $select |

**Returns:** `PurchaseRequestsCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseRequestsCollectionResponse result = check client->listPurchaseRequests();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PurchaseRequests",
  "value": [
    {
      "DocEntry": 5,
      "DocNum": 5,
      "DocType": "dDocument_Items",
      "DocDate": "2026-07-01"
    }
  ],
  "odata.nextLink": "PurchaseRequests?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseRequests</summary>

Creates a new purchase request document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The document entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createPurchaseRequests(payload);
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "DocNum": 5,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>getPurchaseRequests</summary>

Retrieves a single purchase request document by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseRequestsQueries</code> | No | OData query options: $expand and $select |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getPurchaseRequests(5);
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "DocNum": 5,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>deletePurchaseRequests</summary>

Deletes the purchase request document identified by the given DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseRequests(5);
```

</details>

<details>
<summary>updatePurchaseRequests</summary>

Partially updates the purchase request document identified by DocEntry using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseRequests(5, payload);
```

</details>

<details>
<summary>purchaseRequestsCancel</summary>

Invokes the bound action 'Cancel' on the PurchaseRequests document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestsCancel(5);
```

</details>

<details>
<summary>purchaseRequestsClose</summary>

Invokes the bound action 'Close' on the PurchaseRequests document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestsClose(5);
```

</details>

<details>
<summary>purchaseRequestsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on the PurchaseRequests document identified by DocEntry and returns the resulting cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseRequestsCreateCancellationDocument(5);
```

**Sample response:**

```json
{
  "DocEntry": 6,
  "DocNum": 6,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseRequestsReopen</summary>

Invokes the bound action 'Reopen' on the PurchaseRequests document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseRequestsReopen(5);
```

</details>
#### LandedCosts

<details>
<summary>listLandedCosts</summary>

Queries the LandedCosts collection and returns a page of landed cost entities, with optional OData query parameters for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListLandedCostsHeaders</code> | No | Headers to be sent with the request, e.g. the `Prefer` header for Service Layer paging control |
| `queries` | <code>ListLandedCostsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `LandedCostsCollectionResponse|error`

**Sample code:**

```ballerina
LandedCostsCollectionResponse response = check client->listLandedCosts(dollarTop = 10);
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#LandedCosts",
  "value": [
    {
      "DocEntry": 1,
      "LandedCostNumber": 1,
      "PostingDate": "2026-07-01",
      "VendorCode": "V10000",
      "VendorName": "Acme Associates",
      "ClosedDocument": "lcOpen",
      "DocumentCurrency": "USD"
    }
  ],
  "odata.nextLink": "LandedCosts?$skip=20"
}
```

</details>

<details>
<summary>createLandedCosts</summary>

Creates a new LandedCost entity in SAP Business One and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LandedCost</code> | Yes | Request payload representing the landed cost to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `LandedCost|error`

**Sample code:**

```ballerina
LandedCost created = check client->createLandedCosts({VendorCode: "V10000", PostingDate: "2026-07-01"});
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "LandedCostNumber": 5,
  "PostingDate": "2026-07-01",
  "VendorCode": "V10000",
  "VendorName": "Acme Associates",
  "ClosedDocument": "lcOpen",
  "DocumentCurrency": "USD"
}
```

</details>

<details>
<summary>getLandedCosts</summary>

Retrieves a single LandedCost entity by its `DocEntry` key, with optional `$expand` and `$select` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLandedCostsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `LandedCost|error`

**Sample code:**

```ballerina
LandedCost landedCost = check client->getLandedCosts(5);
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "LandedCostNumber": 5,
  "PostingDate": "2026-07-01",
  "VendorCode": "V10000",
  "VendorName": "Acme Associates",
  "ClosedDocument": "lcOpen",
  "DocumentCurrency": "USD"
}
```

</details>

<details>
<summary>deleteLandedCosts</summary>

Deletes a LandedCost entity identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLandedCosts(5);
```

</details>

<details>
<summary>updateLandedCosts</summary>

Partially updates a LandedCost entity (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>LandedCost</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLandedCosts(5, {Remarks: "Updated remarks"});
```

</details>

<details>
<summary>landedCostsCancelLandedCost</summary>

Invokes the bound action 'CancelLandedCost' on a LandedCost entity identified by its `DocEntry` key to cancel the landed cost document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->landedCostsCancelLandedCost(5);
```

</details>

<details>
<summary>landedCostsCloseLandedCost</summary>

Invokes the bound action 'CloseLandedCost' on a LandedCost entity identified by its `DocEntry` key to close the landed cost document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->landedCostsCloseLandedCost(5);
```

</details>

<details>
<summary>landedCostsServiceGetLandedCostList</summary>

Retrieves the landed cost list via the `LandedCostsService_GetLandedCostList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 result = check client->landedCostsServiceGetLandedCostList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.LandedCostParams)",
  "value": [
    {
      "DocEntry": 1
    },
    {
      "DocEntry": 2
    }
  ]
}
```

</details>

#### PurchaseOrders

<details>
<summary>listPurchaseOrders</summary>

Queries the PurchaseOrders collection and returns a page of purchase order documents, with optional OData query parameters for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseOrdersHeaders</code> | No | Headers to be sent with the request, e.g. the `Prefer` header for Service Layer paging control |
| `queries` | <code>ListPurchaseOrdersQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `PurchaseOrdersCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseOrdersCollectionResponse response = check client->listPurchaseOrders(dollarTop = 10);
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#PurchaseOrders",
  "value": [
    {
      "DocEntry": 11,
      "DocNum": 11,
      "DocDate": "2026-07-01",
      "DocDueDate": "2026-07-31",
      "CardCode": "V10000",
      "CardName": "Acme Associates",
      "DocTotal": 1500.0,
      "DocCurrency": "USD"
    }
  ],
  "odata.nextLink": "PurchaseOrders?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseOrders</summary>

Creates a new purchase order Document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload representing the purchase order document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document created = check client->createPurchaseOrders({CardCode: "V10000", DocDueDate: "2026-07-31"});
```

**Sample response:**

```json
{
  "DocEntry": 11,
  "DocNum": 11,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 1500.0,
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>getPurchaseOrders</summary>

Retrieves a single purchase order Document by its `DocEntry` key, with optional `$expand` and `$select` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseOrdersQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document purchaseOrder = check client->getPurchaseOrders(11);
```

**Sample response:**

```json
{
  "DocEntry": 11,
  "DocNum": 11,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 1500.0,
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>deletePurchaseOrders</summary>

Deletes a purchase order Document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseOrders(11);
```

</details>

<details>
<summary>updatePurchaseOrders</summary>

Partially updates a purchase order Document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseOrders(11, {Comments: "Updated comments"});
```

</details>

<details>
<summary>purchaseOrdersCancel</summary>

Invokes the bound action 'Cancel' on a purchase order Document identified by its `DocEntry` key to cancel the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersCancel(11);
```

</details>

<details>
<summary>purchaseOrdersClose</summary>

Invokes the bound action 'Close' on a purchase order Document identified by its `DocEntry` key to close the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersClose(11);
```

</details>

<details>
<summary>purchaseOrdersCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a purchase order identified by its `DocEntry` key and returns the resulting cancellation Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document cancellationDoc = check client->purchaseOrdersCreateCancellationDocument(11);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "DocDate": "2026-07-02",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 1500.0
}
```

</details>

<details>
<summary>purchaseOrdersReopen</summary>

Invokes the bound action 'Reopen' on a purchase order Document identified by its `DocEntry` key to reopen the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersReopen(11);
```

</details>

<details>
<summary>purchaseOrdersServiceApproveAndAdd</summary>

Approves and adds a purchase order via the `PurchaseOrdersService_ApproveAndAdd` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseOrdersService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the purchase order document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersServiceApproveAndAdd({document: {CardCode: "V10000", DocDueDate: "2026-07-31"}});
```

</details>

<details>
<summary>purchaseOrdersServiceApproveAndUpdate</summary>

Approves and updates a purchase order via the `PurchaseOrdersService_ApproveAndUpdate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseOrdersService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the purchase order document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersServiceApproveAndUpdate({document: {DocEntry: 11, Comments: "Approved"}});
```

</details>

<details>
<summary>purchaseOrdersServiceCloseByDate</summary>

Closes purchase orders by date via the `PurchaseOrdersService_CloseByDate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseOrdersService_CloseByDate_body</code> | Yes | Request payload wrapping the document close parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersServiceCloseByDate({documentCloseParams: {docEntry: 11, specifiedClosingDate: "2026-07-31"}});
```

</details>

<details>
<summary>purchaseOrdersServiceExportEWayBill</summary>

Exports an e-way bill for a purchase order via the `PurchaseOrdersService_ExportEWayBill` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseOrdersService_ExportEWayBill_body</code> | Yes | Request payload wrapping the purchase order document |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersServiceExportEWayBill({document: {DocEntry: 11}});
```

</details>

<details>
<summary>purchaseOrdersServiceGetApprovalTemplates</summary>

Gets the approval templates for a purchase order via the `PurchaseOrdersService_GetApprovalTemplates` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseOrdersService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the purchase order document to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseOrdersServiceGetApprovalTemplates({document: {CardCode: "V10000"}});
```

**Sample response:**

```json
{
  "DocEntry": 11,
  "DocNum": 11,
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 1500.0
}
```

</details>

<details>
<summary>purchaseOrdersServiceHandleApprovalRequest</summary>

Handles an approval request for purchase orders via the `PurchaseOrdersService_HandleApprovalRequest` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseOrdersServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseOrdersServiceInitData</summary>

Initializes purchase order data via the `PurchaseOrdersService_InitData` service operation and returns the initialized Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document initData = check client->purchaseOrdersServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-07-14",
  "DocDueDate": "2026-07-14",
  "DocCurrency": "USD",
  "DocRate": 1.0
}
```

</details>

#### PurchaseQuotations

<details>
<summary>listPurchaseQuotations</summary>

Queries the PurchaseQuotations collection and returns a page of purchase quotation documents, with optional OData query parameters for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseQuotationsHeaders</code> | No | Headers to be sent with the request, e.g. the `Prefer` header for Service Layer paging control |
| `queries` | <code>ListPurchaseQuotationsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `PurchaseQuotationsCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseQuotationsCollectionResponse response = check client->listPurchaseQuotations(dollarTop = 10);
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#PurchaseQuotations",
  "value": [
    {
      "DocEntry": 7,
      "DocNum": 7,
      "DocDate": "2026-07-01",
      "DocDueDate": "2026-07-31",
      "CardCode": "V10000",
      "CardName": "Acme Associates",
      "DocTotal": 850.0,
      "DocCurrency": "USD"
    }
  ],
  "odata.nextLink": "PurchaseQuotations?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseQuotations</summary>

Creates a new purchase quotation Document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload representing the purchase quotation document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document created = check client->createPurchaseQuotations({CardCode: "V10000", DocDueDate: "2026-07-31"});
```

**Sample response:**

```json
{
  "DocEntry": 7,
  "DocNum": 7,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 850.0,
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>getPurchaseQuotations</summary>

Retrieves a single purchase quotation Document by its `DocEntry` key, with optional `$expand` and `$select` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseQuotationsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document quotation = check client->getPurchaseQuotations(7);
```

**Sample response:**

```json
{
  "DocEntry": 7,
  "DocNum": 7,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 850.0,
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>deletePurchaseQuotations</summary>

Deletes a purchase quotation Document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseQuotations(7);
```

</details>

<details>
<summary>updatePurchaseQuotations</summary>

Partially updates a purchase quotation Document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseQuotations(7, {Comments: "Updated comments"});
```

</details>

<details>
<summary>purchaseQuotationsCancel</summary>

Invokes the bound action 'Cancel' on a purchase quotation Document identified by its `DocEntry` key to cancel the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsCancel(7);
```

</details>

<details>
<summary>purchaseQuotationsClose</summary>

Invokes the bound action 'Close' on a purchase quotation Document identified by its `DocEntry` key to close the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsClose(7);
```

</details>

<details>
<summary>purchaseQuotationsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a purchase quotation identified by its `DocEntry` key and returns the resulting cancellation Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document cancellationDoc = check client->purchaseQuotationsCreateCancellationDocument(7);
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "DocDate": "2026-07-02",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 850.0
}
```

</details>

<details>
<summary>purchaseQuotationsReopen</summary>

Invokes the bound action 'Reopen' on a purchase quotation Document identified by its `DocEntry` key to reopen the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsReopen(7);
```

</details>

<details>
<summary>purchaseQuotationsServiceApproveAndAdd</summary>

Approves and adds a purchase quotation via the `PurchaseQuotationsService_ApproveAndAdd` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseQuotationsService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the purchase quotation document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsServiceApproveAndAdd({document: {CardCode: "V10000", DocDueDate: "2026-07-31"}});
```

</details>

<details>
<summary>purchaseQuotationsServiceApproveAndUpdate</summary>

Approves and updates a purchase quotation via the `PurchaseQuotationsService_ApproveAndUpdate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseQuotationsService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the purchase quotation document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsServiceApproveAndUpdate({document: {DocEntry: 7, Comments: "Approved"}});
```

</details>

<details>
<summary>purchaseQuotationsServiceCloseByDate</summary>

Closes purchase quotations by date via the `PurchaseQuotationsService_CloseByDate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseQuotationsService_CloseByDate_body</code> | Yes | Request payload wrapping the document close parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsServiceCloseByDate({documentCloseParams: {docEntry: 7, specifiedClosingDate: "2026-07-31"}});
```

</details>

<details>
<summary>purchaseQuotationsServiceExportEWayBill</summary>

Exports an e-way bill for a purchase quotation via the `PurchaseQuotationsService_ExportEWayBill` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseQuotationsService_ExportEWayBill_body</code> | Yes | Request payload wrapping the purchase quotation document |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsServiceExportEWayBill({document: {DocEntry: 7}});
```

</details>

<details>
<summary>purchaseQuotationsServiceGetApprovalTemplates</summary>

Gets the approval templates for a purchase quotation via the `PurchaseQuotationsService_GetApprovalTemplates` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseQuotationsService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the purchase quotation document to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseQuotationsServiceGetApprovalTemplates({document: {CardCode: "V10000"}});
```

**Sample response:**

```json
{
  "DocEntry": 7,
  "DocNum": 7,
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 850.0
}
```

</details>

<details>
<summary>purchaseQuotationsServiceHandleApprovalRequest</summary>

Handles an approval request for purchase quotations via the `PurchaseQuotationsService_HandleApprovalRequest` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseQuotationsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseQuotationsServiceInitData</summary>

Initializes purchase quotation data via the `PurchaseQuotationsService_InitData` service operation and returns the initialized Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document initData = check client->purchaseQuotationsServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-07-14",
  "DocDueDate": "2026-07-14",
  "DocCurrency": "USD",
  "DocRate": 1.0
}
```

</details>

#### PurchaseReturns

<details>
<summary>listPurchaseReturns</summary>

Queries the PurchaseReturns collection and returns a page of purchase return documents, with optional OData query parameters for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseReturnsHeaders</code> | No | Headers to be sent with the request, e.g. the `Prefer` header for Service Layer paging control |
| `queries` | <code>ListPurchaseReturnsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `PurchaseReturnsCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseReturnsCollectionResponse response = check client->listPurchaseReturns(dollarTop = 10);
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#PurchaseReturns",
  "value": [
    {
      "DocEntry": 3,
      "DocNum": 3,
      "DocDate": "2026-07-01",
      "DocDueDate": "2026-07-31",
      "CardCode": "V10000",
      "CardName": "Acme Associates",
      "DocTotal": 320.0,
      "DocCurrency": "USD"
    }
  ],
  "odata.nextLink": "PurchaseReturns?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseReturns</summary>

Creates a new purchase return Document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload representing the purchase return document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document created = check client->createPurchaseReturns({CardCode: "V10000", DocDueDate: "2026-07-31"});
```

**Sample response:**

```json
{
  "DocEntry": 3,
  "DocNum": 3,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 320.0,
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>getPurchaseReturns</summary>

Retrieves a single purchase return Document by its `DocEntry` key, with optional `$expand` and `$select` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseReturnsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document purchaseReturn = check client->getPurchaseReturns(3);
```

**Sample response:**

```json
{
  "DocEntry": 3,
  "DocNum": 3,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 320.0,
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>deletePurchaseReturns</summary>

Deletes a purchase return Document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseReturns(3);
```

</details>

<details>
<summary>updatePurchaseReturns</summary>

Partially updates a purchase return Document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseReturns(3, {Comments: "Updated comments"});
```

</details>

<details>
<summary>purchaseReturnsCancel</summary>

Invokes the bound action 'Cancel' on a purchase return Document identified by its `DocEntry` key to cancel the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsCancel(3);
```

</details>

<details>
<summary>purchaseReturnsClose</summary>

Invokes the bound action 'Close' on a purchase return Document identified by its `DocEntry` key to close the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsClose(3);
```

</details>

<details>
<summary>purchaseReturnsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a purchase return identified by its `DocEntry` key and returns the resulting cancellation Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document cancellationDoc = check client->purchaseReturnsCreateCancellationDocument(3);
```

**Sample response:**

```json
{
  "DocEntry": 4,
  "DocNum": 4,
  "DocDate": "2026-07-02",
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 320.0
}
```

</details>

<details>
<summary>purchaseReturnsReopen</summary>

Invokes the bound action 'Reopen' on a purchase return Document identified by its `DocEntry` key to reopen the document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsReopen(3);
```

</details>

<details>
<summary>purchaseReturnsServiceApproveAndAdd</summary>

Approves and adds a purchase return via the `PurchaseReturnsService_ApproveAndAdd` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseReturnsService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the purchase return document to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsServiceApproveAndAdd({document: {CardCode: "V10000", DocDueDate: "2026-07-31"}});
```

</details>

<details>
<summary>purchaseReturnsServiceApproveAndUpdate</summary>

Approves and updates a purchase return via the `PurchaseReturnsService_ApproveAndUpdate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseReturnsService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the purchase return document to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsServiceApproveAndUpdate({document: {DocEntry: 3, Comments: "Approved"}});
```

</details>

<details>
<summary>purchaseReturnsServiceCancel2</summary>

Cancels a purchase return via the `PurchaseReturnsService_Cancel2` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseReturnsService_Cancel2_body</code> | Yes | Request payload wrapping the purchase return document to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsServiceCancel2({document: {DocEntry: 3}});
```

</details>

<details>
<summary>purchaseReturnsServiceCloseByDate</summary>

Closes purchase returns by date via the `PurchaseReturnsService_CloseByDate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseReturnsService_CloseByDate_body</code> | Yes | Request payload wrapping the document close parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsServiceCloseByDate({documentCloseParams: {docEntry: 3, specifiedClosingDate: "2026-07-31"}});
```

</details>

<details>
<summary>purchaseReturnsServiceExportEWayBill</summary>

Exports an e-way bill for a purchase return via the `PurchaseReturnsService_ExportEWayBill` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseReturnsService_ExportEWayBill_body</code> | Yes | Request payload wrapping the purchase return document |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsServiceExportEWayBill({document: {DocEntry: 3}});
```

</details>

<details>
<summary>purchaseReturnsServiceGetApprovalTemplates</summary>

Gets the approval templates for a purchase return via the `PurchaseReturnsService_GetApprovalTemplates` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseReturnsService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the purchase return document to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseReturnsServiceGetApprovalTemplates({document: {CardCode: "V10000"}});
```

**Sample response:**

```json
{
  "DocEntry": 3,
  "DocNum": 3,
  "CardCode": "V10000",
  "CardName": "Acme Associates",
  "DocTotal": 320.0
}
```

</details>

<details>
<summary>purchaseReturnsServiceHandleApprovalRequest</summary>

Handles an approval request for purchase returns via the `PurchaseReturnsService_HandleApprovalRequest` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseReturnsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseReturnsServiceInitData</summary>

Initializes purchase return data via the `PurchaseReturnsService_InitData` service operation and returns the initialized Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document initData = check client->purchaseReturnsServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-07-14",
  "DocDueDate": "2026-07-14",
  "DocCurrency": "USD",
  "DocRate": 1.0
}
```

</details>

#### PurchaseTaxInvoices

<details>
<summary>listPurchaseTaxInvoices</summary>

Queries the PurchaseTaxInvoices collection and returns a page of purchase tax invoice entities, with optional OData query parameters for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseTaxInvoicesHeaders</code> | No | Headers to be sent with the request, e.g. the `Prefer` header for Service Layer paging control |
| `queries` | <code>ListPurchaseTaxInvoicesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `PurchaseTaxInvoicesCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseTaxInvoicesCollectionResponse response = check client->listPurchaseTaxInvoices(dollarTop = 10);
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#PurchaseTaxInvoices",
  "value": [
    {
      "DocEntry": 2,
      "DocNum": 2,
      "DocDate": "2026-07-01",
      "DocDueDate": "2026-07-31",
      "CardCode": "V10000",
      "TaxDate": "2026-07-01",
      "Comments": "Q3 tax invoice"
    }
  ],
  "odata.nextLink": "PurchaseTaxInvoices?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseTaxInvoices</summary>

Creates a new PurchaseTaxInvoice entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseTaxInvoice</code> | Yes | Request payload representing the purchase tax invoice to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PurchaseTaxInvoice|error`

**Sample code:**

```ballerina
PurchaseTaxInvoice created = check client->createPurchaseTaxInvoices({CardCode: "V10000", DocDate: "2026-07-01"});
```

**Sample response:**

```json
{
  "DocEntry": 2,
  "DocNum": 2,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "TaxDate": "2026-07-01",
  "Comments": "Q3 tax invoice"
}
```

</details>

<details>
<summary>getPurchaseTaxInvoices</summary>

Retrieves a single PurchaseTaxInvoice entity by its `DocEntry` key, with optional `$expand` and `$select` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseTaxInvoicesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `PurchaseTaxInvoice|error`

**Sample code:**

```ballerina
PurchaseTaxInvoice taxInvoice = check client->getPurchaseTaxInvoices(2);
```

**Sample response:**

```json
{
  "DocEntry": 2,
  "DocNum": 2,
  "DocDate": "2026-07-01",
  "DocDueDate": "2026-07-31",
  "CardCode": "V10000",
  "TaxDate": "2026-07-01",
  "Comments": "Q3 tax invoice"
}
```

</details>

<details>
<summary>deletePurchaseTaxInvoices</summary>

Deletes a PurchaseTaxInvoice entity identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseTaxInvoices(2);
```

</details>

<details>
<summary>updatePurchaseTaxInvoices</summary>

Partially updates a PurchaseTaxInvoice entity (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>PurchaseTaxInvoice</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseTaxInvoices(2, {Comments: "Updated comments"});
```

</details>
#### PurchaseCreditNotes

<details>
<summary>listPurchaseCreditNotes</summary>

Retrieves a paged collection of `PurchaseCreditNotes` entities from the SAP Business One Service Layer, supporting OData query options for filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseCreditNotesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPurchaseCreditNotesQueries</code> | No | Query parameters ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) to be sent with the request |

**Returns:** `PurchaseCreditNotesCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseCreditNotesCollectionResponse result = check client->listPurchaseCreditNotes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#PurchaseCreditNotes",
  "value": [
    {
      "DocEntry": 181,
      "DocNum": 181,
      "CardCode": "V10000",
      "CardName": "Example Vendor",
      "DocDate": "2026-07-01",
      "DocTotal": 1250.00
    }
  ],
  "odata.nextLink": "PurchaseCreditNotes?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseCreditNotes</summary>

Creates a new `PurchaseCreditNotes` document in SAP Business One from the given payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createPurchaseCreditNotes(payload);
```

**Sample response:**

```json
{
  "DocEntry": 181,
  "DocNum": 181,
  "CardCode": "V10000",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-01",
  "DocTotal": 1250.00
}
```

</details>

<details>
<summary>getPurchaseCreditNotes</summary>

Retrieves a single `PurchaseCreditNotes` document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseCreditNotesQueries</code> | No | Query parameters ($expand, $select) to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getPurchaseCreditNotes(181);
```

**Sample response:**

```json
{
  "DocEntry": 181,
  "DocNum": 181,
  "CardCode": "V10000",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-01",
  "DocTotal": 1250.00
}
```

</details>

<details>
<summary>deletePurchaseCreditNotes</summary>

Deletes the `PurchaseCreditNotes` document identified by the given `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseCreditNotes(181);
```

</details>

<details>
<summary>updatePurchaseCreditNotes</summary>

Partially updates the `PurchaseCreditNotes` document identified by `DocEntry` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseCreditNotes(181, payload);
```

</details>

<details>
<summary>purchaseCreditNotesCancel</summary>

Invokes the bound `Cancel` action on the `PurchaseCreditNotes` document, cancelling the posted document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesCancel(181);
```

</details>

<details>
<summary>purchaseCreditNotesClose</summary>

Invokes the bound `Close` action on the `PurchaseCreditNotes` document, closing the open document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesClose(181);
```

</details>

<details>
<summary>purchaseCreditNotesCreateCancellationDocument</summary>

Invokes the bound `CreateCancellationDocument` action, generating a cancellation document for the given `PurchaseCreditNotes` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseCreditNotesCreateCancellationDocument(181);
```

**Sample response:**

```json
{
  "DocEntry": 205,
  "DocNum": 205,
  "CardCode": "V10000",
  "DocDate": "2026-07-10",
  "DocTotal": 1250.00
}
```

</details>

<details>
<summary>purchaseCreditNotesReopen</summary>

Invokes the bound `Reopen` action, reopening a previously closed `PurchaseCreditNotes` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesReopen(181);
```

</details>

<details>
<summary>purchaseCreditNotesServiceApproveAndAdd</summary>

Approves a pending `PurchaseCreditNotes` document and adds it, completing an approval workflow that creates the underlying document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseCreditNotesService_ApproveAndAdd_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>purchaseCreditNotesServiceApproveAndUpdate</summary>

Approves a pending change and updates the existing `PurchaseCreditNotes` document as part of the approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseCreditNotesService_ApproveAndUpdate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>purchaseCreditNotesServiceCancel2</summary>

Cancels a posted `PurchaseCreditNotes` document via the alternate `Cancel2` service action using the supplied document payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseCreditNotesService_Cancel2_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesServiceCancel2(payload);
```

</details>

<details>
<summary>purchaseCreditNotesServiceCloseByDate</summary>

Closes one or more `PurchaseCreditNotes` documents as of a specified closing date via `DocumentCloseParams`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseCreditNotesService_CloseByDate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesServiceCloseByDate(payload);
```

</details>

<details>
<summary>purchaseCreditNotesServiceExportEWayBill</summary>

Exports the E-Way Bill details for the given `PurchaseCreditNotes` document (India localization).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseCreditNotesService_ExportEWayBill_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesServiceExportEWayBill(payload);
```

</details>

<details>
<summary>purchaseCreditNotesServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to the given `PurchaseCreditNotes` document payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseCreditNotesService_GetApprovalTemplates_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseCreditNotesServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 181,
  "DocNum": 181,
  "CardCode": "V10000",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>purchaseCreditNotesServiceHandleApprovalRequest</summary>

Handles an incoming approval request notification for the `PurchaseCreditNotes` approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseCreditNotesServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseCreditNotesServiceInitData</summary>

Initializes and returns default data used when creating a new `PurchaseCreditNotes` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseCreditNotesServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocDate": "2026-07-10",
  "CardCode": "",
  "DocCurrency": "USD"
}
```

</details>

#### PurchaseDeliveryNotes

<details>
<summary>listPurchaseDeliveryNotes</summary>

Retrieves a paged collection of `PurchaseDeliveryNotes` entities from the SAP Business One Service Layer, supporting OData query options for filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPurchaseDeliveryNotesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPurchaseDeliveryNotesQueries</code> | No | Query parameters ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) to be sent with the request |

**Returns:** `PurchaseDeliveryNotesCollectionResponse|error`

**Sample code:**

```ballerina
PurchaseDeliveryNotesCollectionResponse result = check client->listPurchaseDeliveryNotes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#PurchaseDeliveryNotes",
  "value": [
    {
      "DocEntry": 302,
      "DocNum": 302,
      "CardCode": "V20000",
      "CardName": "Example Supplier",
      "DocDate": "2026-07-05",
      "DocTotal": 4300.50
    }
  ],
  "odata.nextLink": "PurchaseDeliveryNotes?$skip=20"
}
```

</details>

<details>
<summary>createPurchaseDeliveryNotes</summary>

Creates a new `PurchaseDeliveryNotes` document in SAP Business One from the given payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createPurchaseDeliveryNotes(payload);
```

**Sample response:**

```json
{
  "DocEntry": 302,
  "DocNum": 302,
  "CardCode": "V20000",
  "CardName": "Example Supplier",
  "DocDate": "2026-07-05",
  "DocTotal": 4300.50
}
```

</details>

<details>
<summary>getPurchaseDeliveryNotes</summary>

Retrieves a single `PurchaseDeliveryNotes` document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPurchaseDeliveryNotesQueries</code> | No | Query parameters ($expand, $select) to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getPurchaseDeliveryNotes(302);
```

**Sample response:**

```json
{
  "DocEntry": 302,
  "DocNum": 302,
  "CardCode": "V20000",
  "CardName": "Example Supplier",
  "DocDate": "2026-07-05",
  "DocTotal": 4300.50
}
```

</details>

<details>
<summary>deletePurchaseDeliveryNotes</summary>

Deletes the `PurchaseDeliveryNotes` document identified by the given `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePurchaseDeliveryNotes(302);
```

</details>

<details>
<summary>updatePurchaseDeliveryNotes</summary>

Partially updates the `PurchaseDeliveryNotes` document identified by `DocEntry` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePurchaseDeliveryNotes(302, payload);
```

</details>

<details>
<summary>purchaseDeliveryNotesCancel</summary>

Invokes the bound `Cancel` action on the `PurchaseDeliveryNotes` document, cancelling the posted document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesCancel(302);
```

</details>

<details>
<summary>purchaseDeliveryNotesClose</summary>

Invokes the bound `Close` action on the `PurchaseDeliveryNotes` document, closing the open document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesClose(302);
```

</details>

<details>
<summary>purchaseDeliveryNotesCreateCancellationDocument</summary>

Invokes the bound `CreateCancellationDocument` action, generating a cancellation document for the given `PurchaseDeliveryNotes` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseDeliveryNotesCreateCancellationDocument(302);
```

**Sample response:**

```json
{
  "DocEntry": 340,
  "DocNum": 340,
  "CardCode": "V20000",
  "DocDate": "2026-07-10",
  "DocTotal": 4300.50
}
```

</details>

<details>
<summary>purchaseDeliveryNotesReopen</summary>

Invokes the bound `Reopen` action, reopening a previously closed `PurchaseDeliveryNotes` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesReopen(302);
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceApproveAndAdd</summary>

Approves a pending `PurchaseDeliveryNotes` document and adds it, completing an approval workflow that creates the underlying document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDeliveryNotesService_ApproveAndAdd_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceApproveAndUpdate</summary>

Approves a pending change and updates the existing `PurchaseDeliveryNotes` document as part of the approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDeliveryNotesService_ApproveAndUpdate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceCancel2</summary>

Cancels a posted `PurchaseDeliveryNotes` document via the alternate `Cancel2` service action using the supplied document payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDeliveryNotesService_Cancel2_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesServiceCancel2(payload);
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceCloseByDate</summary>

Closes one or more `PurchaseDeliveryNotes` documents as of a specified closing date via `DocumentCloseParams`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDeliveryNotesService_CloseByDate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesServiceCloseByDate(payload);
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceExportEWayBill</summary>

Exports the E-Way Bill details for the given `PurchaseDeliveryNotes` document (India localization).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDeliveryNotesService_ExportEWayBill_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesServiceExportEWayBill(payload);
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to the given `PurchaseDeliveryNotes` document payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PurchaseDeliveryNotesService_GetApprovalTemplates_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseDeliveryNotesServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 302,
  "DocNum": 302,
  "CardCode": "V20000",
  "DocDate": "2026-07-05"
}
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceHandleApprovalRequest</summary>

Handles an incoming approval request notification for the `PurchaseDeliveryNotes` approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->purchaseDeliveryNotesServiceHandleApprovalRequest();
```

</details>

<details>
<summary>purchaseDeliveryNotesServiceInitData</summary>

Initializes and returns default data used when creating a new `PurchaseDeliveryNotes` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->purchaseDeliveryNotesServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocDate": "2026-07-10",
  "CardCode": "",
  "DocCurrency": "USD"
}
```

</details>

#### GoodsReturnRequest

<details>
<summary>listGoodsReturnRequest</summary>

Retrieves a paged collection of `GoodsReturnRequest` entities from the SAP Business One Service Layer, supporting OData query options for filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListGoodsReturnRequestHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListGoodsReturnRequestQueries</code> | No | Query parameters ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) to be sent with the request |

**Returns:** `GoodsReturnRequestCollectionResponse|error`

**Sample code:**

```ballerina
GoodsReturnRequestCollectionResponse result = check client->listGoodsReturnRequest();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#GoodsReturnRequest",
  "value": [
    {
      "DocEntry": 55,
      "DocNum": 55,
      "CardCode": "V30000",
      "CardName": "Example Vendor",
      "DocDate": "2026-07-02",
      "DocTotal": 620.00
    }
  ],
  "odata.nextLink": "GoodsReturnRequest?$skip=20"
}
```

</details>

<details>
<summary>createGoodsReturnRequest</summary>

Creates a new `GoodsReturnRequest` document in SAP Business One from the given payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createGoodsReturnRequest(payload);
```

**Sample response:**

```json
{
  "DocEntry": 55,
  "DocNum": 55,
  "CardCode": "V30000",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-02",
  "DocTotal": 620.00
}
```

</details>

<details>
<summary>getGoodsReturnRequest</summary>

Retrieves a single `GoodsReturnRequest` document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetGoodsReturnRequestQueries</code> | No | Query parameters ($expand, $select) to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getGoodsReturnRequest(55);
```

**Sample response:**

```json
{
  "DocEntry": 55,
  "DocNum": 55,
  "CardCode": "V30000",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-02",
  "DocTotal": 620.00
}
```

</details>

<details>
<summary>deleteGoodsReturnRequest</summary>

Deletes the `GoodsReturnRequest` document identified by the given `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteGoodsReturnRequest(55);
```

</details>

<details>
<summary>updateGoodsReturnRequest</summary>

Partially updates the `GoodsReturnRequest` document identified by `DocEntry` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateGoodsReturnRequest(55, payload);
```

</details>

<details>
<summary>goodsReturnRequestCancel</summary>

Invokes the bound `Cancel` action on the `GoodsReturnRequest` document, cancelling the posted document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestCancel(55);
```

</details>

<details>
<summary>goodsReturnRequestClose</summary>

Invokes the bound `Close` action on the `GoodsReturnRequest` document, closing the open document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestClose(55);
```

</details>

<details>
<summary>goodsReturnRequestCreateCancellationDocument</summary>

Invokes the bound `CreateCancellationDocument` action, generating a cancellation document for the given `GoodsReturnRequest` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->goodsReturnRequestCreateCancellationDocument(55);
```

**Sample response:**

```json
{
  "DocEntry": 61,
  "DocNum": 61,
  "CardCode": "V30000",
  "DocDate": "2026-07-10",
  "DocTotal": 620.00
}
```

</details>

<details>
<summary>goodsReturnRequestReopen</summary>

Invokes the bound `Reopen` action, reopening a previously closed `GoodsReturnRequest` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestReopen(55);
```

</details>

<details>
<summary>goodsReturnRequestServiceApproveAndAdd</summary>

Approves a pending `GoodsReturnRequest` document and adds it, completing an approval workflow that creates the underlying document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GoodsReturnRequestService_ApproveAndAdd_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>goodsReturnRequestServiceApproveAndUpdate</summary>

Approves a pending change and updates the existing `GoodsReturnRequest` document as part of the approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GoodsReturnRequestService_ApproveAndUpdate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>goodsReturnRequestServiceCloseByDate</summary>

Closes one or more `GoodsReturnRequest` documents as of a specified closing date via `DocumentCloseParams`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GoodsReturnRequestService_CloseByDate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestServiceCloseByDate(payload);
```

</details>

<details>
<summary>goodsReturnRequestServiceExportEWayBill</summary>

Exports the E-Way Bill details for the given `GoodsReturnRequest` document (India localization).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GoodsReturnRequestService_ExportEWayBill_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestServiceExportEWayBill(payload);
```

</details>

<details>
<summary>goodsReturnRequestServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to the given `GoodsReturnRequest` document payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GoodsReturnRequestService_GetApprovalTemplates_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->goodsReturnRequestServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 55,
  "DocNum": 55,
  "CardCode": "V30000",
  "DocDate": "2026-07-02"
}
```

</details>

<details>
<summary>goodsReturnRequestServiceHandleApprovalRequest</summary>

Handles an incoming approval request notification for the `GoodsReturnRequest` approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->goodsReturnRequestServiceHandleApprovalRequest();
```

</details>

<details>
<summary>goodsReturnRequestServiceInitData</summary>

Initializes and returns default data used when creating a new `GoodsReturnRequest` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->goodsReturnRequestServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocDate": "2026-07-10",
  "CardCode": "",
  "DocCurrency": "USD"
}
```

</details>

#### CorrectionPurchaseInvoice

<details>
<summary>listCorrectionPurchaseInvoice</summary>

Retrieves a paged collection of `CorrectionPurchaseInvoice` entities from the SAP Business One Service Layer, supporting OData query options for filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCorrectionPurchaseInvoiceHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCorrectionPurchaseInvoiceQueries</code> | No | Query parameters ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) to be sent with the request |

**Returns:** `CorrectionPurchaseInvoiceCollectionResponse|error`

**Sample code:**

```ballerina
CorrectionPurchaseInvoiceCollectionResponse result = check client->listCorrectionPurchaseInvoice();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CorrectionPurchaseInvoice",
  "value": [
    {
      "DocEntry": 12,
      "DocNum": 12,
      "CardCode": "V40000",
      "CardName": "Example Vendor",
      "DocDate": "2026-07-03",
      "DocTotal": 980.25
    }
  ],
  "odata.nextLink": "CorrectionPurchaseInvoice?$skip=20"
}
```

</details>

<details>
<summary>createCorrectionPurchaseInvoice</summary>

Creates a new `CorrectionPurchaseInvoice` document in SAP Business One from the given payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createCorrectionPurchaseInvoice(payload);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "CardCode": "V40000",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-03",
  "DocTotal": 980.25
}
```

</details>

<details>
<summary>getCorrectionPurchaseInvoice</summary>

Retrieves a single `CorrectionPurchaseInvoice` document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCorrectionPurchaseInvoiceQueries</code> | No | Query parameters ($expand, $select) to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getCorrectionPurchaseInvoice(12);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "CardCode": "V40000",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-03",
  "DocTotal": 980.25
}
```

</details>

<details>
<summary>deleteCorrectionPurchaseInvoice</summary>

Deletes the `CorrectionPurchaseInvoice` document identified by the given `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCorrectionPurchaseInvoice(12);
```

</details>

<details>
<summary>updateCorrectionPurchaseInvoice</summary>

Partially updates the `CorrectionPurchaseInvoice` document identified by `DocEntry` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCorrectionPurchaseInvoice(12, payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceCancel</summary>

Invokes the bound `Cancel` action on the `CorrectionPurchaseInvoice` document, cancelling the posted document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceCancel(12);
```

</details>

<details>
<summary>correctionPurchaseInvoiceClose</summary>

Invokes the bound `Close` action on the `CorrectionPurchaseInvoice` document, closing the open document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceClose(12);
```

</details>

<details>
<summary>correctionPurchaseInvoiceCreateCancellationDocument</summary>

Invokes the bound `CreateCancellationDocument` action, generating a cancellation document for the given `CorrectionPurchaseInvoice` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionPurchaseInvoiceCreateCancellationDocument(12);
```

**Sample response:**

```json
{
  "DocEntry": 18,
  "DocNum": 18,
  "CardCode": "V40000",
  "DocDate": "2026-07-10",
  "DocTotal": 980.25
}
```

</details>

<details>
<summary>correctionPurchaseInvoiceReopen</summary>

Invokes the bound `Reopen` action, reopening a previously closed `CorrectionPurchaseInvoice` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceReopen(12);
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceApproveAndAdd</summary>

Approves a pending `CorrectionPurchaseInvoice` document and adds it, completing an approval workflow that creates the underlying document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceService_ApproveAndAdd_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceApproveAndUpdate</summary>

Approves a pending change and updates the existing `CorrectionPurchaseInvoice` document as part of the approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceService_ApproveAndUpdate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceCloseByDate</summary>

Closes one or more `CorrectionPurchaseInvoice` documents as of a specified closing date via `DocumentCloseParams`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceService_CloseByDate_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceServiceCloseByDate(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceExportEWayBill</summary>

Exports the E-Way Bill details for the given `CorrectionPurchaseInvoice` document (India localization).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceService_ExportEWayBill_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceServiceExportEWayBill(payload);
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to the given `CorrectionPurchaseInvoice` document payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionPurchaseInvoiceService_GetApprovalTemplates_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionPurchaseInvoiceServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 12,
  "DocNum": 12,
  "CardCode": "V40000",
  "DocDate": "2026-07-03"
}
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceHandleApprovalRequest</summary>

Handles an incoming approval request notification for the `CorrectionPurchaseInvoice` approval workflow.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionPurchaseInvoiceServiceHandleApprovalRequest();
```

</details>

<details>
<summary>correctionPurchaseInvoiceServiceInitData</summary>

Initializes and returns default data used when creating a new `CorrectionPurchaseInvoice` document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionPurchaseInvoiceServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocDate": "2026-07-10",
  "CardCode": "",
  "DocCurrency": "USD"
}
```

</details>

#### LandedCostsCodes

<details>
<summary>listLandedCostsCodes</summary>

Retrieves a paged collection of `LandedCostsCodes` entities from the SAP Business One Service Layer, supporting OData query options for filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListLandedCostsCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLandedCostsCodesQueries</code> | No | Query parameters ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) to be sent with the request |

**Returns:** `LandedCostsCodesCollectionResponse|error`

**Sample code:**

```ballerina
LandedCostsCodesCollectionResponse result = check client->listLandedCostsCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#LandedCostsCodes",
  "value": [
    {
      "Code": "01",
      "Name": "Freight",
      "AllocationBy": "asCashValueBeforeCustoms",
      "LandedCostsAllocationAccount": "_SYS00000001234"
    }
  ],
  "odata.nextLink": "LandedCostsCodes?$skip=20"
}
```

</details>

<details>
<summary>createLandedCostsCodes</summary>

Creates a new `LandedCostsCode` in SAP Business One from the given payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LandedCostsCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `LandedCostsCode|error`

**Sample code:**

```ballerina
LandedCostsCode result = check client->createLandedCostsCodes(payload);
```

**Sample response:**

```json
{
  "Code": "01",
  "Name": "Freight",
  "AllocationBy": "asCashValueBeforeCustoms",
  "LandedCostsAllocationAccount": "_SYS00000001234"
}
```

</details>

<details>
<summary>getLandedCostsCodes</summary>

Retrieves a single `LandedCostsCode` identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLandedCostsCodesQueries</code> | No | Query parameters ($expand, $select) to be sent with the request |

**Returns:** `LandedCostsCode|error`

**Sample code:**

```ballerina
LandedCostsCode result = check client->getLandedCostsCodes("01");
```

**Sample response:**

```json
{
  "Code": "01",
  "Name": "Freight",
  "AllocationBy": "asCashValueBeforeCustoms",
  "LandedCostsAllocationAccount": "_SYS00000001234"
}
```

</details>

<details>
<summary>deleteLandedCostsCodes</summary>

Deletes the `LandedCostsCode` identified by the given `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLandedCostsCodes("01");
```

</details>

<details>
<summary>updateLandedCostsCodes</summary>

Partially updates the `LandedCostsCode` identified by `Code` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>LandedCostsCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLandedCostsCodes("01", payload);
```

</details>
