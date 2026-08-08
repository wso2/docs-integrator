---
title: Actions
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.procurement` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Microsoft Dynamics 365 Finance Procurement entities (delivery terms, discount rates, intent letters, and vendor invoice declarations) via OData. |

---

## Client

Provides access to Microsoft Dynamics 365 Finance Procurement entities (delivery terms, discount rates, intent letters, and vendor invoice declarations) via OData.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials configuration containing `tokenUrl`, `clientId`, `clientSecret`, and `scopes` for authenticating against Microsoft Entra ID. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig?` | `()` | HTTP proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.procurement;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

procurement:Client fo = check new (
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

#### Delivery Terms

<details>
<summary>listDeliveryTerms</summary>

Lists DeliveryTerm records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDeliveryTermsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DeliveryTermsCollection|error`

Sample code:

```ballerina
procurement:DeliveryTermsCollection result = check fo->listDeliveryTerms(
    queries = {
        filter: "FreightChargeTerms eq 'Prepaid'",
        orderby: "TermsCode",
        top: 10
    }
);
```

</details>

<details>
<summary>createDeliveryTerms</summary>

Creates a new DeliveryTerm.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DeliveryTerm` | Yes | The DeliveryTerm record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DeliveryTerm|error`

Sample code:

```ballerina
procurement:DeliveryTerm payload = {
    dataAreaId: "USMF",
    termsCode: "NET30",
    termsDescription: "Net 30 days",
    isCashOnDelivery: "No",
    freightChargeTerms: "Prepaid",
    portMandatory: "No",
    goodsInTransitControl: "No"
};
procurement:DeliveryTerm result = check fo->createDeliveryTerms(payload);
```

</details>

<details>
<summary>getDeliveryTerms</summary>

Retrieves a single DeliveryTerm by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `termsCode` | `string` | Yes | The terms code key field, e.g. `"NET30"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDeliveryTermsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DeliveryTerm|error`

Sample code:

```ballerina
procurement:DeliveryTerm result = check fo->getDeliveryTerms(
    "USMF",
    "NET30",
    queries = {
        'select: "TermsCode,TermsDescription,FreightChargeTerms"
    }
);
```

</details>

<details>
<summary>deleteDeliveryTerms</summary>

Deletes a DeliveryTerm by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `termsCode` | `string` | Yes | The terms code key field, e.g. `"NET30"`. |
| `headers` | `DeleteDeliveryTermsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDeliveryTerms("USMF", "NET30");
```

</details>

<details>
<summary>updateDeliveryTerms</summary>

Updates an existing DeliveryTerm.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `termsCode` | `string` | Yes | The terms code key field, e.g. `"NET30"`. |
| `payload` | `DeliveryTerm` | Yes | The fields to update. |
| `headers` | `UpdateDeliveryTermsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DeliveryTerm|error`

Sample code:

```ballerina
procurement:DeliveryTerm payload = {
    termsDescription: "Net 30 days - revised"
};
procurement:DeliveryTerm result = check fo->updateDeliveryTerms("USMF", "NET30", payload);
```

</details>

#### Discount Rates

<details>
<summary>listDiscountRates</summary>

Lists DiscountRate records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDiscountRatesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DiscountRatesCollection|error`

Sample code:

```ballerina
procurement:DiscountRatesCollection result = check fo->listDiscountRates(
    queries = {
        filter: "MarketDiscountRatePercentage gt 0",
        orderby: "StartDate desc",
        crossCompany: true
    }
);
```

</details>

<details>
<summary>createDiscountRates</summary>

Creates a new DiscountRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DiscountRate` | Yes | The DiscountRate record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `DiscountRate|error`

Sample code:

```ballerina
procurement:DiscountRate payload = {
    dataAreaId: "USMF",
    startDate: "2026-01-01",
    marketDiscountRatePercentage: 2.5
};
procurement:DiscountRate result = check fo->createDiscountRates(payload);
```

</details>

<details>
<summary>getDiscountRates</summary>

Retrieves a single DiscountRate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDiscountRatesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `DiscountRate|error`

Sample code:

```ballerina
procurement:DiscountRate result = check fo->getDiscountRates("USMF", "2026-01-01");
```

</details>

<details>
<summary>deleteDiscountRates</summary>

Deletes a DiscountRate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `headers` | `DeleteDiscountRatesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDiscountRates("USMF", "2026-01-01");
```

</details>

<details>
<summary>updateDiscountRates</summary>

Updates an existing DiscountRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-01-01"`. |
| `payload` | `DiscountRate` | Yes | The fields to update. |
| `headers` | `UpdateDiscountRatesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `DiscountRate|error`

Sample code:

```ballerina
procurement:DiscountRate payload = {
    marketDiscountRatePercentage: 3.0
};
procurement:DiscountRate result = check fo->updateDiscountRates("USMF", "2026-01-01", payload);
```

</details>

#### Intent Letters

<details>
<summary>listIntentLetters</summary>

Lists IntentLetter records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListIntentLettersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `IntentLettersCollection|error`

Sample code:

```ballerina
procurement:IntentLettersCollection result = check fo->listIntentLetters(
    queries = {
        filter: "Status eq 'Open' and VendAccount eq 'V-1002'",
        orderby: "IntentLetterDate desc",
        top: 20
    }
);
```

</details>

<details>
<summary>createIntentLetters</summary>

Creates a new IntentLetter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IntentLetter` | Yes | The IntentLetter record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `IntentLetter|error`

Sample code:

```ballerina
procurement:IntentLetter payload = {
    dataAreaId: "ITMF",
    intentLetterId: "IL-2026-001",
    vendAccount: "V-1002",
    vendName: "Rossi Forniture Srl",
    intentLetterType: "Period",
    purchaseType: "Purchase",
    fromDate: "2026-01-01",
    toDate: "2026-12-31",
    intentLetterAmountMST: 50000.00,
    intentLetterYear: 2026,
    status: "Open"
};
procurement:IntentLetter result = check fo->createIntentLetters(payload);
```

</details>

<details>
<summary>getIntentLetters</summary>

Retrieves a single IntentLetter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ITMF"`. |
| `intentLetterId` | `string` | Yes | The intent letter id key field, e.g. `"IL-2026-001"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetIntentLettersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `IntentLetter|error`

Sample code:

```ballerina
procurement:IntentLetter result = check fo->getIntentLetters(
    "ITMF",
    "IL-2026-001",
    queries = {
        'select: "IntentLetterId,Status,IntentLetterAmountMST,ToDate"
    }
);
```

</details>

<details>
<summary>deleteIntentLetters</summary>

Deletes an IntentLetter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ITMF"`. |
| `intentLetterId` | `string` | Yes | The intent letter id key field, e.g. `"IL-2026-001"`. |
| `headers` | `DeleteIntentLettersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteIntentLetters("ITMF", "IL-2026-001");
```

</details>

<details>
<summary>updateIntentLetters</summary>

Updates an existing IntentLetter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ITMF"`. |
| `intentLetterId` | `string` | Yes | The intent letter id key field, e.g. `"IL-2026-001"`. |
| `payload` | `IntentLetter` | Yes | The fields to update. |
| `headers` | `UpdateIntentLettersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `IntentLetter|error`

Sample code:

```ballerina
procurement:IntentLetter payload = {
    status: "Closed",
    closedDate: "2026-12-31",
    closingNotes: "Fully utilized within validity period"
};
procurement:IntentLetter result = check fo->updateIntentLetters("ITMF", "IL-2026-001", payload);
```

</details>

#### Vendor Invoice Declarations

<details>
<summary>listVendorInvoiceDeclarations</summary>

Lists VendorInvoiceDeclaration records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVendorInvoiceDeclarationsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VendorInvoiceDeclarationsCollection|error`

Sample code:

```ballerina
procurement:VendorInvoiceDeclarationsCollection result = check fo->listVendorInvoiceDeclarations(
    queries = {
        filter: "RecordType eq 'LS'",
        'select: "InvoiceDeclarationId,Description,ReportingCode"
    }
);
```

</details>

<details>
<summary>createVendorInvoiceDeclarations</summary>

Creates a new VendorInvoiceDeclaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorInvoiceDeclaration` | Yes | The VendorInvoiceDeclaration record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VendorInvoiceDeclaration|error`

Sample code:

```ballerina
procurement:VendorInvoiceDeclaration payload = {
    dataAreaId: "ISMF",
    invoiceDeclarationId: "DECL-2026-01",
    description: "Monthly vendor invoice declaration",
    recordType: "LS",
    reportingCode: "RC-100"
};
procurement:VendorInvoiceDeclaration result = check fo->createVendorInvoiceDeclarations(payload);
```

</details>

<details>
<summary>getVendorInvoiceDeclarations</summary>

Retrieves a single VendorInvoiceDeclaration by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ISMF"`. |
| `invoiceDeclarationId` | `string` | Yes | The invoice declaration id key field, e.g. `"DECL-2026-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVendorInvoiceDeclarationsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VendorInvoiceDeclaration|error`

Sample code:

```ballerina
procurement:VendorInvoiceDeclaration result = check fo->getVendorInvoiceDeclarations("ISMF", "DECL-2026-01");
```

</details>

<details>
<summary>deleteVendorInvoiceDeclarations</summary>

Deletes a VendorInvoiceDeclaration by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ISMF"`. |
| `invoiceDeclarationId` | `string` | Yes | The invoice declaration id key field, e.g. `"DECL-2026-01"`. |
| `headers` | `DeleteVendorInvoiceDeclarationsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendorInvoiceDeclarations("ISMF", "DECL-2026-01");
```

</details>

<details>
<summary>updateVendorInvoiceDeclarations</summary>

Updates an existing VendorInvoiceDeclaration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"ISMF"`. |
| `invoiceDeclarationId` | `string` | Yes | The invoice declaration id key field, e.g. `"DECL-2026-01"`. |
| `payload` | `VendorInvoiceDeclaration` | Yes | The fields to update. |
| `headers` | `UpdateVendorInvoiceDeclarationsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VendorInvoiceDeclaration|error`

Sample code:

```ballerina
procurement:VendorInvoiceDeclaration payload = {
    reportingCode: "RC-101"
};
procurement:VendorInvoiceDeclaration result = check fo->updateVendorInvoiceDeclarations("ISMF", "DECL-2026-01", payload);
```

</details>
