---
title: Actions
---

# Actions

The `ballerinax/sap` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | HTTP client for SAP APIs with built-in CSRF token authentication. |

---

## Client

HTTP client for SAP APIs with built-in CSRF token authentication.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `CredentialsConfig\|BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|...` | Required | Authentication configuration. Supports Basic Auth (username/password), Bearer Token, or OAuth 2.0 grants. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version used by the client. |
| `timeout` | `decimal` | `60` | Maximum time to wait (in seconds) for a response before closing the connection. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `cache` | `CacheConfig` | `{}` | HTTP caching configuration. |
| `compression` | `Compression` | `COMPRESSION_AUTO` | Specifies the way of handling the `Accept-Encoding` header. |
| `forwarded` | `string` | `"disable"` | Configuration for the `Forwarded`/`X-Forwarded` header handling. |
| `poolConfig` | `PoolConfiguration` | `()` | Connection pool configuration. |
| `validation` | `boolean` | `true` | Enables inbound payload validation provided by the constraint package. |

### Initializing the client

```ballerina
import ballerinax/sap;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

sap:Client sapClient = check new (string `https://${hostname}/sap/opu/odata/sap/API_SALES_ORDER_SRV`, {
    auth: {
        username,
        password
    }
});
```

### Operations

#### Read operations

<details>
<summary>get</summary>

Sends an HTTP GET request to the specified SAP API path. Used to retrieve data such as entity collections or individual records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path relative to the base URL (e.g., `"/A_SalesOrder"`). |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `targetType` | `typedesc` | No | Expected return type for data binding. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
json salesOrders = check sapClient->get("/A_SalesOrder");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "1000000",
        "SalesOrderType": "OR",
        "SalesOrganization": "1710",
        "SoldToParty": "17100001",
        "OverallSDProcessStatus": "C"
      }
    ]
  }
}
```

</details>

<details>
<summary>head</summary>

Sends an HTTP HEAD request to the specified SAP API path. Returns only headers, useful for checking resource existence or metadata.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |

Returns: `http:Response|ClientError`

Sample code:

```ballerina
http:Response headResponse = check sapClient->head("/A_SalesOrder('1000000')");
int statusCode = headResponse.statusCode;
```

</details>

<details>
<summary>options</summary>

Sends an HTTP OPTIONS request to discover the allowed methods and capabilities of the target SAP API endpoint.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `targetType` | `typedesc` | No | Expected return type. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
http:Response optionsResponse = check sapClient->options("/A_SalesOrder");
string? allowedMethods = check optionsResponse.getHeader("Allow");
```

</details>

#### Create operations

<details>
<summary>post</summary>

Sends an HTTP POST request to the specified SAP API path. Used to create new entities. CSRF token is automatically fetched and included.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path (e.g., `"/A_SalesOrder"`). |
| `message` | `RequestMessage` | Yes | The request payload; can be `json`, `xml`, `string`, `byte[]`, or `http:Request`. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `mediaType` | `string?` | No | MIME type of the request entity. |
| `targetType` | `typedesc` | No | Expected return type. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
json newOrder = {
    SalesOrderType: "OR",
    SalesOrganization: "1710",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "17100001"
};
json createdOrder = check sapClient->post("/A_SalesOrder", newOrder);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "1000042",
    "SalesOrderType": "OR",
    "SalesOrganization": "1710",
    "DistributionChannel": "10",
    "SoldToParty": "17100001"
  }
}
```

</details>

#### Update operations

<details>
<summary>put</summary>

Sends an HTTP PUT request to the specified SAP API path. Used to fully replace an existing entity. CSRF token is automatically included.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path including the entity key (e.g., `"/A_SalesOrder('1000000')"`). |
| `message` | `RequestMessage` | Yes | The full replacement payload. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `mediaType` | `string?` | No | MIME type of the request entity. |
| `targetType` | `typedesc` | No | Expected return type. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
json updatedOrder = {
    SalesOrderType: "OR",
    SalesOrganization: "1710",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "17100001",
    PurchaseOrderByCustomer: "PO-12345"
};
http:Response putResponse = check sapClient->put("/A_SalesOrder('1000042')", updatedOrder);
```

</details>

<details>
<summary>patch</summary>

Sends an HTTP PATCH request to the specified SAP API path. Used to partially update an existing entity. CSRF token is automatically included.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path including the entity key. |
| `message` | `RequestMessage` | Yes | The partial update payload containing only the fields to change. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `mediaType` | `string?` | No | MIME type of the request entity. |
| `targetType` | `typedesc` | No | Expected return type. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
json partialUpdate = {
    PurchaseOrderByCustomer: "PO-99999"
};
http:Response patchResponse = check sapClient->patch("/A_SalesOrder('1000042')", partialUpdate);
```

</details>

#### Delete operations

<details>
<summary>delete</summary>

Sends an HTTP DELETE request to the specified SAP API path. Used to remove an existing entity. CSRF token is automatically included.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | Yes | Resource path including the entity key (e.g., `"/A_SalesOrder('1000042')"`). |
| `message` | `RequestMessage` | No | An optional request payload. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `mediaType` | `string?` | No | MIME type of the request entity. |
| `targetType` | `typedesc` | No | Expected return type. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
http:Response deleteResponse = check sapClient->delete("/A_SalesOrder('1000042')");
```

</details>

#### Resource function style

<details>
<summary>GET resource accessor</summary>

Resource function style for HTTP GET requests. Allows path segments as part of the resource accessor syntax and supports query parameters via the `params` spread field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `http:PathParamType...` | Yes | Resource path segments (e.g., `/A_SalesOrder`). |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `targetType` | `typedesc` | No | Expected return type. |
| `params` | `QueryParams` | No | Query parameters as a record with `string|string[]` fields. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
json salesOrderList = check sapClient->/A_SalesOrder();
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrder": "1000000",
        "SalesOrderType": "OR",
        "SalesOrganization": "1710",
        "SoldToParty": "17100001"
      }
    ]
  }
}
```

</details>

<details>
<summary>POST resource accessor</summary>

Resource function style for HTTP POST requests. Allows path segments as part of the resource accessor syntax. CSRF token is handled automatically.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `http:PathParamType...` | Yes | Resource path segments. |
| `message` | `RequestMessage` | Yes | The request payload. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `mediaType` | `string?` | No | MIME type of the request entity. |
| `targetType` | `typedesc` | No | Expected return type. |
| `params` | `QueryParams` | No | Query parameters. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
json newOrder = {
    SalesOrderType: "OR",
    SalesOrganization: "1710",
    DistributionChannel: "10",
    OrganizationDivision: "00",
    SoldToParty: "17100001"
};
json result = check sapClient->/A_SalesOrder.post(newOrder);
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrder": "1000043",
    "SalesOrderType": "OR",
    "SalesOrganization": "1710",
    "SoldToParty": "17100001"
  }
}
```

</details>

<details>
<summary>PATCH resource accessor</summary>

Resource function style for HTTP PATCH requests. CSRF token is handled automatically.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `http:PathParamType...` | Yes | Resource path segments including the entity key. |
| `message` | `RequestMessage` | Yes | The partial update payload. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `targetType` | `typedesc` | No | Expected return type. |
| `params` | `QueryParams` | No | Query parameters. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
string salesOrderId = "1000042";
http:Response patchResp = check sapClient->/A_SalesOrder(salesOrderId).patch({
    PurchaseOrderByCustomer: "PO-UPDATED"
});
```

</details>

<details>
<summary>DELETE resource accessor</summary>

Resource function style for HTTP DELETE requests. CSRF token is handled automatically.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `http:PathParamType...` | Yes | Resource path segments including the entity key. |
| `message` | `RequestMessage` | No | An optional request payload. |
| `headers` | `map<string\|string[]>?` | No | Optional HTTP headers. |
| `targetType` | `typedesc` | No | Expected return type. |
| `params` | `QueryParams` | No | Query parameters. |

Returns: `targetType|ClientError`

Sample code:

```ballerina
string salesOrderId = "1000042";
http:Response deleteResp = check sapClient->/A_SalesOrder(salesOrderId).delete();
```

</details>
