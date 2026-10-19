---
title: Actions
---

# Actions

The `ballerinax/peoplehr` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the People HR REST API for managing employees, holidays, salaries, vacancies, applicants, custom screens, appraisals, and queries. |

---

## Client

Provides access to the People HR REST API for managing employees, holidays, salaries, vacancies, applicants, custom screens, appraisals, and queries.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKey` | `string` | Required | People HR API key obtained from the API Key Management page. |
| `baseURL` | `string` | `"https://api.peoplehr.net"` | Base URL for the People HR API. |
| `httpVersion` | `HttpVersion` | `HTTP_1_1` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/peoplehr;

configurable string apiKey = ?;

peoplehr:Client peoplehrClient = check new ({
    apiKey: apiKey,
    baseURL: "https://api.peoplehr.net"
});
```

### Operations

#### Employee management

<details>
<summary>createNewEmployee</summary>

Creates a new employee record in People HR.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NewEmployeeRequest|json` | Yes | Details of the new employee to create. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->createNewEmployee({
    EmployeeId: "EMP001",
    FirstName: "John",
    LastName: "Doe",
    StartDate: "2025-01-15",
    JobRole: "Software Engineer",
    JobRoleEffectiveDate: "2025-01-15",
    Location: "London",
    Department: "Engineering"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The new employee has been added successfully.", "Result": null}
```

</details>

<details>
<summary>getEmployeeById</summary>

Retrieves employee details by employee ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EmployeeRequest` | Yes | Request containing the employee ID. |

Returns: `EmployeeResponse|error`

Sample code:

```ballerina
peoplehr:EmployeeResponse result = check peoplehrClient->getEmployeeById({
    EmployeeId: "EMP001"
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": {
    "EmployeeId": {"DisplayValue": "EMP001"},
    "FirstName": {"DisplayValue": "John"},
    "LastName": {"DisplayValue": "Doe"},
    "EmailId": {"DisplayValue": "john.doe@example.com"},
    "Company": {"DisplayValue": "Acme Corp"},
    "Department": {"DisplayValue": "Engineering"},
    "JobRole": {"DisplayValue": "Software Engineer"},
    "StartDate": {"DisplayValue": "2025-01-15"}
  }
}
```

</details>

<details>
<summary>getAllEmployees</summary>

Retrieves all employee records, optionally including leavers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AllEmployeesRequest` | Yes | Request with option to include leavers. |

Returns: `EmployeesResponse|error`

Sample code:

```ballerina
peoplehr:EmployeesResponse result = check peoplehrClient->getAllEmployees({
    IncludeLeavers: false
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "EmployeeId": {"DisplayValue": "EMP001"},
      "FirstName": {"DisplayValue": "John"},
      "LastName": {"DisplayValue": "Doe"},
      "Company": {"DisplayValue": "Acme Corp"}
    },
    {
      "EmployeeId": {"DisplayValue": "EMP002"},
      "FirstName": {"DisplayValue": "Jane"},
      "LastName": {"DisplayValue": "Smith"},
      "Company": {"DisplayValue": "Acme Corp"}
    }
  ]
}
```

</details>

<details>
<summary>updateEmployee</summary>

Updates an existing employee's details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EmployeeUpdateRequest|json` | Yes | Updated employee details including employee ID and reason for change. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->updateEmployee({
    EmployeeId: "EMP001",
    JobRole: "Senior Software Engineer",
    ReasonForChange: "Promotion"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The employee detail has been updated successfully.", "Result": null}
```

</details>

<details>
<summary>updateEmployeeId</summary>

Updates an employee's ID to a new value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EmployeeIdUpdateRequest` | Yes | Old employee ID, new employee ID, and reason for change. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->updateEmployeeId({
    OldEmployeeId: "EMP001",
    NewEmployeeId: "EMP001-A",
    ReasonForChange: "ID restructuring"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The employee id has been updated successfully.", "Result": null}
```

</details>

<details>
<summary>markAsLeaverById</summary>

Marks an employee as a leaver by their employee ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EmployeeLeaverStatus` | Yes | Leaver details including employee ID, reason, and final employment date. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->markAsLeaverById({
    EmployeeId: "EMP001",
    ReasonforLeaving: "Resignation",
    FinalEmploymentDate: "2025-06-30"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The employee has been marked as leaver successfully.", "Result": null}
```

</details>

#### Salary

<details>
<summary>getSalaryDetail</summary>

Retrieves salary details for a specific employee, optionally including salary history.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SalaryDetailRequest` | Yes | Request containing employee ID and whether to include history. |

Returns: `SalaryDetailGetResponse|error`

Sample code:

```ballerina
peoplehr:SalaryDetailGetResponse result = check peoplehrClient->getSalaryDetail({
    EmployeeId: "EMP001",
    IsIncludeHistory: true
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "EffectiveFrom": "2025-01-15",
      "SalaryType": "Annual",
      "PaymentFrequency": "Monthly",
      "SalaryAmount": "75000",
      "TotalSalaryAmount": "75000",
      "Currency": "GBP",
      "ChangeReason": "New hire"
    }
  ]
}
```

</details>

#### Holiday management

<details>
<summary>addNewHoliday</summary>

Adds a new holiday record for an employee.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NewHolidayRequest|json` | Yes | Holiday details including employee ID, dates, and duration. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->addNewHoliday({
    EmployeeId: "EMP001",
    DurationType: "1",
    StartDate: "2025-08-01",
    EndDate: "2025-08-05",
    DurationInDays: "5",
    Comments: "Summer vacation"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The new holiday has been added successfully.", "Result": null}
```

</details>

<details>
<summary>getHolidayDetail</summary>

Retrieves holiday details for a specific employee, optionally filtered by date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `HolidayDetail` | Yes | Request containing employee ID and optional date range. |

Returns: `HolidayGetResponse|error`

Sample code:

```ballerina
peoplehr:HolidayGetResponse result = check peoplehrClient->getHolidayDetail({
    EmployeeId: "EMP001",
    StartDate: "2025-01-01",
    EndDate: "2025-12-31"
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "StartDate": "2025-08-01",
      "EndDate": "2025-08-05",
      "DurationType": 1,
      "DurationInDays": 5,
      "Status": "Approved",
      "Approver": "Jane Smith"
    }
  ]
}
```

</details>

<details>
<summary>deleteHoliday</summary>

Deletes a holiday record for a specific employee.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `HolidayDetail` | Yes | Request containing employee ID and date details of the holiday to delete. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->deleteHoliday({
    EmployeeId: "EMP001",
    StartDate: "2025-08-01",
    EndDate: "2025-08-05"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The holiday has been deleted successfully.", "Result": null}
```

</details>

#### Vacancy & applicant management

<details>
<summary>createNewVacancy</summary>

Creates a new vacancy in People HR.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NewVacancy` | Yes | Vacancy details including name, description, location, and department. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->createNewVacancy({
    VacancyName: "Senior Developer",
    VacancyDescription: "Looking for an experienced developer",
    Company: "Acme Corp",
    Location: "London",
    Department: "Engineering",
    ClosingDate: "2025-09-30",
    JobTitle: "Senior Developer",
    VacancyType: "Permanent"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The new vacancy has been created successfully.", "Result": null}
```

</details>

<details>
<summary>getVacancy</summary>

Retrieves details of a specific vacancy by its reference.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GetVacancyResultRequest|json` | Yes | Request containing the vacancy reference. |

Returns: `VacancyGetResponse|error`

Sample code:

```ballerina
peoplehr:VacancyGetResponse result = check peoplehrClient->getVacancy({
    VacancyReference: "VAC-001"
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": {
    "VacancyName": "Senior Developer",
    "VacancyDescription": "Looking for an experienced developer",
    "Company": "Acme Corp",
    "Location": "London",
    "Department": "Engineering",
    "Status": 1,
    "ClosingDate": "2025-09-30",
    "Reference": "VAC-001",
    "JobTitle": "Senior Developer"
  }
}
```

</details>

<details>
<summary>getAllVacancies</summary>

Retrieves all vacancies in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `AllVacancies|error`

Sample code:

```ballerina
peoplehr:AllVacancies result = check peoplehrClient->getAllVacancies();
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "VacancyName": "Senior Developer",
      "Company": "Acme Corp",
      "Location": "London",
      "Department": "Engineering",
      "Status": 1,
      "Reference": "VAC-001"
    }
  ]
}
```

</details>

<details>
<summary>createNewApplicant</summary>

Creates a new applicant for a vacancy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NewApplicant` | Yes | Applicant details including name, vacancy reference, and documents. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->createNewApplicant({
    VacancyReference: "VAC-001",
    FirstName: "Alice",
    LastName: "Johnson",
    Email: "alice.johnson@example.com",
    Skills: "Ballerina, Java, Cloud",
    Documents: []
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The new applicant has been created successfully.", "Result": null}
```

</details>

<details>
<summary>uploadApplicantDocument</summary>

Uploads a document for an applicant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NewDocument` | Yes | Document details including applicant ID, document name, description, and base64-encoded file content. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->uploadApplicantDocument({
    ApplicantId: "APP-001",
    DocumentName: "Resume",
    Description: "Candidate resume",
    File: "<base64-encoded-file-content>"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The document has been uploaded successfully.", "Result": null}
```

</details>

<details>
<summary>checkDuplicateApplicant</summary>

Checks whether a duplicate applicant exists for a given vacancy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ApplicantInformation` | Yes | Applicant information including first name, last name, and vacancy reference. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->checkDuplicateApplicant({
    FirstName: "Alice",
    LastName: "Johnson",
    VacancyReference: "VAC-001",
    Email: "alice.johnson@example.com"
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "No duplicate applicant found.", "Result": null}
```

</details>

#### Query

<details>
<summary>getQueryByName</summary>

Executes a saved query by name and returns the results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `QueryResultGetRequest` | Yes | Request containing the query name. |

Returns: `QueryDetail|error`

Sample code:

```ballerina
peoplehr:QueryDetail result = check peoplehrClient->getQueryByName({
    QueryName: "Active Employees"
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {"EmployeeId": "EMP001", "FirstName": "John", "LastName": "Doe", "Department": "Engineering"},
    {"EmployeeId": "EMP002", "FirstName": "Jane", "LastName": "Smith", "Department": "Marketing"}
  ]
}
```

</details>

#### Authentication

<details>
<summary>checkAuthentication</summary>

Validates whether the provided user credentials are correct.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AuthenticationInfo` | Yes | User email address and password to verify. |

Returns: `AuthenticationResponse|error`

Sample code:

```ballerina
peoplehr:AuthenticationResponse result = check peoplehrClient->checkAuthentication({
    EmailAddress: "john.doe@example.com",
    Password: "hashedPassword123"
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "Authenticated successfully.",
  "Result": {"EmployeeId": "EMP001"}
}
```

</details>

#### Custom screens

<details>
<summary>getEmployeeScreenDetail</summary>

Retrieves all employee custom screen details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `EmployeeScreenDetailResponse|error`

Sample code:

```ballerina
peoplehr:EmployeeScreenDetailResponse result = check peoplehrClient->getEmployeeScreenDetail();
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "ScreenId": 1,
      "ScreenName": "Training Records",
      "TxnId": 101,
      "Customfields": [{"ColumnName": "CourseName", "ColumnValue": "Safety Training"}]
    }
  ]
}
```

</details>

<details>
<summary>getEmployeeScreenDetailByEmployeeID</summary>

Retrieves employee custom screen details filtered by employee ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ScreenDetailByEmployeeIDRequest` | Yes | Request containing employee ID and screen ID. |

Returns: `EmployeeScreenDetailResponse|error`

Sample code:

```ballerina
peoplehr:EmployeeScreenDetailResponse result = check peoplehrClient->getEmployeeScreenDetailByEmployeeID({
    EmployeeId: "EMP001",
    ScreenId: 1
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "ScreenId": 1,
      "ScreenName": "Training Records",
      "TxnId": 101,
      "Customfields": [{"ColumnName": "CourseName", "ColumnValue": "Safety Training"}]
    }
  ]
}
```

</details>

<details>
<summary>getEmployeeScreenDetailByTransactionID</summary>

Retrieves employee custom screen details filtered by transaction ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ScreenDetailByTransactionIDRequest` | Yes | Request containing employee ID, screen ID, and transaction ID. |

Returns: `EmployeeScreenDetailResponse|error`

Sample code:

```ballerina
peoplehr:EmployeeScreenDetailResponse result = check peoplehrClient->getEmployeeScreenDetailByTransactionID({
    EmployeeId: "EMP001",
    ScreenId: 1,
    CustomScreenTransactionId: 101
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "ScreenId": 1,
      "ScreenName": "Training Records",
      "TxnId": 101,
      "Customfields": [{"ColumnName": "CourseName", "ColumnValue": "Safety Training"}]
    }
  ]
}
```

</details>

<details>
<summary>addNewCustomScreenTransaction</summary>

Adds a new custom screen transaction for an employee.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NewCustomScreenTransactionDetails` | Yes | New custom screen transaction details including employee ID, screen ID, and custom columns. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->addNewCustomScreenTransaction({
    EmployeeId: "EMP001",
    ScreenId: 1,
    CustomColumns: [
        {ColumnName: "CourseName", ColumnValue: "Fire Safety"},
        {ColumnName: "CompletionDate", ColumnValue: "2025-03-01"}
    ],
    AddFiles: []
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The custom screen transaction has been added successfully.", "Result": null}
```

</details>

<details>
<summary>updateCustomScreenTransaction</summary>

Updates an existing custom screen transaction.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExistingCustomScreenTransactionDetails` | Yes | Updated custom screen transaction details including transaction ID. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->updateCustomScreenTransaction({
    EmployeeId: "EMP001",
    ScreenId: 1,
    CustomScreenTransactionId: 101,
    CustomColumns: [
        {ColumnName: "CourseName", ColumnValue: "Advanced Fire Safety"}
    ],
    AddFiles: []
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The custom screen transaction has been updated successfully.", "Result": null}
```

</details>

<details>
<summary>DeleteCustomScreenTransaction</summary>

Deletes a custom screen transaction by transaction ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ScreenDetailByTransactionIDRequest` | Yes | Request containing employee ID, screen ID, and transaction ID. |

Returns: `OperationStatus|error`

Sample code:

```ballerina
peoplehr:OperationStatus result = check peoplehrClient->DeleteCustomScreenTransaction({
    EmployeeId: "EMP001",
    ScreenId: 1,
    CustomScreenTransactionId: 101
});
```

Sample response:

```ballerina
{"isError": false, "Status": 0, "Message": "The custom screen transaction has been deleted successfully.", "Result": null}
```

</details>

#### Appraisals

<details>
<summary>getAppraisalDetailsByEmployeeID</summary>

Retrieves appraisal details for a specific employee within a date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AppraisalDetailsRequest` | Yes | Request containing employee ID and date range. |

Returns: `AppraisalDetailsResponse|error`

Sample code:

```ballerina
peoplehr:AppraisalDetailsResponse result = check peoplehrClient->getAppraisalDetailsByEmployeeID({
    EmployeeId: "EMP001",
    StartDate: "2024-01-01",
    EndDate: "2025-12-31"
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "AppraisalId": 501,
      "AppraisalReviewDate": "2025-03-15",
      "Reviewer": "Jane Smith",
      "Note": "Excellent performance this quarter.",
      "ActionPlan": "Take on mentoring responsibilities.",
      "Objectives": "Lead the new microservices migration project."
    }
  ]
}
```

</details>

<details>
<summary>getAppraisalDetailsByAppraisalID</summary>

Retrieves appraisal details by a specific appraisal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AppraisalDetailsByAppraisalIDRequest` | Yes | Request containing employee ID and appraisal ID. |

Returns: `AppraisalDetailsResponse|error`

Sample code:

```ballerina
peoplehr:AppraisalDetailsResponse result = check peoplehrClient->getAppraisalDetailsByAppraisalID({
    EmployeeId: "EMP001",
    AppraisalId: 501
});
```

Sample response:

```ballerina
{
  "isError": false,
  "Status": 0,
  "Message": "The request was processed successfully.",
  "Result": [
    {
      "AppraisalId": 501,
      "AppraisalReviewDate": "2025-03-15",
      "Reviewer": "Jane Smith",
      "Note": "Excellent performance this quarter.",
      "ActionPlan": "Take on mentoring responsibilities.",
      "Objectives": "Lead the new microservices migration project."
    }
  ]
}
```

</details>
