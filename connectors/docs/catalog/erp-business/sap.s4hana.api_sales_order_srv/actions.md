---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_sales_order_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to SAP S/4HANA Sales Orders and all associated sub-entities via the OData A2X API. |

---

## Client

Provides full CRUD access to SAP S/4HANA Sales Orders and all associated sub-entities via the OData A2X API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig\|OAuth2RefreshTokenGrantConfig` | Required | Authentication credentials; use `http:CredentialsConfig` (username/password) for Basic Auth or `OAuth2RefreshTokenGrantConfig` for OAuth 2.0. |
| `httpVersion` | `string` | `"1.1"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_sales_order_srv as salesorder;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

salesorder:Client salesOrderClient = check new (
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

#### Sales order CRUD

<details>
<summary>listA_SalesOrders</summary>

Retrieves a collection of sales orders, supporting OData query options for filtering, sorting, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SalesOrdersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_SalesOrderWrapper|error`

Sample code:

```ballerina
salesorder:CollectionOfA_SalesOrderWrapper result = check salesOrderClient->listA_SalesOrders(
    queries = {
        \$filter: "SalesOrganization eq '1710'",
        \$top: 5,
        \$select: "SalesOrder,SalesOrderType,SoldToParty,TotalNetAmount"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "5000001",
        "SalesOrderType": "OR",
        "SalesOrganization": "1710",
        "SoldToParty": "17100001",
        "TotalNetAmount": "1500.00",
        "TransactionCurrency": "USD"
      },
      {
        "SalesOrder": "5000002",
        "SalesOrderType": "OR",
        "SalesOrganization": "1710",
        "SoldToParty": "17100002",
        "TotalNetAmount": "3200.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_SalesOrder</summary>

Creates a new sales order with the provided header-level fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SalesOrder` | Yes | Sales order header fields such as type, sales organization, distribution channel, and sold-to party. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderWrapper created = check salesOrderClient->createA_SalesOrder({
    SalesOrderType: "OR",
    SalesOrganization: "1710",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "17100001"
});
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SalesOrderType": "OR",
    "SalesOrganization": "1710",
    "DistributionChannel": "10",
    "OrganizationDivision": "00",
    "SoldToParty": "17100001",
    "TotalNetAmount": "0.00",
    "TransactionCurrency": "USD",
    "OverallSDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>getA_SalesOrder</summary>

Retrieves a single sales order by its document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The SAP sales order document number (e.g., `"5000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_SalesOrderWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderWrapper salesOrder = check salesOrderClient->getA_SalesOrder(
    "5000010",
    queries = {
        \$expand: "to_Item"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SalesOrderType": "OR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001",
    "TotalNetAmount": "1500.00",
    "TransactionCurrency": "USD",
    "RequestedDeliveryDate": "/Date(1720656000000)/",
    "OverallSDProcessStatus": "B"
  }
}
```

</details>

<details>
<summary>updateA_SalesOrder</summary>

Updates header-level fields of an existing sales order using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number to update. |
| `payload` | `A_SalesOrder` | Yes | Fields to update on the sales order header. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the ETag value to enable optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response updateResp = check salesOrderClient->updateA_SalesOrder(
    "5000010",
    {
        CustomerPurchaseOrderDate: "2025-07-15",
        CustomerPurchaseOrderNumber: "PO-98765"
    },
    headers = {"If-Match": "*"}
);
```

</details>

<details>
<summary>deleteA_SalesOrder</summary>

Deletes a sales order by its document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the ETag value. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response deleteResp = check salesOrderClient->deleteA_SalesOrder(
    "5000010",
    headers = {"If-Match": "*"}
);
```

</details>

#### Sales order item management

<details>
<summary>listA_SalesOrderItems</summary>

Retrieves all sales order items across orders, with optional OData filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SalesOrderItemsQueries` | No | OData query parameters for filtering and field selection. |

Returns: `CollectionOfA_SalesOrderItemWrapper|error`

Sample code:

```ballerina
salesorder:CollectionOfA_SalesOrderItemWrapper items = check salesOrderClient->listA_SalesOrderItems(
    queries = {
        \$filter: "SalesOrder eq '5000010'",
        \$select: "SalesOrder,SalesOrderItem,Material,RequestedQuantity"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "5000010",
        "SalesOrderItem": "000010",
        "Material": "TG11",
        "RequestedQuantity": "5",
        "RequestedQuantityUnit": "EA",
        "NetAmount": "750.00",
        "TransactionCurrency": "USD"
      }
    ]
  }
}
```

</details>

<details>
<summary>createItemOfA_SalesOrder</summary>

Creates a new line item under an existing sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The parent sales order document number. |
| `payload` | `CreateA_SalesOrderItem` | Yes | Item fields including material, quantity, plant, and storage location. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderItemWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderItemWrapper newItem = check salesOrderClient->createItemOfA_SalesOrder(
    "5000010",
    {
        Material: "TG11",
        RequestedQuantity: "10",
        RequestedQuantityUnit: "EA",
        Plant: "1710"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SalesOrderItem": "000020",
    "Material": "TG11",
    "RequestedQuantity": "10",
    "RequestedQuantityUnit": "EA",
    "Plant": "1710",
    "NetAmount": "1500.00",
    "TransactionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>getA_SalesOrderItem</summary>

Retrieves a specific sales order item by order number and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The six-digit item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_SalesOrderItemWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderItemWrapper item = check salesOrderClient->getA_SalesOrderItem(
    "5000010",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SalesOrderItem": "000010",
    "Material": "TG11",
    "RequestedQuantity": "5",
    "RequestedQuantityUnit": "EA",
    "Plant": "1710",
    "StorageLocation": "171A",
    "NetAmount": "750.00",
    "TransactionCurrency": "USD",
    "ItemGrossWeight": "2.500",
    "ItemNetWeight": "2.000",
    "ItemWeightUnit": "KG"
  }
}
```

</details>

<details>
<summary>updateA_SalesOrderItem</summary>

Updates fields of a specific sales order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The item number to update. |
| `payload` | `A_SalesOrderItem` | Yes | Fields to update on the item. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->updateA_SalesOrderItem(
    "5000010",
    "000010",
    {RequestedQuantity: "8"},
    headers = {"If-Match": "*"}
);
```

</details>

<details>
<summary>deleteA_SalesOrderItem</summary>

Removes a line item from a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The item number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderItem(
    "5000010",
    "000020",
    headers = {"If-Match": "*"}
);
```

</details>

#### Partners

<details>
<summary>listA_SalesOrderHeaderPartners</summary>

Lists all partner functions assigned to sales order headers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SalesOrderHeaderPartnersQueries` | No | OData query parameters for filtering and field selection. |

Returns: `CollectionOfA_SalesOrderHeaderPartnerWrapper|error`

Sample code:

```ballerina
salesorder:CollectionOfA_SalesOrderHeaderPartnerWrapper partners = check salesOrderClient->listA_SalesOrderHeaderPartners(
    queries = {
        \$filter: "SalesOrder eq '5000010'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "5000010",
        "PartnerFunction": "AG",
        "Customer": "17100001",
        "ContactPerson": ""
      },
      {
        "SalesOrder": "5000010",
        "PartnerFunction": "WE",
        "Customer": "17100003",
        "ContactPerson": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>createPartnerOfA_SalesOrder</summary>

Adds a partner function assignment to a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `payload` | `CreateA_SalesOrderHeaderPartner` | Yes | Partner function code and the customer or vendor number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderHeaderPartnerWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderHeaderPartnerWrapper partner = check salesOrderClient->createPartnerOfA_SalesOrder(
    "5000010",
    {
        PartnerFunction: "RE",
        Customer: "17100005"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "PartnerFunction": "RE",
    "Customer": "17100005",
    "ContactPerson": ""
  }
}
```

</details>

<details>
<summary>getA_SalesOrderHeaderPartner</summary>

Retrieves a specific partner function entry from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `PartnerFunction` | `string` | Yes | Partner function code (e.g., `"AG"` for sold-to, `"WE"` for ship-to). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderHeaderPartnerQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_SalesOrderHeaderPartnerWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderHeaderPartnerWrapper partner = check salesOrderClient->getA_SalesOrderHeaderPartner(
    "5000010",
    "WE"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "PartnerFunction": "WE",
    "Customer": "17100003",
    "ContactPerson": "",
    "AddressID": "12345"
  }
}
```

</details>

<details>
<summary>deleteA_SalesOrderHeaderPartner</summary>

Removes a partner function assignment from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `PartnerFunction` | `string` | Yes | The partner function code to remove. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderHeaderPartner(
    "5000010",
    "RE",
    headers = {"If-Match": "*"}
);
```

</details>

#### Pricing elements

<details>
<summary>getA_SalesOrderHeaderPrElement</summary>

Retrieves a specific pricing condition element from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `PricingProcedureStep` | `string` | Yes | The step number in the pricing procedure. |
| `PricingProcedureCounter` | `string` | Yes | The counter within the pricing procedure step. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderHeaderPrElementQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderHeaderPrElementWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderHeaderPrElementWrapper prElement = check salesOrderClient->getA_SalesOrderHeaderPrElement(
    "5000010",
    "010",
    "01"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "PricingProcedureStep": "010",
    "PricingProcedureCounter": "01",
    "ConditionType": "PR00",
    "ConditionRateValue": "150.00",
    "ConditionCurrency": "USD",
    "ConditionQuantity": "1",
    "ConditionQuantityUnit": "EA",
    "ConditionAmount": "750.00"
  }
}
```

</details>

<details>
<summary>createPricingElementOfA_SalesOrder</summary>

Adds a pricing condition element to a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `payload` | `CreateA_SalesOrderHeaderPrElement` | Yes | Pricing element fields including condition type, rate, and currency. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderHeaderPrElementWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderHeaderPrElementWrapper prElement = check salesOrderClient->createPricingElementOfA_SalesOrder(
    "5000010",
    {
        ConditionType: "HB00",
        ConditionRateValue: "-50.00",
        ConditionCurrency: "USD"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "PricingProcedureStep": "250",
    "PricingProcedureCounter": "01",
    "ConditionType": "HB00",
    "ConditionRateValue": "-50.00",
    "ConditionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>deleteA_SalesOrderHeaderPrElement</summary>

Removes a pricing condition element from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `PricingProcedureStep` | `string` | Yes | The pricing procedure step number. |
| `PricingProcedureCounter` | `string` | Yes | The counter within the step. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderHeaderPrElement(
    "5000010",
    "250",
    "01",
    headers = {"If-Match": "*"}
);
```

</details>

#### Schedule lines

<details>
<summary>listA_SalesOrderScheduleLines</summary>

Retrieves schedule lines across all sales order items, with optional OData filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SalesOrderScheduleLinesQueries` | No | OData query parameters for filtering and field selection. |

Returns: `CollectionOfA_SalesOrderScheduleLineWrapper|error`

Sample code:

```ballerina
salesorder:CollectionOfA_SalesOrderScheduleLineWrapper scheduleLines = check salesOrderClient->listA_SalesOrderScheduleLines(
    queries = {
        \$filter: "SalesOrder eq '5000010' and SalesOrderItem eq '000010'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "5000010",
        "SalesOrderItem": "000010",
        "ScheduleLine": "0001",
        "RequestedDeliveryDate": "/Date(1720656000000)/",
        "ScheduleLineOrderQuantity": "5",
        "ScheduleLineOrderQuantityUnit": "EA",
        "ConfdOrderQtyByMatlAvailCheck": "5"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesOrderScheduleLine</summary>

Retrieves a specific schedule line for a sales order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The item number. |
| `ScheduleLine` | `string` | Yes | The schedule line number (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderScheduleLineQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderScheduleLineWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderScheduleLineWrapper scheduleLine = check salesOrderClient->getA_SalesOrderScheduleLine(
    "5000010",
    "000010",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SalesOrderItem": "000010",
    "ScheduleLine": "0001",
    "RequestedDeliveryDate": "/Date(1720656000000)/",
    "ScheduleLineOrderQuantity": "5",
    "ScheduleLineOrderQuantityUnit": "EA",
    "ConfdOrderQtyByMatlAvailCheck": "5",
    "DeliveredQtyInOrderQtyUnit": "0"
  }
}
```

</details>

<details>
<summary>createScheduleLineOfA_SalesOrderItem</summary>

Creates a new schedule line for a sales order item, specifying a delivery date and quantity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The item number to add a schedule line to. |
| `payload` | `CreateA_SalesOrderScheduleLine` | Yes | Schedule line fields including requested delivery date and quantity. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderScheduleLineWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderScheduleLineWrapper scheduleLine = check salesOrderClient->createScheduleLineOfA_SalesOrderItem(
    "5000010",
    "000010",
    {
        RequestedDeliveryDate: "2025-08-15",
        ScheduleLineOrderQuantity: "3",
        ScheduleLineOrderQuantityUnit: "EA"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SalesOrderItem": "000010",
    "ScheduleLine": "0002",
    "RequestedDeliveryDate": "/Date(1755216000000)/",
    "ScheduleLineOrderQuantity": "3",
    "ScheduleLineOrderQuantityUnit": "EA"
  }
}
```

</details>

<details>
<summary>updateA_SalesOrderScheduleLine</summary>

Updates delivery date or quantity fields on an existing schedule line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The item number. |
| `ScheduleLine` | `string` | Yes | The schedule line number to update. |
| `payload` | `A_SalesOrderScheduleLine` | Yes | Fields to update on the schedule line. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->updateA_SalesOrderScheduleLine(
    "5000010",
    "000010",
    "0002",
    {RequestedDeliveryDate: "2025-09-01"},
    headers = {"If-Match": "*"}
);
```

</details>

<details>
<summary>deleteA_SalesOrderScheduleLine</summary>

Removes a schedule line from a sales order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SalesOrderItem` | `string` | Yes | The item number. |
| `ScheduleLine` | `string` | Yes | The schedule line number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderScheduleLine(
    "5000010",
    "000010",
    "0002",
    headers = {"If-Match": "*"}
);
```

</details>

#### Texts

<details>
<summary>listA_SalesOrderTexts</summary>

Retrieves text elements associated with sales order headers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SalesOrderTextsQueries` | No | OData query parameters for filtering and field selection. |

Returns: `CollectionOfA_SalesOrderTextWrapper|error`

Sample code:

```ballerina
salesorder:CollectionOfA_SalesOrderTextWrapper texts = check salesOrderClient->listA_SalesOrderTexts(
    queries = {
        \$filter: "SalesOrder eq '5000010'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "5000010",
        "Language": "EN",
        "LongTextID": "0001",
        "LongText": "Please handle with care. Fragile items."
      }
    ]
  }
}
```

</details>

<details>
<summary>createTextOfA_SalesOrder</summary>

Creates a text element on a sales order header for a specific language and text ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `payload` | `CreateA_SalesOrderText` | Yes | Text content, language code, and long text ID. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderTextWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderTextWrapper text = check salesOrderClient->createTextOfA_SalesOrder(
    "5000010",
    {
        Language: "EN",
        LongTextID: "0002",
        LongText: "Rush delivery requested by customer."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "Language": "EN",
    "LongTextID": "0002",
    "LongText": "Rush delivery requested by customer."
  }
}
```

</details>

<details>
<summary>getA_SalesOrderText</summary>

Retrieves a specific text element from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `LongTextID` | `string` | Yes | Text object identifier (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderTextQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderTextWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderTextWrapper text = check salesOrderClient->getA_SalesOrderText(
    "5000010",
    "EN",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "Language": "EN",
    "LongTextID": "0001",
    "LongText": "Please handle with care. Fragile items."
  }
}
```

</details>

<details>
<summary>deleteA_SalesOrderText</summary>

Removes a text element from a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `Language` | `string` | Yes | Language key of the text to delete. |
| `LongTextID` | `string` | Yes | Text object identifier to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderText(
    "5000010",
    "EN",
    "0002",
    headers = {"If-Match": "*"}
);
```

</details>

#### Billing plans

<details>
<summary>getBillingPlanOfA_SalesOrder</summary>

Retrieves the billing plan associated with a sales order header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBillingPlanOfA_SalesOrderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_SalesOrderBillingPlanWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderBillingPlanWrapper billingPlan = check salesOrderClient->getBillingPlanOfA_SalesOrder(
    "5000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "BillingPlan": "01",
    "BillingPlanStartDate": "/Date(1719878400000)/",
    "BillingPlanType": "01",
    "BillingRuleOrBillingPlan": "I"
  }
}
```

</details>

<details>
<summary>getA_SalesOrderBillingPlanItem</summary>

Retrieves a specific billing plan item from a sales order header billing plan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `BillingPlan` | `string` | Yes | The billing plan number. |
| `BillingPlanItem` | `string` | Yes | The billing plan item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderBillingPlanItemQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderBillingPlanItemWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderBillingPlanItemWrapper bpItem = check salesOrderClient->getA_SalesOrderBillingPlanItem(
    "5000010",
    "01",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "BillingPlan": "01",
    "BillingPlanItem": "0001",
    "BillingDate": "/Date(1720656000000)/",
    "BillingBlockReason": "",
    "BillingAmountIsFixed": false,
    "BillingPlanBillingValue": "750.00",
    "TransactionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>createBillingPlanItemOfA_SalesOrderBillingPlan</summary>

Adds a new item to an existing sales order header billing plan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `BillingPlan` | `string` | Yes | The billing plan number. |
| `payload` | `CreateA_SalesOrderBillingPlanItem` | Yes | Billing plan item fields including billing date and value. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderBillingPlanItemWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderBillingPlanItemWrapper bpItem = check salesOrderClient->createBillingPlanItemOfA_SalesOrderBillingPlan(
    "5000010",
    "01",
    {
        BillingDate: "2025-09-15",
        BillingPlanBillingValue: "750.00",
        TransactionCurrency: "USD"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "BillingPlan": "01",
    "BillingPlanItem": "0002",
    "BillingDate": "/Date(1757952000000)/",
    "BillingPlanBillingValue": "750.00",
    "TransactionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>deleteA_SalesOrderBillingPlanItem</summary>

Removes a billing plan item from a sales order header billing plan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `BillingPlan` | `string` | Yes | The billing plan number. |
| `BillingPlanItem` | `string` | Yes | The billing plan item number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderBillingPlanItem(
    "5000010",
    "01",
    "0002",
    headers = {"If-Match": "*"}
);
```

</details>

#### Related objects

<details>
<summary>getA_SalesOrderRelatedObject</summary>

Retrieves a specific related object linked to a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | The sequence number identifying the related object. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderRelatedObjectQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderRelatedObjectWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderRelatedObjectWrapper relObj = check salesOrderClient->getA_SalesOrderRelatedObject(
    "5000010",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SDDocRelatedObjectSequenceNmbr": "000001",
    "SDDocumentCategory": "C",
    "RelatedObjectType": "CRM_LEAD",
    "RelatedObjectID": "LEAD-001234"
  }
}
```

</details>

<details>
<summary>createRelatedObjectOfA_SalesOrder</summary>

Links an external object (e.g., CRM lead, project) to a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `payload` | `CreateA_SalesOrderRelatedObject` | Yes | Related object type and its external identifier. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SalesOrderRelatedObjectWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderRelatedObjectWrapper relObj = check salesOrderClient->createRelatedObjectOfA_SalesOrder(
    "5000010",
    {
        RelatedObjectType: "CRM_LEAD",
        RelatedObjectID: "LEAD-005678"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "SDDocRelatedObjectSequenceNmbr": "000002",
    "RelatedObjectType": "CRM_LEAD",
    "RelatedObjectID": "LEAD-005678"
  }
}
```

</details>

<details>
<summary>deleteA_SalesOrderRelatedObject</summary>

Removes a related object link from a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `SDDocRelatedObjectSequenceNmbr` | `string` | Yes | The sequence number of the related object to remove. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SalesOrderRelatedObject(
    "5000010",
    "000002",
    headers = {"If-Match": "*"}
);
```

</details>

#### Process flow

<details>
<summary>getA_SalesOrderPrecdgProcFlow</summary>

Retrieves a preceding document in the process flow of a sales order (e.g., the originating quotation or contract).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `DocRelationshipUUID` | `string` | Yes | UUID identifying the document relationship. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderPrecdgProcFlowQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderPrecdgProcFlowWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderPrecdgProcFlowWrapper precedingDoc = check salesOrderClient->getA_SalesOrderPrecdgProcFlow(
    "5000010",
    "550e8400-e29b-41d4-a716-446655440000"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "DocRelationshipUUID": "550e8400-e29b-41d4-a716-446655440000",
    "PrecedingDocument": "4000123",
    "PrecedingDocumentCategory": "B",
    "PrecedingDocumentItem": "000010"
  }
}
```

</details>

<details>
<summary>getA_SalesOrderSubsqntProcFlow</summary>

Retrieves a subsequent document in the process flow of a sales order (e.g., a delivery or invoice).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `DocRelationshipUUID` | `string` | Yes | UUID identifying the document relationship. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesOrderSubsqntProcFlowQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesOrderSubsqntProcFlowWrapper|error`

Sample code:

```ballerina
salesorder:A_SalesOrderSubsqntProcFlowWrapper subsequentDoc = check salesOrderClient->getA_SalesOrderSubsqntProcFlow(
    "5000010",
    "660e8400-e29b-41d4-a716-446655440001"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "DocRelationshipUUID": "660e8400-e29b-41d4-a716-446655440001",
    "SubsequentDocument": "8000456",
    "SubsequentDocumentCategory": "J",
    "SubsequentDocumentItem": "000010"
  }
}
```

</details>

#### Payment plan items

<details>
<summary>getA_SlsOrdPaymentPlanItemDetails</summary>

Retrieves payment plan item details for a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `PaymentPlanItem` | `string` | Yes | The payment plan item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsOrdPaymentPlanItemDetailsQueries` | No | OData query parameters: `$select`. |

Returns: `A_SlsOrdPaymentPlanItemDetailsWrapper|error`

Sample code:

```ballerina
salesorder:A_SlsOrdPaymentPlanItemDetailsWrapper paymentItem = check salesOrderClient->getA_SlsOrdPaymentPlanItemDetails(
    "5000010",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "PaymentPlanItem": "0001",
    "PaymentDueDate": "/Date(1720656000000)/",
    "CashDiscountDays1": "14",
    "CashDiscountPercent1": "2.000",
    "NetPaymentAmount": "735.00",
    "TransactionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>createPaymentPlanItemDetailsOfA_SalesOrder</summary>

Creates payment plan item details for a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `payload` | `CreateA_SlsOrdPaymentPlanItemDetails` | Yes | Payment plan item fields including due date and discount terms. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_SlsOrdPaymentPlanItemDetailsWrapper|error`

Sample code:

```ballerina
salesorder:A_SlsOrdPaymentPlanItemDetailsWrapper paymentItem = check salesOrderClient->createPaymentPlanItemDetailsOfA_SalesOrder(
    "5000010",
    {
        PaymentDueDate: "2025-08-30",
        NetPaymentAmount: "750.00",
        TransactionCurrency: "USD"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "5000010",
    "PaymentPlanItem": "0002",
    "PaymentDueDate": "/Date(1756512000000)/",
    "NetPaymentAmount": "750.00",
    "TransactionCurrency": "USD"
  }
}
```

</details>

<details>
<summary>deleteA_SlsOrdPaymentPlanItemDetails</summary>

Removes payment plan item details from a sales order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrder` | `string` | Yes | The sales order document number. |
| `PaymentPlanItem` | `string` | Yes | The payment plan item number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check salesOrderClient->deleteA_SlsOrdPaymentPlanItemDetails(
    "5000010",
    "0002",
    headers = {"If-Match": "*"}
);
```

</details>
