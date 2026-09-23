# Actions

The `ballerinax/sap.successfactors.ectimeoff` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ectimeoff objects: TimeAccountPostingRule, WorkScheduleDayModelVariantAssignment, HolidayAssignment, TimeAccountPurchaseProfile, TimeTypeCAN, WorkScheduleDayModelVariantIdentifier, TimeManagementTerminationEndHandlingExcludedEventReason, TimeAccountPurchaseProfilePayComponentAssignment…, over the SAP SuccessFactors OData v2 API. |

---

## Client

API to manage absences such as vacation, sick leave, and paid time off

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
import ballerinax/sap.successfactors.ectimeoff;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ectimeoff:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### TimeAccountPostingRule

<details>
<summary>listTimeAccountPostingRules</summary>

Queries the TimeAccountPostingRule collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountPostingRulesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listTimeAccountPostingRules();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountPostingRule</summary>

Retrieves a single TimeAccountPostingRule entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountPostingRuleQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Posting\ Rule&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Posting\ Rule result = check client->getTimeAccountPostingRule(TimeType_externalCode, externalCode);
```

</details>

#### WorkScheduleDayModelVariantAssignment

<details>
<summary>listWorkScheduleDayModelVariantAssignments</summary>

Queries the WorkScheduleDayModelVariantAssignment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDayModelVariantAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listWorkScheduleDayModelVariantAssignments();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getWorkScheduleDayModelVariantAssignment</summary>

Retrieves a single WorkScheduleDayModelVariantAssignment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModel_externalCode` | <code>string</code> | Yes | key: WorkScheduleDayModel_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayModelVariantAssignmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day\ Model\ Variant\ Assignment&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day\ Model\ Variant\ Assignment result = check client->getWorkScheduleDayModelVariantAssignment(WorkScheduleDayModel_externalCode, externalCode);
```

</details>

#### HolidayAssignment

<details>
<summary>listHolidayAssignments</summary>

Queries the HolidayAssignment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHolidayAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listHolidayAssignments();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getHolidayAssignment</summary>

Retrieves a single HolidayAssignment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `HolidayCalendar_externalCode` | <code>string</code> | Yes | key: HolidayCalendar_externalCode |
| `date` | <code>string</code> | Yes | key: date |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHolidayAssignmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `Holiday\ Assignment&#124;error`

**Sample code:**

```ballerina
Holiday\ Assignment result = check client->getHolidayAssignment(HolidayCalendar_externalCode, date);
```

</details>

#### TimeAccountPurchaseProfile

<details>
<summary>listTimeAccountPurchaseProfiles</summary>

Queries the TimeAccountPurchaseProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountPurchaseProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listTimeAccountPurchaseProfiles();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountPurchaseProfile</summary>

Retrieves a single TimeAccountPurchaseProfile entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountPurchaseProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Purchase\ Profile&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Purchase\ Profile result = check client->getTimeAccountPurchaseProfile(externalCode);
```

</details>

#### TimeTypeCAN

<details>
<summary>listTimeTypeCANs</summary>

Queries the TimeTypeCAN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeCANsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listTimeTypeCANs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeCAN</summary>

Retrieves a single TimeTypeCAN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeCANQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ CAN&#124;error`

**Sample code:**

```ballerina
Time\ Type\ CAN result = check client->getTimeTypeCAN(TimeType_externalCode, externalCode);
```

</details>

#### WorkScheduleDayModelVariantIdentifier

<details>
<summary>listWorkScheduleDayModelVariantIdentifiers</summary>

Queries the WorkScheduleDayModelVariantIdentifier collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDayModelVariantIdentifiersQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listWorkScheduleDayModelVariantIdentifiers();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getWorkScheduleDayModelVariantIdentifier</summary>

Retrieves a single WorkScheduleDayModelVariantIdentifier entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayModelVariantIdentifierQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day\ Model\ Variant\ Identifier&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day\ Model\ Variant\ Identifier result = check client->getWorkScheduleDayModelVariantIdentifier(externalCode);
```

</details>

#### TimeManagementTerminationEndHandlingExcludedEventReason

<details>
<summary>listTimeManagementTerminationEndHandlingExcludedEventReasons</summary>

Queries the TimeManagementTerminationEndHandlingExcludedEventReason collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementTerminationEndHandlingExcludedEventReasonsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listTimeManagementTerminationEndHandlingExcludedEventReasons();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeManagementTerminationEndHandlingExcludedEventReason</summary>

Retrieves a single TimeManagementTerminationEndHandlingExcludedEventReason entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeManagementTerminationEndHandlingExclusion_externalCode` | <code>string</code> | Yes | key: TimeManagementTerminationEndHandlingExclusion_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementTerminationEndHandlingExcludedEventReasonQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Management\ Termination\ End\ Handling\ Excluded\ Event\ Reason&#124;error`

**Sample code:**

```ballerina
Time\ Management\ Termination\ End\ Handling\ Excluded\ Event\ Reason result = check client->getTimeManagementTerminationEndHandlingExcludedEventReason(TimeManagementTerminationEndHandlingExclusion_externalCode, externalCode);
```

</details>

#### TimeAccountPurchaseProfilePayComponentAssignment

<details>
<summary>listTimeAccountPurchaseProfilePayComponentAssignments</summary>

Queries the TimeAccountPurchaseProfilePayComponentAssignment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountPurchaseProfilePayComponentAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listTimeAccountPurchaseProfilePayComponentAssignments();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountPurchaseProfilePayComponentAssignment</summary>

Retrieves a single TimeAccountPurchaseProfilePayComponentAssignment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeAccountPurchaseProfile_externalCode` | <code>string</code> | Yes | key: TimeAccountPurchaseProfile_externalCode |
| `payComponent` | <code>string</code> | Yes | key: payComponent |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountPurchaseProfilePayComponentAssignmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Purchase\ Profile\ Pay\ Component\ Assignment&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Purchase\ Profile\ Pay\ Component\ Assignment result = check client->getTimeAccountPurchaseProfilePayComponentAssignment(TimeAccountPurchaseProfile_externalCode, payComponent);
```

</details>

#### EmployeeTimeGroupItem

<details>
<summary>listEmployeeTimeGroupItems</summary>

Queries the EmployeeTimeGroupItem collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeGroupItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeGroupItems();
```

</details>

<details>
<summary>getEmployeeTimeGroupItem</summary>

Retrieves a single EmployeeTimeGroupItem entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTimeGroup_externalCode` | <code>string</code> | Yes | key: EmployeeTimeGroup_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeGroupItemQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeGroupItem(EmployeeTimeGroup_externalCode, externalCode);
```

</details>

#### WorkScheduleDayModelAssignment

<details>
<summary>listWorkScheduleDayModelAssignments</summary>

Queries the WorkScheduleDayModelAssignment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDayModelAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listWorkScheduleDayModelAssignments();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createWorkScheduleDayModelAssignment</summary>

Creates a new WorkScheduleDayModelAssignment entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WorkScheduleDayModelAssignment</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedWork\ Schedule\ Day\ Model\ Assignment&#124;error`

**Sample code:**

```ballerina
CreatedWork\ Schedule\ Day\ Model\ Assignment result = check client->createWorkScheduleDayModelAssignment(payload);
```

</details>

<details>
<summary>getWorkScheduleDayModelAssignment</summary>

Retrieves a single WorkScheduleDayModelAssignment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `day` | <code>int</code> | Yes | key: day |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayModelAssignmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day\ Model\ Assignment&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day\ Model\ Assignment result = check client->getWorkScheduleDayModelAssignment(WorkSchedule_externalCode, day);
```

</details>

<details>
<summary>updateWorkScheduleDayModelAssignment</summary>

Updates the WorkScheduleDayModelAssignment identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `day` | <code>int</code> | Yes | key: day |
| `payload` | <code>ModifiedWork\ Schedule\ Day\ Model\ Assignment</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWorkScheduleDayModelAssignment(WorkSchedule_externalCode, day, payload);
```

</details>

<details>
<summary>deleteWorkScheduleDayModelAssignment</summary>

Deletes the WorkScheduleDayModelAssignment identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `day` | <code>int</code> | Yes | key: day |
| `headers` | <code>DeleteWorkScheduleDayModelAssignmentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWorkScheduleDayModelAssignment(WorkSchedule_externalCode, day);
```

</details>

#### TimeAccountDetail

<details>
<summary>listTimeAccountDetails</summary>

Queries the TimeAccountDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listTimeAccountDetails();
```

</details>

<details>
<summary>getTimeAccountDetail</summary>

Retrieves a single TimeAccountDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeAccount_externalCode` | <code>string</code> | Yes | key: TimeAccount_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeAccountDetail(TimeAccount_externalCode, externalCode);
```

</details>

<details>
<summary>deleteTimeAccountDetail</summary>

Deletes the TimeAccountDetail identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeAccount_externalCode` | <code>string</code> | Yes | key: TimeAccount_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteTimeAccountDetailHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTimeAccountDetail(TimeAccount_externalCode, externalCode);
```

</details>

#### TimeTypeNLD

<details>
<summary>listTimeTypeNLDs</summary>

Queries the TimeTypeNLD collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeNLDsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listTimeTypeNLDs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeNLD</summary>

Retrieves a single TimeTypeNLD entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeNLDQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ NLD&#124;error`

**Sample code:**

```ballerina
Time\ Type\ NLD result = check client->getTimeTypeNLD(TimeType_externalCode, externalCode);
```

</details>

#### TimeTypeSWE

<details>
<summary>listTimeTypeSWEs</summary>

Queries the TimeTypeSWE collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeSWEsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listTimeTypeSWEs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeSWE</summary>

Retrieves a single TimeTypeSWE entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeSWEQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ SWE&#124;error`

**Sample code:**

```ballerina
Time\ Type\ SWE result = check client->getTimeTypeSWE(TimeType_externalCode, externalCode);
```

</details>

#### TimeTypeNOR

<details>
<summary>listTimeTypeNORs</summary>

Queries the TimeTypeNOR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeNORsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listTimeTypeNORs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeNOR</summary>

Retrieves a single TimeTypeNOR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeNORQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ NOR&#124;error`

**Sample code:**

```ballerina
Time\ Type\ NOR result = check client->getTimeTypeNOR(TimeType_externalCode, externalCode);
```

</details>

#### TimeTypeITA

<details>
<summary>listTimeTypeITAs</summary>

Queries the TimeTypeITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listTimeTypeITAs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeITA</summary>

Retrieves a single TimeTypeITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ ITA&#124;error`

**Sample code:**

```ballerina
Time\ Type\ ITA result = check client->getTimeTypeITA(TimeType_externalCode, externalCode);
```

</details>

#### AbsenceCountingMethod

<details>
<summary>listAbsenceCountingMethods</summary>

Queries the AbsenceCountingMethod collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAbsenceCountingMethodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listAbsenceCountingMethods();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getAbsenceCountingMethod</summary>

Retrieves a single AbsenceCountingMethod entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAbsenceCountingMethodQueries</code> | No | Queries to be sent with the request |

**Returns:** `Absence\ Counting\ Method&#124;error`

**Sample code:**

```ballerina
Absence\ Counting\ Method result = check client->getAbsenceCountingMethod(externalCode);
```

</details>

#### ShiftClassification

<details>
<summary>listShiftClassifications</summary>

Queries the ShiftClassification collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListShiftClassificationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listShiftClassifications();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getShiftClassification</summary>

Retrieves a single ShiftClassification entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetShiftClassificationQueries</code> | No | Queries to be sent with the request |

**Returns:** `Shift\ Classification&#124;error`

**Sample code:**

```ballerina
Shift\ Classification result = check client->getShiftClassification(externalCode);
```

</details>

#### WorkScheduleDay

<details>
<summary>listWorkScheduleDays</summary>

Queries the WorkScheduleDay collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDaysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listWorkScheduleDays();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createWorkScheduleDay</summary>

Creates a new WorkScheduleDay entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WorkScheduleDay</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedWork\ Schedule\ Day&#124;error`

**Sample code:**

```ballerina
CreatedWork\ Schedule\ Day result = check client->createWorkScheduleDay(payload);
```

</details>

<details>
<summary>getWorkScheduleDay</summary>

Retrieves a single WorkScheduleDay entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `day` | <code>int</code> | Yes | key: day |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day result = check client->getWorkScheduleDay(WorkSchedule_externalCode, day);
```

</details>

<details>
<summary>updateWorkScheduleDay</summary>

Updates the WorkScheduleDay identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `day` | <code>int</code> | Yes | key: day |
| `payload` | <code>ModifiedWork\ Schedule\ Day</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWorkScheduleDay(WorkSchedule_externalCode, day, payload);
```

</details>

<details>
<summary>deleteWorkScheduleDay</summary>

Deletes the WorkScheduleDay identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `day` | <code>int</code> | Yes | key: day |
| `headers` | <code>DeleteWorkScheduleDayHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWorkScheduleDay(WorkSchedule_externalCode, day);
```

</details>

#### HolidayCalendar

<details>
<summary>listHolidayCalendars</summary>

Queries the HolidayCalendar collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHolidayCalendarsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listHolidayCalendars();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getHolidayCalendar</summary>

Retrieves a single HolidayCalendar entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHolidayCalendarQueries</code> | No | Queries to be sent with the request |

**Returns:** `Holiday\ Calendar&#124;error`

**Sample code:**

```ballerina
Holiday\ Calendar result = check client->getHolidayCalendar(externalCode);
```

</details>

#### TimeManagementTerminationEndHandlingExcludedTimeAccountType

<details>
<summary>listTimeManagementTerminationEndHandlingExcludedTimeAccountTypes</summary>

Queries the TimeManagementTerminationEndHandlingExcludedTimeAccountType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementTerminationEndHandlingExcludedTimeAccountTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listTimeManagementTerminationEndHandlingExcludedTimeAccountTypes();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeManagementTerminationEndHandlingExcludedTimeAccountType</summary>

Retrieves a single TimeManagementTerminationEndHandlingExcludedTimeAccountType entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeManagementTerminationEndHandlingExclusion_externalCode` | <code>string</code> | Yes | key: TimeManagementTerminationEndHandlingExclusion_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementTerminationEndHandlingExcludedTimeAccountTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Management\ Termination\ End\ Handling\ Excluded\ Time\ Account\ Type&#124;error`

**Sample code:**

```ballerina
Time\ Management\ Termination\ End\ Handling\ Excluded\ Time\ Account\ Type result = check client->getTimeManagementTerminationEndHandlingExcludedTimeAccountType(TimeManagementTerminationEndHandlingExclusion_externalCode, externalCode);
```

</details>

#### EmployeeTimeDEU

<details>
<summary>listEmployeeTimeDEUs</summary>

Queries the EmployeeTimeDEU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeDEUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeDEUs();
```

</details>

<details>
<summary>getEmployeeTimeDEU</summary>

Retrieves a single EmployeeTimeDEU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeDEUQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeDEU(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>deleteEmployeeTimeDEU</summary>

Deletes the EmployeeTimeDEU identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeDEUHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeDEU(EmployeeTime_externalCode, externalCode);
```

</details>

#### TimeAccount

<details>
<summary>listTimeAccounts</summary>

Queries the TimeAccount collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listTimeAccounts();
```

</details>

<details>
<summary>getTimeAccount</summary>

Retrieves a single TimeAccount entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeAccount(externalCode);
```

</details>

<details>
<summary>deleteTimeAccount</summary>

Deletes the TimeAccount identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteTimeAccountHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTimeAccount(externalCode);
```

</details>

#### WorkScheduleDayModelAssignmentSegment

<details>
<summary>listWorkScheduleDayModelAssignmentSegments</summary>

Queries the WorkScheduleDayModelAssignmentSegment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDayModelAssignmentSegmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listWorkScheduleDayModelAssignmentSegments();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createWorkScheduleDayModelAssignmentSegment</summary>

Creates a new WorkScheduleDayModelAssignmentSegment entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WorkScheduleDayModelAssignmentSegment</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedWork\ Schedule\ Day\ Model\ Assignment\ Segment&#124;error`

**Sample code:**

```ballerina
CreatedWork\ Schedule\ Day\ Model\ Assignment\ Segment result = check client->createWorkScheduleDayModelAssignmentSegment(payload);
```

</details>

<details>
<summary>getWorkScheduleDayModelAssignmentSegment</summary>

Retrieves a single WorkScheduleDayModelAssignmentSegment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModelAssignment_day` | <code>int</code> | Yes | key: WorkScheduleDayModelAssignment_day |
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayModelAssignmentSegmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day\ Model\ Assignment\ Segment&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day\ Model\ Assignment\ Segment result = check client->getWorkScheduleDayModelAssignmentSegment(WorkScheduleDayModelAssignment_day, WorkSchedule_externalCode, externalCode);
```

</details>

<details>
<summary>updateWorkScheduleDayModelAssignmentSegment</summary>

Updates the WorkScheduleDayModelAssignmentSegment identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModelAssignment_day` | <code>int</code> | Yes | key: WorkScheduleDayModelAssignment_day |
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedWork\ Schedule\ Day\ Model\ Assignment\ Segment</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWorkScheduleDayModelAssignmentSegment(WorkScheduleDayModelAssignment_day, WorkSchedule_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteWorkScheduleDayModelAssignmentSegment</summary>

Deletes the WorkScheduleDayModelAssignmentSegment identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModelAssignment_day` | <code>int</code> | Yes | key: WorkScheduleDayModelAssignment_day |
| `WorkSchedule_externalCode` | <code>string</code> | Yes | key: WorkSchedule_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteWorkScheduleDayModelAssignmentSegmentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWorkScheduleDayModelAssignmentSegment(WorkScheduleDayModelAssignment_day, WorkSchedule_externalCode, externalCode);
```

</details>

#### EmployeeTimeCOL

<details>
<summary>listEmployeeTimeCOLs</summary>

Queries the EmployeeTimeCOL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeCOLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeCOLs();
```

</details>

<details>
<summary>getEmployeeTimeCOL</summary>

Retrieves a single EmployeeTimeCOL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeCOLQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeCOL(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>deleteEmployeeTimeCOL</summary>

Deletes the EmployeeTimeCOL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeCOLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeCOL(EmployeeTime_externalCode, externalCode);
```

</details>

#### EmployeeTimeESP

<details>
<summary>listEmployeeTimeESPs</summary>

Queries the EmployeeTimeESP collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeESPsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeESPs();
```

</details>

<details>
<summary>getEmployeeTimeESP</summary>

Retrieves a single EmployeeTimeESP entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeESPQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeESP(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>deleteEmployeeTimeESP</summary>

Deletes the EmployeeTimeESP identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeESPHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeESP(EmployeeTime_externalCode, externalCode);
```

</details>

#### TimeManagementTerminationEndHandlingConfiguration

<details>
<summary>listTimeManagementTerminationEndHandlingConfigurations</summary>

Queries the TimeManagementTerminationEndHandlingConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementTerminationEndHandlingConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listTimeManagementTerminationEndHandlingConfigurations();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeManagementTerminationEndHandlingConfiguration</summary>

Retrieves a single TimeManagementTerminationEndHandlingConfiguration entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementTerminationEndHandlingConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Management\ Termination\ End\ Handling\ Configuration&#124;error`

**Sample code:**

```ballerina
Time\ Management\ Termination\ End\ Handling\ Configuration result = check client->getTimeManagementTerminationEndHandlingConfiguration(externalCode);
```

</details>

#### HolidayCategory

<details>
<summary>listHolidayCategorys</summary>

Queries the HolidayCategory collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHolidayCategorysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listHolidayCategorys();
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
<summary>getHolidayCategory</summary>

Retrieves a single HolidayCategory entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHolidayCategoryQueries</code> | No | Queries to be sent with the request |

**Returns:** `Holiday\ Category&#124;error`

**Sample code:**

```ballerina
Holiday\ Category result = check client->getHolidayCategory(externalCode);
```

</details>

#### ElectronicSicknessCertificateExclusionReasonDEU

<details>
<summary>listElectronicSicknessCertificateExclusionReasonDEUs</summary>

Queries the ElectronicSicknessCertificateExclusionReasonDEU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListElectronicSicknessCertificateExclusionReasonDEUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_27&#124;error`

**Sample code:**

```ballerina
Wrapper_27 result = check client->listElectronicSicknessCertificateExclusionReasonDEUs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getElectronicSicknessCertificateExclusionReasonDEU</summary>

Retrieves a single ElectronicSicknessCertificateExclusionReasonDEU entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetElectronicSicknessCertificateExclusionReasonDEUQueries</code> | No | Queries to be sent with the request |

**Returns:** `Electronic\ Sickness\ Certificate\ Exclusion\ Reason\ DEU&#124;error`

**Sample code:**

```ballerina
Electronic\ Sickness\ Certificate\ Exclusion\ Reason\ DEU result = check client->getElectronicSicknessCertificateExclusionReasonDEU(externalCode);
```

</details>

#### EmployeeTimeGroup

<details>
<summary>listEmployeeTimeGroups</summary>

Queries the EmployeeTimeGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeGroups();
```

</details>

<details>
<summary>getEmployeeTimeGroup</summary>

Retrieves a single EmployeeTimeGroup entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeGroup(externalCode);
```

</details>

#### TimeAccountType

<details>
<summary>listTimeAccountTypes</summary>

Queries the TimeAccountType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_29&#124;error`

**Sample code:**

```ballerina
Wrapper_29 result = check client->listTimeAccountTypes();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountType</summary>

Retrieves a single TimeAccountType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Type&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Type result = check client->getTimeAccountType(externalCode);
```

</details>

#### AccrualCalculationBase

<details>
<summary>listAccrualCalculationBases</summary>

Queries the AccrualCalculationBase collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAccrualCalculationBasesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_30&#124;error`

**Sample code:**

```ballerina
Wrapper_30 result = check client->listAccrualCalculationBases();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createAccrualCalculationBase</summary>

Creates a new AccrualCalculationBase entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AccrualCalculationBase</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedAccrual\ Calculation\ Base&#124;error`

**Sample code:**

```ballerina
CreatedAccrual\ Calculation\ Base result = check client->createAccrualCalculationBase(payload);
```

</details>

<details>
<summary>getAccrualCalculationBase</summary>

Retrieves a single AccrualCalculationBase entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAccrualCalculationBaseQueries</code> | No | Queries to be sent with the request |

**Returns:** `Accrual\ Calculation\ Base&#124;error`

**Sample code:**

```ballerina
Accrual\ Calculation\ Base result = check client->getAccrualCalculationBase(externalCode);
```

</details>

<details>
<summary>updateAccrualCalculationBase</summary>

Updates the AccrualCalculationBase identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedAccrual\ Calculation\ Base</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAccrualCalculationBase(externalCode, payload);
```

</details>

<details>
<summary>deleteAccrualCalculationBase</summary>

Deletes the AccrualCalculationBase identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteAccrualCalculationBaseHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAccrualCalculationBase(externalCode);
```

</details>

#### EmployeeTimeUSA

<details>
<summary>listEmployeeTimeUSAs</summary>

Queries the EmployeeTimeUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_31&#124;error`

**Sample code:**

```ballerina
Wrapper_31 result = check client->listEmployeeTimeUSAs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeUSA</summary>

Creates a new EmployeeTimeUSA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeUSA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ USA&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ USA result = check client->createEmployeeTimeUSA(payload);
```

</details>

<details>
<summary>getEmployeeTimeUSA</summary>

Retrieves a single EmployeeTimeUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ USA&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ USA result = check client->getEmployeeTimeUSA(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeUSA</summary>

Updates the EmployeeTimeUSA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ USA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeUSA(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeUSA</summary>

Deletes the EmployeeTimeUSA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeUSAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeUSA(EmployeeTime_externalCode, externalCode);
```

</details>

#### TimeTypeUSA

<details>
<summary>listTimeTypeUSAs</summary>

Queries the TimeTypeUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_32&#124;error`

**Sample code:**

```ballerina
Wrapper_32 result = check client->listTimeTypeUSAs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeUSA</summary>

Retrieves a single TimeTypeUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ USA&#124;error`

**Sample code:**

```ballerina
Time\ Type\ USA result = check client->getTimeTypeUSA(TimeType_externalCode, externalCode);
```

</details>

#### TemporaryTimeInformation

<details>
<summary>listTemporaryTimeInformations</summary>

Queries the TemporaryTimeInformation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTemporaryTimeInformationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_33&#124;error`

**Sample code:**

```ballerina
Wrapper_33 result = check client->listTemporaryTimeInformations();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createTemporaryTimeInformation</summary>

Creates a new TemporaryTimeInformation entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TemporaryTimeInformation</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTemporary\ Time\ Information&#124;error`

**Sample code:**

```ballerina
CreatedTemporary\ Time\ Information result = check client->createTemporaryTimeInformation(payload);
```

</details>

<details>
<summary>getTemporaryTimeInformation</summary>

Retrieves a single TemporaryTimeInformation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTemporaryTimeInformationQueries</code> | No | Queries to be sent with the request |

**Returns:** `Temporary\ Time\ Information&#124;error`

**Sample code:**

```ballerina
Temporary\ Time\ Information result = check client->getTemporaryTimeInformation(externalCode);
```

</details>

<details>
<summary>updateTemporaryTimeInformation</summary>

Updates the TemporaryTimeInformation identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedTemporary\ Time\ Information</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTemporaryTimeInformation(externalCode, payload);
```

</details>

<details>
<summary>deleteTemporaryTimeInformation</summary>

Deletes the TemporaryTimeInformation identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteTemporaryTimeInformationHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTemporaryTimeInformation(externalCode);
```

</details>

#### TimeTypeProfile

<details>
<summary>listTimeTypeProfiles</summary>

Queries the TimeTypeProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_34&#124;error`

**Sample code:**

```ballerina
Wrapper_34 result = check client->listTimeTypeProfiles();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeProfile</summary>

Retrieves a single TimeTypeProfile entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: mdfSystemEffectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ Profile&#124;error`

**Sample code:**

```ballerina
Time\ Type\ Profile result = check client->getTimeTypeProfile(externalCode, mdfSystemEffectiveStartDate);
```

</details>

#### TimeManagementAlert

<details>
<summary>listTimeManagementAlerts</summary>

Queries the TimeManagementAlert collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementAlertsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listTimeManagementAlerts();
```

</details>

<details>
<summary>getTimeManagementAlert</summary>

Retrieves a single TimeManagementAlert entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementAlertQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeManagementAlert(externalCode);
```

</details>

#### TimeTypeDEU

<details>
<summary>listTimeTypeDEUs</summary>

Queries the TimeTypeDEU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeDEUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_36&#124;error`

**Sample code:**

```ballerina
Wrapper_36 result = check client->listTimeTypeDEUs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeDEU</summary>

Retrieves a single TimeTypeDEU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeDEUQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ DEU&#124;error`

**Sample code:**

```ballerina
Time\ Type\ DEU result = check client->getTimeTypeDEU(TimeType_externalCode, externalCode);
```

</details>

#### TimeType

<details>
<summary>listTimeTypes</summary>

Queries the TimeType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_37&#124;error`

**Sample code:**

```ballerina
Wrapper_37 result = check client->listTimeTypes();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeType</summary>

Retrieves a single TimeType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type&#124;error`

**Sample code:**

```ballerina
Time\ Type result = check client->getTimeType(externalCode);
```

</details>

#### TimeManagementTerminationEndHandlingExclusion

<details>
<summary>listTimeManagementTerminationEndHandlingExclusions</summary>

Queries the TimeManagementTerminationEndHandlingExclusion collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementTerminationEndHandlingExclusionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_38&#124;error`

**Sample code:**

```ballerina
Wrapper_38 result = check client->listTimeManagementTerminationEndHandlingExclusions();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeManagementTerminationEndHandlingExclusion</summary>

Retrieves a single TimeManagementTerminationEndHandlingExclusion entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementTerminationEndHandlingExclusionQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Management\ Termination\ End\ Handling\ Exclusion&#124;error`

**Sample code:**

```ballerina
Time\ Management\ Termination\ End\ Handling\ Exclusion result = check client->getTimeManagementTerminationEndHandlingExclusion(externalCode);
```

</details>

#### EmployeeTimeMEX

<details>
<summary>listEmployeeTimeMEXs</summary>

Queries the EmployeeTimeMEX collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeMEXsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeMEXs();
```

</details>

<details>
<summary>getEmployeeTimeMEX</summary>

Retrieves a single EmployeeTimeMEX entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeMEXQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeMEX(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>deleteEmployeeTimeMEX</summary>

Deletes the EmployeeTimeMEX identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeMEXHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeMEX(EmployeeTime_externalCode, externalCode);
```

</details>

#### WorkScheduleDayModel

<details>
<summary>listWorkScheduleDayModels</summary>

Queries the WorkScheduleDayModel collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDayModelsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_40&#124;error`

**Sample code:**

```ballerina
Wrapper_40 result = check client->listWorkScheduleDayModels();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createWorkScheduleDayModel</summary>

Creates a new WorkScheduleDayModel entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WorkScheduleDayModel</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedWork\ Schedule\ Day\ Model&#124;error`

**Sample code:**

```ballerina
CreatedWork\ Schedule\ Day\ Model result = check client->createWorkScheduleDayModel(payload);
```

</details>

<details>
<summary>getWorkScheduleDayModel</summary>

Retrieves a single WorkScheduleDayModel entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayModelQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day\ Model&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day\ Model result = check client->getWorkScheduleDayModel(externalCode);
```

</details>

<details>
<summary>updateWorkScheduleDayModel</summary>

Updates the WorkScheduleDayModel identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedWork\ Schedule\ Day\ Model</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWorkScheduleDayModel(externalCode, payload);
```

</details>

<details>
<summary>deleteWorkScheduleDayModel</summary>

Deletes the WorkScheduleDayModel identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteWorkScheduleDayModelHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWorkScheduleDayModel(externalCode);
```

</details>

#### TimeAccountSnapshot

<details>
<summary>listTimeAccountSnapshots</summary>

Queries the TimeAccountSnapshot collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountSnapshotsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_41&#124;error`

**Sample code:**

```ballerina
Wrapper_41 result = check client->listTimeAccountSnapshots();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountSnapshot</summary>

Retrieves a single TimeAccountSnapshot entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountSnapshotQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Snapshot&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Snapshot result = check client->getTimeAccountSnapshot(externalCode);
```

</details>

#### EmpTimeAccountBalance

<details>
<summary>listEmpTimeAccountBalances</summary>

Queries the EmpTimeAccountBalance collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpTimeAccountBalancesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_42&#124;error`

**Sample code:**

```ballerina
Wrapper_42 result = check client->listEmpTimeAccountBalances();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getEmpTimeAccountBalance</summary>

Retrieves a single EmpTimeAccountBalance entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `timeAccount` | <code>string</code> | Yes | key: timeAccount |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpTimeAccountBalanceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ Account\ Balance&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ Account\ Balance result = check client->getEmpTimeAccountBalance(timeAccount);
```

</details>

#### TimeManagementAlertMessage

<details>
<summary>listTimeManagementAlertMessages</summary>

Queries the TimeManagementAlertMessage collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementAlertMessagesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listTimeManagementAlertMessages();
```

</details>

<details>
<summary>getTimeManagementAlertMessage</summary>

Retrieves a single TimeManagementAlertMessage entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeManagementAlert_externalCode` | <code>string</code> | Yes | key: TimeManagementAlert_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementAlertMessageQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeManagementAlertMessage(TimeManagementAlert_externalCode, externalCode);
```

</details>

#### EmployeeTimeNLD

<details>
<summary>listEmployeeTimeNLDs</summary>

Queries the EmployeeTimeNLD collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeNLDsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_44&#124;error`

**Sample code:**

```ballerina
Wrapper_44 result = check client->listEmployeeTimeNLDs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeNLD</summary>

Creates a new EmployeeTimeNLD entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeNLD</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ NLD&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ NLD result = check client->createEmployeeTimeNLD(payload);
```

</details>

<details>
<summary>getEmployeeTimeNLD</summary>

Retrieves a single EmployeeTimeNLD entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeNLDQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ NLD&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ NLD result = check client->getEmployeeTimeNLD(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeNLD</summary>

Updates the EmployeeTimeNLD identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ NLD</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeNLD(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeNLD</summary>

Deletes the EmployeeTimeNLD identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeNLDHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeNLD(EmployeeTime_externalCode, externalCode);
```

</details>

#### EmployeeTimeSWE

<details>
<summary>listEmployeeTimeSWEs</summary>

Queries the EmployeeTimeSWE collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeSWEsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_45&#124;error`

**Sample code:**

```ballerina
Wrapper_45 result = check client->listEmployeeTimeSWEs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeSWE</summary>

Creates a new EmployeeTimeSWE entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeSWE</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ SWE&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ SWE result = check client->createEmployeeTimeSWE(payload);
```

</details>

<details>
<summary>getEmployeeTimeSWE</summary>

Retrieves a single EmployeeTimeSWE entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeSWEQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ SWE&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ SWE result = check client->getEmployeeTimeSWE(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeSWE</summary>

Updates the EmployeeTimeSWE identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ SWE</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeSWE(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeSWE</summary>

Deletes the EmployeeTimeSWE identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeSWEHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeSWE(EmployeeTime_externalCode, externalCode);
```

</details>

#### EmployeeTimeNOR

<details>
<summary>listEmployeeTimeNORs</summary>

Queries the EmployeeTimeNOR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeNORsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_46&#124;error`

**Sample code:**

```ballerina
Wrapper_46 result = check client->listEmployeeTimeNORs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeNOR</summary>

Creates a new EmployeeTimeNOR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeNOR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ NOR&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ NOR result = check client->createEmployeeTimeNOR(payload);
```

</details>

<details>
<summary>getEmployeeTimeNOR</summary>

Retrieves a single EmployeeTimeNOR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeNORQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ NOR&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ NOR result = check client->getEmployeeTimeNOR(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeNOR</summary>

Updates the EmployeeTimeNOR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ NOR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeNOR(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeNOR</summary>

Deletes the EmployeeTimeNOR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeNORHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeNOR(EmployeeTime_externalCode, externalCode);
```

</details>

#### EmployeeTimeITA

<details>
<summary>listEmployeeTimeITAs</summary>

Queries the EmployeeTimeITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_47&#124;error`

**Sample code:**

```ballerina
Wrapper_47 result = check client->listEmployeeTimeITAs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeITA</summary>

Creates a new EmployeeTimeITA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeITA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ ITA&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ ITA result = check client->createEmployeeTimeITA(payload);
```

</details>

<details>
<summary>getEmployeeTimeITA</summary>

Retrieves a single EmployeeTimeITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ ITA&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ ITA result = check client->getEmployeeTimeITA(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeITA</summary>

Updates the EmployeeTimeITA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ ITA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeITA(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeITA</summary>

Deletes the EmployeeTimeITA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeITAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeITA(EmployeeTime_externalCode, externalCode);
```

</details>

#### EmployeeTimeCAN

<details>
<summary>listEmployeeTimeCANs</summary>

Queries the EmployeeTimeCAN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeCANsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_48&#124;error`

**Sample code:**

```ballerina
Wrapper_48 result = check client->listEmployeeTimeCANs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeCAN</summary>

Creates a new EmployeeTimeCAN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeCAN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ CAN&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ CAN result = check client->createEmployeeTimeCAN(payload);
```

</details>

<details>
<summary>getEmployeeTimeCAN</summary>

Retrieves a single EmployeeTimeCAN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeCANQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ CAN&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ CAN result = check client->getEmployeeTimeCAN(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeCAN</summary>

Updates the EmployeeTimeCAN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ CAN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeCAN(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeCAN</summary>

Deletes the EmployeeTimeCAN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeCANHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeCAN(EmployeeTime_externalCode, externalCode);
```

</details>

#### TimeManagementTerminationEndHandlingLegalEntityConfiguration

<details>
<summary>listTimeManagementTerminationEndHandlingLegalEntityConfigurations</summary>

Queries the TimeManagementTerminationEndHandlingLegalEntityConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeManagementTerminationEndHandlingLegalEntityConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_49&#124;error`

**Sample code:**

```ballerina
Wrapper_49 result = check client->listTimeManagementTerminationEndHandlingLegalEntityConfigurations();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeManagementTerminationEndHandlingLegalEntityConfiguration</summary>

Retrieves a single TimeManagementTerminationEndHandlingLegalEntityConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeManagementTerminationEndHandlingConfiguration_externalCode` | <code>string</code> | Yes | key: TimeManagementTerminationEndHandlingConfiguration_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeManagementTerminationEndHandlingLegalEntityConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Management\ Termination\ End\ Handling\ Legal\ Entity\ Configuration&#124;error`

**Sample code:**

```ballerina
Time\ Management\ Termination\ End\ Handling\ Legal\ Entity\ Configuration result = check client->getTimeManagementTerminationEndHandlingLegalEntityConfiguration(TimeManagementTerminationEndHandlingConfiguration_externalCode, externalCode);
```

</details>

#### EmployeeTimePOL

<details>
<summary>listEmployeeTimePOLs</summary>

Queries the EmployeeTimePOL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimePOLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_50&#124;error`

**Sample code:**

```ballerina
Wrapper_50 result = check client->listEmployeeTimePOLs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimePOL</summary>

Creates a new EmployeeTimePOL entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimePOL</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ POL&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ POL result = check client->createEmployeeTimePOL(payload);
```

</details>

<details>
<summary>getEmployeeTimePOL</summary>

Retrieves a single EmployeeTimePOL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimePOLQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ POL&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ POL result = check client->getEmployeeTimePOL(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimePOL</summary>

Updates the EmployeeTimePOL identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ POL</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimePOL(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimePOL</summary>

Deletes the EmployeeTimePOL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimePOLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimePOL(EmployeeTime_externalCode, externalCode);
```

</details>

#### TimeAccountPayout

<details>
<summary>listTimeAccountPayouts</summary>

Queries the TimeAccountPayout collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountPayoutsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listTimeAccountPayouts();
```

</details>

<details>
<summary>getTimeAccountPayout</summary>

Retrieves a single TimeAccountPayout entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountPayoutQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeAccountPayout(externalCode);
```

</details>

<details>
<summary>getAccountTypeNavOfTimeAccountPayout</summary>

Retrieves a single TimeAccountPayout entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAccountTypeNavOfTimeAccountPayoutQueries</code> | No | Queries to be sent with the request |

**Returns:** `TimeAccountType&#124;error`

**Sample code:**

```ballerina
TimeAccountType result = check client->getAccountTypeNavOfTimeAccountPayout(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "countryExtensionAUS": {
    "TimeAccountType_externalCode": "1000",
    "externalCode": "1000"
  },
  "periodicTimeAccountUpdateProfileNav": {
    "externalCode": "1000"
  },
  "recalculationBasedFieldList": {
    "results": [
      {
        "TimeAccountType_externalCode": "1000",
        "recalcField": "string"
      }
    ]
  },
  "timeAccountPayoutProfileNav": {
    "externalCode": "1000"
  },
  "timeAccountPurchaseProfileNav": {
    "externalCode": "1000",
    "deductionPayComponents": {
      "results": []
    }
  }
}
```

</details>

<details>
<summary>getTimeAccountDetailNavOfTimeAccountPayout</summary>

Retrieves a single TimeAccountPayout entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountDetailNavOfTimeAccountPayoutQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeAccountDetailNavOfTimeAccountPayout(externalCode);
```

</details>

<details>
<summary>getTimeAccountNavOfTimeAccountPayout</summary>

Retrieves a single TimeAccountPayout entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountNavOfTimeAccountPayoutQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getTimeAccountNavOfTimeAccountPayout(externalCode);
```

</details>

#### TimeAccountPayoutProfile

<details>
<summary>listTimeAccountPayoutProfiles</summary>

Queries the TimeAccountPayoutProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountPayoutProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_51&#124;error`

**Sample code:**

```ballerina
Wrapper_51 result = check client->listTimeAccountPayoutProfiles();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountPayoutProfile</summary>

Retrieves a single TimeAccountPayoutProfile entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountPayoutProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Payout\ Profile&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Payout\ Profile result = check client->getTimeAccountPayoutProfile(externalCode);
```

</details>

#### TimeAccountSummary

<details>
<summary>listTimeAccountSummarys</summary>

Queries the TimeAccountSummary collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountSummarysQueries</code> | No | Queries to be sent with the request |

**Returns:** `CollectionofTime\ Account\ Summary&#124;error`

**Sample code:**

```ballerina
CollectionofTime\ Account\ Summary result = check client->listTimeAccountSummarys();
```

</details>

<details>
<summary>getTimeAccountSummary</summary>

Retrieves a single TimeAccountSummary entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountSummaryQueries</code> | No | Queries to be sent with the request |

**Returns:** `TimeAccountSummary&#124;error`

**Sample code:**

```ballerina
TimeAccountSummary result = check client->getTimeAccountSummary(externalCode);
```

**Sample response:**

```json
{
  "createdBy": "string",
  "createdDateTime": "2026-01-01",
  "entityUUID": "1000",
  "externalCode": "1000",
  "lastModifiedBy": "string",
  "lastModifiedDateTime": "2026-01-01",
  "mdfSystemRecordStatus": "string"
}
```

</details>

#### TimeAccountTypeAUS

<details>
<summary>listTimeAccountTypeAUSs</summary>

Queries the TimeAccountTypeAUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeAccountTypeAUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_52&#124;error`

**Sample code:**

```ballerina
Wrapper_52 result = check client->listTimeAccountTypeAUSs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeAccountTypeAUS</summary>

Retrieves a single TimeAccountTypeAUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeAccountType_externalCode` | <code>string</code> | Yes | key: TimeAccountType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeAccountTypeAUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Account\ Type\ AUS&#124;error`

**Sample code:**

```ballerina
Time\ Account\ Type\ AUS result = check client->getTimeAccountTypeAUS(TimeAccountType_externalCode, externalCode);
```

</details>

#### PeriodicTimeAccountUpdateProfile

<details>
<summary>listPeriodicTimeAccountUpdateProfiles</summary>

Queries the PeriodicTimeAccountUpdateProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPeriodicTimeAccountUpdateProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_53&#124;error`

**Sample code:**

```ballerina
Wrapper_53 result = check client->listPeriodicTimeAccountUpdateProfiles();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getPeriodicTimeAccountUpdateProfile</summary>

Retrieves a single PeriodicTimeAccountUpdateProfile entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPeriodicTimeAccountUpdateProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `Periodic\ Time\ Account\ Update\ Profile&#124;error`

**Sample code:**

```ballerina
Periodic\ Time\ Account\ Update\ Profile result = check client->getPeriodicTimeAccountUpdateProfile(externalCode);
```

</details>

#### AvailableTimeType

<details>
<summary>listAvailableTimeTypes</summary>

Queries the AvailableTimeType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAvailableTimeTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_54&#124;error`

**Sample code:**

```ballerina
Wrapper_54 result = check client->listAvailableTimeTypes();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getAvailableTimeType</summary>

Retrieves a single AvailableTimeType entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeTypeProfile_externalCode` | <code>string</code> | Yes | key: TimeTypeProfile_externalCode |
| `TimeTypeProfile_mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: TimeTypeProfile_mdfSystemEffectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAvailableTimeTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `Available\ Time\ Type&#124;error`

**Sample code:**

```ballerina
Available\ Time\ Type result = check client->getAvailableTimeType(TimeTypeProfile_externalCode, TimeTypeProfile_mdfSystemEffectiveStartDate, externalCode);
```

</details>

#### WorkSchedule

<details>
<summary>listWorkSchedules</summary>

Queries the WorkSchedule collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkSchedulesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_55&#124;error`

**Sample code:**

```ballerina
Wrapper_55 result = check client->listWorkSchedules();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createWorkSchedule</summary>

Creates a new WorkSchedule entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WorkSchedule</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedWork\ Schedule&#124;error`

**Sample code:**

```ballerina
CreatedWork\ Schedule result = check client->createWorkSchedule(payload);
```

</details>

<details>
<summary>getWorkSchedule</summary>

Retrieves a single WorkSchedule entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule&#124;error`

**Sample code:**

```ballerina
Work\ Schedule result = check client->getWorkSchedule(externalCode);
```

</details>

<details>
<summary>updateWorkSchedule</summary>

Updates the WorkSchedule identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedWork\ Schedule</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWorkSchedule(externalCode, payload);
```

</details>

<details>
<summary>deleteWorkSchedule</summary>

Deletes the WorkSchedule identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteWorkScheduleHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWorkSchedule(externalCode);
```

</details>

#### EmployeeTimeAUS

<details>
<summary>listEmployeeTimeAUSs</summary>

Queries the EmployeeTimeAUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeAUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_56&#124;error`

**Sample code:**

```ballerina
Wrapper_56 result = check client->listEmployeeTimeAUSs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createEmployeeTimeAUS</summary>

Creates a new EmployeeTimeAUS entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTimeAUS</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmployee\ Time\ AUS&#124;error`

**Sample code:**

```ballerina
CreatedEmployee\ Time\ AUS result = check client->createEmployeeTimeAUS(payload);
```

</details>

<details>
<summary>getEmployeeTimeAUS</summary>

Retrieves a single EmployeeTimeAUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeAUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `Employee\ Time\ AUS&#124;error`

**Sample code:**

```ballerina
Employee\ Time\ AUS result = check client->getEmployeeTimeAUS(EmployeeTime_externalCode, externalCode);
```

</details>

<details>
<summary>updateEmployeeTimeAUS</summary>

Updates the EmployeeTimeAUS identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmployee\ Time\ AUS</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmployeeTimeAUS(EmployeeTime_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEmployeeTimeAUS</summary>

Deletes the EmployeeTimeAUS identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeAUSHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTimeAUS(EmployeeTime_externalCode, externalCode);
```

</details>

#### WorkScheduleDayModelSegment

<details>
<summary>listWorkScheduleDayModelSegments</summary>

Queries the WorkScheduleDayModelSegment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkScheduleDayModelSegmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_57&#124;error`

**Sample code:**

```ballerina
Wrapper_57 result = check client->listWorkScheduleDayModelSegments();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>createWorkScheduleDayModelSegment</summary>

Creates a new WorkScheduleDayModelSegment entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WorkScheduleDayModelSegment</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedWork\ Schedule\ Day\ Model\ Segment&#124;error`

**Sample code:**

```ballerina
CreatedWork\ Schedule\ Day\ Model\ Segment result = check client->createWorkScheduleDayModelSegment(payload);
```

</details>

<details>
<summary>getWorkScheduleDayModelSegment</summary>

Retrieves a single WorkScheduleDayModelSegment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModel_externalCode` | <code>string</code> | Yes | key: WorkScheduleDayModel_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkScheduleDayModelSegmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `Work\ Schedule\ Day\ Model\ Segment&#124;error`

**Sample code:**

```ballerina
Work\ Schedule\ Day\ Model\ Segment result = check client->getWorkScheduleDayModelSegment(WorkScheduleDayModel_externalCode, externalCode);
```

</details>

<details>
<summary>updateWorkScheduleDayModelSegment</summary>

Updates the WorkScheduleDayModelSegment identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModel_externalCode` | <code>string</code> | Yes | key: WorkScheduleDayModel_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedWork\ Schedule\ Day\ Model\ Segment</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWorkScheduleDayModelSegment(WorkScheduleDayModel_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteWorkScheduleDayModelSegment</summary>

Deletes the WorkScheduleDayModelSegment identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `WorkScheduleDayModel_externalCode` | <code>string</code> | Yes | key: WorkScheduleDayModel_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteWorkScheduleDayModelSegmentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWorkScheduleDayModelSegment(WorkScheduleDayModel_externalCode, externalCode);
```

</details>

#### RecalculationBasedField

<details>
<summary>listRecalculationBasedFields</summary>

Queries the RecalculationBasedField collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRecalculationBasedFieldsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_58&#124;error`

**Sample code:**

```ballerina
Wrapper_58 result = check client->listRecalculationBasedFields();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getRecalculationBasedField</summary>

Retrieves a single RecalculationBasedField entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeAccountType_externalCode` | <code>string</code> | Yes | key: TimeAccountType_externalCode |
| `recalcField` | <code>string</code> | Yes | key: recalcField |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRecalculationBasedFieldQueries</code> | No | Queries to be sent with the request |

**Returns:** `Recalculation\ Based\ Field&#124;error`

**Sample code:**

```ballerina
Recalculation\ Based\ Field result = check client->getRecalculationBasedField(TimeAccountType_externalCode, recalcField);
```

</details>

#### Holiday

<details>
<summary>listHolidays</summary>

Queries the Holiday collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHolidaysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_59&#124;error`

**Sample code:**

```ballerina
Wrapper_59 result = check client->listHolidays();
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

</details>

<details>
<summary>getHoliday</summary>

Retrieves a single Holiday entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `holidayCode` | <code>string</code> | Yes | key: holidayCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHolidayQueries</code> | No | Queries to be sent with the request |

**Returns:** `Holiday&#124;error`

**Sample code:**

```ballerina
Holiday result = check client->getHoliday(holidayCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

#### EmployeeTimeCalendar

<details>
<summary>listEmployeeTimeCalendars</summary>

Queries the EmployeeTimeCalendar collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimeCalendarsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimeCalendars();
```

</details>

<details>
<summary>getEmployeeTimeCalendar</summary>

Retrieves a single EmployeeTimeCalendar entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeTime_externalCode` | <code>string</code> | Yes | key: EmployeeTime_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeCalendarQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTimeCalendar(EmployeeTime_externalCode, externalCode);
```

</details>

#### TimeTypeAUS

<details>
<summary>listTimeTypeAUSs</summary>

Queries the TimeTypeAUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTimeTypeAUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_61&#124;error`

**Sample code:**

```ballerina
Wrapper_61 result = check client->listTimeTypeAUSs();
```

**Sample response:**

```json
{
  "d": {}
}
```

</details>

<details>
<summary>getTimeTypeAUS</summary>

Retrieves a single TimeTypeAUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `TimeType_externalCode` | <code>string</code> | Yes | key: TimeType_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTimeTypeAUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `Time\ Type\ AUS&#124;error`

**Sample code:**

```ballerina
Time\ Type\ AUS result = check client->getTimeTypeAUS(TimeType_externalCode, externalCode);
```

</details>

#### EmployeeTime

<details>
<summary>listEmployeeTimes</summary>

Queries the EmployeeTime collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTimesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listEmployeeTimes();
```

</details>

<details>
<summary>getEmployeeTime</summary>

Retrieves a single EmployeeTime entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTimeQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getEmployeeTime(externalCode);
```

</details>

<details>
<summary>deleteEmployeeTime</summary>

Deletes the EmployeeTime identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmployeeTimeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmployeeTime(externalCode);
```

</details>
