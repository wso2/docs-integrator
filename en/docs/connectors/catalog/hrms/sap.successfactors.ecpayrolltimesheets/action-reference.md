---
connector: true
connector_name: "sap.successfactors.ecpayrolltimesheets"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecpayrolltimesheets` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecpayrolltimesheets objects: EmployeeTimeSheet, ExternalAllowance, TimeCollector, ExternalTimeRecord, ExternalTimeData, DataReplicationProxy, EmployeeTimeSheetEntry, EmployeeTimeValuationResult…, over the SAP SuccessFactors OData v2 API. |

---

## Client

API to record employee attendances, overtime, on-call times, and allowances

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
import ballerinax/sap.successfactors.ecpayrolltimesheets;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecpayrolltimesheets:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### EmployeeTimeSheet

<details>
<summary>listEmployeeTimeSheets</summary>

<div>

Queries the EmployeeTimeSheet collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeSheetsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listEmployeeTimeSheets();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "allowance": {},
        "employeeTimeSheetEntry": {},
        "employeeTimeValuationResult": {},
        "replacedByNav": {},
        "replacesNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeTimeSheet</summary>

<div>

Retrieves a single EmployeeTimeSheet entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeSheetQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeTimeSheet_1&#124;error`

**Sample code:**

```ballerina
EmployeeTimeSheet_1 result = check client->getEmployeeTimeSheet(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "allowance": {
      "results": []
    },
    "employeeTimeSheetEntry": {
      "results": []
    },
    "employeeTimeValuationResult": {
      "results": []
    },
    "replacedByNav": {},
    "replacesNav": {}
  }
}
```

</div>
</details>

#### ExternalAllowance

<details>
<summary>listExternalAllowances</summary>

<div>

Queries the ExternalAllowance collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListExternalAllowancesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listExternalAllowances();
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
<summary>createExternalAllowance</summary>

<div>

Creates a new ExternalAllowance entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExternalAllowance</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedExternalAllowance&#124;error`

**Sample code:**

```ballerina
CreatedExternalAllowance result = check client->createExternalAllowance(payload);
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
<summary>getExternalAllowance</summary>

<div>

Retrieves a single ExternalAllowance entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExternalAllowanceQueries</code> | No | Queries to be sent with the request |

**Returns:** `ExternalAllowance_1&#124;error`

**Sample code:**

```ballerina
ExternalAllowance_1 result = check client->getExternalAllowance(externalCode);
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
<summary>updateExternalAllowance</summary>

<div>

Updates the ExternalAllowance identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedExternalAllowance</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateExternalAllowance(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteExternalAllowance</summary>

<div>

Deletes the ExternalAllowance identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteExternalAllowanceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteExternalAllowance(externalCode);
```

</div>
</details>

#### TimeCollector

<details>
<summary>listTimeCollectors</summary>

<div>

Queries the TimeCollector collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeCollectorsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listTimeCollectors();
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
<summary>getTimeCollector</summary>

<div>

Retrieves a single TimeCollector entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeCollectorQueries</code> | No | Queries to be sent with the request |

**Returns:** `TimeCollector_1&#124;error`

**Sample code:**

```ballerina
TimeCollector_1 result = check client->getTimeCollector(externalCode);
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

#### ExternalTimeRecord

<details>
<summary>listExternalTimeRecords</summary>

<div>

Queries the ExternalTimeRecord collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListExternalTimeRecordsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listExternalTimeRecords();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "externalTimeSegments": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createExternalTimeRecord</summary>

<div>

Creates a new ExternalTimeRecord entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExternalTimeRecord</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedExternalTimeRecord&#124;error`

**Sample code:**

```ballerina
CreatedExternalTimeRecord result = check client->createExternalTimeRecord(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "externalTimeSegments": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getExternalTimeRecord</summary>

<div>

Retrieves a single ExternalTimeRecord entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExternalTimeRecordQueries</code> | No | Queries to be sent with the request |

**Returns:** `ExternalTimeRecord_1&#124;error`

**Sample code:**

```ballerina
ExternalTimeRecord_1 result = check client->getExternalTimeRecord(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "externalTimeSegments": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateExternalTimeRecord</summary>

<div>

Updates the ExternalTimeRecord identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedExternalTimeRecord</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateExternalTimeRecord(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteExternalTimeRecord</summary>

<div>

Deletes the ExternalTimeRecord identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteExternalTimeRecordHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteExternalTimeRecord(externalCode);
```

</div>
</details>

#### ExternalTimeData

<details>
<summary>listExternalTimeData</summary>

<div>

Queries the ExternalTimeData collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListExternalTimeDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listExternalTimeData();
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
<summary>createExternalTimeData</summary>

<div>

Creates a new ExternalTimeData entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExternalTimeData</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedExternalTimeData&#124;error`

**Sample code:**

```ballerina
CreatedExternalTimeData result = check client->createExternalTimeData(payload);
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
<summary>getExternalTimeData</summary>

<div>

Retrieves a single ExternalTimeData entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExternalTimeDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `ExternalTimeData_1&#124;error`

**Sample code:**

```ballerina
ExternalTimeData_1 result = check client->getExternalTimeData(externalCode);
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
<summary>updateExternalTimeData</summary>

<div>

Updates the ExternalTimeData identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedExternalTimeData</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateExternalTimeData(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteExternalTimeData</summary>

<div>

Deletes the ExternalTimeData identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteExternalTimeDataHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteExternalTimeData(externalCode);
```

</div>
</details>

#### DataReplicationProxy

<details>
<summary>listDataReplicationProxies</summary>

<div>

Queries the DataReplicationProxy collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDataReplicationProxiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listDataReplicationProxies();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "employeeTimeValuationResultNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getDataReplicationProxy</summary>

<div>

Retrieves a single DataReplicationProxy entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDataReplicationProxyQueries</code> | No | Queries to be sent with the request |

**Returns:** `DataReplicationProxy_1&#124;error`

**Sample code:**

```ballerina
DataReplicationProxy_1 result = check client->getDataReplicationProxy(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "employeeTimeValuationResultNav": {
      "EmployeeTimeSheet_externalCode": "1000",
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

#### EmployeeTimeSheetEntry

<details>
<summary>listEmployeeTimeSheetEntries</summary>

<div>

Queries the EmployeeTimeSheetEntry collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeSheetEntriesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listEmployeeTimeSheetEntries();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmployeeTimeSheet_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeTimeSheetEntry</summary>

<div>

Retrieves a single EmployeeTimeSheetEntry entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTimeSheet_externalCode` | <code>string</code> | Yes | key: EmployeeTimeSheet_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeSheetEntryQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeTimeSheetEntry_1&#124;error`

**Sample code:**

```ballerina
EmployeeTimeSheetEntry_1 result = check client->getEmployeeTimeSheetEntry(EmployeeTimeSheet_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeTimeSheet_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### EmployeeTimeValuationResult

<details>
<summary>listEmployeeTimeValuationResults</summary>

<div>

Queries the EmployeeTimeValuationResult collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeValuationResultsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listEmployeeTimeValuationResults();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmployeeTimeSheet_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeTimeValuationResult</summary>

<div>

Retrieves a single EmployeeTimeValuationResult entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTimeSheet_externalCode` | <code>string</code> | Yes | key: EmployeeTimeSheet_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeValuationResultQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeTimeValuationResult_1&#124;error`

**Sample code:**

```ballerina
EmployeeTimeValuationResult_1 result = check client->getEmployeeTimeValuationResult(EmployeeTimeSheet_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeTimeSheet_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### AllowanceRecording

<details>
<summary>listAllowanceRecordings</summary>

<div>

Queries the AllowanceRecording collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAllowanceRecordingsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listAllowanceRecordings();
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
<summary>getAllowanceRecording</summary>

<div>

Retrieves a single AllowanceRecording entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAllowanceRecordingQueries</code> | No | Queries to be sent with the request |

**Returns:** `AllowanceRecording_1&#124;error`

**Sample code:**

```ballerina
AllowanceRecording_1 result = check client->getAllowanceRecording(externalCode);
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

#### AvailableAllowanceType

<details>
<summary>listAvailableAllowanceTypes</summary>

<div>

Queries the AvailableAllowanceType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAvailableAllowanceTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listAvailableAllowanceTypes();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "TimeTypeProfile_externalCode": "1000",
        "TimeTypeProfile_mdfSystemEffectiveStartDate": "2026-01-01",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getAvailableAllowanceType</summary>

<div>

Retrieves a single AvailableAllowanceType entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeTypeProfile_externalCode` | <code>string</code> | Yes | key: TimeTypeProfile_externalCode |
| `TimeTypeProfile_mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: TimeTypeProfile_mdfSystemEffectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAvailableAllowanceTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `AvailableAllowanceType&#124;error`

**Sample code:**

```ballerina
AvailableAllowanceType result = check client->getAvailableAllowanceType(TimeTypeProfile_externalCode, TimeTypeProfile_mdfSystemEffectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "TimeTypeProfile_externalCode": "1000",
    "TimeTypeProfile_mdfSystemEffectiveStartDate": "2026-01-01",
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### ExternalTimeSegment

<details>
<summary>listExternalTimeSegments</summary>

<div>

Queries the ExternalTimeSegment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListExternalTimeSegmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listExternalTimeSegments();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "ExternalTimeRecord_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createExternalTimeSegment</summary>

<div>

Creates a new ExternalTimeSegment entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExternalTimeSegment</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedExternalTimeSegment&#124;error`

**Sample code:**

```ballerina
CreatedExternalTimeSegment result = check client->createExternalTimeSegment(payload);
```

**Sample response:**

```json
{
  "d": {
    "ExternalTimeRecord_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getExternalTimeSegment</summary>

<div>

Retrieves a single ExternalTimeSegment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ExternalTimeRecord_externalCode` | <code>string</code> | Yes | key: ExternalTimeRecord_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExternalTimeSegmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `ExternalTimeSegment_1&#124;error`

**Sample code:**

```ballerina
ExternalTimeSegment_1 result = check client->getExternalTimeSegment(ExternalTimeRecord_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "ExternalTimeRecord_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateExternalTimeSegment</summary>

<div>

Updates the ExternalTimeSegment identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ExternalTimeRecord_externalCode` | <code>string</code> | Yes | key: ExternalTimeRecord_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedExternalTimeSegment</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateExternalTimeSegment(ExternalTimeRecord_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteExternalTimeSegment</summary>

<div>

Deletes the ExternalTimeSegment identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ExternalTimeRecord_externalCode` | <code>string</code> | Yes | key: ExternalTimeRecord_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteExternalTimeSegmentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteExternalTimeSegment(ExternalTimeRecord_externalCode, externalCode);
```

</div>
</details>

#### TimeRecording

<details>
<summary>listTimeRecordings</summary>

<div>

Queries the TimeRecording collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeRecordingsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listTimeRecordings();
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
<summary>getTimeRecording</summary>

<div>

Retrieves a single TimeRecording entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeRecordingQueries</code> | No | Queries to be sent with the request |

**Returns:** `TimeRecording_1&#124;error`

**Sample code:**

```ballerina
TimeRecording_1 result = check client->getTimeRecording(externalCode);
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

#### Allowance

<details>
<summary>listAllowances</summary>

<div>

Queries the Allowance collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAllowancesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listAllowances();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "EmployeeTimeSheet_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getAllowance</summary>

<div>

Retrieves a single Allowance entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTimeSheet_externalCode` | <code>string</code> | Yes | key: EmployeeTimeSheet_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAllowanceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Allowance_1&#124;error`

**Sample code:**

```ballerina
Allowance_1 result = check client->getAllowance(EmployeeTimeSheet_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "EmployeeTimeSheet_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

