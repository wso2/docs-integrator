---
connector: true
connector_name: "sap.successfactors.ecpaymentinformation"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecpaymentinformation` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecpaymentinformation objects: PaymentInformationDetailV3KEN, PaymentInformationDetailV3ISR, PaymentInformationDetailV3, PaymentInformationDetailV3ARG, PaymentMethodV3, Bank, CustomPayTypeAssignment, CustomPayType…, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to maintain the country-dependent fields of payment information details for specific countries.

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
import ballerinax/sap.successfactors.ecpaymentinformation;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecpaymentinformation:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### PaymentInformationDetailV3KEN

<details>
<summary>listPaymentInformationDetailV3KENs</summary>

<div>

Queries the PaymentInformationDetailV3KEN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3KENsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listPaymentInformationDetailV3KENs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3KEN</summary>

<div>

Creates a new PaymentInformationDetailV3KEN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3KEN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3KEN&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3KEN result = check client->createPaymentInformationDetailV3KEN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3KEN</summary>

<div>

Retrieves a single PaymentInformationDetailV3KEN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3KENQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3KEN&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3KEN result = check client->getPaymentInformationDetailV3KEN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3KEN</summary>

<div>

Updates the PaymentInformationDetailV3KEN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3KEN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3KEN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3KEN</summary>

<div>

Deletes the PaymentInformationDetailV3KEN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3KENHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3KEN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ISR

<details>
<summary>listPaymentInformationDetailV3ISRs</summary>

<div>

Queries the PaymentInformationDetailV3ISR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ISRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listPaymentInformationDetailV3ISRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ISR</summary>

<div>

Creates a new PaymentInformationDetailV3ISR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ISR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ISR&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ISR result = check client->createPaymentInformationDetailV3ISR(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ISR</summary>

<div>

Retrieves a single PaymentInformationDetailV3ISR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ISRQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ISR&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ISR result = check client->getPaymentInformationDetailV3ISR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ISR</summary>

<div>

Updates the PaymentInformationDetailV3ISR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ISR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ISR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ISR</summary>

<div>

Deletes the PaymentInformationDetailV3ISR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ISRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ISR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3

<details>
<summary>listPaymentInformationDetailV3s</summary>

<div>

Queries the PaymentInformationDetailV3 collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3sQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listPaymentInformationDetailV3s();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3</summary>

<div>

Creates a new PaymentInformationDetailV3 entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3 result = check client->createPaymentInformationDetailV3(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3</summary>

<div>

Retrieves a single PaymentInformationDetailV3 entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3Queries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3 result = check client->getPaymentInformationDetailV3(PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3</summary>

<div>

Updates the PaymentInformationDetailV3 identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3(PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3</summary>

<div>

Deletes the PaymentInformationDetailV3 identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3Headers</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3(PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ARG

<details>
<summary>listPaymentInformationDetailV3ARGs</summary>

<div>

Queries the PaymentInformationDetailV3ARG collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ARGsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listPaymentInformationDetailV3ARGs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ARG</summary>

<div>

Creates a new PaymentInformationDetailV3ARG entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ARG</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ARG&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ARG result = check client->createPaymentInformationDetailV3ARG(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ARG</summary>

<div>

Retrieves a single PaymentInformationDetailV3ARG entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ARGQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ARG&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ARG result = check client->getPaymentInformationDetailV3ARG(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ARG</summary>

<div>

Updates the PaymentInformationDetailV3ARG identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ARG</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ARG(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ARG</summary>

<div>

Deletes the PaymentInformationDetailV3ARG identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ARGHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ARG(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentMethodV3

<details>
<summary>listPaymentMethodV3s</summary>

<div>

Queries the PaymentMethodV3 collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentMethodV3sQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listPaymentMethodV3s();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "externalCode": "1000",
        "toPaymentMethodAssignmentV3": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentMethodV3</summary>

<div>

Creates a new PaymentMethodV3 entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentMethodV3</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentMethodV3&#124;error`

**Sample code:**

```ballerina
CreatedPaymentMethodV3 result = check client->createPaymentMethodV3(payload);
```

**Sample response:**

```json
{
  "d": {
    "externalCode": "1000",
    "toPaymentMethodAssignmentV3": {
      "results": []
    }
  }
}
```

</div>
</details>

<details>
<summary>getPaymentMethodV3</summary>

<div>

Retrieves a single PaymentMethodV3 entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentMethodV3Queries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentMethodV3&#124;error`

**Sample code:**

```ballerina
PaymentMethodV3 result = check client->getPaymentMethodV3(externalCode);
```

**Sample response:**

```json
{
  "externalCode": "1000",
  "toPaymentMethodAssignmentV3": {
    "results": [
      {
        "PaymentMethodV3_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>updatePaymentMethodV3</summary>

<div>

Updates the PaymentMethodV3 identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentMethodV3</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentMethodV3(externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentMethodV3</summary>

<div>

Deletes the PaymentMethodV3 identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentMethodV3Headers</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentMethodV3(externalCode);
```

</div>
</details>

#### Bank

<details>
<summary>listBanks</summary>

<div>

Queries the Bank collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBanksQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listBanks();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createBank</summary>

<div>

Creates a new Bank entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Bank</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedBank&#124;error`

**Sample code:**

```ballerina
CreatedBank result = check client->createBank(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getBank</summary>

<div>

Retrieves a single Bank entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBankQueries</code> | No | Queries to be sent with the request |

**Returns:** `Bank&#124;error`

**Sample code:**

```ballerina
Bank result = check client->getBank(externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updateBank</summary>

<div>

Updates the Bank identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedBank</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBank(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteBank</summary>

<div>

Deletes the Bank identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteBankHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBank(externalCode);
```

</div>
</details>

#### CustomPayTypeAssignment

<details>
<summary>listCustomPayTypeAssignments</summary>

<div>

Queries the CustomPayTypeAssignment collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCustomPayTypeAssignmentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listCustomPayTypeAssignments();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCustomPayTypeAssignment</summary>

<div>

Creates a new CustomPayTypeAssignment entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CustomPayTypeAssignment</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCustomPayTypeAssignment&#124;error`

**Sample code:**

```ballerina
CreatedCustomPayTypeAssignment result = check client->createCustomPayTypeAssignment(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getCustomPayTypeAssignment</summary>

<div>

Retrieves a single CustomPayTypeAssignment entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `CustomPayType_externalCode` | <code>string</code> | Yes | key: CustomPayType_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCustomPayTypeAssignmentQueries</code> | No | Queries to be sent with the request |

**Returns:** `CustomPayTypeAssignment&#124;error`

**Sample code:**

```ballerina
CustomPayTypeAssignment result = check client->getCustomPayTypeAssignment(CustomPayType_externalCode, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updateCustomPayTypeAssignment</summary>

<div>

Updates the CustomPayTypeAssignment identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `CustomPayType_externalCode` | <code>string</code> | Yes | key: CustomPayType_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCustomPayTypeAssignment</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCustomPayTypeAssignment(CustomPayType_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteCustomPayTypeAssignment</summary>

<div>

Deletes the CustomPayTypeAssignment identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `CustomPayType_externalCode` | <code>string</code> | Yes | key: CustomPayType_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCustomPayTypeAssignmentHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCustomPayTypeAssignment(CustomPayType_externalCode, externalCode);
```

</div>
</details>

#### CustomPayType

<details>
<summary>listCustomPayTypes</summary>

<div>

Queries the CustomPayType collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCustomPayTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listCustomPayTypes();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createCustomPayType</summary>

<div>

Creates a new CustomPayType entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CustomPayType</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedCustomPayType&#124;error`

**Sample code:**

```ballerina
CreatedCustomPayType result = check client->createCustomPayType(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getCustomPayType</summary>

<div>

Retrieves a single CustomPayType entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCustomPayTypeQueries</code> | No | Queries to be sent with the request |

**Returns:** `CustomPayType&#124;error`

**Sample code:**

```ballerina
CustomPayType result = check client->getCustomPayType(externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updateCustomPayType</summary>

<div>

Updates the CustomPayType identified by its key property with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedCustomPayType</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCustomPayType(externalCode, payload);
```

</div>
</details>

<details>
<summary>deleteCustomPayType</summary>

<div>

Deletes the CustomPayType identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>DeleteCustomPayTypeHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCustomPayType(externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3NGA

<details>
<summary>listPaymentInformationDetailV3NGAs</summary>

<div>

Queries the PaymentInformationDetailV3NGA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3NGAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listPaymentInformationDetailV3NGAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3NGA</summary>

<div>

Creates a new PaymentInformationDetailV3NGA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3NGA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3NGA&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3NGA result = check client->createPaymentInformationDetailV3NGA(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3NGA</summary>

<div>

Retrieves a single PaymentInformationDetailV3NGA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3NGAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3NGA&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3NGA result = check client->getPaymentInformationDetailV3NGA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3NGA</summary>

<div>

Updates the PaymentInformationDetailV3NGA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3NGA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3NGA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3NGA</summary>

<div>

Deletes the PaymentInformationDetailV3NGA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3NGAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3NGA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3CZE

<details>
<summary>listPaymentInformationDetailV3CZEs</summary>

<div>

Queries the PaymentInformationDetailV3CZE collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3CZEsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listPaymentInformationDetailV3CZEs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3CZE</summary>

<div>

Creates a new PaymentInformationDetailV3CZE entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3CZE</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3CZE&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3CZE result = check client->createPaymentInformationDetailV3CZE(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3CZE</summary>

<div>

Retrieves a single PaymentInformationDetailV3CZE entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of the entity PaymentInformationV3_ |
| `externalCode` | <code>int</code> | Yes | the externalCode of PaymentInformationDetailV3CZE |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3CZEQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3CZE&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3CZE result = check client->getPaymentInformationDetailV3CZE(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3CZE</summary>

<div>

Updates the PaymentInformationDetailV3CZE identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | The effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | The worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | The externalCode of entity PaymentInformationDetailV3CZE |
| `payload` | <code>ModifiedPaymentInformationDetailV3CZE</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3CZE(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3CZE</summary>

<div>

Deletes the PaymentInformationDetailV3CZE identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3CZE |
| `headers` | <code>DeletePaymentInformationDetailV3CZEHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3CZE(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationV3

<details>
<summary>listPaymentInformationV3s</summary>

<div>

Queries the PaymentInformationV3 collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationV3sQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listPaymentInformationV3s();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationV3</summary>

<div>

Creates a new PaymentInformationV3 entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationV3</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationV3&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationV3 result = check client->createPaymentInformationV3(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationV3</summary>

<div>

Retrieves a single PaymentInformationV3 entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `'worker` | <code>string</code> | Yes | key: worker |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationV3Queries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationV3&#124;error`

**Sample code:**

```ballerina
PaymentInformationV3 result = check client->getPaymentInformationV3(effectiveStartDate, 'worker);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationV3</summary>

<div>

Updates the PaymentInformationV3 identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `'worker` | <code>string</code> | Yes | key: worker |
| `payload` | <code>ModifiedPaymentInformationV3</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationV3(effectiveStartDate, 'worker, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationV3</summary>

<div>

Deletes the PaymentInformationV3 identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `effectiveStartDate` | <code>string</code> | Yes | key: effectiveStartDate |
| `'worker` | <code>string</code> | Yes | key: worker |
| `headers` | <code>DeletePaymentInformationV3Headers</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationV3(effectiveStartDate, 'worker);
```

</div>
</details>

#### PaymentInformationDetailV3COL

<details>
<summary>listPaymentInformationDetailV3COLs</summary>

<div>

Queries the PaymentInformationDetailV3COL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3COLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listPaymentInformationDetailV3COLs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3COL</summary>

<div>

Creates a new PaymentInformationDetailV3COL entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3COL</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3COL&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3COL result = check client->createPaymentInformationDetailV3COL(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3COL</summary>

<div>

Retrieves a single PaymentInformationDetailV3COL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3COLQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3COL&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3COL result = check client->getPaymentInformationDetailV3COL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3COL</summary>

<div>

Updates the PaymentInformationDetailV3COL identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3COL</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3COL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3COL</summary>

<div>

Deletes the PaymentInformationDetailV3COL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3COLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3COL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3VEN

<details>
<summary>listPaymentInformationDetailV3VENs</summary>

<div>

Queries the PaymentInformationDetailV3VEN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3VENsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listPaymentInformationDetailV3VENs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3VEN</summary>

<div>

Creates a new PaymentInformationDetailV3VEN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3VEN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3VEN&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3VEN result = check client->createPaymentInformationDetailV3VEN(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3VEN</summary>

<div>

Retrieves a single PaymentInformationDetailV3VEN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3VENQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3VEN&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3VEN result = check client->getPaymentInformationDetailV3VEN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3VEN</summary>

<div>

Updates the PaymentInformationDetailV3VEN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3VEN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3VEN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3VEN</summary>

<div>

Deletes the PaymentInformationDetailV3VEN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3VENHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3VEN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3NZL

<details>
<summary>listPaymentInformationDetailV3NZLs</summary>

<div>

Queries the PaymentInformationDetailV3NZL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3NZLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listPaymentInformationDetailV3NZLs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3NZL</summary>

<div>

Creates a new PaymentInformationDetailV3NZL entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3NZL</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3NZL&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3NZL result = check client->createPaymentInformationDetailV3NZL(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3NZL</summary>

<div>

Retrieves a single PaymentInformationDetailV3NZL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3NZLQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3NZL&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3NZL result = check client->getPaymentInformationDetailV3NZL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3NZL</summary>

<div>

Updates the PaymentInformationDetailV3NZL identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3NZL</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3NZL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3NZL</summary>

<div>

Deletes the PaymentInformationDetailV3NZL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3NZLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3NZL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3USA

<details>
<summary>listPaymentInformationDetailV3USAs</summary>

<div>

Queries the PaymentInformationDetailV3USA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3USAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listPaymentInformationDetailV3USAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3USA</summary>

<div>

Creates a new PaymentInformationDetailV3USA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3USA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3USA&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3USA result = check client->createPaymentInformationDetailV3USA(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3USA</summary>

<div>

Retrieves a single PaymentInformationDetailV3USA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3USAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3USA&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3USA result = check client->getPaymentInformationDetailV3USA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3USA</summary>

<div>

Updates the PaymentInformationDetailV3USA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3USA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3USA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3USA</summary>

<div>

Deletes the PaymentInformationDetailV3USA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3USAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3USA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ECU

<details>
<summary>listPaymentInformationDetailV3ECUs</summary>

<div>

Queries the PaymentInformationDetailV3ECU collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ECUsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listPaymentInformationDetailV3ECUs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ECU</summary>

<div>

Creates a new PaymentInformationDetailV3ECU entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ECU</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ECU&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ECU result = check client->createPaymentInformationDetailV3ECU(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ECU</summary>

<div>

Retrieves a single PaymentInformationDetailV3ECU entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ECUQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ECU&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ECU result = check client->getPaymentInformationDetailV3ECU(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ECU</summary>

<div>

Updates the PaymentInformationDetailV3ECU identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ECU</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ECU(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ECU</summary>

<div>

Deletes the PaymentInformationDetailV3ECU identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ECUHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ECU(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3GBR

<details>
<summary>listPaymentInformationDetailV3GBRs</summary>

<div>

Queries the PaymentInformationDetailV3GBR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3GBRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listPaymentInformationDetailV3GBRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3GBR</summary>

<div>

Creates a new PaymentInformationDetailV3GBR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3GBR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3GBR&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3GBR result = check client->createPaymentInformationDetailV3GBR(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3GBR</summary>

<div>

Retrieves a single PaymentInformationDetailV3GBR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3GBRQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3GBR&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3GBR result = check client->getPaymentInformationDetailV3GBR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3GBR</summary>

<div>

Updates the PaymentInformationDetailV3GBR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3GBR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3GBR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3GBR</summary>

<div>

Deletes the PaymentInformationDetailV3GBR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3GBRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3GBR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3FRA

<details>
<summary>listPaymentInformationDetailV3FRAs</summary>

<div>

Queries the PaymentInformationDetailV3FRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3FRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listPaymentInformationDetailV3FRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3FRA</summary>

<div>

Creates a new PaymentInformationDetailV3FRA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3FRA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3FRA&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3FRA result = check client->createPaymentInformationDetailV3FRA(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3FRA</summary>

<div>

Retrieves a single PaymentInformationDetailV3FRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3FRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3FRA&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3FRA result = check client->getPaymentInformationDetailV3FRA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3FRA</summary>

<div>

Updates the PaymentInformationDetailV3FRA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3FRA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3FRA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3FRA</summary>

<div>

Deletes the PaymentInformationDetailV3FRA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3FRAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3FRA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentMethodAssignmentV3

<details>
<summary>listPaymentMethodAssignmentV3s</summary>

<div>

Queries the PaymentMethodAssignmentV3 collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentMethodAssignmentV3sQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listPaymentMethodAssignmentV3s();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentMethodV3_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentMethodAssignmentV3</summary>

<div>

Creates a new PaymentMethodAssignmentV3 entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentMethodAssignmentV3</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentMethodAssignmentV3&#124;error`

**Sample code:**

```ballerina
CreatedPaymentMethodAssignmentV3 result = check client->createPaymentMethodAssignmentV3(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentMethodV3_externalCode": "1000",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentMethodAssignmentV3</summary>

<div>

Retrieves a single PaymentMethodAssignmentV3 entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentMethodV3_externalCode` | <code>string</code> | Yes | key: PaymentMethodV3_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentMethodAssignmentV3Queries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentMethodAssignmentV3&#124;error`

**Sample code:**

```ballerina
PaymentMethodAssignmentV3 result = check client->getPaymentMethodAssignmentV3(PaymentMethodV3_externalCode, externalCode);
```

**Sample response:**

```json
{
  "PaymentMethodV3_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentMethodAssignmentV3</summary>

<div>

Updates the PaymentMethodAssignmentV3 identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentMethodV3_externalCode` | <code>string</code> | Yes | key: PaymentMethodV3_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentMethodAssignmentV3</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentMethodAssignmentV3(PaymentMethodV3_externalCode, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentMethodAssignmentV3</summary>

<div>

Deletes the PaymentMethodAssignmentV3 identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentMethodV3_externalCode` | <code>string</code> | Yes | key: PaymentMethodV3_externalCode |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentMethodAssignmentV3Headers</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentMethodAssignmentV3(PaymentMethodV3_externalCode, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3JPN

<details>
<summary>listPaymentInformationDetailV3JPNs</summary>

<div>

Queries the PaymentInformationDetailV3JPN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3JPNsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_19&#124;error`

**Sample code:**

```ballerina
Wrapper_19 result = check client->listPaymentInformationDetailV3JPNs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3JPN</summary>

<div>

Creates a new PaymentInformationDetailV3JPN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3JPN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3JPN&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3JPN result = check client->createPaymentInformationDetailV3JPN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3JPN</summary>

<div>

Retrieves a single PaymentInformationDetailV3JPN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3JPNQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3JPN&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3JPN result = check client->getPaymentInformationDetailV3JPN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3JPN</summary>

<div>

Updates the PaymentInformationDetailV3JPN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3JPN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3JPN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3JPN</summary>

<div>

Deletes the PaymentInformationDetailV3JPN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3JPNHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3JPN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ZAF

<details>
<summary>listPaymentInformationDetailV3ZAFs</summary>

<div>

Queries the PaymentInformationDetailV3ZAF collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ZAFsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_20&#124;error`

**Sample code:**

```ballerina
Wrapper_20 result = check client->listPaymentInformationDetailV3ZAFs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ZAF</summary>

<div>

Creates a new PaymentInformationDetailV3ZAF entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ZAF</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ZAF&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ZAF result = check client->createPaymentInformationDetailV3ZAF(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ZAF</summary>

<div>

Retrieves a single PaymentInformationDetailV3ZAF entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ZAFQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ZAF&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ZAF result = check client->getPaymentInformationDetailV3ZAF(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ZAF</summary>

<div>

Updates the PaymentInformationDetailV3ZAF identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ZAF</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ZAF(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ZAF</summary>

<div>

Deletes the PaymentInformationDetailV3ZAF identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ZAFHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ZAF(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ITA

<details>
<summary>listPaymentInformationDetailV3ITAs</summary>

<div>

Queries the PaymentInformationDetailV3ITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_21&#124;error`

**Sample code:**

```ballerina
Wrapper_21 result = check client->listPaymentInformationDetailV3ITAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ITA</summary>

<div>

Creates a new PaymentInformationDetailV3ITA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ITA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ITA&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ITA result = check client->createPaymentInformationDetailV3ITA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ITA</summary>

<div>

Retrieves a single PaymentInformationDetailV3ITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ITA&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ITA result = check client->getPaymentInformationDetailV3ITA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ITA</summary>

<div>

Updates the PaymentInformationDetailV3ITA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ITA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ITA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ITA</summary>

<div>

Deletes the PaymentInformationDetailV3ITA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ITAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ITA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3MEX

<details>
<summary>listPaymentInformationDetailV3MEXs</summary>

<div>

Queries the PaymentInformationDetailV3MEX collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3MEXsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_22&#124;error`

**Sample code:**

```ballerina
Wrapper_22 result = check client->listPaymentInformationDetailV3MEXs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3MEX</summary>

<div>

Creates a new PaymentInformationDetailV3MEX entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3MEX</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3MEX&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3MEX result = check client->createPaymentInformationDetailV3MEX(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3MEX</summary>

<div>

Retrieves a single PaymentInformationDetailV3MEX entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3MEXQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3MEX&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3MEX result = check client->getPaymentInformationDetailV3MEX(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3MEX</summary>

<div>

Updates the PaymentInformationDetailV3MEX identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3MEX</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3MEX(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3MEX</summary>

<div>

Deletes the PaymentInformationDetailV3MEX identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3MEXHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3MEX(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ESP

<details>
<summary>listPaymentInformationDetailV3ESPs</summary>

<div>

Queries the PaymentInformationDetailV3ESP collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ESPsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_23&#124;error`

**Sample code:**

```ballerina
Wrapper_23 result = check client->listPaymentInformationDetailV3ESPs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ESP</summary>

<div>

Creates a new PaymentInformationDetailV3ESP entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ESP</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ESP&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ESP result = check client->createPaymentInformationDetailV3ESP(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ESP</summary>

<div>

Retrieves a single PaymentInformationDetailV3ESP entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ESPQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ESP&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ESP result = check client->getPaymentInformationDetailV3ESP(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ESP</summary>

<div>

Updates the PaymentInformationDetailV3ESP identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ESP</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ESP(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ESP</summary>

<div>

Deletes the PaymentInformationDetailV3ESP identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ESPHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ESP(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3BRA

<details>
<summary>listPaymentInformationDetailV3BRAs</summary>

<div>

Queries the PaymentInformationDetailV3BRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3BRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_24&#124;error`

**Sample code:**

```ballerina
Wrapper_24 result = check client->listPaymentInformationDetailV3BRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3BRA</summary>

<div>

Creates a new PaymentInformationDetailV3BRA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3BRA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3BRA&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3BRA result = check client->createPaymentInformationDetailV3BRA(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3BRA</summary>

<div>

Retrieves a single PaymentInformationDetailV3BRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3BRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3BRA&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3BRA result = check client->getPaymentInformationDetailV3BRA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3BRA</summary>

<div>

Updates the PaymentInformationDetailV3BRA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3BRA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3BRA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3BRA</summary>

<div>

Deletes the PaymentInformationDetailV3BRA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3BRAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3BRA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3CHL

<details>
<summary>listPaymentInformationDetailV3CHLs</summary>

<div>

Queries the PaymentInformationDetailV3CHL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3CHLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_25&#124;error`

**Sample code:**

```ballerina
Wrapper_25 result = check client->listPaymentInformationDetailV3CHLs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3CHL</summary>

<div>

Creates a new PaymentInformationDetailV3CHL entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3CHL</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3CHL&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3CHL result = check client->createPaymentInformationDetailV3CHL(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3CHL</summary>

<div>

Retrieves a single PaymentInformationDetailV3CHL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3CHLQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3CHL&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3CHL result = check client->getPaymentInformationDetailV3CHL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3CHL</summary>

<div>

Updates the PaymentInformationDetailV3CHL identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3CHL</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3CHL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3CHL</summary>

<div>

Deletes the PaymentInformationDetailV3CHL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3CHLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3CHL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3BLR

<details>
<summary>listPaymentInformationDetailV3BLRs</summary>

<div>

Queries the PaymentInformationDetailV3BLR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3BLRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_26&#124;error`

**Sample code:**

```ballerina
Wrapper_26 result = check client->listPaymentInformationDetailV3BLRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3BLR</summary>

<div>

Creates a new PaymentInformationDetailV3BLR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3BLR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3BLR&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3BLR result = check client->createPaymentInformationDetailV3BLR(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3BLR</summary>

<div>

Retrieves a single PaymentInformationDetailV3BLR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3BLRQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3BLR&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3BLR result = check client->getPaymentInformationDetailV3BLR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3BLR</summary>

<div>

Updates the PaymentInformationDetailV3BLR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3BLR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3BLR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3BLR</summary>

<div>

Deletes the PaymentInformationDetailV3BLR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3BLRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3BLR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3IRQ

<details>
<summary>listPaymentInformationDetailV3IRQs</summary>

<div>

Queries the PaymentInformationDetailV3IRQ collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3IRQsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_27&#124;error`

**Sample code:**

```ballerina
Wrapper_27 result = check client->listPaymentInformationDetailV3IRQs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3IRQ</summary>

<div>

Creates a new PaymentInformationDetailV3IRQ entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3IRQ</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3IRQ&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3IRQ result = check client->createPaymentInformationDetailV3IRQ(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3IRQ</summary>

<div>

Retrieves a single PaymentInformationDetailV3IRQ entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3IRQQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3IRQ&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3IRQ result = check client->getPaymentInformationDetailV3IRQ(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3IRQ</summary>

<div>

Updates the PaymentInformationDetailV3IRQ identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3IRQ</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3IRQ(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3IRQ</summary>

<div>

Deletes the PaymentInformationDetailV3IRQ identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3IRQHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3IRQ(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3MMR

<details>
<summary>listPaymentInformationDetailV3MMRs</summary>

<div>

Queries the PaymentInformationDetailV3MMR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3MMRsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_28&#124;error`

**Sample code:**

```ballerina
Wrapper_28 result = check client->listPaymentInformationDetailV3MMRs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3MMR</summary>

<div>

Creates a new PaymentInformationDetailV3MMR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3MMR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3MMR&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3MMR result = check client->createPaymentInformationDetailV3MMR(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3MMR</summary>

<div>

Retrieves a single PaymentInformationDetailV3MMR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3MMRQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3MMR&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3MMR result = check client->getPaymentInformationDetailV3MMR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3MMR</summary>

<div>

Updates the PaymentInformationDetailV3MMR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3MMR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3MMR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3MMR</summary>

<div>

Deletes the PaymentInformationDetailV3MMR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3MMRHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3MMR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3MWI

<details>
<summary>listPaymentInformationDetailV3MWIs</summary>

<div>

Queries the PaymentInformationDetailV3MWI collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3MWIsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_29&#124;error`

**Sample code:**

```ballerina
Wrapper_29 result = check client->listPaymentInformationDetailV3MWIs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3MWI</summary>

<div>

Creates a new PaymentInformationDetailV3MWI entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3MWI</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3MWI&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3MWI result = check client->createPaymentInformationDetailV3MWI(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3MWI</summary>

<div>

Retrieves a single PaymentInformationDetailV3MWI entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3MWIQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3MWI&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3MWI result = check client->getPaymentInformationDetailV3MWI(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3MWI</summary>

<div>

Updates the PaymentInformationDetailV3MWI identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3MWI</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3MWI(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3MWI</summary>

<div>

Deletes the PaymentInformationDetailV3MWI identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3MWIHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3MWI(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3NAM

<details>
<summary>listPaymentInformationDetailV3NAMs</summary>

<div>

Queries the PaymentInformationDetailV3NAM collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3NAMsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_30&#124;error`

**Sample code:**

```ballerina
Wrapper_30 result = check client->listPaymentInformationDetailV3NAMs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3NAM</summary>

<div>

Creates a new PaymentInformationDetailV3NAM entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3NAM</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3NAM&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3NAM result = check client->createPaymentInformationDetailV3NAM(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3NAM</summary>

<div>

Retrieves a single PaymentInformationDetailV3NAM entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3NAMQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3NAM&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3NAM result = check client->getPaymentInformationDetailV3NAM(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3NAM</summary>

<div>

Updates the PaymentInformationDetailV3NAM identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3NAM</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3NAM(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3NAM</summary>

<div>

Deletes the PaymentInformationDetailV3NAM identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3NAMHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3NAM(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3PER

<details>
<summary>listPaymentInformationDetailV3PERs</summary>

<div>

Queries the PaymentInformationDetailV3PER collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3PERsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_31&#124;error`

**Sample code:**

```ballerina
Wrapper_31 result = check client->listPaymentInformationDetailV3PERs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3PER</summary>

<div>

Creates a new PaymentInformationDetailV3PER entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3PER</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3PER&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3PER result = check client->createPaymentInformationDetailV3PER(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3PER</summary>

<div>

Retrieves a single PaymentInformationDetailV3PER entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3PERQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3PER&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3PER result = check client->getPaymentInformationDetailV3PER(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3PER</summary>

<div>

Updates the PaymentInformationDetailV3PER identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3PER</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3PER(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3PER</summary>

<div>

Deletes the PaymentInformationDetailV3PER identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3PERHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3PER(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3ZWE

<details>
<summary>listPaymentInformationDetailV3ZWEs</summary>

<div>

Queries the PaymentInformationDetailV3ZWE collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3ZWEsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_32&#124;error`

**Sample code:**

```ballerina
Wrapper_32 result = check client->listPaymentInformationDetailV3ZWEs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3ZWE</summary>

<div>

Creates a new PaymentInformationDetailV3ZWE entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3ZWE</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3ZWE&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3ZWE result = check client->createPaymentInformationDetailV3ZWE(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3ZWE</summary>

<div>

Retrieves a single PaymentInformationDetailV3ZWE entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3ZWEQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3ZWE&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3ZWE result = check client->getPaymentInformationDetailV3ZWE(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3ZWE</summary>

<div>

Updates the PaymentInformationDetailV3ZWE identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3ZWE</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3ZWE(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3ZWE</summary>

<div>

Deletes the PaymentInformationDetailV3ZWE identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3ZWEHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3ZWE(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3SVN

<details>
<summary>listPaymentInformationDetailV3SVNs</summary>

<div>

Queries the PaymentInformationDetailV3SVN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3SVNsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_33&#124;error`

**Sample code:**

```ballerina
Wrapper_33 result = check client->listPaymentInformationDetailV3SVNs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3SVN</summary>

<div>

Creates a new PaymentInformationDetailV3SVN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3SVN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3SVN&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3SVN result = check client->createPaymentInformationDetailV3SVN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3SVN</summary>

<div>

Retrieves a single PaymentInformationDetailV3SVN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3SVNQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3SVN&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3SVN result = check client->getPaymentInformationDetailV3SVN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3SVN</summary>

<div>

Updates the PaymentInformationDetailV3SVN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3SVN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3SVN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3SVN</summary>

<div>

Deletes the PaymentInformationDetailV3SVN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3SVNHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3SVN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3MKD

<details>
<summary>listPaymentInformationDetailV3MKDs</summary>

<div>

Queries the PaymentInformationDetailV3MKD collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3MKDsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_34&#124;error`

**Sample code:**

```ballerina
Wrapper_34 result = check client->listPaymentInformationDetailV3MKDs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3MKD</summary>

<div>

Creates a new PaymentInformationDetailV3MKD entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3MKD</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3MKD&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3MKD result = check client->createPaymentInformationDetailV3MKD(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3MKD</summary>

<div>

Retrieves a single PaymentInformationDetailV3MKD entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3MKDQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3MKD&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3MKD result = check client->getPaymentInformationDetailV3MKD(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3MKD</summary>

<div>

Updates the PaymentInformationDetailV3MKD identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3MKD</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3MKD(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3MKD</summary>

<div>

Deletes the PaymentInformationDetailV3MKD identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3MKDHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3MKD(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3MOZ

<details>
<summary>listPaymentInformationDetailV3MOZs</summary>

<div>

Queries the PaymentInformationDetailV3MOZ collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3MOZsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_35&#124;error`

**Sample code:**

```ballerina
Wrapper_35 result = check client->listPaymentInformationDetailV3MOZs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3MOZ</summary>

<div>

Creates a new PaymentInformationDetailV3MOZ entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3MOZ</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3MOZ&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3MOZ result = check client->createPaymentInformationDetailV3MOZ(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3MOZ</summary>

<div>

Retrieves a single PaymentInformationDetailV3MOZ entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3MOZQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3MOZ&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3MOZ result = check client->getPaymentInformationDetailV3MOZ(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3MOZ</summary>

<div>

Updates the PaymentInformationDetailV3MOZ identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3MOZ</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3MOZ(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3MOZ</summary>

<div>

Deletes the PaymentInformationDetailV3MOZ identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3MOZHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3MOZ(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3GHA

<details>
<summary>listPaymentInformationDetailV3GHAs</summary>

<div>

Queries the PaymentInformationDetailV3GHA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3GHAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_36&#124;error`

**Sample code:**

```ballerina
Wrapper_36 result = check client->listPaymentInformationDetailV3GHAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3GHA</summary>

<div>

Creates a new PaymentInformationDetailV3GHA entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3GHA</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3GHA&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3GHA result = check client->createPaymentInformationDetailV3GHA(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3GHA</summary>

<div>

Retrieves a single PaymentInformationDetailV3GHA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3GHAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3GHA&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3GHA result = check client->getPaymentInformationDetailV3GHA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3GHA</summary>

<div>

Updates the PaymentInformationDetailV3GHA identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3GHA</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3GHA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3GHA</summary>

<div>

Deletes the PaymentInformationDetailV3GHA identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3GHAHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3GHA(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3SVK

<details>
<summary>listPaymentInformationDetailV3SVKs</summary>

<div>

Queries the PaymentInformationDetailV3SVK collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3SVKsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_37&#124;error`

**Sample code:**

```ballerina
Wrapper_37 result = check client->listPaymentInformationDetailV3SVKs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3SVK</summary>

<div>

Creates a new PaymentInformationDetailV3SVK entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3SVK</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3SVK&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3SVK result = check client->createPaymentInformationDetailV3SVK(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3SVK</summary>

<div>

Retrieves a single PaymentInformationDetailV3SVK entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3SVK |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3SVKQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3SVK&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3SVK result = check client->getPaymentInformationDetailV3SVK(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3SVK</summary>

<div>

Updates the PaymentInformationDetailV3SVK identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3SVK |
| `payload` | <code>ModifiedPaymentInformationDetailV3SVK</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3SVK(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3SVK</summary>

<div>

Deletes the PaymentInformationDetailV3SVK identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3SVK |
| `headers` | <code>DeletePaymentInformationDetailV3SVKHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3SVK(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3TUN

<details>
<summary>listPaymentInformationDetailV3TUNs</summary>

<div>

Queries the PaymentInformationDetailV3TUN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3TUNsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_38&#124;error`

**Sample code:**

```ballerina
Wrapper_38 result = check client->listPaymentInformationDetailV3TUNs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3TUN</summary>

<div>

Creates a new PaymentInformationDetailV3TUN entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3TUN</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3TUN&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3TUN result = check client->createPaymentInformationDetailV3TUN(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3TUN</summary>

<div>

Retrieves a single PaymentInformationDetailV3TUN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of PaymentInformationDetailV3TUN |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3TUNQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3TUN&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3TUN result = check client->getPaymentInformationDetailV3TUN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3TUN</summary>

<div>

Updates the PaymentInformationDetailV3TUN identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of entity PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of entity PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3TUN |
| `payload` | <code>ModifiedPaymentInformationDetailV3TUN</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3TUN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3TUN</summary>

<div>

Deletes the PaymentInformationDetailV3TUN identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | the externalCode of entity PaymentInformationDetailV3 of the associated entity PaymentInformation |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | the effectiveStartDate of PaymentInformationV3 |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | the worker of PaymentInformationV3 |
| `externalCode` | <code>int</code> | Yes | the externalCode of PaymentInformationDetailV3TUN |
| `headers` | <code>DeletePaymentInformationDetailV3TUNHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3TUN(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3SUR

<details>
<summary>listPaymentInformationDetailV3SURs</summary>

<div>

Queries the PaymentInformationDetailV3SUR collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3SURsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_39&#124;error`

**Sample code:**

```ballerina
Wrapper_39 result = check client->listPaymentInformationDetailV3SURs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3SUR</summary>

<div>

Creates a new PaymentInformationDetailV3SUR entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3SUR</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3SUR&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3SUR result = check client->createPaymentInformationDetailV3SUR(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3SUR</summary>

<div>

Retrieves a single PaymentInformationDetailV3SUR entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3SURQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3SUR&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3SUR result = check client->getPaymentInformationDetailV3SUR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3SUR</summary>

<div>

Updates the PaymentInformationDetailV3SUR identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3SUR</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3SUR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3SUR</summary>

<div>

Deletes the PaymentInformationDetailV3SUR identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3SURHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3SUR(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3PRY

<details>
<summary>listPaymentInformationDetailV3PRYs</summary>

<div>

Queries the PaymentInformationDetailV3PRY collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3PRYsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_40&#124;error`

**Sample code:**

```ballerina
Wrapper_40 result = check client->listPaymentInformationDetailV3PRYs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3PRY</summary>

<div>

Creates a new PaymentInformationDetailV3PRY entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3PRY</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3PRY&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3PRY result = check client->createPaymentInformationDetailV3PRY(payload);
```

**Sample response:**

```json
{
  "d": {
    "d": {}
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3PRY</summary>

<div>

Retrieves a single PaymentInformationDetailV3PRY entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3PRYQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3PRY&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3PRY result = check client->getPaymentInformationDetailV3PRY(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3PRY</summary>

<div>

Updates the PaymentInformationDetailV3PRY identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3PRY</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3PRY(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3PRY</summary>

<div>

Deletes the PaymentInformationDetailV3PRY identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3PRYHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3PRY(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

#### PaymentInformationDetailV3BOL

<details>
<summary>listPaymentInformationDetailV3BOLs</summary>

<div>

Queries the PaymentInformationDetailV3BOL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentInformationDetailV3BOLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_41&#124;error`

**Sample code:**

```ballerina
Wrapper_41 result = check client->listPaymentInformationDetailV3BOLs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "PaymentInformationDetailV3_externalCode": "1000",
        "PaymentInformationV3_effectiveStartDate": "2026-01-01",
        "PaymentInformationV3_worker": "string",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>createPaymentInformationDetailV3BOL</summary>

<div>

Creates a new PaymentInformationDetailV3BOL entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentInformationDetailV3BOL</code> | Yes | New entity |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedPaymentInformationDetailV3BOL&#124;error`

**Sample code:**

```ballerina
CreatedPaymentInformationDetailV3BOL result = check client->createPaymentInformationDetailV3BOL(payload);
```

**Sample response:**

```json
{
  "d": {
    "PaymentInformationDetailV3_externalCode": "1000",
    "PaymentInformationV3_effectiveStartDate": "2026-01-01",
    "PaymentInformationV3_worker": "string",
    "externalCode": "1000"
  }
}
```

</div>
</details>

<details>
<summary>getPaymentInformationDetailV3BOL</summary>

<div>

Retrieves a single PaymentInformationDetailV3BOL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentInformationDetailV3BOLQueries</code> | No | Queries to be sent with the request |

**Returns:** `PaymentInformationDetailV3BOL&#124;error`

**Sample code:**

```ballerina
PaymentInformationDetailV3BOL result = check client->getPaymentInformationDetailV3BOL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

**Sample response:**

```json
{
  "PaymentInformationDetailV3_externalCode": "1000",
  "PaymentInformationV3_effectiveStartDate": "2026-01-01",
  "PaymentInformationV3_worker": "string",
  "externalCode": "1000"
}
```

</div>
</details>

<details>
<summary>updatePaymentInformationDetailV3BOL</summary>

<div>

Updates the PaymentInformationDetailV3BOL identified by its key properties with the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `payload` | <code>ModifiedPaymentInformationDetailV3BOL</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePaymentInformationDetailV3BOL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode, payload);
```

</div>
</details>

<details>
<summary>deletePaymentInformationDetailV3BOL</summary>

<div>

Deletes the PaymentInformationDetailV3BOL identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `PaymentInformationDetailV3_externalCode` | <code>int</code> | Yes | key: PaymentInformationDetailV3_externalCode |
| `PaymentInformationV3_effectiveStartDate` | <code>string</code> | Yes | key: PaymentInformationV3_effectiveStartDate |
| `PaymentInformationV3_worker` | <code>string</code> | Yes | key: PaymentInformationV3_worker |
| `externalCode` | <code>int</code> | Yes | key: externalCode |
| `headers` | <code>DeletePaymentInformationDetailV3BOLHeaders</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePaymentInformationDetailV3BOL(PaymentInformationDetailV3_externalCode, PaymentInformationV3_effectiveStartDate, PaymentInformationV3_worker, externalCode);
```

</div>
</details>

