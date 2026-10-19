---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_sales_quotation_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to SAP S/4HANA sales quotation data via the API_SALES_QUOTATION_SRV OData v2 service. |

---

## Client

Provides full CRUD access to SAP S/4HANA sales quotation data via the API_SALES_QUOTATION_SRV OData v2 service.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | SAP user credentials. Provide `username` and `password` sub-fields. |
| `httpVersion` | `http:HttpVersion` | `HTTP_1_1` | HTTP protocol version to use for outbound requests. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Strategy for handling the `X-Forwarded-For` header. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for the HTTP client. |
| `proxy` | `http:ProxyConfig` | `()` | HTTP proxy server configuration. |
| `validation` | `boolean` | `true` | Enable or disable response payload validation against the OData schema. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_sales_quotation_srv as quotation;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

quotation:Client quotationClient = check new (
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

#### Sales quotation headers

<details>
<summary>listA_SalesQuotations</summary>

Retrieves a collection of all sales quotation headers accessible to the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListA_SalesQuotationsQueries` | No | OData system query options such as `$top`, `$skip`, `$filter`, `$select`, and `$expand`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the request. |

Returns: `CollectionOfA_SalesQuotationWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationWrapper result = check quotationClient->listA_SalesQuotations(
    queries = {"\$top": "3", "\$select": "SalesQuotation,SalesQuotationDate,SoldToParty,TotalNetAmount"}
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SalesQuotationDate": "/Date(1700000000000)/",
        "SoldToParty": "10000001",
        "TotalNetAmount": "5000.00"
      },
      {
        "SalesQuotation": "20000002",
        "SalesQuotationDate": "/Date(1700100000000)/",
        "SoldToParty": "10000002",
        "TotalNetAmount": "12500.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesQuotation</summary>

Reads the header data of a single sales quotation identified by its document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number (e.g., `"20000001"`). |
| `queries` | `GetA_SalesQuotationQueries` | No | OData query options (`$select`, `$expand`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationWrapper result = check quotationClient->getA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "SalesQuotationType": "QT",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "10000001",
    "SalesQuotationDate": "/Date(1700000000000)/",
    "BindingPeriodValidityStartDate": "/Date(1700000000000)/",
    "BindingPeriodValidityEndDate": "/Date(1702857600000)/",
    "TotalNetAmount": "5000.00",
    "TransactionCurrency": "USD",
    "OverallSDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>createA_SalesQuotation</summary>

Creates a new sales quotation header in SAP S/4HANA.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SalesQuotation` | Yes | Header fields for the new sales quotation, including `SalesQuotationType`, `SalesOrganization`, `DistributionChannel`, `OrganizationDivision`, and `SoldToParty`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationWrapper created = check quotationClient->createA_SalesQuotation({
    SalesQuotationType: "QT",
    SalesOrganization: "1010",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "10000001"
});
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000010",
    "SalesQuotationType": "QT",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "10000001",
    "TotalNetAmount": "0.00",
    "TransactionCurrency": "USD",
    "OverallSDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>patchA_SalesQuotation</summary>

Updates specific fields of an existing sales quotation header using an OData PATCH (partial update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number to update. |
| `payload` | `ModifiedA_SalesQuotationType` | Yes | Fields to update on the sales quotation header (only changed fields need to be supplied). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->patchA_SalesQuotation("20000001", {
    BindingPeriodValidityEndDate: "/Date(1706745600000)/"
});
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

<details>
<summary>deleteA_SalesQuotation</summary>

Deletes a sales quotation header and all its associated child entities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->deleteA_SalesQuotation("20000099");
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

#### Sales quotation items

<details>
<summary>listItemsOfA_SalesQuotation</summary>

Retrieves all line items for a specific sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListItemsOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationItemWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationItemWrapper items = check quotationClient->listItemsOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SalesQuotationItem": "10",
        "Material": "MZ-FG-M500",
        "SalesQuotationItemCategory": "TAN",
        "RequestedQuantity": "5.000",
        "RequestedQuantityUnit": "EA",
        "NetAmount": "2500.00",
        "TransactionCurrency": "USD"
      },
      {
        "SalesQuotation": "20000001",
        "SalesQuotationItem": "20",
        "Material": "MZ-FG-S001",
        "SalesQuotationItemCategory": "TAN",
        "RequestedQuantity": "10.000",
        "RequestedQuantityUnit": "EA",
        "NetAmount": "2500.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesQuotationItem</summary>

Reads a single line item from a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `queries` | `GetA_SalesQuotationItemQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationItemWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationItemWrapper item = check quotationClient->getA_SalesQuotationItem("20000001", "10");
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "SalesQuotationItem": "10",
    "Material": "MZ-FG-M500",
    "SalesQuotationItemCategory": "TAN",
    "RequestedQuantity": "5.000",
    "RequestedQuantityUnit": "EA",
    "ItemGrossWeight": "25.000",
    "ItemWeightUnit": "KG",
    "NetAmount": "2500.00",
    "TransactionCurrency": "USD",
    "SDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>createItemOfA_SalesQuotation</summary>

Creates a new line item on an existing sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number to add the item to. |
| `payload` | `CreateA_SalesQuotationItem` | Yes | Item fields including `Material`, `RequestedQuantity`, and `RequestedQuantityUnit`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationItemWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationItemWrapper newItem = check quotationClient->createItemOfA_SalesQuotation("20000001", {
    Material: "MZ-FG-S001",
    RequestedQuantity: "10",
    RequestedQuantityUnit: "EA"
});
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "SalesQuotationItem": "30",
    "Material": "MZ-FG-S001",
    "SalesQuotationItemCategory": "TAN",
    "RequestedQuantity": "10.000",
    "RequestedQuantityUnit": "EA",
    "NetAmount": "1500.00",
    "TransactionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>patchA_SalesQuotationItem</summary>

Updates specific fields of a sales quotation line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number to update. |
| `payload` | `ModifiedA_SalesQuotationItemType` | Yes | Item fields to update. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->patchA_SalesQuotationItem("20000001", "10", {
    RequestedQuantity: "8"
});
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

<details>
<summary>deleteA_SalesQuotationItem</summary>

Deletes a line item from a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->deleteA_SalesQuotationItem("20000001", "30");
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

#### Partners

<details>
<summary>listPartnersOfA_SalesQuotation</summary>

Retrieves all header-level partner entries (sold-to, ship-to, bill-to, payer, etc.) for a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListPartnersOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationPartnerWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationPartnerWrapper partners = check quotationClient->listPartnersOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "PartnerFunction": "AG",
        "Customer": "10000001",
        "ContactPerson": ""
      },
      {
        "SalesQuotation": "20000001",
        "PartnerFunction": "WE",
        "Customer": "10000001",
        "ContactPerson": ""
      },
      {
        "SalesQuotation": "20000001",
        "PartnerFunction": "RE",
        "Customer": "10000001",
        "ContactPerson": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesQuotationPartner</summary>

Reads a specific partner function entry from a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `PartnerFunction` | `string` | Yes | Partner function code (e.g., `"AG"` for sold-to party, `"WE"` for ship-to party). |
| `queries` | `GetA_SalesQuotationPartnerQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationPartnerWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationPartnerWrapper partner = check quotationClient->getA_SalesQuotationPartner("20000001", "AG");
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "PartnerFunction": "AG",
    "Customer": "10000001",
    "ContactPerson": "",
    "AddressID": "0001"
  }
}
```

</details>

<details>
<summary>patchA_SalesQuotationPartner</summary>

Updates partner data for a specific partner function on a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `PartnerFunction` | `string` | Yes | Partner function code to update. |
| `payload` | `ModifiedA_SalesQuotationPartnerType` | Yes | Partner fields to update. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->patchA_SalesQuotationPartner("20000001", "WE", {
    ContactPerson: "CP00012"
});
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

<details>
<summary>listPartnersOfA_SalesQuotationItem</summary>

Retrieves all item-level partners for a specific sales quotation line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number. |
| `queries` | `ListPartnersOfA_SalesQuotationItemQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationItemPartnerWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationItemPartnerWrapper itemPartners = check quotationClient->listPartnersOfA_SalesQuotationItem("20000001", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SalesQuotationItem": "10",
        "PartnerFunction": "WE",
        "Customer": "10000001"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesQuotationItemPartner</summary>

Reads a specific partner function entry from a sales quotation line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number. |
| `PartnerFunction` | `string` | Yes | Partner function code. |
| `queries` | `GetA_SalesQuotationItemPartnerQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationItemPartnerWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationItemPartnerWrapper itemPartner = check quotationClient->getA_SalesQuotationItemPartner("20000001", "10", "WE");
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "SalesQuotationItem": "10",
    "PartnerFunction": "WE",
    "Customer": "10000001",
    "AddressID": "0001"
  }
}
```

</details>

#### Pricing elements

<details>
<summary>listPricingElementsOfA_SalesQuotation</summary>

Retrieves all header-level pricing condition records for a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListPricingElementsOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationPrcgElmntWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationPrcgElmntWrapper prcgElmnts = check quotationClient->listPricingElementsOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "PricingProcedureStep": "10",
        "PricingProcedureCounter": "10",
        "ConditionType": "PR00",
        "ConditionRateValue": "500.00",
        "ConditionAmount": "2500.00",
        "TransactionCurrency": "USD"
      },
      {
        "SalesQuotation": "20000001",
        "PricingProcedureStep": "20",
        "PricingProcedureCounter": "10",
        "ConditionType": "K004",
        "ConditionRateValue": "-50.00",
        "ConditionAmount": "-250.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesQuotationPrcgElmnt</summary>

Reads a specific pricing element (condition record) from a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `PricingProcedureStep` | `string` | Yes | Pricing procedure step number. |
| `PricingProcedureCounter` | `string` | Yes | Pricing procedure counter. |
| `queries` | `GetA_SalesQuotationPrcgElmntQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationPrcgElmntWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationPrcgElmntWrapper prcgElmnt = check quotationClient->getA_SalesQuotationPrcgElmnt("20000001", "10", "10");
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "PricingProcedureStep": "10",
    "PricingProcedureCounter": "10",
    "ConditionType": "PR00",
    "ConditionRateValue": "500.00",
    "ConditionRateValueUnit": "USD",
    "ConditionAmount": "2500.00",
    "TransactionCurrency": "USD",
    "ConditionQuantity": "1.000",
    "ConditionQuantityUnit": "EA",
    "ConditionIsManuallyChanged": false
  }
}
```

</details>

<details>
<summary>patchA_SalesQuotationPrcgElmnt</summary>

Updates a specific pricing element on a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `PricingProcedureStep` | `string` | Yes | Pricing procedure step number. |
| `PricingProcedureCounter` | `string` | Yes | Pricing procedure counter. |
| `payload` | `ModifiedA_SalesQuotationPrcgElmntType` | Yes | Pricing element fields to update (e.g., `ConditionRateValue`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->patchA_SalesQuotationPrcgElmnt("20000001", "10", "10", {
    ConditionRateValue: "480.00"
});
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

<details>
<summary>listPricingElementsOfA_SalesQuotationItem</summary>

Retrieves all item-level pricing elements for a sales quotation line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number. |
| `queries` | `ListPricingElementsOfA_SalesQuotationItemQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationItemPrcgElmntWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationItemPrcgElmntWrapper itemPrcg = check quotationClient->listPricingElementsOfA_SalesQuotationItem("20000001", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SalesQuotationItem": "10",
        "PricingProcedureStep": "10",
        "PricingProcedureCounter": "10",
        "ConditionType": "PR00",
        "ConditionRateValue": "500.00",
        "ConditionAmount": "2500.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

#### Texts

<details>
<summary>listTextsOfA_SalesQuotation</summary>

Retrieves all text objects associated with a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListTextsOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationTextWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationTextWrapper texts = check quotationClient->listTextsOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Standard terms and conditions apply."
      },
      {
        "SalesQuotation": "20000001",
        "Language": "EN",
        "LongTextID": "0002",
        "LongText": "Delivery within 14 business days."
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesQuotationText</summary>

Reads a specific text object from a sales quotation header by language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text object identifier. |
| `queries` | `GetA_SalesQuotationTextQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationTextWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationTextWrapper text = check quotationClient->getA_SalesQuotationText("20000001", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Standard terms and conditions apply. Offer valid for 30 days from quotation date."
  }
}
```

</details>

<details>
<summary>patchA_SalesQuotationText</summary>

Updates the long-text content of a text object on a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `Language` | `string` | Yes | Language key. |
| `LongTextID` | `string` | Yes | Text object identifier. |
| `payload` | `ModifiedA_SalesQuotationTextType` | Yes | Updated text content to write. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->patchA_SalesQuotationText("20000001", "EN", "0001", {
    LongText: "Updated terms: offer valid for 60 days from quotation date."
});
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

<details>
<summary>listTextsOfA_SalesQuotationItem</summary>

Retrieves all text objects for a specific sales quotation line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number. |
| `queries` | `ListTextsOfA_SalesQuotationItemQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationItemTextWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationItemTextWrapper itemTexts = check quotationClient->listTextsOfA_SalesQuotationItem("20000001", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SalesQuotationItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Item-specific delivery note."
      }
    ]
  }
}
```

</details>

#### Related objects

<details>
<summary>listRelatedObjectsOfA_SalesQuotation</summary>

Retrieves all related object associations for a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListRelatedObjectsOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SalesQuotationRelatedObjectWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SalesQuotationRelatedObjectWrapper relObjs = check quotationClient->listRelatedObjectsOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SDDocRelatedObjectSequenceNmbr": "1",
        "SDDocumentRelatedObjectType": "CRM_LEAD",
        "SDDocRelatedObjectSystem": "CRMCLNT100",
        "SDDocRelatedObjectReference1": "LEAD-00001",
        "SDDocRelatedObjectReference2": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createRelatedObjectOfA_SalesQuotation</summary>

Creates a new related object association for a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `payload` | `CreateA_SalesQuotationRelatedObject` | Yes | Related object fields including `SDDocumentRelatedObjectType`, `SDDocRelatedObjectSystem`, and reference values. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `A_SalesQuotationRelatedObjectWrapper|error`

Sample code:

```ballerina
quotation:A_SalesQuotationRelatedObjectWrapper relObj = check quotationClient->createRelatedObjectOfA_SalesQuotation("20000001", {
    SDDocumentRelatedObjectType: "CRM_LEAD",
    SDDocRelatedObjectSystem: "CRMCLNT100",
    SDDocRelatedObjectReference1: "LEAD-00002"
});
```

Sample response:

```ballerina
{
  "d": {
    "SalesQuotation": "20000001",
    "SDDocRelatedObjectSequenceNmbr": "2",
    "SDDocumentRelatedObjectType": "CRM_LEAD",
    "SDDocRelatedObjectSystem": "CRMCLNT100",
    "SDDocRelatedObjectReference1": "LEAD-00002"
  }
}
```

</details>

<details>
<summary>deleteA_SalesQuotationRelatedObject</summary>

Removes a related object association from a sales quotation header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object entry to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check quotationClient->deleteA_SalesQuotationRelatedObject("20000001", "2");
```

Sample response:

```ballerina
HTTP 204 No Content
```

</details>

#### Process flow

<details>
<summary>listPrecedingProcFlowDocsOfA_SalesQuotation</summary>

Retrieves preceding process flow documents (e.g., sales inquiries) linked to a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListPrecedingProcFlowDocsOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SlsQtanPrecdgProcFlowWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SlsQtanPrecdgProcFlowWrapper preceding = check quotationClient->listPrecedingProcFlowDocsOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "DocRelationshipUUID": "00000000-1234-5678-abcd-000000000001",
        "PrecedingDocument": "10000001",
        "PrecedingDocumentItem": "10",
        "PrecedingDocumentCategory": "B"
      }
    ]
  }
}
```

</details>

<details>
<summary>listSubsequentProcFlowDocsOfA_SalesQuotation</summary>

Retrieves subsequent process flow documents (e.g., sales orders) created from a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `queries` | `ListSubsequentProcFlowDocsOfA_SalesQuotationQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SlsQtanSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SlsQtanSubsqntProcFlowWrapper subsequent = check quotationClient->listSubsequentProcFlowDocsOfA_SalesQuotation("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "DocRelationshipUUID": "00000000-1234-5678-abcd-000000000002",
        "SubsequentDocument": "30000001",
        "SubsequentDocumentItem": "10",
        "SubsequentDocumentCategory": "C"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPrecedingProcFlowDocItemsOfA_SalesQuotationItem</summary>

Retrieves preceding process flow document items linked to a specific sales quotation line item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number. |
| `SalesQuotationItem` | `string` | Yes | Item number. |
| `queries` | `ListPrecedingProcFlowDocItemsOfA_SalesQuotationItemQueries` | No | OData query options. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `CollectionOfA_SlsQtanItmPrecdgProcFlowWrapper|error`

Sample code:

```ballerina
quotation:CollectionOfA_SlsQtanItmPrecdgProcFlowWrapper itemPreceding = check quotationClient->listPrecedingProcFlowDocItemsOfA_SalesQuotationItem("20000001", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesQuotation": "20000001",
        "SalesQuotationItem": "10",
        "DocRelationshipUUID": "00000000-1234-5678-abcd-000000000003",
        "PrecedingDocument": "10000001",
        "PrecedingDocumentItem": "10",
        "PrecedingDocumentCategory": "B"
      }
    ]
  }
}
```

</details>

#### Approval actions

<details>
<summary>releaseApprovalRequest</summary>

Releases (approves) an open approval request on a sales quotation, advancing it to the approved status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number whose approval request should be released. |
| `queries` | `ReleaseApprovalRequestQueries` | No | OData action query parameters. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `FunctionResult_1|error`

Sample code:

```ballerina
quotation:FunctionResult_1 result = check quotationClient->releaseApprovalRequest("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "ReleaseApprovalRequest": {
      "SalesQuotation": "20000001",
      "ApprovalStatus": "APPROVED"
    }
  }
}
```

</details>

<details>
<summary>rejectApprovalRequest</summary>

Rejects an open approval request on a sales quotation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesQuotation` | `string` | Yes | Sales quotation document number whose approval request should be rejected. |
| `queries` | `RejectApprovalRequestQueries` | No | OData action query parameters. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers. |

Returns: `FunctionResult_2|error`

Sample code:

```ballerina
quotation:FunctionResult_2 result = check quotationClient->rejectApprovalRequest("20000001");
```

Sample response:

```ballerina
{
  "d": {
    "RejectApprovalRequest": {
      "SalesQuotation": "20000001",
      "ApprovalStatus": "REJECTED"
    }
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends multiple OData requests as a single HTTP $batch call, reducing network round trips for bulk operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An HTTP request with a `multipart/mixed` body containing OData sub-requests per the OData batch specification. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers for the outer batch request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=batch_boundary");
// Populate batchRequest body with OData sub-requests per $batch spec
http:Response batchResponse = check quotationClient->performBatchOperation(batchRequest);
```

Sample response:

```ballerina
HTTP 200 OK: multipart/mixed body containing individual sub-response parts
```

</details>
