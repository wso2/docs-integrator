---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.ce_salesorder_0001` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to SAP S/4HANA sales orders and all related entities via the OData v4 Sales Order API. |

---

## Client

Provides full CRUD access to SAP S/4HANA sales orders and all related entities via the OData v4 Sales Order API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use basic credentials (`http:CredentialsConfig` with username/password), a bearer token, or OAuth 2.0 refresh token. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `http1Settings` | `ClientHttp1Settings` | `()` | HTTP/1.1 client settings (keep-alive, chunking). |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.ce_salesorder_0001;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ce_salesorder_0001:Client salesOrderClient = check new (
    {auth: {username, password}},
    hostname
);
```

### Operations

#### Sales order management

<details>
<summary>createSalesOrder</summary>

Creates a new sales order in SAP S/4HANA, optionally with nested items, partners, pricing elements, and texts in a single deep-insert request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateSalesOrder` | Yes | Sales order data including type, sales organization, distribution channel, and optional nested entities. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SalesOrder|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrder newOrder = check salesOrderClient->createSalesOrder({
    SalesOrderType: "OR",
    SalesOrganization: "1710",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "CUST-001",
    PurchaseOrderByCustomer: "PO-2024-001"
});
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "SalesOrderType": "OR",
  "SalesOrganization": "1710",
  "DistributionChannel": "10",
  "OrganizationDivision": "00",
  "SoldToParty": "CUST-001",
  "PurchaseOrderByCustomer": "PO-2024-001",
  "TotalNetAmount": "0.00",
  "TransactionCurrency": "USD",
  "SalesOrderDate": "2024-01-15T00:00:00Z",
  "OverallSDProcessStatus": "A"
}
```

</details>

<details>
<summary>listSalesOrders</summary>

Retrieves a collection of sales orders, with support for OData v4 filtering, sorting, pagination, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSalesOrdersQueries` | No | OData query options including `$filter`, `$orderby`, `$top`, `$skip`, `$select`, and `$expand`. |

Returns: `CollectionOfSalesOrder|error`

Sample code:

```ballerina
ce_salesorder_0001:CollectionOfSalesOrder result = check salesOrderClient->listSalesOrders(
    queries = {
        "\$filter": "SalesOrganization eq '1710'",
        "\$top": 10,
        "\$select": "SalesOrder,SalesOrderType,SoldToParty,TotalNetAmount,TransactionCurrency"
    }
);
```

Sample response:

```ballerina
{
  "@odata.count": 2,
  "value": [
    {
      "SalesOrder": "1234567890",
      "SalesOrderType": "OR",
      "SoldToParty": "CUST-001",
      "TotalNetAmount": "5000.00",
      "TransactionCurrency": "USD"
    },
    {
      "SalesOrder": "1234567891",
      "SalesOrderType": "OR",
      "SoldToParty": "CUST-002",
      "TotalNetAmount": "3200.00",
      "TransactionCurrency": "USD"
    }
  ]
}
```

</details>

<details>
<summary>getSalesOrder</summary>

Retrieves a single sales order by its identifier, with optional field selection and expansion of related entities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `salesOrder` | `string` | Yes | The sales order number (e.g., `"1234567890"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSalesOrderQueries` | No | OData query options including `$select` and `$expand`. |

Returns: `SalesOrder|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrder order = check salesOrderClient->getSalesOrder(
    "1234567890",
    queries = {"\$expand": "_Item,_Partner"}
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "SalesOrderType": "OR",
  "SalesOrganization": "1710",
  "DistributionChannel": "10",
  "OrganizationDivision": "00",
  "SoldToParty": "CUST-001",
  "PurchaseOrderByCustomer": "PO-2024-001",
  "TotalNetAmount": "5000.00",
  "TransactionCurrency": "USD",
  "OverallSDProcessStatus": "B",
  "_Item": {"value": [{"SalesOrderItem": "000010", "Material": "MAT-001", "RequestedQuantity": "10"}]},
  "_Partner": {"value": [{"PartnerFunction": "AG", "Customer": "CUST-001"}]}
}
```

</details>

<details>
<summary>patchSalesOrder</summary>

Updates selected fields on an existing sales order header using a partial update (PATCH).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `salesOrder` | `string` | Yes | The sales order number to update. |
| `payload` | `UpdateSalesOrder` | Yes | Fields to update; only supplied fields are modified. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check salesOrderClient->patchSalesOrder(
    "1234567890",
    {PurchaseOrderByCustomer: "PO-2024-002"}
);
```

</details>

#### Sales order item management

<details>
<summary>createItemOfSalesOrder</summary>

Adds a new item to an existing sales order, specifying material, quantity, and optional sub-entities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The parent sales order number. |
| `payload` | `CreateSalesOrderItem` | Yes | Item data including item number, material, quantity, and unit. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SalesOrderItem|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderItem newItem = check salesOrderClient->createItemOfSalesOrder(
    "1234567890",
    {
        SalesOrderItem: "000010",
        Material: "MAT-001",
        RequestedQuantity: "10",
        RequestedQuantityUnit: "EA"
    }
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "SalesOrderItem": "000010",
  "Material": "MAT-001",
  "SalesOrderItemText": "Product A",
  "RequestedQuantity": "10",
  "RequestedQuantityUnit": "EA",
  "ItemNetAmount": "1000.00",
  "TransactionCurrency": "USD",
  "StorageLocation": "0001"
}
```

</details>

<details>
<summary>listItemsOfSalesOrder</summary>

Retrieves all items belonging to a specific sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListItemsOfSalesOrderQueries` | No | OData query options. |

Returns: `CollectionOfSalesOrderItem|error`

Sample code:

```ballerina
ce_salesorder_0001:CollectionOfSalesOrderItem items = check salesOrderClient->listItemsOfSalesOrder("1234567890");
```

Sample response:

```ballerina
{
  "value": [
    {
      "SalesOrder": "1234567890",
      "SalesOrderItem": "000010",
      "Material": "MAT-001",
      "SalesOrderItemText": "Product A",
      "RequestedQuantity": "10",
      "RequestedQuantityUnit": "EA",
      "ItemNetAmount": "1000.00",
      "TransactionCurrency": "USD"
    },
    {
      "SalesOrder": "1234567890",
      "SalesOrderItem": "000020",
      "Material": "MAT-002",
      "SalesOrderItemText": "Product B",
      "RequestedQuantity": "5",
      "RequestedQuantityUnit": "EA",
      "ItemNetAmount": "500.00",
      "TransactionCurrency": "USD"
    }
  ]
}
```

</details>

<details>
<summary>getSalesOrderItem</summary>

Retrieves a single sales order item by order number and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `salesOrderItem` | `string` | Yes | The item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSalesOrderItemQueries` | No | OData query options including `$select` and `$expand`. |

Returns: `SalesOrderItem|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderItem item = check salesOrderClient->getSalesOrderItem("1234567890", "000010");
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "SalesOrderItem": "000010",
  "Material": "MAT-001",
  "SalesOrderItemText": "Product A",
  "RequestedQuantity": "10",
  "RequestedQuantityUnit": "EA",
  "ItemNetAmount": "1000.00",
  "TransactionCurrency": "USD",
  "StorageLocation": "0001",
  "DeliveryGroup": "0",
  "ItemBillingBlockReason": ""
}
```

</details>

<details>
<summary>patchSalesOrderItem</summary>

Updates selected fields on an existing sales order item using a partial update (PATCH).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `salesOrderItem` | `string` | Yes | The item number to update. |
| `payload` | `UpdateSalesOrderItem` | Yes | Fields to update on the item; only supplied fields are modified. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check salesOrderClient->patchSalesOrderItem(
    "1234567890",
    "000010",
    {RequestedQuantity: "15"}
);
```

</details>

<details>
<summary>deleteSalesOrderItem</summary>

Removes an item from a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `salesOrderItem` | `string` | Yes | The item number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check salesOrderClient->deleteSalesOrderItem("1234567890", "000010");
```

</details>

#### Partner management

<details>
<summary>createPartnerOfSalesOrder</summary>

Assigns a partner function (e.g., ship-to party, bill-to party) to a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `payload` | `CreateSalesOrderPartner` | Yes | Partner data including the function code and the customer or supplier ID. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SalesOrderPartner|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderPartner partner = check salesOrderClient->createPartnerOfSalesOrder(
    "1234567890",
    {PartnerFunction: "WE", Customer: "SHIP-001"}
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "PartnerFunction": "WE",
  "Customer": "SHIP-001",
  "Supplier": "",
  "Personnel": "",
  "ContactPerson": ""
}
```

</details>

<details>
<summary>listPartnersOfSalesOrder</summary>

Retrieves all partner function assignments for a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPartnersOfSalesOrderQueries` | No | OData query options. |

Returns: `CollectionOfSalesOrderPartner|error`

Sample code:

```ballerina
ce_salesorder_0001:CollectionOfSalesOrderPartner partners = check salesOrderClient->listPartnersOfSalesOrder("1234567890");
```

Sample response:

```ballerina
{
  "value": [
    {"SalesOrder": "1234567890", "PartnerFunction": "AG", "Customer": "CUST-001"},
    {"SalesOrder": "1234567890", "PartnerFunction": "WE", "Customer": "SHIP-001"},
    {"SalesOrder": "1234567890", "PartnerFunction": "RE", "Customer": "BILL-001"}
  ]
}
```

</details>

<details>
<summary>getSalesOrderPartner</summary>

Retrieves a specific partner function entry from a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `PartnerFunction` | `string` | Yes | The partner function code (e.g., `"WE"` for ship-to party, `"AG"` for sold-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSalesOrderPartnerQueries` | No | OData query options. |

Returns: `SalesOrderPartner|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderPartner partner = check salesOrderClient->getSalesOrderPartner("1234567890", "WE");
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "PartnerFunction": "WE",
  "Customer": "SHIP-001",
  "Supplier": "",
  "Personnel": "",
  "ContactPerson": ""
}
```

</details>

<details>
<summary>deleteSalesOrderPartner</summary>

Removes a partner function assignment from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `PartnerFunction` | `string` | Yes | The partner function code to remove. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check salesOrderClient->deleteSalesOrderPartner("1234567890", "WE");
```

</details>

#### Pricing element management

<details>
<summary>createPricingElementOfSalesOrder</summary>

Adds a pricing condition element to a sales order header, specifying condition type and rate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `payload` | `CreateSalesOrderPricingElement` | Yes | Pricing element data including procedure step, counter, condition type, and rate. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SalesOrderPricingElement|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderPricingElement pricingEl = check salesOrderClient->createPricingElementOfSalesOrder(
    "1234567890",
    {
        PricingProcedureStep: "010",
        PricingProcedureCounter: "01",
        ConditionType: "PR00",
        ConditionRateValue: "500.00",
        ConditionCurrency: "USD"
    }
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "PricingProcedureStep": "010",
  "PricingProcedureCounter": "01",
  "ConditionType": "PR00",
  "ConditionRateValue": "500.00",
  "ConditionCurrency": "USD",
  "ConditionAmount": "5000.00",
  "ConditionApplication": "V"
}
```

</details>

<details>
<summary>listPricingElementsOfSalesOrder</summary>

Retrieves all pricing condition elements associated with a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPricingElementsOfSalesOrderQueries` | No | OData query options. |

Returns: `CollectionOfSalesOrderPricingElement|error`

Sample code:

```ballerina
ce_salesorder_0001:CollectionOfSalesOrderPricingElement elements = check salesOrderClient->listPricingElementsOfSalesOrder("1234567890");
```

Sample response:

```ballerina
{
  "value": [
    {
      "SalesOrder": "1234567890",
      "PricingProcedureStep": "010",
      "PricingProcedureCounter": "01",
      "ConditionType": "PR00",
      "ConditionRateValue": "500.00",
      "ConditionAmount": "5000.00",
      "ConditionCurrency": "USD"
    },
    {
      "SalesOrder": "1234567890",
      "PricingProcedureStep": "920",
      "PricingProcedureCounter": "01",
      "ConditionType": "MWST",
      "ConditionRateValue": "10.00",
      "ConditionAmount": "500.00",
      "ConditionCurrency": "USD"
    }
  ]
}
```

</details>

<details>
<summary>getSalesOrderPricingElement</summary>

Retrieves a specific pricing condition element from a sales order by step and counter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `PricingProcedureStep` | `string` | Yes | The pricing procedure step number. |
| `PricingProcedureCounter` | `string` | Yes | The pricing procedure counter. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSalesOrderPricingElementQueries` | No | OData query options. |

Returns: `SalesOrderPricingElement|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderPricingElement element = check salesOrderClient->getSalesOrderPricingElement(
    "1234567890", "010", "01"
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "PricingProcedureStep": "010",
  "PricingProcedureCounter": "01",
  "ConditionType": "PR00",
  "ConditionRateValue": "500.00",
  "ConditionAmount": "5000.00",
  "ConditionCurrency": "USD",
  "ConditionApplication": "V",
  "ConditionQuantity": "1",
  "ConditionQuantityUnit": "EA"
}
```

</details>

<details>
<summary>deleteSalesOrderPricingElement</summary>

Removes a pricing condition element from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `PricingProcedureStep` | `string` | Yes | The pricing procedure step to delete. |
| `PricingProcedureCounter` | `string` | Yes | The pricing procedure counter to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check salesOrderClient->deleteSalesOrderPricingElement("1234567890", "010", "01");
```

</details>

#### Schedule line management

<details>
<summary>listScheduleLinesOfSalesOrderItem</summary>

Retrieves all schedule lines for a sales order item, showing planned delivery quantities and dates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `SalesOrderItem` | `string` | Yes | The item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListScheduleLinesOfSalesOrderItemQueries` | No | OData query options. |

Returns: `CollectionOfSalesOrderScheduleLine|error`

Sample code:

```ballerina
ce_salesorder_0001:CollectionOfSalesOrderScheduleLine scheduleLines = check salesOrderClient->listScheduleLinesOfSalesOrderItem(
    "1234567890", "000010"
);
```

Sample response:

```ballerina
{
  "value": [
    {
      "SalesOrder": "1234567890",
      "SalesOrderItem": "000010",
      "ScheduleLine": "0001",
      "RequestedDeliveryDate": "2024-12-31T00:00:00Z",
      "ScheduleLineOrderQuantity": "10",
      "ScheduleLineOrderQuantityUnit": "EA",
      "ConfdDelivQtyInOrderQtyUnit": "10",
      "DeliveredQtyInOrderQtyUnit": "0"
    }
  ]
}
```

</details>

<details>
<summary>getSalesOrderScheduleLine</summary>

Retrieves a specific schedule line for a sales order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `SalesOrderItem` | `string` | Yes | The item number. |
| `ScheduleLine` | `string` | Yes | The schedule line identifier (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSalesOrderScheduleLineQueries` | No | OData query options. |

Returns: `SalesOrderScheduleLine|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderScheduleLine line = check salesOrderClient->getSalesOrderScheduleLine(
    "1234567890", "000010", "0001"
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "SalesOrderItem": "000010",
  "ScheduleLine": "0001",
  "RequestedDeliveryDate": "2024-12-31T00:00:00Z",
  "ScheduleLineOrderQuantity": "10",
  "ScheduleLineOrderQuantityUnit": "EA",
  "ConfdDelivQtyInOrderQtyUnit": "10",
  "DeliveredQtyInOrderQtyUnit": "0",
  "OpenConfdDelivQtyInOrdQtyUnit": "10"
}
```

</details>

#### Text management

<details>
<summary>createTextOfSalesOrder</summary>

Adds a long-text entry to a sales order header for a specified language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `payload` | `CreateSalesOrderText` | Yes | Text data including language code, text ID, and the text content. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SalesOrderText|error`

Sample code:

```ballerina
ce_salesorder_0001:SalesOrderText text = check salesOrderClient->createTextOfSalesOrder(
    "1234567890",
    {
        Language: "EN",
        LongTextID: "0001",
        LongText: "Special delivery instructions: handle with care."
    }
);
```

Sample response:

```ballerina
{
  "SalesOrder": "1234567890",
  "Language": "EN",
  "LongTextID": "0001",
  "LongText": "Special delivery instructions: handle with care."
}
```

</details>

<details>
<summary>listTextsOfSalesOrder</summary>

Retrieves all text entries associated with a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfSalesOrderQueries` | No | OData query options. |

Returns: `CollectionOfSalesOrderText|error`

Sample code:

```ballerina
ce_salesorder_0001:CollectionOfSalesOrderText texts = check salesOrderClient->listTextsOfSalesOrder("1234567890");
```

Sample response:

```ballerina
{
  "value": [
    {
      "SalesOrder": "1234567890",
      "Language": "EN",
      "LongTextID": "0001",
      "LongText": "Special delivery instructions: handle with care."
    },
    {
      "SalesOrder": "1234567890",
      "Language": "DE",
      "LongTextID": "0001",
      "LongText": "Besondere Lieferhinweise: mit Vorsicht behandeln."
    }
  ]
}
```

</details>

<details>
<summary>deleteSalesOrderText</summary>

Removes a text entry from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order number. |
| `Language` | `string` | Yes | The language code of the text to remove (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | The text ID to remove. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response _ = check salesOrderClient->deleteSalesOrderText("1234567890", "EN", "0001");
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Executes multiple OData read or change requests in a single HTTP call using the OData v4 batch protocol, reducing network round-trips.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An HTTP request with `multipart/mixed` content type containing the individual OData batch requests. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_abc123";
batchRequest.setHeader("Content-Type", string `multipart/mixed;boundary=${boundary}`);
batchRequest.setPayload(
    string `--${boundary}\r\nContent-Type: application/http\r\n\r\nGET SalesOrder('1234567890') HTTP/1.1\r\n\r\n--${boundary}--`
);
http:Response batchResponse = check salesOrderClient->performBatchOperation(batchRequest);
```

</details>
