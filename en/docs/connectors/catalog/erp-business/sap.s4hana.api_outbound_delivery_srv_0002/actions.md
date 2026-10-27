---
connector: true
connector_name: "sap.s4hana.api_outbound_delivery_srv_0002"
title: "Actions"
description: "Reference for the SAP Outbound Delivery connector client: configuration, initialization, and every delivery, handling unit, serial number, picking and goods issue operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_outbound_delivery_srv_0002` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Creates, reads, updates and deletes SAP S/4HANA outbound deliveries and runs picking, handling unit, serial number and goods issue actions via the `API_OUTBOUND_DELIVERY_SRV;v=0002` OData API. |

---

## Client

Creates, reads, updates and deletes SAP S/4HANA outbound deliveries and runs picking, handling unit, serial number and goods issue actions via the `API_OUTBOUND_DELIVERY_SRV;v=0002` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_OUTBOUND_DELIVERY_SRV;v=0002` from these values.

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
import ballerinax/sap.s4hana.api_outbound_delivery_srv_0002 as outbDel;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

outbDel:Client outbDelClient = check new (
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

An outbound delivery is identified by its delivery number (`DeliveryDocument`, up to 10 characters) and a delivery item by the delivery number and item number (`DeliveryDocumentItem`, up to 6 characters, for example `000010`).

The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {DeliveryPriority: "02"}}`. Update and delete operations return an `http:Response`; include an `If-Match` header with the entity ETag (or `*`) for optimistic locking.

The picking, handling unit, serial number and goods issue actions are OData function imports. Their parameters are passed in the `queries` record as OData literals: enclose text values in single quotes (for example, `"'80000123'"`), suffix quantities with `M` (for example, `"5M"`), and pass dates as `datetime'YYYY-MM-DDT00:00'`.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property and navigation names, `$top` and `$skip` take integers, and `search` takes a free-text search phrase.

#### Outbound deliveries

<details>
<summary>listA_OutbDeliveryHeaders</summary>

<div>

Retrieves a collection of outbound delivery headers, with the shipping point, ship-to party, dates, weights and overall picking, packing and goods movement statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_OutbDeliveryHeadersQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_OutbDeliveryHeaderWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryHeaderWrapper result = check outbDelClient->listA_OutbDeliveryHeaders(
    queries = {
        \$filter: "ShippingPoint eq '1010' and OverallGoodsMovementStatus eq 'A'",
        \$select: ["DeliveryDocument", "ShipToParty", "PlannedGoodsIssueDate", "OverallPickingStatus", "OverallGoodsMovementStatus"],
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
        "DeliveryDocument": "80000124",
        "ShipToParty": "10100001",
        "PlannedGoodsIssueDate": "/Date(1792368000000)/",
        "OverallPickingStatus": "A",
        "OverallGoodsMovementStatus": "A"
      },
      {
        "DeliveryDocument": "80000123",
        "ShipToParty": "10100001",
        "PlannedGoodsIssueDate": "/Date(1792368000000)/",
        "OverallPickingStatus": "C",
        "OverallGoodsMovementStatus": "A"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_OutbDeliveryHeader</summary>

<div>

Creates an outbound delivery with reference to a preceding document, typically a sales order. The reference is passed in the nested `to_DeliveryDocumentItem` items through `ReferenceSDDocument` and `ReferenceSDDocumentItem`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_OutbDeliveryHeader` | Yes | Delivery header data with nested items. `DeliveryDocument` is a required field of each `CreateA_OutbDeliveryItem`; the sample passes an empty string and reads the delivery number SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_OutbDeliveryHeaderWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryHeaderWrapper created = check outbDelClient->createA_OutbDeliveryHeader({
    ShippingPoint: "1010",
    to_DeliveryDocumentItem: {
        results: [{
            DeliveryDocument: "",
            ReferenceSDDocument: "120",
            ReferenceSDDocumentItem: "10"
        }]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "DeliveryDocumentType": "LF",
    "ShippingPoint": "1010",
    "SalesOrganization": "1010",
    "SoldToParty": "10100001",
    "ShipToParty": "10100001",
    "PlannedGoodsIssueDate": "/Date(1792368000000)/",
    "DeliveryDate": "/Date(1792454400000)/",
    "HeaderGrossWeight": "12.000",
    "HeaderWeightUnit": "KG",
    "OverallPickingStatus": "A",
    "OverallGoodsMovementStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>getA_OutbDeliveryHeader</summary>

<div>

Retrieves a single outbound delivery header by its delivery number. Expand `to_DeliveryDocumentItem`, `to_DeliveryDocumentPartner`, `to_DeliveryDocumentText` or `to_HandlingUnitHeaderDelivery` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_OutbDeliveryHeaderQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_OutbDeliveryHeaderWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryHeaderWrapper delivery = check outbDelClient->getA_OutbDeliveryHeader(
    "80000123",
    queries = {
        \$expand: ["to_DeliveryDocumentItem"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "DeliveryDocumentType": "LF",
    "ShippingPoint": "1010",
    "SoldToParty": "10100001",
    "ShipToParty": "10100001",
    "PlannedGoodsIssueDate": "/Date(1792368000000)/",
    "OverallPickingStatus": "C",
    "OverallGoodsMovementStatus": "A",
    "to_DeliveryDocumentItem": {
      "results": [
        {
          "DeliveryDocument": "80000123",
          "DeliveryDocumentItem": "000010",
          "Material": "TG11",
          "Plant": "1010",
          "StorageLocation": "101A",
          "ActualDeliveryQuantity": "5",
          "DeliveryQuantityUnit": "PC",
          "ReferenceSDDocument": "120",
          "ReferenceSDDocumentItem": "10",
          "PickingStatus": "C"
        }
      ]
    }
  }
}
```

</div>

</details>

<details>
<summary>patchA_OutbDeliveryHeader</summary>

<div>

Updates the header data of an outbound delivery using a PATCH request, for example the planned goods issue date, delivery priority, bill of lading or means of transport.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `payload` | `Modified\ A_OutbDeliveryHeaderType` | Yes | Wraps an `UpdateA_OutbDeliveryHeader` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->patchA_OutbDeliveryHeader(
    "80000123",
    {d: {DeliveryPriority: "02", BillOfLading: "BOL-2026-0457"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_OutbDeliveryHeader</summary>

<div>

Deletes an outbound delivery that has not yet been goods issued.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000124"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->deleteA_OutbDeliveryHeader(
    "80000124",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Delivery items

<details>
<summary>listA_OutbDeliveryItems</summary>

<div>

Retrieves a collection of outbound delivery items across deliveries, with the material, plant, storage location, delivery quantity, reference sales order and picking status of each item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_OutbDeliveryItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_OutbDeliveryItemWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryItemWrapper items = check outbDelClient->listA_OutbDeliveryItems(
    queries = {
        \$filter: "Material eq 'TG11' and PickingStatus eq 'A'",
        \$select: ["DeliveryDocument", "DeliveryDocumentItem", "Material", "ActualDeliveryQuantity", "DeliveryQuantityUnit"],
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
        "DeliveryDocument": "80000124",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "3",
        "DeliveryQuantityUnit": "PC"
      },
      {
        "DeliveryDocument": "80000125",
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
<summary>getA_OutbDeliveryItem</summary>

<div>

Retrieves a single outbound delivery item. Expand `to_DocumentFlow`, `to_DeliveryDocumentItemText`, `to_SerialDeliveryItem` or `to_HandlingUnitItemDelivery` to include related data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_OutbDeliveryItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_OutbDeliveryItemWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryItemWrapper item = check outbDelClient->getA_OutbDeliveryItem(
    "80000123",
    "000010",
    queries = {
        \$select: ["DeliveryDocument", "DeliveryDocumentItem", "Material", "Plant", "StorageLocation", "ActualDeliveryQuantity", "DeliveryQuantityUnit", "PickingStatus", "GoodsMovementStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "DeliveryDocumentItem": "000010",
    "Material": "TG11",
    "Plant": "1010",
    "StorageLocation": "101A",
    "ActualDeliveryQuantity": "5",
    "DeliveryQuantityUnit": "PC",
    "PickingStatus": "C",
    "GoodsMovementStatus": "A"
  }
}
```

</div>

</details>

<details>
<summary>patchA_OutbDeliveryItem</summary>

<div>

Updates an outbound delivery item using a PATCH request, for example the delivery quantity, batch, storage location or item weights.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `payload` | `Modified\ A_OutbDeliveryItemType` | Yes | Wraps an `UpdateA_OutbDeliveryItem` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->patchA_OutbDeliveryItem(
    "80000123",
    "000010",
    {d: {StorageLocation: "101A", ItemGrossWeight: "12.500", ItemWeightUnit: "KG"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_OutbDeliveryItem</summary>

<div>

Deletes an item from an outbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000020"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->deleteA_OutbDeliveryItem(
    "80000123",
    "000020",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>listDeliveryDocumentItemsOfA_OutbDeliveryHeader</summary>

<div>

Retrieves the items of a specific outbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentItemsOfA_OutbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_OutbDeliveryItemWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryItemWrapper deliveryItems = check outbDelClient->listDeliveryDocumentItemsOfA_OutbDeliveryHeader(
    "80000123",
    queries = {
        \$select: ["DeliveryDocumentItem", "Material", "Batch", "ActualDeliveryQuantity", "DeliveryQuantityUnit"],
        \$orderby: ["DeliveryDocumentItem"]
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
        "Batch": "",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
      },
      {
        "DeliveryDocumentItem": "000020",
        "Material": "TG12",
        "Batch": "0000000017",
        "ActualDeliveryQuantity": "2",
        "DeliveryQuantityUnit": "KG"
      }
    ]
  }
}
```

</div>

</details>

#### Header texts

<details>
<summary>createA_OutbDeliveryHeaderText</summary>

<div>

Creates a text for an outbound delivery header, such as shipping instructions, in a given language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_OutbDeliveryHeaderText` | Yes | Header text with the required fields `DeliveryDocument`, `TextElement` (text ID, up to 4 characters) and `Language`, plus `TextElementText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_OutbDeliveryHeaderTextWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryHeaderTextWrapper headerText = check outbDelClient->createA_OutbDeliveryHeaderText({
    DeliveryDocument: "80000123",
    TextElement: "0001",
    Language: "EN",
    TextElementText: "Deliver to loading dock 3 between 08:00 and 12:00."
});
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "TextElement": "0001",
    "Language": "EN",
    "TextElementDescription": "Shipping instructions",
    "TextElementText": "Deliver to loading dock 3 between 08:00 and 12:00.",
    "DeliveryLongTextIsFormatted": false
  }
}
```

</div>

</details>

<details>
<summary>createDeliveryDocumentTextOfA_OutbDeliveryHeader</summary>

<div>

Creates a header text through the `to_DeliveryDocumentText` navigation of a specific outbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `payload` | `CreateA_OutbDeliveryHeaderText` | Yes | Header text with the required fields `DeliveryDocument`, `TextElement` and `Language`, plus `TextElementText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_OutbDeliveryHeaderTextWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryHeaderTextWrapper headerText = check outbDelClient->createDeliveryDocumentTextOfA_OutbDeliveryHeader(
    "80000123",
    {
        DeliveryDocument: "80000123",
        TextElement: "0002",
        Language: "EN",
        TextElementText: "Fragile goods, do not stack."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "TextElement": "0002",
    "Language": "EN",
    "TextElementText": "Fragile goods, do not stack.",
    "DeliveryLongTextIsFormatted": false
  }
}
```

</div>

</details>

<details>
<summary>listDeliveryDocumentTextsOfA_OutbDeliveryHeader</summary>

<div>

Retrieves the header texts of a specific outbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentTextsOfA_OutbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_OutbDeliveryHeaderTextWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryHeaderTextWrapper headerTexts = check outbDelClient->listDeliveryDocumentTextsOfA_OutbDeliveryHeader(
    "80000123",
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
        "DeliveryDocument": "80000123",
        "TextElement": "0001",
        "Language": "EN",
        "TextElementDescription": "Shipping instructions",
        "TextElementText": "Deliver to loading dock 3 between 08:00 and 12:00.",
        "DeliveryLongTextIsFormatted": false
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>patchA_OutbDeliveryHeaderText</summary>

<div>

Updates the content of an outbound delivery header text using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `TextElement` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `Modified\ A_OutbDeliveryHeaderTextType` | Yes | Wraps an `UpdateA_OutbDeliveryHeaderText` record (`TextElementText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->patchA_OutbDeliveryHeaderText(
    "80000123",
    "0001",
    "EN",
    {d: {TextElementText: "Deliver to loading dock 5 between 09:00 and 13:00."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_OutbDeliveryHeaderText</summary>

<div>

Deletes an outbound delivery header text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `TextElement` | `string` | Yes | Text ID (e.g., `"0002"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->deleteA_OutbDeliveryHeaderText(
    "80000123",
    "0002",
    "EN",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Item texts

<details>
<summary>createA_OutbDeliveryItemText</summary>

<div>

Creates a text for an outbound delivery item in a given language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_OutbDeliveryItemText` | Yes | Item text with the required fields `DeliveryDocument`, `DeliveryDocumentItem`, `TextElement` and `Language`, plus `TextElementText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_OutbDeliveryItemTextWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryItemTextWrapper itemText = check outbDelClient->createA_OutbDeliveryItemText({
    DeliveryDocument: "80000123",
    DeliveryDocumentItem: "000010",
    TextElement: "0001",
    Language: "EN",
    TextElementText: "Pack in anti-static bags."
});
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "DeliveryDocumentItem": "000010",
    "TextElement": "0001",
    "Language": "EN",
    "TextElementText": "Pack in anti-static bags.",
    "DeliveryLongTextIsFormatted": false
  }
}
```

</div>

</details>

<details>
<summary>createDeliveryDocumentItemTextOfA_OutbDeliveryItem</summary>

<div>

Creates an item text through the `to_DeliveryDocumentItemText` navigation of a specific outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `payload` | `CreateA_OutbDeliveryItemText` | Yes | Item text with the required fields `DeliveryDocument`, `DeliveryDocumentItem`, `TextElement` and `Language`, plus `TextElementText`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_OutbDeliveryItemTextWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryItemTextWrapper itemText = check outbDelClient->createDeliveryDocumentItemTextOfA_OutbDeliveryItem(
    "80000123",
    "000010",
    {
        DeliveryDocument: "80000123",
        DeliveryDocumentItem: "000010",
        TextElement: "0002",
        Language: "EN",
        TextElementText: "Customer part number to be printed on label."
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "DeliveryDocumentItem": "000010",
    "TextElement": "0002",
    "Language": "EN",
    "TextElementText": "Customer part number to be printed on label.",
    "DeliveryLongTextIsFormatted": false
  }
}
```

</div>

</details>

<details>
<summary>listDeliveryDocumentItemTextsOfA_OutbDeliveryItem</summary>

<div>

Retrieves the texts of a specific outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentItemTextsOfA_OutbDeliveryItemQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_OutbDeliveryItemTextWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryItemTextWrapper itemTexts = check outbDelClient->listDeliveryDocumentItemTextsOfA_OutbDeliveryItem(
    "80000123",
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
        "TextElementText": "Pack in anti-static bags."
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>patchA_OutbDeliveryItemText</summary>

<div>

Updates the content of an outbound delivery item text using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `TextElement` | `string` | Yes | Text ID (e.g., `"0001"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `payload` | `Modified\ A_OutbDeliveryItemTextType` | Yes | Wraps an `UpdateA_OutbDeliveryItemText` record (`TextElementText`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->patchA_OutbDeliveryItemText(
    "80000123",
    "000010",
    "0001",
    "EN",
    {d: {TextElementText: "Pack in anti-static bags, two per carton."}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_OutbDeliveryItemText</summary>

<div>

Deletes an outbound delivery item text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `TextElement` | `string` | Yes | Text ID (e.g., `"0002"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->deleteA_OutbDeliveryItemText(
    "80000123",
    "000010",
    "0002",
    "EN",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Partners and addresses

<details>
<summary>listDeliveryDocumentPartnersOfA_OutbDeliveryHeader</summary>

<div>

Retrieves the partners of a specific outbound delivery, such as the sold-to party (`AG`), ship-to party (`WE`) and carrier, with the customer, supplier or contact person behind each partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDeliveryDocumentPartnersOfA_OutbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$inlinecount`. |

Returns: `CollectionOfA_OutbDeliveryPartnerWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryPartnerWrapper partners = check outbDelClient->listDeliveryDocumentPartnersOfA_OutbDeliveryHeader(
    "80000123",
    queries = {
        \$select: ["SDDocument", "PartnerFunction", "Customer", "Supplier", "AddressID"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SDDocument": "80000123",
        "PartnerFunction": "AG",
        "Customer": "10100001",
        "Supplier": "",
        "AddressID": "23741"
      },
      {
        "SDDocument": "80000123",
        "PartnerFunction": "WE",
        "Customer": "10100001",
        "Supplier": "",
        "AddressID": "23741"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listA_OutbDeliveryAddress2s</summary>

<div>

Retrieves a collection of outbound delivery partner addresses, one per delivery and partner function, with name, street, city, country and communication data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_OutbDeliveryAddress2sQueries` | No | OData query parameters: `$filter`, `$select`, `$top`, `$skip`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_OutbDeliveryAddress2Wrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryAddress2Wrapper addresses = check outbDelClient->listA_OutbDeliveryAddress2s(
    queries = {
        \$filter: "DeliveryDocument eq '80000123'",
        \$select: ["DeliveryDocument", "PartnerFunction", "BusinessPartnerName1", "StreetName", "HouseNumber", "PostalCode", "CityName", "Country"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "80000123",
        "PartnerFunction": "AG",
        "BusinessPartnerName1": "Domestic Customer DE 1",
        "StreetName": "Hauptstrasse",
        "HouseNumber": "12",
        "PostalCode": "10115",
        "CityName": "Berlin",
        "Country": "DE"
      },
      {
        "DeliveryDocument": "80000123",
        "PartnerFunction": "WE",
        "BusinessPartnerName1": "Domestic Customer DE 1",
        "StreetName": "Hauptstrasse",
        "HouseNumber": "12",
        "PostalCode": "10115",
        "CityName": "Berlin",
        "Country": "DE"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_OutbDeliveryAddress2</summary>

<div>

Retrieves the address of one partner of an outbound delivery, identified by delivery number and partner function.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_OutbDeliveryAddress2Queries` | No | OData query parameters: `$select`. |

Returns: `A_OutbDeliveryAddress2Wrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryAddress2Wrapper shipToAddress = check outbDelClient->getA_OutbDeliveryAddress2(
    "80000123",
    "WE"
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "PartnerFunction": "WE",
    "AddressID": "23741",
    "BusinessPartnerName1": "Domestic Customer DE 1",
    "StreetName": "Hauptstrasse",
    "HouseNumber": "12",
    "PostalCode": "10115",
    "CityName": "Berlin",
    "Country": "DE",
    "Region": "BE",
    "PhoneNumber": "+49 30 1234567",
    "EmailAddress": "receiving@example.com",
    "TransportZone": "0000000001"
  }
}
```

</div>

</details>

<details>
<summary>patchA_OutbDeliveryAddress2</summary>

<div>

Updates the address of a partner of an outbound delivery using a PATCH request, for example to change the ship-to address for this delivery only.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"` for the ship-to party). |
| `payload` | `Modified\ A_OutbDeliveryAddress2Type` | Yes | Wraps an `UpdateA_OutbDeliveryAddress2` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->patchA_OutbDeliveryAddress2(
    "80000123",
    "WE",
    {d: {StreetName: "Industriestrasse", HouseNumber: "7", PostalCode: "10245", CityName: "Berlin"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>getAddress2OfA_OutbDeliveryPartner</summary>

<div>

Retrieves the delivery-specific address (`to_Address2`) of a specific outbound delivery partner.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"WE"`). |
| `SDDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAddress2OfA_OutbDeliveryPartnerQueries` | No | OData query parameters: `$select`. |

Returns: `A_OutbDeliveryAddress2Wrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryAddress2Wrapper partnerAddress = check outbDelClient->getAddress2OfA_OutbDeliveryPartner(
    "WE",
    "80000123",
    queries = {
        \$select: ["DeliveryDocument", "PartnerFunction", "BusinessPartnerName1", "CityName", "Country"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000123",
    "PartnerFunction": "WE",
    "BusinessPartnerName1": "Domestic Customer DE 1",
    "CityName": "Berlin",
    "Country": "DE"
  }
}
```

</div>

</details>

<details>
<summary>getAddressOfA_OutbDeliveryPartner</summary>

<div>

Retrieves the address (`to_Address`) of a specific outbound delivery partner in the `A_OutbDeliveryAddress` format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PartnerFunction` | `string` | Yes | Partner function (e.g., `"AG"` for the sold-to party). |
| `SDDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAddressOfA_OutbDeliveryPartnerQueries` | No | OData query parameters: `$select`. |

Returns: `A_OutbDeliveryAddressWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryAddressWrapper soldToAddress = check outbDelClient->getAddressOfA_OutbDeliveryPartner(
    "AG",
    "80000123"
);
```

Sample response:

```ballerina
{
  "d": {
    "AddressID": "23741",
    "BusinessPartnerName1": "Domestic Customer DE 1",
    "StreetName": "Hauptstrasse",
    "HouseNumber": "12",
    "PostalCode": "10115",
    "CityName": "Berlin",
    "Country": "DE",
    "Region": "BE",
    "CorrespondenceLanguage": "DE",
    "PhoneNumber": "+49 30 1234567"
  }
}
```

</div>

</details>

#### Document flow

<details>
<summary>listDocumentFlowsOfA_OutbDeliveryItem</summary>

<div>

Retrieves the document flow of a specific outbound delivery item, linking it to its preceding and subsequent documents (for example, the sales order item, the picking request and the goods issue material document).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDocumentFlowsOfA_OutbDeliveryItemQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_OutbDeliveryDocFlowWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_OutbDeliveryDocFlowWrapper docFlow = check outbDelClient->listDocumentFlowsOfA_OutbDeliveryItem(
    "80000123",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Deliveryversion": "",
        "PrecedingDocument": "80000123",
        "PrecedingDocumentCategory": "J",
        "PrecedingDocumentItem": "000010",
        "Subsequentdocument": "4900000317",
        "QuantityInBaseUnit": "5",
        "SubsequentDocumentItem": "000001",
        "SDFulfillmentCalculationRule": "-",
        "SubsequentDocumentCategory": "R",
        "TransferOrderInWrhsMgmtIsConfd": false
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_OutbDeliveryDocFlow</summary>

<div>

Retrieves a single document flow record by its preceding document, preceding item and subsequent document category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PrecedingDocument` | `string` | Yes | Preceding document number (e.g., `"80000123"`). |
| `PrecedingDocumentItem` | `string` | Yes | Preceding document item (e.g., `"000010"`). |
| `SubsequentDocumentCategory` | `string` | Yes | Category of the subsequent document (e.g., `"R"` for a goods movement). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_OutbDeliveryDocFlowQueries` | No | OData query parameters: `$select`. |

Returns: `A_OutbDeliveryDocFlowWrapper|error`

Sample code:

```ballerina
outbDel:A_OutbDeliveryDocFlowWrapper flowRecord = check outbDelClient->getA_OutbDeliveryDocFlow(
    "80000123",
    "000010",
    "R"
);
```

Sample response:

```ballerina
{
  "d": {
    "Deliveryversion": "",
    "PrecedingDocument": "80000123",
    "PrecedingDocumentCategory": "J",
    "PrecedingDocumentItem": "000010",
    "Subsequentdocument": "4900000317",
    "QuantityInBaseUnit": "5",
    "SubsequentDocumentItem": "000001",
    "SDFulfillmentCalculationRule": "-",
    "SubsequentDocumentCategory": "R",
    "TransferOrderInWrhsMgmtIsConfd": false
  }
}
```

</div>

</details>

<details>
<summary>patchA_OutbDeliveryDocFlow</summary>

<div>

Updates a document flow record using a PATCH request. The only updatable field is the quantity in base unit (`QuantityInBaseUnit`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `PrecedingDocument` | `string` | Yes | Preceding document number (e.g., `"80000123"`). |
| `PrecedingDocumentItem` | `string` | Yes | Preceding document item (e.g., `"000010"`). |
| `SubsequentDocumentCategory` | `string` | Yes | Category of the subsequent document (e.g., `"R"`). |
| `payload` | `Modified\ A_OutbDeliveryDocFlowType` | Yes | Wraps an `UpdateA_OutbDeliveryDocFlow` record (`QuantityInBaseUnit`) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check outbDelClient->patchA_OutbDeliveryDocFlow(
    "80000123",
    "000010",
    "R",
    {d: {QuantityInBaseUnit: "4"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Handling units

<details>
<summary>createA_HandlingUnitHeaderDelivery</summary>

<div>

Creates a handling unit (a packed unit such as a carton or pallet, made of a packaging material and its contents) for an outbound delivery. Handling unit items can be created in the same request through the nested `to_HandlingUnitItemDelivery` field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_HandlingUnitHeaderDelivery` | Yes | Handling unit header data. `HandlingUnitInternalId` is a required field of the record type; the sample passes an empty string and reads the internal ID SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_HandlingUnitHeaderDeliveryWrapper|error`

Sample code:

```ballerina
outbDel:A_HandlingUnitHeaderDeliveryWrapper handlingUnit = check outbDelClient->createA_HandlingUnitHeaderDelivery({
    HandlingUnitInternalId: "",
    DeliveryDocument: "80000123",
    PackagingMaterial: "PALLET-EU"
});
```

Sample response:

```ballerina
{
  "d": {
    "HandlingUnitInternalId": "1000000045",
    "HandlingUnitExternalId": "1000000045",
    "DeliveryDocument": "80000123",
    "PackagingMaterial": "PALLET-EU",
    "PackagingMaterialType": "VERP",
    "ShippingPoint": "1010",
    "GrossWeight": "25.000",
    "NetWeight": "0.000",
    "WeightUnit": "KG",
    "HandlingUnitTareWeight": "25.000",
    "HandlingUnitTareWeightUnit": "KG"
  }
}
```

</div>

</details>

<details>
<summary>createA_HandlingUnitItemDelivery</summary>

<div>

Creates a handling unit item, which packs a quantity of a delivery item into an existing handling unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_HandlingUnitItemDelivery` | Yes | Handling unit item data with the required field `HandlingUnitInternalId` (the handling unit to pack into), plus the delivery item and quantity to pack. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_HandlingUnitItemDeliveryWrapper|error`

Sample code:

```ballerina
outbDel:A_HandlingUnitItemDeliveryWrapper huItem = check outbDelClient->createA_HandlingUnitItemDelivery({
    HandlingUnitInternalId: "1000000045",
    DeliveryDocument: "80000123",
    DeliveryDocumentItem: "000010",
    HandlingUnitQuantity: "5",
    HandlingUnitQuantityUnit: "PC"
});
```

Sample response:

```ballerina
{
  "d": {
    "HandlingUnitInternalId": "1000000045",
    "HandlingUnitItem": "000001",
    "HandlingUnitExternalId": "1000000045",
    "DeliveryDocument": "80000123",
    "DeliveryDocumentItem": "000010",
    "Material": "TG11",
    "MaterialName": "Trading good 11",
    "HandlingUnitQuantity": "5",
    "HandlingUnitQuantityUnit": "PC",
    "HandlingUnitTypeOfContent": "1"
  }
}
```

</div>

</details>

<details>
<summary>listHandlingUnitHeaderDeliveriesOfA_OutbDeliveryHeader</summary>

<div>

Retrieves the handling units packed for a specific outbound delivery. Expand `to_HandlingUnitItemDelivery` to include the packed items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListHandlingUnitHeaderDeliveriesOfA_OutbDeliveryHeaderQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$inlinecount`, `search`. |

Returns: `CollectionOfA_HandlingUnitHeaderDeliveryWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_HandlingUnitHeaderDeliveryWrapper handlingUnits = check outbDelClient->listHandlingUnitHeaderDeliveriesOfA_OutbDeliveryHeader(
    "80000123",
    queries = {
        \$select: ["HandlingUnitExternalId", "PackagingMaterial", "GrossWeight", "WeightUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "HandlingUnitExternalId": "1000000045",
        "PackagingMaterial": "PALLET-EU",
        "GrossWeight": "37.500",
        "WeightUnit": "KG"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createAssignHandlingUnitToDelivery</summary>

<div>

Assigns an existing handling unit, identified by its external ID, to an outbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateAssignHandlingUnitToDeliveryQueries` | Yes | Function import parameters: `DeliveryDocument` and `HandlingUnitExternalId`, each enclosed in single quotes. |

Returns: `HuReturn_2|error`

Sample code:

```ballerina
outbDel:HuReturn_2 assignResult = check outbDelClient->createAssignHandlingUnitToDelivery(
    queries = {
        DeliveryDocument: "'80000123'",
        HandlingUnitExternalId: "'1000000046'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "AssignHandlingUnitToDelivery": {
      "SystemMessageIdentification": "",
      "SystemMessageNumber": "000",
      "SystemMessageType": "",
      "SystemMessageVariable1": "",
      "SystemMessageVariable2": "",
      "SystemMessageVariable3": "",
      "SystemMessageVariable4": "",
      "DeliveryDocument": "80000123"
    }
  }
}
```

</div>

</details>

<details>
<summary>createDeleteAllHandlingUnitsFromDelivery</summary>

<div>

Removes all handling units from an outbound delivery, for example to repack it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateDeleteAllHandlingUnitsFromDeliveryQueries` | Yes | Function import parameter: `DeliveryDocument`, enclosed in single quotes. |

Returns: `HuReturn_1|error`

Sample code:

```ballerina
outbDel:HuReturn_1 deleteResult = check outbDelClient->createDeleteAllHandlingUnitsFromDelivery(
    queries = {
        DeliveryDocument: "'80000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "DeleteAllHandlingUnitsFromDelivery": {
      "SystemMessageIdentification": "",
      "SystemMessageNumber": "000",
      "SystemMessageType": "",
      "SystemMessageVariable1": "",
      "SystemMessageVariable2": "",
      "SystemMessageVariable3": "",
      "SystemMessageVariable4": "",
      "DeliveryDocument": "80000123"
    }
  }
}
```

</div>

</details>

#### Serial numbers

<details>
<summary>getSerialDeliveryItemOfA_OutbDeliveryItem</summary>

<div>

Retrieves the serial number list header (maintenance item object list) of a specific outbound delivery item. Expand `to_MaintenanceItemObject` to include the serial numbers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000123"`). |
| `DeliveryDocumentItem` | `string` | Yes | Delivery item number (e.g., `"000010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSerialDeliveryItemOfA_OutbDeliveryItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_SerialNmbrDeliveryWrapper|error`

Sample code:

```ballerina
outbDel:A_SerialNmbrDeliveryWrapper serialList = check outbDelClient->getSerialDeliveryItemOfA_OutbDeliveryItem(
    "80000123",
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
    "DeliveryDocument": "80000123",
    "DeliveryDocumentItem": "000010",
    "MaintenanceItemObjectList": "4711",
    "SDDocumentCategory": "J",
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
<summary>listMaintenanceItemObjectsOfA_SerialNmbrDelivery</summary>

<div>

Retrieves the serial numbers (maintenance item objects) of a serial number list, with the material and equipment of each serialized item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `MaintenanceItemObjectList` | `string` | Yes | Object list number (e.g., `"4711"`), as returned by `getSerialDeliveryItemOfA_OutbDeliveryItem`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListMaintenanceItemObjectsOfA_SerialNmbrDeliveryQueries` | No | OData query parameters: `$filter`, `$select`, `$inlinecount`. |

Returns: `CollectionOfA_MaintenanceItemObjectWrapper|error`

Sample code:

```ballerina
outbDel:CollectionOfA_MaintenanceItemObjectWrapper serials = check outbDelClient->listMaintenanceItemObjectsOfA_SerialNmbrDelivery(
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

Adds a serial number to an outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateAddSerialNumberToDeliveryItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `SerialNumber`, each enclosed in single quotes. |

Returns: `AddSerialNumberToDeliveryItemWrapper|error`

Sample code:

```ballerina
outbDel:AddSerialNumberToDeliveryItemWrapper addResult = check outbDelClient->createAddSerialNumberToDeliveryItem(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
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

Removes a single serial number from an outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateDeleteSerialNumberFromDeliveryItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `SerialNumber`, each enclosed in single quotes. |

Returns: `DeleteSerialNumberFromDeliveryItemWrapper|error`

Sample code:

```ballerina
outbDel:DeleteSerialNumberFromDeliveryItemWrapper removeResult = check outbDelClient->createDeleteSerialNumberFromDeliveryItem(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11"
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

Removes all serial numbers from an outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateDeleteAllSerialNumbersFromDeliveryItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem`, each enclosed in single quotes. |

Returns: `DeleteAllSerialNumbersFromDeliveryItemWrapper|error`

Sample code:

```ballerina
outbDel:DeleteAllSerialNumbersFromDeliveryItemWrapper removeAllResult = check outbDelClient->createDeleteAllSerialNumbersFromDeliveryItem(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11"
      }
    ]
  }
}
```

</div>

</details>

#### Picking

<details>
<summary>createPickAllItems</summary>

<div>

Takes over the delivery quantity as the picked quantity for all items of an outbound delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePickAllItemsQueries` | Yes | Function import parameter: `DeliveryDocument`, enclosed in single quotes. |

Returns: `PickAllItemsWrapper|error`

Sample code:

```ballerina
outbDel:PickAllItemsWrapper pickResult = check outbDelClient->createPickAllItems(
    queries = {
        DeliveryDocument: "'80000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "Batch": "",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPickOneItem</summary>

<div>

Takes over the delivery quantity as the picked quantity for a single outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePickOneItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem`, each enclosed in single quotes. |

Returns: `PickOneItemWrapper|error`

Sample code:

```ballerina
outbDel:PickOneItemWrapper pickResult = check outbDelClient->createPickOneItem(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPickOneItemWithBaseQuantity</summary>

<div>

Sets both the picked quantity and the delivery quantity of an outbound delivery item, given in the base unit of measure.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePickOneItemWithBaseQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `BaseUnit` enclosed in single quotes, and `ActualDeliveredQtyInBaseUnit` suffixed with `M`. |

Returns: `PickOneItemWithBaseQuantityWrapper|error`

Sample code:

```ballerina
outbDel:PickOneItemWithBaseQuantityWrapper pickResult = check outbDelClient->createPickOneItemWithBaseQuantity(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "4",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createPickOneItemWithSalesQuantity</summary>

<div>

Sets both the picked quantity and the delivery quantity of an outbound delivery item, given in the sales unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePickOneItemWithSalesQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `DeliveryQuantityUnit` enclosed in single quotes, and `ActualDeliveryQuantity` suffixed with `M`. |

Returns: `PickOneItemWithSalesQuantityWrapper|error`

Sample code:

```ballerina
outbDel:PickOneItemWithSalesQuantityWrapper pickResult = check outbDelClient->createPickOneItemWithSalesQuantity(
    queries = {
        DeliveryDocument: "'80000123'",
        DeliveryDocumentItem: "'000010'",
        ActualDeliveryQuantity: "5M",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSetPickingQuantityWithBaseQuantity</summary>

<div>

Sets only the picked quantity of an outbound delivery item, given in the base unit of measure, without changing the delivery quantity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateSetPickingQuantityWithBaseQuantityQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem` and `BaseUnit` enclosed in single quotes, and `ActualDeliveredQtyInBaseUnit` suffixed with `M`. |

Returns: `SetPickingQuantityWithBaseQuantityWrapper|error`

Sample code:

```ballerina
outbDel:SetPickingQuantityWithBaseQuantityWrapper pickResult = check outbDelClient->createSetPickingQuantityWithBaseQuantity(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createConfirmPickingAllItems</summary>

<div>

Confirms the picked quantity of all items of an outbound delivery, for deliveries that require picking confirmation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateConfirmPickingAllItemsQueries` | Yes | Function import parameter: `DeliveryDocument`, enclosed in single quotes. |

Returns: `ConfirmPickingAllItemsWrapper|error`

Sample code:

```ballerina
outbDel:ConfirmPickingAllItemsWrapper confirmResult = check outbDelClient->createConfirmPickingAllItems(
    queries = {
        DeliveryDocument: "'80000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createConfirmPickingOneItem</summary>

<div>

Confirms the picked quantity of a single outbound delivery item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateConfirmPickingOneItemQueries` | Yes | Function import parameters: `DeliveryDocument` and `DeliveryDocumentItem`, each enclosed in single quotes. |

Returns: `ConfirmPickingOneItemWrapper|error`

Sample code:

```ballerina
outbDel:ConfirmPickingOneItemWrapper confirmResult = check outbDelClient->createConfirmPickingOneItem(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11"
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

Creates a batch split item below an outbound delivery item, assigning a quantity of a specific batch. Optionally sets the picked quantity of the new item in the same call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCreateBatchSplitItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem`, `Batch` and `DeliveryQuantityUnit` enclosed in single quotes, `ActualDeliveryQuantity` suffixed with `M`, and the optional `PickQuantityInSalesUOM` suffixed with `M`. |

Returns: `CreatedDeliveryItem_1|error`

Sample code:

```ballerina
outbDel:CreatedDeliveryItem_1 splitItem = check outbDelClient->createCreateBatchSplitItem(
    queries = {
        DeliveryDocument: "'80000123'",
        DeliveryDocumentItem: "'000020'",
        Batch: "'0000000017'",
        ActualDeliveryQuantity: "1.5M",
        PickQuantityInSalesUOM: "1.5M",
        DeliveryQuantityUnit: "'KG'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CreateBatchSplitItem": {
      "DeliveryDocument": "80000123",
      "DeliveryDocumentItem": "900001"
    }
  }
}
```

</div>

</details>

<details>
<summary>createPickAndBatchSplitOneItem</summary>

<div>

Performs a batch split for an outbound delivery item and sets the picked quantity of the split item in one step.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePickAndBatchSplitOneItemQueries` | Yes | Function import parameters: `DeliveryDocument`, `DeliveryDocumentItem`, `Batch` and `SplitQuantityUnit` enclosed in single quotes, and `SplitQuantity` suffixed with `M`. |

Returns: `PickAndBatchSplitOneItemWrapper|error`

Sample code:

```ballerina
outbDel:PickAndBatchSplitOneItemWrapper splitResult = check outbDelClient->createPickAndBatchSplitOneItem(
    queries = {
        DeliveryDocument: "'80000123'",
        DeliveryDocumentItem: "'000020'",
        Batch: "'0000000018'",
        SplitQuantity: "0.5M",
        SplitQuantityUnit: "'KG'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "900002",
        "Material": "TG12",
        "Batch": "0000000018",
        "ActualDeliveryQuantity": "0.5",
        "DeliveryQuantityUnit": "KG"
      }
    ]
  }
}
```

</div>

</details>

#### Goods issue

<details>
<summary>createPostGoodsIssue</summary>

<div>

Posts the goods issue for an outbound delivery, reducing the warehouse stock and creating the material document. All items must be fully picked first.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreatePostGoodsIssueQueries` | Yes | Function import parameter: `DeliveryDocument`, enclosed in single quotes. |

Returns: `PostGoodsIssueWrapper|error`

Sample code:

```ballerina
outbDel:PostGoodsIssueWrapper goodsIssue = check outbDelClient->createPostGoodsIssue(
    queries = {
        DeliveryDocument: "'80000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SystemMessageIdentification": "",
        "SystemMessageNumber": "000",
        "SystemMessageType": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000010",
        "Material": "TG11",
        "ActualDeliveryQuantity": "5",
        "DeliveryQuantityUnit": "PC"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createReverseGoodsIssue</summary>

<div>

Reverses the goods issue of an outbound delivery, posting the reversal with the given actual goods movement date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateReverseGoodsIssueQueries` | Yes | Function import parameters: `DeliveryDocument` enclosed in single quotes, and `ActualGoodsMovementDate` as `datetime'YYYY-MM-DDT00:00'`. |

Returns: `ReverseGoodsIssueWrapper|error`

Sample code:

```ballerina
outbDel:ReverseGoodsIssueWrapper reversal = check outbDelClient->createReverseGoodsIssue(
    queries = {
        DeliveryDocument: "'80000123'",
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
        "CollectiveProcessing": "",
        "DeliveryDocument": "80000123",
        "DeliveryDocumentItem": "000000",
        "ScheduleLine": "0000",
        "CollectiveProcessingMsgCounter": "000000",
        "SystemMessageIdentification": "VLA",
        "SystemMessageNumber": "311",
        "SystemMessageType": "S",
        "SystemMessageVariable1": "80000123",
        "SystemMessageVariable2": "",
        "SystemMessageVariable3": "",
        "SystemMessageVariable4": "",
        "CollectiveProcessingType": ""
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
string boundary = "batch_od001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_OutbDeliveryHeader('80000123') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_OutbDeliveryHeader('80000123')/to_DeliveryDocumentItem HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check outbDelClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</div>

</details>
