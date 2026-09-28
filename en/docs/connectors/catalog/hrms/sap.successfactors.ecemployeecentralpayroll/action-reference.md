---
connector: true
connector_name: "sap.successfactors.ecemployeecentralpayroll"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecemployeecentralpayroll` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecemployeecentralpayroll objects: EmployeePayrollRunResultsItems, EmployeePayrollRunResults, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access the replicated payroll information of an employee including pay date, currency, and payroll provider.

### Configuration

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the SAP SuccessFactors OData endpoint. Passed as the argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:CredentialsConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | See default | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | See default | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | See default | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | See default | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | See default | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | See default | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | See default | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | See default | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | See default | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | See default | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | See default | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

The client also accepts a `hostname` string parameter (the SAP SuccessFactors API server host) and an optional `port` (defaults to `443`).

### Initializing the client

```ballerina
import ballerinax/sap.successfactors.ecemployeecentralpayroll;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecemployeecentralpayroll:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### EmployeePayrollRunResultsItems

<details>
<summary>listEmployeePayrollRunResultsItemss</summary>

<div>

Queries the EmployeePayrollRunResultsItems collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeePayrollRunResultsItemssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listEmployeePayrollRunResultsItemss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmployeePayrollRunResults_externalCode": "1000",
        "EmployeePayrollRunResults_mdfSystemEffectiveStartDate": "2026-01-01",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmployeePayrollRunResultsItems</summary>

<div>

Creates a new EmployeePayrollRunResultsItems entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeePayrollRunResultsItems</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeePayrollRunResultsItems&#124;error`

**Sample code:**

```ballerina
CreatedEmployeePayrollRunResultsItems result = check client->createEmployeePayrollRunResultsItems(payload);
```

**Sample response:**

```json
{
  "d": {
    "EmployeePayrollRunResults_externalCode": "1000",
    "EmployeePayrollRunResults_mdfSystemEffectiveStartDate": "2026-01-01",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getEmployeePayrollRunResultsItems</summary>

<div>

Retrieves a single EmployeePayrollRunResultsItems entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeePayrollRunResults_externalCode` | <code>string</code> | Yes | key: EmployeePayrollRunResults_externalCode |
| `EmployeePayrollRunResults_mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: EmployeePayrollRunResults_mdfSystemEffectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeePayrollRunResultsItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeePayrollRunResultsItems&#124;error`

**Sample code:**

```ballerina
EmployeePayrollRunResultsItems result = check client->getEmployeePayrollRunResultsItems(EmployeePayrollRunResults_externalCode, EmployeePayrollRunResults_mdfSystemEffectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "EmployeePayrollRunResults_externalCode": "1000",
  "EmployeePayrollRunResults_mdfSystemEffectiveStartDate": "2026-01-01",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateEmployeePayrollRunResultsItems</summary>

<div>

Updates the EmployeePayrollRunResultsItems identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeePayrollRunResults_externalCode` | <code>string</code> | Yes | key: EmployeePayrollRunResults_externalCode |
| `EmployeePayrollRunResults_mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: EmployeePayrollRunResults_mdfSystemEffectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployeePayrollRunResultsItems</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeePayrollRunResultsItems(EmployeePayrollRunResults_externalCode, EmployeePayrollRunResults_mdfSystemEffectiveStartDate, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteEmployeePayrollRunResultsItems</summary>

<div>

Deletes the EmployeePayrollRunResultsItems identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeePayrollRunResults_externalCode` | <code>string</code> | Yes | key: EmployeePayrollRunResults_externalCode |
| `EmployeePayrollRunResults_mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: EmployeePayrollRunResults_mdfSystemEffectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeePayrollRunResultsItemsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeePayrollRunResultsItems(EmployeePayrollRunResults_externalCode, EmployeePayrollRunResults_mdfSystemEffectiveStartDate, externalCode);
```

</div>
</details>

#### EmployeePayrollRunResults

<details>
<summary>listEmployeePayrollRunResultss</summary>

<div>

Queries the EmployeePayrollRunResults collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeePayrollRunResultssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listEmployeePayrollRunResultss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmployeePayrollRunResults</summary>

<div>

Creates a new EmployeePayrollRunResults entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeePayrollRunResults</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeePayrollRunResults&#124;error`

**Sample code:**

```ballerina
CreatedEmployeePayrollRunResults result = check client->createEmployeePayrollRunResults(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getEmployeePayrollRunResults</summary>

<div>

Retrieves a single EmployeePayrollRunResults entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: mdfSystemEffectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeePayrollRunResultsQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeePayrollRunResults&#124;error`

**Sample code:**

```ballerina
EmployeePayrollRunResults result = check client->getEmployeePayrollRunResults(externalCode, mdfSystemEffectiveStartDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updateEmployeePayrollRunResults</summary>

<div>

Updates the EmployeePayrollRunResults identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: mdfSystemEffectiveStartDate |
| `payload` | <code>ModifiedEmployeePayrollRunResults</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeePayrollRunResults(externalCode, mdfSystemEffectiveStartDate, payload);
```

</div>
</details>

<details>
<summary>deleteEmployeePayrollRunResults</summary>

<div>

Deletes the EmployeePayrollRunResults identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: mdfSystemEffectiveStartDate |
| `headers` | <code>DeleteEmployeePayrollRunResultsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeePayrollRunResults(externalCode, mdfSystemEffectiveStartDate);
```

</div>
</details>

