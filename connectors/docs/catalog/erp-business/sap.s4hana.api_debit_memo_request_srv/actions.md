---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_debit_memo_request_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Creates, reads, updates and deletes SAP S/4HANA debit memo requests with their items, partners, pricing elements and texts, and reads their subsequent documents via the `API_DEBIT_MEMO_REQUEST_SRV` OData API. |

---

## Client

Creates, reads, updates and deletes SAP S/4HANA debit memo requests with their items, partners, pricing elements and texts, and reads their subsequent documents via the `API_DEBIT_MEMO_REQUEST_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_DEBIT_MEMO_REQUEST_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
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
import ballerinax/sap.s4hana.api_debit_memo_request_srv as debitmemo;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

debitmemo:Client debitmemoClient = check new (
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

A debit memo request is identified by its document number (`DebitMemoRequest`, up to 10 characters, for example `70000003`) and a debit memo request item by the document number and item number (`DebitMemoRequestItem`, up to 6 characters, for example `10`). Partners are identified by the partner function (`PartnerFunction`, 2 characters, for example `AG` for the sold-to party or `WE` for the ship-to party), pricing elements by the step number and condition counter of the pricing procedure (`PricingProcedureStep` and `PricingProcedureCounter`, for example `010` and `001`), and texts by the language and text ID (`Language` and `LongTextID`, for example `EN` and `0001`). Subsequent documents of an item are identified by the item and a `DocRelationshipUUID`; pass the UUID on its own, because the client adds the `guid'...'` literal.

SAP expects deep insert requests to create a debit memo request or an item: create the header together with its related entities (`to_Item`, `to_Partner`, `to_PricingElement`, `to_Text`), and an item together with its item partners, pricing elements or texts. Pricing elements and texts have no create operation of their own; include them in the deep insert. `DebitMemoRequest` is a required field of `CreateA_DebitMemoRequest`; pass an empty string to let SAP assign the number, and read it from the response. `DebitMemoRequestItem` is a required field of `CreateA_DebitMemoRequestItem`.

The `create` operations that post to an entity set directly (`createA_DebitMemoRequestItem`, `createA_DebitMemoReqPartner` and `createA_DebitMemoReqItemPartner`) need the keys of the parent document, which their `Create...` records do not declare. The records are open, so add `DebitMemoRequest` (and `DebitMemoRequestItem` for item partners) as additional fields, or use the matching navigation operation instead, for example `createPartnerOfA_DebitMemoRequest`.

The `patch` operations take an `Update...Wrapper` record that wraps the matching `Update...` record in a `d` field, for example `{d: {HeaderBillingBlockReason: ""}}`. Update and delete operations return an `http:Response`; include an `If-Match` header with the entity ETag (or `*`) for optimistic locking.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property and navigation names, and `$top` and `$skip` take integers. Text entities have no navigation properties, so their query records have no `$expand`. Dates are returned in the OData V2 format `/Date(<milliseconds>)/` and times in the ISO 8601 duration format, for example `PT10H15M30S`.

#### Debit memo requests

<details>
<summary>listA_DebitMemoRequests</summary>

Retrieves a collection of debit memo request headers, with the sales area, sold-to party, net value, order reason, billing block and overall statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoRequestsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoRequestWrapper result = check debitmemoClient->listA_DebitMemoRequests(
    queries = {
        \$filter: "SalesOrganization eq '1010' and SoldToParty eq '10100001'",
        \$select: ["DebitMemoRequest", "DebitMemoRequestType", "SoldToParty", "TotalNetAmount", "TransactionCurrency", "HeaderBillingBlockReason"],
        \$orderby: ["DebitMemoRequest desc"],
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
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestType": "L2",
        "SoldToParty": "10100001",
        "TotalNetAmount": "250.00",
        "TransactionCurrency": "EUR",
        "HeaderBillingBlockReason": "09"
      },
      {
        "DebitMemoRequest": "70000002",
        "DebitMemoRequestType": "L2",
        "SoldToParty": "10100001",
        "TotalNetAmount": "120.00",
        "TransactionCurrency": "EUR",
        "HeaderBillingBlockReason": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoRequest</summary>

Retrieves the header of a single debit memo request by its document number. Expand `to_Item`, `to_Partner`, `to_PricingElement`, `to_SubsequentProcFlowDoc` or `to_Text` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoRequestQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper debitMemoRequest = check debitmemoClient->getA_DebitMemoRequest(
    "70000003",
    queries = {
        \$expand: ["to_Item"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestType": "L2",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "10100001",
    "CreationDate": "/Date(1794268800000)/",
    "DebitMemoRequestDate": "/Date(1794268800000)/",
    "PurchaseOrderByCustomer": "PRICE-CORR-0457",
    "SDDocumentReason": "001",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR",
    "HeaderBillingBlockReason": "09",
    "ReferenceSDDocument": "90000005",
    "ReferenceSDDocumentCategory": "M",
    "OverallSDProcessStatus": "A",
    "OverallOrdReltdBillgStatus": "A",
    "to_Item": {
      "results": [
        {
          "DebitMemoRequest": "70000003",
          "DebitMemoRequestItem": "10",
          "DebitMemoRequestItemCategory": "L2N",
          "Material": "TG11",
          "RequestedQuantity": "10",
          "RequestedQuantityUnit": "PC",
          "NetAmount": "250.00",
          "TransactionCurrency": "EUR"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>createA_DebitMemoRequest</summary>

Creates a debit memo request with a deep insert of the header and its related entities, with or without reference to a preceding document such as a billing document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_DebitMemoRequest` | Yes | Header data with nested items (`to_Item`) and, optionally, partners, pricing elements and texts. `DebitMemoRequest` is a required field; the sample passes an empty string and reads the number SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper created = check debitmemoClient->createA_DebitMemoRequest({
    DebitMemoRequest: "",
    DebitMemoRequestType: "L2",
    SalesOrganization: "1010",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "10100001",
    PurchaseOrderByCustomer: "PRICE-CORR-0457",
    SDDocumentReason: "001",
    to_Item: {
        results: [{
            DebitMemoRequestItem: "10",
            Material: "TG11",
            RequestedQuantity: "10",
            RequestedQuantityUnit: "PC",
            to_Text: {
                results: [{
                    Language: "EN",
                    LongTextID: "0001",
                    LongText: "Price difference for invoice 90000005."
                }]
            }
        }]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestType": "L2",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "10100001",
    "CreationDate": "/Date(1794268800000)/",
    "CreatedByUser": "CC0000000001",
    "PurchaseOrderByCustomer": "PRICE-CORR-0457",
    "SDDocumentReason": "001",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR",
    "HeaderBillingBlockReason": "09",
    "OverallSDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoRequest</summary>

Updates the header data of a debit memo request using a PATCH request, for example to remove the billing block after approval or to change the customer reference.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `payload` | `UpdateA_DebitMemoRequestWrapper` | Yes | Wraps an `UpdateA_DebitMemoRequest` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoRequest(
    "70000003",
    {d: {HeaderBillingBlockReason: "", PurchaseOrderByCustomer: "PRICE-CORR-0457-A"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoRequest</summary>

Deletes a debit memo request with all its items, partners, pricing elements and texts. SAP rejects the deletion if a subsequent document, such as a debit memo, already exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000004"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoRequest(
    "70000004",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Debit memo request items

<details>
<summary>listA_DebitMemoRequestItems</summary>

Retrieves a collection of items across all debit memo requests, with the material, quantity, net amount, plant and processing and billing statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoRequestItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoRequestItemWrapper result = check debitmemoClient->listA_DebitMemoRequestItems(
    queries = {
        \$filter: "Material eq 'TG11'",
        \$select: ["DebitMemoRequest", "DebitMemoRequestItem", "Material", "NetAmount", "TransactionCurrency"],
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
        "DebitMemoRequest": "70000002",
        "DebitMemoRequestItem": "10",
        "Material": "TG11",
        "NetAmount": "120.00",
        "TransactionCurrency": "EUR"
      },
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "10",
        "Material": "TG11",
        "NetAmount": "250.00",
        "TransactionCurrency": "EUR"
      }
    ]
  }
}
```

</details>

<details>
<summary>listItemsOfA_DebitMemoRequest</summary>

Retrieves the items of a specific debit memo request through the `to_Item` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemsOfA_DebitMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoRequestItemWrapper items = check debitmemoClient->listItemsOfA_DebitMemoRequest(
    "70000003",
    queries = {
        \$select: ["DebitMemoRequestItem", "Material", "RequestedQuantity", "RequestedQuantityUnit", "NetAmount"],
        \$orderby: ["DebitMemoRequestItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequestItem": "10",
        "Material": "TG11",
        "RequestedQuantity": "10",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "250.00"
      },
      {
        "DebitMemoRequestItem": "20",
        "Material": "TG12",
        "RequestedQuantity": "2",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "40.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoRequestItem</summary>

Retrieves a single debit memo request item by the document number and item number. Expand `to_DebitMemoRequest`, `to_ItemSubsqntProcFlow`, `to_Partner`, `to_PricingElement` or `to_Text` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoRequestItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestItemWrapper item = check debitmemoClient->getA_DebitMemoRequestItem("70000003", "10");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "10",
    "HigherLevelItem": "0",
    "DebitMemoRequestItemCategory": "L2N",
    "DebitMemoRequestItemText": "Trading Good 11",
    "Material": "TG11",
    "RequestedQuantity": "10",
    "RequestedQuantityUnit": "PC",
    "ItemGrossWeight": "5.000",
    "ItemNetWeight": "4.500",
    "ItemWeightUnit": "KG",
    "TransactionCurrency": "EUR",
    "NetAmount": "250.00",
    "MaterialGroup": "L001",
    "Plant": "1010",
    "ItemBillingBlockReason": "",
    "SalesDocumentRjcnReason": "",
    "ReferenceSDDocument": "90000005",
    "ReferenceSDDocumentItem": "10",
    "SDProcessStatus": "A",
    "OrderRelatedBillingStatus": "A"
  }
}
```

</details>

<details>
<summary>createA_DebitMemoRequestItem</summary>

Creates an item in an existing debit memo request by posting to the item entity set, with a deep insert of the item partners, pricing elements or texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_DebitMemoRequestItem` | Yes | Item data with the required `DebitMemoRequestItem` field. Add `DebitMemoRequest` as an additional field to name the debit memo request, or use `createItemOfA_DebitMemoRequest`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestItemWrapper newItem = check debitmemoClient->createA_DebitMemoRequestItem({
    DebitMemoRequest: "70000003",
    DebitMemoRequestItem: "30",
    Material: "TG12",
    RequestedQuantity: "5",
    RequestedQuantityUnit: "PC",
    to_Text: {
        results: [{Language: "EN", LongTextID: "0001", LongText: "Freight surcharge not invoiced."}]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "30",
    "DebitMemoRequestItemCategory": "L2N",
    "Material": "TG12",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "100.00",
    "TransactionCurrency": "EUR",
    "Plant": "1010"
  }
}
```

</details>

<details>
<summary>createItemOfA_DebitMemoRequest</summary>

Creates an item in a specific debit memo request through the `to_Item` navigation, with a deep insert of the item partners, pricing elements or texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `payload` | `CreateA_DebitMemoRequestItem` | Yes | Item data with the required `DebitMemoRequestItem` field, plus nested `to_Partner`, `to_PricingElement` or `to_Text` entries. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestItemWrapper newItem = check debitmemoClient->createItemOfA_DebitMemoRequest(
    "70000003",
    {
        DebitMemoRequestItem: "40",
        Material: "TG11",
        RequestedQuantity: "2",
        RequestedQuantityUnit: "PC",
        to_PricingElement: {
            results: [{
                PricingProcedureStep: "010",
                PricingProcedureCounter: "001",
                ConditionType: "PPR0",
                ConditionRateValue: "30.00",
                ConditionCurrency: "EUR"
            }]
        }
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "40",
    "DebitMemoRequestItemCategory": "L2N",
    "Material": "TG11",
    "RequestedQuantity": "2",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "60.00",
    "TransactionCurrency": "EUR",
    "Plant": "1010"
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoRequestItem</summary>

Updates a debit memo request item using a PATCH request, for example the requested quantity, the item billing block or the reason for rejection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `payload` | `UpdateA_DebitMemoRequestItemWrapper` | Yes | Wraps an `UpdateA_DebitMemoRequestItem` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoRequestItem(
    "70000003",
    "10",
    {d: {RequestedQuantity: "12", RequestedQuantityUnit: "PC"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoRequestItem</summary>

Deletes an item from a debit memo request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"40"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoRequestItem(
    "70000003",
    "40",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getDebitMemoRequestOfA_DebitMemoRequestItem</summary>

Retrieves the debit memo request header that a specific item belongs to, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DebitMemoRequestItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DebitMemoRequestItem(
    "70000003",
    "10",
    queries = {
        \$select: ["DebitMemoRequest", "SoldToParty", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "SoldToParty": "10100001",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

#### Header partners

<details>
<summary>listA_DebitMemoReqPartners</summary>

Retrieves the header partners of all debit memo requests. Header partners apply to every item that has no item-specific partner for the same partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqPartnerWrapper result = check debitmemoClient->listA_DebitMemoReqPartners(
    queries = {
        \$filter: "PartnerFunction eq 'RE' and Customer eq '10100001'",
        \$select: ["DebitMemoRequest", "PartnerFunction", "Customer"],
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
        "DebitMemoRequest": "70000002",
        "PartnerFunction": "RE",
        "Customer": "10100001"
      },
      {
        "DebitMemoRequest": "70000003",
        "PartnerFunction": "RE",
        "Customer": "10100001"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPartnersOfA_DebitMemoRequest</summary>

Retrieves the header partners of a specific debit memo request through the `to_Partner` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_DebitMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqPartnerWrapper partners = check debitmemoClient->listPartnersOfA_DebitMemoRequest("70000003");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "PartnerFunction": "AG",
        "Customer": "10100001",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      },
      {
        "DebitMemoRequest": "70000003",
        "PartnerFunction": "WE",
        "Customer": "10100002",
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
<summary>getA_DebitMemoReqPartner</summary>

Retrieves a single header partner of a debit memo request by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoReqPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqPartnerWrapper partner = check debitmemoClient->getA_DebitMemoReqPartner("70000003", "WE");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "PartnerFunction": "WE",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "10100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "10100002"
  }
}
```

</details>

<details>
<summary>createA_DebitMemoReqPartner</summary>

Adds a header partner with a specific partner function to an existing debit memo request by posting to the header partner entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_DebitMemoReqPartner` | Yes | Partner data with the required `PartnerFunction` field and the partner number in `Customer`, `Supplier`, `Personnel` or `ContactPerson`. SAP also needs the `DebitMemoRequest` key; add it as an additional field, or use `createPartnerOfA_DebitMemoRequest`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoReqPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqPartnerWrapper newPartner = check debitmemoClient->createA_DebitMemoReqPartner({
    DebitMemoRequest: "70000003",
    PartnerFunction: "VE",
    Personnel: "50000012"
});
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "PartnerFunction": "VE",
    "Customer": "",
    "Supplier": "",
    "Personnel": "50000012",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>createPartnerOfA_DebitMemoRequest</summary>

Adds a header partner with a specific partner function to a debit memo request through the `to_Partner` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `payload` | `CreateA_DebitMemoReqPartner` | Yes | Partner data with the required `PartnerFunction` field and the partner number in `Customer`, `Supplier`, `Personnel` or `ContactPerson`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoReqPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqPartnerWrapper newPartner = check debitmemoClient->createPartnerOfA_DebitMemoRequest(
    "70000003",
    {
        PartnerFunction: "AP",
        ContactPerson: "10100041"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "PartnerFunction": "AP",
    "Customer": "",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "10100041"
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoReqPartner</summary>

Updates a header partner of a debit memo request using a PATCH request, for example to replace the ship-to party.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `payload` | `UpdateA_DebitMemoReqPartnerWrapper` | Yes | Wraps an `UpdateA_DebitMemoReqPartner` record (`Customer`, `Supplier`, `Personnel` or `ContactPerson`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoReqPartner(
    "70000003",
    "WE",
    {d: {Customer: "10100003"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoReqPartner</summary>

Deletes a header partner with a specific partner function from a debit memo request. Mandatory partners, such as the sold-to party, cannot be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"AP"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoReqPartner(
    "70000003",
    "AP",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getDebitMemoRequestOfA_DebitMemoReqPartner</summary>

Retrieves the debit memo request header that a specific header partner belongs to, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DebitMemoReqPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DebitMemoReqPartner(
    "70000003",
    "WE",
    queries = {
        \$select: ["DebitMemoRequest", "DebitMemoRequestType", "SoldToParty"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestType": "L2",
    "SoldToParty": "10100001"
  }
}
```

</details>

#### Item partners

<details>
<summary>listA_DebitMemoReqItemPartners</summary>

Retrieves the item partners of all debit memo requests. Item partners override the header partner with the same partner function for that item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqItemPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqItemPartnerWrapper result = check debitmemoClient->listA_DebitMemoReqItemPartners(
    queries = {
        \$filter: "DebitMemoRequest eq '70000003'",
        \$select: ["DebitMemoRequest", "DebitMemoRequestItem", "PartnerFunction", "Customer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "20",
        "PartnerFunction": "WE",
        "Customer": "10100004"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPartnersOfA_DebitMemoRequestItem</summary>

Retrieves the item partners of a specific debit memo request item through the `to_Partner` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"20"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_DebitMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqItemPartnerWrapper itemPartners = check debitmemoClient->listPartnersOfA_DebitMemoRequestItem("70000003", "20");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "20",
        "PartnerFunction": "WE",
        "Customer": "10100004",
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
<summary>getA_DebitMemoReqItemPartner</summary>

Retrieves a single item partner of a debit memo request item by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"20"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqItemPartnerWrapper itemPartner = check debitmemoClient->getA_DebitMemoReqItemPartner("70000003", "20", "WE");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "20",
    "PartnerFunction": "WE",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "10100004",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "10100004"
  }
}
```

</details>

<details>
<summary>createA_DebitMemoReqItemPartner</summary>

Adds an item partner with a specific partner function to an existing debit memo request item by posting to the item partner entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_DebitMemoReqItemPartner` | Yes | Partner data with the required `PartnerFunction` field and the partner number in `Customer`, `Supplier`, `Personnel` or `ContactPerson`. SAP also needs the `DebitMemoRequest` and `DebitMemoRequestItem` keys; add them as additional fields, or use `createPartnerOfA_DebitMemoRequestItem`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqItemPartnerWrapper newItemPartner = check debitmemoClient->createA_DebitMemoReqItemPartner({
    DebitMemoRequest: "70000003",
    DebitMemoRequestItem: "10",
    PartnerFunction: "WE",
    Customer: "10100004"
});
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "10",
    "PartnerFunction": "WE",
    "Customer": "10100004",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>createPartnerOfA_DebitMemoRequestItem</summary>

Adds an item partner with a specific partner function to a debit memo request item through the `to_Partner` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"30"`). |
| `payload` | `CreateA_DebitMemoReqItemPartner` | Yes | Partner data with the required `PartnerFunction` field and the partner number in `Customer`, `Supplier`, `Personnel` or `ContactPerson`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_DebitMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqItemPartnerWrapper newItemPartner = check debitmemoClient->createPartnerOfA_DebitMemoRequestItem(
    "70000003",
    "30",
    {
        PartnerFunction: "WE",
        Customer: "10100004"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "30",
    "PartnerFunction": "WE",
    "Customer": "10100004",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoReqItemPartner</summary>

Updates an item partner of a debit memo request item using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"20"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `payload` | `UpdateA_DebitMemoReqItemPartnerWrapper` | Yes | Wraps an `UpdateA_DebitMemoReqItemPartner` record (`Customer`, `Supplier`, `Personnel` or `ContactPerson`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoReqItemPartner(
    "70000003",
    "20",
    "WE",
    {d: {Customer: "10100005"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoReqItemPartner</summary>

Deletes an item partner with a specific partner function from a debit memo request item. The item then uses the header partner with the same partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"20"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoReqItemPartner(
    "70000003",
    "20",
    "WE",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getDebitMemoRequestOfA_DebitMemoReqItemPartner</summary>

Retrieves the debit memo request header that a specific item partner belongs to, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"20"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DebitMemoReqItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DebitMemoReqItemPartner(
    "70000003",
    "20",
    "WE",
    queries = {
        \$select: ["DebitMemoRequest", "SoldToParty", "SalesOrganization"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "SoldToParty": "10100001",
    "SalesOrganization": "1010"
  }
}
```

</details>

<details>
<summary>getDebitMemoRequestItemOfA_DebitMemoReqItemPartner</summary>

Retrieves the debit memo request item that a specific item partner belongs to, through the `to_DebitMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"20"`). |
| `PartnerFunction` | `string` | Yes | Partner function, 2 characters (e.g., `"WE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestItemOfA_DebitMemoReqItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestItemWrapper item = check debitmemoClient->getDebitMemoRequestItemOfA_DebitMemoReqItemPartner(
    "70000003",
    "20",
    "WE",
    queries = {
        \$select: ["DebitMemoRequest", "DebitMemoRequestItem", "Material", "NetAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "20",
    "Material": "TG12",
    "NetAmount": "40.00"
  }
}
```

</details>

#### Header pricing elements

<details>
<summary>listA_DebitMemoReqPrcgElmnts</summary>

Retrieves the header pricing elements (conditions) of all debit memo requests, with the condition type, rate, condition value and currency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqPrcgElmntWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqPrcgElmntWrapper result = check debitmemoClient->listA_DebitMemoReqPrcgElmnts(
    queries = {
        \$filter: "DebitMemoRequest eq '70000003'",
        \$select: ["DebitMemoRequest", "PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionAmount"],
        \$orderby: ["PricingProcedureStep"],
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
        "DebitMemoRequest": "70000003",
        "PricingProcedureStep": "010",
        "PricingProcedureCounter": "001",
        "ConditionType": "PPR0",
        "ConditionAmount": "250.00"
      },
      {
        "DebitMemoRequest": "70000003",
        "PricingProcedureStep": "700",
        "PricingProcedureCounter": "001",
        "ConditionType": "TTX1",
        "ConditionAmount": "47.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPricingElementsOfA_DebitMemoRequest</summary>

Retrieves the header pricing elements of a specific debit memo request through the `to_PricingElement` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_DebitMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqPrcgElmntWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqPrcgElmntWrapper conditions = check debitmemoClient->listPricingElementsOfA_DebitMemoRequest(
    "70000003",
    queries = {
        \$select: ["PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionCurrency"]
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
        "ConditionRateValue": "25.00",
        "ConditionCurrency": "EUR"
      },
      {
        "PricingProcedureStep": "700",
        "PricingProcedureCounter": "001",
        "ConditionType": "TTX1",
        "ConditionRateValue": "19.000",
        "ConditionCurrency": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoReqPrcgElmnt</summary>

Retrieves a single header pricing element of a debit memo request by its step number and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure, up to 3 characters (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter, up to 3 characters (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoReqPrcgElmntWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqPrcgElmntWrapper condition = check debitmemoClient->getA_DebitMemoReqPrcgElmnt("70000003", "010", "001");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "PricingProcedureStep": "010",
    "PricingProcedureCounter": "001",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionCalculationType": "C",
    "ConditionBaseValue": "10.000",
    "ConditionRateValue": "25.00",
    "ConditionCurrency": "EUR",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionCategory": "H",
    "ConditionIsForStatistics": false,
    "ConditionAmount": "250.00",
    "TransactionCurrency": "EUR",
    "ConditionIsManuallyChanged": false
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoReqPrcgElmnt</summary>

Updates a header pricing element of a debit memo request using a PATCH request, for example the condition rate of a manual header condition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `payload` | `UpdateA_DebitMemoReqPrcgElmntWrapper` | Yes | Wraps an `UpdateA_DebitMemoReqPrcgElmnt` record (`ConditionType`, `ConditionRateValue`, `ConditionCurrency`, `ConditionQuantity`, `ConditionQuantityUnit` or `TransactionCurrency`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoReqPrcgElmnt(
    "70000003",
    "010",
    "001",
    {d: {ConditionRateValue: "27.50", ConditionCurrency: "EUR"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoReqPrcgElmnt</summary>

Deletes a header pricing element from a debit memo request. Only conditions that can be changed manually can be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"110"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoReqPrcgElmnt(
    "70000003",
    "110",
    "001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getDebitMemoRequestOfA_DebitMemoReqPrcgElmnt</summary>

Retrieves the debit memo request header that a specific header pricing element belongs to, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DebitMemoReqPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DebitMemoReqPrcgElmnt(
    "70000003",
    "010",
    "001",
    queries = {
        \$select: ["DebitMemoRequest", "TotalNetAmount", "TransactionCurrency", "PricingDate"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR",
    "PricingDate": "/Date(1794268800000)/"
  }
}
```

</details>

#### Item pricing elements

<details>
<summary>listA_DebitMemoReqItemPrcgElmnts</summary>

Retrieves the item pricing elements (conditions) of all debit memo requests.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqItemPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqItemPrcgElmntWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqItemPrcgElmntWrapper result = check debitmemoClient->listA_DebitMemoReqItemPrcgElmnts(
    queries = {
        \$filter: "DebitMemoRequest eq '70000003' and ConditionType eq 'PPR0'",
        \$select: ["DebitMemoRequest", "DebitMemoRequestItem", "ConditionType", "ConditionRateValue", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "10",
        "ConditionType": "PPR0",
        "ConditionRateValue": "25.00",
        "ConditionAmount": "250.00"
      },
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "20",
        "ConditionType": "PPR0",
        "ConditionRateValue": "20.00",
        "ConditionAmount": "40.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPricingElementsOfA_DebitMemoRequestItem</summary>

Retrieves the pricing elements of a specific debit memo request item through the `to_PricingElement` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_DebitMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqItemPrcgElmntWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqItemPrcgElmntWrapper itemConditions = check debitmemoClient->listPricingElementsOfA_DebitMemoRequestItem(
    "70000003",
    "10",
    queries = {
        \$select: ["PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionAmount"],
        \$orderby: ["PricingProcedureStep"]
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
        "ConditionAmount": "250.00"
      },
      {
        "PricingProcedureStep": "700",
        "PricingProcedureCounter": "001",
        "ConditionType": "TTX1",
        "ConditionAmount": "47.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoReqItemPrcgElmnt</summary>

Retrieves a single pricing element of a debit memo request item by its step number and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure, up to 3 characters (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter, up to 3 characters (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoReqItemPrcgElmntWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqItemPrcgElmntWrapper itemCondition = check debitmemoClient->getA_DebitMemoReqItemPrcgElmnt("70000003", "10", "010", "001");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "10",
    "PricingProcedureStep": "010",
    "PricingProcedureCounter": "001",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionCalculationType": "C",
    "ConditionBaseValue": "10.000",
    "ConditionRateValue": "25.00",
    "ConditionCurrency": "EUR",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionCategory": "H",
    "ConditionIsForStatistics": false,
    "ConditionRecord": "0000004711",
    "ConditionAmount": "250.00",
    "TransactionCurrency": "EUR",
    "ConditionIsManuallyChanged": false
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoReqItemPrcgElmnt</summary>

Updates a pricing element of a debit memo request item using a PATCH request, for example to override the price of the item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `payload` | `UpdateA_DebitMemoReqItemPrcgElmntWrapper` | Yes | Wraps an `UpdateA_DebitMemoReqItemPrcgElmnt` record (`ConditionType`, `ConditionRateValue`, `ConditionCurrency`, `ConditionQuantity`, the condition quantity units or `TransactionCurrency`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoReqItemPrcgElmnt(
    "70000003",
    "10",
    "010",
    "001",
    {d: {ConditionRateValue: "26.00", ConditionCurrency: "EUR"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoReqItemPrcgElmnt</summary>

Deletes a pricing element from a debit memo request item. Only conditions that can be changed manually can be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"110"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoReqItemPrcgElmnt(
    "70000003",
    "10",
    "110",
    "001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getDebitMemoRequestOfA_DebitMemoReqItemPrcgElmnt</summary>

Retrieves the debit memo request header that a specific item pricing element belongs to, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DebitMemoReqItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DebitMemoReqItemPrcgElmnt(
    "70000003",
    "10",
    "010",
    "001",
    queries = {
        \$select: ["DebitMemoRequest", "SoldToParty", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "SoldToParty": "10100001",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>getDebitMemoRequestItemOfA_DebitMemoReqItemPrcgElmnt</summary>

Retrieves the debit memo request item that a specific item pricing element belongs to, through the `to_DebitMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"010"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestItemOfA_DebitMemoReqItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestItemWrapper item = check debitmemoClient->getDebitMemoRequestItemOfA_DebitMemoReqItemPrcgElmnt(
    "70000003",
    "10",
    "010",
    "001",
    queries = {
        \$select: ["DebitMemoRequestItem", "Material", "RequestedQuantity", "RequestedQuantityUnit", "NetAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequestItem": "10",
    "Material": "TG11",
    "RequestedQuantity": "10",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00"
  }
}
```

</details>

#### Header texts

<details>
<summary>listA_DebitMemoReqTexts</summary>

Retrieves the header texts of all debit memo requests, with the language, text ID and text content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqTextWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqTextWrapper result = check debitmemoClient->listA_DebitMemoReqTexts(
    queries = {
        \$filter: "Language eq 'EN' and LongTextID eq '0001'",
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
        "DebitMemoRequest": "70000002",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Surcharge for express delivery."
      },
      {
        "DebitMemoRequest": "70000003",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Price correction for invoice 90000005."
      }
    ]
  }
}
```

</details>

<details>
<summary>listTextsOfA_DebitMemoRequest</summary>

Retrieves the header texts of a specific debit memo request through the `to_Text` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_DebitMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqTextWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqTextWrapper texts = check debitmemoClient->listTextsOfA_DebitMemoRequest("70000003");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Price correction for invoice 90000005."
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoReqText</summary>

Retrieves a single header text of a debit memo request by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `Language` | `string` | Yes | Language key, 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_DebitMemoReqTextWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqTextWrapper text = check debitmemoClient->getA_DebitMemoReqText("70000003", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Price correction for invoice 90000005."
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoReqText</summary>

Replaces the content of a header text of a debit memo request using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `payload` | `UpdateA_DebitMemoReqTextWrapper` | Yes | Wraps an `UpdateA_DebitMemoReqText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoReqText(
    "70000003",
    "EN",
    "0001",
    {d: {LongText: "Price correction for invoice 90000005, approved by sales."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoReqText</summary>

Deletes a header text of a debit memo request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoReqText(
    "70000003",
    "EN",
    "0001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Item texts

<details>
<summary>listA_DebitMemoReqItemTexts</summary>

Retrieves the item texts of all debit memo requests.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqItemTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqItemTextWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqItemTextWrapper result = check debitmemoClient->listA_DebitMemoReqItemTexts(
    queries = {
        \$filter: "DebitMemoRequest eq '70000003' and Language eq 'EN'",
        \$orderby: ["DebitMemoRequestItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Price difference for invoice 90000005."
      },
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "30",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Freight surcharge not invoiced."
      }
    ]
  }
}
```

</details>

<details>
<summary>listTextsOfA_DebitMemoRequestItem</summary>

Retrieves the texts of a specific debit memo request item through the `to_Text` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_DebitMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqItemTextWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqItemTextWrapper itemTexts = check debitmemoClient->listTextsOfA_DebitMemoRequestItem("70000003", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000003",
        "DebitMemoRequestItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Price difference for invoice 90000005."
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoReqItemText</summary>

Retrieves a single text of a debit memo request item by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key, 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqItemTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_DebitMemoReqItemTextWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqItemTextWrapper itemText = check debitmemoClient->getA_DebitMemoReqItemText("70000003", "10", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000003",
    "DebitMemoRequestItem": "10",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Price difference for invoice 90000005."
  }
}
```

</details>

<details>
<summary>patchA_DebitMemoReqItemText</summary>

Replaces the content of a text of a debit memo request item using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `payload` | `UpdateA_DebitMemoReqItemTextWrapper` | Yes | Wraps an `UpdateA_DebitMemoReqItemText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->patchA_DebitMemoReqItemText(
    "70000003",
    "10",
    "EN",
    "0001",
    {d: {LongText: "Price difference of 2.50 EUR per piece for invoice 90000005."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_DebitMemoReqItemText</summary>

Deletes a text of a debit memo request item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000003"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"30"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check debitmemoClient->deleteA_DebitMemoReqItemText(
    "70000003",
    "30",
    "EN",
    "0001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Subsequent documents

<details>
<summary>listA_DebitMemoReqSubsqntProcFlows</summary>

Retrieves the subsequent documents of all debit memo requests, such as the debit memos created from them in billing, with the document category and status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DebitMemoReqSubsqntProcFlowsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqSubsqntProcFlowWrapper result = check debitmemoClient->listA_DebitMemoReqSubsqntProcFlows(
    queries = {
        \$filter: "SubsequentDocumentCategory eq 'P'",
        \$select: ["DebitMemoRequest", "SubsequentDocument", "SubsequentDocumentCategory", "CreationDate"],
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
        "DebitMemoRequest": "70000001",
        "SubsequentDocument": "90000011",
        "SubsequentDocumentCategory": "P",
        "CreationDate": "/Date(1793491200000)/"
      },
      {
        "DebitMemoRequest": "70000002",
        "SubsequentDocument": "90000012",
        "SubsequentDocumentCategory": "P",
        "CreationDate": "/Date(1794441600000)/"
      }
    ]
  }
}
```

</details>

<details>
<summary>listSubsequentProcFlowDocsOfA_DebitMemoRequest</summary>

Retrieves the subsequent documents of a specific debit memo request through the `to_SubsequentProcFlowDoc` navigation, for example to check whether a debit memo has been created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSubsequentProcFlowDocsOfA_DebitMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DebitMemoReqSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DebitMemoReqSubsqntProcFlowWrapper subsequentDocs = check debitmemoClient->listSubsequentProcFlowDocsOfA_DebitMemoRequest("70000002");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000002",
        "SubsequentDocument": "90000012",
        "SubsequentDocumentCategory": "P",
        "ProcessFlowLevel": "00",
        "OverallBillingStatus": "",
        "OverallSDProcessStatus": "",
        "RelatedProcFlowDocStsFieldName": "",
        "CreationDate": "/Date(1794441600000)/",
        "CreationTime": "PT10H15M30S",
        "LastChangeDate": null
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DebitMemoReqSubsqntProcFlow</summary>

Retrieves a single subsequent document of a debit memo request by the subsequent document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `SubsequentDocument` | `string` | Yes | Subsequent document number, up to 10 characters (e.g., `"90000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DebitMemoReqSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoReqSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoReqSubsqntProcFlowWrapper subsequentDoc = check debitmemoClient->getA_DebitMemoReqSubsqntProcFlow("70000002", "90000012");
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000002",
    "SubsequentDocument": "90000012",
    "SubsequentDocumentCategory": "P",
    "ProcessFlowLevel": "00",
    "OverallBillingStatus": "",
    "OverallSDProcessStatus": "",
    "CreationDate": "/Date(1794441600000)/",
    "CreationTime": "PT10H15M30S",
    "LastChangeDate": null
  }
}
```

</details>

<details>
<summary>getDebitMemoRequestOfA_DebitMemoReqSubsqntProcFlow</summary>

Retrieves the debit memo request header of a specific subsequent document, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `SubsequentDocument` | `string` | Yes | Subsequent document number (e.g., `"90000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DebitMemoReqSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DebitMemoReqSubsqntProcFlow(
    "70000002",
    "90000012",
    queries = {
        \$select: ["DebitMemoRequest", "SoldToParty", "OverallSDProcessStatus", "OverallOrdReltdBillgStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000002",
    "SoldToParty": "10100001",
    "OverallSDProcessStatus": "C",
    "OverallOrdReltdBillgStatus": "C"
  }
}
```

</details>

#### Item subsequent documents

<details>
<summary>listA_DbtMemoReqItmSubsqntProcFlows</summary>

Retrieves the subsequent items of all debit memo request items, such as the debit memo items created in billing, with the posting status for accounting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_DbtMemoReqItmSubsqntProcFlowsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DbtMemoReqItmSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DbtMemoReqItmSubsqntProcFlowWrapper result = check debitmemoClient->listA_DbtMemoReqItmSubsqntProcFlows(
    queries = {
        \$filter: "DebitMemoRequest eq '70000002'",
        \$select: ["DebitMemoRequest", "DebitMemoRequestItem", "DocRelationshipUUID", "SubsequentDocument", "SubsequentDocumentItem", "AccountingTransferStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000002",
        "DebitMemoRequestItem": "10",
        "DocRelationshipUUID": "fa163e8b-25a4-1eef-a8d2-79b61c0e4b21",
        "SubsequentDocument": "90000012",
        "SubsequentDocumentItem": "10",
        "AccountingTransferStatus": "C"
      }
    ]
  }
}
```

</details>

<details>
<summary>listItemSubsqntProcFlowsOfA_DebitMemoRequestItem</summary>

Retrieves the subsequent items of a specific debit memo request item through the `to_ItemSubsqntProcFlow` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemSubsqntProcFlowsOfA_DebitMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_DbtMemoReqItmSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
debitmemo:CollectionOfA_DbtMemoReqItmSubsqntProcFlowWrapper itemFlow = check debitmemoClient->listItemSubsqntProcFlowsOfA_DebitMemoRequestItem("70000002", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DebitMemoRequest": "70000002",
        "DebitMemoRequestItem": "10",
        "DocRelationshipUUID": "fa163e8b-25a4-1eef-a8d2-79b61c0e4b21",
        "SubsequentDocument": "90000012",
        "SubsequentDocumentItem": "10",
        "SubsequentDocumentCategory": "P",
        "ProcessFlowLevel": "00",
        "AccountingTransferStatus": "C",
        "SDProcessStatus": "",
        "CreationDate": "/Date(1794441600000)/",
        "CreationTime": "PT10H15M30S"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DbtMemoReqItmSubsqntProcFlow</summary>

Retrieves a single subsequent item of a debit memo request item by its document relationship UUID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `DocRelationshipUUID` | `string` | Yes | Document relationship UUID, without the `guid` prefix or quotes (e.g., `"fa163e8b-25a4-1eef-a8d2-79b61c0e4b21"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_DbtMemoReqItmSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DbtMemoReqItmSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
debitmemo:A_DbtMemoReqItmSubsqntProcFlowWrapper itemFlow = check debitmemoClient->getA_DbtMemoReqItmSubsqntProcFlow(
    "70000002",
    "10",
    "fa163e8b-25a4-1eef-a8d2-79b61c0e4b21"
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000002",
    "DebitMemoRequestItem": "10",
    "DocRelationshipUUID": "fa163e8b-25a4-1eef-a8d2-79b61c0e4b21",
    "SubsequentDocument": "90000012",
    "SubsequentDocumentItem": "10",
    "SubsequentDocumentCategory": "P",
    "ProcessFlowLevel": "00",
    "AccountingTransferStatus": "C",
    "SubsqntDocItmPrecdgDocument": "70000002",
    "SubsqntDocItmPrecdgDocItem": "10",
    "SubsqntDocItmPrecdgDocCategory": "L",
    "CreationDate": "/Date(1794441600000)/",
    "CreationTime": "PT10H15M30S"
  }
}
```

</details>

<details>
<summary>getDebitMemoRequestOfA_DbtMemoReqItmSubsqntProcFlow</summary>

Retrieves the debit memo request header of a specific subsequent item, through the `to_DebitMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `DocRelationshipUUID` | `string` | Yes | Document relationship UUID, without the `guid` prefix or quotes (e.g., `"fa163e8b-25a4-1eef-a8d2-79b61c0e4b21"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestOfA_DbtMemoReqItmSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestWrapper header = check debitmemoClient->getDebitMemoRequestOfA_DbtMemoReqItmSubsqntProcFlow(
    "70000002",
    "10",
    "fa163e8b-25a4-1eef-a8d2-79b61c0e4b21",
    queries = {
        \$select: ["DebitMemoRequest", "SoldToParty", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequest": "70000002",
    "SoldToParty": "10100001",
    "TotalNetAmount": "120.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>getDebitMemoRequestItemOfA_DbtMemoReqItmSubsqntProcFlow</summary>

Retrieves the debit memo request item of a specific subsequent item, through the `to_DebitMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DebitMemoRequest` | `string` | Yes | Debit memo request number (e.g., `"70000002"`). |
| `DebitMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `DocRelationshipUUID` | `string` | Yes | Document relationship UUID, without the `guid` prefix or quotes (e.g., `"fa163e8b-25a4-1eef-a8d2-79b61c0e4b21"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDebitMemoRequestItemOfA_DbtMemoReqItmSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_DebitMemoRequestItemWrapper|error`

Sample code:

```ballerina
debitmemo:A_DebitMemoRequestItemWrapper item = check debitmemoClient->getDebitMemoRequestItemOfA_DbtMemoReqItmSubsqntProcFlow(
    "70000002",
    "10",
    "fa163e8b-25a4-1eef-a8d2-79b61c0e4b21",
    queries = {
        \$select: ["DebitMemoRequestItem", "Material", "NetAmount", "OrderRelatedBillingStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DebitMemoRequestItem": "10",
    "Material": "TG11",
    "NetAmount": "120.00",
    "OrderRelatedBillingStatus": "C"
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

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
string boundary = "batch_dmr001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_DebitMemoRequest('70000003') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_DebitMemoRequest('70000003')/to_Item HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check debitmemoClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
