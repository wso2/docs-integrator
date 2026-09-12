---
connector: true
connector_name: "sap.successfactors.ecalternativecostdistribution"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecalternativecostdistribution` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecalternativecostdistribution objects — EmpCostDistribution, EmpCostDistributionItem — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to distribute the costs of an employee over multiple alternative cost centers.

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
import ballerinax/sap.successfactors.ecalternativecostdistribution;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecalternativecostdistribution:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### EmpCostDistribution

<details>
<summary>listEmpCostDistributions</summary>

<div>

Queries the EmpCostDistribution collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpCostDistributionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listEmpCostDistributions();
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
<summary>createEmpCostDistribution</summary>

<div>

Creates a new EmpCostDistribution entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmpCostDistribution</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmpCostDistribution&#124;error`

**Sample code:**

```ballerina
CreatedEmpCostDistribution result = check client->createEmpCostDistribution(payload);
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
<summary>getEmpCostDistribution</summary>

<div>

Retrieves a single EmpCostDistribution entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `usersSysId` | <code>string</code> | Yes | key: usersSysId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpCostDistributionQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpCostDistribution&#124;error`

**Sample code:**

```ballerina
EmpCostDistribution result = check client->getEmpCostDistribution(effectiveStartDate, usersSysId);
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
<summary>updateEmpCostDistribution</summary>

<div>

Updates the EmpCostDistribution identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `usersSysId` | <code>string</code> | Yes | key: usersSysId |
| `payload` | <code>ModifiedEmpCostDistribution</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmpCostDistribution(effectiveStartDate, usersSysId, payload);
```

</div>
</details>

<details>
<summary>deleteEmpCostDistribution</summary>

<div>

Deletes the EmpCostDistribution identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `usersSysId` | <code>string</code> | Yes | key: usersSysId |
| `headers` | <code>DeleteEmpCostDistributionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmpCostDistribution(effectiveStartDate, usersSysId);
```

</div>
</details>

#### EmpCostDistributionItem

<details>
<summary>listEmpCostDistributionItems</summary>

<div>

Queries the EmpCostDistributionItem collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpCostDistributionItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listEmpCostDistributionItems();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmpCostDistribution_effectiveStartDate": "2026-01-01",
        "EmpCostDistribution_usersSysId": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmpCostDistributionItem</summary>

<div>

Creates a new EmpCostDistributionItem entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmpCostDistributionItem</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmpCostDistributionItem&#124;error`

**Sample code:**

```ballerina
CreatedEmpCostDistributionItem result = check client->createEmpCostDistributionItem(payload);
```

**Sample response:**

```json
{
  "d": {
    "EmpCostDistribution_effectiveStartDate": "2026-01-01",
    "EmpCostDistribution_usersSysId": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getEmpCostDistributionItem</summary>

<div>

Retrieves a single EmpCostDistributionItem entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmpCostDistribution_effectiveStartDate` | <code>string</code> | Yes | key: EmpCostDistribution_effectiveStartDate |
| `EmpCostDistribution_usersSysId` | <code>string</code> | Yes | key: EmpCostDistribution_usersSysId |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpCostDistributionItemQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpCostDistributionItem&#124;error`

**Sample code:**

```ballerina
EmpCostDistributionItem result = check client->getEmpCostDistributionItem(EmpCostDistribution_effectiveStartDate, EmpCostDistribution_usersSysId, externalCode);
```

**Sample response:**

```json
{
  "EmpCostDistribution_effectiveStartDate": "2026-01-01",
  "EmpCostDistribution_usersSysId": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateEmpCostDistributionItem</summary>

<div>

Updates the EmpCostDistributionItem identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmpCostDistribution_effectiveStartDate` | <code>string</code> | Yes | key: EmpCostDistribution_effectiveStartDate |
| `EmpCostDistribution_usersSysId` | <code>string</code> | Yes | key: EmpCostDistribution_usersSysId |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmpCostDistributionItem</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmpCostDistributionItem(EmpCostDistribution_effectiveStartDate, EmpCostDistribution_usersSysId, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteEmpCostDistributionItem</summary>

<div>

Deletes the EmpCostDistributionItem identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmpCostDistribution_effectiveStartDate` | <code>string</code> | Yes | key: EmpCostDistribution_effectiveStartDate |
| `EmpCostDistribution_usersSysId` | <code>string</code> | Yes | key: EmpCostDistribution_usersSysId |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmpCostDistributionItemHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmpCostDistributionItem(EmpCostDistribution_effectiveStartDate, EmpCostDistribution_usersSysId, externalCode);
```

</div>
</details>

