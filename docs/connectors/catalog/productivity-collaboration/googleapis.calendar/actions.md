---
title: Actions
---

# Actions

The `ballerinax/googleapis.calendar` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages calendars and events through the Google Calendar API V3. |

---

## Client

Manages calendars and events through the Google Calendar API V3.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|JwtIssuerConfig` | Required | Authentication configuration: typically OAuth 2.0 refresh token credentials. |
| `secureSocketConfig` | `ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |

### Initializing the client

```ballerina
import ballerinax/googleapis.calendar;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

calendar:Client calendarClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: refreshUrl
    }
});
```

### Operations

#### Calendar operations

<details>
<summary>getCalendars</summary>

Retrieves all calendars accessible to the authenticated user as a stream.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `optional` | `CalendarsToAccess?` | No | Record containing optional parameters such as `minAccessRole`, `showDeleted`, and `showHidden`. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `stream<Calendar, error?>|error`

Sample code:

```ballerina
stream<calendar:Calendar, error?> calendars = check calendarClient->getCalendars();
check from calendar:Calendar cal in calendars
    do {
        // process each calendar
    };
```

Sample response:

```ballerina
{
  "kind": "calendar#calendarListEntry",
  "etag": "\"abc123\"",
  "id": "primary",
  "summary": "john@example.com",
  "timeZone": "America/New_York",
  "colorId": "14",
  "backgroundColor": "#9FE1E7",
  "foregroundColor": "#000000",
  "accessRole": "owner",
  "defaultReminders": [],
  "conferenceProperties": {
    "allowedConferenceSolutionTypes": ["hangoutsMeet"]
  },
  "primary": true
}
```

</details>

<details>
<summary>createCalendar</summary>

Creates a new secondary calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The name/summary for the new calendar. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `CalendarResource|error`

Sample code:

```ballerina
calendar:CalendarResource newCalendar = check calendarClient->createCalendar("Project Meetings");
```

Sample response:

```ballerina
{
  "kind": "calendar#calendar",
  "etag": "\"def456\"",
  "id": "abc123xyz@group.calendar.google.com",
  "summary": "Project Meetings",
  "timeZone": "UTC",
  "conferenceProperties": {
    "allowedConferenceSolutionTypes": ["hangoutsMeet"]
  }
}
```

</details>

<details>
<summary>deleteCalendar</summary>

Deletes a secondary calendar. Use `"primary"` to clear (not delete) the primary calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | The calendar identifier to delete. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->deleteCalendar("abc123xyz@group.calendar.google.com");
```

</details>

#### Event operations

<details>
<summary>createEvent</summary>

Creates a new event in the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier (use `"primary"` for the primary calendar). |
| `event` | `InputEvent` | Yes | Record containing event information such as summary, start/end times, attendees, and reminders. |
| `optional` | `EventsToAccess?` | No | Record containing optional query parameters like `conferenceDataVersion`, `maxAttendees`, `sendUpdates`, and `supportsAttachments`. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `Event|error`

Sample code:

```ballerina
calendar:Event event = check calendarClient->createEvent("primary", {
    summary: "Project Kickoff Meeting",
    'start: {
        dateTime: "2024-03-20T10:00:00+00:00",
        timeZone: "UTC"
    },
    end: {
        dateTime: "2024-03-20T11:00:00+00:00",
        timeZone: "UTC"
    },
    attendees: [
        { email: "colleague@example.com" }
    ],
    reminders: {
        useDefault: false,
        overrides: [
            { method: "popup", minutes: 15 },
            { method: "email", minutes: 30 }
        ]
    }
});
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "etag": "\"ghi789\"",
  "id": "evt123abc",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=ZXZ0MTIz",
  "created": "2024-03-15T08:00:00.000Z",
  "updated": "2024-03-15T08:00:00.000Z",
  "summary": "Project Kickoff Meeting",
  "creator": {
    "email": "john@example.com",
    "self": true
  },
  "organizer": {
    "email": "john@example.com",
    "self": true
  },
  "start": {
    "dateTime": "2024-03-20T10:00:00Z",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2024-03-20T11:00:00Z",
    "timeZone": "UTC"
  },
  "attendees": [
    {
      "email": "colleague@example.com",
      "responseStatus": "needsAction"
    }
  ],
  "reminders": {
    "useDefault": false,
    "overrides": [
      { "method": "popup", "minutes": 15 },
      { "method": "email", "minutes": 30 }
    ]
  }
}
```

</details>

<details>
<summary>quickAddEvent</summary>

Creates an event at the moment with simple text, letting Google parse the date, time, and title automatically.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier (use `"primary"` for the primary calendar). |
| `text` | `string` | Yes | The text describing the event to be created (e.g., `"Team lunch at noon tomorrow"`). |
| `sendUpdates` | `string?` | No | Configuration for notifying about the creation. Possible values: `"all"`, `"externalOnly"`, `"none"`. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `Event|error`

Sample code:

```ballerina
calendar:Event quickEvent = check calendarClient->quickAddEvent("primary", "Team standup at 9am tomorrow");
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "etag": "\"jkl012\"",
  "id": "evt456def",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=ZXZ0NDU2",
  "created": "2024-03-15T09:00:00.000Z",
  "updated": "2024-03-15T09:00:00.000Z",
  "summary": "Team standup",
  "start": {
    "dateTime": "2024-03-16T09:00:00Z",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2024-03-16T09:30:00Z",
    "timeZone": "UTC"
  }
}
```

</details>

<details>
<summary>getEvent</summary>

Retrieves a single event by its ID from the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | The event identifier. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `Event|error`

Sample code:

```ballerina
calendar:Event event = check calendarClient->getEvent("primary", "evt123abc");
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "etag": "\"mno345\"",
  "id": "evt123abc",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=ZXZ0MTIz",
  "summary": "Project Kickoff Meeting",
  "start": {
    "dateTime": "2024-03-20T10:00:00Z",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2024-03-20T11:00:00Z",
    "timeZone": "UTC"
  }
}
```

</details>

<details>
<summary>updateEvent</summary>

Updates an existing event in the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | The event identifier. |
| `event` | `InputEvent` | Yes | Record containing the updated event information. |
| `optional` | `EventsToAccess?` | No | Record containing optional query parameters. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `Event|error`

Sample code:

```ballerina
calendar:Event updatedEvent = check calendarClient->updateEvent("primary", "evt123abc", {
    summary: "Project Kickoff Meeting (Updated)",
    'start: {
        dateTime: "2024-03-20T10:00:00+00:00",
        timeZone: "UTC"
    },
    end: {
        dateTime: "2024-03-20T12:00:00+00:00",
        timeZone: "UTC"
    },
    location: "Conference Room A",
    description: "Updated: extended to 2 hours"
});
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "etag": "\"pqr678\"",
  "id": "evt123abc",
  "status": "confirmed",
  "summary": "Project Kickoff Meeting (Updated)",
  "location": "Conference Room A",
  "description": "Updated: extended to 2 hours",
  "start": {
    "dateTime": "2024-03-20T10:00:00Z",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2024-03-20T12:00:00Z",
    "timeZone": "UTC"
  }
}
```

</details>

<details>
<summary>deleteEvent</summary>

Deletes an event from the specified calendar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `eventId` | `string` | Yes | The event identifier. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `error?`

Sample code:

```ballerina
check calendarClient->deleteEvent("primary", "evt123abc");
```

</details>

#### Event queries

<details>
<summary>getEvents</summary>

Retrieves all events from a calendar as a stream, with optional filtering criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `filter` | `EventFilterCriteria?` | No | Record containing filtering criteria such as `timeMin`, `timeMax`, `q` (search text), `orderBy`, `singleEvents`, and more. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `stream<Event, error?>|error`

Sample code:

```ballerina
stream<calendar:Event, error?> events = check calendarClient->getEvents("primary", {
    timeMin: "2024-03-01T00:00:00Z",
    timeMax: "2024-03-31T23:59:59Z",
    singleEvents: true,
    orderBy: calendar:START_TIME
});
check from calendar:Event evt in events
    do {
        // process each event
    };
```

Sample response:

```ballerina
{
  "kind": "calendar#event",
  "etag": "\"stu901\"",
  "id": "evt789ghi",
  "status": "confirmed",
  "summary": "Weekly Standup",
  "start": {
    "dateTime": "2024-03-04T09:00:00Z",
    "timeZone": "UTC"
  },
  "end": {
    "dateTime": "2024-03-04T09:30:00Z",
    "timeZone": "UTC"
  },
  "recurrence": ["RRULE:FREQ=WEEKLY;BYDAY=MO"]
}
```

</details>

<details>
<summary>getEventsResponse</summary>

Retrieves events with full pagination support, returning an EventResponse record that includes sync tokens and page tokens for incremental synchronization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calendarId` | `string` | Yes | Calendar identifier. |
| `count` | `int?` | No | Number of events required in one page. |
| `pageToken` | `string?` | No | Token for retrieving the next page of results. |
| `syncToken` | `string?` | No | Token for getting incremental sync (only changes since the last sync). |
| `filter` | `EventFilterCriteria?` | No | Record containing filtering criteria. |
| `userAccount` | `string?` | No | The email address of the user for requesting delegated access in service account. |

Returns: `EventResponse|error`

Sample code:

```ballerina
calendar:EventResponse response = check calendarClient->getEventsResponse("primary", count = 10);
```

Sample response:

```ballerina
{
  "kind": "calendar#events",
  "etag": "\"vwx234\"",
  "summary": "john@example.com",
  "updated": "2024-03-15T10:00:00.000Z",
  "timeZone": "UTC",
  "accessRole": "owner",
  "nextSyncToken": "CLDd7YGy9IcDELDd7YGy9IcDGAUggL3e",
  "items": [
    {
      "kind": "calendar#event",
      "id": "evt789ghi",
      "status": "confirmed",
      "summary": "Weekly Standup",
      "start": {
        "dateTime": "2024-03-04T09:00:00Z"
      },
      "end": {
        "dateTime": "2024-03-04T09:30:00Z"
      }
    }
  ]
}
```

</details>
