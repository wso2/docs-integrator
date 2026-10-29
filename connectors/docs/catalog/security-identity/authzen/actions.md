---
title: Actions
---

# Actions

The `ballerina/authzen` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Asks an AuthZEN Policy Decision Point (PDP) for access decisions, searches for the subjects, resources and actions an access applies to, and reads the PDP metadata. |

---

## Client

Asks an AuthZEN PDP for access decisions, searches for the subjects, resources and actions an access applies to, and reads the PDP metadata. A denied access is a decision of `false`, not an error. Operations return an error only when the PDP can't evaluate the request (an HTTP error status) or can't be reached.

### Configuration

The client is initialized with the PDP URL (`serviceUrl`) and the fields of a `ConnectionConfig` record, all optional.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:ClientAuthConfig\|ApiKeyConfig` | `()` | How the client authenticates to the PDP: a Bearer token, an OAuth 2.0 grant, Basic auth, a self-signed JWT or an API key. Leave unset for a PDP that doesn't authenticate its callers. |
| `discoverEndpoints` | `boolean` | `false` | Reads the PDP metadata when the client is created and sends each request to the endpoint the PDP advertises for it. An operation whose endpoint the PDP doesn't advertise then fails without calling the PDP. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `30` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration, including the client certificate for mutual TLS. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

The `ApiKeyConfig` record has the following fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKey` | `string` | Required | The API key, sent as the full value of the header. For the `Authorization` header, include the scheme the PDP expects, for example `Basic <key>`. |
| `headerName` | `string` | `"Authorization"` | The name of the header that carries the API key. |

### Initializing the client

```ballerina
import ballerina/authzen;

configurable string pdpUrl = ?;
configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

authzen:Client pdp = check new (pdpUrl,
    auth = {
        tokenUrl,
        clientId,
        clientSecret
    }
);
```

For a PDP that takes a Bearer token, set `auth = {token: accessToken}`. For an API key, set `auth = {apiKey: "<key>"}`, and add `headerName` to send it in a header other than `Authorization`. For a PDP that doesn't authenticate its callers, leave `auth` unset: `authzen:Client pdp = check new (pdpUrl);`.

### Operations

The samples below call the public Cerbos PDP of the [AuthZEN interoperability tests](https://authzen-interop.net), whose policies follow the interop scenarios: the evaluation samples use the users of the "todo" scenario (for example, Rick, an admin, and Morty, an editor), and the search samples use the users and records of the "search" scenario.

The operations use the AuthZEN information model:

| Record | Fields | Description |
|--------|--------|-------------|
| `Subject` | `'type`, `id`, `properties` | The user or machine principal the decision is about, for example `{'type: "user", id: "alice@example.com"}`. |
| `Action` | `name`, `properties` | The access the subject requests, for example `{name: "can_read"}`. |
| `Resource` | `'type`, `id`, `properties` | The target of the access, for example `{'type: "document", id: "123"}`. |
| `Context` | Any fields | Attributes of the environment, such as the time or the location of the request. |
| `Decision` | `decision`, `context` | The PDP's answer: `true` to permit, `false` to deny, with an optional context such as the reasons. |

`properties` holds any additional attributes the PDP's policies use, for example a document's owner or a user's department. Each operation also takes an optional `RequestHeaders` record whose `requestId` is sent as the `X-Request-ID` header, which the PDP returns in its response.

#### Access evaluation

<details>
<summary>evaluate</summary>

Asks whether the subject may perform the action on the resource, in the given context.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `EvaluationRequest` | Yes | The access request: `subject`, `action`, `resource` and an optional `context`. |
| `headers` | `RequestHeaders` | No | The `requestId` sent as the `X-Request-ID` header. |

Returns: `Decision|error`

Sample code:

```ballerina
authzen:Decision result = check pdp->evaluate({
    subject: {'type: "user", id: "CiRmZDA2MTRkMy1jMzlhLTQ3ODEtYjdiZC04Yjk2ZjVhNTEwMGQSBWxvY2Fs"},
    action: {name: "can_create_todo"},
    'resource: {'type: "todo", id: "todo-1"},
    context: {"time": "2026-10-28T10:00:00Z"}
}, {requestId: "req-1"});
```

Sample response:

```ballerina
{
  "decision": true,
  "context": {
    "reason_admin": {"200": "Access granted"},
    "reason_user": {"200": "Access granted"}
  }
}
```

</details>

<details>
<summary>evaluateBatch</summary>

Evaluates several access requests in one call. The top-level `subject`, `action`, `resource` and `context` are defaults that each entry of `evaluations` may override. The decisions come back in the order of the entries.

`options.evaluationsSemantic` selects how the PDP runs the entries: `execute_all` (the default) evaluates every entry, `deny_on_first_deny` stops at the first deny, and `permit_on_first_permit` stops at the first permit. With the last two, the response has fewer decisions than entries. A request without entries is a single evaluation, answered with a top-level `decision`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `BatchEvaluationRequest` | Yes | The default `subject`, `action`, `resource` and `context`, the `evaluations` entries, and the `options`. |
| `headers` | `RequestHeaders` | No | The `requestId` sent as the `X-Request-ID` header. |

Returns: `BatchEvaluationResponse|error`

Sample code:

```ballerina
authzen:BatchEvaluationResponse result = check pdp->evaluateBatch({
    subject: {'type: "user", id: "CiRmZDE2MTRkMy1jMzlhLTQ3ODEtYjdiZC04Yjk2ZjVhNTEwMGQSBWxvY2Fs"},
    'resource: {'type: "todo", id: "t-1"},
    evaluations: [
        {action: {name: "can_read_todos"}},
        {action: {name: "can_create_todo"}},
        {action: {name: "can_delete_todo"}, 'resource: {'type: "todo", id: "t-2", properties: {"ownerID": "rick@the-citadel.com"}}}
    ],
    options: {evaluationsSemantic: "execute_all"}
});
```

Sample response:

```ballerina
{
  "evaluations": [
    {"decision": true},
    {"decision": true},
    {"decision": false}
  ]
}
```

</details>

#### Search

When a search response holds a `page` with a non-empty `nextToken`, more results are available. To get the next page, send the request again with `page.token` set to that token and every other field unchanged. Set `page.limit` to choose the page size, if the PDP supports paging.

<details>
<summary>searchSubjects</summary>

Finds the subjects of a type that may perform the action on the resource. Set only the subject `'type`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `SubjectSearchRequest` | Yes | The `subject` type to find, the `action`, the `resource`, an optional `context` and an optional `page`. |
| `headers` | `RequestHeaders` | No | The `requestId` sent as the `X-Request-ID` header. |

Returns: `SubjectSearchResponse|error`

Sample code:

```ballerina
authzen:SubjectSearchResponse result = check pdp->searchSubjects({
    subject: {'type: "user"},
    action: {name: "edit"},
    'resource: {'type: "record", id: "101"}
});
```

Sample response:

```ballerina
{
  "results": [
    {"type": "user", "id": "alice"}
  ]
}
```

</details>

<details>
<summary>searchResources</summary>

Finds the resources of a type on which the subject may perform the action. Set only the resource `'type`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `ResourceSearchRequest` | Yes | The `subject`, the `action`, the `resource` type to find, an optional `context` and an optional `page`. |
| `headers` | `RequestHeaders` | No | The `requestId` sent as the `X-Request-ID` header. |

Returns: `ResourceSearchResponse|error`

Sample code:

```ballerina
authzen:ResourceSearchResponse result = check pdp->searchResources({
    subject: {'type: "user", id: "alice"},
    action: {name: "view"},
    'resource: {'type: "record"},
    page: {'limit: 3}
});
```

Sample response:

```ballerina
{
  "page": {"nextToken": "Mw=="},
  "results": [
    {"type": "record", "id": "101"},
    {"type": "record", "id": "102"},
    {"type": "record", "id": "103"}
  ]
}
```

</details>

<details>
<summary>searchActions</summary>

Finds the actions the subject may perform on the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `ActionSearchRequest` | Yes | The `subject`, the `resource`, an optional `context` and an optional `page`. |
| `headers` | `RequestHeaders` | No | The `requestId` sent as the `X-Request-ID` header. |

Returns: `ActionSearchResponse|error`

Sample code:

```ballerina
authzen:ActionSearchResponse result = check pdp->searchActions({
    subject: {'type: "user", id: "alice"},
    'resource: {'type: "record", id: "107"}
});
```

Sample response:

```ballerina
{
  "results": [
    {"name": "view"},
    {"name": "edit"},
    {"name": "read"},
    {"name": "write"}
  ]
}
```

</details>

#### Metadata

<details>
<summary>getMetadata</summary>

Gets the PDP metadata: its identifier, the endpoints of the APIs it supports and its capabilities. An API whose endpoint is absent isn't supported. The metadata is read from the PDP's well-known URL, which inserts `/.well-known/authzen-configuration` between the host and the path of the PDP URL. The operation fails when the metadata names another PDP.

Returns: `Metadata|error`

Sample code:

```ballerina
authzen:Metadata metadata = check pdp->getMetadata();
```

Sample response:

```ballerina
{
  "policyDecisionPoint": "https://authzen-proxy-demo.cerbos.dev",
  "accessEvaluationEndpoint": "https://authzen-proxy-demo.cerbos.dev/access/v1/evaluation",
  "accessEvaluationsEndpoint": "https://authzen-proxy-demo.cerbos.dev/access/v1/evaluations",
  "searchSubjectEndpoint": "https://authzen-proxy-demo.cerbos.dev/access/v1/search/subject",
  "searchResourceEndpoint": "https://authzen-proxy-demo.cerbos.dev/access/v1/search/resource",
  "searchActionEndpoint": "https://authzen-proxy-demo.cerbos.dev/access/v1/search/action",
  "capabilities": ["urn:authzen:pdp:core:v1", "urn:authzen:pdp:search:v1"]
}
```

</details>
