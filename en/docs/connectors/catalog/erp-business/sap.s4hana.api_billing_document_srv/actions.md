---
connector: true
connector_name: "sap.s4hana.api_billing_document_srv"
title: "Actions"
description: "Reference for the SAP Billing Document connector client: configuration, initialization, and every billing document, item, partner, pricing element, text, cancel and PDF operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_billing_document_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Reads SAP S/4HANA billing documents with their items, partners, pricing elements and texts, cancels billing documents and retrieves them in PDF format via the `API_BILLING_DOCUMENT_SRV` OData API. |

---

## Client

Reads SAP S/4HANA billing documents with their items, partners, pricing elements and texts, cancels billing documents and retrieves them in PDF format via the `API_BILLING_DOCUMENT_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_BILLING_DOCUMENT_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | Basic Auth credentials (username and password) of the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_billing_document_srv as billingdocument;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

billingdocument:Client billingDocClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    hostname
);
```

### Operations

A billing document (for example, an invoice, credit memo or debit memo) is identified by its billing document number (`BillingDocument`, up to 10 characters), and a billing document item by the billing document number and item number (`BillingDocumentItem`, up to 6 characters, for example `000010`). Partners are identified by their partner function (`PartnerFunction`, for example `AG` for the sold-to party and `RE` for the bill-to party), pricing elements by their step number and condition counter in the pricing procedure (`PricingProcedureStep` and `PricingProcedureCounter`, 3 characters each, for example `010` and `001`), and texts by their language and text ID (`Language` and `LongTextID`).

The service creates no billing documents and changes none directly. Apart from the read operations, it offers the cancel and PDF operations, which are OData function imports. Their `BillingDocument` query parameter must be enclosed in single quotes, for example `"'90000012'"`.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property and navigation names, and `$top` and `$skip` take integers. The text operations do not support `$expand`.

#### Billing documents

<details>
<summary>listA_BillingDocuments</summary>

<div>

Retrieves a collection of billing document headers, with the billing type, sales area, sold-to party, payer, amounts, payment terms and accounting status of each billing document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentWrapper result = check billingDocClient->listA_BillingDocuments(
    queries = {
        \$filter: "SalesOrganization eq '1710' and BillingDocumentIsCancelled eq false",
        \$top: 2,
        \$orderby: ["BillingDocumentDate desc"],
        \$select: ["BillingDocument", "BillingDocumentType", "BillingDocumentDate", "SoldToParty", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000014",
        "BillingDocumentType": "F2",
        "BillingDocumentDate": "/Date(1730851200000)/",
        "SoldToParty": "17100003",
        "TotalNetAmount": "2450.00",
        "TransactionCurrency": "USD"
      },
      {
        "BillingDocument": "90000012",
        "BillingDocumentType": "F2",
        "BillingDocumentDate": "/Date(1730764800000)/",
        "SoldToParty": "17100001",
        "TotalNetAmount": "1000.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocument</summary>

<div>

Retrieves the header of a specific billing document by its billing document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentWrapper billingDoc = check billingDocClient->getA_BillingDocument("90000012");
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "SDDocumentCategory": "M",
    "BillingDocumentCategory": "L",
    "BillingDocumentType": "F2",
    "CreationDate": "/Date(1730764800000)/",
    "CreationTime": "PT10H15M30S",
    "SalesOrganization": "1710",
    "DistributionChannel": "10",
    "Division": "00",
    "BillingDocumentDate": "/Date(1730764800000)/",
    "BillingDocumentIsCancelled": false,
    "CancelledBillingDocument": "",
    "TotalNetAmount": "1000.00",
    "TransactionCurrency": "USD",
    "TaxAmount": "80.00",
    "TotalGrossAmount": "1080.00",
    "IncotermsClassification": "EXW",
    "PayerParty": "17100001",
    "CustomerPaymentTerms": "0004",
    "CompanyCode": "1710",
    "FiscalYear": "2024",
    "AccountingDocument": "9400000012",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "PO-4711",
    "Country": "US",
    "OverallSDProcessStatus": "C",
    "AccountingPostingStatus": "C",
    "AccountingTransferStatus": "C"
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentOfA_BillingDocumentItem</summary>

<div>

Retrieves the billing document header that a specific billing document item belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentOfA_BillingDocumentItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentWrapper header = check billingDocClient->getBillingDocumentOfA_BillingDocumentItem(
    "90000012",
    "000010",
    queries = {
        \$select: ["BillingDocument", "BillingDocumentType", "SoldToParty", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentType": "F2",
    "SoldToParty": "17100001",
    "TotalNetAmount": "1000.00",
    "TransactionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentOfA_BillingDocumentPartner</summary>

<div>

Retrieves the billing document header that a specific header partner belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"RE"` for the bill-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentOfA_BillingDocumentPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentWrapper header = check billingDocClient->getBillingDocumentOfA_BillingDocumentPartner(
    "90000012",
    "RE",
    queries = {
        \$select: ["BillingDocument", "BillingDocumentDate", "PayerParty", "TotalGrossAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentDate": "/Date(1730764800000)/",
    "PayerParty": "17100001",
    "TotalGrossAmount": "1080.00",
    "TransactionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentOfA_BillingDocumentPrcgElmnt</summary>

<div>

Retrieves the billing document header that a specific header pricing element belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000014"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"100"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentOfA_BillingDocumentPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentWrapper header = check billingDocClient->getBillingDocumentOfA_BillingDocumentPrcgElmnt(
    "90000014",
    "100",
    "001",
    queries = {
        \$select: ["BillingDocument", "SDPricingProcedure", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000014",
    "SDPricingProcedure": "RVAA01",
    "TotalNetAmount": "2450.00",
    "TransactionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentOfA_BillingDocumentItemPartner</summary>

<div>

Retrieves the billing document header that a specific item partner belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentOfA_BillingDocumentItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentWrapper header = check billingDocClient->getBillingDocumentOfA_BillingDocumentItemPartner(
    "90000012",
    "000010",
    "WE",
    queries = {
        \$select: ["BillingDocument", "BillingDocumentType", "SoldToParty"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentType": "F2",
    "SoldToParty": "17100001"
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentOfA_BillingDocumentItemPrcgElmnt</summary>

<div>

Retrieves the billing document header that a specific item pricing element belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentOfA_BillingDocumentItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentWrapper header = check billingDocClient->getBillingDocumentOfA_BillingDocumentItemPrcgElmnt(
    "90000012",
    "000010",
    "010",
    "001",
    queries = {
        \$select: ["BillingDocument", "BillingDocumentType", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentType": "F2",
    "TotalNetAmount": "1000.00",
    "TransactionCurrency": "USD"
  }
}
```

</div>

</details>

#### Billing document items

<details>
<summary>listA_BillingDocumentItems</summary>

<div>

Retrieves a collection of billing document items across billing documents, with the material, plant, billed quantity, net amount and the reference sales order and delivery of each item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemWrapper items = check billingDocClient->listA_BillingDocumentItems(
    queries = {
        \$filter: "Material eq 'TG11'",
        \$top: 2,
        \$select: ["BillingDocument", "BillingDocumentItem", "Material", "BillingQuantity", "BillingQuantityUnit", "NetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "BillingDocumentItem": "000010",
        "Material": "TG11",
        "BillingQuantity": "10",
        "BillingQuantityUnit": "PC",
        "NetAmount": "1000.00",
        "TransactionCurrency": "USD"
      },
      {
        "BillingDocument": "90000014",
        "BillingDocumentItem": "000020",
        "Material": "TG11",
        "BillingQuantity": "5",
        "BillingQuantityUnit": "PC",
        "NetAmount": "500.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentItem</summary>

<div>

Retrieves a specific billing document item by its billing document number and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentItemWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentItemWrapper item = check billingDocClient->getA_BillingDocumentItem("90000012", "000010");
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentItem": "000010",
    "SalesDocumentItemCategory": "TAN",
    "CreatedByUser": "CB9980000010",
    "CreationDate": "/Date(1730764800000)/",
    "Division": "00",
    "Material": "TG11",
    "Plant": "1710",
    "StorageLocation": "171A",
    "BillingDocumentItemText": "Trading Good 11",
    "BillingQuantity": "10",
    "BillingQuantityUnit": "PC",
    "BillingQuantityInBaseUnit": "10",
    "BaseUnit": "PC",
    "NetAmount": "1000.00",
    "TransactionCurrency": "USD",
    "GrossAmount": "1000.00",
    "PricingDate": "/Date(1730678400000)/",
    "TaxAmount": "80.00",
    "ProfitCenter": "YB102",
    "ReferenceSDDocument": "80000012",
    "ReferenceSDDocumentItem": "000010",
    "ReferenceSDDocumentCategory": "J",
    "SalesDocument": "1234",
    "SalesDocumentItem": "10",
    "SalesSDDocumentCategory": "C",
    "ShippingPoint": "1710"
  }
}
```

</div>

</details>

<details>
<summary>listItemsOfA_BillingDocument</summary>

<div>

Retrieves the items of a specific billing document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemsOfA_BillingDocumentQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemWrapper items = check billingDocClient->listItemsOfA_BillingDocument(
    "90000012",
    queries = {
        \$select: ["BillingDocumentItem", "Material", "BillingQuantity", "BillingQuantityUnit", "NetAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocumentItem": "000010",
        "Material": "TG11",
        "BillingQuantity": "10",
        "BillingQuantityUnit": "PC",
        "NetAmount": "1000.00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentItemOfA_BillingDocumentItemPartner</summary>

<div>

Retrieves the billing document item that a specific item partner belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentItemOfA_BillingDocumentItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentItemWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentItemWrapper item = check billingDocClient->getBillingDocumentItemOfA_BillingDocumentItemPartner(
    "90000012",
    "000010",
    "WE",
    queries = {
        \$select: ["BillingDocument", "BillingDocumentItem", "Material", "NetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentItem": "000010",
    "Material": "TG11",
    "NetAmount": "1000.00",
    "TransactionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>getBillingDocumentItemOfA_BillingDocumentItemPrcgElmnt</summary>

<div>

Retrieves the billing document item that a specific item pricing element belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingDocumentItemOfA_BillingDocumentItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentItemWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentItemWrapper item = check billingDocClient->getBillingDocumentItemOfA_BillingDocumentItemPrcgElmnt(
    "90000012",
    "000010",
    "010",
    "001",
    queries = {
        \$select: ["BillingDocument", "BillingDocumentItem", "Material", "BillingQuantity", "BillingQuantityUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentItem": "000010",
    "Material": "TG11",
    "BillingQuantity": "10",
    "BillingQuantityUnit": "PC"
  }
}
```

</div>

</details>

#### Header partners

<details>
<summary>listA_BillingDocumentPartners</summary>

<div>

Retrieves a collection of header business partners across billing documents, such as the sold-to party, bill-to party, payer and ship-to party.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentPartnerWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentPartnerWrapper partners = check billingDocClient->listA_BillingDocumentPartners(
    queries = {
        \$filter: "PartnerFunction eq 'RG' and Customer eq '17100001'",
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "PartnerFunction": "RG",
        "Customer": "17100001",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      },
      {
        "BillingDocument": "90000016",
        "PartnerFunction": "RG",
        "Customer": "17100001",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentPartner</summary>

<div>

Retrieves a specific header business partner of a billing document by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"RE"` for the bill-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentPartnerWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentPartnerWrapper billToParty = check billingDocClient->getA_BillingDocumentPartner("90000012", "RE");
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "PartnerFunction": "RE",
    "Customer": "17100001",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": ""
  }
}
```

</div>

</details>

<details>
<summary>listPartnersOfA_BillingDocument</summary>

<div>

Retrieves the header business partners of a specific billing document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_BillingDocumentQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentPartnerWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentPartnerWrapper partners = check billingDocClient->listPartnersOfA_BillingDocument(
    "90000012",
    queries = {
        \$select: ["PartnerFunction", "Customer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      { "PartnerFunction": "AG", "Customer": "17100001" },
      { "PartnerFunction": "RE", "Customer": "17100001" },
      { "PartnerFunction": "RG", "Customer": "17100001" },
      { "PartnerFunction": "WE", "Customer": "17100002" }
    ]
  }
}
```

</div>

</details>

#### Item partners

<details>
<summary>listA_BillingDocumentItemPartners</summary>

<div>

Retrieves a collection of item business partners across billing documents. Item partners exist only where an item has a partner that differs from the billing document header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentItemPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemPartnerWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemPartnerWrapper itemPartners = check billingDocClient->listA_BillingDocumentItemPartners(
    queries = {
        \$filter: "PartnerFunction eq 'WE'",
        \$top: 2,
        \$select: ["BillingDocument", "BillingDocumentItem", "PartnerFunction", "Customer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "BillingDocumentItem": "000010",
        "PartnerFunction": "WE",
        "Customer": "17100002"
      },
      {
        "BillingDocument": "90000014",
        "BillingDocumentItem": "000020",
        "PartnerFunction": "WE",
        "Customer": "17100005"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentItemPartner</summary>

<div>

Retrieves a specific business partner of a billing document item by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentItemPartnerWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentItemPartnerWrapper shipTo = check billingDocClient->getA_BillingDocumentItemPartner("90000012", "000010", "WE");
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentItem": "000010",
    "PartnerFunction": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": ""
  }
}
```

</div>

</details>

<details>
<summary>listPartnersOfA_BillingDocumentItem</summary>

<div>

Retrieves the business partners of a specific billing document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_BillingDocumentItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemPartnerWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemPartnerWrapper itemPartners = check billingDocClient->listPartnersOfA_BillingDocumentItem(
    "90000012",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "BillingDocumentItem": "000010",
        "PartnerFunction": "WE",
        "Customer": "17100002",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      }
    ]
  }
}
```

</div>

</details>

#### Header pricing elements

<details>
<summary>listA_BillingDocumentPrcgElmnts</summary>

<div>

Retrieves a collection of header pricing elements (conditions) across billing documents, such as header discounts and surcharges, with the condition type, rate, base value and amount of each pricing element.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentPrcgElmntWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentPrcgElmntWrapper conditions = check billingDocClient->listA_BillingDocumentPrcgElmnts(
    queries = {
        \$filter: "ConditionType eq 'HA00'",
        \$top: 2,
        \$select: ["BillingDocument", "PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000014",
        "PricingProcedureStep": "100",
        "PricingProcedureCounter": "001",
        "ConditionType": "HA00",
        "ConditionAmount": "-128.95",
        "TransactionCurrency": "USD"
      },
      {
        "BillingDocument": "90000018",
        "PricingProcedureStep": "100",
        "PricingProcedureCounter": "001",
        "ConditionType": "HA00",
        "ConditionAmount": "-40.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentPrcgElmnt</summary>

<div>

Retrieves a specific header pricing element of a billing document by its step number and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000014"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"100"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentPrcgElmntWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentPrcgElmntWrapper condition = check billingDocClient->getA_BillingDocumentPrcgElmnt("90000014", "100", "001");
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000014",
    "PricingProcedureStep": "100",
    "PricingProcedureCounter": "001",
    "ConditionType": "HA00",
    "ConditionCalculationType": "A",
    "ConditionBaseValue": "2578.95",
    "ConditionRateValue": "-5.000",
    "ConditionCurrency": "",
    "ConditionIsForStatistics": false,
    "ConditionOrigin": "C",
    "ConditionAmount": "-128.95",
    "TransactionCurrency": "USD",
    "ConditionInactiveReason": "",
    "ConditionClass": "A",
    "ConditionIsManuallyChanged": true
  }
}
```

</div>

</details>

<details>
<summary>listPricingElementsOfA_BillingDocument</summary>

<div>

Retrieves the header pricing elements of a specific billing document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000014"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_BillingDocumentQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentPrcgElmntWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentPrcgElmntWrapper conditions = check billingDocClient->listPricingElementsOfA_BillingDocument(
    "90000014",
    queries = {
        \$orderby: ["PricingProcedureStep"],
        \$select: ["PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PricingProcedureStep": "100",
        "PricingProcedureCounter": "001",
        "ConditionType": "HA00",
        "ConditionRateValue": "-5.000",
        "ConditionAmount": "-128.95"
      }
    ]
  }
}
```

</div>

</details>

#### Item pricing elements

<details>
<summary>listA_BillingDocumentItemPrcgElmnts</summary>

<div>

Retrieves a collection of item pricing elements (conditions) across billing documents, with the condition type, rate, base value and amount of each pricing element.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentItemPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemPrcgElmntWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemPrcgElmntWrapper itemConditions = check billingDocClient->listA_BillingDocumentItemPrcgElmnts(
    queries = {
        \$filter: "BillingDocument eq '90000012'",
        \$top: 2,
        \$select: ["BillingDocumentItem", "PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocumentItem": "000010",
        "PricingProcedureStep": "010",
        "PricingProcedureCounter": "001",
        "ConditionType": "PPR0",
        "ConditionRateValue": "100.000000000",
        "ConditionAmount": "1000.00"
      },
      {
        "BillingDocumentItem": "000010",
        "PricingProcedureStep": "900",
        "PricingProcedureCounter": "001",
        "ConditionType": "TTX1",
        "ConditionRateValue": "8.000",
        "ConditionAmount": "80.00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentItemPrcgElmnt</summary>

<div>

Retrieves a specific pricing element of a billing document item by its step number and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_BillingDocumentItemPrcgElmntWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentItemPrcgElmntWrapper itemCondition = check billingDocClient->getA_BillingDocumentItemPrcgElmnt(
    "90000012",
    "000010",
    "010",
    "001"
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentItem": "000010",
    "PricingProcedureStep": "010",
    "PricingProcedureCounter": "001",
    "ConditionType": "PPR0",
    "ConditionCalculationType": "C",
    "ConditionBaseValue": "10.000",
    "ConditionRateValue": "100.000000000",
    "ConditionCurrency": "USD",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionIsForStatistics": false,
    "IsRelevantForAccrual": false,
    "ConditionOrigin": "A",
    "ConditionRecord": "0000012345",
    "ConditionAmount": "1000.00",
    "TransactionCurrency": "USD",
    "ConditionInactiveReason": "",
    "ConditionClass": "B",
    "ConditionIsManuallyChanged": false
  }
}
```

</div>

</details>

<details>
<summary>listPricingElementsOfA_BillingDocumentItem</summary>

<div>

Retrieves the pricing elements of a specific billing document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_BillingDocumentItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemPrcgElmntWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemPrcgElmntWrapper itemConditions = check billingDocClient->listPricingElementsOfA_BillingDocumentItem(
    "90000012",
    "000010",
    queries = {
        \$filter: "ConditionIsForStatistics eq false",
        \$select: ["PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PricingProcedureStep": "010",
        "PricingProcedureCounter": "001",
        "ConditionType": "PPR0",
        "ConditionAmount": "1000.00"
      },
      {
        "PricingProcedureStep": "900",
        "PricingProcedureCounter": "001",
        "ConditionType": "TTX1",
        "ConditionAmount": "80.00"
      }
    ]
  }
}
```

</div>

</details>

#### Header texts

<details>
<summary>listA_BillingDocumentTexts</summary>

<div>

Retrieves a collection of header texts across billing documents, with the language, text ID and long text of each text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentTextWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentTextWrapper texts = check billingDocClient->listA_BillingDocumentTexts(
    queries = {
        \$filter: "Language eq 'EN' and LongTextID eq '0002'",
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "Language": "EN",
        "LongTextID": "0002",
        "LongText": "Payment due within 30 days of the invoice date."
      },
      {
        "BillingDocument": "90000014",
        "Language": "EN",
        "LongTextID": "0002",
        "LongText": "Partial shipment, remaining quantity follows."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentText</summary>

<div>

Retrieves a specific header text of a billing document by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_BillingDocumentTextWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentTextWrapper text = check billingDocClient->getA_BillingDocumentText("90000012", "EN", "0002");
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "Language": "EN",
    "LongTextID": "0002",
    "LongText": "Payment due within 30 days of the invoice date."
  }
}
```

</div>

</details>

<details>
<summary>listTextsOfA_BillingDocument</summary>

<div>

Retrieves the header texts of a specific billing document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_BillingDocumentQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentTextWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentTextWrapper texts = check billingDocClient->listTextsOfA_BillingDocument(
    "90000012",
    queries = {
        \$filter: "Language eq 'EN'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "Language": "EN",
        "LongTextID": "0002",
        "LongText": "Payment due within 30 days of the invoice date."
      }
    ]
  }
}
```

</div>

</details>

#### Item texts

<details>
<summary>listA_BillingDocumentItemTexts</summary>

<div>

Retrieves a collection of item texts across billing documents, with the language, text ID and long text of each text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_BillingDocumentItemTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemTextWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemTextWrapper itemTexts = check billingDocClient->listA_BillingDocumentItemTexts(
    queries = {
        \$filter: "BillingDocument eq '90000012' and Language eq 'EN'",
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "BillingDocumentItem": "000010",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Serial numbers are listed on the delivery note."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_BillingDocumentItemText</summary>

<div>

Retrieves a specific text of a billing document item by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_BillingDocumentItemTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_BillingDocumentItemTextWrapper|error`

Sample code:

```ballerina
billingdocument:A_BillingDocumentItemTextWrapper itemText = check billingDocClient->getA_BillingDocumentItemText(
    "90000012",
    "000010",
    "EN",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "BillingDocument": "90000012",
    "BillingDocumentItem": "000010",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Serial numbers are listed on the delivery note."
  }
}
```

</div>

</details>

<details>
<summary>listItemTextsOfA_BillingDocumentItem</summary>

<div>

Retrieves the texts of a specific billing document item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `BillingDocument` | `string` | Yes | Billing document number (e.g., `"90000012"`). |
| `BillingDocumentItem` | `string` | Yes | Billing document item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemTextsOfA_BillingDocumentItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_BillingDocumentItemTextWrapper|error`

Sample code:

```ballerina
billingdocument:CollectionOfA_BillingDocumentItemTextWrapper itemTexts = check billingDocClient->listItemTextsOfA_BillingDocumentItem(
    "90000012",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "BillingDocumentItem": "000010",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Serial numbers are listed on the delivery note."
      }
    ]
  }
}
```

</div>

</details>

#### Cancel and PDF

<details>
<summary>createCancel</summary>

<div>

Cancels a specific billing document. SAP creates a cancellation billing document that reverses the original billing document and its accounting document, and returns the cancellation document number with a system message. To cancel several billing documents at once, send one cancel request per billing document in a `$batch` call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCancelQueries` | Yes | Function import parameter: `BillingDocument`, enclosed in single quotes. |

Returns: `CancelWrapper|error`

Sample code:

```ballerina
billingdocument:CancelWrapper cancelResult = check billingDocClient->createCancel(
    queries = {
        BillingDocument: "'90000012'"
    }
);
```

Sample response:

The result is a collection with one entry per cancelled billing document.

```ballerina
{
  "d": {
    "results": [
      {
        "BillingDocument": "90000012",
        "CancellationBillingDocument": "90000020",
        "SystemMessageType": "S",
        "SystemMessageIdentification": "VF",
        "SystemMessageNumber": "311",
        "SystemMessageText": "Document 90000020 has been saved",
        "SystemMessageVariable1": "90000020",
        "SystemMessageVariable2": "",
        "SystemMessageVariable3": "",
        "SystemMessageVariable4": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getGetPDF</summary>

<div>

Retrieves a specific billing document in PDF format, as it looks after it has been output. The `BillingDocumentBinary` field holds the PDF content as a Base64-encoded string; decode it with `array:fromBase64` from `ballerina/lang.array` to get the PDF bytes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetGetPDFQueries` | Yes | Function import parameter: `BillingDocument`, enclosed in single quotes. |

Returns: `GetPDFResult_1|error`

Sample code:

```ballerina
billingdocument:GetPDFResult_1 pdfResult = check billingDocClient->getGetPDF(
    queries = {
        BillingDocument: "'90000012'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "GetPDF": {
      "BillingDocumentBinary": "JVBERi0xLjcKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoK..."
    }
  }
}
```

</div>

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

<div>

Sends multiple OData requests as a single HTTP `$batch` call, reducing round trips to the SAP server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_bd001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_BillingDocument('90000012') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_BillingDocument('90000012')/to_Item HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check billingDocClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</div>

</details>
