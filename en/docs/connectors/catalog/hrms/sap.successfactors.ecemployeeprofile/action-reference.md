---
connector: true
connector_name: "sap.successfactors.ecemployeeprofile"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecemployeeprofile` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecemployeeprofile objects — Background_Community, Background_Courses, Background_Benefitselection, Background_OutsideWorkExperience, Background_Promotability, Background_Fsaelection, Background_Compensation, Background_Memberships… — over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to maintain the general background information of an employee, including education and outside work experiences.

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
import ballerinax/sap.successfactors.ecemployeeprofile;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecemployeeprofile:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### Background_Community

<details>
<summary>listBackgroundCommunities</summary>

<div>

Queries the Background_Community collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundCommunitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listBackgroundCommunities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "name": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundCommunity</summary>

<div>

Creates a new Background_Community entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Community</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Community&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Community result = check client->createBackgroundCommunity(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "name": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundCommunity</summary>

<div>

Retrieves a single Background_Community entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundCommunityQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Community_1&#124;error`

**Sample code:**

```ballerina
Background_Community_1 result = check client->getBackgroundCommunity(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "name": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundCommunity</summary>

<div>

Updates the Background_Community identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Community</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundCommunity(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundCommunity</summary>

<div>

Deletes the Background_Community identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundCommunityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundCommunity(backgroundElementId, userId);
```

</div>
</details>

#### Background_Courses

<details>
<summary>listBackgroundCoursess</summary>

<div>

Queries the Background_Courses collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundCoursessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listBackgroundCoursess();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "course": "string",
        "endDate": "2026-01-01",
        "lastModifiedDate": "2026-01-01",
        "length": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundCourses</summary>

<div>

Creates a new Background_Courses entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Courses</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Courses&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Courses result = check client->createBackgroundCourses(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "course": "string",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "length": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundCourses</summary>

<div>

Retrieves a single Background_Courses entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundCoursesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Courses_1&#124;error`

**Sample code:**

```ballerina
Background_Courses_1 result = check client->getBackgroundCourses(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "course": "string",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "length": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundCourses</summary>

<div>

Updates the Background_Courses identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Courses</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundCourses(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundCourses</summary>

<div>

Deletes the Background_Courses identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundCoursesHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundCourses(backgroundElementId, userId);
```

</div>
</details>

#### Background_Benefitselection

<details>
<summary>listBackgroundBenefitselections</summary>

<div>

Queries the Background_Benefitselection collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundBenefitselectionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listBackgroundBenefitselections();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "dental": "string",
        "depdisability": "string",
        "depgender": "string",
        "depname": "string",
        "depnationalid": "1000",
        "depsmoke": "string",
        "depstudent": "string",
        "endDate": "2026-01-01",
        "health": "string",
        "lastModifiedDate": "2026-01-01",
        "relation": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundBenefitselection</summary>

<div>

Creates a new Background_Benefitselection entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Benefitselection</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Benefitselection&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Benefitselection result = check client->createBackgroundBenefitselection(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "dental": "string",
    "depdisability": "string",
    "depgender": "string",
    "depname": "string",
    "depnationalid": "1000",
    "depsmoke": "string",
    "depstudent": "string",
    "endDate": "2026-01-01",
    "health": "string",
    "lastModifiedDate": "2026-01-01",
    "relation": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundBenefitselection</summary>

<div>

Retrieves a single Background_Benefitselection entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundBenefitselectionQueries</code> | No | Queries to be sent with the request |

**Returns:** `BackgroundBenefitselection&#124;error`

**Sample code:**

```ballerina
BackgroundBenefitselection result = check client->getBackgroundBenefitselection(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "dental": "string",
    "depdisability": "string",
    "depgender": "string",
    "depname": "string",
    "depnationalid": "1000",
    "depsmoke": "string",
    "depstudent": "string",
    "endDate": "2026-01-01",
    "health": "string",
    "lastModifiedDate": "2026-01-01",
    "relation": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundBenefitselection</summary>

<div>

Updates the Background_Benefitselection identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Benefitselection</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundBenefitselection(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundBenefitselection</summary>

<div>

Deletes the Background_Benefitselection identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundBenefitselectionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundBenefitselection(backgroundElementId, userId);
```

</div>
</details>

#### Background_OutsideWorkExperience

<details>
<summary>listBackgroundOutsideWorkExperiences</summary>

<div>

Queries the Background_OutsideWorkExperience collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundOutsideWorkExperiencesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listBackgroundOutsideWorkExperiences();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "employer": "string",
        "endDate": "2026-01-01",
        "lastModifiedDate": "2026-01-01",
        "presentEmployer": "string",
        "startDate": "2026-01-01",
        "startTitle": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundOutsideWorkExperience</summary>

<div>

Creates a new Background_OutsideWorkExperience entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_OutsideWorkExperience</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_OutsideWorkExperience&#124;error`

**Sample code:**

```ballerina
CreatedBackground_OutsideWorkExperience result = check client->createBackgroundOutsideWorkExperience(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "employer": "string",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "presentEmployer": "string",
    "startDate": "2026-01-01",
    "startTitle": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundOutsideWorkExperience</summary>

<div>

Retrieves a single Background_OutsideWorkExperience entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundOutsideWorkExperienceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_OutsideWorkExperience_1&#124;error`

**Sample code:**

```ballerina
Background_OutsideWorkExperience_1 result = check client->getBackgroundOutsideWorkExperience(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "employer": "string",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "presentEmployer": "string",
    "startDate": "2026-01-01",
    "startTitle": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundOutsideWorkExperience</summary>

<div>

Updates the Background_OutsideWorkExperience identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_OutsideWorkExperience</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundOutsideWorkExperience(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundOutsideWorkExperience</summary>

<div>

Deletes the Background_OutsideWorkExperience identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundOutsideWorkExperienceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundOutsideWorkExperience(backgroundElementId, userId);
```

</div>
</details>

#### Background_Promotability

<details>
<summary>listBackgroundPromotabilities</summary>

<div>

Queries the Background_Promotability collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundPromotabilitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listBackgroundPromotabilities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "level": "string",
        "timeframe": "00:00:00",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundPromotability</summary>

<div>

Creates a new Background_Promotability entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Promotability</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Promotability&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Promotability result = check client->createBackgroundPromotability(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "level": "string",
    "timeframe": "00:00:00",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundPromotability</summary>

<div>

Retrieves a single Background_Promotability entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundPromotabilityQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Promotability_1&#124;error`

**Sample code:**

```ballerina
Background_Promotability_1 result = check client->getBackgroundPromotability(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "level": "string",
    "timeframe": "00:00:00",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundPromotability</summary>

<div>

Updates the Background_Promotability identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Promotability</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundPromotability(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundPromotability</summary>

<div>

Deletes the Background_Promotability identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundPromotabilityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundPromotability(backgroundElementId, userId);
```

</div>
</details>

#### Background_Fsaelection

<details>
<summary>listBackgroundFsaelections</summary>

<div>

Queries the Background_Fsaelection collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundFsaelectionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listBackgroundFsaelections();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundFsaelection</summary>

<div>

Creates a new Background_Fsaelection entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Fsaelection</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Fsaelection&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Fsaelection result = check client->createBackgroundFsaelection(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundFsaelection</summary>

<div>

Retrieves a single Background_Fsaelection entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundFsaelectionQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Fsaelection_1&#124;error`

**Sample code:**

```ballerina
Background_Fsaelection_1 result = check client->getBackgroundFsaelection(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundFsaelection</summary>

<div>

Updates the Background_Fsaelection identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Fsaelection</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundFsaelection(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundFsaelection</summary>

<div>

Deletes the Background_Fsaelection identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundFsaelectionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundFsaelection(backgroundElementId, userId);
```

</div>
</details>

#### Background_Compensation

<details>
<summary>listBackgroundCompensations</summary>

<div>

Queries the Background_Compensation collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundCompensationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listBackgroundCompensations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundCompensation</summary>

<div>

Creates a new Background_Compensation entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Compensation</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Compensation&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Compensation result = check client->createBackgroundCompensation(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundCompensation</summary>

<div>

Retrieves a single Background_Compensation entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundCompensationQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Compensation_1&#124;error`

**Sample code:**

```ballerina
Background_Compensation_1 result = check client->getBackgroundCompensation(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundCompensation</summary>

<div>

Updates the Background_Compensation identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Compensation</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundCompensation(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundCompensation</summary>

<div>

Deletes the Background_Compensation identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundCompensationHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundCompensation(backgroundElementId, userId);
```

</div>
</details>

#### Background_Memberships

<details>
<summary>listBackgroundMembershipss</summary>

<div>

Queries the Background_Memberships collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundMembershipssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listBackgroundMembershipss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "organization": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundMemberships</summary>

<div>

Creates a new Background_Memberships entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Memberships</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Memberships&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Memberships result = check client->createBackgroundMemberships(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "organization": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundMemberships</summary>

<div>

Retrieves a single Background_Memberships entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundMembershipsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Memberships_1&#124;error`

**Sample code:**

```ballerina
Background_Memberships_1 result = check client->getBackgroundMemberships(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "organization": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundMemberships</summary>

<div>

Updates the Background_Memberships identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Memberships</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundMemberships(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundMemberships</summary>

<div>

Deletes the Background_Memberships identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundMembershipsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundMemberships(backgroundElementId, userId);
```

</div>
</details>

#### Background_Documents

<details>
<summary>listBackgroundDocumentss</summary>

<div>

Queries the Background_Documents collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundDocumentssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listBackgroundDocumentss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "attachment": 0,
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundDocuments</summary>

<div>

Creates a new Background_Documents entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Documents</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Documents&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Documents result = check client->createBackgroundDocuments(payload);
```

**Sample response:**

```json
{
  "d": {
    "attachment": 0,
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundDocuments</summary>

<div>

Retrieves a single Background_Documents entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundDocumentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Documents_1&#124;error`

**Sample code:**

```ballerina
Background_Documents_1 result = check client->getBackgroundDocuments(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "attachment": 0,
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundDocuments</summary>

<div>

Updates the Background_Documents identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Documents</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundDocuments(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundDocuments</summary>

<div>

Deletes the Background_Documents identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundDocumentsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundDocuments(backgroundElementId, userId);
```

</div>
</details>

#### Background_FuncExperience

<details>
<summary>listBackgroundFuncExperiences</summary>

<div>

Queries the Background_FuncExperience collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundFuncExperiencesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listBackgroundFuncExperiences();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "experience": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000",
        "years": 0
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundFuncExperience</summary>

<div>

Creates a new Background_FuncExperience entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_FuncExperience</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_FuncExperience&#124;error`

**Sample code:**

```ballerina
CreatedBackground_FuncExperience result = check client->createBackgroundFuncExperience(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "experience": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000",
    "years": 0
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundFuncExperience</summary>

<div>

Retrieves a single Background_FuncExperience entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundFuncExperienceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_FuncExperience_1&#124;error`

**Sample code:**

```ballerina
Background_FuncExperience_1 result = check client->getBackgroundFuncExperience(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "experience": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000",
    "years": 0
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundFuncExperience</summary>

<div>

Updates the Background_FuncExperience identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_FuncExperience</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundFuncExperience(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundFuncExperience</summary>

<div>

Deletes the Background_FuncExperience identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundFuncExperienceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundFuncExperience(backgroundElementId, userId);
```

</div>
</details>

#### Background_TalentPool

<details>
<summary>listBackgroundTalentPools</summary>

<div>

Queries the Background_TalentPool collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundTalentPoolsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listBackgroundTalentPools();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "talentPoolitem": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundTalentPool</summary>

<div>

Creates a new Background_TalentPool entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_TalentPool</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_TalentPool&#124;error`

**Sample code:**

```ballerina
CreatedBackground_TalentPool result = check client->createBackgroundTalentPool(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "talentPoolitem": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundTalentPool</summary>

<div>

Retrieves a single Background_TalentPool entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundTalentPoolQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_TalentPool_1&#124;error`

**Sample code:**

```ballerina
Background_TalentPool_1 result = check client->getBackgroundTalentPool(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "talentPoolitem": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundTalentPool</summary>

<div>

Updates the Background_TalentPool identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_TalentPool</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundTalentPool(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundTalentPool</summary>

<div>

Deletes the Background_TalentPool identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundTalentPoolHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundTalentPool(backgroundElementId, userId);
```

</div>
</details>

#### UserBadges

<details>
<summary>listUserBadgess</summary>

<div>

Queries the UserBadges collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListUserBadgessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listUserBadgess();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "badgeInstanceId": 0,
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createUserBadges</summary>

<div>

Creates a new UserBadges entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>UserBadges</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedUserBadges&#124;error`

**Sample code:**

```ballerina
CreatedUserBadges result = check client->createUserBadges(payload);
```

**Sample response:**

```json
{
  "d": {
    "badgeInstanceId": 0,
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getUserBadges</summary>

<div>

Retrieves a single UserBadges entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `badgeInstanceId` | <code>int:Signed32</code> | Yes | key: badgeInstanceId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetUserBadgesQueries</code> | No | Queries to be sent with the request |

**Returns:** `UserBadges_1&#124;error`

**Sample code:**

```ballerina
UserBadges_1 result = check client->getUserBadges(badgeInstanceId, userId);
```

**Sample response:**

```json
{
  "d": {
    "badgeInstanceId": 0,
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>deleteUserBadges</summary>

<div>

Deletes the UserBadges identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `badgeInstanceId` | <code>int:Signed32</code> | Yes | key: badgeInstanceId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteUserBadgesHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteUserBadges(badgeInstanceId, userId);
```

</div>
</details>

#### Background_Googledocs

<details>
<summary>listBackgroundGoogledocss</summary>

<div>

Queries the Background_Googledocs collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundGoogledocssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listBackgroundGoogledocss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "documenturl": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundGoogledocs</summary>

<div>

Creates a new Background_Googledocs entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Googledocs</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Googledocs&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Googledocs result = check client->createBackgroundGoogledocs(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "documenturl": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundGoogledocs</summary>

<div>

Retrieves a single Background_Googledocs entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundGoogledocsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Googledocs_1&#124;error`

**Sample code:**

```ballerina
Background_Googledocs_1 result = check client->getBackgroundGoogledocs(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "documenturl": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundGoogledocs</summary>

<div>

Updates the Background_Googledocs identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Googledocs</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundGoogledocs(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundGoogledocs</summary>

<div>

Deletes the Background_Googledocs identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundGoogledocsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundGoogledocs(backgroundElementId, userId);
```

</div>
</details>

#### Background_Awards

<details>
<summary>listBackgroundAwardss</summary>

<div>

Queries the Background_Awards collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundAwardssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listBackgroundAwardss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "name": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundAwards</summary>

<div>

Creates a new Background_Awards entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Awards</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Awards&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Awards result = check client->createBackgroundAwards(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "name": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundAwards</summary>

<div>

Retrieves a single Background_Awards entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundAwardsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Awards_1&#124;error`

**Sample code:**

```ballerina
Background_Awards_1 result = check client->getBackgroundAwards(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "name": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundAwards</summary>

<div>

Updates the Background_Awards identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Awards</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundAwards(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundAwards</summary>

<div>

Deletes the Background_Awards identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundAwardsHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundAwards(backgroundElementId, userId);
```

</div>
</details>

#### Background_Education

<details>
<summary>listBackgroundEducations</summary>

<div>

Queries the Background_Education collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundEducationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listBackgroundEducations();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundEducation</summary>

<div>

Creates a new Background_Education entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Education</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Education&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Education result = check client->createBackgroundEducation(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundEducation</summary>

<div>

Retrieves a single Background_Education entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundEducationQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Education_1&#124;error`

**Sample code:**

```ballerina
Background_Education_1 result = check client->getBackgroundEducation(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundEducation</summary>

<div>

Updates the Background_Education identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Education</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundEducation(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundEducation</summary>

<div>

Deletes the Background_Education identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundEducationHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundEducation(backgroundElementId, userId);
```

</div>
</details>

#### Background_Mobility

<details>
<summary>listBackgroundMobilities</summary>

<div>

Queries the Background_Mobility collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundMobilitiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listBackgroundMobilities();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000",
        "willingness": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundMobility</summary>

<div>

Creates a new Background_Mobility entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Mobility</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Mobility&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Mobility result = check client->createBackgroundMobility(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000",
    "willingness": "string"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundMobility</summary>

<div>

Retrieves a single Background_Mobility entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundMobilityQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Mobility_1&#124;error`

**Sample code:**

```ballerina
Background_Mobility_1 result = check client->getBackgroundMobility(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000",
    "willingness": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundMobility</summary>

<div>

Updates the Background_Mobility identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Mobility</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundMobility(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundMobility</summary>

<div>

Deletes the Background_Mobility identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundMobilityHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundMobility(backgroundElementId, userId);
```

</div>
</details>

#### Background_VarPayEmpHistData

<details>
<summary>listBackgroundVarPayEmpHistData</summary>

<div>

Queries the Background_VarPayEmpHistData collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundVarPayEmpHistDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listBackgroundVarPayEmpHistData();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "endDate": "2026-01-01",
        "lastModifiedDate": "2026-01-01",
        "startDate": "2026-01-01",
        "userId": "1000",
        "varPayProgramName": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundVarPayEmpHistData</summary>

<div>

Creates a new Background_VarPayEmpHistData entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_VarPayEmpHistData</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_VarPayEmpHistData&#124;error`

**Sample code:**

```ballerina
CreatedBackground_VarPayEmpHistData result = check client->createBackgroundVarPayEmpHistData(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "startDate": "2026-01-01",
    "userId": "1000",
    "varPayProgramName": "string"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundVarPayEmpHistData</summary>

<div>

Retrieves a single Background_VarPayEmpHistData entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundVarPayEmpHistDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_VarPayEmpHistData_1&#124;error`

**Sample code:**

```ballerina
Background_VarPayEmpHistData_1 result = check client->getBackgroundVarPayEmpHistData(backgroundElementId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "startDate": "2026-01-01",
    "userId": "1000",
    "varPayProgramName": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundVarPayEmpHistData</summary>

<div>

Updates the Background_VarPayEmpHistData identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `payload` | <code>ModifiedBackground_VarPayEmpHistData</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundVarPayEmpHistData(backgroundElementId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundVarPayEmpHistData</summary>

<div>

Deletes the Background_VarPayEmpHistData identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `headers` | <code>DeleteBackgroundVarPayEmpHistDataHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundVarPayEmpHistData(backgroundElementId);
```

</div>
</details>

#### Background_InsideWorkExperience

<details>
<summary>listBackgroundInsideWorkExperiences</summary>

<div>

Queries the Background_InsideWorkExperience collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundInsideWorkExperiencesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listBackgroundInsideWorkExperiences();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundInsideWorkExperience</summary>

<div>

Creates a new Background_InsideWorkExperience entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_InsideWorkExperience</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_InsideWorkExperience&#124;error`

**Sample code:**

```ballerina
CreatedBackground_InsideWorkExperience result = check client->createBackgroundInsideWorkExperience(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundInsideWorkExperience</summary>

<div>

Retrieves a single Background_InsideWorkExperience entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundInsideWorkExperienceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_InsideWorkExperience_1&#124;error`

**Sample code:**

```ballerina
Background_InsideWorkExperience_1 result = check client->getBackgroundInsideWorkExperience(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundInsideWorkExperience</summary>

<div>

Updates the Background_InsideWorkExperience identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_InsideWorkExperience</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundInsideWorkExperience(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundInsideWorkExperience</summary>

<div>

Deletes the Background_InsideWorkExperience identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundInsideWorkExperienceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundInsideWorkExperience(backgroundElementId, userId);
```

</div>
</details>

#### Background_PreferredNextMove

<details>
<summary>listBackgroundPreferredNextMoves</summary>

<div>

Queries the Background_PreferredNextMove collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundPreferredNextMovesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listBackgroundPreferredNextMoves();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "title": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundPreferredNextMove</summary>

<div>

Creates a new Background_PreferredNextMove entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_PreferredNextMove</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_PreferredNextMove&#124;error`

**Sample code:**

```ballerina
CreatedBackground_PreferredNextMove result = check client->createBackgroundPreferredNextMove(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "title": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundPreferredNextMove</summary>

<div>

Retrieves a single Background_PreferredNextMove entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundPreferredNextMoveQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_PreferredNextMove_1&#124;error`

**Sample code:**

```ballerina
Background_PreferredNextMove_1 result = check client->getBackgroundPreferredNextMove(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "title": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundPreferredNextMove</summary>

<div>

Updates the Background_PreferredNextMove identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_PreferredNextMove</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundPreferredNextMove(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundPreferredNextMove</summary>

<div>

Deletes the Background_PreferredNextMove identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundPreferredNextMoveHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundPreferredNextMove(backgroundElementId, userId);
```

</div>
</details>

#### BadgeTemplates

<details>
<summary>listBadgeTemplatess</summary>

<div>

Queries the BadgeTemplates collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBadgeTemplatessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listBadgeTemplatess();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "badgeId": 0
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getBadgeTemplates</summary>

<div>

Retrieves a single BadgeTemplates entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `badgeId` | <code>int:Signed32</code> | Yes | key: badgeId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBadgeTemplatesQueries</code> | No | Queries to be sent with the request |

**Returns:** `BadgeTemplates_1&#124;error`

**Sample code:**

```ballerina
BadgeTemplates_1 result = check client->getBadgeTemplates(badgeId);
```

**Sample response:**

```json
{
  "d": {
    "badgeId": 0
  }
}
```

</div>
</details>

#### EPPublicProfile

<details>
<summary>listEPPublicProfiles</summary>

<div>

Queries the EPPublicProfile collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEPPublicProfilesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_20&#124;error`

**Sample code:**

```ballerina
Wrapper_20 result = check client->listEPPublicProfiles();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createEPPublicProfile</summary>

<div>

Creates a new EPPublicProfile entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EPPublicProfile</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedEPPublicProfile&#124;error`

**Sample code:**

```ballerina
CreatedEPPublicProfile result = check client->createEPPublicProfile(payload);
```

**Sample response:**

```json
{
  "d": {
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getEPPublicProfile</summary>

<div>

Retrieves a single EPPublicProfile entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEPPublicProfileQueries</code> | No | Queries to be sent with the request |

**Returns:** `EPPublicProfile_1&#124;error`

**Sample code:**

```ballerina
EPPublicProfile_1 result = check client->getEPPublicProfile(userId);
```

**Sample response:**

```json
{
  "d": {
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateEPPublicProfile</summary>

<div>

Updates the EPPublicProfile identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedEPPublicProfile</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEPPublicProfile(userId, payload);
```

</div>
</details>

<details>
<summary>deleteEPPublicProfile</summary>

<div>

Deletes the EPPublicProfile identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteEPPublicProfileHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEPPublicProfile(userId);
```

</div>
</details>

#### Background_Languages

<details>
<summary>listBackgroundLanguagess</summary>

<div>

Queries the Background_Languages collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundLanguagessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_21&#124;error`

**Sample code:**

```ballerina
Wrapper_21 result = check client->listBackgroundLanguagess();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundLanguages</summary>

<div>

Creates a new Background_Languages entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Languages</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Languages&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Languages result = check client->createBackgroundLanguages(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundLanguages</summary>

<div>

Retrieves a single Background_Languages entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundLanguagesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Languages_1&#124;error`

**Sample code:**

```ballerina
Background_Languages_1 result = check client->getBackgroundLanguages(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundLanguages</summary>

<div>

Updates the Background_Languages identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Languages</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundLanguages(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundLanguages</summary>

<div>

Deletes the Background_Languages identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundLanguagesHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundLanguages(backgroundElementId, userId);
```

</div>
</details>

#### Background_SysScoreCardDevelopmentObjectivesPortlet

<details>
<summary>listBackgroundSysScoreCardDevelopmentObjectivesPortlets</summary>

<div>

Queries the Background_SysScoreCardDevelopmentObjectivesPortlet collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundSysScoreCardDevelopmentObjectivesPortletsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listBackgroundSysScoreCardDevelopmentObjectivesPortlets();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundSysScoreCardDevelopmentObjectivesPortlet</summary>

<div>

Creates a new Background_SysScoreCardDevelopmentObjectivesPortlet entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_SysScoreCardDevelopmentObjectivesPortlet</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_SysScoreCardDevelopmentObjectivesPortlet&#124;error`

**Sample code:**

```ballerina
CreatedBackground_SysScoreCardDevelopmentObjectivesPortlet result = check client->createBackgroundSysScoreCardDevelopmentObjectivesPortlet(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundSysScoreCardDevelopmentObjectivesPortlet</summary>

<div>

Retrieves a single Background_SysScoreCardDevelopmentObjectivesPortlet entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundSysScoreCardDevelopmentObjectivesPortletQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_SysScoreCardDevelopmentObjectivesPortlet_1&#124;error`

**Sample code:**

```ballerina
Background_SysScoreCardDevelopmentObjectivesPortlet_1 result = check client->getBackgroundSysScoreCardDevelopmentObjectivesPortlet(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundSysScoreCardDevelopmentObjectivesPortlet</summary>

<div>

Updates the Background_SysScoreCardDevelopmentObjectivesPortlet identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_SysScoreCardDevelopmentObjectivesPortlet</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundSysScoreCardDevelopmentObjectivesPortlet(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundSysScoreCardDevelopmentObjectivesPortlet</summary>

<div>

Deletes the Background_SysScoreCardDevelopmentObjectivesPortlet identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundSysScoreCardDevelopmentObjectivesPortletHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundSysScoreCardDevelopmentObjectivesPortlet(backgroundElementId, userId);
```

</div>
</details>

#### Background_TalentPoolcorp

<details>
<summary>listBackgroundTalentPoolcorps</summary>

<div>

Queries the Background_TalentPoolcorp collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundTalentPoolcorpsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_23&#124;error`

**Sample code:**

```ballerina
Wrapper_23 result = check client->listBackgroundTalentPoolcorps();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "talentPoolitemCorp": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundTalentPoolcorp</summary>

<div>

Creates a new Background_TalentPoolcorp entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_TalentPoolcorp</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_TalentPoolcorp&#124;error`

**Sample code:**

```ballerina
CreatedBackground_TalentPoolcorp result = check client->createBackgroundTalentPoolcorp(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "talentPoolitemCorp": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundTalentPoolcorp</summary>

<div>

Retrieves a single Background_TalentPoolcorp entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundTalentPoolcorpQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_TalentPoolcorp_1&#124;error`

**Sample code:**

```ballerina
Background_TalentPoolcorp_1 result = check client->getBackgroundTalentPoolcorp(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "talentPoolitemCorp": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundTalentPoolcorp</summary>

<div>

Updates the Background_TalentPoolcorp identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_TalentPoolcorp</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundTalentPoolcorp(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundTalentPoolcorp</summary>

<div>

Deletes the Background_TalentPoolcorp identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundTalentPoolcorpHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundTalentPoolcorp(backgroundElementId, userId);
```

</div>
</details>

#### EPCustomBackgroundPortlet

<details>
<summary>listEPCustomBackgroundPortlets</summary>

<div>

Queries the EPCustomBackgroundPortlet collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEPCustomBackgroundPortletsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_24&#124;error`

**Sample code:**

```ballerina
Wrapper_24 result = check client->listEPCustomBackgroundPortlets();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "backgroundPropertyLists": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getEPCustomBackgroundPortlet</summary>

<div>

Retrieves a single EPCustomBackgroundPortlet entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>string</code> | Yes | key: backgroundElementId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEPCustomBackgroundPortletQueries</code> | No | Queries to be sent with the request |

**Returns:** `EPCustomBackgroundPortlet_1&#124;error`

**Sample code:**

```ballerina
EPCustomBackgroundPortlet_1 result = check client->getEPCustomBackgroundPortlet(backgroundElementId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "backgroundPropertyLists": {}
  }
}
```

</div>
</details>

#### Background_SpecialAssign

<details>
<summary>listBackgroundSpecialAssigns</summary>

<div>

Queries the Background_SpecialAssign collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundSpecialAssignsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listBackgroundSpecialAssigns();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "project": "string",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundSpecialAssign</summary>

<div>

Creates a new Background_SpecialAssign entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_SpecialAssign</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_SpecialAssign&#124;error`

**Sample code:**

```ballerina
CreatedBackground_SpecialAssign result = check client->createBackgroundSpecialAssign(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "project": "string",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundSpecialAssign</summary>

<div>

Retrieves a single Background_SpecialAssign entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundSpecialAssignQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_SpecialAssign_1&#124;error`

**Sample code:**

```ballerina
Background_SpecialAssign_1 result = check client->getBackgroundSpecialAssign(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "project": "string",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundSpecialAssign</summary>

<div>

Updates the Background_SpecialAssign identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_SpecialAssign</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundSpecialAssign(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundSpecialAssign</summary>

<div>

Deletes the Background_SpecialAssign identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundSpecialAssignHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundSpecialAssign(backgroundElementId, userId);
```

</div>
</details>

#### Background_Certificates

<details>
<summary>listBackgroundCertificatess</summary>

<div>

Queries the Background_Certificates collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundCertificatessQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listBackgroundCertificatess();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "lastModifiedDate": "2026-01-01",
        "name": "string",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundCertificates</summary>

<div>

Creates a new Background_Certificates entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_Certificates</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_Certificates&#124;error`

**Sample code:**

```ballerina
CreatedBackground_Certificates result = check client->createBackgroundCertificates(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "name": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundCertificates</summary>

<div>

Retrieves a single Background_Certificates entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundCertificatesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_Certificates_1&#124;error`

**Sample code:**

```ballerina
Background_Certificates_1 result = check client->getBackgroundCertificates(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "lastModifiedDate": "2026-01-01",
    "name": "string",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundCertificates</summary>

<div>

Updates the Background_Certificates identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_Certificates</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundCertificates(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundCertificates</summary>

<div>

Deletes the Background_Certificates identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundCertificatesHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundCertificates(backgroundElementId, userId);
```

</div>
</details>

#### Background_VarPayEmpHistDataECSource

<details>
<summary>listBackgroundVarPayEmpHistDataECSources</summary>

<div>

Queries the Background_VarPayEmpHistDataECSource collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundVarPayEmpHistDataECSourcesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_27&#124;error`

**Sample code:**

```ballerina
Wrapper_27 result = check client->listBackgroundVarPayEmpHistDataECSources();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "endDate": "2026-01-01",
        "lastModifiedDate": "2026-01-01",
        "startDate": "2026-01-01",
        "userId": "1000",
        "varPayProgramName": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundVarPayEmpHistDataECSource</summary>

<div>

Creates a new Background_VarPayEmpHistDataECSource entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_VarPayEmpHistDataECSource</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_VarPayEmpHistDataECSource&#124;error`

**Sample code:**

```ballerina
CreatedBackground_VarPayEmpHistDataECSource result = check client->createBackgroundVarPayEmpHistDataECSource(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "startDate": "2026-01-01",
    "userId": "1000",
    "varPayProgramName": "string"
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundVarPayEmpHistDataECSource</summary>

<div>

Retrieves a single Background_VarPayEmpHistDataECSource entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundVarPayEmpHistDataECSourceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_VarPayEmpHistDataECSource_1&#124;error`

**Sample code:**

```ballerina
Background_VarPayEmpHistDataECSource_1 result = check client->getBackgroundVarPayEmpHistDataECSource(backgroundElementId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "endDate": "2026-01-01",
    "lastModifiedDate": "2026-01-01",
    "startDate": "2026-01-01",
    "userId": "1000",
    "varPayProgramName": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundVarPayEmpHistDataECSource</summary>

<div>

Updates the Background_VarPayEmpHistDataECSource identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `payload` | <code>ModifiedBackground_VarPayEmpHistDataECSource</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundVarPayEmpHistDataECSource(backgroundElementId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundVarPayEmpHistDataECSource</summary>

<div>

Deletes the Background_VarPayEmpHistDataECSource identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `headers` | <code>DeleteBackgroundVarPayEmpHistDataECSourceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundVarPayEmpHistDataECSource(backgroundElementId);
```

</div>
</details>

#### Background_LeadExperience

<details>
<summary>listBackgroundLeadExperiences</summary>

<div>

Queries the Background_LeadExperience collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBackgroundLeadExperiencesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_28&#124;error`

**Sample code:**

```ballerina
Wrapper_28 result = check client->listBackgroundLeadExperiences();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "backgroundElementId": "1000",
        "bgOrderPos": "string",
        "experience": "string",
        "lastModifiedDate": "2026-01-01",
        "userId": "1000",
        "years": 0
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBackgroundLeadExperience</summary>

<div>

Creates a new Background_LeadExperience entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Background_LeadExperience</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBackground_LeadExperience&#124;error`

**Sample code:**

```ballerina
CreatedBackground_LeadExperience result = check client->createBackgroundLeadExperience(payload);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "experience": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000",
    "years": 0
  }
}
```

</div>
</details>

<details>
<summary>getBackgroundLeadExperience</summary>

<div>

Retrieves a single Background_LeadExperience entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBackgroundLeadExperienceQueries</code> | No | Queries to be sent with the request |

**Returns:** `Background_LeadExperience_1&#124;error`

**Sample code:**

```ballerina
Background_LeadExperience_1 result = check client->getBackgroundLeadExperience(backgroundElementId, userId);
```

**Sample response:**

```json
{
  "d": {
    "backgroundElementId": "1000",
    "bgOrderPos": "string",
    "experience": "string",
    "lastModifiedDate": "2026-01-01",
    "userId": "1000",
    "years": 0
  }
}
```

</div>
</details>

<details>
<summary>updateBackgroundLeadExperience</summary>

<div>

Updates the Background_LeadExperience identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `payload` | <code>ModifiedBackground_LeadExperience</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBackgroundLeadExperience(backgroundElementId, userId, payload);
```

</div>
</details>

<details>
<summary>deleteBackgroundLeadExperience</summary>

<div>

Deletes the Background_LeadExperience identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `backgroundElementId` | <code>int</code> | Yes | key: backgroundElementId |
| `userId` | <code>string</code> | Yes | key: userId |
| `headers` | <code>DeleteBackgroundLeadExperienceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBackgroundLeadExperience(backgroundElementId, userId);
```

</div>
</details>

#### TrendData_SysOverallObjective

<details>
<summary>listTrendDataSysOverallObjectives</summary>

<div>

Queries the TrendData_SysOverallObjective collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrendDataSysOverallObjectivesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_29&#124;error`

**Sample code:**

```ballerina
Wrapper_29 result = check client->listTrendDataSysOverallObjectives();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "id": "1000",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createTrendDataSysOverallObjective</summary>

<div>

Creates a new TrendData_SysOverallObjective entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrendData_SysOverallObjective</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTrendData_SysOverallObjective&#124;error`

**Sample code:**

```ballerina
CreatedTrendData_SysOverallObjective result = check client->createTrendDataSysOverallObjective(payload);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getTrendDataSysOverallObjective</summary>

<div>

Retrieves a single TrendData_SysOverallObjective entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrendDataSysOverallObjectiveQueries</code> | No | Queries to be sent with the request |

**Returns:** `TrendData_SysOverallObjective_1&#124;error`

**Sample code:**

```ballerina
TrendData_SysOverallObjective_1 result = check client->getTrendDataSysOverallObjective(id);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateTrendDataSysOverallObjective</summary>

<div>

Updates the TrendData_SysOverallObjective identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `payload` | <code>ModifiedTrendData_SysOverallObjective</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrendDataSysOverallObjective(id, payload);
```

</div>
</details>

<details>
<summary>deleteTrendDataSysOverallObjective</summary>

<div>

Deletes the TrendData_SysOverallObjective identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>DeleteTrendDataSysOverallObjectiveHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrendDataSysOverallObjective(id);
```

</div>
</details>

#### TrendData_SysOverallCompetency

<details>
<summary>listTrendDataSysOverallCompetencies</summary>

<div>

Queries the TrendData_SysOverallCompetency collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrendDataSysOverallCompetenciesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_30&#124;error`

**Sample code:**

```ballerina
Wrapper_30 result = check client->listTrendDataSysOverallCompetencies();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "id": "1000",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createTrendDataSysOverallCompetency</summary>

<div>

Creates a new TrendData_SysOverallCompetency entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrendData_SysOverallCompetency</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTrendData_SysOverallCompetency&#124;error`

**Sample code:**

```ballerina
CreatedTrendData_SysOverallCompetency result = check client->createTrendDataSysOverallCompetency(payload);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getTrendDataSysOverallCompetency</summary>

<div>

Retrieves a single TrendData_SysOverallCompetency entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrendDataSysOverallCompetencyQueries</code> | No | Queries to be sent with the request |

**Returns:** `TrendData_SysOverallCompetency_1&#124;error`

**Sample code:**

```ballerina
TrendData_SysOverallCompetency_1 result = check client->getTrendDataSysOverallCompetency(id);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateTrendDataSysOverallCompetency</summary>

<div>

Updates the TrendData_SysOverallCompetency identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `payload` | <code>ModifiedTrendData_SysOverallCompetency</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrendDataSysOverallCompetency(id, payload);
```

</div>
</details>

<details>
<summary>deleteTrendDataSysOverallCompetency</summary>

<div>

Deletes the TrendData_SysOverallCompetency identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>DeleteTrendDataSysOverallCompetencyHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrendDataSysOverallCompetency(id);
```

</div>
</details>

#### TrendData_SysOverallPotential

<details>
<summary>listTrendDataSysOverallPotentials</summary>

<div>

Queries the TrendData_SysOverallPotential collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrendDataSysOverallPotentialsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_31&#124;error`

**Sample code:**

```ballerina
Wrapper_31 result = check client->listTrendDataSysOverallPotentials();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "id": "1000",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createTrendDataSysOverallPotential</summary>

<div>

Creates a new TrendData_SysOverallPotential entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrendData_SysOverallPotential</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTrendData_SysOverallPotential&#124;error`

**Sample code:**

```ballerina
CreatedTrendData_SysOverallPotential result = check client->createTrendDataSysOverallPotential(payload);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getTrendDataSysOverallPotential</summary>

<div>

Retrieves a single TrendData_SysOverallPotential entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrendDataSysOverallPotentialQueries</code> | No | Queries to be sent with the request |

**Returns:** `TrendData_SysOverallPotential_1&#124;error`

**Sample code:**

```ballerina
TrendData_SysOverallPotential_1 result = check client->getTrendDataSysOverallPotential(id);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateTrendDataSysOverallPotential</summary>

<div>

Updates the TrendData_SysOverallPotential identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `payload` | <code>ModifiedTrendData_SysOverallPotential</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrendDataSysOverallPotential(id, payload);
```

</div>
</details>

<details>
<summary>deleteTrendDataSysOverallPotential</summary>

<div>

Deletes the TrendData_SysOverallPotential identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>DeleteTrendDataSysOverallPotentialHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrendDataSysOverallPotential(id);
```

</div>
</details>

#### TrendData_SysOverallPerformance

<details>
<summary>listTrendDataSysOverallPerformances</summary>

<div>

Queries the TrendData_SysOverallPerformance collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrendDataSysOverallPerformancesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_32&#124;error`

**Sample code:**

```ballerina
Wrapper_32 result = check client->listTrendDataSysOverallPerformances();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "id": "1000",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createTrendDataSysOverallPerformance</summary>

<div>

Creates a new TrendData_SysOverallPerformance entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrendData_SysOverallPerformance</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTrendData_SysOverallPerformance&#124;error`

**Sample code:**

```ballerina
CreatedTrendData_SysOverallPerformance result = check client->createTrendDataSysOverallPerformance(payload);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getTrendDataSysOverallPerformance</summary>

<div>

Retrieves a single TrendData_SysOverallPerformance entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrendDataSysOverallPerformanceQueries</code> | No | Queries to be sent with the request |

**Returns:** `TrendData_SysOverallPerformance_1&#124;error`

**Sample code:**

```ballerina
TrendData_SysOverallPerformance_1 result = check client->getTrendDataSysOverallPerformance(id);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateTrendDataSysOverallPerformance</summary>

<div>

Updates the TrendData_SysOverallPerformance identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `payload` | <code>ModifiedTrendData_SysOverallPerformance</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrendDataSysOverallPerformance(id, payload);
```

</div>
</details>

<details>
<summary>deleteTrendDataSysOverallPerformance</summary>

<div>

Deletes the TrendData_SysOverallPerformance identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>DeleteTrendDataSysOverallPerformanceHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrendDataSysOverallPerformance(id);
```

</div>
</details>

#### TrendData_SysOverallCustom1

<details>
<summary>listTrendDataSysOverallCustom1s</summary>

<div>

Queries the TrendData_SysOverallCustom1 collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrendDataSysOverallCustom1sQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_33&#124;error`

**Sample code:**

```ballerina
Wrapper_33 result = check client->listTrendDataSysOverallCustom1s();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "id": "1000",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createTrendDataSysOverallCustom1</summary>

<div>

Creates a new TrendData_SysOverallCustom1 entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrendData_SysOverallCustom1</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTrendData_SysOverallCustom1&#124;error`

**Sample code:**

```ballerina
CreatedTrendData_SysOverallCustom1 result = check client->createTrendDataSysOverallCustom1(payload);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getTrendDataSysOverallCustom1</summary>

<div>

Retrieves a single TrendData_SysOverallCustom1 entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrendDataSysOverallCustom1Queries</code> | No | Queries to be sent with the request |

**Returns:** `TrendData_SysOverallCustom1_1&#124;error`

**Sample code:**

```ballerina
TrendData_SysOverallCustom1_1 result = check client->getTrendDataSysOverallCustom1(id);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateTrendDataSysOverallCustom1</summary>

<div>

Updates the TrendData_SysOverallCustom1 identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `payload` | <code>ModifiedTrendData_SysOverallCustom1</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrendDataSysOverallCustom1(id, payload);
```

</div>
</details>

<details>
<summary>deleteTrendDataSysOverallCustom1</summary>

<div>

Deletes the TrendData_SysOverallCustom1 identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>DeleteTrendDataSysOverallCustom1Headers</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrendDataSysOverallCustom1(id);
```

</div>
</details>

#### TrendData_SysOverallCustom2

<details>
<summary>listTrendDataSysOverallCustom2s</summary>

<div>

Queries the TrendData_SysOverallCustom2 collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTrendDataSysOverallCustom2sQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_34&#124;error`

**Sample code:**

```ballerina
Wrapper_34 result = check client->listTrendDataSysOverallCustom2s();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "endDate": "2026-01-01",
        "id": "1000",
        "startDate": "2026-01-01",
        "userId": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createTrendDataSysOverallCustom2</summary>

<div>

Creates a new TrendData_SysOverallCustom2 entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TrendData_SysOverallCustom2</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedTrendData_SysOverallCustom2&#124;error`

**Sample code:**

```ballerina
CreatedTrendData_SysOverallCustom2 result = check client->createTrendDataSysOverallCustom2(payload);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getTrendDataSysOverallCustom2</summary>

<div>

Retrieves a single TrendData_SysOverallCustom2 entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTrendDataSysOverallCustom2Queries</code> | No | Queries to be sent with the request |

**Returns:** `TrendData_SysOverallCustom2_1&#124;error`

**Sample code:**

```ballerina
TrendData_SysOverallCustom2_1 result = check client->getTrendDataSysOverallCustom2(id);
```

**Sample response:**

```json
{
  "d": {
    "endDate": "2026-01-01",
    "id": "1000",
    "startDate": "2026-01-01",
    "userId": "1000"
  }
}
```

</div>
</details>

<details>
<summary>updateTrendDataSysOverallCustom2</summary>

<div>

Updates the TrendData_SysOverallCustom2 identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `payload` | <code>ModifiedTrendData_SysOverallCustom2</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTrendDataSysOverallCustom2(id, payload);
```

</div>
</details>

<details>
<summary>deleteTrendDataSysOverallCustom2</summary>

<div>

Deletes the TrendData_SysOverallCustom2 identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `id` | <code>int</code> | Yes | key: id |
| `headers` | <code>DeleteTrendDataSysOverallCustom2Headers</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTrendDataSysOverallCustom2(id);
```

</div>
</details>

