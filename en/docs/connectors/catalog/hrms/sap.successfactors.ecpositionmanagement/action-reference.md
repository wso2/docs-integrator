---
connector: true
connector_name: "sap.successfactors.ecpositionmanagement"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecpositionmanagement` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecpositionmanagement objects: PositionRequisitionStatus, PositionMatrixRelationship, Position, getPositionObjectData, PositionRightToReturn, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs for maintain the information about employees position management.

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
import ballerinax/sap.successfactors.ecpositionmanagement;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecpositionmanagement:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### PositionRequisitionStatus

<details>
<summary>listPositionRequisitionStatuses</summary>

<div>

Queries the PositionRequisitionStatus collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionRequisitionStatusesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listPositionRequisitionStatuses();
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
<summary>createPositionRequisitionStatus</summary>

<div>

Creates a new PositionRequisitionStatus entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PositionRequisitionStatus</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPositionRequisitionStatus&#124;error`

**Sample code:**

```ballerina
CreatedPositionRequisitionStatus result = check client->createPositionRequisitionStatus(payload);
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
<summary>getPositionRequisitionStatus</summary>

<div>

Retrieves a single PositionRequisitionStatus entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int</code> | Yes | key: code |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPositionRequisitionStatusQueries</code> | No | Queries to be sent with the request |

**Returns:** `PositionRequisitionStatus_1&#124;error`

**Sample code:**

```ballerina
PositionRequisitionStatus_1 result = check client->getPositionRequisitionStatus(code);
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
<summary>updatePositionRequisitionStatus</summary>

<div>

Updates the PositionRequisitionStatus identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int</code> | Yes | key: code |
| `payload` | <code>ModifiedPositionRequisitionStatus</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePositionRequisitionStatus(code, payload);
```

</div>
</details>

<details>
<summary>deletePositionRequisitionStatus</summary>

<div>

Deletes the PositionRequisitionStatus identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int</code> | Yes | key: code |
| `headers` | <code>DeletePositionRequisitionStatusHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePositionRequisitionStatus(code);
```

</div>
</details>

#### PositionMatrixRelationship

<details>
<summary>listPositionMatrixRelationships</summary>

<div>

Queries the PositionMatrixRelationship collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionMatrixRelationshipsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listPositionMatrixRelationships();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "Position_code": "1000",
        "Position_effectiveStartDate": "2026-01-01",
        "matrixRelationshipType": "string",
        "relatedPositionNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPositionMatrixRelationship</summary>

<div>

Creates a new PositionMatrixRelationship entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PositionMatrixRelationship</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPositionMatrixRelationship&#124;error`

**Sample code:**

```ballerina
CreatedPositionMatrixRelationship result = check client->createPositionMatrixRelationship(payload);
```

**Sample response:**

```json
{
  "d": {
    "Position_code": "1000",
    "Position_effectiveStartDate": "2026-01-01",
    "matrixRelationshipType": "string",
    "relatedPositionNav": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getPositionMatrixRelationship</summary>

<div>

Retrieves a single PositionMatrixRelationship entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Position_code` | <code>string</code> | Yes | key: Position_code |
| `Position_effectiveStartDate` | <code>string</code> | Yes | key: Position_effectiveStartDate |
| `matrixRelationshipType` | <code>string</code> | Yes | key: matrixRelationshipType |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPositionMatrixRelationshipQueries</code> | No | Queries to be sent with the request |

**Returns:** `PositionMatrixRelationship_1&#124;error`

**Sample code:**

```ballerina
PositionMatrixRelationship_1 result = check client->getPositionMatrixRelationship(Position_code, Position_effectiveStartDate, matrixRelationshipType);
```

**Sample response:**

```json
{
  "d": {
    "Position_code": "1000",
    "Position_effectiveStartDate": "2026-01-01",
    "matrixRelationshipType": "string",
    "relatedPositionNav": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updatePositionMatrixRelationship</summary>

<div>

Updates the PositionMatrixRelationship identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Position_code` | <code>string</code> | Yes | key: Position_code |
| `Position_effectiveStartDate` | <code>string</code> | Yes | key: Position_effectiveStartDate |
| `matrixRelationshipType` | <code>string</code> | Yes | key: matrixRelationshipType |
| `payload` | <code>ModifiedPositionMatrixRelationship</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePositionMatrixRelationship(Position_code, Position_effectiveStartDate, matrixRelationshipType, payload);
```

</div>
</details>

<details>
<summary>deletePositionMatrixRelationship</summary>

<div>

Deletes the PositionMatrixRelationship identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `Position_code` | <code>string</code> | Yes | key: Position_code |
| `Position_effectiveStartDate` | <code>string</code> | Yes | key: Position_effectiveStartDate |
| `matrixRelationshipType` | <code>string</code> | Yes | key: matrixRelationshipType |
| `headers` | <code>DeletePositionMatrixRelationshipHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePositionMatrixRelationship(Position_code, Position_effectiveStartDate, matrixRelationshipType);
```

</div>
</details>

#### Position

<details>
<summary>listPositions</summary>

<div>

Queries the Position collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listPositions();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "code": "1000",
        "effectiveStartDate": "2026-01-01",
        "parentPosition": {},
        "positionMatrixRelationship": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPosition</summary>

<div>

Creates a new Position entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Position</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPosition&#124;error`

**Sample code:**

```ballerina
CreatedPosition result = check client->createPosition(payload);
```

**Sample response:**

```json
{
  "d": {
    "code": "1000",
    "effectiveStartDate": "2026-01-01",
    "parentPosition": {},
    "positionMatrixRelationship": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getPosition</summary>

<div>

Retrieves a single Position entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPositionQueries</code> | No | Queries to be sent with the request |

**Returns:** `Position_1&#124;error`

**Sample code:**

```ballerina
Position_1 result = check client->getPosition(code, effectiveStartDate);
```

**Sample response:**

```json
{
  "d": {
    "code": "1000",
    "effectiveStartDate": "2026-01-01",
    "parentPosition": {},
    "positionMatrixRelationship": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>updatePosition</summary>

<div>

Updates the Position identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `payload` | <code>ModifiedPosition</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePosition(code, effectiveStartDate, payload);
```

</div>
</details>

<details>
<summary>deletePosition</summary>

<div>

Deletes the Position identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | key: code |
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `headers` | <code>DeletePositionHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePosition(code, effectiveStartDate);
```

</div>
</details>

#### getPositionObjectData

<details>
<summary>getgetPositionObjectData</summary>

<div>

Retrieves a single getPositionObjectData entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetgetPositionObjectDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->getgetPositionObjectData();
```

**Sample response:**

```json
{
  "d": {
    "ruleFieldMappings": {}
  }
}
```

</div>
</details>

#### PositionRightToReturn

<details>
<summary>listPositionRightToReturns</summary>

<div>

Queries the PositionRightToReturn collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPositionRightToReturnsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listPositionRightToReturns();
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

<details>
<summary>getPositionRightToReturn</summary>

<div>

Retrieves a single PositionRightToReturn entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PositionRightToReturn_1&#124;error`

**Sample code:**

```ballerina
PositionRightToReturn_1 result = check client->getPositionRightToReturn(externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

