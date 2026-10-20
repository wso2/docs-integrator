---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_charcattributecatalog_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read-only access to the SAP S/4HANA characteristic attribute catalog (selected sets, their codes and texts) via the `API_CHARCATTRIBUTECATALOG_SRV` OData API. |

---

## Client

Provides read-only access to the SAP S/4HANA characteristic attribute catalog (selected sets, their codes and texts) via the `API_CHARCATTRIBUTECATALOG_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_CHARCATTRIBUTECATALOG_SRV` from these values.

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
import ballerinax/sap.s4hana.api_charcattributecatalog_srv as charattributecat;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

charattributecat:Client charattributecatClient = check new (
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

All operations of this API are read-only. A selected set is identified by its plant (`SelectedCodeSetPlant`, up to 4 characters) and its name (`SelectedCodeSet`, up to 8 characters). A code in a selected set is further identified by its code group (`CharacteristicAttributeCodeGrp`, up to 8 characters) and code (`CharacteristicAttributeCode`, up to 4 characters). Texts add the language key (`Language`, up to 2 characters).

This API has no navigation properties, so the query records do not offer `$expand`. In the query records, `$select` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers.

#### Selected sets

<details>
<summary>listA_CharcAttribSeldCodeSets</summary>

Retrieves a collection of selected sets of the characteristic attribute catalog, with the status of each set and who created and last changed it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CharcAttribSeldCodeSetsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CharcAttribSeldCodeSetWrapper|error`

Sample code:

```ballerina
charattributecat:CollectionOfA_CharcAttribSeldCodeSetWrapper result = check charattributecatClient->listA_CharcAttribSeldCodeSets(
    queries = {
        \$filter: "SelectedCodeSetPlant eq '1010'",
        \$top: 2,
        \$orderby: ["SelectedCodeSet"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SelectedCodeSetPlant": "1010",
        "SelectedCodeSet": "COLOR",
        "InspectionSelectedSetStatus": "2",
        "CharcAttribSeldSetCreatedBy": "QM_PLANNER",
        "CharcAttribSeldSetCrtedOn": "/Date(1741910400000)/",
        "CharcAttribSeldSetLastChgdBy": "QM_PLANNER",
        "CharcAttribSeldSetLastChgdOn": "/Date(1788307200000)/"
      },
      {
        "SelectedCodeSetPlant": "1010",
        "SelectedCodeSet": "SURFACE",
        "InspectionSelectedSetStatus": "2",
        "CharcAttribSeldSetCreatedBy": "QM_PLANNER",
        "CharcAttribSeldSetCrtedOn": "/Date(1741910400000)/",
        "CharcAttribSeldSetLastChgdBy": null,
        "CharcAttribSeldSetLastChgdOn": null
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CharcAttribSeldCodeSet</summary>

Retrieves a single selected set of the characteristic attribute catalog by plant and selected set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SelectedCodeSetPlant` | `string` | Yes | Plant of the selected set (e.g., `"1010"`). |
| `SelectedCodeSet` | `string` | Yes | Selected set (e.g., `"SURFACE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CharcAttribSeldCodeSetQueries` | No | OData query parameters: `$select`. |

Returns: `A_CharcAttribSeldCodeSetWrapper|error`

Sample code:

```ballerina
charattributecat:A_CharcAttribSeldCodeSetWrapper codeSet = check charattributecatClient->getA_CharcAttribSeldCodeSet(
    "1010",
    "SURFACE"
);
```

Sample response:

```ballerina
{
  "d": {
    "SelectedCodeSetPlant": "1010",
    "SelectedCodeSet": "SURFACE",
    "InspectionSelectedSetStatus": "2",
    "CharcAttribSeldSetCreatedBy": "QM_PLANNER",
    "CharcAttribSeldSetCrtedOn": "/Date(1741910400000)/",
    "CharcAttribSeldSetLastChgdBy": null,
    "CharcAttribSeldSetLastChgdOn": null
  }
}
```

</details>

#### Selected set codes

<details>
<summary>listA_CharcAttribSeldSetCodes</summary>

Retrieves a collection of the codes and code groups assigned to selected sets, with the valuation (for example, `A` accepted or `R` rejected) and defect class of each code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CharcAttribSeldSetCodesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CharcAttribSeldSetCodeWrapper|error`

Sample code:

```ballerina
charattributecat:CollectionOfA_CharcAttribSeldSetCodeWrapper codes = check charattributecatClient->listA_CharcAttribSeldSetCodes(
    queries = {
        \$filter: "SelectedCodeSetPlant eq '1010' and SelectedCodeSet eq 'SURFACE'",
        \$select: ["CharacteristicAttributeCodeGrp", "CharacteristicAttributeCode", "CharcAttributeValuation", "DefectClass"],
        \$inlinecount: "allpages"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "__count": "2",
    "results": [
      {
        "CharacteristicAttributeCodeGrp": "SURFACE",
        "CharacteristicAttributeCode": "01",
        "CharcAttributeValuation": "A",
        "DefectClass": ""
      },
      {
        "CharacteristicAttributeCodeGrp": "SURFACE",
        "CharacteristicAttributeCode": "02",
        "CharcAttributeValuation": "R",
        "DefectClass": "02"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CharcAttribSeldSetCode</summary>

Retrieves a single code of a selected set, identified by plant, selected set, code group and code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SelectedCodeSetPlant` | `string` | Yes | Plant of the selected set (e.g., `"1010"`). |
| `SelectedCodeSet` | `string` | Yes | Selected set (e.g., `"SURFACE"`). |
| `CharacteristicAttributeCodeGrp` | `string` | Yes | Code group (e.g., `"SURFACE"`). |
| `CharacteristicAttributeCode` | `string` | Yes | Code (e.g., `"02"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CharcAttribSeldSetCodeQueries` | No | OData query parameters: `$select`. |

Returns: `A_CharcAttribSeldSetCodeWrapper|error`

Sample code:

```ballerina
charattributecat:A_CharcAttribSeldSetCodeWrapper code = check charattributecatClient->getA_CharcAttribSeldSetCode(
    "1010",
    "SURFACE",
    "SURFACE",
    "02"
);
```

Sample response:

```ballerina
{
  "d": {
    "SelectedCodeSetPlant": "1010",
    "SelectedCodeSet": "SURFACE",
    "CharacteristicAttributeCodeGrp": "SURFACE",
    "CharacteristicAttributeCode": "02",
    "CharcAttributeValuation": "R",
    "DefectClass": "02",
    "CharcAttribSeldSetCodeCrtedBy": "QM_PLANNER",
    "CharcAttribSeldSetCodeCrtedOn": "/Date(1741910400000)/",
    "CharcAttribSeldSetCodeChgdBy": null,
    "CharcAttribSeldSetCodeChgdOn": null
  }
}
```

</details>

#### Selected set texts

<details>
<summary>listA_CharcAttribSeldSetTs</summary>

Retrieves a collection of the language-dependent short texts of selected sets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CharcAttribSeldSetTsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CharcAttribSeldSetTWrapper|error`

Sample code:

```ballerina
charattributecat:CollectionOfA_CharcAttribSeldSetTWrapper setTexts = check charattributecatClient->listA_CharcAttribSeldSetTs(
    queries = {
        \$filter: "SelectedCodeSetPlant eq '1010' and Language eq 'EN'",
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SelectedCodeSetPlant": "1010",
        "SelectedCodeSet": "COLOR",
        "Language": "EN",
        "SelectedCodeSetText": "Color check"
      },
      {
        "SelectedCodeSetPlant": "1010",
        "SelectedCodeSet": "SURFACE",
        "Language": "EN",
        "SelectedCodeSetText": "Surface finish"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CharcAttribSeldSetT</summary>

Retrieves the short text of a selected set in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SelectedCodeSetPlant` | `string` | Yes | Plant of the selected set (e.g., `"1010"`). |
| `SelectedCodeSet` | `string` | Yes | Selected set (e.g., `"SURFACE"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CharcAttribSeldSetTQueries` | No | OData query parameters: `$select`. |

Returns: `A_CharcAttribSeldSetTWrapper|error`

Sample code:

```ballerina
charattributecat:A_CharcAttribSeldSetTWrapper setText = check charattributecatClient->getA_CharcAttribSeldSetT(
    "1010",
    "SURFACE",
    "EN"
);
```

Sample response:

```ballerina
{
  "d": {
    "SelectedCodeSetPlant": "1010",
    "SelectedCodeSet": "SURFACE",
    "Language": "EN",
    "SelectedCodeSetText": "Surface finish"
  }
}
```

</details>

#### Code texts

<details>
<summary>listA_CharcAttribSeldSetCodeTs</summary>

Retrieves a collection of the language-dependent texts of the codes in selected sets, for example to show inspectors the meaning of each code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CharcAttribSeldSetCodeTsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CharcAttribSeldSetCodeTWrapper|error`

Sample code:

```ballerina
charattributecat:CollectionOfA_CharcAttribSeldSetCodeTWrapper codeTexts = check charattributecatClient->listA_CharcAttribSeldSetCodeTs(
    queries = {
        \$filter: "SelectedCodeSetPlant eq '1010' and SelectedCodeSet eq 'SURFACE' and Language eq 'EN'",
        \$select: ["CharacteristicAttributeCode", "CharacteristicAttributeCodeTxt"],
        \$orderby: ["CharacteristicAttributeCode"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "CharacteristicAttributeCode": "01",
        "CharacteristicAttributeCodeTxt": "Smooth"
      },
      {
        "CharacteristicAttributeCode": "02",
        "CharacteristicAttributeCodeTxt": "Rough"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CharcAttribSeldSetCodeT</summary>

Retrieves the text of a single code in a selected set in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SelectedCodeSetPlant` | `string` | Yes | Plant of the selected set (e.g., `"1010"`). |
| `SelectedCodeSet` | `string` | Yes | Selected set (e.g., `"SURFACE"`). |
| `CharacteristicAttributeCodeGrp` | `string` | Yes | Code group (e.g., `"SURFACE"`). |
| `CharacteristicAttributeCode` | `string` | Yes | Code (e.g., `"01"`). |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CharcAttribSeldSetCodeTQueries` | No | OData query parameters: `$select`. |

Returns: `A_CharcAttribSeldSetCodeTWrapper|error`

Sample code:

```ballerina
charattributecat:A_CharcAttribSeldSetCodeTWrapper codeText = check charattributecatClient->getA_CharcAttribSeldSetCodeT(
    "1010",
    "SURFACE",
    "SURFACE",
    "01",
    "EN"
);
```

Sample response:

```ballerina
{
  "d": {
    "SelectedCodeSetPlant": "1010",
    "SelectedCodeSet": "SURFACE",
    "CharacteristicAttributeCodeGrp": "SURFACE",
    "CharacteristicAttributeCode": "01",
    "Language": "EN",
    "CharacteristicAttributeCodeTxt": "Smooth"
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
string boundary = "batch_cac001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CharcAttribSeldCodeSet(SelectedCodeSetPlant='1010',SelectedCodeSet='SURFACE') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CharcAttribSeldSetCode?$filter=SelectedCodeSetPlant%20eq%20'1010'%20and%20SelectedCodeSet%20eq%20'SURFACE' HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check charattributecatClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
