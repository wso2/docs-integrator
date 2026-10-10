# Actions

The `ballerinax/sap.successfactors.ecapprenticemanagement` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecapprenticemanagement objects: ApprenticeEventType, DepartmentApprenticeDetail, ApprenticeSchool, ApprenticeGroup, ApprenticeSchoolEvent, ApprenticePracticalTrainingEvent, ApprenticeInternalTrainingEvent, Apprentice, over the SAP SuccessFactors OData v2 API. |

---

## Client

API to access apprentice management related data.

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
import ballerinax/sap.successfactors.ecapprenticemanagement;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecapprenticemanagement:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### ApprenticeEventType

<details>
<summary>listApprenticeEventTypes</summary>

Queries the ApprenticeEventType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticeEventTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listApprenticeEventTypes();
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

</details>

<details>
<summary>createApprenticeEventType</summary>

Creates a new ApprenticeEventType entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprenticeEvent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedApprenticeEventType&#124;error`

**Sample code:**

```ballerina
CreatedApprenticeEventType result = check client->createApprenticeEventType(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getApprenticeEventType</summary>

Retrieves a single ApprenticeEventType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticeEventTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `ApprenticeEventType&#124;error`

**Sample code:**

```ballerina
ApprenticeEventType result = check client->getApprenticeEventType(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateApprenticeEventType</summary>

Updates the ApprenticeEventType identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedApprenticeEventType</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprenticeEventType(externalCode, payload);
```

</details>

<details>
<summary>deleteApprenticeEventType</summary>

Deletes the ApprenticeEventType identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteApprenticeEventTypeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprenticeEventType(externalCode);
```

</details>

#### DepartmentApprenticeDetail

<details>
<summary>listDepartmentApprenticeDetails</summary>

Queries the DepartmentApprenticeDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDepartmentApprenticeDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listDepartmentApprenticeDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Department_effectiveStartDate": "2026-01-01",
        "Department_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createDepartmentApprenticeDetail</summary>

Creates a new DepartmentApprenticeDetail entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DepartmentApprenticeDetail</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedDepartmentApprenticeDetail&#124;error`

**Sample code:**

```ballerina
CreatedDepartmentApprenticeDetail result = check client->createDepartmentApprenticeDetail(payload);
```

**Sample response:**

```json
{
  "d": {
    "Department_effectiveStartDate": "2026-01-01",
    "Department_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getDepartmentApprenticeDetail</summary>

Retrieves a single DepartmentApprenticeDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Department_effectiveStartDate` | <code>string</code> | Yes | key: Department_effectiveStartDate |
| `Department_externalCode` | <code>string</code> | Yes | key: Department_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDepartmentApprenticeDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `DepartmentApprenticeDetail_1&#124;error`

**Sample code:**

```ballerina
DepartmentApprenticeDetail_1 result = check client->getDepartmentApprenticeDetail(Department_effectiveStartDate, Department_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "Department_effectiveStartDate": "2026-01-01",
    "Department_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateDepartmentApprenticeDetail</summary>

Updates the DepartmentApprenticeDetail identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Department_effectiveStartDate` | <code>string</code> | Yes | key: Department_effectiveStartDate |
| `Department_externalCode` | <code>string</code> | Yes | key: Department_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedDepartmentApprenticeDetail</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDepartmentApprenticeDetail(Department_effectiveStartDate, Department_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteDepartmentApprenticeDetail</summary>

Deletes the DepartmentApprenticeDetail identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Department_effectiveStartDate` | <code>string</code> | Yes | key: Department_effectiveStartDate |
| `Department_externalCode` | <code>string</code> | Yes | key: Department_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteDepartmentApprenticeDetailHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDepartmentApprenticeDetail(Department_effectiveStartDate, Department_externalCode, externalCode);
```

</details>

#### ApprenticeSchool

<details>
<summary>listApprenticeSchools</summary>

Queries the ApprenticeSchool collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticeSchoolsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listApprenticeSchools();
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

</details>

<details>
<summary>createApprenticeSchool</summary>

Creates a new ApprenticeSchool entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprenticeSchool</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedApprenticeSchool&#124;error`

**Sample code:**

```ballerina
CreatedApprenticeSchool result = check client->createApprenticeSchool(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getApprenticeSchool</summary>

Retrieves a single ApprenticeSchool entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticeSchoolQueries</code> | No | Queries to be sent with the request |

**Returns:** `ApprenticeSchool_1&#124;error`

**Sample code:**

```ballerina
ApprenticeSchool_1 result = check client->getApprenticeSchool(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateApprenticeSchool</summary>

Updates the ApprenticeSchool identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedApprenticeSchool</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprenticeSchool(externalCode, payload);
```

</details>

<details>
<summary>deleteApprenticeSchool</summary>

Deletes the ApprenticeSchool identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteApprenticeSchoolHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprenticeSchool(externalCode);
```

</details>

#### ApprenticeGroup

<details>
<summary>listApprenticeGroups</summary>

Queries the ApprenticeGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticeGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listApprenticeGroups();
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

</details>

<details>
<summary>createApprenticeGroup</summary>

Creates a new ApprenticeGroup entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprenticeGroup</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedApprenticeGroup&#124;error`

**Sample code:**

```ballerina
CreatedApprenticeGroup result = check client->createApprenticeGroup(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getApprenticeGroup</summary>

Retrieves a single ApprenticeGroup entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticeGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `ApprenticeGroup_1&#124;error`

**Sample code:**

```ballerina
ApprenticeGroup_1 result = check client->getApprenticeGroup(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateApprenticeGroup</summary>

Updates the ApprenticeGroup identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedApprenticeGroup</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprenticeGroup(externalCode, payload);
```

</details>

<details>
<summary>deleteApprenticeGroup</summary>

Deletes the ApprenticeGroup identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteApprenticeGroupHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprenticeGroup(externalCode);
```

</details>

#### ApprenticeSchoolEvent

<details>
<summary>listApprenticeSchoolEvents</summary>

Queries the ApprenticeSchoolEvent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticeSchoolEventsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listApprenticeSchoolEvents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "assignedApprentices": {},
        "eventTypeNav": {},
        "schoolNav": {}
      }
    ]
  }
}
```

</details>

<details>
<summary>createApprenticeSchoolEvent</summary>

Creates a new ApprenticeSchoolEvent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprenticeSchoolEvent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedApprenticeSchoolEvent&#124;error`

**Sample code:**

```ballerina
CreatedApprenticeSchoolEvent result = check client->createApprenticeSchoolEvent(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "assignedApprentices": {
      "results": []
    },
    "eventTypeNav": {
      "externalCode": "1000"
    },
    "schoolNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>getApprenticeSchoolEvent</summary>

Retrieves a single ApprenticeSchoolEvent entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticeSchoolEventQueries</code> | No | Queries to be sent with the request |

**Returns:** `ApprenticeSchoolEvent_1&#124;error`

**Sample code:**

```ballerina
ApprenticeSchoolEvent_1 result = check client->getApprenticeSchoolEvent(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "assignedApprentices": {
      "results": []
    },
    "eventTypeNav": {
      "externalCode": "1000"
    },
    "schoolNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>updateApprenticeSchoolEvent</summary>

Updates the ApprenticeSchoolEvent identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedApprenticeSchoolEvent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprenticeSchoolEvent(externalCode, payload);
```

</details>

<details>
<summary>deleteApprenticeSchoolEvent</summary>

Deletes the ApprenticeSchoolEvent identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteApprenticeSchoolEventHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprenticeSchoolEvent(externalCode);
```

</details>

#### ApprenticePracticalTrainingEvent

<details>
<summary>listApprenticePracticalTrainingEvents</summary>

Queries the ApprenticePracticalTrainingEvent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticePracticalTrainingEventsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listApprenticePracticalTrainingEvents();
```

</details>

<details>
<summary>getApprenticePracticalTrainingEvent</summary>

Retrieves a single ApprenticePracticalTrainingEvent entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticePracticalTrainingEventQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getApprenticePracticalTrainingEvent(externalCode);
```

</details>

<details>
<summary>deleteApprenticePracticalTrainingEvent</summary>

Deletes the ApprenticePracticalTrainingEvent identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteApprenticePracticalTrainingEventHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprenticePracticalTrainingEvent(externalCode);
```

</details>

#### ApprenticeInternalTrainingEvent

<details>
<summary>listApprenticeInternalTrainingEvents</summary>

Queries the ApprenticeInternalTrainingEvent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticeInternalTrainingEventsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listApprenticeInternalTrainingEvents();
```

</details>

<details>
<summary>getApprenticeInternalTrainingEvent</summary>

Retrieves a single ApprenticeInternalTrainingEvent entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticeInternalTrainingEventQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getApprenticeInternalTrainingEvent(externalCode);
```

</details>

<details>
<summary>deleteApprenticeInternalTrainingEvent</summary>

Deletes the ApprenticeInternalTrainingEvent identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteApprenticeInternalTrainingEventHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprenticeInternalTrainingEvent(externalCode);
```

</details>

#### Apprentice

<details>
<summary>listApprentices</summary>

Queries the Apprentice collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListApprenticesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listApprentices();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "user": "string",
        "assignedGroupNav": {},
        "assignedSchoolNav": {}
      }
    ]
  }
}
```

</details>

<details>
<summary>createApprentice</summary>

Creates a new Apprentice entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Apprentice</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedApprentice&#124;error`

**Sample code:**

```ballerina
CreatedApprentice result = check client->createApprentice(payload);
```

**Sample response:**

```json
{
  "d": {
    "user": "string",
    "assignedGroupNav": {
      "externalCode": "1000"
    },
    "assignedSchoolNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>getApprentice</summary>

Retrieves a single Apprentice entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `user` | <code>string</code> | Yes | key: user |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprenticeQueries</code> | No | Queries to be sent with the request |

**Returns:** `Apprentice_1&#124;error`

**Sample code:**

```ballerina
Apprentice_1 result = check client->getApprentice(user);
```

**Sample response:**

```json
{
  "d": {
    "user": "string",
    "assignedGroupNav": {
      "externalCode": "1000"
    },
    "assignedSchoolNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>updateApprentice</summary>

Updates the Apprentice identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `user` | <code>string</code> | Yes | key: user |
| `payload` | <code>ModifiedApprentice</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprentice(user, payload);
```

</details>

<details>
<summary>deleteApprentice</summary>

Deletes the Apprentice identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `user` | <code>string</code> | Yes | key: user |
| `headers` | <code>DeleteApprenticeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprentice(user);
```

</details>
