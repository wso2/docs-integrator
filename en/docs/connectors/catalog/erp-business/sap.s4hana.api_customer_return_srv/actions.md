---
connector: true
connector_name: "sap.s4hana.api_customer_return_srv"
title: "Actions"
description: "Reference for the SAP Customer Return connector client: configuration, initialization, and every returns order, item, partner, pricing element, text, related object, returns process and approval operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_customer_return_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Creates, reads, updates and deletes SAP S/4HANA customer returns orders with their items, partners, pricing elements, texts and related objects, reads the advanced returns process, and approves or rejects returns orders via the `API_CUSTOMER_RETURN_SRV` OData API. |

---

## Client

Creates, reads, updates and deletes SAP S/4HANA customer returns orders with their items, partners, pricing elements, texts and related objects, reads the advanced returns process, and approves or rejects returns orders via the `API_CUSTOMER_RETURN_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_CUSTOMER_RETURN_SRV` from these values.

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
import ballerinax/sap.s4hana.api_customer_return_srv as customerreturn;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

customerreturn:Client customerreturnClient = check new (
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

A returns order is identified by its document number (`CustomerReturn`, up to 10 characters) and a returns order item by the returns order number and the item number (`CustomerReturnItem`, up to 6 characters, for example `10`). Advanced returns management tracks each returns order in a returns process (`RetsMgmtProcess`); the process ID is on the returns order header and items, and it is the key of the process steps and overview statuses.

SAP creates returns orders and their items with deep insert requests: send the header together with its items (and, where needed, the header and item partners and pricing elements) in one request, and send a new item together with its item partners and pricing elements. SAP assigns the returns order number.

The `patch` operations take an `Update...Wrapper` record that wraps the matching `Update...` record in a `d` field, for example `{d: {PurchaseOrderByCustomer: "RET-2026-0457"}}`. Update and delete operations return an `http:Response`; include an `If-Match` header with the entity ETag (or `*`) for optimistic locking.

The operations named `getCustomerReturnOf...` and `getCustomerReturnItemOf...` follow the navigation property of a child entity, such as a partner or a text, to the returns order header or item it belongs to.

The approval actions (`releaseApprovalRequest` and `rejectApprovalRequest`) are OData function imports. Their `CustomerReturn` query parameter must be enclosed in single quotes, for example `"'60000012'"`.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property and navigation names, and `$top` and `$skip` take integers.

#### Returns orders

<details>
<summary>listA_CustomerReturns</summary>

<div>

Retrieves a collection of returns order headers, with the returns order type, sales area, sold-to party, customer reference, net value, advanced returns process ID and the processing statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnWrapper result = check customerreturnClient->listA_CustomerReturns(
    queries = {
        \$filter: "SalesOrganization eq '1710' and SoldToParty eq '17100001'",
        \$select: ["CustomerReturn", "CustomerReturnType", "PurchaseOrderByCustomer", "TotalNetAmount", "TransactionCurrency", "OverallSDProcessStatus"],
        \$orderby: ["CustomerReturn desc"],
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
        "CustomerReturn": "60000012",
        "CustomerReturnType": "CBAR",
        "PurchaseOrderByCustomer": "RET-2026-0457",
        "TotalNetAmount": "250.00",
        "TransactionCurrency": "USD",
        "OverallSDProcessStatus": "A"
      },
      {
        "CustomerReturn": "60000009",
        "CustomerReturnType": "CBAR",
        "PurchaseOrderByCustomer": "RET-2026-0431",
        "TotalNetAmount": "120.00",
        "TransactionCurrency": "USD",
        "OverallSDProcessStatus": "C"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturn</summary>

<div>

Retrieves the header of a single returns order by its number. Expand `to_Item`, `to_Partner`, `to_PricingElement`, `to_Text`, `to_RelatedObject` or `to_CustomerReturnOverviewStatus` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getA_CustomerReturn(
    "60000012",
    queries = {
        \$expand: ["to_Item"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "17100001",
    "CreationDate": "/Date(1794268800000)/",
    "CreatedByUser": "CB9980000010",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "CustomerReturnDate": "/Date(1794268800000)/",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "SDDocumentReason": "101",
    "RetsMgmtProcess": "1000000027",
    "ReferenceSDDocument": "90000034",
    "ReferenceSDDocumentCategory": "M",
    "SalesDocApprovalStatus": "",
    "RetsMgmtLogProcgStatus": "A",
    "RetsMgmtCompnProcgStatus": "A",
    "RetsMgmtProcessingStatus": "A",
    "OverallSDProcessStatus": "A",
    "to_Item": {
      "results": [
        {
          "CustomerReturn": "60000012",
          "CustomerReturnItem": "10",
          "CustomerReturnItemCategory": "CBAR",
          "Material": "TG11",
          "RequestedQuantity": "5",
          "RequestedQuantityUnit": "PC",
          "NetAmount": "250.00",
          "ReturnReason": "101",
          "RetsMgmtProcess": "1000000027",
          "SDProcessStatus": "A"
        }
      ]
    }
  }
}
```

</div>

</details>

<details>
<summary>createA_CustomerReturn</summary>

<div>

Creates a returns order with a deep insert request: the header with its items and, where needed, header and item partners and pricing elements. Reference the original billing document or sales order in the items through `ReferenceSDDocument` and `ReferenceSDDocumentItem`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CustomerReturn` | Yes | Returns order header data with nested items in `to_Item`. `CustomerReturn` is a required field; the sample passes an empty string and reads the number SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper created = check customerreturnClient->createA_CustomerReturn({
    CustomerReturn: "",
    CustomerReturnType: "CBAR",
    SalesOrganization: "1710",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "17100001",
    PurchaseOrderByCustomer: "RET-2026-0457",
    SDDocumentReason: "101",
    to_Item: {
        results: [{
            CustomerReturnItem: "10",
            Material: "TG11",
            RequestedQuantity: "5",
            RequestedQuantityUnit: "PC",
            ReturnReason: "101",
            ReferenceSDDocument: "90000034",
            ReferenceSDDocumentItem: "10"
        }]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "17100001",
    "CreationDate": "/Date(1794268800000)/",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "SDDocumentReason": "101",
    "RetsMgmtProcess": "1000000027",
    "ReferenceSDDocument": "90000034",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturn</summary>

<div>

Updates the header of a returns order using a PATCH request, for example the customer reference, order reason, requested delivery date or billing block.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `payload` | `UpdateA_CustomerReturnWrapper` | Yes | Wraps an `UpdateA_CustomerReturn` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturn(
    "60000012",
    {d: {PurchaseOrderByCustomer: "RET-2026-0457-A", HeaderBillingBlockReason: "08"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturn</summary>

<div>

Deletes a returns order that has no subsequent documents, such as a returns delivery or a credit memo request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturn(
    "60000009",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Returns order items

<details>
<summary>listA_CustomerReturnItems</summary>

<div>

Retrieves a collection of returns order items across all returns orders, with the material, requested quantity, net value, return reason, refund and follow-up activity data, and the reference to the original document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemWrapper result = check customerreturnClient->listA_CustomerReturnItems(
    queries = {
        \$filter: "Material eq 'TG11'",
        \$select: ["CustomerReturn", "CustomerReturnItem", "Material", "RequestedQuantity", "RequestedQuantityUnit", "ReturnReason"],
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
        "CustomerReturn": "60000009",
        "CustomerReturnItem": "10",
        "Material": "TG11",
        "RequestedQuantity": "2",
        "RequestedQuantityUnit": "PC",
        "ReturnReason": "103"
      },
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "Material": "TG11",
        "RequestedQuantity": "5",
        "RequestedQuantityUnit": "PC",
        "ReturnReason": "101"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listItemsOfA_CustomerReturn</summary>

<div>

Retrieves the items of a specific returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemsOfA_CustomerReturnQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemWrapper items = check customerreturnClient->listItemsOfA_CustomerReturn(
    "60000012",
    queries = {
        \$select: ["CustomerReturnItem", "Material", "RequestedQuantity", "RequestedQuantityUnit", "NetAmount", "ReturnReason"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturnItem": "10",
        "Material": "TG11",
        "RequestedQuantity": "5",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "250.00",
        "ReturnReason": "101"
      },
      {
        "CustomerReturnItem": "20",
        "Material": "TG12",
        "RequestedQuantity": "1",
        "RequestedQuantityUnit": "PC",
        "NetAmount": "0.00",
        "ReturnReason": "101"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnItem</summary>

<div>

Retrieves a single returns order item. Expand `to_Partner`, `to_PricingElement`, `to_ProcessStep`, `to_RelatedObject`, `to_ScheduleLine`, `to_SerialNumber` or `to_Text` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "CustomerReturnItemText": "Trading Good 11",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "TransactionCurrency": "USD",
    "ProductionPlant": "1710",
    "ReturnReason": "101",
    "CustRetItmFollowUpActivity": "0001",
    "ReturnsRefundType": "",
    "RetsMgmtProcess": "1000000027",
    "RetsMgmtProcessItem": "10",
    "ReferenceSDDocument": "90000034",
    "ReferenceSDDocumentItem": "10",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>createA_CustomerReturnItem</summary>

<div>

Adds an item to an existing returns order. SAP expects a deep insert with the item partners and item pricing elements of the new item. The `CreateA_CustomerReturnItem` record does not declare the `CustomerReturn` key; because the record is open, pass it as an additional field with a quoted key (for example, `"CustomerReturn": "60000012"`), or use `createItemOfA_CustomerReturn` instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CustomerReturnItem` | Yes | Item data, including the `CustomerReturn` number of the returns order to add the item to. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->createA_CustomerReturnItem({
    "CustomerReturn": "60000012",
    CustomerReturnItem: "20",
    Material: "TG12",
    RequestedQuantity: "1",
    RequestedQuantityUnit: "PC",
    ReturnReason: "101"
});
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "20",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG12",
    "RequestedQuantity": "1",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "0.00",
    "TransactionCurrency": "USD",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "RetsMgmtProcessItem": "20"
  }
}
```

</div>

</details>

<details>
<summary>createItemOfA_CustomerReturn</summary>

<div>

Adds an item to a specific returns order through its `to_Item` navigation property. SAP expects a deep insert with the item partners and item pricing elements of the new item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `payload` | `CreateA_CustomerReturnItem` | Yes | Item data. `CustomerReturnItem` is a required field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->createItemOfA_CustomerReturn(
    "60000012",
    {
        CustomerReturnItem: "20",
        Material: "TG12",
        RequestedQuantity: "1",
        RequestedQuantityUnit: "PC",
        ReturnReason: "101"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "20",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG12",
    "RequestedQuantity": "1",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "0.00",
    "TransactionCurrency": "USD",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "RetsMgmtProcessItem": "20"
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnItem</summary>

<div>

Updates a returns order item using a PATCH request, for example the requested quantity, return reason, refund type, follow-up activity or replacement material.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `payload` | `UpdateA_CustomerReturnItemWrapper` | Yes | Wraps an `UpdateA_CustomerReturnItem` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnItem(
    "60000012",
    "10",
    {d: {RequestedQuantity: "4", ReturnReason: "103"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnItem</summary>

<div>

Deletes an item from a returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnItem(
    "60000012",
    "20",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnItem</summary>

<div>

Reads the returns order header that a specific item belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnItem(
    "60000012",
    "10"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Header partners

<details>
<summary>listA_CustomerReturnPartners</summary>

<div>

Retrieves a collection of header-level business partners across all returns orders, such as the sold-to, ship-to, bill-to and payer parties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnPartnerWrapper result = check customerreturnClient->listA_CustomerReturnPartners(
    queries = {
        \$filter: "PartnerFunction eq 'SH' and Customer eq '17100002'",
        \$select: ["CustomerReturn", "PartnerFunction", "Customer"],
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
        "CustomerReturn": "60000012",
        "PartnerFunction": "SH",
        "Customer": "17100002"
      },
      {
        "CustomerReturn": "60000015",
        "PartnerFunction": "SH",
        "Customer": "17100002"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listPartnersOfA_CustomerReturn</summary>

<div>

Retrieves the header-level business partners of a specific returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_CustomerReturnQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnPartnerWrapper partners = check customerreturnClient->listPartnersOfA_CustomerReturn("60000012");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "PartnerFunction": "SP",
        "PartnerFunctionInternalCode": "AG",
        "Customer": "17100001"
      },
      {
        "CustomerReturn": "60000012",
        "PartnerFunction": "SH",
        "PartnerFunctionInternalCode": "WE",
        "Customer": "17100002"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnPartner</summary>

<div>

Retrieves a single header-level business partner of a returns order by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnPartnerWrapper partner = check customerreturnClient->getA_CustomerReturnPartner("60000012", "SH");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "PartnerFunction": "SH",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "17100002"
  }
}
```

</div>

</details>

<details>
<summary>createA_CustomerReturnPartner</summary>

<div>

Adds a header-level business partner to an existing returns order. The `CreateA_CustomerReturnPartner` record does not declare the `CustomerReturn` key; because the record is open, pass it as an additional field with a quoted key (for example, `"CustomerReturn": "60000012"`), or use `createPartnerOfA_CustomerReturn` instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CustomerReturnPartner` | Yes | Partner data, including the `CustomerReturn` number. `PartnerFunction` is a required field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnPartnerWrapper partner = check customerreturnClient->createA_CustomerReturnPartner({
    "CustomerReturn": "60000012",
    PartnerFunction: "SH",
    Customer: "17100002"
});
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "PartnerFunction": "SH",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "17100002"
  }
}
```

</div>

</details>

<details>
<summary>createPartnerOfA_CustomerReturn</summary>

<div>

Adds a header-level business partner to a specific returns order through its `to_Partner` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `payload` | `CreateA_CustomerReturnPartner` | Yes | Partner data. `PartnerFunction` is a required field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnPartnerWrapper partner = check customerreturnClient->createPartnerOfA_CustomerReturn(
    "60000012",
    {
        PartnerFunction: "SH",
        Customer: "17100002"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "PartnerFunction": "SH",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "17100002"
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnPartner</summary>

<div>

Updates a header-level business partner using a PATCH request, for example to replace the customer, supplier, personnel number or contact person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `payload` | `UpdateA_CustomerReturnPartnerWrapper` | Yes | Wraps an `UpdateA_CustomerReturnPartner` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnPartner(
    "60000012",
    "SH",
    {d: {Customer: "17100003"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnPartner</summary>

<div>

Deletes a header-level business partner from a returns order. Mandatory partner functions, such as the sold-to party, cannot be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnPartner(
    "60000012",
    "SH",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnPartner</summary>

<div>

Reads the returns order header that a specific header-level business partner belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnPartner(
    "60000012",
    "SH"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Item partners

<details>
<summary>listA_CustomerReturnItemPartners</summary>

<div>

Retrieves a collection of item-level business partners across all returns order items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnItemPartnersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemPartnerWrapper result = check customerreturnClient->listA_CustomerReturnItemPartners(
    queries = {
        \$filter: "CustomerReturn eq '60000012'",
        \$select: ["CustomerReturn", "CustomerReturnItem", "PartnerFunction", "Customer"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "PartnerFunction": "SH",
        "Customer": "17100002"
      },
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "20",
        "PartnerFunction": "SH",
        "Customer": "17100002"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listPartnersOfA_CustomerReturnItem</summary>

<div>

Retrieves the item-level business partners of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemPartnerWrapper partners = check customerreturnClient->listPartnersOfA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "PartnerFunction": "SH",
        "PartnerFunctionInternalCode": "WE",
        "Customer": "17100002"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnItemPartner</summary>

<div>

Retrieves a single item-level business partner by its partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemPartnerWrapper partner = check customerreturnClient->getA_CustomerReturnItemPartner("60000012", "10", "SH");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "PartnerFunction": "SH",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "17100002"
  }
}
```

</div>

</details>

<details>
<summary>createA_CustomerReturnItemPartner</summary>

<div>

Adds an item-level business partner to an existing returns order item. The `CreateA_CustomerReturnItemPartner` record does not declare the `CustomerReturn` and `CustomerReturnItem` keys; because the record is open, pass them as additional fields with quoted keys, or use `createPartnerOfA_CustomerReturnItem` instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CustomerReturnItemPartner` | Yes | Partner data, including the `CustomerReturn` and `CustomerReturnItem` keys. `PartnerFunction` is a required field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnItemPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemPartnerWrapper partner = check customerreturnClient->createA_CustomerReturnItemPartner({
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    PartnerFunction: "SH",
    Customer: "17100002"
});
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "PartnerFunction": "SH",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "17100002"
  }
}
```

</div>

</details>

<details>
<summary>createPartnerOfA_CustomerReturnItem</summary>

<div>

Adds an item-level business partner to a specific returns order item through its `to_Partner` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `payload` | `CreateA_CustomerReturnItemPartner` | Yes | Partner data. `PartnerFunction` is a required field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnItemPartnerWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemPartnerWrapper partner = check customerreturnClient->createPartnerOfA_CustomerReturnItem(
    "60000012",
    "10",
    {
        PartnerFunction: "SH",
        Customer: "17100002"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "PartnerFunction": "SH",
    "PartnerFunctionInternalCode": "WE",
    "Customer": "17100002",
    "Supplier": "",
    "Personnel": "",
    "ContactPerson": "",
    "ReferenceBusinessPartner": "17100002"
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnItemPartner</summary>

<div>

Updates an item-level business partner using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `payload` | `UpdateA_CustomerReturnItemPartnerWrapper` | Yes | Wraps an `UpdateA_CustomerReturnItemPartner` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnItemPartner(
    "60000012",
    "10",
    "SH",
    {d: {Customer: "17100003"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnItemPartner</summary>

<div>

Deletes an item-level business partner from a returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnItemPartner(
    "60000012",
    "10",
    "SH",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnItemPartner</summary>

<div>

Reads the returns order header that a specific item-level business partner belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnItemPartner(
    "60000012",
    "10",
    "SH"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnItemOfA_CustomerReturnItemPartner</summary>

<div>

Reads the returns order item that a specific item-level business partner belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PartnerFunction` | `string` | Yes | Partner function code, up to 2 characters (e.g., `"SH"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnItemOfA_CustomerReturnItemPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getCustomerReturnItemOfA_CustomerReturnItemPartner(
    "60000012",
    "10",
    "SH"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Header pricing elements

<details>
<summary>listA_CustomerReturnPrcgElmnts</summary>

<div>

Retrieves a collection of header-level pricing elements (conditions) across all returns orders, with the condition type, rate, amount and calculation data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnPrcgElmntWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnPrcgElmntWrapper result = check customerreturnClient->listA_CustomerReturnPrcgElmnts(
    queries = {
        \$filter: "ConditionType eq 'HA00'",
        \$select: ["CustomerReturn", "PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionAmount"],
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
        "CustomerReturn": "60000012",
        "PricingProcedureStep": "100",
        "PricingProcedureCounter": "1",
        "ConditionType": "HA00",
        "ConditionRateValue": "-2.000",
        "ConditionAmount": "-5.00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listPricingElementsOfA_CustomerReturn</summary>

<div>

Retrieves the header-level pricing elements of a specific returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_CustomerReturnQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnPrcgElmntWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnPrcgElmntWrapper conditions = check customerreturnClient->listPricingElementsOfA_CustomerReturn(
    "60000012",
    queries = {
        \$select: ["PricingProcedureStep", "PricingProcedureCounter", "ConditionType", "ConditionRateValue", "ConditionAmount", "TransactionCurrency"]
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
        "ConditionRateValue": "-2.000",
        "ConditionAmount": "-5.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnPrcgElmnt</summary>

<div>

Retrieves a single header-level pricing element by its step number and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnPrcgElmntWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnPrcgElmntWrapper condition = check customerreturnClient->getA_CustomerReturnPrcgElmnt("60000012", "100", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "PricingProcedureStep": "100",
    "PricingProcedureCounter": "1",
    "ConditionType": "HA00",
    "ConditionCalculationType": "A",
    "ConditionRateValue": "-2.000",
    "ConditionCurrency": "",
    "ConditionAmount": "-5.00",
    "TransactionCurrency": "USD",
    "ConditionIsManuallyChanged": true
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnPrcgElmnt</summary>

<div>

Updates a header-level pricing element using a PATCH request, for example the condition rate of a manual header discount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `payload` | `UpdateA_CustomerReturnPrcgElmntWrapper` | Yes | Wraps an `UpdateA_CustomerReturnPrcgElmnt` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnPrcgElmnt(
    "60000012",
    "100",
    "1",
    {d: {ConditionRateValue: "-5.000"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnPrcgElmnt</summary>

<div>

Deletes a header-level pricing element, typically a manually entered condition, from a returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnPrcgElmnt(
    "60000012",
    "100",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnPrcgElmnt</summary>

<div>

Reads the returns order header that a specific header-level pricing element belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnPrcgElmnt(
    "60000012",
    "100",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Item pricing elements

<details>
<summary>listA_CustomerReturnItemPrcgElmnts</summary>

<div>

Retrieves a collection of item-level pricing elements (conditions) across all returns order items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnItemPrcgElmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemPrcgElmntWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemPrcgElmntWrapper result = check customerreturnClient->listA_CustomerReturnItemPrcgElmnts(
    queries = {
        \$filter: "CustomerReturn eq '60000012' and ConditionType eq 'PPR0'",
        \$select: ["CustomerReturn", "CustomerReturnItem", "ConditionType", "ConditionRateValue", "ConditionCurrency", "ConditionAmount"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "ConditionType": "PPR0",
        "ConditionRateValue": "50.00",
        "ConditionCurrency": "USD",
        "ConditionAmount": "250.00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listPricingElementsOfA_CustomerReturnItem</summary>

<div>

Retrieves the item-level pricing elements of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemPrcgElmntWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemPrcgElmntWrapper conditions = check customerreturnClient->listPricingElementsOfA_CustomerReturnItem(
    "60000012",
    "10",
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
        "PricingProcedureStep": "10",
        "PricingProcedureCounter": "1",
        "ConditionType": "PPR0",
        "ConditionRateValue": "50.00",
        "ConditionAmount": "250.00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnItemPrcgElmnt</summary>

<div>

Retrieves a single item-level pricing element by its step number and condition counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemPrcgElmntWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemPrcgElmntWrapper condition = check customerreturnClient->getA_CustomerReturnItemPrcgElmnt("60000012", "10", "10", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "PricingProcedureStep": "10",
    "PricingProcedureCounter": "1",
    "ConditionType": "PPR0",
    "ConditionCalculationType": "C",
    "ConditionBaseValue": "5.000",
    "ConditionRateValue": "50.00",
    "ConditionCurrency": "USD",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "PC",
    "ConditionAmount": "250.00",
    "TransactionCurrency": "USD",
    "ConditionIsManuallyChanged": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnItemPrcgElmnt</summary>

<div>

Updates an item-level pricing element using a PATCH request, for example the condition rate of the item price.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `payload` | `UpdateA_CustomerReturnItemPrcgElmntWrapper` | Yes | Wraps an `UpdateA_CustomerReturnItemPrcgElmnt` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnItemPrcgElmnt(
    "60000012",
    "10",
    "10",
    "1",
    {d: {ConditionRateValue: "45.00", ConditionCurrency: "USD"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnItemPrcgElmnt</summary>

<div>

Deletes an item-level pricing element, typically a manually entered condition, from a returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnItemPrcgElmnt(
    "60000012",
    "10",
    "10",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnItemPrcgElmnt</summary>

<div>

Reads the returns order header that a specific item-level pricing element belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnItemPrcgElmnt(
    "60000012",
    "10",
    "10",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnItemOfA_CustomerReturnItemPrcgElmnt</summary>

<div>

Reads the returns order item that a specific item-level pricing element belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `PricingProcedureStep` | `string` | Yes | Step number of the condition in the pricing procedure (e.g., `"10"`). |
| `PricingProcedureCounter` | `string` | Yes | Condition counter within the step (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnItemOfA_CustomerReturnItemPrcgElmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getCustomerReturnItemOfA_CustomerReturnItemPrcgElmnt(
    "60000012",
    "10",
    "10",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Header texts

<details>
<summary>listA_CustomerReturnTexts</summary>

<div>

Retrieves a collection of header-level texts across all returns orders.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnTextWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnTextWrapper result = check customerreturnClient->listA_CustomerReturnTexts(
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
        "CustomerReturn": "60000012",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Customer reports cracked housings on five units. Pickup arranged by carrier."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listTextsOfA_CustomerReturn</summary>

<div>

Retrieves the header-level texts of a specific returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_CustomerReturnQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnTextWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnTextWrapper texts = check customerreturnClient->listTextsOfA_CustomerReturn("60000012");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Customer reports cracked housings on five units. Pickup arranged by carrier."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnText</summary>

<div>

Retrieves a single header-level text by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnTextWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnTextWrapper text = check customerreturnClient->getA_CustomerReturnText("60000012", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Customer reports cracked housings on five units. Pickup arranged by carrier."
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnText</summary>

<div>

Replaces the content of a header-level text using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `payload` | `UpdateA_CustomerReturnTextWrapper` | Yes | Wraps an `UpdateA_CustomerReturnText` record with the new `LongText` in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnText(
    "60000012",
    "EN",
    "0001",
    {d: {LongText: "Customer reports cracked housings on five units. Carrier pickup confirmed for 12 November."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnText</summary>

<div>

Deletes a header-level text from a returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnText(
    "60000012",
    "EN",
    "0001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnText</summary>

<div>

Reads the returns order header that a specific header-level text belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnText(
    "60000012",
    "EN",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Item texts

<details>
<summary>listA_CustomerReturnItemTexts</summary>

<div>

Retrieves a collection of item-level texts across all returns order items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnItemTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemTextWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemTextWrapper result = check customerreturnClient->listA_CustomerReturnItemTexts(
    queries = {
        \$filter: "CustomerReturn eq '60000012' and Language eq 'EN'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Housing cracked on arrival. Photos attached to RMA-2026-0457."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listTextsOfA_CustomerReturnItem</summary>

<div>

Retrieves the item-level texts of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemTextWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemTextWrapper texts = check customerreturnClient->listTextsOfA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Housing cracked on arrival. Photos attached to RMA-2026-0457."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnItemText</summary>

<div>

Retrieves a single item-level text by its language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnItemTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemTextWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemTextWrapper text = check customerreturnClient->getA_CustomerReturnItemText("60000012", "10", "EN", "0001");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Housing cracked on arrival. Photos attached to RMA-2026-0457."
  }
}
```

</div>

</details>

<details>
<summary>patchA_CustomerReturnItemText</summary>

<div>

Replaces the content of an item-level text using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `payload` | `UpdateA_CustomerReturnItemTextWrapper` | Yes | Wraps an `UpdateA_CustomerReturnItemText` record with the new `LongText` in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->patchA_CustomerReturnItemText(
    "60000012",
    "10",
    "EN",
    "0001",
    {d: {LongText: "Housing cracked on arrival. Inspect for transport damage."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_CustomerReturnItemText</summary>

<div>

Deletes an item-level text from a returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnItemText(
    "60000012",
    "10",
    "EN",
    "0001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnItemText</summary>

<div>

Reads the returns order header that a specific item-level text belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnItemTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnItemText(
    "60000012",
    "10",
    "EN",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnItemOfA_CustomerReturnItemText</summary>

<div>

Reads the returns order item that a specific item-level text belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `Language` | `string` | Yes | Language key, up to 2 characters (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text ID, up to 4 characters (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnItemOfA_CustomerReturnItemTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getCustomerReturnItemOfA_CustomerReturnItemText(
    "60000012",
    "10",
    "EN",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Header related objects

A related object links a returns order or item to an object in another system, for example the return merchandise authorization (RMA) number of a customer portal.

<details>
<summary>listA_CustomerReturnRelatedObjects</summary>

<div>

Retrieves a collection of related objects from the headers of all returns orders.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnRelatedObjectsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnRelatedObjectWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnRelatedObjectWrapper result = check customerreturnClient->listA_CustomerReturnRelatedObjects(
    queries = {
        \$filter: "SDDocRelatedObjectReference1 eq 'RMA-2026-0457'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "SDDocRelatedObjectSequenceNmbr": "1",
        "SDDocumentRelatedObjectType": "Z001",
        "SDDocRelatedObjectSystem": "RMA_PORTAL",
        "SDDocRelatedObjectReference1": "RMA-2026-0457",
        "SDDocRelatedObjectReference2": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listRelatedObjectsOfA_CustomerReturn</summary>

<div>

Retrieves the related objects of a specific returns order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRelatedObjectsOfA_CustomerReturnQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnRelatedObjectWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnRelatedObjectWrapper relatedObjects = check customerreturnClient->listRelatedObjectsOfA_CustomerReturn("60000012");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "SDDocRelatedObjectSequenceNmbr": "1",
        "SDDocumentRelatedObjectType": "Z001",
        "SDDocRelatedObjectSystem": "RMA_PORTAL",
        "SDDocRelatedObjectReference1": "RMA-2026-0457",
        "SDDocRelatedObjectReference2": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnRelatedObject</summary>

<div>

Retrieves a single related object of a returns order header by its sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnRelatedObjectQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnRelatedObjectWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnRelatedObjectWrapper relatedObject = check customerreturnClient->getA_CustomerReturnRelatedObject("60000012", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "SDDocRelatedObjectSequenceNmbr": "1",
    "SDDocumentRelatedObjectType": "Z001",
    "SDDocRelatedObjectSystem": "RMA_PORTAL",
    "SDDocRelatedObjectReference1": "RMA-2026-0457",
    "SDDocRelatedObjectReference2": ""
  }
}
```

</div>

</details>

<details>
<summary>createA_CustomerReturnRelatedObject</summary>

<div>

Creates a related object for a returns order header. The `CreateA_CustomerReturnRelatedObject` record does not declare the `CustomerReturn` key; because the record is open, pass it as an additional field with a quoted key (for example, `"CustomerReturn": "60000012"`), or use `createRelatedObjectOfA_CustomerReturn` instead. SAP assigns the sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CustomerReturnRelatedObject` | Yes | Related object data, including the `CustomerReturn` number: the object type, the system of the object and up to two references. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnRelatedObjectWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnRelatedObjectWrapper relatedObject = check customerreturnClient->createA_CustomerReturnRelatedObject({
    "CustomerReturn": "60000012",
    SDDocumentRelatedObjectType: "Z001",
    SDDocRelatedObjectSystem: "RMA_PORTAL",
    SDDocRelatedObjectReference1: "RMA-2026-0457"
});
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "SDDocRelatedObjectSequenceNmbr": "1",
    "SDDocumentRelatedObjectType": "Z001",
    "SDDocRelatedObjectSystem": "RMA_PORTAL",
    "SDDocRelatedObjectReference1": "RMA-2026-0457",
    "SDDocRelatedObjectReference2": ""
  }
}
```

</div>

</details>

<details>
<summary>createRelatedObjectOfA_CustomerReturn</summary>

<div>

Creates a related object for a specific returns order header through its `to_RelatedObject` navigation property. SAP assigns the sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `payload` | `CreateA_CustomerReturnRelatedObject` | Yes | Related object data: the object type, the system of the object and up to two references. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnRelatedObjectWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnRelatedObjectWrapper relatedObject = check customerreturnClient->createRelatedObjectOfA_CustomerReturn(
    "60000012",
    {
        SDDocumentRelatedObjectType: "Z001",
        SDDocRelatedObjectSystem: "RMA_PORTAL",
        SDDocRelatedObjectReference1: "RMA-2026-0457"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "SDDocRelatedObjectSequenceNmbr": "1",
    "SDDocumentRelatedObjectType": "Z001",
    "SDDocRelatedObjectSystem": "RMA_PORTAL",
    "SDDocRelatedObjectReference1": "RMA-2026-0457",
    "SDDocRelatedObjectReference2": ""
  }
}
```

</div>

</details>

<details>
<summary>deleteA_CustomerReturnRelatedObject</summary>

<div>

Deletes a related object from a returns order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnRelatedObject(
    "60000012",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnRelatedObject</summary>

<div>

Reads the returns order header that a specific header-level related object belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnRelatedObjectQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnRelatedObject(
    "60000012",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Item related objects

<details>
<summary>listA_CustomerReturnItemRelatedObjs</summary>

<div>

Retrieves a collection of related objects of all returns order items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnItemRelatedObjsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemRelatedObjWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemRelatedObjWrapper result = check customerreturnClient->listA_CustomerReturnItemRelatedObjs(
    queries = {
        \$filter: "CustomerReturn eq '60000012'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "SDDocRelatedObjectSequenceNmbr": "1",
        "SDDocumentRelatedObjectType": "Z001",
        "SDDocRelatedObjectSystem": "RMA_PORTAL",
        "SDDocRelatedObjectReference1": "RMA-2026-0457-1",
        "SDDocRelatedObjectReference2": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listRelatedObjectsOfA_CustomerReturnItem</summary>

<div>

Retrieves the related objects of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRelatedObjectsOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnItemRelatedObjWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnItemRelatedObjWrapper relatedObjects = check customerreturnClient->listRelatedObjectsOfA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "SDDocRelatedObjectSequenceNmbr": "1",
        "SDDocumentRelatedObjectType": "Z001",
        "SDDocRelatedObjectSystem": "RMA_PORTAL",
        "SDDocRelatedObjectReference1": "RMA-2026-0457-1",
        "SDDocRelatedObjectReference2": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnItemRelatedObj</summary>

<div>

Retrieves a single related object of a returns order item by its sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnItemRelatedObjQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemRelatedObjWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemRelatedObjWrapper relatedObject = check customerreturnClient->getA_CustomerReturnItemRelatedObj("60000012", "10", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "SDDocRelatedObjectSequenceNmbr": "1",
    "SDDocumentRelatedObjectType": "Z001",
    "SDDocRelatedObjectSystem": "RMA_PORTAL",
    "SDDocRelatedObjectReference1": "RMA-2026-0457-1",
    "SDDocRelatedObjectReference2": ""
  }
}
```

</div>

</details>

<details>
<summary>createA_CustomerReturnItemRelatedObj</summary>

<div>

Creates a related object for a returns order item. The `CreateA_CustomerReturnItemRelatedObj` record does not declare the `CustomerReturn` and `CustomerReturnItem` keys; because the record is open, pass them as additional fields with quoted keys, or use `createRelatedObjectOfA_CustomerReturnItem` instead. SAP assigns the sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_CustomerReturnItemRelatedObj` | Yes | Related object data, including the `CustomerReturn` and `CustomerReturnItem` keys: the object type, the system of the object and up to two references. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnItemRelatedObjWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemRelatedObjWrapper relatedObject = check customerreturnClient->createA_CustomerReturnItemRelatedObj({
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    SDDocumentRelatedObjectType: "Z001",
    SDDocRelatedObjectSystem: "RMA_PORTAL",
    SDDocRelatedObjectReference1: "RMA-2026-0457-1"
});
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "SDDocRelatedObjectSequenceNmbr": "1",
    "SDDocumentRelatedObjectType": "Z001",
    "SDDocRelatedObjectSystem": "RMA_PORTAL",
    "SDDocRelatedObjectReference1": "RMA-2026-0457-1",
    "SDDocRelatedObjectReference2": ""
  }
}
```

</div>

</details>

<details>
<summary>createRelatedObjectOfA_CustomerReturnItem</summary>

<div>

Creates a related object for a specific returns order item through its `to_RelatedObject` navigation property. SAP assigns the sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `payload` | `CreateA_CustomerReturnItemRelatedObj` | Yes | Related object data: the object type, the system of the object and up to two references. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_CustomerReturnItemRelatedObjWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemRelatedObjWrapper relatedObject = check customerreturnClient->createRelatedObjectOfA_CustomerReturnItem(
    "60000012",
    "10",
    {
        SDDocumentRelatedObjectType: "Z001",
        SDDocRelatedObjectSystem: "RMA_PORTAL",
        SDDocRelatedObjectReference1: "RMA-2026-0457-1"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "SDDocRelatedObjectSequenceNmbr": "1",
    "SDDocumentRelatedObjectType": "Z001",
    "SDDocRelatedObjectSystem": "RMA_PORTAL",
    "SDDocRelatedObjectReference1": "RMA-2026-0457-1",
    "SDDocRelatedObjectReference2": ""
  }
}
```

</div>

</details>

<details>
<summary>deleteA_CustomerReturnItemRelatedObj</summary>

<div>

Deletes a related object from a returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check customerreturnClient->deleteA_CustomerReturnItemRelatedObj(
    "60000012",
    "10",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnItemRelatedObj</summary>

<div>

Reads the returns order header that a specific item-level related object belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnItemRelatedObjQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnItemRelatedObj(
    "60000012",
    "10",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnItemOfA_CustomerReturnItemRelatedObj</summary>

<div>

Reads the returns order item that a specific item-level related object belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | Sequence number of the related object (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnItemOfA_CustomerReturnItemRelatedObjQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getCustomerReturnItemOfA_CustomerReturnItemRelatedObj(
    "60000012",
    "10",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Schedule lines

<details>
<summary>listA_CustomerReturnScheduleLines</summary>

<div>

Retrieves a collection of schedule lines across all returns order items, with the confirmed, delivered and open quantities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnScheduleLinesQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnScheduleLineWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnScheduleLineWrapper result = check customerreturnClient->listA_CustomerReturnScheduleLines(
    queries = {
        \$filter: "CustomerReturn eq '60000012'",
        \$select: ["CustomerReturn", "CustomerReturnItem", "ScheduleLine", "ConfdOrderQtyByMatlAvailCheck", "OpenConfdDelivQtyInOrdQtyUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "ScheduleLine": "1",
        "ConfdOrderQtyByMatlAvailCheck": "5",
        "OpenConfdDelivQtyInOrdQtyUnit": "5"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listScheduleLinesOfA_CustomerReturnItem</summary>

<div>

Retrieves the schedule lines of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListScheduleLinesOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnScheduleLineWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnScheduleLineWrapper scheduleLines = check customerreturnClient->listScheduleLinesOfA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "ScheduleLine": "1",
        "OrderQuantityUnit": "PC",
        "ConfdOrderQtyByMatlAvailCheck": "5",
        "DeliveredQtyInOrderQtyUnit": "0",
        "OpenConfdDelivQtyInOrdQtyUnit": "5",
        "DelivBlockReasonForSchedLine": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnScheduleLine</summary>

<div>

Retrieves a single schedule line of a returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `ScheduleLine` | `string` | Yes | Schedule line number (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnScheduleLineQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnScheduleLineWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnScheduleLineWrapper scheduleLine = check customerreturnClient->getA_CustomerReturnScheduleLine("60000012", "10", "1");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "ScheduleLine": "1",
    "OrderQuantityUnit": "PC",
    "ConfdOrderQtyByMatlAvailCheck": "5",
    "DeliveredQtyInOrderQtyUnit": "0",
    "OpenConfdDelivQtyInOrdQtyUnit": "5",
    "DelivBlockReasonForSchedLine": ""
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnScheduleLine</summary>

<div>

Reads the returns order header that a specific schedule line belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `ScheduleLine` | `string` | Yes | Schedule line number (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnScheduleLineQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnScheduleLine(
    "60000012",
    "10",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnItemOfA_CustomerReturnScheduleLine</summary>

<div>

Reads the returns order item that a specific schedule line belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `ScheduleLine` | `string` | Yes | Schedule line number (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnItemOfA_CustomerReturnScheduleLineQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getCustomerReturnItemOfA_CustomerReturnScheduleLine(
    "60000012",
    "10",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Serial numbers

<details>
<summary>listA_CustomerReturnSerialNumbers</summary>

<div>

Retrieves a collection of serial numbers across all returns order items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnSerialNumbersQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnSerialNumberWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnSerialNumberWrapper result = check customerreturnClient->listA_CustomerReturnSerialNumbers(
    queries = {
        \$filter: "SerialNumber eq '100045'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "SerialNumber": "100045"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listSerialNumbersOfA_CustomerReturnItem</summary>

<div>

Retrieves the serial numbers of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSerialNumbersOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnSerialNumberWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnSerialNumberWrapper serialNumbers = check customerreturnClient->listSerialNumbersOfA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "SerialNumber": "100045"
      },
      {
        "CustomerReturn": "60000012",
        "CustomerReturnItem": "10",
        "SerialNumber": "100046"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnSerialNumber</summary>

<div>

Retrieves a single serial number of a returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `SerialNumber` | `string` | Yes | Serial number, up to 18 characters (e.g., `"100045"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnSerialNumberQueries` | No | OData query parameters: `$select`. |

Returns: `A_CustomerReturnSerialNumberWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnSerialNumberWrapper serialNumber = check customerreturnClient->getA_CustomerReturnSerialNumber("60000012", "10", "100045");
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "SerialNumber": "100045"
  }
}
```

</div>

</details>

#### Advanced returns process steps

A process step records a document that advanced returns management creates for a returns order item, such as the returns order, the returns delivery or the credit memo request, with its execution status. A step is identified by seven keys; read them from `listProcessStepsOfA_CustomerReturnItem` before you read a single step.

<details>
<summary>listA_CustomerReturnProcessSteps</summary>

<div>

Retrieves a collection of advanced returns process steps across all returns orders.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnProcessStepsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnProcessStepWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnProcessStepWrapper result = check customerreturnClient->listA_CustomerReturnProcessSteps(
    queries = {
        \$filter: "RetsMgmtProcess eq '1000000027'",
        \$select: ["RetsMgmtProcess", "RetsMgmtProcessItem", "RetsMgmtProcessStep", "ReturnsDocumentType", "ReturnsDocument", "RetsMgmtProcStepExecStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "RetsMgmtProcess": "1000000027",
        "RetsMgmtProcessItem": "10",
        "RetsMgmtProcessStep": "0001",
        "ReturnsDocumentType": "01",
        "ReturnsDocument": "60000012",
        "RetsMgmtProcStepExecStatus": "A"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listProcessStepsOfA_CustomerReturnItem</summary>

<div>

Retrieves the advanced returns process steps of a specific returns order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `CustomerReturnItem` | `string` | Yes | Returns order item number (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProcessStepsOfA_CustomerReturnItemQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnProcessStepWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnProcessStepWrapper steps = check customerreturnClient->listProcessStepsOfA_CustomerReturnItem("60000012", "10");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "RetsMgmtProcess": "1000000027",
        "RetsMgmtProcessItem": "10",
        "RetsMgmtProcItmQtySplit": "1",
        "RetsMgmtProcessStep": "0001",
        "ReturnsDocumentType": "01",
        "ReturnsDocument": "60000012",
        "ReturnsDocumentItem": "10",
        "ReturnsDocumentStatus": "A",
        "ReturnsDocumentApprovalStatus": "",
        "ReturnsReferenceDocumentType": "",
        "ReturnsReferenceDocument": "",
        "ReturnsReferenceDocumentItem": "",
        "RetsMgmtProcStepExecStatus": "A"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnProcessStep</summary>

<div>

Retrieves a single advanced returns process step by its seven keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `RetsMgmtProcess` | `string` | Yes | Advanced returns management process ID, up to 10 characters (e.g., `"1000000027"`). |
| `RetsMgmtProcessItem` | `string` | Yes | Item number in the returns process (e.g., `"10"`). |
| `RetsMgmtProcItmQtySplit` | `string` | Yes | Split ID of the process item, up to 3 characters (e.g., `"1"`). |
| `RetsMgmtProcessStep` | `string` | Yes | Step ID, up to 4 characters (e.g., `"0001"`). |
| `ReturnsDocumentType` | `string` | Yes | Type of the document created in the step, up to 2 characters (e.g., `"01"`). |
| `ReturnsDocument` | `string` | Yes | Number of the document created in the step (e.g., `"60000012"`). |
| `ReturnsDocumentItem` | `string` | Yes | Item of the document created in the step (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnProcessStepQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnProcessStepWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnProcessStepWrapper step = check customerreturnClient->getA_CustomerReturnProcessStep(
    "1000000027",
    "10",
    "1",
    "0001",
    "01",
    "60000012",
    "10"
);
```

Sample response:

```ballerina
{
  "d": {
    "RetsMgmtProcess": "1000000027",
    "RetsMgmtProcessItem": "10",
    "RetsMgmtProcItmQtySplit": "1",
    "RetsMgmtProcessStep": "0001",
    "ReturnsDocumentType": "01",
    "ReturnsDocument": "60000012",
    "ReturnsDocumentItem": "10",
    "ReturnsDocumentStatus": "A",
    "ReturnsDocumentApprovalStatus": "",
    "ReturnsReferenceDocumentType": "",
    "ReturnsReferenceDocument": "",
    "ReturnsReferenceDocumentItem": "",
    "RetsMgmtProcStepExecStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnOfA_CustomerReturnProcessStep</summary>

<div>

Reads the returns order header that a specific advanced returns process step belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `RetsMgmtProcess` | `string` | Yes | Advanced returns management process ID, up to 10 characters (e.g., `"1000000027"`). |
| `RetsMgmtProcessItem` | `string` | Yes | Item number in the returns process (e.g., `"10"`). |
| `RetsMgmtProcItmQtySplit` | `string` | Yes | Split ID of the process item, up to 3 characters (e.g., `"1"`). |
| `RetsMgmtProcessStep` | `string` | Yes | Step ID, up to 4 characters (e.g., `"0001"`). |
| `ReturnsDocumentType` | `string` | Yes | Type of the document created in the step, up to 2 characters (e.g., `"01"`). |
| `ReturnsDocument` | `string` | Yes | Number of the document created in the step (e.g., `"60000012"`). |
| `ReturnsDocumentItem` | `string` | Yes | Item of the document created in the step (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOfA_CustomerReturnProcessStepQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnWrapper customerReturn = check customerreturnClient->getCustomerReturnOfA_CustomerReturnProcessStep(
    "1000000027",
    "10",
    "1",
    "0001",
    "01",
    "60000012",
    "10"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnType": "CBAR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "PurchaseOrderByCustomer": "RET-2026-0457",
    "TotalNetAmount": "250.00",
    "TransactionCurrency": "USD",
    "RetsMgmtProcess": "1000000027",
    "OverallSDProcessStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnItemOfA_CustomerReturnProcessStep</summary>

<div>

Reads the returns order item that a specific advanced returns process step belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `RetsMgmtProcess` | `string` | Yes | Advanced returns management process ID, up to 10 characters (e.g., `"1000000027"`). |
| `RetsMgmtProcessItem` | `string` | Yes | Item number in the returns process (e.g., `"10"`). |
| `RetsMgmtProcItmQtySplit` | `string` | Yes | Split ID of the process item, up to 3 characters (e.g., `"1"`). |
| `RetsMgmtProcessStep` | `string` | Yes | Step ID, up to 4 characters (e.g., `"0001"`). |
| `ReturnsDocumentType` | `string` | Yes | Type of the document created in the step, up to 2 characters (e.g., `"01"`). |
| `ReturnsDocument` | `string` | Yes | Number of the document created in the step (e.g., `"60000012"`). |
| `ReturnsDocumentItem` | `string` | Yes | Item of the document created in the step (e.g., `"10"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnItemOfA_CustomerReturnProcessStepQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_CustomerReturnItemWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnItemWrapper item = check customerreturnClient->getCustomerReturnItemOfA_CustomerReturnProcessStep(
    "1000000027",
    "10",
    "1",
    "0001",
    "01",
    "60000012",
    "10"
);
```

Sample response:

```ballerina
{
  "d": {
    "CustomerReturn": "60000012",
    "CustomerReturnItem": "10",
    "CustomerReturnItemCategory": "CBAR",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "PC",
    "NetAmount": "250.00",
    "ReturnReason": "101",
    "RetsMgmtProcess": "1000000027",
    "SDProcessStatus": "A"
  }
}
```

</div>

</details>

#### Overview statuses

The overview status of a returns process shows its logistical, refunding and overall processing status.

<details>
<summary>listA_CustomerReturnOverviewStatuses</summary>

<div>

Retrieves a collection of customer return overview statuses for all advanced returns processes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CustomerReturnOverviewStatusesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CustomerReturnOverviewStatusWrapper|error`

Sample code:

```ballerina
customerreturn:CollectionOfA_CustomerReturnOverviewStatusWrapper result = check customerreturnClient->listA_CustomerReturnOverviewStatuses(
    queries = {
        \$filter: "RetsMgmtProcessingStatus ne 'C'",
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
        "RetsMgmtProcess": "1000000027",
        "ReturnsDocument": "60000012",
        "RetsMgmtLogProcgStatus": "A",
        "RetsMgmtCompnProcgStatus": "A",
        "RetsMgmtProcessingStatus": "A"
      },
      {
        "RetsMgmtProcess": "1000000025",
        "ReturnsDocument": "60000009",
        "RetsMgmtLogProcgStatus": "C",
        "RetsMgmtCompnProcgStatus": "B",
        "RetsMgmtProcessingStatus": "B"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_CustomerReturnOverviewStatus</summary>

<div>

Retrieves the overview status of a single advanced returns process.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `RetsMgmtProcess` | `string` | Yes | Advanced returns management process ID, up to 10 characters (e.g., `"1000000027"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CustomerReturnOverviewStatusQueries` | No | OData query parameters: `$select`. |

Returns: `A_CustomerReturnOverviewStatusWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnOverviewStatusWrapper status = check customerreturnClient->getA_CustomerReturnOverviewStatus("1000000027");
```

Sample response:

```ballerina
{
  "d": {
    "RetsMgmtProcess": "1000000027",
    "ReturnsDocument": "60000012",
    "RetsMgmtLogProcgStatus": "A",
    "RetsMgmtCompnProcgStatus": "A",
    "RetsMgmtProcessingStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getCustomerReturnOverviewStatusOfA_CustomerReturn</summary>

<div>

Retrieves the overview status of the advanced returns process of a specific returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `CustomerReturn` | `string` | Yes | Returns order number (e.g., `"60000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomerReturnOverviewStatusOfA_CustomerReturnQueries` | No | OData query parameters: `$select`. |

Returns: `A_CustomerReturnOverviewStatusWrapper|error`

Sample code:

```ballerina
customerreturn:A_CustomerReturnOverviewStatusWrapper status = check customerreturnClient->getCustomerReturnOverviewStatusOfA_CustomerReturn("60000012");
```

Sample response:

```ballerina
{
  "d": {
    "RetsMgmtProcess": "1000000027",
    "ReturnsDocument": "60000012",
    "RetsMgmtLogProcgStatus": "A",
    "RetsMgmtCompnProcgStatus": "A",
    "RetsMgmtProcessingStatus": "A"
  }
}
```

</div>

</details>

#### Approval actions

When a workflow for returns order approval is set up in SAP S/4HANA, a returns order that needs approval waits until its approval request is released or rejected. These operations act on one returns order at a time, and the result contains a `Boolean` flag that shows whether SAP processed the request.

<details>
<summary>releaseApprovalRequest</summary>

<div>

Approves a returns order by releasing its approval request, so that the returns process can continue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ReleaseApprovalRequestQueries` | Yes | Function import parameter: `CustomerReturn`, the returns order number enclosed in single quotes. |

Returns: `FunctionResult_2|error`

Sample code:

```ballerina
customerreturn:FunctionResult_2 result = check customerreturnClient->releaseApprovalRequest(
    queries = {
        CustomerReturn: "'60000012'"
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

</div>

</details>

<details>
<summary>rejectApprovalRequest</summary>

<div>

Rejects the approval request of a returns order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `RejectApprovalRequestQueries` | Yes | Function import parameter: `CustomerReturn`, the returns order number enclosed in single quotes. |

Returns: `FunctionResult_1|error`

Sample code:

```ballerina
customerreturn:FunctionResult_1 result = check customerreturnClient->rejectApprovalRequest(
    queries = {
        CustomerReturn: "'60000015'"
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
string boundary = "batch_cr001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CustomerReturn('60000012') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CustomerReturn('60000012')/to_Item HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check customerreturnClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</div>

</details>
