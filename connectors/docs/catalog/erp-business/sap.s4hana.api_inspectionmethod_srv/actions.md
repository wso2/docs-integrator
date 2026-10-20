---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_inspectionmethod_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read-only access to SAP S/4HANA quality management inspection methods and their texts via the `API_INSPECTIONMETHOD_SRV` OData API. |

---

## Client

Provides read-only access to SAP S/4HANA quality management inspection methods and their texts via the `API_INSPECTIONMETHOD_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_INSPECTIONMETHOD_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_inspectionmethod_srv as inspectionmethod;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

inspectionmethod:Client inspectionmethodClient = check new (
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

All entity operations of this API are read-only. An inspection method (`A_InspectionMethod`) is identified by three key fields: `InspectionMethod`, `InspectionMethodVersion` and `InspectionMethodPlant`. An inspection method text (`A_InspectionMethodText`) adds the `Language` key. Note that the text operations take the plant as the first key, while the inspection method operations take it as the last key.

In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers.

#### Inspection methods

<details>
<summary>listA_InspectionMethods</summary>

Retrieves a collection of inspection methods with their validity, status, inspector qualification and administrative data. Expand `to_Text` to include the texts of each method.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionMethodsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionMethodWrapper|error`

Sample code:

```ballerina
inspectionmethod:CollectionOfA_InspectionMethodWrapper result = check inspectionmethodClient->listA_InspectionMethods(
    queries = {
        \$filter: "InspectionMethodPlant eq '1010' and InspectionMethodStatus eq '2'",
        \$top: 2,
        \$orderby: ["InspectionMethod"],
        \$select: ["InspectionMethod", "InspectionMethodVersion", "InspectionMethodPlant", "InspectionMethodValidFromDate", "InspectionMethodStatus", "InspectorQualification"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionMethod": "HARDNESS",
        "InspectionMethodVersion": "000001",
        "InspectionMethodPlant": "1010",
        "InspectionMethodValidFromDate": "/Date(1704067200000)/",
        "InspectionMethodStatus": "2",
        "InspectorQualification": "QM01"
      },
      {
        "InspectionMethod": "VISUAL01",
        "InspectionMethodVersion": "000002",
        "InspectionMethodPlant": "1010",
        "InspectionMethodValidFromDate": "/Date(1717200000000)/",
        "InspectionMethodStatus": "2",
        "InspectorQualification": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionMethod</summary>

Retrieves a specific version of an inspection method in a plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionMethod` | `string` | Yes | Inspection method (up to 8 characters, e.g., `"HARDNESS"`). |
| `InspectionMethodVersion` | `string` | Yes | Version number of the inspection method (up to 6 characters, e.g., `"000001"`). |
| `InspectionMethodPlant` | `string` | Yes | Plant for the inspection method (up to 4 characters, e.g., `"1010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionMethodQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionMethodWrapper|error`

Sample code:

```ballerina
inspectionmethod:A_InspectionMethodWrapper method = check inspectionmethodClient->getA_InspectionMethod(
    "HARDNESS",
    "000001",
    "1010"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionMethod": "HARDNESS",
    "InspectionMethodVersion": "000001",
    "InspectionMethodPlant": "1010",
    "InspectionMethodValidFromDate": "/Date(1704067200000)/",
    "InspectionMethodSearchField": "HARDNESS",
    "InspectionMethodStatus": "2",
    "InspMethInformationField1": "Rockwell hardness test, scale C",
    "InspMethInformationField2": "Three indentations per sample",
    "InspMethInformationField3": "",
    "QltyMstrDataAuthorizationGroup": "",
    "InspectorQualification": "QM01",
    "CreatedByUser": "CB9980000012",
    "CreationDate": "/Date(1703721600000)/",
    "LastChangedByUser": "CB9980000012",
    "LastChangeDate": "/Date(1704067200000)/",
    "LinkedSAPObjectKey": ""
  }
}
```

</details>

<details>
<summary>listTextsOfA_InspectionMethod</summary>

Retrieves the language-dependent texts of a specific inspection method version, through the `to_Text` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionMethod` | `string` | Yes | Inspection method (up to 8 characters, e.g., `"HARDNESS"`). |
| `InspectionMethodVersion` | `string` | Yes | Version number of the inspection method (up to 6 characters, e.g., `"000001"`). |
| `InspectionMethodPlant` | `string` | Yes | Plant for the inspection method (up to 4 characters, e.g., `"1010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListTextsOfA_InspectionMethodQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionMethodTextWrapper|error`

Sample code:

```ballerina
inspectionmethod:CollectionOfA_InspectionMethodTextWrapper texts = check inspectionmethodClient->listTextsOfA_InspectionMethod(
    "HARDNESS",
    "000001",
    "1010",
    queries = {
        \$select: ["Language", "InspectionMethodText", "InspMethodHasLongText"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Language": "DE",
        "InspectionMethodText": "Härteprüfung nach Rockwell",
        "InspMethodHasLongText": false
      },
      {
        "Language": "EN",
        "InspectionMethodText": "Rockwell hardness test",
        "InspMethodHasLongText": true
      }
    ]
  }
}
```

</details>

#### Inspection method texts

<details>
<summary>listA_InspectionMethodTexts</summary>

Retrieves a collection of inspection method texts across all inspection methods, one record per method version and language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionMethodTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionMethodTextWrapper|error`

Sample code:

```ballerina
inspectionmethod:CollectionOfA_InspectionMethodTextWrapper result = check inspectionmethodClient->listA_InspectionMethodTexts(
    queries = {
        \$filter: "Language eq 'EN' and InspectionMethodPlant eq '1010'",
        \$top: 2,
        \$inlinecount: "allpages"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "__count": "37",
    "results": [
      {
        "InspectionMethodPlant": "1010",
        "InspectionMethod": "HARDNESS",
        "InspectionMethodVersion": "000001",
        "Language": "EN",
        "InspectionMethodText": "Rockwell hardness test",
        "InspMethodHasLongText": true
      },
      {
        "InspectionMethodPlant": "1010",
        "InspectionMethod": "VISUAL01",
        "InspectionMethodVersion": "000002",
        "Language": "EN",
        "InspectionMethodText": "Visual inspection of surface",
        "InspMethodHasLongText": false
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionMethodText</summary>

Retrieves the text of a specific inspection method version in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionMethodPlant` | `string` | Yes | Plant for the inspection method (up to 4 characters, e.g., `"1010"`). |
| `InspectionMethod` | `string` | Yes | Inspection method (up to 8 characters, e.g., `"HARDNESS"`). |
| `InspectionMethodVersion` | `string` | Yes | Version number of the inspection method text (up to 6 characters, e.g., `"000001"`). |
| `Language` | `string` | Yes | Language key (up to 2 characters, e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionMethodTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionMethodTextWrapper|error`

Sample code:

```ballerina
inspectionmethod:A_InspectionMethodTextWrapper text = check inspectionmethodClient->getA_InspectionMethodText(
    "1010",
    "HARDNESS",
    "000001",
    "EN"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionMethodPlant": "1010",
    "InspectionMethod": "HARDNESS",
    "InspectionMethodVersion": "000001",
    "Language": "EN",
    "InspectionMethodText": "Rockwell hardness test",
    "InspMethodHasLongText": true
  }
}
```

</details>

<details>
<summary>getInspectionMethodOfA_InspectionMethodText</summary>

Retrieves the inspection method that a specific inspection method text belongs to, through the `to_InspectionMethod` navigation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionMethodPlant` | `string` | Yes | Plant for the inspection method (up to 4 characters, e.g., `"1010"`). |
| `InspectionMethod` | `string` | Yes | Inspection method (up to 8 characters, e.g., `"HARDNESS"`). |
| `InspectionMethodVersion` | `string` | Yes | Version number of the inspection method text (up to 6 characters, e.g., `"000001"`). |
| `Language` | `string` | Yes | Language key (up to 2 characters, e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetInspectionMethodOfA_InspectionMethodTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionMethodWrapper|error`

Sample code:

```ballerina
inspectionmethod:A_InspectionMethodWrapper method = check inspectionmethodClient->getInspectionMethodOfA_InspectionMethodText(
    "1010",
    "HARDNESS",
    "000001",
    "EN",
    queries = {
        \$select: ["InspectionMethod", "InspectionMethodVersion", "InspectionMethodPlant", "InspectionMethodStatus", "InspectionMethodValidFromDate"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionMethod": "HARDNESS",
    "InspectionMethodVersion": "000001",
    "InspectionMethodPlant": "1010",
    "InspectionMethodStatus": "2",
    "InspectionMethodValidFromDate": "/Date(1704067200000)/"
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

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
string boundary = "batch_im001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspectionMethod(InspectionMethod='HARDNESS',InspectionMethodVersion='000001',InspectionMethodPlant='1010') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspectionMethod(InspectionMethod='HARDNESS',InspectionMethodVersion='000001',InspectionMethodPlant='1010')/to_Text HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check inspectionmethodClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
