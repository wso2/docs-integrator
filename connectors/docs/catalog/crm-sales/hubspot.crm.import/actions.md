---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.import` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage CRM imports: start, monitor, list, retrieve errors, and cancel imports. |

---

## Client

Manage CRM imports: start, monitor, list, retrieve errors, and cancel imports.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration. Use OAuth 2.0 refresh token grant (recommended), bearer token, or private app legacy API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Maximum wait time for a response in seconds. |
| `retryConfig` | <code>http:RetryConfig?</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket?</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig?</code> | `()` | Proxy server configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig?</code> | `()` | Circuit breaker configuration. |
| `compression` | <code>http:Compression</code> | `http:COMPRESSION_AUTO` | Compression handling configuration. |
| `validation` | <code>boolean</code> | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.import as crmImport;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

crmImport:Client importClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Import lifecycle

<details>
<summary>Start a new import</summary>

Signature: `post .`

Starts a new CRM import by uploading a CSV file along with an import request JSON configuration that defines column mappings, object types, and import operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Body</code> | Yes | The import payload containing `files` (with `fileContent` as byte array and `fileName`) and `importRequest` (JSON string defining column mappings and import settings). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicImportResponse|error`

Sample code:

```ballerina
string importRequestJson = check io:fileReadString("resources/contact_import_request.json");
byte[] csvContent = check io:fileReadBytes("resources/contact_import_file.csv");

crmImport:PublicImportResponse response = check importClient->/.post({
    importRequest: importRequestJson,
    files: {
        fileContent: csvContent,
        fileName: "contact_import_file.csv"
    }
});
```

Sample response:

```ballerina
{
  "id": "48541593",
  "state": "STARTED",
  "createdAt": "2024-10-15T08:30:00.000Z",
  "updatedAt": "2024-10-15T08:30:00.000Z",
  "optOutImport": false,
  "metadata": {
    "counters": {},
    "fileIds": ["98765"],
    "objectLists": []
  },
  "mappedObjectTypeIds": ["0-1"]
}
```

</details>

<details>
<summary>Get active imports</summary>

Signature: `get .`

Returns a paginated list of all active imports in the HubSpot portal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | <code>GetGetPageQueries</code> | No | Optional query parameters including `before`, `after` (paging cursor tokens), and `limit` (max results per page). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponsePublicImportResponse|error`

Sample code:

```ballerina
crmImport:CollectionResponsePublicImportResponse imports = check importClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "48541593",
      "state": "DONE",
      "createdAt": "2024-10-15T08:30:00.000Z",
      "updatedAt": "2024-10-15T08:35:00.000Z",
      "optOutImport": false,
      "metadata": {
        "counters": {"CREATED_OBJECTS": 150, "TOTAL_ROWS": 150, "PROPERTY_VALUES_EMITTED": 450},
        "fileIds": ["98765"],
        "objectLists": [{"listId": "12345", "objectType": "CONTACT"}]
      },
      "importName": "First Contact Data",
      "mappedObjectTypeIds": ["0-1"]
    }
  ],
  "paging": null
}
```

</details>

#### Import status & errors

<details>
<summary>Get import information</summary>

Signature: `get [int importId]`

Retrieves detailed information about a specific import, including its current state, metadata counters, and mapped object types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `importId` | <code>int</code> | Yes | The ID of the import to retrieve. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicImportResponse|error`

Sample code:

```ballerina
crmImport:PublicImportResponse importStatus = check importClient->/[48541593].get();
```

Sample response:

```ballerina
{
  "id": "48541593",
  "state": "DONE",
  "createdAt": "2024-10-15T08:30:00.000Z",
  "updatedAt": "2024-10-15T08:35:00.000Z",
  "optOutImport": false,
  "metadata": {
    "counters": {"CREATED_OBJECTS": 150, "TOTAL_ROWS": 150, "PROPERTY_VALUES_EMITTED": 450},
    "fileIds": ["98765"],
    "objectLists": [{"listId": "12345", "objectType": "CONTACT"}]
  },
  "importName": "First Contact Data",
  "importSource": "API",
  "mappedObjectTypeIds": ["0-1"]
}
```

</details>

<details>
<summary>Get import errors</summary>

Signature: `get [int importId]/errors`

Returns a paginated list of errors that occurred during the specified import, with optional row data and error messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `importId` | <code>int</code> | Yes | The ID of the import whose errors to retrieve. |
| `queries` | <code>GetImportIdErrorsGetErrorsQueries</code> | No | Optional query parameters: `includeRowData` (boolean), `includeErrorMessage` (boolean), `limit` (int), `after` (paging cursor). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `CollectionResponsePublicImportErrorForwardPaging|error`

Sample code:

```ballerina
crmImport:CollectionResponsePublicImportErrorForwardPaging errors = check importClient->/[48541593]/errors.get(
    queries = {includeRowData: true, includeErrorMessage: true, limit: 10}
);
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "err-001",
      "createdAt": 1697356200,
      "errorType": "INVALID_EMAIL",
      "errorMessage": "The email address 'not-an-email' is not valid.",
      "objectType": "CONTACT",
      "invalidValue": "not-an-email",
      "sourceData": {
        "rowData": ["John", "Doe", "not-an-email"],
        "containsEncryptedProperties": false,
        "lineNumber": 5,
        "fileId": 98765
      }
    }
  ],
  "paging": null
}
```

</details>

#### Import management

<details>
<summary>Cancel an active import</summary>

Signature: `post [int importId]/cancel`

Cancels an active import. Only imports in the `STARTED` or `PROCESSING` state can be canceled.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `importId` | <code>int</code> | Yes | The ID of the import to cancel. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `ActionResponse|error`

Sample code:

```ballerina
crmImport:ActionResponse cancelResponse = check importClient->/[48541593]/cancel.post();
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "startedAt": "2024-10-15T08:30:00.000Z",
  "completedAt": "2024-10-15T08:31:00.000Z",
  "links": {}
}
```

</details>
