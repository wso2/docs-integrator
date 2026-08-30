---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.workflow` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance workflow definitions, action classes, actions, advanced rules, approval users, batch groups, batch jobs, database logs, workflow operations, policy types, policy rules, process stages, and rec setup bases via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance workflow definitions, action classes, actions, advanced rules, approval users, batch groups, batch jobs, database logs, workflow operations, policy types, policy rules, process stages, and rec setup bases via the Dynamics 365 Finance and Operations OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID (`tokenUrl`, `clientId`, `clientSecret`, `scopes`). |
| `httpVersion` | `http:HttpVersion` | `"2.0"` | HTTP protocol version used for outbound requests to the environment. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings, including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.workflow;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

workflow:Client fo = check new (
    {
        auth: {
            tokenUrl,
            clientId,
            clientSecret
        }
    },
    serviceUrl
);
```

### Operations

#### Action Classes

<details>
<summary>listActionClasses</summary>

Lists action classes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListActionClassesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ActionClassesCollection|error`

Sample code:

```ballerina
workflow:ActionClassesCollection result = check fo->listActionClasses(
    queries = {filter: "ActionType eq 'User'", top: 20}
);
```

</details>

<details>
<summary>createActionClasses</summary>

Creates an action class.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ActionClass` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ActionClass|error`

Sample code:

```ballerina
workflow:ActionClass created = check fo->createActionClasses({
    dataAreaId: "usmf",
    executableClass: "EmailNotificationAction",
    description: "Sends an email notification",
    actionType: "User",
    className: "EmailNotificationActionClass"
});
```

</details>

<details>
<summary>getActionClasses</summary>

Retrieves an action class by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `executableClass` | `string` | Yes | The executable class key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetActionClassesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `ActionClass|error`

Sample code:

```ballerina
workflow:ActionClass actionClass = check fo->getActionClasses("usmf", "EmailNotificationAction");
```

</details>

<details>
<summary>deleteActionClasses</summary>

Deletes an action class.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `executableClass` | `string` | Yes | The executable class key field. |
| `headers` | `DeleteActionClassesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteActionClasses("usmf", "EmailNotificationAction", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateActionClasses</summary>

Updates an action class.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `executableClass` | `string` | Yes | The executable class key field. |
| `payload` | `ActionClass` | Yes | The request body. |
| `headers` | `UpdateActionClassesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `ActionClass|error`

Sample code:

```ballerina
workflow:ActionClass updated = check fo->updateActionClasses(
    "usmf",
    "EmailNotificationAction",
    {description: "Sends an email notification to the assigned approver"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Actions

<details>
<summary>listActions</summary>

Lists actions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListActionsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ActionsCollection|error`

Sample code:

```ballerina
workflow:ActionsCollection result = check fo->listActions(
    queries = {filter: "ActionType eq 'User'"}
);
```

</details>

<details>
<summary>createActions</summary>

Creates an action.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Action` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Action|error`

Sample code:

```ballerina
workflow:Action created = check fo->createActions({
    dataAreaId: "usmf",
    action: "RequisitionApprovalNotify",
    description: "Notify requisition approver",
    actionType: "User",
    executableClass: "EmailNotificationAction"
});
```

</details>

<details>
<summary>getActions</summary>

Retrieves an action by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `action` | `string` | Yes | The action key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetActionsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `Action|error`

Sample code:

```ballerina
workflow:Action action = check fo->getActions("usmf", "RequisitionApprovalNotify");
```

</details>

<details>
<summary>deleteActions</summary>

Deletes an action.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `action` | `string` | Yes | The action key field. |
| `headers` | `DeleteActionsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteActions("usmf", "RequisitionApprovalNotify", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateActions</summary>

Updates an action.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `action` | `string` | Yes | The action key field. |
| `payload` | `Action` | Yes | The request body. |
| `headers` | `UpdateActionsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `Action|error`

Sample code:

```ballerina
workflow:Action updated = check fo->updateActions(
    "usmf",
    "RequisitionApprovalNotify",
    {description: "Notify requisition approver by email and Teams"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Advanced Rules

<details>
<summary>listAdvancedRules</summary>

Lists advanced (dimension hierarchy) rules.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListAdvancedRulesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `AdvancedRulesCollection|error`

Sample code:

```ballerina
workflow:AdvancedRulesCollection result = check fo->listAdvancedRules(
    queries = {filter: "RuleType eq 'GeneralLedger'"}
);
```

</details>

<details>
<summary>createAdvancedRules</summary>

Creates an advanced rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AdvancedRule` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AdvancedRule|error`

Sample code:

```ballerina
workflow:AdvancedRule created = check fo->createAdvancedRules({
    accountStructure: "Operations",
    advancedRuleName: "DeptSecurityRule",
    status: "Draft",
    description: "Department-based security rule",
    ruleType: "GeneralLedger",
    advancedRuleStructure1: "Department"
});
```

</details>

<details>
<summary>getAdvancedRules</summary>

Retrieves an advanced rule by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountStructure` | `string` | Yes | The account structure key field. |
| `advancedRuleName` | `string` | Yes | The advanced rule name key field. |
| `status` | `string` | Yes | The status key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAdvancedRulesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `AdvancedRule|error`

Sample code:

```ballerina
workflow:AdvancedRule advancedRule = check fo->getAdvancedRules("Operations", "DeptSecurityRule", "Draft");
```

</details>

<details>
<summary>deleteAdvancedRules</summary>

Deletes an advanced rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountStructure` | `string` | Yes | The account structure key field. |
| `advancedRuleName` | `string` | Yes | The advanced rule name key field. |
| `status` | `string` | Yes | The status key field. |
| `headers` | `DeleteAdvancedRulesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAdvancedRules("Operations", "DeptSecurityRule", "Draft", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateAdvancedRules</summary>

Updates an advanced rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountStructure` | `string` | Yes | The account structure key field. |
| `advancedRuleName` | `string` | Yes | The advanced rule name key field. |
| `status` | `string` | Yes | The status key field. |
| `payload` | `AdvancedRule` | Yes | The request body. |
| `headers` | `UpdateAdvancedRulesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `AdvancedRule|error`

Sample code:

```ballerina
workflow:AdvancedRule updated = check fo->updateAdvancedRules(
    "Operations",
    "DeptSecurityRule",
    "Draft",
    {status: "Active"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Approval Users

<details>
<summary>listApprovalUsers</summary>

Lists approval users.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListApprovalUsersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ApprovalUsersCollection|error`

Sample code:

```ballerina
workflow:ApprovalUsersCollection result = check fo->listApprovalUsers(
    queries = {filter: "UserCompany eq 'usmf'"}
);
```

</details>

<details>
<summary>createApprovalUsers</summary>

Creates an approval user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ApprovalUser` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ApprovalUser|error`

Sample code:

```ballerina
workflow:ApprovalUser created = check fo->createApprovalUsers({
    userId: "jane.perera@contoso.com",
    userName: "Jane Perera",
    userCompany: "usmf"
});
```

</details>

<details>
<summary>getApprovalUsers</summary>

Retrieves an approval user by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetApprovalUsersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `ApprovalUser|error`

Sample code:

```ballerina
workflow:ApprovalUser approvalUser = check fo->getApprovalUsers("jane.perera@contoso.com");
```

</details>

<details>
<summary>deleteApprovalUsers</summary>

Deletes an approval user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user id key field. |
| `headers` | `DeleteApprovalUsersHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteApprovalUsers("jane.perera@contoso.com", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateApprovalUsers</summary>

Updates an approval user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user id key field. |
| `payload` | `ApprovalUser` | Yes | The request body. |
| `headers` | `UpdateApprovalUsersHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `ApprovalUser|error`

Sample code:

```ballerina
workflow:ApprovalUser updated = check fo->updateApprovalUsers(
    "jane.perera@contoso.com",
    {userName: "Jane A. Perera"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Batch Groups

<details>
<summary>listBatchGroups</summary>

Lists batch groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListBatchGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BatchGroupsCollection|error`

Sample code:

```ballerina
workflow:BatchGroupsCollection result = check fo->listBatchGroups();
```

</details>

<details>
<summary>createBatchGroups</summary>

Creates a batch group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchGroup` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `BatchGroup|error`

Sample code:

```ballerina
workflow:BatchGroup created = check fo->createBatchGroups({
    groupId: "50",
    serverId: "AOS-01",
    description: "Workflow escalation batch group"
});
```

</details>

<details>
<summary>getBatchGroups</summary>

Retrieves a batch group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The group id key field. |
| `serverId` | `string` | Yes | The server id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBatchGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `BatchGroup|error`

Sample code:

```ballerina
workflow:BatchGroup batchGroup = check fo->getBatchGroups("50", "AOS-01");
```

</details>

<details>
<summary>deleteBatchGroups</summary>

Deletes a batch group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The group id key field. |
| `serverId` | `string` | Yes | The server id key field. |
| `headers` | `DeleteBatchGroupsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBatchGroups("50", "AOS-01", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateBatchGroups</summary>

Updates a batch group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The group id key field. |
| `serverId` | `string` | Yes | The server id key field. |
| `payload` | `BatchGroup` | Yes | The request body. |
| `headers` | `UpdateBatchGroupsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `BatchGroup|error`

Sample code:

```ballerina
workflow:BatchGroup updated = check fo->updateBatchGroups(
    "50",
    "AOS-01",
    {description: "Workflow escalation and reminder batch group"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Batch Jobs

<details>
<summary>listBatchJobs</summary>

Lists batch jobs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListBatchJobsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `BatchJobsCollection|error`

Sample code:

```ballerina
workflow:BatchJobsCollection result = check fo->listBatchJobs(
    queries = {filter: "Status eq 'Waiting'"}
);
```

</details>

<details>
<summary>createBatchJobs</summary>

Creates a batch job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchJob` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `BatchJob|error`

Sample code:

```ballerina
workflow:BatchJob created = check fo->createBatchJobs({
    jobDescription: "Workflow reminder batch job",
    companyAccounts: "usmf",
    status: "Waiting"
});
```

</details>

<details>
<summary>getBatchJobs</summary>

Retrieves a batch job by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchJobRecId` | `int` | Yes | The batch job rec id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetBatchJobsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `BatchJob|error`

Sample code:

```ballerina
workflow:BatchJob batchJob = check fo->getBatchJobs(5637144245);
```

</details>

<details>
<summary>deleteBatchJobs</summary>

Deletes a batch job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchJobRecId` | `int` | Yes | The batch job rec id key field. |
| `headers` | `DeleteBatchJobsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBatchJobs(5637144245, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateBatchJobs</summary>

Updates a batch job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchJobRecId` | `int` | Yes | The batch job rec id key field. |
| `payload` | `BatchJob` | Yes | The request body. |
| `headers` | `UpdateBatchJobsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `BatchJob|error`

Sample code:

```ballerina
workflow:BatchJob updated = check fo->updateBatchJobs(
    5637144245,
    {status: "Hold"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Database Logs

<details>
<summary>listDatabaseLogs</summary>

Lists database log records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListDatabaseLogsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DatabaseLogsCollection|error`

Sample code:

```ballerina
workflow:DatabaseLogsCollection result = check fo->listDatabaseLogs(
    queries = {filter: "TableName eq 'VendTable'", top: 50}
);
```

</details>

<details>
<summary>createDatabaseLogs</summary>

Creates a database log record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DatabaseLog` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `DatabaseLog|error`

Sample code:

```ballerina
workflow:DatabaseLog created = check fo->createDatabaseLogs({
    dataAreaId: "usmf",
    tableName: "VendTable",
    logType: "Update",
    username: "jane.perera@contoso.com"
});
```

</details>

<details>
<summary>getDatabaseLogs</summary>

Retrieves a database log record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `tableRecId` | `int` | Yes | The table rec id key field. |
| `logRecId` | `int` | Yes | The log rec id key field. |
| `tableIdNumber` | `int` | Yes | The table id number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetDatabaseLogsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `DatabaseLog|error`

Sample code:

```ballerina
workflow:DatabaseLog log = check fo->getDatabaseLogs("usmf", 5637190083, 8420176, 872);
```

</details>

<details>
<summary>deleteDatabaseLogs</summary>

Deletes a database log record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `tableRecId` | `int` | Yes | The table rec id key field. |
| `logRecId` | `int` | Yes | The log rec id key field. |
| `tableIdNumber` | `int` | Yes | The table id number key field. |
| `headers` | `DeleteDatabaseLogsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDatabaseLogs("usmf", 5637190083, 8420176, 872, headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateDatabaseLogs</summary>

Updates a database log record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `tableRecId` | `int` | Yes | The table rec id key field. |
| `logRecId` | `int` | Yes | The log rec id key field. |
| `tableIdNumber` | `int` | Yes | The table id number key field. |
| `payload` | `DatabaseLog` | Yes | The request body. |
| `headers` | `UpdateDatabaseLogsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `DatabaseLog|error`

Sample code:

```ballerina
workflow:DatabaseLog updated = check fo->updateDatabaseLogs(
    "usmf",
    5637190083,
    8420176,
    872,
    {formattedData: "Vendor on-hold status changed"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Workflow Operations

<details>
<summary>listOperations</summary>

Lists workflow operation types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListOperationsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `OperationsCollection|error`

Sample code:

```ballerina
workflow:OperationsCollection result = check fo->listOperations();
```

</details>

<details>
<summary>createOperations</summary>

Creates a workflow operation type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Operation` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Operation|error`

Sample code:

```ballerina
workflow:Operation created = check fo->createOperations({
    dataAreaId: "usmf",
    operationId: "PurchReqApprove",
    operationName: "Approve purchase requisition"
});
```

</details>

<details>
<summary>getOperations</summary>

Retrieves a workflow operation type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `operationId` | `string` | Yes | The operation id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetOperationsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `Operation|error`

Sample code:

```ballerina
workflow:Operation operation = check fo->getOperations("usmf", "PurchReqApprove");
```

</details>

<details>
<summary>deleteOperations</summary>

Deletes a workflow operation type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `operationId` | `string` | Yes | The operation id key field. |
| `headers` | `DeleteOperationsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteOperations("usmf", "PurchReqApprove", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateOperations</summary>

Updates a workflow operation type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `operationId` | `string` | Yes | The operation id key field. |
| `payload` | `Operation` | Yes | The request body. |
| `headers` | `UpdateOperationsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `Operation|error`

Sample code:

```ballerina
workflow:Operation updated = check fo->updateOperations(
    "usmf",
    "PurchReqApprove",
    {operationName: "Approve purchase requisition (manager)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Policy Rules

<details>
<summary>listPolicyRules</summary>

Lists policy rules.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPolicyRulesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PolicyRulesCollection|error`

Sample code:

```ballerina
workflow:PolicyRulesCollection result = check fo->listPolicyRules(
    queries = {filter: "PolicyType eq 'TrvExpensePolicy'"}
);
```

</details>

<details>
<summary>createPolicyRules</summary>

Creates a policy rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PolicyRule` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PolicyRule|error`

Sample code:

```ballerina
workflow:PolicyRule created = check fo->createPolicyRules({
    policyName: "TravelExpensePolicy",
    policyType: "TrvExpensePolicy",
    policyRuleName: "ReceiptRequiredOver100",
    validFrom: "2026-01-01T00:00:00Z",
    action: "Warning"
});
```

</details>

<details>
<summary>getPolicyRules</summary>

Retrieves a policy rule by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `policyName` | `string` | Yes | The policy name key field. |
| `policyType` | `string` | Yes | The policy type key field. |
| `policyRuleName` | `string` | Yes | The policy rule name key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPolicyRulesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `PolicyRule|error`

Sample code:

```ballerina
workflow:PolicyRule policyRule = check fo->getPolicyRules(
    "TravelExpensePolicy",
    "TrvExpensePolicy",
    "ReceiptRequiredOver100",
    "2026-01-01T00:00:00Z"
);
```

</details>

<details>
<summary>deletePolicyRules</summary>

Deletes a policy rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `policyName` | `string` | Yes | The policy name key field. |
| `policyType` | `string` | Yes | The policy type key field. |
| `policyRuleName` | `string` | Yes | The policy rule name key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `DeletePolicyRulesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePolicyRules(
    "TravelExpensePolicy",
    "TrvExpensePolicy",
    "ReceiptRequiredOver100",
    "2026-01-01T00:00:00Z",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updatePolicyRules</summary>

Updates a policy rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `policyName` | `string` | Yes | The policy name key field. |
| `policyType` | `string` | Yes | The policy type key field. |
| `policyRuleName` | `string` | Yes | The policy rule name key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `payload` | `PolicyRule` | Yes | The request body. |
| `headers` | `UpdatePolicyRulesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `PolicyRule|error`

Sample code:

```ballerina
workflow:PolicyRule updated = check fo->updatePolicyRules(
    "TravelExpensePolicy",
    "TrvExpensePolicy",
    "ReceiptRequiredOver100",
    "2026-01-01T00:00:00Z",
    {action: "ApproveJustification"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Policy Types

<details>
<summary>listPolicyTypes</summary>

Lists policy types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPolicyTypesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PolicyTypesCollection|error`

Sample code:

```ballerina
workflow:PolicyTypesCollection result = check fo->listPolicyTypes();
```

</details>

<details>
<summary>createPolicyTypes</summary>

Creates a policy type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PolicyType` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PolicyType|error`

Sample code:

```ballerina
workflow:PolicyType created = check fo->createPolicyTypes({
    policyType: "TrvExpensePolicy",
    policyName: "Travel and expense policy",
    purpose: "ExpenseControl"
});
```

</details>

<details>
<summary>getPolicyTypes</summary>

Retrieves a policy type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `policyType` | `string` | Yes | The policy type key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPolicyTypesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `PolicyType|error`

Sample code:

```ballerina
workflow:PolicyType policyType = check fo->getPolicyTypes("TrvExpensePolicy");
```

</details>

<details>
<summary>deletePolicyTypes</summary>

Deletes a policy type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `policyType` | `string` | Yes | The policy type key field. |
| `headers` | `DeletePolicyTypesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePolicyTypes("TrvExpensePolicy", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updatePolicyTypes</summary>

Updates a policy type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `policyType` | `string` | Yes | The policy type key field. |
| `payload` | `PolicyType` | Yes | The request body. |
| `headers` | `UpdatePolicyTypesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `PolicyType|error`

Sample code:

```ballerina
workflow:PolicyType updated = check fo->updatePolicyTypes(
    "TrvExpensePolicy",
    {isPolicyReadOnly: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Process Stages

<details>
<summary>listProcessStages</summary>

Lists process stages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProcessStagesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ProcessStagesCollection|error`

Sample code:

```ballerina
workflow:ProcessStagesCollection result = check fo->listProcessStages(
    queries = {filter: "ProcessType eq 'Onboarding'"}
);
```

</details>

<details>
<summary>createProcessStages</summary>

Creates a process stage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProcessStage` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProcessStage|error`

Sample code:

```ballerina
workflow:ProcessStage created = check fo->createProcessStages({
    dataAreaId: "usmf",
    processType: "Onboarding",
    name: "ManagerApproval",
    description: "Manager approval stage",
    sequenceNumber: 10
});
```

</details>

<details>
<summary>getProcessStages</summary>

Retrieves a process stage by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `processType` | `string` | Yes | The process type key field. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProcessStagesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `ProcessStage|error`

Sample code:

```ballerina
workflow:ProcessStage processStage = check fo->getProcessStages("usmf", "Onboarding", "ManagerApproval");
```

</details>

<details>
<summary>deleteProcessStages</summary>

Deletes a process stage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `processType` | `string` | Yes | The process type key field. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteProcessStagesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProcessStages("usmf", "Onboarding", "ManagerApproval", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateProcessStages</summary>

Updates a process stage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `processType` | `string` | Yes | The process type key field. |
| `name` | `string` | Yes | The name key field. |
| `payload` | `ProcessStage` | Yes | The request body. |
| `headers` | `UpdateProcessStagesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `ProcessStage|error`

Sample code:

```ballerina
workflow:ProcessStage updated = check fo->updateProcessStages(
    "usmf",
    "Onboarding",
    "ManagerApproval",
    {sequenceNumber: 20},
    headers = {ifMatch: eTag}
);
```

</details>

#### Rec Setup Bases

<details>
<summary>listRecSetupBases</summary>

Lists reconciliation setup bases.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRecSetupBasesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `RecSetupBasesCollection|error`

Sample code:

```ballerina
workflow:RecSetupBasesCollection result = check fo->listRecSetupBases(
    queries = {filter: "ItemGroup eq 'FinishedGoods'"}
);
```

</details>

<details>
<summary>createRecSetupBases</summary>

Creates a reconciliation setup basis.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RecSetupBasis` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `RecSetupBasis|error`

Sample code:

```ballerina
workflow:RecSetupBasis created = check fo->createRecSetupBases({
    dataAreaId: "usmf",
    itemId: "1000",
    itemGroup: "FinishedGoods",
    description: "Reconciliation setup basis for finished goods"
});
```

</details>

<details>
<summary>getRecSetupBases</summary>

Retrieves a reconciliation setup basis by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemId` | `string` | Yes | The item id key field. |
| `itemGroup` | `string` | Yes | The item group key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetRecSetupBasesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `RecSetupBasis|error`

Sample code:

```ballerina
workflow:RecSetupBasis recSetupBasis = check fo->getRecSetupBases("usmf", "1000", "FinishedGoods");
```

</details>

<details>
<summary>deleteRecSetupBases</summary>

Deletes a reconciliation setup basis.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemId` | `string` | Yes | The item id key field. |
| `itemGroup` | `string` | Yes | The item group key field. |
| `headers` | `DeleteRecSetupBasesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRecSetupBases("usmf", "1000", "FinishedGoods", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateRecSetupBases</summary>

Updates a reconciliation setup basis.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `itemId` | `string` | Yes | The item id key field. |
| `itemGroup` | `string` | Yes | The item group key field. |
| `payload` | `RecSetupBasis` | Yes | The request body. |
| `headers` | `UpdateRecSetupBasesHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `RecSetupBasis|error`

Sample code:

```ballerina
workflow:RecSetupBasis updated = check fo->updateRecSetupBases(
    "usmf",
    "1000",
    "FinishedGoods",
    {description: "Reconciliation setup basis for finished goods (revised)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Workflows

<details>
<summary>listWorkflows</summary>

Lists workflow definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListWorkflowsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `WorkflowsCollection|error`

Sample code:

```ballerina
workflow:WorkflowsCollection result = check fo->listWorkflows(
    queries = {filter: "Module eq 'PurchaseOrder'"}
);
```

</details>

<details>
<summary>createWorkflows</summary>

Creates a workflow definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Workflow` | Yes | The request body. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Workflow|error`

Sample code:

```ballerina
workflow:Workflow created = check fo->createWorkflows({
    sequenceNumber: "PurchReqApproval-1",
    name: "Purchase requisition approval",
    associationType: "Company",
    'type: "Definition",
    dataArea: "usmf",
    templateName: "PurchReqApprovalTemplate",
    'module: "PurchaseOrder",
    defaultConfiguration: "Yes",
    categoryName: "Procurement"
});
```

</details>

<details>
<summary>getWorkflows</summary>

Retrieves a workflow definition by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNumber` | `string` | Yes | The sequence number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetWorkflowsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `Workflow|error`

Sample code:

```ballerina
workflow:Workflow wf = check fo->getWorkflows("PurchReqApproval-1");
```

</details>

<details>
<summary>deleteWorkflows</summary>

Deletes a workflow definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNumber` | `string` | Yes | The sequence number key field. |
| `headers` | `DeleteWorkflowsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteWorkflows("PurchReqApproval-1", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateWorkflows</summary>

Updates a workflow definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNumber` | `string` | Yes | The sequence number key field. |
| `payload` | `Workflow` | Yes | The request body. |
| `headers` | `UpdateWorkflowsHeaders` | No | Additional HTTP request headers. Include `ifMatch` with the entity's current ETag. |

Returns: `Workflow|error`

Sample code:

```ballerina
workflow:Workflow updated = check fo->updateWorkflows(
    "PurchReqApproval-1",
    {defaultConfiguration: "No"},
    headers = {ifMatch: eTag}
);
```

</details>
