---
title: Actions
---

# Actions

The `ballerinax/zoom.scheduler` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to all Zoom Scheduler API operations including schedules, availability, events, analytics, and user management. |

---

## Client

Provides access to all Zoom Scheduler API operations including schedules, availability, events, analytics, and user management.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|http:OAuth2RefreshTokenGrantConfig` | Required | Authentication configuration: OAuth 2.0 refresh token config or a bearer token. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request/response payloads. |

### Initializing the client

```ballerina
import ballerinax/zoom.scheduler as zoom;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

zoom:Client zoomClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshUrl: "https://zoom.us/oauth/token",
        refreshToken: refreshToken
    }
});
```

### Operations

#### User

<details>
<summary>Get user</summary>

Retrieves the profile information for a specific Zoom user, including their display name, time zone, and scheduling URL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The Zoom user ID or `"me"` for the authenticated user. |

Returns: `InlineResponse2007|error`

Sample code:

```ballerina
zoom:InlineResponse2007 user = check zoomClient->/users/["me"];
```

Sample response:

```ballerina
{
  "displayName": "Jane Smith",
  "timeZone": "America/New_York",
  "schedulingUrl": "https://scheduler.zoom.us/janesmith",
  "slug": "janesmith",
  "logo": null,
  "picture": "https://example.zoom.us/p/photo.jpg"
}
```

</details>

#### Analytics

<details>
<summary>Get analytics report</summary>

Retrieves an analytics report for the authenticated user's scheduling activity over a specified date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ReportAnalyticsQueries` | No | Filter parameters including `userId`, `'from` (start date), `to` (end date), and `timeZone`. |

Returns: `InlineResponse200|error`

Sample code:

```ballerina
zoom:InlineResponse200 analytics = check zoomClient->/analytics(
    queries = {
        userId: "me",
        'from: "2025-01-01",
        to: "2025-12-31",
        timeZone: "America/New_York"
    }
);
```

Sample response:

```ballerina
{
  "lastNDays": {
    "scheduledEventsCreated": 42,
    "scheduledEventsCompleted": 38,
    "scheduledEventsCanceled": 4,
    "scheduledEventsRescheduled": 3,
    "schedulesCanceled": 1,
    "schedulesCreated": 5,
    "oneOffMeeting": 10,
    "meetingPoll": 2,
    "oneToMany": 1,
    "oneToOne": 29
  },
  "popularSchedules": [
    {"scheduleId": "abc123", "summary": "30-min intro call", "count": 15}
  ]
}
```

</details>

#### Availability

<details>
<summary>List availability schedules</summary>

Returns a paginated list of availability schedules for the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListAvailabilityQueries` | No | Optional filter parameters: `userId`, `pageSize`, `nextPageToken`. |

Returns: `InlineResponse2001|error`

Sample code:

```ballerina
zoom:InlineResponse2001 result = check zoomClient->/availability(
    queries = {userId: "me", pageSize: 10}
);
```

Sample response:

```ballerina
{
  "nextPageToken": null,
  "items": [
    {
      "availabilityId": "avail-001",
      "name": "Business Hours",
      "timeZone": "America/New_York",
      "owner": "me",
      "default": true,
      "segmentsRecurrence": {
        "mon": [{"start": "09:00", "end": "17:00"}],
        "tue": [{"start": "09:00", "end": "17:00"}],
        "wed": [{"start": "09:00", "end": "17:00"}],
        "thu": [{"start": "09:00", "end": "17:00"}],
        "fri": [{"start": "09:00", "end": "17:00"}]
      }
    }
  ]
}
```

</details>

<details>
<summary>Create availability schedule</summary>

Creates a new availability schedule with specified time windows and recurrence rules.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SchedulerAvailabilityBody` | Yes | The availability schedule to create, including `name`, `timeZone`, and optionally `segmentsRecurrence` for weekly recurrence. |

Returns: `InlineResponse201|error`

Sample code:

```ballerina
zoom:InlineResponse201 created = check zoomClient->/availability.post({
    name: "Extended Office Hours",
    timeZone: "America/New_York",
    'default: false,
    segmentsRecurrence: {
        mon: [{start: "08:00", end: "18:00"}],
        tue: [{start: "08:00", end: "18:00"}],
        wed: [{start: "08:00", end: "18:00"}],
        thu: [{start: "08:00", end: "18:00"}],
        fri: [{start: "08:00", end: "16:00"}]
    }
});
```

Sample response:

```ballerina
{
  "availabilityId": "avail-002",
  "name": "Extended Office Hours",
  "timeZone": "America/New_York",
  "owner": "me",
  "default": false,
  "segmentsRecurrence": {
    "mon": [{"start": "08:00", "end": "18:00"}],
    "tue": [{"start": "08:00", "end": "18:00"}],
    "wed": [{"start": "08:00", "end": "18:00"}],
    "thu": [{"start": "08:00", "end": "18:00"}],
    "fri": [{"start": "08:00", "end": "16:00"}]
  }
}
```

</details>

<details>
<summary>Get availability schedule</summary>

Retrieves a single availability schedule by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availabilityId` | `string` | Yes | The unique identifier of the availability schedule to retrieve. |

Returns: `InlineResponse2002|error`

Sample code:

```ballerina
zoom:InlineResponse2002 availability = check zoomClient->/availability/["avail-001"];
```

Sample response:

```ballerina
{
  "availabilityId": "avail-001",
  "name": "Business Hours",
  "timeZone": "America/New_York",
  "owner": "me",
  "default": true,
  "segmentsRecurrence": {
    "mon": [{"start": "09:00", "end": "17:00"}],
    "fri": [{"start": "09:00", "end": "17:00"}]
  },
  "segments": []
}
```

</details>

<details>
<summary>Update availability schedule</summary>

Updates an existing availability schedule's name, time zone, or recurrence windows.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availabilityId` | `string` | Yes | The unique identifier of the availability schedule to update. |
| `payload` | `AvailabilityavailabilityIdBody` | Yes | Updated availability details. Must include `name` and `timeZone`. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/availability/["avail-001"].patch({
    name: "Business Hours Updated",
    timeZone: "America/Chicago",
    segmentsRecurrence: {
        mon: [{start: "08:00", end: "17:00"}],
        fri: [{start: "08:00", end: "15:00"}]
    }
});
```

</details>

<details>
<summary>Delete availability schedule</summary>

Permanently deletes an availability schedule by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availabilityId` | `string` | Yes | The unique identifier of the availability schedule to delete. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/availability/["avail-002"].delete();
```

</details>

#### Schedules

<details>
<summary>List schedules</summary>

Returns a paginated list of meeting schedules for the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListSchedulesQueries` | No | Optional filters: `userId`, `pageSize`, `nextPageToken`, `showDeleted`, `'from`, `to`, `timeZone`. |

Returns: `InlineResponse2005|error`

Sample code:

```ballerina
zoom:InlineResponse2005 result = check zoomClient->/schedules(
    queries = {userId: "me", pageSize: 10, showDeleted: false}
);
```

Sample response:

```ballerina
{
  "nextPageToken": null,
  "items": [
    {
      "scheduleId": "sched-001",
      "summary": "30-min Intro Call",
      "duration": 30,
      "capacity": 1,
      "active": true,
      "status": "active",
      "timeZone": "America/New_York",
      "scheduleType": "one",
      "slug": "intro-call",
      "schedulingUrl": "https://scheduler.zoom.us/janesmith/intro-call",
      "addOnType": "zoomMeeting"
    }
  ]
}
```

</details>

<details>
<summary>Create schedule</summary>

Creates a new meeting schedule with availability rules, duration, capacity, and optional custom fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SchedulerSchedulesBody` | Yes | Schedule configuration including `availabilityRules`, `capacity`, `availabilityOverride`, and optional fields like `summary`, `duration`, `slug`, `addOnType`. |
| `queries` | `InsertScheduleQueries` | No | Optional `userId` query parameter. |

Returns: `InlineResponse2011|error`

Sample code:

```ballerina
zoom:InlineResponse2011 schedule = check zoomClient->/schedules.post(
    {
        availabilityRules: [{availabilityId: "avail-001"}],
        capacity: 1,
        availabilityOverride: false,
        summary: "30-min Team Sync",
        duration: 30,
        timeZone: "America/New_York",
        addOnType: "zoomMeeting",
        scheduleType: "one",
        slug: "team-sync",
        customFields: [
            {
                label: "What would you like to discuss?",
                'type: "text",
                required: true
            }
        ]
    },
    queries = {userId: "me"}
);
```

Sample response:

```ballerina
{
  "scheduleId": "sched-002",
  "summary": "30-min Team Sync",
  "duration": 30,
  "capacity": 1,
  "active": true,
  "status": "active",
  "timeZone": "America/New_York",
  "scheduleType": "one",
  "slug": "team-sync",
  "schedulingUrl": "https://scheduler.zoom.us/janesmith/team-sync",
  "addOnType": "zoomMeeting",
  "availabilityRules": [{"availabilityId": "avail-001"}],
  "availabilityOverride": false
}
```

</details>

<details>
<summary>Get schedule</summary>

Retrieves a single meeting schedule by its ID, including full configuration details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | `string` | Yes | The unique identifier of the schedule to retrieve. |
| `queries` | `GetScheduleQueries` | No | Optional `userId` query parameter. |

Returns: `InlineResponse2006|error`

Sample code:

```ballerina
zoom:InlineResponse2006 schedule = check zoomClient->/schedules/["sched-001"](
    queries = {userId: "me"}
);
```

Sample response:

```ballerina
{
  "scheduleId": "sched-001",
  "summary": "30-min Intro Call",
  "duration": 30,
  "capacity": 1,
  "active": true,
  "timeZone": "America/New_York",
  "slug": "intro-call",
  "schedulingUrl": "https://scheduler.zoom.us/janesmith/intro-call",
  "buffer": {"before": 5, "after": 5},
  "cushion": 10,
  "location": "Zoom",
  "addOnType": "zoomMeeting"
}
```

</details>

<details>
<summary>Update schedule</summary>

Updates an existing schedule's configuration such as summary, duration, capacity, or availability rules.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | `string` | Yes | The unique identifier of the schedule to update. |
| `payload` | `SchedulesscheduleIdBody` | Yes | Fields to update on the schedule. |
| `queries` | `PatchScheduleQueries` | No | Optional `userId` query parameter. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/schedules/["sched-001"].patch(
    {summary: "45-min Intro Call", duration: 45},
    queries = {userId: "me"}
);
```

</details>

<details>
<summary>Delete schedule</summary>

Permanently deletes a meeting schedule by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | `string` | Yes | The unique identifier of the schedule to delete. |
| `queries` | `DeleteSchedulesQueries` | No | Optional `userId` query parameter. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/schedules/["sched-002"].delete(
    queries = {userId: "me"}
);
```

</details>

<details>
<summary>Generate single-use link</summary>

Generates a one-time-use scheduling URL for a specific schedule, useful for sending to individuals for a single booking.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SchedulesSingleUseLinkBody` | Yes | Object containing the `scheduleId` for which to generate the single-use link. |

Returns: `InlineResponse2012|error`

Sample code:

```ballerina
zoom:InlineResponse2012 linkResponse = check zoomClient->/schedules/single_use_link.post({
    scheduleId: "sched-001"
});
```

Sample response:

```ballerina
{
  "schedulingUrl": "https://scheduler.zoom.us/janesmith/intro-call?token=abc123xyz"
}
```

</details>

#### Events

<details>
<summary>List scheduled events</summary>

Returns a paginated list of scheduled events (bookings) with optional filters for date range, status, and search.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ListScheduledEventsQueries` | No | Optional filters: `userId`, `pageSize`, `nextPageToken`, `eventType`, `showDeleted`, `search`, `'from`, `to`, `timeZone`, `orderBy`. |

Returns: `InlineResponse2003|error`

Sample code:

```ballerina
zoom:InlineResponse2003 events = check zoomClient->/events(
    queries = {userId: "me", pageSize: 10}
);
```

Sample response:

```ballerina
{
  "nextPageToken": null,
  "items": [
    {
      "eventId": "evt-001",
      "status": "confirmed",
      "summary": "30-min Intro Call",
      "startDateTime": "2025-06-10T14:00:00Z",
      "endDateTime": "2025-06-10T14:30:00Z",
      "scheduleId": "sched-001",
      "eventType": "one",
      "location": "Zoom",
      "attendees": [
        {"name": "John Doe", "email": "john@example.com"}
      ]
    }
  ]
}
```

</details>

<details>
<summary>Get scheduled event</summary>

Retrieves a single scheduled event (booking) by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | `string` | Yes | The unique identifier of the scheduled event. |
| `queries` | `GetScheduledEventsQueries` | No | Optional `userId` query parameter. |

Returns: `InlineResponse2004|error`

Sample code:

```ballerina
zoom:InlineResponse2004 event = check zoomClient->/events/["evt-001"](
    queries = {userId: "me"}
);
```

Sample response:

```ballerina
{
  "eventId": "evt-001",
  "status": "confirmed",
  "summary": "30-min Intro Call",
  "startDateTime": "2025-06-10T14:00:00Z",
  "endDateTime": "2025-06-10T14:30:00Z",
  "scheduleId": "sched-001",
  "eventType": "one",
  "location": "Zoom",
  "attendees": [{"name": "John Doe", "email": "john@example.com"}],
  "meetingNotes": "Looking forward to connecting!",
  "description": "30-minute introductory call"
}
```

</details>

<details>
<summary>Update scheduled event</summary>

Updates a scheduled event: for example, to change its status (confirm or cancel) or add meeting notes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | `string` | Yes | The unique identifier of the scheduled event to update. |
| `payload` | `EventseventIdBody` | Yes | Fields to update: `status` (`confirmed` or `cancelled`), `meetingNotes`, or `attendees`. |
| `queries` | `PatchScheduledEventsQueries` | No | Optional `userId` query parameter. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/events/["evt-001"].patch(
    {status: "cancelled", meetingNotes: "Cancelled due to scheduling conflict."},
    queries = {userId: "me"}
);
```

</details>

<details>
<summary>Delete scheduled event</summary>

Permanently deletes a scheduled event by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | `string` | Yes | The unique identifier of the scheduled event to delete. |
| `queries` | `DeleteScheduledEventsQueries` | No | Optional `userId` query parameter. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/events/["evt-001"].delete(
    queries = {userId: "me"}
);
```

</details>
