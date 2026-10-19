# Actions

The `ballerinax/sap.businessone.sales` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One sales (A/R) documents — quotations, orders & delivery notes, A/R invoices, credit notes & down payments, returns, return requests & correction invoices, blanket agreements & sales tax invoices, dunning terms & letters, sales persons & commission groups, and POS daily summaries — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the sales (A/R) documents exposed by the SAP Business One Service Layer — quotations, orders, delivery notes, invoices, credit notes, down payments, drafts, returns, return requests, correction invoices and their reversals, blanket agreements, sales tax invoices, dunning terms and letters, sales persons, commission groups, and POS daily summaries.

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
import ballerinax/sap.businessone.sales;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

sales:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### CorrectionInvoiceReversal

<details>
<summary>listCorrectionInvoiceReversal</summary>

Queries the CorrectionInvoiceReversal collection and returns a page of correction invoice reversal documents, with optional OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCorrectionInvoiceReversalHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListCorrectionInvoiceReversalQueries</code> | No | OData query options such as `$filter`, `$top`, `$skip`, `$orderby`, `$select`, `$expand`, and `$inlinecount` |

**Returns:** `CorrectionInvoiceReversalCollectionResponse|error`

**Sample code:**

```ballerina
CorrectionInvoiceReversalCollectionResponse response = check client->listCorrectionInvoiceReversal();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CorrectionInvoiceReversal",
  "value": [
    {
      "DocEntry": 15,
      "DocNum": 15,
      "DocDate": "2026-05-01",
      "CardCode": "C20000",
      "CardName": "Maxi-Teq",
      "DocTotal": 1250.50,
      "DocCurrency": "EUR"
    }
  ],
  "odata.nextLink": "CorrectionInvoiceReversal?$skip=20"
}
```

</details>

<details>
<summary>createCorrectionInvoiceReversal</summary>

Creates a new correction invoice reversal document in the CorrectionInvoiceReversal collection and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The correction invoice reversal document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document created = check client->createCorrectionInvoiceReversal(payload);
```

**Sample response:**

```json
{
  "DocEntry": 16,
  "DocNum": 16,
  "DocDate": "2026-05-02",
  "CardCode": "C20000",
  "CardName": "Maxi-Teq",
  "DocTotal": 890.00,
  "DocCurrency": "EUR"
}
```

</details>

<details>
<summary>getCorrectionInvoiceReversal</summary>

Retrieves a single correction invoice reversal document by its `DocEntry` key, with optional `$select` and `$expand` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCorrectionInvoiceReversalQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document document = check client->getCorrectionInvoiceReversal(15);
```

**Sample response:**

```json
{
  "DocEntry": 15,
  "DocNum": 15,
  "DocDate": "2026-05-01",
  "CardCode": "C20000",
  "CardName": "Maxi-Teq",
  "DocTotal": 1250.50,
  "DocCurrency": "EUR",
  "Comments": "Reversal for correction invoice 12"
}
```

</details>

<details>
<summary>deleteCorrectionInvoiceReversal</summary>

Deletes the correction invoice reversal document identified by the given `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCorrectionInvoiceReversal(15);
```

</details>

<details>
<summary>updateCorrectionInvoiceReversal</summary>

Partially updates a correction invoice reversal document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The fields of the document to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCorrectionInvoiceReversal(15, {Comments: "Updated remarks"});
```

</details>

<details>
<summary>correctionInvoiceReversalCancel</summary>

Invokes the bound action 'Cancel' on a correction invoice reversal document (binding type Document) to cancel it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalCancel(15);
```

</details>

<details>
<summary>correctionInvoiceReversalClose</summary>

Invokes the bound action 'Close' on a correction invoice reversal document (binding type Document) to close it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalClose(15);
```

</details>

<details>
<summary>correctionInvoiceReversalCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a correction invoice reversal document (binding type Document) and returns the generated cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document cancellation = check client->correctionInvoiceReversalCreateCancellationDocument(15);
```

**Sample response:**

```json
{
  "DocEntry": 17,
  "DocNum": 17,
  "DocDate": "2026-05-03",
  "CardCode": "C20000",
  "DocTotal": -1250.50,
  "DocCurrency": "EUR"
}
```

</details>

<details>
<summary>correctionInvoiceReversalReopen</summary>

Invokes the bound action 'Reopen' on a correction invoice reversal document (binding type Document) to reopen a closed document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalReopen(15);
```

</details>

<details>
<summary>correctionInvoiceReversalServiceApproveAndAdd</summary>

Approves and adds a correction invoice reversal document via the `CorrectionInvoiceReversalService_ApproveAndAdd` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceReversalService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalServiceApproveAndAdd({document: {CardCode: "C20000"}});
```

</details>

<details>
<summary>correctionInvoiceReversalServiceApproveAndUpdate</summary>

Approves and updates a correction invoice reversal document via the `CorrectionInvoiceReversalService_ApproveAndUpdate` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceReversalService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalServiceApproveAndUpdate({document: {DocEntry: 15}});
```

</details>

<details>
<summary>correctionInvoiceReversalServiceCloseByDate</summary>

Closes correction invoice reversal documents by date via the `CorrectionInvoiceReversalService_CloseByDate` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceReversalService_CloseByDate_body</code> | Yes | Request payload wrapping `DocumentCloseParams` (document entry, specified closing date, and closing option) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalServiceCloseByDate({documentCloseParams: {docEntry: 15}});
```

</details>

<details>
<summary>correctionInvoiceReversalServiceExportEWayBill</summary>

Exports an e-way bill for a correction invoice reversal document via the `CorrectionInvoiceReversalService_ExportEWayBill` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceReversalService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` for which to export the e-way bill |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalServiceExportEWayBill({document: {DocEntry: 15}});
```

</details>

<details>
<summary>correctionInvoiceReversalServiceGetApprovalTemplates</summary>

Gets the approval templates applicable to a correction invoice reversal document via the `CorrectionInvoiceReversalService_GetApprovalTemplates` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceReversalService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to evaluate against approval templates |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionInvoiceReversalServiceGetApprovalTemplates({document: {CardCode: "C20000"}});
```

**Sample response:**

```json
{
  "DocEntry": 15,
  "DocumentApprovalRequests": [
    {
      "ApprovalTemplatesID": 1,
      "Remarks": "Requires manager approval"
    }
  ]
}
```

</details>

<details>
<summary>correctionInvoiceReversalServiceHandleApprovalRequest</summary>

Handles a pending approval request for the CorrectionInvoiceReversal service via the `CorrectionInvoiceReversalService_HandleApprovalRequest` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->correctionInvoiceReversalServiceHandleApprovalRequest();
```

</details>

<details>
<summary>correctionInvoiceReversalServiceInitData</summary>

Initializes and returns a correction invoice reversal document with default data via the `CorrectionInvoiceReversalService_InitData` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document initial = check client->correctionInvoiceReversalServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-05-01",
  "DocDueDate": "2026-05-31",
  "DocCurrency": "EUR",
  "Series": 4
}
```

</details>

#### DownPayments

<details>
<summary>listDownPayments</summary>

Queries the DownPayments collection and returns a page of down payment documents, with optional OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDownPaymentsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListDownPaymentsQueries</code> | No | OData query options such as `$filter`, `$top`, `$skip`, `$orderby`, `$select`, `$expand`, and `$inlinecount` |

**Returns:** `DownPaymentsCollectionResponse|error`

**Sample code:**

```ballerina
DownPaymentsCollectionResponse response = check client->listDownPayments();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#DownPayments",
  "value": [
    {
      "DocEntry": 42,
      "DocNum": 42,
      "DocDate": "2026-04-20",
      "CardCode": "C30000",
      "CardName": "Microchips",
      "DocTotal": 500.00,
      "DocCurrency": "EUR"
    }
  ],
  "odata.nextLink": "DownPayments?$skip=20"
}
```

</details>

<details>
<summary>createDownPayments</summary>

Creates a new down payment document in the DownPayments collection and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The down payment document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document created = check client->createDownPayments(payload);
```

**Sample response:**

```json
{
  "DocEntry": 43,
  "DocNum": 43,
  "DocDate": "2026-04-21",
  "CardCode": "C30000",
  "CardName": "Microchips",
  "DocTotal": 750.00,
  "DocCurrency": "EUR"
}
```

</details>

<details>
<summary>getDownPayments</summary>

Retrieves a single down payment document by its `DocEntry` key, with optional `$select` and `$expand` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDownPaymentsQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document document = check client->getDownPayments(42);
```

**Sample response:**

```json
{
  "DocEntry": 42,
  "DocNum": 42,
  "DocDate": "2026-04-20",
  "CardCode": "C30000",
  "CardName": "Microchips",
  "DocTotal": 500.00,
  "DocCurrency": "EUR",
  "Comments": "Down payment for sales order 101"
}
```

</details>

<details>
<summary>deleteDownPayments</summary>

Deletes the down payment document identified by the given `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDownPayments(42);
```

</details>

<details>
<summary>updateDownPayments</summary>

Partially updates a down payment document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The fields of the document to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDownPayments(42, {Comments: "Updated remarks"});
```

</details>

<details>
<summary>downPaymentsCancel</summary>

Invokes the bound action 'Cancel' on a down payment document (binding type Document) to cancel it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsCancel(42);
```

</details>

<details>
<summary>downPaymentsClose</summary>

Invokes the bound action 'Close' on a down payment document (binding type Document) to close it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsClose(42);
```

</details>

<details>
<summary>downPaymentsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a down payment document (binding type Document) and returns the generated cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document cancellation = check client->downPaymentsCreateCancellationDocument(42);
```

**Sample response:**

```json
{
  "DocEntry": 44,
  "DocNum": 44,
  "DocDate": "2026-04-22",
  "CardCode": "C30000",
  "DocTotal": -500.00,
  "DocCurrency": "EUR"
}
```

</details>

<details>
<summary>downPaymentsReopen</summary>

Invokes the bound action 'Reopen' on a down payment document (binding type Document) to reopen a closed document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsReopen(42);
```

</details>

<details>
<summary>downPaymentsServiceApproveAndAdd</summary>

Approves and adds a down payment document via the `DownPaymentsService_ApproveAndAdd` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DownPaymentsService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsServiceApproveAndAdd({document: {CardCode: "C30000"}});
```

</details>

<details>
<summary>downPaymentsServiceApproveAndUpdate</summary>

Approves and updates a down payment document via the `DownPaymentsService_ApproveAndUpdate` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DownPaymentsService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsServiceApproveAndUpdate({document: {DocEntry: 42}});
```

</details>

<details>
<summary>downPaymentsServiceCloseByDate</summary>

Closes down payment documents by date via the `DownPaymentsService_CloseByDate` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DownPaymentsService_CloseByDate_body</code> | Yes | Request payload wrapping `DocumentCloseParams` (document entry, specified closing date, and closing option) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsServiceCloseByDate({documentCloseParams: {docEntry: 42}});
```

</details>

<details>
<summary>downPaymentsServiceExportEWayBill</summary>

Exports an e-way bill for a down payment document via the `DownPaymentsService_ExportEWayBill` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DownPaymentsService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` for which to export the e-way bill |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsServiceExportEWayBill({document: {DocEntry: 42}});
```

</details>

<details>
<summary>downPaymentsServiceGetApprovalTemplates</summary>

Gets the approval templates applicable to a down payment document via the `DownPaymentsService_GetApprovalTemplates` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DownPaymentsService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to evaluate against approval templates |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->downPaymentsServiceGetApprovalTemplates({document: {CardCode: "C30000"}});
```

**Sample response:**

```json
{
  "DocEntry": 42,
  "DocumentApprovalRequests": [
    {
      "ApprovalTemplatesID": 2,
      "Remarks": "Requires finance approval"
    }
  ]
}
```

</details>

<details>
<summary>downPaymentsServiceHandleApprovalRequest</summary>

Handles a pending approval request for the DownPayments service via the `DownPaymentsService_HandleApprovalRequest` service operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->downPaymentsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>downPaymentsServiceInitData</summary>

Initializes and returns a down payment document with default data via the `DownPaymentsService_InitData` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document initial = check client->downPaymentsServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-04-20",
  "DocDueDate": "2026-05-20",
  "DocCurrency": "EUR",
  "Series": 7
}
```

</details>

#### BlanketAgreements

<details>
<summary>listBlanketAgreements</summary>

Queries the BlanketAgreements collection and returns a page of blanket agreements, with optional OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBlanketAgreementsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListBlanketAgreementsQueries</code> | No | OData query options such as `$filter`, `$top`, `$skip`, `$orderby`, `$select`, `$expand`, and `$inlinecount` |

**Returns:** `BlanketAgreementsCollectionResponse|error`

**Sample code:**

```ballerina
BlanketAgreementsCollectionResponse response = check client->listBlanketAgreements();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BlanketAgreements",
  "value": [
    {
      "AgreementNo": 1,
      "BPCode": "C20000",
      "BPName": "Maxi-Teq",
      "StartDate": "2026-01-01",
      "EndDate": "2026-12-31",
      "AgreementType": "atSpecific",
      "Status": "asApproved",
      "AgreementMethod": "amMonetary"
    }
  ],
  "odata.nextLink": "BlanketAgreements?$skip=20"
}
```

</details>

<details>
<summary>createBlanketAgreements</summary>

Creates a new blanket agreement in the BlanketAgreements collection and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BlanketAgreement</code> | Yes | The blanket agreement to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BlanketAgreement|error`

**Sample code:**

```ballerina
BlanketAgreement created = check client->createBlanketAgreements(payload);
```

**Sample response:**

```json
{
  "AgreementNo": 2,
  "BPCode": "C30000",
  "BPName": "Microchips",
  "StartDate": "2026-02-01",
  "EndDate": "2027-01-31",
  "AgreementType": "atGeneral",
  "Status": "asDraft",
  "AgreementMethod": "amItem"
}
```

</details>

<details>
<summary>getBlanketAgreements</summary>

Retrieves a single blanket agreement by its `AgreementNo` key, with optional `$select` and `$expand` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `agreementNo` | <code>int:Signed32</code> | Yes | Key property 'AgreementNo' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBlanketAgreementsQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `BlanketAgreement|error`

**Sample code:**

```ballerina
BlanketAgreement agreement = check client->getBlanketAgreements(1);
```

**Sample response:**

```json
{
  "AgreementNo": 1,
  "BPCode": "C20000",
  "BPName": "Maxi-Teq",
  "StartDate": "2026-01-01",
  "EndDate": "2026-12-31",
  "AgreementType": "atSpecific",
  "Status": "asApproved",
  "AgreementMethod": "amMonetary",
  "Remarks": "Annual supply agreement"
}
```

</details>

<details>
<summary>deleteBlanketAgreements</summary>

Deletes the blanket agreement identified by the given `AgreementNo` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `agreementNo` | <code>int:Signed32</code> | Yes | Key property 'AgreementNo' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBlanketAgreements(1);
```

</details>

<details>
<summary>updateBlanketAgreements</summary>

Partially updates a blanket agreement (PATCH/MERGE semantics) identified by its `AgreementNo` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `agreementNo` | <code>int:Signed32</code> | Yes | Key property 'AgreementNo' (Edm.Int32) |
| `payload` | <code>BlanketAgreement</code> | Yes | The fields of the blanket agreement to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBlanketAgreements(1, {Remarks: "Updated terms"});
```

</details>

<details>
<summary>blanketAgreementsCancelBlanketAgreement</summary>

Invokes the bound action 'CancelBlanketAgreement' on a blanket agreement (binding type BlanketAgreement) to cancel it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `agreementNo` | <code>int:Signed32</code> | Yes | Key property 'AgreementNo' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->blanketAgreementsCancelBlanketAgreement(1);
```

</details>

<details>
<summary>blanketAgreementsGetRelatedDocuments</summary>

Invokes the bound action 'GetRelatedDocuments' on a blanket agreement (binding type BlanketAgreement) and returns the documents related to the agreement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `agreementNo` | <code>int:Signed32</code> | Yes | Key property 'AgreementNo' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 related = check client->blanketAgreementsGetRelatedDocuments(1);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Edm.String",
  "value": [
    {
      "DocumentType": "SalesOrder",
      "DocumentNo": 101,
      "DocumentDate": "2026-03-15",
      "ItemNo": "A00001",
      "Quantity": 10.0,
      "UnitPrice": 25.5,
      "AgreementRowNumber": 1
    }
  ]
}
```

</details>

<details>
<summary>blanketAgreementsServiceGetBlanketAgreementList</summary>

Gets the list of blanket agreements via the `BlanketAgreementsService_GetBlanketAgreementList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 agreementList = check client->blanketAgreementsServiceGetBlanketAgreementList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Edm.String",
  "value": [
    {"AgreementNo": 1},
    {"AgreementNo": 2}
  ]
}
```

</details>

#### SalesTaxInvoices

<details>
<summary>listSalesTaxInvoices</summary>

Queries the SalesTaxInvoices collection and returns a page of sales tax invoices, with optional OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSalesTaxInvoicesHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListSalesTaxInvoicesQueries</code> | No | OData query options such as `$filter`, `$top`, `$skip`, `$orderby`, `$select`, `$expand`, and `$inlinecount` |

**Returns:** `SalesTaxInvoicesCollectionResponse|error`

**Sample code:**

```ballerina
SalesTaxInvoicesCollectionResponse response = check client->listSalesTaxInvoices();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#SalesTaxInvoices",
  "value": [
    {
      "DocEntry": 7,
      "DocNum": 7,
      "DocDate": "2026-03-10",
      "CardCode": "C20000",
      "DocumentTotal": 1180.00,
      "TaxTotal": 180.00,
      "DocCurrency": "EUR"
    }
  ],
  "odata.nextLink": "SalesTaxInvoices?$skip=20"
}
```

</details>

<details>
<summary>createSalesTaxInvoices</summary>

Creates a new sales tax invoice in the SalesTaxInvoices collection and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SalesTaxInvoice</code> | Yes | The sales tax invoice to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SalesTaxInvoice|error`

**Sample code:**

```ballerina
SalesTaxInvoice created = check client->createSalesTaxInvoices(payload);
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "DocDate": "2026-03-11",
  "CardCode": "C30000",
  "DocumentTotal": 590.00,
  "TaxTotal": 90.00,
  "DocCurrency": "EUR"
}
```

</details>

<details>
<summary>getSalesTaxInvoices</summary>

Retrieves a single sales tax invoice by its `DocEntry` key, with optional `$select` and `$expand` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesTaxInvoicesQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `SalesTaxInvoice|error`

**Sample code:**

```ballerina
SalesTaxInvoice invoice = check client->getSalesTaxInvoices(7);
```

**Sample response:**

```json
{
  "DocEntry": 7,
  "DocNum": 7,
  "DocDate": "2026-03-10",
  "CardCode": "C20000",
  "CustomerOrVendorName": "Maxi-Teq",
  "DocumentTotal": 1180.00,
  "TaxTotal": 180.00,
  "DocCurrency": "EUR",
  "Comments": "Tax invoice for delivery 55"
}
```

</details>

<details>
<summary>deleteSalesTaxInvoices</summary>

Deletes the sales tax invoice identified by the given `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSalesTaxInvoices(7);
```

</details>

<details>
<summary>updateSalesTaxInvoices</summary>

Partially updates a sales tax invoice (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>SalesTaxInvoice</code> | Yes | The fields of the sales tax invoice to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSalesTaxInvoices(7, {Comments: "Updated remarks"});
```

</details>

#### SalesPersons

<details>
<summary>listSalesPersons</summary>

Queries the SalesPersons collection and returns a page of sales persons, with optional OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSalesPersonsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListSalesPersonsQueries</code> | No | OData query options such as `$filter`, `$top`, `$skip`, `$orderby`, `$select`, `$expand`, and `$inlinecount` |

**Returns:** `SalesPersonsCollectionResponse|error`

**Sample code:**

```ballerina
SalesPersonsCollectionResponse response = check client->listSalesPersons();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#SalesPersons",
  "value": [
    {
      "SalesEmployeeCode": 1,
      "SalesEmployeeName": "Sophie Klogg",
      "CommissionForSalesEmployee": 5.0,
      "CommissionGroup": 0,
      "Locked": "tNO",
      "Active": "tYES",
      "Email": "sophie.klogg@example.com"
    }
  ],
  "odata.nextLink": "SalesPersons?$skip=20"
}
```

</details>

<details>
<summary>createSalesPersons</summary>

Creates a new sales person in the SalesPersons collection and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SalesPerson</code> | Yes | The sales person to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SalesPerson|error`

**Sample code:**

```ballerina
SalesPerson created = check client->createSalesPersons(payload);
```

**Sample response:**

```json
{
  "SalesEmployeeCode": 2,
  "SalesEmployeeName": "Bill Levine",
  "CommissionForSalesEmployee": 3.5,
  "CommissionGroup": 0,
  "Locked": "tNO",
  "Active": "tYES",
  "Email": "bill.levine@example.com"
}
```

</details>

<details>
<summary>getSalesPersons</summary>

Retrieves a single sales person by its `SalesEmployeeCode` key, with optional `$select` and `$expand` query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `salesEmployeeCode` | <code>int:Signed32</code> | Yes | Key property 'SalesEmployeeCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesPersonsQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `SalesPerson|error`

**Sample code:**

```ballerina
SalesPerson salesPerson = check client->getSalesPersons(1);
```

**Sample response:**

```json
{
  "SalesEmployeeCode": 1,
  "SalesEmployeeName": "Sophie Klogg",
  "Remarks": "Senior sales representative",
  "CommissionForSalesEmployee": 5.0,
  "CommissionGroup": 0,
  "Locked": "tNO",
  "Active": "tYES",
  "Telephone": "555-0100",
  "Email": "sophie.klogg@example.com"
}
```

</details>

<details>
<summary>deleteSalesPersons</summary>

Deletes the sales person identified by the given `SalesEmployeeCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `salesEmployeeCode` | <code>int:Signed32</code> | Yes | Key property 'SalesEmployeeCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSalesPersons(1);
```

</details>

<details>
<summary>updateSalesPersons</summary>

Partially updates a sales person (PATCH/MERGE semantics) identified by its `SalesEmployeeCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `salesEmployeeCode` | <code>int:Signed32</code> | Yes | Key property 'SalesEmployeeCode' (Edm.Int32) |
| `payload` | <code>SalesPerson</code> | Yes | The fields of the sales person to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSalesPersons(1, {CommissionForSalesEmployee: 6.0});
```

</details>
#### CreditNotes

<details>
<summary>listCreditNotes</summary>

Queries the CreditNotes collection and returns a paged set of Document entities representing AR credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCreditNotesHeaders</code> | No | Headers to be sent with the request, including the `Prefer` header for server-side paging control |
| `queries` | <code>ListCreditNotesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `CreditNotesCollectionResponse|error`

**Sample code:**

```ballerina
CreditNotesCollectionResponse result = check client->listCreditNotes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CreditNotes",
  "value": [
    {
      "DocEntry": 210,
      "DocNum": 210,
      "CardCode": "C20000",
      "CardName": "Example Customer",
      "DocDate": "2026-07-01",
      "DocTotal": 450.00,
      "DocCurrency": "USD",
      "DocumentStatus": "bost_Open"
    }
  ],
  "odata.nextLink": "CreditNotes?$skip=20"
}
```

</details>

<details>
<summary>createCreditNotes</summary>

Creates a new AR credit note (Document entity) in the CreditNotes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload describing the credit note to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createCreditNotes(payload);
```

**Sample response:**

```json
{
  "DocEntry": 211,
  "DocNum": 211,
  "CardCode": "C20000",
  "CardName": "Example Customer",
  "DocDate": "2026-07-10",
  "DocTotal": 200.00,
  "DocCurrency": "USD",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>getCreditNotes</summary>

Retrieves a single CreditNotes Document by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCreditNotesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getCreditNotes(210);
```

**Sample response:**

```json
{
  "DocEntry": 210,
  "DocNum": 210,
  "CardCode": "C20000",
  "CardName": "Example Customer",
  "DocDate": "2026-07-01",
  "DocTotal": 450.00,
  "DocCurrency": "USD",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>deleteCreditNotes</summary>

Deletes a CreditNotes Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCreditNotes(210);
```

</details>

<details>
<summary>updateCreditNotes</summary>

Partially updates a CreditNotes Document using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCreditNotes(210, payload);
```

</details>

<details>
<summary>creditNotesCancel</summary>

Invokes the bound action 'Cancel' on a CreditNotes Document to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesCancel(210);
```

</details>

<details>
<summary>creditNotesClose</summary>

Invokes the bound action 'Close' on a CreditNotes Document to close it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesClose(210);
```

</details>

<details>
<summary>creditNotesCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a CreditNotes Document to generate its cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->creditNotesCreateCancellationDocument(210);
```

**Sample response:**

```json
{
  "DocEntry": 212,
  "DocNum": 212,
  "CardCode": "C20000",
  "DocumentStatus": "bost_Close"
}
```

</details>

<details>
<summary>creditNotesReopen</summary>

Invokes the bound action 'Reopen' on a CreditNotes Document to reopen it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesReopen(210);
```

</details>

<details>
<summary>creditNotesServiceApproveAndAdd</summary>

Calls the `CreditNotesService_ApproveAndAdd` function-import to approve and add a pending credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>creditNotesServiceApproveAndUpdate</summary>

Calls the `CreditNotesService_ApproveAndUpdate` function-import to approve and update a pending credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>creditNotesServiceCancel2</summary>

Calls the `CreditNotesService_Cancel2` function-import, an alternate cancellation operation for a credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_Cancel2_body</code> | Yes | Request payload wrapping the `Document` to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceCancel2(payload);
```

</details>

<details>
<summary>creditNotesServiceCloseByDate</summary>

Calls the `CreditNotesService_CloseByDate` function-import to close credit note documents up to a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_CloseByDate_body</code> | Yes | Request payload wrapping `DocumentCloseParams` (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceCloseByDate(payload);
```

</details>

<details>
<summary>creditNotesServiceExportEWayBill</summary>

Calls the `CreditNotesService_ExportEWayBill` function-import to export the e-way bill for a credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` to export |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceExportEWayBill(payload);
```

</details>

<details>
<summary>creditNotesServiceGetApprovalTemplates</summary>

Calls the `CreditNotesService_GetApprovalTemplates` function-import to retrieve applicable approval templates for a credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to check |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->creditNotesServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 210,
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>creditNotesServiceHandleApprovalRequest</summary>

Calls the `CreditNotesService_HandleApprovalRequest` function-import to process a pending approval request for a credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceHandleApprovalRequest();
```

</details>

<details>
<summary>creditNotesServiceInitData</summary>

Calls the `CreditNotesService_InitData` function-import to obtain initialization data for creating a new credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->creditNotesServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items"
}
```

</details>

<details>
<summary>creditNotesServiceRequestApproveCancellation</summary>

Calls the `CreditNotesService_RequestApproveCancellation` function-import to submit a cancellation-approval request for a credit note document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditNotesService_RequestApproveCancellation_body</code> | Yes | Request payload wrapping the `Document` requiring cancellation approval |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->creditNotesServiceRequestApproveCancellation(payload);
```

</details>

#### Orders

<details>
<summary>listOrders</summary>

Queries the Orders collection and returns a paged set of sales order Document entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListOrdersHeaders</code> | No | Headers to be sent with the request, including the `Prefer` header for server-side paging control |
| `queries` | <code>ListOrdersQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `OrdersCollectionResponse|error`

**Sample code:**

```ballerina
OrdersCollectionResponse result = check client->listOrders();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Orders",
  "value": [
    {
      "DocEntry": 501,
      "DocNum": 501,
      "CardCode": "C10000",
      "CardName": "Example Customer",
      "DocDate": "2026-07-01",
      "DocTotal": 1250.00,
      "DocCurrency": "USD",
      "DocumentStatus": "bost_Open"
    }
  ],
  "odata.nextLink": "Orders?$skip=20"
}
```

</details>

<details>
<summary>createOrders</summary>

Creates a new sales order (Document entity) in the Orders collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload describing the order to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createOrders(payload);
```

**Sample response:**

```json
{
  "DocEntry": 502,
  "DocNum": 502,
  "CardCode": "C10000",
  "CardName": "Example Customer",
  "DocDate": "2026-07-10",
  "DocTotal": 980.00,
  "DocCurrency": "USD",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>getOrders</summary>

Retrieves a single Orders Document by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetOrdersQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getOrders(501);
```

**Sample response:**

```json
{
  "DocEntry": 501,
  "DocNum": 501,
  "CardCode": "C10000",
  "CardName": "Example Customer",
  "DocDate": "2026-07-01",
  "DocTotal": 1250.00,
  "DocCurrency": "USD",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>deleteOrders</summary>

Deletes an Orders Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteOrders(501);
```

</details>

<details>
<summary>updateOrders</summary>

Partially updates an Orders Document using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateOrders(501, payload);
```

</details>

<details>
<summary>ordersCancel</summary>

Invokes the bound action 'Cancel' on an Orders Document to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersCancel(501);
```

</details>

<details>
<summary>ordersClose</summary>

Invokes the bound action 'Close' on an Orders Document to close it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersClose(501);
```

</details>

<details>
<summary>ordersCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on an Orders Document to generate its cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->ordersCreateCancellationDocument(501);
```

**Sample response:**

```json
{
  "DocEntry": 503,
  "DocNum": 503,
  "CardCode": "C10000",
  "DocumentStatus": "bost_Close"
}
```

</details>

<details>
<summary>ordersReopen</summary>

Invokes the bound action 'Reopen' on an Orders Document to reopen it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersReopen(501);
```

</details>

<details>
<summary>ordersServiceApproveAndAdd</summary>

Calls the `OrdersService_ApproveAndAdd` function-import to approve and add a pending order document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OrdersService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>ordersServiceApproveAndUpdate</summary>

Calls the `OrdersService_ApproveAndUpdate` function-import to approve and update a pending order document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OrdersService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>ordersServiceCloseByDate</summary>

Calls the `OrdersService_CloseByDate` function-import to close order documents up to a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OrdersService_CloseByDate_body</code> | Yes | Request payload wrapping `DocumentCloseParams` (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersServiceCloseByDate(payload);
```

</details>

<details>
<summary>ordersServiceExportEWayBill</summary>

Calls the `OrdersService_ExportEWayBill` function-import to export the e-way bill for an order document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OrdersService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` to export |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersServiceExportEWayBill(payload);
```

</details>

<details>
<summary>ordersServiceGetApprovalTemplates</summary>

Calls the `OrdersService_GetApprovalTemplates` function-import to retrieve applicable approval templates for an order document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OrdersService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to check |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->ordersServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 501,
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>ordersServiceHandleApprovalRequest</summary>

Calls the `OrdersService_HandleApprovalRequest` function-import to process a pending approval request for an order document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->ordersServiceHandleApprovalRequest();
```

</details>

<details>
<summary>ordersServiceInitData</summary>

Calls the `OrdersService_InitData` function-import to obtain initialization data for creating a new order document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->ordersServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items"
}
```

</details>

<details>
<summary>ordersServicePreview</summary>

Calls the `OrdersService_Preview` function-import to preview the computed totals/lines of an order document before saving it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OrdersService_Preview_body</code> | Yes | Request payload wrapping the `Document` to preview |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->ordersServicePreview(payload);
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocTotal": 1250.00,
  "DocCurrency": "USD"
}
```

</details>

#### ReturnRequest

<details>
<summary>listReturnRequest</summary>

Queries the ReturnRequest collection and returns a paged set of return-request Document entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListReturnRequestHeaders</code> | No | Headers to be sent with the request, including the `Prefer` header for server-side paging control |
| `queries` | <code>ListReturnRequestQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ReturnRequestCollectionResponse|error`

**Sample code:**

```ballerina
ReturnRequestCollectionResponse result = check client->listReturnRequest();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ReturnRequest",
  "value": [
    {
      "DocEntry": 301,
      "DocNum": 301,
      "CardCode": "C30000",
      "CardName": "Example Customer",
      "DocDate": "2026-07-01",
      "DocTotal": 75.00,
      "DocCurrency": "USD",
      "DocumentStatus": "bost_Open"
    }
  ],
  "odata.nextLink": "ReturnRequest?$skip=20"
}
```

</details>

<details>
<summary>createReturnRequest</summary>

Creates a new return request (Document entity) in the ReturnRequest collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload describing the return request to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createReturnRequest(payload);
```

**Sample response:**

```json
{
  "DocEntry": 302,
  "DocNum": 302,
  "CardCode": "C30000",
  "CardName": "Example Customer",
  "DocDate": "2026-07-10",
  "DocTotal": 60.00,
  "DocCurrency": "USD",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>getReturnRequest</summary>

Retrieves a single ReturnRequest Document by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetReturnRequestQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getReturnRequest(301);
```

**Sample response:**

```json
{
  "DocEntry": 301,
  "DocNum": 301,
  "CardCode": "C30000",
  "CardName": "Example Customer",
  "DocDate": "2026-07-01",
  "DocTotal": 75.00,
  "DocCurrency": "USD",
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>deleteReturnRequest</summary>

Deletes a ReturnRequest Document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteReturnRequest(301);
```

</details>

<details>
<summary>updateReturnRequest</summary>

Partially updates a ReturnRequest Document using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateReturnRequest(301, payload);
```

</details>

<details>
<summary>returnRequestCancel</summary>

Invokes the bound action 'Cancel' on a ReturnRequest Document to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestCancel(301);
```

</details>

<details>
<summary>returnRequestClose</summary>

Invokes the bound action 'Close' on a ReturnRequest Document to close it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestClose(301);
```

</details>

<details>
<summary>returnRequestCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a ReturnRequest Document to generate its cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->returnRequestCreateCancellationDocument(301);
```

**Sample response:**

```json
{
  "DocEntry": 303,
  "DocNum": 303,
  "CardCode": "C30000",
  "DocumentStatus": "bost_Close"
}
```

</details>

<details>
<summary>returnRequestReopen</summary>

Invokes the bound action 'Reopen' on a ReturnRequest Document to reopen it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestReopen(301);
```

</details>

<details>
<summary>returnRequestServiceApproveAndAdd</summary>

Calls the `ReturnRequestService_ApproveAndAdd` function-import to approve and add a pending return request document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnRequestService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>returnRequestServiceApproveAndUpdate</summary>

Calls the `ReturnRequestService_ApproveAndUpdate` function-import to approve and update a pending return request document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnRequestService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>returnRequestServiceCloseByDate</summary>

Calls the `ReturnRequestService_CloseByDate` function-import to close return request documents up to a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnRequestService_CloseByDate_body</code> | Yes | Request payload wrapping `DocumentCloseParams` (docEntry, specifiedClosingDate, closingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestServiceCloseByDate(payload);
```

</details>

<details>
<summary>returnRequestServiceExportEWayBill</summary>

Calls the `ReturnRequestService_ExportEWayBill` function-import to export the e-way bill for a return request document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnRequestService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` to export |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestServiceExportEWayBill(payload);
```

</details>

<details>
<summary>returnRequestServiceGetApprovalTemplates</summary>

Calls the `ReturnRequestService_GetApprovalTemplates` function-import to retrieve applicable approval templates for a return request document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnRequestService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to check |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->returnRequestServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 301,
  "DocumentStatus": "bost_Open"
}
```

</details>

<details>
<summary>returnRequestServiceHandleApprovalRequest</summary>

Calls the `ReturnRequestService_HandleApprovalRequest` function-import to process a pending approval request for a return request document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->returnRequestServiceHandleApprovalRequest();
```

</details>

<details>
<summary>returnRequestServiceInitData</summary>

Calls the `ReturnRequestService_InitData` function-import to obtain initialization data for creating a new return request document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->returnRequestServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items"
}
```

</details>

#### POSDailySummary

<details>
<summary>listPOSDailySummary</summary>

Queries the POSDailySummary collection and returns a paged set of point-of-sale daily summary entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPOSDailySummaryHeaders</code> | No | Headers to be sent with the request, including the `Prefer` header for server-side paging control |
| `queries` | <code>ListPOSDailySummaryQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `POSDailySummaryCollectionResponse|error`

**Sample code:**

```ballerina
POSDailySummaryCollectionResponse result = check client->listPOSDailySummary();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#POSDailySummary",
  "value": [
    {
      "AbsEntry": 40,
      "Date": "2026-07-09",
      "GrossSales": 5230.50,
      "Total": 5230.50,
      "CounterPosition": 12,
      "Invoices": []
    }
  ],
  "odata.nextLink": "POSDailySummary?$skip=20"
}
```

</details>

<details>
<summary>createPOSDailySummary</summary>

Creates a new POSDailySummary entity summarizing point-of-sale activity for a given date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>POSDailySummary</code> | Yes | Request payload describing the POS daily summary to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `POSDailySummary|error`

**Sample code:**

```ballerina
POSDailySummary result = check client->createPOSDailySummary(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 41,
  "Date": "2026-07-10",
  "GrossSales": 3120.00,
  "Total": 3120.00,
  "CounterPosition": 13,
  "Invoices": []
}
```

</details>

<details>
<summary>getPOSDailySummary</summary>

Retrieves a single POSDailySummary entity by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPOSDailySummaryQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `POSDailySummary|error`

**Sample code:**

```ballerina
POSDailySummary result = check client->getPOSDailySummary(40);
```

**Sample response:**

```json
{
  "AbsEntry": 40,
  "Date": "2026-07-09",
  "GrossSales": 5230.50,
  "Total": 5230.50,
  "CounterPosition": 12,
  "Invoices": []
}
```

</details>

<details>
<summary>deletePOSDailySummary</summary>

Deletes a POSDailySummary entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePOSDailySummary(40);
```

</details>

<details>
<summary>updatePOSDailySummary</summary>

Partially updates a POSDailySummary entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>POSDailySummary</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePOSDailySummary(40, payload);
```

</details>
#### Invoices

<details>
<summary>listInvoices</summary>

Queries the Invoices collection and returns a paged list of A/R Invoice documents from the SAP Business One Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInvoicesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for `odata.maxpagesize`) |
| `queries` | <code>ListInvoicesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `InvoicesCollectionResponse|error`

**Sample code:**

```ballerina
InvoicesCollectionResponse result = check client->listInvoices();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Invoices",
  "value": [
    {
      "DocEntry": 1801,
      "DocNum": 90045,
      "CardCode": "C20000",
      "CardName": "Global Retail Ltd",
      "DocDate": "2026-07-10",
      "DocDueDate": "2026-08-09",
      "DocTotal": 4520.00,
      "DocumentLines": [
        {
          "LineNum": 0,
          "ItemCode": "A0001",
          "ItemDescription": "Desk Lamp",
          "Quantity": 10,
          "Price": 45.20
        }
      ]
    }
  ],
  "odata.nextLink": "Invoices?$skip=20"
}
```

</details>

<details>
<summary>createInvoices</summary>

Creates a new A/R Invoice document in SAP Business One.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload describing the invoice document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createInvoices(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1802,
  "DocNum": 90046,
  "CardCode": "C20000",
  "CardName": "Global Retail Ltd",
  "DocDate": "2026-07-14",
  "DocTotal": 1200.00
}
```

</details>

<details>
<summary>getInvoices</summary>

Retrieves a single Invoice document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInvoicesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getInvoices(1801);
```

**Sample response:**

```json
{
  "DocEntry": 1801,
  "DocNum": 90045,
  "CardCode": "C20000",
  "CardName": "Global Retail Ltd",
  "DocDate": "2026-07-10",
  "DocTotal": 4520.00
}
```

</details>

<details>
<summary>deleteInvoices</summary>

Deletes an Invoice document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->deleteInvoices(1801);
```

</details>

<details>
<summary>updateInvoices</summary>

Partially updates an Invoice document using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->updateInvoices(1801, payload);
```

</details>

<details>
<summary>invoicesCancel</summary>

Invokes the bound action 'Cancel' on an Invoices document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesCancel(1801);
```

</details>

<details>
<summary>invoicesClose</summary>

Invokes the bound action 'Close' on an Invoices document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesClose(1801);
```

</details>

<details>
<summary>invoicesCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on an Invoices document (binding type Document), returning the generated cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->invoicesCreateCancellationDocument(1801);
```

**Sample response:**

```json
{
  "DocEntry": 1900,
  "DocNum": 90099,
  "CardCode": "C20000",
  "DocTotal": -4520.00
}
```

</details>

<details>
<summary>invoicesReopen</summary>

Invokes the bound action 'Reopen' on an Invoices document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesReopen(1801);
```

</details>

<details>
<summary>invoicesServiceApproveAndAdd</summary>

Calls the `InvoicesService_ApproveAndAdd` function import to approve and add an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_ApproveAndAdd_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>invoicesServiceApproveAndUpdate</summary>

Calls the `InvoicesService_ApproveAndUpdate` function import to approve and update an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_ApproveAndUpdate_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>invoicesServiceCancel2</summary>

Calls the `InvoicesService_Cancel2` function import (alternate cancellation flow) on an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_Cancel2_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceCancel2(payload);
```

</details>

<details>
<summary>invoicesServiceCloseByDate</summary>

Calls the `InvoicesService_CloseByDate` function import to close an invoice as of a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_CloseByDate_body</code> | Yes | Request payload containing `documentCloseParams` (<code>DocumentCloseParams</code>: `docEntry`, `specifiedClosingDate`, `closingOption`) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceCloseByDate(payload);
```

</details>

<details>
<summary>invoicesServiceExportEWayBill</summary>

Calls the `InvoicesService_ExportEWayBill` function import to export an e-way bill for an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_ExportEWayBill_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to export |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceExportEWayBill(payload);
```

</details>

<details>
<summary>invoicesServiceGetApprovalTemplates</summary>

Calls the `InvoicesService_GetApprovalTemplates` function import to retrieve applicable approval templates for an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_GetApprovalTemplates_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->invoicesServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1801,
  "DocNum": 90045,
  "CardCode": "C20000"
}
```

</details>

<details>
<summary>invoicesServiceHandleApprovalRequest</summary>

Calls the `InvoicesService_HandleApprovalRequest` function import to handle a pending approval request for an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceHandleApprovalRequest();
```

</details>

<details>
<summary>invoicesServiceInitData</summary>

Calls the `InvoicesService_InitData` function import to retrieve initialization data for creating a new invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->invoicesServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items"
}
```

</details>

<details>
<summary>invoicesServiceRequestApproveCancellation</summary>

Calls the `InvoicesService_RequestApproveCancellation` function import to request approval for cancelling an invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InvoicesService_RequestApproveCancellation_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) whose cancellation approval is requested |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->invoicesServiceRequestApproveCancellation(payload);
```

</details>

#### Returns

<details>
<summary>listReturns</summary>

Queries the Returns collection and returns a paged list of Sales Return documents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListReturnsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for `odata.maxpagesize`) |
| `queries` | <code>ListReturnsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `ReturnsCollectionResponse|error`

**Sample code:**

```ballerina
ReturnsCollectionResponse result = check client->listReturns();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Returns",
  "value": [
    {
      "DocEntry": 2301,
      "DocNum": 40012,
      "CardCode": "C20000",
      "CardName": "Global Retail Ltd",
      "DocDate": "2026-07-05",
      "DocTotal": 220.00
    }
  ],
  "odata.nextLink": "Returns?$skip=20"
}
```

</details>

<details>
<summary>createReturns</summary>

Creates a new Sales Return document in SAP Business One.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload describing the return document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createReturns(payload);
```

**Sample response:**

```json
{
  "DocEntry": 2302,
  "DocNum": 40013,
  "CardCode": "C20000",
  "DocTotal": 95.00
}
```

</details>

<details>
<summary>getReturns</summary>

Retrieves a single Return document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetReturnsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getReturns(2301);
```

**Sample response:**

```json
{
  "DocEntry": 2301,
  "DocNum": 40012,
  "CardCode": "C20000",
  "DocTotal": 220.00
}
```

</details>

<details>
<summary>deleteReturns</summary>

Deletes a Return document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->deleteReturns(2301);
```

</details>

<details>
<summary>updateReturns</summary>

Partially updates a Return document using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->updateReturns(2301, payload);
```

</details>

<details>
<summary>returnsCancel</summary>

Invokes the bound action 'Cancel' on a Returns document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsCancel(2301);
```

</details>

<details>
<summary>returnsClose</summary>

Invokes the bound action 'Close' on a Returns document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsClose(2301);
```

</details>

<details>
<summary>returnsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a Returns document (binding type Document), returning the generated cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->returnsCreateCancellationDocument(2301);
```

**Sample response:**

```json
{
  "DocEntry": 2400,
  "DocNum": 40099,
  "CardCode": "C20000",
  "DocTotal": -220.00
}
```

</details>

<details>
<summary>returnsReopen</summary>

Invokes the bound action 'Reopen' on a Returns document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsReopen(2301);
```

</details>

<details>
<summary>returnsServiceApproveAndAdd</summary>

Calls the `ReturnsService_ApproveAndAdd` function import to approve and add a return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnsService_ApproveAndAdd_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>returnsServiceApproveAndUpdate</summary>

Calls the `ReturnsService_ApproveAndUpdate` function import to approve and update a return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnsService_ApproveAndUpdate_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>returnsServiceCancel2</summary>

Calls the `ReturnsService_Cancel2` function import (alternate cancellation flow) on a return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnsService_Cancel2_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsServiceCancel2(payload);
```

</details>

<details>
<summary>returnsServiceCloseByDate</summary>

Calls the `ReturnsService_CloseByDate` function import to close a return document as of a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnsService_CloseByDate_body</code> | Yes | Request payload containing `documentCloseParams` (<code>DocumentCloseParams</code>: `docEntry`, `specifiedClosingDate`, `closingOption`) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsServiceCloseByDate(payload);
```

</details>

<details>
<summary>returnsServiceExportEWayBill</summary>

Calls the `ReturnsService_ExportEWayBill` function import to export an e-way bill for a return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnsService_ExportEWayBill_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to export |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsServiceExportEWayBill(payload);
```

</details>

<details>
<summary>returnsServiceGetApprovalTemplates</summary>

Calls the `ReturnsService_GetApprovalTemplates` function import to retrieve applicable approval templates for a return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReturnsService_GetApprovalTemplates_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->returnsServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 2301,
  "DocNum": 40012,
  "CardCode": "C20000"
}
```

</details>

<details>
<summary>returnsServiceHandleApprovalRequest</summary>

Calls the `ReturnsService_HandleApprovalRequest` function import to handle a pending approval request for a return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->returnsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>returnsServiceInitData</summary>

Calls the `ReturnsService_InitData` function import to retrieve initialization data for creating a new return document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->returnsServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items"
}
```

</details>

#### CorrectionInvoice

<details>
<summary>listCorrectionInvoice</summary>

Queries the CorrectionInvoice collection and returns a paged list of Correction Invoice documents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCorrectionInvoiceHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for `odata.maxpagesize`) |
| `queries` | <code>ListCorrectionInvoiceQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `CorrectionInvoiceCollectionResponse|error`

**Sample code:**

```ballerina
CorrectionInvoiceCollectionResponse result = check client->listCorrectionInvoice();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CorrectionInvoice",
  "value": [
    {
      "DocEntry": 601,
      "DocNum": 15003,
      "CardCode": "C20000",
      "CardName": "Global Retail Ltd",
      "DocDate": "2026-07-08",
      "DocTotal": -150.00
    }
  ],
  "odata.nextLink": "CorrectionInvoice?$skip=20"
}
```

</details>

<details>
<summary>createCorrectionInvoice</summary>

Creates a new Correction Invoice document in SAP Business One.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload describing the correction invoice document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createCorrectionInvoice(payload);
```

**Sample response:**

```json
{
  "DocEntry": 602,
  "DocNum": 15004,
  "CardCode": "C20000",
  "DocTotal": -75.00
}
```

</details>

<details>
<summary>getCorrectionInvoice</summary>

Retrieves a single Correction Invoice document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCorrectionInvoiceQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getCorrectionInvoice(601);
```

**Sample response:**

```json
{
  "DocEntry": 601,
  "DocNum": 15003,
  "CardCode": "C20000",
  "DocTotal": -150.00
}
```

</details>

<details>
<summary>deleteCorrectionInvoice</summary>

Deletes a Correction Invoice document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->deleteCorrectionInvoice(601);
```

</details>

<details>
<summary>updateCorrectionInvoice</summary>

Partially updates a Correction Invoice document using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->updateCorrectionInvoice(601, payload);
```

</details>

<details>
<summary>correctionInvoiceCancel</summary>

Invokes the bound action 'Cancel' on a CorrectionInvoice document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceCancel(601);
```

</details>

<details>
<summary>correctionInvoiceClose</summary>

Invokes the bound action 'Close' on a CorrectionInvoice document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceClose(601);
```

</details>

<details>
<summary>correctionInvoiceCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a CorrectionInvoice document (binding type Document), returning the generated cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionInvoiceCreateCancellationDocument(601);
```

**Sample response:**

```json
{
  "DocEntry": 650,
  "DocNum": 15050,
  "CardCode": "C20000",
  "DocTotal": 150.00
}
```

</details>

<details>
<summary>correctionInvoiceReopen</summary>

Invokes the bound action 'Reopen' on a CorrectionInvoice document (binding type Document).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceReopen(601);
```

</details>

<details>
<summary>correctionInvoiceServiceApproveAndAdd</summary>

Calls the `CorrectionInvoiceService_ApproveAndAdd` function import to approve and add a correction invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceService_ApproveAndAdd_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>correctionInvoiceServiceApproveAndUpdate</summary>

Calls the `CorrectionInvoiceService_ApproveAndUpdate` function import to approve and update a correction invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceService_ApproveAndUpdate_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>correctionInvoiceServiceCloseByDate</summary>

Calls the `CorrectionInvoiceService_CloseByDate` function import to close a correction invoice document as of a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceService_CloseByDate_body</code> | Yes | Request payload containing `documentCloseParams` (<code>DocumentCloseParams</code>: `docEntry`, `specifiedClosingDate`, `closingOption`) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceServiceCloseByDate(payload);
```

</details>

<details>
<summary>correctionInvoiceServiceExportEWayBill</summary>

Calls the `CorrectionInvoiceService_ExportEWayBill` function import to export an e-way bill for a correction invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceService_ExportEWayBill_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to export |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceServiceExportEWayBill(payload);
```

</details>

<details>
<summary>correctionInvoiceServiceGetApprovalTemplates</summary>

Calls the `CorrectionInvoiceService_GetApprovalTemplates` function import to retrieve applicable approval templates for a correction invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CorrectionInvoiceService_GetApprovalTemplates_body</code> | Yes | Request payload containing the `document` (<code>Document</code>) to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionInvoiceServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 601,
  "DocNum": 15003,
  "CardCode": "C20000"
}
```

</details>

<details>
<summary>correctionInvoiceServiceHandleApprovalRequest</summary>

Calls the `CorrectionInvoiceService_HandleApprovalRequest` function import to handle a pending approval request for a correction invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->correctionInvoiceServiceHandleApprovalRequest();
```

</details>

<details>
<summary>correctionInvoiceServiceInitData</summary>

Calls the `CorrectionInvoiceService_InitData` function import to retrieve initialization data for creating a new correction invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->correctionInvoiceServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items"
}
```

</details>

#### DunningTerms

<details>
<summary>listDunningTerms</summary>

Queries the DunningTerms collection and returns a paged list of dunning term configuration entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDunningTermsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for `odata.maxpagesize`) |
| `queries` | <code>ListDunningTermsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DunningTermsCollectionResponse|error`

**Sample code:**

```ballerina
DunningTermsCollectionResponse result = check client->listDunningTerms();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#DunningTerms",
  "value": [
    {
      "Code": "D1",
      "Name": "Standard Dunning",
      "DaysInMonth": 30,
      "DaysInYear": 365,
      "LetterFee": 10.00,
      "LetterFeeCurrency": "USD",
      "DunningTermLines": [
        {
          "LevelNum": 1,
          "LetterFee": 5.00,
          "MininumBalance": 50.00,
          "Effectiveafter": 7
        }
      ]
    }
  ],
  "odata.nextLink": "DunningTerms?$skip=20"
}
```

</details>

<details>
<summary>createDunningTerms</summary>

Creates a new DunningTerm configuration entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DunningTerm</code> | Yes | Request payload describing the dunning term to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DunningTerm|error`

**Sample code:**

```ballerina
DunningTerm result = check client->createDunningTerms(payload);
```

**Sample response:**

```json
{
  "Code": "D2",
  "Name": "Aggressive Dunning",
  "DaysInMonth": 30,
  "DaysInYear": 365,
  "LetterFee": 15.00
}
```

</details>

<details>
<summary>getDunningTerms</summary>

Retrieves a single DunningTerm entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDunningTermsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `DunningTerm|error`

**Sample code:**

```ballerina
DunningTerm result = check client->getDunningTerms("D1");
```

**Sample response:**

```json
{
  "Code": "D1",
  "Name": "Standard Dunning",
  "DaysInMonth": 30,
  "DaysInYear": 365,
  "LetterFee": 10.00
}
```

</details>

<details>
<summary>deleteDunningTerms</summary>

Deletes a DunningTerm entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->deleteDunningTerms("D1");
```

</details>

<details>
<summary>updateDunningTerms</summary>

Partially updates a DunningTerm entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>DunningTerm</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->updateDunningTerms("D1", payload);
```

</details>

<details>
<summary>dunningTermsServiceGetDunningTermList</summary>

Calls the `DunningTermsService_GetDunningTermList` function import to retrieve a lightweight list of dunning term codes and names.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check client->dunningTermsServiceGetDunningTermList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#DunningTermsService_GetDunningTermList",
  "value": [
    {
      "Code": "D1",
      "Name": "Standard Dunning"
    },
    {
      "Code": "D2",
      "Name": "Aggressive Dunning"
    }
  ]
}
```

</details>

#### CommissionGroups

<details>
<summary>listCommissionGroups</summary>

Queries the CommissionGroups collection and returns a paged list of commission group entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCommissionGroupsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for `odata.maxpagesize`) |
| `queries` | <code>ListCommissionGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `CommissionGroupsCollectionResponse|error`

**Sample code:**

```ballerina
CommissionGroupsCollectionResponse result = check client->listCommissionGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CommissionGroups",
  "value": [
    {
      "CommissionGroupCode": 1,
      "CommissionGroupName": "North Region",
      "CommissionPercentage": 5.5,
      "SalesPersons": [
        {
          "SalesEmployeeCode": 12,
          "SalesEmployeeName": "Jane Doe",
          "CommissionForSalesEmployee": 5.5
        }
      ]
    }
  ],
  "odata.nextLink": "CommissionGroups?$skip=20"
}
```

</details>

<details>
<summary>createCommissionGroups</summary>

Creates a new CommissionGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CommissionGroup</code> | Yes | Request payload describing the commission group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CommissionGroup|error`

**Sample code:**

```ballerina
CommissionGroup result = check client->createCommissionGroups(payload);
```

**Sample response:**

```json
{
  "CommissionGroupCode": 2,
  "CommissionGroupName": "South Region",
  "CommissionPercentage": 4.0
}
```

</details>

<details>
<summary>getCommissionGroups</summary>

Retrieves a single CommissionGroup entity identified by its `CommissionGroupCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `commissionGroupCode` | <code>int:Signed32</code> | Yes | Key property 'CommissionGroupCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCommissionGroupsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `CommissionGroup|error`

**Sample code:**

```ballerina
CommissionGroup result = check client->getCommissionGroups(1);
```

**Sample response:**

```json
{
  "CommissionGroupCode": 1,
  "CommissionGroupName": "North Region",
  "CommissionPercentage": 5.5
}
```

</details>

<details>
<summary>deleteCommissionGroups</summary>

Deletes a CommissionGroup entity identified by its `CommissionGroupCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `commissionGroupCode` | <code>int:Signed32</code> | Yes | Key property 'CommissionGroupCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->deleteCommissionGroups(1);
```

</details>

<details>
<summary>updateCommissionGroups</summary>

Partially updates a CommissionGroup entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `commissionGroupCode` | <code>int:Signed32</code> | Yes | Key property 'CommissionGroupCode' (Edm.Int32) |
| `payload` | <code>CommissionGroup</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check client->updateCommissionGroups(1, payload);
```

</details>

#### DeliveryNotes

<details>
<summary>listDeliveryNotes</summary>

Queries the DeliveryNotes collection and returns a page of delivery note documents, with OData query options for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDeliveryNotesHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListDeliveryNotesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DeliveryNotesCollectionResponse|error`

**Sample code:**

```ballerina
DeliveryNotesCollectionResponse result = check client->listDeliveryNotes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#DeliveryNotes",
  "value": [
    {
      "DocEntry": 15,
      "DocNum": 15,
      "CardCode": "C20000",
      "CardName": "Maxi-Teq",
      "DocDate": "2026-07-01",
      "DocTotal": 1270.5
    }
  ],
  "odata.nextLink": "DeliveryNotes?$skip=20"
}
```

</details>

<details>
<summary>createDeliveryNotes</summary>

Creates a new delivery note document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The delivery note document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createDeliveryNotes({CardCode: "C20000", DocDate: "2026-07-01"});
```

**Sample response:**

```json
{
  "DocEntry": 16,
  "DocNum": 16,
  "CardCode": "C20000",
  "CardName": "Maxi-Teq",
  "DocDate": "2026-07-01",
  "DocTotal": 1270.5
}
```

</details>

<details>
<summary>getDeliveryNotes</summary>

Gets a single delivery note document by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeliveryNotesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getDeliveryNotes(15);
```

**Sample response:**

```json
{
  "DocEntry": 15,
  "DocNum": 15,
  "CardCode": "C20000",
  "CardName": "Maxi-Teq",
  "DocDate": "2026-07-01",
  "DocTotal": 1270.5
}
```

</details>

<details>
<summary>deleteDeliveryNotes</summary>

Deletes a delivery note document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeliveryNotes(15);
```

</details>

<details>
<summary>updateDeliveryNotes</summary>

Partially updates a delivery note document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeliveryNotes(15, {Comments: "Updated delivery note"});
```

</details>

<details>
<summary>deliveryNotesCancel</summary>

Invokes the bound action 'Cancel' on a delivery note document to cancel it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesCancel(15);
```

</details>

<details>
<summary>deliveryNotesClose</summary>

Invokes the bound action 'Close' on a delivery note document to close it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesClose(15);
```

</details>

<details>
<summary>deliveryNotesCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a delivery note to create and return its cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->deliveryNotesCreateCancellationDocument(15);
```

**Sample response:**

```json
{
  "DocEntry": 17,
  "DocNum": 17,
  "CardCode": "C20000",
  "DocDate": "2026-07-02",
  "Comments": "Cancellation document for delivery note 15"
}
```

</details>

<details>
<summary>deliveryNotesReopen</summary>

Invokes the bound action 'Reopen' on a delivery note document to reopen it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesReopen(15);
```

</details>

<details>
<summary>deliveryNotesServiceApproveAndAdd</summary>

Approves and adds a delivery note document via the DeliveryNotesService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeliveryNotesService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesServiceApproveAndAdd({document: {CardCode: "C20000", DocDate: "2026-07-01"}});
```

</details>

<details>
<summary>deliveryNotesServiceApproveAndUpdate</summary>

Approves and updates a delivery note document via the DeliveryNotesService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeliveryNotesService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesServiceApproveAndUpdate({document: {DocEntry: 15, Comments: "Approved"}});
```

</details>

<details>
<summary>deliveryNotesServiceCancel2</summary>

Cancels a delivery note document via the DeliveryNotesService 'Cancel2' operation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeliveryNotesService_Cancel2_body</code> | Yes | Request payload wrapping the `Document` to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesServiceCancel2({document: {DocEntry: 15}});
```

</details>

<details>
<summary>deliveryNotesServiceCloseByDate</summary>

Closes delivery note documents by date via the DeliveryNotesService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeliveryNotesService_CloseByDate_body</code> | Yes | Request payload wrapping the `DocumentCloseParams` close criteria |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesServiceCloseByDate({documentCloseParams: {}});
```

</details>

<details>
<summary>deliveryNotesServiceExportEWayBill</summary>

Exports the E-Way bill for a delivery note document via the DeliveryNotesService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeliveryNotesService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` whose E-Way bill is exported |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesServiceExportEWayBill({document: {DocEntry: 15}});
```

</details>

<details>
<summary>deliveryNotesServiceGetApprovalTemplates</summary>

Gets the approval templates applicable to a delivery note document via the DeliveryNotesService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeliveryNotesService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->deliveryNotesServiceGetApprovalTemplates({document: {CardCode: "C20000"}});
```

**Sample response:**

```json
{
  "DocEntry": 15,
  "DocNum": 15,
  "CardCode": "C20000",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>deliveryNotesServiceHandleApprovalRequest</summary>

Handles a pending approval request for delivery notes via the DeliveryNotesService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deliveryNotesServiceHandleApprovalRequest();
```

</details>

<details>
<summary>deliveryNotesServiceInitData</summary>

Initializes and returns a delivery note document with default data via the DeliveryNotesService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->deliveryNotesServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-07-14",
  "DocDueDate": "2026-07-14",
  "DocCurrency": "USD",
  "Series": 4
}
```

</details>

#### Drafts

<details>
<summary>listDrafts</summary>

Queries the Drafts collection and returns a page of draft documents, with OData query options for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDraftsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListDraftsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DraftsCollectionResponse|error`

**Sample code:**

```ballerina
DraftsCollectionResponse result = check client->listDrafts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Drafts",
  "value": [
    {
      "DocEntry": 42,
      "DocNum": 42,
      "CardCode": "C30000",
      "CardName": "Microchips",
      "DocDate": "2026-07-05",
      "DocTotal": 980.0
    }
  ],
  "odata.nextLink": "Drafts?$skip=20"
}
```

</details>

<details>
<summary>createDrafts</summary>

Creates a new draft document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The draft document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createDrafts({CardCode: "C30000", DocDate: "2026-07-05"});
```

**Sample response:**

```json
{
  "DocEntry": 43,
  "DocNum": 43,
  "CardCode": "C30000",
  "CardName": "Microchips",
  "DocDate": "2026-07-05",
  "DocTotal": 980.0
}
```

</details>

<details>
<summary>getDrafts</summary>

Gets a single draft document by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDraftsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getDrafts(42);
```

**Sample response:**

```json
{
  "DocEntry": 42,
  "DocNum": 42,
  "CardCode": "C30000",
  "CardName": "Microchips",
  "DocDate": "2026-07-05",
  "DocTotal": 980.0
}
```

</details>

<details>
<summary>deleteDrafts</summary>

Deletes a draft document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDrafts(42);
```

</details>

<details>
<summary>updateDrafts</summary>

Partially updates a draft document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDrafts(42, {Comments: "Updated draft"});
```

</details>

<details>
<summary>draftsCancel</summary>

Invokes the bound action 'Cancel' on a draft document to cancel it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsCancel(42);
```

</details>

<details>
<summary>draftsClose</summary>

Invokes the bound action 'Close' on a draft document to close it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsClose(42);
```

</details>

<details>
<summary>draftsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a draft to create and return its cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->draftsCreateCancellationDocument(42);
```

**Sample response:**

```json
{
  "DocEntry": 44,
  "DocNum": 44,
  "CardCode": "C30000",
  "DocDate": "2026-07-06",
  "Comments": "Cancellation document for draft 42"
}
```

</details>

<details>
<summary>draftsReopen</summary>

Invokes the bound action 'Reopen' on a draft document to reopen it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsReopen(42);
```

</details>

<details>
<summary>draftsServiceApproveAndAdd</summary>

Approves and adds a draft document via the DraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DraftsService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsServiceApproveAndAdd({document: {CardCode: "C30000", DocDate: "2026-07-05"}});
```

</details>

<details>
<summary>draftsServiceApproveAndUpdate</summary>

Approves and updates a draft document via the DraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DraftsService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsServiceApproveAndUpdate({document: {DocEntry: 42, Comments: "Approved"}});
```

</details>

<details>
<summary>draftsServiceCloseByDate</summary>

Closes draft documents by date via the DraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DraftsService_CloseByDate_body</code> | Yes | Request payload wrapping the `DocumentCloseParams` close criteria |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsServiceCloseByDate({documentCloseParams: {}});
```

</details>

<details>
<summary>draftsServiceExportEWayBill</summary>

Exports the E-Way bill for a draft document via the DraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DraftsService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` whose E-Way bill is exported |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsServiceExportEWayBill({document: {DocEntry: 42}});
```

</details>

<details>
<summary>draftsServiceGetApprovalTemplates</summary>

Gets the approval templates applicable to a draft document via the DraftsService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DraftsService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->draftsServiceGetApprovalTemplates({document: {CardCode: "C30000"}});
```

**Sample response:**

```json
{
  "DocEntry": 42,
  "DocNum": 42,
  "CardCode": "C30000",
  "DocDate": "2026-07-05"
}
```

</details>

<details>
<summary>draftsServiceHandleApprovalRequest</summary>

Handles a pending approval request for drafts via the DraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>draftsServiceInitData</summary>

Initializes and returns a draft document with default data via the DraftsService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->draftsServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-07-14",
  "DocDueDate": "2026-07-14",
  "DocCurrency": "USD",
  "Series": 9
}
```

</details>

<details>
<summary>draftsServiceSaveDraftToDocument</summary>

Saves a draft as a regular document via the DraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DraftsService_SaveDraftToDocument_body</code> | Yes | Request payload wrapping the draft `Document` to convert |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->draftsServiceSaveDraftToDocument({document: {DocEntry: 42}});
```

</details>

#### DunningLetters

<details>
<summary>listDunningLetters</summary>

Queries the DunningLetters collection and returns a page of dunning letters, with OData query options for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDunningLettersHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListDunningLettersQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DunningLettersCollectionResponse|error`

**Sample code:**

```ballerina
DunningLettersCollectionResponse result = check client->listDunningLetters();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#DunningLetters",
  "value": [
    {
      "RowNumber": 1,
      "LetterFormat": "DunningLetter01",
      "Effectiveafter": "2026-01-01",
      "Feeperletter": 5.0,
      "FeeCurrency": "USD",
      "MinimumBalance": 100.0,
      "MinimumBalanceCurrency": "USD",
      "CalcInterest": "tYES"
    }
  ],
  "odata.nextLink": "DunningLetters?$skip=20"
}
```

</details>

<details>
<summary>createDunningLetters</summary>

Creates a new dunning letter and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DunningLetter</code> | Yes | The dunning letter to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DunningLetter|error`

**Sample code:**

```ballerina
DunningLetter result = check client->createDunningLetters({LetterFormat: "DunningLetter01", Feeperletter: 5.0});
```

**Sample response:**

```json
{
  "RowNumber": 2,
  "LetterFormat": "DunningLetter01",
  "Feeperletter": 5.0,
  "FeeCurrency": "USD",
  "MinimumBalance": 100.0,
  "MinimumBalanceCurrency": "USD",
  "CalcInterest": "tYES"
}
```

</details>

<details>
<summary>getDunningLetters</summary>

Gets a single dunning letter by its `RowNumber` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `rowNumber` | <code>int:Signed32</code> | Yes | Key property 'RowNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDunningLettersQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `DunningLetter|error`

**Sample code:**

```ballerina
DunningLetter result = check client->getDunningLetters(1);
```

**Sample response:**

```json
{
  "RowNumber": 1,
  "LetterFormat": "DunningLetter01",
  "Effectiveafter": "2026-01-01",
  "Feeperletter": 5.0,
  "FeeCurrency": "USD",
  "MinimumBalance": 100.0,
  "MinimumBalanceCurrency": "USD",
  "CalcInterest": "tYES"
}
```

</details>

<details>
<summary>deleteDunningLetters</summary>

Deletes a dunning letter identified by its `RowNumber` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `rowNumber` | <code>int:Signed32</code> | Yes | Key property 'RowNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDunningLetters(1);
```

</details>

<details>
<summary>updateDunningLetters</summary>

Partially updates a dunning letter (PATCH/MERGE semantics) identified by its `RowNumber` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `rowNumber` | <code>int:Signed32</code> | Yes | Key property 'RowNumber' (Edm.Int32) |
| `payload` | <code>DunningLetter</code> | Yes | The dunning letter fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDunningLetters(1, {Feeperletter: 7.5});
```

</details>

#### Quotations

<details>
<summary>listQuotations</summary>

Queries the Quotations collection and returns a page of sales quotation documents, with OData query options for filtering, sorting, paging, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListQuotationsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListQuotationsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `QuotationsCollectionResponse|error`

**Sample code:**

```ballerina
QuotationsCollectionResponse result = check client->listQuotations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Quotations",
  "value": [
    {
      "DocEntry": 8,
      "DocNum": 8,
      "CardCode": "C40000",
      "CardName": "Earthshaker Corporation",
      "DocDate": "2026-07-03",
      "DocTotal": 4520.75
    }
  ],
  "odata.nextLink": "Quotations?$skip=20"
}
```

</details>

<details>
<summary>createQuotations</summary>

Creates a new sales quotation document and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | The quotation document to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createQuotations({CardCode: "C40000", DocDate: "2026-07-03"});
```

**Sample response:**

```json
{
  "DocEntry": 9,
  "DocNum": 9,
  "CardCode": "C40000",
  "CardName": "Earthshaker Corporation",
  "DocDate": "2026-07-03",
  "DocTotal": 4520.75
}
```

</details>

<details>
<summary>getQuotations</summary>

Gets a single sales quotation document by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetQuotationsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getQuotations(8);
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "CardCode": "C40000",
  "CardName": "Earthshaker Corporation",
  "DocDate": "2026-07-03",
  "DocTotal": 4520.75
}
```

</details>

<details>
<summary>deleteQuotations</summary>

Deletes a sales quotation document identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteQuotations(8);
```

</details>

<details>
<summary>updateQuotations</summary>

Partially updates a sales quotation document (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | The document fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateQuotations(8, {Comments: "Updated quotation"});
```

</details>

<details>
<summary>quotationsCancel</summary>

Invokes the bound action 'Cancel' on a sales quotation document to cancel it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsCancel(8);
```

</details>

<details>
<summary>quotationsClose</summary>

Invokes the bound action 'Close' on a sales quotation document to close it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsClose(8);
```

</details>

<details>
<summary>quotationsCreateCancellationDocument</summary>

Invokes the bound action 'CreateCancellationDocument' on a sales quotation to create and return its cancellation document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->quotationsCreateCancellationDocument(8);
```

**Sample response:**

```json
{
  "DocEntry": 10,
  "DocNum": 10,
  "CardCode": "C40000",
  "DocDate": "2026-07-04",
  "Comments": "Cancellation document for quotation 8"
}
```

</details>

<details>
<summary>quotationsReopen</summary>

Invokes the bound action 'Reopen' on a sales quotation document to reopen it; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsReopen(8);
```

</details>

<details>
<summary>quotationsServiceApproveAndAdd</summary>

Approves and adds a sales quotation document via the QuotationsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QuotationsService_ApproveAndAdd_body</code> | Yes | Request payload wrapping the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsServiceApproveAndAdd({document: {CardCode: "C40000", DocDate: "2026-07-03"}});
```

</details>

<details>
<summary>quotationsServiceApproveAndUpdate</summary>

Approves and updates a sales quotation document via the QuotationsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QuotationsService_ApproveAndUpdate_body</code> | Yes | Request payload wrapping the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsServiceApproveAndUpdate({document: {DocEntry: 8, Comments: "Approved"}});
```

</details>

<details>
<summary>quotationsServiceCloseByDate</summary>

Closes sales quotation documents by date via the QuotationsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QuotationsService_CloseByDate_body</code> | Yes | Request payload wrapping the `DocumentCloseParams` close criteria |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsServiceCloseByDate({documentCloseParams: {}});
```

</details>

<details>
<summary>quotationsServiceExportEWayBill</summary>

Exports the E-Way bill for a sales quotation document via the QuotationsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QuotationsService_ExportEWayBill_body</code> | Yes | Request payload wrapping the `Document` whose E-Way bill is exported |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsServiceExportEWayBill({document: {DocEntry: 8}});
```

</details>

<details>
<summary>quotationsServiceGetApprovalTemplates</summary>

Gets the approval templates applicable to a sales quotation document via the QuotationsService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QuotationsService_GetApprovalTemplates_body</code> | Yes | Request payload wrapping the `Document` to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->quotationsServiceGetApprovalTemplates({document: {CardCode: "C40000"}});
```

**Sample response:**

```json
{
  "DocEntry": 8,
  "DocNum": 8,
  "CardCode": "C40000",
  "DocDate": "2026-07-03"
}
```

</details>

<details>
<summary>quotationsServiceHandleApprovalRequest</summary>

Handles a pending approval request for quotations via the QuotationsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->quotationsServiceHandleApprovalRequest();
```

</details>

<details>
<summary>quotationsServiceInitData</summary>

Initializes and returns a sales quotation document with default data via the QuotationsService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->quotationsServiceInitData();
```

**Sample response:**

```json
{
  "DocDate": "2026-07-14",
  "DocDueDate": "2026-07-14",
  "DocCurrency": "USD",
  "Series": 3
}
```

</details>
