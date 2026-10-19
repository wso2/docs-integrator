---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_salesorganization_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides read access to SAP S/4HANA sales organization master data via the API_SALESORGANIZATION_SRV OData v2 service. |

---

## Client

Provides read access to SAP S/4HANA sales organization master data via the API_SALESORGANIZATION_SRV OData v2 service.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | SAP user credentials; provide `username` and `password`. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `http1Settings` | `ClientHttp1Settings` | `()` | HTTP/1.x client settings including keep-alive, chunking, and proxy. |
| `http2Settings` | `http:ClientHttp2Settings` | `()` | HTTP/2 client settings. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Forwarded header handling mode. |
| `poolConfig` | `http:PoolConfiguration` | `()` | HTTP connection pool configuration. |
| `cache` | `http:CacheConfig` | `()` | HTTP response caching configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Compression mode for requests and responses. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `responseLimits` | `http:ResponseLimitConfigs` | `()` | Limits for response header and body sizes. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable or disable constraint validation on response records. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_salesorganization_srv as salesOrg;

configurable string hostname = ?;
configurable int port = 443;
configurable string username = ?;
configurable string password = ?;

salesOrg:Client salesOrgClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    hostname,
    port
);
```

### Operations

#### Sales organization

<details>
<summary>listA_SalesOrganizations</summary>

Retrieves a collection of sales organization records, with optional OData filtering, ordering, pagination, field selection, and expansion of related texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `$top` | `int` | No | Limits the number of records returned. |
| `$skip` | `int` | No | Number of records to skip for pagination. |
| `$filter` | `string` | No | OData filter expression (e.g., `"CompanyCode eq '1000'"`). |
| `$orderby` | `A_SalesOrganizationOrderByOptions` | No | Array of fields and sort directions for ordering results. |
| `$select` | `A_SalesOrganizationSelectOptions` | No | Array of field names to include in the response. |
| `$expand` | `A_SalesOrganizationExpandOptions` | No | Navigation properties to expand inline (e.g., `["to_Text"]`). |
| `$inlinecount` | `"allpages"\|"none"` | No | Include total result count in the response. |

Returns: `CollectionOfA_SalesOrganizationWrapper|error`

Sample code:

```ballerina
salesOrg:CollectionOfA_SalesOrganizationWrapper result = check salesOrgClient->listA_SalesOrganizations(
    queries = {
        $top: 10,
        $filter: "CompanyCode eq '1000'",
        $select: ["SalesOrganization", "SalesOrganizationCurrency", "CompanyCode"]
    }
);
salesOrg:A_SalesOrganization[]? records = result.d?.results;
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrganization": "1000",
        "SalesOrganizationCurrency": "USD",
        "CompanyCode": "1000",
        "IntercompanyBillingCustomer": null
      },
      {
        "SalesOrganization": "2000",
        "SalesOrganizationCurrency": "EUR",
        "CompanyCode": "1000",
        "IntercompanyBillingCustomer": null
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesOrganization</summary>

Retrieves a single sales organization record by its unique key (`SalesOrganization` ID).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrganization` | `string` | Yes | The four-character sales organization key (e.g., `"1000"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `$select` | `A_SalesOrganizationSelectOptions` | No | Array of field names to include in the response. |
| `$expand` | `A_SalesOrganizationExpandOptions` | No | Navigation properties to expand inline (e.g., `["to_Text"]`). |

Returns: `A_SalesOrganizationWrapper|error`

Sample code:

```ballerina
salesOrg:A_SalesOrganizationWrapper result = check salesOrgClient->getA_SalesOrganization("1000");
salesOrg:A_SalesOrganization? org = result.d;
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrganization": "1000",
    "SalesOrganizationCurrency": "USD",
    "CompanyCode": "1000",
    "IntercompanyBillingCustomer": null,
    "to_Text": {
      "results": []
    }
  }
}
```

</details>

#### Sales organization text

<details>
<summary>listA_SalesOrganizationTexts</summary>

Retrieves a collection of sales organization text records (multilingual names), with optional OData filtering, ordering, pagination, and field selection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `$top` | `int` | No | Limits the number of records returned. |
| `$skip` | `int` | No | Number of records to skip for pagination. |
| `$filter` | `string` | No | OData filter expression (e.g., `"Language eq 'EN'"`). |
| `$orderby` | `A_SalesOrganizationTextOrderByOptions` | No | Array of fields and sort directions for ordering results. |
| `$select` | `A_SalesOrganizationTextSelectOptions` | No | Array of field names to include in the response. |
| `$expand` | `A_SalesOrganizationTextExpandOptions` | No | Navigation properties to expand inline (e.g., `["to_SalesOrganization"]`). |
| `$inlinecount` | `"allpages"\|"none"` | No | Include total result count in the response. |

Returns: `CollectionOfA_SalesOrganizationTextWrapper|error`

Sample code:

```ballerina
salesOrg:CollectionOfA_SalesOrganizationTextWrapper result = check salesOrgClient->listA_SalesOrganizationTexts(
    queries = {
        $filter: "Language eq 'EN'",
        $select: ["SalesOrganization", "Language", "SalesOrganizationName"]
    }
);
salesOrg:A_SalesOrganizationText[]? textRecords = result.d?.results;
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrganization": "1000",
        "Language": "EN",
        "SalesOrganizationName": "Sales Organization US"
      },
      {
        "SalesOrganization": "2000",
        "Language": "EN",
        "SalesOrganizationName": "Sales Organization Europe"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesOrganizationText</summary>

Retrieves a single sales organization text record by its composite key (`SalesOrganization` and `Language`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrganization` | `string` | Yes | The four-character sales organization key (e.g., `"1000"`). |
| `Language` | `string` | Yes | The two-character ISO language code (e.g., `"EN"`, `"DE"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `$select` | `A_SalesOrganizationTextSelectOptions` | No | Array of field names to include in the response. |
| `$expand` | `A_SalesOrganizationTextExpandOptions` | No | Navigation properties to expand inline (e.g., `["to_SalesOrganization"]`). |

Returns: `A_SalesOrganizationTextWrapper|error`

Sample code:

```ballerina
salesOrg:A_SalesOrganizationTextWrapper result = check salesOrgClient->getA_SalesOrganizationText(
    "1000",
    "EN"
);
salesOrg:A_SalesOrganizationText? textRecord = result.d;
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrganization": "1000",
    "Language": "EN",
    "SalesOrganizationName": "Sales Organization US"
  }
}
```

</details>

<details>
<summary>listTextsOfA_SalesOrganization</summary>

Retrieves all text records (multilingual names) associated with a specific sales organization, navigating the `to_Text` relationship.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrganization` | `string` | Yes | The four-character sales organization key (e.g., `"1000"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `$top` | `int` | No | Limits the number of records returned. |
| `$skip` | `int` | No | Number of records to skip for pagination. |
| `$filter` | `string` | No | OData filter expression. |
| `$orderby` | `A_SalesOrganizationTextOrderByOptions` | No | Array of fields and sort directions for ordering results. |
| `$select` | `A_SalesOrganizationTextSelectOptions` | No | Array of field names to include in the response. |
| `$expand` | `A_SalesOrganizationTextExpandOptions` | No | Navigation properties to expand inline. |
| `$inlinecount` | `"allpages"\|"none"` | No | Include total result count in the response. |

Returns: `CollectionOfA_SalesOrganizationTextWrapper|error`

Sample code:

```ballerina
salesOrg:CollectionOfA_SalesOrganizationTextWrapper result = check salesOrgClient->listTextsOfA_SalesOrganization("1000");
salesOrg:A_SalesOrganizationText[]? texts = result.d?.results;
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesOrganization": "1000",
        "Language": "EN",
        "SalesOrganizationName": "Sales Organization US"
      },
      {
        "SalesOrganization": "1000",
        "Language": "DE",
        "SalesOrganizationName": "Verkaufsorganisation US"
      }
    ]
  }
}
```

</details>

<details>
<summary>getSalesOrganizationOfA_SalesOrganizationText</summary>

Navigates from a sales organization text record back to the parent sales organization entity using the `to_SalesOrganization` navigation property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesOrganization` | `string` | Yes | The four-character sales organization key (e.g., `"1000"`). |
| `Language` | `string` | Yes | The two-character ISO language code (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `$select` | `A_SalesOrganizationSelectOptions` | No | Array of field names to include in the response. |
| `$expand` | `A_SalesOrganizationExpandOptions` | No | Navigation properties to expand inline. |

Returns: `A_SalesOrganizationWrapper|error`

Sample code:

```ballerina
salesOrg:A_SalesOrganizationWrapper result = check salesOrgClient->getSalesOrganizationOfA_SalesOrganizationText(
    "1000",
    "EN"
);
salesOrg:A_SalesOrganization? org = result.d;
```

Sample response:

```ballerina
{
  "d": {
    "SalesOrganization": "1000",
    "SalesOrganizationCurrency": "USD",
    "CompanyCode": "1000",
    "IntercompanyBillingCustomer": null
  }
}
```

</details>
