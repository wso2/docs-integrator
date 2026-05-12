---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_sales_order_simulation_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Simulates SAP S/4HANA sales order creation and manages associated value-added services, returning pricing, availability, and credit information without persisting any data. |

---

## Client

Simulates SAP S/4HANA sales order creation and manages associated value-added services, returning pricing, availability, and credit information without persisting any data.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration: Basic credentials, Bearer token, or OAuth 2.0 refresh token grant. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for transient request failures. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_sales_order_simulation_srv as salesOrderSim;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

salesOrderSim:Client simClient = check new (
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

#### Sales order simulation

<details>
<summary>createA_SalesOrderSimulation</summary>

Simulates the creation of a sales order and returns pricing details, material availability (confirmed schedule lines), and customer credit limit status. The simulated order is never saved to SAP S/4HANA.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SalesOrderSimulation` | Yes | Sales order header and item data to simulate. Includes sales organization, distribution channel, sold-to party, transaction currency, and optional navigation properties for items (`to_Item`), partners (`to_Partner`), and pricing elements (`to_PricingElement`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the request. |

Returns: `A_SalesOrderSimulationWrapper|error`

Sample code:

```ballerina
salesOrderSim:A_SalesOrderSimulationWrapper result = check simClient->createA_SalesOrderSimulation({
    SalesOrder: "0000000001",
    SalesOrderType: "OR",
    SalesOrganization: "1010",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "10100001",
    TransactionCurrency: "USD",
    to_Item: {
        results: [
            {
                SalesOrderItem: "000010",
                Material: "MZ-FG-M502",
                RequestedQuantity: "10",
                RequestedQuantityUnit: "EA",
                Plant: "1010"
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "0000000001",
    "SalesOrderType": "OR",
    "SalesOrganization": "1010",
    "DistributionChannel": "10",
    "SoldToParty": "10100001",
    "TransactionCurrency": "USD",
    "to_Pricing": {
      "SalesOrder": "0000000001",
      "TotalNetAmount": "1500.00",
      "TransactionCurrency": "USD"
    },
    "to_Credit": {
      "SalesOrder": "0000000001",
      "TotalCreditCheckStatus": "D"
    },
    "to_Item": {
      "results": [
        {
          "SalesOrder": "0000000001",
          "SalesOrderItem": "000010",
          "Material": "MZ-FG-M502",
          "RequestedQuantity": "10",
          "RequestedQuantityUnit": "EA",
          "NetAmount": "1500.00",
          "to_ScheduleLine": {
            "results": [
              {
                "ScheduleLine": "0001",
                "ConfirmedDeliveryDate": "2024-12-15",
                "ScheduleLineOrderQuantity": "10",
                "ConfdOrderQtyByMatlAvailCheck": "10"
              }
            ]
          }
        }
      ]
    }
  }
}
```

</details>

#### Value-Added services

<details>
<summary>listA_SlsOrdSimlnValAddedSrvcs</summary>

Retrieves a collection of value-added service entities associated with simulated sales order items, with optional OData filtering and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the request. |
| `queries` | `ListA_SlsOrdSimlnValAddedSrvcsQueries` | No | OData query options passed as an included record parameter. Supports `$filter`, `$top`, `$skip`, `$orderby`, `$select`, and `$inlinecount`. |

Returns: `CollectionOfA_SlsOrdSimlnValAddedSrvcWrapper|error`

Sample code:

```ballerina
salesOrderSim:CollectionOfA_SlsOrdSimlnValAddedSrvcWrapper result = check simClient->listA_SlsOrdSimlnValAddedSrvcs();
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ValueAddedServiceType": "01",
        "ValueAddedSubServiceType": "00001",
        "SalesOrder": "0000000001",
        "SalesOrderItem": "000010",
        "ValueAddedServiceProduct": "PACK_SERVICE",
        "ValAddedSrvcHasToBeOrdered": true,
        "ValueAddedServiceChargeCode": "PACK",
        "ValueAddedServiceText1": "Special packaging required"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SlsOrdSimlnValAddedSrvc</summary>

Retrieves a single value-added service entity by its composite key (service type, sub-service type, sales order, and item).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ValueAddedServiceType` | `string` | Yes | VAS service type code (max 2 characters). |
| `ValueAddedSubServiceType` | `string` | Yes | VAS sub-service type code (max 5 characters). |
| `SalesOrder` | `string` | Yes | Sales order number (max 10 characters). |
| `SalesOrderItem` | `string` | Yes | Sales order item number (max 6 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the request. |
| `queries` | `GetA_SlsOrdSimlnValAddedSrvcQueries` | No | OData `$select` query option to limit returned fields. |

Returns: `A_SlsOrdSimlnValAddedSrvcWrapper|error`

Sample code:

```ballerina
salesOrderSim:A_SlsOrdSimlnValAddedSrvcWrapper result = check simClient->getA_SlsOrdSimlnValAddedSrvc(
    "01",
    "00001",
    "0000000001",
    "000010"
);
```

Sample response:

```ballerina
{
  "d": {
    "ValueAddedServiceType": "01",
    "ValueAddedSubServiceType": "00001",
    "SalesOrder": "0000000001",
    "SalesOrderItem": "000010",
    "ValueAddedServiceProduct": "PACK_SERVICE",
    "ValAddedSrvcHasToBeOrdered": true,
    "ValueAddedServiceChargeCode": "PACK",
    "ValAddedSrvcIsCreatedManually": "X",
    "ValueAddedServiceText1": "Special packaging required"
  }
}
```

</details>

<details>
<summary>createA_SlsOrdSimlnValAddedSrvc</summary>

Adds a new value-added service entity to a simulated sales order item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SlsOrdSimlnValAddedSrvc` | Yes | Value-added service data. The `ValueAddedServiceType`, `ValueAddedSubServiceType`, `SalesOrder`, and `SalesOrderItem` fields are required; all other fields are optional. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the request. |

Returns: `A_SlsOrdSimlnValAddedSrvcWrapper|error`

Sample code:

```ballerina
salesOrderSim:A_SlsOrdSimlnValAddedSrvcWrapper result = check simClient->createA_SlsOrdSimlnValAddedSrvc({
    ValueAddedServiceType: "01",
    ValueAddedSubServiceType: "00001",
    SalesOrder: "0000000001",
    SalesOrderItem: "000010",
    ValueAddedServiceProduct: "PACK_SERVICE",
    ValAddedSrvcHasToBeOrdered: true,
    ValueAddedServiceText1: "Fragile, handle with care"
});
```

Sample response:

```ballerina
{
  "d": {
    "ValueAddedServiceType": "01",
    "ValueAddedSubServiceType": "00001",
    "SalesOrder": "0000000001",
    "SalesOrderItem": "000010",
    "ValueAddedServiceProduct": "PACK_SERVICE",
    "ValAddedSrvcHasToBeOrdered": true,
    "ValueAddedServiceText1": "Fragile, handle with care"
  }
}
```

</details>

<details>
<summary>patchA_SlsOrdSimlnValAddedSrvc</summary>

Updates specific fields of an existing value-added service entity using PATCH (partial update) semantics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ValueAddedServiceType` | `string` | Yes | VAS service type code. |
| `ValueAddedSubServiceType` | `string` | Yes | VAS sub-service type code. |
| `SalesOrder` | `string` | Yes | Sales order number. |
| `SalesOrderItem` | `string` | Yes | Sales order item number. |
| `payload` | `ModifiedA_SlsOrdSimlnValAddedSrvcType` | Yes | Wrapper record containing an `UpdateA_SlsOrdSimlnValAddedSrvc` value in its `d` field. Only the fields present in the payload are updated. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check simClient->patchA_SlsOrdSimlnValAddedSrvc(
    "01",
    "00001",
    "0000000001",
    "000010",
    {
        d: {
            ValueAddedServiceText1: "Priority packaging, expedite",
            ValAddedSrvcHasToBeOrdered: true
        }
    }
);
```

Sample response:

```ballerina
HTTP/1.1 204 No Content
```

</details>

<details>
<summary>deleteA_SlsOrdSimlnValAddedSrvc</summary>

Deletes a value-added service entity identified by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ValueAddedServiceType` | `string` | Yes | VAS service type code. |
| `ValueAddedSubServiceType` | `string` | Yes | VAS sub-service type code. |
| `SalesOrder` | `string` | Yes | Sales order number. |
| `SalesOrderItem` | `string` | Yes | Sales order item number. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check simClient->deleteA_SlsOrdSimlnValAddedSrvc(
    "01",
    "00001",
    "0000000001",
    "000010"
);
```

Sample response:

```ballerina
HTTP/1.1 204 No Content
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends a group of OData requests in a single HTTP batch call using the `$batch` endpoint, reducing round-trips when multiple operations need to be executed together.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An HTTP request with `multipart/mixed` content type containing individual OData requests formatted per the OData batch specification. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include with the batch request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
batchRequest.setHeader("Content-Type", "multipart/mixed;boundary=batch_001");
batchRequest.setTextPayload(
    "--batch_001\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_SlsOrdSimlnValAddedSrvc HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--batch_001--"
);
http:Response batchResponse = check simClient->performBatchOperation(batchRequest);
```

Sample response:

```ballerina
HTTP/1.1 200 OK
Content-Type: multipart/mixed; boundary=batchresponse_abc123

--batchresponse_abc123
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json

{"d":{"results":[]}}
--batchresponse_abc123--
```

</details>
