---
connector: true
connector_name: "sap.successfactors.ecincometaxdeclaration"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecincometaxdeclaration` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecincometaxdeclaration objects — DeclarationType, FiscalYearVariant, FiscalYearToCountryMap, ItDeclarationTimeBound, ItDeclInvestmentType, ItDeclaration — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to record income tax declaration and submit tax declarations actuals. You can also use these APIs to categorize or group investment types, and configure the window period that controls the creation of actuals and proposals.

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
import ballerinax/sap.successfactors.ecincometaxdeclaration;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecincometaxdeclaration:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### DeclarationType

<details>
<summary>listDeclarationTypes</summary>

<div>

Queries the DeclarationType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDeclarationTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listDeclarationTypes();
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
<summary>getDeclarationType</summary>

<div>

Retrieves a single DeclarationType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeclarationTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `DeclarationType&#124;error`

**Sample code:**

```ballerina
DeclarationType result = check client->getDeclarationType(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000"
}
```

</div>
</details>

#### FiscalYearVariant

<details>
<summary>listFiscalYearVariants</summary>

<div>

Queries the FiscalYearVariant collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFiscalYearVariantsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listFiscalYearVariants();
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
<summary>getFiscalYearVariant</summary>

<div>

Retrieves a single FiscalYearVariant entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFiscalYearVariantQueries</code> | No | Queries to be sent with the request |

**Returns:** `FiscalYearVariant&#124;error`

**Sample code:**

```ballerina
FiscalYearVariant result = check client->getFiscalYearVariant(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000"
}
```

</div>
</details>

#### FiscalYearToCountryMap

<details>
<summary>listFiscalYearToCountryMaps</summary>

<div>

Queries the FiscalYearToCountryMap collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFiscalYearToCountryMapsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listFiscalYearToCountryMaps();
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
<summary>getFiscalYearToCountryMap</summary>

<div>

Retrieves a single FiscalYearToCountryMap entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFiscalYearToCountryMapQueries</code> | No | Queries to be sent with the request |

**Returns:** `FiscalYearToCountryMap&#124;error`

**Sample code:**

```ballerina
FiscalYearToCountryMap result = check client->getFiscalYearToCountryMap(externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### ItDeclarationTimeBound

<details>
<summary>listItDeclarationTimeBounds</summary>

<div>

Queries the ItDeclarationTimeBound collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListItDeclarationTimeBoundsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listItDeclarationTimeBounds();
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
<summary>getItDeclarationTimeBound</summary>

<div>

Retrieves a single ItDeclarationTimeBound entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetItDeclarationTimeBoundQueries</code> | No | Queries to be sent with the request |

**Returns:** `ItDeclarationTimeBound&#124;error`

**Sample code:**

```ballerina
ItDeclarationTimeBound result = check client->getItDeclarationTimeBound(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000"
}
```

</div>
</details>

#### ItDeclInvestmentType

<details>
<summary>listItDeclInvestmentTypes</summary>

<div>

Queries the ItDeclInvestmentType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListItDeclInvestmentTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listItDeclInvestmentTypes();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "externalCode": "1000",
        "declarationTypeNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getItDeclInvestmentType</summary>

<div>

Retrieves a single ItDeclInvestmentType entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetItDeclInvestmentTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `ItDeclInvestmentType&#124;error`

**Sample code:**

```ballerina
ItDeclInvestmentType result = check client->getItDeclInvestmentType(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "externalCode": "1000",
  "declarationTypeNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

#### ItDeclaration

<details>
<summary>listItDeclarations</summary>

<div>

Queries the ItDeclaration collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListItDeclarationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listItDeclarations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "effectiveStartDate": "2026-01-01",
        "externalCode": "1000",
        "itDeclInvestmentTypeNav": {},
        "typeNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getItDeclaration</summary>

<div>

Retrieves a single ItDeclaration entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetItDeclarationQueries</code> | No | Queries to be sent with the request |

**Returns:** `ItDeclaration&#124;error`

**Sample code:**

```ballerina
ItDeclaration result = check client->getItDeclaration(effectiveStartDate, externalCode);
```

**Sample response:**

```json
{
  "effectiveStartDate": "2026-01-01",
  "externalCode": "1000",
  "itDeclInvestmentTypeNav": {
    "effectiveStartDate": "2026-01-01",
    "externalCode": "1000",
    "declarationTypeNav": {
      "externalCode": "1000"
    }
  },
  "typeNav": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

