---
title: Actions
---

# Actions

The Salesforce connector spans 5 packages:
- `ballerinax/salesforce`
- `ballerinax/salesforce.apex`
- `ballerinax/salesforce.bulk`
- `ballerinax/salesforce.bulkv2`
- `ballerinax/salesforce.soap`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | REST API: record CRUD, SOQL/SOSL, metadata, reports, password management, batch, invocable actions. |
| [`Apex Client`](#apex-client) | Execute custom Apex REST endpoints exposed by your Salesforce org. |
| [`Bulk Client`](#bulk-client) | Bulk API v1: manage jobs and batches for large-scale CSV/JSON/XML data operations. |
| [`Bulk V2 Client`](#bulk-v2-client) | Bulk API v2: simplified ingest and query jobs for large-scale data loads. |
| [`Soap Client`](#soap-client) | SOAP API: lead conversion using the Salesforce SOAP protocol. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Client

REST API: record CRUD, SOQL/SOSL, metadata, reports, password management, batch, and invocable actions.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | <code>string</code> | Required | Salesforce instance URL (e.g., `https://your-instance.salesforce.com`). |
| `auth` | <code>OAuth2RefreshTokenGrantConfig&#124;OAuth2PasswordGrantConfig&#124;OAuth2ClientCredentialsGrantConfig&#124;BearerTokenConfig</code> | Required | OAuth 2.0 configuration or bearer token. |
| `apiVersion` | <code>string</code> | <code>"59.0"</code> | Salesforce REST API version. |
| `httpVersion` | <code>HttpVersion</code> | <code>HTTP_2_0</code> | HTTP protocol version. |
| `timeout` | <code>decimal</code> | <code>60</code> | Request timeout in seconds. |
| `retryConfig` | <code>RetryConfig</code> | <code>()</code> | Retry configuration for failed requests. |
| `secureSocket` | <code>ClientSecureSocket</code> | <code>()</code> | SSL/TLS configuration. |
| `proxy` | <code>ProxyConfig</code> | <code>()</code> | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/salesforce;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

salesforce:Client salesforceClient = check new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});
```

### Operations

#### Record CRUD

<details>
<summary>getById</summary>

Retrieves a record by its Salesforce ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sobjectName` | <code>string</code> | Yes | API name of the sObject (e.g., `"Account"`). |
| `id` | <code>string</code> | Yes | The Salesforce record ID. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected return type. |

**Returns:** `returnType|error`

**Sample code:**

```ballerina
record {} account = check salesforceClient->getById("Account", "0015g00000XXXXX");
```

**Sample response:**

```json
{"Id": "0015g00000XXXXX", "Name": "Acme Corporation", "Industry": "Technology"}
```

</details>

<details>
<summary>getByExternalId</summary>

Retrieves a record using an external ID field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sobjectName` | <code>string</code> | Yes | API name of the sObject. |
| `extIdField` | <code>string</code> | Yes | The external ID field name. |
| `extId` | <code>string</code> | Yes | The external ID value. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected return type. |

**Returns:** `returnType|error`

**Sample code:**

```ballerina
record {} account = check salesforceClient->getByExternalId("Account", "External_Id__c", "EXT-001");
```

**Sample response:**

```json
{"Id": "0015g00000XXXXX", "Name": "Acme Corp", "External_Id__c": "EXT-001"}
```

</details>

<details>
<summary>create</summary>

Creates a new record of the specified sObject type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `sObject` | <code>record &#123;&#125;</code> | Yes | Fields and values for the new record. |

**Returns:** `CreationResponse|error`

**Sample code:**

```ballerina
salesforce:CreationResponse res = check salesforceClient->create("Account", {
    Name: "New Account",
    Industry: "Technology"
});
```

**Sample response:**

```json
{"id": "0015g00000YYYYY", "success": true, "errors": []}
```

</details>

<details>
<summary>update</summary>

Updates an existing record identified by its Salesforce ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `id` | <code>string</code> | Yes | The Salesforce record ID to update. |
| `sObject` | <code>record &#123;&#125;</code> | Yes | Fields and new values to apply. |

**Returns:** `error?`

**Sample code:**

```ballerina
check salesforceClient->update("Account", "0015g00000XXXXX", {
    Industry: "Finance"
});
```

</details>

<details>
<summary>upsert</summary>

Creates or updates a record based on an external ID field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `externalIdField` | <code>string</code> | Yes | The external ID field name used to match records. |
| `externalId` | <code>string</code> | Yes | The external ID value. |
| `sObject` | <code>record &#123;&#125;</code> | Yes | Fields and values for the upsert. |

**Returns:** `error?`

**Sample code:**

```ballerina
check salesforceClient->upsert("Account", "External_Id__c", "EXT-001", {
    Name: "Acme Corp Updated",
    Industry: "Technology"
});
```

</details>

<details>
<summary>delete</summary>

Deletes a record by its Salesforce ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `id` | <code>string</code> | Yes | The Salesforce record ID to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check salesforceClient->delete("Account", "0015g00000XXXXX");
```

</details>

<details>
<summary>deleteRecordsUsingExtId</summary>

Deletes a record using an external ID field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `externalId` | <code>string</code> | Yes | The external ID field name. |
| `value` | <code>string</code> | Yes | The external ID value. |

**Returns:** `error?`

**Sample code:**

```ballerina
check salesforceClient->deleteRecordsUsingExtId("Account", "External_Id__c", "EXT-001");
```

</details>

#### Query & Search

<details>
<summary>query</summary>

Executes a SOQL query and returns matching records as a stream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `soql` | <code>string</code> | Yes | A valid SOQL query string. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected record type for results. |

**Returns:** `stream<returnType, error?>|error`

**Sample code:**

```ballerina
stream<record {}, error?> results = check salesforceClient->query(
    "SELECT Id, Name FROM Account WHERE Industry = 'Technology'"
);
check from record {} account in results
    do {
        // process each account record
    };
```

**Sample response:**

```json
{"Id": "0015g00000XXXXX", "Name": "Acme Corp"}
```

</details>

<details>
<summary>search</summary>

Executes a SOSL search and returns matching records as a stream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sosl` | <code>string</code> | Yes | A valid SOSL search string. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected record type for results. |

**Returns:** `stream<returnType, error?>|error`

**Sample code:**

```ballerina
stream<record {}, error?> results = check salesforceClient->search(
    "FIND {Acme} IN ALL FIELDS RETURNING Account(Id, Name)"
);
check from record {} item in results
    do {
        // process each search result
    };
```

</details>

#### Metadata & Utilities

<details>
<summary>getApiVersions</summary>

Returns a list of all available Salesforce REST API versions.

**Returns:** `Version[]|error`

**Sample code:**

```ballerina
salesforce:Version[] versions = check salesforceClient->getApiVersions();
```

**Sample response:**

```json
[{"label": "Winter '24", "url": "/services/data/v59.0", "version": "59.0"}]
```

</details>

<details>
<summary>getResources</summary>

Lists the resources available for the specified API version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiVersion` | <code>string</code> | Yes | API version string (e.g., `"v59"`). |

**Returns:** `map<string>|error`

**Sample code:**

```ballerina
map<string> resources = check salesforceClient->getResources("v59");
```

**Sample response:**

```json
{"sobjects": "/services/data/v59.0/sobjects", "query": "/services/data/v59.0/query"}
```

</details>

<details>
<summary>getLimits</summary>

Returns the API limits information for your organization.

**Returns:** `map|error`

**Sample code:**

```ballerina
map<salesforce:Limit> limits = check salesforceClient->getLimits();
```

**Sample response:**

```json
{"DailyApiRequests": {"Max": 15000, "Remaining": 14998}}
```

</details>

<details>
<summary>getOrganizationMetaData</summary>

Retrieves metadata about the current Salesforce org.

**Returns:** `OrganizationMetadata|error`

**Sample code:**

```ballerina
salesforce:OrganizationMetadata meta = check salesforceClient->getOrganizationMetaData();
```

**Sample response:**

```json
{"encoding": "UTF-8", "maxBatchSize": 200, "sobjects": []}
```

</details>

<details>
<summary>getBasicInfo</summary>

Gets basic metadata for a specific sObject type, including recent items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sobjectName` | <code>string</code> | Yes | API name of the sObject. |

**Returns:** `SObjectBasicInfo|error`

**Sample code:**

```ballerina
salesforce:SObjectBasicInfo info = check salesforceClient->getBasicInfo("Account");
```

**Sample response:**

```json
{"objectDescribe": {"name": "Account", "label": "Account", "keyPrefix": "001"}}
```

</details>

<details>
<summary>describe</summary>

Completely describes the individual metadata at all levels of the specified sObject.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |

**Returns:** `SObjectMetaData|error`

**Sample code:**

```ballerina
salesforce:SObjectMetaData meta = check salesforceClient->describe("Account");
```

**Sample response:**

```json
{"name": "Account", "label": "Account", "fields": [], "childRelationships": []}
```

</details>

<details>
<summary>getPlatformAction</summary>

Queries for actions displayed in the UI, given a user, a context, device format, and a record ID.

**Returns:** `SObjectBasicInfo|error`

**Sample code:**

```ballerina
salesforce:SObjectBasicInfo actions = check salesforceClient->getPlatformAction();
```

**Sample response:**

```json
{"objectDescribe": {"name": "PlatformAction", "label": "Platform Action"}}
```

</details>

#### Deleted & Updated Records

<details>
<summary>getDeletedRecords</summary>

Retrieves the list of individual records that have been deleted within the given timespan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `startDate` | <code>time:Civil</code> | Yes | Start date of the timespan. |
| `endDate` | <code>time:Civil</code> | Yes | End date of the timespan. |

**Returns:** `DeletedRecordsResult|error`

**Sample code:**

```ballerina
import ballerina/time;

salesforce:DeletedRecordsResult deleted = check salesforceClient->getDeletedRecords(
    "Account",
    {year: 2026, month: 4, day: 1, hour: 0, minute: 0},
    {year: 2026, month: 4, day: 23, hour: 0, minute: 0}
);
```

**Sample response:**

```json
{"deletedRecords": [{"id": "0015g00000XXXXX", "deletedDate": "2026-04-15T10:30:00.000+0000"}], "earliestDateAvailable": "2026-01-01T00:00:00.000+0000", "latestDateCovered": "2026-04-23T00:00:00.000+0000"}
```

</details>

<details>
<summary>getUpdatedRecords</summary>

Retrieves the list of individual records that have been updated within the given timespan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `startDate` | <code>time:Civil</code> | Yes | Start date of the timespan. |
| `endDate` | <code>time:Civil</code> | Yes | End date of the timespan. |

**Returns:** `UpdatedRecordsResults|error`

**Sample code:**

```ballerina
import ballerina/time;

salesforce:UpdatedRecordsResults updated = check salesforceClient->getUpdatedRecords(
    "Account",
    {year: 2026, month: 4, day: 1, hour: 0, minute: 0},
    {year: 2026, month: 4, day: 23, hour: 0, minute: 0}
);
```

**Sample response:**

```json
{"ids": ["0015g00000XXXXX", "0015g00000YYYYY"], "latestDateCovered": "2026-04-23T00:00:00.000+0000"}
```

</details>

#### Reports

<details>
<summary>listReports</summary>

Returns a list of all reports available in the org.

**Returns:** `Report[]|error`

**Sample code:**

```ballerina
salesforce:Report[] reports = check salesforceClient->listReports();
```

**Sample response:**

```json
[{"id": "00O5g000005XXXXX", "name": "Quarterly Sales Report", "url": "/services/data/v59.0/analytics/reports/00O5g000005XXXXX"}]
```

</details>

<details>
<summary>runReportSync</summary>

Executes a Salesforce report synchronously and returns the results.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The ID of the report to run. |

**Returns:** `ReportInstanceResult|error`

**Sample code:**

```ballerina
salesforce:ReportInstanceResult results = check salesforceClient->runReportSync("00O5g000005XXXXX");
```

**Sample response:**

```json
{"attributes": {"reportId": "00O5g000005XXXXX", "type": "Report"}, "hasDetailRows": true}
```

</details>

<details>
<summary>runReportAsync</summary>

Executes a Salesforce report asynchronously and returns the report instance metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The ID of the report to run. |

**Returns:** `ReportInstance|error`

**Sample code:**

```ballerina
salesforce:ReportInstance instance = check salesforceClient->runReportAsync("00O5g000005XXXXX");
```

**Sample response:**

```json
{"id": "0LG5g000001XXXXX", "status": "Running", "requestDate": "2026-04-23T10:00:00.000+0000"}
```

</details>

<details>
<summary>listAsyncRunsOfReport</summary>

Lists all asynchronous run instances of a report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The ID of the report. |

**Returns:** `ReportInstance[]|error`

**Sample code:**

```ballerina
salesforce:ReportInstance[] instances = check salesforceClient->listAsyncRunsOfReport("00O5g000005XXXXX");
```

**Sample response:**

```json
[{"id": "0LG5g000001XXXXX", "status": "Success", "requestDate": "2026-04-23T10:00:00.000+0000"}]
```

</details>

<details>
<summary>getReportInstanceResult</summary>

Retrieves the results of a specific asynchronous report run instance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The ID of the report. |
| `instanceId` | <code>string</code> | Yes | The ID of the report instance. |

**Returns:** `ReportInstanceResult|error`

**Sample code:**

```ballerina
salesforce:ReportInstanceResult result = check salesforceClient->getReportInstanceResult("00O5g000005XXXXX", "0LG5g000001XXXXX");
```

**Sample response:**

```json
{"attributes": {"reportId": "00O5g000005XXXXX", "type": "Report"}, "hasDetailRows": true}
```

</details>

<details>
<summary>deleteReport</summary>

Deletes a report by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportId` | <code>string</code> | Yes | The ID of the report to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check salesforceClient->deleteReport("00O5g000005XXXXX");
```

</details>

#### Password Management

<details>
<summary>isPasswordExpired</summary>

Checks whether a user's password has expired.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The Salesforce user ID. |

**Returns:** `boolean|error`

**Sample code:**

```ballerina
boolean expired = check salesforceClient->isPasswordExpired("0055g00000XXXXX");
```

**Sample response:**

```json
false
```

</details>

<details>
<summary>resetPassword</summary>

Resets a user's password and returns the new auto-generated password.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The Salesforce user ID. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] newPassword = check salesforceClient->resetPassword("0055g00000XXXXX");
```

**Sample response:**

```json
[78, 101, 119, 80, 97, 115, 115]
```

</details>

<details>
<summary>changePassword</summary>

Changes a user's password to a specified new password.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The Salesforce user ID. |
| `newPassword` | <code>string</code> | Yes | The new password value. |

**Returns:** `error?`

**Sample code:**

```ballerina
check salesforceClient->changePassword("0055g00000XXXXX", "NewSecureP@ss1");
```

</details>

#### Batch & Invocable Actions

<details>
<summary>batch</summary>

Executes a batch of up to 25 subrequests in a single API call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `batchRequests` | <code>Subrequest[]</code> | Yes | Array of subrequests to execute. |
| `haltOnError` | <code>boolean</code> | No | If true, stops processing on first error. Defaults to `false`. |

**Returns:** `BatchResult|error`

**Sample code:**

```ballerina
salesforce:BatchResult batchResult = check salesforceClient->batch([
    {method: "GET", url: "v59.0/sobjects/Account/0015g00000XXXXX"},
    {method: "GET", url: "v59.0/sobjects/Contact/0035g00000YYYYY"}
]);
```

**Sample response:**

```json
{"hasErrors": false, "results": [{"statusCode": 200, "result": {"Id": "0015g00000XXXXX"}}]}
```

</details>

<details>
<summary>getQuickActions</summary>

Returns the list of quick actions available for a given sObject.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |

**Returns:** `QuickAction[]|error`

**Sample code:**

```ballerina
salesforce:QuickAction[] actions = check salesforceClient->getQuickActions("Account");
```

**Sample response:**

```json
[{"label": "New Contact", "name": "NewContact", "type": "Create"}]
```

</details>

<details>
<summary>getInvocableActions</summary>

Lists the invocable actions available for a given sub-context.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subContext` | <code>string</code> | Yes | The sub-context for the invocable action (e.g., `"standard"`). |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected return type. |

**Returns:** `returnType|error`

**Sample code:**

```ballerina
record {} actions = check salesforceClient->getInvocableActions("standard");
```

**Sample response:**

```json
{"actions": [{"label": "Send Email", "name": "emailSimple", "type": "INVOCABLEACTION"}]}
```

</details>

<details>
<summary>invokeActions</summary>

Invokes a specific action with the given payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subContext` | <code>string</code> | Yes | The sub-context for the invocable action. |
| `payload` | <code>record &#123;&#125;</code> | Yes | The action request payload. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected return type. |

**Returns:** `returnType|error`

**Sample code:**

```ballerina
record {} result = check salesforceClient->invokeActions("standard/emailSimple", {
    inputs: [{emailBody: "Hello", emailSubject: "Test", emailAddresses: "user@example.com"}]
});
```

**Sample response:**

```json
[{"actionName": "emailSimple", "isSuccess": true, "outputValues": {}}]
```

</details>

<details>
<summary>getNamedLayouts</summary>

Retrieves information about alternate named layouts for a given sObject.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sObjectName` | <code>string</code> | Yes | API name of the sObject. |
| `layoutName` | <code>string</code> | Yes | The layout name. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&gt;</code> | No | Expected return type. |

**Returns:** `returnType|error`

**Sample code:**

```ballerina
record {} layout = check salesforceClient->getNamedLayouts("Account", "AllFields");
```

**Sample response:**

```json
{"layouts": [{"id": "00h5g000000XXXXX"}]}
```

</details>

---

## Apex Client

Execute custom Apex REST endpoints exposed by your Salesforce org.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | <code>string</code> | Required | Salesforce instance URL. |
| `auth` | <code>OAuth2RefreshTokenGrantConfig&#124;OAuth2PasswordGrantConfig&#124;OAuth2ClientCredentialsGrantConfig&#124;BearerTokenConfig</code> | Required | OAuth 2.0 configuration or bearer token. |
| `httpVersion` | <code>HttpVersion</code> | <code>HTTP_2_0</code> | HTTP protocol version. |
| `timeout` | <code>decimal</code> | <code>60</code> | Request timeout in seconds. |

### Initializing the client

```ballerina
import ballerinax/salesforce.apex;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

apex:Client apexClient = check new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});
```

### Operations

#### Apex REST

<details>
<summary>apexRestExecute</summary>

Sends a request to a custom Apex REST endpoint using the specified HTTP method. This single function replaces the individual `get`, `post`, `put`, `patch`, and `delete` methods from earlier versions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `urlPath` | <code>string</code> | Yes | The relative path of the Apex REST resource (e.g., `"/MyEndpoint/"`). |
| `methodType` | <code>http:Method</code> | Yes | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`. |
| `payload` | <code>record &#123;&#125;</code> | No | Request body payload. Defaults to `{}`. |
| `returnType` | <code>typedesc&lt;record &#123;&#125;&#124;string&#124;int?&gt;</code> | No | Expected return type. |

**Returns:** `returnType|error`

**Sample code:**

```ballerina
import ballerina/http;

// GET request
record {} getResult = check apexClient->apexRestExecute("/MyApexEndpoint/", http:GET);

// POST request
record {} postResult = check apexClient->apexRestExecute("/MyApexEndpoint/", http:POST, {
    accountId: "0015g00000XXXXX",
    action: "process"
});
```

**Sample response:**

```json
{"status": "success", "message": "Operation completed"}
```

</details>

---

## Bulk Client

Bulk API v1: manage jobs and batches for large-scale CSV/JSON/XML data operations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | <code>string</code> | Required | Salesforce instance URL. |
| `auth` | <code>OAuth2RefreshTokenGrantConfig&#124;OAuth2PasswordGrantConfig&#124;OAuth2ClientCredentialsGrantConfig&#124;BearerTokenConfig</code> | Required | OAuth 2.0 configuration or bearer token. |
| `httpVersion` | <code>HttpVersion</code> | <code>HTTP_2_0</code> | HTTP protocol version. |
| `timeout` | <code>decimal</code> | <code>60</code> | Request timeout in seconds. |

### Initializing the client

```ballerina
import ballerinax/salesforce.bulk;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

bulk:Client bulkClient = check new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});
```

### Operations

#### Job Management

<details>
<summary>createJob</summary>

Creates a new Bulk API v1 job for the given operation and sObject.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operation` | <code>Operation</code> | Yes | Bulk operation type: `INSERT`, `UPDATE`, `UPSERT`, `DELETE`, or `QUERY`. |
| `sobj` | <code>string</code> | Yes | API name of the sObject. |
| `contentType` | <code>JobType</code> | Yes | Content type of the batch data: `CSV`, `JSON`, or `XML`. |
| `extIdFieldName` | <code>string</code> | No | External ID field name (required for `UPSERT`). Defaults to `""`. |

**Returns:** `BulkJob|error`

**Sample code:**

```ballerina
bulk:BulkJob job = check bulkClient->createJob(bulk:INSERT, "Contact", bulk:CSV);
```

**Sample response:**

```json
{"jobId": "7505g000005XXXXX", "jobDataType": "CSV"}
```

</details>

<details>
<summary>getJobInfo</summary>

Returns the current status and metadata of a job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object returned from `createJob`. |

**Returns:** `JobInfo|error`

**Sample code:**

```ballerina
bulk:JobInfo jobInfo = check bulkClient->getJobInfo(job);
```

**Sample response:**

```json
{"id": "7505g000005XXXXX", "operation": "insert", "object": "Contact", "state": "Open"}
```

</details>

<details>
<summary>closeJob</summary>

Closes an open Bulk API v1 job, signalling that no more batches will be added.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object to close. |

**Returns:** `JobInfo|error`

**Sample code:**

```ballerina
bulk:JobInfo closedJob = check bulkClient->closeJob(job);
```

**Sample response:**

```json
{"id": "7505g000005XXXXX", "operation": "insert", "object": "Contact", "state": "Closed"}
```

</details>

<details>
<summary>abortJob</summary>

Aborts an open or in-progress Bulk API v1 job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object to abort. |

**Returns:** `JobInfo|error`

**Sample code:**

```ballerina
bulk:JobInfo abortedJob = check bulkClient->abortJob(job);
```

**Sample response:**

```json
{"id": "7505g000005XXXXX", "state": "Aborted"}
```

</details>

#### Batch Operations

<details>
<summary>addBatch</summary>

Adds a batch of records to an open Bulk API v1 job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object. |
| `content` | <code>json&#124;string&#124;xml&#124;string[][]&#124;stream&lt;string[], error?&gt;&#124;io:ReadableByteChannel</code> | Yes | The batch payload in the format matching the job's content type. |

**Returns:** `BatchInfo|error`

**Sample code:**

```ballerina
string csvData = "FirstName,LastName,Email\nJohn,Doe,john@example.com\nJane,Doe,jane@example.com";
bulk:BatchInfo batch = check bulkClient->addBatch(job, csvData);
```

**Sample response:**

```json
{"id": "7515g000001XXXXX", "jobId": "7505g000005XXXXX", "state": "Queued"}
```

</details>

<details>
<summary>getBatchInfo</summary>

Returns the current status and metadata of a specific batch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object. |
| `batchId` | <code>string</code> | Yes | The ID of the batch. |

**Returns:** `BatchInfo|error`

**Sample code:**

```ballerina
bulk:BatchInfo batchInfo = check bulkClient->getBatchInfo(job, batch.id);
```

**Sample response:**

```json
{"id": "7515g000001XXXXX", "jobId": "7505g000005XXXXX", "state": "Completed", "numberRecordsProcessed": 2, "numberRecordsFailed": 0}
```

</details>

<details>
<summary>getAllBatches</summary>

Returns all batches associated with a job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object. |

**Returns:** `BatchInfo[]|error`

**Sample code:**

```ballerina
bulk:BatchInfo[] allBatches = check bulkClient->getAllBatches(job);
```

**Sample response:**

```json
[{"id": "7515g000001XXXXX", "state": "Completed"}]
```

</details>

<details>
<summary>getBatchRequest</summary>

Retrieves the original request data submitted for a batch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object. |
| `batchId` | <code>string</code> | Yes | The ID of the batch. |

**Returns:** `json|xml|string|error`

**Sample code:**

```ballerina
json|xml|string request = check bulkClient->getBatchRequest(job, batch.id);
```

**Sample response:**

```
"FirstName,LastName,Email\nJohn,Doe,john@example.com"
```

</details>

<details>
<summary>getBatchResult</summary>

Retrieves the results of a completed batch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJob` | <code>BulkJob</code> | Yes | The bulk job object. |
| `batchId` | <code>string</code> | Yes | The ID of the completed batch. |

**Returns:** `json|xml|string|Result[]|error`

**Sample code:**

```ballerina
json|xml|string|bulk:Result[] results = check bulkClient->getBatchResult(job, batch.id);
```

**Sample response:**

```json
[{"id": "0035g00000XXXXX", "success": true, "errors": []}]
```

</details>

---

## Bulk v2 client

Bulk API v2: simplified ingest and query jobs for large-scale data loads.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | <code>string</code> | Required | Salesforce instance URL. |
| `auth` | <code>OAuth2RefreshTokenGrantConfig&#124;OAuth2PasswordGrantConfig&#124;OAuth2ClientCredentialsGrantConfig&#124;BearerTokenConfig</code> | Required | OAuth 2.0 configuration or bearer token. |
| `httpVersion` | <code>HttpVersion</code> | <code>HTTP_2_0</code> | HTTP protocol version. |
| `timeout` | <code>decimal</code> | <code>60</code> | Request timeout in seconds. |

### Initializing the client

```ballerina
import ballerinax/salesforce.bulkv2;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

bulkv2:Client bulkV2Client = check new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});
```

### Operations

#### Ingest Jobs

<details>
<summary>createIngestJob</summary>

Creates a Bulk API v2 ingest job for inserting, updating, upserting, or deleting records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BulkCreatePayload</code> | Yes | Ingest job configuration including `object`, `operation`, and `lineEnding`. |

**Returns:** `BulkJob|error`

**Sample code:**

```ballerina
bulkv2:BulkJob ingestJob = check bulkV2Client->createIngestJob({
    'object: "Contact",
    operation: "insert",
    lineEnding: "LF"
});
```

**Sample response:**

```json
{"jobId": "7505g000005YYYYY"}
```

</details>

<details>
<summary>addBatch</summary>

Uploads data to an open ingest job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the open ingest job. |
| `content` | <code>string&#124;string[][]&#124;stream&lt;string[], error?&gt;&#124;io:ReadableByteChannel</code> | Yes | Data to upload (CSV string, 2D string array, stream, or byte channel). |

**Returns:** `error?`

**Sample code:**

```ballerina
string csvData = "FirstName,LastName,Email\nAlice,Smith,alice@example.com";
check bulkV2Client->addBatch(ingestJob.jobId, csvData);
```

</details>

<details>
<summary>closeIngestJob</summary>

Marks an ingest job as ready to be processed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the ingest job to close. |

**Returns:** `BulkJobCloseInfo|error`

**Sample code:**

```ballerina
bulkv2:BulkJobCloseInfo closedJob = check bulkV2Client->closeIngestJob(ingestJob.jobId);
```

**Sample response:**

```json
{"id": "7505g000005YYYYY", "state": "UploadComplete"}
```

</details>

<details>
<summary>closeIngestJobAndWait</summary>

Closes an ingest job and returns a future that completes when the job finishes processing.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the ingest job. |

**Returns:** `future<BulkJobInfo|error>|error`

**Sample code:**

```ballerina
future<bulkv2:BulkJobInfo|error> jobFuture = check bulkV2Client->closeIngestJobAndWait(ingestJob.jobId);
bulkv2:BulkJobInfo jobInfo = check wait jobFuture;
```

**Sample response:**

```json
{"id": "7505g000005YYYYY", "state": "JobComplete", "numberRecordsProcessed": 1, "numberRecordsFailed": 0}
```

</details>

<details>
<summary>getJobInfo</summary>

Returns the current status of a job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the job. |
| `bulkOperation` | <code>BulkOperation</code> | Yes | The operation type: `INGEST` or `QUERY`. |

**Returns:** `BulkJobInfo|error`

**Sample code:**

```ballerina
bulkv2:BulkJobInfo info = check bulkV2Client->getJobInfo(ingestJob.jobId, bulkv2:INGEST);
```

**Sample response:**

```json
{"id": "7505g000005YYYYY", "operation": "insert", "object": "Contact", "state": "JobComplete"}
```

</details>

<details>
<summary>getJobStatus</summary>

Returns successful or failed results for a completed ingest job as a 2D string array.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of a completed ingest job. |
| `status` | <code>Status</code> | Yes | Result status: `SUCCESSFUL_RESULTS` or `FAILED_RESULTS`. |

**Returns:** `string[][]|error`

**Sample code:**

```ballerina
string[][] successRecords = check bulkV2Client->getJobStatus(ingestJob.jobId, bulkv2:SUCCESSFUL_RESULTS);
```

**Sample response:**

```json
[["sf__Id", "sf__Created", "FirstName", "LastName", "Email"], ["0035g00000XXXXX", "true", "Alice", "Smith", "alice@example.com"]]
```

</details>

<details>
<summary>getAllJobs</summary>

Lists all ingest jobs in the org.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobType` | <code>JobType?</code> | No | Optional filter by job type. |

**Returns:** `AllJobs|error`

**Sample code:**

```ballerina
bulkv2:AllJobs allJobs = check bulkV2Client->getAllJobs();
```

**Sample response:**

```json
{"done": true, "records": [{"id": "7505g000005YYYYY", "operation": "insert", "object": "Contact", "state": "JobComplete"}]}
```

</details>

<details>
<summary>abortJob</summary>

Aborts an in-progress job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the job to abort. |
| `bulkOperation` | <code>BulkOperation</code> | Yes | The operation type: `INGEST` or `QUERY`. |

**Returns:** `BulkJobInfo|error`

**Sample code:**

```ballerina
bulkv2:BulkJobInfo aborted = check bulkV2Client->abortJob(ingestJob.jobId, bulkv2:INGEST);
```

**Sample response:**

```json
{"id": "7505g000005YYYYY", "state": "Aborted"}
```

</details>

<details>
<summary>deleteJob</summary>

Deletes a completed or aborted job.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the job to delete. |
| `bulkOperation` | <code>BulkOperation</code> | Yes | The operation type: `INGEST` or `QUERY`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bulkV2Client->deleteJob(ingestJob.jobId, bulkv2:INGEST);
```

</details>

#### Query Jobs

<details>
<summary>createQueryJob</summary>

Creates a Bulk API v2 query job to export records using SOQL.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BulkCreatePayload</code> | Yes | Query job config containing `operation` and `query` fields. |

**Returns:** `BulkJob|error`

**Sample code:**

```ballerina
bulkv2:BulkJob queryJob = check bulkV2Client->createQueryJob({
    operation: "query",
    query: "SELECT Id, Name, Email FROM Contact WHERE CreatedDate = TODAY"
});
```

**Sample response:**

```json
{"jobId": "7505g000005ZZZZZ"}
```

</details>

<details>
<summary>createQueryJobAndWait</summary>

Creates a query job and returns a future that completes when the job finishes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BulkCreatePayload</code> | Yes | Query job config containing `operation` and `query` fields. |

**Returns:** `future<BulkJobInfo|error>|error`

**Sample code:**

```ballerina
future<bulkv2:BulkJobInfo|error> queryFuture = check bulkV2Client->createQueryJobAndWait({
    operation: "query",
    query: "SELECT Id, Name FROM Account"
});
bulkv2:BulkJobInfo queryInfo = check wait queryFuture;
```

**Sample response:**

```json
{"id": "7505g000005ZZZZZ", "state": "JobComplete", "numberRecordsProcessed": 100}
```

</details>

<details>
<summary>getQueryResult</summary>

Retrieves results from a completed query job as a 2D string array.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bulkJobId` | <code>string</code> | Yes | The ID of the completed query job. |
| `maxRecords` | <code>int?</code> | No | Maximum number of records to return per request. |

**Returns:** `string[][]|error`

**Sample code:**

```ballerina
string[][] resultRows = check bulkV2Client->getQueryResult(queryJob.jobId, maxRecords = 1000);
```

**Sample response:**

```json
[["Id", "Name", "Email"], ["0035g00000XXXXX", "Alice Smith", "alice@example.com"]]
```

</details>

<details>
<summary>getAllQueryJobs</summary>

Lists all query jobs in the org.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobType` | <code>JobType?</code> | No | Optional filter by job type. |

**Returns:** `AllJobs|error`

**Sample code:**

```ballerina
bulkv2:AllJobs allQueryJobs = check bulkV2Client->getAllQueryJobs();
```

**Sample response:**

```json
{"done": true, "records": [{"id": "7505g000005ZZZZZ", "operation": "query", "state": "JobComplete"}]}
```

</details>

---

## Soap Client

SOAP API: lead conversion using the Salesforce SOAP protocol.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | <code>string</code> | Required | Salesforce instance URL. |
| `auth` | <code>OAuth2RefreshTokenGrantConfig&#124;OAuth2PasswordGrantConfig&#124;OAuth2ClientCredentialsGrantConfig&#124;BearerTokenConfig</code> | Required | OAuth 2.0 configuration or bearer token. |
| `httpVersion` | <code>HttpVersion</code> | <code>HTTP_2_0</code> | HTTP protocol version. |
| `timeout` | <code>decimal</code> | <code>60</code> | Request timeout in seconds. |

### Initializing the client

```ballerina
import ballerinax/salesforce.soap;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

soap:Client soapClient = check new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});
```

### Operations

#### Lead Conversion

<details>
<summary>convertLead</summary>

Converts one or more leads into accounts, contacts, and optionally opportunities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>LeadConvert</code> | Yes | Lead conversion configuration specifying the lead to convert and conversion options. |

**Returns:** `ConvertedLead|error`

**Sample code:**

```ballerina
soap:ConvertedLead result = check soapClient->convertLead({
    leadId: "00Q5g000005XXXXX",
    convertedStatus: "Closed - Converted",
    doNotCreateOpportunity: false,
    opportunityName: "Acme Opportunity"
});
```

**Sample response:**

```json
{"leadId": "00Q5g000005XXXXX", "accountId": "0015g00000XXXXX", "contactId": "0035g00000XXXXX", "opportunityId": "0065g00000XXXXX", "success": true}
```

</details>
