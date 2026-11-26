---
connector: true
connector_name: "zoom.scheduler"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Zoom Scheduler connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage schedules, availability, bookings, scheduled events, single-use links, routing forms, analytics, teams, and user profiles via the Zoom Scheduler API |

---

## Client

Provides programmatic access to all Zoom Scheduler API operations, covering routing forms, analytics, availability management, bookings, scheduled events, schedules, single-use scheduling links, teams, and user profiles.

### Configuration

`ConnectionConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;http:OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with redirection |
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
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding; `nil` values are treated as optional and absent fields are handled as `nilable` types |

### Initializing the client

```ballerina
import ballerinax/zoom.scheduler;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;
configurable string userId = ?;

final scheduler:Client schedulerClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl
    }
});
```

### Operations

#### Routing

<details>
<summary>getRoutingFormResponse</summary>

<div>

Returns the routing response details for a specific response submitted to a routing form. The response body includes basic routing form information, the questions and their answers, and the final result after submitting, which can be a URL, text, or booking link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `formId` | <code>string</code> | Yes | The identifier of the routing form |
| `responseId` | <code>string</code> | Yes | The identifier of the response to a particular routing form |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `RoutingFormResponse|error`

**Sample code:**

```ballerina
scheduler:RoutingFormResponse result = check schedulerClient->getRoutingFormResponse("form-abc123", "resp-xyz789");
```

**Sample response:**

```json
{
  "form_id": "form-abc123",
  "created_time": "2024-01-15T10:30:00Z",
  "creator_email": "host@example.com",
  "result_type": "event",
  "result_value": "https://zoom.us/scheduler/product-demo",
  "booking_link": "https://zoom.us/scheduler/product-demo",
  "booked": true,
  "questions_and_answers": [
    {
      "question_id": "q1",
      "question_content": "What is the purpose of your meeting?",
      "answers": ["Product demo request"]
    }
  ]
}
```

</div>
</details>

<details>
<summary>listRoutingResponses</summary>

<div>

Returns a list of routing responses across all routing forms under the account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `RoutingResponseList|error`

**Sample code:**

```ballerina
scheduler:RoutingResponseList result = check schedulerClient->listRoutingResponses();
```

**Sample response:**

```json
{
  "next_page_token": "",
  "responses": [
    {
      "response_id": "resp-xyz789",
      "form_id": "form-abc123",
      "created_time": "2024-01-15T10:30:00Z",
      "creator_email": "host@example.com",
      "result_type": "event",
      "result_value": "https://zoom.us/scheduler/product-demo",
      "booking_link": "https://zoom.us/scheduler/product-demo",
      "booked": true,
      "questions_and_answers": []
    }
  ]
}
```

</div>
</details>

#### Analytics

<details>
<summary>getAnalyticsReport</summary>

<div>

Returns the scheduler analytics for the user ID or account ID provided, including booking counts, event distribution by duration and time, and comparison totals for the equivalent previous period.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The specific user's web user ID. Default is `"me"`. Use `"all"` to query analytics for all members under the account |
| `from` | <code>string</code> | No | The lower bound for filtering (RFC3339 timestamp, e.g. `2024-01-01T00:00:00Z`) |
| `to` | <code>string</code> | No | The upper bound for filtering (RFC3339 timestamp, e.g. `2024-01-31T00:00:00Z`) |
| `timeZone` | <code>string</code> | No | The time zone in the response |

**Returns:** `AnalyticsReport|error`

**Sample code:**

```ballerina
scheduler:AnalyticsReport result = check schedulerClient->getAnalyticsReport(userId = "me", 'from = "2024-01-01T00:00:00Z", to = "2024-01-31T00:00:00Z", timeZone = "America/Los_Angeles");
```

**Sample response:**

```json
{
  "last_n_days": {
    "scheduled_events_created": 42,
    "scheduled_events_completed": 38,
    "scheduled_events_canceled": 4,
    "scheduled_events_rescheduled": 2,
    "schedules_created": 3,
    "one_to_one": 30,
    "one_to_many": 12,
    "any_host_available": 8,
    "all_host_available": 2,
    "one_off_meeting": 5,
    "meeting_poll": 0
  },
  "previous_period": {
    "scheduled_events_created": 35,
    "scheduled_events_completed": 30,
    "scheduled_events_canceled": 5,
    "scheduled_events_rescheduled": 1,
    "one_to_one": 25,
    "one_to_many": 10
  },
  "popular_schedules": [
    {"schedule_id": "sch-123", "summary": "Product demo", "count": 20}
  ],
  "popular_time_of_day": [],
  "popular_time_of_week": [],
  "event_distribution_by_duration": [],
  "users_with_most_events": [],
  "users_with_least_events": []
}
```

</div>
</details>

#### Availability

<details>
<summary>listAvailabilities</summary>

<div>

Returns a paginated list of availability schedules owned by the specified user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The return of a specific user's availability |
| `pageSize` | <code>int</code> | No | The maximum number of availabilities returned on one result page |
| `nextPageToken` | <code>string</code> | No | The token that specifies which result page to return |

**Returns:** `AvailabilityList|error`

**Sample code:**

```ballerina
scheduler:AvailabilityList result = check schedulerClient->listAvailabilities(userId = "me", pageSize = 30);
```

**Sample response:**

```json
{
  "next_page_token": "",
  "items": [
    {
      "availability_id": "avail-abc123",
      "name": "Working Hours",
      "time_zone": "America/Los_Angeles",
      "default": true,
      "owner": "user-xyz",
      "segments_recurrence": {
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

</div>
</details>

<details>
<summary>createAvailability</summary>

<div>

Creates a new availability schedule with configurable working-hour segments and optional date-specific overrides.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAvailabilityRequest</code> | Yes | Availability resource properties, including name, time zone, and weekly recurrence segments |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `CreatedAvailability|error`

**Sample code:**

```ballerina
scheduler:CreatedAvailability result = check schedulerClient->createAvailability({
    name: "Working Hours",
    timeZone: "America/Los_Angeles",
    segmentsRecurrence: {
        mon: [{'start: "09:00", end: "17:00"}],
        tue: [{'start: "09:00", end: "17:00"}],
        wed: [{'start: "09:00", end: "17:00"}],
        thu: [{'start: "09:00", end: "17:00"}],
        fri: [{'start: "09:00", end: "16:00"}]
    }
});
```

**Sample response:**

```json
{
  "availability_id": "avail-abc123",
  "name": "Working Hours",
  "time_zone": "America/Los_Angeles",
  "default": false,
  "owner": "user-xyz",
  "segments_recurrence": {
    "mon": [{"start": "09:00", "end": "17:00"}],
    "tue": [{"start": "09:00", "end": "17:00"}],
    "wed": [{"start": "09:00", "end": "17:00"}],
    "thu": [{"start": "09:00", "end": "17:00"}],
    "fri": [{"start": "09:00", "end": "16:00"}]
  },
  "segments": []
}
```

</div>
</details>

<details>
<summary>getAvailability</summary>

<div>

Returns an availability schedule resource for the specified availability ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availabilityId` | <code>string</code> | Yes | The UUID of the availability schedule |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `Availability|error`

**Sample code:**

```ballerina
scheduler:Availability result = check schedulerClient->getAvailability("avail-abc123");
```

**Sample response:**

```json
{
  "availability_id": "avail-abc123",
  "name": "Working Hours",
  "time_zone": "America/Los_Angeles",
  "default": true,
  "owner": "user-xyz",
  "segments_recurrence": {
    "mon": [{"start": "09:00", "end": "17:00"}],
    "tue": [{"start": "09:00", "end": "17:00"}],
    "wed": [{"start": "09:00", "end": "17:00"}],
    "thu": [{"start": "09:00", "end": "17:00"}],
    "fri": [{"start": "09:00", "end": "16:00"}]
  }
}
```

</div>
</details>

<details>
<summary>updateAvailability</summary>

<div>

Updates an existing availability schedule using patch semantics. Only supplied fields are changed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availabilityId` | <code>string</code> | Yes | The UUID of the availability schedule |
| `payload` | <code>UpdateAvailabilityRequest</code> | Yes | Availability resource properties to update |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check schedulerClient->updateAvailability("avail-abc123", {
    name: "Updated Working Hours",
    timeZone: "America/New_York"
});
```

</div>
</details>

<details>
<summary>deleteAvailability</summary>

<div>

Deletes the specified availability schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availabilityId` | <code>string</code> | Yes | The UUID of the availability schedule |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check schedulerClient->deleteAvailability("avail-abc123");
```

</div>
</details>

#### Bookings

<details>
<summary>createBooking</summary>

<div>

Books a schedule slot on behalf of an invitee. Returns the full booking event object with attendee details, assigned host, and computed fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateBookingRequest</code> | Yes | The booking details including the schedule to book, time slot, booker information, and optional configuration |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `user` | <code>string</code> | No | The user slug identifier for a specific host or team member (format: `t/` followed by the user identifier). Required if the schedule object contains a `user` field |

**Returns:** `Booking|error`

**Sample code:**

```ballerina
scheduler:Booking result = check schedulerClient->createBooking({
    scheduleId: "sch-abc123",
    duration: 30,
    startDateTime: "2024-01-20T14:00:00Z",
    timeZone: "America/Los_Angeles",
    booker: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com"
    }
});
```

**Sample response:**

```json
{
  "event_id": "evt-abc123",
  "schedule_id": "sch-abc123",
  "summary": "Product demo",
  "status": "confirmed",
  "start_date_time": "2024-01-20T14:00:00-08:00",
  "end_date_time": "2024-01-20T14:30:00-08:00",
  "duration": 30,
  "capacity": 1,
  "type": "one",
  "location_kind": "zoomMeeting",
  "location": "",
  "location_additional_info": "",
  "assigned_to": ["Host Name"],
  "attendees": [
    {
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane.doe@example.com",
      "booker": true
    }
  ],
  "tracking": []
}
```

</div>
</details>

#### Scheduled Events

<details>
<summary>listScheduledEvents</summary>

<div>

Returns a paginated list of scheduled events matching the given filters. By default, only events belonging to the authenticated user are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The return of a specific user's scheduled events. Admin only |
| `teamId` | <code>string</code> | No | The team ID of which the user belongs |
| `from` | <code>string</code> | No | The lower bound for an event's end time filter |
| `to` | <code>string</code> | No | The upper bound for an event's start time filter |
| `timeZone` | <code>string</code> | No | The time zone in the response |
| `showDeleted` | <code>boolean</code> | No | Whether to include deleted events (status `cancelled`) in the result |
| `accountLevel` | <code>boolean</code> | No | If true, lists scheduled events of all users below the current account |
| `eventType` | <code>"pending"</code> | No | Whether to return pending events |
| `search` | <code>string</code> | No | Returns search results from meeting ID or summary |
| `nextPageToken` | <code>string</code> | No | The token that specifies which result page to return |
| `pageSize` | <code>int</code> | No | The maximum number of events returned on one result page |
| `orderBy` | <code>string</code> | No | The sort field: start time or update time |
| `updatedFrom` | <code>string</code> | No | The lower bound for an event's update time filter |
| `updatedTo` | <code>string</code> | No | The upper bound for an event's update time filter |
| `createdFrom` | <code>string</code> | No | The lower bound for an event's create time filter |
| `createdTo` | <code>string</code> | No | The upper bound for an event's create time filter |

**Returns:** `ScheduledEventList|error`

**Sample code:**

```ballerina
scheduler:ScheduledEventList result = check schedulerClient->listScheduledEvents('from = "2024-01-01T00:00:00Z", to = "2024-01-31T23:59:59Z", pageSize = 20);
```

**Sample response:**

```json
{
  "next_page_token": "",
  "items": [
    {
      "event_id": "evt-abc123",
      "schedule_id": "sch-xyz789",
      "summary": "Product demo",
      "event_type": "default",
      "status": "confirmed",
      "start_date_time": "2024-01-20T14:00:00-08:00",
      "end_date_time": "2024-01-20T14:30:00-08:00",
      "location": "",
      "attendees": [
        {"display_name": "Jane Doe", "email": "jane@example.com"}
      ],
      "tracking_params": [],
      "guests": []
    }
  ]
}
```

</div>
</details>

<details>
<summary>getScheduledEvent</summary>

<div>

Returns the scheduled event resource for the specified event ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The opaque identifier of the scheduled event |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The ID of the user (admin only) |
| `teamId` | <code>string</code> | No | The ID of the team to which the user belongs |

**Returns:** `ScheduledEvent|error`

**Sample code:**

```ballerina
scheduler:ScheduledEvent result = check schedulerClient->getScheduledEvent("evt-abc123");
```

**Sample response:**

```json
{
  "event_id": "evt-abc123",
  "schedule_id": "sch-xyz789",
  "summary": "Product demo",
  "description": "A 30 minute walkthrough of the product",
  "event_type": "default",
  "status": "confirmed",
  "start_date_time": "2024-01-20T14:00:00-08:00",
  "end_date_time": "2024-01-20T14:30:00-08:00",
  "meeting_notes": "",
  "location": "",
  "attendees": [
    {
      "attendee_id": "att-123",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "display_name": "Jane Doe",
      "time_zone": "America/Los_Angeles",
      "booker": true,
      "no_show": false
    }
  ],
  "external_location": {
    "kind": "zoomMeeting",
    "meeting_id": "123456789",
    "meeting_join_url": "https://zoom.us/j/123456789",
    "meeting_passcode": "abc123"
  },
  "tracking_params": [],
  "guests": []
}
```

</div>
</details>

<details>
<summary>updateScheduledEvent</summary>

<div>

Updates properties of an existing scheduled event, such as attendee no-show status, meeting notes, or cancellation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The opaque identifier of the scheduled event |
| `payload` | <code>UpdateScheduledEventRequest</code> | Yes | The relevant portions of the event resource to update |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The ID of the user (admin only) |

**Returns:** `error?`

**Sample code:**

```ballerina
check schedulerClient->updateScheduledEvent("evt-abc123", {status: "cancelled"});
```

</div>
</details>

<details>
<summary>deleteScheduledEvent</summary>

<div>

Deletes the specified scheduled event.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The opaque identifier of the scheduled event |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The ID of the user (admin only) |

**Returns:** `error?`

**Sample code:**

```ballerina
check schedulerClient->deleteScheduledEvent("evt-abc123");
```

</div>
</details>

<details>
<summary>getScheduledEventAttendee</summary>

<div>

Returns the scheduled event attendee resource for the specified event and attendee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventId` | <code>string</code> | Yes | The ID of the scheduled event |
| `attendeeId` | <code>string</code> | Yes | The ID of the attendee to get scheduled event attendee information |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `ScheduledEventAttendee|error`

**Sample code:**

```ballerina
scheduler:ScheduledEventAttendee result = check schedulerClient->getScheduledEventAttendee("evt-abc123", "att-xyz789");
```

**Sample response:**

```json
{
  "attendee_id": "att-xyz789",
  "event_id": "evt-abc123",
  "schedule_id": "sch-123",
  "first_name": "Jane",
  "last_name": "Doe",
  "display_name": "Jane Doe",
  "email": "jane@example.com",
  "time_zone": "America/Los_Angeles",
  "created": "2024-01-15T10:30:00Z",
  "no_show": false,
  "booker": true,
  "custom_values": [
    {
      "name": "What brings you here?",
      "values": ["Interested in a demo"]
    }
  ]
}
```

</div>
</details>

#### Schedules

<details>
<summary>listSchedules</summary>

<div>

Returns a paginated list of booking schedules. By default, only the authenticated user's schedules are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The return of a specific user's schedules. Admin only |
| `teamId` | <code>string</code> | No | The team ID to which the user belongs |
| `timeZone` | <code>string</code> | No | The time zone in the response |
| `showDeleted` | <code>boolean</code> | No | Whether to include deleted schedules (status `cancelled`) in the result |
| `accountLevel` | <code>boolean</code> | No | If true, lists schedules of all users below the current account |
| `search` | <code>string</code> | No | Returns search results from meeting ID or summary |
| `nextPageToken` | <code>string</code> | No | The token that specifies which result page to return |
| `pageSize` | <code>int</code> | No | The maximum number of schedule results returned on a result page |
| `from` | <code>string</code> | No | The lower bound for a schedule's end time filter |
| `to` | <code>string</code> | No | The upper bound for a schedule's start time filter |
| `updatedFrom` | <code>string</code> | No | The lower bound for an event's update time filter |
| `updatedTo` | <code>string</code> | No | The upper bound for an event's update time filter |
| `createdFrom` | <code>string</code> | No | The lower bound for an event's create time filter |
| `createdTo` | <code>string</code> | No | The upper bound for an event's create time filter |

**Returns:** `ScheduleList|error`

**Sample code:**

```ballerina
scheduler:ScheduleList result = check schedulerClient->listSchedules(pageSize = 50);
```

**Sample response:**

```json
{
  "next_page_token": "",
  "items": [
    {
      "schedule_id": "sch-abc123",
      "summary": "Product demo",
      "description": "A 30 minute walkthrough of the product",
      "schedule_type": "one",
      "add_on_type": "zoomMeeting",
      "duration": 30,
      "capacity": 1,
      "active": true,
      "status": "confirmed",
      "time_zone": "America/Los_Angeles",
      "scheduling_url": "https://zoom.us/scheduler/product-demo",
      "slug": "product-demo",
      "interval_type": "unlimited",
      "availability_override": false,
      "organizer": {
        "email": "host@example.com",
        "display_name": "Host Name",
        "self": true
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSchedule</summary>

<div>

Creates a new booking schedule with configurable duration, capacity, add-on type, availability rules, and custom fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateScheduleRequest</code> | Yes | The schedule resource properties including summary, duration, capacity, and availability rules |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The admin-only field indicating which user's schedule is being created |

**Returns:** `CreatedSchedule|error`

**Sample code:**

```ballerina
scheduler:CreatedSchedule result = check schedulerClient->createSchedule({
    summary: "Product demo",
    description: "A 30 minute walkthrough of the product",
    duration: 30,
    capacity: 1,
    scheduleType: "one",
    addOnType: "zoomMeeting",
    timeZone: "America/Los_Angeles",
    availabilityOverride: false,
    availabilityRules: [
        {
            useCustom: true,
            timeZone: "America/Los_Angeles",
            segmentsRecurrence: {
                mon: [{'start: "09:00", end: "17:00"}],
                tue: [{'start: "09:00", end: "17:00"}],
                wed: [{'start: "09:00", end: "17:00"}],
                thu: [{'start: "09:00", end: "17:00"}],
                fri: [{'start: "09:00", end: "17:00"}]
            }
        }
    ]
}, userId = "me");
```

**Sample response:**

```json
{
  "schedule_id": "sch-abc123",
  "summary": "Product demo",
  "description": "A 30 minute walkthrough of the product",
  "schedule_type": "one",
  "add_on_type": "zoomMeeting",
  "duration": 30,
  "capacity": 1,
  "active": true,
  "status": "confirmed",
  "time_zone": "America/Los_Angeles",
  "scheduling_url": "https://zoom.us/scheduler/product-demo",
  "slug": "product-demo",
  "interval_type": "unlimited",
  "cushion": 0,
  "availability_override": false,
  "availability_rules": [
    {
      "use_custom": true,
      "time_zone": "America/Los_Angeles",
      "segments_recurrence": {
        "mon": [{"start": "09:00", "end": "17:00"}],
        "tue": [{"start": "09:00", "end": "17:00"}],
        "wed": [{"start": "09:00", "end": "17:00"}],
        "thu": [{"start": "09:00", "end": "17:00"}],
        "fri": [{"start": "09:00", "end": "17:00"}]
      }
    }
  ],
  "organizer": {
    "email": "host@example.com",
    "display_name": "Host Name",
    "self": true
  },
  "creator": {
    "email": "host@example.com",
    "display_name": "Host Name",
    "self": true
  },
  "updated": "2024-01-15T10:30:00Z"
}
```

</div>
</details>

<details>
<summary>getSchedule</summary>

<div>

Returns the schedule resource for the specified schedule ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | <code>string</code> | Yes | The schedule's unique identifier |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The admin-only field for handling a specific user's schedule |

**Returns:** `Schedule|error`

**Sample code:**

```ballerina
scheduler:Schedule result = check schedulerClient->getSchedule("sch-abc123");
```

**Sample response:**

```json
{
  "schedule_id": "sch-abc123",
  "summary": "Product demo",
  "description": "A 30 minute walkthrough of the product",
  "schedule_type": "one",
  "add_on_type": "zoomMeeting",
  "duration": 30,
  "capacity": 1,
  "active": true,
  "status": "confirmed",
  "time_zone": "America/Los_Angeles",
  "scheduling_url": "https://zoom.us/scheduler/product-demo",
  "slug": "product-demo",
  "interval_type": "unlimited",
  "cushion": 0,
  "availability_override": false,
  "availability_rules": [
    {
      "use_custom": true,
      "time_zone": "America/Los_Angeles",
      "segments_recurrence": {
        "mon": [{"start": "09:00", "end": "17:00"}],
        "fri": [{"start": "09:00", "end": "17:00"}]
      }
    }
  ],
  "organizer": {
    "email": "host@example.com",
    "display_name": "Host Name",
    "self": true
  }
}
```

</div>
</details>

<details>
<summary>updateSchedule</summary>

<div>

Updates an existing booking schedule using patch semantics. Only supplied fields are changed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | <code>string</code> | Yes | The schedule's unique identifier |
| `payload` | <code>UpdateScheduleRequest</code> | Yes | The relevant portions of a schedule resource to update |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The admin-only field for handling a specific user's schedule |

**Returns:** `error?`

**Sample code:**

```ballerina
check schedulerClient->updateSchedule("sch-abc123", {
    summary: "Updated Product demo",
    duration: 45
});
```

</div>
</details>

<details>
<summary>deleteSchedule</summary>

<div>

Deletes the specified booking schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | <code>string</code> | Yes | The unique identifier of the schedule |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | The admin-only field for handling a specific user's schedule |

**Returns:** `error?`

**Sample code:**

```ballerina
check schedulerClient->deleteSchedule("sch-abc123");
```

</div>
</details>

<details>
<summary>listAvailableTimes</summary>

<div>

Returns the open time slots for a schedule within the requested time window. Each day in the response includes individual spots with their availability status and remaining bookable seat count.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduleId` | <code>string</code> | Yes | The unique identifier of the schedule or scheduling page this query belongs to |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `from` | <code>string</code> | Yes | The minimum time boundary for querying available slots, in ISO 8601 / RFC 3339 UTC format |
| `to` | <code>string</code> | Yes | The maximum time boundary for querying available slots, in ISO 8601 / RFC 3339 UTC format. Must be strictly after `from` |
| `timeZone` | <code>string</code> | No | The timezone identifier (IANA format, e.g. `America/Los_Angeles`) |
| `user` | <code>string</code> | No | The user slug identifier to filter available time slots for a specific host (format: `t/` followed by the user identifier). Required if the schedule object contains a `user` field |

**Returns:** `AvailableTimes|error`

**Sample code:**

```ballerina
scheduler:AvailableTimes result = check schedulerClient->listAvailableTimes("sch-abc123", 'from = "2024-01-20T00:00:00Z", to = "2024-01-27T00:00:00Z", timeZone = "America/Los_Angeles");
```

**Sample response:**

```json
{
  "schedule_id": "sch-abc123",
  "duration": 30,
  "days": [
    {
      "date": "2024-01-20",
      "status": "available",
      "spots": [
        {
          "start_time": "2024-01-20T09:00:00-08:00",
          "status": "available",
          "available_number": 1
        },
        {
          "start_time": "2024-01-20T09:30:00-08:00",
          "status": "available",
          "available_number": 1
        },
        {
          "start_time": "2024-01-20T10:00:00-08:00",
          "status": "unavailable",
          "available_number": 0
        }
      ]
    },
    {
      "date": "2024-01-21",
      "status": "unavailable",
      "spots": []
    }
  ]
}
```

</div>
</details>

#### Scheduling Links

<details>
<summary>createSingleUseLink</summary>

<div>

Creates a single-use scheduling link for the specified schedule. The link expires after one booking is made.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSingleUseLinkRequest</code> | Yes | Schedule ID for which a single-use scheduling link is created |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `teamId` | <code>string</code> | No | Identifies the specific team; if provided, the link is created for the team to which the user belongs |

**Returns:** `SingleUseLink|error`

**Sample code:**

```ballerina
scheduler:SingleUseLink result = check schedulerClient->createSingleUseLink({scheduleId: "sch-abc123"});
```

**Sample response:**

```json
{
  "scheduling_url": "https://zoom.us/scheduler/product-demo?single_use_token=abc123xyz"
}
```

</div>
</details>

<details>
<summary>createShare</summary>

<div>

Creates a customised scheduling link for a specific schedule with optional duration, date range, and availability overrides. Returns a custom link that can be shared with a targeted attendee without creating a new schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateShareRequest</code> | Yes | Schedule customisations to share with a specific attendee, including schedule ID, optional duration, time zone, and date range |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `Share|error`

**Sample code:**

```ballerina
scheduler:Share result = check schedulerClient->createShare({
    scheduleId: "sch-abc123",
    duration: 60,
    timeZone: "America/Los_Angeles",
    intervalType: "fixed",
    startDate: "2024-01-20",
    endDate: "2024-01-27"
});
```

**Sample response:**

```json
{
  "scheduling_url": "https://zoom.us/scheduler/product-demo?share_token=xyz789abc"
}
```

</div>
</details>

#### Teams

<details>
<summary>listTeams</summary>

<div>

Returns a list of teams, optionally filtered to teams that include a specific user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |
| `userId` | <code>string</code> | No | Specifies teams that include this specific user |

**Returns:** `TeamList|error`

**Sample code:**

```ballerina
scheduler:TeamList result = check schedulerClient->listTeams(userId = "me");
```

**Sample response:**

```json
{
  "teams": [
    {
      "team_id": "team-abc123",
      "name": "Sales Team",
      "slug": "sales-team",
      "member_count": 5
    }
  ]
}
```

</div>
</details>

#### Users

<details>
<summary>getUser</summary>

<div>

Returns the Zoom Scheduler profile for the specified user, including their scheduling URL, display name, time zone, and avatar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The identifier of the user whose Scheduler details are returned |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Headers to be sent with the request |

**Returns:** `SchedulerUser|error`

**Sample code:**

```ballerina
scheduler:SchedulerUser result = check schedulerClient->getUser("user-abc123");
```

**Sample response:**

```json
{
  "display_name": "Jane Doe",
  "time_zone": "America/Los_Angeles",
  "slug": "jane-doe",
  "scheduling_url": "https://zoom.us/scheduler/jane-doe",
  "logo": "",
  "picture": "https://zoom.us/avatar/jane-doe.jpg"
}
```

</div>
</details>
