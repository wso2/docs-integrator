---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.project` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides CRUD access to Microsoft Dynamics 365 Finance and Operations project entities via the OData REST API. |

---

## Client

Provides CRUD access to Microsoft Dynamics 365 Finance and Operations project entities via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials grant configuration (`tokenUrl`, `clientId`, `clientSecret`, `scopes`) used to authenticate with Microsoft Entra ID. |
| `httpVersion` | `http:HttpVersion` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.project;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

project:Client fo = check new (
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

#### CDS Projects

<details>
<summary>listCDSProjects</summary>

<div>

Lists CDS project records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListCDSProjectsQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `CDSProjectsCollection|error`

Sample code:

```ballerina
project:CDSProjectsCollection result = check fo->listCDSProjects(
    queries = {
        filter: "ProjectType eq 'TimeMaterial'",
        top: 20,
        'select: "ProjectID,ProjectName,CustomerAccount"
    }
);
```

</div>

</details>

<details>
<summary>createCDSProjects</summary>

<div>

Creates a CDS project record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CDSProject` | Yes | CDS project fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `CDSProject|error`

Sample code:

```ballerina
project:CDSProject created = check fo->createCDSProjects({
    dataAreaId: "usmf",
    projectID: "CDS-1001",
    projectName: "Warehouse Expansion",
    customerAccount: "CUST-4021",
    projectType: "TimeMaterial",
    startDate: "2026-09-01"
});
```

</div>

</details>

<details>
<summary>getCDSProjects</summary>

<div>

Gets a CDS project record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectID` | `string` | Yes | The project ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCDSProjectsQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `CDSProject|error`

Sample code:

```ballerina
project:CDSProject cdsProject = check fo->getCDSProjects("usmf", "CDS-1001");
```

</div>

</details>

<details>
<summary>deleteCDSProjects</summary>

<div>

Deletes a CDS project record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectID` | `string` | Yes | The project ID key field. |
| `headers` | `DeleteCDSProjectsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCDSProjects("usmf", "CDS-1001");
```

</div>

</details>

<details>
<summary>updateCDSProjects</summary>

<div>

Updates a CDS project record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectID` | `string` | Yes | The project ID key field. |
| `payload` | `CDSProject` | Yes | Fields to update. |
| `headers` | `UpdateCDSProjectsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `CDSProject|error`

Sample code:

```ballerina
project:CDSProject updated = check fo->updateCDSProjects(
    "usmf",
    "CDS-1001",
    {description: "Warehouse Expansion - Phase 2"}
);
```

</div>

</details>

#### PSA Actuals

<details>
<summary>listPSAActuals</summary>

<div>

Lists posted project actual transactions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPSAActualsQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `PSAActualsCollection|error`

Sample code:

```ballerina
project:PSAActualsCollection result = check fo->listPSAActuals(
    queries = {
        filter: "ProjId eq 'PROJ-100'",
        top: 50
    }
);
```

</div>

</details>

<details>
<summary>createPSAActuals</summary>

<div>

Creates a project actual transaction record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PSAActual` | Yes | Project actual transaction fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PSAActual|error`

Sample code:

```ballerina
project:PSAActual created = check fo->createPSAActuals({
    dataAreaId: "usmf",
    projId: "PROJ-100",
    transId: "TRX-9001",
    categoryId: "CONSULT",
    projTransType: "Hour",
    qty: 8,
    amountMst: 640.00d
});
```

</div>

</details>

<details>
<summary>getPSAActuals</summary>

<div>

Gets a project actual transaction record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transId` | `string` | Yes | The trans ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPSAActualsQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `PSAActual|error`

Sample code:

```ballerina
project:PSAActual actual = check fo->getPSAActuals("usmf", "TRX-9001");
```

</div>

</details>

<details>
<summary>deletePSAActuals</summary>

<div>

Deletes a project actual transaction record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transId` | `string` | Yes | The trans ID key field. |
| `headers` | `DeletePSAActualsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePSAActuals("usmf", "TRX-9001");
```

</div>

</details>

<details>
<summary>updatePSAActuals</summary>

<div>

Updates a project actual transaction record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transId` | `string` | Yes | The trans ID key field. |
| `payload` | `PSAActual` | Yes | Fields to update. |
| `headers` | `UpdatePSAActualsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `PSAActual|error`

Sample code:

```ballerina
project:PSAActual updated = check fo->updatePSAActuals(
    "usmf",
    "TRX-9001",
    {qty: 7.5d}
);
```

</div>

</details>

#### PSA Forecasts

<details>
<summary>listPSAForecasts</summary>

<div>

Lists forecasted project amounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPSAForecastsQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `PSAForecastsCollection|error`

Sample code:

```ballerina
project:PSAForecastsCollection result = check fo->listPSAForecasts(
    queries = {
        filter: "ProjId eq 'PROJ-100'"
    }
);
```

</div>

</details>

<details>
<summary>createPSAForecasts</summary>

<div>

Creates a project forecast record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PSAForecast` | Yes | Project forecast fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PSAForecast|error`

Sample code:

```ballerina
project:PSAForecast created = check fo->createPSAForecasts({
    dataAreaId: "usmf",
    projId: "PROJ-100",
    transId: "FCST-2001",
    categoryId: "CONSULT",
    projType: "TimeMaterial",
    qty: 40,
    amountMst: 3200.00d
});
```

</div>

</details>

<details>
<summary>getPSAForecasts</summary>

<div>

Gets a project forecast record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transId` | `string` | Yes | The trans ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPSAForecastsQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `PSAForecast|error`

Sample code:

```ballerina
project:PSAForecast forecast = check fo->getPSAForecasts("usmf", "FCST-2001");
```

</div>

</details>

<details>
<summary>deletePSAForecasts</summary>

<div>

Deletes a project forecast record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transId` | `string` | Yes | The trans ID key field. |
| `headers` | `DeletePSAForecastsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePSAForecasts("usmf", "FCST-2001");
```

</div>

</details>

<details>
<summary>updatePSAForecasts</summary>

<div>

Updates a project forecast record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `transId` | `string` | Yes | The trans ID key field. |
| `payload` | `PSAForecast` | Yes | Fields to update. |
| `headers` | `UpdatePSAForecastsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `PSAForecast|error`

Sample code:

```ballerina
project:PSAForecast updated = check fo->updatePSAForecasts(
    "usmf",
    "FCST-2001",
    {qty: 45}
);
```

</div>

</details>

#### Proj Grants

<details>
<summary>listProjGrants</summary>

<div>

Lists project grant records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjGrantsQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjGrantsCollection|error`

Sample code:

```ballerina
project:ProjGrantsCollection result = check fo->listProjGrants(
    queries = {
        filter: "GrantStatus eq 'Active'"
    }
);
```

</div>

</details>

<details>
<summary>createProjGrants</summary>

<div>

Creates a project grant record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjGrant` | Yes | Project grant fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProjGrant|error`

Sample code:

```ballerina
project:ProjGrant created = check fo->createProjGrants({
    dataAreaId: "usmf",
    grantId: "GRANT-500",
    grantName: "Community Infrastructure Grant",
    custAccount: "CUST-4021",
    grantStatus: "Submitted",
    matchingPercentage: 20.0d
});
```

</div>

</details>

<details>
<summary>getProjGrants</summary>

<div>

Gets a project grant record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `grantId` | `string` | Yes | The grant ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjGrantsQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `ProjGrant|error`

Sample code:

```ballerina
project:ProjGrant grant = check fo->getProjGrants("usmf", "GRANT-500");
```

</div>

</details>

<details>
<summary>deleteProjGrants</summary>

<div>

Deletes a project grant record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `grantId` | `string` | Yes | The grant ID key field. |
| `headers` | `DeleteProjGrantsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjGrants("usmf", "GRANT-500");
```

</div>

</details>

<details>
<summary>updateProjGrants</summary>

<div>

Updates a project grant record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `grantId` | `string` | Yes | The grant ID key field. |
| `payload` | `ProjGrant` | Yes | Fields to update. |
| `headers` | `UpdateProjGrantsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `ProjGrant|error`

Sample code:

```ballerina
project:ProjGrant updated = check fo->updateProjGrants(
    "usmf",
    "GRANT-500",
    {grantStatus: "Approved"}
);
```

</div>

</details>

#### Proj Grants V2

<details>
<summary>listProjGrantsV2</summary>

<div>

Lists project grant records (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjGrantsV2Queries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjGrantsV2Collection|error`

Sample code:

```ballerina
project:ProjGrantsV2Collection result = check fo->listProjGrantsV2(
    queries = {
        filter: "GrantStatus eq 'Awarded'",
        top: 10
    }
);
```

</div>

</details>

<details>
<summary>createProjGrantsV2</summary>

<div>

Creates a project grant record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjGrantV2` | Yes | Project grant fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProjGrantV2|error`

Sample code:

```ballerina
project:ProjGrantV2 created = check fo->createProjGrantsV2({
    dataAreaId: "usmf",
    grantId: "GRANT-V2-500",
    grantName: "Rural Broadband Grant",
    custAccount: "CUST-4021",
    grantorAgency: "State Development Fund",
    requestedAmount: 150000.00d,
    matchingAmount: 30000.00d
});
```

</div>

</details>

<details>
<summary>getProjGrantsV2</summary>

<div>

Gets a project grant record (V2) by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `grantId` | `string` | Yes | The grant ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjGrantsV2Queries` | No | Query parameters: `expand`, `'select`. |

Returns: `ProjGrantV2|error`

Sample code:

```ballerina
project:ProjGrantV2 grant = check fo->getProjGrantsV2("usmf", "GRANT-V2-500");
```

</div>

</details>

<details>
<summary>deleteProjGrantsV2</summary>

<div>

Deletes a project grant record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `grantId` | `string` | Yes | The grant ID key field. |
| `headers` | `DeleteProjGrantsV2Headers` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjGrantsV2("usmf", "GRANT-V2-500");
```

</div>

</details>

<details>
<summary>updateProjGrantsV2</summary>

<div>

Updates a project grant record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `grantId` | `string` | Yes | The grant ID key field. |
| `payload` | `ProjGrantV2` | Yes | Fields to update. |
| `headers` | `UpdateProjGrantsV2Headers` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `ProjGrantV2|error`

Sample code:

```ballerina
project:ProjGrantV2 updated = check fo->updateProjGrantsV2(
    "usmf",
    "GRANT-V2-500",
    {grantStatus: "Awarded"}
);
```

</div>

</details>

#### Project Groups

<details>
<summary>listProjectGroups</summary>

<div>

Lists project group records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjectGroupsQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjectGroupsCollection|error`

Sample code:

```ballerina
project:ProjectGroupsCollection result = check fo->listProjectGroups(
    queries = {
        filter: "ProjectType eq 'TimeMaterial'"
    }
);
```

</div>

</details>

<details>
<summary>createProjectGroups</summary>

<div>

Creates a project group record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectGroup` | Yes | Project group fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProjectGroup|error`

Sample code:

```ballerina
project:ProjectGroup created = check fo->createProjectGroups({
    dataAreaId: "usmf",
    projectGroup: "TM-CONSULT",
    name: "Time and Material Consulting",
    projectType: "TimeMaterial",
    postCostsHour: "Operations"
});
```

</div>

</details>

<details>
<summary>getProjectGroups</summary>

<div>

Gets a project group record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectGroup` | `string` | Yes | The project group key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjectGroupsQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `ProjectGroup|error`

Sample code:

```ballerina
project:ProjectGroup group = check fo->getProjectGroups("usmf", "TM-CONSULT");
```

</div>

</details>

<details>
<summary>deleteProjectGroups</summary>

<div>

Deletes a project group record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectGroup` | `string` | Yes | The project group key field. |
| `headers` | `DeleteProjectGroupsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjectGroups("usmf", "TM-CONSULT");
```

</div>

</details>

<details>
<summary>updateProjectGroups</summary>

<div>

Updates a project group record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectGroup` | `string` | Yes | The project group key field. |
| `payload` | `ProjectGroup` | Yes | Fields to update. |
| `headers` | `UpdateProjectGroupsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `ProjectGroup|error`

Sample code:

```ballerina
project:ProjectGroup updated = check fo->updateProjectGroups(
    "usmf",
    "TM-CONSULT",
    {name: "Time and Material Consulting - Revised"}
);
```

</div>

</details>

#### Project Stages

<details>
<summary>listProjectStages</summary>

<div>

Lists project stage records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjectStagesQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjectStagesCollection|error`

Sample code:

```ballerina
project:ProjectStagesCollection result = check fo->listProjectStages(
    queries = {
        filter: "Status eq 'InProcess'"
    }
);
```

</div>

</details>

<details>
<summary>createProjectStages</summary>

<div>

Creates a project stage record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectStage` | Yes | Project stage fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProjectStage|error`

Sample code:

```ballerina
project:ProjectStage created = check fo->createProjectStages({
    dataAreaId: "usmf",
    language: "en-us",
    status: "InProcess",
    stage: "Execution"
});
```

</div>

</details>

<details>
<summary>getProjectStages</summary>

<div>

Gets a project stage record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `language` | `string` | Yes | The language key field. |
| `status` | `string` | Yes | The status key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjectStagesQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `ProjectStage|error`

Sample code:

```ballerina
project:ProjectStage stage = check fo->getProjectStages("usmf", "en-us", "InProcess");
```

</div>

</details>

<details>
<summary>deleteProjectStages</summary>

<div>

Deletes a project stage record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `language` | `string` | Yes | The language key field. |
| `status` | `string` | Yes | The status key field. |
| `headers` | `DeleteProjectStagesHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjectStages("usmf", "en-us", "InProcess");
```

</div>

</details>

<details>
<summary>updateProjectStages</summary>

<div>

Updates a project stage record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `language` | `string` | Yes | The language key field. |
| `status` | `string` | Yes | The status key field. |
| `payload` | `ProjectStage` | Yes | Fields to update. |
| `headers` | `UpdateProjectStagesHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `ProjectStage|error`

Sample code:

```ballerina
project:ProjectStage updated = check fo->updateProjectStages(
    "usmf",
    "en-us",
    "InProcess",
    {stage: "Execution - Milestone 2"}
);
```

</div>

</details>

#### Project Tasks

<details>
<summary>listProjectTasks</summary>

<div>

Lists project task records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjectTasksQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjectTasksCollection|error`

Sample code:

```ballerina
project:ProjectTasksCollection result = check fo->listProjectTasks(
    queries = {
        filter: "ProjectId eq 'PROJ-100'",
        orderby: "TaskDisplaySequence"
    }
);
```

</div>

</details>

<details>
<summary>createProjectTasks</summary>

<div>

Creates a project task record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectTask` | Yes | Project task fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProjectTask|error`

Sample code:

```ballerina
project:ProjectTask created = check fo->createProjectTasks({
    dataAreaId: "usmf",
    projectId: "PROJ-100",
    taskId: "TASK-010",
    taskName: "Site survey",
    taskOutlineLevel: 1,
    taskDisplaySequence: 10
});
```

</div>

</details>

<details>
<summary>getProjectTasks</summary>

<div>

Gets a project task record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectId` | `string` | Yes | The project ID key field. |
| `taskId` | `string` | Yes | The task ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjectTasksQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `ProjectTask|error`

Sample code:

```ballerina
project:ProjectTask task = check fo->getProjectTasks("usmf", "PROJ-100", "TASK-010");
```

</div>

</details>

<details>
<summary>deleteProjectTasks</summary>

<div>

Deletes a project task record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectId` | `string` | Yes | The project ID key field. |
| `taskId` | `string` | Yes | The task ID key field. |
| `headers` | `DeleteProjectTasksHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjectTasks("usmf", "PROJ-100", "TASK-010");
```

</div>

</details>

<details>
<summary>updateProjectTasks</summary>

<div>

Updates a project task record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectId` | `string` | Yes | The project ID key field. |
| `taskId` | `string` | Yes | The task ID key field. |
| `payload` | `ProjectTask` | Yes | Fields to update. |
| `headers` | `UpdateProjectTasksHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `ProjectTask|error`

Sample code:

```ballerina
project:ProjectTask updated = check fo->updateProjectTasks(
    "usmf",
    "PROJ-100",
    "TASK-010",
    {taskName: "Site survey and inspection"}
);
```

</div>

</details>

#### Projects

<details>
<summary>listProjects</summary>

<div>

Lists project records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjectsQueries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjectsCollection|error`

Sample code:

```ballerina
project:ProjectsCollection result = check fo->listProjects(
    queries = {
        filter: "ProjectGroup eq 'TM-CONSULT'",
        top: 25,
        'select: "ProjectID,ProjectName,Status,CustomerAccount"
    }
);
```

</div>

</details>

<details>
<summary>createProjects</summary>

<div>

Creates a project record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Project` | Yes | Project fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Project|error`

Sample code:

```ballerina
project:Project created = check fo->createProjects({
    dataAreaId: "usmf",
    projectID: "PROJ-100",
    projectName: "Client Portal Upgrade",
    projectGroup: "TM-CONSULT",
    projectType: "TimeMaterial",
    customerAccount: "CUST-4021",
    startDate1: "2026-09-01"
});
```

</div>

</details>

<details>
<summary>getProjects</summary>

<div>

Gets a project record by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectID` | `string` | Yes | The project ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjectsQueries` | No | Query parameters: `expand`, `'select`. |

Returns: `Project|error`

Sample code:

```ballerina
project:Project proj = check fo->getProjects("usmf", "PROJ-100");
```

</div>

</details>

<details>
<summary>deleteProjects</summary>

<div>

Deletes a project record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectID` | `string` | Yes | The project ID key field. |
| `headers` | `DeleteProjectsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjects("usmf", "PROJ-100");
```

</div>

</details>

<details>
<summary>updateProjects</summary>

<div>

Updates a project record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectID` | `string` | Yes | The project ID key field. |
| `payload` | `Project` | Yes | Fields to update. |
| `headers` | `UpdateProjectsHeaders` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `Project|error`

Sample code:

```ballerina
project:Project updated = check fo->updateProjects(
    "usmf",
    "PROJ-100",
    {status: "InProcess"}
);
```

</div>

</details>

#### Projects V2

<details>
<summary>listProjectsV2</summary>

<div>

Lists project records (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListProjectsV2Queries` | No | Query parameters: `skip`, `top`, `filter`, `orderby`, `expand`, `crossCompany`, `count`, `'select`. |

Returns: `ProjectsV2Collection|error`

Sample code:

```ballerina
project:ProjectsV2Collection result = check fo->listProjectsV2(
    queries = {
        filter: "ProjectGroupId eq 'TM-CONSULT'",
        top: 25
    }
);
```

</div>

</details>

<details>
<summary>createProjectsV2</summary>

<div>

Creates a project record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectV2` | Yes | Project fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProjectV2|error`

Sample code:

```ballerina
project:ProjectV2 created = check fo->createProjectsV2({
    dataAreaId: "usmf",
    projectId: "PROJ-200",
    projectName: "Data Center Migration",
    projectGroupId: "TM-CONSULT",
    customerAccountNumber: "CUST-4021",
    scheduleStartDate: "2026-10-01"
});
```

</div>

</details>

<details>
<summary>getProjectsV2</summary>

<div>

Gets a project record (V2) by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectId` | `string` | Yes | The project ID key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetProjectsV2Queries` | No | Query parameters: `expand`, `'select`. |

Returns: `ProjectV2|error`

Sample code:

```ballerina
project:ProjectV2 proj = check fo->getProjectsV2("usmf", "PROJ-200");
```

</div>

</details>

<details>
<summary>deleteProjectsV2</summary>

<div>

Deletes a project record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectId` | `string` | Yes | The project ID key field. |
| `headers` | `DeleteProjectsV2Headers` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteProjectsV2("usmf", "PROJ-200");
```

</div>

</details>

<details>
<summary>updateProjectsV2</summary>

<div>

Updates a project record (V2).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `projectId` | `string` | Yes | The project ID key field. |
| `payload` | `ProjectV2` | Yes | Fields to update. |
| `headers` | `UpdateProjectsV2Headers` | No | Optional `ifMatch` ETag header, sent as `If-Match`. |

Returns: `ProjectV2|error`

Sample code:

```ballerina
project:ProjectV2 updated = check fo->updateProjectsV2(
    "usmf",
    "PROJ-200",
    {scheduleEndDate: "2027-03-31"}
);
```

</div>

</details>
