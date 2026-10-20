---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_customer_returns_delivery_srv_0002` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA customer returns deliveries, their items, partners, document flow and serial numbers, and the putaway and goods receipt functions through the `API_CUSTOMER_RETURNS_DELIVERY_SRV_0002` OData V2 service. |

---

## Client

Provides access to SAP S/4HANA customer returns deliveries, their items, partners, document flow and serial numbers, and the putaway and goods receipt functions through the `API_CUSTOMER_RETURNS_DELIVERY_SRV_0002` OData V2 service.

### Configuration

The client is initialized with a `ConnectionConfig` record, the API `hostname` (for example, `my123456-api.s4hana.cloud.sap`) and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_CUSTOMER_RETURNS_DELIVERY_SRV;v=0002` from these values. The `ConnectionConfig` record has the following fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration. Use `http:CredentialsConfig` (username and password of the communication user) for Basic Auth. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | Configurations related to the HTTP/2 protocol. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Configurations associated with redirection. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Configurations associated with request pooling. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching related configurations. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Configurations associated with the circuit breaker. |
| `retryConfig` | `http:RetryConfig` | `()` | Configurations associated with retrying. |
| `cookieConfig` | `http:CookieConfig` | `()` | Configurations associated with cookies. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Configurations associated with inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS related options. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server related options. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket configuration. |
| `validation` | `boolean` | `true` | Enables inbound payload validation provided by the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding: `nil` values are treated as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_customer_returns_delivery_srv_0002 as returnDel;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

returnDel:Client returnDelClient = check new (
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

A customer returns delivery header (`A_ReturnsDeliveryHeader`) is identified by the delivery document number (`DeliveryDocument`, up to 10 characters), and a returns delivery item (`A_ReturnsDeliveryItem`) by the delivery document number and the item number (`DeliveryDocumentItem`, up to 6 characters).

The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {DeliveryDate: "/Date(1792368000000)/"}}`. In the query records of the entity operations, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers. Date fields use the OData V2 format `/Date(<milliseconds since epoch>)/` and time fields use the `PT<hh>H<mm>M<ss>S` duration format.

The putaway, batch split and goods receipt operations are OData function imports. Their parameters are passed in the `queries` record and are sent as URL parameters in OData literal syntax: text values are enclosed in single quotes (for example, `"'84000012'"`), decimal quantities are suffixed with `M` (for example, `"5M"`) and dates are written as `"datetime'2026-10-19T00:00'"`. These operations return a collection of SAP messages that describe the result for each affected item.

#### Returns delivery headers

<details>
<summary>listA_ReturnsDeliveryHeaders</summary>

Retrieves a collection of customer returns delivery headers, with dates, shipping and receiving data, weights, Incoterms and the overall processing statuses of each delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ReturnsDeliveryHeadersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, and `search` for free-text search. |

Returns: `CollectionOfA_ReturnsDeliveryHeaderWrapper|error`

Sample code:

```ballerina
returnDel:CollectionOfA_ReturnsDeliveryHeaderWrapper result = check returnDelClient->listA_ReturnsDeliveryHeaders(
    queries = {
        \$filter: "SoldToParty eq '17100001' and OverallGoodsMovementStatus eq 'A'",
        \$select: ["DeliveryDocument", "DeliveryDocumentType", "SoldToParty", "ReceivingPlant", "DeliveryDate", "OverallGoodsMovementStatus"],
        \$orderby: ["DeliveryDocument desc"],
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
        "DeliveryDocument": "84000012",
        "DeliveryDocumentType": "LR",
        "SoldToParty": "17100001",
        "ReceivingPlant": "1710",
        "DeliveryDate": "/Date(1792368000000)/",
        "OverallGoodsMovementStatus": "A"
      },
      {
        "DeliveryDocument": "84000011",
        "DeliveryDocumentType": "LR",
        "SoldToParty": "17100001",
        "ReceivingPlant": "1710",
        "DeliveryDate": "/Date(1792281600000)/",
        "OverallGoodsMovementStatus": "A"
      }
    ]
  }
}
```

</details>

<details>
<summary>createA_ReturnsDeliveryHeader</summary>

Creates a customer returns delivery with reference to a customer return (the preceding returns sales document). The items to deliver are passed in the nested `to_DeliveryDocumentItem` field, each referring to an item of the customer return.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_ReturnsDeliveryHeader` | Yes | Returns delivery header data with its items. In each item, `DeliveryDocument` is a required field of the record type; the sample passes an empty string because SAP assigns the delivery number, and sets `ReferenceSDDocument` and `ReferenceSDDocumentItem` to the customer return item. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_ReturnsDeliveryHeaderWrapper|error`

Sample code:

```ballerina
returnDel:A_ReturnsDeliveryHeaderWrapper created = check returnDelClient->createA_ReturnsDeliveryHeader({
    to_DeliveryDocumentItem: {
        results: [
            {
                DeliveryDocument: "",
                ReferenceSDDocument: "60000005",
                ReferenceSDDocumentItem: "10"
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "84000012",
    "DeliveryDocumentType": "LR",
    "SDDocumentCategory": "T",
    "SoldToParty": "17100001",
    "ShipToParty": "17100001",
    "ReceivingPlant": "1710",
    "ShippingPoint": "1710",
    "SalesOrganization": "1710",
    "DeliveryDate": "/Date(1792368000000)/",
    "CreationDate": "/Date(1792368000000)/",
    "CreationTime": "PT10H15M00S",
    "OverallGoodsMovementStatus": "A",
    "OverallSDProcessStatus": "A"
  }
}
```

</details>

<details>
<summary>getA_ReturnsDeliveryHeader</summary>

Retrieves a single customer returns delivery header by its delivery document number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters), for example `84000012`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ReturnsDeliveryHeaderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReturnsDeliveryHeaderWrapper|error`

Sample code:

```ballerina
returnDel:A_ReturnsDeliveryHeaderWrapper delivery = check returnDelClient->getA_ReturnsDeliveryHeader(
    "84000012",
    queries = {
        \$expand: ["to_DeliveryDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "84000012",
    "DeliveryDocumentType": "LR",
    "SDDocumentCategory": "T",
    "SoldToParty": "17100001",
    "ShipToParty": "17100001",
    "ReceivingPlant": "1710",
    "ShippingPoint": "1710",
    "DeliveryDate": "/Date(1792368000000)/",
    "HeaderGrossWeight": "12.500",
    "HeaderWeightUnit": "KG",
    "OverallGoodsMovementStatus": "A",
    "to_DeliveryDocumentItem": {
      "results": [
        {
          "DeliveryDocument": "84000012",
          "DeliveryDocumentItem": "000010",
          "DeliveryDocumentItemCategory": "REN",
          "Material": "TG11",
          "Plant": "1710",
          "StorageLocation": "171A",
          "ActualDeliveryQuantity": "5",
          "DeliveryQuantityUnit": "PC",
          "ReferenceSDDocument": "60000005",
          "ReferenceSDDocumentItem": "10",
          "GoodsMovementType": "651",
          "GoodsMovementStatus": "A"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>patchA_ReturnsDeliveryHeader</summary>

Updates a customer returns delivery header using a PATCH request, for example to change the delivery date, bill of lading or delivery priority.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `payload` | `Modified\ A_ReturnsDeliveryHeaderType` | Yes | Wraps an `UpdateA_ReturnsDeliveryHeader` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check returnDelClient->patchA_ReturnsDeliveryHeader(
    "84000012",
    {d: {DeliveryDate: "/Date(1792454400000)/", BillOfLading: "BOL-RT-2291"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ReturnsDeliveryHeader</summary>

Deletes a customer returns delivery by its delivery document number. A delivery can only be deleted before the goods receipt is posted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check returnDelClient->deleteA_ReturnsDeliveryHeader(
    "84000012",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listDeliveryDocumentItemsOfA_ReturnsDeliveryHeader</summary>

Retrieves the items of a specific customer returns delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentItemsOfA_ReturnsDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, and `search` for free-text search. |

Returns: `CollectionOfA_ReturnsDeliveryItemWrapper|error`

Sample code:

```ballerina
returnDel:CollectionOfA_ReturnsDeliveryItemWrapper items = check returnDelClient->listDeliveryDocumentItemsOfA_ReturnsDeliveryHeader(
    "84000012",
    queries = {
        \$select: ["DeliveryDocumentItem", "Material", "ActualDeliveryQuantity", "DeliveryQuantityUnit", "Batch", "WarehouseActivityStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "Batch": "",
        "WarehouseActivityStatus": ""
      },
      {
        "DeliveryDocumentItem": "000020",
        "Material": "TG12",
        "ActualDeliveryQuantity": "2.5",
        "DeliveryQuantityUnit": "KG",
        "Batch": "B0001",
        "WarehouseActivityStatus": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>listDeliveryDocumentPartnersOfA_ReturnsDeliveryHeader</summary>

Retrieves the partners of a specific customer returns delivery, such as the sold-to party and the ship-to party.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentPartnersOfA_ReturnsDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$inlinecount`. |

Returns: `CollectionOfA_ReturnsDeliveryPartnerWrapper|error`

Sample code:

```ballerina
returnDel:CollectionOfA_ReturnsDeliveryPartnerWrapper partners = check returnDelClient->listDeliveryDocumentPartnersOfA_ReturnsDeliveryHeader(
    "84000012",
    queries = {
        \$select: ["PartnerFunction", "Customer", "AddressID", "SDDocument"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PartnerFunction": "AG",
        "Customer": "17100001",
        "AddressID": "24711",
        "SDDocument": "84000012"
      },
      {
        "PartnerFunction": "WE",
        "Customer": "17100001",
        "AddressID": "24711",
        "SDDocument": "84000012"
      }
    ]
  }
}
```

</details>

#### Returns delivery items

<details>
<summary>listA_ReturnsDeliveryItems</summary>

Retrieves a collection of customer returns delivery items across deliveries, with the material, quantities, plant and storage location, batch, reference to the customer return and the processing statuses of each item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_ReturnsDeliveryItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, and `search` for free-text search. |

Returns: `CollectionOfA_ReturnsDeliveryItemWrapper|error`

Sample code:

```ballerina
returnDel:CollectionOfA_ReturnsDeliveryItemWrapper result = check returnDelClient->listA_ReturnsDeliveryItems(
    queries = {
        \$filter: "ReferenceSDDocument eq '60000005'",
        \$select: ["DeliveryDocument", "DeliveryDocumentItem", "Material", "ActualDeliveryQuantity", "DeliveryQuantityUnit", "GoodsMovementStatus"],
        \$inlinecount: "allpages"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "__count": "1",
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "GoodsMovementStatus": "A"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_ReturnsDeliveryItem</summary>

Retrieves a single customer returns delivery item by delivery document and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters), for example `000010`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ReturnsDeliveryItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReturnsDeliveryItemWrapper|error`

Sample code:

```ballerina
returnDel:A_ReturnsDeliveryItemWrapper item = check returnDelClient->getA_ReturnsDeliveryItem(
    "84000012",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "84000012",
    "DeliveryDocumentItem": "000010",
    "DeliveryDocumentItemCategory": "REN",
    "DeliveryDocumentItemText": "Trading good 11",
    "Material": "TG11",
    "Plant": "1710",
    "StorageLocation": "171A",
    "Batch": "",
    "ActualDeliveryQuantity": "5",
    "DeliveryQuantityUnit": "PC",
    "ActualDeliveredQtyInBaseUnit": "5",
    "BaseUnit": "PC",
    "ReferenceSDDocument": "60000005",
    "ReferenceSDDocumentItem": "10",
    "GoodsMovementType": "651",
    "GoodsMovementStatus": "A",
    "IsCompletelyDelivered": false,
    "MaterialIsBatchManaged": false,
    "NumberOfSerialNumbers": 0
  }
}
```

</details>

<details>
<summary>patchA_ReturnsDeliveryItem</summary>

Updates a customer returns delivery item using a PATCH request. The updatable fields are the delivery quantity, the batch, the date of manufacture and the shelf life expiration date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters). |
| `payload` | `Modified\ A_ReturnsDeliveryItemType` | Yes | Wraps an `UpdateA_ReturnsDeliveryItem` record (`ActualDeliveryQuantity`, `Batch`, `ManufactureDate`, `ShelfLifeExpirationDate`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check returnDelClient->patchA_ReturnsDeliveryItem(
    "84000012",
    "000010",
    {d: {ActualDeliveryQuantity: "4"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>deleteA_ReturnsDeliveryItem</summary>

Deletes a customer returns delivery item by delivery document and item number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check returnDelClient->deleteA_ReturnsDeliveryItem(
    "84000012",
    "000020",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getSerialDeliveryItemOfA_ReturnsDeliveryItem</summary>

Retrieves the maintenance item object list of a specific returns delivery item. The object list groups the serial numbers recorded for the item; expand `to_MaintenanceItemObject` to include them.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSerialDeliveryItemOfA_ReturnsDeliveryItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_ReturnsDeliverySrlNmbrWrapper|error`

Sample code:

```ballerina
returnDel:A_ReturnsDeliverySrlNmbrWrapper serialList = check returnDelClient->getSerialDeliveryItemOfA_ReturnsDeliveryItem(
    "84000012",
    "000010",
    queries = {
        \$expand: ["to_MaintenanceItemObject"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDate": "/Date(1792368000000)/",
    "DeliveryDocument": "84000012",
    "DeliveryDocumentItem": "000010",
    "MaintenanceItemObjectList": "1874",
    "SDDocumentCategory": "T",
    "to_MaintenanceItemObject": {
      "results": [
        {
          "MaintenanceItemObjectList": "1874",
          "MaintenanceItemObject": 1,
          "Material": "TG11",
          "SerialNumber": "100000000001",
          "Equipment": "10000041"
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>listDocumentFlowsOfA_ReturnsDeliveryItem</summary>

Retrieves the document flow of a specific returns delivery item, that is, the subsequent documents (such as goods receipt material documents) created from the item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery document number (up to 10 characters). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDocumentFlowsOfA_ReturnsDeliveryItemQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_ReturnsDeliveryDocFlowWrapper|error`

Sample code:

```ballerina
returnDel:CollectionOfA_ReturnsDeliveryDocFlowWrapper docFlow = check returnDelClient->listDocumentFlowsOfA_ReturnsDeliveryItem(
    "84000012",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "PrecedingDocument": "84000012",
        "PrecedingDocumentItem": "000010",
        "PrecedingDocumentCategory": "T",
        "Subsequentdocument": "4900001234",
        "SubsequentDocumentItem": "000001",
        "SubsequentDocumentCategory": "R",
        "QuantityInBaseUnit": "5",
        "SDFulfillmentCalculationRule": "+",
        "TransferOrderInWrhsMgmtIsConfd": false
      }
    ]
  }
}
```

</details>

#### Partners and addresses

<details>
<summary>getAddressOfA_ReturnsDeliveryPartner</summary>

Retrieves the address of a specific partner of a customer returns delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PartnerFunction` | `string` | Yes | Partner function (up to 2 characters), for example `WE` for the ship-to party. |
| `SDDocument` | `string` | Yes | Delivery document number of the returns delivery (up to 10 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAddressOfA_ReturnsDeliveryPartnerQueries` | No | OData query parameters: `$select`. |

Returns: `A_ReturnsDeliveryAddressWrapper|error`

Sample code:

```ballerina
returnDel:A_ReturnsDeliveryAddressWrapper address = check returnDelClient->getAddressOfA_ReturnsDeliveryPartner(
    "WE",
    "84000012",
    queries = {
        \$select: ["AddressID", "BusinessPartnerName1", "StreetName", "HouseNumber", "PostalCode", "CityName", "Country"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "AddressID": "24711",
    "BusinessPartnerName1": "Domestic US Customer 1",
    "StreetName": "Main Street",
    "HouseNumber": "100",
    "PostalCode": "10001",
    "CityName": "New York",
    "Country": "US"
  }
}
```

</details>

#### Document flow

<details>
<summary>getA_ReturnsDeliveryDocFlow</summary>

Retrieves a single document flow record of a returns delivery item by the delivery document (`PrecedingDocument`), the delivery item (`PrecedingDocumentItem`) and the subsequent document category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PrecedingDocument` | `string` | Yes | Delivery document number of the returns delivery (up to 10 characters). |
| `PrecedingDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters). |
| `SubsequentDocumentCategory` | `string` | Yes | Category of the subsequent document (up to 4 characters), for example `Q` for a warehouse management transfer order. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_ReturnsDeliveryDocFlowQueries` | No | OData query parameters: `$select`. |

Returns: `A_ReturnsDeliveryDocFlowWrapper|error`

Sample code:

```ballerina
returnDel:A_ReturnsDeliveryDocFlowWrapper docFlow = check returnDelClient->getA_ReturnsDeliveryDocFlow(
    "84000012",
    "000010",
    "Q"
);
```

Sample response:

```ballerina
{
  "d": {
    "PrecedingDocument": "84000012",
    "PrecedingDocumentItem": "000010",
    "PrecedingDocumentCategory": "T",
    "Subsequentdocument": "0000000215",
    "SubsequentDocumentItem": "000001",
    "SubsequentDocumentCategory": "Q",
    "QuantityInBaseUnit": "5",
    "TransferOrderInWrhsMgmtIsConfd": false
  }
}
```

</details>

<details>
<summary>patchA_ReturnsDeliveryDocFlow</summary>

Updates a document flow record of a returns delivery item using a PATCH request. The only updatable field is the quantity in the base unit of measure.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PrecedingDocument` | `string` | Yes | Delivery document number of the returns delivery (up to 10 characters). |
| `PrecedingDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters). |
| `SubsequentDocumentCategory` | `string` | Yes | Category of the subsequent document (up to 4 characters), for example `Q`. |
| `payload` | `Modified\ A_ReturnsDeliveryDocFlowType` | Yes | Wraps an `UpdateA_ReturnsDeliveryDocFlow` record (`QuantityInBaseUnit`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check returnDelClient->patchA_ReturnsDeliveryDocFlow(
    "84000012",
    "000010",
    "Q",
    {d: {QuantityInBaseUnit: "4"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Serial numbers

<details>
<summary>listMaintenanceItemObjectsOfA_ReturnsDeliverySrlNmbr</summary>

Retrieves the maintenance item objects of a maintenance item object list, including the serial numbers, equipment and materials of the returned serialized items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaintenanceItemObjectList` | `string` | Yes | Number of the maintenance item object list, as returned by `getSerialDeliveryItemOfA_ReturnsDeliveryItem` (for example, `1874`). The value is sent without quotes. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMaintenanceItemObjectsOfA_ReturnsDeliverySrlNmbrQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_ReturnsDeliveryMaintObjWrapper|error`

Sample code:

```ballerina
returnDel:CollectionOfA_ReturnsDeliveryMaintObjWrapper serials = check returnDelClient->listMaintenanceItemObjectsOfA_ReturnsDeliverySrlNmbr(
    "1874",
    queries = {
        \$select: ["MaintenanceItemObject", "Material", "SerialNumber", "Equipment"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "MaintenanceItemObject": 1,
        "Material": "TG11",
        "SerialNumber": "100000000001",
        "Equipment": "10000041"
      },
      {
        "MaintenanceItemObject": 2,
        "Material": "TG11",
        "SerialNumber": "100000000002",
        "Equipment": "10000042"
      }
    ]
  }
}
```

</details>

#### Putaway

<details>
<summary>createPutawayAllItems</summary>

Takes over the delivery quantity as the putaway quantity for all items of a customer returns delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayAllItemsQueries` | Yes | Function import parameters: `DeliveryDocument` (delivery number in single quotes). |

Returns: `PutawayAllItemsWrapper|error`

Sample code:

```ballerina
returnDel:PutawayAllItemsWrapper result = check returnDelClient->createPutawayAllItems(
    queries = {
        DeliveryDocument: "'84000012'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "DeliveryDocumentItemText": "Trading good 11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "Batch": "",
        "SystemMessageType": "",
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createPutawayOneItem</summary>

Takes over the delivery quantity as the putaway quantity for one customer returns delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayOneItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem` (each in single quotes). |

Returns: `PutawayOneItemWrapper|error`

Sample code:

```ballerina
returnDel:PutawayOneItemWrapper result = check returnDelClient->createPutawayOneItem(
    queries = {
        DeliveryDocument: "'84000012'",
        DeliveryDocumentItem: "'000010'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createPutawayOneItemWithBaseQuantity</summary>

Sets the same value for the putaway quantity and the delivery quantity, in the base unit of measure, for one customer returns delivery item. Use this when fewer or more units were received than announced.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayOneItemWithBaseQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `BaseUnit` (each in single quotes), and `ActualDeliveredQtyInBaseUnit` (decimal suffixed with `M`). |

Returns: `PutawayOneItemWithBaseQuantityWrapper|error`

Sample code:

```ballerina
returnDel:PutawayOneItemWithBaseQuantityWrapper result = check returnDelClient->createPutawayOneItemWithBaseQuantity(
    queries = {
        DeliveryDocument: "'84000012'",
        DeliveryDocumentItem: "'000010'",
        ActualDeliveredQtyInBaseUnit: "4M",
        BaseUnit: "'PC'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "4",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createPutawayOneItemWithSalesQuantity</summary>

Sets the same value for the putaway quantity and the delivery quantity, in the sales unit of measure, for one customer returns delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayOneItemWithSalesQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `DeliveryQuantityUnit` (each in single quotes), and `ActualDeliveryQuantity` (decimal suffixed with `M`). |

Returns: `PutawayOneItemWithSalesQuantityWrapper|error`

Sample code:

```ballerina
returnDel:PutawayOneItemWithSalesQuantityWrapper result = check returnDelClient->createPutawayOneItemWithSalesQuantity(
    queries = {
        DeliveryDocument: "'84000012'",
        DeliveryDocumentItem: "'000010'",
        ActualDeliveryQuantity: "4M",
        DeliveryQuantityUnit: "'PC'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "4",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createSetPutawayQuantityWithBaseQuantity</summary>

Sets the putaway quantity, in the base unit of measure, for one customer returns delivery item without changing the delivery quantity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateSetPutawayQuantityWithBaseQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `BaseUnit` (each in single quotes), and `ActualDeliveredQtyInBaseUnit` (decimal suffixed with `M`). |

Returns: `SetPutawayQuantityWithBaseQuantityWrapper|error`

Sample code:

```ballerina
returnDel:SetPutawayQuantityWithBaseQuantityWrapper result = check returnDelClient->createSetPutawayQuantityWithBaseQuantity(
    queries = {
        DeliveryDocument: "'84000012'",
        DeliveryDocumentItem: "'000010'",
        ActualDeliveredQtyInBaseUnit: "3M",
        BaseUnit: "'PC'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createConfirmPutawayAllItems</summary>

Confirms the putaway quantity of all items of a customer returns delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateConfirmPutawayAllItemsQueries` | Yes | Function import parameters: `DeliveryDocument` (delivery number in single quotes). |

Returns: `ConfirmPutawayAllItemsWrapper|error`

Sample code:

```ballerina
returnDel:ConfirmPutawayAllItemsWrapper result = check returnDelClient->createConfirmPutawayAllItems(
    queries = {
        DeliveryDocument: "'84000012'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createConfirmPutawayOneItem</summary>

Confirms the putaway quantity of one customer returns delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateConfirmPutawayOneItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem` (each in single quotes). |

Returns: `ConfirmPutawayOneItemWrapper|error`

Sample code:

```ballerina
returnDel:ConfirmPutawayOneItemWrapper result = check returnDelClient->createConfirmPutawayOneItem(
    queries = {
        DeliveryDocument: "'84000012'",
        DeliveryDocumentItem: "'000010'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "",
        "SystemMessageNumber": "000"
      }
    ]
  }
}
```

</details>

#### Batch split items

<details>
<summary>createCreateBatchSplitItem</summary>

Creates an additional batch split item for a customer returns delivery item, for example when the returned quantity arrives in more than one batch, and optionally sets the delivery quantity and batch-related dates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCreateBatchSplitItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem`, `Batch` and `DeliveryQuantityUnit` (each in single quotes) and `ActualDeliveryQuantity` (decimal suffixed with `M`) are required; `ManufactureDate` and `ShelfLifeExpirationDate` (`datetime'...'`) and `PickQuantityInSalesUOM` (suffixed with `M`) are optional. |

Returns: `CreatedDeliveryItem_1|error`

Sample code:

```ballerina
returnDel:CreatedDeliveryItem_1 splitItem = check returnDelClient->createCreateBatchSplitItem(
    queries = {
        DeliveryDocument: "'84000012'",
        DeliveryDocumentItem: "'000020'",
        Batch: "'B0002'",
        ActualDeliveryQuantity: "1M",
        DeliveryQuantityUnit: "'KG'",
        ManufactureDate: "datetime'2026-09-01T00:00'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreateBatchSplitItem": {
      "DeliveryDocument": "84000012",
      "DeliveryDocumentItem": "900001"
    }
  }
}
```

</details>

#### Goods receipt

<details>
<summary>createPostGoodsReceipt</summary>

Posts the goods receipt for a customer returns delivery, moving the returned quantities into stock. The actual goods movement date is optional; if it is omitted, SAP uses the current date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePostGoodsReceiptQueries` | Yes | Function import parameters: `DeliveryDocument` (delivery number in single quotes) and the optional `ActualGoodsMovementDate` (`datetime'...'`). |

Returns: `PostGoodsReceiptWrapper|error`

Sample code:

```ballerina
returnDel:PostGoodsReceiptWrapper result = check returnDelClient->createPostGoodsReceipt(
    queries = {
        DeliveryDocument: "'84000012'",
        ActualGoodsMovementDate: "datetime'2026-10-19T00:00'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": "S",
        "SystemMessageIdentification": "VL",
        "SystemMessageNumber": "311",
        "SystemMessageVariable1": "84000012"
      }
    ]
  }
}
```

</details>

<details>
<summary>createReverseGoodsReceipt</summary>

Reverses the goods receipt of a customer returns delivery, for example when the receipt was posted by mistake.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateReverseGoodsReceiptQueries` | Yes | Function import parameters: `DeliveryDocument` (delivery number in single quotes) and `ActualGoodsMovementDate` (required, in the form `datetime'YYYY-MM-DDT00:00'`). |

Returns: `ReverseGoodsReceiptWrapper|error`

Sample code:

```ballerina
returnDel:ReverseGoodsReceiptWrapper result = check returnDelClient->createReverseGoodsReceipt(
    queries = {
        DeliveryDocument: "'84000012'",
        ActualGoodsMovementDate: "datetime'2026-10-19T00:00'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "84000012",
        "DeliveryDocumentItem": "",
        "CollectiveProcessingType": "",
        "SystemMessageType": "S",
        "SystemMessageIdentification": "VLA",
        "SystemMessageNumber": "311",
        "SystemMessageVariable1": "84000012"
      }
    ]
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
string boundary = "batch_rd001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_ReturnsDeliveryHeader('84000012') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_ReturnsDeliveryHeader('84000012')/to_DeliveryDocumentItem HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check returnDelClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
