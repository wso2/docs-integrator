---
title: Actions
---

# Actions

The `ballerinax/zoom.meetings` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to all Zoom Meetings REST API v2 operations: meeting management, webinars, registrants, polls, recordings, and reports. |

---

## Client

Provides access to all Zoom Meetings REST API v2 operations: meeting management, webinars, registrants, polls, recordings, and reports.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `ApiKeysConfig\|http:BearerTokenConfig\|http:OAuth2RefreshTokenGrantConfig` | Required | Authentication configuration: API key authorization header, static bearer token, or OAuth 2.0 refresh token grant. |
| `httpVersion` | `http:HttpVersion` | `"2_0"` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for the HTTP client. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on request and response payloads. |

### Initializing the client

```ballerina
import ballerinax/zoom.meetings;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshUrl = ?;
configurable string refreshToken = ?;

meetings:Client zoomClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshUrl: refreshUrl,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Meeting management

<details>
<summary>Create a meeting</summary>

Creates a new meeting for the specified Zoom user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The host's user ID, email address, or `me` for the authenticated user. |
| `payload` | `UserIdMeetingsBody` | Yes | Meeting details including topic, type, start time, duration, timezone, and optional settings. |

Returns: `InlineResponse2018|error`

Sample code:

```ballerina
meetings:InlineResponse2018 meetingDetails = check zoomClient->/users/[userId]/meetings.post(
    payload = {
        topic: "Team Sync",
        'type: 2,
        startTime: "2025-07-10T10:00:00Z",
        duration: 30,
        timezone: "UTC"
    }
);
```

Sample response:

```ballerina
{"id": 123456789, "topic": "Team Sync", "type": 2, "start_time": "2025-07-10T10:00:00Z", "duration": 30, "timezone": "UTC", "join_url": "https://zoom.us/j/123456789", "start_url": "https://zoom.us/s/123456789?zak=abc", "password": "abc123", "created_at": "2025-06-01T08:00:00Z", "host_email": "host@example.com"}
```

</details>

<details>
<summary>List meetings for a user</summary>

Returns a paginated list of scheduled meetings for the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's ID, email address, or `me` for the authenticated user. |
| `queries` | `*MeetingsQueries` | No | Optional query parameters: `type` (scheduled/live/upcoming), `pageSize`, `nextPageToken`. |

Returns: `InlineResponse20028|error`

Sample code:

```ballerina
meetings:InlineResponse20028 response = check zoomClient->/users/[userId]/meetings();
```

Sample response:

```ballerina
{"page_count": 1, "page_number": 1, "page_size": 30, "total_records": 2, "next_page_token": "", "meetings": [{"id": 123456789, "topic": "Team Sync", "type": 2, "start_time": "2025-07-10T10:00:00Z", "duration": 30, "timezone": "UTC", "join_url": "https://zoom.us/j/123456789", "created_at": "2025-06-01T08:00:00Z"}]}
```

</details>

<details>
<summary>Get a meeting</summary>

Retrieves the full details of a specific meeting by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `queries` | `*MeetingQueries` | No | Optional query parameters: `occurrenceId`, `showPreviousOccurrences`. |

Returns: `InlineResponse20013|error`

Sample code:

```ballerina
meetings:InlineResponse20013 meeting = check zoomClient->/meetings/[meetingId]();
```

Sample response:

```ballerina
{"id": 123456789, "topic": "Team Sync", "type": 2, "start_time": "2025-07-10T10:00:00Z", "duration": 30, "timezone": "UTC", "join_url": "https://zoom.us/j/123456789", "host_email": "host@example.com", "settings": {"host_video": true, "participant_video": false, "mute_upon_entry": true, "waiting_room": true}}
```

</details>

<details>
<summary>Update a meeting</summary>

Updates the settings or details of an existing meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `payload` | `MeetingsmeetingIdBody` | Yes | Meeting fields to update: topic, startTime, duration, agenda, settings, etc. |
| `queries` | `*MeetingUpdateQueries` | No | Optional query parameter: `occurrenceId` for recurring meeting occurrences. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId].patch({
    topic: "Updated Team Sync",
    startTime: "2025-09-01T15:00:00Z"
});
```

</details>

<details>
<summary>Delete a meeting</summary>

Deletes a scheduled or recurring meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `queries` | `*MeetingDeleteQueries` | No | Optional query parameters: `occurrenceId`, `scheduleForReminder`, `cancelMeetingReminder`. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId].delete();
```

</details>

<details>
<summary>Update meeting status</summary>

Updates the status of a meeting: for example, ends a live meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `payload` | `MeetingIdStatusBody` | Yes | Status payload with `action` field: use `end` to end a live meeting. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId]/status.put({action: "end"});
```

</details>

<details>
<summary>Get a meeting invitation</summary>

Retrieves the formatted invitation text for a specific meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |

Returns: `MeetingInvitation|error`

Sample code:

```ballerina
meetings:MeetingInvitation invitation = check zoomClient->/meetings/[meetingId]/invitation();
```

Sample response:

```ballerina
{"invitation": "Jane Smith is inviting you to a scheduled Zoom meeting.\n\nTopic: Team Sync\nTime: Jul 10, 2025 10:00 AM UTC\n\nJoin Zoom Meeting\nhttps://zoom.us/j/123456789\n\nMeeting ID: 123 456 789\nPasscode: abc123"}
```

</details>

<details>
<summary>Get meeting summary</summary>

Retrieves the AI-generated summary for a specific meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The meeting ID or UUID. |

Returns: `InlineResponse20018|error`

Sample code:

```ballerina
meetings:InlineResponse20018 summary = check zoomClient->/meetings/[meetingId]/meeting_summary();
```

Sample response:

```ballerina
{"meeting_host_id": "usr123", "meeting_host_email": "host@example.com", "meeting_id": "123456789", "meeting_topic": "Team Sync", "meeting_start_time": "2025-07-10T10:00:00Z", "meeting_end_time": "2025-07-10T10:28:00Z", "summary_start_time": "2025-07-10T10:00:05Z", "summary_end_time": "2025-07-10T10:27:50Z", "summary_created_time": "2025-07-10T10:30:00Z", "summary_last_modified_time": "2025-07-10T10:30:00Z", "audio_transcript_file_id": "file123", "summary_title": "Team Sync: July 10", "summary_overview": "The team discussed Q3 goals and aligned on sprint priorities.", "summary_details": [{"summary_title": "Q3 Goals", "summary_detail": "Reviewed key objectives for the quarter."}], "next_steps": ["Finalize project roadmap by July 15.", "Schedule follow-up with design team."], "edited_summary": {}}
```

</details>

#### Meeting polls

<details>
<summary>List meeting polls</summary>

Returns a list of polls created for a specific meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `queries` | `*MeetingPollsQueries` | No | Optional query parameter: `anonymous`: filter by anonymous poll setting. |

Returns: `PollList|error`

Sample code:

```ballerina
meetings:PollList pollList = check zoomClient->/meetings/[meetingId]/polls();
```

Sample response:

```ballerina
{"total_records": 1, "polls": [{"id": "QalIoKWLTJehBJ8e1xRrbQ", "title": "Weekly Check-in", "status": "notstart", "anonymous": false, "poll_type": 1, "questions": [{"name": "How is your week going?", "type": "single", "answers": ["Great", "Okay", "Could be better"]}]}]}
```

</details>

<details>
<summary>Create a meeting poll</summary>

Creates a poll for a specific meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `payload` | `MeetingIdPollsBody` | Yes | Poll details including title, anonymous flag, and questions with answer options. |

Returns: `InlineResponse2015|error`

Sample code:

```ballerina
meetings:InlineResponse2015 poll = check zoomClient->/meetings/[meetingId]/polls.post(
    payload = {
        title: "Quick Check-in",
        questions: [
            {
                name: "How is your week going?",
                'type: "single",
                answers: ["Great", "Okay", "Could be better"]
            }
        ]
    }
);
```

Sample response:

```ballerina
{"id": "QalIoKWLTJehBJ8e1xRrbQ", "title": "Quick Check-in", "status": "notstart", "anonymous": false, "questions": [{"name": "How is your week going?", "type": "single", "answers": ["Great", "Okay", "Could be better"]}]}
```

</details>

<details>
<summary>Get a meeting poll</summary>

Retrieves the details of a specific meeting poll.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `pollId` | `string` | Yes | The poll's unique identifier. |

Returns: `InlineResponse20019|error`

Sample code:

```ballerina
meetings:InlineResponse20019 poll = check zoomClient->/meetings/[meetingId]/polls/[pollId]();
```

Sample response:

```ballerina
{"id": "QalIoKWLTJehBJ8e1xRrbQ", "title": "Quick Check-in", "status": "notstart", "anonymous": false, "poll_type": 1, "questions": [{"name": "How is your week going?", "type": "single", "answers": ["Great", "Okay", "Could be better"]}]}
```

</details>

<details>
<summary>Update a meeting poll</summary>

Updates a specific meeting poll's title or questions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `pollId` | `string` | Yes | The poll's unique identifier. |
| `payload` | `PollsPollIdBody` | Yes | Updated poll details: title, questions, and answer options. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId]/polls/[pollId].put({
    title: "Updated Check-in Poll",
    questions: [
        {
            name: "Rate your week 1–5",
            'type: "rating_scale",
            ratingMinLabel: "Poor",
            ratingMaxLabel: "Excellent"
        }
    ]
});
```

</details>

<details>
<summary>Delete a meeting poll</summary>

Deletes a specific meeting poll.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `pollId` | `string` | Yes | The poll's unique identifier. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId]/polls/[pollId].delete();
```

</details>

#### Meeting registrants

<details>
<summary>List meeting registrants</summary>

Returns a paginated list of registrants for a specific meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `queries` | `*MeetingRegistrantsQueries` | No | Optional query parameters: `occurrenceId`, `status` (pending/approved/denied), `pageSize`, `pageNumber`, `nextPageToken`. |

Returns: `RegistrationList|error`

Sample code:

```ballerina
meetings:RegistrationList registrants = check zoomClient->/meetings/[meetingId]/registrants();
```

Sample response:

```ballerina
{"page_count": 1, "page_size": 30, "total_records": 1, "next_page_token": "", "registrants": [{"id": "reg001", "email": "participant@example.com", "first_name": "Jane", "last_name": "Doe", "status": "approved", "create_time": "2025-06-01T08:00:00Z", "join_url": "https://zoom.us/w/123456789?tk=xyz"}]}
```

</details>

<details>
<summary>Add a meeting registrant</summary>

Registers a participant for a specific meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `payload` | `MeetingIdRegistrantsBody` | Yes | Registrant details including email (required), first name, last name, and any custom questions. |
| `queries` | `*MeetingRegistrantCreateQueries` | No | Optional query parameter: `occurrenceIds` for recurring meeting occurrences. |

Returns: `InlineResponse2016|error`

Sample code:

```ballerina
meetings:InlineResponse2016 result = check zoomClient->/meetings/[meetingId]/registrants.post(
    payload = {
        email: "participant@example.com",
        firstName: "Jane",
        lastName: "Doe"
    }
);
```

Sample response:

```ballerina
{"id": "reg001", "join_url": "https://zoom.us/w/123456789?tk=xyz", "registrant_id": "reg001", "start_time": "2025-07-10T10:00:00Z", "topic": "Team Sync"}
```

</details>

<details>
<summary>Update meeting registrant status</summary>

Approves, denies, or cancels one or more meeting registrants in bulk.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `payload` | `RegistrantsStatusBody` | Yes | Status update with `action` (approve/deny/cancel) and list of registrant ID/email pairs. |
| `queries` | `*MeetingRegistrantStatusQueries` | No | Optional query parameter: `occurrenceId`. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId]/registrants/status.put({
    action: "approve",
    registrants: [{id: "reg001", email: "participant@example.com"}]
});
```

</details>

<details>
<summary>Delete a meeting registrant</summary>

Removes a specific registrant from a meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |
| `registrantId` | `string` | Yes | The registrant's unique identifier. |
| `queries` | `*MeetingregistrantdeleteQueries` | No | Optional query parameter: `occurrenceId`. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId]/registrants/[registrantId].delete();
```

</details>

<details>
<summary>Get meeting registrant questions</summary>

Retrieves the registration questions and field settings for a meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |

Returns: `InlineResponse20020|error`

Sample code:

```ballerina
meetings:InlineResponse20020 questions = check zoomClient->/meetings/[meetingId]/registrants/questions();
```

Sample response:

```ballerina
{"questions": [{"field_name": "last_name", "required": true}, {"field_name": "address", "required": false}, {"field_name": "city", "required": false}], "custom_questions": [{"title": "What do you hope to learn?", "type": "short", "required": false, "answers": []}]}
```

</details>

#### Meeting recordings

<details>
<summary>List meeting recordings</summary>

Returns cloud recording information for a completed meeting, including all recording files.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The meeting ID or UUID. For UUIDs containing `//` or starting with `/`, double-encode them. |

Returns: `InlineResponse2003|error`

Sample code:

```ballerina
meetings:InlineResponse2003 recordings = check zoomClient->/meetings/[meetingId]/recordings();
```

Sample response:

```ballerina
{"uuid": "abc123xyz==", "id": 123456789, "account_id": "acc123", "host_id": "usr123", "topic": "Team Sync", "start_time": "2025-07-10T10:00:00Z", "duration": 28, "total_size": 10485760, "recording_count": 2, "recording_files": [{"id": "rec001", "recording_start": "2025-07-10T10:00:05Z", "recording_end": "2025-07-10T10:28:00Z", "file_type": "MP4", "file_size": 8388608, "play_url": "https://zoom.us/rec/play/abc", "download_url": "https://zoom.us/rec/download/abc", "status": "completed", "recording_type": "shared_screen_with_speaker_view"}]}
```

</details>

<details>
<summary>Delete meeting recordings</summary>

Deletes all cloud recordings for a completed meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The meeting ID or UUID. |
| `queries` | `*RecordingsDeleteQueries` | No | Optional query parameter: `action`: `trash` (move to trash, default) or `delete` (permanently remove). |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/meetings/[meetingId]/recordings.delete();
```

</details>

<details>
<summary>Get meeting recording settings</summary>

Retrieves sharing and access settings for a meeting's cloud recording.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The meeting ID or UUID. |

Returns: `RecordingSettings|error`

Sample code:

```ballerina
meetings:RecordingSettings settings = check zoomClient->/meetings/[meetingId]/recordings/settings();
```

Sample response:

```ballerina
{"share_recording": "publicly", "recording_authentication": false, "viewer_download": true, "password": "", "on_demand": false, "approval_type": 2, "send_email_to_host": true, "show_social_share_buttons": true}
```

</details>

<details>
<summary>List recordings for a user</summary>

Returns all cloud recordings for a specific user within an optional date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's ID or email address. |
| `queries` | `*UserRecordingsQueries` | No | Optional query parameters: `from`, `to` (date range), `pageSize`, `nextPageToken`, `mc`, `trash`. |

Returns: `InlineResponse2006|error`

Sample code:

```ballerina
meetings:InlineResponse2006 userRecordings = check zoomClient->/users/[userId]/recordings();
```

Sample response:

```ballerina
{"from": "2025-06-01", "to": "2025-07-01", "page_size": 30, "total_records": 1, "next_page_token": "", "meetings": [{"uuid": "abc123==", "id": 123456789, "topic": "Team Sync", "start_time": "2025-06-15T10:00:00Z", "duration": 28, "total_size": 10485760, "recording_count": 2}]}
```

</details>

#### Past meetings

<details>
<summary>Get a past meeting's details</summary>

Returns details about a completed meeting, including participant count and duration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The past meeting's ID or UUID. |

Returns: `InlineResponse20023|error`

Sample code:

```ballerina
meetings:InlineResponse20023 pastMeeting = check zoomClient->/past_meetings/[meetingId]();
```

Sample response:

```ballerina
{"uuid": "abc123xyz==", "id": 123456789, "host_id": "usr123", "topic": "Team Sync", "type": 2, "start_time": "2025-07-10T10:00:00Z", "end_time": "2025-07-10T10:28:00Z", "duration": 28, "total_minutes": 84, "participants_count": 3}
```

</details>

<details>
<summary>List past meeting instances</summary>

Returns all completed instances of a recurring meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The recurring meeting's numeric ID. |

Returns: `MeetingInstances|error`

Sample code:

```ballerina
meetings:MeetingInstances instances = check zoomClient->/past_meetings/[meetingId]/instances();
```

Sample response:

```ballerina
{"meetings": [{"uuid": "abc123xyz==", "start_time": "2025-06-01T10:00:00Z"}, {"uuid": "def456uvw==", "start_time": "2025-06-08T10:00:00Z"}, {"uuid": "ghi789rst==", "start_time": "2025-06-15T10:00:00Z"}]}
```

</details>

<details>
<summary>List past meeting participants</summary>

Returns a list of participants who attended a completed meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The past meeting's ID or UUID. |
| `queries` | `*PastMeetingParticipantsQueries` | No | Optional query parameters: `pageSize`, `nextPageToken`. |

Returns: `InlineResponse20024|error`

Sample code:

```ballerina
meetings:InlineResponse20024 participants = check zoomClient->/past_meetings/[meetingId]/participants();
```

Sample response:

```ballerina
{"page_count": 1, "page_size": 30, "total_records": 3, "next_page_token": "", "participants": [{"id": "usr001", "user_id": "usr001", "name": "Jane Doe", "user_email": "jane@example.com", "join_time": "2025-07-10T10:01:00Z", "leave_time": "2025-07-10T10:28:00Z", "duration": 27, "attentiveness_score": "95"}]}
```

</details>

#### Webinar management

<details>
<summary>Create a webinar</summary>

Creates a new webinar for the specified host user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The host's user ID or email address. |
| `payload` | `UserIdWebinarsBody` | Yes | Webinar details including topic, type, start time, duration, timezone, and settings. |

Returns: `InlineResponse2019|error`

Sample code:

```ballerina
meetings:InlineResponse2019 webinar = check zoomClient->/users/[userId]/webinars.post(
    payload = {
        topic: "Product Launch Webinar",
        'type: 5,
        startTime: "2025-08-01T14:00:00Z",
        duration: 60,
        timezone: "UTC"
    }
);
```

Sample response:

```ballerina
{"id": 987654321, "topic": "Product Launch Webinar", "type": 5, "start_time": "2025-08-01T14:00:00Z", "duration": 60, "timezone": "UTC", "join_url": "https://zoom.us/j/987654321", "start_url": "https://zoom.us/s/987654321?zak=xyz", "host_email": "host@example.com"}
```

</details>

<details>
<summary>List webinars for a user</summary>

Returns a list of webinars scheduled for the specified host user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The host's user ID or email address. |
| `queries` | `*WebinarsQueries` | No | Optional query parameters: `pageSize`, `pageNumber`. |

Returns: `InlineResponse20046|error`

Sample code:

```ballerina
meetings:InlineResponse20046 webinars = check zoomClient->/users/[userId]/webinars();
```

Sample response:

```ballerina
{"page_count": 1, "page_number": 1, "page_size": 30, "total_records": 1, "webinars": [{"id": 987654321, "topic": "Product Launch Webinar", "type": 5, "start_time": "2025-08-01T14:00:00Z", "duration": 60, "timezone": "UTC", "join_url": "https://zoom.us/j/987654321"}]}
```

</details>

<details>
<summary>Get a webinar</summary>

Retrieves full details of a specific webinar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | `int` | Yes | The webinar's unique numeric ID. |

Returns: `InlineResponse20047|error`

Sample code:

```ballerina
meetings:InlineResponse20047 webinar = check zoomClient->/webinars/[webinarId]();
```

Sample response:

```ballerina
{"id": 987654321, "topic": "Product Launch Webinar", "type": 5, "start_time": "2025-08-01T14:00:00Z", "duration": 60, "timezone": "UTC", "join_url": "https://zoom.us/j/987654321", "host_email": "host@example.com", "settings": {"approval_type": 0, "registration_type": 1, "hd_video": true, "panelists_video": true, "practice_session": false}}
```

</details>

<details>
<summary>Update a webinar</summary>

Updates the details or settings of an existing webinar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | `int` | Yes | The webinar's unique numeric ID. |
| `payload` | `WebinarsWebinarIdBody` | Yes | Webinar fields to update: topic, startTime, duration, settings, etc. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/webinars/[webinarId].patch({
    topic: "Updated Product Launch Webinar",
    startTime: "2025-08-02T14:00:00Z"
});
```

</details>

<details>
<summary>Delete a webinar</summary>

Deletes a specific webinar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | `int` | Yes | The webinar's unique numeric ID. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/webinars/[webinarId].delete();
```

</details>

<details>
<summary>List webinar panelists</summary>

Returns all panelists for a specific webinar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | `int` | Yes | The webinar's unique numeric ID. |

Returns: `PanelistList|error`

Sample code:

```ballerina
meetings:PanelistList panelists = check zoomClient->/webinars/[webinarId]/panelists();
```

Sample response:

```ballerina
{"total_records": 2, "panelists": [{"id": "pan001", "email": "panelist1@example.com", "name": "Alice Smith", "join_url": "https://zoom.us/w/987654321?tk=pan1"}, {"id": "pan002", "email": "panelist2@example.com", "name": "Bob Jones", "join_url": "https://zoom.us/w/987654321?tk=pan2"}]}
```

</details>

<details>
<summary>Add webinar panelists</summary>

Adds one or more panelists to a specific webinar.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | `int` | Yes | The webinar's unique numeric ID. |
| `payload` | `WebinarIdPanelistsBody` | Yes | List of panelists with name and email fields. |

Returns: `InlineResponse2021|error`

Sample code:

```ballerina
meetings:InlineResponse2021 result = check zoomClient->/webinars/[webinarId]/panelists.post(
    payload = {
        panelists: [
            {name: "Alice Smith", email: "alice@example.com"},
            {name: "Bob Jones", email: "bob@example.com"}
        ]
    }
);
```

Sample response:

```ballerina
{"id": 987654321, "updated_at": "2025-06-01T09:00:00Z", "panelists": [{"id": "pan001", "join_url": "https://zoom.us/w/987654321?tk=pan1"}, {"id": "pan002", "join_url": "https://zoom.us/w/987654321?tk=pan2"}]}
```

</details>

#### Reports

<details>
<summary>Get meeting reports</summary>

Returns meeting report data for meetings that ended within a specified date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `*ReportMeetingsQueries` | Yes | Required query parameters: `from` and `to` in `YYYY-MM-DD` format (max 1-month range). Optional: `pageSize`, `nextPageToken`, `type`. |

Returns: `InlineResponse20037|error`

Sample code:

```ballerina
meetings:InlineResponse20037 report = check zoomClient->/report/meetings('from = "2025-07-01", to = "2025-07-31");
```

Sample response:

```ballerina
{"from": "2025-07-01", "to": "2025-07-31", "page_size": 30, "total_records": 2, "next_page_token": "", "meetings": [{"uuid": "abc123==", "id": 123456789, "topic": "Team Sync", "start_time": "2025-07-10T10:00:00Z", "end_time": "2025-07-10T10:28:00Z", "duration": 28, "total_minutes": 84, "participants_count": 3, "user_email": "host@example.com", "user_name": "Host User", "has_pstn": false, "has_voip": true}]}
```

</details>

<details>
<summary>Get meeting participant reports</summary>

Returns detailed participant-level data for a specific meeting, including join/leave times and attentiveness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The meeting ID or UUID. |
| `queries` | `*ReportMeetingParticipantsQueries` | No | Optional query parameters: `pageSize`, `nextPageToken`, `includeFields`. |

Returns: `InlineResponse20038|error`

Sample code:

```ballerina
meetings:InlineResponse20038 participantReport = check zoomClient->/report/meetings/[meetingId]/participants();
```

Sample response:

```ballerina
{"page_size": 30, "total_records": 3, "next_page_token": "", "participants": [{"id": "usr001", "user_id": "usr001", "name": "Jane Doe", "user_email": "jane@example.com", "join_time": "2025-07-10T10:01:00Z", "leave_time": "2025-07-10T10:28:00Z", "duration": 27, "attentiveness_score": "95", "status": "in_meeting", "registrant_id": "reg001"}]}
```

</details>

<details>
<summary>Get user meeting reports</summary>

Returns meeting report data for all meetings hosted by a specific user within a date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The host's user ID or email address. |
| `queries` | `*ReportUserMeetingsQueries` | Yes | Required query parameters: `from` and `to` in `YYYY-MM-DD` format. Optional: `pageSize`, `nextPageToken`. |

Returns: `InlineResponse20044|error`

Sample code:

```ballerina
meetings:InlineResponse20044 userReport = check zoomClient->/report/users/[userId]/meetings('from = "2025-07-01", to = "2025-07-31");
```

Sample response:

```ballerina
{"from": "2025-07-01", "to": "2025-07-31", "page_size": 30, "total_records": 5, "next_page_token": "", "meetings": [{"uuid": "abc123==", "id": 123456789, "topic": "Team Sync", "start_time": "2025-07-10T10:00:00Z", "end_time": "2025-07-10T10:28:00Z", "duration": 28, "participants_count": 3}]}
```

</details>

<details>
<summary>Get daily usage report</summary>

Returns day-by-day meeting activity data for an account within a specified month.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `*ReportDailyQueries` | No | Optional query parameters: `year` and `month` (defaults to previous month). |

Returns: `InlineResponse20035|error`

Sample code:

```ballerina
meetings:InlineResponse20035 dailyReport = check zoomClient->/report/daily(year = 2025, month = 7);
```

Sample response:

```ballerina
{"year": 2025, "month": 7, "dates": [{"date": "2025-07-01", "new_users": 0, "meetings": 3, "participants": 12, "meeting_minutes": 90}, {"date": "2025-07-02", "new_users": 1, "meetings": 5, "participants": 20, "meeting_minutes": 150}]}
```

</details>

#### Live meeting control

<details>
<summary>Update live meeting events</summary>

Performs a control action on a live in-progress meeting, such as muting all participants or putting the meeting on hold.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `string` | Yes | The live meeting's ID or UUID. |
| `payload` | `LiveMeetingEventsBody` | Yes | Event payload specifying the `method` (e.g., `mute.upon.entry`, `put.on.hold`) and associated `params`. |

Returns: `error?`

Sample code:

```ballerina
check zoomClient->/live_meetings/[meetingId]/events.patch({
    method: "mute.upon.entry",
    params: {mute_upon_entry: true}
});
```

</details>

<details>
<summary>Get a meeting join token for live streaming</summary>

Retrieves a join token that allows a third-party service to start live streaming a meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | `int` | Yes | The unique numeric meeting ID. |

Returns: `InlineResponse20014|error`

Sample code:

```ballerina
meetings:InlineResponse20014 tokenInfo = check zoomClient->/meetings/[meetingId]/jointoken/live_streaming();
```

Sample response:

```ballerina
{"expire_in": 120, "token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ6bSIsImV4cCI6MTY5MDAwMDAwMCwibWlkIjoiMTIzNDU2Nzg5In0.abc"}
```

</details>

#### Archive files

<details>
<summary>List account archive files</summary>

Returns a list of archived meeting and webinar files for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `*ArchiveFilesQueries` | No | Optional query parameters: `pageSize`, `nextPageToken`, `from`, `to`, `queryDateType`, `fileType`, `status`, `groupId`. |

Returns: `InlineResponse200|error`

Sample code:

```ballerina
meetings:InlineResponse200 archiveFiles = check zoomClient->/archive_files();
```

Sample response:

```ballerina
{"from": "2025-07-01", "to": "2025-07-31", "page_size": 30, "total_records": 1, "next_page_token": "", "meetings": [{"uuid": "abc123==", "id": 123456789, "topic": "Team Sync", "start_time": "2025-07-10T10:00:00Z", "duration": 28, "host_id": "usr123", "archive_files": [{"id": "arc001", "file_type": "MP4", "file_size": 8388608, "recording_type": "shared_screen_with_speaker_view", "status": "completed", "download_url": "https://zoom.us/rec/archive/abc"}]}]}
```

</details>

<details>
<summary>Get archive file statistics</summary>

Returns statistics on archived files, including total file count and storage consumed.

Returns: `InlineResponse2001|error`

Sample code:

```ballerina
meetings:InlineResponse2001 stats = check zoomClient->/archive_files/statistics();
```

Sample response:

```ballerina
{"total_archive_files": 25, "audio_archive_files": 5, "video_archive_files": 20, "storage_used": 524288000, "audio_storage_used": 52428800, "video_storage_used": 471859200}
```

</details>

<details>
<summary>List past meeting archive files</summary>

Returns all archived files for a specific past meeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingUUID` | `string` | Yes | The meeting UUID. Double-encode UUIDs containing `//` or starting with `/`. |

Returns: `InlineResponse2002|error`

Sample code:

```ballerina
meetings:InlineResponse2002 meetingArchive = check zoomClient->/past_meetings/[meetingUUID]/archive_files();
```

Sample response:

```ballerina
{"uuid": "abc123xyz==", "id": 123456789, "account_id": "acc123", "host_id": "usr123", "topic": "Team Sync", "start_time": "2025-07-10T10:00:00Z", "duration": 28, "archive_files": [{"id": "arc001", "file_type": "MP4", "file_size": 8388608, "recording_type": "shared_screen_with_speaker_view", "status": "completed", "download_url": "https://zoom.us/rec/archive/abc", "recording_start": "2025-07-10T10:00:05Z", "recording_end": "2025-07-10T10:28:00Z"}]}
```

</details>
