---
connector: true
connector_name: "sap.successfactors.ecskillsmanagement"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecskillsmanagement` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecskillsmanagement objects — CertificationContent, FamilyEntity, CertificationEntity, JobResponsibilityContent, InterviewQuestionContent, JobResponsibilityEntity, RatedSkillMapping, RoleCompetencyBehaviorMappingEntity… — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to manage the information about employees skills.

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
import ballerinax/sap.successfactors.ecskillsmanagement;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecskillsmanagement:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### CertificationContent

<details>
<summary>listCertificationContents</summary>

<div>

Queries the CertificationContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCertificationContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listCertificationContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCertificationContent</summary>

<div>

Creates a new CertificationContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CertificationContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCertificationContent&#124;error`

**Sample code:**

```ballerina
CreatedCertificationContent result = check client->createCertificationContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getCertificationContent</summary>

<div>

Retrieves a single CertificationContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCertificationContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `CertificationContent_1&#124;error`

**Sample code:**

```ballerina
CertificationContent_1 result = check client->getCertificationContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateCertificationContent</summary>

<div>

Updates the CertificationContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCertificationContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCertificationContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteCertificationContent</summary>

<div>

Deletes the CertificationContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCertificationContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCertificationContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### FamilyEntity

<details>
<summary>listFamilyEntities</summary>

<div>

Queries the FamilyEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFamilyEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listFamilyEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "competencies": {},
        "skills": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createFamilyEntity</summary>

<div>

Creates a new FamilyEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FamilyEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedFamilyEntity&#124;error`

**Sample code:**

```ballerina
CreatedFamilyEntity result = check client->createFamilyEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "competencies": {
      "results": []
    },
    "skills": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getFamilyEntity</summary>

<div>

Retrieves a single FamilyEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFamilyEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `FamilyEntity_1&#124;error`

**Sample code:**

```ballerina
FamilyEntity_1 result = check client->getFamilyEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "competencies": {
      "results": []
    },
    "skills": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateFamilyEntity</summary>

<div>

Updates the FamilyEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedFamilyEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFamilyEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteFamilyEntity</summary>

<div>

Deletes the FamilyEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteFamilyEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFamilyEntity(externalCode);
```

</div>
</details>

#### CertificationEntity

<details>
<summary>listCertificationEntities</summary>

<div>

Queries the CertificationEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCertificationEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listCertificationEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCertificationEntity</summary>

<div>

Creates a new CertificationEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CertificationEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCertificationEntity&#124;error`

**Sample code:**

```ballerina
CreatedCertificationEntity result = check client->createCertificationEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getCertificationEntity</summary>

<div>

Retrieves a single CertificationEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCertificationEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `CertificationEntity_1&#124;error`

**Sample code:**

```ballerina
CertificationEntity_1 result = check client->getCertificationEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateCertificationEntity</summary>

<div>

Updates the CertificationEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCertificationEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCertificationEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteCertificationEntity</summary>

<div>

Deletes the CertificationEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCertificationEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCertificationEntity(externalCode);
```

</div>
</details>

#### JobResponsibilityContent

<details>
<summary>listJobResponsibilityContents</summary>

<div>

Queries the JobResponsibilityContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobResponsibilityContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listJobResponsibilityContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobResponsibilityContent</summary>

<div>

Creates a new JobResponsibilityContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobResponsibilityContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobResponsibilityContent&#124;error`

**Sample code:**

```ballerina
CreatedJobResponsibilityContent result = check client->createJobResponsibilityContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getJobResponsibilityContent</summary>

<div>

Retrieves a single JobResponsibilityContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobResponsibilityContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobResponsibilityContent_1&#124;error`

**Sample code:**

```ballerina
JobResponsibilityContent_1 result = check client->getJobResponsibilityContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateJobResponsibilityContent</summary>

<div>

Updates the JobResponsibilityContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobResponsibilityContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobResponsibilityContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobResponsibilityContent</summary>

<div>

Deletes the JobResponsibilityContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobResponsibilityContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobResponsibilityContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### InterviewQuestionContent

<details>
<summary>listInterviewQuestionContents</summary>

<div>

Queries the InterviewQuestionContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInterviewQuestionContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listInterviewQuestionContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createInterviewQuestionContent</summary>

<div>

Creates a new InterviewQuestionContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InterviewQuestionContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedInterviewQuestionContent&#124;error`

**Sample code:**

```ballerina
CreatedInterviewQuestionContent result = check client->createInterviewQuestionContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getInterviewQuestionContent</summary>

<div>

Retrieves a single InterviewQuestionContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInterviewQuestionContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `InterviewQuestionContent_1&#124;error`

**Sample code:**

```ballerina
InterviewQuestionContent_1 result = check client->getInterviewQuestionContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateInterviewQuestionContent</summary>

<div>

Updates the InterviewQuestionContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedInterviewQuestionContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInterviewQuestionContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteInterviewQuestionContent</summary>

<div>

Deletes the InterviewQuestionContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteInterviewQuestionContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInterviewQuestionContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### JobResponsibilityEntity

<details>
<summary>listJobResponsibilityEntities</summary>

<div>

Queries the JobResponsibilityEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobResponsibilityEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listJobResponsibilityEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobResponsibilityEntity</summary>

<div>

Creates a new JobResponsibilityEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobResponsibilityEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobResponsibilityEntity&#124;error`

**Sample code:**

```ballerina
CreatedJobResponsibilityEntity result = check client->createJobResponsibilityEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobResponsibilityEntity</summary>

<div>

Retrieves a single JobResponsibilityEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobResponsibilityEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobResponsibilityEntity_1&#124;error`

**Sample code:**

```ballerina
JobResponsibilityEntity_1 result = check client->getJobResponsibilityEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateJobResponsibilityEntity</summary>

<div>

Updates the JobResponsibilityEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobResponsibilityEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobResponsibilityEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobResponsibilityEntity</summary>

<div>

Deletes the JobResponsibilityEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobResponsibilityEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobResponsibilityEntity(externalCode);
```

</div>
</details>

#### RatedSkillMapping

<details>
<summary>listRatedSkillMappings</summary>

<div>

Queries the RatedSkillMapping collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRatedSkillMappingsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listRatedSkillMappings();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "SkillProfile_externalCode": "1000",
        "externalCode": "1000",
        "skillNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRatedSkillMapping</summary>

<div>

Creates a new RatedSkillMapping entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RatedSkillMapping</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRatedSkillMapping&#124;error`

**Sample code:**

```ballerina
CreatedRatedSkillMapping result = check client->createRatedSkillMapping(payload);
```

**Sample response:**

```json
{
  "d": {
    "SkillProfile_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getRatedSkillMapping</summary>

<div>

Retrieves a single RatedSkillMapping entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SkillProfile_externalCode` | <code>string</code> | Yes | key: SkillProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRatedSkillMappingQueries</code> | No | Queries to be sent with the request |

**Returns:** `RatedSkillMapping_1&#124;error`

**Sample code:**

```ballerina
RatedSkillMapping_1 result = check client->getRatedSkillMapping(SkillProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "SkillProfile_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateRatedSkillMapping</summary>

<div>

Updates the RatedSkillMapping identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SkillProfile_externalCode` | <code>string</code> | Yes | key: SkillProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRatedSkillMapping</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRatedSkillMapping(SkillProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRatedSkillMapping</summary>

<div>

Deletes the RatedSkillMapping identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SkillProfile_externalCode` | <code>string</code> | Yes | key: SkillProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRatedSkillMappingHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRatedSkillMapping(SkillProfile_externalCode, externalCode);
```

</div>
</details>

#### RoleCompetencyBehaviorMappingEntity

<details>
<summary>listRoleCompetencyBehaviorMappingEntities</summary>

<div>

Queries the RoleCompetencyBehaviorMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRoleCompetencyBehaviorMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listRoleCompetencyBehaviorMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "RoleEntity_externalCode": "1000",
        "externalCode": "1000",
        "behaviorMappingEntityNav": {},
        "competencyNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRoleCompetencyBehaviorMappingEntity</summary>

<div>

Creates a new RoleCompetencyBehaviorMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RoleCompetencyBehaviorMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRoleCompetencyBehaviorMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedRoleCompetencyBehaviorMappingEntity result = check client->createRoleCompetencyBehaviorMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000",
    "behaviorMappingEntityNav": {
      "CompetencyEntity_externalCode": "1000",
      "externalCode": "1000"
    },
    "competencyNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getRoleCompetencyBehaviorMappingEntity</summary>

<div>

Retrieves a single RoleCompetencyBehaviorMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRoleCompetencyBehaviorMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `RoleCompetencyBehaviorMappingEntity_1&#124;error`

**Sample code:**

```ballerina
RoleCompetencyBehaviorMappingEntity_1 result = check client->getRoleCompetencyBehaviorMappingEntity(RoleEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000",
    "behaviorMappingEntityNav": {
      "CompetencyEntity_externalCode": "1000",
      "externalCode": "1000"
    },
    "competencyNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>updateRoleCompetencyBehaviorMappingEntity</summary>

<div>

Updates the RoleCompetencyBehaviorMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRoleCompetencyBehaviorMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRoleCompetencyBehaviorMappingEntity(RoleEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRoleCompetencyBehaviorMappingEntity</summary>

<div>

Deletes the RoleCompetencyBehaviorMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRoleCompetencyBehaviorMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRoleCompetencyBehaviorMappingEntity(RoleEntity_externalCode, externalCode);
```

</div>
</details>

#### RoleEntity

<details>
<summary>listRoleEntities</summary>

<div>

Queries the RoleEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRoleEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listRoleEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "familyNav": {},
        "jobCodeMappings": {},
        "roleCompetencyBehaviorMappings": {},
        "roleCompetencyMappings": {},
        "roleSkillMappings": {},
        "roleTalentPoolMappings": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRoleEntity</summary>

<div>

Creates a new RoleEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RoleEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRoleEntity&#124;error`

**Sample code:**

```ballerina
CreatedRoleEntity result = check client->createRoleEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "familyNav": {
      "externalCode": "1000",
      "competencies": {},
      "skills": {}
    },
    "jobCodeMappings": {
      "results": []
    },
    "roleCompetencyBehaviorMappings": {
      "results": []
    },
    "roleCompetencyMappings": {
      "results": []
    },
    "roleSkillMappings": {
      "results": []
    },
    "roleTalentPoolMappings": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getRoleEntity</summary>

<div>

Retrieves a single RoleEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRoleEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `RoleEntity_1&#124;error`

**Sample code:**

```ballerina
RoleEntity_1 result = check client->getRoleEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "familyNav": {
      "externalCode": "1000",
      "competencies": {},
      "skills": {}
    },
    "jobCodeMappings": {
      "results": []
    },
    "roleCompetencyBehaviorMappings": {
      "results": []
    },
    "roleCompetencyMappings": {
      "results": []
    },
    "roleSkillMappings": {
      "results": []
    },
    "roleTalentPoolMappings": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateRoleEntity</summary>

<div>

Updates the RoleEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRoleEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRoleEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRoleEntity</summary>

<div>

Deletes the RoleEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRoleEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRoleEntity(externalCode);
```

</div>
</details>

#### JobProfileLocalizedData

<details>
<summary>listJobProfileLocalizedData</summary>

<div>

Queries the JobProfileLocalizedData collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobProfileLocalizedDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listJobProfileLocalizedData();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobProfileLocalizedData</summary>

<div>

Creates a new JobProfileLocalizedData entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobProfileLocalizedData</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobProfileLocalizedData&#124;error`

**Sample code:**

```ballerina
CreatedJobProfileLocalizedData result = check client->createJobProfileLocalizedData(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobProfileLocalizedData</summary>

<div>

Retrieves a single JobProfileLocalizedData entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobProfileLocalizedDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobProfileLocalizedData_1&#124;error`

**Sample code:**

```ballerina
JobProfileLocalizedData_1 result = check client->getJobProfileLocalizedData(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateJobProfileLocalizedData</summary>

<div>

Updates the JobProfileLocalizedData identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobProfileLocalizedData</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobProfileLocalizedData(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobProfileLocalizedData</summary>

<div>

Deletes the JobProfileLocalizedData identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobProfileLocalizedDataHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobProfileLocalizedData(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### JobCodeMappingEntity

<details>
<summary>listJobCodeMappingEntities</summary>

<div>

Queries the JobCodeMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobCodeMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listJobCodeMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "RoleEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobCodeMappingEntity</summary>

<div>

Creates a new JobCodeMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobCodeMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobCodeMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedJobCodeMappingEntity result = check client->createJobCodeMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobCodeMappingEntity</summary>

<div>

Retrieves a single JobCodeMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobCodeMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobCodeMappingEntity_1&#124;error`

**Sample code:**

```ballerina
JobCodeMappingEntity_1 result = check client->getJobCodeMappingEntity(RoleEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateJobCodeMappingEntity</summary>

<div>

Updates the JobCodeMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobCodeMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobCodeMappingEntity(RoleEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobCodeMappingEntity</summary>

<div>

Deletes the JobCodeMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobCodeMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobCodeMappingEntity(RoleEntity_externalCode, externalCode);
```

</div>
</details>

#### CompetencyType

<details>
<summary>listCompetencyTypes</summary>

<div>

Queries the CompetencyType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCompetencyTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listCompetencyTypes();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "GUID": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCompetencyType</summary>

<div>

Creates a new CompetencyType entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Competency</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCompetencyType&#124;error`

**Sample code:**

```ballerina
CreatedCompetencyType result = check client->createCompetencyType(payload);
```

**Sample response:**

```json
{
  "d": {
    "GUID": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getCompetencyType</summary>

<div>

Retrieves a single CompetencyType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `GUID` | <code>int</code> | Yes | key: GUID |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCompetencyTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `CompetencyType&#124;error`

**Sample code:**

```ballerina
CompetencyType result = check client->getCompetencyType(GUID);
```

**Sample response:**

```json
{
  "d": {
    "GUID": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateCompetencyType</summary>

<div>

Updates the CompetencyType identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `GUID` | <code>int</code> | Yes | key: GUID |
| `payload` | <code>ModifiedCompetencyType</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCompetencyType(GUID, payload);
```

</div>
</details>

<details>
<summary>deleteCompetencyType</summary>

<div>

Deletes the CompetencyType identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `GUID` | <code>int</code> | Yes | key: GUID |
| `headers` | <code>DeleteCompetencyTypeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCompetencyType(GUID);
```

</div>
</details>

#### EmploymentConditionContent

<details>
<summary>listEmploymentConditionContents</summary>

<div>

Queries the EmploymentConditionContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmploymentConditionContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listEmploymentConditionContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmploymentConditionContent</summary>

<div>

Creates a new EmploymentConditionContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmploymentConditionContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmploymentConditionContent&#124;error`

**Sample code:**

```ballerina
CreatedEmploymentConditionContent result = check client->createEmploymentConditionContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getEmploymentConditionContent</summary>

<div>

Retrieves a single EmploymentConditionContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmploymentConditionContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmploymentConditionContent_1&#124;error`

**Sample code:**

```ballerina
EmploymentConditionContent_1 result = check client->getEmploymentConditionContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateEmploymentConditionContent</summary>

<div>

Updates the EmploymentConditionContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmploymentConditionContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmploymentConditionContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteEmploymentConditionContent</summary>

<div>

Deletes the EmploymentConditionContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmploymentConditionContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmploymentConditionContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### FamilyCompetencyMappingEntity

<details>
<summary>listFamilyCompetencyMappingEntities</summary>

<div>

Queries the FamilyCompetencyMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFamilyCompetencyMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listFamilyCompetencyMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "FamilyEntity_externalCode": "1000",
        "externalCode": "1000",
        "competencyNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createFamilyCompetencyMappingEntity</summary>

<div>

Creates a new FamilyCompetencyMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FamilyCompetencyMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedFamilyCompetencyMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedFamilyCompetencyMappingEntity result = check client->createFamilyCompetencyMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "FamilyEntity_externalCode": "1000",
    "externalCode": "1000",
    "competencyNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getFamilyCompetencyMappingEntity</summary>

<div>

Retrieves a single FamilyCompetencyMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FamilyEntity_externalCode` | <code>string</code> | Yes | key: FamilyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFamilyCompetencyMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `FamilyCompetencyMappingEntity_1&#124;error`

**Sample code:**

```ballerina
FamilyCompetencyMappingEntity_1 result = check client->getFamilyCompetencyMappingEntity(FamilyEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "FamilyEntity_externalCode": "1000",
    "externalCode": "1000",
    "competencyNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>updateFamilyCompetencyMappingEntity</summary>

<div>

Updates the FamilyCompetencyMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FamilyEntity_externalCode` | <code>string</code> | Yes | key: FamilyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedFamilyCompetencyMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFamilyCompetencyMappingEntity(FamilyEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteFamilyCompetencyMappingEntity</summary>

<div>

Deletes the FamilyCompetencyMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FamilyEntity_externalCode` | <code>string</code> | Yes | key: FamilyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteFamilyCompetencyMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFamilyCompetencyMappingEntity(FamilyEntity_externalCode, externalCode);
```

</div>
</details>

#### PhysicalReqEntity

<details>
<summary>listPhysicalReqEntities</summary>

<div>

Queries the PhysicalReqEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPhysicalReqEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listPhysicalReqEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPhysicalReqEntity</summary>

<div>

Creates a new PhysicalReqEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PhysicalReqEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPhysicalReqEntity&#124;error`

**Sample code:**

```ballerina
CreatedPhysicalReqEntity result = check client->createPhysicalReqEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPhysicalReqEntity</summary>

<div>

Retrieves a single PhysicalReqEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPhysicalReqEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `PhysicalReqEntity_1&#124;error`

**Sample code:**

```ballerina
PhysicalReqEntity_1 result = check client->getPhysicalReqEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updatePhysicalReqEntity</summary>

<div>

Updates the PhysicalReqEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPhysicalReqEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePhysicalReqEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePhysicalReqEntity</summary>

<div>

Deletes the PhysicalReqEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeletePhysicalReqEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePhysicalReqEntity(externalCode);
```

</div>
</details>

#### InterviewQuestionEntity

<details>
<summary>listInterviewQuestionEntities</summary>

<div>

Queries the InterviewQuestionEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListInterviewQuestionEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listInterviewQuestionEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createInterviewQuestionEntity</summary>

<div>

Creates a new InterviewQuestionEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>InterviewQuestionEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedInterviewQuestionEntity&#124;error`

**Sample code:**

```ballerina
CreatedInterviewQuestionEntity result = check client->createInterviewQuestionEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getInterviewQuestionEntity</summary>

<div>

Retrieves a single InterviewQuestionEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetInterviewQuestionEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `InterviewQuestionEntity_1&#124;error`

**Sample code:**

```ballerina
InterviewQuestionEntity_1 result = check client->getInterviewQuestionEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateInterviewQuestionEntity</summary>

<div>

Updates the InterviewQuestionEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedInterviewQuestionEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateInterviewQuestionEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteInterviewQuestionEntity</summary>

<div>

Deletes the InterviewQuestionEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteInterviewQuestionEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteInterviewQuestionEntity(externalCode);
```

</div>
</details>

#### JDTemplateFamilyMapping

<details>
<summary>listJDTemplateFamilyMappings</summary>

<div>

Queries the JDTemplateFamilyMapping collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJDTemplateFamilyMappingsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listJDTemplateFamilyMappings();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobDescTemplate_externalCode": "1000",
        "externalCode": "1000",
        "familyNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJDTemplateFamilyMapping</summary>

<div>

Creates a new JDTemplateFamilyMapping entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JDTemplateFamilyMapping</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJDTemplateFamilyMapping&#124;error`

**Sample code:**

```ballerina
CreatedJDTemplateFamilyMapping result = check client->createJDTemplateFamilyMapping(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobDescTemplate_externalCode": "1000",
    "externalCode": "1000",
    "familyNav": {
      "externalCode": "1000",
      "competencies": {},
      "skills": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getJDTemplateFamilyMapping</summary>

<div>

Retrieves a single JDTemplateFamilyMapping entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobDescTemplate_externalCode` | <code>string</code> | Yes | key: JobDescTemplate_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJDTemplateFamilyMappingQueries</code> | No | Queries to be sent with the request |

**Returns:** `JDTemplateFamilyMapping_1&#124;error`

**Sample code:**

```ballerina
JDTemplateFamilyMapping_1 result = check client->getJDTemplateFamilyMapping(JobDescTemplate_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobDescTemplate_externalCode": "1000",
    "externalCode": "1000",
    "familyNav": {
      "externalCode": "1000",
      "competencies": {},
      "skills": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>updateJDTemplateFamilyMapping</summary>

<div>

Updates the JDTemplateFamilyMapping identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobDescTemplate_externalCode` | <code>string</code> | Yes | key: JobDescTemplate_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJDTemplateFamilyMapping</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJDTemplateFamilyMapping(JobDescTemplate_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJDTemplateFamilyMapping</summary>

<div>

Deletes the JDTemplateFamilyMapping identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobDescTemplate_externalCode` | <code>string</code> | Yes | key: JobDescTemplate_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJDTemplateFamilyMappingHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJDTemplateFamilyMapping(JobDescTemplate_externalCode, externalCode);
```

</div>
</details>

#### BehaviorMappingEntity

<details>
<summary>listBehaviorMappingEntities</summary>

<div>

Queries the BehaviorMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBehaviorMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listBehaviorMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "CompetencyEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBehaviorMappingEntity</summary>

<div>

Creates a new BehaviorMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BehaviorMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBehaviorMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedBehaviorMappingEntity result = check client->createBehaviorMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "CompetencyEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBehaviorMappingEntity</summary>

<div>

Retrieves a single BehaviorMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `CompetencyEntity_externalCode` | <code>string</code> | Yes | key: CompetencyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBehaviorMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `BehaviorMappingEntity_1&#124;error`

**Sample code:**

```ballerina
BehaviorMappingEntity_1 result = check client->getBehaviorMappingEntity(CompetencyEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "CompetencyEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBehaviorMappingEntity</summary>

<div>

Updates the BehaviorMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `CompetencyEntity_externalCode` | <code>string</code> | Yes | key: CompetencyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedBehaviorMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBehaviorMappingEntity(CompetencyEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteBehaviorMappingEntity</summary>

<div>

Deletes the BehaviorMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `CompetencyEntity_externalCode` | <code>string</code> | Yes | key: CompetencyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteBehaviorMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBehaviorMappingEntity(CompetencyEntity_externalCode, externalCode);
```

</div>
</details>

#### SkillEntity

<details>
<summary>listSkillEntities</summary>

<div>

Queries the SkillEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSkillEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listSkillEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createSkillEntity</summary>

<div>

Creates a new SkillEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SkillEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedSkillEntity&#124;error`

**Sample code:**

```ballerina
CreatedSkillEntity result = check client->createSkillEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getSkillEntity</summary>

<div>

Retrieves a single SkillEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSkillEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `SkillEntity_1&#124;error`

**Sample code:**

```ballerina
SkillEntity_1 result = check client->getSkillEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateSkillEntity</summary>

<div>

Updates the SkillEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedSkillEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSkillEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteSkillEntity</summary>

<div>

Deletes the SkillEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteSkillEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSkillEntity(externalCode);
```

</div>
</details>

#### PhysicalReqContent

<details>
<summary>listPhysicalReqContents</summary>

<div>

Queries the PhysicalReqContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPhysicalReqContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listPhysicalReqContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPhysicalReqContent</summary>

<div>

Creates a new PhysicalReqContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PhysicalReqContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPhysicalReqContent&#124;error`

**Sample code:**

```ballerina
CreatedPhysicalReqContent result = check client->createPhysicalReqContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getPhysicalReqContent</summary>

<div>

Retrieves a single PhysicalReqContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPhysicalReqContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `PhysicalReqContent_1&#124;error`

**Sample code:**

```ballerina
PhysicalReqContent_1 result = check client->getPhysicalReqContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updatePhysicalReqContent</summary>

<div>

Updates the PhysicalReqContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPhysicalReqContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePhysicalReqContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePhysicalReqContent</summary>

<div>

Deletes the PhysicalReqContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeletePhysicalReqContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePhysicalReqContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### SkillContent

<details>
<summary>listSkillContents</summary>

<div>

Queries the SkillContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSkillContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_20&#124;error`

**Sample code:**

```ballerina
Wrapper_20 result = check client->listSkillContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {},
        "roleNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createSkillContent</summary>

<div>

Creates a new SkillContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SkillContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedSkillContent&#124;error`

**Sample code:**

```ballerina
CreatedSkillContent result = check client->createSkillContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    },
    "roleNav": {
      "externalCode": "1000",
      "familyNav": {},
      "jobCodeMappings": {},
      "roleCompetencyBehaviorMappings": {},
      "roleCompetencyMappings": {},
      "roleSkillMappings": {},
      "roleTalentPoolMappings": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getSkillContent</summary>

<div>

Retrieves a single SkillContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSkillContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `SkillContent_1&#124;error`

**Sample code:**

```ballerina
SkillContent_1 result = check client->getSkillContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    },
    "roleNav": {
      "externalCode": "1000",
      "familyNav": {},
      "jobCodeMappings": {},
      "roleCompetencyBehaviorMappings": {},
      "roleCompetencyMappings": {},
      "roleSkillMappings": {},
      "roleTalentPoolMappings": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>updateSkillContent</summary>

<div>

Updates the SkillContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedSkillContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSkillContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteSkillContent</summary>

<div>

Deletes the SkillContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteSkillContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSkillContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### RoleCompetencyMappingEntity

<details>
<summary>listRoleCompetencyMappingEntities</summary>

<div>

Queries the RoleCompetencyMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRoleCompetencyMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_21&#124;error`

**Sample code:**

```ballerina
Wrapper_21 result = check client->listRoleCompetencyMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "RoleEntity_externalCode": "1000",
        "externalCode": "1000",
        "competencyNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRoleCompetencyMappingEntity</summary>

<div>

Creates a new RoleCompetencyMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RoleCompetencyMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRoleCompetencyMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedRoleCompetencyMappingEntity result = check client->createRoleCompetencyMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000",
    "competencyNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getRoleCompetencyMappingEntity</summary>

<div>

Retrieves a single RoleCompetencyMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRoleCompetencyMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `RoleCompetencyMappingEntity_1&#124;error`

**Sample code:**

```ballerina
RoleCompetencyMappingEntity_1 result = check client->getRoleCompetencyMappingEntity(RoleEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000",
    "competencyNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>updateRoleCompetencyMappingEntity</summary>

<div>

Updates the RoleCompetencyMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRoleCompetencyMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRoleCompetencyMappingEntity(RoleEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRoleCompetencyMappingEntity</summary>

<div>

Deletes the RoleCompetencyMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRoleCompetencyMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRoleCompetencyMappingEntity(RoleEntity_externalCode, externalCode);
```

</div>
</details>

#### SelfReportSkillMapping

<details>
<summary>listSelfReportSkillMappings</summary>

<div>

Queries the SelfReportSkillMapping collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSelfReportSkillMappingsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listSelfReportSkillMappings();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "SkillProfile_externalCode": "1000",
        "externalCode": "1000",
        "skillNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createSelfReportSkillMapping</summary>

<div>

Creates a new SelfReportSkillMapping entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfReportSkillMapping</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedSelfReportSkillMapping&#124;error`

**Sample code:**

```ballerina
CreatedSelfReportSkillMapping result = check client->createSelfReportSkillMapping(payload);
```

**Sample response:**

```json
{
  "d": {
    "SkillProfile_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getSelfReportSkillMapping</summary>

<div>

Retrieves a single SelfReportSkillMapping entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SkillProfile_externalCode` | <code>string</code> | Yes | key: SkillProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSelfReportSkillMappingQueries</code> | No | Queries to be sent with the request |

**Returns:** `SelfReportSkillMapping_1&#124;error`

**Sample code:**

```ballerina
SelfReportSkillMapping_1 result = check client->getSelfReportSkillMapping(SkillProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "SkillProfile_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateSelfReportSkillMapping</summary>

<div>

Updates the SelfReportSkillMapping identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SkillProfile_externalCode` | <code>string</code> | Yes | key: SkillProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedSelfReportSkillMapping</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSelfReportSkillMapping(SkillProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteSelfReportSkillMapping</summary>

<div>

Deletes the SelfReportSkillMapping identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `SkillProfile_externalCode` | <code>string</code> | Yes | key: SkillProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteSelfReportSkillMappingHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSelfReportSkillMapping(SkillProfile_externalCode, externalCode);
```

</div>
</details>

#### JobProfile

<details>
<summary>listJobProfiles</summary>

<div>

Queries the JobProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->listJobProfiles();
```

</div>
</details>

<details>
<summary>getJobProfile</summary>

<div>

Retrieves a single JobProfile entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `json&#124;error`

**Sample code:**

```ballerina
json result = check client->getJobProfile(externalCode);
```

</div>
</details>

<details>
<summary>deleteJobProfile</summary>

<div>

Deletes the JobProfile identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobProfileHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobProfile(externalCode);
```

</div>
</details>

#### FamilySkillMappingEntity

<details>
<summary>listFamilySkillMappingEntities</summary>

<div>

Queries the FamilySkillMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFamilySkillMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_24&#124;error`

**Sample code:**

```ballerina
Wrapper_24 result = check client->listFamilySkillMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "FamilyEntity_externalCode": "1000",
        "externalCode": "1000",
        "skillNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createFamilySkillMappingEntity</summary>

<div>

Creates a new FamilySkillMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FamilySkillMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedFamilySkillMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedFamilySkillMappingEntity result = check client->createFamilySkillMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "FamilyEntity_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getFamilySkillMappingEntity</summary>

<div>

Retrieves a single FamilySkillMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FamilyEntity_externalCode` | <code>string</code> | Yes | key: FamilyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFamilySkillMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `FamilySkillMappingEntity_1&#124;error`

**Sample code:**

```ballerina
FamilySkillMappingEntity_1 result = check client->getFamilySkillMappingEntity(FamilyEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "FamilyEntity_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateFamilySkillMappingEntity</summary>

<div>

Updates the FamilySkillMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FamilyEntity_externalCode` | <code>string</code> | Yes | key: FamilyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedFamilySkillMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFamilySkillMappingEntity(FamilyEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteFamilySkillMappingEntity</summary>

<div>

Deletes the FamilySkillMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `FamilyEntity_externalCode` | <code>string</code> | Yes | key: FamilyEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteFamilySkillMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFamilySkillMappingEntity(FamilyEntity_externalCode, externalCode);
```

</div>
</details>

#### RoleSkillMappingEntity

<details>
<summary>listRoleSkillMappingEntities</summary>

<div>

Queries the RoleSkillMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRoleSkillMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listRoleSkillMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "RoleEntity_externalCode": "1000",
        "externalCode": "1000",
        "skillNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRoleSkillMappingEntity</summary>

<div>

Creates a new RoleSkillMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RoleSkillMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRoleSkillMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedRoleSkillMappingEntity result = check client->createRoleSkillMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getRoleSkillMappingEntity</summary>

<div>

Retrieves a single RoleSkillMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRoleSkillMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `RoleSkillMappingEntity_1&#124;error`

**Sample code:**

```ballerina
RoleSkillMappingEntity_1 result = check client->getRoleSkillMappingEntity(RoleEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000",
    "skillNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateRoleSkillMappingEntity</summary>

<div>

Updates the RoleSkillMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRoleSkillMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRoleSkillMappingEntity(RoleEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRoleSkillMappingEntity</summary>

<div>

Deletes the RoleSkillMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRoleSkillMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRoleSkillMappingEntity(RoleEntity_externalCode, externalCode);
```

</div>
</details>

#### JobDescTemplate

<details>
<summary>listJobDescTemplates</summary>

<div>

Queries the JobDescTemplate collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobDescTemplatesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listJobDescTemplates();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "jdFamilyMappings": {},
        "sections": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobDescTemplate</summary>

<div>

Creates a new JobDescTemplate entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobDescTemplate</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobDescTemplate&#124;error`

**Sample code:**

```ballerina
CreatedJobDescTemplate result = check client->createJobDescTemplate(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "jdFamilyMappings": {
      "results": []
    },
    "sections": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getJobDescTemplate</summary>

<div>

Retrieves a single JobDescTemplate entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobDescTemplateQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobDescTemplate_1&#124;error`

**Sample code:**

```ballerina
JobDescTemplate_1 result = check client->getJobDescTemplate(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "jdFamilyMappings": {
      "results": []
    },
    "sections": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateJobDescTemplate</summary>

<div>

Updates the JobDescTemplate identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobDescTemplate</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobDescTemplate(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobDescTemplate</summary>

<div>

Deletes the JobDescTemplate identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobDescTemplateHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobDescTemplate(externalCode);
```

</div>
</details>

#### SkillProfile

<details>
<summary>listSkillProfiles</summary>

<div>

Queries the SkillProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSkillProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_27&#124;error`

**Sample code:**

```ballerina
Wrapper_27 result = check client->listSkillProfiles();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "ratedSkills": {},
        "selfReportSkills": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createSkillProfile</summary>

<div>

Creates a new SkillProfile entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SkillProfile</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedSkillProfile&#124;error`

**Sample code:**

```ballerina
CreatedSkillProfile result = check client->createSkillProfile(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "ratedSkills": {
      "results": []
    },
    "selfReportSkills": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getSkillProfile</summary>

<div>

Retrieves a single SkillProfile entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSkillProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `SkillProfile_1&#124;error`

**Sample code:**

```ballerina
SkillProfile_1 result = check client->getSkillProfile(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "ratedSkills": {
      "results": []
    },
    "selfReportSkills": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateSkillProfile</summary>

<div>

Updates the SkillProfile identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedSkillProfile</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSkillProfile(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteSkillProfile</summary>

<div>

Deletes the SkillProfile identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteSkillProfileHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSkillProfile(externalCode);
```

</div>
</details>

#### CompetencyEntity

<details>
<summary>listCompetencyEntities</summary>

<div>

Queries the CompetencyEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCompetencyEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_28&#124;error`

**Sample code:**

```ballerina
Wrapper_28 result = check client->listCompetencyEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "behaviors": {},
        "competencies": {},
        "competencyTypes": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCompetencyEntity</summary>

<div>

Creates a new CompetencyEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CompetencyEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCompetencyEntity&#124;error`

**Sample code:**

```ballerina
CreatedCompetencyEntity result = check client->createCompetencyEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "behaviors": {
      "results": []
    },
    "competencies": {
      "results": []
    },
    "competencyTypes": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getCompetencyEntity</summary>

<div>

Retrieves a single CompetencyEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCompetencyEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `CompetencyEntity_1&#124;error`

**Sample code:**

```ballerina
CompetencyEntity_1 result = check client->getCompetencyEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "behaviors": {
      "results": []
    },
    "competencies": {
      "results": []
    },
    "competencyTypes": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updateCompetencyEntity</summary>

<div>

Updates the CompetencyEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCompetencyEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCompetencyEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteCompetencyEntity</summary>

<div>

Deletes the CompetencyEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCompetencyEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCompetencyEntity(externalCode);
```

</div>
</details>

#### CompetencyContent

<details>
<summary>listCompetencyContents</summary>

<div>

Queries the CompetencyContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCompetencyContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_29&#124;error`

**Sample code:**

```ballerina
Wrapper_29 result = check client->listCompetencyContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {},
        "roleNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCompetencyContent</summary>

<div>

Creates a new CompetencyContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CompetencyContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCompetencyContent&#124;error`

**Sample code:**

```ballerina
CreatedCompetencyContent result = check client->createCompetencyContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    },
    "roleNav": {
      "externalCode": "1000",
      "familyNav": {},
      "jobCodeMappings": {},
      "roleCompetencyBehaviorMappings": {},
      "roleCompetencyMappings": {},
      "roleSkillMappings": {},
      "roleTalentPoolMappings": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>getCompetencyContent</summary>

<div>

Retrieves a single CompetencyContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCompetencyContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `CompetencyContent_1&#124;error`

**Sample code:**

```ballerina
CompetencyContent_1 result = check client->getCompetencyContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000",
      "behaviors": {},
      "competencies": {},
      "competencyTypes": {}
    },
    "roleNav": {
      "externalCode": "1000",
      "familyNav": {},
      "jobCodeMappings": {},
      "roleCompetencyBehaviorMappings": {},
      "roleCompetencyMappings": {},
      "roleSkillMappings": {},
      "roleTalentPoolMappings": {}
    }
  }
}
```

</div>
</details>

<details>
<summary>updateCompetencyContent</summary>

<div>

Updates the CompetencyContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCompetencyContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCompetencyContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteCompetencyContent</summary>

<div>

Deletes the CompetencyContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCompetencyContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCompetencyContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### RelevantIndustryEntity

<details>
<summary>listRelevantIndustryEntities</summary>

<div>

Queries the RelevantIndustryEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRelevantIndustryEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_30&#124;error`

**Sample code:**

```ballerina
Wrapper_30 result = check client->listRelevantIndustryEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRelevantIndustryEntity</summary>

<div>

Creates a new RelevantIndustryEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RelevantIndustryEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRelevantIndustryEntity&#124;error`

**Sample code:**

```ballerina
CreatedRelevantIndustryEntity result = check client->createRelevantIndustryEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getRelevantIndustryEntity</summary>

<div>

Retrieves a single RelevantIndustryEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRelevantIndustryEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `RelevantIndustryEntity_1&#124;error`

**Sample code:**

```ballerina
RelevantIndustryEntity_1 result = check client->getRelevantIndustryEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateRelevantIndustryEntity</summary>

<div>

Updates the RelevantIndustryEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRelevantIndustryEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRelevantIndustryEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRelevantIndustryEntity</summary>

<div>

Deletes the RelevantIndustryEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRelevantIndustryEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRelevantIndustryEntity(externalCode);
```

</div>
</details>

#### RoleTalentPoolMappingEntity

<details>
<summary>listRoleTalentPoolMappingEntities</summary>

<div>

Queries the RoleTalentPoolMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRoleTalentPoolMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_31&#124;error`

**Sample code:**

```ballerina
Wrapper_31 result = check client->listRoleTalentPoolMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "RoleEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRoleTalentPoolMappingEntity</summary>

<div>

Creates a new RoleTalentPoolMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RoleTalentPoolMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRoleTalentPoolMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedRoleTalentPoolMappingEntity result = check client->createRoleTalentPoolMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getRoleTalentPoolMappingEntity</summary>

<div>

Retrieves a single RoleTalentPoolMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRoleTalentPoolMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `RoleTalentPoolMappingEntity_1&#124;error`

**Sample code:**

```ballerina
RoleTalentPoolMappingEntity_1 result = check client->getRoleTalentPoolMappingEntity(RoleEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "RoleEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateRoleTalentPoolMappingEntity</summary>

<div>

Updates the RoleTalentPoolMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRoleTalentPoolMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRoleTalentPoolMappingEntity(RoleEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRoleTalentPoolMappingEntity</summary>

<div>

Deletes the RoleTalentPoolMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `RoleEntity_externalCode` | <code>string</code> | Yes | key: RoleEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRoleTalentPoolMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRoleTalentPoolMappingEntity(RoleEntity_externalCode, externalCode);
```

</div>
</details>

#### EmploymentConditionEntity

<details>
<summary>listEmploymentConditionEntities</summary>

<div>

Queries the EmploymentConditionEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmploymentConditionEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_32&#124;error`

**Sample code:**

```ballerina
Wrapper_32 result = check client->listEmploymentConditionEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEmploymentConditionEntity</summary>

<div>

Creates a new EmploymentConditionEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EmploymentConditionEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEmploymentConditionEntity&#124;error`

**Sample code:**

```ballerina
CreatedEmploymentConditionEntity result = check client->createEmploymentConditionEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getEmploymentConditionEntity</summary>

<div>

Retrieves a single EmploymentConditionEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmploymentConditionEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmploymentConditionEntity_1&#124;error`

**Sample code:**

```ballerina
EmploymentConditionEntity_1 result = check client->getEmploymentConditionEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateEmploymentConditionEntity</summary>

<div>

Updates the EmploymentConditionEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedEmploymentConditionEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEmploymentConditionEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteEmploymentConditionEntity</summary>

<div>

Deletes the EmploymentConditionEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteEmploymentConditionEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEmploymentConditionEntity(externalCode);
```

</div>
</details>

#### JobDescSection

<details>
<summary>listJobDescSections</summary>

<div>

Queries the JobDescSection collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJobDescSectionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_33&#124;error`

**Sample code:**

```ballerina
Wrapper_33 result = check client->listJobDescSections();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobDescTemplate_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createJobDescSection</summary>

<div>

Creates a new JobDescSection entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JobDescSection</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedJobDescSection&#124;error`

**Sample code:**

```ballerina
CreatedJobDescSection result = check client->createJobDescSection(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobDescTemplate_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getJobDescSection</summary>

<div>

Retrieves a single JobDescSection entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobDescTemplate_externalCode` | <code>string</code> | Yes | key: JobDescTemplate_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJobDescSectionQueries</code> | No | Queries to be sent with the request |

**Returns:** `JobDescSection_1&#124;error`

**Sample code:**

```ballerina
JobDescSection_1 result = check client->getJobDescSection(JobDescTemplate_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobDescTemplate_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateJobDescSection</summary>

<div>

Updates the JobDescSection identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobDescTemplate_externalCode` | <code>string</code> | Yes | key: JobDescTemplate_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedJobDescSection</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJobDescSection(JobDescTemplate_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteJobDescSection</summary>

<div>

Deletes the JobDescSection identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobDescTemplate_externalCode` | <code>string</code> | Yes | key: JobDescTemplate_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteJobDescSectionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJobDescSection(JobDescTemplate_externalCode, externalCode);
```

</div>
</details>

#### RelevantIndustryContent

<details>
<summary>listRelevantIndustryContents</summary>

<div>

Queries the RelevantIndustryContent collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRelevantIndustryContentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_34&#124;error`

**Sample code:**

```ballerina
Wrapper_34 result = check client->listRelevantIndustryContents();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "JobProfile_externalCode": "1000",
        "externalCode": "1000",
        "entityNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createRelevantIndustryContent</summary>

<div>

Creates a new RelevantIndustryContent entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RelevantIndustryContent</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedRelevantIndustryContent&#124;error`

**Sample code:**

```ballerina
CreatedRelevantIndustryContent result = check client->createRelevantIndustryContent(payload);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>getRelevantIndustryContent</summary>

<div>

Retrieves a single RelevantIndustryContent entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRelevantIndustryContentQueries</code> | No | Queries to be sent with the request |

**Returns:** `RelevantIndustryContent_1&#124;error`

**Sample code:**

```ballerina
RelevantIndustryContent_1 result = check client->getRelevantIndustryContent(JobProfile_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "JobProfile_externalCode": "1000",
    "externalCode": "1000",
    "entityNav": {
      "externalCode": "1000"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateRelevantIndustryContent</summary>

<div>

Updates the RelevantIndustryContent identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedRelevantIndustryContent</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRelevantIndustryContent(JobProfile_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteRelevantIndustryContent</summary>

<div>

Deletes the RelevantIndustryContent identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `JobProfile_externalCode` | <code>string</code> | Yes | key: JobProfile_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteRelevantIndustryContentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRelevantIndustryContent(JobProfile_externalCode, externalCode);
```

</div>
</details>

#### PositionEntity

<details>
<summary>listPositionEntities</summary>

<div>

Queries the PositionEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_35&#124;error`

**Sample code:**

```ballerina
Wrapper_35 result = check client->listPositionEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "positionCompetencyMappings": {},
        "positionSkillMappings": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPositionEntity</summary>

<div>

Creates a new PositionEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PositionEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPositionEntity&#124;error`

**Sample code:**

```ballerina
CreatedPositionEntity result = check client->createPositionEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "positionCompetencyMappings": {
      "results": []
    },
    "positionSkillMappings": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getPositionEntity</summary>

<div>

Retrieves a single PositionEntity entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPositionEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `PositionEntity_1&#124;error`

**Sample code:**

```ballerina
PositionEntity_1 result = check client->getPositionEntity(externalCode);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "positionCompetencyMappings": {
      "results": []
    },
    "positionSkillMappings": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updatePositionEntity</summary>

<div>

Updates the PositionEntity identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPositionEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePositionEntity(externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePositionEntity</summary>

<div>

Deletes the PositionEntity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeletePositionEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePositionEntity(externalCode);
```

</div>
</details>

#### PositionCompetencyMappingEntity

<details>
<summary>listPositionCompetencyMappingEntities</summary>

<div>

Queries the PositionCompetencyMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionCompetencyMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_36&#124;error`

**Sample code:**

```ballerina
Wrapper_36 result = check client->listPositionCompetencyMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PositionEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPositionCompetencyMappingEntity</summary>

<div>

Creates a new PositionCompetencyMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PositionCompetencyMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPositionCompetencyMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedPositionCompetencyMappingEntity result = check client->createPositionCompetencyMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "PositionEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPositionCompetencyMappingEntity</summary>

<div>

Retrieves a single PositionCompetencyMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PositionEntity_externalCode` | <code>string</code> | Yes | key: PositionEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPositionCompetencyMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `PositionCompetencyMappingEntity_1&#124;error`

**Sample code:**

```ballerina
PositionCompetencyMappingEntity_1 result = check client->getPositionCompetencyMappingEntity(PositionEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "PositionEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updatePositionCompetencyMappingEntity</summary>

<div>

Updates the PositionCompetencyMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PositionEntity_externalCode` | <code>string</code> | Yes | key: PositionEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPositionCompetencyMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePositionCompetencyMappingEntity(PositionEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePositionCompetencyMappingEntity</summary>

<div>

Deletes the PositionCompetencyMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PositionEntity_externalCode` | <code>string</code> | Yes | key: PositionEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeletePositionCompetencyMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePositionCompetencyMappingEntity(PositionEntity_externalCode, externalCode);
```

</div>
</details>

#### PositionSkillMappingEntity

<details>
<summary>listPositionSkillMappingEntities</summary>

<div>

Queries the PositionSkillMappingEntity collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionSkillMappingEntitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_37&#124;error`

**Sample code:**

```ballerina
Wrapper_37 result = check client->listPositionSkillMappingEntities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PositionEntity_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPositionSkillMappingEntity</summary>

<div>

Creates a new PositionSkillMappingEntity entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PositionSkillMappingEntity</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPositionSkillMappingEntity&#124;error`

**Sample code:**

```ballerina
CreatedPositionSkillMappingEntity result = check client->createPositionSkillMappingEntity(payload);
```

**Sample response:**

```json
{
  "d": {
    "PositionEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPositionSkillMappingEntity</summary>

<div>

Retrieves a single PositionSkillMappingEntity entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PositionEntity_externalCode` | <code>string</code> | Yes | key: PositionEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPositionSkillMappingEntityQueries</code> | No | Queries to be sent with the request |

**Returns:** `PositionSkillMappingEntity_1&#124;error`

**Sample code:**

```ballerina
PositionSkillMappingEntity_1 result = check client->getPositionSkillMappingEntity(PositionEntity_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {
    "PositionEntity_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updatePositionSkillMappingEntity</summary>

<div>

Updates the PositionSkillMappingEntity identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PositionEntity_externalCode` | <code>string</code> | Yes | key: PositionEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPositionSkillMappingEntity</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePositionSkillMappingEntity(PositionEntity_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePositionSkillMappingEntity</summary>

<div>

Deletes the PositionSkillMappingEntity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PositionEntity_externalCode` | <code>string</code> | Yes | key: PositionEntity_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeletePositionSkillMappingEntityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePositionSkillMappingEntity(PositionEntity_externalCode, externalCode);
```

</div>
</details>

