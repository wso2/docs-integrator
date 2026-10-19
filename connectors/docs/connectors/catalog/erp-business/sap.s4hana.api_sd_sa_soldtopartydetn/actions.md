---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_sd_sa_soldtopartydetn` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to sold-to party determination records for sales scheduling agreements in SAP S/4HANA. |

---

## Client

Provides access to sold-to party determination records for sales scheduling agreements in SAP S/4HANA.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | HTTP Basic Auth credentials containing `username` and `password` for the SAP inbound communication user. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `http1Settings` | `ClientHttp1Settings` | `()` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `http2Settings` | `http:ClientHttp2Settings` | `()` | HTTP/2 client settings. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Forwarded header handling configuration. |
| `poolConfig` | `http:PoolConfiguration` | `()` | HTTP connection pool configuration. |
| `cache` | `http:CacheConfig` | `()` | HTTP response caching configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Compression setting for requests and responses. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `responseLimits` | `http:ResponseLimitConfigs` | `()` | Response size limit configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | HTTP proxy server configuration. |
| `validation` | `boolean` | `true` | Enable or disable response payload validation. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_sd_sa_soldtopartydetn as soldToParty;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

soldToParty:Client sapClient = check new (
    {auth: {username, password}},
    hostname
);
```

### Operations

#### Sold-to party determination

<details>
<summary>listA_DelivSchedSoldToPartyDetns</summary>

Retrieves a collection of all delivery scheduling sold-to party determination records, with optional OData query parameters for filtering, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the request. |
| `queries` | `ListA_DelivSchedSoldToPartyDetnsQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_DelivSchedSoldToPartyDetnWrapper|error`

Sample code:

```ballerina
soldToParty:CollectionOfA_DelivSchedSoldToPartyDetnWrapper result =
    check sapClient->listA_DelivSchedSoldToPartyDetns(
        queries = {"\$top": "10", "\$filter": "Supplier eq 'VENDOR001'", "\$select": "Supplier,PartnerDescription,SoldToParty"}
    );
```

Sample response:

```ballerina
{
  "d": {
    "__count": "2",
    "results": [
      {
        "Supplier": "VENDOR001",
        "PartnerDescription": "Main Warehouse",
        "UnloadingPointName": "Dock A",
        "SoldToParty": "CUST1000"
      },
      {
        "Supplier": "VENDOR001",
        "PartnerDescription": "Secondary Depot",
        "UnloadingPointName": "Dock B",
        "SoldToParty": "CUST1001"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_DelivSchedSoldToPartyDetn</summary>

Retrieves a specific sold-to party determination record by its composite key consisting of Supplier, PartnerDescription, and UnloadingPointName.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Supplier` | `string` | Yes | The supplier number at the customer location (max 17 characters). |
| `PartnerDescription` | `string` | Yes | The customer-specific description of the business partner (max 30 characters). |
| `UnloadingPointName` | `string` | Yes | The unloading point name at the customer site (max 25 characters). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the request. |
| `queries` | `GetA_DelivSchedSoldToPartyDetnQueries` | No | OData query options: `$select` to limit returned fields. |

Returns: `A_DelivSchedSoldToPartyDetnWrapper|error`

Sample code:

```ballerina
soldToParty:A_DelivSchedSoldToPartyDetnWrapper result =
    check sapClient->getA_DelivSchedSoldToPartyDetn(
        "VENDOR001",
        "Main Warehouse",
        "Dock A"
    );
```

Sample response:

```ballerina
{
  "d": {
    "Supplier": "VENDOR001",
    "PartnerDescription": "Main Warehouse",
    "UnloadingPointName": "Dock A",
    "SoldToParty": "CUST1000"
  }
}
```

</details>

<details>
<summary>performBatchOperation</summary>

Sends a grouped OData batch HTTP request to execute multiple operations in a single round-trip to the SAP S/4HANA server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the multipart batch body formatted according to OData batch request conventions. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the batch request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
batchRequest.setHeader("Content-Type", "multipart/mixed;boundary=batch_001");
batchRequest.setTextPayload(
    "--batch_001\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_DelivSchedSoldToPartyDetn HTTP/1.1\r\n\r\n" +
    "--batch_001--"
);
http:Response batchResponse = check sapClient->performBatchOperation(batchRequest);
```

Sample response:

```ballerina
HTTP/1.1 200 OK
Content-Type: multipart/mixed; boundary=response_boundary

--response_boundary
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json

{"d":{"results":[{"Supplier":"VENDOR001","PartnerDescription":"Vendor 001","SoldToParty":"CUST001"}]}}
--response_boundary--
```

</details>
