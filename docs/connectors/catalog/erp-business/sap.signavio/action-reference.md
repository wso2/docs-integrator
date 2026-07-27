# Actions

The `ballerinax/sap.signavio` package exposes the following client:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Signavio dictionary entries, directories, models, ingestion, transformation manager initiatives/assets/insights/objectives, journey modeler metrics, search, and SIGNAL Engine OData access. |

---

## Client

The `Client` provides access to the SAP Signavio APIs — Process Manager (Dictionary, Directory, Model, Import and Export, Search), Process Intelligence (Ingestion and SIGNAL Engine OData), Process Governance Analytics, Journey Modeler Metrics, and Process Transformation Manager (Initiatives, Assets, Insights, and Objectives). `Client.init()` exchanges the configured credentials for both an API gateway JWT and a Process Manager workspace session, and holds both for the lifetime of the client.

### Configuration

#### Credentials

SAP Signavio account credentials, passed as the `auth` field of `ConnectionConfig`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `username` | <code>string</code> | Required | The account's user name (typically an email address) |
| `password` | <code>string</code> | Required | The account's password |
| `tenant` | <code>string</code> | Optional | Unique identifier of the target workspace. Only necessary if the authenticating user is a member of multiple workspaces |
| `odataAccessToken` | <code>string</code> | Optional | A SAP Signavio OData API access token. Only required to call `getServiceDocument`, `getMetadata`, or `queryEntitySet` — the SIGNAL Engine OData API authenticates with a dedicated access token rather than the account password, so it can't be derived from `username`/`password` automatically |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the SAP Signavio APIs. Passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>Credentials</code> | Required | SAP Signavio account credentials |
| `region` | <code>string</code> | <code>"eu"</code> | The SAP Signavio region that hosts the workspace. Determines both the API gateway hostname (`api.<region>.signavio.cloud.sap`) and the Process Manager workspace hostname (`app-<region>.signavio.com`) |
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

The client initializer also accepts two optional string parameters:

| Parameter | Default | Description |
|-----------|---------|--------------|
| `gatewayUrl` | Derived from `config.region` | URL of the SAP Signavio API gateway |
| `workspaceUrl` | Derived from `config.region` | URL of the SAP Signavio Process Manager workspace |

### Initializing the client

```ballerina
import ballerinax/sap.signavio;

configurable string username = ?;
configurable string password = ?;

signavio:Client signavioClient = check new ({auth: {username, password}});
```

### Operations

#### Analytics (SPG)

<details>
<summary>listCaseVariables</summary>

List of case-variables resources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `pageLimit` | <code>int</code> | No | Max number of items |
| `include` | <code>string</code> | No | case-variables relationship to include |
| `pageOffset` | <code>int</code> | No | Page offset |
| `filterId` | <code>string</code> | Yes | Filter by id (csv) |

**Returns:** `CaseVariablesResourcesResponseSchema \| CaseVariablesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CaseVariablesResourcesResponseSchema result = check signavioClient->listCaseVariables();
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "values": {},
        "name": {},
        "defaultValues": {},
        "description": {},
        "variableId": {},
        "case": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getCaseVariable</summary>

Case-variables resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `include` | <code>string</code> | No | case-variables relationship to include |

**Returns:** `CaseVariablesResourceResponseSchema \| CaseVariablesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CaseVariablesResourceResponseSchema result = check signavioClient->getCaseVariable(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "values": {},
      "name": "string",
      "defaultValues": {},
      "description": "string",
      "variableId": "string",
      "case": {
        "id": {}
      }
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>listCaseVariableCases</summary>

Cases related to a case-variables resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `include` | <code>string</code> | No | cases relationships to include (csv) |

**Returns:** `CasesResourceResponseSchema \| CasesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CasesResourceResponseSchema result = check signavioClient->listCaseVariableCases(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "creator": {
        "id": {}
      },
      "variables": [
        {}
      ],
      "milestone": "string",
      "processId": {
        "date": "string",
        "timestamp": 0
      },
      "caseNumber": 0,
      "created": 0,
      "name": "string",
      "closed": 0
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>listCaseVariableCaseRefs</summary>

Cases references related to a case-variables resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `include` | <code>string</code> | No | cases relationships to include (csv) |

**Returns:** `CasesResourceReferenceResponseSchema \| CasesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CasesResourceReferenceResponseSchema result = check signavioClient->listCaseVariableCaseRefs(id);
```

**Sample response:**

```json
{
  "data": {
    "id": {
      "date": "string",
      "timestamp": 0
    }
  }
}
```

</details>

<details>
<summary>listCases</summary>

List of cases resources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `pageLimit` | <code>int</code> | No | Max number of items |
| `include` | <code>string</code> | No | cases relationships to include (csv) |
| `pageOffset` | <code>int</code> | No | Page offset |
| `filterProcessId` | <code>string</code> | No | Filter by processId |

**Returns:** `CasesResourcesResponseSchema \| CasesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CasesResourcesResponseSchema result = check signavioClient->listCases();
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "creator": {},
        "variables": {},
        "milestone": {},
        "processId": {},
        "caseNumber": {},
        "created": {},
        "name": {},
        "closed": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getCase</summary>

Cases resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `include` | <code>string</code> | No | cases relationships to include (csv) |

**Returns:** `CasesResourceResponseSchema \| error`

**Sample code:**

```ballerina
CasesResourceResponseSchema result = check signavioClient->getCase(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "creator": {
        "id": {}
      },
      "variables": [
        {}
      ],
      "milestone": "string",
      "processId": {
        "date": "string",
        "timestamp": 0
      },
      "caseNumber": 0,
      "created": 0,
      "name": "string",
      "closed": 0
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>listCaseTasks</summary>

Tasks related to a cases resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `fields` | <code>string</code> | No | tasks field to include |
| `filterId` | <code>string</code> | No | Filter by id (csv) |

**Returns:** `TasksResourcesResponseSchema \| TasksResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
TasksResourcesResponseSchema result = check signavioClient->listCaseTasks(id);
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "due": {},
        "created": {},
        "name": {},
        "assignee": {},
        "completed": {},
        "updated": {},
        "case": {},
        "applicationLink": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getCaseCreator</summary>

Users related to a cases resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `fields` | <code>string</code> | No | users fields to include (csv) |

**Returns:** `UsersResourceResponseSchema \| UsersResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
UsersResourceResponseSchema result = check signavioClient->getCaseCreator(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "name": "string",
      "email": "string"
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>listFiles</summary>

List of files resources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `pageLimit` | <code>int</code> | No | Max number of items |
| `pageOffset` | <code>int</code> | No | Page offset |
| `filterId` | <code>string</code> | No | Filter by id (csv) |

**Returns:** `FilesResourcesResponseSchema \| FilesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
FilesResourcesResponseSchema result = check signavioClient->listFiles();
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "size": {},
        "name": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getFile</summary>

Files resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `fields` | <code>string</code> | No | files fields to include (csv) |

**Returns:** `FilesResourceResponseSchema \| FilesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
FilesResourceResponseSchema result = check signavioClient->getFile(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "size": 0,
      "name": "string"
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>listGroups</summary>

List of groups resources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `pageLimit` | <code>int</code> | No | Max number of items |
| `include` | <code>string</code> | No | groups relationships to include (csv) |
| `pageOffset` | <code>int</code> | No | Page offset |
| `fields` | <code>string</code> | No | groups fields to include (csv) |
| `filterId` | <code>string</code> | No | Filter by id (csv) |

**Returns:** `GroupsResourcesResponseSchema \| GroupsResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
GroupsResourcesResponseSchema result = check signavioClient->listGroups();
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "name": {},
        "users": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getGroup</summary>

Groups resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `include` | <code>string</code> | No | groups relationships to include (csv) |
| `fields` | <code>string</code> | No | groups fields to include (csv) |

**Returns:** `GroupsResourceResponseSchema \| GroupsResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
GroupsResourceResponseSchema result = check signavioClient->getGroup(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "name": "string",
      "users": [
        {}
      ]
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>listGroupUserRefs</summary>

Users references related to a groups resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |

**Returns:** `UsersResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
UsersResourceReferencesResponseSchema result = check signavioClient->listGroupUserRefs(id);
```

**Sample response:**

```json
{
  "data": [
    {
      "id": {
        "date": "string",
        "timestamp": 0
      }
    }
  ]
}
```

</details>

<details>
<summary>listGroupUsers</summary>

Users related to a groups resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `fields` | <code>string</code> | No | users fields to include (csv) |

**Returns:** `UsersResourcesResponseSchema \| UsersResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
UsersResourcesResponseSchema result = check signavioClient->listGroupUsers(id);
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "name": {},
        "email": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>listTasks</summary>

List of tasks resources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `pageLimit` | <code>int</code> | No | Max number of items |
| `include` | <code>string</code> | No | tasks relationships to include (csv) |
| `pageOffset` | <code>int</code> | No | Page offset |
| `filterAssigneeEmail` | <code>string</code> | No | Filter by assignee |
| `filterCaseId` | <code>string</code> | No | Filter by case |
| `filterCompleted` | <code>string</code> | No | Filter by completed |
| `fields` | <code>string</code> | No | tasks field to include |
| `filterId` | <code>string</code> | No | Filter by id (csv) |

**Returns:** `TasksResourcesResponseSchema \| TasksResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
TasksResourcesResponseSchema result = check signavioClient->listTasks();
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "due": {},
        "created": {},
        "name": {},
        "assignee": {},
        "completed": {},
        "updated": {},
        "case": {},
        "applicationLink": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getTask</summary>

Tasks resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `include` | <code>string</code> | No | tasks relationships to include (csv) |
| `fields` | <code>string</code> | No | tasks field to include |

**Returns:** `TasksResourceResponseSchema \| TasksResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
TasksResourceResponseSchema result = check signavioClient->getTask(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "due": 0,
      "created": 0,
      "name": "string",
      "assignee": {
        "name": "string",
        "email": "string"
      },
      "completed": 0,
      "updated": 0,
      "case": {
        "id": {}
      },
      "applicationLink": "string"
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>getTaskCase</summary>

Case related to a tasks resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |

**Returns:** `CasesResourceResponseSchema \| CasesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CasesResourceResponseSchema result = check signavioClient->getTaskCase(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "creator": {
        "id": {}
      },
      "variables": [
        {}
      ],
      "milestone": "string",
      "processId": {
        "date": "string",
        "timestamp": 0
      },
      "caseNumber": 0,
      "created": 0,
      "name": "string",
      "closed": 0
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

<details>
<summary>getTaskCaseRef</summary>

Case reference related to a tasks resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |

**Returns:** `CasesResourceReferenceResponseSchema \| CasesResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
CasesResourceReferenceResponseSchema result = check signavioClient->getTaskCaseRef(id);
```

**Sample response:**

```json
{
  "data": {
    "id": {
      "date": "string",
      "timestamp": 0
    }
  }
}
```

</details>

<details>
<summary>listUsers</summary>

List of users resources

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `pageLimit` | <code>int</code> | No | Max number of items |
| `pageOffset` | <code>int</code> | No | Page offset |
| `filterId` | <code>string</code> | No | Filter by id (csv) |

**Returns:** `UsersResourcesResponseSchema \| UsersResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
UsersResourcesResponseSchema result = check signavioClient->listUsers();
```

**Sample response:**

```json
{
  "data": [
    {
      "attributes": {
        "name": {},
        "email": {}
      },
      "relationships": {},
      "links": {}
    }
  ]
}
```

</details>

<details>
<summary>getUser</summary>

Users resource

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | case primary key to include |
| `contentType` | <code>"application/vnd.api+json"&#124;"application/json"</code> | No | The content type of the request. Use `application/vnd.api+json`. |
| `fields` | <code>string</code> | No | users fields to include (csv) |

**Returns:** `UsersResourceResponseSchema \| UsersResourceReferencesResponseSchema \| error`

**Sample code:**

```ballerina
UsersResourceResponseSchema result = check signavioClient->getUser(id);
```

**Sample response:**

```json
{
  "data": {
    "attributes": {
      "name": "string",
      "email": "string"
    },
    "relationships": {},
    "links": {}
  }
}
```

</details>

#### Journey Modeler Metrics

<details>
<summary>addAutomaticMeasurementToMetric</summary>

Add automatic measurement to existing metrics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `journeyId` | <code>string</code> | Yes | The ID of the journey to be updated |
| `metricId` | <code>string</code> | Yes | The ID of the metric to be updated |
| `payload` | <code>AutomaticMeasurement</code> | Yes | Request payload (AutomaticMeasurement) |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check signavioClient->addAutomaticMeasurementToMetric(journeyId, metricId, payload);
```

</details>

#### Authentication

<details>
<summary>authenticate</summary>

Create an API access token (login)

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TokenRequest</code> | Yes | Request payload (TokenRequest) |
| `contentType` | <code>string</code> | No | Required request body format |

**Returns:** `string \| error`

**Sample code:**

```ballerina
string result = check signavioClient->authenticate(payload);
```

**Sample response:**

```json
"string"
```

</details>

#### Dictionary

<details>
<summary>listDictionaryEntries</summary>

Lists dictionary entries, optionally filtered by category, and with full-text search or title initial letter filter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contentType` | <code>string</code> | No | application/x-www-form-urlencoded |
| `q` | <code>string</code> | No | Filters by a full-text search term (ignored when `letter` is specified) |
| `include` | <code>string</code> | No | If set to `all`, dictionary entries from a category and its subcategories are listed |
| `offset` | <code>int</code> | No | The number of entries to skip before returning entries. Useful in combination with `limit` for pagination |
| `letter` | <code>string</code> | No | Filters by the initial letter of the dictionary entry's title |
| `sort` | <code>string</code> | No | If set to `title`, sorts entries by title; otherwise, the search sorts results by a dynamically determined relevance score |
| `category` | <code>string</code> | No | Filters by entry type - `ORG_UNIT`, `DOCUMENT`, `ACTIVITY`, `STATE`, or `IT_SYSTEM`, representing the pre-defined dictionary categories "Organizational Units", "Documents", "Activities",  "Events", and "IT Systems", respectively, or a Dictionary  category's ID |

**Returns:** `DictionaryResponse[] \| error`

**Sample code:**

```ballerina
DictionaryResponse[] result = check signavioClient->listDictionaryEntries();
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

<details>
<summary>createDictionaryEntry</summary>

Creates a dictionary entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DictionaryEntryRequest</code> | Yes | Request payload (DictionaryEntryRequest) |

**Returns:** `DictionaryResponse \| error`

**Sample code:**

```ballerina
DictionaryResponse result = check signavioClient->createDictionaryEntry(payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {}
}
```

</details>

<details>
<summary>getDictionaryEntry</summary>

Retrieves the specified dictionary entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the dictionary entry to retrieve |

**Returns:** `DictionaryResponse[] \| error`

**Sample code:**

```ballerina
DictionaryResponse[] result = check signavioClient->getDictionaryEntry(id);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

<details>
<summary>deleteDictionaryEntry</summary>

Deletes a dictionary entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the dictionary entry to delete |

**Returns:** `SuccessResponse \| error`

**Sample code:**

```ballerina
SuccessResponse result = check signavioClient->deleteDictionaryEntry(id);
```

**Sample response:**

```json
{
  "success": true
}
```

</details>

<details>
<summary>getDictionaryEntryInfo</summary>

Retrieves the specified dictionary entry with additional meta  information: most importantly, the category containing the entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the dictionary entry to retrieve |

**Returns:** `Representation \| error`

**Sample code:**

```ballerina
Representation result = check signavioClient->getDictionaryEntryInfo(id);
```

**Sample response:**

```json
{
  "formats": {},
  "attachments": [
    {}
  ],
  "color": "string",
  "hidden": true,
  "grantedRevisionUser": "string",
  "workflowSyncUpToDate": true,
  "publishingMode": "string",
  "grantedRevisionUserName": "string"
}
```

</details>

<details>
<summary>updateDictionaryEntry</summary>

Updates a dictionary entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the dictionary entry to update |
| `payload` | <code>DictionaryEntryUpdateRequest</code> | Yes | Request payload (DictionaryEntryUpdateRequest) |

**Returns:** `DictionaryResponse \| error`

**Sample code:**

```ballerina
DictionaryResponse result = check signavioClient->updateDictionaryEntry(id, payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {}
}
```

</details>

<details>
<summary>listDictionaryCategories</summary>

Retrieves a list of your workspace's dictionary categories.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `showHidden` | <code>boolean</code> | No | If set to `true`, hidden categories are included in the response |
| `allCategories` | <code>boolean</code> | No | If set to `true`, all categories' representations are returned  at once, without the need to send additional queries for  sub-categories |
| `considerAllPrivilege` | <code>boolean</code> | No | To circumvent access restrictions as a member of the workspace's  administrators group, set this parameter to true |

**Returns:** `DictionaryResponse[] \| error`

**Sample code:**

```ballerina
DictionaryResponse[] result = check signavioClient->listDictionaryCategories();
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

<details>
<summary>createDictionaryCategory</summary>

Creates a dictionary category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DictionaryCategoryRequest</code> | Yes | Request payload (DictionaryCategoryRequest) |
| `contentType` | <code>string</code> | No | application/x-www-form-urlencoded |

**Returns:** `DictionaryResponse \| error`

**Sample code:**

```ballerina
DictionaryResponse result = check signavioClient->createDictionaryCategory(payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {}
}
```

</details>

<details>
<summary>getDictionaryCategory</summary>

Retrieves the specified dictionary category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the dictionary category to retrieve |

**Returns:** `DictionaryResponse[] \| error`

**Sample code:**

```ballerina
DictionaryResponse[] result = check signavioClient->getDictionaryCategory(id);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

<details>
<summary>updateDictionaryCategory</summary>

Updates an existing dictionary category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the dictionary category to update |
| `payload` | <code>DictionaryCategoryRequest</code> | Yes | Request payload (DictionaryCategoryRequest) |
| `contentType` | <code>string</code> | No | application/x-www-form-urlencoded |

**Returns:** `DictionaryResponse \| error`

**Sample code:**

```ballerina
DictionaryResponse result = check signavioClient->updateDictionaryCategory(id, payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {}
}
```

</details>

<details>
<summary>deleteDictionaryCategory</summary>

Deletes a dictionary category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The dictionary category to delete |
| `moveContent` | <code>boolean</code> | Yes | If set to `true`, before deleting the category with  all its sub-categories, the content is moved to the 'Others'  category. Otherwise, sub-categories and all contained dictionary  entries and the sub-categories' contained dictionary entries will  be deleted |

**Returns:** `SuccessResponse \| error`

**Sample code:**

```ballerina
SuccessResponse result = check signavioClient->deleteDictionaryCategory(id);
```

**Sample response:**

```json
{
  "success": true
}
```

</details>

#### Directory

<details>
<summary>getRootDirectories</summary>

Retrieves your workspace's root folders' metadata.

**Returns:** `HyperMediaObject[] \| error`

**Sample code:**

```ballerina
HyperMediaObject[] result = check signavioClient->getRootDirectories();
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

<details>
<summary>createDirectory</summary>

Create a new directory

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CreateDirectoryRequest</code> | Yes | Request payload (CreateDirectoryRequest) |

**Returns:** `HyperMediaObject \| error`

**Sample code:**

```ballerina
HyperMediaObject result = check signavioClient->createDirectory(payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {}
}
```

</details>

<details>
<summary>getDirectoryContent</summary>

Get meta-data of items in a given directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>DirectoryId</code> | Yes | The ID of the directory to get the content of |

**Returns:** `HyperMediaObject[] \| error`

**Sample code:**

```ballerina
HyperMediaObject[] result = check signavioClient->getDirectoryContent(id);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

<details>
<summary>moveDirectory</summary>

Move a given directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>DirectoryId</code> | Yes | The ID of the directory to move |
| `payload` | <code>MoveDirectoryRequest</code> | Yes | Request payload (MoveDirectoryRequest) |

**Returns:** `HyperMediaObject \| error`

**Sample code:**

```ballerina
HyperMediaObject result = check signavioClient->moveDirectory(id, payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {}
}
```

</details>

<details>
<summary>deleteDirectory</summary>

Delete a directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>DirectoryId</code> | Yes | The ID of the directory to delete |

**Returns:** `DeleteDirectoryResponse \| error`

**Sample code:**

```ballerina
DeleteDirectoryResponse result = check signavioClient->deleteDirectory(id);
```

**Sample response:**

```json
{
  "success": true
}
```

</details>

<details>
<summary>getDirectoryInfo</summary>

Meta-data of a given directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>DirectoryId</code> | Yes | The ID of the directory to get the meta-data of |

**Returns:** `DirectoryInfo \| error`

**Sample code:**

```ballerina
DirectoryInfo result = check signavioClient->getDirectoryInfo(id);
```

**Sample response:**

```json
{
  "parent": "string",
  "allowedMimeTypeRegex": "string",
  "parentName": "string",
  "deleted": true,
  "visible": true,
  "created": "string",
  "name": "string",
  "description": "string"
}
```

</details>

<details>
<summary>renameDirectory</summary>

Rename a given directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>DirectoryId</code> | Yes | The ID of the directory to rename |
| `payload` | <code>RenameDirectoryData</code> | Yes | Request payload (RenameDirectoryData) |

**Returns:** `DirectoryInfo \| error`

**Sample code:**

```ballerina
DirectoryInfo result = check signavioClient->renameDirectory(id, payload);
```

**Sample response:**

```json
{
  "parent": "string",
  "allowedMimeTypeRegex": "string",
  "parentName": "string",
  "deleted": true,
  "visible": true,
  "created": "string",
  "name": "string",
  "description": "string"
}
```

</details>

<details>
<summary>publishItem</summary>

publish/unpublish an item

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PublishData</code> | Yes | Request payload (PublishData) |

**Returns:** `HyperMediaObject[] \| error`

**Sample code:**

```ballerina
HyperMediaObject[] result = check signavioClient->publishItem(payload);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {}
  }
]
```

</details>

#### Model Export and Import

<details>
<summary>getModelJson</summary>

Get the model diagram as JSON

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelId` | <code>string</code> | Yes | The ID of the model to be retrieved |

**Returns:** `DiagramJson \| error`

**Sample code:**

```ballerina
DiagramJson result = check signavioClient->getModelJson(modelId);
```

**Sample response:**

```json
{
  "resourceId": "string",
  "properties": {},
  "childShapes": [
    {
      "resourceId": "string",
      "properties": {}
    }
  ]
}
```

</details>

<details>
<summary>getRevisionJson</summary>

Get revision JSON.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `revisionId` | <code>string</code> | Yes | The ID of the revision to be retrieved |

**Returns:** `DiagramJson \| error`

**Sample code:**

```ballerina
DiagramJson result = check signavioClient->getRevisionJson(revisionId);
```

**Sample response:**

```json
{
  "resourceId": "string",
  "properties": {},
  "childShapes": [
    {
      "resourceId": "string",
      "properties": {}
    }
  ]
}
```

</details>

<details>
<summary>getPng</summary>

Get the model diagram as a PNG image

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelId` | <code>string</code> | Yes | The ID of the model |

**Returns:** `byte[] \| error`

**Sample code:**

```ballerina
byte[] result = check signavioClient->getPng(modelId);
```

</details>

<details>
<summary>getRevisionPng</summary>

Get revision PNG.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `revisionId` | <code>string</code> | Yes | Revision ID |

**Returns:** `byte[] \| error`

**Sample code:**

```ballerina
byte[] result = check signavioClient->getRevisionPng(revisionId);
```

</details>

<details>
<summary>getBpmnXml</summary>

Get BPMN 2.0 XML

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelId` | <code>string</code> | Yes | The ID of the model |
| `exportSubprocesses` | <code>boolean</code> | No | Whether to include linked subprocesses |
| `language` | <code>string</code> | No | Which tenant content language to use as the primary language of the exported XML |

**Returns:** `xml \| error`

**Sample code:**

```ballerina
xml result = check signavioClient->getBpmnXml(modelId);
```

</details>

<details>
<summary>getRevisionBpmnXml</summary>

Get revision BPMN 2.0 XML

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `revisionId` | <code>string</code> | Yes | The ID of the model revision |
| `exportSubprocesses` | <code>boolean</code> | No | Whether to include linked subprocesses |
| `language` | <code>string</code> | No | Which tenant content language to use as the primary language of the exported XML |

**Returns:** `xml \| error`

**Sample code:**

```ballerina
xml result = check signavioClient->getRevisionBpmnXml(revisionId);
```

</details>

<details>
<summary>getSvg</summary>

Get the model diagram as an SVG image

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelId` | <code>string</code> | Yes | The ID of the model |

**Returns:** `http:Response \| error`

**Sample code:**

```ballerina
http:Response result = check signavioClient->getSvg(modelId);
```

</details>

<details>
<summary>getRevisionSvg</summary>

Get revision SVG.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `revisionId` | <code>string</code> | Yes | Revision ID |

**Returns:** `http:Response \| error`

**Sample code:**

```ballerina
http:Response result = check signavioClient->getRevisionSvg(revisionId);
```

</details>

<details>
<summary>importBpmn20Xml</summary>

Import BPMN 2.0 XML

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BpmnImportRequest</code> | Yes | Request payload (BpmnImportRequest) |

**Returns:** `BpmnImportResult \| error`

**Sample code:**

```ballerina
BpmnImportResult result = check signavioClient->importBpmn20Xml(payload);
```

**Sample response:**

```json
{
  "numUpdated": 0,
  "createdIds": [
    "string"
  ],
  "warnings": [
    {
      "details": [
        {}
      ]
    }
  ],
  "mainModelId": "string",
  "numCreated": 0,
  "updatedIds": [
    "string"
  ],
  "errors": [
    {
      "details": [
        {}
      ]
    }
  ]
}
```

</details>

<details>
<summary>getDmnDownloadLink</summary>

Retrieve download link to xml

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the model |

**Returns:** `DmnDownloadLinkResponse \| error`

**Sample code:**

```ballerina
DmnDownloadLinkResponse result = check signavioClient->getDmnDownloadLink(id);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {
    "success": true,
    "downloadUrl": "string",
    "messages": [
      "string"
    ]
  }
}
```

</details>

<details>
<summary>downloadDmnXml</summary>

Download DMN XML

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The download id provided from /dmn-xml-download/&#123;id&#125; |

**Returns:** `byte[] \| error`

**Sample code:**

```ballerina
byte[] result = check signavioClient->downloadDmnXml(id);
```

</details>

#### Ingestion

<details>
<summary>uploadSchemaAndData</summary>

Upload schema and data

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IngestionDataRequest</code> | Yes | Request payload (IngestionDataRequest) |

**Returns:** `UploadSchemaAndDataResponseDto \| error`

**Sample code:**

```ballerina
UploadSchemaAndDataResponseDto result = check signavioClient->uploadSchemaAndData(payload);
```

**Sample response:**

```json
{
  "executionId": "string"
}
```

</details>

<details>
<summary>getStatus</summary>

Get status of ingestion request

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `executionId` | <code>string</code> | Yes | Ingestion request execution Id |

**Returns:** `ExecutionStatusDto \| error`

**Sample code:**

```ballerina
ExecutionStatusDto result = check signavioClient->getStatus(executionId);
```

**Sample response:**

```json
{
  "displayStatus": "string",
  "message": "string",
  "status": "REQUEST_VALIDATING\"|\"REQUEST_VALIDATED\"|\"REQUEST_VALIDATION_FAILED\"|\"FILE_CONVERTING\"|\"FILE_CONVERTED\"|\"FILE_CONVERSION_FAILED\"|\"FILE_UPLOADING\"|\"FILE_UPLOADED\"|\"FILE_UPLOAD_FAILED\"|\"INTERNAL_SYNCHRONISING\"|\"INTERNAL_SYNCHRONISING_FAILED\"|\"COMPLETED"
}
```

</details>

#### Transformation Manager - Initiatives

<details>
<summary>listInitiatives</summary>

List initiatives

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `search` | <code>string</code> | No | Full-text search query for initiative name and description. Minimum 3 characters required; shorter queries are ignored |
| `pageNumber` | <code>int:Signed32</code> | No | Page number (1-based, the first page has number 1) |
| `nameContains` | <code>string</code> | No | Only list initiatives that contain this substring. This parameter can be repeated |
| `valueDriver` | <code>ValueDriver</code> | No | Only list initiatives containing this value driver. This parameter can be repeated |
| `createdBy` | <code>UUID</code> | No | Only list initiatives which were created by this user. This parameter can be repeated |
| `authorizationRole` | <code>Role</code> | No | Only list initiatives where the user has the specified access role. This parameter can be repeated |
| `sortOrder` | <code>"Ascending"&#124;"Descending"</code> | No | Order to sort the initiatives by |
| `hasMember` | <code>UUID</code> | No | Only list initiatives which this user is a member. This parameter can be repeated |
| `pageSize` | <code>int:Signed32</code> | No | Number of entries per page |
| `sortBy` | <code>"dateCreated"&#124;"dateUpdated"&#124;"name"&#124;"startDate"&#124;"endDate"&#124;"lastActivity"&#124;"numberOfInsights"</code> | No | Initiative property to sort by |
| `status` | <code>InitiativeStatus</code> | No | Only list initiatives with this status. This parameter can be repeated |

**Returns:** `Initiative[] \| error`

**Sample code:**

```ballerina
Initiative[] result = check signavioClient->listInitiatives();
```

**Sample response:**

```json
[
  {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "endDate": "string",
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "sri": "string",
    "dateUpdated": "string",
    "dateCreated": "string"
  }
]
```

</details>

<details>
<summary>createInitiative</summary>

Create initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IncomingInitiative</code> | Yes | Request payload (IncomingInitiative) |

**Returns:** `Initiative \| error`

**Sample code:**

```ballerina
Initiative result = check signavioClient->createInitiative(payload);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "endDate": "string",
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "sri": "string",
  "dateUpdated": "string",
  "dateCreated": "string"
}
```

</details>

<details>
<summary>getInitiative</summary>

Get initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative to retrieve |

**Returns:** `Initiative \| error`

**Sample code:**

```ballerina
Initiative result = check signavioClient->getInitiative(initiativeId);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "endDate": "string",
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "sri": "string",
  "dateUpdated": "string",
  "dateCreated": "string"
}
```

</details>

<details>
<summary>updateInitiative</summary>

Update initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative to update |
| `payload` | <code>IncomingInitiative</code> | Yes | Request payload (IncomingInitiative) |

**Returns:** `Initiative \| error`

**Sample code:**

```ballerina
Initiative result = check signavioClient->updateInitiative(initiativeId, payload);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "endDate": "string",
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "sri": "string",
  "dateUpdated": "string",
  "dateCreated": "string"
}
```

</details>

<details>
<summary>deleteInitiative</summary>

Delete initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative to delete |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check signavioClient->deleteInitiative(initiativeId);
```

</details>

#### Transformation Manager - Assets

<details>
<summary>listAssetsInitiative</summary>

List assets from initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative containing the assets |

**Returns:** `Asset[] \| error`

**Sample code:**

```ballerina
Asset[] result = check signavioClient->listAssetsInitiative(initiativeId);
```

**Sample response:**

```json
[
  {
    "initiative": {
      "updatedBy": {
        "firstName": "string",
        "lastName": "string",
        "displayName": "string",
        "id": {},
        "userGroupIds": [
          {}
        ],
        "email": "string"
      },
      "endDate": "string",
      "valueDrivers": [
        {}
      ],
      "authorizations": [
        {}
      ],
      "description": "string",
      "sri": "string",
      "dateUpdated": "string",
      "dateCreated": "string"
    },
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "dateCreated": "string",
    "createdBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "name": "string",
    "description": "string",
    "id": "string",
    "url": "string"
  }
]
```

</details>

<details>
<summary>createAssetInitiative</summary>

Create asset in initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative to add the asset to |
| `payload` | <code>IncomingAsset</code> | Yes | Request payload (IncomingAsset) |

**Returns:** `Asset \| error`

**Sample code:**

```ballerina
Asset result = check signavioClient->createAssetInitiative(initiativeId, payload);
```

**Sample response:**

```json
{
  "initiative": {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "endDate": "string",
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "sri": "string",
    "dateUpdated": "string",
    "dateCreated": "string"
  },
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "dateCreated": "string",
  "createdBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "name": "string",
  "description": "string",
  "id": "string",
  "url": "string"
}
```

</details>

<details>
<summary>getAssetInitiative</summary>

Get asset from initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `assetId` | <code>UUID</code> | Yes | The id of the asset to retrieve |
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative containing the asset |

**Returns:** `Asset \| error`

**Sample code:**

```ballerina
Asset result = check signavioClient->getAssetInitiative(assetId, initiativeId);
```

**Sample response:**

```json
{
  "initiative": {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "endDate": "string",
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "sri": "string",
    "dateUpdated": "string",
    "dateCreated": "string"
  },
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "dateCreated": "string",
  "createdBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "name": "string",
  "description": "string",
  "id": "string",
  "url": "string"
}
```

</details>

<details>
<summary>updateAssetInitiative</summary>

Update asset in initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `assetId` | <code>UUID</code> | Yes | The id of the asset to update |
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative containing the asset |
| `payload` | <code>IncomingAsset</code> | Yes | Request payload (IncomingAsset) |

**Returns:** `Asset \| error`

**Sample code:**

```ballerina
Asset result = check signavioClient->updateAssetInitiative(assetId, initiativeId, payload);
```

**Sample response:**

```json
{
  "initiative": {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "endDate": "string",
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "sri": "string",
    "dateUpdated": "string",
    "dateCreated": "string"
  },
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "dateCreated": "string",
  "createdBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "name": "string",
  "description": "string",
  "id": "string",
  "url": "string"
}
```

</details>

<details>
<summary>deleteAssetInitiative</summary>

Delete asset from initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `assetId` | <code>UUID</code> | Yes | The id of the asset to delete |
| `initiativeId` | <code>UUID</code> | Yes | The id of the initiative containing the asset |

**Returns:** `Asset \| error`

**Sample code:**

```ballerina
Asset result = check signavioClient->deleteAssetInitiative(assetId, initiativeId);
```

**Sample response:**

```json
{
  "initiative": {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "endDate": "string",
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "sri": "string",
    "dateUpdated": "string",
    "dateCreated": "string"
  },
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "dateCreated": "string",
  "createdBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "name": "string",
  "description": "string",
  "id": "string",
  "url": "string"
}
```

</details>

#### Transformation Manager - Insights

<details>
<summary>listInsightsInInitiative</summary>

Get all insights in an initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>string</code> | Yes | ID of the initiative whose insights should be listed |
| `pageNumber` | <code>int:Signed32</code> | No | Page number (1-based, the first page has number 1) |
| `nameContains` | <code>string</code> | No | Only list insights that contain this substring. This parameter can be repeated |
| `processIntelligenceCanvasType` | <code>"INVESTIGATION"&#124;"DASHBOARD"</code> | No | Only list insights containing discoveries from process intelligence with this canvas type. This parameter can be repeated |
| `valueDriver` | <code>"IT_CAPACITY_PLANNING"&#124;"IMPROVE_DEMAND_FORECAST_ACCURACY"&#124;"IMPROVE_ON_TIME_DELIVERY"&#124;"IMPROVE_FTE_PRODUCTIVITY"&#124;"IMPROVE_USER_COMPLIANCE"&#124;"INCREASE_CASH_FORECAST_ACCURACY"&#124;"INCREASE_DAYS_PAYABLES"&#124;"INCREASE_EFFECTIVENESS_MARKETING"&#124;"OPERATIONAL_EXCELLENCE"&#124;"REDUCE_HR_MANUAL_TRANSACTION"&#124;"REDUCE_ASSET_COST"&#124;"REDUCE_CUSTOMER_CHURN"&#124;"REDUCE_DATA_MANAGEMENT_COST"&#124;"REDUCE_DAYS_IN_INVENTORY"&#124;"REDUCE_DAYS_SALES"&#124;"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS"&#124;"REDUCE_FINANCE_COST"&#124;"REDUCE_MANUFACTURING_CYCLE_TIME"&#124;"REDUCE_READING_TO_INVOICE_TIME"&#124;"REDUCE_NON_COMPLIANT_SERVICES"&#124;"REDUCE_SUPPLY_CHAIN_PLANNING_COST"&#124;"REDUCE_REVENUE_LOSS"&#124;"REDUCE_SALES_COSTS"&#124;"REDUCE_SERVICE_SUPPORT_COST"&#124;"REDUCE_TIME_TO_FILL"&#124;"REDUCE_TIME_TO_MARKET"&#124;"REDUCE_LOGISTICS_COST"&#124;"REDUCE_MANUFACTURING_COSTS"&#124;"REDUCE_UNPLANNED_DOWNTIME"&#124;"REDUCE_UNCOLLECTIBLE_ACCOUNTS"</code> | No | Only list insights containing this value driver. This parameter can be repeated |
| `discoveryReferenceApplication` | <code>"PROCESS_MANAGER"&#124;"PROCESS_INTELLIGENCE"&#124;"PROCESS_INSIGHTS"&#124;"BENCHMARKING_ANALYTICS"&#124;"JOURNEY_MODELER"&#124;"SUITE_CAPABILITIES"&#124;"PROCESS_GOVERNANCE"</code> | No | Only list insights containing discoveries with this domain application. This parameter can be repeated |
| `processInsightsProcessFlowId` | <code>string</code> | No | Only list insights containing discoveries from process insights with this process flow id. This parameter can be repeated |
| `pageSize` | <code>int:Signed32</code> | No | Number of entries per page |
| `processIntelligenceWidgetId` | <code>string</code> | No | Only list insights containing discoveries from process intelligence with this widget id. This parameter can be repeated |
| `processIntelligenceProcessId` | <code>string</code> | No | Only list insights containing discoveries from process intelligence with this process id. This parameter can be repeated |
| `createdBy` | <code>string</code> | No | Only list insights which were created by this user. This parameter can be repeated |
| `processInsightsSystemId` | <code>string</code> | No | Only list insights containing discoveries from process insights with this system id. This parameter can be repeated |
| `sortOrder` | <code>"Ascending"&#124;"Descending"</code> | No | Order to sort the initiatives by |
| `processIntelligenceCanvasId` | <code>string</code> | No | Only list insights containing discoveries from process intelligence with this canvas id. This parameter can be repeated |
| `sortBy` | <code>"dateCreated"&#124;"dateUpdated"&#124;"name"&#124;"impactScore"&#124;"effortScore"&#124;"priorityScore"</code> | No | Initiative property to sort by |
| `tag` | <code>string</code> | No | Only list insights which contain this tag. This parameter can be repeated |
| `assignee` | <code>string</code> | No | Only list insights which are assigned to this user. This parameter can be repeated |
| `discoveryReferenceSRI` | <code>string</code> | No | Only list insights containing discoveries with this SRI. This parameter can be repeated |
| `status` | <code>"OPEN"&#124;"IN_PROGRESS"&#124;"RESOLVED"</code> | No | Only list insights with this status. This parameter can be repeated |

**Returns:** `Insight[] \| error`

**Sample code:**

```ballerina
Insight[] result = check signavioClient->listInsightsInInitiative(initiativeId);
```

**Sample response:**

```json
[
  {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "assignees": [
      {
        "firstName": "string",
        "lastName": "string",
        "displayName": "string",
        "id": {},
        "userGroupIds": [
          {}
        ],
        "email": "string"
      }
    ],
    "sri": "string",
    "dateUpdated": "string",
    "tags": [
      {
        "dateCreated": {},
        "id": {},
        "label": "string",
        "dateUpdated": {}
      }
    ]
  }
]
```

</details>

<details>
<summary>getInsightInInitiative</summary>

Get insight in initiative

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `initiativeId` | <code>UUID</code> | Yes | ID of the initiative to which the insight belongs |
| `insightId` | <code>UUID</code> | Yes | ID of the insight to be retrieved |

**Returns:** `Insight \| error`

**Sample code:**

```ballerina
Insight result = check signavioClient->getInsightInInitiative(initiativeId, insightId);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "assignees": [
    {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    }
  ],
  "sri": "string",
  "dateUpdated": "string",
  "tags": [
    {
      "dateCreated": "string",
      "id": "string",
      "label": "string",
      "dateUpdated": "string"
    }
  ]
}
```

</details>

<details>
<summary>listInsights</summary>

Get all insights

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `pageNumber` | <code>int:Signed32</code> | No | Page number (1-based, the first page has number 1) |
| `nameContains` | <code>string</code> | No | Only list insights that contain this substring. This parameter can be repeated |
| `processIntelligenceCanvasType` | <code>"INVESTIGATION"&#124;"DASHBOARD"</code> | No | Only list insights containing discoveries from process intelligence with this canvas type. This parameter can be repeated |
| `valueDriver` | <code>"IT_CAPACITY_PLANNING"&#124;"IMPROVE_DEMAND_FORECAST_ACCURACY"&#124;"IMPROVE_ON_TIME_DELIVERY"&#124;"IMPROVE_FTE_PRODUCTIVITY"&#124;"IMPROVE_USER_COMPLIANCE"&#124;"INCREASE_CASH_FORECAST_ACCURACY"&#124;"INCREASE_DAYS_PAYABLES"&#124;"INCREASE_EFFECTIVENESS_MARKETING"&#124;"OPERATIONAL_EXCELLENCE"&#124;"REDUCE_HR_MANUAL_TRANSACTION"&#124;"REDUCE_ASSET_COST"&#124;"REDUCE_CUSTOMER_CHURN"&#124;"REDUCE_DATA_MANAGEMENT_COST"&#124;"REDUCE_DAYS_IN_INVENTORY"&#124;"REDUCE_DAYS_SALES"&#124;"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS"&#124;"REDUCE_FINANCE_COST"&#124;"REDUCE_MANUFACTURING_CYCLE_TIME"&#124;"REDUCE_READING_TO_INVOICE_TIME"&#124;"REDUCE_NON_COMPLIANT_SERVICES"&#124;"REDUCE_SUPPLY_CHAIN_PLANNING_COST"&#124;"REDUCE_REVENUE_LOSS"&#124;"REDUCE_SALES_COSTS"&#124;"REDUCE_SERVICE_SUPPORT_COST"&#124;"REDUCE_TIME_TO_FILL"&#124;"REDUCE_TIME_TO_MARKET"&#124;"REDUCE_LOGISTICS_COST"&#124;"REDUCE_MANUFACTURING_COSTS"&#124;"REDUCE_UNPLANNED_DOWNTIME"&#124;"REDUCE_UNCOLLECTIBLE_ACCOUNTS"</code> | No | Only list insights containing this value driver. This parameter can be repeated |
| `discoveryReferenceApplication` | <code>"PROCESS_MANAGER"&#124;"PROCESS_INTELLIGENCE"&#124;"PROCESS_INSIGHTS"&#124;"BENCHMARKING_ANALYTICS"&#124;"JOURNEY_MODELER"&#124;"SUITE_CAPABILITIES"&#124;"PROCESS_GOVERNANCE"</code> | No | Only list insights containing discoveries with this domain application. This parameter can be repeated |
| `processInsightsProcessFlowId` | <code>string</code> | No | Only list insights containing discoveries from process insights with this process flow id. This parameter can be repeated |
| `pageSize` | <code>int:Signed32</code> | No | Number of entries per page |
| `processIntelligenceWidgetId` | <code>string</code> | No | Only list insights containing discoveries from process intelligence with this widget id. This parameter can be repeated |
| `processIntelligenceProcessId` | <code>string</code> | No | Only list insights containing discoveries from process intelligence with this process id. This parameter can be repeated |
| `createdBy` | <code>string</code> | No | Only list insights which were created by this user. This parameter can be repeated |
| `processInsightsSystemId` | <code>string</code> | No | Only list insights containing discoveries from process insights with this system id. This parameter can be repeated |
| `sortOrder` | <code>"Ascending"&#124;"Descending"</code> | No | Order to sort the initiatives by |
| `processIntelligenceCanvasId` | <code>string</code> | No | Only list insights containing discoveries from process intelligence with this canvas id. This parameter can be repeated |
| `sortBy` | <code>"dateCreated"&#124;"dateUpdated"&#124;"name"&#124;"impactScore"&#124;"effortScore"&#124;"priorityScore"</code> | No | Initiative property to sort by |
| `tag` | <code>string</code> | No | Only list insights which contain this tag. This parameter can be repeated |
| `assignee` | <code>string</code> | No | Only list insights which are assigned to this user. This parameter can be repeated |
| `discoveryReferenceSRI` | <code>string</code> | No | Only list insights containing discoveries with this SRI. This parameter can be repeated |
| `status` | <code>"OPEN"&#124;"IN_PROGRESS"&#124;"RESOLVED"</code> | No | Only list insights with this status. This parameter can be repeated |

**Returns:** `Insight[] \| error`

**Sample code:**

```ballerina
Insight[] result = check signavioClient->listInsights();
```

**Sample response:**

```json
[
  {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "assignees": [
      {
        "firstName": "string",
        "lastName": "string",
        "displayName": "string",
        "id": {},
        "userGroupIds": [
          {}
        ],
        "email": "string"
      }
    ],
    "sri": "string",
    "dateUpdated": "string",
    "tags": [
      {
        "dateCreated": {},
        "id": {},
        "label": "string",
        "dateUpdated": {}
      }
    ]
  }
]
```

</details>

<details>
<summary>createInsight</summary>

Create an insight

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IncomingInsight</code> | Yes | Request payload (IncomingInsight) |

**Returns:** `Insight \| error`

**Sample code:**

```ballerina
Insight result = check signavioClient->createInsight(payload);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "assignees": [
    {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    }
  ],
  "sri": "string",
  "dateUpdated": "string",
  "tags": [
    {
      "dateCreated": "string",
      "id": "string",
      "label": "string",
      "dateUpdated": "string"
    }
  ]
}
```

</details>

<details>
<summary>getInsight</summary>

Get insight

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `insightId` | <code>UUID</code> | Yes | The id of the insight to retrieve |

**Returns:** `Insight \| error`

**Sample code:**

```ballerina
Insight result = check signavioClient->getInsight(insightId);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "assignees": [
    {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    }
  ],
  "sri": "string",
  "dateUpdated": "string",
  "tags": [
    {
      "dateCreated": "string",
      "id": "string",
      "label": "string",
      "dateUpdated": "string"
    }
  ]
}
```

</details>

<details>
<summary>updateInsight</summary>

Update insight

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `insightId` | <code>UUID</code> | Yes | The id of the insight to update |
| `payload` | <code>IncomingInsight</code> | Yes | Request payload (IncomingInsight) |

**Returns:** `Insight \| error`

**Sample code:**

```ballerina
Insight result = check signavioClient->updateInsight(insightId, payload);
```

**Sample response:**

```json
{
  "updatedBy": {
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "id": "string",
    "userGroupIds": [
      "string"
    ],
    "email": "string"
  },
  "valueDrivers": [
    "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS"
  ],
  "authorizations": [
    {
      "role": "OWNER\"|\"EDITOR\"|\"VIEWER",
      "targetType": "USER\"|\"GROUP",
      "target": {
        "displayName": "string",
        "id": {}
      }
    }
  ],
  "description": "string",
  "assignees": [
    {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    }
  ],
  "sri": "string",
  "dateUpdated": "string",
  "tags": [
    {
      "dateCreated": "string",
      "id": "string",
      "label": "string",
      "dateUpdated": "string"
    }
  ]
}
```

</details>

<details>
<summary>deleteInsight</summary>

Delete insight

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `insightId` | <code>UUID</code> | Yes | The id of the insight to delete |

**Returns:** `json \| error`

**Sample code:**

```ballerina
json result = check signavioClient->deleteInsight(insightId);
```

**Sample response:**

```json
{}
```

</details>

#### Model

<details>
<summary>retrieveModel</summary>

Retrieve Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the model to be retrieved |

**Returns:** `ModelResourceResponse[] \| error`

**Sample code:**

```ballerina
ModelResourceResponse[] result = check signavioClient->retrieveModel(id);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {
      "allowedMimeTypeRegex": "string",
      "deleted": true,
      "visible": true,
      "created": "string",
      "name": "string",
      "description": "string",
      "sendingInterval": "string",
      "nameEn": "string"
    }
  }
]
```

</details>

<details>
<summary>updateModel</summary>

Update Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the model to be updated |
| `payload` | <code>ModelRequest</code> | Yes | Request payload (ModelRequest) |
| `dc` | <code>string</code> | No | A timestamp or unique string used to prevent caching issues |

**Returns:** `ModelResourceResponse[] \| error`

**Sample code:**

```ballerina
ModelResourceResponse[] result = check signavioClient->updateModel(id, payload);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {
      "allowedMimeTypeRegex": "string",
      "deleted": true,
      "visible": true,
      "created": "string",
      "name": "string",
      "description": "string",
      "sendingInterval": "string",
      "nameEn": "string"
    }
  }
]
```

</details>

<details>
<summary>deleteModel</summary>

Delete Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>string</code> | Yes | The ID of the model to be deleted |

**Returns:** `SuccessResponse \| error`

**Sample code:**

```ballerina
SuccessResponse result = check signavioClient->deleteModel(id);
```

**Sample response:**

```json
{
  "success": true
}
```

</details>

<details>
<summary>createModel</summary>

Create a new Model

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ModelRequest</code> | Yes | Request payload (ModelRequest) |
| `dc` | <code>string</code> | No | A timestamp or unique string used to prevent caching issues |

**Returns:** `ModelResponse \| error`

**Sample code:**

```ballerina
ModelResponse result = check signavioClient->createModel(payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {
    "parent": "string",
    "formats": {},
    "grantedRevisionUser": "string",
    "isLicensedStencilSet": true,
    "grantedRevisionUserName": "string",
    "description": "string",
    "sriRevision": "string",
    "sriPath": "string"
  }
}
```

</details>

<details>
<summary>listModelRevisions</summary>

Retrieving all revision IDs of a model.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelId` | <code>string</code> | Yes | The model's ID |
| `offset` | <code>int:Signed32</code> | No | The offset of the first revision to be returned |
| `query` | <code>string</code> | No | A search query to filter the revisions |

**Returns:** `ModelRevisionsResponse[] \| error`

**Sample code:**

```ballerina
ModelRevisionsResponse[] result = check signavioClient->listModelRevisions(modelId);
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {
      "rev": 0,
      "size": 0,
      "author": "string",
      "authorName": "string",
      "created": "string",
      "isDeployed": true,
      "comment": "string",
      "authorCompany": "string"
    }
  }
]
```

</details>

<details>
<summary>updateModelInfo</summary>

Update model info

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelId` | <code>string</code> | Yes | The ID of the model |
| `payload` | <code>ModelInfoRequest</code> | Yes | Request payload (ModelInfoRequest) |

**Returns:** `ModelInfoResponse \| error`

**Sample code:**

```ballerina
ModelInfoResponse result = check signavioClient->updateModelInfo(modelId, payload);
```

**Sample response:**

```json
{
  "parent": "string",
  "formats": {},
  "grantedRevisionUser": "string",
  "isLicensedStencilSet": true,
  "grantedRevisionUserName": "string",
  "description": "string",
  "sriRevision": "string",
  "sriPath": "string"
}
```

</details>

<details>
<summary>checkSyntax</summary>

Performs a syntax check on a BPMN 2.0 process model.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SyntaxCheckRequest</code> | Yes | Request payload (SyntaxCheckRequest) |

**Returns:** `SyntaxCheckResponse \| error`

**Sample code:**

```ballerina
SyntaxCheckResponse result = check signavioClient->checkSyntax(payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": [
    {
      "should": {},
      "must": {},
      "guidelineId": "string"
    }
  ]
}
```

</details>

<details>
<summary>getExpirationDate</summary>

Retrieve the current approval expiration date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelID` | <code>string</code> | Yes | The ID of the model |

**Returns:** `ExpirationDate \| error`

**Sample code:**

```ballerina
ExpirationDate result = check signavioClient->getExpirationDate(modelID);
```

**Sample response:**

```json
{
  "reApprovalDate": "string"
}
```

</details>

<details>
<summary>updateExpirationDate</summary>

Update the approval expiration date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelID` | <code>string</code> | Yes | The ID of the model |
| `payload` | <code>ExpirationDate</code> | Yes | Request payload (ExpirationDate) |

**Returns:** `ExpirationDate \| error`

**Sample code:**

```ballerina
ExpirationDate result = check signavioClient->updateExpirationDate(modelID, payload);
```

**Sample response:**

```json
{
  "reApprovalDate": "string"
}
```

</details>

<details>
<summary>createExpirationDate</summary>

Create a new approval expiration date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelID` | <code>string</code> | Yes | The ID of the model |
| `payload` | <code>ExpirationDate</code> | Yes | Request payload (ExpirationDate) |

**Returns:** `ExpirationDate \| error`

**Sample code:**

```ballerina
ExpirationDate result = check signavioClient->createExpirationDate(modelID, payload);
```

**Sample response:**

```json
{
  "reApprovalDate": "string"
}
```

</details>

<details>
<summary>deleteExpirationDate</summary>

Delete the current approval expiration date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `modelID` | <code>string</code> | Yes | The ID of the model |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check signavioClient->deleteExpirationDate(modelID);
```

</details>

#### Editor and Meta

<details>
<summary>createDiagramDraft</summary>

Create a new model draft.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `stencilset` | <code>string</code> | Yes | The notation URI value for the stencil set |

**Returns:** `DiagramDraftResponse \| error`

**Sample code:**

```ballerina
DiagramDraftResponse result = check signavioClient->createDiagramDraft();
```

**Sample response:**

```json
{
  "id": "string"
}
```

</details>

<details>
<summary>getMetaInfo</summary>

Get meta information

**Returns:** `MetaResponseItem[] \| error?`

**Sample code:**

```ballerina
MetaResponseItem[] result = check signavioClient->getMetaInfo();
```

**Sample response:**

```json
[
  {
    "rel": "string",
    "href": "string",
    "rep": {
      "glossaryBindings": [
        {}
      ],
      "lineWrap": true,
      "defaultValue": "string",
      "length": 0,
      "description": "string",
      "isGlossaryDefinition": true,
      "nameEnGb": "string",
      "isList": true
    }
  }
]
```

</details>

<details>
<summary>createMetaInfo</summary>

Create meta information

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MetaInfoRequest</code> | Yes | Request payload (MetaInfoRequest) |

**Returns:** `MetaResponseItem \| error`

**Sample code:**

```ballerina
MetaResponseItem result = check signavioClient->createMetaInfo(payload);
```

**Sample response:**

```json
{
  "rel": "string",
  "href": "string",
  "rep": {
    "glossaryBindings": [
      {}
    ],
    "lineWrap": true,
    "defaultValue": "string",
    "length": 0,
    "description": "string",
    "isGlossaryDefinition": true,
    "nameEnGb": "string",
    "isList": true
  }
}
```

</details>

#### Objectives

<details>
<summary>listObjectives</summary>

Get all objectives

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `size` | <code>int:Signed32</code> | No | Page size (max 1000) |
| `page` | <code>int:Signed32</code> | No | Zero-based page index (0 = first page) |
| `dollarCount` | <code>boolean</code> | No | Include approximate total count in response when true |

**Returns:** `ObjectivesResponse \| error`

**Sample code:**

```ballerina
ObjectivesResponse result = check signavioClient->listObjectives();
```

**Sample response:**

```json
{
  "count": 0,
  "value": [
    {
      "dateCreated": "string",
      "name": "string",
      "description": "string",
      "attributes": [
        {}
      ],
      "sId": "string",
      "dateUpdated": "string"
    }
  ]
}
```

</details>

<details>
<summary>getObjective</summary>

Get objective by SID

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectiveSid` | <code>string</code> | Yes | The Suite Objective ID (SID) (e.g. `SuiteObjective_&lt;32 hex chars&gt;`) |

**Returns:** `Objective \| error`

**Sample code:**

```ballerina
Objective result = check signavioClient->getObjective(objectiveSid);
```

**Sample response:**

```json
{
  "dateCreated": "string",
  "name": "string",
  "description": "string",
  "attributes": [
    {}
  ],
  "sId": "string",
  "dateUpdated": "string"
}
```

</details>

<details>
<summary>getInitiativesByObjective</summary>

Get linked initiatives

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `objectiveSid` | <code>string</code> | Yes | The Suite Objective ID (SID) (e.g. `SuiteObjective_&lt;32 hex chars&gt;`) |

**Returns:** `InitiativeSummaryForObjective[] \| error`

**Sample code:**

```ballerina
InitiativeSummaryForObjective[] result = check signavioClient->getInitiativesByObjective(objectiveSid);
```

**Sample response:**

```json
[
  {
    "updatedBy": {
      "firstName": "string",
      "lastName": "string",
      "displayName": "string",
      "id": "string",
      "userGroupIds": [
        {}
      ],
      "email": "string"
    },
    "endDate": "string",
    "valueDrivers": [
      "IT_CAPACITY_PLANNING\"|\"IMPROVE_DEMAND_FORECAST_ACCURACY\"|\"IMPROVE_ON_TIME_DELIVERY\"|\"IMPROVE_FTE_PRODUCTIVITY\"|\"IMPROVE_USER_COMPLIANCE\"|\"INCREASE_CASH_FORECAST_ACCURACY\"|\"INCREASE_DAYS_PAYABLES\"|\"INCREASE_EFFECTIVENESS_MARKETING\"|\"OPERATIONAL_EXCELLENCE\"|\"REDUCE_HR_MANUAL_TRANSACTION\"|\"REDUCE_ASSET_COST\"|\"REDUCE_CUSTOMER_CHURN\"|\"REDUCE_DATA_MANAGEMENT_COST\"|\"REDUCE_DAYS_IN_INVENTORY\"|\"REDUCE_DAYS_SALES\"|\"REDUCE_DAYS_CLOSE_ANNUAL_BOOKS\"|\"REDUCE_FINANCE_COST\"|\"REDUCE_MANUFACTURING_CYCLE_TIME\"|\"REDUCE_READING_TO_INVOICE_TIME\"|\"REDUCE_NON_COMPLIANT_SERVICES\"|\"REDUCE_SUPPLY_CHAIN_PLANNING_COST\"|\"REDUCE_REVENUE_LOSS\"|\"REDUCE_SALES_COSTS\"|\"REDUCE_SERVICE_SUPPORT_COST\"|\"REDUCE_TIME_TO_FILL\"|\"REDUCE_TIME_TO_MARKET\"|\"REDUCE_LOGISTICS_COST\"|\"REDUCE_MANUFACTURING_COSTS\"|\"REDUCE_UNPLANNED_DOWNTIME\"|\"REDUCE_UNCOLLECTIBLE_ACCOUNTS\"|\"REDUCE_EMISSIONS_COST\"|\"REDUCE_WASTE_GENERATION_COST\"|\"REDUCE_COMPLIANCE_AND_RISK_MANAGEMENT_COST\"|\"INCREASE_BUSINESS_PROCESS_HARMONIZATION\"|\"INCREASE_ADHERENCE_TO_STANDARDIZED_SAP_BUSINESS_PROCESSES"
    ],
    "authorizations": [
      {
        "role": {},
        "targetType": {},
        "target": {}
      }
    ],
    "description": "string",
    "sid": "string",
    "dateUpdated": "string",
    "dateCreated": "string"
  }
]
```

</details>

#### Search

<details>
<summary>search</summary>

Search the workspace

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `q` | <code>string</code> | Yes | The search term |
| `types` | <code>string</code> | No | List of content types the search should include, from `MODEL`, `MODEL_REVISION`, `SHAPE`, `FILE`, `FILE_REVISION`, `DIR` and `COMMENT` |
| `offset` | <code>string</code> | No | Index of first search result to return |
| `contentmode` | <code>string</code> | No | e.g. explorer |
| `fieldsJson` | <code>string</code> | No | Example: `[{"id":"search.searchableFields.all","textQueries":[{"matching":"contains","text":"foo-bar"}]}]` |

**Returns:** `http:Response \| error`

**Sample code:**

```ballerina
http:Response result = check signavioClient->search();
```

</details>

#### SIGNAL Engine OData

<details>
<summary>getServiceDocument</summary>

Returns all entity sets (Odata views) the user has access to. A JSON list is returned representing the entity set.

**Returns:** `ServiceDocument \| error`

**Sample code:**

```ballerina
ServiceDocument result = check signavioClient->getServiceDocument();
```

**Sample response:**

```json
{
  "atOdataContext": "string",
  "value": [
    {
      "kind": "string",
      "name": "string",
      "url": "string"
    }
  ]
}
```

</details>

<details>
<summary>getMetadata</summary>

Returns metadata for all entity sets (OData views) the user has access to. An XML schema is returned representing the metadata.

**Returns:** `xml \| error`

**Sample code:**

```ballerina
xml result = check signavioClient->getMetadata();
```

</details>

<details>
<summary>queryEntitySet</summary>

This endpoint implements an OData service endpoint according to version 4.0 of

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `entitySetName` | <code>string</code> | Yes | The name for the entity set (in this case, the oData view). Can be returned by calling the /$metadata endpoint |
| `dollarDeltatoken` | <code>string</code> | No | Not implemented |
| `dollarTop` | <code>int</code> | No | A positive integer value that specifies the maximum number of entries to return, reduced by the value of skiptoken |
| `dollarFilter` | <code>string</code> | No | A filter expression that all entries in the result set must match |
| `dollarSkiptoken` | <code>string</code> | No | An opaque value that enables consistent pagination of results. Included in the value of the `@odata.nextLink` parameter of a paginated OData result response |
| `dollarOrderby` | <code>string</code> | No | Not implemented |
| `dollarSearch` | <code>string</code> | No | Not implemented |
| `dollarExpand` | <code>string</code> | No | Not implemented |
| `skip` | <code>int</code> | No | A positive integer value that specifies the number of entries to skip before returning the remainder |
| `dollarFormat` | <code>string</code> | No | Requested response format from the client. If specified, `$format` overrides any value specified in the `Accept` header, based on the OData specification 4.0.  Currently only `application/json` is supported |
| `dollarCount` | <code>boolean</code> | No | System query option `inlinecount`.  If specified, then the server will return the number of entries as an integer |
| `dollarId` | <code>string</code> | No | Not implemented |
| `dollarSelect` | <code>string[]</code> | Yes | The list of properties that each returned entry will specify |

**Returns:** `OdataOutput \| error`

**Sample code:**

```ballerina
OdataOutput result = check signavioClient->queryEntitySet(entitySetName);
```

**Sample response:**

```json
{
  "atOdataNextLink": "string",
  "atOdataCount": 0,
  "atOdataContext": "string",
  "value": [
    {}
  ]
}
```

</details>
