---
connector: true
connector_name: "sap.successfactors.ecglobalassignment"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecglobalassignment` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecglobalassignment objects — SecondaryAssignmentsItem, SecondaryAssignments, RightToReturn, EmpGlobalAssignment — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to manage the assignment information of the employees who are assigned to another company within the organization.

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
import ballerinax/sap.successfactors.ecglobalassignment;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecglobalassignment:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### SecondaryAssignmentsItem

<details>
<summary>listSecondaryAssignmentsItems</summary>

<div>

Queries the SecondaryAssignmentsItem collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSecondaryAssignmentsItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listSecondaryAssignmentsItems();
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
<summary>createSecondaryAssignmentsItem</summary>

<div>

Creates a new SecondaryAssignmentsItem entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SecondaryAssignmentsItem</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedSecondaryAssignmentsItem&#124;error`

**Sample code:**

```ballerina
CreatedSecondaryAssignmentsItem result = check client->createSecondaryAssignmentsItem(payload);
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
<summary>getSecondaryAssignmentsItem</summary>

<div>

Retrieves a single SecondaryAssignmentsItem entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SecondaryAssignments_effectiveStartDate` | <code>string</code> | Yes | key: SecondaryAssignments_effectiveStartDate |
| `SecondaryAssignments_externalCode` | <code>string</code> | Yes | key: SecondaryAssignments_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSecondaryAssignmentsItemQueries</code> | No | Queries to be sent with the request |

**Returns:** `SecondaryAssignmentsItem&#124;error`

**Sample code:**

```ballerina
SecondaryAssignmentsItem result = check client->getSecondaryAssignmentsItem(SecondaryAssignments_effectiveStartDate, SecondaryAssignments_externalCode, externalCode);
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
<summary>updateSecondaryAssignmentsItem</summary>

<div>

Updates the SecondaryAssignmentsItem identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SecondaryAssignments_effectiveStartDate` | <code>string</code> | Yes | key: SecondaryAssignments_effectiveStartDate |
| `SecondaryAssignments_externalCode` | <code>string</code> | Yes | key: SecondaryAssignments_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedSecondaryAssignmentsItem</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSecondaryAssignmentsItem(SecondaryAssignments_effectiveStartDate, SecondaryAssignments_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteSecondaryAssignmentsItem</summary>

<div>

Deletes the SecondaryAssignmentsItem identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SecondaryAssignments_effectiveStartDate` | <code>string</code> | Yes | key: SecondaryAssignments_effectiveStartDate |
| `SecondaryAssignments_externalCode` | <code>string</code> | Yes | key: SecondaryAssignments_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteSecondaryAssignmentsItemHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSecondaryAssignmentsItem(SecondaryAssignments_effectiveStartDate, SecondaryAssignments_externalCode, externalCode);
```

</div>
</details>

#### SecondaryAssignments

<details>
<summary>listSecondaryAssignmentss</summary>

<div>

Queries the SecondaryAssignments collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSecondaryAssignmentssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listSecondaryAssignmentss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "externalCode": "1000",
        "allSfProcesses": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createSecondaryAssignments</summary>

<div>

Creates a new SecondaryAssignments entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SecondaryAssignments</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedSecondaryAssignments&#124;error`

**Sample code:**

```ballerina
CreatedSecondaryAssignments result = check client->createSecondaryAssignments(payload);
```

**Sample response:**

```json
{
  "d": {
    "effectiveStartDate": "2026-01-01",
    "externalCode": "1000",
    "allSfProcesses": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getSecondaryAssignments</summary>

<div>

Retrieves a single SecondaryAssignments entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSecondaryAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `SecondaryAssignments&#124;error`

**Sample code:**

```ballerina
SecondaryAssignments result = check client->getSecondaryAssignments(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "externalCode": "1000",
  "allSfProcesses": {
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
<summary>updateSecondaryAssignments</summary>

<div>

Updates the SecondaryAssignments identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedSecondaryAssignments</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSecondaryAssignments(effectiveStartDate, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteSecondaryAssignments</summary>

<div>

Deletes the SecondaryAssignments identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteSecondaryAssignmentsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSecondaryAssignments(effectiveStartDate, externalCode);
```

</div>
</details>

#### RightToReturn

<details>
<summary>listRightToReturns</summary>

<div>

Queries the RightToReturn collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRightToReturnsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listRightToReturns();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Position_code": "1000",
        "Position_effectiveStartDate": "2026-01-01",
        "code": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRightToReturn</summary>

<div>

Creates a new RightToReturn entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RightToReturn</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRightToReturn&#124;error`

**Sample code:**

```ballerina
CreatedRightToReturn result = check client->createRightToReturn(payload);
```

**Sample response:**

```json
{
  "d": {
    "Position_code": "1000",
    "Position_effectiveStartDate": "2026-01-01",
    "code": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getRightToReturn</summary>

<div>

Retrieves a single RightToReturn entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Position_code` | <code>string</code> | Yes | key: Position_code |
| `Position_effectiveStartDate` | <code>string</code> | Yes | key: Position_effectiveStartDate |
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRightToReturnQueries</code> | No | Queries to be sent with the request |

**Returns:** `RightToReturn&#124;error`

**Sample code:**

```ballerina
RightToReturn result = check client->getRightToReturn(Position_code, Position_effectiveStartDate, code);
```

**Sample response:**

```json
{
  "Position_code": "1000",
  "Position_effectiveStartDate": "2026-01-01",
  "code": "1000"
}
```

</div>
</details>

<details>
<summary>updateRightToReturn</summary>

<div>

Updates the RightToReturn identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Position_code` | <code>string</code> | Yes | key: Position_code |
| `Position_effectiveStartDate` | <code>string</code> | Yes | key: Position_effectiveStartDate |
| `code` | <code>string</code> | Yes | key: code |
| `payload` | <code>ModifiedRightToReturn</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRightToReturn(Position_code, Position_effectiveStartDate, code, payload);
```

</div>
</details>

<details>
<summary>deleteRightToReturn</summary>

<div>

Deletes the RightToReturn identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Position_code` | <code>string</code> | Yes | key: Position_code |
| `Position_effectiveStartDate` | <code>string</code> | Yes | key: Position_effectiveStartDate |
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>DeleteRightToReturnHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRightToReturn(Position_code, Position_effectiveStartDate, code);
```

</div>
</details>

#### EmpGlobalAssignment

<details>
<summary>listEmpGlobalAssignments</summary>

<div>

Queries the EmpGlobalAssignment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpGlobalAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listEmpGlobalAssignments();
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
<summary>getEmpGlobalAssignment</summary>

<div>

Retrieves a single EmpGlobalAssignment entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpGlobalAssignmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpGlobalAssignment&#124;error`

**Sample code:**

```ballerina
EmpGlobalAssignment result = check client->getEmpGlobalAssignment(userId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

