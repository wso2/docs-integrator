---
connector: true
connector_name: "sap.successfactors.eccompensationinformation"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.eccompensationinformation` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages eccompensationinformation objects: OneTimeDeduction, RecurringDeductionItem, EmpCompensation, EmpPayCompRecurring, DeductionScreenId, RecurringDeduction, EmpPayCompNonRecurring, EmpCompensationGroupSumCalculated, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use APIs to access the compensation information of an employee, including salary, recurring bonuses and non-recurring compensation information. You can use these APIs to create non-recurring deductions in a payment.

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
import ballerinax/sap.successfactors.eccompensationinformation;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

eccompensationinformation:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### OneTimeDeduction

<details>
<summary>listOneTimeDeductions</summary>

<div>

Queries the OneTimeDeduction collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListOneTimeDeductionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listOneTimeDeductions();
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
<summary>getOneTimeDeduction</summary>

<div>

Retrieves a single OneTimeDeduction entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetOneTimeDeductionQueries</code> | No | Queries to be sent with the request |

**Returns:** `OneTimeDeduction_1&#124;error`

**Sample code:**

```ballerina
OneTimeDeduction_1 result = check client->getOneTimeDeduction(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### RecurringDeductionItem

<details>
<summary>listRecurringDeductionItems</summary>

<div>

Queries the RecurringDeductionItem collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRecurringDeductionItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listRecurringDeductionItems();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "RecurringDeduction_effectiveStartDate": "2026-01-01",
        "RecurringDeduction_userSysId": "1000",
        "payComponentType": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getRecurringDeductionItem</summary>

<div>

Retrieves a single RecurringDeductionItem entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RecurringDeduction_effectiveStartDate` | <code>string</code> | Yes | key: RecurringDeduction_effectiveStartDate |
| `RecurringDeduction_userSysId` | <code>string</code> | Yes | key: RecurringDeduction_userSysId |
| `payComponentType` | <code>string</code> | Yes | key: payComponentType |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRecurringDeductionItemQueries</code> | No | Queries to be sent with the request |

**Returns:** `RecurringDeductionItem_1&#124;error`

**Sample code:**

```ballerina
RecurringDeductionItem_1 result = check client->getRecurringDeductionItem(RecurringDeduction_effectiveStartDate, RecurringDeduction_userSysId, payComponentType);
```

**Sample response:**

```json
{
  "d": {
    "RecurringDeduction_effectiveStartDate": "2026-01-01",
    "RecurringDeduction_userSysId": "1000",
    "payComponentType": "string"
  }
}
```

</div>
</details>

#### EmpCompensation

<details>
<summary>listEmpCompensationExpandEmpCompensationCalculatedNavs</summary>

<div>

Queries the EmpCompensation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpCompensationExpandEmpCompensationCalculatedNavsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listEmpCompensationExpandEmpCompensationCalculatedNavs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "seqNumber": "string",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpCompensationCalculated</summary>

<div>

Retrieves a single EmpCompensation entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `seqNumber` | <code>int</code> | Yes | key: seqNumber |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpCompensationCalculatedQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpCompensationCalculated_1&#124;error`

**Sample code:**

```ballerina
EmpCompensationCalculated_1 result = check client->getEmpCompensationCalculated(seqNumber, startDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "seqNumber": "string",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>listEmpCompensations</summary>

<div>

Queries the EmpCompensation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpCompensationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listEmpCompensations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "startDate": "2026-01-01",
        "userId": "1000",
        "empCompensationCalculatedNav": {},
        "empCompensationGroupSumCalculatedNav": {},
        "empPayCompRecurringNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpCompensation</summary>

<div>

Retrieves a single EmpCompensation entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `startDate` | <code>string</code> | Yes | key: startDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpCompensationQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpCompensation_1&#124;error`

**Sample code:**

```ballerina
EmpCompensation_1 result = check client->getEmpCompensation(startDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "startDate": "2026-01-01",
    "userId": "1000",
    "empCompensationCalculatedNav": {
      "seqNumber": "string",
      "startDate": "2026-01-01",
      "userId": "1000"
    },
    "empCompensationGroupSumCalculatedNav": {
      "results": []
    },
    "empPayCompRecurringNav": {
      "results": []
    }
  }
}
```

</div>
</details>

#### EmpPayCompRecurring

<details>
<summary>listEmpPayCompRecurrings</summary>

<div>

Queries the EmpPayCompRecurring collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpPayCompRecurringsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listEmpPayCompRecurrings();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "payComponent": "string",
        "seqNumber": "string",
        "startDate": "2026-01-01",
        "userId": "1000",
        "compensationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpPayCompRecurring</summary>

<div>

Retrieves a single EmpPayCompRecurring entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payComponent` | <code>string</code> | Yes | key: payComponent |
| `seqNumber` | <code>int</code> | Yes | key: seqNumber |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpPayCompRecurringQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpPayCompRecurring_1&#124;error`

**Sample code:**

```ballerina
EmpPayCompRecurring_1 result = check client->getEmpPayCompRecurring(payComponent, seqNumber, startDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "payComponent": "string",
    "seqNumber": "string",
    "startDate": "2026-01-01",
    "userId": "1000",
    "compensationNav": {
      "startDate": "2026-01-01",
      "userId": "1000",
      "empCompensationCalculatedNav": {},
      "empCompensationGroupSumCalculatedNav": {},
      "empPayCompRecurringNav": {}
    }
  }
}
```

</div>
</details>

#### DeductionScreenId

<details>
<summary>listDeductionScreenIds</summary>

<div>

Queries the DeductionScreenId collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDeductionScreenIdsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listDeductionScreenIds();
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
<summary>getDeductionScreenId</summary>

<div>

Retrieves a single DeductionScreenId entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeductionScreenIdQueries</code> | No | Queries to be sent with the request |

**Returns:** `DeductionScreenId_1&#124;error`

**Sample code:**

```ballerina
DeductionScreenId_1 result = check client->getDeductionScreenId(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### RecurringDeduction

<details>
<summary>listRecurringDeductions</summary>

<div>

Queries the RecurringDeduction collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRecurringDeductionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listRecurringDeductions();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "userSysId": "1000",
        "recurringItems": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getRecurringDeduction</summary>

<div>

Retrieves a single RecurringDeduction entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `userSysId` | <code>string</code> | Yes | key: userSysId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRecurringDeductionQueries</code> | No | Queries to be sent with the request |

**Returns:** `RecurringDeduction_1&#124;error`

**Sample code:**

```ballerina
RecurringDeduction_1 result = check client->getRecurringDeduction(effectiveStartDate, userSysId);
```

**Sample response:**

```json
{
  "d": {
    "effectiveStartDate": "2026-01-01",
    "userSysId": "1000",
    "recurringItems": {
      "results": []
    }
  }
}
```

</div>
</details>

#### EmpPayCompNonRecurring

<details>
<summary>listEmpPayCompNonRecurrings</summary>

<div>

Queries the EmpPayCompNonRecurring collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpPayCompNonRecurringsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listEmpPayCompNonRecurrings();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "payComponentCode": "1000",
        "payDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpPayCompNonRecurring</summary>

<div>

Retrieves a single EmpPayCompNonRecurring entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payComponentCode` | <code>string</code> | Yes | key: payComponentCode |
| `payDate` | <code>string</code> | Yes | key: payDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpPayCompNonRecurringQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpPayCompNonRecurring_1&#124;error`

**Sample code:**

```ballerina
EmpPayCompNonRecurring_1 result = check client->getEmpPayCompNonRecurring(payComponentCode, payDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "payComponentCode": "1000",
    "payDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

#### EmpCompensationGroupSumCalculated

<details>
<summary>listEmpCompensationGroupSumCalculateds</summary>

<div>

Queries the EmpCompensationGroupSumCalculated collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpCompensationGroupSumCalculatedsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listEmpCompensationGroupSumCalculateds();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "seqNumber": "string",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpCompensationGroupSumCalculated</summary>

<div>

Retrieves a single EmpCompensationGroupSumCalculated entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `seqNumber` | <code>int</code> | Yes | key: seqNumber |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpCompensationGroupSumCalculatedQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpCompensationGroupSumCalculated_1&#124;error`

**Sample code:**

```ballerina
EmpCompensationGroupSumCalculated_1 result = check client->getEmpCompensationGroupSumCalculated(seqNumber, startDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "seqNumber": "string",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

