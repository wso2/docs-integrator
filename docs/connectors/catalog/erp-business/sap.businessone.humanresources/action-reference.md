# Actions

The `ballerinax/sap.businessone.humanresources` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage SAP Business One human resources objects — employee master data, positions, roles, statuses, transfers, teams, and HR reference data — through the Service Layer (OData). |

---

## Client

The `Client` connects to the SAP Business One Service Layer and exposes CRUD and query operations for all human resources objects — employee master data, positions, roles, statuses, transfers, teams, and HR reference data.

### Configuration

**Session Configuration** (`businessone:SessionConfig`) — required for every client instance; the client logs in with these credentials and manages the resulting session cookie automatically.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database name |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer password |

**Connection Configuration** (`ConnectionConfig`) — optional HTTP behavior settings passed as the second argument to `init`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | - | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | - | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | - | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | - | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | - | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | - | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | - | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which is provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side, treating `nil` values as optional |

### Initializing the client

```ballerina
import ballerinax/sap.businessone.humanresources;

humanresources:Client humanResourcesClient = check new (
    {companyDb: "SBODemoUS", username: "manager", password: ""},
    serviceUrl = "https://<host>:50000/b1s/v1"
);
```

### Operations

#### Employees Info

<details>
<summary>listEmployeesInfo</summary>

Queries the `EmployeesInfo` collection of employee master data records, with support for OData paging, filtering, and expansion.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeesInfoHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer` for server paging |
| `queries` | <code>ListEmployeesInfoQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeesInfoCollectionResponse|error`

**Sample code:**

```ballerina
EmployeesInfoCollectionResponse response = check humanResourcesClient->listEmployeesInfo(
    queries = {dollarTop: 10, dollarSelect: "EmployeeID,FirstName,LastName"}
);
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeesInfo",
  "value": [
    {
      "EmployeeID": 101,
      "FirstName": "Jane",
      "LastName": "Doe"
    }
  ]
}
```

</details>

<details>
<summary>createEmployeesInfo</summary>

Creates a new `EmployeeInfo` employee master data record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeInfo</code> | Yes | The employee record to create |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeeInfo|error`

**Sample code:**

```ballerina
EmployeeInfo created = check humanResourcesClient->createEmployeesInfo({
    FirstName: "Jane",
    LastName: "Doe",
    Gender: "gt_Female",
    StartDate: "2026-07-13"
});
```

**Sample response:**

```json
{
  "EmployeeID": 101,
  "FirstName": "Jane",
  "LastName": "Doe",
  "Gender": "gt_Female",
  "StartDate": "2026-07-13"
}
```

</details>

<details>
<summary>getEmployeesInfo</summary>

Retrieves a single `EmployeeInfo` record by its `EmployeeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeID` | <code>int:Signed32</code> | Yes | Key property 'EmployeeID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeesInfoQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeeInfo|error`

**Sample code:**

```ballerina
EmployeeInfo employee = check humanResourcesClient->getEmployeesInfo(101);
```

**Sample response:**

```json
{
  "EmployeeID": 101,
  "FirstName": "Jane",
  "LastName": "Doe",
  "Gender": "gt_Female",
  "StartDate": "2026-07-13"
}
```

</details>

<details>
<summary>deleteEmployeesInfo</summary>

Deletes an `EmployeeInfo` record by its `EmployeeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeID` | <code>int:Signed32</code> | Yes | Key property 'EmployeeID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeesInfo(101);
```

</details>

<details>
<summary>updateEmployeesInfo</summary>

Partially updates an `EmployeeInfo` record (PATCH/MERGE semantics) by its `EmployeeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeID` | <code>int:Signed32</code> | Yes | Key property 'EmployeeID' (Edm.Int32) |
| `payload` | <code>EmployeeInfo</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeesInfo(101, {JobTitle: "Senior Consultant"});
```

</details>

<details>
<summary>employeesInfoCancel</summary>

Invokes the bound action `Cancel` on an `EmployeeInfo` record, cancelling the employee record by its `EmployeeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeID` | <code>int:Signed32</code> | Yes | Key property 'EmployeeID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->employeesInfoCancel(101);
```

</details>

<details>
<summary>employeesInfoClose</summary>

Invokes the bound action `Close` on an `EmployeeInfo` record, closing the employee record by its `EmployeeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeID` | <code>int:Signed32</code> | Yes | Key property 'EmployeeID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->employeesInfoClose(101);
```

</details>

#### Employee Positions

<details>
<summary>listEmployeePosition</summary>

Queries the `EmployeePosition` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeePositionHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeePositionQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeePositionCollectionResponse|error`

**Sample code:**

```ballerina
EmployeePositionCollectionResponse response = check humanResourcesClient->listEmployeePosition();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeePosition",
  "value": [
    {
      "PositionID": 1,
      "Name": "Consultant",
      "Description": "Consulting staff position"
    }
  ]
}
```

</details>

<details>
<summary>createEmployeePosition</summary>

Creates a new `EmployeePosition` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeePosition</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeePosition|error`

**Sample code:**

```ballerina
EmployeePosition created = check humanResourcesClient->createEmployeePosition({
    Name: "Consultant",
    Description: "Consulting staff position"
});
```

**Sample response:**

```json
{
  "PositionID": 1,
  "Name": "Consultant",
  "Description": "Consulting staff position"
}
```

</details>

<details>
<summary>getEmployeePosition</summary>

Retrieves a single `EmployeePosition` record by its `PositionID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `positionID` | <code>int:Signed32</code> | Yes | Key property 'PositionID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeePositionQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeePosition|error`

**Sample code:**

```ballerina
EmployeePosition position = check humanResourcesClient->getEmployeePosition(1);
```

**Sample response:**

```json
{
  "PositionID": 1,
  "Name": "Consultant",
  "Description": "Consulting staff position"
}
```

</details>

<details>
<summary>deleteEmployeePosition</summary>

Deletes an `EmployeePosition` record by its `PositionID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `positionID` | <code>int:Signed32</code> | Yes | Key property 'PositionID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeePosition(1);
```

</details>

<details>
<summary>updateEmployeePosition</summary>

Partially updates an `EmployeePosition` record (PATCH/MERGE semantics) by its `PositionID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `positionID` | <code>int:Signed32</code> | Yes | Key property 'PositionID' (Edm.Int32) |
| `payload` | <code>EmployeePosition</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeePosition(1, {Description: "Senior consulting staff position"});
```

</details>

<details>
<summary>employeePositionServiceGetList</summary>

Calls the `EmployeePositionService_GetList` function import to retrieve the lightweight list of employee positions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 result = check humanResourcesClient->employeePositionServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeePositionService_GetList",
  "value": [
    {
      "PositionID": 1,
      "Name": "Consultant"
    }
  ]
}
```

</details>

#### Employee Roles Setup

<details>
<summary>listEmployeeRolesSetup</summary>

Queries the `EmployeeRolesSetup` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeeRolesSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeRolesSetupQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeeRolesSetupCollectionResponse|error`

**Sample code:**

```ballerina
EmployeeRolesSetupCollectionResponse response = check humanResourcesClient->listEmployeeRolesSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeRolesSetup",
  "value": [
    {
      "TypeID": 1,
      "Name": "Approver",
      "Description": "Approves employee requests"
    }
  ]
}
```

</details>

<details>
<summary>createEmployeeRolesSetup</summary>

Creates a new `EmployeeRoleSetup` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeRoleSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeeRoleSetup|error`

**Sample code:**

```ballerina
EmployeeRoleSetup created = check humanResourcesClient->createEmployeeRolesSetup({
    Name: "Approver",
    Description: "Approves employee requests"
});
```

**Sample response:**

```json
{
  "TypeID": 1,
  "Name": "Approver",
  "Description": "Approves employee requests"
}
```

</details>

<details>
<summary>getEmployeeRolesSetup</summary>

Retrieves a single `EmployeeRoleSetup` record by its `TypeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeID` | <code>int:Signed32</code> | Yes | Key property 'TypeID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeRolesSetupQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeeRoleSetup|error`

**Sample code:**

```ballerina
EmployeeRoleSetup role = check humanResourcesClient->getEmployeeRolesSetup(1);
```

**Sample response:**

```json
{
  "TypeID": 1,
  "Name": "Approver",
  "Description": "Approves employee requests"
}
```

</details>

<details>
<summary>deleteEmployeeRolesSetup</summary>

Deletes an `EmployeeRoleSetup` record by its `TypeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeID` | <code>int:Signed32</code> | Yes | Key property 'TypeID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeeRolesSetup(1);
```

</details>

<details>
<summary>updateEmployeeRolesSetup</summary>

Partially updates an `EmployeeRoleSetup` record (PATCH/MERGE semantics) by its `TypeID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeID` | <code>int:Signed32</code> | Yes | Key property 'TypeID' (Edm.Int32) |
| `payload` | <code>EmployeeRoleSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeeRolesSetup(1, {Description: "Approves and escalates employee requests"});
```

</details>

<details>
<summary>employeeRolesSetupServiceGetEmployeeRoleSetupList</summary>

Calls the `EmployeeRolesSetupService_GetEmployeeRoleSetupList` function import to retrieve the employee role setup list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check humanResourcesClient->employeeRolesSetupServiceGetEmployeeRoleSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeRolesSetupService_GetEmployeeRoleSetupList",
  "value": [
    {
      "TypeID": 1,
      "Name": "Approver"
    }
  ]
}
```

</details>

#### Employee Status

<details>
<summary>listEmployeeStatus</summary>

Queries the `EmployeeStatus` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeeStatusHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeStatusQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeeStatusCollectionResponse|error`

**Sample code:**

```ballerina
EmployeeStatusCollectionResponse response = check humanResourcesClient->listEmployeeStatus();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeStatus",
  "value": [
    {
      "StatusId": 1,
      "Name": "Active",
      "Description": "Currently employed"
    }
  ]
}
```

</details>

<details>
<summary>createEmployeeStatus</summary>

Creates a new `EmployeeStatus` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeStatus</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeeStatus|error`

**Sample code:**

```ballerina
EmployeeStatus created = check humanResourcesClient->createEmployeeStatus({
    Name: "Active",
    Description: "Currently employed"
});
```

**Sample response:**

```json
{
  "StatusId": 1,
  "Name": "Active",
  "Description": "Currently employed"
}
```

</details>

<details>
<summary>getEmployeeStatus</summary>

Retrieves a single `EmployeeStatus` record by its `StatusId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `statusId` | <code>int:Signed32</code> | Yes | Key property 'StatusId' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeStatusQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeeStatus|error`

**Sample code:**

```ballerina
EmployeeStatus status = check humanResourcesClient->getEmployeeStatus(1);
```

**Sample response:**

```json
{
  "StatusId": 1,
  "Name": "Active",
  "Description": "Currently employed"
}
```

</details>

<details>
<summary>deleteEmployeeStatus</summary>

Deletes an `EmployeeStatus` record by its `StatusId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `statusId` | <code>int:Signed32</code> | Yes | Key property 'StatusId' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeeStatus(1);
```

</details>

<details>
<summary>updateEmployeeStatus</summary>

Partially updates an `EmployeeStatus` record (PATCH/MERGE semantics) by its `StatusId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `statusId` | <code>int:Signed32</code> | Yes | Key property 'StatusId' (Edm.Int32) |
| `payload` | <code>EmployeeStatus</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeeStatus(1, {Description: "Currently employed, full-time"});
```

</details>

<details>
<summary>employeeStatusServiceGetList</summary>

Calls the `EmployeeStatusService_GetList` function import to retrieve the lightweight list of employee statuses.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
inline_response_200_3 result = check humanResourcesClient->employeeStatusServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeStatusService_GetList",
  "value": [
    {
      "StatusId": 1,
      "Name": "Active"
    }
  ]
}
```

</details>

#### Employee Transfers

<details>
<summary>listEmployeeTransfers</summary>

Queries the `EmployeeTransfers` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeeTransfersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeTransfersQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeeTransfersCollectionResponse|error`

**Sample code:**

```ballerina
EmployeeTransfersCollectionResponse response = check humanResourcesClient->listEmployeeTransfers();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeTransfers",
  "value": [
    {
      "TransferID": 1,
      "TransStartDate": "2026-07-01",
      "TransEndDate": "2026-07-13",
      "Status": "ets_New",
      "Comment": "Department transfer"
    }
  ]
}
```

</details>

<details>
<summary>createEmployeeTransfers</summary>

Creates a new `EmployeeTransfer` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeTransfer</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeeTransfer|error`

**Sample code:**

```ballerina
EmployeeTransfer created = check humanResourcesClient->createEmployeeTransfers({
    TransStartDate: "2026-07-01",
    TransEndDate: "2026-07-13",
    Status: "ets_New",
    Comment: "Department transfer"
});
```

**Sample response:**

```json
{
  "TransferID": 1,
  "TransStartDate": "2026-07-01",
  "TransEndDate": "2026-07-13",
  "Status": "ets_New",
  "Comment": "Department transfer"
}
```

</details>

<details>
<summary>getEmployeeTransfers</summary>

Retrieves a single `EmployeeTransfer` record by its `TransferID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transferID` | <code>int:Signed32</code> | Yes | Key property 'TransferID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeTransfersQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeeTransfer|error`

**Sample code:**

```ballerina
EmployeeTransfer transfer = check humanResourcesClient->getEmployeeTransfers(1);
```

**Sample response:**

```json
{
  "TransferID": 1,
  "TransStartDate": "2026-07-01",
  "TransEndDate": "2026-07-13",
  "Status": "ets_New",
  "Comment": "Department transfer"
}
```

</details>

<details>
<summary>deleteEmployeeTransfers</summary>

Deletes an `EmployeeTransfer` record by its `TransferID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transferID` | <code>int:Signed32</code> | Yes | Key property 'TransferID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeeTransfers(1);
```

</details>

<details>
<summary>updateEmployeeTransfers</summary>

Partially updates an `EmployeeTransfer` record (PATCH/MERGE semantics) by its `TransferID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transferID` | <code>int:Signed32</code> | Yes | Key property 'TransferID' (Edm.Int32) |
| `payload` | <code>EmployeeTransfer</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeeTransfers(1, {Status: "ets_Accepted"});
```

</details>

<details>
<summary>employeeTransfersServiceGetEmployeeTransferList</summary>

Calls the `EmployeeTransfersService_GetEmployeeTransferList` function import to retrieve the employee transfer list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4|error`

**Sample code:**

```ballerina
inline_response_200_4 result = check humanResourcesClient->employeeTransfersServiceGetEmployeeTransferList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeTransfersService_GetEmployeeTransferList",
  "value": [
    {
      "TransferID": 1
    }
  ]
}
```

</details>

#### Employment Categories

<details>
<summary>employmentCategoryServiceGetEmploymentCategoryList</summary>

Calls the `EmploymentCategoryService_GetEmploymentCategoryList` function import to retrieve the employment category list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
inline_response_200_5 result = check humanResourcesClient->employmentCategoryServiceGetEmploymentCategoryList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmploymentCategoryService_GetEmploymentCategoryList",
  "value": [
    {
      "Code": "FT"
    }
  ]
}
```

</details>

<details>
<summary>listEmploymentCategorys</summary>

Queries the `EmploymentCategorys` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmploymentCategorysHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmploymentCategorysQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmploymentCategorysCollectionResponse|error`

**Sample code:**

```ballerina
EmploymentCategorysCollectionResponse response = check humanResourcesClient->listEmploymentCategorys();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmploymentCategorys",
  "value": [
    {
      "Code": "FT",
      "Description": "Full-time"
    }
  ]
}
```

</details>

<details>
<summary>createEmploymentCategorys</summary>

Creates a new `EmploymentCategory` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmploymentCategory</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmploymentCategory|error`

**Sample code:**

```ballerina
EmploymentCategory created = check humanResourcesClient->createEmploymentCategorys({
    Code: "FT",
    Description: "Full-time"
});
```

**Sample response:**

```json
{
  "Code": "FT",
  "Description": "Full-time"
}
```

</details>

<details>
<summary>getEmploymentCategorys</summary>

Retrieves a single `EmploymentCategory` record by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmploymentCategorysQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmploymentCategory|error`

**Sample code:**

```ballerina
EmploymentCategory category = check humanResourcesClient->getEmploymentCategorys("FT");
```

**Sample response:**

```json
{
  "Code": "FT",
  "Description": "Full-time"
}
```

</details>

<details>
<summary>deleteEmploymentCategorys</summary>

Deletes an `EmploymentCategory` record by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmploymentCategorys("FT");
```

</details>

<details>
<summary>updateEmploymentCategorys</summary>

Partially updates an `EmploymentCategory` record (PATCH/MERGE semantics) by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>EmploymentCategory</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmploymentCategorys("FT", {Description: "Full-time permanent"});
```

</details>

#### Employee ID Types

<details>
<summary>listEmployeeIDType</summary>

Queries the `EmployeeIDType` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeeIDTypeHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeIDTypeQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeeIDTypeCollectionResponse|error`

**Sample code:**

```ballerina
EmployeeIDTypeCollectionResponse response = check humanResourcesClient->listEmployeeIDType();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeIDType",
  "value": [
    {
      "IDType": "national_id"
    }
  ]
}
```

</details>

<details>
<summary>createEmployeeIDType</summary>

Creates a new `EmployeeIDType` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeIDType</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeeIDType|error`

**Sample code:**

```ballerina
EmployeeIDType created = check humanResourcesClient->createEmployeeIDType({IDType: "national_id"});
```

**Sample response:**

```json
{
  "IDType": "national_id"
}
```

</details>

<details>
<summary>getEmployeeIDType</summary>

Retrieves a single `EmployeeIDType` record by its `IDType` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iDType` | <code>string</code> | Yes | Key property 'IDType' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeIDTypeQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeeIDType|error`

**Sample code:**

```ballerina
EmployeeIDType idType = check humanResourcesClient->getEmployeeIDType("national_id");
```

**Sample response:**

```json
{
  "IDType": "national_id"
}
```

</details>

<details>
<summary>deleteEmployeeIDType</summary>

Deletes an `EmployeeIDType` record by its `IDType` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iDType` | <code>string</code> | Yes | Key property 'IDType' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeeIDType("national_id");
```

</details>

<details>
<summary>updateEmployeeIDType</summary>

Partially updates an `EmployeeIDType` record (PATCH/MERGE semantics) by its `IDType` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iDType` | <code>string</code> | Yes | Key property 'IDType' (Edm.String) |
| `payload` | <code>EmployeeIDType</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeeIDType("national_id", {IDType: "national_identity_card"});
```

</details>

<details>
<summary>employeeIDTypeServiceGetList</summary>

Calls the `EmployeeIDTypeService_GetList` function import to retrieve the lightweight list of employee ID types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 result = check humanResourcesClient->employeeIDTypeServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeIDTypeService_GetList",
  "value": [
    {
      "IDType": "national_id"
    }
  ]
}
```

</details>

#### Employee Images

<details>
<summary>listEmployeeImages</summary>

Queries the `EmployeeImages` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmployeeImagesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeImagesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `EmployeeImagesCollectionResponse|error`

**Sample code:**

```ballerina
EmployeeImagesCollectionResponse response = check humanResourcesClient->listEmployeeImages();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#EmployeeImages",
  "value": [
    {
      "EmployeeNo": 101,
      "Picture": 1
    }
  ]
}
```

</details>

<details>
<summary>createEmployeeImages</summary>

Creates a new `EmployeeImage` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmployeeImage</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `EmployeeImage|error`

**Sample code:**

```ballerina
EmployeeImage created = check humanResourcesClient->createEmployeeImages({
    EmployeeNo: 101,
    Picture: 1
});
```

**Sample response:**

```json
{
  "EmployeeNo": 101,
  "Picture": 1
}
```

</details>

<details>
<summary>getEmployeeImages</summary>

Retrieves a single `EmployeeImage` record by its `EmployeeNo` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeNo` | <code>int:Signed32</code> | Yes | Key property 'EmployeeNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeImagesQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `EmployeeImage|error`

**Sample code:**

```ballerina
EmployeeImage image = check humanResourcesClient->getEmployeeImages(101);
```

**Sample response:**

```json
{
  "EmployeeNo": 101,
  "Picture": 1
}
```

</details>

<details>
<summary>deleteEmployeeImages</summary>

Deletes an `EmployeeImage` record by its `EmployeeNo` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeNo` | <code>int:Signed32</code> | Yes | Key property 'EmployeeNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteEmployeeImages(101);
```

</details>

<details>
<summary>updateEmployeeImages</summary>

Partially updates an `EmployeeImage` record (PATCH/MERGE semantics) by its `EmployeeNo` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeNo` | <code>int:Signed32</code> | Yes | Key property 'EmployeeNo' (Edm.Int32) |
| `payload` | <code>EmployeeImage</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateEmployeeImages(101, {Picture: 2});
```

</details>

#### Teams

<details>
<summary>listTeams</summary>

Queries the `Teams` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTeamsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTeamsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `TeamsCollectionResponse|error`

**Sample code:**

```ballerina
TeamsCollectionResponse response = check humanResourcesClient->listTeams();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#Teams",
  "value": [
    {
      "TeamID": 1,
      "TeamName": "Consulting",
      "Description": "Consulting delivery team",
      "TeamMembers": [
        {
          "TeamID": 1,
          "EmployeeID": 101,
          "RoleInTeam": "borit_Leader"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>createTeams</summary>

Creates a new `Team` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Team</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `Team|error`

**Sample code:**

```ballerina
Team created = check humanResourcesClient->createTeams({
    TeamName: "Consulting",
    Description: "Consulting delivery team",
    TeamMembers: [{EmployeeID: 101, RoleInTeam: "borit_Leader"}]
});
```

**Sample response:**

```json
{
  "TeamID": 1,
  "TeamName": "Consulting",
  "Description": "Consulting delivery team",
  "TeamMembers": [
    {
      "TeamID": 1,
      "EmployeeID": 101,
      "RoleInTeam": "borit_Leader"
    }
  ]
}
```

</details>

<details>
<summary>getTeams</summary>

Retrieves a single `Team` record by its `TeamID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `teamID` | <code>int:Signed32</code> | Yes | Key property 'TeamID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTeamsQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `Team|error`

**Sample code:**

```ballerina
Team team = check humanResourcesClient->getTeams(1);
```

**Sample response:**

```json
{
  "TeamID": 1,
  "TeamName": "Consulting",
  "Description": "Consulting delivery team",
  "TeamMembers": [
    {
      "TeamID": 1,
      "EmployeeID": 101,
      "RoleInTeam": "borit_Leader"
    }
  ]
}
```

</details>

<details>
<summary>deleteTeams</summary>

Deletes a `Team` record by its `TeamID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `teamID` | <code>int:Signed32</code> | Yes | Key property 'TeamID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteTeams(1);
```

</details>

<details>
<summary>updateTeams</summary>

Partially updates a `Team` record (PATCH/MERGE semantics) by its `TeamID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `teamID` | <code>int:Signed32</code> | Yes | Key property 'TeamID' (Edm.Int32) |
| `payload` | <code>Team</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateTeams(1, {Description: "Consulting delivery and support team"});
```

</details>

#### Genders

<details>
<summary>listGenders</summary>

Queries the `Genders` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListGendersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListGendersQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `GendersCollectionResponse|error`

**Sample code:**

```ballerina
GendersCollectionResponse response = check humanResourcesClient->listGenders();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#Genders",
  "value": [
    {
      "Code": "F",
      "Description": "Female"
    }
  ]
}
```

</details>

<details>
<summary>createGenders</summary>

Creates a new `Gender` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Gender</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `Gender|error`

**Sample code:**

```ballerina
Gender created = check humanResourcesClient->createGenders({
    Code: "F",
    Description: "Female"
});
```

**Sample response:**

```json
{
  "Code": "F",
  "Description": "Female"
}
```

</details>

<details>
<summary>getGenders</summary>

Retrieves a single `Gender` record by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetGendersQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `Gender|error`

**Sample code:**

```ballerina
Gender gender = check humanResourcesClient->getGenders("F");
```

**Sample response:**

```json
{
  "Code": "F",
  "Description": "Female"
}
```

</details>

<details>
<summary>deleteGenders</summary>

Deletes a `Gender` record by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteGenders("F");
```

</details>

<details>
<summary>updateGenders</summary>

Partially updates a `Gender` record (PATCH/MERGE semantics) by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>Gender</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateGenders("F", {Description: "Female employee"});
```

</details>

<details>
<summary>gendersServiceGetList</summary>

Calls the `GendersService_GetList` function import to retrieve the lightweight list of genders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6|error`

**Sample code:**

```ballerina
inline_response_200_6 result = check humanResourcesClient->gendersServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#GendersService_GetList",
  "value": [
    {
      "Code": "F"
    }
  ]
}
```

</details>

#### Termination Reasons

<details>
<summary>listTerminationReason</summary>

Queries the `TerminationReason` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTerminationReasonHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTerminationReasonQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `TerminationReasonCollectionResponse|error`

**Sample code:**

```ballerina
TerminationReasonCollectionResponse response = check humanResourcesClient->listTerminationReason();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#TerminationReason",
  "value": [
    {
      "ReasonID": 1,
      "Name": "Resignation",
      "Description": "Employee resigned voluntarily"
    }
  ]
}
```

</details>

<details>
<summary>createTerminationReason</summary>

Creates a new `TerminationReason` record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TerminationReason</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `TerminationReason|error`

**Sample code:**

```ballerina
TerminationReason created = check humanResourcesClient->createTerminationReason({
    Name: "Resignation",
    Description: "Employee resigned voluntarily"
});
```

**Sample response:**

```json
{
  "ReasonID": 1,
  "Name": "Resignation",
  "Description": "Employee resigned voluntarily"
}
```

</details>

<details>
<summary>getTerminationReason</summary>

Retrieves a single `TerminationReason` record by its `ReasonID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reasonID` | <code>int:Signed32</code> | Yes | Key property 'ReasonID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTerminationReasonQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `TerminationReason|error`

**Sample code:**

```ballerina
TerminationReason reason = check humanResourcesClient->getTerminationReason(1);
```

**Sample response:**

```json
{
  "ReasonID": 1,
  "Name": "Resignation",
  "Description": "Employee resigned voluntarily"
}
```

</details>

<details>
<summary>deleteTerminationReason</summary>

Deletes a `TerminationReason` record by its `ReasonID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reasonID` | <code>int:Signed32</code> | Yes | Key property 'ReasonID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->deleteTerminationReason(1);
```

</details>

<details>
<summary>updateTerminationReason</summary>

Partially updates a `TerminationReason` record (PATCH/MERGE semantics) by its `ReasonID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `reasonID` | <code>int:Signed32</code> | Yes | Key property 'ReasonID' (Edm.Int32) |
| `payload` | <code>TerminationReason</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->updateTerminationReason(1, {Description: "Voluntary resignation by employee"});
```

</details>

<details>
<summary>terminationReasonServiceGetList</summary>

Calls the `TerminationReasonService_GetList` function import to retrieve the lightweight list of termination reasons.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#125;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7|error`

**Sample code:**

```ballerina
inline_response_200_7 result = check humanResourcesClient->terminationReasonServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#TerminationReasonService_GetList",
  "value": [
    {
      "ReasonID": 1,
      "Name": "Resignation"
    }
  ]
}
```

</details>

#### Session Management

<details>
<summary>logout</summary>

Ends the active SAP Business One Service Layer session, invalidating the `B1SESSION` cookie.

**Parameters:**

None.

**Returns:** `error?`

**Sample code:**

```ballerina
check humanResourcesClient->logout();
```

</details>
