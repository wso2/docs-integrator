# Actions

The `ballerinax/sap.businessone.projects` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage SAP Business One project management objects — financial project codes, project management projects, subprojects, configuration data, time sheets, and expense types — through the Service Layer OData API. |

---

## Client

The `Client` provides access to the project management objects of the SAP Business One Service Layer — financial project codes, project management projects (with their stages, activities, work orders, and open issues), subprojects, project management configuration (activities, areas, priorities, stage types, subproject types, tasks), time sheets, and expense types.

### Configuration

#### SessionConfig

SAP Business One Service Layer session credentials, passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|--------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database to log in to |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer user password |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Service Layer HTTP endpoint. Passed as the optional second argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|--------------|
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>{}</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>{}</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>{}</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>{}</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side, treating `nil` values and absent fields as optional |

The client also accepts a `serviceUrl` string parameter — the base URL of the target Service Layer instance — which defaults to `https://localhost:50000/b1s/v1`.

### Initializing the client

```ballerina
import ballerinax/sap.businessone;
import ballerinax/sap.businessone.projects;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

projects:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations

#### Expense Types

<details>
<summary>listExpenseTypes</summary>

Query the ExpenseTypes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListExpenseTypesHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` to control server-side paging |
| `queries` | <code>ListExpenseTypesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `ExpenseTypesCollectionResponse&#124;error`

**Sample code:**

```ballerina
ExpenseTypesCollectionResponse response = check client->listExpenseTypes(queries = {dollarTop: 20});
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ExpenseTypes",
  "value": [
    {
      "ExpenseType": "T001",
      "ExpenseName": "Travel",
      "ExpenseAccount": "_SYS00000001",
      "VatGroup": "O0",
      "PaidByCompany": "tYES"
    }
  ],
  "odata.nextLink": "ExpenseTypes?$skip=20"
}
```

</details>

<details>
<summary>createExpenseTypes</summary>

Create a new ExpenseTypeData entity in the ExpenseTypes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExpenseTypeData</code> | Yes | The expense type to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ExpenseTypeData&#124;error`

**Sample code:**

```ballerina
ExpenseTypeData created = check client->createExpenseTypes({
    expenseType: "T002",
    expenseName: "Accommodation",
    expenseAccount: "_SYS00000002",
    vatGroup: "O0",
    paidByCompany: "tYES"
});
```

**Sample response:**

```json
{
  "ExpenseType": "T002",
  "ExpenseName": "Accommodation",
  "ExpenseAccount": "_SYS00000002",
  "VatGroup": "O0",
  "PaidByCompany": "tYES"
}
```

</details>

<details>
<summary>getExpenseTypes</summary>

Get a single ExpenseTypeData entity from the ExpenseTypes collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `expenseType` | <code>string</code> | Yes | Key property 'ExpenseType' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExpenseTypesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `ExpenseTypeData&#124;error`

**Sample code:**

```ballerina
ExpenseTypeData expense = check client->getExpenseTypes("T002");
```

**Sample response:**

```json
{
  "ExpenseType": "T002",
  "ExpenseName": "Accommodation",
  "ExpenseAccount": "_SYS00000002",
  "VatGroup": "O0",
  "PaidByCompany": "tYES"
}
```

</details>

<details>
<summary>deleteExpenseTypes</summary>

Delete a ExpenseTypeData entity from the ExpenseTypes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `expenseType` | <code>string</code> | Yes | Key property 'ExpenseType' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteExpenseTypes("T002");
```

</details>

<details>
<summary>updateExpenseTypes</summary>

Partially update a ExpenseTypeData entity in the ExpenseTypes collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `expenseType` | <code>string</code> | Yes | Key property 'ExpenseType' (Edm.String) |
| `payload` | <code>ExpenseTypeData</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateExpenseTypes("T002", {expenseName: "Accommodation & Lodging"});
```

</details>

#### Project Configuration — Activities

<details>
<summary>projectManagementConfigurationServiceAddActivities</summary>

Add activities to the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_AddActivities_body</code> | Yes | Wraps a `PMC_ActivityCollection` array of `PMCActivityData` objects to add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceAddActivities({
    pMCActivityCollection: [
        {activityID: 10, activityType: "Site Visit", isChargeable: "tYES", laborItem: "LAB001", isAbsence: "tNO"}
    ]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceDeleteActivities</summary>

Delete activities from the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_DeleteActivities_body</code> | Yes | Wraps a `PMC_ActivityCollection` array identifying the activities to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceDeleteActivities({
    pMCActivityCollection: [{activityID: 10}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceGetActivities</summary>

Get the activities defined in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200&#124;error`

**Sample code:**

```ballerina
inline_response_200 activities = check client->projectManagementConfigurationServiceGetActivities();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementConfigurationService_GetActivities",
  "value": [
    {"ActivityID": 10, "ActivityType": "Site Visit", "IsChargeable": "tYES", "LaborItem": "LAB001", "IsAbsence": "tNO"}
  ]
}
```

</details>

<details>
<summary>projectManagementConfigurationServiceUpdateActivities</summary>

Update activities in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_UpdateActivities_body</code> | Yes | Wraps a `PMC_ActivityCollection` array of `PMCActivityData` objects with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceUpdateActivities({
    pMCActivityCollection: [{activityID: 10, activityType: "Site Visit - Extended"}]
});
```

</details>

#### Project Configuration — Areas

<details>
<summary>projectManagementConfigurationServiceAddAreas</summary>

Add areas to the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_AddAreas_body</code> | Yes | Wraps a `PMC_AreaCollection` array of `PMCAreaData` objects to add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceAddAreas({
    pMCAreaCollection: [{areaID: 1, areaName: "Civil Works"}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceDeleteAreas</summary>

Delete areas from the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_DeleteAreas_body</code> | Yes | Wraps a `PMC_AreaCollection` array identifying the areas to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceDeleteAreas({
    pMCAreaCollection: [{areaID: 1}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceGetAreas</summary>

Get the areas defined in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1&#124;error`

**Sample code:**

```ballerina
inline_response_200_1 areas = check client->projectManagementConfigurationServiceGetAreas();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementConfigurationService_GetAreas",
  "value": [
    {"AreaID": 1, "AreaName": "Civil Works"}
  ]
}
```

</details>

<details>
<summary>projectManagementConfigurationServiceUpdateAreas</summary>

Update areas in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_UpdateAreas_body</code> | Yes | Wraps a `PMC_AreaCollection` array of `PMCAreaData` objects with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceUpdateAreas({
    pMCAreaCollection: [{areaID: 1, areaName: "Civil & Structural Works"}]
});
```

</details>

#### Project Configuration — Priorities

<details>
<summary>projectManagementConfigurationServiceAddPriorities</summary>

Add priorities to the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_AddPriorities_body</code> | Yes | Wraps a `PMC_PriorityCollection` array of `PMCPriorityData` objects to add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceAddPriorities({
    pMCPriorityCollection: [{priorityID: 1, priorityName: "High"}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceDeletePriorities</summary>

Delete priorities from the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_DeletePriorities_body</code> | Yes | Wraps a `PMC_PriorityCollection` array identifying the priorities to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceDeletePriorities({
    pMCPriorityCollection: [{priorityID: 1}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceGetPriorities</summary>

Get the priorities defined in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2&#124;error`

**Sample code:**

```ballerina
inline_response_200_2 priorities = check client->projectManagementConfigurationServiceGetPriorities();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementConfigurationService_GetPriorities",
  "value": [
    {"PriorityID": 1, "PriorityName": "High"}
  ]
}
```

</details>

<details>
<summary>projectManagementConfigurationServiceUpdatePriorities</summary>

Update priorities in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_UpdatePriorities_body</code> | Yes | Wraps a `PMC_PriorityCollection` array of `PMCPriorityData` objects with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceUpdatePriorities({
    pMCPriorityCollection: [{priorityID: 1, priorityName: "Critical"}]
});
```

</details>

#### Project Configuration — Stage Types

<details>
<summary>projectManagementConfigurationServiceAddStageTypes</summary>

Add stage types to the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_AddStageTypes_body</code> | Yes | Wraps a `PMC_StageTypeCollection` array of `PMCStageTypeData` objects to add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceAddStageTypes({
    pMCStageTypeCollection: [{stageID: 1, stageName: "Planning", stageDescription: "Initial planning stage"}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceDeleteStageTypes</summary>

Delete stage types from the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_DeleteStageTypes_body</code> | Yes | Wraps a `PMC_StageTypeCollection` array identifying the stage types to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceDeleteStageTypes({
    pMCStageTypeCollection: [{stageID: 1}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceGetStageTypes</summary>

Get the stage types defined in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3&#124;error`

**Sample code:**

```ballerina
inline_response_200_3 stageTypes = check client->projectManagementConfigurationServiceGetStageTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementConfigurationService_GetStageTypes",
  "value": [
    {"StageID": 1, "StageName": "Planning", "StageDescription": "Initial planning stage"}
  ]
}
```

</details>

<details>
<summary>projectManagementConfigurationServiceUpdateStageTypes</summary>

Update stage types in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_UpdateStageTypes_body</code> | Yes | Wraps a `PMC_StageTypeCollection` array of `PMCStageTypeData` objects with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceUpdateStageTypes({
    pMCStageTypeCollection: [{stageID: 1, stageDescription: "Initial planning and design stage"}]
});
```

</details>

#### Project Configuration — Subproject Types

<details>
<summary>projectManagementConfigurationServiceAddSubprojectTypes</summary>

Add subproject types to the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_AddSubprojectTypes_body</code> | Yes | Wraps a `PMC_SubprojectTypesCollection` array of `PMCSubprojectTypeData` objects to add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceAddSubprojectTypes({
    pMCSubprojectTypesCollection: [{subprojectTypeID: 1, subprojectTypeName: "Civil"}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceDeleteSubprojectTypes</summary>

Delete subproject types from the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_DeleteSubprojectTypes_body</code> | Yes | Wraps a `PMC_SubprojectTypesCollection` array identifying the subproject types to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceDeleteSubprojectTypes({
    pMCSubprojectTypesCollection: [{subprojectTypeID: 1}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceGetSubprojectTypes</summary>

Get the subproject types defined in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4&#124;error`

**Sample code:**

```ballerina
inline_response_200_4 subprojectTypes = check client->projectManagementConfigurationServiceGetSubprojectTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementConfigurationService_GetSubprojectTypes",
  "value": [
    {"SubprojectTypeID": 1, "SubprojectTypeName": "Civil"}
  ]
}
```

</details>

<details>
<summary>projectManagementConfigurationServiceUpdateSubprojectTypes</summary>

Update subproject types in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_UpdateSubprojectTypes_body</code> | Yes | Wraps a `PMC_SubprojectTypesCollection` array of `PMCSubprojectTypeData` objects with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceUpdateSubprojectTypes({
    pMCSubprojectTypesCollection: [{subprojectTypeID: 1, subprojectTypeName: "Civil & Structural"}]
});
```

</details>

#### Project Configuration — Tasks

<details>
<summary>projectManagementConfigurationServiceAddTasks</summary>

Add tasks to the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_AddTasks_body</code> | Yes | Wraps a `PMC_TaskCollection` array of `PMCTaskData` objects to add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceAddTasks({
    pMCTaskCollection: [{taskID: 1, taskName: "Site survey"}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceDeleteTasks</summary>

Delete tasks from the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_DeleteTasks_body</code> | Yes | Wraps a `PMC_TaskCollection` array identifying the tasks to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceDeleteTasks({
    pMCTaskCollection: [{taskID: 1}]
});
```

</details>

<details>
<summary>projectManagementConfigurationServiceGetTasks</summary>

Get the tasks defined in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5&#124;error`

**Sample code:**

```ballerina
inline_response_200_5 tasks = check client->projectManagementConfigurationServiceGetTasks();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementConfigurationService_GetTasks",
  "value": [
    {"TaskID": 1, "TaskName": "Site survey"}
  ]
}
```

</details>

<details>
<summary>projectManagementConfigurationServiceUpdateTasks</summary>

Update tasks in the project management configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementConfigurationService_UpdateTasks_body</code> | Yes | Wraps a `PMC_TaskCollection` array of `PMCTaskData` objects with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementConfigurationServiceUpdateTasks({
    pMCTaskCollection: [{taskID: 1, taskName: "Detailed site survey"}]
});
```

</details>

#### Subprojects

<details>
<summary>projectManagementServiceAddSubproject</summary>

Add a subproject to a project management project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementService_AddSubproject_body</code> | Yes | Wraps a `PM_SubprojectDocumentData` object describing the subproject to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PMSubprojectDocumentParams&#124;error`

**Sample code:**

```ballerina
PMSubprojectDocumentParams created = check client->projectManagementServiceAddSubproject({
    pMSubprojectDocumentData: {
        SubprojectName: "Foundation Works",
        ParentID: 1015,
        ProjectID: 1015,
        SubprojectType: 1,
        StartDate: "2026-07-15",
        DueDate: "2026-09-30"
    }
});
```

**Sample response:**

```json
{
  "AbsEntry": 1042
}
```

</details>

<details>
<summary>projectManagementServiceDeleteSubproject</summary>

Delete a subproject from a project management project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementService_DeleteSubproject_body</code> | Yes | Wraps a `PM_SubprojectDocumentParams` object identifying the subproject to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementServiceDeleteSubproject({
    pMSubprojectDocumentParams: {absEntry: 1042}
});
```

</details>

<details>
<summary>projectManagementServiceGetSubproject</summary>

Get a subproject of a project management project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementService_GetSubproject_body</code> | Yes | Wraps a `PM_SubprojectDocumentParams` object identifying the subproject to retrieve |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PMSubprojectDocumentData&#124;error`

**Sample code:**

```ballerina
PMSubprojectDocumentData subproject = check client->projectManagementServiceGetSubproject({
    pMSubprojectDocumentParams: {absEntry: 1042}
});
```

**Sample response:**

```json
{
  "AbsEntry": 1042,
  "Owner": 7,
  "SubprojectName": "Foundation Works",
  "StartDate": "2026-07-15",
  "FinishedPercent": 0,
  "ParentID": 1015,
  "ProjectID": 1015,
  "Order": 1,
  "SubprojectType": 1,
  "SubprojectContribution": 100,
  "SubprojectStatus": "sst_Open",
  "SubprojectEndDate": "2026-09-30",
  "ActualCost": 0,
  "PlannedCost": 18500.00,
  "SubprojectDepth": 1,
  "DueDate": "2026-09-30"
}
```

</details>

<details>
<summary>projectManagementServiceGetSubprojectsList</summary>

Get the list of subprojects belonging to a project management project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementService_GetSubprojectsList_body</code> | Yes | Wraps a `PM_SubprojectParams` object identifying the parent project and whether it is itself a subproject |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6&#124;error`

**Sample code:**

```ballerina
inline_response_200_6 subprojects = check client->projectManagementServiceGetSubprojectsList({
    pMSubprojectParams: {absEntry: 1015, isSubproject: "tNO"}
});
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementService_GetSubprojectsList",
  "value": [
    {"AbsEntry": 1042},
    {"AbsEntry": 1043}
  ]
}
```

</details>

<details>
<summary>projectManagementServiceUpdateSubproject</summary>

Update a subproject of a project management project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProjectManagementService_UpdateSubproject_body</code> | Yes | Wraps a `PM_SubprojectDocumentData` object with the fields to update, including the `AbsEntry` of the subproject |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementServiceUpdateSubproject({
    pMSubprojectDocumentData: {AbsEntry: 1042, FinishedPercent: 25.0}
});
```

</details>

#### Project Management Time Sheets

<details>
<summary>listProjectManagementTimeSheet</summary>

Query the ProjectManagementTimeSheet collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListProjectManagementTimeSheetHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` to control server-side paging |
| `queries` | <code>ListProjectManagementTimeSheetQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `ProjectManagementTimeSheetCollectionResponse&#124;error`

**Sample code:**

```ballerina
ProjectManagementTimeSheetCollectionResponse response = check client->listProjectManagementTimeSheet(
    queries = {dollarTop: 10}
);
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagementTimeSheet",
  "value": [
    {
      "AbsEntry": 501,
      "DocNumber": 501,
      "TimeSheetType": "tsh_Employee",
      "UserID": 7,
      "FirstName": "Alex",
      "LastName": "Wong",
      "DateFrom": "2026-07-06",
      "DateTo": "2026-07-10",
      "UserCode": "AWONG"
    }
  ],
  "odata.nextLink": "ProjectManagementTimeSheet?$skip=10"
}
```

</details>

<details>
<summary>createProjectManagementTimeSheet</summary>

Create a new PM_TimeSheetData entity in the ProjectManagementTimeSheet collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PMTimeSheetData</code> | Yes | The time sheet to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PMTimeSheetData&#124;error`

**Sample code:**

```ballerina
PMTimeSheetData created = check client->createProjectManagementTimeSheet({
    TimeSheetType: "tsh_Employee",
    UserID: 7,
    DateFrom: "2026-07-06",
    DateTo: "2026-07-10",
    PM_TimeSheetLineDataCollection: [
        {Date: "2026-07-06", ActivityType: 10, StartTime: "0900", EndTime: "1700", ProjectID: 1015, StageID: 1}
    ]
});
```

**Sample response:**

```json
{
  "AbsEntry": 502,
  "DocNumber": 502,
  "TimeSheetType": "tsh_Employee",
  "UserID": 7,
  "FirstName": "Alex",
  "LastName": "Wong",
  "DateFrom": "2026-07-06",
  "DateTo": "2026-07-10",
  "PM_TimeSheetLineDataCollection": [
    {"LineID": 0, "Date": "2026-07-06", "ActivityType": 10, "StartTime": "0900", "EndTime": "1700", "ProjectID": 1015, "StageID": 1}
  ]
}
```

</details>

<details>
<summary>getProjectManagementTimeSheet</summary>

Get a single PM_TimeSheetData entity from the ProjectManagementTimeSheet collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetProjectManagementTimeSheetQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `PMTimeSheetData&#124;error`

**Sample code:**

```ballerina
PMTimeSheetData sheet = check client->getProjectManagementTimeSheet(502);
```

**Sample response:**

```json
{
  "AbsEntry": 502,
  "DocNumber": 502,
  "TimeSheetType": "tsh_Employee",
  "UserID": 7,
  "FirstName": "Alex",
  "LastName": "Wong",
  "DateFrom": "2026-07-06",
  "DateTo": "2026-07-10",
  "PM_TimeSheetLineDataCollection": [
    {"LineID": 0, "Date": "2026-07-06", "ActivityType": 10, "StartTime": "0900", "EndTime": "1700", "ProjectID": 1015, "StageID": 1}
  ]
}
```

</details>

<details>
<summary>deleteProjectManagementTimeSheet</summary>

Delete a PM_TimeSheetData entity from the ProjectManagementTimeSheet collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteProjectManagementTimeSheet(502);
```

</details>

<details>
<summary>updateProjectManagementTimeSheet</summary>

Partially update a PM_TimeSheetData entity in the ProjectManagementTimeSheet collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>PMTimeSheetData</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateProjectManagementTimeSheet(502, {DateTo: "2026-07-11"});
```

</details>

#### Project Management Projects

<details>
<summary>listProjectManagements</summary>

Query the ProjectManagements collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListProjectManagementsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` to control server-side paging |
| `queries` | <code>ListProjectManagementsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `ProjectManagementsCollectionResponse&#124;error`

**Sample code:**

```ballerina
ProjectManagementsCollectionResponse response = check client->listProjectManagements(
    queries = {dollarTop: 20, dollarFilter: "ProjectStatus eq 'pst_Started'"}
);
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectManagements",
  "value": [
    {
      "AbsEntry": 1015,
      "ProjectName": "New Warehouse Setup",
      "StartDate": "2026-06-01",
      "DueDate": "2026-12-31",
      "ProjectType": "pt_Internal",
      "ProjectStatus": "pst_Started",
      "FinancialProject": "PRJ-2026-001",
      "AllowSubprojects": "tYES",
      "FinishedPercent": 15.0
    }
  ],
  "odata.nextLink": "ProjectManagements?$skip=20"
}
```

</details>

<details>
<summary>createProjectManagements</summary>

Create a new PM_ProjectDocumentData entity in the ProjectManagements collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PMProjectDocumentData</code> | Yes | The project management project to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PMProjectDocumentData&#124;error`

**Sample code:**

```ballerina
PMProjectDocumentData created = check client->createProjectManagements({
    ProjectName: "New Warehouse Setup",
    FinancialProject: "PRJ-2026-001",
    ProjectType: "pt_Internal",
    StartDate: "2026-06-01",
    DueDate: "2026-12-31",
    AllowSubprojects: "tYES"
});
```

**Sample response:**

```json
{
  "AbsEntry": 1015,
  "ProjectName": "New Warehouse Setup",
  "FinancialProject": "PRJ-2026-001",
  "ProjectType": "pt_Internal",
  "StartDate": "2026-06-01",
  "DueDate": "2026-12-31",
  "AllowSubprojects": "tYES",
  "ProjectStatus": "pst_Started",
  "FinishedPercent": 0
}
```

</details>

<details>
<summary>getProjectManagements</summary>

Get a single PM_ProjectDocumentData entity from the ProjectManagements collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetProjectManagementsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `PMProjectDocumentData&#124;error`

**Sample code:**

```ballerina
PMProjectDocumentData project = check client->getProjectManagements(1015, queries = {dollarExpand: "PM_StagesCollection"});
```

**Sample response:**

```json
{
  "AbsEntry": 1015,
  "ProjectName": "New Warehouse Setup",
  "FinancialProject": "PRJ-2026-001",
  "ProjectType": "pt_Internal",
  "StartDate": "2026-06-01",
  "DueDate": "2026-12-31",
  "AllowSubprojects": "tYES",
  "ProjectStatus": "pst_Started",
  "FinishedPercent": 15.0,
  "PM_StagesCollection": [
    {"LineID": 0, "StageID": 1, "StageType": 1, "StartDate": "2026-06-01", "Description": "Planning", "IsFinished": "tNO"}
  ]
}
```

</details>

<details>
<summary>deleteProjectManagements</summary>

Delete a PM_ProjectDocumentData entity from the ProjectManagements collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteProjectManagements(1015);
```

</details>

<details>
<summary>updateProjectManagements</summary>

Partially update a PM_ProjectDocumentData entity in the ProjectManagements collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>PMProjectDocumentData</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateProjectManagements(1015, {FinishedPercent: 25.0});
```

</details>

<details>
<summary>projectManagementsCancelProject</summary>

Bound action 'CancelProject' on ProjectManagements (binding type PM_ProjectDocumentData).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) of the project management project to cancel |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->projectManagementsCancelProject(1015);
```

</details>

#### Projects

<details>
<summary>listProjects</summary>

Query the Projects collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListProjectsHeaders</code> | No | Headers to be sent with the request, e.g. `Prefer: odata.maxpagesize=100` to control server-side paging |
| `queries` | <code>ListProjectsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select` |

**Returns:** `ProjectsCollectionResponse&#124;error`

**Sample code:**

```ballerina
ProjectsCollectionResponse response = check client->listProjects(queries = {dollarSelect: "Code,Name,Active"});
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#Projects",
  "value": [
    {
      "Code": "PRJ-2026-001",
      "Name": "New Warehouse Setup",
      "ValidFrom": "2026-06-01",
      "ValidTo": "2026-12-31",
      "Active": "tYES"
    }
  ],
  "odata.nextLink": "Projects?$skip=20"
}
```

</details>

<details>
<summary>createProjects</summary>

Create a new Project entity in the Projects collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Project</code> | Yes | The financial project code to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Project&#124;error`

**Sample code:**

```ballerina
Project created = check client->createProjects({
    Code: "PRJ-2026-001",
    Name: "New Warehouse Setup",
    ValidFrom: "2026-06-01",
    ValidTo: "2026-12-31",
    Active: "tYES"
});
```

**Sample response:**

```json
{
  "Code": "PRJ-2026-001",
  "Name": "New Warehouse Setup",
  "ValidFrom": "2026-06-01",
  "ValidTo": "2026-12-31",
  "Active": "tYES"
}
```

</details>

<details>
<summary>getProjects</summary>

Get a single Project entity from the Projects collection by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetProjectsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `Project&#124;error`

**Sample code:**

```ballerina
Project project = check client->getProjects("PRJ-2026-001");
```

**Sample response:**

```json
{
  "Code": "PRJ-2026-001",
  "Name": "New Warehouse Setup",
  "ValidFrom": "2026-06-01",
  "ValidTo": "2026-12-31",
  "Active": "tYES"
}
```

</details>

<details>
<summary>deleteProjects</summary>

Delete a Project entity from the Projects collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteProjects("PRJ-2026-001");
```

</details>

<details>
<summary>updateProjects</summary>

Partially update a Project entity in the Projects collection (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>Project</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateProjects("PRJ-2026-001", {ValidTo: "2027-06-30"});
```

</details>

<details>
<summary>projectsServiceGetProjectList</summary>

Get project list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7&#124;error`

**Sample code:**

```ballerina
inline_response_200_7 projects = check client->projectsServiceGetProjectList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://<host>:50000/b1s/v1/$metadata#ProjectsService_GetProjectList",
  "value": [
    {"Code": "PRJ-2026-001", "Name": "New Warehouse Setup"}
  ]
}
```

</details>

#### Session

<details>
<summary>logout</summary>

Ends the active SAP Business One Service Layer session.

**Parameters:**

_None_

**Returns:** `error?`

**Sample code:**

```ballerina
check client->logout();
```

</details>
