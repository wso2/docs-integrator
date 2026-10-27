---
connector: true
connector_name: "rudderstack"
title: "Actions"
description: "Reference for the RudderStack connector client: configuration, initialization, and every Event Stream, Activation and Profiles operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/rudderstack` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Sends customer events through the RudderStack Event Stream API, reads and deletes profiles through the Activation API, and starts and monitors runs through the Profiles API. |

---

## Client

Sends customer events through the RudderStack Event Stream API, reads and deletes profiles through the Activation API, and starts and monitors runs through the Profiles API. The client sends each operation to the right host with the right credential: the Event Stream operations to your data plane with the source write key, and the Activation and Profiles operations to the hosts of the configured region with the Service Access Token.

### Configuration

The client is initialized with a `ConnectionConfig` record and the data plane URL (`serviceUrl`). `serviceUrl` is required when you set a write key.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `AuthConfig` | Required | Credentials: `writeKey` for the Event Stream operations, and `serviceAccessToken` for the Activation and Profiles operations. Set the credential of each API you call. |
| `region` | `Region` | `US` | Region of the RudderStack workspace (`rudderstack:US` or `rudderstack:EU`). Selects the Activation and Profiles API hosts. |
| `activationServiceUrl` | `string` | Optional | Overrides the Activation API URL selected by `region`. |
| `profilesServiceUrl` | `string` | Optional | Overrides the Profiles API URL selected by `region`. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `30` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | Optional | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | Optional | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | Optional | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | Optional | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | Optional | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | Optional | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | Optional | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

The `AuthConfig` record has the following fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `writeKey` | `string?` | `()` | Source write key. Sent as the HTTP Basic auth username to the data plane. |
| `serviceAccessToken` | `string?` | `()` | Workspace Service Access Token, or a Personal Access Token for development. Sent as a Bearer token to the Activation and Profiles APIs. |

### Initializing the client

```ballerina
import ballerinax/rudderstack;

configurable string writeKey = ?;
configurable string dataPlaneUrl = ?;
configurable string serviceAccessToken = ?;

rudderstack:Client rudderstackClient = check new (
    {
        auth: {
            writeKey,
            serviceAccessToken
        }
    },
    serviceUrl = dataPlaneUrl
);
```

For a workspace in the EU region, also set `region: rudderstack:EU` in the connection config.

### Operations

The Event Stream operations return `ok` when the data plane accepts the event. Every event shares the following fields from `CommonEventFields`:

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `string` | The user's ID in your system. Set `userId` or `anonymousId`. |
| `anonymousId` | `string` | Pseudo-ID for a user who isn't known yet. |
| `context` | `Context` | Information about the event's environment, such as `ip`, `locale`, `userAgent`, `library`, `app` and `campaign`. |
| `integrations` | `Integrations` | Turns destinations on or off for the event, for example, `{"All": true, "Mixpanel": false}`. |
| `timestamp` | `string` | When the event happened (ISO 8601). Omit for live events; set for historical imports. |
| `originalTimestamp` | `string` | Client time when the event occurred. |
| `sentAt` | `string` | Client time when the event was sent. |
| `messageId` | `string` | Unique message ID, used for deduplication. |
| `channel` | `string` | Where the event came from, for example, `server`, `web` or `mobile`. |

The Event Stream operations also take an optional `EventHeaders` record with the `anonymousId` ordering header (the data plane processes requests that share it in order) and the `sentAt` header. For a single event, `anonymousId` defaults to the event's `anonymousId`.

The Activation operations identify a profile with a `ProfileIdentifier` record: an ID `type` defined in the Profiles project (for example, `user_id` or `email`) and its `value`.

#### Event Stream

<details>
<summary>identify</summary>

<div>

Identifies a user and records their traits.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IdentifyEvent` | Yes | The event: the common event fields plus `traits`, the user's traits (for example, `email`, `name`, `firstName`, `lastName`, `phone`, and any custom trait). |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->identify({
    userId: "u-1001",
    traits: {email: "alex@example.com", firstName: "Alex", lastName: "Silva", "plan": "premium"}
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

<details>
<summary>track</summary>

<div>

Records an action a user performed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TrackEvent` | Yes | The event: the common event fields plus `event` (the name of the action, required), `properties` and `traits`. |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->track({
    userId: "u-1001",
    event: "Order Completed",
    properties: {"orderId": "o-5001", "revenue": 89.99, "currency": "USD"}
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

<details>
<summary>page</summary>

<div>

Records a web page view.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PageEvent` | Yes | The event: the common event fields plus `name` (the name of the page, required) and `properties`. |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->page({
    anonymousId: "anon-5d21e8",
    name: "Pricing",
    properties: {"url": "https://example.com/pricing"},
    context: {campaign: {name: "q4-launch", 'source: "newsletter", medium: "email"}}
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

<details>
<summary>screen</summary>

<div>

Records a mobile app screen view.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ScreenEvent` | Yes | The event: the common event fields plus `name` (the name of the screen, required) and `properties`. |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->screen({
    userId: "u-1001",
    name: "Home",
    properties: {"tab": "feed"}
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

<details>
<summary>group</summary>

<div>

Associates a user with a group, such as a company, an organization or an account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GroupEvent` | Yes | The event: the common event fields plus `groupId` (the ID of the group in your system, required) and `traits`, the group's traits. |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->group({
    userId: "u-1001",
    groupId: "acme-inc",
    traits: {name: "Acme Inc.", "plan": "business", "employees": 240}
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

<details>
<summary>alias</summary>

<div>

Merges two identities of a user, for example, an anonymous visitor ID and the user ID assigned at signup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AliasEvent` | Yes | The event: the common event fields plus `previousId` (the user's previous ID, required) and `traits`. |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->alias({
    userId: "u-1001",
    previousId: "anon-5d21e8"
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

<details>
<summary>batch</summary>

<div>

Sends several events in one request (up to 4 MB per request and 32 KB per event). Each event sets `type` (`identify`, `track`, `page`, `screen`, `group` or `alias`) plus the field that type requires: `event` for `track`, `name` for `page` and `screen`, `groupId` for `group`, and `previousId` for `alias`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchRequest` | Yes | The events to send, in `batch` (at least one `BatchedEvent`). |
| `headers` | `EventHeaders` | No | The `AnonymousId` ordering header and the `SentAt` header. |

Returns: `string|error`

Sample code:

```ballerina
string response = check rudderstackClient->batch({
    batch: [
        {'type: "track", userId: "u-1001", event: "Product Added", properties: {"sku": "SKU-42"}},
        {'type: "track", userId: "u-1001", event: "Order Completed", properties: {"revenue": 89.99}},
        {'type: "page", userId: "u-1001", name: "Order Confirmation"}
    ]
});
```

Sample response:

```ballerina
"ok"
```

</div>

</details>

#### Activation

<details>
<summary>getProfile</summary>

<div>

Gets a profile from the Redis destination of a Profiles project. A profile exists only after a Profiles run has written it to the destination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SingleProfileRequest` | Yes | `entity` (the Profiles entity, commonly `user`), `destinationId` (the ID of the Redis destination) and `id` (a `ProfileIdentifier`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `Profile|error`

Sample code:

```ballerina
rudderstack:Profile profile = check rudderstackClient->getProfile({
    entity: "user",
    destinationId: "2aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    id: {'type: "user_id", value: "u-1001"}
});
```

Sample response:

```ballerina
{
  "entity": "user",
  "id": {
    "type": "user_id",
    "value": "u-1001"
  },
  "data": {
    "lifetime_value": 420,
    "is_churn_risk": false
  }
}
```

</div>

</details>

<details>
<summary>getProfiles</summary>

<div>

Gets several profiles (1 to 100) from the Redis destination. The profiles are returned in the order of `ids`, and the `data` of an identity with no profile is empty.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchProfilesRequest` | Yes | `entity`, `destinationId` and `ids` (1 to 100 `ProfileIdentifier` records). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `BatchProfilesResponse|error`

Sample code:

```ballerina
rudderstack:BatchProfilesResponse response = check rudderstackClient->getProfiles({
    entity: "user",
    destinationId: "2aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    ids: [
        {'type: "user_id", value: "u-1001"},
        {'type: "email", value: "alex@example.com"}
    ]
});
```

Sample response:

```ballerina
{
  "profiles": [
    {
      "entity": "user",
      "id": {
        "type": "user_id",
        "value": "u-1001"
      },
      "data": {
        "lifetime_value": 420
      }
    },
    {
      "entity": "user",
      "id": {
        "type": "email",
        "value": "alex@example.com"
      },
      "data": {}
    }
  ]
}
```

</div>

</details>

<details>
<summary>deleteProfile</summary>

<div>

Deletes a profile from the Redis destination. This deletes only the copy in the destination: the next Profiles run recreates it. Returns an error with status `404` if the profile wasn't found.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SingleProfileRequest` | Yes | `entity`, `destinationId` and `id` (a `ProfileIdentifier`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `DeleteProfilesResult|error`

Sample code:

```ballerina
rudderstack:DeleteProfilesResult result = check rudderstackClient->deleteProfile({
    entity: "user",
    destinationId: "2aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    id: {'type: "user_id", value: "u-1001"}
});
```

Sample response:

```ballerina
{
  "deletedKeys": 20,
  "actualKeys": 30
}
```

</div>

</details>

<details>
<summary>deleteProfiles</summary>

<div>

Deletes several profiles (1 to 100) from the Redis destination. The next Profiles run recreates them. Returns an error with status `404` if none of the profiles were found.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchProfilesRequest` | Yes | `entity`, `destinationId` and `ids` (1 to 100 `ProfileIdentifier` records). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `DeleteProfilesResult|error`

Sample code:

```ballerina
rudderstack:DeleteProfilesResult result = check rudderstackClient->deleteProfiles({
    entity: "user",
    destinationId: "2aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    ids: [
        {'type: "user_id", value: "u-1001"},
        {'type: "user_id", value: "u-1002"}
    ]
});
```

Sample response:

```ballerina
{
  "deletedKeys": 1,
  "actualKeys": 2
}
```

</div>

</details>

#### Profiles

<details>
<summary>startProfilesRun</summary>

<div>

Starts a run of a Profiles project: identity resolution and the feature-table build that the Activation API serves. Only one run per project can be in progress; starting another returns an error with status `409`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profilesId` | `string` | Yes | ID of the Profiles project. |
| `payload` | `StartProfilesRunRequest` | No | Options for the run: `parameters`, each flag and its value as one string. Allowed flags: `--model_refs`, `--begin_time`, `--end_time`, `--rebase_incremental`. Defaults to `{}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `StartProfilesRunResponse|error`

Sample code:

```ballerina
rudderstack:StartProfilesRunResponse run = check rudderstackClient->startProfilesRun(
    "2aProfilesProjectId",
    {parameters: ["--model_refs models/id_graph_users"]}
);
```

Sample response:

```ballerina
{
  "runId": "2cJmVZmRGZ8xLrKPgTuNqWvBdXh"
}
```

</div>

</details>

<details>
<summary>getProfilesRunStatus</summary>

<div>

Gets the status of a Profiles run. `status` is `running` or `finished`; a failed run also reports `finished` and sets `error`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `profilesId` | `string` | Yes | ID of the Profiles project. |
| `runId` | `string` | Yes | Run ID returned by `startProfilesRun`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `ProfilesRunStatus|error`

Sample code:

```ballerina
rudderstack:ProfilesRunStatus status = check rudderstackClient->getProfilesRunStatus(
    "2aProfilesProjectId",
    "2cJmVZmRGZ8xLrKPgTuNqWvBdXh"
);
```

Sample response:

```ballerina
{
  "jobId": "job-1",
  "jobRunId": "2cJmVZmRGZ8xLrKPgTuNqWvBdXh",
  "status": "finished",
  "startedAt": "2024-05-31T06:48:08.228Z",
  "finishedAt": "2024-05-31T07:02:11.904Z",
  "tasks": [
    {
      "taskId": "t1",
      "taskRunId": "tr1",
      "startedAt": "2024-05-31T06:48:08.228Z",
      "finishedAt": "2024-05-31T06:52:00.000Z"
    }
  ]
}
```

</div>

</details>
