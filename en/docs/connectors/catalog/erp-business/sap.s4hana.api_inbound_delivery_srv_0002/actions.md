---
connector: true
connector_name: "sap.s4hana.api_inbound_delivery_srv_0002"
title: "Actions"
description: "Reference for the SAP Inbound Delivery connector client: configuration, initialization, and every operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_inbound_delivery_srv_0002` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA inbound deliveries, their items, partners, texts, document flow and serial numbers, and to the putaway and goods receipt functions, via the `API_INBOUND_DELIVERY_SRV;v=0002` OData API. |

---

## Client

Provides access to SAP S/4HANA inbound deliveries, their items, partners, texts, document flow and serial numbers, and to the putaway and goods receipt functions, via the `API_INBOUND_DELIVERY_SRV;v=0002` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_INBOUND_DELIVERY_SRV;v=0002` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | Optional | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | Optional | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | Optional | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | Optional | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | Optional | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | Optional | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | Optional | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_inbound_delivery_srv_0002 as inbDel;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

inbDel:Client inbDelClient = check new (
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

An inbound delivery header (`A_InbDeliveryHeader`) is identified by `DeliveryDocument` (the delivery number, for example `180000012`), and a delivery item (`A_InbDeliveryItem`) by `DeliveryDocument` and `DeliveryDocumentItem` (for example `000010`). Document flow records (`A_InbDeliveryDocFlow`) are identified by `PrecedingDocument`, `PrecedingDocumentItem` and `SubsequentDocumentCategory`.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers. The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {DeliveryDate: "/Date(1792454400000)/"}}`.

The serial number, putaway and goods receipt operations are OData function imports. Their inputs are passed as fields of the `queries` record and are sent as URL parameters, so they must be written as OData literals: enclose string values in single quotes (for example, `"'180000012'"`), suffix quantities with `M` (for example, `"10M"`), and write dates as `datetime'2026-10-20T00:00'`.

#### Inbound delivery headers

<details>
<summary>listA_InbDeliveryHeaders</summary>

<div>

Retrieves a collection of inbound delivery headers with their supplier, dates, receiving plant and processing statuses. Expand `to_DeliveryDocumentItem`, `to_DeliveryDocumentPartner` or `to_DeliveryDocumentText` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InbDeliveryHeadersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_InbDeliveryHeaderWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryHeaderWrapper result = check inbDelClient->listA_InbDeliveryHeaders(
    queries = {
        \$filter: "ReceivingPlant eq '1010' and OverallGoodsMovementStatus eq 'A'",
        \$top: 2,
        \$orderby: ["DeliveryDate"],
        \$select: ["DeliveryDocument", "DeliveryDocumentType", "Supplier", "DeliveryDate", "ReceivingPlant", "OverallGoodsMovementStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentType": "EL",
        "Supplier": "17300001",
        "DeliveryDate": "/Date(1792454400000)/",
        "ReceivingPlant": "1010",
        "OverallGoodsMovementStatus": "A"
      },
      {
        "DeliveryDocument": "180000013",
        "DeliveryDocumentType": "EL",
        "Supplier": "17300002",
        "DeliveryDate": "/Date(1792540800000)/",
        "ReceivingPlant": "1010",
        "OverallGoodsMovementStatus": "A"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_InbDeliveryHeader</summary>

<div>

Creates an inbound delivery with reference to a preceding document, typically purchase order items. Items are passed in the nested `to_DeliveryDocumentItem` field, each referencing a purchase order item through `ReferenceSDDocument` and `ReferenceSDDocumentItem`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InbDeliveryHeader` | Yes | Delivery header data such as `Supplier`, `DeliveryDate`, `DeliveryDocumentBySupplier` and `BillOfLading`, with nested items. `DeliveryDocument` is a required field of each `CreateA_InbDeliveryItem`; pass an empty string and read the number SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InbDeliveryHeaderWrapper|error`

Sample code:

```ballerina
inbDel:A_InbDeliveryHeaderWrapper created = check inbDelClient->createA_InbDeliveryHeader({
    Supplier: "17300001",
    DeliveryDate: "/Date(1792454400000)/",
    DeliveryDocumentBySupplier: "ASN-2026-0457",
    BillOfLading: "BOL-778812",
    to_DeliveryDocumentItem: {
        results: [{
            DeliveryDocument: "",
            ReferenceSDDocument: "4500000123",
            ReferenceSDDocumentItem: "10",
            ActualDeliveryQuantity: "10",
            DeliveryQuantityUnit: "PC"
        }]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "180000012",
    "DeliveryDocumentType": "EL",
    "DeliveryDocumentBySupplier": "ASN-2026-0457",
    "BillOfLading": "BOL-778812",
    "Supplier": "17300001",
    "ReceivingPlant": "1010",
    "DeliveryDate": "/Date(1792454400000)/",
    "OverallGoodsMovementStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getA_InbDeliveryHeader</summary>

<div>

Retrieves a single inbound delivery header by its delivery number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InbDeliveryHeaderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InbDeliveryHeaderWrapper|error`

Sample code:

```ballerina
inbDel:A_InbDeliveryHeaderWrapper delivery = check inbDelClient->getA_InbDeliveryHeader(
    "180000012",
    queries = {
        \$select: ["DeliveryDocument", "Supplier", "DeliveryDate", "ReceivingPlant", "OverallPickingStatus", "OverallGoodsMovementStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "180000012",
    "Supplier": "17300001",
    "DeliveryDate": "/Date(1792454400000)/",
    "ReceivingPlant": "1010",
    "OverallPickingStatus": "A",
    "OverallGoodsMovementStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InbDeliveryHeader</summary>

<div>

Updates an inbound delivery header using a PATCH request. The updatable fields are `ActualGoodsMovementDate`, `ActualGoodsMovementTime`, `DeliveryDate`, `DeliveryTime`, `ProposedDeliveryRoute` and `ShippingType`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `payload` | `Modified\ A_InbDeliveryHeaderType` | Yes | Wraps an `UpdateA_InbDeliveryHeader` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inbDelClient->patchA_InbDeliveryHeader(
    "180000012",
    {d: {DeliveryDate: "/Date(1792540800000)/", DeliveryTime: "PT14:00:00"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InbDeliveryHeader</summary>

<div>

Deletes an inbound delivery. Deliveries with a posted goods receipt cannot be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inbDelClient->deleteA_InbDeliveryHeader(
    "180000012",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Inbound delivery items

<details>
<summary>listA_InbDeliveryItems</summary>

<div>

Retrieves a collection of inbound delivery items across deliveries, with material, quantities, plant, storage location, batch and reference purchase order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InbDeliveryItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_InbDeliveryItemWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryItemWrapper result = check inbDelClient->listA_InbDeliveryItems(
    queries = {
        \$filter: "ReferenceSDDocument eq '4500000123'",
        \$select: ["DeliveryDocument", "DeliveryDocumentItem", "Material", "ActualDeliveryQuantity", "DeliveryQuantityUnit", "Plant", "ReferenceSDDocument", "ReferenceSDDocumentItem"],
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
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC",
        "Plant": "1010",
        "ReferenceSDDocument": "4500000123",
        "ReferenceSDDocumentItem": "10"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listDeliveryDocumentItemsOfA_InbDeliveryHeader</summary>

<div>

Retrieves the items of a specific inbound delivery, through the `to_DeliveryDocumentItem` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentItemsOfA_InbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_InbDeliveryItemWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryItemWrapper items = check inbDelClient->listDeliveryDocumentItemsOfA_InbDeliveryHeader(
    "180000012",
    queries = {
        \$select: ["DeliveryDocumentItem", "Material", "DeliveryDocumentItemText", "ActualDeliveryQuantity", "DeliveryQuantityUnit", "StorageLocation", "Batch"]
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
        "DeliveryDocumentItemText": "Trading Good 11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC",
        "StorageLocation": "101A",
        "Batch": ""
      },
      {
        "DeliveryDocumentItem": "000020",
        "Material": "TG12",
        "DeliveryDocumentItemText": "Trading Good 12",
        "ActualDeliveryQuantity": "25",
        "DeliveryQuantityUnit": "KG",
        "StorageLocation": "101A",
        "Batch": "0000000101"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InbDeliveryItem</summary>

<div>

Retrieves a single inbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters, e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InbDeliveryItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InbDeliveryItemWrapper|error`

Sample code:

```ballerina
inbDel:A_InbDeliveryItemWrapper item = check inbDelClient->getA_InbDeliveryItem(
    "180000012",
    "000010",
    queries = {
        \$select: ["DeliveryDocument", "DeliveryDocumentItem", "Material", "ActualDeliveryQuantity", "ActualDeliveredQtyInBaseUnit", "BaseUnit", "DeliveryQuantityUnit", "Plant", "StorageLocation", "GoodsMovementStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "180000012",
    "DeliveryDocumentItem": "000010",
    "Material": "TG11",
    "ActualDeliveryQuantity": "10",
    "ActualDeliveredQtyInBaseUnit": "10",
    "BaseUnit": "PC",
    "DeliveryQuantityUnit": "PC",
    "Plant": "1010",
    "StorageLocation": "101A",
    "GoodsMovementStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InbDeliveryItem</summary>

<div>

Updates an inbound delivery item using a PATCH request. The updatable fields are `ActualDeliveryQuantity`, `Batch`, `BatchBySupplier`, `ManufactureDate` and `ShelfLifeExpirationDate`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters, e.g., `"000020"`). |
| `payload` | `Modified\ A_InbDeliveryItemType` | Yes | Wraps an `UpdateA_InbDeliveryItem` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inbDelClient->patchA_InbDeliveryItem(
    "180000012",
    "000020",
    {
        d: {
            ActualDeliveryQuantity: "24",
            BatchBySupplier: "SUP-LOT-8841",
            ManufactureDate: "/Date(1788220800000)/",
            ShelfLifeExpirationDate: "/Date(1838073600000)/"
        }
    },
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InbDeliveryItem</summary>

<div>

Deletes an item from an inbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters, e.g., `"000020"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inbDelClient->deleteA_InbDeliveryItem(
    "180000012",
    "000020",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Partners and addresses

<details>
<summary>listDeliveryDocumentPartnersOfA_InbDeliveryHeader</summary>

<div>

Retrieves the partners of a specific inbound delivery, such as the supplier, with their partner function. Expand `to_Address` to include each partner's address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentPartnersOfA_InbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$inlinecount`. |

Returns: `CollectionOfA_InbDeliveryPartnerWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryPartnerWrapper partners = check inbDelClient->listDeliveryDocumentPartnersOfA_InbDeliveryHeader(
    "180000012",
    queries = {
        \$select: ["SDDocument", "PartnerFunction", "Supplier", "AddressID"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SDDocument": "180000012",
        "PartnerFunction": "LF",
        "Supplier": "17300001",
        "AddressID": "9000000123"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getAddressOfA_InbDeliveryPartner</summary>

<div>

Retrieves the address of a specific inbound delivery partner, through the `to_Address` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PartnerFunction` | `string` | Yes | Partner function (up to 2 characters, e.g., `"LF"` for the supplier). |
| `SDDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAddressOfA_InbDeliveryPartnerQueries` | No | OData query parameters: `$select`. |

Returns: `A_InbDeliveryAddressWrapper|error`

Sample code:

```ballerina
inbDel:A_InbDeliveryAddressWrapper address = check inbDelClient->getAddressOfA_InbDeliveryPartner(
    "LF",
    "180000012",
    queries = {
        \$select: ["AddressID", "BusinessPartnerName1", "StreetName", "HouseNumber", "PostalCode", "CityName", "Region", "Country"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "AddressID": "9000000123",
    "BusinessPartnerName1": "Domestic Supplier Inc.",
    "StreetName": "Main Street",
    "HouseNumber": "100",
    "PostalCode": "60601",
    "CityName": "Chicago",
    "Region": "IL",
    "Country": "US"
  }
}
```

</div>

</details>

#### Texts

<details>
<summary>listDeliveryDocumentTextsOfA_InbDeliveryHeader</summary>

<div>

Retrieves the header texts of a specific inbound delivery, one record per text type and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentTextsOfA_InbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_InbDeliveryHeaderTextWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryHeaderTextWrapper texts = check inbDelClient->listDeliveryDocumentTextsOfA_InbDeliveryHeader(
    "180000012",
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
        "DeliveryDocument": "180000012",
        "TextElement": "0001",
        "Language": "EN",
        "TextElementDescription": "Header Note",
        "TextElementText": "Deliver to dock 3, call ahead 30 minutes before arrival.",
        "DeliveryLongTextIsFormatted": false
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listDeliveryDocumentItemTextsOfA_InbDeliveryItem</summary>

<div>

Retrieves the texts of a specific inbound delivery item, one record per text type and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters, e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentItemTextsOfA_InbDeliveryItemQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_InbDeliveryItemTextWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryItemTextWrapper texts = check inbDelClient->listDeliveryDocumentItemTextsOfA_InbDeliveryItem(
    "180000012",
    "000010",
    queries = {
        \$select: ["TextElement", "Language", "TextElementText"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "TextElement": "0001",
        "Language": "EN",
        "TextElementText": "Pallets must not be stacked."
      }
    ]
  }
}
```

</div>

</details>

#### Document flow

<details>
<summary>listDocumentFlowsOfA_InbDeliveryItem</summary>

<div>

Retrieves the document flow of a specific inbound delivery item, linking it to subsequent documents such as the material document created by the goods receipt.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters, e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDocumentFlowsOfA_InbDeliveryItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$inlinecount`. |

Returns: `CollectionOfA_InbDeliveryDocFlowWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_InbDeliveryDocFlowWrapper docFlow = check inbDelClient->listDocumentFlowsOfA_InbDeliveryItem(
    "180000012",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryVersion": "",
        "PrecedingDocument": "180000012",
        "PrecedingDocumentCategory": "7",
        "PrecedingDocumentItem": "000010",
        "QuantityInBaseUnit": "10",
        "SDFulfillmentCalculationRule": "+",
        "SubsequentDocument": "5000000345",
        "SubsequentDocumentCategory": "R",
        "SubsequentDocumentItem": "000001",
        "TransferOrderInWrhsMgmtIsConfd": false
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InbDeliveryDocFlow</summary>

<div>

Retrieves a single document flow record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PrecedingDocument` | `string` | Yes | Preceding document number (up to 10 characters, e.g., `"180000012"`). |
| `PrecedingDocumentItem` | `string` | Yes | Preceding document item (up to 6 characters, e.g., `"000010"`). |
| `SubsequentDocumentCategory` | `string` | Yes | Category of the subsequent document (up to 4 characters, e.g., `"R"` for a goods movement). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InbDeliveryDocFlowQueries` | No | OData query parameters: `$select`. |

Returns: `A_InbDeliveryDocFlowWrapper|error`

Sample code:

```ballerina
inbDel:A_InbDeliveryDocFlowWrapper flow = check inbDelClient->getA_InbDeliveryDocFlow(
    "180000012",
    "000010",
    "R"
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryVersion": "",
    "PrecedingDocument": "180000012",
    "PrecedingDocumentCategory": "7",
    "PrecedingDocumentItem": "000010",
    "QuantityInBaseUnit": "10",
    "SDFulfillmentCalculationRule": "+",
    "SubsequentDocument": "5000000345",
    "SubsequentDocumentCategory": "R",
    "SubsequentDocumentItem": "000001",
    "TransferOrderInWrhsMgmtIsConfd": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_InbDeliveryDocFlow</summary>

<div>

Updates a document flow record using a PATCH request. The only updatable field is `QuantityInBaseUnit`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PrecedingDocument` | `string` | Yes | Preceding document number (up to 10 characters, e.g., `"180000012"`). |
| `PrecedingDocumentItem` | `string` | Yes | Preceding document item (up to 6 characters, e.g., `"000010"`). |
| `SubsequentDocumentCategory` | `string` | Yes | Category of the subsequent document (up to 4 characters). |
| `payload` | `Modified\ A_InbDeliveryDocFlowType` | Yes | Wraps an `UpdateA_InbDeliveryDocFlow` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inbDelClient->patchA_InbDeliveryDocFlow(
    "180000012",
    "000010",
    "R",
    {d: {QuantityInBaseUnit: "8"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Serial numbers

<details>
<summary>getSerialDeliveryItemOfA_InbDeliveryItem</summary>

<div>

Retrieves the serial number assignment of a specific inbound delivery item, including the maintenance item object list that holds its serial numbers. Expand `to_MaintenanceItemObject` to include the serial numbers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (up to 10 characters, e.g., `"180000012"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (up to 6 characters, e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSerialDeliveryItemOfA_InbDeliveryItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InbDeliverySerialNmbrWrapper|error`

Sample code:

```ballerina
inbDel:A_InbDeliverySerialNmbrWrapper serialItem = check inbDelClient->getSerialDeliveryItemOfA_InbDeliveryItem(
    "180000012",
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
    "DeliveryDate": "/Date(1792454400000)/",
    "DeliveryDocument": "180000012",
    "DeliveryDocumentItem": "000010",
    "MaintenanceItemObjectList": "4711",
    "SDDocumentCategory": "7",
    "to_MaintenanceItemObject": {
      "results": [
        {
          "MaintenanceItemObjectList": "4711",
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

</div>

</details>

<details>
<summary>listMaintenanceItemObjectsOfA_InbDeliverySerialNmbr</summary>

<div>

Retrieves the serialized items (maintenance item objects) of a maintenance item object list, with their material, serial number and equipment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaintenanceItemObjectList` | `string` | Yes | Object list number, as returned in `MaintenanceItemObjectList` of the serial number assignment (e.g., `"4711"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMaintenanceItemObjectsOfA_InbDeliverySerialNmbrQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_MaintenanceItemObjListWrapper|error`

Sample code:

```ballerina
inbDel:CollectionOfA_MaintenanceItemObjListWrapper objects = check inbDelClient->listMaintenanceItemObjectsOfA_InbDeliverySerialNmbr(
    "4711",
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

</div>

</details>

<details>
<summary>createAddSerialNumberToDeliveryItem</summary>

<div>

Adds a serial number to an inbound delivery item (function import `AddSerialNumberToDeliveryItem`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateAddSerialNumberToDeliveryItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `SerialNumber`, each enclosed in single quotes. |

Returns: `AddSerialNumberToDeliveryItemWrapper|error`

Sample code:

```ballerina
inbDel:AddSerialNumberToDeliveryItemWrapper result = check inbDelClient->createAddSerialNumberToDeliveryItem(
    queries = {
        DeliveryDocument: "'180000012'",
        DeliveryDocumentItem: "'000010'",
        SerialNumber: "'100000000003'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "DeliveryDocumentItemText": "Trading Good 11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC",
        "Batch": "",
        "SystemMessageType": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createDeleteSerialNumberFromDeliveryItem</summary>

<div>

Removes a serial number from an inbound delivery item (function import `DeleteSerialNumberFromDeliveryItem`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateDeleteSerialNumberFromDeliveryItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `SerialNumber`, each enclosed in single quotes. |

Returns: `DeleteSerialNumberFromDeliveryItemWrapper|error`

Sample code:

```ballerina
inbDel:DeleteSerialNumberFromDeliveryItemWrapper result = check inbDelClient->createDeleteSerialNumberFromDeliveryItem(
    queries = {
        DeliveryDocument: "'180000012'",
        DeliveryDocumentItem: "'000010'",
        SerialNumber: "'100000000003'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createDeleteAllSerialNumbersFromDeliveryItem</summary>

<div>

Removes all serial numbers from an inbound delivery item (function import `DeleteAllSerialNumbersFromDeliveryItem`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateDeleteAllSerialNumbersFromDeliveryItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem`, each enclosed in single quotes. |

Returns: `DeleteAllSerialNumbersFromDeliveryItemWrapper|error`

Sample code:

```ballerina
inbDel:DeleteAllSerialNumbersFromDeliveryItemWrapper result = check inbDelClient->createDeleteAllSerialNumbersFromDeliveryItem(
    queries = {
        DeliveryDocument: "'180000012'",
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
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC",
        "SystemMessageType": ""
      }
    ]
  }
}
```

</div>

</details>

#### Putaway

<details>
<summary>createPutawayAllItems</summary>

<div>

Takes over the delivery quantity as the putaway quantity for all items of an inbound delivery (function import `PutawayAllItems`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayAllItemsQueries` | Yes | Function import parameters: `DeliveryDocument`, enclosed in single quotes. |

Returns: `PutawayAllItemsWrapper|error`

Sample code:

```ballerina
inbDel:PutawayAllItemsWrapper result = check inbDelClient->createPutawayAllItems(
    queries = {
        DeliveryDocument: "'180000012'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "DeliveryDocumentItemText": "Trading Good 11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC",
        "Batch": ""
      },
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000020",
        "Material": "TG12",
        "DeliveryDocumentItemText": "Trading Good 12",
        "ActualDeliveryQuantity": "24",
        "DeliveryQuantityUnit": "KG",
        "Batch": "0000000101"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPutawayOneItem</summary>

<div>

Takes over the delivery quantity as the putaway quantity for one inbound delivery item (function import `PutawayOneItem`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayOneItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem`, each enclosed in single quotes. |

Returns: `PutawayOneItemWrapper|error`

Sample code:

```ballerina
inbDel:PutawayOneItemWrapper result = check inbDelClient->createPutawayOneItem(
    queries = {
        DeliveryDocument: "'180000012'",
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
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPutawayOneItemWithBaseQuantity</summary>

<div>

Sets the putaway quantity and delivery quantity of one inbound delivery item, given in the base unit of measure (function import `PutawayOneItemWithBaseQuantity`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayOneItemWithBaseQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `BaseUnit` enclosed in single quotes, and `ActualDeliveredQtyInBaseUnit` suffixed with `M`. |

Returns: `PutawayOneItemWithBaseQuantityWrapper|error`

Sample code:

```ballerina
inbDel:PutawayOneItemWithBaseQuantityWrapper result = check inbDelClient->createPutawayOneItemWithBaseQuantity(
    queries = {
        DeliveryDocument: "'180000012'",
        DeliveryDocumentItem: "'000010'",
        ActualDeliveredQtyInBaseUnit: "9M",
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
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "9",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPutawayOneItemWithSalesQuantity</summary>

<div>

Sets the putaway quantity and delivery quantity of one inbound delivery item, given in the delivery (sales) unit (function import `PutawayOneItemWithSalesQuantity`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePutawayOneItemWithSalesQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `DeliveryQuantityUnit` enclosed in single quotes, and `ActualDeliveryQuantity` suffixed with `M`. |

Returns: `PutawayOneItemWithSalesQuantityWrapper|error`

Sample code:

```ballerina
inbDel:PutawayOneItemWithSalesQuantityWrapper result = check inbDelClient->createPutawayOneItemWithSalesQuantity(
    queries = {
        DeliveryDocument: "'180000012'",
        DeliveryDocumentItem: "'000020'",
        ActualDeliveryQuantity: "24M",
        DeliveryQuantityUnit: "'KG'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000020",
        "Material": "TG12",
        "ActualDeliveryQuantity": "24",
        "DeliveryQuantityUnit": "KG",
        "Batch": "0000000101"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSetPutawayQuantityWithBaseQuantity</summary>

<div>

Sets the putaway quantity of one inbound delivery item in the base unit of measure, without changing the delivery quantity (function import `SetPutawayQuantityWithBaseQuantity`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateSetPutawayQuantityWithBaseQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `BaseUnit` enclosed in single quotes, and `ActualDeliveredQtyInBaseUnit` suffixed with `M`. |

Returns: `SetPutawayQuantityWithBaseQuantityWrapper|error`

Sample code:

```ballerina
inbDel:SetPutawayQuantityWithBaseQuantityWrapper result = check inbDelClient->createSetPutawayQuantityWithBaseQuantity(
    queries = {
        DeliveryDocument: "'180000012'",
        DeliveryDocumentItem: "'000010'",
        ActualDeliveredQtyInBaseUnit: "10M",
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
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createConfirmPutawayAllItems</summary>

<div>

Confirms the putaway quantity of all items of an inbound delivery (function import `ConfirmPutawayAllItems`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateConfirmPutawayAllItemsQueries` | Yes | Function import parameters: `DeliveryDocument`, enclosed in single quotes. |

Returns: `ConfirmPutawayAllItemsWrapper|error`

Sample code:

```ballerina
inbDel:ConfirmPutawayAllItemsWrapper result = check inbDelClient->createConfirmPutawayAllItems(
    queries = {
        DeliveryDocument: "'180000012'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC"
      },
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000020",
        "Material": "TG12",
        "ActualDeliveryQuantity": "24",
        "DeliveryQuantityUnit": "KG"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createConfirmPutawayOneItem</summary>

<div>

Confirms the putaway quantity of one inbound delivery item (function import `ConfirmPutawayOneItem`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateConfirmPutawayOneItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem`, each enclosed in single quotes. |

Returns: `ConfirmPutawayOneItemWrapper|error`

Sample code:

```ballerina
inbDel:ConfirmPutawayOneItemWrapper result = check inbDelClient->createConfirmPutawayOneItem(
    queries = {
        DeliveryDocument: "'180000012'",
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
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createCreateBatchSplitItem</summary>

<div>

Creates an additional batch split item for an inbound delivery item, so that part of the delivered quantity is received into a different batch (function import `CreateBatchSplitItem`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCreateBatchSplitItemQueries` | Yes | Function import parameters. Required: `DeliveryDocument`, `DeliveryDocumentItem`, `Batch` and `DeliveryQuantityUnit` enclosed in single quotes, and `ActualDeliveryQuantity` suffixed with `M`. Optional: `PutawayQuantityInOrderUnit` (suffixed with `M`), `BatchBySupplier` (in single quotes), `ManufactureDate` and `ShelfLifeExpirationDate` (as `datetime'...'`). |

Returns: `CreatedDeliveryItem_1|error`

Sample code:

```ballerina
inbDel:CreatedDeliveryItem_1 result = check inbDelClient->createCreateBatchSplitItem(
    queries = {
        DeliveryDocument: "'180000012'",
        DeliveryDocumentItem: "'000020'",
        Batch: "'0000000102'",
        ActualDeliveryQuantity: "4M",
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
      "DeliveryDocument": "180000012",
      "DeliveryDocumentItem": "900001"
    }
  }
}
```

</div>

</details>

#### Goods receipt

<details>
<summary>createPostGoodsReceipt</summary>

<div>

Posts the goods receipt for an inbound delivery, which creates a material document and increases the stock in the receiving plant (function import `PostGoodsReceipt`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePostGoodsReceiptQueries` | Yes | Function import parameters: `DeliveryDocument` enclosed in single quotes, and the optional `ActualGoodsMovementDate` as `datetime'...'`. |

Returns: `PostGoodsReceiptWrapper|error`

Sample code:

```ballerina
inbDel:PostGoodsReceiptWrapper result = check inbDelClient->createPostGoodsReceipt(
    queries = {
        DeliveryDocument: "'180000012'",
        ActualGoodsMovementDate: "datetime'2026-10-20T00:00'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "10",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createReverseGoodsReceipt</summary>

<div>

Reverses the goods receipt posted for an inbound delivery (function import `ReverseGoodsReceipt`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateReverseGoodsReceiptQueries` | Yes | Function import parameters: `DeliveryDocument` enclosed in single quotes, and `ActualGoodsMovementDate` (the posting date of the reversal) as `datetime'YYYY-MM-DDT00:00'`. |

Returns: `ReverseGoodsReceiptWrapper|error`

Sample code:

```ballerina
inbDel:ReverseGoodsReceiptWrapper result = check inbDelClient->createReverseGoodsReceipt(
    queries = {
        DeliveryDocument: "'180000012'",
        ActualGoodsMovementDate: "datetime'2026-10-21T00:00'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "180000012",
        "DeliveryDocumentItem": "000000",
        "SystemMessageIdentification": "VL",
        "SystemMessageNumber": "311",
        "SystemMessageType": "S",
        "SystemMessageVariable1": "Inbound Delivery",
        "SystemMessageVariable2": "180000012"
      }
    ]
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
string boundary = "batch_id001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InbDeliveryHeader('180000012') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InbDeliveryHeader('180000012')/to_DeliveryDocumentItem HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check inbDelClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</div>

</details>
