---
connector: true
connector_name: "sap.successfactors.ecdismissalprotection"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecdismissalprotection` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecdismissalprotection objects — EmployeeDismissalProtectionDetail, EmployeeDismissalProtection — over the SAP SuccessFactors OData v2 API. |

---

## Client

API to access data for dismissal protection.

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
import ballerinax/sap.successfactors.ecdismissalprotection;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecdismissalprotection:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### EmployeeDismissalProtectionDetail

<details>
<summary>listEmployeeDismissalProtectionDetails</summary>

<div>

Queries the EmployeeDismissalProtectionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeDismissalProtectionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listEmployeeDismissalProtectionDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmployeeDismissalProtection_workerId": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmployeeDismissalProtectionDetail</summary>

<div>

Creates a new EmployeeDismissalProtectionDetail entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeDismissalProtectionDetail</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeeDismissalProtectionDetail&#124;error`

**Sample code:**

```ballerina
CreatedEmployeeDismissalProtectionDetail result = check client->createEmployeeDismissalProtectionDetail(payload);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeDismissalProtection_workerId": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeDismissalProtectionDetail</summary>

<div>

Retrieves a single EmployeeDismissalProtectionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeDismissalProtection_workerId` | <code>string</code> | Yes | key: EmployeeDismissalProtection_workerId |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeDismissalProtectionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeDismissalProtectionDetail_1&#124;error`

**Sample code:**

```ballerina
EmployeeDismissalProtectionDetail_1 result = check client->getEmployeeDismissalProtectionDetail(EmployeeDismissalProtection_workerId, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeDismissalProtection_workerId": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateEmployeeDismissalProtectionDetail</summary>

<div>

Updates the EmployeeDismissalProtectionDetail identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeDismissalProtection_workerId` | <code>string</code> | Yes | key: EmployeeDismissalProtection_workerId |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployeeDismissalProtectionDetail</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeDismissalProtectionDetail(EmployeeDismissalProtection_workerId, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteEmployeeDismissalProtectionDetail</summary>

<div>

Deletes the EmployeeDismissalProtectionDetail identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeDismissalProtection_workerId` | <code>string</code> | Yes | key: EmployeeDismissalProtection_workerId |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeDismissalProtectionDetailHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeDismissalProtectionDetail(EmployeeDismissalProtection_workerId, externalCode);
```

</div>
</details>

#### EmployeeDismissalProtection

<details>
<summary>listEmployeeDismissalProtections</summary>

<div>

Queries the EmployeeDismissalProtection collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeDismissalProtectionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listEmployeeDismissalProtections();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "workerId": "1000",
        "empDismissalProtectionDetails": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmployeeDismissalProtection</summary>

<div>

Creates a new EmployeeDismissalProtection entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeDismissalProtection</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeeDismissalProtection&#124;error`

**Sample code:**

```ballerina
CreatedEmployeeDismissalProtection result = check client->createEmployeeDismissalProtection(payload);
```

**Sample response:**

```json
{
  "d": {
    "workerId": "1000",
    "empDismissalProtectionDetails": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeDismissalProtection</summary>

<div>

Retrieves a single EmployeeDismissalProtection entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `workerId` | <code>string</code> | Yes | key: workerId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeDismissalProtectionQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeDismissalProtection_1&#124;error`

**Sample code:**

```ballerina
EmployeeDismissalProtection_1 result = check client->getEmployeeDismissalProtection(workerId);
```

**Sample response:**

```json
{
  "d": {
    "workerId": "1000",
    "empDismissalProtectionDetails": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateEmployeeDismissalProtection</summary>

<div>

Updates the EmployeeDismissalProtection identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `workerId` | <code>string</code> | Yes | key: workerId |
| `payload` | <code>ModifiedEmployeeDismissalProtection</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeDismissalProtection(workerId, payload);
```

</div>
</details>

<details>
<summary>deleteEmployeeDismissalProtection</summary>

<div>

Deletes the EmployeeDismissalProtection identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `workerId` | <code>string</code> | Yes | key: workerId |
| `headers` | <code>DeleteEmployeeDismissalProtectionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeDismissalProtection(workerId);
```

</div>
</details>

