---
title: Actions
---

# Actions

The `ballerinax/googleapis.gcalendar` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full access to Google Calendar API v3: calendars, events, ACL rules, calendar list, free/busy, and colors. |

---

## Client

Provides full access to Google Calendar API v3: calendars, events, ACL rules, calendar list, free/busy, and colors.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | OAuth 2.0 refresh token configuration or a bearer token for authentication. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request/response records. |
| `laxDataBinding` | `boolean` | `true` | Allow unknown fields in response payloads without returning an error. |

### Initializing the client

```ballerina
import ballerinax/googleapis.gcalendar as gcalendar;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

gcalendar:Client calendarClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Calendar management

<details>
<summary>Create a calendar</summary>

Creates a new secondary calendar in the authenticated user's Google account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `gcalendar:Calendar` | Yes | Calendar resource containing at minimum the `summary` (title) field. |

Returns: `gcalendar:Calendar|error`

Sample code:

```ballerina
gcalendar:Calendar newCalendar = check calendarClient->/calendars.post({
    summary: "Software Project"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#calendar",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project",
  "timeZone": "UTC",
  "conferenceProperties": {"allowedConferenceSolutionTypes": ["hangoutsMeet"]}
}
```

</details>

<details>
<summary>Get a calendar</summary>

Returns metadata for the calendar with the specified ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. Use `"primary"` for the authenticated user's primary calendar. |

Returns: `gcalendar:Calendar|error`

Sample code:

```ballerina
gcalendar:Calendar calendar = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"];
```

Sample response:

```ballerina
{
  "kind": "calendar#calendar",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project",
  "timeZone": "America/New_York"
}
```

</details>

<details>
<summary>Update a calendar</summary>

Replaces the calendar resource with the provided payload (full update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:Calendar` | Yes | Updated calendar resource. |

Returns: `gcalendar:Calendar|error`

Sample code:

```ballerina
gcalendar:Calendar updated = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"].put({
    summary: "Software Project – Q1",
    timeZone: "America/New_York"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#calendar",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project – Q1",
  "timeZone": "America/New_York"
}
```

</details>

<details>
<summary>Patch a calendar</summary>

Updates selected fields of a calendar (partial update: unset fields are unchanged).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:Calendar` | Yes | Partial calendar resource with only the fields to update. |

Returns: `gcalendar:Calendar|error`

Sample code:

```ballerina
gcalendar:Calendar patched = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"].patch({
    description: "Tracking milestones for the Q1 software project."
});
```

Sample response:

```ballerina
{
  "kind": "calendar#calendar",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project – Q1",
  "description": "Tracking milestones for the Q1 software project.",
  "timeZone": "America/New_York"
}
```

</details>

<details>
<summary>Delete a calendar</summary>

Permanently deletes a secondary calendar. The primary calendar cannot be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier of the secondary calendar to delete. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"].delete();
```

</details>

<details>
<summary>Clear a calendar</summary>

Deletes all events from a primary calendar. Only applicable to primary calendars.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. Must be `"primary"` for the authenticated user's primary calendar. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->/calendars/["primary"]/clear.post({});
```

</details>

#### Event management

<details>
<summary>List events on a calendar</summary>

Returns events on the specified calendar, with optional filters for time range, search query, and sync tokens.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. Use `"primary"` for the authenticated user's primary calendar. |
| `queries` | `*CalendarEventsListQueries` | No | Optional query parameters including `timeMin`, `timeMax`, `q` (search text), `singleEvents`, `orderBy`, and `maxResults`. |

Returns: `gcalendar:Events|error`

Sample code:

```ballerina
gcalendar:Events events = check calendarClient->/calendars/["primary"]/events(
    timeMin = "2024-01-01T00:00:00Z",
    timeMax = "2024-01-31T23:59:59Z",
    singleEvents = true,
    orderBy = "startTime"
);
```

Sample response:

```ballerina
{
  "kind": "calendar#events",
  "summary": "primary",
  "items": [
    {
      "id": "eventabc123",
      "summary": "Team Meeting",
      "start": {"dateTime": "2024-01-15T10:00:00Z"},
      "end": {"dateTime": "2024-01-15T11:00:00Z"},
      "status": "confirmed"
    }
  ]
}
```

</details>

<details>
<summary>Create an event</summary>

Creates a new event on the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:Event` | Yes | Event resource. At minimum, `start` and `end` must be specified. |
| `queries` | `*CalendarEventsInsertQueries` | No | Optional query parameters including `sendUpdates` (`all`, `externalOnly`, `none`) and `conferenceDataVersion`. |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event newEvent = check calendarClient->/calendars/["primary"]/events.post({
    summary: "Code Review",
    description: "Review sprint 3 pull requests",
    location: "Conference Room A",
    start: {
        dateTime: "2024-01-15T10:00:00Z",
        timeZone: "UTC"
    },
    end: {
        dateTime: "2024-01-15T11:00:00Z",
        timeZone: "UTC"
    },
    attendees: [
        {email: "alice@example.com"},
        {email: "bob@example.com"}
    ],
    reminders: {
        useDefault: false,
        overrides: [
            {method: "popup", minutes: 15},
            {method: "email", minutes: 30}
        ]
    }
});
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "eventabc123",
  "summary": "Code Review",
  "description": "Review sprint 3 pull requests",
  "location": "Conference Room A",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=...",
  "created": "2024-01-10T08:00:00.000Z",
  "start": {"dateTime": "2024-01-15T10:00:00Z", "timeZone": "UTC"},
  "end": {"dateTime": "2024-01-15T11:00:00Z", "timeZone": "UTC"}
}
```

</details>

<details>
<summary>Get an event</summary>

Returns the event with the specified ID from the given calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | Event identifier. |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event event = check calendarClient->/calendars/["primary"]/events/["eventabc123"];
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "eventabc123",
  "summary": "Code Review",
  "status": "confirmed",
  "start": {"dateTime": "2024-01-15T10:00:00Z", "timeZone": "UTC"},
  "end": {"dateTime": "2024-01-15T11:00:00Z", "timeZone": "UTC"},
  "attendees": [
    {"email": "alice@example.com", "responseStatus": "accepted"},
    {"email": "bob@example.com", "responseStatus": "needsAction"}
  ]
}
```

</details>

<details>
<summary>Update an event</summary>

Replaces an existing event with the provided resource (full update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | Event identifier. |
| `payload` | `gcalendar:Event` | Yes | Updated event resource. |
| `queries` | `*CalendarEventsUpdateQueries` | No | Optional query parameters including `sendUpdates`. |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event updatedEvent = check calendarClient->/calendars/["primary"]/events/["eventabc123"].put({
    summary: "Design Review",
    start: {dateTime: "2024-01-16T14:00:00Z", timeZone: "UTC"},
    end: {dateTime: "2024-01-16T15:00:00Z", timeZone: "UTC"}
});
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "eventabc123",
  "summary": "Design Review",
  "status": "confirmed",
  "start": {"dateTime": "2024-01-16T14:00:00Z", "timeZone": "UTC"},
  "end": {"dateTime": "2024-01-16T15:00:00Z", "timeZone": "UTC"}
}
```

</details>

<details>
<summary>Patch an event</summary>

Updates selected fields of an event (partial update: unspecified fields are unchanged).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | Event identifier. |
| `payload` | `gcalendar:Event` | Yes | Partial event resource with only the fields to update. |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event patched = check calendarClient->/calendars/["primary"]/events/["eventabc123"].patch({
    summary: "Team Meeting – Weekly Sync",
    location: "Zoom"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "eventabc123",
  "summary": "Team Meeting – Weekly Sync",
  "location": "Zoom",
  "status": "confirmed",
  "start": {"dateTime": "2024-01-15T10:00:00Z", "timeZone": "UTC"},
  "end": {"dateTime": "2024-01-15T11:00:00Z", "timeZone": "UTC"}
}
```

</details>

<details>
<summary>Delete an event</summary>

Deletes an event from the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | Event identifier. |
| `queries` | `*CalendarEventsDeleteQueries` | No | Optional query parameters including `sendUpdates`. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->/calendars/["primary"]/events/["eventabc123"].delete();
```

</details>

<details>
<summary>Quick-add an event</summary>

Creates an event based on a simple text string using natural language parsing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `queries` | `*CalendarEventsQuickAddQueries` | Yes | Must include `text`: a free-text string describing the event (e.g., `"Lunch with Alice tomorrow at noon"`). |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event quickEvent = check calendarClient->/calendars/["primary"]/events/quickAdd(
    text = "Project Beta Release on January 31 at 9am"
);
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "quickeventxyz",
  "summary": "Project Beta Release",
  "status": "confirmed",
  "start": {"dateTime": "2024-01-31T09:00:00Z"},
  "end": {"dateTime": "2024-01-31T10:00:00Z"}
}
```

</details>

<details>
<summary>Import an event</summary>

Imports an event using an iCalendar-format payload. Used to add a private copy of an existing event to a calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:Event` | Yes | Event resource. Must include `iCalUID` and `start`/`end` fields. |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event imported = check calendarClient->/calendars/["primary"]/events/'import({
    iCalUID: "uid-1234@example.com",
    summary: "Imported Conference",
    start: {dateTime: "2024-02-10T09:00:00Z", timeZone: "UTC"},
    end: {dateTime: "2024-02-10T17:00:00Z", timeZone: "UTC"}
});
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "importedeventabc",
  "iCalUID": "uid-1234@example.com",
  "summary": "Imported Conference",
  "status": "confirmed",
  "start": {"dateTime": "2024-02-10T09:00:00Z", "timeZone": "UTC"},
  "end": {"dateTime": "2024-02-10T17:00:00Z", "timeZone": "UTC"}
}
```

</details>

<details>
<summary>List instances of a recurring event</summary>

Returns instances of the specified recurring event, with optional time-range filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | Recurring event identifier. |
| `queries` | `*CalendarEventsInstancesQueries` | No | Optional query parameters including `timeMin`, `timeMax`, `maxResults`, and `pageToken`. |

Returns: `gcalendar:Events|error`

Sample code:

```ballerina
gcalendar:Events instances = check calendarClient->/calendars/["primary"]/events/["recurringEventId"]/instances(
    timeMin = "2024-01-01T00:00:00Z",
    timeMax = "2024-03-31T23:59:59Z"
);
```

Sample response:

```ballerina
{
  "kind": "calendar#events",
  "items": [
    {
      "id": "recurringEventId_20240108",
      "summary": "Weekly Standup",
      "start": {"dateTime": "2024-01-08T09:00:00Z"},
      "end": {"dateTime": "2024-01-08T09:30:00Z"},
      "recurringEventId": "recurringEventId"
    },
    {
      "id": "recurringEventId_20240115",
      "summary": "Weekly Standup",
      "start": {"dateTime": "2024-01-15T09:00:00Z"},
      "end": {"dateTime": "2024-01-15T09:30:00Z"},
      "recurringEventId": "recurringEventId"
    }
  ]
}
```

</details>

<details>
<summary>Move an event to another calendar</summary>

Moves an event to a different calendar: the event is removed from the source calendar and added to the destination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Source calendar identifier. |
| `eventId` | `string` | Yes | Event identifier. |
| `queries` | `*CalendarEventsMoveQueries` | Yes | Must include `destination`: the calendar ID to move the event to. Optionally include `sendUpdates`. |

Returns: `gcalendar:Event|error`

Sample code:

```ballerina
gcalendar:Event movedEvent = check calendarClient->/calendars/["primary"]/events/["eventabc123"]/move(
    destination = "abc123xyz@group.calendar.google.com"
);
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "id": "eventabc123",
  "summary": "Code Review",
  "status": "confirmed",
  "organizer": {"email": "abc123xyz@group.calendar.google.com", "self": true},
  "start": {"dateTime": "2024-01-15T10:00:00Z", "timeZone": "UTC"},
  "end": {"dateTime": "2024-01-15T11:00:00Z", "timeZone": "UTC"}
}
```

</details>

#### ACL management

<details>
<summary>List ACL rules for a calendar</summary>

Returns the rules in the access control list for the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `queries` | `*CalendarAclListQueries` | No | Optional query parameters including `maxResults`, `pageToken`, `syncToken`, and `showDeleted`. |

Returns: `gcalendar:Acl|error`

Sample code:

```ballerina
gcalendar:Acl aclList = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"]/acl();
```

Sample response:

```ballerina
{
  "kind": "calendar#acl",
  "items": [
    {
      "kind": "calendar#aclRule",
      "id": "user:owner@example.com",
      "scope": {"type": "user", "value": "owner@example.com"},
      "role": "owner"
    },
    {
      "kind": "calendar#aclRule",
      "id": "user:alice@example.com",
      "scope": {"type": "user", "value": "alice@example.com"},
      "role": "reader"
    }
  ]
}
```

</details>

<details>
<summary>Create an ACL rule</summary>

Creates an access control rule granting a user or group access to the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:AclRule` | Yes | ACL rule resource specifying `scope` (type + value) and `role` (`reader`, `writer`, or `owner`). |
| `queries` | `*CalendarAclInsertQueries` | No | Optional query parameters including `sendNotifications`. |

Returns: `gcalendar:AclRule|error`

Sample code:

```ballerina
gcalendar:AclRule rule = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"]/acl.post({
    scope: {
        'type: "user",
        value: "alice@example.com"
    },
    role: "reader"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#aclRule",
  "id": "user:alice@example.com",
  "scope": {"type": "user", "value": "alice@example.com"},
  "role": "reader"
}
```

</details>

<details>
<summary>Get an ACL rule</summary>

Returns the access control rule with the specified ID for the given calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `ruleId` | `string` | Yes | ACL rule identifier. |

Returns: `gcalendar:AclRule|error`

Sample code:

```ballerina
gcalendar:AclRule aclRule = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"]/acl/["user:alice@example.com"];
```

Sample response:

```ballerina
{
  "kind": "calendar#aclRule",
  "id": "user:alice@example.com",
  "scope": {"type": "user", "value": "alice@example.com"},
  "role": "reader"
}
```

</details>

<details>
<summary>Update an ACL rule</summary>

Replaces an ACL rule with the provided resource (full update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `ruleId` | `string` | Yes | ACL rule identifier. |
| `payload` | `gcalendar:AclRule` | Yes | Updated ACL rule resource. |

Returns: `gcalendar:AclRule|error`

Sample code:

```ballerina
gcalendar:AclRule updated = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"]/acl/["user:alice@example.com"].put({
    scope: {
        'type: "user",
        value: "alice@example.com"
    },
    role: "writer"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#aclRule",
  "id": "user:alice@example.com",
  "scope": {"type": "user", "value": "alice@example.com"},
  "role": "writer"
}
```

</details>

<details>
<summary>Patch an ACL rule</summary>

Updates selected fields of an ACL rule (partial update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `ruleId` | `string` | Yes | ACL rule identifier. |
| `payload` | `gcalendar:AclRule` | Yes | Partial ACL rule resource with only the fields to update. |

Returns: `gcalendar:AclRule|error`

Sample code:

```ballerina
gcalendar:AclRule patched = check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"]/acl/["user:alice@example.com"].patch({
    role: "owner"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#aclRule",
  "id": "user:alice@example.com",
  "scope": {"type": "user", "value": "alice@example.com"},
  "role": "owner"
}
```

</details>

<details>
<summary>Delete an ACL rule</summary>

Deletes an ACL rule, revoking the associated user's or group's access to the calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `ruleId` | `string` | Yes | ACL rule identifier. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->/calendars/["abc123xyz@group.calendar.google.com"]/acl/["user:alice@example.com"].delete();
```

</details>

#### Calendar list

<details>
<summary>List calendars on the user's calendar list</summary>

Returns all calendars present on the authenticated user's calendar list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `*CalendarCalendarListListQueries` | No | Optional query parameters including `minAccessRole`, `showHidden`, `showDeleted`, `maxResults`, and `pageToken`. |

Returns: `gcalendar:CalendarList|error`

Sample code:

```ballerina
gcalendar:CalendarList calList = check calendarClient->/users/me/calendarList();
```

Sample response:

```ballerina
{
  "kind": "calendar#calendarList",
  "items": [
    {
      "kind": "calendar#calendarListEntry",
      "id": "primary@gmail.com",
      "summary": "primary@gmail.com",
      "primary": true,
      "accessRole": "owner"
    },
    {
      "kind": "calendar#calendarListEntry",
      "id": "abc123xyz@group.calendar.google.com",
      "summary": "Software Project",
      "accessRole": "owner"
    }
  ]
}
```

</details>

<details>
<summary>Add a calendar to the user's calendar list</summary>

Inserts an existing calendar into the authenticated user's calendar list so it appears in their Google Calendar UI.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `gcalendar:CalendarListEntry` | Yes | CalendarListEntry resource. Must include `id` (the calendar identifier to subscribe to). |
| `queries` | `*CalendarCalendarListInsertQueries` | No | Optional query parameters including `colorRgbFormat`. |

Returns: `gcalendar:CalendarListEntry|error`

Sample code:

```ballerina
gcalendar:CalendarListEntry entry = check calendarClient->/users/me/calendarList.post({
    id: "abc123xyz@group.calendar.google.com"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#calendarListEntry",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project",
  "accessRole": "reader",
  "selected": true
}
```

</details>

<details>
<summary>Get a calendar from the user's calendar list</summary>

Returns a specific calendar from the authenticated user's calendar list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |

Returns: `gcalendar:CalendarListEntry|error`

Sample code:

```ballerina
gcalendar:CalendarListEntry entry = check calendarClient->/users/me/calendarList/["abc123xyz@group.calendar.google.com"];
```

Sample response:

```ballerina
{
  "kind": "calendar#calendarListEntry",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project",
  "timeZone": "America/New_York",
  "accessRole": "owner",
  "selected": true
}
```

</details>

<details>
<summary>Update a calendar list entry</summary>

Replaces a calendar list entry with the provided resource (full update). Used to update user-specific calendar display settings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:CalendarListEntry` | Yes | Updated CalendarListEntry resource. |

Returns: `gcalendar:CalendarListEntry|error`

Sample code:

```ballerina
gcalendar:CalendarListEntry updated = check calendarClient->/users/me/calendarList/["abc123xyz@group.calendar.google.com"].put({
    id: "abc123xyz@group.calendar.google.com",
    colorId: "9",
    selected: true
});
```

Sample response:

```ballerina
{
  "kind": "calendar#calendarListEntry",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project",
  "colorId": "9",
  "selected": true,
  "accessRole": "owner"
}
```

</details>

<details>
<summary>Patch a calendar list entry</summary>

Updates selected display properties of a calendar list entry (partial update).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `payload` | `gcalendar:CalendarListEntry` | Yes | Partial CalendarListEntry resource with only the fields to update. |

Returns: `gcalendar:CalendarListEntry|error`

Sample code:

```ballerina
gcalendar:CalendarListEntry patched = check calendarClient->/users/me/calendarList/["abc123xyz@group.calendar.google.com"].patch({
    summaryOverride: "Project – Q1"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#calendarListEntry",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Software Project",
  "summaryOverride": "Project – Q1",
  "accessRole": "owner"
}
```

</details>

<details>
<summary>Remove a calendar from the user's calendar list</summary>

Removes the specified calendar from the authenticated user's calendar list (does not delete the calendar itself).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier to remove from the list. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->/users/me/calendarList/["abc123xyz@group.calendar.google.com"].delete();
```

</details>

#### Free/Busy

<details>
<summary>Query free/busy availability</summary>

Returns free/busy information for a set of calendars and groups within a specified time range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `gcalendar:FreeBusyRequest` | Yes | FreeBusyRequest resource specifying `timeMin`, `timeMax`, `timeZone`, and the list of `items` (calendars/groups to query). |

Returns: `gcalendar:FreeBusyResponse|error`

Sample code:

```ballerina
gcalendar:FreeBusyResponse availability = check calendarClient->/freeBusy.post({
    timeMin: "2024-01-15T09:00:00Z",
    timeMax: "2024-01-15T17:00:00Z",
    timeZone: "UTC",
    items: [
        {id: "alice@example.com"},
        {id: "bob@example.com"}
    ]
});
```

Sample response:

```ballerina
{
  "kind": "calendar#freeBusy",
  "timeMin": "2024-01-15T09:00:00Z",
  "timeMax": "2024-01-15T17:00:00Z",
  "calendars": {
    "alice@example.com": {
      "busy": [
        {"start": "2024-01-15T10:00:00Z", "end": "2024-01-15T11:00:00Z"}
      ]
    },
    "bob@example.com": {
      "busy": []
    }
  }
}
```

</details>

#### Colors

<details>
<summary>Get color definitions</summary>

Returns the color definitions available for calendar and event color coding.

Returns: `gcalendar:Colors|error`

Sample code:

```ballerina
gcalendar:Colors colors = check calendarClient->/colors();
```

Sample response:

```ballerina
{
  "kind": "calendar#colors",
  "updated": "2012-02-14T00:00:00.000Z",
  "calendar": {
    "1": {"background": "#ac725e", "foreground": "#1d1d1d"},
    "2": {"background": "#d06b64", "foreground": "#1d1d1d"},
    "9": {"background": "#5f6368", "foreground": "#ffffff"}
  },
  "event": {
    "1": {"background": "#a4bdfc", "foreground": "#1d1d1d"},
    "2": {"background": "#7ae7bf", "foreground": "#1d1d1d"},
    "11": {"background": "#dc2127", "foreground": "#ffffff"}
  }
}
```

</details>
