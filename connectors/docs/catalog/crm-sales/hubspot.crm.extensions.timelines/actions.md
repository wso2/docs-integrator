---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.extensions.timelines` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages timeline event templates, tokens, and events on HubSpot CRM records. |

---

## Client

Manages timeline event templates, tokens, and events on HubSpot CRM records.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | `()` | Circuit breaker configuration. |
| `compression` | <code>http:Compression</code> | `COMPRESSION_AUTO` | Compression configuration. |
| `validation` | <code>boolean</code> | `true` | Enable/disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.extensions.timelines as timelines;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

timelines:Client timelinesClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Event template management

<details>
<summary>List all event templates for your app</summary>

Signature: `get [int:Signed32 appId]/event-templates`

Retrieves all event templates associated with the specified app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |

Returns: `CollectionResponseTimelineEventTemplateNoPaging|error`

Sample code:

```ballerina
CollectionResponseTimelineEventTemplateNoPaging templates =
    check timelinesClient->/[appId]/event\-templates.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "name": "Pet Activity",
      "objectType": "CONTACT",
      "headerTemplate": "# Pet activity for {{petName}}",
      "detailTemplate": "Pet **{{petName}}** (age {{petAge}}), color: {{petColor}}",
      "tokens": [
        {"name": "petName", "label": "Pet Name", "type": "string"},
        {"name": "petAge", "label": "Pet Age", "type": "number"},
        {"name": "petColor", "label": "Pet Color", "type": "enumeration", "options": [{"label": "Red", "value": "red"}, {"label": "Blue", "value": "blue"}]}
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

</details>

<details>
<summary>Create an event template for the app</summary>

Signature: `post [int:Signed32 appId]/event-templates`

Creates a new event template for the specified app with custom tokens and display templates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `payload` | <code>TimelineEventTemplateCreateRequest</code> | Yes | The event template definition including name, tokens, and templates. |

Returns: `TimelineEventTemplate|error`

Sample code:

```ballerina
TimelineEventTemplateCreateRequest eventTemplate = {
    name: "Pet Activity",
    objectType: "CONTACT",
    tokens: [
        {name: "petName", label: "Pet Name", 'type: "string"},
        {name: "petAge", label: "Pet Age", 'type: "number"},
        {
            name: "petColor",
            label: "Pet Color",
            'type: "enumeration",
            options: [
                {label: "Red", value: "red"},
                {label: "Blue", value: "blue"}
            ]
        }
    ],
    headerTemplate: "# Pet activity for {{petName}}",
    detailTemplate: "Pet **{{petName}}** (age {{petAge}}), color: {{petColor}}"
};
TimelineEventTemplate result =
    check timelinesClient->/[appId]/event\-templates.post(eventTemplate);
```

Sample response:

```ballerina
{
  "id": "12345",
  "name": "Pet Activity",
  "objectType": "CONTACT",
  "headerTemplate": "# Pet activity for {{petName}}",
  "detailTemplate": "Pet **{{petName}}** (age {{petAge}}), color: {{petColor}}",
  "tokens": [
    {"name": "petName", "label": "Pet Name", "type": "string"},
    {"name": "petAge", "label": "Pet Age", "type": "number"},
    {"name": "petColor", "label": "Pet Color", "type": "enumeration", "options": [{"label": "Red", "value": "red"}, {"label": "Blue", "value": "blue"}]}
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

</details>

<details>
<summary>Gets a specific event template for your app</summary>

Signature: `get [int:Signed32 appId]/event-templates/[string eventTemplateId]`

Retrieves a specific event template by its ID for the given app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |

Returns: `TimelineEventTemplate|error`

Sample code:

```ballerina
TimelineEventTemplate template =
    check timelinesClient->/[appId]/event\-templates/[eventTemplateId].get();
```

Sample response:

```ballerina
{
  "id": "12345",
  "name": "Pet Activity",
  "objectType": "CONTACT",
  "headerTemplate": "# Pet activity for {{petName}}",
  "detailTemplate": "Pet **{{petName}}** (age {{petAge}}), color: {{petColor}}",
  "tokens": [
    {"name": "petName", "label": "Pet Name", "type": "string"},
    {"name": "petAge", "label": "Pet Age", "type": "number"}
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

</details>

<details>
<summary>Update an existing event template</summary>

Signature: `put [int:Signed32 appId]/event-templates/[string eventTemplateId]`

Updates an existing event template's name, tokens, header, and detail templates.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `payload` | <code>TimelineEventTemplateUpdateRequest</code> | Yes | The updated template definition. |

Returns: `TimelineEventTemplate|error`

Sample code:

```ballerina
TimelineEventTemplateUpdateRequest updateReq = {
    id: eventTemplateId,
    name: "Updated Pet Activity",
    tokens: [
        {name: "petName", label: "Pet Name", 'type: "string"}
    ],
    headerTemplate: "# Updated pet activity for {{petName}}"
};
TimelineEventTemplate updated =
    check timelinesClient->/[appId]/event\-templates/[eventTemplateId].put(updateReq);
```

Sample response:

```ballerina
{
  "id": "12345",
  "name": "Updated Pet Activity",
  "objectType": "CONTACT",
  "headerTemplate": "# Updated pet activity for {{petName}}",
  "tokens": [
    {"name": "petName", "label": "Pet Name", "type": "string"}
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-16T08:00:00Z"
}
```

</details>

<details>
<summary>Deletes an event template for the app</summary>

Signature: `delete [int:Signed32 appId]/event-templates/[string eventTemplateId]`

Deletes the specified event template from the app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `eventTemplateId` | <code>string</code> | Yes | The event template ID to delete. |

Returns: `error?`

Sample code:

```ballerina
check timelinesClient->/[appId]/event\-templates/[eventTemplateId].delete();
```

</details>

#### Event template tokens

<details>
<summary>Adds a token to an existing event template</summary>

Signature: `post [int:Signed32 appId]/event-templates/[string eventTemplateId]/tokens`

Adds a new token to an existing event template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `payload` | <code>TimelineEventTemplateToken</code> | Yes | The token definition. |

Returns: `TimelineEventTemplateToken|error`

Sample code:

```ballerina
TimelineEventTemplateToken token = {
    name: "petBreed",
    label: "Pet Breed",
    'type: "string"
};
TimelineEventTemplateToken result =
    check timelinesClient->/[appId]/event\-templates/[eventTemplateId]/tokens.post(token);
```

Sample response:

```ballerina
{
  "name": "petBreed",
  "label": "Pet Breed",
  "type": "string",
  "createdAt": "2024-01-16T09:00:00Z",
  "updatedAt": "2024-01-16T09:00:00Z"
}
```

</details>

<details>
<summary>Updates an existing token on an event template</summary>

Signature: `put [int:Signed32 appId]/event-templates/[string eventTemplateId]/tokens/[string tokenName]`

Updates an existing token's label, options, or object property name on an event template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `tokenName` | <code>string</code> | Yes | The name of the token to update. |
| `payload` | <code>TimelineEventTemplateTokenUpdateRequest</code> | Yes | The updated token properties. |

Returns: `TimelineEventTemplateToken|error`

Sample code:

```ballerina
TimelineEventTemplateTokenUpdateRequest updateReq = {
    label: "Pet Breed Name"
};
TimelineEventTemplateToken updated =
    check timelinesClient->/[appId]/event\-templates/[eventTemplateId]/tokens/[tokenName].put(updateReq);
```

Sample response:

```ballerina
{
  "name": "petBreed",
  "label": "Pet Breed Name",
  "type": "string",
  "createdAt": "2024-01-16T09:00:00Z",
  "updatedAt": "2024-01-16T10:00:00Z"
}
```

</details>

<details>
<summary>Removes a token from the event template</summary>

Signature: `delete [int:Signed32 appId]/event-templates/[string eventTemplateId]/tokens/[string tokenName]`

Removes the specified token from the event template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The HubSpot app ID. |
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `tokenName` | <code>string</code> | Yes | The name of the token to remove. |

Returns: `error?`

Sample code:

```ballerina
check timelinesClient->/[appId]/event\-templates/[eventTemplateId]/tokens/[tokenName].delete();
```

</details>

#### Timeline events

<details>
<summary>Create a single event</summary>

Signature: `post events`

Creates a single timeline event on a CRM record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TimelineEvent</code> | Yes | The timeline event definition. |

Returns: `TimelineEventResponse|error`

Sample code:

```ballerina
TimelineEvent event = {
    eventTemplateId: eventTemplateId,
    objectId: contactId,
    tokens: {
        "petName": "Buddy",
        "petAge": "3",
        "petColor": "blue"
    },
    extraData: {
        "additionalInfo": "Adopted from shelter"
    },
    timelineIFrame: {
        linkLabel: "View Details",
        headerLabel: "Pet Details",
        width: 800,
        height: 600,
        url: "https://example.com/pet/buddy"
    }
};
TimelineEventResponse result =
    check timelinesClient->/events.post(event);
```

Sample response:

```ballerina
{
  "id": "evt-001",
  "eventTemplateId": "12345",
  "objectId": "501",
  "objectType": "CONTACT",
  "tokens": {"petName": "Buddy", "petAge": "3", "petColor": "blue"},
  "extraData": {"additionalInfo": "Adopted from shelter"},
  "timelineIFrame": {"linkLabel": "View Details", "headerLabel": "Pet Details", "width": 800, "height": 600, "url": "https://example.com/pet/buddy"},
  "createdAt": "2024-01-16T11:00:00Z"
}
```

</details>

<details>
<summary>Creates multiple events</summary>

Signature: `post events/batch/create`

Creates multiple timeline events in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>BatchInputTimelineEvent</code> | Yes | Batch input containing an array of timeline events. |

Returns: `BatchResponseTimelineEventResponse|BatchResponseTimelineEventResponseWithErrors|json|error`

Sample code:

```ballerina
BatchInputTimelineEvent batchInput = {
    inputs: [
        {
            eventTemplateId: eventTemplateId,
            objectId: "501",
            tokens: {"petName": "Buddy", "petAge": "3"}
        },
        {
            eventTemplateId: eventTemplateId,
            objectId: "502",
            tokens: {"petName": "Max", "petAge": "5"}
        }
    ]
};
BatchResponseTimelineEventResponse|BatchResponseTimelineEventResponseWithErrors|json result =
    check timelinesClient->/events/batch/create.post(batchInput);
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {"id": "evt-001", "eventTemplateId": "12345", "objectId": "501", "tokens": {"petName": "Buddy", "petAge": "3"}, "createdAt": "2024-01-16T11:00:00Z"},
    {"id": "evt-002", "eventTemplateId": "12345", "objectId": "502", "tokens": {"petName": "Max", "petAge": "5"}, "createdAt": "2024-01-16T11:00:01Z"}
  ],
  "startedAt": "2024-01-16T11:00:00Z",
  "completedAt": "2024-01-16T11:00:01Z"
}
```

</details>

<details>
<summary>Gets the event</summary>

Signature: `get events/[string eventTemplateId]/[string eventId]`

Retrieves a specific timeline event by its template ID and event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `eventId` | <code>string</code> | Yes | The event ID. |

Returns: `TimelineEventResponse|error`

Sample code:

```ballerina
TimelineEventResponse event =
    check timelinesClient->/events/[eventTemplateId]/[eventId].get();
```

Sample response:

```ballerina
{
  "id": "evt-001",
  "eventTemplateId": "12345",
  "objectId": "501",
  "objectType": "CONTACT",
  "tokens": {"petName": "Buddy", "petAge": "3"},
  "createdAt": "2024-01-16T11:00:00Z"
}
```

</details>

<details>
<summary>Gets the detailTemplate as rendered</summary>

Signature: `get events/[string eventTemplateId]/[string eventId]/detail`

Returns the rendered detail template for a specific timeline event.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `eventId` | <code>string</code> | Yes | The event ID. |

Returns: `EventDetail|error`

Sample code:

```ballerina
EventDetail detail =
    check timelinesClient->/events/[eventTemplateId]/[eventId]/detail.get();
```

Sample response:

```ballerina
{
  "details": "Pet **Buddy** (age 3), color: blue"
}
```

</details>

<details>
<summary>Renders the header or detail as HTML</summary>

Signature: `get events/[string eventTemplateId]/[string eventId]/render`

Renders the header template (or detail template if `detail=true`) as HTML for a specific event.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventTemplateId` | <code>string</code> | Yes | The event template ID. |
| `eventId` | <code>string</code> | Yes | The event ID. |
| `detail` | <code>boolean</code> | No | If `true`, renders the detail template instead of the header template. |

Returns: `string|error`

Sample code:

```ballerina
string renderedHtml =
    check timelinesClient->/events/[eventTemplateId]/[eventId]/render.get(detail = true);
```

Sample response:

```ballerina
"<h1>Pet activity for Buddy</h1>"
```

</details>
