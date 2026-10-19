---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_salesdistrict_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read access to SAP S/4HANA sales district master data and multilingual text descriptions via OData v2. |

---

## Client

Provides read access to SAP S/4HANA sales district master data and multilingual text descriptions via OData v2.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `CredentialsConfig` | Required | SAP basic authentication credentials containing `username` and `password`. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `http1Settings` | `ClientHttp1Settings?` | `()` | HTTP/1.x-specific client settings. |
| `http2Settings` | `ClientHttp2Settings?` | `()` | HTTP/2-specific client settings. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Whether to forward or handle the `forwarded`/`x-forwarded-for` header. |
| `poolConfig` | `PoolConfiguration?` | `()` | HTTP connection pool configuration. |
| `cache` | `CacheConfig?` | `()` | HTTP response caching configuration. |
| `compression` | `Compression` | `COMPRESSION_AUTO` | Specifies whether to compress/decompress requests and responses. |
| `circuitBreaker` | `CircuitBreakerConfig?` | `()` | Circuit breaker configuration. |
| `retryConfig` | `RetryConfig?` | `()` | Retry configuration for failed requests. |
| `responseLimits` | `ResponseLimitConfigs?` | `()` | Response size limit configuration. |
| `secureSocket` | `ClientSecureSocket?` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig?` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Whether to enable constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_salesdistrict_srv as salesdistrict;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

salesdistrict:Client salesDistrictClient = check new (
    {auth: {username, password}},
    hostname
);
```

### Operations

#### Sales districts

<details>
<summary>listA_SalesDistricts</summary>

Retrieves a collection of all sales district entities from SAP S/4HANA.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListA_SalesDistrictsQueries` | No | OData query options including `$top`, `$skip`, `$filter`, `$orderby`, `$select`, `$expand`, and `$inlinecount`. |

Returns: `CollectionOfA_SalesDistrictWrapper|error`

Sample code:

```ballerina
salesdistrict:CollectionOfA_SalesDistrictWrapper result =
    check salesDistrictClient->listA_SalesDistricts();
```

Sample response:

```ballerina
{
  "d": {
    "__count": "3",
    "results": [
      {"SalesDistrict": "D001"},
      {"SalesDistrict": "D002"},
      {"SalesDistrict": "D003"}
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesDistrict</summary>

Retrieves a single sales district entity by its unique sales district key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesDistrict` | `string` | Yes | The unique key identifying the sales district (e.g., `"D001"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetA_SalesDistrictQueries` | No | OData query options: `$select`, `$expand`. |

Returns: `A_SalesDistrictWrapper|error`

Sample code:

```ballerina
salesdistrict:A_SalesDistrictWrapper result =
    check salesDistrictClient->getA_SalesDistrict("D001");
```

Sample response:

```ballerina
{
  "d": {
    "SalesDistrict": "D001",
    "to_Text": {
      "results": []
    }
  }
}
```

</details>

<details>
<summary>listTextsOfA_SalesDistrict</summary>

Retrieves all multilingual text descriptions associated with a specific sales district.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesDistrict` | `string` | Yes | The unique key of the sales district whose texts are to be retrieved. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListTextsOfA_SalesDistrictQueries` | No | OData query options including `$top`, `$skip`, `$filter`, `$orderby`, `$select`, `$expand`, and `$inlinecount`. |

Returns: `CollectionOfA_SalesDistrictTextWrapper|error`

Sample code:

```ballerina
salesdistrict:CollectionOfA_SalesDistrictTextWrapper texts =
    check salesDistrictClient->listTextsOfA_SalesDistrict("D001");
```

Sample response:

```ballerina
{
  "d": {
    "__count": "2",
    "results": [
      {"SalesDistrict": "D001", "Language": "EN", "SalesDistrictName": "North America West"},
      {"SalesDistrict": "D001", "Language": "DE", "SalesDistrictName": "Nordamerika West"}
    ]
  }
}
```

</details>

#### Sales district texts

<details>
<summary>listA_SalesDistrictTexts</summary>

Retrieves a collection of all sales district text entities across all districts and languages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListA_SalesDistrictTextsQueries` | No | OData query options including `$top`, `$skip`, `$filter`, `$orderby`, `$select`, `$expand`, and `$inlinecount`. |

Returns: `CollectionOfA_SalesDistrictTextWrapper|error`

Sample code:

```ballerina
salesdistrict:CollectionOfA_SalesDistrictTextWrapper allTexts =
    check salesDistrictClient->listA_SalesDistrictTexts();
```

Sample response:

```ballerina
{
  "d": {
    "__count": "4",
    "results": [
      {"SalesDistrict": "D001", "Language": "EN", "SalesDistrictName": "North America West"},
      {"SalesDistrict": "D001", "Language": "DE", "SalesDistrictName": "Nordamerika West"},
      {"SalesDistrict": "D002", "Language": "EN", "SalesDistrictName": "North America East"},
      {"SalesDistrict": "D002", "Language": "DE", "SalesDistrictName": "Nordamerika Ost"}
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesDistrictText</summary>

Retrieves a single sales district text entity by its composite key (sales district key and language code).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesDistrict` | `string` | Yes | The unique key of the sales district. |
| `Language` | `string` | Yes | The ISO language code (e.g., `"EN"`, `"DE"`, `"FR"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetA_SalesDistrictTextQueries` | No | OData query options: `$select`, `$expand`. |

Returns: `A_SalesDistrictTextWrapper|error`

Sample code:

```ballerina
salesdistrict:A_SalesDistrictTextWrapper textEntry =
    check salesDistrictClient->getA_SalesDistrictText("D001", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "SalesDistrict": "D001",
    "Language": "EN",
    "SalesDistrictName": "North America West"
  }
}
```

</details>

<details>
<summary>getSalesDistrictOfA_SalesDistrictText</summary>

Navigates from a sales district text entity back to its parent sales district record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesDistrict` | `string` | Yes | The unique key of the sales district. |
| `Language` | `string` | Yes | The language code identifying the text record to navigate from. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetSalesDistrictOfA_SalesDistrictTextQueries` | No | OData query options: `$select`, `$expand`. |

Returns: `A_SalesDistrictWrapper|error`

Sample code:

```ballerina
salesdistrict:A_SalesDistrictWrapper parentDistrict =
    check salesDistrictClient->getSalesDistrictOfA_SalesDistrictText("D001", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "SalesDistrict": "D001",
    "to_Text": {
      "results": []
    }
  }
}
```

</details>
