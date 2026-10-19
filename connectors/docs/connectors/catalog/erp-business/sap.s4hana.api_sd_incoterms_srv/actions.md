---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_sd_incoterms_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read access to SAP S/4HANA Incoterms classifications, versions, and their multilingual text descriptions via OData. |

---

## Client

Provides read access to SAP S/4HANA Incoterms classifications, versions, and their multilingual text descriptions via OData.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | Basic authentication credentials containing `username` and `password` for the SAP S/4HANA Communication User. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig?` | `()` | Retry configuration for transient request failures. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig?` | `()` | HTTP proxy server configuration. |
| `validation` | `boolean` | `true` | Enables constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_sd_incoterms_srv as incoterms;

configurable string username = ?;
configurable string password = ?;
configurable string hostname = ?;

incoterms:Client incotermsClient = check new (
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

#### Incoterms classifications

<details>
<summary>listA_IncotermsClassifications</summary>

Reads the IDs and descriptions of all Incoterms classifications.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListA_IncotermsClassificationsQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_IncotermsClassificationWrapper|error`

Sample code:

```ballerina
incoterms:CollectionOfA_IncotermsClassificationWrapper result =
    check incotermsClient->listA_IncotermsClassifications();
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "IncotermsClassification": "CFR",
        "LocationIsMandatory": false,
        "to_IncotermsClassificationText": {"__deferred": {"uri": "..."}}
      },
      {
        "IncotermsClassification": "CIF",
        "LocationIsMandatory": false,
        "to_IncotermsClassificationText": {"__deferred": {"uri": "..."}}
      },
      {
        "IncotermsClassification": "EXW",
        "LocationIsMandatory": true,
        "to_IncotermsClassificationText": {"__deferred": {"uri": "..."}}
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_IncotermsClassification</summary>

Reads the ID and description of a specific Incoterms classification identified by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `IncotermsClassification` | `string` | Yes | The Incoterms classification code (up to 3 characters, e.g., `"CIF"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetA_IncotermsClassificationQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `A_IncotermsClassificationWrapper|error`

Sample code:

```ballerina
incoterms:A_IncotermsClassificationWrapper result =
    check incotermsClient->getA_IncotermsClassification("CIF");
```

Sample response:

```ballerina
{
  "d": {
    "IncotermsClassification": "CIF",
    "LocationIsMandatory": false,
    "to_IncotermsClassificationText": {
      "__deferred": {"uri": "https://my-tenant.s4hana.cloud.sap/sap/opu/odata/sap/API_SD_INCOTERMS_SRV/A_IncotermsClassification('CIF')/to_IncotermsClassificationText"}
    }
  }
}
```

</details>

#### Incoterms classification texts

<details>
<summary>listA_IncotermsClassificationTexts</summary>

Reads the text descriptions of all Incoterms classifications across all available languages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListA_IncotermsClassificationTextsQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_IncotermsClassificationTextWrapper|error`

Sample code:

```ballerina
incoterms:CollectionOfA_IncotermsClassificationTextWrapper result =
    check incotermsClient->listA_IncotermsClassificationTexts();
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {"IncotermsClassification": "CFR", "Language": "EN", "IncotermsClassificationName": "Cost and Freight"},
      {"IncotermsClassification": "CIF", "Language": "EN", "IncotermsClassificationName": "Cost Insurance Freight"},
      {"IncotermsClassification": "CIF", "Language": "DE", "IncotermsClassificationName": "Kosten, Versicherung und Fracht"},
      {"IncotermsClassification": "EXW", "Language": "EN", "IncotermsClassificationName": "Ex Works"}
    ]
  }
}
```

</details>

<details>
<summary>getA_IncotermsClassificationText</summary>

Reads the text description of a specific Incoterms classification in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `IncotermsClassification` | `string` | Yes | The Incoterms classification code (e.g., `"CIF"`). |
| `Language` | `string` | Yes | The two-character SAP language code (e.g., `"EN"` for English, `"DE"` for German). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetA_IncotermsClassificationTextQueries` | No | OData query options: `$select`. |

Returns: `A_IncotermsClassificationTextWrapper|error`

Sample code:

```ballerina
incoterms:A_IncotermsClassificationTextWrapper result =
    check incotermsClient->getA_IncotermsClassificationText("CIF", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "IncotermsClassification": "CIF",
    "Language": "EN",
    "IncotermsClassificationName": "Cost Insurance Freight"
  }
}
```

</details>

<details>
<summary>listIncotermsClassificationTextsOfA_IncotermsClassification</summary>

Reads all language descriptions for a specific Incoterms classification via the navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `IncotermsClassification` | `string` | Yes | The Incoterms classification code (e.g., `"CIF"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListIncotermsClassificationTextsOfA_IncotermsClassificationQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_IncotermsClassificationTextWrapper|error`

Sample code:

```ballerina
incoterms:CollectionOfA_IncotermsClassificationTextWrapper result =
    check incotermsClient->listIncotermsClassificationTextsOfA_IncotermsClassification("CIF");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {"IncotermsClassification": "CIF", "Language": "DE", "IncotermsClassificationName": "Kosten, Versicherung und Fracht"},
      {"IncotermsClassification": "CIF", "Language": "EN", "IncotermsClassificationName": "Cost Insurance Freight"},
      {"IncotermsClassification": "CIF", "Language": "FR", "IncotermsClassificationName": "Coût, assurance et fret"}
    ]
  }
}
```

</details>

#### Incoterms versions

<details>
<summary>listA_IncotermsVersions</summary>

Reads the IDs and descriptions of all available Incoterms versions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListA_IncotermsVersionsQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_IncotermsVersionWrapper|error`

Sample code:

```ballerina
incoterms:CollectionOfA_IncotermsVersionWrapper result =
    check incotermsClient->listA_IncotermsVersions();
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "IncotermsVersion": "2010",
        "to_IncotermsVersionText": {"__deferred": {"uri": "..."}}
      },
      {
        "IncotermsVersion": "2020",
        "to_IncotermsVersionText": {"__deferred": {"uri": "..."}}
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_IncotermsVersion</summary>

Reads the ID and description of a specific Incoterms version by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `IncotermsVersion` | `string` | Yes | The Incoterms version code (up to 4 characters, e.g., `"2020"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetA_IncotermsVersionQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `A_IncotermsVersionWrapper|error`

Sample code:

```ballerina
incoterms:A_IncotermsVersionWrapper result =
    check incotermsClient->getA_IncotermsVersion("2020");
```

Sample response:

```ballerina
{
  "d": {
    "IncotermsVersion": "2020",
    "to_IncotermsVersionText": {
      "__deferred": {"uri": "https://my-tenant.s4hana.cloud.sap/sap/opu/odata/sap/API_SD_INCOTERMS_SRV/A_IncotermsVersion('2020')/to_IncotermsVersionText"}
    }
  }
}
```

</details>

#### Incoterms version texts

<details>
<summary>listA_IncotermsVersionTexts</summary>

Reads the text descriptions of all Incoterms versions across all available languages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListA_IncotermsVersionTextsQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_IncotermsVersionTextWrapper|error`

Sample code:

```ballerina
incoterms:CollectionOfA_IncotermsVersionTextWrapper result =
    check incotermsClient->listA_IncotermsVersionTexts();
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {"IncotermsVersion": "2010", "Language": "EN", "IncotermsVersionName": "Incoterms 2010"},
      {"IncotermsVersion": "2010", "Language": "DE", "IncotermsVersionName": "Incoterms 2010"},
      {"IncotermsVersion": "2020", "Language": "EN", "IncotermsVersionName": "Incoterms 2020"},
      {"IncotermsVersion": "2020", "Language": "DE", "IncotermsVersionName": "Incoterms 2020"}
    ]
  }
}
```

</details>

<details>
<summary>getA_IncotermsVersionText</summary>

Reads the text description of a specific Incoterms version in a specific language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `IncotermsVersion` | `string` | Yes | The Incoterms version code (e.g., `"2020"`). |
| `Language` | `string` | Yes | The two-character SAP language code (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetA_IncotermsVersionTextQueries` | No | OData query options: `$select`. |

Returns: `A_IncotermsVersionTextWrapper|error`

Sample code:

```ballerina
incoterms:A_IncotermsVersionTextWrapper result =
    check incotermsClient->getA_IncotermsVersionText("2020", "EN");
```

Sample response:

```ballerina
{
  "d": {
    "IncotermsVersion": "2020",
    "Language": "EN",
    "IncotermsVersionName": "Incoterms 2020"
  }
}
```

</details>

<details>
<summary>listIncotermsVersionTextsOfA_IncotermsVersion</summary>

Reads all language descriptions for a specific Incoterms version via the navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `IncotermsVersion` | `string` | Yes | The Incoterms version code (e.g., `"2020"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `ListIncotermsVersionTextsOfA_IncotermsVersionQueries` | No | OData query options: `$top`, `$skip`, `$filter`, `$orderby`, `$inlinecount`, `$select`. |

Returns: `CollectionOfA_IncotermsVersionTextWrapper|error`

Sample code:

```ballerina
incoterms:CollectionOfA_IncotermsVersionTextWrapper result =
    check incotermsClient->listIncotermsVersionTextsOfA_IncotermsVersion("2020");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {"IncotermsVersion": "2020", "Language": "DE", "IncotermsVersionName": "Incoterms 2020"},
      {"IncotermsVersion": "2020", "Language": "EN", "IncotermsVersionName": "Incoterms 2020"},
      {"IncotermsVersion": "2020", "Language": "FR", "IncotermsVersionName": "Incoterms 2020"}
    ]
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
| `request` | `http:Request` | Yes | An `http:Request` object containing the multipart/mixed batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the outer batch request. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_abc123";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_IncotermsClassification HTTP/1.1\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_IncotermsVersion HTTP/1.1\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check incotermsClient->performBatchOperation(batchRequest);
```

Sample response:

```ballerina
HTTP/1.1 200 OK
Content-Type: multipart/mixed; boundary=AAD136757C5CF75E21C04F59B

--AAD136757C5CF75E21C04F59B
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json

{"d":{"results":[{"IncotermsClassification":"CIF","LocationIsMandatory":false},{"IncotermsClassification":"EXW","LocationIsMandatory":true}]}}

--AAD136757C5CF75E21C04F59B
Content-Type: application/http
Content-Transfer-Encoding: binary

HTTP/1.1 200 OK
Content-Type: application/json

{"d":{"results":[{"IncotermsVersion":"2010"},{"IncotermsVersion":"2020"}]}}

--AAD136757C5CF75E21C04F59B--
```

</details>
