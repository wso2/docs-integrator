---
title: Actions
---

# Actions

The `ballerinax/wso2.apim.catalog` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage WSO2 APIM Service Catalog entries: CRUD, definition retrieval, usage lookup, import/export, and settings. |

---

## Client

Manage WSO2 APIM Service Catalog entries: CRUD, definition retrieval, usage lookup, import/export, and settings.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serviceUrl` | `string` | `"https://apis.wso2.com/api/service-catalog/v1"` | WSO2 APIM Service Catalog REST endpoint URL. Passed as the second argument to `init`, not part of `ConnectionConfig`. |
| `auth` | `OAuth2PasswordGrantConfig` | Required | OAuth 2.0 Password Grant configuration containing `tokenUrl`, `username`, `password`, and optionally `clientId`, `clientSecret`, and `scopes`. |
| `auth.tokenUrl` | `string` | `"https://localhost:9443/oauth2/token"` | WSO2 APIM OAuth2 token endpoint URL. |
| `auth.username` | `string` | Required | WSO2 APIM admin username. |
| `auth.password` | `string` | Required | WSO2 APIM admin password. |
| `auth.clientId` | `string` | `()` | OAuth2 client ID obtained from Dynamic Client Registration. |
| `auth.clientSecret` | `string` | `()` | OAuth2 client secret obtained from Dynamic Client Registration. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version for requests. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for mutual TLS or custom server certificates. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable or disable constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/wso2.apim.catalog;

configurable string serviceUrl = "https://localhost:9443/api/service-catalog/v1";
configurable string tokenUrl = "https://localhost:9443/oauth2/token";
configurable string username = ?;
configurable string password = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

catalog:Client catalogClient = check new ({
    auth: {
        tokenUrl: tokenUrl,
        username: username,
        password: password,
        clientId: clientId,
        clientSecret: clientSecret
    }
}, serviceUrl);
```

### Operations

#### Service management

<details>
<summary>List services</summary>

Retrieves a paginated list of services registered in the Service Catalog, with optional filtering by name, version, definition type, or service key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | No | Filter services by name (partial or exact match). |
| `version` | `string` | No | Filter services by version. |
| `definitionType` | `"OAS"\|"WSDL1"\|"WSDL2"\|"GRAPHQL_SDL"\|"ASYNC_API"` | No | Filter by API definition type. |
| `'key` | `string` | No | Filter by service key (unique identifier string). |
| `shrink` | `boolean` | No | If true, returns a condensed response with minimal fields. Default: `false`. |
| `sortBy` | `"name"\|"definitionType"` | No | Field to sort results by. |
| `sortOrder` | `"asc"\|"desc"` | No | Sort direction. |
| `'limit` | `int` | No | Maximum number of results to return. Default: `25`. |
| `offset` | `int` | No | Number of results to skip for pagination. Default: `0`. |

Returns: `ServiceList|error`

Sample code:

```ballerina
catalog:ServiceList services = check catalogClient->/services(
    definitionType = "OAS",
    sortBy = "name",
    sortOrder = "asc",
    'limit = 10,
    offset = 0
);
```

Sample response:

```ballerina
{
  "list": [
    {
      "id": "01234567-0123-0123-0123-012345678901",
      "name": "PizzaShackAPI",
      "version": "v1",
      "serviceKey": "PizzaShackAPI_v1",
      "serviceUrl": "https://pizzashack-service.abc.com/v1",
      "definitionType": "OAS3",
      "securityType": "NONE",
      "mutualSSLEnabled": false,
      "usage": 2,
      "createdTime": "2024-01-15T08:30:00.000Z",
      "lastUpdatedTime": "2024-02-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 10,
    "total": 1,
    "next": "",
    "previous": ""
  }
}
```

</details>

<details>
<summary>Create a service</summary>

Registers a new backend service in the Service Catalog with its metadata and optional API definition content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `catalog:ServiceSchema` | Yes | Service metadata (`serviceMetadata`) and optionally a definition file (`definitionFile`) or inline definition string (`inlineContent`). |

Returns: `Service|error`

Sample code:

```ballerina
catalog:ServiceSchema payload = {
    serviceMetadata: {
        name: "PizzaShackAPI",
        version: "v1",
        serviceUrl: "https://pizzashack-service.abc.com/v1",
        definitionType: "OAS3",
        securityType: "NONE"
    },
    inlineContent: "openapi: 3.0.0\ninfo:\n  title: Pizza Shack API\n  version: v1\n"
};
catalog:Service createdService = check catalogClient->/services.post(payload);
```

Sample response:

```ballerina
{
  "id": "01234567-0123-0123-0123-012345678901",
  "name": "PizzaShackAPI",
  "version": "v1",
  "serviceKey": "PizzaShackAPI_v1",
  "serviceUrl": "https://pizzashack-service.abc.com/v1",
  "definitionType": "OAS3",
  "securityType": "NONE",
  "mutualSSLEnabled": false,
  "createdTime": "2024-01-15T08:30:00.000Z",
  "lastUpdatedTime": "2024-01-15T08:30:00.000Z"
}
```

</details>

<details>
<summary>Get a service by ID</summary>

Retrieves the full metadata of a specific service from the Service Catalog using its unique identifier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceId` | `string` | Yes | The unique UUID of the service. |

Returns: `Service|error`

Sample code:

```ballerina
catalog:Service svc = check catalogClient->/services/["01234567-0123-0123-0123-012345678901"]();
```

Sample response:

```ballerina
{
  "id": "01234567-0123-0123-0123-012345678901",
  "name": "PizzaShackAPI",
  "version": "v1",
  "serviceKey": "PizzaShackAPI_v1",
  "serviceUrl": "https://pizzashack-service.abc.com/v1",
  "definitionType": "OAS3",
  "securityType": "NONE",
  "mutualSSLEnabled": false,
  "usage": 2,
  "createdTime": "2024-01-15T08:30:00.000Z",
  "lastUpdatedTime": "2024-02-01T10:00:00.000Z",
  "md5": "d41d8cd98f00b204e9800998ecf8427e",
  "definitionUrl": "https://localhost:9443/api/service-catalog/v1/services/01234567-0123-0123-0123-012345678901/definition"
}
```

</details>

<details>
<summary>Update a service</summary>

Replaces the metadata and/or definition of an existing service in the Service Catalog.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceId` | `string` | Yes | The unique UUID of the service to update. |
| `payload` | `catalog:ServiceSchema` | Yes | Updated service metadata and optional definition file or inline content. |

Returns: `Service|error`

Sample code:

```ballerina
catalog:ServiceSchema updatePayload = {
    serviceMetadata: {
        name: "PizzaShackAPI",
        version: "v2",
        serviceUrl: "https://pizzashack-service.abc.com/v2",
        definitionType: "OAS3",
        securityType: "OAUTH2"
    },
    inlineContent: "openapi: 3.0.0\ninfo:\n  title: Pizza Shack API\n  version: v2\n"
};
catalog:Service updated = check catalogClient->/services/["01234567-0123-0123-0123-012345678901"].put(updatePayload);
```

Sample response:

```ballerina
{
  "id": "01234567-0123-0123-0123-012345678901",
  "name": "PizzaShackAPI",
  "version": "v2",
  "serviceKey": "PizzaShackAPI_v2",
  "serviceUrl": "https://pizzashack-service.abc.com/v2",
  "definitionType": "OAS3",
  "securityType": "OAUTH2",
  "mutualSSLEnabled": false,
  "createdTime": "2024-01-15T08:30:00.000Z",
  "lastUpdatedTime": "2024-03-10T14:00:00.000Z"
}
```

</details>

<details>
<summary>Delete a service</summary>

Removes a service from the Service Catalog. The operation succeeds only if the service is not referenced by any existing APIs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceId` | `string` | Yes | The unique UUID of the service to delete. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check catalogClient->/services/["01234567-0123-0123-0123-012345678901"].delete();
```

</details>

#### Service definition & usage

<details>
<summary>Get service definition</summary>

Retrieves the raw API definition content (e.g., OpenAPI YAML, WSDL XML) stored for the service.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceId` | `string` | Yes | The unique UUID of the service. |

Returns: `string|error`

Sample code:

```ballerina
string definition = check catalogClient->/services/["01234567-0123-0123-0123-012345678901"]/definition();
```

Sample response:

```ballerina
"openapi: 3.0.0\ninfo:\n  title: Pizza Shack API\n  version: v1\npaths:\n  /menu:\n    get:\n      summary: List menu items\n      responses:\n        '200':\n          description: OK\n"
```

</details>

<details>
<summary>Get service usage</summary>

Returns the list of APIs that reference this service in the Service Catalog, allowing you to assess service dependencies before making changes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serviceId` | `string` | Yes | The unique UUID of the service. |

Returns: `APIList|error`

Sample code:

```ballerina
catalog:APIList usageList = check catalogClient->/services/["01234567-0123-0123-0123-012345678901"]/usage();
```

Sample response:

```ballerina
{
  "count": 1,
  "list": [
    {
      "id": "api-abcdef-1234-5678-abcd-ef0123456789",
      "name": "PizzaShackAPI",
      "context": "/pizzashack",
      "version": "1.0.0",
      "provider": "admin"
    }
  ]
}
```

</details>

#### Import & export

<details>
<summary>Import services</summary>

Bulk-imports one or more services into the Service Catalog from a ZIP archive containing service definition files and metadata.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `catalog:Services_import_body` | Yes | Multipart form payload with a `file` field containing the ZIP archive (`fileContent` as `byte[]` and `fileName` as `string`), and an optional `verifier` string. |
| `overwrite` | `boolean` | No | If true, existing services with matching keys are overwritten. Default: `false`. |

Returns: `ServiceInfoList|error`

Sample code:

```ballerina
byte[] zipContent = check io:fileReadBytes("services-bundle.zip");
catalog:Services_import_body importBody = {
    file: {fileContent: zipContent, fileName: "services-bundle.zip"}
};
catalog:ServiceInfoList result = check catalogClient->/services/'import.post(importBody, overwrite = true);
```

Sample response:

```ballerina
{
  "count": 2,
  "list": [
    {
      "id": "01234567-0123-0123-0123-012345678901",
      "name": "PizzaShackAPI",
      "key": "PizzaShackAPI_v1",
      "version": "v1",
      "md5": "d41d8cd98f00b204e9800998ecf8427e"
    },
    {
      "id": "09876543-0987-0987-0987-098765432109",
      "name": "PaymentService",
      "key": "PaymentService_v2",
      "version": "v2",
      "md5": "a87ff679a2f3e71d9181a67b7542122c"
    }
  ]
}
```

</details>

<details>
<summary>Export a service</summary>

Exports a service and its API definition as a ZIP archive, identified by service name and version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The exact name of the service to export. |
| `version` | `string` | Yes | The exact version of the service to export. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] exportedZip = check catalogClient->/services/export(name = "PizzaShackAPI", version = "v1");
```

Sample response:

```ballerina
[80, 75, 3, 4, 20, 0, 0, 0, 8, 0]
```

</details>

#### Settings

<details>
<summary>Get settings</summary>

Retrieves Service Catalog configuration settings, including the list of OAuth2 scopes available for the current user.

Returns: `Settings|error`

Sample code:

```ballerina
catalog:Settings settings = check catalogClient->/settings();
```

Sample response:

```ballerina
{
  "scopes": [
    "service_catalog:service_view",
    "service_catalog:service_write",
    "apim:api_view"
  ]
}
```

</details>
