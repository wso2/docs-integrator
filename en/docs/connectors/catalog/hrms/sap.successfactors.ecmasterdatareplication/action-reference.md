---
connector: true
connector_name: "sap.successfactors.ecmasterdatareplication"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecmasterdatareplication` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecmasterdatareplication objects — EmployeeDataReplicationConfirmationErrorMessage, EmployeeDataReplicationElement, EmployeeDataReplicationNotification, EmployeeDataReplicationConfirmation — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access the information about the replication status of employee data from Employee Central to payroll systems. The APIs are used in the standard integrations from SAP SuccessFactors Employee Central to SAP ERP, SAP S/4HANA and SAP SuccessFactors Employee Central Payroll.

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
import ballerinax/sap.successfactors.ecmasterdatareplication;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecmasterdatareplication:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### EmployeeDataReplicationConfirmationErrorMessage

<details>
<summary>listEmployeeDataReplicationConfirmationErrorMessages</summary>

<div>

Queries the EmployeeDataReplicationConfirmationErrorMessage collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeDataReplicationConfirmationErrorMessagesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listEmployeeDataReplicationConfirmationErrorMessages();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmployeeDataReplicationConfirmation_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmployeeDataReplicationConfirmationErrorMessage</summary>

<div>

Creates a new EmployeeDataReplicationConfirmationErrorMessage entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeDataReplicationConfirmationErrorMessage</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeeDataReplicationConfirmationErrorMessage&#124;error`

**Sample code:**

```ballerina
CreatedEmployeeDataReplicationConfirmationErrorMessage result = check client->createEmployeeDataReplicationConfirmationErrorMessage(payload);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeDataReplicationConfirmation_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeDataReplicationConfirmationErrorMessage</summary>

<div>

Retrieves a single EmployeeDataReplicationConfirmationErrorMessage entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeDataReplicationConfirmation_externalCode` | <code>string</code> | Yes | key: EmployeeDataReplicationConfirmation_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeDataReplicationConfirmationErrorMessageQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeDataReplicationConfirmationErrorMessage_1&#124;error`

**Sample code:**

```ballerina
EmployeeDataReplicationConfirmationErrorMessage_1 result = check client->getEmployeeDataReplicationConfirmationErrorMessage(EmployeeDataReplicationConfirmation_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeDataReplicationConfirmation_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### EmployeeDataReplicationElement

<details>
<summary>listEmployeeDataReplicationElements</summary>

<div>

Queries the EmployeeDataReplicationElement collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeDataReplicationElementsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listEmployeeDataReplicationElements();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "lastConfirmationNav": {},
        "lastConfirmationWithSuccessNav": {},
        "lastReplicationStartNotificationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeDataReplicationElement</summary>

<div>

Retrieves a single EmployeeDataReplicationElement entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeDataReplicationElementQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeDataReplicationElement_1&#124;error`

**Sample code:**

```ballerina
EmployeeDataReplicationElement_1 result = check client->getEmployeeDataReplicationElement(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "lastConfirmationNav": {
      "externalCode": "1000",
      "employeeDataReplicationConfirmationErrorMessages": {}
    },
    "lastConfirmationWithSuccessNav": {
      "externalCode": "1000",
      "employeeDataReplicationConfirmationErrorMessages": {}
    },
    "lastReplicationStartNotificationNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>deleteEmployeeDataReplicationElement</summary>

<div>

Deletes the EmployeeDataReplicationElement identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeDataReplicationElementHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeDataReplicationElement(externalCode);
```

</div>
</details>

#### EmployeeDataReplicationNotification

<details>
<summary>listEmployeeDataReplicationNotifications</summary>

<div>

Queries the EmployeeDataReplicationNotification collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeDataReplicationNotificationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listEmployeeDataReplicationNotifications();
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
<summary>createEmployeeDataReplicationNotification</summary>

<div>

Creates a new EmployeeDataReplicationNotification entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeDataReplicationNotification</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeeDataReplicationNotification&#124;error`

**Sample code:**

```ballerina
CreatedEmployeeDataReplicationNotification result = check client->createEmployeeDataReplicationNotification(payload);
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

<details>
<summary>getEmployeeDataReplicationNotification</summary>

<div>

Retrieves a single EmployeeDataReplicationNotification entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeDataReplicationNotificationQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeDataReplicationNotification_1&#124;error`

**Sample code:**

```ballerina
EmployeeDataReplicationNotification_1 result = check client->getEmployeeDataReplicationNotification(externalCode);
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

#### EmployeeDataReplicationConfirmation

<details>
<summary>listEmployeeDataReplicationConfirmations</summary>

<div>

Queries the EmployeeDataReplicationConfirmation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeDataReplicationConfirmationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listEmployeeDataReplicationConfirmations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "employeeDataReplicationConfirmationErrorMessages": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmployeeDataReplicationConfirmation</summary>

<div>

Creates a new EmployeeDataReplicationConfirmation entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeDataReplicationConfirmation</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployeeDataReplicationConfirmation&#124;error`

**Sample code:**

```ballerina
CreatedEmployeeDataReplicationConfirmation result = check client->createEmployeeDataReplicationConfirmation(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "employeeDataReplicationConfirmationErrorMessages": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeDataReplicationConfirmation</summary>

<div>

Retrieves a single EmployeeDataReplicationConfirmation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeDataReplicationConfirmationQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeDataReplicationConfirmation_1&#124;error`

**Sample code:**

```ballerina
EmployeeDataReplicationConfirmation_1 result = check client->getEmployeeDataReplicationConfirmation(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "employeeDataReplicationConfirmationErrorMessages": {
      "results": []
    }
  }
}
```

</div>
</details>

