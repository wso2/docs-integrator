---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_del_doc_with_credit_block` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Reads credit blocked delivery documents and rejection reasons, and checks, releases or rejects the credit block of a delivery document via the `API_DEL_DOC_WITH_CREDIT_BLOCK` OData API. |

---

## Client

Reads credit blocked delivery documents and rejection reasons, and checks, releases or rejects the credit block of a delivery document via the `API_DEL_DOC_WITH_CREDIT_BLOCK` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_DEL_DOC_WITH_CREDIT_BLOCK` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | Basic Auth credentials (username and password) of the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_del_doc_with_credit_block as delDoc;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

delDoc:Client delDocClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    hostname
);
```

### Operations

A delivery document is blocked by credit management when the credit check of SAP Credit Management fails for the customer's credit account. The read operations return these blocked documents, and the check, release and reject operations act on one delivery document at a time.

The check, release and reject operations are OData function imports. Their query parameters (`DeliveryDocument`, `SDDocumentCategory` and `SalesDocumentRjcnReason`) must be enclosed in single quotes, for example `"'80000012'"`. The sales and distribution document category of an outbound delivery is `J`.

In the query records, `$select` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers.

#### Credit blocked delivery documents

<details>
<summary>listA_CreditBlockedDeliveryDocs</summary>

Retrieves a collection of delivery documents that are blocked by credit management, with the sold-to party, customer credit account, released credit amount and the status of each credit check.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_CreditBlockedDeliveryDocsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_CreditBlockedDeliveryDocWrapper|error`

Sample code:

```ballerina
delDoc:CollectionOfA_CreditBlockedDeliveryDocWrapper result = check delDocClient->listA_CreditBlockedDeliveryDocs(
    queries = {
        \$filter: "SalesOrganization eq '1710'",
        \$top: 2,
        \$orderby: ["NextShippingDate"],
        \$select: ["DeliveryDocument", "SoldToParty", "CustomerCreditAccount", "NextShippingDate", "TotalCreditCheckStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "DeliveryDocument": "80000012",
        "SoldToParty": "17100001",
        "CustomerCreditAccount": "17100001",
        "NextShippingDate": "/Date(1729296000000)/",
        "TotalCreditCheckStatus": "B"
      },
      {
        "DeliveryDocument": "80000015",
        "SoldToParty": "17100003",
        "CustomerCreditAccount": "17100003",
        "NextShippingDate": "/Date(1729382400000)/",
        "TotalCreditCheckStatus": "B"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_CreditBlockedDeliveryDoc</summary>

Retrieves a single credit blocked delivery document by its delivery number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `DeliveryDocument` | `string` | Yes | Delivery number (e.g., `"80000012"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_CreditBlockedDeliveryDocQueries` | No | OData query parameters: `$select`. |

Returns: `A_CreditBlockedDeliveryDocWrapper|error`

Sample code:

```ballerina
delDoc:A_CreditBlockedDeliveryDocWrapper delivery = check delDocClient->getA_CreditBlockedDeliveryDoc("80000012");
```

Sample response:

```ballerina
{
  "d": {
    "DeliveryDocument": "80000012",
    "SDDocumentCategory": "J",
    "SalesOrganization": "1710",
    "SalesOffice": "",
    "ShippingPoint": "1710",
    "CreationDate": "/Date(1729123200000)/",
    "CreatedByUser": "CB9980000010",
    "LastChangedByUser": "",
    "LastChangeDate": null,
    "SoldToParty": "17100001",
    "CustomerCreditAccount": "17100001",
    "ControllingAreaCurrency": "USD",
    "ReleasedCreditAmount": "0.00",
    "CreditBlockReleaseDate": null,
    "NextShippingDate": "/Date(1729296000000)/",
    "CentralCreditChkTechErrSts": "",
    "OverallSDProcessStatus": "A",
    "OverallGoodsMovementStatus": "A",
    "TotalCreditCheckStatus": "B",
    "FinDocCreditCheckStatus": "",
    "CentralCreditCheckStatus": "B"
  }
}
```

</details>

#### Credit block actions

<details>
<summary>createCheckCreditBlock</summary>

Runs the credit check again for a specific delivery document, for example after the customer has paid open items or the credit limit has been raised. SAP returns a message with the result of the check.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateCheckCreditBlockQueries` | Yes | Function import parameters: `DeliveryDocument` and `SDDocumentCategory`, each enclosed in single quotes. |

Returns: `ReturnMessage_1|error`

Sample code:

```ballerina
delDoc:ReturnMessage_1 checkResult = check delDocClient->createCheckCreditBlock(
    queries = {
        DeliveryDocument: "'80000012'",
        SDDocumentCategory: "'J'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "CheckCreditBlock": {
      "MessageType": "S",
      "Message": "Credit check for delivery 80000012 was carried out"
    }
  }
}
```

</details>

<details>
<summary>createReleaseCreditBlock</summary>

Releases a specific delivery document from the credit block so that warehouse processing (picking, packing and goods issue) can continue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateReleaseCreditBlockQueries` | Yes | Function import parameters: `DeliveryDocument` and `SDDocumentCategory`, each enclosed in single quotes. |

Returns: `ReturnMessage_3|error`

Sample code:

```ballerina
delDoc:ReturnMessage_3 releaseResult = check delDocClient->createReleaseCreditBlock(
    queries = {
        DeliveryDocument: "'80000012'",
        SDDocumentCategory: "'J'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ReleaseCreditBlock": {
      "MessageType": "S",
      "Message": "Delivery 80000012 has been released"
    }
  }
}
```

</details>

<details>
<summary>createRejectCreditBlock</summary>

Rejects the credit block of a specific delivery document with a reason for rejection, so that the delivery is not shipped.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateRejectCreditBlockQueries` | Yes | Function import parameters: `DeliveryDocument`, `SDDocumentCategory` and `SalesDocumentRjcnReason` (the reason for rejection code, see [Rejection reasons](#rejection-reasons)), each enclosed in single quotes. |

Returns: `ReturnMessage_2|error`

Sample code:

```ballerina
delDoc:ReturnMessage_2 rejectResult = check delDocClient->createRejectCreditBlock(
    queries = {
        DeliveryDocument: "'80000015'",
        SDDocumentCategory: "'J'",
        SalesDocumentRjcnReason: "'05'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "RejectCreditBlock": {
      "MessageType": "S",
      "Message": "Delivery 80000015 has been rejected"
    }
  }
}
```

</details>

#### Rejection reasons

<details>
<summary>listA_SalesDocumentRjcnReasons</summary>

Retrieves the reasons for rejection of sales documents with their descriptions. Use one of these codes when you reject the credit block of a delivery document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SalesDocumentRjcnReasonsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_SalesDocumentRjcnReasonWrapper|error`

Sample code:

```ballerina
delDoc:CollectionOfA_SalesDocumentRjcnReasonWrapper reasons = check delDocClient->listA_SalesDocumentRjcnReasons(
    queries = {
        \$top: 3,
        \$orderby: ["SalesDocumentRjcnReason"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "SalesDocumentRjcnReason": "00",
        "SalesDocumentRjcnReason_Text": "Delivery date too late"
      },
      {
        "SalesDocumentRjcnReason": "01",
        "SalesDocumentRjcnReason_Text": "Poor quality"
      },
      {
        "SalesDocumentRjcnReason": "02",
        "SalesDocumentRjcnReason_Text": "Too expensive"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_SalesDocumentRjcnReason</summary>

Retrieves a single reason for rejection of sales documents by its code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `SalesDocumentRjcnReason` | `string` | Yes | Reason for rejection code, up to 2 characters (e.g., `"05"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SalesDocumentRjcnReasonQueries` | No | OData query parameters: `$select`. |

Returns: `A_SalesDocumentRjcnReasonWrapper|error`

Sample code:

```ballerina
delDoc:A_SalesDocumentRjcnReasonWrapper reason = check delDocClient->getA_SalesDocumentRjcnReason("05");
```

Sample response:

```ballerina
{
  "d": {
    "SalesDocumentRjcnReason": "05",
    "SalesDocumentRjcnReason_Text": "Unreasonable request"
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends multiple OData requests as a single HTTP `$batch` call, reducing round trips to the SAP server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_cb001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_CreditBlockedDeliveryDoc('80000012') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_SalesDocumentRjcnReason HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check delDocClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
