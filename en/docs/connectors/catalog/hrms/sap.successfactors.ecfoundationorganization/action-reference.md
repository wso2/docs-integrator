---
connector: true
connector_name: "sap.successfactors.ecfoundationorganization"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecfoundationorganization` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecfoundationorganization objects — FOLegalEntityLocalUSA, FODepartment, FOJobClassLocalCAN, Territory, JobClassificationCountry, FOJobFunction, FODynamicRole, FOFrequency… — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access Foundation Objects that contain data on organization, job structure and pay.

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
import ballerinax/sap.successfactors.ecfoundationorganization;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecfoundationorganization:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### FOLegalEntityLocalUSA

<details>
<summary>listFOLegalEntityLocalUSAs</summary>

<div>

Queries the FOLegalEntityLocalUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLegalEntityLocalUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listFOLegalEntityLocalUSAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOLegalEntityLocalUSA</summary>

<div>

Retrieves a single FOLegalEntityLocalUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLegalEntityLocalUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLegalEntityLocalUSA&#124;error`

**Sample code:**

```ballerina
FOLegalEntityLocalUSA result = check client->getFOLegalEntityLocalUSA(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FODepartment

<details>
<summary>listFODepartments</summary>

<div>

Queries the FODepartment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFODepartmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFODepartments();
```

</div>
</details>

<details>
<summary>getFODepartment</summary>

<div>

Retrieves a single FODepartment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFODepartmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFODepartment(externalCode, startDate);
```

</div>
</details>

<details>
<summary>deleteFODepartment</summary>

<div>

Deletes the FODepartment identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFODepartmentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFODepartment(externalCode, startDate);
```

</div>
</details>

#### FOJobClassLocalCAN

<details>
<summary>listFOJobClassLocalCANs</summary>

<div>

Queries the FOJobClassLocalCAN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalCANsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listFOJobClassLocalCANs();
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
<summary>getFOJobClassLocalCAN</summary>

<div>

Retrieves a single FOJobClassLocalCAN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalCANQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalCAN&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalCAN result = check client->getFOJobClassLocalCAN(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### Territory

<details>
<summary>listTerritorys</summary>

<div>

Queries the Territory collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTerritorysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listTerritorys();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "territoryCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getTerritory</summary>

<div>

Retrieves a single Territory entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `territoryCode` | <code>string</code> | Yes | key: territoryCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTerritoryQueries</code> | No | Queries to be sent with the request |

**Returns:** `Territory&#124;error`

**Sample code:**

```ballerina
Territory result = check client->getTerritory(territoryCode);
```

**Sample response:**

```json
{
  "territoryCode": "1000"
}
```

</div>
</details>

#### JobClassificationCountry

<details>
<summary>listJobClassificationCountrys</summary>

<div>

Queries the JobClassificationCountry collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationCountrysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listJobClassificationCountrys();
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
<summary>createJobClassificationCountry</summary>

<div>

Creates a new JobClassificationCountry entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationCountry</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationCountry&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationCountry result = check client->createJobClassificationCountry(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationCountry</summary>

<div>

Retrieves a single JobClassificationCountry entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `country` | <code>string</code> | Yes | key: country |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationCountryQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationCountry&#124;error`

**Sample code:**

```ballerina
JobClassificationCountry result = check client->getJobClassificationCountry(JobClassification_effectiveStartDate, JobClassification_externalCode, country);
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
<summary>updateJobClassificationCountry</summary>

<div>

Updates the JobClassificationCountry identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `country` | <code>string</code> | Yes | key: country |
| `payload` | <code>ModifiedJobClassificationCountry</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationCountry(JobClassification_effectiveStartDate, JobClassification_externalCode, country, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationCountry</summary>

<div>

Deletes the JobClassificationCountry identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `country` | <code>string</code> | Yes | key: country |
| `headers` | <code>DeleteJobClassificationCountryHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationCountry(JobClassification_effectiveStartDate, JobClassification_externalCode, country);
```

</div>
</details>

#### FOJobFunction

<details>
<summary>listFOJobFunctions</summary>

<div>

Queries the FOJobFunction collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobFunctionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listFOJobFunctions();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "descriptionTranslationNav": {},
        "nameTranslationNav": {},
        "parentFunctionCodeNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createFOJobFunction</summary>

<div>

Creates a new FOJobFunction entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FOJobFunction</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedFOJobFunction&#124;error`

**Sample code:**

```ballerina
CreatedFOJobFunction result = check client->createFOJobFunction(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "startDate": "2026-01-01",
    "descriptionTranslationNav": {
      "externalCode": "1000"
    },
    "nameTranslationNav": {
      "externalCode": "1000"
    },
    "parentFunctionCodeNav": {}
  }
}
```

</div>
</details>

<details>
<summary>getFOJobFunction</summary>

<div>

Retrieves a single FOJobFunction entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobFunctionQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobFunction&#124;error`

**Sample code:**

```ballerina
FOJobFunction result = check client->getFOJobFunction(externalCode, startDate);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "descriptionTranslationNav": {
    "externalCode": "1000"
  },
  "nameTranslationNav": {
    "externalCode": "1000"
  },
  "parentFunctionCodeNav": {}
}
```

</div>
</details>

<details>
<summary>updateFOJobFunction</summary>

<div>

Updates the FOJobFunction identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `payload` | <code>ModifiedFOJobFunction</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFOJobFunction(externalCode, startDate, payload);
```

</div>
</details>

<details>
<summary>deleteFOJobFunction</summary>

<div>

Deletes the FOJobFunction identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFOJobFunctionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFOJobFunction(externalCode, startDate);
```

</div>
</details>

#### FODynamicRole

<details>
<summary>listFODynamicRoles</summary>

<div>

Queries the FODynamicRole collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFODynamicRolesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFODynamicRoles();
```

</div>
</details>

<details>
<summary>getFODynamicRole</summary>

<div>

Retrieves a single FODynamicRole entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dynamicRoleAssignmentId` | <code>string</code> | Yes | key: dynamicRoleAssignmentId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFODynamicRoleQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFODynamicRole(dynamicRoleAssignmentId);
```

</div>
</details>

#### FOFrequency

<details>
<summary>listFOFrequencys</summary>

<div>

Queries the FOFrequency collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOFrequencysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listFOFrequencys();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "descriptionTranslationNav": {},
        "nameTranslationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOFrequency</summary>

<div>

Retrieves a single FOFrequency entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOFrequencyQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOFrequency&#124;error`

**Sample code:**

```ballerina
FOFrequency result = check client->getFOFrequency(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "descriptionTranslationNav": {
    "externalCode": "1000"
  },
  "nameTranslationNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### LegalEntityFRA

<details>
<summary>listLegalEntityFRAs</summary>

<div>

Queries the LegalEntityFRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityFRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listLegalEntityFRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "LegalEntity_effectiveStartDate": "2026-01-01",
        "LegalEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createLegalEntityFRA</summary>

<div>

Creates a new LegalEntityFRA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityFRA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityFRA&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityFRA result = check client->createLegalEntityFRA(payload);
```

**Sample response:**

```json
{
  "d": {
    "LegalEntity_effectiveStartDate": "2026-01-01",
    "LegalEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityFRA</summary>

<div>

Retrieves a single LegalEntityFRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityFRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityFRA&#124;error`

**Sample code:**

```ballerina
LegalEntityFRA result = check client->getLegalEntityFRA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "LegalEntity_effectiveStartDate": "2026-01-01",
  "LegalEntity_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateLegalEntityFRA</summary>

<div>

Updates the LegalEntityFRA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityFRA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityFRA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityFRA</summary>

<div>

Deletes the LegalEntityFRA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityFRAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityFRA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### FOPayGrade

<details>
<summary>listFOPayGrades</summary>

<div>

Queries the FOPayGrade collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOPayGradesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listFOPayGrades();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "descriptionTranslationNav": {},
        "nameTranslationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOPayGrade</summary>

<div>

Retrieves a single FOPayGrade entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOPayGradeQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOPayGrade&#124;error`

**Sample code:**

```ballerina
FOPayGrade result = check client->getFOPayGrade(externalCode, startDate);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "descriptionTranslationNav": {
    "externalCode": "1000"
  },
  "nameTranslationNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### FOJobClassLocalAUS

<details>
<summary>listFOJobClassLocalAUSs</summary>

<div>

Queries the FOJobClassLocalAUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalAUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listFOJobClassLocalAUSs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOJobClassLocalAUS</summary>

<div>

Retrieves a single FOJobClassLocalAUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalAUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalAUS&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalAUS result = check client->getFOJobClassLocalAUS(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FOPayRange

<details>
<summary>listFOPayRanges</summary>

<div>

Queries the FOPayRange collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOPayRangesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOPayRanges();
```

</div>
</details>

<details>
<summary>getFOPayRange</summary>

<div>

Retrieves a single FOPayRange entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOPayRangeQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOPayRange(externalCode, startDate);
```

</div>
</details>

#### FOJobClassLocalITA

<details>
<summary>listFOJobClassLocalITAs</summary>

<div>

Queries the FOJobClassLocalITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listFOJobClassLocalITAs();
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
<summary>getFOJobClassLocalITA</summary>

<div>

Retrieves a single FOJobClassLocalITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalITA&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalITA result = check client->getFOJobClassLocalITA(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### JobClassificationBRA

<details>
<summary>listJobClassificationBRAs</summary>

<div>

Queries the JobClassificationBRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationBRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listJobClassificationBRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobClassificationCountry_country": "string",
        "JobClassification_effectiveStartDate": "2026-01-01",
        "JobClassification_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobClassificationBRA</summary>

<div>

Creates a new JobClassificationBRA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationBRA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationBRA&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationBRA result = check client->createJobClassificationBRA(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobClassificationCountry_country": "string",
    "JobClassification_effectiveStartDate": "2026-01-01",
    "JobClassification_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationBRA</summary>

<div>

Retrieves a single JobClassificationBRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationBRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationBRA&#124;error`

**Sample code:**

```ballerina
JobClassificationBRA result = check client->getJobClassificationBRA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

**Sample response:**

```json
{
  "JobClassificationCountry_country": "string",
  "JobClassification_effectiveStartDate": "2026-01-01",
  "JobClassification_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateJobClassificationBRA</summary>

<div>

Updates the JobClassificationBRA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationBRA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationBRA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationBRA</summary>

<div>

Deletes the JobClassificationBRA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationBRAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationBRA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### JobClassificationZAF

<details>
<summary>listJobClassificationZAFs</summary>

<div>

Queries the JobClassificationZAF collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationZAFsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listJobClassificationZAFs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobClassificationCountry_country": "string",
        "JobClassification_effectiveStartDate": "2026-01-01",
        "JobClassification_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobClassificationZAF</summary>

<div>

Creates a new JobClassificationZAF entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationZAF</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationZAF&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationZAF result = check client->createJobClassificationZAF(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobClassificationCountry_country": "string",
    "JobClassification_effectiveStartDate": "2026-01-01",
    "JobClassification_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationZAF</summary>

<div>

Retrieves a single JobClassificationZAF entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationZAFQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationZAF&#124;error`

**Sample code:**

```ballerina
JobClassificationZAF result = check client->getJobClassificationZAF(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

**Sample response:**

```json
{
  "JobClassificationCountry_country": "string",
  "JobClassification_effectiveStartDate": "2026-01-01",
  "JobClassification_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateJobClassificationZAF</summary>

<div>

Updates the JobClassificationZAF identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationZAF</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationZAF(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationZAF</summary>

<div>

Deletes the JobClassificationZAF identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationZAFHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationZAF(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityDEU

<details>
<summary>listLegalEntityDEUs</summary>

<div>

Queries the LegalEntityDEU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityDEUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listLegalEntityDEUs();
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
<summary>createLegalEntityDEU</summary>

<div>

Creates a new LegalEntityDEU entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityDEU</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityDEU&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityDEU result = check client->createLegalEntityDEU(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityDEU</summary>

<div>

Retrieves a single LegalEntityDEU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityDEUQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityDEU&#124;error`

**Sample code:**

```ballerina
LegalEntityDEU result = check client->getLegalEntityDEU(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityDEU</summary>

<div>

Updates the LegalEntityDEU identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityDEU</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityDEU(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityDEU</summary>

<div>

Deletes the LegalEntityDEU identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityDEUHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityDEU(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### JobClassificationGBR

<details>
<summary>listJobClassificationGBRs</summary>

<div>

Queries the JobClassificationGBR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationGBRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listJobClassificationGBRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobClassificationCountry_country": "string",
        "JobClassification_effectiveStartDate": "2026-01-01",
        "JobClassification_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobClassificationGBR</summary>

<div>

Creates a new JobClassificationGBR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationGBR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationGBR&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationGBR result = check client->createJobClassificationGBR(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobClassificationCountry_country": "string",
    "JobClassification_effectiveStartDate": "2026-01-01",
    "JobClassification_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationGBR</summary>

<div>

Retrieves a single JobClassificationGBR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationGBRQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationGBR&#124;error`

**Sample code:**

```ballerina
JobClassificationGBR result = check client->getJobClassificationGBR(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

**Sample response:**

```json
{
  "JobClassificationCountry_country": "string",
  "JobClassification_effectiveStartDate": "2026-01-01",
  "JobClassification_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateJobClassificationGBR</summary>

<div>

Updates the JobClassificationGBR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationGBR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationGBR(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationGBR</summary>

<div>

Deletes the JobClassificationGBR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationGBRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationGBR(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### JobClassificationFRA

<details>
<summary>listJobClassificationFRAs</summary>

<div>

Queries the JobClassificationFRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationFRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listJobClassificationFRAs();
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
<summary>createJobClassificationFRA</summary>

<div>

Creates a new JobClassificationFRA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationFRA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationFRA&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationFRA result = check client->createJobClassificationFRA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationFRA</summary>

<div>

Retrieves a single JobClassificationFRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationFRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationFRA&#124;error`

**Sample code:**

```ballerina
JobClassificationFRA result = check client->getJobClassificationFRA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
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
<summary>updateJobClassificationFRA</summary>

<div>

Updates the JobClassificationFRA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationFRA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationFRA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationFRA</summary>

<div>

Deletes the JobClassificationFRA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationFRAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationFRA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### Periods

<details>
<summary>listPeriodss</summary>

<div>

Queries the Periods collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPeriodssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listPeriodss();
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
<summary>getPeriods</summary>

<div>

Retrieves a single Periods entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FiscalYearVariant_externalCode` | <code>string</code> | Yes | key: FiscalYearVariant_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPeriodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Periods&#124;error`

**Sample code:**

```ballerina
Periods result = check client->getPeriods(FiscalYearVariant_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### BudgetGroup

<details>
<summary>listBudgetGroups</summary>

<div>

Queries the BudgetGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBudgetGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listBudgetGroups();
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
<summary>createBudgetGroup</summary>

<div>

Creates a new BudgetGroup entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BudgetGroup</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBudgetGroup&#124;error`

**Sample code:**

```ballerina
CreatedBudgetGroup result = check client->createBudgetGroup(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getBudgetGroup</summary>

<div>

Retrieves a single BudgetGroup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBudgetGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `BudgetGroup&#124;error`

**Sample code:**

```ballerina
BudgetGroup result = check client->getBudgetGroup(effectiveStartDate, externalCode);
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
<summary>updateBudgetGroup</summary>

<div>

Updates the BudgetGroup identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedBudgetGroup</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBudgetGroup(effectiveStartDate, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteBudgetGroup</summary>

<div>

Deletes the BudgetGroup identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteBudgetGroupHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBudgetGroup(effectiveStartDate, externalCode);
```

</div>
</details>

#### FOLocation

<details>
<summary>listFOLocations</summary>

<div>

Queries the FOLocation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLocationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOLocations();
```

</div>
</details>

<details>
<summary>getFOLocation</summary>

<div>

Retrieves a single FOLocation entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLocationQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOLocation(externalCode, startDate);
```

</div>
</details>

#### JobClassificationAUS

<details>
<summary>listJobClassificationAUSs</summary>

<div>

Queries the JobClassificationAUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationAUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_21&#124;error`

**Sample code:**

```ballerina
Wrapper_21 result = check client->listJobClassificationAUSs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobClassificationCountry_country": "string",
        "JobClassification_effectiveStartDate": "2026-01-01",
        "JobClassification_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobClassificationAUS</summary>

<div>

Creates a new JobClassificationAUS entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationAUS</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationAUS&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationAUS result = check client->createJobClassificationAUS(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobClassificationCountry_country": "string",
    "JobClassification_effectiveStartDate": "2026-01-01",
    "JobClassification_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationAUS</summary>

<div>

Retrieves a single JobClassificationAUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationAUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationAUS&#124;error`

**Sample code:**

```ballerina
JobClassificationAUS result = check client->getJobClassificationAUS(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

**Sample response:**

```json
{
  "JobClassificationCountry_country": "string",
  "JobClassification_effectiveStartDate": "2026-01-01",
  "JobClassification_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateJobClassificationAUS</summary>

<div>

Updates the JobClassificationAUS identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationAUS</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationAUS(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationAUS</summary>

<div>

Deletes the JobClassificationAUS identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationAUSHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationAUS(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### PayScaleArea

<details>
<summary>listPayScaleAreas</summary>

<div>

Queries the PayScaleArea collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayScaleAreasQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listPayScaleAreas();
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
<summary>createPayScaleArea</summary>

<div>

Creates a new PayScaleArea entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PayScaleArea</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPayScaleArea&#124;error`

**Sample code:**

```ballerina
CreatedPayScaleArea result = check client->createPayScaleArea(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPayScaleArea</summary>

<div>

Retrieves a single PayScaleArea entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayScaleAreaQueries</code> | No | Queries to be sent with the request |

**Returns:** `PayScaleArea&#124;error`

**Sample code:**

```ballerina
PayScaleArea result = check client->getPayScaleArea(code);
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
<summary>updatePayScaleArea</summary>

<div>

Updates the PayScaleArea identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `payload` | <code>ModifiedPayScaleArea</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePayScaleArea(code, payload);
```

</div>
</details>

<details>
<summary>deletePayScaleArea</summary>

<div>

Deletes the PayScaleArea identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>DeletePayScaleAreaHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayScaleArea(code);
```

</div>
</details>

#### FOJobClassLocalUSA

<details>
<summary>listFOJobClassLocalUSAs</summary>

<div>

Queries the FOJobClassLocalUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_23&#124;error`

**Sample code:**

```ballerina
Wrapper_23 result = check client->listFOJobClassLocalUSAs();
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
<summary>getFOJobClassLocalUSA</summary>

<div>

Retrieves a single FOJobClassLocalUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalUSA&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalUSA result = check client->getFOJobClassLocalUSA(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### FOLegalEntityLocalFRA

<details>
<summary>listFOLegalEntityLocalFRAs</summary>

<div>

Queries the FOLegalEntityLocalFRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLegalEntityLocalFRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_24&#124;error`

**Sample code:**

```ballerina
Wrapper_24 result = check client->listFOLegalEntityLocalFRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOLegalEntityLocalFRA</summary>

<div>

Retrieves a single FOLegalEntityLocalFRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLegalEntityLocalFRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLegalEntityLocalFRA&#124;error`

**Sample code:**

```ballerina
FOLegalEntityLocalFRA result = check client->getFOLegalEntityLocalFRA(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FOJobClassLocalFRA

<details>
<summary>listFOJobClassLocalFRAs</summary>

<div>

Queries the FOJobClassLocalFRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalFRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listFOJobClassLocalFRAs();
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
<summary>getFOJobClassLocalFRA</summary>

<div>

Retrieves a single FOJobClassLocalFRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalFRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalFRA&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalFRA result = check client->getFOJobClassLocalFRA(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### FOLegalEntityLocalDEU

<details>
<summary>listFOLegalEntityLocalDEUs</summary>

<div>

Queries the FOLegalEntityLocalDEU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLegalEntityLocalDEUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listFOLegalEntityLocalDEUs();
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
<summary>getFOLegalEntityLocalDEU</summary>

<div>

Retrieves a single FOLegalEntityLocalDEU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLegalEntityLocalDEUQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLegalEntityLocalDEU&#124;error`

**Sample code:**

```ballerina
FOLegalEntityLocalDEU result = check client->getFOLegalEntityLocalDEU(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### JobClassificationITA

<details>
<summary>listJobClassificationITAs</summary>

<div>

Queries the JobClassificationITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_27&#124;error`

**Sample code:**

```ballerina
Wrapper_27 result = check client->listJobClassificationITAs();
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
<summary>createJobClassificationITA</summary>

<div>

Creates a new JobClassificationITA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationITA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationITA&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationITA result = check client->createJobClassificationITA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationITA</summary>

<div>

Retrieves a single JobClassificationITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationITA&#124;error`

**Sample code:**

```ballerina
JobClassificationITA result = check client->getJobClassificationITA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
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
<summary>updateJobClassificationITA</summary>

<div>

Updates the JobClassificationITA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationITA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationITA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationITA</summary>

<div>

Deletes the JobClassificationITA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationITAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationITA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityESP

<details>
<summary>listLegalEntityESPs</summary>

<div>

Queries the LegalEntityESP collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityESPsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_28&#124;error`

**Sample code:**

```ballerina
Wrapper_28 result = check client->listLegalEntityESPs();
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
<summary>createLegalEntityESP</summary>

<div>

Creates a new LegalEntityESP entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityESP</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityESP&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityESP result = check client->createLegalEntityESP(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityESP</summary>

<div>

Retrieves a single LegalEntityESP entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityESPQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityESP&#124;error`

**Sample code:**

```ballerina
LegalEntityESP result = check client->getLegalEntityESP(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityESP</summary>

<div>

Updates the LegalEntityESP identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityESP</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityESP(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityESP</summary>

<div>

Deletes the LegalEntityESP identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityESPHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityESP(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### FOJobClassLocalGBR

<details>
<summary>listFOJobClassLocalGBRs</summary>

<div>

Queries the FOJobClassLocalGBR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalGBRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_29&#124;error`

**Sample code:**

```ballerina
Wrapper_29 result = check client->listFOJobClassLocalGBRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOJobClassLocalGBR</summary>

<div>

Retrieves a single FOJobClassLocalGBR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalGBRQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalGBR&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalGBR result = check client->getFOJobClassLocalGBR(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FOCorporateAddressDEFLT

<details>
<summary>listFOCorporateAddressDEFLTs</summary>

<div>

Queries the FOCorporateAddressDEFLT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOCorporateAddressDEFLTsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_30&#124;error`

**Sample code:**

```ballerina
Wrapper_30 result = check client->listFOCorporateAddressDEFLTs();
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
<summary>getFOCorporateAddressDEFLT</summary>

<div>

Retrieves a single FOCorporateAddressDEFLT entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `addressId` | <code>string</code> | Yes | key: addressId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOCorporateAddressDEFLTQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOCorporateAddressDEFLT&#124;error`

**Sample code:**

```ballerina
FOCorporateAddressDEFLT result = check client->getFOCorporateAddressDEFLT(addressId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### FODivision

<details>
<summary>listFODivisions</summary>

<div>

Queries the FODivision collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFODivisionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFODivisions();
```

</div>
</details>

<details>
<summary>getFODivision</summary>

<div>

Retrieves a single FODivision entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFODivisionQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFODivision(externalCode, startDate);
```

</div>
</details>

<details>
<summary>deleteFODivision</summary>

<div>

Deletes the FODivision identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFODivisionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFODivision(externalCode, startDate);
```

</div>
</details>

#### JobClassificationUSA

<details>
<summary>listJobClassificationUSAs</summary>

<div>

Queries the JobClassificationUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_32&#124;error`

**Sample code:**

```ballerina
Wrapper_32 result = check client->listJobClassificationUSAs();
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
<summary>createJobClassificationUSA</summary>

<div>

Creates a new JobClassificationUSA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationUSA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationUSA&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationUSA result = check client->createJobClassificationUSA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationUSA</summary>

<div>

Retrieves a single JobClassificationUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationUSA&#124;error`

**Sample code:**

```ballerina
JobClassificationUSA result = check client->getJobClassificationUSA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
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
<summary>updateJobClassificationUSA</summary>

<div>

Updates the JobClassificationUSA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationUSA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationUSA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationUSA</summary>

<div>

Deletes the JobClassificationUSA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationUSAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationUSA(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### FOJobClassLocalDEFLT

<details>
<summary>listFOJobClassLocalDEFLTs</summary>

<div>

Queries the FOJobClassLocalDEFLT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalDEFLTsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_33&#124;error`

**Sample code:**

```ballerina
Wrapper_33 result = check client->listFOJobClassLocalDEFLTs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOJobClassLocalDEFLT</summary>

<div>

Retrieves a single FOJobClassLocalDEFLT entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalDEFLTQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalDEFLT&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalDEFLT result = check client->getFOJobClassLocalDEFLT(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FOEventReason

<details>
<summary>listFOEventReasons</summary>

<div>

Queries the FOEventReason collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOEventReasonsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_34&#124;error`

**Sample code:**

```ballerina
Wrapper_34 result = check client->listFOEventReasons();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "descriptionTranslationNav": {},
        "nameTranslationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOEventReason</summary>

<div>

Retrieves a single FOEventReason entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOEventReasonQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOEventReason&#124;error`

**Sample code:**

```ballerina
FOEventReason result = check client->getFOEventReason(externalCode, startDate);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "descriptionTranslationNav": {
    "externalCode": "1000"
  },
  "nameTranslationNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### FOCostCenter

<details>
<summary>listFOCostCenters</summary>

<div>

Queries the FOCostCenter collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOCostCentersQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOCostCenters();
```

</div>
</details>

<details>
<summary>getFOCostCenter</summary>

<div>

Retrieves a single FOCostCenter entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOCostCenterQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOCostCenter(externalCode, startDate);
```

</div>
</details>

<details>
<summary>deleteFOCostCenter</summary>

<div>

Deletes the FOCostCenter identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFOCostCenterHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFOCostCenter(externalCode, startDate);
```

</div>
</details>

#### FOJobClassLocalBRA

<details>
<summary>listFOJobClassLocalBRAs</summary>

<div>

Queries the FOJobClassLocalBRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobClassLocalBRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_36&#124;error`

**Sample code:**

```ballerina
Wrapper_36 result = check client->listFOJobClassLocalBRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOJobClassLocalBRA</summary>

<div>

Retrieves a single FOJobClassLocalBRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobClassLocalBRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOJobClassLocalBRA&#124;error`

**Sample code:**

```ballerina
FOJobClassLocalBRA result = check client->getFOJobClassLocalBRA(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FOLocationGroup

<details>
<summary>listFOLocationGroups</summary>

<div>

Queries the FOLocationGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLocationGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_37&#124;error`

**Sample code:**

```ballerina
Wrapper_37 result = check client->listFOLocationGroups();
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
<summary>getFOLocationGroup</summary>

<div>

Retrieves a single FOLocationGroup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLocationGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLocationGroup&#124;error`

**Sample code:**

```ballerina
FOLocationGroup result = check client->getFOLocationGroup(externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### FOLegalEntityLocalESP

<details>
<summary>listFOLegalEntityLocalESPs</summary>

<div>

Queries the FOLegalEntityLocalESP collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLegalEntityLocalESPsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_38&#124;error`

**Sample code:**

```ballerina
Wrapper_38 result = check client->listFOLegalEntityLocalESPs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOLegalEntityLocalESP</summary>

<div>

Retrieves a single FOLegalEntityLocalESP entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLegalEntityLocalESPQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLegalEntityLocalESP&#124;error`

**Sample code:**

```ballerina
FOLegalEntityLocalESP result = check client->getFOLegalEntityLocalESP(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### PayScaleType

<details>
<summary>listPayScaleTypes</summary>

<div>

Queries the PayScaleType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayScaleTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_39&#124;error`

**Sample code:**

```ballerina
Wrapper_39 result = check client->listPayScaleTypes();
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
<summary>createPayScaleType</summary>

<div>

Creates a new PayScaleType entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PayScaleType</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPayScaleType&#124;error`

**Sample code:**

```ballerina
CreatedPayScaleType result = check client->createPayScaleType(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPayScaleType</summary>

<div>

Retrieves a single PayScaleType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayScaleTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `PayScaleType&#124;error`

**Sample code:**

```ballerina
PayScaleType result = check client->getPayScaleType(code);
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
<summary>updatePayScaleType</summary>

<div>

Updates the PayScaleType identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `payload` | <code>ModifiedPayScaleType</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePayScaleType(code, payload);
```

</div>
</details>

<details>
<summary>deletePayScaleType</summary>

<div>

Deletes the PayScaleType identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>DeletePayScaleTypeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayScaleType(code);
```

</div>
</details>

#### FOLegalEntityLocalDEFLT

<details>
<summary>listFOLegalEntityLocalDEFLTs</summary>

<div>

Queries the FOLegalEntityLocalDEFLT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLegalEntityLocalDEFLTsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_40&#124;error`

**Sample code:**

```ballerina
Wrapper_40 result = check client->listFOLegalEntityLocalDEFLTs();
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
<summary>getFOLegalEntityLocalDEFLT</summary>

<div>

Retrieves a single FOLegalEntityLocalDEFLT entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLegalEntityLocalDEFLTQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLegalEntityLocalDEFLT&#124;error`

**Sample code:**

```ballerina
FOLegalEntityLocalDEFLT result = check client->getFOLegalEntityLocalDEFLT(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### LegalEntityRUS

<details>
<summary>listLegalEntityRUSs</summary>

<div>

Queries the LegalEntityRUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityRUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_41&#124;error`

**Sample code:**

```ballerina
Wrapper_41 result = check client->listLegalEntityRUSs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "LegalEntity_effectiveStartDate": "2026-01-01",
        "LegalEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createLegalEntityRUS</summary>

<div>

Creates a new LegalEntityRUS entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityRUS</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityRUS&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityRUS result = check client->createLegalEntityRUS(payload);
```

**Sample response:**

```json
{
  "d": {
    "LegalEntity_effectiveStartDate": "2026-01-01",
    "LegalEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityRUS</summary>

<div>

Retrieves a single LegalEntityRUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityRUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityRUS&#124;error`

**Sample code:**

```ballerina
LegalEntityRUS result = check client->getLegalEntityRUS(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "LegalEntity_effectiveStartDate": "2026-01-01",
  "LegalEntity_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateLegalEntityRUS</summary>

<div>

Updates the LegalEntityRUS identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityRUS</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityRUS(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityRUS</summary>

<div>

Deletes the LegalEntityRUS identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityRUSHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityRUS(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### JobClassificationCAN

<details>
<summary>listJobClassificationCANs</summary>

<div>

Queries the JobClassificationCAN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationCANsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_42&#124;error`

**Sample code:**

```ballerina
Wrapper_42 result = check client->listJobClassificationCANs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobClassificationCountry_country": "string",
        "JobClassification_effectiveStartDate": "2026-01-01",
        "JobClassification_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobClassificationCAN</summary>

<div>

Creates a new JobClassificationCAN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationCAN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationCAN&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationCAN result = check client->createJobClassificationCAN(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobClassificationCountry_country": "string",
    "JobClassification_effectiveStartDate": "2026-01-01",
    "JobClassification_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationCAN</summary>

<div>

Retrieves a single JobClassificationCAN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationCANQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationCAN&#124;error`

**Sample code:**

```ballerina
JobClassificationCAN result = check client->getJobClassificationCAN(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

**Sample response:**

```json
{
  "JobClassificationCountry_country": "string",
  "JobClassification_effectiveStartDate": "2026-01-01",
  "JobClassification_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateJobClassificationCAN</summary>

<div>

Updates the JobClassificationCAN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationCAN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationCAN(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationCAN</summary>

<div>

Deletes the JobClassificationCAN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationCANHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationCAN(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

#### PayScalePayComponent

<details>
<summary>listPayScalePayComponents</summary>

<div>

Queries the PayScalePayComponent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayScalePayComponentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listPayScalePayComponents();
```

</div>
</details>

<details>
<summary>getPayScalePayComponent</summary>

<div>

Retrieves a single PayScalePayComponent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PayScaleLevel_code` | <code>string</code> | Yes | key: PayScaleLevel_code |
| `PayScaleLevel_effectiveStartDate` | <code>string</code> | Yes | key: PayScaleLevel_effectiveStartDate |
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayScalePayComponentQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getPayScalePayComponent(PayScaleLevel_code, PayScaleLevel_effectiveStartDate, code);
```

</div>
</details>

<details>
<summary>deletePayScalePayComponent</summary>

<div>

Deletes the PayScalePayComponent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PayScaleLevel_code` | <code>string</code> | Yes | key: PayScaleLevel_code |
| `PayScaleLevel_effectiveStartDate` | <code>string</code> | Yes | key: PayScaleLevel_effectiveStartDate |
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>DeletePayScalePayComponentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayScalePayComponent(PayScaleLevel_code, PayScaleLevel_effectiveStartDate, code);
```

</div>
</details>

#### LegalEntitySVN

<details>
<summary>listLegalEntitySVNs</summary>

<div>

Queries the LegalEntitySVN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntitySVNsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_44&#124;error`

**Sample code:**

```ballerina
Wrapper_44 result = check client->listLegalEntitySVNs();
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
<summary>createLegalEntitySVN</summary>

<div>

Creates a new LegalEntitySVN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntitySVN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntitySVN&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntitySVN result = check client->createLegalEntitySVN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntitySVN</summary>

<div>

Retrieves a single LegalEntitySVN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntitySVNQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntitySVN&#124;error`

**Sample code:**

```ballerina
LegalEntitySVN result = check client->getLegalEntitySVN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntitySVN</summary>

<div>

Updates the LegalEntitySVN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntitySVN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntitySVN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntitySVN</summary>

<div>

Deletes the LegalEntitySVN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntitySVNHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntitySVN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntitySAU

<details>
<summary>listLegalEntitySAUs</summary>

<div>

Queries the LegalEntitySAU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntitySAUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_45&#124;error`

**Sample code:**

```ballerina
Wrapper_45 result = check client->listLegalEntitySAUs();
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
<summary>createLegalEntitySAU</summary>

<div>

Creates a new LegalEntitySAU entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntitySAU</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntitySAU&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntitySAU result = check client->createLegalEntitySAU(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntitySAU</summary>

<div>

Retrieves a single LegalEntitySAU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntitySAUQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntitySAU&#124;error`

**Sample code:**

```ballerina
LegalEntitySAU result = check client->getLegalEntitySAU(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntitySAU</summary>

<div>

Updates the LegalEntitySAU identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntitySAU</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntitySAU(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntitySAU</summary>

<div>

Deletes the LegalEntitySAU identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntitySAUHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntitySAU(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityPRY

<details>
<summary>listLegalEntityPRYs</summary>

<div>

Queries the LegalEntityPRY collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityPRYsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_46&#124;error`

**Sample code:**

```ballerina
Wrapper_46 result = check client->listLegalEntityPRYs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "LegalEntity_effectiveStartDate": "2026-01-01",
        "LegalEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createLegalEntityPRY</summary>

<div>

Creates a new LegalEntityPRY entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityPRY</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityPRY&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityPRY result = check client->createLegalEntityPRY(payload);
```

**Sample response:**

```json
{
  "d": {
    "LegalEntity_effectiveStartDate": "2026-01-01",
    "LegalEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityPRY</summary>

<div>

Retrieves a single LegalEntityPRY entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityPRYQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityPRY&#124;error`

**Sample code:**

```ballerina
LegalEntityPRY result = check client->getLegalEntityPRY(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "LegalEntity_effectiveStartDate": "2026-01-01",
  "LegalEntity_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateLegalEntityPRY</summary>

<div>

Updates the LegalEntityPRY identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityPRY</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityPRY(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityPRY</summary>

<div>

Deletes the LegalEntityPRY identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityPRYHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityPRY(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityCAN

<details>
<summary>listLegalEntityCANs</summary>

<div>

Queries the LegalEntityCAN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityCANsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_47&#124;error`

**Sample code:**

```ballerina
Wrapper_47 result = check client->listLegalEntityCANs();
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
<summary>createLegalEntityCAN</summary>

<div>

Creates a new LegalEntityCAN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityCAN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityCAN&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityCAN result = check client->createLegalEntityCAN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityCAN</summary>

<div>

Retrieves a single LegalEntityCAN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityCANQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityCAN&#124;error`

**Sample code:**

```ballerina
LegalEntityCAN result = check client->getLegalEntityCAN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityCAN</summary>

<div>

Updates the LegalEntityCAN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityCAN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityCAN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityCAN</summary>

<div>

Deletes the LegalEntityCAN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityCANHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityCAN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityBOL

<details>
<summary>listLegalEntityBOLs</summary>

<div>

Queries the LegalEntityBOL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityBOLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_48&#124;error`

**Sample code:**

```ballerina
Wrapper_48 result = check client->listLegalEntityBOLs();
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
<summary>createLegalEntityBOL</summary>

<div>

Creates a new LegalEntityBOL entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityBOL</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityBOL&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityBOL result = check client->createLegalEntityBOL(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityBOL</summary>

<div>

Retrieves a single LegalEntityBOL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityBOLQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityBOL&#124;error`

**Sample code:**

```ballerina
LegalEntityBOL result = check client->getLegalEntityBOL(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityBOL</summary>

<div>

Updates the LegalEntityBOL identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityBOL</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityBOL(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityBOL</summary>

<div>

Deletes the LegalEntityBOL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityBOLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityBOL(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityTHA

<details>
<summary>listLegalEntityTHAs</summary>

<div>

Queries the LegalEntityTHA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityTHAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_49&#124;error`

**Sample code:**

```ballerina
Wrapper_49 result = check client->listLegalEntityTHAs();
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
<summary>createLegalEntityTHA</summary>

<div>

Creates a new LegalEntityTHA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityTHA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityTHA&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityTHA result = check client->createLegalEntityTHA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityTHA</summary>

<div>

Retrieves a single LegalEntityTHA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityTHAQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityTHA&#124;error`

**Sample code:**

```ballerina
LegalEntityTHA result = check client->getLegalEntityTHA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityTHA</summary>

<div>

Updates the LegalEntityTHA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityTHA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityTHA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityTHA</summary>

<div>

Deletes the LegalEntityTHA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityTHAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityTHA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### FOPayComponentGroup

<details>
<summary>listFOPayComponentGroups</summary>

<div>

Queries the FOPayComponentGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOPayComponentGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOPayComponentGroups();
```

</div>
</details>

<details>
<summary>getFOPayComponentGroup</summary>

<div>

Retrieves a single FOPayComponentGroup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOPayComponentGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOPayComponentGroup(externalCode, startDate);
```

</div>
</details>

#### FOWfConfigStepApprover

<details>
<summary>listFOWfConfigStepApprovers</summary>

<div>

Queries the FOWfConfigStepApprover collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOWfConfigStepApproversQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOWfConfigStepApprovers();
```

</div>
</details>

<details>
<summary>getFOWfConfigStepApprover</summary>

<div>

Retrieves a single FOWfConfigStepApprover entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `stepNum` | <code>int</code> | Yes | key: stepNum |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOWfConfigStepApproverQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOWfConfigStepApprover(externalCode, stepNum);
```

</div>
</details>

#### LegalEntityBLR

<details>
<summary>listLegalEntityBLRs</summary>

<div>

Queries the LegalEntityBLR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityBLRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_52&#124;error`

**Sample code:**

```ballerina
Wrapper_52 result = check client->listLegalEntityBLRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "LegalEntity_effectiveStartDate": "2026-01-01",
        "LegalEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createLegalEntityBLR</summary>

<div>

Creates a new LegalEntityBLR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityBLR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityBLR&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityBLR result = check client->createLegalEntityBLR(payload);
```

**Sample response:**

```json
{
  "d": {
    "LegalEntity_effectiveStartDate": "2026-01-01",
    "LegalEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityBLR</summary>

<div>

Retrieves a single LegalEntityBLR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityBLRQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityBLR&#124;error`

**Sample code:**

```ballerina
LegalEntityBLR result = check client->getLegalEntityBLR(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "LegalEntity_effectiveStartDate": "2026-01-01",
  "LegalEntity_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateLegalEntityBLR</summary>

<div>

Updates the LegalEntityBLR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityBLR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityBLR(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityBLR</summary>

<div>

Deletes the LegalEntityBLR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityBLRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityBLR(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityTUN

<details>
<summary>listLegalEntityTUNs</summary>

<div>

Queries the LegalEntityTUN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityTUNsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_53&#124;error`

**Sample code:**

```ballerina
Wrapper_53 result = check client->listLegalEntityTUNs();
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
<summary>createLegalEntityTUN</summary>

<div>

Creates a new LegalEntityTUN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityTUN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityTUN&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityTUN result = check client->createLegalEntityTUN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityTUN</summary>

<div>

Retrieves a single LegalEntityTUN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityTUNQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityTUN&#124;error`

**Sample code:**

```ballerina
LegalEntityTUN result = check client->getLegalEntityTUN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityTUN</summary>

<div>

Updates the LegalEntityTUN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityTUN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityTUN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityTUN</summary>

<div>

Deletes the LegalEntityTUN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityTUNHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityTUN(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntitySGP

<details>
<summary>listLegalEntitySGPs</summary>

<div>

Queries the LegalEntitySGP collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntitySGPsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_54&#124;error`

**Sample code:**

```ballerina
Wrapper_54 result = check client->listLegalEntitySGPs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "LegalEntity_effectiveStartDate": "2026-01-01",
        "LegalEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createLegalEntitySGP</summary>

<div>

Creates a new LegalEntitySGP entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntitySGP</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntitySGP&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntitySGP result = check client->createLegalEntitySGP(payload);
```

**Sample response:**

```json
{
  "d": {
    "LegalEntity_effectiveStartDate": "2026-01-01",
    "LegalEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntitySGP</summary>

<div>

Retrieves a single LegalEntitySGP entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntitySGPQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntitySGP&#124;error`

**Sample code:**

```ballerina
LegalEntitySGP result = check client->getLegalEntitySGP(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "LegalEntity_effectiveStartDate": "2026-01-01",
  "LegalEntity_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updateLegalEntitySGP</summary>

<div>

Updates the LegalEntitySGP identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntitySGP</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntitySGP(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntitySGP</summary>

<div>

Deletes the LegalEntitySGP identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntitySGPHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntitySGP(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### LegalEntityUSA

<details>
<summary>listLegalEntityUSAs</summary>

<div>

Queries the LegalEntityUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_55&#124;error`

**Sample code:**

```ballerina
Wrapper_55 result = check client->listLegalEntityUSAs();
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
<summary>createLegalEntityUSA</summary>

<div>

Creates a new LegalEntityUSA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityUSA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityUSA&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityUSA result = check client->createLegalEntityUSA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityUSA</summary>

<div>

Retrieves a single LegalEntityUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityUSA&#124;error`

**Sample code:**

```ballerina
LegalEntityUSA result = check client->getLegalEntityUSA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityUSA</summary>

<div>

Updates the LegalEntityUSA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityUSA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityUSA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityUSA</summary>

<div>

Deletes the LegalEntityUSA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityUSAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityUSA(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### PayPeriod

<details>
<summary>listPayPeriods</summary>

<div>

Queries the PayPeriod collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayPeriodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_56&#124;error`

**Sample code:**

```ballerina
Wrapper_56 result = check client->listPayPeriods();
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
<summary>createPayPeriod</summary>

<div>

Creates a new PayPeriod entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PayPeriod</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPayPeriod&#124;error`

**Sample code:**

```ballerina
CreatedPayPeriod result = check client->createPayPeriod(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPayPeriod</summary>

<div>

Retrieves a single PayPeriod entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PayCalendar_payGroup` | <code>string</code> | Yes | key: PayCalendar_payGroup |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayPeriodQueries</code> | No | Queries to be sent with the request |

**Returns:** `PayPeriod&#124;error`

**Sample code:**

```ballerina
PayPeriod result = check client->getPayPeriod(PayCalendar_payGroup, externalCode);
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
<summary>updatePayPeriod</summary>

<div>

Updates the PayPeriod identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PayCalendar_payGroup` | <code>string</code> | Yes | key: PayCalendar_payGroup |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPayPeriod</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePayPeriod(PayCalendar_payGroup, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePayPeriod</summary>

<div>

Deletes the PayPeriod identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PayCalendar_payGroup` | <code>string</code> | Yes | key: PayCalendar_payGroup |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePayPeriodHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayPeriod(PayCalendar_payGroup, externalCode);
```

</div>
</details>

#### FOPayComponent

<details>
<summary>listFOPayComponents</summary>

<div>

Queries the FOPayComponent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOPayComponentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOPayComponents();
```

</div>
</details>

<details>
<summary>getFOPayComponent</summary>

<div>

Retrieves a single FOPayComponent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOPayComponentQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOPayComponent(externalCode, startDate);
```

</div>
</details>

#### FOLegalEntityLocalARG

<details>
<summary>listFOLegalEntityLocalARGs</summary>

<div>

Queries the FOLegalEntityLocalARG collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOLegalEntityLocalARGsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_58&#124;error`

**Sample code:**

```ballerina
Wrapper_58 result = check client->listFOLegalEntityLocalARGs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "countryNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOLegalEntityLocalARG</summary>

<div>

Retrieves a single FOLegalEntityLocalARG entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOLegalEntityLocalARGQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOLegalEntityLocalARG&#124;error`

**Sample code:**

```ballerina
FOLegalEntityLocalARG result = check client->getFOLegalEntityLocalARG(country, externalCode, startDate);
```

**Sample response:**

```json
{
  "country": "string",
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "countryNav": {
    "territoryCode": "1000"
  }
}
```

</div>
</details>

#### FOGeozone

<details>
<summary>listFOGeozones</summary>

<div>

Queries the FOGeozone collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOGeozonesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_59&#124;error`

**Sample code:**

```ballerina
Wrapper_59 result = check client->listFOGeozones();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "descriptionTranslationNav": {},
        "nameTranslationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getFOGeozone</summary>

<div>

Retrieves a single FOGeozone entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOGeozoneQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOGeozone&#124;error`

**Sample code:**

```ballerina
FOGeozone result = check client->getFOGeozone(externalCode, startDate);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "descriptionTranslationNav": {
    "externalCode": "1000"
  },
  "nameTranslationNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### LegalEntityARG

<details>
<summary>listLegalEntityARGs</summary>

<div>

Queries the LegalEntityARG collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalEntityARGsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_60&#124;error`

**Sample code:**

```ballerina
Wrapper_60 result = check client->listLegalEntityARGs();
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
<summary>createLegalEntityARG</summary>

<div>

Creates a new LegalEntityARG entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalEntityARG</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedLegalEntityARG&#124;error`

**Sample code:**

```ballerina
CreatedLegalEntityARG result = check client->createLegalEntityARG(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getLegalEntityARG</summary>

<div>

Retrieves a single LegalEntityARG entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalEntityARGQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalEntityARG&#124;error`

**Sample code:**

```ballerina
LegalEntityARG result = check client->getLegalEntityARG(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
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
<summary>updateLegalEntityARG</summary>

<div>

Updates the LegalEntityARG identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedLegalEntityARG</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateLegalEntityARG(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteLegalEntityARG</summary>

<div>

Deletes the LegalEntityARG identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `LegalEntity_effectiveStartDate` | <code>string</code> | Yes | key: LegalEntity_effectiveStartDate |
| `LegalEntity_externalCode` | <code>string</code> | Yes | key: LegalEntity_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteLegalEntityARGHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteLegalEntityARG(LegalEntity_effectiveStartDate, LegalEntity_externalCode, externalCode);
```

</div>
</details>

#### FOBusinessUnit

<details>
<summary>listFOBusinessUnits</summary>

<div>

Queries the FOBusinessUnit collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOBusinessUnitsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_61&#124;error`

**Sample code:**

```ballerina
Wrapper_61 result = check client->listFOBusinessUnits();
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
<summary>createFOBusinessUnit</summary>

<div>

Creates a new FOBusinessUnit entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FOBusinessUnit</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedFOBusinessUnit&#124;error`

**Sample code:**

```ballerina
CreatedFOBusinessUnit result = check client->createFOBusinessUnit(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getFOBusinessUnit</summary>

<div>

Retrieves a single FOBusinessUnit entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOBusinessUnitQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOBusinessUnit&#124;error`

**Sample code:**

```ballerina
FOBusinessUnit result = check client->getFOBusinessUnit(externalCode, startDate);
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
<summary>updateFOBusinessUnit</summary>

<div>

Updates the FOBusinessUnit identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `payload` | <code>ModifiedFOBusinessUnit</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFOBusinessUnit(externalCode, startDate, payload);
```

</div>
</details>

<details>
<summary>deleteFOBusinessUnit</summary>

<div>

Deletes the FOBusinessUnit identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFOBusinessUnitHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFOBusinessUnit(externalCode, startDate);
```

</div>
</details>

#### FOCompany

<details>
<summary>listFOCompanys</summary>

<div>

Queries the FOCompany collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOCompanysQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOCompanys();
```

</div>
</details>

<details>
<summary>getFOCompany</summary>

<div>

Retrieves a single FOCompany entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOCompanyQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOCompany(externalCode, startDate);
```

</div>
</details>

<details>
<summary>deleteFOCompany</summary>

<div>

Deletes the FOCompany identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFOCompanyHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFOCompany(externalCode, startDate);
```

</div>
</details>

#### FOPayGroup

<details>
<summary>listFOPayGroups</summary>

<div>

Queries the FOPayGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOPayGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_63&#124;error`

**Sample code:**

```ballerina
Wrapper_63 result = check client->listFOPayGroups();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "startDate": "2026-01-01",
        "descriptionTranslationNav": {},
        "nameTranslationNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createFOPayGroup</summary>

<div>

Creates a new FOPayGroup entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FOPayGroup</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedFOPayGroup&#124;error`

**Sample code:**

```ballerina
CreatedFOPayGroup result = check client->createFOPayGroup(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "startDate": "2026-01-01",
    "descriptionTranslationNav": {
      "externalCode": "1000"
    },
    "nameTranslationNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getFOPayGroup</summary>

<div>

Retrieves a single FOPayGroup entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOPayGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `FOPayGroup&#124;error`

**Sample code:**

```ballerina
FOPayGroup result = check client->getFOPayGroup(externalCode, startDate);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "startDate": "2026-01-01",
  "descriptionTranslationNav": {
    "externalCode": "1000"
  },
  "nameTranslationNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateFOPayGroup</summary>

<div>

Updates the FOPayGroup identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `payload` | <code>ModifiedFOPayGroup</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFOPayGroup(externalCode, startDate, payload);
```

</div>
</details>

<details>
<summary>deleteFOPayGroup</summary>

<div>

Deletes the FOPayGroup identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFOPayGroupHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFOPayGroup(externalCode, startDate);
```

</div>
</details>

#### LocalizedData

<details>
<summary>listLocalizedDatas</summary>

<div>

Queries the LocalizedData collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLocalizedDatasQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_64&#124;error`

**Sample code:**

```ballerina
Wrapper_64 result = check client->listLocalizedDatas();
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
<summary>getLocalizedData</summary>

<div>

Retrieves a single LocalizedData entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `localizedDataCode` | <code>string</code> | Yes | key: localizedDataCode |
| `localizedDataLocale` | <code>string</code> | Yes | key: localizedDataLocale |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLocalizedDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `LocalizedData&#124;error`

**Sample code:**

```ballerina
LocalizedData result = check client->getLocalizedData(localizedDataCode, localizedDataLocale);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### FoTranslation

<details>
<summary>listFoTranslations</summary>

<div>

Queries the FoTranslation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFoTranslationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_65&#124;error`

**Sample code:**

```ballerina
Wrapper_65 result = check client->listFoTranslations();
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
<summary>getFoTranslation</summary>

<div>

Retrieves a single FoTranslation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFoTranslationQueries</code> | No | Queries to be sent with the request |

**Returns:** `FoTranslation&#124;error`

**Sample code:**

```ballerina
FoTranslation result = check client->getFoTranslation(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000"
}
```

</div>
</details>

#### PayScaleGroup

<details>
<summary>listPayScaleGroups</summary>

<div>

Queries the PayScaleGroup collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayScaleGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_66&#124;error`

**Sample code:**

```ballerina
Wrapper_66 result = check client->listPayScaleGroups();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "code": "1000",
        "payScaleAreaNav": {},
        "payScaleTypeNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPayScaleGroup</summary>

<div>

Creates a new PayScaleGroup entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PayScaleGroup</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPayScaleGroup&#124;error`

**Sample code:**

```ballerina
CreatedPayScaleGroup result = check client->createPayScaleGroup(payload);
```

**Sample response:**

```json
{
  "d": {
    "code": "1000",
    "payScaleAreaNav": {
      "d": {}
    },
    "payScaleTypeNav": {
      "d": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getPayScaleGroup</summary>

<div>

Retrieves a single PayScaleGroup entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayScaleGroupQueries</code> | No | Queries to be sent with the request |

**Returns:** `PayScaleGroup&#124;error`

**Sample code:**

```ballerina
PayScaleGroup result = check client->getPayScaleGroup(code);
```

**Sample response:**

```json
{
  "code": "1000",
  "payScaleAreaNav": {
    "d": {}
  },
  "payScaleTypeNav": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>updatePayScaleGroup</summary>

<div>

Updates the PayScaleGroup identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `payload` | <code>ModifiedPayScaleGroup</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePayScaleGroup(code, payload);
```

</div>
</details>

<details>
<summary>deletePayScaleGroup</summary>

<div>

Deletes the PayScaleGroup identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>DeletePayScaleGroupHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayScaleGroup(code);
```

</div>
</details>

#### PayCalendar

<details>
<summary>listPayCalendars</summary>

<div>

Queries the PayCalendar collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayCalendarsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listPayCalendars();
```

</div>
</details>

<details>
<summary>getPayCalendar</summary>

<div>

Retrieves a single PayCalendar entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payGroup` | <code>string</code> | Yes | key: payGroup |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayCalendarQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getPayCalendar(payGroup);
```

</div>
</details>

<details>
<summary>deletePayCalendar</summary>

<div>

Deletes the PayCalendar identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payGroup` | <code>string</code> | Yes | key: payGroup |
| `headers` | <code>DeletePayCalendarHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayCalendar(payGroup);
```

</div>
</details>

#### FOWfConfig

<details>
<summary>listFOWfConfigs</summary>

<div>

Queries the FOWfConfig collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOWfConfigsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOWfConfigs();
```

</div>
</details>

<details>
<summary>getFOWfConfig</summary>

<div>

Retrieves a single FOWfConfig entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOWfConfigQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOWfConfig(externalCode);
```

</div>
</details>

#### FOJobCode

<details>
<summary>listFOJobCodes</summary>

<div>

Queries the FOJobCode collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFOJobCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listFOJobCodes();
```

</div>
</details>

<details>
<summary>getFOJobCode</summary>

<div>

Retrieves a single FOJobCode entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFOJobCodeQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getFOJobCode(externalCode, startDate);
```

</div>
</details>

<details>
<summary>deleteFOJobCode</summary>

<div>

Deletes the FOJobCode identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>DeleteFOJobCodeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFOJobCode(externalCode, startDate);
```

</div>
</details>

#### PayScaleLevel

<details>
<summary>listPayScaleLevels</summary>

<div>

Queries the PayScaleLevel collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPayScaleLevelsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listPayScaleLevels();
```

</div>
</details>

<details>
<summary>getPayScaleLevel</summary>

<div>

Retrieves a single PayScaleLevel entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPayScaleLevelQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getPayScaleLevel(code, effectiveStartDate);
```

</div>
</details>

<details>
<summary>deletePayScaleLevel</summary>

<div>

Deletes the PayScaleLevel identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>DeletePayScaleLevelHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePayScaleLevel(code, effectiveStartDate);
```

</div>
</details>

#### JobClassificationBGR

<details>
<summary>listJobClassificationBGRs</summary>

<div>

Queries the JobClassificationBGR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobClassificationBGRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_71&#124;error`

**Sample code:**

```ballerina
Wrapper_71 result = check client->listJobClassificationBGRs();
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
<summary>createJobClassificationBGR</summary>

<div>

Creates a new JobClassificationBGR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobClassificationBGR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobClassificationBGR&#124;error`

**Sample code:**

```ballerina
CreatedJobClassificationBGR result = check client->createJobClassificationBGR(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getJobClassificationBGR</summary>

<div>

Retrieves a single JobClassificationBGR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobClassificationBGRQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobClassificationBGR&#124;error`

**Sample code:**

```ballerina
JobClassificationBGR result = check client->getJobClassificationBGR(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
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
<summary>updateJobClassificationBGR</summary>

<div>

Updates the JobClassificationBGR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobClassificationBGR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobClassificationBGR(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobClassificationBGR</summary>

<div>

Deletes the JobClassificationBGR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobClassificationCountry_country` | <code>string</code> | Yes | key: JobClassificationCountry_country |
| `JobClassification_effectiveStartDate` | <code>string</code> | Yes | key: JobClassification_effectiveStartDate |
| `JobClassification_externalCode` | <code>string</code> | Yes | key: JobClassification_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobClassificationBGRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobClassificationBGR(JobClassificationCountry_country, JobClassification_effectiveStartDate, JobClassification_externalCode, externalCode);
```

</div>
</details>

