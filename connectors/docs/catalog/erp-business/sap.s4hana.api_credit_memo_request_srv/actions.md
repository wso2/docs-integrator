---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_credit_memo_request_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Creates, reads, updates and deletes SAP S/4HANA credit memo requests with their items, partners, pricing elements and texts, reads their subsequent documents, and releases or rejects their approval requests via the `API_CREDIT_MEMO_REQUEST_SRV` OData API. |

---

## Client

Creates, reads, updates and deletes SAP S/4HANA credit memo requests with their items, partners, pricing elements and texts, reads their subsequent documents, and releases or rejects their approval requests via the `API_CREDIT_MEMO_REQUEST_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_CREDIT_MEMO_REQUEST_SRV` from these values.

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
import ballerinax/sap.s4hana.api_credit_memo_request_srv as creditmemo;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

creditmemo:Client creditMemoClient = check new (
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

A credit memo request is identified by its document number (`CreditMemoRequest`, up to 10 characters) and an item by the document number and item number (`CreditMemoRequestItem`, up to 6 characters, for example `10`). Partners are identified by their partner function (for example, `AG` for the sold-to party and `WE` for the ship-to party), pricing elements by their pricing procedure step and condition counter, and texts by their language and text ID.

Credit memo requests and items are created with deep insert requests: SAP expects the header together with its items, and an item together with its item partners and item pricing elements, in one request. The API has no separate create operations for pricing elements and texts; include them in the `to_PricingElement` and `to_Text` entities of the header or item create request.

The `patch` operations take an `Update...Wrapper` record that wraps the matching `Update...` record in a `d` field, for example `{d: {HeaderBillingBlockReason: ""}}`. Update and delete operations return an `http:Response`; include an `If-Match` header with the entity ETag (or `*`) for optimistic locking.

`releaseApprovalRequest` and `rejectApprovalRequest` are OData function imports. Their `CreditMemoRequest` query parameter must be enclosed in single quotes, for example `"'60000002'"`.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property and navigation names, and `$top` and `$skip` take integers.

#### Credit memo requests

<details>
<summary>listA_CreditMemoRequests</summary>

Retrieves a collection of credit memo request headers, with the sales area, sold-to party, net amount, order reason, billing block and processing statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoRequestsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoRequestWrapper result = check creditMemoClient->listA_CreditMemoRequests(
    queries = {
        \$filter: "SalesOrganization eq '1010' and HeaderBillingBlockReason eq '08'",
        \$select: ["CreditMemoRequest", "SoldToParty", "TotalNetAmount", "TransactionCurrency", "SDDocumentReason"],
        \$orderby: ["CreditMemoRequest desc"],
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
        "CreditMemoRequest": "60000002",
        "SoldToParty": "10100001",
        "TotalNetAmount": "250.00",
        "TransactionCurrency": "EUR",
        "SDDocumentReason": "001"
      },
      {
        "CreditMemoRequest": "60000001",
        "SoldToParty": "10100003",
        "TotalNetAmount": "84.00",
        "TransactionCurrency": "EUR",
        "SDDocumentReason": "002"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_CreditMemoRequest</summary>

Creates a credit memo request using a deep insert request: the header together with its items and, optionally, header partners, header pricing elements and texts, and item partners and item pricing elements. SAP does not create a credit memo request without related entities, so include at least one item in `to_Item`. To create the request with reference to a preceding document, such as a billing document, set `ReferenceSDDocument` on the header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CreditMemoRequest` | Yes | Credit memo request header with nested `to_Item`, `to_Partner`, `to_PricingElement` and `to_Text` entities. `CreditMemoRequest` is a required field; the sample passes an empty string and reads the number SAP assigns from the response. Each item requires `CreditMemoRequestItem`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper created = check creditMemoClient->createA_CreditMemoRequest({
    CreditMemoRequest: "",
    CreditMemoRequestType: "CR",
    SalesOrganization: "1010",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "10100001",
    PurchaseOrderByCustomer: "CLAIM-2026-0418",
    SDDocumentReason: "001",
    to_Item: {
        results: [{
            CreditMemoRequestItem: "10",
            Material: "TG11",
            RequestedQuantity: "5",
            RequestedQuantityUnit: "PC"
        }]
    },
    to_Text: {
        results: [{
            Language: "EN",
            LongTextID: "0001",
            LongText: "Credit for 5 units damaged in transit, see claim CLAIM-2026-0418."
        }]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestType": "CR",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "10100001",
    "PurchaseOrderByCustomer": "CLAIM-2026-0418",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR",
    "SDDocumentReason": "001",
    "HeaderBillingBlockReason": "08",
    "OverallSDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>getA_CreditMemoRequest</summary>

Retrieves the header of a single credit memo request by its number. Expand `to_Item`, `to_Partner`, `to_PricingElement`, `to_SubsequentProcFlowDoc` or `to_Text` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoRequestQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper creditMemoRequest = check creditMemoClient->getA_CreditMemoRequest(
    "60000002",
    queries = {
        \$expand: ["to_Item"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestType": "CR",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "10100001",
    "CreditMemoRequestDate": "/Date(1793664000000)/",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR",
    "SDDocumentReason": "001",
    "HeaderBillingBlockReason": "08",
    "SalesDocApprovalStatus": "",
    "OverallSDProcessStatus": "A",
    "to_Item": {
      "results": [
        {
          "CreditMemoRequest": "60000002",
          "CreditMemoRequestItem": "10",
          "Material": "TG11",
          "RequestedQuantity": "5",
          "RequestedQuantityUnit": "PC",
          "NetAmount": "250.00"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoRequest</summary>

Updates the header data of a credit memo request using a PATCH request, for example the customer reference, the order reason or the billing block. Removing the billing block (`HeaderBillingBlockReason`) lets billing create the credit memo.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `payload` | `UpdateA_CreditMemoRequestWrapper` | Yes | Wraps an `UpdateA_CreditMemoRequest` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoRequest(
    "60000002",
    {d: {HeaderBillingBlockReason: "", PurchaseOrderByCustomer: "CLAIM-2026-0418-A"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoRequest</summary>

Deletes a credit memo request that has not yet been billed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoRequest(
    "60000003",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Credit memo request items

<details>
<summary>listA_CreditMemoRequestItems</summary>

Retrieves a collection of credit memo request items across all credit memo requests, with the material, requested quantity, net amount, plant and item statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoRequestItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoRequestItemWrapper items = check creditMemoClient->listA_CreditMemoRequestItems(
    queries = {
        \$filter: "Material eq 'TG11'",
        \$select: ["CreditMemoRequest", "CreditMemoRequestItem", "Material", "RequestedQuantity", "RequestedQuantityUnit", "NetAmount"],
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
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "Material": "TG11",
        "RequestedQuantity": "5",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "250.00"
      },
      {
        "CreditMemoRequest": "60000004",
        "CreditMemoRequestItem": "20",
        "Material": "TG11",
        "RequestedQuantity": "2",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "100.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>listItemsOfA_CreditMemoRequest</summary>

Retrieves the items of a specific credit memo request through the `to_Item` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemsOfA_CreditMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoRequestItemWrapper items = check creditMemoClient->listItemsOfA_CreditMemoRequest(
    "60000002",
    queries = {
        \$select: ["CreditMemoRequestItem", "Material", "RequestedQuantity", "RequestedQuantityUnit", "NetAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequestItem": "10",
        "Material": "TG11",
        "RequestedQuantity": "5",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "250.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_CreditMemoRequestItem</summary>

Creates a credit memo request item in an existing credit memo request using a deep insert request, so that the item partners and item pricing elements can be created in the same request. The `CreateA_CreditMemoRequestItem` record has no `CreditMemoRequest` field, but the record is open, so pass the credit memo request number as an additional field. To create an item through the header instead, use `createItemOfA_CreditMemoRequest`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CreditMemoRequestItem` | Yes | Item data with the required `CreditMemoRequestItem` field, the `CreditMemoRequest` key as an additional field, and optional nested `to_Partner`, `to_PricingElement` and `to_Text` entities. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->createA_CreditMemoRequestItem({
    "CreditMemoRequest": "60000002",
    CreditMemoRequestItem: "20",
    Material: "TG12",
    RequestedQuantity: "2",
    RequestedQuantityUnit: "PC"
});
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "20",
    "CreditMemoRequestItemCategory": "G2N",
    "Material": "TG12",
    "RequestedQuantity": "2",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "60.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>createItemOfA_CreditMemoRequest</summary>

Creates an item for a specific credit memo request through the `to_Item` navigation. The request is a deep insert, so you can include the item partners, item pricing elements and item texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `payload` | `CreateA_CreditMemoRequestItem` | Yes | Item data with the required `CreditMemoRequestItem` field and optional nested `to_Partner`, `to_PricingElement` and `to_Text` entities. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->createItemOfA_CreditMemoRequest(
    "60000002",
    {
        CreditMemoRequestItem: "30",
        Material: "TG11",
        RequestedQuantity: "1",
        RequestedQuantityUnit: "PC",
        to_PricingElement: {
            results: [{
                PricingProcedureStep: "10",
                PricingProcedureCounter: "1",
                ConditionType: "PPR0",
                ConditionRateValue: "45.00",
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
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "30",
    "CreditMemoRequestItemCategory": "G2N",
    "Material": "TG11",
    "RequestedQuantity": "1",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "45.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>getA_CreditMemoRequestItem</summary>

Retrieves a single credit memo request item by the credit memo request number and item number. Expand `to_CreditMemoRequest`, `to_ItemSubsqntProcFlow`, `to_Partner`, `to_PricingElement` or `to_Text` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoRequestItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->getA_CreditMemoRequestItem("60000002", "10");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "10",
    "HigherLevelItem": "0",
    "CreditMemoRequestItemCategory": "G2N",
    "CreditMemoRequestItemText": "Trading Good 11",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "TransactionCurrency": "EUR",
    "NetAmount": "250.00",
    "Plant": "1010",
    "ItemBillingBlockReason": "",
    "SalesDocumentRjcnReason": "",
    "SDProcessStatus": "A",
    "OrderRelatedBillingStatus": "A"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoRequestItem</summary>

Retrieves the credit memo request header of a specific item through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoRequestItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoRequestItem(
    "60000002",
    "10",
    queries = {
        \$select: ["CreditMemoRequest", "SoldToParty", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "SoldToParty": "10100001",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoRequestItem</summary>

Updates a credit memo request item using a PATCH request, for example the requested quantity, the item billing block or a reason for rejection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `payload` | `UpdateA_CreditMemoRequestItemWrapper` | Yes | Wraps an `UpdateA_CreditMemoRequestItem` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoRequestItem(
    "60000002",
    "10",
    {d: {RequestedQuantity: "4", RequestedQuantityUnit: "PC"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoRequestItem</summary>

Deletes an item from a credit memo request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoRequestItem(
    "60000002",
    "30",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Header partners

<details>
<summary>listA_CreditMemoReqPartners</summary>

Retrieves a collection of header partners across all credit memo requests, with the partner function and the customer, supplier, personnel number or contact person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqPartnerWrapper partners = check creditMemoClient->listA_CreditMemoReqPartners(
    queries = {
        \$filter: "CreditMemoRequest eq '60000002'",
        \$select: ["CreditMemoRequest", "PartnerFunction", "Customer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "PartnerFunction": "AG",
        "Customer": "10100001"
      },
      {
        "CreditMemoRequest": "60000002",
        "PartnerFunction": "RE",
        "Customer": "10100001"
      },
      {
        "CreditMemoRequest": "60000002",
        "PartnerFunction": "RG",
        "Customer": "10100001"
      },
      {
        "CreditMemoRequest": "60000002",
        "PartnerFunction": "WE",
        "Customer": "10100001"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPartnersOfA_CreditMemoRequest</summary>

Retrieves the header partners of a specific credit memo request through the `to_Partner` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_CreditMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqPartnerWrapper partners = check creditMemoClient->listPartnersOfA_CreditMemoRequest("60000002");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "PartnerFunction": "AG",
        "PartnerFunctionInternalCode": "AG",
        "Customer": "10100001",
        "Supplier": "",
        "Personnel": "",
        "ContactPerson": ""
      },
      {
        "CreditMemoRequest": "60000002",
        "PartnerFunction": "WE",
        "PartnerFunctionInternalCode": "WE",
        "Customer": "10100001",
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
<summary>createA_CreditMemoReqPartner</summary>

Creates an additional header partner with a specific partner function for an existing credit memo request. SAP needs the credit memo request number and the partner function as keys. The `CreateA_CreditMemoReqPartner` record has no `CreditMemoRequest` field, but the record is open, so pass the number as an additional field, or use `createPartnerOfA_CreditMemoRequest` instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CreditMemoReqPartner` | Yes | Partner data with the required `PartnerFunction` field, the `CreditMemoRequest` key as an additional field, and the `Customer`, `Supplier`, `Personnel` or `ContactPerson`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoReqPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqPartnerWrapper partner = check creditMemoClient->createA_CreditMemoReqPartner({
    "CreditMemoRequest": "60000002",
    PartnerFunction: "VE",
    Personnel: "50000012"
});
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "PartnerFunction": "VE",
    "PartnerFunctionInternalCode": "VE",
    "Customer": "",
    "Supplier": "",
    "Personnel": "50000012",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>createPartnerOfA_CreditMemoRequest</summary>

Creates a header partner for a specific credit memo request through the `to_Partner` navigation. Header partners apply to all items that have no item-specific partner for the same partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `payload` | `CreateA_CreditMemoReqPartner` | Yes | Partner data with the required `PartnerFunction` field and the `Customer`, `Supplier`, `Personnel` or `ContactPerson`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoReqPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqPartnerWrapper partner = check creditMemoClient->createPartnerOfA_CreditMemoRequest(
    "60000002",
    {
        PartnerFunction: "AP",
        ContactPerson: "10100010"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "PartnerFunction": "AP",
    "PartnerFunctionInternalCode": "AP",
    "Customer": "",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "10100010"
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqPartner</summary>

Retrieves a single header partner of a credit memo request by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqPartnerWrapper partner = check creditMemoClient->getA_CreditMemoReqPartner("60000002", "WE");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "PartnerFunction": "WE",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "10100001",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "10100001"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoReqPartner</summary>

Retrieves the credit memo request header of a specific header partner through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqPartner(
    "60000002",
    "WE",
    queries = {
        \$select: ["CreditMemoRequest", "CreditMemoRequestType", "SoldToParty"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestType": "CR",
    "SoldToParty": "10100001"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoReqPartner</summary>

Updates the header partner of a credit memo request with a specific partner function using a PATCH request, for example to assign another ship-to party.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `payload` | `UpdateA_CreditMemoReqPartnerWrapper` | Yes | Wraps an `UpdateA_CreditMemoReqPartner` record (`Customer`, `Supplier`, `Personnel` or `ContactPerson`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoReqPartner(
    "60000002",
    "WE",
    {d: {Customer: "10100002"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoReqPartner</summary>

Deletes the header partner of a credit memo request with a specific partner function. Mandatory partner functions, such as the sold-to party, cannot be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoReqPartner(
    "60000002",
    "AP",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Item partners

<details>
<summary>listA_CreditMemoReqItemPartners</summary>

Retrieves a collection of item partners across all credit memo request items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqItemPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqItemPartnerWrapper itemPartners = check creditMemoClient->listA_CreditMemoReqItemPartners(
    queries = {
        \$filter: "CreditMemoRequest eq '60000002'",
        \$select: ["CreditMemoRequest", "CreditMemoRequestItem", "PartnerFunction", "Customer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "PartnerFunction": "WE",
        "Customer": "10100002"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPartnersOfA_CreditMemoRequestItem</summary>

Retrieves the item partners of a specific credit memo request item through the `to_Partner` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_CreditMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqItemPartnerWrapper itemPartners = check creditMemoClient->listPartnersOfA_CreditMemoRequestItem("60000002", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "PartnerFunction": "WE",
        "PartnerFunctionInternalCode": "WE",
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
<summary>createA_CreditMemoReqItemPartner</summary>

Creates an additional item partner with a specific partner function for an existing credit memo request item. SAP needs the credit memo request number, the item number and the partner function as keys. The `CreateA_CreditMemoReqItemPartner` record has no `CreditMemoRequest` or `CreditMemoRequestItem` field, but the record is open, so pass them as additional fields, or use `createPartnerOfA_CreditMemoRequestItem` instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CreditMemoReqItemPartner` | Yes | Partner data with the required `PartnerFunction` field, the `CreditMemoRequest` and `CreditMemoRequestItem` keys as additional fields, and the `Customer`, `Supplier`, `Personnel` or `ContactPerson`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqItemPartnerWrapper itemPartner = check creditMemoClient->createA_CreditMemoReqItemPartner({
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "20",
    PartnerFunction: "WE",
    Customer: "10100002"
});
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "20",
    "PartnerFunction": "WE",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "10100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>createPartnerOfA_CreditMemoRequestItem</summary>

Creates an item partner for a specific credit memo request item through the `to_Partner` navigation. An item partner overrides the header partner with the same partner function for this item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `payload` | `CreateA_CreditMemoReqItemPartner` | Yes | Partner data with the required `PartnerFunction` field and the `Customer`, `Supplier`, `Personnel` or `ContactPerson`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CreditMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqItemPartnerWrapper itemPartner = check creditMemoClient->createPartnerOfA_CreditMemoRequestItem(
    "60000002",
    "10",
    {
        PartnerFunction: "WE",
        Customer: "10100002"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "10",
    "PartnerFunction": "WE",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "10100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqItemPartner</summary>

Retrieves a single item partner of a credit memo request item by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqItemPartnerWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqItemPartnerWrapper itemPartner = check creditMemoClient->getA_CreditMemoReqItemPartner("60000002", "10", "WE");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "10",
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
<summary>getCreditMemoRequestOfA_CreditMemoReqItemPartner</summary>

Retrieves the credit memo request header of a specific item partner through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqItemPartner(
    "60000002",
    "10",
    "WE",
    queries = {
        \$select: ["CreditMemoRequest", "SoldToParty", "TotalNetAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "SoldToParty": "10100001",
    "TotalNetAmount": "250.00"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestItemOfA_CreditMemoReqItemPartner</summary>

Retrieves the credit memo request item of a specific item partner through the `to_CreditMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestItemOfA_CreditMemoReqItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->getCreditMemoRequestItemOfA_CreditMemoReqItemPartner(
    "60000002",
    "10",
    "WE",
    queries = {
        \$select: ["CreditMemoRequestItem", "Material", "RequestedQuantity", "RequestedQuantityUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequestItem": "10",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoReqItemPartner</summary>

Updates the item partner of a credit memo request item with a specific partner function using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `payload` | `UpdateA_CreditMemoReqItemPartnerWrapper` | Yes | Wraps an `UpdateA_CreditMemoReqItemPartner` record (`Customer`, `Supplier`, `Personnel` or `ContactPerson`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoReqItemPartner(
    "60000002",
    "10",
    "WE",
    {d: {Customer: "10100003"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoReqItemPartner</summary>

Deletes the item partner of a credit memo request item with a specific partner function. The item then uses the header partner with the same partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoReqItemPartner(
    "60000002",
    "10",
    "WE",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Header pricing elements

<details>
<summary>listA_CreditMemoReqPrcgElmnts</summary>

Retrieves a collection of header pricing elements (pricing conditions) across all credit memo requests, with the condition type, rate, amount and calculation type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqPrcgElmntWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqPrcgElmntWrapper conditions = check creditMemoClient->listA_CreditMemoReqPrcgElmnts(
    queries = {
        \$filter: "CreditMemoRequest eq '60000002'",
        \$select: ["CreditMemoRequest", "PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "PricingProcedureStep": "100",
        "PricingProcedureCounter": "1",
        "ConditionType": "HA00",
        "ConditionRateValue": "-5.00",
        "ConditionAmount": "-12.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPricingElementsOfA_CreditMemoRequest</summary>

Retrieves the header pricing elements of a specific credit memo request through the `to_PricingElement` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_CreditMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqPrcgElmntWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqPrcgElmntWrapper conditions = check creditMemoClient->listPricingElementsOfA_CreditMemoRequest(
    "60000002",
    queries = {
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
        "PricingProcedureCounter": "1",
        "ConditionType": "HA00",
        "ConditionRateValue": "-5.00",
        "ConditionAmount": "-12.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqPrcgElmnt</summary>

Retrieves a single header pricing element of a credit memo request by its pricing procedure step and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqPrcgElmntWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqPrcgElmntWrapper condition = check creditMemoClient->getA_CreditMemoReqPrcgElmnt("60000002", "100", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "PricingProcedureStep": "100",
    "PricingProcedureCounter": "1",
    "ConditionType": "HA00",
    "ConditionCalculationType": "A",
    "ConditionRateValue": "-5.00",
    "ConditionCurrency": "",
    "ConditionAmount": "-12.50",
    "TransactionCurrency": "EUR",
    "ConditionIsManuallyChanged": true
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoReqPrcgElmnt</summary>

Retrieves the credit memo request header of a specific header pricing element through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqPrcgElmnt(
    "60000002",
    "100",
    "1",
    queries = {
        \$select: ["CreditMemoRequest", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoReqPrcgElmnt</summary>

Updates a header pricing element of a credit memo request using a PATCH request, for example the condition rate of a header discount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `payload` | `UpdateA_CreditMemoReqPrcgElmntWrapper` | Yes | Wraps an `UpdateA_CreditMemoReqPrcgElmnt` record (`ConditionType`, `ConditionRateValue`, `ConditionCurrency`, `ConditionQuantity`, `ConditionQuantityUnit`, `TransactionCurrency`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoReqPrcgElmnt(
    "60000002",
    "100",
    "1",
    {d: {ConditionRateValue: "-3.00"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoReqPrcgElmnt</summary>

Deletes a manually entered header pricing element from a credit memo request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoReqPrcgElmnt(
    "60000002",
    "100",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Item pricing elements

<details>
<summary>listA_CreditMemoReqItemPrcgElmnts</summary>

Retrieves a collection of item pricing elements across all credit memo request items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqItemPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqItemPrcgElmntWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqItemPrcgElmntWrapper conditions = check creditMemoClient->listA_CreditMemoReqItemPrcgElmnts(
    queries = {
        \$filter: "CreditMemoRequest eq '60000002' and ConditionType eq 'PPR0'",
        \$select: ["CreditMemoRequest", "CreditMemoRequestItem", "ConditionType", "ConditionRateValue", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "ConditionType": "PPR0",
        "ConditionRateValue": "50.00",
        "ConditionAmount": "250.00"
      }
    ]
  }
}
```

</details>

<details>
<summary>listPricingElementsOfA_CreditMemoRequestItem</summary>

Retrieves the pricing elements of a specific credit memo request item through the `to_PricingElement` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_CreditMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqItemPrcgElmntWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqItemPrcgElmntWrapper conditions = check creditMemoClient->listPricingElementsOfA_CreditMemoRequestItem(
    "60000002",
    "10",
    queries = {
        \$select: ["PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionAmount"],
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
        "PricingProcedureStep": "10",
        "PricingProcedureCounter": "1",
        "ConditionType": "PPR0",
        "ConditionRateValue": "50.00",
        "ConditionAmount": "250.00"
      },
      {
        "PricingProcedureStep": "100",
        "PricingProcedureCounter": "1",
        "ConditionType": "HA00",
        "ConditionRateValue": "-5.00",
        "ConditionAmount": "-12.50"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqItemPrcgElmnt</summary>

Retrieves a single pricing element of a credit memo request item by its pricing procedure step and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqItemPrcgElmntWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqItemPrcgElmntWrapper condition = check creditMemoClient->getA_CreditMemoReqItemPrcgElmnt("60000002", "10", "10", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "10",
    "PricingProcedureStep": "10",
    "PricingProcedureCounter": "1",
    "ConditionType": "PPR0",
    "ConditionCalculationType": "C",
    "ConditionRateValue": "50.00",
    "ConditionCurrency": "EUR",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionAmount": "250.00",
    "TransactionCurrency": "EUR",
    "ConditionIsForStatistics": false
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoReqItemPrcgElmnt</summary>

Retrieves the credit memo request header of a specific item pricing element through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqItemPrcgElmnt(
    "60000002",
    "10",
    "10",
    "1",
    queries = {
        \$select: ["CreditMemoRequest", "TotalNetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestItemOfA_CreditMemoReqItemPrcgElmnt</summary>

Retrieves the credit memo request item of a specific item pricing element through the `to_CreditMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestItemOfA_CreditMemoReqItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->getCreditMemoRequestItemOfA_CreditMemoReqItemPrcgElmnt(
    "60000002",
    "10",
    "10",
    "1",
    queries = {
        \$select: ["CreditMemoRequestItem", "Material", "NetAmount", "TransactionCurrency"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequestItem": "10",
    "Material": "TG11",
    "NetAmount": "250.00",
    "TransactionCurrency": "EUR"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoReqItemPrcgElmnt</summary>

Updates a pricing element of a credit memo request item using a PATCH request, for example to correct the credited price.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `payload` | `UpdateA_CreditMemoReqItemPrcgElmntWrapper` | Yes | Wraps an `UpdateA_CreditMemoReqItemPrcgElmnt` record (`ConditionType`, `ConditionRateValue`, `ConditionCurrency`, `ConditionQuantity` and its units, `TransactionCurrency`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoReqItemPrcgElmnt(
    "60000002",
    "10",
    "10",
    "1",
    {d: {ConditionRateValue: "48.00", ConditionCurrency: "EUR"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoReqItemPrcgElmnt</summary>

Deletes a manually entered pricing element from a credit memo request item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoReqItemPrcgElmnt(
    "60000002",
    "10",
    "100",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Header texts

<details>
<summary>listA_CreditMemoReqTexts</summary>

Retrieves a collection of header texts across all credit memo requests, with the language, text ID and long text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqTextWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqTextWrapper texts = check creditMemoClient->listA_CreditMemoReqTexts(
    queries = {
        \$filter: "Language eq 'EN' and LongTextID eq '0001'",
        \$top: 1
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Credit for 5 units damaged in transit, see claim CLAIM-2026-0418."
      }
    ]
  }
}
```

</details>

<details>
<summary>listTextsOfA_CreditMemoRequest</summary>

Retrieves the header texts of a specific credit memo request through the `to_Text` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_CreditMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqTextWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqTextWrapper texts = check creditMemoClient->listTextsOfA_CreditMemoRequest("60000002");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Credit for 5 units damaged in transit, see claim CLAIM-2026-0418."
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqText</summary>

Retrieves a single header text of a credit memo request by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqTextWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqTextWrapper text = check creditMemoClient->getA_CreditMemoReqText("60000002", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Credit for 5 units damaged in transit, see claim CLAIM-2026-0418."
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoReqText</summary>

Retrieves the credit memo request header of a specific header text through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqText(
    "60000002",
    "EN",
    "0001",
    queries = {
        \$select: ["CreditMemoRequest", "SoldToParty", "PurchaseOrderByCustomer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "SoldToParty": "10100001",
    "PurchaseOrderByCustomer": "CLAIM-2026-0418"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoReqText</summary>

Updates a header text of a credit memo request using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `payload` | `UpdateA_CreditMemoReqTextWrapper` | Yes | Wraps an `UpdateA_CreditMemoReqText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoReqText(
    "60000002",
    "EN",
    "0001",
    {d: {LongText: "Credit for 4 units damaged in transit, see claim CLAIM-2026-0418-A."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoReqText</summary>

Deletes a header text from a credit memo request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoReqText(
    "60000002",
    "EN",
    "0001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Item texts

<details>
<summary>listA_CreditMemoReqItemTexts</summary>

Retrieves a collection of item texts across all credit memo request items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqItemTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqItemTextWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqItemTextWrapper itemTexts = check creditMemoClient->listA_CreditMemoReqItemTexts(
    queries = {
        \$filter: "CreditMemoRequest eq '60000002' and Language eq 'EN'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Packaging damaged, units scrapped by the customer."
      }
    ]
  }
}
```

</details>

<details>
<summary>listTextsOfA_CreditMemoRequestItem</summary>

Retrieves the texts of a specific credit memo request item through the `to_Text` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_CreditMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqItemTextWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqItemTextWrapper itemTexts = check creditMemoClient->listTextsOfA_CreditMemoRequestItem("60000002", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Packaging damaged, units scrapped by the customer."
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqItemText</summary>

Retrieves a single text of a credit memo request item by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqItemTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqItemTextWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqItemTextWrapper itemText = check creditMemoClient->getA_CreditMemoReqItemText("60000002", "10", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "10",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Packaging damaged, units scrapped by the customer."
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoReqItemText</summary>

Retrieves the credit memo request header of a specific item text through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqItemTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqItemText(
    "60000002",
    "10",
    "EN",
    "0001",
    queries = {
        \$select: ["CreditMemoRequest", "CreditMemoRequestType", "SoldToParty"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestType": "CR",
    "SoldToParty": "10100001"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestItemOfA_CreditMemoReqItemText</summary>

Retrieves the credit memo request item of a specific item text through the `to_CreditMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestItemOfA_CreditMemoReqItemTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->getCreditMemoRequestItemOfA_CreditMemoReqItemText(
    "60000002",
    "10",
    "EN",
    "0001",
    queries = {
        \$select: ["CreditMemoRequestItem", "Material", "CreditMemoRequestItemText"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequestItem": "10",
    "Material": "TG11",
    "CreditMemoRequestItemText": "Trading Good 11"
  }
}
```

</details>

<details>
<summary>patchA_CreditMemoReqItemText</summary>

Updates a text of a credit memo request item using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `payload` | `UpdateA_CreditMemoReqItemTextWrapper` | Yes | Wraps an `UpdateA_CreditMemoReqItemText` record (`LongText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->patchA_CreditMemoReqItemText(
    "60000002",
    "10",
    "EN",
    "0001",
    {d: {LongText: "Packaging damaged, 4 units scrapped by the customer."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_CreditMemoReqItemText</summary>

Deletes a text from a credit memo request item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check creditMemoClient->deleteA_CreditMemoReqItemText(
    "60000002",
    "10",
    "EN",
    "0001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Subsequent documents

<details>
<summary>listA_CreditMemoReqSubsqntProcFlows</summary>

Retrieves the subsequent documents of all credit memo requests, for example the credit memos created in billing, with the document category, process flow level and statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditMemoReqSubsqntProcFlowsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqSubsqntProcFlowWrapper flows = check creditMemoClient->listA_CreditMemoReqSubsqntProcFlows(
    queries = {
        \$filter: "SubsequentDocumentCategory eq 'O'",
        \$select: ["CreditMemoRequest", "SubsequentDocument", "SubsequentDocumentCategory", "CreationDate"],
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
        "CreditMemoRequest": "60000002",
        "SubsequentDocument": "90000045",
        "SubsequentDocumentCategory": "O",
        "CreationDate": "/Date(1793923200000)/"
      },
      {
        "CreditMemoRequest": "60000001",
        "SubsequentDocument": "90000041",
        "SubsequentDocumentCategory": "O",
        "CreationDate": "/Date(1793577600000)/"
      }
    ]
  }
}
```

</details>

<details>
<summary>listSubsequentProcFlowDocsOfA_CreditMemoRequest</summary>

Retrieves the subsequent documents of a specific credit memo request through the `to_SubsequentProcFlowDoc` navigation. Use it to find the credit memo that billing created from the request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSubsequentProcFlowDocsOfA_CreditMemoRequestQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditMemoReqSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CreditMemoReqSubsqntProcFlowWrapper flows = check creditMemoClient->listSubsequentProcFlowDocsOfA_CreditMemoRequest("60000002");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "SubsequentDocument": "90000045",
        "SubsequentDocumentCategory": "O",
        "ProcessFlowLevel": "00",
        "OverallBillingStatus": "",
        "OverallSDProcessStatus": "C",
        "CreationDate": "/Date(1793923200000)/",
        "CreationTime": "PT10H02M15S"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CreditMemoReqSubsqntProcFlow</summary>

Retrieves a single subsequent document of a credit memo request by the subsequent document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `SubsequentDocument` | `string` | Yes | Subsequent document number (e.g., `"90000045"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditMemoReqSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoReqSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoReqSubsqntProcFlowWrapper flow = check creditMemoClient->getA_CreditMemoReqSubsqntProcFlow("60000002", "90000045");
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "SubsequentDocument": "90000045",
    "SubsequentDocumentCategory": "O",
    "ProcessFlowLevel": "00",
    "OverallBillingStatus": "",
    "OverallSDProcessStatus": "C",
    "CreationDate": "/Date(1793923200000)/",
    "CreationTime": "PT10H02M15S"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CreditMemoReqSubsqntProcFlow</summary>

Retrieves the credit memo request header of a specific subsequent document through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `SubsequentDocument` | `string` | Yes | Subsequent document number (e.g., `"90000045"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CreditMemoReqSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CreditMemoReqSubsqntProcFlow(
    "60000002",
    "90000045",
    queries = {
        \$select: ["CreditMemoRequest", "SoldToParty", "OverallOrdReltdBillgStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "SoldToParty": "10100001",
    "OverallOrdReltdBillgStatus": "C"
  }
}
```

</details>

#### Item subsequent documents

<details>
<summary>listA_CrdMmReqItemSubsqntProcFlows</summary>

Retrieves the subsequent document items of all credit memo request items, with the subsequent document and item, the preceding document and the processing statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CrdMmReqItemSubsqntProcFlowsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CrdMmReqItemSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CrdMmReqItemSubsqntProcFlowWrapper itemFlows = check creditMemoClient->listA_CrdMmReqItemSubsqntProcFlows(
    queries = {
        \$filter: "CreditMemoRequest eq '60000002'",
        \$select: ["CreditMemoRequest", "CreditMemoRequestItem", "DocRelationshipUUID", "SubsequentDocument", "SubsequentDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "DocRelationshipUUID": "fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41",
        "SubsequentDocument": "90000045",
        "SubsequentDocumentItem": "10"
      }
    ]
  }
}
```

</details>

<details>
<summary>listItemSubsqntProcFlowsOfA_CreditMemoRequestItem</summary>

Retrieves the subsequent document items of a specific credit memo request item through the `to_ItemSubsqntProcFlow` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemSubsqntProcFlowsOfA_CreditMemoRequestItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CrdMmReqItemSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
creditmemo:CollectionOfA_CrdMmReqItemSubsqntProcFlowWrapper itemFlows = check creditMemoClient->listItemSubsqntProcFlowsOfA_CreditMemoRequestItem("60000002", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CreditMemoRequest": "60000002",
        "CreditMemoRequestItem": "10",
        "DocRelationshipUUID": "fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41",
        "SubsequentDocument": "90000045",
        "SubsequentDocumentItem": "10",
        "SubsequentDocumentCategory": "O",
        "AccountingTransferStatus": "C",
        "SDProcessStatus": "C"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CrdMmReqItemSubsqntProcFlow</summary>

Retrieves a single subsequent document item of a credit memo request item by its document relationship UUID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `DocRelationshipUUID` | `string` | Yes | Document relationship UUID of the item process flow entry (e.g., `"fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CrdMmReqItemSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CrdMmReqItemSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
creditmemo:A_CrdMmReqItemSubsqntProcFlowWrapper itemFlow = check creditMemoClient->getA_CrdMmReqItemSubsqntProcFlow(
    "60000002",
    "10",
    "fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41"
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "CreditMemoRequestItem": "10",
    "DocRelationshipUUID": "fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41",
    "SubsequentDocument": "90000045",
    "SubsequentDocumentItem": "10",
    "SubsequentDocumentCategory": "O",
    "ProcessFlowLevel": "00",
    "AccountingTransferStatus": "C",
    "SDProcessStatus": "C",
    "SubsqntDocItmPrecdgDocument": "60000002",
    "SubsqntDocItmPrecdgDocItem": "10",
    "SubsqntDocItmPrecdgDocCategory": "K",
    "CreationDate": "/Date(1793923200000)/",
    "CreationTime": "PT10H02M15S"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestOfA_CrdMmReqItemSubsqntProcFlow</summary>

Retrieves the credit memo request header of a specific subsequent document item through the `to_CreditMemoRequest` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `DocRelationshipUUID` | `string` | Yes | Document relationship UUID of the item process flow entry (e.g., `"fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestOfA_CrdMmReqItemSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestWrapper header = check creditMemoClient->getCreditMemoRequestOfA_CrdMmReqItemSubsqntProcFlow(
    "60000002",
    "10",
    "fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41",
    queries = {
        \$select: ["CreditMemoRequest", "SoldToParty", "TotalNetAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequest": "60000002",
    "SoldToParty": "10100001",
    "TotalNetAmount": "250.00"
  }
}
```

</details>

<details>
<summary>getCreditMemoRequestItemOfA_CrdMmReqItemSubsqntProcFlow</summary>

Retrieves the credit memo request item of a specific subsequent document item through the `to_CreditMemoRequestItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CreditMemoRequest` | `string` | Yes | Credit memo request number (e.g., `"60000002"`). |
| `CreditMemoRequestItem` | `string` | Yes | Item number (e.g., `"10"`). |
| `DocRelationshipUUID` | `string` | Yes | Document relationship UUID of the item process flow entry (e.g., `"fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCreditMemoRequestItemOfA_CrdMmReqItemSubsqntProcFlowQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CreditMemoRequestItemWrapper|error`

Sample code:

```ballerina
creditmemo:A_CreditMemoRequestItemWrapper item = check creditMemoClient->getCreditMemoRequestItemOfA_CrdMmReqItemSubsqntProcFlow(
    "60000002",
    "10",
    "fa163e8b-3c5d-1fd1-a7d2-1f6a0e3b2c41",
    queries = {
        \$select: ["CreditMemoRequestItem", "Material", "NetAmount", "OrderRelatedBillingStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreditMemoRequestItem": "10",
    "Material": "TG11",
    "NetAmount": "250.00",
    "OrderRelatedBillingStatus": "C"
  }
}
```

</details>

#### Approval requests

<details>
<summary>releaseApprovalRequest</summary>

Releases (approves) the pending approval request of a credit memo request, so that the request can be processed further. Use it when a credit memo request needs an approver's consent, for example because its value exceeds an approval threshold, and the decision is made in an external system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ReleaseApprovalRequestQueries` | Yes | Function import parameter: `CreditMemoRequest`, enclosed in single quotes. |

Returns: `FunctionResult_1|error`

Sample code:

```ballerina
creditmemo:FunctionResult_1 releaseResult = check creditMemoClient->releaseApprovalRequest(
    queries = {
        CreditMemoRequest: "'60000002'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "releaseApprovalRequest": {
      "Boolean": true
    }
  }
}
```

</details>

<details>
<summary>rejectApprovalRequest</summary>

Rejects the pending approval request of a credit memo request, so that the credit is not granted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `RejectApprovalRequestQueries` | Yes | Function import parameter: `CreditMemoRequest`, enclosed in single quotes. |

Returns: `FunctionResult_2|error`

Sample code:

```ballerina
creditmemo:FunctionResult_2 rejectResult = check creditMemoClient->rejectApprovalRequest(
    queries = {
        CreditMemoRequest: "'60000005'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "rejectApprovalRequest": {
      "Boolean": true
    }
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
string boundary = "batch_cmr001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CreditMemoRequest('60000002') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CreditMemoRequest('60000002')/to_Item HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check creditMemoClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
