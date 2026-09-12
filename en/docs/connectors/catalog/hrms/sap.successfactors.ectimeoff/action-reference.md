---
connector: true
connector_name: "sap.successfactors.ectimeoff"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ectimeoff` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ectimeoff objects — TimeAccountPostingRule, WorkScheduleDayModelVariantAssignment, HolidayAssignment, TimeAccountPurchaseProfile, TimeTypeCAN, WorkScheduleDayModelVariantIdentifier, TimeManagementTerminationEndHandlingExcludedEventReason, TimeAccountPurchaseProfilePayComponentAssignment… — over the SAP SuccessFactors OData v2 API. |

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

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountPostingRule</summary>

<div>

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

</div>
</details>

#### WorkScheduleDayModelVariantAssignment

<details>
<summary>listWorkScheduleDayModelVariantAssignments</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDayModelVariantAssignment</summary>

<div>

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

</div>
</details>

#### HolidayAssignment

<details>
<summary>listHolidayAssignments</summary>

<div>

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

</div>
</details>

<details>
<summary>getHolidayAssignment</summary>

<div>

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

</div>
</details>

#### TimeAccountPurchaseProfile

<details>
<summary>listTimeAccountPurchaseProfiles</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountPurchaseProfile</summary>

<div>

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

</div>
</details>

#### TimeTypeCAN

<details>
<summary>listTimeTypeCANs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeCAN</summary>

<div>

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

</div>
</details>

#### WorkScheduleDayModelVariantIdentifier

<details>
<summary>listWorkScheduleDayModelVariantIdentifiers</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDayModelVariantIdentifier</summary>

<div>

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

</div>
</details>

#### TimeManagementTerminationEndHandlingExcludedEventReason

<details>
<summary>listTimeManagementTerminationEndHandlingExcludedEventReasons</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementTerminationEndHandlingExcludedEventReason</summary>

<div>

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

</div>
</details>

#### TimeAccountPurchaseProfilePayComponentAssignment

<details>
<summary>listTimeAccountPurchaseProfilePayComponentAssignments</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountPurchaseProfilePayComponentAssignment</summary>

<div>

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

</div>
</details>

#### EmployeeTimeGroupItem

<details>
<summary>listEmployeeTimeGroupItems</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeGroupItem</summary>

<div>

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

</div>
</details>

#### WorkScheduleDayModelAssignment

<details>
<summary>listWorkScheduleDayModelAssignments</summary>

<div>

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

</div>
</details>

<details>
<summary>createWorkScheduleDayModelAssignment</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDayModelAssignment</summary>

<div>

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

</div>
</details>

<details>
<summary>updateWorkScheduleDayModelAssignment</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteWorkScheduleDayModelAssignment</summary>

<div>

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

</div>
</details>

#### TimeAccountDetail

<details>
<summary>listTimeAccountDetails</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountDetail</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteTimeAccountDetail</summary>

<div>

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

</div>
</details>

#### TimeTypeNLD

<details>
<summary>listTimeTypeNLDs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeNLD</summary>

<div>

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

</div>
</details>

#### TimeTypeSWE

<details>
<summary>listTimeTypeSWEs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeSWE</summary>

<div>

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

</div>
</details>

#### TimeTypeNOR

<details>
<summary>listTimeTypeNORs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeNOR</summary>

<div>

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

</div>
</details>

#### TimeTypeITA

<details>
<summary>listTimeTypeITAs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeITA</summary>

<div>

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

</div>
</details>

#### AbsenceCountingMethod

<details>
<summary>listAbsenceCountingMethods</summary>

<div>

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

</div>
</details>

<details>
<summary>getAbsenceCountingMethod</summary>

<div>

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

</div>
</details>

#### ShiftClassification

<details>
<summary>listShiftClassifications</summary>

<div>

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

</div>
</details>

<details>
<summary>getShiftClassification</summary>

<div>

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

</div>
</details>

#### WorkScheduleDay

<details>
<summary>listWorkScheduleDays</summary>

<div>

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

</div>
</details>

<details>
<summary>createWorkScheduleDay</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDay</summary>

<div>

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

</div>
</details>

<details>
<summary>updateWorkScheduleDay</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteWorkScheduleDay</summary>

<div>

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

</div>
</details>

#### HolidayCalendar

<details>
<summary>listHolidayCalendars</summary>

<div>

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

</div>
</details>

<details>
<summary>getHolidayCalendar</summary>

<div>

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

</div>
</details>

#### TimeManagementTerminationEndHandlingExcludedTimeAccountType

<details>
<summary>listTimeManagementTerminationEndHandlingExcludedTimeAccountTypes</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementTerminationEndHandlingExcludedTimeAccountType</summary>

<div>

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

</div>
</details>

#### EmployeeTimeDEU

<details>
<summary>listEmployeeTimeDEUs</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeDEU</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeDEU</summary>

<div>

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

</div>
</details>

#### TimeAccount

<details>
<summary>listTimeAccounts</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccount</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteTimeAccount</summary>

<div>

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

</div>
</details>

#### WorkScheduleDayModelAssignmentSegment

<details>
<summary>listWorkScheduleDayModelAssignmentSegments</summary>

<div>

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

</div>
</details>

<details>
<summary>createWorkScheduleDayModelAssignmentSegment</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDayModelAssignmentSegment</summary>

<div>

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

</div>
</details>

<details>
<summary>updateWorkScheduleDayModelAssignmentSegment</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteWorkScheduleDayModelAssignmentSegment</summary>

<div>

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

</div>
</details>

#### EmployeeTimeCOL

<details>
<summary>listEmployeeTimeCOLs</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeCOL</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeCOL</summary>

<div>

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

</div>
</details>

#### EmployeeTimeESP

<details>
<summary>listEmployeeTimeESPs</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeESP</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeESP</summary>

<div>

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

</div>
</details>

#### TimeManagementTerminationEndHandlingConfiguration

<details>
<summary>listTimeManagementTerminationEndHandlingConfigurations</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementTerminationEndHandlingConfiguration</summary>

<div>

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

</div>
</details>

#### HolidayCategory

<details>
<summary>listHolidayCategorys</summary>

<div>

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

</div>
</details>

<details>
<summary>getHolidayCategory</summary>

<div>

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

</div>
</details>

#### ElectronicSicknessCertificateExclusionReasonDEU

<details>
<summary>listElectronicSicknessCertificateExclusionReasonDEUs</summary>

<div>

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

</div>
</details>

<details>
<summary>getElectronicSicknessCertificateExclusionReasonDEU</summary>

<div>

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

</div>
</details>

#### EmployeeTimeGroup

<details>
<summary>listEmployeeTimeGroups</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeGroup</summary>

<div>

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

</div>
</details>

#### TimeAccountType

<details>
<summary>listTimeAccountTypes</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountType</summary>

<div>

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

</div>
</details>

#### AccrualCalculationBase

<details>
<summary>listAccrualCalculationBases</summary>

<div>

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

</div>
</details>

<details>
<summary>createAccrualCalculationBase</summary>

<div>

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

</div>
</details>

<details>
<summary>getAccrualCalculationBase</summary>

<div>

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

</div>
</details>

<details>
<summary>updateAccrualCalculationBase</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteAccrualCalculationBase</summary>

<div>

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

</div>
</details>

#### EmployeeTimeUSA

<details>
<summary>listEmployeeTimeUSAs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeUSA</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeUSA</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeUSA</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeUSA</summary>

<div>

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

</div>
</details>

#### TimeTypeUSA

<details>
<summary>listTimeTypeUSAs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeUSA</summary>

<div>

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

</div>
</details>

#### TemporaryTimeInformation

<details>
<summary>listTemporaryTimeInformations</summary>

<div>

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

</div>
</details>

<details>
<summary>createTemporaryTimeInformation</summary>

<div>

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

</div>
</details>

<details>
<summary>getTemporaryTimeInformation</summary>

<div>

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

</div>
</details>

<details>
<summary>updateTemporaryTimeInformation</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteTemporaryTimeInformation</summary>

<div>

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

</div>
</details>

#### TimeTypeProfile

<details>
<summary>listTimeTypeProfiles</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeProfile</summary>

<div>

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

</div>
</details>

#### TimeManagementAlert

<details>
<summary>listTimeManagementAlerts</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementAlert</summary>

<div>

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

</div>
</details>

#### TimeTypeDEU

<details>
<summary>listTimeTypeDEUs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeDEU</summary>

<div>

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

</div>
</details>

#### TimeType

<details>
<summary>listTimeTypes</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeType</summary>

<div>

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

</div>
</details>

#### TimeManagementTerminationEndHandlingExclusion

<details>
<summary>listTimeManagementTerminationEndHandlingExclusions</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementTerminationEndHandlingExclusion</summary>

<div>

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

</div>
</details>

#### EmployeeTimeMEX

<details>
<summary>listEmployeeTimeMEXs</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeMEX</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeMEX</summary>

<div>

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

</div>
</details>

#### WorkScheduleDayModel

<details>
<summary>listWorkScheduleDayModels</summary>

<div>

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

</div>
</details>

<details>
<summary>createWorkScheduleDayModel</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDayModel</summary>

<div>

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

</div>
</details>

<details>
<summary>updateWorkScheduleDayModel</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteWorkScheduleDayModel</summary>

<div>

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

</div>
</details>

#### TimeAccountSnapshot

<details>
<summary>listTimeAccountSnapshots</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountSnapshot</summary>

<div>

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

</div>
</details>

#### EmpTimeAccountBalance

<details>
<summary>listEmpTimeAccountBalances</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmpTimeAccountBalance</summary>

<div>

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

</div>
</details>

#### TimeManagementAlertMessage

<details>
<summary>listTimeManagementAlertMessages</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementAlertMessage</summary>

<div>

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

</div>
</details>

#### EmployeeTimeNLD

<details>
<summary>listEmployeeTimeNLDs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeNLD</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeNLD</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeNLD</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeNLD</summary>

<div>

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

</div>
</details>

#### EmployeeTimeSWE

<details>
<summary>listEmployeeTimeSWEs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeSWE</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeSWE</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeSWE</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeSWE</summary>

<div>

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

</div>
</details>

#### EmployeeTimeNOR

<details>
<summary>listEmployeeTimeNORs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeNOR</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeNOR</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeNOR</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeNOR</summary>

<div>

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

</div>
</details>

#### EmployeeTimeITA

<details>
<summary>listEmployeeTimeITAs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeITA</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeITA</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeITA</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeITA</summary>

<div>

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

</div>
</details>

#### EmployeeTimeCAN

<details>
<summary>listEmployeeTimeCANs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeCAN</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeCAN</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeCAN</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeCAN</summary>

<div>

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

</div>
</details>

#### TimeManagementTerminationEndHandlingLegalEntityConfiguration

<details>
<summary>listTimeManagementTerminationEndHandlingLegalEntityConfigurations</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeManagementTerminationEndHandlingLegalEntityConfiguration</summary>

<div>

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

</div>
</details>

#### EmployeeTimePOL

<details>
<summary>listEmployeeTimePOLs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimePOL</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimePOL</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimePOL</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimePOL</summary>

<div>

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

</div>
</details>

#### TimeAccountPayout

<details>
<summary>listTimeAccountPayouts</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountPayout</summary>

<div>

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

</div>
</details>

<details>
<summary>getAccountTypeNavOfTimeAccountPayout</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountDetailNavOfTimeAccountPayout</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountNavOfTimeAccountPayout</summary>

<div>

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

</div>
</details>

#### TimeAccountPayoutProfile

<details>
<summary>listTimeAccountPayoutProfiles</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountPayoutProfile</summary>

<div>

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

</div>
</details>

#### TimeAccountSummary

<details>
<summary>listTimeAccountSummarys</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountSummary</summary>

<div>

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

</div>
</details>

#### TimeAccountTypeAUS

<details>
<summary>listTimeAccountTypeAUSs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeAccountTypeAUS</summary>

<div>

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

</div>
</details>

#### PeriodicTimeAccountUpdateProfile

<details>
<summary>listPeriodicTimeAccountUpdateProfiles</summary>

<div>

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

</div>
</details>

<details>
<summary>getPeriodicTimeAccountUpdateProfile</summary>

<div>

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

</div>
</details>

#### AvailableTimeType

<details>
<summary>listAvailableTimeTypes</summary>

<div>

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

</div>
</details>

<details>
<summary>getAvailableTimeType</summary>

<div>

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

</div>
</details>

#### WorkSchedule

<details>
<summary>listWorkSchedules</summary>

<div>

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

</div>
</details>

<details>
<summary>createWorkSchedule</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkSchedule</summary>

<div>

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

</div>
</details>

<details>
<summary>updateWorkSchedule</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteWorkSchedule</summary>

<div>

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

</div>
</details>

#### EmployeeTimeAUS

<details>
<summary>listEmployeeTimeAUSs</summary>

<div>

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

</div>
</details>

<details>
<summary>createEmployeeTimeAUS</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeAUS</summary>

<div>

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

</div>
</details>

<details>
<summary>updateEmployeeTimeAUS</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTimeAUS</summary>

<div>

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

</div>
</details>

#### WorkScheduleDayModelSegment

<details>
<summary>listWorkScheduleDayModelSegments</summary>

<div>

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

</div>
</details>

<details>
<summary>createWorkScheduleDayModelSegment</summary>

<div>

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

</div>
</details>

<details>
<summary>getWorkScheduleDayModelSegment</summary>

<div>

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

</div>
</details>

<details>
<summary>updateWorkScheduleDayModelSegment</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteWorkScheduleDayModelSegment</summary>

<div>

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

</div>
</details>

#### RecalculationBasedField

<details>
<summary>listRecalculationBasedFields</summary>

<div>

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

</div>
</details>

<details>
<summary>getRecalculationBasedField</summary>

<div>

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

</div>
</details>

#### Holiday

<details>
<summary>listHolidays</summary>

<div>

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

</div>
</details>

<details>
<summary>getHoliday</summary>

<div>

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

</div>
</details>

#### EmployeeTimeCalendar

<details>
<summary>listEmployeeTimeCalendars</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTimeCalendar</summary>

<div>

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

</div>
</details>

#### TimeTypeAUS

<details>
<summary>listTimeTypeAUSs</summary>

<div>

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

</div>
</details>

<details>
<summary>getTimeTypeAUS</summary>

<div>

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

</div>
</details>

#### EmployeeTime

<details>
<summary>listEmployeeTimes</summary>

<div>

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

</div>
</details>

<details>
<summary>getEmployeeTime</summary>

<div>

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

</div>
</details>

<details>
<summary>deleteEmployeeTime</summary>

<div>

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

</div>
</details>

