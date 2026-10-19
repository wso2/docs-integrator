---
title: Actions
---

# Actions

The `ballerinax/mailchimp.transactional` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to all Mandrill API endpoints for transactional email sending, template management, webhooks, and more. |

---

## Client

Provides access to all Mandrill API endpoints for transactional email sending, template management, webhooks, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `cache` | `http:CacheConfig` | `{}` | HTTP response cache configuration. |

### Initializing the client

```ballerina
import ballerinax/mailchimp.'transactional as mailchimp;

mailchimp:Client mailchimpClient = check new ();
```

### Operations

#### Send messages

<details>
<summary>Send a new transactional message</summary>

Sends a transactional email with full control over recipients, content, headers, attachments, and tracking options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesSendBody` | Yes | The message send request containing the API key, message details, and optional send parameters. |

Returns: `InlineResponse20028[]|error`

Sample code:

```ballerina
configurable string apiKey = ?;

InlineResponse20028[] response = check mailchimpClient->/messages/send.post({
    'key: apiKey,
    message: {
        fromEmail: "sender@example.com",
        fromName: "Example Sender",
        to: [
            {email: "recipient@example.com", name: "Recipient", 'type: "to"}
        ],
        subject: "Order Confirmation",
        html: "<h1>Thank you for your order!</h1><p>Your order #12345 has been confirmed.</p>",
        trackOpens: true,
        trackClicks: true,
        tags: ["order-confirmation"]
    }
});
```

Sample response:

```ballerina
[{"email": "recipient@example.com", "status": "sent", "_id": "abc123def456", "reject_reason": null}]
```

</details>

<details>
<summary>Send using an email template</summary>

Sends a transactional email using a previously created template, with dynamic merge variable substitution.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesSendTemplateBody` | Yes | The template send request containing template name, content overrides, merge variables, and message details. |

Returns: `InlineResponse20029[]|error`

Sample code:

```ballerina
InlineResponse20029[] response = check mailchimpClient->/messages/send\-template.post({
    'key: apiKey,
    templateName: "welcome-email",
    templateContent: [
        {name: "header", content: "Welcome to Our Service!"}
    ],
    message: {
        fromEmail: "welcome@example.com",
        to: [{email: "newuser@example.com", 'type: "to"}],
        subject: "Welcome!",
        globalMergeVars: [
            {name: "FNAME", content: "John"},
            {name: "COMPANY", content: "Acme Corp"}
        ]
    }
});
```

Sample response:

```ballerina
[{"email": "newuser@example.com", "status": "sent", "_id": "xyz789ghi012", "reject_reason": null}]
```

</details>

<details>
<summary>Send a raw MIME message</summary>

Sends a raw MIME message, useful when you have pre-built email content in MIME format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesSendRawBody` | Yes | The raw message request containing the MIME content and optional send parameters. |

Returns: `record {}|error`

Sample code:

```ballerina
record {} response = check mailchimpClient->/messages/send\-raw.post({
    'key: apiKey,
    rawMessage: "From: sender@example.com\nTo: recipient@example.com\nSubject: Test\nMIME-Version: 1.0\nContent-Type: text/plain\n\nHello from raw MIME!"
});
```

Sample response:

```ballerina
{}
```

</details>

#### Message search & info

<details>
<summary>Search sent messages</summary>

Searches recently sent messages by query string, date range, tags, senders, or API keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesSearchBody` | Yes | Search criteria including query, date range, tags, and limits. |

Returns: `InlineResponse20030[]|error`

Sample code:

```ballerina
InlineResponse20030[] results = check mailchimpClient->/messages/search.post({
    'key: apiKey,
    query: "email:recipient@example.com",
    dateFrom: "2026-03-01",
    dateTo: "2026-03-17",
    'limit: 10
});
```

Sample response:

```ballerina
[{"ts": 1710000000, "_id": "abc123", "sender": "sender@example.com", "template": null, "subject": "Order Confirmation", "email": "recipient@example.com", "tags": ["order-confirmation"], "opens": 1, "clicks": 0, "state": "sent"}]
```

</details>

<details>
<summary>Get message info</summary>

Retrieves detailed information about a single sent message, including its delivery history and SMTP events.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesInfoBody` | Yes | The message info request containing the API key and message ID. |

Returns: `InlineResponse20032|error`

Sample code:

```ballerina
InlineResponse20032 info = check mailchimpClient->/messages/info.post({
    'key: apiKey,
    id: "abc123def456"
});
```

Sample response:

```ballerina
{"ts": 1710000000, "_id": "abc123def456", "sender": "sender@example.com", "subject": "Order Confirmation", "email": "recipient@example.com", "tags": ["order-confirmation"], "opens": 2, "clicks": 1, "state": "sent", "smtp_events": [{"ts": 1710000000, "type": "sent", "diag": "250 OK"}]}
```

</details>

<details>
<summary>Get message content</summary>

Retrieves the full content of a recently sent message, including HTML and text bodies.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesInfoBody` | Yes | The content request containing the API key and message ID. |

Returns: `InlineResponse20033|error`

Sample code:

```ballerina
InlineResponse20033 content = check mailchimpClient->/messages/content.post({
    'key: apiKey,
    id: "abc123def456"
});
```

Sample response:

```ballerina
{"ts": 1710000000, "_id": "abc123def456", "from_email": "sender@example.com", "from_name": "Example Sender", "subject": "Order Confirmation", "to": {"email": "recipient@example.com", "name": "Recipient"}, "html": "<h1>Thank you!</h1>", "text": "Thank you!"}
```

</details>

<details>
<summary>Search message time-series</summary>

Returns hourly statistics for a query within a date range, useful for volume and delivery analytics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesSearchTimeSeriesBody` | Yes | Time-series search criteria including query, date range, and tags. |

Returns: `InlineResponse20031[]|error`

Sample code:

```ballerina
InlineResponse20031[] timeSeries = check mailchimpClient->/messages/search\-time\-series.post({
    'key: apiKey,
    query: "tag:order-confirmation"
});
```

Sample response:

```ballerina
[{"time": "2026-03-17 00:00:00", "sent": 150, "hard_bounces": 2, "soft_bounces": 5, "rejects": 0, "complaints": 0, "unsubs": 1, "opens": 120, "unique_opens": 95, "clicks": 30, "unique_clicks": 25}]
```

</details>

#### Scheduled messages

<details>
<summary>List scheduled messages</summary>

Lists all currently scheduled messages, optionally filtered by recipient email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesListScheduledBody` | Yes | The list request containing the API key and optional recipient filter. |

Returns: `InlineResponse20035[]|error`

Sample code:

```ballerina
InlineResponse20035[] scheduled = check mailchimpClient->/messages/list\-scheduled.post({
    'key: apiKey,
    to: "recipient@example.com"
});
```

Sample response:

```ballerina
[{"_id": "sched123", "created_at": "2026-03-17 10:00:00", "send_at": "2026-03-18 09:00:00", "from_email": "sender@example.com", "to": "recipient@example.com", "subject": "Scheduled Reminder"}]
```

</details>

<details>
<summary>Cancel a scheduled message</summary>

Cancels a previously scheduled message by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesCancelScheduledBody` | Yes | The cancel request containing the API key and scheduled message ID. |

Returns: `InlineResponse20035[]|error`

Sample code:

```ballerina
InlineResponse20035[] cancelled = check mailchimpClient->/messages/cancel\-scheduled.post({
    'key: apiKey,
    id: "sched123"
});
```

Sample response:

```ballerina
[{"_id": "sched123", "created_at": "2026-03-17 10:00:00", "send_at": "2026-03-18 09:00:00", "from_email": "sender@example.com", "to": "recipient@example.com", "subject": "Scheduled Reminder"}]
```

</details>

<details>
<summary>Reschedule a message</summary>

Changes the scheduled send time of a previously scheduled message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MessagesRescheduleBody` | Yes | The reschedule request containing the API key, message ID, and new send time. |

Returns: `InlineResponse20035[]|error`

Sample code:

```ballerina
InlineResponse20035[] rescheduled = check mailchimpClient->/messages/reschedule.post({
    'key: apiKey,
    id: "sched123",
    sendAt: "2026-03-20 14:00:00"
});
```

Sample response:

```ballerina
[{"_id": "sched123", "created_at": "2026-03-17 10:00:00", "send_at": "2026-03-20 14:00:00", "from_email": "sender@example.com", "to": "recipient@example.com", "subject": "Scheduled Reminder"}]
```

</details>

#### Template management

<details>
<summary>Add a new template</summary>

Creates a new email template with optional HTML content, subject line, and labels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesAddBody` | Yes | The template creation request containing the API key, name, and optional content fields. |

Returns: `InlineResponse20060|error`

Sample code:

```ballerina
InlineResponse20060 template = check mailchimpClient->/templates/add.post({
    'key: apiKey,
    name: "welcome-email",
    fromEmail: "welcome@example.com",
    fromName: "Acme Corp",
    subject: "Welcome to Acme!",
    code: "<h1>Hello *|FNAME|*!</h1><p>Welcome to our service.</p>",
    text: "Hello *|FNAME|*! Welcome to our service.",
    publish: true,
    labels: ["onboarding"]
});
```

Sample response:

```ballerina
{"slug": "welcome-email", "name": "welcome-email", "labels": ["onboarding"], "code": "<h1>Hello *|FNAME|*!</h1><p>Welcome to our service.</p>", "subject": "Welcome to Acme!", "from_email": "welcome@example.com", "from_name": "Acme Corp", "text": "Hello *|FNAME|*! Welcome to our service.", "publish_name": "welcome-email", "publish_code": "<h1>Hello *|FNAME|*!</h1><p>Welcome to our service.</p>", "publish_subject": "Welcome to Acme!", "publish_from_email": "welcome@example.com", "publish_from_name": "Acme Corp", "publish_text": "Hello *|FNAME|*! Welcome to our service.", "published_at": "2026-03-17 12:00:00", "created_at": "2026-03-17 12:00:00", "updated_at": "2026-03-17 12:00:00"}
```

</details>

<details>
<summary>Get template info</summary>

Retrieves detailed information about an existing template by its name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesInfoBody` | Yes | The info request containing the API key and template name. |

Returns: `InlineResponse20061|error`

Sample code:

```ballerina
InlineResponse20061 info = check mailchimpClient->/templates/info.post({
    'key: apiKey,
    name: "welcome-email"
});
```

Sample response:

```ballerina
{"slug": "welcome-email", "name": "welcome-email", "labels": ["onboarding"], "code": "<h1>Hello *|FNAME|*!</h1>", "subject": "Welcome to Acme!", "from_email": "welcome@example.com", "from_name": "Acme Corp", "publish_name": "welcome-email", "published_at": "2026-03-17 12:00:00", "created_at": "2026-03-17 12:00:00", "updated_at": "2026-03-17 12:00:00"}
```

</details>

<details>
<summary>Update a template</summary>

Updates an existing template's content, subject, labels, or other properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesUpdateBody` | Yes | The update request containing the API key, template name, and fields to update. |

Returns: `InlineResponse20062|error`

Sample code:

```ballerina
InlineResponse20062 updated = check mailchimpClient->/templates/update.post({
    'key: apiKey,
    name: "welcome-email",
    subject: "Welcome to Acme Corp!",
    code: "<h1>Hello *|FNAME|*!</h1><p>Welcome aboard.</p>",
    publish: true
});
```

Sample response:

```ballerina
{"slug": "welcome-email", "name": "welcome-email", "labels": ["onboarding"], "code": "<h1>Hello *|FNAME|*!</h1><p>Welcome aboard.</p>", "subject": "Welcome to Acme Corp!", "from_email": "welcome@example.com", "from_name": "Acme Corp", "published_at": "2026-03-17 13:00:00", "created_at": "2026-03-17 12:00:00", "updated_at": "2026-03-17 13:00:00"}
```

</details>

<details>
<summary>Publish a template</summary>

Publishes the current draft content of a template, making it the active version used for sending.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesInfoBody` | Yes | The publish request containing the API key and template name. |

Returns: `InlineResponse20063|error`

Sample code:

```ballerina
InlineResponse20063 published = check mailchimpClient->/templates/publish.post({
    'key: apiKey,
    name: "welcome-email"
});
```

Sample response:

```ballerina
{"slug": "welcome-email", "name": "welcome-email", "labels": ["onboarding"], "code": "<h1>Hello *|FNAME|*!</h1>", "subject": "Welcome to Acme!", "published_at": "2026-03-17 13:30:00", "created_at": "2026-03-17 12:00:00", "updated_at": "2026-03-17 13:30:00"}
```

</details>

<details>
<summary>Render a template</summary>

Renders a template with the provided merge variables and template content, returning the final HTML output.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesRenderBody` | Yes | The render request containing the template name, content blocks, and merge variables. |

Returns: `InlineResponse20066|error`

Sample code:

```ballerina
InlineResponse20066 rendered = check mailchimpClient->/templates/render.post({
    'key: apiKey,
    templateName: "welcome-email",
    templateContent: [
        {name: "header", content: "Welcome!"}
    ],
    mergeVars: [
        {name: "FNAME", content: "John"}
    ]
});
```

Sample response:

```ballerina
{"html": "<h1>Hello John!</h1><p>Welcome to our service.</p>"}
```

</details>

<details>
<summary>List all templates</summary>

Returns a list of all templates in the account, optionally filtered by label.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesListBody` | Yes | The list request containing the API key and optional label filter. |

Returns: `InlineResponse20065[]|error`

Sample code:

```ballerina
InlineResponse20065[] templates = check mailchimpClient->/templates/list.post({
    'key: apiKey,
    label: "onboarding"
});
```

Sample response:

```ballerina
[{"slug": "welcome-email", "name": "welcome-email", "labels": ["onboarding"], "subject": "Welcome to Acme!", "from_email": "welcome@example.com", "from_name": "Acme Corp", "published_at": "2026-03-17 12:00:00", "created_at": "2026-03-17 12:00:00", "updated_at": "2026-03-17 12:00:00"}]
```

</details>

<details>
<summary>Delete a template</summary>

Permanently deletes a template by name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TemplatesInfoBody` | Yes | The delete request containing the API key and template name. |

Returns: `InlineResponse20064|error`

Sample code:

```ballerina
InlineResponse20064 deleted = check mailchimpClient->/templates/delete.post({
    'key: apiKey,
    name: "welcome-email"
});
```

Sample response:

```ballerina
{"slug": "welcome-email", "name": "welcome-email", "labels": ["onboarding"], "subject": "Welcome to Acme!", "from_email": "welcome@example.com", "from_name": "Acme Corp", "created_at": "2026-03-17 12:00:00", "updated_at": "2026-03-17 13:30:00"}
```

</details>

#### Webhook management

<details>
<summary>List webhooks</summary>

Returns all configured webhooks for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20074[]|error`

Sample code:

```ballerina
InlineResponse20074[] webhooks = check mailchimpClient->/webhooks/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"id": 42, "url": "https://example.com/webhooks/mandrill", "description": "Production webhook", "auth_key": "wh_key_123", "events": ["send", "open", "click", "hard_bounce"], "created_at": "2026-03-10 08:00:00", "last_sent_at": "2026-03-17 11:00:00", "batches_sent": 156, "events_sent": 4230, "last_error": null}]
```

</details>

<details>
<summary>Add a webhook</summary>

Creates a new webhook that will receive event notifications at the specified URL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksAddBody` | Yes | The webhook creation request containing the API key, URL, and event types. |

Returns: `InlineResponse20075|error`

Sample code:

```ballerina
InlineResponse20075 webhook = check mailchimpClient->/webhooks/add.post({
    'key: apiKey,
    url: "https://example.com/webhooks/mandrill",
    events: ["send", "open", "click", "hard_bounce", "soft_bounce"]
});
```

Sample response:

```ballerina
{"id": 43, "url": "https://example.com/webhooks/mandrill", "description": "", "auth_key": "wh_key_456", "events": ["send", "open", "click", "hard_bounce", "soft_bounce"], "created_at": "2026-03-17 14:00:00", "last_sent_at": null, "batches_sent": 0, "events_sent": 0, "last_error": null}
```

</details>

<details>
<summary>Get webhook info</summary>

Retrieves detailed information about a specific webhook by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksInfoBody` | Yes | The info request containing the API key and webhook ID. |

Returns: `InlineResponse20076|error`

Sample code:

```ballerina
InlineResponse20076 info = check mailchimpClient->/webhooks/info.post({
    'key: apiKey,
    id: 43
});
```

Sample response:

```ballerina
{"id": 43, "url": "https://example.com/webhooks/mandrill", "description": "", "auth_key": "wh_key_456", "events": ["send", "open", "click", "hard_bounce", "soft_bounce"], "created_at": "2026-03-17 14:00:00", "last_sent_at": null, "batches_sent": 0, "events_sent": 0, "last_error": null}
```

</details>

<details>
<summary>Update a webhook</summary>

Updates the URL, events, or description of an existing webhook.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksUpdateBody` | Yes | The update request containing the API key, webhook ID, and fields to update. |

Returns: `InlineResponse20077|error`

Sample code:

```ballerina
InlineResponse20077 updated = check mailchimpClient->/webhooks/update.post({
    'key: apiKey,
    id: 43,
    url: "https://example.com/webhooks/mandrill-v2",
    events: ["send", "open", "click", "hard_bounce", "soft_bounce", "reject"]
});
```

Sample response:

```ballerina
{"id": 43, "url": "https://example.com/webhooks/mandrill-v2", "description": "", "auth_key": "wh_key_456", "events": ["send", "open", "click", "hard_bounce", "soft_bounce", "reject"], "created_at": "2026-03-17 14:00:00", "last_sent_at": null, "batches_sent": 0, "events_sent": 0, "last_error": null}
```

</details>

<details>
<summary>Delete a webhook</summary>

Permanently deletes a webhook by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksInfoBody` | Yes | The delete request containing the API key and webhook ID. |

Returns: `InlineResponse20078|error`

Sample code:

```ballerina
InlineResponse20078 deleted = check mailchimpClient->/webhooks/delete.post({
    'key: apiKey,
    id: 43
});
```

Sample response:

```ballerina
{"id": 43, "url": "https://example.com/webhooks/mandrill-v2"}
```

</details>

#### Sender management

<details>
<summary>List senders</summary>

Returns a list of all senders that have tried to send through the account, with aggregated stats.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20043[]|error`

Sample code:

```ballerina
InlineResponse20043[] senders = check mailchimpClient->/senders/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"address": "sender@example.com", "created_at": "2026-01-15 09:00:00", "sent": 5430, "hard_bounces": 12, "soft_bounces": 45, "rejects": 3, "complaints": 1, "unsubs": 8, "opens": 4200, "clicks": 1800, "unique_opens": 3100, "unique_clicks": 1200}]
```

</details>

<details>
<summary>Get sender info</summary>

Retrieves detailed information and aggregated statistics for a specific sender address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SendersInfoBody` | Yes | The info request containing the API key and sender address. |

Returns: `InlineResponse20048|error`

Sample code:

```ballerina
InlineResponse20048 senderInfo = check mailchimpClient->/senders/info.post({
    'key: apiKey,
    address: "sender@example.com"
});
```

Sample response:

```ballerina
{"address": "sender@example.com", "created_at": "2026-01-15 09:00:00", "sent": 5430, "hard_bounces": 12, "soft_bounces": 45, "rejects": 3, "complaints": 1, "unsubs": 8, "opens": 4200, "clicks": 1800, "unique_opens": 3100, "unique_clicks": 1200}
```

</details>

<details>
<summary>List sender domains</summary>

Returns a list of all sender domains with their verification and DKIM/SPF status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20044[]|error`

Sample code:

```ballerina
InlineResponse20044[] domains = check mailchimpClient->/senders/domains.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"domain": "example.com", "created_at": "2026-01-10 08:00:00", "last_tested_at": "2026-03-17 10:00:00", "spf": {"valid": true, "valid_after": null, "error": null}, "dkim": {"valid": true, "valid_after": null, "error": null}, "verified_at": "2026-01-10 08:30:00", "valid_signing": true}]
```

</details>

<details>
<summary>Verify a sender domain</summary>

Sends a verification email to the domain's postmaster address to verify ownership.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SendersVerifyDomainBody` | Yes | The verify request containing the API key, domain name, and mailbox. |

Returns: `InlineResponse20047|error`

Sample code:

```ballerina
InlineResponse20047 verifyResult = check mailchimpClient->/senders/verify\-domain.post({
    'key: apiKey,
    domain: "example.com",
    mailbox: "postmaster"
});
```

Sample response:

```ballerina
{"status": "sent", "domain": "example.com", "email": "postmaster@example.com"}
```

</details>

#### Tags

<details>
<summary>List tags</summary>

Returns a list of all tags with aggregated sending statistics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20057[]|error`

Sample code:

```ballerina
InlineResponse20057[] tags = check mailchimpClient->/tags/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"tag": "order-confirmation", "reputation": 95, "sent": 3200, "hard_bounces": 5, "soft_bounces": 12, "rejects": 1, "complaints": 0, "unsubs": 2, "opens": 2800, "clicks": 900, "unique_opens": 2100, "unique_clicks": 700}]
```

</details>

<details>
<summary>Get tag info</summary>

Retrieves detailed information and time-series statistics for a specific tag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TagsInfoBody` | Yes | The info request containing the API key and tag name. |

Returns: `InlineResponse20059|error`

Sample code:

```ballerina
InlineResponse20059 tagInfo = check mailchimpClient->/tags/info.post({
    'key: apiKey,
    tag: "order-confirmation"
});
```

Sample response:

```ballerina
{"tag": "order-confirmation", "reputation": 95, "sent": 3200, "hard_bounces": 5, "soft_bounces": 12, "rejects": 1, "complaints": 0, "unsubs": 2, "opens": 2800, "clicks": 900, "stats": {"today": {"sent": 45, "hard_bounces": 0, "soft_bounces": 1, "rejects": 0, "complaints": 0, "unsubs": 0, "opens": 38, "clicks": 12}}}
```

</details>

<details>
<summary>Delete a tag</summary>

Permanently deletes a tag and removes it from all associated messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TagsDeleteBody` | Yes | The delete request containing the API key and tag name. |

Returns: `InlineResponse20058|error`

Sample code:

```ballerina
InlineResponse20058 deleted = check mailchimpClient->/tags/delete.post({
    'key: apiKey,
    tag: "old-campaign"
});
```

Sample response:

```ballerina
{"tag": "old-campaign"}
```

</details>

#### Reject & allowlist management

<details>
<summary>Add to reject list</summary>

Adds an email address to the account-level reject list, preventing all future delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RejectsAddBody` | Yes | The reject request containing the API key, email address, and optional comment and subaccount. |

Returns: `InlineResponse20040|error`

Sample code:

```ballerina
InlineResponse20040 reject = check mailchimpClient->/rejects/add.post({
    'key: apiKey,
    email: "bounce@invalid.com",
    comment: "Persistent hard bounce"
});
```

Sample response:

```ballerina
{"email": "bounce@invalid.com", "added": true}
```

</details>

<details>
<summary>List rejected emails</summary>

Returns all email addresses on the reject list with reason and expiration details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RejectsListBody` | Yes | The list request containing the API key and optional email/subaccount filters. |

Returns: `InlineResponse20041[]|error`

Sample code:

```ballerina
InlineResponse20041[] rejects = check mailchimpClient->/rejects/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"email": "bounce@invalid.com", "reason": "manual", "detail": "Persistent hard bounce", "created_at": "2026-03-17 14:00:00", "last_event_at": "2026-03-17 14:00:00", "expires_at": null, "expired": false, "sender": null, "subaccount": null}]
```

</details>

<details>
<summary>Delete from reject list</summary>

Removes an email address from the reject list, allowing future delivery.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `RejectsDeleteBody` | Yes | The delete request containing the API key and email address. |

Returns: `InlineResponse20042|error`

Sample code:

```ballerina
InlineResponse20042 removed = check mailchimpClient->/rejects/delete.post({
    'key: apiKey,
    email: "bounce@invalid.com"
});
```

Sample response:

```ballerina
{"email": "bounce@invalid.com", "deleted": true}
```

</details>

<details>
<summary>Add to allowlist</summary>

Adds an email address or domain to the allowlist, ensuring delivery even if the address is on the reject list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AllowlistsAddBody` | Yes | The allowlist request containing the API key and email or domain. |

Returns: `InlineResponse200|error`

Sample code:

```ballerina
InlineResponse200 allowed = check mailchimpClient->/allowlists/add.post({
    'key: apiKey,
    email: "vip@example.com"
});
```

Sample response:

```ballerina
{"email": "vip@example.com", "added": true}
```

</details>

<details>
<summary>List allowlist entries</summary>

Returns all entries on the account allowlist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AllowlistsListBody` | Yes | The list request containing the API key and optional email filter. |

Returns: `InlineResponse2001[]|error`

Sample code:

```ballerina
InlineResponse2001[] allowlist = check mailchimpClient->/allowlists/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"email": "vip@example.com", "detail": "", "created_at": "2026-03-17 15:00:00"}]
```

</details>

#### Subaccount management

<details>
<summary>List subaccounts</summary>

Returns a list of all subaccounts with their status and sending statistics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SubaccountsListBody` | Yes | The list request containing the API key and optional query filter. |

Returns: `InlineResponse20050[]|error`

Sample code:

```ballerina
InlineResponse20050[] subaccounts = check mailchimpClient->/subaccounts/list.post({
    'key: apiKey,
    q: "client-a"
});
```

Sample response:

```ballerina
[{"id": "client-a", "name": "Client A", "custom_quota": 10000, "status": "active", "reputation": 92, "created_at": "2026-01-01 00:00:00", "first_sent_at": "2026-01-02 10:00:00", "sent_weekly": 450, "sent_monthly": 1800, "sent_total": 12000}]
```

</details>

<details>
<summary>Add a subaccount</summary>

Creates a new subaccount for organizing sends and managing quotas.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SubaccountsAddBody` | Yes | The creation request containing the API key, subaccount ID, name, and optional quota. |

Returns: `InlineResponse20051|error`

Sample code:

```ballerina
InlineResponse20051 subaccount = check mailchimpClient->/subaccounts/add.post({
    'key: apiKey,
    id: "client-b",
    name: "Client B",
    customQuota: 5000
});
```

Sample response:

```ballerina
{"id": "client-b", "name": "Client B", "custom_quota": 5000, "status": "active", "reputation": 0, "created_at": "2026-03-17 15:30:00", "first_sent_at": null, "sent_weekly": 0, "sent_monthly": 0, "sent_total": 0}
```

</details>

<details>
<summary>Delete a subaccount</summary>

Permanently deletes a subaccount. All messages sent by this subaccount remain in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SubaccountsDeleteBody` | Yes | The delete request containing the API key and subaccount ID. |

Returns: `InlineResponse20054|error`

Sample code:

```ballerina
InlineResponse20054 deleted = check mailchimpClient->/subaccounts/delete.post({
    'key: apiKey,
    id: "client-b"
});
```

Sample response:

```ballerina
{"id": "client-b", "name": "Client B", "custom_quota": 5000, "status": "active", "reputation": 0, "created_at": "2026-03-17 15:30:00"}
```

</details>

#### User & account info

<details>
<summary>Get account info</summary>

Returns information about the API-connected user, including quota, reputation, and historical stats.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The info request containing the API key. |

Returns: `InlineResponse20072|error`

Sample code:

```ballerina
InlineResponse20072 userInfo = check mailchimpClient->/users/info.post({
    'key: apiKey
});
```

Sample response:

```ballerina
{"username": "myuser", "created_at": "2025-06-01 00:00:00", "public_id": "abc123xyz", "reputation": 95, "hourly_quota": 5000, "backlog": 0, "stats": {"today": {"sent": 230, "hard_bounces": 1, "soft_bounces": 3, "rejects": 0, "complaints": 0, "unsubs": 0, "opens": 180, "unique_opens": 140, "clicks": 55, "unique_clicks": 42}}}
```

</details>

<details>
<summary>Ping the API</summary>

A simple health check that returns `"PONG!"` if the API key is valid and the service is reachable.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The ping request containing the API key. |

Returns: `string|error`

Sample code:

```ballerina
string pong = check mailchimpClient->/users/ping.post({
    'key: apiKey
});
```

Sample response:

```ballerina
"PONG!"
```

</details>

#### IP management

<details>
<summary>List dedicated IPs</summary>

Returns all dedicated IPs provisioned for the account with warmup status and pool info.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20017[]|error`

Sample code:

```ballerina
InlineResponse20017[] ips = check mailchimpClient->/ips/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"ip": "198.51.100.10", "created_at": "2026-01-15 00:00:00", "pool": "Main Pool", "domain": "example.com", "custom_dns": {"enabled": false, "valid": false, "error": ""}, "warmup": {"warming_up": false, "start_at": null, "end_at": null}}]
```

</details>

<details>
<summary>Get IP info</summary>

Retrieves detailed information about a specific dedicated IP address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IpsInfoBody` | Yes | The info request containing the API key and IP address. |

Returns: `InlineResponse20018|error`

Sample code:

```ballerina
InlineResponse20018 ipInfo = check mailchimpClient->/ips/info.post({
    'key: apiKey,
    ip: "198.51.100.10"
});
```

Sample response:

```ballerina
{"ip": "198.51.100.10", "created_at": "2026-01-15 00:00:00", "pool": "Main Pool", "domain": "example.com", "custom_dns": {"enabled": false, "valid": false, "error": ""}, "warmup": {"warming_up": false, "start_at": null, "end_at": null}}
```

</details>

#### Inbound routing

<details>
<summary>List inbound domains</summary>

Returns a list of all inbound domains configured for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse2008[]|error`

Sample code:

```ballerina
InlineResponse2008[] inboundDomains = check mailchimpClient->/inbound/domains.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"domain": "inbound.example.com", "created_at": "2026-02-01 00:00:00", "valid_mx": true}]
```

</details>

<details>
<summary>List inbound routes</summary>

Returns all inbound routes for a domain, including their URL patterns and webhook destinations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `InboundRoutesBody` | Yes | The routes request containing the API key and domain. |

Returns: `InlineResponse20012[]|error`

Sample code:

```ballerina
InlineResponse20012[] routes = check mailchimpClient->/inbound/routes.post({
    'key: apiKey,
    domain: "inbound.example.com"
});
```

Sample response:

```ballerina
[{"id": "route123", "pattern": "support@", "url": "https://example.com/inbound/support"}]
```

</details>

#### URL tracking

<details>
<summary>List tracked URLs</summary>

Returns the 100 most-clicked URLs with click statistics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20067[]|error`

Sample code:

```ballerina
InlineResponse20067[] urls = check mailchimpClient->/urls/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"url": "https://example.com/pricing", "sent": 2400, "clicks": 890, "unique_clicks": 650}]
```

</details>

<details>
<summary>List tracking domains</summary>

Returns a list of all custom tracking domains configured for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20070[]|error`

Sample code:

```ballerina
InlineResponse20070[] trackingDomains = check mailchimpClient->/urls/tracking\-domains.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"domain": "track.example.com", "created_at": "2026-01-20 00:00:00", "last_tested_at": "2026-03-17 10:00:00", "cname": {"valid": true, "valid_after": null, "error": null}, "valid_tracking": true}]
```

</details>

#### Metadata

<details>
<summary>List custom metadata fields</summary>

Returns all custom metadata fields defined in the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse20036[]|error`

Sample code:

```ballerina
InlineResponse20036[] metadata = check mailchimpClient->/metadata/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"name": "campaign_id", "state": "active", "view_template": ""}]
```

</details>

<details>
<summary>Add a metadata field</summary>

Creates a new custom metadata field for tagging messages with additional data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MetadataAddBody` | Yes | The add request containing the API key, field name, and optional view template. |

Returns: `InlineResponse20037|error`

Sample code:

```ballerina
InlineResponse20037 field = check mailchimpClient->/metadata/add.post({
    'key: apiKey,
    name: "order_id",
    viewTemplate: "order_id"
});
```

Sample response:

```ballerina
{"name": "order_id", "state": "active", "view_template": "order_id"}
```

</details>

#### Export data

<details>
<summary>List exports</summary>

Returns a list of all data export jobs for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsListBody` | Yes | The list request containing the API key. |

Returns: `InlineResponse2004[]|error`

Sample code:

```ballerina
InlineResponse2004[] exports = check mailchimpClient->/exports/list.post({
    'key: apiKey
});
```

Sample response:

```ballerina
[{"id": "exp_abc123", "created_at": "2026-03-17 10:00:00", "type": "activity", "finished_at": "2026-03-17 10:05:00", "state": "complete", "result_url": "https://mandrillapp.com/exports/exp_abc123.zip"}]
```

</details>

<details>
<summary>Export activity</summary>

Starts a new export job for account sending activity data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExportsActivityBody` | Yes | The export request containing the API key and optional date range and tag filters. |

Returns: `InlineResponse2007|error`

Sample code:

```ballerina
InlineResponse2007 exportJob = check mailchimpClient->/exports/activity.post({
    'key: apiKey,
    dateFrom: "2026-03-01 00:00:00",
    dateTo: "2026-03-17 23:59:59"
});
```

Sample response:

```ballerina
{"id": "exp_xyz789", "created_at": "2026-03-17 16:00:00", "type": "activity", "finished_at": null, "state": "waiting", "result_url": null}
```

</details>
