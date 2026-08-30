---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.vendorpayment` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Microsoft Dynamics 365 Finance Vendor Payment entities — pay agreements, vendor pay-when-paid text, vendor payment journal headers and lines, and vendor payment methods — via the OData REST API. |

---

## Client

Provides access to Microsoft Dynamics 365 Finance Vendor Payment entities via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID; includes `tokenUrl`, `clientId`, `clientSecret`, and `scopes`. |
| `httpVersion` | `http:HttpVersion` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.vendorpayment;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

vendorpayment:Client fo = check new (
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

#### Pay Agreements

<details>
<summary>listPayAgreements</summary>

<div>

Retrieves a collection of pay agreements, supporting OData query options for filtering, sorting, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPayAgreementsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `PayAgreementsCollection|error`

Sample code:

```ballerina
vendorpayment:PayAgreementsCollection result = check fo->listPayAgreements(
    queries = {
        filter: "AccountType eq 'Vend'",
        top: 20,
        'select: "PayAgreementCode,Description,FromDate,ToDate"
    }
);
```

</div>

</details>

<details>
<summary>createPayAgreements</summary>

<div>

Creates a new pay agreement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PayAgreement` | Yes | Pay agreement fields such as the pay agreement code, description, validity dates, and overtime rounding settings. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PayAgreement|error`

Sample code:

```ballerina
vendorpayment:PayAgreement created = check fo->createPayAgreements({
    dataAreaId: "usmf",
    payAgreementCode: "STD",
    description: "Standard pay agreement",
    fromDate: "2026-01-01",
    toDate: "2026-12-31",
    overtimeRoundingType: "RoundUp",
    overtimeRoundingValue: "15",
    minutesToDeductWhenLate: "10"
});
```

</div>

</details>

<details>
<summary>getPayAgreements</summary>

<div>

Retrieves a single pay agreement by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payAgreementCode` | `string` | Yes | The pay agreement code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPayAgreementsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `PayAgreement|error`

Sample code:

```ballerina
vendorpayment:PayAgreement agreement = check fo->getPayAgreements("usmf", "STD");
```

</div>

</details>

<details>
<summary>deletePayAgreements</summary>

<div>

Deletes a pay agreement by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payAgreementCode` | `string` | Yes | The pay agreement code key field. |
| `headers` | `DeletePayAgreementsHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getPayAgreements call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
check fo->deletePayAgreements("usmf", "STD", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updatePayAgreements</summary>

<div>

Updates fields on an existing pay agreement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payAgreementCode` | `string` | Yes | The pay agreement code key field. |
| `payload` | `PayAgreement` | Yes | Fields to update on the pay agreement. |
| `headers` | `UpdatePayAgreementsHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `PayAgreement|error`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getPayAgreements call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
vendorpayment:PayAgreement updated = check fo->updatePayAgreements(
    "usmf",
    "STD",
    {description: "Standard pay agreement - revised"},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Vend PWP Txts

<details>
<summary>listVendPWPTxts</summary>

<div>

Retrieves a collection of vendor pay-when-paid text records, supporting OData query options for filtering, sorting, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendPWPTxtsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `VendPWPTxtsCollection|error`

Sample code:

```ballerina
vendorpayment:VendPWPTxtsCollection result = check fo->listVendPWPTxts(
    queries = {
        filter: "VendorAccount eq 'US-101'",
        top: 20
    }
);
```

</div>

</details>

<details>
<summary>createVendPWPTxts</summary>

<div>

Creates a new vendor pay-when-paid text record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendPWPTxt` | Yes | Pay-when-paid text fields, including the account code, vendor group, vendor account, and contract language. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VendPWPTxt|error`

Sample code:

```ballerina
vendorpayment:VendPWPTxt created = check fo->createVendPWPTxts({
    dataAreaId: "usmf",
    accountCode: "Table",
    vendorGroup: "40",
    vendorAccount: "US-101",
    payWhenPaidContractLanguage: "Payment will be issued within 10 business days of receipt of funds from the customer.",
    vendorRetentionContractLanguage: "10% retention held until final acceptance."
});
```

</div>

</details>

<details>
<summary>getVendPWPTxts</summary>

<div>

Retrieves a single vendor pay-when-paid text record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field. |
| `vendorGroup` | `string` | Yes | The vendor group key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendPWPTxtsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `VendPWPTxt|error`

Sample code:

```ballerina
vendorpayment:VendPWPTxt txt = check fo->getVendPWPTxts("usmf", "Table", "40");
```

</div>

</details>

<details>
<summary>deleteVendPWPTxts</summary>

<div>

Deletes a vendor pay-when-paid text record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field. |
| `vendorGroup` | `string` | Yes | The vendor group key field. |
| `headers` | `DeleteVendPWPTxtsHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendPWPTxts call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
check fo->deleteVendPWPTxts("usmf", "Table", "40", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateVendPWPTxts</summary>

<div>

Updates fields on an existing vendor pay-when-paid text record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `accountCode` | `string` | Yes | The account code key field. |
| `vendorGroup` | `string` | Yes | The vendor group key field. |
| `payload` | `VendPWPTxt` | Yes | Fields to update on the pay-when-paid text record. |
| `headers` | `UpdateVendPWPTxtsHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `VendPWPTxt|error`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendPWPTxts call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
vendorpayment:VendPWPTxt updated = check fo->updateVendPWPTxts(
    "usmf",
    "Table",
    "40",
    {payWhenPaidContractLanguage: "Payment will be issued within 15 business days of receipt of funds from the customer."},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Vendor Payment Journal Headers

<details>
<summary>listVendorPaymentJournalHeaders</summary>

<div>

Retrieves a collection of vendor payment journal headers, supporting OData query options for filtering, sorting, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorPaymentJournalHeadersQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `VendorPaymentJournalHeadersCollection|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentJournalHeadersCollection result = check fo->listVendorPaymentJournalHeaders(
    queries = {
        filter: "IsPosted eq 'No'",
        top: 20,
        'select: "JournalBatchNumber,JournalName,Description,IsPosted"
    }
);
```

</div>

</details>

<details>
<summary>createVendorPaymentJournalHeaders</summary>

<div>

Creates a new vendor payment journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorPaymentJournalHeader` | Yes | Journal header fields such as the journal name, description, and posting/tax override settings. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VendorPaymentJournalHeader|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentJournalHeader created = check fo->createVendorPaymentJournalHeaders({
    dataAreaId: "usmf",
    journalName: "VendPayment",
    description: "Vendor payment run - August 2026",
    isPosted: "No",
    overrideSalesTax: "No"
});
```

</div>

</details>

<details>
<summary>getVendorPaymentJournalHeaders</summary>

<div>

Retrieves a single vendor payment journal header by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorPaymentJournalHeadersQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `VendorPaymentJournalHeader|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentJournalHeader header = check fo->getVendorPaymentJournalHeaders("usmf", "VP-000123");
```

</div>

</details>

<details>
<summary>deleteVendorPaymentJournalHeaders</summary>

<div>

Deletes a vendor payment journal header by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `headers` | `DeleteVendorPaymentJournalHeadersHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendorPaymentJournalHeaders call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
check fo->deleteVendorPaymentJournalHeaders("usmf", "VP-000123", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateVendorPaymentJournalHeaders</summary>

<div>

Updates fields on an existing vendor payment journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `payload` | `VendorPaymentJournalHeader` | Yes | Fields to update on the journal header. |
| `headers` | `UpdateVendorPaymentJournalHeadersHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `VendorPaymentJournalHeader|error`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendorPaymentJournalHeaders call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
vendorpayment:VendorPaymentJournalHeader updated = check fo->updateVendorPaymentJournalHeaders(
    "usmf",
    "VP-000123",
    {description: "Vendor payment run - August 2026 (revised)"},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Vendor Payment Journal Lines

<details>
<summary>listVendorPaymentJournalLines</summary>

<div>

Retrieves a collection of vendor payment journal lines, supporting OData query options for filtering, sorting, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorPaymentJournalLinesQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `VendorPaymentJournalLinesCollection|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentJournalLinesCollection result = check fo->listVendorPaymentJournalLines(
    queries = {
        filter: "JournalBatchNumber eq 'VP-000123'",
        top: 50
    }
);
```

</div>

</details>

<details>
<summary>createVendorPaymentJournalLines</summary>

<div>

Creates a new vendor payment journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorPaymentJournalLine` | Yes | Journal line fields such as the account, offset account, amounts, currency, and payment method. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VendorPaymentJournalLine|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentJournalLine created = check fo->createVendorPaymentJournalLines({
    dataAreaId: "usmf",
    journalBatchNumber: "VP-000123",
    accountType: "Vend",
    accountDisplayValue: "US-101",
    offsetAccountType: "Bank",
    offsetAccountDisplayValue: "USMF OPER USD",
    currencyCode: "USD",
    creditAmount: 1500.00,
    paymentMethodName: "CHECK",
    transactionText: "Invoice settlement - INV-000456"
});
```

</div>

</details>

<details>
<summary>getVendorPaymentJournalLines</summary>

<div>

Retrieves a single vendor payment journal line by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorPaymentJournalLinesQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `VendorPaymentJournalLine|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentJournalLine line = check fo->getVendorPaymentJournalLines("usmf", "VP-000123", 1);
```

</div>

</details>

<details>
<summary>deleteVendorPaymentJournalLines</summary>

<div>

Deletes a vendor payment journal line by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `DeleteVendorPaymentJournalLinesHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendorPaymentJournalLines call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
check fo->deleteVendorPaymentJournalLines("usmf", "VP-000123", 1, {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateVendorPaymentJournalLines</summary>

<div>

Updates fields on an existing vendor payment journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `payload` | `VendorPaymentJournalLine` | Yes | Fields to update on the journal line. |
| `headers` | `UpdateVendorPaymentJournalLinesHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `VendorPaymentJournalLine|error`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendorPaymentJournalLines call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
vendorpayment:VendorPaymentJournalLine updated = check fo->updateVendorPaymentJournalLines(
    "usmf",
    "VP-000123",
    1,
    {creditAmount: 1750.00},
    {ifMatch: eTag}
);
```

</div>

</details>

#### Vendor Payment Methods

<details>
<summary>listVendorPaymentMethods</summary>

<div>

Retrieves a collection of vendor payment methods, supporting OData query options for filtering, sorting, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorPaymentMethodsQueries` | No | OData query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `VendorPaymentMethodsCollection|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentMethodsCollection result = check fo->listVendorPaymentMethods(
    queries = {
        filter: "PaymentType eq 'Check'",
        top: 20
    }
);
```

</div>

</details>

<details>
<summary>createVendorPaymentMethods</summary>

<div>

Creates a new vendor payment method.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorPaymentMethod` | Yes | Payment method fields such as the name, description, payment type, and payment journal name. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VendorPaymentMethod|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentMethod created = check fo->createVendorPaymentMethods({
    dataAreaId: "usmf",
    name: "CHECK",
    description: "Check payment",
    paymentType: "Check",
    paymentJournalName: "VendPayment",
    sumByPeriod: "Invoice",
    bankTransactionType: "Disbursement"
});
```

</div>

</details>

<details>
<summary>getVendorPaymentMethods</summary>

<div>

Retrieves a single vendor payment method by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorPaymentMethodsQueries` | No | OData query parameters: `expand`, `'select`. |

Returns: `VendorPaymentMethod|error`

Sample code:

```ballerina
vendorpayment:VendorPaymentMethod method = check fo->getVendorPaymentMethods("usmf", "CHECK");
```

</div>

</details>

<details>
<summary>deleteVendorPaymentMethods</summary>

<div>

Deletes a vendor payment method by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteVendorPaymentMethodsHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `error?`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendorPaymentMethods call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
check fo->deleteVendorPaymentMethods("usmf", "CHECK", {ifMatch: eTag});
```

</div>

</details>

<details>
<summary>updateVendorPaymentMethods</summary>

<div>

Updates fields on an existing vendor payment method.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `payload` | `VendorPaymentMethod` | Yes | Fields to update on the payment method. |
| `headers` | `UpdateVendorPaymentMethodsHeaders` | No | Headers for the request; the optional `ifMatch` field carries an ETag value for optimistic concurrency, mapped to the `If-Match` HTTP header. |

Returns: `VendorPaymentMethod|error`

Sample code:

```ballerina
// eTag obtained from the `ETag` response header of a prior getVendorPaymentMethods call.
// Using "*" here would match any current version and defeat the optimistic-concurrency check.
vendorpayment:VendorPaymentMethod updated = check fo->updateVendorPaymentMethods(
    "usmf",
    "CHECK",
    {description: "Check payment - revised"},
    {ifMatch: eTag}
);
```

</div>

</details>
