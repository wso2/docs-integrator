# Actions

The `ballerinax/sap.businessone.banking` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One banking and payment objects — incoming and vendor payments, payment drafts & wizards, deposits, checks for payment, bills of exchange, bank statements & pages, house bank accounts, credit cards, and internal reconciliations — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the banking and payments objects exposed by the SAP Business One Service Layer — incoming and outgoing payments, payment drafts and payment wizards, deposits, checks, bills of exchange, bank statements, house bank accounts, credit cards and their payment methods, and reconciliation data.

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
import ballerinax/sap.businessone.banking;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

banking:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### Deposits

<details>
<summary>listDeposits</summary>

Queries the Deposits collection and returns a page of deposit entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDepositsHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListDepositsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `DepositsCollectionResponse|error`

**Sample code:**

```ballerina
DepositsCollectionResponse response = check client->listDeposits();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Deposits",
  "value": [
    {
      "AbsEntry": 1,
      "DepositNumber": 100,
      "DepositType": "dtChecks",
      "DepositDate": "2026-01-15",
      "DepositCurrency": "USD",
      "DepositAccount": "_SYS00000000343",
      "TotalLC": 1500.0
    }
  ],
  "odata.nextLink": "Deposits?$skip=20"
}
```

</details>

<details>
<summary>createDeposits</summary>

Creates a new Deposit entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Deposit</code> | Yes | Request payload containing the deposit fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Deposit|error`

**Sample code:**

```ballerina
Deposit deposit = check client->createDeposits({
    DepositType: "dtChecks",
    DepositDate: "2026-01-15",
    DepositAccount: "_SYS00000000343"
});
```

**Sample response:**

```json
{
  "AbsEntry": 2,
  "DepositNumber": 101,
  "DepositType": "dtChecks",
  "DepositDate": "2026-01-15",
  "DepositAccount": "_SYS00000000343",
  "TotalLC": 1500.0
}
```

</details>

<details>
<summary>getDeposits</summary>

Retrieves a single Deposit by its `AbsEntry` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDepositsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Deposit|error`

**Sample code:**

```ballerina
Deposit deposit = check client->getDeposits(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "DepositNumber": 100,
  "DepositType": "dtChecks",
  "DepositDate": "2026-01-15",
  "DepositCurrency": "USD",
  "TotalLC": 1500.0
}
```

</details>

<details>
<summary>deleteDeposits</summary>

Deletes the Deposit identified by the given `AbsEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeposits(1);
```

</details>

<details>
<summary>updateDeposits</summary>

Partially updates a Deposit using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>Deposit</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeposits(1, {JournalRemarks: "Updated remarks"});
```

</details>

<details>
<summary>depositsCancelDeposit</summary>

Invokes the bound action 'CancelDeposit' on the Deposit identified by `AbsEntry` to cancel the deposit.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->depositsCancelDeposit(1);
```

</details>

<details>
<summary>depositsCancelDepositbyCurrentSystemDate</summary>

Invokes the bound action 'CancelDepositbyCurrentSystemDate' on the Deposit identified by `AbsEntry` to cancel the deposit using the current system date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->depositsCancelDepositbyCurrentSystemDate(1);
```

</details>

<details>
<summary>depositsServiceCancelCheckRow</summary>

Cancels a specific check row of a deposit via the `DepositsService_CancelCheckRow` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DepositsService_CancelCheckRow_body</code> | Yes | Request payload containing `CancelCheckRowParams` (check ID and deposit ID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->depositsServiceCancelCheckRow({
    cancelCheckRowParams: {checkID: 10, depositID: 1}
});
```

</details>

<details>
<summary>depositsServiceCancelCheckRowbyCurrentSystemDate</summary>

Cancels a specific check row of a deposit using the current system date via the `DepositsService_CancelCheckRowbyCurrentSystemDate` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DepositsService_CancelCheckRowbyCurrentSystemDate_body</code> | Yes | Request payload containing `CancelCheckRowParams` (check ID and deposit ID) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->depositsServiceCancelCheckRowbyCurrentSystemDate({
    cancelCheckRowParams: {checkID: 10, depositID: 1}
});
```

</details>

<details>
<summary>depositsServiceGetDepositList</summary>

Retrieves the list of deposits via the `DepositsService_GetDepositList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_8|error`

**Sample code:**

```ballerina
inline_response_200_8 response = check client->depositsServiceGetDepositList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.DepositParams)",
  "value": [
    {
      "Series": 1,
      "DepositNumber": 100,
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### InternalReconciliations

<details>
<summary>listInternalReconciliations</summary>

Queries the InternalReconciliations collection and returns a page of internal reconciliation entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListInternalReconciliationsHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListInternalReconciliationsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `InternalReconciliationsCollectionResponse|error`

**Sample code:**

```ballerina
InternalReconciliationsCollectionResponse response = check client->listInternalReconciliations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#InternalReconciliations",
  "value": [
    {
      "ReconNum": 5,
      "ReconType": "rtManual",
      "ReconDate": "2026-01-15",
      "CardOrAccount": "coaCard",
      "Total": 250.0
    }
  ],
  "odata.nextLink": "InternalReconciliations?$skip=20"
}
```

</details>

<details>
<summary>createInternalReconciliations</summary>

Creates a new InternalReconciliation entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InternalReconciliation</code> | Yes | Request payload containing the internal reconciliation fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InternalReconciliation|error`

**Sample code:**

```ballerina
InternalReconciliation reconciliation = check client->createInternalReconciliations({
    reconDate: "2026-01-15",
    cardOrAccount: "coaCard"
});
```

**Sample response:**

```json
{
  "ReconNum": 6,
  "ReconType": "rtManual",
  "ReconDate": "2026-01-15",
  "CardOrAccount": "coaCard",
  "Total": 250.0
}
```

</details>

<details>
<summary>getInternalReconciliations</summary>

Retrieves a single InternalReconciliation by its `ReconNum` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reconNum` | <code>int:Signed32</code> | Yes | Key property 'ReconNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInternalReconciliationsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `InternalReconciliation|error`

**Sample code:**

```ballerina
InternalReconciliation reconciliation = check client->getInternalReconciliations(5);
```

**Sample response:**

```json
{
  "ReconNum": 5,
  "ReconType": "rtManual",
  "ReconDate": "2026-01-15",
  "CardOrAccount": "coaCard",
  "Total": 250.0
}
```

</details>

<details>
<summary>deleteInternalReconciliations</summary>

Deletes the InternalReconciliation identified by the given `ReconNum` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reconNum` | <code>int:Signed32</code> | Yes | Key property 'ReconNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInternalReconciliations(5);
```

</details>

<details>
<summary>updateInternalReconciliations</summary>

Partially updates an InternalReconciliation using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reconNum` | <code>int:Signed32</code> | Yes | Key property 'ReconNum' (Edm.Int32) |
| `payload` | <code>InternalReconciliation</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInternalReconciliations(5, {reconDate: "2026-02-01"});
```

</details>

<details>
<summary>internalReconciliationsCancel</summary>

Invokes the bound action 'Cancel' on the InternalReconciliation identified by `ReconNum` to cancel the reconciliation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reconNum` | <code>int:Signed32</code> | Yes | Key property 'ReconNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->internalReconciliationsCancel(5);
```

</details>

<details>
<summary>internalReconciliationsServiceGetOpenTransactions</summary>

Retrieves open transactions available for internal reconciliation via the `InternalReconciliationsService_GetOpenTransactions` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InternalReconciliationsService_GetOpenTransactions_body</code> | Yes | Request payload containing `InternalReconciliationOpenTransParams` (account/business partner selection and date range) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `InternalReconciliationOpenTrans|error`

**Sample code:**

```ballerina
InternalReconciliationOpenTrans openTrans = check client->internalReconciliationsServiceGetOpenTransactions({
    internalReconciliationOpenTransParams: {
        cardOrAccount: "coaAccount",
        accountNo: "_SYS00000000343"
    }
});
```

**Sample response:**

```json
{
  "CardOrAccount": "coaAccount",
  "ReconDate": "2026-01-15",
  "BPLId": 1,
  "InternalReconciliationOpenTransRows": [
    {
      "TransRowId": 1,
      "ShortName": "C20000",
      "CashDiscount": 0.0,
      "Selected": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>internalReconciliationsServiceRequestApproveCancellation</summary>

Requests approval for cancelling an internal reconciliation via the `InternalReconciliationsService_RequestApproveCancellation` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InternalReconciliationsService_RequestApproveCancellation_body</code> | Yes | Request payload containing the `InternalReconciliation` to request cancellation approval for |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->internalReconciliationsServiceRequestApproveCancellation({
    internalReconciliation: {reconNum: 5}
});
```

</details>

#### BankChargesAllocationCodes

<details>
<summary>listBankChargesAllocationCodes</summary>

Queries the BankChargesAllocationCodes collection and returns a page of bank charges allocation code entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBankChargesAllocationCodesHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListBankChargesAllocationCodesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `BankChargesAllocationCodesCollectionResponse|error`

**Sample code:**

```ballerina
BankChargesAllocationCodesCollectionResponse response = check client->listBankChargesAllocationCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BankChargesAllocationCodes",
  "value": [
    {
      "Code": "BC01",
      "Description": "Standard bank charges"
    }
  ],
  "odata.nextLink": "BankChargesAllocationCodes?$skip=20"
}
```

</details>

<details>
<summary>createBankChargesAllocationCodes</summary>

Creates a new BankChargesAllocationCode entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BankChargesAllocationCode</code> | Yes | Request payload containing the bank charges allocation code fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BankChargesAllocationCode|error`

**Sample code:**

```ballerina
BankChargesAllocationCode allocationCode = check client->createBankChargesAllocationCodes({
    code: "BC01",
    description: "Standard bank charges"
});
```

**Sample response:**

```json
{
  "Code": "BC01",
  "Description": "Standard bank charges"
}
```

</details>

<details>
<summary>getBankChargesAllocationCodes</summary>

Retrieves a single BankChargesAllocationCode by its `Code` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBankChargesAllocationCodesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `BankChargesAllocationCode|error`

**Sample code:**

```ballerina
BankChargesAllocationCode allocationCode = check client->getBankChargesAllocationCodes("BC01");
```

**Sample response:**

```json
{
  "Code": "BC01",
  "Description": "Standard bank charges"
}
```

</details>

<details>
<summary>deleteBankChargesAllocationCodes</summary>

Deletes the BankChargesAllocationCode identified by the given `Code` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBankChargesAllocationCodes("BC01");
```

</details>

<details>
<summary>updateBankChargesAllocationCodes</summary>

Partially updates a BankChargesAllocationCode using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>BankChargesAllocationCode</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBankChargesAllocationCodes("BC01", {description: "Updated description"});
```

</details>

<details>
<summary>bankChargesAllocationCodesSetDefaultBankChargesAllocationCode</summary>

Invokes the bound action 'SetDefaultBankChargesAllocationCode' on the BankChargesAllocationCode identified by `Code` to set it as the default allocation code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->bankChargesAllocationCodesSetDefaultBankChargesAllocationCode("BC01");
```

</details>

<details>
<summary>bankChargesAllocationCodesServiceGetBankChargesAllocationCodeList</summary>

Retrieves the list of bank charges allocation codes via the `BankChargesAllocationCodesService_GetBankChargesAllocationCodeList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
inline_response_200_3 response = check client->bankChargesAllocationCodesServiceGetBankChargesAllocationCodeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.BankChargesAllocationCodeParams)",
  "value": [
    {
      "Code": "BC01",
      "Description": "Standard bank charges"
    }
  ]
}
```

</details>

#### BOEDocumentTypes

<details>
<summary>listBOEDocumentTypes</summary>

Queries the BOEDocumentTypes collection and returns a page of bill of exchange document type entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBOEDocumentTypesHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListBOEDocumentTypesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `BOEDocumentTypesCollectionResponse|error`

**Sample code:**

```ballerina
BOEDocumentTypesCollectionResponse response = check client->listBOEDocumentTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BOEDocumentTypes",
  "value": [
    {
      "DocEntry": 1,
      "DocType": "BT01",
      "DocDescription": "Standard bill of exchange"
    }
  ],
  "odata.nextLink": "BOEDocumentTypes?$skip=20"
}
```

</details>

<details>
<summary>createBOEDocumentTypes</summary>

Creates a new BOEDocumentType entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BOEDocumentType</code> | Yes | Request payload containing the BOE document type fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BOEDocumentType|error`

**Sample code:**

```ballerina
BOEDocumentType docType = check client->createBOEDocumentTypes({
    docType: "BT01",
    docDescription: "Standard bill of exchange"
});
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocType": "BT01",
  "DocDescription": "Standard bill of exchange"
}
```

</details>

<details>
<summary>getBOEDocumentTypes</summary>

Retrieves a single BOEDocumentType by its `DocEntry` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBOEDocumentTypesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `BOEDocumentType|error`

**Sample code:**

```ballerina
BOEDocumentType docType = check client->getBOEDocumentTypes(1);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocType": "BT01",
  "DocDescription": "Standard bill of exchange"
}
```

</details>

<details>
<summary>deleteBOEDocumentTypes</summary>

Deletes the BOEDocumentType identified by the given `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBOEDocumentTypes(1);
```

</details>

<details>
<summary>updateBOEDocumentTypes</summary>

Partially updates a BOEDocumentType using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>BOEDocumentType</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBOEDocumentTypes(1, {docDescription: "Updated description"});
```

</details>

<details>
<summary>bOEDocumentTypesServiceGetBOEDocumentTypeList</summary>

Retrieves the list of BOE document types via the `BOEDocumentTypesService_GetBOEDocumentTypeList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 response = check client->bOEDocumentTypesServiceGetBOEDocumentTypeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.BOEDocumentTypeParams)",
  "value": [
    {
      "DocEntry": 1,
      "DocType": "BT01"
    }
  ]
}
```

</details>

#### GovPayCodes

<details>
<summary>listGovPayCodes</summary>

Queries the GovPayCodes collection and returns a page of government payment code entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListGovPayCodesHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListGovPayCodesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `GovPayCodesCollectionResponse|error`

**Sample code:**

```ballerina
GovPayCodesCollectionResponse response = check client->listGovPayCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#GovPayCodes",
  "value": [
    {
      "AbsId": 1,
      "Code": "GP01",
      "Descr": "Federal tax payment",
      "StateTax": "tNO",
      "Prdcity": "gpcpMonth"
    }
  ],
  "odata.nextLink": "GovPayCodes?$skip=20"
}
```

</details>

<details>
<summary>createGovPayCodes</summary>

Creates a new GovPayCode entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GovPayCode</code> | Yes | Request payload containing the government payment code fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `GovPayCode|error`

**Sample code:**

```ballerina
GovPayCode govPayCode = check client->createGovPayCodes({
    code: "GP01",
    descr: "Federal tax payment"
});
```

**Sample response:**

```json
{
  "AbsId": 1,
  "Code": "GP01",
  "Descr": "Federal tax payment",
  "StateTax": "tNO",
  "Prdcity": "gpcpMonth"
}
```

</details>

<details>
<summary>getGovPayCodes</summary>

Retrieves a single GovPayCode by its `AbsId` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetGovPayCodesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `GovPayCode|error`

**Sample code:**

```ballerina
GovPayCode govPayCode = check client->getGovPayCodes(1);
```

**Sample response:**

```json
{
  "AbsId": 1,
  "Code": "GP01",
  "Descr": "Federal tax payment",
  "StateTax": "tNO",
  "Prdcity": "gpcpMonth"
}
```

</details>

<details>
<summary>deleteGovPayCodes</summary>

Deletes the GovPayCode identified by the given `AbsId` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteGovPayCodes(1);
```

</details>

<details>
<summary>updateGovPayCodes</summary>

Partially updates a GovPayCode using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `payload` | <code>GovPayCode</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateGovPayCodes(1, {descr: "Updated description"});
```

</details>

<details>
<summary>govPayCodesServiceGetList</summary>

Retrieves the list of government payment codes via the `GovPayCodesService_GetList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10|error`

**Sample code:**

```ballerina
inline_response_200_10 response = check client->govPayCodesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.GovPayCodeParams)",
  "value": [
    {
      "Code": "GP01",
      "AbsId": 1
    }
  ]
}
```

</details>

#### BankPages

<details>
<summary>listBankPages</summary>

Queries the BankPages collection and returns a page of bank page entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBankPagesHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListBankPagesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `BankPagesCollectionResponse|error`

**Sample code:**

```ballerina
BankPagesCollectionResponse response = check client->listBankPages();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BankPages",
  "value": [
    {
      "AccountCode": "_SYS00000000343",
      "Sequence": 1,
      "AccountName": "Bank Account - USD",
      "DueDate": "2026-01-15",
      "DebitAmount": 0.0,
      "CreditAmount": 1500.0,
      "PaymentCreated": "tNO"
    }
  ],
  "odata.nextLink": "BankPages?$skip=20"
}
```

</details>

<details>
<summary>createBankPages</summary>

Creates a new BankPage entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BankPage</code> | Yes | Request payload containing the bank page fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BankPage|error`

**Sample code:**

```ballerina
BankPage bankPage = check client->createBankPages({
    AccountCode: "_SYS00000000343",
    DueDate: "2026-01-15",
    CreditAmount: 1500.0
});
```

**Sample response:**

```json
{
  "AccountCode": "_SYS00000000343",
  "Sequence": 2,
  "DueDate": "2026-01-15",
  "DebitAmount": 0.0,
  "CreditAmount": 1500.0,
  "PaymentCreated": "tNO"
}
```

</details>

<details>
<summary>getBankPages</summary>

Retrieves a single BankPage by its composite key of `AccountCode` and `Sequence`, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `accountCode` | <code>string</code> | Yes | Composite key part 'AccountCode' (Edm.String) |
| `sequence` | <code>int:Signed32</code> | Yes | Composite key part 'Sequence' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBankPagesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `BankPage|error`

**Sample code:**

```ballerina
BankPage bankPage = check client->getBankPages("_SYS00000000343", 1);
```

**Sample response:**

```json
{
  "AccountCode": "_SYS00000000343",
  "Sequence": 1,
  "AccountName": "Bank Account - USD",
  "DueDate": "2026-01-15",
  "CreditAmount": 1500.0
}
```

</details>

<details>
<summary>deleteBankPages</summary>

Deletes the BankPage identified by the composite key of `AccountCode` and `Sequence`; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `accountCode` | <code>string</code> | Yes | Composite key part 'AccountCode' (Edm.String) |
| `sequence` | <code>int:Signed32</code> | Yes | Composite key part 'Sequence' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBankPages("_SYS00000000343", 1);
```

</details>

<details>
<summary>updateBankPages</summary>

Partially updates a BankPage identified by the composite key of `AccountCode` and `Sequence` using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `accountCode` | <code>string</code> | Yes | Composite key part 'AccountCode' (Edm.String) |
| `sequence` | <code>int:Signed32</code> | Yes | Composite key part 'Sequence' (Edm.Int32) |
| `payload` | <code>BankPage</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBankPages("_SYS00000000343", 1, {Memo: "Updated memo"});
```

</details>

#### BillOfExchangeTransactions

<details>
<summary>listBillOfExchangeTransactions</summary>

Queries the BillOfExchangeTransactions collection and returns a page of bill of exchange transaction entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBillOfExchangeTransactionsHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListBillOfExchangeTransactionsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `BillOfExchangeTransactionsCollectionResponse|error`

**Sample code:**

```ballerina
BillOfExchangeTransactionsCollectionResponse response = check client->listBillOfExchangeTransactions();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BillOfExchangeTransactions",
  "value": [
    {
      "BOETransactionkey": 1,
      "TransactionNumber": 100,
      "StatusFrom": "btfs_Generated",
      "StatusTo": "btts_Deposit",
      "TransactionDate": "2026-01-15",
      "PostingDate": "2026-01-15",
      "IsBoeReconciled": "tNO"
    }
  ],
  "odata.nextLink": "BillOfExchangeTransactions?$skip=20"
}
```

</details>

<details>
<summary>createBillOfExchangeTransactions</summary>

Creates a new BillOfExchangeTransaction entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BillOfExchangeTransaction</code> | Yes | Request payload containing the bill of exchange transaction fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BillOfExchangeTransaction|error`

**Sample code:**

```ballerina
BillOfExchangeTransaction transaction = check client->createBillOfExchangeTransactions({
    StatusFrom: "btfs_Generated",
    StatusTo: "btts_Deposit",
    PostingDate: "2026-01-15"
});
```

**Sample response:**

```json
{
  "BOETransactionkey": 2,
  "TransactionNumber": 101,
  "StatusFrom": "btfs_Generated",
  "StatusTo": "btts_Deposit",
  "PostingDate": "2026-01-15"
}
```

</details>

<details>
<summary>getBillOfExchangeTransactions</summary>

Retrieves a single BillOfExchangeTransaction by its `BOETransactionkey` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bOETransactionkey` | <code>int:Signed32</code> | Yes | Key property 'BOETransactionkey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBillOfExchangeTransactionsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `BillOfExchangeTransaction|error`

**Sample code:**

```ballerina
BillOfExchangeTransaction transaction = check client->getBillOfExchangeTransactions(1);
```

**Sample response:**

```json
{
  "BOETransactionkey": 1,
  "TransactionNumber": 100,
  "StatusFrom": "btfs_Generated",
  "StatusTo": "btts_Deposit",
  "TransactionDate": "2026-01-15",
  "IsBoeReconciled": "tNO"
}
```

</details>

<details>
<summary>deleteBillOfExchangeTransactions</summary>

Deletes the BillOfExchangeTransaction identified by the given `BOETransactionkey` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bOETransactionkey` | <code>int:Signed32</code> | Yes | Key property 'BOETransactionkey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBillOfExchangeTransactions(1);
```

</details>

<details>
<summary>updateBillOfExchangeTransactions</summary>

Partially updates a BillOfExchangeTransaction using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bOETransactionkey` | <code>int:Signed32</code> | Yes | Key property 'BOETransactionkey' (Edm.Int32) |
| `payload` | <code>BillOfExchangeTransaction</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBillOfExchangeTransactions(1, {TaxDate: "2026-01-20"});
```

</details>

#### CreditPaymentMethods

<details>
<summary>listCreditPaymentMethods</summary>

Queries the CreditPaymentMethods collection and returns a page of credit payment method entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCreditPaymentMethodsHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListCreditPaymentMethodsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `CreditPaymentMethodsCollectionResponse|error`

**Sample code:**

```ballerina
CreditPaymentMethodsCollectionResponse response = check client->listCreditPaymentMethods();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CreditPaymentMethods",
  "value": [
    {
      "PaymentMethodCode": 1,
      "Name": "Visa monthly settlement",
      "AssignedtoCreditCard": 1,
      "MinimumCreditAmount": 100.0,
      "MinimumPaymentAmount": 10.0,
      "InstallmentPaymentsPossible": "ippNo"
    }
  ],
  "odata.nextLink": "CreditPaymentMethods?$skip=20"
}
```

</details>

<details>
<summary>createCreditPaymentMethods</summary>

Creates a new CreditPaymentMethod entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditPaymentMethod</code> | Yes | Request payload containing the credit payment method fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreditPaymentMethod|error`

**Sample code:**

```ballerina
CreditPaymentMethod paymentMethod = check client->createCreditPaymentMethods({
    Name: "Visa monthly settlement",
    AssignedtoCreditCard: 1
});
```

**Sample response:**

```json
{
  "PaymentMethodCode": 2,
  "Name": "Visa monthly settlement",
  "AssignedtoCreditCard": 1,
  "InstallmentPaymentsPossible": "ippNo"
}
```

</details>

<details>
<summary>getCreditPaymentMethods</summary>

Retrieves a single CreditPaymentMethod by its `PaymentMethodCode` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentMethodCode` | <code>int:Signed32</code> | Yes | Key property 'PaymentMethodCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCreditPaymentMethodsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `CreditPaymentMethod|error`

**Sample code:**

```ballerina
CreditPaymentMethod paymentMethod = check client->getCreditPaymentMethods(1);
```

**Sample response:**

```json
{
  "PaymentMethodCode": 1,
  "Name": "Visa monthly settlement",
  "AssignedtoCreditCard": 1,
  "MinimumCreditAmount": 100.0,
  "InstallmentPaymentsPossible": "ippNo"
}
```

</details>

<details>
<summary>deleteCreditPaymentMethods</summary>

Deletes the CreditPaymentMethod identified by the given `PaymentMethodCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentMethodCode` | <code>int:Signed32</code> | Yes | Key property 'PaymentMethodCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCreditPaymentMethods(1);
```

</details>

<details>
<summary>updateCreditPaymentMethods</summary>

Partially updates a CreditPaymentMethod using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentMethodCode` | <code>int:Signed32</code> | Yes | Key property 'PaymentMethodCode' (Edm.Int32) |
| `payload` | <code>CreditPaymentMethod</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCreditPaymentMethods(1, {Name: "Updated method name"});
```

</details>

#### PaymentReasonCodes

<details>
<summary>paymentReasonCodeServiceGetPaymentReasonCodeList</summary>

Retrieves the list of payment reason codes via the `PaymentReasonCodeService_GetPaymentReasonCodeList` service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_13|error`

**Sample code:**

```ballerina
inline_response_200_13 response = check client->paymentReasonCodeServiceGetPaymentReasonCodeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.PaymentReasonCodeParams)",
  "value": [
    {
      "Code": "PR01"
    }
  ]
}
```

</details>

<details>
<summary>listPaymentReasonCodes</summary>

Queries the PaymentReasonCodes collection and returns a page of payment reason code entities, with OData query options for filtering, paging, sorting, and field selection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPaymentReasonCodesHeaders</code> | No | Headers to be sent with the request; supports the `Prefer` header for Service Layer paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListPaymentReasonCodesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `PaymentReasonCodesCollectionResponse|error`

**Sample code:**

```ballerina
PaymentReasonCodesCollectionResponse response = check client->listPaymentReasonCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PaymentReasonCodes",
  "value": [
    {
      "Code": "PR01"
    }
  ],
  "odata.nextLink": "PaymentReasonCodes?$skip=20"
}
```

</details>

<details>
<summary>createPaymentReasonCodes</summary>

Creates a new PaymentReasonCode entity in the SAP Business One Service Layer and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentReasonCode</code> | Yes | Request payload containing the payment reason code fields to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaymentReasonCode|error`

**Sample code:**

```ballerina
PaymentReasonCode reasonCode = check client->createPaymentReasonCodes({code: "PR01"});
```

**Sample response:**

```json
{
  "Code": "PR01"
}
```

</details>

<details>
<summary>getPaymentReasonCodes</summary>

Retrieves a single PaymentReasonCode by its `Code` key, optionally expanding navigation properties or selecting specific fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentReasonCodesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `PaymentReasonCode|error`

**Sample code:**

```ballerina
PaymentReasonCode reasonCode = check client->getPaymentReasonCodes("PR01");
```

**Sample response:**

```json
{
  "Code": "PR01"
}
```

</details>

<details>
<summary>deletePaymentReasonCodes</summary>

Deletes the PaymentReasonCode identified by the given `Code` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentReasonCodes("PR01");
```

</details>

<details>
<summary>updatePaymentReasonCodes</summary>

Partially updates a PaymentReasonCode using PATCH/MERGE semantics; only the fields present in the payload are modified.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>PaymentReasonCode</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentReasonCodes("PR01", {code: "PR01"});
```

</details>
#### PaymentDrafts

<details>
<summary>listPaymentDrafts</summary>

Queries the PaymentDrafts collection and returns a page of payment draft entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPaymentDraftsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListPaymentDraftsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `PaymentDraftsCollectionResponse|error`

**Sample code:**

```ballerina
PaymentDraftsCollectionResponse result = check client->listPaymentDrafts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#PaymentDrafts",
  "value": [
    {
      "DocEntry": 5,
      "DocNum": 100,
      "DocType": "rCustomer",
      "DocDate": "2026-07-01",
      "CardCode": "C20000",
      "CardName": "Norm Thompson",
      "DocCurrency": "USD",
      "CashSum": 1500.0
    }
  ],
  "odata.nextLink": "PaymentDrafts?$skip=20"
}
```

</details>

<details>
<summary>createPaymentDrafts</summary>

Creates a new payment draft (Payment entity) in the PaymentDrafts collection and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Payment</code> | Yes | The payment draft to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment result = check client->createPaymentDrafts({CardCode: "C20000", DocDate: "2026-07-01", CashSum: 1500.0});
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "DocNum": 100,
  "DocType": "rCustomer",
  "DocDate": "2026-07-01",
  "CardCode": "C20000",
  "CardName": "Norm Thompson",
  "DocCurrency": "USD",
  "CashSum": 1500.0
}
```

</details>

<details>
<summary>getPaymentDrafts</summary>

Retrieves a single payment draft (Payment entity) by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentDraftsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment result = check client->getPaymentDrafts(5);
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "DocNum": 100,
  "DocType": "rCustomer",
  "DocDate": "2026-07-01",
  "CardCode": "C20000",
  "DocCurrency": "USD",
  "CashSum": 1500.0
}
```

</details>

<details>
<summary>deletePaymentDrafts</summary>

Deletes a payment draft identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentDrafts(5);
```

</details>

<details>
<summary>updatePaymentDrafts</summary>

Partially updates a payment draft (PATCH/MERGE semantics) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Payment</code> | Yes | The payment draft fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentDrafts(5, {Remarks: "Updated draft"});
```

</details>

<details>
<summary>paymentDraftsCancel</summary>

Invokes the bound action 'Cancel' on a payment draft (binding type Payment) identified by its `DocEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->paymentDraftsCancel(5);
```

</details>

<details>
<summary>paymentDraftsCancelbyCurrentSystemDate</summary>

Invokes the bound action 'CancelbyCurrentSystemDate' on a payment draft (binding type Payment) to cancel it using the current system date; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->paymentDraftsCancelbyCurrentSystemDate(5);
```

</details>

<details>
<summary>paymentDraftsGetApprovalTemplates</summary>

Invokes the bound action 'GetApprovalTemplates' on a payment draft (binding type Payment) and returns the resulting Payment entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment result = check client->paymentDraftsGetApprovalTemplates(5);
```

**Sample response:**

```json
{
  "DocEntry": 5,
  "DocNum": 100,
  "CardCode": "C20000",
  "DocDate": "2026-07-01"
}
```

</details>

<details>
<summary>paymentDraftsRequestApproveCancellation</summary>

Invokes the bound action 'RequestApproveCancellation' on a payment draft (binding type Payment) to request approval for cancellation; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->paymentDraftsRequestApproveCancellation(5);
```

</details>

<details>
<summary>paymentDraftsSaveDraftToDocument</summary>

Invokes the bound action 'SaveDraftToDocument' on a payment draft (binding type Payment) to convert the draft into a posted document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->paymentDraftsSaveDraftToDocument(5);
```

</details>

<details>
<summary>paymentDraftsServiceHandleApprovalRequest</summary>

Handles an approval request via the PaymentDraftsService; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->paymentDraftsServiceHandleApprovalRequest();
```

</details>

#### CentralBankIndicator

<details>
<summary>listCentralBankIndicator</summary>

Queries the CentralBankIndicator collection and returns a page of central bank indicator entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCentralBankIndicatorHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListCentralBankIndicatorQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `CentralBankIndicatorCollectionResponse|error`

**Sample code:**

```ballerina
CentralBankIndicatorCollectionResponse result = check client->listCentralBankIndicator();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#CentralBankIndicator",
  "value": [
    {
      "Indicator": "CBI01",
      "Description": "Goods import"
    }
  ],
  "odata.nextLink": "CentralBankIndicator?$skip=20"
}
```

</details>

<details>
<summary>createCentralBankIndicator</summary>

Creates a new CentralBankIndicator entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CentralBankIndicator</code> | Yes | The central bank indicator to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CentralBankIndicator|error`

**Sample code:**

```ballerina
CentralBankIndicator result = check client->createCentralBankIndicator({indicator: "CBI01", description: "Goods import"});
```

**Sample response:**

```json
{
  "Indicator": "CBI01",
  "Description": "Goods import"
}
```

</details>

<details>
<summary>getCentralBankIndicator</summary>

Retrieves a single CentralBankIndicator entity by its `Indicator` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `indicator` | <code>string</code> | Yes | Key property 'Indicator' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCentralBankIndicatorQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `CentralBankIndicator|error`

**Sample code:**

```ballerina
CentralBankIndicator result = check client->getCentralBankIndicator("CBI01");
```

**Sample response:**

```json
{
  "Indicator": "CBI01",
  "Description": "Goods import"
}
```

</details>

<details>
<summary>deleteCentralBankIndicator</summary>

Deletes a CentralBankIndicator entity identified by its `Indicator` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `indicator` | <code>string</code> | Yes | Key property 'Indicator' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCentralBankIndicator("CBI01");
```

</details>

<details>
<summary>updateCentralBankIndicator</summary>

Partially updates a CentralBankIndicator entity (PATCH/MERGE semantics) identified by its `Indicator` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `indicator` | <code>string</code> | Yes | Key property 'Indicator' (Edm.String) |
| `payload` | <code>CentralBankIndicator</code> | Yes | The central bank indicator fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCentralBankIndicator("CBI01", {description: "Updated description"});
```

</details>

<details>
<summary>centralBankIndicatorServiceGetList</summary>

Retrieves the central bank indicator list via the CentralBankIndicatorService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
inline_response_200_5 result = check client->centralBankIndicatorServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#SAPB1.CentralBankIndicatorParams",
  "value": [
    {
      "Indicator": "CBI01"
    }
  ]
}
```

</details>

#### BOEInstructions

<details>
<summary>listBOEInstructions</summary>

Queries the BOEInstructions collection and returns a page of bill of exchange instruction entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBOEInstructionsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListBOEInstructionsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `BOEInstructionsCollectionResponse|error`

**Sample code:**

```ballerina
BOEInstructionsCollectionResponse result = check client->listBOEInstructions();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#BOEInstructions",
  "value": [
    {
      "InstructionEntry": 1,
      "InstructionCode": "INST01",
      "InstructionDesc": "Standard collection",
      "IsCancelInstruction": "tNO"
    }
  ],
  "odata.nextLink": "BOEInstructions?$skip=20"
}
```

</details>

<details>
<summary>createBOEInstructions</summary>

Creates a new BOEInstruction entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BOEInstruction</code> | Yes | The BOE instruction to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BOEInstruction|error`

**Sample code:**

```ballerina
BOEInstruction result = check client->createBOEInstructions({instructionCode: "INST01", instructionDesc: "Standard collection"});
```

**Sample response:**

```json
{
  "InstructionEntry": 1,
  "InstructionCode": "INST01",
  "InstructionDesc": "Standard collection",
  "IsCancelInstruction": "tNO"
}
```

</details>

<details>
<summary>getBOEInstructions</summary>

Retrieves a single BOEInstruction entity by its `InstructionEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `instructionEntry` | <code>int:Signed32</code> | Yes | Key property 'InstructionEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBOEInstructionsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `BOEInstruction|error`

**Sample code:**

```ballerina
BOEInstruction result = check client->getBOEInstructions(1);
```

**Sample response:**

```json
{
  "InstructionEntry": 1,
  "InstructionCode": "INST01",
  "InstructionDesc": "Standard collection",
  "IsCancelInstruction": "tNO"
}
```

</details>

<details>
<summary>deleteBOEInstructions</summary>

Deletes a BOEInstruction entity identified by its `InstructionEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `instructionEntry` | <code>int:Signed32</code> | Yes | Key property 'InstructionEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBOEInstructions(1);
```

</details>

<details>
<summary>updateBOEInstructions</summary>

Partially updates a BOEInstruction entity (PATCH/MERGE semantics) identified by its `InstructionEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `instructionEntry` | <code>int:Signed32</code> | Yes | Key property 'InstructionEntry' (Edm.Int32) |
| `payload` | <code>BOEInstruction</code> | Yes | The BOE instruction fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBOEInstructions(1, {instructionDesc: "Updated description"});
```

</details>

<details>
<summary>bOEInstructionsServiceGetBOEInstructionList</summary>

Retrieves the BOE instruction list via the BOEInstructionsService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 result = check client->bOEInstructionsServiceGetBOEInstructionList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#SAPB1.BOEInstructionParams",
  "value": [
    {
      "InstructionEntry": 1,
      "InstructionCode": "INST01"
    }
  ]
}
```

</details>

#### PaymentBlocks

<details>
<summary>listPaymentBlocks</summary>

Queries the PaymentBlocks collection and returns a page of payment block entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPaymentBlocksHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListPaymentBlocksQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `PaymentBlocksCollectionResponse|error`

**Sample code:**

```ballerina
PaymentBlocksCollectionResponse result = check client->listPaymentBlocks();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#PaymentBlocks",
  "value": [
    {
      "AbsEntry": 1,
      "PaymentBlockCode": "BLOCK01"
    }
  ],
  "odata.nextLink": "PaymentBlocks?$skip=20"
}
```

</details>

<details>
<summary>createPaymentBlocks</summary>

Creates a new PaymentBlock entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentBlock</code> | Yes | The payment block to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaymentBlock|error`

**Sample code:**

```ballerina
PaymentBlock result = check client->createPaymentBlocks({paymentBlockCode: "BLOCK01"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "PaymentBlockCode": "BLOCK01"
}
```

</details>

<details>
<summary>getPaymentBlocks</summary>

Retrieves a single PaymentBlock entity by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentBlocksQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `PaymentBlock|error`

**Sample code:**

```ballerina
PaymentBlock result = check client->getPaymentBlocks(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "PaymentBlockCode": "BLOCK01"
}
```

</details>

<details>
<summary>deletePaymentBlocks</summary>

Deletes a PaymentBlock entity identified by its `AbsEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentBlocks(1);
```

</details>

<details>
<summary>updatePaymentBlocks</summary>

Partially updates a PaymentBlock entity (PATCH/MERGE semantics) identified by its `AbsEntry` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>PaymentBlock</code> | Yes | The payment block fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentBlocks(1, {paymentBlockCode: "BLOCK02"});
```

</details>

<details>
<summary>paymentBlocksServiceGetPaymentBlockList</summary>

Retrieves the payment block list via the PaymentBlocksService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_11|error`

**Sample code:**

```ballerina
inline_response_200_11 result = check client->paymentBlocksServiceGetPaymentBlockList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#SAPB1.PaymentBlockParams",
  "value": [
    {
      "AbsEntry": 1,
      "PaymentBlockCode": "BLOCK01"
    }
  ]
}
```

</details>

#### BankStatements

<details>
<summary>listBankStatements</summary>

Queries the BankStatements collection and returns a page of bank statement entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBankStatementsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListBankStatementsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `BankStatementsCollectionResponse|error`

**Sample code:**

```ballerina
BankStatementsCollectionResponse result = check client->listBankStatements();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#BankStatements",
  "value": [
    {
      "InternalNumber": 1,
      "BankAccountKey": 3,
      "StatementNumber": "ST-2026-001",
      "StatementDate": "2026-07-01",
      "Status": "bssDraft",
      "Currency": "USD",
      "StartingBalanceL": 10000.0,
      "EndingBalanceL": 12500.0,
      "Imported": "tNO"
    }
  ],
  "odata.nextLink": "BankStatements?$skip=20"
}
```

</details>

<details>
<summary>createBankStatements</summary>

Creates a new BankStatement entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BankStatement</code> | Yes | The bank statement to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BankStatement|error`

**Sample code:**

```ballerina
BankStatement result = check client->createBankStatements({bankAccountKey: 3, statementNumber: "ST-2026-001", statementDate: "2026-07-01"});
```

**Sample response:**

```json
{
  "InternalNumber": 1,
  "BankAccountKey": 3,
  "StatementNumber": "ST-2026-001",
  "StatementDate": "2026-07-01",
  "Status": "bssDraft",
  "Currency": "USD"
}
```

</details>

<details>
<summary>getBankStatements</summary>

Retrieves a single BankStatement entity by its `InternalNumber` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalNumber` | <code>int:Signed32</code> | Yes | Key property 'InternalNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBankStatementsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `BankStatement|error`

**Sample code:**

```ballerina
BankStatement result = check client->getBankStatements(1);
```

**Sample response:**

```json
{
  "InternalNumber": 1,
  "BankAccountKey": 3,
  "StatementNumber": "ST-2026-001",
  "StatementDate": "2026-07-01",
  "Status": "bssDraft",
  "Currency": "USD",
  "StartingBalanceL": 10000.0,
  "EndingBalanceL": 12500.0
}
```

</details>

<details>
<summary>deleteBankStatements</summary>

Deletes a BankStatement entity identified by its `InternalNumber` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalNumber` | <code>int:Signed32</code> | Yes | Key property 'InternalNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBankStatements(1);
```

</details>

<details>
<summary>updateBankStatements</summary>

Partially updates a BankStatement entity (PATCH/MERGE semantics) identified by its `InternalNumber` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalNumber` | <code>int:Signed32</code> | Yes | Key property 'InternalNumber' (Edm.Int32) |
| `payload` | <code>BankStatement</code> | Yes | The bank statement fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBankStatements(1, {statementNumber: "ST-2026-002"});
```

</details>

<details>
<summary>bankStatementsServiceGetBankStatementList</summary>

Retrieves a filtered bank statement list via the BankStatementsService using a bank statements filter payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BankStatementsService_GetBankStatementList_body</code> | Yes | Request payload containing the `BankStatementsFilter` criteria |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4|error`

**Sample code:**

```ballerina
inline_response_200_4 result = check client->bankStatementsServiceGetBankStatementList({bankStatementsFilter: {}});
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#SAPB1.BankStatementParams",
  "value": [
    {
      "InternalNumber": 1,
      "BankAccountKey": 3,
      "StatementNumber": "ST-2026-001",
      "StatementDate": "2026-07-01",
      "Status": "bssDraft",
      "Currency": "USD"
    }
  ]
}
```

</details>

#### WizardPaymentMethods

<details>
<summary>listWizardPaymentMethods</summary>

Queries the WizardPaymentMethods collection and returns a page of wizard payment method entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWizardPaymentMethodsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListWizardPaymentMethodsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `WizardPaymentMethodsCollectionResponse|error`

**Sample code:**

```ballerina
WizardPaymentMethodsCollectionResponse result = check client->listWizardPaymentMethods();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#WizardPaymentMethods",
  "value": [
    {
      "PaymentMethodCode": "OutgoingBT",
      "Description": "Outgoing bank transfer",
      "Type": "boptOutgoing",
      "PaymentMeans": "bopmBankTransfer",
      "MinimumAmount": 0.0,
      "MaximumAmount": 100000.0
    }
  ],
  "odata.nextLink": "WizardPaymentMethods?$skip=20"
}
```

</details>

<details>
<summary>createWizardPaymentMethods</summary>

Creates a new WizardPaymentMethod entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WizardPaymentMethod</code> | Yes | The wizard payment method to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WizardPaymentMethod|error`

**Sample code:**

```ballerina
WizardPaymentMethod result = check client->createWizardPaymentMethods({PaymentMethodCode: "OutgoingBT", Description: "Outgoing bank transfer", Type: "boptOutgoing"});
```

**Sample response:**

```json
{
  "PaymentMethodCode": "OutgoingBT",
  "Description": "Outgoing bank transfer",
  "Type": "boptOutgoing",
  "PaymentMeans": "bopmBankTransfer"
}
```

</details>

<details>
<summary>getWizardPaymentMethods</summary>

Retrieves a single WizardPaymentMethod entity by its `PaymentMethodCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentMethodCode` | <code>string</code> | Yes | Key property 'PaymentMethodCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWizardPaymentMethodsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `WizardPaymentMethod|error`

**Sample code:**

```ballerina
WizardPaymentMethod result = check client->getWizardPaymentMethods("OutgoingBT");
```

**Sample response:**

```json
{
  "PaymentMethodCode": "OutgoingBT",
  "Description": "Outgoing bank transfer",
  "Type": "boptOutgoing",
  "PaymentMeans": "bopmBankTransfer",
  "MinimumAmount": 0.0,
  "MaximumAmount": 100000.0
}
```

</details>

<details>
<summary>deleteWizardPaymentMethods</summary>

Deletes a WizardPaymentMethod entity identified by its `PaymentMethodCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentMethodCode` | <code>string</code> | Yes | Key property 'PaymentMethodCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWizardPaymentMethods("OutgoingBT");
```

</details>

<details>
<summary>updateWizardPaymentMethods</summary>

Partially updates a WizardPaymentMethod entity (PATCH/MERGE semantics) identified by its `PaymentMethodCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentMethodCode` | <code>string</code> | Yes | Key property 'PaymentMethodCode' (Edm.String) |
| `payload` | <code>WizardPaymentMethod</code> | Yes | The wizard payment method fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWizardPaymentMethods("OutgoingBT", {Description: "Updated description"});
```

</details>

#### ChecksforPayment

<details>
<summary>listChecksforPayment</summary>

Queries the ChecksforPayment collection and returns a page of checks for payment entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListChecksforPaymentHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListChecksforPaymentQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `ChecksforPaymentCollectionResponse|error`

**Sample code:**

```ballerina
ChecksforPaymentCollectionResponse result = check client->listChecksforPayment();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#ChecksforPayment",
  "value": [
    {
      "CheckKey": 1,
      "CheckNumber": 1001,
      "BankCode": "BANK01",
      "BankName": "First National Bank",
      "CheckDate": "2026-07-01",
      "CheckAmount": 1500.0,
      "CheckCurrency": "USD",
      "VendorCode": "V10000",
      "Printed": "tNO",
      "Canceled": "tNO"
    }
  ],
  "odata.nextLink": "ChecksforPayment?$skip=20"
}
```

</details>

<details>
<summary>createChecksforPayment</summary>

Creates a new ChecksforPayment entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ChecksforPayment</code> | Yes | The check for payment to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ChecksforPayment|error`

**Sample code:**

```ballerina
ChecksforPayment result = check client->createChecksforPayment({CheckNumber: 1001, BankCode: "BANK01", CheckDate: "2026-07-01", CheckAmount: 1500.0});
```

**Sample response:**

```json
{
  "CheckKey": 1,
  "CheckNumber": 1001,
  "BankCode": "BANK01",
  "CheckDate": "2026-07-01",
  "CheckAmount": 1500.0,
  "CheckCurrency": "USD"
}
```

</details>

<details>
<summary>getChecksforPayment</summary>

Retrieves a single ChecksforPayment entity by its `CheckKey` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `checkKey` | <code>int:Signed32</code> | Yes | Key property 'CheckKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetChecksforPaymentQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `ChecksforPayment|error`

**Sample code:**

```ballerina
ChecksforPayment result = check client->getChecksforPayment(1);
```

**Sample response:**

```json
{
  "CheckKey": 1,
  "CheckNumber": 1001,
  "BankCode": "BANK01",
  "BankName": "First National Bank",
  "CheckDate": "2026-07-01",
  "CheckAmount": 1500.0,
  "CheckCurrency": "USD",
  "VendorCode": "V10000"
}
```

</details>

<details>
<summary>deleteChecksforPayment</summary>

Deletes a ChecksforPayment entity identified by its `CheckKey` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `checkKey` | <code>int:Signed32</code> | Yes | Key property 'CheckKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteChecksforPayment(1);
```

</details>

<details>
<summary>updateChecksforPayment</summary>

Partially updates a ChecksforPayment entity (PATCH/MERGE semantics) identified by its `CheckKey` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `checkKey` | <code>int:Signed32</code> | Yes | Key property 'CheckKey' (Edm.Int32) |
| `payload` | <code>ChecksforPayment</code> | Yes | The check for payment fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateChecksforPayment(1, {Details: "Updated details"});
```

</details>

#### FactoringIndicators

<details>
<summary>listFactoringIndicators</summary>

Queries the FactoringIndicators collection and returns a page of factoring indicator entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListFactoringIndicatorsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListFactoringIndicatorsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `FactoringIndicatorsCollectionResponse|error`

**Sample code:**

```ballerina
FactoringIndicatorsCollectionResponse result = check client->listFactoringIndicators();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#FactoringIndicators",
  "value": [
    {
      "IndicatorCode": "F01",
      "IndicatorName": "Standard factoring"
    }
  ],
  "odata.nextLink": "FactoringIndicators?$skip=20"
}
```

</details>

<details>
<summary>createFactoringIndicators</summary>

Creates a new FactoringIndicator entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FactoringIndicator</code> | Yes | The factoring indicator to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `FactoringIndicator|error`

**Sample code:**

```ballerina
FactoringIndicator result = check client->createFactoringIndicators({IndicatorCode: "F01", IndicatorName: "Standard factoring"});
```

**Sample response:**

```json
{
  "IndicatorCode": "F01",
  "IndicatorName": "Standard factoring"
}
```

</details>

<details>
<summary>getFactoringIndicators</summary>

Retrieves a single FactoringIndicator entity by its `IndicatorCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `indicatorCode` | <code>string</code> | Yes | Key property 'IndicatorCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFactoringIndicatorsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `FactoringIndicator|error`

**Sample code:**

```ballerina
FactoringIndicator result = check client->getFactoringIndicators("F01");
```

**Sample response:**

```json
{
  "IndicatorCode": "F01",
  "IndicatorName": "Standard factoring"
}
```

</details>

<details>
<summary>deleteFactoringIndicators</summary>

Deletes a FactoringIndicator entity identified by its `IndicatorCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `indicatorCode` | <code>string</code> | Yes | Key property 'IndicatorCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFactoringIndicators("F01");
```

</details>

<details>
<summary>updateFactoringIndicators</summary>

Partially updates a FactoringIndicator entity (PATCH/MERGE semantics) identified by its `IndicatorCode` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `indicatorCode` | <code>string</code> | Yes | Key property 'IndicatorCode' (Edm.String) |
| `payload` | <code>FactoringIndicator</code> | Yes | The factoring indicator fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFactoringIndicators("F01", {IndicatorName: "Updated name"});
```

</details>

#### PaymentWizards

<details>
<summary>paymentWizardServiceGetList</summary>

Retrieves the payment wizard list via the PaymentWizardService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_14|error`

**Sample code:**

```ballerina
inline_response_200_14 result = check client->paymentWizardServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#SAPB1.PaymentWizardParams",
  "value": [
    {
      "IdNumber": 1,
      "WizardName": "July payment run"
    }
  ]
}
```

</details>

<details>
<summary>listPaymentWizards</summary>

Queries the PaymentWizards collection and returns a page of payment wizard entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPaymentWizardsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` for paging control |
| `queries` | <code>ListPaymentWizardsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `PaymentWizardsCollectionResponse|error`

**Sample code:**

```ballerina
PaymentWizardsCollectionResponse result = check client->listPaymentWizards();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v2/$metadata#PaymentWizards",
  "value": [
    {
      "IdNumber": 1,
      "WizardName": "July payment run",
      "OutgoingType": "pwt_Outgoing",
      "PmntDate": "2026-07-15",
      "CheckPaymentMethod": "pm_Check",
      "BankTransferPaymentMethod": "pm_BankTransfer"
    }
  ],
  "odata.nextLink": "PaymentWizards?$skip=20"
}
```

</details>

<details>
<summary>createPaymentWizards</summary>

Creates a new PaymentWizard entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentWizard</code> | Yes | The payment wizard to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaymentWizard|error`

**Sample code:**

```ballerina
PaymentWizard result = check client->createPaymentWizards({wizardName: "July payment run", pmntDate: "2026-07-15"});
```

**Sample response:**

```json
{
  "IdNumber": 1,
  "WizardName": "July payment run",
  "OutgoingType": "pwt_Outgoing",
  "PmntDate": "2026-07-15"
}
```

</details>

<details>
<summary>getPaymentWizards</summary>

Retrieves a single PaymentWizard entity by its `IdNumber` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `idNumber` | <code>int:Signed32</code> | Yes | Key property 'IdNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentWizardsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `PaymentWizard|error`

**Sample code:**

```ballerina
PaymentWizard result = check client->getPaymentWizards(1);
```

**Sample response:**

```json
{
  "IdNumber": 1,
  "WizardName": "July payment run",
  "OutgoingType": "pwt_Outgoing",
  "IncomingType": "pwt_Incoming",
  "PmntDate": "2026-07-15",
  "CheckPaymentMethod": "pm_Check"
}
```

</details>

<details>
<summary>deletePaymentWizards</summary>

Deletes a PaymentWizard entity identified by its `IdNumber` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `idNumber` | <code>int:Signed32</code> | Yes | Key property 'IdNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentWizards(1);
```

</details>

<details>
<summary>updatePaymentWizards</summary>

Partially updates a PaymentWizard entity (PATCH/MERGE semantics) identified by its `IdNumber` key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `idNumber` | <code>int:Signed32</code> | Yes | Key property 'IdNumber' (Edm.Int32) |
| `payload` | <code>PaymentWizard</code> | Yes | The payment wizard fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentWizards(1, {wizardName: "Updated wizard name"});
```

</details>
#### BOEPortfolios

<details>
<summary>listBOEPortfolios</summary>

Queries the BOEPortfolios collection and returns a page of bill of exchange portfolio entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBOEPortfoliosHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListBOEPortfoliosQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `BOEPortfoliosCollectionResponse|error`

**Sample code:**

```ballerina
BOEPortfoliosCollectionResponse response = check client->listBOEPortfolios();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#BOEPortfolios",
  "value": [
    {
      "PortfolioEntry": 1,
      "PortfolioNum": "P001",
      "PortfolioID": "PF-01",
      "PortfolioDescription": "Main BOE portfolio",
      "PortfolioCode": "MAIN"
    }
  ],
  "odata.nextLink": "BOEPortfolios?$skip=20"
}
```

</details>

<details>
<summary>createBOEPortfolios</summary>

Creates a new bill of exchange portfolio entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BOEPortfolio</code> | Yes | The BOEPortfolio entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BOEPortfolio|error`

**Sample code:**

```ballerina
BOEPortfolio created = check client->createBOEPortfolios({portfolioNum: "P002", portfolioDescription: "Discount portfolio"});
```

**Sample response:**

```json
{
  "PortfolioEntry": 2,
  "PortfolioNum": "P002",
  "PortfolioID": "PF-02",
  "PortfolioDescription": "Discount portfolio",
  "PortfolioCode": "DISC"
}
```

</details>

<details>
<summary>getBOEPortfolios</summary>

Retrieves a single BOEPortfolio entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `portfolioEntry` | <code>int:Signed32</code> | Yes | Key property 'PortfolioEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBOEPortfoliosQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `BOEPortfolio|error`

**Sample code:**

```ballerina
BOEPortfolio portfolio = check client->getBOEPortfolios(1);
```

**Sample response:**

```json
{
  "PortfolioEntry": 1,
  "PortfolioNum": "P001",
  "PortfolioID": "PF-01",
  "PortfolioDescription": "Main BOE portfolio",
  "PortfolioCode": "MAIN"
}
```

</details>

<details>
<summary>deleteBOEPortfolios</summary>

Deletes a BOEPortfolio entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `portfolioEntry` | <code>int:Signed32</code> | Yes | Key property 'PortfolioEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBOEPortfolios(1);
```

</details>

<details>
<summary>updateBOEPortfolios</summary>

Partially updates a BOEPortfolio entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `portfolioEntry` | <code>int:Signed32</code> | Yes | Key property 'PortfolioEntry' (Edm.Int32) |
| `payload` | <code>BOEPortfolio</code> | Yes | The fields of the BOEPortfolio to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBOEPortfolios(1, {portfolioDescription: "Updated description"});
```

</details>

<details>
<summary>bOEPortfoliosServiceGetBOEPortfolioList</summary>

Invokes the `BOEPortfoliosService_GetBOEPortfolioList` service operation to retrieve the list of BOE portfolios.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check client->bOEPortfoliosServiceGetBOEPortfolioList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.BOEPortfolioParams)",
  "value": [
    {
      "PortfolioID": "PF-01",
      "PortfolioEntry": 1,
      "PortfolioCode": "MAIN"
    }
  ]
}
```

</details>

#### Banks

<details>
<summary>listBanks</summary>

Queries the Banks collection and returns a page of bank entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBanksHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListBanksQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `BanksCollectionResponse|error`

**Sample code:**

```ballerina
BanksCollectionResponse response = check client->listBanks();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Banks",
  "value": [
    {
      "BankCode": "BNK01",
      "BankName": "First National Bank",
      "NextCheckNumber": 1001,
      "SwiftNo": "FNBKUS33",
      "IBAN": "US12345678901234567890",
      "CountryCode": "US",
      "PostOffice": "tNO",
      "AbsoluteEntry": 1,
      "DigitalPayments": "tNO"
    }
  ],
  "odata.nextLink": "Banks?$skip=20"
}
```

</details>

<details>
<summary>createBanks</summary>

Creates a new Bank entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Bank</code> | Yes | The Bank entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Bank|error`

**Sample code:**

```ballerina
Bank created = check client->createBanks({BankCode: "BNK02", BankName: "Community Bank", CountryCode: "US"});
```

**Sample response:**

```json
{
  "BankCode": "BNK02",
  "BankName": "Community Bank",
  "NextCheckNumber": 1,
  "CountryCode": "US",
  "PostOffice": "tNO",
  "AbsoluteEntry": 2,
  "DigitalPayments": "tNO"
}
```

</details>

<details>
<summary>getBanks</summary>

Retrieves a single Bank entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBanksQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `Bank|error`

**Sample code:**

```ballerina
Bank bank = check client->getBanks(1);
```

**Sample response:**

```json
{
  "BankCode": "BNK01",
  "BankName": "First National Bank",
  "SwiftNo": "FNBKUS33",
  "IBAN": "US12345678901234567890",
  "CountryCode": "US",
  "AbsoluteEntry": 1
}
```

</details>

<details>
<summary>deleteBanks</summary>

Deletes a Bank entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBanks(2);
```

</details>

<details>
<summary>updateBanks</summary>

Partially updates a Bank entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `payload` | <code>Bank</code> | Yes | The fields of the Bank to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBanks(1, {BankName: "First National Bank Ltd."});
```

</details>

#### CreditCardPayments

<details>
<summary>listCreditCardPayments</summary>

Queries the CreditCardPayments collection and returns a page of credit card payment (due date) entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCreditCardPaymentsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListCreditCardPaymentsQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `CreditCardPaymentsCollectionResponse|error`

**Sample code:**

```ballerina
CreditCardPaymentsCollectionResponse response = check client->listCreditCardPayments();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#CreditCardPayments",
  "value": [
    {
      "DueDateCode": "MONTHLY",
      "DueDateName": "Monthly settlement",
      "DueDatesType": "ddtInDays",
      "PaymentAfterDays": 30,
      "PaymentAfterMonths": 0
    }
  ],
  "odata.nextLink": "CreditCardPayments?$skip=20"
}
```

</details>

<details>
<summary>createCreditCardPayments</summary>

Creates a new CreditCardPayment entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditCardPayment</code> | Yes | The CreditCardPayment entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreditCardPayment|error`

**Sample code:**

```ballerina
CreditCardPayment created = check client->createCreditCardPayments({DueDateCode: "WEEKLY", DueDateName: "Weekly settlement"});
```

**Sample response:**

```json
{
  "DueDateCode": "WEEKLY",
  "DueDateName": "Weekly settlement",
  "PaymentAfterDays": 7,
  "PaymentAfterMonths": 0
}
```

</details>

<details>
<summary>getCreditCardPayments</summary>

Retrieves a single CreditCardPayment entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dueDateCode` | <code>string</code> | Yes | Key property 'DueDateCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCreditCardPaymentsQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `CreditCardPayment|error`

**Sample code:**

```ballerina
CreditCardPayment payment = check client->getCreditCardPayments("MONTHLY");
```

**Sample response:**

```json
{
  "DueDateCode": "MONTHLY",
  "DueDateName": "Monthly settlement",
  "DueDatesType": "ddtInDays",
  "PaymentAfterDays": 30
}
```

</details>

<details>
<summary>deleteCreditCardPayments</summary>

Deletes a CreditCardPayment entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dueDateCode` | <code>string</code> | Yes | Key property 'DueDateCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCreditCardPayments("WEEKLY");
```

</details>

<details>
<summary>updateCreditCardPayments</summary>

Partially updates a CreditCardPayment entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dueDateCode` | <code>string</code> | Yes | Key property 'DueDateCode' (Edm.String) |
| `payload` | <code>CreditCardPayment</code> | Yes | The fields of the CreditCardPayment to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCreditCardPayments("MONTHLY", {PaymentAfterDays: 45});
```

</details>

#### CreditCards

<details>
<summary>listCreditCards</summary>

Queries the CreditCards collection and returns a page of credit card entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCreditCardsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListCreditCardsQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `CreditCardsCollectionResponse|error`

**Sample code:**

```ballerina
CreditCardsCollectionResponse response = check client->listCreditCards();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#CreditCards",
  "value": [
    {
      "CreditCardCode": 1,
      "CreditCardName": "Visa",
      "GLAccount": "_SYS00000000123",
      "Telephone": "555-0100",
      "CompanyID": "VISA-US",
      "CountryCode": "US"
    }
  ],
  "odata.nextLink": "CreditCards?$skip=20"
}
```

</details>

<details>
<summary>createCreditCards</summary>

Creates a new CreditCard entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreditCard</code> | Yes | The CreditCard entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreditCard|error`

**Sample code:**

```ballerina
CreditCard created = check client->createCreditCards({CreditCardName: "MasterCard", GLAccount: "_SYS00000000124"});
```

**Sample response:**

```json
{
  "CreditCardCode": 2,
  "CreditCardName": "MasterCard",
  "GLAccount": "_SYS00000000124",
  "CountryCode": "US"
}
```

</details>

<details>
<summary>getCreditCards</summary>

Retrieves a single CreditCard entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `creditCardCode` | <code>int:Signed32</code> | Yes | Key property 'CreditCardCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCreditCardsQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `CreditCard|error`

**Sample code:**

```ballerina
CreditCard card = check client->getCreditCards(1);
```

**Sample response:**

```json
{
  "CreditCardCode": 1,
  "CreditCardName": "Visa",
  "GLAccount": "_SYS00000000123",
  "CompanyID": "VISA-US",
  "CountryCode": "US"
}
```

</details>

<details>
<summary>deleteCreditCards</summary>

Deletes a CreditCard entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `creditCardCode` | <code>int:Signed32</code> | Yes | Key property 'CreditCardCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCreditCards(2);
```

</details>

<details>
<summary>updateCreditCards</summary>

Partially updates a CreditCard entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `creditCardCode` | <code>int:Signed32</code> | Yes | Key property 'CreditCardCode' (Edm.Int32) |
| `payload` | <code>CreditCard</code> | Yes | The fields of the CreditCard to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCreditCards(1, {Telephone: "555-0199"});
```

</details>

#### HouseBankAccounts

<details>
<summary>listHouseBankAccounts</summary>

Queries the HouseBankAccounts collection and returns a page of house bank account entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListHouseBankAccountsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListHouseBankAccountsQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `HouseBankAccountsCollectionResponse|error`

**Sample code:**

```ballerina
HouseBankAccountsCollectionResponse response = check client->listHouseBankAccounts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#HouseBankAccounts",
  "value": [
    {
      "BankCode": "BNK01",
      "AccNo": "1234567890",
      "Branch": "Main",
      "NextCheckNo": 1001,
      "GLAccount": "_SYS00000000101",
      "Country": "US",
      "IBAN": "US12345678901234567890",
      "AbsoluteEntry": 1,
      "BankKey": 1
    }
  ],
  "odata.nextLink": "HouseBankAccounts?$skip=20"
}
```

</details>

<details>
<summary>createHouseBankAccounts</summary>

Creates a new HouseBankAccount entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>HouseBankAccount</code> | Yes | The HouseBankAccount entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `HouseBankAccount|error`

**Sample code:**

```ballerina
HouseBankAccount created = check client->createHouseBankAccounts({BankCode: "BNK01", AccNo: "9876543210", Branch: "Downtown", GLAccount: "_SYS00000000102"});
```

**Sample response:**

```json
{
  "BankCode": "BNK01",
  "AccNo": "9876543210",
  "Branch": "Downtown",
  "GLAccount": "_SYS00000000102",
  "AbsoluteEntry": 2,
  "BankKey": 1
}
```

</details>

<details>
<summary>getHouseBankAccounts</summary>

Retrieves a single HouseBankAccount entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHouseBankAccountsQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `HouseBankAccount|error`

**Sample code:**

```ballerina
HouseBankAccount account = check client->getHouseBankAccounts(1);
```

**Sample response:**

```json
{
  "BankCode": "BNK01",
  "AccNo": "1234567890",
  "Branch": "Main",
  "GLAccount": "_SYS00000000101",
  "IBAN": "US12345678901234567890",
  "AbsoluteEntry": 1,
  "BankKey": 1
}
```

</details>

<details>
<summary>deleteHouseBankAccounts</summary>

Deletes a HouseBankAccount entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteHouseBankAccounts(2);
```

</details>

<details>
<summary>updateHouseBankAccounts</summary>

Partially updates a HouseBankAccount entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `payload` | <code>HouseBankAccount</code> | Yes | The fields of the HouseBankAccount to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateHouseBankAccounts(1, {Branch: "Head Office"});
```

</details>

#### IncomingPayments

<details>
<summary>listIncomingPayments</summary>

Queries the IncomingPayments collection and returns a page of incoming payment entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIncomingPaymentsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListIncomingPaymentsQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `IncomingPaymentsCollectionResponse|error`

**Sample code:**

```ballerina
IncomingPaymentsCollectionResponse response = check client->listIncomingPayments();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#IncomingPayments",
  "value": [
    {
      "DocNum": 100,
      "DocType": "rCustomer",
      "DocDate": "2026-07-01",
      "CardCode": "C20000",
      "CardName": "Maxi-Teq",
      "DocCurrency": "USD",
      "CashSum": 1500.0
    }
  ],
  "odata.nextLink": "IncomingPayments?$skip=20"
}
```

</details>

<details>
<summary>createIncomingPayments</summary>

Creates a new incoming Payment entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Payment</code> | Yes | The Payment entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment created = check client->createIncomingPayments({CardCode: "C20000", DocDate: "2026-07-10", CashSum: 1500.0d, CashAccount: "_SYS00000000301"});
```

**Sample response:**

```json
{
  "DocNum": 101,
  "DocType": "rCustomer",
  "DocDate": "2026-07-10",
  "CardCode": "C20000",
  "CardName": "Maxi-Teq",
  "CashAccount": "_SYS00000000301",
  "DocCurrency": "USD",
  "CashSum": 1500.0
}
```

</details>

<details>
<summary>getIncomingPayments</summary>

Retrieves a single incoming Payment entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIncomingPaymentsQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment payment = check client->getIncomingPayments(101);
```

**Sample response:**

```json
{
  "DocNum": 101,
  "DocType": "rCustomer",
  "DocDate": "2026-07-10",
  "CardCode": "C20000",
  "CardName": "Maxi-Teq",
  "DocCurrency": "USD",
  "CashSum": 1500.0
}
```

</details>

<details>
<summary>deleteIncomingPayments</summary>

Deletes an incoming Payment entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteIncomingPayments(101);
```

</details>

<details>
<summary>updateIncomingPayments</summary>

Partially updates an incoming Payment entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Payment</code> | Yes | The fields of the Payment to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateIncomingPayments(101, {Remarks: "Adjusted payment"});
```

</details>

<details>
<summary>incomingPaymentsCancel</summary>

Invokes the bound action 'Cancel' on an incoming payment (binding type Payment); no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->incomingPaymentsCancel(101);
```

</details>

<details>
<summary>incomingPaymentsCancelbyCurrentSystemDate</summary>

Invokes the bound action 'CancelbyCurrentSystemDate' on an incoming payment (binding type Payment), cancelling it using the current system date; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->incomingPaymentsCancelbyCurrentSystemDate(101);
```

</details>

<details>
<summary>incomingPaymentsGetApprovalTemplates</summary>

Invokes the bound action 'GetApprovalTemplates' on an incoming payment (binding type Payment) and returns the function result.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment result = check client->incomingPaymentsGetApprovalTemplates(101);
```

**Sample response:**

```json
{
  "DocNum": 101,
  "DocType": "rCustomer",
  "CardCode": "C20000",
  "DocDate": "2026-07-10"
}
```

</details>

<details>
<summary>incomingPaymentsRequestApproveCancellation</summary>

Invokes the bound action 'RequestApproveCancellation' on an incoming payment (binding type Payment); no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->incomingPaymentsRequestApproveCancellation(101);
```

</details>

<details>
<summary>incomingPaymentsSaveDraftToDocument</summary>

Invokes the bound action 'SaveDraftToDocument' on an incoming payment (binding type Payment), saving a draft as a document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->incomingPaymentsSaveDraftToDocument(101);
```

</details>

<details>
<summary>incomingPaymentsServiceHandleApprovalRequest</summary>

Invokes the `IncomingPaymentsService_HandleApprovalRequest` service operation to handle an approval request; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->incomingPaymentsServiceHandleApprovalRequest();
```

</details>

#### PaymentRunExport

<details>
<summary>listPaymentRunExport</summary>

Queries the PaymentRunExport collection and returns a page of payment run export entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPaymentRunExportHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListPaymentRunExportQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `PaymentRunExportCollectionResponse|error`

**Sample code:**

```ballerina
PaymentRunExportCollectionResponse response = check client->listPaymentRunExport();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#PaymentRunExport",
  "value": [
    {
      "AbsoluteEntry": 1,
      "RunDate": "2026-07-01",
      "VendorNum": "V10000",
      "PaymentMethod": "OutWire",
      "DocNum": 500,
      "PayeeName": "Acme Supplies",
      "Currency": "USD",
      "DocAmountLocal": 2500.0
    }
  ],
  "odata.nextLink": "PaymentRunExport?$skip=20"
}
```

</details>

<details>
<summary>createPaymentRunExport</summary>

Creates a new PaymentRunExport entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentRunExport</code> | Yes | The PaymentRunExport entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaymentRunExport|error`

**Sample code:**

```ballerina
PaymentRunExport created = check client->createPaymentRunExport({RunDate: "2026-07-10", VendorNum: "V10000", PaymentMethod: "OutWire"});
```

**Sample response:**

```json
{
  "AbsoluteEntry": 2,
  "RunDate": "2026-07-10",
  "VendorNum": "V10000",
  "PaymentMethod": "OutWire",
  "Currency": "USD"
}
```

</details>

<details>
<summary>getPaymentRunExport</summary>

Retrieves a single PaymentRunExport entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentRunExportQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `PaymentRunExport|error`

**Sample code:**

```ballerina
PaymentRunExport export = check client->getPaymentRunExport(1);
```

**Sample response:**

```json
{
  "AbsoluteEntry": 1,
  "RunDate": "2026-07-01",
  "VendorNum": "V10000",
  "PaymentMethod": "OutWire",
  "PayeeName": "Acme Supplies",
  "Currency": "USD",
  "DocAmountLocal": 2500.0
}
```

</details>

<details>
<summary>deletePaymentRunExport</summary>

Deletes a PaymentRunExport entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentRunExport(2);
```

</details>

<details>
<summary>updatePaymentRunExport</summary>

Partially updates a PaymentRunExport entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `payload` | <code>PaymentRunExport</code> | Yes | The fields of the PaymentRunExport to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentRunExport(1, {PayeeName: "Acme Supplies Inc."});
```

</details>

#### VendorPayments

<details>
<summary>listVendorPayments</summary>

Queries the VendorPayments collection and returns a page of outgoing (vendor) payment entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListVendorPaymentsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` |
| `queries` | <code>ListVendorPaymentsQueries</code> | No | OData query options such as `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `VendorPaymentsCollectionResponse|error`

**Sample code:**

```ballerina
VendorPaymentsCollectionResponse response = check client->listVendorPayments();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#VendorPayments",
  "value": [
    {
      "DocNum": 200,
      "DocType": "rSupplier",
      "DocDate": "2026-07-01",
      "CardCode": "V10000",
      "CardName": "Acme Supplies",
      "DocCurrency": "USD",
      "CashSum": 2500.0
    }
  ],
  "odata.nextLink": "VendorPayments?$skip=20"
}
```

</details>

<details>
<summary>createVendorPayments</summary>

Creates a new vendor Payment entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Payment</code> | Yes | The Payment entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment created = check client->createVendorPayments({CardCode: "V10000", DocDate: "2026-07-10", CashSum: 2500.0d, CashAccount: "_SYS00000000301"});
```

**Sample response:**

```json
{
  "DocNum": 201,
  "DocType": "rSupplier",
  "DocDate": "2026-07-10",
  "CardCode": "V10000",
  "CardName": "Acme Supplies",
  "CashAccount": "_SYS00000000301",
  "DocCurrency": "USD",
  "CashSum": 2500.0
}
```

</details>

<details>
<summary>getVendorPayments</summary>

Retrieves a single vendor Payment entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetVendorPaymentsQueries</code> | No | OData query options such as `$expand` and `$select` |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment payment = check client->getVendorPayments(201);
```

**Sample response:**

```json
{
  "DocNum": 201,
  "DocType": "rSupplier",
  "DocDate": "2026-07-10",
  "CardCode": "V10000",
  "CardName": "Acme Supplies",
  "DocCurrency": "USD",
  "CashSum": 2500.0
}
```

</details>

<details>
<summary>deleteVendorPayments</summary>

Deletes a vendor Payment entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteVendorPayments(201);
```

</details>

<details>
<summary>updateVendorPayments</summary>

Partially updates a vendor Payment entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Payment</code> | Yes | The fields of the Payment to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateVendorPayments(201, {Remarks: "Corrected amount"});
```

</details>

<details>
<summary>vendorPaymentsCancel</summary>

Invokes the bound action 'Cancel' on a vendor payment (binding type Payment); no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->vendorPaymentsCancel(201);
```

</details>

<details>
<summary>vendorPaymentsCancelbyCurrentSystemDate</summary>

Invokes the bound action 'CancelbyCurrentSystemDate' on a vendor payment (binding type Payment), cancelling it using the current system date; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->vendorPaymentsCancelbyCurrentSystemDate(201);
```

</details>

<details>
<summary>vendorPaymentsGetApprovalTemplates</summary>

Invokes the bound action 'GetApprovalTemplates' on a vendor payment (binding type Payment) and returns the function result.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Payment|error`

**Sample code:**

```ballerina
Payment result = check client->vendorPaymentsGetApprovalTemplates(201);
```

**Sample response:**

```json
{
  "DocNum": 201,
  "DocType": "rSupplier",
  "CardCode": "V10000",
  "DocDate": "2026-07-10"
}
```

</details>

<details>
<summary>vendorPaymentsRequestApproveCancellation</summary>

Invokes the bound action 'RequestApproveCancellation' on a vendor payment (binding type Payment); no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->vendorPaymentsRequestApproveCancellation(201);
```

</details>

<details>
<summary>vendorPaymentsSaveDraftToDocument</summary>

Invokes the bound action 'SaveDraftToDocument' on a vendor payment (binding type Payment), saving a draft as a document; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->vendorPaymentsSaveDraftToDocument(201);
```

</details>

<details>
<summary>vendorPaymentsServiceHandleApprovalRequest</summary>

Invokes the `VendorPaymentsService_HandleApprovalRequest` service operation to handle an approval request; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->vendorPaymentsServiceHandleApprovalRequest();
```

</details>
