---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.salesarea_0001` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Retrieves SAP Sales Area master data via the SAP S/4HANA OData API. |

---

## Client

Retrieves SAP Sales Area master data via the SAP S/4HANA OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | HTTP Basic Authentication credentials; provide `username` and `password` of the SAP technical user. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `http1Settings` | `ClientHttp1Settings` | `()` | HTTP/1.x client settings including keep-alive and chunking. |
| `http2Settings` | `http:ClientHttp2Settings` | `()` | HTTP/2 client settings. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Whether to forward `X-Forwarded-*` headers. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for transient failures. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | HTTP proxy configuration. |
| `validation` | `boolean` | `true` | Enable or disable response payload validation. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.salesarea_0001 as salesarea;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

salesarea:Client salesareaClient = check new (
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

#### Sales area retrieval

<details>
<summary>listSalesAreas</summary>

Retrieves a collection of all Sales Area records, with optional OData query parameters for filtering, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the request. |
| `queries` | `ListSalesAreasQueries` | No | OData query options: `$skip` (int), `$top` (int), `$filter` (string), `$orderby` (SalesAreaOrderByOptions), `$count` (boolean), `$select` (SalesAreaSelectOptions).
 |

Returns: `CollectionOfSalesArea|error`

Sample code:

```ballerina
salesarea:CollectionOfSalesArea result = check salesareaClient->listSalesAreas(
    queries = {"\$top": "10", "\$filter": "SalesOrganization eq '1000'", "\$count": "true"}
);
```

Sample response:

```ballerina
{
  "@odata.count": 3,
  "value": [
    {
      "SalesOrganization": "1000",
      "DistributionChannel": "10",
      "Division": "00"
    },
    {
      "SalesOrganization": "1000",
      "DistributionChannel": "10",
      "Division": "01"
    },
    {
      "SalesOrganization": "1000",
      "DistributionChannel": "20",
      "Division": "00"
    }
  ]
}
```

</details>

<details>
<summary>getSalesArea</summary>

Retrieves a single Sales Area record identified by its composite key: Sales Organization, Distribution Channel, and Division.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrganization` | `string` | Yes | The Sales Organization code (up to 4 characters, e.g., `"1000"`). |
| `DistributionChannel` | `string` | Yes | The Distribution Channel code (up to 2 characters, e.g., `"10"`). |
| `Division` | `string` | Yes | The Division code (up to 2 characters, e.g., `"00"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the request. |
| `queries` | `GetSalesAreaQueries` | No | OData query options: `$select` to limit returned fields. |

Returns: `SalesArea|error`

Sample code:

```ballerina
salesarea:SalesArea salesArea = check salesareaClient->getSalesArea(
    "1000",
    "10",
    "00"
);
```

Sample response:

```ballerina
{
  "SalesOrganization": "1000",
  "DistributionChannel": "10",
  "Division": "00"
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Executes an OData batch request, allowing multiple read operations to be combined into a single HTTP call for improved efficiency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the multipart OData batch body with individual operations. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP headers to include in the batch request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string batchBody = string `--batch_1
Content-Type: application/http
Content-Transfer-Encoding: binary

GET SalesArea('1000','10','00') HTTP/1.1

--batch_1--`;
batchRequest.setPayload(batchBody, "multipart/mixed;boundary=batch_1");
http:Response batchResponse = check salesareaClient->performBatchOperation(batchRequest);
```

Sample response:

```ballerina
--batchresponse_abc123
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json

{"SalesOrganization":"1000","DistributionChannel":"10","Division":"00"}
--batchresponse_abc123--
```

</details>
