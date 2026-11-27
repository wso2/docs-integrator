---
connector: true
connector_name: "microsoft.outlook.calendar"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Microsoft Outlook Calendar connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage Microsoft Outlook calendars and events through Microsoft Graph: calendars and calendar groups, events and attachments, meeting responses, calendar sharing permissions, calendar views and free/busy availability, for the signed-in user and for other users in the organization. |

---

## Client

The `Client` connects to the Microsoft Graph API (`https://graph.microsoft.com/v1.0`). It exposes 352 operations.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/microsoft.outlook.calendar;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

final calendar:Client calendarClient = check new ({
    auth: {clientId, clientSecret, refreshToken, refreshUrl}
});
```

### Operations

#### Signed-in user

<details>
<summary>getDefaultCalendar</summary>

<div>

Get the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getDefaultCalendar();
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>updateDefaultCalendar</summary>

<div>

Update the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Calendar</code> | Yes | The me calendar properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->updateDefaultCalendar({
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listDefaultCalendarPermissions</summary>

<div>

List the sharing permissions of the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermissionCollection|error`

**Sample code:**

```ballerina
calendar:CalendarPermissionCollection result = check calendarClient->listDefaultCalendarPermissions();
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isInsideOrganization": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultCalendarPermission</summary>

<div>

Create a sharing permission on the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CalendarPermission</code> | Yes | The me calendar calendar permissions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->createDefaultCalendarPermission({
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getDefaultCalendarPermission</summary>

<div>

Get a sharing permission of the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->getDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>deleteDefaultCalendarPermission</summary>

<div>

Delete a sharing permission of the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>DeleteDefaultCalendarPermissionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultCalendarPermission</summary>

<div>

Update a sharing permission of the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `payload` | <code>CalendarPermission</code> | Yes | The me calendar calendar permissions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->updateDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>countDefaultCalendarPermissions</summary>

<div>

Count the sharing permissions of the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countDefaultCalendarPermissions();
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listDefaultCalendarView</summary>

<div>

List the event occurrences of the signed-in user's default calendar in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listDefaultCalendarView(startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listDefaultCalendarViewDelta</summary>

<div>

Track changes to the event occurrences of the signed-in user's default calendar in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listDefaultCalendarViewDelta(startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listDefaultEvents</summary>

<div>

List the events in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listDefaultEvents();
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultEvent</summary>

<div>

Create an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Event</code> | Yes | The me calendar events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createDefaultEvent({
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getDefaultEvent</summary>

<div>

Get an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteDefaultEvent</summary>

<div>

Delete an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteDefaultEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultEvent</summary>

<div>

Update an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The me calendar events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listDefaultEventAttachments</summary>

<div>

List the attachments of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listDefaultEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultEventAttachment</summary>

<div>

Add an attachment to an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The me calendar events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createDefaultEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getDefaultEventAttachment</summary>

<div>

Get an attachment of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getDefaultEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteDefaultEventAttachment</summary>

<div>

Delete an attachment of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteDefaultEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteDefaultEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countDefaultEventAttachments</summary>

<div>

Count the attachments of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countDefaultEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createDefaultEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createDefaultEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getDefaultEventCalendar</summary>

<div>

Get the calendar that contains an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getDefaultEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listDefaultEventExtensions</summary>

<div>

List the open extensions of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listDefaultEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDefaultEventExtension</summary>

<div>

Create an open extension on an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The me calendar events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getDefaultEventExtension</summary>

<div>

Get an open extension of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteDefaultEventExtension</summary>

<div>

Delete an open extension of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteDefaultEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateDefaultEventExtension</summary>

<div>

Update an open extension of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The me calendar events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countDefaultEventExtensions</summary>

<div>

Count the open extensions of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countDefaultEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listDefaultEventInstances</summary>

<div>

List the occurrences of a recurring event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listDefaultEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listDefaultEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listDefaultEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptDefaultEvent</summary>

<div>

Accept an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelDefaultEvent</summary>

<div>

Cancel a meeting in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineDefaultEvent</summary>

<div>

Decline an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissDefaultEventReminder</summary>

<div>

Dismiss the reminder of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissDefaultEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardDefaultEvent</summary>

<div>

Forward an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteDefaultEvent</summary>

<div>

Permanently delete an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeDefaultEventReminder</summary>

<div>

Snooze the reminder of an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeDefaultEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptDefaultEvent</summary>

<div>

Tentatively accept an event in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countDefaultEvents</summary>

<div>

Count the events in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countDefaultEvents();
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listDefaultEventsDelta</summary>

<div>

Track changes to the events in the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listDefaultEventsDelta(startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listDefaultCalendarSharingRoles</summary>

<div>

List the roles a user can be granted when the signed-in user's default calendar is shared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user` | <code>string</code> | Yes | Usage: User='&#123;User&#125;'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `count` | <code>boolean</code> | No | Include count of items. |

**Returns:** `CalendarSharingRoleCollection|error`

**Sample code:**

```ballerina
calendar:CalendarSharingRoleCollection result = check calendarClient->listDefaultCalendarSharingRoles("string");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getDefaultCalendarSchedule</summary>

<div>

Get the free/busy availability of users, lists or resources through the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>GetScheduleRequest</code> | Yes | Schedules to look up, the time period and the availability interval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScheduleInformationCollection|error`

**Sample code:**

```ballerina
calendar:ScheduleInformationCollection result = check calendarClient->getDefaultCalendarSchedule({
    schedules: ["string"],
    endTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    startTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    availabilityViewInterval: 100.00
});
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "availabilityView": "string",
      "scheduleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>permanentlyDeleteDefaultCalendar</summary>

<div>

Permanently delete the signed-in user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteDefaultCalendar();
```

</div>
</details>

<details>
<summary>listCalendarGroups</summary>

<div>

List the calendar groups of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarGroupCollection|error`

**Sample code:**

```ballerina
calendar:CalendarGroupCollection result = check calendarClient->listCalendarGroups();
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalendarGroup</summary>

<div>

Create a calendar group for the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CalendarGroup</code> | Yes | The me calendar groups to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarGroup|error`

**Sample code:**

```ballerina
calendar:CalendarGroup result = check calendarClient->createCalendarGroup({
    atOdataType: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "classId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "calendars": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ],
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getCalendarGroup</summary>

<div>

Get a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarGroup|error`

**Sample code:**

```ballerina
calendar:CalendarGroup result = check calendarClient->getCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "classId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "calendars": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ],
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteCalendarGroup</summary>

<div>

Delete a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>DeleteCalendarGroupHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCalendarGroup</summary>

<div>

Update a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `payload` | <code>CalendarGroup</code> | Yes | The me calendar groups properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarGroup|error`

**Sample code:**

```ballerina
calendar:CalendarGroup result = check calendarClient->updateCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "classId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "calendars": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ],
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>listGroupCalendars</summary>

<div>

List the calendars in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarCollection|error`

**Sample code:**

```ballerina
calendar:CalendarCollection result = check calendarClient->listGroupCalendars("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroupCalendar</summary>

<div>

Create a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `payload` | <code>Calendar</code> | Yes | The me calendar groups calendars to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->createGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>getGroupCalendar</summary>

<div>

Get a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>deleteGroupCalendar</summary>

<div>

Delete a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>DeleteGroupCalendarHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGroupCalendar</summary>

<div>

Update a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Calendar</code> | Yes | The me calendar groups calendars properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->updateGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listGroupCalendarPermissions</summary>

<div>

List the sharing permissions of a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermissionCollection|error`

**Sample code:**

```ballerina
calendar:CalendarPermissionCollection result = check calendarClient->listGroupCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isInsideOrganization": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroupCalendarPermission</summary>

<div>

Create a sharing permission on a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>CalendarPermission</code> | Yes | The me calendar groups calendars calendar permissions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->createGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getGroupCalendarPermission</summary>

<div>

Get a sharing permission of a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->getGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>deleteGroupCalendarPermission</summary>

<div>

Delete a sharing permission of a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>DeleteGroupCalendarPermissionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGroupCalendarPermission</summary>

<div>

Update a sharing permission of a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `payload` | <code>CalendarPermission</code> | Yes | The me calendar groups calendars calendar permissions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->updateGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>countGroupCalendarPermissions</summary>

<div>

Count the sharing permissions of a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countGroupCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listGroupCalendarView</summary>

<div>

List the event occurrences of a calendar in a calendar group of the signed-in user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listGroupCalendarView("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listGroupCalendarViewDelta</summary>

<div>

Track changes to the event occurrences of a calendar in a calendar group of the signed-in user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listGroupCalendarViewDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listGroupEvents</summary>

<div>

List the events in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listGroupEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroupEvent</summary>

<div>

Create an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Event</code> | Yes | The me calendar groups calendars events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getGroupEvent</summary>

<div>

Get an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteGroupEvent</summary>

<div>

Delete an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteGroupEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGroupEvent</summary>

<div>

Update an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The me calendar groups calendars events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listGroupEventAttachments</summary>

<div>

List the attachments of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listGroupEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroupEventAttachment</summary>

<div>

Add an attachment to an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The calendar groups calendars events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createGroupEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getGroupEventAttachment</summary>

<div>

Get an attachment of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getGroupEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteGroupEventAttachment</summary>

<div>

Delete an attachment of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteGroupEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteGroupEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countGroupEventAttachments</summary>

<div>

Count the attachments of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countGroupEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createGroupEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createGroupEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getGroupEventCalendar</summary>

<div>

Get the calendar that contains an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getGroupEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listGroupEventExtensions</summary>

<div>

List the open extensions of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listGroupEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroupEventExtension</summary>

<div>

Create an open extension on an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The calendar groups calendars events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getGroupEventExtension</summary>

<div>

Get an open extension of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteGroupEventExtension</summary>

<div>

Delete an open extension of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteGroupEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateGroupEventExtension</summary>

<div>

Update an open extension of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The calendar groups calendars events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countGroupEventExtensions</summary>

<div>

Count the open extensions of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countGroupEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listGroupEventInstances</summary>

<div>

List the occurrences of a recurring event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listGroupEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listGroupEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listGroupEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptGroupEvent</summary>

<div>

Accept an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelGroupEvent</summary>

<div>

Cancel a meeting in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineGroupEvent</summary>

<div>

Decline an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissGroupEventReminder</summary>

<div>

Dismiss the reminder of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissGroupEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardGroupEvent</summary>

<div>

Forward an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteGroupEvent</summary>

<div>

Permanently delete an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeGroupEventReminder</summary>

<div>

Snooze the reminder of an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeGroupEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptGroupEvent</summary>

<div>

Tentatively accept an event in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countGroupEvents</summary>

<div>

Count the events in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countGroupEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listGroupEventsDelta</summary>

<div>

Track changes to the events in a calendar of a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listGroupEventsDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listGroupCalendarSharingRoles</summary>

<div>

List the roles a user can be granted when a calendar in a calendar group of the signed-in user is shared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `user` | <code>string</code> | Yes | Usage: User='&#123;User&#125;'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `count` | <code>boolean</code> | No | Include count of items. |

**Returns:** `CalendarSharingRoleCollection|error`

**Sample code:**

```ballerina
calendar:CalendarSharingRoleCollection result = check calendarClient->listGroupCalendarSharingRoles("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getGroupCalendarSchedule</summary>

<div>

Get the free/busy availability of users, lists or resources through a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>GetScheduleRequest</code> | Yes | Schedules to look up, the time period and the availability interval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScheduleInformationCollection|error`

**Sample code:**

```ballerina
calendar:ScheduleInformationCollection result = check calendarClient->getGroupCalendarSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    schedules: ["string"],
    endTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    startTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    availabilityViewInterval: 100.00
});
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "availabilityView": "string",
      "scheduleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>permanentlyDeleteGroupCalendar</summary>

<div>

Permanently delete a calendar in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countGroupCalendars</summary>

<div>

Count the calendars in a calendar group of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countGroupCalendars("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>countCalendarGroups</summary>

<div>

Count the calendar groups of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countCalendarGroups();
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listCalendars</summary>

<div>

List the calendars of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarCollection|error`

**Sample code:**

```ballerina
calendar:CalendarCollection result = check calendarClient->listCalendars();
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalendar</summary>

<div>

Create a calendar for the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Calendar</code> | Yes | The me calendars to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->createCalendar({
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>getCalendar</summary>

<div>

Get a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>deleteCalendar</summary>

<div>

Delete a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>DeleteCalendarHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCalendar</summary>

<div>

Update a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Calendar</code> | Yes | The me calendars properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->updateCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listCalendarPermissions</summary>

<div>

List the sharing permissions of a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermissionCollection|error`

**Sample code:**

```ballerina
calendar:CalendarPermissionCollection result = check calendarClient->listCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isInsideOrganization": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalendarPermission</summary>

<div>

Create a sharing permission on a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>CalendarPermission</code> | Yes | The me calendars calendar permissions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->createCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getCalendarPermission</summary>

<div>

Get a sharing permission of a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->getCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>deleteCalendarPermission</summary>

<div>

Delete a sharing permission of a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>DeleteCalendarPermissionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCalendarPermission</summary>

<div>

Update a sharing permission of a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `payload` | <code>CalendarPermission</code> | Yes | The me calendars calendar permissions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->updateCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>countCalendarPermissions</summary>

<div>

Count the sharing permissions of a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listCalendarViewById</summary>

<div>

List the event occurrences of a calendar of the signed-in user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listCalendarViewById("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listCalendarViewByIdDelta</summary>

<div>

Track changes to the event occurrences of a calendar of the signed-in user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listCalendarViewByIdDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listCalendarEvents</summary>

<div>

List the events in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listCalendarEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalendarEvent</summary>

<div>

Create an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Event</code> | Yes | The me calendars events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getCalendarEvent</summary>

<div>

Get an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteCalendarEvent</summary>

<div>

Delete an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteCalendarEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCalendarEvent</summary>

<div>

Update an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The me calendars events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listCalendarEventAttachments</summary>

<div>

List the attachments of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listCalendarEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalendarEventAttachment</summary>

<div>

Add an attachment to an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The me calendars events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createCalendarEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getCalendarEventAttachment</summary>

<div>

Get an attachment of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getCalendarEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteCalendarEventAttachment</summary>

<div>

Delete an attachment of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteCalendarEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteCalendarEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countCalendarEventAttachments</summary>

<div>

Count the attachments of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countCalendarEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createCalendarEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createCalendarEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getCalendarEventCalendar</summary>

<div>

Get the calendar that contains an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getCalendarEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listCalendarEventExtensions</summary>

<div>

List the open extensions of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listCalendarEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalendarEventExtension</summary>

<div>

Create an open extension on an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The me calendars events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getCalendarEventExtension</summary>

<div>

Get an open extension of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteCalendarEventExtension</summary>

<div>

Delete an open extension of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteCalendarEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateCalendarEventExtension</summary>

<div>

Update an open extension of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The me calendars events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countCalendarEventExtensions</summary>

<div>

Count the open extensions of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countCalendarEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listCalendarEventInstances</summary>

<div>

List the occurrences of a recurring event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listCalendarEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listCalendarEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listCalendarEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptCalendarEvent</summary>

<div>

Accept an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelCalendarEvent</summary>

<div>

Cancel a meeting in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineCalendarEvent</summary>

<div>

Decline an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissCalendarEventReminder</summary>

<div>

Dismiss the reminder of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissCalendarEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardCalendarEvent</summary>

<div>

Forward an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteCalendarEvent</summary>

<div>

Permanently delete an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeCalendarEventReminder</summary>

<div>

Snooze the reminder of an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeCalendarEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptCalendarEvent</summary>

<div>

Tentatively accept an event in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countCalendarEvents</summary>

<div>

Count the events in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countCalendarEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listCalendarEventsDelta</summary>

<div>

Track changes to the events in a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listCalendarEventsDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listCalendarSharingRoles</summary>

<div>

List the roles a user can be granted when a calendar of the signed-in user is shared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `user` | <code>string</code> | Yes | Usage: User='&#123;User&#125;'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `count` | <code>boolean</code> | No | Include count of items. |

**Returns:** `CalendarSharingRoleCollection|error`

**Sample code:**

```ballerina
calendar:CalendarSharingRoleCollection result = check calendarClient->listCalendarSharingRoles("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getCalendarSchedule</summary>

<div>

Get the free/busy availability of users, lists or resources through a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>GetScheduleRequest</code> | Yes | Schedules to look up, the time period and the availability interval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScheduleInformationCollection|error`

**Sample code:**

```ballerina
calendar:ScheduleInformationCollection result = check calendarClient->getCalendarSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    schedules: ["string"],
    endTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    startTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    availabilityViewInterval: 100.00
});
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "availabilityView": "string",
      "scheduleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>permanentlyDeleteCalendar</summary>

<div>

Permanently delete a calendar of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countCalendars</summary>

<div>

Count the calendars of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countCalendars();
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listCalendarView</summary>

<div>

List the event occurrences of the signed-in user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listCalendarView(startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listCalendarViewDelta</summary>

<div>

Track changes to the event occurrences of the signed-in user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listCalendarViewDelta(startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listEvents</summary>

<div>

List the events of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listEvents();
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createEvent</summary>

<div>

Create an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Event</code> | Yes | The me events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createEvent({
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getEvent</summary>

<div>

Get an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteEvent</summary>

<div>

Delete an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateEvent</summary>

<div>

Update an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The me events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listEventAttachments</summary>

<div>

List the attachments of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createEventAttachment</summary>

<div>

Add an attachment to an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The me events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getEventAttachment</summary>

<div>

Get an attachment of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteEventAttachment</summary>

<div>

Delete an attachment of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countEventAttachments</summary>

<div>

Count the attachments of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getEventCalendar</summary>

<div>

Get the calendar that contains an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listEventExtensions</summary>

<div>

List the open extensions of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createEventExtension</summary>

<div>

Create an open extension on an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The me events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getEventExtension</summary>

<div>

Get an open extension of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteEventExtension</summary>

<div>

Delete an open extension of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateEventExtension</summary>

<div>

Update an open extension of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The me events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countEventExtensions</summary>

<div>

Count the open extensions of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listEventInstances</summary>

<div>

List the occurrences of a recurring event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptEvent</summary>

<div>

Accept an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelEvent</summary>

<div>

Cancel a meeting of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineEvent</summary>

<div>

Decline an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissEventReminder</summary>

<div>

Dismiss the reminder of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardEvent</summary>

<div>

Forward an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteEvent</summary>

<div>

Permanently delete an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeEventReminder</summary>

<div>

Snooze the reminder of an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptEvent</summary>

<div>

Tentatively accept an event of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countEvents</summary>

<div>

Count the events of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countEvents();
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listEventsDelta</summary>

<div>

Track changes to the events of the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listEventsDelta(startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>findMeetingTimes</summary>

<div>

Suggest meeting times and locations for the signed-in user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>FindMeetingTimesRequest</code> | Yes | Attendees, time and location constraints for finding meeting times. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MeetingTimeSuggestionsResult|error`

**Sample code:**

```ballerina
calendar:MeetingTimeSuggestionsResult result = check calendarClient->findMeetingTimes({
    attendees: [{
        atOdataType: "string",
        'type: "required"
    }],
    locationConstraint: <calendar:LocationConstraint>{
        isRequired: false,
        atOdataType: "string",
        suggestLocation: false
    },
    timeConstraint: <calendar:TimeConstraint>{
        atOdataType: "string",
        activityDomain: "unknown"
    },
    meetingDuration: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "meetingTimeSuggestions": [
    {
      "organizerAvailability": "unknown",
      "@odata.type": "string",
      "confidence": 100.00
    }
  ],
  "emptySuggestionsReason": "string"
}
```

</div>
</details>

#### Specific users

<details>
<summary>getUserDefaultCalendar</summary>

<div>

Get a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserDefaultCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>updateUserDefaultCalendar</summary>

<div>

Update a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>Calendar</code> | Yes | The users calendar properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->updateUserDefaultCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserDefaultCalendarPermissions</summary>

<div>

List the sharing permissions of a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermissionCollection|error`

**Sample code:**

```ballerina
calendar:CalendarPermissionCollection result = check calendarClient->listUserDefaultCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isInsideOrganization": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserDefaultCalendarPermission</summary>

<div>

Create a sharing permission on a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>CalendarPermission</code> | Yes | The users calendar calendar permissions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->createUserDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getUserDefaultCalendarPermission</summary>

<div>

Get a sharing permission of a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->getUserDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserDefaultCalendarPermission</summary>

<div>

Delete a sharing permission of a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>DeleteUserDefaultCalendarPermissionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserDefaultCalendarPermission</summary>

<div>

Update a sharing permission of a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `payload` | <code>CalendarPermission</code> | Yes | The users calendar calendar permissions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->updateUserDefaultCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>countUserDefaultCalendarPermissions</summary>

<div>

Count the sharing permissions of a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserDefaultCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserDefaultCalendarView</summary>

<div>

List the event occurrences of a user's default calendar in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserDefaultCalendarView("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserDefaultCalendarViewDelta</summary>

<div>

Track changes to the event occurrences of a user's default calendar in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserDefaultCalendarViewDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserDefaultEvents</summary>

<div>

List the events in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserDefaultEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserDefaultEvent</summary>

<div>

Create an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>Event</code> | Yes | The users calendar events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserDefaultEvent</summary>

<div>

Get an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserDefaultEvent</summary>

<div>

Delete an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteUserDefaultEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserDefaultEvent</summary>

<div>

Update an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The users calendar events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listUserDefaultEventAttachments</summary>

<div>

List the attachments of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listUserDefaultEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserDefaultEventAttachment</summary>

<div>

Add an attachment to an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The users calendar events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createUserDefaultEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getUserDefaultEventAttachment</summary>

<div>

Get an attachment of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getUserDefaultEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteUserDefaultEventAttachment</summary>

<div>

Delete an attachment of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteUserDefaultEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserDefaultEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countUserDefaultEventAttachments</summary>

<div>

Count the attachments of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserDefaultEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createUserDefaultEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createUserDefaultEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserDefaultEventCalendar</summary>

<div>

Get the calendar that contains an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserDefaultEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserDefaultEventExtensions</summary>

<div>

List the open extensions of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listUserDefaultEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserDefaultEventExtension</summary>

<div>

Create an open extension on an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The users calendar events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createUserDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getUserDefaultEventExtension</summary>

<div>

Get an open extension of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getUserDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteUserDefaultEventExtension</summary>

<div>

Delete an open extension of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteUserDefaultEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserDefaultEventExtension</summary>

<div>

Update an open extension of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The users calendar events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateUserDefaultEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countUserDefaultEventExtensions</summary>

<div>

Count the open extensions of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserDefaultEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserDefaultEventInstances</summary>

<div>

List the occurrences of a recurring event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserDefaultEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserDefaultEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserDefaultEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptUserDefaultEvent</summary>

<div>

Accept an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelUserDefaultEvent</summary>

<div>

Cancel a meeting in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineUserDefaultEvent</summary>

<div>

Decline an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissUserDefaultEventReminder</summary>

<div>

Dismiss the reminder of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissUserDefaultEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardUserDefaultEvent</summary>

<div>

Forward an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserDefaultEvent</summary>

<div>

Permanently delete an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeUserDefaultEventReminder</summary>

<div>

Snooze the reminder of an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeUserDefaultEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptUserDefaultEvent</summary>

<div>

Tentatively accept an event in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptUserDefaultEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countUserDefaultEvents</summary>

<div>

Count the events in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserDefaultEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserDefaultEventsDelta</summary>

<div>

Track changes to the events in a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserDefaultEventsDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserDefaultCalendarSharingRoles</summary>

<div>

List the roles a user can be granted when a user's default calendar is shared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `user` | <code>string</code> | Yes | Usage: User='&#123;User&#125;'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `count` | <code>boolean</code> | No | Include count of items. |

**Returns:** `CalendarSharingRoleCollection|error`

**Sample code:**

```ballerina
calendar:CalendarSharingRoleCollection result = check calendarClient->listUserDefaultCalendarSharingRoles("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getUserDefaultCalendarSchedule</summary>

<div>

Get the free/busy availability of users, lists or resources through a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>GetScheduleRequest</code> | Yes | Schedules to look up, the time period and the availability interval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScheduleInformationCollection|error`

**Sample code:**

```ballerina
calendar:ScheduleInformationCollection result = check calendarClient->getUserDefaultCalendarSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    schedules: ["string"],
    endTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    startTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    availabilityViewInterval: 100.00
});
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "availabilityView": "string",
      "scheduleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserDefaultCalendar</summary>

<div>

Permanently delete a user's default calendar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserDefaultCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listUserCalendarGroups</summary>

<div>

List the calendar groups of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarGroupCollection|error`

**Sample code:**

```ballerina
calendar:CalendarGroupCollection result = check calendarClient->listUserCalendarGroups("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserCalendarGroup</summary>

<div>

Create a calendar group for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>CalendarGroup</code> | Yes | The users calendar groups to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarGroup|error`

**Sample code:**

```ballerina
calendar:CalendarGroup result = check calendarClient->createUserCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "classId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "calendars": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ],
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getUserCalendarGroup</summary>

<div>

Get a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarGroup|error`

**Sample code:**

```ballerina
calendar:CalendarGroup result = check calendarClient->getUserCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "classId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "calendars": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ],
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteUserCalendarGroup</summary>

<div>

Delete a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>DeleteUserCalendarGroupHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserCalendarGroup</summary>

<div>

Update a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `payload` | <code>CalendarGroup</code> | Yes | The users calendar groups properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarGroup|error`

**Sample code:**

```ballerina
calendar:CalendarGroup result = check calendarClient->updateUserCalendarGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "classId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "calendars": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ],
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>listUserGroupCalendars</summary>

<div>

List the calendars in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarCollection|error`

**Sample code:**

```ballerina
calendar:CalendarCollection result = check calendarClient->listUserGroupCalendars("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserGroupCalendar</summary>

<div>

Create a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `payload` | <code>Calendar</code> | Yes | The users calendar groups calendars to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->createUserGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>getUserGroupCalendar</summary>

<div>

Get a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>deleteUserGroupCalendar</summary>

<div>

Delete a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>DeleteUserGroupCalendarHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserGroupCalendar</summary>

<div>

Update a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Calendar</code> | Yes | The users calendar groups calendars properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->updateUserGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserGroupCalendarPermissions</summary>

<div>

List the sharing permissions of a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermissionCollection|error`

**Sample code:**

```ballerina
calendar:CalendarPermissionCollection result = check calendarClient->listUserGroupCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isInsideOrganization": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserGroupCalendarPermission</summary>

<div>

Create a sharing permission on a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>CalendarPermission</code> | Yes | The users calendar groups calendars calendar permissions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->createUserGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getUserGroupCalendarPermission</summary>

<div>

Get a sharing permission of a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->getUserGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserGroupCalendarPermission</summary>

<div>

Delete a sharing permission of a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>DeleteUserGroupCalendarPermissionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserGroupCalendarPermission</summary>

<div>

Update a sharing permission of a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `payload` | <code>CalendarPermission</code> | Yes | The users calendar groups calendars calendar permissions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->updateUserGroupCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>countUserGroupCalendarPermissions</summary>

<div>

Count the sharing permissions of a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserGroupCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserGroupCalendarView</summary>

<div>

List the event occurrences of a calendar in a calendar group of a user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserGroupCalendarView("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserGroupCalendarViewDelta</summary>

<div>

Track changes to the event occurrences of a calendar in a calendar group of a user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserGroupCalendarViewDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserGroupEvents</summary>

<div>

List the events in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserGroupEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserGroupEvent</summary>

<div>

Create an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Event</code> | Yes | The users calendar groups calendars events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserGroupEvent</summary>

<div>

Get an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserGroupEvent</summary>

<div>

Delete an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteUserGroupEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserGroupEvent</summary>

<div>

Update an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The users calendar groups calendars events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listUserGroupEventAttachments</summary>

<div>

List the attachments of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listUserGroupEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserGroupEventAttachment</summary>

<div>

Add an attachment to an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The calendar groups calendars events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createUserGroupEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getUserGroupEventAttachment</summary>

<div>

Get an attachment of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getUserGroupEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteUserGroupEventAttachment</summary>

<div>

Delete an attachment of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteUserGroupEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserGroupEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countUserGroupEventAttachments</summary>

<div>

Count the attachments of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserGroupEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createUserGroupEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createUserGroupEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserGroupEventCalendar</summary>

<div>

Get the calendar that contains an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserGroupEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserGroupEventExtensions</summary>

<div>

List the open extensions of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listUserGroupEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserGroupEventExtension</summary>

<div>

Create an open extension on an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The calendar groups calendars events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createUserGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getUserGroupEventExtension</summary>

<div>

Get an open extension of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getUserGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteUserGroupEventExtension</summary>

<div>

Delete an open extension of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteUserGroupEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserGroupEventExtension</summary>

<div>

Update an open extension of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The calendar groups calendars events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateUserGroupEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countUserGroupEventExtensions</summary>

<div>

Count the open extensions of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserGroupEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserGroupEventInstances</summary>

<div>

List the occurrences of a recurring event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserGroupEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserGroupEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserGroupEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptUserGroupEvent</summary>

<div>

Accept an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelUserGroupEvent</summary>

<div>

Cancel a meeting in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineUserGroupEvent</summary>

<div>

Decline an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissUserGroupEventReminder</summary>

<div>

Dismiss the reminder of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissUserGroupEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardUserGroupEvent</summary>

<div>

Forward an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserGroupEvent</summary>

<div>

Permanently delete an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeUserGroupEventReminder</summary>

<div>

Snooze the reminder of an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeUserGroupEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptUserGroupEvent</summary>

<div>

Tentatively accept an event in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptUserGroupEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countUserGroupEvents</summary>

<div>

Count the events in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserGroupEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserGroupEventsDelta</summary>

<div>

Track changes to the events in a calendar of a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserGroupEventsDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserGroupCalendarSharingRoles</summary>

<div>

List the roles a user can be granted when a calendar in a calendar group of a user is shared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `user` | <code>string</code> | Yes | Usage: User='&#123;User&#125;'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `count` | <code>boolean</code> | No | Include count of items. |

**Returns:** `CalendarSharingRoleCollection|error`

**Sample code:**

```ballerina
calendar:CalendarSharingRoleCollection result = check calendarClient->listUserGroupCalendarSharingRoles("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getUserGroupCalendarSchedule</summary>

<div>

Get the free/busy availability of users, lists or resources through a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>GetScheduleRequest</code> | Yes | Schedules to look up, the time period and the availability interval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScheduleInformationCollection|error`

**Sample code:**

```ballerina
calendar:ScheduleInformationCollection result = check calendarClient->getUserGroupCalendarSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    schedules: ["string"],
    endTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    startTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    availabilityViewInterval: 100.00
});
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "availabilityView": "string",
      "scheduleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserGroupCalendar</summary>

<div>

Permanently delete a calendar in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserGroupCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countUserGroupCalendars</summary>

<div>

Count the calendars in a calendar group of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarGroupId` | <code>string</code> | Yes | The unique identifier of calendarGroup. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserGroupCalendars("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>countUserCalendarGroups</summary>

<div>

Count the calendar groups of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserCalendarGroups("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserCalendars</summary>

<div>

List the calendars of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarCollection|error`

**Sample code:**

```ballerina
calendar:CalendarCollection result = check calendarClient->listUserCalendars("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "color": "auto"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserCalendar</summary>

<div>

Create a calendar for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>Calendar</code> | Yes | The users calendars to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->createUserCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>getUserCalendar</summary>

<div>

Get a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>deleteUserCalendar</summary>

<div>

Delete a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>DeleteUserCalendarHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserCalendar</summary>

<div>

Update a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Calendar</code> | Yes | The users calendars properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->updateUserCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    owner: <calendar:EmailAddress>{
        address: "string",
        atOdataType: "string",
        name: "Sample name"
    },
    color: "auto",
    canEdit: false
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserCalendarPermissions</summary>

<div>

List the sharing permissions of a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermissionCollection|error`

**Sample code:**

```ballerina
calendar:CalendarPermissionCollection result = check calendarClient->listUserCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isInsideOrganization": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserCalendarPermission</summary>

<div>

Create a sharing permission on a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>CalendarPermission</code> | Yes | The users calendars calendar permissions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->createUserCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getUserCalendarPermission</summary>

<div>

Get a sharing permission of a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->getUserCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserCalendarPermission</summary>

<div>

Delete a sharing permission of a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `headers` | <code>DeleteUserCalendarPermissionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserCalendarPermission</summary>

<div>

Update a sharing permission of a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `calendarPermissionId` | <code>string</code> | Yes | The unique identifier of calendarPermission. |
| `payload` | <code>CalendarPermission</code> | Yes | The users calendars calendar permissions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CalendarPermission|error`

**Sample code:**

```ballerina
calendar:CalendarPermission result = check calendarClient->updateUserCalendarPermission("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    isInsideOrganization: false,
    role: "none",
    allowedRoles: ["none"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "emailAddress": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "isInsideOrganization": false,
  "role": "none",
  "allowedRoles": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>countUserCalendarPermissions</summary>

<div>

Count the sharing permissions of a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserCalendarPermissions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserCalendarViewById</summary>

<div>

List the event occurrences of a calendar of a user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserCalendarViewById("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserCalendarViewByIdDelta</summary>

<div>

Track changes to the event occurrences of a calendar of a user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserCalendarViewByIdDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserCalendarEvents</summary>

<div>

List the events in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserCalendarEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserCalendarEvent</summary>

<div>

Create an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>Event</code> | Yes | The users calendars events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserCalendarEvent</summary>

<div>

Get an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserCalendarEvent</summary>

<div>

Delete an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteUserCalendarEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserCalendarEvent</summary>

<div>

Update an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The users calendars events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listUserCalendarEventAttachments</summary>

<div>

List the attachments of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listUserCalendarEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserCalendarEventAttachment</summary>

<div>

Add an attachment to an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The users calendars events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createUserCalendarEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getUserCalendarEventAttachment</summary>

<div>

Get an attachment of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getUserCalendarEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteUserCalendarEventAttachment</summary>

<div>

Delete an attachment of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteUserCalendarEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserCalendarEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countUserCalendarEventAttachments</summary>

<div>

Count the attachments of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserCalendarEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createUserCalendarEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createUserCalendarEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserCalendarEventCalendar</summary>

<div>

Get the calendar that contains an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserCalendarEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserCalendarEventExtensions</summary>

<div>

List the open extensions of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listUserCalendarEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserCalendarEventExtension</summary>

<div>

Create an open extension on an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The users calendars events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createUserCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getUserCalendarEventExtension</summary>

<div>

Get an open extension of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getUserCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteUserCalendarEventExtension</summary>

<div>

Delete an open extension of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteUserCalendarEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserCalendarEventExtension</summary>

<div>

Update an open extension of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The users calendars events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateUserCalendarEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countUserCalendarEventExtensions</summary>

<div>

Count the open extensions of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserCalendarEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserCalendarEventInstances</summary>

<div>

List the occurrences of a recurring event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserCalendarEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserCalendarEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserCalendarEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptUserCalendarEvent</summary>

<div>

Accept an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelUserCalendarEvent</summary>

<div>

Cancel a meeting in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineUserCalendarEvent</summary>

<div>

Decline an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissUserCalendarEventReminder</summary>

<div>

Dismiss the reminder of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissUserCalendarEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardUserCalendarEvent</summary>

<div>

Forward an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserCalendarEvent</summary>

<div>

Permanently delete an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeUserCalendarEventReminder</summary>

<div>

Snooze the reminder of an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeUserCalendarEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptUserCalendarEvent</summary>

<div>

Tentatively accept an event in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptUserCalendarEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countUserCalendarEvents</summary>

<div>

Count the events in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserCalendarEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserCalendarEventsDelta</summary>

<div>

Track changes to the events in a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserCalendarEventsDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserCalendarSharingRoles</summary>

<div>

List the roles a user can be granted when a calendar of a user is shared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `user` | <code>string</code> | Yes | Usage: User='&#123;User&#125;'. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `count` | <code>boolean</code> | No | Include count of items. |

**Returns:** `CalendarSharingRoleCollection|error`

**Sample code:**

```ballerina
calendar:CalendarSharingRoleCollection result = check calendarClient->listUserCalendarSharingRoles("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    "none"
  ]
}
```

</div>
</details>

<details>
<summary>getUserCalendarSchedule</summary>

<div>

Get the free/busy availability of users, lists or resources through a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `payload` | <code>GetScheduleRequest</code> | Yes | Schedules to look up, the time period and the availability interval. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ScheduleInformationCollection|error`

**Sample code:**

```ballerina
calendar:ScheduleInformationCollection result = check calendarClient->getUserCalendarSchedule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    schedules: ["string"],
    endTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    startTime: <calendar:DateTimeTimeZone>{
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    },
    availabilityViewInterval: 100.00
});
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "availabilityView": "string",
      "scheduleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserCalendar</summary>

<div>

Permanently delete a calendar of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `calendarId` | <code>string</code> | Yes | The unique identifier of calendar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countUserCalendars</summary>

<div>

Count the calendars of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserCalendars("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserCalendarView</summary>

<div>

List the event occurrences of a user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserCalendarView("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserCalendarViewDelta</summary>

<div>

Track changes to the event occurrences of a user in a time range.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserCalendarViewDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserEvents</summary>

<div>

List the events of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserEvent</summary>

<div>

Create an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>Event</code> | Yes | The users events to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->createUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserEvent</summary>

<div>

Get an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->getUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>deleteUserEvent</summary>

<div>

Delete an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>DeleteUserEventHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserEvent</summary>

<div>

Update an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Event</code> | Yes | The users events properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
calendar:Event result = check calendarClient->updateUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    createdDateTime: "2026-01-15T00:00:00",
    categories: ["string"]
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "changeKey": "string",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "createdDateTime": "2026-01-15T00:00:00",
  "categories": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>listUserEventAttachments</summary>

<div>

List the attachments of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `AttachmentCollection|error`

**Sample code:**

```ballerina
calendar:AttachmentCollection result = check calendarClient->listUserEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedDateTime": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserEventAttachment</summary>

<div>

Add an attachment to an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Attachment</code> | Yes | The users events attachments to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->createUserEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string",
    lastModifiedDateTime: "2026-01-15T00:00:00",
    size: 100.00,
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getUserEventAttachment</summary>

<div>

Get an attachment of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Attachment|error`

**Sample code:**

```ballerina
calendar:Attachment result = check calendarClient->getUserEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lastModifiedDateTime": "2026-01-15T00:00:00",
  "size": 100.00,
  "name": "Sample name",
  "isInline": false
}
```

</div>
</details>

<details>
<summary>deleteUserEventAttachment</summary>

<div>

Delete an attachment of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of attachment. |
| `headers` | <code>DeleteUserEventAttachmentHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserEventAttachment("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>countUserEventAttachments</summary>

<div>

Count the attachments of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserEventAttachments("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>createUserEventUploadSession</summary>

<div>

Create an upload session for a large attachment to an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CreateUploadSessionRequest</code> | Yes | Details of the file to upload as an attachment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
calendar:UploadSession result = check calendarClient->createUserEventUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attachmentItem: {
        size: 100.00,
        attachmentType: "file",
        atOdataType: "string"
    }
});
```

**Sample response:**

```json
{
  "expirationDateTime": "2026-01-15T00:00:00",
  "uploadUrl": "https://example.com/resource",
  "@odata.type": "string",
  "nextExpectedRanges": [
    "string"
  ]
}
```

</div>
</details>

<details>
<summary>getUserEventCalendar</summary>

<div>

Get the calendar that contains an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Calendar|error`

**Sample code:**

```ballerina
calendar:Calendar result = check calendarClient->getUserEventCalendar("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "owner": {
    "address": "string",
    "@odata.type": "string",
    "name": "Sample name"
  },
  "color": "auto",
  "singleValueExtendedProperties": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value": "string"
    }
  ],
  "canEdit": false
}
```

</div>
</details>

<details>
<summary>listUserEventExtensions</summary>

<div>

List the open extensions of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `ExtensionCollection|error`

**Sample code:**

```ballerina
calendar:ExtensionCollection result = check calendarClient->listUserEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUserEventExtension</summary>

<div>

Create an open extension on an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>Extension</code> | Yes | The users events extensions to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->createUserEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getUserEventExtension</summary>

<div>

Get an open extension of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->getUserEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>deleteUserEventExtension</summary>

<div>

Delete an open extension of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `headers` | <code>DeleteUserEventExtensionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->deleteUserEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateUserEventExtension</summary>

<div>

Update an open extension of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `extensionId` | <code>string</code> | Yes | The unique identifier of extension. |
| `payload` | <code>Extension</code> | Yes | The users events extensions properties to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Extension|error`

**Sample code:**

```ballerina
calendar:Extension result = check calendarClient->updateUserEventExtension("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    atOdataType: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>countUserEventExtensions</summary>

<div>

Count the open extensions of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserEventExtensions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserEventInstances</summary>

<div>

List the occurrences of a recurring event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventCollection|error`

**Sample code:**

```ballerina
calendar:EventCollection result = check calendarClient->listUserEventInstances("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.nextLink": "string",
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listUserEventInstancesDelta</summary>

<div>

Track changes to the occurrences of a recurring event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserEventInstancesDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>acceptUserEvent</summary>

<div>

Accept an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>AcceptEventRequest</code> | Yes | Optional comment and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->acceptUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false
});
```

</div>
</details>

<details>
<summary>cancelUserEvent</summary>

<div>

Cancel a meeting of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>CancelEventRequest</code> | Yes | Optional cancellation message sent to the attendees. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->cancelUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string"
});
```

</div>
</details>

<details>
<summary>declineUserEvent</summary>

<div>

Decline an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->declineUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>dismissUserEventReminder</summary>

<div>

Dismiss the reminder of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->dismissUserEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>forwardUserEvent</summary>

<div>

Forward an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>ForwardEventRequest</code> | Yes | Recipients to forward the event to and an optional comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->forwardUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    toRecipients: [{
        atOdataType: "string"
    }]
});
```

</div>
</details>

<details>
<summary>permanentlyDeleteUserEvent</summary>

<div>

Permanently delete an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->permanentlyDeleteUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>snoozeUserEventReminder</summary>

<div>

Snooze the reminder of an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>SnoozeReminderRequest</code> | Yes | New date and time for the reminder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->snoozeUserEventReminder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    newReminderTime: {
        dateTime: "2026-01-15T00:00:00",
        atOdataType: "string",
        timeZone: "string"
    }
});
```

</div>
</details>

<details>
<summary>tentativelyAcceptUserEvent</summary>

<div>

Tentatively accept an event of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `eventId` | <code>string</code> | Yes | The unique identifier of event. |
| `payload` | <code>DeclineEventRequest</code> | Yes | Optional comment, proposed new time and whether to send a response to the organizer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check calendarClient->tentativelyAcceptUserEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    comment: "string",
    sendResponse: false,
    proposedNewTime: <calendar:TimeSlot>{
        atOdataType: "string"
    }
});
```

</div>
</details>

<details>
<summary>countUserEvents</summary>

<div>

Count the events of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check calendarClient->countUserEvents("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

<details>
<summary>listUserEventsDelta</summary>

<div>

Track changes to the events of a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `skip` | <code>int</code> | No | Skip the first n items. |
| `startDateTime` | <code>string</code> | Yes | The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `top` | <code>int</code> | No | Show only the first n items. |
| `filter` | <code>string</code> | No | Filter items by property values. |
| `search` | <code>string</code> | No | Search items by search phrases. |
| `orderby` | <code>string[]</code> | No | Order items by property values. |
| `expand` | <code>string[]</code> | No | Expand related entities. |
| `endDateTime` | <code>string</code> | Yes | The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00. |
| `count` | <code>boolean</code> | No | Include count of items. |
| `'select` | <code>string[]</code> | No | Select properties to be returned. |

**Returns:** `EventDeltaCollection|error`

**Sample code:**

```ballerina
calendar:EventDeltaCollection result = check calendarClient->listUserEventsDelta("3fa85f64-5717-4562-b3fc-2c963f66afa6", startDateTime = "2026-01-15T00:00:00", endDateTime = "2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "@odata.deltaLink": "string",
  "@odata.nextLink": "string",
  "value": [
    {
      "@odata.type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "changeKey": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>findUserMeetingTimes</summary>

<div>

Suggest meeting times and locations for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The unique identifier of user. |
| `payload` | <code>FindMeetingTimesRequest</code> | Yes | Attendees, time and location constraints for finding meeting times. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MeetingTimeSuggestionsResult|error`

**Sample code:**

```ballerina
calendar:MeetingTimeSuggestionsResult result = check calendarClient->findUserMeetingTimes("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    attendees: [{
        atOdataType: "string",
        'type: "required"
    }],
    locationConstraint: <calendar:LocationConstraint>{
        isRequired: false,
        atOdataType: "string",
        suggestLocation: false
    },
    timeConstraint: <calendar:TimeConstraint>{
        atOdataType: "string",
        activityDomain: "unknown"
    },
    meetingDuration: "string"
});
```

**Sample response:**

```json
{
  "@odata.type": "string",
  "meetingTimeSuggestions": [
    {
      "organizerAvailability": "unknown",
      "@odata.type": "string",
      "confidence": 100.00
    }
  ],
  "emptySuggestionsReason": "string"
}
```

</div>
</details>
