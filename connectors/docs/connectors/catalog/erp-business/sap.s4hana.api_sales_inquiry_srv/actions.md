---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_sales_inquiry_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides typed access to all entities exposed by the SAP S/4HANA API_SALES_INQUIRY_SRV OData service: inquiry headers, line items, business partners, and pricing elements. |

---

## Client

Provides typed access to all entities exposed by the SAP S/4HANA API_SALES_INQUIRY_SRV OData service: inquiry headers, line items, business partners, and pricing elements.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | SAP username and password (`{username: "...", password: "..."}}`). |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Controls forwarding of the `X-Forwarded-For` header. |
| `retryConfig` | `http:RetryConfig` | `()` | Automatic retry configuration for transient failures. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration, including custom trust stores for SAP certificates. |
| `proxy` | `http:ProxyConfig` | `()` | HTTP proxy configuration. |
| `validation` | `boolean` | `true` | Enable or disable response payload validation against generated types. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_sales_inquiry_srv as salesinquiry;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

salesinquiry:Client salesinquiryClient = check new (
    config = {
        auth: {
            username: username,
            password: password
        }
    },
    hostname = hostname
);
```

### Operations

#### Sales inquiries

<details>
<summary>listA_SalesInquiries</summary>

Retrieves a collection of sales inquiry header records. Supports OData query options to filter, sort, and project fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers (e.g., SAP-Client header). |
| `queries` | `ListA_SalesInquiriesQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$select`, `$expand`, `$inlinecount`. |

Returns: `CollectionOfA_SalesInquiryWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryWrapper result =
    check salesinquiryClient->listA_SalesInquiries(
        {},
        {
            "\$top": 5,
            "\$filter": "SalesOrganization eq '1010'",
            "\$select": "SalesInquiry,SalesInquiryType,TotalNetAmount,TransactionCurrency"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesInquiry": "10000001",
        "SalesInquiryType": "IR",
        "SalesOrganization": "1010",
        "DistributionChannel": "10",
        "SoldToParty": "CUST001",
        "TotalNetAmount": "5000.00",
        "TransactionCurrency": "USD",
        "OverallSDProcessStatus": "A",
        "CreationDate": "/Date(1704067200000)/"
      }
    ],
    "__count": "1"
  }
}
```

</details>

<details>
<summary>getA_SalesInquiry</summary>

Retrieves a single sales inquiry header by its document number. Use `$expand` to include related items, partners, or pricing elements in the same response.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number (e.g., `"10000001"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `GetA_SalesInquiryQueries` | No | OData query options: `$select`, `$expand`. |

Returns: `A_SalesInquiryWrapper|error`

Sample code:

```ballerina
salesinquiry:A_SalesInquiryWrapper result =
    check salesinquiryClient->getA_SalesInquiry(
        "10000001",
        {},
        {"\$expand": "to_Item,to_Partner"}
    );
```

Sample response:

```ballerina
{
  "d": {
    "SalesInquiry": "10000001",
    "SalesInquiryType": "IR",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "Division": "00",
    "SoldToParty": "CUST001",
    "PurchaseOrderByCustomer": "PO-2024-001",
    "TotalNetAmount": "5000.00",
    "TransactionCurrency": "USD",
    "BindingPeriodValidityStartDate": "/Date(1704067200000)/",
    "BindingPeriodValidityEndDate": "/Date(1706745600000)/",
    "OverallSDProcessStatus": "A",
    "CreationDate": "/Date(1704067200000)/"
  }
}
```

</details>

#### Sales inquiry items

<details>
<summary>listItemsOfA_SalesInquiry</summary>

Lists all line items belonging to a specific sales inquiry document. Each item represents a requested product or service with quantity and pricing information.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `ListItemsOfA_SalesInquiryQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$select`, `$expand`. |

Returns: `CollectionOfA_SalesInquiryItemWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryItemWrapper items =
    check salesinquiryClient->listItemsOfA_SalesInquiry(
        "10000001",
        {},
        {"\$select": "SalesInquiryItem,Material,RequestedQuantity,NetAmount"}
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesInquiry": "10000001",
        "SalesInquiryItem": "000010",
        "Material": "PROD-001",
        "MaterialName": "Industrial Pump",
        "RequestedQuantity": "10",
        "RequestedQuantityUnit": "EA",
        "NetAmount": "1000.00",
        "TransactionCurrency": "USD",
        "SDProcessStatus": "A"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesInquiryItem</summary>

Retrieves a single sales inquiry line item identified by document number and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `SalesInquiryItem` | `string` | Yes | The line item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `GetA_SalesInquiryItemQueries` | No | OData query options: `$select`, `$expand`. |

Returns: `A_SalesInquiryItemWrapper|error`

Sample code:

```ballerina
salesinquiry:A_SalesInquiryItemWrapper item =
    check salesinquiryClient->getA_SalesInquiryItem(
        "10000001",
        "000010",
        {},
        {"\$expand": "to_Partner,to_PricingElement"}
    );
```

Sample response:

```ballerina
{
  "d": {
    "SalesInquiry": "10000001",
    "SalesInquiryItem": "000010",
    "Material": "PROD-001",
    "MaterialName": "Industrial Pump",
    "RequestedQuantity": "10",
    "RequestedQuantityUnit": "EA",
    "ItemNetWeight": "50.000",
    "ItemWeightUnit": "KG",
    "NetAmount": "1000.00",
    "TransactionCurrency": "USD",
    "IncotermsClassification": "CIF",
    "SDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>listA_SalesInquiryItems</summary>

Lists all sales inquiry line items across all inquiries. Useful for bulk reporting or cross-inquiry analysis with OData filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `ListA_SalesInquiryItemsQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$select`, `$expand`, `$inlinecount`. |

Returns: `CollectionOfA_SalesInquiryItemWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryItemWrapper items =
    check salesinquiryClient->listA_SalesInquiryItems(
        {},
        {
            "\$filter": "Material eq 'PROD-001'",
            "\$top": 20,
            "\$inlinecount": "allpages"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "__count": "3",
    "results": [
      {
        "SalesInquiry": "10000001",
        "SalesInquiryItem": "000010",
        "Material": "PROD-001",
        "RequestedQuantity": "10",
        "RequestedQuantityUnit": "EA",
        "NetAmount": "1000.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

#### Partners

<details>
<summary>listPartnersOfA_SalesInquiry</summary>

Lists all business partner assignments on a sales inquiry header, such as sold-to party, ship-to party, bill-to party, and payer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `ListPartnersOfA_SalesInquiryQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$select`. |

Returns: `CollectionOfA_SalesInquiryPartnerWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryPartnerWrapper partners =
    check salesinquiryClient->listPartnersOfA_SalesInquiry("10000001", {}, {});
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesInquiry": "10000001",
        "PartnerFunction": "AG",
        "Customer": "CUST001",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      },
      {
        "SalesInquiry": "10000001",
        "PartnerFunction": "WE",
        "Customer": "CUST002",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesInquiryPartner</summary>

Retrieves a specific business partner assignment on a sales inquiry header by partner function code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `PartnerFunction` | `string` | Yes | The partner function code (e.g., `"AG"` for sold-to, `"WE"` for ship-to). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `GetA_SalesInquiryPartnerQueries` | No | OData query options: `$select`. |

Returns: `A_SalesInquiryPartnerWrapper|error`

Sample code:

```ballerina
salesinquiry:A_SalesInquiryPartnerWrapper partner =
    check salesinquiryClient->getA_SalesInquiryPartner("10000001", "AG", {}, {});
```

Sample response:

```ballerina
{
  "d": {
    "SalesInquiry": "10000001",
    "PartnerFunction": "AG",
    "Customer": "CUST001",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "EMP-007"
  }
}
```

</details>

<details>
<summary>listPartnersOfA_SalesInquiryItem</summary>

Lists all partner assignments at the line-item level for a given sales inquiry item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `SalesInquiryItem` | `string` | Yes | The line item number. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `ListPartnersOfA_SalesInquiryItemQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$select`. |

Returns: `CollectionOfA_SalesInquiryItemPartnerWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryItemPartnerWrapper itemPartners =
    check salesinquiryClient->listPartnersOfA_SalesInquiryItem(
        "10000001", "000010", {}, {}
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesInquiry": "10000001",
        "SalesInquiryItem": "000010",
        "PartnerFunction": "AG",
        "Customer": "CUST001",
        "ContactPerson": ""
      }
    ]
  }
}
```

</details>

#### Pricing elements

<details>
<summary>listPricingElementsOfA_SalesInquiry</summary>

Lists all header-level pricing condition records for a sales inquiry, such as base prices, discounts, freight, and taxes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_SalesInquiryQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$select`. |

Returns: `CollectionOfA_SalesInquiryPrcgElmntWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryPrcgElmntWrapper pricing =
    check salesinquiryClient->listPricingElementsOfA_SalesInquiry(
        "10000001", {}, {}
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesInquiry": "10000001",
        "PricingProcedureStep": "10",
        "PricingProcedureCounter": "0",
        "ConditionType": "PR00",
        "ConditionAmount": "500.00",
        "ConditionQuantity": "1",
        "TransactionCurrency": "USD",
        "ConditionIsManuallyChanged": false
      },
      {
        "SalesInquiry": "10000001",
        "PricingProcedureStep": "20",
        "PricingProcedureCounter": "0",
        "ConditionType": "K007",
        "ConditionAmount": "-50.00",
        "TransactionCurrency": "USD",
        "ConditionIsManuallyChanged": false
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesInquiryPrcgElmnt</summary>

Retrieves a single header-level pricing condition record identified by inquiry document number, procedure step, and counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `PricingProcedureStep` | `string` | Yes | The pricing procedure step number (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | The condition counter within the step (e.g., `"0"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `GetA_SalesInquiryPrcgElmntQueries` | No | OData query options: `$select`. |

Returns: `A_SalesInquiryPrcgElmntWrapper|error`

Sample code:

```ballerina
salesinquiry:A_SalesInquiryPrcgElmntWrapper pricingElement =
    check salesinquiryClient->getA_SalesInquiryPrcgElmnt(
        "10000001", "10", "0", {}, {}
    );
```

Sample response:

```ballerina
{
  "d": {
    "SalesInquiry": "10000001",
    "PricingProcedureStep": "10",
    "PricingProcedureCounter": "0",
    "ConditionType": "PR00",
    "ConditionAmount": "500.00",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "EA",
    "ConditionCalculationType": "C",
    "TransactionCurrency": "USD",
    "ConditionIsManuallyChanged": false
  }
}
```

</details>

<details>
<summary>listPricingElementsOfA_SalesInquiryItem</summary>

Lists all item-level pricing condition records for a specific sales inquiry line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesInquiry` | `string` | Yes | The sales inquiry document number. |
| `SalesInquiryItem` | `string` | Yes | The line item number. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_SalesInquiryItemQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$select`. |

Returns: `CollectionOfA_SalesInquiryItemPrcgElmntWrapper|error`

Sample code:

```ballerina
salesinquiry:CollectionOfA_SalesInquiryItemPrcgElmntWrapper itemPricing =
    check salesinquiryClient->listPricingElementsOfA_SalesInquiryItem(
        "10000001", "000010", {}, {}
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesInquiry": "10000001",
        "SalesInquiryItem": "000010",
        "PricingProcedureStep": "10",
        "PricingProcedureCounter": "0",
        "ConditionType": "PR00",
        "ConditionAmount": "100.00",
        "ConditionQuantity": "1",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Executes multiple OData read requests as a single HTTP batch call, reducing round-trips when you need to fetch several inquiry entities at once.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` with `Content-Type: multipart/mixed; boundary=<boundary>` and individual GET requests in the multipart body following OData batch format. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_a1b2c3";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
string batchBody = string `--${boundary}\r\n` +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_SalesInquiry('10000001') HTTP/1.1\r\n\r\n" +
    "--" + boundary + "--";
batchRequest.setTextPayload(batchBody);
http:Response batchResponse = check salesinquiryClient->performBatchOperation(batchRequest, {});
```

Sample response:

```ballerina
HTTP/1.1 200 OK
Content-Type: multipart/mixed; boundary=response_boundary

--response_boundary
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json

{"d":{"SalesInquiry":"10000001","SalesInquiryType":"IR","TotalNetAmount":"5000.00"}}
--response_boundary--
```

</details>
