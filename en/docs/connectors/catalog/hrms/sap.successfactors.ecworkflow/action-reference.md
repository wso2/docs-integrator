---
connector: true
connector_name: "sap.successfactors.ecworkflow"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecworkflow` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecworkflow objects — MyPendingWorkflow, WfRequestParticipator, WorkflowAllowedActionList, AlertMessage, WfRequestComments, WfRequestStep, AutoDelegateDetail, AutoDelegateConfig… — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access data of employees workflow requests and and other workflow data such as current status.

### Configuration

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the SAP SuccessFactors OData endpoint. Passed as the argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:CredentialsConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | See default | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | See default | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | See default | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | See default | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | See default | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | See default | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | See default | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | See default | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | See default | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | See default | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | See default | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

The client also accepts a `hostname` string parameter (the SAP SuccessFactors API server host) and an optional `port` (defaults to `443`).

### Initializing the client

```ballerina
import ballerinax/sap.successfactors.ecworkflow;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecworkflow:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### MyPendingWorkflow

<details>
<summary>listMyPendingWorkflows</summary>

<div>

Queries the MyPendingWorkflow collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListMyPendingWorkflowsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listMyPendingWorkflows();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getMyPendingWorkflow</summary>

<div>

Retrieves a single MyPendingWorkflow entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wfRequestId` | <code>string</code> | Yes | key: wfRequestId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetMyPendingWorkflowQueries</code> | No | Queries to be sent with the request |

**Returns:** `MyPendingWorkflow_1&#124;error`

**Sample code:**

```ballerina
MyPendingWorkflow_1 result = check client->getMyPendingWorkflow(wfRequestId);
```

**Sample response:**

```json
{
  "d": {
    "wfRequestId": "1000"
  }
}
```

</div>
</details>

#### WfRequestParticipator

<details>
<summary>listWfRequestParticipators</summary>

<div>

Queries the WfRequestParticipator collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWfRequestParticipatorsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listWfRequestParticipators();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestParticipatorId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getWfRequestParticipator</summary>

<div>

Retrieves a single WfRequestParticipator entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wfRequestParticipatorId` | <code>int</code> | Yes | key: wfRequestParticipatorId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWfRequestParticipatorQueries</code> | No | Queries to be sent with the request |

**Returns:** `WfRequestParticipator_1&#124;error`

**Sample code:**

```ballerina
WfRequestParticipator_1 result = check client->getWfRequestParticipator(wfRequestParticipatorId);
```

**Sample response:**

```json
{
  "d": {
    "wfRequestParticipatorId": "1000"
  }
}
```

</div>
</details>

#### WorkflowAllowedActionList

<details>
<summary>listWorkflowAllowedActionLists</summary>

<div>

Queries the WorkflowAllowedActionList collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWorkflowAllowedActionListsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listWorkflowAllowedActionLists();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getWorkflowAllowedActionList</summary>

<div>

Retrieves a single WorkflowAllowedActionList entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wfRequestId` | <code>int</code> | Yes | key: wfRequestId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWorkflowAllowedActionListQueries</code> | No | Queries to be sent with the request |

**Returns:** `WorkflowAllowedActionList_1&#124;error`

**Sample code:**

```ballerina
WorkflowAllowedActionList_1 result = check client->getWorkflowAllowedActionList(wfRequestId);
```

**Sample response:**

```json
{
  "d": {
    "wfRequestId": "1000"
  }
}
```

</div>
</details>

#### AlertMessage

<details>
<summary>listAlertMessages</summary>

<div>

Queries the AlertMessage collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAlertMessagesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listAlertMessages();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "wfRequestNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createAlertMessage</summary>

<div>

Creates a new AlertMessage entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AlertMessage</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedAlertMessage&#124;error`

**Sample code:**

```ballerina
CreatedAlertMessage result = check client->createAlertMessage(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "wfRequestNav": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getAlertMessage</summary>

<div>

Retrieves a single AlertMessage entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAlertMessageQueries</code> | No | Queries to be sent with the request |

**Returns:** `AlertMessage_1&#124;error`

**Sample code:**

```ballerina
AlertMessage_1 result = check client->getAlertMessage(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "wfRequestNav": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateAlertMessage</summary>

<div>

Updates the AlertMessage identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedAlertMessage</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAlertMessage(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteAlertMessage</summary>

<div>

Deletes the AlertMessage identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteAlertMessageHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAlertMessage(externalCode);
```

</div>
</details>

#### WfRequestComments

<details>
<summary>listWfRequestCommentss</summary>

<div>

Queries the WfRequestComments collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWfRequestCommentssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listWfRequestCommentss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestCommentId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getWfRequestComments</summary>

<div>

Retrieves a single WfRequestComments entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wfRequestCommentId` | <code>int</code> | Yes | key: wfRequestCommentId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWfRequestCommentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `WfRequestComments_1&#124;error`

**Sample code:**

```ballerina
WfRequestComments_1 result = check client->getWfRequestComments(wfRequestCommentId);
```

**Sample response:**

```json
{
  "d": {
    "wfRequestCommentId": "1000"
  }
}
```

</div>
</details>

#### WfRequestStep

<details>
<summary>listWfRequestSteps</summary>

<div>

Queries the WfRequestStep collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWfRequestStepsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listWfRequestSteps();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestStepId": "1000",
        "wfRequestNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getWfRequestStep</summary>

<div>

Retrieves a single WfRequestStep entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wfRequestStepId` | <code>int</code> | Yes | key: wfRequestStepId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWfRequestStepQueries</code> | No | Queries to be sent with the request |

**Returns:** `WfRequestStep_1&#124;error`

**Sample code:**

```ballerina
WfRequestStep_1 result = check client->getWfRequestStep(wfRequestStepId);
```

**Sample response:**

```json
{
  "d": {
    "wfRequestStepId": "1000",
    "wfRequestNav": {
      "wfRequestId": "1000",
      "empWfRequestNav": {},
      "parentWfRequestNav": {},
      "wfRequestCommentsNav": {},
      "wfRequestParticipatorNav": {},
      "wfRequestStepNav": {},
      "workflowAllowedActionListNav": {}
    }
  }
}
```

</div>
</details>

#### AutoDelegateDetail

<details>
<summary>listAutoDelegateDetails</summary>

<div>

Queries the AutoDelegateDetail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAutoDelegateDetailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listAutoDelegateDetails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "AutoDelegateConfig_delegator": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createAutoDelegateDetail</summary>

<div>

Creates a new AutoDelegateDetail entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AutoDelegateDetail</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedAutoDelegateDetail&#124;error`

**Sample code:**

```ballerina
CreatedAutoDelegateDetail result = check client->createAutoDelegateDetail(payload);
```

**Sample response:**

```json
{
  "d": {
    "AutoDelegateConfig_delegator": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getAutoDelegateDetail</summary>

<div>

Retrieves a single AutoDelegateDetail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `AutoDelegateConfig_delegator` | <code>string</code> | Yes | key: AutoDelegateConfig_delegator |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAutoDelegateDetailQueries</code> | No | Queries to be sent with the request |

**Returns:** `AutoDelegateDetail_1&#124;error`

**Sample code:**

```ballerina
AutoDelegateDetail_1 result = check client->getAutoDelegateDetail(AutoDelegateConfig_delegator, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "AutoDelegateConfig_delegator": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateAutoDelegateDetail</summary>

<div>

Updates the AutoDelegateDetail identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `AutoDelegateConfig_delegator` | <code>string</code> | Yes | key: AutoDelegateConfig_delegator |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedAutoDelegateDetail</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAutoDelegateDetail(AutoDelegateConfig_delegator, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteAutoDelegateDetail</summary>

<div>

Deletes the AutoDelegateDetail identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `AutoDelegateConfig_delegator` | <code>string</code> | Yes | key: AutoDelegateConfig_delegator |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteAutoDelegateDetailHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAutoDelegateDetail(AutoDelegateConfig_delegator, externalCode);
```

</div>
</details>

#### AutoDelegateConfig

<details>
<summary>listAutoDelegateConfigs</summary>

<div>

Queries the AutoDelegateConfig collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAutoDelegateConfigsQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listAutoDelegateConfigs();
```

</div>
</details>

<details>
<summary>getAutoDelegateConfig</summary>

<div>

Retrieves a single AutoDelegateConfig entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `delegator` | <code>string</code> | Yes | key: delegator |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAutoDelegateConfigQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getAutoDelegateConfig(delegator);
```

</div>
</details>

<details>
<summary>deleteAutoDelegateConfig</summary>

<div>

Deletes the AutoDelegateConfig identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `delegator` | <code>string</code> | Yes | key: delegator |
| `headers` | <code>DeleteAutoDelegateConfigHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAutoDelegateConfig(delegator);
```

</div>
</details>

#### EmpWfRequest

<details>
<summary>listEmpWfRequests</summary>

<div>

Queries the EmpWfRequest collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpWfRequestsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listEmpWfRequests();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "empWfRequestId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpWfRequest</summary>

<div>

Retrieves a single EmpWfRequest entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `empWfRequestId` | <code>int</code> | Yes | key: empWfRequestId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpWfRequest_1&#124;error`

**Sample code:**

```ballerina
EmpWfRequest_1 result = check client->getEmpWfRequest(empWfRequestId);
```

**Sample response:**

```json
{
  "d": {
    "empWfRequestId": "1000"
  }
}
```

</div>
</details>

#### WfRequest

<details>
<summary>listWfRequests</summary>

<div>

Queries the WfRequest collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWfRequestsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listWfRequests();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestId": "1000",
        "empWfRequestNav": {},
        "parentWfRequestNav": {},
        "wfRequestCommentsNav": {},
        "wfRequestParticipatorNav": {},
        "wfRequestStepNav": {},
        "workflowAllowedActionListNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getWfRequest</summary>

<div>

Retrieves a single WfRequest entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wfRequestId` | <code>int</code> | Yes | key: wfRequestId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `WfRequest_1&#124;error`

**Sample code:**

```ballerina
WfRequest_1 result = check client->getWfRequest(wfRequestId);
```

**Sample response:**

```json
{
  "d": {
    "wfRequestId": "1000",
    "empWfRequestNav": {
      "empWfRequestId": "1000"
    },
    "parentWfRequestNav": {},
    "wfRequestCommentsNav": {
      "results": []
    },
    "wfRequestParticipatorNav": {
      "results": []
    },
    "wfRequestStepNav": {
      "results": []
    },
    "workflowAllowedActionListNav": {
      "results": []
    }
  }
}
```

</div>
</details>

#### approveWfRequest

<details>
<summary>createapproveWfRequest</summary>

<div>

Creates a new approveWfRequest entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>CreateapproveWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->createapproveWfRequest();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {}
    ]
  }
}
```

</div>
</details>

#### commentWfRequest

<details>
<summary>createcommentWfRequest</summary>

<div>

Creates a new commentWfRequest entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>CreatecommentWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->createcommentWfRequest();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {}
    ]
  }
}
```

</div>
</details>

#### rejectWfRequest

<details>
<summary>createrejectWfRequest</summary>

<div>

Creates a new rejectWfRequest entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>CreaterejectWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->createrejectWfRequest();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {}
    ]
  }
}
```

</div>
</details>

#### sendbackWfRequest

<details>
<summary>createsendbackWfRequest</summary>

<div>

Creates a new sendbackWfRequest entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>CreatesendbackWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->createsendbackWfRequest();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {}
    ]
  }
}
```

</div>
</details>

#### getWorkflowPendingData

<details>
<summary>creategetWorkflowPendingData</summary>

<div>

Creates a new getWorkflowPendingData entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>CreategetWorkflowPendingDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result_1&#124;error`

**Sample code:**

```ballerina
Result_1 result = check client->creategetWorkflowPendingData();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "wfRequestId": 0,
        "workflowAttributeGroups": []
      }
    ]
  }
}
```

</div>
</details>

#### withdrawWfRequest

<details>
<summary>createwithdrawWfRequest</summary>

<div>

Creates a new withdrawWfRequest entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>CreatewithdrawWfRequestQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->createwithdrawWfRequest();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {}
    ]
  }
}
```

</div>
</details>

