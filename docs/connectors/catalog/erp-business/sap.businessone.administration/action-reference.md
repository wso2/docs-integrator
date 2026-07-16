# Actions

The `ballerinax/sap.businessone.administration` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One administration and setup objects — users, user groups & permissions; approval requests, stages & templates; alerts, event notifications & subscriptions; countries, counties, states & branches; SQL views, SQL queries & user queries; Web Client dashboards, launchpads, form settings & preferences — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the administration and setup objects exposed by the SAP Business One Service Layer — users and permissions, approval workflow configuration, general setup data (countries, states, branches, departments), saved queries and views, Web Client customization, and system alerts/notifications.

### Configuration

#### SessionConfig

SAP Business One Service Layer session credentials, passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database to log in to |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer user password |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Service Layer HTTP endpoint. Passed as the optional second argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>{}</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>{}</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>{}</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>{}</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side, treating `nil` values and absent fields as optional |

The client also accepts a `serviceUrl` string parameter — the base URL of the target Service Layer instance — which defaults to `https://localhost:50000/b1s/v1`.

### Initializing the client

```ballerina
import ballerinax/sap.businessone;
import ballerinax/sap.businessone.administration;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

administration:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### Cockpits

<details>
<summary>listCockpits</summary>

Queries the Cockpits collection and returns a page of Cockpit entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCockpitsHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListCockpitsQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `CockpitsCollectionResponse&#124;error`

**Sample code:**

```ballerina
CockpitsCollectionResponse result = check client->listCockpits();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Cockpits",
  "value": [
    {
      "AbsEntry": 1,
      "Code": 1,
      "Name": "Sales Overview",
      "Description": "Default sales cockpit",
      "CockpitType": "cpt_System",
      "User": null,
      "UserSignature": 1,
      "Manufacturer": "SAP",
      "Publisher": "SAP",
      "Time": "00:00:00",
      "Date": "2024-01-01"
    }
  ]
}
```

</details>

<details>
<summary>createCockpits</summary>

Creates a new Cockpit entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Cockpit</code> | Yes | Request payload describing the Cockpit to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Cockpit&#124;error`

**Sample code:**

```ballerina
Cockpit result = check client->createCockpits(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 2,
  "Code": 2,
  "Name": "New Cockpit",
  "Description": "Custom cockpit",
  "CockpitType": "cpt_User",
  "UserSignature": 1,
  "Manufacturer": "",
  "Publisher": "",
  "Time": "10:00:00",
  "Date": "2026-07-13"
}
```

</details>

<details>
<summary>getCockpits</summary>

Retrieves a single Cockpit entity identified by its `AbsEntry` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCockpitsQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `Cockpit&#124;error`

**Sample code:**

```ballerina
Cockpit result = check client->getCockpits(absEntry);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": 1,
  "Name": "Sales Overview",
  "Description": "Default sales cockpit",
  "CockpitType": "cpt_System",
  "UserSignature": 1,
  "Manufacturer": "SAP",
  "Publisher": "SAP",
  "Time": "00:00:00",
  "Date": "2024-01-01"
}
```

</details>

<details>
<summary>deleteCockpits</summary>

Deletes the Cockpit identified by its `AbsEntry` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteCockpits(absEntry);
```

</details>

<details>
<summary>updateCockpits</summary>

Partially updates a Cockpit identified by its `AbsEntry` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>Cockpit</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateCockpits(absEntry, payload);
```

</details>

<details>
<summary>cockpitsServiceGetCockpitList</summary>

Calls the CockpitsService_GetCockpitList function to retrieve the list of cockpits available to the current user context.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_9&#124;error`

**Sample code:**

```ballerina
inline_response_200_9 result = check client->cockpitsServiceGetCockpitList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CockpitsService_GetCockpitList",
  "value": [
    {
      "CockpitType": "cpt_System",
      "AbsEntry": 1
    }
  ]
}
```

</details>

<details>
<summary>cockpitsServiceGetTemplateCockpitList</summary>

Calls the CockpitsService_GetTemplateCockpitList function to retrieve the list of template cockpits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10&#124;error`

**Sample code:**

```ballerina
inline_response_200_10 result = check client->cockpitsServiceGetTemplateCockpitList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CockpitsService_GetTemplateCockpitList",
  "value": [
    {
      "CockpitType": "cpt_Template",
      "AbsEntry": 3
    }
  ]
}
```

</details>

<details>
<summary>cockpitsServiceGetUserCockpitList</summary>

Calls the CockpitsService_GetUserCockpitList function to retrieve the list of cockpits owned by the current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_11&#124;error`

**Sample code:**

```ballerina
inline_response_200_11 result = check client->cockpitsServiceGetUserCockpitList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CockpitsService_GetUserCockpitList",
  "value": [
    {
      "CockpitType": "cpt_User",
      "AbsEntry": 2
    }
  ]
}
```

</details>

<details>
<summary>cockpitsServicePublishCockpit</summary>

Calls the CockpitsService_PublishCockpit function to publish a Cockpit so it becomes available to other users.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CockpitsService_PublishCockpit_body</code> | Yes | Request payload wrapping the `cockpit` (Cockpit) to publish |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->cockpitsServicePublishCockpit(payload);
```

</details>

#### Countries

<details>
<summary>listCountries</summary>

Queries the Countries collection and returns a page of Country entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCountriesHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListCountriesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `CountriesCollectionResponse&#124;error`

**Sample code:**

```ballerina
CountriesCollectionResponse result = check client->listCountries();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Countries",
  "value": [
    {
      "Code": "US",
      "Name": "USA",
      "CodeForReports": "US",
      "AddressFormat": 1,
      "EU": "tNO",
      "ISOAlpha2Code": "US",
      "ISOAlpha3Code": "USA",
      "ISONumeric": "840"
    }
  ]
}
```

</details>

<details>
<summary>createCountries</summary>

Creates a new Country entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Country</code> | Yes | Request payload describing the Country to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Country&#124;error`

**Sample code:**

```ballerina
Country result = check client->createCountries(payload);
```

**Sample response:**

```json
{
  "Code": "XY",
  "Name": "Example Land",
  "CodeForReports": "XY",
  "AddressFormat": 1,
  "EU": "tNO",
  "ISOAlpha2Code": "XY",
  "ISOAlpha3Code": "XYZ",
  "ISONumeric": "999"
}
```

</details>

<details>
<summary>getCountries</summary>

Retrieves a single Country entity identified by its `Code` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCountriesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `Country&#124;error`

**Sample code:**

```ballerina
Country result = check client->getCountries(code);
```

**Sample response:**

```json
{
  "Code": "US",
  "Name": "USA",
  "CodeForReports": "US",
  "AddressFormat": 1,
  "EU": "tNO",
  "ISOAlpha2Code": "US",
  "ISOAlpha3Code": "USA",
  "ISONumeric": "840"
}
```

</details>

<details>
<summary>deleteCountries</summary>

Deletes the Country identified by its `Code` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteCountries(code);
```

</details>

<details>
<summary>updateCountries</summary>

Partially updates a Country identified by its `Code` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>Country</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateCountries(code, payload);
```

</details>

<details>
<summary>countriesServiceGetCountryList</summary>

Calls the CountriesService_GetCountryList function to retrieve a simplified list of countries (code and name).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_16&#124;error`

**Sample code:**

```ballerina
inline_response_200_16 result = check client->countriesServiceGetCountryList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CountriesService_GetCountryList",
  "value": [
    {
      "Code": "US",
      "Name": "USA"
    }
  ]
}
```

</details>

#### ApprovalStages

<details>
<summary>listApprovalStages</summary>

Queries the ApprovalStages collection and returns a page of ApprovalStage entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListApprovalStagesHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListApprovalStagesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `ApprovalStagesCollectionResponse&#124;error`

**Sample code:**

```ballerina
ApprovalStagesCollectionResponse result = check client->listApprovalStages();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ApprovalStages",
  "value": [
    {
      "Code": 1,
      "Name": "First Stage",
      "NoOfApproversRequired": 1,
      "Remarks": "",
      "ApprovalStageApprovers": []
    }
  ]
}
```

</details>

<details>
<summary>createApprovalStages</summary>

Creates a new ApprovalStage entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprovalStage</code> | Yes | Request payload describing the ApprovalStage to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ApprovalStage&#124;error`

**Sample code:**

```ballerina
ApprovalStage result = check client->createApprovalStages(payload);
```

**Sample response:**

```json
{
  "Code": 2,
  "Name": "Second Stage",
  "NoOfApproversRequired": 2,
  "Remarks": "Requires manager sign-off",
  "ApprovalStageApprovers": []
}
```

</details>

<details>
<summary>getApprovalStages</summary>

Retrieves a single ApprovalStage entity identified by its `Code` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprovalStagesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `ApprovalStage&#124;error`

**Sample code:**

```ballerina
ApprovalStage result = check client->getApprovalStages(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "First Stage",
  "NoOfApproversRequired": 1,
  "Remarks": "",
  "ApprovalStageApprovers": []
}
```

</details>

<details>
<summary>deleteApprovalStages</summary>

Deletes the ApprovalStage identified by its `Code` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteApprovalStages(code);
```

</details>

<details>
<summary>updateApprovalStages</summary>

Partially updates an ApprovalStage identified by its `Code` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ApprovalStage</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateApprovalStages(code, payload);
```

</details>

<details>
<summary>approvalStagesServiceGetApprovalStageList</summary>

Calls the ApprovalStagesService_GetApprovalStageList function to retrieve a simplified list of approval stages (code and name).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4&#124;error`

**Sample code:**

```ballerina
inline_response_200_4 result = check client->approvalStagesServiceGetApprovalStageList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ApprovalStagesService_GetApprovalStageList",
  "value": [
    {
      "Code": 1,
      "Name": "First Stage"
    }
  ]
}
```

</details>

#### FormattedSearches

<details>
<summary>listFormattedSearches</summary>

Queries the FormattedSearches collection and returns a page of FormattedSearch entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListFormattedSearchesHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListFormattedSearchesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `FormattedSearchesCollectionResponse&#124;error`

**Sample code:**

```ballerina
FormattedSearchesCollectionResponse result = check client->listFormattedSearches();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#FormattedSearches",
  "value": [
    {
      "FormID": "139",
      "ItemID": "4",
      "ColumnID": "1",
      "Action": "bofsaaSetPromptFromExternalLinkedFile",
      "QueryID": 1,
      "Index": 1,
      "Refresh": "tNO",
      "FieldID": "CardCode",
      "ForceRefresh": "tNO",
      "ByField": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createFormattedSearches</summary>

Creates a new FormattedSearch entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FormattedSearch</code> | Yes | Request payload describing the FormattedSearch to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `FormattedSearch&#124;error`

**Sample code:**

```ballerina
FormattedSearch result = check client->createFormattedSearches(payload);
```

**Sample response:**

```json
{
  "FormID": "139",
  "ItemID": "4",
  "ColumnID": "1",
  "Action": "bofsaaSetPromptFromExternalLinkedFile",
  "QueryID": 2,
  "Index": 2,
  "Refresh": "tNO",
  "FieldID": "CardCode",
  "ForceRefresh": "tNO",
  "ByField": "tNO"
}
```

</details>

<details>
<summary>getFormattedSearches</summary>

Retrieves a single FormattedSearch entity identified by its `Index` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `index` | <code>int:Signed32</code> | Yes | Key property 'Index' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFormattedSearchesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `FormattedSearch&#124;error`

**Sample code:**

```ballerina
FormattedSearch result = check client->getFormattedSearches(index);
```

**Sample response:**

```json
{
  "FormID": "139",
  "ItemID": "4",
  "ColumnID": "1",
  "Action": "bofsaaSetPromptFromExternalLinkedFile",
  "QueryID": 1,
  "Index": 1,
  "Refresh": "tNO",
  "FieldID": "CardCode",
  "ForceRefresh": "tNO",
  "ByField": "tNO"
}
```

</details>

<details>
<summary>deleteFormattedSearches</summary>

Deletes the FormattedSearch identified by its `Index` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `index` | <code>int:Signed32</code> | Yes | Key property 'Index' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteFormattedSearches(index);
```

</details>

<details>
<summary>updateFormattedSearches</summary>

Partially updates a FormattedSearch identified by its `Index` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `index` | <code>int:Signed32</code> | Yes | Key property 'Index' (Edm.Int32) |
| `payload` | <code>FormattedSearch</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateFormattedSearches(index, payload);
```

</details>

#### WebClientDashboards

<details>
<summary>listWebClientDashboards</summary>

Queries the WebClientDashboards collection and returns a page of WebClientDashboard entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientDashboardsHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListWebClientDashboardsQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `WebClientDashboardsCollectionResponse&#124;error`

**Sample code:**

```ballerina
WebClientDashboardsCollectionResponse result = check client->listWebClientDashboards();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WebClientDashboards",
  "value": [
    {
      "Guid": "b1e2c3d4-0000-0000-0000-000000000001",
      "UserId": 1,
      "Content": "{}",
      "Sys": "tNO",
      "WebClientDashboardCards": []
    }
  ]
}
```

</details>

<details>
<summary>createWebClientDashboards</summary>

Creates a new WebClientDashboard entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientDashboard</code> | Yes | Request payload describing the WebClientDashboard to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientDashboard&#124;error`

**Sample code:**

```ballerina
WebClientDashboard result = check client->createWebClientDashboards(payload);
```

**Sample response:**

```json
{
  "Guid": "b1e2c3d4-0000-0000-0000-000000000002",
  "UserId": 1,
  "Content": "{}",
  "Sys": "tNO",
  "WebClientDashboardCards": []
}
```

</details>

<details>
<summary>getWebClientDashboards</summary>

Retrieves a single WebClientDashboard entity identified by its `Guid` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientDashboardsQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `WebClientDashboard&#124;error`

**Sample code:**

```ballerina
WebClientDashboard result = check client->getWebClientDashboards(guid);
```

**Sample response:**

```json
{
  "Guid": "b1e2c3d4-0000-0000-0000-000000000001",
  "UserId": 1,
  "Content": "{}",
  "Sys": "tNO",
  "WebClientDashboardCards": []
}
```

</details>

<details>
<summary>deleteWebClientDashboards</summary>

Deletes the WebClientDashboard identified by its `Guid` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteWebClientDashboards(guid);
```

</details>

<details>
<summary>updateWebClientDashboards</summary>

Partially updates a WebClientDashboard identified by its `Guid` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientDashboard</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateWebClientDashboards(guid, payload);
```

</details>

#### AdditionalExpenses

<details>
<summary>listAdditionalExpenses</summary>

Queries the AdditionalExpenses collection and returns a page of AdditionalExpense entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAdditionalExpensesHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListAdditionalExpensesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `AdditionalExpensesCollectionResponse&#124;error`

**Sample code:**

```ballerina
AdditionalExpensesCollectionResponse result = check client->listAdditionalExpenses();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#AdditionalExpenses",
  "value": [
    {
      "ExpensCode": 1,
      "Name": "Freight",
      "RevenuesAccount": "_SYS00000000001",
      "ExpenseAccount": "_SYS00000000002",
      "TaxLiable": "tYES",
      "FixedAmountRevenues": 0,
      "FixedAmountExpenses": 0,
      "DistributionMethod": "aed_Equally",
      "FreightType": "ft_Value"
    }
  ]
}
```

</details>

<details>
<summary>createAdditionalExpenses</summary>

Creates a new AdditionalExpense entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AdditionalExpense</code> | Yes | Request payload describing the AdditionalExpense to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AdditionalExpense&#124;error`

**Sample code:**

```ballerina
AdditionalExpense result = check client->createAdditionalExpenses(payload);
```

**Sample response:**

```json
{
  "ExpensCode": 2,
  "Name": "Handling",
  "RevenuesAccount": "_SYS00000000003",
  "ExpenseAccount": "_SYS00000000004",
  "TaxLiable": "tYES",
  "FixedAmountRevenues": 0,
  "FixedAmountExpenses": 0,
  "DistributionMethod": "aed_Equally",
  "FreightType": "ft_Value"
}
```

</details>

<details>
<summary>getAdditionalExpenses</summary>

Retrieves a single AdditionalExpense entity identified by its `ExpensCode` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `expensCode` | <code>int:Signed32</code> | Yes | Key property 'ExpensCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAdditionalExpensesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `AdditionalExpense&#124;error`

**Sample code:**

```ballerina
AdditionalExpense result = check client->getAdditionalExpenses(expensCode);
```

**Sample response:**

```json
{
  "ExpensCode": 1,
  "Name": "Freight",
  "RevenuesAccount": "_SYS00000000001",
  "ExpenseAccount": "_SYS00000000002",
  "TaxLiable": "tYES",
  "FixedAmountRevenues": 0,
  "FixedAmountExpenses": 0,
  "DistributionMethod": "aed_Equally",
  "FreightType": "ft_Value"
}
```

</details>

<details>
<summary>deleteAdditionalExpenses</summary>

Deletes the AdditionalExpense identified by its `ExpensCode` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `expensCode` | <code>int:Signed32</code> | Yes | Key property 'ExpensCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteAdditionalExpenses(expensCode);
```

</details>

<details>
<summary>updateAdditionalExpenses</summary>

Partially updates an AdditionalExpense identified by its `ExpensCode` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `expensCode` | <code>int:Signed32</code> | Yes | Key property 'ExpensCode' (Edm.Int32) |
| `payload` | <code>AdditionalExpense</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateAdditionalExpenses(expensCode, payload);
```

</details>

#### DynamicSystemStrings

<details>
<summary>listDynamicSystemStrings</summary>

Queries the DynamicSystemStrings collection and returns a page of DynamicSystemString entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDynamicSystemStringsHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListDynamicSystemStringsQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `DynamicSystemStringsCollectionResponse&#124;error`

**Sample code:**

```ballerina
DynamicSystemStringsCollectionResponse result = check client->listDynamicSystemStrings();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#DynamicSystemStrings",
  "value": [
    {
      "FormID": "139",
      "ItemID": "4",
      "ColumnID": "1",
      "ItemString": "Business Partner",
      "IsBold": "tNO",
      "IsItalics": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createDynamicSystemStrings</summary>

Creates a new DynamicSystemString entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DynamicSystemString</code> | Yes | Request payload describing the DynamicSystemString to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DynamicSystemString&#124;error`

**Sample code:**

```ballerina
DynamicSystemString result = check client->createDynamicSystemStrings(payload);
```

**Sample response:**

```json
{
  "FormID": "139",
  "ItemID": "5",
  "ColumnID": "1",
  "ItemString": "Item Code",
  "IsBold": "tNO",
  "IsItalics": "tNO"
}
```

</details>

<details>
<summary>getDynamicSystemStrings</summary>

Retrieves a single DynamicSystemString entity identified by its composite key of `FormID`, `ItemID`, and `ColumnID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formID` | <code>string</code> | Yes | Composite key part 'FormID' (Edm.String) |
| `itemID` | <code>string</code> | Yes | Composite key part 'ItemID' (Edm.String) |
| `columnID` | <code>string</code> | Yes | Composite key part 'ColumnID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDynamicSystemStringsQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `DynamicSystemString&#124;error`

**Sample code:**

```ballerina
DynamicSystemString result = check client->getDynamicSystemStrings(formID, itemID, columnID);
```

**Sample response:**

```json
{
  "FormID": "139",
  "ItemID": "4",
  "ColumnID": "1",
  "ItemString": "Business Partner",
  "IsBold": "tNO",
  "IsItalics": "tNO"
}
```

</details>

<details>
<summary>deleteDynamicSystemStrings</summary>

Deletes the DynamicSystemString identified by its composite key of `FormID`, `ItemID`, and `ColumnID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formID` | <code>string</code> | Yes | Composite key part 'FormID' (Edm.String) |
| `itemID` | <code>string</code> | Yes | Composite key part 'ItemID' (Edm.String) |
| `columnID` | <code>string</code> | Yes | Composite key part 'ColumnID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteDynamicSystemStrings(formID, itemID, columnID);
```

</details>

<details>
<summary>updateDynamicSystemStrings</summary>

Partially updates a DynamicSystemString identified by its composite key of `FormID`, `ItemID`, and `ColumnID` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formID` | <code>string</code> | Yes | Composite key part 'FormID' (Edm.String) |
| `itemID` | <code>string</code> | Yes | Composite key part 'ItemID' (Edm.String) |
| `columnID` | <code>string</code> | Yes | Composite key part 'ColumnID' (Edm.String) |
| `payload` | <code>DynamicSystemString</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateDynamicSystemStrings(formID, itemID, columnID, payload);
```

</details>

#### Pictures

<details>
<summary>listPictures</summary>

Queries the Pictures collection and returns a page of Picture entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPicturesHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListPicturesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `PicturesCollectionResponse&#124;error`

**Sample code:**

```ballerina
PicturesCollectionResponse result = check client->listPictures();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Pictures",
  "value": [
    {
      "PictureName": "logo.png",
      "PictureSize": 20480,
      "PicturePath": "/Pictures/logo.png",
      "PictureCreateDate": "2024-01-01",
      "PictureModifyDate": "2024-01-01"
    }
  ]
}
```

</details>

<details>
<summary>createPictures</summary>

Creates a new Picture entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Picture</code> | Yes | Request payload describing the Picture to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Picture&#124;error`

**Sample code:**

```ballerina
Picture result = check client->createPictures(payload);
```

**Sample response:**

```json
{
  "PictureName": "banner.png",
  "PictureSize": 40960,
  "PicturePath": "/Pictures/banner.png",
  "PictureCreateDate": "2026-07-13",
  "PictureModifyDate": "2026-07-13"
}
```

</details>

<details>
<summary>getPictures</summary>

Retrieves a single Picture entity identified by its `PictureName` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `pictureName` | <code>string</code> | Yes | Key property 'PictureName' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPicturesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `Picture&#124;error`

**Sample code:**

```ballerina
Picture result = check client->getPictures(pictureName);
```

**Sample response:**

```json
{
  "PictureName": "logo.png",
  "PictureSize": 20480,
  "PicturePath": "/Pictures/logo.png",
  "PictureCreateDate": "2024-01-01",
  "PictureModifyDate": "2024-01-01"
}
```

</details>

<details>
<summary>deletePictures</summary>

Deletes the Picture identified by its `PictureName` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `pictureName` | <code>string</code> | Yes | Key property 'PictureName' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deletePictures(pictureName);
```

</details>

<details>
<summary>updatePictures</summary>

Partially updates a Picture identified by its `PictureName` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `pictureName` | <code>string</code> | Yes | Key property 'PictureName' (Edm.String) |
| `payload` | <code>Picture</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updatePictures(pictureName, payload);
```

</details>

#### UserKeysMD

<details>
<summary>listUserKeysMD</summary>

Queries the UserKeysMD collection and returns a page of UserKeysMD entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserKeysMDHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListUserKeysMDQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `UserKeysMDCollectionResponse&#124;error`

**Sample code:**

```ballerina
UserKeysMDCollectionResponse result = check client->listUserKeysMD();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#UserKeysMD",
  "value": [
    {
      "TableName": "OCRD",
      "KeyIndex": 1,
      "KeyName": "CardCode",
      "Unique": "tYES",
      "UserKeysMD_Elements": []
    }
  ]
}
```

</details>

<details>
<summary>createUserKeysMD</summary>

Creates a new UserKeysMD entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserKeysMD</code> | Yes | Request payload describing the UserKeysMD to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserKeysMD&#124;error`

**Sample code:**

```ballerina
UserKeysMD result = check client->createUserKeysMD(payload);
```

**Sample response:**

```json
{
  "TableName": "OCRD",
  "KeyIndex": 2,
  "KeyName": "CardName",
  "Unique": "tNO",
  "UserKeysMD_Elements": []
}
```

</details>

<details>
<summary>getUserKeysMD</summary>

Retrieves a single UserKeysMD entity identified by its composite key of `TableName` and `KeyIndex`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Composite key part 'TableName' (Edm.String) |
| `keyIndex` | <code>int:Signed32</code> | Yes | Composite key part 'KeyIndex' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserKeysMDQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `UserKeysMD&#124;error`

**Sample code:**

```ballerina
UserKeysMD result = check client->getUserKeysMD(tableName, keyIndex);
```

**Sample response:**

```json
{
  "TableName": "OCRD",
  "KeyIndex": 1,
  "KeyName": "CardCode",
  "Unique": "tYES",
  "UserKeysMD_Elements": []
}
```

</details>

<details>
<summary>deleteUserKeysMD</summary>

Deletes the UserKeysMD identified by its composite key of `TableName` and `KeyIndex`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Composite key part 'TableName' (Edm.String) |
| `keyIndex` | <code>int:Signed32</code> | Yes | Composite key part 'KeyIndex' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteUserKeysMD(tableName, keyIndex);
```

</details>

<details>
<summary>updateUserKeysMD</summary>

Partially updates a UserKeysMD identified by its composite key of `TableName` and `KeyIndex` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Composite key part 'TableName' (Edm.String) |
| `keyIndex` | <code>int:Signed32</code> | Yes | Composite key part 'KeyIndex' (Edm.Int32) |
| `payload` | <code>UserKeysMD</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateUserKeysMD(tableName, keyIndex, payload);
```

</details>

#### WebClientPreferences

<details>
<summary>listWebClientPreferences</summary>

Queries the WebClientPreferences collection and returns a page of WebClientPreference entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientPreferencesHeaders</code> | No | Headers to be sent with the request (e.g. `prefer` for server-side paging control) |
| `queries` | <code>ListWebClientPreferencesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `WebClientPreferencesCollectionResponse&#124;error`

**Sample code:**

```ballerina
WebClientPreferencesCollectionResponse result = check client->listWebClientPreferences();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WebClientPreferences",
  "value": [
    {
      "Guid": "c1d2e3f4-0000-0000-0000-000000000001",
      "TableName": "OCRD",
      "ColumnName": "CardCode",
      "DefaultValue": "",
      "UserId": 1
    }
  ]
}
```

</details>

<details>
<summary>createWebClientPreferences</summary>

Creates a new WebClientPreference entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientPreference</code> | Yes | Request payload describing the WebClientPreference to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientPreference&#124;error`

**Sample code:**

```ballerina
WebClientPreference result = check client->createWebClientPreferences(payload);
```

**Sample response:**

```json
{
  "Guid": "c1d2e3f4-0000-0000-0000-000000000002",
  "TableName": "OCRD",
  "ColumnName": "CardName",
  "DefaultValue": "",
  "UserId": 1
}
```

</details>

<details>
<summary>getWebClientPreferences</summary>

Retrieves a single WebClientPreference entity identified by its `Guid` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientPreferencesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `WebClientPreference&#124;error`

**Sample code:**

```ballerina
WebClientPreference result = check client->getWebClientPreferences(guid);
```

**Sample response:**

```json
{
  "Guid": "c1d2e3f4-0000-0000-0000-000000000001",
  "TableName": "OCRD",
  "ColumnName": "CardCode",
  "DefaultValue": "",
  "UserId": 1
}
```

</details>

<details>
<summary>deleteWebClientPreferences</summary>

Deletes the WebClientPreference identified by its `Guid` key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteWebClientPreferences(guid);
```

</details>

<details>
<summary>updateWebClientPreferences</summary>

Partially updates a WebClientPreference identified by its `Guid` key property using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientPreference</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateWebClientPreferences(guid, payload);
```

</details>
#### Sections

<details>
<summary>listSections</summary>

Retrieves a paged list of Section entities from the Sections collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSectionsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListSectionsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `SectionsCollectionResponse&#124;error`

**Sample code:**

```ballerina
SectionsCollectionResponse result = check client->listSections();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Sections",
  "value": [
    {
      "Description": "Sales Section",
      "AbsEntry": 1,
      "Code": "S1",
      "ECode": "SEC1"
    }
  ],
  "odata.nextLink": "Sections?$skip=20"
}
```

</details>

<details>
<summary>createSections</summary>

Creates a new Section entity in the Sections collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Section</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Section&#124;error`

**Sample code:**

```ballerina
Section result = check client->createSections(payload);
```

**Sample response:**

```json
{
  "Description": "Sales Section",
  "AbsEntry": 1,
  "Code": "S1",
  "ECode": "SEC1"
}
```

</details>

<details>
<summary>getSections</summary>

Retrieves a single Section entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSectionsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `Section&#124;error`

**Sample code:**

```ballerina
Section result = check client->getSections(absEntry);
```

**Sample response:**

```json
{
  "Description": "Sales Section",
  "AbsEntry": 1,
  "Code": "S1",
  "ECode": "SEC1"
}
```

</details>

<details>
<summary>deleteSections</summary>

Deletes a Section entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSections(absEntry);
```

</details>

<details>
<summary>updateSections</summary>

Partially updates a Section entity identified by its `AbsEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>Section</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSections(absEntry, payload);
```

</details>

<details>
<summary>sectionsServiceGetSectionList</summary>

Retrieves the list of sections via the SectionsService_GetSectionList service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_36&#124;error`

**Sample code:**

```ballerina
inline_response_200_36 result = check client->sectionsServiceGetSectionList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SectionsService_GetSectionList",
  "value": [
    {
      "Description": "Sales Section",
      "AbsEntry": 1,
      "Code": "S1"
    }
  ]
}
```

</details>

#### PredefinedTexts

<details>
<summary>listPredefinedTexts</summary>

Retrieves a paged list of PredefinedText entities from the PredefinedTexts collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPredefinedTextsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListPredefinedTextsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `PredefinedTextsCollectionResponse&#124;error`

**Sample code:**

```ballerina
PredefinedTextsCollectionResponse result = check client->listPredefinedTexts();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#PredefinedTexts",
  "value": [
    {
      "Numerator": 1,
      "TextCode": "GREETING",
      "Text": "Thank you for your business"
    }
  ],
  "odata.nextLink": "PredefinedTexts?$skip=20"
}
```

</details>

<details>
<summary>createPredefinedTexts</summary>

Creates a new PredefinedText entity in the PredefinedTexts collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PredefinedText</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PredefinedText&#124;error`

**Sample code:**

```ballerina
PredefinedText result = check client->createPredefinedTexts(payload);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "TextCode": "GREETING",
  "Text": "Thank you for your business"
}
```

</details>

<details>
<summary>getPredefinedTexts</summary>

Retrieves a single PredefinedText entity identified by its `Numerator` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPredefinedTextsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `PredefinedText&#124;error`

**Sample code:**

```ballerina
PredefinedText result = check client->getPredefinedTexts(numerator);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "TextCode": "GREETING",
  "Text": "Thank you for your business"
}
```

</details>

<details>
<summary>deletePredefinedTexts</summary>

Deletes a PredefinedText entity identified by its `Numerator` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePredefinedTexts(numerator);
```

</details>

<details>
<summary>updatePredefinedTexts</summary>

Partially updates a PredefinedText entity identified by its `Numerator` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `payload` | <code>PredefinedText</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePredefinedTexts(numerator, payload);
```

</details>

<details>
<summary>predefinedTextsServiceGetPredefinedTextList</summary>

Retrieves the list of predefined texts via the PredefinedTextsService_GetPredefinedTextList service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_31&#124;error`

**Sample code:**

```ballerina
inline_response_200_31 result = check client->predefinedTextsServiceGetPredefinedTextList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#PredefinedTextsService_GetPredefinedTextList",
  "value": [
    {
      "Numerator": 1,
      "TextCode": "GREETING"
    }
  ]
}
```

</details>

#### WebClientRecentActivities

<details>
<summary>listWebClientRecentActivities</summary>

Retrieves a paged list of WebClientRecentActivity entities from the WebClientRecentActivities collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientRecentActivitiesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListWebClientRecentActivitiesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `WebClientRecentActivitiesCollectionResponse&#124;error`

**Sample code:**

```ballerina
WebClientRecentActivitiesCollectionResponse result = check client->listWebClientRecentActivities();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientRecentActivities",
  "value": [
    {
      "AppId": "app-01",
      "UserId": 1,
      "Title": "Sales Order 1000",
      "RecentDay": "2026-07-01",
      "Guid": "3f1e2a4b-1234-5678-90ab-cdef01234567",
      "Count": 3,
      "AppType": "SalesOrder",
      "Timestamp": "2026-07-01T10:15:00Z",
      "Url": "/app/salesorder/1000"
    }
  ],
  "odata.nextLink": "WebClientRecentActivities?$skip=20"
}
```

</details>

<details>
<summary>createWebClientRecentActivities</summary>

Creates a new WebClientRecentActivity entity in the WebClientRecentActivities collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientRecentActivity</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientRecentActivity&#124;error`

**Sample code:**

```ballerina
WebClientRecentActivity result = check client->createWebClientRecentActivities(payload);
```

**Sample response:**

```json
{
  "AppId": "app-01",
  "UserId": 1,
  "Title": "Sales Order 1000",
  "RecentDay": "2026-07-01",
  "Guid": "3f1e2a4b-1234-5678-90ab-cdef01234567",
  "Count": 3,
  "AppType": "SalesOrder",
  "Timestamp": "2026-07-01T10:15:00Z",
  "Url": "/app/salesorder/1000"
}
```

</details>

<details>
<summary>getWebClientRecentActivities</summary>

Retrieves a single WebClientRecentActivity entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientRecentActivitiesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `WebClientRecentActivity&#124;error`

**Sample code:**

```ballerina
WebClientRecentActivity result = check client->getWebClientRecentActivities(guid);
```

**Sample response:**

```json
{
  "AppId": "app-01",
  "UserId": 1,
  "Title": "Sales Order 1000",
  "Guid": "3f1e2a4b-1234-5678-90ab-cdef01234567",
  "Count": 3
}
```

</details>

<details>
<summary>deleteWebClientRecentActivities</summary>

Deletes a WebClientRecentActivity entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientRecentActivities(guid);
```

</details>

<details>
<summary>updateWebClientRecentActivities</summary>

Partially updates a WebClientRecentActivity entity identified by its `Guid` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientRecentActivity</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientRecentActivities(guid, payload);
```

</details>

<details>
<summary>webClientRecentActivityServiceGetList</summary>

Retrieves the list of web client recent activities via the WebClientRecentActivityService_GetList service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_53&#124;error`

**Sample code:**

```ballerina
inline_response_200_53 result = check client->webClientRecentActivityServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientRecentActivityService_GetList",
  "value": [
    {
      "Guid": "3f1e2a4b-1234-5678-90ab-cdef01234567"
    }
  ]
}
```

</details>

#### Departments

<details>
<summary>listDepartments</summary>

Retrieves a paged list of Department entities from the Departments collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDepartmentsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListDepartmentsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `DepartmentsCollectionResponse&#124;error`

**Sample code:**

```ballerina
DepartmentsCollectionResponse result = check client->listDepartments();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Departments",
  "value": [
    {
      "Description": "Sales Department",
      "Code": 1,
      "Name": "Sales"
    }
  ],
  "odata.nextLink": "Departments?$skip=20"
}
```

</details>

<details>
<summary>createDepartments</summary>

Creates a new Department entity in the Departments collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Department</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Department&#124;error`

**Sample code:**

```ballerina
Department result = check client->createDepartments(payload);
```

**Sample response:**

```json
{
  "Description": "Sales Department",
  "Code": 1,
  "Name": "Sales"
}
```

</details>

<details>
<summary>getDepartments</summary>

Retrieves a single Department entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDepartmentsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `Department&#124;error`

**Sample code:**

```ballerina
Department result = check client->getDepartments(code);
```

**Sample response:**

```json
{
  "Description": "Sales Department",
  "Code": 1,
  "Name": "Sales"
}
```

</details>

<details>
<summary>deleteDepartments</summary>

Deletes a Department entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDepartments(code);
```

</details>

<details>
<summary>updateDepartments</summary>

Partially updates a Department entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>Department</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDepartments(code, payload);
```

</details>

<details>
<summary>departmentsServiceGetDepartmentList</summary>

Retrieves the department list via the DepartmentsService_GetDepartmentList service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_17&#124;error`

**Sample code:**

```ballerina
inline_response_200_17 result = check client->departmentsServiceGetDepartmentList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#DepartmentsService_GetDepartmentList",
  "value": [
    {
      "Code": 1,
      "Name": "Sales"
    }
  ]
}
```

</details>

#### UserFieldsMD

<details>
<summary>listUserFieldsMD</summary>

Retrieves a paged list of UserFieldMD entities from the UserFieldsMD collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserFieldsMDHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListUserFieldsMDQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `UserFieldsMDCollectionResponse&#124;error`

**Sample code:**

```ballerina
UserFieldsMDCollectionResponse result = check client->listUserFieldsMD();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserFieldsMD",
  "value": [
    {
      "Description": "Customer Priority",
      "SubType": "st_None",
      "Size": 20,
      "Name": "U_Priority",
      "TableName": "OCRD",
      "Type": "db_Alpha",
      "FieldID": 1,
      "EditSize": 20
    }
  ],
  "odata.nextLink": "UserFieldsMD?$skip=20"
}
```

</details>

<details>
<summary>createUserFieldsMD</summary>

Creates a new UserFieldMD entity in the UserFieldsMD collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserFieldMD</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserFieldMD&#124;error`

**Sample code:**

```ballerina
UserFieldMD result = check client->createUserFieldsMD(payload);
```

**Sample response:**

```json
{
  "Description": "Customer Priority",
  "SubType": "st_None",
  "Size": 20,
  "Name": "U_Priority",
  "TableName": "OCRD",
  "Type": "db_Alpha",
  "FieldID": 1,
  "EditSize": 20
}
```

</details>

<details>
<summary>getUserFieldsMD</summary>

Retrieves a single UserFieldMD entity identified by the composite key `TableName`/`FieldID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Composite key part 'TableName' (Edm.String) |
| `fieldID` | <code>int:Signed32</code> | Yes | Composite key part 'FieldID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserFieldsMDQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `UserFieldMD&#124;error`

**Sample code:**

```ballerina
UserFieldMD result = check client->getUserFieldsMD(tableName, fieldID);
```

**Sample response:**

```json
{
  "Description": "Customer Priority",
  "Name": "U_Priority",
  "TableName": "OCRD",
  "Type": "db_Alpha",
  "FieldID": 1
}
```

</details>

<details>
<summary>deleteUserFieldsMD</summary>

Deletes a UserFieldMD entity identified by the composite key `TableName`/`FieldID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Composite key part 'TableName' (Edm.String) |
| `fieldID` | <code>int:Signed32</code> | Yes | Composite key part 'FieldID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserFieldsMD(tableName, fieldID);
```

</details>

<details>
<summary>updateUserFieldsMD</summary>

Partially updates a UserFieldMD entity identified by the composite key `TableName`/`FieldID` using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Composite key part 'TableName' (Edm.String) |
| `fieldID` | <code>int:Signed32</code> | Yes | Composite key part 'FieldID' (Edm.Int32) |
| `payload` | <code>UserFieldMD</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUserFieldsMD(tableName, fieldID, payload);
```

</details>

#### WebClientNotifications

<details>
<summary>webClientNotificationServiceGetList</summary>

Retrieves the list of web client notifications via the WebClientNotificationService_GetList service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_51&#124;error`

**Sample code:**

```ballerina
inline_response_200_51 result = check client->webClientNotificationServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientNotificationService_GetList",
  "value": [
    {
      "Guid": "9a8b7c6d-1234-5678-90ab-cdef01234567"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientNotifications</summary>

Retrieves a paged list of WebClientNotification entities from the WebClientNotifications collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientNotificationsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListWebClientNotificationsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `WebClientNotificationsCollectionResponse&#124;error`

**Sample code:**

```ballerina
WebClientNotificationsCollectionResponse result = check client->listWebClientNotifications();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientNotifications",
  "value": [
    {
      "ReadStatus": "N",
      "NotiType": 1,
      "ActivityDate": "2026-07-01",
      "UserId": 1,
      "IsDismissed": "N",
      "Guid": "9a8b7c6d-1234-5678-90ab-cdef01234567"
    }
  ],
  "odata.nextLink": "WebClientNotifications?$skip=20"
}
```

</details>

<details>
<summary>createWebClientNotifications</summary>

Creates a new WebClientNotification entity in the WebClientNotifications collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientNotification</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientNotification&#124;error`

**Sample code:**

```ballerina
WebClientNotification result = check client->createWebClientNotifications(payload);
```

**Sample response:**

```json
{
  "ReadStatus": "N",
  "NotiType": 1,
  "ActivityDate": "2026-07-01",
  "UserId": 1,
  "IsDismissed": "N",
  "Guid": "9a8b7c6d-1234-5678-90ab-cdef01234567"
}
```

</details>

<details>
<summary>getWebClientNotifications</summary>

Retrieves a single WebClientNotification entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientNotificationsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `WebClientNotification&#124;error`

**Sample code:**

```ballerina
WebClientNotification result = check client->getWebClientNotifications(guid);
```

**Sample response:**

```json
{
  "ReadStatus": "N",
  "NotiType": 1,
  "UserId": 1,
  "Guid": "9a8b7c6d-1234-5678-90ab-cdef01234567"
}
```

</details>

<details>
<summary>deleteWebClientNotifications</summary>

Deletes a WebClientNotification entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientNotifications(guid);
```

</details>

<details>
<summary>updateWebClientNotifications</summary>

Partially updates a WebClientNotification entity identified by its `Guid` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientNotification</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientNotifications(guid, payload);
```

</details>

#### EventNotifications

<details>
<summary>listEventNotifications</summary>

Retrieves a paged list of EventNotification entities from the EventNotifications collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEventNotificationsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListEventNotificationsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `EventNotificationsCollectionResponse&#124;error`

**Sample code:**

```ballerina
EventNotificationsCollectionResponse result = check client->listEventNotifications();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#EventNotifications",
  "value": [
    {
      "Status": "est_Success",
      "TransactionType": "A",
      "ReplayState": "erps_Sent",
      "CreateTime": "10:00:00",
      "SourceDB": "SBODEMOUS",
      "FieldsInKey": 1,
      "Operation": "C",
      "BusinessObject": "oInvoices",
      "CreateDate": "2026-07-01",
      "ObjectType": "13",
      "EventID": "EVT-0001"
    }
  ],
  "odata.nextLink": "EventNotifications?$skip=20"
}
```

</details>

<details>
<summary>createEventNotifications</summary>

Creates a new EventNotification entity in the EventNotifications collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EventNotification</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `EventNotification&#124;error`

**Sample code:**

```ballerina
EventNotification result = check client->createEventNotifications(payload);
```

**Sample response:**

```json
{
  "Status": "est_Success",
  "TransactionType": "A",
  "ReplayState": "erps_Sent",
  "SourceDB": "SBODEMOUS",
  "Operation": "C",
  "BusinessObject": "oInvoices",
  "CreateDate": "2026-07-01",
  "EventID": "EVT-0001"
}
```

</details>

<details>
<summary>getEventNotifications</summary>

Retrieves a single EventNotification entity identified by its `EventID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `eventID` | <code>string</code> | Yes | Key property 'EventID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEventNotificationsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `EventNotification&#124;error`

**Sample code:**

```ballerina
EventNotification result = check client->getEventNotifications(eventID);
```

**Sample response:**

```json
{
  "Status": "est_Success",
  "TransactionType": "A",
  "BusinessObject": "oInvoices",
  "EventID": "EVT-0001"
}
```

</details>

<details>
<summary>deleteEventNotifications</summary>

Deletes an EventNotification entity identified by its `EventID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `eventID` | <code>string</code> | Yes | Key property 'EventID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEventNotifications(eventID);
```

</details>

<details>
<summary>updateEventNotifications</summary>

Partially updates an EventNotification entity identified by its `EventID` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `eventID` | <code>string</code> | Yes | Key property 'EventID' (Edm.String) |
| `payload` | <code>EventNotification</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEventNotifications(eventID, payload);
```

</details>

#### QueryAuthGroups

<details>
<summary>queryAuthGroupServiceGetQueryAuthGroupList</summary>

Retrieves the query auth group list via the QueryAuthGroupService_GetQueryAuthGroupList service operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_32&#124;error`

**Sample code:**

```ballerina
inline_response_200_32 result = check client->queryAuthGroupServiceGetQueryAuthGroupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#QueryAuthGroupService_GetQueryAuthGroupList",
  "value": [
    {
      "AuthGroupCode": "AG1",
      "AuthGroupDes": "Finance Queries",
      "AuthGroupId": 1
    }
  ]
}
```

</details>

<details>
<summary>listQueryAuthGroups</summary>

Retrieves a paged list of QueryAuthGroup entities from the QueryAuthGroups collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListQueryAuthGroupsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListQueryAuthGroupsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `QueryAuthGroupsCollectionResponse&#124;error`

**Sample code:**

```ballerina
QueryAuthGroupsCollectionResponse result = check client->listQueryAuthGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#QueryAuthGroups",
  "value": [
    {
      "AuthGroupCode": "AG1",
      "AuthGroupDes": "Finance Queries",
      "AuthGroupId": 1,
      "CategoryGroupCollection": []
    }
  ],
  "odata.nextLink": "QueryAuthGroups?$skip=20"
}
```

</details>

<details>
<summary>createQueryAuthGroups</summary>

Creates a new QueryAuthGroup entity in the QueryAuthGroups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QueryAuthGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `QueryAuthGroup&#124;error`

**Sample code:**

```ballerina
QueryAuthGroup result = check client->createQueryAuthGroups(payload);
```

**Sample response:**

```json
{
  "AuthGroupCode": "AG1",
  "AuthGroupDes": "Finance Queries",
  "AuthGroupId": 1,
  "CategoryGroupCollection": []
}
```

</details>

<details>
<summary>getQueryAuthGroups</summary>

Retrieves a single QueryAuthGroup entity identified by its `AuthGroupId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `authGroupId` | <code>int:Signed32</code> | Yes | Key property 'AuthGroupId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetQueryAuthGroupsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `QueryAuthGroup&#124;error`

**Sample code:**

```ballerina
QueryAuthGroup result = check client->getQueryAuthGroups(authGroupId);
```

**Sample response:**

```json
{
  "AuthGroupCode": "AG1",
  "AuthGroupDes": "Finance Queries",
  "AuthGroupId": 1
}
```

</details>

<details>
<summary>deleteQueryAuthGroups</summary>

Deletes a QueryAuthGroup entity identified by its `AuthGroupId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `authGroupId` | <code>int:Signed32</code> | Yes | Key property 'AuthGroupId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteQueryAuthGroups(authGroupId);
```

</details>

<details>
<summary>updateQueryAuthGroups</summary>

Partially updates a QueryAuthGroup entity identified by its `AuthGroupId` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `authGroupId` | <code>int:Signed32</code> | Yes | Key property 'AuthGroupId' (Edm.Int32) |
| `payload` | <code>QueryAuthGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateQueryAuthGroups(authGroupId, payload);
```

</details>

#### UserObjectsMD

<details>
<summary>listUserObjectsMD</summary>

Retrieves a paged list of UserObjectsMD entities from the UserObjectsMD collection, supporting OData query and paging headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserObjectsMDHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for paging control) |
| `queries` | <code>ListUserObjectsMDQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `UserObjectsMDCollectionResponse&#124;error`

**Sample code:**

```ballerina
UserObjectsMDCollectionResponse result = check client->listUserObjectsMD();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserObjectsMD",
  "value": [
    {
      "TableName": "@MY_UDO",
      "Code": "MYUDO1",
      "LogTableName": "@MY_UDO_LOG",
      "CanCreateDefaultForm": "tYES",
      "ObjectType": "boud_MasterData",
      "Name": "My User Object",
      "CanCancel": "tNO",
      "CanDelete": "tYES",
      "CanLog": "tYES",
      "ManageSeries": "tNO"
    }
  ],
  "odata.nextLink": "UserObjectsMD?$skip=20"
}
```

</details>

<details>
<summary>createUserObjectsMD</summary>

Creates a new UserObjectsMD entity in the UserObjectsMD collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserObjectsMD</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserObjectsMD&#124;error`

**Sample code:**

```ballerina
UserObjectsMD result = check client->createUserObjectsMD(payload);
```

**Sample response:**

```json
{
  "TableName": "@MY_UDO",
  "Code": "MYUDO1",
  "LogTableName": "@MY_UDO_LOG",
  "CanCreateDefaultForm": "tYES",
  "ObjectType": "boud_MasterData",
  "Name": "My User Object"
}
```

</details>

<details>
<summary>getUserObjectsMD</summary>

Retrieves a single UserObjectsMD entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserObjectsMDQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `UserObjectsMD&#124;error`

**Sample code:**

```ballerina
UserObjectsMD result = check client->getUserObjectsMD(code);
```

**Sample response:**

```json
{
  "TableName": "@MY_UDO",
  "Code": "MYUDO1",
  "Name": "My User Object",
  "ObjectType": "boud_MasterData"
}
```

</details>

<details>
<summary>deleteUserObjectsMD</summary>

Deletes a UserObjectsMD entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserObjectsMD(code);
```

</details>

<details>
<summary>updateUserObjectsMD</summary>

Partially updates a UserObjectsMD entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>UserObjectsMD</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUserObjectsMD(code, payload);
```

</details>
#### MobileAddOnSetting

<details>
<summary>listMobileAddOnSetting</summary>

Queries the MobileAddOnSetting collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListMobileAddOnSettingHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListMobileAddOnSettingQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `MobileAddOnSettingCollectionResponse|error`

**Sample code:**

```ballerina
MobileAddOnSettingCollectionResponse result = check client->listMobileAddOnSetting();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MobileAddOnSetting",
  "value": [
    {
      "Type": "mastModule",
      "B1SalesApp": "tYES",
      "Description": "Sales Mobile Module",
      "LogonMethod": "lmStandardLogon",
      "Enable": "tYES",
      "ViewStyle": "vstPage",
      "B1MobileApp": "tYES",
      "Code": "SM01",
      "B1ServiceApp": "tNO",
      "Url": "https://example.com/mobile",
      "Provider": "SAP"
    }
  ],
  "odata.nextLink": "MobileAddOnSetting?$skip=20"
}
```

</details>

<details>
<summary>createMobileAddOnSetting</summary>

Creates a new MobileAddOnSetting entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MobileAddOnSetting</code> | Yes | Request payload describing the mobile add-on setting to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MobileAddOnSetting|error`

**Sample code:**

```ballerina
MobileAddOnSetting result = check client->createMobileAddOnSetting(payload);
```

**Sample response:**

```json
{
  "Type": "mastModule",
  "B1SalesApp": "tYES",
  "Description": "Sales Mobile Module",
  "LogonMethod": "lmStandardLogon",
  "Enable": "tYES",
  "ViewStyle": "vstPage",
  "B1MobileApp": "tYES",
  "Code": "SM01",
  "B1ServiceApp": "tNO",
  "Url": "https://example.com/mobile",
  "Provider": "SAP"
}
```

</details>

<details>
<summary>getMobileAddOnSetting</summary>

Retrieves a single MobileAddOnSetting entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetMobileAddOnSettingQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `MobileAddOnSetting|error`

**Sample code:**

```ballerina
MobileAddOnSetting result = check client->getMobileAddOnSetting("SM01");
```

**Sample response:**

```json
{
  "Type": "mastModule",
  "B1SalesApp": "tYES",
  "Description": "Sales Mobile Module",
  "LogonMethod": "lmStandardLogon",
  "Enable": "tYES",
  "ViewStyle": "vstPage",
  "B1MobileApp": "tYES",
  "Code": "SM01",
  "B1ServiceApp": "tNO",
  "Url": "https://example.com/mobile",
  "Provider": "SAP"
}
```

</details>

<details>
<summary>deleteMobileAddOnSetting</summary>

Deletes a MobileAddOnSetting entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteMobileAddOnSetting("SM01");
```

</details>

<details>
<summary>updateMobileAddOnSetting</summary>

Partially updates a MobileAddOnSetting entity (PATCH/MERGE semantics) identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>MobileAddOnSetting</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateMobileAddOnSetting("SM01", payload);
```

</details>

<details>
<summary>mobileAddOnSettingServiceGetMobileAddOnSettingList</summary>

Returns a lightweight list of mobile add-on settings (code and description only) via the MobileAddOnSettingService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_28|error`

**Sample code:**

```ballerina
inline_response_200_28 result = check client->mobileAddOnSettingServiceGetMobileAddOnSettingList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MobileAddOnSettingService_GetMobileAddOnSettingList",
  "value": [
    {
      "Description": "Sales Mobile Module",
      "Code": "SM01"
    }
  ]
}
```

</details>

#### KPIs

<details>
<summary>listKPIs</summary>

Queries the KPIs collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListKPIsHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListKPIsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `KPIsCollectionResponse|error`

**Sample code:**

```ballerina
KPIsCollectionResponse result = check client->listKPIs();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#KPIs",
  "value": [
    {
      "KPICode": "KPI01",
      "KPIName": "Monthly Sales",
      "KPIType": "asMonthly",
      "NumberOfColumns": 3,
      "KPI_ItemLines": []
    }
  ],
  "odata.nextLink": "KPIs?$skip=20"
}
```

</details>

<details>
<summary>createKPIs</summary>

Creates a new KPI entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>KPI</code> | Yes | Request payload describing the KPI to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `KPI|error`

**Sample code:**

```ballerina
KPI result = check client->createKPIs(payload);
```

**Sample response:**

```json
{
  "KPICode": "KPI01",
  "KPIName": "Monthly Sales",
  "KPIType": "asMonthly",
  "NumberOfColumns": 3,
  "KPI_ItemLines": []
}
```

</details>

<details>
<summary>getKPIs</summary>

Retrieves a single KPI entity identified by its `KPICode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `kPICode` | <code>string</code> | Yes | Key property 'KPICode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetKPIsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `KPI|error`

**Sample code:**

```ballerina
KPI result = check client->getKPIs("KPI01");
```

**Sample response:**

```json
{
  "KPICode": "KPI01",
  "KPIName": "Monthly Sales",
  "KPIType": "asMonthly",
  "NumberOfColumns": 3,
  "KPI_ItemLines": []
}
```

</details>

<details>
<summary>deleteKPIs</summary>

Deletes a KPI entity identified by its `KPICode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `kPICode` | <code>string</code> | Yes | Key property 'KPICode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteKPIs("KPI01");
```

</details>

<details>
<summary>updateKPIs</summary>

Partially updates a KPI entity (PATCH/MERGE semantics) identified by its `KPICode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `kPICode` | <code>string</code> | Yes | Key property 'KPICode' (Edm.String) |
| `payload` | <code>KPI</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateKPIs("KPI01", payload);
```

</details>

<details>
<summary>kPIsServiceGetList</summary>

Returns a lightweight list of KPIs (code and name only) via the KPIsService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_24|error`

**Sample code:**

```ballerina
inline_response_200_24 result = check client->kPIsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#KPIsService_GetList",
  "value": [
    {
      "KPICode": "KPI01",
      "KPIName": "Monthly Sales"
    }
  ]
}
```

</details>

#### Users

<details>
<summary>listUsers</summary>

Queries the Users collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUsersHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListUsersQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `UsersCollectionResponse|error`

**Sample code:**

```ballerina
UsersCollectionResponse result = check client->listUsers();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Users",
  "value": [
    {
      "InternalKey": 1,
      "UserCode": "manager",
      "UserName": "System Administrator",
      "Superuser": "tYES",
      "eMail": "admin@example.com",
      "Branch": 1,
      "Department": -1,
      "LanguageCode": "ln_English",
      "Locked": "tNO",
      "Group": -1
    }
  ],
  "odata.nextLink": "Users?$skip=20"
}
```

</details>

<details>
<summary>createUsers</summary>

Creates a new User entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>User</code> | Yes | Request payload describing the user to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `User|error`

**Sample code:**

```ballerina
User result = check client->createUsers(payload);
```

**Sample response:**

```json
{
  "InternalKey": 10,
  "UserCode": "jdoe",
  "UserName": "Jane Doe",
  "Superuser": "tNO",
  "eMail": "jdoe@example.com",
  "Branch": 1,
  "Department": -1,
  "LanguageCode": "ln_English",
  "Locked": "tNO",
  "Group": -1
}
```

</details>

<details>
<summary>getUsers</summary>

Retrieves a single User entity identified by its `InternalKey` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Key property 'InternalKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUsersQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `User|error`

**Sample code:**

```ballerina
User result = check client->getUsers(10);
```

**Sample response:**

```json
{
  "InternalKey": 10,
  "UserCode": "jdoe",
  "UserName": "Jane Doe",
  "Superuser": "tNO",
  "eMail": "jdoe@example.com",
  "Branch": 1,
  "Department": -1,
  "LanguageCode": "ln_English",
  "Locked": "tNO",
  "Group": -1
}
```

</details>

<details>
<summary>deleteUsers</summary>

Deletes a User entity identified by its `InternalKey` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Key property 'InternalKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUsers(10);
```

</details>

<details>
<summary>updateUsers</summary>

Partially updates a User entity (PATCH/MERGE semantics) identified by its `InternalKey` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Key property 'InternalKey' (Edm.Int32) |
| `payload` | <code>User</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUsers(10, payload);
```

</details>

<details>
<summary>usersClose</summary>

Invokes the bound action `Close` on a User entity (binding type User), closing the user account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Key property 'InternalKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->usersClose(10);
```

</details>

<details>
<summary>usersRemoveUserAndLicense</summary>

Invokes the bound action `RemoveUserAndLicense` on a User entity (binding type User), removing the user and freeing its assigned license.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Key property 'InternalKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->usersRemoveUserAndLicense(10);
```

</details>

<details>
<summary>usersServiceGetCurrentUser</summary>

Returns the User entity for the currently logged-in session, via the UsersService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `User|error`

**Sample code:**

```ballerina
User result = check client->usersServiceGetCurrentUser();
```

**Sample response:**

```json
{
  "InternalKey": 1,
  "UserCode": "manager",
  "UserName": "System Administrator",
  "Superuser": "tYES",
  "eMail": "admin@example.com",
  "Branch": 1,
  "Department": -1,
  "LanguageCode": "ln_English",
  "Locked": "tNO",
  "Group": -1
}
```

</details>

#### WebClientVariants

<details>
<summary>webClientVariantServiceGetList</summary>

Returns a lightweight list of web client variants (GUID only) via the WebClientVariantService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_55|error`

**Sample code:**

```ballerina
inline_response_200_55 result = check client->webClientVariantServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientVariantService_GetList",
  "value": [
    {
      "Guid": "8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientVariants</summary>

Queries the WebClientVariants collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientVariantsHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListWebClientVariantsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `WebClientVariantsCollectionResponse|error`

**Sample code:**

```ballerina
WebClientVariantsCollectionResponse result = check client->listWebClientVariants();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientVariants",
  "value": [
    {
      "Guid": "8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c",
      "Name": "Default View",
      "ObjectName": "Invoices",
      "Order": 1,
      "FilterBarLayout": "",
      "ChartCustomization": "",
      "OverviewCustomization": "",
      "ReportCustomization": "",
      "UserFilter": ""
    }
  ],
  "odata.nextLink": "WebClientVariants?$skip=20"
}
```

</details>

<details>
<summary>createWebClientVariants</summary>

Creates a new WebClientVariant entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientVariant</code> | Yes | Request payload describing the web client variant to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientVariant|error`

**Sample code:**

```ballerina
WebClientVariant result = check client->createWebClientVariants(payload);
```

**Sample response:**

```json
{
  "Guid": "8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c",
  "Name": "Default View",
  "ObjectName": "Invoices",
  "Order": 1,
  "FilterBarLayout": "",
  "ChartCustomization": "",
  "OverviewCustomization": "",
  "ReportCustomization": "",
  "UserFilter": ""
}
```

</details>

<details>
<summary>getWebClientVariants</summary>

Retrieves a single WebClientVariant entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientVariantsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `WebClientVariant|error`

**Sample code:**

```ballerina
WebClientVariant result = check client->getWebClientVariants("8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c");
```

**Sample response:**

```json
{
  "Guid": "8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c",
  "Name": "Default View",
  "ObjectName": "Invoices",
  "Order": 1,
  "FilterBarLayout": "",
  "ChartCustomization": "",
  "OverviewCustomization": "",
  "ReportCustomization": "",
  "UserFilter": ""
}
```

</details>

<details>
<summary>deleteWebClientVariants</summary>

Deletes a WebClientVariant entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientVariants("8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c");
```

</details>

<details>
<summary>updateWebClientVariants</summary>

Partially updates a WebClientVariant entity (PATCH/MERGE semantics) identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientVariant</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientVariants("8f14e45f-ceea-467e-9ec5-2f4c0b1a1b2c", payload);
```

</details>

#### EmailGroups

<details>
<summary>listEmailGroups</summary>

Queries the EmailGroups collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEmailGroupsHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListEmailGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `EmailGroupsCollectionResponse|error`

**Sample code:**

```ballerina
EmailGroupsCollectionResponse result = check client->listEmailGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#EmailGroups",
  "value": [
    {
      "EmailGroupName": "Sales Team",
      "EmailGroupCode": "EG01"
    }
  ],
  "odata.nextLink": "EmailGroups?$skip=20"
}
```

</details>

<details>
<summary>createEmailGroups</summary>

Creates a new EmailGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmailGroup</code> | Yes | Request payload describing the email group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `EmailGroup|error`

**Sample code:**

```ballerina
EmailGroup result = check client->createEmailGroups(payload);
```

**Sample response:**

```json
{
  "EmailGroupName": "Sales Team",
  "EmailGroupCode": "EG01"
}
```

</details>

<details>
<summary>getEmailGroups</summary>

Retrieves a single EmailGroup entity identified by its `EmailGroupCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `emailGroupCode` | <code>string</code> | Yes | Key property 'EmailGroupCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmailGroupsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `EmailGroup|error`

**Sample code:**

```ballerina
EmailGroup result = check client->getEmailGroups("EG01");
```

**Sample response:**

```json
{
  "EmailGroupName": "Sales Team",
  "EmailGroupCode": "EG01"
}
```

</details>

<details>
<summary>deleteEmailGroups</summary>

Deletes an EmailGroup entity identified by its `EmailGroupCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `emailGroupCode` | <code>string</code> | Yes | Key property 'EmailGroupCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmailGroups("EG01");
```

</details>

<details>
<summary>updateEmailGroups</summary>

Partially updates an EmailGroup entity (PATCH/MERGE semantics) identified by its `EmailGroupCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `emailGroupCode` | <code>string</code> | Yes | Key property 'EmailGroupCode' (Edm.String) |
| `payload` | <code>EmailGroup</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmailGroups("EG01", payload);
```

</details>

<details>
<summary>emailGroupsServiceGetList</summary>

Returns a lightweight list of email groups (code and name only) via the EmailGroupsService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_19|error`

**Sample code:**

```ballerina
inline_response_200_19 result = check client->emailGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#EmailGroupsService_GetList",
  "value": [
    {
      "EmailGroupName": "Sales Team",
      "EmailGroupCode": "EG01"
    }
  ]
}
```

</details>

#### WebClientBookmarkTiles

<details>
<summary>webClientBookmarkTileServiceGetList</summary>

Returns a lightweight list of web client bookmark tiles (GUID only) via the WebClientBookmarkTileService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_46|error`

**Sample code:**

```ballerina
inline_response_200_46 result = check client->webClientBookmarkTileServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientBookmarkTileService_GetList",
  "value": [
    {
      "Guid": "3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientBookmarkTiles</summary>

Queries the WebClientBookmarkTiles collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientBookmarkTilesHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListWebClientBookmarkTilesQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `WebClientBookmarkTilesCollectionResponse|error`

**Sample code:**

```ballerina
WebClientBookmarkTilesCollectionResponse result = check client->listWebClientBookmarkTiles();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientBookmarkTiles",
  "value": [
    {
      "UrlTarget": "_blank",
      "Endpoint": "https://example.com/tile",
      "Title": "Open Orders",
      "Guid": "3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f",
      "Info": "Shows open sales orders",
      "BindType": "static",
      "SubTitle": "Sales"
    }
  ],
  "odata.nextLink": "WebClientBookmarkTiles?$skip=20"
}
```

</details>

<details>
<summary>createWebClientBookmarkTiles</summary>

Creates a new WebClientBookmarkTile entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientBookmarkTile</code> | Yes | Request payload describing the bookmark tile to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientBookmarkTile|error`

**Sample code:**

```ballerina
WebClientBookmarkTile result = check client->createWebClientBookmarkTiles(payload);
```

**Sample response:**

```json
{
  "UrlTarget": "_blank",
  "Endpoint": "https://example.com/tile",
  "Title": "Open Orders",
  "Guid": "3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f",
  "Info": "Shows open sales orders",
  "BindType": "static",
  "SubTitle": "Sales"
}
```

</details>

<details>
<summary>getWebClientBookmarkTiles</summary>

Retrieves a single WebClientBookmarkTile entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientBookmarkTilesQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `WebClientBookmarkTile|error`

**Sample code:**

```ballerina
WebClientBookmarkTile result = check client->getWebClientBookmarkTiles("3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f");
```

**Sample response:**

```json
{
  "UrlTarget": "_blank",
  "Endpoint": "https://example.com/tile",
  "Title": "Open Orders",
  "Guid": "3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f",
  "Info": "Shows open sales orders",
  "BindType": "static",
  "SubTitle": "Sales"
}
```

</details>

<details>
<summary>deleteWebClientBookmarkTiles</summary>

Deletes a WebClientBookmarkTile entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientBookmarkTiles("3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f");
```

</details>

<details>
<summary>updateWebClientBookmarkTiles</summary>

Partially updates a WebClientBookmarkTile entity (PATCH/MERGE semantics) identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientBookmarkTile</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientBookmarkTiles("3c9f6a1e-7b2d-4e2a-9c4e-1a2b3c4d5e6f", payload);
```

</details>

#### WebClientVariantGroups

<details>
<summary>webClientVariantGroupServiceGetList</summary>

Returns a lightweight list of web client variant groups (GUID only) via the WebClientVariantGroupService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_54|error`

**Sample code:**

```ballerina
inline_response_200_54 result = check client->webClientVariantGroupServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientVariantGroupService_GetList",
  "value": [
    {
      "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientVariantGroups</summary>

Queries the WebClientVariantGroups collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientVariantGroupsHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListWebClientVariantGroupsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `WebClientVariantGroupsCollectionResponse|error`

**Sample code:**

```ballerina
WebClientVariantGroupsCollectionResponse result = check client->listWebClientVariantGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientVariantGroups",
  "value": [
    {
      "UserId": 1,
      "ViewId": "V1",
      "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "DefaultVariant": "Default",
      "ViewType": "Grid",
      "ObjectName": "Invoices"
    }
  ],
  "odata.nextLink": "WebClientVariantGroups?$skip=20"
}
```

</details>

<details>
<summary>createWebClientVariantGroups</summary>

Creates a new WebClientVariantGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientVariantGroup</code> | Yes | Request payload describing the variant group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientVariantGroup|error`

**Sample code:**

```ballerina
WebClientVariantGroup result = check client->createWebClientVariantGroups(payload);
```

**Sample response:**

```json
{
  "UserId": 1,
  "ViewId": "V1",
  "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "DefaultVariant": "Default",
  "ViewType": "Grid",
  "ObjectName": "Invoices"
}
```

</details>

<details>
<summary>getWebClientVariantGroups</summary>

Retrieves a single WebClientVariantGroup entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientVariantGroupsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `WebClientVariantGroup|error`

**Sample code:**

```ballerina
WebClientVariantGroup result = check client->getWebClientVariantGroups("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

**Sample response:**

```json
{
  "UserId": 1,
  "ViewId": "V1",
  "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "DefaultVariant": "Default",
  "ViewType": "Grid",
  "ObjectName": "Invoices"
}
```

</details>

<details>
<summary>deleteWebClientVariantGroups</summary>

Deletes a WebClientVariantGroup entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientVariantGroups("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

</details>

<details>
<summary>updateWebClientVariantGroups</summary>

Partially updates a WebClientVariantGroup entity (PATCH/MERGE semantics) identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientVariantGroup</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientVariantGroups("a1b2c3d4-e5f6-7890-abcd-ef1234567890", payload);
```

</details>

#### ExceptionalEvents

<details>
<summary>exceptionalEventServiceGetExceptionalEventList</summary>

Returns a lightweight list of exceptional events (code only) via the ExceptionalEventService function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_20|error`

**Sample code:**

```ballerina
inline_response_200_20 result = check client->exceptionalEventServiceGetExceptionalEventList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ExceptionalEventService_GetExceptionalEventList",
  "value": [
    {
      "Code": "EE01"
    }
  ]
}
```

</details>

<details>
<summary>listExceptionalEvents</summary>

Queries the ExceptionalEvents collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListExceptionalEventsHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListExceptionalEventsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `ExceptionalEventsCollectionResponse|error`

**Sample code:**

```ballerina
ExceptionalEventsCollectionResponse result = check client->listExceptionalEvents();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ExceptionalEvents",
  "value": [
    {
      "Description": "Failed authorization event",
      "Code": "EE01"
    }
  ],
  "odata.nextLink": "ExceptionalEvents?$skip=20"
}
```

</details>

<details>
<summary>createExceptionalEvents</summary>

Creates a new ExceptionalEvent entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExceptionalEvent</code> | Yes | Request payload describing the exceptional event to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ExceptionalEvent|error`

**Sample code:**

```ballerina
ExceptionalEvent result = check client->createExceptionalEvents(payload);
```

**Sample response:**

```json
{
  "Description": "Failed authorization event",
  "Code": "EE01"
}
```

</details>

<details>
<summary>getExceptionalEvents</summary>

Retrieves a single ExceptionalEvent entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExceptionalEventsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `ExceptionalEvent|error`

**Sample code:**

```ballerina
ExceptionalEvent result = check client->getExceptionalEvents("EE01");
```

**Sample response:**

```json
{
  "Description": "Failed authorization event",
  "Code": "EE01"
}
```

</details>

<details>
<summary>deleteExceptionalEvents</summary>

Deletes an ExceptionalEvent entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteExceptionalEvents("EE01");
```

</details>

<details>
<summary>updateExceptionalEvents</summary>

Partially updates an ExceptionalEvent entity (PATCH/MERGE semantics) identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>ExceptionalEvent</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateExceptionalEvents("EE01", payload);
```

</details>

#### SingleUserConnections

<details>
<summary>listSingleUserConnections</summary>

Queries the SingleUserConnections collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSingleUserConnectionsHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListSingleUserConnectionsQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `SingleUserConnectionsCollectionResponse|error`

**Sample code:**

```ballerina
SingleUserConnectionsCollectionResponse result = check client->listSingleUserConnections();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SingleUserConnections",
  "value": [
    {
      "Action": "sucaWarning",
      "Code": 1
    }
  ],
  "odata.nextLink": "SingleUserConnections?$skip=20"
}
```

</details>

<details>
<summary>createSingleUserConnections</summary>

Creates a new SingleUserConnection entity, controlling whether a second concurrent login by the same user is blocked or only produces a warning.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SingleUserConnection</code> | Yes | Request payload describing the single-user-connection rule to create. `Action` accepts `sucaWarning` or `sucaBlock` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SingleUserConnection|error`

**Sample code:**

```ballerina
SingleUserConnection result = check client->createSingleUserConnections(payload);
```

**Sample response:**

```json
{
  "Action": "sucaWarning",
  "Code": 1
}
```

</details>

<details>
<summary>getSingleUserConnections</summary>

Retrieves a single SingleUserConnection entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSingleUserConnectionsQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `SingleUserConnection|error`

**Sample code:**

```ballerina
SingleUserConnection result = check client->getSingleUserConnections(1);
```

**Sample response:**

```json
{
  "Action": "sucaWarning",
  "Code": 1
}
```

</details>

<details>
<summary>deleteSingleUserConnections</summary>

Deletes a SingleUserConnection entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSingleUserConnections(1);
```

</details>

<details>
<summary>updateSingleUserConnections</summary>

Partially updates a SingleUserConnection entity (PATCH/MERGE semantics) identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>SingleUserConnection</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSingleUserConnections(1, payload);
```

</details>

#### UserPermissionTree

<details>
<summary>listUserPermissionTree</summary>

Queries the UserPermissionTree collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserPermissionTreeHeaders</code> | No | Optional `Prefer` header for server-side paging control (e.g. `odata.maxpagesize=100`) |
| `queries` | <code>ListUserPermissionTreeQueries</code> | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount` (`allpages`|`none`), `$select` |

**Returns:** `UserPermissionTreeCollectionResponse|error`

**Sample code:**

```ballerina
UserPermissionTreeCollectionResponse result = check client->listUserPermissionTree();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserPermissionTree",
  "value": [
    {
      "UserSignature": 1,
      "DisplayOrder": 1,
      "PermissionID": "3073",
      "Options": "bou_FullReadNone",
      "Name": "Administration",
      "Levels": 0,
      "IsItem": "tNO",
      "ParentID": ""
    }
  ],
  "odata.nextLink": "UserPermissionTree?$skip=20"
}
```

</details>

<details>
<summary>createUserPermissionTree</summary>

Creates a new UserPermissionTree entity, assigning a permission node (and its access level) to a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserPermissionTree</code> | Yes | Request payload describing the permission node to create. `Options` accepts `bou_FullNone` or `bou_FullReadNone` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserPermissionTree|error`

**Sample code:**

```ballerina
UserPermissionTree result = check client->createUserPermissionTree(payload);
```

**Sample response:**

```json
{
  "UserSignature": 1,
  "DisplayOrder": 1,
  "PermissionID": "3073",
  "Options": "bou_FullReadNone",
  "Name": "Administration",
  "Levels": 0,
  "IsItem": "tNO",
  "ParentID": ""
}
```

</details>

<details>
<summary>getUserPermissionTree</summary>

Retrieves a single UserPermissionTree entity identified by its `PermissionID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `permissionID` | <code>string</code> | Yes | Key property 'PermissionID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserPermissionTreeQueries</code> | No | OData query options: `$expand`, `$select` |

**Returns:** `UserPermissionTree|error`

**Sample code:**

```ballerina
UserPermissionTree result = check client->getUserPermissionTree("3073");
```

**Sample response:**

```json
{
  "UserSignature": 1,
  "DisplayOrder": 1,
  "PermissionID": "3073",
  "Options": "bou_FullReadNone",
  "Name": "Administration",
  "Levels": 0,
  "IsItem": "tNO",
  "ParentID": ""
}
```

</details>

<details>
<summary>deleteUserPermissionTree</summary>

Deletes a UserPermissionTree entity identified by its `PermissionID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `permissionID` | <code>string</code> | Yes | Key property 'PermissionID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserPermissionTree("3073");
```

</details>

<details>
<summary>updateUserPermissionTree</summary>

Partially updates a UserPermissionTree entity (PATCH/MERGE semantics) identified by its `PermissionID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `permissionID` | <code>string</code> | Yes | Key property 'PermissionID' (Edm.String) |
| `payload` | <code>UserPermissionTree</code> | Yes | Request payload with the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUserPermissionTree("3073", payload);
```

</details>
#### ReportFilter

<details>
<summary>listReportFilter</summary>

Queries the ReportFilter collection and returns a page of `TaxReportFilter` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListReportFilterHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListReportFilterQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ReportFilterCollectionResponse|error`

**Sample code:**

```ballerina
ReportFilterCollectionResponse result = check administrationClient->listReportFilter();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ReportFilter",
  "value": [
    {
      "Code": 1,
      "Name": "VAT Q1 Filter",
      "Quarter": 1,
      "IncludeCustomers": "tYES",
      "IncludeVendors": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createReportFilter</summary>

Creates a new `TaxReportFilter` entity in the ReportFilter collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxReportFilter</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxReportFilter|error`

**Sample code:**

```ballerina
TaxReportFilter result = check administrationClient->createReportFilter(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "VAT Q1 Filter",
  "Quarter": 1,
  "IncludeCustomers": "tYES",
  "IncludeGLAccounts": "tNO",
  "IncludeVendors": "tYES",
  "RoundAmount": "tNO"
}
```

</details>

<details>
<summary>getReportFilter</summary>

Retrieves a single `TaxReportFilter` entity from the ReportFilter collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetReportFilterQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `TaxReportFilter|error`

**Sample code:**

```ballerina
TaxReportFilter result = check administrationClient->getReportFilter(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "VAT Q1 Filter",
  "Quarter": 1,
  "IncludeCustomers": "tYES"
}
```

</details>

<details>
<summary>deleteReportFilter</summary>

Deletes a `TaxReportFilter` entity from the ReportFilter collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteReportFilter(code);
```

</details>

<details>
<summary>updateReportFilter</summary>

Partially updates a `TaxReportFilter` entity (PATCH/MERGE semantics) in the ReportFilter collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>TaxReportFilter</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateReportFilter(code, payload);
```

</details>

<details>
<summary>reportFilterServiceGetTaxReportFilterList</summary>

Invokes the `ReportFilterService_GetTaxReportFilterList` function-import to retrieve a list of tax report filter parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReportFilterService_GetTaxReportFilterList_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_33|error`

**Sample code:**

```ballerina
inline_response_200_33 result = check administrationClient->reportFilterServiceGetTaxReportFilterList(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ReportFilterService_GetTaxReportFilterList",
  "value": [
    {
      "FilterType": "trft_VAT",
      "Code": 1,
      "Name": "VAT Q1 Filter"
    }
  ]
}
```

</details>

#### ExtendedTranslations

<details>
<summary>listExtendedTranslations</summary>

Queries the ExtendedTranslations collection and returns a page of `ExtendedTranslation` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListExtendedTranslationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListExtendedTranslationsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ExtendedTranslationsCollectionResponse|error`

**Sample code:**

```ballerina
ExtendedTranslationsCollectionResponse result = check administrationClient->listExtendedTranslations();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ExtendedTranslations",
  "value": [
    {
      "DocEntry": 1,
      "ID": "ITM001",
      "Category": "asMenuItem",
      "SourceLanguage": 23,
      "SecondaryID": "SEC1"
    }
  ]
}
```

</details>

<details>
<summary>createExtendedTranslations</summary>

Creates a new `ExtendedTranslation` entity in the ExtendedTranslations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExtendedTranslation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ExtendedTranslation|error`

**Sample code:**

```ballerina
ExtendedTranslation result = check administrationClient->createExtendedTranslations(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "ID": "ITM001",
  "Category": "asMenuItem",
  "SourceLanguage": 23,
  "CreateDate": "2026-07-01",
  "UpdateDate": "2026-07-01"
}
```

</details>

<details>
<summary>getExtendedTranslations</summary>

Retrieves a single `ExtendedTranslation` entity from the ExtendedTranslations collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExtendedTranslationsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ExtendedTranslation|error`

**Sample code:**

```ballerina
ExtendedTranslation result = check administrationClient->getExtendedTranslations(docEntry);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "ID": "ITM001",
  "Category": "asMenuItem"
}
```

</details>

<details>
<summary>deleteExtendedTranslations</summary>

Deletes a `ExtendedTranslation` entity from the ExtendedTranslations collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteExtendedTranslations(docEntry);
```

</details>

<details>
<summary>updateExtendedTranslations</summary>

Partially updates a `ExtendedTranslation` entity (PATCH/MERGE semantics) in the ExtendedTranslations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>ExtendedTranslation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateExtendedTranslations(docEntry, payload);
```

</details>

<details>
<summary>extendedTranslationsServiceGetExtendedTranslationList</summary>

Invokes the `ExtendedTranslationsService_GetExtendedTranslationList` function-import to retrieve the list of extended translation parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_21|error`

**Sample code:**

```ballerina
inline_response_200_21 result = check administrationClient->extendedTranslationsServiceGetExtendedTranslationList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ExtendedTranslationsService_GetExtendedTranslationList",
  "value": [
    {
      "DocEntry": 1,
      "ID": "ITM001",
      "Category": "asMenuItem",
      "SecondaryID": "SEC1"
    }
  ]
}
```

</details>

#### Messages

<details>
<summary>listMessages</summary>

Queries the Messages collection and returns a page of `Message` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListMessagesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListMessagesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `MessagesCollectionResponse|error`

**Sample code:**

```ballerina
MessagesCollectionResponse result = check administrationClient->listMessages();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Messages",
  "value": [
    {
      "Code": 1,
      "Subject": "System Notice",
      "Text": "Backup completed",
      "User": 1,
      "Priority": "mp_Normal"
    }
  ]
}
```

</details>

<details>
<summary>createMessages</summary>

Creates a new `Message` entity in the Messages collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Message</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Message|error`

**Sample code:**

```ballerina
Message result = check administrationClient->createMessages(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Subject": "System Notice",
  "Text": "Backup completed",
  "User": 1,
  "Priority": "mp_Normal",
  "RecipientCollection": [
    {
      "SendInternally": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>getMessages</summary>

Retrieves a single `Message` entity from the Messages collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetMessagesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Message|error`

**Sample code:**

```ballerina
Message result = check administrationClient->getMessages(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Subject": "System Notice",
  "Text": "Backup completed"
}
```

</details>

<details>
<summary>deleteMessages</summary>

Deletes a `Message` entity from the Messages collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteMessages(code);
```

</details>

<details>
<summary>updateMessages</summary>

Partially updates a `Message` entity (PATCH/MERGE semantics) in the Messages collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>Message</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateMessages(code, payload);
```

</details>

<details>
<summary>messagesServiceGetInbox</summary>

Invokes the `MessagesService_GetInbox` function-import to retrieve the current user's inbox message headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_25|error`

**Sample code:**

```ballerina
inline_response_200_25 result = check administrationClient->messagesServiceGetInbox();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MessagesService_GetInbox",
  "value": [
    {
      "Read": "tNO",
      "Received": "tYES",
      "ReceivedDate": "2026-07-10",
      "SentDate": "2026-07-10",
      "SentTime": "10:00:00"
    }
  ]
}
```

</details>

<details>
<summary>messagesServiceGetOutbox</summary>

Invokes the `MessagesService_GetOutbox` function-import to retrieve the current user's outbox message headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_26|error`

**Sample code:**

```ballerina
inline_response_200_26 result = check administrationClient->messagesServiceGetOutbox();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MessagesService_GetOutbox",
  "value": [
    {
      "Read": "tNO",
      "Received": "tNO",
      "SentDate": "2026-07-10",
      "SentTime": "10:00:00"
    }
  ]
}
```

</details>

<details>
<summary>messagesServiceGetSentMessages</summary>

Invokes the `MessagesService_GetSentMessages` function-import to retrieve the list of message headers the current user has sent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_27|error`

**Sample code:**

```ballerina
inline_response_200_27 result = check administrationClient->messagesServiceGetSentMessages();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MessagesService_GetSentMessages",
  "value": [
    {
      "Read": "tYES",
      "Received": "tYES",
      "SentDate": "2026-07-09",
      "SentTime": "14:32:00"
    }
  ]
}
```

</details>

#### States

<details>
<summary>listStates</summary>

Queries the States collection and returns a page of `State` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListStatesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListStatesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `StatesCollectionResponse|error`

**Sample code:**

```ballerina
StatesCollectionResponse result = check administrationClient->listStates();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#States",
  "value": [
    {
      "Code": "CA",
      "Country": "US",
      "Name": "California",
      "IsUnionTerritory": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createStates</summary>

Creates a new `State` entity in the States collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>State</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `State|error`

**Sample code:**

```ballerina
State result = check administrationClient->createStates(payload);
```

**Sample response:**

```json
{
  "Code": "CA",
  "Country": "US",
  "Name": "California",
  "GSTCode": "",
  "IsUnionTerritory": "tNO"
}
```

</details>

<details>
<summary>getStates</summary>

Retrieves a single `State` entity from the States collection by its composite key (Code, Country).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `country` | <code>string</code> | Yes | Composite key part 'Country' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetStatesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `State|error`

**Sample code:**

```ballerina
State result = check administrationClient->getStates(code, country);
```

**Sample response:**

```json
{
  "Code": "CA",
  "Country": "US",
  "Name": "California"
}
```

</details>

<details>
<summary>deleteStates</summary>

Deletes a `State` entity from the States collection by its composite key (Code, Country).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `country` | <code>string</code> | Yes | Composite key part 'Country' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteStates(code, country);
```

</details>

<details>
<summary>updateStates</summary>

Partially updates a `State` entity (PATCH/MERGE semantics) in the States collection by its composite key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `country` | <code>string</code> | Yes | Composite key part 'Country' (Edm.String) |
| `payload` | <code>State</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateStates(code, country, payload);
```

</details>

<details>
<summary>statesServiceGetStateList</summary>

Invokes the `StatesService_GetStateList` function-import to retrieve the list of state parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_39|error`

**Sample code:**

```ballerina
inline_response_200_39 result = check administrationClient->statesServiceGetStateList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#StatesService_GetStateList",
  "value": [
    {
      "Code": "CA",
      "Country": "US",
      "Name": "California"
    }
  ]
}
```

</details>

#### Branches

<details>
<summary>listBranches</summary>

Queries the Branches collection and returns a page of `Branch` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBranchesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBranchesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `BranchesCollectionResponse|error`

**Sample code:**

```ballerina
BranchesCollectionResponse result = check administrationClient->listBranches();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Branches",
  "value": [
    {
      "Code": 1,
      "Name": "Head Office",
      "Description": "Main branch"
    }
  ]
}
```

</details>

<details>
<summary>createBranches</summary>

Creates a new `Branch` entity in the Branches collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Branch</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Branch|error`

**Sample code:**

```ballerina
Branch result = check administrationClient->createBranches(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Head Office",
  "Description": "Main branch",
  "Users": [
    {
      "UserCode": 1
    }
  ]
}
```

</details>

<details>
<summary>getBranches</summary>

Retrieves a single `Branch` entity from the Branches collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBranchesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Branch|error`

**Sample code:**

```ballerina
Branch result = check administrationClient->getBranches(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Head Office",
  "Description": "Main branch"
}
```

</details>

<details>
<summary>deleteBranches</summary>

Deletes a `Branch` entity from the Branches collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteBranches(code);
```

</details>

<details>
<summary>updateBranches</summary>

Partially updates a `Branch` entity (PATCH/MERGE semantics) in the Branches collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>Branch</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateBranches(code, payload);
```

</details>

<details>
<summary>branchesServiceGetBranchList</summary>

Invokes the `BranchesService_GetBranchList` function-import to retrieve the list of branch parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6|error`

**Sample code:**

```ballerina
inline_response_200_6 result = check administrationClient->branchesServiceGetBranchList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BranchesService_GetBranchList",
  "value": [
    {
      "Code": 1,
      "Name": "Head Office"
    }
  ]
}
```

</details>

#### QueryCategories

<details>
<summary>listQueryCategories</summary>

Queries the QueryCategories collection and returns a page of `QueryCategory` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListQueryCategoriesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListQueryCategoriesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `QueryCategoriesCollectionResponse|error`

**Sample code:**

```ballerina
QueryCategoriesCollectionResponse result = check administrationClient->listQueryCategories();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#QueryCategories",
  "value": [
    {
      "Code": 1,
      "Name": "Sales Queries",
      "Permissions": "pFull"
    }
  ]
}
```

</details>

<details>
<summary>createQueryCategories</summary>

Creates a new `QueryCategory` entity in the QueryCategories collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>QueryCategory</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `QueryCategory|error`

**Sample code:**

```ballerina
QueryCategory result = check administrationClient->createQueryCategories(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Sales Queries",
  "Permissions": "pFull",
  "UserQueries": []
}
```

</details>

<details>
<summary>getQueryCategories</summary>

Retrieves a single `QueryCategory` entity from the QueryCategories collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetQueryCategoriesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `QueryCategory|error`

**Sample code:**

```ballerina
QueryCategory result = check administrationClient->getQueryCategories(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Sales Queries",
  "Permissions": "pFull"
}
```

</details>

<details>
<summary>deleteQueryCategories</summary>

Deletes a `QueryCategory` entity from the QueryCategories collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteQueryCategories(code);
```

</details>

<details>
<summary>updateQueryCategories</summary>

Partially updates a `QueryCategory` entity (PATCH/MERGE semantics) in the QueryCategories collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>QueryCategory</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateQueryCategories(code, payload);
```

</details>

#### WebClientLaunchpads

<details>
<summary>webClientLaunchpadServiceGetList</summary>

Invokes the `WebClientLaunchpadService_GetList` function-import to retrieve the list of web client launchpad parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_49|error`

**Sample code:**

```ballerina
inline_response_200_49 result = check administrationClient->webClientLaunchpadServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientLaunchpadService_GetList",
  "value": [
    {
      "Guid": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientLaunchpads</summary>

Queries the WebClientLaunchpads collection and returns a page of `WebClientLaunchpad` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientLaunchpadsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWebClientLaunchpadsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `WebClientLaunchpadsCollectionResponse|error`

**Sample code:**

```ballerina
WebClientLaunchpadsCollectionResponse result = check administrationClient->listWebClientLaunchpads();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientLaunchpads",
  "value": [
    {
      "Guid": "550e8400-e29b-41d4-a716-446655440000",
      "ThemeId": "default",
      "UserId": 1,
      "DisplayQuickView": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createWebClientLaunchpads</summary>

Creates a new `WebClientLaunchpad` entity in the WebClientLaunchpads collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientLaunchpad</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientLaunchpad|error`

**Sample code:**

```ballerina
WebClientLaunchpad result = check administrationClient->createWebClientLaunchpads(payload);
```

**Sample response:**

```json
{
  "Guid": "550e8400-e29b-41d4-a716-446655440000",
  "ThemeId": "default",
  "UserId": 1,
  "NotificationShowDays": 7,
  "DisplayQuickView": "tYES",
  "WebClientLaunchpadGroups": []
}
```

</details>

<details>
<summary>getWebClientLaunchpads</summary>

Retrieves a single `WebClientLaunchpad` entity from the WebClientLaunchpads collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientLaunchpadsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `WebClientLaunchpad|error`

**Sample code:**

```ballerina
WebClientLaunchpad result = check administrationClient->getWebClientLaunchpads(guid);
```

**Sample response:**

```json
{
  "Guid": "550e8400-e29b-41d4-a716-446655440000",
  "ThemeId": "default",
  "UserId": 1
}
```

</details>

<details>
<summary>deleteWebClientLaunchpads</summary>

Deletes a `WebClientLaunchpad` entity from the WebClientLaunchpads collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteWebClientLaunchpads(guid);
```

</details>

<details>
<summary>updateWebClientLaunchpads</summary>

Partially updates a `WebClientLaunchpad` entity (PATCH/MERGE semantics) in the WebClientLaunchpads collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientLaunchpad</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateWebClientLaunchpads(guid, payload);
```

</details>

#### B1Sessions

<details>
<summary>listB1Sessions</summary>

Queries the B1Sessions collection and returns a page of `B1Session` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListB1SessionsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListB1SessionsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `B1SessionsCollectionResponse|error`

**Sample code:**

```ballerina
B1SessionsCollectionResponse result = check administrationClient->listB1Sessions();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#B1Sessions",
  "value": [
    {
      "SessionId": "9d8f2b1c-...",
      "Version": "10.0",
      "SessionTimeout": 30
    }
  ]
}
```

</details>

<details>
<summary>createB1Sessions</summary>

Creates a new `B1Session` entity in the B1Sessions collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>B1Session</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `B1Session|error`

**Sample code:**

```ballerina
B1Session result = check administrationClient->createB1Sessions(payload);
```

**Sample response:**

```json
{
  "SessionId": "9d8f2b1c-...",
  "Version": "10.0",
  "SessionTimeout": 30
}
```

</details>

<details>
<summary>getB1Sessions</summary>

Retrieves a single `B1Session` entity from the B1Sessions collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sessionId` | <code>string</code> | Yes | Key property 'SessionId' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetB1SessionsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `B1Session|error`

**Sample code:**

```ballerina
B1Session result = check administrationClient->getB1Sessions(sessionId);
```

**Sample response:**

```json
{
  "SessionId": "9d8f2b1c-...",
  "Version": "10.0"
}
```

</details>

<details>
<summary>deleteB1Sessions</summary>

Deletes a `B1Session` entity from the B1Sessions collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sessionId` | <code>string</code> | Yes | Key property 'SessionId' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteB1Sessions(sessionId);
```

</details>

<details>
<summary>updateB1Sessions</summary>

Partially updates a `B1Session` entity (PATCH/MERGE semantics) in the B1Sessions collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sessionId` | <code>string</code> | Yes | Key property 'SessionId' (Edm.String) |
| `payload` | <code>B1Session</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateB1Sessions(sessionId, payload);
```

</details>

#### Holidays

<details>
<summary>holidayServiceGetHolidayList</summary>

Invokes the `HolidayService_GetHolidayList` function-import to retrieve the list of holiday parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_22|error`

**Sample code:**

```ballerina
inline_response_200_22 result = check administrationClient->holidayServiceGetHolidayList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#HolidayService_GetHolidayList",
  "value": [
    {
      "HolidayCode": "NEWYEAR"
    }
  ]
}
```

</details>

<details>
<summary>listHolidays</summary>

Queries the Holidays collection and returns a page of `Holiday` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListHolidaysHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHolidaysQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `HolidaysCollectionResponse|error`

**Sample code:**

```ballerina
HolidaysCollectionResponse result = check administrationClient->listHolidays();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Holidays",
  "value": [
    {
      "HolidayCode": "NEWYEAR",
      "ValidForOneYearOnly": "tNO",
      "HolidayDates": [
        {
          "Date": "2026-01-01"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>createHolidays</summary>

Creates a new `Holiday` entity in the Holidays collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Holiday</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Holiday|error`

**Sample code:**

```ballerina
Holiday result = check administrationClient->createHolidays(payload);
```

**Sample response:**

```json
{
  "HolidayCode": "NEWYEAR",
  "ValidForOneYearOnly": "tNO",
  "SetWeekendsAsWorkDays": "tNO",
  "WeekendFrom": "wSaturday",
  "WeekendTO": "wSunday"
}
```

</details>

<details>
<summary>getHolidays</summary>

Retrieves a single `Holiday` entity from the Holidays collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `holidayCode` | <code>string</code> | Yes | Key property 'HolidayCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHolidaysQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Holiday|error`

**Sample code:**

```ballerina
Holiday result = check administrationClient->getHolidays(holidayCode);
```

**Sample response:**

```json
{
  "HolidayCode": "NEWYEAR",
  "ValidForOneYearOnly": "tNO"
}
```

</details>

<details>
<summary>deleteHolidays</summary>

Deletes a `Holiday` entity from the Holidays collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `holidayCode` | <code>string</code> | Yes | Key property 'HolidayCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteHolidays(holidayCode);
```

</details>

<details>
<summary>updateHolidays</summary>

Partially updates a `Holiday` entity (PATCH/MERGE semantics) in the Holidays collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `holidayCode` | <code>string</code> | Yes | Key property 'HolidayCode' (Edm.String) |
| `payload` | <code>Holiday</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateHolidays(holidayCode, payload);
```

</details>

#### UserDefaultGroups

<details>
<summary>listUserDefaultGroups</summary>

Queries the UserDefaultGroups collection and returns a page of `UserDefaultGroup` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserDefaultGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListUserDefaultGroupsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `UserDefaultGroupsCollectionResponse|error`

**Sample code:**

```ballerina
UserDefaultGroupsCollectionResponse result = check administrationClient->listUserDefaultGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserDefaultGroups",
  "value": [
    {
      "Code": "MAIN",
      "Name": "Main Default Group",
      "Warehouse": "01",
      "SalesEmployee": 1
    }
  ]
}
```

</details>

<details>
<summary>createUserDefaultGroups</summary>

Creates a new `UserDefaultGroup` entity in the UserDefaultGroups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserDefaultGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserDefaultGroup|error`

**Sample code:**

```ballerina
UserDefaultGroup result = check administrationClient->createUserDefaultGroups(payload);
```

**Sample response:**

```json
{
  "Code": "MAIN",
  "Name": "Main Default Group",
  "Warehouse": "01",
  "SalesEmployee": 1,
  "CashAccount": "_SYS00000001"
}
```

</details>

<details>
<summary>getUserDefaultGroups</summary>

Retrieves a single `UserDefaultGroup` entity from the UserDefaultGroups collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserDefaultGroupsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `UserDefaultGroup|error`

**Sample code:**

```ballerina
UserDefaultGroup result = check administrationClient->getUserDefaultGroups(code);
```

**Sample response:**

```json
{
  "Code": "MAIN",
  "Name": "Main Default Group",
  "Warehouse": "01"
}
```

</details>

<details>
<summary>deleteUserDefaultGroups</summary>

Deletes a `UserDefaultGroup` entity from the UserDefaultGroups collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteUserDefaultGroups(code);
```

</details>

<details>
<summary>updateUserDefaultGroups</summary>

Partially updates a `UserDefaultGroup` entity (PATCH/MERGE semantics) in the UserDefaultGroups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>UserDefaultGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateUserDefaultGroups(code, payload);
```

</details>

#### UserTablesMD

<details>
<summary>listUserTablesMD</summary>

Queries the UserTablesMD collection and returns a page of `UserTablesMD` entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserTablesMDHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListUserTablesMDQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `UserTablesMDCollectionResponse|error`

**Sample code:**

```ballerina
UserTablesMDCollectionResponse result = check administrationClient->listUserTablesMD();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserTablesMD",
  "value": [
    {
      "TableName": "MY_TABLE",
      "TableDescription": "Custom table",
      "TableType": "bott_MasterData",
      "Archivable": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createUserTablesMD</summary>

Creates a new `UserTablesMD` entity in the UserTablesMD collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserTablesMD</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserTablesMD|error`

**Sample code:**

```ballerina
UserTablesMD result = check administrationClient->createUserTablesMD(payload);
```

**Sample response:**

```json
{
  "TableName": "MY_TABLE",
  "TableDescription": "Custom table",
  "TableType": "bott_MasterData",
  "Archivable": "tNO",
  "DisplayMenu": "tYES",
  "ApplyAuthorization": "tNO"
}
```

</details>

<details>
<summary>getUserTablesMD</summary>

Retrieves a single `UserTablesMD` entity from the UserTablesMD collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Key property 'TableName' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserTablesMDQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `UserTablesMD|error`

**Sample code:**

```ballerina
UserTablesMD result = check administrationClient->getUserTablesMD(tableName);
```

**Sample response:**

```json
{
  "TableName": "MY_TABLE",
  "TableDescription": "Custom table",
  "TableType": "bott_MasterData"
}
```

</details>

<details>
<summary>deleteUserTablesMD</summary>

Deletes a `UserTablesMD` entity from the UserTablesMD collection by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Key property 'TableName' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->deleteUserTablesMD(tableName);
```

</details>

<details>
<summary>updateUserTablesMD</summary>

Partially updates a `UserTablesMD` entity (PATCH/MERGE semantics) in the UserTablesMD collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `tableName` | <code>string</code> | Yes | Key property 'TableName' (Edm.String) |
| `payload` | <code>UserTablesMD</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check administrationClient->updateUserTablesMD(tableName, payload);
```

</details>
#### ReportTypes

<details>
<summary>listReportTypes</summary>

Queries the ReportTypes collection and returns a page of report type entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListReportTypesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListReportTypesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ReportTypesCollectionResponse|error`

**Sample code:**

```ballerina
ReportTypesCollectionResponse result = check client->listReportTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#ReportTypes",
  "value": [
    {
      "TypeName": "Sales Analysis",
      "MenuID": "3073",
      "TypeCode": "SA_REPORT",
      "AddonName": "",
      "AddonFormType": "",
      "DefaultReportLayout": ""
    }
  ]
}
```

</details>

<details>
<summary>createReportTypes</summary>

Creates a new ReportType entity in SAP Business One.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ReportType</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ReportType|error`

**Sample code:**

```ballerina
ReportType result = check client->createReportTypes(payload);
```

**Sample response:**

```json
{
  "TypeName": "Sales Analysis",
  "MenuID": "3073",
  "TypeCode": "SA_REPORT",
  "AddonName": "",
  "AddonFormType": "",
  "DefaultReportLayout": ""
}
```

</details>

<details>
<summary>getReportTypes</summary>

Retrieves a single ReportType entity identified by its `TypeCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | Key property 'TypeCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetReportTypesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `ReportType|error`

**Sample code:**

```ballerina
ReportType result = check client->getReportTypes(typeCode);
```

**Sample response:**

```json
{
  "TypeName": "Sales Analysis",
  "MenuID": "3073",
  "TypeCode": "SA_REPORT",
  "AddonName": "",
  "AddonFormType": "",
  "DefaultReportLayout": ""
}
```

</details>

<details>
<summary>deleteReportTypes</summary>

Deletes the ReportType entity identified by its `TypeCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | Key property 'TypeCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteReportTypes(typeCode);
```

</details>

<details>
<summary>updateReportTypes</summary>

Partially updates a ReportType entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `typeCode` | <code>string</code> | Yes | Key property 'TypeCode' (Edm.String) |
| `payload` | <code>ReportType</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateReportTypes(typeCode, payload);
```

</details>

<details>
<summary>reportTypesServiceGetReportTypeList</summary>

Invokes the `ReportTypesService_GetReportTypeList` unbound function to retrieve the report type list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_35|error`

**Sample code:**

```ballerina
inline_response_200_35 result = check client->reportTypesServiceGetReportTypeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#ReportTypesService_GetReportTypeList",
  "value": [
    {
      "TypeName": "Sales Analysis",
      "MenuID": "3073",
      "TypeCode": "SA_REPORT",
      "AddonName": "",
      "AddonFormType": ""
    }
  ]
}
```

</details>

#### DistributionLists

<details>
<summary>listDistributionLists</summary>

Queries the DistributionLists collection and returns a page of distribution list entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDistributionListsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListDistributionListsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `DistributionListsCollectionResponse|error`

**Sample code:**

```ballerina
DistributionListsCollectionResponse result = check client->listDistributionLists();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#DistributionLists",
  "value": [
    {
      "Code": 1,
      "Name": "Finance Approvals",
      "DistributionListLines": [
        {
          "LineNumber": 0,
          "DistributionType": "dt_InternalUser",
          "DistributionCode": "manager",
          "Email": "manager@example.com"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>createDistributionLists</summary>

Creates a new DistributionList entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DistributionList</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DistributionList|error`

**Sample code:**

```ballerina
DistributionList result = check client->createDistributionLists(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Finance Approvals",
  "DistributionListLines": [
    {
      "LineNumber": 0,
      "DistributionType": "dt_InternalUser",
      "DistributionCode": "manager",
      "Email": "manager@example.com"
    }
  ]
}
```

</details>

<details>
<summary>getDistributionLists</summary>

Retrieves a single DistributionList entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDistributionListsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `DistributionList|error`

**Sample code:**

```ballerina
DistributionList result = check client->getDistributionLists(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Finance Approvals",
  "DistributionListLines": []
}
```

</details>

<details>
<summary>deleteDistributionLists</summary>

Deletes the DistributionList entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDistributionLists(code);
```

</details>

<details>
<summary>updateDistributionLists</summary>

Partially updates a DistributionList entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>DistributionList</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDistributionLists(code, payload);
```

</details>

<details>
<summary>distributionListsCancel</summary>

Invokes the bound action `Cancel` on a DistributionList entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->distributionListsCancel(code);
```

</details>

<details>
<summary>distributionListsClose</summary>

Invokes the bound action `Close` on a DistributionList entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->distributionListsClose(code);
```

</details>

<details>
<summary>distributionListsReopen</summary>

Invokes the bound action `Reopen` on a DistributionList entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->distributionListsReopen(code);
```

</details>

<details>
<summary>distributionListsServiceGetList</summary>

Invokes the `DistributionListsService_GetList` unbound function to retrieve the distribution list summary list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_18|error`

**Sample code:**

```ballerina
inline_response_200_18 result = check client->distributionListsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#DistributionListsService_GetList",
  "value": [
    {
      "Code": 1,
      "Name": "Finance Approvals"
    }
  ]
}
```

</details>

#### ValueMappingCommunication

<details>
<summary>listValueMappingCommunication</summary>

Queries the ValueMappingCommunication collection and returns a page of value mapping communication log entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListValueMappingCommunicationHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListValueMappingCommunicationQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ValueMappingCommunicationCollectionResponse|error`

**Sample code:**

```ballerina
ValueMappingCommunicationCollectionResponse result = check client->listValueMappingCommunication();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#ValueMappingCommunication",
  "value": [
    {
      "AbsEntry": 1,
      "ThirdPartySystemId": 2,
      "ObjectId": 17,
      "CommunicationType": "vmct_MasterData",
      "Status": "vmcs_Successful",
      "StartDate": "2026-07-01",
      "EndDate": "2026-07-01"
    }
  ]
}
```

</details>

<details>
<summary>createValueMappingCommunication</summary>

Creates a new ValueMappingCommunicationData entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ValueMappingCommunicationData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ValueMappingCommunicationData|error`

**Sample code:**

```ballerina
ValueMappingCommunicationData result = check client->createValueMappingCommunication(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ThirdPartySystemId": 2,
  "ObjectId": 17,
  "CommunicationType": "vmct_MasterData",
  "Status": "vmcs_Pending",
  "StartDate": "2026-07-01",
  "EndDate": "2026-07-01"
}
```

</details>

<details>
<summary>getValueMappingCommunication</summary>

Retrieves a single ValueMappingCommunicationData entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetValueMappingCommunicationQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `ValueMappingCommunicationData|error`

**Sample code:**

```ballerina
ValueMappingCommunicationData result = check client->getValueMappingCommunication(absEntry);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ThirdPartySystemId": 2,
  "ObjectId": 17,
  "CommunicationType": "vmct_MasterData",
  "Status": "vmcs_Error",
  "Message": "Mapping value not found"
}
```

</details>

<details>
<summary>deleteValueMappingCommunication</summary>

Deletes the ValueMappingCommunicationData entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteValueMappingCommunication(absEntry);
```

</details>

<details>
<summary>updateValueMappingCommunication</summary>

Partially updates a ValueMappingCommunicationData entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>ValueMappingCommunicationData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateValueMappingCommunication(absEntry, payload);
```

</details>

#### SQLViews

<details>
<summary>listSQLViews</summary>

Queries the SQLViews collection and returns a page of SQL view entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSQLViewsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListSQLViewsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `SQLViewsCollectionResponse|error`

**Sample code:**

```ballerina
SQLViewsCollectionResponse result = check client->listSQLViews();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#SQLViews",
  "value": [
    {
      "Name": "OpenInvoicesView",
      "DBType": "dt_SQLServer",
      "SchemaName": "dbo",
      "CreateDate": "2026-01-15"
    }
  ]
}
```

</details>

<details>
<summary>createSQLViews</summary>

Creates a new SQLView entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SQLView</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SQLView|error`

**Sample code:**

```ballerina
SQLView result = check client->createSQLViews(payload);
```

**Sample response:**

```json
{
  "Name": "OpenInvoicesView",
  "DBType": "dt_SQLServer",
  "SchemaName": "dbo",
  "CreateDate": "2026-01-15"
}
```

</details>

<details>
<summary>getSQLViews</summary>

Retrieves a single SQLView entity identified by its `Name` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | <code>string</code> | Yes | Key property 'Name' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSQLViewsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `SQLView|error`

**Sample code:**

```ballerina
SQLView result = check client->getSQLViews(name);
```

**Sample response:**

```json
{
  "Name": "OpenInvoicesView",
  "DBType": "dt_SQLServer",
  "SchemaName": "dbo",
  "CreateDate": "2026-01-15"
}
```

</details>

<details>
<summary>deleteSQLViews</summary>

Deletes the SQLView entity identified by its `Name` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | <code>string</code> | Yes | Key property 'Name' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSQLViews(name);
```

</details>

<details>
<summary>updateSQLViews</summary>

Partially updates a SQLView entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | <code>string</code> | Yes | Key property 'Name' (Edm.String) |
| `payload` | <code>SQLView</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSQLViews(name, payload);
```

</details>

<details>
<summary>sQLViewsExpose</summary>

Invokes the bound action `Expose` on a SQLView entity identified by its `Name` key, publishing the view for OData access.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | <code>string</code> | Yes | Key property 'Name' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->sQLViewsExpose(name);
```

</details>

<details>
<summary>sQLViewsUnexpose</summary>

Invokes the bound action `Unexpose` on a SQLView entity identified by its `Name` key, removing the view's OData exposure.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | <code>string</code> | Yes | Key property 'Name' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->sQLViewsUnexpose(name);
```

</details>

#### ApprovalTemplates

<details>
<summary>listApprovalTemplates</summary>

Queries the ApprovalTemplates collection and returns a page of approval template entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListApprovalTemplatesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListApprovalTemplatesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ApprovalTemplatesCollectionResponse|error`

**Sample code:**

```ballerina
ApprovalTemplatesCollectionResponse result = check client->listApprovalTemplates();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#ApprovalTemplates",
  "value": [
    {
      "Code": 1,
      "Name": "Purchase Order Approval",
      "IsActive": "tYES",
      "UseTerms": "tNO",
      "IsActiveWhenUpdatingDocuments": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createApprovalTemplates</summary>

Creates a new ApprovalTemplate entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprovalTemplate</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ApprovalTemplate|error`

**Sample code:**

```ballerina
ApprovalTemplate result = check client->createApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Purchase Order Approval",
  "IsActive": "tYES",
  "UseTerms": "tNO",
  "Remarks": "Requires manager sign-off"
}
```

</details>

<details>
<summary>getApprovalTemplates</summary>

Retrieves a single ApprovalTemplate entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprovalTemplatesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `ApprovalTemplate|error`

**Sample code:**

```ballerina
ApprovalTemplate result = check client->getApprovalTemplates(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Purchase Order Approval",
  "IsActive": "tYES",
  "UseTerms": "tNO"
}
```

</details>

<details>
<summary>deleteApprovalTemplates</summary>

Deletes the ApprovalTemplate entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprovalTemplates(code);
```

</details>

<details>
<summary>updateApprovalTemplates</summary>

Partially updates an ApprovalTemplate entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ApprovalTemplate</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprovalTemplates(code, payload);
```

</details>

<details>
<summary>approvalTemplatesServiceGetApprovalTemplateList</summary>

Invokes the `ApprovalTemplatesService_GetApprovalTemplateList` unbound function to retrieve the approval template summary list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
inline_response_200_5 result = check client->approvalTemplatesServiceGetApprovalTemplateList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#ApprovalTemplatesService_GetApprovalTemplateList",
  "value": [
    {
      "Code": 1,
      "Name": "Purchase Order Approval"
    }
  ]
}
```

</details>

#### IntegrationPackagesConfigure

<details>
<summary>listIntegrationPackagesConfigure</summary>

Queries the IntegrationPackagesConfigure collection and returns a page of integration package configuration entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIntegrationPackagesConfigureHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListIntegrationPackagesConfigureQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `IntegrationPackagesConfigureCollectionResponse|error`

**Sample code:**

```ballerina
IntegrationPackagesConfigureCollectionResponse result = check client->listIntegrationPackagesConfigure();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#IntegrationPackagesConfigure",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "B1i_INT_01",
      "Name": "SFTP Integration Package",
      "IsEnable": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createIntegrationPackagesConfigure</summary>

Creates a new IntegrationPackageConfigure entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IntegrationPackageConfigure</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `IntegrationPackageConfigure|error`

**Sample code:**

```ballerina
IntegrationPackageConfigure result = check client->createIntegrationPackagesConfigure(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "B1i_INT_01",
  "Name": "SFTP Integration Package",
  "IsEnable": "tYES"
}
```

</details>

<details>
<summary>getIntegrationPackagesConfigure</summary>

Retrieves a single IntegrationPackageConfigure entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIntegrationPackagesConfigureQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `IntegrationPackageConfigure|error`

**Sample code:**

```ballerina
IntegrationPackageConfigure result = check client->getIntegrationPackagesConfigure(absEntry);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "B1i_INT_01",
  "Name": "SFTP Integration Package",
  "IsEnable": "tYES"
}
```

</details>

<details>
<summary>deleteIntegrationPackagesConfigure</summary>

Deletes the IntegrationPackageConfigure entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteIntegrationPackagesConfigure(absEntry);
```

</details>

<details>
<summary>updateIntegrationPackagesConfigure</summary>

Partially updates an IntegrationPackageConfigure entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>IntegrationPackageConfigure</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateIntegrationPackagesConfigure(absEntry, payload);
```

</details>

<details>
<summary>integrationPackagesConfigureServiceGetList</summary>

Invokes the `IntegrationPackagesConfigureService_GetList` unbound function to retrieve the integration package configuration summary list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_23|error`

**Sample code:**

```ballerina
inline_response_200_23 result = check client->integrationPackagesConfigureServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#IntegrationPackagesConfigureService_GetList",
  "value": [
    {
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### WebClientFormSettings

<details>
<summary>webClientFormSettingServiceGetList</summary>

Invokes the `WebClientFormSettingService_GetList` unbound function to retrieve the web client form setting summary list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_48|error`

**Sample code:**

```ballerina
inline_response_200_48 result = check client->webClientFormSettingServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#WebClientFormSettingService_GetList",
  "value": [
    {
      "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientFormSettings</summary>

Queries the WebClientFormSettings collection and returns a page of web client form setting entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientFormSettingsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListWebClientFormSettingsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `WebClientFormSettingsCollectionResponse|error`

**Sample code:**

```ballerina
WebClientFormSettingsCollectionResponse result = check client->listWebClientFormSettings();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#WebClientFormSettings",
  "value": [
    {
      "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "FormId": "133",
      "DocObjectCode": "17",
      "UserId": 1,
      "WebClientFormSettingItems": []
    }
  ]
}
```

</details>

<details>
<summary>createWebClientFormSettings</summary>

Creates a new WebClientFormSetting entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientFormSetting</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientFormSetting|error`

**Sample code:**

```ballerina
WebClientFormSetting result = check client->createWebClientFormSettings(payload);
```

**Sample response:**

```json
{
  "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "FormId": "133",
  "DocObjectCode": "17",
  "UserId": 1
}
```

</details>

<details>
<summary>getWebClientFormSettings</summary>

Retrieves a single WebClientFormSetting entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientFormSettingsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `WebClientFormSetting|error`

**Sample code:**

```ballerina
WebClientFormSetting result = check client->getWebClientFormSettings(guid);
```

**Sample response:**

```json
{
  "Guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "FormId": "133",
  "DocObjectCode": "17",
  "UserId": 1
}
```

</details>

<details>
<summary>deleteWebClientFormSettings</summary>

Deletes the WebClientFormSetting entity identified by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientFormSettings(guid);
```

</details>

<details>
<summary>updateWebClientFormSettings</summary>

Partially updates a WebClientFormSetting entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientFormSetting</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientFormSettings(guid, payload);
```

</details>

#### Attachments2

<details>
<summary>listAttachments2</summary>

Queries the Attachments2 collection and returns a page of attachment entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAttachments2Headers</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListAttachments2Queries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `Attachments2CollectionResponse|error`

**Sample code:**

```ballerina
Attachments2CollectionResponse result = check client->listAttachments2();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#Attachments2",
  "value": [
    {
      "AbsoluteEntry": 1,
      "Attachments2_Lines": [
        {
          "FileName": "invoice",
          "FileExtension": "pdf"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary>createAttachments2</summary>

Creates a new Attachments2 entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Attachments2</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Attachments2|error`

**Sample code:**

```ballerina
Attachments2 result = check client->createAttachments2(payload);
```

**Sample response:**

```json
{
  "AbsoluteEntry": 1,
  "Attachments2_Lines": [
    {
      "FileName": "invoice",
      "FileExtension": "pdf"
    }
  ]
}
```

</details>

<details>
<summary>getAttachments2</summary>

Retrieves a single Attachments2 entity identified by its `AbsoluteEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAttachments2Queries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `Attachments2|error`

**Sample code:**

```ballerina
Attachments2 result = check client->getAttachments2(absoluteEntry);
```

**Sample response:**

```json
{
  "AbsoluteEntry": 1,
  "Attachments2_Lines": [
    {
      "FileName": "invoice",
      "FileExtension": "pdf"
    }
  ]
}
```

</details>

<details>
<summary>deleteAttachments2</summary>

Deletes the Attachments2 entity identified by its `AbsoluteEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAttachments2(absoluteEntry);
```

</details>

<details>
<summary>updateAttachments2</summary>

Partially updates an Attachments2 entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `payload` | <code>Attachments2</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAttachments2(absoluteEntry, payload);
```

</details>

#### FormPreferences

<details>
<summary>listFormPreferences</summary>

Queries the FormPreferences collection and returns a page of column preference entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListFormPreferencesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListFormPreferencesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `FormPreferencesCollectionResponse|error`

**Sample code:**

```ballerina
FormPreferencesCollectionResponse result = check client->listFormPreferences();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#FormPreferences",
  "value": [
    {
      "User": 1,
      "FormID": "133",
      "ItemNumber": "1",
      "Column": "ItemCode",
      "Width": 100,
      "VisibleInExpanded": "tYES",
      "EditableInForm": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createFormPreferences</summary>

Creates a new ColumnPreferences entity under the FormPreferences collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ColumnPreferences</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ColumnPreferences|error`

**Sample code:**

```ballerina
ColumnPreferences result = check client->createFormPreferences(payload);
```

**Sample response:**

```json
{
  "User": 1,
  "FormID": "133",
  "ItemNumber": "1",
  "Column": "ItemCode",
  "Width": 100,
  "VisibleInExpanded": "tYES",
  "EditableInForm": "tYES"
}
```

</details>

<details>
<summary>getFormPreferences</summary>

Retrieves a single ColumnPreferences entity identified by the composite key `User`/`FormID`/`ItemNumber`/`Column`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `user` | <code>int:Signed32</code> | Yes | Composite key part 'User' (Edm.Int32) |
| `formID` | <code>string</code> | Yes | Composite key part 'FormID' (Edm.String) |
| `itemNumber` | <code>string</code> | Yes | Composite key part 'ItemNumber' (Edm.String) |
| `column` | <code>string</code> | Yes | Composite key part 'Column' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFormPreferencesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `ColumnPreferences|error`

**Sample code:**

```ballerina
ColumnPreferences result = check client->getFormPreferences(user, formID, itemNumber, column);
```

**Sample response:**

```json
{
  "User": 1,
  "FormID": "133",
  "ItemNumber": "1",
  "Column": "ItemCode",
  "Width": 100
}
```

</details>

<details>
<summary>deleteFormPreferences</summary>

Deletes the ColumnPreferences entity identified by the composite key `User`/`FormID`/`ItemNumber`/`Column`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `user` | <code>int:Signed32</code> | Yes | Composite key part 'User' (Edm.Int32) |
| `formID` | <code>string</code> | Yes | Composite key part 'FormID' (Edm.String) |
| `itemNumber` | <code>string</code> | Yes | Composite key part 'ItemNumber' (Edm.String) |
| `column` | <code>string</code> | Yes | Composite key part 'Column' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFormPreferences(user, formID, itemNumber, column);
```

</details>

<details>
<summary>updateFormPreferences</summary>

Partially updates a ColumnPreferences entity using PATCH/MERGE semantics, identified by the composite key `User`/`FormID`/`ItemNumber`/`Column`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `user` | <code>int:Signed32</code> | Yes | Composite key part 'User' (Edm.Int32) |
| `formID` | <code>string</code> | Yes | Composite key part 'FormID' (Edm.String) |
| `itemNumber` | <code>string</code> | Yes | Composite key part 'ItemNumber' (Edm.String) |
| `column` | <code>string</code> | Yes | Composite key part 'Column' (Edm.String) |
| `payload` | <code>ColumnPreferences</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFormPreferences(user, formID, itemNumber, column, payload);
```

</details>

#### TSRExceptionalEvents

<details>
<summary>tSRExceptionalEventServiceGetList</summary>

Invokes the `TSRExceptionalEventService_GetList` unbound function to retrieve the TSR exceptional event summary list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_40|error`

**Sample code:**

```ballerina
inline_response_200_40 result = check client->tSRExceptionalEventServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#TSRExceptionalEventService_GetList",
  "value": [
    {
      "Code": "HOLIDAY"
    }
  ]
}
```

</details>

<details>
<summary>listTSRExceptionalEvents</summary>

Queries the TSRExceptionalEvents collection and returns a page of TSR exceptional event entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTSRExceptionalEventsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListTSRExceptionalEventsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `TSRExceptionalEventsCollectionResponse|error`

**Sample code:**

```ballerina
TSRExceptionalEventsCollectionResponse result = check client->listTSRExceptionalEvents();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#TSRExceptionalEvents",
  "value": [
    {
      "Code": "HOLIDAY",
      "Description": "Public Holiday"
    }
  ]
}
```

</details>

<details>
<summary>createTSRExceptionalEvents</summary>

Creates a new TSRExceptionalEvent entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TSRExceptionalEvent</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TSRExceptionalEvent|error`

**Sample code:**

```ballerina
TSRExceptionalEvent result = check client->createTSRExceptionalEvents(payload);
```

**Sample response:**

```json
{
  "Code": "HOLIDAY",
  "Description": "Public Holiday"
}
```

</details>

<details>
<summary>getTSRExceptionalEvents</summary>

Retrieves a single TSRExceptionalEvent entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTSRExceptionalEventsQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `TSRExceptionalEvent|error`

**Sample code:**

```ballerina
TSRExceptionalEvent result = check client->getTSRExceptionalEvents(code);
```

**Sample response:**

```json
{
  "Code": "HOLIDAY",
  "Description": "Public Holiday"
}
```

</details>

<details>
<summary>deleteTSRExceptionalEvents</summary>

Deletes the TSRExceptionalEvent entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTSRExceptionalEvents(code);
```

</details>

<details>
<summary>updateTSRExceptionalEvents</summary>

Partially updates a TSRExceptionalEvent entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>TSRExceptionalEvent</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTSRExceptionalEvents(code, payload);
```

</details>

#### UserQueries

<details>
<summary>listUserQueries</summary>

Queries the UserQueries collection and returns a page of user query entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserQueriesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server-side paging control) |
| `queries` | <code>ListUserQueriesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `UserQueriesCollectionResponse|error`

**Sample code:**

```ballerina
UserQueriesCollectionResponse result = check client->listUserQueries();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v1/$metadata#UserQueries",
  "value": [
    {
      "InternalKey": 1,
      "QueryCategory": 1,
      "QueryDescription": "Open Orders by Customer",
      "Query": "SELECT * FROM ORDR WHERE DocStatus = 'O'",
      "QueryType": "uqtRegular",
      "MenuCaption": "Open Orders"
    }
  ]
}
```

</details>

<details>
<summary>createUserQueries</summary>

Creates a new UserQuery entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserQuery</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserQuery|error`

**Sample code:**

```ballerina
UserQuery result = check client->createUserQueries(payload);
```

**Sample response:**

```json
{
  "InternalKey": 1,
  "QueryCategory": 1,
  "QueryDescription": "Open Orders by Customer",
  "Query": "SELECT * FROM ORDR WHERE DocStatus = 'O'",
  "QueryType": "uqtRegular",
  "MenuCaption": "Open Orders"
}
```

</details>

<details>
<summary>getUserQueries</summary>

Retrieves a single UserQuery entity identified by the composite key `InternalKey`/`QueryCategory`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Composite key part 'InternalKey' (Edm.Int32) |
| `queryCategory` | <code>int:Signed32</code> | Yes | Composite key part 'QueryCategory' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserQueriesQueries</code> | No | Queries to be sent with the request ($expand, $select) |

**Returns:** `UserQuery|error`

**Sample code:**

```ballerina
UserQuery result = check client->getUserQueries(internalKey, queryCategory);
```

**Sample response:**

```json
{
  "InternalKey": 1,
  "QueryCategory": 1,
  "QueryDescription": "Open Orders by Customer",
  "Query": "SELECT * FROM ORDR WHERE DocStatus = 'O'",
  "QueryType": "uqtRegular"
}
```

</details>

<details>
<summary>deleteUserQueries</summary>

Deletes the UserQuery entity identified by the composite key `InternalKey`/`QueryCategory`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Composite key part 'InternalKey' (Edm.Int32) |
| `queryCategory` | <code>int:Signed32</code> | Yes | Composite key part 'QueryCategory' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserQueries(internalKey, queryCategory);
```

</details>

<details>
<summary>updateUserQueries</summary>

Partially updates a UserQuery entity using PATCH/MERGE semantics, identified by the composite key `InternalKey`/`QueryCategory`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `internalKey` | <code>int:Signed32</code> | Yes | Composite key part 'InternalKey' (Edm.Int32) |
| `queryCategory` | <code>int:Signed32</code> | Yes | Composite key part 'QueryCategory' (Edm.Int32) |
| `payload` | <code>UserQuery</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUserQueries(internalKey, queryCategory, payload);
```

</details>
#### EventSubscriptions

<details>
<summary>listEventSubscriptions</summary>

Queries the EventSubscriptions collection and returns a page of webhook subscription entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEventSubscriptionsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListEventSubscriptionsQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `EventSubscriptionsCollectionResponse|error`

**Sample code:**

```ballerina
EventSubscriptionsCollectionResponse result = check client->listEventSubscriptions();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#EventSubscriptions",
  "value": [
    {
      "WebhookID": "WH-001",
      "WebhookURL": "https://example.com/hook",
      "State": "Active",
      "AuthenticationType": "None",
      "WorkMode": "Sync"
    }
  ],
  "odata.nextLink": "EventSubscriptions?$skip=20"
}
```

</details>

<details>
<summary>createEventSubscriptions</summary>

Creates a new EventSubscription (webhook registration) entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EventSubscription</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `EventSubscription|error`

**Sample code:**

```ballerina
EventSubscription result = check client->createEventSubscriptions(payload);
```

**Sample response:**

```json
{
  "WebhookID": "WH-001",
  "WebhookURL": "https://example.com/hook",
  "State": "Active",
  "Handshake": "tYES",
  "AuthenticationType": "None",
  "WorkMode": "Sync"
}
```

</details>

<details>
<summary>getEventSubscriptions</summary>

Gets a single EventSubscription by its `WebhookID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEventSubscriptionsQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `EventSubscription|error`

**Sample code:**

```ballerina
EventSubscription result = check client->getEventSubscriptions(webhookID);
```

**Sample response:**

```json
{
  "WebhookID": "WH-001",
  "WebhookURL": "https://example.com/hook",
  "State": "Active",
  "AuthenticationType": "None",
  "WorkMode": "Sync"
}
```

</details>

<details>
<summary>deleteEventSubscriptions</summary>

Deletes an EventSubscription by its `WebhookID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEventSubscriptions(webhookID);
```

</details>

<details>
<summary>updateEventSubscriptions</summary>

Partially updates an EventSubscription (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `payload` | <code>EventSubscription</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEventSubscriptions(webhookID, payload);
```

</details>

<details>
<summary>eventSubscriptionsHandshake</summary>

Invokes the bound action `Handshake` on an EventSubscription to verify webhook endpoint connectivity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->eventSubscriptionsHandshake(webhookID);
```

</details>

<details>
<summary>eventSubscriptionsPause</summary>

Invokes the bound action `Pause` on an EventSubscription to temporarily stop event delivery.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->eventSubscriptionsPause(webhookID);
```

</details>

<details>
<summary>eventSubscriptionsReplay</summary>

Invokes the bound action `Replay` on an EventSubscription to resend previously missed events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->eventSubscriptionsReplay(webhookID);
```

</details>

<details>
<summary>eventSubscriptionsResume</summary>

Invokes the bound action `Resume` on an EventSubscription to restart event delivery after a pause.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `webhookID` | <code>string</code> | Yes | Key property 'WebhookID' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->eventSubscriptionsResume(webhookID);
```

</details>

<details>
<summary>eventSubscriptionsServiceGetEventCatalog</summary>

Retrieves the catalog of events that can be subscribed to via webhooks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `EventCatagory|error`

**Sample code:**

```ballerina
EventCatagory result = check client->eventSubscriptionsServiceGetEventCatalog();
```

**Sample response:**

```json
{
  "Description": "Standard event catalog",
  "Version": "1.0",
  "Events": [
    {
      "EventName": "Invoice.Created"
    }
  ]
}
```

</details>

#### ApprovalRequests

<details>
<summary>listApprovalRequests</summary>

Queries the ApprovalRequests collection and returns a page of approval request entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListApprovalRequestsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListApprovalRequestsQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ApprovalRequestsCollectionResponse|error`

**Sample code:**

```ballerina
ApprovalRequestsCollectionResponse result = check client->listApprovalRequests();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ApprovalRequests",
  "value": [
    {
      "Code": 1,
      "Status": "ars_Pending",
      "IsDraft": "tYES",
      "OriginatorID": 1,
      "ObjectType": "17"
    }
  ],
  "odata.nextLink": "ApprovalRequests?$skip=20"
}
```

</details>

<details>
<summary>createApprovalRequests</summary>

Creates a new ApprovalRequest entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ApprovalRequest</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ApprovalRequest|error`

**Sample code:**

```ballerina
ApprovalRequest result = check client->createApprovalRequests(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Status": "ars_Pending",
  "IsDraft": "tYES",
  "OriginatorID": 1,
  "ObjectType": "17",
  "CurrentStage": 1
}
```

</details>

<details>
<summary>getApprovalRequests</summary>

Gets a single ApprovalRequest by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetApprovalRequestsQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `ApprovalRequest|error`

**Sample code:**

```ballerina
ApprovalRequest result = check client->getApprovalRequests(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Status": "ars_Pending",
  "IsDraft": "tYES",
  "OriginatorID": 1,
  "ObjectType": "17"
}
```

</details>

<details>
<summary>deleteApprovalRequests</summary>

Deletes an ApprovalRequest by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteApprovalRequests(code);
```

</details>

<details>
<summary>updateApprovalRequests</summary>

Partially updates an ApprovalRequest (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ApprovalRequest</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateApprovalRequests(code, payload);
```

</details>

<details>
<summary>approvalRequestsCancelApprovalRequest</summary>

Invokes the bound action `CancelApprovalRequest` on an ApprovalRequest to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->approvalRequestsCancelApprovalRequest(code);
```

</details>

<details>
<summary>approvalRequestsRestoreApprovalRequest</summary>

Invokes the bound action `RestoreApprovalRequest` on an ApprovalRequest to restore a previously cancelled/rejected request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->approvalRequestsRestoreApprovalRequest(code);
```

</details>

<details>
<summary>approvalRequestsServiceGetAllApprovalRequestsList</summary>

Gets the list of all approval requests visible to the current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 result = check client->approvalRequestsServiceGetAllApprovalRequestsList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "Status": "ars_Pending",
      "Remarks": "Awaiting manager approval",
      "Code": 1
    }
  ]
}
```

</details>

<details>
<summary>approvalRequestsServiceGetApprovalRequestList</summary>

Gets the list of approval requests assigned to the current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check client->approvalRequestsServiceGetApprovalRequestList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "Status": "ars_Pending",
      "Remarks": "Awaiting manager approval",
      "Code": 1
    }
  ]
}
```

</details>

<details>
<summary>approvalRequestsServiceGetOpenApprovalRequestList</summary>

Gets the list of open (unresolved) approval requests for the current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
inline_response_200_3 result = check client->approvalRequestsServiceGetOpenApprovalRequestList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "Status": "ars_Pending",
      "Remarks": "Awaiting manager approval",
      "Code": 1
    }
  ]
}
```

</details>

#### UserLanguages

<details>
<summary>listUserLanguages</summary>

Queries the UserLanguages collection and returns a page of user language entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserLanguagesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListUserLanguagesQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `UserLanguagesCollectionResponse|error`

**Sample code:**

```ballerina
UserLanguagesCollectionResponse result = check client->listUserLanguages();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserLanguages",
  "value": [
    {
      "Code": 1,
      "LanguageShortName": "EN",
      "LanguageFullName": "English",
      "RelatedSystemLanguage": 23
    }
  ],
  "odata.nextLink": "UserLanguages?$skip=20"
}
```

</details>

<details>
<summary>createUserLanguages</summary>

Creates a new UserLanguage entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserLanguage</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserLanguage|error`

**Sample code:**

```ballerina
UserLanguage result = check client->createUserLanguages(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "LanguageShortName": "EN",
  "LanguageFullName": "English",
  "RelatedSystemLanguage": 23
}
```

</details>

<details>
<summary>getUserLanguages</summary>

Gets a single UserLanguage by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserLanguagesQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `UserLanguage|error`

**Sample code:**

```ballerina
UserLanguage result = check client->getUserLanguages(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "LanguageShortName": "EN",
  "LanguageFullName": "English",
  "RelatedSystemLanguage": 23
}
```

</details>

<details>
<summary>deleteUserLanguages</summary>

Deletes a UserLanguage by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserLanguages(code);
```

</details>

<details>
<summary>updateUserLanguages</summary>

Partially updates a UserLanguage (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>UserLanguage</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUserLanguages(code, payload);
```

</details>

#### BusinessPlaces

<details>
<summary>listBusinessPlaces</summary>

Queries the BusinessPlaces collection and returns a page of business place entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBusinessPlacesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListBusinessPlacesQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `BusinessPlacesCollectionResponse|error`

**Sample code:**

```ballerina
BusinessPlacesCollectionResponse result = check client->listBusinessPlaces();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BusinessPlaces",
  "value": [
    {
      "BPLID": 1,
      "BPLName": "Head Office",
      "MainBPL": "tYES",
      "Disabled": "tNO",
      "City": "Colombo",
      "Country": "LK"
    }
  ],
  "odata.nextLink": "BusinessPlaces?$skip=20"
}
```

</details>

<details>
<summary>createBusinessPlaces</summary>

Creates a new BusinessPlace entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BusinessPlace</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BusinessPlace|error`

**Sample code:**

```ballerina
BusinessPlace result = check client->createBusinessPlaces(payload);
```

**Sample response:**

```json
{
  "BPLID": 1,
  "BPLName": "Head Office",
  "MainBPL": "tYES",
  "Disabled": "tNO",
  "City": "Colombo",
  "Country": "LK"
}
```

</details>

<details>
<summary>getBusinessPlaces</summary>

Gets a single BusinessPlace by its `BPLID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bPLID` | <code>int:Signed32</code> | Yes | Key property 'BPLID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBusinessPlacesQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `BusinessPlace|error`

**Sample code:**

```ballerina
BusinessPlace result = check client->getBusinessPlaces(bPLID);
```

**Sample response:**

```json
{
  "BPLID": 1,
  "BPLName": "Head Office",
  "MainBPL": "tYES",
  "Disabled": "tNO",
  "City": "Colombo",
  "Country": "LK"
}
```

</details>

<details>
<summary>deleteBusinessPlaces</summary>

Deletes a BusinessPlace by its `BPLID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bPLID` | <code>int:Signed32</code> | Yes | Key property 'BPLID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBusinessPlaces(bPLID);
```

</details>

<details>
<summary>updateBusinessPlaces</summary>

Partially updates a BusinessPlace (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `bPLID` | <code>int:Signed32</code> | Yes | Key property 'BPLID' (Edm.Int32) |
| `payload` | <code>BusinessPlace</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBusinessPlaces(bPLID, payload);
```

</details>

#### AlertManagements

<details>
<summary>listAlertManagements</summary>

Queries the AlertManagements collection and returns a page of alert management entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAlertManagementsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListAlertManagementsQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `AlertManagementsCollectionResponse|error`

**Sample code:**

```ballerina
AlertManagementsCollectionResponse result = check client->listAlertManagements();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#AlertManagements",
  "value": [
    {
      "Code": 1,
      "Name": "Low Stock Alert",
      "Type": "att_User",
      "Priority": "atp_High",
      "Active": "tYES",
      "FrequencyType": "atfi_Days"
    }
  ],
  "odata.nextLink": "AlertManagements?$skip=20"
}
```

</details>

<details>
<summary>createAlertManagements</summary>

Creates a new AlertManagement entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AlertManagement</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AlertManagement|error`

**Sample code:**

```ballerina
AlertManagement result = check client->createAlertManagements(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Low Stock Alert",
  "Type": "att_User",
  "Priority": "atp_High",
  "Active": "tYES",
  "FrequencyType": "atfi_Days"
}
```

</details>

<details>
<summary>getAlertManagements</summary>

Gets a single AlertManagement by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAlertManagementsQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `AlertManagement|error`

**Sample code:**

```ballerina
AlertManagement result = check client->getAlertManagements(code);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Low Stock Alert",
  "Type": "att_User",
  "Priority": "atp_High",
  "Active": "tYES",
  "FrequencyType": "atfi_Days"
}
```

</details>

<details>
<summary>deleteAlertManagements</summary>

Deletes an AlertManagement by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAlertManagements(code);
```

</details>

<details>
<summary>updateAlertManagements</summary>

Partially updates an AlertManagement (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>AlertManagement</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAlertManagements(code, payload);
```

</details>

<details>
<summary>alertManagementsGetAlertManagementList</summary>

Invokes the bound function `GetAlertManagementList` on an AlertManagement to retrieve a simplified list representation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 result = check client->alertManagementsGetAlertManagementList(code);
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "Type": "att_User",
      "Code": 1,
      "Name": "Low Stock Alert"
    }
  ]
}
```

</details>

#### Counties

<details>
<summary>listCounties</summary>

Queries the Counties collection and returns a page of county entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCountiesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListCountiesQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `CountiesCollectionResponse|error`

**Sample code:**

```ballerina
CountiesCollectionResponse result = check client->listCounties();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Counties",
  "value": [
    {
      "AbsId": 1,
      "Code": "07",
      "Country": "BR",
      "State": "SP",
      "Name": "Sao Paulo",
      "TaxZone": "tYES"
    }
  ],
  "odata.nextLink": "Counties?$skip=20"
}
```

</details>

<details>
<summary>createCounties</summary>

Creates a new County entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>County</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `County|error`

**Sample code:**

```ballerina
County result = check client->createCounties(payload);
```

**Sample response:**

```json
{
  "AbsId": 1,
  "Code": "07",
  "Country": "BR",
  "State": "SP",
  "Name": "Sao Paulo",
  "TaxZone": "tYES"
}
```

</details>

<details>
<summary>getCounties</summary>

Gets a single County by its `AbsId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCountiesQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `County|error`

**Sample code:**

```ballerina
County result = check client->getCounties(absId);
```

**Sample response:**

```json
{
  "AbsId": 1,
  "Code": "07",
  "Country": "BR",
  "State": "SP",
  "Name": "Sao Paulo",
  "TaxZone": "tYES"
}
```

</details>

<details>
<summary>deleteCounties</summary>

Deletes a County by its `AbsId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCounties(absId);
```

</details>

<details>
<summary>updateCounties</summary>

Partially updates a County (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `payload` | <code>County</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCounties(absId, payload);
```

</details>

<details>
<summary>countiesServiceGetCountyList</summary>

Gets a simplified list of counties (code/name pairs) from the CountiesService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_15|error`

**Sample code:**

```ballerina
inline_response_200_15 result = check client->countiesServiceGetCountyList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "Code": "07",
      "AbsId": 1,
      "Name": "Sao Paulo"
    }
  ]
}
```

</details>

#### SQLQueries

<details>
<summary>listSQLQueries</summary>

Queries the SQLQueries collection and returns a page of stored SQL query entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSQLQueriesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListSQLQueriesQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SQLQueriesCollectionResponse|error`

**Sample code:**

```ballerina
SQLQueriesCollectionResponse result = check client->listSQLQueries();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SQLQueries",
  "value": [
    {
      "SqlCode": "SQ001",
      "SqlName": "Open Orders",
      "SqlText": "SELECT * FROM ORDR WHERE DocStatus='O'",
      "ParamList": ""
    }
  ],
  "odata.nextLink": "SQLQueries?$skip=20"
}
```

</details>

<details>
<summary>createSQLQueries</summary>

Creates a new SQLQuery entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SQLQuery</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SQLQuery|error`

**Sample code:**

```ballerina
SQLQuery result = check client->createSQLQueries(payload);
```

**Sample response:**

```json
{
  "SqlCode": "SQ001",
  "SqlName": "Open Orders",
  "SqlText": "SELECT * FROM ORDR WHERE DocStatus='O'",
  "ParamList": ""
}
```

</details>

<details>
<summary>getSQLQueries</summary>

Gets a single SQLQuery by its `SqlCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sqlCode` | <code>string</code> | Yes | Key property 'SqlCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSQLQueriesQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `SQLQuery|error`

**Sample code:**

```ballerina
SQLQuery result = check client->getSQLQueries(sqlCode);
```

**Sample response:**

```json
{
  "SqlCode": "SQ001",
  "SqlName": "Open Orders",
  "SqlText": "SELECT * FROM ORDR WHERE DocStatus='O'",
  "ParamList": ""
}
```

</details>

<details>
<summary>deleteSQLQueries</summary>

Deletes a SQLQuery by its `SqlCode` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sqlCode` | <code>string</code> | Yes | Key property 'SqlCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSQLQueries(sqlCode);
```

</details>

<details>
<summary>updateSQLQueries</summary>

Partially updates a SQLQuery (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sqlCode` | <code>string</code> | Yes | Key property 'SqlCode' (Edm.String) |
| `payload` | <code>SQLQuery</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSQLQueries(sqlCode, payload);
```

</details>

<details>
<summary>sQLQueriesList2</summary>

Invokes the bound action `List` on a SQLQuery to execute it (with an optional parameter list) and return its result set.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `sqlCode` | <code>string</code> | Yes | Key property 'SqlCode' (Edm.String) |
| `payload` | <code>SQLQueriessqlCode_List_body</code> | Yes | Request payload containing `paramList` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SQLQueryResult|error`

**Sample code:**

```ballerina
SQLQueryResult result = check client->sQLQueriesList2(sqlCode, payload);
```

**Sample response:**

```json
{
  "SqlText": "SELECT * FROM ORDR WHERE DocStatus='O'"
}
```

</details>

#### WebClientListviewFilters

<details>
<summary>webClientListviewFilterServiceGetList</summary>

Gets a simplified list (GUIDs) of web client list-view filters via the WebClientListviewFilterService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_50|error`

**Sample code:**

```ballerina
inline_response_200_50 result = check client->webClientListviewFilterServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "Guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301"
    }
  ]
}
```

</details>

<details>
<summary>listWebClientListviewFilters</summary>

Queries the WebClientListviewFilters collection and returns a page of saved list-view filter entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWebClientListviewFiltersHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListWebClientListviewFiltersQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `WebClientListviewFiltersCollectionResponse|error`

**Sample code:**

```ballerina
WebClientListviewFiltersCollectionResponse result = check client->listWebClientListviewFilters();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#WebClientListviewFilters",
  "value": [
    {
      "Guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",
      "TableName": "OITM",
      "UserId": 1,
      "FilterName": "Active Items"
    }
  ],
  "odata.nextLink": "WebClientListviewFilters?$skip=20"
}
```

</details>

<details>
<summary>createWebClientListviewFilters</summary>

Creates a new WebClientListviewFilter entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WebClientListviewFilter</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WebClientListviewFilter|error`

**Sample code:**

```ballerina
WebClientListviewFilter result = check client->createWebClientListviewFilters(payload);
```

**Sample response:**

```json
{
  "Guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",
  "TableName": "OITM",
  "UserId": 1,
  "FilterName": "Active Items"
}
```

</details>

<details>
<summary>getWebClientListviewFilters</summary>

Gets a single WebClientListviewFilter by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWebClientListviewFiltersQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `WebClientListviewFilter|error`

**Sample code:**

```ballerina
WebClientListviewFilter result = check client->getWebClientListviewFilters(guid);
```

**Sample response:**

```json
{
  "Guid": "3F2504E0-4F89-11D3-9A0C-0305E82C3301",
  "TableName": "OITM",
  "UserId": 1,
  "FilterName": "Active Items"
}
```

</details>

<details>
<summary>deleteWebClientListviewFilters</summary>

Deletes a WebClientListviewFilter by its `Guid` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWebClientListviewFilters(guid);
```

</details>

<details>
<summary>updateWebClientListviewFilters</summary>

Partially updates a WebClientListviewFilter (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `guid` | <code>string</code> | Yes | Key property 'Guid' (Edm.String) |
| `payload` | <code>WebClientListviewFilter</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWebClientListviewFilters(guid, payload);
```

</details>

#### ChooseFromList

<details>
<summary>listChooseFromList</summary>

Queries the ChooseFromList collection and returns a page of choose-from-list configuration entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListChooseFromListHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListChooseFromListQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ChooseFromListCollectionResponse|error`

**Sample code:**

```ballerina
ChooseFromListCollectionResponse result = check client->listChooseFromList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ChooseFromList",
  "value": [
    {
      "ObjectName": "2",
      "ChooseFromList_Lines": [
        {
          "FieldIndex": 1,
          "FieldNo": "CardCode",
          "DisplayedName": "Customer Code",
          "Visible": "tYES"
        }
      ]
    }
  ],
  "odata.nextLink": "ChooseFromList?$skip=20"
}
```

</details>

<details>
<summary>createChooseFromList</summary>

Creates a new ChooseFromList entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ChooseFromList</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ChooseFromList|error`

**Sample code:**

```ballerina
ChooseFromList result = check client->createChooseFromList(payload);
```

**Sample response:**

```json
{
  "ObjectName": "2",
  "ChooseFromList_Lines": [
    {
      "FieldIndex": 1,
      "FieldNo": "CardCode",
      "DisplayedName": "Customer Code",
      "Visible": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>getChooseFromList</summary>

Gets a single ChooseFromList by its `ObjectName` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectName` | <code>string</code> | Yes | Key property 'ObjectName' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetChooseFromListQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `ChooseFromList|error`

**Sample code:**

```ballerina
ChooseFromList result = check client->getChooseFromList(objectName);
```

**Sample response:**

```json
{
  "ObjectName": "2",
  "ChooseFromList_Lines": [
    {
      "FieldIndex": 1,
      "FieldNo": "CardCode",
      "DisplayedName": "Customer Code",
      "Visible": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>deleteChooseFromList</summary>

Deletes a ChooseFromList by its `ObjectName` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectName` | <code>string</code> | Yes | Key property 'ObjectName' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteChooseFromList(objectName);
```

</details>

<details>
<summary>updateChooseFromList</summary>

Partially updates a ChooseFromList (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectName` | <code>string</code> | Yes | Key property 'ObjectName' (Edm.String) |
| `payload` | <code>ChooseFromList</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateChooseFromList(objectName, payload);
```

</details>

#### MultiLanguageTranslations

<details>
<summary>listMultiLanguageTranslations</summary>

Queries the MultiLanguageTranslations collection and returns a page of multi-language translation entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListMultiLanguageTranslationsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListMultiLanguageTranslationsQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `MultiLanguageTranslationsCollectionResponse|error`

**Sample code:**

```ballerina
MultiLanguageTranslationsCollectionResponse result = check client->listMultiLanguageTranslations();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#MultiLanguageTranslations",
  "value": [
    {
      "Numerator": 1,
      "TableName": "OITM",
      "FieldAlias": "ItemName",
      "PrimaryKeyofobject": "A0001"
    }
  ],
  "odata.nextLink": "MultiLanguageTranslations?$skip=20"
}
```

</details>

<details>
<summary>createMultiLanguageTranslations</summary>

Creates a new MultiLanguageTranslation entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MultiLanguageTranslation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MultiLanguageTranslation|error`

**Sample code:**

```ballerina
MultiLanguageTranslation result = check client->createMultiLanguageTranslations(payload);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "TableName": "OITM",
  "FieldAlias": "ItemName",
  "PrimaryKeyofobject": "A0001"
}
```

</details>

<details>
<summary>getMultiLanguageTranslations</summary>

Gets a single MultiLanguageTranslation by its `Numerator` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetMultiLanguageTranslationsQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `MultiLanguageTranslation|error`

**Sample code:**

```ballerina
MultiLanguageTranslation result = check client->getMultiLanguageTranslations(numerator);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "TableName": "OITM",
  "FieldAlias": "ItemName",
  "PrimaryKeyofobject": "A0001"
}
```

</details>

<details>
<summary>deleteMultiLanguageTranslations</summary>

Deletes a MultiLanguageTranslation by its `Numerator` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteMultiLanguageTranslations(numerator);
```

</details>

<details>
<summary>updateMultiLanguageTranslations</summary>

Partially updates a MultiLanguageTranslation (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `payload` | <code>MultiLanguageTranslation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateMultiLanguageTranslations(numerator, payload);
```

</details>

#### UserGroups

<details>
<summary>userGroupServiceGetUserGroupList</summary>

Gets a simplified list of user groups (id/name pairs) via the UserGroupService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_41|error`

**Sample code:**

```ballerina
inline_response_200_41 result = check client->userGroupServiceGetUserGroupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "UserGroupId": 1,
      "UserGroupName": "Sales"
    }
  ]
}
```

</details>

<details>
<summary>listUserGroups</summary>

Queries the UserGroups collection and returns a page of user group entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListUserGroupsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListUserGroupsQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `UserGroupsCollectionResponse|error`

**Sample code:**

```ballerina
UserGroupsCollectionResponse result = check client->listUserGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#UserGroups",
  "value": [
    {
      "UserGroupId": 1,
      "UserGroupName": "Sales",
      "UserGroupType": "gc_Authorization"
    }
  ],
  "odata.nextLink": "UserGroups?$skip=20"
}
```

</details>

<details>
<summary>createUserGroups</summary>

Creates a new UserGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `UserGroup|error`

**Sample code:**

```ballerina
UserGroup result = check client->createUserGroups(payload);
```

**Sample response:**

```json
{
  "UserGroupId": 1,
  "UserGroupName": "Sales",
  "UserGroupType": "gc_Authorization"
}
```

</details>

<details>
<summary>getUserGroups</summary>

Gets a single UserGroup by its `UserGroupId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userGroupId` | <code>int:Signed32</code> | Yes | Key property 'UserGroupId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserGroupsQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `UserGroup|error`

**Sample code:**

```ballerina
UserGroup result = check client->getUserGroups(userGroupId);
```

**Sample response:**

```json
{
  "UserGroupId": 1,
  "UserGroupName": "Sales",
  "UserGroupType": "gc_Authorization"
}
```

</details>

<details>
<summary>deleteUserGroups</summary>

Deletes a UserGroup by its `UserGroupId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userGroupId` | <code>int:Signed32</code> | Yes | Key property 'UserGroupId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserGroups(userGroupId);
```

</details>

<details>
<summary>updateUserGroups</summary>

Partially updates a UserGroup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userGroupId` | <code>int:Signed32</code> | Yes | Key property 'UserGroupId' (Edm.Int32) |
| `payload` | <code>UserGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateUserGroups(userGroupId, payload);
```

</details>

#### ValueMapping

<details>
<summary>listValueMapping</summary>

Queries the ValueMapping collection and returns a page of B1-side value mapping entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListValueMappingHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListValueMappingQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ValueMappingCollectionResponse|error`

**Sample code:**

```ballerina
ValueMappingCollectionResponse result = check client->listValueMapping();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ValueMapping",
  "value": [
    {
      "AbsEntry": 1,
      "ObjectId": 2,
      "ObjectAbsEntry": "1",
      "VM_ThirdPartyValuesCollection": [
        {
          "ThirdPartySystemId": 1,
          "LineId": 1,
          "ThirdPartyValue": "EXT-001"
        }
      ]
    }
  ],
  "odata.nextLink": "ValueMapping?$skip=20"
}
```

</details>

<details>
<summary>createValueMapping</summary>

Creates a new VM_B1ValuesData entity mapping a B1 value to one or more third-party values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>VMB1ValuesData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `VMB1ValuesData|error`

**Sample code:**

```ballerina
VMB1ValuesData result = check client->createValueMapping(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ObjectId": 2,
  "ObjectAbsEntry": "1",
  "VM_ThirdPartyValuesCollection": [
    {
      "ThirdPartySystemId": 1,
      "LineId": 1,
      "ThirdPartyValue": "EXT-001"
    }
  ]
}
```

</details>

<details>
<summary>getValueMapping</summary>

Gets a single VM_B1ValuesData entity by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetValueMappingQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `VMB1ValuesData|error`

**Sample code:**

```ballerina
VMB1ValuesData result = check client->getValueMapping(absEntry);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ObjectId": 2,
  "ObjectAbsEntry": "1",
  "VM_ThirdPartyValuesCollection": [
    {
      "ThirdPartySystemId": 1,
      "LineId": 1,
      "ThirdPartyValue": "EXT-001"
    }
  ]
}
```

</details>

<details>
<summary>deleteValueMapping</summary>

Deletes a VM_B1ValuesData entity by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteValueMapping(absEntry);
```

</details>

<details>
<summary>updateValueMapping</summary>

Partially updates a VM_B1ValuesData entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>VMB1ValuesData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateValueMapping(absEntry, payload);
```

</details>

<details>
<summary>listValueMappingCommunication</summary>

Queries the ValueMappingCommunication collection and returns a page of value-mapping communication log entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListValueMappingCommunicationHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging control) |
| `queries` | <code>ListValueMappingCommunicationQueries</code> | No | OData query options (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ValueMappingCommunicationCollectionResponse|error`

**Sample code:**

```ballerina
ValueMappingCommunicationCollectionResponse result = check client->listValueMappingCommunication();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ValueMappingCommunication",
  "value": [
    {
      "AbsEntry": 1,
      "ThirdPartySystemId": 1,
      "ObjectId": 2,
      "Status": "vmcs_Success",
      "CommunicationType": "vmct_Export"
    }
  ],
  "odata.nextLink": "ValueMappingCommunication?$skip=20"
}
```

</details>

<details>
<summary>createValueMappingCommunication</summary>

Creates a new ValueMappingCommunicationData entity to log a value-mapping communication event.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ValueMappingCommunicationData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ValueMappingCommunicationData|error`

**Sample code:**

```ballerina
ValueMappingCommunicationData result = check client->createValueMappingCommunication(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ThirdPartySystemId": 1,
  "ObjectId": 2,
  "Status": "vmcs_Success",
  "CommunicationType": "vmct_Export"
}
```

</details>

<details>
<summary>getValueMappingCommunication</summary>

Gets a single ValueMappingCommunicationData entity by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetValueMappingCommunicationQueries</code> | No | OData query options (`$expand`, `$select`) |

**Returns:** `ValueMappingCommunicationData|error`

**Sample code:**

```ballerina
ValueMappingCommunicationData result = check client->getValueMappingCommunication(absEntry);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "ThirdPartySystemId": 1,
  "ObjectId": 2,
  "Status": "vmcs_Success",
  "CommunicationType": "vmct_Export"
}
```

</details>

<details>
<summary>deleteValueMappingCommunication</summary>

Deletes a ValueMappingCommunicationData entity by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteValueMappingCommunication(absEntry);
```

</details>

<details>
<summary>updateValueMappingCommunication</summary>

Partially updates a ValueMappingCommunicationData entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>ValueMappingCommunicationData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateValueMappingCommunication(absEntry, payload);
```

</details>

<details>
<summary>valueMappingServiceGetMappedB1Value</summary>

Looks up the B1 value mapped to a given third-party value via the ValueMappingService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ValueMappingService_GetMappedB1Value_body</code> | Yes | Request payload containing `vMB1ValuesData` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_44|error`

**Sample code:**

```ballerina
inline_response_200_44 result = check client->valueMappingServiceGetMappedB1Value(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "AbsEntry": 1,
      "ObjectId": 2,
      "ObjectAbsEntry": "1"
    }
  ]
}
```

</details>

<details>
<summary>valueMappingServiceGetThirdPartyValuesForB1Value</summary>

Looks up the third-party values mapped to a given B1 value via the ValueMappingService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ValueMappingService_GetThirdPartyValuesForB1Value_body</code> | Yes | Request payload containing `vMB1ValuesData` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_45|error`

**Sample code:**

```ballerina
inline_response_200_45 result = check client->valueMappingServiceGetThirdPartyValuesForB1Value(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Edm.String",
  "value": [
    {
      "ThirdPartySystemId": 1,
      "LineId": 1,
      "ThirdPartyValue": "EXT-001",
      "AbsEntry": 1
    }
  ]
}
```

</details>

<details>
<summary>valueMappingServiceRemoveMappedValue</summary>

Removes a third-party value mapping via the ValueMappingService.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ValueMappingService_RemoveMappedValue_body</code> | Yes | Request payload containing `vMThirdPartyValuesData` |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->valueMappingServiceRemoveMappedValue(payload);
```

</details>
