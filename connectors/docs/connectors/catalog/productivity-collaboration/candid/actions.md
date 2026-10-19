---
title: Actions
---

# Actions

The Candid connector spans 4 packages:
- `ballerinax/candid`
- `ballerinax/candid.charitycheckpdf`
- `ballerinax/candid.essentials`
- `ballerinax/candid.premier`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Essentials Client`](#essentials-client) | Search for nonprofits and look up available search filters. |
| [`Premier Client`](#premier-client) | Retrieve detailed nonprofit profiles and download PDF reports. |
| [`Charity Check PDF Client`](#charity-check-pdf-client) | Download Charity Check PDF reports for IRS compliance verification. |

---

## Essentials client

Search for nonprofits and look up available search filters.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subscriptionKey` | `string` | Required | Candid API subscription key for authentication. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Use lax data binding for responses. |

### Initializing the client

```ballerina
import ballerinax/candid.essentials;

configurable string subscriptionKey = ?;

essentials:ApiKeysConfig apiKeyConfig = {
    subscriptionKey: subscriptionKey
};

essentials:Client essentialsClient = check new (apiKeyConfig);
```

### Operations

#### Nonprofit search

<details>
<summary>Search nonprofits (v3)</summary>

Searches Candid's nonprofit database using the v3 Essentials API with keywords, filters, sorting, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `V3Query` | Yes | Search query with optional `searchTerms`, `size`, `from`, `sort`, and `filters`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `V3EssentialsResponse|error`

Sample code:

```ballerina
essentials:V3Query query = {
    searchTerms: "candid",
    size: 5,
    'from: 0
};
essentials:V3EssentialsResponse result = check essentialsClient->/v3.post(query);
```

Sample response:

```ballerina
{
  "took": 42,
  "code": 200,
  "resultsCount": 150,
  "pageCount": 30,
  "time": "2024-01-15T10:30:00Z",
  "hits": [
    {
      "organization": {
        "ein": "13-1837418",
        "organization_name": "Candid",
        "mission": "Every year, millions of nonprofits...",
        "bridge_id": "1234567890"
      },
      "geography": {
        "city": "New York",
        "state": "NY",
        "zip": "10003"
      },
      "financials": {
        "total_revenue": 50000000,
        "total_expenses": 48000000
      }
    }
  ]
}
```

</details>

<details>
<summary>Search nonprofits (v2)</summary>

Searches Candid's nonprofit database using the v2 Essentials API.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Query` | Yes | Search query with optional `searchTerms`, `size`, `from`, `sort`, and `filters`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `V2EssentialsResponse|error`

Sample code:

```ballerina
essentials:Query query = {
    searchTerms: "education",
    size: 10
};
essentials:V2EssentialsResponse result = check essentialsClient->/v2.post(query);
```

Sample response:

```ballerina
{
  "took": 35,
  "code": 200,
  "resultsCount": 500,
  "hits": [
    {
      "organization_name": "Education Foundation",
      "ein": "12-3456789",
      "city": "Boston",
      "state": "MA"
    }
  ]
}
```

</details>

<details>
<summary>Search nonprofits (v1)</summary>

Searches Candid's nonprofit database using the v1 Essentials API.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Query` | Yes | Search query with optional `searchTerms`, `size`, `from`, `sort`, and `filters`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `V1EssentialsResponse|error`

Sample code:

```ballerina
essentials:Query query = {
    searchTerms: "health"
};
essentials:V1EssentialsResponse result = check essentialsClient->/v1.post(query);
```

Sample response:

```ballerina
{
  "took": 28,
  "code": 200,
  "resultsCount": 320,
  "hits": [
    {
      "organization_name": "Health Alliance",
      "ein": "98-7654321"
    }
  ]
}
```

</details>

#### Filter lookups

<details>
<summary>Get all available filter names</summary>

Retrieves all available filter names that can be used in Essentials search queries.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EssentialsLookupResponse|error`

Sample code:

```ballerina
essentials:EssentialsLookupResponse result = check essentialsClient->/lookup;
```

Sample response:

```ballerina
{
  "took": 5,
  "code": 200,
  "data": [
    "geography.state",
    "geography.msa",
    "organization.ntee_major_code",
    "organization.profile_level",
    "financials.form_types"
  ]
}
```

</details>

<details>
<summary>Get filterable items for a specific filter</summary>

Retrieves all filterable items (keys and values) for a given filter name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filterName` | `string` | Yes | The filter name to look up (e.g., `"geography.state"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EssentialsFilteredLookupResponse|error`

Sample code:

```ballerina
essentials:EssentialsFilteredLookupResponse result = check essentialsClient->/lookup/["geography.state"];
```

Sample response:

```ballerina
{
  "took": 8,
  "code": 200,
  "data": [
    {"key": "NY", "value": "New York"},
    {"key": "CA", "value": "California"},
    {"key": "TX", "value": "Texas"}
  ]
}
```

</details>

<details>
<summary>Get specific filter key or value details</summary>

Retrieves details for a specific key or value within a given filter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filterName` | `string` | Yes | The filter name (e.g., `"geography.state"`). |
| `keyOrValue` | `string` | Yes | The specific key or value to look up (e.g., `"NY"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EssentialsFilteredLookupResponse|error`

Sample code:

```ballerina
essentials:EssentialsFilteredLookupResponse result = check essentialsClient->/lookup/["geography.state"]/["NY"];
```

Sample response:

```ballerina
{
  "took": 3,
  "code": 200,
  "data": [
    {"key": "NY", "value": "New York"}
  ]
}
```

</details>

---

## Premier client

Retrieve detailed nonprofit profiles and download PDF reports.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subscriptionKey` | `string` | Required | Candid API subscription key for authentication. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Use lax data binding for responses. |

### Initializing the client

```ballerina
import ballerinax/candid.premier;

configurable string subscriptionKey = ?;

premier:ApiKeysConfig apiKeyConfig = {
    subscriptionKey: subscriptionKey
};

premier:Client premierClient = check new (apiKeyConfig);
```

### Operations

#### Nonprofit profiles

<details>
<summary>Get nonprofit profile (v3)</summary>

Retrieves a comprehensive nonprofit profile by EIN using the v3 Premier API, including financials, people, DEI data, and program descriptions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ein` | `string` | Yes | Employer Identification Number of the nonprofit (e.g., `"13-1837418"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `V3PublicProfile|error`

Sample code:

```ballerina
premier:V3PublicProfile result = check premierClient->/v3/["13-1837418"];
```

Sample response:

```ballerina
{
  "took": 120,
  "code": 200,
  "data": {
    "summary": {
      "ein": "13-1837418",
      "organization_name": "Candid",
      "mission": "Every year, millions of nonprofits spend trillions of dollars...",
      "city": "New York",
      "state": "NY",
      "zip": "10003",
      "ntee_code": "T70",
      "subsection_code": "03",
      "ruling_year": "2019"
    },
    "financials": {
      "most_recent_year": {
        "fiscal_year": 2023,
        "total_revenue": 50000000,
        "total_expenses": 48000000,
        "total_assets": 120000000
      }
    }
  }
}
```

</details>

<details>
<summary>Get nonprofit profile (v2)</summary>

Retrieves a nonprofit profile by EIN using the deprecated v2 Premier API.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ein` | `string` | Yes | Employer Identification Number of the nonprofit. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `V2PublicProfile|error`

Sample code:

```ballerina
premier:V2PublicProfile result = check premierClient->/v2/["13-1837418"];
```

Sample response:

```ballerina
{
  "took": 95,
  "code": 200,
  "data": {
    "summary": {
      "ein": "13-1837418",
      "organization_name": "Candid"
    }
  }
}
```

</details>

<details>
<summary>Get nonprofit profile (v1)</summary>

Retrieves a nonprofit profile by EIN using the deprecated v1 Premier API.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ein` | `string` | Yes | Employer Identification Number of the nonprofit. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `V1PublicProfile|error`

Sample code:

```ballerina
premier:V1PublicProfile result = check premierClient->/v1/["13-1837418"];
```

Sample response:

```ballerina
{
  "took": 80,
  "code": 200,
  "data": {
    "summary": {
      "ein": "13-1837418",
      "organization_name": "Candid"
    }
  }
}
```

</details>

#### PDF reports

<details>
<summary>Download Pro PDF report</summary>

Downloads a Pro PDF report for the specified nonprofit, containing detailed profile and financial information.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ein` | `string` | Yes | Employer Identification Number of the nonprofit. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check premierClient->/v1/propdf/["13-1837418"];
byte[] pdfBytes = check result.getBinaryPayload();
```

</details>

<details>
<summary>Download Financial Trends Analysis PDF</summary>

Downloads a Financial Trends Analysis (FTA) PDF report for the specified nonprofit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ein` | `string` | Yes | Employer Identification Number of the nonprofit. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check premierClient->/v1/ftapdf/["13-1837418"];
byte[] pdfBytes = check result.getBinaryPayload();
```

</details>

---

## Charity check PDF client

Download Charity Check PDF reports for IRS compliance verification.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subscriptionKey` | `string` | Required | Candid API subscription key for authentication. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Use lax data binding for responses. |

### Initializing the client

```ballerina
import ballerinax/candid.charitycheckpdf;

configurable string subscriptionKey = ?;

charitycheckpdf:ApiKeysConfig apiKeyConfig = {
    subscriptionKey: subscriptionKey
};

charitycheckpdf:Client charityCheckClient = check new (apiKeyConfig);
```

### Operations

#### PDF download

<details>
<summary>Download Charity Check PDF</summary>

Downloads a Charity Check PDF report for the specified nonprofit, providing IRS compliance verification information.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ein` | `string` | Yes | Employer Identification Number of the nonprofit. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check charityCheckClient->/v1/pdf/["13-1837418"];
byte[] pdfBytes = check result.getBinaryPayload();
```

</details>
