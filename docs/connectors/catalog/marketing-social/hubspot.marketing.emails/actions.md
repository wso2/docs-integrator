---
title: Actions
---

# Actions

The `ballerinax/hubspot.marketing.emails` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot marketing emails: CRUD, publish, clone, A/B test, drafts, revisions, and statistics. |

---

## Client

Manage HubSpot marketing emails: CRUD, publish, clone, A/B test, drafts, revisions, and statistics.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token grant (recommended), bearer token, or legacy API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `60` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.marketing.emails as hsmemails;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsmemails:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};

hsmemails:Client hubspotClient = check new ({auth});
```

### Operations

#### Email CRUD

<details>
<summary>Get all marketing emails</summary>

Signature: `get /`

Retrieve all marketing emails for the HubSpot account, with optional filtering by publish status, date range, and type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetQueries</code> | No | Query parameters including `isPublished`, `limit`, `after`, `type`, `archived`, `sort`, `createdAfter`, `createdBefore`, `updatedAfter`, `updatedBefore`, `includeStats`, `includedProperties`. |

Returns: `CollectionResponseWithTotalPublicEmailForwardPaging|error`

Sample code:

```ballerina
hsmemails:CollectionResponseWithTotalPublicEmailForwardPaging emails =
    check hubspotClient->/({});
```

Sample response:

```ballerina
{
  "total": 2,
  "results": [
    {
      "id": "12345678",
      "name": "Welcome Campaign",
      "subject": "Welcome to Our Platform",
      "state": "DRAFT",
      "subcategory": "MARKETING_EMAIL",
      "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
      "to": {},
      "content": {"templatePath": "emails/welcome.html"}
    },
    {
      "id": "87654321",
      "name": "Monthly Newsletter",
      "subject": "Your Monthly Update",
      "state": "PUBLISHED",
      "subcategory": "MARKETING_EMAIL",
      "from": {"fromName": "Newsletter", "replyTo": "news@example.com"},
      "to": {},
      "content": {"templatePath": "emails/newsletter.html"}
    }
  ]
}
```

</details>

<details>
<summary>Create a new marketing email</summary>

Signature: `post /`

Create a new marketing email in HubSpot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>EmailCreateRequest</code> | Yes | Email creation payload including `name` (required), `subject`, `from`, `to`, `content`, `subscriptionDetails`, and other optional fields. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail newEmail = check hubspotClient->/.post({
    name: "Spring Sale Campaign",
    subject: "Don't Miss Our Spring Sale!",
    'from: {
        fromName: "Marketing Team",
        replyTo: "marketing@example.com"
    }
});
```

Sample response:

```ballerina
{
  "id": "99887766",
  "name": "Spring Sale Campaign",
  "subject": "Don't Miss Our Spring Sale!",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {},
  "createdAt": "2025-03-15T10:00:00Z",
  "updatedAt": "2025-03-15T10:00:00Z"
}
```

</details>

<details>
<summary>Get the details of a specified marketing email</summary>

Signature: `get /[emailId]`

Retrieve the details of a specific marketing email by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetEmailIdQueries</code> | No | Query parameters including `archived`, `includeStats`, `includedProperties`. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail email = check hubspotClient->/["12345678"]({});
```

Sample response:

```ballerina
{
  "id": "12345678",
  "name": "Welcome Campaign",
  "subject": "Welcome to Our Platform",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {"contactIlsLists": {"include": ["1"], "exclude": []}},
  "content": {"templatePath": "emails/welcome.html"},
  "createdAt": "2025-01-10T08:00:00Z",
  "updatedAt": "2025-03-01T14:30:00Z"
}
```

</details>

<details>
<summary>Update a marketing email</summary>

Signature: `patch /[emailId]`

Update an existing marketing email's fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email to update. |
| `payload` | <code>EmailUpdateRequest</code> | Yes | Fields to update: `name`, `subject`, `from`, `to`, `content`, etc. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>PatchEmailIdQueries</code> | No | Query parameters including `archived`. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail updated = check hubspotClient->/[email.id].patch({
    'from: {
        replyTo: "new_reply_address@example.com",
        customReplyTo: "new_reply_address@example.com"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345678",
  "name": "Welcome Campaign",
  "subject": "Welcome to Our Platform",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "new_reply_address@example.com", "customReplyTo": "new_reply_address@example.com"},
  "to": {},
  "content": {},
  "updatedAt": "2025-03-15T12:00:00Z"
}
```

</details>

<details>
<summary>Delete a marketing email</summary>

Signature: `delete /[emailId]`

Delete a marketing email by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email to delete. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>DeleteEmailIdQueries</code> | No | Query parameters including `archived`. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["12345678"].delete({});
```

</details>

#### Publish & unpublish

<details>
<summary>Publish or send a marketing email</summary>

Signature: `post /[emailId]/publish`

Publish or send a marketing email. The email must be in a valid state with all required fields configured.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email to publish. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["12345678"]/publish.post({});
```

</details>

<details>
<summary>Unpublish or cancel a marketing email</summary>

Signature: `post /[emailId]/unpublish`

Unpublish or cancel a scheduled marketing email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email to unpublish. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["12345678"]/unpublish.post({});
```

</details>

#### Clone

<details>
<summary>Clone a marketing email</summary>

Signature: `post /clone`

Create a copy of an existing marketing email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ContentCloneRequestVNext</code> | Yes | Clone request with `id` (source email ID, required) and `cloneName` (optional name for the clone). |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail cloned = check hubspotClient->/clone.post({
    id: "12345678",
    cloneName: "Welcome Campaign - Copy"
});
```

Sample response:

```ballerina
{
  "id": "55667788",
  "name": "Welcome Campaign - Copy",
  "subject": "Welcome to Our Platform",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {"templatePath": "emails/welcome.html"},
  "createdAt": "2025-03-15T14:00:00Z"
}
```

</details>

#### A/B testing

<details>
<summary>Create an A/B test variation of a marketing email</summary>

Signature: `post /ab-test/create-variation`

Create a variation of a marketing email for A/B testing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AbTestCreateRequestVNext</code> | Yes | A/B test request with `contentId` (source email ID) and `variationName`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail variation = check hubspotClient->/ab\-test/create\-variation.post({
    contentId: "12345678",
    variationName: "Subject Line Variant B"
});
```

Sample response:

```ballerina
{
  "id": "44556677",
  "name": "Welcome Campaign - Subject Line Variant B",
  "subject": "Welcome to Our Platform",
  "state": "DRAFT",
  "subcategory": "AB_MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {},
  "testing": {"abStatus": "variant", "testId": "12345678"}
}
```

</details>

<details>
<summary>Get the variation of an A/B marketing email</summary>

Signature: `get /[emailId]/ab-test/get-variation`

Retrieve the A/B test variation of a marketing email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail variation = check hubspotClient->/["12345678"]/ab\-test/get\-variation({});
```

Sample response:

```ballerina
{
  "id": "44556677",
  "name": "Welcome Campaign - Subject Line Variant B",
  "subject": "Try Our New Platform!",
  "state": "DRAFT",
  "subcategory": "AB_MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {},
  "testing": {"abStatus": "variant", "testId": "12345678"}
}
```

</details>

#### Draft management

<details>
<summary>Get draft version of a marketing email</summary>

Signature: `get /[emailId]/draft`

Retrieve the draft version of a marketing email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail draft = check hubspotClient->/["12345678"]/draft({});
```

Sample response:

```ballerina
{
  "id": "12345678",
  "name": "Welcome Campaign",
  "subject": "Welcome to Our Platform - Updated",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {}
}
```

</details>

<details>
<summary>Create or update draft version</summary>

Signature: `patch /[emailId]/draft`

Create or update the draft version of a marketing email without affecting the published version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `payload` | <code>EmailUpdateRequest</code> | Yes | Fields to update in the draft. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail updatedDraft = check hubspotClient->/["12345678"]/draft.patch({
    subject: "Welcome to Our Platform - V2"
});
```

Sample response:

```ballerina
{
  "id": "12345678",
  "name": "Welcome Campaign",
  "subject": "Welcome to Our Platform - V2",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {}
}
```

</details>

<details>
<summary>Reset Draft</summary>

Signature: `post /[emailId]/draft/reset`

Reset the draft version of a marketing email, discarding all draft changes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["12345678"]/draft/reset.post({});
```

</details>

#### Revisions

<details>
<summary>Get revisions of a marketing email</summary>

Signature: `get /[emailId]/revisions`

List all revisions of a marketing email with pagination support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetEmailIdRevisionsQueries</code> | No | Pagination parameters including `limit`, `after`, and `before`. |

Returns: `CollectionResponseWithTotalVersionPublicEmail|error`

Sample code:

```ballerina
hsmemails:CollectionResponseWithTotalVersionPublicEmail revisions =
    check hubspotClient->/["12345678"]/revisions({});
```

Sample response:

```ballerina
{
  "total": 3,
  "results": [
    {
      "id": "rev-001",
      "object": {"id": "12345678", "name": "Welcome Campaign", "subject": "Welcome!", "state": "PUBLISHED", "subcategory": "MARKETING_EMAIL", "from": {}, "to": {}, "content": {}},
      "user": {"id": "user-1", "fullName": "Jane Doe", "email": "jane@example.com"},
      "updated": "2025-03-14T10:00:00Z"
    },
    {
      "id": "rev-002",
      "object": {"id": "12345678", "name": "Welcome Campaign", "subject": "Welcome to Our Platform", "state": "DRAFT", "subcategory": "MARKETING_EMAIL", "from": {}, "to": {}, "content": {}},
      "user": {"id": "user-1", "fullName": "Jane Doe", "email": "jane@example.com"},
      "updated": "2025-03-10T08:00:00Z"
    }
  ]
}
```

</details>

<details>
<summary>Get a revision of a marketing email</summary>

Signature: `get /[emailId]/revisions/[revisionId]`

Retrieve a specific revision of a marketing email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `revisionId` | <code>string</code> | Yes | The ID of the revision. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `VersionPublicEmail|error`

Sample code:

```ballerina
hsmemails:VersionPublicEmail revision =
    check hubspotClient->/["12345678"]/revisions/["rev-001"]({});
```

Sample response:

```ballerina
{
  "id": "rev-001",
  "object": {
    "id": "12345678",
    "name": "Welcome Campaign",
    "subject": "Welcome!",
    "state": "PUBLISHED",
    "subcategory": "MARKETING_EMAIL",
    "from": {"fromName": "Marketing Team"},
    "to": {},
    "content": {}
  },
  "user": {"id": "user-1", "fullName": "Jane Doe", "email": "jane@example.com"},
  "updated": "2025-03-14T10:00:00Z"
}
```

</details>

<details>
<summary>Restore a revision of a marketing email</summary>

Signature: `post /[emailId]/revisions/[revisionId]/restore`

Restore a specific revision of a marketing email, making it the current version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `revisionId` | <code>string</code> | Yes | The ID of the revision to restore. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/["12345678"]/revisions/["rev-002"]/restore.post({});
```

</details>

<details>
<summary>Restore a revision of a marketing email to DRAFT state</summary>

Signature: `post /[emailId]/revisions/[revisionId]/restore-to-draft`

Restore a specific revision as a draft without affecting the published version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emailId` | <code>string</code> | Yes | The ID of the marketing email. |
| `revisionId` | <code>int</code> | Yes | The ID of the revision to restore as draft. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `PublicEmail|error`

Sample code:

```ballerina
hsmemails:PublicEmail restoredDraft =
    check hubspotClient->/["12345678"]/revisions/[2]/restore\-to\-draft.post({});
```

Sample response:

```ballerina
{
  "id": "12345678",
  "name": "Welcome Campaign",
  "subject": "Welcome to Our Platform",
  "state": "DRAFT",
  "subcategory": "MARKETING_EMAIL",
  "from": {"fromName": "Marketing Team", "replyTo": "marketing@example.com"},
  "to": {},
  "content": {}
}
```

</details>

#### Statistics

<details>
<summary>Get aggregated statistics</summary>

Signature: `get /statistics/list`

Retrieve aggregated email statistics for specified emails within a time range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetStatisticsListQueries</code> | No | Query parameters including `emailIds`, `startTimestamp`, `endTimestamp`, and `property`. |

Returns: `AggregateEmailStatistics|error`

Sample code:

```ballerina
hsmemails:AggregateEmailStatistics aggregate =
    check hubspotClient->/statistics/list({}, {
        startTimestamp: "2025-01-01T10:00:00Z",
        endTimestamp: "2025-01-31T10:00:00Z"
    });
```

Sample response:

```ballerina
{
  "emails": [12345678, 87654321],
  "aggregate": {
    "counters": {"sent": 5000, "open": 2100, "delivered": 4900, "click": 450, "bounce": 100, "unsubscribed": 25},
    "ratios": {"openratio": 0.42, "clickratio": 0.09, "bounceratio": 0.02},
    "deviceBreakdown": {"desktop": {"open": 1200}, "mobile": {"open": 900}},
    "qualifierStats": {}
  }
}
```

</details>

<details>
<summary>Get aggregated statistic intervals</summary>

Signature: `get /statistics/histogram`

Retrieve email statistics broken down by time intervals (e.g., daily, weekly).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetStatisticsHistogramQueries</code> | No | Query parameters including `emailIds`, `startTimestamp`, `endTimestamp`, and `interval` (e.g., `DAY`, `WEEK`, `MONTH`). |

Returns: `CollectionResponseWithTotalEmailStatisticIntervalNoPaging|error`

Sample code:

```ballerina
hsmemails:CollectionResponseWithTotalEmailStatisticIntervalNoPaging histogram =
    check hubspotClient->/statistics/histogram({}, {
        startTimestamp: "2025-01-01T10:00:00Z",
        endTimestamp: "2025-01-31T10:00:00Z",
        interval: "DAY"
    });
```

Sample response:

```ballerina
{
  "total": 31,
  "results": [
    {
      "interval": {"start": "2025-01-01T00:00:00Z", "end": "2025-01-02T00:00:00Z"},
      "aggregations": {
        "counters": {"sent": 150, "open": 65, "delivered": 148, "click": 12},
        "ratios": {"openratio": 0.43, "clickratio": 0.08},
        "deviceBreakdown": {},
        "qualifierStats": {}
      }
    },
    {
      "interval": {"start": "2025-01-02T00:00:00Z", "end": "2025-01-03T00:00:00Z"},
      "aggregations": {
        "counters": {"sent": 200, "open": 90, "delivered": 195, "click": 20},
        "ratios": {"openratio": 0.45, "clickratio": 0.10},
        "deviceBreakdown": {},
        "qualifierStats": {}
      }
    }
  ]
}
```

</details>
