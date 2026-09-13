---
connector: true
connector_name: "sap.successfactors.ecglobalbenefits"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecglobalbenefits` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecglobalbenefits objects: BenefitEmployeeClaim, BenefitSavingsPlanSubType, BenefitInsurancePlan, BenefitBalanceCarryForwardDetail, EmployeeWithEmployerMatchContributions, BenefitProgramEnrollment, EmployeeWithEmployerMatchContributionEntries, BenefitInsuranceCoverage…, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to maintain the global and local benefits beyond regular compensation for employees.

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
import ballerinax/sap.successfactors.ecglobalbenefits;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecglobalbenefits:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### BenefitEmployeeClaim

<details>
<summary>listBenefitEmployeeClaims</summary>

<div>

Queries the BenefitEmployeeClaim collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEmployeeClaimsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEmployeeClaims();
```

</div>
</details>

<details>
<summary>getBenefitEmployeeClaim</summary>

<div>

Retrieves a single BenefitEmployeeClaim entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEmployeeClaimQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEmployeeClaim(id);
```

</div>
</details>

#### BenefitSavingsPlanSubType

<details>
<summary>listBenefitSavingsPlanSubTypes</summary>

<div>

Queries the BenefitSavingsPlanSubType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanSubTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listBenefitSavingsPlanSubTypes();
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
<summary>getBenefitSavingsPlanSubType</summary>

<div>

Retrieves a single BenefitSavingsPlanSubType entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `benefitSavingsPlanID` | <code>string</code> | Yes | key: benefitSavingsPlanID |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanSubTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanSubType&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanSubType result = check client->getBenefitSavingsPlanSubType(benefitSavingsPlanID, effectiveStartDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsurancePlan

<details>
<summary>listBenefitInsurancePlans</summary>

<div>

Queries the BenefitInsurancePlan collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsurancePlansQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsurancePlans();
```

</div>
</details>

<details>
<summary>getBenefitInsurancePlan</summary>

<div>

Retrieves a single BenefitInsurancePlan entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsurancePlanQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsurancePlan(effectiveStartDate, id);
```

</div>
</details>

#### BenefitBalanceCarryForwardDetail

<details>
<summary>listBenefitBalanceCarryForwardDetails</summary>

<div>

Queries the BenefitBalanceCarryForwardDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitBalanceCarryForwardDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listBenefitBalanceCarryForwardDetails();
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
<summary>getBenefitBalanceCarryForwardDetail</summary>

<div>

Retrieves a single BenefitBalanceCarryForwardDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitClaimAccumulation_externalCode` | <code>int</code> | Yes | key: BenefitClaimAccumulation_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitBalanceCarryForwardDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitBalanceCarryForwardDetail&#124;error`

**Sample code:**

```ballerina
BenefitBalanceCarryForwardDetail result = check client->getBenefitBalanceCarryForwardDetail(BenefitClaimAccumulation_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### EmployeeWithEmployerMatchContributions

<details>
<summary>listEmployeeWithEmployerMatchContributionss</summary>

<div>

Queries the EmployeeWithEmployerMatchContributions collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeWithEmployerMatchContributionssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listEmployeeWithEmployerMatchContributionss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "configurationId": "1000",
        "effectiveStartDate": "2026-01-01",
        "employeeWithEmployerMatchContributionEntries": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmployeeWithEmployerMatchContributions</summary>

<div>

Retrieves a single EmployeeWithEmployerMatchContributions entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `configurationId` | <code>string</code> | Yes | key: configurationId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeWithEmployerMatchContributionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeWithEmployerMatchContributions&#124;error`

**Sample code:**

```ballerina
EmployeeWithEmployerMatchContributions result = check client->getEmployeeWithEmployerMatchContributions(configurationId, effectiveStartDate);
```

**Sample response:**

```json
{
  "configurationId": "1000",
  "effectiveStartDate": "2026-01-01",
  "employeeWithEmployerMatchContributionEntries": {
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

#### BenefitProgramEnrollment

<details>
<summary>listBenefitProgramEnrollments</summary>

<div>

Queries the BenefitProgramEnrollment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitProgramEnrollmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitProgramEnrollments();
```

</div>
</details>

<details>
<summary>getBenefitProgramEnrollment</summary>

<div>

Retrieves a single BenefitProgramEnrollment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitProgramEnrollmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitProgramEnrollment(effectiveStartDate, id);
```

</div>
</details>

#### EmployeeWithEmployerMatchContributionEntries

<details>
<summary>listEmployeeWithEmployerMatchContributionEntriess</summary>

<div>

Queries the EmployeeWithEmployerMatchContributionEntries collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmployeeWithEmployerMatchContributionEntriessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listEmployeeWithEmployerMatchContributionEntriess();
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
<summary>getEmployeeWithEmployerMatchContributionEntries</summary>

<div>

Retrieves a single EmployeeWithEmployerMatchContributionEntries entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `EmployeeWithEmployerMatchContributions_configurationId` | <code>string</code> | Yes | key: EmployeeWithEmployerMatchContributions_configurationId |
| `EmployeeWithEmployerMatchContributions_effectiveStartDate` | <code>string</code> | Yes | key: EmployeeWithEmployerMatchContributions_effectiveStartDate |
| `eeERMatchValuesID` | <code>string</code> | Yes | key: eeERMatchValuesID |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmployeeWithEmployerMatchContributionEntriesQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmployeeWithEmployerMatchContributionEntries&#124;error`

**Sample code:**

```ballerina
EmployeeWithEmployerMatchContributionEntries result = check client->getEmployeeWithEmployerMatchContributionEntries(EmployeeWithEmployerMatchContributions_configurationId, EmployeeWithEmployerMatchContributions_effectiveStartDate, eeERMatchValuesID);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsuranceCoverage

<details>
<summary>listBenefitInsuranceCoverages</summary>

<div>

Queries the BenefitInsuranceCoverage collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceCoveragesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceCoverages();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceCoverage</summary>

<div>

Retrieves a single BenefitInsuranceCoverage entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `coverageId` | <code>string</code> | Yes | key: coverageId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceCoverageQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceCoverage(coverageId);
```

</div>
</details>

#### BenefitProgram

<details>
<summary>listBenefitPrograms</summary>

<div>

Queries the BenefitProgram collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitProgramsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitPrograms();
```

</div>
</details>

<details>
<summary>getBenefitProgram</summary>

<div>

Retrieves a single BenefitProgram entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `programId` | <code>string</code> | Yes | key: programId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitProgramQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitProgram(effectiveStartDate, programId);
```

</div>
</details>

#### BenefitCompanyCarLeaseServiceProvider

<details>
<summary>listBenefitCompanyCarLeaseServiceProviders</summary>

<div>

Queries the BenefitCompanyCarLeaseServiceProvider collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyCarLeaseServiceProvidersQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listBenefitCompanyCarLeaseServiceProviders();
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
<summary>getBenefitCompanyCarLeaseServiceProvider</summary>

<div>

Retrieves a single BenefitCompanyCarLeaseServiceProvider entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyCarLeaseServiceProviderQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyCarLeaseServiceProvider&#124;error`

**Sample code:**

```ballerina
BenefitCompanyCarLeaseServiceProvider result = check client->getBenefitCompanyCarLeaseServiceProvider(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsuranceRateChart

<details>
<summary>listBenefitInsuranceRateCharts</summary>

<div>

Queries the BenefitInsuranceRateChart collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceRateChartsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceRateCharts();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceRateChart</summary>

<div>

Retrieves a single BenefitInsuranceRateChart entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `rateChartId` | <code>string</code> | Yes | key: rateChartId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceRateChartQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceRateChart(effectiveStartDate, rateChartId);
```

</div>
</details>

#### BenefitEmployeeLifeEventDeclarationForm

<details>
<summary>listBenefitEmployeeLifeEventDeclarationForms</summary>

<div>

Queries the BenefitEmployeeLifeEventDeclarationForm collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEmployeeLifeEventDeclarationFormsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listBenefitEmployeeLifeEventDeclarationForms();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "employeeLifeEventId": "1000",
        "lifeEventIdNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBenefitEmployeeLifeEventDeclarationForm</summary>

<div>

Creates a new BenefitEmployeeLifeEventDeclarationForm entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BenefitEmployeeLifeEventDeclarationForm</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBenefitEmployeeLifeEventDeclarationForm&#124;error`

**Sample code:**

```ballerina
CreatedBenefitEmployeeLifeEventDeclarationForm result = check client->createBenefitEmployeeLifeEventDeclarationForm(payload);
```

**Sample response:**

```json
{
  "d": {
    "employeeLifeEventId": "1000",
    "lifeEventIdNav": {
      "d": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getBenefitEmployeeLifeEventDeclarationForm</summary>

<div>

Retrieves a single BenefitEmployeeLifeEventDeclarationForm entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeLifeEventId` | <code>string</code> | Yes | key: employeeLifeEventId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEmployeeLifeEventDeclarationFormQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitEmployeeLifeEventDeclarationForm&#124;error`

**Sample code:**

```ballerina
BenefitEmployeeLifeEventDeclarationForm result = check client->getBenefitEmployeeLifeEventDeclarationForm(employeeLifeEventId);
```

**Sample response:**

```json
{
  "employeeLifeEventId": "1000",
  "lifeEventIdNav": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>updateBenefitEmployeeLifeEventDeclarationForm</summary>

<div>

Updates the BenefitEmployeeLifeEventDeclarationForm identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeLifeEventId` | <code>string</code> | Yes | key: employeeLifeEventId |
| `payload` | <code>ModifiedBenefitEmployeeLifeEventDeclarationForm</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBenefitEmployeeLifeEventDeclarationForm(employeeLifeEventId, payload);
```

</div>
</details>

<details>
<summary>deleteBenefitEmployeeLifeEventDeclarationForm</summary>

<div>

Deletes the BenefitEmployeeLifeEventDeclarationForm identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `employeeLifeEventId` | <code>string</code> | Yes | key: employeeLifeEventId |
| `headers` | <code>DeleteBenefitEmployeeLifeEventDeclarationFormHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBenefitEmployeeLifeEventDeclarationForm(employeeLifeEventId);
```

</div>
</details>

#### BenefitInsuranceProvider

<details>
<summary>listBenefitInsuranceProviders</summary>

<div>

Queries the BenefitInsuranceProvider collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceProvidersQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceProviders();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceProvider</summary>

<div>

Retrieves a single BenefitInsuranceProvider entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `providerId` | <code>string</code> | Yes | key: providerId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceProviderQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceProvider(providerId);
```

</div>
</details>

#### ImputedCostForAgeRanges

<details>
<summary>listImputedCostForAgeRangess</summary>

<div>

Queries the ImputedCostForAgeRanges collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListImputedCostForAgeRangessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listImputedCostForAgeRangess();
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
<summary>getImputedCostForAgeRanges</summary>

<div>

Retrieves a single ImputedCostForAgeRanges entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `IRSPremiumTable_configurationId` | <code>string</code> | Yes | key: IRSPremiumTable_configurationId |
| `IRSPremiumTable_effectiveStartDate` | <code>string</code> | Yes | key: IRSPremiumTable_effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetImputedCostForAgeRangesQueries</code> | No | Queries to be sent with the request |

**Returns:** `ImputedCostForAgeRanges&#124;error`

**Sample code:**

```ballerina
ImputedCostForAgeRanges result = check client->getImputedCostForAgeRanges(IRSPremiumTable_configurationId, IRSPremiumTable_effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsurancePlanEnrollmentDetails

<details>
<summary>listBenefitInsurancePlanEnrollmentDetails</summary>

<div>

Queries the BenefitInsurancePlanEnrollmentDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsurancePlanEnrollmentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsurancePlanEnrollmentDetails();
```

</div>
</details>

<details>
<summary>getBenefitInsurancePlanEnrollmentDetails</summary>

<div>

Retrieves a single BenefitInsurancePlanEnrollmentDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsurancePlanEnrollmentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsurancePlanEnrollmentDetails(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, externalCode);
```

</div>
</details>

#### BenefitEffectiveDateConfiguration

<details>
<summary>listBenefitEffectiveDateConfigurations</summary>

<div>

Queries the BenefitEffectiveDateConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEffectiveDateConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEffectiveDateConfigurations();
```

</div>
</details>

<details>
<summary>getBenefitEffectiveDateConfiguration</summary>

<div>

Retrieves a single BenefitEffectiveDateConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitLifeEventConfiguration_configurationId` | <code>string</code> | Yes | key: BenefitLifeEventConfiguration_configurationId |
| `BenefitLifeEventConfiguration_effectiveStartDate` | <code>string</code> | Yes | key: BenefitLifeEventConfiguration_effectiveStartDate |
| `benefit` | <code>string</code> | Yes | key: benefit |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEffectiveDateConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEffectiveDateConfiguration(BenefitLifeEventConfiguration_configurationId, BenefitLifeEventConfiguration_effectiveStartDate, benefit);
```

</div>
</details>

#### BenefitEvent

<details>
<summary>listBenefitEvents</summary>

<div>

Queries the BenefitEvent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEventsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listBenefitEvents();
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
<summary>getBenefitEvent</summary>

<div>

Retrieves a single BenefitEvent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `eventCode` | <code>string</code> | Yes | key: eventCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEventQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitEvent&#124;error`

**Sample code:**

```ballerina
BenefitEvent result = check client->getBenefitEvent(effectiveStartDate, eventCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitSchedules

<details>
<summary>listBenefitScheduless</summary>

<div>

Queries the BenefitSchedules collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSchedulessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listBenefitScheduless();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "id": "1000",
        "periods": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSchedules</summary>

<div>

Retrieves a single BenefitSchedules entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSchedulesQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSchedules&#124;error`

**Sample code:**

```ballerina
BenefitSchedules result = check client->getBenefitSchedules(id);
```

**Sample response:**

```json
{
  "id": "1000",
  "periods": {
    "results": [
      {
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

#### BenefitProgramExceptionDetails

<details>
<summary>listBenefitProgramExceptionDetails</summary>

<div>

Queries the BenefitProgramExceptionDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitProgramExceptionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitProgramExceptionDetails();
```

</div>
</details>

<details>
<summary>getBenefitProgramExceptionDetails</summary>

<div>

Retrieves a single BenefitProgramExceptionDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitsException_exceptionId` | <code>int</code> | Yes | key: BenefitsException_exceptionId |
| `benefitProgram` | <code>string</code> | Yes | key: benefitProgram |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitProgramExceptionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitProgramExceptionDetails(BenefitsException_exceptionId, benefitProgram);
```

</div>
</details>

#### SavingsAccountDeductionDetails

<details>
<summary>listSavingsAccountDeductionDetails</summary>

<div>

Queries the SavingsAccountDeductionDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSavingsAccountDeductionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listSavingsAccountDeductionDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "SavingsAccountBenefitDetails_externalCode": "1000",
        "SavingsAccountUSA_externalCode": "1000",
        "deductionDetailId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getSavingsAccountDeductionDetails</summary>

<div>

Retrieves a single SavingsAccountDeductionDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `SavingsAccountBenefitDetails_externalCode` | <code>int</code> | Yes | key: SavingsAccountBenefitDetails_externalCode |
| `SavingsAccountUSA_externalCode` | <code>int</code> | Yes | key: SavingsAccountUSA_externalCode |
| `deductionDetailId` | <code>int</code> | Yes | key: deductionDetailId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSavingsAccountDeductionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `SavingsAccountDeductionDetails&#124;error`

**Sample code:**

```ballerina
SavingsAccountDeductionDetails result = check client->getSavingsAccountDeductionDetails(Benefit_benefitId, Benefit_effectiveStartDate, SavingsAccountBenefitDetails_externalCode, SavingsAccountUSA_externalCode, deductionDetailId);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "SavingsAccountBenefitDetails_externalCode": "1000",
  "SavingsAccountUSA_externalCode": "1000",
  "deductionDetailId": "1000"
}
```

</div>
</details>

#### BenefitPaymentOptions

<details>
<summary>listBenefitPaymentOptionss</summary>

<div>

Queries the BenefitPaymentOptions collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPaymentOptionssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_20&#124;error`

**Sample code:**

```ballerina
Wrapper_20 result = check client->listBenefitPaymentOptionss();
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
<summary>getBenefitPaymentOptions</summary>

<div>

Retrieves a single BenefitPaymentOptions entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `payComponent` | <code>string</code> | Yes | key: payComponent |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPaymentOptionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPaymentOptions&#124;error`

**Sample code:**

```ballerina
BenefitPaymentOptions result = check client->getBenefitPaymentOptions(Benefit_benefitId, Benefit_effectiveStartDate, payComponent);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitSavingsPlanSubTypeCountryLookup

<details>
<summary>listBenefitSavingsPlanSubTypeCountryLookups</summary>

<div>

Queries the BenefitSavingsPlanSubTypeCountryLookup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanSubTypeCountryLookupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_21&#124;error`

**Sample code:**

```ballerina
Wrapper_21 result = check client->listBenefitSavingsPlanSubTypeCountryLookups();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "effectiveStartDate": "2026-01-01",
        "benefitSavingsPlanSubTypes": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSavingsPlanSubTypeCountryLookup</summary>

<div>

Retrieves a single BenefitSavingsPlanSubTypeCountryLookup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanSubTypeCountryLookupQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanSubTypeCountryLookup&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanSubTypeCountryLookup result = check client->getBenefitSavingsPlanSubTypeCountryLookup(country, effectiveStartDate);
```

**Sample response:**

```json
{
  "country": "string",
  "effectiveStartDate": "2026-01-01",
  "benefitSavingsPlanSubTypes": {
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

#### LifeEventForBenefit

<details>
<summary>listLifeEventForBenefits</summary>

<div>

Queries the LifeEventForBenefit collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLifeEventForBenefitsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listLifeEventForBenefits();
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
<summary>getLifeEventForBenefit</summary>

<div>

Retrieves a single LifeEventForBenefit entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `lifeEventId` | <code>string</code> | Yes | key: lifeEventId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLifeEventForBenefitQueries</code> | No | Queries to be sent with the request |

**Returns:** `LifeEventForBenefit&#124;error`

**Sample code:**

```ballerina
LifeEventForBenefit result = check client->getLifeEventForBenefit(lifeEventId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsurancePlanUSA

<details>
<summary>listBenefitInsurancePlanUSAs</summary>

<div>

Queries the BenefitInsurancePlanUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsurancePlanUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_23&#124;error`

**Sample code:**

```ballerina
Wrapper_23 result = check client->listBenefitInsurancePlanUSAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "BenefitInsurancePlan_effectiveStartDate": "2026-01-01",
        "BenefitInsurancePlan_id": "1000",
        "id": "1000",
        "IRSPremiumTableNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitInsurancePlanUSA</summary>

<div>

Retrieves a single BenefitInsurancePlanUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitInsurancePlan_effectiveStartDate` | <code>string</code> | Yes | key: BenefitInsurancePlan_effectiveStartDate |
| `BenefitInsurancePlan_id` | <code>string</code> | Yes | key: BenefitInsurancePlan_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsurancePlanUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitInsurancePlanUSA&#124;error`

**Sample code:**

```ballerina
BenefitInsurancePlanUSA result = check client->getBenefitInsurancePlanUSA(BenefitInsurancePlan_effectiveStartDate, BenefitInsurancePlan_id, id);
```

**Sample response:**

```json
{
  "BenefitInsurancePlan_effectiveStartDate": "2026-01-01",
  "BenefitInsurancePlan_id": "1000",
  "id": "1000",
  "IRSPremiumTableNav": {
    "results": [
      {
        "configurationId": "1000",
        "effectiveStartDate": "2026-01-01",
        "imputedCostForAgeRanges": {}
      }
    ]
  }
}
```

</div>
</details>

#### SavingsAccountBenefitDetails

<details>
<summary>listSavingsAccountBenefitDetails</summary>

<div>

Queries the SavingsAccountBenefitDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSavingsAccountBenefitDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listSavingsAccountBenefitDetails();
```

</div>
</details>

<details>
<summary>getSavingsAccountBenefitDetails</summary>

<div>

Retrieves a single SavingsAccountBenefitDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSavingsAccountBenefitDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getSavingsAccountBenefitDetails(Benefit_benefitId, Benefit_effectiveStartDate, externalCode);
```

</div>
</details>

#### IRSPremiumTable

<details>
<summary>listIRSPremiumTables</summary>

<div>

Queries the IRSPremiumTable collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListIRSPremiumTablesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listIRSPremiumTables();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "configurationId": "1000",
        "effectiveStartDate": "2026-01-01",
        "imputedCostForAgeRanges": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getIRSPremiumTable</summary>

<div>

Retrieves a single IRSPremiumTable entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `configurationId` | <code>string</code> | Yes | key: configurationId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIRSPremiumTableQueries</code> | No | Queries to be sent with the request |

**Returns:** `IRSPremiumTable&#124;error`

**Sample code:**

```ballerina
IRSPremiumTable result = check client->getIRSPremiumTable(configurationId, effectiveStartDate);
```

**Sample response:**

```json
{
  "configurationId": "1000",
  "effectiveStartDate": "2026-01-01",
  "imputedCostForAgeRanges": {
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

#### BenefitSchedulePeriod

<details>
<summary>listBenefitSchedulePeriods</summary>

<div>

Queries the BenefitSchedulePeriod collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSchedulePeriodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listBenefitSchedulePeriods();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSchedulePeriod</summary>

<div>

Retrieves a single BenefitSchedulePeriod entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSchedulePeriodQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSchedulePeriod&#124;error`

**Sample code:**

```ballerina
BenefitSchedulePeriod result = check client->getBenefitSchedulePeriod(id);
```

**Sample response:**

```json
{
  "id": "1000"
}
```

</div>
</details>

#### BenefitOpenEnrollmentCycleConfiguration

<details>
<summary>listBenefitOpenEnrollmentCycleConfigurations</summary>

<div>

Queries the BenefitOpenEnrollmentCycleConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitOpenEnrollmentCycleConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitOpenEnrollmentCycleConfigurations();
```

</div>
</details>

<details>
<summary>getBenefitOpenEnrollmentCycleConfiguration</summary>

<div>

Retrieves a single BenefitOpenEnrollmentCycleConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `openEnrollmentId` | <code>string</code> | Yes | key: openEnrollmentId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitOpenEnrollmentCycleConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitOpenEnrollmentCycleConfiguration(effectiveStartDate, openEnrollmentId);
```

</div>
</details>

#### PensionBandingConfiguration

<details>
<summary>listPensionBandingConfigurations</summary>

<div>

Queries the PensionBandingConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPensionBandingConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_28&#124;error`

**Sample code:**

```ballerina
Wrapper_28 result = check client->listPensionBandingConfigurations();
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
<summary>getPensionBandingConfiguration</summary>

<div>

Retrieves a single PensionBandingConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bandingConfigurationId` | <code>string</code> | Yes | key: bandingConfigurationId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPensionBandingConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `PensionBandingConfiguration&#124;error`

**Sample code:**

```ballerina
PensionBandingConfiguration result = check client->getPensionBandingConfiguration(bandingConfigurationId, effectiveStartDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsuranceDependentDetail

<details>
<summary>listBenefitInsuranceDependentDetails</summary>

<div>

Queries the BenefitInsuranceDependentDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceDependentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_29&#124;error`

**Sample code:**

```ballerina
Wrapper_29 result = check client->listBenefitInsuranceDependentDetails();
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
<summary>getBenefitInsuranceDependentDetail</summary>

<div>

Retrieves a single BenefitInsuranceDependentDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `BenefitInsurancePlanEnrollmentDetails_externalCode` | <code>int</code> | Yes | key: BenefitInsurancePlanEnrollmentDetails_externalCode |
| `dependentName` | <code>string</code> | Yes | key: dependentName |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceDependentDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitInsuranceDependentDetail&#124;error`

**Sample code:**

```ballerina
BenefitInsuranceDependentDetail result = check client->getBenefitInsuranceDependentDetail(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, BenefitInsurancePlanEnrollmentDetails_externalCode, dependentName);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitProgramEnrollmentDetail

<details>
<summary>listBenefitProgramEnrollmentDetails</summary>

<div>

Queries the BenefitProgramEnrollmentDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitProgramEnrollmentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitProgramEnrollmentDetails();
```

</div>
</details>

<details>
<summary>getBenefitProgramEnrollmentDetail</summary>

<div>

Retrieves a single BenefitProgramEnrollmentDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitProgramEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitProgramEnrollment_effectiveStartDate |
| `BenefitProgramEnrollment_id` | <code>int</code> | Yes | key: BenefitProgramEnrollment_id |
| `selectionId` | <code>int</code> | Yes | key: selectionId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitProgramEnrollmentDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitProgramEnrollmentDetail(BenefitProgramEnrollment_effectiveStartDate, BenefitProgramEnrollment_id, selectionId);
```

</div>
</details>

#### ACAReportingInformation

<details>
<summary>listACAReportingInformations</summary>

<div>

Queries the ACAReportingInformation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListACAReportingInformationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listACAReportingInformations();
```

</div>
</details>

<details>
<summary>getACAReportingInformation</summary>

<div>

Retrieves a single ACAReportingInformation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetACAReportingInformationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getACAReportingInformation(externalCode);
```

</div>
</details>

#### BenefitEmployeeClaimDetail

<details>
<summary>listBenefitEmployeeClaimDetails</summary>

<div>

Queries the BenefitEmployeeClaimDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEmployeeClaimDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_32&#124;error`

**Sample code:**

```ballerina
Wrapper_32 result = check client->listBenefitEmployeeClaimDetails();
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
<summary>getBenefitEmployeeClaimDetail</summary>

<div>

Retrieves a single BenefitEmployeeClaimDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeClaim_id` | <code>int</code> | Yes | key: BenefitEmployeeClaim_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEmployeeClaimDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitEmployeeClaimDetail&#124;error`

**Sample code:**

```ballerina
BenefitEmployeeClaimDetail result = check client->getBenefitEmployeeClaimDetail(BenefitEmployeeClaim_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitFuelReimbursement

<details>
<summary>listBenefitFuelReimbursements</summary>

<div>

Queries the BenefitFuelReimbursement collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitFuelReimbursementsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_33&#124;error`

**Sample code:**

```ballerina
Wrapper_33 result = check client->listBenefitFuelReimbursements();
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
<summary>getBenefitFuelReimbursement</summary>

<div>

Retrieves a single BenefitFuelReimbursement entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeClaim_id` | <code>int</code> | Yes | key: BenefitEmployeeClaim_id |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitFuelReimbursementQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitFuelReimbursement&#124;error`

**Sample code:**

```ballerina
BenefitFuelReimbursement result = check client->getBenefitFuelReimbursement(BenefitEmployeeClaim_id, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### InsuranceEnrollmentFieldsConfiguration

<details>
<summary>listInsuranceEnrollmentFieldsConfigurations</summary>

<div>

Queries the InsuranceEnrollmentFieldsConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInsuranceEnrollmentFieldsConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_34&#124;error`

**Sample code:**

```ballerina
Wrapper_34 result = check client->listInsuranceEnrollmentFieldsConfigurations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "InsuranceBenefitDetails_externalCode": "1000",
        "configurationId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getInsuranceEnrollmentFieldsConfiguration</summary>

<div>

Retrieves a single InsuranceEnrollmentFieldsConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `InsuranceBenefitDetails_externalCode` | <code>int</code> | Yes | key: InsuranceBenefitDetails_externalCode |
| `configurationId` | <code>int</code> | Yes | key: configurationId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInsuranceEnrollmentFieldsConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `InsuranceEnrollmentFieldsConfiguration&#124;error`

**Sample code:**

```ballerina
InsuranceEnrollmentFieldsConfiguration result = check client->getInsuranceEnrollmentFieldsConfiguration(Benefit_benefitId, Benefit_effectiveStartDate, InsuranceBenefitDetails_externalCode, configurationId);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "InsuranceBenefitDetails_externalCode": "1000",
  "configurationId": "1000"
}
```

</div>
</details>

#### BenefitCompanyCar

<details>
<summary>listBenefitCompanyCars</summary>

<div>

Queries the BenefitCompanyCar collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyCarsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_35&#124;error`

**Sample code:**

```ballerina
Wrapper_35 result = check client->listBenefitCompanyCars();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "benefitCompanyCarId": "1000",
        "benCompanyCarAllowedModels": {},
        "benCompanyCarRecommendedVendors": {},
        "carLeaseServiceProviders": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitCompanyCar</summary>

<div>

Retrieves a single BenefitCompanyCar entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `benefitCompanyCarId` | <code>int</code> | Yes | key: benefitCompanyCarId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyCarQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyCar&#124;error`

**Sample code:**

```ballerina
BenefitCompanyCar result = check client->getBenefitCompanyCar(Benefit_benefitId, Benefit_effectiveStartDate, benefitCompanyCarId);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "benefitCompanyCarId": "1000",
  "benCompanyCarAllowedModels": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "benCompanyCarRecommendedVendors": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "carLeaseServiceProviders": {
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

#### BenefitCompanyHousing

<details>
<summary>listBenefitCompanyHousings</summary>

<div>

Queries the BenefitCompanyHousing collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyHousingsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_36&#124;error`

**Sample code:**

```ballerina
Wrapper_36 result = check client->listBenefitCompanyHousings();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitCompanyHousing</summary>

<div>

Retrieves a single BenefitCompanyHousing entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyHousingQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyHousing&#124;error`

**Sample code:**

```ballerina
BenefitCompanyHousing result = check client->getBenefitCompanyHousing(Benefit_benefitId, Benefit_effectiveStartDate, id);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "id": "1000"
}
```

</div>
</details>

#### BenefitPensionAdditionalContributionLimits

<details>
<summary>listBenefitPensionAdditionalContributionLimitss</summary>

<div>

Queries the BenefitPensionAdditionalContributionLimits collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionAdditionalContributionLimitssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_37&#124;error`

**Sample code:**

```ballerina
Wrapper_37 result = check client->listBenefitPensionAdditionalContributionLimitss();
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
<summary>getBenefitPensionAdditionalContributionLimits</summary>

<div>

Retrieves a single BenefitPensionAdditionalContributionLimits entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contributionLimitId` | <code>string</code> | Yes | key: contributionLimitId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionAdditionalContributionLimitsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionAdditionalContributionLimits&#124;error`

**Sample code:**

```ballerina
BenefitPensionAdditionalContributionLimits result = check client->getBenefitPensionAdditionalContributionLimits(contributionLimitId, effectiveStartDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitPensionNonDependentNominees

<details>
<summary>listBenefitPensionNonDependentNomineess</summary>

<div>

Queries the BenefitPensionNonDependentNominees collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionNonDependentNomineessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_38&#124;error`

**Sample code:**

```ballerina
Wrapper_38 result = check client->listBenefitPensionNonDependentNomineess();
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
<summary>getBenefitPensionNonDependentNominees</summary>

<div>

Retrieves a single BenefitPensionNonDependentNominees entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `nomineesId` | <code>int</code> | Yes | key: nomineesId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionNonDependentNomineesQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionNonDependentNominees&#124;error`

**Sample code:**

```ballerina
BenefitPensionNonDependentNominees result = check client->getBenefitPensionNonDependentNominees(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, nomineesId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitExceptionDetails

<details>
<summary>listBenefitExceptionDetails</summary>

<div>

Queries the BenefitExceptionDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitExceptionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitExceptionDetails();
```

</div>
</details>

<details>
<summary>getBenefitExceptionDetails</summary>

<div>

Retrieves a single BenefitExceptionDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitsException_exceptionId` | <code>int</code> | Yes | key: BenefitsException_exceptionId |
| `benefit` | <code>string</code> | Yes | key: benefit |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitExceptionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitExceptionDetails(BenefitsException_exceptionId, benefit);
```

</div>
</details>

#### InsuranceBenefitDetails

<details>
<summary>listInsuranceBenefitDetails</summary>

<div>

Queries the InsuranceBenefitDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInsuranceBenefitDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listInsuranceBenefitDetails();
```

</div>
</details>

<details>
<summary>getInsuranceBenefitDetails</summary>

<div>

Retrieves a single InsuranceBenefitDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInsuranceBenefitDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getInsuranceBenefitDetails(Benefit_benefitId, Benefit_effectiveStartDate, externalCode);
```

</div>
</details>

#### Benefit

<details>
<summary>listBenefits</summary>

<div>

Queries the Benefit collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefits();
```

</div>
</details>

<details>
<summary>getBenefit</summary>

<div>

Retrieves a single Benefit entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `benefitId` | <code>string</code> | Yes | key: benefitId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefit(benefitId, effectiveStartDate);
```

</div>
</details>

#### BenefitInsuranceCoverageDetails

<details>
<summary>listBenefitInsuranceCoverageDetails</summary>

<div>

Queries the BenefitInsuranceCoverageDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceCoverageDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceCoverageDetails();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceCoverageDetails</summary>

<div>

Retrieves a single BenefitInsuranceCoverageDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitInsuranceCoverageOptions_externalCode` | <code>int</code> | Yes | key: BenefitInsuranceCoverageOptions_externalCode |
| `BenefitInsurancePlan_effectiveStartDate` | <code>string</code> | Yes | key: BenefitInsurancePlan_effectiveStartDate |
| `BenefitInsurancePlan_id` | <code>string</code> | Yes | key: BenefitInsurancePlan_id |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceCoverageDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceCoverageDetails(BenefitInsuranceCoverageOptions_externalCode, BenefitInsurancePlan_effectiveStartDate, BenefitInsurancePlan_id, externalCode);
```

</div>
</details>

#### BenefitInsuranceEnrolleeOptions

<details>
<summary>listBenefitInsuranceEnrolleeOptionss</summary>

<div>

Queries the BenefitInsuranceEnrolleeOptions collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceEnrolleeOptionssQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceEnrolleeOptionss();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceEnrolleeOptions</summary>

<div>

Retrieves a single BenefitInsuranceEnrolleeOptions entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceEnrolleeOptionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceEnrolleeOptions(id);
```

</div>
</details>

#### BenefitPensionFundEnrollmentContributionDetail

<details>
<summary>listBenefitPensionFundEnrollmentContributionDetails</summary>

<div>

Queries the BenefitPensionFundEnrollmentContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionFundEnrollmentContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_44&#124;error`

**Sample code:**

```ballerina
Wrapper_44 result = check client->listBenefitPensionFundEnrollmentContributionDetails();
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
<summary>getBenefitPensionFundEnrollmentContributionDetail</summary>

<div>

Retrieves a single BenefitPensionFundEnrollmentContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionFundEnrollmentContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionFundEnrollmentContributionDetail&#124;error`

**Sample code:**

```ballerina
BenefitPensionFundEnrollmentContributionDetail result = check client->getBenefitPensionFundEnrollmentContributionDetail(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitPensionEnrollmentContributionDetail

<details>
<summary>listBenefitPensionEnrollmentContributionDetails</summary>

<div>

Queries the BenefitPensionEnrollmentContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionEnrollmentContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_45&#124;error`

**Sample code:**

```ballerina
Wrapper_45 result = check client->listBenefitPensionEnrollmentContributionDetails();
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
<summary>getBenefitPensionEnrollmentContributionDetail</summary>

<div>

Retrieves a single BenefitPensionEnrollmentContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `contributionId` | <code>int</code> | Yes | key: contributionId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionEnrollmentContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionEnrollmentContributionDetail&#124;error`

**Sample code:**

```ballerina
BenefitPensionEnrollmentContributionDetail result = check client->getBenefitPensionEnrollmentContributionDetail(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, contributionId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitPensionMinMaxContributionLimits

<details>
<summary>listBenefitPensionMinMaxContributionLimitss</summary>

<div>

Queries the BenefitPensionMinMaxContributionLimits collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionMinMaxContributionLimitssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_46&#124;error`

**Sample code:**

```ballerina
Wrapper_46 result = check client->listBenefitPensionMinMaxContributionLimitss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "configurationTableId": "1000",
        "effectiveStartDate": "2026-01-01"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitPensionMinMaxContributionLimits</summary>

<div>

Retrieves a single BenefitPensionMinMaxContributionLimits entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `configurationTableId` | <code>string</code> | Yes | key: configurationTableId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionMinMaxContributionLimitsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionMinMaxContributionLimits&#124;error`

**Sample code:**

```ballerina
BenefitPensionMinMaxContributionLimits result = check client->getBenefitPensionMinMaxContributionLimits(configurationTableId, effectiveStartDate);
```

**Sample response:**

```json
{
  "configurationTableId": "1000",
  "effectiveStartDate": "2026-01-01"
}
```

</div>
</details>

#### BenefitDependentDetail

<details>
<summary>listBenefitDependentDetails</summary>

<div>

Queries the BenefitDependentDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitDependentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_47&#124;error`

**Sample code:**

```ballerina
Wrapper_47 result = check client->listBenefitDependentDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "BenefitEmployeeClaim_id": "1000",
        "dependentName": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitDependentDetail</summary>

<div>

Retrieves a single BenefitDependentDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeClaim_id` | <code>int</code> | Yes | key: BenefitEmployeeClaim_id |
| `dependentName` | <code>string</code> | Yes | key: dependentName |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitDependentDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitDependentDetail&#124;error`

**Sample code:**

```ballerina
BenefitDependentDetail result = check client->getBenefitDependentDetail(BenefitEmployeeClaim_id, dependentName);
```

**Sample response:**

```json
{
  "BenefitEmployeeClaim_id": "1000",
  "dependentName": "string"
}
```

</div>
</details>

#### BenefitCompanyCarEnrollment

<details>
<summary>listBenefitCompanyCarEnrollments</summary>

<div>

Queries the BenefitCompanyCarEnrollment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyCarEnrollmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitCompanyCarEnrollments();
```

</div>
</details>

<details>
<summary>getBenefitCompanyCarEnrollment</summary>

<div>

Retrieves a single BenefitCompanyCarEnrollment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyCarEnrollmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitCompanyCarEnrollment(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, id);
```

</div>
</details>

#### BenefitPensionEmployerContributionDetail

<details>
<summary>listBenefitPensionEmployerContributionDetails</summary>

<div>

Queries the BenefitPensionEmployerContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionEmployerContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_49&#124;error`

**Sample code:**

```ballerina
Wrapper_49 result = check client->listBenefitPensionEmployerContributionDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitPensionEmployerContributionDetail</summary>

<div>

Retrieves a single BenefitPensionEmployerContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionEmployerContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionEmployerContributionDetail&#124;error`

**Sample code:**

```ballerina
BenefitPensionEmployerContributionDetail result = check client->getBenefitPensionEmployerContributionDetail(Benefit_benefitId, Benefit_effectiveStartDate, id);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "id": "1000"
}
```

</div>
</details>

#### BenefitsConfigUIScreenLookup

<details>
<summary>listBenefitsConfigUIScreenLookups</summary>

<div>

Queries the BenefitsConfigUIScreenLookup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitsConfigUIScreenLookupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_50&#124;error`

**Sample code:**

```ballerina
Wrapper_50 result = check client->listBenefitsConfigUIScreenLookups();
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
<summary>getBenefitsConfigUIScreenLookup</summary>

<div>

Retrieves a single BenefitsConfigUIScreenLookup entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectType` | <code>string</code> | Yes | key: objectType |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitsConfigUIScreenLookupQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitsConfigUIScreenLookup&#124;error`

**Sample code:**

```ballerina
BenefitsConfigUIScreenLookup result = check client->getBenefitsConfigUIScreenLookup(objectType);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitDocuments

<details>
<summary>listBenefitDocumentss</summary>

<div>

Queries the BenefitDocuments collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitDocumentssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_51&#124;error`

**Sample code:**

```ballerina
Wrapper_51 result = check client->listBenefitDocumentss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitDocuments</summary>

<div>

Retrieves a single BenefitDocuments entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitDocumentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitDocuments&#124;error`

**Sample code:**

```ballerina
BenefitDocuments result = check client->getBenefitDocuments(effectiveStartDate, id);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "id": "1000"
}
```

</div>
</details>

#### BenefitPensionFund

<details>
<summary>listBenefitPensionFunds</summary>

<div>

Queries the BenefitPensionFund collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionFundsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_52&#124;error`

**Sample code:**

```ballerina
Wrapper_52 result = check client->listBenefitPensionFunds();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitPensionFund</summary>

<div>

Retrieves a single BenefitPensionFund entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionFundQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionFund&#124;error`

**Sample code:**

```ballerina
BenefitPensionFund result = check client->getBenefitPensionFund(Benefit_benefitId, Benefit_effectiveStartDate, id);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "id": "1000"
}
```

</div>
</details>

#### PensionBandingConfigurationDetails

<details>
<summary>listPensionBandingConfigurationDetails</summary>

<div>

Queries the PensionBandingConfigurationDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPensionBandingConfigurationDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_53&#124;error`

**Sample code:**

```ballerina
Wrapper_53 result = check client->listPensionBandingConfigurationDetails();
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
<summary>getPensionBandingConfigurationDetails</summary>

<div>

Retrieves a single PensionBandingConfigurationDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PensionBandingConfiguration_bandingConfigurationId` | <code>string</code> | Yes | key: PensionBandingConfiguration_bandingConfigurationId |
| `PensionBandingConfiguration_effectiveStartDate` | <code>string</code> | Yes | key: PensionBandingConfiguration_effectiveStartDate |
| `bandingDetailsId` | <code>string</code> | Yes | key: bandingDetailsId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPensionBandingConfigurationDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `PensionBandingConfigurationDetails&#124;error`

**Sample code:**

```ballerina
PensionBandingConfigurationDetails result = check client->getPensionBandingConfigurationDetails(PensionBandingConfiguration_bandingConfigurationId, PensionBandingConfiguration_effectiveStartDate, bandingDetailsId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitsException

<details>
<summary>listBenefitsExceptions</summary>

<div>

Queries the BenefitsException collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitsExceptionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitsExceptions();
```

</div>
</details>

<details>
<summary>getBenefitsException</summary>

<div>

Retrieves a single BenefitsException entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `exceptionId` | <code>int</code> | Yes | key: exceptionId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitsExceptionQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitsException(exceptionId);
```

</div>
</details>

#### BenefitInsuranceRateChartFixedAmount

<details>
<summary>listBenefitInsuranceRateChartFixedAmounts</summary>

<div>

Queries the BenefitInsuranceRateChartFixedAmount collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceRateChartFixedAmountsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceRateChartFixedAmounts();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceRateChartFixedAmount</summary>

<div>

Retrieves a single BenefitInsuranceRateChartFixedAmount entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitInsuranceRateChart_effectiveStartDate` | <code>string</code> | Yes | key: BenefitInsuranceRateChart_effectiveStartDate |
| `BenefitInsuranceRateChart_rateChartId` | <code>string</code> | Yes | key: BenefitInsuranceRateChart_rateChartId |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceRateChartFixedAmountQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceRateChartFixedAmount(BenefitInsuranceRateChart_effectiveStartDate, BenefitInsuranceRateChart_rateChartId, externalCode);
```

</div>
</details>

#### BenefitLegalEntity

<details>
<summary>listBenefitLegalEntitys</summary>

<div>

Queries the BenefitLegalEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitLegalEntitysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_56&#124;error`

**Sample code:**

```ballerina
Wrapper_56 result = check client->listBenefitLegalEntitys();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "company": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitLegalEntity</summary>

<div>

Retrieves a single BenefitLegalEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `company` | <code>string</code> | Yes | key: company |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitLegalEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitLegalEntity&#124;error`

**Sample code:**

```ballerina
BenefitLegalEntity result = check client->getBenefitLegalEntity(company);
```

**Sample response:**

```json
{
  "company": "string"
}
```

</div>
</details>

#### BenefitSavingsPlanEnrollmentContributionDetail

<details>
<summary>listBenefitSavingsPlanEnrollmentContributionDetails</summary>

<div>

Queries the BenefitSavingsPlanEnrollmentContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanEnrollmentContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_57&#124;error`

**Sample code:**

```ballerina
Wrapper_57 result = check client->listBenefitSavingsPlanEnrollmentContributionDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "BenefitEnrollment_effectiveStartDate": "2026-01-01",
        "BenefitEnrollment_id": "1000",
        "id": "1000",
        "pensionFundNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSavingsPlanEnrollmentContributionDetail</summary>

<div>

Retrieves a single BenefitSavingsPlanEnrollmentContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanEnrollmentContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanEnrollmentContributionDetail&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanEnrollmentContributionDetail result = check client->getBenefitSavingsPlanEnrollmentContributionDetail(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, id);
```

**Sample response:**

```json
{
  "BenefitEnrollment_effectiveStartDate": "2026-01-01",
  "BenefitEnrollment_id": "1000",
  "id": "1000",
  "pensionFundNav": {
    "Benefit_benefitId": "1000",
    "Benefit_effectiveStartDate": "2026-01-01",
    "id": "1000"
  }
}
```

</div>
</details>

#### BenefitCompanyCarRecommendedVendors

<details>
<summary>listBenefitCompanyCarRecommendedVendorss</summary>

<div>

Queries the BenefitCompanyCarRecommendedVendors collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyCarRecommendedVendorssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_58&#124;error`

**Sample code:**

```ballerina
Wrapper_58 result = check client->listBenefitCompanyCarRecommendedVendorss();
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
<summary>getBenefitCompanyCarRecommendedVendors</summary>

<div>

Retrieves a single BenefitCompanyCarRecommendedVendors entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyCarRecommendedVendorsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyCarRecommendedVendors&#124;error`

**Sample code:**

```ballerina
BenefitCompanyCarRecommendedVendors result = check client->getBenefitCompanyCarRecommendedVendors(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitInsuranceEnrolleeType

<details>
<summary>listBenefitInsuranceEnrolleeTypes</summary>

<div>

Queries the BenefitInsuranceEnrolleeType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceEnrolleeTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_59&#124;error`

**Sample code:**

```ballerina
Wrapper_59 result = check client->listBenefitInsuranceEnrolleeTypes();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "mdfSystemEffectiveStartDate": "2026-01-01",
        "relationShipType": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitInsuranceEnrolleeType</summary>

<div>

Retrieves a single BenefitInsuranceEnrolleeType entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `mdfSystemEffectiveStartDate` | <code>string</code> | Yes | key: mdfSystemEffectiveStartDate |
| `relationShipType` | <code>string</code> | Yes | key: relationShipType |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceEnrolleeTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitInsuranceEnrolleeType&#124;error`

**Sample code:**

```ballerina
BenefitInsuranceEnrolleeType result = check client->getBenefitInsuranceEnrolleeType(mdfSystemEffectiveStartDate, relationShipType);
```

**Sample response:**

```json
{
  "mdfSystemEffectiveStartDate": "2026-01-01",
  "relationShipType": "string"
}
```

</div>
</details>

#### BenefitClaimAccumulation

<details>
<summary>listBenefitClaimAccumulations</summary>

<div>

Queries the BenefitClaimAccumulation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitClaimAccumulationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitClaimAccumulations();
```

</div>
</details>

<details>
<summary>getBenefitClaimAccumulation</summary>

<div>

Retrieves a single BenefitClaimAccumulation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitClaimAccumulationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitClaimAccumulation(externalCode);
```

</div>
</details>

#### BenefitCompanyCarClaim

<details>
<summary>listBenefitCompanyCarClaims</summary>

<div>

Queries the BenefitCompanyCarClaim collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyCarClaimsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_61&#124;error`

**Sample code:**

```ballerina
Wrapper_61 result = check client->listBenefitCompanyCarClaims();
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
<summary>getBenefitCompanyCarClaim</summary>

<div>

Retrieves a single BenefitCompanyCarClaim entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeClaim_id` | <code>int</code> | Yes | key: BenefitEmployeeClaim_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyCarClaimQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyCarClaim&#124;error`

**Sample code:**

```ballerina
BenefitCompanyCarClaim result = check client->getBenefitCompanyCarClaim(BenefitEmployeeClaim_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitLifeEventConfiguration

<details>
<summary>listBenefitLifeEventConfigurations</summary>

<div>

Queries the BenefitLifeEventConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitLifeEventConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitLifeEventConfigurations();
```

</div>
</details>

<details>
<summary>getBenefitLifeEventConfiguration</summary>

<div>

Retrieves a single BenefitLifeEventConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `configurationId` | <code>string</code> | Yes | key: configurationId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitLifeEventConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitLifeEventConfiguration(configurationId, effectiveStartDate);
```

</div>
</details>

#### BenefitEnrollment

<details>
<summary>listBenefitEnrollments</summary>

<div>

Queries the BenefitEnrollment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEnrollmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEnrollments();
```

</div>
</details>

<details>
<summary>getBenefitEnrollment</summary>

<div>

Retrieves a single BenefitEnrollment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEnrollmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEnrollment(effectiveStartDate, id);
```

</div>
</details>

#### BenefitPensionDependentNominees

<details>
<summary>listBenefitPensionDependentNomineess</summary>

<div>

Queries the BenefitPensionDependentNominees collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionDependentNomineessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_64&#124;error`

**Sample code:**

```ballerina
Wrapper_64 result = check client->listBenefitPensionDependentNomineess();
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
<summary>getBenefitPensionDependentNominees</summary>

<div>

Retrieves a single BenefitPensionDependentNominees entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `dependentName` | <code>string</code> | Yes | key: dependentName |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionDependentNomineesQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionDependentNominees&#124;error`

**Sample code:**

```ballerina
BenefitPensionDependentNominees result = check client->getBenefitPensionDependentNominees(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, dependentName);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitContact

<details>
<summary>listBenefitContacts</summary>

<div>

Queries the BenefitContact collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitContactsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_65&#124;error`

**Sample code:**

```ballerina
Wrapper_65 result = check client->listBenefitContacts();
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
<summary>getBenefitContact</summary>

<div>

Retrieves a single BenefitContact entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitContactQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitContact&#124;error`

**Sample code:**

```ballerina
BenefitContact result = check client->getBenefitContact(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000"
}
```

</div>
</details>

#### BenefitFuelReimbursementClaimDetail

<details>
<summary>listBenefitFuelReimbursementClaimDetails</summary>

<div>

Queries the BenefitFuelReimbursementClaimDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitFuelReimbursementClaimDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_66&#124;error`

**Sample code:**

```ballerina
Wrapper_66 result = check client->listBenefitFuelReimbursementClaimDetails();
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
<summary>getBenefitFuelReimbursementClaimDetail</summary>

<div>

Retrieves a single BenefitFuelReimbursementClaimDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeClaim_id` | <code>int</code> | Yes | key: BenefitEmployeeClaim_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitFuelReimbursementClaimDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitFuelReimbursementClaimDetail&#124;error`

**Sample code:**

```ballerina
BenefitFuelReimbursementClaimDetail result = check client->getBenefitFuelReimbursementClaimDetail(BenefitEmployeeClaim_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitPensionStatutoryMinimumLookup

<details>
<summary>listBenefitPensionStatutoryMinimumLookups</summary>

<div>

Queries the BenefitPensionStatutoryMinimumLookup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionStatutoryMinimumLookupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_67&#124;error`

**Sample code:**

```ballerina
Wrapper_67 result = check client->listBenefitPensionStatutoryMinimumLookups();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitPensionStatutoryMinimumLookup</summary>

<div>

Retrieves a single BenefitPensionStatutoryMinimumLookup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionStatutoryMinimumLookupQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionStatutoryMinimumLookup&#124;error`

**Sample code:**

```ballerina
BenefitPensionStatutoryMinimumLookup result = check client->getBenefitPensionStatutoryMinimumLookup(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "externalCode": "1000"
}
```

</div>
</details>

#### BenefitInsuranceCoverageOptions

<details>
<summary>listBenefitInsuranceCoverageOptionss</summary>

<div>

Queries the BenefitInsuranceCoverageOptions collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceCoverageOptionssQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceCoverageOptionss();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceCoverageOptions</summary>

<div>

Retrieves a single BenefitInsuranceCoverageOptions entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitInsurancePlan_effectiveStartDate` | <code>string</code> | Yes | key: BenefitInsurancePlan_effectiveStartDate |
| `BenefitInsurancePlan_id` | <code>string</code> | Yes | key: BenefitInsurancePlan_id |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceCoverageOptionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceCoverageOptions(BenefitInsurancePlan_effectiveStartDate, BenefitInsurancePlan_id, externalCode);
```

</div>
</details>

#### BenefitLeaveTravelReimbursementClaim

<details>
<summary>listBenefitLeaveTravelReimbursementClaims</summary>

<div>

Queries the BenefitLeaveTravelReimbursementClaim collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitLeaveTravelReimbursementClaimsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_69&#124;error`

**Sample code:**

```ballerina
Wrapper_69 result = check client->listBenefitLeaveTravelReimbursementClaims();
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
<summary>getBenefitLeaveTravelReimbursementClaim</summary>

<div>

Retrieves a single BenefitLeaveTravelReimbursementClaim entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeClaim_id` | <code>int</code> | Yes | key: BenefitEmployeeClaim_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitLeaveTravelReimbursementClaimQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitLeaveTravelReimbursementClaim&#124;error`

**Sample code:**

```ballerina
BenefitLeaveTravelReimbursementClaim result = check client->getBenefitLeaveTravelReimbursementClaim(BenefitEmployeeClaim_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitBalanceCarryForward

<details>
<summary>listBenefitBalanceCarryForwards</summary>

<div>

Queries the BenefitBalanceCarryForward collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitBalanceCarryForwardsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_70&#124;error`

**Sample code:**

```ballerina
Wrapper_70 result = check client->listBenefitBalanceCarryForwards();
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
<summary>getBenefitBalanceCarryForward</summary>

<div>

Retrieves a single BenefitBalanceCarryForward entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitBalanceCarryForwardQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitBalanceCarryForward&#124;error`

**Sample code:**

```ballerina
BenefitBalanceCarryForward result = check client->getBenefitBalanceCarryForward(Benefit_benefitId, Benefit_effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitCompanyCarAllowedModels

<details>
<summary>listBenefitCompanyCarAllowedModelss</summary>

<div>

Queries the BenefitCompanyCarAllowedModels collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyCarAllowedModelssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_71&#124;error`

**Sample code:**

```ballerina
Wrapper_71 result = check client->listBenefitCompanyCarAllowedModelss();
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
<summary>getBenefitCompanyCarAllowedModels</summary>

<div>

Retrieves a single BenefitCompanyCarAllowedModels entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyCarAllowedModelsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyCarAllowedModels&#124;error`

**Sample code:**

```ballerina
BenefitCompanyCarAllowedModels result = check client->getBenefitCompanyCarAllowedModels(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitsConfirmationStatementConfiguration

<details>
<summary>listBenefitsConfirmationStatementConfigurations</summary>

<div>

Queries the BenefitsConfirmationStatementConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitsConfirmationStatementConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_72&#124;error`

**Sample code:**

```ballerina
Wrapper_72 result = check client->listBenefitsConfirmationStatementConfigurations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "legalEntity": "string",
        "legalEntityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitsConfirmationStatementConfiguration</summary>

<div>

Retrieves a single BenefitsConfirmationStatementConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `legalEntity` | <code>string</code> | Yes | key: legalEntity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitsConfirmationStatementConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitsConfirmationStatementConfiguration&#124;error`

**Sample code:**

```ballerina
BenefitsConfirmationStatementConfiguration result = check client->getBenefitsConfirmationStatementConfiguration(effectiveStartDate, legalEntity);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "legalEntity": "string",
  "legalEntityNav": {
    "company": "string"
  }
}
```

</div>
</details>

#### BenefitEnrollmentGroup

<details>
<summary>listBenefitEnrollmentGroups</summary>

<div>

Queries the BenefitEnrollmentGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEnrollmentGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEnrollmentGroups();
```

</div>
</details>

<details>
<summary>getBenefitEnrollmentGroup</summary>

<div>

Retrieves a single BenefitEnrollmentGroup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEnrollmentGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEnrollmentGroup(effectiveStartDate, id);
```

</div>
</details>

#### SavingsAccountTierConfiguration

<details>
<summary>listSavingsAccountTierConfigurations</summary>

<div>

Queries the SavingsAccountTierConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSavingsAccountTierConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listSavingsAccountTierConfigurations();
```

</div>
</details>

<details>
<summary>getSavingsAccountTierConfiguration</summary>

<div>

Retrieves a single SavingsAccountTierConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `SavingsAccountBenefitDetails_externalCode` | <code>int</code> | Yes | key: SavingsAccountBenefitDetails_externalCode |
| `SavingsAccountUSA_externalCode` | <code>int</code> | Yes | key: SavingsAccountUSA_externalCode |
| `coverageTier` | <code>string</code> | Yes | key: coverageTier |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSavingsAccountTierConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getSavingsAccountTierConfiguration(Benefit_benefitId, Benefit_effectiveStartDate, SavingsAccountBenefitDetails_externalCode, SavingsAccountUSA_externalCode, coverageTier);
```

</div>
</details>

#### SavingsAccountUSA

<details>
<summary>listSavingsAccountUSAs</summary>

<div>

Queries the SavingsAccountUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSavingsAccountUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listSavingsAccountUSAs();
```

</div>
</details>

<details>
<summary>getSavingsAccountUSA</summary>

<div>

Retrieves a single SavingsAccountUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `SavingsAccountBenefitDetails_externalCode` | <code>int</code> | Yes | key: SavingsAccountBenefitDetails_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSavingsAccountUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getSavingsAccountUSA(Benefit_benefitId, Benefit_effectiveStartDate, SavingsAccountBenefitDetails_externalCode, externalCode);
```

</div>
</details>

#### BenefitCompanyHousingEnrollment

<details>
<summary>listBenefitCompanyHousingEnrollments</summary>

<div>

Queries the BenefitCompanyHousingEnrollment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitCompanyHousingEnrollmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_76&#124;error`

**Sample code:**

```ballerina
Wrapper_76 result = check client->listBenefitCompanyHousingEnrollments();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "BenefitEnrollment_effectiveStartDate": "2026-01-01",
        "BenefitEnrollment_id": "1000",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitCompanyHousingEnrollment</summary>

<div>

Retrieves a single BenefitCompanyHousingEnrollment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>int</code> | Yes | key: BenefitEnrollment_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitCompanyHousingEnrollmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitCompanyHousingEnrollment&#124;error`

**Sample code:**

```ballerina
BenefitCompanyHousingEnrollment result = check client->getBenefitCompanyHousingEnrollment(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, id);
```

**Sample response:**

```json
{
  "BenefitEnrollment_effectiveStartDate": "2026-01-01",
  "BenefitEnrollment_id": "1000",
  "id": "1000"
}
```

</div>
</details>

#### BenefitPensionEmployeeContributionDetail

<details>
<summary>listBenefitPensionEmployeeContributionDetails</summary>

<div>

Queries the BenefitPensionEmployeeContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionEmployeeContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_77&#124;error`

**Sample code:**

```ballerina
Wrapper_77 result = check client->listBenefitPensionEmployeeContributionDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitPensionEmployeeContributionDetail</summary>

<div>

Retrieves a single BenefitPensionEmployeeContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionEmployeeContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionEmployeeContributionDetail&#124;error`

**Sample code:**

```ballerina
BenefitPensionEmployeeContributionDetail result = check client->getBenefitPensionEmployeeContributionDetail(Benefit_benefitId, Benefit_effectiveStartDate, id);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "id": "1000"
}
```

</div>
</details>

#### BenefitInsuranceRateChartEnrollee

<details>
<summary>listBenefitInsuranceRateChartEnrollees</summary>

<div>

Queries the BenefitInsuranceRateChartEnrollee collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitInsuranceRateChartEnrolleesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitInsuranceRateChartEnrollees();
```

</div>
</details>

<details>
<summary>getBenefitInsuranceRateChartEnrollee</summary>

<div>

Retrieves a single BenefitInsuranceRateChartEnrollee entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitInsuranceRateChart_effectiveStartDate` | <code>string</code> | Yes | key: BenefitInsuranceRateChart_effectiveStartDate |
| `BenefitInsuranceRateChart_rateChartId` | <code>string</code> | Yes | key: BenefitInsuranceRateChart_rateChartId |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitInsuranceRateChartEnrolleeQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitInsuranceRateChartEnrollee(BenefitInsuranceRateChart_effectiveStartDate, BenefitInsuranceRateChart_rateChartId, externalCode);
```

</div>
</details>

#### BenefitDeductibleAllowanceEnrollment

<details>
<summary>listBenefitDeductibleAllowanceEnrollments</summary>

<div>

Queries the BenefitDeductibleAllowanceEnrollment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitDeductibleAllowanceEnrollmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_79&#124;error`

**Sample code:**

```ballerina
Wrapper_79 result = check client->listBenefitDeductibleAllowanceEnrollments();
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
<summary>getBenefitDeductibleAllowanceEnrollment</summary>

<div>

Retrieves a single BenefitDeductibleAllowanceEnrollment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>string</code> | Yes | key: BenefitEnrollment_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitDeductibleAllowanceEnrollmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitDeductibleAllowanceEnrollment&#124;error`

**Sample code:**

```ballerina
BenefitDeductibleAllowanceEnrollment result = check client->getBenefitDeductibleAllowanceEnrollment(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitSavingsPlanTierConfiguration

<details>
<summary>listBenefitSavingsPlanTierConfigurations</summary>

<div>

Queries the BenefitSavingsPlanTierConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanTierConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitSavingsPlanTierConfigurations();
```

</div>
</details>

<details>
<summary>getBenefitSavingsPlanTierConfiguration</summary>

<div>

Retrieves a single BenefitSavingsPlanTierConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `coverageTier` | <code>string</code> | Yes | key: coverageTier |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanTierConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitSavingsPlanTierConfiguration(Benefit_benefitId, Benefit_effectiveStartDate, coverageTier);
```

</div>
</details>

#### BenefitSavingsPlanERContributionConfig

<details>
<summary>listBenefitSavingsPlanERContributionConfigs</summary>

<div>

Queries the BenefitSavingsPlanERContributionConfig collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanERContributionConfigsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_81&#124;error`

**Sample code:**

```ballerina
Wrapper_81 result = check client->listBenefitSavingsPlanERContributionConfigs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "employerContributionId": "1000",
        "employerContributionDetail": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSavingsPlanERContributionConfig</summary>

<div>

Retrieves a single BenefitSavingsPlanERContributionConfig entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `employerContributionId` | <code>string</code> | Yes | key: employerContributionId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanERContributionConfigQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanERContributionConfig&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanERContributionConfig result = check client->getBenefitSavingsPlanERContributionConfig(effectiveStartDate, employerContributionId);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "employerContributionId": "1000",
  "employerContributionDetail": {
    "results": [
      {
        "BenefitSavingsPlanERContributionConfig_effectiveStartDate": "2026-01-01",
        "BenefitSavingsPlanERContributionConfig_employerContributionId": "1000",
        "employerContributionDetailId": "1000"
      }
    ]
  }
}
```

</div>
</details>

#### BenefitSavingsPlanERContributionConfigDetail

<details>
<summary>listBenefitSavingsPlanERContributionConfigDetails</summary>

<div>

Queries the BenefitSavingsPlanERContributionConfigDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanERContributionConfigDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_82&#124;error`

**Sample code:**

```ballerina
Wrapper_82 result = check client->listBenefitSavingsPlanERContributionConfigDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "BenefitSavingsPlanERContributionConfig_effectiveStartDate": "2026-01-01",
        "BenefitSavingsPlanERContributionConfig_employerContributionId": "1000",
        "employerContributionDetailId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSavingsPlanERContributionConfigDetail</summary>

<div>

Retrieves a single BenefitSavingsPlanERContributionConfigDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitSavingsPlanERContributionConfig_effectiveStartDate` | <code>string</code> | Yes | key: BenefitSavingsPlanERContributionConfig_effectiveStartDate |
| `BenefitSavingsPlanERContributionConfig_employerContributionId` | <code>string</code> | Yes | key: BenefitSavingsPlanERContributionConfig_employerContributionId |
| `employerContributionDetailId` | <code>int</code> | Yes | key: employerContributionDetailId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanERContributionConfigDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanERContributionConfigDetail&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanERContributionConfigDetail result = check client->getBenefitSavingsPlanERContributionConfigDetail(BenefitSavingsPlanERContributionConfig_effectiveStartDate, BenefitSavingsPlanERContributionConfig_employerContributionId, employerContributionDetailId);
```

**Sample response:**

```json
{
  "BenefitSavingsPlanERContributionConfig_effectiveStartDate": "2026-01-01",
  "BenefitSavingsPlanERContributionConfig_employerContributionId": "1000",
  "employerContributionDetailId": "1000"
}
```

</div>
</details>

#### BenefitSavingsPlanCatchUpDetail

<details>
<summary>listBenefitSavingsPlanCatchUpDetails</summary>

<div>

Queries the BenefitSavingsPlanCatchUpDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanCatchUpDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_83&#124;error`

**Sample code:**

```ballerina
Wrapper_83 result = check client->listBenefitSavingsPlanCatchUpDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "catchUpDetailCode": "1000",
        "effectiveStartDate": "2026-01-01"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitSavingsPlanCatchUpDetail</summary>

<div>

Retrieves a single BenefitSavingsPlanCatchUpDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `catchUpDetailCode` | <code>string</code> | Yes | key: catchUpDetailCode |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanCatchUpDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanCatchUpDetail&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanCatchUpDetail result = check client->getBenefitSavingsPlanCatchUpDetail(catchUpDetailCode, effectiveStartDate);
```

**Sample response:**

```json
{
  "catchUpDetailCode": "1000",
  "effectiveStartDate": "2026-01-01"
}
```

</div>
</details>

#### BenefitsIntegrationOneTimeInfo

<details>
<summary>listBenefitsIntegrationOneTimeInfos</summary>

<div>

Queries the BenefitsIntegrationOneTimeInfo collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitsIntegrationOneTimeInfosQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitsIntegrationOneTimeInfos();
```

</div>
</details>

<details>
<summary>getBenefitsIntegrationOneTimeInfo</summary>

<div>

Retrieves a single BenefitsIntegrationOneTimeInfo entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitsIntegrationOneTimeInfoQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitsIntegrationOneTimeInfo(id);
```

</div>
</details>

#### BenefitEnrollmentDependencyDetails

<details>
<summary>listBenefitEnrollmentDependencyDetails</summary>

<div>

Queries the BenefitEnrollmentDependencyDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEnrollmentDependencyDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEnrollmentDependencyDetails();
```

</div>
</details>

<details>
<summary>getBenefitEnrollmentDependencyDetails</summary>

<div>

Retrieves a single BenefitEnrollmentDependencyDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollmentDependencyConfiguration_benefitDependencyId` | <code>string</code> | Yes | key: BenefitEnrollmentDependencyConfiguration_benefitDependencyId |
| `BenefitEnrollmentDependencyConfiguration_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollmentDependencyConfiguration_effectiveStartDate |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEnrollmentDependencyDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEnrollmentDependencyDetails(BenefitEnrollmentDependencyConfiguration_benefitDependencyId, BenefitEnrollmentDependencyConfiguration_effectiveStartDate, externalCode);
```

</div>
</details>

<details>
<summary>deleteBenefitEnrollmentDependencyDetails</summary>

<div>

Deletes the BenefitEnrollmentDependencyDetails identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollmentDependencyConfiguration_benefitDependencyId` | <code>string</code> | Yes | key: BenefitEnrollmentDependencyConfiguration_benefitDependencyId |
| `BenefitEnrollmentDependencyConfiguration_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollmentDependencyConfiguration_effectiveStartDate |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteBenefitEnrollmentDependencyDetailsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBenefitEnrollmentDependencyDetails(BenefitEnrollmentDependencyConfiguration_benefitDependencyId, BenefitEnrollmentDependencyConfiguration_effectiveStartDate, externalCode);
```

</div>
</details>

#### BenefitEnrollmentDependencyConfiguration

<details>
<summary>listBenefitEnrollmentDependencyConfigurations</summary>

<div>

Queries the BenefitEnrollmentDependencyConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEnrollmentDependencyConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEnrollmentDependencyConfigurations();
```

</div>
</details>

<details>
<summary>getBenefitEnrollmentDependencyConfiguration</summary>

<div>

Retrieves a single BenefitEnrollmentDependencyConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `benefitDependencyId` | <code>string</code> | Yes | key: benefitDependencyId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEnrollmentDependencyConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEnrollmentDependencyConfiguration(benefitDependencyId, effectiveStartDate);
```

</div>
</details>

<details>
<summary>deleteBenefitEnrollmentDependencyConfiguration</summary>

<div>

Deletes the BenefitEnrollmentDependencyConfiguration identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `benefitDependencyId` | <code>string</code> | Yes | key: benefitDependencyId |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>DeleteBenefitEnrollmentDependencyConfigurationHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBenefitEnrollmentDependencyConfiguration(benefitDependencyId, effectiveStartDate);
```

</div>
</details>

#### BenefitSavingsPlanPrimaryBeneficiary

<details>
<summary>listBenefitSavingsPlanPrimaryBeneficiarys</summary>

<div>

Queries the BenefitSavingsPlanPrimaryBeneficiary collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanPrimaryBeneficiarysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_87&#124;error`

**Sample code:**

```ballerina
Wrapper_87 result = check client->listBenefitSavingsPlanPrimaryBeneficiarys();
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
<summary>getBenefitSavingsPlanPrimaryBeneficiary</summary>

<div>

Retrieves a single BenefitSavingsPlanPrimaryBeneficiary entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>string</code> | Yes | key: BenefitEnrollment_id |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanPrimaryBeneficiaryQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanPrimaryBeneficiary&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanPrimaryBeneficiary result = check client->getBenefitSavingsPlanPrimaryBeneficiary(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitSavingsPlanContingentBeneficiary

<details>
<summary>listBenefitSavingsPlanContingentBeneficiarys</summary>

<div>

Queries the BenefitSavingsPlanContingentBeneficiary collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanContingentBeneficiarysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_88&#124;error`

**Sample code:**

```ballerina
Wrapper_88 result = check client->listBenefitSavingsPlanContingentBeneficiarys();
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
<summary>getBenefitSavingsPlanContingentBeneficiary</summary>

<div>

Retrieves a single BenefitSavingsPlanContingentBeneficiary entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>string</code> | Yes | key: BenefitEnrollment_id |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanContingentBeneficiaryQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanContingentBeneficiary&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanContingentBeneficiary result = check client->getBenefitSavingsPlanContingentBeneficiary(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitHyperlinkConfiguration

<details>
<summary>listBenefitHyperlinkConfigurations</summary>

<div>

Queries the BenefitHyperlinkConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitHyperlinkConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_89&#124;error`

**Sample code:**

```ballerina
Wrapper_89 result = check client->listBenefitHyperlinkConfigurations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Benefit_benefitId": "1000",
        "Benefit_effectiveStartDate": "2026-01-01",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitHyperlinkConfiguration</summary>

<div>

Retrieves a single BenefitHyperlinkConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitHyperlinkConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitHyperlinkConfiguration&#124;error`

**Sample code:**

```ballerina
BenefitHyperlinkConfiguration result = check client->getBenefitHyperlinkConfiguration(Benefit_benefitId, Benefit_effectiveStartDate, id);
```

**Sample response:**

```json
{
  "Benefit_benefitId": "1000",
  "Benefit_effectiveStartDate": "2026-01-01",
  "id": "1000"
}
```

</div>
</details>

#### BenefitOverviewHyperlinkConfiguration

<details>
<summary>listBenefitOverviewHyperlinkConfigurations</summary>

<div>

Queries the BenefitOverviewHyperlinkConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitOverviewHyperlinkConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_90&#124;error`

**Sample code:**

```ballerina
Wrapper_90 result = check client->listBenefitOverviewHyperlinkConfigurations();
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
<summary>getBenefitOverviewHyperlinkConfiguration</summary>

<div>

Retrieves a single BenefitOverviewHyperlinkConfiguration entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `hyperlinkConfigurationId` | <code>string</code> | Yes | key: hyperlinkConfigurationId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitOverviewHyperlinkConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitOverviewHyperlinkConfiguration&#124;error`

**Sample code:**

```ballerina
BenefitOverviewHyperlinkConfiguration result = check client->getBenefitOverviewHyperlinkConfiguration(hyperlinkConfigurationId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitOverviewHyperlinkDetails

<details>
<summary>listBenefitOverviewHyperlinkDetails</summary>

<div>

Queries the BenefitOverviewHyperlinkDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitOverviewHyperlinkDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_91&#124;error`

**Sample code:**

```ballerina
Wrapper_91 result = check client->listBenefitOverviewHyperlinkDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "BenefitOverviewHyperlinkConfiguration_hyperlinkConfigurationId": "1000",
        "id": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBenefitOverviewHyperlinkDetails</summary>

<div>

Retrieves a single BenefitOverviewHyperlinkDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitOverviewHyperlinkConfiguration_hyperlinkConfigurationId` | <code>string</code> | Yes | key: BenefitOverviewHyperlinkConfiguration_hyperlinkConfigurationId |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitOverviewHyperlinkDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitOverviewHyperlinkDetails&#124;error`

**Sample code:**

```ballerina
BenefitOverviewHyperlinkDetails result = check client->getBenefitOverviewHyperlinkDetails(BenefitOverviewHyperlinkConfiguration_hyperlinkConfigurationId, id);
```

**Sample response:**

```json
{
  "BenefitOverviewHyperlinkConfiguration_hyperlinkConfigurationId": "1000",
  "id": "1000"
}
```

</div>
</details>

#### BenefitEmployeeOptoutRequests

<details>
<summary>listBenefitEmployeeOptoutRequestss</summary>

<div>

Queries the BenefitEmployeeOptoutRequests collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEmployeeOptoutRequestssQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEmployeeOptoutRequestss();
```

</div>
</details>

<details>
<summary>getBenefitEmployeeOptoutRequests</summary>

<div>

Retrieves a single BenefitEmployeeOptoutRequests entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `workerId` | <code>string</code> | Yes | key: workerId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEmployeeOptoutRequestsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEmployeeOptoutRequests(workerId);
```

</div>
</details>

#### BenefitEnrollmentOptoutDetails

<details>
<summary>listBenefitEnrollmentOptoutDetails</summary>

<div>

Queries the BenefitEnrollmentOptoutDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitEnrollmentOptoutDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitEnrollmentOptoutDetails();
```

</div>
</details>

<details>
<summary>getBenefitEnrollmentOptoutDetails</summary>

<div>

Retrieves a single BenefitEnrollmentOptoutDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEmployeeOptoutRequests_workerId` | <code>string</code> | Yes | key: BenefitEmployeeOptoutRequests_workerId |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitEnrollmentOptoutDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitEnrollmentOptoutDetails(BenefitEmployeeOptoutRequests_workerId, id);
```

</div>
</details>

#### BenefitHSAEmployerContribution

<details>
<summary>listBenefitHSAEmployerContributions</summary>

<div>

Queries the BenefitHSAEmployerContribution collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitHSAEmployerContributionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitHSAEmployerContributions();
```

</div>
</details>

<details>
<summary>getBenefitHSAEmployerContribution</summary>

<div>

Retrieves a single BenefitHSAEmployerContribution entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitHSAEmployerContributionQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitHSAEmployerContribution(effectiveStartDate, externalCode);
```

</div>
</details>

#### BenefitHSAEmployerContributionDetail

<details>
<summary>listBenefitHSAEmployerContributionDetails</summary>

<div>

Queries the BenefitHSAEmployerContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitHSAEmployerContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitHSAEmployerContributionDetails();
```

</div>
</details>

<details>
<summary>getBenefitHSAEmployerContributionDetail</summary>

<div>

Retrieves a single BenefitHSAEmployerContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitHSAEmployerContribution_effectiveStartDate` | <code>string</code> | Yes | key: BenefitHSAEmployerContribution_effectiveStartDate |
| `BenefitHSAEmployerContribution_externalCode` | <code>string</code> | Yes | key: BenefitHSAEmployerContribution_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitHSAEmployerContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitHSAEmployerContributionDetail(BenefitHSAEmployerContribution_effectiveStartDate, BenefitHSAEmployerContribution_externalCode, externalCode);
```

</div>
</details>

#### BenefitHSAEmployerContributionTierDetail

<details>
<summary>listBenefitHSAEmployerContributionTierDetails</summary>

<div>

Queries the BenefitHSAEmployerContributionTierDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitHSAEmployerContributionTierDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitHSAEmployerContributionTierDetails();
```

</div>
</details>

<details>
<summary>getBenefitHSAEmployerContributionTierDetail</summary>

<div>

Retrieves a single BenefitHSAEmployerContributionTierDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitHSAEmployerContributionDetail_externalCode` | <code>int</code> | Yes | key: BenefitHSAEmployerContributionDetail_externalCode |
| `BenefitHSAEmployerContribution_effectiveStartDate` | <code>string</code> | Yes | key: BenefitHSAEmployerContribution_effectiveStartDate |
| `BenefitHSAEmployerContribution_externalCode` | <code>string</code> | Yes | key: BenefitHSAEmployerContribution_externalCode |
| `coverageTier` | <code>string</code> | Yes | key: coverageTier |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitHSAEmployerContributionTierDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitHSAEmployerContributionTierDetail(BenefitHSAEmployerContributionDetail_externalCode, BenefitHSAEmployerContribution_effectiveStartDate, BenefitHSAEmployerContribution_externalCode, coverageTier);
```

</div>
</details>

#### BenefitAutomaticActionConfiguration

<details>
<summary>listBenefitAutomaticActionConfigurations</summary>

<div>

Queries the BenefitAutomaticActionConfiguration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitAutomaticActionConfigurationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitAutomaticActionConfigurations();
```

</div>
</details>

<details>
<summary>getBenefitAutomaticActionConfiguration</summary>

<div>

Retrieves a single BenefitAutomaticActionConfiguration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitLifeEventConfiguration_configurationId` | <code>string</code> | Yes | key: BenefitLifeEventConfiguration_configurationId |
| `BenefitLifeEventConfiguration_effectiveStartDate` | <code>string</code> | Yes | key: BenefitLifeEventConfiguration_effectiveStartDate |
| `id` | <code>string</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitAutomaticActionConfigurationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitAutomaticActionConfiguration(BenefitLifeEventConfiguration_configurationId, BenefitLifeEventConfiguration_effectiveStartDate, id);
```

</div>
</details>

#### BenefitPensionAdditionalEmployeeContributionDetail

<details>
<summary>listBenefitPensionAdditionalEmployeeContributionDetails</summary>

<div>

Queries the BenefitPensionAdditionalEmployeeContributionDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitPensionAdditionalEmployeeContributionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_98&#124;error`

**Sample code:**

```ballerina
Wrapper_98 result = check client->listBenefitPensionAdditionalEmployeeContributionDetails();
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
<summary>getBenefitPensionAdditionalEmployeeContributionDetail</summary>

<div>

Retrieves a single BenefitPensionAdditionalEmployeeContributionDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `avcContributionId` | <code>int</code> | Yes | key: avcContributionId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitPensionAdditionalEmployeeContributionDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitPensionAdditionalEmployeeContributionDetail&#124;error`

**Sample code:**

```ballerina
BenefitPensionAdditionalEmployeeContributionDetail result = check client->getBenefitPensionAdditionalEmployeeContributionDetail(Benefit_benefitId, Benefit_effectiveStartDate, avcContributionId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BenefitsIntegrationRecurringInfo

<details>
<summary>listBenefitsIntegrationRecurringInfos</summary>

<div>

Queries the BenefitsIntegrationRecurringInfo collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitsIntegrationRecurringInfosQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listBenefitsIntegrationRecurringInfos();
```

</div>
</details>

<details>
<summary>getBenefitsIntegrationRecurringInfo</summary>

<div>

Retrieves a single BenefitsIntegrationRecurringInfo entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | key: id |
| `payCompBeginDate` | <code>string</code> | Yes | key: payCompBeginDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitsIntegrationRecurringInfoQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getBenefitsIntegrationRecurringInfo(id, payCompBeginDate);
```

</div>
</details>

#### BenefitSavingsPlanEnrollmentDetails

<details>
<summary>listBenefitSavingsPlanEnrollmentDetails</summary>

<div>

Queries the BenefitSavingsPlanEnrollmentDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitSavingsPlanEnrollmentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_100&#124;error`

**Sample code:**

```ballerina
Wrapper_100 result = check client->listBenefitSavingsPlanEnrollmentDetails();
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
<summary>getBenefitSavingsPlanEnrollmentDetails</summary>

<div>

Retrieves a single BenefitSavingsPlanEnrollmentDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `BenefitEnrollment_effectiveStartDate` | <code>string</code> | Yes | key: BenefitEnrollment_effectiveStartDate |
| `BenefitEnrollment_id` | <code>string</code> | Yes | key: BenefitEnrollment_id |
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitSavingsPlanEnrollmentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitSavingsPlanEnrollmentDetails&#124;error`

**Sample code:**

```ballerina
BenefitSavingsPlanEnrollmentDetails result = check client->getBenefitSavingsPlanEnrollmentDetails(BenefitEnrollment_effectiveStartDate, BenefitEnrollment_id, id);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### ACAReportingDependentDetails

<details>
<summary>listACAReportingDependentDetails</summary>

<div>

Queries the ACAReportingDependentDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListACAReportingDependentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_101&#124;error`

**Sample code:**

```ballerina
Wrapper_101 result = check client->listACAReportingDependentDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "ACAReportingInformation_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getACAReportingDependentDetails</summary>

<div>

Retrieves a single ACAReportingDependentDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ACAReportingInformation_externalCode` | <code>string</code> | Yes | key: ACAReportingInformation_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetACAReportingDependentDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ACAReportingDependentDetails&#124;error`

**Sample code:**

```ballerina
ACAReportingDependentDetails result = check client->getACAReportingDependentDetails(ACAReportingInformation_externalCode, externalCode);
```

**Sample response:**

```json
{
  "ACAReportingInformation_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

#### BenefitDeductionDetails

<details>
<summary>listBenefitDeductionDetails</summary>

<div>

Queries the BenefitDeductionDetails collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBenefitDeductionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_102&#124;error`

**Sample code:**

```ballerina
Wrapper_102 result = check client->listBenefitDeductionDetails();
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
<summary>getBenefitDeductionDetails</summary>

<div>

Retrieves a single BenefitDeductionDetails entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Benefit_benefitId` | <code>string</code> | Yes | key: Benefit_benefitId |
| `Benefit_effectiveStartDate` | <code>string</code> | Yes | key: Benefit_effectiveStartDate |
| `dedcutionDetailId` | <code>int</code> | Yes | key: dedcutionDetailId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBenefitDeductionDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BenefitDeductionDetails&#124;error`

**Sample code:**

```ballerina
BenefitDeductionDetails result = check client->getBenefitDeductionDetails(Benefit_benefitId, Benefit_effectiveStartDate, dedcutionDetailId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

