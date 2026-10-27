---
connector: true
connector_name: "sap.s4hana.api_masterinspcharacteristic_srv"
title: "Actions"
description: "Reference for the SAP Master Inspection Characteristic connector client: configuration, initialization, and every read operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_masterinspcharacteristic_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read-only access to SAP S/4HANA master inspection characteristics and their texts via the `API_MASTERINSPCHARACTERISTIC_SRV` OData API. |

---

## Client

Provides read-only access to SAP S/4HANA master inspection characteristics and their texts via the `API_MASTERINSPCHARACTERISTIC_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_MASTERINSPCHARACTERISTIC_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | Optional | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | Optional | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | Optional | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | Optional | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | Optional | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | Optional | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | Optional | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_masterinspcharacteristic_srv as masterinspchar;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

masterinspchar:Client masterinspcharClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    hostname
);
```

### Operations

All entity operations of this API are read-only. A master inspection characteristic (`A_InspectionSpecification`) is identified by three key fields: `InspectionSpecification` (the characteristic ID, up to 8 characters), `InspectionSpecificationVersion` (the version number, up to 6 characters) and `InspectionSpecificationPlant` (the plant, up to 4 characters). A characteristic text (`A_InspectionSpecificationText`) adds the `Language` key.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers.

#### Master inspection characteristics

<details>
<summary>listA_InspectionSpecifications</summary>

<div>

Retrieves a collection of master inspection characteristics with their settings, specification limits and control indicators. Expand `to_Text` to include the texts of each characteristic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionSpecificationsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionSpecificationWrapper|error`

Sample code:

```ballerina
masterinspchar:CollectionOfA_InspectionSpecificationWrapper result = check masterinspcharClient->listA_InspectionSpecifications(
    queries = {
        \$filter: "InspectionSpecificationPlant eq '1010' and InspSpecIsQuantitative eq true",
        \$top: 2,
        \$select: ["InspectionSpecification", "InspectionSpecificationVersion", "InspectionSpecificationPlant", "InspSpecLowerLimit", "InspSpecUpperLimit", "InspectionSpecificationUnit"],
        \$orderby: ["InspectionSpecification"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionSpecification": "DIAMETER",
        "InspectionSpecificationVersion": "000001",
        "InspectionSpecificationPlant": "1010",
        "InspSpecLowerLimit": "9.95",
        "InspSpecUpperLimit": "10.05",
        "InspectionSpecificationUnit": "MM"
      },
      {
        "InspectionSpecification": "LENGTH",
        "InspectionSpecificationVersion": "000001",
        "InspectionSpecificationPlant": "1010",
        "InspSpecLowerLimit": "99.5",
        "InspSpecUpperLimit": "100.5",
        "InspectionSpecificationUnit": "MM"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspectionSpecification</summary>

<div>

Retrieves a single master inspection characteristic by characteristic ID, version and plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionSpecification` | `string` | Yes | Master inspection characteristic (e.g., `"LENGTH"`). |
| `InspectionSpecificationVersion` | `string` | Yes | Version number of the master inspection characteristic (e.g., `"000001"`). |
| `InspectionSpecificationPlant` | `string` | Yes | Plant for the master inspection characteristic (e.g., `"1010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionSpecificationQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionSpecificationWrapper|error`

Sample code:

```ballerina
masterinspchar:A_InspectionSpecificationWrapper characteristic = check masterinspcharClient->getA_InspectionSpecification(
    "LENGTH",
    "000001",
    "1010"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionSpecification": "LENGTH",
    "InspectionSpecificationVersion": "000001",
    "InspectionSpecificationPlant": "1010",
    "Plant": "1010",
    "ValidityStartDate": "/Date(1704067200000)/",
    "InspectionSpecificationSrchTxt": "LENGTH",
    "InspectionSpecificationStatus": "2",
    "InspSpecCreatedByUser": "QM_PLANNER",
    "InspSpecCreationDate": "/Date(1704067200000)/",
    "InspSpecIsQuantitative": true,
    "InspSpecIsMeasuredValueRqd": "X",
    "InspSpecIsUpperLimitRequired": "X",
    "InspSpecIsLowerLimitRequired": "X",
    "InspSpecIsDestructive": "",
    "InspSpecIsSamplingProcedRqd": "X",
    "InspSpecDecimalPlaces": 1,
    "InspectionSpecificationUnit": "MM",
    "InspSpecificationUnitISOCode": "MMT",
    "InspSpecTargetValue": "100.0",
    "InspSpecHasTargetValue": "X",
    "InspSpecLowerLimit": "99.5",
    "InspSpecHasLowerLimit": "X",
    "InspSpecUpperLimit": "100.5",
    "InspSpecHasUpperLimit": "X",
    "CharacteristicInternalID": ""
  }
}
```

</div>

</details>

<details>
<summary>listTextsOfA_InspectionSpecification</summary>

<div>

Retrieves the language-dependent texts of a specific master inspection characteristic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionSpecification` | `string` | Yes | Master inspection characteristic (e.g., `"LENGTH"`). |
| `InspectionSpecificationVersion` | `string` | Yes | Version number of the master inspection characteristic (e.g., `"000001"`). |
| `InspectionSpecificationPlant` | `string` | Yes | Plant for the master inspection characteristic (e.g., `"1010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_InspectionSpecificationQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionSpecificationTextWrapper|error`

Sample code:

```ballerina
masterinspchar:CollectionOfA_InspectionSpecificationTextWrapper texts = check masterinspcharClient->listTextsOfA_InspectionSpecification(
    "LENGTH",
    "000001",
    "1010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionSpecification": "LENGTH",
        "InspectionSpecificationVersion": "000001",
        "InspectionSpecificationPlant": "1010",
        "Language": "EN",
        "InspectionSpecificationText": "Overall length"
      },
      {
        "InspectionSpecification": "LENGTH",
        "InspectionSpecificationVersion": "000001",
        "InspectionSpecificationPlant": "1010",
        "Language": "DE",
        "InspectionSpecificationText": "Gesamtlänge"
      }
    ]
  }
}
```

</div>

</details>

#### Master inspection characteristic texts

<details>
<summary>listA_InspectionSpecificationTexts</summary>

<div>

Retrieves a collection of master inspection characteristic texts across all characteristics, for example all texts in one language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionSpecificationTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionSpecificationTextWrapper|error`

Sample code:

```ballerina
masterinspchar:CollectionOfA_InspectionSpecificationTextWrapper result = check masterinspcharClient->listA_InspectionSpecificationTexts(
    queries = {
        \$filter: "Language eq 'EN' and InspectionSpecificationPlant eq '1010'",
        \$top: 2,
        \$inlinecount: "allpages"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "__count": "42",
    "results": [
      {
        "InspectionSpecification": "DIAMETER",
        "InspectionSpecificationVersion": "000001",
        "InspectionSpecificationPlant": "1010",
        "Language": "EN",
        "InspectionSpecificationText": "Outer diameter"
      },
      {
        "InspectionSpecification": "LENGTH",
        "InspectionSpecificationVersion": "000001",
        "InspectionSpecificationPlant": "1010",
        "Language": "EN",
        "InspectionSpecificationText": "Overall length"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspectionSpecificationText</summary>

<div>

Retrieves the text of a master inspection characteristic in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionSpecification` | `string` | Yes | Master inspection characteristic (e.g., `"LENGTH"`). |
| `InspectionSpecificationVersion` | `string` | Yes | Version number of the master inspection characteristic (e.g., `"000001"`). |
| `InspectionSpecificationPlant` | `string` | Yes | Plant for the master inspection characteristic (e.g., `"1010"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionSpecificationTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionSpecificationTextWrapper|error`

Sample code:

```ballerina
masterinspchar:A_InspectionSpecificationTextWrapper text = check masterinspcharClient->getA_InspectionSpecificationText(
    "LENGTH",
    "000001",
    "1010",
    "EN"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionSpecification": "LENGTH",
    "InspectionSpecificationVersion": "000001",
    "InspectionSpecificationPlant": "1010",
    "Language": "EN",
    "InspectionSpecificationText": "Overall length"
  }
}
```

</div>

</details>

<details>
<summary>getInspectionSpecificationOfA_InspectionSpecificationText</summary>

<div>

Retrieves the master inspection characteristic that a specific text belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionSpecification` | `string` | Yes | Master inspection characteristic (e.g., `"LENGTH"`). |
| `InspectionSpecificationVersion` | `string` | Yes | Version number of the master inspection characteristic (e.g., `"000001"`). |
| `InspectionSpecificationPlant` | `string` | Yes | Plant for the master inspection characteristic (e.g., `"1010"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetInspectionSpecificationOfA_InspectionSpecificationTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionSpecificationWrapper|error`

Sample code:

```ballerina
masterinspchar:A_InspectionSpecificationWrapper characteristic = check masterinspcharClient->getInspectionSpecificationOfA_InspectionSpecificationText(
    "LENGTH",
    "000001",
    "1010",
    "EN",
    queries = {
        \$select: ["InspectionSpecification", "InspectionSpecificationStatus", "InspSpecTargetValue", "InspectionSpecificationUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionSpecification": "LENGTH",
    "InspectionSpecificationStatus": "2",
    "InspSpecTargetValue": "100.0",
    "InspectionSpecificationUnit": "MM"
  }
}
```

</div>

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

<div>

Sends multiple OData read requests as a single HTTP `$batch` call, reducing round trips to the SAP server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_mic001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspectionSpecification(InspectionSpecification='LENGTH',InspectionSpecificationVersion='000001',InspectionSpecificationPlant='1010') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspectionSpecification(InspectionSpecification='LENGTH',InspectionSpecificationVersion='000001',InspectionSpecificationPlant='1010')/to_Text HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check masterinspcharClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</div>

</details>
