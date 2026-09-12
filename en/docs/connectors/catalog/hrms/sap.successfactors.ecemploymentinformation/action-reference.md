---
connector: true
connector_name: "sap.successfactors.ecemploymentinformation"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecemploymentinformation` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecemploymentinformation objects — EmpBeneficiary, EmpEmployment, EmpEmploymentTermination, EmpPensionPayout, EmpWorkPermit, EmpJobRelationships, EmpJob, PersonEmpTerminationInfo… — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access the employment related information, including job information, employment termination, and work permit.

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
import ballerinax/sap.successfactors.ecemploymentinformation;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecemploymentinformation:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### EmpBeneficiary

<details>
<summary>listEmpBeneficiaries</summary>

<div>

Queries the EmpBeneficiary collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpBeneficiariesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listEmpBeneficiaries();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "employmentNav": {},
        "personIdExternal": "1000",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpBeneficiary</summary>

<div>

Retrieves a single EmpBeneficiary entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpBeneficiaryQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpBeneficiary_1&#124;error`

**Sample code:**

```ballerina
EmpBeneficiary_1 result = check client->getEmpBeneficiary(userId);
```

**Sample response:**

```json
{
  "d": {
    "employmentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    },
    "personIdExternal": "1000",
    "userId": "1000"
  }
}
```

</div>
</details>

#### EmpEmployment

<details>
<summary>listEmpEmployments</summary>

<div>

Queries the EmpEmployment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpEmploymentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listEmpEmployments();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "personIdExternal": "1000",
        "userId": "1000",
        "empBeneficiaryNav": {},
        "empJobRelationshipNav": {},
        "empPensionPayoutNav": {},
        "empWorkPermitNav": {},
        "jobInfoNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpEmployment</summary>

<div>

Retrieves a single EmpEmployment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpEmploymentQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpEmployment_1&#124;error`

**Sample code:**

```ballerina
EmpEmployment_1 result = check client->getEmpEmployment(personIdExternal, userId);
```

**Sample response:**

```json
{
  "d": {
    "personIdExternal": "1000",
    "userId": "1000",
    "empBeneficiaryNav": {
      "employmentNav": {},
      "personIdExternal": "1000",
      "userId": "1000"
    },
    "empJobRelationshipNav": {
      "results": []
    },
    "empPensionPayoutNav": {
      "employmentNav": {},
      "personIdExternal": "1000",
      "userId": "1000"
    },
    "empWorkPermitNav": {
      "results": []
    },
    "jobInfoNav": {
      "results": []
    }
  }
}
```

</div>
</details>

#### EmpEmploymentTermination

<details>
<summary>listEmpEmploymentTerminations</summary>

<div>

Queries the EmpEmploymentTermination collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpEmploymentTerminationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listEmpEmploymentTerminations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "personIdExternal": "1000",
        "userId": "1000",
        "employmentNav": {},
        "jobInfoNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpEmploymentTermination</summary>

<div>

Retrieves a single EmpEmploymentTermination entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `endDate` | <code>string</code> | Yes | key: endDate |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpEmploymentTerminationQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpEmploymentTermination_1&#124;error`

**Sample code:**

```ballerina
EmpEmploymentTermination_1 result = check client->getEmpEmploymentTermination(endDate, personIdExternal, userId);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "personIdExternal": "1000",
    "userId": "1000",
    "employmentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    },
    "jobInfoNav": {
      "seqNumber": "string",
      "startDate": "2026-01-01",
      "userId": "1000",
      "employmentNav": {},
      "managerEmploymentNav": {}
    }
  }
}
```

</div>
</details>

#### EmpPensionPayout

<details>
<summary>listEmpPensionPayouts</summary>

<div>

Queries the EmpPensionPayout collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpPensionPayoutsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listEmpPensionPayouts();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "employmentNav": {},
        "personIdExternal": "1000",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpPensionPayout</summary>

<div>

Retrieves a single EmpPensionPayout entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpPensionPayoutQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpPensionPayout_1&#124;error`

**Sample code:**

```ballerina
EmpPensionPayout_1 result = check client->getEmpPensionPayout(userId);
```

**Sample response:**

```json
{
  "d": {
    "employmentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    },
    "personIdExternal": "1000",
    "userId": "1000"
  }
}
```

</div>
</details>

#### EmpWorkPermit

<details>
<summary>listEmpWorkPermits</summary>

<div>

Queries the EmpWorkPermit collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpWorkPermitsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listEmpWorkPermits();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "documentNumber": "string",
        "documentType": "string",
        "userId": "1000",
        "employmentNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpWorkPermit</summary>

<div>

Retrieves a single EmpWorkPermit entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `documentNumber` | <code>string</code> | Yes | key: documentNumber |
| `documentType` | <code>string</code> | Yes | key: documentType |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpWorkPermitQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpWorkPermit_1&#124;error`

**Sample code:**

```ballerina
EmpWorkPermit_1 result = check client->getEmpWorkPermit(country, documentNumber, documentType, userId);
```

**Sample response:**

```json
{
  "d": {
    "country": "string",
    "documentNumber": "string",
    "documentType": "string",
    "userId": "1000",
    "employmentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    }
  }
}
```

</div>
</details>

#### EmpJobRelationships

<details>
<summary>listEmpJobRelationshipss</summary>

<div>

Queries the EmpJobRelationships collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpJobRelationshipssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listEmpJobRelationshipss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "relationshipType": "string",
        "startDate": "2026-01-01",
        "userId": "1000",
        "employmentNav": {},
        "relEmploymentNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpJobRelationships</summary>

<div>

Retrieves a single EmpJobRelationships entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `relationshipType` | <code>string</code> | Yes | key: relationshipType |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpJobRelationshipsQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpJobRelationships_1&#124;error`

**Sample code:**

```ballerina
EmpJobRelationships_1 result = check client->getEmpJobRelationships(relationshipType, startDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "relationshipType": "string",
    "startDate": "2026-01-01",
    "userId": "1000",
    "employmentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    },
    "relEmploymentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    }
  }
}
```

</div>
</details>

#### EmpJob

<details>
<summary>listEmpJobs</summary>

<div>

Queries the EmpJob collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEmpJobsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listEmpJobs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "seqNumber": "string",
        "startDate": "2026-01-01",
        "userId": "1000",
        "employmentNav": {},
        "managerEmploymentNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEmpJob</summary>

<div>

Retrieves a single EmpJob entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `seqNumber` | <code>int</code> | Yes | key: seqNumber |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEmpJobQueries</code> | No | Queries to be sent with the request |

**Returns:** `EmpJob_1&#124;error`

**Sample code:**

```ballerina
EmpJob_1 result = check client->getEmpJob(seqNumber, startDate, userId);
```

**Sample response:**

```json
{
  "d": {
    "seqNumber": "string",
    "startDate": "2026-01-01",
    "userId": "1000",
    "employmentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    },
    "managerEmploymentNav": {
      "personIdExternal": "1000",
      "userId": "1000",
      "empBeneficiaryNav": {},
      "empJobRelationshipNav": {},
      "empPensionPayoutNav": {},
      "empWorkPermitNav": {},
      "jobInfoNav": {}
    }
  }
}
```

</div>
</details>

#### PersonEmpTerminationInfo

<details>
<summary>listPersonEmpTerminationInfos</summary>

<div>

Queries the PersonEmpTerminationInfo collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPersonEmpTerminationInfosQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listPersonEmpTerminationInfos();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "personIdExternal": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPersonEmpTerminationInfo</summary>

<div>

Retrieves a single PersonEmpTerminationInfo entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPersonEmpTerminationInfoQueries</code> | No | Queries to be sent with the request |

**Returns:** `PersonEmpTerminationInfo_1&#124;error`

**Sample code:**

```ballerina
PersonEmpTerminationInfo_1 result = check client->getPersonEmpTerminationInfo(personIdExternal);
```

**Sample response:**

```json
{
  "d": {
    "personIdExternal": "1000"
  }
}
```

</div>
</details>

#### HireDateChange

<details>
<summary>listHireDateChanges</summary>

<div>

Queries the HireDateChange collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHireDateChangesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listHireDateChanges();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "code": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createHireDateChange</summary>

<div>

Creates a new HireDateChange entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>HireDateChange</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedHireDateChange&#124;error`

**Sample code:**

```ballerina
CreatedHireDateChange result = check client->createHireDateChange(payload);
```

**Sample response:**

```json
{
  "d": {
    "code": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getHireDateChange</summary>

<div>

Retrieves a single HireDateChange entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHireDateChangeQueries</code> | No | Queries to be sent with the request |

**Returns:** `HireDateChange_1&#124;error`

**Sample code:**

```ballerina
HireDateChange_1 result = check client->getHireDateChange(code);
```

**Sample response:**

```json
{
  "d": {
    "code": "1000"
  }
}
```

</div>
</details>

<details>
<summary>deleteHireDateChange</summary>

<div>

Deletes the HireDateChange identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `headers` | <code>DeleteHireDateChangeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteHireDateChange(code);
```

</div>
</details>

