---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.hr` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides CRUD access to Microsoft Dynamics 365 Finance Human Resources entities via the OData REST API. |

---

## Client

Provides CRUD access to Microsoft Dynamics 365 Finance Human Resources entities via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration (`tokenUrl`, `clientId`, `clientSecret`, `scopes`) used to authenticate with Microsoft Entra ID. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.hr;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

hr:Client hrClient = check new (
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

#### Absence Codes

<details>
<summary>listAbsenceCodes</summary>

Lists absence codes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListAbsenceCodesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `AbsenceCodesCollection|error`

Sample code:

```ballerina
hr:AbsenceCodesCollection result = check hrClient->listAbsenceCodes(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        top: 20
    }
);
```

</details>

<details>
<summary>createAbsenceCodes</summary>

Creates an absence code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AbsenceCode` | Yes | The absence code to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AbsenceCode|error`

Sample code:

```ballerina
hr:AbsenceCode created = check hrClient->createAbsenceCodes({
    dataAreaId: "USMF",
    absenceCode: "SICK",
    description: "Sick leave",
    absenceGroup: "SICK",
    method: "Hours"
});
```

</details>

<details>
<summary>getAbsenceCodes</summary>

Gets an absence code by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `absenceCode` | `string` | Yes | The absence code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAbsenceCodesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `AbsenceCode|error`

Sample code:

```ballerina
hr:AbsenceCode absenceCode = check hrClient->getAbsenceCodes("USMF", "SICK");
```

</details>

<details>
<summary>deleteAbsenceCodes</summary>

Deletes an absence code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `absenceCode` | `string` | Yes | The absence code key field. |
| `headers` | `DeleteAbsenceCodesHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteAbsenceCodes("USMF", "SICK", {ifMatch: eTag});
```

</details>

<details>
<summary>updateAbsenceCodes</summary>

Updates an absence code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `absenceCode` | `string` | Yes | The absence code key field. |
| `payload` | `AbsenceCode` | Yes | The fields to update. |
| `headers` | `UpdateAbsenceCodesHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `AbsenceCode|error`

Sample code:

```ballerina
hr:AbsenceCode updated = check hrClient->updateAbsenceCodes(
    "USMF",
    "SICK",
    {description: "Sick leave (paid)"},
    {ifMatch: eTag}
);
```

</details>

#### Absence Reasons

<details>
<summary>listAbsenceReasons</summary>

Lists absence reasons.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListAbsenceReasonsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `AbsenceReasonsCollection|error`

Sample code:

```ballerina
hr:AbsenceReasonsCollection result = check hrClient->listAbsenceReasons(
    queries = {filter: "AbsenceCode eq 'SICK'"}
);
```

</details>

<details>
<summary>createAbsenceReasons</summary>

Creates an absence reason.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AbsenceReason` | Yes | The absence reason to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `AbsenceReason|error`

Sample code:

```ballerina
hr:AbsenceReason created = check hrClient->createAbsenceReasons({
    dataAreaId: "USMF",
    absenceCode: "SICK",
    reasonCodeId: "FLU"
});
```

</details>

<details>
<summary>getAbsenceReasons</summary>

Gets an absence reason by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `absenceCode` | `string` | Yes | The absence code key field. |
| `reasonCodeId` | `string` | Yes | The reason code id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetAbsenceReasonsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `AbsenceReason|error`

Sample code:

```ballerina
hr:AbsenceReason reason = check hrClient->getAbsenceReasons("USMF", "SICK", "FLU");
```

</details>

<details>
<summary>deleteAbsenceReasons</summary>

Deletes an absence reason.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `absenceCode` | `string` | Yes | The absence code key field. |
| `reasonCodeId` | `string` | Yes | The reason code id key field. |
| `headers` | `DeleteAbsenceReasonsHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteAbsenceReasons("USMF", "SICK", "FLU", {ifMatch: eTag});
```

</details>

<details>
<summary>updateAbsenceReasons</summary>

Updates an absence reason.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `absenceCode` | `string` | Yes | The absence code key field. |
| `reasonCodeId` | `string` | Yes | The reason code id key field. |
| `payload` | `AbsenceReason` | Yes | The fields to update. |
| `headers` | `UpdateAbsenceReasonsHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `AbsenceReason|error`

Sample code:

```ballerina
hr:AbsenceReason updated = check hrClient->updateAbsenceReasons(
    "USMF",
    "SICK",
    "FLU",
    {reasonCodeId: "FLU"},
    {ifMatch: eTag}
);
```

</details>

#### City Holidays

<details>
<summary>listCityHolidays</summary>

Lists city holidays.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListCityHolidaysQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `CityHolidaysCollection|error`

Sample code:

```ballerina
hr:CityHolidaysCollection result = check hrClient->listCityHolidays(
    queries = {filter: "CityName eq 'Seattle'"}
);
```

</details>

<details>
<summary>createCityHolidays</summary>

Creates a city holiday.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CityHoliday` | Yes | The city holiday to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `CityHoliday|error`

Sample code:

```ballerina
hr:CityHoliday created = check hrClient->createCityHolidays({
    countryRegionId: "USA",
    stateId: "WA",
    cityName: "Seattle",
    holidayDate: "2026-11-26",
    description: "Thanksgiving Day (Local)"
});
```

</details>

<details>
<summary>getCityHolidays</summary>

Gets a city holiday by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `stateId` | `string` | Yes | The state id key field. |
| `cityName` | `string` | Yes | The city name key field. |
| `holidayDate` | `string` | Yes | The holiday date key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCityHolidaysQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `CityHoliday|error`

Sample code:

```ballerina
hr:CityHoliday holiday = check hrClient->getCityHolidays("USA", "WA", "Seattle", "2026-11-26");
```

</details>

<details>
<summary>deleteCityHolidays</summary>

Deletes a city holiday.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `stateId` | `string` | Yes | The state id key field. |
| `cityName` | `string` | Yes | The city name key field. |
| `holidayDate` | `string` | Yes | The holiday date key field. |
| `headers` | `DeleteCityHolidaysHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteCityHolidays("USA", "WA", "Seattle", "2026-11-26", {ifMatch: eTag});
```

</details>

<details>
<summary>updateCityHolidays</summary>

Updates a city holiday.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `stateId` | `string` | Yes | The state id key field. |
| `cityName` | `string` | Yes | The city name key field. |
| `holidayDate` | `string` | Yes | The holiday date key field. |
| `payload` | `CityHoliday` | Yes | The fields to update. |
| `headers` | `UpdateCityHolidaysHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `CityHoliday|error`

Sample code:

```ballerina
hr:CityHoliday updated = check hrClient->updateCityHolidays(
    "USA",
    "WA",
    "Seattle",
    "2026-11-26",
    {description: "Thanksgiving Day (City Observed)"},
    {ifMatch: eTag}
);
```

</details>

#### Employments

<details>
<summary>listEmployments</summary>

Lists employments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListEmploymentsQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `EmploymentsCollection|error`

Sample code:

```ballerina
hr:EmploymentsCollection result = check hrClient->listEmployments(
    queries = {filter: "LegalEntityId eq 'USMF'"}
);
```

</details>

<details>
<summary>createEmployments</summary>

Creates an employment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Employment` | Yes | The employment to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Employment|error`

Sample code:

```ballerina
hr:Employment created = check hrClient->createEmployments({
    personnelNumber: "000159",
    legalEntityId: "USMF",
    employmentStartDate: "2024-01-15",
    employmentEndDate: "9999-12-31",
    workerType: "Employee"
});
```

</details>

<details>
<summary>getEmployments</summary>

Gets an employment by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personnelNumber` | `string` | Yes | The personnel number key field. |
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `employmentStartDate` | `string` | Yes | The employment start date key field. |
| `employmentEndDate` | `string` | Yes | The employment end date key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetEmploymentsQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Employment|error`

Sample code:

```ballerina
hr:Employment employment = check hrClient->getEmployments(
    "000159",
    "USMF",
    "2024-01-15",
    "9999-12-31"
);
```

</details>

<details>
<summary>deleteEmployments</summary>

Deletes an employment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personnelNumber` | `string` | Yes | The personnel number key field. |
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `employmentStartDate` | `string` | Yes | The employment start date key field. |
| `employmentEndDate` | `string` | Yes | The employment end date key field. |
| `headers` | `DeleteEmploymentsHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteEmployments(
    "000159",
    "USMF",
    "2024-01-15",
    "9999-12-31",
    {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateEmployments</summary>

Updates an employment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personnelNumber` | `string` | Yes | The personnel number key field. |
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `employmentStartDate` | `string` | Yes | The employment start date key field. |
| `employmentEndDate` | `string` | Yes | The employment end date key field. |
| `payload` | `Employment` | Yes | The fields to update. |
| `headers` | `UpdateEmploymentsHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `Employment|error`

Sample code:

```ballerina
hr:Employment updated = check hrClient->updateEmployments(
    "000159",
    "USMF",
    "2024-01-15",
    "9999-12-31",
    {calendarId: "USMF_STD"},
    {ifMatch: eTag}
);
```

</details>

#### ESS Workers

<details>
<summary>listEssWorkers</summary>

Lists employee self-service (ESS) worker profiles.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListEssWorkersQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `EssWorkersCollection|error`

Sample code:

```ballerina
hr:EssWorkersCollection result = check hrClient->listEssWorkers(
    queries = {filter: "LastName eq 'Ferreira'"}
);
```

</details>

<details>
<summary>createEssWorkers</summary>

Creates an ESS worker profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EssWorker` | Yes | The ESS worker profile to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `EssWorker|error`

Sample code:

```ballerina
hr:EssWorker created = check hrClient->createEssWorkers({
    personnelNumber: "000159",
    partyNumber: "000159",
    firstName: "Alicia",
    lastName: "Ferreira",
    name: "Alicia Ferreira"
});
```

</details>

<details>
<summary>getEssWorkers</summary>

Gets an ESS worker profile by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personnelNumber` | `string` | Yes | The personnel number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetEssWorkersQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `EssWorker|error`

Sample code:

```ballerina
hr:EssWorker worker = check hrClient->getEssWorkers("000159");
```

</details>

<details>
<summary>deleteEssWorkers</summary>

Deletes an ESS worker profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personnelNumber` | `string` | Yes | The personnel number key field. |
| `headers` | `DeleteEssWorkersHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteEssWorkers("000159", {ifMatch: eTag});
```

</details>

<details>
<summary>updateEssWorkers</summary>

Updates an ESS worker profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personnelNumber` | `string` | Yes | The personnel number key field. |
| `payload` | `EssWorker` | Yes | The fields to update. |
| `headers` | `UpdateEssWorkersHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `EssWorker|error`

Sample code:

```ballerina
hr:EssWorker updated = check hrClient->updateEssWorkers(
    "000159",
    {knownAs: "Ali"},
    {ifMatch: eTag}
);
```

</details>

#### Injury Types

<details>
<summary>listInjuryTypes</summary>

Lists injury types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListInjuryTypesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `InjuryTypesCollection|error`

Sample code:

```ballerina
hr:InjuryTypesCollection result = check hrClient->listInjuryTypes();
```

</details>

<details>
<summary>createInjuryTypes</summary>

Creates an injury type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `InjuryType` | Yes | The injury type to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `InjuryType|error`

Sample code:

```ballerina
hr:InjuryType created = check hrClient->createInjuryTypes({
    injuryTypeId: "STRAIN",
    description: "Muscle strain"
});
```

</details>

<details>
<summary>getInjuryTypes</summary>

Gets an injury type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `injuryTypeId` | `string` | Yes | The injury type id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetInjuryTypesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `InjuryType|error`

Sample code:

```ballerina
hr:InjuryType injuryType = check hrClient->getInjuryTypes("STRAIN");
```

</details>

<details>
<summary>deleteInjuryTypes</summary>

Deletes an injury type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `injuryTypeId` | `string` | Yes | The injury type id key field. |
| `headers` | `DeleteInjuryTypesHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteInjuryTypes("STRAIN", {ifMatch: eTag});
```

</details>

<details>
<summary>updateInjuryTypes</summary>

Updates an injury type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `injuryTypeId` | `string` | Yes | The injury type id key field. |
| `payload` | `InjuryType` | Yes | The fields to update. |
| `headers` | `UpdateInjuryTypesHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `InjuryType|error`

Sample code:

```ballerina
hr:InjuryType updated = check hrClient->updateInjuryTypes(
    "STRAIN",
    {description: "Muscle strain (repetitive)"},
    {ifMatch: eTag}
);
```

</details>

#### People

<details>
<summary>listPeople</summary>

Lists people.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPeopleQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `PeopleCollection|error`

Sample code:

```ballerina
hr:PeopleCollection result = check hrClient->listPeople(
    queries = {filter: "LastName eq 'Ferreira'"}
);
```

</details>

<details>
<summary>createPeople</summary>

Creates a person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Person` | Yes | The person to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Person|error`

Sample code:

```ballerina
hr:Person created = check hrClient->createPeople({
    partyNumber: "000159",
    firstName: "Alicia",
    lastName: "Ferreira",
    name: "Alicia Ferreira",
    gender: "Female"
});
```

</details>

<details>
<summary>getPeople</summary>

Gets a person by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPeopleQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `Person|error`

Sample code:

```ballerina
hr:Person person = check hrClient->getPeople("000159");
```

</details>

<details>
<summary>deletePeople</summary>

Deletes a person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `DeletePeopleHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deletePeople("000159", {ifMatch: eTag});
```

</details>

<details>
<summary>updatePeople</summary>

Updates a person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `payload` | `Person` | Yes | The fields to update. |
| `headers` | `UpdatePeopleHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `Person|error`

Sample code:

```ballerina
hr:Person updated = check hrClient->updatePeople(
    "000159",
    {knownAs: "Ali", primaryContactEmail: "aferreira@contoso.com"},
    {ifMatch: eTag}
);
```

</details>

#### Person Images

<details>
<summary>listPersonImages</summary>

Lists person images.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPersonImagesQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `PersonImagesCollection|error`

Sample code:

```ballerina
hr:PersonImagesCollection result = check hrClient->listPersonImages();
```

</details>

<details>
<summary>createPersonImages</summary>

Creates a person image.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PersonImage` | Yes | The party number and image content (`fileContent` bytes and `fileName`) to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PersonImage|error`

Sample code:

```ballerina
hr:PersonImage created = check hrClient->createPersonImages({
    partyNumber: "000159",
    image: {
        fileContent: photoBytes,
        fileName: "alicia-ferreira.jpg"
    }
});
```

</details>

<details>
<summary>getPersonImages</summary>

Gets a person image by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPersonImagesQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `PersonImage|error`

Sample code:

```ballerina
hr:PersonImage image = check hrClient->getPersonImages("000159");
```

</details>

<details>
<summary>deletePersonImages</summary>

Deletes a person image.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `DeletePersonImagesHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deletePersonImages("000159", {ifMatch: eTag});
```

</details>

<details>
<summary>updatePersonImages</summary>

Updates a person image.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `payload` | `PersonImage` | Yes | The fields to update. |
| `headers` | `UpdatePersonImagesHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `PersonImage|error`

Sample code:

```ballerina
hr:PersonImage updated = check hrClient->updatePersonImages(
    "000159",
    {image: {fileContent: newPhotoBytes, fileName: "alicia-ferreira-2026.jpg"}},
    {ifMatch: eTag}
);
```

</details>

#### Person Users

<details>
<summary>listPersonUsers</summary>

Lists person-to-user links.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListPersonUsersQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `PersonUsersCollection|error`

Sample code:

```ballerina
hr:PersonUsersCollection result = check hrClient->listPersonUsers(
    queries = {filter: "PartyNumber eq '000159'"}
);
```

</details>

<details>
<summary>createPersonUsers</summary>

Creates a person-to-user link.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PersonUser` | Yes | The person-to-user link to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `PersonUser|error`

Sample code:

```ballerina
hr:PersonUser created = check hrClient->createPersonUsers({
    userId: "aferreira",
    partyNumber: "000159",
    validFrom: "2024-01-15",
    personName: "Alicia Ferreira",
    userEmail: "aferreira@contoso.com"
});
```

</details>

<details>
<summary>getPersonUsers</summary>

Gets a person-to-user link by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user id key field. |
| `partyNumber` | `string` | Yes | The party number key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetPersonUsersQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `PersonUser|error`

Sample code:

```ballerina
hr:PersonUser personUser = check hrClient->getPersonUsers("aferreira", "000159", "2024-01-15");
```

</details>

<details>
<summary>deletePersonUsers</summary>

Deletes a person-to-user link.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user id key field. |
| `partyNumber` | `string` | Yes | The party number key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `headers` | `DeletePersonUsersHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deletePersonUsers("aferreira", "000159", "2024-01-15", {ifMatch: eTag});
```

</details>

<details>
<summary>updatePersonUsers</summary>

Updates a person-to-user link.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user id key field. |
| `partyNumber` | `string` | Yes | The party number key field. |
| `validFrom` | `string` | Yes | The valid from key field. |
| `payload` | `PersonUser` | Yes | The fields to update. |
| `headers` | `UpdatePersonUsersHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `PersonUser|error`

Sample code:

```ballerina
hr:PersonUser updated = check hrClient->updatePersonUsers(
    "aferreira",
    "000159",
    "2024-01-15",
    {userEmail: "alicia.ferreira@contoso.com"},
    {ifMatch: eTag}
);
```

</details>

#### State Holidays

<details>
<summary>listStateHolidays</summary>

Lists state holidays.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListStateHolidaysQueries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `StateHolidaysCollection|error`

Sample code:

```ballerina
hr:StateHolidaysCollection result = check hrClient->listStateHolidays(
    queries = {filter: "StateId eq 'WA'"}
);
```

</details>

<details>
<summary>createStateHolidays</summary>

Creates a state holiday.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `StateHoliday` | Yes | The state holiday to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `StateHoliday|error`

Sample code:

```ballerina
hr:StateHoliday created = check hrClient->createStateHolidays({
    countryRegionId: "USA",
    stateId: "WA",
    holidayDate: "2026-11-11",
    description: "Veterans Day"
});
```

</details>

<details>
<summary>getStateHolidays</summary>

Gets a state holiday by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `holidayDate` | `string` | Yes | The holiday date key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `stateId` | `string` | Yes | The state id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetStateHolidaysQueries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `StateHoliday|error`

Sample code:

```ballerina
hr:StateHoliday holiday = check hrClient->getStateHolidays("2026-11-11", "USA", "WA");
```

</details>

<details>
<summary>deleteStateHolidays</summary>

Deletes a state holiday.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `holidayDate` | `string` | Yes | The holiday date key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `stateId` | `string` | Yes | The state id key field. |
| `headers` | `DeleteStateHolidaysHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `error?`

Sample code:

```ballerina
check hrClient->deleteStateHolidays("2026-11-11", "USA", "WA", {ifMatch: eTag});
```

</details>

<details>
<summary>updateStateHolidays</summary>

Updates a state holiday.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `holidayDate` | `string` | Yes | The holiday date key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `stateId` | `string` | Yes | The state id key field. |
| `payload` | `StateHoliday` | Yes | The fields to update. |
| `headers` | `UpdateStateHolidaysHeaders` | No | Optional `ifMatch` ETag, sent as the `If-Match` header. |

Returns: `StateHoliday|error`

Sample code:

```ballerina
hr:StateHoliday updated = check hrClient->updateStateHolidays(
    "2026-11-11",
    "USA",
    "WA",
    {description: "Veterans Day (State Observed)"},
    {ifMatch: eTag}
);
```

</details>
