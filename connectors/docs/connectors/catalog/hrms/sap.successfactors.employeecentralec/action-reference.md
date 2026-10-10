# Actions

The `ballerinax/sap.successfactors.employeecentralec` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages employeecentralec objects: PerGlobalInfoARE, PerGlobalInfoCHN, PerGlobalInfoFIN, EducationDegreeContent, CurrencyExchangeRate, NonRecurringPayment, EducationDegreeEntity, ServiceDeskContactSupportInformation…, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access the country specific global information of an employee.

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
import ballerinax/sap.successfactors.employeecentralec;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

employeecentralec:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### PerGlobalInfoARE

<details>
<summary>listPerGlobalInfoAREs</summary>

Queries the PerGlobalInfoARE collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoAREsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listPerGlobalInfoAREs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoARE</summary>

Retrieves a single PerGlobalInfoARE entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoAREQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoARE_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoARE_1 result = check client->getPerGlobalInfoARE(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoCHN

<details>
<summary>listPerGlobalInfoCHNs</summary>

Queries the PerGlobalInfoCHN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoCHNsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listPerGlobalInfoCHNs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoCHN</summary>

Retrieves a single PerGlobalInfoCHN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoCHNQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoCHN_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoCHN_1 result = check client->getPerGlobalInfoCHN(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoFIN

<details>
<summary>listPerGlobalInfoFINs</summary>

Queries the PerGlobalInfoFIN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoFINsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listPerGlobalInfoFINs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoFIN</summary>

Retrieves a single PerGlobalInfoFIN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoFINQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoFIN_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoFIN_1 result = check client->getPerGlobalInfoFIN(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### EducationDegreeContent

<details>
<summary>listEducationDegreeContents</summary>

Queries the EducationDegreeContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEducationDegreeContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listEducationDegreeContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</details>

<details>
<summary>createEducationDegreeContent</summary>

Creates a new EducationDegreeContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EducationDegreeContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEducationDegreeContent&#124;error`

**Sample code:**

```ballerina
CreatedEducationDegreeContent result = check client->createEducationDegreeContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>getEducationDegreeContent</summary>

Retrieves a single EducationDegreeContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEducationDegreeContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `EducationDegreeContent_1&#124;error`

**Sample code:**

```ballerina
EducationDegreeContent_1 result = check client->getEducationDegreeContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>updateEducationDegreeContent</summary>

Updates the EducationDegreeContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEducationDegreeContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEducationDegreeContent(JobProfile_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEducationDegreeContent</summary>

Deletes the EducationDegreeContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEducationDegreeContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEducationDegreeContent(JobProfile_externalCode, externalCode);
```

</details>

#### CurrencyExchangeRate

<details>
<summary>listCurrencyExchangeRates</summary>

Queries the CurrencyExchangeRate collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCurrencyExchangeRatesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listCurrencyExchangeRates();
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

</details>

<details>
<summary>createCurrencyExchangeRate</summary>

Creates a new CurrencyExchangeRate entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CurrencyExchangeRate</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCurrencyExchangeRate&#124;error`

**Sample code:**

```ballerina
CreatedCurrencyExchangeRate result = check client->createCurrencyExchangeRate(payload);
```

**Sample response:**

```json
{
  "d": {
    "effectiveStartDate": "2026-01-01",
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getCurrencyExchangeRate</summary>

Retrieves a single CurrencyExchangeRate entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCurrencyExchangeRateQueries</code> | No | Queries to be sent with the request |

**Returns:** `CurrencyExchangeRate_1&#124;error`

**Sample code:**

```ballerina
CurrencyExchangeRate_1 result = check client->getCurrencyExchangeRate(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "effectiveStartDate": "2026-01-01",
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateCurrencyExchangeRate</summary>

Updates the CurrencyExchangeRate identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCurrencyExchangeRate</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCurrencyExchangeRate(effectiveStartDate, externalCode, payload);
```

</details>

<details>
<summary>deleteCurrencyExchangeRate</summary>

Deletes the CurrencyExchangeRate identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCurrencyExchangeRateHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCurrencyExchangeRate(effectiveStartDate, externalCode);
```

</details>

#### NonRecurringPayment

<details>
<summary>listNonRecurringPayments</summary>

Queries the NonRecurringPayment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNonRecurringPaymentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listNonRecurringPayments();
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

</details>

<details>
<summary>getNonRecurringPayment</summary>

Retrieves a single NonRecurringPayment entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNonRecurringPaymentQueries</code> | No | Queries to be sent with the request |

**Returns:** `NonRecurringPayment_1&#124;error`

**Sample code:**

```ballerina
NonRecurringPayment_1 result = check client->getNonRecurringPayment(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

#### EducationDegreeEntity

<details>
<summary>listEducationDegreeEntities</summary>

Queries the EducationDegreeEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEducationDegreeEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listEducationDegreeEntities();
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

</details>

<details>
<summary>createEducationDegreeEntity</summary>

Creates a new EducationDegreeEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EducationDegreeEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEducationDegreeEntity&#124;error`

**Sample code:**

```ballerina
CreatedEducationDegreeEntity result = check client->createEducationDegreeEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getEducationDegreeEntity</summary>

Retrieves a single EducationDegreeEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEducationDegreeEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `EducationDegreeEntity_1&#124;error`

**Sample code:**

```ballerina
EducationDegreeEntity_1 result = check client->getEducationDegreeEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateEducationDegreeEntity</summary>

Updates the EducationDegreeEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEducationDegreeEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEducationDegreeEntity(externalCode, payload);
```

</details>

<details>
<summary>deleteEducationDegreeEntity</summary>

Deletes the EducationDegreeEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEducationDegreeEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEducationDegreeEntity(externalCode);
```

</details>

#### ServiceDeskContactSupportInformation

<details>
<summary>listServiceDeskContactSupportInformations</summary>

Queries the ServiceDeskContactSupportInformation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListServiceDeskContactSupportInformationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listServiceDeskContactSupportInformations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "serviceDeskCountrySupportInformation": {}
      }
    ]
  }
}
```

</details>

<details>
<summary>createServiceDeskContactSupportInformation</summary>

Creates a new ServiceDeskContactSupportInformation entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ServiceDeskContactSupportInformation</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedServiceDeskContactSupportInformation&#124;error`

**Sample code:**

```ballerina
CreatedServiceDeskContactSupportInformation result = check client->createServiceDeskContactSupportInformation(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "serviceDeskCountrySupportInformation": {
      "results": []
    }
  }
}
```

</details>

<details>
<summary>getServiceDeskContactSupportInformation</summary>

Retrieves a single ServiceDeskContactSupportInformation entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetServiceDeskContactSupportInformationQueries</code> | No | Queries to be sent with the request |

**Returns:** `ServiceDeskContactSupportInformation_1&#124;error`

**Sample code:**

```ballerina
ServiceDeskContactSupportInformation_1 result = check client->getServiceDeskContactSupportInformation(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "serviceDeskCountrySupportInformation": {
      "results": []
    }
  }
}
```

</details>

<details>
<summary>updateServiceDeskContactSupportInformation</summary>

Updates the ServiceDeskContactSupportInformation identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedServiceDeskContactSupportInformation</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateServiceDeskContactSupportInformation(externalCode, payload);
```

</details>

<details>
<summary>deleteServiceDeskContactSupportInformation</summary>

Deletes the ServiceDeskContactSupportInformation identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteServiceDeskContactSupportInformationHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteServiceDeskContactSupportInformation(externalCode);
```

</details>

#### PerGlobalInfoBRA

<details>
<summary>listPerGlobalInfoBRAs</summary>

Queries the PerGlobalInfoBRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoBRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listPerGlobalInfoBRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoBRA</summary>

Retrieves a single PerGlobalInfoBRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoBRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoBRA_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoBRA_1 result = check client->getPerGlobalInfoBRA(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoCHE

<details>
<summary>listPerGlobalInfoCHEs</summary>

Queries the PerGlobalInfoCHE collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoCHEsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listPerGlobalInfoCHEs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoCHE</summary>

Retrieves a single PerGlobalInfoCHE entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoCHEQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoCHE_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoCHE_1 result = check client->getPerGlobalInfoCHE(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoGBR

<details>
<summary>listPerGlobalInfoGBRs</summary>

Queries the PerGlobalInfoGBR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoGBRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listPerGlobalInfoGBRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoGBR</summary>

Retrieves a single PerGlobalInfoGBR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoGBRQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoGBR_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoGBR_1 result = check client->getPerGlobalInfoGBR(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoAUS

<details>
<summary>listPerGlobalInfoAUSs</summary>

Queries the PerGlobalInfoAUS collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoAUSsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listPerGlobalInfoAUSs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoAUS</summary>

Retrieves a single PerGlobalInfoAUS entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoAUSQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoAUS_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoAUS_1 result = check client->getPerGlobalInfoAUS(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoESP

<details>
<summary>listPerGlobalInfoESPs</summary>

Queries the PerGlobalInfoESP collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoESPsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listPerGlobalInfoESPs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoESP</summary>

Retrieves a single PerGlobalInfoESP entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoESPQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoESP_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoESP_1 result = check client->getPerGlobalInfoESP(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### EducationMajorEntity

<details>
<summary>listEducationMajorEntities</summary>

Queries the EducationMajorEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEducationMajorEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listEducationMajorEntities();
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

</details>

<details>
<summary>createEducationMajorEntity</summary>

Creates a new EducationMajorEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EducationMajorEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEducationMajorEntity&#124;error`

**Sample code:**

```ballerina
CreatedEducationMajorEntity result = check client->createEducationMajorEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getEducationMajorEntity</summary>

Retrieves a single EducationMajorEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEducationMajorEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `EducationMajorEntity_1&#124;error`

**Sample code:**

```ballerina
EducationMajorEntity_1 result = check client->getEducationMajorEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateEducationMajorEntity</summary>

Updates the EducationMajorEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEducationMajorEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEducationMajorEntity(externalCode, payload);
```

</details>

<details>
<summary>deleteEducationMajorEntity</summary>

Deletes the EducationMajorEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEducationMajorEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEducationMajorEntity(externalCode);
```

</details>

#### PerGlobalInfoCAN

<details>
<summary>listPerGlobalInfoCANs</summary>

Queries the PerGlobalInfoCAN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoCANsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listPerGlobalInfoCANs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoCAN</summary>

Retrieves a single PerGlobalInfoCAN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoCANQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoCAN_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoCAN_1 result = check client->getPerGlobalInfoCAN(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoUSA

<details>
<summary>listPerGlobalInfoUSAs</summary>

Queries the PerGlobalInfoUSA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoUSAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listPerGlobalInfoUSAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoUSA</summary>

Retrieves a single PerGlobalInfoUSA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoUSAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoUSA_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoUSA_1 result = check client->getPerGlobalInfoUSA(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### ServiceDeskCountrySupportInformation

<details>
<summary>listServiceDeskCountrySupportInformations</summary>

Queries the ServiceDeskCountrySupportInformation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListServiceDeskCountrySupportInformationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listServiceDeskCountrySupportInformations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "ServiceDeskContactSupportInformation_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</details>

<details>
<summary>createServiceDeskCountrySupportInformation</summary>

Creates a new ServiceDeskCountrySupportInformation entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ServiceDeskCountrySupportInformation</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedServiceDeskCountrySupportInformation&#124;error`

**Sample code:**

```ballerina
CreatedServiceDeskCountrySupportInformation result = check client->createServiceDeskCountrySupportInformation(payload);
```

**Sample response:**

```json
{
  "d": {
    "ServiceDeskContactSupportInformation_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>getServiceDeskCountrySupportInformation</summary>

Retrieves a single ServiceDeskCountrySupportInformation entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ServiceDeskContactSupportInformation_externalCode` | <code>int</code> | Yes | key: ServiceDeskContactSupportInformation_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetServiceDeskCountrySupportInformationQueries</code> | No | Queries to be sent with the request |

**Returns:** `ServiceDeskCountrySupportInformation_1&#124;error`

**Sample code:**

```ballerina
ServiceDeskCountrySupportInformation_1 result = check client->getServiceDeskCountrySupportInformation(ServiceDeskContactSupportInformation_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "ServiceDeskContactSupportInformation_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</details>

<details>
<summary>updateServiceDeskCountrySupportInformation</summary>

Updates the ServiceDeskCountrySupportInformation identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ServiceDeskContactSupportInformation_externalCode` | <code>int</code> | Yes | key: ServiceDeskContactSupportInformation_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedServiceDeskCountrySupportInformation</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateServiceDeskCountrySupportInformation(ServiceDeskContactSupportInformation_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteServiceDeskCountrySupportInformation</summary>

Deletes the ServiceDeskCountrySupportInformation identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `ServiceDeskContactSupportInformation_externalCode` | <code>int</code> | Yes | key: ServiceDeskContactSupportInformation_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteServiceDeskCountrySupportInformationHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteServiceDeskCountrySupportInformation(ServiceDeskContactSupportInformation_externalCode, externalCode);
```

</details>

#### EducationMajorContent

<details>
<summary>listEducationMajorContents</summary>

Queries the EducationMajorContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEducationMajorContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listEducationMajorContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {},
        "mappedDegreeIdNav": {}
      }
    ]
  }
}
```

</details>

<details>
<summary>createEducationMajorContent</summary>

Creates a new EducationMajorContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EducationMajorContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEducationMajorContent&#124;error`

**Sample code:**

```ballerina
CreatedEducationMajorContent result = check client->createEducationMajorContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    },
    "mappedDegreeIdNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>getEducationMajorContent</summary>

Retrieves a single EducationMajorContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEducationMajorContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `EducationMajorContent_1&#124;error`

**Sample code:**

```ballerina
EducationMajorContent_1 result = check client->getEducationMajorContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    },
    "mappedDegreeIdNav": {
      "externalCode": "1000"
    }
  }
}
```

</details>

<details>
<summary>updateEducationMajorContent</summary>

Updates the EducationMajorContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEducationMajorContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEducationMajorContent(JobProfile_externalCode, externalCode, payload);
```

</details>

<details>
<summary>deleteEducationMajorContent</summary>

Deletes the EducationMajorContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEducationMajorContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEducationMajorContent(JobProfile_externalCode, externalCode);
```

</details>

#### PerGlobalInfoFRA

<details>
<summary>listPerGlobalInfoFRAs</summary>

Queries the PerGlobalInfoFRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoFRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listPerGlobalInfoFRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoFRA</summary>

Retrieves a single PerGlobalInfoFRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoFRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoFRA_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoFRA_1 result = check client->getPerGlobalInfoFRA(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoDEU

<details>
<summary>listPerGlobalInfoDEUs</summary>

Queries the PerGlobalInfoDEU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoDEUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listPerGlobalInfoDEUs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoDEU</summary>

Retrieves a single PerGlobalInfoDEU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoDEUQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoDEU_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoDEU_1 result = check client->getPerGlobalInfoDEU(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoDNK

<details>
<summary>listPerGlobalInfoDNKs</summary>

Queries the PerGlobalInfoDNK collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoDNKsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_20&#124;error`

**Sample code:**

```ballerina
Wrapper_20 result = check client->listPerGlobalInfoDNKs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoDNK</summary>

Retrieves a single PerGlobalInfoDNK entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoDNKQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoDNK_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoDNK_1 result = check client->getPerGlobalInfoDNK(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoITA

<details>
<summary>listPerGlobalInfoITAs</summary>

Queries the PerGlobalInfoITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_21&#124;error`

**Sample code:**

```ballerina
Wrapper_21 result = check client->listPerGlobalInfoITAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoITA</summary>

Retrieves a single PerGlobalInfoITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoITA_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoITA_1 result = check client->getPerGlobalInfoITA(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoNLD

<details>
<summary>listPerGlobalInfoNLDs</summary>

Queries the PerGlobalInfoNLD collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoNLDsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listPerGlobalInfoNLDs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoNLD</summary>

Retrieves a single PerGlobalInfoNLD entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoNLDQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoNLD_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoNLD_1 result = check client->getPerGlobalInfoNLD(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoPRT

<details>
<summary>listPerGlobalInfoPRTs</summary>

Queries the PerGlobalInfoPRT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoPRTsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_23&#124;error`

**Sample code:**

```ballerina
Wrapper_23 result = check client->listPerGlobalInfoPRTs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoPRT</summary>

Retrieves a single PerGlobalInfoPRT entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoPRTQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoPRT_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoPRT_1 result = check client->getPerGlobalInfoPRT(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoQAT

<details>
<summary>listPerGlobalInfoQATs</summary>

Queries the PerGlobalInfoQAT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoQATsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_24&#124;error`

**Sample code:**

```ballerina
Wrapper_24 result = check client->listPerGlobalInfoQATs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoQAT</summary>

Retrieves a single PerGlobalInfoQAT entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoQATQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoQAT_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoQAT_1 result = check client->getPerGlobalInfoQAT(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoSAU

<details>
<summary>listPerGlobalInfoSAUs</summary>

Queries the PerGlobalInfoSAU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoSAUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listPerGlobalInfoSAUs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoSAU</summary>

Retrieves a single PerGlobalInfoSAU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoSAUQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoSAU_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoSAU_1 result = check client->getPerGlobalInfoSAU(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### PerGlobalInfoZAF

<details>
<summary>listPerGlobalInfoZAFs</summary>

Queries the PerGlobalInfoZAF collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerGlobalInfoZAFsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listPerGlobalInfoZAFs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000",
        "startDate": "2026-01-01"
      }
    ]
  }
}
```

</details>

<details>
<summary>getPerGlobalInfoZAF</summary>

Retrieves a single PerGlobalInfoZAF entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerGlobalInfoZAFQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerGlobalInfoZAF_1&#124;error`

**Sample code:**

```ballerina
PerGlobalInfoZAF_1 result = check client->getPerGlobalInfoZAF(country, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "personIdExternal": "1000",
    "startDate": "2026-01-01"
  }
}
```

</details>

#### GetBizXAction

<details>
<summary>getGetBizXAction</summary>

Retrieves a single GetBizXAction entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetGetBizXActionQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->getGetBizXAction();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {}
    ]
  }
}
```

</details>
