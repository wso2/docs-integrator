---
connector: true
connector_name: "sap.successfactors.ecadvances"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecadvances` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecadvances objects — AdvancesInstallments, AdvancesEligibility, AdvancesAccumulation, Advance — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to manage the information about payroll advances and the recovery of the advances.

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
import ballerinax/sap.successfactors.ecadvances;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecadvances:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### AdvancesInstallments

<details>
<summary>listAdvancesInstallmentss</summary>

<div>

Queries the AdvancesInstallments collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAdvancesInstallmentssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listAdvancesInstallmentss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Advance_externalCode": "1000",
        "NonRecurringPayment_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getAdvancesInstallments</summary>

<div>

Retrieves a single AdvancesInstallments entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Advance_externalCode` | <code>string</code> | Yes | key: Advance_externalCode |
| `NonRecurringPayment_externalCode` | <code>string</code> | Yes | key: NonRecurringPayment_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAdvancesInstallmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `AdvancesInstallments&#124;error`

**Sample code:**

```ballerina
AdvancesInstallments result = check client->getAdvancesInstallments(Advance_externalCode, NonRecurringPayment_externalCode, externalCode);
```

**Sample response:**

```json
{
  "Advance_externalCode": "1000",
  "NonRecurringPayment_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

#### AdvancesEligibility

<details>
<summary>listAdvancesEligibilitys</summary>

<div>

Queries the AdvancesEligibility collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAdvancesEligibilitysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listAdvancesEligibilitys();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getAdvancesEligibility</summary>

<div>

Retrieves a single AdvancesEligibility entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAdvancesEligibilityQueries</code> | No | Queries to be sent with the request |

**Returns:** `AdvancesEligibility&#124;error`

**Sample code:**

```ballerina
AdvancesEligibility result = check client->getAdvancesEligibility(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "externalCode": "1000"
}
```

</div>
</details>

#### AdvancesAccumulation

<details>
<summary>listAdvancesAccumulations</summary>

<div>

Queries the AdvancesAccumulation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAdvancesAccumulationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listAdvancesAccumulations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getAdvancesAccumulation</summary>

<div>

Retrieves a single AdvancesAccumulation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAdvancesAccumulationQueries</code> | No | Queries to be sent with the request |

**Returns:** `AdvancesAccumulation&#124;error`

**Sample code:**

```ballerina
AdvancesAccumulation result = check client->getAdvancesAccumulation(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000"
}
```

</div>
</details>

#### Advance

<details>
<summary>listAdvances</summary>

<div>

Queries the Advance collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAdvancesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listAdvances();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "NonRecurringPayment_externalCode": "1000",
        "externalCode": "1000",
        "advanceEligibilityCodeNav": {},
        "advancesInstallments": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getAdvance</summary>

<div>

Retrieves a single Advance entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `NonRecurringPayment_externalCode` | <code>string</code> | Yes | key: NonRecurringPayment_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAdvanceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Advance&#124;error`

**Sample code:**

```ballerina
Advance result = check client->getAdvance(NonRecurringPayment_externalCode, externalCode);
```

**Sample response:**

```json
{
  "NonRecurringPayment_externalCode": "1000",
  "externalCode": "1000",
  "advanceEligibilityCodeNav": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "externalCode": "1000"
      }
    ]
  },
  "advancesInstallments": {
    "results": [
      {
        "Advance_externalCode": "1000",
        "NonRecurringPayment_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

