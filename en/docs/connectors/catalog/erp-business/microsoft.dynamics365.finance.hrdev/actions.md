---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.hrdev` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance HR Development entities via the OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance HR Development entities via the OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID. |
| `httpVersion` | `http:HttpVersion` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.hrdev;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

hrdev:Client fo = check new (
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

#### Course Groups

<details>
<summary>listCourseGroups</summary>

Lists all course groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListCourseGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CourseGroupsCollection|error`

Sample code:

```ballerina
hrdev:CourseGroupsCollection groups = check fo->listCourseGroups(
    queries = {filter: "contains(Description,'Leadership')", top: 20}
);
```

</details>

<details>
<summary>createCourseGroups</summary>

Creates a course group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CourseGroup` | Yes | Course group fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `CourseGroup|error`

Sample code:

```ballerina
hrdev:CourseGroup created = check fo->createCourseGroups({
    group: "LEAD",
    description: "Leadership development"
});
```

</details>

<details>
<summary>getCourseGroups</summary>

Reads a course group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `group` | `string` | Yes | The group key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCourseGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `CourseGroup|error`

Sample code:

```ballerina
hrdev:CourseGroup group = check fo->getCourseGroups("LEAD");
```

</details>

<details>
<summary>deleteCourseGroups</summary>

Deletes a course group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `group` | `string` | Yes | The group key field. |
| `headers` | `DeleteCourseGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCourseGroups("LEAD", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateCourseGroups</summary>

Updates a course group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `group` | `string` | Yes | The group key field. |
| `payload` | `CourseGroup` | Yes | Fields to update. |
| `headers` | `UpdateCourseGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `CourseGroup|error`

Sample code:

```ballerina
hrdev:CourseGroup updated = check fo->updateCourseGroups(
    "LEAD",
    {description: "Leadership & management development"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Job Tasks

<details>
<summary>listJobTasks</summary>

Lists all job tasks.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListJobTasksQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `JobTasksCollection|error`

Sample code:

```ballerina
hrdev:JobTasksCollection tasks = check fo->listJobTasks(queries = {top: 25});
```

</details>

<details>
<summary>createJobTasks</summary>

Creates a job task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JobTask` | Yes | Job task fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `JobTask|error`

Sample code:

```ballerina
hrdev:JobTask created = check fo->createJobTasks({
    jobTaskId: "JT-0100",
    description: "Conduct client onboarding",
    note: "Standard onboarding task"
});
```

</details>

<details>
<summary>getJobTasks</summary>

Reads a job task by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobTaskId` | `string` | Yes | The job task id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetJobTasksQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `JobTask|error`

Sample code:

```ballerina
hrdev:JobTask task = check fo->getJobTasks("JT-0100");
```

</details>

<details>
<summary>deleteJobTasks</summary>

Deletes a job task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobTaskId` | `string` | Yes | The job task id key field. |
| `headers` | `DeleteJobTasksHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteJobTasks("JT-0100", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateJobTasks</summary>

Updates a job task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobTaskId` | `string` | Yes | The job task id key field. |
| `payload` | `JobTask` | Yes | Fields to update. |
| `headers` | `UpdateJobTasksHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `JobTask|error`

Sample code:

```ballerina
hrdev:JobTask updated = check fo->updateJobTasks(
    "JT-0100",
    {note: "Updated onboarding checklist"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Job Templates

<details>
<summary>listJobTemplates</summary>

Lists all job templates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListJobTemplatesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `JobTemplatesCollection|error`

Sample code:

```ballerina
hrdev:JobTemplatesCollection templates = check fo->listJobTemplates();
```

</details>

<details>
<summary>createJobTemplates</summary>

Creates a job template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JobTemplate` | Yes | Job template fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `JobTemplate|error`

Sample code:

```ballerina
hrdev:JobTemplate created = check fo->createJobTemplates({
    jobTemplate: "JOBTMPL-ENG-01",
    description: "Software Engineer job template",
    note: "Includes standard engineering job tasks"
});
```

</details>

<details>
<summary>getJobTemplates</summary>

Reads a job template by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobTemplate` | `string` | Yes | The job template key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetJobTemplatesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `JobTemplate|error`

Sample code:

```ballerina
hrdev:JobTemplate template = check fo->getJobTemplates("JOBTMPL-ENG-01");
```

</details>

<details>
<summary>deleteJobTemplates</summary>

Deletes a job template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobTemplate` | `string` | Yes | The job template key field. |
| `headers` | `DeleteJobTemplatesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteJobTemplates("JOBTMPL-ENG-01", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateJobTemplates</summary>

Updates a job template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobTemplate` | `string` | Yes | The job template key field. |
| `payload` | `JobTemplate` | Yes | Fields to update. |
| `headers` | `UpdateJobTemplatesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `JobTemplate|error`

Sample code:

```ballerina
hrdev:JobTemplate updated = check fo->updateJobTemplates(
    "JOBTMPL-ENG-01",
    {description: "Senior Software Engineer job template"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Labor Unions

<details>
<summary>listLaborUnions</summary>

Lists all labor unions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLaborUnionsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `LaborUnionsCollection|error`

Sample code:

```ballerina
hrdev:LaborUnionsCollection unions = check fo->listLaborUnions();
```

</details>

<details>
<summary>createLaborUnions</summary>

Creates a labor union.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LaborUnions` | Yes | Labor union fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LaborUnions|error`

Sample code:

```ballerina
hrdev:LaborUnions created = check fo->createLaborUnions({
    unionID: "LU-100",
    name: "Metalworkers Union Local 100",
    negotiator: "Yes"
});
```

</details>

<details>
<summary>getLaborUnions</summary>

Reads a labor union by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unionID` | `string` | Yes | The union id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLaborUnionsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `LaborUnions|error`

Sample code:

```ballerina
hrdev:LaborUnions union = check fo->getLaborUnions("LU-100");
```

</details>

<details>
<summary>deleteLaborUnions</summary>

Deletes a labor union.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unionID` | `string` | Yes | The union id key field. |
| `headers` | `DeleteLaborUnionsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLaborUnions("LU-100", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateLaborUnions</summary>

Updates a labor union.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unionID` | `string` | Yes | The union id key field. |
| `payload` | `LaborUnions` | Yes | Fields to update. |
| `headers` | `UpdateLaborUnionsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `LaborUnions|error`

Sample code:

```ballerina
hrdev:LaborUnions updated = check fo->updateLaborUnions(
    "LU-100",
    {negotiator: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Loan Items

<details>
<summary>listLoanItems</summary>

Lists all loan items.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLoanItemsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `LoanItemsCollection|error`

Sample code:

```ballerina
hrdev:LoanItemsCollection items = check fo->listLoanItems(
    queries = {filter: "LoanTypeId eq 'IT-EQUIP'"}
);
```

</details>

<details>
<summary>createLoanItems</summary>

Creates a loan item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LoanItem` | Yes | Loan item fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LoanItem|error`

Sample code:

```ballerina
hrdev:LoanItem created = check fo->createLoanItems({
    loanItemId: "LAPTOP-0007",
    description: "Dell Latitude laptop",
    gracePeriodDays: 5,
    serialNumber: "SN-88213",
    loanDays: 365,
    loanTypeId: "IT-EQUIP",
    personInCharge: "emp-00231",
    taxReporting: "Taxable"
});
```

</details>

<details>
<summary>getLoanItems</summary>

Reads a loan item by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loanItemId` | `string` | Yes | The loan item id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLoanItemsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `LoanItem|error`

Sample code:

```ballerina
hrdev:LoanItem item = check fo->getLoanItems("LAPTOP-0007");
```

</details>

<details>
<summary>deleteLoanItems</summary>

Deletes a loan item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loanItemId` | `string` | Yes | The loan item id key field. |
| `headers` | `DeleteLoanItemsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLoanItems("LAPTOP-0007", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateLoanItems</summary>

Updates a loan item.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loanItemId` | `string` | Yes | The loan item id key field. |
| `payload` | `LoanItem` | Yes | Fields to update. |
| `headers` | `UpdateLoanItemsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `LoanItem|error`

Sample code:

```ballerina
hrdev:LoanItem updated = check fo->updateLoanItems(
    "LAPTOP-0007",
    {personInCharge: "emp-00456"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Loan Types

<details>
<summary>listLoanTypes</summary>

Lists all loan types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListLoanTypesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `LoanTypesCollection|error`

Sample code:

```ballerina
hrdev:LoanTypesCollection types = check fo->listLoanTypes();
```

</details>

<details>
<summary>createLoanTypes</summary>

Creates a loan type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LoanType` | Yes | Loan type fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `LoanType|error`

Sample code:

```ballerina
hrdev:LoanType created = check fo->createLoanTypes({
    loanTypeId: "IT-EQUIP",
    description: "IT equipment loans",
    gracePeriodDays: 5
});
```

</details>

<details>
<summary>getLoanTypes</summary>

Reads a loan type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loanTypeId` | `string` | Yes | The loan type id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetLoanTypesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `LoanType|error`

Sample code:

```ballerina
hrdev:LoanType loanType = check fo->getLoanTypes("IT-EQUIP");
```

</details>

<details>
<summary>deleteLoanTypes</summary>

Deletes a loan type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loanTypeId` | `string` | Yes | The loan type id key field. |
| `headers` | `DeleteLoanTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLoanTypes("IT-EQUIP", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateLoanTypes</summary>

Updates a loan type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loanTypeId` | `string` | Yes | The loan type id key field. |
| `payload` | `LoanType` | Yes | Fields to update. |
| `headers` | `UpdateLoanTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `LoanType|error`

Sample code:

```ballerina
hrdev:LoanType updated = check fo->updateLoanTypes(
    "IT-EQUIP",
    {gracePeriodDays: 7},
    headers = {ifMatch: eTag}
);
```

</details>

#### Position Types

<details>
<summary>listPositionTypes</summary>

Lists all position types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPositionTypesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PositionTypesCollection|error`

Sample code:

```ballerina
hrdev:PositionTypesCollection types = check fo->listPositionTypes();
```

</details>

<details>
<summary>createPositionTypes</summary>

Creates a position type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PositionType` | Yes | Position type fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PositionType|error`

Sample code:

```ballerina
hrdev:PositionType created = check fo->createPositionTypes({
    positionTypeId: "FTE-ENG",
    description: "Full-time engineering position",
    classification: "FullTime"
});
```

</details>

<details>
<summary>getPositionTypes</summary>

Reads a position type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `positionTypeId` | `string` | Yes | The position type id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPositionTypesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `PositionType|error`

Sample code:

```ballerina
hrdev:PositionType positionType = check fo->getPositionTypes("FTE-ENG");
```

</details>

<details>
<summary>deletePositionTypes</summary>

Deletes a position type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `positionTypeId` | `string` | Yes | The position type id key field. |
| `headers` | `DeletePositionTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePositionTypes("FTE-ENG", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updatePositionTypes</summary>

Updates a position type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `positionTypeId` | `string` | Yes | The position type id key field. |
| `payload` | `PositionType` | Yes | Fields to update. |
| `headers` | `UpdatePositionTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `PositionType|error`

Sample code:

```ballerina
hrdev:PositionType updated = check fo->updatePositionTypes(
    "FTE-ENG",
    {classification: "PartTime"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Rating Levels

<details>
<summary>listRatingLevels</summary>

Lists all rating levels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRatingLevelsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `RatingLevelsCollection|error`

Sample code:

```ballerina
hrdev:RatingLevelsCollection levels = check fo->listRatingLevels(
    queries = {filter: "RatingModelId eq 'TECH-SKILLS'"}
);
```

</details>

<details>
<summary>createRatingLevels</summary>

Creates a rating level.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RatingLevel` | Yes | Rating level fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `RatingLevel|error`

Sample code:

```ballerina
hrdev:RatingLevel created = check fo->createRatingLevels({
    ratingLevelId: "EXPERT",
    ratingModelId: "TECH-SKILLS",
    description: "Expert proficiency",
    factor: 5,
    note: "Recognized subject matter expert"
});
```

</details>

<details>
<summary>getRatingLevels</summary>

Reads a rating level by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ratingLevelId` | `string` | Yes | The rating level id key field. |
| `ratingModelId` | `string` | Yes | The rating model id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetRatingLevelsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `RatingLevel|error`

Sample code:

```ballerina
hrdev:RatingLevel level = check fo->getRatingLevels("EXPERT", "TECH-SKILLS");
```

</details>

<details>
<summary>deleteRatingLevels</summary>

Deletes a rating level.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ratingLevelId` | `string` | Yes | The rating level id key field. |
| `ratingModelId` | `string` | Yes | The rating model id key field. |
| `headers` | `DeleteRatingLevelsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRatingLevels("EXPERT", "TECH-SKILLS", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateRatingLevels</summary>

Updates a rating level.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ratingLevelId` | `string` | Yes | The rating level id key field. |
| `ratingModelId` | `string` | Yes | The rating model id key field. |
| `payload` | `RatingLevel` | Yes | Fields to update. |
| `headers` | `UpdateRatingLevelsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `RatingLevel|error`

Sample code:

```ballerina
hrdev:RatingLevel updated = check fo->updateRatingLevels(
    "EXPERT",
    "TECH-SKILLS",
    {factor: 6},
    headers = {ifMatch: eTag}
);
```

</details>

#### Rating Models

<details>
<summary>listRatingModels</summary>

Lists all rating models.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListRatingModelsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `RatingModelsCollection|error`

Sample code:

```ballerina
hrdev:RatingModelsCollection models = check fo->listRatingModels();
```

</details>

<details>
<summary>createRatingModels</summary>

Creates a rating model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RatingModel` | Yes | Rating model fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `RatingModel|error`

Sample code:

```ballerina
hrdev:RatingModel created = check fo->createRatingModels({
    ratingModelId: "TECH-SKILLS",
    description: "Technical skills rating model"
});
```

</details>

<details>
<summary>getRatingModels</summary>

Reads a rating model by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ratingModelId` | `string` | Yes | The rating model id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetRatingModelsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `RatingModel|error`

Sample code:

```ballerina
hrdev:RatingModel model = check fo->getRatingModels("TECH-SKILLS");
```

</details>

<details>
<summary>deleteRatingModels</summary>

Deletes a rating model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ratingModelId` | `string` | Yes | The rating model id key field. |
| `headers` | `DeleteRatingModelsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteRatingModels("TECH-SKILLS", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateRatingModels</summary>

Updates a rating model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ratingModelId` | `string` | Yes | The rating model id key field. |
| `payload` | `RatingModel` | Yes | Fields to update. |
| `headers` | `UpdateRatingModelsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `RatingModel|error`

Sample code:

```ballerina
hrdev:RatingModel updated = check fo->updateRatingModels(
    "TECH-SKILLS",
    {description: "Technical & platform skills rating model"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Skill Types

<details>
<summary>listSkillTypes</summary>

Lists all skill types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSkillTypesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `SkillTypesCollection|error`

Sample code:

```ballerina
hrdev:SkillTypesCollection types = check fo->listSkillTypes();
```

</details>

<details>
<summary>createSkillTypes</summary>

Creates a skill type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SkillType` | Yes | Skill type fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `SkillType|error`

Sample code:

```ballerina
hrdev:SkillType created = check fo->createSkillTypes({
    skillType: "TECHNICAL",
    description: "Technical skills",
    color: 4
});
```

</details>

<details>
<summary>getSkillTypes</summary>

Reads a skill type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillType` | `string` | Yes | The skill type key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSkillTypesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `SkillType|error`

Sample code:

```ballerina
hrdev:SkillType skillType = check fo->getSkillTypes("TECHNICAL");
```

</details>

<details>
<summary>deleteSkillTypes</summary>

Deletes a skill type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillType` | `string` | Yes | The skill type key field. |
| `headers` | `DeleteSkillTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSkillTypes("TECHNICAL", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateSkillTypes</summary>

Updates a skill type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillType` | `string` | Yes | The skill type key field. |
| `payload` | `SkillType` | Yes | Fields to update. |
| `headers` | `UpdateSkillTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `SkillType|error`

Sample code:

```ballerina
hrdev:SkillType updated = check fo->updateSkillTypes(
    "TECHNICAL",
    {color: 6},
    headers = {ifMatch: eTag}
);
```

</details>

#### Skills

<details>
<summary>listSkills</summary>

Lists all skills.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSkillsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `SkillsCollection|error`

Sample code:

```ballerina
hrdev:SkillsCollection skills = check fo->listSkills(
    queries = {filter: "SkillTypeId eq 'TECHNICAL'"}
);
```

</details>

<details>
<summary>createSkills</summary>

Creates a skill.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Skill` | Yes | Skill fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Skill|error`

Sample code:

```ballerina
hrdev:Skill created = check fo->createSkills({
    skill: "INTEGRATION-DEV",
    ratingId: "TECH-SKILLS",
    description: "Integration platform development",
    note: "Includes API and connector design",
    skillTypeId: "TECHNICAL"
});
```

</details>

<details>
<summary>getSkills</summary>

Reads a skill by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skill` | `string` | Yes | The skill key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSkillsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `Skill|error`

Sample code:

```ballerina
hrdev:Skill skill = check fo->getSkills("INTEGRATION-DEV");
```

</details>

<details>
<summary>deleteSkills</summary>

Deletes a skill.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skill` | `string` | Yes | The skill key field. |
| `headers` | `DeleteSkillsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSkills("INTEGRATION-DEV", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateSkills</summary>

Updates a skill.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skill` | `string` | Yes | The skill key field. |
| `payload` | `Skill` | Yes | Fields to update. |
| `headers` | `UpdateSkillsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `Skill|error`

Sample code:

```ballerina
hrdev:Skill updated = check fo->updateSkills(
    "INTEGRATION-DEV",
    {note: "Includes API, connector, and event-driven design"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Team Members

<details>
<summary>listTeamMembers</summary>

Lists all team members.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTeamMembersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TeamMembersCollection|error`

Sample code:

```ballerina
hrdev:TeamMembersCollection members = check fo->listTeamMembers(
    queries = {filter: "TeamPartyNumber eq '000123'"}
);
```

</details>

<details>
<summary>createTeamMembers</summary>

Creates a team member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TeamMember` | Yes | Team member fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TeamMember|error`

Sample code:

```ballerina
hrdev:TeamMember created = check fo->createTeamMembers({
    relationshipTypeId: "TeamMember",
    teamMemberPartyNumber: "000512",
    teamPartyNumber: "000123",
    teamMemberName: "Jordan Lee",
    teamName: "Platform Engineering",
    validFrom: "2026-01-01T00:00:00Z",
    validTo: "2154-12-31T00:00:00Z"
});
```

</details>

<details>
<summary>getTeamMembers</summary>

Reads a team member by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `relationshipTypeId` | `string` | Yes | The relationship type id key field. |
| `teamMemberPartyNumber` | `string` | Yes | The team member party number key field. |
| `teamPartyNumber` | `string` | Yes | The team party number key field. |
| `validTo` | `string` | Yes | The valid to key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTeamMembersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `TeamMember|error`

Sample code:

```ballerina
hrdev:TeamMember member = check fo->getTeamMembers(
    "TeamMember",
    "000512",
    "000123",
    "2154-12-31T00:00:00Z",
    "2026-01-01T00:00:00Z"
);
```

</details>

<details>
<summary>deleteTeamMembers</summary>

Deletes a team member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `relationshipTypeId` | `string` | Yes | The relationship type id key field. |
| `teamMemberPartyNumber` | `string` | Yes | The team member party number key field. |
| `teamPartyNumber` | `string` | Yes | The team party number key field. |
| `validTo` | `string` | Yes | The valid to key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `DeleteTeamMembersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTeamMembers(
    "TeamMember",
    "000512",
    "000123",
    "2154-12-31T00:00:00Z",
    "2026-01-01T00:00:00Z",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateTeamMembers</summary>

Updates a team member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `relationshipTypeId` | `string` | Yes | The relationship type id key field. |
| `teamMemberPartyNumber` | `string` | Yes | The team member party number key field. |
| `teamPartyNumber` | `string` | Yes | The team party number key field. |
| `validTo` | `string` | Yes | The valid to key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `payload` | `TeamMember` | Yes | Fields to update. |
| `headers` | `UpdateTeamMembersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `TeamMember|error`

Sample code:

```ballerina
hrdev:TeamMember updated = check fo->updateTeamMembers(
    "TeamMember",
    "000512",
    "000123",
    "2154-12-31T00:00:00Z",
    "2026-01-01T00:00:00Z",
    {teamMemberName: "Jordan A. Lee"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Team Members V2

<details>
<summary>listTeamMembersV2</summary>

Lists all V2 team members.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTeamMembersV2Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TeamMembersV2Collection|error`

Sample code:

```ballerina
hrdev:TeamMembersV2Collection members = check fo->listTeamMembersV2(
    queries = {filter: "TeamName eq 'Platform Engineering'"}
);
```

</details>

<details>
<summary>createTeamMembersV2</summary>

Creates a V2 team member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TeamMemberV2` | Yes | Team member fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TeamMemberV2|error`

Sample code:

```ballerina
hrdev:TeamMemberV2 created = check fo->createTeamMembersV2({
    teamMemberPartyNumber: "000512",
    teamName: "Platform Engineering",
    teamMemberName: "Jordan Lee",
    isTeamLead: "No",
    validFrom: "2026-01-01T00:00:00Z",
    validTo: "2154-12-31T00:00:00Z"
});
```

</details>

<details>
<summary>getTeamMembersV2</summary>

Reads a V2 team member by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamMemberPartyNumber` | `string` | Yes | The team member party number key field. |
| `teamName` | `string` | Yes | The team name key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTeamMembersV2Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `TeamMemberV2|error`

Sample code:

```ballerina
hrdev:TeamMemberV2 member = check fo->getTeamMembersV2(
    "000512",
    "Platform Engineering",
    "2026-01-01T00:00:00Z"
);
```

</details>

<details>
<summary>deleteTeamMembersV2</summary>

Deletes a V2 team member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamMemberPartyNumber` | `string` | Yes | The team member party number key field. |
| `teamName` | `string` | Yes | The team name key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `DeleteTeamMembersV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTeamMembersV2(
    "000512",
    "Platform Engineering",
    "2026-01-01T00:00:00Z",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateTeamMembersV2</summary>

Updates a V2 team member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamMemberPartyNumber` | `string` | Yes | The team member party number key field. |
| `teamName` | `string` | Yes | The team name key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `payload` | `TeamMemberV2` | Yes | Fields to update. |
| `headers` | `UpdateTeamMembersV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `TeamMemberV2|error`

Sample code:

```ballerina
hrdev:TeamMemberV2 updated = check fo->updateTeamMembersV2(
    "000512",
    "Platform Engineering",
    "2026-01-01T00:00:00Z",
    {isTeamLead: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Teams

<details>
<summary>listTeams</summary>

Lists all teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTeamsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TeamsCollection|error`

Sample code:

```ballerina
hrdev:TeamsCollection teams = check fo->listTeams(
    queries = {filter: "IsActive eq 'Yes'"}
);
```

</details>

<details>
<summary>createTeams</summary>

Creates a team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Team` | Yes | Team fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Team|error`

Sample code:

```ballerina
hrdev:Team created = check fo->createTeams({
    partyNumber: "000123",
    name: "Platform Engineering",
    teamTypeName: "Project",
    description: "Owns integration platform services",
    administrator: "000501",
    isActive: "Yes"
});
```

</details>

<details>
<summary>getTeams</summary>

Reads a team by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTeamsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `Team|error`

Sample code:

```ballerina
hrdev:Team team = check fo->getTeams("000123");
```

</details>

<details>
<summary>deleteTeams</summary>

Deletes a team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `DeleteTeamsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTeams("000123", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTeams</summary>

Updates a team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `payload` | `Team` | Yes | Fields to update. |
| `headers` | `UpdateTeamsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `Team|error`

Sample code:

```ballerina
hrdev:Team updated = check fo->updateTeams(
    "000123",
    {administrator: "000502"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Teams V2

<details>
<summary>listTeamsV2</summary>

Lists all V2 teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTeamsV2Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `TeamsV2Collection|error`

Sample code:

```ballerina
hrdev:TeamsV2Collection teams = check fo->listTeamsV2(
    queries = {filter: "IsActive eq 'Yes'"}
);
```

</details>

<details>
<summary>createTeamsV2</summary>

Creates a V2 team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TeamV2` | Yes | Team fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `TeamV2|error`

Sample code:

```ballerina
hrdev:TeamV2 created = check fo->createTeamsV2({
    name: "Platform Engineering",
    partyNumber: "000123",
    teamTypeName: "Project",
    description: "Owns integration platform services",
    administrator: "000501",
    isActive: "Yes"
});
```

</details>

<details>
<summary>getTeamsV2</summary>

Reads a V2 team by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetTeamsV2Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `TeamV2|error`

Sample code:

```ballerina
hrdev:TeamV2 team = check fo->getTeamsV2("Platform Engineering");
```

</details>

<details>
<summary>deleteTeamsV2</summary>

Deletes a V2 team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteTeamsV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteTeamsV2("Platform Engineering", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateTeamsV2</summary>

Updates a V2 team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `payload` | `TeamV2` | Yes | Fields to update. |
| `headers` | `UpdateTeamsV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `TeamV2|error`

Sample code:

```ballerina
hrdev:TeamV2 updated = check fo->updateTeamsV2(
    "Platform Engineering",
    {administrator: "000502"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Unions

<details>
<summary>listUnions</summary>

Lists all unions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListUnionsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `UnionsCollection|error`

Sample code:

```ballerina
hrdev:UnionsCollection unions = check fo->listUnions();
```

</details>

<details>
<summary>createUnions</summary>

Creates a union.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Unions` | Yes | Union fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Unions|error`

Sample code:

```ballerina
hrdev:Unions created = check fo->createUnions({
    unionId: "UN-200",
    name: "Office Workers Union",
    entitledToNegotiate: "Yes"
});
```

</details>

<details>
<summary>getUnions</summary>

Reads a union by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unionId` | `string` | Yes | The union id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetUnionsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `Unions|error`

Sample code:

```ballerina
hrdev:Unions union = check fo->getUnions("UN-200");
```

</details>

<details>
<summary>deleteUnions</summary>

Deletes a union.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unionId` | `string` | Yes | The union id key field. |
| `headers` | `DeleteUnionsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteUnions("UN-200", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateUnions</summary>

Updates a union.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unionId` | `string` | Yes | The union id key field. |
| `payload` | `Unions` | Yes | Fields to update. |
| `headers` | `UpdateUnionsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `Unions|error`

Sample code:

```ballerina
hrdev:Unions updated = check fo->updateUnions(
    "UN-200",
    {entitledToNegotiate: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Vesting Rules

<details>
<summary>listVestingRules</summary>

Lists all vesting rules.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVestingRulesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VestingRulesCollection|error`

Sample code:

```ballerina
hrdev:VestingRulesCollection rules = check fo->listVestingRules(
    queries = {filter: "dataAreaId eq 'usmf'"}
);
```

</details>

<details>
<summary>createVestingRules</summary>

Creates a vesting rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VestingRule` | Yes | Vesting rule fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VestingRule|error`

Sample code:

```ballerina
hrdev:VestingRule created = check fo->createVestingRules({
    dataAreaId: "usmf",
    vestingRule: "STD-4YR",
    description: "Standard four-year vesting schedule",
    note: "Applies to retirement plan contributions"
});
```

</details>

<details>
<summary>getVestingRules</summary>

Reads a vesting rule by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vestingRule` | `string` | Yes | The vesting rule key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVestingRulesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `VestingRule|error`

Sample code:

```ballerina
hrdev:VestingRule rule = check fo->getVestingRules("usmf", "STD-4YR");
```

</details>

<details>
<summary>deleteVestingRules</summary>

Deletes a vesting rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vestingRule` | `string` | Yes | The vesting rule key field. |
| `headers` | `DeleteVestingRulesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVestingRules("usmf", "STD-4YR", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateVestingRules</summary>

Updates a vesting rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vestingRule` | `string` | Yes | The vesting rule key field. |
| `payload` | `VestingRule` | Yes | Fields to update. |
| `headers` | `UpdateVestingRulesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency. |

Returns: `VestingRule|error`

Sample code:

```ballerina
hrdev:VestingRule updated = check fo->updateVestingRules(
    "usmf",
    "STD-4YR",
    {note: "Applies to retirement plan contributions and 401(k) match"},
    headers = {ifMatch: eTag}
);
```

</details>
